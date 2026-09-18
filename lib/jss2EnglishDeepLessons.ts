export type DeepJss2EnglishLesson={
 topicId:string; classLevel:'JSS2'; subject:'English Language'; strand:'Reading'|'Writing'|'Listening and Speaking'|'Grammatical Accuracy'|'Literature'; topic:string;
 source:{authority:'NERDC';url:string;page:number}; objectives:string[]; prerequisites:string[];
 teaching:string[]; workedExamples:string[]; misconceptions:string[]; guidedPractice:string[]; independentPractice:string[];
 mastery:{criterion:string;status:'DEEP_WHEN_PASSED'}; boardReady:true;
};

/**
 * AVORA-authored JSS2 English Studies teaching layer.
 * NERDC defines scope/performance expectations; AVORA authors the explanations,
 * examples, practice, misconception treatment and mastery evidence.
 */
export const jss2EnglishDeepLessons:DeepJss2EnglishLesson[]=[
  {
    "topicId": "nerdc-jss2-english-reading-1",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading for understanding the writer’s purpose",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 25
    },
    "objectives": [
      "Identify key words and expressions that signal a writer’s purpose",
      "Distinguish purposes such as informing, persuading, entertaining, warning, criticising or stimulating thought",
      "Use textual clues and relevant prior knowledge to infer a writer’s intention"
    ],
    "prerequisites": [
      "JSS1 main/supporting ideas",
      "author mood and attitude",
      "context clues"
    ],
    "teaching": [
      "A writer’s purpose is the result the writer wants the text to achieve. Topic tells what a text is about; purpose tells why the writer presents it.",
      "Purpose is inferred from evidence: choice of verbs, repeated appeals, facts, warnings, emotional language, examples and the action the reader is encouraged to take.",
      "Informative writing usually explains or reports; persuasive writing presents reasons to influence belief or action; entertaining writing mainly creates interest or enjoyment, though one text can have more than one purpose.",
      "Prior knowledge may help interpretation, but the final claim must be anchored in the passage. AVORA uses purpose → clue → explanation, not unsupported guessing.",
      "When a passage mixes purposes, identify the dominant one and explain how secondary purposes support it."
    ],
    "workedExamples": [
      "“Vaccination protects communities; visit the clinic this week.” The health facts inform, but the call to visit the clinic shows a persuasive purpose.",
      "An article listing causes, symptoms and prevention of heat exhaustion without asking the reader to act is primarily informative."
    ],
    "misconceptions": [
      "confusing topic with purpose",
      "choosing “to inform” for every factual passage",
      "inferring intention from one isolated word",
      "using prior knowledge instead of passage evidence"
    ],
    "guidedPractice": [
      "Classify six short texts by dominant purpose and underline two clues for each."
    ],
    "independentPractice": [
      "Analyse three longer passages with mixed purposes and justify the dominant purpose in two evidence-based sentences."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-reading-2",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading to identify the meanings of words in various contexts",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 26
    },
    "objectives": [
      "Use surrounding words and sentences as context clues to infer a target word’s meaning",
      "Suggest alternative words that can fit the same context without changing the intended sense"
    ],
    "prerequisites": [
      "dictionary skills",
      "synonyms and antonyms",
      "literal sentence meaning"
    ],
    "teaching": [
      "Words can change meaning with context. Do not choose the first dictionary meaning you remember; test the word against the whole sentence and paragraph.",
      "Useful clues include definitions, examples, contrasts, causes, consequences, synonyms, antonyms and the general situation described around the target word.",
      "Replace the target word with a possible synonym and reread the sentence. If grammar and meaning remain sensible, the substitution may be valid.",
      "Context can also indicate part of speech. A word after “to” may function as a verb; a word naming a quality before a noun may function as an adjective.",
      "AVORA teaches infer → substitute → verify: infer from clues, substitute a candidate meaning, then verify against the wider passage."
    ],
    "workedExamples": [
      "“The path was treacherous; loose stones made every step dangerous.” Treacherous means dangerous because the following clause explains the risk.",
      "“The coach commended Tayo for his honesty.” Praised can replace commended; condemned cannot because it reverses the context."
    ],
    "misconceptions": [
      "choosing a meaning from sound similarity",
      "ignoring the paragraph beyond the target sentence",
      "substituting a synonym that breaks grammar",
      "assuming one word has only one meaning"
    ],
    "guidedPractice": [
      "Infer ten underlined words from short passages and explain the exact clue used."
    ],
    "independentPractice": [
      "Complete two unfamiliar passages, infer eight target words and propose one valid substitute for each."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-reading-3",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Critical reading",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 27
    },
    "objectives": [
      "Read a passage critically rather than accepting every claim automatically",
      "Distinguish verifiable facts from opinions or judgements",
      "Evaluate claims using evidence, logic and internal consistency"
    ],
    "prerequisites": [
      "main ideas",
      "author purpose",
      "fact and opinion basics"
    ],
    "teaching": [
      "Critical reading asks not only “What does this say?” but also “How well is this supported?” A critical reader identifies claims, reasons, evidence and assumptions.",
      "A fact is a claim that can in principle be checked against evidence. An opinion expresses judgement, preference or interpretation; opinions may still be well or poorly supported.",
      "Watch for absolute language such as always, never, everyone and best. Strong claims require strong evidence.",
      "Separate evidence from examples. One example may illustrate a point but may not prove that the point is generally true.",
      "A fair evaluation states what is supported, what is uncertain and what further evidence would be needed."
    ],
    "workedExamples": [
      "“School gardens can improve practical science learning because pupils observe plant growth directly.” This is a claim supported by a reason; a reader can ask what evidence shows improved learning.",
      "“This is the greatest school in Nigeria” is an opinion unless a clear measurable criterion and evidence are supplied."
    ],
    "misconceptions": [
      "calling every statement an opinion",
      "rejecting a claim only because you dislike it",
      "treating one example as universal proof",
      "ignoring missing evidence"
    ],
    "guidedPractice": [
      "Mark claims in a passage as fact, opinion or unsupported generalisation and explain why."
    ],
    "independentPractice": [
      "Evaluate two short articles, identify their strongest and weakest claims, and write a brief evidence-based judgement."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-reading-4",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading for speed",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 28
    },
    "objectives": [
      "Read at an appropriate speed for purpose and text difficulty",
      "Use surveying, skimming and scanning effectively",
      "Maintain comprehension while reducing unnecessary regressions and word-by-word reading"
    ],
    "prerequisites": [
      "fluent sentence reading",
      "main idea recognition"
    ],
    "teaching": [
      "Reading speed is useful only when comprehension remains adequate. The goal is flexible speed: slow down for difficult ideas and move faster through familiar or less important material.",
      "Surveying gives a quick overview from titles, headings and layout. Skimming seeks general meaning; scanning searches for a specific name, date, figure or fact.",
      "Phrase reading groups meaningful words instead of processing every word separately. This increases eye span and supports fluency.",
      "Repeatedly going backward without reason slows reading. Regress only when meaning genuinely breaks down.",
      "Measure both time and comprehension. A faster time with poor answers is not progress."
    ],
    "workedExamples": [
      "To find the departure time on a timetable, scan for the destination and time rather than read every entry.",
      "To preview a newspaper article before deciding whether to study it closely, skim the headline, first paragraph and topic sentences."
    ],
    "misconceptions": [
      "equating speed with rushing",
      "subvocalisation treated as a moral failure rather than a fluency habit",
      "scanning when full understanding is required",
      "ignoring comprehension scores"
    ],
    "guidedPractice": [
      "Time a 300-word passage, answer five questions, then repeat with phrase-reading and compare speed plus accuracy."
    ],
    "independentPractice": [
      "Complete three tasks requiring survey, skim and scan; record which technique was appropriate and why."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-reading-5",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading for summary",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 29
    },
    "objectives": [
      "Identify topic sentences and key ideas in paragraphs",
      "Recognise words or expressions that redirect attention to a main point",
      "Restate key ideas concisely in the learner’s own words"
    ],
    "prerequisites": [
      "main/supporting ideas",
      "paragraph structure",
      "paraphrasing"
    ],
    "teaching": [
      "Summary reading removes repetition, examples and minor details while preserving the writer’s essential meaning.",
      "First identify each paragraph’s topic sentence or implied key idea. Then combine related ideas across paragraphs.",
      "Signal words such as however, therefore, most importantly, in contrast and in conclusion may redirect attention to a central point or relationship.",
      "A summary should normally be shorter and reworded. Copying whole sentences may show selection but not genuine summarising skill.",
      "Check coverage and distortion: every major idea should appear, and no new opinion should be introduced."
    ],
    "workedExamples": [
      "Paragraphs on unemployment give causes, effects and solutions. A strong summary keeps those three ideas and removes repeated examples.",
      "“Many students walk, some cycle, and a few use buses; therefore transport planning must consider several modes.” The summary preserves the transport diversity and planning implication."
    ],
    "misconceptions": [
      "copying topic sentences word-for-word",
      "including every example",
      "adding personal opinion",
      "omitting a major paragraph idea"
    ],
    "guidedPractice": [
      "Reduce a five-paragraph passage to five key points, then to a coherent 80-word summary."
    ],
    "independentPractice": [
      "Summarise two passages independently and self-check against a checklist for coverage, brevity, own words and accuracy."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-writing-1",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Writing an outline",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 30
    },
    "objectives": [
      "Read through a topic and identify relevant main/supporting ideas",
      "Arrange ideas in a logical sequence",
      "Plan an appropriate introduction and effective conclusion"
    ],
    "prerequisites": [
      "main/supporting ideas",
      "paragraphing",
      "basic composition"
    ],
    "teaching": [
      "An outline is the plan behind a composition. It prevents random ideas and helps each paragraph perform a clear function.",
      "Begin by interpreting the topic: identify the subject, purpose, audience and any command such as explain, argue or describe.",
      "Brainstorm freely, then group related ideas. Promote broad ideas to main points and place examples or explanations under them as supporting points.",
      "Choose a logical order: chronological, cause–effect, problem–solution, general-to-specific or strongest-to-weakest depending on purpose.",
      "The introduction should orient the reader; the conclusion should close the argument or explanation without merely repeating the first sentence."
    ],
    "workedExamples": [
      "Topic: “Effects of indiscriminate waste disposal.” Outline: introduction → blocked drainage → disease risk → environmental damage → solutions → conclusion.",
      "For “A memorable journey,” chronological order is usually clearer than grouping by abstract categories."
    ],
    "misconceptions": [
      "writing paragraphs before planning",
      "listing unrelated points",
      "using examples as main headings",
      "introducing a new major argument in the conclusion"
    ],
    "guidedPractice": [
      "Build an outline from a supplied passage, then reconstruct the likely paragraph order."
    ],
    "independentPractice": [
      "Create full outlines for three unseen topics, each with introduction, at least three main points, supports and conclusion."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-writing-2",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Composition writing: expository and argumentative",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 31
    },
    "objectives": [
      "Distinguish expository from argumentative writing",
      "Identify the essential elements of both forms",
      "Write coherent expository and argumentative essays with evidence and logical organisation"
    ],
    "prerequisites": [
      "outline writing",
      "paragraphing",
      "main/supporting ideas"
    ],
    "teaching": [
      "Expository writing explains a subject clearly. It may define, describe a process, compare, classify or explain causes and effects without requiring the reader to adopt a position.",
      "Argumentative writing takes a defensible position and supports it with reasons and evidence while acknowledging relevant opposing views.",
      "Both need a focused introduction, logically ordered body paragraphs, transitions and a conclusion. The difference lies mainly in purpose and treatment of claims.",
      "Each body paragraph should contain one controlling idea, explanation and relevant evidence/example. Avoid paragraph-long lists without reasoning.",
      "In argument, distinguish evidence from assertion. A counterargument can be presented fairly and then answered rather than mocked."
    ],
    "workedExamples": [
      "Expository prompt: “Explain how flooding affects a community.” Organise by causes/effects/solutions without taking a side.",
      "Argumentative prompt: “School uniforms should be compulsory.” State a position, support it, address a counterpoint and conclude."
    ],
    "misconceptions": [
      "turning exposition into a personal rant",
      "arguing without evidence",
      "mixing unrelated ideas in one paragraph",
      "using insults instead of rebuttal"
    ],
    "guidedPractice": [
      "Write one body paragraph for each form from supplied outlines and peer-check topic sentence, explanation and evidence."
    ],
    "independentPractice": [
      "Write one 350-word expository and one 350-word argumentative essay, revise with a structure/evidence checklist."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-writing-3",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Letter writing: informal and formal",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 32
    },
    "objectives": [
      "Distinguish formal and informal letters by purpose, audience, layout and language",
      "Select the correct format for a given situation",
      "Write appropriate letters for different real-life purposes"
    ],
    "prerequisites": [
      "JSS1 letter basics",
      "sentence punctuation",
      "audience awareness"
    ],
    "teaching": [
      "Informal letters are written to people with whom the writer has a personal relationship; formal letters address institutions, officials or people in an official capacity.",
      "Register matters: an informal letter may sound warm and conversational, while a formal letter should be respectful, direct and precise.",
      "Formal letters require clear subject/purpose, appropriate salutation, organised paragraphs and a suitable closing. Avoid slang, emojis and unnecessary storytelling.",
      "Informal letters still need coherence: opening, main message, relevant detail and closing rather than a stream of unrelated remarks.",
      "Before writing, identify sender, receiver, relationship and purpose; those four decisions determine format and tone."
    ],
    "workedExamples": [
      "Formal: write to a local council requesting repair of a damaged road; state the problem, effects, evidence and requested action.",
      "Informal: write to a cousin describing a new school experience; use personal but organised language."
    ],
    "misconceptions": [
      "using “Dear Sir” with slang",
      "turning an informal letter into an essay with no personal connection",
      "omitting the purpose until the last paragraph",
      "mixing formal and informal closings"
    ],
    "guidedPractice": [
      "Correct the format/register errors in two model letters and rewrite one paragraph appropriately."
    ],
    "independentPractice": [
      "Write one formal request/complaint letter and one informal personal letter from unseen prompts."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-writing-4",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Summary writing (passage on consumer and social influence)",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 33
    },
    "objectives": [
      "Identify topic sentences and key ideas in a passage",
      "Separate major points from illustrations and repetition",
      "Write an accurate concise summary in the learner’s own words"
    ],
    "prerequisites": [
      "reading for summary",
      "paraphrasing",
      "sentence construction"
    ],
    "teaching": [
      "Summary writing converts selected key ideas into a concise new text. It is not note-copying and not personal commentary.",
      "Read once for overall meaning, then identify the question focus. A summary about “factors influencing buying decisions” should exclude unrelated details even if interesting.",
      "Underline one core idea per relevant paragraph, combine overlapping ideas, then paraphrase without changing meaning.",
      "Use complete grammatical sentences unless the task explicitly requests notes. Remove examples, quotations, repetition and decorative wording.",
      "Final editing checks number of required points, word economy, grammar and whether any new claim has been added."
    ],
    "workedExamples": [
      "Original details about price, peer pressure and advertising can become: “Buying decisions are influenced by cost, social pressure and promotion.”",
      "Three examples of brand advertising should normally become one broader point about advertising rather than three summary points."
    ],
    "misconceptions": [
      "copying long clauses from the passage",
      "summarising everything instead of the question focus",
      "counting examples as separate main points",
      "adding advice not in the passage"
    ],
    "guidedPractice": [
      "Extract five main points from a consumer-awareness passage and paraphrase each in one sentence."
    ],
    "independentPractice": [
      "Write two passage summaries under a word/point limit and verify every sentence against the source."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-listening-and-speaking-1",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Revision of sounds: Vowels and Consonants",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 37
    },
    "objectives": [
      "Identify English vowel and consonant sounds",
      "Produce vowel and consonant sounds accurately in isolation and context",
      "Articulate common consonant clusters clearly"
    ],
    "prerequisites": [
      "basic phonics",
      "JSS1 oral English"
    ],
    "teaching": [
      "English sound work is about speech sounds, not simply alphabet letters. One letter can represent different sounds and some sounds use more than one letter.",
      "Vowels are produced with relatively open airflow; consonants involve some narrowing or closure. Learners should hear and produce contrasts, not memorise labels only.",
      "Minimal pairs help perception: ship/sheep, full/fool, fan/van. Listen first, then imitate, then use the sound in words and sentences.",
      "Consonant clusters such as /str/, /pl/ or /kst/ require keeping each component audible without inserting extra vowels.",
      "AVORA uses hear → discriminate → produce → use in context, with replay and learner repetition points."
    ],
    "workedExamples": [
      "“ship” and “sheep” differ mainly in vowel quality; meaning changes with the sound.",
      "“street” begins with a cluster; pronouncing “sətreet” inserts an unnecessary vowel."
    ],
    "misconceptions": [
      "confusing letters with sounds",
      "adding vowels inside clusters",
      "assuming spelling always predicts pronunciation",
      "practising isolated sounds without context"
    ],
    "guidedPractice": [
      "Listen-and-choose minimal pairs, then record/produce ten vowel and ten consonant targets in words."
    ],
    "independentPractice": [
      "Read a short passage aloud and complete a sound-identification grid for selected words and clusters."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-listening-and-speaking-2",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Oral Comprehension",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 34
    },
    "objectives": [
      "Identify and explain main ideas in spoken material",
      "Accept, reject or qualify ideas using evidence and prior knowledge",
      "Identify speaker mood/intention and plausible interpretations"
    ],
    "prerequisites": [
      "active listening",
      "main ideas",
      "author mood/purpose"
    ],
    "teaching": [
      "Oral comprehension requires building meaning while listening. The learner cannot rely on repeatedly rereading, so attention and purposeful note-taking matter.",
      "Listen for signposts: first, however, because, therefore, finally and repeated key words often reveal structure and emphasis.",
      "Separate what the speaker explicitly states from what you infer. Inference should combine spoken clues with reasonable background knowledge.",
      "Evaluate ideas after understanding them. Agreement or disagreement should be based on reasons, not immediate reaction.",
      "Tone, pace, emphasis and word choice can reveal mood or intention; interpretation must cite the audible evidence."
    ],
    "workedExamples": [
      "A speaker says, “We have postponed the trip because the bridge is flooded.” Main idea: the trip is postponed; reason: flooding.",
      "A slow, solemn delivery with words such as “loss” and “regret” supports a serious/sad mood inference."
    ],
    "misconceptions": [
      "taking notes so heavily that listening stops",
      "confusing inference with imagination",
      "judging before understanding",
      "remembering examples but missing the main idea"
    ],
    "guidedPractice": [
      "Listen to a two-minute passage once, record five key points, then answer factual, inferential and attitude questions."
    ],
    "independentPractice": [
      "Complete two unseen audio-style scripts read aloud once/twice and produce a structured listening summary."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-listening-and-speaking-3",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Speeches (Intonation, stress and Rhythms)",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 35
    },
    "objectives": [
      "Recognise and produce appropriate sentence stress",
      "Use rising/falling intonation to signal meaning",
      "Maintain understandable English rhythm in connected speech"
    ],
    "prerequisites": [
      "word stress",
      "syllables",
      "basic sentence types"
    ],
    "teaching": [
      "Stress makes one syllable or word more prominent. In sentences, content words often carry stronger stress while many grammatical words are weaker.",
      "Intonation is the movement of pitch across an utterance. Falling intonation commonly signals completion or certainty; rising patterns may signal yes/no questions, incompleteness or checking, depending on context.",
      "Changing stress can change implied meaning: “I wanted the BLUE pen” contrasts blue with another colour; “I WANTED the blue pen” contrasts desire with another action.",
      "English rhythm depends on grouping speech into meaningful chunks rather than giving every syllable equal force.",
      "AVORA’s board marks stressed words, pitch arrows and pause boundaries so learners can see and hear the pattern."
    ],
    "workedExamples": [
      "“Are you ready?” normally uses a rising pattern in neutral yes/no questioning.",
      "“She bought a NEW bag” stresses new when newness is the contrast."
    ],
    "misconceptions": [
      "shouting instead of stressing",
      "using one flat pitch for every sentence",
      "stressing every word equally",
      "thinking intonation has only one fixed rule"
    ],
    "guidedPractice": [
      "Mark stress and pitch on eight sentences, then read them to express different meanings."
    ],
    "independentPractice": [
      "Deliver a one-minute speech with planned stress, rhythm and intonation; self-evaluate clarity and meaning."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-listening-and-speaking-4",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Speeches: Question tags",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 36
    },
    "objectives": [
      "Form grammatically correct question tags",
      "Choose positive/negative polarity appropriately",
      "Use intonation to distinguish genuine questions from confirmation-seeking tags"
    ],
    "prerequisites": [
      "auxiliary verbs",
      "pronouns",
      "positive/negative statements"
    ],
    "teaching": [
      "A question tag is a short question attached to a statement, usually using the statement’s auxiliary verb and a pronoun subject.",
      "A positive statement normally takes a negative tag: “She is ready, isn’t she?” A negative statement normally takes a positive tag: “They didn’t leave, did they?”",
      "If there is no auxiliary in a simple present/past statement, use do/does/did: “Tunde plays, doesn’t he?”",
      "The tag pronoun must match the subject, and tense/modal must remain consistent.",
      "Rising intonation can indicate real uncertainty; falling intonation often asks for confirmation of something the speaker expects to be true."
    ],
    "workedExamples": [
      "“You can swim, can’t you?” keeps modal can.",
      "“Ada visited yesterday, didn’t she?” uses did because the statement has a simple-past lexical verb."
    ],
    "misconceptions": [
      "copying the same polarity into the tag",
      "using a noun instead of pronoun in the tag",
      "changing tense",
      "forgetting do-support"
    ],
    "guidedPractice": [
      "Complete and read 15 question tags, explaining the auxiliary and polarity choice."
    ],
    "independentPractice": [
      "Create ten original tagged statements and perform five with rising and five with falling intonation."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-grammatical-accuracy-1",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Parts of speech: Nouns, Pronouns, verbs and Adjectives",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 38
    },
    "objectives": [
      "Identify nouns, pronouns, verbs and adjectives in context",
      "State their grammatical functions",
      "Use each category accurately in original sentences"
    ],
    "prerequisites": [
      "basic sentence parts",
      "JSS1 parts of speech"
    ],
    "teaching": [
      "Parts of speech are best identified by function in a sentence, not by memorised word lists. The same word may behave differently in different contexts.",
      "Nouns typically name entities/ideas and may function as subject, object or complement. Pronouns substitute for noun phrases and must agree appropriately with their references.",
      "Verbs express actions, events or states and carry tense/aspect information. Adjectives modify nouns or occur after linking verbs as complements.",
      "Use position plus meaning and grammatical behaviour to classify a word. “Fast” is adjective in “a fast car” but adverb in “drive fast.”",
      "Accurate writing requires agreement and suitable forms, not merely labelling categories."
    ],
    "workedExamples": [
      "“Those diligent students completed it.” students=noun, those=determiner, diligent=adjective, completed=verb, it=pronoun.",
      "“Light” is noun in “Turn on the light” and adjective in “a light bag.”"
    ],
    "misconceptions": [
      "classifying only from dictionary labels",
      "calling every -ly word an adverb",
      "confusing pronouns and nouns",
      "ignoring function in context"
    ],
    "guidedPractice": [
      "Label target words in ten sentences and justify each by its function."
    ],
    "independentPractice": [
      "Analyse a paragraph, classify 20 target words, then write four sentences deliberately using each category."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-grammatical-accuracy-2",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Parts of speech: Adverbs, Conjunctions and Prepositions",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 39
    },
    "objectives": [
      "Identify adverbs, conjunctions and prepositions",
      "Explain their functions in sentences",
      "Use them accurately to create relationships of manner, time, place, reason and connection"
    ],
    "prerequisites": [
      "verbs/adjectives",
      "phrases and clauses"
    ],
    "teaching": [
      "Adverbs modify verbs, adjectives, other adverbs or whole clauses; they can express manner, time, place, frequency, degree and viewpoint.",
      "Conjunctions join words, phrases or clauses. Coordinating conjunctions link equal units; subordinating conjunctions introduce dependent clauses.",
      "Prepositions introduce phrases that show relationships such as time, place, direction, means or possession.",
      "Meaning changes with choice: “at the gate,” “through the gate” and “towards the gate” describe different spatial relationships.",
      "Avoid identifying by spelling alone. Function within the sentence is decisive."
    ],
    "workedExamples": [
      "“She spoke very softly because the baby slept in the room.” very/softly are adverbs, because is a conjunction, in is a preposition.",
      "“After lunch” begins with a preposition; “after we ate” uses after as a subordinating conjunction because a clause follows."
    ],
    "misconceptions": [
      "assuming every -ly word is an adverb",
      "confusing preposition with conjunction",
      "using double conjunctions unnecessarily",
      "choosing prepositions by direct translation from another language"
    ],
    "guidedPractice": [
      "Sort 24 examples by category and explain ambiguous words in context."
    ],
    "independentPractice": [
      "Edit a paragraph containing ten errors in adverbs/conjunctions/prepositions and explain each correction."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-grammatical-accuracy-3",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Adverbials and Tenses",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 40
    },
    "objectives": [
      "Identify adverbials and the information they add",
      "Recognise and use major tense forms appropriately",
      "Construct sentences combining accurate tense with adverbial information"
    ],
    "prerequisites": [
      "verbs",
      "adverbs",
      "time expressions"
    ],
    "teaching": [
      "An adverbial may be a single adverb, phrase or clause that adds information such as when, where, how, why, how often or under what condition.",
      "Tense locates a situation in time, while aspect shows how the speaker views its internal timing, such as ongoing or completed relative to another point.",
      "Time adverbials and tense must cooperate: “yesterday” normally supports past reference; “since 2024” often requires a form connecting past and present.",
      "Maintain tense consistency unless the time frame genuinely changes. Narratives can shift tense, but the shift should have a reason.",
      "Move adverbials carefully: some positions alter emphasis or naturalness even when grammar remains possible."
    ],
    "workedExamples": [
      "“She has lived here since 2024” combines present perfect with a duration extending to now.",
      "“When the bell rang, we were writing” uses simple past for the interrupting event and past progressive for the ongoing action."
    ],
    "misconceptions": [
      "matching tense by one time word only",
      "switching tense randomly",
      "calling every prepositional phrase an adverbial regardless of function",
      "using present perfect with a finished past time such as “yesterday”"
    ],
    "guidedPractice": [
      "Complete a timeline-based tense exercise and identify the adverbial function in each sentence."
    ],
    "independentPractice": [
      "Write a 200-word narrative with controlled tense choices and at least eight varied adverbials."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-grammatical-accuracy-4",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Active and Passive verbs",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 41
    },
    "objectives": [
      "Identify active and passive constructions",
      "Transform suitable active sentences to passive and vice versa",
      "Choose voice according to focus and context"
    ],
    "prerequisites": [
      "subject/object",
      "auxiliary be",
      "past participles"
    ],
    "teaching": [
      "In active voice, the grammatical subject typically performs the action: “The committee approved the plan.” In passive voice, the receiver becomes subject: “The plan was approved by the committee.”",
      "The passive is formed with an appropriate form of be plus a past participle; tense is carried by be: is written, was written, has been written.",
      "Only verbs that can take an object normally form straightforward passives. “He arrived” cannot naturally become “Was arrived by him.”",
      "Use passive voice when the receiver/result is the focus or the agent is unknown/unimportant; use active when the agent/action should be direct.",
      "Transformation must preserve meaning, tense and participants rather than merely move words."
    ],
    "workedExamples": [
      "Active: “The storm damaged the roof.” Passive: “The roof was damaged by the storm.”",
      "Active: “Someone has stolen the phone.” Passive: “The phone has been stolen.” The unknown agent can be omitted."
    ],
    "misconceptions": [
      "forgetting the past participle",
      "changing tense during transformation",
      "forcing intransitive verbs into passive",
      "assuming passive is always better or worse"
    ],
    "guidedPractice": [
      "Transform 12 sentences both ways and explain whether the agent should be included."
    ],
    "independentPractice": [
      "Edit a short report choosing active/passive voice deliberately for clarity and focus."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-grammatical-accuracy-5",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Direct and indirect speech",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 42
    },
    "objectives": [
      "Recognise direct and reported speech",
      "Report statements, commands and requests accurately",
      "Adjust pronouns, time/place expressions and tense where context requires"
    ],
    "prerequisites": [
      "quotation punctuation",
      "pronouns",
      "verb tense"
    ],
    "teaching": [
      "Direct speech presents a speaker’s exact words with quotation conventions. Indirect speech reports the message without necessarily preserving exact wording.",
      "Reporting may require pronoun and reference changes: “I am tired,” Ada said → Ada said that she was tired, when reported from a later viewpoint.",
      "Backshift of tense is common after past reporting verbs but is not mechanical when the statement remains universally true or the reporting time/context differs.",
      "Commands and requests are often reported with to-infinitives: “Please sit down,” he said → He asked me to sit down.",
      "Time/place words may shift: today→that day, here→there, tomorrow→the next day, depending on viewpoint."
    ],
    "workedExamples": [
      "Direct: Musa said, “I will return tomorrow.” Reported later: Musa said that he would return the next day.",
      "Direct: “Do not touch it,” the teacher said. Indirect: The teacher warned the pupils not to touch it."
    ],
    "misconceptions": [
      "changing every tense even when context does not require it",
      "forgetting pronoun reference",
      "keeping quotation marks in indirect speech",
      "reporting commands as ordinary statements"
    ],
    "guidedPractice": [
      "Convert 15 statements/questions/commands with explicit discussion of each required change."
    ],
    "independentPractice": [
      "Write a short dialogue, then report the conversation accurately in a narrative paragraph."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-literature-1",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Prose: short stories and novelettes",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 43
    },
    "objectives": [
      "Read and understand short stories and novelettes",
      "Identify and distinguish prose types",
      "Analyse plot, characterisation, setting, theme, style and language",
      "Respond to questions and create a coherent short narrative"
    ],
    "prerequisites": [
      "JSS1 prose basics",
      "main idea",
      "character and setting"
    ],
    "teaching": [
      "Prose fiction presents narrative through sentences and paragraphs rather than verse lines. Short stories are highly compressed; novelettes allow more development while remaining shorter than full novels.",
      "Plot is the organised sequence of events and conflict; setting establishes time/place/social context; characterisation is how characters are revealed through actions, speech, thoughts and description.",
      "Theme is a central idea explored by the text, not merely a one-word topic. “Honesty” is a topic; “honesty can preserve trust even when truth is costly” is a theme statement.",
      "Style and language include narrative viewpoint, diction, imagery, dialogue and sentence pattern. These choices affect meaning and reader response.",
      "Evidence-based literary answers identify a feature, cite or paraphrase a relevant event/detail, then explain its significance."
    ],
    "workedExamples": [
      "A story about two friends disagreeing over found money may explore honesty through conflict, choices and consequences.",
      "A first-person narrator limits the reader to what “I” knows, which can shape suspense and reliability."
    ],
    "misconceptions": [
      "retelling plot instead of analysing theme",
      "calling setting only the physical place",
      "describing a character with no evidence",
      "treating moral and theme as identical in every story"
    ],
    "guidedPractice": [
      "Map plot stages and character evidence from a short story, then write one theme statement."
    ],
    "independentPractice": [
      "Read an unfamiliar short story and answer analysis questions on type, plot, character, setting, theme and style."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-literature-2",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Nigerian and African folktales",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 44
    },
    "objectives": [
      "Identify features of Nigerian and African folktales",
      "Retell and explain folktales accurately",
      "Identify themes, moral lessons and cultural values",
      "Narrate a folktale and interpret embedded riddles where present"
    ],
    "prerequisites": [
      "folktale basics",
      "oral storytelling"
    ],
    "teaching": [
      "Folktales are traditional narratives transmitted across generations, often orally, and may explain behaviour, entertain, teach values or preserve cultural memory.",
      "Common features can include formulaic openings/closings, repetition, songs, animal characters, tricksters, communal settings and clear consequences, but not every tale contains every feature.",
      "Interpret cultural values carefully. A tale can reflect a community’s historical worldview without every element being a universal rule today.",
      "Moral lessons should arise from actions and consequences in the tale rather than being imposed from outside.",
      "Retelling preserves the central sequence and meaning while allowing the learner’s own wording and expressive narration."
    ],
    "workedExamples": [
      "A tortoise trickster tale may use repeated deception and consequences to explore greed or cleverness; the lesson depends on the actual ending.",
      "A riddle within a folktale can test wit and may move the plot forward rather than serve as decoration."
    ],
    "misconceptions": [
      "assuming all African folktales are the same",
      "forcing one moral onto every tale",
      "retelling without sequence",
      "treating supernatural features as factual claims"
    ],
    "guidedPractice": [
      "Retell a supplied folktale in six stages, identify three features and justify one moral lesson."
    ],
    "independentPractice": [
      "Compare two folktales from different communities, noting shared features, differences and values without stereotyping."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-literature-3",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Popular myths/legends",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 45
    },
    "objectives": [
      "Identify features of myths and legends",
      "Retell and explain their themes",
      "Identify lessons or cultural meanings",
      "Distinguish myth/legend from other narrative forms"
    ],
    "prerequisites": [
      "folktales",
      "prose narrative"
    ],
    "teaching": [
      "Myths are traditional narratives often connected with origins, deities, supernatural forces or explanations of the world; legends are traditional stories linked more closely to remembered people, places or events, often with exaggeration.",
      "The categories can overlap in oral traditions, so classification should use features and function rather than rigid labels.",
      "Analyse who or what the story explains, the cultural values it reflects, and how supernatural or heroic elements operate in the narrative.",
      "Retelling requires chronological coherence and preservation of central events; analysis then moves beyond retelling to meaning.",
      "Treat myths/legends respectfully as cultural literature while distinguishing literary study from claims about historical proof."
    ],
    "workedExamples": [
      "An origin story explaining why a natural feature exists functions mythically; a story centred on a famous historical warrior enlarged by tradition is more legendary.",
      "A legend may communicate courage or communal identity even when some episodes are impossible to verify historically."
    ],
    "misconceptions": [
      "using “myth” to mean simply “false” in literary analysis",
      "calling every old story a legend",
      "retelling without explaining theme",
      "confusing cultural respect with historical verification"
    ],
    "guidedPractice": [
      "Classify four traditional narratives by features and defend each choice."
    ],
    "independentPractice": [
      "Analyse one myth and one legend for features, theme, cultural function and narrative structure."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-literature-4",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Poetry (written)",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 46
    },
    "objectives": [
      "Read selected poems with appropriate rhythm",
      "Explain the meaning/content of poems",
      "Identify features and language of poetry",
      "Write simple poems"
    ],
    "prerequisites": [
      "JSS1 poetry",
      "figurative language",
      "rhythm"
    ],
    "teaching": [
      "Poetry compresses meaning through line arrangement, sound, imagery, rhythm, figurative language and deliberate word choice. Not every poem rhymes.",
      "Begin with literal situation: who speaks, what happens, where and to whom. Then examine images, tone and figurative choices to infer deeper meaning.",
      "Narrative poems tell events; ballads often tell stories with strong rhythm/repetition. Other poems may be lyrical, descriptive or reflective.",
      "Rhythm comes from patterns of stress, pause and repetition. Reading aloud helps reveal emphasis and emotional movement.",
      "Writing a simple poem should focus on one clear image/experience and revise for precise language rather than forcing rhyme at the expense of meaning."
    ],
    "workedExamples": [
      "A poem repeating “again, again” may use repetition to convey persistence or frustration depending on context.",
      "A narrative poem about a journey should still be analysed for speaker, events, imagery and theme, not only retold."
    ],
    "misconceptions": [
      "assuming poetry must rhyme",
      "paraphrasing every line without interpreting effect",
      "calling the poet and speaker automatically the same person",
      "adding decorative words with no purpose"
    ],
    "guidedPractice": [
      "Read a short poem aloud, annotate speaker/images/repetition/theme, then rewrite one stanza in prose to test understanding."
    ],
    "independentPractice": [
      "Analyse two unseen poems and write one original 12–20 line poem with deliberate imagery and rhythm."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-literature-5",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Drama: kinds and features",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 47
    },
    "objectives": [
      "Read and dramatise a play",
      "Identify major kinds and features of drama",
      "Explain plot, character, dialogue, stage direction, conflict, setting and theme",
      "Participate in performance and interpretation"
    ],
    "prerequisites": [
      "JSS1 drama",
      "dialogue",
      "prose analysis"
    ],
    "teaching": [
      "Drama is written primarily for performance. Meaning comes from spoken dialogue, action, stage directions, movement, setting and interaction between characters.",
      "Key features include cast/characters, acts/scenes where applicable, dialogue, stage directions, conflict, plot and performance space.",
      "Common kinds include comedy and tragedy, while many plays combine serious and humorous elements. Classification should follow dominant features.",
      "Stage directions are not dialogue; they guide movement, tone, setting or action and can change how a line is understood.",
      "Drama analysis should connect conflict and character choices to theme, then test interpretation through performance."
    ],
    "workedExamples": [
      "The direction “[hesitates before answering]” may suggest fear, uncertainty or concealment and changes how the spoken line is interpreted.",
      "A comic scene can still address a serious theme such as dishonesty; genre and theme are different concepts."
    ],
    "misconceptions": [
      "reading stage directions aloud as character speech",
      "calling every sad event tragedy",
      "summarising plot without analysing conflict",
      "ignoring performance choices"
    ],
    "guidedPractice": [
      "Read a short scene, label dramatic features, then perform it twice with different stage-direction choices and compare meaning."
    ],
    "independentPractice": [
      "Analyse an unseen scene and prepare a short group performance with justified acting/staging decisions."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss2-english-literature-6",
    "classLevel": "JSS2",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "More on figures of speech: irony and Hyperbole",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 48
    },
    "objectives": [
      "Explain irony and hyperbole",
      "Identify both figures in sentences and literary passages",
      "Construct meaningful original examples and explain their effects"
    ],
    "prerequisites": [
      "simile/metaphor",
      "literal/figurative meaning",
      "tone"
    ],
    "teaching": [
      "Hyperbole is deliberate exaggeration for emphasis or effect, not a statement intended to be taken literally.",
      "Irony involves a contrast between literal wording/expectation and intended or actual meaning. At this level, verbal/situational contrasts are most useful to recognise.",
      "Context is essential. “I’ve told you a million times” is hyperbole because the extreme number intensifies frustration; it is not a factual count.",
      "Irony should not be reduced to “the opposite” mechanically; identify the expectation or literal surface and the contrasting intended/actual meaning.",
      "When creating examples, the figure should serve an effect—humour, criticism, emphasis, surprise—not merely sound unusual."
    ],
    "workedExamples": [
      "Hyperbole: “The bag weighs a ton.” Effect: emphasises heaviness.",
      "Irony: after a power outage interrupts a technology presentation, a speaker says, “Perfect timing.” The literal praise contrasts with frustration."
    ],
    "misconceptions": [
      "calling every exaggeration a lie",
      "using “irony” for any coincidence",
      "missing context that signals non-literal meaning",
      "creating hyperbole so extreme that intended meaning becomes unclear"
    ],
    "guidedPractice": [
      "Identify and explain ten examples, stating the literal surface and intended effect."
    ],
    "independentPractice": [
      "Write six original examples of each figure and analyse two examples from a short literary passage."
    ],
    "mastery": {
      "criterion": "At least 80% overall, with accurate application on an unfamiliar task and correction of any major misconception before progression.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
];

export function getJss2EnglishDeepLesson(topicId:string){return jss2EnglishDeepLessons.find(x=>x.topicId===topicId)}
