import type {NceeBankQuestion} from './nceeQuestionBank';
import {nceeTopicsFor,type NceeDomain,type PrimaryPrepClass} from './nceePrep';

const letter=['A','B','C','D'];
function rotate<T>(xs:T[],n:number){const k=((n%xs.length)+xs.length)%xs.length;return [...xs.slice(k),...xs.slice(0,k)]}
function q(id:string,classLevel:PrimaryPrepClass,domain:NceeDomain,topic:string,prompt:string,options:string[],answer:string,explanation:string,difficulty:1|2|3):NceeBankQuestion{
  if(!options.includes(answer)) throw new Error(`NCEE bank answer missing from options: ${id}`);
  return {id,classLevel,domain,topic,prompt,options,answer,explanation,difficulty,remediationTopic:topic};
}
function nums(level:PrimaryPrepClass,i:number){const o=level==='Primary 6'?7:0;return {a:12+o+i,b:5+(i%5),c:3+(i%4),d:2+(i%3)}}

function mathItem(level:PrimaryPrepClass,topic:string,i:number,id:string):NceeBankQuestion{
 const {a,b,c,d}=nums(level,i);const hard=level==='Primary 6';
 if(topic.includes('Whole numbers')||topic.includes('Number relationships')){
  const cases:Array<()=>[string,string[],string,string]>=[
   ()=>{const n=hard?4_000_000+(i+2)*100_000+37_415:300_000+(i+2)*10_000+4_615;const digit=String(n)[1];const place=10**(String(n).length-2);const ans=(Number(digit)*place).toLocaleString('en-US');return [`In ${n.toLocaleString('en-US')}, what is the value of the digit ${digit}?`,[String(digit),String(Number(digit)*100),String(Number(digit)*1000),ans],ans,`The digit ${digit} is in the ${place.toLocaleString('en-US')}-place, so its value is ${ans}.`]},
   ()=>{const x=(hard?4982:2486)+i*13,y=(hard?3107:1514)+i*11;const ans=(Math.round(x/1000)*1000+Math.round(y/1000)*1000).toLocaleString('en-US');return [`Estimate ${x.toLocaleString()} + ${y.toLocaleString()} to the nearest thousand.`,rotate([ans,(Number(ans.replace(/,/g,''))+1000).toLocaleString(),(Number(ans.replace(/,/g,''))-1000).toLocaleString(),(Number(ans.replace(/,/g,''))+2000).toLocaleString()],i),ans,`Round each number to the nearest thousand, then add.`]},
   ()=>{const x=hard?875_430+i*71:85_430+i*31,y=hard?875_034+i*53:85_304+i*17;const ans=x>y?x:y;return [`Which number is greater: ${x.toLocaleString()} or ${y.toLocaleString()}?`,rotate([x.toLocaleString(),y.toLocaleString(),(ans+100).toLocaleString(),(ans-100).toLocaleString()],i),ans.toLocaleString(),`Compare digits from the highest place value. ${ans.toLocaleString()} is greater.`]},
  ];const [p,o,an,e]=cases[i%cases.length]();return q(id,level,'Mathematics',topic,p,o,an,e,hard?2:1);
 }
 if(topic.includes('Four operations')||topic.includes('Multi-step operations')||topic.includes('Mixed problem')){
  const x=(a+8)*(b+2),y=(c+1)*10,z=hard?17+i:7+i;const ans=x+y-z;const p=i%2?`A store had ${x} pencils, received ${y} more and sold ${z}. How many pencils remained?`:`Evaluate ${x} + ${y} − ${z}.`;return q(id,level,'Mathematics',topic,p,rotate([String(ans),String(ans+10),String(ans-10),String(x+y)],i),String(ans),`Add first: ${x}+${y}=${x+y}. Then subtract ${z}: ${ans}.`,hard?2:1);
 }
 if(topic.includes('Fractions')||topic.includes('Decimals')||topic.includes('Percentages')){
  const den=[2,4,5,10][i%4],num=Math.max(1,den-1-(i%2)),whole=(hard?240:120)+(i%4)*40;const value=whole*num/den;const pct=Math.round(num/den*100);const mode=i%3;
  if(mode===0)return q(id,level,'Mathematics',topic,`What is ${num}/${den} of ${whole}?`,rotate([String(value),String(value+whole/den),String(whole/den),String(whole)],i),String(value),`Find one ${den}th of ${whole}, then multiply by ${num}.`,hard?2:1);
  if(mode===1){const dec=(pct/100).toFixed(2).replace(/0$/,'');return q(id,level,'Mathematics',topic,`${dec} is equal to what percentage?`,rotate([`${pct}%`,`${pct/10}%`,`${pct*10}%`,`${100-pct}%`],i),`${pct}%`,`Multiply the decimal by 100 to convert it to a percentage.`,hard?2:1)}
  const money=(hard?3600:1800)+i*100,discount=[5,10,20,25][i%4],cut=money*discount/100,ans=money-cut;return q(id,level,'Mathematics',topic,`An item costs ₦${money.toLocaleString()}. A ${discount}% discount is given. What is the sale price?`,rotate([`₦${ans.toLocaleString()}`,`₦${cut.toLocaleString()}`,`₦${money.toLocaleString()}`,`₦${(money+cut).toLocaleString()}`],i),`₦${ans.toLocaleString()}`,`${discount}% of ₦${money.toLocaleString()} is ₦${cut.toLocaleString()}; subtract it from the original price.`,hard?2:1);
 }
 if(topic.includes('Ratio')){const r1=2+i%3,r2=3+(i+1)%3,total=(r1+r2)*(hard?720:240),share=total*r2/(r1+r2);return q(id,level,'Mathematics',topic,`Share ₦${total.toLocaleString()} in the ratio ${r1}:${r2}. What is the second share?`,rotate([`₦${share.toLocaleString()}`,`₦${(total-share).toLocaleString()}`,`₦${(total/(r1+r2)).toLocaleString()}`,`₦${total.toLocaleString()}`],i),`₦${share.toLocaleString()}`,`There are ${r1+r2} ratio parts. One part is ₦${(total/(r1+r2)).toLocaleString()}, so ${r2} parts is ₦${share.toLocaleString()}.`,hard?2:1)}
 if(topic.includes('Commercial')){const cp=4000+i*500,profit=[10,15,20,25][i%4],ans=cp+cp*profit/100;return q(id,level,'Mathematics',topic,`A trader buys an item for ₦${cp.toLocaleString()} and makes ${profit}% profit. What is the selling price?`,rotate([`₦${ans.toLocaleString()}`,`₦${(cp*profit/100).toLocaleString()}`,`₦${cp.toLocaleString()}`,`₦${(ans+500).toLocaleString()}`],i),`₦${ans.toLocaleString()}`,`Profit is ${profit}% of cost price; add the profit to the cost price.`,2)}
 if(topic.includes('Measurement')||topic.includes('mensuration')||topic.includes('Perimeter')){const L=8+i,W=4+i%4;const area=L*W,per=2*(L+W);const areaMode=topic.includes('area')||topic.includes('mensuration')||i%2===0;const ans=areaMode?`${area} cm²`:`${per} cm`;return q(id,level,'Mathematics',topic,`A rectangle is ${L} cm long and ${W} cm wide. What is its ${areaMode?'area':'perimeter'}?`,rotate([ans,`${areaMode?per:area} ${areaMode?'cm²':'cm'}`,`${L+W} ${areaMode?'cm²':'cm'}`,`${L*2} ${areaMode?'cm²':'cm'}`],i),ans,areaMode?`Area = length × width = ${L}×${W}=${area} cm².`:`Perimeter = 2(length + width) = 2(${L}+${W})=${per} cm.`,hard?2:1)}
 if(topic.includes('Angles')||topic.includes('shapes')||topic.includes('symmetry')){const x=45+(i%4)*5,y=55+(i%3)*5,ans=180-x-y;return q(id,level,'Mathematics',topic,`Two angles of a triangle are ${x}° and ${y}°. Find the third angle.`,rotate([`${ans}°`,`${x+y}°`,`${180-x}°`,`${180-y}°`],i),`${ans}°`,`Angles in a triangle total 180°, so 180−${x}−${y}=${ans}°.`,2)}
 if(topic.includes('Time')||topic.includes('speed')||topic.includes('rate')){const h=2+i%4,s=hard?60:40,dist=h*s;return q(id,level,'Mathematics',topic,`A vehicle travels ${dist} km in ${h} hours at a steady rate. What is its speed?`,rotate([`${s} km/h`,`${dist+h} km/h`,`${dist*h} km/h`,`${Math.round(s/2)} km/h`],i),`${s} km/h`,`Speed = distance ÷ time = ${dist}÷${h}=${s} km/h.`,hard?2:1)}
 if(topic.includes('Data')||topic.includes('Tables')||topic.includes('averages')||topic.includes('chance')){const base=6+i%4,vals=[base,base+2,base+4,base+6,base+8],mean=base+4;return q(id,level,'Mathematics',topic,`The scores are ${vals.join(', ')}. What is the mean?`,rotate([String(mean),String(mean-1),String(mean+2),String(vals.reduce((x,y)=>x+y,0))],i),String(mean),`Add the scores and divide by ${vals.length}. The mean is ${mean}.`,hard?2:1)}
 throw new Error(`Unhandled Mathematics topic ${topic}`);
}

