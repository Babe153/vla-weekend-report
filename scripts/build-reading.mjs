import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {marked} from './vendor/marked.mjs';

const root=path.resolve(import.meta.dirname,'..');
const md=await readFile(path.join(root,'reading/notes.md'),'utf8');
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
const paperStart=md.indexOf('## 四、');
const paperEnd=md.indexOf('## 五、');
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
  const problem=body.match(/^- \*\*问题：\*\* (.+)$/m)?.[1]||'';
  const category=info.role==='通用策略'?'policy':info.role.includes('评测')?'benchmark':info.role.includes('数据')?'data':'method';
  papers.push(`<article class="paper" id="paper-${id}" data-category="${category}">
  <div class="paper-top"><span class="paper-number">${id}</span><span class="paper-role">${escape(info.role)}</span><label class="read-toggle"><input type="checkbox" data-read="${id}"><span>已读</span></label></div>
  <details${id==='01'?' open':''}><summary><h3>${escape(info.title)}</h3><span class="preview">${escape(problem)}</span><span class="expand-label" aria-hidden="true"></span></summary><div class="paper-content">${render(body)}</div></details></article>`);
}
assert.equal(papers.length,14);
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
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f4f2ed"><meta name="description" content="14篇VLA论文中文速读：问题、输入输出、核心改动、证据与边界。含论文关系、动作生成对比及原文图表页码，适合手机阅读。"><title>14篇 VLA 论文速读 · 中文阅读手册</title><link rel="icon" href="data:,"><link rel="stylesheet" href="reading.css"><script src="reading.js" defer></script></head>
<body><a class="skip-link" href="#main">跳至正文</a>
<header class="site-header"><a class="wordmark" href="#top">VLA<span>论文阅读手册</span></a><nav aria-label="阅读导航"><a href="#map">关系</a><a href="#comparison">对比</a><a href="#notes">速读</a><a href="#pitfalls">易混点</a><a href="../">原汇报</a></nav></header>
<main id="main"><section class="hero" id="top"><p class="eyebrow">ROBOT LEARNING / READING NOTES</p><h1>14篇论文，<br>读出一条主线。</h1><p class="hero-lead">用五个问题理解 VLA：解决什么、输入输出、改了哪里、证据是什么、边界在哪。</p><div class="hero-links"><a class="primary-link" href="#notes">开始五行速读 <span aria-hidden="true">↗</span></a><a href="#comparison">先看中文对比表</a></div><div class="hero-meta"><span>14 篇原文</span><span>70 条速读笔记</span><span>更新于 2026.10.21</span></div></section>
<aside class="reading-note"><strong>先定位，再精读。</strong> 数据、策略、动作建模与评测分开比较。不同任务和评分协议下的成功率，不放在同一个排行榜里。图表页码对应所列固定版本的 PDF。</aside>
${sections}
<section class="chapter" id="notes"><div class="chapter-heading"><div><p class="eyebrow">READ / COMPARE / VERIFY</p><h2>四、每篇只记这五行</h2></div><p id="progress" aria-live="polite">已读 0 / 14</p></div>
<div class="reading-controls"><label class="search-label" for="paper-search">搜索论文或概念<input id="paper-search" type="search" placeholder="例如：OpenVLA、动作块、flow" autocomplete="off"></label><label for="paper-category">论文角色<select id="paper-category"><option value="all">全部论文</option><option value="policy">通用策略 · 6篇</option><option value="method">动作建模与适配 · 5篇</option><option value="data">数据与跨机器人 · 1篇</option><option value="benchmark">评测基准 · 2篇</option></select></label></div>
<div class="list-tools"><span id="results" aria-live="polite">显示 14 / 14 篇</span><button id="toggle-all" type="button">展开全部笔记</button></div>
<div class="paper-list">${papers.join('\n')}</div><p class="empty-state" id="empty-state" hidden>没有匹配的论文，请换个关键词或论文角色。</p><p class="storage-note" id="storage-note">“已读”只保存在当前浏览器，不会上传。</p></section>
${finalSections}
<footer><p>原论文与相关成果归各作者所有。本页为中文阅读笔记，未声称完成复现或确认新的研究贡献。</p><div class="footer-links"><a href="notes.md" download="VLA14篇_中文速读笔记.md">下载 Markdown 原文</a><a href="https://github.com/Babe153/vla-weekend-report/tree/main/reading">GitHub 源码</a><a href="../">八篇论文汇报与讲稿</a><button id="print-notes" type="button">打印笔记</button></div></footer></main></body></html>`;
await writeFile(path.join(root,'reading/index.html'),html,'utf8');
const dist=path.join(root,'dist/reading');await mkdir(dist,{recursive:true});
for(const file of ['index.html','reading.css','reading.js','notes.md'])await copyFile(path.join(root,'reading',file),path.join(dist,file));
console.log('Built reading site from Markdown: 14 papers, 70 reading lines, responsive comparison tables.');
