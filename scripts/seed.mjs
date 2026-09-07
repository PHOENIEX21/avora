import postgres from 'postgres';
if(!process.env.DATABASE_URL){console.error('DATABASE_URL is missing.');process.exit(1)}
const sql=postgres(process.env.DATABASE_URL,{ssl:'require',max:1});
async function subject(slug,name,description){return (await sql`INSERT INTO subjects(slug,name,description) VALUES(${slug},${name},${description}) ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`)[0]}
async function topic(subjectId,slug,name,stage,order){return (await sql`INSERT INTO topics(subject_id,slug,name,stage,order_index) VALUES(${subjectId},${slug},${name},${stage},${order}) ON CONFLICT(subject_id,slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`)[0]}
async function skill(topicId,slug,name,description){return (await sql`INSERT INTO skills(topic_id,slug,name,description) VALUES(${topicId},${slug},${name},${description}) ON CONFLICT(topic_id,slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`)[0]}
async function question(skillId,prompt,type,answer,explanation,difficulty,options=null,hint=null,steps=null){const exists=await sql`SELECT id FROM questions WHERE prompt=${prompt} AND source_type='AVORA_ORIGINAL' LIMIT 1`;if(exists.length)return;await sql`INSERT INTO questions(skill_id,source_type,prompt,question_type,options,correct_answer,explanation,difficulty,status,hint_text,interaction_steps) VALUES(${skillId},'AVORA_ORIGINAL',${prompt},${type},${options?sql.json(options):null},${sql.json({value:answer})},${explanation},${difficulty},'PUBLISHED',${hint},${steps?sql.json(steps):null})`}
const math=await subject('mathematics','Mathematics','Build numerical reasoning and problem-solving mastery.');
await subject('english','English Language','Build grammar, comprehension, vocabulary and writing mastery.');
const num=await topic(math.id,'number-numeration','Number & Numeration','JSS3',1);const frac=await skill(num.id,'fractions-percentages','Fractions & percentages','Connect fractions, decimals and percentages.');
const alg=await topic(math.id,'algebra','Algebra','JSS3',2);const linear=await skill(alg.id,'linear-equations','Linear equations','Solve equations while preserving equality.');const elim=await skill(alg.id,'elimination-basic','Solve by elimination','Solve two linear equations by eliminating one variable.');
const geo=await topic(math.id,'geometry-measurement','Geometry & Measurement','JSS3',3);const area=await skill(geo.id,'area-perimeter','Area & perimeter','Reason about dimensions, area and perimeter.');
const comm=await topic(math.id,'commercial-arithmetic','Commercial Arithmetic','JSS3',4);const pct=await skill(comm.id,'profit-loss-percent','Profit, loss & percentage','Use percentages in everyday commercial problems.');
const data=await topic(math.id,'data-statistics','Data & Statistics','JSS3',5);const mean=await skill(data.id,'mean-basic','Mean','Interpret and calculate arithmetic mean.');
await question(frac.id,'What is 3/4 as a percentage?','MULTIPLE_CHOICE','75','Three quarters means 3 ÷ 4 = 0.75, which is 75%.',1,['25','50','75','80'],'Convert the fraction to a decimal first.');
await question(frac.id,'A class has 40 learners. 30 passed a test. What percentage passed?','SHORT_ANSWER','75','30 ÷ 40 = 0.75, then multiply by 100 to get 75%.',2,null,'Ask what fraction of the whole 30 represents.');
await question(linear.id,'Solve: 3x - 5 = 16. What is x?','SHORT_ANSWER','7','Add 5 to both sides to get 3x = 21, then divide both sides by 3.',2,null,'Undo -5 first, while keeping both sides equal.',[
 {prompt:'What operation should undo the -5?',inputLabel:'Type the operation, e.g. add 5',answers:['add5','+5','add 5'],success:'Exactly. Adding 5 to both sides keeps the equation balanced.',feedback:'Think about the inverse of subtracting 5.',hint:'The inverse of −5 is +5.'},
 {prompt:'After adding 5, what equation do you have?',inputLabel:'Complete: 3x =',answers:['21','3x=21'],success:'Yes. Now x is multiplied by 3.',feedback:'Calculate 16 + 5 carefully.',hint:'16 + 5 = 21.'},
 {prompt:'What is x?',inputLabel:'x =',answers:['7','x=7'],success:'Correct. You isolated x without breaking the equality.',feedback:'Divide both sides of 3x = 21 by 3.',hint:'21 ÷ 3 = 7.'}
]);
await question(elim.id,'Solve: x + y = 9 and x - y = 3. What is x?','MULTIPLE_CHOICE','6','Add the equations: 2x = 12, so x = 6.',2,['3','6','9','12'],'Look for terms that cancel when the equations are added.');
await question(elim.id,'Solve: 2x + y = 11 and x + y = 7. What is x?','SHORT_ANSWER','4','Subtract the second equation from the first: x = 4.',2,null,'The y terms already match. What happens if you subtract the equations?',[
 {prompt:'Which operation removes y immediately?',inputLabel:'Add or subtract?',answers:['subtract','subtraction'],success:'Right. Equal y terms disappear when we subtract.',feedback:'Adding would give 2y, so y would remain.',hint:'Choose the operation that makes y − y = 0.'},
 {prompt:'Subtract the second equation from the first. What remains?',inputLabel:'x =',answers:['4','x=4'],success:'Exactly. The difference leaves x = 4.',feedback:'Compute (2x − x) and (11 − 7).',hint:'2x − x = x and 11 − 7 = 4.'}
]);
await question(area.id,'A rectangle is 8 cm long and 5 cm wide. What is its area in cm²?','MULTIPLE_CHOICE','40','Area of a rectangle is length × width: 8 × 5 = 40 cm².',1,['13','26','40','80'],'Area measures the surface inside the rectangle.');
await question(area.id,'A square has perimeter 36 cm. What is the length of one side?','SHORT_ANSWER','9','A square has four equal sides, so 36 ÷ 4 = 9 cm.',2,null,'Four equal sides make the total perimeter.');
await question(pct.id,'An item costs ₦2,000 and is sold for ₦2,400. What is the profit percentage?','MULTIPLE_CHOICE','20','Profit is ₦400. Profit percentage = 400 ÷ 2000 × 100 = 20%.',3,['10','20','25','40'],'Find the profit first, then compare it with cost price.');
await question(pct.id,'A trader bought a bag for ₦5,000 and sold it at a 10% loss. How much was the loss?','SHORT_ANSWER','500','10% of ₦5,000 is ₦500.',2,null,'Find 10% of the cost price.');
await question(mean.id,'Find the mean of 4, 6, 8 and 10.','MULTIPLE_CHOICE','7','Add the values to get 28, then divide by 4: 7.',2,['6','7','8','28'],'Mean = total of the values ÷ number of values.');

