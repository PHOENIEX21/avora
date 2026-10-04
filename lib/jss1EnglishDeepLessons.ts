export type DeepJss1EnglishLesson={
 topicId:string; classLevel:'JSS1'; subject:'English Language'; strand:'Reading'|'Writing'|'Listening and Speaking'|'Grammatical Accuracy'|'Literature'; topic:string;
 source:{authority:'NERDC';url:string;page:number}; objectives:string[]; prerequisites:string[];
 teaching:string[]; workedExamples:string[]; misconceptions:string[]; guidedPractice:string[]; independentPractice:string[];
 mastery:{criterion:string;status:'DEEP_WHEN_PASSED'}; boardReady:true;
};


/**
 * AVORA-authored JSS1 English Studies teaching layer.
 * NERDC controls scope and performance objectives. AVORA independently authors
 * explanations, examples, practice, misconception treatment and mastery tasks.
 */
export const jss1EnglishDeepLessons:DeepJss1EnglishLesson[]=[
  {
    "topicId": "nerdc-jss1-english-reading-1",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading for maximum retention and recall (Intensive Reading)",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 1
    },
    "objectives": [
      "Preview a passage before close reading",
      "Read a passage carefully for maximum retention",
      "Recall salient points after reading",
      "Review the passage and use a deliberate reading strategy"
    ],
    "prerequisites": [
      "basic sentence reading",
      "recognising paragraphs and headings"
    ],
    "teaching": [
      "Intensive reading is slow, purposeful reading used when the learner must understand and remember important information rather than merely finish the text.",
      "Before reading closely, preview the title, headings, pictures and first/last sentences. Turn the preview into questions so reading has a purpose.",
      "During close reading, pause after each paragraph to state its key idea in your own words and note only essential facts rather than copying whole sentences.",
      "After reading, close the text and recall the main ideas from memory. Then reopen it to check omissions or distortions. This retrieval step strengthens retention.",
      "AVORA uses a preview–question–read–recall–review cycle: anticipate, read for answers, retrieve without looking, then verify and correct."
    ],
    "workedExamples": [
      "A passage titled “Safe Drinking Water” has three paragraphs. Preview predicts meaning and safety advice; close reading identifies two main safety practices; recall states them without looking; review checks the exact evidence.",
      "After reading a short health passage, a learner writes five copied sentences. AVORA reduces them to three memory cues: problem, cause, prevention, then asks the learner to explain each cue aloud."
    ],
    "misconceptions": [
      "skipping preview and reading without a purpose",
      "highlighting almost every sentence",
      "mistaking copying for recall",
      "reviewing only by rereading and never retrieving from memory"
    ],
    "guidedPractice": [
      "Preview a 250-word passage, write three questions, read once carefully, hide it, state four salient points, then reopen and correct the recall."
    ],
    "independentPractice": [
      "Complete two unfamiliar passages using the full strategy; produce a short recall note after a delay and answer factual plus inference questions."
    ],
    "mastery": {
      "criterion": "At least 80% on retention questions and an accurate oral/written recall of the main ideas after the passage is hidden.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-reading-2",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading for main and supporting ideas",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 2
    },
    "objectives": [
      "Identify main ideas in a passage",
      "Identify supporting ideas",
      "Differentiate main ideas from supporting details"
    ],
    "prerequisites": [
      "paragraph meaning",
      "simple comprehension"
    ],
    "teaching": [
      "The main idea is the central message a paragraph or passage is communicating. Supporting ideas explain, prove, illustrate or develop that central message.",
      "A topic is only what the paragraph is about; a main idea is what the writer says about that topic. “Road safety” is a topic, while “seat belts reduce serious injuries” is a main idea.",
      "Look for repeated concepts, topic sentences, examples and explanations. Ask: if I could keep only one sentence or thought, which one would preserve the paragraph’s meaning?",
      "Supporting details may be examples, reasons, facts, descriptions or consequences. Remove a detail mentally: if the central message still stands, it is likely supporting rather than main.",
      "Some paragraphs place the main idea at the beginning, middle or end, while others imply it; learners must use the whole paragraph, not position alone."
    ],
    "workedExamples": [
      "Paragraph: “Trees cool streets, reduce erosion and provide shade. Communities should protect urban trees.” Main idea: communities benefit from and should protect trees; the listed benefits support it.",
      "“Three buses left late because of heavy rain, a flooded junction and poor visibility.” Main idea: bad weather delayed the buses; the three conditions are supporting details."
    ],
    "misconceptions": [
      "choosing the first sentence automatically",
      "confusing the broad topic with the writer’s main point",
      "treating an interesting example as the main idea",
      "selecting a detail too narrow to cover the paragraph"
    ],
    "guidedPractice": [
      "Read four short paragraphs; underline candidate topic sentences, state each main idea in your own words, then label two supporting details for each."
    ],
    "independentPractice": [
      "Analyse a multi-paragraph passage, write one main idea per paragraph and one overall main idea, then justify every choice with textual evidence."
    ],
    "mastery": {
      "criterion": "At least 85% accuracy distinguishing main from supporting ideas across explicit and implied paragraphs.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-reading-3",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading to answer specific questions",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 3
    },
    "objectives": [
      "Read selected passages and answer specific questions",
      "Answer questions at factual, interpretive, inferential/projective and opinion levels using evidence"
    ],
    "prerequisites": [
      "main and supporting ideas",
      "question words"
    ],
    "teaching": [
      "Comprehension questions test different kinds of understanding. “Who/what/when/where” often asks for explicit information; “why/how” may require explanation or inference.",
      "A good answer begins by decoding the command word: identify, explain, compare, infer, conclude, predict or give an opinion. Each requires a different response.",
      "For explicit questions, locate the relevant sentence and paraphrase accurately. For inference questions, combine clues from the passage with logical reasoning without inventing facts.",
      "For prediction or projection, state a plausible next outcome and support it from what the passage already establishes. For opinion questions, give a position plus a reason connected to the text.",
      "Use the answer–evidence check: every non-personal claim should be traceable to the passage or to a clear inference from it."
    ],
    "workedExamples": [
      "Question: “Why did Ada return home?” Passage states she saw dark clouds and heard thunder. Answer: she expected a storm, supported by the weather clues.",
      "Question: “What might happen if the gate remains unlocked?” A valid prediction names a likely risk and cites the passage’s earlier concern about security."
    ],
    "misconceptions": [
      "copying large sections without answering the question",
      "giving outside knowledge when the question asks “according to the passage”",
      "treating inference as guessing",
      "giving an opinion without a reason"
    ],
    "guidedPractice": [
      "Answer eight questions on one passage; classify each as factual, interpretive, inferential, predictive or opinion, then point to evidence."
    ],
    "independentPractice": [
      "Complete two passages with mixed question levels and write one original question of each type for a third passage."
    ],
    "mastery": {
      "criterion": "At least 80% across all question levels, with evidence supplied for every interpretive or inferential answer.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-reading-4",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading to understand the author’s mood",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 4
    },
    "objectives": [
      "Identify an author's mood/attitude through words and expressions",
      "Read between the lines to detect hidden attitude",
      "Identify the overall impression created by the author’s presentation"
    ],
    "prerequisites": [
      "literal meaning",
      "basic tone vocabulary",
      "context clues"
    ],
    "teaching": [
      "Mood/attitude is inferred from diction, imagery, sentence pattern, punctuation and what the writer chooses to emphasise. The label must be supported by evidence.",
      "Words can signal anger, excitement, suspicion, disappointment, happiness, doubt or other attitudes. Do not name a mood because of the topic alone.",
      "Reading between the lines means combining clues that are not stated as a direct declaration. If a narrator repeatedly uses doubtful questions and cautious words, the attitude may be suspicious or uncertain.",
      "Presentation can also feel balanced, biased, detached, enthusiastic, terse or verbose. Distinguish the writer’s attitude from the reader’s personal emotional reaction.",
      "AVORA uses label → evidence → explanation: name the mood, quote or paraphrase a short clue, then explain how the clue creates that impression."
    ],
    "workedExamples": [
      "“At last! The long-awaited bus rolled into view, and everyone cheered.” Mood: relief/excitement; “at last” and “cheered” provide evidence.",
      "“He claimed the money vanished by itself. Convenient, isn’t it?” The wording signals suspicion/irony rather than neutral reporting."
    ],
    "misconceptions": [
      "calling every sad event a sad authorial mood",
      "giving a mood label without textual evidence",
      "confusing character mood with author attitude",
      "treating bias and factual disagreement as the same thing"
    ],
    "guidedPractice": [
      "For six short excerpts, choose the best mood/attitude from several options and underline the exact words that justify it."
    ],
    "independentPractice": [
      "Analyse three longer excerpts: identify mood, hidden attitude and presentation style; write a two-sentence evidence-based explanation for each."
    ],
    "mastery": {
      "criterion": "At least 85% correct mood/attitude identification with relevant textual evidence and explanation.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-reading-5",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading to interpret diagrams, maps and sketches",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 5
    },
    "objectives": [
      "Read and interpret diagrams and maps accurately",
      "Make meaning from spatial descriptions or presentations",
      "Explain how a diagram/map/sketch clarifies or complements written material"
    ],
    "prerequisites": [
      "direction words",
      "basic labels and symbols",
      "reading simple captions"
    ],
    "teaching": [
      "Visual texts carry information through titles, labels, keys, arrows, scale, position and sequence. Begin by identifying what each visual element represents before drawing conclusions.",
      "For maps, locate orientation and landmarks, then translate spatial relationships into language such as north of, beside, opposite, between, beyond or towards.",
      "For diagrams, follow arrows, stages and labels in order. A visual may summarise a process that the prose explains in detail.",
      "Cross-check text and visual: ask what information appears in both, what the visual adds, and whether one source resolves ambiguity in the other.",
      "Interpretation should be precise: describe location, movement, sequence or relationship rather than saying only “it shows the answer.”"
    ],
    "workedExamples": [
      "A school sketch places the library east of the hall and the clinic north of the library. Therefore the clinic is north-east of the hall, assuming the map’s orientation is standard.",
      "A water-cycle diagram uses arrows from sea to cloud to land. The arrows clarify sequence and direction while the paragraph explains the process names."
    ],
    "misconceptions": [
      "ignoring the map key or orientation",
      "treating decorative pictures as data",
      "describing objects without explaining relationships",
      "using left/right when the task requires compass directions"
    ],
    "guidedPractice": [
      "Interpret a labelled school map and a simple process diagram; answer location, sequence and text–visual relationship questions."
    ],
    "independentPractice": [
      "Work with three unfamiliar visuals: write precise directions from one point to another, summarise a process diagram, and explain how a sketch complements a paragraph."
    ],
    "mastery": {
      "criterion": "At least 85% accuracy in extracting, describing and integrating information from maps, diagrams and written text.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-reading-6",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading to follow direction in written communication",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 6
    },
    "objectives": [
      "Read written selections in order to follow directions",
      "Identify key words that signal direction",
      "Combine written directions with a related sketch or map"
    ],
    "prerequisites": [
      "map/sketch interpretation",
      "sequence words",
      "imperative verbs"
    ],
    "teaching": [
      "Instructional reading focuses on action and sequence. Identify the starting point, destination or goal before following any step.",
      "Direction signals include turn, continue, beside, opposite, before, after, towards, north/south/east/west and distance markers. Sequence words tell when actions occur.",
      "Imperative verbs often carry the action: turn, walk, place, connect, open, measure. Missing one verb or qualifier can change the result.",
      "When a sketch accompanies instructions, trace each instruction on the sketch and verify that landmarks occur in the expected order.",
      "Good directions are testable. After following them, another learner should arrive at the same destination without needing extra hidden information."
    ],
    "workedExamples": [
      "“From the gate, walk past the office, turn right at the library and stop opposite the laboratory.” The learner identifies start, landmark order, turn and endpoint.",
      "A DIY instruction says “before tightening the screw, align the two holes.” Reversing the sequence can make the task fail."
    ],
    "misconceptions": [
      "starting from the wrong reference point",
      "ignoring words like before/after",
      "confusing left/right or east/west",
      "assuming a missing step instead of identifying ambiguity"
    ],
    "guidedPractice": [
      "Follow three written routes on a simple map, then rewrite one route as numbered instructions and let a peer test it."
    ],
    "independentPractice": [
      "Write accurate directions between two familiar locations and complete two instruction-based reading tasks that combine text with a sketch."
    ],
    "mastery": {
      "criterion": "At least 90% on direction-following tasks and ability to write a route another learner can follow without clarification.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-writing-1",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Writing to highlight main and supporting ideas",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 7
    },
    "objectives": [
      "Read a topic or source material",
      "Jot down main and supporting ideas",
      "Arrange ideas in logical sequence",
      "Write an appropriate introduction and effective conclusion"
    ],
    "prerequisites": [
      "main/supporting ideas in reading",
      "sentence construction"
    ],
    "teaching": [
      "Writing begins before drafting. Interpret the topic, brainstorm relevant ideas and separate central points from examples, reasons and details.",
      "Build an outline: introduction → ordered main ideas with supporting points → conclusion. Each paragraph should have a controlling idea and connected support.",
      "Logical order may be chronological, spatial, cause-and-effect or importance-based. Choose the order that fits the purpose rather than listing ideas randomly.",
      "An introduction establishes topic and direction without trying to say everything. A conclusion closes the discussion by restating the central insight or final outcome without introducing an unrelated new point.",
      "After drafting, compare each paragraph with the outline. Remove details that do not support the main idea and improve transitions between ideas."
    ],
    "workedExamples": [
      "Topic “Why school gardens matter”: main points could be food education, responsibility and environment; each receives examples/support before drafting.",
      "A disorganised outline [benefit, definition, unrelated joke, second benefit] becomes [introduction/definition, benefit 1 + evidence, benefit 2 + evidence, conclusion]."
    ],
    "misconceptions": [
      "brainstorming without selecting relevant ideas",
      "putting examples before the point they support",
      "writing an introduction that is longer than the body",
      "adding a new major argument in the conclusion"
    ],
    "guidedPractice": [
      "Turn two prompts into outlines containing an introduction idea, three main points, at least two supporting details per point and a conclusion idea."
    ],
    "independentPractice": [
      "Write one 350-word composition from a self-created outline; submit both outline and final draft and annotate where each supporting idea appears."
    ],
    "mastery": {
      "criterion": "Outline and final composition both score at least 80% for relevance, logical sequencing, paragraph support, introduction and conclusion.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-writing-2",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Composition writing: narrative and descriptive",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 8
    },
    "objectives": [
      "Interpret a composition topic and generate relevant main/supporting ideas",
      "Organise ideas for narrative or descriptive writing",
      "Write coherent narrative and descriptive compositions connected to the assigned context"
    ],
    "prerequisites": [
      "paragraphing",
      "main/supporting ideas",
      "basic tense control"
    ],
    "teaching": [
      "Narrative writing tells events through a clear sequence. It normally establishes characters and setting, develops a problem/event, reaches a meaningful turning point and closes the event coherently.",
      "Descriptive writing creates a precise picture of a person, place, object or experience using selected sensory and spatial details. Description should have an organising viewpoint, not a random adjective list.",
      "Narratives usually rely on controlled past tense and time transitions; descriptions often use spatial order and precise nouns/verbs/adjectives. Both require paragraph unity.",
      "Plan before drafting. For a road-safety context, a narrative might recount a journey and incident; a descriptive piece might portray a busy junction or safety officer. The topic determines content, not a memorised essay.",
      "Revise for relevance, chronology/position, sentence variety, punctuation and unnecessary repetition. Strong writing shows rather than merely labels when detail is useful."
    ],
    "workedExamples": [
      "Narrative opening: establish when/where and the normal situation before the event changes. A sequence such as “first…later…suddenly…afterwards” must reflect real chronology.",
      "Instead of “The junction was very bad,” a description can specify buses edging forward, horns sounding and pedestrians waiting behind the barrier; concrete detail creates the scene."
    ],
    "misconceptions": [
      "turning a narrative into a list of events",
      "using many adjectives without a clear image",
      "switching tense repeatedly",
      "memorising one composition and forcing it onto unrelated topics",
      "ending abruptly without resolving or reflecting on the main event"
    ],
    "guidedPractice": [
      "Plan and draft one 180-word narrative and one 150-word descriptive paragraph from contrasting prompts; peer-check sequence, detail and tense."
    ],
    "independentPractice": [
      "Write a complete narrative and a complete descriptive composition on unfamiliar prompts, then revise both using a relevance/organisation/language checklist."
    ],
    "mastery": {
      "criterion": "At least 80% in both narrative and descriptive writing, including clear organisation, relevant development, paragraphing and controlled language.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-writing-3",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Writing",
    "topic": "Letter writing: Features of informal and formal letters",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 9
    },
    "objectives": [
      "Identify formal and informal letter types",
      "Identify the different formats of formal and informal letters",
      "Write an appropriate letter for a given situation"
    ],
    "prerequisites": [
      "sentence and paragraph writing",
      "audience and purpose"
    ],
    "teaching": [
      "Letter type depends on relationship and purpose. Informal letters are personal; formal letters address institutions, officials or people in an official capacity.",
      "Format communicates convention. Informal letters normally use the writer’s address/date, salutation, body and suitable closing. Formal letters require the prescribed formal layout, clear subject/purpose, formal salutation, organised body and formal closing/signature.",
      "Register must match audience. Informal writing may be warm and conversational; formal writing should be courteous, direct and free from slang or overly familiar language.",
      "The body should fulfil every instruction in the prompt. Separate different points into paragraphs and make requests, explanations or complaints specific.",
      "Proofread names, addresses, dates, salutation/closing consistency, punctuation and whether the stated purpose was actually achieved."
    ],
    "workedExamples": [
      "Prompt: write to a friend about a school event → informal tone and personal detail. Prompt: write to the principal requesting permission → formal structure and respectful, precise request.",
      "Weak formal sentence: “I wanna tell you guys our taps are bad.” Improved: “I am writing to report that the taps in our classroom block have been faulty for three days.”"
    ],
    "misconceptions": [
      "choosing letter type from topic rather than recipient",
      "mixing formal and informal register",
      "forgetting required address/date/closing elements",
      "writing a beautiful introduction but omitting a requested point"
    ],
    "guidedPractice": [
      "Classify six letter prompts as formal/informal, build the correct format for each type and rewrite five unsuitable register choices."
    ],
    "independentPractice": [
      "Write one formal and one informal letter from fresh prompts; use a checklist for format, purpose, audience, paragraphing and language."
    ],
    "mastery": {
      "criterion": "At least 85% on format/register identification and at least 80% on both full letters with all prompt requirements satisfied.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-listening-and-speaking-1",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Speeches: Production of vowel and consonant sounds in passages",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 10
    },
    "objectives": [
      "Retell what was heard",
      "Explain key words and expressions from listening material",
      "Answer questions on what was heard",
      "Summarise listening material while recognising relevant vowel and consonant sounds"
    ],
    "prerequisites": [
      "basic attentive listening",
      "reading familiar words aloud"
    ],
    "teaching": [
      "Good listening combines meaning and sound. First understand the message; then notice how individual vowel and consonant contrasts distinguish words in connected speech.",
      "English vowels may differ by quality and length, and consonants by place/manner/voicing. Learners should practise contrasts in meaningful words and sentences, not isolated symbols only.",
      "Minimal-pair practice helps the ear notice contrasts, but context decides meaning. AVORA plays or reads short passages, asks for retelling, then zooms into selected sound contrasts.",
      "Retelling preserves sequence and important facts in the learner’s own words. Summarising is shorter: it removes examples and repetition while keeping the central message.",
      "Pronunciation practice is intelligibility-focused: hear the target, compare, produce it in a word, then produce it naturally in a sentence or passage."
    ],
    "workedExamples": [
      "After hearing a short passage about a market, learner retells the event, explains two key expressions and practises a selected vowel contrast in words from the passage.",
      "For /p/ and /b/, compare “pack/back” in sentences, then check whether voicing changes the intended word."
    ],
    "misconceptions": [
      "repeating sounds without understanding the passage",
      "assuming spelling gives pronunciation perfectly",
      "exaggerating sound length unnaturally",
      "summarising by copying the first sentences"
    ],
    "guidedPractice": [
      "Listen to/read-aloud passages twice; retell, answer five questions, identify target vowel/consonant contrasts and produce them in complete sentences."
    ],
    "independentPractice": [
      "Complete three listening tasks with delayed retell and summary; record/read a short passage containing assigned sound contrasts and self-check intelligibility."
    ],
    "mastery": {
      "criterion": "At least 80% listening comprehension and summary accuracy plus consistent intelligible production of the targeted vowel/consonant contrasts in context.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-listening-and-speaking-2",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Listening to and producing different speeches with reference to vowel sounds, consonant clusters, diphthongs, word boundaries, compound words, etc.",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 11
    },
    "objectives": [
      "Distinguish and produce relevant vowel sounds in connected speech",
      "Identify and produce consonant clusters",
      "Identify and produce selected diphthongs and weak forms",
      "Recognise word boundaries/linking in connected speech",
      "Identify and use compound words and phrases in context",
      "Respond appropriately to questions and question tags in speech"
    ],
    "prerequisites": [
      "basic vowel/consonant production",
      "syllables and words",
      "attentive listening"
    ],
    "teaching": [
      "Connected speech is not a row of isolated dictionary words. Sounds meet at word boundaries, some function words become weaker, and listeners must still recover the intended words and phrases.",
      "A consonant cluster contains two or more consonants without an intervening vowel. Learners should preserve the cluster instead of inserting extra vowels or deleting a consonant.",
      "A diphthong moves from one vowel quality toward another within a syllable. Practise by hearing and producing it in contrasting words and sentences, not by memorising symbol names alone.",
      "Word boundaries can become less obvious when final and initial sounds link. Use meaning, stress and grammar to segment a stream of speech correctly.",
      "Compound words combine words into one lexical unit or conventional expression. Meaning and stress can differ from an ordinary phrase, so learners should identify them in natural contexts.",
      "Question tags are short checks added to statements. The auxiliary and pronoun must agree with the statement, and the usual polarity switches: positive statement → negative tag; negative statement → positive tag.",
      "AVORA cycles listen → discriminate → mark → produce → use in a meaningful exchange, so oral English stays communicative rather than mechanical."
    ],
    "workedExamples": [
      "Cluster practice: “school”, “plants”, “strong”. Learner taps each consonant sequence and says the word without adding a vowel such as “səchool.”",
      "Boundary practice: hear “an ice cream” versus a different segmentation; use grammar and context to decide the intended words.",
      "Tag: “They are ready, aren’t they?” The auxiliary “are” and pronoun “they” match the statement; positive statement takes negative tag."
    ],
    "misconceptions": [
      "inserting vowels inside consonant clusters",
      "treating every pair of vowels as a diphthong",
      "assuming written spaces exactly match acoustic boundaries",
      "using “isn’t it?” as a tag for every statement",
      "confusing a compound expression with any two adjacent words"
    ],
    "guidedPractice": [
      "Sound-sort words into vowel/diphthong/cluster targets; mark likely word boundaries in short utterances; complete and speak ten question tags."
    ],
    "independentPractice": [
      "Perform a short dialogue and reading passage containing assigned clusters, diphthongs, compounds and tags; complete a listening discrimination quiz without seeing the script first."
    ],
    "mastery": {
      "criterion": "At least 80% discrimination and intelligible production across clusters/diphthongs/boundaries plus 85% accuracy forming question tags.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-listening-and-speaking-3",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Listening and Speaking",
    "topic": "Listening comprehension",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 15
    },
    "objectives": [
      "Listen attentively to given passages",
      "Extract the main ideas from listening passages",
      "Recognise that main ideas may occur at different positions in a passage"
    ],
    "prerequisites": [
      "main idea in reading",
      "note-taking keywords"
    ],
    "teaching": [
      "Listening comprehension requires active attention: predict the topic, listen for repeated/key ideas and distinguish central points from examples.",
      "Do not try to write every word. Use short notes for names, numbers, causes, contrasts and repeated ideas, then reconstruct the message after listening.",
      "The main idea may appear early, later or be implied by several supporting details. Listen to the whole passage before deciding.",
      "On a second listening, verify the main idea and add essential supporting details. If only one listening is allowed, prioritise meaning over perfect wording.",
      "AVORA varies contexts—family, school, transport, health, safety, environment and society—so the skill transfers beyond a memorised passage."
    ],
    "workedExamples": [
      "Audio says several ways students conserve water and ends “small daily habits protect our supply.” Main idea: everyday conservation protects water; examples support it.",
      "A speaker describes three road incidents before stating the cause. The main idea appears late, so choosing the first detail would be wrong."
    ],
    "misconceptions": [
      "writing every word and missing later meaning",
      "choosing the first sentence as main idea automatically",
      "confusing the loudest detail with the central point",
      "answering from prior knowledge instead of what was heard"
    ],
    "guidedPractice": [
      "Listen to three short passages; write a six-word topic note, one-sentence main idea and two supporting details for each."
    ],
    "independentPractice": [
      "Complete two longer listening tasks with questions on main idea, detail, inference and sequence; summarise one passage from notes only."
    ],
    "mastery": {
      "criterion": "At least 85% on main-idea extraction and 80% overall listening comprehension without access to the written script during first response.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-grammatical-accuracy-1",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Parts of speech: Nouns, Verbs, and Adjectives",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 16
    },
    "objectives": [
      "Identify features of nouns, verbs and adjectives in passages",
      "State the functions of nouns, verbs and adjectives",
      "Construct appropriate sentences using nouns, verbs and adjectives"
    ],
    "prerequisites": [
      "sentence subject/predicate awareness",
      "basic vocabulary"
    ],
    "teaching": [
      "A noun names or identifies a person, place, thing, idea or other entity and can function as subject, object, complement or object of a preposition.",
      "A verb is central to the predicate: it expresses action, occurrence or state and may change form for tense or agreement. Verb phrases can contain auxiliaries plus a main verb.",
      "An adjective modifies or describes a noun/pronoun or functions after a linking verb. Ask what noun it describes rather than classifying a word by appearance alone.",
      "Parts of speech depend on function in a sentence. “Light” can be a noun, adjective or verb in different contexts, so learners must use syntax and meaning.",
      "AVORA teaches identify → function → manipulate: locate the word, name its grammatical job, then replace or transform it to prove understanding."
    ],
    "workedExamples": [
      "“The careful driver stopped suddenly.” driver=noun subject; careful=adjective modifying driver; stopped=verb.",
      "“They light the lamp” uses light as a verb; “the bright light” uses light as a noun."
    ],
    "misconceptions": [
      "calling every -ing word a verb",
      "classifying by meaning alone without sentence function",
      "confusing adjectives with adverbs",
      "identifying a noun but not its function"
    ],
    "guidedPractice": [
      "Label nouns/verbs/adjectives in ten sentences and state each function; rewrite five sentences by changing the adjective or verb while preserving grammar."
    ],
    "independentPractice": [
      "Annotate a short passage, then write eight original sentences demonstrating noun subject/object roles, action/linking verbs and attributive/predicative adjectives."
    ],
    "mastery": {
      "criterion": "At least 85% identification plus correct grammatical function in context, and 8/10 accurate original constructions.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-grammatical-accuracy-2",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Parts of speech: Adverbs, Conjunctions and Prepositions",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 16
    },
    "objectives": [
      "Identify adverbs, conjunctions and prepositions",
      "State their functions in passages",
      "Construct sentences using them correctly"
    ],
    "prerequisites": [
      "nouns/verbs/adjectives",
      "phrases and clauses at introductory level"
    ],
    "teaching": [
      "Adverbs modify verbs, adjectives, other adverbs or sometimes whole clauses; they can express manner, time, place, frequency or degree.",
      "Conjunctions connect words, phrases or clauses and signal relationships such as addition, contrast, choice, cause or condition.",
      "Prepositions introduce prepositional phrases and express relationships such as place, time, direction, means or association. Their object is normally a noun phrase.",
      "A word’s category can depend on context. “Before” can introduce a noun phrase as a preposition or connect a clause in another grammatical role; learners should inspect what follows it.",
      "Use these categories to improve meaning: adverbs sharpen circumstances, conjunctions make logical links explicit and prepositions locate relationships."
    ],
    "workedExamples": [
      "“She arrived early because the road was clear.” early=adverb of time; because=conjunction linking reason.",
      "“The bag is under the table.” under introduces the prepositional phrase “under the table” showing location."
    ],
    "misconceptions": [
      "thinking every word ending -ly is an adverb",
      "using conjunctions as punctuation-free run-ons",
      "confusing a preposition with the noun phrase after it",
      "choosing prepositions solely by literal translation from another language"
    ],
    "guidedPractice": [
      "Classify highlighted words in 15 sentences, state their functions, then combine sentence pairs using suitable conjunctions."
    ],
    "independentPractice": [
      "Write a paragraph that deliberately includes adverbs of three types, five conjunction relationships and six accurate prepositional phrases; annotate them afterward."
    ],
    "mastery": {
      "criterion": "At least 85% correct identification/function plus grammatically accurate use in original sentences and paragraph.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-grammatical-accuracy-3",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Adverbials and Tenses",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 17
    },
    "objectives": [
      "Identify adverbials in a passage",
      "Construct sentences using adverbials",
      "Identify different tenses in a passage",
      "Construct sentences using appropriate tenses"
    ],
    "prerequisites": [
      "verbs and adverbs",
      "time expressions"
    ],
    "teaching": [
      "An adverbial is a word, phrase or clause functioning to add information such as time, place, manner, reason or frequency. It is a function, not only the part of speech “adverb.”",
      "Tense locates a situation in time through verb forms and auxiliaries. At JSS1, learners need secure control of common present, past and future forms and their use in context.",
      "Time adverbials and tense should agree logically: “Yesterday I went,” not “Yesterday I go,” except in special narrative styles.",
      "Maintain tense consistency within a time frame, but change tense when the time relationship genuinely changes.",
      "AVORA uses timelines: place events on a line first, choose the tense, then add adverbials that make when/where/how explicit."
    ],
    "workedExamples": [
      "“Every morning, Tola walks quickly to school.” Every morning=time adverbial; quickly=manner adverbial; walks=simple present for routine.",
      "“We had finished before the rain started” distinguishes an earlier completed event from a later past event; the time relationship controls form."
    ],
    "misconceptions": [
      "calling only single adverbs adverbials",
      "switching past and present without a time reason",
      "using will after every time conjunction",
      "assuming a tense name matters more than the meaning it expresses"
    ],
    "guidedPractice": [
      "Identify adverbials and tense forms in a passage; place six events on timelines and rewrite them with suitable time adverbials."
    ],
    "independentPractice": [
      "Edit a tense-inconsistent paragraph and write a 180-word account using deliberate time/place/manner adverbials with consistent tense control."
    ],
    "mastery": {
      "criterion": "At least 85% identification and correction accuracy, with a coherent paragraph showing appropriate tense and adverbial use.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-grammatical-accuracy-4",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Active and Passive verbs",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 18
    },
    "objectives": [
      "Identify active and passive verb constructions",
      "Distinguish/list active and passive forms",
      "Construct sentences using active and passive voice appropriately"
    ],
    "prerequisites": [
      "subject, verb and object",
      "common verb forms",
      "past participles"
    ],
    "teaching": [
      "Voice describes the relationship between the verb and participants. In active voice the subject performs the action; in passive voice the subject receives or is affected by it.",
      "A typical passive uses a form of BE + past participle: “The gate was opened.” The agent may be included with “by” when important.",
      "To transform active → passive, identify subject, verb and object; move the object to subject position; preserve tense in BE; use the past participle; add the original agent only if useful.",
      "Not every verb can form a natural passive. An active sentence normally needs a transitive verb with an object for straightforward transformation.",
      "Choose voice for purpose: active often makes agency clear; passive can focus on result, process or unknown/unimportant agent."
    ],
    "workedExamples": [
      "Active: “The prefect locked the gate.” Passive: “The gate was locked by the prefect.” Past tense is preserved.",
      "Active: “People speak English in many countries.” Passive: “English is spoken in many countries.” Agent can be omitted because it is general."
    ],
    "misconceptions": [
      "changing word order without changing the verb form",
      "using simple past instead of past participle after BE",
      "forcing intransitive verbs into passive",
      "thinking passive voice is always incorrect"
    ],
    "guidedPractice": [
      "Transform ten active sentences to passive and five passive to active; explain why the agent is omitted or included in three examples."
    ],
    "independentPractice": [
      "Edit a mixed passage for voice, then write eight sentence pairs showing present/past active-passive transformations with correct agreement and tense."
    ],
    "mastery": {
      "criterion": "At least 85% accurate identification/transformation and ability to explain a sensible reason for choosing active or passive voice.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-literature-1",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Introduction to literature",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 19
    },
    "objectives": [
      "Identify features of literature",
      "Identify features of oral literature",
      "Identify features of written literature",
      "Explain literature as a carrier of language and culture"
    ],
    "prerequisites": [
      "basic reading and storytelling experience"
    ],
    "teaching": [
      "Literature is imaginative or artistic use of language through oral and written forms. It explores human experience using story, performance, imagery, rhythm and other crafted choices.",
      "Oral literature is transmitted primarily through performance and memory—such as folktales, songs, riddles, proverbs and praise forms—while written literature is preserved in texts such as prose, poetry and drama.",
      "The categories overlap: an oral story may later be written, and a written poem may be performed. The distinction concerns mode of transmission and conventions, not value.",
      "Literature carries culture through names, beliefs, values, conflicts, settings, speech patterns and social practices, while also allowing writers and communities to question those values.",
      "Study literature at three levels: what happens/what is said; how language/form creates meaning; what ideas, values or questions the work raises."
    ],
    "workedExamples": [
      "A proverb performed in a story is oral-literary material; a published short story is written literature. Both can preserve cultural values through language.",
      "A tale about communal farming can reveal vocabulary, customs and values while still being an imaginative story rather than a history record."
    ],
    "misconceptions": [
      "defining literature as only printed books",
      "assuming oral literature has no structure or authorship/community ownership",
      "treating every cultural practice in a story as a universal fact",
      "summarising plot without discussing language or meaning"
    ],
    "guidedPractice": [
      "Sort twelve examples into oral/written/both and justify choices; analyse one short literary extract for language, culture and central idea."
    ],
    "independentPractice": [
      "Create a comparison chart of oral and written literature and write a short analysis explaining how one literary work carries cultural meaning."
    ],
    "mastery": {
      "criterion": "At least 85% classification accuracy and a clear evidence-based explanation of literature’s language/culture function.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-literature-2",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Introduction to Folktales",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 20
    },
    "objectives": [
      "Identify features of folktales",
      "Retell folktales coherently",
      "Explain themes in folktales",
      "Identify moral lessons",
      "Narrate a folktale effectively"
    ],
    "prerequisites": [
      "story sequence",
      "theme vs event"
    ],
    "teaching": [
      "Folktales are traditional community stories transmitted across generations, often orally, and may use repetition, stock characters, songs, tricksters, animals or supernatural events.",
      "Retelling should preserve the major sequence, conflict and outcome while using the learner’s own language rather than memorising every sentence.",
      "Theme is the broader idea explored by the events—such as greed, wisdom, courage or cooperation. A moral is a lesson a reader/listener may draw; theme and moral are related but not identical.",
      "When discussing a folktale, support the claimed theme or moral with what characters do and what consequences follow.",
      "Narration is performance: clear voice, pacing, dialogue, repetition and audience awareness can make an oral retelling effective without changing the essential story."
    ],
    "workedExamples": [
      "If a trickster repeatedly lies and finally loses everyone’s trust, possible theme is dishonesty and consequence; a moral might be “deceit destroys trust.”",
      "A learner retells a tale in five stages: setting → problem → attempts → turning point → outcome, then explains the lesson with one event as evidence."
    ],
    "misconceptions": [
      "calling any old story a folktale",
      "confusing theme with one character’s name or event",
      "stating a moral unsupported by the ending",
      "retelling every tiny detail and losing the plot"
    ],
    "guidedPractice": [
      "Retell a short folktale from a sequence of five cue cards; identify two features, one theme and one possible moral with evidence."
    ],
    "independentPractice": [
      "Read/listen to two folktales from different communities, compare features and themes, then prepare and perform a 3-minute retelling of one."
    ],
    "mastery": {
      "criterion": "At least 80% on features/theme/moral analysis and a coherent retelling preserving major events and outcome.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-literature-3",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Introduction to Myths and legends",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 21
    },
    "objectives": [
      "Identify features of myths and legends",
      "Explain themes in myths/legends",
      "Retell myths/legends",
      "Identify moral lessons where applicable",
      "Narrate a myth or legend coherently"
    ],
    "prerequisites": [
      "folktale features",
      "story sequence"
    ],
    "teaching": [
      "Myths are traditional narratives often connected with origins, deities, supernatural forces or explanations of a people’s worldview. Legends are traditional stories associated with remembered persons, places or events and may mix history with imaginative development.",
      "Both can include extraordinary or supernatural elements, but classification depends on cultural function and subject, not simply whether magic appears.",
      "Retelling preserves central characters, conflict, key events and cultural significance. Analysis asks what the narrative explains, celebrates, warns against or remembers.",
      "Themes and morals should be inferred from evidence. Some myths primarily explain origins and may not present a simple “moral,” so AVORA does not force one where the text does not support it.",
      "Compare myth, legend and folktale by purpose, relation to belief/history, characters and transmission rather than treating the labels as interchangeable."
    ],
    "workedExamples": [
      "A story explaining how a natural feature came to exist may function as myth; a story centred on a remembered heroic founder may function as legend.",
      "Two narratives both contain supernatural events, but one explains cosmic origins while the other magnifies a historical hero; their functions differ."
    ],
    "misconceptions": [
      "saying every supernatural story is a myth",
      "assuming legends are verified history",
      "forcing a moral onto every myth",
      "confusing theme with a plot summary"
    ],
    "guidedPractice": [
      "Classify six short narrative descriptions as myth/legend/folktale and justify; retell one myth/legend and identify its central theme or cultural function."
    ],
    "independentPractice": [
      "Compare one myth and one legend in a table, then write a 250-word analysis of features, theme and cultural significance with evidence."
    ],
    "mastery": {
      "criterion": "At least 85% classification/feature accuracy and coherent evidence-based theme/cultural-function explanation.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-literature-4",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Prose: Types and features",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 22
    },
    "objectives": [
      "Identify types of prose in the prescribed JSS1 scope",
      "List major features of prose",
      "Differentiate narrative and descriptive prose",
      "Write short prose using the studied forms"
    ],
    "prerequisites": [
      "narrative/descriptive composition",
      "literature introduction"
    ],
    "teaching": [
      "Prose is language arranged mainly in sentences and paragraphs rather than verse lines. At this level, AVORA distinguishes narrative prose and descriptive prose as the curriculum requires.",
      "Narrative prose develops events, characters and conflict through plot; descriptive prose foregrounds qualities, atmosphere, appearance or sensory detail, though real works may combine both.",
      "Core prose features include plot, characterisation, setting, theme and style. Plot is ordered action; characterisation is how persons are presented; setting is time/place/social environment; theme is central idea; style is the writer’s manner of expression.",
      "A strong literary response identifies a feature and explains its effect. “There is setting” is incomplete; show how the setting shapes mood, conflict or action.",
      "Writing short prose applies the same principles: choose purpose, viewpoint, setting and details, then revise for unity and effect."
    ],
    "workedExamples": [
      "In a story where a student chooses whether to return lost money, plot follows the decision, characterisation emerges through actions and theme may concern honesty.",
      "A paragraph lingering on heat, dust, traffic noise and crowded stalls is mainly descriptive even if one small action occurs."
    ],
    "misconceptions": [
      "thinking prose means only fiction",
      "confusing plot with theme",
      "listing characters instead of analysing characterisation",
      "assuming narrative and description can never appear together"
    ],
    "guidedPractice": [
      "Annotate a short prose extract for plot, characterisation, setting, theme and style; classify two paragraphs as mainly narrative/descriptive and explain."
    ],
    "independentPractice": [
      "Analyse a short story using all five features and write a 250-word original prose piece that deliberately develops setting, character and theme."
    ],
    "mastery": {
      "criterion": "At least 80% accurate feature analysis and an original prose piece showing coherent type, structure and literary features.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-literature-5",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Poetry: Types and features",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 22
    },
    "objectives": [
      "Read oral and written poems appropriately",
      "Explain meanings of selected poems",
      "Identify features/language of poetry",
      "Write simple original poems"
    ],
    "prerequisites": [
      "figurative language awareness",
      "rhythm in speech",
      "literature introduction"
    ],
    "teaching": [
      "Poetry compresses meaning through carefully chosen words, lineation, rhythm, sound, imagery and figurative language. It can be oral or written and may be lyric, narrative/epic or dramatic in broad school-level classification.",
      "Meaning is built from speaker, situation, images, repeated words, contrasts and figurative expressions. Do not reduce a poem to a single paraphrased sentence before examining how it is written.",
      "Rhythm is the patterned movement of stressed and unstressed syllables or recurring beats; reading aloud helps reveal emphasis and tone.",
      "Imagery appeals to the senses, while figurative language creates comparisons or associations beyond literal statement. Concision means poetry often carries much meaning in few words.",
      "Writing a simple poem begins with a clear image/idea, precise language and deliberate line breaks or rhythm; rhyme is optional unless the task requires it."
    ],
    "workedExamples": [
      "A poem repeating “home” at the end of several lines may use repetition to emphasise belonging; the effect must be explained, not just named.",
      "“The market wakes before the sun” personifies the market and creates an image of early activity without literally claiming a building wakes."
    ],
    "misconceptions": [
      "thinking every poem must rhyme",
      "calling the narrator automatically the poet",
      "listing devices without explaining meaning/effect",
      "forcing literal interpretations onto figurative lines"
    ],
    "guidedPractice": [
      "Read two short poems aloud, identify speaker/situation, explain three images or devices and compare their rhythms."
    ],
    "independentPractice": [
      "Analyse one unfamiliar poem in a structured response and write an 8–12 line poem using imagery and at least one deliberate sound/repetition technique."
    ],
    "mastery": {
      "criterion": "At least 80% interpretation/device-effect score and an original poem showing purposeful language rather than random rhyme.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-literature-6",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Drama: Types and features",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 23
    },
    "objectives": [
      "Read and dramatise a text",
      "Identify themes and features of drama",
      "Identify essential props and costumes",
      "Recognise comedy and tragedy in introductory form",
      "Create/write a short play scene"
    ],
    "prerequisites": [
      "dialogue punctuation",
      "literature introduction",
      "basic performance awareness"
    ],
    "teaching": [
      "Drama is literature designed for performance. Meaning comes from dialogue, action, stage directions, setting, props, costume, actors/director and audience interaction.",
      "Comedy generally uses humorous situations and often resolves conflict without catastrophic ending; tragedy develops serious conflict and loss. Real plays can mix tones, so classify using dominant structure and outcome.",
      "A script differs from ordinary prose: character names, dialogue and stage directions guide performance. Stage directions communicate movement, expression, setting or action but are not spoken unless written as dialogue.",
      "Props are objects used in performance; costumes help establish character, period, role or context. They should serve the action rather than decorate randomly.",
      "Theme emerges through conflict and choices. Performance requires diction, pacing, movement and listening to other actors—not simply reading lines quickly."
    ],
    "workedExamples": [
      "Stage direction: “[Amina places the sealed bottle on the table.]” It instructs action; it is not spoken dialogue.",
      "A short play about unsafe food may use a missing label as a prop central to the conflict; the prop has narrative purpose."
    ],
    "misconceptions": [
      "calling any funny moment a comedy",
      "reading stage directions aloud as dialogue",
      "confusing theme with the title",
      "listing props without explaining their use",
      "writing a “play” as continuous prose narration"
    ],
    "guidedPractice": [
      "Perform a 2-page scene; identify theme, stage directions, two props/costumes and whether its dominant form is comic or tragic with reasons."
    ],
    "independentPractice": [
      "Write and perform a short two-character scene with a clear conflict, stage directions, purposeful prop and identifiable theme; self-evaluate diction and movement."
    ],
    "mastery": {
      "criterion": "At least 80% drama-feature analysis plus a coherent performable scene containing dialogue, stage direction, conflict, theme and purposeful performance elements.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "nerdc-jss1-english-literature-7",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Literature",
    "topic": "Figures of speech: similes and metaphors",
    "source": {
      "authority": "NERDC",
      "url": "https://nerdc.gov.ng/content_manager/jss/jss1-3_english_studies.pdf",
      "page": 24
    },
    "objectives": [
      "Identify figures of speech in sentences",
      "Identify similes and metaphors",
      "Use similes and metaphors correctly",
      "Transform suitable similes into metaphors and vice versa while preserving intended comparison"
    ],
    "prerequisites": [
      "literal vs figurative meaning",
      "adjectives and nouns"
    ],
    "teaching": [
      "A figure of speech uses language beyond ordinary literal wording for effect. Simile and metaphor both compare, but they build the comparison differently.",
      "A simile makes an explicit comparison, commonly with “like” or “as”; a metaphor presents one thing as another to transfer qualities without claiming literal identity.",
      "The point is the shared quality. “The classroom was like an oven” compares heat; identifying only the two nouns misses the meaning.",
      "A strong comparison is coherent and appropriate to context. Mixed or contradictory images make writing confusing.",
      "Transformations must preserve sense: “He is as brave as a lion” can become “He is a lion in battle,” but grammar/context may need adjustment rather than mechanical deletion of “like/as.”"
    ],
    "workedExamples": [
      "Simile: “Her voice was as soft as rain.” Metaphor: “Her voice was soft rain in the quiet room.” Both suggest gentleness.",
      "“The queue was a snake” is metaphor; the intended shared qualities may be length and winding shape, depending on context."
    ],
    "misconceptions": [
      "calling every sentence with “like” a simile even when “like” means preference",
      "treating metaphors as literal facts",
      "creating comparisons with no understandable shared quality",
      "converting by deleting one word without fixing grammar"
    ],
    "guidedPractice": [
      "Identify 15 similes/metaphors, state the shared quality for each, then transform six comparisons between forms."
    ],
    "independentPractice": [
      "Analyse figurative language in a short passage and write ten original comparisons—five similes, five metaphors—each matched to a stated effect."
    ],
    "mastery": {
      "criterion": "At least 90% identification and 80% meaningful transformation/use, with correct explanation of the shared quality.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  }
];

export function getJss1EnglishDeepLesson(topicId:string){return jss1EnglishDeepLessons.find(x=>x.topicId===topicId)}
