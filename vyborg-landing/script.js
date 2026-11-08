"use strict";
(() => {
  const viewer = document.getElementById("image-viewer");
  const image = document.getElementById("viewer-image");
  const caption = document.getElementById("viewer-caption");
  const counter = document.getElementById("viewer-counter");
  const triggers = Array.from(document.querySelectorAll("button[data-full]"));
  let group = [], current = 0, opener = null;
  function render() {
    const item = group[current];
    image.src = item.dataset.full;
    image.alt = item.dataset.caption;
    caption.textContent = item.dataset.caption;
    counter.textContent = `${current + 1} / ${group.length}`;
  }
  function move(step) { current = (current + step + group.length) % group.length; render(); }
  triggers.forEach(button => button.addEventListener("click", () => {
    opener = button;
    group = triggers.filter(item => item.dataset.gallery === button.dataset.gallery);
    current = group.indexOf(button);
    render(); viewer.showModal();
  }));
  viewer.querySelector("[data-close]").addEventListener("click", () => viewer.close());
  viewer.querySelector("[data-prev]").addEventListener("click", () => move(-1));
  viewer.querySelector("[data-next]").addEventListener("click", () => move(1));
  viewer.addEventListener("click", event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  });
  viewer.addEventListener("close", () => opener?.focus());
})();

(() => {
 const toggle=document.querySelector('.menu-toggle'),menu=document.getElementById('landing-menu');
 function close(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');}
 toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.vy-nav'))close();});
 document.querySelectorAll('.max-contact').forEach(b=>b.addEventListener('click',()=>{const hint=b.closest('article').querySelector('.max-hint');hint.hidden=!hint.hidden;}));
})();

(() => {
 const rail=document.querySelector('.vy-island-grid'), cards=Array.from(rail.children), links=Array.from(document.querySelectorAll('.island-roadmap a'));
 const prev=document.querySelector('[data-island-prev]'),next=document.querySelector('[data-island-next]'),status=document.querySelector('[data-island-status]'),progress=document.querySelector('.island-progress');
 let current=0,frame=0;
 function sync(){
  const left=rail.getBoundingClientRect().left;
  current=cards.reduce((best,c,i)=>Math.abs(c.getBoundingClientRect().left-left)<Math.abs(cards[best].getBoundingClientRect().left-left)?i:best,0);
  if(rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-3)current=cards.length-1;
  status.textContent=`${current+1} / ${cards.length}`;progress.value=current+1;prev.disabled=current===0;next.disabled=current===cards.length-1;
  links.forEach((a,i)=>a.setAttribute('aria-current',String(i===current)));
  const a=links[current],road=a.parentElement;road.scrollTo({left:Math.max(0,a.offsetLeft-road.clientWidth/2+a.clientWidth/2),behavior:'smooth'});
 }
 function go(i){i=Math.max(0,Math.min(cards.length-1,i));rail.scrollTo({left:rail.scrollLeft+cards[i].getBoundingClientRect().left-rail.getBoundingClientRect().left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
 prev.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));
 links.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();go(i);}));
 rail.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(sync);},{passive:true});
 rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}});
 window.addEventListener('resize',sync);sync();
})();

document.querySelectorAll('.cta-max').forEach(button=>button.addEventListener('click',()=>{const hint=button.parentElement.querySelector('.cta-max-hint');hint.hidden=!hint.hidden;button.setAttribute('aria-expanded',String(!hint.hidden));}));

// Кораблик следует за выбранным островом.
(() => {
 const road=document.querySelector('.island-roadmap');
 if(!road)return;
 const ship=document.createElement('span');
 ship.className='roadmap-ship';ship.setAttribute('aria-hidden','true');
 ship.innerHTML='<span class="roadmap-boat">⛵</span><span class="roadmap-wake"></span>';
 road.appendChild(ship);
 function sail(){
  const active=road.querySelector('a[aria-current="true"]')||road.querySelector('a');
  if(!active)return;
  ship.style.transform=`translateX(${active.offsetLeft+17}px)`;
 }
 new MutationObserver(sail).observe(road,{subtree:true,attributes:true,attributeFilter:['aria-current']});
 window.addEventListener('resize',sail);
 sail();
})();

(() => {
 const cinema=document.getElementById('boat-cinema');if(!cinema)return;
 const thumbs=Array.from(cinema.querySelectorAll('[data-slide-index]')),image=cinema.querySelector('.cinema-image'),range=cinema.querySelector('.cinema-range'),full=cinema.querySelector('.cinema-full');let index=0;
 function show(i){index=(Number(i)+thumbs.length)%thumbs.length;const thumb=thumbs[index];image.src=thumb.querySelector('img').src;image.alt=thumb.querySelector('img').alt;cinema.querySelector('[data-cinema-caption]').textContent=thumb.dataset.caption;cinema.querySelector('[data-cinema-count]').textContent=`${index+1} / ${thumbs.length}`;range.value=index;thumbs.forEach((b,n)=>b.setAttribute('aria-current',String(n===index)));const rail=thumb.parentElement;rail.scrollTo({left:rail.scrollLeft+thumb.getBoundingClientRect().left-rail.getBoundingClientRect().left-rail.clientWidth/2+thumb.clientWidth/2,behavior:'smooth'});}
 thumbs.forEach((b,i)=>b.addEventListener('click',()=>show(i)));range.addEventListener('input',()=>show(range.value));cinema.querySelector('.cinema-prev').addEventListener('click',()=>show(index-1));cinema.querySelector('.cinema-next').addEventListener('click',()=>show(index+1));
 full.addEventListener('click',async()=>{if(document.fullscreenElement){await document.exitFullscreen();return;}if(cinema.classList.contains('cinema-expanded')){cinema.classList.remove('cinema-expanded');return;}try{await cinema.requestFullscreen();}catch{cinema.classList.add('cinema-expanded');}});
 cinema.addEventListener('keydown',e=>{if(e.target===range)return;if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}if(e.key==='Escape')cinema.classList.remove('cinema-expanded');});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')cinema.classList.remove('cinema-expanded');});show(0);
})();
