(() => {
  'use strict';
  const report = window.REPORT;
  const en=report.lang==='en';
  const text=en?{released:'first released',paper:'Paper',project:'Project',sources:'Sources',notes:'Speaker notes',suggested:'Suggested',asNeeded:'As needed',unit:'min',reference:'References',continuous:'Continuous',present:'Present',read:'Read',exitFull:'Exit fullscreen',full:'Fullscreen'}:{released:'首发',paper:'论文原文',project:'官方项目',sources:'来源',notes:'本页讲稿',suggested:'建议',asNeeded:'按需',unit:'分钟',reference:'参考',continuous:'连续阅读',present:'演示模式',read:'阅读模式',exitFull:'退出全屏',full:'全屏'};
  const timing=s=>['按需','As needed'].includes(s.time)?text.asNeeded:`${s.time} ${text.unit}`;
  const $ = (s) => document.querySelector(s);
  const papers = new Map(report.papers.map(p => [p.id,p]));
  const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const refs = ids => ids.map(id => {const p=papers.get(id);return `<a href="${p.url}" target="_blank" rel="noopener noreferrer">[${report.papers.indexOf(p)+1}] ${escape(p.short)}</a>`;}).join('');
  const refList = ids => `<ol class="references-list">${ids.map(id => {const p=papers.get(id);return `<li><span class="reference-title">[${report.papers.indexOf(p)+1}] ${escape(p.title)}</span><span class="reference-meta">${escape(p.author)} · ${p.year} ${text.released}</span><span class="reference-links"><a href="${p.url}" target="_blank" rel="noopener noreferrer">${text.paper}</a>${p.project!==p.url?`<a href="${p.project}" target="_blank" rel="noopener noreferrer">${text.project}</a>`:``}</span></li>`;}).join('')}</ol>`;
  $('#deck').innerHTML = report.slides.map((s,i)=>`<section class="slide ${s.type||''}" id="slide-${i+1}" data-index="${i}" data-color="${s.color||'blue'}" aria-labelledby="title-${i+1}"><div class="slide-header"><span class="slide-num">${String(i+1).padStart(2,'0')} / ${report.slides.length}</span><span class="section-name">${escape(s.section)}</span></div><h2 id="title-${i+1}">${escape(s.title)}</h2><div class="slide-body">${s.paperIds?refList(s.paperIds):''}${s.body||''}</div><div class="source-line"><span>${text.sources}${s.source?' · '+escape(s.source):''}</span>${refs(s.refs)}</div><details class="speaker-notes"><summary>${text.notes}<span class="note-time">${text.suggested} ${timing(s)}</span></summary><p>${escape(s.notes)}</p><p class="small">${text.reference}: ${refs(s.refs)}</p></details></section>`).join('');
  document.querySelectorAll('table').forEach(table=>{const headers=[...table.querySelectorAll('thead th')].map(e=>e.textContent);table.querySelectorAll('tbody tr').forEach(row=>[...row.children].forEach((cell,i)=>{if(cell.tagName==='TD')cell.dataset.label=headers[i]||'';}));});
  const slides=[...document.querySelectorAll('.slide')];
  const mobile=matchMedia('(max-width:680px)');
  let reading=mobile.matches, current=0, notesPage=new URLSearchParams(location.search).get('notes')==='1';
  let userSelectedMode=false;
  const outlines=report.slides.map((s,i)=>`${i===0||report.slides[i-1].section!==s.section?`<h3 class="outline-section">${escape(s.section)}</h3>`:''}<button data-goto="${i}"><span>${String(i+1).padStart(2,'0')}</span>${escape(s.title)}</button>`).join('');
  $('#outlineList').innerHTML=outlines;
  $('.progress').setAttribute('aria-valuemax',slides.length);
  const notes=(show)=>{
    document.body.classList.toggle('show-notes',show);
    $('#notesBtn').setAttribute('aria-pressed',show);
    document.querySelectorAll('.speaker-notes').forEach(n=>n.open=show);
  };
  const status=()=>{
    $('#pageLabel').textContent=`${String(current+1).padStart(2,'0')} / ${slides.length}`;
    $('#sectionLabel').textContent=report.slides[current].section;
    $('#progressBar').style.width=`${(current+1)/slides.length*100}%`;
    $('.progress').setAttribute('aria-valuenow',current+1);
    $('#prevBtn').disabled=current===0;
    $('#nextBtn').disabled=current===slides.length-1;
    document.querySelectorAll('[data-goto]').forEach((b,i)=>b.classList.toggle('current',i===current));
  };
  const saveHash=()=>{history.replaceState(null,'',`#slide-${current+1}`);window.updateLanguageLinks?.();};
  function go(index,scroll=true,instant=false){
    current=Math.max(0,Math.min(slides.length-1,index));
    slides.forEach((s,i)=>s.classList.toggle('active',i===current));
    status();saveHash();
    if(scroll){if(reading||mobile.matches)slides[current].scrollIntoView({behavior:instant||matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});else window.scrollTo({top:0,behavior:'instant'});}
  }
  function setMode(value){
    reading=value||mobile.matches||notesPage;
    document.body.classList.toggle('reading',reading);
    $('#modeBtn').setAttribute('aria-pressed',reading);
    $('#modeBtn').textContent=mobile.matches?text.continuous:(reading?text.present:text.read);
    $('#modeBtn').disabled=mobile.matches||notesPage;
    go(current,false);
  }
  let scrollQueued=false;
  window.addEventListener('scroll',()=>{
    if(!reading||scrollQueued)return;
    scrollQueued=true;
    requestAnimationFrame(()=>{
      scrollQueued=false;
      const marker=mobile.matches?100:130;
      let next=0;
      slides.forEach((s,i)=>{if(s.getBoundingClientRect().top<=marker)next=i;});
      if(next!==current){current=next;status();saveHash();}
    });
  },{passive:true});
  $('#prevBtn').onclick=()=>go(current-1);
  $('#nextBtn').onclick=()=>go(current+1);
  $('#modeBtn').onclick=()=>{userSelectedMode=true;setMode(!reading);go(current);};
  $('#notesBtn').onclick=()=>notes(!document.body.classList.contains('show-notes'));
  $('#outlineBtn').onclick=()=>$('#outline').showModal();
  document.querySelectorAll('.close-dialog').forEach(b=>b.onclick=()=>b.closest('dialog').close());
  document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
  document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{$('#outline').close();go(Number(b.dataset.goto));});
  document.querySelectorAll('[data-image]').forEach(b=>b.onclick=()=>{const img=$('#largeImage');img.src=b.dataset.image;img.alt=b.querySelector('img').alt;$('#imageDialog').showModal();});
  $('#fullBtn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();}catch{ /* Browser policy may prohibit fullscreen. Presentation remains usable. */ }};
  document.addEventListener('fullscreenchange',()=>$('#fullBtn').textContent=document.fullscreenElement?text.exitFull:text.full);
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey||e.metaKey||e.altKey||document.querySelector('dialog[open]')||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable)return;
    if(['ArrowRight','PageDown'].includes(e.key)||(!reading&&e.key===' '&&!/BUTTON|SUMMARY|A/.test(e.target.tagName))){e.preventDefault();go(current+1);}
    if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(current-1);}
    if(e.key==='Home'){e.preventDefault();go(0);}if(e.key==='End'){e.preventDefault();go(slides.length-1);}
    if(e.key.toLowerCase()==='n')$('#notesBtn').click();
    if(e.key.toLowerCase()==='r'&&!mobile.matches)$('#modeBtn').click();
    if(e.key.toLowerCase()==='f')$('#fullBtn').click();
    if(e.key.toLowerCase()==='o')$('#outlineBtn').click();
  });
  const hashIndex=()=>{const m=location.hash.match(/^#slide-(\d+)$/);return m?Math.max(0,Math.min(slides.length-1,Number(m[1])-1)):0;};
  current=hashIndex();
  if(notesPage){document.body.classList.add('notes-page');notes(true);}
  setMode(reading);
  window.addEventListener('hashchange',()=>go(hashIndex()));
  mobile.addEventListener('change',()=>{setMode(userSelectedMode?reading:mobile.matches);go(current,false);});
  if(location.hash){const initialIndex=current;requestAnimationFrame(()=>go(initialIndex,true,true));}
  window.addEventListener('beforeprint',()=>document.querySelectorAll('.speaker-notes').forEach(n=>{if(notesPage)n.open=true;}));
})();