const scienceFacts:Record<string,[string,string,string[],string][]>={
 'Living things and life processes':[
  ['Which characteristic shows that a plant is living?','It grows',['It never changes','It grows','It is always green','It makes no waste'],'Living things grow and carry out life processes.'],
  ['Which process releases energy from food in living things?','Respiration',['Respiration','Decoration','Reflection','Freezing'],'Respiration releases energy from food.'],
  ['Which part of a plant absorbs most water from the soil?','Roots',['Flowers','Roots','Fruits','Bark'],'Roots absorb water and mineral salts from soil.']],
 'Human body and health':[
  ['Which organ pumps blood around the body?','Heart',['Heart','Brain','Kidney','Stomach'],'The heart pumps blood through blood vessels.'],
  ['Which habit helps prevent many infections?','Regular handwashing',['Sharing cups','Regular handwashing','Skipping sleep','Eating sweets only'],'Handwashing removes germs and reduces spread.'],
  ['Which nutrient is especially important for growth and repair?','Protein',['Protein','Salt','Water only','Sugar only'],'Protein supports growth and tissue repair.']],
 'Plants, animals and habitats':[
  ['Which place is the natural home of an organism?','Habitat',['Habitat','Machine','Market','Hospital'],'A habitat is the place where an organism naturally lives.'],
  ['Which animal is best adapted to living in water?','Fish',['Fish','Goat','Hen','Cat'],'Fish have body features suited to aquatic life.'],
  ['Why do green plants need sunlight?','To make food',['To make food','To make noise','To become animals','To stop growing'],'Green plants use light energy to make food.']],
 'Matter and materials':[
  ['Which change is reversible?','Melting ice',['Melting ice','Burning paper','Rusting iron','Cooking an egg'],'Melted ice can freeze again into solid ice.'],
  ['Which material is transparent?','Clear glass',['Clear glass','Wood','Cardboard','Stone'],'Transparent materials allow light to pass through clearly.'],
  ['Which material is attracted strongly by a magnet?','Iron',['Iron','Rubber','Wood','Glass'],'Iron is a magnetic material.']],
 'Force, motion and simple machines':[
  ['A push or pull is called what?','Force',['Force','Heat','Sound','Light'],'A force is a push or a pull.'],
  ['Which simple machine is a seesaw?','Lever',['Lever','Pulley','Screw','Wedge'],'A seesaw acts as a lever around a pivot.'],
  ['What does friction usually do to moving objects?','Opposes motion',['Opposes motion','Creates food','Removes mass','Stops gravity'],'Friction acts against motion between surfaces.']],
 'Energy, light, heat and sound':[
  ['Which object is a source of light?','The Sun',['The Sun','A closed book','A stone','A wooden chair'],'The Sun produces its own light.'],
  ['Which material is a good conductor of heat?','Metal spoon',['Metal spoon','Wood','Plastic','Rubber'],'Metals transfer heat more readily than many non-metals.'],
  ['Sound is produced when objects do what?','Vibrate',['Vibrate','Disappear','Freeze','Stop moving forever'],'Vibrations produce sound waves.']],
 'Earth, weather and environment':[
  ['Which instrument measures rainfall?','Rain gauge',['Rain gauge','Thermometer','Ruler','Clock'],'A rain gauge measures the amount of rainfall.'],
  ['Which action helps reduce soil erosion?','Planting grass',['Planting grass','Removing all plants','Burning vegetation','Pouring oil on soil'],'Plant roots help hold soil in place.'],
  ['Which practice helps keep the environment clean?','Proper waste disposal',['Proper waste disposal','Dumping refuse in drains','Burning plastic indoors','Littering roads'],'Proper waste disposal reduces pollution and blockage.']],
 'Technology, tools and safety':[
  ['Which item protects the eyes during some workshop activities?','Safety goggles',['Safety goggles','Slippers','Notebook','Spoon'],'Safety goggles protect the eyes from particles and splashes.'],
  ['What should you do before using an unfamiliar tool?','Learn the safety instructions',['Learn the safety instructions','Use it carelessly','Throw it','Hide it'],'Knowing safe use helps prevent accidents.'],
  ['Which device is used to enter text into a computer?','Keyboard',['Keyboard','Monitor','Speaker','Printer'],'A keyboard is an input device used to type text.']],
 'Body systems and healthy living':[
  ['Which organ pumps blood around the body?','Heart',['Heart','Lung','Kidney','Brain'],'The heart pumps blood through the circulatory system.'],
  ['Which system helps the body take in oxygen?','Respiratory system',['Respiratory system','Skeletal system','Digestive system','Excretory system'],'The respiratory system brings oxygen into the body.'],
  ['Why is a balanced diet important?','It supplies different nutrients the body needs',['It supplies different nutrients the body needs','It removes the need for water','It prevents all exercise','It makes sleep unnecessary'],'Different nutrients support energy, growth, repair and health.']],
 'Ecology and environmental care':[
  ['Which action best reduces soil erosion on a bare slope?','Planting grass',['Planting grass','Removing vegetation','Burning all plants','Pouring oil'],'Plant roots hold soil while cover reduces runoff.'],
  ['A food chain shows what?','Feeding relationships',['Feeding relationships','Road directions','Weather symbols','House plans'],'A food chain shows who eats whom in an ecosystem.'],
  ['Which activity can pollute a river?','Dumping waste into it',['Dumping waste into it','Planting trees nearby','Using a bin','Cleaning the bank'],'Waste can contaminate water and harm organisms.']],
 'Materials and changes':[
  ['Which change is reversible?','Melting ice',['Melting ice','Burning paper','Rusting iron','Cooking an egg'],'Melting can be reversed by freezing.'],
  ['Which change forms a new substance?','Rusting iron',['Rusting iron','Melting wax','Freezing water','Dissolving sugar temporarily'],'Rusting forms iron oxide, a new substance.'],
  ['Which property makes copper useful for electric wires?','It conducts electricity',['It conducts electricity','It is edible','It dissolves in air','It is transparent'],'Copper allows electric current to pass through easily.']],
 'Forces, machines and energy':[
  ['A wheelbarrow helps by doing what?','Reducing the effort needed to move a load',['Reducing the effort needed to move a load','Increasing the load mass','Stopping gravity','Creating food'],'It provides mechanical advantage.'],
  ['What type of energy is stored in food?','Chemical energy',['Chemical energy','Sound energy','Light energy','Magnetic energy'],'Food stores chemical energy.'],
  ['Which simple machine is used to raise a flag?','Pulley',['Pulley','Wedge','Wheelbarrow','Screw'],'A pulley changes the direction of the pulling force.']],
 'Electricity and simple circuits':[
  ['For a bulb to light, a simple circuit must be what?','Complete',['Complete','Open','Broken','Wet'],'Current needs a complete closed path.'],
  ['Which material is an electrical conductor?','Copper',['Copper','Rubber','Dry wood','Plastic'],'Copper allows electric current to pass.'],
  ['What is the purpose of a switch in a circuit?','To open or close the circuit',['To open or close the circuit','To make water','To measure mass','To store food'],'A switch controls whether current can flow.']],
 'Light, sound and heat':[
  ['Which surface reflects light best?','A smooth mirror',['A smooth mirror','Black cloth','Rough soil','Cardboard'],'A smooth shiny surface reflects light strongly.'],
  ['Sound travels because particles do what?','Vibrate',['Vibrate','Disappear','Freeze','Grow'],'Vibrations pass energy through a medium.'],
  ['Which material is a good heat insulator?','Wood',['Wood','Copper','Aluminium','Iron'],'Wood transfers heat poorly compared with metals.']],
 'Earth, space, weather and resources':[
  ['What causes day and night?','Earth rotating on its axis',['Earth rotating on its axis','The Moon stopping','Rainfall','Clouds moving'],'Earth’s rotation causes different parts to face the Sun.'],
  ['Which resource is renewable?','Sunlight',['Sunlight','Coal','Petroleum','Natural gas'],'Sunlight is naturally replenished.'],
  ['Which instrument shows wind direction?','Wind vane',['Wind vane','Rain gauge','Thermometer','Measuring cylinder'],'A wind vane points according to wind direction.']],
 'Technology, ICT awareness and safety':[
  ['What should you do with a suspicious message asking for your password?','Tell a trusted adult and do not share it',['Tell a trusted adult and do not share it','Send the password','Forward it to strangers','Ignore all safety rules'],'Passwords should stay private and suspicious requests should be reported.'],
  ['Which device displays information from a computer?','Monitor',['Monitor','Keyboard','Mouse','Microphone'],'A monitor is an output device that displays visual information.'],
  ['Which practice protects a device and its user?','Keeping liquids away from electrical equipment',['Keeping liquids away from electrical equipment','Using wet hands on plugs','Pulling cables roughly','Sharing every password'],'Water near electrical equipment can cause damage or injury.']],
};
function scienceItem(level:PrimaryPrepClass,topic:string,i:number,id:string){const arr=scienceFacts[topic];if(!arr)throw new Error(`Unhandled Science topic ${topic}`);const base=arr[i%arr.length];const suffix=Math.floor(i/arr.length);let prompt=base[0];if(suffix>0)prompt=prompt.replace(/\?$/,` in this situation ${suffix+1}?`);return q(id,level,'Basic Science & Technology',topic,prompt,rotate(base[2],i),base[1],base[3],level==='Primary 6'?2:1)}

