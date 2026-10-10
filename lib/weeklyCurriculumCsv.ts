/** Strict, small UTF-8 CSV parser for curriculum imports; quoted commas and newlines supported. */
export const curriculumHeaders=['classLevel','subjectName','term','weekNumber','dayIndex','topicTitle','objectiveText','sourceReference','curriculumTopicId'] as const;
export function parseCurriculumCsv(input:string):Record<string,string>[]{
 const text=input.replace(/^\uFEFF/,'');
 if(text.length>1_000_000)throw new Error('CSV exceeds 1MB');
 const rows:string[][]=[];let row:string[]=[],cell='',quoted=false,closed=false;
 for(let i=0;i<text.length;i++){
  const ch=text[i];
  if(quoted){
   if(ch==='"'&&text[i+1]==='"'){cell+='"';i++;}
   else if(ch==='"') {quoted=false;closed=true;}
   else cell+=ch;
  }else if(ch==='"'&&!cell&&!closed){quoted=true;}
  else if(ch===','){row.push(cell);cell='';closed=false;}
  else if(ch==='\n'||ch==='\r'){
   if(ch==='\r'&&text[i+1]==='\n')i++;
   row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
   row=[];cell='';closed=false;
  }else if(ch==='"'||closed){throw new Error('Malformed CSV quotation');}
  else cell+=ch;
 }
 if(quoted)throw new Error('Unclosed CSV quotation');
 row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
 if(rows.length<2)throw new Error('CSV requires a header and at least one row');
 const headers=rows.shift()!.map(s=>s.trim());
 if(new Set(headers).size!==headers.length)throw new Error('Duplicate CSV column');
 for(const key of curriculumHeaders.slice(0,8))if(!headers.includes(key))throw new Error('Missing CSV column: '+key);
 if(rows.length>250)throw new Error('Import up to 250 objectives per batch');
 return rows.map((cells,i)=>{
  if(cells.length!==headers.length)throw new Error('Column count mismatch on line '+(i+2));
  return Object.fromEntries(headers.map((h,j)=>[h,cells[j].trim()]));
 });
}
