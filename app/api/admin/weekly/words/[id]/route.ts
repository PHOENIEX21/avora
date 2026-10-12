import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getSession} from '@/lib/auth';
import {sql} from '@/lib/db';
import {wordDraftSchema,wordRevisionSchema,readWordBody,storedWordDraft,WordBankConflict,type WordBankRow} from '@/lib/weeklyWordBank';
type Context={params:Promise<{id:string}>};
const changeSchema=z.discriminatedUnion('action',[
 z.object({action:z.literal('EDIT'),expectedRevision:wordRevisionSchema,draft:wordDraftSchema}).strict(),
 z.object({action:z.literal('SUBMIT'),expectedRevision:wordRevisionSchema}).strict(),
 z.object({action:z.literal('APPROVE'),expectedRevision:wordRevisionSchema,confirmedSource:z.literal(true),note:z.string().trim().min(3).max(2000)}).strict(),
 z.object({action:z.literal('REJECT'),expectedRevision:wordRevisionSchema,note:z.string().trim().min(3).max(2000)}).strict()
]);
export async function PATCH(request:Request,context:Context){
 const session=await getSession();
 if(!session||session.role!=='ADMIN')return NextResponse.json({error:'Admin only'},{status:403});
 const {id}=await context.params;
 if(!z.uuid().safeParse(id).success)return NextResponse.json({error:'Invalid word ID'},{status:400});
 let data:unknown;try{data=JSON.parse(await readWordBody(request,64_000))}catch{return NextResponse.json({error:'Invalid review body'},{status:400})}
 const parsed=changeSchema.safeParse(data);
 if(!parsed.success)return NextResponse.json({error:'Invalid word review',issues:parsed.error.issues},{status:400});
 const change=parsed.data;
 try{
  const result=await sql.begin(async tx=>{
   const [identity]=await tx`SELECT class_level FROM weekly_vocabulary_words WHERE id=${id}`;
   if(!identity)return null;
   await tx`SELECT pg_advisory_xact_lock(hashtext(${'avora-word-bank-'+identity.class_level}))`;
   const [row]=await tx<WordBankRow[]>`SELECT * FROM weekly_vocabulary_words WHERE id=${id} FOR UPDATE`;
   if(!row)return null;
   if(row.revision!==change.expectedRevision)throw new WordBankConflict('Word changed; reload before reviewing');
   if(change.action==='EDIT'){
    if(row.status!=='DRAFT')throw new WordBankConflict('Only drafts can be edited');
    const draft=change.draft;
    const duplicates=await tx`SELECT id FROM weekly_vocabulary_words WHERE class_level=${row.class_level}
     AND id<>${id} AND lower(btrim(word))=lower(btrim(${draft.word})) LIMIT 1`;
    if(duplicates.length)throw new WordBankConflict('A word already exists in this class');
    await tx`UPDATE weekly_vocabulary_words SET word=${draft.word},part_of_speech=${draft.partOfSpeech},meaning=${draft.meaning},
     example_sentences=${tx.json(draft.examples)}::jsonb,source_reference=${draft.sourceReference},related_form=${draft.relatedForm??null},
     pronunciation_hint=${draft.pronunciationHint??null},reviewed_by=NULL,reviewed_at=NULL,review_note=NULL,
     revision=revision+1,updated_at=clock_timestamp() WHERE id=${id}`;
   }else{
    const allowed=change.action==='SUBMIT'?row.status==='DRAFT':row.status==='IN_REVIEW';
    if(!allowed)throw new WordBankConflict('Invalid word review transition');
    if(change.action!=='REJECT'&&!storedWordDraft(row).success)throw new WordBankConflict('Complete word content and source reference before review');
    const approved=change.action==='APPROVE',next=approved?'APPROVED':change.action==='SUBMIT'?'IN_REVIEW':'DRAFT';
    await tx`UPDATE weekly_vocabulary_words SET status=${next},reviewed_by=${approved?session.userId:null},
     reviewed_at=CASE WHEN ${approved} THEN clock_timestamp() ELSE NULL END,
     review_note=${'note' in change?change.note:null},revision=revision+1,updated_at=clock_timestamp() WHERE id=${id}`;
   }
   const [updated]=await tx`SELECT id,status,revision FROM weekly_vocabulary_words WHERE id=${id}`;
   return updated;
  });
  return result?NextResponse.json({ok:true,word:result}):NextResponse.json({error:'Word not found'},{status:404});
 }catch(error){return NextResponse.json({error:error instanceof WordBankConflict?error.message:'Word review unavailable'},
  {status:error instanceof WordBankConflict?409:503})}
}