const englishSets:Record<string,[string,string,string[],string][]>={
 'Reading for main idea':[['A passage explains how pupils planted trees, watered them and cared for them. What is the main idea?','Pupils cared for newly planted trees',['Pupils cared for newly planted trees','Trees can talk','The school closed','Water is expensive'],'The main idea is the central point repeated across the passage.']],
 'Reading for details and inference':[['Bisi carried a raincoat although the sky was clear. Later dark clouds gathered. What can we infer?','Bisi thought it might rain',['Bisi thought it might rain','Bisi hated sunshine','It was already flooding','The coat was torn'],'The action suggests she expected possible rain.']],
 'Vocabulary in context':[['In “The path was narrow, so only one person could pass at a time,” what does narrow mean?','not wide',['not wide','very noisy','very long','very bright'],'The sentence clue shows the path had little width.']],
 'Word classes':[['In “The cheerful child smiled,” which word is an adjective?','cheerful',['cheerful','child','smiled','The'],'“Cheerful” describes the noun “child”.']],
 'Tenses and agreement':[['Choose the correct sentence.','The girls play outside.',['The girls play outside.','The girls plays outside.','The girls is play outside.','The girls playing outside.'],'A plural subject takes “play” in the simple present.']],
 'Sentence construction':[['Which is a complete sentence?','The pupils opened their books.',['The pupils opened their books.','Because the rain','Running very fast','Under the table'],'A complete sentence expresses a full thought with a subject and predicate.']],
 'Spelling and punctuation':[['Which sentence is punctuated correctly?','Where are you going?',['Where are you going?','where are you going?','Where are you going.','where are you going.'],'A sentence begins with a capital letter and a direct question ends with a question mark.']],
 'Meaning, synonyms and antonyms':[['Choose the word closest in meaning to “rapid”.','quick',['quick','slow','quiet','weak'],'Rapid means quick.']],
 'Everyday usage and editing':[['Choose the correct form: “She _____ two pencils.”','has',['has','have','having','are having'],'“She” is third-person singular, so “has” is correct.']],
 'Short passages and exam comprehension':[['A short passage says Kola missed the bus because he left home late. Why did Kola miss the bus?','He left home late',['He left home late','The bus broke down','He forgot his bag','It rained'],'The answer is stated directly in the passage.']],
 'Comprehension and inference':[['Tunde packed extra water before a long football match on a hot day. Why most likely?','He expected to need more water',['He expected to need more water','He planned to pour it away','He disliked football','He was going swimming'],'The context supports the inference that he expected thirst.']],
 'Vocabulary and word meaning':[['Choose the word closest in meaning to “scarce”.','rare',['rare','plentiful','wide','smooth'],'Scarce means not easily available or limited.']],
 'Grammar and word classes':[['In “The careful driver stopped suddenly,” which word is an adverb?','suddenly',['suddenly','careful','driver','The'],'“Suddenly” tells how the driver stopped.']],
 'Tenses and subject–verb agreement':[['Yesterday, Musa _____ to the market.','went',['went','go','goes','going'],'“Yesterday” signals past time, and the past tense of “go” is “went”.']],
 'Sentence meaning and transformation':[['Which sentence means the same as “Amina is taller than Bisi”?','Bisi is shorter than Amina.',['Bisi is shorter than Amina.','Bisi is taller than Amina.','They are the same height.','Amina is shorter than Bisi.'],'If Amina is taller, Bisi must be shorter.']],
 'Spelling, punctuation and usage':[['Which sentence uses punctuation correctly?','“Come here,” Mum said.',['“Come here,” Mum said.','“Come here” Mum said','come here, Mum said.','Come here Mum said?'],'Direct speech uses quotation marks and suitable punctuation.']],
 'Idioms and contextual meaning':[['“Keep an eye on my bag” means what?','Watch it carefully',['Watch it carefully','Draw an eye on it','Hide it','Open it'],'The idiom means to watch or guard something.']],
 'Ordering ideas and cohesion':[['Choose the best connector: “Tola studied hard; _____, she passed.”','therefore',['therefore','however','unless','although'],'“Therefore” signals a result.']],
 'Editing and error recognition':[['Which sentence is correct?','She has finished her work.',['She has finished her work.','She have finished her work.','She has finish her work.','She having finished her work.'],'The auxiliary and participle agree correctly.']],
 'Integrated English exam practice':[['Choose the best completion: “Although it was raining, the match _____.”','continued',['continued','continue','continuing','has continue'],'The past-tense context requires “continued”.']],
};
const englishWords=[['tiny','small','huge'],['ancient','old','modern'],['brave','courageous','cowardly'],['silent','quiet','noisy'],['begin','start','finish'],['difficult','hard','easy'],['purchase','buy','sell'],['assist','help','hinder']];
function englishItem(level:PrimaryPrepClass,topic:string,i:number,id:string){const arr=englishSets[topic];if(!arr)throw new Error(`Unhandled English topic ${topic}`);let [p,a,o,e]=arr[0];if(i>0){const [w,syn,ant]=englishWords[(i-1)%englishWords.length];if(topic.includes('Vocabulary')||topic.includes('synonyms')||topic.includes('word meaning')){const ask=i%2===0?'closest':'opposite';a=ask==='closest'?syn:ant;p=`Choose the word ${ask==='closest'?'closest':'opposite'} in meaning to “${w}”.`;o=ask==='closest'?[syn,ant,'bright','round']:[ant,syn,'bright','round'];e=`The correct ${ask==='closest'?'synonym':'antonym'} of “${w}” here is “${a}”.`;}else p=`${p} (Set ${i+1})`;}
 return q(id,level,'English Studies',topic,p,rotate(o,i),a,e,level==='Primary 6'?2:1)}

