export type RightsStatus='CC_BY'|'LICENSED'|'PUBLICLY_PERMITTED'|'REFERENCE_ONLY'|'AVORA_OWNED';

export const academicSources=[
 {key:'siyavula-ng-jss-maths',kind:'OPEN_TEXTBOOK',provider:'Siyavula Education',title:'Nigeria (NERDC) Mathematics JSS 1–3 open textbooks',subject:'Mathematics',classLevel:'JSS1–JSS3',url:'https://ng.siyavula.com/read',rights:'CC_BY' as RightsStatus,adapt:true,reproduce:true,attribution:true,attributionText:'Adapted from Siyavula Education open textbook content (unbranded CC BY edition).',notes:'Only the specifically identified unbranded CC BY textbook editions may be adapted. Website/practice content is not automatically covered by the textbook licence.'},
 {key:'ncee-2011-2024-archive',kind:'PAST_PAPER_ARCHIVE',provider:'LASU-INFO / Mr Chineks mirror',title:'National Common Entrance Examination past-question archive, 2011–2024',subject:'Mathematics; English Language',classLevel:'Primary 6 → JSS1',exam:'NCEE',url:'https://www.lasu-info.com/2018/01/ncee-past-questions-answers-download.html',rights:'REFERENCE_ONLY' as RightsStatus,adapt:false,reproduce:false,attribution:false,notes:'Publicly discoverable mirror with year-by-year question/solution links. AVORA records exam structure and patterns; question reproduction requires separate rights verification.'}
] as const;

export function nceeYearStructure(year:number){
 if(year>=2022)return 'Paper 1: Mathematics + Basic Science & Technology; English Studies + National Values. Paper 2: Quantitative/Vocational Aptitude + Verbal Aptitude.';
 return 'Paper 1 includes Mathematics with General Science and quantitative/vocational aptitude; Paper 2 includes English with Social Studies and verbal aptitude.';
}
