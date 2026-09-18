# Avora Deep Teaching Standard — Mathematics (Full Depth, Zero Assumptions)
## JSS3, Second Term

---

## Topic 1: Simultaneous Linear Equations

### 1.1 What "Simultaneous" Means and Why We Need Two Equations

**Step 1 — Establish the PROBLEM this topic solves, before any method**

A single equation like "x+y=10" has INFINITELY many solutions (x=1,y=9; x=2,y=8; x=5,y=5; and so on) — we cannot pin down exact values for both x and y from one equation alone. But if we're given a SECOND, independent piece of information about the same x and y (e.g., "x−y=2"), together the two equations narrow things down to exactly ONE pair of values that satisfies BOTH simultaneously (hence the name).

### 1.2 Tables of Values and Graphical Solution

**Step 1 — Establish how a linear equation with two unknowns corresponds to a LINE when graphed, connecting to earlier coordinate/graphing exposure**

For an equation like x+y=10, EVERY (x,y) pair satisfying it, when plotted as a point, lies on a single straight line. Building a table of values means choosing a few x-values, calculating the matching y-value from the equation, and plotting those points.

**Worked Example (building a table, full calculation shown for each entry):**
For x+y=10: choose x=0 → y=10; x=2 → y=8; x=5 → y=5; x=10 → y=0.
Table:
| x | 0 | 2 | 5 | 10 |
| y | 10 | 8 | 5 | 0 |

**Diagram for Avora's whiteboard:**
Draw a set of x-y axes. Plot the 4 points from the table above (0,10), (2,8), (5,5), (10,0), and draw a straight line through them, extending slightly beyond the plotted points. Then, for the SECOND equation (e.g., x−y=2), build a second table (x=0→y=−2; x=2→y=0; x=6→y=4) and plot THIS line on the SAME axes, in a different color. Mark the SINGLE point where the two lines CROSS — label it clearly as the solution, since this is the one (x,y) pair that satisfies BOTH equations simultaneously (it lies on both lines at once).

**Worked Example (reading the solution from the graph, then verifying algebraically):**
If the two lines from x+y=10 and x−y=2 cross at the point (6,4), this means x=6, y=4 is the solution.
Verify: 6+4=10 ✓ (satisfies the first equation); 6−4=2 ✓ (satisfies the second equation). Both check out.

**Practice Questions:**
1. Build a table of values for x+y=8 using x=0,2,4,8, and describe what the graph of this equation would look like.
2. Explain, in your own words, why the CROSSING POINT of two lines represents the solution to a pair of simultaneous equations (what does "crossing" mean about a point belonging to BOTH lines?).

### 1.3 Elimination Method

**Step 1 — Establish elimination's core idea: making one variable's coefficients MATCH (or cancel) by scaling one or both equations, then adding/subtracting to remove that variable entirely**

**Worked Example (a case where coefficients ALREADY match, requiring only addition/subtraction — the simplest case first):**
Solve: x+y=10 and x−y=2
Notice the y-coefficients are +1 and −1 — ADDING the two equations directly will CANCEL y entirely:
(x+y) + (x−y) = 10+2
2x = 12
x = 6
Substitute x=6 back into EITHER original equation to find y: 6+y=10 → y=4
Check in the OTHER equation (to catch any error): 6−4=2 ✓

**Worked Example (a case requiring SCALING one equation first, since coefficients don't already match — the genuinely new skill)**
Solve: 2x+y=11 and x+y=7
The y-coefficients already match (+1 and +1) — but this time, adding won't cancel anything (1+1=2, not 0). Instead, SUBTRACT one equation from the other to cancel the matching y-terms:
(2x+y) − (x+y) = 11−7
2x+y−x−y = 4
x = 4
Substitute back: 4+y=7 → y=3
Check: 2(4)+3=8+3=11 ✓

**Worked Example (a case requiring MULTIPLYING one equation to create matching coefficients — the full elimination method)**
Solve: 3x+2y=16 and x+y=6
Neither variable's coefficients match yet. Choose to eliminate y: multiply the SECOND equation by 2 (so its y-coefficient becomes 2, matching the first equation's 2y):
2×(x+y=6) → 2x+2y=12
Now subtract this NEW equation from the first: (3x+2y)−(2x+2y) = 16−12
3x+2y−2x−2y = 4
x = 4
Substitute back into x+y=6: 4+y=6 → y=2
Check in the original first equation: 3(4)+2(2)=12+4=16 ✓

