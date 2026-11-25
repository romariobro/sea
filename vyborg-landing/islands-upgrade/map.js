import {buildWaterRoute} from './water-route.js';
import {createBoatLayer} from './boat.js?v=local-vendor-20261125';
const loading=document.querySelector('#map-loading'),play=document.querySelector('#sail-toggle'),orbitButton=document.querySelector('#orbit-toggle'),reset=document.querySelector('#map-reset'),status=document.querySelector('#voyage-place'),progress=document.querySelector('#voyage-progress');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let map,boat,route=[],lengths=[],total=0,travel=0,running=false,orbit=false,last=0,frame=0,selected=-1,ready=false,routeFailed=false,boatHeading=0,visible=false,autoEligible=false,autoStarted=false,manualControl=false;
const pins=[],order=[6,5,4,0,2,3,1,7],duration=95;
function message(text){status.textContent=text;}
function setPlaying(value){running=value;play.textContent=value?'Пауза':'Начать путешествие';play.setAttribute('aria-pressed',String(value));}
function tryAutoStart(){if(!autoStarted&&!manualControl&&!reduced&&autoEligible&&!play.disabled&&boat&&route.length){autoStarted=true;map.stop();setPlaying(true);}}
async function loadJSON(url,timeout=15000){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeout);try{const r=await fetch(url,{signal:controller.signal});if(!r.ok)throw Error(`HTTP ${r.status}`);return await r.json();}finally{clearTimeout(timer);}}
function error(text){
 setPlaying(false);play.disabled=true;orbitButton.disabled=true;reset.disabled=true;
 loading.hidden=true;document.querySelector('.map-backup')?.remove();
 const fallback=document.createElement('div');fallback.className='map-backup';
 fallback.innerHTML='<p class="backup-message"></p><label class="backup-select">Карты островов <select aria-label="Выбрать остров"></select></label><a class="backup-chart" target="_blank" rel="noopener"><img alt=""></a><div class="backup-actions"><span>Оригинальные материалы маршрута</span><button type="button">Повторить загрузку 3D</button></div>';
 fallback.querySelector('.backup-message').textContent=text;
 const catalogue=[['Малый Высоцкий',147],['Новик',149],['Густой',151],['Черновой',153],['Овчинный',154],['Мыс Хвойный',156],['Соседский',158],['Вихревой',null]],select=fallback.querySelector('select');
 catalogue.forEach(([name],i)=>{const option=document.createElement('option');option.value=i;option.textContent=name;select.append(option);});
 const show=()=>{const [name,id]=catalogue[Number(select.value)],url=id?new URL(`../assets/maps/${id}.jpg`,import.meta.url).href:new URL('./photo-12.webp',import.meta.url).href;fallback.querySelector('img').src=url;fallback.querySelector('img').alt=id?`Карта: ${name}`:`Фотография: ${name}`;fallback.querySelector('a').href=url;};
 select.addEventListener('change',show);fallback.querySelector('button').addEventListener('click',()=>location.reload());show();
 document.querySelector('.map-stage').append(fallback);message('Доступен просмотр карт островов');
}

