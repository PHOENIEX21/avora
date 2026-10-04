export type AcademicSource={id:string;country:string;level:string;subject:'Mathematics'|'English Language';term:1|2|3;title:string;url:string;licence:string;use:'REFERENCE_NONCOMMERCIAL'};

const base='https://mbsseknowledgeplatform.gov.sl/wp-content/uploads/2022/01/';
export const mbsseSources:AcademicSource[]=[];
for(const level of ['JSS1','JSS2','JSS3'] as const){
 const j=level.slice(-1);
 for(const term of [1,2,3] as const){
  mbsseSources.push({id:`sl-${level.toLowerCase()}-math-t${term}`,country:'Sierra Leone',level,subject:'Mathematics',term,title:`${level} Mathematics — Term ${term} pupil handbook`,url:`${base}pupil-handbook-for-jss-${j}-mathematics-term-${term}.pdf`,licence:'CC BY-NC 4.0 / official education-platform reference; do not treat as commercial AVORA-owned content',use:'REFERENCE_NONCOMMERCIAL'});
  mbsseSources.push({id:`sl-${level.toLowerCase()}-english-t${term}`,country:'Sierra Leone',level,subject:'English Language',term,title:`${level} Language Arts — Term ${term} pupil handbook`,url:`${base}pupil-handbook-for-jss-${j}-language-arts-term-${term}.pdf`,licence:'CC BY-NC 4.0 / official education-platform reference; do not treat as commercial AVORA-owned content',use:'REFERENCE_NONCOMMERCIAL'});
 }
}

// Source-derived scope anchors. These are short lesson-title maps, not copied textbook prose.
const anchors:Record<string,string[]>={
 'factors & multiples':['Factors and factor vocabulary','Multiples of whole numbers','Prime factors','Common factors / HCF','Common multiples / LCM'],
 'fractions, decimals and percentages':['Fractions and operations','Decimals ↔ fractions','Rounding decimals','Percentages ↔ fractions/decimals','Percentage of a quantity','Percentage increase/decrease','Money problems with percentages'],
 'operations and order of operations':['Four operations','Order of operations — BODMAS','Estimation','Story problems'],
 'ratio':['Ratio of a whole','Ratios and fractions','Ratios and percentages','Simplifying ratios','Ratio story problems'],
 'direct proportion':['Simple proportion','Direct proportion','Proportion problem solving'],
 'commercial arithmetic':['Simple interest','Discount','Commission','Tax','Profit and loss','Unit price','Financial literacy'],
 'perimeter and circumference':['Perimeter','Circumference of circles','Perimeter story problems'],
 'area of plane shapes':['Area of rectangles/squares','Area of triangles','Area of circles','Composite shapes','Practical area problems'],
 'surface area and volume of solids':['Volume of cubes/cuboids/prisms/cylinders','Surface area of solids','Composite solids','Practical volume/surface-area problems'],
 'lines, angles and angle relationships':['Introduction to angles','Measurement of angles','Unknown angles','Complementary/supplementary angles','Intersecting and parallel lines'],
 'standard form and powers':['Index notation/laws','Negative/fractional powers','Powers of 10','Standard form of large/small numbers'],
 'statistics':['Data collection','Frequency tables','Bar charts / line graphs / pie charts','Mean / median / mode / range','Grouped data'],
 'probability':['Probability experiments','Likelihood','Independent events','Sample space','Probability trees','Story problems'],
 'inequalities':['Number line','Introduction to inequality','Linear inequalities','Inequality story problems'],
 'grammar & structure':['Parts of speech','Nouns / pronouns / adjectives','Verb tenses','Question tags','Direct and indirect speech'],
 'comprehension':['Reading comprehension','Reading strategies','Answering comprehension questions from evidence'],
 'writing & composition':['Essay writing','Developing paragraphs','Informal/semi-formal letters','Article writing','Creative writing','Editing a final draft'],
 'literature':['Poetry','Prose','BECE prose examination strategies'],
 'spelling & usage':['Spelling drills','Spelling and dictation'],
};

export function groundingFor(subject:string,unitTitle:string,classLevel:string){
 const key=unitTitle.toLowerCase();
 let matched:string[]=[];
 for(const [k,v] of Object.entries(anchors))if(key.includes(k)||k.includes(key)){matched=v;break}
 // Wider aliases so a Nigerian topic can still show a useful cross-curriculum reference route.
 if(!matched.length&&subject==='English Language'){
  if(/tense|verb/.test(key))matched=['Verb tenses','Simple past tense','Present continuous tense'];
  else if(/pronoun|word class/.test(key))matched=['Parts of speech','Nouns','Pronouns','Adjectives'];
  else if(/reading|evidence|inference/.test(key))matched=['Reading comprehension','Reading strategies','Answering comprehension questions about a text'];
 }
 const sources=mbsseSources.filter(s=>s.subject===subject&&s.level===classLevel).slice(0,3);
 return {matched,sources};
}

export const mbsseAttribution='Cross-curriculum depth reference: Sierra Leone MBSSE JSS pupil handbooks. AVORA keeps Nigeria/NERDC as the target curriculum and creates original teaching; MBSSE material is not treated as AVORA-owned commercial content.';
