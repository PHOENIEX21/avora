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

function PlaneShapes({caption}:{caption:string}){
 const t=caption.toLowerCase();
 const common=<><defs><marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L6,3.5 L0,7" className="v-fill"/></marker></defs></>;
 if(/circle|radius|diameter|chord|sector|segment|tangent|circumference/.test(t))return <svg viewBox="0 0 360 250" role="img" aria-label="Exact labelled circle showing centre, radius, diameter, chord, tangent, sector and segment"><title>Circle properties</title>{common}<circle cx="180" cy="125" r="82" className="v-shape"/><circle cx="180" cy="125" r="4" className="v-fill"/><text x="188" y="130">O</text><line x1="180" y1="125" x2="262" y2="125" className="v-accent"/><text x="218" y="116">radius</text><line x1="98" y1="125" x2="262" y2="125" className="v-stroke"/><text x="145" y="145">diameter</text><line x1="125" y1="74" x2="235" y2="74" className="v-guide"/><text x="164" y="65">chord</text><line x1="262" y1="35" x2="262" y2="215" className="v-stroke"/><circle cx="262" cy="125" r="3" className="v-fill"/><text x="270" y="94">tangent</text><path d="M180 125 L180 43 A82 82 0 0 1 250 83 Z" className="v-soft"/><text x="205" y="78">sector</text><path d="M125 74 A82 82 0 0 1 235 74 L125 74" className="v-arc"/><text x="146" y="42">arc / segment boundary</text></svg>;
 if(/triangle/.test(t))return <svg viewBox="0 0 360 230" role="img" aria-label="Equilateral, isosceles and scalene triangles with standard equality marks"><title>Triangle classification by side properties</title><g transform="translate(15 35)"><path d="M10 145L70 35l60 110z" className="v-shape"/><path d="M37 91l10 5M93 91l10-5M65 145v-11" className="v-accent"/><text x="29" y="172">equilateral</text></g><g transform="translate(125 35)"><path d="M10 145L70 35l75 110z" className="v-shape"/><path d="M37 91l10 5M101 91l10-5" className="v-accent"/><text x="38" y="172">isosceles</text></g><g transform="translate(245 35)"><path d="M5 145L50 45l92 100z" className="v-shape"/><text x="28" y="172">scalene</text></g></svg>;
 if(/rotation|rotated/.test(t))return <svg viewBox="0 0 360 230" role="img" aria-label="The same square shown upright and rotated, retaining equal-side and right-angle properties"><title>Rotation does not change a square</title><rect x="55" y="65" width="90" height="90" className="v-shape"/><g transform="rotate(45 255 110)"><rect x="210" y="65" width="90" height="90" className="v-shape"/></g><path d="M55 65h16v16M210 65h16v16" className="v-accent"/><text x="64" y="184">square</text><text x="213" y="184">same square, rotated</text></svg>;
 return <svg viewBox="0 0 360 285" role="img" aria-label="Accurate comparison of square, rectangle, parallelogram, rhombus, trapezium and kite with standard property markings"><title>Quadrilateral property comparison</title>{common}<g transform="translate(12 18)"><rect x="5" y="5" width="72" height="72" className="v-shape"/><path d="M5 5h12v12M39 5v9M39 77v-9M5 41h9M77 41h-9" className="v-accent"/><text x="18" y="98">square</text></g><g transform="translate(105 18)"><rect x="5" y="12" width="105" height="58" className="v-shape"/><path d="M5 12h12v12" className="v-accent"/><text x="25" y="98">rectangle</text></g><g transform="translate(235 18)"><path d="M25 12h92L97 72H5z" className="v-shape"/><text x="16" y="98">parallelogram</text></g><g transform="translate(10 150)"><path d="M45 5l42 42-42 42L3 47z" className="v-shape"/><path d="M23 26l8 8M59 26l8-8M23 68l8-8M59 68l8 8" className="v-accent"/><text x="20" y="112">rhombus</text></g><g transform="translate(120 150)"><path d="M25 8h75l20 78H5z" className="v-shape"/><text x="24" y="112">trapezium</text></g><g transform="translate(260 150)"><path d="M45 5l40 48-40 38L5 53z" className="v-shape"/><path d="M22 31l8 6M60 31l8-6M23 72l8-6M59 72l8 6" className="v-accent"/><text x="30" y="112">kite</text></g></svg>;
}


