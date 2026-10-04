export type DeepJss3EnglishLesson={
 topicId:string; classLevel:'JSS3'; subject:'English Language'; strand:'Reading'|'Writing'|'Listening and Speaking'|'Grammatical Accuracy'|'Literature'; topic:string;
 source:{authority:'NERDC';url:string;page:number}; objectives:string[]; prerequisites:string[];
 teaching:string[]; workedExamples:string[]; misconceptions:string[]; guidedPractice:string[]; independentPractice:string[];
 mastery:{criterion:string;status:'DEEP_WHEN_PASSED'}; boardReady:true;
};

/** AVORA-authored JSS3 English deep teaching layer mapped to official NERDC topics. */
export const jss3EnglishDeepLessons:DeepJss3EnglishLesson[]=[
{
  "topicId": "nerdc-jss3-english-reading-1",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Reading",
  "topic": "Reading for critical evaluation",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 49
  },
  "objectives": [
    "Evaluate a text by distinguishing facts, opinions, assumptions and conclusions",
    "Identify the writer’s intention, tone and evidence",
    "Judge whether claims are adequately supported and draw a reasoned conclusion"
  ],
  "prerequisites": [
    "JSS2 critical reading",
    "writer purpose",
    "fact and opinion"
  ],
  "teaching": [
    "Critical evaluation combines comprehension with judgement: first establish what the writer says, then test how convincingly it is supported.",
    "Separate claims from evidence. Facts should be verifiable; opinions and value judgements need reasons; assumptions are ideas the writer takes for granted.",
    "Check relevance, sufficiency and consistency of evidence. A dramatic example does not automatically prove a general claim.",
    "Notice loaded language, exaggeration, one-sided selection and unsupported certainty because they can shape a reader’s response.",
    "Finish with a balanced judgement that cites textual evidence and explains what is strong, weak or still uncertain."
  ],
  "workedExamples": [
    "A passage claims “all teenagers waste money” from one interview. The evidence is too narrow for the universal claim.",
    "An editorial gives statistics, names the source and acknowledges a counterargument; those features strengthen, but do not automatically prove, its case."
  ],
  "misconceptions": [
    "criticising a text without evidence",
    "treating every opinion as false",
    "confusing disagreement with evaluation",
    "ignoring counter-evidence"
  ],
  "guidedPractice": [
    "Evaluate a short editorial using claim → evidence → judgement for four major statements."
  ],
  "independentPractice": [
    "Compare two passages on the same issue and write a 150-word evaluation of which is better supported."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-reading-2",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Reading",
  "topic": "Reading for speed",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 50
  },
  "objectives": [
    "Apply skimming, scanning and rapid phrase reading appropriately",
    "Adjust reading speed to purpose and text difficulty",
    "Increase speed while retaining adequate comprehension"
  ],
  "prerequisites": [
    "JSS2 reading for speed",
    "main ideas",
    "text structure"
  ],
  "teaching": [
    "Efficient readers change speed according to purpose; they do not race through every text at one fixed rate.",
    "Skim for overall meaning, scan for a specific item, and read intensively when detail or inference matters.",
    "Read meaningful word groups rather than isolated words and use headings, topic sentences and punctuation to anticipate structure.",
    "Reduce unnecessary regressions, but reread when comprehension genuinely breaks down.",
    "Track both words-per-minute and comprehension accuracy because speed without understanding is not mastery."
  ],
  "workedExamples": [
    "Scan a timetable for a departure time; skim a report to identify its overall position before close reading.",
    "A learner moving from 150 to 210 words per minute but falling from 90% to 45% comprehension has not improved overall reading efficiency."
  ],
  "misconceptions": [
    "equating speed with rushing",
    "using scanning for inferential questions",
    "ignoring comprehension",
    "forcing the same speed on every text"
  ],
  "guidedPractice": [
    "Complete timed skim, scan and close-reading tasks and explain why each technique fits."
  ],
  "independentPractice": [
    "Read two unfamiliar passages under timed conditions and maintain at least 80% comprehension while selecting appropriate strategies."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-reading-3",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Reading",
  "topic": "Reading for summary",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 51
  },
  "objectives": [
    "Identify central ideas and essential supporting points",
    "Condense a passage without distortion or unnecessary detail",
    "Paraphrase and combine related ideas into a coherent summary"
  ],
  "prerequisites": [
    "JSS2 summary reading",
    "paraphrasing",
    "main/supporting ideas"
  ],
  "teaching": [
    "Summary begins with accurate comprehension: identify the controlling idea of each paragraph before shortening anything.",
    "Remove examples, repetition, decorative detail and minor explanation unless they are essential to the main point.",
    "Combine related ideas and paraphrase them in clear original wording while preserving the writer’s meaning.",
    "Keep logical relationships such as cause, contrast and consequence; shortening must not change the argument.",
    "Revise for coverage, concision, coherence, grammar and word-limit discipline."
  ],
  "workedExamples": [
    "Three paragraphs describing causes, effects and solutions to flooding can be reduced to one sentence for each function, then linked coherently.",
    "If a passage lists five examples of poor sanitation, a summary may state the underlying sanitation problem rather than reproduce all five examples."
  ],
  "misconceptions": [
    "copying long sentences",
    "adding personal opinion",
    "dropping a major idea",
    "changing cause into consequence"
  ],
  "guidedPractice": [
    "Turn a six-paragraph passage into six key points, then a concise paragraph."
  ],
  "independentPractice": [
    "Write summaries of two BECE-style passages and annotate where each retained idea came from."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-writing-1",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Writing",
  "topic": "Revision: various types of composition writing – Narrative, Descriptive, Expository, Argumentative",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 52
  },
  "objectives": [
    "Plan and write narrative, descriptive, expository and argumentative compositions",
    "Use structures and language appropriate to each composition type",
    "Revise compositions for coherence, paragraphing, grammar and audience"
  ],
  "prerequisites": [
    "JSS2 expository/argumentative writing",
    "JSS1 narrative/descriptive writing",
    "paragraphing"
  ],
  "teaching": [
    "Narrative writing develops events through a clear sequence, conflict or turning point and resolution; details should serve the story rather than merely fill space.",
    "Descriptive writing creates a precise impression through selected sensory detail, spatial order and suitable figurative language without becoming a list of adjectives.",
    "Expository writing explains a subject logically using definitions, examples, causes, effects, comparison or process as appropriate.",
    "Argumentative writing states a defensible position, gives reasons and evidence, considers opposing views and concludes logically.",
    "For every type, plan before drafting, use purposeful paragraphs and transitions, then edit content separately from grammar and mechanics."
  ],
  "workedExamples": [
    "Narrative prompt “The decision I regretted” needs events and consequence; expository “How erosion affects communities” needs explanation, not invented dialogue.",
    "An argument for school libraries is stronger when it gives reasons about access, study and literacy and addresses cost concerns."
  ],
  "misconceptions": [
    "mixing composition types unintentionally",
    "memorised introductions unrelated to prompt",
    "one-paragraph essays",
    "argument without evidence"
  ],
  "guidedPractice": [
    "Classify four prompts, make an outline for each, then draft the introduction and one body paragraph."
  ],
  "independentPractice": [
    "Write one complete composition from two different genres and revise each with a genre-specific checklist."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-writing-2",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Writing",
  "topic": "Revision: Letter writing: informal and formal",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 53
  },
  "objectives": [
    "Distinguish formal and informal letters by purpose, audience, layout and register",
    "Write correctly structured formal and informal letters",
    "Maintain appropriate tone, paragraphing and conventions throughout"
  ],
  "prerequisites": [
    "JSS2 formal/informal letters",
    "audience and register"
  ],
  "teaching": [
    "Informal letters are personal and conversational but still require clarity, logical paragraphs and correct basic conventions.",
    "Formal letters address institutions or people in official roles and use precise, respectful, economical language.",
    "Choose salutation, heading, closing and address format according to the letter type; do not mix conventions.",
    "Organise the body around purpose: state why you are writing, develop necessary details, then make the request, recommendation or conclusion clear.",
    "Edit for register: slang may suit a close friend but is inappropriate in an application or complaint."
  ],
  "workedExamples": [
    "A complaint to a local authority should identify the problem, relevant facts and requested action rather than use emotional insults.",
    "A letter to a cousin may use a warm personal opening but should still answer the actual prompt fully."
  ],
  "misconceptions": [
    "mixing Yours faithfully and Yours sincerely conventions carelessly",
    "using chat abbreviations",
    "missing purpose",
    "formal letter written like an essay"
  ],
  "guidedPractice": [
    "Repair two badly formatted letters and explain each correction."
  ],
  "independentPractice": [
    "Write one formal and one informal BECE-style letter, then self-audit layout, tone, content and mechanics."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-writing-3",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Writing",
  "topic": "Summary writing",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 54
  },
  "objectives": [
    "Extract required points from a passage",
    "Express selected points concisely in original language",
    "Write grammatically complete summary answers that obey task instructions"
  ],
  "prerequisites": [
    "JSS2 summary writing",
    "paraphrasing",
    "sentence construction"
  ],
  "teaching": [
    "In examination summary, read the question first so you know exactly which information to extract.",
    "Mark only points that answer the demand; interesting details that do not answer it must be excluded.",
    "Paraphrase accurately and avoid replacing a precise idea with a vague generalisation.",
    "When the task requires sentences, each answer must be grammatically complete and independent.",
    "Check number of points, repetition, grammar and whether two supposedly different answers actually express the same idea."
  ],
  "workedExamples": [
    "If asked for three causes of unemployment, effects and solutions do not earn marks even when they appear in the passage.",
    "“Poor roads delay delivery of goods” can become “Bad roads slow the transportation of products” without changing meaning."
  ],
  "misconceptions": [
    "lifting entire clauses",
    "answering outside the demand",
    "splitting one point into two duplicates",
    "fragments instead of sentences"
  ],
  "guidedPractice": [
    "Extract six candidate points from a passage and decide which four answer a specific summary demand."
  ],
  "independentPractice": [
    "Complete two timed summary tasks with point selection, paraphrase and final editing."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-listening-and-speaking-1",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Listening and Speaking",
  "topic": "Speeches: phonemes",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 55
  },
  "objectives": [
    "Identify and produce English vowel and consonant phonemes accurately in words and connected speech",
    "Distinguish minimal pairs and problematic sound contrasts",
    "Use phonemic awareness to improve pronunciation and listening discrimination"
  ],
  "prerequisites": [
    "JSS2 vowel/consonant revision",
    "diphthongs",
    "consonant clusters"
  ],
  "teaching": [
    "A phoneme is a sound unit that can distinguish meaning; changing one sound may change the word.",
    "Revise pure vowels, diphthongs and consonants through mouth position, voicing and place/manner of articulation rather than spelling alone.",
    "English spelling is not a reliable one-to-one guide to sound, so pronunciation must be learned from sound patterns and examples.",
    "Minimal pairs isolate one contrasting phoneme and train both listening and production.",
    "Transfer accurate sounds from isolated words into phrases and sentences so pronunciation remains clear in real speech."
  ],
  "workedExamples": [
    "ship/sheep contrasts vowel quality; fan/van contrasts voiceless and voiced consonants.",
    "The letters “th” represent different sounds in thin and this, showing why spelling alone is insufficient."
  ],
  "misconceptions": [
    "pronouncing from spelling only",
    "adding vowels inside consonant clusters",
    "confusing letter names with sounds",
    "mastering isolated words but losing contrast in sentences"
  ],
  "guidedPractice": [
    "Listen to and classify minimal pairs, then produce each contrast in short sentences."
  ],
  "independentPractice": [
    "Record/read a phoneme-rich passage and complete a discrimination test with at least 80% accuracy."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-listening-and-speaking-2",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Listening and Speaking",
  "topic": "Speeches: Intonation, stress and Rhythm",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 56
  },
  "objectives": [
    "Use word and sentence stress to convey meaning clearly",
    "Recognise and produce appropriate intonation patterns",
    "Maintain intelligible English rhythm in connected speech"
  ],
  "prerequisites": [
    "JSS2 stress/rhythm/intonation",
    "phonemes",
    "connected speech"
  ],
  "teaching": [
    "Word stress makes one syllable more prominent; incorrect stress can make familiar words difficult to recognise.",
    "Sentence stress normally highlights important content words, while many grammatical words become less prominent in neutral speech.",
    "Intonation is pitch movement across an utterance and can signal completion, uncertainty, attitude, contrast or question type.",
    "Rhythm grows from patterns of stressed and unstressed syllables; natural speech is not produced with equal force on every word.",
    "Meaning can change when contrastive stress moves: “I wanted the BLUE pen” corrects the colour, while “I WANTED the blue pen” corrects the action or intention."
  ],
  "workedExamples": [
    "A neutral yes/no question often has rising intonation, while a completed statement commonly falls, though context can alter patterns.",
    "Stress in PHOtograph shifts in phoTOGraphy, illustrating word-family stress change."
  ],
  "misconceptions": [
    "shouting instead of stressing",
    "assuming every question rises",
    "equal stress on every word",
    "ignoring meaning when practising rhythm"
  ],
  "guidedPractice": [
    "Mark stress and intonation on ten utterances, then perform them with different intended meanings."
  ],
  "independentPractice": [
    "Deliver a one-minute spoken passage assessed for intelligibility, stress, rhythm and purposeful intonation."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-grammatical-accuracy-1",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Grammatical Accuracy",
  "topic": "Adverbials and Tenses",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 57
  },
  "objectives": [
    "Identify and use adverbials of time, place, manner, reason and frequency",
    "Select tense forms appropriate to time relationships and context",
    "Maintain tense consistency while expressing sequence and duration"
  ],
  "prerequisites": [
    "JSS2 adverbials and tenses",
    "clauses",
    "time expressions"
  ],
  "teaching": [
    "An adverbial is a word, phrase or clause that adds information about circumstances such as when, where, how, why or how often.",
    "Tense and aspect work together: simple forms present events as wholes or habits; progressive forms foreground ongoing activity; perfect forms connect one time to another.",
    "Time markers guide but do not mechanically determine tense; meaning and sequence matter.",
    "Keep narrative time consistent unless there is a reason to shift, such as referring to an earlier event or a general truth.",
    "Place adverbials where their meaning is clear and avoid dangling or ambiguous modification."
  ],
  "workedExamples": [
    "“By the time we arrived, the match had started” uses past perfect for the earlier past event.",
    "“She usually studies in the library after school” contains frequency, place and time adverbials."
  ],
  "misconceptions": [
    "tense chosen only from one signal word",
    "random tense switching",
    "confusing adverb with adverbial",
    "misplacing modifiers"
  ],
  "guidedPractice": [
    "Complete a timeline exercise and expand simple clauses with different adverbial types."
  ],
  "independentPractice": [
    "Edit a passage containing tense and adverbial errors, then write a coherent 150-word narrative using varied forms."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-grammatical-accuracy-2",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Grammatical Accuracy",
  "topic": "Adverbs, Conjunctions and Prepositions",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 58
  },
  "objectives": [
    "Identify adverbs, conjunctions and prepositions by grammatical function",
    "Use different conjunctions to express logical relationships",
    "Choose appropriate prepositions and adverb forms in context"
  ],
  "prerequisites": [
    "JSS2 parts of speech",
    "clauses",
    "sentence relationships"
  ],
  "teaching": [
    "Adverbs can modify verbs, adjectives, other adverbs or whole clauses; identify function rather than assuming every -ly word is an adverb.",
    "Coordinating conjunctions join units of equal grammatical status; subordinating conjunctions introduce dependent clauses and show relationships such as cause, time, condition or contrast.",
    "Prepositions express relationships involving place, time, direction and other abstract connections, and many choices are conventional collocations.",
    "Choose connectors according to logic: because gives reason, although contrast, if condition, therefore result in appropriate structures.",
    "Proofread for unnecessary duplication such as “although...but” in standard constructions."
  ],
  "workedExamples": [
    "“She spoke remarkably softly”: softly modifies spoke; remarkably modifies softly.",
    "“Although it rained, we played” shows concession; “We stayed inside because it rained” shows cause."
  ],
  "misconceptions": [
    "every -ly word is an adverb",
    "using conjunctions without logical fit",
    "literal translation of prepositions",
    "double connectors"
  ],
  "guidedPractice": [
    "Label functions in a passage and combine sentence pairs using specified relationships."
  ],
  "independentPractice": [
    "Write a short explanatory passage using at least six accurate conjunction/preposition patterns and annotate them."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-grammatical-accuracy-3",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Grammatical Accuracy",
  "topic": "Active and Passive verbs",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 59
  },
  "objectives": [
    "Transform sentences between active and passive voice accurately",
    "Preserve tense and core meaning during transformation",
    "Choose active or passive voice according to communicative purpose"
  ],
  "prerequisites": [
    "JSS2 active/passive voice",
    "verb forms",
    "objects"
  ],
  "teaching": [
    "In active voice the grammatical subject normally performs the action; in passive voice the receiver becomes subject.",
    "Form the passive with an appropriate form of be plus the past participle, preserving the original tense or aspect.",
    "The agent may be included with by when relevant, but it can be omitted when unknown, obvious or deliberately backgrounded.",
    "Only verbs that can take an object normally form straightforward passives.",
    "Voice is a choice of focus, not a measure of correctness: active is often direct; passive is useful when process or receiver matters more."
  ],
  "workedExamples": [
    "“The committee approved the plan” → “The plan was approved by the committee.”",
    "“They are repairing the road” → “The road is being repaired.”"
  ],
  "misconceptions": [
    "changing tense during transformation",
    "using past tense instead of past participle",
    "forcing intransitive verbs into passive",
    "thinking passive always means past tense"
  ],
  "guidedPractice": [
    "Transform twelve sentences across simple, progressive, perfect and modal constructions."
  ],
  "independentPractice": [
    "Rewrite a short report twice, once favouring active and once passive voice, and explain two purposeful choices."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-grammatical-accuracy-4",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Grammatical Accuracy",
  "topic": "Modal forms",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 60
  },
  "objectives": [
    "Identify common modal auxiliaries and explain meanings they express",
    "Use modals appropriately for ability, permission, possibility, obligation, advice and prediction",
    "Report modal statements accurately where forms change in indirect speech"
  ],
  "prerequisites": [
    "JSS2 direct/indirect speech",
    "auxiliary verbs",
    "tense"
  ],
  "teaching": [
    "Modal auxiliaries such as can, could, may, might, must, shall, should, will and would add meanings including possibility, ability, permission, obligation and prediction.",
    "Meaning depends on context: “can” may express ability or informal permission; “must” can express strong obligation or confident deduction.",
    "Modals are followed by the base form of the main verb in ordinary constructions: “should go”, not “should goes”.",
    "In reported speech some modal forms may shift with viewpoint and time, for example can → could and may → might when appropriate.",
    "Do not apply backshift mechanically when the meaning remains current or the reporting context does not require it."
  ],
  "workedExamples": [
    "“You must wear a helmet” expresses obligation; “She must be home” can express strong deduction.",
    "Direct: Ada said, “I may come tomorrow.” Reported: Ada said that she might come the following day."
  ],
  "misconceptions": [
    "adding -s after a modal",
    "treating all modals as interchangeable",
    "confusing obligation with probability",
    "automatic backshift without context"
  ],
  "guidedPractice": [
    "Choose and justify modals in ten situations, then convert selected direct statements to reported speech."
  ],
  "independentPractice": [
    "Write a dialogue and reported version demonstrating at least six modal meanings accurately."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-literature-1",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Literature",
  "topic": "Non-African folktales",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 61
  },
  "objectives": [
    "Identify features of non-African folktales",
    "Analyse plot, character, setting, values and lessons in selected tales",
    "Compare folktale traditions without stereotyping cultures"
  ],
  "prerequisites": [
    "JSS2 African folktales",
    "plot and character",
    "theme"
  ],
  "teaching": [
    "Folktales are traditional narratives passed through communities and often use memorable plots, repeated patterns, archetypal characters, humour or moral instruction.",
    "Study a non-African tale as literature first: trace exposition, conflict, climax and resolution and identify how characters’ choices drive events.",
    "Cultural details should be interpreted from the text and reliable context, not from assumptions about an entire people.",
    "Compare with African folktales by specific features such as trickster roles, supernatural elements, repetition, setting or moral function.",
    "A lesson should arise from events and consequences in the tale rather than being imposed regardless of evidence."
  ],
  "workedExamples": [
    "A trickster who repeatedly succeeds through wit may reveal admiration for cleverness but the ending may also criticise selfishness.",
    "Two tales from different regions may both use talking animals while teaching different social values."
  ],
  "misconceptions": [
    "assuming all folktales have one explicit moral",
    "stereotyping non-African cultures",
    "retelling without analysis",
    "confusing author with traditional narrator"
  ],
  "guidedPractice": [
    "Read a selected tale and map plot, character choices, cultural features and possible lessons."
  ],
  "independentPractice": [
    "Compare one African and one non-African folktale in a structured literary response supported by textual details."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-literature-2",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Literature",
  "topic": "Lessons from myths/legends",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 62
  },
  "objectives": [
    "Distinguish myths and legends and identify their characteristic features",
    "Infer lessons, values and explanations embedded in selected narratives",
    "Support interpretations with events, characters and consequences from the text"
  ],
  "prerequisites": [
    "JSS2 myths and legends",
    "theme",
    "inference"
  ],
  "teaching": [
    "Myths often explain origins, natural phenomena, sacred beliefs or foundational ideas; legends are traditionally linked to persons, places or events that communities regard as historically meaningful.",
    "Both forms can mix imagination, symbolism and cultural memory, so literary analysis should not reduce them to a simple true/false test.",
    "Trace what characters desire, what choices they make and what consequences follow; these patterns often reveal values or warnings.",
    "Separate a text-supported lesson from a personal slogan. Cite the event or pattern that justifies the interpretation.",
    "Different readers may propose different lessons when each interpretation is supported by the narrative."
  ],
  "workedExamples": [
    "A legend in which pride leads a hero to ignore wise counsel may support a lesson about humility if the consequence is central to the plot.",
    "An origin myth may explain a feature of the world while also communicating community values."
  ],
  "misconceptions": [
    "treating myth as merely a lie",
    "claiming a moral without evidence",
    "confusing myth and legend completely",
    "ignoring symbolism"
  ],
  "guidedPractice": [
    "Annotate a myth/legend for explanatory purpose, character choices, consequences and two possible lessons."
  ],
  "independentPractice": [
    "Write a literary response explaining the strongest lesson in an unfamiliar myth or legend with three pieces of evidence."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-literature-3",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Literature",
  "topic": "Prose Revision",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 63
  },
  "objectives": [
    "Analyse prose using plot, setting, characterisation, theme, point of view and style",
    "Explain how prose elements interact to create meaning",
    "Support literary interpretations with relevant textual evidence"
  ],
  "prerequisites": [
    "JSS2 prose",
    "literary elements",
    "evidence-based interpretation"
  ],
  "teaching": [
    "Prose revision should integrate literary elements rather than list definitions. Ask how setting affects conflict, how characterisation advances plot and how point of view shapes what the reader knows.",
    "Plot is the organised sequence of events and causal relationships, not merely a list of everything that happens.",
    "Characterisation may be direct or inferred from speech, actions, thoughts, appearance and other characters’ responses.",
    "Theme is a developed idea about life or society emerging from the whole text; a one-word topic such as “love” is not yet a theme statement.",
    "Style includes diction, imagery, sentence patterns, dialogue, humour, irony and other choices that shape effect."
  ],
  "workedExamples": [
    "If a first-person narrator misunderstands another character, point of view can create limited knowledge and irony.",
    "“Greed” is a topic; “unchecked greed can destroy relationships” is a defensible theme when events support it."
  ],
  "misconceptions": [
    "retelling plot instead of analysing",
    "theme as one word",
    "unsupported character labels",
    "ignoring point of view"
  ],
  "guidedPractice": [
    "Use a prose extract to build an evidence table for character, setting, conflict, theme and style."
  ],
  "independentPractice": [
    "Write a 250-word response explaining how two prose elements work together in an unfamiliar extract."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-literature-4",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Literature",
  "topic": "Poetry: Revision",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 64
  },
  "objectives": [
    "Read poems for literal meaning, voice, mood, theme and structure",
    "Identify and explain the effect of relevant poetic devices",
    "Support interpretation with precise evidence from the poem"
  ],
  "prerequisites": [
    "JSS2 written poetry",
    "figures of speech",
    "tone and mood"
  ],
  "teaching": [
    "Begin with the speaking situation: who appears to speak, about what, to whom and under what circumstances. Do not automatically call the speaker the poet.",
    "Paraphrase difficult lines before interpreting deeper meaning; figurative language must still connect to the poem’s context.",
    "Study sound, imagery, repetition, contrast, lineation, rhyme and rhythm only where they genuinely contribute to effect.",
    "Mood is the atmosphere created for the reader; tone is the speaker’s or writer’s attitude. They may be related but are not identical.",
    "A strong response uses device → evidence → effect → meaning, rather than merely naming devices."
  ],
  "workedExamples": [
    "Repeating a warning at the start of successive lines may create urgency and reinforce the poem’s central concern.",
    "A metaphor comparing time to a thief suggests loss or disappearance; its effect depends on surrounding lines."
  ],
  "misconceptions": [
    "speaker equals poet",
    "device spotting without effect",
    "theme based on one line only",
    "forcing rhyme schemes that are not present"
  ],
  "guidedPractice": [
    "Annotate a poem for speaker, literal situation, imagery, sound, tone, mood and theme."
  ],
  "independentPractice": [
    "Analyse an unfamiliar poem in a structured response using at least four well-explained textual details."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
{
  "topicId": "nerdc-jss3-english-literature-5",
  "classLevel": "JSS3",
  "subject": "English Language",
  "strand": "Literature",
  "topic": "Drama: Revision",
  "source": {
    "authority": "NERDC",
    "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
    "page": 64
  },
  "objectives": [
    "Analyse drama through plot, character, dialogue, conflict, setting and stagecraft",
    "Explain how performance features contribute to meaning",
    "Interpret themes using dramatic evidence rather than plot summary alone"
  ],
  "prerequisites": [
    "JSS2 drama",
    "dialogue",
    "stage directions",
    "theme"
  ],
  "teaching": [
    "Drama is written for performance, so analysis includes what an audience sees and hears as well as the printed dialogue.",
    "Dialogue reveals character, relationships and conflict; stage directions can guide movement, tone, setting, pause and action.",
    "Dramatic conflict may occur between characters, within a character or between a character and wider social forces.",
    "Consider scene structure, entrances/exits, props, gesture, suspense and dramatic irony when they affect audience response.",
    "Theme should be inferred from repeated conflicts, choices and consequences across the play."
  ],
  "workedExamples": [
    "A character saying “I trust you” while secretly hiding evidence can create dramatic irony if the audience knows the truth.",
    "A long pause before an answer may communicate fear, hesitation or tension even though no extra words are spoken."
  ],
  "misconceptions": [
    "reading drama exactly like prose",
    "ignoring stage directions",
    "retelling instead of analysing",
    "calling every disagreement the main conflict"
  ],
  "guidedPractice": [
    "Perform and annotate a short scene, then explain how dialogue and stage directions create tension."
  ],
  "independentPractice": [
    "Write a 250-word analysis of an unfamiliar scene focusing on conflict, character and one performance feature."
  ],
  "mastery": {
    "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
    "status": "DEEP_WHEN_PASSED"
  },
  "boardReady": true
},
];
export function getJss3EnglishDeepLesson(topicId:string){return jss3EnglishDeepLessons.find(x=>x.topicId===topicId)}
