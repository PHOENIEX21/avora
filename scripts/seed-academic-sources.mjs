import postgres from 'postgres';
if(!process.env.DATABASE_URL){console.error('DATABASE_URL is missing.');process.exit(1)}
const sql=postgres(process.env.DATABASE_URL,{ssl:'require',max:1,connect_timeout:20});
const now=new Date().toISOString();
await sql`INSERT INTO academic_source_registry(source_key,source_kind,provider,title,subject_name,class_level,url,rights_status,may_adapt,may_reproduce,attribution_required,attribution_text,notes,verified_at)
VALUES('siyavula-ng-jss-maths','OPEN_TEXTBOOK','Siyavula Education','Nigeria (NERDC) Mathematics JSS 1–3 open textbooks','Mathematics','JSS1–JSS3','https://ng.siyavula.com/read','CC_BY',true,true,true,'Adapted from Siyavula Education open textbook content (unbranded CC BY edition).','Use only specifically identified unbranded CC BY textbook editions; the general website/practice bank has separate rights.',${now})
ON CONFLICT(source_key) DO UPDATE SET rights_status=EXCLUDED.rights_status,may_adapt=EXCLUDED.may_adapt,may_reproduce=EXCLUDED.may_reproduce,notes=EXCLUDED.notes,verified_at=EXCLUDED.verified_at`;
await sql`INSERT INTO academic_source_registry(source_key,source_kind,provider,title,subject_name,class_level,exam_name,year_from,year_to,url,rights_status,may_adapt,may_reproduce,notes,verified_at)
VALUES('ncee-2011-2024-archive','PAST_PAPER_ARCHIVE','LASU-INFO / Mr Chineks mirror','NCEE past-question and solution archive 2011–2024','Mathematics; English Language','Primary 6 → JSS1','NCEE',2011,2024,'https://www.lasu-info.com/2018/01/ncee-past-questions-answers-download.html','REFERENCE_ONLY',false,false,'Year-by-year public mirror. Use for exam intelligence until reproduction rights for individual papers are verified.',${now})
ON CONFLICT(source_key) DO UPDATE SET year_from=EXCLUDED.year_from,year_to=EXCLUDED.year_to,rights_status=EXCLUDED.rights_status,notes=EXCLUDED.notes,verified_at=EXCLUDED.verified_at`;
for(let year=2011;year<=2024;year++)for(const subject of ['Mathematics','English Language']){
 const structure=year>=2022?'Paper 1 combines Mathematics + BST and English Studies + National Values; Paper 2 covers aptitude sections.':'Older NCEE structure separates Mathematics/General Science and English/Social Studies across the two papers with aptitude sections.';
 await sql`INSERT INTO exam_year_registry(exam_name,exam_year,subject_name,paper_structure,source_key,availability_status,rights_status,questions_available,solutions_available,notes)
 VALUES('NCEE',${year},${subject},${structure},'ncee-2011-2024-archive','REFERENCE_FOUND','REFERENCE_ONLY',true,true,'Archive reports both questions and solutions for this year. Direct AVORA reproduction remains disabled until rights are verified.')
 ON CONFLICT(exam_name,exam_year,subject_name) DO UPDATE SET paper_structure=EXCLUDED.paper_structure,source_key=EXCLUDED.source_key,questions_available=true,solutions_available=true,notes=EXCLUDED.notes`;
}
// Upgrade existing AVORA-owned questions so every published item has review metadata.
await sql`UPDATE questions SET rights_status=CASE WHEN source_type='AVORA_ORIGINAL' THEN 'AVORA_OWNED' ELSE rights_status END,
 solution_steps=CASE WHEN jsonb_array_length(solution_steps)=0 THEN jsonb_build_array(explanation) ELSE solution_steps END,
 wrong_answer_reasoning=COALESCE(wrong_answer_reasoning,'Review the method in the solution, identify the first step where your reasoning differs, then retry a fresh question on the same skill.')
 WHERE status='PUBLISHED'`;
console.log('Seeded AVORA V8.1 academic source registry, NCEE 2011–2024 intelligence, and review metadata.');
await sql.end();
