# Avora Deep Teaching Standard — Mathematics (Full Depth, Zero Assumptions)
## JSS2, First Term

*Note on diagrams: wherever a diagram aids understanding, this file describes exactly what Avora's whiteboard should draw, step by step, so the visual and the narration stay in sync — not just a mention that "a diagram helps."*

---

## Topic 1: Whole Numbers — Standard Form and Indices

### 1.1 Standard Form (Scientific Notation)

**Step 1 — Establish the problem standard form solves, with a concrete comparison**

Compare writing 384,400,000 (the approximate distance to the moon in km) versus writing it as 3.844×10⁸. The second form instantly tells us the SIZE of the number (via the power of 10) without counting digits — this becomes extremely useful once numbers get very large or very small, and especially for comparing sizes quickly.

**Step 2 — Establish the rule for finding the power of 10 by actually counting decimal-point movement, shown step by step, not just stated**

To convert 384,400,000 to standard form:
Write the decimal point's original position (at the very end, after the last zero): 384400000.
Move the decimal point LEFT, one digit at a time, until exactly ONE non-zero digit remains before it:
384400000. → 38440000.0 → 3844000.00 → ... continue counting each single-digit move.
Count the total number of moves: **8 moves** to land at 3.844
This count of moves becomes the power: 3.844 × 10⁸

**Diagram for Avora's whiteboard (describe exactly what to draw):**
Draw the number 3 8 4 4 0 0 0 0 0 as individual digit boxes in a row. Draw an arrow starting after the first digit (3) and animate/count the decimal point hopping left across each subsequent digit, with a small number counter (1,2,3...8) appearing above each hop, ending with the point placed right after the "3", and the label "×10⁸" appearing once the count reaches 8.

**Worked Example 2 (a small number — decimal point moves RIGHT, and the power becomes NEGATIVE, explained explicitly why)**
Convert 0.0000021 to standard form.
Move the decimal point RIGHT until one non-zero digit remains before it: 0.0000021 → 0.000021 → ... count each move: 6 moves to reach 2.1
Since we moved RIGHT (meaning the original number was smaller than the "2.1" we ended up with), the power must be NEGATIVE to "shrink" 2.1 back down to the original tiny size: 2.1×10⁻⁶