const nveCases:Record<string,[string,string,string[],string][]>={
 'Family and community responsibilities':[['Your younger sibling needs help carrying school books. What is the responsible action?','Help carefully',['Help carefully','Mock the child','Hide the books','Walk away'],'Helping appropriately shows family responsibility.']],
 'Honesty, respect and cooperation':[['You break a classroom ruler by mistake. What should you do?','Tell the truth and report it',['Tell the truth and report it','Blame another pupil','Hide it','Lie about it'],'Honesty means accepting responsibility for what happened.']],
 'Rules, rights and responsibilities':[['Why should pupils follow fair school rules?','They help keep the school safe and orderly',['They help keep the school safe and orderly','They allow bullying','They remove all rights','They make learning impossible'],'Fair rules protect people and support order.']],
 'Leadership and followership':[['A good class leader should do what?','Listen fairly and serve the group',['Listen fairly and serve the group','Threaten others','Keep all materials','Ignore every idea'],'Good leadership includes service, fairness and listening.']],
 'National symbols and identity':[['Which is a national symbol of Nigeria?','The national flag',['The national flag','A private shop sign','A family photo','A school desk'],'The national flag represents Nigeria.']],
 'Peace, safety and conflict prevention':[['Two pupils disagree over a book. What is the best first step?','Talk calmly and seek a fair solution',['Talk calmly and seek a fair solution','Fight','Destroy the book','Call others to quarrel'],'Peaceful conflict resolution starts with calm communication.']],
 'Environment and public property':[['Which item is public property?','A government library',['A government library','A private pencil','A family shoe','A personal lunchbox'],'Public property is provided for community use.']],
 'Good citizenship in daily life':[['Which action shows good citizenship?','Protecting public property',['Protecting public property','Damaging road signs','Spreading false rumours','Ignoring lawful duties'],'Good citizens protect shared resources.']],
 'Citizenship and national identity':[['Which action best shows responsible citizenship?','Obeying lawful rules and protecting public property',['Obeying lawful rules and protecting public property','Destroying public property','Spreading false rumours','Refusing every community duty'],'Responsible citizenship combines rights with duties.']],
 'Rights, duties and responsible behaviour':[['A right is best described as what?','A lawful freedom or protection',['A lawful freedom or protection','Permission to harm others','Freedom from every duty','A reward for cheating'],'Rights are legitimate freedoms or protections.']],
 'Leadership, democracy and cooperation':[['What makes a class election fair?','Eligible pupils vote and votes are counted honestly',['Eligible pupils vote and votes are counted honestly','Only friends vote','Results are changed secretly','Voters are threatened'],'Fair participation and honest counting support democracy.']],
 'Integrity and consequences of choices':[['You find money that belongs to a classmate. What best shows integrity?','Return it or report it to a responsible adult',['Return it or report it to a responsible adult','Keep it','Spend half','Hide it'],'Integrity means doing what is honest even when no one is forcing you.']],
 'Peace, security and conflict resolution':[['A rumour is causing a quarrel. What should a responsible pupil do?','Avoid spreading it and seek truthful information',['Avoid spreading it and seek truthful information','Add more rumours','Threaten others','Start a fight'],'Responsible conflict prevention avoids misinformation and seeks facts.']],
 'National symbols, institutions and unity':[['Why should national symbols be treated with respect?','They represent the country and shared identity',['They represent the country and shared identity','They belong to one family','They are toys','They replace all laws'],'National symbols represent collective identity.']],
 'Community service and public property':[['Which action is community service?','Helping clean a shared public space',['Helping clean a shared public space','Damaging a public tap','Stealing library books','Blocking a drain'],'Community service benefits shared spaces and people.']],
 'Values in real-life situations':[['A friend asks you to lie so he avoids punishment. What should you do?','Refuse to lie and encourage the truth',['Refuse to lie and encourage the truth','Lie immediately','Blame another pupil','Hide the facts'],'Honesty and responsibility require truthfulness.']],
};
function nveItem(level:PrimaryPrepClass,topic:string,i:number,id:string){const arr=nveCases[topic];if(!arr)throw new Error(`Unhandled NVE topic ${topic}`);let [p,a,o,e]=arr[0];if(i>0)p=`${p.replace(/\?$/,'')} — situation ${i+1}?`;return q(id,level,'National Values Education',topic,p,rotate(o,i),a,e,level==='Primary 6'?2:1)}

