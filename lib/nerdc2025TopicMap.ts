export type NerdcTopicMapEntry={
 legacyTargets:string[];
 evidenceIds:string[];
};

const K=(classLevel:string,subject:string,topic:string)=>`${classLevel}|${subject}|${topic}`;
const m=(legacyTargets:string[],evidenceIds:string[]):NerdcTopicMapEntry=>({legacyTargets,evidenceIds});

const entries:[string,NerdcTopicMapEntry][]=[
 // JSS1 Mathematics — exact September 2025 NERDC table topics.
 [K('JSS1','Mathematics','Whole numbers'),m(['Whole Numbers (place value, counting in millions/billions/trillions, quantitative reasoning)'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-1'])],
 [K('JSS1','Mathematics','Lowest Common Multiples (LCM)'),m(['Lowest Common Multiple (LCM)'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-2'])],
 [K('JSS1','Mathematics','Highest Common Factor (HCF)'),m(['Highest Common Factor (HCF)'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-3'])],
 [K('JSS1','Mathematics','Counting in twos'),m(['Counting in Base Two'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-4'])],
 [K('JSS1','Mathematics','Conversion of Base-ten numerals to Binary numbers'),m(['Conversion of Base 10 to Binary Numbers (1–10)'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-5'])],
 [K('JSS1','Mathematics','Fractions'),m(['Fractions (equivalent fractions, ordering, fractions↔decimals, fractions↔percentages)'],['nerdc-jss1-math-numbers-and-numeration-fractions-1'])],
 [K('JSS1','Mathematics','Addition and Subtraction'),m(['Addition and Subtraction of Whole Numbers (place value, number line, positive/negative integers)'],['nerdc-jss1-math-basic-operations-basic-operations-1'])],
 [K('JSS1','Mathematics','Addition and Subtraction of fractions'),m(['Addition and Subtraction of Fractions'],['nerdc-jss1-math-basic-operations-basic-operations-2'])],
 [K('JSS1','Mathematics','Multiplication and Division of Fractions'),m(['Multiplication and Division of Fractions'],['nerdc-jss1-math-basic-operations-basic-operations-3'])],
 [K('JSS1','Mathematics','Estimation'),m(['Estimation'],['nerdc-jss1-math-basic-operations-derived-operations-1'])],
 [K('JSS1','Mathematics','Approximation'),m(['Approximation (rounding rules, decimal places)'],['nerdc-jss1-math-basic-operations-derived-operations-2'])],
 [K('JSS1','Mathematics','Addition of numbers in base 2.'),m(['Addition of Binary Numbers (2–3 digit)'],['nerdc-jss1-math-basic-operations-derived-operations-3'])],
 [K('JSS1','Mathematics','Subtraction of numbers in base 2.'),m(['Subtraction of Binary Numbers (2–3 digit)'],['nerdc-jss1-math-basic-operations-derived-operations-4'])],
 [K('JSS1','Mathematics','Multiplication of numbers in base 2.'),m(['Multiplication of Binary Numbers (2-digit)'],['nerdc-jss1-math-basic-operations-derived-operations-5'])],
 [K('JSS1','Mathematics','Use of Symbols'),m(['Use of Symbols (open sentences, two-operation equations)'],['nerdc-jss1-math-algebraic-processes-algebraic-operations-1'])],
 [K('JSS1','Mathematics','Simplification of Algebraic Expressions'),m(['Simplification of Algebraic Expressions (like/unlike terms, coefficients, brackets)'],['nerdc-jss1-math-algebraic-processes-algebraic-operations-2'])],
 [K('JSS1','Mathematics','Simple Equations'),m(['Simple Equations (word problems → equations)'],['nerdc-jss1-math-algebraic-processes-algebraic-operations-3'])],
 [K('JSS1','Mathematics','Plane Shapes'),m(['Plane Shapes (similarities/differences, perimeter, area)'],['nerdc-jss1-math-mensuration-and-geometry-shapes-1'])],
 [K('JSS1','Mathematics','Three dimensional Figures'),m(['Three-Dimensional Figures (cubes, cuboids, pyramids, cones, cylinders, spheres; volume)'],['nerdc-jss1-math-mensuration-and-geometry-shapes-2'])],
 [K('JSS1','Mathematics','Construction'),m(['Construction (parallel/perpendicular lines, bisecting a segment, 90°/60° angles)'],['nerdc-jss1-math-mensuration-and-geometry-shapes-3'])],
 [K('JSS1','Mathematics','Angles'),m(['Angles (measurement, vertically opposite/adjacent/alternate/corresponding, angles at a point/on a line)'],['nerdc-jss1-math-mensuration-and-geometry-shapes-4'])],
 [K('JSS1','Mathematics','Needs for statistics'),m(['Need for Statistics','Data Collection'],['nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-1','nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-2'])],
 [K('JSS1','Mathematics','Data representation'),m(['Data Presentation — Median (introductory)'],['nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-3'])],

 // JSS1 English Studies.
 [K('JSS1','English Language','Oral Comprehension'),m([],['nerdc-jss1-english-listening-and-speaking-3','nerdc2025-special-jss1-english-oral-comprehension-current'])],
 [K('JSS1','English Language','Conversation on Various Issues'),m([],['revised2025-jss1-english-conversation'])],
 [K('JSS1','English Language','Speech Sounds (Vowels and Consonants)'),m(['Speech Work: speech organs and sound production; monophthongs (long/short vowel contrasts)','Speech Work: consonant clusters; diphthongs','Speech Work: mixed vowel discrimination (monophthongs + diphthongs)'],['nerdc-jss1-english-listening-and-speaking-1','nerdc-jss1-english-listening-and-speaking-2'])],
 [K('JSS1','English Language','Reading Short passages with fluency'),m([],['revised2025-jss1-english-fluency'])],
 [K('JSS1','English Language','Reading passages for meaning'),m([],['nerdc-jss1-english-reading-2'])],
 [K('JSS1','English Language','Reading Passages to Answer Literal, Inferential and Critical Questions'),m(['Comprehension: SPQ3R reading strategy; answering comprehension questions using textual evidence','Comprehension: full SPQ3R application; fact vs opinion'],['nerdc-jss1-english-reading-3','nerdc-jss1-english-reading-4'])],
 [K('JSS1','English Language','Reading for Summary'),m([],['revised2025-jss1-english-summary'])],
 [K('JSS1','English Language','Parts of speech: Nouns, Verbs and Adjectives'),m(['Grammar: nouns (common/proper, countable/uncountable); verbs (action/state); adjectives (comparison); adverbs; present tense & subject-verb agreement; pronouns (subject/object); prepositions & conjunctions (introductory)'],['nerdc-jss1-english-grammatical-accuracy-1'])],
 [K('JSS1','English Language','Parts of speech: Adverbs, Conjunctions, Prepositions and Interjections'),m(['Grammar: prepositions of time vs place; conjunctions (coordinating vs subordinating)'],['nerdc-jss1-english-grammatical-accuracy-2','revised2025-jss1-english-interjections'])],
 [K('JSS1','English Language','Subject-Verb Agreement'),m([],['revised2025-jss1-english-agreement'])],
 [K('JSS1','English Language','Use of Prefixes, Suffixes and Compounds'),m([],['revised2025-jss1-english-word-formation'])],
 [K('JSS1','English Language','Writing Informal and Formal Letters'),m([],['nerdc-jss1-english-writing-3'])],
 [K('JSS1','English Language','Introduction to Creative writing'),m(['Composition: types of composition (narrative, descriptive, argumentative, expository); elements (introduction, body, conclusion) — full 5-part narrative structure'],['revised2025-jss1-english-creative-writing','nerdc-jss1-english-writing-2'])],
 [K('JSS1','English Language','Introduction to Literature'),m(['Literature: functions of literature; genres (prose, poetry, drama); introduction to folktales'],['nerdc-jss1-english-literature-1'])],
 [K('JSS1','English Language','Folktales'),m(['Literature: functions of literature; genres (prose, poetry, drama); introduction to folktales'],['nerdc-jss1-english-literature-2'])],
 [K('JSS1','English Language','Myths and Legends'),m(['Literature: literary terms (simile, metaphor, personification, hyperbole, alliteration); myths and legends (vs folktales)'],['nerdc-jss1-english-literature-3'])],
 [K('JSS1','English Language','Introduction to Prose Fiction'),m(['Literature: elements of prose (plot, setting, theme, characterisation); introduction to drama (dialogue, stage directions)'],['nerdc-jss1-english-literature-4'])],

 // JSS2 Mathematics.
 [K('JSS2','Mathematics','Whole Numbers'),m(['Whole Numbers — Standard Form; Indices (introductory laws)','Revision: Prime Factors, LCM, HCF; Squares and Square Roots'],['nerdc-jss2-math-numbers-and-numeration-whole-numbers-1'])],
 [K('JSS2','Mathematics','Square root of numbers'),m(['Revision: Prime Factors, LCM, HCF; Squares and Square Roots'],['nerdc-jss2-math-numbers-and-numeration-whole-numbers-1'])],
 [K('JSS2','Mathematics','Fractions'),m(['Fractions, Percentages (increase/decrease), Ratio, Rate'],['nerdc-jss2-math-numbers-and-numeration-fractions-1'])],
 [K('JSS2','Mathematics','Commercial Arithmetic'),m(['Transactions in the Home and Office (budgeting; simple interest)'],['nerdc-jss2-math-basic-operations-derived-operations-1'])],
 [K('JSS2','Mathematics','Approximation'),m(['Approximation — Decimal Places and Significant Figures'],['nerdc-jss2-math-basic-operations-derived-operations-2'])],
 [K('JSS2','Mathematics','Multiplication and division of directed numbers'),m(['Multiplication and Division of Directed (Negative) Numbers'],['nerdc-jss2-math-basic-operations-derived-operations-3'])],
 [K('JSS2','Mathematics','Algebraic Expressions'),m(['Algebraic Expressions (introductory — multiplying terms)','Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-1'])],
 [K('JSS2','Mathematics','Simple Equations'),m(['Simple Linear Equations (balance method, brackets, fractions, word problems)'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-2'])],
 [K('JSS2','Mathematics','Linear Inequalities'),m(['Linear Inequalities in One Variable (solving, sign-flip rule, combined inequalities, number-line representation)'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-3'])],
 [K('JSS2','Mathematics','Graph'),m([],['nerdc-jss2-math-algebraic-processes-algebraic-operations-4'])],
 [K('JSS2','Mathematics','Plane Figure/ Shapes'),m([],['nerdc-jss2-math-mensuration-and-geometry-shapes-1','revised2025-jss2-math-scale-drawing'])],
 [K('JSS2','Mathematics','Angles'),m(['Angles in a Polygon','Angles of Elevation and Depression'],['nerdc-jss2-math-mensuration-and-geometry-shapes-2','revised2025-jss2-math-elevation-depression'])],
 [K('JSS2','Mathematics','Bearing'),m(['Bearing and Distances (compass directions, three-figure bearings, back bearings)'],['nerdc-jss2-math-mensuration-and-geometry-shapes-3'])],
 [K('JSS2','Mathematics','Construction'),m([],['nerdc-jss2-math-mensuration-and-geometry-shapes-4'])],
 [K('JSS2','Mathematics','Data Presentation'),m([],['nerdc-jss2-math-everyday-statistics-data-collection-and-presentation-1'])],
 [K('JSS2','Mathematics','Probability'),m([],['nerdc-jss2-math-everyday-statistics-data-collection-and-presentation-2'])],

 // JSS2 English Studies.
 [K('JSS2','English Language','Debate'),m([],['nerdc2025-special-jss2-english-debate'])],
 [K('JSS2','English Language','Oral Comprehension'),m([],['nerdc-jss2-english-listening-and-speaking-2','nerdc2025-special-jss2-english-oral-comprehension-current'])],
 [K('JSS2','English Language','Oral Summary'),m([],['nerdc2025-special-jss2-english-oral-summary'])],
 [K('JSS2','English Language','Reading with Fluency'),m([],['nerdc2025-special-jss2-english-reading-fluency-current','nerdc-jss2-english-reading-4'])],
 [K('JSS2','English Language','Reading to Understand the Writer’s Purpose'),m(["Comprehension: writer's purpose (extended, mixed-purpose texts); word families (Science/Technology-type topics)"],['nerdc-jss2-english-reading-1'])],
 [K('JSS2','English Language','Reading to Identify the Meanings of Words in Various Contexts'),m(["Comprehension: critical reading (claims vs evidence); reading words in context (context clues)"],['nerdc-jss2-english-reading-2'])],
 [K('JSS2','English Language','Critical Reading'),m(["Comprehension: critical reading (claims vs evidence); reading words in context (context clues)"],['nerdc-jss2-english-reading-3'])],
 [K('JSS2','English Language','Reading for Summary'),m(['Comprehension: summary writing (full method)'],['nerdc-jss2-english-reading-5'])],
 [K('JSS2','English Language','Parts of Speech: Noun, Pronoun, Verb and Adjective'),m([],['nerdc-jss2-english-grammatical-accuracy-1'])],
 [K('JSS2','English Language','Parts of Speech: Adverbs, Conjunctions, Prepositions and interjections'),m([],['nerdc-jss2-english-grammatical-accuracy-2'])],
 [K('JSS2','English Language','Direct and Indirect Speeches'),m([],['nerdc-jss2-english-grammatical-accuracy-5'])],
 [K('JSS2','English Language','Sentence Types (function): Declarative, Interrogative, Imperative (command) and Exclamatory'),m([],['nerdc2025-special-jss2-english-sentence-function'])],
 [K('JSS2','English Language','Structural Sentence Types (simple, compound and complex)'),m([],['nerdc2025-special-jss2-english-sentence-structure'])],
 [K('JSS2','English Language','Tenses'),m([],['nerdc2025-special-jss2-english-tense-system-current','nerdc-jss2-english-grammatical-accuracy-3'])],
 [K('JSS2','English Language','Composition Writing: Expository and Argumentative Essays'),m([],['nerdc-jss2-english-writing-2'])],
 [K('JSS2','English Language','Letter Writing: Informal and Formal'),m(['Composition: formal letter writing (full structure)','Composition: informal/personal letter writing; report writing (introductory)'],['nerdc-jss2-english-writing-3'])],
 [K('JSS2','English Language','Reading class-appropriate plays'),m(['Literature: drama elements extended (conflict, climax, resolution); figures of speech extended (irony, paradox, onomatopoeia)'],['nerdc-jss2-english-literature-5'])],
 [K('JSS2','English Language','Skit-making'),m([],['nerdc2025-special-jss2-english-skit-making'])],
 [K('JSS2','English Language','Writing dialogues'),m([],['nerdc2025-special-jss2-english-dialogue-writing'])],
];

export const nerdc2025TopicMap=new Map(entries);
export function nerdc2025MapFor(classLevel:string,subject:string,topic:string):NerdcTopicMapEntry{
 return nerdc2025TopicMap.get(K(classLevel,subject,topic))||{legacyTargets:[],evidenceIds:[]};
}
export function legacyTargetsForOfficialTopic(classLevel:string,subject:string,topic:string){
 return nerdc2025MapFor(classLevel,subject,topic).legacyTargets;
}
export function evidenceIdsForOfficialTopic(classLevel:string,subject:string,topic:string){
 return nerdc2025MapFor(classLevel,subject,topic).evidenceIds;
}
