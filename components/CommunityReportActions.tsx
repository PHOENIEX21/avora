'use client';import {useState} from 'react';import {useRouter} from 'next/navigation';
export default function CommunityReportActions({reportId}:{reportId:string}){
 const [busy,setBusy]=useState(false);const router=useRouter();
 async function act(action:'DISMISSED'|'ACTIONED'){setBusy(true);try{const r=await fetch('/api/community/reports/'+reportId,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action})});if(r.ok)router.refresh()}finally{setBusy(false)}}
 return <div className="community-report-buttons"><button type="button" disabled={busy} onClick={()=>act('ACTIONED')}>Hide message</button><button type="button" disabled={busy} onClick={()=>act('DISMISSED')}>Dismiss report</button></div>;
}