// V6 curriculum grouping. Existing AVORA-original JSS3 questions become BECE-aligned starter material.
await sql`UPDATE questions q SET exam_name=COALESCE(exam_name,'BECE'),question_group=COALESCE(question_group,s.slug),curriculum_order=CASE WHEN curriculum_order=0 THEN difficulty ELSE curriculum_order END FROM skills s WHERE q.skill_id=s.id AND q.source_type='AVORA_ORIGINAL'`;
async function groupedQuestion(skillId,exam,group,order,prompt,type,answer,explanation,difficulty,options=null,hint=null,steps=null){const exists=await sql`SELECT id FROM questions WHERE prompt=${prompt} AND source_type='AVORA_ORIGINAL' LIMIT 1`;if(exists.length){await sql`UPDATE questions SET exam_name=${exam},question_group=${group},curriculum_order=${order} WHERE id=${exists[0].id}`;return}await sql`INSERT INTO questions(skill_id,source_type,exam_name,question_group,curriculum_order,prompt,question_type,options,correct_answer,explanation,difficulty,status,hint_text,interaction_steps) VALUES(${skillId},'AVORA_ORIGINAL',${exam},${group},${order},${prompt},${type},${options?sql.json(options):null},${sql.json({value:answer})},${explanation},${difficulty},'PUBLISHED',${hint},${steps?sql.json(steps):null})`}
await groupedQuestion(linear.id,'BECE','linear-equations',3,'Solve: 5x + 2 = 27. What is x?','SHORT_ANSWER','5','Subtract 2, then divide 25 by 5.',2,null,'Undo +2 before dividing.');
await groupedQuestion(linear.id,'BECE','linear-equations',4,'Solve: 4x - 7 = 13. What is x?','SHORT_ANSWER','5','Add 7 to both sides, then divide 20 by 4.',2,null,'Undo −7 first.');
await groupedQuestion(linear.id,'BECE','linear-equations',5,'Solve: 2(x + 3) = 18. What is x?','SHORT_ANSWER','6','Divide by 2 to get x + 3 = 9, then subtract 3.',3,null,'First remove the multiplication by 2.');
await groupedQuestion(linear.id,'BECE','linear-equations',6,'If 3x + 4 = 19, find x.','MULTIPLE_CHOICE','5','Subtract 4 to get 15, then divide by 3.',2,['3','4','5','7'],'Keep the equation balanced.');
await groupedQuestion(elim.id,'BECE','simultaneous-elimination',3,'Solve: x + y = 10 and x - y = 2. What is x?','SHORT_ANSWER','6','Add the equations to get 2x = 12, then x = 6.',2,null,'Adding makes y disappear.');
await groupedQuestion(elim.id,'BECE','simultaneous-elimination',4,'Solve: 2x + y = 13 and x + y = 8. What is x?','SHORT_ANSWER','5','Subtract the second equation from the first.',2,null,'The y coefficients already match.');
await groupedQuestion(elim.id,'BECE','simultaneous-elimination',5,'Solve: 3x + y = 14 and x + y = 8. What is x?','SHORT_ANSWER','3','Subtract to get 2x = 6, so x = 3.',3,null,'Subtract the equations first.');
const nceeTopic=await topic(math.id,'ncee-number-work','Number Skills','Primary 6',1);const nceeSkill=await skill(nceeTopic.id,'ncee-four-operations','Whole-number operations','Use the four operations accurately in Common Entrance problems.');
await groupedQuestion(nceeSkill.id,'NCEE','whole-number-operations',1,'What is 348 + 275?','MULTIPLE_CHOICE','623','Add hundreds, tens and units carefully.',1,['613','623','633','643'],'Add by place value.');
await groupedQuestion(nceeSkill.id,'NCEE','whole-number-operations',2,'Calculate 900 - 468.','SHORT_ANSWER','432','Subtract 468 from 900.',1,null,'Regroup across the zeros carefully.');
await groupedQuestion(nceeSkill.id,'NCEE','whole-number-operations',3,'What is 36 × 7?','MULTIPLE_CHOICE','252','36 multiplied by 7 is 252.',1,['242','252','262','272'],'Break 36 into 30 and 6.');
await groupedQuestion(nceeSkill.id,'NCEE','whole-number-operations',4,'Calculate 864 ÷ 8.','SHORT_ANSWER','108','864 divided equally into 8 groups gives 108.',2,null,'Think: 8 × what = 864?');
await groupedQuestion(nceeSkill.id,'NCEE','whole-number-operations',5,'A school has 6 classes with 45 pupils in each class. How many pupils are there altogether?','SHORT_ANSWER','270','Six groups of 45 gives 270.',2,null,'This is equal-group multiplication.');
await groupedQuestion(nceeSkill.id,'NCEE','whole-number-operations',6,'A trader packs 336 oranges equally into 7 baskets. How many oranges are in each basket?','SHORT_ANSWER','48','336 ÷ 7 = 48.',2,null,'Equal sharing means division.');

// V7: complete reviewed-original starter exam bank. These are AVORA-authored practice items, not copied past questions.
const ratioTopic=await topic(math.id,'ratio-proportion','Ratio & Proportion','JSS3',6);const ratio=await skill(ratioTopic.id,'ratio-basic','Ratio and proportion','Reason with ratios and direct proportion.');
const measureTopic=await topic(math.id,'measurement-units','Measurement','JSS3',7);const units=await skill(measureTopic.id,'unit-conversion','Unit conversion','Convert common metric units accurately.');
const probTopic=await topic(math.id,'probability','Probability','JSS3',8);const prob=await skill(probTopic.id,'probability-basic','Basic probability','Describe simple chance as a fraction.');
async function examQ(skillId,exam,topicName,n,prompt,answer,options){const exists=await sql`SELECT id FROM questions WHERE prompt=${prompt} LIMIT 1`;let id;if(exists.length)id=exists[0].id;else id=(await sql`INSERT INTO questions(skill_id,source_type,exam_name,exam_topic,question_group,curriculum_order,prompt,question_type,options,correct_answer,explanation,difficulty,status) VALUES(${skillId},'AVORA_ORIGINAL',${exam},${topicName},${topicName.toLowerCase().replaceAll(' ','-')},${n},${prompt},'MULTIPLE_CHOICE',${sql.json(options)},${sql.json({value:answer})},${'Work through the underlying '+topicName+' skill carefully.'},2,'PUBLISHED') RETURNING id`)[0].id;await sql`UPDATE questions SET exam_name=${exam},exam_topic=${topicName} WHERE id=${id}`}
const bank=[
  [frac.id,'Number & Numeration',[
    ['What is 25% of 80?','20',['10','15','20','25']],
    ['Which fraction equals 0.5?','1/2',['1/4','1/2','2/5','3/5']],
    ['Write 0.75 as a percentage.','75',['7.5','25','75','750']],
    ['What is 2/5 of 50?','20',['10','20','25','30']],
    ['Which is greatest?','3/4',['1/2','2/3','3/4','5/8']]
  ]],
  [linear.id,'Algebra',[
    ['Solve x + 7 = 15.','8',['6','7','8','9']],
    ['Solve 2x = 18.','9',['7','8','9','10']],
    ['If 5x = 35, x = ?','7',['5','6','7','8']],
    ['Solve 3x + 1 = 10.','3',['2','3','4','5']],
    ['If x/4 = 3, x = ?','12',['7','8','12','16']]
  ]],
  [area.id,'Geometry & Mensuration',[
    ['Perimeter of a 5 cm by 3 cm rectangle?','16',['8','15','16','30']],
    ['Area of a square of side 6 cm?','36',['12','24','30','36']],
    ['How many degrees are in a right angle?','90',['45','60','90','180']],
    ['Angles on a straight line total?','180',['90','120','180','360']],
    ['A triangle has how many sides?','3',['2','3','4','5']]
  ]],
  [pct.id,'Commercial Arithmetic',[
    ['10% of ₦3000 is?','300',['30','300','600','3000']],
    ['Cost ₦500, sell ₦600. Profit?','100',['50','100','500','1100']],
    ['A 20% discount on ₦1000 is?','200',['20','100','200','800']],
    ['Buy ₦800, lose ₦80. Loss percent?','10',['5','10','20','80']],
    ['5% of ₦2000 is?','100',['50','100','200','500']]
  ]],
  [mean.id,'Statistics & Data',[
    ['Mean of 2, 4, 6?','4',['3','4','6','12']],
    ['Mode of 2,2,3,4?','2',['2','3','4','11']],
    ['Median of 1,3,5?','3',['1','3','5','9']],
    ['Mean of 10 and 20?','15',['10','15','20','30']],
    ['Range of 4,9,12?','8',['3','8','9','16']]
  ]],
  [ratio.id,'Ratio & Proportion',[
    ['Simplify 6:12.','1:2',['1:2','2:1','3:4','6:12']],
    ['If 2 pens cost ₦100, 4 cost?','200',['100','150','200','400']],
    ['Share 30 in ratio 1:2. Larger share?','20',['10','15','20','30']],
    ['3:9 simplifies to?','1:3',['1:2','1:3','2:3','3:1']],
    ['If 5 books cost ₦500, one costs?','100',['50','100','250','500']]
  ]],
  [units.id,'Measurement',[
    ['100 cm equals how many metres?','1',['1','10','100','1000']],
    ['2 kg equals how many grams?','2000',['20','200','2000','20000']],
    ['3 litres equals how many millilitres?','3000',['30','300','3000','30000']],
    ['Half an hour is how many minutes?','30',['15','30','45','60']],
    ['2.5 metres equals how many centimetres?','250',['25','200','250','2500']]
  ]],
  [prob.id,'Probability',[
    ['Probability of head on a fair coin?','1/2',['0','1/4','1/2','1']],
    ['A fair die has how many outcomes?','6',['2','4','6','12']],
    ['Probability of rolling a 6 on a fair die?','1/6',['1/2','1/3','1/6','6']],
    ['Probability of an impossible event?','0',['0','1/4','1/2','1']],
    ['Probability of a certain event?','1',['0','1/4','1/2','1']]
  ]]
];
for(const [sk,tp,items] of bank){let n=1;for(const [pr,an,op] of items)await examQ(sk,'BECE',tp,n++,pr,an,op)}
// Give existing BECE questions explicit topic labels so analysis remains clean.
await sql`UPDATE questions q SET exam_topic=COALESCE(exam_topic,t.name) FROM skills s JOIN topics t ON t.id=s.topic_id WHERE q.skill_id=s.id AND q.exam_name='BECE'`;

