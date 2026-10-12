const gems:Record<string,string>={
 'english':'#3B82F6','english language':'#3B82F6','mathematics':'#E8590C',
 'basic science':'#12A594','social studies':'#9C36B5','civic education':'#9C36B5',
 'basic technology':'#197D9A','computer studies':'#197D9A','physical and health education':'#287A47',
 'agricultural science':'#287A47','business studies':'#AD536E','cultural and creative arts':'#AD536E',
 'christian religious studies':'#805BB2','islamic religious studies':'#805BB2',
};
export function weeklySubjectColour(subject:string){return gems[subject.trim().toLowerCase()]||'#697183'}
export function weeklyObjectiveState(objective:{studied:boolean;studySource:string|null;progress:{status:string;evidence:number}}){
 if(objective.progress.status==='MASTERED')return {label:'Mastered',tone:'mastered'};
 if(objective.progress.status==='STRUGGLING')return {label:'Needs practice',tone:'practice'};
 if(objective.progress.evidence>0)return {label:'Practising',tone:'practice'};
 if(objective.studied)return {label:'Studied',tone:'studied'};
 if(objective.studySource)return {label:'Studying',tone:'studying'};
 return {label:'Not started',tone:'unseen'};
}