function SimilarShapes({context}:{context:string}){
 const t=context.toLowerCase();
 const label=(x:number,y:number,s:string)=><text x={x} y={y} className="v-label">{s}</text>;
 if(/cube|cuboid|volume|capacity/.test(t))return <svg viewBox="0 0 420 250" role="img" aria-label="Two similar solids with corresponding dimensions and scale factor">
   <title>Similar solids: linear dimensions scale by k and volume by k cubed</title>
   <g transform="translate(18 65)"><path d="M20 45h82v78H20zM20 45l28-23h82l-28 23M102 45l28-23v78l-28 23M20 123l28-23h82" className="v-shape"/>{label(43,148,'small solid')}</g>
   <path d="M166 125h48" className="v-accent"/><path d="M214 125l-11-6v12z" className="v-fill"/>{label(173,112,'× k')}
   <g transform="translate(225 38)"><path d="M20 45h125v120H20zM20 45l38-30h125l-38 30M145 45l38-30v120l-38 30M20 165l38-30h125" className="v-shape"/>{label(55,190,'large solid')}</g>
   {label(18,22,'length factor = k')}{label(155,22,'area factor = k²')}{label(292,22,'volume factor = k³')}
 </svg>;
 if(/coordinate|origin/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Triangle enlarged from the origin on coordinate axes">
   <title>Coordinate enlargement about the origin</title><line x1="35" y1="225" x2="395" y2="225" className="v-stroke"/><line x1="70" y1="250" x2="70" y2="20" className="v-stroke"/>
   <path d="M105 190L165 190L105 135Z" className="v-guide"/><path d="M140 155L260 155L140 45Z" className="v-shape"/>
   {label(93,207,'A')}{label(166,207,'B')}{label(92,130,'C')}{label(127,174,"A′")}{label(263,174,"B′")}{label(126,40,"C′")}{label(255,238,'x')}{label(78,28,'y')}{label(278,78,'same centre O, every coordinate × k')}
 </svg>;
 if(/rectangle|square|area|perimeter|distortion|photo/.test(t))return <svg viewBox="0 0 420 250" role="img" aria-label="Two corresponding similar rectangles showing proportional side lengths">
   <title>Similar rectangles: corresponding dimensions use one scale factor</title>
   <rect x="35" y="85" width="105" height="70" className="v-shape"/><rect x="235" y="55" width="150" height="100" className="v-shape"/>
   {label(63,78,'length a')}{label(7,125,'width b')}{label(278,48,'length ka')}{label(190,110,'width kb')}
   <path d="M155 118h55" className="v-accent"/><path d="M210 118l-11-6v12z" className="v-fill"/>{label(169,105,'× k')}
   {label(42,183,'Original')}{label(273,183,'Similar image')}{label(93,220,'Area A')}{label(288,220,'Area k²A')}
 </svg>;
 return <svg viewBox="0 0 420 260" role="img" aria-label="Two similar labelled triangles showing corresponding vertices, sides and scale factor">
   <title>Similar triangles with corresponding vertices and proportional sides</title>
   <path d="M35 205L155 205L75 85Z" className="v-shape"/><path d="M225 205L390 205L280 40Z" className="v-shape"/>
   {label(20,224,'A')}{label(157,224,'B')}{label(65,78,'C')}{label(210,224,'P')}{label(393,224,'Q')}{label(270,34,'R')}
   {label(72,225,'AB')}{label(295,225,'PQ = k·AB')}{label(42,145,'AC')}{label(226,127,'PR = k·AC')}
   <path d="M166 133h45" className="v-accent"/><path d="M211 133l-11-6v12z" className="v-fill"/>{label(175,120,'× k')}
   <path d="M42 198 A18 18 0 0 1 54 184M232 198 A24 24 0 0 1 248 180" className="v-accent"/>
   {label(34,248,'A ↔ P   B ↔ Q   C ↔ R     corresponding angles equal; corresponding sides proportional')}
 </svg>
}


function TrigonometryDiagram({context}:{context:string}){
 const t=context.toLowerCase();
 const L=(x:number,y:number,s:string)=><text x={x} y={y} className="v-label">{s}</text>;
 if(/ladder/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Ladder against a vertical wall forming a labelled right triangle">
  <title>Ladder application of right-triangle trigonometry</title><line x1="85" y1="225" x2="385" y2="225" className="v-stroke"/><line x1="330" y1="225" x2="330" y2="35" className="v-stroke"/><line x1="115" y1="225" x2="330" y2="65" className="v-accent"/>
  <path d="M312 225v-18h18" className="v-thin"/><path d="M155 225 A40 40 0 0 0 147 201" className="v-guide"/>{L(151,199,'θ')}{L(200,130,'ladder = H')}{L(337,145,'height = O')}{L(190,247,'ground distance = A')}
 </svg>;
 if(/guy wire|cable|rope/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Vertical pole and supporting cable forming a labelled right triangle">
  <title>Cable or guy-wire application</title><line x1="45" y1="225" x2="390" y2="225" className="v-stroke"/><line x1="300" y1="225" x2="300" y2="45" className="v-stroke"/><line x1="85" y1="225" x2="300" y2="45" className="v-accent"/>
  <path d="M282 225v-18h18" className="v-thin"/><path d="M128 225 A43 43 0 0 0 118 198" className="v-guide"/>{L(125,197,'θ')}{L(178,126,'wire = H')}{L(307,140,'pole = O')}{L(172,247,'ground = A')}
 </svg>;
 if(/height|tower|pole|observer|distance/.test(t))return <svg viewBox="0 0 420 285" role="img" aria-label="Observer viewing the top of a vertical object across level ground">
  <title>Height and distance application</title><line x1="35" y1="235" x2="395" y2="235" className="v-stroke"/><line x1="335" y1="235" x2="335" y2="35" className="v-stroke"/><circle cx="80" cy="188" r="9" className="v-shape"/><line x1="80" y1="197" x2="80" y2="235" className="v-thin"/><line x1="80" y1="188" x2="335" y2="35" className="v-accent"/><line x1="80" y1="188" x2="335" y2="188" className="v-guide"/>
  <path d="M320 235v-15h15" className="v-thin"/><path d="M125 188 A45 45 0 0 0 119 165" className="v-guide"/>{L(122,163,'θ')}{L(342,132,'vertical rise = O')}{L(176,213,'horizontal distance = A')}{L(184,92,'line of sight = H')}
 </svg>;
 if(/ramp|inclination/.test(t))return <svg viewBox="0 0 420 250" role="img" aria-label="Ramp represented as a labelled right triangle">
  <title>Ramp and angle of inclination</title><path d="M60 205L350 205L350 65Z" className="v-shape"/><path d="M332 205v-18h18" className="v-thin"/><path d="M110 205 A50 50 0 0 0 104 181" className="v-guide"/>{L(108,178,'θ')}{L(184,225,'horizontal run = A')}{L(356,142,'rise = O')}{L(195,124,'ramp = H')}
 </svg>;
 return <svg viewBox="0 0 420 280" role="img" aria-label="Right-angled triangle labelled relative to reference angle theta">
  <title>Opposite, adjacent and hypotenuse relative to θ</title><path d="M55 225L355 225L355 55Z" className="v-shape"/><path d="M335 225v-20h20" className="v-accent"/>{L(326,250,'90°')}
  <path d="M112 225 A57 57 0 0 0 104 193" className="v-guide"/>{L(111,190,'θ')}{L(178,249,'ADJACENT (A)')}{L(360,145,'OPPOSITE (O)')}{L(176,126,'HYPOTENUSE (H)')}
  {L(40,25,'sin θ = O/H')}{L(164,25,'cos θ = A/H')}{L(292,25,'tan θ = O/A')}
 </svg>
}


function AreaPlaneFiguresDiagram({context}:{context:string}){
 const t=context.toLowerCase(); const L=(x:number,y:number,s:string)=><text x={x} y={y} className="v-label">{s}</text>;
 if(/sector/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Circle sector with radius and central angle labelled"><title>Sector area</title><circle cx="205" cy="140" r="92" className="v-guide"/><path d="M205 140L297 140A92 92 0 0 0 246 58Z" className="v-shape"/><line x1="205" y1="140" x2="297" y2="140" className="v-accent"/><line x1="205" y1="140" x2="246" y2="58" className="v-accent"/><path d="M239 140A34 34 0 0 0 220 110" className="v-thin"/>{L(238,116,'θ')}{L(250,158,'r')}{L(117,245,'sector area = (θ/360)πr²')}</svg>;
 if(/circle|radius|diameter/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Circle with centre radius and diameter labelled"><title>Circle area</title><circle cx="210" cy="135" r="92" className="v-shape"/><circle cx="210" cy="135" r="3" className="v-fill"/><line x1="118" y1="135" x2="302" y2="135" className="v-accent"/><line x1="210" y1="135" x2="272" y2="68" className="v-guide"/>{L(206,155,'O')}{L(240,96,'r')}{L(177,126,'diameter = 2r')}{L(132,252,'A = πr²')}</svg>;
 if(/trapez/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Trapezium with parallel sides and perpendicular height labelled"><title>Trapezium area</title><path d="M65 210L355 210L292 75L135 75Z" className="v-shape"/><line x1="135" y1="75" x2="135" y2="210" className="v-guide"/><path d="M135 194h16v16" className="v-thin"/>{L(192,62,'a')}{L(200,232,'b')}{L(112,148,'h')}{L(122,255,'A = ½(a + b)h')}</svg>;
 if(/parallelogram/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Parallelogram with base and perpendicular height labelled"><title>Parallelogram area</title><path d="M90 210L330 210L275 75L35 75Z" className="v-shape"/><line x1="275" y1="75" x2="275" y2="210" className="v-guide"/><path d="M259 210v-16h16" className="v-thin"/>{L(187,232,'base b')}{L(285,148,'height h')}{L(160,255,'A = bh')}</svg>;
 if(/composite|cut-out|flower bed|semicircle/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Composite figure divided into familiar regions"><title>Composite area</title><rect x="65" y="70" width="285" height="145" className="v-shape"/><path d="M207 70A72 72 0 0 1 207 214" className="v-guide"/><line x1="207" y1="70" x2="207" y2="215" className="v-thin"/>{L(92,52,'Region 1')}{L(255,52,'Region 2')}{L(95,248,'Total area = add regions, or outer − cut-out')}</svg>;
 return <svg viewBox="0 0 420 270" role="img" aria-label="Triangle with base and perpendicular height labelled"><title>Triangle area</title><path d="M55 215L360 215L245 55Z" className="v-shape"/><line x1="245" y1="55" x2="245" y2="215" className="v-guide"/><path d="M229 215v-16h16" className="v-thin"/>{L(180,238,'base b')}{L(255,142,'perpendicular height h')}{L(145,260,'A = ½bh')}</svg>
}

function NumberLine(){return <svg viewBox="0 0 360 150" role="img" aria-label="Number line"><line x1="35" y1="75" x2="330" y2="75" className="v-stroke"/><path d="M330 75l-10-5v10zM35 75l10-5v10z" className="v-fill"/>{[-3,-2,-1,0,1,2,3].map((n,i)=>{const x=60+i*42;return <g key={n}><line x1={x} y1="68" x2={x} y2="82" className="v-thin"/><text x={x-6} y="105">{n}</text></g>})}</svg>}
function Fraction(){return <svg viewBox="0 0 360 190" role="img" aria-label="Fraction area model"><rect x="55" y="45" width="250" height="90" rx="4" className="v-shape"/>{[1,2,3].map(i=><line key={i} x1={55+i*62.5} y1="45" x2={55+i*62.5} y2="135" className="v-thin"/>)}<rect x="55" y="45" width="125" height="90" className="v-soft"/><text x="115" y="165">equal parts of one whole</text></svg>}
function Place({binary=false}:{binary?:boolean}){const labels=binary?['8','4','2','1']:['1000','100','10','1'];return <div className="visual-place-grid">{labels.map((x,i)=><div key={x}><small>{binary?'2'+['³','²','¹','⁰'][i]:x}</small><strong>{x}</strong></div>)}</div>}
function Equations(){return <div className="visual-equations" aria-label="Aligned equation board"><div><span>Equation (1)</span><b>ax + by = c</b></div><div><span>Equation (2)</span><b>dx + ey = f</b></div><i/><p>Keep x-terms under x-terms and y-terms under y-terms before adding or subtracting.</p></div>}
function Construction({context}:{context:string}){const t=context.toLowerCase();const L=(x:number,y:number,s:string)=><text x={x} y={y} className="v-label">{s}</text>;
 if(/60|30/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Compass construction of sixty degrees and its thirty degree bisector"><title>60 degree construction and 30 degree bisection</title><line x1="55" y1="220" x2="370" y2="220" className="v-stroke"/><path d="M90 220A120 120 0 0 1 150 116" className="v-arc"/><path d="M210 220A120 120 0 0 0 150 116" className="v-arc"/><line x1="90" y1="220" x2="150" y2="116" className="v-stroke"/><line x1="90" y1="220" x2="194" y2="160" className="v-accent"/><path d="M135 220A45 45 0 0 0 129 198M132 196A50 50 0 0 0 128 182" className="v-guide"/>{L(75,240,'O')}{L(205,240,'A')}{L(148,108,'B')}{L(197,158,'30° bisector')}{L(115,180,'60°')}</svg>;
 if(/45|90|perpendicular/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Perpendicular ninety degree construction and forty-five degree bisector"><title>90 degree construction and 45 degree bisection</title><line x1="45" y1="215" x2="375" y2="215" className="v-stroke"/><path d="M95 215A115 115 0 0 1 210 100M325 215A115 115 0 0 0 210 100" className="v-arc"/><line x1="210" y1="215" x2="210" y2="55" className="v-guide"/><line x1="210" y1="215" x2="315" y2="110" className="v-accent"/><path d="M210 195h20v20" className="v-thin"/>{L(196,238,'P')}{L(218,190,'90°')}{L(270,155,'45° bisector')}</svg>;
 if(/copy/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Copying a given angle using matching compass arcs"><title>Copy a given angle</title><line x1="55" y1="205" x2="175" y2="205" className="v-stroke"/><line x1="55" y1="205" x2="135" y2="105" className="v-stroke"/><path d="M105 205A50 50 0 0 0 86 166" className="v-arc"/>{L(45,228,'B')}{L(75,145,'same arc radius')}{L(183,145,'transfer chord XY →')};<line x1="245" y1="205" x2="380" y2="205" className="v-stroke"/><path d="M295 205A50 50 0 0 0 277 166" className="v-arc"/><line x1="245" y1="205" x2="325" y2="105" className="v-accent"/>{L(235,228,'P')}{L(278,145,'equal copied angle')}</svg>;
 if(/square|rectangle|triangle|plane shape|sss|sas|asa/.test(t))return <svg viewBox="0 0 420 270" role="img" aria-label="Plane figure construction using intersecting arcs and exact constraints"><title>Construct a plane figure from given constraints</title><line x1="65" y1="220" x2="350" y2="220" className="v-stroke"/><path d="M65 220A190 190 0 0 1 205 92M350 220A170 170 0 0 0 205 92" className="v-arc"/><line x1="65" y1="220" x2="205" y2="92" className="v-accent"/><line x1="350" y1="220" x2="205" y2="92" className="v-accent"/>{L(55,243,'A')}{L(350,243,'B')}{L(202,82,'C')}{L(112,58,'arc intersections enforce the given lengths')}</svg>;
 return <svg viewBox="0 0 420 270" role="img" aria-label="Perpendicular bisector construction with equal-radius arcs"><title>Perpendicular bisector</title><line x1="55" y1="205" x2="365" y2="205" className="v-stroke"/><path d="M105 205A125 125 0 0 1 210 90M315 205A125 125 0 0 0 210 90M105 205A125 125 0 0 0 210 255M315 205A125 125 0 0 1 210 255" className="v-arc"/><line x1="210" y1="65" x2="210" y2="260" className="v-guide"/>{L(95,228,'A')}{L(310,228,'B')}{L(216,190,'M')}{L(218,82,'P')}{L(218,258,'Q')}</svg>}
function Bearing(){return <svg viewBox="0 0 360 220" role="img" aria-label="Bearing and reference line diagram"><line x1="180" y1="195" x2="180" y2="25" className="v-stroke"/><line x1="75" y1="110" x2="285" y2="110" className="v-thin"/><text x="170" y="20">N</text><text x="292" y="115">E</text><text x="170" y="215">S</text><text x="58" y="115">W</text><line x1="180" y1="110" x2="275" y2="55" className="v-accent"/><path d="M180 63 A47 47 0 0 1 220 86" className="v-arc"/><text x="214" y="61">θ</text></svg>}
function Angle(){return <svg viewBox="0 0 360 190" role="img" aria-label="Angle diagram"><line x1="85" y1="145" x2="300" y2="145" className="v-stroke"/><line x1="85" y1="145" x2="215" y2="45" className="v-stroke"/><path d="M145 145 A60 60 0 0 0 132 108" className="v-accent"/><circle cx="85" cy="145" r="4" className="v-fill"/><text x="140" y="118">θ</text><text x="72" y="165">vertex</text></svg>}
function Solid(){return <svg viewBox="0 0 360 220" role="img" aria-label="Three dimensional cuboid"><path d="M85 75h150v105H85zM85 75l45-35h150l-45 35M235 75l45-35v105l-45 35M85 180l45-35h150" className="v-shape"/><text x="145" y="203">length</text><text x="43" y="130">height</text></svg>}
function DataChart({context}:{context:string}){const t=context.toLowerCase();const L=(x:number,y:number,s:string)=><text x={x} y={y} className="v-label">{s}</text>;
 if(/pie|sector|360|percentage/.test(t))return <svg viewBox="0 0 420 285" role="img" aria-label="Pie chart with proportional labelled sectors"><title>Pie chart representation</title><circle cx="205" cy="140" r="100" className="v-guide"/><path d="M205 140L205 40A100 100 0 0 1 300 171Z" className="v-soft"/><path d="M205 140L300 171A100 100 0 0 1 146 221Z" className="v-shape"/><path d="M205 140L146 221A100 100 0 0 1 205 40Z" className="v-guide"/><line x1="205" y1="140" x2="205" y2="40" className="v-stroke"/><line x1="205" y1="140" x2="300" y2="171" className="v-stroke"/><line x1="205" y1="140" x2="146" y2="221" className="v-stroke"/>{L(230,82,'A')}{L(238,191,'B')}{L(145,126,'C')}{L(65,270,'sector angle = frequency / total × 360°')}</svg>;
 return <svg viewBox="0 0 420 260" role="img" aria-label="Frequency table and data summary framework"><title>Frequency data</title><rect x="55" y="45" width="310" height="165" className="v-guide"/><line x1="55" y1="85" x2="365" y2="85" className="v-stroke"/><line x1="125" y1="45" x2="125" y2="210" className="v-thin"/><line x1="205" y1="45" x2="205" y2="210" className="v-thin"/><line x1="285" y1="45" x2="285" y2="210" className="v-thin"/>{L(82,72,'x')}{L(160,72,'f')}{L(236,72,'fx')}{L(306,72,'cf')}{L(62,240,'mean = Σfx/Σf   •   median uses ordered/cumulative position')}</svg>}
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
 else if(spec.kind==='plane-shapes') body=<PlaneShapes caption={`${spec.title} ${spec.caption}`}/>;
 else if(spec.kind==='construction') body=<Construction context={spec.context||`${spec.title} ${spec.caption}`}/>;
 else if(spec.kind==='bearing') body=<Bearing/>;
 else if(spec.kind==='angle') body=<Angle/>;
 else if(spec.kind==='solid') body=<Solid/>;
 else if(spec.kind==='data-chart') body=<DataChart context={spec.context||`${spec.title} ${spec.caption}`}/>;
 else if(spec.kind==='bar-model') body=<BarModel/>;
 else if(spec.kind==='similar-shapes') body=<SimilarShapes context={spec.context||`${spec.title} ${spec.caption}`}/>;
 else if(spec.kind==='trigonometry') body=<TrigonometryDiagram context={spec.context||`${spec.title} ${spec.caption}`}/>;
 else if(spec.kind==='area-plane-figures') body=<AreaPlaneFiguresDiagram context={spec.context||`${spec.title} ${spec.caption}`}/>;
 return <section className="avora-visual-board"><header><b>{spec.title}</b><span>LIVE VISUAL</span></header><div className="avora-visual-stage">{body}</div><p>{spec.caption}</p></section>
}