// V7.8 English Language exam-standard starter bank: 8 curriculum areas x 5 reviewed AVORA-original items.
const english=(await sql`SELECT id FROM subjects WHERE slug='english' LIMIT 1`)[0];
const engDefs=[
 ['grammar-structure','Grammar & Structure','grammar-structure','Grammar and sentence structure'],['vocabulary-lexis','Vocabulary & Lexis','vocabulary-lexis','Vocabulary in context'],['comprehension','Comprehension','comprehension','Reading comprehension'],['sentence-meaning','Sentence Meaning','sentence-meaning','Interpret sentence meaning'],['punctuation','Punctuation','punctuation','Use punctuation accurately'],['spelling-usage','Spelling & Usage','spelling-usage','Spelling and standard usage'],['word-classes','Word Classes','word-classes','Identify and use word classes'],['concord','Concord','concord','Apply subject-verb agreement']
];
const engSkills={};for(let j=0;j<engDefs.length;j++){const [slug,name,ss,desc]=engDefs[j];const t=await topic(english.id,slug,name,'JSS3',j+1);engSkills[slug]=await skill(t.id,ss,name,desc)}
const engBank=[
 ['grammar-structure','Grammar & Structure',[
  ['Choose the sentence that is grammatically correct.','Neither of the boys was late.',['Neither of the boys were late.','Neither of the boys was late.','Neither of the boy were late.','Neither boys was late.']],
  ['Complete: If Ada ___ earlier, she would have met us.','had arrived',['arrives','arrived','had arrived','has arrived']],
  ['Choose the correct form: The news ___ surprising.','is',['are','were','is','have']],
  ['Complete: She has lived here ___ 2022.','since',['for','since','from','by']],
  ['Choose the correct sentence.','I prefer reading to watching television.',['I prefer reading than watching television.','I prefer reading to watching television.','I prefer to read than watching television.','I prefer reading over to watch television.']]
 ]],
 ['vocabulary-lexis','Vocabulary & Lexis',[
  ['Choose the word nearest in meaning to “diligent”.','hard-working',['careless','hard-working','noisy','uncertain']],
  ['Choose the word opposite in meaning to “scarce”.','abundant',['rare','little','abundant','costly']],
  ['In “The principal commended the pupils”, commended means ___.','praised',['punished','praised','ignored','questioned']],
  ['Choose the best word: The doctor ___ the patient before prescribing medicine.','examined',['watched','examined','glanced','noticed']],
  ['A person who writes books is an ___.','author',['auditor','author','actor','editor']]
 ]],
 ['comprehension','Comprehension',[
  ['Tunde left home early because he wanted to avoid the morning traffic. Why did Tunde leave early?','To avoid traffic',['To buy food','To avoid traffic','To visit a friend','To miss school']],
  ['“Although the rain was heavy, the match continued.” What happened despite the rain?','The match continued',['The match stopped','The players went home','The match continued','The rain ended']],
  ['Amina saved part of her allowance each week until she could buy the dictionary herself. What quality did Amina show?','patience',['wastefulness','patience','dishonesty','carelessness']],
  ['The library closes at 4 p.m., so Musa arrived at 3:30 p.m. What can be inferred?','He arrived before closing time',['He arrived after closing','He works at the library','He arrived before closing time','The library opens at 4 p.m.']],
  ['“The road was flooded; therefore, the bus took another route.” Why did the bus change route?','The road was flooded',['The driver was lost','The road was flooded','The bus was full','The passengers complained']]
 ]],
 ['sentence-meaning','Sentence Meaning',[
  ['What does “Ngozi hardly ever misses school” mean?','Ngozi rarely misses school',['Ngozi never attends school','Ngozi rarely misses school','Ngozi misses school daily','Ngozi has left school']],
  ['“Bola is too tired to continue.” This means Bola ___.','is so tired that she cannot continue',['will certainly continue','is so tired that she cannot continue','is not tired','continued already']],
  ['“No sooner had the bell rung than the pupils left.” This means the pupils left ___.','immediately after the bell rang',['before the bell rang','long after the bell rang','immediately after the bell rang','without hearing the bell']],
  ['“Unless you study, you may not pass.” This means ___.','studying is necessary for a good chance of passing',['studying prevents passing','passing requires no effort','studying is necessary for a good chance of passing','you have already passed']],
  ['“Kemi would rather walk than wait.” This means Kemi ___.','prefers walking to waiting',['dislikes walking','prefers waiting','prefers walking to waiting','cannot walk']]
 ]],
 ['punctuation','Punctuation',[
  ['Choose the correctly punctuated sentence.','“Where are you going?” asked Mother.',['“Where are you going”? asked Mother.','“Where are you going?” asked Mother.','“Where are you going,” asked Mother?','Where are you going? asked, Mother.']],
  ['Which mark ends a direct question?','question mark',['comma','colon','question mark','apostrophe']],
  ['Choose the correct form.','The girls’ bags were arranged neatly.',['The girls bags were arranged neatly.','The girl’s bags were arranged neatly.','The girls’ bags were arranged neatly.','The girls’s bags were arranged neatly.']],
  ['Choose the correctly punctuated list.','We bought rice, beans, tomatoes and onions.',['We bought rice beans tomatoes and onions.','We bought rice, beans, tomatoes and onions.','We bought, rice beans, tomatoes and onions.','We bought rice; beans tomatoes and onions.']],
  ['Which sentence uses a comma correctly?','After the lesson, we went outside.',['After the lesson we, went outside.','After, the lesson we went outside.','After the lesson, we went outside.','After the lesson we went, outside.']]
 ]],
 ['spelling-usage','Spelling & Usage',[
  ['Choose the correctly spelt word.','necessary',['neccessary','necessary','necesary','necessery']],
  ['Choose the correctly spelt word.','separate',['seperate','separete','separate','seperrate']],
  ['Complete correctly: The teacher gave me good ___.','advice',['advise','advice','advices','advising']],
  ['Choose the correct word: Please ___ this gift.','accept',['except','accept','expect','aspect']],
  ['Choose the correct word: The medicine had no harmful ___.','effect',['affect','effect','effects on','affection']]
 ]],
 ['word-classes','Word Classes',[
  ['In “The young girl sang beautifully”, which word is an adverb?','beautifully',['young','girl','sang','beautifully']],
  ['In “They opened the heavy door”, which word is an adjective?','heavy',['They','opened','heavy','door']],
  ['Which of these is a pronoun?','they',['quickly','they','market','bright']],
  ['In “The children played outside”, the word “children” is a ___.','noun',['verb','adjective','noun','adverb']],
  ['Which word is a conjunction?','although',['under','although','slowly','teacher']]
 ]],
 ['concord','Concord',[
  ['Complete: Each of the players ___ a jersey.','has',['have','has','are having','were having']],
  ['Complete: The boys ___ football every Saturday.','play',['plays','play','is playing','has played']],
  ['Complete: My brother and sister ___ at home.','are',['is','are','was','has']],
  ['Complete: One of the books ___ missing.','is',['are','were','is','have']],
  ['Complete: Neither the teacher nor the pupils ___ ready.','are',['is','was','are','has']]
 ]]
];
for(const [slug,tp,items] of engBank){let n=1;for(const [pr,an,op] of items)await examQ(engSkills[slug].id,'BECE',tp,n++,pr,an,op)}


