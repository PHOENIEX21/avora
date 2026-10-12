import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql,withDbRetry} from '@/lib/db';
import {parseWordCsv,readWordBody,wordClasses,wordStatuses,wordImportSchema,wordKey,WordBankConflict} from '@/lib/weeklyWordBank';

export async function GET(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const params=Object.fromEntries(new URL(request.url).searchParams);
 const parsed=z.object({classLevel:z.enum(wordClasses),status:z.enum(wordStatuses).optional(),
  search:z.string().trim().max(100).default(''),page:z.coerce.number().int().min(1).max(10000).default(1)}).strict().safeParse(params);
 if(!parsed.success)return NextResponse.json({error:'Invalid word-bank filters'},{status:400});
 const {classLevel,status,search,page}=parsed.data;
 try{
  const rows=await withDbRetry(()=>sql`SELECT id,class_level,word,part_of_speech,meaning,example_sentences,source_reference,
   pronunciation_hint,related_form,status,review_note,reviewed_at,revision,updated_at
   FROM weekly_vocabulary_words WHERE class_level=${classLevel}
    AND (${status??null}::text IS NULL OR status=${status??null})
    AND strpos(lower(word),lower(${search}))>0
   ORDER BY lower(word),id LIMIT 51 OFFSET ${(page-1)*50}`);
  return NextResponse.json({rows:rows.slice(0,50),hasMore:rows.length>50,page},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Word bank unavailable'},{status:503})}
}
export async function POST(request:Request){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 let data:unknown;
 try{
  const text=await readWordBody(request);
  data=request.headers.get('content-type')?.includes('text/csv')
   ?{classLevel:new URL(request.url).searchParams.get('classLevel'),rows:parseWordCsv(text)}:JSON.parse(text);
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Invalid import'},{status:400})}
 const parsed=wordImportSchema.safeParse(data);
 if(!parsed.success)return NextResponse.json({error:'Invalid word rows',issues:parsed.error.issues},{status:400});
 const {classLevel,rows}=parsed.data,keys=rows.map(row=>wordKey(row.word));
 if(new Set(keys).size!==keys.length)return NextResponse.json({error:'Duplicate words in import'},{status:409});
 try{
  // One class lock coordinates imports and draft edits; never overwrite an existing source.
  const inserted=await sql.begin(async tx=>{
   await tx`SELECT pg_advisory_xact_lock(hashtext(${'avora-word-bank-'+classLevel}))`;
   const normalized=await tx`SELECT lower(btrim(value)) word_key FROM unnest(${rows.map(row=>row.word)}::text[]) value`;
   const databaseKeys=normalized.map(row=>row.word_key as string);
   if(new Set(databaseKeys).size!==databaseKeys.length)throw new WordBankConflict('Duplicate words in import');
   const existing=await tx`SELECT id FROM weekly_vocabulary_words WHERE class_level=${classLevel}
    AND lower(btrim(word))=ANY(${databaseKeys}::text[]) LIMIT 1`;
   if(existing.length)throw new WordBankConflict('A word already exists in this class');
   for(const row of rows)await tx`INSERT INTO weekly_vocabulary_words
    (class_level,word,part_of_speech,meaning,example_sentences,source_reference,related_form,pronunciation_hint,imported_by,status)
    VALUES(${classLevel},${row.word},${row.partOfSpeech},${row.meaning},${tx.json(row.examples)}::jsonb,
     ${row.sourceReference},${row.relatedForm??null},${row.pronunciationHint??null},${session.userId},'DRAFT')`;
   return rows.length;
  });
  return NextResponse.json({ok:true,inserted,status:'DRAFT'});
 }catch(error){return NextResponse.json({error:error instanceof WordBankConflict?error.message:'Word import failed; reload the bank before retrying'},
  {status:error instanceof WordBankConflict?409:503})}
}
