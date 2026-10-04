/**
 * Compatibility aliases for pre-V13 assessment-bank labels.
 * These aliases NEVER appear as curriculum topics; they only help existing reviewed questions
 * resolve to the new AVORA Master Curriculum while the DB is progressively re-keyed.
 */
const aliases:Record<string,string[]>={
  "JSS1|Mathematics|Whole Numbers (place value, counting in millions/billions/trillions, quantitative reasoning)": [
    "Whole Numbers (place value, counting in millions/billions/trillions, quantitative reasoning)",
    "Whole Numbers"
  ],
  "JSS1|Mathematics|Lowest Common Multiple (LCM)": [
    "Lowest Common Multiple (LCM)",
    "LCM (Least Common Multiple)"
  ],
  "JSS1|Mathematics|Highest Common Factor (HCF)": [
    "Highest Common Factor (HCF)",
    "HCF (Highest Common Factor)"
  ],
  "JSS1|Mathematics|Counting in Base Two": [
    "Counting in Base Two",
    "Counting in Base 2"
  ],
  "JSS1|Mathematics|Conversion of Base 10 to Binary Numbers (1–10)": [
    "Conversion of Base 10 to Binary Numbers (1–10)",
    "Conversion of Base 10 Numerals to Binary Numbers",
    "Whole Numbers",
    "Counting in Base 2",
    "Binary Subtraction",
    "Binary Multiplication",
    "Binary Addition"
  ],
  "JSS1|Mathematics|Fractions (equivalent fractions, ordering, fractions↔decimals, fractions↔percentages)": [
    "Fractions (equivalent fractions, ordering, fractions↔decimals, fractions↔percentages)",
    "Fractions: Types, Simplification and Equivalent Fractions"
  ],
  "JSS1|Mathematics|Addition and Subtraction of Whole Numbers (place value, number line, positive/negative integers)": [
    "Addition and Subtraction of Whole Numbers (place value, number line, positive/negative integers)",
    "Whole Numbers"
  ],
  "JSS1|Mathematics|Addition and Subtraction of Fractions": [
    "Addition and Subtraction of Fractions",
    "Binary Subtraction",
    "Binary Addition",
    "Multiplication and Division of Fractions"
  ],
  "JSS1|Mathematics|Multiplication and Division of Fractions": [
    "Multiplication and Division of Fractions",
    "Binary Multiplication",
    "Addition and Subtraction of Fractions"
  ],
  "JSS1|Mathematics|Estimation": [
    "Estimation",
    "Estimation and Approximation"
  ],
  "JSS1|Mathematics|Approximation (rounding rules, decimal places)": [
    "Approximation (rounding rules, decimal places)"
  ],
  "JSS1|Mathematics|Addition of Binary Numbers (2–3 digit)": [
    "Addition of Binary Numbers (2–3 digit)",
    "Binary Addition",
    "Conversion of Base 10 Numerals to Binary Numbers",
    "Whole Numbers",
    "Binary Subtraction",
    "Binary Multiplication"
  ],
  "JSS1|Mathematics|Subtraction of Binary Numbers (2–3 digit)": [
    "Subtraction of Binary Numbers (2–3 digit)",
    "Binary Subtraction",
    "Conversion of Base 10 Numerals to Binary Numbers",
    "Whole Numbers",
    "Binary Multiplication",
    "Binary Addition"
  ],
  "JSS1|Mathematics|Multiplication of Binary Numbers (2-digit)": [
    "Multiplication of Binary Numbers (2-digit)",
    "Binary Multiplication",
    "Conversion of Base 10 Numerals to Binary Numbers",
    "Whole Numbers",
    "Binary Subtraction",
    "Binary Addition"
  ],
  "JSS1|Mathematics|Use of Symbols (open sentences, two-operation equations)": [
    "Use of Symbols (open sentences, two-operation equations)"
  ],
  "JSS1|Mathematics|Simplification of Algebraic Expressions (like/unlike terms, coefficients, brackets)": [
    "Simplification of Algebraic Expressions (like/unlike terms, coefficients, brackets)",
    "Simplification of Algebraic Expressions",
    "Use of Symbols and Algebraic Expressions"
  ],
  "JSS1|Mathematics|Simple Equations (word problems → equations)": [
    "Simple Equations (word problems → equations)",
    "Simple Equations"
  ],
  "JSS1|Mathematics|Plane Shapes (similarities/differences, perimeter, area)": [
    "Plane Shapes (similarities/differences, perimeter, area)",
    "Plane Shapes"
  ],
  "JSS1|Mathematics|Three-Dimensional Figures (cubes, cuboids, pyramids, cones, cylinders, spheres; volume)": [
    "Three-Dimensional Figures (cubes, cuboids, pyramids, cones, cylinders, spheres; volume)",
    "Three-Dimensional Figures"
  ],
  "JSS1|Mathematics|Construction (parallel/perpendicular lines, bisecting a segment, 90°/60° angles)": [
    "Construction (parallel/perpendicular lines, bisecting a segment, 90°/60° angles)"
  ],
  "JSS1|Mathematics|Angles (measurement, vertically opposite/adjacent/alternate/corresponding, angles at a point/on a line)": [
    "Angles (measurement, vertically opposite/adjacent/alternate/corresponding, angles at a point/on a line)"
  ],
  "JSS1|Mathematics|Need for Statistics": [
    "Need for Statistics"
  ],
  "JSS1|Mathematics|Data Collection": [
    "Data Collection",
    "Data Presentation"
  ],
  "JSS1|Mathematics|Data Presentation — Median (introductory)": [
    "Data Presentation — Median (introductory)",
    "Data Presentation",
    "Data Collection"
  ],
  "JSS1|Mathematics|Units of Measurement (length, mass, capacity, time conversions)": [
    "Units of Measurement (length, mass, capacity, time conversions)"
  ],
  "JSS1|English Language|Speech Work: speech organs and sound production; monophthongs (long/short vowel contrasts)": [
    "Speech Work: speech organs and sound production; monophthongs (long/short vowel contrasts)"
  ],
  "JSS1|English Language|Grammar: nouns (common/proper, countable/uncountable); verbs (action/state); adjectives (comparison); adverbs; present tense & subject-verb agreement; pronouns (subject/object); prepositions & conjunctions (introductory)": [
    "Grammar: nouns (common/proper, countable/uncountable); verbs (action/state); adjectives (comparison); adverbs; present tense & subject-verb agreement; pronouns (subject/object); prepositions & conjunctions (introductory)"
  ],
  "JSS1|English Language|Comprehension: SPQ3R reading strategy; answering comprehension questions using textual evidence": [
    "Comprehension: SPQ3R reading strategy; answering comprehension questions using textual evidence",
    "Reading to answer specific questions"
  ],
  "JSS1|English Language|Composition: types of composition (narrative, descriptive, argumentative, expository); elements (introduction, body, conclusion) — full 5-part narrative structure": [
    "Composition: types of composition (narrative, descriptive, argumentative, expository); elements (introduction, body, conclusion) — full 5-part narrative structure",
    "Narrative and Descriptive Composition",
    "Expository and Argumentative Composition",
    "Composition writing: narrative and descriptive"
  ],
  "JSS1|English Language|Literature: functions of literature; genres (prose, poetry, drama); introduction to folktales": [
    "Literature: functions of literature; genres (prose, poetry, drama); introduction to folktales",
    "Introduction to literature",
    "Introduction to Literature",
    "Introduction to Folktales",
    "Introduction to Prose Fiction"
  ],
  "JSS1|English Language|Speech Work: consonant clusters; diphthongs": [
    "Speech Work: consonant clusters; diphthongs",
    "Syllables, Consonant Clusters and Word Boundaries",
    "Listening to and producing different speeches with reference to vowel sounds, consonant clusters, diphthongs, word boundaries, compound words, etc."
  ],
  "JSS1|English Language|Grammar: articles (a/an/the — sound-based rule); plurals (regular/irregular); past tense (regular/irregular)": [
    "Grammar: articles (a/an/the — sound-based rule); plurals (regular/irregular); past tense (regular/irregular)"
  ],
  "JSS1|English Language|Comprehension: reading for writer's purpose; word families (topic-based vocabulary)": [
    "Comprehension: reading for writer's purpose; word families (topic-based vocabulary)"
  ],
  "JSS1|English Language|Composition: descriptive essay (sensory detail); paragraph development (topic sentences)": [
    "Composition: descriptive essay (sensory detail); paragraph development (topic sentences)",
    "Narrative and Descriptive Composition",
    "Composition writing: narrative and descriptive"
  ],
  "JSS1|English Language|Literature: elements of prose (plot, setting, theme, characterisation); introduction to drama (dialogue, stage directions)": [
    "Literature: elements of prose (plot, setting, theme, characterisation); introduction to drama (dialogue, stage directions)"
  ],
  "JSS1|English Language|Speech Work: mixed vowel discrimination (monophthongs + diphthongs)": [
    "Speech Work: mixed vowel discrimination (monophthongs + diphthongs)"
  ],
  "JSS1|English Language|Grammar: prepositions of time vs place; conjunctions (coordinating vs subordinating)": [
    "Grammar: prepositions of time vs place; conjunctions (coordinating vs subordinating)",
    "Adverbs, Conjunctions, Prepositions and Interjections",
    "Parts of speech: Adverbs, Conjunctions and Prepositions"
  ],
  "JSS1|English Language|Comprehension: full SPQ3R application; fact vs opinion": [
    "Comprehension: full SPQ3R application; fact vs opinion"
  ],
  "JSS1|English Language|Composition: argumentative essay (introductory); expository essay (introductory)": [
    "Composition: argumentative essay (introductory); expository essay (introductory)",
    "Expository and Argumentative Composition"
  ],
  "JSS1|English Language|Literature: literary terms (simile, metaphor, personification, hyperbole, alliteration); myths and legends (vs folktales)": [
    "Literature: literary terms (simile, metaphor, personification, hyperbole, alliteration); myths and legends (vs folktales)",
    "Myths and Legends"
  ],
  "JSS2|Mathematics|Whole Numbers — Standard Form; Indices (introductory laws)": [
    "Whole Numbers — Standard Form; Indices (introductory laws)",
    "Whole Numbers and Decimals in Standard Form"
  ],
  "JSS2|Mathematics|Revision: Prime Factors, LCM, HCF; Squares and Square Roots": [
    "Revision: Prime Factors, LCM, HCF; Squares and Square Roots",
    "LCM, HCF, Squares and Square Roots",
    "Prime Factors and Applications"
  ],
  "JSS2|Mathematics|Approximation — Decimal Places and Significant Figures": [
    "Approximation — Decimal Places and Significant Figures",
    "Approximation"
  ],
  "JSS2|Mathematics|Fractions, Percentages (increase/decrease), Ratio, Rate": [
    "Fractions, Percentages (increase/decrease), Ratio, Rate",
    "Fractions, Ratios, Decimals and Percentages in Transactions"
  ],
  "JSS2|Mathematics|Transactions in the Home and Office (budgeting; simple interest)": [
    "Transactions in the Home and Office (budgeting; simple interest)"
  ],
  "JSS2|Mathematics|Multiplication and Division of Directed (Negative) Numbers": [
    "Multiplication and Division of Directed (Negative) Numbers",
    "Multiplication and Division of Directed Numbers",
    "Directed and Non-Directed Numbers"
  ],
  "JSS2|Mathematics|Algebraic Expressions (introductory — multiplying terms)": [
    "Algebraic Expressions (introductory — multiplying terms)",
    "Algebraic Expressions: Expansion and Factorisation",
    "Algebraic Fractions"
  ],
  "JSS2|Mathematics|Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions": [
    "Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions"
  ],
  "JSS2|Mathematics|Simple Linear Equations (balance method, brackets, fractions, word problems)": [
    "Simple Linear Equations (balance method, brackets, fractions, word problems)",
    "Simple Equations"
  ],
  "JSS2|Mathematics|Linear Inequalities in One Variable (solving, sign-flip rule, combined inequalities, number-line representation)": [
    "Linear Inequalities in One Variable (solving, sign-flip rule, combined inequalities, number-line representation)"
  ],
  "JSS2|Mathematics|Angles in a Polygon (convex/concave/regular/irregular; sum of interior angles; sum of exterior angles)": [
    "Angles in a Polygon (convex/concave/regular/irregular; sum of interior angles; sum of exterior angles)"
  ],
  "JSS2|Mathematics|Angles of Elevation and Depression": [
    "Angles of Elevation and Depression",
    "Angles and Polygons"
  ],
  "JSS2|Mathematics|Bearing and Distances (compass directions, three-figure bearings, back bearings)": [
    "Bearing and Distances (compass directions, three-figure bearings, back bearings)",
    "Bearings and Distances"
  ],
  "JSS2|Mathematics|Use of ICT in Mathematics (flowcharts, spreadsheet logic)": [
    "Use of ICT in Mathematics (flowcharts, spreadsheet logic)"
  ],
  "JSS2|English Language|Speech Work: pure vowels (spelling features); consonant sounds (spelling features, e.g. silent gh, ph, ch variants)": [
    "Speech Work: pure vowels (spelling features); consonant sounds (spelling features, e.g. silent gh, ph, ch variants)",
    "Revision of sounds: Vowels and Consonants",
    "Consonant Sounds and Consonant Clusters"
  ],
  "JSS2|English Language|Grammar: transitive/intransitive verbs; active and passive voice": [
    "Grammar: transitive/intransitive verbs; active and passive voice",
    "Transitive and Intransitive Verbs",
    "Active and Passive verbs",
    "Active and Passive Voice"
  ],
  "JSS2|English Language|Comprehension: writer's purpose (extended, mixed-purpose texts); word families (Science/Technology-type topics)": [
    "Comprehension: writer's purpose (extended, mixed-purpose texts); word families (Science/Technology-type topics)"
  ],
  "JSS2|English Language|Composition: narrative essay (outlining/brainstorming); descriptive essay (outlining a place)": [
    "Composition: narrative essay (outlining/brainstorming); descriptive essay (outlining a place)",
    "Narrative Composition",
    "Descriptive Composition"
  ],
  "JSS2|English Language|Literature: prose extended (novella, novelette, novel — length/scope distinctions)": [
    "Literature: prose extended (novella, novelette, novel — length/scope distinctions)"
  ],
  "JSS2|English Language|Speech Work: diphthongs and triphthongs (extended); /ɪə/ vs /eə/ contrast": [
    "Speech Work: diphthongs and triphthongs (extended); /ɪə/ vs /eə/ contrast"
  ],
  "JSS2|English Language|Grammar: comparative/superlative edge cases (absolute adjectives); present & past continuous tense; adverbials (reason, purpose, condition); requests and commands; \"although\" vs \"whereas\"": [
    "Grammar: comparative/superlative edge cases (absolute adjectives); present & past continuous tense; adverbials (reason, purpose, condition); requests and commands; \"although\" vs \"whereas\""
  ],
  "JSS2|English Language|Comprehension: critical reading (claims vs evidence); reading words in context (context clues)": [
    "Comprehension: critical reading (claims vs evidence); reading words in context (context clues)",
    "Critical reading",
    "Inference and Critical Reading"
  ],
  "JSS2|English Language|Composition: formal letter writing (full structure)": [
    "Composition: formal letter writing (full structure)",
    "Letter writing: informal and formal",
    "Composition writing: expository and argumentative"
  ],
  "JSS2|English Language|Literature: drama elements extended (conflict, climax, resolution); figures of speech extended (irony, paradox, onomatopoeia)": [
    "Literature: drama elements extended (conflict, climax, resolution); figures of speech extended (irony, paradox, onomatopoeia)",
    "Figures of Speech: Personification and Onomatopoeia",
    "Figures of Speech: Irony and Hyperbole",
    "More on figures of speech: irony and Hyperbole"
  ],
  "JSS2|English Language|Speech Work: full mixed sound diagnostic (consolidation)": [
    "Speech Work: full mixed sound diagnostic (consolidation)"
  ],
  "JSS2|English Language|Grammar: \"despite\"/\"in spite of\" vs \"although\" (structural rule)": [
    "Grammar: \"despite\"/\"in spite of\" vs \"although\" (structural rule)"
  ],
  "JSS2|English Language|Comprehension: summary writing (full method)": [
    "Comprehension: summary writing (full method)",
    "Summary Writing",
    "Summary writing (passage on consumer and social influence)",
    "Writing an outline",
    "Writing an Outline",
    "Story Writing",
    "Report Writing",
    "Reading for summary",
    "Reading for Summary",
    "Oral Comprehension"
  ],
  "JSS2|English Language|Composition: informal/personal letter writing; report writing (introductory)": [
    "Composition: informal/personal letter writing; report writing (introductory)",
    "Letter writing: informal and formal",
    "Report Writing",
    "Composition writing: expository and argumentative"
  ],
  "JSS2|English Language|Literature: folktales (structural patterns — trickster, three attempts, explicit moral); myths and legends (extended features)": [
    "Literature: folktales (structural patterns — trickster, three attempts, explicit moral); myths and legends (extended features)"
  ],
  "JSS3|Mathematics|Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)": [
    "Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)"
  ],
  "JSS3|Mathematics|Rational and Irrational (Non-Rational) Numbers": [
    "Rational and Irrational (Non-Rational) Numbers"
  ],
  "JSS3|Mathematics|Base 2 Numerals — Addition, Subtraction, Multiplication, Division (up to 3-digit)": [
    "Base 2 Numerals — Addition, Subtraction, Multiplication, Division (up to 3-digit)"
  ],
  "JSS3|Mathematics|Factorization (grouping, difference of two squares, perfect square trinomials, word problems) — includes the standalone foundational mini-lesson on bracket multiplication": [
    "Factorization (grouping, difference of two squares, perfect square trinomials, word problems) — includes the standalone foundational mini-lesson on bracket multiplication"
  ],
  "JSS3|Mathematics|Simple Equations Involving Fractions (LCM method, exam-style word problems)": [
    "Simple Equations Involving Fractions (LCM method, exam-style word problems)"
  ],
  "JSS3|Mathematics|Simultaneous Linear Equations (tables of values, graphical solution, elimination, substitution)": [
    "Simultaneous Linear Equations (tables of values, graphical solution, elimination, substitution)"
  ],
  "JSS3|Mathematics|Similar Shapes (enlargement, scale factor, area/volume scaling — squared/cubed)": [
    "Similar Shapes (enlargement, scale factor, area/volume scaling — squared/cubed)"
  ],
  "JSS3|Mathematics|Trigonometry (sine, cosine, tangent of an acute angle; applications)": [
    "Trigonometry (sine, cosine, tangent of an acute angle; applications)"
  ],
  "JSS3|Mathematics|Area of Plane Figures (parallelogram, trapezium, circle)": [
    "Area of Plane Figures (parallelogram, trapezium, circle)"
  ],
  "JSS3|Mathematics|Construction (45°, 30° angles; copying a given angle)": [
    "Construction (45°, 30° angles; copying a given angle)"
  ],
  "JSS3|Mathematics|Measures of Central Tendency (mean/median/mode of grouped data)": [
    "Measures of Central Tendency (mean/median/mode of grouped data)"
  ],
  "JSS3|Mathematics|Data Presentation — Pie Charts": [
    "Data Presentation — Pie Charts"
  ],
  "JSS3|Mathematics|BECE Revision: formula/method reference synthesis; exam technique guidance; full mixed-topic mock practice (objective + theory) with worked solutions": [
    "BECE Revision: formula/method reference synthesis; exam technique guidance; full mixed-topic mock practice (objective + theory) with worked solutions"
  ],
  "JSS3|English Language|Speech Work: long/short vowel contrasts (extended, BECE-level); consonant contrasts (place/manner of articulation)": [
    "Speech Work: long/short vowel contrasts (extended, BECE-level); consonant contrasts (place/manner of articulation)"
  ],
  "JSS3|English Language|Grammar: expressing obligation/necessity (must/have to/need to/ought to); expressing emotions (verb + preposition patterns)": [
    "Grammar: expressing obligation/necessity (must/have to/need to/ought to); expressing emotions (verb + preposition patterns)"
  ],
  "JSS3|English Language|Comprehension: skimming vs scanning; word formation (prefixes and suffixes)": [
    "Comprehension: skimming vs scanning; word formation (prefixes and suffixes)"
  ],
  "JSS3|English Language|Composition: narrative essay (guided writing, BECE level); formal letter (comprehensive review — complaint letter, tone control)": [
    "Composition: narrative essay (guided writing, BECE level); formal letter (comprehensive review — complaint letter, tone control)",
    "Revision: Letter writing: informal and formal"
  ],
  "JSS3|English Language|Literature: fiction vs non-fiction; poetry analysis (stanza, rhyme scheme)": [
    "Literature: fiction vs non-fiction; poetry analysis (stanza, rhyme scheme)"
  ],
  "JSS3|English Language|Speech Work: the schwa sound; stress and intonation (word-stress meaning shifts, statement vs question intonation)": [
    "Speech Work: the schwa sound; stress and intonation (word-stress meaning shifts, statement vs question intonation)"
  ],
  "JSS3|English Language|Grammar: expressing exception (except/except for/but for/apart from); adverbs of frequency; positive-to-negative statement conversion": [
    "Grammar: expressing exception (except/except for/but for/apart from); adverbs of frequency; positive-to-negative statement conversion"
  ],
  "JSS3|English Language|Comprehension: interpreting diagrams/maps/sketches; topic vocabulary (Science/Technology, Law/Justice)": [
    "Comprehension: interpreting diagrams/maps/sketches; topic vocabulary (Science/Technology, Law/Justice)"
  ],
  "JSS3|English Language|Composition: argumentative essay on complex issues (e.g. Nigeria's oil); expository essay (entrepreneurship)": [
    "Composition: argumentative essay on complex issues (e.g. Nigeria's oil); expository essay (entrepreneurship)",
    "Revision: various types of composition writing – Narrative, Descriptive, Expository, Argumentative"
  ],
  "JSS3|English Language|Literature: prose — reading and summarizing chapters; distinguishing irony, euphemism, and hyperbole": [
    "Literature: prose — reading and summarizing chapters; distinguishing irony, euphemism, and hyperbole"
  ],
  "JSS3|English Language|Grammar: punctuation marks (comprehensive review, incl. comma splices); full tense system revision (3×3 grid incl. perfect aspect)": [
    "Grammar: punctuation marks (comprehensive review, incl. comma splices); full tense system revision (3×3 grid incl. perfect aspect)"
  ],
  "JSS3|English Language|Comprehension: topic vocabulary (Mass Media); full mixed-skill revision passage": [
    "Comprehension: topic vocabulary (Mass Media); full mixed-skill revision passage"
  ],
  "JSS3|English Language|Composition: debate (oral composition); full BECE-style mixed essay practice with exam-choice strategy": [
    "Composition: debate (oral composition); full BECE-style mixed essay practice with exam-choice strategy"
  ],
  "JSS3|English Language|Literature: themes and characterisation (multi-layered analysis); full revision guidance for recommended texts": [
    "Literature: themes and characterisation (multi-layered analysis); full revision guidance for recommended texts"
  ]
};
export function assessmentAliases(classLevel:string,subject:string,masterTopic:string){
 const key=`${classLevel}|${subject}|${masterTopic}`;
 return aliases[key]||[masterTopic];
}