// NCEE starter expansion: reliable Primary 6 exam-style coverage so both subjects can run full prototype papers.
const nceeMathDefs=[
 ['ncee-fractions','Fractions & Decimals','ncee-fractions','Fractions and decimals'],['ncee-measurement','Measurement','ncee-measurement','Measures and unit conversion'],['ncee-geometry','Geometry','ncee-geometry','Basic shapes and angles'],['ncee-money','Money & Percentage','ncee-money','Money and simple percentages'],['ncee-data','Data Handling','ncee-data','Simple data interpretation'],['ncee-word-problems','Word Problems','ncee-word-problems','Multi-step arithmetic'],['ncee-factors','Factors & Multiples','ncee-factors','Factors, multiples, HCF and LCM']
];const nm={};for(let j=0;j<nceeMathDefs.length;j++){const [slug,name,ss,desc]=nceeMathDefs[j];const t=await topic(math.id,slug,name,'Primary 6',j+2);nm[slug]=await skill(t.id,ss,name,desc)}
const nMath=[
 ['ncee-fractions','Fractions & Decimals',[["What is 1/2 + 1/4?",'3/4',['1/4','2/4','3/4','1']],['Write 0.25 as a fraction in lowest terms.','1/4',['1/2','1/4','2/5','25/10']],['What is 3/5 of 20?','12',['8','10','12','15']],['Which decimal is equal to 7/10?','0.7',['0.07','0.7','7.0','70']],['Arrange 0.4 and 0.35. Which is greater?','0.4',['0.35','0.4','They are equal','Cannot tell']]]],
 ['ncee-measurement','Measurement',[["How many centimetres are in 3 metres?",'300',['30','300','3000','3']],['2.5 kg equals how many grams?','2500',['250','2500','25','2005']],['How many minutes are in 2 hours?','120',['60','90','120','200']],['A 5 m rope is cut into 5 equal pieces. Length of each?','1 m',['1 m','5 m','10 m','25 m']],['How many millilitres make 1 litre?','1000',['100','500','1000','10000']]]],
 ['ncee-geometry','Geometry',[["How many right angles does a rectangle have?",'4',['1','2','3','4']],['An angle smaller than 90° is called?','acute angle',['obtuse angle','acute angle','straight angle','reflex angle']],['A shape with 3 sides is a?','triangle',['square','triangle','circle','rectangle']],['Perimeter of a square of side 4 cm?','16 cm',['8 cm','12 cm','16 cm','20 cm']],['Area of a rectangle 7 cm by 3 cm?','21 cm²',['10 cm²','20 cm²','21 cm²','42 cm²']]]],
 ['ncee-money','Money & Percentage',[["What is 10% of ₦500?",'50',['5','50','100','450']],['A book costs ₦750. How much do 2 books cost?','1500',['750','1000','1500','1750']],['You pay ₦1000 for an item costing ₦680. Change?','320',['220','300','320','380']],['25% of 200 is?','50',['25','40','50','75']],['A pen costs ₦120 and a ruler ₦80. Total?','200',['40','160','200','960']]]],
 ['ncee-data','Data Handling',[["Scores are 4, 6, 8. What is their mean?",'6',['4','6','8','18']],['Which number occurs most in 2, 3, 3, 5?','3',['2','3','5','13']],['What is the range of 5, 8, 12?','7',['4','5','7','12']],['The median of 2, 4, 9 is?','4',['2','4','5','9']],['A class has 12 boys and 18 girls. Total pupils?','30',['6','20','30','216']]]],
 ['ncee-word-problems','Word Problems',[["A bus carries 48 pupils. How many pupils do 5 buses carry?",'240',['53','96','240','480']],['There are 360 sweets shared equally among 9 children. Each gets?','40',['30','40','45','90']],['A farmer has 125 goats and buys 37 more. Total?','162',['88','152','162','172']],['A tank contains 900 L. 275 L is used. What remains?','625',['575','625','675','1175']],['Four boxes contain 24 bottles each. Total bottles?','96',['28','48','96','120']]]],
 ['ncee-factors','Factors & Multiples',[["What is the HCF of 12 and 18?",'6',['2','3','6','36']],['What is the LCM of 4 and 6?','12',['2','10','12','24']],['Which is a factor of 24?','6',['5','6','7','9']],['Which number is a multiple of 7?','35',['24','30','35','40']],['Which of these is a prime number?','13',['9','12','13','15']]]]
];for(const [slug,tp,items] of nMath){let n=1;for(const [pr,an,op] of items)await examQ(nm[slug].id,'NCEE',tp,n++,pr,an,op)}
// NCEE English uses the same language domains with Primary 6 level items.
const neDefs=[['ncee-eng-grammar','Grammar','Grammar'],['ncee-eng-vocab','Vocabulary','Vocabulary'],['ncee-eng-comp','Comprehension','Comprehension'],['ncee-eng-spelling','Spelling','Spelling'],['ncee-eng-punct','Punctuation','Punctuation'],['ncee-eng-classes','Word Classes','Word Classes'],['ncee-eng-meaning','Sentence Meaning','Sentence Meaning'],['ncee-eng-concord','Concord','Concord']];const ne={};for(let j=0;j<neDefs.length;j++){const [slug,name,desc]=neDefs[j];const t=await topic(english.id,slug,name,'Primary 6',j+20);ne[slug]=await skill(t.id,slug,name,desc)}
const neBank=[
 ['ncee-eng-grammar','Grammar',[["Choose the correct word: She ___ to school every day.",'goes',['go','goes','going','gone']],['The past tense of “eat” is ___.','ate',['eated','ate','eaten','eats']],['Complete: We ___ playing when it rained.','were',['was','were','is','be']],['Choose correctly: This book belongs to ___.','me',['I','me','my','mine book']],['Complete: They have ___ their work.','finished',['finish','finishing','finished','finishes']]]],
 ['ncee-eng-vocab','Vocabulary',[["A word nearest in meaning to “happy” is ___.",'glad',['angry','glad','weak','slow']],['The opposite of “ancient” is ___.','modern',['old','modern','past','broken']],['A person who teaches is a ___.','teacher',['farmer','teacher','driver','tailor']],['Choose the best word: The baby began to ___ loudly.','cry',['cry','read','cook','write']],['The opposite of “borrow” is ___.','lend',['keep','lend','take','buy']]]],
 ['ncee-eng-comp','Comprehension',[["Bisi carried an umbrella because dark clouds filled the sky. Why did she carry it?",'She expected rain',['She expected rain','She wanted shade indoors','She lost her bag','She was going swimming']],['The bell rang and the pupils entered their classrooms. What did the pupils do after the bell rang?','They entered their classrooms',['They went home','They entered their classrooms','They ate lunch','They played football']],['Kunle watered the plant every morning. After some weeks it grew taller. What helped the plant?','Regular watering',['Noise','Regular watering','Darkness','Dust']],['Ada returned the lost purse to its owner. What quality did she show?','honesty',['anger','honesty','laziness','fear']],['The road was busy, so Emeka used the pedestrian bridge. Why?','To cross more safely',['To buy food','To cross more safely','To wait for a bus','To play']]]],
 ['ncee-eng-spelling','Spelling',[["Choose the correct spelling.",'beautiful',['beautifull','beautiful','beutiful','beautyful']],['Choose the correct spelling.','because',['becos','becouse','because','beacause']],['Choose the correct spelling.','friend',['freind','friend','frend','friand']],['Choose the correct spelling.','school',['schol','school','scool','shcool']],['Choose the correct spelling.','receive',['recieve','receive','receeve','receve']]]],
 ['ncee-eng-punct','Punctuation',[["Which mark ends a question?",'question mark',['full stop','comma','question mark','apostrophe']],['Choose correctly.','Good morning, Musa.',['Good morning Musa','Good morning, Musa.','Good morning Musa?','Good, morning Musa']],['Which sentence begins with a capital letter correctly?','The dog is sleeping.',['the dog is sleeping.','The dog is sleeping.','the Dog is sleeping.','THE dog is sleeping.']],['Choose the correctly punctuated question.','Where are you going?',['Where are you going.','Where are you going?','Where, are you going','Where are you going!']],['Which mark shows possession in “Tunde’s book”?','apostrophe',['comma','apostrophe','colon','question mark']]]],
 ['ncee-eng-classes','Word Classes',[["Which word is a noun?",'market',['quickly','market','bright','under']],['Which word is a verb?','run',['blue','run','happy','table']],['Which word is an adjective?','tall',['tall','slowly','they','inside']],['Which word is a pronoun?','she',['school','she','jump','green']],['Which word is an adverb?','carefully',['careful','carefully','care','caring']]]],
 ['ncee-eng-meaning','Sentence Meaning',[["“The cup is empty” means the cup ___.",'has nothing in it',['is full','has nothing in it','is broken','is new']],['“Musa arrived before Tayo” means ___.','Musa arrived first',['Tayo arrived first','Musa arrived first','They did not arrive','They arrived tomorrow']],['“The test was easy” means it was ___.','not difficult',['very long','not difficult','impossible','unfinished']],['“Ngozi seldom complains” means she ___.','does not complain often',['complains always','does not complain often','never speaks','is always angry']],['“Close the door quietly” asks you to ___.','avoid making noise',['slam the door','avoid making noise','leave it open','lock every door']]]],
 ['ncee-eng-concord','Concord',[["The boy ___ a bicycle.",'has',['have','has','are','were']],['The girls ___ in the hall.','are',['is','are','was','has']],['My mother and father ___ at home.','are',['is','are','was','has']],['Each pupil ___ a pencil.','has',['have','has','are','were']],['One of the dogs ___ barking.','is',['are','is','were','have']]]]
];for(const [slug,tp,items] of neBank){let n=1;for(const [pr,an,op] of items)await examQ(ne[slug].id,'NCEE',tp,n++,pr,an,op)}


