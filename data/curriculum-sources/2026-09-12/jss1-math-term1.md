# Avora Deep Teaching Standard — Mathematics (REDONE, Full Depth)
## JSS1, First Term

*Exercise format used throughout: each question gives the student a space to write ONLY their final answer. Avora holds the full worked solution separately to check against and to reveal step-by-step guidance if the student's answer is wrong — never shown to the student upfront.*

---

## Topic 1: Whole Numbers

### 1.1 Place Value and Counting in Millions, Billions, Trillions

**Step 1 — What place value actually means**

In the number 4,352, the digit "3" is not simply "three" — its value depends on its position. Counting positions from the right: ones, tens, hundreds, thousands. So the "3" sits in the hundreds position, meaning it's worth 300, not 3. Move that same "3" one position left (4,3520 → wait, let's use a cleaner pair): compare 352 and 3,520 — the "3" in 352 is worth 300, but the "3" in 3,520 is worth 3,000. Same digit, ten times the value, because it moved one position left.

**Step 2 — Why we group numbers in 3s to name big numbers**

Naming numbers would be chaotic if every position needed its own unique word. Instead, we reuse "hundred," "ten," "one" within groups of three digits, and just change the group name (thousand, million, billion, trillion) as we move further left. Each group is exactly 1,000 times the previous one:
- 1,000 (one thousand)
- 1,000 × 1,000 = 1,000,000 (one million)
- 1,000 × 1,000,000 = 1,000,000,000 (one billion)
- 1,000 × 1,000,000,000 = 1,000,000,000,000 (one trillion)

**Step 3 — Reading a large number: full worked method, not just an answer**

Read: 25,800,074,430

First, split into groups of three from the RIGHT (this matters — grouping from the left would misalign the place values):
25 | 800 | 074 | 430

Now name each group starting from the leftmost:
- 25 → this group is in the BILLIONS position → "twenty-five billion"
- 800 → this group is in the MILLIONS position → "eight hundred million"
- 074 → this group is in the THOUSANDS position → "seventy-four thousand"
- 430 → this is the ONES group, read normally → "four hundred and thirty"

Full reading: **twenty-five billion, eight hundred million, seventy-four thousand, four hundred and thirty**