**Practice Questions:**
1. Solve by elimination: x+y=9 and x−y=3
2. Solve by elimination: 2x+y=13 and x+y=8 (identify which operation, add or subtract, cancels a variable directly).
3. Solve by elimination: 3x+2y=19 and 2x+2y=16 (this one already has MATCHING y-coefficients without needing to scale — identify this before starting).
4. Solve by elimination: 4x+3y=25 and x+y=7 (this REQUIRES scaling one equation first — decide which one, and by what factor, before eliminating).

### 1.4 Substitution Method

**Step 1 — Establish substitution's core idea: solve ONE equation for one variable in terms of the other, then substitute that expression into the SECOND equation**

**Worked Example (full method shown, connecting back to the "substitution" skill from JSS2, now applied to an EXPRESSION rather than a number):**
Solve: y=x+2 and x+y=10
The first equation ALREADY tells us what y equals in terms of x. Substitute this directly into the second equation (replacing y with "x+2"):
x+(x+2)=10
2x+2=10
2x=8
x=4
Now find y using the first equation: y=4+2=6
Check in the second equation: 4+6=10 ✓

**Practice Questions:**
1. Solve by substitution: y=2x and x+y=12
2. Solve by substitution: x=y+3 and 2x+y=15

---

## Topic 2: Similar Shapes

### 2.1 Enlargement and Scale Factor

**Step 1 — Establish "similar" shapes as having the SAME shape but possibly different SIZE — with angles staying EQUAL and sides staying in the SAME ratio (proportion) to each other**

Two shapes are similar if one is an ENLARGED (or reduced) copy of the other — every angle stays identical, and every corresponding side is scaled by the SAME multiplying factor (the scale factor).

**Diagram for Avora's whiteboard:**
Draw two triangles, clearly similar (same shape, different size) — a small one with sides labeled 3cm, 4cm, 5cm, and a larger one, in the same orientation, with corresponding sides labeled 6cm, 8cm, 10cm. Draw dashed lines connecting each matching vertex between the two triangles to visually reinforce which sides correspond to which.