// V7.18 depth expansion: additional reviewed AVORA-original BECE variants.
// These are new original items designed to widen reasoning patterns, not copied past questions.
async function richExamQ(skillId,topicName,n,prompt,answer,options,objective,family,explanation,hint){
 const exists=await sql`SELECT id FROM questions WHERE prompt=${prompt} AND source_type='AVORA_ORIGINAL' LIMIT 1`;
 if(exists.length){await sql`UPDATE questions SET exam_name='BECE',exam_topic=${topicName},curriculum_objective=${objective},variant_family=${family},quality_status='REVIEWED',content_origin='AVORA_ORIGINAL' WHERE id=${exists[0].id}`;return}
 await sql`INSERT INTO questions(skill_id,source_type,exam_name,exam_topic,question_group,curriculum_order,prompt,question_type,options,correct_answer,explanation,difficulty,status,hint_text,content_origin,curriculum_objective,variant_family,quality_status) VALUES(${skillId},'AVORA_ORIGINAL','BECE',${topicName},${topicName.toLowerCase().replaceAll(' ','-')},${n},${prompt},'MULTIPLE_CHOICE',${sql.json(options)},${sql.json({value:answer})},${explanation},2,'PUBLISHED',${hint},'AVORA_ORIGINAL',${objective},${family},'REVIEWED')`;
}
const depthMath=[
 [frac.id,'Number & Numeration','fractions-percentages','Convert and apply fractions, decimals and percentages',[
  ['A shirt marked ₦4,000 is reduced by 15%. How much is the reduction?','600',['400','600','3400','4600'],'percentage-of-quantity','15% means 15 out of every 100. 0.15 × 4000 = 600.','Find 10% and 5%, then add them.'],
  ['Which is smallest: 0.62, 5/8, 61%, 0.7?','61%',['0.62','5/8','61%','0.7'],'compare-representations','Convert to decimals: 0.62, 0.625, 0.61, 0.70.','Put every option in the same form.'],
  ['What percentage of 250 is 45?','18%',['9%','18%','20%','22.5%'],'reverse-percentage','45 ÷ 250 × 100 = 18%.','Compare the part with the whole.'],
  ['If 3/8 of a number is 24, what is the number?','64',['48','56','64','72'],'reverse-fraction','One eighth is 8, so eight eighths is 64.','Find 1/8 first.'],
  ['Round 47.836 to two decimal places.','47.84',['47.8','47.83','47.84','48.00'],'rounding','The third decimal digit is 6, so the hundredths digit rounds up.','Look one place beyond the required position.'],
  ['Write 530,000 in standard form.','5.3 × 10^5',['53 × 10^4','5.3 × 10^5','0.53 × 10^6','530 × 10^3'],'standard-form','Move the decimal five places left to obtain a number between 1 and 10.','The first factor must be at least 1 and less than 10.']]],
 [linear.id,'Algebra','linear-equations','Solve and interpret linear equations',[
  ['Solve 4(x - 2) = 20.','7',['3','5','7','8'],'brackets','Divide by 4 to get x - 2 = 5, then add 2.','Undo the outside multiplication first.'],
  ['Solve 5x + 4 = 2x + 19.','5',['3','5','7','23'],'both-sides','Collect variable terms on one side and constants on the other: 3x = 15.','Subtract 2x from both sides first.'],
  ['If 2y - 3 = 11, what is 3y?','21',['7','14','18','21'],'multi-step-transfer','2y = 14, so y = 7 and 3y = 21.','Find y before answering what was actually asked.'],
  ['The sum of a number and 9 is 25. What is the number?','16',['14','16','25','34'],'word-to-equation','Let the number be x: x + 9 = 25, so x = 16.','Translate the sentence into an equation.'],
  ['Solve: x + y = 14 and x - y = 4. What is y?','5',['4','5','9','10'],'simultaneous-elimination','Adding gives 2x=18 so x=9; then y=5.','Find x first, then substitute.'],
  ['If a = 3 and b = -2, find 2a - b.','8',['2','4','8','10'],'substitution','2(3) - (-2) = 6 + 2 = 8.','Be careful when subtracting a negative number.']]],
 [area.id,'Geometry & Mensuration','geometry-mensuration','Use angle facts and mensuration relationships',[
  ['Two angles on a straight line are (x + 20)° and 100°. Find x.','60',['40','60','80','100'],'angle-equation','Angles on a straight line total 180°, so x + 120 = 180.','Use the 180° relationship.'],
  ['A triangle has angles 48° and 67°. Find the third angle.','65°',['55°','65°','75°','115°'],'triangle-angles','Angles in a triangle total 180°. 180 - 115 = 65.','Add the known angles first.'],
  ['A circle has radius 7 cm. Using π = 22/7, find its circumference.','44 cm',['22 cm','44 cm','49 cm','154 cm'],'circumference','C = 2πr = 2 × 22/7 × 7 = 44 cm.','Circumference measures around the circle.'],
  ['The area of a triangle is 30 cm² and its base is 10 cm. Find its perpendicular height.','6 cm',['3 cm','6 cm','10 cm','15 cm'],'reverse-area','30 = 1/2 × 10 × h, so 30 = 5h and h = 6.','Use the area formula backwards.'],
  ['A cuboid is 5 cm by 4 cm by 3 cm. Find its volume.','60 cm³',['12 cm³','20 cm³','47 cm³','60 cm³'],'volume','Volume = length × width × height = 60 cm³.','Volume uses cubic units.'],
  ['A square has area 81 cm². Find its perimeter.','36 cm',['9 cm','18 cm','36 cm','324 cm'],'area-to-perimeter','The side is √81 = 9 cm, so perimeter = 4 × 9 = 36 cm.','Find the side length before the perimeter.']]],
 [pct.id,'Commercial Arithmetic','commercial-arithmetic','Solve profit, loss, discount and simple percentage problems',[
  ['A trader buys an item for ₦2,500 and sells it for ₦3,000. Find the profit percentage.','20%',['16%','20%','25%','50%'],'profit-percent','Profit = 500. 500/2500 × 100 = 20%.','Profit percentage is compared with cost price.'],
  ['A radio marked ₦12,000 is sold at 10% discount. What is the selling price?','₦10,800',['₦1,200','₦10,800','₦11,000','₦13,200'],'discount-selling-price','10% of 12,000 is 1,200, so selling price is 10,800.','Subtract the discount from the marked price.'],
  ['An item is sold for ₦4,500 at a loss of ₦500. What was the cost price?','₦5,000',['₦4,000','₦4,500','₦5,000','₦5,500'],'reverse-loss','Cost price = selling price + loss = 5,000.','A loss means the selling price is below cost.'],
  ['Simple interest on ₦10,000 at 5% per year for 2 years is?','₦1,000',['₦500','₦1,000','₦1,500','₦10,500'],'simple-interest','SI = PRT/100 = 10000 × 5 × 2 /100 = 1000.','Use principal × rate × time ÷ 100.'],
  ['A price rises from ₦800 to ₦920. What is the percentage increase?','15%',['12%','15%','20%','120%'],'percentage-change','Increase = 120; 120/800 × 100 = 15%.','Compare the increase with the original price.'],
  ['A salesperson earns 4% commission on ₦75,000 sales. Find the commission.','₦3,000',['₦750','₦3,000','₦7,500','₦30,000'],'commission','4% of 75,000 = 3,000.','Find 1% first if helpful.']]],
 [mean.id,'Statistics & Data','statistics-data','Interpret and calculate common measures of data',[
  ['Find the median of 3, 9, 4, 7, 5.','5',['4','5','5.6','7'],'median','Arrange: 3,4,5,7,9. The middle value is 5.','Arrange the data first.'],
  ['Find the mode of 2, 5, 5, 6, 7, 5, 8.','5',['2','5','6','8'],'mode','5 occurs more often than any other value.','Count frequencies.'],
  ['The mean of 6 numbers is 8. What is their total?','48',['14','24','42','48'],'reverse-mean','Total = mean × number of values = 8 × 6 = 48.','Reverse the mean formula.'],
  ['The range of a set is 18. If the smallest value is 7, what is the largest?','25',['11','18','25','126'],'reverse-range','Largest - 7 = 18, so largest = 25.','Range = largest - smallest.'],
  ['Scores 4, 6, 8, 10 have mean 7. If another score 12 is added, what is the new mean?','8',['7','8','9','12'],'updated-mean','Old total 28; new total 40; 40 ÷ 5 = 8.','Rebuild the total before dividing.'],
  ['Which measure is most affected by one extremely large value?','mean',['mode','median','mean','range only'],'outlier-effect','The mean uses every value and can be pulled strongly by an extreme value.','Think about which measure adds all values.']]],
 [ratio.id,'Ratio & Proportion','ratio-proportion','Use ratio, sharing and direct proportion',[
  ['Share ₦840 in the ratio 3:4. What is the larger share?','₦480',['₦120','₦360','₦480','₦560'],'ratio-sharing','Total parts = 7; one part = 120; larger share = 4 × 120 = 480.','Find the value of one ratio part.'],
  ['If 6 notebooks cost ₦1,800, how much do 10 cost at the same rate?','₦3,000',['₦300','₦1,800','₦2,400','₦3,000'],'unitary-proportion','One notebook costs 300, so ten cost 3,000.','Find the cost of one first.'],
  ['A map scale is 1 cm : 5 km. What actual distance does 7 cm represent?','35 km',['12 km','25 km','35 km','70 km'],'scale','7 × 5 km = 35 km.','Apply the same scale factor.'],
  ['Simplify 18:30.','3:5',['2:3','3:5','5:3','9:15'],'simplify-ratio','Divide both parts by their HCF, 6.','Find the highest common factor.'],
  ['If y is directly proportional to x and y=12 when x=3, find y when x=5.','20',['4','15','20','60'],'direct-proportion','y/x = 4, so y = 4 × 5 = 20.','Find the constant rate.'],
  ['Boys:girls = 2:3 in a class of 35. How many girls are there?','21',['14','20','21','23'],'ratio-total','There are 5 total parts; each is 7; girls = 3 × 7 = 21.','Use the total number of ratio parts.']]],
 [units.id,'Measurement','measurement-units','Convert and reason with common metric and time units',[
  ['3.4 km equals how many metres?','3400 m',['34 m','340 m','3400 m','34000 m'],'length-conversion','1 km = 1000 m, so 3.4 km = 3400 m.','Multiply by 1000.'],
  ['7500 g equals how many kilograms?','7.5 kg',['0.75 kg','7.5 kg','75 kg','750 kg'],'mass-conversion','Divide grams by 1000 to get kilograms.','Moving to a larger unit gives fewer units.'],
  ['2 hours 35 minutes is how many minutes?','155',['120','135','155','235'],'time-conversion','2 hours = 120 minutes; add 35 to get 155.','Convert the hours first.'],
  ['1.75 litres equals how many millilitres?','1750 ml',['175 ml','750 ml','1750 ml','17500 ml'],'capacity-conversion','1 L = 1000 ml, so 1.75 L = 1750 ml.','Multiply litres by 1000.'],
  ['A journey starts at 9:45 a.m. and lasts 2 hours 30 minutes. When does it end?','12:15 p.m.',['11:15 a.m.','12:15 p.m.','12:45 p.m.','1:15 p.m.'],'elapsed-time','9:45 + 2 hours = 11:45; +30 minutes = 12:15.','Add the duration in parts.'],
  ['A rectangle is 2.5 m long. What is this length in centimetres?','250 cm',['25 cm','200 cm','250 cm','2500 cm'],'decimal-length','2.5 × 100 = 250 cm.','1 m = 100 cm.']]],
 [prob.id,'Probability','probability','Reason about simple equally likely events',[
  ['A bag has 3 red and 5 blue balls. What is the probability of choosing red?','3/8',['3/5','3/8','5/8','1/3'],'single-event','There are 8 balls in total and 3 favourable red outcomes.','Favourable outcomes over total outcomes.'],
  ['What is the probability of rolling an even number on a fair die?','1/2',['1/6','1/3','1/2','2/3'],'even-die','Even outcomes are 2,4,6: 3 out of 6 = 1/2.','List the favourable die faces.'],
  ['If P(rain)=0.3, what is P(no rain)?','0.7',['0.3','0.5','0.7','1.3'],'complement','Complementary probabilities add to 1: 1 - 0.3 = 0.7.','A certain total has probability 1.'],
  ['A card numbered 1 to 10 is chosen. Probability of a number greater than 7?','3/10',['2/10','3/10','7/10','8/10'],'counting-outcomes','8,9,10 are favourable: 3 out of 10.','List numbers greater than 7.'],
  ['Which probability represents the most likely event?','0.9',['0.1','0.25','0.5','0.9'],'compare-probability','A probability closer to 1 is more likely.','Compare how close each value is to 1.'],
  ['A fair coin is tossed twice. How many equally likely outcomes are there?','4',['2','3','4','8'],'sample-space','HH, HT, TH, TT: four outcomes.','List the two-toss outcomes.']]]
];
for(const [sk,tp,family,objective,items] of depthMath){let n=40;for(const [pr,an,op,vf,ex,hi] of items)await richExamQ(sk,tp,n++,pr,an,op,objective,`${family}:${vf}`,ex,hi)}
const depthEnglish=[
 ['grammar-structure','Grammar & Structure','Use standard grammar and sentence structure',[
  ['Choose correctly: By this time tomorrow, we ___ the examination.','will have finished',['finish','finished','will have finished','have finish'],'tense-future-perfect','The action will be complete before a stated future time.','Look at “by this time tomorrow”.'],
  ['Choose correctly: If I ___ you, I would apologise.','were',['am','was','were','be'],'conditional','Formal standard English uses “were” in this unreal condition.','This describes an unreal situation.'],
  ['Which sentence is in the passive voice?','The window was broken by the ball.',['The ball broke the window.','The window was broken by the ball.','The boy kicked the ball.','The window broke suddenly.'],'voice','The receiver of the action is made the grammatical subject.','Look for be + past participle.'],
  ['Complete: She is one of the students who ___ always punctual.','are',['is','are','was','has'],'relative-agreement','“Who” refers to students, so the plural verb “are” agrees.','Identify the noun the relative pronoun refers to.'],
  ['Choose the correct reported form: Musa said, “I am tired.”','Musa said that he was tired.',['Musa said that I am tired.','Musa said that he was tired.','Musa says he tired.','Musa said he is tired yesterday.'],'reported-speech','The pronoun and tense shift appropriately in reported speech.','Change both speaker reference and tense.'],
  ['Choose correctly: Neither Ada nor her friends ___ available.','are',['is','was','are','has'],'correlative-concord','With neither…nor, agreement commonly follows the nearer subject “friends”.','Check the noun nearest the verb.']]],
 ['vocabulary-lexis','Vocabulary & Lexis','Interpret vocabulary accurately in context',[
  ['In “The chairman gave a concise speech”, concise means ___.','brief',['confusing','brief','angry','secret'],'context-synonym','Concise means using few words while remaining clear.','Think of a speech that is short but complete.'],
  ['Choose the word opposite in meaning to “reluctant”.','willing',['careful','willing','slow','afraid'],'antonym','Reluctant means unwilling; its opposite is willing.','Look for the direct opposite.'],
  ['The word “fragile” most nearly means ___.','easily broken',['very expensive','easily broken','very heavy','brightly coloured'],'definition','Fragile describes something easily damaged or broken.','Think of a glass object label.'],
  ['In “Her explanation was ambiguous”, ambiguous means ___.','unclear in meaning',['very detailed','unclear in meaning','completely false','very loud'],'context-meaning','Ambiguous means capable of more than one interpretation or not clear.','The problem is lack of clarity.'],
  ['A person who receives guests is a ___.','host',['guest','host','tenant','tourist'],'lexical-role','A host receives or entertains guests.','Think about the opposite role of guest.'],
  ['Choose the best word: The witness gave a ___ account of what happened.','detailed',['detail','detailed','detailing','details'],'word-form','An adjective is needed before the noun “account”.','Which option can describe “account”?']]],
 ['comprehension','Comprehension','Read for explicit information, inference and purpose',[
  ['“The sky darkened and traders hurried to cover their goods.” What can be inferred?','Rain was likely approaching',['The market was closing forever','Rain was likely approaching','The traders were celebrating','It was midnight'],'inference','Darkening sky plus covering goods supports the inference that rain was coming.','Combine both clues.'],
  ['“Despite losing the first set, the team remained calm and won the match.” Which quality did the team show?','resilience',['carelessness','resilience','dishonesty','fear'],'character-trait','They recovered from an early setback and continued effectively.','Think about recovering after difficulty.'],
  ['A notice says: “Library users must return books within two weeks.” What is the purpose of the notice?','To state a borrowing rule',['To advertise new books','To state a borrowing rule','To close the library','To invite authors'],'purpose','The sentence gives a rule governing book return.','Ask what the notice wants readers to do.'],
  ['“Because the bridge was under repair, commuters used the longer road.” Why was the longer road used?','The bridge was under repair',['It was faster','The bridge was under repair','The road was empty','The commuters were lost'],'cause-effect','The passage directly states the cause.','Look for the clause beginning with “because”.'],
  ['“Ngozi checked the figures twice before submitting the report.” What does this suggest about Ngozi?','She was careful',['She was careless','She was careful','She disliked reports','She could not count'],'inference-care','Checking twice suggests care and accuracy.','Infer a quality from the action.'],
  ['“The principal thanked the volunteers for giving up their Saturday.” What did the volunteers sacrifice?','Their free time',['Their school fees','Their free time','Their uniforms','Their lunch only'],'detail','Giving up Saturday refers to giving their time.','Restate the phrase in simpler words.']]],
 ['sentence-meaning','Sentence Meaning','Interpret and paraphrase sentence meaning',[
  ['“Hardly had the lesson begun when the lights went out” means ___.','the lights went out soon after the lesson began',['the lights failed before the lesson','the lights went out soon after the lesson began','the lesson never began','the lights stayed on'],'time-relation','Hardly…when expresses that the second event followed almost immediately.','Focus on the timing between the events.'],
  ['“Tola is anything but lazy” means Tola is ___.','not lazy at all',['sometimes lazy','not lazy at all','always asleep','unable to work'],'idiom-anything-but','“Anything but” means definitely not.','Do not read the phrase word by word.'],
  ['“The plan is unlikely to succeed” means success is ___.','not very probable',['certain','not very probable','already achieved','impossible to discuss'],'probability-language','Unlikely means not probable, though not impossible.','Distinguish unlikely from impossible.'],
  ['“Only after the bell rang did they leave” means they ___.','left after the bell rang',['left before the bell','left after the bell rang','ignored the bell','never left'],'emphasis-inversion','The inversion emphasizes that leaving happened after the bell.','Restore the sentence to ordinary word order.'],
  ['“She would have attended but for the rain” means ___.','the rain prevented her from attending',['she attended because it rained','the rain prevented her from attending','she dislikes attendance','she attended before rain'],'but-for','“But for” means if it had not been for.','Replace “but for” with “if not for”.'],
  ['“The task was beyond him” means the task was ___.','too difficult for him',['behind him','too difficult for him','given to another person','physically far away'],'figurative-meaning','Here “beyond” means outside his ability.','Use context, not physical position.']]],
 ['punctuation','Punctuation','Use punctuation to show structure and meaning',[
  ['Choose the correctly punctuated sentence.','After dinner, we revised Mathematics.',['After dinner we, revised Mathematics.','After dinner, we revised Mathematics.','After, dinner we revised Mathematics.','After dinner we revised, Mathematics.'],'introductory-comma','An introductory phrase is separated from the main clause by a comma.','Look at the opening phrase.'],
  ['Which sentence shows possession by one girl?','The girl’s bag is blue.',['The girls bag is blue.','The girls’ bag is blue.','The girl’s bag is blue.','The girls’s bag is blue.'],'apostrophe-singular','Singular possession normally adds apostrophe + s.','One girl owns the bag.'],
  ['Choose the correctly punctuated direct speech.','“Come here,” the teacher said.',['“Come here” the teacher said.','“Come here,” the teacher said.','Come here, “the teacher said.”','“Come here”. the teacher said.'],'direct-speech','The comma belongs inside the quotation before the reporting clause.','Separate the spoken words from the reporting clause.'],
  ['Which mark can introduce a list after a complete statement?','colon',['apostrophe','colon','question mark','hyphen'],'colon-list','A colon can introduce a list after a complete clause.','Think of “Bring these items: …”.'],
  ['Choose the correct sentence.','Yes, I understand the instruction.',['Yes I, understand the instruction.','Yes, I understand the instruction.','Yes I understand, the instruction.','Yes; I understand the instruction.'],'interjection-comma','A brief introductory response such as “Yes” is followed by a comma.','Pause naturally after “Yes”.'],
  ['Which sentence uses the apostrophe correctly for several pupils?','The pupils’ books were collected.',['The pupil’s books were collected.','The pupils books were collected.','The pupils’ books were collected.','The pupils’s books were collected.'],'apostrophe-plural','A regular plural ending in s takes the apostrophe after the s.','Several pupils own the books.']]],
 ['spelling-usage','Spelling & Usage','Use standard spelling and commonly confused words accurately',[
  ['Choose the correctly spelt word.','accommodation',['accomodation','accommodation','acommodation','accommadation'],'spelling-accommodation','The standard spelling is accommodation.','Watch the doubled c and m.'],
  ['Choose the correctly spelt word.','privilege',['privelege','priviledge','privilege','previlege'],'spelling-privilege','The standard spelling is privilege.','Compare the middle vowels carefully.'],
  ['Complete: The new policy will ___ everyone.','affect',['effect','affect','effects','affection'],'affect-effect','Affect is usually the verb meaning influence; effect is commonly the noun result.','A verb is required after “will”.'],
  ['Complete: Please ___ that the door is locked.','ensure',['insure','ensure','assure me to','sure'],'ensure-usage','Ensure means make certain that something happens or is true.','The sentence means “make certain”.'],
  ['Choose the correct word: The school ___ spoke at assembly.','principal',['principle','principal','principel','principle officer'],'principal-principle','Principal can mean the head of a school; principle means a rule or belief.','Think of a person, not a rule.'],
  ['Choose correctly: We have ___ chairs than we need.','fewer',['less','fewer','fewest than','little'],'fewer-less','Use fewer with countable plural nouns such as chairs.','Can the noun be counted individually?']]],
 ['word-classes','Word Classes','Identify word classes from their function in sentences',[
  ['In “The extremely tall player scored”, “extremely” is a ___.','adverb',['noun','verb','adjective','adverb'],'adverb-degree','“Extremely” modifies the adjective “tall”.','Ask what word it modifies.'],
  ['In “Honesty is valuable”, “Honesty” is a ___.','noun',['noun','verb','adverb','preposition'],'abstract-noun','Honesty names an abstract quality, so it functions as a noun.','It names an idea or quality.'],
  ['In “We walked through the gate”, “through” is a ___.','preposition',['pronoun','preposition','adjective','conjunction'],'preposition','“Through” shows the relationship between walked and gate.','It links movement to a noun phrase.'],
  ['In “Although it rained, we continued”, “Although” is a ___.','conjunction',['noun','conjunction','adverb','pronoun'],'subordinating-conjunction','It joins a dependent clause to the main clause.','It connects two clauses.'],
  ['In “Those books are mine”, “Those” functions as a ___.','determiner',['verb','determiner','adverb','preposition'],'determiner','“Those” comes before the noun and identifies which books.','Look at its job before “books”.'],
  ['In “She quickly opened the door”, which word is the verb?','opened',['She','quickly','opened','door'],'identify-verb','“Opened” expresses the action.','Find the action word.']]],
 ['concord','Concord','Apply subject-verb agreement in simple and complex structures',[
  ['Complete: The list of names ___ on the table.','is',['are','is','were','have'],'head-subject','The head subject is “list”, which is singular.','Ignore the prepositional phrase “of names”.'],
  ['Complete: Either the teachers or the principal ___ attending.','is',['are','is','were','have'],'proximity','With either…or, agreement commonly follows the nearer subject “principal”.','Check the noun closest to the verb.'],
  ['Complete: Mathematics ___ my favourite subject.','is',['are','is','were','have'],'subject-name','The name of the school subject Mathematics takes a singular verb here.','Treat the subject name as one field of study.'],
  ['Complete: A number of pupils ___ absent today.','are',['is','are','was','has'],'a-number-of','“A number of” means several and takes a plural verb.','This phrase means several pupils.'],
  ['Complete: The number of pupils ___ increasing.','is',['are','is','were','have'],'the-number-of','“The number” is singular and takes “is”.','The head subject is “number”.'],
  ['Complete: Bread and butter ___ his usual breakfast.','is',['are','is','were','have'],'compound-unit','Here bread and butter is treated as one customary meal.','Ask whether the pair is functioning as one unit.']]]
];
for(const [slug,tp,objective,items] of depthEnglish){let n=40;for(const [pr,an,op,vf,ex,hi] of items)await richExamQ(engSkills[slug].id,tp,n++,pr,an,op,objective,`${slug}:${vf}`,ex,hi)}



