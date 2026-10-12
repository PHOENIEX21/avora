import {sql,withDbRetry} from '@/lib/db';
export const COMMUNITY_OWNER_ID='99d75234-7ac5-43e7-bd93-67533e1eb2da';
export function isCommunityOwner(userId:string){return userId===COMMUNITY_OWNER_ID}
export async function isCommunityAdmin(userId:string){
 if(isCommunityOwner(userId))return true;
 const rows=await withDbRetry(()=>sql`SELECT 1 FROM study_room_admins WHERE user_id=${userId} LIMIT 1`);
 return rows.length>0;
}
