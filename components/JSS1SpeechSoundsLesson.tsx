'use client';
import {useEffect,useState} from 'react';

type Sound={ipa:string;name:string;how:string;examples:string[];contrast?:string;sentence:string};
const mono:Sound[]=[
{ipa:'/iː/',name:'long front vowel',how:'Spread the lips slightly. Keep the tongue high and forward. Hold the vowel steadily.',examples:['see','green','teacher','people','machine'],contrast:'ship — sheep',sentence:'The teacher sees three green leaves.'},
{ipa:'/ɪ/',name:'short front vowel',how:'Keep the tongue high and forward but lower and more relaxed than /iː/. Keep it short.',examples:['sit','fish','milk','women','busy'],contrast:'seat — sit',sentence:'The little fish swims in the river.'},
{ipa:'/e/',name:'short front vowel',how:'Open the mouth a little more than /ɪ/. Keep the tongue at the front.',examples:['pen','bed','head','many','friend'],contrast:'pen — pin',sentence:'Ten friends left their pens on the desk.'},
{ipa:'/æ/',name:'short open front vowel',how:'Open the mouth wider. Keep the tongue low and toward the front.',examples:['cat','bag','hand','black','family'],contrast:'men — man',sentence:'The black cat sat beside the bag.'},
{ipa:'/ɑː/',name:'long open back vowel',how:'Open the mouth and keep the tongue low and back. Hold the sound.',examples:['car','father','class','start','heart'],contrast:'cut — cart',sentence:'Father parked the car after class.'},
{ipa:'/ɒ/',name:'short back rounded vowel',how:'Open the mouth, keep the tongue low and back, and round the lips lightly.',examples:['hot','clock','shop','body','want'],contrast:'hat — hot',sentence:'The hot pot is on top of the box.'},
{ipa:'/ɔː/',name:'long back rounded vowel',how:'Round the lips. Keep the tongue toward the back and hold the sound.',examples:['law','talk','four','thought','water'],contrast:'cot — caught',sentence:'Paul saw four small balls.'},
{ipa:'/ʊ/',name:'short high back vowel',how:'Round the lips slightly. Keep the tongue high and back; make the sound short and relaxed.',examples:['book','good','put','woman','could'],contrast:'full — fool',sentence:'Put the good book on the table.'},
{ipa:'/uː/',name:'long high back vowel',how:'Round the lips more strongly and keep the tongue high and back. Hold the vowel.',examples:['food','blue','school','group','shoe'],contrast:'pull — pool',sentence:'Two pupils brought blue shoes to school.'},
{ipa:'/ʌ/',name:'short central vowel',how:'Keep the lips relaxed. The tongue is central and fairly low; make a short sound.',examples:['cup','bus','money','young','country'],contrast:'cap — cup',sentence:'The young boy ran for the bus.'},
{ipa:'/ɜː/',name:'long central vowel',how:'Keep the lips relaxed and the tongue central. Hold the vowel steadily.',examples:['bird','girl','learn','word','journey'],contrast:'bud — bird',sentence:'The girl learned a new word.'},
{ipa:'/ə/',name:'schwa',how:'Relax the mouth and tongue. This weak central vowel commonly occurs in unstressed syllables.',examples:['about','teacher','doctor','ago','support'],contrast:'strong vowel — weak schwa',sentence:'A teacher and a doctor arrived about an hour ago.'}
];
const dip:Sound[]=[
{ipa:'/eɪ/',name:'diphthong',how:'Begin around /e/ and glide upward toward /ɪ/. The tongue moves during one syllable.',examples:['day','name','rain','eight','break'],contrast:'pen — pain',sentence:'Jane waited for the train in the rain.'},
{ipa:'/aɪ/',name:'diphthong',how:'Begin with an open central/front position and glide toward /ɪ/.',examples:['my','time','light','five','eye'],contrast:'bit — bite',sentence:'Five bright lights shine at night.'},
{ipa:'/ɔɪ/',name:'diphthong',how:'Begin with rounded /ɔ/ and glide toward /ɪ/.',examples:['boy','coin','voice','choice','enjoy'],contrast:'ball — boil',sentence:'The boy enjoyed his choice of toy.'},
{ipa:'/əʊ/',name:'diphthong',how:'Begin centrally around /ə/ and glide toward rounded /ʊ/.',examples:['go','home','boat','open','know'],contrast:'not — note',sentence:'Joe will go home in the old boat.'},
{ipa:'/aʊ/',name:'diphthong',how:'Begin with an open vowel and glide upward toward rounded /ʊ/.',examples:['now','house','out','brown','town'],contrast:'cart — count',sentence:'The brown cow is outside the house.'},
{ipa:'/ɪə/',name:'diphthong',how:'Begin near /ɪ/ and glide toward the central /ə/ position.',examples:['ear','here','near','idea','serious'],contrast:'he — here',sentence:'Come near and hear the clear idea.'},
{ipa:'/eə/',name:'diphthong',how:'Begin near /e/ and glide toward /ə/.',examples:['air','care','chair','where','parent'],contrast:'bed — bared',sentence:'The parent left the chair near the stairs.'},
{ipa:'/ʊə/',name:'diphthong',how:'In traditional British descriptions, begin near /ʊ/ and glide toward /ə/. Some modern accents pronounce many of these words differently.',examples:['tour','pure','cure','jury','during'],contrast:'two — tour',sentence:'The tourist was curious during the tour.'}
];
const cons:Sound[]=[
{ipa:'/p/',name:'voiceless stop',how:'Close both lips, build air pressure, then release it. The vocal cords do not vibrate.',examples:['pen','cap','happy','paper','stop'],contrast:'pat — bat',sentence:'Peter put the paper in his pocket.'},
{ipa:'/b/',name:'voiced stop',how:'Close both lips and release the air as the vocal cords vibrate.',examples:['boy','bag','rubber','cab','baby'],contrast:'bat — pat',sentence:'The baby brought a blue bag.'},
{ipa:'/t/',name:'voiceless stop',how:'Place the tongue tip at the ridge just behind the upper teeth, stop the air, then release.',examples:['tea','top','water','cat','little'],contrast:'ten — den',sentence:'Tola took two tomatoes.'},
{ipa:'/d/',name:'voiced stop',how:'Use the same tongue position as /t/, but vibrate the vocal cords.',examples:['dog','day','ladder','red','door'],contrast:'den — ten',sentence:'David opened the red door.'},
{ipa:'/k/',name:'voiceless stop',how:'Raise the back of the tongue to the soft palate, stop the air, then release without voice.',examples:['cat','school','back','queen','kind'],contrast:'coat — goat',sentence:'Kate kept the key in her school bag.'},
{ipa:'/g/',name:'voiced stop',how:'Use the same back-of-tongue closure as /k/, but add vocal-cord vibration.',examples:['go','give','bag','bigger','girl'],contrast:'goat — coat',sentence:'The girl gave Grace a green bag.'},
{ipa:'/tʃ/',name:'voiceless affricate',how:'Begin with a stop like /t/ and release into a short /ʃ/-like friction.',examples:['chair','teacher','watch','nature','church'],contrast:'cheap — jeep',sentence:'The teacher chose a chair near the church.'},
{ipa:'/dʒ/',name:'voiced affricate',how:'Begin with a voiced stop and release into voiced friction.',examples:['job','giant','bridge','age','judge'],contrast:'jeep — cheap',sentence:'Jane crossed the bridge after her job.'},
{ipa:'/f/',name:'voiceless fricative',how:'Touch the lower lip lightly with the upper teeth and push air through without voice.',examples:['fish','phone','laugh','leaf','coffee'],contrast:'fan — van',sentence:'Four friends found fresh fish.'},
{ipa:'/v/',name:'voiced fricative',how:'Use the same lip-and-teeth position as /f/, but vibrate the vocal cords.',examples:['van','very','river','love','of'],contrast:'van — fan',sentence:'Victor drove the van very carefully.'},
{ipa:'/θ/',name:'voiceless dental fricative',how:'Place the tongue tip lightly between or just behind the teeth and let air pass; do not voice.',examples:['think','three','bath','author','healthy'],contrast:'thin — tin',sentence:'Three thoughtful pupils thanked the author.'},
{ipa:'/ð/',name:'voiced dental fricative',how:'Use the same tongue-and-teeth position as /θ/, but add vocal-cord vibration.',examples:['this','that','mother','breathe','they'],contrast:'then — den',sentence:'They told their mother that this was theirs.'},
{ipa:'/s/',name:'voiceless fricative',how:'Bring the tongue close to the ridge behind the upper teeth and force a narrow stream of air through.',examples:['see','city','rice','lesson','bus'],contrast:'sip — zip',sentence:'Six students sat beside the science room.'},
{ipa:'/z/',name:'voiced fricative',how:'Use a position similar to /s/ but vibrate the vocal cords.',examples:['zoo','zero','easy','nose','music'],contrast:'zip — sip',sentence:'Zainab plays music at the zoo.'},
{ipa:'/ʃ/',name:'voiceless fricative',how:'Raise the front of the tongue toward the area behind the tooth ridge; round the lips slightly and let air flow.',examples:['she','ship','nation','special','wash'],contrast:'sip — ship',sentence:'She washed the special shirt.'},
{ipa:'/ʒ/',name:'voiced fricative',how:'Use a position similar to /ʃ/ but add vocal-cord vibration.',examples:['measure','vision','usual','pleasure','television'],contrast:'pressure — pleasure',sentence:'The television programme gave us great pleasure.'},
{ipa:'/h/',name:'voiceless glottal fricative',how:'Let air pass freely through the open vocal tract from the throat; there is no oral closure.',examples:['hat','home','behind','happy','help'],contrast:'air — hair',sentence:'Helen hurried home to help her brother.'},
{ipa:'/m/',name:'voiced nasal',how:'Close both lips and let the vibrating air escape through the nose.',examples:['man','mother','summer','room','time'],contrast:'map — nap',sentence:'Mum made mango juice in the morning.'},
{ipa:'/n/',name:'voiced nasal',how:'Touch the tongue tip to the ridge behind the upper teeth and let vibrating air escape through the nose.',examples:['no','name','dinner','sun','nine'],contrast:'nap — map',sentence:'Nine nurses knew the new name.'},
{ipa:'/ŋ/',name:'voiced nasal',how:'Raise the back of the tongue to the soft palate and let vibrating air escape through the nose. Do not add /g/ unless the word has it.',examples:['sing','long','singer','thinking','song'],contrast:'sin — sing',sentence:'The singer sang a long song.'},
{ipa:'/l/',name:'voiced liquid',how:'Place the tongue tip at the ridge behind the upper teeth while air passes around the sides of the tongue.',examples:['leg','light','yellow','feel','school'],contrast:'light — right',sentence:'Lola left the yellow light on.'},
{ipa:'/r/',name:'voiced liquid',how:'For a common British-style model, raise the tongue toward the area behind the tooth ridge without touching it; avoid rolling unless your accent naturally does.',examples:['red','run','around','carry','right'],contrast:'right — light',sentence:'Rita ran around the red room.'},
{ipa:'/w/',name:'voiced semi-vowel',how:'Round the lips as for /uː/, then glide quickly into the following vowel.',examples:['we','water','away','quick','one'],contrast:'west — rest',sentence:'We will walk home when it is warm.'},
{ipa:'/j/',name:'voiced semi-vowel',how:'Raise the front of the tongue as for /iː/ and glide quickly into the following vowel.',examples:['yes','you','young','use','few'],contrast:'yet — wet',sentence:'You used the yellow uniform yesterday.'}
];
const groups=[['Monophthongs — pure vowels',mono],['Diphthongs — gliding vowels',dip],['Consonants — stops, fricatives, nasals, liquids and semi-vowels',cons]] as const;

