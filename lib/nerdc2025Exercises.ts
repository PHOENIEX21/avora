import bankJson from '@/data/jss1-jss2-assessment-bank.json';
import {revised2025CurrentTopics} from './revised2025Curriculum';
import {evidenceIdsForOfficialTopic} from './nerdc2025TopicMap';
import {nerdc2025EvidenceForTopic} from './nerdc2025Teaching';
import {officialNerdc2025Topic,officialNerdc2025Topics} from './nerdc2025Official';
import {authoredNerdc2025EnglishQuestions} from './nerdc2025AuthoredEnglishExercises';
import {jss1OralComprehensionQuestions} from './jss1EnglishOralComprehensionExercises';
import {jss1ConversationQuestions} from './jss1EnglishConversationExercises';
import {jss1SpeechQuestions} from './jss1EnglishSpeechSoundsExercises';
import {jss1FluencyQuestions} from './jss1EnglishReadingFluencyExercises';
import {jss1MeaningQuestions} from './jss1EnglishReadingForMeaningExercises';
import {jss1ThreeLevelQuestions} from './jss1EnglishThreeLevelComprehensionExercises';
import {jss1SummaryQuestions} from './jss1EnglishSummaryExercises';
import {jss1NVAQuestions} from './jss1EnglishNounsVerbsAdjectivesExercises';
import {jss1ACPIQuestions} from './jss1EnglishAdverbsConjunctionsPrepositionsInterjectionsExercises';
import {jss1SVAQuestions} from './jss1EnglishSubjectVerbAgreementExercises';
import {jss1WordFormationQuestions} from './jss1EnglishWordFormationExercises';
import {jss1LetterQuestions} from './jss1EnglishLetterWritingExercises';
import {jss1CreativeWritingQuestions} from './jss1EnglishCreativeWritingExercises';
import {jss1IntroductionLiteratureQuestions} from './jss1EnglishIntroductionLiteratureExercises';
import {jss1FolktaleQuestions} from './jss1EnglishFolktalesExercises';
import {jss1MythsLegendsQuestions} from './jss1EnglishMythsLegendsExercises';
import {jss1ProseFictionQuestions} from './jss1EnglishProseFictionExercises';
import {wholeNumbersAuthoredQuestions} from './wholeNumbersAuthored';
import {jss2PremiumMathQuestions} from './jss2PremiumMathExercises';

export type NerdcExerciseQuestion={
 id:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';topic:string;
 prompt:string;type:'MULTIPLE_CHOICE';options:string[];correctAnswer:string;explanation:string;hint:string;
 difficulty:number;skill:string;source:'AVORA_REVIEWED_BANK'|'AVORA_AUTHORED_NERDC_BANK'|'NERDC_DEEP_LESSON_CONCEPT_CHECK';
};
export type PublicNerdcExerciseQuestion=Omit<NerdcExerciseQuestion,'correctAnswer'>;

