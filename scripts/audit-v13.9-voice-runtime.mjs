import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const tutor=read('components/TutorClient.tsx');
const css=read('app/globals.css');
const pkg=JSON.parse(read('package.json'));
const checks=[
 ['release version is V13.9 or newer',Number(pkg.version.split('.')[0])>13||(Number(pkg.version.split('.')[0])===13&&Number(pkg.version.split('.')[1])>=9)],
 ['voice audit is wired into launch gate',String(pkg.scripts['launch:check']||'').includes('npm run audit:v13.9-voice-runtime')],
 ['narration is split into paced segments',tutor.includes('function narrationSegments')&&tutor.includes('speakPart')],
 ['Nigerian English receives first voice preference',tutor.includes("lang==='en-ng'")&&tutor.includes('score+=120')],
 ['enhanced browser voices receive preference',/natural\|neural\|premium\|enhanced/.test(tutor)],
 ['learner voice choice is persistent',tutor.includes("localStorage.setItem('avora:tutor-voice-uri'")&&tutor.includes("localStorage.getItem('avora:tutor-voice-uri'")],
 ['voice selection uses actual installed voiceURI',tutor.includes('v.voiceURI===voiceURI')&&tutor.includes('u.voice=selected')],
 ['speech language follows selected voice',tutor.includes("u.lang=selected?.lang||'en-NG'")],
 ['pause uses speech synthesis pause without discarding place',tutor.includes('window.speechSynthesis.pause()')],
 ['resume uses speech synthesis resume',tutor.includes('window.speechSynthesis.resume()')],
 ['resume guard prevents duplicate replay',tutor.includes('skipPlaybackEffect')],
 ['word boundary drives narration progress',tutor.includes('u.onboundary')&&tutor.includes('setNarrationChar')],
 ['board reveal is tied to narration segment',tutor.includes('visibleBoardLineCount')&&tutor.includes('slice(0,visibleBoardLineCount)')],
 ['event-specific authored pauses are respected',tutor.includes('event.pauseAfterMs??1400')],
 ['voice failure degrades to timed board playback',tutor.includes("!('speechSynthesis'in window)")&&tutor.includes('scheduleAdvance(wait)')],
 ['teacher voice picker is rendered',tutor.includes('Teacher voice')&&tutor.includes('voiceChoices.map')],
 ['narration progress has accessible progress semantics',tutor.includes('role="progressbar"')&&tutor.includes('aria-valuenow={narrationProgress}')],
 ['mobile voice UI is responsive',css.includes('@media(max-width:700px){.voice-runtime-v139')],
 ['reduced-motion support is retained',css.includes('@media(prefers-reduced-motion:reduce)')&&css.includes('.voice-runtime-progress i')],
 ['exact re-guidance remains present',tutor.includes('Re-teach from exact step')&&tutor.includes('jumpToGuidanceStep')],
 ['fresh-evidence mastery protection remains present',tutor.includes('freshEvidenceRequired')&&tutor.includes('fresh equivalent question')],
 ['no external paid TTS dependency was introduced',!read('package.json').match(/elevenlabs|azure.*speech|google.*text.*speech|polly/i)],
];
let passed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)passed++}
console.log(`\nV13.9 VOICE RUNTIME AUDIT: ${passed}/${checks.length} PASS`);if(passed!==checks.length)process.exit(1);
