export type AuthoredNerdcEnglishQuestion={
 id:string;
 classLevel:'JSS2';
 subject:'English Language';
 topic:string;
 prompt:string;
 options:string[];
 correctAnswer:string;
 explanation:string;
 difficulty:1|2|3;
 skill:string;
};

const q=(topic:string,n:number,prompt:string,options:string[],correctAnswer:string,explanation:string,difficulty:1|2|3,skill:string):AuthoredNerdcEnglishQuestion=>({
 id:`nerdc25-auth-jss2-eng-${topic.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}-${String(n).padStart(2,'0')}`,
 classLevel:'JSS2',subject:'English Language',topic,prompt,options,correctAnswer,explanation,difficulty,skill
});

const DEBATE='Debate';
const ORAL_SUMMARY='Oral Summary';
const SENTENCE_FUNCTION='Sentence Types (function): Declarative, Interrogative, Imperative (command) and Exclamatory';
const SENTENCE_STRUCTURE='Structural Sentence Types (simple, compound and complex)';
const SKIT='Skit-making';
const DIALOGUE='Writing dialogues';

export const nerdc2025AuthoredJss2EnglishQuestions:AuthoredNerdcEnglishQuestion[]=[
 // Debate — NERDC JSS2 English Studies, Listening and Speaking.
 q(DEBATE,1,'Which description best explains a debate?',[
  'A structured spoken argument in which speakers support or oppose a clear proposition',
  'A quarrel in which the loudest speaker wins',
  'A speech in which only one side is allowed to speak',
  'A conversation with no stated issue or position'
 ],'A structured spoken argument in which speakers support or oppose a clear proposition','A debate is organized around a proposition and opposing positions. Persuasion should come from relevant reasoning and evidence, not shouting.',1,'meaning and purpose'),
 q(DEBATE,2,'The motion is “School uniforms should be compulsory.” What must a speaker decide before preparing arguments?',[
  'Whether to support or oppose the motion',
  'How loudly to speak',
  'How many jokes to tell',
  'Which opponent to criticize personally'
 ],'Whether to support or oppose the motion','Every argument must connect to the proposition from a clear side: proposition/support or opposition.',1,'procedure and position'),
 q(DEBATE,3,'In the pattern CLAIM → REASON → SUPPORT → LINK, what is the main job of SUPPORT?',[
  'To provide an example, fact, evidence or logical consequence for the reason',
  'To repeat the claim using louder words',
  'To greet the audience again',
  'To attack the opposing speaker'
 ],'To provide an example, fact, evidence or logical consequence for the reason','Support makes the reason credible by adding evidence, examples or a logical consequence.',1,'argument construction'),
 q(DEBATE,4,'Which is the strongest rebuttal to “More homework always improves performance”?',[
  'Practice can help learning, but “always” is too strong because excessive or poorly understood homework may add repetition without learning.',
  'That speaker is wrong and clearly does not understand school.',
  'Homework is bad because I do not like it.',
  'I will ignore that point and discuss school uniforms instead.'
 ],'Practice can help learning, but “always” is too strong because excessive or poorly understood homework may add repetition without learning.','A rebuttal should answer the argument fairly, identify a weakness, and explain why your position still stands. It should not attack the speaker.',2,'rebuttal'),
 q(DEBATE,5,'Which expression uses the most appropriate debate register?',[
  'I respectfully disagree because the evidence does not support that conclusion.',
  'You are talking nonsense.',
  'Guy, that point no make sense.',
  'Everybody knows I am right, so let us move on.'
 ],'I respectfully disagree because the evidence does not support that conclusion.','Debate language should be formal, relevant and respectful even when disagreeing strongly.',1,'register'),
 q(DEBATE,6,'A learner says, “Artificial Intelligence is bad.” Which revision best develops the statement into an argument?',[
  'Uncontrolled use of Artificial Intelligence can weaken independent practice when learners submit generated work they do not understand; therefore schools should teach responsible use and require evidence of learners’ own reasoning.',
  'Artificial Intelligence is bad because it is bad.',
  'Artificial Intelligence is everywhere these days.',
  'Anyone who supports Artificial Intelligence is lazy.'
 ],'Uncontrolled use of Artificial Intelligence can weaken independent practice when learners submit generated work they do not understand; therefore schools should teach responsible use and require evidence of learners’ own reasoning.','The improved version gives a claim, reason, support/consequence and a link to the position instead of merely stating an opinion.',3,'developing supported arguments'),
 q(DEBATE,7,'What is the best role of gestures and posture during a debate?',[
  'They support clear delivery and meaning but do not replace reasoning or evidence.',
  'They are more important than the content of the argument.',
  'They should distract the audience from weak evidence.',
  'They allow the speaker to avoid answering opposing points.'
 ],'They support clear delivery and meaning but do not replace reasoning or evidence.','NERDC includes gestures and posture as elements of debate delivery, but persuasive content still depends on relevant arguments.',1,'delivery'),
 q(DEBATE,8,'Which response commits the error of attacking the speaker instead of the argument?',[
  'You are too inexperienced to have a useful opinion on this motion.',
  'Your claim needs evidence because the example you gave does not prove that it happens in every school.',
  'The word “always” makes the claim too broad.',
  'I accept the first part of your point, but the conclusion does not follow from it.'
 ],'You are too inexperienced to have a useful opinion on this motion.','A good rebuttal addresses the claim, evidence or reasoning. Personal attacks do not answer the argument.',2,'misconception detection'),
 q(DEBATE,9,'The motion is “Students should read every day.” Which point is most relevant?',[
  'Daily reading can build vocabulary and comprehension through regular exposure to language.',
  'The school football team needs new jerseys.',
  'Some classrooms need repainting.',
  'The canteen sells rice on Wednesdays.'
 ],'Daily reading can build vocabulary and comprehension through regular exposure to language.','A debate point must connect directly to the proposition being argued.',1,'relevance'),
 q(DEBATE,10,'Which opening is most suitable for a formal school debate?',[
  'Chairperson, panel of judges, accurate timekeeper, co-debaters, ladies and gentlemen, I stand to oppose the motion…',
  'Hey everybody, listen to me because I know best.',
  'My opponent is wrong before I even begin.',
  'I do not really know the topic, but let me just talk.'
 ],'Chairperson, panel of judges, accurate timekeeper, co-debaters, ladies and gentlemen, I stand to oppose the motion…','A formal opening respectfully addresses the audience and clearly states the speaker’s position.',1,'procedure and register'),
 q(DEBATE,11,'Which statement provides SUPPORT rather than only a CLAIM?',[
  'Reducing water waste matters because leaking taps can waste usable water every day; repairing leaks therefore protects limited supply.',
  'Water waste is bad.',
  'I strongly believe water matters.',
  'My next point is water.'
 ],'Reducing water waste matters because leaking taps can waste usable water every day; repairing leaks therefore protects limited supply.','This option gives a reason and a concrete consequence, then links it back to the point.',2,'evidence and support'),
 q(DEBATE,12,'An opponent says, “Social media is always harmful to students.” Which rebuttal is strongest?',[
  'Social media can cause distraction or harm when misused, but “always” ignores educational uses such as supervised class groups and access to learning resources.',
  'No, it is not.',
  'You only say that because you are old-fashioned.',
  'Let us talk about school uniforms instead.'
 ],'Social media can cause distraction or harm when misused, but “always” ignores educational uses such as supervised class groups and access to learning resources.','The rebuttal concedes what may be true, challenges the overgeneralization, and supplies a relevant counterexample.',3,'balanced rebuttal'),
 q(DEBATE,13,'What should a strong debate conclusion mainly do?',[
  'Restate the position and bring the main arguments together without introducing an unrelated new case.',
  'Introduce a completely new motion.',
  'Insult the opposing side one final time.',
  'Repeat the greeting several times to fill time.'
 ],'Restate the position and bring the main arguments together without introducing an unrelated new case.','A conclusion closes the case by reinforcing the position and strongest reasons.',2,'conclusion'),
 q(DEBATE,14,'Which sequence best represents a sensible debate preparation procedure?',[
  'Identify the motion and side → develop claims with reasons/support → anticipate opposing points → plan rebuttals and delivery',
  'Choose gestures → attack opponents → decide the topic → look for reasons',
  'Memorize insults → speak loudly → choose a side after speaking',
  'Write unrelated facts → add a greeting → ignore the proposition'
 ],'Identify the motion and side → develop claims with reasons/support → anticipate opposing points → plan rebuttals and delivery','Preparation begins with understanding the proposition and position, then building and testing arguments before planning delivery.',3,'procedure'),
 q(DEBATE,15,'For the motion “Mobile phones should be allowed for learning in school,” which argument is best constructed?',[
  'Phones can provide dictionaries, calculators and approved learning resources, but use should be controlled by clear classroom rules so the learning benefit does not become distraction.',
  'Phones are good because everybody has one.',
  'Anyone who disagrees with phones hates technology.',
  'Phones come in many colours and sizes.'
 ],'Phones can provide dictionaries, calculators and approved learning resources, but use should be controlled by clear classroom rules so the learning benefit does not become distraction.','The answer is relevant, reasoned, supported with examples, and acknowledges a limitation rather than relying on assertion.',3,'full argument quality'),

 // Oral Summary.
 q(ORAL_SUMMARY,1,'What is the main goal of an oral summary?',[
  'To preserve the central message and essential points briefly and accurately',
  'To repeat every sentence exactly as spoken',
  'To add the listener’s opinion to make the passage more interesting',
  'To list every example whether important or not'
 ],'To preserve the central message and essential points briefly and accurately','A summary keeps what is essential while removing repetition and non-essential detail without changing meaning.',1,'summary purpose'),
 q(ORAL_SUMMARY,2,'During a first listening to a short oral passage, what should a learner focus on first?',[
  'The topic and central message',
  'Writing every word as a transcript',
  'Counting how many sentences the speaker used',
  'Preparing a personal response before the speaker finishes'
 ],'The topic and central message','The first listening should establish what the speaker is mainly saying before details are selected.',1,'listening strategy'),
 q(ORAL_SUMMARY,3,'If a second listening is available, what is the most useful note-taking method?',[
  'Record keywords for major points only',
  'Write the full passage word for word',
  'Copy only greetings and examples',
  'Write your opinion beside every sentence'
 ],'Record keywords for major points only','Keywords help capture essential ideas without turning the task into transcription.',1,'note-taking'),
 q(ORAL_SUMMARY,4,'A speaker repeats one example three times to emphasize a point. What should a summary usually do?',[
  'State the underlying point once unless the example itself is required',
  'Repeat the example three times too',
  'Remove the main point and keep only the repeated example',
  'Add another example from the listener’s experience'
 ],'State the underlying point once unless the example itself is required','Summary removes repetition and preserves the essential idea.',2,'selecting essential information'),
 q(ORAL_SUMMARY,5,'Which sentence should NOT be added to a summary unless the speaker actually said it?',[
  'The government is careless and should be blamed for everything.',
  'Plastic waste can block drains.',
  'Blocked drains can increase flooding.',
  'The speaker advised residents to dispose of waste properly.'
 ],'The government is careless and should be blamed for everything.','A summary reports the speaker’s ideas; it must not insert the listener’s unsupported opinion.',1,'objectivity'),
 q(ORAL_SUMMARY,6,'Which paraphrase preserves the meaning of “Residents should repair leaking taps to reduce water waste”?',[
  'People are advised to fix leaking taps so less water is wasted.',
  'Residents should replace every tap whether it leaks or not.',
  'Water waste is caused only by residents.',
  'People should stop using taps completely.'
 ],'People are advised to fix leaking taps so less water is wasted.','Good paraphrase changes wording while preserving the original meaning.',2,'accurate paraphrase'),
 q(ORAL_SUMMARY,7,'Listen to this idea set: “The school planted trees on Monday. The principal thanked volunteers. Trees provide shade, reduce heat around classrooms and protect soil.” Which is the best summary?',[
  'The school planted trees to improve the environment by providing shade, reducing heat and protecting the soil.',
  'The principal thanked volunteers on Monday and everybody was happy.',
  'Trees were planted, and Monday is the first day of the school week.',
  'The school planted trees because the principal likes volunteers.'
 ],'The school planted trees to improve the environment by providing shade, reducing heat and protecting the soil.','This keeps the main action and its important environmental purposes while removing a non-essential detail.',2,'main idea and supporting points'),
 q(ORAL_SUMMARY,8,'Notes: “water shortage → leaking taps; long dry season; repair leaks; store water safely.” Which summary is best?',[
  'The water shortage is linked to leaks and the dry season, so residents are advised to repair leaks and store water safely.',
  'There is water, and taps are useful in the dry season.',
  'Residents should buy new houses because there is a water shortage.',
  'The dry season is terrible, and I personally dislike it.'
 ],'The water shortage is linked to leaks and the dry season, so residents are advised to repair leaks and store water safely.','The summary combines all essential notes accurately and without adding opinion.',2,'synthesising notes'),
 q(ORAL_SUMMARY,9,'Why is trying to write a complete transcript usually a poor oral-summary strategy?',[
  'It can distract attention from identifying the main ideas and essential points.',
  'A transcript is always shorter than a summary.',
  'A transcript contains no words.',
  'It makes the speaker’s meaning automatically clearer.'
 ],'It can distract attention from identifying the main ideas and essential points.','Oral summary requires selecting meaning, not reproducing every spoken word.',2,'listening and selection'),
 q(ORAL_SUMMARY,10,'Which detail is most likely to be omitted from a summary of a safety talk?',[
  'A joke the speaker told before giving the safety instructions',
  'The main danger being discussed',
  'The key action listeners should take',
  'A major reason the action is necessary'
 ],'A joke the speaker told before giving the safety instructions','Decorative details such as jokes are usually not essential to the central message.',1,'relevance'),
 q(ORAL_SUMMARY,11,'A four-minute talk explains three causes of lateness and two ways students can arrive on time. What should the summary preserve?',[
  'The main issue, the important causes and the key solutions',
  'Only the speaker’s opening greeting',
  'Every repeated sentence and pause',
  'The listener’s own preferred solution even if it was not mentioned'
 ],'The main issue, the important causes and the key solutions','A useful summary preserves the central message and essential supporting points.',2,'coverage'),
 q(ORAL_SUMMARY,12,'Which change would distort a speaker’s meaning?',[
  'Changing “some students miss breakfast” to “all students always miss breakfast”',
  'Changing “repair leaking taps” to “fix leaking taps”',
  'Combining two closely related points into one concise sentence',
  'Removing a repeated example after preserving its main point'
 ],'Changing “some students miss breakfast” to “all students always miss breakfast”','The change turns a limited claim into an absolute one, so it no longer preserves the speaker’s meaning.',3,'accuracy and distortion'),
 q(ORAL_SUMMARY,13,'Which summary is most concise without losing the key message?',[
  'Regular handwashing reduces the spread of germs, especially before eating and after using the toilet.',
  'The speaker talked for a while about hands, germs, eating, toilets, water, soap and many other things.',
  'Handwashing is good, and I have always liked soap.',
  'Before eating you should wash, and after the toilet you should wash, and the speaker repeated this several times, and germs can spread, and…'
 ],'Regular handwashing reduces the spread of germs, especially before eating and after using the toilet.','It preserves the main idea and key occasions in one accurate sentence without filler or opinion.',2,'concision'),
 q(ORAL_SUMMARY,14,'Mini oral passage: “The library will close early on Friday for repairs. Borrowers should return urgent books by Thursday. Normal opening hours resume on Monday.” What is the central message?',[
  'The library’s Friday schedule changes because of repairs, so urgent returns should be made by Thursday; normal hours return Monday.',
  'Libraries are useful places to read books.',
  'Friday is followed by Saturday.',
  'All books must permanently be returned on Thursday.'
 ],'The library’s Friday schedule changes because of repairs, so urgent returns should be made by Thursday; normal hours return Monday.','This captures the reason, required action and return to normal service without inventing a permanent rule.',3,'summarising announcements'),
 q(ORAL_SUMMARY,15,'After drafting an oral summary, which checklist is best?',[
  'Main idea present? Essential points present? Meaning accurate? Wording concise? No added opinion?',
  'Did I copy every sentence? Did I add my own example? Did I make it longer?',
  'Did I use the same number of words as the speaker?',
  'Did I remove all supporting points and keep only the title?'
 ],'Main idea present? Essential points present? Meaning accurate? Wording concise? No added opinion?','These checks directly test the qualities of an accurate oral summary.',3,'self-review'),

 // Sentence types by function.
 q(SENTENCE_FUNCTION,1,'“The library closes at four.” is which sentence type by function?',[
  'Declarative','Interrogative','Imperative','Exclamatory'
 ],'Declarative','It gives information or makes a statement, so its function is declarative.',1,'declarative sentences'),
 q(SENTENCE_FUNCTION,2,'“When does the library close?” is which sentence type by function?',[
  'Interrogative','Declarative','Imperative','Exclamatory'
 ],'Interrogative','It asks a direct question and therefore performs an interrogative function.',1,'interrogative sentences'),
 q(SENTENCE_FUNCTION,3,'“Please close the door.” is which sentence type by function?',[
  'Imperative','Interrogative','Declarative','Exclamatory'
 ],'Imperative','It gives a polite instruction/request. The understood subject is “you.”',1,'imperative sentences'),
 q(SENTENCE_FUNCTION,4,'“What a beautiful performance!” is which sentence type by function?',[
  'Exclamatory','Interrogative','Imperative','Declarative'
 ],'Exclamatory','It expresses strong feeling; “what” does not make it a question in this sentence.',1,'exclamatory sentences'),
 q(SENTENCE_FUNCTION,5,'Which statement best explains sentence type by function?',[
  'It classifies a sentence by what it is doing in communication.',
  'It classifies a sentence only by how many words it has.',
  'It classifies a sentence only by the first word.',
  'It classifies a sentence by the number of clauses only.'
 ],'It classifies a sentence by what it is doing in communication.','Functional classification asks whether the sentence states, asks, commands/requests, or exclaims.',1,'concept'),
 q(SENTENCE_FUNCTION,6,'In “Close your notebook,” which subject is normally understood even though it is not written?',[
  'You','I','Notebook','They'
 ],'You','Imperatives commonly omit the explicit subject because “you” is understood.',2,'imperative grammar'),
 q(SENTENCE_FUNCTION,7,'Which sentence is declarative?',[
  'Our class begins at eight o’clock.','Does our class begin at eight?','Begin the class now.','What an early class!'
 ],'Our class begins at eight o’clock.','It states information rather than asking, directing or exclaiming.',1,'identification'),
 q(SENTENCE_FUNCTION,8,'Which sentence is interrogative?',[
  'Why did Musa leave early?','Musa left early.','Musa, leave early.','How early Musa left!'
 ],'Why did Musa leave early?','It asks for information and ends with a question mark.',1,'identification'),
 q(SENTENCE_FUNCTION,9,'Which sentence is imperative even though it begins with “Do”?',[
  'Do not touch the switch.','Do you touch the switch?','The switch does not work.','What a dangerous switch!'
 ],'Do not touch the switch.','“Do not…” gives an instruction/prohibition, so the function is imperative.',2,'misconception detection'),
 q(SENTENCE_FUNCTION,10,'Which sentence is exclamatory rather than interrogative?',[
  'How bright the moon is tonight!','How bright is the moon tonight?','The moon is bright tonight.','Please look at the moon.'
 ],'How bright the moon is tonight!','It expresses strong feeling rather than requesting information.',2,'form versus function'),
 q(SENTENCE_FUNCTION,11,'Change “You are leaving now.” into an interrogative sentence without changing the central situation.',[
  'Are you leaving now?','Leave now.','What a departure!','You are leaving now.'
 ],'Are you leaving now?','The transformation changes the statement into a direct question about the same situation.',2,'transformation'),
 q(SENTENCE_FUNCTION,12,'Change “The room is very untidy.” into an imperative sentence that addresses the situation.',[
  'Please tidy the room.','Is the room untidy?','The room is very untidy.','What an untidy room!'
 ],'Please tidy the room.','The imperative form gives a request/instruction connected to the same situation.',2,'construction'),
 q(SENTENCE_FUNCTION,13,'Why is punctuation alone not enough to classify every sentence by function?',[
  'Because meaning and communicative purpose must also be considered.',
  'Because punctuation never has any use.',
  'Because every sentence has the same punctuation.',
  'Because only sentence length matters.'
 ],'Because meaning and communicative purpose must also be considered.','Punctuation gives a strong clue, but classification is ultimately based on what the sentence is doing.',3,'reasoning'),
 q(SENTENCE_FUNCTION,14,'“Could you pass the salt?” is written in which functional sentence form in this curriculum?',[
  'Interrogative','Imperative','Declarative','Exclamatory'
 ],'Interrogative','It is grammatically written as a question, although it performs a polite-request purpose in conversation.',3,'polite requests'),
 q(SENTENCE_FUNCTION,15,'Which pair correctly shows the same situation expressed through two different functions?',[
  '“You are leaving.” (declarative) and “Are you leaving?” (interrogative)',
  '“You are leaving.” (imperative) and “Are you leaving?” (declarative)',
  '“Leave now.” (declarative) and “You are leaving.” (exclamatory)',
  '“What an early departure!” (interrogative) and “Leave now.” (declarative)'
 ],'“You are leaving.” (declarative) and “Are you leaving?” (interrogative)','The content is related, but one makes a statement and the other asks a question.',3,'contrast and classification'),

 // Structural sentence types.
 q(SENTENCE_STRUCTURE,1,'What determines whether a sentence is simple, compound or complex?',[
  'The number and relationship of its clauses','The number of words only','Its punctuation mark only','Whether it sounds formal'
 ],'The number and relationship of its clauses','Structural classification depends on clauses and whether they are independent or dependent.',1,'structural concept'),
 q(SENTENCE_STRUCTURE,2,'Which description best defines an independent clause?',[
  'A clause that can stand alone as a complete sentence','A group of words with no verb','A clause that must begin with because','Any phrase containing a comma'
 ],'A clause that can stand alone as a complete sentence','An independent clause has a subject–verb relationship and expresses a complete thought that can stand alone.',1,'clauses'),
 q(SENTENCE_STRUCTURE,3,'Which description best defines a dependent clause?',[
  'A clause with a subject and verb that cannot stand alone with the intended complete meaning','A sentence with no subject','Any sentence with two verbs','A clause joined only by and'
 ],'A clause with a subject and verb that cannot stand alone with the intended complete meaning','A dependent clause contributes meaning but relies on an independent clause for completion.',1,'clauses'),
 q(SENTENCE_STRUCTURE,4,'“Ada sings and dances.” is structurally a…',[
  'Simple sentence','Compound sentence','Complex sentence','Sentence fragment'
 ],'Simple sentence','It has one independent clause with one subject and a compound verb. Two verbs do not automatically create two clauses.',2,'simple sentence'),
 q(SENTENCE_STRUCTURE,5,'“Ada sings, and Kemi dances.” is structurally a…',[
  'Compound sentence','Simple sentence','Complex sentence','Dependent clause'
 ],'Compound sentence','It contains two independent clauses—“Ada sings” and “Kemi dances”—joined by the coordinating conjunction “and.”',1,'compound sentence'),
 q(SENTENCE_STRUCTURE,6,'“Ada sings because she enjoys music.” is structurally a…',[
  'Complex sentence','Compound sentence','Simple sentence','Sentence fragment'
 ],'Complex sentence','It has the independent clause “Ada sings” plus the dependent clause “because she enjoys music.”',1,'complex sentence'),
 q(SENTENCE_STRUCTURE,7,'Which sentence is simple even though it has a compound subject and compound verb?',[
  'Tola and Musa washed and packed the dishes.','Tola washed the dishes, and Musa packed them.','Tola washed the dishes because Musa was tired.','When Musa arrived, Tola washed the dishes.'
 ],'Tola and Musa washed and packed the dishes.','There is still only one independent clause; compound subjects or verbs do not by themselves make a compound sentence.',2,'simple sentence misconceptions'),
 q(SENTENCE_STRUCTURE,8,'Which sentence is compound?',[
  'The rain stopped, and the players returned.','The players returned when the rain stopped.','The tired players returned quickly.','After the rain stopped.'
 ],'The rain stopped, and the players returned.','Both “The rain stopped” and “the players returned” can stand independently, so the sentence is compound.',2,'compound sentence'),
 q(SENTENCE_STRUCTURE,9,'Which sentence is complex?',[
  'The players returned when the rain stopped.','The rain stopped, and the players returned.','The players returned quickly.','The tired players and coaches returned.'
 ],'The players returned when the rain stopped.','It contains one independent clause and the dependent clause “when the rain stopped.”',2,'complex sentence'),
 q(SENTENCE_STRUCTURE,10,'Why is “I bought bread and milk” not automatically a compound sentence because it contains “and”?',[
  'Because “and” joins two nouns here, not two independent clauses.','Because a compound sentence cannot contain “and.”','Because every sentence with “and” is simple.','Because bread and milk are verbs.'
 ],'Because “and” joins two nouns here, not two independent clauses.','The conjunction must join independent clauses for this pattern to form a compound sentence.',2,'misconception detection'),
 q(SENTENCE_STRUCTURE,11,'Which part is the dependent clause in “We stayed inside because the storm was severe”?',[
  'because the storm was severe','We stayed inside','We stayed','the storm'
 ],'because the storm was severe','The clause has a subject and verb but begins with a subordinating conjunction and depends on the main clause in this sentence.',2,'clause identification'),
 q(SENTENCE_STRUCTURE,12,'Which revision turns “The bell rang. The students entered.” into one compound sentence?',[
  'The bell rang, and the students entered.','When the bell rang, the students entered.','The ringing bell and the students.','The bell rang loudly.'
 ],'The bell rang, and the students entered.','Two independent clauses are joined with the coordinating conjunction “and,” producing a compound sentence.',2,'construction'),
 q(SENTENCE_STRUCTURE,13,'Which revision turns “The bell rang. The students entered.” into one complex sentence?',[
  'When the bell rang, the students entered.','The bell rang, and the students entered.','The bell and the students entered.','The bell rang loudly.'
 ],'When the bell rang, the students entered.','“When the bell rang” becomes a dependent clause joined to the independent clause “the students entered.”',2,'construction'),
 q(SENTENCE_STRUCTURE,14,'A sentence is very long but contains only one independent clause. What can you conclude?',[
  'It can still be a simple sentence.','It must be complex because it is long.','It must be compound because it has many words.','It cannot be a complete sentence.'
 ],'It can still be a simple sentence.','Length does not determine structure; clause relationships do.',3,'reasoning'),
 q(SENTENCE_STRUCTURE,15,'Which method is most reliable for classifying a sentence by structure?',[
  'Divide it into clauses, identify which can stand alone, then examine how the clauses are related.',
  'Count the number of words and choose the longest category.',
  'Look only for commas and full stops.',
  'Count every verb and call that the number of sentences.'
 ],'Divide it into clauses, identify which can stand alone, then examine how the clauses are related.','This method uses the actual evidence that defines simple, compound and complex sentences.',3,'classification method'),

 // Skit-making.
 q(SKIT,1,'Which description best defines a skit?',[
  'A short dramatic performance built around a focused situation, issue, idea or message',
  'A long essay read aloud by one person',
  'A list of unrelated jokes with no dramatic situation',
  'A debate in which two teams defend opposite motions'
 ],'A short dramatic performance built around a focused situation, issue, idea or message','A skit is a brief dramatic form. Its characters, dialogue and actions should serve a clear central purpose.',1,'meaning and function'),
 q(SKIT,2,'What should a writer decide first when planning a skit on bullying?',[
  'The purpose or message the audience should understand',
  'How many unnecessary characters can be added',
  'How long the opening greetings should be',
  'Which unrelated joke should end the skit'
 ],'The purpose or message the audience should understand','A focused purpose guides the choice of characters, conflict, action and resolution.',1,'planning'),
 q(SKIT,3,'Which character choice is strongest for a short skit?',[
  'Use only characters who contribute to the central situation or message.',
  'Add as many characters as possible even if they do nothing.',
  'Give every character the same goal and voice.',
  'Include a narrator who explains every action so nobody needs to act.'
 ],'Use only characters who contribute to the central situation or message.','Because a skit is short, each character should have a clear dramatic function.',1,'character function'),
 q(SKIT,4,'Which sequence gives a clear compact dramatic shape for a skit?',[
  'Setup → problem/conflict → turning point → consequence/resolution',
  'Greeting → greeting → greeting → unrelated moral',
  'Resolution → new topic → introduction → no ending',
  'List of facts → definition → bibliography → conclusion'
 ],'Setup → problem/conflict → turning point → consequence/resolution','A skit needs movement from an initial situation through a problem to a meaningful outcome.',1,'dramatic structure'),
 q(SKIT,5,'Which stage direction is most performable?',[
  '[Bisi hides the paper under her book and avoids the teacher’s eyes.]',
  '[Bisi is a bad person in every possible way.]',
  '[The audience should understand the theme now.]',
  '[This part is morally wrong and very educational.]'
 ],'[Bisi hides the paper under her book and avoids the teacher’s eyes.]','A useful stage direction gives visible or playable action, tone or movement rather than an author’s abstract judgement.',2,'stage directions'),
 q(SKIT,6,'A skit spends its first five lines on repeated greetings before anything happens. What is the best revision?',[
  'Keep one natural greeting, then begin the situation or conflict quickly.',
  'Add five more greetings.',
  'Remove all action and keep only greetings.',
  'Replace the skit with an essay about greetings.'
 ],'Keep one natural greeting, then begin the situation or conflict quickly.','Short drama needs purposeful dialogue; empty filler should not delay the central action.',2,'dialogue economy'),
 q(SKIT,7,'Which plan best fits a skit about examination malpractice?',[
  'A learner is offered leaked answers, faces pressure, chooses to report the act, and the consequences reveal why malpractice is harmful.',
  'Three characters discuss football for four minutes and then one says “exam malpractice is bad.”',
  'A narrator reads a definition of malpractice with no characters or action.',
  'The actors greet one another, leave the stage and never mention an examination.'
 ],'A learner is offered leaked answers, faces pressure, chooses to report the act, and the consequences reveal why malpractice is harmful.','The issue is dramatized through conflict, choice and consequence rather than merely stated.',2,'social issue dramatization'),
 q(SKIT,8,'What is a turning point in a skit?',[
  'A moment when a decision, discovery or event changes the direction of the conflict',
  'The title written at the top of the script',
  'Every greeting spoken by a character',
  'A list of costumes after the ending'
 ],'A moment when a decision, discovery or event changes the direction of the conflict','The turning point moves the skit from the problem toward its consequence or resolution.',2,'dramatic structure'),
 q(SKIT,9,'Which statement about dialogue in a skit is most accurate?',[
  'It should sound speakable and help develop character, conflict, action or resolution.',
  'It should explain every idea as if it were a textbook paragraph.',
  'It should consist mainly of unrelated filler.',
  'It should never respond to what another character says.'
 ],'It should sound speakable and help develop character, conflict, action or resolution.','Good skit dialogue is performable and purposeful.',1,'dialogue'),
 q(SKIT,10,'Which is a common mistake when writing a skit?',[
  'Writing an essay with speaker names added and calling it drama',
  'Giving characters clear goals',
  'Using action to show consequences',
  'Planning a beginning, conflict and resolution'
 ],'Writing an essay with speaker names added and calling it drama','A skit must work as performed drama, not simply as expository prose divided among speakers.',2,'misconception detection'),
 q(SKIT,11,'Why should a social-message skit usually show choices and consequences?',[
  'They allow the audience to understand the lesson through the dramatic events.',
  'They make the central issue unnecessary.',
  'They guarantee that no dialogue is needed.',
  'They allow characters to remain unrelated to the message.'
 ],'They allow the audience to understand the lesson through the dramatic events.','Drama communicates strongly when the message grows naturally from what characters do and what follows.',2,'dramatic communication'),
 q(SKIT,12,'Which resolution best fits an anti-bullying skit?',[
  'The bullying is confronted, support is offered to the victim, and the characters take concrete steps toward respectful conduct.',
  'The bullying continues unchanged and the skit suddenly ends with a joke about exams.',
  'A new unrelated character enters to discuss transport fares.',
  'The victim disappears and nobody responds to the conflict.'
 ],'The bullying is confronted, support is offered to the victim, and the characters take concrete steps toward respectful conduct.','The resolution should grow from the conflict and reinforce the skit’s central purpose.',2,'resolution'),
 q(SKIT,13,'Which NERDC-listed issue could appropriately form the focus of a JSS2 skit?',[
  'The importance of community service','The chemical structure of sodium chloride','The derivation of a quadratic formula','The history of every world capital'
 ],'The importance of community service','NERDC specifically lists community service, bullying, examination malpractice, cultism and respect for elders as suitable skit issues.',1,'curriculum application'),
 q(SKIT,14,'A skit has six characters, but two never affect the action or message. What is the strongest revision?',[
  'Remove or combine the unnecessary characters unless they are given a real dramatic function.',
  'Add four more characters with no purpose.',
  'Give the unnecessary characters longer greetings only.',
  'Keep them because a good skit must have many characters.'
 ],'Remove or combine the unnecessary characters unless they are given a real dramatic function.','In a short form, every character should contribute to the central situation, conflict or resolution.',3,'editing for focus'),
 q(SKIT,15,'Which outline is the strongest complete skit plan?',[
  'Purpose: community service; setup: littered school field; conflict: learners refuse cleanup; turning point: a planned event is threatened; resolution: the group organizes cleanup and sees the shared benefit.',
  'Purpose: community service; setup: long greetings; conflict: none; ending: “community service is good.”',
  'Purpose: bullying; setup: football discussion; conflict: transport fares; resolution: examination timetable.',
  'Purpose: respect for elders; setup: definitions read aloud; conflict: none; resolution: bibliography.'
 ],'Purpose: community service; setup: littered school field; conflict: learners refuse cleanup; turning point: a planned event is threatened; resolution: the group organizes cleanup and sees the shared benefit.','The outline has one clear purpose, connected characters/actions, conflict, turning point and resolution.',3,'full skit planning'),

 // Writing dialogues.
 q(DIALOGUE,1,'What is dialogue?',[
  'Written or spoken conversation between two or more characters','A paragraph in which one person speaks without response','A list of unrelated statements','A description of scenery with no speakers'
 ],'Written or spoken conversation between two or more characters','Dialogue is interaction: speakers take turns and respond to one another.',1,'meaning'),
 q(DIALOGUE,2,'Which exchange is most coherent?',[
  'AMINA: I cannot find the library book. / KOLA: When did you last use it? / AMINA: During lunch in the reading room.',
  'AMINA: I cannot find the library book. / KOLA: Football is played outside. / AMINA: Blue is my favourite colour.',
  'AMINA: I cannot find the library book. / KOLA: I cannot find the library book. / AMINA: I cannot find the library book.',
  'AMINA: I cannot find the library book. / KOLA: [No response].'
 ],'AMINA: I cannot find the library book. / KOLA: When did you last use it? / AMINA: During lunch in the reading room.','Each turn responds to the previous one and advances the same situation.',1,'connected turns'),
 q(DIALOGUE,3,'Which request uses a suitable register for a learner speaking to a principal?',[
  'Please, ma, may I explain why I was absent yesterday?','Hey, what’s up? I wasn’t around yesterday.','Abeg, make I yarn you something.','You must listen to me now.'
 ],'Please, ma, may I explain why I was absent yesterday?','The relationship calls for respectful, relatively formal language.',1,'register'),
 q(DIALOGUE,4,'Which request is most natural between close friends?',[
  'Can you send me the notes after school?','Most Distinguished Sir, I humbly request transmission of your academic notes.','You are hereby commanded to provide the notes.','The notes shall be transmitted pursuant to this request.'
 ],'Can you send me the notes after school?','Informal relationships generally allow a natural conversational register.',1,'register'),
 q(DIALOGUE,5,'Which script-format line identifies the speaker clearly?',[
  'KUNLE: Did you submit the form?','“Did you submit the form?” said Kunle. ZAINAB: Not yet.','Did you submit the form without any speaker label or context','KUNLE “Did you submit the form? without closing punctuation'
 ],'KUNLE: Did you submit the form?','In script format, a speaker label followed consistently by the line makes the turn clear.',1,'script conventions'),
 q(DIALOGUE,6,'Which prose-dialogue sentence is punctuated most clearly?',[
  '“Did you submit the form?” Kunle asked.','“Did you submit the form Kunle asked.','Did you submit the form?” Kunle asked “','“Did you submit the form”? Kunle asked.'
 ],'“Did you submit the form?” Kunle asked.','The quotation marks enclose the exact spoken words, and the question mark belongs to the quoted question.',2,'direct speech punctuation'),
 q(DIALOGUE,7,'What is the best rule when choosing between script dialogue and prose dialogue for a short task?',[
  'Choose one format and use its conventions consistently unless the task specifically requires a change.',
  'Mix speaker labels and quotation conventions randomly in every line.',
  'Never identify speakers.',
  'Use only narration and remove all speech.'
 ],'Choose one format and use its conventions consistently unless the task specifically requires a change.','Consistency helps the reader follow speakers and punctuation clearly.',2,'format consistency'),
 q(DIALOGUE,8,'Which next line best advances this conversation? “LIBRARIAN: Your book is five days overdue.”',[
  'STUDENT: I am sorry. I was ill last week; may I return it today and settle any required penalty?','STUDENT: Football boots are expensive.','STUDENT: Good morning. Good morning. Good morning.','STUDENT: I have nothing to say about the book.'
 ],'STUDENT: I am sorry. I was ill last week; may I return it today and settle any required penalty?','The response addresses the problem, explains the situation and moves toward a resolution.',2,'turn logic'),
 q(DIALOGUE,9,'Which feature most clearly separates good dialogue from a list of unrelated statements?',[
  'Each turn responds to the situation or previous turn and moves the conversation forward.',
  'Every character uses exactly the same words.',
  'Every line begins with a greeting.',
  'No character asks or answers questions.'
 ],'Each turn responds to the situation or previous turn and moves the conversation forward.','Coherence comes from interaction and progression.',1,'coherence'),
 q(DIALOGUE,10,'Which is a common dialogue-writing mistake?',[
  'Making characters ignore what previous speakers have said','Using questions and responses naturally','Adjusting register to relationship','Using punctuation to clarify speech'
 ],'Making characters ignore what previous speakers have said','When turns do not connect, the writing stops functioning as a believable conversation.',2,'misconception detection'),
 q(DIALOGUE,11,'Why should empty greetings and filler be limited in a school dialogue task?',[
  'They can use space without developing the purpose, problem or relationship in the conversation.',
  'Greetings are never allowed in English.',
  'Every dialogue must begin immediately with an argument.',
  'Filler automatically changes dialogue into poetry.'
 ],'They can use space without developing the purpose, problem or relationship in the conversation.','Natural greetings may appear, but most lines should contribute to the conversation.',2,'editing'),
 q(DIALOGUE,12,'Which line most effectively reveals a character’s attitude through dialogue rather than explaining it in narration?',[
  '“You promised to return my calculator yesterday, and I needed it for the test,” Ayo said quietly.','Ayo was annoyed. The author wants you to know this.','The character has an attitude that is negative.','This line is meant to show conflict.'
 ],'“You promised to return my calculator yesterday, and I needed it for the test,” Ayo said quietly.','The words and delivery reveal the source and tone of the conflict through the character’s speech.',2,'character through dialogue'),
 q(DIALOGUE,13,'Which continuation uses suitable formal register? “TEACHER: Why have you not submitted the assignment?”',[
  'STUDENT: I apologize, sir. I misunderstood the deadline; may I submit it before the end of today?','STUDENT: Chill, I will do it whenever.','STUDENT: You worry too much.','STUDENT: Whatever.'
 ],'STUDENT: I apologize, sir. I misunderstood the deadline; may I submit it before the end of today?','The wording is respectful, responsive and suitable for a learner–teacher relationship.',2,'register in context'),
 q(DIALOGUE,14,'A learner writes 12 turns between two characters, but every line could be rearranged in any order without changing the meaning. What is the main weakness?',[
  'The turns are not logically connected and do not develop the conversation.',
  'The dialogue has too many punctuation marks.',
  'Two characters are not enough for dialogue.',
  'Every dialogue must contain a narrator.'
 ],'The turns are not logically connected and do not develop the conversation.','Good dialogue has response logic: later turns depend on what happened earlier.',3,'coherence diagnosis'),
 q(DIALOGUE,15,'Which planning method is strongest before writing a 10–12 turn dialogue about a school problem?',[
  'Identify the speakers and relationship, define the problem and desired outcome, choose suitable register, then make each turn respond and move toward that outcome.',
  'Write twelve random lines first and decide the speakers afterwards.',
  'Use the same wording for every character regardless of relationship.',
  'Fill half the dialogue with greetings and add the problem in the final line.'
 ],'Identify the speakers and relationship, define the problem and desired outcome, choose suitable register, then make each turn respond and move toward that outcome.','Planning speakers, purpose, register and progression produces coherent, purposeful dialogue.',3,'full dialogue planning'),
];

export function authoredNerdc2025EnglishQuestions(topic:string){
 return nerdc2025AuthoredJss2EnglishQuestions.filter(question=>question.topic===topic);
}
