// Water-only overview path: no depth or navigation claims.
export function insideRing(p,ring){let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
export function insidePolygon(p,rings){return insideRing(p,rings[0])&&!rings.slice(1).some(r=>insideRing(p,r));}
class Heap{constructor(){this.a=[];}push(v){let i=this.a.length;this.a.push(v);while(i){let p=(i-1)>>1;if(this.a[p][0]<=v[0])break;this.a[i]=this.a[p];i=p;}this.a[i]=v;}pop(){const top=this.a[0],v=this.a.pop();if(this.a.length){let i=0;while(i*2+1<this.a.length){let c=i*2+1;if(c+1<this.a.length&&this.a[c+1][0]<this.a[c][0])c++;if(this.a[c][0]>=v[0])break;this.a[i]=this.a[c];i=c;}this.a[i]=v;}return top;}get length(){return this.a.length;}}
export function findPath(water,w,h,start,end){
 const size=w*h,g=new Float64Array(size).fill(Infinity),prev=new Int32Array(size).fill(-1),closed=new Uint8Array(size),heap=new Heap();g[start]=0;
 const hfun=n=>Math.hypot(n%w-end%w,Math.floor(n/w)-Math.floor(end/w));heap.push([hfun(start),start]);
 while(heap.length){const [,n]=heap.pop();if(closed[n])continue;if(n===end){const path=[];for(let x=n;x!==-1;x=prev[x])path.push(x);return path.reverse();}closed[n]=1;const x=n%w,y=Math.floor(n/w);
 for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;const m=yy*w+xx;if(!water[m]||closed[m])continue;if(dx&&dy&&(!water[y*w+xx]||!water[yy*w+x]))continue;const cost=g[n]+Math.hypot(dx,dy);if(cost<g[m]){g[m]=cost;prev[m]=n;heap.push([cost+hfun(m),m]);}}}
 return null;
}
export async function buildWaterRoute(features,stops){
 const w=210,h=230,b=[28.385,60.545,28.725,60.72],water=new Uint8Array(w*h),lonStep=(b[2]-b[0])/(w-1),latStep=(b[3]-b[1])/(h-1);
 const position=n=>[b[0]+n%w*lonStep,b[1]+Math.floor(n/w)*latStep];
 let last=performance.now();
 for(const f of features){const polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[];
  for(const rings of polys){const ring=rings[0];if(!ring?.length)continue;const xs=ring.map(p=>p[0]),ys=ring.map(p=>p[1]);const x0=Math.max(0,Math.floor((Math.min(...xs)-b[0])/lonStep)),x1=Math.min(w-1,Math.ceil((Math.max(...xs)-b[0])/lonStep)),y0=Math.max(0,Math.floor((Math.min(...ys)-b[1])/latStep)),y1=Math.min(h-1,Math.ceil((Math.max(...ys)-b[1])/latStep));
   for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const n=y*w+x;if(!water[n]&&insidePolygon(position(n),rings))water[n]=1;}
  }
  if(performance.now()-last>18){await new Promise(r=>setTimeout(r,0));last=performance.now();}
 }
 const nearest=p=>{let n=-1,best=Infinity;for(let i=0;i<water.length;i++)if(water[i]){const q=position(i),d=((q[0]-p[0])*.49)**2+(q[1]-p[1])**2;if(d<best){best=d;n=i;}}if(best>.012**2)throw Error('No water near a stop');return n;};
 const nodes=stops.map(s=>nearest(s.coordinates)),route=[],arrivals=[];
 for(let i=0;i<nodes.length-1;i++){const segment=findPath(water,w,h,nodes[i],nodes[i+1]);if(!segment)throw Error('Water route is disconnected');arrivals.push(route.length);route.push(...segment.slice(i?1:0).map(position));}
 arrivals.push(route.length-1);return{route,arrivals};
}