// V7.20.7 academic map expansion: every Tutor topic exposed to learners has reviewed
// AVORA-original exam-aligned items. These are not copied past questions.
async function reviewedExamQ(skillId,exam,topicName,n,prompt,answer,options,objective,explanation,hint){
 const exists=await sql`SELECT id FROM questions WHERE prompt=${prompt} AND source_type='AVORA_ORIGINAL' LIMIT 1`;
 if(exists.length){await sql`UPDATE questions SET exam_name=${exam},exam_topic=${topicName},curriculum_order=${n},quality_status='REVIEWED',content_origin='AVORA_ORIGINAL',curriculum_objective=${objective},explanation=${explanation},hint_text=${hint} WHERE id=${exists[0].id}`;return}
 await sql`INSERT INTO questions(skill_id,source_type,exam_name,exam_topic,question_group,curriculum_order,prompt,question_type,options,correct_answer,explanation,difficulty,status,hint_text,content_origin,curriculum_objective,variant_family,quality_status) VALUES(${skillId},'AVORA_ORIGINAL',${exam},${topicName},${topicName.toLowerCase().replaceAll(' ','-')},${n},${prompt},'MULTIPLE_CHOICE',${sql.json(options)},${sql.json({value:answer})},${explanation},2,'PUBLISHED',${hint},'AVORA_ORIGINAL',${objective},${topicName.toLowerCase().replaceAll(' ','-')+':v7207:'+n},'REVIEWED')`;
}

