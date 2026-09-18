'use client';
import type {VisualSpec} from '@/lib/visualTeaching';

function Axes(){
  return <svg viewBox="0 0 360 220" role="img" aria-label="Coordinate axes">
    <line x1="35" y1="110" x2="335" y2="110" className="v-stroke"/><line x1="180" y1="15" x2="180" y2="205" className="v-stroke"/>
    <path d="M335 110l-10-5v10zM180 15l-5 10h10z" className="v-fill"/><text x="340" y="105">x</text><text x="188" y="22">y</text>
    {[80,130,230,280].map(x=><line key={x} x1={x} y1="106" x2={x} y2="114" className="v-thin"/> )}
    {[55,165].map(y=><line key={y} x1="176" y1={y} x2="184" y2={y} className="v-thin"/> )}
  </svg>
}
function Triangle(){return <svg viewBox="0 0 360 220" role="img" aria-label="Labelled geometry figure"><path d="M65 180 L285 180 L115 45 Z" className="v-shape"/><text x="50" y="198">A</text><text x="292" y="198">B</text><text x="105" y="36">C</text><path d="M65 180h18v-18" className="v-thin"/><text x="155" y="205">base</text><text x="72" y="108">height</text></svg>}
function Polygon(){return <svg viewBox="0 0 360 220" role="img" aria-label="Polygon divided into triangles"><path d="M75 175 L45 85 L130 30 L260 55 L315 145 L210 195 Z" className="v-shape"/><line x1="75" y1="175" x2="130" y2="30" className="v-guide"/><line x1="75" y1="175" x2="260" y2="55" className="v-guide"/><line x1="75" y1="175" x2="315" y2="145" className="v-guide"/></svg>}
function NumberLine(){return <svg viewBox="0 0 360 150" role="img" aria-label="Number line"><line x1="35" y1="75" x2="330" y2="75" className="v-stroke"/><path d="M330 75l-10-5v10zM35 75l10-5v10z" className="v-fill"/>{[-3,-2,-1,0,1,2,3].map((n,i)=>{const x=60+i*42;return <g key={n}><line x1={x} y1="68" x2={x} y2="82" className="v-thin"/><text x={x-6} y="105">{n}</text></g>})}</svg>}
function Fraction(){return <svg viewBox="0 0 360 190" role="img" aria-label="Fraction area model"><rect x="55" y="45" width="250" height="90" rx="4" className="v-shape"/>{[1,2,3].map(i=><line key={i} x1={55+i*62.5} y1="45" x2={55+i*62.5} y2="135" className="v-thin"/>)}<rect x="55" y="45" width="125" height="90" className="v-soft"/><text x="115" y="165">equal parts of one whole</text></svg>}
function Place({binary=false}:{binary?:boolean}){const labels=binary?['8','4','2','1']:['1000','100','10','1'];return <div className="visual-place-grid">{labels.map((x,i)=><div key={x}><small>{binary?'2'+['³','²','¹','⁰'][i]:x}</small><strong>{x}</strong></div>)}</div>}
function Equations(){return <div className="visual-equations" aria-label="Aligned equation board"><div><span>Equation (1)</span><b>ax + by = c</b></div><div><span>Equation (2)</span><b>dx + ey = f</b></div><i/><p>Keep x-terms under x-terms and y-terms under y-terms before adding or subtracting.</p></div>}
function Construction(){return <svg viewBox="0 0 360 220" role="img" aria-label="Compass construction diagram"><line x1="55" y1="165" x2="305" y2="165" className="v-stroke"/><circle cx="110" cy="165" r="75" className="v-arc"/><circle cx="250" cy="165" r="75" className="v-arc"/><line x1="180" y1="35" x2="180" y2="205" className="v-guide"/><circle cx="110" cy="165" r="3" className="v-fill"/><circle cx="250" cy="165" r="3" className="v-fill"/></svg>}
function Bearing(){return <svg viewBox="0 0 360 220" role="img" aria-label="Bearing and reference line diagram"><line x1="180" y1="195" x2="180" y2="25" className="v-stroke"/><line x1="75" y1="110" x2="285" y2="110" className="v-thin"/><text x="170" y="20">N</text><text x="292" y="115">E</text><text x="170" y="215">S</text><text x="58" y="115">W</text><line x1="180" y1="110" x2="275" y2="55" className="v-accent"/><path d="M180 63 A47 47 0 0 1 220 86" className="v-arc"/><text x="214" y="61">θ</text></svg>}
function Angle(){return <svg viewBox="0 0 360 190" role="img" aria-label="Angle diagram"><line x1="85" y1="145" x2="300" y2="145" className="v-stroke"/><line x1="85" y1="145" x2="215" y2="45" className="v-stroke"/><path d="M145 145 A60 60 0 0 0 132 108" className="v-accent"/><circle cx="85" cy="145" r="4" className="v-fill"/><text x="140" y="118">θ</text><text x="72" y="165">vertex</text></svg>}
function Solid(){return <svg viewBox="0 0 360 220" role="img" aria-label="Three dimensional cuboid"><path d="M85 75h150v105H85zM85 75l45-35h150l-45 35M235 75l45-35v105l-45 35M85 180l45-35h150" className="v-shape"/><text x="145" y="203">length</text><text x="43" y="130">height</text></svg>}
function DataChart(){return <svg viewBox="0 0 360 220" role="img" aria-label="Data chart framework"><line x1="55" y1="180" x2="325" y2="180" className="v-stroke"/><line x1="55" y1="180" x2="55" y2="35" className="v-stroke"/><rect x="85" y="125" width="42" height="55" className="v-soft"/><rect x="155" y="85" width="42" height="95" className="v-soft"/><rect x="225" y="55" width="42" height="125" className="v-soft"/><text x="83" y="202">categories</text><text x="12" y="28">value</text></svg>}
function BarModel(){return <div className="visual-bar-model" aria-label="Equal-part ratio bar model">{[0,1,2,3,4].map(i=><span key={i}>{i+1}</span>)}</div>}

export default function VisualBoard({spec}:{spec:VisualSpec}){
 if(spec.kind==='none') return null;
 let body:React.ReactNode=null;
 if(spec.kind==='coordinate-plane') body=<Axes/>;
 else if(spec.kind==='number-line') body=<NumberLine/>;
 else if(spec.kind==='fraction-model') body=<Fraction/>;
 else if(spec.kind==='place-value') body=<Place/>;
 else if(spec.kind==='binary-place-value') body=<Place binary/>;
 else if(spec.kind==='aligned-equations') body=<Equations/>;
 else if(spec.kind==='triangle') body=<Triangle/>;
 else if(spec.kind==='polygon') body=<Polygon/>;
 else if(spec.kind==='construction') body=<Construction/>;
 else if(spec.kind==='bearing') body=<Bearing/>;
 else if(spec.kind==='angle') body=<Angle/>;
 else if(spec.kind==='solid') body=<Solid/>;
 else if(spec.kind==='data-chart') body=<DataChart/>;
 else if(spec.kind==='bar-model') body=<BarModel/>;
 return <section className="avora-visual-board"><header><b>{spec.title}</b><span>LIVE VISUAL</span></header><div className="avora-visual-stage">{body}</div><p>{spec.caption}</p></section>
}
