import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {marked} from './vendor/marked.mjs';

const root=path.resolve(import.meta.dirname,'../en');
const md=await readFile(path.join(root,'reading/notes.md'),'utf8');
const catalog=JSON.parse(await readFile(path.join(root,'reading/catalog.json'),'utf8'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
assert(!/[A-Z]:[\\/]/.test(md),'Published source must not expose local paths');
const render=source=>marked.parse(source,{gfm:true}).replace(/<table>([\s\S]*?)<\/table>/g,(_,table)=>{
  const head=table.match(/<thead>([\s\S]*?)<\/thead>/)?.[1]||'';
  const labels=[...head.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m=>m[1].replace(/<[^>]*>/g,''));
  let index=0;
  const result=table.replace(/<tbody>([\s\S]*?)<\/tbody>/,(_,body)=>'<tbody>'+body.replace(/<tr>([\s\S]*?)<\/tr>/g,(_,row)=>{
    index=0;
    return '<tr>'+row.replace(/<td([^>]*)>/g,(_,attrs)=>`<td${attrs} data-label="${escape(labels[index++]||'')}">`)+'</tr>';
  })+'</tbody>');
  return '<div class="table-wrap"><table>'+result+'</table></div>';
});
const paperStart=md.indexOf('## 4.');
const paperEnd=md.indexOf('## 5.');
assert(paperStart>0&&paperEnd>paperStart);
const intro=md.slice(0,paperStart);
const end=md.slice(paperEnd);
const meta=new Map([...md.matchAll(/^\| \[(\d{2}) ([^\]]+)\]\(#paper-\d{2}\) \| ([^|]+) \|/gm)].map(m=>[m[1],{title:m[2],role:m[3].trim()}]));
const parts=md.slice(paperStart,paperEnd).split(/<a id="paper-(\d{2})"><\/a>/);
const papers=[];
for(let i=1;i<parts.length;i+=2){
  const id=parts[i],body=parts[i+1].trim().replace(/^### [^\n]+\n+/,''),info=meta.get(id);
  assert(info,`Missing comparison row ${id}`);
  assert.equal((body.match(/^- \*\*/gm)||[]).length,5,`Expected five lines for ${id}`);
  const problem=body.match(/^- \*\*Problem:\*\* (.+)$/m)?.[1]||'';
  const category=info.role==='Generalist policy'?'policy':info.role==='Phases and training resources'?'phase':info.role==='Robustness and diagnostics'?'robust':info.role.toLowerCase().includes('benchmark')?'benchmark':info.role.startsWith('Data')?'data':'method';
  papers.push({category,html:`<article class="paper" id="paper-${id}" data-category="${category}">
  <div class="paper-top"><span class="paper-number">${id}</span><span class="paper-role">${escape(info.role)}</span><label class="read-toggle"><input type="checkbox" data-read="${id}"><span>Read</span></label></div>
  <details${id==='01'?' open':''}><summary><h3>${escape(info.title)}</h3><span class="preview">${escape(problem)}</span><span class="expand-label" aria-hidden="true"></span></summary><div class="paper-content">${render(body)}</div></details></article>`});
}
const count=papers.length;
assert.equal(count,catalog.groups.reduce((n,g)=>n+g.count,0));
const grouped=catalog.groups.map((g,i)=>{const entries=papers.filter(p=>p.category===g.id);assert.equal(entries.length,g.count);return `<section class="paper-group" data-group="${g.id}" id="group-${g.id}" aria-labelledby="group-title-${g.id}"><h3 class="group-title" id="group-title-${g.id}"><span>${String.fromCharCode(65+i)}</span>${escape(g.label)} <small>${g.count} papers${i>=4?' · Added / abstract-level':''}</small></h3><div class="paper-list">${entries.map(p=>p.html).join('\n')}</div></section>`;}).join('\n');
const options=catalog.groups.map(g=>`<option value="${g.id}">${escape(g.label)} · ${g.count} papers</option>`).join('');
const jumps=catalog.groups.map((g,i)=>`<a href="#group-${g.id}">${String.fromCharCode(65+i)} ${escape(g.label)}</a>`).join('');
const sectionIds=['map','comparison','relationships'];
const sections=intro.split(/^## /m).slice(1).map((part,i)=>{
  const [heading,...lines]=part.split('\n');
  return `<section class="chapter" id="${sectionIds[i]}"><h2>${escape(heading)}</h2>${render(lines.join('\n'))}</section>`;
}).join('\n');
const endIds=['pitfalls','research','checklist'];
const finalSections=end.split(/^## /m).slice(1).map((part,i)=>{
  const [heading,...lines]=part.split('\n');
  return `<section class="chapter" id="${endIds[i]}"><h2>${escape(heading)}</h2>${render(lines.join('\n'))}</section>`;
}).join('\n');
const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f4f2ed"><meta name="description" content="22 VLA papers in English: problems, inputs and outputs, methods, evidence and limitations. A mobile-friendly reading guide and research assessment."><title>22 VLA Papers · English Reading Handbook</title><link rel="icon" href="data:,"><link rel="stylesheet" href="../../reading/reading.css"><script src="../../reading/reading.js" defer></script><script src="../../language.js" defer></script></head>
<body><a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><a class="wordmark" href="#top">VLA<span>Reading handbook</span></a><nav aria-label="Reading navigation"><a href="#map">Map</a><a href="#comparison">Compare</a><a href="#notes">Notes</a><a href="#pitfalls">Pitfalls</a><a href="../">Report</a><a class="reading-language" href="../../reading/" data-language-switch="../../reading/" lang="zh-CN" hreflang="zh-CN">中文</a></nav></header>
<main id="main"><section class="hero" id="top"><p class="eyebrow">ROBOT LEARNING / READING NOTES</p><h1>22 papers.<br>From models to research.</h1><p class="hero-lead">Five questions for each paper: the problem, inputs and outputs, core change, evidence, and limits.</p><div class="hero-links"><a class="primary-link" href="#notes">Read the five-line notes <span aria-hidden="true">↗</span></a><a href="#comparison">Compare the papers</a></div><div class="hero-meta"><span>22 original papers</span><span>110 reading notes</span><span>Updated 22 Oct 2026</span></div></section>
<aside class="reading-note"><strong>Locate, then read closely.</strong> Six themes separate models, tools, benchmarks and closest related work. The original 14 retain figure/page references; the 8 additions are abstract-level checks. Success rates across different tasks and scoring protocols are not ranked together. Page references use the fixed PDF versions listed below.</aside>
${sections}
<section class="chapter" id="notes"><div class="chapter-heading"><div><p class="eyebrow">READ / COMPARE / VERIFY</p><h2>4. Five lines per paper</h2></div><p id="progress" aria-live="polite">Read 0 / 22</p></div>
<div class="reading-controls"><label class="search-label" for="paper-search">Search papers or concepts<input id="paper-search" type="search" placeholder="e.g. OpenVLA, action chunks, flow" autocomplete="off"></label><label for="paper-category">Paper role<select id="paper-category"><option value="all">All papers</option>${options}</select></label></div>
<div class="list-tools"><span id="results" aria-live="polite">Showing ${count} / ${count} papers</span><button id="toggle-all" type="button">Expand all notes</button></div>
<nav class="group-jumps" aria-label="Jump by theme">${jumps}</nav>${grouped}<p class="empty-state" id="empty-state" hidden>No matching papers. Try another keyword or role.</p><p class="storage-note" id="storage-note">Reading progress stays in this browser and is shared between language editions.</p></section>
${finalSections}
<footer><p>Original papers and results belong to their authors. This English reading guide does not claim reproduction results or confirmed new contributions.</p><div class="footer-links"><a href="notes.md" download="VLA22_English_Reading_Notes.md">Download Markdown</a><a href="https://github.com/Babe153/vla-weekend-report/tree/main/en/reading">GitHub source</a><a href="../">Report and speaker notes</a><button id="print-notes" type="button">Print notes</button></div></footer></main></body></html>`;
await writeFile(path.join(root,'reading/index.html'),html,'utf8');
const dist=path.join(root,'../dist/en/reading');await mkdir(dist,{recursive:true});
for(const file of ['index.html','notes.md'])await copyFile(path.join(root,'reading',file),path.join(dist,file));
console.log('Built English reading site: 22 papers, 110 reading lines, responsive comparison tables.');
