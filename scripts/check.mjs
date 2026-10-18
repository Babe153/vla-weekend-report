import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const context={window:{}};
const source=await readFile(path.join(root,'content.js'),'utf8');
vm.runInNewContext(source,context);
const {papers,slides}=context.window.REPORT;
assert.equal(papers.length,8,'Eight papers required');
assert.equal(slides.length,21,'Expected complete 21-slide deck');
const ids=new Set(papers.map(p=>p.id));
for(const [i,s] of slides.entries()){
  assert(s.title&&s.notes.length>70,`Slide ${i+1} needs a title and full speaker notes`);
  assert(s.refs.length>0,`Slide ${i+1} needs citations`);
  for(const id of s.refs)assert(ids.has(id),`Unknown source ${id}`);
  for(const match of (s.body||'').matchAll(/(?:src|data-image)="([^"#]+)"/g)){
    if(!match[1].startsWith('http'))await access(path.join(root,match[1]));
  }
}
for(const id of ['rt2','openvla','pi0'])assert(slides.filter(s=>s.section===papers.find(p=>p.id===id).short).length>=2,`Core coverage for ${id}`);
new vm.Script(await readFile(path.join(root,'app.js'),'utf8'));
const html=await readFile(path.join(root,'index.html'),'utf8');
assert(html.includes('name="viewport"'),'Mobile viewport required');
assert(html.includes('lang="zh-CN"'),'Chinese language declaration required');
await access(path.join(root,'speaker-notes.md'));
console.log(`Checked ${slides.length} slides, ${papers.length} sources, notes and assets.`);