function quantItem(level:PrimaryPrepClass,topic:string,i:number,id:string){const hard=level==='Primary 6';
 if(topic.includes('Number patterns')||topic.includes('number sequences')){const start=2+i%4,step=hard?(i%2?3:2):2;const seq=[0,1,2,3].map(k=>start*Math.pow(step,k));const ans=start*Math.pow(step,4);return q(id,level,'Quantitative & Vocational Aptitude',topic,`What comes next: ${seq.join(', ')}, ____?`,rotate([String(ans),String(ans-step),String(ans+step),String(seq[3]+step)],i),String(ans),`Each term is multiplied by ${step}.`,hard?2:1)}
 if(topic.includes('Missing-number')||topic.includes('Missing values')){const st=4+i,inc=3+i%4,vals=[st,st+inc,st+2*inc,st+3*inc,st+4*inc],ans=vals[2];return q(id,level,'Quantitative & Vocational Aptitude',topic,`Find the missing number: ${vals[0]}, ${vals[1]}, __, ${vals[3]}, ${vals[4]}.`,rotate([String(ans),String(ans-1),String(ans+1),String(ans+inc)],i),String(ans),`The sequence increases by ${inc} each time.`,hard?2:1)}
 if(topic.includes('Shape')||topic.includes('Diagram')){const turns=[90,180,270,360][i%4],name=turns===undefined?'turn':`${turns}° turn`;const ans=turns===90?'quarter-turn':turns===180?'half-turn':turns===270?'three-quarter turn':'full turn';return q(id,level,'Quantitative & Vocational Aptitude',topic,`A shape is rotated through ${turns}°. Which description matches the turn?`,rotate([ans,'quarter-turn','half-turn','full turn'].filter((v,j,a)=>a.indexOf(v)===j).concat(['three-quarter turn']).slice(0,4),i),ans,`${turns}° corresponds to a ${ans}.`,hard?2:1)}
 if(topic.includes('comparisons')||topic.includes('analogies')){const x=3+i%5,ans=x*x;return q(id,level,'Quantitative & Vocational Aptitude',topic,`${x} is to ${ans} as ${x+1} is to _____.`,rotate([String((x+1)**2),String(x+1+x),String(ans+x),String((x+1)*2)],i),String((x+1)**2),`The second number is the square of the first.`,hard?2:1)}
 if(topic.includes('Tables')||topic.includes('coded')){const mon=10+i,tue=mon+4+i%3;const ans=tue-mon;return q(id,level,'Quantitative & Vocational Aptitude',topic,`A table shows ${mon} items on Monday and ${tue} on Tuesday. How many more were recorded on Tuesday?`,rotate([String(ans),String(mon+tue),String(tue),String(mon)],i),String(ans),`Compare the two values by subtracting: ${tue}−${mon}=${ans}.`,hard?2:1)}
 if(topic.includes('money')||topic.includes('Rate')){const count=3+i%4,unit=hard?250:150,total=count*unit;return q(id,level,'Quantitative & Vocational Aptitude',topic,`${count} identical notebooks cost ₦${total}. What is the cost of one?`,rotate([`₦${unit}`,`₦${total}`,`₦${unit+50}`,`₦${Math.max(50,unit-50)}`],i),`₦${unit}`,`Divide the total cost by ${count}: ₦${total}÷${count}=₦${unit}.`,hard?2:1)}
 if(topic.includes('Tools')||topic.includes('occupations')||topic.includes('Vocational')){const pairs=[['carpenter','saw'],['mason','trowel'],['tailor','needle'],['farmer','hoe'],['doctor','stethoscope'],['mechanic','spanner'],['painter','brush'],['electrician','tester'],['cook','ladle'],['barber','clipper']];const [role,tool]=pairs[i%pairs.length];return q(id,level,'Quantitative & Vocational Aptitude',topic,`Which tool is most closely associated with a ${role}?`,rotate([tool,'thermometer','ruler','broom'].filter((x,j,a)=>a.indexOf(x)===j).slice(0,4),i),tool,`A ${role} commonly uses a ${tool} for the job.`,hard?2:1)}
 if(topic.includes('Practical')||topic.includes('Mixed timed')){const vals=[8,16,24,31,40].map(x=>x+i),ans=31+i;return q(id,level,'Quantitative & Vocational Aptitude',topic,`Which number does not fit the pattern of adding 8: ${vals.join(', ')}?`,rotate(vals.map(String),i).slice(0,4).includes(String(ans))?rotate(vals.map(String),i).slice(0,4):[String(ans),String(vals[0]),String(vals[1]),String(vals[4])],String(ans),`${ans} breaks the +8 pattern followed by the other values.`,hard?3:2)}
 throw new Error(`Unhandled Quant topic ${topic}`);
}

