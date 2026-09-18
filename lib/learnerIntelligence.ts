export type EvidenceStatus='STARTING'|'NEEDS_TEACHING'|'DEVELOPING'|'PRACTISING'|'SECURE'|'MASTERED';
export type EvidenceConfidence='LOW'|'BUILDING'|'GOOD'|'STRONG';

export function evidenceConfidence(n:number):EvidenceConfidence{
 if(n>=10)return 'STRONG';
 if(n>=6)return 'GOOD';
 if(n>=3)return 'BUILDING';
 return 'LOW';
}

export function evidenceStatus(score:number,evidence:number,recentWrong=0):EvidenceStatus{
 if(evidence<=0)return 'STARTING';
 if(evidence<3)return score<.5?'NEEDS_TEACHING':'DEVELOPING';
 if(score<.4)return 'NEEDS_TEACHING';
 if(score<.65)return 'DEVELOPING';
 if(score<.8)return 'PRACTISING';
 if(evidence>=7&&recentWrong===0)return 'MASTERED';
 return 'SECURE';
}

export function inferMisconception(input:{topic?:string;skill?:string;microSkill?:string;prompt?:string;wrongAnswerReasoning?:string;misconceptionTags?:string[]}):{key:string;note:string}|null{
 const text=[input.topic,input.skill,input.microSkill,input.prompt,input.wrongAnswerReasoning,...(input.misconceptionTags||[])].filter(Boolean).join(' ').toLowerCase();
 if(/simultaneous|elimination/.test(text))return {key:'ELIMINATION_CHOICE',note:'May be unsure when coefficients cancel, when to add/subtract, or when an equation must be scaled first.'};
 if(/negative|directed|sign/.test(text))return {key:'SIGN_CONTROL',note:'May be losing negative signs while combining terms, subtracting, or transposing.'};
 if(/fraction|denominator|numerator/.test(text))return {key:'FRACTION_STRUCTURE',note:'May be operating on numerators/denominators without preserving equivalent value.'};
 if(/percentage|percent/.test(text))return {key:'PERCENT_OF_QUANTITY',note:'May be confusing the percentage amount with the final quantity or using the wrong base.'};
 if(/bodmas|order of operation/.test(text))return {key:'ORDER_OF_OPERATIONS',note:'May be calculating strictly left-to-right instead of respecting grouping and operation priority.'};
 if(/concord|subject.*verb|agreement/.test(text))return {key:'TRUE_SUBJECT_AGREEMENT',note:'May be choosing the verb from a nearby noun instead of the true grammatical subject.'};
 if(/comprehension|passage|evidence/.test(text))return {key:'PASSAGE_EVIDENCE',note:'May be answering from general knowledge instead of locating evidence in the passage.'};
 if(/vowel|consonant|oral english|speech sound/.test(text))return {key:'SOUND_CONTRAST',note:'May need slower contrast practice to distinguish the target speech sounds.'};
 if(/punctuation|apostrophe|comma/.test(text))return {key:'PUNCTUATION_FUNCTION',note:'May know the mark visually but not the grammatical job it performs in the sentence.'};
 return null;
}

export function remediationReason(rows:Array<{topic:string;percent:number;total:number}>){
 const weak=[...rows].sort((a,b)=>a.percent-b.percent||b.total-a.total).filter(x=>x.percent<75);
 if(!weak.length)return {topic:null,reason:'No urgent weakness was detected. Continue with mixed independent practice to confirm retention.'};
 const first=weak[0];
 const reason=first.percent<40
  ?`${first.topic} needs full reteaching before another high-stakes mock. AVORA should rebuild prerequisites, teach worked examples, then retest with fresh questions.`
  :`${first.topic} is developing but not secure. AVORA should target the weakest subskills, use guided examples, then require independent proof.`;
 return {topic:first.topic,reason};
}
