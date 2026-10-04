import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import postgres from 'postgres';
import ts from 'typescript';

const databaseUrl=process.env.DATABASE_URL||process.env.DIRECT_URL;
if(!databaseUrl){console.error('DIRECT_URL and DATABASE_URL are missing.');process.exit(1)}
const sql=postgres(databaseUrl,{ssl:'require',max:1,connect_timeout:30,idle_timeout:20,max_lifetime:60});
const transientCodes=new Set(['ECONNRESET','ECONNREFUSED','ETIMEDOUT','EPIPE','57P01','57P02','57P03','08000','08003','08006']);
async function withRetry(fn,label,attempts=5){
  let last;
  for(let attempt=1;attempt<=attempts;attempt++){
    try{return await fn()}catch(error){
      last=error;
      const code=String(error?.code||'');
      const transient=transientCodes.has(code)||/connection|socket|tls|reset|terminated|timeout/i.test(String(error?.message||''));
      if(!transient||attempt===attempts)throw error;
      const delay=Math.min(250*2**(attempt-1),2000);
      console.warn(`Transient database error during ${label} (${code||'unknown'}). Retrying ${attempt}/${attempts} after ${delay}ms...`);
      await new Promise(resolve=>setTimeout(resolve,delay));
    }
  }
  throw last;
}
const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));

