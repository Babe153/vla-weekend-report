import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const context={window:{}};
vm.runInNewContext(await readFile(path.join(root,'en/content.js'),'utf8'),context);
const report=context.window.REPORT;
const papers=new Map(report.papers.map(p=>[p.id,p]));
let notes=`# ${report.title}\n\n${report.subtitle}\n\n${report.slides.length} slides; about 25 minutes plus 6 reference slides. The 8 additions are abstract-level checks; full texts remain to be verified.\n\n`;
for(const [i,s] of report.slides.entries()){
  notes+=`## ${String(i+1).padStart(2,'0')} ${s.title}\n\nSuggested time: ${s.time}${s.time==='As needed'?'':' min'}\n\n${s.notes}\n\n`;
  notes+=`Sources${s.source?' ('+s.source+')':''}: ${s.refs.map(id=>{const p=papers.get(id);return `[${p.short}](${p.url})`;}).join(', ')}\n\n`;
}
notes+='## Complete bibliography: 22 papers\n\n'+report.papers.map((p,i)=>`${i+1}. ${p.author} (${p.year}, initial preprint). *${p.title}*. [Paper](${p.url})${p.project!==p.url?` · [Project](${p.project})`:''}`).join('\n\n');
notes+='\n\nFigure sources: ../assets/sources.json. Papers and figures belong to the original authors. Research proposals are discussion material, not new experimental results.\n';
await writeFile(path.join(root,'en/speaker-notes.md'),notes,'utf8');
await mkdir(path.join(root,'dist/en'),{recursive:true});
for(const file of ['index.html','content.js','speaker-notes.md'])await copyFile(path.join(root,'en',file),path.join(root,'dist/en',file));
await import('./build-reading-en.mjs');
console.log('Prepared English edition: report, speaker notes and reading handbook.');
