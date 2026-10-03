export type Revised2025SupplementalLesson={topicId:string;classLevel:'JSS1'|'JSS2';subject:'Mathematics'|'English Language';strand:string;topic:string;source:{authority:'NERDC Revised BEC 2025';url:string;verified:'OFFICIAL_PLUS_SCHEME_CROSSCHECK'|'OFFICIAL_PLUS_TEXTBOOK_CROSSCHECK'|'OFFICIAL_PLUS_TEXTBOOK_AND_READING_RESEARCH_CROSSCHECK'|'OFFICIAL_PLUS_TEXTBOOK_AND_READING_PEDAGOGY_CROSSCHECK'|'OFFICIAL_PLUS_TEXTBOOK_AND_COMPREHENSION_PEDAGOGY_CROSSCHECK'|'OFFICIAL_PLUS_TEXTBOOK_SUMMARY_PEDAGOGY_CROSSCHECK'|'OFFICIAL_SCOPE_WITH_GRAMMAR_REFERENCE_CROSSCHECK'};objectives:string[];prerequisites:string[];teaching:string[];workedExamples:string[];misconceptions:string[];guidedPractice:string[];independentPractice:string[];mastery:{criterion:string;status:'DEEP_WHEN_PASSED'};boardReady:true};
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
      "Explain conversation as purposeful two-way spoken communication",
      "Initiate, sustain and close age-appropriate conversations",
      "Listen actively, take turns and respond relevantly",
      "Ask useful questions and build on another speaker's contribution",
      "Agree and disagree respectfully while giving reasons",
      "Discuss current national and global issues including the economy, security, education, out-of-school children and climate change",
      "Select and use appropriate registers and issue-specific vocabulary"
    ],
    "prerequisites": [
      "basic sentence formation",
      "listening for meaning",
      "basic polite expressions"
    ],
    "teaching": [
      "Conversation is a two-way exchange of spoken ideas, information, feelings or opinions. Unlike a speech, it requires participants to listen and respond to one another. A successful conversation therefore has both speaking and listening.",
      "Every conversation has a topic, participants, purpose and situation. The topic is what is being discussed; the participants are the speakers; the purpose may be to inform, ask, explain, solve a problem or exchange opinions; the situation helps determine the language that is appropriate.",
      "A conversation normally develops through opening, development and closing. An opening introduces the topic or greets the other speaker. The development contains connected turns, questions, explanations and responses. A closing ends the exchange politely or summarises what has been agreed.",
      "Turn-taking means speakers share the conversation. Listen while another person speaks, avoid unnecessary interruption, respond to the point made, then allow the other person another opportunity to speak. Good turn-taking makes discussion cooperative rather than competitive.",
      "Active listening can be shown through relevant responses and follow-up questions: “I understand.” “Why do you think that happened?” “Could you explain what you mean?” “You mentioned school attendance; how can the community help?” These responses prove that the next turn grows from the previous one.",
      "A relevant response answers or develops what was actually said. If A says, “Many pupils are absent because the road floods during heavy rain,” B might ask, “Could better drainage make the route safer?” A reply about a football match would break the flow because it does not connect to the topic.",
      "Questions keep conversation moving. Closed questions often request a short fact: “When did the programme begin?” Open questions invite explanation: “Why do you think some children remain out of school?” Follow-up questions connect directly to an earlier answer: “You said cost is a problem; which school expenses create the greatest difficulty?”",
      "Agreement should be meaningful. Instead of only saying “Yes,” a learner can say, “I agree that keeping drains clear can reduce local flooding because blocked drains prevent water from flowing away.” The reason shows understanding.",
      "Respectful disagreement attacks the idea, not the person. Useful patterns include “I understand your point, but…”, “I see it differently because…”, “That may be true in some cases; however…”, and “Could we also consider…?” Insults and ridicule weaken discussion.",
      "Register means the kind of language chosen for a particular subject, audience and situation. Register includes vocabulary, expressions and level of formality. A conversation with a close friend may be informal; a discussion with a teacher, public official or invited expert normally requires more formal and respectful language.",
      "Register is also connected to subject matter. Each field has useful vocabulary. In a discussion of the economy, words such as income, prices, goods, services, employment, budget and cost of living may be relevant. In security, words such as safety, prevention, emergency, reporting, protection and community may be appropriate.",
      "Do not force difficult vocabulary into every sentence. Appropriate register means choosing words that make the idea accurate and suitable for the audience. Clear ordinary English is better than impressive words used incorrectly.",
      "Before discussing a current issue, separate facts from opinions. A fact is a claim that can be checked against reliable evidence; an opinion expresses a judgement or view. Current issues can change, so learners should use recent, trustworthy sources and avoid presenting rumours as facts.",
      "When introducing information from a source, use responsible expressions such as “According to the report…”, “The article states that…”, or “The information we found suggests…”. If the information has not been verified, do not present it confidently as established fact.",
      "A productive issue discussion can follow ISSUE → CAUSES → EFFECTS → POSSIBLE SOLUTIONS. First state the problem clearly, discuss reasons it may occur, explain its consequences, then propose realistic responses. Different speakers may disagree about causes or solutions while still remaining respectful.",
      "ECONOMY refers broadly to how people and institutions produce, exchange and use goods, services and resources. At JSS1 level, a conversation can discuss prices, family budgeting, employment, saving, needs and wants, local businesses and cost of living without requiring advanced economic theory.",
      "Useful economy register includes economy, income, expenditure, budget, savings, price, cost, goods, services, employment, business, production and consumer. Example: “If food prices rise while a family's income stays the same, the family may need to revise its budget and prioritise essential needs.”",
      "SECURITY concerns protection from danger and actions that improve safety. School-level discussion may cover personal safety, road safety, school security, cyber safety, community awareness and responsible reporting. Learners should discuss prevention and safe help-seeking, not dangerous operational details.",
      "Useful security register includes safety, security, risk, prevention, emergency, protect, report, authority, suspicious, alert and community. Example: “Students should report a serious safety concern to a trusted adult or appropriate authority rather than spread an unverified rumour.”",
      "OUT-OF-SCHOOL CHILDREN are children of school age who are not attending school. A discussion may explore barriers such as poverty, distance, displacement, disability, family circumstances or lack of access, while avoiding the assumption that every child's situation has the same cause.",
      "Useful education and out-of-school register includes education, enrolment, attendance, access, learning, school-age child, barrier, support, inclusion, fees/costs, classroom and community. Possible solutions should match the cause being discussed; one solution cannot solve every barrier.",
      "CLIMATE CHANGE refers to long-term changes in climate patterns. A JSS1 conversation can focus on observable impacts and responsible responses such as heat, changing rainfall patterns, flooding risks, environmental care, waste management, tree protection and community preparedness, while distinguishing long-term climate from today's weather.",
      "Useful climate register includes climate, weather, rainfall, temperature, flooding, drought, environment, pollution, emissions, waste, adaptation and conservation. Example: “Heavy rain on one day is weather; climate discussion concerns patterns and changes observed over much longer periods.”",
      "EDUCATION discussions may cover attendance, learning materials, teacher support, reading habits, safe learning environments and access to school. DRUG ABUSE may be discussed using health- and safety-focused language such as misuse, harmful effects, prevention, support and trusted adult, without glamorising harmful substances.",
      "Problem-solving conversation should move beyond complaining. After identifying a problem, ask: What can an individual do? What can a school or family do? What may require community or government action? Which suggestion is realistic, safe and relevant to the cause?",
      "To prepare for a group discussion, research the issue, note a few reliable facts, learn the important vocabulary, decide the main point you want to contribute, and prepare questions for other speakers. During the discussion, listen and adjust your response instead of reciting a memorised speech.",
      "After a conversation, evaluate four things: relevance—did each turn stay connected to the issue? register—were words suitable for topic and audience? interaction—did speakers listen, question and take turns? reasoning—were claims explained and solutions supported?"
    ],
    "workedExamples": [
      "Conversation structure: A: “Good afternoon. Our group is discussing why some learners miss school regularly.” B: “One possible barrier is transport. Some learners live far from school.” A: “That is important. How might distance affect attendance during heavy rain?” B: “Travel may become more difficult, so safer transport or a closer learning option could help.” The exchange opens a topic, develops it through connected turns and uses a follow-up question.",
      "Relevant versus irrelevant response: A: “Food prices have increased in the market.” Relevant B: “How has that affected what families can buy with the same budget?” Irrelevant B: “My favourite subject is English.” The relevant response develops the economic issue.",
      "Register example: Informal friend-to-friend: “I think we should talk to the teacher about the broken gate.” More formal school meeting: “I suggest that we report the damaged gate to the school management because it may create a safety risk.” Both can communicate the same basic idea, but audience and situation change the register.",
      "Economy dialogue: A: “What does a budget help a family do?” B: “It helps the family plan how available income will be spent.” A: “What might happen when prices rise?” B: “The same amount of money may buy fewer goods, so the family may need to prioritise needs and reduce some non-essential spending.”",
      "Security dialogue: A: “Should students forward every alarming message they receive?” B: “No. They should first check whether the information is reliable and tell a trusted adult if there is a genuine safety concern.” A: “Why?” B: “Because spreading an unverified warning can create confusion or panic.”",
      "Out-of-school children dialogue: A: “Why might a child of school age be out of school?” B: “There can be different barriers, including cost, distance, displacement or lack of suitable access.” A: “So is one solution enough for every child?” B: “No. The response should address the particular barrier affecting the child.”",
      "Climate dialogue: A: “Is one very hot afternoon enough to prove climate change?” B: “No. A single day's condition is weather. Climate refers to patterns over a much longer period.” A: “What can communities still discuss?” B: “They can discuss long-term changes, flooding risk, waste management, tree protection and ways to prepare for environmental effects.”",
      "Respectful disagreement: A: “I think punishment alone will solve school lateness.” B: “I understand why rules matter, but I do not think punishment alone addresses every cause. A learner who arrives late because of transport difficulties may need a different solution.” B disagrees with the proposal without insulting A.",
      "Fact and opinion: “The report recorded 120 pupils” is a checkable factual claim if the report exists. “The programme is the best solution” is an evaluation that needs reasons. A good speaker does not present both statements as if they have the same kind of evidence.",
      "Problem-solving model: Issue—plastic waste blocks a drain. Cause—waste is dumped carelessly and collection is inadequate. Effect—water flow is obstructed and local flooding risk may increase. Possible responses—better disposal habits, reliable collection, clearing blocked drains safely and community education. Speakers can then discuss which response is practical and who is responsible."
    ],
    "misconceptions": [
      "thinking conversation means delivering a memorised speech while others wait",
      "interrupting or dominating the exchange instead of sharing turns",
      "replying with an unrelated point because it was prepared beforehand",
      "using slang or casual expressions in every situation regardless of audience",
      "believing register means using unnecessarily difficult vocabulary",
      "disagreeing by insulting the speaker rather than examining the idea",
      "presenting rumours or outdated claims as facts during discussion of current issues",
      "assuming every out-of-school child has the same reason for not attending school",
      "confusing one day's weather with long-term climate",
      "listing problems without discussing causes, effects or realistic solutions"
    ],
    "guidedPractice": [
      "Sort twelve expressions into suitable formal, informal or issue-specific registers and explain the audience or situation for each.",
      "Complete four short dialogues by choosing the response that most logically follows the previous speaker.",
      "Practise asking closed, open and follow-up questions about one school issue.",
      "In pairs, discuss rising household costs for six turns using at least four appropriate economy terms and one respectful agreement or disagreement.",
      "In groups, choose security, education, out-of-school children or climate change and organise the discussion as issue → causes → effects → possible solutions.",
      "Use a recent teacher-approved newspaper, magazine or online source to identify one checkable fact and one opinion about a current issue, then practise attributing the information accurately."
    ],
    "independentPractice": [
      "Prepare and perform an eight-turn conversation on a current national or global issue. Include an opening, at least two follow-up questions, relevant responses, appropriate register, one supported agreement/disagreement and a polite closing.",
      "Choose one issue from economy, security, education, out-of-school children, climate change or drug abuse. Create a vocabulary bank of twelve relevant words, then use at least eight correctly in a conversation.",
      "Research one current issue using two reliable sources. Record source/date, three verified facts and two possible solutions; then discuss the issue without presenting opinion as fact.",
      "Self-assess a recorded conversation for relevance, turn-taking, register, vocabulary, clarity, evidence and respectful interaction."
    ],
    "source": {
      "authority": "NERDC Revised BEC 2025",
      "url": authorityUrl,
      "verified": "OFFICIAL_PLUS_TEXTBOOK_CROSSCHECK"
    },
    "mastery": {
      "criterion": "Learner sustains an issue-based conversation for at least eight connected turns, uses appropriate issue-specific register, asks and answers relevant questions, disagrees respectfully, distinguishes sourced facts from opinions, and contributes a reasoned solution with at least 80% on the associated mastery exercise.",
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
      "Explain reading fluency and its major components",
      "Read short age-appropriate passages accurately and with understanding",
      "Read at an appropriate speed without sacrificing meaning",
      "Group words into meaningful phrases rather than reading word by word",
      "Use punctuation, stress and intonation to support meaning",
      "Avoid habits that unnecessarily slow or disrupt reading",
      "Self-correct important reading errors and reread smoothly",
      "Improve oral reading through modelled and repeated reading"
    ],
    "prerequisites": ["word recognition","basic punctuation","sentence meaning","basic pronunciation"],
    "teaching": [
      "Reading fluency means reading a text accurately, at a suitable pace, with meaningful phrasing and expression, while still understanding what is read. Fluency is not a race. A reader who moves very fast but changes words, ignores punctuation or cannot explain the passage is not reading fluently.",
      "Five ideas work together in fluent reading: ACCURACY—saying the printed words correctly; RATE—moving at an appropriate speed; COMPREHENSION—understanding the message; PHRASING—grouping words that belong together; and PROSODY—using stress, rhythm, pauses and intonation so the reading reflects meaning.",
      "Accuracy comes first. Look carefully at the whole word. If you misread a word, check its letters and the meaning of the sentence, correct it, then reread the whole phrase. Self-correction is a reading skill; silently noticing an error but continuing with broken meaning is not enough.",
      "Appropriate speed is neither painfully slow nor uncontrolled. Slow word-by-word reading can overload attention because the reader reaches the end of a sentence after forgetting its beginning. Excessive speed can cause skipped words and lost meaning. The goal is an efficient pace at which words, phrases and ideas remain clear.",
      "Comprehension is part of fluency. Before reading, know your purpose. During reading, keep asking: What is happening? What is the main point? Does this sentence make sense with what came before? After reading, you should be able to state the central message or answer basic questions.",
      "Phrasing means reading words in sense groups. Compare: “After / the / rain / the / children / returned / to / the / field” with “After the rain, / the children returned to the field.” The second grouping carries meaning more naturally. Do not pause mechanically after every word.",
      "Punctuation guides phrasing and expression. A full stop normally signals the end of a complete statement and a clear pause. A comma often marks a shorter boundary. A question mark tells us the sentence is a question. An exclamation mark can signal strong feeling or emphasis. Punctuation guides meaning; it is not merely decoration.",
      "Prosody is the expressive side of fluent reading. It includes appropriate stress, rhythm, pausing and intonation. A warning, question, exciting announcement and sad statement should not all sound flat and identical. Expression should come from the meaning of the text, not from random dramatic shouting.",
      "Word stress also affects clarity. Important content words may receive natural emphasis in a sentence, while function words are often lighter. However, do not exaggerate every important word. Read for the thought being communicated.",
      "Before reading a short passage, preview it. Notice the title, paragraphing, unfamiliar names, difficult words and punctuation. Decide why you are reading. A brief preview reduces avoidable stumbling and gives the mind a framework for meaning.",
      "NERDC identifies conditions and habits that support faster, more efficient reading: good eyesight, avoiding unnecessary vocalisation during silent speed reading, avoiding regressive reading, increasing eye span and reading phrases rather than isolated words.",
      "Good eyesight matters because the eyes must recognise print clearly. Persistent difficulty seeing the board or page should not be treated as laziness or a reading fault; the learner should tell a responsible adult so that vision can be checked.",
      "Vocalisation means saying every word aloud or moving the lips while trying to read silently. Oral reading is necessary when practising pronunciation and expression, but unnecessary vocalisation can restrict speed when the task specifically requires efficient silent reading.",
      "Regressive reading means repeatedly jumping backward to words already read even when there is no genuine need. Occasional rereading is useful when meaning is unclear; the problem is habitual backtracking that breaks the flow. Train yourself to move forward while monitoring meaning.",
      "Eye span refers to how much useful print the eyes can take in at one fixation. Fluent readers increasingly recognise groups of words rather than fixing separately on every tiny unit. Phrase reading supports both wider visual grouping and better meaning.",
      "Finger, pencil or ruler tracking can help a beginning reader temporarily, but habitual pointing at every single word can encourage word-by-word reading. As recognition improves, practise allowing the eyes to move through meaningful groups.",
      "Do not confuse skimming or scanning with fluent passage reading. Scanning searches rapidly for a specific item; skimming gathers the broad idea. Fluent reading of a short passage aims to carry the connected meaning accurately and naturally.",
      "Repeated reading is purposeful rereading, not empty repetition. First reading: secure the words and meaning. Second reading: improve phrase grouping and punctuation. Third reading: improve smoothness and expression. Feedback should identify a specific target rather than simply saying “read faster.”",
      "A useful self-check after reading is ACCURACY—Did I change or omit important words? PHRASING—Did I group ideas naturally? EXPRESSION—Did punctuation and meaning affect my voice? MEANING—Can I explain what I read? CORRECTION—Did I repair important mistakes?",
      "Fluency develops through practice with many texts. A learner should eventually transfer the skill from a practised passage to a fresh passage. Memorising one passage is not evidence that the learner can read unfamiliar text fluently."
    ],
    "workedExamples": [
      "Phrase grouping: “Before the match, / our coach reminded us / to remain calm.” The slashes mark sense groups, not compulsory long pauses. Read each group as one connected idea.",
      "Punctuation: “Stop!” should not sound like “Stop?” The exclamation mark and question mark communicate different purposes. Let the voice reflect the sentence meaning.",
      "Self-correction: Printed text: “The pupils planted trees beside the road.” If a learner reads “plants,” the grammar and print do not match. Correct “planted,” then reread: “The pupils planted trees / beside the road.”",
      "Rate versus meaning: Racing through “Because the bridge was flooded, the driver turned back” and missing “flooded” destroys the cause of the action. A slightly slower accurate reading is more fluent than a faster inaccurate one.",
      "Repeated reading target 1: First attempt has several hesitations. Before the second attempt, practise only the difficult words. Then reread the complete sentence so the repaired words fit smoothly into meaning.",
      "Repeated reading target 2: Accurate but robotic reading. Mark phrase groups: “At sunrise, / the farmers entered the field / and began their work.” Reread without stopping after every word.",
      "Expression: “Did you lock the gate?” is a genuine question. “What a beautiful performance!” expresses a reaction. “Please remain seated until the bus stops.” is an instruction. Their delivery should not be identical.",
      "Comprehension check: Passage: “Amina noticed dark clouds before school. She carried an umbrella. At noon, heavy rain began.” Main point: Amina prepared for expected rain. Fluency includes retaining this connected meaning while reading.",
      "Eye movement: Instead of visually treating “the / new / science / laboratory” as four disconnected stops, practise recognising “the new science laboratory” as a meaningful group.",
      "Useful rereading versus regression: Going back once because a pronoun is unclear is strategic rereading. Jumping backward after nearly every phrase from habit is regressive reading and disrupts flow."
    ],
    "misconceptions": [
      "believing the fastest reader is automatically the most fluent",
      "thinking fluency means oral speed only and has nothing to do with comprehension",
      "pausing after every printed word",
      "ignoring commas, full stops, question marks and exclamation marks",
      "reading every sentence in a flat voice regardless of meaning",
      "guessing difficult words from their first letter and continuing without checking",
      "refusing to self-correct because correction feels like failure",
      "believing repeated reading means racing through the same passage several times",
      "thinking all rereading is bad; strategic rereading for lost meaning can be useful",
      "using finger or ruler tracking forever even when it prevents phrase reading",
      "assuming a memorised performance proves fluency on unfamiliar text",
      "sacrificing accuracy and understanding merely to improve a timer score"
    ],
    "guidedPractice": [
      "MODEL PASSAGE — The School Garden: “Early on Saturday, members of the Environmental Club gathered behind the science block. / Some loosened the soil, / while others planted vegetable seeds. / Their teacher showed them how to water the beds without washing the seeds away. / By noon, the tired pupils were smiling / because the neglected corner had begun to look like a real garden.” First listen to/model the passage, then identify difficult words, mark sense groups, read aloud, answer what the pupils did and why they smiled, receive one specific fluency target, and reread.",
      "PUNCTUATION PRACTICE — Read: “Wait, Tunde!” “Wait, Tunde?” and “Wait, Tunde.” Discuss how punctuation and intended meaning change the delivery without changing the words.",
      "PHRASE PRACTICE — Re-group: “When the bell rang the students who had finished their work walked quietly to the hall.” Suggested grouping: “When the bell rang, / the students who had finished their work / walked quietly to the hall.” Explain why each group belongs together.",
      "ERROR REPAIR — Teacher/AVORA deliberately substitutes, omits or repeats a word in a short sentence. Learner identifies the mismatch, checks print and meaning, corrects it, and rereads the whole phrase.",
      "REPEATED READING — Read one 100–140 word passage three times. Attempt 1 targets accurate word recognition and meaning; attempt 2 targets phrasing/punctuation; attempt 3 targets smoothness/expression. Compare improvement rather than merely comparing speed."
    ],
    "independentPractice": [
      "PASSAGE A — The Library Card: “Bola had visited the school library many times, but she had never borrowed a book. On Monday, the librarian explained how the borrowing system worked. Bola completed a small form and received her library card. She chose a book about Nigerian wildlife, checked the return date carefully, and placed the card inside her purse. On her way home, she decided to read one chapter before dinner. She was pleased that the library could now become part of her weekly study routine.” Read once for meaning, mark phrase boundaries, practise difficult words, then make two oral readings. Afterwards state why Bola was pleased.",
      "PASSAGE B — A Sudden Change: “The football practice began under a bright sky. Half an hour later, the wind became stronger and dark clouds gathered above the field. The coach blew his whistle and asked everyone to move into the hall. Moments after the last player entered, rain swept across the playground. The team could not continue outside, so the coach used the remaining time to discuss their next match.” Read naturally and explain the sequence of events without looking back at every sentence.",
      "Record or have a partner listen to one fresh passage. Mark each omitted, substituted or added word; note unnecessary pauses and successful self-corrections; then reread once with one clear improvement goal.",
      "Silent-reading transfer: read a short unfamiliar passage without lip movement or word-by-word pointing, then give the main idea and two supporting details. Reread strategically only where meaning was genuinely unclear."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_PLUS_TEXTBOOK_AND_READING_RESEARCH_CROSSCHECK"},
    "mastery": {
      "criterion": "On an unfamiliar age-appropriate short passage, learner reads with high word accuracy, appropriate pace, meaningful phrase grouping, punctuation-sensitive expression and successful comprehension, while self-correcting major miscues; learner also demonstrates efficient silent-reading habits and achieves at least 80% on the associated mastery exercise.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-reading-for-meaning",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading passages for meaning",
    "objectives": [
      "Explain main idea and supporting idea/detail",
      "Identify the subject or topic of a paragraph before deciding its main idea",
      "Identify stated and implied main ideas in age-appropriate paragraphs",
      "Select details that genuinely support a main idea",
      "Differentiate main ideas from examples, facts, reasons, descriptions and minor details",
      "Use paragraph evidence to justify a chosen main idea",
      "Identify the main idea of a multi-paragraph passage from its paragraph-level ideas",
      "Read and comprehend passages on NERDC-specified contemporary and civic themes"
    ],
    "prerequisites": ["reading complete sentences","basic vocabulary in context","recognising paragraph boundaries"],
    "teaching": [
      "Reading for meaning means reading to understand what a text communicates, not merely pronouncing its words. In this NERDC topic, the central skill is distinguishing MAIN IDEAS from SUPPORTING IDEAS or DETAILS.",
      "Begin with the TOPIC. The topic is the general subject being discussed and is often expressed in a word or short phrase such as “road safety” or “artificial intelligence.” The MAIN IDEA is a complete thought explaining the most important point the writer makes about that topic.",
      "Example: “Trees help a school environment in several ways. They provide shade during hot weather. Their roots can help hold soil together. They can also make the compound more pleasant.” Topic: trees in the school environment. Main idea: Trees benefit the school environment in several ways. The remaining sentences support that idea.",
      "A SUPPORTING IDEA or DETAIL develops the main idea. It may give a reason, example, fact, explanation, description, cause, effect or evidence. A supporting detail is important, but it does not usually cover the whole paragraph.",
      "Use the UMBRELLA TEST. The main idea should be broad enough to cover most of the important details beneath it. If a proposed main idea explains only one sentence while several other sentences are left outside, it is probably too narrow.",
      "Use the TOO-BROAD TEST as well. “Life is important” may be related to a paragraph about wearing seat belts, but it is so general that it does not accurately capture what that particular paragraph says. A good main idea is neither too narrow nor too broad.",
      "Ask four questions: (1) What or who is this paragraph mainly about? (2) What is the writer saying about it? (3) Which sentence or statement covers most of the important details? (4) Which details prove or explain that statement?",
      "A TOPIC SENTENCE often states the main idea directly, but do not assume that the first sentence is always the main idea. A topic sentence may appear at the beginning, middle or end, and sometimes the main idea is implied rather than stated word-for-word.",
      "When the main idea is IMPLIED, combine the repeated or closely related details. Example: “Musa checks the source before forwarding a message. He compares the claim with another reliable source. He also checks when the information was published.” No sentence says it directly, but the details imply: Musa verifies information before accepting or sharing it.",
      "Repeated key words, synonyms and related ideas can reveal the paragraph's focus. However, counting repeated words alone is not enough; decide what complete message the writer builds around them.",
      "Signal expressions can reveal the role of details. “For example” often introduces an illustration; “because” may introduce a reason; “therefore” may introduce a result; “however” signals contrast; “first, next, finally” show sequence. These signals help the reader see how supporting information is organised.",
      "A main idea must come from the text. Do not choose an answer simply because it is true in real life or because you personally agree with it. Ask: Does the passage actually develop this idea?",
      "To identify a paragraph's main idea reliably, use TOPIC → CLAIM → SUPPORT. Name the topic, state the writer's central claim about it, then point to two or more details that support that claim.",
      "In a multi-paragraph passage, each paragraph may have its own main idea. The whole passage also has an overall central idea. Build upward: identify the main idea of each paragraph, then ask what larger message connects them.",
      "Titles can help predict a passage's subject, but the title is not automatically the main idea. Read the passage and confirm the writer's actual message.",
      "NERDC expects learners to practise this skill through passages on varied issues. The purpose is not to memorise facts about each theme; the purpose is to transfer the same reading-for-meaning strategy to unfamiliar content.",
      "ARTIFICIAL INTELLIGENCE passage reading: distinguish what the text actually says AI can do from exaggerated claims. A supporting example of a tool is not automatically the paragraph's main idea.",
      "INFORMATION LITERACY means being able to find, examine and use information responsibly. In a passage, details such as checking author, source, date and evidence may support a broader main idea about verifying information before sharing it.",
      "PATRIOTISM can be presented through responsible actions that contribute to one's country or community. When reading, identify the writer's particular message rather than assuming every patriotic passage has exactly the same main idea.",
      "PEACEFUL COEXISTENCE passages may contain details about respect, tolerance, dialogue and cooperation. Decide what larger statement those details jointly support.",
      "ROAD SAFETY passages may use examples such as pedestrian crossings, seat belts, helmets or obeying traffic rules. The main idea should cover the set of safety details rather than merely repeat one example.",
      "DISASTER RISK REDUCTION concerns actions that reduce harm before or during hazards. In a reading passage, preparation, warnings and safe procedures may all support a central idea about reducing risk.",
      "HUMAN TRAFFICKING passages should be read with safeguarding in mind. Focus on the text's prevention, awareness and safe help-seeking message. Do not invent frightening details that are not in the passage.",
      "CYBER SECURITY passages may discuss strong passwords, suspicious links, privacy or reporting problems. If several such details appear together, look for the broader online-safety idea that unites them.",
      "MENTAL HEALTH passages should be handled respectfully. Details about healthy routines, seeking support from trusted adults, rest and social connection may support a broader message about caring for wellbeing; do not diagnose a person from a reading passage.",
      "When answering a main-idea question, briefly prove your choice: “The main idea is ___ because the paragraph explains ___, ___ and ___.” Evidence prevents guessing.",
      "When asked for supporting ideas, choose details that directly explain or prove the main idea. An interesting sentence can still be irrelevant to the main idea.",
      "After reading, try the ONE-SENTENCE TEST: state what the paragraph is mainly saying in one accurate sentence. If your sentence contains only a tiny example, widen it. If it could fit hundreds of unrelated passages, make it more specific."
    ],
    "workedExamples": [
      "MAIN IDEA versus TOPIC: “Regular exercise can help young people stay healthy. It strengthens the body, can improve fitness and can support healthy routines.” Topic: exercise. Main idea: Regular exercise can help young people stay healthy. Supporting ideas: stronger body, improved fitness and healthier routines.",
      "TOO NARROW: Passage details mention seat belts, pedestrian crossings and obeying traffic lights. “Seat belts are useful” is supported but too narrow to cover the other details. A stronger main idea is: Following road-safety rules reduces avoidable danger.",
      "TOO BROAD: For the same road-safety paragraph, “Safety is important everywhere” is too broad. It does not capture the specific message developed by the passage.",
      "STATED MAIN IDEA: “Good information habits protect people from false claims. Before sharing a message, check who produced it, when it was published and whether reliable evidence supports it.” The first sentence states the main idea; the second supplies supporting actions.",
      "IMPLIED MAIN IDEA: “Ada uses a different strong password for important accounts. She does not give her password to friends. When a strange link arrives, she checks before opening it.” Implied main idea: Ada follows safe online habits. No sentence states those exact words, but all three details support them.",
      "SUPPORT TEST: Main idea: “The school reduced waste through organised action.” Detail A: labelled bins were placed around the compound. Detail B: pupils learned how to separate waste. Detail C: the principal likes football. C may be true, but it does not support the main idea.",
      "PEACEFUL COEXISTENCE: “Students from different backgrounds worked together on the class project. They listened when opinions differed, divided the tasks fairly and solved disagreements through discussion.” Main idea: Respectful cooperation helps people with differences work peacefully together.",
      "AI: “Artificial intelligence can help computer systems perform tasks that normally require aspects of human intelligence, such as recognising patterns or generating responses. However, users still need to check important outputs because an AI system can produce inaccurate information.” Main idea: AI can perform useful tasks, but its important outputs should still be checked. Supporting ideas: examples of AI tasks and the possibility of inaccurate output.",
      "DISASTER RISK REDUCTION: “Before the rainy season, residents cleared blocked drainage channels and learned the community's emergency contacts. During heavy rain, families followed official warnings about unsafe areas.” Main idea: Preparation and attention to warnings can reduce disaster risk.",
      "MULTI-PARAGRAPH METHOD: Paragraph 1 explains why a rumour can spread quickly online. Paragraph 2 explains checking the source and date. Paragraph 3 explains comparing a claim with reliable evidence. Overall idea: Careful verification helps people avoid spreading unreliable online information."
    ],
    "misconceptions": [
      "thinking the topic and main idea are the same thing",
      "automatically choosing the first sentence as the main idea",
      "choosing the most dramatic or interesting detail instead of the central idea",
      "selecting an answer that is true generally but not developed by the passage",
      "choosing a statement too narrow to cover most supporting details",
      "choosing a statement so broad that it could fit many unrelated passages",
      "assuming every paragraph states its main idea explicitly",
      "treating every sentence as equally important",
      "using the title alone without confirming it against the passage",
      "adding personal opinions when asked what the writer's main idea is",
      "confusing an example introduced by “for example” with the larger idea it illustrates",
      "memorising issue facts instead of learning a transferable reading strategy"
    ],
    "guidedPractice": [
      "PASSAGE 1 — Information Literacy: “A message may look convincing and still be unreliable. Before sharing it, a careful reader checks who created it, when it was published and whether trustworthy evidence supports the claim. Comparing the information with another reliable source can also expose errors.” Identify topic, main idea and four supporting details. Explain why “checking the publication date” alone is too narrow to be the main idea.",
      "PASSAGE 2 — Road Safety: “Many road injuries can be prevented when road users follow safety rules. Pedestrians should use safe crossing points where available. Vehicle occupants should use appropriate restraints, and road users should obey traffic signals. Small acts of care can prevent serious harm.” Identify the stated main idea and classify the remaining statements as supporting details.",
      "PASSAGE 3 — Peaceful Coexistence: “During group work, Chidi and Amina disagreed about the best design. Instead of insulting each other, they explained their reasons and listened carefully. The group combined the strongest parts of both suggestions and completed the task successfully.” Infer the main idea and cite at least two details that support it.",
      "MAIN-IDEA LADDER: For five short paragraphs, first write the topic as a phrase, then the main idea as a complete sentence, then two supporting details. Compare the three levels so topic is not confused with main idea.",
      "DISTRACTOR CLINIC: Given four possible main ideas, label each as BEST, TOO BROAD, TOO NARROW or NOT SUPPORTED and explain the evidence."
    ],
    "independentPractice": [
      "PASSAGE A — Cyber Security: “Kemi received an email saying that her account would close immediately unless she clicked a link and entered her password. The message made her worried, but she noticed that the sender's address looked unusual. Instead of clicking, she opened the organisation's official app directly and checked her account there. She also showed the suspicious message to a trusted adult. The warning turned out to be false.” Write the topic, one-sentence main idea and four supporting details. Explain which detail most clearly shows that Kemi verified the message safely.",
      "PASSAGE B — Patriotism and Community Responsibility: “On the monthly sanitation day, several residents cleaned the public space near the market. Others reported a damaged water pipe instead of ignoring it. A youth group later organised a reading programme for younger children. None of these actions solved every community problem, but each showed people taking responsibility for the place where they lived.” Identify the implied main idea and show how at least three details support it.",
      "PASSAGE C — Mental Wellbeing: “Examination periods can feel demanding for some learners. A sensible routine can include planning study time, taking reasonable breaks, sleeping adequately and speaking to a trusted adult when worries become difficult to manage. These actions do not make every problem disappear, but they can support wellbeing while a learner seeks appropriate help.” Identify the main idea and separate the supporting actions from the writer's qualification in the final sentence.",
      "Read an unfamiliar age-appropriate passage from a teacher-approved source. Write: TOPIC → MAIN IDEA → three SUPPORTING DETAILS → one sentence from the passage that is interesting but least important to the central message."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_PLUS_TEXTBOOK_AND_READING_PEDAGOGY_CROSSCHECK"},
    "mastery": {
      "criterion": "Across unfamiliar age-appropriate paragraphs and short passages, learner correctly distinguishes topic, main idea and supporting ideas, identifies both stated and implied main ideas, rejects too-broad/too-narrow/unsupported alternatives, and justifies answers with textual evidence at at least 80% mastery.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-literal-inferential-critical",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Reading",
    "topic": "Reading Passages to Answer Literal, Inferential and Critical Questions",
    "objectives": [
      "Explain literal, inferential and critical comprehension",
      "Identify what level of comprehension a question requires",
      "Answer literal questions with precise evidence from a passage",
      "Make reasonable inferences by combining textual clues with prior knowledge or logic",
      "Answer critical questions by making evidence-based judgements about ideas in a text",
      "Distinguish an inference from an unsupported guess",
      "Distinguish critical evaluation from personal preference",
      "Use prediction before reading and revise predictions when textual evidence changes",
      "Support comprehension answers with relevant textual evidence"
    ],
    "prerequisites": ["reading for meaning","main and supporting ideas","basic vocabulary in context"],
    "teaching": [
      "Comprehension is more than remembering words. A strong reader can recover information the writer states, work out reasonable meanings the writer implies, and examine ideas critically. NERDC therefore requires three levels: LITERAL, INFERENTIAL and CRITICAL comprehension.",
      "Use the AVORA memory rule: LITERAL = FIND IT. INFERENTIAL = WORK IT OUT. CRITICAL = EVALUATE IT WITH EVIDENCE. These are not three unrelated tricks; they are increasingly demanding ways of thinking about the same text.",
      "LITERAL comprehension asks for information stated directly in the passage. Typical prompts include who, what, when, where, how many, according to the passage, or what happened first. The answer should be traceable to specific words or sentences.",
      "Literal does not mean careless copying. Read the exact question, locate the relevant sentence, and select only the information requested. If the passage says, “At 7:30 a.m., Aisha boarded the bus at Unity Road,” the question “Where did Aisha board the bus?” requires “at Unity Road,” not every detail in the sentence.",
      "A useful literal strategy is QUESTION → KEY WORDS → LOCATE → CHECK → ANSWER. Identify the important words in the question, scan the passage for the matching idea, reread the surrounding sentence, and answer precisely.",
      "Inferential comprehension asks for a meaning that is not stated completely in one sentence. Use INFERENCE = TEXTUAL CLUES + REASONING. The clue must come from the passage; reasoning connects the clues to a conclusion.",
      "Example: “Kunle entered the room shaking water from his umbrella. Drops ran from the shoulders of his jacket.” The passage never says, “It was raining outside,” but that is a reasonable inference because the umbrella and wet jacket are textual clues.",
      "An inference is not a wild guess. If a learner says Kunle had just won a football match, the passage supplies no supporting clue. A defensible inference should answer the challenge: “Which words in the text helped you think that?”",
      "Common inference tasks include working out a character's likely feeling or motive, cause and effect, the meaning of an unfamiliar word from context, what probably happened before or may happen next, and what an unstated relationship between ideas suggests.",
      "Be careful with feelings. If a character “smiled, thanked everyone and held the prize tightly,” it is reasonable to infer pleasure or pride. It would be much weaker to diagnose a complex emotional condition that the passage does not support.",
      "Critical comprehension asks the reader to examine, evaluate or judge something about the text. A critical answer should use CRITERION + TEXTUAL EVIDENCE + REASON. It is not simply “I like it” or “I don't like it.”",
      "Critical questions may ask whether a decision was sensible, whether evidence is sufficient, whether an argument is convincing, whether a title is suitable, whether information seems reliable, what alternative action might be better, or whether the writer has supported a claim adequately.",
      "Example: Passage: “The club cancelled its outdoor event after an official warning of severe weather.” Critical question: “Was the cancellation reasonable?” Strong answer: “Yes. The passage says there was an official severe-weather warning, so avoiding the outdoor event reduced an identified safety risk.” The judgement is tied to evidence and a clear criterion: safety.",
      "Critical thinking does not mean automatically disagreeing with the writer. You may agree, disagree or partly agree, but your conclusion must follow from the passage and a defensible reason.",
      "Some questions can look similar. “Why did Ada leave?” may be literal if the passage directly says, “Ada left because she was ill.” It becomes inferential if the reason is only suggested by clues. Classify the question by what the TEXT requires, not by one question word alone.",
      "Question stems provide clues, not guarantees. “According to the passage...” often signals literal retrieval. “What can you infer/suggest...” usually signals inference. “Do you think... Give a reason,” “How effective...?” or “Was this justified?” often requires critical evaluation.",
      "PRE-READING PREDICTION prepares the mind. Look at a title, picture or heading and predict what the passage may discuss. Then read to confirm, reject or revise the prediction. A prediction is provisional; evidence from the text has final authority.",
      "For every answer, practise an EVIDENCE HABIT. Literal: point to the exact statement. Inferential: name the clues and explain the connection. Critical: state the judgement, identify the relevant evidence and explain the criterion or reason.",
      "Do not overquote. Unless exact wording is requested, answer in a clear sentence using the relevant information. Copying an entire paragraph can hide whether you understood the question.",
      "When a question contains an unfamiliar word, reread the sentence and nearby sentences. Definition clues, examples, contrast, cause/effect and synonyms can help. Then test the possible meaning in the original sentence.",
      "For multiple-choice comprehension, answer from the passage before being attracted by the options. Eliminate answers that contradict the text, are unsupported, are only partly correct, or answer a different question.",
      "For written comprehension, use complete, economical answers. Include enough information to answer fully, but avoid unrelated details. If evidence or a reason is requested, provide it explicitly.",
      "After answering, verify: LITERAL—Can I point to where the text states it? INFERENTIAL—Can I show clues plus reasoning? CRITICAL—Can I show judgement plus evidence plus reason? If not, revise the answer."
    ],
    "workedExamples": [
      "ONE TEXT, THREE LEVELS: “After two days of heavy rain, the stream beside Oke School rose above its normal level. On Wednesday morning, the head teacher saw water covering part of the footpath and asked pupils to use the longer paved route. Some pupils complained that the new route added ten minutes to their journey, but everyone reached the school safely.” LITERAL: Why did pupils use the longer route? Because water covered part of the footpath. INFERENTIAL: What was probably the head teacher's main concern? Pupil safety—the flooded path and the safer alternative are clues. CRITICAL: Was the decision reasonable? Yes; although inconvenient, it avoided a path partly covered by rising water.",
      "LITERAL PRECISION: “The science exhibition begins at 10 a.m. in the assembly hall.” Question: Where will it hold? Answer: In the assembly hall. Do not answer “at 10 a.m.” because that answers when, not where.",
      "INFERENCE FROM ACTION: “Bisi read the message twice, frowned, and immediately called her mother instead of clicking the link.” Reasonable inference: Bisi was suspicious or concerned about the message. Evidence: rereading, frowning and avoiding the link.",
      "UNSUPPORTED GUESS: From Bisi's example, “Bisi's phone was stolen yesterday” is not a valid inference. Nothing in the passage points to theft.",
      "CRITICAL RELIABILITY: A post says, “Everyone should take this medicine; my neighbour says it works,” but gives no qualified source or evidence. A critical reader can judge the support as weak because a neighbour's claim alone is insufficient evidence for a general health recommendation.",
      "CONTEXT CLUE: “The path was treacherous; loose stones made several walkers slip.” Even if “treacherous” is unfamiliar, the example of loose stones and slipping suggests dangerous or unsafe.",
      "PREDICTION: Title: “The Unexpected Visitor.” Predicting that someone arrives unexpectedly is sensible. Predicting that the visitor is a famous musician is possible but unsupported until the passage provides evidence.",
      "MIXED QUESTION WORD: Passage directly states, “Tunde stayed indoors because he had a fever.” “Why did Tunde stay indoors?” is LITERAL, even though it asks “why,” because the reason is explicitly stated.",
      "CRITICAL TITLE: If a passage mainly explains three ways students can verify online information, “Checking Before Sharing” is more suitable than “My Favourite Website” because the first title represents the central content.",
      "PARTIAL AGREEMENT: A character decides never to use the internet again after receiving one suspicious message. Critical response: The caution is understandable, but completely avoiding the internet may be excessive; the passage's safer strategies—verification and trusted help—address the risk without requiring total avoidance."
    ],
    "misconceptions": [
      "thinking every 'why' question is inferential",
      "thinking literal answers must copy whole sentences word for word",
      "treating an inference as permission to guess anything",
      "giving an inference without identifying textual clues",
      "confusing prior knowledge with evidence from the passage",
      "thinking critical comprehension means criticising or finding fault",
      "answering critical questions with unsupported personal preference",
      "assuming a prediction must remain unchanged after reading",
      "choosing an option because it sounds generally true even when the passage does not support it",
      "over-interpreting a character's behaviour beyond what textual evidence reasonably supports",
      "answering only one part of a two-part question",
      "copying large sections of text instead of selecting the precise answer"
    ],
    "guidedPractice": [
      "GUIDED PASSAGE 1 — The Lost Purse: “As Ngozi approached the school gate, she noticed a small purse beneath a bench. She opened only the outer pocket and found an identification card bearing Mrs Bello's name. Instead of taking the purse home, Ngozi carried it to the school office. Twenty minutes later, Mrs Bello arrived looking worried. When the secretary handed her the purse, she smiled with relief and thanked Ngozi.” Literal: Where did Ngozi find the purse? Inferential: Why was Mrs Bello probably worried? Critical: Was Ngozi's decision appropriate? For each answer, mark the exact evidence or clues.",
      "GUIDED PASSAGE 2 — The Online Notice: “A message in a class group claimed that school would close the next day. Femi noticed that the message had no date and did not come from the school's official account. He checked the school's verified notice board and found no closure announcement. He then asked the class representative to confirm with a teacher.” Ask three literal, three inferential and two critical questions; classify each before answering.",
      "GUIDED PASSAGE 3 — Community Water: “For weeks, a leaking pipe sent clean water into the gutter. Residents first placed a container beneath the leak, but this did not stop the waste. A youth group photographed the damaged pipe, recorded its location and reported it to the responsible office. Two days later, workers repaired it.” Determine what is directly stated, infer why the group recorded the location, and critically compare the temporary container with reporting the fault.",
      "QUESTION-SORTING DRILL: Sort twelve question cards into FIND IT, WORK IT OUT and EVALUATE IT WITH EVIDENCE. Then explain what feature of the required answer—not merely the question word—determines each category.",
      "EVIDENCE LADDER: For each inference, write CLUE 1 + CLUE 2 → CONCLUSION. For each critical answer, write JUDGEMENT + EVIDENCE → REASON."
    ],
    "independentPractice": [
      "PASSAGE A — The Debate Trip: “The debate team was due to leave at 7 a.m. At 6:40, the driver called to report a mechanical problem with the bus. The teacher informed the students and contacted another approved transport provider. The replacement bus arrived at 7:35. Although the team reached the venue later than planned, their debate had not yet begun.” Answer: (1) What caused the original bus delay? [literal] (2) What can you infer about why the teacher contacted another approved provider? [inferential] (3) Was waiting for approved replacement transport a defensible decision? Give evidence and a reason. [critical]",
      "PASSAGE B — A Viral Photograph: “A photograph circulated online with a caption claiming that it showed yesterday's flood in a nearby town. Sade noticed a shop sign in the image carrying the name of a different country. She used a trusted image-search tool with her older sister and found the same photograph in a news report published three years earlier. Sade decided not to forward the post.” Answer literal questions about what Sade noticed and found; infer why she stopped sharing; critically assess whether the original caption was reliable and justify the judgement.",
      "PASSAGE C — The Reading Club: “Only eight pupils attended the first meeting of the new reading club. Rather than cancel it, the members selected short books and displayed brief recommendations on the class notice board. They also invited classmates to a ten-minute lunchtime reading session. By the fourth week, twenty-three pupils were attending regularly.” Identify two literal facts, make two supported inferences about the club's actions, and evaluate whether the members' strategy appears effective using evidence from the passage.",
      "Create one literal, one inferential and one critical question from a fresh teacher-approved passage. Exchange questions with a partner, answer them, and require the partner to show the evidence/reasoning for each answer."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_PLUS_TEXTBOOK_AND_COMPREHENSION_PEDAGOGY_CROSSCHECK"},
    "mastery": {
      "criterion": "On unfamiliar age-appropriate passages, learner accurately classifies and answers literal, inferential and critical questions, supports inferences with textual clues, supports critical judgements with evidence and reasons, and achieves at least 80% on the associated mastery exercise.",
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
      "Explain what a summary is and what it must preserve",
      "Reduce long sentences by removing unnecessary words without destroying meaning",
      "Identify topic sentences in paragraphs and passages",
      "Identify key ideas that must be retained in a summary",
      "Recognise words and expressions that redirect attention to important points",
      "Separate key ideas from examples, repetition, elaboration and minor detail",
      "Paraphrase key ideas accurately instead of mechanically copying the source",
      "Combine related ideas into concise grammatical sentences",
      "Summarize paragraphs and short passages accurately, coherently and concisely",
      "Check a summary for completeness, faithfulness, concision and unsupported additions"
    ],
    "prerequisites": ["main and supporting ideas","paragraph meaning","basic sentence construction"],
    "teaching": [
      "A SUMMARY is a shorter statement of the essential meaning of a longer sentence, paragraph or passage. A good summary is shorter, but it must remain faithful to what the original text actually says.",
      "Think of summary as REDUCE WITHOUT DISTORTING. Remove what is unnecessary, retain what is essential, and express the retained meaning clearly. A shorter sentence that changes the writer's meaning is not a good summary.",
      "NERDC begins this skill with SENTENCE REDUCTION. Start with a long sentence and remove words or phrases that are decorative, repetitive or non-essential while keeping the central information.",
      "Sentence reduction example: “The tired and exhausted players, who had just completed a very difficult and demanding match, slowly walked back to their waiting bus.” Core meaning: “The exhausted players walked back to their bus after a difficult match.” Details can be reduced, but the important event and relationship remain.",
      "Do not delete blindly. Words that carry cause, contrast, condition, time or negation can be essential. Removing “not” from “The bridge is not safe” reverses the meaning. Removing “because the road was flooded” may destroy an important reason.",
      "A TOPIC SENTENCE expresses the controlling or central idea of a paragraph. It often helps the reader locate what should survive in a summary. It can occur at the beginning, middle or end, and some paragraphs imply their central idea instead of stating it in one sentence.",
      "KEY IDEAS are the indispensable points needed to represent the writer's message. Ask: If this information disappears, will the reader still understand the main message accurately? If yes, it may be a minor detail; if no, it is probably important.",
      "Supporting material can include examples, illustrations, lists, anecdotes, repeated explanations, quotations and descriptive detail. Such material helps the original writer explain a point, but a short summary often replaces several examples with the broader point they illustrate.",
      "Example: “The school saves electricity by switching off unused lights, unplugging idle equipment and using daylight when possible.” If space is limited, the examples may become: “The school reduces electricity use through energy-saving practices.”",
      "Watch for WORDS AND EXPRESSIONS THAT REDIRECT ATTENTION TO MAIN POINTS. Expressions such as “most importantly,” “the main reason,” “in conclusion,” “therefore,” “as a result,” “however,” “the major problem,” and “the key point” can signal emphasis, conclusion, result or contrast. They are clues, not automatic answers; always check the surrounding meaning.",
      "Contrast signals matter. In “The journey was long; however, the main difficulty was the flooded road,” the word “however” redirects attention from length to the more important difficulty. A summary that mentions only the long journey misses the emphasis.",
      "Result signals can expose an important consequence. “Several drains were blocked; as a result, water remained on the road after the rain.” Depending on the task, both the cause and consequence may be key ideas.",
      "Before summarizing a passage, read it completely. Do not start reducing the first sentence before you know how later paragraphs change, qualify or develop the message.",
      "Use the AVORA SUMMARY ROUTE: READ → SCOPE → MARK → REDUCE → PARAPHRASE → COMBINE → CHECK. READ the whole text. SCOPE what the question asks. MARK topic sentences/key ideas. REDUCE examples and repetition. PARAPHRASE accurately. COMBINE related points. CHECK against the original.",
      "SCOPE is essential. If the question asks for “three reasons for school lateness,” do not summarize every idea in the passage. Select only the reasons and obey the requested number of points.",
      "MARK ideas, not entire paragraphs. A useful note can be only a few words: “high transport cost,” “traffic congestion,” “late departure.” These notes become the raw material for concise summary sentences.",
      "PARAPHRASING means restating meaning in your own clear wording and structure. It is not merely replacing one word with a synonym. First understand the idea, look away from the exact sentence if necessary, then express the same idea naturally.",
      "Paraphrase carefully. Technical names, proper nouns or words with no safe equivalent do not have to be changed. The purpose is to demonstrate understanding and concision, not to force every word into a synonym.",
      "COMBINE related details when doing so preserves meaning. “The clinic lacked nurses. The clinic lacked medicines. The clinic had too few beds.” can become “The clinic lacked adequate staff, medicines and beds.”",
      "Avoid adding personal opinions, explanations or facts that the original passage does not provide. A summary reports the source's essential message; it is not a commentary unless the question specifically asks for evaluation.",
      "Avoid examples unless an example itself is one of the required key points. If the passage says several sports—football, basketball, athletics and volleyball—help pupils remain active, a summary can often say “sports help pupils remain active.”",
      "Avoid repetition. If three sentences restate the same point using different words, represent the idea once unless each sentence contributes a genuinely different key point.",
      "Avoid telegraphic fragments when the task requires sentences. “Flooding. Bad drainage. Waste.” may be brief but does not clearly express relationships. “Blocked drains and poor waste disposal contribute to flooding” communicates a complete idea.",
      "A good summary is CONCISE, but concision does not mean removing necessary meaning. “Transport problems” may be too vague if the passage's key point is that high fares force some pupils to walk long distances.",
      "Preserve logical relationships. If the original says A caused B, do not write merely “A and B.” If it contrasts two ideas, retain the contrast when it matters. If it says something may happen, do not change “may” to “will.”",
      "Maintain the writer's level of certainty. “The programme may reduce waste” is not the same as “The programme will eliminate waste.” Summary writing must not strengthen or weaken claims without textual support.",
      "After drafting, compare every summary point with the passage. Ask: Is it supported? Is it important? Is it accurate? Is it concise? Have I repeated anything? Have I added an opinion? Have I obeyed the number of points or word limit?",
      "Finally read the summary by itself. It should be coherent to someone who has not just read the source. Pronouns should have clear references, sentences should be grammatical, and the selected points should connect logically."
    ],
    "workedExamples": [
      "SENTENCE REDUCTION: “The small young boy quickly ran at great speed towards the nearby school gate because he was already late.” Better reduction: “The boy ran to the school gate because he was late.” The cause is retained; redundant description is removed.",
      "DO NOT DELETE ESSENTIAL NEGATION: “Students should not enter the laboratory without permission.” “Students should enter the laboratory” is not a summary—it reverses the instruction.",
      "TOPIC SENTENCE: “Regular reading develops several useful abilities. It exposes learners to vocabulary, increases familiarity with sentence patterns and provides information about many subjects.” Topic sentence: the first sentence. Key idea: regular reading develops useful abilities; the rest explains how.",
      "SIGNAL EXPRESSION: “Many pupils mentioned the heat. However, the major problem was the lack of clean drinking water.” “However” and “the major problem” redirect attention. Summary: “The main problem was inadequate clean drinking water.”",
      "GENERALISE EXAMPLES: “Residents cleared gutters, removed refuse from waterways and opened blocked drainage channels.” Summary point: “Residents cleared obstructions from the drainage system.”",
      "COMBINE RELATED IDEAS: “The library has too few chairs. Several shelves are damaged. Lighting is poor.” Concise combined point: “The library lacks adequate furniture, shelving and lighting.”",
      "PARAPHRASE: Original: “High transport fares compel many pupils to walk considerable distances to school.” Paraphrase: “Expensive transport forces many pupils to walk long distances to school.” Meaning is preserved without copying the original structure.",
      "SCOPE: A passage discusses causes, effects and solutions to lateness. Question: “State two causes of lateness.” A good response selects only two causes; effects and solutions are irrelevant to the requested summary scope.",
      "REMOVE OPINION: Source: “The council planted 200 trees along major roads.” Poor summary: “The wonderful council wisely planted 200 beautiful trees.” Better: “The council planted 200 trees along major roads.” The added praise is unsupported commentary.",
      "PRESERVE CERTAINTY: Original: “Better drainage may reduce flooding in the area.” Incorrect: “Better drainage will stop flooding.” Correct: “Improved drainage may reduce flooding.”",
      "PARAGRAPH SUMMARY: “The school introduced labelled waste bins in every block. Teachers explained how to separate paper, plastic and food waste. An environmental club checked the bins each afternoon. Within a month, mixed waste had reduced.” Summary: “The school reduced mixed waste by introducing labelled bins, teaching waste separation and monitoring their use.”",
      "MULTI-PARAGRAPH SUMMARY: Paragraph 1: pupils often arrive late because transport is expensive and unreliable. Paragraph 2: lateness causes them to miss opening lessons. Paragraph 3: the school and families are discussing earlier departure and shared transport. Summary: “High and unreliable transport contributes to pupil lateness and missed lessons, so the school and families are considering earlier departure and shared transport.”"
    ],
    "misconceptions": [
      "copying whole paragraphs and calling the result a summary",
      "believing a summary must include every example",
      "deleting words mechanically without checking whether meaning changes",
      "assuming the first sentence is always the topic sentence",
      "confusing a topic such as “pollution” with a key idea about pollution",
      "replacing individual words with synonyms without actually paraphrasing",
      "adding personal opinions or outside facts",
      "changing the writer's degree of certainty",
      "ignoring words such as not, because, however, therefore or although when they carry important relationships",
      "writing fragments so compressed that the meaning becomes unclear",
      "repeating the same key idea in different wording",
      "ignoring the exact scope or number of points requested",
      "thinking the shortest possible answer is automatically the best summary",
      "memorising a model summary instead of learning how to select and reduce ideas"
    ],
    "guidedPractice": [
      "SENTENCE REDUCTION LADDER: Begin with five long sentences. Cross out only words that can disappear without changing essential meaning. Read the reduced sentence and explain why each retained word or relationship is necessary.",
      "TOPIC-SENTENCE HUNT: Read five short paragraphs. Identify each topic sentence or state that the central idea is implied. Underline two details that develop the key idea and circle examples that could normally be omitted from a short summary.",
      "SIGNAL-WORD PRACTICE: In a paragraph containing “for example,” “however,” “most importantly,” “as a result” and “in conclusion,” explain what each expression tells the reader about the organisation or importance of ideas.",
      "GUIDED PASSAGE — Community Library: “The community library had very few visitors during the school term. Most pupils said they did not know when it opened, while others thought they needed to pay before entering. The librarian therefore placed opening hours on school notice boards and explained that membership for pupils was free. She also organised a weekly reading hour. Within six weeks, pupil visits had increased.” Task: identify topic sentence/key issue, select essential causes/actions/result, remove examples/minor wording, then produce a two-sentence summary.",
      "SUMMARY AUDIT: Compare three summaries of the same paragraph: one copies too much, one omits a key idea, and one adds an opinion. Diagnose each problem and repair it."
    ],
    "independentPractice": [
      "PASSAGE A — Water Use: “During the dry season, the school noticed that water from its storage tanks was finishing earlier each day. Some taps were left running after break, and one pipe behind the kitchen had been leaking for weeks. The school repaired the pipe, fitted faulty taps and asked class monitors to report leaks quickly. Teachers also reminded pupils to close taps properly. By the following month, the same amount of stored water lasted considerably longer.” Summarize the causes of water waste and the actions taken to reduce it in no more than two sentences.",
      "PASSAGE B — Study Routine: “Amaka used to begin homework without deciding which tasks were most urgent. She often spent a long time on easy activities and discovered late at night that an important assignment remained unfinished. She then began listing tasks, checking their deadlines and estimating the time each would require. She also kept her phone away during focused study periods. The new routine did not make every assignment easy, but it helped her use her study time more deliberately.” Summarize the problem and the changes Amaka made. Do not add advice that is absent from the passage.",
      "PASSAGE C — Market Drainage: “Heavy rain repeatedly left water around the market entrance. Traders initially blamed the amount of rain alone, but an inspection found that plastic waste and silt had blocked several drainage channels. The traders' association organised a clean-up and placed waste containers at key points. The local authority later cleared a larger underground channel. Floodwater still appeared during very heavy storms, but it drained away much faster than before.” Write a three-point summary covering the identified cause, actions taken and result. Preserve the passage's qualification that the problem was reduced rather than completely eliminated.",
      "Choose a fresh 180–250 word teacher-approved passage. Write margin notes for its key ideas, reduce them to no more than five points, then produce a coherent summary. Underline the source evidence for each retained point and cross out one detail you deliberately omitted as non-essential."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_PLUS_TEXTBOOK_SUMMARY_PEDAGOGY_CROSSCHECK"},
    "mastery": {
      "criterion": "Given unfamiliar age-appropriate sentences, paragraphs and short passages, learner identifies topic sentences/key ideas and attention-redirecting expressions, reduces unnecessary wording without changing meaning, paraphrases and combines essential ideas, and produces accurate concise summaries with no unsupported additions at at least 80% mastery.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-nouns-verbs-adjectives",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Parts of speech: Nouns, Verbs and Adjectives",
    "objectives": [
      "Explain the meaning and important features of nouns, verbs and adjectives",
      "Identify common types of nouns, verbs and adjectives",
      "Explain the functions and uses of nouns, verbs and adjectives in sentences",
      "Identify nouns, verbs and adjectives accurately in sentences and short passages",
      "Use sentence position, form and function—not meaning alone—to classify words",
      "Recognise that the same word form can belong to different word classes in different contexts",
      "Construct accurate and meaningful sentences using nouns, verbs and adjectives"
    ],
    "prerequisites": ["word","sentence","subject and predicate at introductory level"],
    "teaching": [
      "PARTS OF SPEECH are groups of words classified mainly by how they behave and function in sentences. In this lesson, we study NOUNS, VERBS and ADJECTIVES. Meaning is a useful clue, but context and grammatical function provide stronger evidence.",
      "A NOUN typically names or identifies a person, place, animal, object, substance, event, quality, state or idea. Examples include teacher, Ilorin, goat, table, water, meeting, courage and happiness.",
      "Do not reduce the definition to things you can touch. “Honesty,” “fear,” “education” and “freedom” are nouns even though they are abstract ideas or states.",
      "NOUN FEATURES: many nouns can occur after determiners such as a, an, the, this, that, my or some; many can form plurals; many can show possession; and noun phrases commonly function as subjects, objects or complements. No single test works for every noun, so use several clues together.",
      "COMMON NOUNS name members of a general class: girl, school, river, teacher. PROPER NOUNS name particular persons, places, organisations or other unique entities and normally begin with capital letters: Amina, Nigeria, River Niger.",
      "CONCRETE NOUNS refer to things perceived through the senses, such as bell, orange and smoke. ABSTRACT NOUNS name qualities, feelings, states or ideas, such as patience, joy, childhood and justice.",
      "COUNTABLE NOUNS can normally be counted as separate units and often have singular/plural forms: one book, three books. UNCOUNTABLE/MASS NOUNS are not normally counted directly in that sense: water, rice, information. We usually say “some information” or “a piece of information,” not “an information.”",
      "COLLECTIVE NOUNS refer to a group considered as a unit, such as team, class, committee and family. At JSS1 level, recognise the group meaning before later agreement lessons examine how such nouns interact with verbs.",
      "NOUN FUNCTIONS: a noun/noun phrase may be SUBJECT—“The pupils arrived”; OBJECT—“We planted trees”; COMPLEMENT—“Amina is the captain”; OBJECT OF A PREPOSITION—“They sat under the tree”; or POSSESSOR—“Tunde's bag.”",
      "A VERB is central to the predicate and expresses an action, event, process or state. “Run” and “write” express actions, but “know,” “believe,” “seem,” “belong” and forms of “be” can also function as verbs. Therefore, “a verb is an action word” is useful only as a beginning, not a complete definition.",
      "VERB FEATURES: verbs can often change form to express tense/aspect or agree with subjects: walk/walks/walked/walking; write/writes/wrote/written/writing. Some verbs are irregular: go/went/gone; see/saw/seen.",
      "LEXICAL/MAIN VERBS carry the main meaning: “She writes carefully.” AUXILIARY/HELPING VERBS combine with another verb: “She is writing”; “They have finished”; “We will leave.” Forms of be, have and do can function as auxiliaries or as main verbs depending on context.",
      "TRANSITIVE VERBS take an object in a particular use: “Ngozi opened the door.” INTRANSITIVE VERBS do not take an object in that use: “The baby slept.” Some verbs can be either depending on context: “The bell rang” versus “She rang the bell.”",
      "LINKING VERBS connect the subject to a complement describing or identifying it: “The soup smells delicious”; “Bola became captain”; “The sky is cloudy.” The word after a linking verb may describe the subject rather than receive an action.",
      "VERB FUNCTION: every complete finite clause normally needs a verb element. The verb helps state what the subject does, what happens, or what state/condition exists, and it carries important grammatical information such as tense and sometimes agreement.",
      "An ADJECTIVE describes or gives information about a noun or pronoun. It can express quality, size, age, colour, origin, material or other properties: a careful pupil, a large box, an old building, a blue shirt, Nigerian music, a wooden chair.",
      "ADJECTIVES commonly occur BEFORE a noun—“a difficult question”—or AFTER a linking verb—“The question is difficult.” This second position is important: an adjective does not have to stand directly beside the noun it describes.",
      "Many GRADABLE adjectives can be compared: tall, taller, tallest; careful, more careful, most careful. Some are less naturally gradable in ordinary meaning, so comparison is a useful feature but not a compulsory test for every adjective.",
      "DESCRIPTIVE/QUALITATIVE adjectives describe qualities: kind, noisy, strong. QUANTITATIVE/NUMBER-related words can indicate amount or number in noun groups: some water, several pupils, three books. DEMONSTRATIVE forms such as this/that/these/those can modify nouns: these books. POSSESSIVE forms such as my, your and their can also modify nouns. Different grammar traditions label some of these determiners; for JSS1, focus on their noun-modifying function and the terminology used by the course text.",
      "ADJECTIVE FUNCTION: an adjective can modify a noun inside a noun phrase—“the red bag”—or function as a subject complement after a linking verb—“The bag is red.” Its job is to add information about the noun/pronoun.",
      "WORD CLASS DEPENDS ON CONTEXT. “Clean” is an adjective in “a clean room” but a verb in “They clean the room.” “Water” is a noun in “Drink the water” but a verb in “Water the plants.” “Light” can be a noun in “Turn on the light,” an adjective in “a light bag,” or a verb in “Light the candle.”",
      "Therefore, do not classify a word from the dictionary meaning alone. Use the AVORA CONTEXT TEST: (1) What word is it connected to? (2) Where does it occur in the sentence? (3) What job is it doing? (4) Can its form change in a way typical of that class?",
      "NOUN TEST: Can the word/head take a determiner, plural or possessive form where appropriate? Can the noun phrase act as subject/object? Example: “The young farmers harvested maize.” “farmers” takes “the,” is plural and heads the subject noun phrase.",
      "VERB TEST: Can the word carry tense or combine with auxiliaries? Example: harvest/harvests/harvested; “are harvesting.” In “The farmers harvest maize,” “harvest” is the verb.",
      "ADJECTIVE TEST: Does the word modify a noun or describe a subject/object through a linking structure? Can it sometimes take degree/comparison? In “a successful harvest,” “successful” describes “harvest”; in “The harvest was successful,” it remains adjectival after “was.”",
      "Analyse complete phrases, not just isolated words. In “The very tall boy opened the heavy gate,” boy and gate are nouns; opened is the verb; tall and heavy are adjectives. “Very” modifies tall but belongs to the next NERDC parts-of-speech topic.",
      "Capital letters can help identify proper nouns, but capitalisation alone is not enough: the first word of every sentence is capitalised. Decide whether the word names a particular entity.",
      "Suffixes can provide clues but not proof. Endings such as -ness often form nouns (kindness), -ful can form adjectives (helpful), and -ise/-ize may form verbs (organise), but always confirm the word's actual function in the sentence.",
      "When constructing sentences, make each target word do a genuine grammatical job. Example: “The diligent students completed the difficult assignment.” students/assignment = nouns; completed = verb; diligent/difficult = adjectives.",
      "A good passage-identification method is: FIND THE VERB ELEMENT first; ask WHO/WHAT participates to locate noun phrases; then inspect words that modify or describe those nouns to locate adjectives. Finally verify each answer by its function.",
      "Remember the core distinction: NOUN = entity/idea and noun-phrase head; VERB = action/event/state and predicate core; ADJECTIVE = property/description and noun/pronoun modifier or complement. Context confirms the class."
    ],
    "workedExamples": [
      "“The cheerful children carried heavy boxes.” children/boxes are nouns; carried is the verb; cheerful/heavy are adjectives. The adjectives modify the nouns beside them.",
      "“The children are cheerful.” children is a noun; are is a verb; cheerful is an adjective functioning after the linking verb to describe the subject.",
      "“Honesty builds trust.” Honesty and trust are abstract nouns; builds is a verb. Honesty is not physical, but it functions as the subject noun.",
      "“Three teams entered the competition.” teams and competition are nouns; entered is the verb. “teams” is a common countable noun and has the plural -s.",
      "“The committee reached a decision.” committee is a collective noun; decision is an abstract/common noun; reached is a verb.",
      "“We need some information.” information is an uncountable noun. Standard English normally uses “some information” or “a piece of information,” not “an information.”",
      "“Mariam has completed the project.” Mariam/project are nouns; has and completed form the verb group. “has” is an auxiliary here and “completed” carries the main lexical meaning.",
      "“Mariam has a bicycle.” Here “has” is the main verb meaning possesses. The same form can have a different grammatical role in a different sentence.",
      "“The baby slept.” slept is intransitive in this sentence; it has no object. “The mother opened the window.” opened is transitive here because “the window” is its object.",
      "“The soup smells delicious.” soup is a noun; smells is a linking verb in this context; delicious is an adjective describing soup—not an adverb describing the manner of smelling.",
      "“They clean the classroom every day.” clean = verb. “They entered a clean classroom.” clean = adjective. The sentence job determines the class.",
      "“Water the young plants.” Water = verb; plants = noun; young = adjective. “The water is cold.” water = noun; is = verb; cold = adjective.",
      "“Turn on the light.” light = noun. “Carry the light bag.” light = adjective. “Light the lamp.” Light = verb. One spelling can represent different word classes.",
      "PASSAGE ANALYSIS: “A careful farmer inspected the young maize plants. Dark clouds gathered above the field, but the farmer remained hopeful.” Nouns: farmer, maize, plants, clouds, field, farmer. Verbs: inspected, gathered, remained. Adjectives: careful, young, dark, hopeful.",
      "SENTENCE BUILDING: Nouns = teacher/book; verb = explained; adjectives = patient/difficult. Natural sentence: “The patient teacher explained the difficult book.” Better semantic choice: “The patient teacher explained the difficult lesson.” Grammar and meaning should both be checked."
    ],
    "misconceptions": [
      "believing nouns are only things that can be touched",
      "believing every capitalised word is a proper noun",
      "assuming every noun can be pluralised",
      "using “an information” as though information were normally countable",
      "believing verbs are only physical action words",
      "failing to recognise forms of be, have and do as verbs",
      "assuming the same verb is always transitive or always intransitive regardless of use",
      "believing adjectives must always appear immediately before nouns",
      "calling every word after a verb an adverb",
      "classifying a word without looking at its sentence context",
      "believing one spelling must always belong to one part of speech",
      "using word endings as absolute proof of word class",
      "confusing the meaning/type of a word with its grammatical function",
      "identifying words correctly in isolation but being unable to use them in a grammatical sentence"
    ],
    "guidedPractice": [
      "THREE-COLUMN SORT: Sort 30 context-rich examples into NOUN, VERB and ADJECTIVE. Every item must be a complete sentence so classification is based on use, not an isolated word.",
      "NOUN DEEP DIVE: In ten sentences, identify nouns, classify suitable examples as common/proper, concrete/abstract, countable/uncountable or collective, then state one function such as subject, object or complement.",
      "VERB DEEP DIVE: Underline complete verb groups in ten sentences; distinguish main and auxiliary verbs; then identify clear transitive, intransitive and linking uses.",
      "ADJECTIVE DEEP DIVE: Circle adjectives in ten sentences, draw an arrow to the noun/pronoun each describes, and distinguish before-noun from after-linking-verb positions.",
      "SAME-WORD CHALLENGE: Explain the class of clean, water and light in contrasting sentences, then create two original sentences where one chosen word changes class.",
      "PASSAGE LAB: “The energetic volunteers entered the old community hall early. They carried wooden chairs and large boxes. A local teacher welcomed the group. By noon, the dusty room looked clean and bright.” Identify every target noun, verb and adjective and justify difficult cases by function."
    ],
    "independentPractice": [
      "PASSAGE A: “A young inventor displayed a simple machine at the school exhibition. Curious pupils gathered around the table and asked thoughtful questions. The inventor answered calmly, and the proud science teacher smiled.” Create a three-column noun/verb/adjective table. Then choose two nouns and state their sentence functions.",
      "PASSAGE B: “The market was busy on Saturday. Traders arranged fresh vegetables on wide wooden tables. Customers examined the produce and carried full baskets towards the entrance.” Identify the nouns, complete verb elements and adjectives. Explain why “busy” is an adjective although it comes after “was.”",
      "Write six original sentences: two demonstrating different noun types, two containing verb groups with auxiliaries, and two using adjectives in different positions. Label each target word and state its function.",
      "CONTEXT TRANSFORMATION: Use each of water, clean and light in two different word classes. Your sentences must make the class difference unmistakable."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_SCOPE_WITH_GRAMMAR_REFERENCE_CROSSCHECK"},
    "mastery": {
      "criterion": "Learner explains meaning/features/types/uses of nouns, verbs and adjectives; identifies them by grammatical function in unfamiliar sentences/passages including context-dependent forms; and constructs accurate original sentences with at least 80% mastery.",
      "status": "DEEP_WHEN_PASSED"
    },
    "boardReady": true
  },
  {
    "topicId": "revised2025-jss1-english-adverbs-conjunctions-prepositions-interjections",
    "classLevel": "JSS1",
    "subject": "English Language",
    "strand": "Grammatical Accuracy",
    "topic": "Parts of speech: Adverbs, Conjunctions, Prepositions and Interjections",
    "objectives": [
      "Explain meaning, features, types and uses of the four word classes",
      "Identify each class accurately in sentences and texts",
      "Explain the grammatical function or relationship expressed",
      "Use all four classes appropriately in original sentences",
      "Classify context-sensitive forms by function rather than spelling alone"
    ],
    "prerequisites": ["nouns","verbs","adjectives","basic sentence structure"],
    "teaching": [
      "Parts of speech are best identified by their grammatical jobs in context. This lesson studies adverbs, conjunctions, prepositions and interjections.",
      "An ADVERB modifies a verb, adjective, another adverb or sometimes a whole clause. It may express manner, time, place, frequency or degree.",
      "Manner tells how: “Ada answered politely.” Time tells when: “We leave tomorrow.” Place tells where: “Wait outside.” Frequency tells how often: “She often reads.” Degree tells extent: “The water is very cold.”",
      "Not every adverb ends in -ly: fast, hard, well, often, never and soon can be adverbs. Not every -ly word is an adverb: friendly, lovely and lonely commonly function as adjectives.",
      "Context matters: “He drives fast” has adverb fast, but “a fast car” has adjective fast. “She works hard” has adverb hard, while “hard work” has adjective hard.",
      "An adverb may modify another adverb: in “She spoke very softly,” softly modifies spoke while very modifies softly.",
      "A CONJUNCTION joins words, phrases or clauses and shows a relationship between the joined units.",
      "Coordinating conjunctions include and, but, or, so, yet, for and nor. And adds; but/yet commonly contrast; or presents alternatives; so can show result.",
      "Subordinating conjunctions such as because, although, if, when, while, before, after and unless introduce dependent clauses and can express reason, contrast, condition or time.",
      "Correlative conjunctions work in pairs, including either...or, neither...nor, both...and and not only...but also.",
      "Choose conjunctions by meaning. “He was tired, but he continued” expresses contrast. “He was tired, so he rested” expresses result. “He rested because he was tired” gives a reason.",
      "A PREPOSITION normally introduces a phrase and expresses a relationship involving place, direction, time, accompaniment, means, source or another connection.",
      "Place examples include in, on, under, beside, between, behind and near. “The bag is under the desk.”",
      "Direction/movement examples include to, into, onto, through, across and towards. Compare “in the hall” (location) with “into the hall” (movement to the inside).",
      "Time examples include at, on, in, before, after and during. Common patterns include “at 7:00,” “on Monday” and “in June,” but natural usage must still be learned in context.",
      "A preposition normally has an object: “under the old bridge,” “with them,” “after lunch.” The preposition plus its complement forms a prepositional phrase.",
      "The same form can change class. In “before lunch,” before is a preposition because lunch is its object. In “before we ate,” before introduces a clause and functions as a conjunction.",
      "An INTERJECTION is a word or short expression conveying a sudden reaction or feeling and is often grammatically separate from the surrounding clause.",
      "Examples include Ouch! for pain, Hurray! for joy, Oh! for surprise or realisation, Ugh! for disgust, and Hey! for attention. Exact meaning depends on context and tone.",
      "Punctuation can reflect the strength of the reaction: “Ouch! That hurt.” versus the milder “Oh, I understand.” An exclamation mark alone does not make every expression an interjection.",
      "Interjections are natural in conversation, dialogue and some creative writing, but should be used thoughtfully; formal reports generally require more neutral language.",
      "AVORA FUNCTION TEST: for an adverb ask what it modifies; for a conjunction ask what it joins and what relationship it shows; for a preposition identify its object and relationship; for an interjection identify the independent reaction it conveys.",
      "Combined example: “Wow! The extremely careful driver stopped before the gate because a child crossed suddenly.” Wow is an interjection; extremely and suddenly are adverbs; before is a preposition; because is a conjunction."
    ],
    "workedExamples": [
      "“The careful driver stopped suddenly.” Suddenly is an adverb modifying stopped.",
      "“The very careful driver stopped.” Very is an adverb modifying the adjective careful.",
      "“She spoke very softly.” Softly modifies spoke; very modifies softly.",
      "“He drives fast” versus “a fast car”: fast is adverb then adjective.",
      "“Amina wanted to go, but it was raining.” But joins clauses and signals contrast.",
      "“It was raining, so Amina stayed indoors.” So signals result.",
      "“We stayed indoors because it was raining.” Because introduces the reason clause.",
      "“Although the road was wet, the driver continued carefully.” Although signals concession; carefully is an adverb.",
      "“Either Musa or Tunde will present.” Either...or joins alternatives.",
      "“The ball is under the table.” Under is a preposition expressing place.",
      "“The child ran into the room” shows movement; “The child is in the room” shows location.",
      "“The lesson starts at 8:00 on Tuesday in September.” At, on and in express different time relationships.",
      "“Before lunch, we revised” uses before as a preposition; “Before we ate, we revised” uses before as a conjunction.",
      "“Ouch! I touched the hot pan.” Ouch is an interjection expressing pain.",
      "“Oh, I see the answer now.” Oh expresses realisation.",
      "“Hurray! Our team finally arrived, but the gates were already closed.” Hurray is an interjection; finally/already are adverbs; but is a conjunction."
    ],
    "misconceptions": [
      "believing every adverb ends in -ly",
      "believing every -ly word is an adverb",
      "classifying fast or hard the same way in every context",
      "treating conjunctions as interchangeable regardless of meaning",
      "thinking prepositions express only physical position",
      "confusing in with into when movement matters",
      "classifying before the same way in every context",
      "calling every exclamation an interjection",
      "assuming one interjection always expresses one emotion",
      "overusing interjections in formal writing",
      "classifying by spelling rather than grammatical function"
    ],
    "guidedPractice": [
      "Identify adverbs in twelve sentences, state what each modifies, and classify clear examples by manner, time, place, frequency or degree.",
      "Join paired clauses using different conjunctions and explain how each connector changes the relationship.",
      "Describe a classroom picture using prepositions of place and movement, explicitly contrasting in/into and on/onto.",
      "Complete natural time expressions using at, on and in, then explain the common patterns.",
      "Identify interjections in eight mini-dialogues, state the reaction and choose suitable punctuation.",
      "Analyse fast, hard and before in contrasting contexts and justify each classification.",
      "In a short passage, identify every target word and state its function rather than merely naming its class."
    ],
    "independentPractice": [
      "Analyse: “Wow! The new library opened yesterday, and many pupils arrived early. They walked quietly into the hall because a reading programme had already begun.” Identify and explain every target word class.",
      "Analyse: “Although the rain fell heavily, the players remained on the field until the referee stopped the match. Afterwards, they moved quickly towards the changing room. Oh, everyone was completely wet!”",
      "Write eight original sentences: two demonstrating adverb types, two conjunction relationships, two preposition relationships and two natural interjections.",
      "Write a four-sentence paragraph containing at least three adverbs, two conjunctions, three prepositional phrases and one appropriate interjection; label and explain each."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_SCOPE_WITH_GRAMMAR_REFERENCE_CROSSCHECK"},
    "mastery": {"criterion":"Learner explains meaning/types/uses, identifies all four classes by function in unfamiliar text, explains their relationships, and uses them accurately in original sentences at at least 80% mastery.","status":"DEEP_WHEN_PASSED"},
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
    "topic": "Subject-Verb Agreement",
    "objectives": [
      "Define subject-verb agreement and identify subjects and verbs in sentences",
      "Differentiate singular and plural subjects and corresponding verb forms",
      "Explain and apply basic rules of subject-verb agreement",
      "Use correct agreement with be, have, do and ordinary present-tense verbs",
      "Avoid attraction errors caused by words between subject and verb",
      "Apply agreement with common compound subjects and introductory there constructions",
      "Construct and edit sentences for correct subject-verb agreement"
    ],
    "prerequisites": ["nouns and pronouns","verbs","singular and plural","basic present tense"],
    "teaching": [
      "SUBJECT-VERB AGREEMENT means that the form of a verb must fit its grammatical subject in number and, where relevant, person. First find the true subject; then choose the verb form that agrees with it.",
      "The SUBJECT is the person, thing, idea or noun phrase the clause is about. The VERB element expresses an action, event or state. In “The boy plays football,” boy is the subject and plays is the verb.",
      "NUMBER means singular or plural. A singular subject refers to one person/thing or is grammatically singular; a plural subject normally refers to more than one. Agreement follows grammatical number, not merely the nearest noun.",
      "The simple present has a pattern that often confuses learners: I/you/we/they PLAY, but he/she/it/the boy PLAYS. The -s is usually on the third-person singular VERB, whereas plural nouns often take -s. Do not transfer the noun rule to the verb.",
      "Basic Rule 1: a third-person singular subject normally takes the -s/-es form of an ordinary lexical verb in the simple present: “Amina reads”; “The bus passes”; “My brother watches.”",
      "Basic Rule 2: plural subjects normally use the base present form: “The pupils read”; “The buses pass”; “My brothers watch.” I and you also use the base form: “I read”; “You read.”",
      "Spelling changes can occur when forming third-person singular verbs: go→goes, watch→watches, study→studies, have→has. Agreement is a grammatical choice even when spelling changes.",
      "BE is highly irregular: I am; you/we/they are; he/she/it is in the present. In the past, I/he/she/it was while you/we/they were.",
      "HAVE contrasts has with have: “She has a book”; “They have books.” DO contrasts does with do: “He does his work”; “They do their work.”",
      "When an auxiliary carries agreement, the following main verb does not also take the finite agreement ending: “She does work,” not “She does works”; “He is reading,” not “He is reads.”",
      "Do not let an intervening phrase attract the verb. “The basket of oranges IS heavy.” The subject is basket, not oranges. Remove the extra phrase mentally: “The basket is heavy.”",
      "Similarly: “The students in the classroom ARE ready.” The head of the subject noun phrase is students. Classroom is inside a prepositional phrase and does not control agreement.",
      "A useful AVORA method is SUBJECT → NUMBER/PERSON → VERB FORM → CHECK. Underline the complete subject, identify its head, decide singular/plural/person, then select and reread the verb.",
      "Subjects joined by AND are usually plural because they refer to two or more participants: “Musa and Ada are ready”; “The teacher and the prefect have arrived.”",
      "However, do not mechanically count every word around and. A single established idea or unit can sometimes be treated as singular in more advanced usage. At JSS1, first master the normal rule that two separate subjects joined by and take a plural verb.",
      "With EITHER...OR and NEITHER...NOR joining subjects of different number, standard agreement commonly follows the nearer subject: “Either the teacher or the pupils are coming”; “Either the pupils or the teacher is coming.” Keep such sentences clear and, where possible, rewrite awkward combinations.",
      "Indefinite pronouns such as everyone, everybody, someone, somebody, anyone, nobody, each and either are grammatically singular in standard formal English: “Everyone is ready”; “Each has a card.”",
      "Words such as many, several, both and few are plural: “Several are missing”; “Both have arrived.” Some words such as all or some depend on what they refer to: “Some water is left”; “Some pupils are waiting.”",
      "COLLECTIVE NOUNS such as team, committee and family name groups. Agreement can vary with whether the group is viewed as a unit or as individuals, and varieties of English differ. For a basic JSS1 sentence treating the group as one unit, a singular verb is common: “The team is ready.” Follow the meaning and the course text.",
      "In THERE IS/THERE ARE constructions, there introduces the sentence but the following noun phrase controls the agreement in careful standard usage: “There is a book on the table”; “There are three books on the table.”",
      "Amounts, distances and periods can be grammatically singular when treated as one total unit: “Ten minutes is enough for this task.” This is an extension; the core NERDC requirement remains basic singular/plural agreement.",
      "A title or name may look plural but refer to one work/entity. Agreement follows the entity intended, not simply the final letter. This is another reason to identify meaning and grammatical subject rather than counting s endings.",
      "Questions and negatives can hide agreement inside auxiliaries: “Does the boy play?” “Do the boys play?” “The boy does not play.” Once does carries third-person singular agreement, the lexical verb remains play.",
      "Agreement also matters in continuous and perfect verb groups: “She is reading / They are reading”; “He has finished / They have finished.” Find the finite auxiliary that agrees with the subject.",
      "Editing strategy: (1) find each finite verb; (2) ask which subject controls it; (3) ignore interrupting phrases; (4) identify number/person; (5) check the verb form; (6) read the corrected sentence for meaning.",
      "Agreement is not about which form sounds longer or has more letters. It is a grammatical relationship. Always prove your choice by naming the subject and explaining its number/person."
    ],
    "workedExamples": [
      "“The boy plays football.” Boy is third-person singular, so simple-present play becomes plays.",
      "“The boys play football.” Boys is plural, so the base form play is used.",
      "“I play football.” I is singular in meaning but uses the base present form; the -s rule is specifically third-person singular.",
      "“The bus passes the school.” Bus is singular; pass takes -es because of its spelling pattern.",
      "“She studies every evening.” Study becomes studies with third-person singular she.",
      "“I am ready; she is ready; they are ready.” These are present forms of be.",
      "“She has a pen; they have pens.” Has agrees with third-person singular; have with plural subjects here.",
      "“He does his work; they do their work.” Does/do show agreement.",
      "“The basket of oranges is heavy.” Basket is the subject head; of oranges does not control the verb.",
      "“The students in the classroom are ready.” Students, not classroom, controls are.",
      "“Musa and Ada are ready.” Two separate subjects joined by and normally take a plural verb.",
      "“Either the teacher or the pupils are coming.” The nearer subject pupils is plural.",
      "“Either the pupils or the teacher is coming.” The nearer subject teacher is singular.",
      "“Everyone is ready.” Everyone is grammatically singular in standard formal English.",
      "“Several are absent.” Several is plural.",
      "“Some water is left; some pupils are outside.” Some agrees according to the noun/meaning it refers to.",
      "“There is a book on the desk; there are three books on the desk.” The following noun phrase determines the number.",
      "“Does the boy play?” Does carries agreement, so play remains in its base form.",
      "“The players are training.” Are agrees with plural players; training does not change for number.",
      "ERROR REPAIR: “The list of names are on the desk.” Find subject head list (singular), ignore of names, then correct to “The list of names is on the desk.”"
    ],
    "misconceptions": [
      "thinking every singular subject uses a verb ending in -s, including I and you",
      "thinking plural subjects take -s on ordinary present-tense verbs",
      "making the verb agree with the nearest noun instead of the true subject",
      "treating words inside an of/in/with phrase as the subject head",
      "forgetting irregular forms of be, have and do",
      "writing does plays or does goes instead of does play or does go",
      "assuming every subject joined by and is singular because each noun is singular",
      "treating everyone, each or somebody as plural",
      "using there is with every following noun phrase regardless of number",
      "deciding agreement by whether a word ends in -s",
      "changing the non-finite main verb instead of the finite auxiliary in a verb group",
      "memorising answers without being able to identify the controlling subject"
    ],
    "guidedPractice": [
      "SUBJECT-VERB MATCH: Match singular/plural subject cards to suitable present-tense verb cards, including NERDC-style pairs such as “The boy—plays” and “The boys—play,” and explain each match.",
      "SUBJECT HUNT: In twelve sentences, underline the complete subject once, circle its head word, underline the finite verb twice, then state singular/plural/person.",
      "ATTRACTION TRAP: Correct sentences such as “The box of pencils are missing” and “The pupils in the bus is singing,” first removing the intervening phrase mentally.",
      "BE/HAVE/DO TABLE: Complete present forms for I, you, he/she/it, we and they, then use each family in natural sentences.",
      "COMPOUND SUBJECT LAB: Practise and, either...or and neither...nor patterns, explaining which noun phrase controls the verb.",
      "EDITING CLINIC: Correct a short paragraph containing ten deliberate agreement errors and justify each correction by naming the subject.",
      "PEER TEACHING: One learner explains one agreement rule and gives two examples; the partner tests the rule with a new sentence, then roles switch as NERDC recommends."
    ],
    "independentPractice": [
      "PASSAGE A: “The group of new pupils are waiting outside. Each of them have a registration card. The teacher and the prefect is checking the names. There is three empty seats near the door.” Find and correct every agreement error and explain the controlling subject.",
      "PASSAGE B: “My sister does her homework after dinner. Her friends usually do theirs earlier. The box of old notebooks is under her desk, and several are still useful.” Identify each subject and finite verb and explain why each agrees.",
      "Write eight original sentences demonstrating: singular lexical verb, plural lexical verb, be, have, do, an intervening phrase, a compound subject with and, and a there is/are construction.",
      "Create four subject cards and four matching verb cards for a classmate. Include at least one sentence where a noun between the subject and verb could cause an attraction error."
    ],
    "source": {"authority":"NERDC Revised BEC 2025","url":authorityUrl,"verified":"OFFICIAL_SCOPE_WITH_GRAMMAR_REFERENCE_CROSSCHECK"},
    "mastery": {"criterion":"Learner identifies subjects and verbs, distinguishes singular/plural subjects and corresponding forms, explains at least four core agreement rules, applies them in unfamiliar sentences and constructs accurate examples with at least 80% mastery.","status":"DEEP_WHEN_PASSED"},
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
