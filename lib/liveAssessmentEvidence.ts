export type LiveTopicResult={topic:string;correct:number;total:number;percent:number;status:'STRONG'|'DEVELOPING'|'NEEDS_ATTENTION'};

export function statusFor(percent:number):LiveTopicResult['status']{
 if(percent>=80)return 'STRONG';
 if(percent>=60)return 'DEVELOPING';
 return 'NEEDS_ATTENTION';
}

export function buildLiveTopicResults(rows:Array<{topic:string;is_correct:boolean|null}>):LiveTopicResult[]{
 const grouped=new Map<string,{correct:number;total:number}>();
 for(const row of rows){const topic=String(row.topic||'Unclassified');const x=grouped.get(topic)||{correct:0,total:0};x.total++;if(row.is_correct===true)x.correct++;grouped.set(topic,x)}
 return [...grouped.entries()].map(([topic,x])=>{const percent=x.total?Math.round(x.correct/x.total*100):0;return {topic,correct:x.correct,total:x.total,percent,status:statusFor(percent)}}).sort((a,b)=>a.percent-b.percent||a.topic.localeCompare(b.topic));
}

export function liveReportSummary(name:string,score:number,topics:LiveTopicResult[]){
 const weakest=topics[0]||null,strongest=[...topics].sort((a,b)=>b.percent-a.percent)[0]||null;
 const weak=topics.filter(x=>x.percent<60),developing=topics.filter(x=>x.percent>=60&&x.percent<80);
 const opening=score>=80?`${name} demonstrated strong independent performance in this supervised assessment.`:score>=60?`${name} showed developing understanding, with clear areas ready for targeted reinforcement.`:`${name} needs focused reteaching before the next supervised assessment.`;
 const detail=weak.length?` Priority attention: ${weak.slice(0,3).map(x=>x.topic).join(', ')}.`:developing.length?` The next improvement opportunity is ${developing.slice(0,2).map(x=>x.topic).join(' and ')}.`:` The assessed topics currently show secure evidence.`;
 const next=weakest?.topic||null;
 return {summary:opening+detail,strongest:strongest?.topic||null,weakest:weakest?.topic||null,recommended:next};
}
