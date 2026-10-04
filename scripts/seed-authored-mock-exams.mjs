import fs from 'node:fs/promises';
import postgres from 'postgres';
const databaseUrl=process.env.DIRECT_URL||process.env.DATABASE_URL;if(!databaseUrl){console.error('DIRECT_URL and DATABASE_URL are missing.');process.exit(1)}
const sql=postgres(databaseUrl,{ssl:'require',max:1,connect_timeout:30});
const data=JSON.parse(await fs.readFile(new URL('../data/avora-authored-mock-exams.json',import.meta.url),'utf8'));
const slug=s=>String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,100);
const subjectSlug=s=>s==='English Language'?'english':'mathematics';
const optionAnswer=(raw,opts)=>{const m=String(raw||'').trim().match(/^([A-D])\b/i);return m&&opts.length?opts[m[1].toUpperCase().charCodeAt(0)-65]:String(raw||'').replace(/^['"]|['"]$/g,'').trim()};
function strand(paper,n,prompt){
 const p=prompt.toLowerCase();
 if(paper.subject==='English Language'){
  if(n<=10)return 'Comprehension';
  if(/figure of speech|metaphor|simile|irony|euphem|personification|antonym|prefix|suffix|plural|article|word|meaning|vocab|lexis/.test(p))return 'Grammar';
  return 'Grammar';
 }
 if(/lcm|least common/.test(p))return 'LCM'; if(/hcf|highest common|co-prime|prime factor/.test(p))return 'HCF';
 if(/binary|base two|base 2/.test(p))return 'Binary'; if(/fraction|⅓|¼|½|⅔|⅖|⅗|¾|percentage|ratio|rate|interest|profit|price|cost|decrease|increase/.test(p))return 'Fractions';
 if(/standard form|significant|round|approx|estimat|index|indices|square root/.test(p))return 'Approximation';
 if(/factor|expand|simplify.*[a-z]|algebra|\bx\b|\by\b|\bp\b|\bm\b/.test(p))return 'Algebra';
 if(/simultaneous|equation|inequal/.test(p))return 'Equations'; if(/bearing|angle|polygon|triangle|trapez|circle|cuboid|volume|area|perimeter|similar|ladder|sin|cos|tan/.test(p))return 'Geometry';
 if(/mean|median|pie chart|survey|data/.test(p))return 'Statistics'; return 'Number';
}
function topicName(classLevel,subject,kind){
 const map={
  'JSS1|English Language|Comprehension':"Comprehension: full SPQ3R application; fact vs opinion",
  'JSS1|English Language|Grammar':"Grammar: articles (a/an/the — sound-based rule); plurals (regular/irregular); past tense (regular/irregular)",
  'JSS2|English Language|Comprehension':"Comprehension: critical reading (claims vs evidence); reading words in context (context clues)",
  'JSS2|English Language|Grammar':"Grammar: transitive/intransitive verbs; active and passive voice",
  'JSS3|English Language|Comprehension':"Comprehension: skimming vs scanning; word formation (prefixes and suffixes)",
  'JSS3|English Language|Grammar':"Grammar: punctuation marks (comprehensive review, incl. comma splices); full tense system revision (3×3 grid incl. perfect aspect)",
  'JSS1|Mathematics|LCM':'Lowest Common Multiple (LCM)','JSS1|Mathematics|HCF':'Highest Common Factor (HCF)','JSS1|Mathematics|Binary':'Conversion of Base 10 to Binary Numbers (1–10)','JSS1|Mathematics|Fractions':'Fractions (equivalent fractions, ordering, fractions↔decimals, fractions↔percentages)','JSS1|Mathematics|Approximation':'Approximation (rounding rules, decimal places)','JSS1|Mathematics|Algebra':'Simplification of Algebraic Expressions (like/unlike terms, coefficients, brackets)','JSS1|Mathematics|Equations':'Simple Equations (word problems → equations)','JSS1|Mathematics|Geometry':'Angles (measurement, vertically opposite/adjacent/alternate/corresponding, angles at a point/on a line)','JSS1|Mathematics|Statistics':'Data Presentation — Median (introductory)','JSS1|Mathematics|Number':'Whole Numbers (place value, counting in millions/billions/trillions, quantitative reasoning)',
  'JSS2|Mathematics|LCM':'Revision: Prime Factors, LCM, HCF; Squares and Square Roots','JSS2|Mathematics|HCF':'Revision: Prime Factors, LCM, HCF; Squares and Square Roots','JSS2|Mathematics|Fractions':'Fractions, Percentages (increase/decrease), Ratio, Rate','JSS2|Mathematics|Approximation':'Approximation — Decimal Places and Significant Figures','JSS2|Mathematics|Algebra':'Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions','JSS2|Mathematics|Equations':'Simple Linear Equations (balance method, brackets, fractions, word problems)','JSS2|Mathematics|Geometry':'Angles in a Polygon (convex/concave/regular/irregular; sum of interior angles; sum of exterior angles)','JSS2|Mathematics|Statistics':'Use of ICT in Mathematics (flowcharts, spreadsheet logic)','JSS2|Mathematics|Number':'Whole Numbers — Standard Form; Indices (introductory laws)','JSS2|Mathematics|Binary':'Whole Numbers — Standard Form; Indices (introductory laws)',
  'JSS3|Mathematics|LCM':'Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)','JSS3|Mathematics|HCF':'Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)','JSS3|Mathematics|Binary':'Base 2 Numerals — Addition, Subtraction, Multiplication, Division (up to 3-digit)','JSS3|Mathematics|Fractions':'Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)','JSS3|Mathematics|Approximation':'Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)','JSS3|Mathematics|Algebra':'Factorization (grouping, difference of two squares, perfect square trinomials, word problems) — includes the standalone foundational mini-lesson on bracket multiplication','JSS3|Mathematics|Equations':'Simultaneous Linear Equations (tables of values, graphical solution, elimination, substitution)','JSS3|Mathematics|Geometry':'Area of Plane Figures (parallelogram, trapezium, circle)','JSS3|Mathematics|Statistics':'Measures of Central Tendency (mean/median/mode of grouped data)','JSS3|Mathematics|Number':'Rational and Irrational (Non-Rational) Numbers'
 };
 return map[`${classLevel}|${subject}|${kind}`]||kind;
}
async function ensureSkill(paper,topic){
 const subSlug=subjectSlug(paper.subject);const [sub]=await sql`INSERT INTO subjects(slug,name,description) VALUES(${subSlug},${paper.subject},'AVORA curriculum subject') ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`;
 const tslug=`${paper.classLevel.toLowerCase()}-${slug(topic)}`;const [t]=await sql`INSERT INTO topics(subject_id,slug,name,stage,order_index) VALUES(${sub.id},${tslug},${topic},${paper.classLevel},0) ON CONFLICT(subject_id,slug) DO UPDATE SET name=EXCLUDED.name,stage=EXCLUDED.stage RETURNING id`;
 const skslug=`mock-${slug(topic)}`;const [sk]=await sql`INSERT INTO skills(topic_id,slug,name,description,mastery_threshold) VALUES(${t.id},${skslug},${topic},${`Independent authored-mock evidence for ${topic}`},0.80) ON CONFLICT(topic_id,slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`;return sk.id;
}
let qcount=0;
try{
 for(const paper of data.papers){
  await sql`INSERT INTO authored_mock_papers(paper_key,class_level,subject_name,set_number,title,source_file,raw_markdown,review_version,status,updated_at) VALUES(${paper.key},${paper.classLevel},${paper.subject},${paper.setNumber},${`${paper.classLevel} ${paper.subject} Mock Set ${paper.setNumber}`},${paper.sourceFile},${paper.rawMarkdown},'V13.6.0','PUBLISHED',now()) ON CONFLICT(paper_key) DO UPDATE SET raw_markdown=EXCLUDED.raw_markdown,review_version='V13.6.0',status='PUBLISHED',updated_at=now()`;
  await sql`UPDATE questions SET status='RETIRED' WHERE mock_paper_key=${paper.key} AND review_version IS DISTINCT FROM 'V13.6.0'`;
  for(const item of paper.items){
   const kind=strand(paper,item.number,item.prompt),topic=topicName(paper.classLevel,paper.subject,kind),skillId=await ensureSkill(paper,topic);
   const opts=item.options||[];const answer=optionAnswer(item.answerRaw,opts);if(!answer)continue;
   const qtype=opts.length>=2?'MULTIPLE_CHOICE':'SHORT_ANSWER';const runtimePrompt=paper.subject==='English Language'&&item.number<=10&&paper.passage?`Read this passage carefully:\n\n${paper.passage}\n\nQuestion ${item.number}: ${item.prompt}`:item.prompt;const family=`${paper.key}-q${String(item.number).padStart(2,'0')}`;
   const existing=await sql`SELECT id FROM questions WHERE variant_family=${family} LIMIT 1`;
   const explanation=item.explanation||`Expected answer: ${answer}. This item is preserved from ${paper.sourceFile}; review the linked Tutor topic after submission if the evidence is weak.`;
   if(existing.length)await sql`UPDATE questions SET skill_id=${skillId},prompt=${runtimePrompt},question_type=${qtype},options=${opts.length?sql.json(opts):null},correct_answer=${sql.json({value:answer})},explanation=${explanation},difficulty=${paper.setNumber===2?3:2},status='PUBLISHED',content_origin='AVORA_ORIGINAL',quality_status='REVIEWED',class_level=${paper.classLevel},assessment_kind='AUTHORED_MOCK',review_version='V13.6.0',exam_name=${paper.classLevel==='JSS3'?'BECE':null},exam_topic=${topic},variant_family=${family},mock_set=${paper.setNumber},mock_paper_key=${paper.key},mock_question_number=${item.number},mock_source_file=${paper.sourceFile},mock_answer_guidance=${item.answerRaw} WHERE id=${existing[0].id}`;
   else await sql`INSERT INTO questions(skill_id,source_type,prompt,question_type,options,correct_answer,explanation,difficulty,status,content_origin,quality_status,class_level,assessment_kind,review_version,exam_name,exam_topic,variant_family,mock_set,mock_paper_key,mock_question_number,mock_source_file,mock_answer_guidance) VALUES(${skillId},'AVORA_ORIGINAL',${runtimePrompt},${qtype},${opts.length?sql.json(opts):null},${sql.json({value:answer})},${explanation},${paper.setNumber===2?3:2},'PUBLISHED','AVORA_ORIGINAL','REVIEWED',${paper.classLevel},'AUTHORED_MOCK','V13.6.0',${paper.classLevel==='JSS3'?'BECE':null},${topic},${family},${paper.setNumber},${paper.key},${item.number},${paper.sourceFile},${item.answerRaw})`;
   qcount++;
  }
 }
 console.log(`Authored mocks ready: ${data.papers.length} papers, ${qcount} scored questions.`);
}finally{await sql.end({timeout:2})}