**Worked Example (finding the scale factor, then using it to find a missing side):**
Two similar triangles: the smaller has sides 3cm, 4cm, 5cm; the larger has corresponding sides 6cm, 8cm, and an unknown side x (corresponding to the 5cm side).
Find the scale factor by comparing ANY pair of corresponding sides: 6÷3=2 (check with the other pair: 8÷4=2 ✓ consistent, confirming these shapes really are similar and we've matched sides correctly)
Since the scale factor is 2, the unknown side: x = 5×2 = 10cm

**Practice Questions:**
1. Two similar rectangles: the smaller is 4cm by 6cm, the larger is 10cm by 15cm. Find the scale factor, and verify it's consistent using BOTH pairs of corresponding sides.
2. A similar pair of triangles has a scale factor of 3. If the smaller triangle's sides are 2cm, 5cm, and 6cm, find the larger triangle's sides.

### 2.2 Lengths, Areas, and Volumes of Similar Figures

**Step 1 — Establish, through a WORKED derivation (not just a stated rule), why area scales by the SQUARE of the scale factor, not the scale factor itself — this is a genuinely important and often-confused point**

Consider two similar squares: a small one with side 2cm (area=2×2=4cm²) and a larger one with side 6cm (area=6×6=36cm²) — here the LENGTH scale factor is 6÷2=3.
Compare the AREAS: 36÷4=9. Notice: 9 = 3² (the scale factor SQUARED), not just 3. This makes sense because area involves multiplying TWO lengths together (length×width), so BOTH dimensions get scaled by the factor, multiplying the AREA scale by the factor TWICE (i.e., squared).

**Step 2 — Extend the same reasoning to VOLUME, deriving the CUBE relationship**

Volume involves THREE dimensions multiplied together (length×width×height). If each dimension scales by factor k, the volume scales by k×k×k=k³ (the scale factor CUBED).

**Worked Example (area, applying the squared relationship):**
Two similar shapes have a LENGTH scale factor of 4. If the smaller shape's area is 10cm², find the larger shape's area.
Area scale factor = 4² = 16
Larger area = 10×16 = 160cm²

**Worked Example (volume, applying the cubed relationship, and explicitly flagging the common error of using the LENGTH scale factor directly)**
Two similar solids have a length scale factor of 3. If the smaller solid's volume is 8cm³, find the larger solid's volume.
A common WRONG approach: simply multiplying by 3 (using the length scale factor directly), giving 8×3=24cm³ — INCORRECT, because volume needs the CUBED scale factor, not the plain one.
CORRECT: Volume scale factor = 3³=27. Larger volume = 8×27 = 216cm³

**Practice Questions:**
1. Two similar shapes have a length scale factor of 5. If the smaller shape's area is 6cm², find the larger shape's area.
2. Two similar solids have a length scale factor of 2. If the smaller solid's volume is 12cm³, find the larger solid's volume, being careful to CUBE the scale factor (not just multiply directly, as shown in the misconception example above).
3. Two similar cylinders have volumes of 8cm³ and 64cm³. Find the LENGTH scale factor between them (hint: this is the REVERSE direction — find what number, when CUBED, gives 64÷8=8).

---

## Topic 3: Trigonometry

### 3.1 Sine, Cosine, and Tangent of an Acute Angle

**Step 1 — Establish the right-angled triangle's THREE side names explicitly (hypotenuse, opposite, adjacent) BEFORE introducing any ratio, since misidentifying sides is the most common source of error in this entire topic**

**Diagram for Avora's whiteboard:**
Draw a right-angled triangle with the right angle marked at the bottom-right corner. Label the LONGEST side (opposite the right angle) as the **hypotenuse** — always the same, regardless of which acute angle we're focusing on. Now mark ONE of the acute angles (say, the bottom-left one) with an arc, labeled θ (theta). Relative to THIS angle θ: the side directly across from it (NOT touching the angle) is the **opposite**; the remaining side (touching angle θ, but NOT the hypotenuse) is the **adjacent**.

**Step 2 — Establish explicitly that "opposite" and "adjacent" DEPEND on WHICH angle you're focused on — if you focus on the OTHER acute angle instead, the same two sides SWAP roles — this is a genuine, important misconception to address directly**

If we instead focus on the OTHER acute angle (top one) in the SAME triangle, the side that was "opposite" to θ is now the "adjacent" to this new angle, and vice versa. Only the hypotenuse NEVER changes, because it's defined by the right angle, not by which acute angle you're considering.

**Step 3 — Introduce the three ratios, with a memory aid, but ALSO explain what they actually represent (a relationship, not just letters to memorize)**

For an angle θ in a right triangle:
- sin θ = opposite/hypotenuse
- cos θ = adjacent/hypotenuse
- tan θ = opposite/adjacent

A common memory aid is "SOH-CAH-TOA" (Sine=Opposite/Hypotenuse, Cosine=Adjacent/Hypotenuse, Tangent=Opposite/Adjacent) — but the memory aid is only useful ONCE the side names (opposite, adjacent, hypotenuse) are correctly identified for the SPECIFIC angle in question, as established in Step 2.

**Worked Example 1 (finding a ratio value, given side lengths):**
A right triangle has hypotenuse=10cm, opposite (to angle θ)=6cm, adjacent=8cm.
sin θ = 6/10 = 0.6
cos θ = 8/10 = 0.8
tan θ = 6/8 = 0.75

**Worked Example 2 (finding a MISSING side, given an angle and one side — the practical application)**
A ladder leans against a wall, making a 60° angle with the ground. The ladder (hypotenuse) is 5m long. Find the height it reaches up the wall.
Identify sides relative to the 60° angle: the height up the wall is OPPOSITE the 60° angle (it's across from it, not touching it); the ladder itself is the hypotenuse.
Since we have opposite and hypotenuse, use sine: sin(60°) = height/5
height = 5×sin(60°) = 5×0.866 ≈ 4.33m

**Worked Example 3 (a case testing correct side identification when the triangle is drawn in an unfamiliar orientation — an important robustness check)**
A right triangle is drawn with the right angle at the TOP-left corner (not bottom-right as in earlier diagrams). The angle of interest, θ, is at the bottom-right corner. The side connecting the right-angle corner to θ's corner is 8cm; the side directly across from θ is 6cm; the longest side (across from the right angle) is 10cm.
Regardless of ORIENTATION on the page, the DEFINITIONS still apply based on their relationship to θ: the 10cm side (across from the right angle) is ALWAYS the hypotenuse; the 6cm side (across from θ) is the opposite; the 8cm side (touching θ, not the hypotenuse) is the adjacent. Orientation on paper never changes these relationships.

**Practice Questions:**
1. A right triangle has hypotenuse=13cm, opposite (to angle θ)=5cm, adjacent=12cm. Find sin θ, cos θ, and tan θ.
2. A ladder leans against a wall at an angle of 50° to the ground, and the ladder is 6m long. Find the height it reaches up the wall (identify opposite/hypotenuse first, before choosing which ratio to use).
3. A right triangle has an adjacent side of 9cm and an angle θ of 40°. Find the length of the hypotenuse (identify which ratio connects adjacent and hypotenuse — cosine — before solving: cos(40°)=9/hypotenuse).
4. Explain, using the "roles swap" idea from Step 2, why the SAME two non-hypotenuse sides can be described as "opposite" in one situation and "adjacent" in another, depending on which acute angle is being focused on.

---

## Topic 4: Area of Plane Figures

*(Rectangle and triangle area were derived in JSS1. This topic extends to parallelograms, trapeziums, and circles.)*

### 4.1 Area of a Parallelogram

**Step 1 — Derive the formula using a "cut and rearrange" argument, not stating base×height directly**

**Diagram for Avora's whiteboard:**
Draw a parallelogram (a slanted four-sided shape with two pairs of parallel sides). Draw a vertical dashed line from the top-left vertex straight down to the base, creating a right-angled triangle on the LEFT edge of the shape. Now show this triangle being "cut off" and MOVED to the right side of the parallelogram, where it fits perfectly to complete a RECTANGLE with the same base and height as the original parallelogram. Since we only moved a piece (didn't add or remove any area), the parallelogram's area MUST equal this rectangle's area: base×height.

**Worked Example:**
A parallelogram has base=10cm, height=6cm (the PERPENDICULAR height, not a slanted side — recall this exact same caution from JSS1's triangle area work).
Area = 10×6 = 60cm²

**Practice Questions:**
1. Find the area of a parallelogram with base=12cm and height=7cm.
2. A parallelogram has a slanted side of 9cm, a base of 8cm, and a perpendicular height of 5cm. Find its area, being careful to use the correct measurement (recall the misconception check from JSS1's triangle work — the SAME caution applies here).

### 4.2 Area of a Trapezium

**Step 1 — Derive the formula by combining TWO copies of the trapezium into a parallelogram, a genuinely elegant derivation worth showing fully**

**Diagram for Avora's whiteboard:**
Draw a trapezium (one pair of parallel sides, of DIFFERENT lengths — label them a and b — with height h between them). Now draw a SECOND, upside-down copy of the SAME trapezium attached to the first along one of the non-parallel sides, forming a parallelogram. This new parallelogram has a base equal to (a+b) — the two different parallel sides of the trapezium, now placed end-to-end — and the SAME height h.

Area of this parallelogram = base×height = (a+b)×h
But this parallelogram is made of TWO copies of our original trapezium, so ONE trapezium's area is HALF of this: Area of trapezium = ½×(a+b)×h

**Worked Example:**
A trapezium has parallel sides 8cm and 12cm, with a height of 5cm between them.
Area = ½×(8+12)×5 = ½×20×5 = ½×100 = 50cm²

**Practice Questions:**
1. Find the area of a trapezium with parallel sides 6cm and 10cm, and height 4cm.
2. A trapezium-shaped garden has parallel sides of 15m and 25m, with a perpendicular distance of 8m between them. Find its area.

### 4.3 Area of a Circle

**Step 1 — Establish π (pi) as a special, fixed number (approximately 3.14, or 22/7) representing the relationship between a circle's circumference and its diameter — established as a fact discovered through measurement across many circles, not something to derive from scratch at this level**

**Step 2 — State the area formula and demonstrate it with a worked example, since the full derivation (using calculus-level reasoning) is beyond this level, but VERIFY it makes reasonable sense**

Area of a circle = π×r², where r is the radius (distance from center to edge).

**Worked Example:**
A circle has radius 7cm. Find its area (using π≈22/7, which conveniently simplifies since our radius is a multiple of 7).
Area = 22/7 × 7² = 22/7 × 49 = 22×7 = 154cm²

**Worked Example (using π≈3.14, for a radius NOT conveniently divisible by 7):**
A circle has radius 5cm. Find its area.
Area = 3.14 × 5² = 3.14×25 = 78.5cm²

**Practice Questions:**
1. Find the area of a circle with radius 14cm (use π≈22/7, since 14 is a multiple of 7).
2. Find the area of a circle with radius 10cm (use π≈3.14).
3. A circle has a DIAMETER of 20cm. Find its area (careful: the formula needs the RADIUS, which is HALF the diameter — this is a common point where students plug in the wrong value).

---

## Topic 5: Construction

*(Basic construction principles — why ruler/compass guarantee exactness — were established in JSS1. This extends to new specific angles.)*

### 5.1 Construction of 45° and 30° Angles

**Step 1 — Derive 45° by BISECTING the already-known 90° construction (recall bisection method from JSS1)**

Since 90° was constructed in JSS1 by bisecting a straight 180° angle, we can go FURTHER: bisecting that 90° angle (using the same compass-bisection method) gives 90°÷2 = 45°.

**Step 2 — Derive 30° by BISECTING the already-known 60° construction**

Recall from JSS1: 60° was constructed using an equilateral triangle. Bisecting THIS 60° angle gives 60°÷2 = 30°.

**Practice Questions:**
1. Describe, step by step, how to construct a 45° angle, referencing the 90°-bisection reasoning.
2. Describe how to construct a 30° angle, referencing the 60°-bisection reasoning.
3. Using ONLY the angles you can construct with a ruler and compass so far (90°, 60°, 45°, 30°), describe how you could construct a 15° angle.

### 5.2 Copying a Given Angle

**Step 1 — Establish the METHOD and the geometric reasoning for why it produces an EXACT copy, not an estimate**

Method: draw an arc across BOTH sides of the original angle, from its vertex, creating two intersection points. WITHOUT changing the compass width, draw a similar arc from the vertex of a NEW line (where you want the copy). Then, measure the distance BETWEEN the two intersection points on the ORIGINAL angle using the compass, and transfer that EXACT distance to mark the corresponding point on the NEW arc. Connecting the new vertex to this new point recreates the identical angle.

**Why this works:** All three points involved (the vertex and the two arc-intersection points) form a TRIANGLE with sides fixed by the compass widths used. Since the NEW triangle uses the EXACT SAME compass widths for all corresponding sides, the two triangles are IDENTICAL in shape (this uses a geometric fact: a triangle's shape is completely determined once all three of its side lengths are fixed) — meaning the angle at the vertex must also be identical.

**Practice Questions:**
1. Describe, step by step, how to copy a given angle using only a ruler and compass.
2. Explain, using the "triangle with fixed side lengths" reasoning, why this method guarantees an EXACT copy rather than an approximate one.

---

## Topic 6: Measures of Central Tendency

*(Mean, median, mode, and range for simple data were introduced in JSS1/JSS2. This extends to GROUPED data, a genuinely new skill.)*

### 6.1 Mean, Median, Mode of Grouped Data

**Step 1 — Establish WHY grouped data needs a different approach: individual values are no longer known exactly, only which RANGE (class interval) they fall into**

When data is grouped into intervals (e.g., "10–19," "20–29"), we no longer know the EXACT value of each data point — only its interval. To estimate the mean, we ASSUME each value in an interval is represented by that interval's MIDPOINT (the middle value of the range).

**Worked Example (finding the mean of grouped data, full table method shown):**
| Class Interval | Frequency (f) | Midpoint (x) | f×x |
|---|---|---|---|
| 10–19 | 3 | 14.5 | 43.5 |
| 20–29 | 5 | 24.5 | 122.5 |
| 30–39 | 2 | 34.5 | 69 |

Total frequency (Σf) = 3+5+2 = 10
Total f×x (Σfx) = 43.5+122.5+69 = 235
Estimated mean = Σfx ÷ Σf = 235÷10 = 23.5

**Step 2 — Explain WHY the midpoint is used (a reasonable ASSUMPTION, not an exact fact) — an important honesty point about grouped-data estimates**

Since we don't know the exact values within "10–19" (they could be spread anywhere from 10 to 19), using the MIDPOINT (14.5) is the most REASONABLE single estimate for the "typical" value in that group — but the resulting mean is only an ESTIMATE, not an exact calculation, precisely because of this assumption.

**Practice Questions:**
1. Given class intervals 0–9 (frequency 4), 10–19 (frequency 6), 20–29 (frequency 5), find the midpoint of each interval, then calculate the estimated mean.
2. Explain, in your own words, why the mean of grouped data is called an "estimate" rather than an exact value.

---

## Topic 7: Data Presentation — Pie Charts

**Step 1 — Establish what a pie chart represents: proportions of a WHOLE, shown as slices of a circle, where each slice's ANGLE corresponds to its share of the total 360°**

**Step 2 — Derive the angle-calculation method explicitly: each category's share of the data becomes the SAME share of the full 360° circle**

**Worked Example (full calculation for every category, not just one):**
A survey of 40 students' favorite subjects: Maths=16, English=10, Science=8, Others=6.
For EACH category, calculate its angle: (category's count ÷ total count) × 360°
Maths: (16/40)×360° = 144°
English: (10/40)×360° = 90°
Science: (8/40)×360° = 72°
Others: (6/40)×360° = 54°
Check: ALL angles must sum to exactly 360° (an essential verification step): 144+90+72+54 = 360° ✓

**Diagram for Avora's whiteboard:**
Draw a full circle. Starting from the top (12 o'clock position), mark off a 144° slice (labeled "Maths"), then continuing clockwise, a 90° slice ("English"), then 72° ("Science"), then the remaining 54° ("Others") — completing the full circle back to the starting point.

**Practice Questions:**
1. A survey of 60 people's favorite fruit: Mango=24, Orange=18, Banana=12, Others=6. Calculate the angle for EACH category, and verify they sum to 360°.
2. A pie chart slice representing "Football" takes up 90° of the circle. If the total number of people surveyed was 80, how many people chose Football? (This is the REVERSE direction — find what FRACTION of the circle 90° represents, then apply that fraction to the total.)

---

This completes **JSS3 Maths, Second Term** at full zero-assumption depth, with explicit whiteboard diagrams for the simultaneous-equations graph, similar-shapes scale diagrams, the trigonometry side-labeling (including the orientation-independence check), parallelogram/trapezium area derivations, and the pie chart. Continuing next to **JSS3 Third Term** at this same standard.
