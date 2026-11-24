const viewer=document.querySelector('#island-viewer');
let opener;
document.querySelectorAll('.islands-upgrade [data-full]').forEach(button=>button.addEventListener('click',()=>{
 opener=button;viewer.querySelector('img').src=button.dataset.full;
 viewer.querySelector('img').alt=button.querySelector('img').alt;viewer.showModal();
}));
viewer.querySelector('.close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
viewer.addEventListener('close',()=>opener?.focus());

document.querySelectorAll('.island-flip').forEach(card=>{
 const toggle=card.closest('.stop').querySelector('.flip-toggle');
 toggle.addEventListener('click',()=>{
  const flipped=card.classList.toggle('is-flipped');
  toggle.setAttribute('aria-pressed',String(flipped));
  toggle.setAttribute('aria-label',flipped?'Показать фото острова':'Показать карту и координаты');
  card.querySelector('.flip-front').inert=flipped;
  card.querySelector('.flip-back').inert=!flipped;
  card.querySelector('.flip-front').setAttribute('aria-hidden',String(flipped));
  card.querySelector('.flip-back').setAttribute('aria-hidden',String(!flipped));
 });
});
(() => {
 const gallery=document.querySelector('#island-gallery'),rail=gallery.querySelector('.island-rail'),cards=[...rail.querySelectorAll('.stop')];
 const prev=gallery.querySelector('[data-gallery-prev]'),next=gallery.querySelector('[data-gallery-next]'),count=gallery.querySelector('[data-gallery-count]'),name=gallery.querySelector('[data-gallery-name]'),progress=gallery.querySelector('.gallery-progress');
 const links=[...document.querySelectorAll('.island-nav a')],reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const routeScroll=gallery.querySelector('.route-scroll'),routePath=gallery.querySelector('.route-waterline'),travelled=gallery.querySelector('.route-travelled'),ship=gallery.querySelector('.route-ship'),facing=ship.querySelector('.ship-facing'),stops=[...gallery.querySelectorAll('[data-route-stop]')];
 const routeLength=routePath.getTotalLength();let lastPosition=0,lastRouteStop=-1,routeFollowTimer;
 travelled.style.strokeDasharray=String(routeLength);
 stops.forEach((stop,i)=>{const p=routePath.getPointAtLength(routeLength*i/(cards.length-1));stop.setAttribute('transform',`translate(${p.x} ${p.y})`);});
 function updateRoute(){
  const distance=rail.scrollWidth-rail.clientWidth,position=distance?Math.max(0,Math.min(1,rail.scrollLeft/distance)):0;
  const at=routePath.getPointAtLength(routeLength*position),ahead=routePath.getPointAtLength(Math.min(routeLength,routeLength*position+2)),behind=routePath.getPointAtLength(Math.max(0,routeLength*position-2));
  const angle=Math.atan2(ahead.y-behind.y,ahead.x-behind.x)*180/Math.PI;
  ship.setAttribute('transform',`translate(${at.x} ${at.y}) rotate(${angle})`);
  if(Math.abs(position-lastPosition)>.00001)facing.setAttribute('transform',position<lastPosition?'scale(-1 1)':'scale(1 1)');
  lastPosition=position;travelled.style.strokeDashoffset=String(routeLength*(1-position));
  stops.forEach((stop,i)=>{stop.classList.toggle('is-visited',i<current);if(i===current)stop.setAttribute('aria-current','step');else stop.removeAttribute('aria-current');});
  clearTimeout(routeFollowTimer);routeFollowTimer=setTimeout(()=>{const width=gallery.querySelector('.island-route').getBoundingClientRect().width;const point=routePath.getPointAtLength(routeLength*current/(cards.length-1));routeScroll.scrollTo({left:Math.max(0,point.x/1200*width-routeScroll.clientWidth/2),behavior:'instant'});lastRouteStop=current;},140);
 }
 let current=0,frame=0;
 cards.forEach((card,i)=>{card.setAttribute('role','group');card.setAttribute('aria-roledescription','слайд');card.setAttribute('aria-label',`${i+1} из ${cards.length}: ${card.querySelector('h2').textContent}`);});
 function sync(){
  const left=rail.getBoundingClientRect().left;
  current=cards.reduce((best,c,i)=>Math.abs(c.getBoundingClientRect().left-left)<Math.abs(cards[best].getBoundingClientRect().left-left)?i:best,0);
  count.textContent=`${current+1} / ${cards.length}`;name.textContent=cards[current].querySelector('h2').textContent;progress.value=current+1;
  updateRoute();
  prev.disabled=current===0;next.disabled=current===cards.length-1;
  links.forEach((a,i)=>{if(i===current)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
 }
 function go(i){i=Math.max(0,Math.min(cards.length-1,i));rail.scrollTo({left:rail.scrollLeft+cards[i].getBoundingClientRect().left-rail.getBoundingClientRect().left,behavior:reduced?'instant':'smooth'});}
 stops.forEach((stop,i)=>stop.addEventListener('click',e=>{e.preventDefault();go(i);}));
 prev.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));
 links.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();go(i);gallery.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});}));
 rail.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(sync);},{passive:true});
 rail.addEventListener('keydown',e=>{if(e.target!==rail)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}else if(e.key==='Home'||e.key==='End'){e.preventDefault();go(e.key==='Home'?0:cards.length-1);}});
 let resizeTimer,railWidth=rail.clientWidth;new ResizeObserver(()=>{if(rail.clientWidth===railWidth)return;railWidth=rail.clientWidth;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{rail.scrollTo({left:cards[current].offsetLeft-cards[0].offsetLeft,behavior:'instant'});lastRouteStop=-1;sync();},80);}).observe(rail);
 function fromHash(){const i=cards.findIndex(c=>'#'+c.id===location.hash);if(i>=0){go(i);gallery.scrollIntoView({behavior:'instant',block:'start'});}}
 window.addEventListener('hashchange',fromHash);sync();if(location.hash.startsWith('#stop-'))fromHash();
})();