type BankQuestion={id:string;curriculumTopicId:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';topic:string;prompt:string;questionType:string;options:string[];correctAnswer:string;explanation:string;difficulty:number;qualityStatus:string};
const bank=(bankJson.questions as BankQuestion[]).filter(q=>q.qualityStatus==='REVIEWED'&&q.questionType==='MULTIPLE_CHOICE'&&Array.isArray(q.options)&&q.options.length===4);

function norm(text:string){return String(text||'').replace(/\s+/g,' ').trim().replace(/[.;]+$/,'')}
function cap(text:string){const v=norm(text);return v?`${v[0].toUpperCase()}${v.slice(1)}`:v}
function rotate<T>(items:T[],offset:number){if(!items.length)return items;const n=((offset%items.length)+items.length)%items.length;return [...items.slice(n),...items.slice(0,n)]}
function stableHash(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

function compatibleBankQuestions(classLevel:'JSS1'|'JSS2',subject:'Mathematics'|'English Language',topic:string){
 const evidence=new Set(evidenceIdsForOfficialTopic(classLevel,subject,topic));
 const oldIds=new Set(revised2025CurrentTopics.filter(t=>t.classLevel===classLevel&&t.subject===subject&&t.evidenceLessonIds.some(id=>evidence.has(id))).map(t=>t.id));
 return bank.filter(q=>q.classLevel===classLevel&&q.subject===subject&&oldIds.has(q.curriculumTopicId));
}

function misconceptionOptions(values:string[],seed:number){
 const base=values.map(cap).filter(Boolean);const unique=[...new Set(base)];
 const fallback=[
  'Choose a shortcut from the appearance of the question without checking the governing rule',
  'Use the first familiar operation or language pattern even when the conditions do not match',
  'Accept the result without checking it against the original task or evidence',
 ];
 for(const item of fallback)if(unique.length<3&&!unique.includes(item))unique.push(item);
 return rotate(unique,seed).slice(0,3);
}

function conceptQuestions(classLevel:'JSS1'|'JSS2',subject:'Mathematics'|'English Language',topic:string,count:number):NerdcExerciseQuestion[]{
 const evidence=nerdc2025EvidenceForTopic(classLevel,subject,topic);
 const official=officialNerdc2025Topic(classLevel,subject,topic);
 if(!official||!evidence.length||count<=0)return [];
 const facts=evidence.flatMap(x=>x.teaching).map(norm).filter(x=>x.length>=24);
 const examples=evidence.flatMap(x=>x.workedExamples).map(norm).filter(x=>x.length>=18);
 const misconceptions=evidence.flatMap(x=>x.misconceptions).map(norm).filter(Boolean);
 const objectives=official.objectives.map(norm).filter(Boolean);
 const seeds=[...facts,...objectives.map(x=>`A learner should be able to ${x.replace(/^to\s+/i,'')}`),...examples.map(x=>`This worked example is valid evidence for the topic: ${x}`)];
 const out:NerdcExerciseQuestion[]=[];
 for(let i=0;i<count;i++){
  const correct=cap(seeds[i%seeds.length]||facts[0]||objectives[0]);
  const wrong=misconceptionOptions(misconceptions,i);
  let options=[correct,...wrong];
  const offset=stableHash(`${classLevel}|${subject}|${topic}|${i}`)%4; options=rotate(options,offset);
  const kind=i%3;
  const prompt=kind===0?`Concept check ${i+1}: Which statement most accurately reflects the correct idea or method for ${topic}?`:kind===1?`Reasoning check ${i+1}: A learner is reviewing ${topic}. Which statement should the learner rely on?`:`Misconception check ${i+1}: Which statement is consistent with the NERDC-aligned teaching of ${topic}?`;
  out.push({
   id:`nerdc25-${classLevel.toLowerCase()}-${subject==='Mathematics'?'math':'eng'}-${stableHash(topic).toString(36)}-${String(i+1).padStart(2,'0')}`,
   classLevel,subject,topic,prompt,type:'MULTIPLE_CHOICE',options,correctAnswer:correct,
   explanation:`${correct}. This is part of the verified teaching evidence used for the official NERDC topic “${topic}”.`,
   hint:subject==='Mathematics'?'Check the definition, relationship or rule before choosing; do not select an operation merely because it looks familiar.':'Check the exact language function, evidence or rule the lesson established; avoid choosing by a single familiar word.',
   difficulty:i<3?1:i<7?2:3,skill:topic,source:'NERDC_DEEP_LESSON_CONCEPT_CHECK'
  });
 }
 return out;
}

const factorsAndMultiplesFoundationQuestions:NerdcExerciseQuestion[]=[
 {id:'jss1-math-lcm-foundation-01',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which statement correctly describes a factor of a whole number?',type:'MULTIPLE_CHOICE',options:['It divides the number exactly with no remainder','It must be greater than the number','It is found only by addition','It always leaves a remainder'],correctAnswer:'It divides the number exactly with no remainder',explanation:'A factor divides a number exactly. If a remainder is left, that divisor is not a factor.',hint:'Use the exact-division test.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-02',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which of these is NOT a factor of 24?',type:'MULTIPLE_CHOICE',options:['3','4','5','6'],correctAnswer:'5',explanation:'24 ÷ 5 is not a whole number, so 5 is not a factor of 24.',hint:'Divide 24 by each option and look for a remainder.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-03',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which list contains all the positive factors of 18?',type:'MULTIPLE_CHOICE',options:['1, 2, 3, 6, 9, 18','1, 2, 3, 6, 18','2, 3, 6, 9','1, 3, 6, 9, 18'],correctAnswer:'1, 2, 3, 6, 9, 18',explanation:'The factor pairs of 18 are 1×18, 2×9 and 3×6, giving 1, 2, 3, 6, 9 and 18.',hint:'Build factor pairs from 1 upward.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-04',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'When finding factors in pairs from 1 upward, when can you stop testing new divisors?',type:'MULTIPLE_CHOICE',options:['When the two sides of the factor pairs meet or would cross','Immediately after finding 1','Only after testing the number itself','As soon as one divisor leaves a remainder'],correctAnswer:'When the two sides of the factor pairs meet or would cross',explanation:'After the pair values meet or cross, later exact divisions only repeat factor pairs already found in reverse.',hint:'Think about what happens after the pair 6×6 for 36.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-05',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which list shows the first five positive multiples of 7?',type:'MULTIPLE_CHOICE',options:['7, 14, 21, 28, 35','1, 7, 14, 21, 28','7, 8, 9, 10, 11','7, 21, 35, 49, 63'],correctAnswer:'7, 14, 21, 28, 35',explanation:'Positive multiples of 7 are 7×1, 7×2, 7×3, 7×4, 7×5 and so on.',hint:'Multiply 7 by 1, 2, 3, 4 and 5.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-06',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Because 8 × 5 = 40, which statement is correct?',type:'MULTIPLE_CHOICE',options:['8 is a factor of 40 and 40 is a multiple of 8','40 is a factor of 8 and 8 is a multiple of 40','8 and 40 are both factors of 5','40 is not related to 8 by factors or multiples'],correctAnswer:'8 is a factor of 40 and 40 is a multiple of 8',explanation:'If a×b=c, then a and b are factors of c, while c is a multiple of each factor.',hint:'Ask which number divides the other exactly.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-07',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'What are the common factors of 12 and 18?',type:'MULTIPLE_CHOICE',options:['1, 2, 3, 6','1, 2, 6, 12','2, 3, 6, 9','1, 3, 9, 18'],correctAnswer:'1, 2, 3, 6',explanation:'The factors shared by both 12 and 18 are 1, 2, 3 and 6.',hint:'Write both complete factor lists, then keep only shared values.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-08',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Which number is a common multiple of both 4 and 6?',type:'MULTIPLE_CHOICE',options:['12','8','18','20'],correctAnswer:'12',explanation:'12 appears in both multiple lists: 4×3=12 and 6×2=12.',hint:'Check whether each number can be divided exactly by both 4 and 6.',difficulty:1,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-09',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'A teacher has 30 counters. Which group size will NOT divide all 30 counters into equal groups with none left over?',type:'MULTIPLE_CHOICE',options:['4','2','5','6'],correctAnswer:'4',explanation:'30 ÷ 4 leaves a remainder, while 2, 5 and 6 are factors of 30.',hint:'Use exact division; any remainder means the group size is not a factor.',difficulty:2,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-lcm-foundation-10',classLevel:'JSS1',subject:'Mathematics',topic:'Lowest Common Multiple (LCM)',prompt:'Two lights flash every 3 seconds and every 4 seconds. Which sequence shows their first three positive common flash times?',type:'MULTIPLE_CHOICE',options:['12, 24, 36 seconds','3, 4, 7 seconds','6, 12, 18 seconds','4, 8, 12 seconds'],correctAnswer:'12, 24, 36 seconds',explanation:'Common multiples of 3 and 4 begin at 12 and continue 24, 36, and so on. This prepares the idea of LCM.',hint:'List multiples of 3 and 4 and identify values appearing in both lists.',difficulty:3,skill:'Factors and Multiples Foundation',source:'AVORA_AUTHORED_NERDC_BANK'}
];

const countingInBaseTwoQuestions:NerdcExerciseQuestion[]=[
 {id:'jss1-math-base2-01',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which digits are used in the base-two (binary) number system?',type:'MULTIPLE_CHOICE',options:['0 and 1','1 and 2','0, 1 and 2','0 to 9'],correctAnswer:'0 and 1',explanation:'Base two has exactly two digits: 0 and 1.',hint:'The number of available digits matches the base.',difficulty:1,skill:'Meaning and digits of base two',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-02',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which list shows the first binary place values from right to left?',type:'MULTIPLE_CHOICE',options:['1, 2, 4, 8','1, 10, 100, 1000','1, 2, 3, 4','2, 4, 6, 8'],correctAnswer:'1, 2, 4, 8',explanation:'Binary place values are powers of 2: 1, 2, 4, 8, 16 and so on.',hint:'Each place is twice the place immediately to its right.',difficulty:1,skill:'Binary place value',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-03',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What comes immediately after 1₂ when counting in base two?',type:'MULTIPLE_CHOICE',options:['10₂','2₂','11₂','100₂'],correctAnswer:'10₂',explanation:'Binary has no digit 2. Two units regroup as one group of two and zero units, written 10₂.',hint:'Regroup two units into the next binary place.',difficulty:1,skill:'Counting in base two',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-04',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What comes immediately after 11₂ when counting in base two?',type:'MULTIPLE_CHOICE',options:['100₂','12₂','20₂','101₂'],correctAnswer:'100₂',explanation:'Adding one to 11₂ causes regrouping: two units make one two, then two twos make one four, giving 100₂.',hint:'A binary place cannot contain the digit 2.',difficulty:2,skill:'Binary regrouping',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-05',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which of these is NOT a valid binary numeral?',type:'MULTIPLE_CHOICE',options:['102₂','101₂','111₂','1000₂'],correctAnswer:'102₂',explanation:'A binary numeral may contain only the digits 0 and 1, so 102₂ is invalid.',hint:'Inspect every digit.',difficulty:1,skill:'Valid binary numerals',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-06',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What ordinary quantity is represented by 101₂?',type:'MULTIPLE_CHOICE',options:['5','4','6','101'],correctAnswer:'5',explanation:'101₂ has one 4, zero 2s and one unit: 4+1=5.',hint:'Use place values 4, 2, 1.',difficulty:2,skill:'Reading binary place value',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-07',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What ordinary quantity is represented by 110₂?',type:'MULTIPLE_CHOICE',options:['6','5','3','110'],correctAnswer:'6',explanation:'110₂ means one 4, one 2 and zero units: 4+2=6.',hint:'Read the digits against 4, 2, 1.',difficulty:2,skill:'Reading binary place value',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-08',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What is the main job of the 0 in 101₂?',type:'MULTIPLE_CHOICE',options:['It shows that there are no twos and keeps the other digits in their correct places','It changes the number to base ten','It means the numeral has no value','It tells us to multiply by 10'],correctAnswer:'It shows that there are no twos and keeps the other digits in their correct places',explanation:'Zero is a placeholder. In 101₂ it records zero groups of 2 while preserving the 4-place and 1-place.',hint:'Think about the middle place value.',difficulty:2,skill:'Zero as a binary placeholder',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-09',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which sequence counts correctly forward in base two?',type:'MULTIPLE_CHOICE',options:['1₂, 10₂, 11₂, 100₂, 101₂','1₂, 2₂, 3₂, 4₂, 5₂','1₂, 10₂, 20₂, 30₂, 40₂','0₂, 1₂, 10₂, 12₂, 100₂'],correctAnswer:'1₂, 10₂, 11₂, 100₂, 101₂',explanation:'Binary counting uses only 0 and 1 and regroups whenever two collect in one place.',hint:'Reject any sequence containing a digit other than 0 or 1.',difficulty:2,skill:'Counting sequence',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-10',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'What comes immediately after 111₂?',type:'MULTIPLE_CHOICE',options:['1000₂','112₂','100₂','1110₂'],correctAnswer:'1000₂',explanation:'111₂ represents 4+2+1=7. Adding one causes regrouping through all three occupied places, producing one 8: 1000₂.',hint:'Add one and regroup every pair.',difficulty:2,skill:'Binary regrouping',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-11',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'A learner says 1000₂ means one thousand. What is the best correction?',type:'MULTIPLE_CHOICE',options:['1000₂ means one 8 and no 4s, 2s or units','The learner is correct because it has four digits','1000₂ means one hundred','1000₂ has no value because it contains zeros'],correctAnswer:'1000₂ means one 8 and no 4s, 2s or units',explanation:'The subscript 2 tells us to use binary place values 8, 4, 2 and 1, so 1000₂ represents 8.',hint:'The appearance of the digits does not determine the base.',difficulty:3,skill:'Reasoning about number bases',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-12',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Thirteen counters are grouped into binary place-value groups. Which description matches 1101₂?',type:'MULTIPLE_CHOICE',options:['One 8, one 4, zero 2s and one unit','One 8, one 4, one 2 and zero units','One 4, one 2 and one unit','Eleven tens and one unit'],correctAnswer:'One 8, one 4, zero 2s and one unit',explanation:'1101₂ uses place values 8,4,2,1: 8+4+0+1=13.',hint:'Match each digit to 8, 4, 2, 1.',difficulty:3,skill:'Grouping in twos',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-13',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Why does moving a binary 1 one place to the left double its place value?',type:'MULTIPLE_CHOICE',options:['Each binary place is twice the value of the place to its right','Binary numbers are always even','A zero automatically adds 10','The digit 1 changes its value to 2'],correctAnswer:'Each binary place is twice the value of the place to its right',explanation:'Binary place values are successive powers of 2, so 1, 2, 4, 8, 16... each doubles the previous place.',hint:'Look at the pattern 1, 2, 4, 8.',difficulty:3,skill:'Binary place-value reasoning',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-14',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'Which statement best explains why the digit 2 never appears in a binary numeral?',type:'MULTIPLE_CHOICE',options:['Two units in any place are regrouped as one unit in the next place','The number 2 does not exist in mathematics','Binary skips every even number','Only odd quantities can be written in binary'],correctAnswer:'Two units in any place are regrouped as one unit in the next place',explanation:'Base two permits 0 or 1 in a place. When two units accumulate, they are exchanged for one unit of the next place.',hint:'Think about why 1₂ is followed by 10₂.',difficulty:3,skill:'Meaning of base two',source:'AVORA_AUTHORED_NERDC_BANK'},
 {id:'jss1-math-base2-15',classLevel:'JSS1',subject:'Mathematics',topic:'Counting in Base Two',prompt:'A learner writes the count as 101₂, 110₂, 111₂, 1000₂. Is this part of the binary counting sequence correct?',type:'MULTIPLE_CHOICE',options:['Yes, it represents consecutive quantities 5, 6, 7 and 8','No, 110₂ must come before 101₂','No, 111₂ is not a binary numeral','No, 1000₂ must come immediately after 101₂'],correctAnswer:'Yes, it represents consecutive quantities 5, 6, 7 and 8',explanation:'101₂=5, 110₂=6, 111₂=7 and 1000₂=8, so the sequence is correct.',hint:'Use 4,2,1 and then 8,4,2,1 to check the values.',difficulty:3,skill:'Binary counting mastery',source:'AVORA_AUTHORED_NERDC_BANK'}
];



type AuthoredMathSpec=[string,string,string[],string,string,number];
const Q=(topic:string,prefix:string,rows:AuthoredMathSpec[]):NerdcExerciseQuestion[]=>rows.map(([n,prompt,options,correctAnswer,explanation,difficulty])=>({id:`jss1-math-${prefix}-${n}`,classLevel:'JSS1',subject:'Mathematics',topic,prompt,type:'MULTIPLE_CHOICE',options,correctAnswer,explanation,hint:'Use the exact rule taught in the lesson and show the reasoning before choosing.',difficulty,skill:topic,source:'AVORA_AUTHORED_NERDC_BANK'}));

const hcfAuthored=Q('Highest Common Factor (HCF)','hcf',[
['01','Which statement correctly describes a factor of a whole number?',['A whole number that divides it exactly with no remainder','A number that must be larger than it','Any decimal less than it','A number that always leaves a remainder'],'A whole number that divides it exactly with no remainder','A factor passes the exact-division test.',1],
['02','Which list contains all the positive factors of 28?',['1, 2, 4, 7, 14, 28','1, 2, 4, 7, 28','2, 4, 7, 14','1, 3, 4, 7, 14, 28'],'1, 2, 4, 7, 14, 28','The factor pairs are 1×28, 2×14 and 4×7.',1],
['03','What are the common factors of 12 and 18?',['1, 2, 3, 6','1, 2, 6, 12','2, 3, 6, 9','1, 3, 9, 18'],'1, 2, 3, 6','A common factor must divide both numbers exactly.',1],
['04','What is the HCF of 12 and 18?',['6','3','12','36'],'6','The common factors are 1, 2, 3 and 6; the highest is 6.',1],
['05','What is the HCF of 20 and 30?',['10','5','20','60'],'10','The common factors include 1, 2, 5 and 10; the greatest is 10.',2],
['06','Given 36=2²×3² and 48=2⁴×3, what is their HCF?',['12','24','72','144'],'12','Use only shared primes at their lower powers: 2²×3=12.',2],
['07','Why does the prime-factor method for HCF use the lower shared power?',['The HCF must divide every original number exactly','The HCF must be larger than both numbers','Higher powers are never prime','The rule is only a shortcut with no reason'],'The HCF must divide every original number exactly','A common factor cannot contain more copies of a prime than any original number contains.',2],
['08','Find the HCF of 24, 36 and 60.',['12','6','24','120'],'12','24=2³×3, 36=2²×3², 60=2²×3×5. Shared lower powers are 2²×3=12.',2],
['09','What is the HCF of 9 and 16?',['1','3','4','144'],'1','Their only common positive factor is 1, so they are co-prime.',2],
['10','Which statement correctly distinguishes HCF from LCM?',['HCF uses greatest shared factor; LCM uses least shared positive multiple','HCF and LCM are always equal','HCF uses the highest prime powers from every number','LCM divides every original number'],'HCF uses greatest shared factor; LCM uses least shared positive multiple','HCF is about common divisors; LCM is about common multiples.',2],
['11','A trader has 24 oranges and 36 mangoes and wants the greatest possible number of identical baskets using everything. How many baskets?',['12','6','24','36'],'12','This is an equal-grouping HCF problem. HCF(24,36)=12.',2],
['12','In the 12 baskets from the previous problem, what goes in each basket?',['2 oranges and 3 mangoes','12 oranges and 12 mangoes','3 oranges and 2 mangoes','24 oranges and 36 mangoes'],'2 oranges and 3 mangoes','24÷12=2 oranges and 36÷12=3 mangoes per basket.',2],
['13','Simplify 36/48 completely using HCF.',['3/4','6/8','12/16','18/24'],'3/4','HCF(36,48)=12; 36÷12=3 and 48÷12=4.',2],
['14','Which situation most directly calls for HCF?',['Cutting 18 m and 24 m ropes into the greatest equal lengths with none left','Finding when two bells ringing every 6 and 8 minutes next ring together','Listing multiples of 7','Converting a fraction to a decimal'],'Cutting 18 m and 24 m ropes into the greatest equal lengths with none left','Dividing fixed quantities into greatest equal pieces with no remainder signals HCF.',3],
['15','A learner says HCF(24,36)=72. Which check proves the answer is impossible immediately?',['An HCF cannot be greater than the smallest original number','An HCF must always be even','72 is not a whole number','Every HCF must equal the LCM'],'An HCF cannot be greater than the smallest original number','The HCF must divide 24, so it cannot exceed 24.',3]
]);

const estimationAuthored=Q('Estimation','estimation',[
['01','Which statement best describes estimation?',['Finding a reasonable approximate value without exact measurement','Always measuring exactly','Changing every number to zero','Guessing without evidence'],'Finding a reasonable approximate value without exact measurement','Estimation is a reasoned approximation supported by a reference, comparison or experience.',1],
['02','Which is an appropriate unit for estimating the length of a classroom?',['metres','milligrams','litres','seconds'],'metres','Classroom length is a distance on the scale of metres.',1],
['03','A door is about 2 m high. Which estimate for a similar door is most reasonable?',['1.9 m','19 m','190 m','2 km'],'1.9 m','A known 2 m reference makes 1.9 m plausible.',1],
['04','Which action makes an estimate stronger?',['Compare with a familiar known reference','Choose the largest number','Ignore units','Use an unrelated object'],'Compare with a familiar known reference','A reference gives evidence for the approximate value.',2],
['05','Which is an estimate rather than a measurement?',['The table is about 1.5 m long','A tape reads exactly 1.47 m','The scale reads 3.20 kg','A clock shows 8:15'],'The table is about 1.5 m long','“About” from comparison without exact measurement is estimation.',1],
['06','Which unit is most suitable for estimating the capacity of a bucket?',['litres','kilometres','kilograms','minutes'],'litres','Capacity is commonly expressed in litres.',1],
['07','Which unit is most suitable for estimating the mass of a bag of rice?',['kilograms','metres','litres','hours'],'kilograms','Mass of a bag of rice is appropriately estimated in kilograms.',1],
['08','A 1 m ruler appears to fit along a bench about 2.5 times. What is a reasonable estimated length?',['2.5 m','25 m','0.25 m','250 m'],'2.5 m','1 m × about 2.5 gives about 2.5 m.',2],
['09','Why should an estimate include a unit?',['The number alone does not state what quantity scale is meant','Units make every answer exact','Units are only decoration','Only teachers need units'],'The number alone does not state what quantity scale is meant','The unit gives meaning and scale to the estimated number.',2],
['10','Which estimate is most reasonable for walking across a classroom?',['A few metres','A few kilometres','A few millimetres','Hundreds of kilometres'],'A few metres','A classroom is normally measured on the scale of metres.',2],
['11','An estimate is very different from a known reference. What should you do?',['Recheck the comparison and unit','Accept it automatically','Remove the unit','Multiply it by 100'],'Recheck the comparison and unit','Reasonableness checking is part of estimation.',2],
['12','Which is the best sequence?',['Identify quantity, choose unit, choose reference, compare, calculate if needed, check reasonableness','Guess, remove unit, stop','Measure exactly, then call it an estimate','Choose any number, then choose a reference'],'Identify quantity, choose unit, choose reference, compare, calculate if needed, check reasonableness','This is the taught evidence-based estimation method.',3],
['13','A 500 mL bottle fills a container about four times. Estimate the capacity.',['2 L','20 L','200 L','0.2 L'],'2 L','4×500 mL=2000 mL=2 L.',3],
['14','Which statement is correct?',['An estimate can be useful even when an exact value is unnecessary','Every estimate must equal the exact measurement','Estimation has no role in checking calculations','A reasonable estimate needs no context'],'An estimate can be useful even when an exact value is unnecessary','Estimation supports quick decisions and reasonableness checks.',2],
['15','A learner estimates a pencil as 2 km long. What is the main problem?',['The value and unit are unreasonable for the object','The number is even','Kilometres cannot measure length','All estimates must be below 1'],'The value and unit are unreasonable for the object','A pencil requires a much smaller length scale.',3]
]);

const approximationAuthored=Q('Approximation','approximation',[
['01','What does approximation do?',['Replaces a known value with a nearby simpler value at a stated accuracy','Measures an unknown object without tools','Always makes a number larger','Removes every decimal digit'],'Replaces a known value with a nearby simpler value at a stated accuracy','Approximation begins with a known value and rounds it to a specified accuracy.',1],
['02','43 rounded to the nearest 10 is',['40','50','43','30'],'40','43 is 3 from 40 and 7 from 50, so it is nearer 40.',1],
['03','48 rounded to the nearest 10 is',['50','40','48','60'],'50','48 is nearer 50 than 40.',1],
['04','45 rounded to the nearest 10 using the school convention is',['50','40','45','55'],'50','45 is halfway; a deciding digit of 5 rounds upward.',1],
['05','4582 rounded to the nearest 100 is',['4600','4500','4580','5000'],'4600','The hundreds digit is 5 and the tens deciding digit is 8, so the hundreds digit increases.',2],
['06','7483 rounded to the nearest 1000 is',['7000','8000','7480','7500'],'7000','The thousands digit is 7 and the hundreds deciding digit is 4, so keep 7.',2],
['07','Which symbol correctly shows an approximate equality?',['≈','=','≠','>'],'≈','The symbol ≈ means approximately equal.',1],
['08','Why is 487≈500 acceptable to the nearest hundred?',['487 is closer to 500 than to 400','487 equals 500 exactly','87 is ignored without a rule','All numbers round to 500'],'487 is closer to 500 than to 400','Nearest rounding is based on distance to neighbouring multiples.',2],
['09','3.46 rounded to 1 decimal place is',['3.5','3.4','3.46','4.0'],'3.5','The tenths digit is 4 and the hundredths deciding digit is 6, so increase 4 to 5.',2],
['10','7.432 rounded to 2 decimal places is',['7.43','7.44','7.4','7.4320'],'7.43','The hundredths digit is 3 and the next digit is 2, so it stays 3.',2],
['11','Estimate 49+31 by rounding each to the nearest ten.',['80','70','90','100'],'80','49≈50 and 31≈30, so 50+30=80.',2],
['12','Estimate 198×5 by rounding 198 to the nearest hundred.',['1000','500','200','2000'],'1000','198≈200, then 200×5=1000.',2],
['13','Which step comes first when rounding?',['Identify the requested place value','Always add 1','Delete all digits','Look only at the first digit'],'Identify the requested place value','You must know the required accuracy before choosing the deciding digit.',2],
['14','When the deciding digit is 0–4, what happens to the rounding digit?',['It stays the same','It always increases','It becomes zero','It doubles'],'It stays the same','The standard rule keeps the rounding digit when the next digit is 0–4.',2],
['15','Which statement correctly distinguishes estimation from approximation?',['Estimation can judge an unknown quantity; approximation rounds a known value','They are always identical','Approximation never uses place value','Estimation must be exact'],'Estimation can judge an unknown quantity; approximation rounds a known value','This is the key conceptual distinction taught across the two topics.',3]
]);

const binaryAdditionAuthored=Q('Addition of numbers in base 2.','binary-add',[
['01','What is 1+1 in binary?',['10₂','2₂','11₂','1₂'],'10₂','Two units regroup as one unit in the 2¹ place and zero units in 2⁰.',1],
['02','What is 1+1+1 in binary?',['11₂','10₂','3₂','100₂'],'11₂','Three in base ten is 2+1, written 11₂.',2],
['03','Why are binary place values 1,2,4,8?',['They are 2⁰,2¹,2²,2³','They are multiples of 10','They are chosen randomly','They are decimal digits'],'They are 2⁰,2¹,2²,2³','Base-two positions are powers of two.',1],
['04','2³ equals',['8','6','4','16'],'8','2³=2×2×2=8.',1],
['05','1011₂ equals which base-ten value?',['11','9','13','7'],'11','(1×8)+(0×4)+(1×2)+(1×1)=11.',2],
['06','What is 10₂+1₂?',['11₂','10₂','100₂','1₂'],'11₂','2+1=3, represented as 11₂.',1],
['07','What is 11₂+1₂?',['100₂','10₂','101₂','12₂'],'100₂','3+1=4 and 4 is 100₂.',2],
['08','What is 101₂+10₂?',['111₂','110₂','100₂','1010₂'],'111₂','5+2=7, which is 111₂.',2],
['09','What is 110₂+11₂?',['1001₂','111₂','1010₂','1100₂'],'1001₂','6+3=9, and 9 is 1001₂.',2],
['10','A carry in binary occurs because',['two units of a place regroup into one unit of the next place','ten units are always needed','the digit 2 is written in the answer','the number is odd'],'two units of a place regroup into one unit of the next place','Base two regroups whenever two units collect in one place.',2],
['11','What is 111₂+1₂?',['1000₂','1111₂','110₂','1010₂'],'1000₂','7+1=8 and 8 is 1000₂.',2],
['12','What is 101₂+101₂?',['1010₂','111₂','1001₂','1100₂'],'1010₂','5+5=10; 10₁₀ is 1010₂.',3],
['13','Which is a valid way to verify a binary sum?',['Convert both addends and the result to base ten and compare','Check whether the result contains a 2','Remove all zeros','Reverse the digits'],'Convert both addends and the result to base ten and compare','Base-ten conversion independently checks the represented values.',2],
['14','In the 2² column, two units of value 4 regroup as',['one unit of value 8','one unit of value 4','two units of value 8','one unit of value 2'],'one unit of value 8','4+4=8, which is one unit in the next binary place.',3],
['15','What is 1011₂+110₂?',['10001₂','1111₂','10101₂','11001₂'],'10001₂','11+6=17; 17=16+1=10001₂.',3]
]);

const binarySubtractionAuthored=Q('Subtraction of numbers in base 2.','binary-sub',[
['01','What is 1₂−1₂?',['0₂','1₂','10₂','11₂'],'0₂','One minus one is zero.',1],
['02','What is 1₂−0₂?',['1₂','0₂','10₂','11₂'],'1₂','One minus zero remains one.',1],
['03','Why must 0−1 sometimes borrow in binary?',['There is not enough value in the current column','Binary allows negative digits in every answer','1 becomes 2 automatically','Subtraction is multiplication'],'There is not enough value in the current column','A higher-place unit must be regrouped into the current place.',2],
['04','Borrowing one 2¹ unit into the 2⁰ column gives how many 2⁰ units?',['2','1','10','4'],'2','2¹=2 and 2⁰=1, so one value-2 unit becomes two value-1 units.',2],
['05','What is 10₂−1₂?',['1₂','0₂','10₂','11₂'],'1₂','2−1=1.',1],
['06','What is 11₂−1₂?',['10₂','1₂','11₂','100₂'],'10₂','3−1=2, represented as 10₂.',1],
['07','What is 101₂−10₂?',['11₂','10₂','1₂','100₂'],'11₂','5−2=3, represented as 11₂.',2],
['08','What is 100₂−1₂?',['11₂','10₂','1₂','101₂'],'11₂','4−1=3; regrouping passes through the zero columns.',2],
['09','What is 110₂−11₂?',['11₂','10₂','101₂','1₂'],'11₂','6−3=3, represented as 11₂.',2],
['10','When borrowing through a zero, what should happen?',['Regroup one place at a time from the nearest higher place with value','Skip the zero without explanation','Write 2 as a binary digit','Change subtraction to addition'],'Regroup one place at a time from the nearest higher place with value','Each place-value exchange must be accounted for.',3],
['11','What is 1000₂−1₂?',['111₂','110₂','101₂','100₂'],'111₂','8−1=7, represented as 111₂.',2],
['12','What is 1010₂−11₂?',['111₂','101₂','110₂','1001₂'],'111₂','10−3=7, represented as 111₂.',3],
['13','How can subtraction be checked by inverse operation?',['Add the difference to the subtrahend and recover the minuend','Subtract the answer again','Multiply all digits','Reverse the minuend'],'Add the difference to the subtrahend and recover the minuend','Subtraction and addition are inverse operations.',2],
['14','Why does one 2³ unit become two 2² units when regrouped?',['8=2×4','8=4+4+4','3−2=1','Binary uses decimal ten'],'8=2×4','The value is conserved: one 8 equals two 4s.',3],
['15','What is 1111₂−101₂?',['1010₂','1001₂','1100₂','111₂'],'1010₂','15−5=10, represented as 1010₂.',3]
]);

const binaryMultiplicationAuthored=Q('Multiplication of numbers in base 2.','binary-mul',[
['01','What is 1×1 in binary?',['1','0','10','11'],'1','One group of one is one.',1],
['02','What is 1×0?',['0','1','10','11'],'0','Any quantity multiplied by zero is zero.',1],
['03','Why does multiplying a binary number by 10₂ shift occupied places one position left?',['10₂ equals 2, so every place value doubles','A zero is simply attached by magic','10₂ equals decimal ten','The digits reverse'],'10₂ equals 2, so every place value doubles','Multiplication by 2 moves each contribution to the next power of two.',2],
['04','What is 11₂×10₂?',['110₂','11₂','100₂','111₂'],'110₂','3×2=6, represented as 110₂.',2],
['05','What is 10₂×10₂?',['100₂','10₂','1000₂','11₂'],'100₂','2×2=4, represented as 100₂.',1],
['06','What is 101₂×10₂?',['1010₂','111₂','1001₂','110₂'],'1010₂','5×2=10, represented as 1010₂.',2],
['07','In vertical binary multiplication, why is the second partial product shifted left when multiplying by the 2¹ digit?',['That digit represents twice the unit place','All second rows are decorative','It represents one half','The first row is wrong'],'That digit represents twice the unit place','Position records the multiplier place value.',2],
['08','What is 101₂×11₂?',['1111₂','1010₂','1001₂','1101₂'],'1111₂','5×3=15, represented as 1111₂.',2],
['09','A zero digit inside the multiplier contributes',['a zero partial product','the same multiplicand','a carry of 1','an invalid row'],'a zero partial product','Zero groups contribute zero at that place.',2],
['10','What is 110₂×101₂?',['11110₂','11011₂','10110₂','10010₂'],'11110₂','6×5=30, and 30 is 11110₂.',3],
['11','When adding partial products, 1+1 equals',['10₂','2₂','1₂','11₂'],'10₂','Two units regroup into the next binary place.',2],
['12','What is 111₂×11₂?',['10101₂','11111₂','10001₂','11001₂'],'10101₂','7×3=21, represented as 10101₂.',3],
['13','What is 101₂×111₂?',['100011₂','11101₂','10111₂','110011₂'],'100011₂','5×7=35, represented as 100011₂.',3],
['14','Which verification is valid for 101₂×11₂=1111₂?',['5×3=15','5+3=15','101×11=1111 in decimal','15×3=5'],'5×3=15','Converting to base ten confirms the represented product.',2],
['15','Why should “just add a zero” not be the explanation for multiplying by 10₂?',['The real reason is a place-value shift caused by multiplying by 2','Zeros are forbidden in binary','It works only in base ten','10₂ equals zero'],'The real reason is a place-value shift caused by multiplying by 2','The rule must be grounded in powers and place value.',3]
]);

const symbolsAuthored=Q('Use of Symbols','symbols',[
['01','In algebra, a letter such as x usually represents',['a number that may be unknown or variable','a multiplication sign only','a unit of length only','the number zero always'],'a number that may be unknown or variable','A symbol can stand for an unknown or changing number.',1],
['02','Which is an equation?',['x+3=8','3x+5','7−2','4y'],'x+3=8','An equation states equality using an equals sign.',1],
['03','If □+5=12, what is □?',['7','17','5','12'],'7','Subtract 5 from both sides: □=7.',1],
['04','If 2x=10, what is x?',['5','8','12','20'],'5','Divide both sides by 2 to preserve equality.',1],
['05','Which operation undoes adding 6?',['subtracting 6','adding 6 again','multiplying by 6','dividing by 6'],'subtracting 6','Subtraction is the inverse of addition.',1],
['06','Which operation undoes multiplying by 4?',['dividing by 4','adding 4','subtracting 4','multiplying by 4 again'],'dividing by 4','Division is the inverse of multiplication.',1],
['07','Solve x−4=9.',['13','5','36','−13'],'13','Add 4 to both sides: x=13.',2],
['08','Solve x/3=5.',['15','8','2','5/3'],'15','Multiply both sides by 3: x=15.',2],
['09','Why must the same operation be performed on both sides of an equation?',['To preserve equality','To make x disappear by magic','Because every equation must get larger','To change the equals sign'],'To preserve equality','An equation behaves like a balance.',2],
['10','Which statement correctly translates “a number plus 7 is 15”?',['x+7=15','7x=15','x−7=15','x/7=15'],'x+7=15','The unknown number plus seven equals fifteen.',2],
['11','Solve 2x+3=11.',['4','7','14','3'],'4','Subtract 3 to get 2x=8, then divide by 2.',2],
['12','Which line correctly follows 3x−5=16?',['3x=21','3x=11','x−5=13','3x=80'],'3x=21','Add 5 to both sides: 3x=21.',2],
['13','If a symbol is replaced by its solution in the original equation, what should happen?',['Both sides should have equal values','The equals sign should disappear','The variable must become negative','The left side must be larger'],'Both sides should have equal values','Substitution into the original equation verifies the solution.',2],
['14','Which is the best reason for x=8−3 from x+3=8?',['3 was subtracted from both sides','3 moved across by itself','The sign changes whenever we want','8 must always be first'],'3 was subtracted from both sides','The balance operation is the reason behind the shorthand.',3],
['15','Solve 4x+2=18.',['4','5','8','16'],'4','Subtract 2 to get 4x=16, then divide by 4.',3]
]);

const simplifyAuthored=Q('Simplification of Algebraic Expressions','simplify',[
['01','In 5x+3, what is the coefficient of x?',['5','3','x','8'],'5','The coefficient is the numerical factor multiplying the variable.',1],
['02','What coefficient is understood in x?',['1','0','x','−1'],'1','x=1x because 1×x=x.',1],
['03','Which pair are like terms?',['3x and 5x','3x and 5y','3x and 5x²','3 and 5x'],'3x and 5x','Like terms have exactly the same variable part.',1],
['04','Simplify 3x+5x.',['8x','8x²','15x','8'],'8x','Add coefficients 3+5 and keep x.',1],
['05','Simplify 7x−3x.',['4x','4','10x','4x²'],'4x','(7−3)x=4x.',1],
['06','Can 3x+5y be combined into one like term?',['No','Yes, as 8x','Yes, as 8y','Yes, as 15xy'],'No','x-terms and y-terms have different variable parts.',2],
['07','Simplify 3x+4+2x+5.',['5x+9','5x+20','10x+9','5x²+9'],'5x+9','Combine x terms and constants separately.',2],
['08','Simplify 4x+3y+2x+5y.',['6x+8y','14xy','9x+5y','6x+5y'],'6x+8y','4x+2x=6x and 3y+5y=8y.',2],
['09','Simplify 5x−x.',['4x','5','6x','4'],'4x','x means 1x, so (5−1)x=4x.',2],
['10','What are the terms in 7x−2+3x−5?',['7x, −2, 3x, −5','7x, 2, 3x, 5','7, x, 2, 3, x, 5','10x, 7'],'7x, −2, 3x, −5','Each sign belongs to the term that follows it.',2],
['11','Expand 3(x+2).',['3x+6','3x+2','x+6','6x'],'3x+6','Distribute 3 to both x and 2.',2],
['12','Simplify 2(x+4)+3x.',['5x+8','5x+4','2x+12','6x+8'],'5x+8','Expand to 2x+8+3x, then combine like terms.',3],
['13','Simplify 6x−6x.',['0','x','6','12x'],'0','(6−6)x=0x=0.',2],
['14','Why can 5a and 3a² not be combined as like terms?',['a and a² are different variable parts','Their coefficients are odd','They both contain a','All powers can be ignored'],'a and a² are different variable parts','Like terms require the same variable raised to the same power.',3],
['15','Which substitution can check 3x+2x=5x?',['Choose any value such as x=4 and compare both sides','Replace x by another letter only','Delete x','Check coefficients without values'],'Choose any value such as x=4 and compare both sides','For x=4, both expressions equal 20.',3]
]);

const simplifyNewAuthored=Q('Simplification of Algebraic Expressions','simplify-new',[
['01','What is the coefficient of x in 7x?',['x','1','7','0'],'7','The coefficient is the numerical factor multiplying x.',1],
['02','What is the coefficient of y in −5y?',['5','−5','y','−y'],'−5','The sign belongs to the coefficient, so the coefficient is −5.',1],
['03','What coefficient is understood in m?',['0','m','1','−1'],'1','m=1m, so the hidden coefficient is 1.',1],
['04','Which pair contains like terms?',['3x and 3y','5a and −2a','4m and 4m²','2x and 2xy'],'5a and −2a','Like terms have exactly the same variable part.',1],
['05','Simplify 4x+7x.',['11x','11x²','28x','11'],'11x','Add the coefficients and keep the common variable x.',1],
['06','Simplify 9a−4a+2a.',['3a','7a','15a','7'],'7a','(9−4+2)a=7a.',2],
['07','Simplify 5x+3y+2x−y.',['7x+2y','10xy','7x+4y','9xy'],'7x+2y','Collect x-terms and y-terms separately.',2],
['08','Simplify 8m+5−3m+2.',['5m+7','11m+7','5m+3','12m'],'5m+7','8m−3m=5m and 5+2=7.',2],
['09','Simplify 6+(x+4).',['x+10','x+2','6x+4','10x'],'x+10','A positive sign before the bracket keeps the signs inside unchanged.',2],
['10','Simplify 8−(x+3).',['5−x','11−x','x+5','8−x+3'],'5−x','The minus changes both signs: 8−x−3=5−x.',2],
['11','Expand 3(x+5).',['3x+5','3x+15','8x','15x'],'3x+15','Distribute 3 to every term inside the bracket.',2],
['12','Simplify 4(2a−3).',['8a−3','6a−12','8a−12','8a+12'],'8a−12','4×2a=8a and 4×(−3)=−12.',2],
['13','Simplify (7x+4)−(2x+1).',['5x+3','9x+5','5x+5','9x+3'],'5x+3','The second bracket is subtracted: 7x+4−2x−1=5x+3.',3],
['14','Simplify 2(x+3)+3x.',['5x+3','5x+6','6x+6','5x'],'5x+6','Expand first: 2x+6+3x, then collect like terms.',3],
['15','A packet contains x+4 sweets. What is the simplified expression for three identical packets?',['x+12','3x+4','3x+12','7x'],'3x+12','Three packets give 3(x+4)=3x+12.',3]
]);
const simplifyCombinedAuthored=[...simplifyAuthored,...simplifyNewAuthored];

const equationsAuthored=Q('Simple Equations','equations',[
['01','What does the equals sign in an equation mean?',['The two sides have the same value','Move everything right','The answer is always positive','Add the sides'],'The two sides have the same value','An equation states a balance of equal values.',1],
['02','Solve x+3=8.',['5','11','3','8'],'5','Subtract 3 from both sides.',1],
['03','Solve x−4=7.',['11','3','28','−11'],'11','Add 4 to both sides.',1],
['04','Solve 3x=12.',['4','9','15','36'],'4','Divide both sides by 3.',1],
['05','Solve x/5=3.',['15','8','2','5/3'],'15','Multiply both sides by 5.',1],
['06','Solve 2x+3=11.',['4','7','14','3'],'4','Subtract 3 to get 2x=8, then divide by 2.',2],
['07','Solve 3x−5=16.',['7','11','21','3'],'7','Add 5 to get 3x=21, then divide by 3.',2],
['08','Solve 14=x+6.',['8','20','6','14'],'8','Subtract 6 from both sides, giving 8=x, so x=8.',2],
['09','Solve 2x+3x=20.',['4','5','10','20'],'4','Combine like terms: 5x=20, then divide by 5.',2],
['10','Solve 2(x+3)=14.',['4','10','7','11'],'4','Divide by 2 to get x+3=7, then subtract 3.',2],
['11','Why is “move across and change sign” incomplete as an explanation?',['The valid reason is performing the same inverse operation on both sides','Signs never change','Equations have no sides','It works only for multiplication'],'The valid reason is performing the same inverse operation on both sides','Balance and inverse operations justify each transformation.',3],
['12','Tunde has x pencils, receives 5 and now has 12. Which equation models this?',['x+5=12','5x=12','x−5=12','x/5=12'],'x+5=12','Starting amount plus five equals twelve.',2],
['13','Three identical books cost ₦1500. What is the cost x of one book?',['₦500','₦1500','₦4500','₦503'],'₦500','3x=1500, so x=1500÷3=500.',2],
['14','A taxi charges ₦200 plus ₦100 per kilometre and the total is ₦700. How many kilometres were travelled?',['5','7','9','3'],'5','100x+200=700; subtract 200 to get 100x=500; divide by 100.',3],
['15','What is the best final check after solving an equation?',['Substitute the value into the original equation and verify both sides match','Look only at the last line','Change the answer sign','Round every answer'],'Substitute the value into the original equation and verify both sides match','Checking the original equation confirms the solution satisfies the starting condition.',3]
]);


const coreLessonBanks:Record<string,AuthoredMathSpec[]>={
 'fractions':[
 ['01','Which pair shows equivalent fractions?',['1/2 and 2/4','1/2 and 2/3','2/5 and 3/5','3/4 and 3/8'],'1/2 and 2/4','Multiplying numerator and denominator of 1/2 by 2 gives 2/4.',1],
 ['02','Which fraction is equivalent to 3/5?',['6/10','6/5','3/10','9/10'],'6/10','Multiply both numerator and denominator by 2.',1],
 ['03','Simplify 12/18 to lowest terms.',['2/3','6/9','3/4','4/5'],'2/3','HCF(12,18)=6; 12÷6=2 and 18÷6=3.',2],
 ['04','Which is larger?',['3/4','2/3','They are equal','Cannot be compared'],'3/4','Using denominator 12: 3/4=9/12 and 2/3=8/12.',2],
 ['05','Arrange 1/2, 3/4, 2/3 from smallest to largest.',['1/2, 2/3, 3/4','3/4, 2/3, 1/2','2/3, 1/2, 3/4','1/2, 3/4, 2/3'],'1/2, 2/3, 3/4','With denominator 12 they are 6/12, 8/12 and 9/12.',2],
 ['06','Convert 3/4 to a decimal.',['0.75','0.34','0.8','0.25'],'0.75','3÷4=0.75.',1],
 ['07','Convert 0.6 to a fraction in lowest terms.',['3/5','6/5','1/6','2/3'],'3/5','0.6=6/10; divide top and bottom by 2 to get 3/5.',2],
 ['08','Convert 2/5 to a percentage.',['40%','20%','25%','50%'],'40%','2/5=0.4 and 0.4×100%=40%.',1],
 ['09','Convert 35% to a fraction in lowest terms.',['7/20','35/10','3/5','7/10'],'7/20','35%=35/100; divide by 5 to get 7/20.',2],
 ['10','What is 3/4 of ₦800?',['₦600','₦200','₦400','₦750'],'₦600','800÷4=200, then 200×3=600.',2],
 ['11','To generate an equivalent fraction, you must',['multiply or divide numerator and denominator by the same non-zero number','change only the numerator','change only the denominator','add the same number to top and bottom'],'multiply or divide numerator and denominator by the same non-zero number','Changing both by the same factor preserves the value.',2],
 ['12','Which fraction equals 0.25?',['1/4','1/2','2/5','3/4'],'1/4','1÷4=0.25.',1],
 ['13','Which method safely compares several unlike fractions?',['Rewrite them with a common denominator','Compare denominators only','Compare numerators only','Add all denominators'],'Rewrite them with a common denominator','Equal denominators create equal-sized parts, so numerators can then be compared.',2],
 ['14','A class shares 24 oranges and Ada receives 3/8. How many oranges does she receive?',['9','8','6','3'],'9','24÷8=3, then 3×3=9.',3],
 ['15','Why is 2/4 the same amount as 1/2?',['Both numerator and denominator of 1/2 were multiplied by 2','Only the numerator doubled','Their denominators are even','All fractions with 2 are equal'],'Both numerator and denominator of 1/2 were multiplied by 2','The same scaling of top and bottom preserves the fraction value.',3]
 ],
 'addition and subtraction':[
 ['01','What is 4,582+2,307?',['6,889','6,789','6,899','7,889'],'6,889','Align place values and add each column.',1],
 ['02','What is 9,000−3,475?',['5,525','6,525','5,575','6,475'],'5,525','Subtract with regrouping while preserving place values.',2],
 ['03','In 47,326, the digit 7 has value',['7,000','700','70,000','7'],'7,000','7 is in the thousands place.',1],
 ['04','What is −3+5?',['2','−8','8','−2'],'2','Start at −3 and move 5 units right on the number line.',1],
 ['05','What is 4+(−7)?',['−3','11','3','−11'],'−3','From 4 move 7 units left, landing at −3.',2],
 ['06','What is −2−5?',['−7','3','7','−3'],'−7','Subtracting 5 means move 5 units left from −2.',2],
 ['07','What is −6−(−4)?',['−2','−10','10','2'],'−2','Subtracting −4 is equivalent to adding 4: −6+4=−2.',3],
 ['08','Which everyday situation can represent a negative number?',['A temperature 5°C below zero','Five books on a desk','A height of 5 m','Five new pupils'],'A temperature 5°C below zero','Values below a reference zero can be represented negatively.',1],
 ['09','On a number line, adding a positive integer means generally moving',['right','left','nowhere','up'],'right','Values increase to the right.',1],
 ['10','On a number line, subtracting a positive integer means generally moving',['left','right','up','nowhere'],'left','Subtraction decreases the value.',1],
 ['11','What is 15−23?',['−8','8','38','−38'],'−8','Moving 23 left from 15 passes zero and ends at −8.',2],
 ['12','A bank balance changes from ₦2,000 to ₦1,250. What is the change?',['−₦750','₦750','−₦1,250','₦3,250'],'−₦750','1250−2000=−750, so the balance decreased by ₦750.',2],
 ['13','Which calculation requires regrouping?',['402−178','800−100','65−20','44−11'],'402−178','A zero place must be regrouped so smaller digits can be subtracted.',2],
 ['14','Why must digits be aligned by place value in column addition?',['So units combine with units, tens with tens, and so on','To make numbers look equal','Because commas are operations','Only for even numbers'],'So units combine with units, tens with tens, and so on','Each column represents a different power of ten.',2],
 ['15','A temperature is −4°C and rises by 9°C. What is the new temperature?',['5°C','−13°C','13°C','−5°C'],'5°C','−4+9=5.',3]
 ],
 'addition and subtraction of fractions':[
 ['01','What is 2/7+3/7?',['5/7','5/14','1/7','6/7'],'5/7','Equal denominators mean equal-sized parts; add the numerators.',1],
 ['02','What is 5/8−1/8?',['1/2','4/16','4/8','3/8'],'1/2','5/8−1/8=4/8, then simplify to 1/2.',1],
 ['03','What is the LCM of 2 and 3 for 1/2+1/3?',['6','5','3','2'],'6','6 is the smallest number divisible by both 2 and 3.',1],
 ['04','What is 1/2+1/3?',['5/6','2/5','1/5','2/6'],'5/6','LCM=6. 6÷2=3, so 1/2=3/6; 6÷3=2, so 1/3=2/6; total 5/6.',2],
 ['05','What is 3/4−1/6?',['7/12','2/2','1/2','5/12'],'7/12','LCM(4,6)=12: 3/4=9/12 and 1/6=2/12; 9/12−2/12=7/12.',2],
 ['06','When converting 2/5 to denominator 20, the new numerator is',['8','4','10','2'],'8','20÷5=4, then 4×2=8.',2],
 ['07','Why can you not simply add denominators in 1/2+1/3?',['Halves and thirds are different-sized parts','Denominators are never numbers','The answer must be a whole number','Only numerators matter'],'Halves and thirds are different-sized parts','The fractions must first be renamed using equal-sized parts.',2],
 ['08','What is 3/4+1/2−1/3?',['11/12','5/12','13/12','3/4'],'11/12','LCM=12: 9/12+6/12−4/12=11/12.',3],
 ['09','What is 1 1/2+2 1/4?',['3 3/4','3 1/4','2 3/4','4'],'3 3/4','Add whole parts and fraction parts: 1+2=3 and 1/2+1/4=3/4.',2],
 ['10','For 4 1/5−2 3/5, why is exchange needed?',['1/5 is smaller than 3/5','4 is smaller than 2','The denominators differ','Mixed numbers cannot be subtracted'],'1/5 is smaller than 3/5','Exchange one whole as 5/5, making 4 1/5 into 3 6/5.',2],
 ['11','What is 4 1/5−2 3/5?',['1 3/5','2 2/5','1 2/5','2 3/5'],'1 3/5','4 1/5=3 6/5; then 3 6/5−2 3/5=1 3/5.',3],
 ['12','After finding an LCM, what should be done to each fraction?',['LCM÷old denominator, then multiply that result by the numerator','Add LCM to numerator','Multiply only the denominator','Change numerator randomly'],'LCM÷old denominator, then multiply that result by the numerator','This shows exactly where every new numerator comes from.',2],
 ['13','What is 2/3+5/9?',['1 2/9','7/12','7/9','1 1/9'],'1 2/9','2/3=6/9; 6/9+5/9=11/9=1 2/9.',2],
 ['14','A learner uses denominator 12 for 1/3+1/4. What are the equivalent fractions?',['4/12 and 3/12','3/12 and 4/12','1/12 and 1/12','4/3 and 3/4'],'4/12 and 3/12','12÷3=4, 4×1=4; 12÷4=3, 3×1=3.',2],
 ['15','A tank is 2/5 full and another 1/4 of its capacity is added. How full is it?',['13/20','3/9','3/5','7/20'],'13/20','LCM(5,4)=20: 2/5=8/20 and 1/4=5/20; total 13/20.',3]
 ],
 'multiplication and division of fractions':[
 ['01','What is 2/3×3/5?',['2/5','6/8','5/8','1/5'],'2/5','Multiply numerators and denominators: 6/15, then simplify to 2/5.',1],
 ['02','Do you need a common denominator before multiplying fractions?',['No','Yes, always','Only when numerators differ','Only for proper fractions'],'No','Multiplication combines numerators and denominators directly.',1],
 ['03','What is 3/4 of 20?',['15','5','12','16'],'15','“Of” means multiply: 3/4×20=15.',1],
 ['04','Convert 1 1/2 to an improper fraction.',['3/2','2/1','1/2','4/2'],'3/2','1×2=2; 2+1=3; keep denominator 2.',1],
 ['05','What is 1 1/2×2?',['3','2 1/2','4','1'],'3','3/2×2/1=3.',2],
 ['06','What operation undoes multiplication by a non-zero fraction?',['Division by that fraction','Addition','Subtraction','Rounding'],'Division by that fraction','Division is the inverse of multiplication.',1],
 ['07','To divide by 2/3, multiply by',['3/2','2/3','1/3','3'],'3/2','The reciprocal of 2/3 is 3/2.',1],
 ['08','What is 3/4÷2/5?',['15/8','6/20','8/15','5/6'],'15/8','Keep 3/4, change ÷ to ×, flip 2/5 to 5/2: 3/4×5/2=15/8.',2],
 ['09','Why does multiplying by the reciprocal perform division?',['A number times its reciprocal equals 1, undoing the divisor factor','Because fractions must be flipped at random','Because denominators cannot divide','It only works for 2'],'A number times its reciprocal equals 1, undoing the divisor factor','The reciprocal is the multiplicative inverse.',3],
 ['10','What is 2 1/3÷1/2?',['4 2/3','1 1/6','2 2/3','3 1/3'],'4 2/3','2 1/3=7/3; 7/3×2/1=14/3=4 2/3.',2],
 ['11','What is 2/5×15/4 after cancellation?',['3/2','30/20','17/9','2/3'],'3/2','Cancel 2 with 4 and 15 with 5 before multiplying, giving 1×3/(1×2)=3/2.',2],
 ['12','Which phrase usually signals multiplication of fractions?',['“of”','“difference between”','“how many groups fit into”','“less than”'],'“of”','In fraction problems, “of” commonly means multiply.',1],
 ['13','How many 1/4-litre portions fit into 2 litres?',['8','2','4','6'],'8','2÷1/4=2×4=8.',2],
 ['14','What is 3/5÷9/10?',['2/3','27/50','3/2','6/5'],'2/3','3/5×10/9; cancel 3 with 9 and 10 with 5 to get 2/3.',3],
 ['15','A recipe uses 2/3 cup per batch. How many batches can be made from 4 cups?',['6','2 2/3','4 2/3','8'],'6','4÷2/3=4×3/2=6.',3]
 ]
};
const fractionsAuthored=Q('Fractions','fractions',coreLessonBanks['fractions']);
const additionSubtractionAuthored=Q('Addition and Subtraction','add-sub',coreLessonBanks['addition and subtraction']);
const fractionAddSubAuthored=Q('Addition and Subtraction of fractions','fraction-add-sub',coreLessonBanks['addition and subtraction of fractions']);
const fractionMulDivAuthored=Q('Multiplication and Division of Fractions','fraction-mul-div',coreLessonBanks['multiplication and division of fractions']);


const authoredJss1MathByTopic:Record<string,NerdcExerciseQuestion[]>={
 'highest common factor (hcf)':hcfAuthored,'hcf':hcfAuthored,
 'estimation':estimationAuthored,'approximation':approximationAuthored,
 'addition of numbers in base 2.':binaryAdditionAuthored,'subtraction of numbers in base 2.':binarySubtractionAuthored,'multiplication of numbers in base 2.':binaryMultiplicationAuthored,
 'use of symbols':symbolsAuthored,'simplification of algebraic expressions':simplifyCombinedAuthored,'simple equations':equationsAuthored,
};


const planeShapesAuthoredQuestions:NerdcExerciseQuestion[]=[
 ['01','A plane shape is best described as which of these?',['A flat two-dimensional figure','A figure with only height','Any physical object','A solid with length, width and height'],'A flat two-dimensional figure','A plane shape is flat and has two dimensions: length and width.'],
 ['02','Which of these is NOT a polygon?',['Triangle','Rectangle','Circle','Pentagon'],'Circle','A polygon is closed and made from straight line segments. A circle has a curved circumference.'],
 ['03','What is the general name for a four-sided polygon?',['Triangle','Quadrilateral','Pentagon','Hexagon'],'Quadrilateral','A quadrilateral is any polygon with four sides.'],
 ['04','A triangle has three equal sides. What type of triangle is it?',['Scalene','Isosceles','Equilateral','Right-angled only'],'Equilateral','An equilateral triangle has all three sides equal.'],
 ['05','A triangle has side lengths 5 cm, 5 cm and 8 cm. How should it be classified by sides?',['Equilateral','Isosceles','Scalene','Square'],'Isosceles','Exactly two sides are equal, so the triangle is isosceles.'],
 ['06','Which property distinguishes a square from a general rectangle?',['It has four sides','Its opposite sides are parallel','All four sides are equal','It has vertices'],'All four sides are equal','Both have four right angles, but a square additionally requires all four sides to be equal.'],
 ['07','Which statement is correct?',['Every rectangle is a square','Every square is a rectangle','No square is a rectangle','A square has no parallel sides'],'Every square is a rectangle','A square satisfies every rectangle property: four right angles and equal, parallel opposite sides.'],
 ['08','A quadrilateral has both pairs of opposite sides parallel. Which family must it belong to?',['Parallelogram','Triangle','Circle','Pentagon'],'Parallelogram','A parallelogram is defined by two pairs of parallel opposite sides.'],
 ['09','Which property must a rhombus have?',['Four equal sides','Exactly three sides','No parallel sides','Four right angles in every case'],'Four equal sides','A rhombus has four equal sides; four right angles are not required.'],
 ['10','Under the JSS1 convention taught in this lesson, a trapezium has which property?',['No sides','Three parallel sides','One pair of opposite sides parallel','Four equal sides and four right angles'],'One pair of opposite sides parallel','The lesson convention identifies a trapezium by one pair of opposite parallel sides.'],
 ['11','What is the line segment from the centre of a circle to its circumference called?',['Chord','Radius','Tangent','Segment'],'Radius','A radius joins the centre of a circle to a point on its circumference.'],
 ['12','A circle has radius 9 cm. What is its diameter?',['4.5 cm','9 cm','11 cm','18 cm'],'18 cm','Diameter is two radii: d=2r=2×9=18 cm.'],
 ['13','Which statement about a diameter is correct?',['Every chord is a diameter','A diameter never passes through the centre','Every diameter is a chord','A diameter touches the circle at one point only'],'Every diameter is a chord','A diameter joins two circumference points, so it is a chord, and it additionally passes through the centre.'],
 ['14','Which region of a circle is bounded by two radii and the arc between them?',['Sector','Segment','Tangent','Diameter'],'Sector','A sector is bounded by two radii and an arc. A segment is bounded by a chord and an arc.'],
 ['15','A square is rotated so that it looks like a diamond. What is it now?',['A triangle','A different shape','Still a square because its properties are unchanged','A circle'],'Still a square because its properties are unchanged','Rotation changes orientation, not side lengths, angles or parallel relationships, so the figure remains a square.']
].map(([n,prompt,options,correctAnswer,explanation],i)=>({id:`jss1-math-plane-shapes-${n}`,classLevel:'JSS1' as const,subject:'Mathematics' as const,topic:'Plane Shapes',prompt:prompt as string,type:'MULTIPLE_CHOICE' as const,options:options as string[],correctAnswer:correctAnswer as string,explanation:explanation as string,hint:'Use the defining property or marked relationship; do not classify from appearance alone.',difficulty:i<5?1:i<11?2:3,skill:'Plane Shapes',source:'AVORA_AUTHORED_NERDC_BANK' as const}));

function isJss1PlaneShapes(classLevel:string,subject:string,topic:string){
 return classLevel==='JSS1'&&subject==='Mathematics'&&topic.toLowerCase().trim()==='plane shapes';
}

function isJss1CountingBaseTwo(classLevel:string,subject:string,topic:string){
 const t=topic.toLowerCase().trim();
 return classLevel==='JSS1'&&subject==='Mathematics'&&(t==='counting in base two'||t==='counting in base 2');
}

function isJss1Lcm(classLevel:string,subject:string,topic:string){
 const t=topic.toLowerCase();
 return classLevel==='JSS1'&&subject==='Mathematics'&&(t==='lcm'||t.includes('lowest common multiple'));
}

export function nerdc2025ExerciseQuestions(classLevel:string,subject:string,topic:string,count=15):NerdcExerciseQuestion[]{
 if((classLevel!=='JSS1'&&classLevel!=='JSS2')||(subject!=='Mathematics'&&subject!=='English Language'))return [];
 const official=officialNerdc2025Topic(classLevel,subject,topic);if(!official)return [];
 if(classLevel==='JSS2'&&subject==='Mathematics'){const premium=jss2PremiumMathQuestions(topic);if(premium.length)return premium.slice(0,count);}
 if(classLevel==='JSS1'&&subject==='Mathematics'&&topic.toLowerCase()==='whole numbers')return wholeNumbersAuthoredQuestions.slice(0,count).map((q,i)=>({id:q.id,classLevel:'JSS1' as const,subject:'Mathematics' as const,topic,prompt:q.prompt,type:'MULTIPLE_CHOICE' as const,options:Array.from(q.options),correctAnswer:q.correctAnswer,explanation:q.explanation,hint:'Return to the matching lesson section, identify the place-value or number-line rule, then try again.',difficulty:i<3?1:i<7?2:3,skill:'Whole Numbers',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(isJss1CountingBaseTwo(classLevel,subject,topic))return countingInBaseTwoQuestions.slice(0,count).map(q=>({...q,topic}));
 if(isJss1PlaneShapes(classLevel,subject,topic))return planeShapesAuthoredQuestions.slice(0,count).map(q=>({...q,topic}));
 if(classLevel==='JSS1'&&subject==='Mathematics'){const key=topic.toLowerCase().trim();const exact=authoredJss1MathByTopic[key];if(exact)return exact.slice(0,count).map(q=>({...q,topic}));}
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Oral Comprehension')return jss1OralComprehensionQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Return to the oral text: decide whether the question asks for a directly heard detail, an evidence-based inference, or a reasoned critical judgement.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Conversation on Various Issues')return jss1ConversationQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Check whether the response is relevant, respectful and suitable for the topic, audience and situation; then apply the issue-specific vocabulary or problem-solving rule taught in the lesson.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Speech Sounds (Vowels and Consonants)')return jss1SpeechQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Do not rely on spelling alone. Recall the sound, mouth position, voicing and contrast examples from the interactive pronunciation lesson.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Reading Short passages with fluency')return jss1FluencyQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Judge fluency by accuracy, suitable pace, meaningful phrasing/prosody and understanding—not speed alone.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Reading passages for meaning')return jss1MeaningQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Identify the topic, decide what the writer says about it, then test the proposed main idea against the supporting details.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Reading Passages to Answer Literal, Inferential and Critical Questions')return jss1ThreeLevelQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'First classify the thinking required: FIND IT for literal, WORK IT OUT from clues for inference, or EVALUATE IT WITH EVIDENCE for critical comprehension.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Reading for Summary')return jss1SummaryQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Keep the essential meaning: identify the scope and key ideas, remove repetition/examples, paraphrase accurately, combine related points, then check against the source.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Parts of speech: Nouns, Verbs and Adjectives')return jss1NVAQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Use context and grammatical function: identify the predicate/verb, noun phrases and the words that modify or describe them.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Parts of speech: Adverbs, Conjunctions, Prepositions and Interjections')return jss1ACPIQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Classify each word by its grammatical function and the relationship it expresses in context.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Subject-Verb Agreement')return jss1SVAQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Find the true subject first, determine its number/person, then choose the finite verb form that agrees with it.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Use of Prefixes, Suffixes and Compounds')return jss1WordFormationQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Identify the meaningful base and affix or compound parts, then check meaning, spelling and use in context.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Writing Informal and Formal Letters')return jss1LetterQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Start with audience and purpose, choose the correct letter type, then check its required format, tone and task content.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Introduction to Creative writing')return jss1CreativeWritingQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Identify the creative form or story element, then ask what effect the writer’s language or technique creates.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Introduction to Literature')return jss1IntroductionLiteratureQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Separate category (oral/written) from genre (prose/drama/poetry), then support interpretations about life or values with evidence.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Folktales')return jss1FolktaleQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Use evidence from the tale: identify features, preserve event sequence when retelling, and distinguish the theme from the moral lesson.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Myths and Legends')return jss1MythsLegendsQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Identify what the narrative presents, separate feature/theme/moral, and distinguish traditional claims from independently verified facts.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 if(classLevel==='JSS1'&&subject==='English Language'&&topic==='Introduction to Prose Fiction')return jss1ProseFictionQuestions.slice(0,count).map(q=>({...q,type:'MULTIPLE_CHOICE' as const,hint:'Identify the prose type or element, then support your interpretation with a concrete event/detail from the text.',source:'AVORA_AUTHORED_NERDC_BANK' as const}));
 const authored=classLevel==='JSS2'&&subject==='English Language'?authoredNerdc2025EnglishQuestions(topic):[];
 if(classLevel==='JSS2'&&subject==='English Language'){
  const authoredMapped=authored.map(q=>({
   ...q,type:'MULTIPLE_CHOICE' as const,
   hint:'Use the exact rule, purpose or evidence established in the NERDC-aligned lesson; eliminate options that contradict the taught meaning or context.',
   source:'AVORA_AUTHORED_NERDC_BANK' as const,
  }));
  if(authoredMapped.length>=count)return authoredMapped.slice(0,count);
  const generated=conceptQuestions(classLevel,subject,topic,Math.max(20,count));
  const seen=new Set(authoredMapped.map(q=>q.prompt.toLowerCase().trim()));
  const merged:NerdcExerciseQuestion[]=[...authoredMapped];
  for(const q of generated){const key=q.prompt.toLowerCase().trim();if(seen.has(key))continue;seen.add(key);merged.push(q);if(merged.length>=Math.max(20,count))break}
  return merged.slice(0,Math.max(20,count));
 }
 const baseCount=isJss1Lcm(classLevel,subject,topic)&&count>15?15:count;
 const existing=compatibleBankQuestions(classLevel,subject,topic).map(q=>({
  id:`nerdc25-bank-${q.id}`,classLevel:q.classLevel,subject:q.subject,topic,
  prompt:q.prompt,type:'MULTIPLE_CHOICE' as const,options:q.options.map(String),correctAnswer:String(q.correctAnswer),
  explanation:q.explanation||`The correct answer is ${q.correctAnswer}.`,
  hint:subject==='Mathematics'?'Identify the governing rule and work carefully before choosing.':'Use the sentence, passage or language rule—not a guess—to eliminate the distractors.',
  difficulty:Number(q.difficulty||1),skill:topic,source:'AVORA_REVIEWED_BANK' as const,
 }));
 const unique: NerdcExerciseQuestion[]=[];const prompts=new Set<string>();
 for(const q of existing){const k=q.prompt.toLowerCase().trim();if(prompts.has(k))continue;prompts.add(k);unique.push(q);if(unique.length>=baseCount)break}
 const needed=Math.max(0,baseCount-unique.length);
 for(const q of conceptQuestions(classLevel,subject,topic,needed)){if(!prompts.has(q.prompt.toLowerCase())){prompts.add(q.prompt.toLowerCase());unique.push(q)}}
 const base=unique.slice(0,baseCount);
 if(isJss1Lcm(classLevel,subject,topic)&&count>15)return [...base,...factorsAndMultiplesFoundationQuestions.slice(0,Math.min(10,count-15)).map(q=>({...q,topic}))];
 return base;
}

