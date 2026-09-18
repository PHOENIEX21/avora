export type BoardAction='WRITE'|'DRAW'|'HIGHLIGHT'|'CLEAR_SECTION'|'ASK'|'PAUSE';
export type StructuredTeachingStep={id:string;sequence:number;boardAction:BoardAction;boardText:string;narration:string;pauseAfterMs:number;requiresLearnerResponse:boolean;sourceText:string};

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
   const boardAction=actionFor(fragment);sequence++;
   out.push({id:idFor('teach',fragment),sequence,boardAction,boardText:cleanBoard(fragment),narration:fragment,pauseAfterMs:boardAction==='DRAW'?1800:boardAction==='HIGHLIGHT'?1100:750,requiresLearnerResponse:false,sourceText:fragment});
  }
 }
 for(const raw of checks){
  const text=String(raw||'').trim();if(!text)continue;
  sequence++;
  out.push({id:idFor('check',text),sequence,boardAction:'ASK',boardText:cleanBoard(text),narration:text,pauseAfterMs:0,requiresLearnerResponse:true,sourceText:text});
 }
 return out;
}