const analogyPairs=[['bird','nest','bee','hive'],['puppy','dog','kitten','cat'],['shoe','foot','glove','hand'],['teacher','school','doctor','hospital'],['day','night','hot','cold'],['knife','cut','pen','write'],['book','read','food','eat'],['eye','see','ear','hear'],['cow','calf','goat','kid'],['king','queen','man','woman']];
function verbalItem(level:PrimaryPrepClass,topic:string,i:number,id:string){const hard=level==='Primary 6';
 if(topic.includes('relationships')||topic.includes('analogies')){const [a,b,c,d]=analogyPairs[i%analogyPairs.length];return q(id,level,'Verbal Aptitude',topic,`${a} is to ${b} as ${c} is to _____.`,rotate([d,'river','chair','stone'].filter((x,j,a)=>a.indexOf(x)===j).slice(0,4),i),d,`The relationship ${a}→${b} matches ${c}→${d}.`,hard?2:1)}
 if(topic.includes('Odd word')||topic.includes('classification')||topic.includes('Classification')){const sets=[['mango','orange','banana','carrot'],['goat','cow','sheep','eagle'],['red','blue','green','circle'],['spoon','fork','plate','bicycle'],['doctor','nurse','pharmacist','carpenter'],['Monday','Tuesday','Friday','January'],['shirt','trouser','dress','table'],['lion','tiger','leopard','yam'],['pen','pencil','crayon','shoe'],['rice','beans','yam','soap']];const xs=sets[i%sets.length],ans=xs[3];return q(id,level,'Verbal Aptitude',topic,`Which word does not belong? ${xs.join(', ')}.`,rotate(xs,i),ans,`${ans} is from a different group from the other three.`,hard?2:1)}
 if(topic.includes('Alphabet')||topic.includes('Letter and word codes')){const word=['CAT','DOG','SUN','MAP','FAN','BED','TOP','RUG','PEN','BOX'][i%10];const coded=word.split('').map(ch=>String.fromCharCode(ch.charCodeAt(0)+1)).join('');return q(id,level,'Verbal Aptitude',topic,`If each letter moves one step forward in the alphabet, how is ${word} coded?`,rotate([coded,word,word.split('').reverse().join(''),coded.split('').reverse().join('')],i),coded,`${word.split('').map((c,j)=>`${c}→${coded[j]}`).join(', ')}.`,hard?2:1)}
 if(topic.includes('Word completion')||topic.includes('Sentence completion')){const rows:Array<[string,string,string[]]>=[['The road was flooded, _____ we took another route.','so',['so','but','unless','although']],['She was tired, _____ she finished her work.','but',['but','so','because','therefore']],['Take an umbrella _____ it may rain.','because',['because','but','unless','although']],['We will go outside _____ the rain stops.','when',['when','but','because','although']],['He studied hard _____ he could improve.','so that',['so that','but','unless','although']],['The bell rang, _____ the pupils entered class.','and',['and','unless','because','although']],['I will call you _____ I arrive.','when',['when','but','because','although']],['She smiled _____ she was happy.','because',['because','unless','but','although']],['We waited _____ the bus arrived.','until',['until','but','because','although']],['He ran fast _____ he missed the bus.','but',['but','so','because','therefore']]];const [p,a,o]=rows[i%rows.length];return q(id,level,'Verbal Aptitude',topic,p,rotate(o,i),a,`The connector “${a}” gives the sentence the intended logical meaning.`,hard?2:1)}
 if(topic.includes('Synonyms')||topic.includes('Opposites')){const rows=[['ancient','modern'],['scarce','plentiful'],['brave','cowardly'],['silent','noisy'],['begin','finish'],['difficult','easy'],['accept','reject'],['victory','defeat'],['include','exclude'],['increase','decrease']];const [w,a]=rows[i%10];return q(id,level,'Verbal Aptitude',topic,`Choose the word opposite in meaning to “${w}”.`,rotate([a,w,'bright','round'],i),a,`${a} expresses the opposite meaning of ${w}.`,hard?2:1)}
 if(topic.includes('Ordering')){const words=[['bag','ball','banana','bank'],['ant','apple','arm','axe'],['cap','car','cat','can'],['dog','door','dot','dove'],['fan','farm','fast','fat'],['go','goal','goat','gold'],['hat','have','hawk','hay'],['ink','inside','into','iron'],['jam','jar','jaw','jazz'],['kite','kit','king','kind']][i%10];const ans=[...words].sort((a,b)=>a.localeCompare(b))[0];return q(id,level,'Verbal Aptitude',topic,`Which word comes first in dictionary order? ${words.join(', ')}.`,rotate(words,i),ans,`${ans} comes first when letters are compared from left to right.`,hard?2:1)}
 if(topic.includes('Sentence logic')||topic.includes('Mixed timed')){const days=['Monday','Wednesday','Friday','Sunday'];const ans='Sunday';return q(id,level,'Verbal Aptitude',topic,`Complete the pattern: ${days[0]}, ${days[1]}, ${days[2]}, _____.`,rotate([ans,'Saturday','Tuesday','Thursday'],i),ans,`The pattern skips one day each time.`,hard?3:2)}
 throw new Error(`Unhandled Verbal topic ${topic}`);
}

