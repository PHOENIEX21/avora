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
      "JSS1 main and supporting ideas",
      "author mood and attitude",
      "context clues",
      "basic distinction between fact and opinion"
    ],
    "teaching": [
      "START WITH TOPIC VERSUS PURPOSE. The topic answers “What is this text about?” The writer’s purpose answers “What does the writer want this text to achieve?” A passage about malaria may be written to inform, warn, persuade readers to use mosquito nets, criticise poor sanitation, or combine several purposes.",
      "PURPOSE IS INFERRED FROM EVIDENCE. Do not guess from the topic alone. Look at the writer’s verbs, facts, examples, warnings, questions, commands, emotional words, repeated ideas, tone and any action the reader is encouraged to take.",
      "TO INFORM OR EXPLAIN. Informative writing mainly gives facts, descriptions, causes, effects, processes or explanations so that the reader understands something better. It often uses factual language, definitions, examples, statistics or sequence.",
      "TO PERSUADE. Persuasive writing tries to influence belief, opinion or action. Look for recommendations, commands, reasons, benefits, consequences, direct address and calls such as “should”, “must”, “support”, “choose” or “act now”.",
      "TO WARN OR CAUTION. A warning draws attention to danger, risk or harmful consequences. Signal language may include “danger”, “avoid”, “do not”, “risk”, “unsafe”, “may lead to” or descriptions of serious consequences.",
      "TO ENTERTAIN. Entertaining writing mainly seeks to interest, amuse, move or engage the reader through story, humour, suspense, vivid description, character or imaginative situations. Entertainment may still contain a lesson or information.",
      "TO CRITICISE. Critical writing points out faults, weaknesses or unacceptable behaviour, often with evaluative language and supporting reasons. Criticism is not the same as insult; a strong critical passage explains what is wrong and why.",
      "TO STIMULATE THOUGHT OR REFLECTION. Some texts ask questions, present contrasting views or describe an issue in a way that encourages the reader to think deeply rather than accept one immediate answer.",
      "MIXED PURPOSES ARE COMMON. A text may inform and persuade at the same time. The task is usually to identify the DOMINANT purpose — the purpose that best explains the overall structure and final effect — then mention secondary purposes where relevant.",
      "HOW TO IDENTIFY DOMINANT PURPOSE. Ask: What does most of the passage do? What is repeated? What does the ending ask the reader to think, feel or do? Which purpose best explains the supporting details?",
      "KEY WORDS HELP BUT DO NOT DECIDE ALONE. One command does not automatically make a whole passage persuasive, and one fact does not make a passage purely informative. Read the whole text.",
      "PURPOSE AND AUDIENCE CONNECT. Writers choose language according to who they are addressing. A health leaflet for pupils may use simple direct instructions; a formal report may use neutral technical language. Audience can therefore strengthen a purpose inference.",
      "PURPOSE AND TONE CONNECT BUT ARE NOT THE SAME. Purpose is what the writer wants to achieve; tone is the writer’s attitude or manner, such as serious, urgent, humorous, critical or hopeful. An urgent tone may support a warning or persuasive purpose.",
      "EVIDENCE PATTERN. A strong answer uses PURPOSE → TEXTUAL CLUE → EXPLANATION. Example: “The writer’s dominant purpose is to persuade because the passage gives reasons for recycling and ends by asking every household to separate waste.”",
      "PERMANENT CHECK. Before finalising a purpose answer, reject any label that cannot explain the writer’s choices across most of the passage."
    ],
    "workedExamples": [
      "INFORM. “Malaria is caused by parasites transmitted through the bites of infected female Anopheles mosquitoes. Common symptoms include fever, headache and weakness.” The passage mainly gives factual explanation; its dominant purpose is to inform.",
      "PERSUADE. “Our school should plant more trees. They provide shade, reduce heat and make the environment healthier. Every class should adopt one tree this term.” The reasons plus the call to action show persuasion.",
      "WARN. “Do not swim in the flooded canal. Fast currents may pull a swimmer under, and broken objects hidden in the water can cause serious injury.” The direct prohibition and consequences show a warning purpose.",
      "ENTERTAIN. “The goat stared at Musa’s lunch as if it had paid school fees too. Before he could blink, it snatched the bread and raced across the field.” Humorous personification and action mainly entertain.",
      "CRITICISE. “The market drainage has been left blocked for months despite repeated complaints. This neglect exposes traders and customers to avoidable flooding.” The writer identifies a fault and explains its consequence; purpose is to criticise negligence.",
      "STIMULATE THOUGHT. “Should every school ban mobile phones completely, or can they be used responsibly for learning? The answer may depend on how schools manage distraction and access.” The text presents a question and competing considerations to provoke reflection.",
      "MIXED PURPOSE — INFORM + PERSUADE. “Vaccination trains the body to recognise certain diseases. It also reduces the spread of infection in communities. Parents should ensure children receive recommended vaccines on time.” The first sentences inform; the final recommendation reveals persuasion as the dominant purpose.",
      "MIXED PURPOSE — ENTERTAIN + TEACH. A folktale tells an amusing story about a greedy tortoise whose trick fails. The narrative entertains, but the consequence also teaches a moral. If most of the text is narrative, entertainment may remain the dominant purpose.",
      "AUDIENCE CLUE. A poster addressed to “Dear Parents” lists school-safety rules and repeatedly uses “please ensure your child…”. The audience and directive language support an instructive/persuasive purpose.",
      "TONE CLUE. “Act now. Each day of delay increases the risk.” The urgent tone strengthens a persuasive/warning purpose, but the purpose must still be confirmed from the whole passage.",
      "DISTRACTOR CHECK. A passage contains many facts about road accidents and ends “Use the pedestrian bridge every time.” Choosing only “to inform” misses the final call to action; persuasion/warning better explains the complete text.",
      "DOMINANT PURPOSE. A 300-word article spends 250 words explaining water pollution and only one sentence asking readers to care. The dominant purpose is likely to inform, with a minor persuasive element, because explanation occupies most of the text."
    ],
    "misconceptions": [
      "confusing topic with purpose",
      "choosing “to inform” for every passage that contains facts",
      "choosing “to persuade” merely because one command appears",
      "inferring purpose from one isolated word instead of the whole passage",
      "confusing tone with purpose",
      "confusing audience with purpose",
      "assuming a text can have only one purpose",
      "failing to identify the dominant purpose in a mixed-purpose passage",
      "using personal agreement or disagreement instead of textual evidence",
      "calling criticism an insult without examining reasons and evidence",
      "using prior knowledge instead of passage evidence"
    ],
    "guidedPractice": [
      "Classify six short extracts as mainly informing, persuading, warning, entertaining, criticising or stimulating thought. Underline two clues for each.",
      "For three mixed-purpose passages, identify the dominant purpose and one secondary purpose, then explain why the dominant one is stronger.",
      "Rewrite one informative sentence as persuasive writing without changing the topic, then explain what language changed the purpose.",
      "Compare two passages on the same topic: one informative and one persuasive. List the language features that make their purposes different.",
      "Given five possible purpose labels for one passage, eliminate four using evidence from the text.",
      "Identify the intended audience of two short texts and explain how the audience influences wording and purpose.",
      "Identify tone and purpose separately in four excerpts, then explain how the tone supports the purpose.",
      "For one warning notice, use the PURPOSE → CLUE → EXPLANATION structure to write a full answer."
    ],
    "independentPractice": [
      "Read an unfamiliar health passage and identify topic, dominant purpose, two clues and one secondary purpose if present.",
      "Analyse a school advert and explain how its language tries to persuade the reader.",
      "Analyse a safety notice and distinguish its warning purpose from simple information.",
      "Read a humorous narrative and explain whether entertainment is the only purpose.",
      "Read a critical paragraph about community sanitation and identify the fault being criticised plus the evidence used.",
      "Read a reflective passage containing rhetorical questions and explain how it stimulates thought.",
      "Choose the dominant purpose of a mixed-purpose passage and justify why another plausible purpose is secondary.",
      "Rewrite a persuasive paragraph as a neutral informative paragraph and explain the changes in language.",
      "Write a 120-word informative paragraph on keeping water safe, then write a second 120-word persuasive version on the same topic.",
      "Create a short warning notice for a school laboratory and identify the language features that show its purpose.",
      "Write a two-sentence purpose analysis using the pattern PURPOSE → CLUE → EXPLANATION for each of three unseen extracts.",
      "Explain why identifying purpose from only one keyword can lead to a wrong answer."
    ],
    "mastery": {
      "criterion": "At least 85% across informative, persuasive, warning, entertaining, critical, reflective and mixed-purpose texts, with dominant purpose justified through multiple textual clues and clear separation of purpose, audience and tone.",
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
    "source": {"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":26},
    "objectives":["Use surrounding words and sentences as context clues to infer a target word’s meaning","Suggest alternative words that can fit the same context without changing the intended sense"],
    "prerequisites":["dictionary skills","synonyms and antonyms","parts of speech","literal sentence meaning"],
    "teaching":[
      "A word does not carry one fixed meaning into every sentence. Context controls which sense is active. The learner must read the whole sentence and often the sentences around it before deciding.",
      "DEFINITION OR RESTATEMENT CLUE. The writer may explain the word immediately: “The terrain was arid, that is, extremely dry.” The phrase after the comma defines arid.",
      "EXAMPLE CLUE. A general word may be followed by examples: “Nocturnal animals, such as bats and owls, are active at night.” The examples help infer nocturnal.",
      "SYNONYM CLUE. A nearby word or phrase may express nearly the same meaning. “The child was timid and shy around strangers.” Shy supports timid.",
      "ANTONYM OR CONTRAST CLUE. Words such as but, unlike, although, however or instead can show an opposite: “Unlike his reckless brother, Tunde was cautious.” Reckless helps reveal cautious as careful.",
      "CAUSE-AND-EFFECT CLUE. Consequences can reveal meaning. “The road was treacherous; loose stones made every step dangerous.” The danger explains treacherous.",
      "GENERAL-SENSE CLUE. Sometimes no single clue defines the word, so combine the whole situation. The meaning chosen must make the entire sentence sensible.",
      "PART OF SPEECH HELPS. Grammar restricts possible meanings. A word used after “to” may be a verb; a word before a noun may function as an adjective. A proposed substitute should fit both meaning and grammar.",
      "MULTIPLE-MEANING WORDS. “Bank” in “river bank” differs from “bank” where money is kept. “Light” can mean illumination, not heavy, or ignite. Context selects the intended sense.",
      "SUBSTITUTION TEST. Replace the target word with a candidate synonym and reread the sentence. If grammar and meaning remain sensible, the substitute may be valid.",
      "NOT EVERY SYNONYM IS INTERCHANGEABLE. Words can be close in meaning but differ in tone, strength or grammar. “Angry” and “furious” are related, but furious is stronger.",
      "MORPHOLOGY CAN HELP. Prefixes, suffixes and roots may give clues: unhappy contains un- meaning not; careless uses -less meaning without. But word parts must be checked against context.",
      "INFER → SUBSTITUTE → VERIFY. First infer a likely meaning from clues, next insert a candidate substitute, then verify it against the whole sentence or paragraph.",
      "PERMANENT EVIDENCE RULE. A correct answer should name the meaning and point to the contextual clue that supports it, rather than merely guessing a familiar synonym."
    ],
    "workedExamples":[
      "DEFINITION. “The medicine is administered orally, meaning through the mouth.” Orally means through the mouth because the writer directly defines it.",
      "EXAMPLE. “Aquatic animals such as fish, crabs and dolphins live in water.” Aquatic means living in or connected with water.",
      "SYNONYM. “The old bridge was fragile and weak after years of neglect.” Weak supports fragile.",
      "ANTONYM. “Mariam is usually reserved, but her sister is very talkative.” The contrast shows reserved means quiet or not very talkative.",
      "CAUSE. “The path was treacherous; loose stones made every step dangerous.” Treacherous means dangerous.",
      "EFFECT. “After walking for hours under the sun, he was exhausted and could barely stand.” The effect shows exhausted means extremely tired.",
      "GENERAL SENSE. “The principal commended Tayo for returning the lost wallet.” Praised fits the positive situation, so commended means praised.",
      "MULTIPLE MEANING — BANK. “The fishermen sat on the bank of the river.” Bank means the land beside the river, not a financial institution.",
      "MULTIPLE MEANING — LIGHT. “This bag is light enough for a child to carry.” Light means not heavy.",
      "PART OF SPEECH. “They will conduct the experiment tomorrow.” Conduct functions as a verb meaning carry out; the noun pronunciation/meaning would not fit.",
      "SUBSTITUTION. “The coach reprimanded the player for arriving late.” Reprimanded≈scolded. Substitution gives “The coach scolded the player…”, which preserves meaning and grammar.",
      "STRENGTH. “The crowd was furious.” Angry is related, but furious suggests stronger anger. A good answer notices degree.",
      "PREFIX. “His response was inaccurate.” Prefix in- signals not; inaccurate means not accurate or incorrect, confirmed by context.",
      "SUFFIX. “The child was fearless during the rescue drill.” -less means without; fearless means without fear, or brave in context.",
      "WHOLE-PARAGRAPH CLUE. If one sentence says a farmer was reluctant and later says he hesitated repeatedly before agreeing, the repeated hesitation supports reluctant=unwilling or hesitant."
    ],
    "misconceptions":[
      "choosing the first dictionary meaning remembered",
      "using sound similarity as evidence",
      "ignoring sentences around the target word",
      "substituting a word that breaks grammar",
      "assuming one word has only one meaning",
      "treating any related word as an exact synonym",
      "ignoring contrast markers such as but or however",
      "forcing a prefix/root meaning even when context disagrees",
      "giving a meaning without citing the clue"
    ],
    "guidedPractice":[
      "Infer the meaning of eight underlined words, and identify the clue type for each.",
      "For five words with two possible dictionary meanings, choose the sense that fits the sentence and explain why.",
      "Replace six target words with a synonym that preserves both meaning and grammar.",
      "Find one example each of definition, example, contrast, synonym and cause-effect clues in a short passage.",
      "Compare angry, annoyed and furious in three contexts and explain the strength difference.",
      "Use part of speech to reject one wrong substitute in each of four sentences.",
      "Use prefixes/suffixes to suggest a meaning, then verify with context.",
      "Explain a target word using the full pattern: meaning → clue → substitution check."
    ],
    "independentPractice":[
      "Read an unseen passage and infer ten underlined words with evidence.",
      "For each inferred word, supply one acceptable substitute where possible.",
      "Identify three multiple-meaning words and explain the sense used in context.",
      "Write two sentences using the same word in different meanings.",
      "Create one sentence containing a definition clue.",
      "Create one sentence containing a contrast clue.",
      "Create one sentence containing a cause-effect clue.",
      "Choose the best synonym from four options for six context sentences and justify each choice.",
      "Explain why a tempting synonym is wrong in three sentences because of grammar, tone or strength.",
      "Analyse five words containing prefixes/suffixes and decide whether morphology plus context supports the meaning.",
      "Rewrite a short paragraph by replacing five target words with accurate context-sensitive alternatives.",
      "Explain why context is more reliable than choosing the first dictionary meaning."
    ],
    "mastery":{"criterion":"At least 85% across definition, example, synonym, contrast, cause-effect, general-sense, morphology and multiple-meaning contexts, with evidence and valid substitution.","status":"DEEP_WHEN_PASSED"},
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
