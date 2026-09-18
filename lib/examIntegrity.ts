export type ExamQuestionIdentity={id:string;exam:string;subject:string;year:number;sourceType:'AUTHENTIC'|'AVORA_STANDARD';prompt:string;options?:string[];topic:string;skill?:string;microSkill?:string};
function normalise(s:string){return s.toLowerCase().replace(/\d+(?:\.\d+)?/g,'#').replace(/[^a-z# ]/g,' ').replace(/\s+/g,' ').trim()}
function tokens(s:string){return new Set(normalise(s).split(' ').filter(x=>x.length>2))}
export function questionSimilarity(a:string,b:string){const A=tokens(a),B=tokens(b);if(!A.size&&!B.size)return 1;let i=0;for(const x of A)if(B.has(x))i++;return i/(A.size+B.size-i||1)}
export function auditCrossYearDuplicates(qs:ExamQuestionIdentity[]){
 const findings:Array<{a:string;b:string;years:[number,number];similarity:number;severity:'EXACT'|'NEAR'}>=[];
 for(let i=0;i<qs.length;i++)for(let j=i+1;j<qs.length;j++){
  const a=qs[i],b=qs[j]; if(a.exam!==b.exam||a.subject!==b.subject||a.year===b.year)continue;
  const na=normalise(a.prompt),nb=normalise(b.prompt); const similarity=questionSimilarity(a.prompt,b.prompt);
  if(na===nb)findings.push({a:a.id,b:b.id,years:[a.year,b.year],similarity:1,severity:'EXACT'});
  else if(similarity>=0.82)findings.push({a:a.id,b:b.id,years:[a.year,b.year],similarity,severity:'NEAR'});
 }
 return findings;
}
export const examLibraryPolicy={
 authentic:'Real exam question with year/paper/provenance. Rights status is tracked separately and never implied by availability.',
 avoraStandard:'AVORA-authored question matching curriculum objective, exam pattern and difficulty; never presented as the literal past paper.',
 uniqueness:'Topics and skills may repeat across years; exact or near-duplicate AVORA questions across different year-standard papers are rejected.'
};
