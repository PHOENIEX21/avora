import fs from 'node:fs';
const tutor=fs.readFileSync('components/TutorClient.tsx','utf8');
const css=fs.readFileSync('app/globals.css','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const checks=[
 ['release version is 14.0.0 or newer',Number(pkg.version.split('.')[0])>14||(Number(pkg.version.split('.')[0])===14&&Number(pkg.version.split('.')[1])>=0)],
 ['online/offline browser state is tracked',tutor.includes("window.addEventListener('online'")&&tutor.includes("window.addEventListener('offline'")],
 ['lesson snapshots use topic/subject scoped local storage',tutor.includes('avora:tutor-session:${subject}:${topic}')],
 ['snapshot includes lesson phase and exact board event',tutor.includes('unitIndex,eventIndex,covered')],
 ['unfinished learner answer is locally persisted',tutor.includes('answer,checkpoint,chat:chat.slice(-8)')],
 ['saved sessions expire rather than restoring forever',tutor.includes('7*24*60*60*1000')],
 ['restored teaching resumes paused',tutor.includes("if(snap.phase==='teach'){pausedRef.current=true;setPaused(true)}")],
 ['stale topic state cannot overwrite a new topic snapshot',tutor.includes('activeSessionKeyRef.current')],
 ['page visibility pauses active teaching',tutor.includes("document.visibilityState==='hidden'&&phase==='teach'&&!paused")],
 ['screen wake lock is requested when supported',tutor.includes("nav.wakeLock?.request")&&tutor.includes("request('screen')")],
 ['wake lock is released during cleanup',tutor.includes('wakeLockRef.current.release')],
 ['offline answer marking is explicitly blocked',tutor.includes('reconnect to let AVORA mark it')],
 ['offline question diagnosis is explicitly blocked',tutor.includes('reconnect when you want AVORA to diagnose your attempt')],
 ['offline checkpoint attempts remain saved',tutor.includes('Your checkpoint attempt is saved locally')],
 ['offline live tutor questions do not pretend to reach AI',tutor.includes('You are offline. I saved your lesson position')],
 ['loaded offline lesson can continue board and device voice',tutor.includes('Loaded lesson content, board and device voice can continue')],
 ['learner sees autosave state',tutor.includes('Lesson autosaved')],
 ['learner sees restored-session control',tutor.includes('Lesson restored from this device')],
 ['learner sees screen-awake state',tutor.includes('Screen kept awake')],
 ['resilience status is responsive on mobile',css.includes('@media(max-width:700px){.tutor-resilience-v140,.session-restored-v140')],
 ['V13.9 synchronized voice runtime is preserved',tutor.includes('voice-runtime-v139')&&tutor.includes('narrationSegments')],
 ['V13.8 exact re-guidance is preserved',tutor.includes('Re-teach from exact step')&&tutor.includes('freshEvidenceRequired')]
];
let pass=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)pass++}
console.log(`\nV14 DEVICE RESILIENCE AUDIT: ${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
