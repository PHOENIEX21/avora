import { sql } from '@/lib/db';
export type AiClaimResult={allowed:false;reason:'DAILY_USER_LIMIT'|'MONTHLY_GLOBAL_LIMIT'|'MONTHLY_USD_BUDGET'}|{allowed:true;eventId:string};
export async function claimAiRequest(userId:string,feature:string):Promise<AiClaimResult>{
 const daily=Math.max(1,Number(process.env.AI_DAILY_REQUEST_LIMIT_PER_USER||50));
 const monthly=Math.max(daily,Number(process.env.AI_MONTHLY_REQUEST_LIMIT_GLOBAL||10000));
 const monthlyUsd=Math.max(0,Number(process.env.AI_MONTHLY_BUDGET_USD||5));
 const [u]=await sql`SELECT COUNT(*)::int n FROM ai_usage_events WHERE user_id=${userId} AND created_at>=date_trunc('day',now()) AND status<>'FAILED'`;
 if(Number(u?.n||0)>=daily)return {allowed:false as const,reason:'DAILY_USER_LIMIT'};
 const [g]=await sql`SELECT COUNT(*)::int n,COALESCE(SUM(estimated_cost_usd),0)::float cost FROM ai_usage_events WHERE created_at>=date_trunc('month',now()) AND status<>'FAILED'`;
 if(Number(g?.n||0)>=monthly)return {allowed:false as const,reason:'MONTHLY_GLOBAL_LIMIT'};
 if(monthlyUsd>0&&Number(g?.cost||0)>=monthlyUsd)return {allowed:false as const,reason:'MONTHLY_USD_BUDGET'};
 const [row]=await sql`INSERT INTO ai_usage_events(user_id,feature,status) VALUES(${userId},${feature},'CLAIMED') RETURNING id`;
 return {allowed:true as const,eventId:String(row.id)};
}
export async function completeAiRequest(eventId:string,usage:{inputTokens?:number;outputTokens?:number;estimatedCostUsd?:number;provider?:string;model?:string}|null,status='COMPLETED'){
 const inputTokens=Number(usage?.inputTokens||0),outputTokens=Number(usage?.outputTokens||0),estimated=Number(usage?.estimatedCostUsd||0);
 await sql`UPDATE ai_usage_events SET input_tokens=${inputTokens},output_tokens=${outputTokens},estimated_cost_usd=${estimated},provider=${usage?.provider||null},model=${usage?.model||null},status=${status} WHERE id=${eventId}`;
 return {inputTokens,outputTokens,estimatedCostUsd:estimated};
}
