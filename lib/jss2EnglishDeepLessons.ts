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
    "source": {"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":27},
    "objectives":["Read a passage critically rather than accepting every claim automatically","Distinguish verifiable facts from opinions or judgements","Evaluate claims using evidence, logic and internal consistency"],
    "prerequisites":["main ideas","writer’s purpose","fact and opinion basics","context clues"],
    "teaching":[
      "CRITICAL READING asks two questions together: “What is the writer saying?” and “How well is the writer supporting it?” Understanding comes first; evaluation comes next.",
      "A CLAIM is a statement the writer wants the reader to accept. Claims may be factual, evaluative or predictive. A critical reader identifies the claim before judging it.",
      "A FACT is a statement that can in principle be checked against reliable evidence. An OPINION expresses a judgement, preference or interpretation. Opinions are not automatically worthless; they may be well supported or poorly supported.",
      "REASON VS EVIDENCE. A reason explains why a claim might be true. Evidence gives support such as data, observations, examples, records, expert findings or documented events.",
      "EXAMPLE VS PROOF. One example can illustrate an idea but may be too limited to prove a general claim about everyone or every situation.",
      "GENERALISATION. Statements using all, always, never, everyone or no one make very broad claims and therefore need strong evidence.",
      "ASSUMPTION is an unstated idea that a writer takes for granted. Critical readers ask what must be true for the argument to work.",
      "RELEVANCE. Evidence must actually support the claim. A true fact can still be irrelevant if it does not help prove the point being made.",
      "SUFFICIENCY. One weak piece of evidence may not be enough. Ask whether the quantity and quality of evidence are sufficient for the strength of the claim.",
      "SOURCE AWARENESS. Consider who produced the information, what expertise or interest they may have, and whether the passage provides enough basis to trust the evidence.",
      "LANGUAGE CAN SIGNAL BIAS OR EMOTION. Words such as obviously, disgraceful, perfect, useless or everyone knows may try to influence reaction. Emotional language does not automatically make a claim false, but it should not replace evidence.",
      "CAUSE VS COINCIDENCE. If two events occur together, one does not automatically cause the other. A passage must provide a reasonable causal link.",
      "INTERNAL CONSISTENCY. Compare claims within the passage. If the writer says one thing early and contradicts it later without explanation, reliability is weakened.",
      "BALANCED EVALUATION. A strong critical response states what is supported, what is uncertain, what is exaggerated and what further evidence would help.",
      "EVIDENCE-BASED RESPONSE PATTERN. CLAIM → EVIDENCE → JUDGEMENT. Example: “The claim is only partly supported because one example is given, but no data show the pattern is common.”"
    ],
    "workedExamples":[
      "FACT. “The school library opens at 8:00 a.m.” can be checked against the timetable, so it is a verifiable factual claim.",
      "OPINION. “This is the best school in Nigeria” is an opinion unless “best” is defined by measurable criteria and supported by evidence.",
      "CLAIM + REASON. “School gardens can improve practical science learning because pupils observe plant growth directly.” The second part gives a reason, but stronger evidence would be needed to show improvement.",
      "ONE EXAMPLE IS NOT UNIVERSAL PROOF. “My cousin studied at night and passed, therefore everyone learns best at night.” One case cannot prove a rule for everyone.",
      "ABSOLUTE LANGUAGE. “Students who use phones never concentrate.” The word never makes an extremely strong claim requiring very strong evidence.",
      "IRRELEVANT EVIDENCE. Claim: “The canteen food is nutritious.” Evidence: “The canteen was painted last month.” The evidence may be true but does not support nutritional quality.",
      "RELEVANT EVIDENCE. Claim: “The new water filter improved water clarity.” Before/after test records showing lower turbidity are relevant evidence.",
      "INSUFFICIENT EVIDENCE. “Three students preferred the new timetable, so all students prefer it.” Sample size and representativeness are too weak.",
      "BIAS/EMOTIVE LANGUAGE. “Only a careless person would oppose this brilliant plan.” The wording attacks opponents but gives no evidence that the plan works.",
      "CAUSE VS COINCIDENCE. “After the new uniform was introduced, exam scores rose; therefore the uniform caused the rise.” Other factors could explain the change.",
      "ASSUMPTION. “Online homework will improve every learner’s result.” This assumes equal device access, connectivity and appropriate task design.",
      "SOURCE. A product advertisement claims its own drink is “the healthiest choice”. The commercial interest means the evidence should be checked independently.",
      "CONSISTENCY. A passage first says “all plastic should be banned” and later recommends continued plastic use in schools without explaining exceptions. The argument needs clarification.",
      "BALANCED JUDGEMENT. “The article gives two useful examples of flooding caused by blocked drains, but it does not establish that blocked drains are the only cause of flooding.”",
      "STRONGER EVIDENCE. For a claim that a reading programme improves scores, before/after results across many learners with clear comparison would be stronger than one testimonial."
    ],
    "misconceptions":[
      "calling every statement an opinion",
      "assuming every fact is automatically relevant",
      "rejecting a claim simply because you dislike it",
      "accepting a claim simply because you agree with it",
      "treating one example as universal proof",
      "confusing a reason with evidence",
      "assuming emotional language is proof",
      "assuming correlation automatically means causation",
      "ignoring source interest or expertise",
      "finding a weakness and then claiming the whole passage is false",
      "giving a judgement without citing textual evidence"
    ],
    "guidedPractice":[
      "Classify ten statements as fact, opinion, claim or mixed, and justify each.",
      "Underline the main claim, reasons and evidence in a short argumentative paragraph.",
      "For five examples, decide whether the evidence is relevant and sufficient.",
      "Identify two absolute generalisations and rewrite them more cautiously.",
      "Find one unstated assumption in each of three short arguments.",
      "Compare a neutral sentence with an emotionally loaded version and explain the effect.",
      "Identify one case of correlation being presented as causation and state what extra evidence is needed.",
      "Evaluate the reliability of an advert, a school notice and a newspaper-style report using source and evidence.",
      "Find any internal contradiction in a supplied passage.",
      "Write one balanced evaluation using CLAIM → EVIDENCE → JUDGEMENT."
    ],
    "independentPractice":[
      "Read an unfamiliar article and identify its main claim, two reasons and all evidence offered.",
      "Label eight statements from a passage as fact or opinion with justification.",
      "Identify one weak generalisation and explain why the evidence is insufficient.",
      "Identify one irrelevant detail used as though it supported the main claim.",
      "Find one assumption the writer does not state directly.",
      "Evaluate whether the source described in a passage has a possible interest or bias.",
      "Rewrite two emotionally loaded claims in more neutral language.",
      "Explain why one example cannot establish a universal rule.",
      "Analyse a cause-and-effect claim and list two alternative explanations.",
      "Identify one strong claim and describe what stronger evidence would be needed.",
      "Compare two short texts making opposite claims and decide which is better supported.",
      "Write a 150-word critical response that states what is supported, uncertain and exaggerated without attacking the writer personally."
    ],
    "mastery":{"criterion":"At least 85% across fact/opinion, claim/reason/evidence, relevance, sufficiency, assumption, source, bias, causation and consistency, with balanced evidence-based judgement.","status":"DEEP_WHEN_PASSED"},
    "boardReady": true
  },
  {
    "topicId":"nerdc-jss2-english-reading-4","classLevel":"JSS2","subject":"English Language","strand":"Reading","topic":"Reading for speed",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":28},
    "objectives":["Read at an appropriate speed for purpose and text difficulty","Use surveying, skimming and scanning effectively","Maintain comprehension while reducing unnecessary regressions and word-by-word reading"],
    "prerequisites":["fluent sentence reading","main idea recognition"],
    "teaching":["READING SPEED means flexible efficiency, not rushing. Change speed according to purpose, difficulty and required accuracy.","SURVEY title, headings, pictures, captions and layout before close reading.","SKIMMING seeks general meaning through headline/opening/topic sentences/repeated words/conclusion.","SCANNING searches for a specific name, date, figure, price or fact using visual cues.","INTENSIVE READING is slower because the goal is detailed understanding or inference.","PHRASE READING groups meaningful words rather than processing every word separately.","REGRESSION is useful only when meaning breaks; unnecessary backward movement reduces fluency.","PURPOSE FIRST: overview, one fact, detailed explanation or evidence? Technique follows purpose.","TEXT TYPE matters: timetable→scan; overview article→skim; difficult instructions→intensive.","KEYWORD SEARCH guides scanning to relevant columns or words.","COMPREHENSION must remain strong; time alone is not progress.","WPM=words read÷minutes, but pair it with comprehension score.","Do not stop for every unfamiliar word when broad meaning remains clear.","EXAM STRATEGY: survey questions/structure, scan for targets, then read relevant parts intensively.","PERMANENT RULE: use the fastest method that still achieves required understanding."],
    "workedExamples":["Timetable: scan destination/time instead of every row.","News article: skim headline, first paragraph, topic sentences, ending.","Textbook chapter: survey headings/diagrams before study.","Directory/list: scan for one surname.","Story overview: skim key events, then read closely for theme.","Science procedure requires intensive reading.","Phrase reading: “After the heavy rainfall / the narrow road / became difficult to use.”","Repeatedly rereading an easy sentence without meaning loss is unnecessary regression.","Rereading after a contrast marker such as although can be useful.","300 words in2min=150wpm; with4/5 comprehension this is a useful baseline.","300 words in1min with1/5 comprehension is not improvement.","Question asks year bridge built: scan for four-digit years, then read surrounding sentence."],
    "misconceptions":["speed means rushing","one technique fits all texts","scanning gives full understanding","skimming is random skipping","all regression is bad","wpm alone measures quality","stopping at every unknown word","ignoring comprehension"],
    "guidedPractice":["Survey a page and predict three sections.","Skim500 words and state main idea.","Scan timetable for six facts.","Scan price list for four figures.","Read paragraph in phrase groups.","Time300 words and answer five questions.","Repeat with phrase reading and compare.","Choose survey/skim/scan/intensive for eight tasks.","Mark useful vs unnecessary rereading.","Calculate wpm for two attempts.","Use exam questions to locate sections needing close reading.","Explain why faster reading with poor comprehension fails."],
    "independentPractice":["Survey an unfamiliar textbook page and write outline.","Skim article and state main idea.","Scan advert for date/venue/price/contact.","Scan timetable for route/time.","Read400-word passage under timing.","Answer questions and calculate accuracy.","Repeat with phrase reading.","Compare speed/accuracy.","Classify ten tasks by best technique.","Explain when intensive reading is necessary.","Rewrite word-by-word sentence into phrase groups.","Set a personal speed-comprehension target based on evidence."],
    "mastery":{"criterion":"Learner selects surveying, skimming, scanning or intensive reading appropriately and improves efficiency while maintaining at least80% comprehension.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-reading-5","classLevel":"JSS2","subject":"English Language","strand":"Reading","topic":"Reading for summary",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":29},
    "objectives":["Identify topic sentences and key ideas in paragraphs","Recognise words or expressions that redirect attention to a main point","Restate key ideas concisely in the learner’s own words"],
    "prerequisites":["main/supporting ideas","paragraph structure","paraphrasing"],
    "teaching":["A SUMMARY preserves essential meaning in fewer words.","Read for whole meaning before shortening.","Identify main idea of each paragraph.","Separate essential ideas from examples/repetition.","Group related details under broader points.","Paraphrase in your own wording without changing meaning.","Signal words show cause, contrast, result and emphasis.","Preserve relationships such as cause-effect or comparison.","Do not add personal opinion.","Remove examples unless essential.","Remove repeated statements.","Connect points coherently unless task asks for notes.","Respect word limit by planning and editing.","Check coverage: every major idea appears.","Check distortion: no idea reversed/exaggerated.","Permanent method: understand→select→group→paraphrase→connect→check."],
    "workedExamples":["Flooding damages roads, homes, farms→summary: flooding damages infrastructure/property.","Three repeated exercise-health sentences→state once.","Blocked drains prevent flow, therefore streets flood→preserve cause-effect.","Private cars convenient; however buses carry more→retain contrast.","Programme reduced absenteeism→Attendance improved after programme.","Changing only one word in copied sentence is weak paraphrase.","Solar/wind/hydro examples can compress to several forms of renewable energy.","A central statistic may remain if it carries the main claim.","Causes/effects/solutions passage summary must cover all three.","120-word notes can reduce to60 by combining repeated causes.","Adding “This is terrible” introduces opinion.","Use because/however/therefore only where source relationships support them."],
    "misconceptions":["copying whole topic sentences","including every example","adding opinion","omitting a major idea","changing cause/effect","writing fragments","exceeding limit through repetition","paraphrasing so loosely meaning changes"],
    "guidedPractice":["Underline main idea in five paragraphs.","Cross out examples/repetition.","Combine four details into one general sentence.","Paraphrase six sentences.","Identify signal words and relationships.","Reduce one paragraph to one sentence.","Reduce five paragraphs to five points.","Turn points into80-word summary.","Edit a summary containing opinion/copied sentences.","Compare two summaries and choose better.","Check word limit.","Use coverage checklist to find missing idea."],
    "independentPractice":["Summarise unseen three-paragraph passage in70 words.","Summarise cause-effect passage in60 words.","Summarise compare-contrast passage.","Write five key points before prose summary.","Paraphrase ten selected sentences.","Remove nonessential examples and justify.","Identify when a statistic is essential.","Correct a distorted summary.","Reduce100-word draft to70 without losing major idea.","Self-check coverage/brevity/own words/accuracy.","Compare summary to source for accidental opinion.","Write final revised summary."],
    "mastery":{"criterion":"Learner identifies major ideas, removes supporting detail appropriately, paraphrases accurately and produces coherent summaries within limits with at least85% content accuracy.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-writing-1","classLevel":"JSS2","subject":"English Language","strand":"Writing","topic":"Writing an outline",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":30},
    "objectives":["Read through a topic and identify relevant main/supporting ideas","Arrange ideas in a logical sequence","Plan an appropriate introduction and effective conclusion"],
    "prerequisites":["main/supporting ideas","paragraphing","basic composition"],
    "teaching":["AN OUTLINE is a writing plan showing what each part will do before full paragraphs.","Interpret topic: subject, command word, purpose and audience.","Brainstorm freely, then select relevant ideas.","Group related ideas: broad controlling ideas become main points; reasons/examples become supports.","Remove irrelevant ideas that do not answer exact topic.","Choose logical order: chronological, cause-effect, problem-solution, general-specific, spatial or argumentative strength.","Introduction plan establishes focus without every detail.","Body plan gives one controlling idea per paragraph with supports.","Plan transitions that express relationship.","Conclusion closes discussion without new major point.","Useful outline is specific enough to guide but shorter than essay.","Use consistent numbering/bullets.","Check logical flow between paragraphs.","Check balance among main points.","Permanent flow: interpret→brainstorm→select→group→order→plan→check."],
    "workedExamples":["Waste disposal: intro→blocked drains/flooding→disease→environmental damage→solutions→conclusion.","Memorable journey: departure→unexpected event→climax→arrival/reflection.","Why students should read daily: vocabulary→knowledge→concentration→counterpoint→conclusion.","Yam porridge process: ingredients→preparation→cooking→serving.","Exam malpractice: issue→pressure→poor preparation→weak supervision→effects/solutions.","Irrelevant football-team idea removed from flooding outline.","Blocked drains/heavy rain/building on waterways grouped under causes.","Reading improves vocabulary supported by exposure/context/repetition.","Introduction plan defines scope; it does not list every paragraph fully.","Argument conclusion restates position/strongest reason, no new fifth reason.","Three balanced body points with supports are stronger than random ten-point list.","Cause paragraph can transition to effects with Consequently."],
    "misconceptions":["writing essay before planning","listing unrelated points","using examples as main headings","copying topic as only outline","no logical order","new argument in conclusion","outline becomes full essay","outline too thin to guide"],
    "guidedPractice":["Interpret five prompts by subject/command/purpose/audience.","Brainstorm then remove irrelevant ideas.","Group twelve ideas under three headings.","Arrange events chronologically.","Arrange cause/effect ideas.","Outline waste disposal.","Outline school uniforms argument.","Add two supports under each point.","Plan transitions.","Repair duplicate outline.","Remove new conclusion point.","Check balance."],
    "independentPractice":["Outline benefits of clean school environment.","Outline a day I will never forget.","Outline causes/effects of road accidents.","Outline how to prepare for examination.","Outline argument on phones in school.","Outline importance of trees.","For each include intro,3+ body points,supports,conclusion.","Choose organisation pattern for six prompts and justify.","Convert brainstorm list into hierarchical outline.","Remove irrelevant ideas from sample.","Reorder bad outline.","Use best outline to predict paragraph topic sentences."],
    "mastery":{"criterion":"Learner interprets prompts accurately and produces relevant, logically ordered, balanced outlines with clear introduction, supported body points and conclusion in at least85% of tasks.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-writing-2","classLevel":"JSS2","subject":"English Language","strand":"Writing","topic":"Composition writing: expository and argumentative",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":31},
    "objectives":["Distinguish expository from argumentative writing","Identify essential elements of both forms","Write coherent expository and argumentative essays with evidence and logical organisation"],
    "prerequisites":["outline writing","paragraphing","main/supporting ideas"],
    "teaching":[
      "EXPOSITORY WRITING explains or informs. It may define, describe a process, classify, compare or explain causes/effects.",
      "ARGUMENTATIVE WRITING takes a position and supports it with reasons and evidence while addressing opposing views fairly.",
      "PURPOSE decides form: “Explain causes of flooding” is expository; “Government should ban building on waterways” is argumentative.",
      "INTRODUCTION establishes topic and controlling focus. Argumentative introduction should make the position clear.",
      "BODY PARAGRAPH needs topic sentence, explanation, evidence/example and link to the main purpose.",
      "EXPOSITORY evidence may include facts, examples, sequence, definitions and cause-effect relationships.",
      "ARGUMENT evidence must support a claim rather than merely repeat it.",
      "COUNTERARGUMENT states a plausible opposing view fairly; REBUTTAL answers it with reasoning/evidence rather than insult.",
      "PARAGRAPH UNITY means one controlling idea per paragraph.",
      "COHESION uses transitions and clear references to connect sentences/paragraphs.",
      "FORMAL SCHOOL WRITING requires standard English; avoid texting abbreviations and vague fillers.",
      "CONCLUSION synthesises explanation or reinforces argument; do not introduce a new major point.",
      "REVISION order: relevance→organisation→support→cohesion→sentence accuracy→spelling/punctuation.",
      "AVOID MEMORISED GENERIC INTRODUCTIONS that do not address the exact prompt.",
      "GOLDEN WRITING METHOD: plan→draft→support→connect→revise."
    ],
    "workedExamples":[
      "Expository prompt “Causes of flooding”: organise blocked drains, heavy rain, poor planning, then effects/solutions if requested.",
      "Argument prompt “School uniforms should be compulsory”: position→identity/equality/discipline reasons→cost counterargument→rebuttal→conclusion.",
      "Strong topic sentence: “Blocked drainage is a major cause of urban flooding.”",
      "Weak paragraph: “Flooding is bad. It is very bad. Everyone knows it.” This repeats assertion without explanation.",
      "Stronger paragraph: “Blocked drains prevent storm water from flowing away, causing water to spread onto roads and homes during heavy rain.”",
      "Counterargument: “Critics argue uniforms can be expensive for families.”",
      "Rebuttal: “However, a limited number of durable uniforms may reduce pressure to buy many fashionable outfits.”",
      "Process exposition: handwashing should be explained in chronological sequence.",
      "Compare-contrast exposition: public/private transport can be organised by cost, capacity and convenience.",
      "Cause-effect: distinguish cause “blocked drains” from effect “street flooding”.",
      "Evidence vs assertion: “Reading improves vocabulary because repeated exposure introduces new words in context” gives a mechanism; “Reading is best” does not.",
      "Conclusion argument: restate position based on reasons, not a new unrelated issue.",
      "Cohesion: “This problem” must clearly refer to the issue in preceding sentence.",
      "Paragraph unity: a paragraph about transport cost should not suddenly discuss school uniforms.",
      "Revision example: replace vague “things are bad” with precise “blocked drainage increases flood risk”."
    ],
    "misconceptions":["turning exposition into rant","arguing without evidence","one long paragraph","insulting opponents","confusing example with explanation","new argument in conclusion","memorised irrelevant introduction","weak cohesion","text-message language","claiming both sides equally without taking a position when prompt requires argument"],
    "guidedPractice":["Classify ten prompts as expository/argumentative.","Write controlling sentence for six prompts.","Build expository paragraph from topic sentence+explanation+example.","Build argumentative paragraph from claim+reason+evidence.","Write counterargument+rebuttal.","Repair unrelated paragraph.","Add transitions to four-paragraph plan.","Compare weak vs strong evidence.","Draft flooding exposition introduction.","Draft school-uniform argument introduction.","Revise conclusion containing new point.","Revise300-word draft using checklist."],
    "independentPractice":["Write350 words explaining causes/effects of littering.","Write350 words explaining effective exam preparation.","Write350 words arguing for/against school uniforms.","Write350 words arguing whether phones should be allowed for learning.","Create outline before each essay.","Underline each body topic sentence.","Label evidence/examples.","Include one counterargument/rebuttal in argument.","Revise for cohesion/unity.","Replace vague vocabulary.","Edit grammar/punctuation after content revision.","Self-assess using relevance,organisation,support,language checklist."],
    "mastery":{"criterion":"Learner distinguishes exposition from argument and writes coherent, evidence-supported compositions with unified paragraphs, fair counterargument, effective conclusions and revision at at least85% standard.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-writing-3","classLevel":"JSS2","subject":"English Language","strand":"Writing","topic":"Letter writing: informal and formal",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":32},
    "objectives":["Distinguish formal and informal letters by purpose, audience, layout and language","Select correct format for a situation","Write appropriate letters for real-life purposes"],
    "prerequisites":["JSS1 letter basics","punctuation","audience awareness"],
    "teaching":[
      "LETTER TYPE depends on relationship and purpose. Informal letters are to friends/relatives; formal letters are to institutions or people in official roles.",
      "INFORMAL REGISTER can be warm, personal and conversational while still using clear standard sentences.",
      "FORMAL REGISTER should be respectful, direct, precise and free from slang, emojis and casual abbreviations.",
      "FORMAL FORMAT commonly includes writer’s address/date, recipient’s address where required by school convention, salutation, title/subject, organised body and formal closing.",
      "INFORMAL FORMAT includes writer’s address/date, personal salutation, opening, main message, closing and personal sign-off according to school convention.",
      "PURPOSE SHOULD APPEAR EARLY in a formal letter. Do not force the official to read several paragraphs before learning the request or complaint.",
      "FORMAL BODY can follow problem→evidence/effect→requested action.",
      "REQUEST LETTER should state exactly what action is requested and why it is reasonable.",
      "COMPLAINT LETTER should describe facts accurately, dates/details where relevant, effects, and desired remedy without abusive language.",
      "APPLICATION/ENQUIRY style should state reason for writing, relevant details and clear questions/request.",
      "INFORMAL LETTER should maintain personal connection: ask/respond, share events and feelings, but remain organised.",
      "PARAGRAPHING matters in both forms. Each paragraph should handle one stage or idea.",
      "CLOSINGS must match register. Formal: Yours faithfully/sincerely according to salutation convention; informal: Yours affectionately/Your friend etc.",
      "AUDIENCE CHECK: ask what the reader knows, what they need, and what tone suits the relationship.",
      "EDIT FORMAT separately from content: address/date/salutation/title/body/closing, then grammar/spelling/punctuation."
    ],
    "workedExamples":[
      "Formal request to local council for road repair: identify road, describe damage/effects, request inspection/repair.",
      "Formal complaint to electricity office: state account/location, outage period, impact, request investigation.",
      "Formal enquiry to school: ask clearly about admission deadline, required documents and fees without unnecessary story.",
      "Formal letter to principal requesting library hours extension: reason, evidence of demand, practical suggestion.",
      "Informal letter to cousin about new school: greeting, personal update, school experience, questions about cousin, warm closing.",
      "Informal letter congratulating friend: acknowledge achievement, specific encouragement, personal connection.",
      "Wrong register: “Dear Sir, what’s up? Please fix this thing ASAP 😂.” Inappropriate for formal audience.",
      "Improved formal: “I am writing to request urgent repair of the damaged drainage channel beside…”",
      "Weak complaint: “Your service is terrible.” Stronger: “Power supply has been unavailable for five consecutive days despite…”",
      "Purpose placement: first paragraph says why writing; middle gives evidence/details; final states requested action.",
      "Formal title example: REQUEST FOR REPAIR OF DAMAGED CLASSROOM ROOF.",
      "Informal organisation: opening personal response→main event→reflection→questions→closing.",
      "Salutation/closing match: Dear Sir/Madam→Yours faithfully; Dear Mr Adeyemi with named recipient may use Yours sincerely under common convention.",
      "Editing: remove slang “gonna” from formal letter and replace with “going to/will”.",
      "Audience adaptation: letter to friend may explain feelings; letter to official emphasises facts/action."
    ],
    "misconceptions":["mixing formal and informal register","using slang with official salutation","omitting purpose until end","one giant paragraph","abusive complaint language","wrong closing for salutation","forgetting addresses/date","turning informal letter into impersonal essay","copying memorised format without adapting to prompt"],
    "guidedPractice":["Classify eight prompts formal/informal.","Match salutations and closings.","Correct format errors in a formal letter.","Rewrite slang paragraph into formal register.","Write opening paragraph for road-repair request.","Write evidence paragraph for complaint.","Write requested-action conclusion.","Write informal opening responding to cousin.","Organise five mixed paragraphs into correct order.","Compare formal vs informal versions of same news.","Edit punctuation/address/date errors.","Use audience checklist on one completed letter."],
    "independentPractice":["Write formal complaint to service provider.","Write formal request to principal.","Write formal enquiry to organisation.","Write informal letter describing new school.","Write informal congratulatory letter.","Write informal advice letter to younger relative.","For each formal letter state purpose in first paragraph.","Use at least3 coherent body paragraphs where appropriate.","Check register and closing.","Revise one weak formal sample.","Convert an informal message into formal letter.","Self-check format/content/register/accuracy."],
    "mastery":{"criterion":"Learner selects correct letter type, uses accurate format/register, states purpose clearly, organises evidence/request coherently and writes both formal and informal letters at at least85% standard.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-writing-4","classLevel":"JSS2","subject":"English Language","strand":"Writing","topic":"Summary writing (passage on consumer and social influence)",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":33},
    "objectives":["Identify topic sentences and key ideas in a passage","Separate major points from illustrations and repetition","Write an accurate concise summary in the learner’s own words"],
    "prerequisites":["reading for summary","paraphrasing","sentence construction"],
    "teaching":[
      "SUMMARY WRITING answers a specific question using only essential ideas from the source.",
      "READ THE QUESTION FOCUS FIRST. If asked for factors influencing buying, exclude unrelated effects or advice.",
      "READ PASSAGE FOR WHOLE MEANING before extracting points.",
      "LOCATE RELEVANT PARAGRAPHS and identify one core idea from each.",
      "DISTINGUISH POINT FROM EXAMPLE. “Friends recommend brands, classmates copy one another…” may support one broader point: peer influence affects buying.",
      "COMBINE OVERLAPPING DETAILS into one stronger point instead of counting repeated ideas separately.",
      "PARAPHRASE accurately. Change structure and wording while preserving exact meaning.",
      "COMPLETE SENTENCES are normally required unless task explicitly requests notes.",
      "REMOVE illustrations, quotations, repetition, anecdotes and decorative wording unless essential to the requested point.",
      "CONSUMER-INFLUENCE PASSAGES may include price, advertising, peer pressure, family influence, brand image, convenience, quality, income and social status. Only include those actually supported in the given passage.",
      "DO NOT ADD ADVICE such as “students should be wise consumers” unless the passage/question requires it.",
      "NUMBER OF POINTS matters. If question asks six points, identify six distinct ideas, not six examples of two ideas.",
      "WORD ECONOMY means direct wording without losing meaning.",
      "GRAMMATICAL INDEPENDENCE: each answer sentence should make sense on its own and avoid dangling pronouns copied from source.",
      "FINAL CHECK: focus→number of points→own words→accuracy→grammar→no extra opinion."
    ],
    "workedExamples":[
      "Source details: discounts, low prices and affordable instalments. Summary point: Price and payment conditions influence buying decisions.",
      "Source: friends praise a brand, classmates copy trends. Summary point: Peer pressure can shape consumer choice.",
      "Source: repeated television, social-media and billboard promotions. Summary point: Advertising influences awareness and preference.",
      "Source: parents choose certain products for children. Summary point: Family preferences can affect purchasing decisions.",
      "Source: buyer selects nearby shop because it saves time. Summary point: Convenience or accessibility influences purchases.",
      "Source: product lasts longer and performs better. Summary point: Perceived quality/durability affects choice.",
      "Three examples of celebrity adverts should normally become one point about promotional influence.",
      "Bad summary: “People buy things because adverts are everywhere and this is very bad.” Adds judgement. Better: “Advertising can influence consumer preferences.”",
      "Copied: “Young people are frequently persuaded by their peers to purchase fashionable products.” Paraphrase: “Peer pressure can encourage youths to buy fashionable goods.”",
      "Question asks causes but learner writes effects of overspending; those points are irrelevant despite being in passage.",
      "Six requested points require six distinct influences, not price expressed three different ways.",
      "Pronoun repair: replace copied “This makes them buy it” with clear “Repeated advertising can encourage consumers to purchase the product.”",
      "Word economy: “Due to the fact that products are cheap in price”→“Low prices encourage purchases.”",
      "Two overlapping points “friends influence them” and “classmates influence them” combine as peer influence.",
      "Final verification: every summary statement can be traced to source evidence."
    ],
    "misconceptions":["copying long clauses","summarising whole passage instead of focus","counting examples as points","adding advice/opinion","repeating same idea as multiple points","changing meaning during paraphrase","using unclear copied pronouns","ignoring required number of points","writing fragments"],
    "guidedPractice":["Identify question focus in five summary prompts.","Underline six relevant ideas in a consumer passage.","Separate point vs example for ten statements.","Combine overlapping details.","Paraphrase eight source sentences.","Turn six notes into complete concise sentences.","Remove opinion from a flawed summary.","Repair unclear pronouns.","Count distinct points in a draft.","Shorten wordy sentences without meaning loss.","Check each point against source.","Write final six-point summary under stated word limit."],
    "independentPractice":["Summarise factors affecting consumer choice from unseen passage.","Summarise effects of advertising from another passage.","Extract six points only from relevant paragraphs.","Paraphrase ten selected ideas.","Combine repeated examples into broader points.","Write five complete summary sentences without copying.","Edit a draft containing two opinions.","Edit a draft with duplicated points.","Reduce a100-word draft to70 words.","Verify every sentence against source.","Check required point count.","Produce final revised summary using checklist."],
    "mastery":{"criterion":"Learner identifies the exact summary focus, extracts distinct major points, paraphrases accurately and writes concise grammatical summaries with no repetition or added opinion at at least85% standard.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-listening-and-speaking-1","classLevel":"JSS2","subject":"English Language","strand":"Listening and Speaking","topic":"Revision of sounds: Vowels and Consonants",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":37},
    "objectives":["Identify English vowel and consonant sounds","Produce vowel and consonant sounds accurately in isolation and context","Articulate common consonant clusters clearly"],
    "prerequisites":["basic phonics","JSS1 oral English"],
    "teaching":[
      "ENGLISH SOUNDS ARE NOT THE SAME AS LETTERS. English has more speech sounds than alphabet letters, so one letter may represent different sounds and one sound may have several spellings.",
      "VOWELS are produced with relatively open airflow. At this level learners should hear contrasts in vowel quality and length, not merely memorise symbols.",
      "SHORT/LONG CONTRASTS matter because meaning can change: ship/sheep, full/fool, sit/seat, pull/pool.",
      "CENTRAL VOWELS and weak vowels occur frequently in unstressed syllables. Learners should notice that every written vowel letter is not pronounced strongly.",
      "DIPHTHONGS involve a glide from one vowel position toward another, as in words such as day, boy, house and go.",
      "CONSONANTS involve partial or complete obstruction of airflow. They can differ by place, manner and voicing.",
      "VOICED/VOICELESS contrasts are important: /f/ vs /v/, /s/ vs /z/, /t/ vs /d/, /k/ vs /g/, /p/ vs /b/.",
      "MINIMAL PAIRS differ by one sound and train accurate listening: fan/van, sip/zip, coat/goat, pat/bat.",
      "CONSONANT CLUSTERS contain two or more consonants together, such as /pl/ in play, /str/ in street and /kst/ in text.",
      "DO NOT INSERT EXTRA VOWELS inside clusters. Street should not become sətreet; school should not become sukool.",
      "FINAL CONSONANTS matter. Dropping final /t/, /d/, /s/ or /k/ can change meaning or grammatical information.",
      "SPELLING IS NOT A PERFECT GUIDE. The same sound can appear in different spellings and the same letters can represent different sounds.",
      "HEAR BEFORE PRODUCING. First discriminate the target sound, then imitate, then use it in words, phrases and full sentences.",
      "MOUTH POSITION HELPS. Notice lip rounding, tongue height and whether the vocal cords vibrate for difficult contrasts.",
      "CONTEXT PRACTICE is essential. Correct production in an isolated word is not enough if the sound disappears in normal speech.",
      "PERMANENT METHOD: hear→contrast→produce→use in a sentence→self-check."
    ],
    "workedExamples":[
      "ship/sheep: the vowel changes and so does meaning.",
      "full/fool: vowel quality and length distinguish the words.",
      "sit/seat: a learner who merges the vowels may confuse two different words.",
      "fan/van: /f/ is voiceless while /v/ is voiced; place the fingers on the throat to feel vibration for /v/.",
      "sip/zip: /s/ is voiceless, /z/ voiced.",
      "coat/goat: /k/ is voiceless, /g/ voiced.",
      "pat/bat: /p/ is voiceless, /b/ voiced.",
      "thin/then: the initial consonants differ in voicing and meaning.",
      "street begins with /str/; inserting a vowel gives an inaccurate cluster.",
      "play begins with /pl/; both consonants should remain audible.",
      "text ends with a cluster; the final consonants should not simply disappear.",
      "asked contains a difficult final cluster; practise slowly before connected speech.",
      "day contains a vowel glide rather than one steady vowel quality.",
      "boy contains a diphthong; the mouth moves during the vowel.",
      "go contains a glide in many standard pronunciations.",
      "Final /s/ distinguishes plural in cats from cat; dropping it can change grammar.",
      "Final /d/ in played signals past tense; dropping it may obscure meaning.",
      "Letter c is /k/ in cat but /s/ in city, showing spelling and sound do not map one-to-one."
    ],
    "misconceptions":["confusing letters with sounds","assuming spelling always predicts pronunciation","adding vowels inside clusters","dropping final consonants","treating stress as sound identity","memorising symbols without listening","practising only isolated words","assuming all speakers must sound identical rather than aiming for intelligibility"],
    "guidedPractice":["Sort twelve words into vowel-contrast pairs.","Listen and choose between ship/sheep style pairs.","Feel voicing difference in f/v,s/z,t/d,k/g,p/b.","Produce ten minimal pairs.","Read six words beginning with clusters.","Read six words ending with clusters.","Underline written letters that represent the same target sound in different spellings.","Identify diphthongs in eight words.","Read five plural forms clearly preserving final sounds.","Read five past-tense forms clearly preserving final sounds.","Record a short sentence containing three target contrasts.","Replay and self-correct one unclear sound."],
    "independentPractice":["Create ten minimal-pair sets from lesson vocabulary.","Write and read a sentence for each pair.","Record twenty target vowel words.","Record twenty target consonant words.","Read a paragraph containing clusters aloud.","Mark five words where spelling may mislead pronunciation.","Classify ten consonants as voiced/voiceless pairs.","Practise six initial clusters.","Practise six final clusters.","Read one minute of connected speech and identify dropped sounds on replay.","Compare first and second recordings after correction.","Complete a sound-identification grid from an unseen passage."],
    "mastery":{"criterion":"Learner discriminates and produces key vowel/consonant contrasts, maintains clusters and final sounds in connected speech, and reaches at least85% intelligibility/identification accuracy.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-listening-and-speaking-2","classLevel":"JSS2","subject":"English Language","strand":"Listening and Speaking","topic":"Oral Comprehension",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":34},
    "objectives":["Identify and explain main ideas in spoken material","Accept, reject or qualify ideas using evidence and prior knowledge","Identify speaker mood/intention and plausible interpretations"],
    "prerequisites":["active listening","main ideas","author mood/purpose"],
    "teaching":[
      "ORAL COMPREHENSION means constructing meaning while listening. Unlike reading, the words may pass only once, so attention must be selective and purposeful.",
      "BEFORE LISTENING, predict likely topic from title/context and prepare to listen for who, what, where, when, why and how.",
      "FIRST LISTEN for the overall message, not every detail.",
      "SECOND LISTEN, when allowed, for key evidence, sequence, numbers, names and relationships.",
      "SIGNPOSTS such as first, however, because, therefore, in contrast and finally reveal structure.",
      "MAIN IDEA is the central message; supporting details explain, illustrate or prove it.",
      "LITERAL QUESTIONS ask what was directly stated.",
      "INFERENTIAL QUESTIONS require combining spoken clues with reasonable background knowledge.",
      "CRITICAL QUESTIONS ask whether a claim is convincing, relevant or sufficiently supported.",
      "TONE can be serious, excited, doubtful, angry, humorous, hopeful and more; infer it from word choice, pace, stress and pitch.",
      "PURPOSE may be to inform, persuade, warn, entertain, instruct or criticise. Use the whole message, not one word.",
      "NOTE-TAKING should be brief: keywords, arrows, figures, abbreviations. Writing full sentences while listening can make the learner miss later information.",
      "SEQUENCE matters in instructions and narratives. Record first/next/finally or simple numbered stages.",
      "FACT VS INFERENCE must remain separate. An inference should be supported by clues rather than imagination.",
      "EVALUATION comes after understanding. Agree, reject or qualify with reasons and evidence.",
      "PERMANENT ANSWER PATTERN: answer→evidence heard→short explanation."
    ],
    "workedExamples":[
      "“We postponed the trip because the bridge is flooded.” Main idea: trip postponed; reason: flooding.",
      "Speaker lists rising prices, transport costs and food bills, then says families are cutting spending. Main idea: higher living costs are forcing reduced spending.",
      "“First switch off the power, then remove the plug.” Sequence question requires power off before plug removal.",
      "Literal: speaker says meeting begins at9:00; answer is9:00, not an inferred time.",
      "Inference: speaker says road is flooded, buses stopped and pupils stayed home; infer transport/access was disrupted.",
      "Unsupported inference: claiming the school closed permanently goes beyond evidence.",
      "Tone: slow solemn delivery with words loss/regret supports sadness/seriousness.",
      "Tone: quick energetic delivery with “excellent news” supports excitement.",
      "Purpose: “Do not cross the stream during heavy rain…” mainly warns.",
      "Purpose: facts about malaria transmission/symptoms mainly inform.",
      "Critical: one speaker claims “all students learn better at night” but gives one personal example; evidence is insufficient for universal claim.",
      "Qualify: “The suggestion may help some learners, but the speaker gives no evidence it works for everyone.”",
      "Note-taking: “trip→Fri; bus7:30; bring ID+water” preserves key details efficiently.",
      "Contrast marker: “The plan is affordable; however, maintenance is expensive.” Both sides matter.",
      "Cause-effect marker: “Because rainfall increased, the river overflowed.” Rainfall is presented as cause.",
      "Speaker repeats “safety” three times and ends with instructions; repetition signals emphasis."
    ],
    "misconceptions":["trying to write every word","remembering examples but missing main idea","confusing inference with imagination","judging before understanding","ignoring tone clues","choosing purpose from one keyword","missing contrast markers","answering from personal opinion rather than audio evidence"],
    "guidedPractice":["Listen to a short passage and state main idea.","List three supporting details.","Answer four literal questions.","Answer four inferential questions with evidence.","Answer two critical questions.","Identify tone from delivery clues.","Identify speaker purpose.","Take notes using keywords only.","Reconstruct a four-step sequence.","Distinguish three facts from three inferences.","Qualify one overgeneralised claim.","Summarise a two-minute passage in five points."],
    "independentPractice":["Complete an unseen factual audio-style passage.","Complete an unseen persuasive audio-style passage.","Write main idea and four details for each.","Answer literal/inferential/critical questions.","Identify tone and purpose.","Record concise notes during one reading.","Compare notes with full script afterwards.","Explain one inference with two clues.","Reject one unsupported inference.","Evaluate one claim for evidence quality.","Produce a 60-word listening summary.","Reflect on which details were missed and why."],
    "mastery":{"criterion":"Learner identifies main/supporting ideas, answers literal/inferential/critical questions, recognises tone/purpose and evaluates claims with evidence at at least85% accuracy.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-listening-and-speaking-3","classLevel":"JSS2","subject":"English Language","strand":"Listening and Speaking","topic":"Speeches (Intonation, stress and Rhythms)",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":35},
    "objectives":["Recognise and produce appropriate sentence stress","Use rising/falling intonation to signal meaning","Maintain understandable English rhythm in connected speech"],
    "prerequisites":["word stress","syllables","basic sentence types"],
    "teaching":[
      "STRESS makes a syllable or word more prominent through a combination of loudness, length and pitch movement; it is not simply shouting.",
      "WORD STRESS belongs to particular syllables in multi-syllable words. Wrong stress may reduce intelligibility even when sounds are correct.",
      "SENTENCE STRESS normally gives prominence to content words such as main nouns, verbs, adjectives and adverbs while many grammatical words are weaker.",
      "CONTRASTIVE STRESS moves prominence to the word being corrected or contrasted.",
      "NEW INFORMATION often receives stronger stress than information already known.",
      "INTONATION is pitch movement across an utterance, not the pitch of one isolated word.",
      "FALLING INTONATION commonly accompanies complete statements, commands and many wh-questions.",
      "RISING INTONATION commonly occurs in neutral yes/no questions and can show uncertainty or checking.",
      "FALL-RISE may signal reservation, partial agreement or implication depending on context; learners should understand function rather than memorise one rigid rule.",
      "LISTS often use continuing/rising movement on non-final items and a fall on the final item.",
      "RHYTHM comes from alternating prominent and less prominent syllables/words and grouping speech into sense units.",
      "WEAK FORMS of common grammatical words help natural rhythm, but clarity is more important than forced imitation.",
      "PAUSING should follow meaning groups, not break randomly inside a phrase.",
      "Changing stress can change implied meaning even when words are identical.",
      "SPEECH PRACTICE should move from marked script→slow rehearsal→natural delivery→self-recording.",
      "PERMANENT METHOD: decide meaning→mark focus word(s)→choose pitch movement→group into sense units→deliver→listen back."
    ],
    "workedExamples":[
      "“I wanted the BLUE pen.” BLUE contrasts colour.",
      "“I WANTED the blue pen.” WANTED contrasts desire with another action.",
      "“I wanted the blue PEN.” PEN contrasts object.",
      "“Are you ready?” often uses rising intonation for a genuine yes/no question.",
      "“Where are you going?” commonly falls because it is a wh-question seeking information.",
      "“Sit down.” commonly falls as a complete command.",
      "List: “We bought rice↗, beans↗, oil↗ and bread↘.” Final item closes the list.",
      "“It is good…but expensive.” A fall-rise-like contour on good can signal reservation.",
      "“She bought a NEW bag” stresses new when newness is important.",
      "Known/new: “Who won?” “MARY won.” Mary takes focus because it answers new information.",
      "Correction: “Did Tunde go Tuesday?” “No, he went WEDNESDAY.” Wednesday receives contrastive stress.",
      "Sense groups: “After the meeting / the students returned to class / quietly.”",
      "Poor rhythm: stressing every small word equally makes speech heavy and unnatural.",
      "Poor pausing: “The principal / of the school announced…” may split a noun phrase awkwardly; better “The principal of the school / announced…”",
      "Falling confirmation: “You submitted it, didn’t you↘?” can show expectation of yes.",
      "Rising checking: “You submitted it, didn’t you↗?” can show genuine uncertainty."
    ],
    "misconceptions":["shouting instead of stressing","stressing every word equally","flat pitch on every sentence","one intonation rule for all contexts","pausing randomly","ignoring meaning when marking stress","treating rhythm as speaking very fast","copying an accent rather than aiming for clarity"],
    "guidedPractice":["Mark focus word in eight contrast sentences.","Read one sentence with three different focus meanings.","Mark rise/fall on ten sentence types.","Practise list intonation.","Mark sense groups in a short paragraph.","Read paragraph with planned pauses.","Identify stressed content words in six sentences.","Reduce stress on function words without losing clarity.","Perform wh-questions and yes/no questions.","Perform same tag question with rising and falling meanings.","Record a 30-second speech.","Replay and identify one stress, one pitch and one rhythm improvement."],
    "independentPractice":["Prepare a one-minute speech and mark stress.","Mark pitch arrows for key sentences.","Mark pause boundaries.","Deliver once slowly, once naturally.","Record and compare versions.","Create five contrastive-stress pairs.","Write five yes/no and five wh-questions and perform them.","Read a short list with correct continuation/final movement.","Identify stress changes in ten supplied sentences.","Explain meaning difference caused by stress in three pairs.","Self-assess intelligibility/rhythm rather than accent similarity.","Give final one-minute delivery using planned focus and intonation."],
    "mastery":{"criterion":"Learner uses sentence/contrastive stress, appropriate pitch movement, sense-group pausing and intelligible rhythm to express intended meaning at at least85% accuracy.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-listening-and-speaking-4","classLevel":"JSS2","subject":"English Language","strand":"Listening and Speaking","topic":"Speeches: Question tags",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":36},
    "objectives":["Form grammatically correct question tags","Choose positive/negative polarity appropriately","Use intonation to distinguish genuine questions from confirmation-seeking tags"],
    "prerequisites":["auxiliary verbs","pronouns","positive/negative statements"],
    "teaching":[
      "A QUESTION TAG is a short question added to a statement to seek confirmation, check information or involve the listener.",
      "BASIC POLARITY: positive statement usually takes negative tag; negative statement takes positive tag.",
      "COPY THE AUXILIARY OR MODAL from the statement: is→isn’t, has→hasn’t, can→can’t, will→won’t.",
      "If a simple present/past statement has no auxiliary, use DO/DOES/DID according to tense and subject.",
      "TAG SUBJECT is normally a pronoun matching the statement subject.",
      "BE forms must agree: I am→aren’t I? in standard tag usage; he is→isn’t he?; they were→weren’t they?",
      "HAVE as auxiliary stays have/has/had in the tag; lexical have may use do-support in many standard school contexts.",
      "MODALS remain the same modal in the tag: should→shouldn’t, must→mustn’t, could→couldn’t.",
      "NEGATIVE WORDS such as never, nobody, nothing, hardly, scarcely give the statement negative meaning, so the tag is positive.",
      "IMPERATIVE TAGS can use will you?/won’t you? depending tone; suggestions with Let’s commonly take shall we?",
      "THIS/THAT usually becomes it in the tag; THESE/THOSE become they.",
      "EVERYONE/SOMEONE/NOBODY commonly takes they in modern standard usage.",
      "RISING INTONATION signals genuine uncertainty/checking; FALLING intonation often seeks confirmation of an expectation.",
      "PUNCTUATION: comma before the tag and question mark at the end.",
      "PERMANENT METHOD: identify polarity→find auxiliary/tense→choose pronoun→reverse polarity→choose intonation."
    ],
    "workedExamples":[
      "She is ready, isn’t she?",
      "They aren’t late, are they?",
      "You can swim, can’t you?",
      "He will come, won’t he?",
      "Tunde plays football, doesn’t he?",
      "Ada visited yesterday, didn’t she?",
      "The boys have finished, haven’t they?",
      "Musa had left, hadn’t he?",
      "You should apologise, shouldn’t you?",
      "Nobody called, did they? Nobody makes the statement negative.",
      "She never complains, does she?",
      "This is yours, isn’t it?",
      "Those are ripe, aren’t they?",
      "Everyone arrived, didn’t they?",
      "Let’s begin, shall we?",
      "Open the window, will you?",
      "You submitted it, didn’t you↗? Rising can show uncertainty.",
      "You submitted it, didn’t you↘? Falling can show expectation of confirmation."
    ],
    "misconceptions":["same polarity in statement and tag","using noun instead of pronoun","changing tense","forgetting do-support","ignoring negative words like never/nobody","using wrong pronoun for this/that/everyone","assuming intonation never changes meaning","forgetting comma/question mark"],
    "guidedPractice":["Add tags to five be-sentences.","Add tags to five modal sentences.","Add tags to five simple present/past lexical-verb sentences.","Add tags to sentences with never/nobody.","Practise this/that/these/those tags.","Practise everyone/someone tags.","Complete Let’s… tags.","Complete imperative tags.","Explain auxiliary choice in six examples.","Read five tags with rising intonation.","Read same five with falling intonation.","Explain meaning difference between rise and fall."],
    "independentPractice":["Write ten positive statements with negative tags.","Write ten negative statements with positive tags.","Create five modal-tag examples.","Create five do-support examples.","Create three negative-word examples.","Create examples with this/that/these/those.","Create two Let’s examples.","Create two imperative examples.","Punctuate ten unpunctuated tag sentences.","Correct ten faulty tags.","Record five rising tags and five falling tags.","Explain one case where intonation changes speaker attitude."],
    "mastery":{"criterion":"Learner forms tags accurately across auxiliaries, modals, do-support, negative words and special pronouns, and uses rising/falling intonation appropriately at at least85%.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-grammatical-accuracy-1","classLevel":"JSS2","subject":"English Language","strand":"Grammatical Accuracy","topic":"Parts of speech: Nouns, Pronouns, verbs and Adjectives",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":38},
    "objectives":["Identify nouns, pronouns, verbs and adjectives in context","State their grammatical functions","Use each category accurately in original sentences"],
    "prerequisites":["basic sentence parts","JSS1 parts of speech"],
    "teaching":[
      "PARTS OF SPEECH are identified by what a word does in a sentence, not by memorised word lists alone.",
      "NOUNS can name people, places, things, events, qualities and ideas. Common types include common/proper, concrete/abstract and count/non-count.",
      "NOUN FUNCTIONS include subject, object, complement and object of a preposition.",
      "PRONOUNS replace or point to noun phrases. Types include personal, possessive, reflexive, demonstrative, relative, interrogative and indefinite.",
      "PRONOUN REFERENCE should be clear. A reader must know which noun a pronoun refers to.",
      "PRONOUN AGREEMENT should fit number/person and context.",
      "VERBS express actions, events, processes or states. A complete clause normally needs a verb phrase.",
      "LEXICAL/MAIN VERBS carry core meaning; AUXILIARY VERBS help express tense, aspect, voice, question formation or modality.",
      "TRANSITIVE VERBS take objects; INTRANSITIVE VERBS do not take direct objects in that use.",
      "LINKING VERBS connect the subject to a complement, as in “The soup tastes good.”",
      "ADJECTIVES describe or classify nouns and pronouns. They may come before nouns or after linking verbs.",
      "COMPARATIVE/SUPERLATIVE forms compare: taller/tallest, more careful/most careful.",
      "THE SAME WORD CAN CHANGE CLASS by function: light is noun in “the light”, adjective in “a light bag”, verb in “light the lamp”.",
      "WORD POSITION HELPS but meaning and grammatical behaviour must confirm classification.",
      "ACCURATE USE matters more than labels: agreement, verb form, pronoun reference and adjective placement must produce a grammatical sentence.",
      "PERMANENT METHOD: locate word→ask its job→test surrounding structure→classify→state function."
    ],
    "workedExamples":[
      "“Those diligent students completed it.” students=noun, diligent=adjective, completed=verb, it=pronoun.",
      "“The teacher praised Musa.” teacher=subject noun; Musa=object noun.",
      "“Honesty matters.” Honesty is an abstract noun functioning as subject.",
      "“The bottle is on the table.” table is noun inside prepositional phrase.",
      "“They helped us.” They=subject pronoun; us=object pronoun.",
      "“Amina taught herself.” herself is reflexive pronoun referring to Amina.",
      "“This is mine.” This is demonstrative pronoun; mine possessive pronoun.",
      "“The boy who won smiled.” who is relative pronoun introducing a relative clause.",
      "“She has finished.” finished is main verb; has is auxiliary.",
      "“They are running.” are helps form progressive verb phrase.",
      "“The baby slept.” slept is intransitive here; no direct object.",
      "“She opened the door.” opened is transitive; door is direct object.",
      "“The soup tastes delicious.” tastes is linking verb; delicious is adjective complement.",
      "“a careful driver” places adjective before noun.",
      "“The driver is careful” uses adjective after linking verb.",
      "“This road is narrower than that one.” narrower is comparative adjective.",
      "“She is the most careful student.” most careful is superlative form.",
      "“Light the lamp.” light is verb; “a light bag” light is adjective; “turn on the light” light is noun."
    ],
    "misconceptions":["classifying from dictionary label only","confusing noun with pronoun","calling every action-looking word a verb without checking use","assuming adjectives only appear before nouns","ignoring linking verbs","unclear pronoun reference","treating auxiliary and main verb as identical functions","forgetting same word can change class"],
    "guidedPractice":["Classify target words in ten sentences.","Identify noun function in six sentences.","Identify pronoun type/reference in six sentences.","Separate auxiliary from main verbs.","Classify verbs as transitive/intransitive/linking in context.","Identify adjective positions.","Form comparative/superlative adjectives.","Rewrite unclear pronoun references.","Use one word as two different classes.","Analyse a short paragraph and justify twelve classifications.","Correct subject-pronoun agreement errors.","Write one sentence illustrating each major category."],
    "independentPractice":["Analyse twenty target words in an unseen paragraph.","Identify six noun functions.","Identify eight pronoun types.","Correct five pronoun-reference errors.","Identify main/auxiliary verbs in ten clauses.","Classify ten verbs by use.","Identify twelve adjectives and nouns modified.","Write comparative/superlative sentences.","Use light,fast,round as different word classes in context.","Edit a paragraph with parts-of-speech errors.","Write eight original sentences combining noun+pronoun+verb+adjective accurately.","Explain why function in context is more reliable than memorised lists."],
    "mastery":{"criterion":"Learner identifies and uses nouns, pronouns, verbs and adjectives by contextual function, including subtypes and sentence roles, with at least85% accuracy.","status":"DEEP_WHEN_PASSED"},"boardReady":true
  },
  {
    "topicId":"nerdc-jss2-english-grammatical-accuracy-2","classLevel":"JSS2","subject":"English Language","strand":"Grammatical Accuracy","topic":"Parts of speech: Adverbs, Conjunctions and Prepositions",
    "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":39},
    "objectives":["Identify adverbs, conjunctions and prepositions","Explain their functions in sentences","Use them accurately to create relationships of manner, time, place, reason and connection"],
    "prerequisites":["verbs/adjectives","phrases and clauses"],
    "teaching":[
      "ADVERBS modify verbs, adjectives, other adverbs or sometimes whole clauses.",
      "ADVERB TYPES include manner, time, place, frequency, degree and viewpoint/comment.",
      "NOT EVERY -LY WORD IS AN ADVERB. Friendly and lovely are commonly adjectives; fast can be an adverb without -ly.",
      "ADVERB POSITION can affect emphasis and sometimes meaning: “Only Ada answered” differs from “Ada only answered.”",
      "COORDINATING CONJUNCTIONS join equal grammatical units, such as and, but, or, so, yet.",
      "SUBORDINATING CONJUNCTIONS introduce dependent clauses showing relationships such as time, cause, condition, contrast and purpose.",
      "CORRELATIVE PAIRS work together: either…or, neither…nor, both…and, not only…but also.",
      "PREPOSITIONS introduce noun phrases and express relationships of place, time, direction, means, cause and more.",
      "PLACE PREPOSITIONS distinguish at/in/on/under/between/among/through/towards etc.",
      "TIME PREPOSITIONS often distinguish at for precise times, on for days/dates and in for longer periods, though actual usage must be learned in context.",
      "MOVEMENT differs: at the gate is position, through the gate is movement across the opening, towards the gate is direction without necessarily reaching it.",
      "PREPOSITION VS CONJUNCTION depends on what follows. “After lunch” has preposition+noun; “after we ate” uses subordinating conjunction+clause.",
      "CONJUNCTION CHOICE expresses logic. because gives reason; although gives concession; if gives condition; when gives time.",
      "AVOID DOUBLE MARKING such as “Although…but” in standard formal English.",
      "PARALLEL STRUCTURE helps with conjunction pairs: “She likes reading and writing,” not mismatched forms.",
      "PERMANENT METHOD: identify what the word connects/modifies→inspect what follows→state relationship→test sentence meaning."
    ],
    "workedExamples":[
      "“She spoke softly.” softly modifies verb spoke: manner adverb.",
      "“The test is very difficult.” very modifies adjective difficult: degree adverb.",
      "“He arrived yesterday.” yesterday gives time.",
      "“They often practise.” often gives frequency.",
      "“Come here.” here gives place.",
      "“Fortunately, nobody was hurt.” fortunately comments on whole clause.",
      "“Amina studied and passed.” and coordinates equal verbs/clauses.",
      "“He was tired but continued.” but marks contrast.",
      "“We stayed inside because it rained.” because introduces reason clause.",
      "“Although it rained, they played.” although introduces concession.",
      "“If you revise, you will improve.” if introduces condition.",
      "“Either Musa or Tunde will present.” either…or correlates alternatives.",
      "“The bag is under the table.” under is preposition of place.",
      "“We met at 6 p.m.” at introduces precise time.",
      "“The exam is on Monday.” on introduces day.",
      "“School resumes in September.” in introduces month.",
      "“They walked through the gate.” through shows movement across opening.",
      "“They walked towards the gate.” towards shows direction.",
      "“After lunch, we left.” after=preposition; “After we ate, we left.” after=conjunction.",
      "“She is friendly.” friendly is adjective despite -ly ending; “She spoke kindly.” kindly is adverb."
    ],
    "misconceptions":["every -ly word is adverb","every adverb ends -ly","confusing preposition and conjunction","using although…but together","using because…so together unnecessarily","direct translation of prepositions","wrong time preposition","ignoring adverb position","mismatched correlative conjunctions","forgetting conjunction meaning relationships"],
    "guidedPractice":["Classify twelve adverbs by type.","Identify what each adverb modifies.","Move adverbs and discuss meaning/emphasis.","Join sentence pairs with coordinating conjunctions.","Join clauses with because/although/if/when.","Complete correlative pairs.","Choose correct place prepositions.","Choose at/on/in for time examples.","Distinguish after/before/since as preposition vs conjunction.","Correct although…but errors.","Correct mismatched either…or structures.","Write one sentence for each major adverb/conjunction/preposition use."],
    "independentPractice":["Analyse an unseen paragraph for twenty targets.","Classify ten adverbs by function.","Rewrite five sentences with better adverb placement.","Combine ten clause pairs using suitable conjunctions.","Write five condition/concession/reason/time complex sentences.","Complete six correlative constructions.","Fill twelve preposition gaps with justification.","Contrast in/on/at place uses.","Contrast at/on/in time uses.","Identify preposition vs conjunction in ten ambiguous examples.","Edit a paragraph with ten errors.","Write a coherent paragraph using at least four adverb types, four conjunction relationships and six prepositions."],
    "mastery":{"criterion":"Learner identifies and uses adverbs, conjunctions and prepositions by function and relationship, including ambiguous forms, with at least85% accuracy in unseen contexts.","status":"DEEP_WHEN_PASSED"},"boardReady":true
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
