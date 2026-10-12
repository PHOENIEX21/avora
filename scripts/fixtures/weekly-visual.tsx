import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import WeeklyDashboard from '../../components/WeeklyDashboard';
import WeeklyPracticeRunner from '../../components/WeeklyPracticeRunner';
import WeeklyStudySettings from '../../components/WeeklyStudySettings';
import '../../app/globals.css';
const subjects=['Mathematics','English Language','Basic Science','Civic Education','Social Studies','A long optional subject name for layout checks'];
const id='11111111-1111-4111-8111-111111111111';
function Fixture(){
 const [stored,setStored]=useState<Record<string,{source:'TEXTBOOK'|'LESSON';action:string}>>(()=>JSON.parse(localStorage.getItem('AVORA_TEST_ONLY_STUDY')||'{}'));
 useEffect(()=>{const refresh=()=>setStored(JSON.parse(localStorage.getItem('AVORA_TEST_ONLY_STUDY')||'{}'));window.addEventListener('fixture-refresh',refresh);return()=>window.removeEventListener('fixture-refresh',refresh)},[]);
 if(location.pathname==='/practice')return <WeeklyPracticeRunner objectiveId={id}/>;
 if(location.pathname==='/settings')return <WeeklyStudySettings/>;
 const history=location.pathname==='/history';
 return <WeeklyDashboard classLevel="JSS1" term={1} week={history?1:2} currentTerm={1} currentWeek={2}
  weeks={[{term:1,week:1},{term:1,week:2}]} objectives={location.pathname==='/empty'?[]:subjects.flatMap((subject,i)=>[0,1].map(j=>{
   const objectiveId=i===0&&j===0?id:`00000000-0000-4000-8000-${String(i*2+j).padStart(12,'0')}`;
   return {id:objectiveId,subject,topic:'TEST_ONLY topic with a long title for phone wrapping',text:'TEST_ONLY objective: inspect the supplied fixture carefully without adding curriculum content.',
    source:'TEST_ONLY_NOT_CURRICULUM',lessonHref:j===0?'/tutor?fixture=only':null,studied:stored[objectiveId]?.action==='COMPLETE',studySource:stored[objectiveId]?.source||null,
    progress:{status:i===1&&j===0?'MASTERED':'NOT_STARTED',evidence:i===1&&j===0?7:0,accuracy:i===1&&j===0?100:null}};
  }))}/>
}
createRoot(document.getElementById('root')!).render(<Fixture/>);
