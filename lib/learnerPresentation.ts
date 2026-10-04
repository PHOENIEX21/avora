const TECHNICAL_TOPIC_TITLES:Record<string,string>={
 'Trigonometry (sine, cosine, tangent of an acute angle; applications)':'Trigonometry: Sides, Angles and Ratios',
 'Factorization (grouping, difference of two squares, perfect square trinomials, word problems) — includes the standalone foundational mini-lesson on bracket multiplication':'Factorisation: Building and Checking Factors',
 'Area of Plane Figures (parallelogram, trapezium, circle)':'Area of Plane Figures',
 'Measures of Central Tendency (mean/median/mode of grouped data)':'Mean, Median and Mode',
 'Data Presentation — Pie Charts':'Reading and Drawing Pie Charts',
 'Simple Equations Involving Fractions (LCM method, exam-style word problems)':'Solving Equations with Fractions',
};

export function learnerTopicTitle(title:string){
 return TECHNICAL_TOPIC_TITLES[title]||title
  .replace(/\s*\([^)]*\)/g,'')
  .replace(/\s*—\s*includes.*$/i,'')
  .replace(/\s*;\s*.*$/,'')
  .trim();
}

export function learnerSessionTitle(label:string){
 return String(label||'Teaching step')
  .replace(/^(?:CORE IDEA|BUILD THE IDEA|TERM|KEY WORD|EXAMPLE|WORKED EXAMPLE|COMMON MISTAKE)\s*[—·:-]?\s*/i,'')
  .replace(/\s*[—·:-]\s*(?:UNDERSTAND THE SITUATION|FIRST READ|WHAT MUST STAY TRUE).*$/i,'')
  .replace(/\s+/g,' ')
  .trim()||'Teaching step';
}
