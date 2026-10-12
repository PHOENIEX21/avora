/** Release ordering is term-major and week-minor within a class's academic cycle.
 * Historical published weeks remain available for revision; future weeks do not.
 */
export function canReadReleasedWeek(
 released:{term:number;week:number}|null,
 requested:{term:number;week:number}
):boolean{
 if(!released)return false;
 if(!Number.isInteger(released.term)||!Number.isInteger(released.week)||!Number.isInteger(requested.term)||!Number.isInteger(requested.week))return false;
 if(released.term<1||released.term>3||requested.term<1||requested.term>3||released.week<1||released.week>16||requested.week<1||requested.week>16)return false;
 return requested.term<released.term||(requested.term===released.term&&requested.week<=released.week);
}