function focusIsland(id){manualControl=true;const p=places.find(p=>p.id===id);if(!p||!map)return;setPlaying(false);selected=id;pins.forEach(({id:pid,el})=>el.classList.toggle('active',pid===id));map.flyTo({center:p.coordinates,zoom:13,pitch:56,bearing:map.getBearing(),duration:reduced?0:1700});message(p.name);}
let places=[];
try{
 if(new URLSearchParams(location.search).get('map')==='2d')throw Error('2D requested');
 if(!window.maplibregl)throw Error('Map library unavailable');
 const [style,data]=await Promise.all([loadJSON(new URL('./vendor/map-style.json',import.meta.url)),loadJSON(new URL('./places.json',import.meta.url))]);places=data;
 const assetRoot=new URL('./vendor/',import.meta.url).href;
 style.sources.openmaptiles={type:'vector',tiles:[assetRoot+'tiles/{z}/{x}/{y}.pbf'],minzoom:9,maxzoom:12,bounds:[28.25,60.48,28.90,60.85],attribution:'<a href="https://openfreemap.org/">OpenFreeMap</a> · <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>'};
 delete style.sources.ne2_shaded;style.layers=style.layers.filter(layer=>layer.source!=='ne2_shaded');
 style.glyphs=assetRoot+'fonts/{fontstack}/{range}.pbf';style.sprite=assetRoot+'sprites/ofm';
 for(const l of style.layers){
  if(l.type==='background')l.paint={'background-color':'#26463e'};
  if(l.type==='fill'){
   if(l['source-layer']==='water')l.paint={...l.paint,'fill-color':'#173f53','fill-opacity':1};
   else if(['landcover','landuse','park'].includes(l['source-layer']))l.paint={...l.paint,'fill-color':l['source-layer']==='landcover'?'#396050':'#29483f','fill-opacity':.8};
  }
  if(l.type==='symbol'){
   l.layout={...l.layout,'text-field':['coalesce',['get','name:ru'],['get','name']]};
   if(l.paint?.['text-color'])l.paint={...l.paint,'text-color':'#b8ceca','text-halo-color':'#102b33','text-halo-width':1};
   if(['poi','transportation_name','housenumber','mountain_peak'].includes(l['source-layer']))l.layout.visibility='none';
  }
 }
 map=new maplibregl.Map({container:'bay-map',style,center:[28.55,60.64],zoom:10.9,pitch:0,bearing:0,maxPitch:70,minZoom:9,maxZoom:17,maxBounds:[[28.35,60.535],[28.74,60.72]],attributionControl:true,canvasContextAttributes:{antialias:true},cooperativeGestures:true,locale:{'Map.Title':'Карта залива','Marker.Title':'Остров','NavigationControl.ZoomIn':'Приблизить','NavigationControl.ZoomOut':'Отдалить','NavigationControl.ResetBearing':'Север сверху','FullscreenControl.Enter':'На весь экран','FullscreenControl.Exit':'Свернуть карту','AttributionControl.ToggleAttribution':'Источники карты','CooperativeGesturesHandler.WindowsHelpText':'Для приближения удерживайте Ctrl и прокручивайте','CooperativeGesturesHandler.MacHelpText':'Для приближения удерживайте ⌘ и прокручивайте','CooperativeGesturesHandler.MobileHelpText':'Перемещайте карту двумя пальцами'}});
 map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'top-right');
 map.addControl(new maplibregl.FullscreenControl(),'top-right');
 map.fitBounds([[28.385,60.545],[28.725,60.72]],{padding:{top:75,bottom:125,left:45,right:45},duration:0});
 new ResizeObserver(()=>map.resize()).observe(document.querySelector('#bay-map'));
 new IntersectionObserver(entries=>{const entry=entries[0];visible=entry.isIntersecting;autoEligible=entry.isIntersecting&&entry.intersectionRatio>=.35;tryAutoStart();},{threshold:[0,.05,.35]}).observe(document.querySelector('#bay-map'));
 for(const p of places){const el=document.createElement('button');el.className='island-pin';el.textContent=p.name;el.setAttribute('aria-label','Показать: '+p.name);el.addEventListener('click',()=>focusIsland(p.id));new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(p.coordinates).addTo(map);el.setAttribute('aria-label','Показать: '+p.name);el.title=p.name;pins.push({id:p.id,el});}
 document.querySelectorAll('.island-nav a').forEach((a,i)=>a.addEventListener('click',()=>focusIsland(i)));
 document.querySelectorAll('.fly-to-island').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#map').scrollIntoView({behavior:reduced?'auto':'smooth'});focusIsland(Number(b.dataset.island));}));
 const loadTimer=setTimeout(()=>{if(!ready)error('3D-карта не успела загрузиться. Пока можно посмотреть оригинальные карты островов.');},30000);
 map.once('load',()=>{
  // Raised forest polygons give the vector islands a restrained model-like relief.
  const forest=style.layers.find(l=>l['source-layer']==='landcover'&&l.type==='fill');
  if(forest){const firstLabel=map.getStyle().layers.find(l=>l.type==='symbol')?.id;map.addLayer({id:'island-relief',type:'fill-extrusion',source:forest.source,'source-layer':'landcover',filter:['in','class','wood','forest'],paint:{'fill-extrusion-color':'#3f6856','fill-extrusion-height':60,'fill-extrusion-base':0,'fill-extrusion-opacity':.85}},firstLabel);}
  map.once('idle',async()=>{
   ready=true;clearTimeout(loadTimer);loading.textContent='Прокладываем обзорное путешествие по воде…';
   const waterLayer=map.getStyle().layers.find(l=>l.type==='fill'&&l['source-layer']==='water');
   try{
    if(!waterLayer)throw Error('No water layer');
    const features=map.querySourceFeatures(waterLayer.source,{sourceLayer:'water'});
    const result=await buildWaterRoute(features,order.map(i=>places[i]));route=result.route;
    if(route.length<2)throw Error('No route');
    lengths=[0];for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i];lengths.push(lengths[i-1]+Math.hypot((b[0]-a[0])*.49,b[1]-a[1]));}total=lengths.at(-1);
    map.addSource('voyage-route',{type:'geojson',data:{type:'Feature',properties:{},geometry:{type:'LineString',coordinates:route}}});
    map.addLayer({id:'voyage-glow',type:'line',source:'voyage-route',paint:{'line-color':'#e7bf77','line-width':7,'line-opacity':.12}});
    map.addLayer({id:'voyage-line',type:'line',source:'voyage-route',paint:{'line-color':'#ebc47f','line-width':2,'line-opacity':.8,'line-dasharray':[2,3]}});
    try{boat=await Promise.race([createBoatLayer(map,route[0]),new Promise((_,reject)=>setTimeout(()=>reject(Error('3D model timeout')),18000))]);}
    catch{const el=document.createElement('div');el.className='boat-fallback';el.textContent='⛵';const marker=new maplibregl.Marker({element:el,rotationAlignment:'map',pitchAlignment:'map'}).setLngLat(route[0]).addTo(map);boat={move:(p,b)=>marker.setLngLat(p).setRotation(b)};}
    play.disabled=false;message('Готовы отправиться? Соседский — Вихревой');
   }catch(e){routeFailed=true;message('Выберите остров на карте');play.textContent='Маршрут недоступен';play.disabled=true;document.querySelector('.map-caption').textContent='Карта островов доступна. Для анимации не удалось собрать непрерывный путь по воде — попробуйте перезагрузить страницу.';}
   document.querySelector('.map-backup')?.remove();orbitButton.disabled=false;reset.disabled=false;loading.hidden=true;
   map.easeTo({pitch:54,bearing:-22,duration:reduced?0:1800});
   tryAutoStart();
   frame=requestAnimationFrame(tick);
  });
 });
 map.on('dragstart',()=>{manualControl=true;if(running){setPlaying(false);message('Пауза · исследуйте залив');}});
 play.addEventListener('click',()=>{manualControl=true;if(!route.length)return;if(travel>=1)travel=0;setPlaying(!running);});
 orbitButton.addEventListener('click',()=>{orbit=!orbit;orbitButton.setAttribute('aria-pressed',String(orbit));orbitButton.textContent=orbit?'Остановить вращение':'Вращать карту';});
 reset.addEventListener('click',()=>{manualControl=true;setPlaying(false);orbit=false;orbitButton.setAttribute('aria-pressed','false');orbitButton.textContent='Вращать карту';travel=0;progress.value=0;selected=-1;pins.forEach(p=>p.el.classList.remove('active'));if(boat&&route[0])boat.move(route[0],0);map.fitBounds([[28.385,60.545],[28.725,60.72]],{pitch:48,bearing:-18,padding:{top:90,bottom:130,left:55,right:55},duration:reduced?0:1600});message(routeFailed?'Выберите остров на карте':'От Соседского до Вихревого');});
}catch(e){console.error('Bay map initialization:',e);error(/webgl|context/i.test(e.message)?'В этом браузере 3D недоступно. Открыт просмотр оригинальных карт островов.':'Не удалось запустить 3D. Открыт просмотр оригинальных карт островов.');}
function tick(time){
 const dt=last?Math.min((time-last)/1000,.1):0;last=time;
 if(!document.hidden&&visible&&ready){
  if(running&&route.length){travel=Math.min(1,travel+dt/duration);const distance=travel*total;let lo=1,hi=lengths.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(lengths[mid]<distance)lo=mid+1;else hi=mid;}const i=lo,a=route[i-1],b=route[i],f=(distance-lengths[i-1])/(lengths[i]-lengths[i-1]||1),p=[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];const ahead=route[Math.min(i+5,route.length-1)],bearing=Math.atan2((ahead[0]-a[0])*.49,ahead[1]-a[1])*180/Math.PI;boatHeading+=(((bearing-boatHeading+540)%360)-180)*Math.min(1,dt*5);boat?.move(p,boatHeading);progress.value=travel;
   let nearest=places[0],d=Infinity;for(const place of places){const n=Math.hypot((place.coordinates[0]-p[0])*.49,place.coordinates[1]-p[1]);if(n<d){d=n;nearest=place;}}
   if(selected!==nearest.id){selected=nearest.id;pins.forEach(pin=>pin.el.classList.toggle('active',pin.id===selected));message('Рядом: '+nearest.name);}
   map.jumpTo({center:p,zoom:Math.max(map.getZoom(),11.8),pitch:56,bearing:map.getBearing()+(orbit?dt*7:0)});
   if(travel===1){setPlaying(false);message('Вихревой · путешествие завершено');}
  }else if(orbit&&!map.isMoving())map.jumpTo({bearing:map.getBearing()+dt*7});
 }
 frame=requestAnimationFrame(tick);
}
window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);map?.remove();});