**Worked Example 3 (converting FROM standard form back to an ordinary number — the reverse direction, testing full understanding)**
Write 6.02×10⁵ as an ordinary number.
The power is +5, meaning we move the decimal point RIGHT by 5 places (the opposite direction of Worked Example 2's negative case): 6.02 → 60.2 → 602. → 6020. → 60200. → 602000.
Answer: 602,000

**Practice Questions:**
1. Write 52,000 in standard form, showing every decimal-point movement counted individually.
2. Write 0.00034 in standard form, stating clearly why the power is negative.
3. Write 6.02×10⁵ as an ordinary number (already shown above — now do 4.15×10⁴ yourself, showing every move).
4. Which is bigger: 3.2×10⁴ or 2.9×10⁵? Explain your reasoning using ONLY the powers (without converting to ordinary numbers first) — what does a bigger power tell you, assuming the "number in front" is between 1 and 10 in both cases?

### 1.2 Indices (Introductory Laws)

**Step 1 — Establish what an index/power represents: REPEATED MULTIPLICATION, explicitly distinguished from repeated addition, since confusing the two is a very common error**

2³ means 2×2×2 (three 2's multiplied together) = 8. This is NOT the same as 2×3=6 (which would be repeated ADDITION, i.e., 2+2+2). Flag this distinction directly: many students confuse "2 to the power 3" with "2 times 3" — they are different operations entirely.

**Step 2 — Derive the multiplication law of indices by fully expanding both sides, not stating the rule first**

2³ × 2² — expand each fully first:
2³ = 2×2×2
2² = 2×2
So 2³×2² = (2×2×2)×(2×2) = 2×2×2×2×2 (five 2's multiplied together) = 2⁵

Notice: 3+2=5. The rule "when multiplying same-base powers, ADD the indices" isn't an arbitrary shortcut — it's simply what happens naturally when you count all the multiplied 2's together.

**Worked Example (applying the derived law):**
Simplify: 3²×3⁴ = 3^(2+4) = 3⁶ (evaluate if needed: 3⁶=729)

**Worked Example (testing the SAME reasoning process for DIVISION, having the student discover the division law by analogy)**
Simplify: 2⁵÷2²
Expand fully: (2×2×2×2×2)÷(2×2)
The two 2's on the bottom CANCEL two of the five 2's on top (since dividing by 2 twice removes two factors of 2): leaving 2×2×2 = 2³
Notice: 5−2=3. So the division law is: when dividing same-base powers, SUBTRACT the indices — again derived by full expansion, not stated blindly.

**Practice Questions:**
1. Evaluate: 2⁴ (write out the full multiplication, don't just state the answer).
2. Simplify: 5²×5³ (leave in index form first, THEN evaluate the final number).
3. Using the same full-expansion method shown above for division, simplify 3⁶÷3², showing the cancellation explicitly.
4. A student claims 2³×3² = 6⁵ (adding ALL the numbers and powers together). Explain, using the derivation method above, why this is WRONG (hint: does the multiplication law apply when the BASES are different, i.e., 2 and 3 rather than the same base?).

---

## Topic 2: Revision — Prime Factors, LCM, HCF; Squares and Square Roots

*(Prime factors, LCM, and HCF were fully derived in JSS1 — see the JSS1 Term 1 file for the complete step-by-step derivation. This topic briefly recalls them before extending to squares/roots, which are new.)*

### 2.1 Squares and Square Roots

**Step 1 — Establish squaring and square-rooting as INVERSE (opposite) operations, using the same "undo" logic already established for equations in JSS1**

Squaring a number means multiplying it by itself: 5²=5×5=25. Just as subtraction "undoes" addition, finding a square root "undoes" squaring — it asks: "what number, multiplied by itself, gives this result?"

**Diagram for Avora's whiteboard:**
Draw a square grid, 5 boxes by 5 boxes (5×5=25 total small squares), visually showing WHY "squaring" is named after literal squares — the picture directly represents 5² as the AREA of a 5-by-5 square, connecting back to the area concept from JSS1.

**Worked Example 1:**
Find √144. Think: "what number times itself gives 144?" Test candidates methodically rather than guessing randomly: 10×10=100 (too small), 12×12=144 ✓ (found it), so √144=12.

**Worked Example 2 (testing understanding of a NON-perfect square, an important edge case)**
Is there a whole number that equals √50?
Test nearby whole numbers: 7×7=49 (close, but not 50), 8×8=64 (too big). Since 50 falls BETWEEN 49 and 64, there is NO whole number whose square is exactly 50 — meaning √50 is not a whole number (it's actually an irrational number, a concept explored more fully in JSS3).

**Practice Questions:**
1. Evaluate: 7² (show the full multiplication, and relate it to the area of a 7-by-7 square).
2. Find √81, testing at least two candidate numbers before confirming the answer.
3. Find √225.
4. Explain, using the candidate-testing method from Worked Example 2, why √50 is NOT a whole number, and state which TWO whole numbers it falls between.

---

## Topic 3: Approximation — Decimal Places and Significant Figures

*(The core rounding rule — "5 rounds up," derived from a number line — was fully established in JSS1 Term 2. This topic extends that rule to two new precision formats.)*

### 3.1 Decimal Places

**Step 1 — Recall the core rounding rule explicitly, then apply it to a NEW context (decimal places) rather than assuming the transfer is obvious**

Rounding "to n decimal places" means keeping exactly n digits after the decimal point, deciding whether to round up or down by looking at the very NEXT digit (the one just after the cutoff) — using the SAME "5 or more rounds up" rule from JSS1.

**Worked Example:**
Round 3.6789 to 2 decimal places.
Identify the cutoff: we want to KEEP 2 digits after the point (6 and 7), so the digit that DECIDES rounding is the 3rd decimal digit (8).
Since 8≥5, round the 2nd decimal digit up: 7 becomes 8.
Answer: 3.68

### 3.2 Significant Figures

**Step 1 — Establish what "significant" means, with explicit rules for WHICH zeros count and which don't (this is the genuinely new, tricky part)**

ALL non-zero digits are significant (they carry real measured information). Zeros are trickier:
- Zeros BETWEEN two non-zero digits ARE significant (e.g., in 105, the 0 counts, because it's needed to correctly show the size of the number).
- LEADING zeros (before the first non-zero digit, e.g., in 0.0034) are NEVER significant — they only show the DECIMAL PLACE/scale, not measured precision.
- TRAILING zeros after a decimal point (e.g., in 3.40) ARE significant — they show the measurement was precise enough to confirm that digit is exactly zero, not just unknown.

**Worked Example 1 (leading zeros excluded):**
Round 0.004567 to 2 significant figures.
Identify significant digits: the leading zeros (0.00) don't count. The first significant figure is 4, the second is 5.
Look at the NEXT digit (6) to decide rounding: 6≥5, round up.
Answer: 0.0046

**Worked Example 2 (a case with a significant zero BETWEEN digits, to test the middle-zero rule explicitly)**
Round 30,547 to 3 significant figures.
Significant digits, counted from the first non-zero digit: 3, 0 (this counts, it's between digits), 5 — that's our 3 significant figures.
Look at the next digit (4) to decide: 4<5, round down (keep as is).
Answer: 30,500 (note: the trailing zeros here are placeholders to preserve the number's SIZE, not additional significant figures)

**Practice Questions:**
1. Round 27.348 to 1 decimal place.
2. Round 5,678 to 2 significant figures.
3. Round 0.09876 to 3 significant figures, explicitly stating which digits you identified as significant and why the leading zeros don't count.
4. How many significant figures does the number 2.500 have? Explain using the "trailing zeros after a decimal point ARE significant" rule.

---

## Topic 4: Fractions, Percentages, Ratio, and Rate

### 4.1 Percentages — Increase and Decrease

**Step 1 — Establish, with an explicit WRONG-approach comparison, why percentage change must be based on the ORIGINAL value, not the new value**

**Worked Example (showing the WRONG method first, then the correct one, so the error is unmistakable):**
A price increases from ₦200 to ₦250. Find the percentage increase.

WRONG approach (a common error): some students calculate the increase (₦50) as a percentage of the NEW value (250): 50/250×100=20%. This is INCORRECT, because "percentage increase" should describe how much bigger the change is COMPARED TO where it started, not compared to where it ended up.

CORRECT approach: divide the increase by the ORIGINAL value: 50/200×100 = **25%**

**Diagram for Avora's whiteboard:**
Draw a bar representing the ORIGINAL value (₦200) as a full-width rectangle. Draw a second, longer bar next to it representing the NEW value (₦250), aligned at the same starting edge. Shade the EXTRA portion (the ₦50 increase) and visually connect it back to the ORIGINAL bar's length (not the new one) to show which value the percentage should be calculated against.

**Practice Questions:**
1. A quantity decreases from 80 to 60. Find the percentage decrease (careful: base it on the ORIGINAL value, 80).
2. A trader's profit increased from ₦3,000 to ₦3,900. Find the percentage increase.
3. If a price is reduced by 15% from ₦4,000, find the new price (this is the REVERSE direction — first find 15% of 4,000, then SUBTRACT it from 4,000).
4. A student calculates a percentage decrease from 100 to 80 as "20/80×100=25%." Identify their error using the WRONG/CORRECT comparison method shown above, and give the correct answer.

### 4.2 Ratio

**Step 1 — Establish ratio as a DIRECT comparison, distinct from a fraction (a part-to-whole comparison), with an explicit example contrasting the two**

A ratio like 2:3 compares two quantities directly to EACH OTHER (for every 2 of one thing, there are 3 of the other). This is different from a fraction, which compares a PART to the WHOLE. If a classroom has 2 boys for every 3 girls (ratio 2:3), the FRACTION of the class that is boys is 2 OUT OF THE TOTAL 5 parts (2+3=5), i.e., ⅖ — not ⅔. This distinction (ratio vs. fraction-of-total) is a genuine, common point of confusion.

**Worked Example (full sharing method, with the fraction-of-total distinction reinforced):**
Share ₦600 between two people in the ratio 2:3.
Total parts = 2+3 = 5 (this total represents the WHOLE, matching the fraction idea above)
Value of each part = 600÷5 = ₦120
First person's share = 2 parts × 120 = ₦240 (this is ⅖ of the total, NOT the ratio number 2 itself)
Second person's share = 3 parts × 120 = ₦360 (⅗ of the total)
Check: 240+360=600 ✓ (always verify shares add back to the original total)

**Diagram for Avora's whiteboard:**
Draw a single bar of length 600 (representing the total), divided into 5 EQUAL segments (since total parts=5). Shade 2 segments one color (labeled "Person A, ₦240") and 3 segments another color (labeled "Person B, ₦360"), visually showing how the ratio splits the single bar.

**Practice Questions:**
1. Share 40 sweets between two children in the ratio 3:5, showing the total-parts step explicitly.
2. Simplify the ratio 12:18 to its lowest terms (recall the HCF method from JSS1 — find HCF of 12 and 18 first, then divide both sides by it).
3. A recipe uses flour and sugar in the ratio 5:2. If 15kg of flour is used, how much sugar is needed? (Hint: find the value of ONE "part" first, using the flour amount and its ratio number.)
4. A class has a boy-to-girl ratio of 3:4. If there are 28 students total, how many are boys? Explain the difference between "3 out of 7 parts" (the ratio-based fraction) and just "3" (the raw ratio number).

### 4.3 Rate and Proportion

**Step 1 — Establish "rate" as a comparison of two DIFFERENT kinds of quantities (unlike ratio, which usually compares the same kind), connecting explicitly to the direct-proportion idea from earlier general work**

A rate like "km per hour" compares DISTANCE to TIME — two different types of measurement, unlike a ratio (e.g., boys to girls, both counting people). This connects to direct proportion: as time increases, distance traveled increases at a steady rate.

**Worked Example (full proportion reasoning, not just formula plug-in):**
A car travels 180km in 3 hours. Find its rate (speed) in km/hour, then use this rate to find how far it travels in 5 hours.
Step 1 (find the rate): 180km ÷ 3 hours = 60 km per hour (this tells us the distance covered in JUST ONE hour)
Step 2 (use the rate for a NEW time): since the rate is constant (direct proportion), distance in 5 hours = 60×5 = 300km

**Practice Questions:**
1. A car travels 180km in 3 hours. Find its rate (speed) in km/hour.
2. If 5kg of rice costs ₦4,000, find the cost per kg, then use it to find the cost of 8kg (show both steps: find the "per unit" rate first, then scale up).
3. A tap fills a tank at a rate of 15 litres per minute. How long will it take to fill a 180-litre tank? (Hint: this is the REVERSE direction — you know the rate and the total, and need to find time.)

---

## Topic 5: Transactions in the Home and Office

### 5.1 Household Arithmetic (Budgeting)

**Worked Example (full percentage-of-total reasoning, connecting directly back to Topic 4.1):**
A family's monthly income is ₦150,000. They spend 40% on rent, 25% on food, and save the rest. Find the amount saved.
Rent = 40% of 150,000 = (40/100)×150,000 = ₦60,000
Food = 25% of 150,000 = (25/100)×150,000 = ₦37,500
Total spent = 60,000+37,500 = ₦97,500
Amount saved = Total income − Total spent = 150,000−97,500 = **₦52,500**

**Practice Questions:**
1. A family spends 30% of ₦200,000 income on school fees. How much is left for other expenses?
2. A water bill is ₦4,500 and a light bill is ₦6,200. If both are split EQUALLY among 4 flatmates, how much does each pay? (This uses division, not percentage — identify which operation the word "equally" signals.)
3. A civil servant earns ₦180,000 monthly. If 12% is deducted for pension and 8% for tax, find the amount they take home after BOTH deductions.

### 5.2 Commercial Arithmetic — Simple Interest

**Step 1 — Derive the simple interest formula by reasoning through ONE year at a time, rather than presenting the formula immediately**

If ₦40,000 earns 5% interest per year, then EACH year, the interest earned is a FIXED amount: 5% of 40,000 = ₦2,000 (note: with SIMPLE interest, this amount doesn't change year to year, unlike compound interest studied in JSS3, where interest is calculated on a GROWING amount).
Over 3 years, since the same ₦2,000 is earned each year: Total interest = 2,000×3 = ₦6,000

**Step 2 — Now express this reasoning as the general formula, showing it matches**

I = (P×R×T)/100, where P=principal (original amount), R=rate per annum (%), T=time in years.
Check against our reasoning: I = (40,000×5×3)/100 = 600,000/100 = ₦6,000 ✓ matches exactly.

**Practice Questions:**
1. Find the simple interest on ₦25,000 for 2 years at 8% per annum, first reasoning through ONE year's interest before multiplying by the number of years.
2. A sum of ₦60,000 is invested and earns ₦9,000 simple interest after 3 years. Find the rate per annum (this requires rearranging the formula — first find the ANNUAL interest by dividing 9,000 by 3 years, then find what percentage that is of ₦60,000).

---

## Topic 6: Multiplication and Division of Directed (Negative) Numbers

**Step 1 — Establish the sign rules using an extended, explicit PATTERN table, not just a memorized rule (recall the pattern-based reasoning from JSS1's integer work)**

Consider the pattern of 3×(a decreasing number):
3×2=6, 3×1=3, 3×0=0, 3×(−1)=? Following the CONSISTENT pattern (each step down by 3): 3×(−1) should be −3, and indeed it is. This shows WHY a positive times a negative gives a negative — it's not an arbitrary rule, it CONTINUES the same pattern that already held for positive numbers.

Now consider (−3)×(a decreasing number): (−3)×2=−6, (−3)×1=−3, (−3)×0=0, (−3)×(−1)=? Following the pattern (each step UP by 3 as the second number decreases by 1, since we're now going in the negative direction): (−3)×(−1) should be +3. This shows WHY a negative times a negative gives a positive.

**Worked Example (Division, derived as the INVERSE of multiplication, connecting to the "undo" logic already used for equations):**
(−20)÷(−5) = ? Think of division as asking: "what number, when multiplied by −5, gives −20?" Test: (−5)×4=−20 ✓. So (−20)÷(−5)=4 (both negative → positive, matching the multiplication pattern).

**Practice Questions:**
1. Calculate: (−7) × 3, and verify using the pattern-table reasoning (what does the pattern say a positive-times-negative should give?).
2. Calculate: (−8) × (−2), verifying using the pattern reasoning for negative-times-negative.
3. Calculate: (−36) ÷ (−9), using the "what number times −9 gives −36" reasoning.
4. Calculate: 45 ÷ (−9).
5. A student calculates (−6)×(−3)×(−2) and gets +36. Work through this step by step (multiply two at a time) to check whether this is correct, paying attention to how the sign changes with EACH multiplication.

---

## Topic 7: Algebraic Expressions (Introductory)

**Step 1 — Recall coefficients and like terms from JSS1 explicitly, then extend to MULTIPLYING algebraic terms together, which is genuinely new**

**Worked Example 1 (multiplying different letters):**
Simplify: 3a × 4b
Multiply the NUMBER parts together (3×4=12), then simply write the letters next to each other (since ab means a×b, by algebraic convention): **12ab**

**Worked Example 2 (multiplying the SAME letter — connects directly to the indices law derived in Topic 1)**
Simplify: 2x × 3x
Multiply the numbers: 2×3=6. For the letters: x×x — recall the indices law (Topic 1): x¹×x¹=x^(1+1)=x². 
Result: **6x²**

**Practice Questions:**
1. Simplify: 5m × 2n
2. Simplify: 4y × 3y, showing the indices-law step explicitly (why does y×y become y²?).
3. Simplify: 2a × 3a × b (multiply the numbers first, then handle the "a" terms using the indices law, then attach the lone "b").

---

This completes **JSS2 Maths, First Term** at full zero-assumption depth, with explicit whiteboard diagram descriptions included for the visual/geometric and bar-model concepts. Continuing next to **JSS2 Second Term** at this same standard.
