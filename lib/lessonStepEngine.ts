export type BoardAction='WRITE'|'DRAW'|'HIGHLIGHT'|'CLEAR_SECTION'|'ASK'|'PAUSE';
export type StructuredTeachingStep={id:string;sequence:number;boardAction:BoardAction;boardText:string;narration:string;pauseAfterMs:number;requiresLearnerResponse:boolean;sourceText:string};

const SLIDE_TARGET=420;
const SLIDE_HARD_MAX=520;

function isDrawInstruction(text:string){
 const t=cleanBoard(text).trim();
 // DRAW is reserved for an actual instruction to create a visual. Merely teaching ABOUT a
 // diagram, graph or number line is academic narration and must stay spoken.
 return /^(?:draw|sketch|plot|construct|illustrate|show\s+(?:this|it|the\s+.+)\s+on\s+the\s+(?:board|whiteboard)|on\s+the\s+(?:board|whiteboard)\s*[:,—–-]\s*(?:draw|sketch|plot|construct))\b/i.test(t);
}

function actionFor(text:string):BoardAction{
 if(isDrawInstruction(text))return 'DRAW';
 // Learner-response intent must NEVER be inferred from wording. Source lesson prose can
 // legitimately begin with phrases such as ‘What is…’, ‘Why is…’, ‘Solve:’ or ‘Find:’.
 // Only authored checks[] become ASK steps below via requiresLearnerResponse=true.
 if(/notice|important|common error|remember|key difference/i.test(text))return 'HIGHLIGHT';
 return 'WRITE';
}
function cleanBoard(text:string){return text.replace(/^\*\*|\*\*$/g,'').replace(/^[-*]\s*/,'').trim()}
function stableHash(input:string){
 let h=2166136261;
 for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619)}
 return (h>>>0).toString(36);
}
function stableStepBase(kind:'teach'|'check',text:string){
 const normalized=cleanBoard(text).toLowerCase().replace(/\s+/g,' ').trim();
 return `${kind}-${stableHash(normalized)}`;
}

function splitLongPiece(text:string):string[]{
 const compact=text.replace(/\s+/g,' ').trim();
 if(compact.length<=SLIDE_HARD_MAX)return compact?[compact]:[];
 const out:string[]=[];
 let rest=compact;
 while(rest.length>SLIDE_HARD_MAX){
  const window=rest.slice(0,SLIDE_HARD_MAX+1);
  let cut=Math.max(window.lastIndexOf('. '),window.lastIndexOf('? '),window.lastIndexOf('! '));
  if(cut<SLIDE_TARGET*.55)cut=Math.max(window.lastIndexOf('; '),window.lastIndexOf(': '));
  if(cut<SLIDE_TARGET*.55)cut=Math.max(window.lastIndexOf(', '),window.lastIndexOf(' — '),window.lastIndexOf(' - '));
  if(cut<SLIDE_TARGET*.55)cut=window.lastIndexOf(' ');
  if(cut<1)cut=SLIDE_HARD_MAX;
  else if(/[.!?]/.test(window[cut]))cut+=1;
  const head=rest.slice(0,cut).trim();
  if(head)out.push(head);
  rest=rest.slice(cut).trim();
 }
 if(rest)out.push(rest);
 return out;
}

function splitCodeBlock(block:string):string[]{
 const trimmed=block.trim();
 if(trimmed.length<=SLIDE_HARD_MAX)return [trimmed];
 const inner=trimmed.replace(/^```[^\n]*\n?/,'').replace(/\n?```$/,'');
 const lines=inner.split('\n');const out:string[]=[];let bucket:string[]=[];let size=0;
 const flush=()=>{if(!bucket.length)return;out.push('```\n'+bucket.join('\n')+'\n```');bucket=[];size=0};
 for(const line of lines){const next=size+line.length+1;if(next>SLIDE_TARGET&&bucket.length)flush();bucket.push(line);size+=line.length+1;if(size>=SLIDE_HARD_MAX)flush()}
 flush();return out.length?out:[trimmed];
}

