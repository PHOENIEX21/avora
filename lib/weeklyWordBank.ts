import {z} from 'zod';
import {parseSourceCsv} from './weeklyCurriculumCsv';

export const wordClasses=['JSS1','JSS2','JSS3'] as const;
export const wordStatuses=['DRAFT','IN_REVIEW','APPROVED','PUBLISHED','RETIRED'] as const;
export const wordCsvHeaders=['word','partOfSpeech','meaning','example1','sourceReference'] as const;
export const wordDraftSchema=z.object({
 word:z.string().trim().min(1).max(100),
 partOfSpeech:z.string().trim().min(2).max(80),
 meaning:z.string().trim().min(3).max(2000),
 examples:z.array(z.string().trim().min(3).max(1000)).min(1).max(3),
 sourceReference:z.string().trim().min(3).max(1000),
 relatedForm:z.string().trim().max(200).nullable().optional(),
 pronunciationHint:z.string().trim().max(200).nullable().optional()
}).strict();
export const wordImportSchema=z.object({classLevel:z.enum(wordClasses),rows:z.array(wordDraftSchema).min(1).max(250)}).strict();
export const wordRevisionSchema=z.number().int().min(1).max(2147483646);
export type WordDraft=z.infer<typeof wordDraftSchema>;
export type WordBankRow={id:string;class_level:string;word:string;part_of_speech:string;meaning:string;example_sentences:string[];
 source_reference:string|null;related_form:string|null;pronunciation_hint:string|null;status:typeof wordStatuses[number];
 review_note:string|null;reviewed_at:string|null;revision:number;updated_at:string};
export class WordBankConflict extends Error{}
export function wordKey(word:string){return word.trim().toLowerCase()}
export function parseWordCsv(csv:string){
 return parseSourceCsv(csv,wordCsvHeaders).map(row=>{
  const allowed=new Set([...wordCsvHeaders,'example2','example3','relatedForm','pronunciationHint']);
  for(const key of Object.keys(row))if(!allowed.has(key))throw new Error('Unexpected CSV column: '+key);
  if(row.example3&&!row.example2)throw new Error('example3 requires example2');
  return {word:row.word,partOfSpeech:row.partOfSpeech,meaning:row.meaning,
   examples:[row.example1,row.example2,row.example3].filter(Boolean),sourceReference:row.sourceReference,
   relatedForm:row.relatedForm||null,pronunciationHint:row.pronunciationHint||null};
 });
}
export function storedWordDraft(row:WordBankRow){return wordDraftSchema.safeParse({word:row.word,partOfSpeech:row.part_of_speech,
 meaning:row.meaning,examples:row.example_sentences,sourceReference:row.source_reference,relatedForm:row.related_form,pronunciationHint:row.pronunciation_hint})}
export async function readWordBody(request:Request,limit=1_000_000){
 if(!request.body)throw new Error('Request body required');
 const reader=request.body.getReader(),chunks:Uint8Array[]=[];let size=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;
  if(size>limit){await reader.cancel();throw new Error('Request body too large')}chunks.push(value);
 }}finally{reader.releaseLock()}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
 return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
}