const domainBuilders:Record<NceeDomain,(level:PrimaryPrepClass,topic:string,i:number,id:string)=>NceeBankQuestion>={
 'Mathematics':mathItem,
 'Basic Science & Technology':scienceItem,
 'English Studies':englishItem,
 'National Values Education':nveItem,
 'Quantitative & Vocational Aptitude':quantItem,
 'Verbal Aptitude':verbalItem,
};

/**
 * V10.12 editorial bank target: at least 80 unique items per domain per class.
 * This guarantees eight 60-question mock forms can be assembled with zero
 * question-id reuse within the eight-form series for a learner class.
 */
export function buildNceeEditorialBank(){
 const out:NceeBankQuestion[]=[];
 for(const cls of ['Primary 5','Primary 6'] as PrimaryPrepClass[]){
  for(const domain of Object.keys(domainBuilders) as NceeDomain[]){
   const topics=nceeTopicsFor(cls,domain);
   const perTopic=Math.ceil(80/topics.length);
   for(const topic of topics){
    for(let i=0;i<perTopic;i++){
      const safe=topic.id.replace(/^ncee-/,'');
      out.push(domainBuilders[domain](cls,topic.title,i,`ed-${safe}-${String(i+1).padStart(2,'0')}`));
    }
   }
  }
 }
 return out;
}

export const NCEE_EDITORIAL_QUESTION_BANK=buildNceeEditorialBank();