const beceExtraDefs=[
 ['oral-english','Oral English','oral-english','Speech sounds, stress, rhythm and intonation'],
 ['writing-composition','Writing & Composition','writing-composition','Planning, organisation, register and editing'],
 ['literature','Literature','literature','Prose, poetry, drama and traditional narratives']
];
const beceExtra={};
for(let j=0;j<beceExtraDefs.length;j++){const [slug,name,ss,desc]=beceExtraDefs[j];const t=await topic(english.id,slug,name,'JSS3',30+j);beceExtra[slug]=await skill(t.id,ss,name,desc)}
const beceExtraBank=[
 ['oral-english','Oral English','Recognise speech sounds, stress and meaning in spoken English',[
  ['Which pair differs mainly in vowel sound?','ship / sheep',['ship / sheep','cat / cats','play / played','book / books'],'The vowels in “ship” and “sheep” contrast in quality/length in standard pronunciation.','Listen to the vowel, not only the spelling.'],
  ['What does word stress refer to?','one syllable being pronounced with greater prominence',['every letter being louder','one syllable being pronounced with greater prominence','speaking every syllable equally','spelling a word slowly'],'Stress is the extra prominence given to one syllable compared with others.','Think of the strongest beat in the word.'],
  ['If the speaker strongly stresses “TOLA” in “I asked Tola”, what is most likely being contrasted?','Tola with another person',['asking with writing','Tola with another person','the past with the present','I with everybody'],'Contrastive stress on the name highlights which person was asked.','Ask which word receives the strongest emphasis.'],
  ['Which statement about English letters and sounds is correct?','One letter can represent different sounds in different words',['Every letter always has one sound','One letter can represent different sounds in different words','Spelling always tells pronunciation exactly','Every word has one syllable'],'English spelling and pronunciation are related but not one-to-one.','Compare familiar words with the same letter in different sound contexts.'],
  ['What is intonation?','the movement of pitch across an utterance',['the number of letters in a word','the movement of pitch across an utterance','the speed of handwriting','the spelling of difficult words'],'Intonation is the rise and fall of pitch across spoken language.','Think about how the voice rises and falls.']
 ]],
 ['writing-composition','Writing & Composition','Plan, organise and edit examination writing appropriately',[
  ['Before writing a formal letter to a principal, what should a student identify first?','purpose and audience',['number of pages only','purpose and audience','the longest word to use','a joke for the opening'],'Purpose and audience determine content, tone and organisation.','Ask why you are writing and who will read it.'],
  ['Which is the best feature of a strong paragraph?','it develops one clear main idea with relevant support',['it contains as many unrelated ideas as possible','it develops one clear main idea with relevant support','it avoids all examples','it must always have exactly three sentences'],'A coherent paragraph develops a central point using relevant support.','Think about unity and development.'],
  ['Which tone best suits a letter requesting a school facility from the principal?','respectful and formal',['casual chat language','respectful and formal','insulting and forceful','slang throughout'],'The relationship and purpose require a respectful formal register.','Match the language to the audience.'],
  ['What should an argumentative paragraph do after stating a position?','support it with reasons and evidence',['repeat the position many times','change to a different topic','support it with reasons and evidence','avoid examples completely'],'Arguments become convincing through reasons, examples and evidence.','A claim needs support.'],
  ['What is the best first step in final editing?','check that every part of the task has been answered',['replace every short word with a long word','check that every part of the task has been answered','remove all punctuation','add unrelated details'],'Task completion matters before surface-level correction.','First confirm that the writing actually answers the question.']
 ]],
 ['literature','Literature','Interpret prose, poetry, drama and traditional narratives using textual evidence',[
  ['What is a theme in a literary work?','a central idea explored by the work',['the title only','a central idea explored by the work','the first sentence','the name of the author'],'A theme is a broad idea explored through events, characters or images.','Do not confuse one event with the larger idea it develops.'],
  ['Which evidence best supports a claim that a character is courageous?','the character acts despite serious danger',['the character has a long name','the character acts despite serious danger','the story is set in a village','the character appears in chapter one'],'Character claims should be supported by actions, choices or speech.','Use what the character does.'],
  ['In poetry, why is naming a metaphor not enough?','you should also explain what meaning or effect it creates',['metaphors are never important','you should also explain what meaning or effect it creates','every metaphor rhymes','a metaphor is a punctuation mark'],'Literary technique matters because of what it contributes to meaning.','Connect the device to its effect.'],
  ['What is a stage direction in drama?','an instruction about action, movement or delivery',['a chapter title','an instruction about action, movement or delivery','a list of rhyming words','a summary written by the audience'],'Stage directions guide performance and can reveal tone/action beyond dialogue.','Think about instructions for actors.'],
  ['A supported moral or lesson from a folktale should come mainly from ___.','the choices and consequences shown in the story',['a random proverb added later','the choices and consequences shown in the story','the length of the title','the number of characters'],'The story’s events and consequences support its lesson.','Look at what the narrative demonstrates.']
 ]]
];
for(const [slug,tp,objective,items] of beceExtraBank){let n=1;for(const [pr,an,op,ex,hi] of items)await reviewedExamQ(beceExtra[slug].id,'BECE',tp,n++,pr,an,op,objective,ex,hi)}

