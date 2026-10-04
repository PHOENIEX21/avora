# Avora Deep Teaching Standard — Mathematics (Full Depth, Zero Assumptions)
## JSS2, Third Term

---

## Topic 1: Angles in a Polygon

### 1.1 Types of Polygons

**Step 1 — Establish "polygon" itself first (a closed shape with straight sides — recall "side" and "vertex" definitions from JSS1), then classify by two independent properties**

**Convex** polygons: every interior angle is LESS than 180° (the shape has no "caving in" dents — imagine a rubber band stretched around pins in the polygon's vertices; it touches every vertex).
**Concave** polygons: at least ONE interior angle is MORE than 180° (a dent exists — the rubber-band-around-pins test would NOT touch every vertex, it would cut across the dent instead).
**Regular** polygons: ALL sides equal AND all angles equal (e.g., a square).
**Irregular** polygons: sides and/or angles are NOT all equal (e.g., a general rectangle that isn't a square, or a scalene triangle).

**Diagram for Avora's whiteboard:**
Draw two pentagons side by side. The first, convex: a standard 5-pointed regular-ish pentagon shape with no dents. The second, concave: the same general pentagon but with ONE vertex pushed INWARD, creating a visible dent — label the reflex angle (the one exceeding 180°) at that dented vertex explicitly.

### 1.2 Sum of Interior Angles

**Step 1 — Derive the formula by ACTUALLY drawing diagonals and counting triangles, not stating (n−2)×180° upfront**

**Diagram for Avora's whiteboard:**
Draw a pentagon (5 sides). From ONE vertex, draw diagonals to every OTHER non-adjacent vertex. This splits the pentagon into exactly 3 triangles. Color each triangle a different color, and label each with "180°" inside it.

**Step 2 — Count the pattern across MULTIPLE polygons explicitly (not just one example), to make the (n−2) pattern undeniable**

Quadrilateral (4 sides): draw ONE diagonal from a single vertex → splits into 2 triangles → sum=2×180°=360°
Pentagon (5 sides): draw diagonals from one vertex → splits into 3 triangles → sum=3×180°=540°
Hexagon (6 sides): draw diagonals from one vertex → splits into 4 triangles → sum=4×180°=720°

Notice the pattern explicitly: number of triangles = (number of sides) − 2, EVERY time. This gives the general formula: **Sum of interior angles = (n−2) × 180°**, where n is the number of sides.

**Worked Example 1 (applying the formula, then VERIFYING against the direct triangle-counting method for a NEW polygon, to prove the formula isn't just memorized)**
Find the sum of interior angles of a hexagon (6 sides) using the formula, then verify by describing the diagonal-splitting method.
Formula: (6−2)×180° = 4×180° = 720°
Verification: from one vertex of a hexagon, diagonals to the 3 non-adjacent vertices create exactly 4 triangles (matching the formula's "4" from 6−2) → 4×180°=720° ✓ matches.

**Worked Example 2 (regular polygon — finding ONE interior angle, requiring an extra division step beyond just the sum)**
Find each interior angle of a regular pentagon.
Step 1: find the TOTAL sum first: (5−2)×180° = 540°
Step 2: since "regular" means ALL angles are equal, divide the total EQUALLY among the 5 angles: 540°÷5 = 108° each

**Worked Example 3 (finding a MISSING angle in an irregular polygon, given the others)**
A quadrilateral has three angles of 80°, 95°, and 110°. Find the fourth angle.
Total sum for a quadrilateral: (4−2)×180°=360°
Sum of the three known angles: 80+95+110=285°
Fourth angle = 360−285 = 75°

**Practice Questions:**
1. Find the sum of interior angles of an octagon (8 sides), and describe how many triangles this corresponds to when split from one vertex.
2. Find each interior angle of a regular hexagon, showing both the total-sum step and the division step.
3. A quadrilateral has three angles of 80°, 95°, and 110°. Find the fourth angle (already shown above — now try a pentagon with four known angles of 100°, 110°, 95°, and 120°, finding the fifth).

### 1.3 Sum of Exterior Angles

**Step 1 — Establish WHY exterior angles always sum to 360° using the "walking around the boundary" thought experiment, which works for ANY polygon regardless of the number of sides — an important, somewhat surprising result worth dwelling on**

Imagine physically walking along the boundary of a polygon, turning at each corner to continue along the next side. By the time you arrive back at your starting point, facing the exact same direction you started in, you have made ONE complete rotation — 360° total — no matter how many corners (turns) you made along the way. Each of those turns IS the exterior angle at that vertex. This is why the exterior angles of ANY polygon (triangle, decagon, whatever) always sum to exactly 360° — a genuinely different, simpler rule than the interior-angle formula, which DOES depend on the number of sides.

**Worked Example (regular polygon):**
Find each exterior angle of a regular decagon (10 sides).
Since the TOTAL is always 360° regardless of shape, and "regular" means equal angles: 360°÷10 = 36° each

**Worked Example (REVERSE direction — given the exterior angle, find the number of sides, an important exam-style application)**
A regular polygon has exterior angles of 40° each. How many sides does it have?
Since total exterior angles = 360° always, and each one is 40°: number of sides = 360°÷40° = 9 sides

**Practice Questions:**
1. A regular polygon has exterior angles of 40° each. How many sides does it have? (Shown above — now try one with exterior angles of 24° each.)
2. Find the sum of exterior angles of ANY pentagon (regular or not), explaining using the "walking around" reasoning why the answer does NOT depend on whether the pentagon is regular.
3. If a regular polygon has an INTERIOR angle of 150°, find its exterior angle first (hint: interior and exterior angles at the same vertex always add to 180°, since they lie on a straight line), then find the number of sides.

---

## Topic 2: Angles of Elevation and Depression

**Step 1 — Establish the horizontal reference line FIRST and explicitly, since both angle types are measured FROM it, never from the ground or a vertical line directly**

**Diagram for Avora's whiteboard:**
Draw a person standing on flat ground, and a tall tower some distance away. From the person's eye level, draw a DASHED horizontal line extending toward the tower. Draw a solid line from the person's eye to the TOP of the tower. Shade/label the angle BETWEEN the dashed horizontal line and the solid sight-line — this is the angle of elevation. Explicitly note: the angle is NOT measured from the ground (a common student assumption), but from this horizontal eye-level line.

**Step 2 — Distinguish elevation from depression by VIEWPOINT direction, using a second diagram**

**Diagram for Avora's whiteboard (depression):**
Draw a person standing at the TOP of a cliff, with a boat far below on the water. Draw a DASHED horizontal line from the person's eye level (extending out over the water, NOT down to the boat). Draw a solid sight-line from the person's eye down to the boat. Shade/label the angle BETWEEN the horizontal dashed line and the solid sight-line, BELOW the horizontal — this is the angle of depression.

**Step 3 — Derive WHY the angle of elevation and angle of depression between the SAME two points are equal, using the parallel-lines/alternate-angles property already established in JSS1**

**Diagram for Avora's whiteboard (combined):**
Draw BOTH horizontal dashed lines from the earlier two diagrams together (one from the cliff-top person, one from the boat) — since both are "horizontal," these two dashed lines are PARALLEL to each other. The single sight-line connecting the person and the boat acts as a TRANSVERSAL crossing both parallel lines (recall this term from JSS1's angle-pairs topic). The angle of depression (at the top) and the angle of elevation (at the bottom) are ALTERNATE angles formed by this transversal crossing two parallel lines — and alternate angles are always EQUAL (established in JSS1). This is not a coincidence or a separate rule to memorize; it's a direct consequence of the parallel-lines property already learned.

**Worked Example (introductory trigonometric application — full trigonometry is developed further in JSS3, but the SETUP is established here)**
A boy standing 20m from the foot of a tower observes the top of the tower at an angle of elevation of 30°. Using the tangent ratio (opposite/adjacent, to be studied fully in JSS3): height/20 = tan(30°), so height = 20×tan(30°) ≈ 20×0.577 ≈ 11.5m

**Practice Questions:**
1. Explain, using the parallel-horizontal-lines-and-transversal reasoning above, why the angle of elevation from point A to point B always equals the angle of depression from point B to point A.
2. A man on top of a building looks down at a car at an angle of depression of 40°. What is the angle of elevation from the car up to the man? Explain your reasoning, not just the number.
3. Draw (describe in words) the diagram for this situation: a person at ground level looking up at a kite at an angle of elevation of 50°. Label the horizontal reference line, the sight-line, and the angle clearly.

---

## Topic 3: Bearing and Distances

### 3.1 Compass Directions

**Step 1 — Establish the four major directions and their exact angular spacing explicitly, using a diagram**

**Diagram for Avora's whiteboard:**
Draw a compass rose: a vertical line labeled "N" (North) at top and "S" (South) at bottom; a horizontal line labeled "E" (East) at right and "W" (West) at left, crossing at a center point. Label the angle between N and E as exactly 90°, reinforcing that these four major directions are evenly spaced. Add the four MINOR directions (NE, SE, SW, NW) as diagonal lines exactly BETWEEN each pair of major directions, each 45° from its neighbors.

### 3.2 Types of Bearing

**Step 1 — Establish the three-figure bearing system explicitly, including WHY it's preferred (unambiguous, single number, always measured the SAME way — clockwise from North)**

A **three-figure bearing** is the angle measured CLOCKWISE from North to the direction of travel, always written with exactly 3 digits (e.g., "005°" not "5°") specifically to avoid any ambiguity about how many digits are intended.

**Worked Example 1 (converting an acute-angle bearing like "N30°E" to a three-figure bearing, with the reasoning for the conversion shown, not just the answer)**
"N30°E" means: start facing North, then turn 30° TOWARD the East side.
Since three-figure bearings are measured clockwise from North, and turning toward East IS the clockwise direction from North, this converts DIRECTLY: three-figure bearing = 030°

**Worked Example 2 (a trickier case: "S40°W," which requires reasoning through MULTIPLE quadrants, not a direct copy)**
"S40°W" means: start facing South, then turn 40° toward the West side.
To find the three-figure (clockwise-from-North) bearing, we must figure out how far clockwise from NORTH this direction actually is. South itself, measured clockwise from North, is 180°. Turning FURTHER toward West from South continues in the SAME clockwise direction (since West is clockwise-further from South, going N→E→S→W). So we ADD the 40°: 180°+40° = 220°

**Diagram for Avora's whiteboard (for Worked Example 2):**
Draw the compass rose again. Draw a dashed line for "due South." From that South line, draw a solid arrow rotating 40° further clockwise (toward West). Label the angle from due North (going all the way around clockwise, through East and South, to reach this arrow) as 220°, visually confirming the addition.

### 3.3 Reciprocal (Back) Bearing

**Step 1 — Derive the "add or subtract 180°" rule from the PHYSICAL meaning of "looking back," not as an arbitrary formula**

If you are standing at point A facing toward point B along a certain bearing, then someone standing at point B looking BACK toward you at point A is facing the EXACT OPPOSITE direction — a half-turn (180°) different from your original direction.

**Step 2 — Establish the two-case rule (add vs subtract) as simply "whichever keeps the result within the valid 0°–360° range," not as two separate arbitrary rules**

If the original bearing is LESS than 180°, adding 180° keeps the result under 360° (valid). If the original bearing is 180° or MORE, adding 180° would push the result over 360° (invalid, since bearings only go up to 360°), so we SUBTRACT 180° instead to bring it back into the valid range.

**Worked Example 1 (bearing under 180°, so we add):**
The bearing of B from A is 065°. Find the bearing of A from B.
Since 065°<180°, add 180°: 065°+180°=245°

**Worked Example 2 (bearing over 180°, so we subtract — testing the OTHER case explicitly, not just repeating the first)**
The bearing of a town P from Q is 210°. Find the bearing of Q from P.
Since 210°≥180°, subtract 180°: 210°−180°=030°

**Practice Questions:**
1. Convert N50°W to a three-figure bearing, reasoning through which quadrant this falls in (similar to Worked Example 2's S40°W reasoning).
2. Convert S25°E to a three-figure bearing.
3. The bearing of a town P from Q is 210°. Find the bearing of Q from P (shown above — now try one where the original bearing is 300° from a port to a ship, finding the ship-to-port back bearing).
4. Explain, using the "looking back is a half-turn away" reasoning, why the back-bearing rule involves exactly 180°, and not some other number.

---

## Topic 4: Use of ICT in Mathematics

**Step 1 — Establish this topic's practical purpose: mathematics doesn't only happen on paper — real problem-solving often uses tools, and understanding the LOGIC behind those tools (not just paper methods) matters**

**Explanation (flowcharts):** A flowchart represents a sequence of steps and DECISIONS as a diagram — useful for describing a calculation process clearly enough that even a computer (or another person) could follow it exactly, with no ambiguity.

**Worked Example (a simple flowchart described in words, since Avora's whiteboard can render this as an actual flow diagram):**
Flowchart for "is a number even or odd?":
START → INPUT a number → DIVIDE the number by 2 → CHECK: is the remainder 0? → IF YES: output "even" → IF NO: output "odd" → END

**Diagram for Avora's whiteboard:**
Draw this as an actual flowchart: an oval "START," an arrow to a rectangle "Input a number," an arrow to a rectangle "Divide by 2, find remainder," an arrow to a DIAMOND (decision shape) "Remainder = 0?", with two arrows leaving the diamond — one labeled "Yes" leading to a rectangle "Output: Even," and one labeled "No" leading to a rectangle "Output: Odd" — both finally leading to an oval "END."

**Practice Questions:**
1. Write your own flowchart (as a numbered list of steps, including at least one decision point) for determining whether a triangle is equilateral, given its three side lengths.
2. Describe how you would set up a spreadsheet formula to calculate the total cost of 5 items, each with a different price entered in separate cells.

---

This completes **JSS2 Maths — all three terms**, fully rebuilt at zero-assumption depth with explicit whiteboard diagrams described throughout (the polygon triangle-splitting, elevation/depression parallel-lines diagram, compass rose, and ICT flowchart). Continuing next to **JSS3 Maths, Term 2** at this same standard (Term 1 was completed earlier and will be re-audited against this diagram standard afterward).
