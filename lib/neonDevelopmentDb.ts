import {Pool,neonConfig,type PoolClient} from '@neondatabase/serverless';
import WebSocket from 'ws';
import {HttpsProxyAgent} from 'https-proxy-agent';
import type postgres from 'postgres';

const developmentBranch='br-blue-scene-ayydvo7l';
const developmentHosts=new Set([
 'ep-rapid-sunset-aye7rhiz-pooler.c-5.us-east-2.aws.neon.tech',
 'ep-rapid-sunset-aye7rhiz.c-5.us-east-2.aws.neon.tech'
]);

/** Optional cloud-development transport; native postgres remains the default. */
export function createNeonDevelopmentSql(connectionString:string){
 if(process.env.NODE_ENV==='production')throw new Error('Neon development transport is unavailable in production.');
 if(!developmentHosts.has(new URL(connectionString).hostname))throw new Error('Neon development endpoint does not match the isolated branch.');
 const proxy=process.env.HTTPS_PROXY||process.env.https_proxy;
 neonConfig.webSocketConstructor=class extends WebSocket{
  constructor(address:string,protocols?:string|string[]){
   super(address,protocols,{agent:proxy?new HttpsProxyAgent(proxy):undefined});
  }
 };
 const pool=new Pool({connectionString,max:3,idleTimeoutMillis:30000,connectionTimeoutMillis:15000});
 const verified=new WeakSet<PoolClient>();
 async function verify(client:PoolClient){
  if(verified.has(client))return;
  const result=await client.query("SELECT current_setting('neon.branch_id',true) AS branch_id");
  if(result.rows[0]?.branch_id!==developmentBranch)throw new Error('Neon development branch identity mismatch.');
  verified.add(client);
 }
 function bind(client?:PoolClient):ReturnType<typeof postgres>{
  const query=async(text:string,params:unknown[]=[])=>{
   const connection=client||await pool.connect();
   try{await verify(connection);const result=await connection.query(text,params);return Object.assign(result.rows,{count:result.rowCount})}
   finally{if(!client)connection.release()}
  };
  const tag=Object.assign((strings:TemplateStringsArray,...params:unknown[])=>
   query(strings.reduce((text,part,index)=>text+(index?'$'+index:'')+part,''),params),{
    json:(value:unknown)=>JSON.stringify(value),
    unsafe:(text:string,params:unknown[]=[])=>query(text,params),
    end:()=>pool.end(),
    begin:async<T>(work:(tx:ReturnType<typeof postgres>)=>Promise<T>)=>{
     if(client)throw new Error('Nested development transactions are unsupported.');
     const connection=await pool.connect();
     try{
      await verify(connection);await connection.query('BEGIN');
      try{const result=await work(bind(connection));await connection.query('COMMIT');return result}
      catch(error){await connection.query('ROLLBACK');throw error}
     }finally{connection.release()}
    }
   });
  return tag as unknown as ReturnType<typeof postgres>;
 }
 return bind();
}