const nceeExtraDefs=[
 ['ncee-ratio','Ratio & Proportion','ncee-ratio','Simple ratio and sharing'],
 ['ncee-eng-oral','Oral English','ncee-eng-oral','Speech sounds, syllables and stress'],
 ['ncee-eng-writing','Writing & Usage','ncee-eng-writing','Sentence and paragraph writing']
];
const nceeExtra={};
for(let j=0;j<nceeExtraDefs.length;j++){const [slug,name,ss,desc]=nceeExtraDefs[j];const sid=slug.startsWith('ncee-eng-')?english.id:math.id;const t=await topic(sid,slug,name,'Primary 6',50+j);nceeExtra[slug]=await skill(t.id,ss,name,desc)}
const nceeExtraBank=[
 ['ncee-ratio','NCEE','Ratio & Proportion','Compare and share quantities using simple ratios',[
  ['Simplify the ratio 6 : 9.','2 : 3',['1 : 3','2 : 3','3 : 2','6 : 3'],'Divide both parts by their common factor 3.','Both parts must be divided by the same factor.'],
  ['Share 30 sweets in the ratio 2 : 3. What is the larger share?','18',['6','12','18','20'],'There are 5 total parts; each part is 6, so the larger share is 3 × 6 = 18.','Add the ratio parts first.'],
  ['Which ratio is equivalent to 3 : 4?','6 : 8',['3 : 8','6 : 8','4 : 3','9 : 8'],'Multiplying both parts by 2 gives 6 : 8.','Scale both parts by the same number.'],
  ['A class has 12 boys and 18 girls. What is the ratio of boys to girls in simplest form?','2 : 3',['2 : 3','3 : 2','12 : 6','18 : 12'],'12 : 18 simplifies by dividing both parts by 6.','Write the quantities in the order asked, then simplify.'],
  ['If 2 pencils cost ₦100 at the same rate, what will 6 pencils cost?','₦300',['₦150','₦200','₦300','₦600'],'Six pencils are three times as many as two pencils, so the cost is also three times as much.','Find the scale factor from 2 to 6.']
 ]],
 ['ncee-eng-oral','NCEE','Oral English','Build Primary 6 sound, syllable and stress awareness',[
  ['How many syllables are in the word “teacher”?','2',['1','2','3','4'],'Teacher is commonly pronounced in two syllable beats.','Say it slowly and tap the beats.'],
  ['Which statement is true about letters and sounds?','A letter may represent different sounds in different words',['Every letter always has one sound','A letter may represent different sounds in different words','Every sound uses one letter only','Spelling and speech are always identical'],'English spelling does not map perfectly one-to-one to sound.','Think of familiar words where the same letter sounds different.'],
  ['What does stress in a word mean?','one syllable is made more prominent',['all syllables are whispered','one syllable is made more prominent','the word is written in capitals','the word has many letters'],'Stress is the strongest/prominent syllable beat.','Listen for the strongest beat.'],
  ['Which pair begins with different consonant sounds?','fan / van',['fan / van','go / game','sit / sun','map / man'],'Fan begins with /f/ while van begins with /v/.','Listen to the first sound.'],
  ['Why is listening important in oral English?','because spelling alone may not show the exact sound',['because letters are never useful','because spelling alone may not show the exact sound','because every word rhymes','because speaking has no meaning'],'The learner must hear sound contrasts that spelling may hide.','Compare what you see with what you hear.']
 ]],
 ['ncee-eng-writing','NCEE','Writing & Usage','Write complete, organised and correctly edited Primary 6 English',[
  ['Which group of words is a complete sentence?','The pupils returned to class.',['Because the rain','The pupils returned to class.','When the bell','After the match'],'A complete sentence expresses a complete thought with suitable structure.','Look for a complete idea, not only a phrase.'],
  ['What should one paragraph mainly develop?','one central idea',['many unrelated topics','one central idea','only difficult words','a list with no explanation'],'Paragraph unity comes from developing one main idea.','Ask what the paragraph is mainly about.'],
  ['Before writing, a simple plan helps a student to ___.','organise ideas in a sensible order',['avoid all punctuation','organise ideas in a sensible order','make every sentence longer','repeat the same point'],'Planning improves relevance and order.','Think about what happens before drafting.'],
  ['Which should be checked during editing?','spelling, punctuation and verb agreement',['only handwriting colour','spelling, punctuation and verb agreement','only the first word','only the number of lines'],'Editing checks both meaning and language accuracy.','Review several types of error, not one.'],
  ['Which sentence is best for formal school writing?','I would like to request permission to use the hall.',['I wanna use the hall pls.','I would like to request permission to use the hall.','Gimme the hall now.','Hall stuff is cool.'],'Formal school writing uses respectful, standard language.','Match the tone to an official audience.']
 ]]
];
for(const [slug,exam,tp,objective,items] of nceeExtraBank){let n=1;for(const [pr,an,op,ex,hi] of items)await reviewedExamQ(nceeExtra[slug].id,exam,tp,n++,pr,an,op,objective,ex,hi)}

await sql`UPDATE questions SET quality_status='REVIEWED',content_origin=COALESCE(content_origin,'AVORA_ORIGINAL') WHERE source_type='AVORA_ORIGINAL' AND exam_name IN ('BECE','NCEE')`;

await sql.end();console.log('Seeded AVORA V7.20.7 assessment + complete Tutor topic maps for Mathematics and English.');
