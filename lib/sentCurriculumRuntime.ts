import {structureTeachingSteps} from './lessonStepEngine';
import {sanitizeSourceForLearner} from './lessonPresentation';
import type {TutorPlan,TutorUnit} from './tutorCurriculum';
import {legacyTargetsForOfficialTopic} from './nerdc2025TopicMap';

type SentUnit={classLevel:string;subject:string;term:number;title:string;sourceFile:string;steps:string[];checks:string[];sourceSolutions?:string[];targets:string[]};
const sentUnits:SentUnit[]=[
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "1.1 Speech Organs and Sound Production",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Establish the full sound-production chain, piece by piece, not as one sentence",
      "Speech begins with air pushed from the LUNGS, up through the WINDPIPE, and across the VOCAL CORDS (two small flaps of tissue in the throat). If the vocal cords VIBRATE as air passes, the sound is VOICED; if they stay open and still, the sound is VOICELESS. After the vocal cords, the air is shaped by the TONGUE, TEETH, LIPS, and the roof of the mouth (the PALATE) into the final distinct sound we hear.",
      "*Step 2 — Prove the voiced/voiceless distinction physically, with an explicit self-test, before naming any sound pairs",
      "Place two fingers gently on the front of your throat (over the \"Adam's apple\" area). Say \"zzzzz\" and hold it — you should feel a distinct BUZZING vibration under your fingers. Now say \"ssssss\" and hold it — the buzzing STOPS, even though your mouth is in almost the exact same shape for both sounds. This proves: /z/ is VOICED (vocal cords vibrating), /s/ is VOICELESS (vocal cords still) — the mouth shape alone does not decide the sound; the vocal cords do.",
      "*Worked Example (testing the SAME method on a second, less obvious pair):",
      "Test /f/ vs /v/ the same way: say \"ffffff\" (fingers on throat — no vibration, VOICELESS) then \"vvvvvv\" (vibration felt, VOICED). Both sounds are made with the top teeth touching the bottom lip — IDENTICAL mouth position — so vibration is the ONLY thing separating them.",
      "*Practice Questions:"
    ],
    "checks": [
      "Use the finger-on-throat test to classify each of these as voiced or voiceless, describing what you felt: /p/, /b/, /t/, /d/.",
      "Explain why /s/ and /z/ can have the EXACT SAME tongue position but still be different sounds (what is the ONE thing that changes?).",
      "A learner says the mouth position for /f/ and /v/ is \"different.\" Correct this misunderstanding using the reasoning established above."
    ],
    "targets": [
      "Speech Work: speech organs and sound production; monophthongs (long/short vowel contrasts)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "1.2 Monophthongs — Long and Short Vowel Contrasts",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Establish what a monophthong is (a vowel sound that stays CONSTANT throughout, with no glide), setting up the crucial length distinction that follows",
      "*Step 2 — Present ALL FOUR core long/short contrasts explicitly, each with its OWN minimal pair AND an explanation of what physically changes (mouth openness, tongue height) — not just the symbols",
      "*Contrast 1: /iː/ (long) vs /ɪ/ (short)",
      "/iː/ as in \"sheep\" — the tongue is held HIGH and FRONT in the mouth, and the sound is held LONGER.",
      "/ɪ/ as in \"ship\" — the tongue is slightly LOWER and the sound is SHORTER, more relaxed.",
      "Minimal pair: \"sheep\" vs \"ship\" — say them side by side; only the vowel length/tension changes, yet the words mean completely different things (an animal vs a vessel).",
      "Second minimal pair (to reinforce with a DIFFERENT word pair, not just one example): \"seat\" (long, a place to sit) vs \"sit\" (short, the action) — again, only the vowel differs.",
      "*Contrast 2: /ɑː/ (long) vs /æ/ (short)",
      "/ɑː/ as in \"cart\" — mouth opens WIDE, tongue low and back.",
      "/æ/ as in \"cat\" — mouth opens wide too, but the sound is noticeably SHORTER and the tongue is slightly more forward.",
      "Minimal pair: \"cart\" vs \"cat.\" Second minimal pair: \"far\" vs (compare the vowel quality, though a perfect minimal pair is harder here — instead compare \"palm\" (long /ɑː/) vs \"pan\" (short /æ/)).",
      "*Contrast 3: /ɔː/ (long) vs /ɒ/ (short)",
      "/ɔː/ as in \"port\" — lips rounded, held longer.",
      "/ɒ/ as in \"pot\" — lips rounded but the sound is shorter and slightly more open.",
      "Minimal pair: \"port\" vs \"pot.\" Second minimal pair: \"caught\" vs \"cot.\"",
      "*Contrast 4: /uː/ (long) vs /ʊ/ (short)",
      "/uː/ as in \"food\" — lips tightly rounded, tongue high and back, held long.",
      "/ʊ/ as in \"foot\" — lips less tightly rounded, sound is shorter.",
      "Minimal pair: \"food\" vs \"foot.\" Second minimal pair: \"pool\" vs \"pull.\"",
      "*Step 3 — Explicitly flag WHY this matters for Nigerian English speakers specifically, since many Nigerian languages don't distinguish vowel length the same way, making this a genuine, high-value correction point, not a cosmetic accent issue",
      "Because vowel length changes MEANING in English (not just accent), a speaker who doesn't distinguish \"ship\" from \"sheep\" risks being misunderstood, not just sounding different. This is why BECE and WAEC oral English components specifically test these contrasts.",
      "*Practice Questions:"
    ],
    "checks": [
      "For each pair, say both words (with Avora modeling), and describe in words what changes: \"seat/sit,\" \"cart/cat,\" \"port/pot,\" \"food/foot.\"",
      "Give ONE more original minimal pair for the /iː/ vs /ɪ/ contrast, different from all examples above.",
      "Explain, in your own words, why mixing up /ɪ/ and /iː/ is a more serious error for a BECE/WAEC candidate than mixing up, say, how strongly an \"r\" is pronounced.",
      "A student pronounces \"beach\" with a short /ɪ/ instead of the correct long /iː/. What word might this accidentally sound like, and why does this matter for being understood clearly? (Consider: what if the intended meaning was about the coast, but the mispronunciation suggests a very different, inappropriate word?)"
    ],
    "targets": [
      "Speech Work: speech organs and sound production; monophthongs (long/short vowel contrasts)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "1.3 Consonant Sounds and Voiced/Voiceless Contrasts",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Extend the voiced/voiceless testing method from 1.1 to a FULL set of contrasting pairs, each with two minimal pairs, matching the thoroughness of the vowel section above",
      "*Contrast 1: /f/ (voiceless) vs /v/ (voiced) — recall the throat-vibration test from 1.1.",
      "Minimal pair 1: \"fan\" vs \"van.\" Minimal pair 2: \"fine\" vs \"vine.\"",
      "*Contrast 2: /s/ (voiceless) vs /z/ (voiced)",
      "Minimal pair 1: \"sip\" vs \"zip.\" Minimal pair 2: \"sue\" vs \"zoo.\"",
      "*Contrast 3: /p/ (voiceless) vs /b/ (voiced)",
      "Minimal pair 1: \"pat\" vs \"bat.\" Minimal pair 2: \"pin\" vs \"bin.\"",
      "*Contrast 4: /t/ (voiceless) vs /d/ (voiced)",
      "Minimal pair 1: \"tip\" vs \"dip.\" Minimal pair 2: \"town\" vs \"down.\"",
      "*Practice Questions:",
      "Strand 2: Structure / Grammar"
    ],
    "checks": [
      "Using the throat-vibration test, classify /k/ and /g/ as voiced or voiceless, and give one minimal pair for this contrast (e.g., \"coat\" vs \"goat\" — describe why this works).",
      "Give a SECOND original minimal pair (not listed above) for the /p/ vs /b/ contrast.",
      "A student says \"zip\" but it comes out sounding like \"sip.\" Using the throat-vibration test, explain exactly what needs to change physically to fix this."
    ],
    "targets": [
      "Speech Work: speech organs and sound production; monophthongs (long/short vowel contrasts)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "2.1 Nouns — Features and Functions",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Establish the noun definition, then work through EACH type with multiple, VARIED examples and at least one explicit misconception test per type",
      "*Common vs Proper Nouns",
      "A common noun names a general category; a proper noun names one SPECIFIC, particular example and is ALWAYS capitalized.",
      "Worked Example Set (testing several, not just one):",
      "\"boy\" (common) vs \"Chidi\" (proper — a specific boy)",
      "\"city\" (common) vs \"Kano\" (proper — a specific city)",
      "\"river\" (common) vs \"River Niger\" (proper — note: even though \"river\" appears in the proper noun, the WHOLE name refers to one specific river, so it's still capitalized)",
      "Misconception test: A student writes \"i live in lagos, nigeria.\" Identify ALL the errors (there are three: the pronoun \"I\" should be capitalized always regardless of noun rules, AND \"Lagos\" and \"Nigeria\" are both proper nouns requiring capitals). Correct sentence: \"I live in Lagos, Nigeria.\"",
      "*Countable vs Uncountable Nouns",
      "Step 1 — establish the TEST explicitly: can you meaningfully say \"one _, two _s\"?",
      "Worked Example Set (testing MULTIPLE nouns, including tricky ones):",
      "\"book\" — test: \"one book, two books\" ✓ sounds correct → COUNTABLE",
      "\"water\" — test: \"one water, two waters\"? This sounds wrong in normal usage → UNCOUNTABLE (to count it, we need a unit: \"one glass of water, two glasses of water\")",
      "\"furniture\" — test: \"one furniture, two furnitures\"? Wrong → UNCOUNTABLE (correct: \"one piece of furniture, two pieces of furniture\")",
      "\"advice\" — test: \"one advice, two advices\"? Wrong, even though it feels like it should be countable → UNCOUNTABLE (correct: \"one piece of advice\")",
      "\"chair\" — test: \"one chair, two chairs\" ✓ → COUNTABLE",
      "Notice from this SET of examples: uncountable nouns often describe substances (water), collective categories (furniture), or abstract concepts (advice) — while countable nouns are usually distinct, separable objects.",
      "*Practice Questions:"
    ],
    "checks": [
      "Identify common vs proper: \"teacher,\" \"Nigeria,\" \"river,\" \"River Niger,\" \"Musa,\" \"school.\"",
      "Using the \"one _, two _s\" test explicitly, classify as countable or uncountable: \"chair,\" \"milk,\" \"idea,\" \"sand,\" \"information,\" \"pencil.\"",
      "Correct ALL errors in: \"my friend chidi lives near river niger in lagos.\" (identify every capitalization error, there are four).",
      "A student says \"I need three informations about the topic.\" Using the uncountable-noun test, explain the error and correct the sentence (hint: what word could replace \"informations\" to express the same idea correctly, similar to \"pieces of advice\"?)."
    ],
    "targets": [
      "Grammar: nouns (common/proper, countable/uncountable); verbs (action/state); adjectives (comparison); adverbs; present tense & subject-verb agreement; pronouns (subject/object); prepositions & conjunctions (introductory)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "2.2 Verbs — Action vs State, With Extended Testing",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Recall the action/state distinction, then test it across MULTIPLE examples, including tricky borderline cases",
      "Worked Example Set:",
      "\"run\" — clearly ACTION (physical movement).",
      "\"know\" — STATE (a mental condition, nothing is physically \"happening\").",
      "\"seem\" — STATE (\"She seems tired\" — describes a state, not an action).",
      "\"become\" — this is TRICKY: \"become\" describes a CHANGE of state, but it's still classified as a STATE verb (not action), because it doesn't describe a physical action being performed — it describes a condition changing.",
      "\"think\" — this is DOUBLE-USED in English: \"I think about him\" (STATE — describing an ongoing mental condition) vs \"I am thinking about the problem right now\" (this CAN be used with -ing to emphasize the process, but \"think\" as a state verb is more commonly used in simple present: \"I think this is correct,\" NOT usually \"I am thinking this is correct\").",
      "*Practice Questions:"
    ],
    "checks": [
      "Classify each verb as action or state: \"jump,\" \"believe,\" \"write,\" \"seem,\" \"dance.\"",
      "Explain why \"become\" is classified as a state verb even though it describes a CHANGE (hint: is the change itself something being physically DONE, or something HAPPENING TO the subject?).",
      "Identify the verb type in: \"The soup tastes delicious.\" (Is \"tastes\" here describing an action being performed, or a state/quality being described?)"
    ],
    "targets": [
      "Grammar: nouns (common/proper, countable/uncountable); verbs (action/state); adjectives (comparison); adverbs; present tense & subject-verb agreement; pronouns (subject/object); prepositions & conjunctions (introductory)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "2.3 Adjectives — Comparison, With Full Rule Testing",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Recall the short/long adjective rule, then test it across a WIDE range of adjectives, including edge cases (2-syllable adjectives, which can go EITHER way depending on their ending)",
      "Worked Example Set (short adjectives, \"-er/-est\"):",
      "tall → taller → tallest",
      "small → smaller → smallest",
      "fast → faster → fastest",
      "Worked Example Set (long adjectives, \"more/most\"):",
      "beautiful → more beautiful → most beautiful",
      "intelligent → more intelligent → most intelligent",
      "interesting → more interesting → most interesting",
      "Worked Example (2-syllable EDGE CASE — adjectives ending in \"-y\" typically STILL use \"-er/-est,\" changing y to i, which surprises many learners who assume all 2+ syllable words need \"more/most\"):",
      "happy → happier → happiest (NOT \"more happy\")",
      "easy → easier → easiest (NOT \"more easy\")",
      "Worked Example (irregular, MUST be memorized, no rule applies):",
      "good → better → best",
      "bad → worse → worst",
      "far → farther/further → farthest/furthest",
      "*Practice Questions:",
      "Strand 3: Reading Comprehension & Vocabulary Development"
    ],
    "checks": [
      "Give comparative and superlative forms for: \"big,\" \"clever,\" \"generous,\" \"busy,\" \"careful.\" (Identify which rule applies to EACH one individually, since this set deliberately mixes short, long, and \"-y\" edge cases.)",
      "A student writes \"She is more happier than before,\" combining BOTH the \"-er\" ending AND \"more.\" Identify this DOUBLE-COMPARISON error and correct it.",
      "Explain why \"happy\" uses \"-er/-est\" (happier/happiest) even though it looks like a \"longer\" word that might seem to need \"more/most\" (hint: recall the \"-y ending\" sub-rule).",
      "Give the comparative and superlative of \"far,\" noting that it has TWO acceptable irregular forms — why might a language have two valid options for the same word (no need for a definitive answer, just reason about it)?"
    ],
    "targets": [
      "Grammar: nouns (common/proper, countable/uncountable); verbs (action/state); adjectives (comparison); adverbs; present tense & subject-verb agreement; pronouns (subject/object); prepositions & conjunctions (introductory)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "3.1 The SPQ3R Method — Full Worked Application",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Apply EVERY step of SPQ3R to an actual sample passage, in full, rather than describing the method abstractly",
      "*Sample passage: \"Bees play a vital role in our ecosystem. They pollinate flowers, fruits, and vegetables, which allows plants to reproduce. Without bees, many of the foods we eat, such as apples and almonds, would become scarce. Unfortunately, bee populations are declining due to pesticide use and habitat loss. Scientists are working on ways to protect bees, including creating bee-friendly gardens and restricting harmful pesticides.\"",
      "*Survey: Skimming the title/topic (\"Bees\") and first sentence suggests this passage will explain bees' importance and possibly a problem they face.",
      "*Question: Before reading in detail, form questions: \"What do bees actually DO for the ecosystem?\" \"What is threatening bees?\" \"What is being done about it?\"",
      "*Read: Read the passage carefully, specifically looking for answers to these three questions.",
      "*Recite: WITHOUT looking back, try to answer: bees pollinate plants (allowing reproduction); they're threatened by pesticides and habitat loss; scientists are creating bee-friendly gardens and restricting pesticides.",
      "*Review: Check back against the passage — did we recall everything correctly? (In this case, yes — but the REVIEW step is where any gaps would be caught and corrected.)",
      "*Practice Questions:"
    ],
    "checks": [
      "Apply the FULL SPQ3R method (all 5 steps, written out explicitly) to this new passage: \"Rainforests cover only a small percentage of Earth's surface, but they are home to more than half of the world's plant and animal species. They also help regulate the global climate by absorbing carbon dioxide. However, deforestation for farming and logging is destroying rainforests at an alarming rate, threatening both biodiversity and climate stability.\"",
      "Explain why forming QUESTIONS before reading (the \"Question\" step) helps you read more actively than just reading straight through with no preparation."
    ],
    "targets": [
      "Comprehension: SPQ3R reading strategy; answering comprehension questions using textual evidence"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "3.2 Distinguishing Fact From Opinion (New Sub-Skill, Supporting Comprehension)",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Establish the test: a FACT can be checked/proven true or false; an OPINION expresses a belief or judgment that cannot be simply proven",
      "Worked Example Set (testing multiple sentences):",
      "\"Lagos is the most populous city in Nigeria.\" — FACT (can be checked against population data).",
      "\"Lagos is the best city in Nigeria.\" — OPINION (\"best\" is a judgment, not a provable fact).",
      "\"Water boils at 100°C at sea level.\" — FACT (scientifically verifiable).",
      "\"Science is more important than art.\" — OPINION (a value judgment).",
      "*Practice Questions:",
      "Strand 4: Composition"
    ],
    "checks": [
      "Classify each as fact or opinion: \"Nigeria gained independence in 1960.\" / \"1960 was a great year for Nigeria.\" / \"The Niger River is the longest river in West Africa.\" / \"Rivers are more beautiful than mountains.\"",
      "Write one factual sentence and one opinion sentence about your own school, and explain what makes each one a fact or an opinion."
    ],
    "targets": [
      "Comprehension: SPQ3R reading strategy; answering comprehension questions using textual evidence"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "4.1 Narrative Essay — Fully Annotated, Extended Example",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Present a COMPLETE narrative essay (not just a paragraph), annotated at EVERY key structural moment, to show the full shape of a good composition, not just isolated sentences",
      "Title: The Day I Got Lost*",
      "\"It was a bright Saturday morning when my mother sent me to buy pepper from the market, a task I had done many times before.\"* — [Annotation: OPENING establishes TIME (Saturday morning), a clear TASK/GOAL (buy pepper), and hints at FAMILIARITY (\"many times before\") which sets up an ironic contrast with what's about to go wrong.]",
      "\"As I walked through the crowded market, I noticed a new stall selling toys that I had never seen before. Curiosity got the better of me, and I wandered over to look, forgetting my original errand for a moment.\"* — [Annotation: this is the RISING ACTION / COMPLICATION — a decision that will cause the story's central problem. Notice it's caused by a believable, relatable temptation (curiosity), not a random unexplained event.]",
      "\"When I finally looked up, the familiar path back home was nowhere to be seen. Panic rose in my chest as I realized I had wandered too far and no longer recognized my surroundings.\"* — [Annotation: this is the CLIMAX — the central problem is now fully realized, and the writer shows INTERNAL EMOTION (\"panic rose in my chest\"), not just external events, which makes the narrative more engaging than a flat description.]",
      "\"I took a deep breath and remembered my mother's advice: if ever lost, find a trusted adult, like a trader, and ask for help. I approached a kind-looking woman selling cloth, and she guided me back to the main road, from where I recognized my way home.\"* — [Annotation: this is the RESOLUTION — the problem is solved through a specific, logical action (recalling advice, seeking a trusted adult), not a random or convenient coincidence, which makes the resolution feel EARNED.]",
      "\"That day taught me an important lesson: always stay focused on the task at hand, and if lost, staying calm and seeking help is far better than panicking alone.\"* — [Annotation: the CONCLUSION draws an explicit LESSON from the experience, giving the narrative a purpose beyond just \"then this happened, then that happened.\"]",
      "*Step 2 — Explicitly name the FULL narrative structure demonstrated above, as a reusable pattern",
      "Opening (time/task/setup) → Rising Action (a decision/event causing a problem) → Climax (the problem fully realized, with emotion shown) → Resolution (problem solved through a logical, earned action) → Conclusion (a reflection/lesson).",
      "*Practice Questions:",
      "Strand 5: Literature-in-English"
    ],
    "checks": [
      "Using the FULL five-part structure above (Opening, Rising Action, Climax, Resolution, Conclusion), write your own complete short narrative essay titled \"The Day the Lights Went Out,\" labeling which part of your essay corresponds to each structural stage.",
      "In the model essay above, identify the specific PHRASE that shows the writer's INTERNAL EMOTION during the climax, and explain why showing emotion (not just events) makes a narrative more engaging.",
      "Why does the model essay's resolution (asking a trader for help) work better than if the writer had simply said \"and then I found my way home by luck\"? (Consider: what makes a resolution feel \"earned\" versus random?)"
    ],
    "targets": [
      "Composition: types of composition (narrative, descriptive, argumentative, expository); elements (introduction, body, conclusion) — full 5-part narrative structure"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "5.1 Functions of Literature — Expanded With Examples for Each Function",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Give a CONCRETE example text/story-type for EACH function, not just naming the functions abstractly",
      "To entertain: an adventure folktale with an exciting chase or trick (e.g., \"Anansi and the Wisdom Pot\" — engaging purely as a fun story).",
      "To educate: a story explicitly teaching a moral, like \"The Tortoise and the Hare\" (teaches persistence over arrogance) — the LESSON is the primary point, entertainment is secondary.",
      "To preserve culture: an origin story explaining a community's traditions or history (e.g., a story explaining why a particular festival is celebrated) — passing forward shared cultural knowledge and identity across generations.",
      "*Practice Questions:"
    ],
    "checks": [
      "Think of one story you know (from any source) and explain which of the THREE functions it serves MOST strongly, with reasoning.",
      "Can a single story serve MORE THAN ONE function at once? Using \"The Tortoise and the Hare\" as an example, explain how it might serve BOTH the \"educate\" and \"entertain\" functions simultaneously."
    ],
    "targets": [
      "Literature: functions of literature; genres (prose, poetry, drama); introduction to folktales"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 1,
    "title": "5.2 Prose, Poetry, and Drama — Extended Contrast With a Shared Topic",
    "sourceFile": "jss1-english-term1.md",
    "steps": [
      "*Step 1 — Take the SAME simple content and show it rendered in all THREE genres side by side, in FULL (not just a sentence fragment each), so the structural differences are completely unmistakable",
      "*Topic: A boy waiting for rain during a drought",
      "Prose version:*",
      "\"Tunde stood by the window, watching the cracked earth outside. It had not rained in three months, and the once-green farm had turned brown and lifeless. He wondered if the rains would ever return.\"",
      "Poetry version:*",
      "\"Cracked earth beneath a burning sky, / Tunde waits, and wonders why. / Three long months without a drop, / Will the dry season ever stop?\"",
      "[Note the RHYME (sky/why, drop/stop) and RHYTHM — a compressed, musical way of expressing the same idea, using far fewer words but more emotional intensity through sound.]",
      "Drama version:*",
      "\"[A dry, cracked farm. TUNDE stands at the window, staring out.]",
      "TUNDE: (sighing) Three months now... three months without rain. (turns to his mother) Mama, will it ever rain again?",
      "MOTHER: (wearily) We must have faith, my son. The rains always return, in their own time.\"",
      "[Note the STAGE DIRECTIONS (sighing, turns to his mother, wearily) which guide a PERFORMER's actions and tone — information that exists nowhere in the prose or poetry versions.]",
      "*Practice Questions:",
      "This completes the REDONE JSS1 English Studies, First Term at true full depth — multiple minimal pairs per contrast, multiple worked examples per grammar rule with misconception tests, a fully-structured five-part annotated narrative essay, and a complete three-genre side-by-side comparison. This is the depth standard going forward. Continuing next to redo JSS1 English Term 2 at this same standard."
    ],
    "checks": [
      "Using the SAME topic (a boy waiting for rain), identify THREE specific structural features that appear ONLY in the drama version and NOT in the prose version.",
      "Identify the rhyme pattern in the poetry version above (which words rhyme with which?).",
      "Choose your own simple topic (e.g., \"a girl finding a lost puppy\") and write it as BOTH a short prose paragraph AND a short drama excerpt (with at least one stage direction), to practice the structural shift yourself."
    ],
    "targets": [
      "Literature: functions of literature; genres (prose, poetry, drama); introduction to folktales"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "1.1 Consonant Clusters — Extended Practice With Multiple Positions",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Establish clusters can occur at the START, MIDDLE, or END of a word, testing all three positions explicitly, not just initial clusters",
      "*Initial clusters (beginning of word): \"stop\" (/st/), \"play\" (/pl/), \"spring\" (/spr/ — a THREE-consonant cluster, an even harder case).",
      "*Medial clusters (middle of word): \"extra\" (/kstr/ across syllable boundary), \"hundred\" (/ndr/).",
      "*Final clusters (end of word): \"asked\" (/skt/), \"texts\" (/ksts/ — four consonants in a row, a genuinely difficult case worth practicing slowly).",
      "*Step 2 — Establish the SPECIFIC error pattern common to Nigerian English speakers explicitly: inserting a vowel BETWEEN cluster consonants — and demonstrate the self-check",
      "Say \"spring\" slowly. If it comes out sounding like \"supuring\" or \"isipirin\" (with extra vowel sounds inserted between s-p-r), this is the error to correct. The target pronunciation keeps /s/, /p/, /r/ running together with NO vowel sound between them, before the vowel of \"-ing.\"",
      "*Practice Questions:"
    ],
    "checks": [
      "Practice \"asked,\" \"texts,\" and \"months\" slowly, then at normal speed, checking specifically for inserted vowels in the FINAL cluster.",
      "Identify the consonant cluster(s) in \"children\" and state whether they occur at the start, middle, or end of the word.",
      "A learner pronounces \"black\" as \"belack\" (inserting a vowel before the cluster). Using the self-check method, describe what the CORRECT pronunciation should sound like instead."
    ],
    "targets": [
      "Speech Work: consonant clusters; diphthongs"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "1.2 Diphthongs — Full Set With Contrastive Testing",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Present ALL the commonly-taught diphthongs at this level with minimal pairs AND contrast against a monophthong for each, reinforcing the Term 1 distinction thoroughly",
      "*/eɪ/ as in \"day\" — contrast with the monophthong /e/ as in \"bed\": say \"bed\" then \"bay\" — \"bed\" stays constant, \"bay\" glides.",
      "*/aɪ/ as in \"my\" — contrast with /ɑː/ as in \"car\": \"my\" glides from an open sound toward /ɪ/; \"car\" stays constant.",
      "*/ɔɪ/ as in \"boy\" — contrast with /ɔː/ as in \"bore\": \"boy\" glides toward /ɪ/; \"bore\" stays constant.",
      "*/aʊ/ as in \"cow\" — contrast with /ɑː/ as in \"car\": \"cow\" glides toward /ʊ/; \"car\" stays constant.",
      "*Practice Questions:",
      "Strand 2: Structure / Grammar"
    ],
    "checks": [
      "For each diphthong above, give ONE additional word (different from the examples) containing it.",
      "Say \"toy\" and \"tore\" side by side, and describe what you notice about whether the vowel sound stays still or moves.",
      "Explain, in your own words, the core test for identifying whether a vowel sound is a monophthong or diphthong (what should you listen/feel for?)."
    ],
    "targets": [
      "Speech Work: consonant clusters; diphthongs"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "2.1 Articles — Extended Testing With Tricky Cases",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Test the sound-based a/an rule across a DELIBERATELY tricky set of words, including several where spelling and sound disagree, since ONE example (hour/university) isn't enough to build real skill",
      "Worked Example Set (testing MANY words, not just the original two):",
      "\"an hour\" (silent h, vowel SOUND) / \"a house\" (h IS pronounced here, consonant sound — contrast directly with \"hour\")",
      "\"a university\" (spelled with vowel, but SOUNDS like \"yoo-\", a consonant /j/ sound) / \"an umbrella\" (spelled with vowel, sounds like a genuine vowel /ʌ/)",
      "\"an honest man\" (silent h in \"honest\") / \"a hospital\" (h IS pronounced)",
      "\"a European country\" (sounds like \"yer-\", consonant /j/) / \"an egg\" (genuine vowel sound)",
      "*Step 2 — Extend \"the\" usage with a SECOND rule beyond \"specific/known\": use with SUPERLATIVES and UNIQUE things",
      "\"The\" is also used before SUPERLATIVE adjectives (\"the tallest building\") and things that are UNIQUE — there's only one of them (\"the sun,\" \"the President of Nigeria\" — since at any given time there is only one holder of that specific office).",
      "*Practice Questions:"
    ],
    "checks": [
      "Choose \"a\" or \"an\" for EACH: _ hour, _ house, _ university, _ umbrella, _ honest man, _ hospital, _ European country, _ egg. (Explain your reasoning for at least THREE of the trickier ones.)",
      "Explain why we say \"an MP\" (Member of Parliament) even though \"M\" is a consonant LETTER (hint: how do we SAY the letter \"M\" aloud — \"em\" — and what sound does that start with?).",
      "Fill in \"a,\" \"an,\" or \"the\": \"She is _ best student in _ class. I saw _ elephant at _ zoo.\" (identify which rule — specific/known, superlative, or sound-based — applies to each blank)."
    ],
    "targets": [
      "Grammar: articles (a/an/the — sound-based rule); plurals (regular/irregular); past tense (regular/irregular)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "2.2 Plurals — Extended Irregular List and Compound Nouns",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Extend the irregular plural list significantly beyond the original short set, and introduce COMPOUND NOUN pluralization, a genuinely tricky related skill",
      "Extended irregular list: child→children, man→men, woman→women, tooth→teeth, foot→feet, mouse→mice, goose→geese, person→people, ox→oxen, sheep→sheep (UNCHANGED — an important sub-case: some nouns have IDENTICAL singular and plural forms), fish→fish (also unchanged, though \"fishes\" exists for referring to multiple SPECIES of fish specifically).",
      "*Compound noun pluralization (a genuinely new, tricky sub-skill): for compound nouns like \"mother-in-law,\" the MAIN noun (the most important word) gets pluralized, not the whole phrase: mother-in-law → mothers-in-law (NOT \"mother-in-laws\"). Similarly: passer-by → passers-by.",
      "*Worked Example (testing the compound-noun rule against a common overgeneralization error):",
      "A student writes \"I have three brother-in-laws.\" INCORRECT — the main noun \"brother\" should be pluralized: \"brothers-in-law.\"",
      "*Practice Questions:"
    ],
    "checks": [
      "Give the plural forms of: goose, person, sheep, fish (note which ones stay UNCHANGED and explain why this is different from a regular \"-s\" rule).",
      "Give the plural of \"sister-in-law\" and explain which word gets pluralized and why.",
      "A student writes \"Two mans came to the meeting.\" Identify BOTH the irregular-plural error and explain what the correct form should be."
    ],
    "targets": [
      "Grammar: articles (a/an/the — sound-based rule); plurals (regular/irregular); past tense (regular/irregular)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "2.3 Past Tense — Extended Irregular Verb Practice",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Extend the irregular verb list significantly, organizing them by PATTERN TYPE where possible, since some irregular verbs share sub-patterns that can help memory (even though the overall category remains \"irregular\")",
      "Group A (vowel change only): sing→sang, ring→rang, drink→drank, sink→sank (notice the shared pattern: i→a change — while still irregular overall, recognizing sub-patterns like this genuinely helps memorization).",
      "Group B (completely unpredictable): go→went, be→was/were, have→had.",
      "Group C (no change at all): put→put, cut→cut, cost→cost (the past tense form is IDENTICAL to the present — a distinct sub-case worth flagging, similar to the \"sheep/sheep\" plural case above).",
      "*Worked Example (testing understanding of Group C, an often-missed case since students expect ALL verbs to change form):",
      "\"Yesterday, I cutted my finger.\" INCORRECT — \"cut\" belongs to Group C (no change): the correct past tense is simply \"cut\": \"Yesterday, I cut my finger.\"",
      "*Practice Questions:",
      "Strand 3: Reading Comprehension & Vocabulary Development"
    ],
    "checks": [
      "Give the past tense of these Group A verbs: swim, begin, run (identify the vowel-change pattern in each, even though you must still memorize each individually).",
      "Give the past tense of: put, cost, hit (all Group C — no change).",
      "A student writes \"I putted the book on the table.\" Identify the error, referencing the Group C pattern, and correct it.",
      "Explain why recognizing \"sub-patterns\" among irregular verbs (like Group A's vowel change) is helpful for memorization, even though these verbs are still technically \"irregular\" (not following the simple \"-ed\" rule)."
    ],
    "targets": [
      "Grammar: articles (a/an/the — sound-based rule); plurals (regular/irregular); past tense (regular/irregular)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "3.1 Reading to Understand the Writer's Purpose — Extended With Mixed-Purpose Texts",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Test purpose-identification across MULTIPLE varied examples, including a genuinely MIXED-purpose text, since real writing often blends purposes",
      "Worked Example Set (five varied texts, tested individually):",
      "\"The average rainfall in Lagos is 1,800mm per year.\" — INFORM (a plain fact).",
      "\"You simply MUST try this incredible new restaurant — the best jollof rice in town!\" — PERSUADE (exaggerated claims, urging action).",
      "\"Once upon a time, a clever tortoise outwitted a greedy leopard...\" — ENTERTAIN (storytelling).",
      "\"Global warming, caused mainly by burning fossil fuels, is raising sea levels. We must all reduce our carbon footprint to protect our planet's future.\" — MIXED: the FIRST sentence informs (facts about causes), but the SECOND sentence shifts to persuade (a call to action, \"we must\"). Real texts often combine purposes like this, and identifying WHERE the shift happens is a valuable, more advanced skill.",
      "*Practice Questions:"
    ],
    "checks": [
      "Classify each of these texts by purpose, explaining your reasoning: \"Mount Everest is the tallest mountain in the world.\" / \"Everyone should visit Everest at least once — it's a life-changing experience!\" / \"The brave climber pressed on despite the storm, determined to reach the summit.\"",
      "Find a MIXED-purpose sentence pair of your own (two sentences, one informing and one then persuading, on any topic) and identify exactly where the shift occurs."
    ],
    "targets": [
      "Comprehension: reading for writer's purpose; word families (topic-based vocabulary)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "3.2 Word Families — Extended Across Multiple Topics With Full Sentences",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Build out word families for MULTIPLE topics fully, with usage demonstrated in context, not just word lists",
      "*Word family: Police Work — officer, suspect, evidence, arrest, investigation, witness, crime scene, patrol.",
      "Worked usage: \"The police officer arrived at the crime scene and began collecting evidence, while a witness described what she had seen to help identify the suspect.\"",
      "*Word family: Place of Worship — congregation, sermon, prayer, worship, altar, choir, scripture, faith.",
      "Worked usage: \"The congregation gathered to listen to the sermon, and the choir led everyone in a hymn of worship before the prayer began.\"",
      "*Practice Questions:",
      "Strand 4: Composition"
    ],
    "checks": [
      "List 6 words belonging to a \"Farming\" word family, and use at least 3 of them together in one connected sentence (as demonstrated above), not just a list.",
      "List 6 words belonging to a \"Sports/Games\" word family, and write a short 2-sentence description of a football match using at least 4 of them."
    ],
    "targets": [
      "Comprehension: reading for writer's purpose; word families (topic-based vocabulary)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "4.1 Descriptive Essay — Full Extended Example With All Senses",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Present a COMPLETE descriptive paragraph (not a single sentence), deliberately using ALL FIVE senses (adding TASTE, which was missing from the original shorter version), with each sense-moment annotated",
      "\"The aroma of frying akara drifted from a nearby stall, mingling with the sharper smell of exhaust fumes from passing buses [SMELL]. Traders' voices rose and fell in a constant rhythm of bargaining and laughter [SOUND]. Stalls overflowing with ripe mangoes, deep purple eggplants, and bundles of green vegetables stretched as far as I could see [SIGHT]. When I finally bought a piece of roasted corn, its smoky, slightly sweet flavor filled my mouth with each bite [TASTE]. The rough husk of the corn scratched lightly against my fingers as I peeled it back [TOUCH].\"*",
      "*Step 2 — Explicitly name why VARYING sentence length and starting words (not starting every sentence the same way) makes description flow better, an additional craft point beyond just \"use the senses\"",
      "Notice each sentence in the example ABOVE starts differently (\"The aroma...\", \"Traders' voices...\", \"Stalls overflowing...\", \"When I finally...\", \"The rough husk...\") — this variety keeps the writing from feeling repetitive or list-like, which is a common weakness in descriptive writing when every sentence follows an identical pattern.",
      "*Practice Questions:"
    ],
    "checks": [
      "Write a descriptive paragraph (5–6 sentences) about a kitchen during meal preparation, including ALL FIVE senses (sight, sound, smell, touch, AND taste), labeling which sense each sentence targets.",
      "Rewrite this repetitive-sentence-pattern paragraph to vary the sentence openings: \"The market was noisy. The market was colorful. The market was crowded. The market smelled of spices.\" (Keep the same content/senses, but vary HOW each sentence begins.)"
    ],
    "targets": [
      "Composition: descriptive essay (sensory detail); paragraph development (topic sentences)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "4.2 Paragraph Development — Testing Unity (Off-Topic Sentence Detection)",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Introduce a genuinely useful skill: detecting when a sentence does NOT belong in a paragraph because it strays from the main idea (paragraph UNITY)",
      "*Worked Example (a paragraph with ONE deliberately off-topic sentence, to be identified):",
      "\"Football is Nigeria's most popular sport. Millions of fans support local and international clubs. My favorite food is jollof rice with fried plantain. Young children often dream of becoming professional players.\"",
      "The THIRD sentence (\"My favorite food...\") does NOT support the topic sentence about football's popularity — it breaks the paragraph's UNITY and should be removed or moved to a different paragraph about food.",
      "*Practice Questions:",
      "Strand 5: Literature-in-English"
    ],
    "checks": [
      "Identify the off-topic sentence in this paragraph, and explain why it doesn't belong: \"Reading is an important habit for students. It improves vocabulary and comprehension skills. Books can be borrowed from the school library for free. My uncle owns a bookshop in Ibadan. Reading also helps students perform better in exams.\"",
      "Write a 4-sentence paragraph with a clear topic sentence, but DELIBERATELY include one off-topic sentence. Then swap with identifying your OWN error by explaining, in writing, which sentence breaks the paragraph's unity and why."
    ],
    "targets": [
      "Composition: descriptive essay (sensory detail); paragraph development (topic sentences)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "5.1 Elements of Prose — Extended With a Second, Contrasting Story",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Apply the plot/setting/theme/characterisation framework to a SECOND story, different in TYPE from the Tortoise-and-Hare example, to prove the framework generalizes",
      "*Story: \"Cinderella\" (a widely-known tale, for contrast with the animal-based Tortoise-and-Hare)",
      "Plot: a mistreated girl is helped by magic to attend a ball, loses a glass slipper while fleeing at midnight, and is later identified and married by the prince using that slipper.",
      "Setting: a kingdom, in an unspecified historical/fantasy time period (contrast with Tortoise-and-Hare's vague \"general\" setting — Cinderella's setting is more clearly a FANTASY KINGDOM specifically).",
      "Theme: kindness and inner goodness are eventually rewarded, even after suffering injustice.",
      "Characterisation: Cinderella is shown as kind and patient through her ACTIONS (enduring mistreatment without becoming cruel herself); the stepsisters are shown as unkind through THEIR actions and treatment of her.",
      "*Practice Questions:"
    ],
    "checks": [
      "Apply the full plot/setting/theme/characterisation framework to a THIRD story of your own choosing, different from both examples given.",
      "Compare the THEMES of \"Tortoise and Hare\" (persistence over arrogance) and \"Cinderella\" (kindness rewarded) — are these themes similar or different? Explain your reasoning."
    ],
    "targets": [
      "Literature: elements of prose (plot, setting, theme, characterisation); introduction to drama (dialogue, stage directions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 2,
    "title": "5.2 Drama Elements — Extended With a Longer Scene and Additional Structural Terms",
    "sourceFile": "jss1-english-term2.md",
    "steps": [
      "*Step 1 — Introduce TWO additional drama-specific terms beyond dialogue/stage directions: ACT and SCENE, establishing how longer plays are organized",
      "An Act is a MAJOR division of a play (like a chapter in a book), and a Scene is a smaller division WITHIN an act, usually marking a change in time or location.",
      "*Worked Example (a longer excerpt, showing act/scene labeling AND extended dialogue with varied stage directions):",
      "\"ACT 1, SCENE 1",
      "[A village square, early morning. Market traders are setting up their stalls.]",
      "ADA: (arranging tomatoes on her table) Another busy day ahead, I hope.",
      "MUSA: (walking over, smiling) Good morning, Ada! Business looking good today?",
      "ADA: (sighing) Not as good as I'd like. Prices at the wholesale market have gone up again.",
      "MUSA: (nodding sympathetically) Everyone is feeling it these days.\"",
      "Notice the STAGE DIRECTIONS here do more than just describe physical actions (arranging, walking) — they also convey EMOTIONAL TONE (sighing = frustration, smiling = warmth, nodding sympathetically = understanding), giving a performer clear guidance on HOW to deliver each line.",
      "*Practice Questions:",
      "This completes the REDONE JSS1 English Studies, Second Term at full depth. Continuing next to redo JSS1 English Term 3."
    ],
    "checks": [
      "Explain the difference between an \"Act\" and a \"Scene,\" using the chapter/book analogy or your own comparison.",
      "Write a short scene (6–8 lines) labeled \"ACT 1, SCENE 1,\" including at least THREE different stage directions that convey EMOTIONAL TONE (not just physical action, as demonstrated above).",
      "Why might a stage direction like \"(sighing)\" be important for a performer, even though the AUDIENCE never sees the word \"sighing\" written down — only the actor's actual sigh?"
    ],
    "targets": [
      "Literature: elements of prose (plot, setting, theme, characterisation); introduction to drama (dialogue, stage directions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "1.1 Mixed Discrimination — All Vowel Types Combined, With a Full Diagnostic Set",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Present a genuinely CHALLENGING mixed set (short monophthong, long monophthong, diphthong all together) across MULTIPLE words, since real listening/speaking tests mix these types unpredictably",
      "Diagnostic set: \"bit\" (short /ɪ/), \"beat\" (long /iː/), \"bait\" (diphthong /eɪ/), \"bat\" (short /æ/), \"boat\" (diphthong /oʊ/), \"bought\" (long /ɔː/), \"bout\" (diphthong /aʊ/).",
      "*Worked Example (full reasoning for classifying EACH one, not just an answer key):",
      "\"bit\" — say it: the vowel is short and doesn't move → short monophthong /ɪ/.",
      "\"beat\" — the vowel is held longer but doesn't move in quality → long monophthong /iː/.",
      "\"bait\" — say it slowly: notice the vowel STARTS at one quality and GLIDES toward another → diphthong /eɪ/.",
      "Continue this reasoning for each remaining word in the set.",
      "*Practice Questions:",
      "Strand 2: Structure / Grammar"
    ],
    "checks": [
      "Complete the full classification (short monophthong / long monophthong / diphthong) for ALL SEVEN words in the diagnostic set above, explaining your reasoning for at least three of them.",
      "Create your OWN diagnostic set of 4 words (different from all examples given across both terms) that tests a mix of all three vowel types."
    ],
    "targets": [
      "Speech Work: mixed vowel discrimination (monophthongs + diphthongs)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "2.1 Prepositions of Time vs Place — Extended With a Full Diagnostic Passage",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Test preposition choice across an ENTIRE short passage with MULTIPLE blanks, rather than one isolated sentence, since real usage requires sustained, consistent application",
      "*Diagnostic passage: \"We arrived _(1) the stadium _(2) 4 o'clock _(3) the afternoon. The match started _(4) 5 o'clock, and we sat _(5) the front row, close _(6) the players.\"",
      "Full reasoning for each blank:",
      "(1) \"at the stadium\" — a specific POINT/place.",
      "(2) \"at 4 o'clock\" — a specific TIME point.",
      "(3) \"in the afternoon\" — a broader TIME PERIOD, not a specific point (contrast with \"at 4 o'clock\" — this shows \"at\" and \"in\" can BOTH appear in the same sentence for DIFFERENT reasons).",
      "(4) \"at 5 o'clock\" — again, a specific time point.",
      "(5) \"in the front row\" — an area/enclosed position.",
      "(6) \"close to the players\" — \"to\" here shows PROXIMITY/direction, a different preposition function from the time/place ones above.",
      "*Practice Questions:"
    ],
    "checks": [
      "Complete this SECOND diagnostic passage with the correct prepositions, explaining your reasoning for each: \"The party is _ Saturday, _ 7pm, _ my house, _ the living room.\"",
      "Explain why \"in the afternoon\" uses \"in\" while \"at 4 o'clock\" uses \"at,\" even though both describe TIME (hint: recall the distinction between a broad PERIOD and a specific POINT)."
    ],
    "targets": [
      "Grammar: prepositions of time vs place; conjunctions (coordinating vs subordinating)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "2.2 Conjunctions — Extended Categories (Coordinating vs Subordinating)",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Introduce the distinction between COORDINATING conjunctions (joining EQUAL/similar ideas) and SUBORDINATING conjunctions (joining a main idea to a DEPENDENT, supporting idea) — a genuinely new, more advanced distinction beyond simply \"joining words\"",
      "*Coordinating conjunctions (join equal parts): and, but, or, so, for, nor, yet — often remembered by the acronym FANBOYS.",
      "Worked Example: \"She was tired, but she finished her homework.\" (two EQUAL, complete ideas joined).",
      "*Subordinating conjunctions (join a main idea to a dependent one): because, although, since, if, when, while.",
      "Worked Example: \"She finished her homework, although she was tired.\" (notice \"although she was tired\" cannot stand alone as a complete sentence — it DEPENDS on the main clause).",
      "*Step 2 — Test the SAME idea with different conjunction TYPES, to show they can be interchangeable in some cases but not always identical in emphasis",
      "\"She was hungry, but she had no money.\" (coordinating — presents both facts as equally weighted)",
      "\"Although she was hungry, she had no money.\" (subordinating — restructures which idea is \"main\" and which is \"supporting,\" though the overall meaning is similar)",
      "*Practice Questions:",
      "Strand 3: Reading Comprehension & Vocabulary Development"
    ],
    "checks": [
      "Classify each conjunction as coordinating or subordinating: \"and,\" \"although,\" \"because,\" \"or,\" \"since,\" \"yet.\"",
      "Join these two ideas using BOTH a coordinating AND a subordinating conjunction (two separate sentences): \"It was raining.\" / \"The children played outside.\"",
      "Explain, in your own words, why \"because she was late\" cannot stand alone as a complete sentence, while \"and she was late\" also sounds incomplete alone, but for a DIFFERENT reason (hint: what is each conjunction TYPE designed to connect TO?)."
    ],
    "targets": [
      "Grammar: prepositions of time vs place; conjunctions (coordinating vs subordinating)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "3.1 Full SPQ3R Application — Two Complete, Contrasting Passages",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Apply the full method to a SECOND passage of a DIFFERENT type (a persuasive text, contrasting with the earlier informative \"bees\" passage), to prove the method works across genres",
      "*Sample persuasive passage: \"Every student should join at least one extracurricular club. Clubs teach valuable skills like teamwork and leadership that classroom lessons alone cannot provide. Students who participate in clubs often perform better academically too, since they learn time-management balancing their studies with other commitments. Don't miss this opportunity — join a club today!\"",
      "*Survey: The title/first sentence suggests this will ARGUE for joining clubs (an opinion-driven text, unlike the earlier factual \"bees\" passage).",
      "*Question: \"What specific BENEFITS does the writer claim clubs provide?\" \"What is the writer trying to convince me to DO?\"",
      "*Read: read for these answers, and also notice PERSUASIVE language (\"Don't miss this opportunity\") signaling the writer's PURPOSE (recall Strand 3's purpose-identification skill from Term 2).",
      "*Recite: clubs teach teamwork/leadership; clubs improve academic performance via time-management; the writer wants readers to join a club NOW.",
      "*Review: check back — did the passage actually PROVE these claims, or just ASSERT them? (Noticing the difference between claims and proof is an additional critical-reading skill worth raising here.)",
      "*Practice Questions:",
      "Strand 4: Composition"
    ],
    "checks": [
      "Apply the FULL SPQ3R method (all 5 steps written out) to this passage: \"Recycling helps protect our environment by reducing waste sent to landfills. It also conserves natural resources, since recycled materials can be reused instead of extracting new raw materials. Every household should set up a simple recycling system at home.\"",
      "In the \"clubs\" passage above, identify ONE claim that is ASSERTED but not actually PROVEN with evidence (recall the fact-vs-opinion skill from Term 1) — what would proof/evidence for that claim look like?"
    ],
    "targets": [
      "Comprehension: full SPQ3R application; fact vs opinion"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "4.1 Argumentative Essay — Extended With a FULL Essay (Not Just One Paragraph)",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Present a COMPLETE argumentative essay with introduction, TWO body paragraphs (each with a reason AND a counter-argument acknowledgment), and a conclusion — a fuller structure than the single-paragraph version from Term 1",
      "Title: Should Junk Food Be Banned in Schools?*",
      "Introduction:* \"Junk food has become a common sight in many school canteens, but its presence raises serious concerns about student health. I strongly believe that junk food should be banned in schools.\" [Annotation: introduces the TOPIC and states a CLEAR position.]",
      "Body Paragraph 1:* \"Firstly, junk food is linked to obesity and poor concentration in students. Foods high in sugar and fat provide quick energy that fades fast, often leaving students tired and unfocused during afternoon classes. Some may argue that students should simply choose healthier options themselves, but young students often lack the knowledge or discipline to make these choices consistently, making school policy a more reliable solution.\" [Annotation: REASON 1, followed by an acknowledged counter-argument AND a response to it — a more sophisticated technique than simply stating a reason alone.]",
      "Body Paragraph 2:* \"Secondly, banning junk food would encourage schools to provide more nutritious meal options, benefiting students' long-term health. Critics might claim this would be expensive for schools to implement, but the long-term healthcare costs of poor childhood nutrition likely outweigh the short-term expense of better school meals.\" [Annotation: REASON 2, again with a counter-argument acknowledged and answered — establishing a CONSISTENT pattern across both body paragraphs, not just one.]",
      "Conclusion:* \"In conclusion, while banning junk food may present some challenges, the health benefits for students far outweigh these concerns. Schools have a responsibility to protect student wellbeing, and removing junk food is a meaningful step in that direction.\" [Annotation: restates the position WITHOUT simply repeating the introduction word-for-word, and ends with a forward-looking statement.]",
      "*Practice Questions:"
    ],
    "checks": [
      "Write your own FULL argumentative essay (introduction, 2 body paragraphs each with a reason AND acknowledged counter-argument, conclusion) on the topic: \"Should students be given homework every day?\"",
      "In the model essay above, identify the TWO counter-arguments that were acknowledged, and explain how EACH was answered/responded to.",
      "Explain why acknowledging a counter-argument (rather than ignoring opposing views entirely) makes an argumentative essay MORE convincing, not less."
    ],
    "targets": [
      "Composition: argumentative essay (introductory); expository essay (introductory)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "4.2 Expository Essay — Extended With a Second, More Complex Process",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Present a SECOND expository example involving a more complex, multi-stage process (beyond the earlier simple jollof-rice steps), to test the skill on more challenging material",
      "\"How a Bill Becomes Law in Nigeria\"* (expository, explaining a process, no opinion):",
      "\"First, a bill is introduced in either the House of Representatives or the Senate. It then undergoes several readings and is examined by relevant committees, who scrutinize its details and may propose amendments. Once approved by one chamber, the bill moves to the other chamber for the same process. If both chambers approve the bill, often after resolving any differences between their versions, it is sent to the President for assent. If the President signs it, the bill becomes law; if he withholds assent, the National Assembly may still pass it into law with a two-thirds majority vote.\"",
      "Notice: this passage explains a MULTI-STEP process with NO opinion or persuasion anywhere — purely informational, testing the expository skill on more complex, sequential content than a simple recipe.",
      "*Practice Questions:",
      "Strand 5: Literature-in-English"
    ],
    "checks": [
      "Write an expository paragraph explaining a multi-step process you understand well (e.g., how to register for a school exam, or how a plant grows from seed to maturity), ensuring NO opinion or argument creeps in.",
      "Compare the \"How a Bill Becomes Law\" passage with the argumentative essay on junk food — identify ONE specific sentence from EACH that clearly shows the difference between \"explaining\" and \"arguing.\""
    ],
    "targets": [
      "Composition: argumentative essay (introductory); expository essay (introductory)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "5.1 Literary Terms — Extended Set With Discrimination Practice",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Add TWO more literary terms beyond simile/metaphor/personification, and test ALL FIVE together in a mixed discrimination exercise, since distinguishing similar-looking devices is the real skill being tested (not just defining them individually)",
      "Hyperbole: deliberate, obvious EXAGGERATION for effect — \"I've told you a million times!\" (not literally a million, but exaggerated for emphasis).",
      "Alliteration: repetition of the SAME initial CONSONANT SOUND in nearby words — \"Peter Piper picked a peck of pickled peppers\" (repeated /p/ sound).",
      "*Worked Example (mixed discrimination — testing all FIVE devices together, since a student who can define each term separately may still struggle to IDENTIFY which one is present in a new sentence):",
      "\"The stars danced joyfully in the night sky.\" → PERSONIFICATION (stars given the human action of \"dancing joyfully\").",
      "\"Her voice was music to my ears.\" → METAPHOR (direct comparison, no \"like/as\").",
      "\"He was as quiet as a mouse.\" → SIMILE (comparison using \"as\").",
      "\"I've asked you a thousand times to clean your room!\" → HYPERBOLE (obvious exaggeration).",
      "\"Sally sells seashells by the seashore.\" → ALLITERATION (repeated /s/ sound).",
      "*Practice Questions:"
    ],
    "checks": [
      "Identify the literary device in EACH: \"The wind howled angrily through the trees.\" / \"Tom's temper was a ticking time bomb.\" / \"I'm so hungry I could eat a horse.\" / \"Busy bees buzzed beside the blossoms.\" / \"Her eyes sparkled like diamonds.\"",
      "Write ONE original example of EACH of the five devices covered (simile, metaphor, personification, hyperbole, alliteration), on any topic of your choice.",
      "Explain the KEY difference between a simile and a metaphor one more time, using TWO of your own original examples from Question 2 as the basis for your explanation."
    ],
    "targets": [
      "Literature: literary terms (simile, metaphor, personification, hyperbole, alliteration); myths and legends (vs folktales)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "English Language",
    "term": 3,
    "title": "5.2 Myths and Legends — Extended With Classification Practice Across Multiple Examples",
    "sourceFile": "jss1-english-term3.md",
    "steps": [
      "*Step 1 — Test the folktale/myth/legend classification across MULTIPLE varied story descriptions, not just one example each, since real classification requires practice distinguishing borderline or tricky cases",
      "Worked Example Set (testing FIVE story descriptions, with reasoning for each):",
      "1. \"A story about how a clever spider tricks other animals to gain wisdom, ending with a lesson about cunning.\" → FOLKTALE (animal characters, clear moral, no claim to historical or supernatural-origin explanation).",
      "2. \"A story explaining how thunder and lightning were created by an angry sky-god.\" → MYTH (explains a NATURAL PHENOMENON, involves a god/supernatural being).",
      "3. \"A story about a real historical king who is said to have once single-handedly defeated an entire army through supernatural strength.\" → LEGEND (tied to a SPECIFIC historical figure, exaggerated but claims a basis in real history).",
      "4. \"A story about why the tortoise's shell has a cracked pattern, involving the tortoise falling from the sky after a trick.\" → this is BORDERLINE, worth discussing: it explains a natural feature (cracked shell) using animal characters — closer to a folktale-with-mythical-elements than a pure myth, since it doesn't involve a god. This shows category boundaries aren't always perfectly sharp.",
      "5. \"A story about a legendary female warrior who supposedly protected her village from invaders long ago.\" → LEGEND (specific figure, historical claim, exaggerated).",
      "*Practice Questions:",
      "This completes the REDONE JSS1 English Studies — all three terms, now matching the full Maths depth standard throughout. Continuing next to JSS2 English, First Term, built at this same standard from the start."
    ],
    "checks": [
      "Classify these THREE new story descriptions, explaining your reasoning: \"A story about why the moon has phases, caused by a deity's punishment.\" / \"A story about a wise hare who outsmarts a lion using clever riddles, teaching a lesson about intelligence over strength.\" / \"A story about a real explorer who is said to have discovered a hidden city, with exaggerated tales of magical treasures.\"",
      "Using Worked Example 4 above (the tortoise shell story) as a model, explain why REAL classification sometimes involves BORDERLINE cases that don't fit neatly into one category — is this a weakness in the classification system, or just a natural feature of how oral traditions blend different story types?"
    ],
    "targets": [
      "Literature: literary terms (simile, metaphor, personification, hyperbole, alliteration); myths and legends (vs folktales)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 1: Whole Numbers",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "1.1 Place Value and Counting in Millions, Billions, Trillions",
      "*Step 1 — What place value actually means",
      "In the number 4,352, the digit \"3\" is not simply \"three\" — its value depends on its position. Counting positions from the right: ones, tens, hundreds, thousands. So the \"3\" sits in the hundreds position, meaning it's worth 300, not 3. Move that same \"3\" one position left (4,3520 → wait, let's use a cleaner pair): compare 352 and 3,520 — the \"3\" in 352 is worth 300, but the \"3\" in 3,520 is worth 3,000. Same digit, ten times the value, because it moved one position left.",
      "*Step 2 — Why we group numbers in 3s to name big numbers",
      "Naming numbers would be chaotic if every position needed its own unique word. Instead, we reuse \"hundred,\" \"ten,\" \"one\" within groups of three digits, and just change the group name (thousand, million, billion, trillion) as we move further left. Each group is exactly 1,000 times the previous one:",
      "1,000 (one thousand)",
      "1,000 × 1,000 = 1,000,000 (one million)",
      "1,000 × 1,000,000 = 1,000,000,000 (one billion)",
      "1,000 × 1,000,000,000 = 1,000,000,000,000 (one trillion)",
      "*Step 3 — Reading a large number: full worked method, not just an answer",
      "Read: 25,800,074,430",
      "First, split into groups of three from the RIGHT (this matters — grouping from the left would misalign the place values):",
      "25 | 800 | 074 | 430",
      "Now name each group starting from the leftmost:",
      "25 → this group is in the BILLIONS position → \"twenty-five billion\"",
      "800 → this group is in the MILLIONS position → \"eight hundred million\"",
      "074 → this group is in the THOUSANDS position → \"seventy-four thousand\"",
      "430 → this is the ONES group, read normally → \"four hundred and thirty\"",
      "Full reading: twenty-five billion, eight hundred million, seventy-four thousand, four hundred and thirty",
      "*Worked Example 2 (a number with a zero-group — common tricky case):",
      "Read: 7,000,412,000",
      "Split: 7 | 000 | 412 | 000",
      "7 → billions → \"seven billion\"",
      "000 → this group is entirely zero, so we SKIP naming it (we don't say \"zero million\") — this is a common misconception point: students sometimes still say \"zero million,\" which is incorrect",
      "412 → thousands → \"four hundred and twelve thousand\"",
      "000 → ones group is zero, nothing more to add",
      "Full reading: seven billion, four hundred and twelve thousand",
      "*Worked Example 3 (writing figures FROM words, the reverse direction):",
      "Write in figures: \"three hundred and six million, twenty thousand and five\"",
      "Build group by group: 306 (million) | 020 (thousand — note: \"twenty thousand\" fills only the last two digits of that group, so the group is 020, not 20) | 005 (ones — \"and five\" means just 5 in the ones group, so 005)",
      "Combine: 306,020,005",
      "*Practice Questions (write only your final answer; Avora checks and re-teaches if wrong):",
      "1.2 Quantitative Reasoning (Whole Numbers)",
      "*Explanation: These questions test fast number sense — often by comparing several options, so it helps to check each option methodically rather than guessing.",
      "*Worked Example 1:",
      "\"13,500,000 mm in km is: (a) 13.5km (b) 1.35km (c) 1350km (d) 13500km\"",
      "Establish the conversion chain first: 10mm=1cm is NOT what we need here — we need 1000mm=1m and 1000m=1km, so 1km = 1,000,000mm.",
      "13,500,000 ÷ 1,000,000 = 13.5km",
      "Now check against the options: (a) matches. We can also rule out the others by reasoning: (c) and (d) would only make sense if we divided by a much smaller number, meaning someone forgot a conversion step — a common exam trap.",
      "Answer: (a)",
      "*Worked Example 2 (testing multiple candidates explicitly):",
      "\"Which of these is the odd one out: 24, 36, 49, 60?\" (all should share a property except one)",
      "Test each: 24 = factors include 1,2,3,4,6,8,12,24 (even, many factors); 36 = perfect square (6×6); 49 = perfect square (7×7); 60 = many factors, not a perfect square.",
      "Testing \"perfect square\" as the shared property: 36 ✓ perfect square, 49 ✓ perfect square, but 24 ✗ and 60 ✗ — two fail, so that's not quite it.",
      "Testing \"even number\": 24 ✓, 36 ✓, 60 ✓, but 49 ✗ (49 is odd) — only one fails.",
      "Since only 49 breaks the \"even number\" pattern while every other number checked shares that property, 49 is the odd one out.",
      "*Practice Questions:"
    ],
    "checks": [
      "Write in words: 904,540,370,750",
      "Write in words: 8,003,000,061 *(this one has a zero group — watch for it)*",
      "Write in figures: \"nine hundred and four billion, five hundred and forty million, three hundred and seventy thousand, seven hundred and fifty\"",
      "Which is greater: 727,345,565 or 727,445,565? State your answer and identify exactly which digit position made the difference.",
      "Write 1,200,000 in words.",
      "Which of the following numbers is the largest: 727,345,565; 727,245,565; 727,445,565; 726,778,876?",
      "Convert 5,600,000 grams to kilograms.",
      "Which is the odd one out, and why: 15, 20, 25, 32? (Test more than one possible pattern before deciding, as shown above.)"
    ],
    "targets": [
      "Whole Numbers (place value, counting in millions/billions/trillions, quantitative reasoning)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 2: Lowest Common Multiple (LCM)",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "*Step 1 — What a multiple is, established with a real generation process (not just a definition)",
      "Take the number 4. Multiply it by 1, 2, 3, 4, 5... one at a time: 4, 8, 12, 16, 20... Each result is called a multiple of 4. Notice this list never ends — there are infinitely many multiples of any number.",
      "*Step 2 — What \"common\" and \"lowest\" mean, shown by actually generating both lists side by side",
      "Generate multiples of 4: 4, 8, 12, 16, 20, 24, 28...",
      "Generate multiples of 6: 6, 12, 18, 24, 30...",
      "Now compare the two lists directly, term by term, to find numbers that appear in BOTH:",
      "Is 4 in the multiples-of-6 list? No.",
      "Is 8 in the multiples-of-6 list? No.",
      "Is 12 in the multiples-of-6 list? Yes! → this is a common multiple.",
      "Continuing, 24 also appears in both lists → also a common multiple.",
      "Between 12 and 24 (and any further ones), the LOWEST common multiple is 12.",
      "*Step 3 — A second, more efficient method (prime factorization), derived by comparing to the listing method so students see why it works, not just that it works",
      "Find the LCM of 12 and 18 using prime factors.",
      "12 = 2×2×3 (i.e., 2²×3)",
      "18 = 2×3×3 (i.e., 2×3²)",
      "Rule (which we can verify against the listing method): for the LCM, take the HIGHEST power of every prime that appears in EITHER number.",
      "Highest power of 2 appearing: 2² (from 12)",
      "Highest power of 3 appearing: 3² (from 18)",
      "LCM = 2²×3² = 4×9 = 36",
      "*Verification against listing (to prove the shortcut actually works, not just trust it blindly):",
      "Multiples of 12: 12,24,36...",
      "Multiples of 18: 18,36...",
      "First common value: 36 ✓ matches the prime-factorization answer.",
      "*Worked Example (three numbers):",
      "Find the LCM of 3, 4, and 5.",
      "3=3, 4=2², 5=5 (all different primes, no overlap)",
      "LCM = 3×2²×5 = 3×4×5 = 60",
      "*Practice Questions:"
    ],
    "checks": [
      "Find the LCM of 6 and 8 using the listing method (write out both lists before answering).",
      "Find the LCM of 15 and 20 using prime factorization.",
      "Find the LCM of 3, 4, and 5 — but this time verify your prime-factorization answer using the listing method for at least one pair, showing your check.",
      "Two bells ring every 8 minutes and every 12 minutes. If they ring together now, after how many minutes will they next ring together simultaneously? Explain why this is an LCM problem (what does \"ringing together again\" correspond to, in terms of multiples?)."
    ],
    "targets": [
      "Lowest Common Multiple (LCM)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 3: Highest Common Factor (HCF)",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "*Step 1 — What a factor is, generated by testing divisibility, not just listed",
      "To find the factors of 12, test every whole number from 1 up to 12 to see if it divides evenly (no remainder):",
      "1÷ → 12÷1=12 ✓, 2÷ → 12÷2=6 ✓, 3÷ → 12÷3=4 ✓, 4÷ → 12÷4=3 ✓, 5÷ → 12÷5=2.4 ✗ (not a factor), 6÷ → 12÷6=2 ✓, ... up to 12÷12=1 ✓",
      "Factors of 12: 1, 2, 3, 4, 6, 12",
      "*Step 2 — Common factors and the highest one, found by direct comparison",
      "Factors of 12: 1, 2, 3, 4, 6, 12",
      "Factors of 18: 1, 2, 3, 6, 9, 18",
      "Compare both lists directly: which numbers appear in BOTH?",
      "1 ✓ (in both), 2 ✓ (in both), 3 ✓ (in both), 4 — only in the 12 list, 6 ✓ (in both), 9 — only in the 18 list, 12 — only in the 12 list, 18 — only in the 18 list.",
      "Common factors: 1, 2, 3, 6 → the HIGHEST of these is 6.",
      "*Step 3 — Prime factorization method, verified against the listing method above",
      "24 = 2×2×2×3 (2³×3)",
      "36 = 2×2×3×3 (2²×3²)",
      "Rule: for HCF, take the LOWEST power of each prime that appears in BOTH numbers (a prime only in one number contributes nothing to the HCF, since it's not \"common\").",
      "Power of 2: lowest of (2³, 2²) is 2²",
      "Power of 3: lowest of (3¹, 3²) is 3¹",
      "HCF = 2²×3 = 4×3 = 12",
      "*Worked Example (a case where a prime appears in only one number, to show why it's excluded):",
      "Find the HCF of 20 and 9.",
      "20 = 2²×5, 9 = 3²",
      "There is NO prime common to both (2 and 5 aren't in 9's factorization; 3 isn't in 20's). This means the HCF is 1 — the two numbers are called \"co-prime.\" This is a useful edge case to recognize.",
      "*Practice Questions:"
    ],
    "checks": [
      "Find the HCF of 8 and 12 by listing all factors of each first.",
      "Find the HCF of 18 and 27 using prime factorization, then verify by listing.",
      "Find the HCF of 14 and 15. What do you notice, and what is this situation called?",
      "A teacher has 24 pencils and 36 erasers and wants to make identical sets for as many students as possible with nothing left over. How many students can receive a set, and what exactly is in each set? Explain why this is an HCF problem (what does \"identical sets with nothing left over, as many as possible\" correspond to?)."
    ],
    "targets": [
      "Highest Common Factor (HCF)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 4: Counting in Base Two",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "*Step 1 — Why any base is possible, established with reasoning, not asserted",
      "A number system needs two things: a fixed set of allowed digits, and a rule for when to \"carry\" to a new column. Base 10 uses digits 0–9 and carries after reaching 10. There's nothing mathematically special forcing us to use exactly 10 digits — it's simply what matches human finger-counting. A system could just as validly use only 2 digits (0 and 1), carrying much sooner — this is base two, used by computers because electronic switches naturally have two states (on/off).",
      "*Step 2 — Counting forward in base two, showing the \"carry\" moment explicitly each time it happens",
      "0 → 1 (no carry needed yet, both are valid single digits)",
      "1 → next number: we've used both available digits (0,1) in the ones column, so we CARRY: the ones column resets to 0, and a new column is added: 10 (read as \"one-zero,\" representing the base-ten number 2)",
      "10 → 11 (still valid, second column can be 1 too)",
      "11 → both columns are now maxed at 1, so CARRY again: ones resets to 0, second column also resets to 0 and carries into a third column: 100 (base-ten value 4)",
      "Continuing this pattern, from 0 to 15 in base ten:",
      "0=0, 1=1, 2=10, 3=11, 4=100, 5=101, 6=110, 7=111, 8=1000, 9=1001, 10=1010, 11=1011, 12=1100, 13=1101, 14=1110, 15=1111",
      "*Practice Questions:"
    ],
    "checks": [
      "Write out the base-two count from 0 to 15 yourself (don't just copy — work through each carry moment).",
      "What is the base-two number right after 111₂? Explain using the \"running out of digits, carry\" reasoning, not just by copying a pattern.",
      "Between 1000₂ and 1111₂, how many base-two numbers are there in total? (Hint: convert both to base ten first to check your count.)"
    ],
    "targets": [
      "Counting in Base Two"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 5: Conversion of Base 10 to Binary (1–10)",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "*Step 1 — Recall binary place value explicitly before converting",
      "In base ten, positions represent powers of 10: ...100, 10, 1. In base two, positions represent powers of 2: ...8, 4, 2, 1. This is the reverse process we'll use to check our conversions.",
      "*Step 2 — The repeated-division method, shown with EVERY division step, not skipped",
      "Convert 7 to binary:",
      "7 ÷ 2 = 3 remainder 1",
      "3 ÷ 2 = 1 remainder 1",
      "1 ÷ 2 = 0 remainder 1",
      "We stop once the quotient reaches 0. Read the remainders from BOTTOM to TOP: 111₂",
      "*Check using place value (always verify, don't just trust the method blindly):",
      "111₂ = (1×4)+(1×2)+(1×1) = 4+2+1 = 7 ✓ matches.",
      "*Worked Example 2 (an even number, to show the pattern of a 0 remainder appearing):",
      "Convert 6 to binary:",
      "6÷2 = 3 remainder 0",
      "3÷2 = 1 remainder 1",
      "1÷2 = 0 remainder 1",
      "Reading bottom to top: 110₂",
      "Check: (1×4)+(1×2)+(0×1) = 4+2+0 = 6 ✓",
      "*Practice Questions:"
    ],
    "checks": [
      "Convert 5 to binary, showing every division step, then check your answer using place value.",
      "Convert 9 to binary, showing every step and the check.",
      "Convert 10 to binary, showing every step and the check.",
      "A student converts 8 to binary and gets 111₂. Use the place-value check to show this is wrong, and find the correct answer."
    ],
    "targets": [
      "Conversion of Base 10 to Binary Numbers (1–10)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 6: Fractions",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "6.1 Equivalent Fractions",
      "*Step 1 — Why multiplying top and bottom by the same number doesn't change the value (the \"multiplying by 1 in disguise\" idea, shown concretely)",
      "Any fraction where the numerator equals the denominator equals 1: 3/3=1, 5/5=1, 100/100=1. Multiplying ANY number by 1 doesn't change its value. So multiplying ½ by 3/3 (which equals 1) doesn't change ½'s value — it only changes how it LOOKS:",
      "½ × 3/3 = 3/6",
      "Since 3/3 is just \"1 in disguise,\" ½ and 3/6 must represent the exact same amount — this is why they're called equivalent.",
      "*Worked Example (testing whether two given fractions ARE equivalent — not just generating one):",
      "Is 4/10 equivalent to ⅖?",
      "Method: check if there's a single multiplier connecting numerator to numerator AND denominator to denominator.",
      "2×2=4 ✓ (numerators connect via ×2)",
      "5×2=10 ✓ (denominators connect via the SAME ×2)",
      "Since the same multiplier (×2) works for both top and bottom, yes, they are equivalent.",
      "*Worked Example (a case that looks similar but ISN'T equivalent, to build the discrimination skill):",
      "Is 3/8 equivalent to 4/10?",
      "3→4 would need ×(4/3), and 8→10 would need ×(10/8)=×(5/4). These multipliers are DIFFERENT (4/3 ≠ 5/4), so they are NOT equivalent — even though the numbers \"look similar in size.\"",
      "*Practice Questions:",
      "6.2 Ordering Fractions",
      "*Step 1 — Why fractions with different denominators can't be compared by looking at numerators alone",
      "⅗ and ⅔: comparing just numerators (3 vs 2) would wrongly suggest ⅗ is always the bigger type of comparison — but the denominators represent DIFFERENT sized pieces (fifths vs thirds), so this comparison is invalid until pieces are the same size.",
      "*Worked Example (full LCM-based ordering, every conversion step shown):",
      "Order ⅔, ¾, ⅗ from smallest to largest.",
      "Find LCM of 3, 4, 5: 3=3, 4=2², 5=5 → LCM=3×2²×5=60",
      "Convert each: ⅔ = (2×20)/(3×20) = 40/60; ¾ = (3×15)/(4×15) = 45/60; ⅗ = (3×12)/(5×12) = 36/60",
      "Compare numerators now that denominators match: 36 < 40 < 45",
      "Order: ⅗, ⅔, ¾",
      "*Practice Questions:",
      "6.3 Fractions to Decimals and Vice Versa",
      "*Step 1 — Why a fraction bar literally means division",
      "a/b means \"a divided by b\" — this isn't a separate rule to memorize, it's the actual definition of what a fraction represents (splitting 'a' wholes into 'b' equal parts, or equivalently, a÷b).",
      "*Worked Example (a fraction that terminates cleanly):",
      "¾ = 3÷4 = 0.75",
      "*Worked Example (a fraction that produces a recurring decimal, an important edge case):",
      "⅓ = 1÷3 = 0.333... (the 3 repeats forever) — this connects back to the rational-number idea that recurring decimals are still exact, expressible fractions.",
      "*Worked Example (decimal to fraction, including simplifying):",
      "Convert 0.6 to a fraction: 0.6 = 6/10. Simplify using HCF of 6 and 10 (=2): 6/10 = ⅗",
      "*Practice Questions:",
      "6.4 Fractions to Percentages and Vice Versa",
      "*Step 1 — What \"percent\" means literally, before converting",
      "\"Percent\" comes from \"per centum\" — meaning \"out of 100.\" So converting to a percentage means re-expressing a fraction as \"how many out of 100.\"",
      "*Worked Example:",
      "¾ → first convert to a decimal (0.75), then multiply by 100 (since percent means ×100 of the decimal): 75%",
      "*Worked Example (percentage to fraction, including simplifying):",
      "40% = 40/100. Simplify using HCF of 40,100 (=20): 40/100 = ⅖",
      "*Practice Questions:"
    ],
    "checks": [
      "Find two fractions equivalent to ¾, showing the multiplier used for each.",
      "Is 6/9 equivalent to ⅔? Show the multiplier check.",
      "Is 5/12 equivalent to 10/20? Show your check clearly (don't just guess from appearance).",
      "Simplify 12/18 to its lowest terms using the HCF method (find HCF of 12 and 18 first, then divide both top and bottom by it).",
      "Order ½, ⅓, ⅖ from smallest to largest, showing every conversion step.",
      "Which is bigger: 5/8 or 7/12? Show full working, not just the final comparison.",
      "Convert ⅝ to a decimal.",
      "Convert ⅙ to a decimal (note: this one recurs — write out at least 4 decimal places).",
      "Convert 0.35 to a fraction in lowest terms, showing the simplifying step.",
      "Convert ⅕ to a percentage.",
      "Convert 65% to a fraction in lowest terms.",
      "Convert 7/20 to a percentage."
    ],
    "targets": [
      "Fractions (equivalent fractions, ordering, fractions↔decimals, fractions↔percentages)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 7: Addition and Subtraction of Whole Numbers",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "7.1 Why We Line Up by Place Value",
      "*Step 1 — Show what goes WRONG if you don't line up correctly, before showing the correct method",
      "Add 345 + 27 incorrectly by misaligning digits (a common beginner error — lining up from the LEFT instead of the right):",
      "345",
      "+ 27  (misaligned: 3 lines with 2... treating them as matching positions)",
      "This would wrongly compute as if adding 345+270 or similar — giving a wrong answer, because it pairs a hundreds digit with a tens digit.",
      "Correctly aligned (from the right, matching ones-with-ones, tens-with-tens):",
      "345",
      "+  27",
      "----",
      "372",
      "*Step 2 — Number line model for addition and subtraction, including negative movement",
      "On a number line, addition moves RIGHT, subtraction moves LEFT — this applies even when starting from a negative position.",
      "*Worked Example:",
      "−3 + 5: start at −3, move 5 steps right → −3,−2,−1,0,1,2 → lands on 2",
      "*Worked Example (subtraction resulting in a negative, a common tricky case):",
      "4 − 9: start at 4, move 9 steps left → 4,3,2,1,0,−1,−2,−3,−4,−5 → lands on −5",
      "7.2 Positive and Negative Integers — Establishing the CONCEPT, Not Just the Symbol",
      "*Step 1 — What negative numbers represent in real life, with more than one grounding example",
      "Example A (temperature): 0°C is the freezing point of water. −5°C means 5 degrees BELOW that reference point — not \"below zero\" in some abstract sense, but literally colder than ice forms.",
      "Example B (money/debt): Having ₦0 means no money. Owing ₦2000 (a debt) is represented as −2000 — you don't just \"have none,\" you're below the zero-reference by that amount, and would need to receive ₦2000 just to reach zero.",
      "*Worked Example (combining a debt and an income, full narrative reasoning):",
      "A shop owner owes ₦2,000 (represented as −2000) and then earns ₦5,000.",
      "New balance = −2000 + 5000 = 3000",
      "Interpretation: the owner is no longer in debt — after clearing the ₦2,000 owed, they have ₦3,000 remaining in credit. (Note how the calculation naturally accounts for \"paying off the debt first\" — that's built into the negative number arithmetic, not a separate step.)",
      "*Worked Example (double negative — subtracting a negative, a genuine misconception point):",
      "Calculate: −7 + 3 − (−5)",
      "A common error is treating \"−(−5)\" as still negative. But subtracting a negative means REMOVING a debt, which increases your total — same logic as \"un-owing\" money makes you richer, not poorer. So −(−5) becomes +5.",
      "−7 + 3 − (−5) = −7+3+5 = 1",
      "*Practice Questions:"
    ],
    "checks": [
      "The temperature was −4°C and rose by 9°C. What is the new temperature? Explain in words what \"rising\" means on the number line.",
      "A man had a debt of ₦1,500 and paid back ₦900. Represent this using negative numbers, calculate his remaining balance, and state in words whether he is still in debt or now in credit.",
      "Calculate: −7 + 3 − (−5), explaining the double-negative step in your own words.",
      "Calculate: 5 − (−3) − 8, and check your understanding by explaining why \"−(−3)\" doesn't just cancel to zero."
    ],
    "targets": [
      "Addition and Subtraction of Whole Numbers (place value, number line, positive/negative integers)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 8: Addition and Subtraction of Fractions",
    "sourceFile": "jss1-math-term1.md",
    "steps": [
      "*Step 1 — Why fractions need a common denominator (an analogy AND a visual reason)",
      "Analogy: 2 apples + 3 oranges isn't \"5\" of anything meaningful, because they're different units. Similarly, ⅓ and ¼ represent different-SIZED pieces (a third of something is bigger than a quarter of the same thing) — so we can't just add the numerators until the pieces are resized to match.",
      "*Step 2 — Full worked conversion, every step shown",
      "⅓ + ¼",
      "Find LCM of 3 and 4: 12",
      "Convert ⅓: multiply top and bottom by 4 (since 3×4=12): ⅓ = 4/12",
      "Convert ¼: multiply top and bottom by 3 (since 4×3=12): ¼ = 3/12",
      "Now that pieces are the same size, add numerators directly: 4/12 + 3/12 = 7/12",
      "*Worked Example (subtraction with mixed numbers — full conversion to improper fractions shown, a common source of errors if skipped)",
      "2⅓ − 1½",
      "Step 1: convert both to improper fractions.",
      "2⅓ = (2×3+1)/3 = 7/3",
      "1½ = (1×2+1)/2 = 3/2",
      "Step 2: find LCM of 3 and 2 = 6",
      "7/3 = 14/6, 3/2 = 9/6",
      "Step 3: subtract: 14/6 − 9/6 = 5/6",
      "*Worked Example (a subtraction requiring \"borrowing\" from the whole number, an important edge case):",
      "3⅕ − 1⅗",
      "Convert to improper: 3⅕=16/5, 1⅗=8/5",
      "16/5 − 8/5 = 8/5 = 1⅗ (convert back to a mixed number: 8÷5=1 remainder 3, so 1⅗)",
      "*Practice Questions:",
      "This completes the corrected, full-depth JSS1 Maths, First Term (Topics 1–8). This is the depth standard going forward. Continuing next to JSS1 Second Term rebuilt at this same depth."
    ],
    "checks": [
      "Add: ⅖ + ⅓, showing every conversion step.",
      "Subtract: ¾ − ⅖, showing every conversion step.",
      "A tailor used ⅔ metre of cloth for a shirt and ¾ metre for a skirt. How much cloth was used in total? State your final answer as a mixed number if applicable.",
      "Musa had 3½ bags of rice and used 1¾ bags. How much does he have left? Show the improper-fraction conversion step.",
      "Calculate 4⅙ − 2⅚ (this one requires care — check whether you need to convert to improper fractions to handle it correctly, and show why)."
    ],
    "targets": [
      "Addition and Subtraction of Fractions"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 1: Multiplication and Division of Fractions",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "1.1 Multiplication of Fractions",
      "*Step 1 — Establish what \"a fraction of a fraction\" means, using a real object before any numbers",
      "Imagine a chocolate bar. If you take half of it, then eat a third of THAT half, how much of the WHOLE bar did you eat? This is what ½ × ⅓ is asking — not \"half plus a third,\" but \"a third of a half.\"",
      "*Step 2 — Build the visual grid model fully, step by step",
      "Draw a rectangle. Divide it into 3 equal columns (this represents thirds — shade 1 column to show ⅓). Now divide the SAME rectangle into 2 equal rows (representing halves — shade 1 row to show ½). The rectangle is now divided into 3×2 = 6 small boxes total. The region where the shaded column AND shaded row overlap is exactly 1 small box. So ⅓ of ½ = 1 box out of 6 total = 1/6.",
      "*Step 3 — Extract the general rule from the visual model (derived, not asserted)",
      "Notice: the denominator of the answer (6) came from multiplying the two original denominators (3×2). The numerator of the answer (1) came from multiplying the two original numerators (1×1). This gives the rule: multiply numerators together, multiply denominators together.",
      "*Worked Example 1 (rule applied directly):",
      "⅔ × ¾ = (2×3)/(3×4) = 6/12",
      "Simplify using HCF of 6 and 12 (which is 6): 6/12 = ½",
      "*Worked Example 2 (a mixed number — must convert first, common error point):",
      "1½ × ⅔",
      "A frequent mistake is multiplying the whole number and fraction parts separately. This is WRONG, because 1½ is not \"1 plus ½\" being multiplied piecewise — it's one single quantity. Convert to an improper fraction first: 1½ = 3/2",
      "Now multiply properly: 3/2 × 2/3 = 6/6 = 1",
      "*Worked Example 3 (word problem, full translation shown):",
      "A recipe needs ¾ cup of sugar for the full batch. Ada is making only ⅓ of the recipe. How much sugar does she need?",
      "Translate \"⅓ of ¾\" into multiplication (recall: \"of\" means multiply, established from the chocolate-bar example above): ⅓ × ¾ = 3/12 = ¼ cup",
      "*Practice Questions:",
      "1.2 Division of Fractions",
      "*Step 1 — Establish what division by a fraction is really asking, with a concrete question before any method",
      "\"12 ÷ 3\" asks: \"how many groups of 3 fit into 12?\" (Answer: 4). Similarly, \"¾ ÷ ½\" asks: \"how many groups of ½ fit into ¾?\"",
      "*Step 2 — Answer that question concretely BEFORE introducing the shortcut method",
      "Picture ¾ of a pizza. A half-pizza (½) fits into it once, with ¼ of pizza left over. That leftover ¼ is HALF of a half-pizza portion (since ½ is the \"unit\" we're measuring in). So altogether, ½ fits into ¾ exactly 1½ times.",
      "*Step 3 — Derive WHY \"flip and multiply\" gives this same answer (connect the shortcut to the reasoning above, don't just state it)",
      "¾ ÷ ½ using the flip-and-multiply method: ¾ × 2/1 = 6/4 = 1½",
      "This matches our concrete reasoning above exactly (1½) — confirming the shortcut isn't a random trick, it's a fast way of answering \"how many of this fits into that.\"",
      "(Why does flipping and multiplying work, more formally? Dividing by ½ is the same as asking \"how many halves,\" which is the same as multiplying by 2 — because there are 2 halves in every whole. The \"flip\" of ½ is 2/1, which IS that same number 2. This pattern holds for any fraction divisor.)*",
      "*Worked Example (whole number divided by a fraction):",
      "2 ÷ ¼ — \"how many quarters fit into 2 wholes?\" Since 4 quarters make 1 whole, 2 wholes contain 4×2=8 quarters.",
      "Check with flip-and-multiply: 2 ÷ ¼ = 2 × 4/1 = 8 ✓ matches.",
      "*Worked Example (fraction divided by a fraction, less friendly numbers):",
      "⅗ ÷ 2/15",
      "Flip and multiply: ⅗ × 15/2 = 45/10 = 4½ (simplify: HCF of 45,10 is 5, so 45/10=9/2=4½)",
      "*Practice Questions:"
    ],
    "checks": [
      "Multiply: ⅖ × ⅗, and simplify your answer fully.",
      "Multiply: 1½ × ⅔ (show the improper-fraction conversion step).",
      "Multiply: 2¼ × ⅔ (convert 2¼ to an improper fraction first — show this step).",
      "A tank is ⅔ full. If ¼ of that amount is used, what fraction of the whole tank was used? Explain your translation from words to multiplication.",
      "Divide: ⅖ ÷ ⅓, showing the flip-and-multiply step.",
      "Divide: 3 ÷ ¼, and first answer using the \"how many fit into\" reasoning before checking with the shortcut.",
      "A tank holds ⅔ of a barrel of water. If each bottle holds ⅙ of a barrel, how many bottles can be filled? Explain what real-world question this division answers."
    ],
    "targets": [
      "Multiplication and Division of Fractions"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 2: Estimation",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "*Step 1 — Establish estimation as a skill distinct from \"guessing,\" with a clear definition of what makes an estimate GOOD",
      "Estimation means using known, easy-to-work-with numbers to quickly get an answer that is close to the real one — useful when exact precision isn't needed, or when checking whether an exact calculation \"looks right.\" A good estimate uses SENSIBLE rounding, not random numbers.",
      "*Worked Example (dimension estimation, full reasoning shown):",
      "Estimate the length of a classroom.",
      "Method: compare to something already known, such as your own height (say, approximately 1.5m). If the classroom looks like it fits about 6 of your height-lengths end to end, estimate: 6×1.5m ≈ 9m.",
      "*Worked Example (time/age estimation, showing the rounding choices made):",
      "Estimate how many days old someone is if they just turned 13.",
      "Reasoning: 1 year ≈ 365 days (we round slightly by ignoring leap years, since this is an estimate, not an exact count).",
      "13 × 365 = 4,745 days (approximately).",
      "*Practice Questions:"
    ],
    "checks": [
      "Estimate the number of exercise books that would fit flat on your study table, explaining your comparison method.",
      "Estimate how many minutes are in a week, using rounded numbers you choose deliberately (state what you rounded and why).",
      "Estimate the mass of a school bag containing 6 textbooks if each book weighs about 400g (recall Part 3 of the Units of Measurement lesson for mass units)."
    ],
    "targets": [
      "Estimation"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 3: Approximation",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "*Step 1 — Establish the rounding RULE itself from first principles, using a number line, before applying it to any real problem",
      "To round 47 to the nearest 10, picture a number line with 40 and 50 marked. 47 is closer to 50 than to 40 (it's 7 away from 40, but only 3 away from 50), so it rounds UP to 50.",
      "Now consider 45 — it sits EXACTLY halfway between 40 and 50. Since there's no \"closer\" side, mathematicians agree on a fixed convention: numbers exactly halfway round UP. This is why \"5 rounds up\" — it's not an arbitrary rule, it's what to do in the one case where distance alone can't decide.",
      "*Step 2 — Distinguish approximation from estimation (established in Topic 2), since they can be confused",
      "Estimation is a rough, on-the-spot guess using comparison or rounded reasoning (Topic 2). Approximation is a formal, precise PROCESS of rounding an already-KNOWN exact number to a stated level of precision (nearest 10, 100, or a certain number of decimal places).",
      "*Worked Example 1 (rounding to nearest 100, full reasoning shown):",
      "Round 3,847 to the nearest 100.",
      "Identify the two nearest \"hundred\" landmarks: 3,800 and 3,900.",
      "Look at the TENS digit (4) to judge which landmark is closer — this works because the tens digit tells us how far past the lower landmark we are, out of the next ten steps. Since 4 is less than 5 (the halfway convention), we're closer to the lower landmark.",
      "Answer: 3,800",
      "*Worked Example 2 (rounding a decimal, connecting to decimal place value)",
      "Round 6.478 to 1 decimal place.",
      "The two nearest landmarks (to 1 decimal place) are 6.4 and 6.5.",
      "Look at the digit right after the cutoff (the 2nd decimal digit, 7) to decide: 7≥5, so round UP.",
      "Answer: 6.5",
      "*Worked Example 3 (using approximation to sanity-check an exact calculation — a real use case, not just an exercise)",
      "A student calculates 493 + 208 and gets 4,101. Approximate each number first (to the nearest 100): 500+200=700. Since the exact answer (4,101) is wildly different from the sensible approximate range (around 700), this signals a calculation error — the student likely misplaced a digit. (Correct exact answer: 701.)",
      "*Practice Questions:"
    ],
    "checks": [
      "Round 6,254 to the nearest 1,000, identifying the two nearest landmark values first.",
      "Round 89.6 to the nearest whole number.",
      "Round 4.256 to 2 decimal places.",
      "Approximate 712 × 8 by first rounding 712 to the nearest 100, then compare your approximate answer to the exact calculation (712×8=5,696) — how close was the approximation, and why might it not be exact?"
    ],
    "targets": [
      "Approximation (rounding rules, decimal places)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 4: Addition of Binary Numbers (2–3 Digit)",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "(Recall: Base Two counting from JSS1 Term 1 Topic 4, and Base-10-to-binary conversion from Topic 5.)*",
      "*Step 1 — Recall binary place value explicitly (don't assume it's remembered from a different term without restating)",
      "In binary, each column represents a power of 2, reading right to left: 1s column, 2s column, 4s column, 8s column, and so on — just as base-10 columns represent powers of 10.",
      "*Step 2 — Establish the carry rule for binary addition, derived from \"running out of digits,\" same principle as Term 1's counting lesson",
      "In base 10, a column carries once it reaches 10. In binary, since only digits 0 and 1 exist, a column carries as soon as it would need to represent \"2\" — i.e., 1+1 \"overflows\" that column.",
      "*Worked Example 1 (full column-by-column walkthrough, every carry shown):",
      "101₂ + 011₂",
      "Rightmost column (1s): 1+1 = 2, which in binary is written as 10 — so we write 0 in this column and CARRY 1 to the next column.",
      "Middle column (2s): 0+1 (original digits) + 1 (carried) = 2, again written as 10 — write 0, carry 1.",
      "Leftmost column (4s): 1+0 (original digits) + 1 (carried) = 2, written as 10 — write 0, carry 1 into a brand new column.",
      "Final result, reading all columns including the new carried one: 1000₂",
      "*Check using place value (always verify against known conversion methods):",
      "101₂ = 5 (in base ten), 011₂ = 3, so 5+3=8. And 1000₂ = 8 (since it's 1×8 + 0+0+0). ✓ Matches.",
      "*Worked Example 2 (a sum with NO carrying needed, to show that not every addition overflows):",
      "100₂ + 011₂",
      "1s column: 0+1=1 (no carry, since 1 doesn't reach 2)",
      "2s column: 0+1=1 (no carry)",
      "4s column: 1+0=1 (no carry)",
      "Result: 111₂",
      "Check: 100₂=4, 011₂=3, 4+3=7, and 111₂=7 ✓",
      "*Practice Questions:"
    ],
    "checks": [
      "Add: 110₂ + 101₂, showing every column and every carry explicitly.",
      "Add: 111₂ + 011₂, then check your answer by converting all three numbers to base ten.",
      "Add three binary numbers: 101₂ + 010₂ + 001₂ (add them two at a time, showing both steps)."
    ],
    "targets": [
      "Addition of Binary Numbers (2–3 digit)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 5: Subtraction of Binary Numbers (2–3 Digit)",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "*Step 1 — Recall base-10 borrowing first (to build on known ground) before adapting it to base 2",
      "In base 10, if a column's top digit is smaller than the bottom digit, we borrow 10 from the next column over. In base 2, the exact same idea applies, but we borrow 2 instead (since that's the base).",
      "*Worked Example (full walkthrough with borrowing shown explicitly):",
      "110₂ − 011₂",
      "Rightmost column: top digit 0, bottom digit 1. Since 0<1, we must borrow. Borrow 2 from the next column: 0 becomes (0+2)=2, and 2−1=1. Write 1. The column we borrowed from is now reduced by 1.",
      "Middle column: originally 1, now reduced to 0 (after lending). Bottom digit is 1. Since 0<1 again, borrow again: 0 becomes 2, and 2−1=1. Write 1. The next column is reduced by 1.",
      "Leftmost column: originally 1, now reduced to 0 (after lending). Bottom digit is 0. 0−0=0. Write 0.",
      "Result: 011₂",
      "*Check: 110₂=6, 011₂=3, 6−3=3, and 011₂=3 ✓",
      "*Practice Questions:"
    ],
    "checks": [
      "Subtract: 111₂ − 100₂, showing any borrowing explicitly (there may be none needed — check first before assuming).",
      "Subtract: 101₂ − 011₂, showing every borrowing step.",
      "Subtract: 1000₂ − 0011₂ (a case with multiple consecutive borrows — work through carefully, column by column)."
    ],
    "targets": [
      "Subtraction of Binary Numbers (2–3 digit)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 6: Multiplication of Binary Numbers (2-Digit)",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "*Step 1 — Recall base-10 long multiplication structure before adapting it to binary",
      "In base-10 long multiplication, we multiply the top number by each digit of the bottom number separately (starting from the rightmost), shifting each partial result one place left, then add all partial results together. Binary multiplication follows this same structure exactly — it's actually SIMPLER, because each digit is only 0 or 1, so every partial product is either all zeros or an exact copy of the top number (shifted).",
      "*Worked Example (full partial-product walkthrough):",
      "11₂ × 10₂",
      "Multiply 11₂ by the rightmost digit of 10₂ (which is 0): 11×0 = 00",
      "Multiply 11₂ by the next digit of 10₂ (which is 1), shifted one place left: 11×1 = 11, shifted → 110",
      "Add the partial products: 00 + 110 = 110₂",
      "*Check: 11₂=3, 10₂=2, 3×2=6, and 110₂=6 ✓",
      "*Practice Questions:"
    ],
    "checks": [
      "Multiply: 10₂ × 10₂, showing both partial products before adding.",
      "Multiply: 11₂ × 01₂ (notice one partial product will be all zeros — identify which, and why).",
      "Multiply: 10₂ × 11₂, and check your final answer using base-ten conversion."
    ],
    "targets": [
      "Multiplication of Binary Numbers (2-digit)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 7: Use of Symbols",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "7.1 What a Letter/Symbol Represents in Mathematics",
      "*Step 1 — Establish this from the ground up: a letter is a placeholder for an unknown number, nothing more mysterious",
      "When we write \"y + 5 = 12,\" the letter y is not a secret code — it simply stands in for \"some number we don't yet know,\" in exactly the same way a blank box (☐ + 5 = 12) would. Using a letter instead of a box is just a convention that becomes more useful once we start doing more complex algebra later.",
      "*Step 2 — Establish what makes a statement an \"open sentence\" (true/false is undetermined until the unknown is filled in)",
      "A statement like \"2+3=5\" is a CLOSED sentence — it's definitely true, no unknowns involved. A statement like \"y+5=12\" is an OPEN sentence — its truth depends entirely on what value y takes. Solving means finding the value that makes it true.",
      "*Worked Example 1:",
      "Solve: y + 5 = 12",
      "Since addition and subtraction are opposite (inverse) operations, \"undo\" the +5 by subtracting 5 from both sides: y = 12−5 = 7",
      "Check: substitute back — 7+5=12 ✓ true, confirming this is correct.",
      "*Worked Example 2 (using a shape instead of a letter, to show they mean the same thing):",
      "▲ + 6 = 14",
      "Undo the +6: ▲ = 14−6 = 8",
      "Check: 8+6=14 ✓",
      "*Practice Questions:",
      "7.2 Solving Open Sentences with Two Operations",
      "*Step 1 — Establish the \"undo in reverse order\" principle, with reasoning for WHY the order matters",
      "When two operations were applied to build up an equation (e.g., first ×2, then +3, to get \"2x+3=11\"), we must undo them in the OPPOSITE order they were applied — like taking off shoes before socks, because they were put on socks-then-shoes. Undoing the LAST operation first isolates the unknown fastest.",
      "*Worked Example (full reasoning about WHY we subtract before dividing):",
      "Solve: 2x + 3 = 11",
      "The equation was built as: take x, multiply by 2, THEN add 3. To undo, we reverse: first undo the +3 (subtract 3 from both sides), THEN undo the ×2 (divide by 2).",
      "Step 1: 2x = 11−3 = 8",
      "Step 2: x = 8÷2 = 4",
      "Check: 2(4)+3 = 8+3 = 11 ✓",
      "*Worked Example (a case where subtracting FIRST, if attempted, without the correct order still works if applied to both sides correctly — but showing a WRONG order attempt for teaching purposes):",
      "A student tries an INCORRECT shortcut on 2x+3=11 and writes x+3=5.5. Diagnose the exact error: dividing both sides by 2 means EVERY term on the left must be divided by 2, so the legal result would be x+3/2=11/2, not x+3=5.5. That legal divide-first route still gives x=4 after subtracting 3/2 from both sides. The shortcut x+3=5.5 is wrong because it divided 2x and 11 but did not divide the +3 term.",
      "This shows the danger of dividing an equation where only PART of one side was built by multiplication — dividing must apply cleanly to an isolated multiplication term, which is why we subtract the +3 away FIRST, leaving a clean 2x, before dividing.",
      "*Practice Questions:"
    ],
    "checks": [
      "Solve: n − 4 = 9, and check your answer by substituting back.",
      "Solve: 3 × k = 21, explaining which operation \"undoes\" multiplication.",
      "If a symbol represents an unknown number and ◆ − 7 = 15, find ◆, and check your answer.",
      "Solve: 3x + 4 = 19, explaining which operation you undo first and why.",
      "Solve: 5y − 2 = 18",
      "A boy has some sweets. He doubles them, then gives away 3, leaving him with 9. Translate this into an equation, then solve it, stating what the unknown represents at each step."
    ],
    "targets": [
      "Use of Symbols (open sentences, two-operation equations)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 8: Simplification of Algebraic Expressions",
    "sourceFile": "jss1-math-term2.md",
    "steps": [
      "8.1 Like and Unlike Terms",
      "*Step 1 — Establish \"like terms\" using a real-object analogy before any algebra",
      "You can add 3 apples + 5 apples = 8 apples (same TYPE of item). But you cannot meaningfully add 3 apples + 5 oranges into a single \"8\" of anything — they're different types. In algebra, \"3x\" and \"5x\" are like terms (same letter, same power) — they can combine. \"3x\" and \"5y\" cannot combine, for the same reason as apples and oranges.",
      "*Step 2 — Establish what a coefficient is, explicitly, with the \"invisible 1\" case flagged",
      "The coefficient is the number multiplying a letter. In \"5x,\" the coefficient is 5. In just \"x\" (with nothing written in front), the coefficient is invisibly 1, since 1×x=x — this matters because when combining terms, \"x\" must be treated as \"1x,\" not as \"0x\" or ignored.",
      "*Worked Example 1 (basic combination):",
      "Simplify: 3x + 5x − 2x",
      "All are like terms. Combine coefficients: 3+5−2 = 6 → 6x",
      "*Worked Example 2 (mixed terms, requiring grouping first):",
      "Simplify: 4a + 3b − a + 2b",
      "Group like terms together first (this reordering is allowed because addition/subtraction of separate terms can be rearranged): (4a − a) + (3b + 2b)",
      "Remember \"−a\" means \"−1a\": 4a−1a = 3a",
      "3b+2b = 5b",
      "Result: 3a + 5b",
      "*Worked Example 3 (with a bracket, recalling the foundational bracket-expansion idea):",
      "Simplify: 2(x+3) + 4x",
      "Distribute first (recall: the outside term multiplies BOTH terms inside): 2×x + 2×3 = 2x+6",
      "Now combine with the remaining term: 2x+6+4x = (2x+4x)+6 = 6x+6",
      "*Worked Example 4 (subtracting a bracket — a genuine misconception point, explained fully):",
      "Simplify: 6p − (2p + 4)",
      "A common error is only subtracting from the FIRST term inside the bracket (giving 6p−2p+4=4p+4, which is WRONG). The subtraction sign outside the bracket actually means \"−1 multiplied by everything inside,\" so it must distribute to BOTH terms:",
      "6p − 1×(2p+4) = 6p − 2p − 4 = 4p − 4",
      "Compare the wrong version (4p+4) to the correct one (4p−4) — the sign on the 4 is the entire point of this misconception check.",
      "*Practice Questions:",
      "This completes JSS1 Maths, Second Term at full zero-assumption depth (Topics 1–8), with every prerequisite either recalled explicitly from earlier lessons or taught fresh within this file. Continuing next to JSS1 Third Term at this same standard."
    ],
    "checks": [
      "Simplify: 7m + 2m − 3m",
      "Simplify: 5x + 3y − 2x + y",
      "Simplify: 3(a+2) + 2a",
      "Simplify: 6p − (2p + 4), showing the full distribution of the negative sign (this is the exact misconception case worked above — do it yourself now).",
      "Simplify: 10y − (3y − 2) *(hint: subtracting a NEGATIVE inside the bracket — recall the double-negative reasoning from Term 1's integer work)*"
    ],
    "targets": [
      "Simplification of Algebraic Expressions (like/unlike terms, coefficients, brackets)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 1: Simple Equations",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "*Step 1 — Recall the two-operation solving method from Term 2, now applied to WORD problems, where the new skill is translation, not solving",
      "The solving mechanics here are identical to what was already mastered (undo operations in reverse order). What's new is turning a sentence into an equation in the first place — this is the real skill being tested.",
      "*Step 2 — Build the translation skill explicitly, phrase by phrase, before attempting a full problem",
      "Common phrase-to-symbol translations:",
      "\"a number\" → let it be x",
      "\"multiplied by 4\" → 4×x, written as 4x",
      "\"add 3\" → +3",
      "\"the result is 27\" → =27",
      "*Worked Example 1 (full translation shown phrase by phrase):",
      "\"I think of a number, multiply it by 4, and add 3. The result is 27. Find the number.\"",
      "Translate piece by piece: \"a number\"→x; \"multiply it by 4\"→4x; \"add 3\"→4x+3; \"the result is 27\"→4x+3=27",
      "Now solve (undo in reverse order — undo +3 first, then ×4):",
      "4x = 27−3 = 24",
      "x = 24÷4 = 6",
      "Check: 4(6)+3 = 24+3 = 27 ✓",
      "*Worked Example 2 (a trickier phrase order, testing real translation skill, not pattern-matching)",
      "\"Three times a number, minus 7, equals 20.\"",
      "Notice the order here matches the equation order directly: 3x−7=20",
      "Solve: 3x=27, x=9",
      "Check: 3(9)−7=27−7=20 ✓",
      "*Worked Example 3 (a phrase where the SUBTRACTION comes before the multiplication in the sentence, but not in the equation — an important translation trap)",
      "\"7 less than twice a number is 15.\"",
      "Careful: \"7 less than [something]\" means [something]−7, NOT 7−[something]. This is a common translation error. So: twice a number = 2x; \"7 less than\" that = 2x−7",
      "Equation: 2x−7=15",
      "Solve: 2x=22, x=11",
      "Check: 2(11)−7=22−7=15 ✓",
      "*Practice Questions (write your equation first, then solve, then check):"
    ],
    "checks": [
      "\"A number is doubled and then 5 is subtracted, giving 17.\" Find the number.",
      "\"6 less than three times a number is 21.\" Find the number (careful with the translation order, as shown in Worked Example 3).",
      "\"A rectangle is 8m long and its perimeter is 30m. Find its breadth.\" *(Hint: recall the perimeter formula 2(length+breadth) from earlier plane-shapes work — set up the equation 2(8+b)=30 before solving.)*",
      "Write your own word problem that translates to the equation 5x+2=27, then solve it."
    ],
    "targets": [
      "Simple Equations (word problems → equations)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 2: Plane Shapes",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "2.1 Similarities and Differences Between Shapes",
      "*Step 1 — Establish shared vocabulary FIRST, with definitions, before any comparison is attempted",
      "A side is a straight line segment forming part of a shape's boundary. A vertex (plural: vertices) is a corner point where two sides meet. An angle is the amount of turning between two sides meeting at a vertex.",
      "*Step 2 — Walk through a full comparison systematically (sides, then angles, then any special properties) rather than a vague description",
      "*Worked Example (Square vs Rectangle, full systematic comparison):",
      "Sides: both have 4 sides. Square: all 4 equal. Rectangle: only opposite sides equal (not necessarily all 4).",
      "Angles: both have 4 right angles (90° each).",
      "Special property: a square is actually a SPECIAL TYPE of rectangle (one where all sides happen to be equal) — this is why every square is a rectangle, but not every rectangle is a square.",
      "*Worked Example (Triangle vs Trapezium):",
      "Sides: triangle has 3 sides; trapezium has 4 sides.",
      "Angles: a triangle's angles always sum to 180°; a quadrilateral's (including trapezium) angles always sum to 360° (this can be shown by splitting a quadrilateral into 2 triangles via a diagonal — 2×180°=360°).",
      "Special property: a trapezium has exactly one pair of parallel sides; a triangle has no parallel sides at all (three sides meeting at three distinct angles can never include a parallel pair, since a parallel pair by definition never meets, but all sides of a triangle DO meet at vertices).",
      "*Practice Questions:",
      "2.2 Perimeter of Plane Shapes",
      "*Step 1 — Establish perimeter as literally \"walking around the edge and adding up the distance,\" before any formula",
      "If you walked along every side of a shape once, the total distance you walked is the perimeter. This is nothing more than ADDING all the side lengths.",
      "*Step 2 — Derive the rectangle SHORTCUT formula from this basic addition (don't just state 2(l+w))",
      "A rectangle has 4 sides: length, width, length, width (opposite sides equal). Adding them the long way: l+w+l+w. Since l appears twice and w appears twice, this is the same as 2l+2w, which factors (recall factorization: common factor 2) to 2(l+w). The formula isn't a separate rule — it's just a faster way of writing the same addition.",
      "*Worked Example 1 (using the long way AND the shortcut, showing they match):",
      "Rectangle: length 8cm, width 5cm.",
      "Long way: 8+5+8+5 = 26cm",
      "Shortcut: 2(8+5) = 2×13 = 26cm ✓ matches",
      "*Worked Example 2 (an irregular shape — perimeter is ALWAYS just \"add every side,\" even without a shortcut formula)",
      "A shape has 5 sides of lengths 4cm, 6cm, 3cm, 5cm, and 7cm.",
      "Perimeter = 4+6+3+5+7 = 25cm (no shortcut needed or possible here — the basic definition always works)",
      "*Practice Questions:",
      "2.3 Area of Regular Plane Shapes",
      "*Step 1 — Establish area as \"how much flat surface is covered,\" fundamentally different from perimeter (a length measurement), using SQUARE units, and explain why square units specifically",
      "Area is measured in SQUARE units (cm², m², etc.) because we're covering a 2-dimensional surface, and the natural \"unit of covering\" is a small square of side 1 unit — so area literally counts how many of these unit squares fit.",
      "*Step 2 — Derive the rectangle area formula by actually counting unit squares, not stating it",
      "Draw a rectangle 4 units long and 3 units wide. Fill it with a grid of 1×1 unit squares. Counting them: there are 3 ROWS, each containing 4 squares → 3×4 = 12 total unit squares. This is exactly why Area = length × width: it's literally counting the grid.",
      "*Worked Example 1:",
      "Rectangle: length 8cm, width 5cm → Area = 8×5 = 40cm²",
      "*Step 3 — Derive the triangle area formula from the rectangle formula (don't just state ½×base×height)",
      "Draw a rectangle, then draw a diagonal from one corner to the opposite corner. This diagonal splits the rectangle into exactly 2 EQUAL triangles (equal because they're mirror images across the diagonal). Since the two triangles together make the full rectangle (base×height), ONE triangle must be exactly half of that: Area of triangle = ½ × base × height.",
      "*Worked Example 2:",
      "Triangle base 6cm, height 4cm → Area = ½×6×4 = 12cm²",
      "*Worked Example 3 (a case testing whether \"height\" is understood correctly — a genuine misconception point)",
      "A triangle has a slanted side labeled 10cm, a base of 8cm, and a perpendicular height (measured straight up from the base to the opposite vertex) of 6cm. Find its area.",
      "A common error is using the slanted side (10cm) as the \"height\" in the formula. The height MUST be the perpendicular (straight up-and-down) distance from the base to the opposite vertex, not any slanted side.",
      "Correct calculation: ½×8×6 = 24cm² (the 10cm slanted side is not used in this calculation at all)",
      "*Practice Questions:"
    ],
    "checks": [
      "Compare a square and a rhombus systematically (sides, then angles, then any special relationship — is one a special type of the other?).",
      "Compare a triangle and a parallelogram systematically.",
      "Why is a circle not classified as a polygon? Use the definitions of \"side\" and \"vertex\" established above to explain precisely.",
      "Find the perimeter of a square with side 6cm (using the basic \"add all sides\" method first, then check with the shortcut 4×side).",
      "Find the perimeter of a triangle with sides 5cm, 7cm, and 9cm.",
      "A rectangular field is 40m long and 25m wide. Find the total length of fencing needed to go around it completely.",
      "An irregular pentagon has sides 3cm, 4cm, 4cm, 6cm, and 5cm. Find its perimeter.",
      "Find the area of a square with side 9cm (recall: a square is a special rectangle, so the same formula applies with length=width).",
      "Find the area of a rectangle 12cm by 7cm.",
      "Find the area of a triangle with base 10cm and height 6cm.",
      "A triangle has a base of 12cm, a perpendicular height of 5cm, and a slanted side of 13cm. Find its area, being careful to use the correct measurement (recall Worked Example 3's misconception check).",
      "A parallelogram has the same area formula as a rectangle (base × height). Using the idea of \"cutting a triangle off one end and moving it to the other end to form a rectangle,\" explain why this is true."
    ],
    "targets": [
      "Plane Shapes (similarities/differences, perimeter, area)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 3: Three-Dimensional Figures",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "3.1 What Makes a Shape 3-Dimensional",
      "*Step 1 — Establish the dimension count explicitly, building from 1D to 2D to 3D, rather than jumping straight to 3D",
      "A 1-dimensional object has only length (like a straight line — no width at all). A 2-dimensional shape adds width (like a rectangle — flat, no thickness). A 3-dimensional shape adds a third dimension, depth/height, meaning it occupies actual space and has VOLUME, not just area.",
      "3.2 Properties of Cubes and Cuboids",
      "*Step 1 — Establish \"face,\" \"edge,\" and \"vertex\" for 3D shapes explicitly (these terms extend the 2D \"side/vertex\" vocabulary, but need restating for 3D)",
      "A face is a flat surface of a 3D shape (the 3D equivalent of a 2D shape's \"side,\" but now it's an entire flat region, not just a line). An edge is a line where two faces meet. A vertex is a point where edges meet (same idea as in 2D, extended).",
      "*Worked Example (counting systematically for a cube, not just stating the numbers):",
      "A cube: picture a die. Count faces by going around: top, bottom, front, back, left, right = 6 faces, all equal squares.",
      "Count edges: each face has 4 edges, but each edge is SHARED between exactly 2 faces, so total edges = (6 faces×4 edges)÷2 = 12 edges.",
      "Count vertices: each corner where 3 edges meet = 8 vertices (4 on top, 4 on bottom).",
      "*Worked Example (Cuboid, contrasted directly against the cube):",
      "A cuboid has the SAME counts (6 faces, 12 edges, 8 vertices) — the difference is that a cuboid's faces are rectangles (not necessarily equal squares), while ALL of a cube's faces are equal squares. A cube is actually a SPECIAL TYPE of cuboid (just as a square is a special rectangle).",
      "*Practice Questions:",
      "3.3 Properties of Pyramids, Cones, Cylinders, and Spheres",
      "*Step 1 — Establish each shape's properties by describing HOW it's formed, not just naming features",
      "A cone is formed by a flat circular base and a curved surface that narrows smoothly to a single point (the apex). It has 1 flat face (the circle), 1 curved surface, and 1 vertex (the apex point).",
      "A cylinder is formed by two identical flat circular faces (top and bottom) connected by a curved surface wrapping around the sides. It has 2 flat faces, 1 curved surface, and NO vertices at all (there's no sharp point anywhere — the curved surface meets the flat faces smoothly, without forming a corner).",
      "A sphere is a perfectly round 3D shape (like a ball) with just ONE continuously curved surface — no flat faces, no edges, and no vertices anywhere on it.",
      "*Worked Example (comparing a cone and a cylinder directly, to reinforce the distinction):",
      "Both have circular flat parts and a curved surface, but a cone's curved surface NARROWS to a point (giving it exactly 1 vertex), while a cylinder's curved surface stays the SAME width all the way (giving it 0 vertices). This single difference — whether the curved surface narrows to a point or stays constant — is what separates the two shapes.",
      "*Practice Questions:",
      "3.4 Volume of Cubes and Cuboids",
      "*Step 1 — Derive volume as \"3D counting of unit cubes,\" extending directly from the 2D area-counting idea already established",
      "Just as area counted unit SQUARES fitting into a 2D shape, volume counts unit CUBES fitting into a 3D shape.",
      "*Step 2 — Full derivation, layer by layer, not just the formula",
      "Picture a cuboid 3 units long, 2 units wide, and 2 units high. Fill the BOTTOM LAYER with unit cubes: this layer is just a 2D rectangle of 3×2=6 unit cubes (using the area idea already learned). Now, since the cuboid is 2 units HIGH, there are 2 such layers stacked on top of each other. Total unit cubes = 6 (per layer) × 2 (layers) = 12.",
      "This shows Volume = length × width × height is really just (area of the base layer) × (number of layers, i.e., the height).",
      "*Worked Example:",
      "Cuboid: length 5cm, width 3cm, height 4cm → Volume = 5×3×4 = 60cm³ (cubic cm, since we're counting 3D unit cubes, matching the square-unit logic from area but one dimension higher)",
      "*Worked Example (a cube, as a special case where all three dimensions are equal):",
      "Cube with side 4cm → Volume = 4×4×4 = 64cm³ (this is the same formula, just with length=width=height)",
      "*Practice Questions:"
    ],
    "checks": [
      "State two differences between a cube and a cuboid, and one way a cube can be described as a \"special type\" of cuboid.",
      "How many faces, edges, and vertices does a cuboid have? Explain how you counted the edges (using the \"shared between 2 faces\" reasoning).",
      "Name one real-life object shaped like a cone, and one shaped like a cylinder.",
      "Why does a sphere have no edges or vertices, unlike a cube? (Use the definitions of edge and vertex established above.)",
      "A pyramid has a square base and 4 triangular faces meeting at a single top point. How many faces, edges, and vertices does it have? (Count systematically, as done for the cube above: faces = base + triangular sides; edges = base edges + edges going up to the apex; vertices = base corners + the apex.)",
      "Find the volume of a cube with side 4cm, explaining why all three dimensions being equal simplifies the formula.",
      "Find the volume of a cuboid 6cm × 4cm × 3cm, showing the \"layers\" reasoning (area of base layer, times height).",
      "A water tank is a cuboid 2m long, 1.5m wide, and 1m high. Find its volume in cubic metres.",
      "Two cuboids have the same volume (60cm³) but different dimensions. Give one possible set of dimensions (length × width × height) for a SECOND cuboid with this same volume, different from 5×3×4."
    ],
    "targets": [
      "Three-Dimensional Figures (cubes, cuboids, pyramids, cones, cylinders, spheres; volume)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 4: Construction",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "*Step 1 — Establish WHY construction uses only a ruler and compass, not a protractor, for angle construction — this is a genuine \"why\" question students should understand, not just a rule to follow",
      "A protractor relies on reading a scale, which can be misread or imprecise depending on how carefully it's aligned. A compass-and-ruler construction instead uses the GEOMETRIC PROPERTIES of circles and equal distances to guarantee mathematical exactness — the angle or bisection produced is provably exact, not just \"close enough by eye.\"",
      "4.1 Parallel and Perpendicular Lines",
      "*Explanation: Parallel lines maintain the same distance apart forever, never meeting (like railway tracks). Perpendicular lines cross at exactly a right angle (90°).",
      "4.2 Bisecting a Line Segment",
      "*Step 1 — Establish what \"bisect\" means precisely: divide into exactly two EQUAL parts",
      "*Step 2 — Full method, explained with the geometric REASON it works, not just the steps",
      "Method: Open a compass to a width MORE than half the segment's length (this is important — too small a width and the arcs won't cross). Place the compass point on one endpoint of the segment and draw an arc above and below the line. Without changing the compass width, repeat from the OTHER endpoint, drawing arcs that cross the first set.",
      "*Why this works: Every point on either arc is the SAME distance from its endpoint (that's what a compass arc means — a fixed radius from a center point). Where the two arcs cross, that point is EQUALLY distant from BOTH endpoints (since both arcs used the same compass width). A line through two such equally-distant points must pass exactly through the middle of the original segment, and it does so at a perfect right angle (perpendicular) — this is what makes it a perpendicular bisector.",
      "*Practice Questions:",
      "4.3 Construction of Angles 90° and 60°",
      "*Step 1 — Full method and reasoning for 60°, connecting to the equilateral triangle property (recall: equilateral means all sides AND all angles equal)",
      "Method: Draw a straight line and mark a point on it. Place the compass point on this point and draw an arc crossing the line. WITHOUT changing the compass width, move the compass point to where the arc crosses the line, and draw a SECOND arc crossing the first. Connect the original point to this new crossing point.",
      "*Why this gives exactly 60°: Every side used in this construction was drawn with the SAME compass width — meaning the triangle formed (original point, first crossing point, second crossing point) has all three sides equal. A triangle with all sides equal is called equilateral, and it's a proven geometric fact that an equilateral triangle has all three angles equal too. Since a triangle's angles always sum to 180° (established earlier), and all three are equal, each angle must be 180°÷3 = 60°.",
      "*Step 2 — Construction of 90°, derived from bisecting a straight angle",
      "A straight line represents a 180° angle. Bisecting it (using the same bisection method as Topic 4.2, but applied to an ANGLE rather than a line segment) splits it into two EQUAL halves: 180°÷2 = 90°.",
      "*Practice Questions:"
    ],
    "checks": [
      "Describe, step-by-step, how to bisect a 6cm line segment using a compass, and explain in your own words WHY the crossing points are guaranteed to be exactly in the middle.",
      "Why must the compass width be MORE than half the segment's length for this method to work? (Hint: what happens to the arcs if the width is too small?)",
      "Construct a 60° angle using a ruler and compass, and explain — using the equilateral triangle property — why this method guarantees EXACTLY 60°, not just approximately.",
      "Explain how bisecting a straight angle produces a 90° angle, using the \"180° split into two equal halves\" reasoning.",
      "Using the 60° construction as a building block, describe how you might construct a 30° angle (hint: what operation, already learned, splits an angle into two equal halves?)."
    ],
    "targets": [
      "Construction (parallel/perpendicular lines, bisecting a segment, 90°/60° angles)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 5: Angles",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "5.1 Measurement of Angles",
      "*Step 1 — Establish what an angle actually measures BEFORE naming any types",
      "An angle measures the amount of ROTATION (turning) between two lines that meet at a shared point (called the vertex). It is measured in degrees, where a full rotation (returning exactly to the starting direction) equals 360°.",
      "5.2 Types of Angle Pairs — Each Established by HOW It's Formed, Not Just a Picture",
      "*Vertically opposite angles: Formed when two straight lines cross each other. The two angles directly ACROSS from each other (not next to each other) are called vertically opposite, and they are always EQUAL. Why? Each pair of vertically-opposite angles, together with one adjacent angle, forms a straight line (180°). Since both vertically-opposite angles share the SAME adjacent angle relationship (180° minus the same adjacent angle), they must be equal to each other.",
      "*Adjacent angles: Angles that share a common vertex AND a common side, sitting immediately next to each other (not across, like vertically opposite ones).",
      "*Alternate angles: Formed when a line (called a transversal) crosses two PARALLEL lines. Alternate angles sit on OPPOSITE sides of the transversal, and BETWEEN the two parallel lines. They are always equal — this is a geometric property of parallel lines specifically (it does NOT hold if the two lines aren't parallel).",
      "*Corresponding angles: Also formed with a transversal crossing two parallel lines. Corresponding angles sit in MATCHING positions at each of the two crossing points (e.g., both \"top-left\" of their respective intersections). They too are always equal, for the same reason — this only holds because the lines are parallel.",
      "5.3 Angles at a Point and on a Straight Line",
      "*Step 1 — Establish both facts as consequences of \"a full rotation is 360°, and half a rotation is 180°,\" not as separate unrelated rules",
      "A straight line represents exactly half a full rotation (180°) — so any angles that together form a straight line must add up to 180°. A full point (angles going all the way around) represents one COMPLETE rotation — so angles around a point always add up to 360°.",
      "*Worked Example 1:",
      "Two angles on a straight line are x° and 65°.",
      "x + 65 = 180 (since they form a straight line)",
      "x = 115°",
      "*Worked Example 2 (three angles at a point, testing the 360° rule):",
      "Three angles around a point are 120°, 90°, and x°.",
      "120+90+x = 360",
      "210+x=360",
      "x=150°",
      "*Practice Questions:"
    ],
    "checks": [
      "Two angles at a point are 120°, 90°, and x°. If these are the only three angles around the point, find x, and check your answer adds to 360°.",
      "Two vertically opposite angles are labeled 3x and 75°. Find x, explaining why these two expressions can be set equal to each other.",
      "A line crosses two parallel lines, creating a pair of corresponding angles. If one is 110°, what is the other, and explain WHY (referencing the parallel-lines property, not just \"they're always equal\").",
      "A line crosses two parallel lines, creating a pair of alternate angles, one of which is 65°. Find the other, and explain the difference between how alternate and corresponding angles are positioned relative to the transversal."
    ],
    "targets": [
      "Angles (measurement, vertically opposite/adjacent/alternate/corresponding, angles at a point/on a line)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 6: Need for Statistics",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "*Step 1 — Establish, with a concrete before/after comparison, WHY organized data is more useful than raw, uncollected information",
      "Imagine a school principal wanting to know if students prefer football or basketball, but never actually asking anyone — they'd have no real basis for decisions like which sport to invest more equipment in. Statistics is the branch of mathematics that provides the TOOLS to collect, organize, and interpret such information systematically, turning vague impressions into decision-worthy evidence.",
      "*Practice Questions:"
    ],
    "checks": [
      "Give two real-life reasons why a school might collect data about its students (be specific about what decision the data would help with).",
      "Why is it more useful to organize data into a table or chart than to leave it as a random list of numbers? Give a concrete example of confusion that could arise from an unorganized list."
    ],
    "targets": [
      "Need for Statistics"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 7: Data Collection",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "*Step 1 — Establish what makes data collection \"systematic\" as opposed to casual/biased",
      "Systematic data collection means using a clear, consistent method applied to EVERY member of the group being studied (or a fairly chosen sample), rather than only asking convenient or similar people, which can produce a MISLEADING picture.",
      "*Worked Example (illustrating bias, a genuine misconception to address directly):",
      "A student wants to know the class's favorite subject, but only asks their 5 closest friends (who all happen to like Mathematics). They conclude \"the whole class loves Maths.\" This is likely WRONG — friend groups often share similar tastes, so this small, non-random sample doesn't represent the whole class fairly.",
      "*Practice Questions:"
    ],
    "checks": [
      "Design a systematic way to collect data on your classmates' favorite fruits (describe exactly who you would ask, and how, to avoid bias).",
      "Why might asking only 5 people about their favorite football team give a misleading picture of the whole school's preference? Use the reasoning from the Worked Example above."
    ],
    "targets": [
      "Data Collection"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 8: Data Presentation — Median (Introductory)",
    "sourceFile": "jss1-math-term3.md",
    "steps": [
      "*Step 1 — Establish what the median represents (the exact MIDDLE value once data is ordered), and WHY this differs meaningfully from an average (mean)",
      "The median is found by arranging all data values in order (smallest to largest) and picking the value that sits exactly in the middle. This is USEFUL specifically because a few extremely high or low values (called outliers) can distort a mean average, but they don't shift the median nearly as much, since the median only cares about POSITION, not the actual size of the extreme values.",
      "*Worked Example 1 (odd number of values, straightforward case):",
      "Data: 3, 7, 2, 9, 5",
      "Arrange in order: 2, 3, 5, 7, 9",
      "Since there are 5 values (odd), the middle one is the 3rd value: Median = 5",
      "*Worked Example 2 (even number of values — a genuinely different case requiring averaging the two middle values, must be taught explicitly, not skipped)",
      "Data: 4, 8, 2, 10",
      "Arrange: 2, 4, 8, 10",
      "With 4 values (even), there is NO single middle value — instead, average the two middle ones (4 and 8): (4+8)/2 = Median = 6",
      "*Worked Example 3 (showing WHY the median resists outliers, the actual point of this topic)",
      "Data: 2, 3, 4, 5, 100",
      "Arrange (already ordered): 2, 3, 4, 5, 100",
      "Median (middle of 5 values) = 4",
      "Compare to the mean: (2+3+4+5+100)/5 = 114/5 = 22.8",
      "The mean (22.8) is dragged heavily upward by the single outlier (100), giving a misleading sense of a \"typical\" value. The median (4) is unaffected by how extreme that one value is — it only cares that 100 is simply \"the biggest,\" regardless of by how much.",
      "*Practice Questions:",
      "This completes JSS1 Maths — all three terms, fully rebuilt at zero-assumption depth. Continuing next to JSS2 Maths, First Term at this same standard."
    ],
    "checks": [
      "Find the median of: 12, 5, 8, 20, 3 (arrange in order first, then identify the middle value).",
      "Find the median of: 6, 9, 2, 11 (an even-count case — show the averaging step).",
      "Explain, using the outlier idea from Worked Example 3, why the median might be a better \"typical value\" than the mean for a data set like household incomes in a village, where one household is far wealthier than all the rest.",
      "Why must the data be arranged in order BEFORE finding the median? Explain what would go wrong if you picked the \"middle\" position of an UNordered list."
    ],
    "targets": [
      "Data Presentation — Median (introductory)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 1: Whole Numbers — Standard Form and Indices",
    "sourceFile": "jss2-math-term1.md",
    "steps": [
      "1.1 Standard Form (Scientific Notation)",
      "*Step 1 — Establish the problem standard form solves, with a concrete comparison",
      "Compare writing 384,400,000 (the approximate distance to the moon in km) versus writing it as 3.844×10⁸. The second form instantly tells us the SIZE of the number (via the power of 10) without counting digits — this becomes extremely useful once numbers get very large or very small, and especially for comparing sizes quickly.",
      "*Step 2 — Establish the rule for finding the power of 10 by actually counting decimal-point movement, shown step by step, not just stated",
      "To convert 384,400,000 to standard form:",
      "Write the decimal point's original position (at the very end, after the last zero): 384400000.",
      "Move the decimal point LEFT, one digit at a time, until exactly ONE non-zero digit remains before it:",
      "384400000. → 38440000.0 → 3844000.00 → ... continue counting each single-digit move.",
      "Count the total number of moves: 8 moves to land at 3.844",
      "This count of moves becomes the power: 3.844 × 10⁸",
      "*Diagram for Avora's whiteboard (describe exactly what to draw):",
      "Draw the number 3 8 4 4 0 0 0 0 0 as individual digit boxes in a row. Draw an arrow starting after the first digit (3) and animate/count the decimal point hopping left across each subsequent digit, with a small number counter (1,2,3...8) appearing above each hop, ending with the point placed right after the \"3\", and the label \"×10⁸\" appearing once the count reaches 8.",
      "*Worked Example 2 (a small number — decimal point moves RIGHT, and the power becomes NEGATIVE, explained explicitly why)",
      "Convert 0.0000021 to standard form.",
      "Move the decimal point RIGHT until one non-zero digit remains before it: 0.0000021 → 0.000021 → ... count each move: 6 moves to reach 2.1",
      "Since we moved RIGHT (meaning the original number was smaller than the \"2.1\" we ended up with), the power must be NEGATIVE to \"shrink\" 2.1 back down to the original tiny size: 2.1×10⁻⁶",
      "*Worked Example 3 (converting FROM standard form back to an ordinary number — the reverse direction, testing full understanding)",
      "Write 6.02×10⁵ as an ordinary number.",
      "The power is +5, meaning we move the decimal point RIGHT by 5 places (the opposite direction of Worked Example 2's negative case): 6.02 → 60.2 → 602. → 6020. → 60200. → 602000.",
      "Answer: 602,000",
      "*Practice Questions:",
      "1.2 Indices (Introductory Laws)",
      "*Step 1 — Establish what an index/power represents: REPEATED MULTIPLICATION, explicitly distinguished from repeated addition, since confusing the two is a very common error",
      "2³ means 2×2×2 (three 2's multiplied together) = 8. This is NOT the same as 2×3=6 (which would be repeated ADDITION, i.e., 2+2+2). Flag this distinction directly: many students confuse \"2 to the power 3\" with \"2 times 3\" — they are different operations entirely.",
      "*Step 2 — Derive the multiplication law of indices by fully expanding both sides, not stating the rule first",
      "2³ × 2² — expand each fully first:",
      "2³ = 2×2×2",
      "2² = 2×2",
      "So 2³×2² = (2×2×2)×(2×2) = 2×2×2×2×2 (five 2's multiplied together) = 2⁵",
      "Notice: 3+2=5. The rule \"when multiplying same-base powers, ADD the indices\" isn't an arbitrary shortcut — it's simply what happens naturally when you count all the multiplied 2's together.",
      "*Worked Example (applying the derived law):",
      "Simplify: 3²×3⁴ = 3^(2+4) = 3⁶ (evaluate if needed: 3⁶=729)",
      "*Worked Example (testing the SAME reasoning process for DIVISION, having the student discover the division law by analogy)",
      "Simplify: 2⁵÷2²",
      "Expand fully: (2×2×2×2×2)÷(2×2)",
      "The two 2's on the bottom CANCEL two of the five 2's on top (since dividing by 2 twice removes two factors of 2): leaving 2×2×2 = 2³",
      "Notice: 5−2=3. So the division law is: when dividing same-base powers, SUBTRACT the indices — again derived by full expansion, not stated blindly.",
      "*Practice Questions:"
    ],
    "checks": [
      "Write 52,000 in standard form, showing every decimal-point movement counted individually.",
      "Write 0.00034 in standard form, stating clearly why the power is negative.",
      "Write 6.02×10⁵ as an ordinary number (already shown above — now do 4.15×10⁴ yourself, showing every move).",
      "Which is bigger: 3.2×10⁴ or 2.9×10⁵? Explain your reasoning using ONLY the powers (without converting to ordinary numbers first) — what does a bigger power tell you, assuming the \"number in front\" is between 1 and 10 in both cases?",
      "Evaluate: 2⁴ (write out the full multiplication, don't just state the answer).",
      "Simplify: 5²×5³ (leave in index form first, THEN evaluate the final number).",
      "Using the same full-expansion method shown above for division, simplify 3⁶÷3², showing the cancellation explicitly.",
      "A student claims 2³×3² = 6⁵ (adding ALL the numbers and powers together). Explain, using the derivation method above, why this is WRONG (hint: does the multiplication law apply when the BASES are different, i.e., 2 and 3 rather than the same base?)."
    ],
    "targets": [
      "Whole Numbers — Standard Form; Indices (introductory laws)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 2: Revision — Prime Factors, LCM, HCF; Squares and Square Roots",
    "sourceFile": "jss2-math-term1.md",
    "steps": [
      "(Prime factors, LCM, and HCF were fully derived in JSS1 — see the JSS1 Term 1 file for the complete step-by-step derivation. This topic briefly recalls them before extending to squares/roots, which are new.)*",
      "2.1 Squares and Square Roots",
      "*Step 1 — Establish squaring and square-rooting as INVERSE (opposite) operations, using the same \"undo\" logic already established for equations in JSS1",
      "Squaring a number means multiplying it by itself: 5²=5×5=25. Just as subtraction \"undoes\" addition, finding a square root \"undoes\" squaring — it asks: \"what number, multiplied by itself, gives this result?\"",
      "*Diagram for Avora's whiteboard:",
      "Draw a square grid, 5 boxes by 5 boxes (5×5=25 total small squares), visually showing WHY \"squaring\" is named after literal squares — the picture directly represents 5² as the AREA of a 5-by-5 square, connecting back to the area concept from JSS1.",
      "*Worked Example 1:",
      "Find √144. Think: \"what number times itself gives 144?\" Test candidates methodically rather than guessing randomly: 10×10=100 (too small), 12×12=144 ✓ (found it), so √144=12.",
      "*Worked Example 2 (testing understanding of a NON-perfect square, an important edge case)",
      "Is there a whole number that equals √50?",
      "Test nearby whole numbers: 7×7=49 (close, but not 50), 8×8=64 (too big). Since 50 falls BETWEEN 49 and 64, there is NO whole number whose square is exactly 50 — meaning √50 is not a whole number (it's actually an irrational number, a concept explored more fully in JSS3).",
      "*Practice Questions:"
    ],
    "checks": [
      "Evaluate: 7² (show the full multiplication, and relate it to the area of a 7-by-7 square).",
      "Find √81, testing at least two candidate numbers before confirming the answer.",
      "Find √225.",
      "Explain, using the candidate-testing method from Worked Example 2, why √50 is NOT a whole number, and state which TWO whole numbers it falls between."
    ],
    "targets": [
      "Revision: Prime Factors, LCM, HCF; Squares and Square Roots"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 3: Approximation — Decimal Places and Significant Figures",
    "sourceFile": "jss2-math-term1.md",
    "steps": [
      "(The core rounding rule — \"5 rounds up,\" derived from a number line — was fully established in JSS1 Term 2. This topic extends that rule to two new precision formats.)*",
      "3.1 Decimal Places",
      "*Step 1 — Recall the core rounding rule explicitly, then apply it to a NEW context (decimal places) rather than assuming the transfer is obvious",
      "Rounding \"to n decimal places\" means keeping exactly n digits after the decimal point, deciding whether to round up or down by looking at the very NEXT digit (the one just after the cutoff) — using the SAME \"5 or more rounds up\" rule from JSS1.",
      "*Worked Example:",
      "Round 3.6789 to 2 decimal places.",
      "Identify the cutoff: we want to KEEP 2 digits after the point (6 and 7), so the digit that DECIDES rounding is the 3rd decimal digit (8).",
      "Since 8≥5, round the 2nd decimal digit up: 7 becomes 8.",
      "Answer: 3.68",
      "3.2 Significant Figures",
      "*Step 1 — Establish what \"significant\" means, with explicit rules for WHICH zeros count and which don't (this is the genuinely new, tricky part)",
      "ALL non-zero digits are significant (they carry real measured information). Zeros are trickier:",
      "Zeros BETWEEN two non-zero digits ARE significant (e.g., in 105, the 0 counts, because it's needed to correctly show the size of the number).",
      "LEADING zeros (before the first non-zero digit, e.g., in 0.0034) are NEVER significant — they only show the DECIMAL PLACE/scale, not measured precision.",
      "TRAILING zeros after a decimal point (e.g., in 3.40) ARE significant — they show the measurement was precise enough to confirm that digit is exactly zero, not just unknown.",
      "*Worked Example 1 (leading zeros excluded):",
      "Round 0.004567 to 2 significant figures.",
      "Identify significant digits: the leading zeros (0.00) don't count. The first significant figure is 4, the second is 5.",
      "Look at the NEXT digit (6) to decide rounding: 6≥5, round up.",
      "Answer: 0.0046",
      "*Worked Example 2 (a case with a significant zero BETWEEN digits, to test the middle-zero rule explicitly)",
      "Round 30,547 to 3 significant figures.",
      "Significant digits, counted from the first non-zero digit: 3, 0 (this counts, it's between digits), 5 — that's our 3 significant figures.",
      "Look at the next digit (4) to decide: 4<5, round down (keep as is).",
      "Answer: 30,500 (note: the trailing zeros here are placeholders to preserve the number's SIZE, not additional significant figures)",
      "*Practice Questions:"
    ],
    "checks": [
      "Round 27.348 to 1 decimal place.",
      "Round 5,678 to 2 significant figures.",
      "Round 0.09876 to 3 significant figures, explicitly stating which digits you identified as significant and why the leading zeros don't count.",
      "How many significant figures does the number 2.500 have? Explain using the \"trailing zeros after a decimal point ARE significant\" rule."
    ],
    "targets": [
      "Approximation — Decimal Places and Significant Figures"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 4: Fractions, Percentages, Ratio, and Rate",
    "sourceFile": "jss2-math-term1.md",
    "steps": [
      "4.1 Percentages — Increase and Decrease",
      "*Step 1 — Establish, with an explicit WRONG-approach comparison, why percentage change must be based on the ORIGINAL value, not the new value",
      "*Worked Example (showing the WRONG method first, then the correct one, so the error is unmistakable):",
      "A price increases from ₦200 to ₦250. Find the percentage increase.",
      "WRONG approach (a common error): some students calculate the increase (₦50) as a percentage of the NEW value (250): 50/250×100=20%. This is INCORRECT, because \"percentage increase\" should describe how much bigger the change is COMPARED TO where it started, not compared to where it ended up.",
      "CORRECT approach: divide the increase by the ORIGINAL value: 50/200×100 = 25%",
      "*Diagram for Avora's whiteboard:",
      "Draw a bar representing the ORIGINAL value (₦200) as a full-width rectangle. Draw a second, longer bar next to it representing the NEW value (₦250), aligned at the same starting edge. Shade the EXTRA portion (the ₦50 increase) and visually connect it back to the ORIGINAL bar's length (not the new one) to show which value the percentage should be calculated against.",
      "*Practice Questions:",
      "4.2 Ratio",
      "*Step 1 — Establish ratio as a DIRECT comparison, distinct from a fraction (a part-to-whole comparison), with an explicit example contrasting the two",
      "A ratio like 2:3 compares two quantities directly to EACH OTHER (for every 2 of one thing, there are 3 of the other). This is different from a fraction, which compares a PART to the WHOLE. If a classroom has 2 boys for every 3 girls (ratio 2:3), the FRACTION of the class that is boys is 2 OUT OF THE TOTAL 5 parts (2+3=5), i.e., ⅖ — not ⅔. This distinction (ratio vs. fraction-of-total) is a genuine, common point of confusion.",
      "*Worked Example (full sharing method, with the fraction-of-total distinction reinforced):",
      "Share ₦600 between two people in the ratio 2:3.",
      "Total parts = 2+3 = 5 (this total represents the WHOLE, matching the fraction idea above)",
      "Value of each part = 600÷5 = ₦120",
      "First person's share = 2 parts × 120 = ₦240 (this is ⅖ of the total, NOT the ratio number 2 itself)",
      "Second person's share = 3 parts × 120 = ₦360 (⅗ of the total)",
      "Check: 240+360=600 ✓ (always verify shares add back to the original total)",
      "*Diagram for Avora's whiteboard:",
      "Draw a single bar of length 600 (representing the total), divided into 5 EQUAL segments (since total parts=5). Shade 2 segments one color (labeled \"Person A, ₦240\") and 3 segments another color (labeled \"Person B, ₦360\"), visually showing how the ratio splits the single bar.",
      "*Practice Questions:",
      "4.3 Rate and Proportion",
      "*Step 1 — Establish \"rate\" as a comparison of two DIFFERENT kinds of quantities (unlike ratio, which usually compares the same kind), connecting explicitly to the direct-proportion idea from earlier general work",
      "A rate like \"km per hour\" compares DISTANCE to TIME — two different types of measurement, unlike a ratio (e.g., boys to girls, both counting people). This connects to direct proportion: as time increases, distance traveled increases at a steady rate.",
      "*Worked Example (full proportion reasoning, not just formula plug-in):",
      "A car travels 180km in 3 hours. Find its rate (speed) in km/hour, then use this rate to find how far it travels in 5 hours.",
      "Step 1 (find the rate): 180km ÷ 3 hours = 60 km per hour (this tells us the distance covered in JUST ONE hour)",
      "Step 2 (use the rate for a NEW time): since the rate is constant (direct proportion), distance in 5 hours = 60×5 = 300km",
      "*Practice Questions:"
    ],
    "checks": [
      "A quantity decreases from 80 to 60. Find the percentage decrease (careful: base it on the ORIGINAL value, 80).",
      "A trader's profit increased from ₦3,000 to ₦3,900. Find the percentage increase.",
      "If a price is reduced by 15% from ₦4,000, find the new price (this is the REVERSE direction — first find 15% of 4,000, then SUBTRACT it from 4,000).",
      "A student calculates a percentage decrease from 100 to 80 as \"20/80×100=25%.\" Identify their error using the WRONG/CORRECT comparison method shown above, and give the correct answer.",
      "Share 40 sweets between two children in the ratio 3:5, showing the total-parts step explicitly.",
      "Simplify the ratio 12:18 to its lowest terms (recall the HCF method from JSS1 — find HCF of 12 and 18 first, then divide both sides by it).",
      "A recipe uses flour and sugar in the ratio 5:2. If 15kg of flour is used, how much sugar is needed? (Hint: find the value of ONE \"part\" first, using the flour amount and its ratio number.)",
      "A class has a boy-to-girl ratio of 3:4. If there are 28 students total, how many are boys? Explain the difference between \"3 out of 7 parts\" (the ratio-based fraction) and just \"3\" (the raw ratio number).",
      "A car travels 180km in 3 hours. Find its rate (speed) in km/hour.",
      "If 5kg of rice costs ₦4,000, find the cost per kg, then use it to find the cost of 8kg (show both steps: find the \"per unit\" rate first, then scale up).",
      "A tap fills a tank at a rate of 15 litres per minute. How long will it take to fill a 180-litre tank? (Hint: this is the REVERSE direction — you know the rate and the total, and need to find time.)"
    ],
    "targets": [
      "Fractions, Percentages (increase/decrease), Ratio, Rate"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 5: Transactions in the Home and Office",
    "sourceFile": "jss2-math-term1.md",
    "steps": [
      "5.1 Household Arithmetic (Budgeting)",
      "*Worked Example (full percentage-of-total reasoning, connecting directly back to Topic 4.1):",
      "A family's monthly income is ₦150,000. They spend 40% on rent, 25% on food, and save the rest. Find the amount saved.",
      "Rent = 40% of 150,000 = (40/100)×150,000 = ₦60,000",
      "Food = 25% of 150,000 = (25/100)×150,000 = ₦37,500",
      "Total spent = 60,000+37,500 = ₦97,500",
      "Amount saved = Total income − Total spent = 150,000−97,500 = ₦52,500",
      "*Practice Questions:",
      "5.2 Commercial Arithmetic — Simple Interest",
      "*Step 1 — Derive the simple interest formula by reasoning through ONE year at a time, rather than presenting the formula immediately",
      "If ₦40,000 earns 5% interest per year, then EACH year, the interest earned is a FIXED amount: 5% of 40,000 = ₦2,000 (note: with SIMPLE interest, this amount doesn't change year to year, unlike compound interest studied in JSS3, where interest is calculated on a GROWING amount).",
      "Over 3 years, since the same ₦2,000 is earned each year: Total interest = 2,000×3 = ₦6,000",
      "*Step 2 — Now express this reasoning as the general formula, showing it matches",
      "I = (P×R×T)/100, where P=principal (original amount), R=rate per annum (%), T=time in years.",
      "Check against our reasoning: I = (40,000×5×3)/100 = 600,000/100 = ₦6,000 ✓ matches exactly.",
      "*Practice Questions:"
    ],
    "checks": [
      "A family spends 30% of ₦200,000 income on school fees. How much is left for other expenses?",
      "A water bill is ₦4,500 and a light bill is ₦6,200. If both are split EQUALLY among 4 flatmates, how much does each pay? (This uses division, not percentage — identify which operation the word \"equally\" signals.)",
      "A civil servant earns ₦180,000 monthly. If 12% is deducted for pension and 8% for tax, find the amount they take home after BOTH deductions.",
      "Find the simple interest on ₦25,000 for 2 years at 8% per annum, first reasoning through ONE year's interest before multiplying by the number of years.",
      "A sum of ₦60,000 is invested and earns ₦9,000 simple interest after 3 years. Find the rate per annum (this requires rearranging the formula — first find the ANNUAL interest by dividing 9,000 by 3 years, then find what percentage that is of ₦60,000)."
    ],
    "targets": [
      "Transactions in the Home and Office (budgeting; simple interest)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 6: Multiplication and Division of Directed (Negative) Numbers",
    "sourceFile": "jss2-math-term1.md",
    "steps": [
      "*Step 1 — Establish the sign rules using an extended, explicit PATTERN table, not just a memorized rule (recall the pattern-based reasoning from JSS1's integer work)",
      "Consider the pattern of 3×(a decreasing number):",
      "3×2=6, 3×1=3, 3×0=0, 3×(−1)=? Following the CONSISTENT pattern (each step down by 3): 3×(−1) should be −3, and indeed it is. This shows WHY a positive times a negative gives a negative — it's not an arbitrary rule, it CONTINUES the same pattern that already held for positive numbers.",
      "Now consider (−3)×(a decreasing number): (−3)×2=−6, (−3)×1=−3, (−3)×0=0, (−3)×(−1)=? Following the pattern (each step UP by 3 as the second number decreases by 1, since we're now going in the negative direction): (−3)×(−1) should be +3. This shows WHY a negative times a negative gives a positive.",
      "*Worked Example (Division, derived as the INVERSE of multiplication, connecting to the \"undo\" logic already used for equations):",
      "(−20)÷(−5) = ? Think of division as asking: \"what number, when multiplied by −5, gives −20?\" Test: (−5)×4=−20 ✓. So (−20)÷(−5)=4 (both negative → positive, matching the multiplication pattern).",
      "*Practice Questions:"
    ],
    "checks": [
      "Calculate: (−7) × 3, and verify using the pattern-table reasoning (what does the pattern say a positive-times-negative should give?).",
      "Calculate: (−8) × (−2), verifying using the pattern reasoning for negative-times-negative.",
      "Calculate: (−36) ÷ (−9), using the \"what number times −9 gives −36\" reasoning.",
      "Calculate: 45 ÷ (−9).",
      "A student calculates (−6)×(−3)×(−2) and gets +36. Work through this step by step (multiply two at a time) to check whether this is correct, paying attention to how the sign changes with EACH multiplication."
    ],
    "targets": [
      "Multiplication and Division of Directed (Negative) Numbers"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 7: Algebraic Expressions (Introductory)",
    "sourceFile": "jss2-math-term1.md",
    "steps": [
      "*Step 1 — Recall coefficients and like terms from JSS1 explicitly, then extend to MULTIPLYING algebraic terms together, which is genuinely new",
      "*Worked Example 1 (multiplying different letters):",
      "Simplify: 3a × 4b",
      "Multiply the NUMBER parts together (3×4=12), then simply write the letters next to each other (since ab means a×b, by algebraic convention): 12ab",
      "*Worked Example 2 (multiplying the SAME letter — connects directly to the indices law derived in Topic 1)",
      "Simplify: 2x × 3x",
      "Multiply the numbers: 2×3=6. For the letters: x×x — recall the indices law (Topic 1): x¹×x¹=x^(1+1)=x².",
      "Result: 6x²",
      "*Practice Questions:",
      "This completes JSS2 Maths, First Term at full zero-assumption depth, with explicit whiteboard diagram descriptions included for the visual/geometric and bar-model concepts. Continuing next to JSS2 Second Term at this same standard."
    ],
    "checks": [
      "Simplify: 5m × 2n",
      "Simplify: 4y × 3y, showing the indices-law step explicitly (why does y×y become y²?).",
      "Simplify: 2a × 3a × b (multiply the numbers first, then handle the \"a\" terms using the indices law, then attach the lone \"b\")."
    ],
    "targets": [
      "Algebraic Expressions (introductory — multiplying terms)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 1: Algebraic Expressions — Expansion, Substitution, Factorization",
    "sourceFile": "jss2-math-term2.md",
    "steps": [
      "1.1 Expansion and Simplification (Removing Brackets)",
      "*Step 1 — Recall the foundational bracket lesson (single term × bracket) explicitly before extending it",
      "Recall: a(b+c) = ab+ac — the term outside the bracket multiplies EVERY term inside it, individually.",
      "*Worked Example 1 (a negative outside — a genuine misconception point, worked through with the wrong answer shown first)",
      "Expand: −3(x−4)",
      "A common WRONG approach: multiply −3 only by the x, forgetting to also multiply the −4, giving −3x−4 (incomplete — the −4 was never touched by the outside term).",
      "CORRECT approach: −3 multiplies BOTH terms: (−3×x) + (−3×−4) = −3x + 12 (recall the negative×negative=positive rule from JSS1/JSS2 Topic 6)",
      "Notice the sign FLIPS on the second term specifically because −3×−4 gives a positive result — this is exactly the kind of step a rushed student skips.",
      "*Worked Example 2 (expand then simplify, showing every intermediate term before combining):",
      "Expand and simplify: 2(x+3) + 3(x−1)",
      "Expand each bracket separately first: 2(x+3)=2x+6; 3(x−1)=3x−3",
      "Now combine everything: 2x+6+3x−3",
      "Group like terms: (2x+3x)+(6−3) = 5x+3",
      "*Practice Questions:",
      "1.2 Substitution",
      "*Step 1 — Establish substitution as \"replace the letter with its given number, then calculate using normal arithmetic rules already known\" — nothing new is being introduced except WHERE the numbers come from",
      "*Worked Example 1:",
      "If a=3 and b=5, find 2a+3b.",
      "Replace a with 3 and b with 5: 2(3)+3(5) = 6+15 = 21",
      "*Worked Example 2 (a case involving squaring a NEGATIVE substituted value — a genuine misconception point)",
      "If m=−3, find m².",
      "A common error: writing −3² and computing it as −(3²)=−9. But m² means m×m, so we must substitute FULLY: (−3)×(−3) = +9 (negative×negative=positive). The correct answer is 9, not −9 — the parentheses around the substituted negative number matter enormously here.",
      "*Practice Questions:",
      "1.3 LCM and HCF of Algebraic Terms",
      "*Step 1 — Recall the numeric LCM/HCF methods from JSS1 explicitly, then extend to include LETTERS, treating the letter part separately from the number part",
      "*Worked Example 1 (LCM):",
      "Find the LCM of 4x and 6x².",
      "Handle the NUMBER parts first (as in JSS1): LCM of 4 and 6 = 12.",
      "Handle the LETTER parts: take the HIGHEST power of x that appears (x² is higher than x¹), so we need x².",
      "Combine both parts: LCM = 12x²",
      "*Worked Example 2 (HCF):",
      "Find the HCF of 8a²b and 12ab.",
      "Numbers: HCF of 8 and 12 = 4.",
      "Letters: for \"a,\" take the LOWEST power present (a¹ in the second term, a² in the first) → a¹. For \"b,\" both terms have b¹ → b¹.",
      "Combine: HCF = 4ab",
      "*Practice Questions:",
      "1.4 Factorization of Algebraic Expressions (Common Factor)",
      "*Worked Example (fully explained, verified by expanding back):",
      "Factorize: 6x² + 9x",
      "Find the HCF of 6x² and 9x (numbers: HCF of 6,9=3; letters: lowest power of x present in both is x¹) → HCF = 3x",
      "Divide EACH term by this HCF to find what goes inside the bracket: 6x²÷3x=2x; 9x÷3x=3",
      "Result: 3x(2x+3)",
      "Check by expanding back (recall: outside term multiplies every term inside): 3x×2x=6x², 3x×3=9x → 3x(2x+3)=6x²+9x ✓ matches original.",
      "*Practice Questions:",
      "1.5 Expansion Leading to Quadratic Expressions",
      "*Step 1 — Recall the FULL foundational bracket×bracket mechanism (from the earlier standalone mini-lesson), restating it explicitly rather than assuming it's remembered",
      "Recall: (a+b)(c+d) = a(c+d) + b(c+d) — EACH term in the first bracket multiplies the ENTIRE second bracket, not just a matching position.",
      "*Diagram for Avora's whiteboard (the \"area model\" for bracket expansion — a powerful visual many students find clarifying):",
      "Draw a large rectangle. Split its WIDTH into two sections labeled \"x\" and \"2\" (representing the first bracket, x+2). Split its HEIGHT into two sections labeled \"x\" and \"5\" (representing the second bracket, x+5). This creates 4 smaller rectangles inside: top-left (x by x = x²), top-right (2 by x = 2x), bottom-left (x by 5 = 5x), bottom-right (2 by 5 = 10). Label each of the 4 inner rectangles with its area. The TOTAL area of the big rectangle (which must equal (x+2)(x+5)) is the SUM of all 4 small areas: x²+2x+5x+10 = x²+7x+10. This diagram makes the \"FOIL\" result visually undeniable, rather than a memorized list of 4 multiplications.",
      "*Worked Example (matching the diagram exactly):",
      "Expand (x+2)(x+5):",
      "x(x+5) + 2(x+5) = x²+5x+2x+10 = x²+7x+10 (matches the area-model diagram's total)",
      "*Practice Questions:",
      "1.6 Factorization of Simple Quadratic Expressions",
      "*Step 1 — Establish the reverse-thinking (sum-and-product) method as the DIRECT REVERSE of the expansion just derived — not a new unrelated trick",
      "Recall from 1.5: expanding (x+2)(x+5) gave x²+7x+10, where 7 came from 2+5 (the SUM) and 10 came from 2×5 (the PRODUCT). Factorizing REVERSES this exact process: given x²+7x+10, we need to find the ORIGINAL two numbers whose sum is 7 and product is 10.",
      "*Worked Example (testing MULTIPLE candidate pairs explicitly, exactly like the standard-setting quadratic example — not jumping straight to the answer)",
      "Factorize: x²+7x+10",
      "We need two numbers with product=10 and sum=7. List ALL pairs of factors of 10, and check each pair's sum:",
      "1 and 10: sum=11 (doesn't match 7)",
      "2 and 5: sum=7 ✓ (matches!)",
      "Since 2 and 5 satisfy BOTH conditions (product=10 AND sum=7), these are our numbers.",
      "Result: (x+2)(x+5)",
      "Check by expanding back: confirms x²+7x+10 ✓",
      "*Worked Example (a case with a NEGATIVE middle term and positive last term — testing negative pairs explicitly)",
      "Factorize: x²−8x+15",
      "Need product=15, sum=−8. Since the product is POSITIVE but the sum is NEGATIVE, BOTH numbers must be negative (negative×negative=positive product; negative+negative=negative sum).",
      "Test negative pairs of 15: −1 and −15: sum=−16 (no); −3 and −5: sum=−8 ✓ (matches!)",
      "Result: (x−3)(x−5)",
      "*Worked Example (a case with a NEGATIVE last term — testing why the numbers must have OPPOSITE signs)",
      "Factorize: x²−3x−10",
      "Need product=−10 (NEGATIVE), sum=−3. Since the product is negative, the two numbers must have OPPOSITE signs (one positive, one negative) — this is an important pattern-recognition point to state explicitly.",
      "Test pairs (one positive, one negative) that multiply to −10: 2 and −5: sum=−3 ✓ (matches!)",
      "Result: (x+2)(x−5)",
      "*Practice Questions:",
      "1.7 Difference of Two Squares (Recall/Reinforce)",
      "*Worked Example:",
      "Factorize: x²−49",
      "Recognize both terms as perfect squares: x² (√=x), 49 (√=7)",
      "Result: (x+7)(x−7)",
      "*Practice Questions:",
      "1.8 Algebraic Fractions with Monomial Denominators",
      "*Step 1 — Establish that algebraic fractions follow EXACTLY the same common-denominator rule as numeric fractions from JSS1, with the letter treated the same way a number would be",
      "*Worked Example (same denominator, direct addition):",
      "Simplify: 3/x + 2/x = 5/x (denominators already match, so add numerators directly — identical logic to 3/7+2/7=5/7)",
      "*Worked Example (different denominators, requiring an LCM — using the algebraic LCM method from Topic 1.3):",
      "Simplify: 1/2x + 1/3x",
      "Find LCM of 2x and 3x (numbers: LCM of 2,3=6; letters: both have x¹, so x¹) → LCM=6x",
      "Convert: 1/2x = 3/6x (multiplied top and bottom by 3); 1/3x = 2/6x (multiplied top and bottom by 2)",
      "Add: 3/6x + 2/6x = 5/6x",
      "*Practice Questions:"
    ],
    "checks": [
      "Expand: 4(y+5)",
      "Expand: −2(a−3), showing the sign-flip step explicitly as done in Worked Example 1.",
      "Expand and simplify: 3(x+2) + 2(x+4)",
      "Expand and simplify: 5(m−2) − 3(m+1) — this has TWO things to watch: the −3 distributing across BOTH terms of the second bracket, and correctly combining the results. Show every step.",
      "If x=4, find 3x+7.",
      "If p=2 and q=6, find 4p−q.",
      "If m=−3, find m² (this is the exact misconception case above — work through it yourself, being careful with the substitution parentheses).",
      "If a=−2 and b=3, find a²+b² (apply the same careful-substitution care to BOTH terms).",
      "Find the LCM of 3x and 5x².",
      "Find the HCF of 6a²b and 9ab², showing the number-part and letter-part reasoning separately.",
      "Factorize: 8a + 12a², checking your answer by expanding back.",
      "Factorize: 10xy − 15x",
      "Factorize: 4m²n + 6mn²",
      "Expand: (x+3)(x+4), and describe (in words) what the 4 sections of the area-model diagram would be for this expansion.",
      "Expand: (x−2)(x+6) — note one bracket has a MINUS; describe carefully how this affects two of the four \"areas\" (they become subtracted regions rather than added).",
      "Expand: (2x+1)(x+3)",
      "Factorize: x²+5x+6, testing at least two candidate pairs before confirming your answer (as shown above), even if the first pair you try happens to work.",
      "Factorize: x²−3x−10 (already shown above — now try x²−x−12 yourself, following the same opposite-signs reasoning).",
      "Factorize: x²−8x+15 (already shown — now try x²−9x+20 yourself).",
      "A student factorizes x²+x−6 as (x+3)(x−2) WITHOUT checking. Verify their answer by expanding it back out — is it correct? (This builds the habit of always verifying, which the original standard-setting example emphasized.)",
      "Factorize: x²−121",
      "Factorize: 16x²−9, first confirming both terms ARE perfect squares (what is √16x² and √9?) before applying the pattern.",
      "Simplify: 4/y − 1/y",
      "Simplify: 1/3a + 1/4a, showing the LCM-finding step explicitly.",
      "Simplify: 2/5x − 1/10x"
    ],
    "targets": [
      "Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 2: Simple Linear Equations",
    "sourceFile": "jss2-math-term2.md",
    "steps": [
      "2.1 Balance Method and Collecting Like Terms",
      "*Step 1 — Establish the \"balance scale\" idea EXPLICITLY as a physical analogy, not just an instruction to \"do the same to both sides\"",
      "Picture a balance scale that is perfectly level, representing an equation. Whatever you do to ONE side (add, subtract, multiply, divide by some amount) MUST be done to the OTHER side too, or the scale (equation) tips out of balance (becomes untrue).",
      "*Diagram for Avora's whiteboard:",
      "Draw a simple balance scale (a triangle base with a horizontal bar and a pan on each side). On the left pan, draw \"3x+4\"; on the right pan, draw \"19.\" As the solving steps proceed (subtract 4, then divide by 3), animate BOTH pans changing simultaneously and the scale staying level throughout — reinforcing that operations must apply to both sides together.",
      "*Worked Example (unknowns on BOTH sides — a genuinely new complexity beyond JSS1, explained step by step)",
      "Solve: 5x−2 = 2x+7",
      "Since there are x-terms on both sides, first move them together onto ONE side. Subtract 2x from BOTH sides (balance scale reasoning): 5x−2x−2 = 2x−2x+7 → 3x−2 = 7",
      "Now solve as before: add 2 to both sides: 3x=9",
      "Divide by 3: x=3",
      "Check: substitute back into the ORIGINAL equation (not the simplified one, to catch any earlier errors): 5(3)−2=15−2=13, and 2(3)+7=6+7=13 ✓ both sides match.",
      "*Practice Questions:",
      "2.2 Equations Involving Brackets and Fractions",
      "*Worked Example (brackets — recall the expansion skill from Topic 1.1):",
      "Solve: 3(x+2) = 21",
      "Expand first (recall: outside term multiplies every term inside): 3x+6=21",
      "Solve: 3x=15, x=5",
      "Check: 3(5+2)=3(7)=21 ✓",
      "*Worked Example (a case with brackets on BOTH sides, combining multiple skills):",
      "Solve: 4(x+1) = 2x+14",
      "Expand the left side: 4x+4 = 2x+14",
      "Move x-terms together (subtract 2x from both sides): 2x+4=14",
      "Solve: 2x=10, x=5",
      "Check: 4(5+1)=4(6)=24, and 2(5)+14=10+14=24 ✓",
      "*Worked Example (fractions):",
      "Solve: x/3 + 2 = 7",
      "Subtract 2 from both sides: x/3 = 5",
      "Multiply both sides by 3 (undoing the division): x = 15",
      "*Practice Questions:",
      "2.3 Word Problems",
      "*Worked Example (full translation shown, phrase by phrase, connecting to the translation skill from JSS1):",
      "\"I subtract 3 from a number, multiply the result by 5, then add 9. The final result is 54. Find the number.\"",
      "Translate step by step: \"a number\"→x; \"subtract 3 from a number\"→(x−3); \"multiply the result by 5\"→5(x−3); \"then add 9\"→5(x−3)+9; \"the final result is 54\"→5(x−3)+9=54",
      "Solve: expand first: 5x−15+9=54 → 5x−6=54 → 5x=60 → x=12",
      "Check: 5(12−3)+9 = 5(9)+9 = 45+9=54 ✓",
      "*Practice Questions:"
    ],
    "checks": [
      "Solve: 4x−3 = 13",
      "Solve: 2x+5 = x+12, showing the \"move x-terms together\" step explicitly.",
      "Solve: 7x−4 = 3x+16, and check your answer by substituting into the ORIGINAL equation.",
      "Solve: 2(x−3) = 10",
      "Solve: 4(x+1) = 2x+14 (already shown above — now try 5(x−2) = 3x+4 yourself, showing every step).",
      "Solve: x/4 − 1 = 5",
      "A number is doubled and then 5 is subtracted, giving 17. Find the number.",
      "A rectangle is 8m long and its perimeter is 30m. Find its breadth. (Recall perimeter=2(length+breadth) from JSS1 — set up the full equation before solving: 2(8+b)=30.)"
    ],
    "targets": [
      "Simple Linear Equations (balance method, brackets, fractions, word problems)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 3: Linear Inequalities in One Variable",
    "sourceFile": "jss2-math-term2.md",
    "steps": [
      "3.1 Inequality Symbols and Meaning",
      "*Step 1 — Establish each symbol's meaning explicitly, and contrast an inequality's RANGE-of-answers nature against an equation's single-answer nature",
      "> means \"greater than\" (strictly bigger, not equal); < means \"less than\" (strictly smaller); ≥ means \"greater than OR equal to\"; ≤ means \"less than or equal to.\" Unlike an equation (x=5, exactly one answer), an inequality like x>5 describes an entire RANGE of possible values (5.1, 6, 100, etc. — anything bigger than 5).",
      "3.2 Solving Linear Inequalities",
      "*Step 1 — Establish that solving follows the SAME balance method as equations for addition/subtraction — this part is NOT new",
      "*Worked Example (normal case, no sign flip needed):",
      "Solve: x+3 > 8",
      "Subtract 3 from both sides (same as an equation): x > 5",
      "*Step 2 — Derive WHY multiplying/dividing by a NEGATIVE number flips the inequality sign, using a concrete numerical test, not just stating the rule",
      "Consider the TRUE statement: 2 < 5. Now multiply BOTH sides by −1: we get −2 and −5. Is −2 < −5 still true? Check on a number line: −2 is actually further RIGHT (closer to zero, hence bigger) than −5. So −2 < −5 is FALSE. For the statement to remain TRUE after multiplying by −1, the sign must FLIP: −2 > −5 IS true. This is why multiplying or dividing an inequality by a negative number reverses the inequality sign — it's not arbitrary, it's necessary to keep the statement accurate.",
      "*Worked Example (applying the flip rule):",
      "Solve: −2x > 8",
      "Divide both sides by −2, and FLIP the sign (as just derived): x < −4",
      "(A common error is forgetting to flip the sign — always double check: does dividing/multiplying by a NEGATIVE number happen in this step? If yes, flip.)",
      "*Practice Questions:",
      "3.3 Combining Inequalities (Range of Values)",
      "*Worked Example (full three-part reasoning, treating it as \"do the same thing to ALL THREE parts\"):",
      "Solve: −3 < x+2 < 5",
      "This is really two inequalities combined: −3<x+2 AND x+2<5. Subtract 2 from ALL THREE parts simultaneously (keeping the whole three-part statement balanced): −3−2 < x+2−2 < 5−2 → −5 < x < 3",
      "*Practice Questions:",
      "3.4 Graphical Representation on a Number Line",
      "*Step 1 — Establish the open-vs-closed circle distinction explicitly, connected directly to whether the boundary value is INCLUDED or not",
      "A CLOSED (filled) circle represents ≤ or ≥ — the boundary value IS a valid solution, so we mark it as included. An OPEN circle represents < or > — the boundary value is NOT itself a valid solution (it's excluded), so we mark it as a hollow/open point.",
      "*Diagram for Avora's whiteboard:",
      "Draw a horizontal number line with tick marks. For x>3: place an OPEN circle exactly at 3, and draw a solid arrow extending to the RIGHT (toward larger numbers) starting from that open circle. For x≤3 (contrast case): place a CLOSED (filled-in) circle at 3, with the arrow extending LEFT.",
      "*Practice Questions:",
      "This completes JSS2 Maths, Second Term at full zero-assumption depth, with candidate-pair testing shown explicitly for every quadratic factorization case, and whiteboard diagrams described for the area-model expansion, the balance-scale equation solving, and inequality number-line representation. Continuing next to JSS2 Third Term at this same standard."
    ],
    "checks": [
      "Solve: x−5 ≤ 3",
      "Solve: 3x ≥ 12 (no sign flip needed here — explain why, referencing what number you're dividing by).",
      "Solve: −4x < 20, remembering to flip the sign, and explain WHY using the number-line test from the derivation above.",
      "Solve: 2x+3 > 11",
      "Solve: 1 < x−1 < 6",
      "Solve: −2 ≤ 2x ≤ 10 (this one requires DIVIDING all three parts by 2 — no sign flip needed since 2 is positive).",
      "Represent x > 3 on a number line, explaining your choice of open circle.",
      "Represent −2 ≤ x < 4 on a number line (this has ONE closed circle at −2 and ONE open circle at 4 — explain why they're different)."
    ],
    "targets": [
      "Linear Inequalities in One Variable (solving, sign-flip rule, combined inequalities, number-line representation)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 1: Angles in a Polygon",
    "sourceFile": "jss2-math-term3.md",
    "steps": [
      "1.1 Types of Polygons",
      "*Step 1 — Establish \"polygon\" itself first (a closed shape with straight sides — recall \"side\" and \"vertex\" definitions from JSS1), then classify by two independent properties",
      "*Convex polygons: every interior angle is LESS than 180° (the shape has no \"caving in\" dents — imagine a rubber band stretched around pins in the polygon's vertices; it touches every vertex).",
      "*Concave polygons: at least ONE interior angle is MORE than 180° (a dent exists — the rubber-band-around-pins test would NOT touch every vertex, it would cut across the dent instead).",
      "*Regular polygons: ALL sides equal AND all angles equal (e.g., a square).",
      "*Irregular polygons: sides and/or angles are NOT all equal (e.g., a general rectangle that isn't a square, or a scalene triangle).",
      "*Diagram for Avora's whiteboard:",
      "Draw two pentagons side by side. The first, convex: a standard 5-pointed regular-ish pentagon shape with no dents. The second, concave: the same general pentagon but with ONE vertex pushed INWARD, creating a visible dent — label the reflex angle (the one exceeding 180°) at that dented vertex explicitly.",
      "1.2 Sum of Interior Angles",
      "*Step 1 — Derive the formula by ACTUALLY drawing diagonals and counting triangles, not stating (n−2)×180° upfront",
      "*Diagram for Avora's whiteboard:",
      "Draw a pentagon (5 sides). From ONE vertex, draw diagonals to every OTHER non-adjacent vertex. This splits the pentagon into exactly 3 triangles. Color each triangle a different color, and label each with \"180°\" inside it.",
      "*Step 2 — Count the pattern across MULTIPLE polygons explicitly (not just one example), to make the (n−2) pattern undeniable",
      "Quadrilateral (4 sides): draw ONE diagonal from a single vertex → splits into 2 triangles → sum=2×180°=360°",
      "Pentagon (5 sides): draw diagonals from one vertex → splits into 3 triangles → sum=3×180°=540°",
      "Hexagon (6 sides): draw diagonals from one vertex → splits into 4 triangles → sum=4×180°=720°",
      "Notice the pattern explicitly: number of triangles = (number of sides) − 2, EVERY time. This gives the general formula: Sum of interior angles = (n−2) × 180°, where n is the number of sides.",
      "*Worked Example 1 (applying the formula, then VERIFYING against the direct triangle-counting method for a NEW polygon, to prove the formula isn't just memorized)",
      "Find the sum of interior angles of a hexagon (6 sides) using the formula, then verify by describing the diagonal-splitting method.",
      "Formula: (6−2)×180° = 4×180° = 720°",
      "Verification: from one vertex of a hexagon, diagonals to the 3 non-adjacent vertices create exactly 4 triangles (matching the formula's \"4\" from 6−2) → 4×180°=720° ✓ matches.",
      "*Worked Example 2 (regular polygon — finding ONE interior angle, requiring an extra division step beyond just the sum)",
      "Find each interior angle of a regular pentagon.",
      "Step 1: find the TOTAL sum first: (5−2)×180° = 540°",
      "Step 2: since \"regular\" means ALL angles are equal, divide the total EQUALLY among the 5 angles: 540°÷5 = 108° each",
      "*Worked Example 3 (finding a MISSING angle in an irregular polygon, given the others)",
      "A quadrilateral has three angles of 80°, 95°, and 110°. Find the fourth angle.",
      "Total sum for a quadrilateral: (4−2)×180°=360°",
      "Sum of the three known angles: 80+95+110=285°",
      "Fourth angle = 360−285 = 75°",
      "*Practice Questions:",
      "1.3 Sum of Exterior Angles",
      "*Step 1 — Establish WHY exterior angles always sum to 360° using the \"walking around the boundary\" thought experiment, which works for ANY polygon regardless of the number of sides — an important, somewhat surprising result worth dwelling on",
      "Imagine physically walking along the boundary of a polygon, turning at each corner to continue along the next side. By the time you arrive back at your starting point, facing the exact same direction you started in, you have made ONE complete rotation — 360° total — no matter how many corners (turns) you made along the way. Each of those turns IS the exterior angle at that vertex. This is why the exterior angles of ANY polygon (triangle, decagon, whatever) always sum to exactly 360° — a genuinely different, simpler rule than the interior-angle formula, which DOES depend on the number of sides.",
      "*Worked Example (regular polygon):",
      "Find each exterior angle of a regular decagon (10 sides).",
      "Since the TOTAL is always 360° regardless of shape, and \"regular\" means equal angles: 360°÷10 = 36° each",
      "*Worked Example (REVERSE direction — given the exterior angle, find the number of sides, an important exam-style application)",
      "A regular polygon has exterior angles of 40° each. How many sides does it have?",
      "Since total exterior angles = 360° always, and each one is 40°: number of sides = 360°÷40° = 9 sides",
      "*Practice Questions:"
    ],
    "checks": [
      "Find the sum of interior angles of an octagon (8 sides), and describe how many triangles this corresponds to when split from one vertex.",
      "Find each interior angle of a regular hexagon, showing both the total-sum step and the division step.",
      "A quadrilateral has three angles of 80°, 95°, and 110°. Find the fourth angle (already shown above — now try a pentagon with four known angles of 100°, 110°, 95°, and 120°, finding the fifth).",
      "A regular polygon has exterior angles of 40° each. How many sides does it have? (Shown above — now try one with exterior angles of 24° each.)",
      "Find the sum of exterior angles of ANY pentagon (regular or not), explaining using the \"walking around\" reasoning why the answer does NOT depend on whether the pentagon is regular.",
      "If a regular polygon has an INTERIOR angle of 150°, find its exterior angle first (hint: interior and exterior angles at the same vertex always add to 180°, since they lie on a straight line), then find the number of sides."
    ],
    "targets": [
      "Angles in a Polygon (convex/concave/regular/irregular; sum of interior angles; sum of exterior angles)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 2: Angles of Elevation and Depression",
    "sourceFile": "jss2-math-term3.md",
    "steps": [
      "*Step 1 — Establish the horizontal reference line FIRST and explicitly, since both angle types are measured FROM it, never from the ground or a vertical line directly",
      "*Diagram for Avora's whiteboard:",
      "Draw a person standing on flat ground, and a tall tower some distance away. From the person's eye level, draw a DASHED horizontal line extending toward the tower. Draw a solid line from the person's eye to the TOP of the tower. Shade/label the angle BETWEEN the dashed horizontal line and the solid sight-line — this is the angle of elevation. Explicitly note: the angle is NOT measured from the ground (a common student assumption), but from this horizontal eye-level line.",
      "*Step 2 — Distinguish elevation from depression by VIEWPOINT direction, using a second diagram",
      "*Diagram for Avora's whiteboard (depression):",
      "Draw a person standing at the TOP of a cliff, with a boat far below on the water. Draw a DASHED horizontal line from the person's eye level (extending out over the water, NOT down to the boat). Draw a solid sight-line from the person's eye down to the boat. Shade/label the angle BETWEEN the horizontal dashed line and the solid sight-line, BELOW the horizontal — this is the angle of depression.",
      "*Step 3 — Derive WHY the angle of elevation and angle of depression between the SAME two points are equal, using the parallel-lines/alternate-angles property already established in JSS1",
      "*Diagram for Avora's whiteboard (combined):",
      "Draw BOTH horizontal dashed lines from the earlier two diagrams together (one from the cliff-top person, one from the boat) — since both are \"horizontal,\" these two dashed lines are PARALLEL to each other. The single sight-line connecting the person and the boat acts as a TRANSVERSAL crossing both parallel lines (recall this term from JSS1's angle-pairs topic). The angle of depression (at the top) and the angle of elevation (at the bottom) are ALTERNATE angles formed by this transversal crossing two parallel lines — and alternate angles are always EQUAL (established in JSS1). This is not a coincidence or a separate rule to memorize; it's a direct consequence of the parallel-lines property already learned.",
      "*Worked Example (introductory trigonometric application — full trigonometry is developed further in JSS3, but the SETUP is established here)",
      "A boy standing 20m from the foot of a tower observes the top of the tower at an angle of elevation of 30°. Using the tangent ratio (opposite/adjacent, to be studied fully in JSS3): height/20 = tan(30°), so height = 20×tan(30°) ≈ 20×0.577 ≈ 11.5m",
      "*Practice Questions:"
    ],
    "checks": [
      "Explain, using the parallel-horizontal-lines-and-transversal reasoning above, why the angle of elevation from point A to point B always equals the angle of depression from point B to point A.",
      "A man on top of a building looks down at a car at an angle of depression of 40°. What is the angle of elevation from the car up to the man? Explain your reasoning, not just the number.",
      "Draw (describe in words) the diagram for this situation: a person at ground level looking up at a kite at an angle of elevation of 50°. Label the horizontal reference line, the sight-line, and the angle clearly."
    ],
    "targets": [
      "Angles of Elevation and Depression"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 3: Bearing and Distances",
    "sourceFile": "jss2-math-term3.md",
    "steps": [
      "3.1 Compass Directions",
      "*Step 1 — Establish the four major directions and their exact angular spacing explicitly, using a diagram",
      "*Diagram for Avora's whiteboard:",
      "Draw a compass rose: a vertical line labeled \"N\" (North) at top and \"S\" (South) at bottom; a horizontal line labeled \"E\" (East) at right and \"W\" (West) at left, crossing at a center point. Label the angle between N and E as exactly 90°, reinforcing that these four major directions are evenly spaced. Add the four MINOR directions (NE, SE, SW, NW) as diagonal lines exactly BETWEEN each pair of major directions, each 45° from its neighbors.",
      "3.2 Types of Bearing",
      "*Step 1 — Establish the three-figure bearing system explicitly, including WHY it's preferred (unambiguous, single number, always measured the SAME way — clockwise from North)",
      "A three-figure bearing is the angle measured CLOCKWISE from North to the direction of travel, always written with exactly 3 digits (e.g., \"005°\" not \"5°\") specifically to avoid any ambiguity about how many digits are intended.",
      "*Worked Example 1 (converting an acute-angle bearing like \"N30°E\" to a three-figure bearing, with the reasoning for the conversion shown, not just the answer)",
      "\"N30°E\" means: start facing North, then turn 30° TOWARD the East side.",
      "Since three-figure bearings are measured clockwise from North, and turning toward East IS the clockwise direction from North, this converts DIRECTLY: three-figure bearing = 030°",
      "*Worked Example 2 (a trickier case: \"S40°W,\" which requires reasoning through MULTIPLE quadrants, not a direct copy)",
      "\"S40°W\" means: start facing South, then turn 40° toward the West side.",
      "To find the three-figure (clockwise-from-North) bearing, we must figure out how far clockwise from NORTH this direction actually is. South itself, measured clockwise from North, is 180°. Turning FURTHER toward West from South continues in the SAME clockwise direction (since West is clockwise-further from South, going N→E→S→W). So we ADD the 40°: 180°+40° = 220°",
      "*Diagram for Avora's whiteboard (for Worked Example 2):",
      "Draw the compass rose again. Draw a dashed line for \"due South.\" From that South line, draw a solid arrow rotating 40° further clockwise (toward West). Label the angle from due North (going all the way around clockwise, through East and South, to reach this arrow) as 220°, visually confirming the addition.",
      "3.3 Reciprocal (Back) Bearing",
      "*Step 1 — Derive the \"add or subtract 180°\" rule from the PHYSICAL meaning of \"looking back,\" not as an arbitrary formula",
      "If you are standing at point A facing toward point B along a certain bearing, then someone standing at point B looking BACK toward you at point A is facing the EXACT OPPOSITE direction — a half-turn (180°) different from your original direction.",
      "*Step 2 — Establish the two-case rule (add vs subtract) as simply \"whichever keeps the result within the valid 0°–360° range,\" not as two separate arbitrary rules",
      "If the original bearing is LESS than 180°, adding 180° keeps the result under 360° (valid). If the original bearing is 180° or MORE, adding 180° would push the result over 360° (invalid, since bearings only go up to 360°), so we SUBTRACT 180° instead to bring it back into the valid range.",
      "*Worked Example 1 (bearing under 180°, so we add):",
      "The bearing of B from A is 065°. Find the bearing of A from B.",
      "Since 065°<180°, add 180°: 065°+180°=245°",
      "*Worked Example 2 (bearing over 180°, so we subtract — testing the OTHER case explicitly, not just repeating the first)",
      "The bearing of a town P from Q is 210°. Find the bearing of Q from P.",
      "Since 210°≥180°, subtract 180°: 210°−180°=030°",
      "*Practice Questions:"
    ],
    "checks": [
      "Convert N50°W to a three-figure bearing, reasoning through which quadrant this falls in (similar to Worked Example 2's S40°W reasoning).",
      "Convert S25°E to a three-figure bearing.",
      "The bearing of a town P from Q is 210°. Find the bearing of Q from P (shown above — now try one where the original bearing is 300° from a port to a ship, finding the ship-to-port back bearing).",
      "Explain, using the \"looking back is a half-turn away\" reasoning, why the back-bearing rule involves exactly 180°, and not some other number."
    ],
    "targets": [
      "Bearing and Distances (compass directions, three-figure bearings, back bearings)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 3,
    "title": "Topic 4: Use of ICT in Mathematics",
    "sourceFile": "jss2-math-term3.md",
    "steps": [
      "*Step 1 — Establish this topic's practical purpose: mathematics doesn't only happen on paper — real problem-solving often uses tools, and understanding the LOGIC behind those tools (not just paper methods) matters",
      "*Explanation (flowcharts): A flowchart represents a sequence of steps and DECISIONS as a diagram — useful for describing a calculation process clearly enough that even a computer (or another person) could follow it exactly, with no ambiguity.",
      "*Worked Example (a simple flowchart described in words, since Avora's whiteboard can render this as an actual flow diagram):",
      "Flowchart for \"is a number even or odd?\":",
      "START → INPUT a number → DIVIDE the number by 2 → CHECK: is the remainder 0? → IF YES: output \"even\" → IF NO: output \"odd\" → END",
      "*Diagram for Avora's whiteboard:",
      "Draw this as an actual flowchart: an oval \"START,\" an arrow to a rectangle \"Input a number,\" an arrow to a rectangle \"Divide by 2, find remainder,\" an arrow to a DIAMOND (decision shape) \"Remainder = 0?\", with two arrows leaving the diamond — one labeled \"Yes\" leading to a rectangle \"Output: Even,\" and one labeled \"No\" leading to a rectangle \"Output: Odd\" — both finally leading to an oval \"END.\"",
      "*Practice Questions:",
      "This completes JSS2 Maths — all three terms, fully rebuilt at zero-assumption depth with explicit whiteboard diagrams described throughout (the polygon triangle-splitting, elevation/depression parallel-lines diagram, compass rose, and ICT flowchart). Continuing next to JSS3 Maths, Term 2 at this same standard (Term 1 was completed earlier and will be re-audited against this diagram standard afterward)."
    ],
    "checks": [
      "Write your own flowchart (as a numbered list of steps, including at least one decision point) for determining whether a triangle is equilateral, given its three side lengths.",
      "Describe how you would set up a spreadsheet formula to calculate the total cost of 5 items, each with a different price entered in separate cells."
    ],
    "targets": [
      "Use of ICT in Mathematics (flowcharts, spreadsheet logic)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 1: Whole Numbers",
    "sourceFile": "jss3-math-term1.md",
    "steps": [
      "1.1 Translation of Word Problems into Numerical Expressions",
      "*Worked Example (full phrase-by-phrase translation, recalling the translation skill built in JSS1/JSS2):",
      "\"A man had ₦5000. He spent ₦1250 on food and ₦800 on transport. How much does he have left?\"",
      "Translate: starting amount (5000) MINUS total spent (1250+800): 5000−(1250+800) = 5000−2050 = ₦2950",
      "*Practice Questions:",
      "1.2 Expressions Involving Brackets and Fractions",
      "*Step 1 — Recall BODMAS explicitly, and establish that fractions inside brackets follow the SAME priority as any other bracket content",
      "*Worked Example:",
      "Simplify: ½ + (⅔ − ¼)",
      "Solve inside the bracket FIRST: ⅔−¼ → LCM=12 → 8/12−3/12=5/12",
      "Now add: ½+5/12 → LCM=12 → 6/12+5/12=11/12",
      "*Practice Questions:",
      "1.3 Direct and Inverse Proportion",
      "*Step 1 — Recall the distinction explicitly: direct = both increase together; inverse = one increases as the other decreases — with the REASONING for each, not just the label",
      "*Worked Example (direct):",
      "If 5 pens cost ₦750, how much do 8 pens cost?",
      "Find the cost of ONE pen first (the \"unit rate,\" same method as JSS2's rate work): 750÷5=₦150 per pen",
      "8 pens = 8×150 = ₦1,200",
      "*Worked Example (inverse — with the reasoning for WHY more workers means FEWER days explicitly stated)",
      "8 men can build a wall in 15 days. How long will 12 men take?",
      "More workers means the SAME total amount of work gets shared among more people, so it takes LESS time. The TOTAL \"work\" stays constant: 8 men × 15 days = 120 \"man-days\" of work needed.",
      "With 12 men: 120÷12 = 10 days",
      "*Diagram for Avora's whiteboard:",
      "Draw two simple bar comparisons side by side: one showing \"8 workers × 15 days\" as a rectangle with area representing total work; another showing \"12 workers × ? days\" as a rectangle with the SAME total area (shaded to match), but a taller/shorter shape — visually reinforcing that the PRODUCT stays constant in inverse proportion.",
      "*Practice Questions:",
      "1.4 Compound Interest",
      "*Step 1 — Recall simple interest from JSS2, then establish EXACTLY how compound interest differs, with a year-by-year breakdown (not jumping straight to the formula)",
      "Unlike simple interest (same interest amount every year, based on the ORIGINAL principal only), compound interest is recalculated EACH year based on the GROWING amount (principal PLUS all previously earned interest).",
      "*Worked Example (year-by-year breakdown FIRST, then matched against the formula):",
      "Find the compound interest on ₦20,000 for 2 years at 5% per annum.",
      "Year 1: interest = 5% of 20,000 = ₦1,000. New amount = 20,000+1,000=₦21,000",
      "Year 2: interest = 5% of 21,000 (NOT the original 20,000 — this is the key difference from simple interest) = ₦1,050. New amount = 21,000+1,050=₦22,050",
      "Total compound interest over 2 years = 22,050−20,000 = ₦2,050",
      "*Step 2 — Now show the formula gives the SAME result, confirming it's just a faster way to do the year-by-year process",
      "A = P(1+r/100)ⁿ = 20,000(1+5/100)² = 20,000(1.05)² = 20,000×1.1025 = ₦22,050 ✓ matches the year-by-year calculation exactly.",
      "*Practice Questions:"
    ],
    "checks": [
      "A trader bought 12 bags of rice at ₦8,500 each and sold them at ₦9,200 each. Find the total profit.",
      "The sum of three consecutive numbers is 72. Find the numbers (translate: let the numbers be x, x+1, x+2).",
      "Musa is 4 years older than his sister. If the sum of their ages is 26, find Musa's age.",
      "Simplify: ⅗ × (¼ + ⅓)",
      "Simplify: (2⅓ − 1½) ÷ ⅚",
      "Evaluate: 3 + [2 × (4 − 1)] ÷ 3 (recall BODMAS order: brackets, then multiplication, then division, then addition)",
      "If 6 workers complete a job in 20 days, how many days will 15 workers take?",
      "3 kg of rice costs ₦2,700. Find the cost of 7 kg.",
      "A car travels 240 km using 20 litres of fuel. How far will it travel on 35 litres? (This is direct proportion — explain why, before solving.)",
      "Find the compound interest on ₦50,000 for 3 years at 10% per annum, using the year-by-year method for at least the first 2 years before switching to the formula.",
      "A sum of ₦15,000 amounts to how much after 2 years at 8% compound interest?",
      "A student calculates compound interest the SAME way as simple interest (multiplying the ORIGINAL principal's interest by the number of years). Explain, using the year-by-year breakdown, exactly where this approach goes wrong."
    ],
    "targets": [
      "Whole Numbers (word problems, brackets/fractions, direct/inverse proportion, compound interest)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 2: Rational and Irrational (Non-Rational) Numbers",
    "sourceFile": "jss3-math-term1.md",
    "steps": [
      "(Note: the NERDC scheme document lists this topic as \"rotational and non-rotational numbers\" — this is a well-known transcription error; the correct and universally taught topic is \"rational and irrational numbers,\" confirmed against standard JSS3 textbooks.)*",
      "2.1 Rational Numbers",
      "*Step 1 — Establish the DEFINING test explicitly: can it be written as a fraction a/b of two integers?",
      "A rational number is ANY number expressible as a/b, where a and b are integers and b≠0. This includes whole numbers (5=5/1), fractions (¾), and both terminating decimals (0.25=¼) AND recurring decimals (0.333...=⅓ — an important, sometimes-surprising inclusion).",
      "*Worked Example (showing a recurring decimal IS rational, with the conversion method, since this often surprises students):",
      "Is 0.444... rational? Yes — it can be shown to equal 4/9 exactly (a fraction of two integers), even though its decimal form never terminates.",
      "2.2 Irrational Numbers",
      "*Step 1 — Establish the key TEST for square roots: is the number under the root a PERFECT SQUARE?",
      "*Worked Example (testing MULTIPLE candidates explicitly, not just stating results):",
      "Classify √16, √20, √81, √50.",
      "√16: is 16 a perfect square? Yes (4×4=16) → rational, equals 4 exactly.",
      "√20: is 20 a perfect square? Test nearby squares: 4×4=16, 5×5=25 — 20 falls BETWEEN these, so no whole number squares to 20 → irrational.",
      "√81: is 81 a perfect square? Yes (9×9=81) → rational, equals 9 exactly.",
      "√50: test nearby squares: 7×7=49, 8×8=64 — 50 falls between → irrational.",
      "*Practice Questions:",
      "2.3 Comparing and Ordering",
      "*Worked Example (full decimal-conversion method, every value converted before comparing):",
      "Order √2, 1.5, ⅗, √3 from smallest to largest.",
      "Convert each to a decimal: √2≈1.414, 1.5=1.500, ⅗=0.600, √3≈1.732",
      "Order: 0.600 < 1.414 < 1.500 < 1.732 → ⅗, √2, 1.5, √3",
      "*Practice Questions:"
    ],
    "checks": [
      "Classify as rational or irrational: 0.6, −3, 2.7182818..., 7/9",
      "Express 0.75 and 0.444... as fractions (show your reasoning for at least one).",
      "Classify √16, √20, √81, √50 (shown above — now classify √36, √40, √100, √99 yourself, testing nearby perfect squares for each).",
      "Between which two whole numbers does √30 lie? (Test nearby perfect squares, as shown above.)",
      "Order √5, 2.1, ⅞, √2 from smallest to largest, converting each to a decimal first.",
      "Which is bigger: √10 or 3.2? Show your decimal comparison.",
      "Insert one rational number and one irrational number between 2 and 3, explaining how you know each fits the correct category."
    ],
    "targets": [
      "Rational and Irrational (Non-Rational) Numbers"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 3: Base 2 Numerals (Binary)",
    "sourceFile": "jss3-math-term1.md",
    "steps": [
      "(Full binary foundations — counting, base-10 conversion, addition, subtraction — were established in JSS1. This topic extends to multiplication and division at a slightly higher digit count.)*",
      "3.1 Addition and Subtraction (up to 3-digit, recall and extend)",
      "*Worked Example (3-digit addition with MULTIPLE carries, a slightly harder case than JSS1's introduction):",
      "111₂ + 110₂",
      "Rightmost: 1+0=1 (no carry)",
      "Middle: 1+1=10 → write 0, carry 1",
      "Leftmost: 1+1+1(carry)=11 → write 1, carry 1 into a new column",
      "Result: 1101₂",
      "Check: 111₂=7, 110₂=6, 7+6=13, and 1101₂=(1×8)+(1×4)+(0×2)+(1×1)=8+4+0+1=13 ✓",
      "3.2 Multiplication (2–3 digit)",
      "*Worked Example (a 3-digit by 2-digit case, extending JSS1's 2-digit introduction):",
      "101₂ × 11₂",
      "Multiply 101 by the rightmost digit of 11 (which is 1): 101×1=101",
      "Multiply 101 by the next digit of 11 (which is 1), shifted left one place: 101×1=101, shifted → 1010",
      "Add: 101 + 1010 = 1111₂",
      "Check: 101₂=5, 11₂=3, 5×3=15, and 1111₂=(1×8)+(1×4)+(1×2)+(1×1)=8+4+2+1=15 ✓",
      "3.3 Division (up to 3-digit)",
      "*Worked Example:",
      "1100₂ ÷ 10₂",
      "Convert to check first: 1100₂=12, 10₂=2, 12÷2=6=110₂",
      "Using binary long division (same structure as base-10 long division): 1100÷10 → 110₂",
      "*Practice Questions:"
    ],
    "checks": [
      "Add: 111₂+011₂, showing every carry.",
      "Subtract: 1001₂−0110₂, showing every borrow.",
      "Multiply: 101₂×10₂, showing each partial product.",
      "Divide: 1000₂÷100₂, and check your answer by converting to base ten."
    ],
    "targets": [
      "Base 2 Numerals — Addition, Subtraction, Multiplication, Division (up to 3-digit)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 4: Factorization",
    "sourceFile": "jss3-math-term1.md",
    "steps": [
      "(This topic was already built at full standard, including the standalone bracket-multiplication foundational mini-lesson with candidate-pair testing for quadratics. See the original Deep Teaching Standard JSS3 Term 1 file for the complete Topic 4 content — it already matches the v2 standard and needs no further revision.)*",
      "*Diagram addition for Avora's whiteboard (supplementing the existing content):",
      "For the difference-of-two-squares topic, draw a large square of side \"a,\" with a smaller square of side \"b\" cut out from one corner. Show that the REMAINING L-shaped area (a²−b²) can be cut and rearranged into a rectangle of dimensions (a+b) by (a−b) — a visual, geometric proof of the algebraic identity, complementing the algebraic derivation already in place."
    ],
    "checks": [],
    "targets": [
      "Factorization (grouping, difference of two squares, perfect square trinomials, word problems) — includes the standalone foundational mini-lesson on bracket multiplication"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 1,
    "title": "Topic 5: Simple Equations Involving Fractions",
    "sourceFile": "jss3-math-term1.md",
    "steps": [
      "(This topic was already built at full standard with multiple worked examples including exam-style multi-step word problems. See the original file — it matches the v2 standard.)*",
      "*Diagram addition for Avora's whiteboard (supplementing the existing content):",
      "For word problems like \"a woman shared ₦N among her three children,\" draw a single bar representing the total N, divided into labeled sections (⅓N, ¼N, and the remainder), visually showing how the pieces relate to the whole — reinforcing the algebraic setup before solving.",
      "*Audit note: Topics 4 and 5 of this term were already built to the full Deep Teaching Standard (with candidate-pair testing for quadratics, and multi-step exam-style word problems) in the original JSS3 Term 1 file, and only needed diagram additions rather than a full rebuild. Topics 1–3 have now been upgraded to match, with explicit misconception checks and diagram descriptions added throughout.",
      "This completes the full JSS3 Maths curriculum (Terms 1–3) at the zero-assumption Deep Teaching Standard, matching the standard set across JSS1 and JSS2. All of JSS1–JSS3 Mathematics is now complete.",
      "Next: beginning the full English Studies build (JSS1–JSS3) at this same standard."
    ],
    "checks": [],
    "targets": [
      "Simple Equations Involving Fractions (LCM method, exam-style word problems)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 1: Simultaneous Linear Equations",
    "sourceFile": "jss3-math-term2.md",
    "steps": [
      "1.1 What \"Simultaneous\" Means and Why We Need Two Equations",
      "*Step 1 — Establish the PROBLEM this topic solves, before any method",
      "A single equation like \"x+y=10\" has INFINITELY many solutions (x=1,y=9; x=2,y=8; x=5,y=5; and so on) — we cannot pin down exact values for both x and y from one equation alone. But if we're given a SECOND, independent piece of information about the same x and y (e.g., \"x−y=2\"), together the two equations narrow things down to exactly ONE pair of values that satisfies BOTH simultaneously (hence the name).",
      "1.2 Tables of Values and Graphical Solution",
      "*Step 1 — Establish how a linear equation with two unknowns corresponds to a LINE when graphed, connecting to earlier coordinate/graphing exposure",
      "For an equation like x+y=10, EVERY (x,y) pair satisfying it, when plotted as a point, lies on a single straight line. Building a table of values means choosing a few x-values, calculating the matching y-value from the equation, and plotting those points.",
      "*Worked Example (building a table, full calculation shown for each entry):",
      "For x+y=10: choose x=0 → y=10; x=2 → y=8; x=5 → y=5; x=10 → y=0.",
      "Table:",
      "| x | 0 | 2 | 5 | 10 |",
      "| y | 10 | 8 | 5 | 0 |",
      "*Diagram for Avora's whiteboard:",
      "Draw a set of x-y axes. Plot the 4 points from the table above (0,10), (2,8), (5,5), (10,0), and draw a straight line through them, extending slightly beyond the plotted points. Then, for the SECOND equation (e.g., x−y=2), build a second table (x=0→y=−2; x=2→y=0; x=6→y=4) and plot THIS line on the SAME axes, in a different color. Mark the SINGLE point where the two lines CROSS — label it clearly as the solution, since this is the one (x,y) pair that satisfies BOTH equations simultaneously (it lies on both lines at once).",
      "*Worked Example (reading the solution from the graph, then verifying algebraically):",
      "If the two lines from x+y=10 and x−y=2 cross at the point (6,4), this means x=6, y=4 is the solution.",
      "Verify: 6+4=10 ✓ (satisfies the first equation); 6−4=2 ✓ (satisfies the second equation). Both check out.",
      "*Practice Questions:",
      "1.3 Elimination Method",
      "*Step 1 — Establish elimination's core idea: making one variable's coefficients MATCH (or cancel) by scaling one or both equations, then adding/subtracting to remove that variable entirely",
      "*Worked Example (a case where coefficients ALREADY match, requiring only addition/subtraction — the simplest case first):",
      "Solve: x+y=10 and x−y=2",
      "Notice the y-coefficients are +1 and −1 — ADDING the two equations directly will CANCEL y entirely:",
      "(x+y) + (x−y) = 10+2",
      "2x = 12",
      "x = 6",
      "Substitute x=6 back into EITHER original equation to find y: 6+y=10 → y=4",
      "Check in the OTHER equation (to catch any error): 6−4=2 ✓",
      "*Worked Example (a case requiring SCALING one equation first, since coefficients don't already match — the genuinely new skill)",
      "Solve: 2x+y=11 and x+y=7",
      "The y-coefficients already match (+1 and +1) — but this time, adding won't cancel anything (1+1=2, not 0). Instead, SUBTRACT one equation from the other to cancel the matching y-terms:",
      "(2x+y) − (x+y) = 11−7",
      "2x+y−x−y = 4",
      "x = 4",
      "Substitute back: 4+y=7 → y=3",
      "Check: 2(4)+3=8+3=11 ✓",
      "*Worked Example (a case requiring MULTIPLYING one equation to create matching coefficients — the full elimination method)",
      "Solve: 3x+2y=16 and x+y=6",
      "Neither variable's coefficients match yet. Choose to eliminate y: multiply the SECOND equation by 2 (so its y-coefficient becomes 2, matching the first equation's 2y):",
      "2×(x+y=6) → 2x+2y=12",
      "Now subtract this NEW equation from the first: (3x+2y)−(2x+2y) = 16−12",
      "3x+2y−2x−2y = 4",
      "x = 4",
      "Substitute back into x+y=6: 4+y=6 → y=2",
      "Check in the original first equation: 3(4)+2(2)=12+4=16 ✓",
      "*Practice Questions:",
      "1.4 Substitution Method",
      "*Step 1 — Establish substitution's core idea: solve ONE equation for one variable in terms of the other, then substitute that expression into the SECOND equation",
      "*Worked Example (full method shown, connecting back to the \"substitution\" skill from JSS2, now applied to an EXPRESSION rather than a number):",
      "Solve: y=x+2 and x+y=10",
      "The first equation ALREADY tells us what y equals in terms of x. Substitute this directly into the second equation (replacing y with \"x+2\"):",
      "x+(x+2)=10",
      "2x+2=10",
      "2x=8",
      "x=4",
      "Now find y using the first equation: y=4+2=6",
      "Check in the second equation: 4+6=10 ✓",
      "*Practice Questions:"
    ],
    "checks": [
      "Build a table of values for x+y=8 using x=0,2,4,8, and describe what the graph of this equation would look like.",
      "Explain, in your own words, why the CROSSING POINT of two lines represents the solution to a pair of simultaneous equations (what does \"crossing\" mean about a point belonging to BOTH lines?).",
      "Solve by elimination: x+y=9 and x−y=3",
      "Solve by elimination: 2x+y=13 and x+y=8 (identify which operation, add or subtract, cancels a variable directly).",
      "Solve by elimination: 3x+2y=19 and 2x+2y=16 (this one already has MATCHING y-coefficients without needing to scale — identify this before starting).",
      "Solve by elimination: 4x+3y=25 and x+y=7 (this REQUIRES scaling one equation first — decide which one, and by what factor, before eliminating).",
      "Solve by substitution: y=2x and x+y=12",
      "Solve by substitution: x=y+3 and 2x+y=15"
    ],
    "targets": [
      "Simultaneous Linear Equations (tables of values, graphical solution, elimination, substitution)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 2: Similar Shapes",
    "sourceFile": "jss3-math-term2.md",
    "steps": [
      "2.1 Enlargement and Scale Factor",
      "*Step 1 — Establish \"similar\" shapes as having the SAME shape but possibly different SIZE — with angles staying EQUAL and sides staying in the SAME ratio (proportion) to each other",
      "Two shapes are similar if one is an ENLARGED (or reduced) copy of the other — every angle stays identical, and every corresponding side is scaled by the SAME multiplying factor (the scale factor).",
      "*Diagram for Avora's whiteboard:",
      "Draw two triangles, clearly similar (same shape, different size) — a small one with sides labeled 3cm, 4cm, 5cm, and a larger one, in the same orientation, with corresponding sides labeled 6cm, 8cm, 10cm. Draw dashed lines connecting each matching vertex between the two triangles to visually reinforce which sides correspond to which.",
      "*Worked Example (finding the scale factor, then using it to find a missing side):",
      "Two similar triangles: the smaller has sides 3cm, 4cm, 5cm; the larger has corresponding sides 6cm, 8cm, and an unknown side x (corresponding to the 5cm side).",
      "Find the scale factor by comparing ANY pair of corresponding sides: 6÷3=2 (check with the other pair: 8÷4=2 ✓ consistent, confirming these shapes really are similar and we've matched sides correctly)",
      "Since the scale factor is 2, the unknown side: x = 5×2 = 10cm",
      "*Practice Questions:",
      "2.2 Lengths, Areas, and Volumes of Similar Figures",
      "*Step 1 — Establish, through a WORKED derivation (not just a stated rule), why area scales by the SQUARE of the scale factor, not the scale factor itself — this is a genuinely important and often-confused point",
      "Consider two similar squares: a small one with side 2cm (area=2×2=4cm²) and a larger one with side 6cm (area=6×6=36cm²) — here the LENGTH scale factor is 6÷2=3.",
      "Compare the AREAS: 36÷4=9. Notice: 9 = 3² (the scale factor SQUARED), not just 3. This makes sense because area involves multiplying TWO lengths together (length×width), so BOTH dimensions get scaled by the factor, multiplying the AREA scale by the factor TWICE (i.e., squared).",
      "*Step 2 — Extend the same reasoning to VOLUME, deriving the CUBE relationship",
      "Volume involves THREE dimensions multiplied together (length×width×height). If each dimension scales by factor k, the volume scales by k×k×k=k³ (the scale factor CUBED).",
      "*Worked Example (area, applying the squared relationship):",
      "Two similar shapes have a LENGTH scale factor of 4. If the smaller shape's area is 10cm², find the larger shape's area.",
      "Area scale factor = 4² = 16",
      "Larger area = 10×16 = 160cm²",
      "*Worked Example (volume, applying the cubed relationship, and explicitly flagging the common error of using the LENGTH scale factor directly)",
      "Two similar solids have a length scale factor of 3. If the smaller solid's volume is 8cm³, find the larger solid's volume.",
      "A common WRONG approach: simply multiplying by 3 (using the length scale factor directly), giving 8×3=24cm³ — INCORRECT, because volume needs the CUBED scale factor, not the plain one.",
      "CORRECT: Volume scale factor = 3³=27. Larger volume = 8×27 = 216cm³",
      "*Practice Questions:"
    ],
    "checks": [
      "Two similar rectangles: the smaller is 4cm by 6cm, the larger is 10cm by 15cm. Find the scale factor, and verify it's consistent using BOTH pairs of corresponding sides.",
      "A similar pair of triangles has a scale factor of 3. If the smaller triangle's sides are 2cm, 5cm, and 6cm, find the larger triangle's sides.",
      "Two similar shapes have a length scale factor of 5. If the smaller shape's area is 6cm², find the larger shape's area.",
      "Two similar solids have a length scale factor of 2. If the smaller solid's volume is 12cm³, find the larger solid's volume, being careful to CUBE the scale factor (not just multiply directly, as shown in the misconception example above).",
      "Two similar cylinders have volumes of 8cm³ and 64cm³. Find the LENGTH scale factor between them (hint: this is the REVERSE direction — find what number, when CUBED, gives 64÷8=8)."
    ],
    "targets": [
      "Similar Shapes (enlargement, scale factor, area/volume scaling — squared/cubed)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 3: Trigonometry",
    "sourceFile": "jss3-math-term2.md",
    "steps": [
      "3.1 Sine, Cosine, and Tangent of an Acute Angle",
      "*Step 1 — Establish the right-angled triangle's THREE side names explicitly (hypotenuse, opposite, adjacent) BEFORE introducing any ratio, since misidentifying sides is the most common source of error in this entire topic",
      "*Diagram for Avora's whiteboard:",
      "Draw a right-angled triangle with the right angle marked at the bottom-right corner. Label the LONGEST side (opposite the right angle) as the hypotenuse — always the same, regardless of which acute angle we're focusing on. Now mark ONE of the acute angles (say, the bottom-left one) with an arc, labeled θ (theta). Relative to THIS angle θ: the side directly across from it (NOT touching the angle) is the opposite; the remaining side (touching angle θ, but NOT the hypotenuse) is the adjacent.",
      "*Step 2 — Establish explicitly that \"opposite\" and \"adjacent\" DEPEND on WHICH angle you're focused on — if you focus on the OTHER acute angle instead, the same two sides SWAP roles — this is a genuine, important misconception to address directly",
      "If we instead focus on the OTHER acute angle (top one) in the SAME triangle, the side that was \"opposite\" to θ is now the \"adjacent\" to this new angle, and vice versa. Only the hypotenuse NEVER changes, because it's defined by the right angle, not by which acute angle you're considering.",
      "*Step 3 — Introduce the three ratios, with a memory aid, but ALSO explain what they actually represent (a relationship, not just letters to memorize)",
      "For an angle θ in a right triangle:",
      "sin θ = opposite/hypotenuse",
      "cos θ = adjacent/hypotenuse",
      "tan θ = opposite/adjacent",
      "A common memory aid is \"SOH-CAH-TOA\" (Sine=Opposite/Hypotenuse, Cosine=Adjacent/Hypotenuse, Tangent=Opposite/Adjacent) — but the memory aid is only useful ONCE the side names (opposite, adjacent, hypotenuse) are correctly identified for the SPECIFIC angle in question, as established in Step 2.",
      "*Worked Example 1 (finding a ratio value, given side lengths):",
      "A right triangle has hypotenuse=10cm, opposite (to angle θ)=6cm, adjacent=8cm.",
      "sin θ = 6/10 = 0.6",
      "cos θ = 8/10 = 0.8",
      "tan θ = 6/8 = 0.75",
      "*Worked Example 2 (finding a MISSING side, given an angle and one side — the practical application)",
      "A ladder leans against a wall, making a 60° angle with the ground. The ladder (hypotenuse) is 5m long. Find the height it reaches up the wall.",
      "Identify sides relative to the 60° angle: the height up the wall is OPPOSITE the 60° angle (it's across from it, not touching it); the ladder itself is the hypotenuse.",
      "Since we have opposite and hypotenuse, use sine: sin(60°) = height/5",
      "height = 5×sin(60°) = 5×0.866 ≈ 4.33m",
      "*Worked Example 3 (a case testing correct side identification when the triangle is drawn in an unfamiliar orientation — an important robustness check)",
      "A right triangle is drawn with the right angle at the TOP-left corner (not bottom-right as in earlier diagrams). The angle of interest, θ, is at the bottom-right corner. The side connecting the right-angle corner to θ's corner is 8cm; the side directly across from θ is 6cm; the longest side (across from the right angle) is 10cm.",
      "Regardless of ORIENTATION on the page, the DEFINITIONS still apply based on their relationship to θ: the 10cm side (across from the right angle) is ALWAYS the hypotenuse; the 6cm side (across from θ) is the opposite; the 8cm side (touching θ, not the hypotenuse) is the adjacent. Orientation on paper never changes these relationships.",
      "*Practice Questions:"
    ],
    "checks": [
      "A right triangle has hypotenuse=13cm, opposite (to angle θ)=5cm, adjacent=12cm. Find sin θ, cos θ, and tan θ.",
      "A ladder leans against a wall at an angle of 50° to the ground, and the ladder is 6m long. Find the height it reaches up the wall (identify opposite/hypotenuse first, before choosing which ratio to use).",
      "A right triangle has an adjacent side of 9cm and an angle θ of 40°. Find the length of the hypotenuse (identify which ratio connects adjacent and hypotenuse — cosine — before solving: cos(40°)=9/hypotenuse).",
      "Explain, using the \"roles swap\" idea from Step 2, why the SAME two non-hypotenuse sides can be described as \"opposite\" in one situation and \"adjacent\" in another, depending on which acute angle is being focused on."
    ],
    "targets": [
      "Trigonometry (sine, cosine, tangent of an acute angle; applications)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 4: Area of Plane Figures",
    "sourceFile": "jss3-math-term2.md",
    "steps": [
      "(Rectangle and triangle area were derived in JSS1. This topic extends to parallelograms, trapeziums, and circles.)*",
      "4.1 Area of a Parallelogram",
      "*Step 1 — Derive the formula using a \"cut and rearrange\" argument, not stating base×height directly",
      "*Diagram for Avora's whiteboard:",
      "Draw a parallelogram (a slanted four-sided shape with two pairs of parallel sides). Draw a vertical dashed line from the top-left vertex straight down to the base, creating a right-angled triangle on the LEFT edge of the shape. Now show this triangle being \"cut off\" and MOVED to the right side of the parallelogram, where it fits perfectly to complete a RECTANGLE with the same base and height as the original parallelogram. Since we only moved a piece (didn't add or remove any area), the parallelogram's area MUST equal this rectangle's area: base×height.",
      "*Worked Example:",
      "A parallelogram has base=10cm, height=6cm (the PERPENDICULAR height, not a slanted side — recall this exact same caution from JSS1's triangle area work).",
      "Area = 10×6 = 60cm²",
      "*Practice Questions:",
      "4.2 Area of a Trapezium",
      "*Step 1 — Derive the formula by combining TWO copies of the trapezium into a parallelogram, a genuinely elegant derivation worth showing fully",
      "*Diagram for Avora's whiteboard:",
      "Draw a trapezium (one pair of parallel sides, of DIFFERENT lengths — label them a and b — with height h between them). Now draw a SECOND, upside-down copy of the SAME trapezium attached to the first along one of the non-parallel sides, forming a parallelogram. This new parallelogram has a base equal to (a+b) — the two different parallel sides of the trapezium, now placed end-to-end — and the SAME height h.",
      "Area of this parallelogram = base×height = (a+b)×h",
      "But this parallelogram is made of TWO copies of our original trapezium, so ONE trapezium's area is HALF of this: Area of trapezium = ½×(a+b)×h",
      "*Worked Example:",
      "A trapezium has parallel sides 8cm and 12cm, with a height of 5cm between them.",
      "Area = ½×(8+12)×5 = ½×20×5 = ½×100 = 50cm²",
      "*Practice Questions:",
      "4.3 Area of a Circle",
      "*Step 1 — Establish π (pi) as a special, fixed number (approximately 3.14, or 22/7) representing the relationship between a circle's circumference and its diameter — established as a fact discovered through measurement across many circles, not something to derive from scratch at this level",
      "*Step 2 — State the area formula and demonstrate it with a worked example, since the full derivation (using calculus-level reasoning) is beyond this level, but VERIFY it makes reasonable sense",
      "Area of a circle = π×r², where r is the radius (distance from center to edge).",
      "*Worked Example:",
      "A circle has radius 7cm. Find its area (using π≈22/7, which conveniently simplifies since our radius is a multiple of 7).",
      "Area = 22/7 × 7² = 22/7 × 49 = 22×7 = 154cm²",
      "*Worked Example (using π≈3.14, for a radius NOT conveniently divisible by 7):",
      "A circle has radius 5cm. Find its area.",
      "Area = 3.14 × 5² = 3.14×25 = 78.5cm²",
      "*Practice Questions:"
    ],
    "checks": [
      "Find the area of a parallelogram with base=12cm and height=7cm.",
      "A parallelogram has a slanted side of 9cm, a base of 8cm, and a perpendicular height of 5cm. Find its area, being careful to use the correct measurement (recall the misconception check from JSS1's triangle work — the SAME caution applies here).",
      "Find the area of a trapezium with parallel sides 6cm and 10cm, and height 4cm.",
      "A trapezium-shaped garden has parallel sides of 15m and 25m, with a perpendicular distance of 8m between them. Find its area.",
      "Find the area of a circle with radius 14cm (use π≈22/7, since 14 is a multiple of 7).",
      "Find the area of a circle with radius 10cm (use π≈3.14).",
      "A circle has a DIAMETER of 20cm. Find its area (careful: the formula needs the RADIUS, which is HALF the diameter — this is a common point where students plug in the wrong value)."
    ],
    "targets": [
      "Area of Plane Figures (parallelogram, trapezium, circle)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 5: Construction",
    "sourceFile": "jss3-math-term2.md",
    "steps": [
      "(Basic construction principles — why ruler/compass guarantee exactness — were established in JSS1. This extends to new specific angles.)*",
      "5.1 Construction of 45° and 30° Angles",
      "*Step 1 — Derive 45° by BISECTING the already-known 90° construction (recall bisection method from JSS1)",
      "Since 90° was constructed in JSS1 by bisecting a straight 180° angle, we can go FURTHER: bisecting that 90° angle (using the same compass-bisection method) gives 90°÷2 = 45°.",
      "*Step 2 — Derive 30° by BISECTING the already-known 60° construction",
      "Recall from JSS1: 60° was constructed using an equilateral triangle. Bisecting THIS 60° angle gives 60°÷2 = 30°.",
      "*Practice Questions:",
      "5.2 Copying a Given Angle",
      "*Step 1 — Establish the METHOD and the geometric reasoning for why it produces an EXACT copy, not an estimate",
      "Method: draw an arc across BOTH sides of the original angle, from its vertex, creating two intersection points. WITHOUT changing the compass width, draw a similar arc from the vertex of a NEW line (where you want the copy). Then, measure the distance BETWEEN the two intersection points on the ORIGINAL angle using the compass, and transfer that EXACT distance to mark the corresponding point on the NEW arc. Connecting the new vertex to this new point recreates the identical angle.",
      "*Why this works: All three points involved (the vertex and the two arc-intersection points) form a TRIANGLE with sides fixed by the compass widths used. Since the NEW triangle uses the EXACT SAME compass widths for all corresponding sides, the two triangles are IDENTICAL in shape (this uses a geometric fact: a triangle's shape is completely determined once all three of its side lengths are fixed) — meaning the angle at the vertex must also be identical.",
      "*Practice Questions:"
    ],
    "checks": [
      "Describe, step by step, how to construct a 45° angle, referencing the 90°-bisection reasoning.",
      "Describe how to construct a 30° angle, referencing the 60°-bisection reasoning.",
      "Using ONLY the angles you can construct with a ruler and compass so far (90°, 60°, 45°, 30°), describe how you could construct a 15° angle.",
      "Describe, step by step, how to copy a given angle using only a ruler and compass.",
      "Explain, using the \"triangle with fixed side lengths\" reasoning, why this method guarantees an EXACT copy rather than an approximate one."
    ],
    "targets": [
      "Construction (45°, 30° angles; copying a given angle)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 6: Measures of Central Tendency",
    "sourceFile": "jss3-math-term2.md",
    "steps": [
      "(Mean, median, mode, and range for simple data were introduced in JSS1/JSS2. This extends to GROUPED data, a genuinely new skill.)*",
      "6.1 Mean, Median, Mode of Grouped Data",
      "*Step 1 — Establish WHY grouped data needs a different approach: individual values are no longer known exactly, only which RANGE (class interval) they fall into",
      "When data is grouped into intervals (e.g., \"10–19,\" \"20–29\"), we no longer know the EXACT value of each data point — only its interval. To estimate the mean, we ASSUME each value in an interval is represented by that interval's MIDPOINT (the middle value of the range).",
      "*Worked Example (finding the mean of grouped data, full table method shown):",
      "| Class Interval | Frequency (f) | Midpoint (x) | f×x |",
      "|---|---|---|---|",
      "| 10–19 | 3 | 14.5 | 43.5 |",
      "| 20–29 | 5 | 24.5 | 122.5 |",
      "| 30–39 | 2 | 34.5 | 69 |",
      "Total frequency (Σf) = 3+5+2 = 10",
      "Total f×x (Σfx) = 43.5+122.5+69 = 235",
      "Estimated mean = Σfx ÷ Σf = 235÷10 = 23.5",
      "*Step 2 — Explain WHY the midpoint is used (a reasonable ASSUMPTION, not an exact fact) — an important honesty point about grouped-data estimates",
      "Since we don't know the exact values within \"10–19\" (they could be spread anywhere from 10 to 19), using the MIDPOINT (14.5) is the most REASONABLE single estimate for the \"typical\" value in that group — but the resulting mean is only an ESTIMATE, not an exact calculation, precisely because of this assumption.",
      "*Practice Questions:"
    ],
    "checks": [
      "Given class intervals 0–9 (frequency 4), 10–19 (frequency 6), 20–29 (frequency 5), find the midpoint of each interval, then calculate the estimated mean.",
      "Explain, in your own words, why the mean of grouped data is called an \"estimate\" rather than an exact value."
    ],
    "targets": [
      "Measures of Central Tendency (mean/median/mode of grouped data)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 2,
    "title": "Topic 7: Data Presentation — Pie Charts",
    "sourceFile": "jss3-math-term2.md",
    "steps": [
      "*Step 1 — Establish what a pie chart represents: proportions of a WHOLE, shown as slices of a circle, where each slice's ANGLE corresponds to its share of the total 360°",
      "*Step 2 — Derive the angle-calculation method explicitly: each category's share of the data becomes the SAME share of the full 360° circle",
      "*Worked Example (full calculation for every category, not just one):",
      "A survey of 40 students' favorite subjects: Maths=16, English=10, Science=8, Others=6.",
      "For EACH category, calculate its angle: (category's count ÷ total count) × 360°",
      "Maths: (16/40)×360° = 144°",
      "English: (10/40)×360° = 90°",
      "Science: (8/40)×360° = 72°",
      "Others: (6/40)×360° = 54°",
      "Check: ALL angles must sum to exactly 360° (an essential verification step): 144+90+72+54 = 360° ✓",
      "*Diagram for Avora's whiteboard:",
      "Draw a full circle. Starting from the top (12 o'clock position), mark off a 144° slice (labeled \"Maths\"), then continuing clockwise, a 90° slice (\"English\"), then 72° (\"Science\"), then the remaining 54° (\"Others\") — completing the full circle back to the starting point.",
      "*Practice Questions:",
      "This completes JSS3 Maths, Second Term at full zero-assumption depth, with explicit whiteboard diagrams for the simultaneous-equations graph, similar-shapes scale diagrams, the trigonometry side-labeling (including the orientation-independence check), parallelogram/trapezium area derivations, and the pie chart. Continuing next to JSS3 Third Term at this same standard."
    ],
    "checks": [
      "A survey of 60 people's favorite fruit: Mango=24, Orange=18, Banana=12, Others=6. Calculate the angle for EACH category, and verify they sum to 360°.",
      "A pie chart slice representing \"Football\" takes up 90° of the circle. If the total number of people surveyed was 80, how many people chose Football? (This is the REVERSE direction — find what FRACTION of the circle 90° represents, then apply that fraction to the total.)"
    ],
    "targets": [
      "Data Presentation — Pie Charts"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 3,
    "title": "Part 1: Core Formula & Method Reference (Recall, Not Re-derivation)",
    "sourceFile": "jss3-math-term3.md",
    "steps": [
      "Avora should present each of these as a brief RECALL — \"remember why this works\" — linking back to the term/topic where it was first derived, not re-teaching from scratch. This keeps revision efficient while still grounded in understanding, not blind memorization.*",
      "| Area | Key Formula/Method | Originally Derived In |",
      "|---|---|---|",
      "| LCM/HCF | Prime factorization: highest/lowest shared powers | JSS1 T1 |",
      "| Percentage change | (change ÷ ORIGINAL value) × 100 | JSS2 T1 |",
      "| Simple Interest | I = (P×R×T)/100 | JSS2 T1 |",
      "| Compound Interest | A = P(1+r/100)ⁿ | JSS3 T1 |",
      "| Difference of Two Squares | a²−b² = (a+b)(a−b) | JSS1/JSS3 T1 |",
      "| Perfect Square Trinomial | a²±2ab+b² = (a±b)² | JSS3 T1 |",
      "| Quadratic Factorization | Find two numbers: sum=b, product=a×c | JSS2 T2 |",
      "| Linear Inequality sign flip | Flip when multiplying/dividing by a negative | JSS2 T2 |",
      "| Sum of Interior Angles (polygon) | (n−2)×180° | JSS2 T3 |",
      "| Sum of Exterior Angles (polygon) | Always 360° | JSS2 T3 |",
      "| Bearing (back bearing) | ±180° depending on original size | JSS2 T3 |",
      "| Trigonometric Ratios | SOH-CAH-TOA (relative to angle θ) | JSS3 T2 |",
      "| Similar Shapes — Area scale | (length scale factor)² | JSS3 T2 |",
      "| Similar Shapes — Volume scale | (length scale factor)³ | JSS3 T2 |",
      "| Area of Triangle | ½×base×height (perpendicular height only) | JSS1 T3 |",
      "| Area of Parallelogram | base×height | JSS3 T2 |",
      "| Area of Trapezium | ½×(a+b)×h | JSS3 T2 |",
      "| Area of Circle | π×r² | JSS3 T2 |",
      "| Volume of Cuboid | length×width×height | JSS1 T3 |",
      "| Mean of Grouped Data | Σfx ÷ Σf (using interval midpoints) | JSS3 T2 |",
      "| Pie Chart angle | (category count ÷ total) × 360° | JSS3 T2 |"
    ],
    "checks": [],
    "targets": [
      "BECE Revision: formula/method reference synthesis; exam technique guidance; full mixed-topic mock practice (objective + theory) with worked solutions"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 3,
    "title": "Part 2: Exam Technique Guidance",
    "sourceFile": "jss3-math-term3.md",
    "steps": [
      "*Step 1 — Establish WHY exam technique matters as much as raw knowledge, with concrete reasoning",
      "Two students can know the SAME mathematics but score very differently in an exam if one manages time poorly, misreads a question, or fails to show working (which often earns partial credit even with a wrong final answer). BECE grading typically awards marks for correct METHOD/working, not only the final answer.",
      "*Key habits Avora should reinforce throughout mock practice:",
      "1. Always show working, even for \"easy\" questions — a correct method with a small arithmetic slip often earns more marks than a bare final answer.",
      "2. Underline or box the final answer — makes it clear to an examiner (and to Avora's marking system) exactly what is being submitted as the answer.",
      "3. Check units — an area answer without \"cm²\" or a bearing without \"°\" can lose marks even if the number is correct.",
      "4. Re-read the question after solving — confirm you answered what was ACTUALLY asked (e.g., the question asked for the BREADTH, but you solved for the perimeter along the way and stopped there).",
      "5. Time allocation — spend proportionally more time on questions worth more marks; don't let one difficult question consume time needed for several easier ones."
    ],
    "checks": [],
    "targets": [
      "BECE Revision: formula/method reference synthesis; exam technique guidance; full mixed-topic mock practice (objective + theory) with worked solutions"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "Mathematics",
    "term": 3,
    "title": "Part 3: Mixed-Topic Mock Practice (BECE-Style, Full Worked Solutions)",
    "sourceFile": "jss3-math-term3.md",
    "steps": [
      "Format: each question is presented as it would appear on BECE. The student attempts it and submits a final answer (per the Answer→Mark→Guide loop); Avora holds the full solution below to check against and to guide re-attempts.*",
      "*Section A — Objective-Style Questions",
      "*Section B — Theory-Style Questions (Full Working Required)",
      "*Question 1:",
      "A trader bought goods for ₦45,000 and sold them for ₦54,000. Find the percentage profit.",
      "*Question 2:",
      "Solve the simultaneous equations: 2x+y=13 and x−y=2",
      "*Question 3:",
      "A ladder 8m long leans against a wall, making an angle of 55° with the ground. Find the height it reaches up the wall, correct to 2 decimal places.",
      "*Question 4:",
      "A regular polygon has an exterior angle of 24°. Find the number of sides, then find each interior angle.",
      "*Question 5:",
      "The cost of an article is reduced by 20% to ₦16,000. Find the original cost.",
      "*Question 6:",
      "Two similar cylinders have radii 3cm and 9cm. If the smaller cylinder's volume is 54cm³, find the larger cylinder's volume.",
      "*Question 7:",
      "Find the area of a trapezium with parallel sides 9cm and 15cm, and height 6cm.",
      "*Question 8 (Word Problem — Simultaneous Equations, testing full translation skill):",
      "The sum of two numbers is 24, and their difference is 6. Find the two numbers.",
      "Check: 15+9=24 ✓, 15−9=6 ✓",
      "*Section C — Guided Self-Practice (student attempts fully, Avora checks the final answer, and re-guides only the specific step where an error occurs)",
      "This completes JSS3 Maths — all three terms, and the full JSS1–JSS3 Mathematics curriculum is now built at the zero-assumption Deep Teaching Standard. Next: re-auditing JSS3 Term 1 to bring it up to the diagram/misconception-flagging standard used from Term 2 onward, then beginning the full English Studies build (JSS1–JSS3)."
    ],
    "checks": [
      "Simplify: 3/x + 2/x",
      "Find the LCM of 15 and 20.",
      "Evaluate: (−6)×(−3)",
      "Factorize: x²−16",
      "Find the sum of interior angles of a hexagon.",
      "Convert 0.00056 to standard form.",
      "A trader bought goods for ₦45,000 and sold them for ₦54,000. Find the percentage profit.",
      "Solve the simultaneous equations: 2x+y=13 and x−y=2",
      "A ladder 8m long leans against a wall, making an angle of 55° with the ground. Find the height it reaches up the wall, correct to 2 decimal places.",
      "A regular polygon has an exterior angle of 24°. Find the number of sides, then find each interior angle.",
      "The cost of an article is reduced by 20% to ₦16,000. Find the original cost.",
      "Two similar cylinders have radii 3cm and 9cm. If the smaller cylinder's volume is 54cm³, find the larger cylinder's volume.",
      "Find the area of a trapezium with parallel sides 9cm and 15cm, and height 6cm.",
      "The sum of two numbers is 24, and their difference is 6. Find the two numbers.",
      "Find the compound interest on ₦30,000 for 2 years at 10% per annum.",
      "Factorize: x²+2x−15",
      "A bearing of a point B from A is 128°. Find the bearing of A from B.",
      "Find the volume of a cuboid 7cm×4cm×5cm.",
      "A pie chart shows a category with 45° representing 20 people out of a total survey. Find the total number of people surveyed.",
      "Solve by elimination: 3x+y=14 and x+y=6",
      "A right triangle has adjacent=15cm and angle θ=35°. Find the hypotenuse.",
      "Simplify: 4(2x−1) − 3(x+2)"
    ],
    "targets": [
      "BECE Revision: formula/method reference synthesis; exam technique guidance; full mixed-topic mock practice (objective + theory) with worked solutions"
    ],
    "sourceSolutions": [
      "Same denominator → (3+2)/x = 5/x",
      "15=3×5, 20=2²×5. LCM=2²×3×5=60",
      "Negative×negative=positive → 18",
      "Both terms are perfect squares (x², 4²) → (x+4)(x−4)",
      "(6−2)×180°=720°",
      "Move decimal right 4 places → 5.6×10⁻⁴",
      "Profit = 54,000−45,000 = ₦9,000 Percentage profit = (profit ÷ ORIGINAL cost) × 100 = (9,000/45,000)×100 = 20%",
      "Add the two equations (y-terms are +1 and −1, cancel on addition): (2x+y)+(x−y)=13+2 → 3x=15 → x=5 Substitute into x−y=2: 5−y=2 → y=3 Check in first equation: 2(5)+3=10+3=13 ✓",
      "Identify sides: height=opposite (to the 55° angle), ladder=hypotenuse sin(55°) = height/8 height = 8×sin(55°) = 8×0.8192 ≈ 6.55m",
      "Number of sides = 360°÷24° = 15 Interior angle = 180°−24° = 156° (since interior and exterior angles at a vertex are supplementary, lying on a straight line) Alternative check via the interior-angle formula: sum=(15−2)×180°=2340°; each angle=2340°÷15=156° ✓ matches.",
      "A common error: calculating 20% of 16,000 and adding it back (this is WRONG, because 16,000 is already the REDUCED amount, representing 80% of the original, not 100%). CORRECT: 16,000 represents (100%−20%)=80% of the original cost. Let original cost = x: 80% of x = 16,000 → 0.8x=16,000 → x=16,000÷0.8 = ₦20,000 Check: 20% of 20,000=4,000; 20,000−4,000=16,000 ✓",
      "Length scale factor = 9÷3 = 3 Volume scale factor = 3³ = 27 Larger volume = 54×27 = 1,458cm³",
      "Area = ½×(9+15)×6 = ½×24×6 = ½×144 = 72cm²",
      "Translate: let the numbers be x and y. x+y=24, x−y=6 Add: 2x=30 → x=15 Substitute: 15+y=24 → y=9 Check: 15+9=24 ✓, 15−9=6 ✓",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 2,
    "title": "1. Single term × bracket",
    "sourceFile": "math-foundation-multiplying-two-brackets.md",
    "steps": [
      "Start from the distributive law with numbers:",
      "3(4+5)=3×4+3×5=27.",
      "Then transfer the same meaning to algebra:",
      "2(x+y)=2x+2y.",
      "The outside factor multiplies every term inside the bracket."
    ],
    "checks": [],
    "targets": [
      "Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 2,
    "title": "2. Bracket × bracket",
    "sourceFile": "math-foundation-multiplying-two-brackets.md",
    "steps": [
      "For (a+b)(c+d), first treat the second bracket as one whole quantity:",
      "a(c+d)+b(c+d).",
      "Then distribute each term:",
      "ac+ad+bc+bd.",
      "FOIL may be mentioned only as a memory label after the reasoning is understood; it is not the underlying rule.",
      "Worked example:",
      "(x+2)(x+5)",
      "= x(x+5)+2(x+5)",
      "= x²+5x+2x+10",
      "= x²+7x+10.",
      "AVORA must explain why x×x=x² and why 5x and 2x are like terms before combining them."
    ],
    "checks": [],
    "targets": [
      "Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 2,
    "title": "3. Difference of two squares connection",
    "sourceFile": "math-foundation-multiplying-two-brackets.md",
    "steps": [
      "(a+b)(a-b)",
      "= a(a-b)+b(a-b)",
      "= a²-ab+ab-b²",
      "= a²-b².",
      "Explain that -ab and +ab sum to zero because they are additive opposites; do not use unexplained cancellation language."
    ],
    "checks": [],
    "targets": [
      "Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "Mathematics",
    "term": 2,
    "title": "Practice contract",
    "sourceFile": "math-foundation-multiplying-two-brackets.md",
    "steps": [
      "The learner attempts each exercise before AVORA teaches it. AVORA checks the learner's actual attempt, preserves correct work, identifies the first gap, and gives one next step. Full teaching is unlocked after the attempt and helped retries do not count as independent mastery evidence."
    ],
    "checks": [],
    "targets": [
      "Algebraic Expressions: expansion/simplification, substitution, LCM/HCF of algebraic terms, factorization (common factor), expansion to quadratics, factorization of simple quadratics, difference of two squares, algebraic fractions"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Foundational Mini-Lesson: Units of Measurement",
    "sourceFile": "math-foundation-units.md",
    "steps": [
      "This lesson is taught early (alongside or just before JSS1 Whole Numbers) and referenced by any later topic that involves length, mass, capacity, or time — nothing in later lessons should assume this knowledge without it having been taught here first.*"
    ],
    "checks": [],
    "targets": [
      "Units of Measurement (length, mass, capacity, time conversions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Part 1: Why We Need Units at All",
    "sourceFile": "math-foundation-units.md",
    "steps": [
      "*Step 1 — Establish the problem a \"number alone\" creates",
      "If someone says \"the rope is 5 long,\" that sentence is incomplete — 5 what? Five centimetres is tiny; five kilometres is a whole journey. A number by itself doesn't describe a real-world quantity; it needs a unit attached to say what is being counted or measured. This is why every measurement has two parts: a number AND a unit (e.g., \"5 metres,\" not just \"5\")."
    ],
    "checks": [],
    "targets": [
      "Units of Measurement (length, mass, capacity, time conversions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Part 2: Units of Length",
    "sourceFile": "math-foundation-units.md",
    "steps": [
      "*Step 1 — Establish the base unit and build outward from it, showing WHY each conversion factor is what it is",
      "The standard base unit of length is the metre (m). Other units are defined as fixed multiples or fractions of the metre:",
      "1 centimetre (cm) = 1/100 of a metre → therefore 100 cm = 1 m",
      "1 millimetre (mm) = 1/1000 of a metre → therefore 1000 mm = 1 m, and since 100cm=1m, it follows that 10mm = 1cm (because 1000mm÷100 groups = 10mm per group)",
      "1 kilometre (km) = 1000 metres → therefore 1000 m = 1 km",
      "*Step 2 — Establish the conversion METHOD, not just the facts, so students can convert ANY amount, not just memorized examples",
      "To convert from a SMALLER unit to a LARGER unit (e.g., cm to m), we DIVIDE by the conversion number, because it takes many small units to make one large unit, so the count shrinks.",
      "To convert from a LARGER unit to a SMALLER unit (e.g., m to cm), we MULTIPLY, because each large unit breaks into many small ones, so the count grows.",
      "*Worked Example 1 (small to large — divide):",
      "Convert 350 cm to metres.",
      "Since 100cm=1m, divide by 100: 350÷100 = 3.5m",
      "*Worked Example 2 (large to small — multiply):",
      "Convert 2.5 km to metres.",
      "Since 1km=1000m, multiply by 1000: 2.5×1000 = 2500m",
      "*Worked Example 3 (a two-step conversion, mm directly to km, to test full understanding of the chain):",
      "Convert 4,500,000 mm to km.",
      "Step 1: mm to m (divide by 1000, since 1000mm=1m): 4,500,000÷1000 = 4,500m",
      "Step 2: m to km (divide by 1000, since 1000m=1km): 4,500÷1000 = 4.5km",
      "*Practice Questions:"
    ],
    "checks": [
      "Convert 8m to cm.",
      "Convert 620cm to m.",
      "Convert 3km to m.",
      "Convert 7,200m to km.",
      "Convert 15,000mm to m, then to km (show both steps)."
    ],
    "targets": [
      "Units of Measurement (length, mass, capacity, time conversions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Part 3: Units of Mass (Weight)",
    "sourceFile": "math-foundation-units.md",
    "steps": [
      "*Step 1 — Establish the base unit and build outward, same reasoning pattern as length",
      "The standard base unit of mass is the kilogram (kg).",
      "1 gram (g) = 1/1000 of a kilogram → therefore 1000 g = 1 kg",
      "1 tonne (t) = 1000 kilograms → therefore 1000 kg = 1 tonne",
      "*Step 2 — Same conversion method: divide going small-to-large, multiply going large-to-small",
      "*Worked Example 1:",
      "Convert 5,600,000 g to kg.",
      "Since 1000g=1kg, divide by 1000: 5,600,000÷1000 = 5,600kg",
      "*Worked Example 2:",
      "Convert 3.2 kg to grams.",
      "Since 1kg=1000g, multiply by 1000: 3.2×1000 = 3,200g",
      "*Practice Questions:"
    ],
    "checks": [
      "Convert 2,500g to kg.",
      "Convert 4.5kg to g.",
      "Convert 3,000kg to tonnes.",
      "A bag of rice weighs 1,200g. Express this in kg."
    ],
    "targets": [
      "Units of Measurement (length, mass, capacity, time conversions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Part 4: Units of Capacity (Volume of Liquid)",
    "sourceFile": "math-foundation-units.md",
    "steps": [
      "*Step 1 — Establish the base unit",
      "The standard base unit of capacity is the litre (L).",
      "1 millilitre (ml) = 1/1000 of a litre → therefore 1000 ml = 1 L",
      "*Worked Example:",
      "Convert 2,500ml to litres.",
      "Divide by 1000 (small to large): 2,500÷1000 = 2.5L",
      "*Practice Questions:"
    ],
    "checks": [
      "Convert 3.5L to ml.",
      "Convert 750ml to L."
    ],
    "targets": [
      "Units of Measurement (length, mass, capacity, time conversions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Part 5: Units of Time",
    "sourceFile": "math-foundation-units.md",
    "steps": [
      "*Step 1 — Establish that time conversions do NOT follow the same \"1000\" pattern as length/mass/capacity — an important point to flag explicitly, since students often wrongly assume all conversions use 10s and 100s",
      "Time uses irregular conversion numbers, based on historical/astronomical reasons, not the metric system:",
      "60 seconds = 1 minute",
      "60 minutes = 1 hour",
      "24 hours = 1 day",
      "7 days = 1 week",
      "*Worked Example (multi-step conversion):",
      "Convert 3 hours to minutes, then to seconds.",
      "3 hours × 60 = 180 minutes",
      "180 minutes × 60 = 10,800 seconds",
      "*Practice Questions:"
    ],
    "checks": [
      "Convert 2.5 hours to minutes.",
      "Convert 300 seconds to minutes.",
      "How many seconds are there in 1 day? (Show every step of the conversion chain.)"
    ],
    "targets": [
      "Units of Measurement (length, mass, capacity, time conversions)"
    ]
  },
  {
    "classLevel": "JSS1",
    "subject": "Mathematics",
    "term": 1,
    "title": "Part 6: Note on Place Value Terminology (Correction/Clarification)",
    "sourceFile": "math-foundation-units.md",
    "steps": [
      "The rightmost position in a whole number (what we sometimes call the \"ones\" position) is more formally and commonly called the units position in Nigerian textbooks. Both terms mean the same thing — \"how many single, individual ones\" — but \"units\" is the term students will most often see in their school textbooks and exams, so Avora will use units as the primary term going forward, with \"ones\" mentioned as an alternative name the first time it's introduced.",
      "This foundational lesson is now a prerequisite reference for every later topic involving measurement conversions. Continuing next to rebuild JSS1 Term 2 at full depth, using only concepts already established here and in Term 1."
    ],
    "checks": [],
    "targets": [
      "Units of Measurement (length, mass, capacity, time conversions)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "1.1 Pure Vowels — Spelling Features (Connecting Sound to Spelling Patterns)",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Establish the genuine PROBLEM this topic addresses: English spelling does NOT reliably show pronunciation, unlike many Nigerian languages where spelling is highly phonetic (each letter consistently represents one sound) — this mismatch is a real, ongoing source of error**",
      "**Step 2 — Demonstrate the problem with MULTIPLE examples of the SAME letter representing DIFFERENT sounds, and DIFFERENT letters representing the SAME sound**",
      "The letter \"a\" alone represents several different sounds depending on the word: \"cat\" (/æ/), \"car\" (/ɑː/), \"cake\" (/eɪ/), \"about\" (/ə/ — a weak, unstressed sound called schwa, covered further in JSS3). This is NOT random — English spelling reflects centuries of historical change, but for a LEARNER, it means spelling alone cannot be trusted to predict pronunciation.",
      "Conversely, the SAME sound can be spelled differently: the /iː/ sound (long \"ee\") appears in \"see,\" \"sea,\" \"receive,\" and \"machine\" — four completely different spellings for the identical sound.",
      "**Worked Example (a practical strategy for handling this mismatch):**",
      "Rather than assuming spelling predicts sound, learners should build a mental \"sound-to-word\" memory for TRICKY, high-frequency words individually, while relying on PATTERNS (like recognizing \"ee,\" \"ea\" as common /iː/ spellings) for less familiar words.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Give three different words where the letter \"o\" represents three DIFFERENT sounds (e.g., \"hot,\" \"go,\" \"who\" — say each aloud and confirm the sounds differ).",
      "Give three different SPELLINGS for the SAME /uː/ sound (e.g., \"food,\" \"true,\" \"flu\").",
      "Explain, using the \"a\" example above, why a Nigerian English learner (used to more phonetically consistent spelling in their first language) might find English spelling-to-sound mapping genuinely more difficult than a first-language equivalent."
    ],
    "targets": [
      "Speech Work: pure vowels (spelling features); consonant sounds (spelling features, e.g. silent gh, ph, ch variants)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "1.2 Consonant Sounds — Spelling Features",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Establish specific, HIGH-VALUE spelling/sound mismatches for CONSONANTS, since these cause real communication errors, not just accent differences**",
      "**The silent \"gh\"**: in words like \"night,\" \"light,\" \"though,\" the \"gh\" is completely SILENT — it represents NO sound at all, a remnant of Old English pronunciation that has since disappeared.",
      "**\"ph\" representing /f/**: \"phone,\" \"photograph\" — the letters \"ph\" together make the SAME sound as the single letter \"f.\"",
      "**\"ch\" representing THREE different sounds depending on the word**: \"chair\" (/tʃ/, as expected), \"school\" (/k/ — NOT /tʃ/, a Greek-origin spelling), \"machine\" (/ʃ/ — a French-origin spelling, \"sh\" sound).",
      "**Worked Example (testing the \"ch\" mismatch explicitly, since ONE pattern name hides three different actual sounds):**",
      "Say \"chair,\" \"school,\" and \"machine\" aloud. Notice \"ch\" sounds completely different in each — proving that even a single two-letter combination cannot be trusted to always represent one fixed sound.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Identify the sound of \"ch\" in: \"chocolate,\" \"chemistry,\" \"parachute\" (say each aloud and classify which of the three \"ch\" sound types applies).",
      "Give two more examples of words with silent \"gh.\"",
      "Explain why relying purely on \"sounding out\" letter by letter can lead to mispronunciation for words like \"school\" or \"machine\" — what should a learner do INSTEAD when encountering an unfamiliar word with \"ch\"?"
    ],
    "targets": [
      "Speech Work: pure vowels (spelling features); consonant sounds (spelling features, e.g. silent gh, ph, ch variants)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "2.1 Transitive and Intransitive Verbs",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Establish the DEFINING TEST explicitly: does the verb require a DIRECT OBJECT (something/someone receiving the action) to make complete sense?**",
      "A **transitive** verb NEEDS an object to complete its meaning: \"She bought ___\" is incomplete — bought WHAT? (\"She bought a book\" — \"a book\" is the object, required for the sentence to make full sense.)",
      "An **intransitive** verb does NOT need an object: \"She sleeps\" is a COMPLETE sentence on its own — nothing is \"received\" by the action.",
      "**Step 2 — Establish the GENUINELY TRICKY case: some verbs can be BOTH transitive and intransitive depending on how they're used — a common source of confusion, since students often assume a verb is fixed to one category**",
      "Worked Example Set (testing the SAME verb in both roles):",
      "\"She sings\" (INTRANSITIVE — complete on its own, no object needed) vs \"She sings a song\" (TRANSITIVE — \"a song\" is the object).",
      "\"He eats\" (INTRANSITIVE — complete) vs \"He eats rice\" (TRANSITIVE — \"rice\" is the object).",
      "\"The glass broke\" (INTRANSITIVE — the glass did the \"breaking\" on its own, no object) vs \"She broke the glass\" (TRANSITIVE — \"the glass\" is the object of her action).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Classify each as transitive or intransitive, and identify the OBJECT if transitive: \"The baby cried.\" / \"She wrote a letter.\" / \"The sun rises.\" / \"He kicked the ball.\"",
      "Using \"read\" as your example verb, write ONE sentence where it's used intransitively and ONE where it's used transitively (as demonstrated with \"sings\" and \"eats\" above).",
      "Explain why \"She gave\" feels INCOMPLETE on its own (hint: what TWO pieces of information does \"give\" typically need — think about \"gave WHAT to WHOM\")."
    ],
    "targets": [
      "Grammar: transitive/intransitive verbs; active and passive voice"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "2.2 Active and Passive Voice",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Establish the core structural difference: in ACTIVE voice, the SUBJECT performs the action; in PASSIVE voice, the SUBJECT RECEIVES the action (and the original \"doer\" either moves to a \"by\" phrase or disappears entirely)**",
      "**Worked Example (transforming the SAME sentence between active and passive, step by step, showing exactly what moves where):**",
      "Active: \"The teacher marked the exams.\" (subject \"teacher\" performs the action)",
      "Passive: \"The exams were marked by the teacher.\" (subject is now \"exams,\" which RECEIVES the action; \"teacher\" moved into a \"by\" phrase; the verb changed to \"were marked,\" a form of \"be\" plus the past participle)",
      "**Step 2 — Establish WHEN passive voice is genuinely useful (not just a grammatical variation), since students often think of it as an arbitrary rewording rule rather than a meaningful choice**",
      "Passive voice is useful when the DOER of an action is unknown, unimportant, or deliberately being de-emphasized: \"The window was broken\" (we may not know WHO broke it, or it doesn't matter for the point being made) — contrast with the active \"Someone broke the window,\" which forces us to specify or vaguely say \"someone.\"",
      "**Worked Example (testing the transformation on a SECOND sentence, including the important note about verb tense agreement)**",
      "Active: \"The workers are building a new bridge.\" (present continuous)",
      "Passive: \"A new bridge is being built by the workers.\" (notice the passive form must MATCH the same tense — present continuous passive uses \"is/are being + past participle,\" not just any form of \"be\")",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Convert to passive voice: \"The chef cooked the meal.\"",
      "Convert to passive voice: \"The students are writing their exams.\" (careful to match the present continuous tense correctly in the passive form, as shown above).",
      "Convert to ACTIVE voice (the reverse direction): \"The letter was posted by Ada.\"",
      "Explain why a news report might write \"The suspect was arrested yesterday\" (passive) rather than naming who specifically arrested him — what PURPOSE does the passive voice serve here?"
    ],
    "targets": [
      "Grammar: transitive/intransitive verbs; active and passive voice"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "3.1 Reading to Understand the Writer's Purpose — Recall and Extend to TONE",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Recall purpose-identification from JSS1, then introduce the RELATED but DISTINCT concept of TONE (the writer's ATTITUDE toward the subject, which can vary even within the same PURPOSE)**",
      "Two texts can share the SAME purpose (e.g., both informing) but have very different TONE: a formal, serious tone versus a light, humorous tone.",
      "**Worked Example (same purpose, contrasting tones):**",
      "\"The committee regrets to announce that the annual sports day has been postponed due to unforeseen circumstances.\" — INFORMS, but in a FORMAL, SERIOUS tone.",
      "\"Oops! Looks like sports day got pushed back — blame the rain, not us!\" — ALSO informs the SAME basic fact, but in a CASUAL, LIGHT-HEARTED tone.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Identify the tone (formal/informal, serious/humorous, etc.) of each: \"We are pleased to invite you to the graduation ceremony.\" / \"Hey, don't forget the graduation thing on Friday!\"",
      "Write the SAME piece of information (e.g., \"the library closes early today\") in TWO different tones: one formal, one casual."
    ],
    "targets": [
      "Comprehension: writer's purpose (extended, mixed-purpose texts); word families (Science/Technology-type topics)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "3.2 Word Families — Extended With Topic-Based Sentences, New Topics",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Word family: Science and Technology** — experiment, hypothesis, data, laboratory, innovation, device, research.",
      "Worked usage: \"The scientist conducted a careful experiment in the laboratory to test her hypothesis, collecting data that supported her research.\"",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "List 6 words in a \"Law and Justice\" word family and use 4 of them in a connected sentence.",
      "List 6 words in a \"Mass Media\" word family and use 4 of them in a connected sentence."
    ],
    "targets": [
      "Comprehension: writer's purpose (extended, mixed-purpose texts); word families (Science/Technology-type topics)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "4.1 Narrative Essay — Outlining and Brainstorming (A New Pre-Writing Skill)",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Establish OUTLINING as a distinct, valuable PRE-WRITING step, not something to skip — demonstrate the difference between writing WITHOUT an outline versus WITH one**",
      "**Worked Example (a full outline for a narrative essay, built BEFORE any actual prose is written):**",
      "Title: \"The Day I Won a Competition\"",
      "- Opening: Saturday morning, nervous about the school debate competition",
      "- Rising action: initial competitors seem much stronger; self-doubt creeps in during registration",
      "- Climax: my turn to speak; forget my first line momentarily but recover by recalling my main argument",
      "- Resolution: judges announce results; I am declared the winner, to my own surprise",
      "- Conclusion: lesson learned — self-doubt often exaggerates the actual difficulty ahead",
      "**Step 2 — Explain WHY outlining BEFORE writing improves the final essay, connecting to the five-part narrative structure established in JSS1**",
      "An outline forces the writer to PLAN the five-part structure (opening, rising action, climax, resolution, conclusion) before getting caught up in sentence-level wording — this prevents essays that meander without a clear shape, a common weakness when students write \"as they go\" without planning.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Create a full outline (following the 5-point structure above) for a narrative titled \"The Day My Team Lost the Match,\" WITHOUT writing the full essay yet — just the outline.",
      "Using your outline from Question 1, write the FULL essay, checking afterward that each outline point became a fully developed paragraph."
    ],
    "targets": [
      "Composition: narrative essay (outlining/brainstorming); descriptive essay (outlining a place)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "4.2 Descriptive Essay — Outlining a Place of Interest",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Establish a DESCRIPTIVE outline structure (different from narrative, since description has no plot/events, but instead organizes by SPATIAL or SENSORY structure)**",
      "**Worked Example (a descriptive outline for \"My School Compound\"):**",
      "- Overall impression: a busy, lively place",
      "- Sight details: colorful buildings, students in uniforms, trees along the pathway",
      "- Sound details: chatter, bell ringing, football being kicked in the field",
      "- Smell details: food from the canteen, freshly cut grass",
      "- Concluding impression: a place that feels like a second home",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Create a descriptive outline (organized by sense, as shown above) for \"The Local Market,\" then write the full descriptive paragraph from your outline."
    ],
    "targets": [
      "Composition: narrative essay (outlining/brainstorming); descriptive essay (outlining a place)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 1,
    "title": "5.1 Prose — Extended Types and Features (Novella, Novelette, Novel)",
    "sourceFile": "jss2-english-term1.md",
    "steps": [
      "**Step 1 — Establish the LENGTH-BASED distinction between these three prose forms explicitly, since students often use these terms interchangeably without realizing they refer to different LENGTHS/scopes of story**",
      "- **Short story**: a brief, complete narrative, focused on a SINGLE event or a small set of characters (can be read in one sitting).",
      "- **Novelette**: longer than a short story but shorter than a novella — a MEDIUM-length work.",
      "- **Novella**: longer than a novelette, shorter than a full novel — typically explores ONE central plot with limited characters, more developed than a short story but not as expansive as a novel.",
      "- **Novel**: the LONGEST and most developed form, typically featuring MULTIPLE plot threads, a larger cast of characters, and more complex character development over an extended narrative.",
      "**Worked Example (illustrating the distinction with a concrete comparison, since abstract length descriptions alone are hard to grasp)**",
      "A short story might tell the story of ONE afternoon when a boy helps a lost stranger find their way — focused, single event. A novel on the same general theme might follow that boy's ENTIRE childhood, showing how that one kind act shapes his relationships, choices, and identity over many years, with multiple sub-plots involving his family, friends, and community along the way.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response.",
      "This completes **JSS2 English Studies, First Term**. Continuing next to **JSS2 English, Second Term**."
    ],
    "checks": [
      "Explain, in your own words, the KEY difference between a novella and a novel (focus on SCOPE — number of plot threads and characters — not just page count).",
      "If you were to write a short story vs a novel about the same basic idea (\"a student overcomes a fear of public speaking\"), what would you INCLUDE in the novel version that you might have to LEAVE OUT of the short story version?"
    ],
    "targets": [
      "Literature: prose extended (novella, novelette, novel — length/scope distinctions)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "1.1 Diphthongs and Triphthongs — Extended Beyond JSS1",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Recall diphthongs from JSS1, then introduce TRIPHTHONGS explicitly: a vowel sound that glides through THREE distinct vowel qualities within a single syllable — a genuinely more complex sound than a diphthong**",
      "Common triphthongs: /aɪə/ as in \"fire\" (glides from /a/ through /ɪ/ to /ə/), /aʊə/ as in \"hour\" (glides from /a/ through /ʊ/ to /ə/).",
      "**Worked Example (testing whether a word contains a diphthong or triphthong by counting the glide stages)**",
      "Say \"fire\" slowly, stretching it out: \"faaa-ee-uh\" — notice THREE distinct vowel qualities pass through in this ONE syllable, confirming it's a triphthong, not just a diphthong.",
      "Contrast with \"day\" (diphthong, only TWO qualities: /e/ gliding to /ɪ/).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Say \"hour\" and \"player\" slowly, and identify which one is a triphthong and which is a diphthong, explaining how many vowel-quality stages you can hear in each.",
      "Give one more example word containing a triphthong (hint: words ending in \"-ire,\" \"-our,\" or \"-ower\" often contain them, e.g., \"tower,\" \"flour\")."
    ],
    "targets": [
      "Speech Work: diphthongs and triphthongs (extended); /ɪə/ vs /eə/ contrast"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "1.2 Vowel and Consonant Contrasts — /ɪə/ and /eə/ (New Diphthong-Type Contrast)",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish this specific contrast explicitly since it's a common confusion for Nigerian English learners: /ɪə/ (as in \"here\") vs /eə/ (as in \"hair\") — these can sound similar but are distinct**",
      "Minimal pair: \"here\" (/hɪə/) vs \"hair\" (/heə/) — say both slowly; \"here\" starts with a sound closer to /ɪ/ (as in \"bit\"), while \"hair\" starts with a sound closer to /e/ (as in \"bed\"), before both glide toward /ə/.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Give a second minimal pair for /ɪə/ vs /eə/ (e.g., \"beer\" vs \"bear\").",
      "Practice saying \"here\" and \"hair\" side by side, describing what changes at the START of each glide."
    ],
    "targets": [
      "Speech Work: diphthongs and triphthongs (extended); /ɪə/ vs /eə/ contrast"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "2.1 Adjectives — Extended: Comparative/Superlative Edge Cases and Common Errors",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Build on JSS1's comparative/superlative work by testing MORE unusual edge cases: adjectives that DON'T logically have comparative/superlative forms (called \"absolute\" or \"non-gradable\" adjectives), a genuinely advanced point**",
      "Some adjectives describe an ABSOLUTE state that cannot logically be \"more\" or \"less\": \"unique\" (something is either one-of-a-kind or it isn't — \"more unique\" is technically illogical, though commonly heard in casual speech), \"perfect,\" \"dead,\" \"pregnant.\" These don't follow the normal comparison rules because their MEANING doesn't allow for degrees.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Explain why \"This is the most perfect solution\" is considered grammatically/logically questionable by careful writers (hint: can something be \"more than completely without flaw\"?).",
      "Give one more example of an absolute adjective and explain why it resists comparison."
    ],
    "targets": [
      "Grammar: comparative/superlative edge cases (absolute adjectives); present & past continuous tense; adverbials (reason, purpose, condition); requests and commands; \"although\" vs \"whereas\""
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "2.2 Tenses — Present Continuous and Past Continuous",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish the FORMATION and MEANING of continuous tenses explicitly: \"be\" (in the appropriate tense) + verb-ing, used for actions IN PROGRESS at a specific time**",
      "**Present continuous**: is/am/are + verb-ing, for actions happening RIGHT NOW or around the present time. \"She is reading a book\" (happening now).",
      "**Past continuous**: was/were + verb-ing, for actions that WERE in progress at a specific point in the PAST. \"She was reading a book when the phone rang\" (the reading was ALREADY IN PROGRESS when the interruption occurred).",
      "**Step 2 — Establish the GENUINE reason past continuous is often paired with simple past in the SAME sentence (a structural pattern worth naming explicitly): the continuous action provides BACKGROUND, and the simple past action INTERRUPTS it**",
      "**Worked Example (testing this pairing pattern):**",
      "\"I was cooking dinner when the lights went out.\" — \"was cooking\" (past continuous, ongoing background action) + \"went out\" (simple past, a single interrupting event). Notice REVERSING which verb gets which tense would change the meaning: \"I cooked dinner when the lights were going out\" would oddly suggest cooking was the brief interrupting event instead — showing the tense choice carries real meaning, not just grammatical decoration.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Complete with the correct tense: \"While she ___ (study) for her exams, her brother ___ (interrupt) her constantly.\" (identify which action is the ongoing background and which is the interrupting event).",
      "Write one sentence using past continuous for a background action and simple past for an interrupting event, similar to the \"cooking dinner\" example.",
      "Explain why swapping the tenses in a past-continuous/simple-past pair sentence changes the MEANING, not just the grammar (use the reasoning from the worked example above)."
    ],
    "targets": [
      "Grammar: comparative/superlative edge cases (absolute adjectives); present & past continuous tense; adverbials (reason, purpose, condition); requests and commands; \"although\" vs \"whereas\""
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "2.3 Adverbials — Types (Cause/Reason, Purpose, Condition)",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish that an \"adverbial\" is a WORD, PHRASE, or CLAUSE that functions like an adverb (modifying the whole sentence/verb, often answering \"why,\" \"how,\" \"when,\" or \"under what condition\"), then distinguish the THREE new types explicitly**",
      "- **Adverbial of reason/cause**: explains WHY something happens — \"She stayed home BECAUSE SHE WAS ILL.\"",
      "- **Adverbial of purpose**: explains the GOAL/intention behind an action — \"She studied hard IN ORDER TO PASS THE EXAM.\"",
      "- **Adverbial of condition**: states a CONDITION under which something happens — \"IF IT RAINS, we will stay indoors.\"",
      "**Worked Example (testing discrimination between reason and purpose, since these are easily confused — both seem to answer \"why,\" but in different ways)**",
      "\"He exercises TO STAY FIT\" — this is PURPOSE (a goal/intention he is working TOWARD).",
      "\"He exercises BECAUSE HIS DOCTOR ADVISED IT\" — this is REASON (an existing CAUSE explaining the action, not a future goal).",
      "The distinguishing test: does the adverbial describe something the subject is TRYING TO ACHIEVE (purpose) or something that ALREADY CAUSED the action (reason)?",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Classify each adverbial as reason, purpose, or condition: \"She saved money TO BUY A NEW PHONE.\" / \"He was late BECAUSE THE BUS BROKE DOWN.\" / \"IF YOU STUDY HARD, you will succeed.\"",
      "Using the reason/purpose discrimination test above, explain why \"I ran quickly TO CATCH THE BUS\" is purpose, not reason.",
      "Write one original sentence for each of the three adverbial types."
    ],
    "targets": [
      "Grammar: comparative/superlative edge cases (absolute adjectives); present & past continuous tense; adverbials (reason, purpose, condition); requests and commands; \"although\" vs \"whereas\""
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "2.4 Requests and Commands",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish the grammatical/tonal distinction: a COMMAND uses the plain imperative form (direct, sometimes blunt), while a REQUEST softens the same instruction using politeness markers**",
      "Command: \"Close the door.\" (direct imperative)",
      "Request: \"Could you please close the door?\" / \"Would you mind closing the door?\" (softened with modal verbs and politeness words)",
      "**Worked Example (testing WHY the softened form matters socially, not just grammatically)**",
      "Using a bare command (\"Give me that book\") toward a stranger or superior can sound RUDE, even though it's grammatically identical in structure to commanding a close friend. The REQUEST form (\"Could I please have that book?\") is more socially appropriate in most formal or unfamiliar contexts — this is a PRAGMATIC (social-use) point, not just a grammar rule.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Convert these commands into polite requests: \"Open the window.\" / \"Bring me a glass of water.\"",
      "Explain why using a bare command toward your teacher (e.g., \"Give me my results\") might be considered rude, even though the grammar itself is not \"incorrect.\""
    ],
    "targets": [
      "Grammar: comparative/superlative edge cases (absolute adjectives); present & past continuous tense; adverbials (reason, purpose, condition); requests and commands; \"although\" vs \"whereas\""
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "2.5 Conjunctions — \"Although\" vs \"Whereas\" (Contrast)",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish the SHARED function of both words (showing CONTRAST between two ideas) but the KEY DIFFERENCE in what kind of contrast each signals**",
      "\"Although\" introduces a contrast where one idea happens DESPITE the other (a CONCESSION): \"Although it was raining, she went out.\" (going out happened DESPITE the rain — an unexpected/surprising contrast).",
      "\"Whereas\" introduces a DIRECT COMPARISON between two DIFFERENT facts, without suggesting surprise: \"She likes tea, whereas he prefers coffee.\" (simply stating a DIFFERENCE, not an unexpected outcome).",
      "**Worked Example (testing why swapping them can sound odd, proving they aren't perfectly interchangeable)**",
      "\"Whereas it was raining, she went out\" sounds AWKWARD, because \"whereas\" doesn't carry the sense of \"despite/surprisingly\" that the sentence needs — \"although\" is the correct choice here. Conversely, \"Although she likes tea, he prefers coffee\" is grammatically fine but changes the FEEL slightly, implying a subtle tension rather than a neutral comparison — \"whereas\" fits the neutral-comparison meaning more naturally.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Fill in \"although\" or \"whereas,\" explaining your choice: \"___ he studied hard, he failed the exam.\" / \"Lagos is very crowded, ___ Kano is comparatively quieter.\"",
      "Explain, using the \"despite vs neutral comparison\" distinction, why \"although\" fits a SURPRISING contrast better than \"whereas.\""
    ],
    "targets": [
      "Grammar: comparative/superlative edge cases (absolute adjectives); present & past continuous tense; adverbials (reason, purpose, condition); requests and commands; \"although\" vs \"whereas\""
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "3.1 Critical Reading — Meaning and Scope",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish \"critical reading\" as going BEYOND literal comprehension to evaluate the text: questioning the writer's assumptions, evidence, and possible bias — a more advanced skill than JSS1's basic comprehension**",
      "**Worked Example (a passage analyzed critically, not just literally):**",
      "\"Everyone knows that studying late at night is the best way to prepare for exams.\"",
      "Literal comprehension: this sentence claims late-night studying is the best exam-preparation method.",
      "CRITICAL reading questions: Is \"everyone knows\" actually TRUE, or is this an unsupported generalization? Is there evidence given for WHY late-night studying is \"best,\" or is this just an ASSERTION (recall the fact-vs-opinion, claim-vs-proof skills from JSS1)? A critical reader would NOTICE this claim lacks support and question it, rather than accepting it simply because it's stated confidently.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Read this sentence critically and identify what's questionable about it: \"Obviously, the fastest way to succeed in business is to drop out of school.\" What ASSUMPTION is being made without proof?",
      "Explain the difference between literal comprehension (what does the text SAY) and critical reading (should I ACCEPT what the text says, and why or why not)."
    ],
    "targets": [
      "Comprehension: critical reading (claims vs evidence); reading words in context (context clues)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "3.2 Reading to Identify Words in Context",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish the CONTEXT-CLUE method explicitly for figuring out an unfamiliar word's meaning WITHOUT a dictionary, using surrounding sentence information**",
      "**Worked Example (deducing meaning from context, showing the reasoning process, not just the answer):**",
      "\"The room was filled with an acrid smell after the wire caught fire, making everyone cough and cover their noses.\"",
      "Unfamiliar word: \"acrid.\" Context clues: \"caught fire,\" \"cough,\" \"cover their noses\" — all suggest something UNPLEASANT and IRRITATING to breathe. Deduced meaning: \"acrid\" likely means a sharp, unpleasant, irritating smell — which matches its actual dictionary meaning, showing the context-clue method works even without knowing the word beforehand.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Using context clues (not a dictionary), deduce the meaning of the underlined word: \"The famished dog hadn't eaten in three days and eagerly devoured every scrap of food it found.\" (underlined word: \"famished\")",
      "Explain, using the \"acrid\" example above, what SPECIFIC words in a sentence can serve as useful context clues (what TYPES of surrounding information helped deduce the meaning?)."
    ],
    "targets": [
      "Comprehension: critical reading (claims vs evidence); reading words in context (context clues)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "4.1 Formal Letter Writing — Full Structure With Annotation",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Establish the COMPLETE formal letter structure explicitly, part by part, since missing any structural element is a common, easily-avoidable exam error**",
      "**Worked Example (a full formal letter, annotated at each structural part):**",
      "\"[Sender's address]",
      "15 Ahmadu Bello Way,",
      "Kaduna.",
      "12th March, 2026\" — [Annotation: SENDER'S ADDRESS and DATE, positioned at the top right in most Nigerian school conventions.]",
      "\"The Principal,",
      "Government Secondary School,",
      "Kaduna.\" — [Annotation: RECIPIENT'S ADDRESS, positioned below and to the LEFT, without a comma after \"The Principal\" in some conventions, though styles vary slightly by school.]",
      "\"Dear Sir,\" — [Annotation: FORMAL SALUTATION — note \"Dear Sir\" or \"Dear Madam\" is used when the specific name of the recipient is unknown; if the name IS known, \"Dear Mr./Mrs. [Surname]\" is used instead.]",
      "\"REQUEST FOR PERMISSION TO ORGANIZE A SCHOOL DEBATE CLUB\" — [Annotation: the SUBJECT HEADING, usually capitalized/underlined, stating the letter's purpose clearly and immediately.]",
      "\"I am writing to formally request your permission to establish a debate club within our school. [Body Paragraph 1: introduces the PURPOSE clearly.] I believe such a club would provide students with valuable skills in public speaking and critical thinking, benefiting both individual students and the school's reputation in inter-school competitions. [Body Paragraph 2: gives REASONS/justification.] I would be glad to provide further details or a proposed schedule if needed.\" [Closing body: offers further cooperation.]",
      "\"Yours faithfully,\" — [Annotation: FORMAL CLOSING — \"Yours faithfully\" is used when the letter opened with \"Dear Sir/Madam\" (name unknown); \"Yours sincerely\" is used when a specific name was used in the salutation — this pairing rule is a common, specific error point worth flagging directly.]",
      "\"Chidinma Okafor\" — [Annotation: SENDER'S SIGNATURE/NAME at the bottom.]",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write a full formal letter to your school principal requesting permission for an inter-house sports competition, including EVERY structural element demonstrated above (sender's address, date, recipient's address, salutation, subject heading, body, closing, name).",
      "Explain the \"Yours faithfully\" vs \"Yours sincerely\" rule, and identify which one you correctly used in Question 1 based on your chosen salutation."
    ],
    "targets": [
      "Composition: formal letter writing (full structure)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "5.1 Drama — Elements Extended (Conflict, Climax, Resolution in Dramatic Structure)",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Extend JSS1's basic drama structural knowledge (dialogue, stage directions, acts, scenes) to the STORY-LEVEL structural elements shared with prose: conflict, climax, resolution — showing drama and prose share DEEPER structural similarities even though their SURFACE format (dialogue vs paragraphs) differs**",
      "**Worked Example (identifying conflict/climax/resolution within a short drama excerpt):**",
      "\"[A courtroom. The JUDGE sits at the bench.]",
      "LAWYER: Your honour, my client is innocent of this accusation.",
      "JUDGE: The evidence presented suggests otherwise. What proof do you offer?",
      "LAWYER: (producing a document) This letter proves he was elsewhere at the time.",
      "JUDGE: (examining it carefully) This does change matters significantly. Case dismissed.\"",
      "CONFLICT: the accusation against the client (a disagreement/problem needing resolution).",
      "CLIMAX: the lawyer produces the crucial document — the turning point.",
      "RESOLUTION: the judge dismisses the case based on the new evidence.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Identify the conflict, climax, and resolution in a drama or play you have read or watched (any example).",
      "Explain how the CONFLICT/CLIMAX/RESOLUTION structure in this drama excerpt is similar to the RISING ACTION/CLIMAX/RESOLUTION structure taught for narrative prose in JSS1 — are these fundamentally the same structural idea, just in different formats?"
    ],
    "targets": [
      "Literature: drama elements extended (conflict, climax, resolution); figures of speech extended (irony, paradox, onomatopoeia)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 2,
    "title": "5.2 Figures of Speech — Extended Set (Building on JSS1)",
    "sourceFile": "jss2-english-term2.md",
    "steps": [
      "**Step 1 — Add THREE new figures of speech beyond JSS1's five, with the same discrimination-testing approach**",
      "- **Irony**: saying/showing the OPPOSITE of what is expected or literally meant, often for effect — \"What a beautiful day for a picnic,\" said during a heavy thunderstorm (the literal words are positive, but the situation makes the REAL meaning sarcastic/opposite).",
      "- **Paradox**: a statement that seems SELF-CONTRADICTORY but reveals a deeper truth upon reflection — \"The more you give, the more you have\" (seems contradictory at first, but reflects a truth about generosity and fulfillment).",
      "- **Onomatopoeia**: a word that IMITATES the actual SOUND it describes — \"buzz,\" \"crash,\" \"sizzle\" (saying the word itself sounds like the noise it names).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response.",
      "This completes **JSS2 English Studies, Second Term**. Continuing next to **JSS2 English, Third Term**."
    ],
    "checks": [
      "Identify the figure of speech: \"It's ironic that the fire station burned down.\" / \"I must be cruel to be kind.\" / \"The bacon sizzled in the pan.\"",
      "Write one original example of irony, one of paradox, and one sentence using an onomatopoeic word.",
      "Explain why irony often depends on CONTEXT (the situation) rather than just the literal words themselves — using the \"beautiful day for a picnic\" example, explain what makes it ironic (hint: what is ACTUALLY happening versus what the words literally say?)."
    ],
    "targets": [
      "Literature: drama elements extended (conflict, climax, resolution); figures of speech extended (irony, paradox, onomatopoeia)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 3,
    "title": "1.1 Consolidation — Full Mixed Diagnostic Across All JSS1–JSS2 Sound Contrasts",
    "sourceFile": "jss2-english-term3.md",
    "steps": [
      "**Step 1 — Combine EVERY contrast type taught so far (short/long monophthongs, diphthongs, triphthongs, /ɪə/ vs /eə/) into ONE comprehensive diagnostic set, since real spoken assessment mixes all of these unpredictably, and isolated practice alone doesn't guarantee this integrated skill**",
      "**Full diagnostic word list:** \"ship\" (short monophthong), \"sheep\" (long monophthong), \"day\" (diphthong), \"fire\" (triphthong), \"here\" (centring diphthong /ɪə/), \"hair\" (centring diphthong /eə/), \"cat\" (short), \"car\" (long).",
      "**Worked Example (classifying the FULL list with reasoning shown for each, modeling the complete diagnostic process):**",
      "\"ship\" → short monophthong /ɪ/ (brief, no glide)",
      "\"sheep\" → long monophthong /iː/ (held longer, no glide, same basic quality as \"ship\" but longer and more tense)",
      "\"day\" → diphthong /eɪ/ (two-stage glide)",
      "\"fire\" → triphthong /aɪə/ (three-stage glide)",
      "\"here\" → diphthong /ɪə/ (glides toward schwa, starting from an /ɪ/-like quality)",
      "\"hair\" → diphthong /eə/ (glides toward schwa, starting from an /e/-like quality)",
      "\"cat\" → short monophthong /æ/",
      "\"car\" → long monophthong /ɑː/",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Classify these EIGHT additional words using the full diagnostic method: \"bit,\" \"beat,\" \"boy,\" \"hour,\" \"bit,\" \"bet,\" \"tour,\" \"bought.\"",
      "Create a personal \"trouble list\" of 5 words YOU find hardest to classify correctly, and explain what makes each one tricky (short vs long? monophthong vs diphthong? number of glide stages?)."
    ],
    "targets": [
      "Speech Work: full mixed sound diagnostic (consolidation)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 3,
    "title": "2.1 \"Despite\" and \"In Spite Of\" vs \"Although\"",
    "sourceFile": "jss2-english-term3.md",
    "steps": [
      "**Step 1 — Establish the KEY STRUCTURAL difference: \"although\" is followed by a FULL CLAUSE (subject + verb), while \"despite\" and \"in spite of\" are followed by a NOUN or GERUND (-ing form) — NOT a full clause — a genuine, very common error point**",
      "**Worked Example (testing the correct structure for each, showing the WRONG version first)**",
      "WRONG: \"Despite he was tired, he finished the race.\" (INCORRECT — \"despite\" cannot be followed by a full clause with a subject and verb like \"he was tired\")",
      "CORRECT (using despite + noun/gerund): \"Despite his tiredness, he finished the race.\" OR \"Despite being tired, he finished the race.\"",
      "CORRECT (using although + full clause): \"Although he was tired, he finished the race.\"",
      "**Step 2 — Establish that \"despite\" and \"in spite of\" are functionally INTERCHANGEABLE (same structure, same meaning), while \"although\" requires the DIFFERENT clause structure — summarizing the full pattern**",
      "| Structure | Followed By | Example |",
      "|---|---|---|",
      "| Although | Full clause (subject+verb) | Although she was late, she attended the meeting. |",
      "| Despite | Noun / gerund | Despite her lateness, she attended the meeting. |",
      "| In spite of | Noun / gerund | In spite of being late, she attended the meeting. |",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Correct this sentence: \"Despite he studied hard, he failed the test.\" (identify the error and fix it using the noun/gerund rule).",
      "Rewrite this \"although\" sentence using \"in spite of\" instead, adjusting the structure correctly: \"Although it was raining heavily, the match continued.\"",
      "Explain why \"Despite of the rain\" is ALSO incorrect (a common error combining \"despite\" and \"in spite of\" incorrectly) — what should it be instead?"
    ],
    "targets": [
      "Grammar: \"despite\"/\"in spite of\" vs \"although\" (structural rule)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 3,
    "title": "3.1 Summary Writing — Full Method, Introduced Explicitly",
    "sourceFile": "jss2-english-term3.md",
    "steps": [
      "**Step 1 — Establish summary writing as a DISTINCT skill from simple comprehension: condensing a LONGER passage into its ESSENTIAL points only, in the summarizer's OWN words, within a specified word limit**",
      "**Step 2 — Establish the FULL method as a sequence of explicit steps, not just \"make it shorter\"**",
      "1. Read the passage fully to understand the OVERALL meaning first (don't summarize sentence-by-sentence as you go, which produces a disjointed result).",
      "2. Identify the MAIN POINTS (recall the topic-sentence skill from JSS1 — what is each paragraph's core idea?), ignoring minor supporting details, examples, and repeated information.",
      "3. Rewrite these main points in YOUR OWN WORDS (not copying phrases directly — this is a common, serious error, since a summary should show UNDERSTANDING, not just word-for-word extraction).",
      "4. Check the word count against any given limit, trimming further if needed.",
      "**Worked Example (full summary process demonstrated on a sample passage):**",
      "Original passage: \"Nigeria has a rich and diverse culture, shaped by over 250 ethnic groups, each with its own traditions, languages, and customs. Festivals such as the Eyo festival in Lagos and the Argungu fishing festival in Kebbi showcase this diversity through colourful celebrations, music, and dance. Despite this diversity, Nigerians share certain unifying values, including a strong sense of community, respect for elders, and hospitality toward visitors. These shared values help bind the nation together despite its many differences.\"",
      "Step 2 (identifying main points): (a) Nigeria has diverse culture from 250+ ethnic groups; (b) festivals showcase this diversity; (c) shared values (community, respect for elders, hospitality) unify the nation despite differences.",
      "Step 3 (rewriting in own words, condensed): \"Nigeria's culture is diverse, reflecting its many ethnic groups and their distinct festivals and traditions. However, shared values such as community spirit, respect for elders, and hospitality help unite the country despite this diversity.\"",
      "Notice: the summary captures the SAME core ideas in FEWER words, using DIFFERENT phrasing (not copying \"over 250 ethnic groups\" or \"Eyo festival\" verbatim, since specific examples are details, not main points for a short summary).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Summarize this passage in NO MORE than 40 words, following all four steps above explicitly (read fully, identify main points, rewrite in your own words, check word count): \"Regular exercise offers numerous health benefits. It strengthens the heart, improves blood circulation, and helps maintain a healthy body weight. Exercise also releases hormones called endorphins, which improve mood and reduce stress. Additionally, consistent physical activity can improve sleep quality and boost overall energy levels throughout the day.\"",
      "Explain why copying phrases DIRECTLY from the original passage (rather than rewording) is considered a weakness in summary writing, even if the copied phrase is accurate."
    ],
    "targets": [
      "Comprehension: summary writing (full method)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 3,
    "title": "4.1 Informal/Personal Letter Writing",
    "sourceFile": "jss2-english-term3.md",
    "steps": [
      "**Step 1 — Establish the STRUCTURAL and TONAL differences from formal letters (covered in Term 2), since students often incorrectly apply formal structure/tone to personal letters or vice versa**",
      "**Worked Example (a full informal letter, annotated to highlight differences from the formal letter structure)**",
      "\"15 Ahmadu Bello Way,",
      "Kaduna.",
      "12th March, 2026\" — [Annotation: sender's address and date STILL included, similar to formal letters — this part doesn't change.]",
      "\"Dear Mum,\" — [Annotation: CASUAL salutation using a first name or family term, NOT \"Dear Sir/Madam\" — immediately signals a personal relationship.]",
      "\"I hope you are doing well. I miss you so much and can't wait to see you during the holidays! School has been quite busy lately, but I'm managing well. My favourite subject this term is Literature — we're reading such an interesting story right now. How is Dad doing? Please tell him I said hello.\" — [Annotation: notice the TONE is warm, casual, and uses contractions (\"can't,\" \"we're\") which would be AVOIDED in formal writing; there's no rigid \"subject heading\" or formal justification structure — just natural, flowing personal content.]",
      "\"Lots of love,",
      "Chidinma\" — [Annotation: CASUAL, warm closing (\"Lots of love,\" \"Your loving daughter,\" etc.) — NOT \"Yours faithfully/sincerely,\" which would feel oddly cold and distant in a letter to a parent.]",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write a full informal letter to a friend describing your recent holiday, including the casual salutation and closing style demonstrated above.",
      "Identify THREE specific differences between this informal letter and the formal letter structure from Term 2 (think about: salutation style, use of contractions, presence/absence of a subject heading, closing phrase)."
    ],
    "targets": [
      "Composition: informal/personal letter writing; report writing (introductory)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 3,
    "title": "4.2 Report Writing (Introductory)",
    "sourceFile": "jss2-english-term3.md",
    "steps": [
      "**Step 1 — Establish a BASIC report structure: a report presents FACTUAL information about an event or situation, organized clearly, often for an official or organizational purpose — distinct from narrative (which tells a personal story) even though both may describe \"what happened\"**",
      "**Worked Example (a short report, annotated):**",
      "\"REPORT ON THE INTER-HOUSE SPORTS COMPETITION HELD ON 10TH MARCH 2026\" — [Annotation: a clear, factual TITLE stating exactly what is being reported.]",
      "\"The inter-house sports competition took place on the school field, involving all four houses. Events included the 100m race, long jump, and relay race. Blue House emerged as the overall winner with 45 points, followed by Red House with 38 points. The event was well-attended by students, staff, and some parents. Minor delays occurred due to an unexpected equipment shortage, but these were resolved within 20 minutes.\" — [Annotation: notice this is written in an OBJECTIVE, FACTUAL tone — no personal opinions or emotional language (contrast with a NARRATIVE essay about the same event, which might include the writer's own excitement or nerves) — a report sticks to what OBJECTIVELY happened.]",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write a short report (título + 4-5 factual sentences) on a school event you're familiar with, keeping the tone strictly OBJECTIVE (no personal feelings, just facts).",
      "Explain the KEY difference between a report and a narrative essay describing the SAME event (both describe \"what happened,\" but what makes their APPROACH different?)."
    ],
    "targets": [
      "Composition: informal/personal letter writing; report writing (introductory)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 3,
    "title": "5.1 Folktales — Extended Features (Structural Patterns, Not Just Definition)",
    "sourceFile": "jss2-english-term3.md",
    "steps": [
      "**Step 1 — Extend JSS1's basic folktale definition with SPECIFIC recurring STRUCTURAL PATTERNS common across many folktales, since recognizing patterns is a more advanced literary skill than simply defining the genre**",
      "Common folktale patterns:",
      "- **The \"trickster\" pattern**: a clever, often small or weak character outsmarts a larger/stronger one through wit rather than strength (e.g., tortoise outsmarting larger animals).",
      "- **The \"three attempts\" pattern**: a character tries something THREE times, often failing twice before succeeding (or the third attempt reveals a crucial lesson) — a very common structural device across many cultures' folktales.",
      "- **The explicit moral closing**: many folktales end with a DIRECTLY STATED lesson (\"And that is why we must never be greedy...\"), unlike more modern short stories, which usually let the theme emerge implicitly without stating it outright.",
      "**Worked Example (identifying these patterns in a specific folktale)**",
      "\"The Greedy Dog\" (a dog crosses a bridge holding a bone, sees his reflection in the water, believes it's another dog with a bigger bone, and barks to take it — dropping his own bone in the process): this demonstrates the EXPLICIT MORAL CLOSING pattern (often ending with \"greed leads to loss\") though it does NOT use the trickster or three-attempts pattern — showing not every folktale uses ALL patterns; they mix and match.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Identify which of the three patterns (trickster, three attempts, explicit moral) appear in a folktale you know well, explaining your reasoning.",
      "Explain why an EXPLICIT moral closing (directly stating the lesson) might be considered a different STYLISTIC choice compared to modern stories that leave the theme unstated — which approach do you think is more effective for teaching young children specifically, and why?"
    ],
    "targets": [
      "Literature: folktales (structural patterns — trickster, three attempts, explicit moral); myths and legends (extended features)"
    ]
  },
  {
    "classLevel": "JSS2",
    "subject": "English Language",
    "term": 3,
    "title": "5.2 Myths and Legends — Extended Features",
    "sourceFile": "jss2-english-term3.md",
    "steps": [
      "**Step 1 — Extend JSS1's myth/legend distinction with SPECIFIC recurring features for each, similar to the folktale pattern-recognition approach above**",
      "**Myth features**: often involves creation stories (how the world/humans/animals came to be), features gods or supernatural beings with immense power, and is traditionally treated with a degree of SERIOUSNESS or SACREDNESS within the originating culture (unlike a folktale, which is often told more for entertainment/moral teaching without the same \"sacred\" weight).",
      "**Legend features**: centers on a NAMED, specific historical or quasi-historical figure, includes exaggerated feats that stretch believability while still being presented as \"possibly true,\" and often serves to inspire NATIONAL or CULTURAL PRIDE (celebrating a hero's supposed accomplishments).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response.",
      "This completes **JSS2 English Studies — all three terms**, matching the full depth standard throughout. **All of JSS2 English is now complete.** Continuing next to **JSS3 English, First Term**."
    ],
    "checks": [
      "Explain why a myth is typically treated with more \"seriousness/sacredness\" than a folktale, even though both involve fantastical elements — what role might myths have played historically in explaining a community's origins or beliefs?",
      "Find (or recall) one legend about a real or quasi-historical figure from any culture, and identify the specific exaggerated feat(s) associated with them that push the story beyond straightforward historical fact."
    ],
    "targets": [
      "Literature: folktales (structural patterns — trickster, three attempts, explicit moral); myths and legends (extended features)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "1.1 Long/Short Vowel Contrasts — Extended Full Set (BECE-Level Consolidation)",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Present the COMPLETE set of long/short contrasts tested at BECE level, consolidating and extending JSS1's four core pairs with additional practice words, since oral English at this level demands FLUENT, automatic discrimination, not just recognition**",
      "Full contrast set with THREE example words each (rather than one or two, to build genuine fluency through volume):",
      "/iː/ vs /ɪ/: \"sheep/ship,\" \"seat/sit,\" \"leave/live\"",
      "/ɑː/ vs /æ/: \"cart/cat,\" \"park/pack,\" \"class/clash\" (note: \"clash\" isn't a perfect minimal pair with \"class\" since the final sounds differ slightly — used here to test whether the LEARNER notices this is imperfect, an important critical-listening skill)",
      "/ɔː/ vs /ɒ/: \"port/pot,\" \"caught/cot,\" \"sport/spot\"",
      "/uː/ vs /ʊ/: \"food/foot,\" \"pool/pull,\" \"fool/full\"",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "For EACH of the four contrast pairs above, practice all three example words aloud (with Avora modeling), then create ONE additional original word pair for each contrast (four new pairs total).",
      "Regarding the \"class/clash\" pair flagged as imperfect above: explain what actually differs between these two words beyond just the vowel (hint: listen to the final consonant sound in each)."
    ],
    "targets": [
      "Speech Work: long/short vowel contrasts (extended, BECE-level); consonant contrasts (place/manner of articulation)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "1.2 Consonant Contrasts — Extended Full Set",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Full contrast set, extended beyond JSS1's voiced/voiceless pairs to include PLACE-of-articulation contrasts (sounds made in similar places but with different manner):**",
      "/p/ vs /f/: \"pin/fin,\" \"cup/cuff\" — both are made near the lips, but /p/ fully STOPS the air (a plosive) while /f/ lets air FRICTION through continuously (a fricative) — a manner-of-articulation distinction, not just voicing.",
      "/ʃ/ vs /tʃ/: \"ship/chip,\" \"wash/watch\" — /ʃ/ is a continuous friction sound (\"sh\"), while /tʃ/ STARTS with a brief stop before releasing into friction (\"ch\") — say both slowly and notice /tʃ/ has an abrupt starting \"catch\" that /ʃ/ lacks.",
      "/Ʒ/ vs /dʒ/: \"measure\" (contains /Ʒ/) vs \"measure\" — wait, a clearer pair: \"leisure\" (/Ʒ/) vs \"ledger\" (/dʒ/) — similar reasoning to the /ʃ/ vs /tʃ/ pair: /dʒ/ has an abrupt stop-then-release, /Ʒ/ is continuous friction only.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Say \"ship\" and \"chip\" slowly, and describe what you notice about HOW each sound begins (abrupt stop, or continuous friction).",
      "Give one more example pair for /p/ vs /f/, explaining the manner-of-articulation difference (stop vs continuous friction) in your own words."
    ],
    "targets": [
      "Speech Work: long/short vowel contrasts (extended, BECE-level); consonant contrasts (place/manner of articulation)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "2.1 Expressing Obligation and Necessity",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Establish the FOUR modal expressions taught at this level with their SUBTLE differences in meaning/strength, since treating them as simple synonyms (a common error) loses important nuance**",
      "- **Must**: strong obligation, often from the SPEAKER'S OWN judgment/authority — \"You must submit the assignment by Friday\" (the speaker is imposing this rule).",
      "- **Have to**: strong obligation, but typically from an EXTERNAL source/rule, not the speaker's personal judgment — \"I have to wear a uniform to school\" (the rule comes from the school, not the speaker's personal opinion).",
      "- **Need to**: expresses NECESSITY, often practical/situational rather than a strict rule — \"I need to buy new shoes\" (a personal practical necessity, not an external rule).",
      "- **Ought to**: expresses a MORAL or ADVISABLE obligation, WEAKER than \"must\" — \"You ought to apologize\" (a suggestion of what's right, not an absolute command).",
      "**Worked Example (testing the subtle \"must\" vs \"have to\" distinction, which is genuinely difficult even for advanced learners)**",
      "\"You must wear a seatbelt\" (spoken by a parent giving a personal rule/insistence) vs \"You have to wear a seatbelt\" (stating an external LAW that applies regardless of anyone's personal opinion) — both are grammatically valid, but the SOURCE of the obligation differs.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Choose the most appropriate modal (must/have to/need to/ought to) for each situation, explaining your reasoning: \"It's the law — all drivers ___ have a valid license.\" / \"I ___ to charge my phone, the battery is almost dead.\" / \"You ___ to thank her for the gift; it would be polite.\"",
      "Explain the difference in SOURCE of obligation between \"must\" and \"have to,\" using the seatbelt example as your reference."
    ],
    "targets": [
      "Grammar: expressing obligation/necessity (must/have to/need to/ought to); expressing emotions (verb + preposition patterns)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "2.2 Expressing/Describing Emotions (Verb + Preposition Patterns)",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Establish that many emotion verbs require a SPECIFIC preposition, and this pairing is NOT predictable by logic — it must be learned as a fixed pattern (similar to irregular verbs needing memorization)**",
      "Fixed patterns: \"afraid OF,\" \"interested IN,\" \"worried ABOUT,\" \"proud OF,\" \"angry WITH\" (a person) / \"angry ABOUT\" (a situation) — note this LAST example shows the SAME emotion word pairing with DIFFERENT prepositions depending on WHETHER the object is a person or a situation, a genuinely tricky sub-case.",
      "**Worked Example (testing the person/situation distinction explicitly)**",
      "\"I am angry WITH my brother\" (a PERSON) vs \"I am angry ABOUT the delay\" (a SITUATION) — using \"with\" for the delay, or \"about\" for the brother, would both sound incorrect to a fluent speaker, even though the underlying emotion (anger) is identical.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Fill in the correct preposition: \"She is afraid ___ spiders.\" / \"He is interested ___ football.\" / \"They are proud ___ their achievements.\"",
      "Using the angry-with/angry-about distinction, correct this sentence: \"I am angry about my sister for breaking my phone.\" (identify why \"about\" is wrong here, given the object is a PERSON)."
    ],
    "targets": [
      "Grammar: expressing obligation/necessity (must/have to/need to/ought to); expressing emotions (verb + preposition patterns)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "3.1 Skimming vs Scanning — Explicit Distinction With Practice",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Establish these as TWO DIFFERENT reading speeds/purposes, often confused as being the same thing**",
      "**Skimming**: reading QUICKLY to get a GENERAL sense of the whole passage (main idea, overall topic) — you do NOT read every word carefully.",
      "**Scanning**: reading quickly to find ONE SPECIFIC piece of information (a name, date, number) — you're not trying to understand the whole passage, just LOCATE one detail.",
      "**Worked Example (testing WHEN to use each, since choosing the wrong strategy wastes time)**",
      "Task: \"What is this article generally about?\" → SKIM (you need the overall gist, not a specific detail).",
      "Task: \"In what year did this event happen?\" → SCAN (you're hunting for one specific fact — a date — and can ignore everything else).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "For each task, state whether skimming or scanning is the more efficient strategy, and explain why: \"Find the phone number mentioned in this advertisement.\" / \"Get a general idea of what this news article is about before deciding whether to read it fully.\"",
      "Explain why using SKIMMING for a scanning task (like finding a specific date) would be inefficient — what would go wrong?"
    ],
    "targets": [
      "Comprehension: skimming vs scanning; word formation (prefixes and suffixes)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "3.2 Word Formation — Prefixes and Suffixes",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Establish that many English words are built from a ROOT plus PREFIXES (added before) and/or SUFFIXES (added after), each carrying a predictable MEANING or GRAMMATICAL function — a genuinely powerful vocabulary-building tool**",
      "**Common prefixes and their meanings:**",
      "\"un-\" (not/opposite): happy→unhappy",
      "\"dis-\" (not/opposite, or reversal): agree→disagree",
      "\"re-\" (again): do→redo",
      "\"pre-\" (before): view→preview",
      "**Common suffixes and their FUNCTIONS (often changing the WORD TYPE, e.g., adjective to noun):**",
      "\"-ness\" (adjective→noun, quality of): happy→happiness",
      "\"-ment\" (verb→noun, result/action of): develop→development",
      "\"-er/-or\" (verb→noun, one who does): teach→teacher, act→actor",
      "\"-ship\" (noun→noun, state/condition of): friend→friendship",
      "\"-hood\" (noun→noun, state/period of): child→childhood",
      "\"-al\" (noun→adjective): nation→national",
      "**Worked Example (using prefix knowledge to deduce meaning of an UNFAMILIAR word, a genuinely useful exam skill)**",
      "Encountering \"disorganized\" for the first time: recognize the PREFIX \"dis-\" (not/opposite) attached to the FAMILIAR root \"organized\" → deduce meaning: \"not organized,\" which matches the actual definition.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Add the correct prefix to reverse the meaning: \"___honest,\" \"___appear\" (using \"dis-\"), \"___connect\" (using \"dis-\").",
      "Form nouns from these verbs/adjectives using the correct suffix: \"develop\" (→ -ment), \"kind\" (→ -ness), \"govern\" (→ -ment or -or, depending on which noun is intended — explain the difference between \"government\" and \"governor\").",
      "Using prefix-deduction, guess the meaning of \"prehistoric\" (breaking it into \"pre-\" + \"historic\") before checking — was your guess correct?"
    ],
    "targets": [
      "Comprehension: skimming vs scanning; word formation (prefixes and suffixes)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "4.1 Narrative Essay — Guided Writing at BECE Level",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Present a FULL guided narrative essay at BECE complexity level (longer, more nuanced than the JSS1 model), demonstrating the FIVE-part structure (established in JSS1) applied to more mature content**",
      "*Title: My Most Memorable Day*",
      "[Full essay demonstrating Opening → Rising Action → Climax → Resolution → Conclusion, with SPECIFIC BECE-level vocabulary and sentence complexity expected at this level — e.g., varied sentence structures, more sophisticated vocabulary like \"apprehension,\" \"exhilaration,\" \"unprecedented\" used naturally within the narrative, rather than the simpler vocabulary used in the JSS1 model.]",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write a full narrative essay titled \"A Day I Will Never Forget,\" using the five-part structure, and deliberately incorporate at least THREE sophisticated vocabulary words (not simple everyday words) naturally into your narrative.",
      "Review your essay from Question 1: identify which part (opening, rising action, climax, resolution, conclusion) you found hardest to write well, and explain why."
    ],
    "targets": [
      "Composition: narrative essay (guided writing, BECE level); formal letter (comprehensive review — complaint letter, tone control)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "4.2 Formal Letter — Comprehensive Review",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Recall the FULL formal letter structure from JSS2, then apply it to a MORE COMPLEX, BECE-realistic scenario requiring careful tone management**",
      "**Worked Example (a formal letter of complaint, testing tone control under a situation involving frustration, without becoming rude)**",
      "\"...I am writing to express my concern regarding the poor state of the school's toilet facilities. Despite several informal complaints from students, no action appears to have been taken. I kindly request that this matter be given urgent attention, as it affects the health and wellbeing of the entire student body...\"",
      "Notice: even though the WRITER may feel frustrated, the LANGUAGE remains formal and respectful (\"I kindly request,\" \"I am writing to express my concern\") rather than accusatory or rude — this TONE CONTROL under a complaint scenario is a genuinely important exam-relevant skill.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write a full formal letter of complaint to a local council about poor road conditions in your area, maintaining a RESPECTFUL, formal tone throughout, even while expressing genuine concern.",
      "Explain why an ANGRY, accusatory tone in a formal complaint letter (e.g., \"This is completely unacceptable and someone must be fired!\") would likely be LESS effective than the respectful version modeled above — what is being sacrificed by writing angrily?"
    ],
    "targets": [
      "Composition: narrative essay (guided writing, BECE level); formal letter (comprehensive review — complaint letter, tone control)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "5.1 Fiction vs Non-Fiction — Explicit Distinction",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Establish the CORE distinguishing test: is the content INVENTED (fiction) or based on REAL facts/events (non-fiction)? — then complicate this with the genuinely tricky \"based on a true story\" borderline case**",
      "**Fiction**: invented characters/events, even if inspired by reality (a novel, a short story, a folktale).",
      "**Non-fiction**: presents REAL, factual information (a biography, a news article, a textbook).",
      "**Worked Example (testing the tricky \"based on true events\" borderline case explicitly)**",
      "A novel \"based on a true story\" — is this fiction or non-fiction? Reasoning: even when INSPIRED by real events, if the AUTHOR has invented dialogue, added fictional characters, or dramatized events beyond documented fact, the work is still classified as FICTION (specifically, historical fiction) — it is the presence of INVENTED elements, not the absence of any real-world connection, that determines the category.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Classify each as fiction or non-fiction, explaining your reasoning: a folktale / a newspaper report / a biography of a national hero / a novel \"inspired by true events\" with invented dialogue.",
      "Using the \"based on a true story\" reasoning above, explain why a documentary film (showing real footage/interviews) would be classified DIFFERENTLY from a historical drama film (using actors to recreate events with invented dialogue), even if both cover the SAME historical topic."
    ],
    "targets": [
      "Literature: fiction vs non-fiction; poetry analysis (stanza, rhyme scheme)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 1,
    "title": "5.2 Poetry Analysis — Deeper Structural Study",
    "sourceFile": "jss3-english-term1.md",
    "steps": [
      "**Step 1 — Extend beyond JSS1/JSS2's basic figure-of-speech identification to STRUCTURAL analysis: STANZA, RHYME SCHEME, and RHYTHM/METER, establishing each with a worked example**",
      "**Stanza**: a GROUPED set of lines in a poem (similar to a paragraph in prose), often separated by a blank line.",
      "**Rhyme scheme**: the PATTERN of rhyming line-endings, labeled with letters (A, B, C...) where lines ending in the SAME rhyme sound get the SAME letter.",
      "**Worked Example (labeling a rhyme scheme explicitly, showing the METHOD, not just stating a scheme name):**",
      "\"The sun sets low upon the hill (A)",
      "The birds fly home, the air grows still (A)",
      "A gentle breeze begins to blow (B)",
      "As shadows stretch and daylight goes (B)\"",
      "Label each line-ending sound: \"hill\" and \"still\" rhyme → both labeled A. \"blow\" and \"goes\" rhyme → both labeled B. This gives the rhyme scheme AABB.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response.",
      "This completes **JSS3 English Studies, First Term**. Continuing next to **JSS3 English, Second Term**."
    ],
    "checks": [
      "Determine the rhyme scheme of this stanza, labeling each line: \"The moon shines bright across the bay (_) / The waves dance gently, night and day (_) / A fisherman sails out alone (_) / Beneath a sky of stars unknown (_)\"",
      "Explain, using the labeling method demonstrated above, how you would determine the rhyme scheme of ANY new poem you encounter (what is the general PROCEDURE, not just the answer for one example?)."
    ],
    "targets": [
      "Literature: fiction vs non-fiction; poetry analysis (stanza, rhyme scheme)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "1.1 The Schwa Sound /ə/",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Establish the schwa as the MOST COMMON vowel sound in English, occurring specifically in UNSTRESSED syllables, regardless of what letter is actually written — a genuinely important, often-overlooked sound**",
      "The schwa /ə/ is a short, relaxed, \"uh\"-like sound that REPLACES the \"true\" vowel sound in syllables that are NOT stressed. This is why English pronunciation often DIFFERS from what spelling suggests: in \"banana,\" the FIRST and LAST \"a\" are both pronounced as schwa /ə/ (a weak \"uh\" sound), while only the STRESSED middle \"a\" is pronounced as its \"full\" vowel sound /ɑː/. Say \"banana\" slowly and notice the three \"a\" letters do NOT all sound the same.",
      "**Worked Example (testing schwa recognition across multiple words):**",
      "\"about\" — the first syllable \"a-\" is unstressed → pronounced as schwa /ə/, NOT as a full \"a\" sound.",
      "\"sofa\" — the final \"-a\" is unstressed → schwa.",
      "\"photograph\" vs \"photography\" — notice STRESS SHIFTS between these related words, which changes WHICH syllables become schwa: \"PHO-to-graph\" (stress on first syllable) vs \"pho-TOG-ra-phy\" (stress shifts to second syllable) — the unstressed syllables in each word are pronounced with schwa, but WHICH syllables are unstressed changes between the two words.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Identify the schwa sound(s) in these words: \"computer,\" \"elephant,\" \"sofa.\"",
      "Using the \"photograph/photography\" example, explain why the SAME letters can be pronounced differently depending on which syllable carries the STRESS in a given word."
    ],
    "targets": [
      "Speech Work: the schwa sound; stress and intonation (word-stress meaning shifts, statement vs question intonation)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "1.2 Stress and Intonation",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Establish WORD STRESS as changing MEANING in certain English word pairs (a genuinely high-value point, since this is NOT just a pronunciation nicety but can change a word's grammatical function)**",
      "Some words change from NOUN to VERB depending on WHICH syllable is stressed: \"REcord\" (noun — stress on first syllable, e.g., \"I bought a new record\") vs \"reCORD\" (verb — stress on second syllable, e.g., \"Please record this conversation\"). Same spelling, different stress, different meaning/function.",
      "**Step 2 — Establish INTONATION (the RISE and FALL of pitch across a sentence) as distinguishing STATEMENTS from QUESTIONS, even when the WORDS are identical**",
      "\"You are coming.\" (falling intonation at the end = a STATEMENT)",
      "\"You are coming?\" (rising intonation at the end = a QUESTION, even though the WORD ORDER is identical to the statement — English can turn a statement into a question purely through intonation, without changing word order, which is a genuinely distinct grammatical tool from the more formal question-inversion rule (\"Are you coming?\"))",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Give another example of a noun/verb pair distinguished by stress placement (like \"REcord/reCORD\") — try \"PREsent/preSENT\" and explain the meaning difference between the two stress patterns.",
      "Say \"She is leaving\" first as a falling-intonation statement, then as a rising-intonation question, and explain what changes in MEANING despite the words staying identical."
    ],
    "targets": [
      "Speech Work: the schwa sound; stress and intonation (word-stress meaning shifts, statement vs question intonation)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "2.1 Expressing Exception",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Establish the FOUR exception-expressing phrases taught at this level, noting subtle structural differences among them**",
      "- **Except**: \"Everyone attended the meeting except John.\" (John is excluded from an otherwise general statement)",
      "- **Except for**: similar to \"except,\" often used at the START of a sentence for emphasis: \"Except for John, everyone attended the meeting.\"",
      "- **But for**: a MORE FORMAL/LITERARY equivalent, often implying a hypothetical consequence: \"But for his quick thinking, the accident would have been worse.\" (implies: IF NOT FOR his quick thinking...)",
      "- **Apart from**: similar to \"except,\" but can ALSO mean \"in addition to\" depending on context — a genuinely tricky DOUBLE MEANING worth flagging: \"Apart from Maths, I like English\" could mean EITHER \"excluding Maths, I like English\" (implying dislike of Maths) OR \"in addition to Maths, I also like English\" (implying I like BOTH) — the intended meaning depends entirely on CONTEXT, making this phrase genuinely ambiguous without more information.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Fill in the most natural exception phrase for each: \"___ the rain, the picnic was enjoyable.\" (implying the rain was the only negative) / \"___ his stubbornness, he would have accepted the compromise.\"",
      "Using the \"apart from\" ambiguity explained above, write TWO different sentences using \"Apart from football\" — one meaning EXCLUSION (dislike of football) and one meaning ADDITION (liking football plus something else) — to demonstrate you understand both possible meanings."
    ],
    "targets": [
      "Grammar: expressing exception (except/except for/but for/apart from); adverbs of frequency; positive-to-negative statement conversion"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "2.2 Adverbs of Frequency",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Establish the FULL frequency scale explicitly, from highest to lowest, since students often only learn \"always/never\" without the full range needed for nuanced expression**",
      "Full scale (highest to lowest frequency): always → usually → often → sometimes → occasionally → rarely → seldom → never.",
      "**Step 2 — Establish the POSITIONING RULE: frequency adverbs typically go BEFORE the main verb, but AFTER the verb \"to be\" — a genuine structural rule worth stating explicitly, not left to intuition**",
      "\"She ALWAYS arrives early.\" (before the main verb \"arrives\")",
      "\"She IS ALWAYS early.\" (AFTER the verb \"is,\" since \"is\" is a form of \"to be\")",
      "**Worked Example (testing the positioning rule against a common error)**",
      "WRONG: \"She always is early.\" (incorrect positioning — \"always\" placed before \"is\")",
      "CORRECT: \"She is always early.\"",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Place the frequency adverb correctly in each sentence: \"(often) He arrives late for class.\" / \"(never) She is on time.\"",
      "Rank these frequency words from highest to lowest: \"seldom,\" \"usually,\" \"occasionally,\" \"always.\"",
      "Correct this sentence, explaining the positioning rule: \"They rarely are absent from school.\""
    ],
    "targets": [
      "Grammar: expressing exception (except/except for/but for/apart from); adverbs of frequency; positive-to-negative statement conversion"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "2.3 Positive-to-Negative Statement Conversion",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Establish the FULL set of rules for converting positive statements to negative, covering the different verb types explicitly (auxiliary verbs, \"to be,\" and main verbs requiring \"do/does/did\")**",
      "**With \"to be\"**: simply add \"not\" after the \"be\" verb: \"She is happy\" → \"She is NOT happy.\"",
      "**With auxiliary/modal verbs** (can, will, must, etc.): add \"not\" after the modal: \"She can swim\" → \"She canNOT (can't) swim.\"",
      "**With a MAIN verb (no auxiliary present)**: this requires INSERTING \"do/does/did\" plus \"not,\" and changing the main verb back to its BASE form — a genuinely tricky transformation that catches many learners off guard: \"She swims every day\" → \"She does NOT SWIM every day\" (notice \"swims\" becomes the base form \"swim\" once \"does not\" is inserted — a common error is leaving it as \"does not swims,\" which is incorrect).",
      "**Worked Example (testing the main-verb transformation explicitly, since this is the hardest case)**",
      "\"They play football on Saturdays.\" → Insert \"do not\" (since \"they\" is plural, using \"do\" not \"does\") and revert \"play\" to its base form (it's already base form here) → \"They do NOT PLAY football on Saturdays.\"",
      "\"He plays football on Saturdays.\" → Insert \"does not\" (since \"he\" is singular) and CHANGE \"plays\" back to base form \"play\" (removing the \"-s,\" since \"does\" already carries the singular marking) → \"He does NOT PLAY football on Saturdays.\"",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Convert to negative: \"She is a doctor.\" / \"They can dance well.\" / \"He eats rice every day.\" (identify which RULE — be-verb, modal, or main-verb-with-do — applies to each).",
      "A student converts \"She plays tennis\" to \"She does not plays tennis.\" Identify the exact error (what should have happened to \"plays\" once \"does not\" was inserted?) and correct it."
    ],
    "targets": [
      "Grammar: expressing exception (except/except for/but for/apart from); adverbs of frequency; positive-to-negative statement conversion"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "3.1 Reading to Interpret Diagrams, Maps, and Sketches",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Establish this as a DISTINCT comprehension skill: extracting information from VISUAL sources (not just prose text), which BECE and WAEC do test explicitly**",
      "**Worked Example (interpreting a simple described map, reasoning through it explicitly):**",
      "\"A map shows a school located at the center of a town, with a hospital 2km to the north, a market 1km to the east, and a police station 3km to the south.\"",
      "Question: \"Which facility is closest to the school?\" Reasoning: compare the three given distances (2km, 1km, 3km) — the market at 1km is the SHORTEST distance, so it's the closest facility.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Using the map description above, answer: \"Which facility is FARTHEST from the school?\" and explain your reasoning process (comparing all given distances).",
      "Describe, in words, how you would go about interpreting a bar chart showing rainfall by month, if asked \"which month had the highest rainfall?\" (what specifically would you look for on the chart?)."
    ],
    "targets": [
      "Comprehension: interpreting diagrams/maps/sketches; topic vocabulary (Science/Technology, Law/Justice)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "3.2 Topic-Based Vocabulary — Science/Technology and Law/Justice",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Word family: Science and Technology (extending JSS2's introduction)** — hypothesis, experiment, innovation, software, artificial intelligence, renewable energy, laboratory.",
      "Worked usage: \"Scientists are exploring renewable energy innovations, such as solar and wind power, to reduce our dependence on fossil fuels.\"",
      "**Word family: Law and Justice** — defendant, plaintiff, verdict, testimony, evidence, judge, sentence, acquit.",
      "Worked usage: \"After hearing the testimony and reviewing the evidence, the judge delivered a verdict acquitting the defendant of all charges.\"",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Use FOUR words from the \"Law and Justice\" word family in a short paragraph describing a courtroom scene.",
      "Use FOUR words from the \"Science and Technology\" word family in a short paragraph describing a scientific discovery."
    ],
    "targets": [
      "Comprehension: interpreting diagrams/maps/sketches; topic vocabulary (Science/Technology, Law/Justice)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "4.1 Argumentative Essay on Complex/Topical Issues",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Extend JSS2's argumentative structure (position + reasons + acknowledged counter-argument) to a MORE COMPLEX, multi-sided topic requiring genuine nuance, at BECE difficulty level**",
      "**Worked Example (excerpt from a full essay on \"Nigeria's Oil: A Blessing or a Curse?\", demonstrating handling of a genuinely COMPLEX issue with multiple legitimate perspectives, not a simple yes/no)**",
      "\"While Nigeria's oil wealth has undeniably contributed significantly to national revenue, its overall impact remains deeply contested. On one hand, oil revenue has funded infrastructure projects and remains a major source of foreign exchange. On the other hand, over-reliance on oil has arguably stunted the growth of other sectors like agriculture and manufacturing, while oil-related environmental damage in the Niger Delta has caused significant harm to local communities. Ultimately, I argue that oil has been more of a curse than a blessing, primarily due to this failure to diversify the economy and the environmental costs borne by affected communities...\"",
      "Notice: this essay does NOT pretend the issue is simple — it acknowledges GENUINE benefits before arguing its position, which is a MORE SOPHISTICATED argumentative technique than the simpler counter-argument acknowledgment used in JSS2, since here MULTIPLE substantial points on both sides are weighed, not just one counter-argument briefly mentioned and dismissed.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write a full argumentative essay on a complex topic of your choice (e.g., \"Should social media be restricted for teenagers?\"), ensuring you genuinely acknowledge AT LEAST TWO substantial points on the opposing side before arguing your position.",
      "Explain why treating a complex issue (like the oil question) as a simple \"yes/no\" without acknowledging genuine complexity would likely result in a WEAKER essay, from an examiner's perspective."
    ],
    "targets": [
      "Composition: argumentative essay on complex issues (e.g. Nigeria's oil); expository essay (entrepreneurship)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "4.2 Expository Essay — Entrepreneurship",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Worked Example (a BECE-level expository essay excerpt on \"Entrepreneurship,\" maintaining a purely explanatory, non-argumentative tone despite the topic's potential for opinion)**",
      "\"Entrepreneurship refers to the process of starting and running a business, often involving significant risk in pursuit of profit and innovation. Successful entrepreneurs typically possess qualities such as creativity, resilience, and the ability to identify unmet needs in the market. The process usually begins with identifying a business idea, followed by market research, securing capital, and finally, launching and managing the venture...\"",
      "Notice: even though entrepreneurship is a topic PEOPLE often have strong opinions about, this passage remains purely EXPLANATORY — no argument is made about whether entrepreneurship is \"good\" or people \"should\" pursue it; it simply explains what it IS and HOW it typically works.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write an expository essay explaining \"The Process of Voter Registration in Nigeria\" (or another civic process you're familiar with), maintaining a purely explanatory tone with no argued opinion.",
      "Compare this expository \"Entrepreneurship\" excerpt with the argumentative \"Oil\" excerpt above — identify ONE specific sentence type/phrase that appears in the argumentative essay but would be OUT OF PLACE in the expository one."
    ],
    "targets": [
      "Composition: argumentative essay on complex issues (e.g. Nigeria's oil); expository essay (entrepreneurship)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "5.1 Prose — Reading and Summarizing Selected Chapters",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Apply the FULL summary-writing method (established in JSS2) specifically to LITERARY prose, adding the additional consideration of PRESERVING key plot/character information that a general-topic summary wouldn't need to worry about**",
      "**Worked Example (summarizing a fictional chapter excerpt, applying JSS2's summary method with literature-specific adjustments)**",
      "Sample chapter summary excerpt (of a hypothetical novel chapter): \"In this chapter, the protagonist, Amaka, discovers a hidden letter revealing a long-held family secret. Her initial shock gives way to determination as she resolves to uncover the full truth, setting up the central conflict for the remainder of the novel.\"",
      "Notice: unlike a general informational summary (JSS2), this LITERARY summary must preserve: the CHARACTER'S NAME (Amaka), the KEY PLOT EVENT (finding the letter), and its NARRATIVE FUNCTION (setting up the central conflict) — omitting any of these would make the summary less useful for someone trying to follow the STORY, even if it technically meets a general \"shorter version\" requirement.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Summarize a chapter or section from any novel or story you have read, ensuring you preserve character names, key events, and their narrative significance (not just a vague general statement).",
      "Explain why a LITERARY summary needs to preserve MORE specific detail (character names, key events) compared to a general informational summary (like the JSS2 \"Nigeria's culture\" example) — what is different about the PURPOSE of each type of summary?"
    ],
    "targets": [
      "Literature: prose — reading and summarizing chapters; distinguishing irony, euphemism, and hyperbole"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 2,
    "title": "5.2 Distinguishing Irony, Euphemism, and Hyperbole",
    "sourceFile": "jss3-english-term2.md",
    "steps": [
      "**Step 1 — Recall irony and hyperbole from earlier terms, then introduce EUPHEMISM explicitly, and test all THREE together in a mixed discrimination exercise (since confusing these, especially irony vs euphemism, is a common exam error)**",
      "**Euphemism**: a MILD or INDIRECT expression substituted for one considered too harsh, blunt, or unpleasant — \"passed away\" instead of \"died,\" \"let go\" instead of \"fired.\" Unlike hyperbole (exaggerating UP) or irony (meaning the opposite), euphemism SOFTENS a harsh reality without exaggerating or reversing its meaning.",
      "**Worked Example (mixed discrimination, testing all three together)**",
      "\"He passed away peacefully last night.\" → EUPHEMISM (softened way of saying \"died\").",
      "\"I've told you a thousand times to clean your room!\" → HYPERBOLE (obvious exaggeration).",
      "\"The fire station burned down.\" → IRONY (the situation itself is ironic — the place meant to FIGHT fires succumbed to one).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response.",
      "This completes **JSS3 English Studies, Second Term**. Continuing next to **JSS3 English, Third Term**."
    ],
    "checks": [
      "Identify the device in each: \"She was let go from her job.\" / \"I could sleep for a year after that exam.\" / \"The marriage counselor got divorced.\"",
      "Explain the KEY difference between euphemism and irony, using the \"passed away\" (euphemism) versus \"fire station burned down\" (irony) examples — what makes one a softening technique and the other a situational contradiction?"
    ],
    "targets": [
      "Literature: prose — reading and summarizing chapters; distinguishing irony, euphemism, and hyperbole"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "2.1 Punctuation Marks — Comprehensive Review",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "*Per standard scheme, Third Term consolidates the full JSS1-3 English curriculum for BECE. This file provides remaining new content (punctuation, full tense revision) plus structured mixed revision with full worked models.*",
      "**Step 1 — Establish EACH punctuation mark's SPECIFIC function explicitly, including commonly CONFUSED pairs, since vague \"use commas for pauses\" advice is imprecise and leads to errors**",
      "- **Full stop (.)**: ends a complete declarative sentence.",
      "- **Comma (,)**: separates items in a list, separates clauses, or sets off introductory phrases — NOT simply \"wherever you'd pause when speaking\" (a common but imprecise rule; this vague guidance leads to both missing needed commas and inserting unnecessary ones).",
      "- **Semicolon (;)**: joins two CLOSELY RELATED independent clauses (each could stand alone as a full sentence) WITHOUT a conjunction — \"She studied hard; she passed with excellent grades.\" (Notice: a COMMA alone here would be an error, called a \"comma splice\" — a genuinely important distinction, since a comma is NOT strong enough to join two full independent clauses without a conjunction.)",
      "- **Colon (:)**: introduces a list, explanation, or elaboration that follows a complete introductory clause — \"She had three goals: to graduate, to travel, and to start a business.\"",
      "- **Apostrophe (')**: shows POSSESSION (\"Ada's book\") OR marks a CONTRACTION (\"don't\" = \"do not\") — these are TWO DIFFERENT functions of the same mark, and confusing them causes errors like writing \"the dog's are barking\" (incorrectly using possessive apostrophe for a simple plural, which needs NO apostrophe: \"the dogs are barking\").",
      "**Worked Example (testing the comma-splice error explicitly, a genuinely common, exam-relevant mistake)**",
      "INCORRECT (comma splice): \"She was tired, she went to bed early.\" (two independent clauses joined by ONLY a comma — too weak a connection)",
      "CORRECT (three valid fixes): \"She was tired, SO she went to bed early.\" (add a conjunction) OR \"She was tired; she went to bed early.\" (use a semicolon instead) OR \"She was tired. She went to bed early.\" (separate into two sentences).",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Identify and correct the comma splice: \"The rain stopped, we continued our journey.\"",
      "Insert the correct punctuation: \"I need to buy the following items apples bread and milk\" (needs a colon before the list and commas within it).",
      "Correct the apostrophe error: \"The teacher's are meeting in the hall today.\" (identify whether this needs a possessive apostrophe, a plain plural, or something else, and correct it)."
    ],
    "targets": [
      "Grammar: punctuation marks (comprehensive review, incl. comma splices); full tense system revision (3×3 grid incl. perfect aspect)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "2.2 Full Tense System Revision",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "**Step 1 — Present the COMPLETE tense system as a single reference structure, showing how ALL tenses learned across JSS1-JSS3 relate to each other along TWO dimensions: TIME (past/present/future) and ASPECT (simple/continuous/perfect) — the perfect aspect being introduced here as the final missing piece for BECE readiness**",
      "| | Simple | Continuous | Perfect |",
      "|---|---|---|---|",
      "| Present | She walks | She is walking | She has walked |",
      "| Past | She walked | She was walking | She had walked |",
      "| Future | She will walk | She will be walking | She will have walked |",
      "**Step 2 — Establish the PERFECT aspect's meaning explicitly, since it's the least intuitive: it connects a PAST action to a LATER reference point (present, past, or future), emphasizing COMPLETION relative to that point, not just \"when\" something happened**",
      "**Present perfect** (\"has/have + past participle\"): connects a past action to NOW — \"She has finished her homework\" (implies relevance to the PRESENT moment — the homework is done, as of now).",
      "**Past perfect** (\"had + past participle\"): shows an action completed BEFORE another past action/point — \"She had finished her homework before her mother arrived.\" (the finishing happened FIRST, before the arriving — both are in the past, but the perfect form clarifies their ORDER).",
      "**Worked Example (testing present perfect vs simple past, a genuinely tricky distinction for many learners)**",
      "\"She finished her homework.\" (simple past — states a completed past action, no strong link to NOW being emphasized)",
      "\"She has finished her homework.\" (present perfect — emphasizes the CURRENT relevance: the homework is done AS OF NOW, perhaps implying \"so she can play now\" or similar present-relevant meaning)",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Complete the full 3×3 tense grid (as shown above) using the verb \"write\" instead of \"walk.\"",
      "Explain the difference in MEANING/EMPHASIS between \"He ate his food\" (simple past) and \"He has eaten his food\" (present perfect), using the \"connects to now\" reasoning above.",
      "Choose the correct tense: \"By the time the teacher arrived, the students ___ (finish) the test.\" (this requires PAST PERFECT, since the finishing happened BEFORE another past event — the teacher's arrival)."
    ],
    "targets": [
      "Grammar: punctuation marks (comprehensive review, incl. comma splices); full tense system revision (3×3 grid incl. perfect aspect)"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "3.1 Topic Vocabulary — Mass Media",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "**Word family: Mass Media** — broadcast, journalist, headline, editorial, censorship, circulation, propaganda, tabloid.",
      "Worked usage: \"The journalist's editorial criticized what she called government censorship of the press, arguing it undermined the media's role in a democratic society.\"",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Use FIVE words from the \"Mass Media\" word family in a connected paragraph about how news is reported.",
      "Explain, using context, what \"propaganda\" likely means based on this sentence: \"The government used propaganda to convince citizens that the war was necessary, presenting only one side of the conflict.\" (deduce meaning from context, recalling the context-clue method from JSS2)."
    ],
    "targets": [
      "Comprehension: topic vocabulary (Mass Media); full mixed-skill revision passage"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "3.2 Full Mixed Revision — Comprehension Passage With All Skill Types Combined",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "**Step 1 — Present ONE passage tested with MULTIPLE different comprehension skills simultaneously (skimming, scanning, fact/opinion, context clues, purpose), simulating the INTEGRATED nature of a real BECE comprehension section**",
      "**Sample passage:** \"Nigeria's population has grown rapidly over the past decades, now exceeding 200 million people, making it the most populous country in Africa. This growth presents both opportunities and challenges. A large, youthful population could drive economic growth if properly educated and employed. However, rapid population growth also strains infrastructure, healthcare, and educational resources. Some experts argue that family planning education should be prioritized, though this remains a sensitive and debated topic in many communities.\"",
      "**Full mixed question set:**",
      "1. (Scanning) What is Nigeria's approximate population mentioned in the passage?",
      "2. (Skimming/main idea) What is this passage generally about?",
      "3. (Fact vs opinion) Is the statement \"Nigeria is the most populous country in Africa\" a fact or opinion? What about \"family planning education should be prioritized\"?",
      "4. (Context clues) Using surrounding context, what does \"strains\" likely mean in this passage?",
      "5. (Purpose) Is this passage primarily written to inform, persuade, or entertain? Justify your answer.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Answer all FIVE questions above based on the passage, showing your reasoning for each (not just final answers).",
      "Explain why REAL comprehension passages (like this one, and like actual BECE passages) typically test MULTIPLE skills together rather than isolating just one — what does this integrated approach require of a well-prepared student?"
    ],
    "targets": [
      "Comprehension: topic vocabulary (Mass Media); full mixed-skill revision passage"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "4.1 Debate (Oral Composition)",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "**Step 1 — Establish debate's STRUCTURAL requirements: a CLEAR motion (topic), assigned sides (proposing/opposing), and STRUCTURED speaking turns — distinct from a written argumentative essay in that it's PERFORMED and must respond to an OPPONENT'S actual points, not just anticipated counter-arguments**",
      "**Worked Example (a debate opening statement, annotated):**",
      "\"Ladies and gentlemen, I stand before you today to argue in support of the motion: 'Social media does more harm than good to society.'\" — [Annotation: clearly STATES the motion and the speaker's SIDE, immediately, as debate convention requires.]",
      "\"My first point concerns the impact on mental health. Numerous studies have linked excessive social media use to increased rates of anxiety and depression, particularly among young people...\" — [Annotation: presents a POINT with SUPPORTING EVIDENCE (referencing studies), similar to argumentative essay technique, but delivered as SPOKEN rhetoric meant to be persuasive when HEARD, not just read.]",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Write a debate opening statement (3-4 sentences) either supporting OR opposing the motion \"School uniforms should be abolished,\" clearly stating your side and one supporting point.",
      "Explain ONE key difference between preparing for a WRITTEN argumentative essay versus preparing for a SPOKEN debate (consider: in a debate, you must respond to what your OPPONENT actually says — how does this differ from anticipating counter-arguments in an essay you write alone?)."
    ],
    "targets": [
      "Composition: debate (oral composition); full BECE-style mixed essay practice with exam-choice strategy"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "4.2 Full BECE-Style Essay Practice (Mixed Types, Mock Exam Format)",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "**Step 1 — Present a MOCK EXAM SECTION exactly as it would appear on BECE, requiring the student to choose ONE type and write a complete essay, simulating real exam conditions and choice-making**",
      "**Mock Question (as it would appear on the exam paper):**",
      "\"Write on ANY ONE of the following:",
      "(a) Narrative: Describe an experience that taught you an important life lesson.",
      "(b) Argumentative: 'Examinations should be abolished in schools.' Do you agree or disagree? Give reasons for your answer.",
      "(c) Expository: Explain the process of registering to vote in Nigeria.\"",
      "**Step 2 — Model the DECISION-MAKING process a student should go through when CHOOSING which option to answer, since this strategic choice is itself an exam skill rarely taught explicitly**",
      "Reasoning demonstration: \"Option (a) requires a personal experience — if I don't have a strong, specific memory to draw from, this could be hard to make vivid and can end up shallow. Option (b) requires taking a clear stance with solid reasoning — I need to have genuinely thought-through points, not just surface opinions. Option (c) requires factual knowledge of an actual process — if I don't know the REAL steps of voter registration well, I'll struggle to be accurate. Best choice for ME: if I have a strong personal story, I go with (a); if I'm confident arguing a position with solid reasons, I go with (b); if I actually know the voter registration process well, I go with (c).\"",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "Following the SAME decision-making reasoning modeled above, choose ONE of the three options and explain WHY it's the best choice for you specifically (not just \"because it seems easy\").",
      "Write the FULL essay for your chosen option, applying all relevant structural and stylistic techniques learned across JSS1-JSS3 (five-part narrative structure, argumentative counter-argument acknowledgment, or purely explanatory expository tone, as appropriate to your choice)."
    ],
    "targets": [
      "Composition: debate (oral composition); full BECE-style mixed essay practice with exam-choice strategy"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "5.1 Themes and Characterisation — Full Analytical Practice",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "**Step 1 — Apply the FULL literary analysis toolkit (plot, setting, theme, characterisation from JSS1; genre distinctions; figures of speech; poetry structure) to ONE more complex, integrated example, simulating BECE-level literary analysis expectations**",
      "**Worked Example (a more complex thematic analysis, showing multiple layers of interpretation, not just a single surface-level theme)**",
      "For a hypothetical recommended prose text following a young protagonist overcoming poverty through education: a SURFACE theme might be stated simply as \"education is important.\" A DEEPER analytical reading might identify MULTIPLE interconnected themes: the tension between individual ambition and family/community obligation (if the protagonist's success requires leaving family behind), the role of specific mentors/teachers in enabling opportunity, and social commentary on systemic barriers to education for the poor. A strong BECE-level literary response should move BEYOND the surface theme to this kind of multi-layered analysis when space allows.",
      "Practice checkpoint — learner must attempt before AVORA reveals or teaches a model response."
    ],
    "checks": [
      "For a novel, play, or story you have studied, identify ONE surface-level theme and then push further to identify at least ONE deeper, more nuanced theme or tension within the same work.",
      "Explain, using this example, why literary analysis that stops at \"the theme is X\" (a single word/phrase) is generally considered WEAKER than analysis that explores HOW and WHY that theme is developed through specific plot events or characters."
    ],
    "targets": [
      "Literature: themes and characterisation (multi-layered analysis); full revision guidance for recommended texts"
    ]
  },
  {
    "classLevel": "JSS3",
    "subject": "English Language",
    "term": 3,
    "title": "5.2 Full Revision — Recommended Texts",
    "sourceFile": "jss3-english-term3.md",
    "steps": [
      "**Step 1 — Establish the FINAL exam-preparation approach for recommended texts: since Avora's content here uses flexible example passages (as noted throughout this curriculum), the STUDENT must map these ANALYTICAL SKILLS onto their OWN specific assigned texts for full BECE readiness**",
      "**Practice Questions (to be completed by the student using their own assigned texts):**",
      "1. For your assigned prose text, identify the plot, setting, theme(s), and characterisation of the MAIN character, using the full framework established across JSS1-JSS3.",
      "2. For your assigned drama text, identify the central conflict, climax, and resolution, and name at least TWO figures of speech used within it.",
      "3. Write a full practice essay answering a typical exam-style question on your assigned text (e.g., \"Discuss the character development of [protagonist] in [text title]\"), applying the deep, multi-layered analytical approach modeled above.",
      "This completes **JSS3 English Studies — all three terms**, and with it, **the ENTIRE JSS1–JSS3 Mathematics and English Studies curriculum is now fully built** at the Deep Teaching Standard: zero assumed knowledge, concept-first derivation, multiple worked examples with explicit misconception testing, described diagrams for Avora's whiteboard, and exam-ready practice throughout both subjects."
    ],
    "checks": [],
    "targets": [
      "Literature: themes and characterisation (multi-layered analysis); full revision guidance for recommended texts"
    ]
  }
];

const courseName=(c:string,s:string,t:number)=>`SOURCE COURSE · ${c} ${s} · Term ${t}`;
export function getSentCourseNames(classLevel:string,subject:string):string[]{
 return [...new Set(sentUnits.filter(x=>x.classLevel===classLevel&&x.subject===subject).map(x=>courseName(x.classLevel,x.subject,x.term)))];
}
function isLearnerTeachingUnit(x:SentUnit){
 // Internal quick-reference/authoring units are useful provenance, not primary live lessons.
 return !/core formula\s*&\s*method reference|recall,?\s*not re-derivation|internal reference/i.test(x.title);
}
function learnerText(values:string[],fallback:string){
 for(const value of values){const safe=sanitizeSourceForLearner(value);if(safe)return safe}
 return fallback;
}
function toTutorUnit(x:SentUnit):TutorUnit{
 const checks=x.checks.filter(Boolean);
 const first=learnerText(x.steps,`We will build ${x.title} carefully from the underlying idea before applying it.`);
 const example=learnerText(x.steps.filter(v=>/worked example|example/i.test(v)),first);
 const safeCheck=learnerText(checks,`Explain the central idea of ${x.title} in your own words and show one application.`);
 return {
  title:`Source lesson · ${x.title}`,
  terms:[],
  why:`This lesson builds the understanding needed for ${x.title}. We will establish the idea, explain why it works, apply it carefully, and check your understanding before moving on.`,
  prerequisites:[],
  outcomes:[`Understand and apply ${x.title} with clear reasoning rather than memorising a compressed rule.`],
  explain:first,
  example,
  check:safeCheck,
  commonMistakes:[],
  sourceOrigin:x.sourceFile,
  sourceSteps:x.steps,
  sourceChecks:checks,
  sourceSolutions:x.sourceSolutions||[],
  structuredSteps:structureTeachingSteps(x.steps,checks),
  noJumpChecks:['present every supplied source step in sequence','do not omit supplied examples or reasoning bridges','pause for supplied practice questions before revealing/teaching answers','preserve correct learner work and teach from the first gap']
 };
}
export function getSentCurriculumUnits(classLevel:string,subject:string,topic:string):TutorUnit[]{
 const accepted=new Set([topic,...legacyTargetsForOfficialTopic(classLevel,subject,topic)]);
 return sentUnits.filter(x=>isLearnerTeachingUnit(x)&&x.classLevel===classLevel&&x.subject===subject&&x.targets.some(target=>accepted.has(target))).map(toTutorUnit);
}
export function getSentCurriculumCourse(classLevel:string,subject:string,topic:string):TutorPlan|undefined{
 const m=/^SOURCE COURSE · (JSS[123]) (Mathematics|English Language) · Term ([123])$/.exec(topic);
 if(!m||m[1]!==classLevel||m[2]!==subject)return undefined;
 const term=Number(m[3]);
 const units=sentUnits.filter(x=>isLearnerTeachingUnit(x)&&x.classLevel===classLevel&&x.subject===subject&&x.term===term).map(toTutorUnit);
 if(!units.length)return undefined;
 return {goal:`Teach every supplied ${classLevel} ${subject} Term ${term} source lesson completely and in order.`,why:'This course is source-backed. Coverage is complete only when every source unit and supplied learner checkpoint has been taught, attempted and recorded.',outcomes:[`Cover all ${units.length} supplied source units for this term without replacing them with summaries.`],units};
}
export function sentCurriculumAudit(){return {units:sentUnits.length,steps:sentUnits.reduce((n,x)=>n+x.steps.length,0),checks:sentUnits.reduce((n,x)=>n+x.checks.length,0),unmapped:sentUnits.filter(x=>!x.targets.length).map(x=>({sourceFile:x.sourceFile,title:x.title}))};}
