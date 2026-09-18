/**
 * Current-cohort curriculum overlay for Nigeria's New Revised BEC (September 2025).
 * Rollout begins at the start of each three-year cycle. In the 2026/27 session,
 * JSS1 and JSS2 are on the revised curriculum; the current JSS3 cohort remains on
 * the previous JSS1-3 sequence until it exits the cycle.
 *
 * Topic structure is reconciled from the official NERDC revised-curriculum portal,
 * the September 2025 NERDC implementation notice, the indexed official JSS1 English
 * curriculum, and cross-checked current 2025/26 schemes. AVORA does not reproduce
 * copyrighted textbook prose.
 */
export type Revised2025Topic={
 id:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';strand:string;
 topic:string;officialOrder:number;term?:1|2|3;objectives:string[];evidenceLessonIds:string[];
 sourceVersion:'NERDC_NEW_REVISED_BEC_2025';verification:'OFFICIAL_REVISED'|'OFFICIAL_PLUS_SCHEME_CROSSCHECK';
};
const slug=(s:string)=>s.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const topic=(classLevel:Revised2025Topic['classLevel'],subject:Revised2025Topic['subject'],strand:string,name:string,order:number,objectives:string[],evidenceLessonIds:string[],verification:Revised2025Topic['verification']='OFFICIAL_PLUS_SCHEME_CROSSCHECK',term?:1|2|3):Revised2025Topic=>({id:`nerdc2025-${classLevel.toLowerCase()}-${subject==='Mathematics'?'math':'english'}-${slug(strand)}-${slug(name)}`,classLevel,subject,strand,topic:name,officialOrder:order,term,objectives,evidenceLessonIds,sourceVersion:'NERDC_NEW_REVISED_BEC_2025',verification});