export function publicNerdc2025ExerciseQuestions(classLevel:string,subject:string,topic:string,count=15):PublicNerdcExerciseQuestion[]{
 return nerdc2025ExerciseQuestions(classLevel,subject,topic,count).map(({correctAnswer,...q})=>q);
}

export function checkNerdc2025Exercise(questionId:string,answer:string){
 for(const official of officialNerdc2025Topics('JSS1','Mathematics').concat(officialNerdc2025Topics('JSS1','English Language'),officialNerdc2025Topics('JSS2','Mathematics'),officialNerdc2025Topics('JSS2','English Language'))){
  const exerciseCount=isJss1Lcm(official.classLevel,official.subject,official.topic)?25:(official.classLevel==='JSS1'&&official.subject==='Mathematics'&&official.topic.toLowerCase().trim()==='simplification of algebraic expressions'?30:15);
  const q=nerdc2025ExerciseQuestions(official.classLevel,official.subject,official.topic,exerciseCount).find(item=>item.id===questionId);
  if(!q)continue;const correct=norm(answer).toLowerCase()===norm(q.correctAnswer).toLowerCase();
  const explanation=norm(q.explanation)||`The correct answer is ${q.correctAnswer}.`;
  const steps=explanation.split(/(?<=[.!?])\\s+|\\s*→\\s*|\\s*;\\s*/).map(norm).filter(Boolean);
  const chosen=q.options.find(x=>norm(x).toLowerCase()===norm(answer).toLowerCase())||answer;
  const optionReview=q.options.map(option=>({option,correct:norm(option).toLowerCase()===norm(q.correctAnswer).toLowerCase(),note:norm(option).toLowerCase()===norm(q.correctAnswer).toLowerCase()?'This matches the rule, calculation or evidence required by the question.':norm(option).toLowerCase()===norm(chosen).toLowerCase()&&!correct?`This was your choice. Recheck it against the governing rule: ${q.hint}`:'This option does not match the required result when the taught rule or evidence is applied.'}));
  return {correct,correctAnswer:q.correctAnswer,explanation,hint:correct?'Now connect the result to the rule so you know it was not a guess.':q.hint,topic:q.topic,skill:q.skill,concept:q.skill,solutionSteps:steps.length?steps:[explanation],misconception:correct?'Your answer is correct; still verify the reasoning so the same method transfers to a new question.':`Your choice was ${chosen}. The key correction is: ${q.hint}`,optionReview,finalAnswer:`Therefore, the correct answer is ${q.correctAnswer}.`};
 }
 return undefined;
}

export function nerdc2025ExerciseAudit(){
 const rows=[] as Array<{classLevel:string;subject:string;topic:string;count:number;bank:number;authored:number;concept:number}>;
 for(const classLevel of ['JSS1','JSS2'] as const)for(const subject of ['Mathematics','English Language'] as const)for(const topic of officialNerdc2025Topics(classLevel,subject)){
  const q=nerdc2025ExerciseQuestions(classLevel,subject,topic.topic,15);rows.push({classLevel,subject,topic:topic.topic,count:q.length,bank:q.filter(x=>x.source==='AVORA_REVIEWED_BANK').length,authored:q.filter(x=>x.source==='AVORA_AUTHORED_NERDC_BANK').length,concept:q.filter(x=>x.source==='NERDC_DEEP_LESSON_CONCEPT_CHECK').length});
 }
 return rows;
}