**Worked Example 2 (a number with a zero-group — common tricky case):**
Read: 7,000,412,000
Split: 7 | 000 | 412 | 000
- 7 → billions → "seven billion"
- 000 → this group is entirely zero, so we SKIP naming it (we don't say "zero million") — this is a common misconception point: students sometimes still say "zero million," which is incorrect
- 412 → thousands → "four hundred and twelve thousand"
- 000 → ones group is zero, nothing more to add

Full reading: **seven billion, four hundred and twelve thousand**

**Worked Example 3 (writing figures FROM words, the reverse direction):**
Write in figures: "three hundred and six million, twenty thousand and five"
Build group by group: 306 (million) | 020 (thousand — note: "twenty thousand" fills only the last two digits of that group, so the group is 020, not 20) | 005 (ones — "and five" means just 5 in the ones group, so 005)
Combine: 306,020,005

**Practice Questions (write only your final answer; Avora checks and re-teaches if wrong):**
1. Write in words: 904,540,370,750
2. Write in words: 8,003,000,061 *(this one has a zero group — watch for it)*
3. Write in figures: "nine hundred and four billion, five hundred and forty million, three hundred and seventy thousand, seven hundred and fifty"
4. Which is greater: 727,345,565 or 727,445,565? State your answer and identify exactly which digit position made the difference.
5. Write 1,200,000 in words.

---

### 1.2 Quantitative Reasoning (Whole Numbers)

**Explanation:** These questions test fast number sense — often by comparing several options, so it helps to check each option methodically rather than guessing.

**Worked Example 1:**
"13,500,000 mm in km is: (a) 13.5km (b) 1.35km (c) 1350km (d) 13500km"
Establish the conversion chain first: 10mm=1cm is NOT what we need here — we need 1000mm=1m and 1000m=1km, so 1km = 1,000,000mm.
13,500,000 ÷ 1,000,000 = 13.5km
Now check against the options: (a) matches. We can also rule out the others by reasoning: (c) and (d) would only make sense if we divided by a much smaller number, meaning someone forgot a conversion step — a common exam trap.
Answer: (a)

**Worked Example 2 (testing multiple candidates explicitly):**
"Which of these is the odd one out: 24, 36, 49, 60?" (all should share a property except one)
Test each: 24 = factors include 1,2,3,4,6,8,12,24 (even, many factors); 36 = perfect square (6×6); 49 = perfect square (7×7); 60 = many factors, not a perfect square.
Testing "perfect square" as the shared property: 36 ✓ perfect square, 49 ✓ perfect square, but 24 ✗ and 60 ✗ — two fail, so that's not quite it.
Testing "even number": 24 ✓, 36 ✓, 60 ✓, but 49 ✗ (49 is odd) — only one fails.
Since only 49 breaks the "even number" pattern while every other number checked shares that property, 49 is the odd one out.

**Practice Questions:**
1. Which of the following numbers is the largest: 727,345,565; 727,245,565; 727,445,565; 726,778,876?
2. Convert 5,600,000 grams to kilograms.
3. Which is the odd one out, and why: 15, 20, 25, 32? (Test more than one possible pattern before deciding, as shown above.)

---

## Topic 2: Lowest Common Multiple (LCM)

**Step 1 — What a multiple is, established with a real generation process (not just a definition)**

Take the number 4. Multiply it by 1, 2, 3, 4, 5... one at a time: 4, 8, 12, 16, 20... Each result is called a multiple of 4. Notice this list never ends — there are infinitely many multiples of any number.

**Step 2 — What "common" and "lowest" mean, shown by actually generating both lists side by side**

Generate multiples of 4: 4, 8, 12, 16, 20, 24, 28...
Generate multiples of 6: 6, 12, 18, 24, 30...

Now compare the two lists directly, term by term, to find numbers that appear in BOTH:
- Is 4 in the multiples-of-6 list? No.
- Is 8 in the multiples-of-6 list? No.
- Is 12 in the multiples-of-6 list? Yes! → this is a common multiple.
- Continuing, 24 also appears in both lists → also a common multiple.

Between 12 and 24 (and any further ones), the LOWEST common multiple is **12**.

**Step 3 — A second, more efficient method (prime factorization), derived by comparing to the listing method so students see why it works, not just that it works**

Find the LCM of 12 and 18 using prime factors.
12 = 2×2×3 (i.e., 2²×3)
18 = 2×3×3 (i.e., 2×3²)

Rule (which we can verify against the listing method): for the LCM, take the HIGHEST power of every prime that appears in EITHER number.
- Highest power of 2 appearing: 2² (from 12)
- Highest power of 3 appearing: 3² (from 18)
LCM = 2²×3² = 4×9 = 36

**Verification against listing (to prove the shortcut actually works, not just trust it blindly):**
Multiples of 12: 12,24,36...
Multiples of 18: 18,36...
First common value: 36 ✓ matches the prime-factorization answer.

**Worked Example (three numbers):**
Find the LCM of 3, 4, and 5.
3=3, 4=2², 5=5 (all different primes, no overlap)
LCM = 3×2²×5 = 3×4×5 = 60

**Practice Questions:**
1. Find the LCM of 6 and 8 using the listing method (write out both lists before answering).
2. Find the LCM of 15 and 20 using prime factorization.
3. Find the LCM of 3, 4, and 5 — but this time verify your prime-factorization answer using the listing method for at least one pair, showing your check.
4. Two bells ring every 8 minutes and every 12 minutes. If they ring together now, after how many minutes will they next ring together simultaneously? Explain why this is an LCM problem (what does "ringing together again" correspond to, in terms of multiples?).

---

## Topic 3: Highest Common Factor (HCF)

**Step 1 — What a factor is, generated by testing divisibility, not just listed**

To find the factors of 12, test every whole number from 1 up to 12 to see if it divides evenly (no remainder):
1÷ → 12÷1=12 ✓, 2÷ → 12÷2=6 ✓, 3÷ → 12÷3=4 ✓, 4÷ → 12÷4=3 ✓, 5÷ → 12÷5=2.4 ✗ (not a factor), 6÷ → 12÷6=2 ✓, ... up to 12÷12=1 ✓
Factors of 12: 1, 2, 3, 4, 6, 12

**Step 2 — Common factors and the highest one, found by direct comparison**

Factors of 12: 1, 2, 3, 4, 6, 12
Factors of 18: 1, 2, 3, 6, 9, 18

Compare both lists directly: which numbers appear in BOTH?
1 ✓ (in both), 2 ✓ (in both), 3 ✓ (in both), 4 — only in the 12 list, 6 ✓ (in both), 9 — only in the 18 list, 12 — only in the 12 list, 18 — only in the 18 list.
Common factors: 1, 2, 3, 6 → the HIGHEST of these is **6**.

**Step 3 — Prime factorization method, verified against the listing method above**

24 = 2×2×2×3 (2³×3)
36 = 2×2×3×3 (2²×3²)

Rule: for HCF, take the LOWEST power of each prime that appears in BOTH numbers (a prime only in one number contributes nothing to the HCF, since it's not "common").
- Power of 2: lowest of (2³, 2²) is 2²
- Power of 3: lowest of (3¹, 3²) is 3¹
HCF = 2²×3 = 4×3 = 12

**Worked Example (a case where a prime appears in only one number, to show why it's excluded):**
Find the HCF of 20 and 9.
20 = 2²×5, 9 = 3²
There is NO prime common to both (2 and 5 aren't in 9's factorization; 3 isn't in 20's). This means the HCF is 1 — the two numbers are called "co-prime." This is a useful edge case to recognize.

**Practice Questions:**
1. Find the HCF of 8 and 12 by listing all factors of each first.
2. Find the HCF of 18 and 27 using prime factorization, then verify by listing.
3. Find the HCF of 14 and 15. What do you notice, and what is this situation called?
4. A teacher has 24 pencils and 36 erasers and wants to make identical sets for as many students as possible with nothing left over. How many students can receive a set, and what exactly is in each set? Explain why this is an HCF problem (what does "identical sets with nothing left over, as many as possible" correspond to?).

---

## Topic 4: Counting in Base Two

**Step 1 — Why any base is possible, established with reasoning, not asserted**

A number system needs two things: a fixed set of allowed digits, and a rule for when to "carry" to a new column. Base 10 uses digits 0–9 and carries after reaching 10. There's nothing mathematically special forcing us to use exactly 10 digits — it's simply what matches human finger-counting. A system could just as validly use only 2 digits (0 and 1), carrying much sooner — this is base two, used by computers because electronic switches naturally have two states (on/off).

**Step 2 — Counting forward in base two, showing the "carry" moment explicitly each time it happens**

0 → 1 (no carry needed yet, both are valid single digits)
1 → next number: we've used both available digits (0,1) in the ones column, so we CARRY: the ones column resets to 0, and a new column is added: **10** (read as "one-zero," representing the base-ten number 2)
10 → 11 (still valid, second column can be 1 too)
11 → both columns are now maxed at 1, so CARRY again: ones resets to 0, second column also resets to 0 and carries into a third column: **100** (base-ten value 4)

Continuing this pattern, from 0 to 15 in base ten:
0=0, 1=1, 2=10, 3=11, 4=100, 5=101, 6=110, 7=111, 8=1000, 9=1001, 10=1010, 11=1011, 12=1100, 13=1101, 14=1110, 15=1111

**Practice Questions:**
1. Write out the base-two count from 0 to 15 yourself (don't just copy — work through each carry moment).
2. What is the base-two number right after 111₂? Explain using the "running out of digits, carry" reasoning, not just by copying a pattern.
3. Between 1000₂ and 1111₂, how many base-two numbers are there in total? (Hint: convert both to base ten first to check your count.)

---

## Topic 5: Conversion of Base 10 to Binary (1–10)

**Step 1 — Recall binary place value explicitly before converting**

In base ten, positions represent powers of 10: ...100, 10, 1. In base two, positions represent powers of 2: ...8, 4, 2, 1. This is the reverse process we'll use to check our conversions.

**Step 2 — The repeated-division method, shown with EVERY division step, not skipped**

Convert 7 to binary:
7 ÷ 2 = 3 remainder **1**
3 ÷ 2 = 1 remainder **1**
1 ÷ 2 = 0 remainder **1**
We stop once the quotient reaches 0. Read the remainders from BOTTOM to TOP: 111₂

**Check using place value (always verify, don't just trust the method blindly):**
111₂ = (1×4)+(1×2)+(1×1) = 4+2+1 = 7 ✓ matches.

**Worked Example 2 (an even number, to show the pattern of a 0 remainder appearing):**
Convert 6 to binary:
6÷2 = 3 remainder **0**
3÷2 = 1 remainder **1**
1÷2 = 0 remainder **1**
Reading bottom to top: 110₂
Check: (1×4)+(1×2)+(0×1) = 4+2+0 = 6 ✓

**Practice Questions:**
1. Convert 5 to binary, showing every division step, then check your answer using place value.
2. Convert 9 to binary, showing every step and the check.
3. Convert 10 to binary, showing every step and the check.
4. A student converts 8 to binary and gets 111₂. Use the place-value check to show this is wrong, and find the correct answer.

---

## Topic 6: Fractions

### 6.1 Equivalent Fractions

**Step 1 — Why multiplying top and bottom by the same number doesn't change the value (the "multiplying by 1 in disguise" idea, shown concretely)**

Any fraction where the numerator equals the denominator equals 1: 3/3=1, 5/5=1, 100/100=1. Multiplying ANY number by 1 doesn't change its value. So multiplying ½ by 3/3 (which equals 1) doesn't change ½'s value — it only changes how it LOOKS:
½ × 3/3 = 3/6

Since 3/3 is just "1 in disguise," ½ and 3/6 must represent the exact same amount — this is why they're called equivalent.

**Worked Example (testing whether two given fractions ARE equivalent — not just generating one):**
Is 4/10 equivalent to ⅖?
Method: check if there's a single multiplier connecting numerator to numerator AND denominator to denominator.
2×2=4 ✓ (numerators connect via ×2)
5×2=10 ✓ (denominators connect via the SAME ×2)
Since the same multiplier (×2) works for both top and bottom, yes, they are equivalent.

**Worked Example (a case that looks similar but ISN'T equivalent, to build the discrimination skill):**
Is 3/8 equivalent to 4/10?
3→4 would need ×(4/3), and 8→10 would need ×(10/8)=×(5/4). These multipliers are DIFFERENT (4/3 ≠ 5/4), so they are NOT equivalent — even though the numbers "look similar in size."

**Practice Questions:**
1. Find two fractions equivalent to ¾, showing the multiplier used for each.
2. Is 6/9 equivalent to ⅔? Show the multiplier check.
3. Is 5/12 equivalent to 10/20? Show your check clearly (don't just guess from appearance).
4. Simplify 12/18 to its lowest terms using the HCF method (find HCF of 12 and 18 first, then divide both top and bottom by it).

### 6.2 Ordering Fractions

**Step 1 — Why fractions with different denominators can't be compared by looking at numerators alone**

⅗ and ⅔: comparing just numerators (3 vs 2) would wrongly suggest ⅗ is always the bigger type of comparison — but the denominators represent DIFFERENT sized pieces (fifths vs thirds), so this comparison is invalid until pieces are the same size.

**Worked Example (full LCM-based ordering, every conversion step shown):**
Order ⅔, ¾, ⅗ from smallest to largest.
Find LCM of 3, 4, 5: 3=3, 4=2², 5=5 → LCM=3×2²×5=60
Convert each: ⅔ = (2×20)/(3×20) = 40/60; ¾ = (3×15)/(4×15) = 45/60; ⅗ = (3×12)/(5×12) = 36/60
Compare numerators now that denominators match: 36 < 40 < 45
Order: ⅗, ⅔, ¾

**Practice Questions:**
1. Order ½, ⅓, ⅖ from smallest to largest, showing every conversion step.
2. Which is bigger: 5/8 or 7/12? Show full working, not just the final comparison.

### 6.3 Fractions to Decimals and Vice Versa

**Step 1 — Why a fraction bar literally means division**

a/b means "a divided by b" — this isn't a separate rule to memorize, it's the actual definition of what a fraction represents (splitting 'a' wholes into 'b' equal parts, or equivalently, a÷b).

**Worked Example (a fraction that terminates cleanly):**
¾ = 3÷4 = 0.75

**Worked Example (a fraction that produces a recurring decimal, an important edge case):**
⅓ = 1÷3 = 0.333... (the 3 repeats forever) — this connects back to the rational-number idea that recurring decimals are still exact, expressible fractions.

**Worked Example (decimal to fraction, including simplifying):**
Convert 0.6 to a fraction: 0.6 = 6/10. Simplify using HCF of 6 and 10 (=2): 6/10 = ⅗

**Practice Questions:**
1. Convert ⅝ to a decimal.
2. Convert ⅙ to a decimal (note: this one recurs — write out at least 4 decimal places).
3. Convert 0.35 to a fraction in lowest terms, showing the simplifying step.

### 6.4 Fractions to Percentages and Vice Versa

**Step 1 — What "percent" means literally, before converting**

"Percent" comes from "per centum" — meaning "out of 100." So converting to a percentage means re-expressing a fraction as "how many out of 100."

**Worked Example:**
¾ → first convert to a decimal (0.75), then multiply by 100 (since percent means ×100 of the decimal): 75%

**Worked Example (percentage to fraction, including simplifying):**
40% = 40/100. Simplify using HCF of 40,100 (=20): 40/100 = ⅖

**Practice Questions:**
1. Convert ⅕ to a percentage.
2. Convert 65% to a fraction in lowest terms.
3. Convert 7/20 to a percentage.

---

## Topic 7: Addition and Subtraction of Whole Numbers

### 7.1 Why We Line Up by Place Value

**Step 1 — Show what goes WRONG if you don't line up correctly, before showing the correct method**

Add 345 + 27 incorrectly by misaligning digits (a common beginner error — lining up from the LEFT instead of the right):
  345
+ 27  (misaligned: 3 lines with 2... treating them as matching positions)
This would wrongly compute as if adding 345+270 or similar — giving a wrong answer, because it pairs a hundreds digit with a tens digit.

Correctly aligned (from the right, matching ones-with-ones, tens-with-tens):
  345
+  27
-----
  372

**Step 2 — Number line model for addition and subtraction, including negative movement**

On a number line, addition moves RIGHT, subtraction moves LEFT — this applies even when starting from a negative position.

**Worked Example:**
−3 + 5: start at −3, move 5 steps right → −3,−2,−1,0,1,2 → lands on **2**

**Worked Example (subtraction resulting in a negative, a common tricky case):**
4 − 9: start at 4, move 9 steps left → 4,3,2,1,0,−1,−2,−3,−4,−5 → lands on **−5**

### 7.2 Positive and Negative Integers — Establishing the CONCEPT, Not Just the Symbol

**Step 1 — What negative numbers represent in real life, with more than one grounding example**

Example A (temperature): 0°C is the freezing point of water. −5°C means 5 degrees BELOW that reference point — not "below zero" in some abstract sense, but literally colder than ice forms.

Example B (money/debt): Having ₦0 means no money. Owing ₦2000 (a debt) is represented as −2000 — you don't just "have none," you're below the zero-reference by that amount, and would need to receive ₦2000 just to reach zero.

**Worked Example (combining a debt and an income, full narrative reasoning):**
A shop owner owes ₦2,000 (represented as −2000) and then earns ₦5,000.
New balance = −2000 + 5000 = 3000
Interpretation: the owner is no longer in debt — after clearing the ₦2,000 owed, they have ₦3,000 remaining in credit. (Note how the calculation naturally accounts for "paying off the debt first" — that's built into the negative number arithmetic, not a separate step.)

**Worked Example (double negative — subtracting a negative, a genuine misconception point):**
Calculate: −7 + 3 − (−5)
A common error is treating "−(−5)" as still negative. But subtracting a negative means REMOVING a debt, which increases your total — same logic as "un-owing" money makes you richer, not poorer. So −(−5) becomes +5.
−7 + 3 − (−5) = −7+3+5 = 1

**Practice Questions:**
1. The temperature was −4°C and rose by 9°C. What is the new temperature? Explain in words what "rising" means on the number line.
2. A man had a debt of ₦1,500 and paid back ₦900. Represent this using negative numbers, calculate his remaining balance, and state in words whether he is still in debt or now in credit.
3. Calculate: −7 + 3 − (−5), explaining the double-negative step in your own words.
4. Calculate: 5 − (−3) − 8, and check your understanding by explaining why "−(−3)" doesn't just cancel to zero.

---

## Topic 8: Addition and Subtraction of Fractions

**Step 1 — Why fractions need a common denominator (an analogy AND a visual reason)**

Analogy: 2 apples + 3 oranges isn't "5" of anything meaningful, because they're different units. Similarly, ⅓ and ¼ represent different-SIZED pieces (a third of something is bigger than a quarter of the same thing) — so we can't just add the numerators until the pieces are resized to match.

**Step 2 — Full worked conversion, every step shown**

⅓ + ¼
Find LCM of 3 and 4: 12
Convert ⅓: multiply top and bottom by 4 (since 3×4=12): ⅓ = 4/12
Convert ¼: multiply top and bottom by 3 (since 4×3=12): ¼ = 3/12
Now that pieces are the same size, add numerators directly: 4/12 + 3/12 = 7/12

**Worked Example (subtraction with mixed numbers — full conversion to improper fractions shown, a common source of errors if skipped)**
2⅓ − 1½
Step 1: convert both to improper fractions.
2⅓ = (2×3+1)/3 = 7/3
1½ = (1×2+1)/2 = 3/2
Step 2: find LCM of 3 and 2 = 6
7/3 = 14/6, 3/2 = 9/6
Step 3: subtract: 14/6 − 9/6 = 5/6

**Worked Example (a subtraction requiring "borrowing" from the whole number, an important edge case):**
3⅕ − 1⅗
Convert to improper: 3⅕=16/5, 1⅗=8/5
16/5 − 8/5 = 8/5 = 1⅗ (convert back to a mixed number: 8÷5=1 remainder 3, so 1⅗)

**Practice Questions:**
1. Add: ⅖ + ⅓, showing every conversion step.
2. Subtract: ¾ − ⅖, showing every conversion step.
3. A tailor used ⅔ metre of cloth for a shirt and ¾ metre for a skirt. How much cloth was used in total? State your final answer as a mixed number if applicable.
4. Musa had 3½ bags of rice and used 1¾ bags. How much does he have left? Show the improper-fraction conversion step.
5. Calculate 4⅙ − 2⅚ (this one requires care — check whether you need to convert to improper fractions to handle it correctly, and show why).

---

This completes the corrected, full-depth **JSS1 Maths, First Term** (Topics 1–8). This is the depth standard going forward. Continuing next to **JSS1 Second Term** rebuilt at this same depth.
