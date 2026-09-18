export type VisualKind =
  | 'aligned-equations' | 'coordinate-plane' | 'number-line' | 'fraction-model'
  | 'place-value' | 'binary-place-value' | 'triangle' | 'polygon' | 'solid'
  | 'construction' | 'bearing' | 'angle' | 'data-chart' | 'bar-model' | 'none';

export type VisualSpec = {
  kind: VisualKind;
  title: string;
  caption: string;
};

const rules: Array<{test: RegExp; kind: VisualKind; title: string; caption: string}> = [
  {test:/simultaneous|linear equation|equations involving|equations with brackets/i,kind:'aligned-equations',title:'Equation board',caption:'Corresponding terms stay aligned so every operation and change can be followed.'},
  {test:/statistics|data|bar chart|pie chart|line graph|frequency/i,kind:'data-chart',title:'Data representation',caption:'Tables and charts are used when the lesson is about reading or presenting data.'},
  {test:/graph|tables, graphs|coordinate/i,kind:'coordinate-plane',title:'Coordinate plane',caption:'Axes, scale, plotted evidence and intersections belong on the board—not hidden in prose.'},
  {test:/directed number|number line|inequal/i,kind:'number-line',title:'Number line',caption:'Position, direction and open/closed endpoints are represented spatially.'},
  {test:/fraction|decimal.*fraction|percentage/i,kind:'fraction-model',title:'Fraction model',caption:'Parts of a whole are shown visually before symbolic manipulation where that supports understanding.'},
  {test:/place value|large number|standard form/i,kind:'place-value',title:'Place-value board',caption:'Digits are kept in columns so their value is visible.'},
  {test:/binary|base.two/i,kind:'binary-place-value',title:'Base-two place-value board',caption:'Binary columns make carrying, borrowing and powers of two visible.'},
  {test:/bearing|elevation|depression/i,kind:'bearing',title:'Direction diagram',caption:'North/reference lines and measured direction are drawn before angle reasoning.'},
  {test:/construction|scale drawing/i,kind:'construction',title:'Construction board',caption:'Compass arcs and ruler lines appear in the order they are constructed.'},
  {test:/angle/i,kind:'angle',title:'Angle board',caption:'The rays, vertex and angle relationship are drawn and labelled.'},
  {test:/polygon|quadrilateral/i,kind:'polygon',title:'Polygon board',caption:'Vertices and internal divisions are shown rather than described only in words.'},
  {test:/triangle|similar shape|plane shape|2d|two dimensional|perimeter|area/i,kind:'triangle',title:'Geometry board',caption:'Shapes are drawn and labelled so formulas are connected to the figure they describe.'},
  {test:/3d|three.dimensional|surface area|volume|solid/i,kind:'solid',title:'Solid figure',caption:'Faces, edges and dimensions are represented spatially.'},
  {test:/ratio|proportion|sharing/i,kind:'bar-model',title:'Ratio bar model',caption:'Equal parts make the relationship visible before arithmetic shortcuts are used.'},
];

export function visualFor(topic:string,label:string,lines:string[]):VisualSpec {
  const text=[topic,label,...lines].join(' ');
  for(const rule of rules) if(rule.test.test(text)) return {kind:rule.kind,title:rule.title,caption:rule.caption};
  return {kind:'none',title:'',caption:''};
}

export const visualCoverageRules = rules.map(r=>({kind:r.kind,pattern:r.test.source,title:r.title}));
