export type DeepMathLesson={
topicId:string; classLevel:'JSS1';
subject:'Mathematics'; topic:string;
source:
{authority:'NERDC';url:string;page:number};
objectives:string[];
prerequisites:string[]; teaching:string[];
workedExamples:string[];
misconceptions:string[];
guidedPractice:string[];
independentPractice:string[]; mastery:
{criterion:string;status:'DEEP_WHEN_PASSED'
}; boardReady:true;
visualStandard?:{rendering:string;productionRule:string;mobile:string;notation:string[];progressiveReveal:boolean;diagramSets:string[]};
};
const
sourceUrl='https://www.nerdc.gov.ng/';
export const
jss1MathematicsDeepLessons:DeepMathLesson[]
=[
{
topicId:'nerdc-jss1-math-numbers-and-numeration-whole-numbers-1',classLevel:'JSS1',subject:'Mathematics',
topic:'Whole Numbers',source:
{authority:'NERDC',url:sourceUrl,page:1},
objectives:['Read and write numbers in millions and billions','Read and write numbers in trillions','Apply large numbers to everyday situations','Solve quantitative-reasoning problems with large numbers'],
prerequisites:['place value within thousands (ones, tens, hundreds, thousands)','reading and writing numbers up to six digits fluently','grouping digits into threes using commas'],
teaching:[
'A number’s place value system is built entirely on groups of three digits, called periods, and once you understand why the grouping is always three, every large number becomes readable no matter how long it gets. Starting from the right: the first three digits are the UNITS period (ones, tens, hundreds), the next three are the THOUSANDS period, the next three are the MILLIONS period, the next three are the BILLIONS period, and the next three are the TRILLIONS period. Each period repeats the exact same internal pattern — ones, tens, hundreds — it just gets a bigger name attached each time you move three places left. This is why commas are placed every three digits: 4,305,018 is not an arbitrary way to write it, the commas are marking exactly where one period ends and the next begins.',
'To read any number no matter how large, split it into its periods first, working from the right in groups of three, then read each period on its own exactly as if it were a small number by itself, and finally say its period name straight after — except for the very last (units) period, which gets no name at all. Take 4,305,018: split as 4 | 305 | 018. Read "4" as "four", attach "million" → "four million". Read "305" as "three hundred and five", attach "thousand" → "three hundred and five thousand". Read "018" as "eighteen" (the leading zero is silent, it only holds the hundreds place empty) with no name attached since it’s the units period. Put it together: "four million, three hundred and five thousand, eighteen."',
'Zeros inside a number are not decorative — they are place-holders, and losing track of one changes the entire value of the number. Compare 1,005,020 and 1,050,020: the only difference is which position holds a zero versus a digit, yet one is "one million, five thousand and twenty" and the other is "one million, fifty thousand and twenty" — a difference of forty-five thousand. This is exactly why, when writing a number FROM words back into figures, you must count out every single period explicitly and place a zero in any position that wasn’t mentioned, rather than just writing down the digits that were spoken.',
'Trillions extend the exact same three-digit-period pattern one more step to the left: ones, thousands, millions, billions, trillions — each new period is exactly one thousand times bigger than the one before it. A number is a billion when it needs 10 digits (1,000,000,000), and a trillion when it needs 13 digits (1,000,000,000,000). Rather than memorising these digit-counts separately, count the periods: units (no name), thousands (1 comma), millions (2 commas), billions (3 commas), trillions (4 commas) — the number of commas tells you the period name directly.',
'To compare two large numbers, never start by looking at the units end — start by comparing how MANY digits each number has, since more digits almost always means a bigger number (313 has fewer digits than 1,024, so 313 is smaller, immediately, without reading further). Only when two numbers have exactly the same number of digits do you need to compare digit-by-digit, and even then you start from the LEFT (the highest place value) and move right, stopping at the very first position where the digits differ — that position alone decides which number is bigger.',
'Large numbers show up constantly in real contexts — national population figures, government budgets, company revenues, distances in astronomy — and the skill this topic builds is not just reading them aloud, but using them correctly in a calculation once they’re understood: adding two large populations, finding a difference between two budget figures, and so on, all rely on correctly lining up place value, which is only possible once you can confidently identify which period each digit belongs to.'
],
workedExamples:[
'Read 4,305,018 in words using the period-column diagram.\n\n```\n MILLIONS | THOUSANDS | UNITS\n 4 | 3 0 5 | 0 1 8\n "four" | "three hundred and five" | "eighteen"\n + million | + thousand | (no name)\n```\nReading left to right, period by period: "four million, three hundred and five thousand, eighteen."',
'Read 7,020,000,000 in words. Split into periods: 7 | 020 | 000 | 000. The billions period is "7" → "seven billion". The millions period is "020" → "twenty" (leading zero silent) → "twenty million". The thousands period is "000" → entirely zero, so it is skipped and not spoken at all. The units period is "000" → also skipped. Full answer: "seven billion, twenty million." Notice that an entire period can vanish from the spoken form when it is all zeros — that is normal and correct, not a mistake.',
'Write "nine billion, twelve million, six thousand and forty" in figures. Work one named period at a time, left to right, and place THREE digits for every period even when a period is small: billions = 9 → "009"? No — the billions period itself needs no leading zeros since nothing comes before it, so billions = 9. Millions = "012" (twelve, written as three digits since a period always holds three places: 0-1-2). Thousands = "006" (six, as three digits: 0-0-6). Units = "040" (forty, as three digits: 0-4-0). Assembling all four periods in order: 9,012,006,040.',
'Compare 6,040,000, 6,400,000 and 6,004,000, and arrange from smallest to largest. All three numbers have exactly 7 digits, so digit-count does not decide it — compare from the LEFT. All three start with "6". Move to the next digit (the hundred-thousands place): 6,040,000 has "0" here, 6,400,000 has "4" here, and 6,004,000 has "0" here too. So 6,400,000 is immediately the largest, since 4 beats 0 at this position. Between the remaining two (6,040,000 and 6,004,000), move one more place right (ten-thousands): 6,040,000 has "4" here, 6,004,000 has "0" here — so 6,040,000 is bigger than 6,004,000. Final order, smallest to largest: 6,004,000 < 6,040,000 < 6,400,000.',
'A national budget allocates ₦8,750,000,000 to education and ₦3,600,000,000 to health. What is the combined allocation, and which sector receives more, and by how much? Combined: 8,750,000,000 + 3,600,000,000 = 12,350,000,000 (line up every period exactly — billions with billions, millions with millions — the same way you would add smaller numbers, just with more periods to track). Education receives more, by 8,750,000,000 − 3,600,000,000 = 5,150,000,000.',
'A company reports revenue of "two hundred and four billion, six million naira" for the year. A student writes this as 204,006,000,000 — is this correct? Check period by period: billions = "two hundred and four" = 204. Millions = "six" = 006 (three digits, since six alone in the millions period means 0 hundred-millions, 0 ten-millions, 6 millions). Thousands = nothing named, so 000. Units = nothing named, so 000. Assembled: 204,006,000,000. Yes, this is correct — the key check was remembering that "six million" inside a longer number still occupies all three million-places (0-0-6), not just a lone digit "6" tacked on.',
'Nigeria’s population is often quoted as approximately 223,800,000 and a neighbouring estimate for another country is 41,300,000. Roughly how many times bigger is the first figure than the second, without doing long division? Compare leading digits and period sizes: 223,800,000 is in the hundred-millions (2-something-hundred-million), while 41,300,000 is in the tens-of-millions (4-something-ten-million). Since a hundred-million is roughly 5 times bigger than 41 million as a leading estimate (223 ÷ 41 ≈ 5.4), the first population is roughly five times the second — this kind of leading-digit estimate is a genuinely useful real-world skill, not just a classroom exercise.'
],
misconceptions:[
'Reading 1,005,020 as "one million fifty-two" — this happens when a student reads the non-zero digits in order without checking which PERIOD each group of three belongs to; the fix is always to split into periods first and read each one as its own three-digit number before attaching the period name.',
'Dropping a zero placeholder when converting words back into figures, e.g. writing "six million" inside a longer number as just a lone "6" instead of the full three-digit block "006" for that period — every named period must be written as exactly three digits, padding with leading zeros where needed.',
'Comparing two numbers by looking at the units digit first out of habit (the way you might glance at the last digit of a phone number) — for size comparison you must always start from the digit count, then the leftmost (highest-value) digit, never the rightmost.',
'Assuming a longer-looking number is always bigger just from a glance at its length in words or its number of commas, without actually counting digits carefully — always count actual digits, since spacing and commas can be inconsistent in handwritten or informally typed numbers.',

'Treating an entirely-zero period (like the thousands period in 7,020,000,000) as an error or something that needs "fixing" — a period that is all zeros is completely normal and is correctly skipped when reading the number aloud, it does not mean a mistake was made while writing it.',
'When adding or subtracting large numbers, misaligning the periods (for example lining up by the LAST digit typed rather than by place value) — always write one number under the other with commas aligned vertically, period by period, before doing any column arithmetic.'
],
guidedPractice:[
'Write 63,405,090 in words, and state the value of the digit "4".',
'Write "seven billion, eighteen million, three hundred thousand and six" in figures.',
'Without exact addition, which is bigger: 305,600,000+12,000,000, or 400,000,000?'
],
independentPractice:[
'Write 8,204,017 in words.',
'Write 90,006,000,000 in words. Why is the thousands period skipped when read aloud?',
'Write "twelve billion, five hundred million, four thousand and nine" in figures.',
'Write "three trillion, two hundred billion" in figures. How many digits does it have?',
'State the value of the digit "3" in 4,738,205,000.',
'Order from smallest to largest: 7,300,000; 7,030,000; 7,003,000; 7,330,000.',
'A company\'s revenue was ₦14,600,000,000 last year and ₦18,250,000,000 this year. Find the increase.',
'A school has 305,400 primary pupils and 128,750 secondary pupils. How many MORE pupils are in primary than secondary?',
'A student reads 6,000,050,004 as "six billion, five hundred thousand and four." What exactly went wrong?',
'Two population estimates are 3,204,000 and 3,240,000. Which is larger, and by how much?',
'Round 47,382,910 to the nearest million. Which digit decides whether to round up or down?',
'A ₦22,750,000,000 budget allocates 40% to infrastructure. Estimate the share using leading digits, then find the exact value.'
],
mastery:{criterion:'Learner reads and writes numbers up to trillions accurately across at least 4 of 5 mixed exercises, correctly explains the role of zero placeholders, and compares/orders large numbers using digit-count and leftmost-digit reasoning rather than guessing.',status:'DEEP_WHEN_PASSED'},boardReady:true

},
{
topicId:'nerdc-jss1-math-numbers-and-numeration-whole-numbers-2',classLevel:'JSS1',subject:'Mathematics',
topic:'LCM',source:
{authority:'NERDC',url:sourceUrl,page:1},
objectives:['Identify common multiples of two or more whole numbers','Find the LCM of whole numbers'],
prerequisites:['times tables /multiplication facts up to 12','the meaning of a multiple (a number obtained by multiplying by whole numbers)'],
teaching:[
'FOUNDATION — FACTORS AND MULTIPLES. Before finding an LCM, understand the relationship between factors and multiples. A factor divides a number exactly with no remainder. For example, 24 ÷ 6 = 4, so 6 is a factor of 24; but 24 ÷ 5 leaves a remainder, so 5 is not a factor. Factors can be found systematically in pairs: 1×24, 2×12, 3×8, 4×6. Therefore the factors of 24 are 1,2,3,4,6,8,12,24. Every exact division gives two partners in a factor pair.',
'HOW TO KNOW YOU HAVE FOUND ALL THE FACTORS. Start testing from 1 upward and record both numbers from every exact division. Stop when the two sides of the factor pairs meet or would cross, because after that the same pairs repeat in reverse. For 36 the pairs are 1×36, 2×18, 3×12, 4×9, then 6×6. At 6×6 the sides meet, so the complete factor list is 1,2,3,4,6,9,12,18,36. This prevents both missing factors and testing unnecessarily all the way to 36.',
'QUICK DIVISION TABLE METHOD. A factor must divide exactly — remainder means NOT a factor. For 30: 30÷1=30 → pair 1 and 30; 30÷2=15 → 2 and 15; 30÷3=10 → 3 and 10; 30÷4=7 remainder 2 → 4 is not a factor; 30÷5=6 → 5 and 6. The pairs are now at the meeting point, so factors of 30 are 1,2,3,5,6,10,15,30. Divisibility clues can make this faster, but exact division is the final test.',
'WHAT A MULTIPLE MEANS. A multiple is obtained by multiplying a number by whole numbers in sequence. The positive multiples of 6 are 6,12,18,24,30,36,… because 6×1=6, 6×2=12, 6×3=18 and so on. Positive factors of a number form a finite list, while positive multiples continue without end. The direction matters: because 7×5=35, 7 is a factor of 35 and 35 is a multiple of 7.',
'COMMON FACTORS AND COMMON MULTIPLES. Common means shared. Factors of 12 are 1,2,3,4,6,12 and factors of 18 are 1,2,3,6,9,18, so their common factors are 1,2,3,6. Multiples of 4 are 4,8,12,16,20,24,28,32,36,… and multiples of 6 are 6,12,18,24,30,36,…, so 12,24,36,… are common multiples. LCM asks for the LEAST positive number in this shared-multiple list.',
'A multiple of a number is what you get by multiplying it by 1, 2, 3, 4, and so on, forever — so the multiples of 4 are 4, 8, 12, 16, 20, 24… and this list never ends. A COMMON multiple of two numbers is a number that appears in BOTH of their multiple lists at the same time. The Lowest Common Multiple (LCM) is simply the smallest number that appears in both lists — not the only one, just the smallest one, since there are actually infinitely many common multiples once you find the first.',
'METHOD 1 — Listing (best for small numbers, and the method that makes WHY the LCM works actually visible). List out several multiples of each number, then scan across both lists for the first number that appears in both. For 4 and 6: multiples of 4 are 4,8,12,16,20,24… and multiples of 6 are 6,12,18,24,30… — scanning both lists, 12 is the first number that shows up in both, so LCM(4,6)=12. Notice 24 also appears in both lists later, confirming there are more common multiples — 12 is just the LOWEST one.',
'METHOD 2 — Prime factor / index method (needed once numbers get bigger, since listing dozens of multiples by hand becomes slow and error-prone). Break each number down into its prime factors written in index (power) form, then build the LCM by taking every prime that appears in EITHER number, at the HIGHEST power it appears with. For 12 and 18: 12=2²×3¹, 18=2¹×3². The prime 2 appears with powers 2 and 1 — take the higher, 2². The prime 3 appears with powers 1 and 2 — take the higher, 3². LCM=2²×3²=4×9=36.',
'Why "highest power of every prime" actually works, rather than just being a rule to memorise: for a number to be a multiple of 12, it must contain at least 2²×3¹ inside it somewhere. For that SAME number to also be a multiple of 18, it must separately contain at least 2¹×3². To satisfy BOTH requirements at once with the smallest possible number, you need, for each prime, whichever requirement is bigger — which is exactly "the highest power seen." Anything less would fail one of the two requirements; anything more would just make the number bigger than necessary.',
'Both methods must always agree — they are two routes to the exact same answer, and checking one against the other is a genuine way to catch a mistake. If listing gives you a different answer from the prime-factor method for the same two numbers, one of the two calculations has an error, and you should redo both rather than trusting either blindly.',
'LCM problems in real life are almost always "when do these repeating things next line up together" problems: two bells ringing on different cycles, two buses leaving on different schedules, or two patterns of blinking lights. The number of minutes/seconds/days until they next coincide is always the LCM of their individual cycle lengths — recognising this phrasing is itself part of the skill, since the word "LCM" is rarely used directly in the question.'
],
workedExamples:[
'Find the LCM of 12 and 18 using a factor-tree diagram for the index method.\n\n```\n 12 18\n /\\ / \\\n 2 6 2 9\n /\\ / \\\n 2 3 3 3\n 12 = 2×2×3 = 2²×3¹ 18 = 2×3×3 = 2¹×3²\n```\nHighest power of 2 seen: 2² (from 12). Highest power of 3 seen: 3² (from 18). LCM=2²×3²=4×9=36.',

'Find the LCM of 5 and 8 by listing. Multiples of 5: 5,10,15,20,25,30,35,40. Multiples of 8: 8,16,24,32,40. Scanning both lists, the first shared value is 40. LCM(5,8)=40. Notice that because 5 and 8 share no common factor other than 1, their LCM is simply their product (5×8=40) — this will always happen when two numbers are co-prime.',
'Find the LCM of 9 and 12 using the index (prime-factor) method. 9=3². 12=2²×3¹. Every prime appearing in either number: 2 and 3. Highest power of 2 seen: 2² (from 12). Highest power of 3 seen: 3² (from 9). LCM=2²×3²=4×9=36. Check by listing a few multiples of each to confirm 36 is genuinely the first shared value: multiples of 9 are 9,18,27,36… and multiples of 12 are 12,24,36… — confirmed.',
'Find the LCM of 15, 20 and 30 (three numbers at once). 15=3×5. 20=2²×5. 30=2×3×5. Collect every prime seen across all three: 2, 3, 5. Highest power of 2: 2² (from 20). Highest power of 3: 3¹ (from 15 or 30). Highest power of 5: 5¹ (appears in all three, always as 5¹). LCM=2²×3×5=4×3×5=60.',
'Two school bells ring every 12 minutes and every 18 minutes. If they ring together at 8:00am, when do they next ring together? This is asking for LCM(12,18). 12=2²×3, 18=2×3². Highest powers: 2² and 3². LCM=4×9=36. They will next ring together 36 minutes later, at 8:36am.',

'A student is asked for the LCM of 6 and 10, and writes down 60 (their product) as the answer. Is this correct? Check by listing: multiples of 6 are 6,12,18,24,30,36… and multiples of 10 are 10,20,30,40… — 30 already appears in both lists, so the true LCM is 30, not 60. The student’s mistake was assuming the LCM of any two numbers is always their product — that shortcut only works when the two numbers share no common factor (like 5 and 8 in the first example); 6 and 10 share a common factor of 2, so their LCM is smaller than their product.',
'Two rolls of ribbon are cut into equal pieces: one roll into pieces of 8cm and another into pieces of 12cm. What is the shortest ribbon length that could be cut into a whole number of pieces of EITHER size? This is LCM(8,12): 8=2³, 12=2²×3. Highest powers: 2³ and 3¹. LCM=8×3=24cm.'
],
misconceptions:[
'Assuming the LCM of two numbers is always their product — this only holds when the two numbers are co-prime (share no common factor); whenever they share a factor, the true LCM is smaller than the product, as shown directly in the 6-and-10 example above.',
'Stopping at the FIRST common value spotted without checking it really is the lowest — always scan from the start of both lists in order, since a larger shared value might appear to "jump out" first if the lists aren’t read carefully in sequence.',
'In the index method, taking the LOWEST power of each prime instead of the highest — this is actually the rule for HCF, not LCM; confusing the two rules is the single most common LCM error.',
'Forgetting to include a prime that only appears in ONE of the numbers — LCM must include every prime that appears in EITHER number, not just the primes they have in common.',
'Listing multiples of only one number and then trying to guess the answer, rather than actually cross-checking against the second number’s multiple list.'
],
guidedPractice:[
'Find the LCM of 6 and 9.',
'Find the LCM of 14 and 21 using prime factors.',
'Two lights blink every 4 and 10 seconds, starting together. When do they next blink together?'
],
independentPractice:[
'Find the LCM of 7 and 9.',
'Find the LCM of 16 and 24 using prime factors.',
'Find the LCM of 5, 6 and 8.',
'A student claims the LCM of 9 and 15 is 135 (their product). Is this correct?',
'Two tankers deliver water every 6 and 8 days, both delivering today. When do they next deliver on the same day?',
'Find the LCM of 10 and 15. Why is it NOT their product (150)?',
'Order these from smallest to largest: LCM(3,4), LCM(6,6), LCM(5,7).',
'Two amusement rides start new cycles every 15 and 20 minutes, both starting together at noon. When do they next start together?',
'Find the LCM of 12, 16 and 20.',
'Why can the LCM of two numbers never be smaller than the larger of the two numbers?',
'Find the LCM of 8 and 9. Are they co-prime?',
'Why is the prime-factor method better than listing for finding LCM(45,60)?'
],
mastery:{criterion:'Learner correctly finds the LCM of two or three numbers using both the listing and prime-factor/index methods, explains why the two methods must agree, and does not default to "multiply the numbers together" when the numbers share a common factor.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-numbers-and-numeration-whole-numbers-3',classLevel:'JSS1',subject:'Mathematics',
topic:'HCF',source:
{authority:'NERDC',url:sourceUrl,page:2},

objectives:['Identify common factors','Find HCF','Distinguish HCF from LCM','Solve HCF/LCM quantitative reasoning'],
prerequisites:['times tables / division facts up to 12','the meaning of a factor (a number that divides exactly into another)','the LCM method already covered in this topic sequence'],
teaching:[
'START HERE — WHAT YOU SHOULD ALREADY KNOW. A factor divides a number exactly with no remainder. Factors usually come in pairs because two whole numbers multiply to make the original number. For 24 the pairs are 1×24, 2×12, 3×8 and 4×6, so the factors are 1,2,3,4,6,8,12,24. When finding pairs from 1 upward, stop when the two sides meet or would cross; after that you would only repeat pairs in reverse.',
'1. COMMON FACTORS. Common means shared. A common factor of two or more numbers must divide EVERY one of those numbers exactly. Factors of 12 are 1,2,3,4,6,12. Factors of 18 are 1,2,3,6,9,18. The numbers appearing in both lists are 1,2,3 and 6, so these are the common factors of 12 and 18. Do not choose a number merely because it is a factor of one of them — it must divide all the numbers in the question.',
'2. WHAT HCF MEANS. HCF means Highest Common Factor. First identify the common factors, then choose the greatest one. For 12 and 18 the common factors are 1,2,3,6; the highest is 6, therefore HCF(12,18)=6. HCF is not a separate mysterious number: it is simply the largest member of the common-factor list.',
'3. METHOD 1 — LISTING FACTORS. This is the clearest method for small numbers. Step 1: list every factor of each number systematically using factor pairs. Step 2: circle or copy the factors that occur in every list. Step 3: select the largest shared factor. Example: factors of 20 are 1,2,4,5,10,20; factors of 30 are 1,2,3,5,6,10,15,30. Common factors are 1,2,5,10, so HCF=10. Always find complete factor lists before choosing the answer.',
'4. METHOD 2 — PRIME FACTORISATION. For larger numbers, express each number as a product of prime factors. A prime number has exactly two positive factors: 1 and itself. Keep breaking composite factors down until only primes remain. Then keep only prime factors shared by all the numbers and use the LOWEST power of each shared prime. For 36=2²×3² and 48=2⁴×3, the shared primes are 2 and 3. The lower powers are 2² and 3¹, so HCF=2²×3=12.',
'5. WHY THE LOWER POWER WORKS. HCF itself must divide every original number. A common factor therefore cannot contain more copies of a prime than one of the original numbers contains. In 36=2²×3² and 48=2⁴×3¹, a common factor cannot contain 2³ because 36 has only two factors of 2; and it cannot contain 3² because 48 has only one factor of 3. The greatest combination allowed by BOTH numbers is therefore 2²×3¹=12. This is why we take the lower shared powers — it follows from exact divisibility, not from a rule to memorise blindly.',
'6. HCF OF THREE NUMBERS. The same rule continues to work. For 24, 36 and 60: 24=2³×3; 36=2²×3²; 60=2²×3×5. Only 2 and 3 occur in all three numbers. The lowest power of 2 is 2² and the lowest power of 3 is 3¹. Therefore HCF=2²×3=12. The 5 is ignored because it does not occur in every number.',
'7. WHEN HCF IS 1. Every positive whole number has 1 as a factor, so two numbers always have at least 1 as a common factor. Sometimes they share nothing larger. For 9 and 16, factors of 9 are 1,3,9 and factors of 16 are 1,2,4,8,16. Their only common factor is 1, so HCF=1. Such numbers are called co-prime (or relatively prime). An HCF of 1 is a valid answer.',
'8. HCF VERSUS LCM. HCF asks for the GREATEST number that divides the given numbers exactly. LCM asks for the LEAST positive number that is a multiple of all the given numbers. With prime factors, HCF uses only primes COMMON to all numbers at their LOWEST shared powers; LCM uses every prime required by any number at the HIGHEST required powers. For 20=2²×5 and 30=2×3×5, HCF=2×5=10 while LCM=2²×3×5=60.',
'9. HOW TO RECOGNISE HCF IN WORD PROBLEMS. Think HCF when a fixed quantity must be divided, cut or arranged into the greatest possible equal groups or largest equal pieces with nothing left over. Examples include the greatest equal length for cutting ropes, the greatest number of identical packs made from different quantities, or the largest equal group size. Think LCM instead when separate repeating events must next happen together. Do not decide from one keyword alone: ask whether the problem is DIVIDING fixed quantities equally (HCF) or ALIGNING repeating cycles (LCM).',
'10. USING HCF TO SIMPLIFY FRACTIONS. To reduce a fraction completely in one step, find the HCF of its numerator and denominator and divide both by it. For 36/48, HCF(36,48)=12, so 36÷12=3 and 48÷12=4; therefore 36/48=3/4. Because HCF(3,4)=1, the fraction cannot be simplified further.',
'11. REASONABLENESS CHECK. For positive whole numbers, an HCF cannot be greater than the smallest number in the set because it must divide that number. If you calculate HCF(24,36)=72, the answer is impossible before you do any further checking. Also test your final HCF by dividing each original number by it: every result must be a whole number.',
'12. MASTERY TARGET. You should be able to explain factor and common factor, find HCF by complete factor lists and by prime factorisation, explain why lower shared prime powers are used, find HCF for two or three numbers, recognise co-prime numbers, distinguish HCF problems from LCM problems, simplify fractions using HCF, and justify your answer rather than only stating it.'
],
workedExamples:[
'Find all factors of 28 by factor pairs. Start with 1: 1 × 28 = 28, so 1 and 28 are factors. Next, 2 × 14 = 28, so 2 and 14 are factors. 3 does not divide 28 exactly, so skip it. Next, 4 × 7 = 28, so 4 and 7 are factors. After 4 × 7 the pair values have met/crossed, so no new factor pair remains. Collect each factor once: 1, 2, 4, 7, 14, 28.',
'Find HCF of 36 and 48 by prime factorisation. For 36: 36 = 4 × 9 = (2 × 2) × (3 × 3) = 2² × 3². For 48: 48 = 4 × 12 = (2 × 2) × (4 × 3) = 2 × 2 × 2 × 2 × 3 = 2⁴ × 3. The primes common to both are 2 and 3. For HCF, use the lower shared power: 2² and 3¹. Therefore HCF = 2² × 3 = 4 × 3 = 12. Check: 36 ÷ 12 = 3 and 48 ÷ 12 = 4, so 12 divides both exactly.',
'Find the HCF of 15 and 80 (the exact pairing given in the source material) by listing factors. Factors of 15: 1, 3, 5, 15 (pairs: 1×15, 3×5). Factors of 80: 1, 2, 4, 5, 8, 10, 16, 20, 40, 80 (pairs: 1×80, 2×40, 4×20, 5×16, 8×10). Comparing both lists, the common factors are 1 and 5. The highest of these is 5, so HCF(15,80)=5.',
'For 20 and 30, find both the HCF and the LCM, and use them to demonstrate the contrast between the two rules. 20=2²×5. 30=2×3×5. HCF: shared primes are 2 and 5; lower powers give 2¹×5¹=10. LCM: every prime seen is 2, 3, 5; higher powers give 2²×3¹×5¹=60. Notice HCF(10) is smaller than both original numbers, while LCM(60) is larger than both — that size relationship is always true and is a useful sanity check.',
'Simplify the fraction 36/48 to its lowest terms using HCF. From the previous example, HCF(36,48)=12. Dividing both numerator and denominator by 12: 36÷12=3, 48÷12=4. So 36/48 simplifies to 3/4. Check that this is now fully simplified: HCF(3,4)=1, confirming no further simplification is possible.',
'A trader has 24 oranges and 36 mangoes and wants to arrange them into identical gift baskets, using ALL the fruit, with the largest possible number of baskets. Is this an HCF or LCM question, and what is the answer? This is HCF, because we want the LARGEST equal grouping using everything with nothing left over — the classic HCF wording. 24=2³×3, 36=2²×3². Shared primes at lower power: 2² and 3¹. HCF=4×3=12 baskets, each containing 2 oranges and 3 mangoes.'
],
misconceptions:[
'Using the pair method but stopping before reaching the middle, missing factors close to the square root of the number — always continue pairing until the two numbers in a pair meet or cross over each other.',
'In the prime-factor method, taking the HIGHER shared power instead of the lower — this is the LCM rule; for HCF you must always take the LOWER power of each prime that is shared by both numbers.',
'Including a prime that appears in only ONE of the two numbers when calculating HCF — HCF only uses primes common to BOTH numbers; a prime appearing in just one number plays no part in the HCF at all.',
'Confusing which real-life wording signals HCF versus LCM — "largest/longest equal groups from a fixed amount, nothing left over" is always HCF; "when do repeating events next coincide" is always LCM. Misreading this wording is a very common source of using the wrong method entirely on an otherwise correctly-calculated problem.',

'Assuming two numbers must always share a common factor greater than 1 — when the HCF turns out to be exactly 1 (the numbers are "co-prime"), that is a completely valid and meaningful answer, not a sign that something went wrong.'
],
guidedPractice:[
'Find all factors of 40, then find the HCF of 40 and 60.',
'Find the HCF of 54 and 72 using prime factors, and simplify 54/72 using it.',
'Two ropes of 18m and 24m are cut into equal pieces of the greatest possible length, none left over. Which method applies, and what is the answer?'
],
independentPractice:[
'Find all factors of 32 using the pair method.',
'Find the HCF of 18 and 27 by listing factors.',
'Find the HCF of 64 and 96 using prime factors.',
'Simplify 42/56 to lowest terms using HCF.',
'A student says the HCF of 9 and 16 must be more than 1 "because every pair of numbers shares a common factor." Is this correct?',
'Find the HCF of 15, 45 and 60.',
'A shop has 32 pens and 48 pencils, and wants identical packs using everything, with the largest possible number of packs. How many packs, and what\'s in each?',
'For 28 and 42, HCF×LCM should equal 28×42=1176. If HCF=14, what should LCM be to confirm this check?',
'Two drummers beat every 6 and 8 seconds — when do they next beat together? Does this need HCF or LCM?',
'Find the HCF of 100 and 81. What does your answer tell you about these two numbers?',
'A student finds the HCF of 24 and 36 by taking the HIGHEST shared prime power, getting 2³×3²=72. What is the exact error, and the correct HCF?',
'Simplify 96/144 to lowest terms, stating the HCF used.'
],
mastery:{criterion:'Learner finds HCF using both the factor-pair and prime-factor methods, correctly identifies from real-life wording whether a problem needs HCF or LCM, and applies HCF correctly to simplify fractions.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-numbers-and-numeration-whole-numbers-4',classLevel:'JSS1',subject:'Mathematics',
topic:'Counting in Base 2',source:
{authority:'NERDC',url:sourceUrl,page:3},
objectives:['Explain what base two means','Identify the digits used in base two','Group objects repeatedly in twos','State and use binary place values','Count correctly in base two','Explain carrying in binary numbers','Interpret simple binary numerals using place value','Explain the importance of zero in a binary numeral','Identify valid and invalid binary numerals'],
prerequisites:['counting whole objects one at a time','the idea of "grouping" (e.g. counting in tens using bundles)'],
teaching:[
'START HERE — CONNECT BASE TWO TO WHAT YOU ALREADY KNOW. Our everyday number system is base ten. It uses ten digits, 0 to 9, and its place values are 1, 10, 100, 1000 and so on. After 9 we do not invent a new single digit; we regroup and write 10. Base two follows the same place-value idea, but groups in twos instead of tens.',
'1. WHAT A NUMBER BASE MEANS. The base tells us how quantities are grouped and how many digits the system uses. Base ten groups by tens and uses 0–9. Base two groups by twos and uses only two digits: 0 and 1. Base two is also called the binary number system.',
'2. WHY BINARY USES ONLY 0 AND 1. A binary place can contain either zero units of that place or one unit of that place. As soon as two units collect in one place, they are regrouped as one unit in the next place to the left. Therefore the digit 2 is never left inside a correctly written binary numeral.',
'3. GROUPING OBJECTS IN TWOS. Take 5 counters. Pair them: ●●  ●●  ●. There are two pairs and one single. The two pairs can themselves be paired to make one group of four. So 5 consists of one 4, zero 2s and one unit. That pattern is written 101₂. Physical grouping is the foundation of binary counting.',
'4. BINARY PLACE VALUES. Base-ten places grow by multiplying by 10. Binary places grow by multiplying by 2. Starting from the right, binary place values are 1, 2, 4, 8, 16, 32, 64... Each place is twice the value of the place immediately to its right. These are powers of two: 2⁰=1, 2¹=2, 2²=4, 2³=8 and so on.',
'5. READING A BINARY NUMERAL. A digit 1 means that place value is present; a digit 0 means it is absent. For 1011₂, the places are 8,4,2,1. Therefore 1011₂ means one 8, zero 4s, one 2 and one 1: 8+2+1=11. Zero matters because it holds the empty place in the correct position.',
'6. COUNTING IN BASE TWO. Starting at zero: 0₂, 1₂, 10₂, 11₂, 100₂, 101₂, 110₂, 111₂, 1000₂, 1001₂, 1010₂... Do not memorise this as a strange list. At every step we add one, and whenever a place would contain two units we regroup those two into one unit of the next place.',
'7. WHY 1₂ IS FOLLOWED BY 10₂. After 1₂, adding one gives two units. Binary has no digit 2, so those two units become one group of two and zero single units. We write this as 10₂. It is read as one-zero base two, not ordinary ten.',
'8. WHY 11₂ IS FOLLOWED BY 100₂. In 11₂ there is one 2 and one unit. Add another unit: the two units regroup into one 2. We now have two groups of 2, so those regroup again into one group of 4. The result is one 4, zero 2s and zero units: 100₂. This is carrying in base two.',
'9. CHAINED CARRYING. The same idea explains 111₂ → 1000₂. Adding one to the units creates a carry; the 2-place is already occupied so it carries again; the 4-place is also occupied so it carries again. We finish with one 8 and zeros in the smaller places. Multiple carries are simply repeated regrouping in twos.',
'10. THE DOUBLING PATTERN. 1₂ represents 1, 10₂ represents 2, 100₂ represents 4, 1000₂ represents 8 and 10000₂ represents 16. Moving a single 1 one place left doubles its value because each binary place is twice the previous place.',
'11. VALID AND INVALID BINARY NUMERALS. Every digit in a binary numeral must be 0 or 1. Therefore 101₂, 1110₂ and 10001₂ are valid, while 102₂, 210₂ and 1201₂ are not. A digit 2 tells us regrouping has not been completed.',
'12. ZERO AS A PLACEHOLDER. In 101₂, the middle zero means there are no groups of two. It keeps the 1 on the left in the 4-place and the 1 on the right in the units-place. Removing or ignoring a zero can change the value completely.',
'13. CHECKING A BINARY COUNT BY VALUE. To check a simple binary numeral, line its digits up with the binary place values and add the places containing 1. For 1101₂, use 8,4,2,1: 8+4+0+1=13. This helps us understand and verify the count; systematic base-ten-to-binary conversion is treated in the next official topic.',
'14. DO NOT CONFUSE COUNTING WITH THE NEXT TOPIC. The main goal here is to understand grouping in twos, binary digits, binary place value, counting and carrying. The next NERDC topic teaches systematic conversion from base ten to binary. We use simple values here only to explain what the binary count means.',
'15. MASTERY TARGET. You should be able to explain base two in your own words, use only 0 and 1, group objects repeatedly in twos, state the place values 1,2,4,8,16..., count forward correctly, explain carries such as 1₂→10₂ and 111₂→1000₂, interpret simple binary numerals by place value, explain the role of zero and identify invalid binary numerals.'
],
workedExamples:[
'Count out loud in binary from 0 to 8, showing every carry: 0, 1, 10, 11, 100, 101, 110, 111, 1000. Notice every time the rightmost digit would need to become "2" it resets to 0 and carries — from 1 to 10, from 11 to 100, and from 111 to 1000 (a triple carry, since three columns are all full of 1s at once).',
'Group 13 bottle-tops into pairs and describe the result at each doubling level. 13 objects → 6 pairs with 1 left over. The 6 pairs can themselves be grouped into pairs-of-pairs: 3 groups of four, with 1 pair (2 objects) left ungrouped, plus the original 1 leftover single — giving 3 fours + 0 twos + 1 one. Reading this off as a binary numeral (fours-place, twos-place, ones-place): 1101₂. Check: (1×8)+(1×4)+ (0×2)+(1×1)=8+4+0+1=13. Correct.',
'What is the value of 1010₂? Place values right to left: 1, 2, 4, 8. Digits: 1,0,1,0 (reading left to right: eights=1, fours=0, twos=1, ones=0). Value = (1×8)+(0×4)+(1×2)+ (0×1)=8+0+2+0=10.',
'A student writes "12" as a binary numeral. Explain what is wrong with this. Binary only ever uses the digits 0 and 1 — the digit "2" cannot appear in any binary numeral at all, in any position, for any reason. Whatever value was intended, it must be re-expressed using only 0s and 1s, with carries applied wherever a column would otherwise need to hold a 2.',
'What comes immediately after 1011₂ when counting upward by one? Add 1 to the rightmost digit: 1011 + 1. The rightmost column is already 1, so it becomes 0 and carries 1 to the next column. That next column is also 1, so it too becomes 0 and carries again. The next column (a 0) receives the carry and becomes 1, with nothing further to carry. Result: 1100₂. Check by value: 1011₂=11, and 1100₂=12, confirming the count moved forward by exactly one.',
'Two bundles of "four" (from earlier grouping) are combined with one bundle of "two" and one loose single object. What binary numeral represents this, and what is its decimal value? Two bundles of four means the eights-place holds one full bundle-of-eight once combined (2 fours regroup into 1 eight) — so we have: 1 eight, 0 fours (since both fours combined into the eight), 1 two, 1 one. Binary numeral: 1011₂. Value: 8+0+2+1=11.'
],
misconceptions:[
'Writing the digit "2" anywhere in a binary numeral — binary has only two symbols available, 0 and 1; the moment a count reaches "two" in any column, that column must reset to 0 and carry into the next column instead.',
'Reading a binary numeral like "10" and assuming it means the decimal number ten — in binary, "10" means one-zero, which is the value 2 in decimal (one group of two, zero left over), not ten.',
'Forgetting that binary place values DOUBLE moving left (1,2,4,8,16…) and instead assuming they multiply by ten as in decimal — always check by reading the place-value row (ones, twos, fours, eights) before evaluating any binary numeral.',
'Missing a chain of carries when several columns of 1 sit next to each other — adding 1 to 111₂ needs THREE carries in a row (111→1000), not just one; always keep carrying left until you reach a column that was a 0.',
'Grouping the physical objects inconsistently (sometimes into twos, sometimes into different sized bundles) which then produces a binary numeral that does not actually match the true count — always regroup consistently in twos at every level (twos into fours, fours into eights) to get a numeral that correctly represents the total.'
],
guidedPractice:[
'Which sequence correctly counts in binary from 8 to 12?',
'Group 21 objects into twos, fours, eights, sixteens. What binary numeral results, and does it check out?',
'Find the value of 1110₂ by place value.'
],
independentPractice:[
'Find the value of 1001₂.',
'Find the value of 1111₂.',
'Group 17 objects into twos, fours, eights. What binary numeral results?',

'What comes immediately after 1101₂ in the binary counting sequence?',
'What comes immediately after 1111₂, and how many carries happen?',
'A student writes the binary numeral "1021". What exactly is wrong with it?',
'Why is 100₂ worth more than 11₂, even though "100" has a longer string of smaller-looking digits?',
'Find the value of 10000₂, and identify which bundle size this represents.',
'Group 25 objects into twos, fours, eights, sixteens. What binary numeral results?',
'Which list correctly shows the first five binary numerals containing exactly two 1-digits, in increasing order?',
'A student believes binary numbers "waste space" since 1000₂ (four digits) equals only decimal 8. Why is this expected, not a flaw?',
'Group 13 bottle-tops into pairs, then pairs-of-pairs. What binary numeral results?'
],
mastery:{criterion:'Learner counts correctly in binary through at least 20, evaluates a binary numeral to its decimal value by place value, and explains carrying (including multi-column carries) without ever introducing the digit 2.',status:'DEEP_WHEN_PASSED'},boardReady:true
},

{
topicId:'nerdc-jss1-math-numbers-and-numeration-whole-numbers-5',classLevel:'JSS1',subject:'Mathematics',
topic:'Conversion of base 10 numerals to binary numbers',source:
{authority:'NERDC',url:sourceUrl,page:3},
objectives:['Convert base-ten numerals to binary'],
prerequisites:['counting in binary and evaluating a binary numeral by place value (previous topic)','powers of two: 1,2,4,8,16,32…','division with remainders'],
teaching:[
'START WITH THE MEANING. Base ten is our everyday system. Binary is base two and uses only 0 and 1. Grouping objects in twos can introduce the idea, but the standard mathematical methods below are the main methods learners should use.',
'BINARY PLACE VALUES ARE POWERS OF TWO. From right to left they are 2^0, 2^1, 2^2, 2^3, 2^4... which equal 1, 2, 4, 8, 16... A binary digit tells us whether that power of two is present (1) or absent (0).',
'BINARY TO DECIMAL — STANDARD EXPANDED METHOD. Multiply every binary digit by the power of two belonging to its position, then add. Example: 10001₂ = (1×2^4)+(0×2^3)+(0×2^2)+(0×2^1)+(1×2^0) = 16+0+0+0+1 = 17₁₀. This method makes the value of every digit visible.',
'DECIMAL TO BINARY — STANDARD REPEATED-DIVISION METHOD. Divide the decimal number by 2, record the remainder, divide the quotient by 2 again, and continue until the quotient becomes 0. Every remainder is 0 or 1. Read the remainders from BOTTOM TO TOP to obtain the binary numeral.',
'Example with 10₁₀: 10÷2=5 remainder 0; 5÷2=2 remainder 1; 2÷2=1 remainder 0; 1÷2=0 remainder 1. Reading the remainders bottom-to-top gives 1010₂. Therefore 10₁₀=1010₂.',
'WHY BOTTOM-TO-TOP? The first remainder gives the units (2^0) digit, which belongs on the far right. Later remainders represent increasingly higher powers of two, so the last remainder found becomes the leftmost digit.',
'ALWAYS CHECK THE ANSWER. After converting decimal to binary, expand the binary result back using powers of two. For 1010₂: (1×2^3)+(0×2^2)+(1×2^1)+(0×2^0)=8+0+2+0=10₁₀. The original value has returned, so the conversion is correct.',
'For the NERDC 1–10 range the same standard method gives: 1₁₀=1₂, 2₁₀=10₂, 3₁₀=11₂, 4₁₀=100₂, 5₁₀=101₂, 6₁₀=110₂, 7₁₀=111₂, 8₁₀=1000₂, 9₁₀=1001₂, 10₁₀=1010₂. Learners should understand the method rather than memorise this table.',
'COMMON CHECKS. A binary answer can contain only 0 and 1. Zeros in the middle cannot simply be removed because they hold place positions. Do not use decimal place values 1,10,100 when evaluating binary; use 1,2,4,8,16... .',
'MASTERY TARGET. Given a decimal number, the learner can use repeated division by 2 and read remainders bottom-to-top; given a binary numeral, the learner can expand it using powers of two; and the learner can use one direction to verify the other.'
],
workedExamples:[
'Convert 6 to binary using powers of two. Powers available up to 6: 4, 2, 1 (8 is too big to use). Does 4 fit into 6? Yes, use it, remaining = 6−4=2. Does 2 fit into the remaining 2? Yes, use it, remaining = 0. Does 1 fit into 0? No, skip it. Powers used: 4 and 2 only. Binary numeral: 1 1 0 (fours=1, twos=1, ones=0) = 110₂.',
'Convert 10 to binary using the repeated-division TABLE method, shown in full with the reading arrow.\n\n```\n Division Quotient Remainder\n 10 ÷ 2 = 5 0 ──────────────┐\n 5 ÷ 2 = 2 1 ───────────┐ │\n 2 ÷ 2 = 1 0 ───────┐ │ │\n 1 ÷ 2 = 0 1 ──┐ │ │ │\n (stop) │ │ │ │\n READ THE ANSWER GOING UP ↑ the table: 1 0 1 0\n```\nThe FIRST division (10÷2) sits at the TOP of the table but gives the LAST digit (ones-place) of the answer — that is exactly why the arrow points upward: you read the remainder column from the BOTTOM row to the TOP row to get the digits in the correct left-to-right order. Binary numeral: 1010₂. Check by evaluating: (1×8)+ (0×4)+(1×2)+(0×1)=8+0+2+0=10. Correct.',
'Convert 23 to binary using the same table method.\n\n```\n Division Quotient Remainder\n 23 ÷ 2 = 11 1 ──────────────────┐\n 11 ÷ 2 = 5 1 ─────────────┐ │\n 5 ÷ 2 = 2 1 ──────────┐ │ │\n 2 ÷ 2 = 1 0 ───────┐ │ │ │\n 1 ÷ 2 = 0 1 ──┐ │ │ │ │\n (stop) │ │ │ │ │\n READ THE ANSWER GOING UP ↑ the table: 1 0 1 1 1\n```\nBinary numeral: 10111₂. Check: 16+0+4+2+1=23. Correct.',

'A student converts 14 to binary but reads the remainder column TOP-to-bottom instead of following the upward arrow, getting 0111₂ by mistake. Show the correctly filled table and the correct reading direction.\n\n```\n Division Quotient Remainder\n 14 ÷ 2 = 7 0 ───────────┐\n 7 ÷ 2 = 3 1 ──────┐ │\n 3 ÷ 2 = 1 1 ──┐ │ │\n 1 ÷ 2 = 0 1 ─┐ │ │ │\n (stop) │ │ │ │\n WRONG (top→bottom): 0 1 1 1 = 0111 — evaluates to 7, NOT 14. Wrong.\n CORRECT (bottom→top, following ↑): 1 1 1 0 = 1110₂\n```\nCheck the correct answer: (1×8)+(1×4)+(1×2)+(0×1)=8+4+2+0=14. Correct — confirming the arrow direction, not the writing order, decides the true digit order.',
'A simple computer light display can only be ON (1) or OFF (0) for each of 4 bulbs, representing a 4-digit binary numeral. What decimal numbers can be shown with exactly two bulbs lit (two 1-digits and two 0-digits) among four positions? This connects directly to why computers use binary at all: every switch/transistor is naturally a two-state (on/off) device, matching binary’s two digits perfectly. The 4-bulb patterns with exactly two 1s include 1100₂=12, 1010₂=10, 1001₂=9, 0110₂=6, 0101₂=5, 0011₂=3 — six different decimal values are reachable this way, which is exactly why more bulbs (more binary digits, or "bits") let a computer represent more distinct values.',
'Convert 30 to binary using the table method, then verify against the powers-of-two method.\n\n```\n Division Quotient Remainder\n 30 ÷ 2 = 15 0 ──────────────────┐\n 15 ÷ 2 = 7 1 ─────────────┐ │\n 7 ÷ 2 = 3 1 ──────────┐ │ │\n 3 ÷ 2 = 1 1 ───────┐ │ │ │\n 1 ÷ 2 = 0 1 ──┐ │ │ │ │\n (stop) │ │ │ │ │\n READ THE ANSWER GOING UP ↑ the table: 1 1 1 1 0\n```\nBinary numeral: 11110₂. Cross-check with powers of two: 16+8+4+2+0=30. Both methods agree.'
],
misconceptions:[
'Reading the remainder column in the order it was WRITTEN (top to bottom) instead of following the arrow UPWARD (bottom to top) — the table is filled top-to-bottom as you calculate, but must always be READ bottom-to-top for the correct digit order, exactly as shown in the arrow diagram.',
'In the powers-of-two method, skipping straight to smaller powers without first checking whether the largest available power fits — always test powers from largest to smallest, in that strict order, or the decomposition can go wrong.',
'Forgetting to write a 0 for a power of two that was skipped, causing the resulting binary numeral to have too few digits and represent the wrong value entirely — every power position from the largest used down to the ones-place must appear in the answer, with 0s exactly where a power was not used.',
'Confusing repeated division by 2 with repeated division by 10 out of habit — the number you divide by is what defines the base you are converting into; base two conversion must divide by 2 at every single step.',
'Not checking the conversion by converting back — skipping this verification step is exactly how errors like misread remainder order go unnoticed until the wrong answer is already submitted.'
],
guidedPractice:[
'Convert 12 to binary using powers of two.',
'Convert 19 to binary using the division table method.',
'A student converts 15 to binary and gets 1111. Is this correct?'
],

independentPractice:[
'Convert 7 to binary using powers of two.',
'Convert 11 to binary using powers of two.',
'Convert 18 to binary using the division table method.',
'Convert 25 to binary using the division table method.',
'Convert 30 to binary, then verify with the other method. What is the result?',
'A student converts 20 to binary by reading remainders top-to-bottom (not following the arrow) and writes 0101₂. What is the correct binary numeral for 20?',
'Convert 16 to binary. Why is the result a "1" followed only by zeros?',
'Convert 27 to binary using the division table method, and verify by converting back to decimal.',
'List all 8 possible 3-bit binary numerals in order with their decimal values. Which list is correct?',
'Convert 100 to binary using the division table method.',
'Why is a computer\'s memory, built from on/off switches, naturally suited to binary rather than decimal?',
'Convert 50 to binary using powers of two.'
],
mastery:{criterion:'Learner converts decimal numbers to binary correctly using both the powers-of-two and repeated-division-table methods, correctly reads the remainder column bottom-to-top (following the arrow) rather than top-to-bottom, and verifies every conversion by evaluating the result back to decimal.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-numbers-and-numeration-fractions-1',classLevel:'JSS1',subject:'Mathematics',
topic:'Fractions',source:
{authority:'NERDC',url:sourceUrl,page:4},
objectives:['Identify equivalent fractions','Generate equivalent fractions','Order fractions','Convert fractions and decimals both ways','Convert fractions and percentages both ways','Apply equivalent fractions in sharing','Solve quantitative reasoning with equivalent fractions'],
prerequisites:['multiplication and division facts','the meaning of a fraction as "parts out of a whole"','HCF (used to simplify fractions to lowest terms)'],
teaching:[
'Two fractions are EQUIVALENT when they represent the exact same amount, even though they are written with different numbers — 1/2, 2/4 and 3/6 are all the same actual quantity, just cut into a different number of pieces. You generate an equivalent fraction by multiplying (or dividing) BOTH the numerator and denominator by the SAME number — doing it to only one of the two changes the actual value, not just its appearance.',
'Why multiplying top and bottom by the same number keeps the value unchanged: multiplying both parts by, say, 3 is the same as multiplying the whole fraction by 3/3 — and 3/3 equals exactly 1, so you are really just multiplying by 1, which never changes a value’s size, only how many pieces it is cut into.',
'To ORDER fractions (arrange smallest to largest, or the reverse), the safest method is to convert every fraction to the same denominator first, using the LCM of all the denominators, then compare only the numerators directly — once denominators match, a bigger numerator always means a bigger fraction. A faster alternative for just two fractions is cross-multiplication: compare a/b and c/d by comparing a×d against b×c directly, without finding a common denominator at all.',
'A fraction converts to a decimal by dividing the numerator by the denominator (3/4 means literally "3 divided by 4" = 0.75). Converting a decimal BACK to a fraction depends on how many decimal places it has: count the digits after the decimal point, that many zeros go in the denominator after a 1 (0.75 has 2 decimal digits, so it becomes 75/100), then simplify using the HCF of numerator and denominator (HCF(75,100)=25, giving 3/4).',
'A fraction converts to a percentage by multiplying by 100 (which is the same as converting to a decimal first, then shifting the decimal point two places right): 3/4 = 0.75 = 75%. Going the other way, a percentage converts to a fraction by writing it over 100 and then simplifying: 75% = 75/100 = 3/4 (using HCF exactly as before).',
'Fractions of money or shared items work by treating the "whole" as the total amount, and a fraction as a genuine slice of it: finding 3/4 of ₦800 means dividing ₦800 into 4 equal parts (₦200 each) and taking 3 of those parts (₦600). This "divide by the denominator, multiply by the numerator" two-step is the single method behind every fraction-of-an-amount question, whatever the context.'
],
workedExamples:[
'Show that 1/2, 2/4 and 3/6 are equivalent using a bar diagram.\n\n```\n 1/2: ██████████ | ░░░░░░░░░░ (1 part shaded of 2 equal parts)\n 2/4: █████ | █████ | ░░░░░ | ░░░░░ (2 parts shaded of 4 equal parts)\n 3/6: ███|███|███|░░░|░░░|░░░ (3 parts shaded of 6 equal parts)\n```\nAll three bars have exactly the same shaded LENGTH — the pieces are just cut differently — confirming 1/2=2/4=3/6.',
'Find two equivalent fractions for 2/5. Multiply top and bottom by 2: (2×2)/(5×2)=4/10. Multiply top and bottom by 3: (2×3)/(5×3)=6/15. Check both represent the same value as 2/5 by converting all three to decimals: 2/5=0.4, 4/10=0.4, 6/15=0.4 — confirmed equal.',
'Arrange 3/4, 5/8 and 1/2 in ascending order. LCM of denominators 4, 8, 2 is 8. Convert each: 3/4=6/8, 5/8 stays 5/8, 1/2=4/8. Comparing numerators over the same denominator: 4/8 < 5/8 < 6/8. So ascending order: 1/2, 5/8, 3/4.',
'Convert 7/8 to a decimal and then to a percentage. Decimal: 7÷8=0.875. Percentage: 0.875×100=87.5%.',
'Convert 0.35 to a fraction in lowest terms. Two decimal places, so denominator is 100: 35/100. HCF(35,100)=5. Divide both by 5: 35÷5=7, 100÷5=20. Simplified fraction: 7/20.',
'A trader shares ₦1,500 between three workers in the ratio described as "2/5 to the first, and the remainder split equally between the other two." Find each worker’s share. First worker: 2/5 of 1500 = (1500÷5)×2 = 300×2 = ₦600. Remainder: 1500−600=₦900, split equally between two workers: 900÷2=₦450 each. Final shares: ₦600, ₦450, ₦450.',
'A student converts 60% to a fraction and writes 60/10, simplified to 6/1. Identify the error and give the correct answer. A percentage always converts by writing it over 100, not 10 — 60% = 60/100, not 60/10. Correct simplification: HCF(60,100)=20, so 60÷20=3 and 100÷20=5, giving 3/5.'
],
misconceptions:[
'Multiplying only the numerator (or only the denominator) when trying to generate an equivalent fraction — both parts must be multiplied (or divided) by the exact same number, or the value genuinely changes.',
'Comparing fraction sizes by looking at numerators alone, without checking whether the denominators match first — 3/4 and 3/8 both have numerator 3, but they are not equal; denominators must be made the same before numerators can be compared directly.',
'Converting a percentage to a fraction by writing it over 10 instead of 100 — "per cent" literally means "out of 100," so the denominator must always start as 100 before any simplifying.',
'Forgetting to simplify a fraction to lowest terms using its HCF after a conversion, leaving an answer like 75/100 instead of 3/4 — a fraction answer is not considered complete until its HCF with the denominator is 1.',
'In a "fraction of an amount" question, multiplying by the numerator BEFORE dividing by the denominator when the amount does not divide evenly, causing avoidable extra difficulty or rounding errors — dividing by the denominator first usually keeps the numbers smaller and easier to manage.'
],
guidedPractice:[
'Generate two equivalent fractions for 3/7, and verify by decimal conversion.',
'Arrange 2/3, 5/6 and 3/4 in descending order.',
'Find 5/8 of ₦960.'
],
independentPractice:[
'Generate an equivalent fraction for 4/9.',
'Are 6/8 and 9/12 equivalent?',
'Arrange 1/4, 3/10 and 1/5 in ascending order.',
'Convert 5/6 to a decimal (2 d.p.) and a percentage.',
'Convert 0.44 to a fraction in lowest terms.',
'Convert 32% to a fraction in lowest terms.',
'Convert 9/20 to a percentage.',
'A charity shares ₦2,400 so 3/8 goes to school supplies and the rest is split equally among 3 families. How much does each family get?',
'A student says 2/3 is bigger than 3/4 "because 3 is bigger than 2 and 4 is bigger than 3, so it evens out." Which fraction is actually bigger?',
'Convert 5/8 to a percentage, then convert that percentage back to a fraction. Do you return to 5/8?',
'A shop reduces a price by 15%. Express 15% as a fraction, and find the discount on a ₦2,000 item.',
'A student converts 0.6 to a fraction and writes 6/100, simplified to 3/50. What went wrong?'
],
mastery:{criterion:'Learner generates equivalent fractions correctly, orders fractions using a common denominator, converts confidently between fractions/decimals/percentages in both directions with correct simplification via HCF, and solves realistic sharing/money problems.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-basic-operations-1',classLevel:'JSS1',subject:'Mathematics',
topic:'Addition and Subtraction',source:{authority:'NERDC',url:sourceUrl,page:5},
objectives:['Add and subtract numbers up to four digits and state place value of results','Solve word problems involving addition and subtraction','Use a number line to illustrate directed numbers','Add and subtract positive and negative integers on a number line','Apply directed numbers to everyday situations'],
prerequisites:['whole-number place value','basic addition and subtraction facts'],
teaching:['Addition and subtraction extend from whole-number place value into directed numbers. Learners align place values for four-digit calculations, then use zero as the reference point on a number line: positive numbers lie to the right and negative numbers to the left. Addition and subtraction are represented as movement so the direction of each operation is visible rather than memorised.'],
workedExamples:['2468 + 1357 = 3825','4203 - 2786 = 1417','-2 + 5 = 3','3 + (-5) = -2','2 - 6 = -4'],
misconceptions:['misaligning place values','treating a negative sign as decoration','moving in the wrong direction on the number line'],
guidedPractice:['Use the number line to solve directed-number additions and subtractions.'],
independentPractice:['Solve four-digit and directed-number problems and explain the direction of movement.'],
mastery:{criterion:'Learner calculates accurately and represents directed-number operations correctly on a number line.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-basic-operations-2',classLevel:'JSS1',subject:'Mathematics',
topic:'Addition and Subtraction of fractions',source:
{authority:'NERDC',url:sourceUrl,page:6},
objectives:['Solve addition/subtraction of fractions','Solve word problems involving fraction addition/subtraction'],
prerequisites:['equivalent fractions and LCM (previous topics)','converting between mixed numbers and improper fractions'],
teaching:[
'START WITH THE MEANING. A denominator names the size of the equal parts. In 3/7, the whole is divided into 7 equal parts and the numerator 3 says we have 3 of those sevenths. This is why denominators cannot be treated as ordinary numbers to add or subtract.',
'SAME DENOMINATORS FIRST. If the denominators already match, the pieces are already the same size. For 2/7+3/7, read it as 2 sevenths + 3 sevenths = 5 sevenths. Add the numerators 2+3=5 and keep denominator 7: 5/7. Do NOT add the denominators because the piece size is still sevenths.',
'UNLIKE DENOMINATORS NEED EQUAL-SIZED PARTS. In 1/2+1/3, halves and thirds are different-sized pieces, so they cannot yet be counted together. First rename both fractions using one common denominator. Use the LCM because it is the smallest number that both denominators divide exactly.',
'THE STANDARD AVORA CONVERSION METHOD — NO SKIPPED NUMBERS. After finding the LCM, work on EACH fraction ONE AT A TIME. Step 1: divide the LCM by that fraction’s denominator to find HOW MANY TIMES the denominator goes into the LCM. Step 2: multiply that answer by the numerator to obtain the new numerator. Step 3: place that new numerator over the LCM. Repeat these steps for every fraction before adding or subtracting.',
'Example 1/2+1/3. First LCM(2,3)=6. Work on 1/2: ask “How many times does 2 go into 6?” Calculate 6÷2=3. Now multiply this 3 by the numerator 1: 3×1=3. Therefore 1/2=3/6. NEXT work on 1/3: 6÷3=2, so 3 goes into 6 two times. Multiply 2 by numerator 1: 2×1=2. Therefore 1/3=2/6. Only now add: 3/6+2/6=5/6.',
'WHY THAT METHOD WORKS. When 6÷2=3, we must multiply BOTH parts of 1/2 by 3: (1×3)/(2×3)=3/6. Since 3/3=1, we have multiplied the fraction by 1, so its value did not change. The shortcut “LCM ÷ denominator, then × numerator” is therefore an organised way of constructing an equivalent fraction, not a magic rule.',
'FULL UNLIKE-DENOMINATOR EXAMPLE: 2/3+1/4. LCM(3,4)=12. FIRST fraction 2/3: 12÷3=4; 4×2=8; therefore 2/3=8/12. SECOND fraction 1/4: 12÷4=3; 3×1=3; therefore 1/4=3/12. Now the pieces are both twelfths, so add 8+3=11 and keep 12: 11/12.',
'SUBTRACTION USES THE SAME CONVERSION. For 5/6−1/4, LCM(6,4)=12. FIRST 5/6: 12÷6=2; 2×5=10; therefore 5/6=10/12. SECOND 1/4: 12÷4=3; 3×1=3; therefore 1/4=3/12. Now subtract: 10/12−3/12=7/12.',
'THREE OR MORE FRACTIONS — STILL ONE AT A TIME. For 3/4+1/2−1/3, LCM(4,2,3)=12. For 3/4: 12÷4=3, then 3×3=9, so 3/4=9/12. For 1/2: 12÷2=6, then 6×1=6, so 1/2=6/12. For 1/3: 12÷3=4, then 4×1=4, so 1/3=4/12. Only after every conversion is visible do we calculate (9+6−4)/12=11/12.',
'SIMPLIFY THE FINAL ANSWER. Example 2/9+4/9=6/9. HCF(6,9)=3, so divide numerator and denominator by 3: 6÷3=2 and 9÷3=3. Final answer 2/3. Do not assume the learner sees why 6/9 became 2/3; show the HCF and both divisions.',
'MIXED NUMBER TO IMPROPER FRACTION — SHOW WHERE THE NEW NUMERATOR COMES FROM. For 2 3/5, two wholes contain 2×5=10 fifths. Add the existing 3 fifths: 10+3=13 fifths. Therefore 2 3/5=13/5. The compact rule “whole × denominator + numerator” comes from counting all the fractional parts.',
'ADDING MIXED NUMBERS. For 2 1/3+1 1/4, first convert: 2×3+1=7, so 2 1/3=7/3; 1×4+1=5, so 1 1/4=5/4. LCM(3,4)=12. For 7/3: 12÷3=4; 4×7=28, giving 28/12. For 5/4: 12÷4=3; 3×5=15, giving 15/12. Add 28+15=43: 43/12. Since 43÷12=3 remainder 7, final answer 3 7/12.',
'SUBTRACTING MIXED NUMBERS WITH EXCHANGE. For 4 1/5−2 3/5, 1/5 is too small to subtract 3/5 directly. Exchange one whole from 4. One whole in fifths is 5/5, because 5/5=1. So 4 1/5 becomes 3+(5/5+1/5)=3 6/5. Now 3 6/5−2 3/5 gives whole parts 3−2=1 and fraction parts 6/5−3/5=3/5. Final answer 1 3/5. Check by improper fractions if needed.',
'WORD PROBLEMS. First identify what is being combined or removed, write the fraction expression, then use exactly the same method. Do not jump directly from the story to unexplained converted fractions. Every new numerator must be traced through “LCM ÷ denominator, then × numerator.”',
'PERMANENT NO-ASSUMPTION RULE. Whenever AVORA introduces an intermediate number, it must explain where that number came from. A learner should never have to wonder “Why did 6/12 suddenly appear?” Teach the operation that produced it before using it.',
'MASTERY TARGET. The learner can explain why common denominators are necessary; find the LCM; convert EACH fraction explicitly by LCM÷denominator then multiplying that result by the numerator; add/subtract; simplify with HCF; handle mixed numbers and exchanging; and solve word problems without unexplained jumps.'
],
workedExamples:[
'Add 3/8 and 2/8 (matching denominators). Denominators already match, so just add numerators: 3+2=5, keep denominator 8. Result: 5/8.',
'Add 2/3 and 1/4 (different denominators). LCM(3,4)=12. For 2/3: 12÷3=4, then 4×2=8, so 2/3=8/12. For 1/4: 12÷4=3, then 3×1=3, so 1/4=3/12. Now add: 8/12+3/12=11/12. Already in lowest terms (HCF of 11 and 12 is 1), so this is the final answer.',
'Subtract 3/4 from 2½ (a mixed number minus a proper fraction). Convert 2½ to an improper fraction: (2×2+1)/2=5/2. Find a common denominator for 5/2 and 3/4: LCM(2,4)=4. Convert 5/2 explicitly: 4÷2=2, then 2×5=10, so 5/2=10/4. Subtract: 10/4−3/4=7/4. Convert back to a mixed number: 7/4=1¾.',
'A tank is 5/6 full. After some water is used, it is 1/3 full. How much of the tank’s capacity was used, as a fraction? This is 5/6−1/3. LCM(6,3)=6. Convert 1/3 explicitly: 6÷3=2, then 2×1=2, so 1/3=2/6. Subtract: 5/6−2/6=3/6, which simplifies (HCF(3,6)=3) to 1/2. Half the tank’s capacity was used.',
'A recipe needs 2/3 cup of flour and 3/4 cup of sugar. What is the combined amount of flour and sugar? LCM(3,4)=12. For 2/3: 12÷3=4, then 4×2=8, so 2/3=8/12. For 3/4: 12÷4=3, then 3×3=9, so 3/4=9/12. Add: 8/12+9/12=17/12. Since this is improper, convert to a mixed number: 17/12=1 5/12 cups combined.',
'A student adds 1/4 and 1/3 and writes the answer as 2/7 (adding numerators AND denominators straight across). Identify the error and give the correct answer. Denominators cannot simply be added together — they represent piece SIZE, not a quantity to be totalled. Correct method: LCM(4,3)=12. For 1/4: 12÷4=3, then 3×1=3, so 1/4=3/12. For 1/3: 12÷3=4, then 4×1=4, so 1/3=4/12. Add: 3/12+4/12=7/12.'
],
misconceptions:[
'Adding (or subtracting) numerators AND denominators straight across without finding a common denominator first — denominators describe piece size and must match before numerators can be combined at all.',
'Multiplying the two denominators together for a common denominator even when a smaller LCM exists, leading to unnecessarily large numbers and messier simplification — always find the LCM specifically, not just any common multiple.',
'Changing the denominator of only ONE fraction when converting to a common denominator, instead of adjusting both fractions consistently — every fraction in the sum must be rewritten using the SAME new denominator.',
'Trying to combine a mixed number and a fraction without first converting the mixed number to an improper fraction — this leads to accidentally combining whole-number parts and fraction parts incorrectly.',
'Leaving a final answer as an unsimplified or improper fraction when the context calls for a simplified mixed number — always check both simplification (HCF) and whether converting back to a mixed number makes more sense for the question.'
],
guidedPractice:[
'Add 5/6 and 1/4.',
'Subtract 2/5 from 3/4.',
'A jug has 1¾ litres. 2/3 litre is poured out. How much remains?'
],
independentPractice:[
'Add 3/10 and 2/5.',
'Subtract 1/6 from 5/8.',
'Add 1 2/3 and 2 3/4, giving your answer as a simplified mixed number.',
'Subtract 1 1/4 from 3 1/2.',
'A student adds 3/5 and 1/10 and gets 4/15 by adding straight across (numerators and denominators separately). What is the correct answer?',
'A painter uses 2/5 of a tin on one wall and 1/4 of a tin on another. What fraction of a full tin has been used in total?',
'A cloth is 4¾ metres. A piece 1⅝ metres is cut off. How much remains?',
'Add 5/12 and 3/8, in lowest terms.',
'A tank starts 7/8 full. After using 1/4 and then 1/8, how full is it?',
'Subtract 2/9 from 5/6, and confirm your answer is fully simplified.',
'Find the sum of 2 1/3 and 1 5/6, working with whole and fraction parts (not converting to improper fractions first). What is the correct total?',
'A recipe needing 3/4 cup of milk is made at 2/3 of its original size. How much milk is actually needed?'
],
mastery:{criterion:'Learner adds and subtracts fractions with matching and differing denominators using the LCM method, correctly handles mixed numbers (including borrowing), and solves realistic word problems while properly simplifying final answers.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-basic-operations-3',classLevel:'JSS1',subject:'Mathematics',
topic:'Multiplications and Divisions of fractions',source:
{authority:'NERDC',url:sourceUrl,page:6},
objectives:['Multiply fractions','Divide fractions','Solve word problems involving multiplication/division of fractions'],
prerequisites:['addition/subtraction of fractions (previous topic)','converting mixed numbers to improper fractions','simplifying fractions using HCF'],
teaching:[
'BEGIN WITH FRACTION OF A WHOLE NUMBER. For 3/4 of 20, denominator 4 tells us to divide 20 into 4 equal groups: 20÷4=5. Numerator 3 tells us to take 3 of those groups: 5×3=15. Therefore 3/4 of 20=15. This establishes meaning before introducing a multiplication shortcut.',
'The word “of” commonly signals multiplication in fraction problems because 3/4 of 20 means taking three quarters of the quantity 20. Thus 3/4 of 20 can be written 3/4×20. But teach the divide-by-denominator then multiply-by-numerator meaning first so “of means ×” is understood rather than memorised.',
'FRACTION × FRACTION means taking a fraction OF another fraction. For 1/2×3/4, we want half of three quarters. Splitting each of the 4 original parts into 2 smaller equal parts creates 2×4=8 equal parts, while 1×3=3 of those smaller parts are selected. Therefore (1×3)/(2×4)=3/8. This explains why numerator multiplies numerator and denominator multiplies denominator.',
'STANDARD MULTIPLICATION. For 2/3×4/5, multiply numerators explicitly: 2×4=8. Multiply denominators explicitly: 3×5=15. Therefore the product is 8/15. Multiplication does NOT require an LCM because we are taking a fraction of another quantity, not adding or subtracting differently sized pieces.',
'SIMPLIFICATION MUST SHOW ITS SOURCE. For 2/3×3/5, first 2×3=6 and 3×5=15, giving 6/15. HCF(6,15)=3. Divide both: 6÷3=2 and 15÷3=5. Therefore 6/15=2/5. Never jump from 6/15 to 2/5 without showing the common factor and both divisions.',
'CANCELLATION is simplification BEFORE multiplication. In 2/3×3/5, the numerator 3 and denominator 3 share factor 3. Divide each by 3: 3÷3=1 and 3÷3=1. The expression becomes 2/1×1/5=2/5. Cancellation is valid because the removed factor contributes 3/3=1, so the value does not change.',
'Every cancellation must name the common factor and show the division. For 5/6×9/10: HCF(5,10)=5, so 5÷5=1 and 10÷5=2. HCF(9,6)=3, so 9÷3=3 and 6÷3=2. Now multiply 1/2×3/2: 1×3=3 and 2×2=4, giving 3/4. Do not cross out numbers without explaining what they became.',
'MIXED NUMBERS must first become improper fractions. For 1 1/2, one whole contains 2/2; adding 1/2 gives 3/2. Numerically: 1×2=2, then 2+1=3, keep denominator 2. For 2 1/3: 2×3=6, 6+1=7, so 7/3. Then 3/2×7/3; cancel the 3s by 3 to get 1/2×7/1=7/2=3 1/2.',
'NOW BUILD DIVISION FROM ITS MEANING. 12÷3 asks how many groups of 3 fit inside 12. Likewise 1÷1/2 asks how many halves fit inside one whole. Since 1=2/2, two halves fit, so 1÷1/2=2. And 3/4÷1/4 asks how many quarters fit inside three quarters; the answer is 3.',
'A RECIPROCAL is formed by interchanging numerator and denominator. The reciprocal of 2/3 is 3/2; of 5/7 is 7/5. A whole number 4 is 4/1, so its reciprocal is 1/4. A non-zero fraction times its reciprocal equals 1: 2/3×3/2=(2×3)/(3×2)=6/6=1.',
'WHY DIVISION BECOMES MULTIPLICATION BY THE RECIPROCAL. Dividing by c/d asks how many c/d-sized groups fit. Multiplying by d/c reverses the scaling caused by c/d because (c/d)×(d/c)=1. Therefore a/b÷c/d is equivalent to a/b×d/c. This is the principle behind the shortcut; do not introduce “flip and multiply” before reciprocal and division meaning are understood.',
'STANDARD DIVISION METHOD: KEEP the first fraction, CHANGE ÷ to ×, and use the RECIPROCAL of the SECOND fraction. For 3/5÷2/7: keep 3/5; reciprocal of 2/7 is 7/2; therefore 3/5×7/2. Multiply: 3×7=21 and 5×2=10, giving 21/10. Since 21÷10=2 remainder 1, the mixed number is 2 1/10.',
'ONLY THE DIVISOR IS FLIPPED. For 2/3÷4/5, 2/3 remains unchanged. The second fraction 4/5 becomes 5/4. Therefore 2/3×5/4. Never flip the first fraction and never flip both.',
'DIVIDING BY A WHOLE NUMBER. For 3/4÷2, first write 2 as 2/1. Keep 3/4, change ÷ to ×, reciprocal of 2/1 is 1/2. Then 3/4×1/2=(3×1)/(4×2)=3/8. The result also makes sense because splitting three quarters into two equal shares gives three eighths each.',
'WHOLE NUMBER ÷ FRACTION can become larger. For 3÷1/2, ask how many halves fit into 3 wholes. Each whole contains two halves, so 3 wholes contain 6 halves. Algebraically 3=3/1; keep 3/1, change to ×, reciprocal of 1/2 is 2/1: 3/1×2/1=6. Division does not always make a number smaller.',
'DIVIDING MIXED NUMBERS. For 2 1/4÷1 1/2: 2×4=8, 8+1=9, so 2 1/4=9/4. Then 1×2=2, 2+1=3, so 1 1/2=3/2. Keep 9/4; reciprocal of 3/2 is 2/3; calculate 9/4×2/3. Cancel 9 and 3 by 3: 9÷3=3, 3÷3=1. Cancel 2 and 4 by 2: 2÷2=1, 4÷2=2. Result 3/2=1 1/2.',
'APPLICATIONS must be translated before calculating. “2/3 of 24” means 2/3×24; first 24÷3=8, then 8×2=16. “A 3/4 m ribbon cut into 1/8 m pieces” asks how many eighths fit into three quarters, so it is 3/4÷1/8. Explain why the operation matches the story before applying a rule.',
'PERMANENT NO-ASSUMPTION RULE. Every intermediate number must have a visible origin. Every cancellation states the common factor and resulting divisions. Every mixed-number conversion shows whole×denominator+numerator and why. Every reciprocal is identified before use. Every shortcut follows the concept it abbreviates.',
'MASTERY TARGET. Learner explains fraction-of-a-quantity, fraction×fraction, why multiplication needs no LCM, simplification and cancellation, mixed-number conversion, division as “how many fit?”, reciprocal and why it works, keep-change-reciprocal, and real applications without unexplained jumps.'
],
workedExamples:[
'Multiply 2/3 and 3/5 using cancellation. The 3 in the first denominator cancels with the 3 in the second numerator: 2/1 × 1/5 = 2/5. (Without cancelling first: 2×3=6 over 3×5=15, giving 6/15, which simplifies to 2/5 anyway — cancellation just gets there faster.)',
'Find 2/3 of 24 (recognising "of" as multiplication). 2/3×24/1. Cancel: 24 and 3 share a factor of 3, so 24÷3=8, and 3÷3=1: 2/1×8/1=16. Result: 16.',
'Divide 3/4 by 2/5, showing the reciprocal step. 3/4÷2/5 = 3/4×5/2 (flip the second fraction, the divisor). Multiply: (3×5)/(4×2)=15/8. Convert to a mixed number: 15/8=1 7/8.',
'Multiply 1½ and 2⅓, converting each mixed number first. 1½=3/2. 2⅓=7/3. Multiply: 3/2×7/3. Cancel the 3s: 1/2×7/1=7/2=3½.',
'A recipe uses 2/3 cup of oil per batch. How much oil is needed for 5 batches? This is 2/3×5/1 (5 whole batches). Multiply: (2×5)/(3×1)=10/3=3⅓ cups.',
'A ribbon 3/4 metre long is to be cut into pieces each 1/8 metre long. How many complete pieces can be cut? This is asking "how many eighths fit into three-quarters," i.e. 3/4÷1/8. Flip and multiply: 3/4×8/1= (3×8)/(4×1)=24/4=6. Six complete pieces.'
],
misconceptions:[
'Finding a common denominator before multiplying fractions, treating it like addition — multiplication never needs a common denominator; multiply numerators together and denominators together directly.',
'Flipping the FIRST fraction instead of the second (the divisor) when dividing — only the fraction you are dividing BY gets flipped into its reciprocal; the first fraction stays exactly as it is.',
'Treating "of" in a word problem as addition or as a separate unrelated instruction, rather than recognising it as multiplication — whenever "of" connects a fraction to an amount, multiply them.',
'Forgetting to convert a mixed number to an improper fraction before multiplying or dividing, and instead trying to multiply the whole-number part and fraction part separately — this does not give the correct answer for these two operations.',
'Cancelling numerator with numerator, or denominator with denominator, instead of cancelling a numerator with a denominator (from either fraction) — cancellation only works diagonally/across, matching a top number with a bottom number that share a factor.'
],
guidedPractice:[
'Multiply 5/6 and 9/10, using cancellation.',
'Divide 3/5 by 9/20.',
'A tank holds 3/4 of its capacity, described as 2/3 of a bigger tank that holds 60 litres. How many litres are in the first tank?'
],
independentPractice:[
'Multiply 4/9 and 3/8.',
'Multiply 5/7 and 14/15, using cancellation.',
'Divide 5/6 by 2/3.',
'Divide 7/8 by 1/4.',
'Multiply 2½ and 1⅔, converting to improper fractions first.',
'Find 3/5 of 40.',
'A tailor uses 3/8 metre of cloth per shirt. How much cloth is needed for 6 shirts?',
'A rope 5/6 metre long is cut into pieces each 1/12 metre. How many complete pieces?',
'A student divides 2/3 by 4/5 by flipping the FIRST fraction instead of the second, getting 3/2×4/5=6/5. What is the correct answer?',
'A jug is 5/8 full. 2/5 of this remaining juice is poured into a glass. What fraction of the FULL jug is now in the glass?',

'Find the missing fraction: (blank) × 3/4 = 1/2.',
'A worker completes 3/5 of a job in one day. At this rate, how many days for 1 4/5 jobs?'
],
mastery:{criterion:'Learner multiplies and divides fractions accurately (including cancellation and mixed numbers), correctly applies the reciprocal rule for division, recognises "of" as multiplication in word problems, and solves realistic quantity problems.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-derived-operations-1',classLevel:'JSS1',subject:'Mathematics',
topic:'Estimation',source:
{authority:'NERDC',url:sourceUrl,page:7},
objectives:['Estimate dimensions/distances','Estimate capacity and mass','Estimate everyday quantities','Solve quantitative reasoning with estimation'],
prerequisites:['familiarity with standard units (metres, litres, kilograms, minutes)','a sense of common object sizes from everyday life'],
teaching:[
'ESTIMATION means finding a reasonable approximate value without exact measurement. It is not a careless guess. If an ordinary door is about 2 m high, estimates such as 1.9 m or 2 m may be reasonable, while 20 m is not. A useful estimate is supported by evidence, experience, comparison or a known reference.',
'ESTIMATE VERSUS MEASUREMENT. Saying a table is about 1.5 m long without measuring is an estimate. Using a measuring tape and obtaining 1.47 m is a measurement. Estimation is useful when an exact value is unnecessary, equipment is unavailable, a quick decision is needed, or we want to check whether a result is sensible.',
'REFERENCE METHOD. Strong estimation begins with something known. If a metre rule is 1 m and a table appears about one-and-a-half metre rules long, calculate 1×1.5=1.5; estimate the table as about 1.5 m. Never introduce an estimated number without explaining the reference that produced it.',
'AVORA ESTIMATION METHOD: (1) identify the quantity—length, distance, capacity, mass, time or another quantity; (2) choose an appropriate unit; (3) choose a familiar known reference; (4) compare how many references approximately fit; (5) calculate if needed; (6) check whether the result is reasonable.',
'DIMENSIONS describe measurable sizes such as length, width and height. Choose units to match scale: centimetres can suit a pencil, metres a classroom, kilometres a long journey. The number and unit must both make sense.',
'LENGTH EXAMPLE WITH NO JUMP. A 30 cm ruler appears to fit four times along a desk. One ruler=30 cm. Four rulers means 30+30+30+30, equivalently 30×4=120 cm. Since 100 cm=1 m, 120 cm=1.2 m. Thus estimated desk length is about 120 cm or 1.2 m.',
'HEIGHT EXAMPLE. If a nearby person is about 1.5 m tall and a door appears roughly 0.5 m taller, calculate 1.5+0.5=2.0 m. Therefore estimate the door at about 2 m. The reference and comparison must be stated rather than jumping directly to 2 m.',
'DISTANCE describes how far apart positions are. If an average step is about 0.5 m and the learner counts 80 steps, calculate 80×0.5. Since 0.5=1/2, half of 80 is 80÷2=40. Estimated distance is about 40 m. It remains an estimate because individual steps are not exactly 0.5 m.',
'CAPACITY tells how much a container can hold. Common units include mL and L, with 1000 mL=1 L. If a known 500 mL bottle fills a container about four times: 500×4=2000 mL; 2000÷1000=2 L. Estimated capacity is about 2 L.',
'MASS is commonly expressed in grams and kilograms, with 1000 g=1 kg. If a known packet is about 500 g and another object feels twice as heavy, calculate 500×2=1000 g; since 1000 g=1 kg, estimate about 1 kg. Unit choice is part of reasonableness: an ordinary loaded school bag is not sensibly described as 4 g.',
'TIME CAN BE ESTIMATED. If one similar activity takes about 10 minutes and four such activities are required, calculate 10×4=40 minutes. Explain that 40 comes from the reference duration multiplied by the number of comparable activities.',
'AGE CAN BE ESTIMATED by comparison with people of known age, but it is less reliable because appearance varies. This teaches that some quantities can be estimated more accurately than others and uncertainty should be respected.',
'REASONABLENESS CHECK. Always ask “Does my answer make sense?” If a classroom height is reported as 300 m, inspect the unit. Perhaps 300 cm was intended. Since 100 cm=1 m, 300÷100=3 m, which is much more plausible. An unreasonable result should trigger checking, not automatic acceptance.',
'UNITS MATTER. 5 g and 5 kg are not interchangeable. Since 1 kg=1000 g, 5 kg=5000 g. A quantitative estimate normally needs both a number and an appropriate unit.',
'IMPROVING AN ESTIMATE is valid. A first visual estimate of a table may be 2 m. Comparing it with a 1 m rule may show it is about one-and-a-half rule lengths, improving the estimate to 1.5 m. Better evidence should refine the estimate.',
'QUANTITATIVE REASONING EXAMPLE. If a learner estimates each large step as 0.75 m and counts 12 steps across a classroom, calculate 0.75×12. Break 12 into 10+2: 0.75×10=7.5 and 0.75×2=1.5; 7.5+1.5=9. Estimated classroom length is about 9 m.',
'CAPACITY REASONING. If a cup holds about 250 mL and 20 cups fill a bucket, calculate 250×20. Since 250×2=500 and ×20 is ten times ×2, 500×10=5000 mL. Since 1000 mL=1 L, 5000÷1000=5 L. Estimate about 5 L.',
'MASS REASONING. One packet is about 250 g and a box contains 8 similar packets. 250×8=2000 g. Since 1000 g=1 kg, 2000÷1000=2 kg. Estimated total mass is about 2 kg.',
'DO NOT CONFUSE ESTIMATION WITH APPROXIMATION. Looking at an unmeasured table and judging about 1.5 m is estimation. Starting from a known measured value such as 1.47 m and replacing it with a nearby simpler value is approximation. They are related but are separate skills.',
'PERMANENT NO-ASSUMPTION RULE. Every estimate must show where its number came from: identify the quantity, unit and reference; show the comparison; show any multiplication/division or unit conversion one step at a time; then check reasonableness. The learner should be able to answer “How did you arrive at that estimate?”',
'MASTERY TARGET. Learner estimates dimensions/distances, capacity, mass, time and other everyday quantities using realistic references, appropriate units and explicit calculations, then checks each result for reasonableness.'
],
workedExamples:[
'Estimate the height of a classroom door. Using the benchmark that an average adult is about 1.6–1.8m tall, and a door is noticeably taller than a person, a sensible estimate is about 2 metres — not 2 centimetres (far too short) and not 20 metres (absurdly tall for a door).',
'Estimate how many minutes it takes to walk from one end of a school compound to the other, given that a similar walk to the school gate (about 100m) usually takes about 2 minutes. If the compound is roughly twice that length (about 200m), a sensible estimate is about 4 minutes.',
'Estimate the capacity of a bucket, given that a small bottled-water bottle (50cl = 0.5 litres) fills it about 16 times. Capacity ≈ 16×0.5=8 litres.',
'A farmer estimates the length of a field by counting strides: 120 strides at roughly 0.75m per stride. Estimated length: 120×0.75=90m.',

'Estimate the mass of a bag of rice, given that it feels about 4 times heavier than a 1kg bag of sugar you are familiar with. Estimated mass: 4×1kg=4kg.',
'A student estimates a tree’s height as "300 metres" by comparing it to a nearby 2-storey building they think is about 150m tall. Identify what is wrong with this estimate. A typical 2-storey building is closer to 6–8m tall, not 150m — the benchmark itself was wrong, which made the whole estimate unreasonable. Using a more realistic benchmark (a 2-storey building ≈ 7m, and the tree looks about twice as tall) gives a far more sensible estimate of roughly 14m.'
],
misconceptions:[
'Giving an estimate that looks precise (like "37.42 metres") without any real basis — a good estimate should be a sensible ROUND value based on a benchmark, not a falsely precise-looking number.',
'Using the wrong unit scale entirely (estimating a room’s width in millimetres, or a bottle’s capacity in litres when it clearly holds only a small amount) — always choose a unit that matches the actual size of what is being estimated.',
'Accepting an impossible or absurd estimate without a final reasonableness check — always ask "does this actually make sense for something of this kind?" before finalising an estimate.',

'Using an inaccurate or made-up benchmark (like assuming a building is a certain height without any real reference) — estimation is only as good as the benchmark it is built on; use benchmarks you are genuinely confident about.',
'Treating an estimate as if it were an exact measurement once written down — an estimate should always be understood as an approximate, reasonable value, not treated with false confidence in a later calculation.'
],
guidedPractice:[
'Estimate the length of your classroom using stride-counting, showing your benchmark stride length.',
'Estimate the capacity of a water dispenser using a known bottle size as your benchmark.',
'Estimate how long it would take to walk to the school gate, using a benchmark walking time you already know.'
],
independentPractice:[
'Estimate the height of a two-storey building using an adult’s height as a benchmark.',
'Estimate the mass of a school bag using a known 1kg object as a benchmark.',
'Estimate the capacity of a cooking pot using a known cup or bottle size as a benchmark.',
'Estimate the distance from your house to the nearest market, using either walking time or a known landmark distance as your benchmark.',
'A student estimates a pencil is "2 metres long." Identify why this is unreasonable and give a sensible estimate instead.',
'Estimate how many minutes a 500m walk would take, given that a 100m walk takes about 90 seconds.',
'Estimate the mass of a bag of cement, given that it feels about 50 times heavier than a 1kg bag of salt.',
'A student says a classroom holds "5 litres of air." Explain why this unit choice is unreasonable for the situation, and suggest a more sensible unit and rough figure.',
'Estimate the length of a football pitch using stride-counting, if it takes about 130 strides at 0.8m per stride to cross it.',
'Two students estimate the same bottle’s capacity: one says 2 litres, another says 20cl. Given the bottle looks like a standard drinking-water bottle, decide which estimate is more reasonable and explain why.',
'Estimate how many 50cl bottles of water would be needed to fill a 10-litre container.',
'A quantitative-aptitude question asks you to estimate the total cost of 47 items priced at ₦198 each, without an exact calculation. Round both numbers sensibly first, then give your estimate.'
],
mastery:{criterion:'Learner produces estimates using clearly stated, realistic benchmarks, chooses sensible units and magnitudes, and checks every estimate for reasonableness before finalising it.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-derived-operations-2',classLevel:'JSS1',subject:'Mathematics',
topic:'Approximation',source:
{authority:'NERDC',url:sourceUrl,page:8},
objectives:['Approximate addition/subtraction','Approximate multiplication/division','Round to nearest 10,100,1000','Apply approximation in everyday life','Solve quantitative reasoning with approximation'],
prerequisites:['place value of digits within a whole number','Estimation (previous topic, for context on when a rounded value is "sensible")'],
teaching:[
'APPROXIMATION starts with a known value and replaces it with a nearby simpler value at a stated level of accuracy. This differs from estimation: judging an unmeasured door to be about 2 m is estimation; changing a measured 1.87 m to 1.9 m to 1 decimal place is approximation. Use ≈ for approximately equal; do not write 487=500 when 500 is only an approximation.',
'PLACE VALUE COMES FIRST. In 4,582: 2 is units, 8 tens, 5 hundreds and 4 thousands, so 4,582=4,000+500+80+2. In 7.483: 4 is tenths, 8 hundredths and 3 thousandths. A learner must identify the requested place before applying a rounding rule.',
'MEANING OF NEAREST. To round 43 to the nearest 10, compare the neighbouring tens 40 and 50. 43−40=3 while 50−43=7; because 3<7, 43 is closer to 40, so 43≈40. For 48: 48−40=8 and 50−48=2; because 2<8, 48≈50. Teach this meaning before the shortcut.',
'WHY 5 ROUNDS UP. 45 is exactly halfway between 40 and 50 because 45−40=5 and 50−45=5. Under the standard school convention, a midpoint deciding digit of 5 rounds upward, so 45≈50 to the nearest ten. This explains the 0–4 keep / 5–9 increase rule rather than presenting it as magic.',
'ROUNDING METHOD. Step 1 identify the requested place. Step 2 identify the digit immediately to its right; this is the deciding digit. Step 3 if the deciding digit is 0–4, keep the rounding digit; if 5–9, increase it by 1. Step 4 for whole numbers replace all places to the right with zero; for decimal-place rounding remove digits beyond the required place after making the decision. Step 5 check that the result is near the original.',
'NEAREST TEN. For 73, tens digit=7 and deciding units digit=3. Since 3<5, keep 7 and replace units by 0: 73≈70. For 78, tens digit=7 and deciding digit=8. Since 8≥5, 7+1=8 and units becomes 0: 78≈80.',
'NEAREST HUNDRED. For 342, hundreds digit=3 and deciding tens digit=4. Since 4<5, keep 3 and replace tens and units by zeros: 342≈300. For 368, hundreds digit=3 and deciding digit=6. Since 6≥5, 3+1=4; replace tens and units by zeros: 368≈400. The units digit does not make the decision because the tens digit is immediately right of the hundreds place.',
'NEAREST THOUSAND. For 4,382, thousands digit=4 and deciding hundreds digit=3. Since 3<5, keep 4 and replace hundreds, tens and units by zeros: 4,382≈4,000. For 7,650, thousands digit=7 and deciding digit=6; 6≥5, so 7+1=8 and the result is 8,000.',
'CARRYING WHEN THE ROUNDING DIGIT IS 9 must be explicit. For 9,786 to the nearest thousand, thousands digit=9 and deciding hundreds digit=7. Since 7≥5, increase 9 by 1: 9+1=10. That creates the next place-value position, so 9,786≈10,000.',
'DECIMAL ROUNDING. One decimal place means keep the tenths digit and use the hundredths digit to decide. For 6.47: tenths=4, hundredths=7. Since 7≥5, 4+1=5, so 6.47≈6.5 to 1 d.p. For 8.23: tenths=2, hundredths=3; 3<5, so 8.23≈8.2.',
'TWO DECIMAL PLACES means keep through hundredths and use thousandths to decide. For 5.376: tenths=3, hundredths=7, deciding thousandths=6. Since 6≥5, 7+1=8, so 5.376≈5.38 to 2 d.p.',
'DECIMAL CARRYING. Round 4.296 to 2 d.p.: hundredths digit=9 and deciding thousandths=6. Since 6≥5, 9+1=10. Put 0 in the hundredths position and carry 1 to tenths: 2+1=3. Therefore 4.296≈4.30. Keep the final zero because the question requires two decimal places.',
'APPLICATION TO MONEY AND MEASUREMENT. ₦487 to nearest ₦100: hundreds=4, deciding tens=8; 8≥5, so 4+1=5 and ₦487≈₦500. For 12.68 m to 1 d.p.: tenths=6, deciding hundredths=8; 8≥5, so 6+1=7 and 12.68 m≈12.7 m. Units remain attached to the answer.',
'APPROXIMATION CAN SIMPLIFY AND CHECK CALCULATIONS. For 198+304, round to convenient hundreds: 198≈200 and 304≈300, then 200+300=500. Exact answer 502 is close to 500. For 49×21: 49≈50 and 21≈20, so 50×20=1,000; exact 1,029 is reasonably close.',
'APPROXIMATION AS AN ERROR CHECK. If a learner writes 198+304=5,020, first approximate: 198≈200 and 304≈300, giving about 500. Since 5,020 is nowhere near 500, the calculation should be checked. Approximation does not replace an exact calculation when an exact answer is required; it provides a reasonableness check.',
'DO NOT CONFUSE ESTIMATION AND APPROXIMATION. Looking at an unmeasured tree and judging about 6 m is estimation. Measuring it as 6.37 m and reporting 6.4 m to 1 d.p. is approximation. They are related ideas but not identical skills.',
'COMMON ERROR: looking at the wrong digit. For 4,372 to nearest hundred, hundreds digit=3 and the deciding digit immediately right is tens digit=7. Since 7≥5, 3+1=4; tens and units become zero, so 4,372≈4,400. The deciding digit tells what happens to the rounding digit; it is not itself retained.',
'COMMON ERROR: losing place-value zeros. For 3,746 to nearest hundred, hundreds=7 and deciding tens=4. Since 4<5, keep 7 and replace tens and units with zeros: 3,700. Whole-number rounding preserves the size/place value of the number.',
'PERMANENT NO-ASSUMPTION RULE. Every approximation must identify the requested place, name the rounding digit, name the deciding digit, state why that deciding digit causes keep/increase, and show what happens to remaining digits. If carrying occurs, show where the carried 1 comes from. The learner should never wonder why a digit changed.',
'MASTERY TARGET. Learner explains “nearest”, the midpoint convention, rounding to nearest 10/100/1000, decimal-place rounding and carrying, uses ≈ correctly, distinguishes estimation from approximation, and uses approximation to check calculations.'
],
workedExamples:[
'Round 4,647 to the nearest 100. Decision digit (tens place) = 4, which is below 5. Hundreds digit (6) stays the same. Result: 4,600.',
'Round 37,486 to the nearest 10, then the nearest 100, then the nearest 1,000, showing the different decision digit each time. Nearest 10: decision digit is ones (6), which is 5 or more, so tens rounds up from 8 to 9: 37,490. Nearest 100: decision digit is tens (8), which is 5 or more, so hundreds rounds up from 4 to 5: 37,500. Nearest 1,000: decision digit is hundreds (4), which is below 5, so thousands digit (7) stays: 37,000.',
'Estimate 398+603 by rounding each number to the nearest hundred first, then compare to the exact answer. Rounded: 400+600=1,000. Exact: 398+603=1,001. The estimate (1,000) is very close to the exact answer (1,001), confirming the exact calculation is very likely correct.',
'Estimate 49×21 by rounding each number to the nearest ten first. Rounded: 50×20=1,000. (Exact answer: 49×21=1,029, which is reasonably close to the estimate, confirming no major error.)',
'A trader buys 203 items at approximately ₦48 each. Estimate the total cost by rounding sensibly, then state what the exact cost calculation would involve. Rounded: 200×50=₦10,000. This estimate tells the trader to expect a total "around ten thousand naira" before doing the precise multiplication (203×48=₦9,744), and confirms that figure is reasonable.',
'A student calculates 587−294 and gets 892 (having accidentally added instead of subtracted partway through). Show how rounding can catch this mistake immediately. Rounded estimate: 600−300=300. The student’s answer of 892 is wildly different from the expected "around 300," immediately signalling an error before checking the detailed working. (Correct answer: 587−294=293, matching the estimate well.)'
],
misconceptions:[
'Rounding every digit in a number independently, instead of identifying ONE correct decision digit and rounding only the target place based on it — only one digit ever decides whether to round up or stay, and everything after it becomes zero.',
'Rounding from the wrong place — e.g. looking at the hundreds digit when asked to round to the nearest 10 — always match the decision digit to the place immediately to the RIGHT of the place being rounded to.',
'Reporting an approximate/estimated answer as if it were exact, without using "≈" or stating it is approximate — an estimate and an exact answer carry different levels of certainty and must be labelled differently.',
'Assuming a number that ends in exactly the target place value (like rounding 4,650 to the nearest 100 when the decision digit is exactly 5) has no clear rule — a decision digit of exactly 5 still rounds UP, following the same "5 or more rounds up" rule as any digit above 5.',
'Using approximation as a replacement for doing the exact calculation, rather than as a CHECK on it — approximation estimates whether an exact answer is reasonable; it does not replace the need to calculate the exact answer when one is required.'
],
guidedPractice:[
'Round 82,349 to the nearest 10, nearest 100, and nearest 1,000, identifying the decision digit each time.',
'Estimate 2,987+4,112 by rounding each number to the nearest thousand, then compare to the exact sum.',
'A shop estimates the cost of 19 items at approximately ₦205 each by rounding first. Show the rounded estimate, then calculate the exact cost and compare.'
],
independentPractice:[
'Round 6,382 to the nearest 100.',
'Round 149,750 to the nearest 1,000.',
'Round 3,995 to the nearest 10, and explain why the hundreds digit changes as a result.',
'Estimate 512+289 by rounding to the nearest hundred, then find the exact sum and compare.',
'Estimate 78×31 by rounding each number to the nearest ten, then compare to the exact product.',
'Estimate 4,890÷48 by rounding sensibly, then explain your reasoning for the chosen rounding.',
'A student rounds 6,500 to the nearest 1,000 and gets 6,000, saying "5 stays the same, it doesn’t round up." Identify the error and give the correct rounded value.',
'A trader buys 98 sacks of rice at approximately ₦24,750 each. Estimate the total cost by rounding both numbers sensibly, and state the approximate total.',
'A student calculates 703−198 and gets 905. Use rounding to show this answer must be wrong, and find the correct exact answer.',
'Round 999 to the nearest 10, then to the nearest 100, and explain why both cases result in a change to more than one digit.',
'Estimate the total distance of a journey made up of three legs measuring 187km, 96km and 214km, by rounding each to the nearest ten before adding.',
'A quantitative-aptitude problem states a school has 3,847 pupils, and asks for this number rounded to the nearest thousand for a report. Give the rounded figure and explain, in one sentence, why a report might prefer this rounded value over the exact number.'
],
mastery:{criterion:'Learner correctly identifies the decision digit for any requested rounding place, rounds accurately to the nearest 10/100/1000, and uses rounding to estimate and sanity-check the results of addition, subtraction, multiplication and division.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-derived-operations-3',classLevel:'JSS1',subject:'Mathematics',
topic:'Addition of numbers in base 2 numerals',source:
{authority:'NERDC',url:sourceUrl,page:9},
objectives:['Add two or three 3-digit binary numbers'],
prerequisites:['counting and place value in binary (earlier topics)','converting between binary and decimal to check answers'],
teaching:[
'Binary addition has only FOUR possible single-column facts, and knowing them cold makes every binary sum mechanical: 0+0=0, 0+1=1, 1+0=1, and 1+1=10₂ (which is "carry 1, write 0" — exactly the same carrying idea as 9+1=10 in decimal, just triggered at a much lower total). If three 1s are being added in one column (two digits plus a carried-in 1), the fact becomes 1+1+1=11₂ (carry 1, write 1).',
'Line up binary numerals by place value exactly as you would decimal numbers — ones under ones, twos under twos, fours under fours — then add column by column starting from the RIGHT (the ones column), carrying into the next column to the left whenever a column’s total reaches 2 or more.',
'The reason binary carries so much more often than decimal is simply that its "carry trigger" (2) is much smaller than decimal’s (10) — a column doesn’t need many 1s at all before it overflows, which is exactly why binary sums often show several carries even for small-looking numbers.',
'A carry can itself trigger ANOTHER carry if the next column was already going to total 2 or more even before the incoming carry is added — always add the carried-in digit to that column’s two original digits (up to three numbers being summed in one column) before deciding whether that column also needs to carry onward.',
'The single most reliable way to catch a binary addition mistake is to convert every number involved (both operands and the final result) into decimal, and check that the decimal sum matches. If 101₂+011₂ is claimed to equal 1000₂, converting confirms: 101₂=5, 011₂=3, 1000₂=8, and 5+3=8 — matching, so the binary addition is verified correct.',
'Binary addition never introduces the digit 2 anywhere in a correctly worked answer — if a "2" ever appears while adding, that column’s carry was not applied, and the working must be redone from that column onward.'
],
workedExamples:[
'Add 101₂ and 011₂, shown as a column diagram with carries marked above.\n\n```\n carry: 1 1 1\n 1 0 1\n + 0 1 1\n -----------\n 1 0 0 0\n```\nOnes: 1+1=10₂ → write 0, carry 1. Twos: 0+1+1(carry)=10₂ → write 0, carry 1. Fours: 1+0+1(carry)=10₂ → write 0, carry 1 into a new eights column. Result: 1000₂. Verify: 5+3=8, and 1000₂=8. Matches.',
'Add 111₂ and 001₂, showing a triple carry. Ones column: 1+1=10₂, write 0, carry 1. Twos column: 1+0+1(carry)=10₂, write 0, carry 1. Fours column: 1+0+1(carry)=10₂, write 0, carry 1 into a new eights column. Result: 1000₂. Verify: 111₂=7, 001₂=1, 7+1=8, and 1000₂=8. Matches.',
'Add three 3-digit binary numbers at once: 101₂+110₂+011₂, using the 1+1+1=11₂ fact where needed. Ones column: 1+0+1=10₂, write 0, carry 1. Twos column: 0+1+1+1(carry)=11₂, write 1, carry 1. Fours column: 1+1+0+1(carry)=11₂, write 1, carry 1 into a new eights column. Result: 1110₂. Verify: 101₂=5, 110₂=6, 011₂=3, total=14, and 1110₂=14. Matches.',
'A student adds 011₂ and 001₂ and writes 012₂ as the answer. Identify the exact error and give the correct result. The digit "2" can never appear in a binary answer — the ones column (1+1) should have produced a carry: 1+1=10₂, write 0, carry 1. Redoing: ones=0 carry 1, twos=1+0+1(carry)=10₂, write 0, carry 1 into fours. Correct result: 100₂. Verify: 011₂=3, 001₂=1, 3+1=4, and 100₂=4. Matches.',
'Add 110₂ and 110₂ (identical numbers). Ones: 0+0=0. Twos: 1+1=10₂, write 0, carry 1. Fours: 1+1+1(carry)=11₂, write 1, carry 1 into eights. Result: 1100₂. Verify: 110₂=6, 6+6=12, and 1100₂=12. Matches.',
'A checksum system on a small device adds two 3-bit binary readings, 011₂ and 101₂, to detect overflow. Perform the addition and state whether the result fits back into 3 bits. Ones: 1+1=10₂, write 0, carry 1. Twos: 1+0+1(carry)=10₂, write 0, carry 1. Fours: 0+1+1(carry)=10₂, write 0, carry 1 into eights. Result: 1000₂ (4 bits) — this does NOT fit back into 3 bits, since it needs an eights-place digit; this is exactly what "overflow" means in a fixed-width binary system.'
],
misconceptions:[
'Writing the digit "2" anywhere in a binary sum instead of carrying — the moment a column totals 2, it must become 0 with a carry of 1 into the next column; "2" is never a valid digit in the final answer.',
'Forgetting a carry entirely, especially when it is generated deep in the calculation and needs to ripple into a brand-new column that didn’t exist in either original number — always check whether the final carry needs an extra column added to the left.',
'Misaligning the columns of the two binary numbers being added, especially when they have different numbers of digits — always right-align by place value, padding the shorter number with leading zeros if needed.',
'Applying the decimal carry threshold (carry when a column reaches 10) instead of the binary threshold (carry when a column reaches 2) — the two systems carry at completely different points.',
'Not verifying the result by converting to decimal, allowing an unnoticed carry error to go undetected — always check operand-plus-operand equals result, in decimal, as a final step.'
],
guidedPractice:[
'Add 101₂+110₂, showing every carry, then verify your answer by converting all values to decimal.',
'Add three numbers: 011₂+010₂+001₂, showing every column addition.',
'A student claims 111₂+111₂=1112₂. Identify the error and find the correct answer.'
],
independentPractice:[
'Add 100₂ and 011₂.',
'Add 110₂ and 101₂.',
'Add 111₂ and 011₂.',
'Add three numbers: 100₂+101₂+010₂.',
'A student adds 011₂ and 010₂ and gets 021₂. Identify the exact error and give the correct answer.',
'Add 101₂ and 101₂, then verify your answer by converting all values to decimal.',
'Add 011₂+011₂+011₂ (three identical numbers), showing every carry clearly.',
'A 3-bit sensor reading of 110₂ is added to another reading of 011₂. Perform the addition and state whether the result overflows beyond 3 bits.',
'Add 001₂ and 001₂ and 001₂ and 001₂ (four numbers), tracking carries across all columns.',
'Find the missing binary numeral: 101₂ + ___ = 1000₂.',
'Add 110₂ and 001₂, and explain in one sentence why this particular addition requires no carrying at all.',
'A student is confident that binary addition "always needs at least one carry." Find one example of a binary addition with NO carries at all to show this is not true.'
],
mastery:{criterion:'Learner adds two or three 3-digit binary numbers accurately, correctly handles single and chained carries, never introduces the digit 2, and verifies results by decimal conversion.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-derived-operations-4',classLevel:'JSS1',subject:'Mathematics',

topic:'Subtraction of numbers in base 2 numerals',source:
{authority:'NERDC',url:sourceUrl,page:9},
objectives:['Subtract two 3-digit binary numbers'],
prerequisites:['binary addition (previous topic)','borrowing in decimal column subtraction'],
teaching:[
'Binary subtraction has three simple single-column facts: 0−0=0, 1−0=1, 1−1=0. The tricky case, exactly as in decimal, is when you need to subtract a bigger digit from a smaller one in the SAME column (0−1) — that is when borrowing is required.',
'When borrowing is needed, take 1 unit from the next column to the LEFT (reducing that column’s digit by 1), and that borrowed unit becomes worth "10₂" (which is 2, not ten!) in the current column. So a 0 that needed to become "1" to allow subtraction actually becomes 10₂, and 10₂−1=1.',
'This is the exact same idea as decimal borrowing — where a 0 borrows to become "10" (worth ten) — the ONLY difference is that in binary, a borrowed unit is worth 2, not 10, because binary places are grouped by twos, not tens.',
'Borrowing across a ZERO (when the very next column to the left is also 0, so it has nothing to lend either) requires the borrow to ripple further left, exactly as in decimal subtraction like 1000−1: the immediate neighbour becomes a full borrowed value only after ITS neighbour lends to it first, so the "0 becomes borrowed" chain can travel several columns before finding a column with a genuine 1 to lend.',
'Verification for binary subtraction works two ways, and using both catches almost any mistake: convert both numbers and the result to decimal and check the subtraction holds true there; OR add the result back to the number that was subtracted and confirm you return to the original starting number (since subtraction and addition undo each other).',
'A correctly worked binary subtraction never needs any digit other than 0 or 1 in its final answer — if the working temporarily uses "2" as a borrowed placeholder mid-calculation, that 2 must always be resolved down to a proper binary result (2−1=1, or similar) before the final answer is written.'
],
workedExamples:[
'Subtract 011₂ from 110₂, shown as a column diagram with borrows marked above.\n\n```\n borrow: 1(←2) 1(←2)\n 1 1 0\n - 0 1 1\n --------------\n 0 1 1\n```\nOnes: 0−1, borrow from twos (worth 2 here): 2−1=1. Twos: (now 0 after lending)−1, borrow from fours: 2−1=1. Fours: (now 0 after lending)−0=0. Result: 011₂. Verify: 6−3=3, and 011₂=3. Matches.',
'Subtract 001₂ from 101₂, a simpler case. Ones: 1−1=0. Twos: 0−0=0. Fours: 1−0=1. Result: 100₂. Verify: 101₂=5, 001₂=1, 5−1=4, and 100₂=4. Matches.',
'Subtract 0011₂ from 1000₂, requiring a borrow chain across two zeros (exactly like 1000−1 in decimal). Ones: 0−1, needs borrowing, but the twos and fours columns are also 0, so the borrow must travel all the way to the eights column. Borrow one unit from the eights column (1→0), which becomes worth 10₂=2 in the fours column; the fours column lends its 1 (of that 2) onward to the twos column as a borrow, becoming worth 10₂=2 there; the twos column lends onward to ones, becoming 10₂=2 there. Now: ones=10₂−1=1, twos=1(remaining after lending)−1=0, fours=1(remaining after lending)−0=1, eights=0. Result: 0101₂. Verify: 1000₂=8, 0011₂=3, 8−3=5, and 0101₂=5. Matches.',
'A student subtracts 010₂ from 100₂ and writes 112₂ by treating a borrow as decimal ten instead of binary two. Identify the exact error and give the correct answer. Ones: 0−0=0. Twos: 0−1, needs borrowing from fours (1→0), becoming 10₂=2 in twos: 2−1=1. Fours: 0−0=0. Correct result: 010₂, NOT 112₂ — the borrowed value is worth 2 in binary, never 10.',
'Subtract 101₂ from 111₂. Ones: 1−1=0. Twos: 1−0=0. Fours: 1−1=0. Result: 010₂. Verify: 111₂=7, 101₂=5, 7−5=2, and 010₂=2. Matches.',
'Verify a binary subtraction using the "add back" method: given 110₂−011₂=011₂, confirm this by adding the result back to the subtracted number. 011₂(result)+011₂(what was subtracted)=? Ones:1+1=10₂ write0 carry1. Twos:1+1+1=11₂ write1 carry1. Fours:0+0+1=1. Result: 110₂ — which matches the original starting number, confirming the subtraction was correct.'
],
misconceptions:[
'Treating a borrowed unit as worth "10" (decimal ten) instead of "10₂" (which is 2 in decimal) — in binary, anything borrowed is always worth exactly 2 in the column it lands in, never 10.',
'Failing to continue the borrow chain across a column that is also 0 and has nothing to lend — the borrow must travel further left until it reaches a column holding a genuine 1 to lend from.',
'Forgetting to reduce the LENDING column’s digit by 1 after it lends — a column that lends a unit must have its own value decreased by exactly 1, just like in decimal borrowing.',
'Subtracting a larger digit from a smaller one within a single column without borrowing at all (e.g. writing 0−1=1 instead of properly borrowing) — a column can never be subtracted "the wrong way round" to force a positive-looking result; borrowing must actually happen.',
'Not verifying the answer either by decimal conversion or by adding the result back to the subtracted number — skipping verification is exactly how a mid-calculation borrowing slip goes unnoticed.'
],
guidedPractice:[
'Subtract 010₂ from 111₂, showing any borrowing needed, then verify by decimal conversion.',
'Subtract 0011₂ from 1000₂ again with different numbers: subtract 0001₂ from 1000₂, showing the full borrow chain.',
'Verify that 101₂−010₂=011₂ is correct by adding 011₂ back to 010₂ and checking you return to 101₂.'
],
independentPractice:[
'Subtract 001₂ from 100₂.',
'Subtract 011₂ from 101₂.',
'Subtract 010₂ from 110₂.',
'Subtract 0111₂ from 1000₂, showing the full borrow chain across the zeros.',
'A student subtracts 001₂ from 010₂ and writes the answer as 0−2=... treating it as needing a borrow of ten. Identify the error and give the correct binary result.',
'Subtract 101₂ from 111₂, then verify by adding your result back to 101₂.',
'Subtract 0101₂ from 1001₂.',
'A sensor reading drops from 110₂ to a new value after losing 011₂ worth of charge. Find the new reading.',
'Subtract 011₂ from 011₂, and explain in one sentence why no borrowing is needed here.',
'Find the missing binary numeral: 101₂ − ___ = 010₂.',
'Subtract 0011₂ from 1010₂, showing every column clearly.',
'A student believes binary subtraction "always needs at least one borrow, just like binary addition always needs at least one carry." Find one example with NO borrowing at all to test this claim.'
],
mastery:{criterion:'Learner subtracts two binary numerals correctly, applies borrowing (including chained borrowing across zeros) with the correct binary borrow value of 2, and verifies results by decimal conversion or by adding back.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-basic-operations-derived-operations-5',classLevel:'JSS1',subject:'Mathematics',
topic:'Multiplication of numbers in base 2 numerals',source:
{authority:'NERDC',url:sourceUrl,page:9},
objectives:['Multiply two 2-digit binary numbers'],
prerequisites:['binary addition (needed to combine partial products)','long multiplication method in decimal (the same shift-and-add structure)'],
teaching:[
'Binary multiplication facts could not be simpler: 0×0=0, 0×1=0, 1×0=0, and 1×1=1. There is no "carrying" fact needed at the single-digit multiplication level at all — every single-digit product is either 0 or exactly copies the other digit.',
'Multiplying a multi-digit binary numeral by a multi-digit binary numeral uses the exact same "long multiplication" structure as decimal: multiply the top number by EACH digit of the bottom number separately (producing a row of "partial products"), shifting each successive row one place further LEFT, then ADD all the partial product rows together at the end using binary addition.',
'Because each binary digit of the multiplier is either 0 or 1, each partial product row is either "all zeros" (when that multiplier digit is 0) or "an exact copy of the top number, shifted" (when that multiplier digit is 1) — there is no need to actually multiply digit-by-digit within a row the way decimal sometimes requires; you simply copy or skip the whole top number for each row.',
'The LEFT SHIFT for each successive partial-product row exists for the same reason it does in decimal: multiplying by the tens-digit of a decimal multiplier really means multiplying by ten times that digit, which shifts the result one place left; in binary, multiplying by the twos-digit of the multiplier really means multiplying by two times that digit, shifting one place left in exactly the same way.',
'Once every partial product row has been written (with correct shifting and correct zero-rows skipped or included), add all the rows together using the standard binary ADDITION method from the previous topic, including all necessary carries — this final addition step is very often where mistakes actually happen, not the multiplication step itself.',
'Verification works the same way as for addition and subtraction: convert both original numbers and the final result into decimal, and confirm the decimal multiplication matches. This is especially valuable here since binary multiplication genuinely combines two earlier skills (multiplication logic and addition of partial products), so an error could hide in either stage.'
],
workedExamples:[
'Multiply 10₂ by 11₂, shown as a partial-products column diagram (exactly like decimal long multiplication).\n\n```\n 1 0 ← top number (10₂)\n × 1 1 ← multiplier (11₂)\n ---------\n 1 0 ← row 1: ones-digit(1) × top, unshifted\n 1 0 ← row 2: twos-digit(1) × top, shifted ONE place left\n ---------\n 1 1 0 ← add the two rows (binary addition)\n```\nResult: 110₂. Verify: 10₂=2, 11₂=3, 2×3=6, and 110₂=6. Matches.',
'Multiply 11₂ by 11₂. Top number: 11₂. Multiplier digits: 1 and 1. Row 1 (ones-digit is 1): copy 11₂ unshifted → 011. Row 2 (twos-digit is 1): copy 11₂ shifted one place left → 110. Add: 011+110. Ones:1+0=1. Twos:1+1=10₂, write0 carry1. Fours:0+1+1(carry)=10₂, write0 carry1 into eights. Result: 1001₂. Verify: 11₂=3, 3×3=9, and 1001₂=9. Matches.',
'Multiply 01₂ by 10₂, including a zero-multiplier-digit row. Top number: 01₂. Multiplier digits: 0 (ones) and 1 (twos). Row 1 (ones-digit is 0): entire row is 00 (skip/zero row). Row 2 (twos-digit is 1): copy 01₂ shifted one place left → 010. Add: 00+010=010₂. Result: 10₂ (dropping the leading zero). Verify: 01₂=1, 10₂=2, 1×2=2, and 10₂=2. Matches.',
'A student multiplies 10₂ by 10₂ and, forgetting to shift the second partial product row, adds 10+10 instead of 10+100. Identify the error and find the correct answer. The multiplier’s twos-digit row must be shifted one place LEFT before adding, since it represents multiplying by "two times" that digit, not "one times." Correct working: Row1 (ones-digit 0): 00. Row2 (twos-digit 1, shifted): 100. Add: 00+100=100₂. Verify: 10₂=2, 2×2=4, and 100₂=4. Matches (the student’s unshifted mistake would have given 10+10=100 by coincidence in THIS case — try 11×11 to see the shift genuinely matters, as shown in Example 2).',
'Multiply 11₂ by 10₂. Top: 11₂. Multiplier digits: 0 (ones), 1 (twos). Row1 (ones-digit 0): 000. Row2 (twos-digit 1, shifted left one place): 110. Add: 000+110=110₂. Verify: 11₂=3, 10₂=2, 3×2=6, and 110₂=6. Matches.',
'Two binary sensor multipliers, 01₂ and 11₂, are combined by multiplication in a simple calculator circuit. Find the result and verify it in decimal. Top:01₂. Multiplier digits:1(ones),1(twos). Row1(ones-digit1): 01 unshifted. Row2(twos-digit1, shifted): 010. Add: 001+010=011₂. Verify: 01₂=1, 11₂=3, 1×3=3, and 011₂=3. Matches.'
],
misconceptions:[
'Forgetting to shift each successive partial-product row one place further left — the row for the twos-digit of the multiplier must be shifted, exactly as the "tens row" is shifted one place in decimal long multiplication.',
'Using decimal multiplication carrying rules inside a single-digit binary multiplication fact — there is no carrying at the single-digit multiplication stage in binary at all; every single-digit product is simply 0 or a copy of the other digit.',
'Skipping the zero-row entirely from the addition instead of correctly treating it as an all-zero row that contributes nothing — either approach gives the same final sum, but dropping it without realising why can cause confusion on more complex multiplications with more digits.',
'Making an addition error when combining the partial-product rows at the final step — this is the most common source of a wrong final answer, since the multiplication logic itself is simple; always apply the full binary addition method (with carries) carefully here.',
'Not verifying the final result by decimal conversion — since binary multiplication has two stages (building rows, then adding them), an error can hide in either stage without a decimal cross-check.'
],
guidedPractice:[
'Multiply 10₂ by 11₂ using the partial-products method, showing the shift on the second row.',
'Multiply 11₂ by 01₂, and verify your answer by converting to decimal.',
'A student multiplies 11₂ by 11₂ and forgets to shift the second row, adding 11+11 instead of 11+110. Find the wrong answer they would get, and the correct answer.'

],
independentPractice:[
'Multiply 01₂ by 01₂.',
'Multiply 10₂ by 01₂.',
'Multiply 11₂ by 10₂.',
'Multiply 11₂ by 11₂, showing every partial product row and the final addition.',
'A student multiplies 10₂ by 11₂ and gets 100₂ (forgetting a shift). Identify the specific step where they went wrong and give the correct answer.',
'Multiply 01₂ by 11₂, and verify your answer by decimal conversion.',
'List every possible product of two 2-digit binary numbers (there are only a few: 00,01,10,11 multiplied by each other) and identify which pairs give a result that still fits in 2 digits.',
'Multiply 10₂ by 10₂, and explain in one sentence why the result needs an extra digit (place) compared to either original number.',
'A calculator circuit needs to multiply the binary readings 11₂ and 01₂. Find the result.',
'Find the missing binary numeral: 10₂ × ___ = 110₂.',
'Multiply 11₂ by 11₂ a second way — by first converting both to decimal, multiplying, then converting the decimal result back to binary — and confirm it matches your partial-products answer.',
'A student claims that binary multiplication never needs a shift when both multiplier digits are the same (like 11×11). Test this claim directly using the worked method and explain whether it is true.'
],
mastery:{criterion:'Learner multiplies two 2-digit binary numbers correctly using shifted partial products, adds the partial products accurately using binary addition, and verifies results by decimal conversion.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-algebraic-processes-algebraic-operations-1',classLevel:'JSS1',subject:'Mathematics',
topic:'Use of symbols',source:
{authority:'NERDC',url:sourceUrl,page:10},
objectives:['Solve open sentences','Relate addition/subtraction and multiplication/division','Use letters for unknown symbols/shapes','Solve two-operation open sentences','Translate/solve word problems with symbols','Solve quantitative aptitude symbol problems'],
prerequisites:['the four basic operations and their inverses','addition/subtraction of directed numbers (needed once solving crosses zero)'],
teaching:[
'An open sentence is a mathematical statement with a MISSING value, shown as a blank, a shape (□, △), or a letter — □+5=12 and n+5=12 are exactly the same statement, just written with a different symbol standing in for "the unknown number." Whatever symbol is used, it represents one specific number that makes the whole statement true, and solving means finding that number.',
'The key tool for solving any open sentence is the INVERSE operation — the operation that undoes another. Addition and subtraction undo each other; multiplication and division undo each other. To find the missing number, apply the inverse of whatever operation is shown, to the number on the other side.',
'For □+5=12: since addition of 5 was applied, undo it with subtraction of 5 from the other side: □=12−5=7. For □×2=22: since multiplication by 2 was applied, undo it with division by 2: □=22÷2=11. Recognising WHICH operation is shown, and applying its correct inverse, is the entire method — nothing more mysterious is happening.',
'When the missing symbol is in a subtraction or division position ITSELF (like 16÷□=8, where the unknown is the number being divided BY, not the result), the same inverse-operation idea still applies, but you must think carefully about which quantity is missing: 16÷□=8 means "16 divided by what gives 8?" — rearranging using the relationship between division and multiplication: □=16÷8=2.',
'A statement with TWO operations (like 2□−5=12) is solved by undoing the operations in REVERSE of the order they were applied — exactly like undressing in reverse order to how you got dressed. Here, 5 was subtracted LAST, so undo that FIRST (add 5 to both sides: 2□=17), then 2 was multiplied FIRST (applied before the subtraction), so undo that SECOND (divide both sides by 2: □=8.5).',
'A word problem becomes an open sentence by carefully translating its wording into symbols, one phrase at a time, before attempting to solve anything: "eight more than a number is eleven" becomes □+8=11 (not 8+□=11 written the "wrong way round" in meaning, though mathematically both give the same equation here — the translation habit matters far more once problems get more complex).'
],
workedExamples:[
'Solve □−5=8. Undo subtraction of 5 by adding 5 to the other side: □=8+5=13. Check: 13−5=8. Correct.',
'Solve 2+n=11. Undo addition of 2 by subtracting 2 from the other side: n=11−2=9. Check: 2+9=11. Correct.',
'Solve 16÷2=□... actually solve the missing-divisor form: 16÷□=8. This asks "16 divided by what equals 8?" Using the relationship 16=8×□, we get □=16÷8=2. Check: 16÷2=8. Correct.',

'Solve the two-operation open sentence 2x−1=7. Operations applied to x, in order: multiply by 2, then subtract 1. Undo in reverse: first undo the subtraction (add 1 to both sides): 2x=8. Then undo the multiplication (divide both sides by 2): x=4. Check: 2(4)−1=8−1=7. Correct.',
'Translate and solve: "five less than a number, doubled, equals eighteen." Translate step by step: "a number" = n. "five less than a number" = n−5. "doubled" means multiply the whole previous expression by 2: 2(n−5)=18. Solve: divide both sides by 2 first (undoing the "doubled" step, applied last): n−5=9. Then add 5 (undoing the subtraction): n=14. Check: 2(14−5)=2(9)=18. Correct.',
'A trader’s total sales, S, satisfy the open sentence 3S+200=2,300 (three times sales plus a fixed cost of 200 equals total revenue 2,300). Find S. Undo the addition first: 3S=2,300−200=2,100. Undo the multiplication: S=2,100÷3=700. Check: 3(700)+200=2,100+200=2,300. Correct.'
],
misconceptions:[
'Treating the unknown symbol (letter, box, or shape) as if it were a label or a separate category rather than an actual number — whatever symbol is used always stands for one specific numeric value to be found.',
'Applying the two required inverse operations in the SAME order the original operations were applied, instead of in reverse order — the LAST operation applied to the unknown must be undone FIRST.',
'Performing an operation to only ONE side of the open sentence/equation, breaking the balance between both sides — whatever is done to undo an operation must be done to both sides equally.',
'Mistranslating word phrases like "five less than a number" as 5−n instead of the correct n−5 — "less than" reverses the order compared to how the words are read; always identify which quantity the subtraction is actually being taken FROM.',
'In a missing-divisor problem like 16÷□=8, incorrectly dividing 8 by 16 instead of 16 by 8 — always rewrite the division relationship as a multiplication first (16=8×□) to see clearly which way the final division should go.'
],
guidedPractice:[
'Solve □+9=15, and check your answer by substitution.',
'Solve the two-operation open sentence 4+□×3=... actually solve 4×□−3=13, showing which operation you undo first.',
'Translate and solve: "three more than twice a number is seventeen."'
],
independentPractice:[
'Solve □−7=12.',
'Solve 9×□=63.',
'Solve the missing-divisor sentence 20÷□=4.',
'Solve the two-operation sentence 3□+4=19.',
'Solve the two-operation sentence 5□−2=18.',
'Translate and solve: "seven less than a number is twenty."',
'Translate and solve: "a number multiplied by four, then increased by six, equals thirty."',
'A shop’s daily cost C satisfies 2C−150=550. Find C.',
'A student solves 3□+6=21 by first dividing by 3 and THEN subtracting 6, getting a wrong answer. Show the correct order of inverse operations and the correct value of □.',
'Solve the two-operation sentence 6□+10=52, and check your answer by substitution.',
'Translate and solve: "twice a number, decreased by nine, equals twenty-five."',
'A quantitative aptitude question states: "if you multiply a certain number by 5 and then subtract 12, you get 38 — find the number." Write this as an open sentence and solve it, showing every inverse-operation step.'
],
mastery:{criterion:'Learner solves single-and two-operation open sentences using correctly ordered inverse operations, correctly translates word phrases into symbolic form, and checks every solution by substitution.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-algebraic-processes-algebraic-operations-2',classLevel:'JSS1',subject:'Mathematics',
topic:'Simplification of algebraic expressions',source:
{authority:'NERDC',url:sourceUrl,page:12},
objectives:['Identify/collect like terms','Identify coefficients including signs','Operate on similar terms','Solve related word problems','Insert/remove brackets and simplify','Solve bracket quantitative reasoning'],
prerequisites:['Use of Symbols (previous topic)','addition/subtraction of directed numbers (for correctly handling negative coefficients)'],
teaching:[
'A TERM in an algebraic expression is a chunk separated from the rest by a + or − sign, and that sign is always considered PART of the term (its "coefficient’s sign"), never separate from it. In 5a−2+3a+7, the four terms are +5a, −2, +3a, and +7 — not "5a, 2, 3a, 7" with the signs floating independently.',
'LIKE terms are terms that share the exact same variable part (the same letter, raised to the exact same power) — 5a and 3a are like terms (both plain "a"), but 5a and 3a² are NOT like terms, because a and a² are genuinely different quantities (one is "a multiplied by itself," the other is not), no matter how similar they look written down.',
'Only LIKE terms can be combined, and combining them means adding or subtracting their COEFFICIENTS (the number part, including its sign) while keeping the shared variable part unchanged: 5a+3a=8a (add the coefficients 5 and 3, keep "a"), and 5a−3a=2a similarly.',
'A bracket in an algebraic expression represents a group that must be treated as a single unit until it is properly opened. Removing a bracket that has a POSITIVE sign (or no sign shown) directly in front of it simply drops the bracket, keeping every term inside exactly as it was: +(6m+5) becomes +6m+5.',
'Removing a bracket that has a NEGATIVE sign directly in front of it flips the sign of EVERY term inside the bracket, because subtracting a whole group means subtracting each piece of it: −(6m+5) becomes −6m−5, not −6m+5. This single rule (distribute the negative sign to every term inside) is the source of nearly every bracket-removal mistake when it is applied only to the first term and forgotten for the rest.',
'The full method for simplifying any expression with brackets: first remove every bracket using the sign-in-front rule (distributing across every term inside), then collect and combine all resulting like terms into a single simplified expression, in whatever order is clearest (usually highest power or alphabetical).'
],
workedExamples:[
'Simplify 2x+3x+7x (all like terms, no brackets). All three terms share the variable part "x". Add coefficients: 2+3+7=12. Result: 12x.',
'Simplify 5a−2+3a+7, identifying each term’s coefficient first. Terms: +5a, −2, +3a, +7. Like terms: 5a and 3a (combine to 8a); −2 and +7 (combine to +5). Result: 8a+5.',
'Simplify (14m−8)+(6m+5), where both brackets have a positive sign in front. Since both signs in front are positive, simply drop both brackets: 14m−8+6m+5. Collect like terms: (14m+6m)+ (−8+5)=20m−3.',
'Simplify (10p+4)−(3p−2), where the second bracket has a NEGATIVE sign in front. Drop the first bracket normally (positive sign): 10p+4. For the second bracket, distribute the negative sign to BOTH terms inside: −(3p−2) becomes −3p+2 (note the sign of −2 flips to +2). Combine: 10p+4−3p+2. Collect like terms: (10p−3p)+ (4+2)=7p+6.',
'A student simplifies 8−(2y−3) and writes 8−2y−3=5−2y, forgetting to flip the sign of the SECOND term inside the bracket. Identify the exact error and give the correct answer. The negative sign in front must distribute to BOTH terms inside: −(2y−3) becomes −2y+3 (the −3 flips to +3), not −2y−3. Correct working: 8−2y+3=11−2y.',
'A rectangle’s length is (3x+2) and a second rectangle’s length is (x−5). Find an expression for how much longer the first rectangle is than the second.\n\nBefore touching any algebra, read the question itself for the instruction hidden in its wording. The phrase to focus on is "how much longer... is than..." — whenever a question asks HOW MUCH MORE, LONGER, GREATER, or BIGGER one thing is compared to another, it is asking for a DIFFERENCE, and a difference is always found by SUBTRACTION: the second quantity taken away from the first. This is the same interpretation whether the quantities are plain numbers, measurements, or algebraic expressions — the operation a question wants is decided by its wording, not by whether the numbers look "algebraic" or not. So "how much longer is the first rectangle than the second" translates directly to (first length) − (second length), which is (3x+2)−(x−5).\n\nNow the algebra: distribute the negative sign across the second bracket — −(x−5) becomes −x+5 (both terms inside flip sign because the whole bracket is being subtracted). Combine: 3x+2−x+5=(3x−x)+ (2+5)=2x+7.\n\nThis same two-step habit — first ask "what is this phrasing actually asking me to DO," then do the mechanical algebra — is exactly what separates a student who can only solve questions they have seen before from one who can tackle a differently-worded question testing the exact same skill.'
],
misconceptions:[
'Combining terms that LOOK similar but have different variable parts, such as adding x and x² together as if they were like terms — the variable part (including its power) must match EXACTLY for terms to combine.',
'Ignoring or dropping a term’s negative sign when moving it around or combining it — a term’s sign is permanently attached to it and must travel with it through every step.',
'Removing a bracket with a negative sign in front by only flipping the sign of the FIRST term inside, forgetting the rest — the negative sign must be distributed to EVERY single term inside the bracket, not just the first one.',
'Treating a bracket with nothing written in front of it as though it has no sign at all, rather than correctly treating it as an implied positive sign — an "invisible" positive sign still means every term inside keeps its original sign when the bracket is dropped.',
'Stopping after removing brackets without then collecting the like terms into a final simplified form — removing brackets is only the first half of simplifying; the terms must still be combined.'
],
guidedPractice:[
'Simplify 7p−3+2p+8, identifying each term’s coefficient (including sign) before combining.',
'Simplify (9k+3)−(4k−6), showing the sign distribution on the second bracket clearly.',
'A student simplifies 5−(3t−4) and gets 2−3t. Check whether this is correct, and if not, find the correct simplified expression.'
],
independentPractice:[
'Simplify 4y+9y−2y.',
'Simplify 6a−3+2a+9−4a.',
'Simplify (5m+7)+(3m−2).',
'Simplify (8n−4)−(3n+6).',
'Simplify 10−(4x−7).',
'A student simplifies 12−(5y+2) and writes 7+5y (dropping the bracket without flipping any signs). Identify the error and give the correct simplified expression.',
'Simplify (2x²+3x)+(x²−5x), being careful to only combine genuinely like terms.',
'Two lengths are given as (4x+3) and (2x−1). Find an expression for their sum, fully simplified.',
'Find an expression for how much longer (7x−2) is than (3x+4), fully simplified.',
'Simplify (6p−5)−(2p−3q+1), carefully tracking every term.',

'A student is confused why 3x and 5 cannot be combined into "8x" or "8." Explain, in terms of like terms, why they must be left as 3x+5.',
'Simplify the expression 9−(2a+3)+(a−4), combining every step (bracket removal on both brackets, then collecting like terms).'
],
mastery:{criterion:'Learner correctly identifies like terms and coefficients (including signs), combines only genuine like terms, and correctly distributes a negative sign across every term when removing a bracket.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-algebraic-processes-algebraic-operations-3',classLevel:'JSS1',subject:'Mathematics',
topic:'Simple equations',source:
{authority:'NERDC',url:sourceUrl,page:13},
objectives:['Translate word sentences into equations','Represent word sentences with equations','Solve and cross-check simple equations'],
prerequisites:['Use of Symbols and Simplification of algebraic expressions (previous topics)','inverse operations (addition/subtraction, multiplication/division)'],
teaching:[

'An EQUATION is a statement that two expressions are EQUAL, written with an "=" sign — this is different from a plain algebraic EXPRESSION (like 5k+7), which has no equals sign and nothing to "solve," since it is not claiming to equal any particular value. Recognising whether you have been given an equation or just an expression is the very first decision every problem requires.',
'Translating a word sentence into an equation means converting the description into symbols piece by piece, in the order the relationships are described, ending with the "equals" word or phrase becoming the "=" sign: "five times a number plus seven is twenty-two" becomes 5k+7=22, where each phrase maps directly onto a piece of the equation.',
'An equation stays TRUE (balanced) only if whatever is done to one side is also done to the other side — this is the single rule underneath every equation-solving step, whether it is adding, subtracting, multiplying, or dividing. Think of an equation as a balanced scale: removing weight from only one side tips it over; the same action must happen on both sides to keep it level.',
'Solving means isolating the unknown letter completely on one side, by undoing every operation attached to it using inverse operations, working from the OUTERMOST operation inward (exactly the reverse order in which the operations were originally applied to build the expression).',
'For x/4=6: the operation applied to x is division by 4, so undo it by multiplying both sides by 4: x=24. For 3y−5=16: two operations were applied (multiply by 3, then subtract 5); undo the subtraction first (add 5 to both sides: 3y=21), then undo the multiplication (divide both sides by 3: y=7).',
'Checking a solution means substituting the found value back into the ORIGINAL equation (not a rearranged version of it) and confirming both sides genuinely come out equal. This step is not optional decoration — it is the only way to catch an error made anywhere during solving, and a solution should never be considered final until this check has been done.'
],
workedExamples:[
'Translate and solve: "five times a number plus seven is twenty-two." Translate: 5k+7=22. Undo the addition: 5k=22−7=15. Undo the multiplication: k=15÷5=3. Check: 5(3)+7=15+7=22. Correct.',
'Solve x/4=6. The operation on x is division by 4; undo with multiplication: x=6×4=24. Check: 24/4=6. Correct.',
'Solve 3y−5=16. Undo the subtraction first (add 5 to both sides): 3y=21. Undo the multiplication (divide both sides by 3): y=7. Check: 3(7)−5=21−5=16. Correct.',

'A student is given the EXPRESSION 4n+9 (no equals sign) and asked to "solve for n." Explain why this cannot be done as written, and what would be needed to make it solvable. There is no equals sign, so 4n+9 is not claiming to equal any specific value — there are infinitely many values n could take, each giving a different result. To solve for n, the expression would need to be set equal to something, e.g. 4n+9=25, which then CAN be solved (n=4).',
'Translate and solve: "a number decreased by six, then divided by two, equals nine." Translate carefully, tracking order: (n−6)/2=9. Undo the division first (multiply both sides by 2): n−6=18. Undo the subtraction (add 6 to both sides): n=24. Check: (24−6)/2=18/2=9. Correct.',
'A student solves 2x+8=20 by first dividing both sides by 2 (getting x+4=10) and THEN subtracting 4, arriving at x=6, while another student subtracts 8 first (getting 2x=12) and then divides by 2, arriving at x=6. Explain why both approaches give the same correct answer despite undoing the operations in a different order. Both methods are valid as long as the SAME operation is applied consistently to BOTH sides at every step — there can be more than one correct sequence of algebraic moves, as long as balance is preserved throughout; both students correctly reach x=6, and checking confirms it: 2(6)+8=12+8=20.'

],
misconceptions:[
'Treating an expression (no equals sign) as if it were an equation that can be "solved" for a single value — without an equals sign there is nothing to solve; a value must first be set equal to the expression.',
'Performing an operation to only ONE side of an equation, breaking the balance — every single step must apply the identical operation to both sides.',
'Undoing the operations in the same order they were applied to build the expression, rather than in reverse — the operation applied LAST (often addition or subtraction of a constant) must be undone FIRST.',
'Stopping immediately after finding a value for the unknown, without substituting it back into the ORIGINAL equation to check — skipping this step is exactly how an arithmetic slip made mid-solution goes unnoticed.',
'Mistranslating the order of a word phrase, especially with "less than" or "decreased by," leading to an equation that does not actually match the sentence’s real meaning — always re-read the translated equation against the original sentence before solving.'
],
guidedPractice:[
'Translate and solve: "four times a number, decreased by three, is twenty-five." Then check your answer.',
'Solve 4x+3=27, showing both inverse-operation steps and the final check.',
'A student is given "2n−7" with no equals sign and asked to find n. Explain what is missing from the problem before it can be solved.'
],
independentPractice:[
'Solve 5x+2=32, and check your answer.',
'Solve x/3=9, and check your answer.',
'Solve 4y−7=13, and check your answer.',
'Translate and solve: "a number increased by eight equals nineteen."',
'Translate and solve: "three times a number, minus four, equals twenty-three."',
'Translate and solve: "a number divided by five, plus two, equals nine."',
'A student solves 6x−4=20 and gets x=4 by first dividing both sides by 6 before dealing with the −4. Redo the problem in the correct order and check the final answer matches.',
'Solve (n+3)/2=8, showing which operation you undo first and why.',
'A quantitative aptitude question states: "when a certain number is tripled and then decreased by 9, the result is 30 — find the number." Write and solve the equation, checking your final answer.',
'A student writes "5k+7" as their final answer to a question that asked them to SOLVE for k, given the sentence "five times a number plus seven is twenty-two." Explain what is missing from their answer and provide the correct solved value.',
'Solve 2(x+3)=16, first removing the bracket (multiply through by 2) before solving as usual, and check your final answer.',
'Two students solve 4x−5=15 in different orders (one adds 5 first, the other says they will "divide by 4 first instead"). Determine whether dividing by 4 first, before dealing with the −5, is actually valid here, and explain why or why not, referencing the balance rule.'
],
mastery:{criterion:'Learner correctly distinguishes an expression from an equation, translates word sentences into accurate equations, solves using correctly ordered inverse operations while preserving balance on both sides, and always checks the solution against the original equation.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-mensuration-and-geometry-shapes-1',classLevel:'JSS1',subject:'Mathematics',
topic:'Plane shapes',source:{authority:'NERDC',url:sourceUrl,page:14},
objectives:[
'Explain a plane shape as a two-dimensional figure with length and width',
'Identify sides, vertices, angles, adjacent/opposite sides, parallel/perpendicular lines and diagonals from standard diagrams',
'Classify polygons and triangles from defining properties rather than appearance',
'Compare square, rectangle, parallelogram, rhombus, trapezium and kite using exact geometric properties',
'Identify centre, radius, diameter, circumference, chord, arc, sector, segment and tangent of a circle',
'Find perimeter and area of standard plane shapes and real-life plane surfaces',
'Interpret diagrams even when a shape is rotated or presented in an unfamiliar orientation'
],
prerequisites:['whole-number and decimal multiplication','basic length units','meaning of a right angle'],
teaching:[
'PLANE SHAPE FOUNDATION. A plane is a flat surface. A plane shape is a flat TWO-DIMENSIONAL figure: it has length and width. A real door is a 3D object, but its flat front face can be modelled as a rectangle. Never confuse the mathematical 2D model with the physical object.',
'DIAGRAM STANDARD — this topic MUST be rendered with exact responsive geometry diagrams, never ASCII art or font symbols. Every learner-facing shape uses a mathematically controlled SVG: labelled vertices A, B, C, D; standard matching tick marks for equal sides; matching arrow marks for parallel sides; a square marker for a 90° angle; angle arcs where needed; exact diagonals and intersection points. Diagram properties are the evidence used to classify the shape, not decoration.',
'GEOMETRY VOCABULARY. A SIDE is a straight boundary segment. A VERTEX is a point where sides meet; plural: vertices. An ANGLE is formed when two sides/rays meet. ADJACENT sides share a vertex. OPPOSITE sides of a quadrilateral do not share a vertex. PARALLEL lines remain the same distance apart and do not meet when extended; matching arrow marks show parallelism. PERPENDICULAR lines meet at 90°, shown with the standard right-angle square. A DIAGONAL joins two non-adjacent vertices.',
'POLYGONS. A polygon is a CLOSED plane figure whose boundary consists of straight line segments. A circle is not a polygon because its boundary is curved. Name polygons by side count: 3 triangle, 4 quadrilateral, 5 pentagon, 6 hexagon, 7 heptagon, 8 octagon, 9 nonagon, 10 decagon. A regular polygon has all sides equal AND all interior angles equal; a neat-looking figure is not automatically regular.',
'TRIANGLES. Every triangle has 3 sides, 3 vertices and 3 interior angles. By side lengths: EQUILATERAL has 3 equal sides and therefore 3 equal 60° angles; ISOSCELES has 2 equal sides and the angles opposite those sides are equal; SCALENE has no equal sides. Side classification and angle classification describe different properties, so a triangle may be both right-angled and isosceles. The diagrams must show equality ticks and the right-angle square rather than relying on appearance.',
'QUADRILATERAL FAMILY. A quadrilateral is a four-sided polygon. SQUARE: four equal sides and four 90° angles; opposite sides parallel. RECTANGLE: four 90° angles; opposite sides equal and parallel. PARALLELOGRAM: both pairs of opposite sides equal and parallel; opposite angles equal; angles need not be 90°. RHOMBUS: four equal sides; opposite sides parallel; angles need not be 90°. TRAPEZIUM in this JSS1 convention: one pair of opposite sides parallel. KITE: two pairs of ADJACENT equal sides. Each comparison must use separate exact diagrams with standard property marks.',
'SHAPE RELATIONSHIPS. Every square satisfies the definition of a rectangle, rhombus and parallelogram, and all are quadrilaterals. Every rectangle is a parallelogram, but not every parallelogram is a rectangle. Every square is a rhombus, but not every rhombus is a square. Explain these conclusions by checking definitions one property at a time; never teach the names as unrelated pictures.',
'ROTATION DOES NOT CHANGE CLASSIFICATION. If an exact square is rotated 45°, its side lengths and 90° angles remain unchanged, so it remains a square. The learner diagram must use the SAME square geometry transformed by rotation and retain identical equality/right-angle marks.',
'DIAGONALS AND BISECTION. To bisect means to divide into two equal parts. If diagonals AC and BD meet at O and bisect each other, then AO=OC and BO=OD. The SVG must place O at the true intersection and use matching segment marks so the statement is visually and mathematically exact.',
'CIRCLE FOUNDATION. A circle consists of points in a plane at the same distance from a fixed point, the CENTRE. CIRCUMFERENCE is the complete curved boundary. A RADIUS joins the centre to the circumference. A DIAMETER joins two circumference points and passes through the centre. Therefore diameter d=2r. A CHORD joins two points on the circumference but need not pass through the centre. Every diameter is a chord, but not every chord is a diameter.',
'CIRCLE REGIONS AND LINES. An ARC is a curved portion of the circumference. A SECTOR is the region bounded by two radii and the arc between them. A SEGMENT is the region bounded by a chord and its corresponding arc. A TANGENT is a straight line touching the circle at exactly one point. These concepts require separate focused diagrams: do not crowd every label into one unreadable circle.',
'PROGRESSIVE VISUAL TEACHING. Diagrams reveal the property currently being explained. When AVORA says "four equal sides", all four equality ticks highlight; when it says "opposite sides are parallel", the matching parallel arrows highlight; when it teaches a diameter, the line visibly passes through centre O. On mobile, comparison shapes become separate full-width cards rather than shrinking into a broken row.',
'PERIMETER AND AREA. Perimeter is total distance around a boundary and uses a length unit such as cm or m. Area measures surface covered and uses square units such as cm² or m² because it counts unit squares. Rectangle: P=2(l+w), A=l×w. Square: P=4s, A=s². Triangle: A=½×base×PERPENDICULAR height. Parallelogram: A=base×PERPENDICULAR height. Never use a slanted side as the height unless it is actually perpendicular to the base.',
'REAL-LIFE MEASUREMENT. The same formulas apply to flat surfaces such as a classroom floor or garden plot. First identify the mathematical shape, measure the required dimensions, convert every measurement to the SAME unit, then calculate and state the correct unit. The final answer must be checked for reasonableness.',
'PERMANENT NO-ASSUMPTION RULE. Whenever a property, formula, measurement or intermediate number appears, explain where it came from. Learners classify from marked properties, not visual guesswork; choose a formula only after identifying the shape and the required dimensions; show substitutions before calculating.'
],
workedExamples:[
'Triangle classification: a triangle has side lengths 6cm, 6cm and 4cm. Compare one side at a time: 6=6, while 4 differs. Exactly two sides are equal, so the triangle is isosceles. The diagram shows matching tick marks only on the two 6cm sides.',
'Square versus rectangle: both have four right angles, two pairs of parallel opposite sides and equal opposite sides. A square additionally has all four sides equal. Therefore every square satisfies the rectangle definition, but a rectangle with length 8cm and width 5cm does not satisfy the four-equal-sides requirement for a square.',
'Parallelogram reasoning: a marked quadrilateral has AB∥DC and AD∥BC. Both pairs of opposite sides are parallel, so it belongs to the parallelogram family. The answer comes from the two pairs of matching parallel-arrow marks, not because the drawing looks slanted.',
'Circle: radius r=6cm. Diameter means two radii end-to-end through centre O. d=2r. Substitute r=6: d=2×6=12cm. The diagram shows A—O—B collinear so AB is visibly a true diameter.',
'Chord versus diameter: both join two points on the circumference. A diameter additionally passes through centre O. Therefore every diameter is a chord, but a chord drawn above O and not through O is not a diameter.',
'Rectangle 8cm by 5cm: perimeter means walk around all four sides, so 8+5+8+5=26cm, equivalently 2(8+5)=26cm. Area counts unit squares: 8 rows/columns by 5 gives 8×5=40cm².',
'Parallelogram base 7cm, perpendicular height 4cm and slanted side 6cm: the SVG shows a 90° marker where the 4cm height meets the base. Area=base×perpendicular height=7×4=28cm². The 6cm slanted side is not used because it is not perpendicular to the base.',
'Triangle base 10cm and perpendicular height 6cm: a matching rectangle/parallelogram visual demonstrates that the triangle occupies half of base×height. A=½×10×6. First 10×6=60, then half of 60=30. Area=30cm².',
'Real floor: 9m long and 6m wide. Model the flat floor as a rectangle. Area=9×6=54m², so 54m² of tiling covers it if there is no wastage.'
],
misconceptions:[
'Classifying by appearance instead of marked properties. A rotated square remains a square because its four equal sides and four right angles are unchanged.',
'Calling a circle a polygon. A polygon boundary is made of straight line segments; a circle has a curved circumference.',
'Thinking every rectangle is a square. Every square is a rectangle, but a rectangle does not require all four sides to be equal.',
'Thinking every rhombus is a square. A rhombus has four equal sides but does not require four right angles.',
'Confusing adjacent and opposite sides. Adjacent sides meet at a vertex; opposite sides do not share a vertex.',
'Calling every chord a diameter. Only a chord that passes through the centre is a diameter.',
'Confusing sector and segment. Sector=two radii+arc; segment=chord+arc.',
'Using a parallelogram slanted side as height. Height must be perpendicular to the chosen base and should be shown with a 90° marker.',
'Mixing perimeter and area units. Perimeter is length (cm, m); area is square units (cm², m²).',
'Using measurements in different units without conversion. Convert all dimensions to one consistent unit before calculation.'
],
guidedPractice:[
'Use the property marks on a triangle diagram to decide whether it is equilateral, isosceles or scalene, and justify the answer from the marks.',
'Compare a square and rectangle diagram: state two similarities and the one defining side-length difference.',
'Use a marked quadrilateral diagram to identify a parallelogram from its two pairs of parallel opposite sides.',
'On a circle diagram labelled O, identify one radius, one diameter and one chord and explain why each label is correct.',
'Distinguish a shaded sector from a shaded segment by naming the lines/curve that bound each region.',
'Find the perimeter and area of a 9cm by 4cm rectangle, showing formula, substitution, calculation and units.',
'Find the area of a parallelogram with base 10cm and perpendicular height 6cm; explain why a separately marked slanted side is not used.'
],
independentPractice:[
'Name polygons with 3, 4, 5, 6, 7, 8, 9 and 10 sides.',
'A triangle has sides 5cm, 5cm and 8cm. Classify it and justify your answer.',
'Explain why a square rotated 45° is still a square.',
'State why every square is a rectangle but not every rectangle is a square.',
'State why every square is a rhombus but not every rhombus is a square.',
'From a marked diagram, distinguish a parallelogram from a trapezium by the number of pairs of parallel opposite sides.',
'From a marked kite diagram, identify the two pairs of adjacent equal sides.',
'If a circle radius is 9cm, find its diameter and show where every number in the calculation comes from.',
'Explain why every diameter is a chord but not every chord is a diameter.',
'From separate circle diagrams, identify an arc, sector, segment and tangent.',
'Find the perimeter of a regular pentagon with side 7cm.',
'Find the area of a square with side 12cm.',
'Find the area of a triangle with base 10cm and perpendicular height 6cm.',
'Find the area of a parallelogram with base 15cm and perpendicular height 8cm when a slanted side of 10cm is also shown.',
'A rectangular plot measures 24m by 18m. Find perimeter and area with correct units.',
'A garden is 1,200cm long and 8m wide. Convert to consistent units first, then find area in m².'
],
mastery:{criterion:'Learner accurately interprets standard geometry diagrams and markings; classifies triangles and quadrilaterals from defining properties rather than appearance; explains shape-family relationships; identifies all required circle parts; and calculates perimeter/area with correct perpendicular dimensions and units.',status:'DEEP_WHEN_PASSED'},
boardReady:true,
visualStandard:{
rendering:'responsive-svg',
productionRule:'No ASCII, Unicode-shape, raster screenshot or approximate learner-facing geometry. Render exact SVG geometry from controlled coordinates.',
mobile:'One focused diagram/card at a time; comparisons stack responsively rather than shrink.',
notation:['vertex labels','equal-side ticks','parallel arrows','90-degree square markers','angle arcs','diagonal/intersection labels','dimension labels'],
progressiveReveal:true,
diagramSets:['geometry-vocabulary','polygon-side-count','regular-vs-irregular','triangle-types','right-isosceles-triangle','square-properties','rectangle-properties','parallelogram-properties','rhombus-properties','trapezium-properties','kite-properties','quadrilateral-comparisons','rotated-square','diagonal-bisection','circle-master','radius-vs-diameter','chord-vs-diameter','arc','sector','segment','tangent','shape-family','perimeter-vs-area','triangle-height','parallelogram-height']
}
},
{
topicId:'nerdc-jss1-math-mensuration-and-geometry-shapes-2',classLevel:'JSS1',subject:'Mathematics',
topic:'Three dimensional figures',source:
{authority:'NERDC',url:sourceUrl,page:15},
objectives:['Identify properties of cubes/cuboids','Identify properties of pyramids/cones','Identify properties of cylinders/spheres','Find volume of cube/cuboid'],
prerequisites:['Plane Shapes (previous topic)','multiplication of three numbers together'],
teaching:[
'A 3D figure is described by FACES (flat or curved surfaces), EDGES (lines where two faces meet), and VERTICES (corner points).\n\n```\n CUBE CUBOID CYLINDER CONE\n ┌─────┐ ┌───────┐ ──── ▲\n ╱ ╱│ ╱ ╱│ ( ) ╱ ╲\n ┌─────┐ │ ┌───────┐ │ │ │ ╱ ╲\n │ │ ╱ │ │ ╱ │ │ ╱ ╲\n │ │╱ │ │╱ (____) ╱─────╲\n └─────┘ └───────┘ 2 flat circles 1 flat circle base,\n 6 equal square 6 rectangular + 1 curved 1 curved surface\n faces, 12 edges, faces (opposite surface, NO meeting at 1 apex\n 8 vertices pairs equal), "edges" in the\n 12 edges, 8 vert. cube/cuboid sense\n```',
'A CUBE has 6 identical square faces, 12 equal edges, 8 vertices. A CUBOID has 6 rectangular faces (opposite faces equal), 12 edges, 8 vertices — a cube is a special cuboid where every dimension is equal.',
'A PYRAMID has one polygon base and triangular faces meeting at an apex; a CONE has a circular base and ONE curved surface meeting at an apex — it is technically incorrect to call a curved surface an "edge," since an edge is specifically where two FLAT faces meet in a straight line.',
'VOLUME measures the SPACE a solid occupies, in a CUBED unit (cm³), by counting how many unit cubes fit inside:\n\n```\n ┌──────────┐\n ╱□□□□□□□□╱│ ← layer 1 (bottom): 5×3=15 unit cubes\n ┌─────────┐ │\n │ │ ╱ 2 (height) ← stacked 2 layers high: 15×2=30 unit cubes total\n └─────────┘\n 5×3 base\n```',
'For a cube, volume=side³. For a cuboid, volume=length×width×height — the base area (length×width) counted once per layer, extended upward by the height, exactly as pictured above.'
],
workedExamples:[
'State the number of faces, edges and vertices of a cube, referencing the cube diagram. Faces: 6 (all square, all equal). Edges: 12. Vertices: 8.',
'Find the volume of a cube with side length 4cm.\n\n```\n ┌───┐\n ╱ ╱│\n ┌───┐ │ 4cm\n │ │╱\n └───┘\n 4cm\n```\nVolume=4×4×4=64cm³.',
'Find the volume of a cuboid measuring 5cm by 3cm by 2cm.\n\n```\n ┌───────┐\n ╱ ╱│\n ┌───────┐ │ 2cm\n │ │╱ 3cm (depth)\n └───────┘\n 5cm\n```\nVolume=5×3×2=30cm³.',
'Describe the difference between a cone and a cylinder in terms of faces, referencing their diagrams. A cone has ONE flat circular face and one curved surface meeting at a single apex point. A cylinder has TWO flat circular faces (top and bottom) connected by one curved surface, with no apex point at all.',
'A student says a cylinder has "2 edges" (the circular rims top and bottom). Using the terminology from the teaching diagram, explain why this is imprecise. Those rims are where the curved surface meets each flat circular face — a true "edge" (as used for the cube/cuboid) is where two FLAT faces meet in a straight line; a cylinder’s curved surface is its own distinct kind of feature, not a collection of straight edges.',
'A water tank shaped like a cuboid measures 2m long, 1.5m wide, and 1m deep. Find its volume, and how many litres this represents (1m³=1,000 litres).\n\n```\n ┌─────────┐\n ╱ ╱│\n ┌────────┐ │ 1m\n │ │╱ 1.5m\n └────────┘\n 2m\n```\nVolume=2×1.5×1=3m³=3,000 litres.'
],

misconceptions:[
'Counting a solid’s curved surface as though it were made up of many small straight edges — refer to the cylinder/cone diagram: a curved surface is its own distinct feature.',
'Confusing which faces of a cuboid must be equal — only OPPOSITE faces of a cuboid are guaranteed equal; adjacent faces generally differ unless the cuboid is a cube.',
'Reporting a volume answer using a squared unit (cm²) instead of a cubed unit (cm³) — volume is three-dimensional and always uses a cubed unit.',
'Assuming a pyramid and a cone are the same shape with different names — a pyramid has a polygon base and FLAT triangular faces; a cone has a circular base and ONE curved surface.',
'Multiplying only two of the three dimensions when finding a cuboid’s volume — volume always needs all three dimensions multiplied together, as shown in the layered-cubes diagram.'
],
guidedPractice:[
'State the number of faces, edges and vertices of a cuboid, comparing it to the cube diagram.',
'Find the volume of a cube with side length 7cm, drawing the labelled cube.',
'Find the volume of a cuboid measuring 6cm by 4cm by 3cm, drawing the labelled cuboid.'
],
independentPractice:[
'State the number of faces, edges and vertices of a square-based pyramid.',
'Describe one similarity and one difference between a cube and a cuboid.',
'Describe one similarity and one difference between a cone and a cylinder.',
'Find the volume of a cube with side length 9cm.',
'Find the volume of a cuboid measuring 10cm by 5cm by 4cm.',
'A storage box is a cuboid measuring 40cm by 30cm by 25cm. Find its volume in cm³.',
'A student reports the volume of a cube (side 5cm) as "25cm²." Identify both errors in this answer and give the fully correct answer.',
'Describe why a sphere has no edges or vertices at all, using the definitions of edge and vertex.',
'A cuboid-shaped water tank measures 3m by 2m by 1.5m. Find its volume in cubic metres, and convert to litres.',
'A student says a cube is "just a special rectangle." Explain why this is incorrect, and give the correct 3D shape a cube should be compared to.',
'Two cuboids have the same volume: one measures 4cm×5cm×6cm, the other measures 8cm×5cm×?cm. Find the missing dimension.',
'A cylindrical drum and a cuboid-shaped box sit side by side. List one property that distinguishes them just by looking at their faces.'
],
mastery:{criterion:'Learner accurately identifies faces, edges and vertices of common 3D solids using correct terminology for curved surfaces, and correctly calculates cube/cuboid volume using cubic units, supported by accurate labelled diagrams.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-mensuration-and-geometry-shapes-3',classLevel:'JSS1',subject:'Mathematics',
topic:'Construction',source:
{authority:'NERDC',url:sourceUrl,page:16},
objectives:['Construct parallel/perpendicular lines','Bisect a line segment','Construct 90° and 60° angles'],
prerequisites:['Plane Shapes and basic angle vocabulary','careful use of a ruler and compass (a physical or on-screen tool)'],
teaching:[
'Geometric CONSTRUCTION means creating an exact shape or angle using only a straightedge (for drawing straight lines) and a compass (for drawing arcs of a fixed radius) — never a protractor or ruler measurement for the actual construction step itself.',

'BISECTING A LINE SEGMENT AB:\n\n```\n P\n /|\\\n / | \\\n / | \\\n A ──────●────── B ● = midpoint (where PQ crosses AB)\n \\ | /\n \\ | /\n \\|/\n Q\n```\nStep 1: draw AB. Step 2: open the compass to MORE than half of AB’s length, and keep this width fixed for both remaining steps. Step 3: from A, swing an arc above AND below the line. Step 4: WITHOUT changing the compass width, from B, swing another arc above and below, crossing the first arcs at P (above) and Q (below). Step 5: draw a straight line through P and Q — it crosses AB at the exact midpoint, at a perfect right angle.',
'Why this works: every point on the arc from A is the same fixed distance from A; every point on the arc from B is that same fixed distance from B. So P and Q are both equally distant from A and from B at once — the only place that can be true along AB itself is the exact midpoint, so the line PQ must pass through it.',
'CONSTRUCTING A 60° ANGLE at vertex V:\n\n```\n D\n /\n /╲\n / ╲ ← arc from C, same radius as V→C\n /60°╲\n V ───────────● C ← arc from V, any radius, marks C on the ray\n```\nStep 1: draw a ray from V. Step 2: with any radius, arc from V, marking point C where it crosses the ray. Step 3: WITHOUT changing the radius, arc from C, crossing the FIRST arc at D. Step 4: draw ray V→D. Angle DVC is exactly 60°, because V, C and D form an equilateral triangle (all three sides equal to the one unchanged radius used throughout), and every angle in an equilateral triangle is 60°.',
'CONSTRUCTING A 90° (PERPENDICULAR) at point X on a line:\n\n```\n T\n /|\n /|\n / |\n ──────M────X────N───── ← M and N equally spaced either side of X\n```\nStep 1: mark M and N equally spaced from X, along the line. Step 2: widen the compass, arc above the line from M. Step 3: same width, arc above from N, crossing at T. Step 4: draw XT — this is exactly perpendicular (90°) to the original line at X, by the same equal-arc logic as the bisection method.'
],
workedExamples:[
'Bisect a line segment AB that is 8cm long.\n\n```\n P\n /|\\\n / | \\\n A(0cm)/ | \\ B(8cm)\n ──────●(4cm)──────\n \\ | /\n \\|/\n Q\n```\nCompass opened to 5cm (more than half of 8). Arcs from A and from B (unchanged width) cross at P (above) and Q (below). Line PQ crosses AB exactly at the 4cm mark — the true midpoint.',

'Construct a 60° angle at a vertex V, using a 4cm radius throughout.\n\n```\n D\n /╲\n / ╲ 4cm\n / 60°╲\n V ────────● C\n 4cm\n```\nBoth V→C and C→D arcs use the same 4cm radius, making VCD equilateral, so angle DVC=60° exactly.',
'Construct a 90° angle at point X on a straight line, with M and N each 3cm from X.\n\n```\n T\n /|\n / |\n ───M(3cm)─X───N(3cm)──\n```\nM and N marked 3cm either side of X. Arcs from M and N (same, wider radius) cross above at T. Line XT is perpendicular to the original line.',
'A student bisecting a segment changes the compass width partway through — opening it wider for the arc from B than was used for the arc from A. Explain why this ruins the construction, using the diagram idea. If A’s arc has radius 5cm but B’s arc has radius 6cm, the crossing points are no longer equally distant from BOTH A and B at once (5cm from A, but 6cm from B) — so the line through those crossing points will NOT pass through the true midpoint of AB; it will be pulled off-centre, closer to A.',
'Explain how the 60° construction could be extended to construct a 30° angle. Bisecting an angle uses the exact same equal-arc-crossing method as bisecting a line segment, but centred on the angle’s VERTEX instead of a segment’s endpoints. Bisecting the already-constructed 60° angle (drawing equal arcs from both of its rays and joining the crossing point back to V) produces two new 30° angles.',
'A student uses a protractor to measure and mark a 90° angle, then says this satisfies a construction question. Explain why this does not count. A true construction must be built from compass arcs and straight lines only, producing an angle that is PROVABLY exact through the equal-arc geometry shown above — a protractor reading depends on the accuracy of the scale and the person’s eye, and does not demonstrate the underlying geometric proof.'
],
misconceptions:[
'Changing the compass width partway through a construction that requires it to stay fixed — the entire proof that a construction is exact depends on the SAME radius being used at both required steps; any change breaks the guarantee (see the worked example above showing exactly what goes wrong).',
'Using a protractor or ruler measurement instead of compass-and-straightedge methods, and calling the result a "construction" — a true construction must be built from compass arcs and straight lines only.',
'Erasing the visible construction arcs after finishing, leaving only the final line or angle — the arcs ARE the evidence the construction was done correctly, and should remain visible.',
'Confusing bisecting a LINE SEGMENT (finds a midpoint, produces a perpendicular) with bisecting an ANGLE (splits an angle into two equal smaller angles) — related methods, different diagrams, different purposes.',
'Assuming any two crossing arcs automatically produce a valid construction, regardless of starting points or radius — the SPECIFIC starting points (A and B; or V and C) and the unchanged radius are what make the method valid.'
],
guidedPractice:[
'Bisect a line segment of your own chosen length (at least 6cm), drawing the full diagram with both arcs and the crossing points P and Q labelled.',
'Construct a 60° angle at a vertex of your choice, drawing the diagram with both arcs and point D labelled.',
'Construct a perpendicular at a marked point on a straight line, drawing the diagram with M, N and T labelled.'
],
independentPractice:[
'Bisect a line segment CD that is 10cm long, drawing the full arc diagram.',
'Construct a 60° angle, then use angle bisection to construct a 30° angle from it, showing both diagrams.',
'Construct a perpendicular at a point on a line, and explain in one sentence why the two arcs used must have the same radius.',
'A student says a 90° angle can only ever be constructed by bisecting a straight line (180°) in half. Confirm whether this is valid, and explain why it works if so, with a sketch.',
'Describe, step by step with a diagram, how you would construct a line parallel to an existing line through a given external point, using angle-copying.',
'A student bisects AB using a 3cm compass width when AB is 8cm long (less than half of AB). Sketch what happens to the arcs and explain why they will fail to cross above and below the line.',
'Construct an equilateral triangle with side length 6cm, explaining how the 60° angle construction method relates directly to this task.',
'Bisect an angle of 80° (already drawn) into two 40° angles, drawing the arc diagram.',
'A student wants to construct a 45° angle. Describe a construction method (with sketch) to achieve this, building on the 90° construction.',
'Explain, in your own words, why a compass-and-straightedge construction is "provably exact" while a freehand or protractor-based drawing is not.',
'Construct a perpendicular bisector of a segment EF measuring 12cm, and use it to find and label the exact midpoint.',
'A student constructs what they believe is a 60° angle but changes the compass radius between the two required arcs. Sketch what the resulting triangle VCD would look like, and predict whether the angle will be exactly 60°.'
],
mastery:{criterion:'Learner performs compass-and-straightedge constructions accurately, keeps compass width unchanged where required, draws the arcs and labelled points visibly, and explains why each method produces an exact result.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-mensuration-and-geometry-shapes-4',classLevel:'JSS1',subject:'Mathematics',
topic:'Angles',source:
{authority:'NERDC',url:sourceUrl,page:16},
objectives:['Measure angles','Identify vertical/adjacent/alternate/corresponding angles','State angle properties','Identify angles at a point and on a straight line'],
prerequisites:['Construction (previous topic, for vocabulary of vertex/ray)','addition and subtraction up to 360'],
teaching:[
'To measure an angle with a protractor correctly: place the protractor’s centre point exactly on the angle’s VERTEX, align the protractor’s zero line exactly along one ray (arm) of the angle, then read the value where the SECOND ray crosses the protractor’s scale — using whichever of the two printed scales (inner or outer) actually starts at 0 on the ray you aligned to, not just whichever number looks more familiar.',
'ANGLES ON A STRAIGHT LINE always add up to exactly 180°:\n\n```\n ╱ 128° ╲ 52°\n ───────●──────────\n (straight line = 180° total)\n```\nA ray splits the straight line into two angles on the same side. If one is 128°, the other must be exactly what remains of the full 180°: 180−128=52°.',
'ANGLES AROUND A POINT always add up to exactly 360° (a complete turn):\n\n```\n │\n x° ╱\n ╱ 90°\n ────●─────\n ╲ 110°\n ╲\n```\nThree rays meet at one point, all the way around: 90°+110° +x°=360°, so x=360−200=160°.',
'VERTICALLY OPPOSITE angles, formed when two straight lines cross, are always EQUAL:\n\n```\n ╲ ╱\n a° ╲ ╱ b°\n ╲ ╱\n ───────●─────── ← two straight lines crossing\n ╱ ╲\n b° ╱ ╲ a°\n ╱ ╲\n```\nThe two "a°" angles (top-left and bottom-right) are vertically opposite each other and are always equal; likewise the two "b°" angles (top-right and bottom-left) are always equal to each other. ADJACENT angles (like a° and b° sitting right next to each other, sharing one ray) are NOT automatically equal — only the pair directly across the crossing point are.',
'PARALLEL LINES crossed by a TRANSVERSAL create equal corresponding and alternate angle pairs — but ONLY because the lines are genuinely parallel:\n\n```\n Line 1: ─────────●────────── (a° top-right at this crossing)\n ╲\n ╲ ← transversal\n ╲\n Line 2: ─────────────●──── (b° top-right at this crossing)\n Line 1 ∥ Line 2 (marked parallel with matching arrowheads on both lines)\n```\na° and b° sit in the SAME relative position (both "top-right") at their own crossing point — these are CORRESPONDING angles, and they are equal specifically because Line 1 and Line 2 are marked parallel. If the lines were not parallel, no such equality would be guaranteed.'
],
workedExamples:[
'One of two vertically opposite angles measures 72°. Find its opposite angle.\n\n```\n ╲ ╱\n 72°╲ ╱ x°\n ───────●───────\n```\nVertically opposite angles are always equal, so x=72°.',
'Two angles lie on a straight line, and one of them measures 128°. Find the other angle.\n\n```\n ╱ 128° ╲ x°\n ───────●──────────\n```\nAngles on a straight line sum to 180°: x=180−128=52°.',
'Three angles meet at a single point (not on a straight line): 90°, 110°, and an unknown x.\n\n```\n x° ╱ 90°\n ╱\n ────●─────\n ╲ 110° \n```\nAngles around a point sum to 360°: 90+110+x=360, so x=360−200=160°.',
'A transversal crosses two parallel lines. One angle at the first crossing is 68° (top-right position). Find the corresponding angle at the second crossing.\n\n```\n Line 1: ──────●─────── 68° is top-right here\n ╲\n Line 2: ─────────●──── y° is top-right here (matching position)\n Line 1 ∥ Line 2\n```\nSince both lines are parallel and y° sits in the exact same "top-right" position as 68° at its own crossing, y=68° (corresponding angles).',
'A student measures an angle using the WRONG protractor scale (reading 130° from the outer scale when the ray was aligned to the inner scale’s zero, where the correct reading is 50°). Explain the error. A protractor has two scales running in opposite directions; you must read from whichever scale has its 0 lined up with the ray you started measuring from, otherwise you get the "supplementary" value (180 minus the true angle, since 180−50=130) instead of the correct one.',
'Two angles are adjacent and together form a straight line: one is 3x° and the other is (x+40)°.\n\n```\n ╱ 3x° ╲ (x+40)°\n ───────●──────────\n```\nSince they lie on a straight line: 3x+(x+40)=180. Combine like terms: 4x+40=180. Solve: 4x=140, x=35.'
],
misconceptions:[
'Reading the wrong protractor scale (inner instead of outer, or vice versa) because it looks like a "nicer" or more expected number — always check which scale actually has its zero aligned with the ray you started from.',
'Assuming two angles that LOOK equal in a diagram must be equal, without checking whether the actual required condition (vertically opposite, or parallel lines with a transversal) genuinely applies — equality must come from a stated geometric relationship, never from appearance alone.',
'Confusing ADJACENT angles (sharing a vertex and a side, sitting next to each other) with VERTICALLY OPPOSITE angles (sharing only a vertex, sitting across from each other) — look at the diagram’s crossing pattern: opposite angles are diagonal across the crossing point, adjacent angles are side by side.',
'Applying corresponding or alternate angle equalities to two lines that are NOT actually stated or shown to be parallel — these equal-angle rules only hold specifically because the lines are parallel; without that, the angles are not guaranteed equal at all.',
'Adding angles around a point to only 180° (confusing it with the straight-line rule) instead of the correct 360° for a full turn around a single point — always check whether the angles sit on a STRAIGHT LINE (180°) or go all the way AROUND A POINT (360°).'
],
guidedPractice:[
'Measure a drawn angle using a protractor, describing exactly how you align it and which scale you read.',
'Find x, given that x and 137° lie on a straight line together. Sketch the straight-line diagram as part of your answer.',
'Two vertically opposite angles are labelled 3x° and 51°. Sketch the crossing-lines diagram and find x.'
],
independentPractice:[
'Two angles on a straight line are 95° and y°. Find y.',
'Four angles meet at a point: 70°, 85°, 95° and z°. Find z.',

'Two vertically opposite angles are labelled 4x° and 100°. Find x.',
'A transversal crosses two parallel lines, creating a corresponding-angle pair. One angle is 74°. Find the other, and name the property used.',
'A transversal crosses two parallel lines, creating an alternate-angle pair. One angle is 112°. Find the other, and name the property used.',
'Two adjacent angles on a straight line are 2x° and (x+30)°. Find x.',
'A student says two angles that "look the same size" in a diagram of two crossing lines must be vertically opposite. Explain what actually needs to be true for that claim to be correct.',
'Three angles around a point are in the ratio 2:3:4 and together make a full turn. Find each angle (hint: the three parts must sum to 360°).',
'A student measures an angle as 140° using the wrong protractor scale, when the true angle is 40°. Explain the relationship between their wrong answer and the true answer, and how to check which scale is correct next time.',
'Two parallel lines are crossed by a transversal, and one angle is given as 65°. Find both a corresponding angle AND an alternate angle to this one, naming which property gives each.',
'On a straight line, three angles sit together: 3x°, 2x° and 40°. Find x.',

'A diagram shows two lines that LOOK parallel (but this is not stated) crossed by a transversal, with two same-position angles both appearing to be about 70°. Explain why you cannot conclude they are corresponding angles and therefore equal, without more information.'
],
mastery:{criterion:'Learner measures angles correctly using the appropriate protractor scale, and correctly applies straight-line (180°), around-a-point (360°), vertically-opposite, corresponding and alternate angle facts only when their required conditions genuinely hold — supported by accurate diagrams matching each specific example.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-1',classLevel:'JSS1',subject:'Mathematics',
topic:'Need for statistics',source:
{authority:'NERDC',url:sourceUrl,page:17},
objectives:['List purposes of statistics','Recognise statistics for planning','Apply chance/probability in everyday life','Recognise statistics for prediction'],
prerequisites:['none beyond everyday reasoning — this topic builds the conceptual foundation for the rest of the statistics theme'],
teaching:[
'Statistics is the practice of COLLECTING, organising, presenting, analysing and interpreting data, all in service of making a genuinely informed decision, rather than a guess based on impression alone. Every one of those five steps matters — raw uncollected facts are not yet "statistics" until they have been gathered and organised in a way that lets a real conclusion be drawn from them.',
'PLANNING purposes use data about the CURRENT state of people or resources to decide what is needed going forward — a school counting how many pupils are enrolled this year in order to decide how many new classrooms or textbooks to order is a direct planning use of statistics.',
'PREDICTION purposes use PAST or ongoing PATTERNS in data to make a reasonable expectation about the future — but a prediction is always a reasonable expectation, never a guarantee, since real conditions can always change in ways past data did not capture. Confusing "statistically likely" with "certain to happen" is one of the most important distinctions this whole topic tries to build.',
'A CHANCE EVENT is any outcome that is not certain to happen — probability is the branch of mathematics that puts a language and, eventually, a number to how likely or unlikely something is, ranging from IMPOSSIBLE (will definitely not happen) through UNLIKELY, EVEN CHANCE, LIKELY, up to CERTAIN (will definitely happen).',
'A simple experiment with a die or coin is genuinely useful for understanding chance precisely because its outcomes are unpredictable individually, yet show a stable PATTERN over many repeats — you cannot know which face a single die roll will show, but you can reasonably expect that, rolled many times, each face appears roughly equally often.',
'The everyday uses of statistics touch nearly every area of life: a government uses census data (like an NPC population count) to plan infrastructure; a school uses past exam results to identify which topics need more teaching focus; a weather service uses historical rainfall data to predict (not guarantee) the likelihood of rain.'
],
workedExamples:[
'A school records that enrolment has grown from 400 to 460 pupils over one year. Explain how this is a PLANNING use of statistics. This is planning because the school uses the current, measured pupil count to decide practical next steps — such as how many additional classroom spaces, teachers, or textbook sets will be needed for the coming year, based directly on the collected number.',
'A weather service reports that, historically, 70% of days in a certain month have had rain. Explain what this prediction does and does NOT tell you about tomorrow specifically. It tells you that rain is statistically MORE LIKELY than not on a randomly chosen day in that month, based on the historical pattern — but it does NOT guarantee that tomorrow, specifically, will have rain; any individual day could turn out either way.',
'A fair coin is tossed once. Describe this outcome using chance/probability language. Before tossing, getting heads is an EVEN CHANCE event (equally likely as getting tails), since a fair coin has exactly two equally likely outcomes.',
'A six-sided die is rolled. Describe the chance of rolling a 7, and the chance of rolling a number less than 7. Rolling a 7 is IMPOSSIBLE, since a standard die only has faces numbered 1 to 6. Rolling a number less than 7 is CERTAIN, since every possible face (1 through 6) satisfies that condition.',
'A national examinations body (like WAEC or NECO) publishes the percentage of candidates who passed mathematics over the last five years. Explain one planning use and one prediction use this data could serve. Planning use: education authorities could decide where to focus additional teacher training or resources, based on which regions or years showed lower pass rates. Prediction use: the trend across the five years could reasonably suggest whether pass rates are likely to keep improving, worsening, or staying stable — while still not guaranteeing next year’s exact result.',
'A student says "statistics proved it will rain tomorrow because it rained the last five days in a row." Explain what is wrong with this reasoning. A pattern of past occurrences can make an outcome seem statistically MORE LIKELY, but it never PROVES a specific future outcome with certainty — conditions can change, and even a strong pattern is still just an informed expectation, not a guarantee.'
],
misconceptions:[
'Believing that a statistical prediction guarantees a specific future outcome, rather than describing a likelihood based on past patterns — "likely" and "certain" are genuinely different levels of confidence, and statistics should never blur that distinction.',
'Treating a personal opinion or impression (without any actual data collected) as though it were "statistics" — statistics specifically requires data that has been genuinely collected and organised, not just a feeling about what seems true.',
'Confusing "impossible" with merely "unlikely," or "certain" with merely "likely" — these are distinct points on the probability scale, and using the strong words (impossible/certain) requires the outcome to be genuinely guaranteed, not just probable.',
'Assuming a single chance event (like one coin toss) should behave exactly like the expected long-run pattern (like getting exactly 50% heads over just 2 tosses) — patterns in chance become reliable only over MANY repeats, not in a small handful of individual events.',
'Assuming statistics is only about numbers and calculations, missing that it fundamentally exists to support real decisions (planning) and reasonable expectations (prediction) about everyday life.'
],
guidedPractice:[
'List three real school decisions that would benefit from collected data, and explain what data each one would need.',
'Describe one chance event from everyday life and place it on the impossible→certain probability scale.',
'Explain, using an example, the difference between a statistical prediction and a guarantee.'
],
independentPractice:[
'List two purposes of statistics not already mentioned in the lesson, with a real-life example for each.',

'Explain how a hospital might use patient record statistics for planning purposes.',
'Describe one example of statistics being used for prediction in sports (e.g. a team’s past performance).',
'Classify each of these as impossible, unlikely, even chance, likely, or certain: (a) the sun rising tomorrow; (b) rolling a 6 on a fair die; (c) flipping a coin and getting heads; (d) picking a red ball from a bag containing only blue balls.',
'A school uses last year’s attendance data to decide how many extra chairs to order for a new term. Identify whether this is a planning or prediction use, and justify your answer.',
'A student claims that because their favourite football team won the last four matches, they are "certain" to win the next one. Explain, using proper probability language, why this claim is flawed.',
'Describe a simple dice experiment you could run to explore chance, including what you would record and roughly what pattern you would expect over many rolls.',
'Explain why census data (like population counts from the NPC) is useful for national planning, giving one specific example of a decision it could inform.',
'A weather report predicts an 80% chance of rain. Explain what this number is really telling you, and what it is NOT telling you for certain.',
'Give one example each of a "certain" event and an "impossible" event from your own daily life.',
'A student collects opinions from five friends about their favourite food and calls this "statistical proof" that it is the most popular food in the school. Explain why this reasoning is flawed.',
'Describe how a business might use past sales data (a form of statistics) both for planning next month’s stock AND for predicting a busy season.'
],
mastery:{criterion:'Learner explains real purposes of statistics (planning vs prediction), correctly distinguishes likelihood language from certainty, and reasons soundly about simple chance events without overstating what a pattern proves.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-2',classLevel:'JSS1',subject:'Mathematics',
topic:'Data collection',source:
{authority:'NERDC',url:sourceUrl,page:17},
objectives:['Collect data in the class'],
prerequisites:['Need for Statistics (previous topic, for why data collection matters at all)'],
teaching:[
'Before collecting a single piece of data, four things must be decided in advance: the exact QUESTION being investigated (e.g. "what is each pupil’s favourite subject?"), the POPULATION involved (which group is actually being asked/measured), the possible CATEGORIES or VALUES the data can take, and a single CONSISTENT method for recording each response. Skipping this planning step is the single biggest cause of messy, unusable data.',
'CATEGORIES must be decided and fixed BEFORE collection begins, and every response must fit clearly into exactly one category — changing or adding categories partway through collection makes earlier and later responses impossible to compare fairly against each other.',
'A TALLY is the standard method for counting how many times each category occurs: make one mark for each occurrence, grouping marks in fives (four single strokes, then a fifth stroke crossing through them) so the final count can be read at a glance without recounting individual marks one by one.',
'Every entry collected should represent exactly ONE response from exactly one member of the population — recording the same person twice inflates the data falsely, and skipping someone entirely leaves the data incomplete; a good collection method includes a way to check that the total count of entries matches the true size of the population being surveyed.',
'Data collected for one specific question should stay relevant to that question — collecting unrelated information "just in case" does not make the data more useful, and can make organising and presenting it needlessly complicated later.',
'Once collected, a dataset should be checked for internal consistency before being used further: do the category totals add up to the total number of people surveyed? Are there any categories with suspiciously few or duplicate-looking entries that suggest a recording mistake? This checking step is what turns "raw collected numbers" into data that can actually be trusted for further analysis.'
],
workedExamples:[
'Design a tally table to record how 20 classmates travel to school (categories: walking, bus, car, bicycle), shown exactly as it should be drawn.\n\n```\n Category | Tally | Total\n Walking | ⍄⍄⍄⍄ ⍄⍄⍄⍄ ⍄⍄ | 10\n Bus | ⍄⍄⍄⍄ ⍄⍄ | 7\n Car | ⍄⍄ | 2\n Bicycle | ⍄ | 1\n -----\n Grand total: 20 ← must match the number of classmates asked\n```\nEach group of 5 tally marks is bundled together (four strokes, then a fifth crossing through) so the total can be read at a glance. Check: 10+7+2+1=20, matching the class size exactly.',
'Record 8 test scores in a simple table, one row per learner: 14, 18, 9, 20, 15, 11, 17, 13. Create a table with two columns: "Learner" (1 to 8) and "Score." Enter each learner’s score in its own row, matching the order the scores were given, so no score is misattributed or lost.',
'Before collecting data on "favourite fruit" among classmates, a student needs to decide the categories in advance. Suggest a sensible, exhaustive set of categories, and explain what to do if a classmate names a fruit not on the list. Sensible categories might be: Mango, Orange, Banana, Pineapple, Other. Any fruit not explicitly listed should be recorded under "Other" (a genuine catch-all category decided in advance), rather than inventing a brand-new category mid-collection that earlier responses were never given the chance to be sorted into.',
'A student collecting data on class shoe sizes records one classmate’s response twice because the classmate answered while another student was still being asked. Explain how this affects the data, and how to prevent it. Recording the same person twice inflates that shoe-size category’s count without any real additional evidence, making the whole dataset inaccurate. To prevent this, keep a running checklist of who has already responded, and cross each name off once their data is recorded.',
'A survey asks pupils to describe their favourite subject as "Maths," "English," or "Other," but partway through, a student decides to add a new category "Science" after noticing several "Other" responses actually meant Science. Explain why this is a problem, even though it seems helpful. Any responses recorded as "Other" BEFORE the new "Science" category was added cannot now be reliably reclassified without going back and re-asking those specific pupils — which may not even be possible. All categories must be fixed in advance so every response is treated by the same consistent rule.',
'A class of 25 pupils is surveyed on preferred sport, and the four category totals come out as Football:10, Basketball:6, Athletics:4, Volleyball:6. Check whether this dataset is internally consistent. Add the totals: 10+6+4+6=26, which does NOT match the class size of 25 — this signals a recording error (likely a double-count or a miscount somewhere) that must be found and corrected before the data is used further.'
],
misconceptions:[
'Changing or adding categories partway through data collection — all categories must be decided and fixed before collection begins, so every response is judged by the same consistent set of options.',

'Recording the same person’s response more than once, inflating a category’s true count — always track who has already responded to avoid duplicate entries.',
'Skipping members of the population being surveyed, leaving the dataset incomplete — a good collection process should account for every intended respondent, not just however many happened to be available.',
'Collecting information that is not actually relevant to the specific question being investigated — stay focused on exactly what the question requires, since irrelevant extra data adds confusion without adding value.',
'Failing to check that category totals add up to the known population size after collection — this simple check is often the fastest way to catch a double-count or a missed entry.'
],
guidedPractice:[
'Design a tally table for a class survey on favourite drink, with at least 4 sensible categories decided in advance.',
'Record 6 given ages (11,12,11,13,12,12) into a simple one-row-per-person table.',
'A survey of 15 pupils on pet ownership gives totals Dog:5, Cat:4, None:5, Other:2. Check whether this is internally consistent with a class of 15, and explain your check.'
],
independentPractice:[

'Design a tally table for a survey of 24 classmates on favourite subject, with sensible fixed categories decided before collection.',
'Record 10 given test scores (16,19,12,20,15,18,14,17,13,20) into a simple learner-by-learner table.',
'A survey of 30 pupils on mode of transport gives totals Walking:12, Bus:9, Car:7, Bicycle:3. Check whether this is internally consistent, and explain your reasoning.',
'A student collecting data on favourite colour realises partway through that two pupils gave the answer "turquoise," which was not one of the original categories. Explain what should be done, given that categories must be fixed in advance.',
'Design a data collection plan (question, population, categories, recording method) for finding out how many hours per week classmates spend on homework.',
'A tally table shows: Football llll llll l, Basketball llll ll, Athletics llll. Read off the totals for each category and find the grand total surveyed.',
'A student records survey responses on scraps of paper with no consistent format, then struggles to organise them afterward. Explain what should have been decided in advance to avoid this problem.',
'A survey of 18 pupils on favourite season gives totals that sum to 19. Explain what this mismatch suggests, and what should be done next.',
'Explain, using a specific example, why data collected for "favourite subject" should not also be used to answer an unrelated question about "hours of sleep," even from the same group of pupils.',
'A student collecting height data measures 5 classmates twice by mistake because they lost track of who had already been measured. Suggest one specific method to prevent this happening again.',
'Design fixed categories in advance for a survey asking classmates their favourite type of book (e.g. adventure, romance, fantasy, non-fiction), including a sensible catch-all category.',
'A class of 22 pupils is surveyed on number of siblings, with responses grouped into categories "0," "1," "2," "3 or more." The totals are 4, 8, 6, 5. Check this against the class size and explain what you find.'
],
mastery:{criterion:'Learner plans a data collection with fixed categories in advance, records data consistently using an appropriate method (tally or table), and checks the resulting totals for internal consistency against the known population size.',status:'DEEP_WHEN_PASSED'},boardReady:true
},
{
topicId:'nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-3',classLevel:'JSS1',subject:'Mathematics',
topic:'Data presentation',source:
{authority:'NERDC',url:sourceUrl,page:17},
objectives:['Determine the median of a dataset'],
prerequisites:['Data Collection (previous topic)','ordering numbers from smallest to largest'],
teaching:[
'The MEDIAN of a dataset is the single MIDDLE value once every number has been arranged in order, from smallest to largest. Ordering the data first is not optional — the median is defined entirely by POSITION in an ordered list, so working with unordered data makes it impossible to identify correctly.',
'For an ODD number of values, there is exactly one true middle position: count the total values, add 1, and divide by 2 to find which position (from either end) holds the median — for 5 values, the middle position is (5+1)/2=3rd position.',
'For an EVEN number of values, there is no single middle position — instead there are two middle values, sitting in positions n/2 and (n/2)+1. The median in this case is the MEAN (average) of those two middle values: add them together and divide by 2.',
'Why the even-count case needs averaging, rather than just picking one of the two middle values: picking only one would arbitrarily favour whichever side that value sits on, ignoring genuinely relevant information from the other equally-central value; averaging the two treats both as equally important to defining the true centre of the ordered data.',
'A powerful property of the median, worth understanding rather than memorising: it is RESISTANT to extreme values (very large or very small outliers), because the median only cares about POSITION in the order, not the actual size of the extreme value itself. This makes the median often more representative of a "typical" value than the mean, whenever a dataset contains one or two unusually extreme entries.',
'The median is a different concept from the MODE (the most frequently occurring value) and the MEAN (the sum divided by the count) — all three are ways of describing a dataset’s "centre" or "typical value," but they can give different answers on the same data, and confusing them is a common and testable error.'
],
workedExamples:[
'Find the median of 3, 8, 6, 4, 9, using the ordered-line diagram to spot the middle position.\n\n```\n Ordered: 3 4 [6] 8 9\n Position: 1st 2nd 3rd 4th 5th\n ↑\n MEDIAN (middle position)\n```\n5 values (odd), middle position=(5+1)/2=3rd. The 3rd value is 6. Median=6.',
'Find the median of 3, 8, 6, 4, 9. First order the data: 3, 4, 6, 8, 9. There are 5 values (odd), so the middle position is (5+1)/2=3rd position. The 3rd value in the ordered list is 6. Median=6.',
'Find the median of 2, 4, 7, 9, using the diagram for an EVEN count (two middle values, not one).\n\n```\n Ordered: 2 [4] [7] 9\n Position: 1st 2nd 3rd 4th\n ↑ ↑\n two middle values — average them\n```\n4 values (even), middle positions=2nd and 3rd, which are 4 and 7. Median=(4+7)/2=5.5.',
'Find the median of the unordered set 9, 3, 7, 5, 1. Order first: 1, 3, 5, 7, 9. 5 values (odd), middle position=(5+1)/2=3rd. The 3rd value is 5. Median=5.',
'Find the median of 8, 2, 6, 4. Order first: 2, 4, 6, 8. 4 values (even), middle positions=2nd and 3rd, which are 4 and 6. Median=(4+6)/2=5.',
'A dataset of test scores is 10, 10, 11, 12, 40, where 40 is a clear outlier (perhaps an unusually gifted result). Find the median, and explain why it still represents the data well despite the outlier. Already ordered: 10,10,11,12,40. 5 values, middle position=3rd, which is 11. Median=11. Despite the extreme value of 40, the median (11) still reflects where most of the data actually sits, since the median only depends on POSITION, not on how extreme the highest or lowest value happens to be.',
'A student finds the "middle value" of 7, 2, 9, 4, 5 by simply picking the middle number as it was originally listed (9, the 3rd number given), without reordering first. Identify the error and give the correct median. The data must be ordered before finding the middle position — the ORIGINAL order it was given in is irrelevant. Ordering first: 2,4,5,7,9. Middle position (3rd)=5. Correct median=5, not 9.'
],
misconceptions:[
'Finding a "middle" value from the data in its ORIGINAL, unordered form, rather than ordering it first — the median is defined by position in ORDERED data; skipping this step gives a meaningless answer.',
'For an even-sized dataset, picking just ONE of the two middle values instead of correctly averaging both — an even count always requires taking the mean of both middle values, never just one.',
'Confusing the median with the mode (the most frequent value) or the mean (the sum divided by count) — these are three genuinely different measures, and a question asking specifically for the median must be answered with the position-based method, not one of the others.',

'Miscounting which position is the "middle" for a larger odd dataset, especially forgetting to add 1 before dividing by 2 — always use (n+1)/2 for the middle position with n odd values, and double-check by counting the same number of values on both sides of the chosen position.',
'Assuming an outlier value will distort the median the same way it would distort a mean — the median’s resistance to extreme values is exactly why it is often chosen over the mean when a dataset has one or two unusually large or small entries.'
],
guidedPractice:[
'Find the median of 9, 3, 7, 5, 1, showing the ordering step clearly.',
'Find the median of 8, 2, 6, 4, showing which two middle values you averaged.',
'A dataset is 5, 5, 6, 100. Find the median, and explain in one sentence why it is not badly affected by the value 100.'
],
independentPractice:[
'Find the median of 6, 2, 9, 4, 7.',
'Find the median of 12, 15, 11, 18.',
'Find the median of 3, 3, 3, 8, 9 (repeated values are allowed and treated normally).',
'Find the median of 20, 5, 15, 10, 25, 30 (an even-sized set of 6 values).',
'A student lists 4, 9, 2, 7, 5 and picks 2 as the "middle value" because it is the 3rd number listed. Identify the error and give the correct median.',
'Find the median of a dataset of 8 test scores: 14, 20, 9, 17, 12, 19, 15, 11.',
'Find the median of 1, 1, 2, 2, 3 and explain, in one sentence, the difference between this dataset’s median and its mode.',
'A dataset of 5 house prices (in thousands) is 200, 210, 205, 195, 900, where 900 is an unusually expensive house. Find the median, and explain why it may better represent a "typical" house price here than the mean would.',
'Find the median of an even dataset: 40, 60, 50, 70, 30, 80.',
'A student is given 7 values already sorted in DESCENDING order: 90,80,70,60,50,40,30, and finds the median by picking the 3rd value from the left. Explain whether this works, and if not, correct their method.',
'Find the median of 11, 14, 11, 17, 13, 19 (an even set of 6 values, with a repeated value present).',
'Two datasets both have 5 values. Dataset A: 4,5,6,7,8 (median 6). Dataset B: 4,5,6,7,100 (also median 6). Explain, referencing the median’s resistance to extreme values, why both datasets share the same median despite Dataset B containing a much larger maximum value.'
],
mastery:{criterion:'Learner correctly orders data before finding the median, uses the correct middle-position rule for odd datasets and correctly averages the two middle values for even datasets, and can explain why the median resists distortion from extreme values.',status:'DEEP_WHEN_PASSED'},boardReady:true
}
];