// Turn long authored explanations into meaningful, readable teaching slides without deleting or
// summarising academic content. Sentence groups remain in source order; large fenced diagrams are
// paged on line boundaries so the learner can read them without losing the persistent navigation.
export function splitTeachingSlides(raw:string):string[]{
 const text=String(raw||'').replace(/\r/g,'').trim();
 if(!text)return [];
 const blocks=text.split(/(```[\s\S]*?```)/g).filter(Boolean);
 const out:string[]=[];
 for(const block of blocks){
  if(/^```[\s\S]*```$/.test(block.trim())){out.push(...splitCodeBlock(block));continue}
  const paragraphs=block.split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);
  for(const paragraph of paragraphs){
   const sentences=paragraph.replace(/\s+/g,' ').split(/(?<=[.!?])\s+(?=[A-Z0-9“"'(])/).map(x=>x.trim()).filter(Boolean);
   let bucket='';
   for(const sentence of sentences.length?sentences:[paragraph]){
    if(sentence.length>SLIDE_HARD_MAX){
     if(bucket){out.push(bucket);bucket=''}
     out.push(...splitLongPiece(sentence));
     continue;
    }
    const next=bucket?`${bucket} ${sentence}`:sentence;
    if(next.length>SLIDE_TARGET&&bucket){out.push(bucket);bucket=sentence}else bucket=next;
   }
   if(bucket)out.push(bucket);
  }
 }
 return out.length?out:[text];
}

export function structureTeachingSteps(sourceSteps:string[],checks:string[]=[]):StructuredTeachingStep[]{
 const out:StructuredTeachingStep[]=[];let sequence=0;const seen=new Map<string,number>();
 const idFor=(kind:'teach'|'check',text:string)=>{const base=stableStepBase(kind,text);const n=(seen.get(base)||0)+1;seen.set(base,n);return n===1?base:`${base}-${n}`};
 for(const raw of sourceSteps){
  const text=String(raw||'').trim();if(!text)continue;
  const fragments=text.split(/(\[PAUSE\]|\[ON SCREEN:\s*[\s\S]*?\])/gi).map(x=>x.trim()).filter(Boolean);
  for(const fragment of fragments){
   if(/^\[PAUSE\]$/i.test(fragment)){
    sequence++;
    out.push({id:idFor('teach',`${text}-pause-${sequence}`),sequence,boardAction:'PAUSE',boardText:'',narration:'',pauseAfterMs:1100,requiresLearnerResponse:false,sourceText:''});
    continue;
   }
   const screen=fragment.match(/^\[ON SCREEN:\s*([\s\S]*?)\]$/i);
   if(screen){
    const boardText=cleanBoard(screen[1]);
    sequence++;
    const boardAction=isDrawInstruction(boardText)?'DRAW':'WRITE';
    out.push({id:idFor('teach',`${text}-screen-${boardText}`),sequence,boardAction,boardText,narration:'',pauseAfterMs:900,requiresLearnerResponse:false,sourceText:''});
    continue;
   }
   for(const slide of splitTeachingSlides(fragment)){
    const boardAction=actionFor(slide);sequence++;
    out.push({id:idFor('teach',slide),sequence,boardAction,boardText:cleanBoard(slide),narration:slide,pauseAfterMs:boardAction==='DRAW'?1800:boardAction==='HIGHLIGHT'?1100:750,requiresLearnerResponse:false,sourceText:slide});
   }
  }
 }
 for(const raw of checks){
  const text=String(raw||'').trim();if(!text)continue;
  sequence++;
  out.push({id:idFor('check',text),sequence,boardAction:'ASK',boardText:cleanBoard(text),narration:text,pauseAfterMs:0,requiresLearnerResponse:true,sourceText:text});
 }
 return out;
}
