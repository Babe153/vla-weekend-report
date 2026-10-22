import { readFile, writeFile, mkdir, copyFile, cp } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
const root = path.resolve(import.meta.dirname, '..');
const context = {window:{}};
vm.runInNewContext(await readFile(path.join(root,'content.js'),'utf8'), context);
const report=context.window.REPORT;
const byId=new Map(report.papers.map(p=>[p.id,p]));
let notes=`# ${report.title}\n\n${report.subtitle}\n\n共 ${report.slides.length} 页，主讲约 22 分钟。最后6页为参考资料。新增8篇为摘要级定位，全文待核。\n\n`;
for(const [i,s] of report.slides.entries()){
  notes+=`## ${String(i+1).padStart(2,'0')} ${s.title}\n\n建议用时：${s.time}${s.time==='按需'?'':' 分钟'}\n\n${s.notes}\n\n`;
  notes+=`来源${s.source?'（'+s.source+'）':''}：${s.refs.map(id=>{const p=byId.get(id);return `[${p.short}](${p.url})`;}).join('、')}\n\n`;
}
notes+='## 22篇论文的完整书目\n\n'+report.papers.map((p,i)=>`${i+1}. ${p.author} (${p.year} 首发). *${p.title}*. [原文](${p.url})${p.project!==p.url?` · [官方项目](${p.project})`:``}`).join('\n\n');
notes+='\n\n图像来源见 assets/sources.json。原图与论文版权归原作者所有。本材料仅作论文阅读与方法比较，未包含新的实验结果。\n';
await writeFile(path.join(root,'speaker-notes.md'),notes,'utf8');
const dist=path.join(root,'dist');await mkdir(dist,{recursive:true});
for(const file of ['index.html','styles.css','app.js','content.js','speaker-notes.md','language.js'])await copyFile(path.join(root,file),path.join(dist,file));
await cp(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
await writeFile(path.join(dist,'.nojekyll'),'');
await import('./build-reading.mjs');
await import('./build-english.mjs');
console.log(`Prepared ${report.slides.length} slides, speaker notes, and dist/.`);