const transpile=source=>ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022,moduleResolution:ts.ModuleResolutionKind.NodeNext,esModuleInterop:true}}).outputText;
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'avora-ncee-'));
try{
  const prepSrc=await fs.readFile(path.join(root,'lib','nceePrep.ts'),'utf8');
  let editorialSrc=await fs.readFile(path.join(root,'lib','nceeEditorialBank.ts'),'utf8');
  let prepJs=transpile(prepSrc);
  let editorialJs=transpile(editorialSrc).replaceAll("'./nceePrep'","'./nceePrep.mjs'").replaceAll('"./nceePrep"','"./nceePrep.mjs"');
  await fs.writeFile(path.join(temp,'nceePrep.mjs'),prepJs);
  await fs.writeFile(path.join(temp,'nceeEditorialBank.mjs'),editorialJs);
  const mod=await import(`${pathToFileURL(path.join(temp,'nceeEditorialBank.mjs')).href}?v=${Date.now()}`);
  const bank=mod.NCEE_EDITORIAL_QUESTION_BANK;
  if(!Array.isArray(bank)||bank.length!==960)throw new Error(`Expected exactly 960 NCEE editorial questions; found ${bank?.length??'none'}.`);

  const slug=s=>String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90);
  const subjectCache=new Map();
  const skillCache=new Map();
  async function getSubject(name){
    if(subjectCache.has(name))return subjectCache.get(name);
    const [row]=await withRetry(()=>sql`INSERT INTO subjects(slug,name,description) VALUES(${`ncee-${slug(name)}`},${name},${`AVORA Common Entrance preparation: ${name}`}) ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name,description=EXCLUDED.description RETURNING id`,`subject ${name}`);
    subjectCache.set(name,row.id);return row.id;
  }
  async function ensureSkill(item){
    const cacheKey=`${item.classLevel}|${item.domain}|${item.topic}`;
    if(skillCache.has(cacheKey))return skillCache.get(cacheKey);
    const subjectId=await getSubject(item.domain);
    const topicSlug=`${item.classLevel==='Primary 5'?'p5':'p6'}-${slug(item.topic)}`;
    const [topic]=await withRetry(()=>sql`INSERT INTO topics(subject_id,slug,name,stage,order_index) VALUES(${subjectId},${topicSlug},${item.topic},${item.classLevel},0) ON CONFLICT(subject_id,slug) DO UPDATE SET name=EXCLUDED.name,stage=EXCLUDED.stage RETURNING id`,`topic ${cacheKey}`);
    const [skill]=await withRetry(()=>sql`INSERT INTO skills(topic_id,slug,name,description,mastery_threshold) VALUES(${topic.id},${`ncee-${slug(item.topic)}`},${item.topic},${`NCEE preparation skill: ${item.topic}`},0.80) ON CONFLICT(topic_id,slug) DO UPDATE SET name=EXCLUDED.name,description=EXCLUDED.description RETURNING id`,`skill ${cacheKey}`);
    skillCache.set(cacheKey,skill.id);
    return skill.id;
  }

  let inserted=0,updated=0;
  for(const item of bank){
    const skillId=await ensureSkill(item);
    const variant=`ncee:${item.id}`;
    const topicId=`${item.classLevel==='Primary 5'?'ncee-p5':'ncee-p6'}:${slug(item.domain)}:${slug(item.topic)}`;
    const [existing]=await withRetry(()=>sql`SELECT id FROM questions WHERE variant_family=${variant} LIMIT 1`,`question lookup ${variant}`);
    if(existing){
      await withRetry(()=>sql`UPDATE questions SET skill_id=${skillId},source_type='AVORA_ORIGINAL',exam_name='NCEE',prompt=${item.prompt},question_type='MULTIPLE_CHOICE',options=${sql.json(item.options)},correct_answer=${sql.json({value:item.answer})},explanation=${item.explanation},misconception_tags=${['ncee-exam-reasoning']},difficulty=${item.difficulty},status='PUBLISHED',content_origin='AVORA_ORIGINAL',quality_status='REVIEWED',curriculum_objective=${`Prepare for ${item.topic} in ${item.domain}`},class_level=${item.classLevel},curriculum_topic_id=${topicId},assessment_kind='NCEE_PREP',review_version='V11.0.0',question_group=${item.domain},curriculum_order=${item.difficulty},variant_family=${variant} WHERE id=${existing.id}`,`question update ${variant}`);
      updated++;
    }else{
      await withRetry(()=>sql`INSERT INTO questions(skill_id,source_type,exam_name,prompt,question_type,options,correct_answer,explanation,misconception_tags,difficulty,status,content_origin,quality_status,curriculum_objective,class_level,curriculum_topic_id,assessment_kind,review_version,question_group,curriculum_order,variant_family) VALUES(${skillId},'AVORA_ORIGINAL','NCEE',${item.prompt},'MULTIPLE_CHOICE',${sql.json(item.options)},${sql.json({value:item.answer})},${item.explanation},${['ncee-exam-reasoning']},${item.difficulty},'PUBLISHED','AVORA_ORIGINAL','REVIEWED',${`Prepare for ${item.topic} in ${item.domain}`},${item.classLevel},${topicId},'NCEE_PREP','V11.0.0',${item.domain},${item.difficulty},${variant})`,`question insert ${variant}`);
      inserted++;
    }
  }
  // Reconcile interrupted/older V11 NCEE seed runs. Exactly one published row is allowed
  // for each editorial-bank variant. Unexpected or duplicate V11 NCEE rows are retired,
  // never deleted, so the cleanup is reversible and tightly scoped to this seed version.
  const expectedVariants=new Set(bank.map(item=>`ncee:${item.id}`));
  const publishedRows=await withRetry(()=>sql`SELECT id,variant_family FROM questions WHERE review_version='V11.0.0' AND assessment_kind='NCEE_PREP' AND status='PUBLISHED' AND source_type='AVORA_ORIGINAL' AND content_origin='AVORA_ORIGINAL' ORDER BY id`,`NCEE reconciliation scan`);
  const seen=new Set();
  const retireIds=[];
  for(const row of publishedRows){
    const variant=String(row.variant_family||'');
    if(!expectedVariants.has(variant)||seen.has(variant)) retireIds.push(row.id);
    else seen.add(variant);
  }
  if(retireIds.length){
    console.warn(`NCEE reconciliation: retiring ${retireIds.length} stale/duplicate V11 record(s).`);
    for(const id of retireIds){
      await withRetry(()=>sql`UPDATE questions SET status='RETIRED' WHERE id=${id} AND review_version='V11.0.0' AND assessment_kind='NCEE_PREP' AND status='PUBLISHED'`,`retire stale NCEE row ${id}`);
    }
  }
  const counts=await withRetry(()=>sql`SELECT class_level,question_group AS domain,COUNT(*)::int count FROM questions WHERE review_version='V11.0.0' AND assessment_kind='NCEE_PREP' AND status='PUBLISHED' GROUP BY class_level,question_group ORDER BY class_level,question_group`,`NCEE integrity count`);
  const total=counts.reduce((n,r)=>n+Number(r.count),0);
  if(total!==960)throw new Error(`NCEE database seed integrity check failed after reconciliation: expected 960 published V11 records, found ${total}.`);
  console.log(`NCEE assessment bank ready. Inserted ${inserted}, updated ${updated}, total ${total}.`);
  console.table(counts);
} finally {
  await sql.end({timeout:2}).catch(()=>{});
  await fs.rm(temp,{recursive:true,force:true}).catch(()=>{});
}