const j1m=(n:string,o:number,obj:string[],ids:string[],term?:1|2|3)=>topic('JSS1','Mathematics','Mathematics',n,o,obj,ids,'OFFICIAL_PLUS_SCHEME_CROSSCHECK',term);
export const revised2025Jss1Mathematics:Revised2025Topic[]=[
 j1m('Whole Numbers',1,['Use place value to read, write, compare and order whole numbers','Apply whole numbers in contextual problems'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-1'],1),
 j1m('LCM (Least Common Multiple)',2,['Find LCM using listing and prime-factor methods','Apply LCM to repeated-event problems'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-2'],1),
 j1m('HCF (Highest Common Factor)',3,['Find HCF using factor and prime-factor methods','Distinguish HCF from LCM and apply it to grouping problems'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-3'],1),
 j1m('Counting in Base 2',4,['Explain binary place value','Count and represent simple quantities in base two'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-4'],1),
 j1m('Conversion of Base 10 Numerals to Binary Numbers',5,['Convert simple base-ten whole numbers to binary and verify the result'],['nerdc-jss1-math-numbers-and-numeration-whole-numbers-5'],1),
 j1m('Fractions: Types, Simplification and Equivalent Fractions',6,['Identify proper, improper and mixed fractions','Simplify, compare and generate equivalent fractions'],['nerdc-jss1-math-numbers-and-numeration-fractions-1'],1),
 j1m('Basic Operations on Whole Numbers',7,['Add, subtract, multiply and divide whole numbers accurately','Choose an operation from a word problem and check reasonableness'],['nerdc-jss1-math-basic-operations-basic-operations-1'],1),
 j1m('Addition and Subtraction of Fractions',8,['Add and subtract fractions with like and unlike denominators','Solve contextual fraction problems'],['nerdc-jss1-math-basic-operations-basic-operations-2'],2),
 j1m('Multiplication and Division of Fractions',9,['Multiply and divide fractions and mixed numbers','Apply fraction operations to real situations'],['nerdc-jss1-math-basic-operations-basic-operations-3'],2),
 j1m('Estimation and Approximation',10,['Estimate quantities and operations','Round numbers to stated place values and use approximation to check answers'],['nerdc-jss1-math-basic-operations-derived-operations-1','nerdc-jss1-math-basic-operations-derived-operations-2'],2),
 j1m('Binary Addition',11,['Add binary numerals and check by converting to base ten'],['nerdc-jss1-math-basic-operations-derived-operations-3'],2),
 j1m('Binary Subtraction',12,['Subtract binary numerals accurately and verify the result'],['nerdc-jss1-math-basic-operations-derived-operations-4'],2),
 j1m('Binary Multiplication',13,['Multiply simple binary numerals and verify using base-ten equivalents'],['nerdc-jss1-math-basic-operations-derived-operations-5'],2),
 j1m('Use of Symbols and Algebraic Expressions',14,['Translate words into symbols and expressions','Identify variables, constants and coefficients'],['nerdc-jss1-math-algebraic-processes-algebraic-operations-1'],2),
 j1m('Simplification of Algebraic Expressions',15,['Collect like terms','Expand simple brackets and simplify expressions'],['nerdc-jss1-math-algebraic-processes-algebraic-operations-2'],2),
 j1m('Simple Equations',16,['Form and solve one-variable linear equations','Check solutions by substitution'],['nerdc-jss1-math-algebraic-processes-algebraic-operations-3'],3),
 j1m('Plane Shapes',17,['Identify and compare properties of common plane shapes','Use angle and side properties in simple problems'],['nerdc-jss1-math-mensuration-and-geometry-shapes-1'],3),
 j1m('Three-Dimensional Figures',18,['Identify cubes, cuboids, cylinders, cones, spheres and other solids','Describe faces, edges and vertices where applicable'],['nerdc-jss1-math-mensuration-and-geometry-shapes-2'],3),
 j1m('Geometric Constructions',19,['Construct perpendicular and parallel lines, bisectors and standard angles using appropriate instruments'],['nerdc-jss1-math-mensuration-and-geometry-shapes-3'],3),
 j1m('Angles',20,['Measure and classify angles','Use angle facts on a line, around a point, in triangles and quadrilaterals'],['nerdc-jss1-math-mensuration-and-geometry-shapes-4'],3),
 j1m('Need for Statistics',21,['Explain why data and statistics are useful for planning and decision-making'],['nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-1'],3),
 j1m('Data Collection',22,['Plan and collect simple data consistently','Distinguish relevant from irrelevant data'],['nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-2'],3),
 j1m('Data Presentation',23,['Organise and present data using tables and appropriate charts','Read and interpret presented data'],['nerdc-jss1-math-everyday-statistics-data-collection-and-presentation-3'],3),
];

const j2m=(n:string,o:number,obj:string[],ids:string[],term?:1|2|3)=>topic('JSS2','Mathematics','Mathematics',n,o,obj,ids,'OFFICIAL_PLUS_SCHEME_CROSSCHECK',term);
export const revised2025Jss2Mathematics:Revised2025Topic[]=[
 j2m('Whole Numbers and Decimals in Standard Form',1,['Express whole and decimal numbers in standard form','Convert between ordinary notation and standard form'],['nerdc-jss2-math-numbers-and-numeration-whole-numbers-1'],1),
 j2m('Prime Factors and Applications',2,['Express whole numbers as products of prime factors','Apply prime factorisation in problem solving'],['nerdc-jss2-math-numbers-and-numeration-whole-numbers-1'],1),
 j2m('LCM, HCF, Squares and Square Roots',3,['Find LCM and HCF','Identify perfect squares and find/estimate square roots','Solve quantitative-reasoning problems involving these concepts'],['nerdc-jss2-math-numbers-and-numeration-whole-numbers-1'],1),
 j2m('Fractions, Ratios, Decimals and Percentages in Transactions',4,['Convert among fractions, ratios, decimals and percentages','Apply them to household and commercial transactions'],['nerdc-jss2-math-numbers-and-numeration-fractions-1','nerdc-jss2-math-basic-operations-derived-operations-1'],1),
 j2m('Approximation',5,['Approximate to stated decimal places, significant figures and place values','Use approximation in quantitative reasoning'],['nerdc-jss2-math-basic-operations-derived-operations-2'],1),
 j2m('Directed and Non-Directed Numbers',6,['Distinguish directed from non-directed quantities','Interpret positive and negative values in context'],['revised2025-jss2-math-directed-numbers'],1),
 j2m('Multiplication and Division of Directed Numbers',7,['Multiply and divide directed numbers using correct sign rules','Apply directed-number operations to contextual problems'],['nerdc-jss2-math-basic-operations-derived-operations-3'],1),
 j2m('Algebraic Expressions: Expansion and Factorisation',8,['Expand brackets and simplify algebraic expressions','Factorise expressions using common factors and simple quadratic structure'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-1'],1),
 j2m('Algebraic Fractions',9,['Interpret algebraic fractions','Add and subtract simple algebraic fractions with numerical denominators'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-1'],1),
 j2m('Simple Equations',10,['Distinguish equations from expressions','Form and solve simple algebraic equations and check solutions'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-2'],2),
 j2m('Linear Inequalities',11,['Use inequality symbols correctly','Solve simple inequalities and represent solutions'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-3'],2),
 j2m('Graphs and Cartesian Plane',12,['Locate points on Cartesian axes','Plot and interpret simple linear graphs from tables and real situations'],['nerdc-jss2-math-algebraic-processes-algebraic-operations-4'],2),
 j2m('Plane Figures and Their Properties',13,['Identify common plane figures','Use side, angle and symmetry properties to solve problems'],['nerdc-jss2-math-mensuration-and-geometry-shapes-1'],2),
 j2m('Scale Drawing of Lengths and Distances',14,['Explain scale drawing','Represent and recover real lengths/distances from a stated scale'],['revised2025-jss2-math-scale-drawing'],2),
 j2m('Quantitative Aptitude with Shapes and Scale',15,['Apply numerical and spatial reasoning to shape and scale problems','Explain the reasoning used rather than guess patterns'],['revised2025-jss2-math-quantitative-aptitude'],2),
 j2m('Angles and Polygons',16,['Construct and reason with angles','Find interior-angle sums and solve polygon angle problems'],['nerdc-jss2-math-mensuration-and-geometry-shapes-2'],3),
 j2m('Angles of Elevation and Depression',17,['Distinguish elevation from depression','Model and solve simple height/distance problems using angles and scale'],['revised2025-jss2-math-elevation-depression','nerdc-jss2-math-mensuration-and-geometry-shapes-2'],3),
 j2m('Bearings and Distances',18,['Use cardinal directions and three-digit bearings','Solve direction/distance problems including reverse bearings and scale'],['nerdc-jss2-math-mensuration-and-geometry-shapes-3'],3),
 j2m('Triangle Construction and Angle Bisectors',19,['Construct triangles from SAS, ASA and SSS information','Bisect an angle accurately and retain construction evidence'],['nerdc-jss2-math-mensuration-and-geometry-shapes-4'],3),
 j2m('Statistics: Ordered Data and Frequency Tables',20,['Collect and organise data','Construct and interpret frequency tables'],['nerdc-jss2-math-everyday-statistics-data-collection-and-presentation-1'],3),
 j2m('Statistics: Pie Charts and Graphical Representation',21,['Convert frequencies to sector angles','Construct and interpret pie charts and other simple representations'],['nerdc-jss2-math-everyday-statistics-data-collection-and-presentation-1'],3),
 j2m('Probability',22,['Describe chance events','Calculate simple theoretical and experimental probabilities','Interpret probability without treating it as certainty'],['nerdc-jss2-math-everyday-statistics-data-collection-and-presentation-2'],3),
];

const j1e=(s:string,n:string,o:number,obj:string[],ids:string[],verification:Revised2025Topic['verification']='OFFICIAL_PLUS_SCHEME_CROSSCHECK')=>topic('JSS1','English Language',s,n,o,obj,ids,verification);
export const revised2025Jss1English:Revised2025Topic[]=[
 j1e('Listening and Speaking','Oral Comprehension',1,['Listen for main ideas, supporting details and specific information','Respond accurately to spoken texts'],['nerdc-jss1-english-listening-and-speaking-3'],'OFFICIAL_REVISED'),
 j1e('Listening and Speaking','Conversation on Various Issues',2,['Participate in purposeful conversations','Express ideas clearly, listen to others and respond appropriately'],['revised2025-jss1-english-conversation'],'OFFICIAL_REVISED'),
 j1e('Listening and Speaking','Speech Sounds: Vowels and Consonants',3,['Identify and classify English vowel and consonant sounds','Produce target sounds accurately in words and sentences'],['nerdc-jss1-english-listening-and-speaking-1','nerdc-jss1-english-listening-and-speaking-2'],'OFFICIAL_REVISED'),
 j1e('Listening and Speaking','Syllables, Consonant Clusters and Word Boundaries',4,['Segment words into syllables','Pronounce consonant clusters and connected words clearly'],['nerdc-jss1-english-listening-and-speaking-2','revised2025-jss1-english-fluency']),
 j1e('Listening and Speaking','Statements and Tag Questions',5,['Form appropriate tag questions','Use falling/rising intonation to signal meaning and certainty'],['revised2025-jss1-english-tag-questions']),
 j1e('Reading','Short Passages with Fluency',1,['Read age-appropriate passages accurately, at a suitable pace and with expression','Use punctuation and phrasing to support meaning'],['revised2025-jss1-english-fluency'],'OFFICIAL_REVISED'),
 j1e('Reading','Reading Passages for Meaning',2,['Identify main and supporting ideas','Use context and textual evidence to explain meaning'],['nerdc-jss1-english-reading-1','nerdc-jss1-english-reading-2'],'OFFICIAL_REVISED'),
 j1e('Reading','Literal, Inferential and Critical Questions',3,['Answer literal, inferential and critical questions','Support non-literal answers with evidence from the text'],['nerdc-jss1-english-reading-3'],'OFFICIAL_REVISED'),
 j1e('Reading','Reading for Summary',4,['Identify key ideas and omit minor details','Restate important ideas concisely in original wording'],['revised2025-jss1-english-summary'],'OFFICIAL_REVISED'),
 j1e('Reading','Author’s Mood, Attitude and Overall Impression',5,['Infer mood and attitude from diction and context','Distinguish evidence-based inference from guessing'],['nerdc-jss1-english-reading-4']),
 j1e('Reading','Interpreting Diagrams, Maps, Sketches and Spatial Description',6,['Use labels, keys, directions and surrounding text to interpret visual/spatial information'],['nerdc-jss1-english-reading-5','nerdc-jss1-english-reading-6']),
 j1e('Grammatical Accuracy','Nouns, Verbs and Adjectives',1,['Identify nouns, verbs and adjectives','Use them accurately and explain their functions in sentences'],['nerdc-jss1-english-grammatical-accuracy-1'],'OFFICIAL_REVISED'),
 j1e('Grammatical Accuracy','Adverbs, Conjunctions, Prepositions and Interjections',2,['Identify and use adverbs, conjunctions, prepositions and interjections appropriately'],['nerdc-jss1-english-grammatical-accuracy-2','revised2025-jss1-english-interjections'],'OFFICIAL_REVISED'),
 j1e('Grammatical Accuracy','Pronouns',3,['Identify common types of pronouns','Use pronouns with clear antecedents and correct case/number'],['revised2025-jss1-english-pronouns'],'OFFICIAL_REVISED'),
 j1e('Grammatical Accuracy','Adverbials and Tenses',4,['Use common adverbials accurately','Distinguish and use simple and continuous tense forms in context'],['nerdc-jss1-english-grammatical-accuracy-3']),
 j1e('Grammatical Accuracy','Subject–Verb Agreement',5,['Make subjects and finite verbs agree in number/person','Handle common distractors such as intervening phrases and indefinite pronouns'],['revised2025-jss1-english-agreement'],'OFFICIAL_REVISED'),
 j1e('Grammatical Accuracy','Prefixes, Suffixes and Compounds',6,['Use prefixes and suffixes to build/interpret words','Recognise and form common compound words'],['revised2025-jss1-english-word-formation'],'OFFICIAL_REVISED'),
 j1e('Grammatical Accuracy','Active and Passive Voice',7,['Identify active and passive constructions','Transform simple sentences while preserving tense and meaning'],['nerdc-jss1-english-grammatical-accuracy-4']),
 j1e('Writing','Informal and Formal Letters',1,['Distinguish informal from formal register and layout','Write complete letters for realistic purposes'],['nerdc-jss1-english-writing-3'],'OFFICIAL_REVISED'),
 j1e('Writing','Introduction to Creative Writing',2,['Generate, organise and develop original ideas','Use setting, character, description and sequence to create coherent short writing'],['nerdc-jss1-english-writing-2','revised2025-jss1-english-creative-writing'],'OFFICIAL_REVISED'),
 j1e('Writing','Narrative and Descriptive Composition',3,['Plan and write coherent narrative and descriptive compositions','Use paragraphs, detail and suitable vocabulary'],['nerdc-jss1-english-writing-1','nerdc-jss1-english-writing-2']),
 j1e('Writing','Expository and Argumentative Composition',4,['Explain a topic clearly in expository writing','State and support a position with reasons in argumentative writing'],['revised2025-jss1-english-expository-argumentative']),
 j1e('Literature','Introduction to Literature',1,['Explain literature and its major forms/functions','Respond to age-appropriate literary texts'],['nerdc-jss1-english-literature-1'],'OFFICIAL_REVISED'),
 j1e('Literature','Folktales',2,['Identify features and purposes of folktales','Retell and interpret themes/moral lessons without inventing unsupported claims'],['nerdc-jss1-english-literature-2'],'OFFICIAL_REVISED'),
 j1e('Literature','Myths and Legends',3,['Distinguish myths and legends','Identify cultural ideas, themes and lessons in selected texts'],['nerdc-jss1-english-literature-3'],'OFFICIAL_REVISED'),
 j1e('Literature','Introduction to Prose Fiction',4,['Identify plot, character, setting, theme and style in simple prose','Support interpretation with textual evidence'],['nerdc-jss1-english-literature-4'],'OFFICIAL_REVISED'),
 j1e('Literature','Poetry: Types and Features',5,['Recognise basic poetic forms/features','Read and interpret a simple poem using evidence'],['nerdc-jss1-english-literature-5']),
 j1e('Literature','Drama: Types and Features',6,['Identify basic dramatic features','Read/perform scenes and explain character, conflict and theme'],['nerdc-jss1-english-literature-6']),
 j1e('Literature','Figures of Speech: Simile, Metaphor and Irony',7,['Identify and interpret common figures of speech','Explain their effect in context'],['nerdc-jss1-english-literature-7']),
];

const j2e=(s:string,n:string,o:number,obj:string[],ids:string[])=>topic('JSS2','English Language',s,n,o,obj,ids,'OFFICIAL_PLUS_SCHEME_CROSSCHECK');
export const revised2025Jss2English:Revised2025Topic[]=[
 j2e('Listening and Speaking','Revision of Vowel Sounds and Diphthongs',1,['Recognise and produce contrasting vowel sounds and diphthongs accurately'],['nerdc-jss2-english-listening-and-speaking-1']),
 j2e('Listening and Speaking','Consonant Sounds and Consonant Clusters',2,['Produce target consonants and clusters in initial, medial and final positions'],['nerdc-jss2-english-listening-and-speaking-1']),
 j2e('Listening and Speaking','Oral Comprehension',3,['Listen for main ideas, details, inference and speaker purpose','Respond accurately to oral texts'],['nerdc-jss2-english-listening-and-speaking-2']),
 j2e('Listening and Speaking','Stress, Rhythm and Intonation',4,['Use stress, rhythm and intonation to communicate meaning','Recognise common intonation patterns in statements, questions and commands'],['nerdc-jss2-english-listening-and-speaking-3']),
 j2e('Listening and Speaking','Requests and Polite Speech with Modals',5,['Use can, could, may, will and related forms appropriately for requests/permission','Match politeness to context'],['revised2025-jss2-english-modals-requests']),
 j2e('Listening and Speaking','Question Tags',6,['Form and respond to question tags using correct auxiliary and polarity','Use suitable intonation'],['nerdc-jss2-english-listening-and-speaking-4']),
 j2e('Reading','SQ3R and Strategic Reading',1,['Use survey/question/read/recite/review style strategies purposefully','Monitor comprehension while reading'],['nerdc-jss2-english-reading-4']),
 j2e('Reading','Writer’s Purpose and Intention',2,['Infer writer purpose/intention from diction, examples and organisation','Support conclusions with evidence'],['nerdc-jss2-english-reading-1','nerdc-jss2-english-reading-3']),
 j2e('Reading','Contextual Vocabulary and Word Families',3,['Infer meanings of unfamiliar words from context','Use word-family relationships to expand vocabulary'],['nerdc-jss2-english-reading-2']),
 j2e('Reading','Reading for Speed: Skimming and Scanning',4,['Skim for gist and scan for specific information without confusing the purposes','Reduce counterproductive reading habits'],['nerdc-jss2-english-reading-4']),
 j2e('Reading','Main and Supporting Ideas',5,['Identify topic sentences, main ideas and supporting details','Separate central points from examples'],['nerdc-jss2-english-reading-5']),
 j2e('Reading','Reading for Summary',6,['Select key ideas and restate them concisely','Avoid examples, repetition and personal commentary'],['nerdc-jss2-english-reading-5']),
 j2e('Reading','Inference and Critical Reading',7,['Infer unstated meaning from evidence','Distinguish fact, opinion and unsupported claims'],['nerdc-jss2-english-reading-3']),
 j2e('Grammatical Accuracy','Parts of Speech Review',1,['Identify and use nouns, pronouns, verbs, adjectives, adverbs, conjunctions and prepositions accurately'],['nerdc-jss2-english-grammatical-accuracy-1','nerdc-jss2-english-grammatical-accuracy-2']),
 j2e('Grammatical Accuracy','Transitive and Intransitive Verbs',2,['Distinguish transitive from intransitive verbs by object requirements','Use each correctly in sentences'],['revised2025-jss2-english-transitive-intransitive']),
 j2e('Grammatical Accuracy','Active and Passive Voice',3,['Transform active/passive sentences while maintaining tense and meaning','Choose voice appropriately for purpose'],['nerdc-jss2-english-grammatical-accuracy-4']),
 j2e('Grammatical Accuracy','Direct, Indirect and Reported Speech',4,['Apply tense/pronoun/time-word changes in reported speech','Preserve intended meaning when reporting statements/questions'],['nerdc-jss2-english-grammatical-accuracy-5']),
 j2e('Grammatical Accuracy','Adverbials and Tenses',5,['Use tense forms consistently','Use adverbials to express time, place, manner, frequency and reason'],['nerdc-jss2-english-grammatical-accuracy-3']),
 j2e('Grammatical Accuracy','Prepositions and Prepositional Meaning',6,['Choose prepositions appropriate to meaning and collocation','Use prepositional phrases accurately'],['nerdc-jss2-english-grammatical-accuracy-2']),
 j2e('Grammatical Accuracy','Regular and Irregular Verbs',7,['Form common regular and irregular past/past-participle forms','Use them correctly with auxiliaries'],['revised2025-jss2-english-regular-irregular']),
 j2e('Grammatical Accuracy','Punctuation Marks',8,['Use full stops, commas, question marks, colons and semicolons appropriately','Explain how punctuation affects meaning'],['revised2025-jss2-english-punctuation']),
 j2e('Grammatical Accuracy','Conjunctions and Concessive Structures',9,['Use although, whereas, despite and in spite of correctly','Distinguish clause-taking from phrase-taking structures'],['revised2025-jss2-english-concessives']),
 j2e('Writing','Writing an Outline',1,['Generate and organise main/supporting ideas before drafting','Create logical introductions, body points and conclusions'],['nerdc-jss2-english-writing-1']),
 j2e('Writing','Narrative Composition',2,['Plan and write a coherent narrative with sequence, setting, character and conflict'],['revised2025-jss2-english-narrative-descriptive']),
 j2e('Writing','Descriptive Composition',3,['Select and organise sensory details around a controlling impression','Use precise language rather than random adjective lists'],['revised2025-jss2-english-narrative-descriptive']),
 j2e('Writing','Expository and Argumentative Composition',4,['Explain ideas clearly in expository writing','Build a reasoned argument with claims, support and conclusion'],['nerdc-jss2-english-writing-2']),
 j2e('Writing','Formal and Informal Letters',5,['Use correct layout, register and purpose for formal/informal letters','Edit for clarity and completeness'],['nerdc-jss2-english-writing-3']),
 j2e('Writing','Report Writing',6,['Organise a factual report using clear heading, sequence and objective tone','Separate observation from opinion'],['revised2025-jss2-english-report-writing']),
 j2e('Writing','Story Writing',7,['Develop a short story with coherent beginning, development and resolution','Use dialogue/action selectively'],['revised2025-jss2-english-story-writing']),
 j2e('Writing','Summary Writing',8,['Condense a passage to required main points in concise original wording','Observe word/point limits'],['nerdc-jss2-english-writing-4']),
 j2e('Literature','Prose: Features, Short Stories and Novelettes',1,['Identify plot, setting, characterisation, theme, style and diction','Use evidence to discuss a selected prose text'],['nerdc-jss2-english-literature-1']),
 j2e('Literature','Nigerian and African Folktales',2,['Identify folktale features and functions','Interpret lessons/themes in context'],['nerdc-jss2-english-literature-2']),
 j2e('Literature','Myths and Legends',3,['Distinguish myths from legends','Analyse themes, cultural values and characterisation'],['nerdc-jss2-english-literature-3']),
 j2e('Literature','Poetry',4,['Read and interpret age-appropriate written poetry','Identify speaker, theme, imagery, sound and selected figures'],['nerdc-jss2-english-literature-4']),
 j2e('Literature','Drama: Kinds, Features and Performance',5,['Identify dramatic features and basic kinds','Interpret scenes through dialogue, stage action and conflict'],['nerdc-jss2-english-literature-5']),
 j2e('Literature','Figures of Speech: Irony and Hyperbole',6,['Identify irony and hyperbole','Explain meaning/effect from context'],['nerdc-jss2-english-literature-6']),
 j2e('Literature','Figures of Speech: Personification and Onomatopoeia',7,['Identify personification and onomatopoeia','Explain how each shapes imagery or sound effect'],['revised2025-jss2-english-personification-onomatopoeia']),
];

export const revised2025CurrentTopics=[...revised2025Jss1Mathematics,...revised2025Jss2Mathematics,...revised2025Jss1English,...revised2025Jss2English];
export function getRevised2025Topic(id:string){return revised2025CurrentTopics.find(x=>x.id===id)}
export function revised2025Summary(){const by=(c:string,s:string)=>revised2025CurrentTopics.filter(x=>x.classLevel===c&&x.subject===s).length;return {total:revised2025CurrentTopics.length,JSS1:{Mathematics:by('JSS1','Mathematics'),English:by('JSS1','English Language')},JSS2:{Mathematics:by('JSS2','Mathematics'),English:by('JSS2','English Language')},version:'NERDC_NEW_REVISED_BEC_2025' as const};}
