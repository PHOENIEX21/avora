import {structureTeachingSteps} from './lessonStepEngine';
import type {TutorUnit} from './tutorCurriculum';
import {officialNerdc2025Topic} from './nerdc2025Official';
import {evidenceIdsForOfficialTopic} from './nerdc2025TopicMap';
import {jss1MathematicsDeepLessons} from './jss1MathematicsDeepLessons';
import {jss2MathematicsDeepLessons} from './jss2MathematicsDeepLessons';
import {jss1EnglishDeepLessons} from './jss1EnglishDeepLessons';
import {jss2EnglishDeepLessons} from './jss2EnglishDeepLessons';
import {revised2025SupplementalLessons} from './revised2025SupplementalLessons';

export type NerdcDeepEvidence={
 topicId:string; classLevel:'JSS1'|'JSS2'; subject:'Mathematics'|'English Language'; topic:string;
 objectives:string[]; prerequisites:string[]; teaching:string[]; workedExamples:string[]; misconceptions:string[];
 guidedPractice:string[]; independentPractice:string[]; mastery:{criterion:string;status:string};
};

const special:NerdcDeepEvidence[]=[
 {topicId:'nerdc2025-special-jss1-english-oral-comprehension-current',classLevel:'JSS1',subject:'English Language',topic:'Oral Comprehension — literal, inferential and critical listening',
 objectives:['Listen attentively to oral texts','Answer literal questions from what was directly stated','Answer inferential questions from spoken clues','Answer critical questions by evaluating ideas with evidence from the oral text'],
 prerequisites:['main idea and supporting detail','question words','active listening'],
 teaching:[
  'Oral comprehension means constructing meaning while the text is being spoken. Before listening, prepare to capture the topic, speakers, important actions, causes, contrasts, names and numbers without attempting to write every word.',
  'A literal listening question asks for information directly stated in the oral text. The answer must match what was actually heard, not what usually happens in real life.',
  'An inferential listening question asks for meaning that is not stated word-for-word. Combine two or more audible clues, explain the connection and avoid inventing facts that the text does not support.',
  'A critical listening question asks the learner to judge an idea, reason, claim or action. First state what the speaker says, then evaluate it using evidence from the same oral text and clear reasoning.',
  'Use a two-column listening note when useful: HEARD DIRECTLY | WHAT IT SUGGESTS. This keeps literal evidence separate from inference.',
  'After answering, perform an evidence check: point to the exact spoken clue or remembered detail that supports the answer. If no clue supports it, the answer may be a guess.'
 ],
 workedExamples:[
  'Oral text: “The football match was moved indoors after heavy rain flooded the field.” Literal question: Why was the match moved? Answer: because heavy rain flooded the field.',
  'Oral clues: Kemi checks the clock twice, packs quickly and says the last bus leaves soon. Inference: Kemi is in a hurry because she may miss the last bus. The clock, quick packing and bus statement support the inference.',
  'Critical question: Was the speaker’s proposal well supported? A strong response names the proposal, identifies the reasons/evidence given and explains whether those reasons are relevant and sufficient.'
 ],
 misconceptions:['answering from general knowledge instead of the oral text','calling a guess an inference without spoken evidence','copying one detail when the question asks for the main idea','giving a critical opinion without first understanding the speaker’s claim'],
 guidedPractice:['Listen to a short passage once; answer two literal, two inferential and one critical question, citing the heard clue for every answer.'],
 independentPractice:['Complete two unfamiliar oral passages and classify each question as literal, inferential or critical before answering it.'],
 mastery:{criterion:'Learner answers at least 80% of mixed oral-comprehension questions accurately and can identify the spoken evidence behind inferential and critical answers.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-oral-comprehension-current',classLevel:'JSS2',subject:'English Language',topic:'Oral Comprehension — main idea, context, mood, purpose and learner-generated questions',
 objectives:['Listen attentively to a short oral passage','Identify main ideas','Infer unfamiliar word meanings from spoken context','Interpret speaker mood, tone and purpose','Generate defensible comprehension questions from the oral text'],
 prerequisites:['JSS1 literal/inferential/critical listening','main/supporting ideas','basic tone vocabulary'],
 teaching:[
  'At JSS2, oral comprehension moves beyond recalling facts. Listen for the central message, the structure of the speaker’s reasoning, the meaning of unfamiliar expressions in context, and how delivery and word choice communicate attitude or purpose.',
  'Find the main idea by asking what single message best explains the important details. Do not choose the most dramatic example if it does not cover the whole oral passage.',
  'For an unfamiliar word, use surrounding spoken clues: definition, restatement, contrast, example, cause/effect or the grammatical role of the word. Propose a meaning, substitute it back into the sentence and check whether the whole passage still makes sense.',
  'Mood is the feeling created or expressed; tone is the speaker’s attitude toward the subject or audience; purpose is what the speaker is trying to achieve—for example inform, explain, persuade, warn, entertain or instruct. Support each interpretation with audible evidence such as diction, emphasis, pace or repeated ideas.',
  'To generate a good comprehension question, choose an idea actually present in the passage, decide whether to test literal recall, inference or critical understanding, and write a question whose answer can be defended from the oral text.',
  'When listening only once, use compact notes rather than transcription. On a second listening, if allowed, confirm rather than completely rewrite your first understanding.'
 ],
 workedExamples:[
  'A speaker repeats “act now”, gives consequences of delay and ends with a direct appeal. Purpose is likely persuasion or warning; the repeated call and consequences are evidence.',
  'Sentence heard: “The road was treacherous; several vehicles skidded despite moving slowly.” Context suggests treacherous means dangerously difficult or unsafe, because skidding occurred even at low speed.',
  'From a passage explaining water conservation, a learner-generated inferential question could ask: “Why might repairing small leaks be important even when each leak appears minor?” The passage must contain clues about accumulated waste for the question to be fair.'
 ],
 misconceptions:['treating mood, tone and purpose as interchangeable','guessing vocabulary from one familiar-looking part of a word while ignoring context','writing a generated question whose answer was never supported by the passage','mistaking one example for the main idea'],
 guidedPractice:['Listen to one short passage; state its main idea, infer one word from context, identify tone and purpose with evidence, then write one literal and one inferential question.'],
 independentPractice:['Complete two oral passages with a main-idea note, context-vocabulary explanation, mood/tone/purpose evidence and three learner-generated comprehension questions for each.'],
 mastery:{criterion:'Learner reaches 80%+ across main idea, contextual vocabulary, tone/purpose and generated-question tasks, with explicit auditory evidence.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-reading-fluency-current',classLevel:'JSS2',subject:'English Language',topic:'Reading with Fluency',
 objectives:['Read with suitable speed','Read accurately','Maintain comprehension','Use prosody: pronunciation, phrasing, stress and expression','Answer questions on passages read'],
 prerequisites:['word recognition','punctuation','JSS1 fluent phrase reading'],
 teaching:[
  'Fluency is accurate, meaningful and sufficiently smooth reading. It combines accuracy, pace, comprehension and prosody. Speed is only one part: fast reading that destroys meaning is not fluent reading.',
  'Accuracy comes first. Decode unfamiliar words from spelling, word parts and context; when a miscued word changes meaning, self-correct and reread the complete phrase.',
  'Read in sense groups rather than isolated words. Punctuation, grammar and meaning show where phrases belong together. A comma may signal a light pause; a full stop closes an idea; dialogue punctuation helps identify speaker turns.',
  'Prosody means the voice reflects structure and meaning through pronunciation, stress, phrasing, rhythm and suitable intonation. Do not perform randomly; expression should follow the sentence and situation.',
  'Flexible pace is stronger than racing. Slow down for dense information, unfamiliar vocabulary or important evidence; move more quickly through familiar material while keeping comprehension.',
  'Measure fluency with both oral performance and comprehension questions. Improvement means fewer meaning-changing errors, better phrasing and strong understanding—not merely a shorter reading time.'
 ],
 workedExamples:[
  '“Although the rain had stopped, / the flooded road remained dangerous.” The first clause belongs together; a short pause before the main clause helps meaning.',
  'If a learner reads “desert” for “dessert” in a restaurant passage, context exposes the error. Correct the word and reread the full sentence rather than continuing with broken meaning.',
  'A question such as “Why did the committee postpone the event?” checks whether fluency included comprehension; pronunciation alone is not enough.'
 ],
 misconceptions:['equating fluency with fastest possible reading','pausing after every word','ignoring a miscue that changes meaning','adding dramatic expression that contradicts punctuation or context','practising speed without checking comprehension'],
 guidedPractice:['Read a 180–250 word passage aloud; mark sense groups, record miscues, answer five comprehension questions and reread after feedback.'],
 independentPractice:['Read three unfamiliar passages with different purposes; record time, accuracy, phrasing/prosody notes and comprehension score, then explain which area improved.'],
 mastery:{criterion:'Learner reads unfamiliar JSS2 passages accurately and expressively at an appropriate pace while answering at least 80% of comprehension questions.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-tense-system-current',classLevel:'JSS2',subject:'English Language',topic:'Tenses — explicit system and time relationships',
 objectives:['Describe major present, past and future tense/aspect forms','Construct sentences with forms appropriate to intended time meaning','Maintain logical tense relationships across connected sentences'],
 prerequisites:['main verbs and auxiliaries','subject–verb agreement','past participles and -ing forms'],
 teaching:[
  'Tense places a situation in relation to time; aspect shows whether the situation is viewed as simple, ongoing, completed, or continuing over a period. AVORA teaches FORM + MEANING together so learners do not choose a tense only from a signal word.',
  'Simple present: base form/third-person -s for habits, general truths and scheduled facts. Present progressive: am/is/are + -ing for activity viewed as ongoing or temporary. Present perfect: has/have + past participle links a past event or state to the present. Present perfect progressive: has/have been + -ing emphasises duration or ongoing activity up to now.',
  'Simple past marks a completed past situation. Past progressive: was/were + -ing presents an activity in progress at a past time. Past perfect: had + past participle places one past event before another past reference point. Past perfect progressive: had been + -ing emphasises earlier duration before a past point.',
  'Future meaning can be expressed in several ways. Will + base verb commonly expresses prediction or spontaneous decision; be going to can express plans or evidence-based prediction; present progressive can express arranged future events. The intended meaning and context control the choice.',
  'Time expressions help but do not mechanically determine tense. “Since” often connects a starting point to a later reference, while a finished time such as “yesterday” normally does not combine with present perfect for the same completed event.',
  'In connected writing, establish the time frame and shift only when the meaning requires it. A narrative may use past simple for main events, past progressive for background action and past perfect for an earlier event.'
 ],
 workedExamples:[
  'Habit: “Amina walks to school every day.” Current temporary activity: “Amina is walking to school now.” The same verb uses different forms because the time meaning differs.',
  '“I have finished the assignment” links completion to the present result. “I finished the assignment yesterday” places the event at a finished past time.',
  '“When the bus arrived, we had waited” is usually not the intended duration form. If the waiting continued until arrival, “we had been waiting for thirty minutes when the bus arrived” makes the earlier duration clear.',
  '“Look at those dark clouds; it is going to rain” presents an evidence-based prediction. “I think it will rain tomorrow” is a general prediction.'
 ],
 misconceptions:['choosing tense from one signal word without reading meaning','using present perfect with a finished past-time expression for the same event','changing tense randomly inside one time frame','confusing the past participle with the simple past','assuming future meaning has only one possible grammatical form'],
 guidedPractice:['Place eight situations on a timeline, choose an appropriate tense/aspect form for each, and explain the meaning signalled by the auxiliary and verb form.'],
 independentPractice:['Edit a paragraph containing ten tense inconsistencies, then write a 180-word account that deliberately uses simple, progressive and perfect forms with justified time shifts.'],
 mastery:{criterion:'Learner identifies and constructs major tense/aspect forms with at least 80% accuracy and can explain the time relationship rather than relying only on memorised signal words.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-debate',classLevel:'JSS2',subject:'English Language',topic:'Debate',
 objectives:['Explain the meaning, purpose, procedure and elements of a debate','Use appropriate register, sentences, tense, gestures and posture in a debate','Build and respond to arguments respectfully'],
 prerequisites:['difference between fact and opinion','complete sentences','listening without interrupting'],
 teaching:[
  'A debate is a structured spoken argument in which speakers support or oppose a clear proposition. The goal is not to shout down an opponent; it is to persuade an audience by making relevant claims, supporting them with reasons or evidence, and responding to opposing points.',
  'First identify the proposition and your side. A proposition such as “School uniforms should be compulsory” creates two positions: proposition and opposition. Every point you make must connect to that exact proposition.',
  'Build each argument as CLAIM → REASON → SUPPORT → LINK. The claim states your point. The reason explains why it is true or important. Support gives an example, fact or logical consequence. The link shows how the point supports your side of the proposition.',
  'A rebuttal answers an opposing argument. A strong rebuttal first represents the opposing point fairly, then identifies its weakness or limitation, then explains why your own position remains stronger. Do not attack the person speaking.',
  'Debate register is formal and respectful. Use expressions such as “I respectfully disagree because…”, “The previous speaker argued that…, however…”, and “My next point is…”. Avoid insults, slang and unsupported accusations.',
  'Delivery matters: audible voice, controlled pace, eye contact, purposeful gesture and upright posture help the audience follow the argument. Gestures support meaning; they should not replace reasoning.'
 ],
 workedExamples:[
  'Proposition: “Homework should be reduced.” Weak point: “Homework is bad.” Improved argument: “Homework should be reduced because excessive homework can remove time needed for sleep and revision. A balanced amount allows practice without displacing rest; therefore schools should control quantity rather than simply adding more tasks.”',
  'Opposing point: “More homework always improves performance.” Rebuttal: “Practice can improve learning, but the word always is too strong. Work that is excessive or not understood can become repetition without learning. The issue is therefore the quality and amount of homework, not merely having more of it.”',
  'Opening model: “Chairperson, panel of judges, accurate timekeeper, co-debaters, ladies and gentlemen, I stand to support the motion…” Notice the respectful address and immediate statement of position.'
 ],
 misconceptions:['treating debate as a quarrel','giving opinions without reasons or support','changing the proposition halfway through','rebutting the speaker instead of the argument','using gestures or loudness as a substitute for evidence'],
 guidedPractice:['Turn the claim “Students should read every day” into a claim–reason–support–link argument.','Give a respectful rebuttal to “Social media is always harmful to students.”'],
 independentPractice:['Prepare a three-point debate for or against “Mobile phones should be allowed for learning in school”, including an opening, one rebuttal and a conclusion.'],
 mastery:{criterion:'Learner can construct and deliver a relevant, respectful argument with support and rebuttal, using suitable debate register.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-oral-summary',classLevel:'JSS2',subject:'English Language',topic:'Oral Summary',
 objectives:['Listen attentively for central ideas and key supporting points','Separate essential ideas from examples and repetition','Restate the essential information briefly and accurately'],
 prerequisites:['oral comprehension','main idea and supporting idea','note-taking with keywords'],
 teaching:[
  'Oral summary begins with listening for meaning, not trying to remember every sentence. Ask: What is the speaker mainly explaining? Which few points are necessary to preserve that message?',
  'During the first listening, identify the topic and central message. During a second listening, if available, record keywords for major points only. Do not try to write a transcript.',
  'Examples, repeated phrases, greetings, jokes and decorative details may help the original speech but are usually not main summary points. Remove them unless the task specifically asks for them.',
  'After listening, group related notes, put the key ideas in a logical order, and restate them in your own concise sentences without changing the speaker’s meaning.',
  'A summary must not add your opinion. If the speaker says plastic waste blocks drains and increases flooding, the summary may report that claim; it should not add “and the government is careless” unless the speaker actually said it.'
 ],
 workedExamples:[
  'Oral text idea set: “The school planted trees on Monday. The principal thanked volunteers. Trees provide shade, reduce heat around classrooms and can protect soil.” Summary: “The school planted trees to improve the environment by providing shade, reducing heat and protecting the soil.” The thanks is not essential to the main idea.',
  'If a speaker gives three examples of unsafe road crossing but the main point is that pedestrians should use safe crossing procedures, the summary should preserve the safety rule rather than list every example.',
  'Notes: water shortage → leaking taps; long dry season; repair leaks; store water safely. Summary: “The water shortage is linked to leaks and the dry season, so residents are advised to repair leaks and store water safely.”'
 ],
 misconceptions:['copying the entire oral passage','including every example','adding personal opinion','dropping a major point because its sentence was short','changing the meaning while paraphrasing'],
 guidedPractice:['Listen to or read a short four-sentence message aloud, write only four keywords, then produce a one-sentence summary.'],
 independentPractice:['Summarize two short oral passages in your own words, then compare each summary with a checklist of main idea, key points, accuracy and concision.'],
 mastery:{criterion:'Learner consistently preserves the main message and essential points without copying, distortion or added opinion.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-sentence-function',classLevel:'JSS2',subject:'English Language',topic:'Sentence Types by Function',
 objectives:['Explain declarative, interrogative, imperative and exclamatory sentences','Identify each type from the purpose it performs','Construct correct examples and punctuate them appropriately'],
 prerequisites:['complete sentence','subject and predicate','basic end punctuation'],
 teaching:[
  'Sentence type by function means we classify a sentence by what it is doing in communication, not simply by its first word.',
  'A declarative sentence makes a statement or gives information: “The library closes at four.” It normally ends with a full stop.',
  'An interrogative sentence asks a direct question: “When does the library close?” It normally ends with a question mark.',
  'An imperative sentence gives a command, instruction, request or advice: “Please close the door.” The subject “you” is often understood rather than written.',
  'An exclamatory sentence expresses strong feeling or emphasis: “What a beautiful performance!” It usually ends with an exclamation mark. Not every sentence with an exclamation mark is automatically a different grammar structure; function and meaning still matter.',
  'The same situation can be expressed through different functions: “You are leaving.” / “Are you leaving?” / “Leave now.” / “What an early departure!” The function changes even though the topic is similar.'
 ],
 workedExamples:[
  '“Do not touch the switch.” is imperative because it instructs the listener, even though it begins with “do”.',
  '“How bright the moon is tonight!” is exclamatory because it expresses strong feeling; it is not asking for information.',
  '“Could you pass the salt?” has interrogative form and polite-request function. In this curriculum classification, recognise that it is written as a question while understanding its communicative purpose.'
 ],
 misconceptions:['classifying only by punctuation without reading meaning','assuming every imperative must begin with a verb written as the first word','calling every sentence beginning with “what” a question','confusing sentence function with simple/compound/complex structure'],
 guidedPractice:['Classify four sentences and explain the communicative purpose of each.'],
 independentPractice:['Write two original examples of each functional type and transform one statement into a question, command/request and exclamation without losing the central idea.'],
 mastery:{criterion:'Learner identifies all four functional types from purpose and constructs accurate examples with suitable punctuation.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-sentence-structure',classLevel:'JSS2',subject:'English Language',topic:'Structural Sentence Types',
 objectives:['Explain simple, compound and complex sentences','Identify independent and dependent clauses','Construct and distinguish the three structural types'],
 prerequisites:['subject and verb','clause','coordinating conjunctions'],
 teaching:[
  'Sentence type by structure depends on the number and relationship of clauses. A clause contains a subject–verb relationship.',
  'An independent clause can stand alone as a complete sentence. A dependent clause contains a subject and verb but cannot stand alone with the intended complete meaning in that form.',
  'A simple sentence contains one independent clause. It may still have a compound subject or verb: “Tola and Musa washed and packed the dishes.” is simple because it has one independent clause, not because it is short.',
  'A compound sentence joins two or more independent clauses, often with coordinating conjunctions such as for, and, nor, but, or, yet, so, or with suitable punctuation: “The rain stopped, and the players returned.”',
  'A complex sentence contains one independent clause and at least one dependent clause: “The players returned when the rain stopped.” The clause “when the rain stopped” cannot stand alone here as the complete intended statement.',
  'Do not count verbs alone. First divide the sentence into clauses, test which clauses can stand alone, then classify the relationship.'
 ],
 workedExamples:[
  '“Ada sings and dances.” has one subject with two verbs, so it is a simple sentence.',
  '“Ada sings, and Kemi dances.” has two independent clauses joined by “and”, so it is compound.',
  '“Ada sings because she enjoys music.” has one independent clause plus the dependent clause “because she enjoys music”, so it is complex.'
 ],
 misconceptions:['assuming a long sentence must be complex','counting every verb as a separate independent clause','calling any sentence with “and” compound','forgetting that a dependent clause cannot normally stand alone in the same meaning'],
 guidedPractice:['Underline the clauses in three sentences, mark each independent/dependent, then classify the sentence.'],
 independentPractice:['Create two simple, two compound and two complex sentences, then explain the clause evidence for each classification.'],
 mastery:{criterion:'Learner classifies sentence structure from clause evidence rather than length or punctuation clues.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-skit-making',classLevel:'JSS2',subject:'English Language',topic:'Skit-making',
 objectives:['Explain what a skit is and what it can do','Plan a short skit around one clear issue or message','Create dialogue, action and a beginning–development–ending suitable for performance'],
 prerequisites:['dialogue','character','conflict','basic stage direction'],
 teaching:[
  'A skit is a short dramatic performance built around a focused situation, idea, problem or message. Because it is short, every character and scene should contribute to the central purpose.',
  'Begin with the purpose: for example showing the danger of bullying, examination malpractice, cultism, or the value of community service. Then decide what the audience should understand by the end.',
  'Create only the characters needed to show the issue. Give each character a clear role or goal so the dialogue develops conflict or decision rather than becoming unrelated conversation.',
  'Use a compact dramatic shape: setup → problem/conflict → turning point → consequence/resolution. A skit does not need many scenes, but it needs movement from a starting situation to an outcome.',
  'Dialogue should sound speakable. Stage directions can indicate essential action, tone or movement, but they should not replace what the audience needs to see or hear.',
  'When the skit teaches a social lesson, show the lesson through choices and consequences rather than ending with a long lecture unless that style is deliberately required.'
 ],
 workedExamples:[
  'Bullying skit plan: setup—a new learner enters class; conflict—two learners mock the newcomer; turning point—a classmate refuses to join and reports repeated bullying; resolution—the class discusses respectful conduct and the bully accepts responsibility. Each event serves the anti-bullying purpose.',
  'Weak dialogue: five lines of greetings before anything happens. Improved version: after one natural greeting, a character immediately notices the examination answer sheet being passed secretly, starting the conflict.',
  'Stage direction: “[Bisi hides the paper under her book and avoids the teacher’s eyes.]” This gives performable action; it is stronger than an author note such as “Bisi is doing something bad.”'
 ],
 misconceptions:['writing an essay and calling it a skit','adding characters who have no function','making dialogue explain everything instead of showing action','having no conflict or change','using a moral unrelated to the events'],
 guidedPractice:['Plan a four-part skit about examination malpractice with three characters and one clear turning point.'],
 independentPractice:['Write and rehearse a 2–4 minute skit on one NERDC-listed social issue, then revise it for focus, natural dialogue and a clear resolution.'],
 mastery:{criterion:'Learner can create a focused, performable skit whose characters, dialogue and action develop one clear purpose.',status:'DEEP_WHEN_PASSED'}},
 {topicId:'nerdc2025-special-jss2-english-dialogue-writing',classLevel:'JSS2',subject:'English Language',topic:'Writing dialogues',
 objectives:['Write coherent conversations between two or more characters','Use speaker turns, punctuation and register clearly','Make each line respond to the situation and advance the conversation'],
 prerequisites:['direct speech punctuation','sentence types','formal and informal register'],
 teaching:[
  'Dialogue is written conversation. Good dialogue is not a list of unrelated statements: each turn reacts to what was said before and moves the situation forward.',
  'Know the speakers, their relationship and purpose before writing. Friends may use an informal register; a learner speaking to a principal should normally use a more respectful formal register.',
  'Make the speaker clear. In script form, names can introduce turns: “AMINA: …”. In prose, quotation marks and reporting clauses identify speakers. Do not mix formats carelessly inside the same short task.',
  'Use natural turn-taking. Real conversation includes questions, responses, clarification, agreement and disagreement, but remove empty repetition that contributes nothing.',
  'Punctuation helps readers hear the exchange correctly. Direct questions need question marks; exclamations need appropriate punctuation; quotation marks must open and close correctly in prose dialogue.',
  'A character’s exact words should fit the character and situation. Dialogue can reveal attitude or conflict indirectly instead of explaining every feeling in narration.'
 ],
 workedExamples:[
  'Flat exchange: “I lost my book.” “Books are important.” Improved: “I cannot find the library book I borrowed yesterday.” “When did you last use it?” “During lunch. I think I left it in the reading room.” Each reply connects to the problem.',
  'Register contrast: to a friend—“Can you send me the notes?”; to a teacher—“Please, sir, may I borrow the class notes to complete yesterday’s work?” The purpose is similar but the relationship changes the wording.',
  'Script model: “KUNLE: Did you submit the form? / ZAINAB: Not yet. The office asked me to add my parent’s signature. / KUNLE: Then we can return together after break.” The turns respond logically and progress the situation.'
 ],
 misconceptions:['writing monologues instead of interaction','making characters ignore previous lines','using the same register for every relationship','mixing script labels and prose quotation conventions randomly','overusing greetings and filler'],
 guidedPractice:['Write six connected turns between a learner and librarian about an overdue book, using an appropriate register.'],
 independentPractice:['Write a 10–12 turn conversation between two or three characters resolving a school-based problem; then edit for turn logic, punctuation and register.'],
 mastery:{criterion:'Learner writes coherent multi-speaker dialogue with clear turns, suitable register and accurate direct-speech conventions.',status:'DEEP_WHEN_PASSED'}}
];

const evidence:NerdcDeepEvidence[]=[
 ...jss1MathematicsDeepLessons,
 ...jss2MathematicsDeepLessons,
 ...jss1EnglishDeepLessons,
 ...jss2EnglishDeepLessons,
 ...revised2025SupplementalLessons,
 ...special,
] as NerdcDeepEvidence[];
const evidenceById=new Map(evidence.map(item=>[item.topicId,item]));
export function nerdc2025EvidenceById(id:string){return evidenceById.get(id)}
export function nerdc2025EvidenceForTopic(classLevel:string,subject:string,topic:string){return evidenceIdsForOfficialTopic(classLevel,subject,topic).map(id=>evidenceById.get(id)).filter((x):x is NerdcDeepEvidence=>Boolean(x))}

function clean(text:string){return String(text||'').replace(/\s+/g,' ').trim()}
function deepEvidenceUnit(item:NerdcDeepEvidence,officialTopic:string):TutorUnit{
 const steps:string[]=[
  `NERDC objective connection — this lesson unit supports the official topic “${officialTopic}”.`,
  ...item.prerequisites.map(x=>`Prerequisite — ${clean(x)}. If this is not secure, rebuild it before using it.`),
  ...item.teaching.map(x=>clean(x)),
  ...item.workedExamples.flatMap((x,i)=>[`Worked example ${i+1}: ${clean(x)}`,`Why this example matters — identify the rule, language evidence or relationship that makes the working valid before copying the result.`]),
  ...item.misconceptions.map((x,i)=>`Common error ${i+1}: ${clean(x)}. Explain exactly which rule, definition, evidence or relationship this mistake breaks.`),
  `Mastery standard — ${clean(item.mastery.criterion)}`,
 ];
 const checks=[
  ...item.guidedPractice.map(x=>clean(x)),
  ...item.independentPractice.map(x=>clean(x)),
 ];
 return {
  title:`NERDC deep lesson · ${item.topic}`,
  terms:[],why:`This unit explicitly teaches the knowledge and reasoning needed for the official NERDC topic “${officialTopic}”.`,
  prerequisites:item.prerequisites,outcomes:item.objectives,explain:item.teaching.join(' '),example:item.workedExamples[0]||'',check:checks[0]||`Explain the governing idea in ${item.topic}.`,
  commonMistakes:item.misconceptions,sourceOrigin:`NERDC September 2025 alignment · ${item.topicId}`,
  sourceSteps:steps,sourceChecks:checks,structuredSteps:structureTeachingSteps(steps,checks),
  noJumpChecks:['define terms before using them','explain why each transformation is valid','work examples from simple to harder forms','teach misconceptions explicitly','require learner reasoning before mastery']
 };
}

function officialScopeUnit(classLevel:string,subject:string,topic:string):TutorUnit|undefined{
 const official=officialNerdc2025Topic(classLevel,subject,topic);if(!official)return undefined;
 const steps=[
  `Official curriculum anchor — ${official.classLevel} ${official.subject}, theme: ${official.theme}, topic: ${official.topic}.`,
  `NERDC source provenance — ${official.sourceFile}, curriculum page${official.pages.length>1?'s':''} ${official.pages.join(', ')}.`,
  'What this topic must cover before AVORA can call the teaching complete:',
  ...official.objectives.map((x,i)=>`${i+1}. ${clean(x)}`),
  `Knowledge and skills named by NERDC — ${clean(official.content)}`,
  'AVORA teaching rule — every objective above must appear in the teaching, examples or learner checks. Passing one easy example never proves the whole topic.',
 ];
 const checks=[`In your own words, what is the central skill this NERDC topic expects you to develop?`];
 return {title:`Official NERDC scope · ${official.topic}`,terms:[],why:'This scope card prevents AVORA from silently teaching a narrower or invented version of the curriculum.',prerequisites:[],outcomes:official.objectives,explain:official.content,example:'',check:checks[0],sourceOrigin:`${official.sourceFile} · page ${official.pages.join(', ')}`,sourceSteps:steps,sourceChecks:checks,structuredSteps:structureTeachingSteps(steps,checks),noJumpChecks:['cover every performance objective','preserve official topic identity and provenance']};
}

export function getNerdc2025DeepUnits(classLevel:string,subject:string,topic:string):TutorUnit[]{
 const official=officialNerdc2025Topic(classLevel,subject,topic);if(!official)return [];
 const ids=evidenceIdsForOfficialTopic(classLevel,subject,topic);
 const mapped=ids.map(id=>evidenceById.get(id)).filter((x):x is NerdcDeepEvidence=>Boolean(x));
 const scope=officialScopeUnit(classLevel,subject,topic);
 return [...(scope?[scope]:[]),...mapped.map(item=>deepEvidenceUnit(item,topic))];
}

export function nerdc2025TeachingAudit(){
 const missing:string[]=[];
 for(const id of new Set([...Array.from(evidenceById.keys())])){if(!evidenceById.get(id))missing.push(id)}
 return {evidenceCount:evidence.length,specialCount:special.length,missing};
}
