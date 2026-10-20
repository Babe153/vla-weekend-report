(()=>{
  'use strict';
  const cards=[...document.querySelectorAll('.paper')];
  const search=document.getElementById('paper-search');
  const category=document.getElementById('paper-category');
  const toggle=document.getElementById('toggle-all');
  const key='vla-reading-14-v1';
  const normalize=s=>s.normalize('NFKC').toLowerCase().replaceAll('π','pi').trim();
  const texts=new Map(cards.map(c=>[c,normalize(c.textContent)]));
  let saved=new Set();
  try{const raw=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(raw))saved=new Set(raw.filter(x=>/^\d{2}$/.test(x)));}catch{}
  const progress=()=>{document.getElementById('progress').textContent=`已读 ${cards.filter(c=>c.querySelector('input').checked).length} / 14`;};
  for(const c of cards){
    const input=c.querySelector('input');input.checked=saved.has(input.dataset.read);
    input.addEventListener('change',()=>{saved=new Set(cards.filter(c=>c.querySelector('input').checked).map(c=>c.querySelector('input').dataset.read));try{localStorage.setItem(key,JSON.stringify([...saved]));}catch{document.getElementById('storage-note').textContent='当前浏览器无法保存进度；已读标记仅在本次页面中保留。';}progress();});
  }
  progress();
  const visible=()=>cards.filter(c=>!c.hidden);
  const updateToggle=()=>{const shown=visible();toggle.disabled=!shown.length;toggle.textContent=shown.length&&shown.every(c=>c.querySelector('details').open)?'收起全部笔记':'展开全部笔记';};
  const filter=()=>{
    const q=normalize(search.value);
    for(const c of cards){c.hidden=!((category.value==='all'||c.dataset.category===category.value)&&(!q||texts.get(c).includes(q)));}
    const n=visible().length;document.getElementById('results').textContent=`显示 ${n} / 14 篇`;document.getElementById('empty-state').hidden=n>0;updateToggle();
  };
  search.addEventListener('input',filter);category.addEventListener('change',filter);
  toggle.addEventListener('click',()=>{const shown=visible();const open=!shown.every(c=>c.querySelector('details').open);for(const c of shown)c.querySelector('details').open=open;updateToggle();});
  for(const c of cards)c.querySelector('details').addEventListener('toggle',updateToggle);
  const revealHash=()=>{
    const id=location.hash.slice(1);if(!/^paper-\d{2}$/.test(id))return;
    const target=document.getElementById(id);if(!target)return;
    if(target.hidden){search.value='';category.value='all';filter();}
    target.querySelector('details').open=true;
    requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
  };
  window.addEventListener('hashchange',revealHash);revealHash();updateToggle();
  let beforePrint=[];
  window.addEventListener('beforeprint',()=>{beforePrint=cards.map(c=>({card:c,hidden:c.hidden,open:c.querySelector('details').open}));for(const c of cards){c.hidden=false;c.querySelector('details').open=true;}});
  window.addEventListener('afterprint',()=>{for(const s of beforePrint){s.card.hidden=s.hidden;s.card.querySelector('details').open=s.open;}updateToggle();});
  document.getElementById('print-notes').addEventListener('click',()=>window.print());
})();