function speak(text:string,rate=.78){
 if(typeof window==='undefined'||!('speechSynthesis' in window))return;
 window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); const voices=window.speechSynthesis.getVoices();
 const voice=[...voices].filter(v=>/^en(-|_)/i.test(v.lang)).sort((a,b)=>(b.lang.toLowerCase()==='en-gb'?2:b.lang.toLowerCase()==='en-ng'?1:0)-(a.lang.toLowerCase()==='en-gb'?2:a.lang.toLowerCase()==='en-ng'?1:0))[0];
 if(voice){u.voice=voice;u.lang=voice.lang}else u.lang='en-GB';u.rate=rate;u.pitch=1;window.speechSynthesis.speak(u);
}

export default function JSS1SpeechSoundsLesson({onExercise}:{onExercise:()=>void}){
 const [supported,setSupported]=useState(true); const [open,setOpen]=useState('Monophthongs — pure vowels');
 useEffect(()=>setSupported(typeof window!=='undefined'&&'speechSynthesis'in window),[]);
 return <section className="speechLesson">
  <style>{`
   .speechLesson{display:grid;gap:18px}.speechHero,.soundFoundation,.soundGroup,.practiceBox{border:1px solid #dbe4ea;border-radius:22px;background:#fff;padding:20px;box-shadow:0 8px 28px rgba(15,23,42,.05)}
   .speechHero h2{font-size:clamp(1.55rem,4vw,2.35rem);margin:0 0 8px}.speechHero p,.soundFoundation p{line-height:1.72}.soundRule{background:#f7fafc;border-left:4px solid currentColor;padding:12px 14px;border-radius:10px;margin:10px 0}
   .soundTabs{display:flex;gap:8px;flex-wrap:wrap}.soundTabs button,.hear,.exerciseBtn{border:0;border-radius:999px;padding:10px 14px;font-weight:700;cursor:pointer}.soundTabs button{background:#eef2f5}.soundTabs button[aria-pressed=true]{background:#111827;color:white}.hear{background:#edf6ff;color:#0b4f8a}.hear:disabled{opacity:.45;cursor:not-allowed}
   .soundGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:12px;margin-top:14px}.soundCard{border:1px solid #e3e8ee;border-radius:16px;padding:15px;display:grid;gap:9px}.ipa{font-size:2rem;font-weight:800}.kind{font-weight:700}.how{line-height:1.55}.words{display:flex;flex-wrap:wrap;gap:6px}.word{background:#f5f7f9;border-radius:999px;padding:6px 9px}.controls{display:flex;gap:7px;flex-wrap:wrap}.contrast{font-weight:700}.sentence{font-style:italic;line-height:1.5}.exerciseBtn{background:#111827;color:white;padding:13px 18px}.note{font-size:.93rem;opacity:.8}
  `}</style>
  <header className="speechHero"><div className="note">JSS1 English • Listening and Speaking</div><h2>Speech Sounds: Vowels and Consonants</h2>
   <p><strong>Pronunciation is about sounds, not simply letters.</strong> English spelling does not always tell us exactly how a word sounds. In this lesson, the symbols between slashes show sounds. You will learn to identify a sound, feel how it is made, hear it in several words, compare it with another sound, and then produce it yourself.</p>
   <div className="soundRule"><strong>Your learning cycle:</strong> LOOK at the symbol → FEEL the mouth/tongue/voice position → LISTEN to several examples → COMPARE a contrast pair → REPEAT → IDENTIFY the sound in a fresh word.</div>
   {!supported&&<p role="alert"><strong>Audio is unavailable in this browser.</strong> The written articulation guidance remains available, but use a browser/device with speech synthesis for the listening practice.</p>}
  </header>
  <article className="soundFoundation">
   <h3>1. Foundation: sound is not the same as spelling</h3>
   <p>A <strong>letter</strong> is a written symbol. A <strong>speech sound</strong> is what the voice and speech organs produce and the ear hears. The same letter can represent different sounds, and the same sound can have different spellings. That is why pronunciation dictionaries use phonetic symbols.</p>
   <p><strong>Vowels</strong> are produced with a relatively open passage for the air. <strong>Monophthongs</strong> are pure vowels whose quality stays relatively steady. <strong>Diphthongs</strong> glide from one vowel position toward another within one syllable. <strong>Consonants</strong> involve a narrowing or closure somewhere in the vocal tract.</p>
   <p>For consonants, ask three questions: <strong>Where?</strong> Which speech organs are involved? <strong>How?</strong> Is the air stopped, squeezed, sent through the nose, or allowed around the tongue? <strong>Voice?</strong> Do the vocal cords vibrate? Put two fingers gently on your throat and compare <em>ssss</em> with <em>zzzz</em>: /s/ is voiceless while /z/ is voiced.</p>
   <p><strong>Stops</strong> briefly block the air before release. <strong>Fricatives</strong> force air through a narrow space and create friction. <strong>Nasals</strong> send air through the nose. <strong>Liquids</strong> allow relatively free airflow around or near the tongue. <strong>Semi-vowels</strong> begin with a vowel-like tongue/lip position and glide quickly into another vowel.</p>
  </article>
  <nav className="soundTabs" aria-label="Sound groups">{groups.map(([title])=><button key={title} type="button" aria-pressed={open===title} onClick={()=>setOpen(title)}>{title}</button>)}</nav>
  {groups.map(([title,sounds])=>open===title&&<article className="soundGroup" key={title}><h3>{title}</h3>
   <div className="soundGrid">{sounds.map(s=><div className="soundCard" key={s.ipa}>
    <div><span className="ipa">{s.ipa}</span> <span className="kind">{s.name}</span></div>
    <div className="how"><strong>Make it:</strong> {s.how}</div>
    <div className="words">{s.examples.map(w=><span className="word" key={w}>{w}</span>)}</div>
    <div className="controls"><button className="hear" disabled={!supported} onClick={()=>speak(s.examples.join('. '),.7)}>🔊 Hear examples</button><button className="hear" disabled={!supported} onClick={()=>speak(s.contrast||s.examples.slice(0,2).join('. '),.68)}>🔊 Hear contrast</button><button className="hear" disabled={!supported} onClick={()=>speak(s.sentence,.78)}>🔊 Hear sentence</button></div>
    {s.contrast&&<div className="contrast">Contrast: {s.contrast}</div>}<div className="sentence">“{s.sentence}”</div>
   </div>)}</div>
  </article>)}
  <article className="practiceBox"><h3>2. How to practise until the difference is clear</h3>
   <p><strong>Listen first.</strong> Do not look only at spelling. Play the examples twice. Then play the contrast and decide what changed. Repeat each word slowly, then naturally. Finally, cover the symbol and ask yourself which sound you heard.</p>
   <p><strong>Minimal/contrast pairs</strong> are powerful because changing one important sound can change a word: <em>ship/sheep</em>, <em>full/fool</em>, <em>fan/van</em>, <em>sip/zip</em>, <em>light/right</em>. The goal is not to imitate one person's accent perfectly; the goal is clear, intelligible production and reliable listening discrimination.</p>
   <p><strong>Common mistakes:</strong> judging a sound only by spelling; adding an extra vowel after a consonant; confusing voiced and voiceless pairs; turning /ŋ/ in <em>sing</em> into /ŋg/ when the word does not contain /g/; and calling every two written vowels a diphthong. Classification depends on the sound actually produced.</p>
   <button type="button" className="exerciseBtn" onClick={onExercise}>Start 20-question sound mastery →</button>
  </article>
 </section>
}