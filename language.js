/* Native links remain usable without JavaScript; enhance them with reading position. */
(()=>{
  const links=[...document.querySelectorAll('[data-language-switch]')];
  const update=()=>{
    for(const link of links){
      const target=new URL(link.getAttribute('data-language-switch'),location.href);
      target.search=location.search;
      target.hash=location.hash;
      link.href=target.href;
    }
  };
  window.updateLanguageLinks=update;
  window.addEventListener('hashchange',update);
  for(const link of links)link.addEventListener('click',update);
  update();
})();
