export type DeepJss3EnglishLesson={
 topicId:string; classLevel:'JSS3'; subject:'English Language'; strand:'Reading'|'Writing'|'Listening and Speaking'|'Grammatical Accuracy'|'Literature'; topic:string;
 source:{authority:'NERDC';url:string;page:number}; objectives:string[]; prerequisites:string[];
 teaching:string[]; workedExamples:string[]; misconceptions:string[]; guidedPractice:string[]; independentPractice:string[];
 mastery:{criterion:string;status:'DEEP_WHEN_PASSED'}; boardReady:true;
};

/** AVORA-authored JSS3 English deep teaching layer mapped to official NERDC topics. */
export const jss3EnglishDeepLessons:DeepJss3EnglishLesson[]=[
{
  "topicId":"nerdc-jss3-english-reading-1",
  "classLevel":"JSS3","subject":"English Language","strand":"Reading","topic":"Reading for critical evaluation",
  "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":49},
  "objectives":["Evaluate a text by distinguishing facts, opinions, assumptions and conclusions","Identify writer intention, tone and evidence","Judge whether claims are relevant, sufficient and logically supported","Recognise bias, loaded language and overgeneralisation"],
  "prerequisites":["JSS2 critical reading","writer purpose","fact and opinion","main/supporting ideas"],
  "teaching":[
    "CRITICAL EVALUATION begins with accurate comprehension. First state what the writer claims before deciding whether the claim is convincing.",
    "A CLAIM is an assertion the writer wants the reader to accept. EVIDENCE is the material offered to support that claim.",
    "FACT can in principle be checked against reliable evidence. OPINION expresses judgement or belief. An opinion is not automatically false; it needs support when used as an argument.",
    "ASSUMPTION is an unstated idea the writer takes for granted. Good evaluation makes hidden assumptions visible and tests whether they are reasonable.",
    "RELEVANCE asks whether the evidence actually relates to the claim. A true fact can still be irrelevant.",
    "SUFFICIENCY asks whether there is enough evidence. One example rarely proves a universal claim.",
    "REPRESENTATIVENESS asks whether evidence comes from a fair range rather than a narrow or unusual case.",
    "SOURCE QUALITY matters. Named, traceable, appropriately expert sources generally deserve more weight than anonymous assertions, though every source can still be questioned.",
    "LOADED LANGUAGE uses emotionally charged wording to influence response: words such as disgraceful, glorious, disastrous or lazy may signal attitude.",
    "OVERGENERALISATION uses words such as all, always, never or everyone without adequate evidence.",
    "FALSE CAUSE occurs when a writer assumes that because one event followed another, the first must have caused the second.",
    "ONE-SIDED ARGUMENT may ignore strong counter-evidence. A balanced writer may acknowledge limitations or opposing views before responding.",
    "TONE can reveal attitude: approving, sceptical, angry, dismissive, cautious, urgent or balanced. Tone must be supported by diction and sentence choices.",
    "CONCLUSION should follow from the evidence presented. A strong ending does not repair weak evidence.",
    "CRITICAL RESPONSE FORMAT: claim→evidence→strength/weakness→reason→balanced judgement.",
    "PERMANENT RULE: disagreement is not evaluation. Every judgement must point to something in the text."
  ],
  "workedExamples":[
    "Claim: “All teenagers waste money.” Evidence: one teenager interviewed at a shopping mall. Evaluation: evidence is too narrow and cannot support “all”.",
    "Claim: “School gardens improve nutrition.” Evidence: a report compares participating and non-participating schools and describes method. This is stronger than one anecdote, though methodology still matters.",
    "A writer says “Everyone knows private schools are better.” “Everyone knows” is not evidence; it pressures agreement without proof.",
    "A passage cites a national survey but gives no date or source. The statistic may be relevant, but source quality cannot yet be checked.",
    "A true fact about football attendance is irrelevant evidence in an argument about whether school libraries improve reading.",
    "A newspaper article uses “reckless, selfish drivers” repeatedly. These loaded words reveal a strongly critical tone.",
    "One learner improves after using an app; writer concludes the app will help every learner. This is an overgeneralisation.",
    "After a school bans phones, exam results rise; writer says the ban caused the rise. Other factors may exist, so the causal claim is not yet established.",
    "An argument for longer school hours gives only advantages and ignores transport, fatigue and staffing. It is one-sided.",
    "A writer presents a counterargument, then answers it with evidence. This generally strengthens fairness and logical depth.",
    "“The scheme may reduce congestion, but the evidence is still limited.” The cautious modal may signals qualified rather than absolute judgement.",
    "A conclusion says “Therefore the policy must be adopted nationwide,” but the evidence came from one small town. The conclusion is broader than the evidence.",
    "Fact vs opinion: “The bridge opened in 2018” is checkable; “The bridge is beautiful” is evaluative.",
    "Assumption: “Students will read more if phones are banned” assumes phones are the main reason students read less.",
    "Two articles use the same statistic, but one explains source/method while the other gives none. The first provides stronger evidential transparency.",
    "Balanced judgement: “The writer gives relevant cost figures and acknowledges objections, but the sample is small, so the argument is promising rather than conclusive.”"
  ],
  "misconceptions":["criticising without evidence","treating every opinion as false","assuming statistics are automatically reliable","confusing relevance with truth","accepting universal claims from one example","ignoring hidden assumptions","confusing sequence with causation","judging tone without textual clues","equating disagreement with evaluation","thinking a strong conclusion can compensate for weak evidence"],
  "guidedPractice":[
    "Label claims, evidence, opinions and assumptions in a short editorial.",
    "For six evidence items, decide whether each is relevant to the stated claim.",
    "Rank four evidence sources from stronger to weaker and justify.",
    "Find three loaded words and explain their effect.",
    "Identify two overgeneralisations and rewrite them more cautiously.",
    "Test one cause-effect claim for alternative explanations.",
    "Identify one ignored counterargument.",
    "Write tone + two textual clues for three excerpts.",
    "Evaluate whether a conclusion is proportionate to evidence.",
    "Compare two passages on the same issue for source quality.",
    "Write a claim→evidence→judgement paragraph.",
    "Produce a balanced final evaluation including both one strength and one limitation."
  ],
  "independentPractice":[
    "Evaluate an unseen newspaper-style passage in 180 words.",
    "Evaluate an advertisement for claim, evidence and loaded language.",
    "Evaluate a social-media claim using source and sufficiency checks.",
    "Compare two passages supporting opposite positions and judge which is better supported.",
    "Find five assumptions in supplied short texts.",
    "Identify four examples of overgeneralisation and correct them.",
    "Analyse one weak causal claim.",
    "Distinguish six facts from six opinions in context.",
    "Identify relevant but insufficient evidence in three examples.",
    "Identify true but irrelevant evidence in three examples.",
    "Write a critical paragraph using two direct textual clues without copying long phrases.",
    "Write a final judgement that is qualified rather than absolute."
  ],
  "mastery":{"criterion":"Learner evaluates unfamiliar texts by separating claims/evidence/assumptions, testing relevance, sufficiency, source quality, bias and logic, then writes a balanced evidence-based judgement at at least85% accuracy.","status":"DEEP_WHEN_PASSED"},
  "boardReady":true
},
{
  "topicId":"nerdc-jss3-english-reading-2",
  "classLevel":"JSS3","subject":"English Language","strand":"Reading","topic":"Reading for speed",
  "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":50},
  "objectives":["Apply skimming, scanning and rapid phrase reading appropriately","Adjust reading speed to purpose and difficulty","Increase efficiency while retaining comprehension","Use timed reading strategically in examination conditions"],
  "prerequisites":["JSS2 reading for speed","main ideas","text structure"],
  "teaching":[
    "READING SPEED is purposeful flexibility, not maximum speed. A good reader changes speed according to the task.",
    "SURVEY before reading: title, headings, layout, diagrams, opening and closing can predict structure and likely content.",
    "SKIMMING answers broad questions such as “What is this mainly about?” Read topic sentences, key repeated words, openings and conclusions.",
    "SCANNING locates a specific item such as date, name, price, figure, definition or location. Search visually for the target pattern.",
    "INTENSIVE READING is slower and is required for inference, argument, tone, complex instructions and exact evidence.",
    "PHRASE READING groups words into meaningful chunks rather than treating every word separately.",
    "REGRESSION means moving backwards. Reread only when meaning genuinely breaks, not from habit.",
    "PREVIEW QUESTIONS before a passage when exam instructions permit; this gives the eyes a target.",
    "DIFFICULT WORDS do not always require stopping. Infer from context or move on if they are not central to the question.",
    "TEXT TYPE controls method. Timetable→scan; editorial→skim then intensive evaluation; narrative→flexible reading; instructions→careful sequence reading.",
    "WORDS PER MINUTE = words read÷minutes, but it is meaningless without comprehension score.",
    "EFFICIENCY combines speed and understanding. Faster reading with poor comprehension is regression, not improvement.",
    "TIME BUDGETING: do not spend equal time on every part. Allocate more time to inference/critical questions than simple retrieval.",
    "MARKING KEYWORDS in the question prevents rereading the entire passage for one small detail.",
    "SENSE GROUPS and punctuation help the reader process several words as one meaning unit.",
    "PERMANENT METHOD: define purpose→choose technique→read→answer→check comprehension→adjust speed."
  ],
  "workedExamples":[
    "A timetable question asking departure time requires scanning, not paragraph-by-paragraph reading.",
    "To identify an article’s overall argument, skim heading, introduction, topic sentences and conclusion first.",
    "A question asking why a writer is sarcastic needs intensive rereading of the relevant paragraph.",
    "500 words read in2.5 minutes=200wpm.",
    "500 words in2 minutes with9/10 comprehension is better efficiency than500 words in1 minute with4/10.",
    "A learner scans a price list for ₦ symbols and item names to locate one cost.",
    "A four-digit year can be located rapidly by scanning for number patterns.",
    "Phrase reading: “After the heavy rainfall / several roads in the town / became impossible to use.”",
    "Unnecessary regression: rereading a simple sentence twice even though its meaning is already clear.",
    "Useful regression: returning after a contrast word changes interpretation of the paragraph.",
    "Surveying a chapter’s headings before close reading builds a structure map and can speed later comprehension.",
    "Unknown adjective in a sentence can sometimes be skipped temporarily when the main relationship is still clear.",
    "Question asks two causes; scanning for cause markers such as because, due to and as a result helps locate relevant lines.",
    "A BECE-style passage with ten questions should not be read at identical depth for every answer; retrieval questions can be faster than inference questions.",
    "If a learner reads180wpm with90% comprehension and later210wpm with88%, efficiency improved reasonably.",
    "If speed rises but comprehension falls below mastery threshold, strategy should be adjusted rather than praised."
  ],
  "misconceptions":["speed means rushing","same speed for all texts","scanning can answer deep inference","skimming is random skipping","all rereading is bad","WPM alone measures success","stopping at every unknown word","reading whole passage again for every question","ignoring punctuation and headings","sacrificing comprehension for timer"],
  "guidedPractice":[
    "Survey an unfamiliar two-page text and predict structure.",
    "Skim a 600-word passage and state main idea in one sentence.",
    "Scan a timetable for eight details.",
    "Scan an advert for dates, prices and contacts.",
    "Read a paragraph in marked phrase groups.",
    "Time a400-word passage and calculate WPM.",
    "Answer ten questions and calculate comprehension accuracy.",
    "Repeat with a second passage and compare efficiency.",
    "Choose skim/scan/intensive for twelve tasks and justify.",
    "Identify where rereading is justified in five examples.",
    "Use question keywords to locate answer zones.",
    "Create a realistic time plan for one comprehension passage."
  ],
  "independentPractice":[
    "Complete two timed unseen passages and record WPM+accuracy.",
    "Skim one editorial for position in under a set time.",
    "Scan a transport table for ten facts.",
    "Scan a school notice for dates and requirements.",
    "Perform intensive reading on one inference paragraph.",
    "Mark phrase groups in a difficult paragraph.",
    "Compare first and second timed attempts.",
    "Identify three habits that slow reading unnecessarily.",
    "Identify three cases where slowing down is necessary.",
    "Design a personal exam reading strategy.",
    "Explain why 250wpm at40% comprehension is poor performance.",
    "Set a target that improves speed without dropping below80–85% comprehension."
  ],
  "mastery":{"criterion":"Learner selects and applies surveying/skimming/scanning/intensive reading appropriately and improves timed efficiency while retaining at least85% comprehension on unfamiliar texts.","status":"DEEP_WHEN_PASSED"},
  "boardReady":true
},
{
  "topicId":"nerdc-jss3-english-reading-3",
  "classLevel":"JSS3","subject":"English Language","strand":"Reading","topic":"Reading for summary",
  "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":51},
  "objectives":["Identify central ideas and essential supporting points","Condense a passage without distortion","Paraphrase and combine related ideas","Preserve logical relationships while shortening"],
  "prerequisites":["JSS2 summary reading","paraphrasing","main/supporting ideas"],
  "teaching":[
    "SUMMARY READING comes before summary writing. First understand the text, then decide what deserves to survive compression.",
    "IDENTIFY THE CONTROLLING IDEA of each paragraph. It may be explicit or implied.",
    "DISTINGUISH MAJOR POINTS from examples, anecdotes, quotations, repetition and decorative detail.",
    "GROUP overlapping details under one broader idea when they perform the same function.",
    "PARAPHRASE changes wording and structure while preserving exact meaning.",
    "CAUSE, CONTRAST, CONDITION and CONSEQUENCE must remain intact after compression.",
    "SIGNAL WORDS such as however, therefore, because, although and consequently help reveal relationships.",
    "DO NOT ADD OPINION. A summary reports the source, not the learner’s judgement.",
    "DO NOT STRENGTHEN OR WEAKEN a claim. “May cause” must not become “always causes”.",
    "KEEP NECESSARY NUMBERS only when they are central to the point rather than mere illustration.",
    "COMBINE sentences carefully to avoid changing who did what or why.",
    "PRONOUNS must remain clear after shortening; replace vague copied pronouns when necessary.",
    "WORD LIMIT requires selective compression, not deletion of major ideas.",
    "COHERENCE means summary sentences should connect logically rather than appear as a random list.",
    "FINAL CHECK: coverage, relevance, own words, relationship accuracy, grammar and concision.",
    "PERMANENT METHOD: understand→select→group→paraphrase→connect→compare with source."
  ],
  "workedExamples":[
    "Source gives five examples of sanitation failure. Summary can state one broader point: poor waste disposal and drainage practices create unhealthy conditions.",
    "Three paragraphs on causes, effects and solutions to flooding should normally retain all three functions.",
    "“Because transport fares rose, some workers began walking.” Summary must preserve fare increase as cause and walking as response.",
    "“Although the scheme is cheap, maintenance is difficult.” Summary must preserve concession rather than dropping “although”.",
    "Copied: “Many young people are influenced by social media advertisements.” Paraphrase: “Online advertising can shape young consumers’ choices.”",
    "Bad paraphrase that changes strength: “may increase risk”→“causes the problem” is inaccurate.",
    "A paragraph lists rice, beans, yam and maize as examples of staples; summary may use “staple foods” if individual examples are unnecessary.",
    "A statistic rising from20% to70% may be essential if the paragraph’s main claim is rapid growth.",
    "Two sentences both explain lack of funds; combine them rather than list as two separate points.",
    "An anecdote about one farmer can be removed if it merely illustrates the general effect of drought.",
    "Source uses “they” referring to traders; summary sentence should name “traders” if pronoun would become unclear.",
    "A 150-word draft can be reduced by removing repeated examples before deleting any major point.",
    "If a question focuses on causes, a paragraph about solutions may be omitted from the task-specific summary.",
    "One long sentence containing three unrelated major ideas may be clearer as two concise sentences rather than forced compression.",
    "A summary that adds “This is unfair” introduces opinion not present in source.",
    "Final check should allow the learner to point to source evidence for every retained sentence."
  ],
  "misconceptions":["copying long clauses","deleting a major idea to meet word limit","adding personal opinion","changing cause and consequence","turning cautious claim into absolute claim","counting examples as separate major points","vague pronoun references","paraphrasing by changing only one word","writing disconnected notes when prose is required","summarising information outside the task focus"],
  "guidedPractice":[
    "Identify paragraph main ideas in six paragraphs.",
    "Separate major points from examples in twelve statements.",
    "Combine four overlapping details into one point.",
    "Paraphrase eight sentences without changing meaning.",
    "Preserve cause-effect in three compression tasks.",
    "Preserve contrast/concession in three tasks.",
    "Decide whether four statistics are essential or illustrative.",
    "Repair unclear pronouns in summary sentences.",
    "Reduce a120-word paragraph to60 words.",
    "Compare two candidate summaries for distortion.",
    "Check a draft against a specific summary question.",
    "Create a final coverage checklist."
  ],
  "independentPractice":[
    "Summarise an unseen six-paragraph passage in100 words.",
    "Write a cause-focused summary from a mixed passage.",
    "Write an effects-focused summary from a mixed passage.",
    "Paraphrase ten selected source statements.",
    "Combine repeated ideas from one passage.",
    "Remove irrelevant examples from a draft.",
    "Correct a summary that reverses cause/effect.",
    "Correct a summary that adds opinion.",
    "Reduce an overlong summary by25% without losing major ideas.",
    "Annotate which source paragraph supports each summary sentence.",
    "Compare your final version against source for distortion.",
    "Produce a clean final summary within stated word limit."
  ],
  "mastery":{"criterion":"Learner identifies and condenses major ideas, paraphrases accurately, preserves logical relationships and produces coherent task-focused summaries with at least85% content accuracy.","status":"DEEP_WHEN_PASSED"},
  "boardReady":true
},
{
  "topicId":"nerdc-jss3-english-writing-1",
  "classLevel":"JSS3","subject":"English Language","strand":"Writing","topic":"Revision: various types of composition writing – Narrative, Descriptive, Expository, Argumentative",
  "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":52},
  "objectives":["Plan and write narrative, descriptive, expository and argumentative compositions","Use structures and language appropriate to each genre","Revise for coherence, paragraphing, grammar, audience and BECE-style task fulfilment"],
  "prerequisites":["JSS2 expository/argumentative writing","JSS1 narrative/descriptive writing","outline writing"],
  "teaching":[
    "GENRE CONTROL begins by reading the prompt carefully. The same topic can demand different writing depending on command and purpose.",
    "NARRATIVE WRITING develops events through a situation, rising complication, turning point and meaningful resolution. Events need cause-and-effect, not a random list.",
    "NARRATIVE CHARACTERISATION should appear through action, dialogue and choices rather than long labels.",
    "DESCRIPTIVE WRITING creates a dominant impression using selected sensory detail and spatial or logical order.",
    "DESCRIPTION is not a pile of adjectives. Strong nouns, precise verbs and a few purposeful comparisons are more effective.",
    "EXPOSITORY WRITING explains. Choose structure suited to task: definition, process, classification, cause-effect, compare-contrast or problem-solution.",
    "ARGUMENTATIVE WRITING takes a clear position, supports it with reasons/evidence, addresses a plausible counterargument and rebuts fairly.",
    "INTRODUCTION must fit genre. A narrative can begin in action; exposition may establish scope; argument should establish issue and position.",
    "BODY PARAGRAPHS need one controlling purpose each and enough development.",
    "TRANSITIONS should reflect logic: later/meanwhile for narrative, beside/beyond for description, therefore/however for exposition/argument.",
    "CONCLUSION should complete the genre: resolve/reflect in narrative, leave final impression in description, synthesise explanation in exposition, reinforce judgement in argument.",
    "AUDIENCE and register affect vocabulary, examples and degree of formality.",
    "BECE TASK FULFILMENT: answer every part of the prompt. A beautifully written essay that ignores one required point loses quality.",
    "PLANNING should take a few minutes: interpret prompt→generate ideas→select→order→paragraph plan.",
    "REVISION occurs in layers: content/relevance→organisation→paragraph development→sentence accuracy→spelling/punctuation.",
    "PERMANENT GOLDEN WRITING RULE: specific development beats empty length. Every paragraph must do real work."
  ],
  "workedExamples":[
    "Narrative “The mistake I will never repeat”: opening decision→consequence grows→turning point→lesson; not a general essay about mistakes.",
    "Narrative weak line “I was scared.” Stronger contextual development: “My hand froze on the gate as the siren sounded behind me.”",
    "Dialogue in narrative should reveal action/character, not fill pages with greetings.",
    "Descriptive “A busy market”: organise perhaps entrance→central stalls→food area→sound/smell→overall impression.",
    "Weak description “The market was very very beautiful and nice.” Better: “Red pepper heaps glowed beneath patched umbrellas while traders called across the narrow aisle.”",
    "Spatial order prevents description from jumping randomly between unrelated parts.",
    "Expository “How flooding affects communities”: explain damaged roads, homes, health, business and schooling with cause/effect links.",
    "Expository process “How to prepare for an examination”: sequence planning, revision, practice, rest, exam-day preparation.",
    "Expository compare-contrast can organise public vs private transport by cost, capacity and convenience.",
    "Argument “Phones should be allowed for learning”: position + access to resources + collaboration + controlled-use safeguards.",
    "Counterargument: phones distract. Rebuttal: structured rules, restricted times and teacher supervision can reduce misuse.",
    "Weak argument “Phones are good because they are good.” This is circular assertion, not evidence.",
    "Strong body paragraph contains claim→reason→example/evidence→link back to position.",
    "Prompt asks “Describe your school during inter-house sports.” Writing history of the school is off-task.",
    "A conclusion to an argument should not suddenly introduce a brand-new reason.",
    "A conclusion to narrative may reflect on consequence without preaching unrelated moral lessons.",
    "Revision example: remove a paragraph that repeats the same reason in different words.",
    "Task audit: if prompt asks causes AND solutions, an essay covering only causes is incomplete."
  ],
  "misconceptions":["mixing genres unintentionally","memorised generic introductions","narrative without turning point","description as adjective list","exposition becoming opinion rant","argument without evidence","counterargument treated as insult","one-paragraph essay","new major idea in conclusion","ignoring one part of prompt","padding with repetition","editing grammar before fixing missing content"],
  "guidedPractice":[
    "Classify twelve prompts by genre.",
    "Rewrite four prompts as precise task demands.",
    "Outline one narrative with turning point.",
    "Outline one descriptive piece using spatial order.",
    "Outline one cause-effect exposition.",
    "Outline one argument with counterargument.",
    "Develop a narrative event into a full paragraph.",
    "Develop one sensory description paragraph.",
    "Develop one expository paragraph with explanation.",
    "Develop one argument paragraph with evidence.",
    "Repair an off-task introduction.",
    "Use a genre-specific revision checklist on a draft."
  ],
  "independentPractice":[
    "Write a complete narrative of350–450 words.",
    "Write a complete descriptive composition of350–450 words.",
    "Write a complete expository composition of350–450 words.",
    "Write a complete argumentative composition of350–450 words.",
    "Create an outline before each composition.",
    "Underline each paragraph’s controlling purpose.",
    "Identify turning point in narrative.",
    "Identify dominant impression in description.",
    "Identify explanatory structure in exposition.",
    "Identify claim/evidence/counterargument in argument.",
    "Revise one draft by cutting repetition.",
    "Perform final BECE-style task-fulfilment audit."
  ],
  "mastery":{"criterion":"Learner selects and controls narrative, descriptive, expository and argumentative forms, fully answers unfamiliar prompts, develops paragraphs with genre-appropriate evidence/detail and revises to at least85% standard.","status":"DEEP_WHEN_PASSED"},
  "boardReady":true
},
{
  "topicId":"nerdc-jss3-english-writing-2",
  "classLevel":"JSS3","subject":"English Language","strand":"Writing","topic":"Revision: Letter writing: informal and formal",
  "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":53},
  "objectives":["Distinguish formal and informal letters by purpose, audience, layout and register","Write correctly structured formal and informal letters","Maintain appropriate tone, paragraphing and conventions","Handle complaint, request, enquiry, application/advice and personal letter tasks"],
  "prerequisites":["JSS2 formal/informal letters","audience and register"],
  "teaching":[
    "LETTER TYPE depends on relationship and purpose. Friend/relative usually informal; institution/official role usually formal.",
    "FORMAL LETTERS are precise, respectful and economical. Informal letters are personal and warm but still organised.",
    "FORMAT is not decoration. Address, date, salutation, title where required, body and closing help signal the relationship and purpose.",
    "FORMAL PURPOSE should appear early: request, complaint, enquiry, application or recommendation.",
    "A COMPLAINT should state facts, dates/details, effects and requested remedy. Abuse weakens the letter.",
    "A REQUEST should explain exactly what action is wanted and why.",
    "AN ENQUIRY should ask clear specific questions instead of vague “send me everything”.",
    "AN APPLICATION should connect the writer’s relevant qualities/experience to the role or opportunity.",
    "INFORMAL LETTERS should respond naturally to the relationship, share relevant events/thoughts and often ask after the recipient.",
    "REGISTER CONSISTENCY matters. Do not begin “Dear Sir” and then use emojis, slang or chat abbreviations.",
    "PARAGRAPHING should separate opening/purpose, development/details and closing/action.",
    "SALUTATION and closing must match accepted school conventions consistently.",
    "CONTENT beats memorised format. A correctly formatted letter that does not answer the prompt is weak.",
    "AUDIENCE CHECK asks: what does the reader already know, what do they need, and what tone will achieve the purpose?",
    "REVISION CHECKS format separately from content and language.",
    "PERMANENT METHOD: identify audience→choose type→state purpose→organise details→use matching register→close appropriately→edit."
  ],
  "workedExamples":[
    "Formal complaint about broken streetlights: identify location, duration, safety effect and request repair.",
    "Formal request to principal for extended library hours: explain learner need, proposed time and expected benefit.",
    "Formal enquiry about scholarship: ask deadline, eligibility, documents and submission method.",
    "Formal application for school prefect role: state interest, relevant responsibilities and qualities rather than vague praise of self.",
    "Formal recommendation to local authority on waste disposal: problem→evidence→practical proposal.",
    "Informal letter to cousin about changing schools: personal greeting→experience→feelings→questions→warm close.",
    "Informal advice letter to younger sibling: acknowledge problem, give reasons, concrete suggestions and encouragement.",
    "Wrong register: “Dear Sir, what’s up, I need this fixed ASAP 😂.”",
    "Improved formal opening: “I am writing to report the persistent water shortage affecting Block B…”",
    "Weak complaint: “Your service is useless.” Strong: “The service has been unavailable for six days, affecting…”",
    "Purpose should appear in first paragraph of formal request, not after two paragraphs of background.",
    "Title example: REQUEST FOR REPAIR OF DAMAGED CLASSROOM WINDOWS.",
    "Dear Sir/Madam commonly pairs with Yours faithfully in school convention.",
    "A named formal recipient such as Dear Mr Bello commonly pairs with Yours sincerely.",
    "Informal paragraph should not sound like official report; personal voice is appropriate.",
    "A formal conclusion should state requested next action or thanks without emotional begging.",
    "Prompt asks letter to friend describing three changes; all three must be covered clearly.",
    "Prompt asks complaint plus suggestions; giving only complaint is incomplete task fulfilment."
  ],
  "misconceptions":["mixing formal/informal register","chat abbreviations in formal writing","purpose buried late","one huge paragraph","abusive complaint language","wrong closing convention","memorised address format but missing content","informal letter written like impersonal essay","ignoring one task requirement","adding irrelevant life story to formal request"],
  "guidedPractice":[
    "Classify ten letter prompts formal/informal.",
    "Match salutations and closings.",
    "Repair layout errors in a formal letter.",
    "Rewrite slang into appropriate formal register.",
    "Write a complaint opening.",
    "Write a request body paragraph.",
    "Write a clear enquiry paragraph with four questions.",
    "Write a personal informal opening.",
    "Organise six mixed paragraphs into logical order.",
    "Check a prompt for all required content points.",
    "Edit a letter for register consistency.",
    "Use full format/content/audience checklist."
  ],
  "independentPractice":[
    "Write formal complaint letter.",
    "Write formal request letter.",
    "Write formal enquiry letter.",
    "Write formal application letter.",
    "Write informal letter describing an important event.",
    "Write informal advice letter.",
    "Write informal congratulatory letter.",
    "Revise a faulty formal letter.",
    "Convert a chat-style message into formal letter.",
    "Audit one letter for every prompt requirement.",
    "Audit salutation/closing/paragraphing/register.",
    "Produce one timed BECE-style formal and one timed informal letter."
  ],
  "mastery":{"criterion":"Learner selects correct type, uses accurate layout/register, develops all prompt requirements, organises formal and informal letters effectively and edits to at least85% standard.","status":"DEEP_WHEN_PASSED"},
  "boardReady":true
},
{
  "topicId":"nerdc-jss3-english-writing-3",
  "classLevel":"JSS3","subject":"English Language","strand":"Writing","topic":"Summary writing",
  "source":{"authority":"NERDC","url":"https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf","page":54},
  "objectives":["Extract only the points demanded by a summary question","Express selected points concisely in original language","Write grammatically complete independent answers","Avoid duplication, distortion and irrelevant detail"],
  "prerequisites":["JSS2 summary writing","reading for summary","paraphrasing","sentence construction"],
  "teaching":[
    "EXAM SUMMARY begins with the QUESTION, not the passage. Identify exactly what must be supplied: causes, effects, advantages, problems, solutions or another category.",
    "THE SAME PASSAGE may contain many ideas, but only ideas answering the demand earn marks.",
    "COUNT REQUIRED POINTS before drafting. If six points are required, find six distinct ideas rather than six examples of two ideas.",
    "ONE POINT should express one complete idea unless the task specifically allows combined related information.",
    "PARAPHRASE accurately. Change language and structure while preserving precise meaning.",
    "A SUMMARY SENTENCE should be grammatically independent when the instruction demands sentences.",
    "REMOVE EXAMPLES, quotations, repetition and explanation that do not carry an additional required point.",
    "AVOID DUPLICATION: “lack of money” and “insufficient funds” are the same point unless context distinguishes them.",
    "DO NOT ADD OPINION, recommendation or outside knowledge.",
    "DO NOT OVERGENERALISE. Preserve words such as some, may, often when they are important to accuracy.",
    "PRONOUNS copied from passage may lose their referent. Replace with clear nouns where necessary.",
    "VERB FORMS and agreement still matter; summary marking does not excuse poor grammar.",
    "CONCISION is achieved by strong verbs and direct structures, not fragments.",
    "POINT AUDIT: after drafting, label each answer P1,P2… and verify each against one source idea.",
    "LANGUAGE AUDIT: remove copied phrases where a natural paraphrase is possible without distortion.",
    "PERMANENT METHOD: read demand→mark relevant zones→extract distinct points→paraphrase→write complete sentences→audit point count and accuracy."
  ],
  "workedExamples":[
    "Question asks causes of unemployment. Passage also gives effects and solutions; those must be excluded.",
    "Source: “Poor roads delay the movement of farm produce.” Summary: “Bad roads slow the transportation of agricultural goods.”",
    "Source: “Many graduates lack the practical skills employers require.” Summary: “Some graduates do not possess skills needed for available jobs.”",
    "Two examples of high transport cost and expensive fuel may support one broader point about rising transport expenses.",
    "Bad duplicate points: “There is inadequate funding” and “Money is insufficient.” Count as one idea.",
    "Bad fragment: “Because of poor roads.” Better: “Poor roads delay the movement of goods.”",
    "Bad opinion: “Government is wicked for not fixing roads.” This is not a source summary point.",
    "Bad strength change: source says “can reduce output”; summary says “always destroys output.”",
    "Question requests four effects; writing five does not guarantee extra marks and may create duplication/errors.",
    "Source pronoun “they” refers to rural farmers; summary should write “Rural farmers…” if context would otherwise be lost.",
    "Long copied clause can often be compressed into subject+strong verb+object.",
    "“Due to the fact that prices are high”→“High prices…” is more concise.",
    "If two sentences explain different effects—school absence and lost income—they remain separate points.",
    "If three sentences give examples of one effect—lateness—they should not be counted as three points.",
    "A final audit can catch six written answers containing only five distinct ideas.",
    "Traceability check: every point should be locatable in passage without importing outside knowledge."
  ],
  "misconceptions":["lifting entire clauses","answering outside demand","splitting one point into duplicates","fragments","adding personal opinion","changing degree of certainty","unclear pronouns","missing requested number of points","using examples as separate points","assuming longer answer scores more"],
  "guidedPractice":[
    "Identify demand words in eight summary questions.",
    "From twelve candidate ideas select only six relevant points.",
    "Detect duplicates in ten candidate answers.",
    "Paraphrase eight source sentences.",
    "Turn six fragments into complete concise sentences.",
    "Remove opinion from four faulty answers.",
    "Correct four overgeneralisations.",
    "Repair unclear pronouns.",
    "Reduce wordy points without losing meaning.",
    "Label P1–P6 and verify source location.",
    "Compare two six-point answers and judge which contains more distinct points.",
    "Complete one timed summary question."
  ],
  "independentPractice":[
    "Complete two full BECE-style summary tasks.",
    "Extract six causes from an unseen passage.",
    "Extract five effects from another passage.",
    "Paraphrase ten selected source ideas.",
    "Find duplicates in a flawed eight-point answer.",
    "Correct six sentence fragments.",
    "Remove irrelevant details from a draft.",
    "Reduce a verbose six-point answer by30%.",
    "Audit grammar/agreement in summary sentences.",
    "Verify every point against source.",
    "Check exact number of distinct points.",
    "Produce final timed response with full accuracy checklist."
  ],
  "mastery":{"criterion":"Learner extracts the exact required distinct points, paraphrases accurately, writes complete concise sentences and avoids duplication/opinion/distortion with at least85% success on unfamiliar BECE-style tasks.","status":"DEEP_WHEN_PASSED"},
  "boardReady":true
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
