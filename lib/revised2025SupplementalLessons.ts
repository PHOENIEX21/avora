export type Revised2025SupplementalLesson={topicId:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';strand:string;topic:string;source:{authority:'NERDC Revised BEC 2025';url:string;verified:'OFFICIAL_REVISED'|'OFFICIAL_PLUS_SCHEME_CROSSCHECK'};objectives:string[];prerequisites:string[];teaching:string[];workedExamples:string[];misconceptions:string[];guidedPractice:string[];independentPractice:string[];mastery:{criterion:string;status:'DEEP_WHEN_PASSED'};boardReady:true};
const authorityUrl='https://www.nerdc.gov.ng/content_manager/new_curriculum_home.html';
export const revised2025SupplementalLessons:Revised2025SupplementalLesson[]=[
  {
    "topicId": "revised2025-jss2-math-directed-numbers",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Directed and Non-Directed Numbers",
    "objectives": [
      "Distinguish directed from non-directed quantities",
      "Interpret positive and negative values in everyday contexts",
      "Place and compare directed numbers on a number line"
    ],
    "prerequisites": [
      "whole-number ordering",
      "number-line reading",
      "meaning of zero"
    ],
    "teaching": [
      "A directed number has a sign because direction or position relative to a reference point matters; examples include +6°C, −3°C, ₦2,000 credit and ₦500 debt.",
      "A non-directed quantity gives magnitude only, such as 5 kg or 12 m, unless a direction/reference is attached.",
      "On a number line, numbers increase to the right; every negative number is less than zero, and among negatives the number farther left is smaller.",
      "The sign belongs to the quantity. Do not remove it when translating a context into mathematics."
    ],
    "workedExamples": [
      "A temperature 4°C below zero is −4°C, while 4°C above zero is +4°C.",
      "−2 is greater than −7 because −2 lies to the right of −7 on the number line.",
      "If a lift is two floors below ground level, its position may be represented as −2 relative to ground floor 0."
    ],
    "misconceptions": [
      "thinking a minus sign always means “subtract now”",
      "believing −9 is greater than −3 because 9>3",
      "using signed numbers where no reference direction has been defined"
    ],
    "guidedPractice": [
      "Plot −6, −1, 0, +3 and +8; then translate five temperature/elevation/debt statements into signed numbers."
    ],
    "independentPractice": [
      "Solve ten mixed directed/non-directed classification and comparison problems, explaining the reference point in each contextual item."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct with accurate contextual interpretation and number-line comparisons.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-math-scale-drawing",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Scale Drawing of Lengths and Distances",
    "objectives": [
      "Interpret common scale statements",
      "Draw lengths to scale",
      "Recover actual lengths/distances from scale drawings"
    ],
    "prerequisites": [
      "ratio",
      "metric unit conversion",
      "ruler measurement"
    ],
    "teaching": [
      "A scale relates a drawing measurement to the corresponding real measurement. Both quantities must be expressed in compatible units before calculation.",
      "For a statement scale such as 1 cm represents 5 m, multiply drawing length by 5 m/cm to obtain actual length; divide actual length by 5 to obtain drawing length.",
      "A representative fraction such as 1:50 means one unit on the drawing represents fifty of the same units in reality.",
      "Accuracy depends on both calculation and careful measurement; label the scale and units on every construction."
    ],
    "workedExamples": [
      "At 1 cm:4 m, 7.5 cm represents 30 m.",
      "A 12 m wall at 1 cm:2 m is drawn as 6 cm.",
      "At 1:100, a 3.4 cm drawing length represents 340 cm=3.4 m."
    ],
    "misconceptions": [
      "mixing centimetres and metres without conversion",
      "multiplying when the task requires division",
      "treating 1:100 as 1 cm:100 m",
      "rounding a measured length too early"
    ],
    "guidedPractice": [
      "Convert six real distances to drawing lengths using two different scales, then measure a prepared drawing and recover actual dimensions."
    ],
    "independentPractice": [
      "Create a simple scaled floor-plan segment with three labelled lengths and answer five reverse-scale questions."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% across forward and reverse scale problems, with correct units and usable drawing accuracy.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-math-quantitative-aptitude",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Quantitative Aptitude with Shapes and Scale",
    "objectives": [
      "Recognise numerical/spatial relationships in shape problems",
      "Apply scale, symmetry and pattern reasoning",
      "Explain the rule used to reach an answer"
    ],
    "prerequisites": [
      "basic shape properties",
      "ratio and scale",
      "number patterns"
    ],
    "teaching": [
      "Quantitative aptitude is reasoning, not guessing. First list what changes and what stays constant in the diagram, table or sequence.",
      "For shape patterns, inspect number of sides, orientation, shading, count, symmetry and position systematically rather than focusing on one attractive feature.",
      "For scaled or partitioned figures, convert the picture into measurable relationships before doing arithmetic.",
      "A good solution states the rule and then checks that the rule fits every given example, not just the final pair."
    ],
    "workedExamples": [
      "Sequence of polygons triangle, square, pentagon suggests sides increase by one; next is a hexagon.",
      "If every drawing length doubles while the scale remains fixed, corresponding real lengths also double.",
      "A pattern with shaded sectors 1,2,3 in successive equal circles suggests one additional shaded sector per step only if total sectors are unchanged."
    ],
    "misconceptions": [
      "choosing by visual similarity without a rule",
      "using a rule that works for only one step",
      "confusing area growth with length growth",
      "ignoring scale information"
    ],
    "guidedPractice": [
      "Solve six visual/numerical pattern items and verbalise the rule before selecting each answer."
    ],
    "independentPractice": [
      "Complete twelve mixed shape, scale and sequence reasoning items; write a one-sentence justification for at least six."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% accuracy and an explicit valid rule for every non-routine item.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-math-elevation-depression",
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "strand": "Mathematics",
    "topic": "Angles of Elevation and Depression",
    "objectives": [
      "Define angles of elevation and depression",
      "Sketch horizontal reference lines correctly",
      "Use measured/scale diagrams to solve simple height/distance situations"
    ],
    "prerequisites": [
      "angle measurement",
      "parallel lines",
      "scale drawing"
    ],
    "teaching": [
      "An angle of elevation is measured upward from the observer’s horizontal line of sight; an angle of depression is measured downward from the horizontal.",
      "The reference is horizontal, not vertical. Draw a horizontal through the observer before marking either angle.",
      "When two horizontal lines are parallel, alternate-angle relationships often make an angle of depression equal to the corresponding angle of elevation.",
      "At this level, many problems are solved through accurate diagrams, scale and known angle facts; label observer, object, horizontal and line of sight before calculating."
    ],
    "workedExamples": [
      "Looking from ground at a roof forms an angle of elevation at the observer.",
      "Looking from a balcony down to a car forms an angle of depression at the balcony.",
      "If a depression angle is 35° from a horizontal balcony line, the corresponding elevation angle from the car to the balcony is also 35° when horizontals are parallel."
    ],
    "misconceptions": [
      "measuring from a vertical wall",
      "putting the angle at the wrong endpoint",
      "assuming elevation and depression are complements",
      "drawing the horizontal line sloping"
    ],
    "guidedPractice": [
      "Classify six diagrams as elevation/depression and redraw two incorrectly labelled examples."
    ],
    "independentPractice": [
      "Solve eight sketch/scale problems, including reverse identification of the relevant angle from a written scenario."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% with correct reference line, angle location and interpretation.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-conversation",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Conversation on Various Issues",
    "objectives": [
      "Initiate and sustain age-appropriate conversations",
      "Take turns and respond relevantly",
      "Use polite expressions and appropriate register"
    ],
    "prerequisites": [
      "basic sentence formation",
      "listening for meaning"
    ],
    "teaching": [
      "Conversation is cooperative spoken interaction: listen, respond to what was actually said, then add information or a question that moves the exchange forward.",
      "Turn-taking avoids both interruption and long silence. Verbal signals such as “I agree because…”, “Could you explain…?” and “What do you think?” help manage turns.",
      "Register changes with situation: language used with a close friend may be unsuitable for a teacher, visitor or formal group.",
      "Disagreement should target an idea rather than a person; give a reason and, where useful, an alternative."
    ],
    "workedExamples": [
      "Friend: “The match starts at four.” Response: “Thanks. Should we leave by three-thirty?” is relevant and advances the exchange.",
      "Teacher: “Why were you absent?” A respectful response gives the reason directly rather than slang or an unrelated story.",
      "“I see your point, but I think the school should add bins because…” models respectful disagreement."
    ],
    "misconceptions": [
      "preparing a speech instead of listening",
      "interrupting to prove a point",
      "using the same register in every setting",
      "answering with unrelated memorised sentences"
    ],
    "guidedPractice": [
      "Role-play greeting, requesting help, disagreeing politely and giving directions; partner checks relevance, turn-taking and register."
    ],
    "independentPractice": [
      "Hold two 2-minute conversations on school/community issues and complete a self-check on listening, relevance, politeness and clarity."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "Learner sustains a coherent conversation for at least six turns with relevant responses, appropriate register and respectful turn-taking.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-fluency",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading Short Passages with Fluency",
    "objectives": [
      "Read age-appropriate passages accurately",
      "Use suitable pace, phrasing and expression",
      "Self-correct errors that affect meaning"
    ],
    "prerequisites": [
      "word recognition",
      "basic punctuation"
    ],
    "teaching": [
      "Fluent reading combines accuracy, appropriate pace and meaningful phrasing; speed alone is not fluency.",
      "Punctuation and grammar help group words into meaningful phrases. A comma signals a lighter pause than a full stop, while questions often need a different intonation contour.",
      "When a word is misread, use its letters and sentence meaning together, then reread the whole phrase so meaning remains intact.",
      "Repeated reading of a short passage can improve fluency when each repetition targets accuracy and expression rather than racing."
    ],
    "workedExamples": [
      "“After the rain, / the children returned to the field.” is read in sense groups rather than word-by-word.",
      "A reader who says “form” for “from” notices the sentence sounds wrong, checks the spelling and rereads correctly.",
      "A question ending “Are you ready?” should sound like a question, not a flat list."
    ],
    "misconceptions": [
      "equating fluency with fastest reading",
      "pausing after every word",
      "ignoring punctuation",
      "continuing after a meaning-changing error without correction"
    ],
    "guidedPractice": [
      "Teacher models a 100-word passage; learner marks phrase boundaries and performs two readings with feedback."
    ],
    "independentPractice": [
      "Read three unfamiliar passages aloud, record miscues and self-corrections, then repeat one passage to improve accuracy and phrasing."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 95% word accuracy on an age-appropriate passage with meaningful phrasing and self-correction of major miscues.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-tag-questions",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Question Tags",
    "objectives": [
      "Form common affirmative/negative question tags",
      "Match auxiliary and pronoun to the statement",
      "Use appropriate spoken intonation for confirmation or genuine inquiry"
    ],
    "prerequisites": [
      "pronouns",
      "auxiliary verbs",
      "positive/negative clauses"
    ],
    "teaching": [
      "A question tag is a short question added to a statement. A positive statement normally takes a negative tag, while a negative statement takes a positive tag.",
      "Reuse the statement’s auxiliary where possible: “She is ready, isn’t she?” If there is no auxiliary with a simple present/past lexical verb, use do/does/did.",
      "Replace the statement subject with the correct pronoun in the tag.",
      "Intonation can signal purpose: rising tone often asks genuinely, while falling tone often seeks confirmation the speaker expects."
    ],
    "workedExamples": [
      "They are coming, aren’t they?",
      "Musa plays football, doesn’t he?",
      "You didn’t call, did you?"
    ],
    "misconceptions": [
      "repeating the same polarity in statement and tag",
      "using the noun again instead of a pronoun",
      "using “isn’t” with a simple lexical verb",
      "forgetting tense/person agreement in do/does/did"
    ],
    "guidedPractice": [
      "Complete and read aloud ten tags, then change five statements from positive to negative while repairing the tags."
    ],
    "independentPractice": [
      "Write twelve original tagged statements covering be, have, modals and simple present/past; mark likely rising/falling intonation."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% structurally correct tags and appropriate oral delivery in a short dialogue.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-summary",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading for Summary",
    "objectives": [
      "Identify central ideas in a short passage",
      "Separate essential ideas from examples/repetition",
      "Restate key points concisely in original wording"
    ],
    "prerequisites": [
      "main/supporting ideas",
      "basic paraphrase"
    ],
    "teaching": [
      "A summary keeps the important meaning while removing repetition, minor examples and decoration.",
      "Read the whole passage first, identify the controlling idea, then select only points needed to represent it.",
      "Paraphrase by changing structure and wording while preserving meaning; replacing one word with a synonym is not enough.",
      "Check the required number of points or word limit and avoid adding personal opinions."
    ],
    "workedExamples": [
      "Original: “Many pupils walk because fares are high. Some leave home before sunrise.” Summary point: High transport costs make many pupils walk long distances/leave early.",
      "Three examples of littering can often be reduced to the broader point “Improper waste disposal blocks drainage.”",
      "A personal comment such as “This is terrible” is removed unless the task asks for evaluation."
    ],
    "misconceptions": [
      "copying whole sentences",
      "including every example",
      "adding new ideas",
      "writing notes so short that meaning is lost"
    ],
    "guidedPractice": [
      "Reduce a 180-word passage to four key points, compare with source, and remove unnecessary examples."
    ],
    "independentPractice": [
      "Summarise two passages under stated point/word limits and underline where each summary point came from."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% of required key points captured accurately, concisely and without unsupported additions.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-interjections",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Interjections",
    "objectives": [
      "Identify interjections in context",
      "Explain the emotion/reaction they express",
      "Punctuate and use interjections appropriately"
    ],
    "prerequisites": [
      "sentence punctuation",
      "basic parts of speech"
    ],
    "teaching": [
      "An interjection is a short expression that conveys a sudden feeling or reaction, such as surprise, pain, joy, disgust or attention.",
      "Interjections are often grammatically separate from the sentence that follows, so punctuation helps show the strength of the reaction.",
      "Meaning depends on context and tone: “Oh” may express surprise, disappointment or realisation.",
      "Use interjections sparingly in suitable informal/creative contexts; they are usually inappropriate in formal reports."
    ],
    "workedExamples": [
      "“Ouch! That pan is hot.” expresses pain.",
      "“Oh, I understand now.” expresses realisation.",
      "“Hurray! Our team won.” expresses joy."
    ],
    "misconceptions": [
      "calling every exclamation an interjection",
      "assuming one interjection has only one emotion",
      "overusing interjections in formal writing",
      "forgetting punctuation"
    ],
    "guidedPractice": [
      "Identify interjections in eight mini-dialogues and state the emotion/contextual function."
    ],
    "independentPractice": [
      "Write six short contexts using different interjections, then rewrite two as formal prose without interjections."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% accuracy identifying function and using punctuation/register appropriately.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-pronouns",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Pronouns",
    "objectives": [
      "Identify common pronoun types",
      "Use pronouns with clear antecedents",
      "Maintain person, number and case consistency"
    ],
    "prerequisites": [
      "nouns",
      "sentence subjects/objects"
    ],
    "teaching": [
      "A pronoun replaces or refers to a noun/noun phrase to avoid unnecessary repetition. The noun it refers to is its antecedent.",
      "Personal pronouns change form by role: I/he/she/we/they commonly act as subjects, while me/him/her/us/them commonly act as objects.",
      "Possessive and reflexive forms have different jobs: “This book is mine”; “She taught herself.”",
      "A pronoun must point clearly to its antecedent. Avoid ambiguous sentences where two nouns could match “he”, “she” or “it”."
    ],
    "workedExamples": [
      "Amina greeted Tola. She smiled. This is ambiguous unless context shows who “she” is.",
      "“The teacher called him,” not “called he,” because the pronoun is an object.",
      "“The girls prepared themselves,” agrees in number with girls."
    ],
    "misconceptions": [
      "choosing subject forms after verbs/prepositions",
      "using reflexive pronouns as fancy substitutes for me/I",
      "unclear antecedents",
      "switching from one person to another without reason"
    ],
    "guidedPractice": [
      "Replace repeated nouns in six sentences with suitable pronouns and repair four ambiguous references."
    ],
    "independentPractice": [
      "Edit a paragraph for pronoun agreement/case/clarity and write eight original examples using personal, possessive, demonstrative and reflexive pronouns."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct pronoun form, agreement and antecedent clarity in editing and production tasks.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-agreement",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Subject–Verb Agreement",
    "objectives": [
      "Match verbs with subjects in number/person",
      "Identify the true subject despite intervening words",
      "Apply agreement in common present-tense and be/have constructions"
    ],
    "prerequisites": [
      "subjects and verbs",
      "singular/plural nouns",
      "present tense"
    ],
    "teaching": [
      "Subject–verb agreement means the verb form fits its grammatical subject. In the simple present, third-person singular subjects usually take -s/-es on lexical verbs.",
      "Words between subject and verb do not change the controlling subject: “The basket of oranges is heavy.”",
      "Compound subjects joined by “and” are usually plural, while some either/or and neither/nor patterns require attention to the nearer subject at this level.",
      "Be and have show agreement clearly: I am, he is, they are; she has, they have."
    ],
    "workedExamples": [
      "The boy runs; the boys run.",
      "The list of names is on the desk—“list” is the subject.",
      "Musa and Ada are ready."
    ],
    "misconceptions": [
      "making the verb agree with the nearest noun inside a prepositional phrase",
      "adding -s to plural-subject verbs in present tense",
      "treating every “and” phrase as singular",
      "forgetting irregular be/have forms"
    ],
    "guidedPractice": [
      "Underline subjects and choose the correct verb in twelve increasingly complex sentences."
    ],
    "independentPractice": [
      "Edit a 120-word paragraph containing twelve deliberate agreement errors and explain five corrections."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 90% agreement accuracy, including sentences with intervening phrases and compound subjects.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-word-formation",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Prefixes, Suffixes and Compound Words",
    "objectives": [
      "Identify roots, prefixes and suffixes",
      "Use common affixes to form/change words",
      "Recognise and form compound words"
    ],
    "prerequisites": [
      "basic vocabulary",
      "parts of speech"
    ],
    "teaching": [
      "A root/base carries the central lexical meaning. A prefix is added before it; a suffix is added after it.",
      "Affixes can change meaning, grammatical class or both: happy→unhappy changes meaning; teach→teacher changes verb to noun.",
      "Do not assume every initial/final letter group is an affix; the remaining base must make linguistic sense in the intended analysis.",
      "Compound words combine two meaningful bases and may be written closed, open or hyphenated according to accepted usage."
    ],
    "workedExamples": [
      "possible→impossible uses prefix im- to express negation.",
      "care→careful→carefully shows suffixes changing meaning/class.",
      "school bus is an open compound; classroom is a closed compound."
    ],
    "misconceptions": [
      "splitting words into fake roots",
      "assuming prefixes always change word class",
      "inventing spellings when adding suffixes",
      "thinking all compounds must be one word"
    ],
    "guidedPractice": [
      "Build word families from help, agree, care and use; classify ten compound words by form."
    ],
    "independentPractice": [
      "Analyse fifteen words into meaningful parts and use ten derived/compound words correctly in sentences."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct morphological analysis and appropriate use of derived/compound forms.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-creative-writing",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Introduction to Creative Writing",
    "objectives": [
      "Generate an original idea from a prompt",
      "Use setting, character, detail and voice to develop a short creative piece",
      "Draft and revise for coherence and effect"
    ],
    "prerequisites": [
      "paragraphing",
      "sentence punctuation",
      "basic narrative description"
    ],
    "teaching": [
      "Creative writing makes deliberate choices to create an experience for the reader; originality means shaping details and voice rather than copying a memorised story.",
      "Start from a clear situation: who is involved, where/when it happens, what changes or matters, and whose viewpoint guides the reader.",
      "Concrete sensory details and purposeful actions often show more than strings of adjectives. Dialogue should reveal character or advance events.",
      "Revision checks sequence, consistency, unnecessary repetition, stronger verbs, paragraphing and an ending that grows from the piece."
    ],
    "workedExamples": [
      "Instead of “The market was very busy,” write details such as “Traders called across narrow aisles as baskets brushed against passing shoppers.”",
      "A prompt “The unopened box” can become suspense by delaying information while giving relevant clues.",
      "Dialogue “Give it back,” Tola whispered shows action/tone more efficiently than a long explanation."
    ],
    "misconceptions": [
      "believing creative writing has no structure",
      "copying stock openings/endings",
      "using many adjectives without precise detail",
      "adding dialogue that does not serve the piece"
    ],
    "guidedPractice": [
      "Plan a 250-word piece from a visual prompt using character, setting, conflict/change and five sensory/action details."
    ],
    "independentPractice": [
      "Write and revise a 350–450 word creative piece; submit first plan plus final version with three explained revisions."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "Coherent original piece meeting prompt, with controlled viewpoint, purposeful detail, paragraphing and meaningful revision.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-expository-argumentative",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Expository and Argumentative Composition",
    "objectives": [
      "Distinguish explanation from argument",
      "Organise expository ideas logically",
      "State and support a clear argumentative position with reasons/examples"
    ],
    "prerequisites": [
      "paragraph structure",
      "main/supporting ideas",
      "basic outlining"
    ],
    "teaching": [
      "Expository writing explains or informs; argumentative writing takes a position and tries to justify it. Both require organisation and evidence, but their purposes differ.",
      "An expository paragraph can use definition, sequence, cause/effect, comparison or examples. Each paragraph should develop one controlling point.",
      "An argument needs a clear claim, relevant reasons and support. A reason is not automatically evidence; examples, facts or logical explanation strengthen it.",
      "A fair argument can acknowledge an opposing view and answer it respectfully rather than insulting people who disagree."
    ],
    "workedExamples": [
      "Expository topic “How flooding affects communities” can organise paragraphs by causes, effects and prevention.",
      "Argument claim “Schools should provide more library periods” needs reasons such as reading practice and research access, then supporting examples.",
      "“Everyone knows this” is assertion, not evidence."
    ],
    "misconceptions": [
      "turning exposition into a personal quarrel",
      "listing reasons without explaining them",
      "using irrelevant examples",
      "writing a conclusion that introduces a new main point"
    ],
    "guidedPractice": [
      "Classify six prompts as mainly expository/argumentative, create outlines, and develop one body paragraph for each type."
    ],
    "independentPractice": [
      "Write one 350-word expository and one 350-word argumentative composition; revise with purpose, organisation, support and language checklist."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% on a rubric covering purpose, structure, paragraph development, support, coherence and language accuracy.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-modals-requests",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Polite Requests and Modal Expressions",
    "objectives": [
      "Use modal verbs to make requests/offers/permission appropriately",
      "Adjust politeness to context",
      "Respond to requests naturally"
    ],
    "prerequisites": [
      "auxiliary verbs",
      "conversation register"
    ],
    "teaching": [
      "Modals such as can, could, may, might and would express degrees of ability, permission, possibility or politeness. Context determines which meaning is active.",
      "Requests can be softened by modal choice and phrasing: “Could you help me, please?” is generally more polite than an abrupt command.",
      "Formal settings often favour more respectful formulations; close peers may use simpler forms without being rude.",
      "A complete interaction includes a suitable response—acceptance, refusal with reason where appropriate, or clarification."
    ],
    "workedExamples": [
      "Could you open the window, please?—polite request.",
      "May I come in?—formal permission request.",
      "Would you mind repeating that?—polite request for repetition."
    ],
    "misconceptions": [
      "treating all modals as interchangeable",
      "using “may” to express every kind of ability",
      "adding “please” to an otherwise insulting command and calling it polite",
      "ignoring response/register"
    ],
    "guidedPractice": [
      "Transform six commands into context-appropriate requests and role-play requester/respondent."
    ],
    "independentPractice": [
      "Write and perform three short dialogues: peer, teacher, public office; vary modal/register appropriately."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% appropriate modal meaning, register and response across written and oral tasks.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-transitive-intransitive",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Transitive and Intransitive Verbs",
    "objectives": [
      "Identify whether a verb takes a direct object in a given use",
      "Distinguish transitive/intransitive uses of the same verb",
      "Construct accurate examples"
    ],
    "prerequisites": [
      "verbs",
      "objects in sentences"
    ],
    "teaching": [
      "A transitive verb has a direct object receiving the action: “Ada opened the door.” Ask “opened what?”",
      "An intransitive verb does not take a direct object: “The baby slept.” A following adverbial such as “on the bed” is not a direct object.",
      "Some verbs can be either depending on use: “The bell rang” (intransitive); “She rang the bell” (transitive).",
      "Classification belongs to the verb as used in the sentence, not permanently to the dictionary word."
    ],
    "workedExamples": [
      "They built a bridge—transitive; bridge is direct object.",
      "The crowd laughed loudly—intransitive; loudly is adverb, not object.",
      "The door opened—intransitive; Musa opened the door—transitive."
    ],
    "misconceptions": [
      "calling any noun after a verb its object",
      "assuming a verb is always transitive/intransitive",
      "mistaking prepositional complements for direct objects",
      "using “what?” mechanically without checking meaning"
    ],
    "guidedPractice": [
      "Classify twelve verb uses and underline direct objects where present."
    ],
    "independentPractice": [
      "Write ten paired sentences showing five verbs used transitively and intransitively; explain the difference."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% correct classification with accurate object identification.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-regular-irregular",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Regular and Irregular Verbs",
    "objectives": [
      "Form past/past participles of common regular verbs",
      "Use high-frequency irregular forms accurately",
      "Choose correct forms with auxiliaries"
    ],
    "prerequisites": [
      "verb tense basics",
      "auxiliary have/be"
    ],
    "teaching": [
      "Regular verbs generally form past and past participle with -ed, with spelling adjustments such as study→studied and stop→stopped.",
      "Irregular verbs do not follow one universal -ed pattern and must be learned in meaningful families and contexts: go/went/gone; write/wrote/written.",
      "After has/have/had use the past participle, not automatically the simple past: “has gone”, not “has went”.",
      "Practice in sentences is better than memorising isolated lists because tense and auxiliary determine the required form."
    ],
    "workedExamples": [
      "walk/walked/walked is regular.",
      "see/saw/seen: “I saw it yesterday”; “I have seen it before.”",
      "teach/taught/taught: “She has taught us.”"
    ],
    "misconceptions": [
      "adding -ed to every verb",
      "using simple past after have/has/had",
      "confusing participles such as wrote/written",
      "forgetting spelling changes in regular verbs"
    ],
    "guidedPractice": [
      "Complete a base/past/participle table and select forms in twelve context sentences."
    ],
    "independentPractice": [
      "Edit a paragraph containing fifteen verb-form errors and write ten original sentences using irregular participles."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 90% correct forms in contextual tense/auxiliary tasks.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-punctuation",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Punctuation Marks",
    "objectives": [
      "Use major punctuation marks to structure meaning",
      "Distinguish comma, colon and semicolon functions",
      "Punctuate direct speech and lists appropriately"
    ],
    "prerequisites": [
      "sentence boundaries",
      "capitalisation"
    ],
    "teaching": [
      "A full stop closes a complete declarative sentence; a question mark closes a direct question; an exclamation mark marks strong exclamation and should not be overused.",
      "Commas separate items and some introductory/nonessential elements, but a comma alone should not join two complete sentences in formal writing.",
      "A colon can introduce a list or explanation after a complete lead-in; a semicolon can link closely related complete clauses.",
      "Quotation marks and accompanying punctuation show direct speech; start a new paragraph when a different speaker takes a turn in extended dialogue."
    ],
    "workedExamples": [
      "Bring these items: a ruler, pencil and compass.",
      "The rain stopped; the match continued.",
      "“Where are you going?” Ada asked."
    ],
    "misconceptions": [
      "using commas instead of full stops between independent sentences",
      "putting a colon immediately after an incomplete verb phrase",
      "using apostrophes for ordinary plurals",
      "scattering exclamation marks for emphasis"
    ],
    "guidedPractice": [
      "Punctuate an unpunctuated 100-word passage and explain ten choices."
    ],
    "independentPractice": [
      "Edit two paragraphs for sentence boundaries, lists and dialogue; write five examples correctly using colon/semicolon/direct speech."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 90% correct punctuation in editing, with explanations showing meaning-based choices.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-concessives",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Conjunctions and Concessive Structures",
    "objectives": [
      "Use conjunctions to show logical relationships",
      "Use although/though with clauses",
      "Use despite/in spite of with noun phrases or gerund structures"
    ],
    "prerequisites": [
      "clauses",
      "conjunctions",
      "prepositions"
    ],
    "teaching": [
      "Conjunctions connect ideas and signal relationships such as addition, contrast, cause, condition or choice.",
      "Although/though introduce concessive clauses containing a subject and verb: “Although it rained, we played.”",
      "Despite/in spite of are followed by a noun phrase or -ing form, not a finite clause unless restructured: “Despite the rain…”; “In spite of being tired…”.",
      "Do not double-mark the same contrast with “although…but” in standard formal structures."
    ],
    "workedExamples": [
      "Although she was tired, she completed the work.",
      "Despite her tiredness, she completed the work.",
      "In spite of arriving late, he joined the meeting."
    ],
    "misconceptions": [
      "although…but together",
      "despite of",
      "despite + full finite clause without restructuring",
      "choosing a connector whose meaning contradicts the sentence"
    ],
    "guidedPractice": [
      "Transform eight although sentences into despite/in-spite-of forms and back."
    ],
    "independentPractice": [
      "Complete twelve connector-choice items and write six original sentences expressing contrast, cause and condition."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% grammatically correct and semantically appropriate conjunction/concessive use.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-narrative-descriptive",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Narrative and Descriptive Composition",
    "objectives": [
      "Plan coherent narratives",
      "Create controlled description around a dominant impression",
      "Revise organisation, detail and language"
    ],
    "prerequisites": [
      "paragraphing",
      "JSS1 composition basics"
    ],
    "teaching": [
      "Narrative writing develops events through a meaningful sequence, with characters, setting, conflict/change and resolution rather than a bare list of happenings.",
      "Description organises selected sensory and spatial details to create a dominant impression; it is not simply a catalogue of adjectives.",
      "Both forms benefit from planning: choose viewpoint, key details, paragraph progression and an ending that fits the purpose.",
      "Revision removes irrelevant events/details, repairs tense/viewpoint shifts and replaces vague expressions with precise nouns/verbs."
    ],
    "workedExamples": [
      "Narrative plan: missed bus→unexpected helper→problem solved→reflection; each event causes the next.",
      "Description of a workshop can move from entrance to workbench to sounds/smells, maintaining spatial order.",
      "“The machine coughed and rattled” is more precise/effective than “The machine was very noisy.”"
    ],
    "misconceptions": [
      "using “and then” for every event",
      "describing everything equally",
      "changing tense/person without purpose",
      "memorised unrelated openings/endings"
    ],
    "guidedPractice": [
      "Develop one narrative and one descriptive outline from prompts, then draft a strong body paragraph for each."
    ],
    "independentPractice": [
      "Write 400–500 words in each mode across two assignments and revise using a coherence/detail/language rubric."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% on purpose, organisation, development, coherence and language-control rubric.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-report-writing",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Report Writing",
    "objectives": [
      "State report purpose/audience",
      "Present facts in logical order",
      "Use objective, precise language and appropriate headings where required"
    ],
    "prerequisites": [
      "formal paragraphing",
      "past tense",
      "fact/opinion distinction"
    ],
    "teaching": [
      "A report records findings or events for a defined reader and purpose; this determines what information is relevant.",
      "Use factual, verifiable details—who, what, when, where, how, and outcomes—rather than unsupported judgement.",
      "Organisation may be chronological for an event report or sectional for an investigation; headings can improve retrieval in longer reports.",
      "Objective tone does not mean vague language. Give concrete quantities, observations and sources where available."
    ],
    "workedExamples": [
      "“The sanitation exercise began at 8:10 a.m. with 42 pupils present” is more report-like than “Everybody came early and it was wonderful.”",
      "An incident report separates observed events from later recommendations.",
      "A findings section can group observations by location rather than narrating every movement of the writer."
    ],
    "misconceptions": [
      "turning a report into a story with invented dialogue",
      "mixing opinion into factual findings",
      "omitting date/place/purpose",
      "using emotional praise/blame instead of evidence"
    ],
    "guidedPractice": [
      "Convert a narrative account into a concise factual school-event report with heading and ordered details."
    ],
    "independentPractice": [
      "Write a 350–450 word report on a simulated club event/investigation, including purpose, findings and suitable conclusion/recommendation."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 80% on relevance, factual accuracy, organisation, register and language.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-story-writing",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Story Writing",
    "objectives": [
      "Develop a plot from a prompt",
      "Use character, setting, conflict and resolution coherently",
      "Use dialogue/action selectively and revise for effect"
    ],
    "prerequisites": [
      "narrative composition",
      "paragraphing",
      "direct speech punctuation"
    ],
    "teaching": [
      "A story needs change: something unsettles the starting situation, characters respond, consequences follow and the ending resolves or meaningfully reframes the conflict.",
      "Plot events should be causally connected. Remove episodes that could disappear without affecting the central conflict.",
      "Character is shown through choices, speech, action and selective description. Dialogue works best when it reveals motive, tension or necessary information.",
      "Control viewpoint and tense. Revise for pace: expand important scenes, compress routine transitions and avoid explaining every emotion directly."
    ],
    "workedExamples": [
      "Prompt “The message arrived too late” can centre on one delayed decision rather than ten unrelated adventures.",
      "“Bisi folded the note twice before answering” can imply hesitation without writing “Bisi was very hesitant.”",
      "A final consequence that grows from an earlier decision creates stronger resolution than “I woke up and it was a dream.”"
    ],
    "misconceptions": [
      "plot as random sequence",
      "too many characters",
      "dialogue with no function",
      "cliché endings unrelated to the conflict"
    ],
    "guidedPractice": [
      "Create a scene-by-scene plot map and draft the turning-point scene with dialogue/action."
    ],
    "independentPractice": [
      "Write a 500-word story from one of three prompts; revise specifically for causal plot, viewpoint, dialogue and ending."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "Coherent original story scoring at least 80% on plot, characterisation, setting, language and revision evidence.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss2-english-personification-onomatopoeia",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Figures of Speech: Personification and Onomatopoeia",
    "objectives": [
      "Identify personification and onomatopoeia",
      "Explain their contextual effect",
      "Create appropriate original examples"
    ],
    "prerequisites": [
      "literal/figurative meaning",
      "basic imagery"
    ],
    "teaching": [
      "Personification gives human actions, feelings or qualities to non-human things; the important step is explaining what the human quality helps the reader imagine.",
      "Onomatopoeia uses words whose sound evokes or imitates a sound, such as buzz, clang or hiss; effect depends on context, rhythm and sound pattern.",
      "A label alone is incomplete literary analysis. Connect the device to mood, movement, emphasis or imagery in the passage.",
      "Not every verb applied to nature is automatically personification; check whether the expression genuinely attributes human behaviour/quality."
    ],
    "workedExamples": [
      "“The angry storm pounded the roof” personifies the storm and intensifies threat.",
      "“The bees buzzed around the hive” uses buzz as onomatopoeic sound imagery.",
      "“The leaves danced in the wind” personifies leaves to suggest lively movement."
    ],
    "misconceptions": [
      "identifying any animal action as personification",
      "calling rhyme onomatopoeia",
      "naming the device without explaining effect",
      "forcing literal sound words into every poem"
    ],
    "guidedPractice": [
      "Identify and explain the effect of devices in eight short lines, including distractors."
    ],
    "independentPractice": [
      "Annotate a short poem/prose paragraph and write six original examples with one-sentence effect explanations."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_SCHEME_CROSSCHECK"
    },
    "mastery": {
      "criterion": "At least 85% identification accuracy plus defensible contextual effect explanations.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  }
];
export function getRevised2025SupplementalLesson(id:string){return revised2025SupplementalLessons.find(x=>x.topicId===id)}
