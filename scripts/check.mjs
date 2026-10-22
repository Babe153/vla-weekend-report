import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const context={window:{}};
const source=await readFile(path.join(root,'content.js'),'utf8');
vm.runInNewContext(source,context);
const {papers,slides}=context.window.REPORT;
assert.equal(papers.length,22,'Complete 22-paper catalog required');
assert.equal(slides.length,31,'Expected 25 main slides and 6 reference slides');
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
const reading=await readFile(path.join(root,'reading/index.html'),'utf8');
const markdown=await readFile(path.join(root,'reading/notes.md'),'utf8');
assert.equal((reading.match(/class="paper" id="paper-/g)||[]).length,22,'Twenty-two reading entries required');
for(const field of ['问题','输入 → 输出','核心改动','证据','边界'])assert.equal(markdown.split(`- **${field}：**`).length-1,22,`Missing reading field ${field}`);
assert(!/[A-Z]:[\\/]/.test(markdown),'Local filesystem paths cannot be published');
assert(reading.includes('data-label="动作表示与生成／输出"'),'Mobile table labels required');
const anchors=new Set([...reading.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
for(const link of reading.matchAll(/href="#([^"]+)"/g))assert(anchors.has(link[1]),`Broken reading anchor ${link[1]}`);
new vm.Script(await readFile(path.join(root,'reading/reading.js'),'utf8'));
for(const file of ['reading.css','reading.js','notes.md'])await access(path.join(root,'dist/reading',file));
console.log('Checked 22 reading entries, 110 fields, anchors, public sources and responsive table labels.');
