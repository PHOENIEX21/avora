export type BoardAction =
 | {type:'write';text:string}
 | {type:'highlight';target:string;reason?:string}
 | {type:'transform';from:string;to:string;reason:string}
 | {type:'label';target:string;label:string}
 | {type:'draw';shape:'line'|'ray'|'angle'|'triangle'|'rectangle'|'circle'|'number-line'|'axes';data?:Record<string,string|number>}
 | {type:'pause_for_student';prompt:string;expectation:string}
 | {type:'check';statement:string;result:string};

export type BoardLesson={subject:string;title:string;question?:string;actions:BoardAction[];resumeKey:string};

/** A deterministic board plan is stored/rendered by AVORA; AI may explain it but cannot silently change mathematical/linguistic truth. */
export function equationBoard(question:string,steps:Array<{from?:string;to:string;why:string}>,check?:string):BoardLesson{
 const actions:BoardAction[]=[{type:'write',text:question}];
 for(const s of steps){
  if(s.from) actions.push({type:'transform',from:s.from,to:s.to,reason:s.why});
  else actions.push({type:'write',text:s.to});
 }
 if(check)actions.push({type:'check',statement:'Verify the result',result:check});
 return {subject:'Mathematics',title:'Teach this solution on board',question,actions,resumeKey:`math:${question}`};
}

export function languageBoard(question:string,actions:BoardAction[]):BoardLesson{
 return {subject:'English Language',title:'Teach this on board',question,actions,resumeKey:`english:${question}`};
}
