export const intervals = [1, 3, 7, 14];
export function freshState() { return {version:1, phrases:{}, missions:{}, favourites:[], activity:[]}; }
export function readState(storage) {
  try { const s=JSON.parse(storage.getItem('easy-kannada-v1')); if(s?.version===1 && s.phrases && s.missions && Array.isArray(s.favourites) && Array.isArray(s.activity)) return s; } catch {}
  return freshState();
}
export function saveState(storage, state) {try {storage.setItem('easy-kannada-v1',JSON.stringify(state));return true;}catch{return false;}}
export function remember(state,id,correct,now=Date.now()) {
  const old=state.phrases[id]||{level:-1}; const level=correct?Math.min(old.level+1,3):0;
  state.phrases[id]={level,due:now+intervals[level]*86400000,seen:now};
}
export function dailyQueue(state,phrases,now=Date.now()) {
 return phrases.filter(p=>state.phrases[p.id]).sort((a,b)=>{const x=state.phrases[a.id],y=state.phrases[b.id];return (x.due<=now?0:1)-(y.due<=now?0:1)||x.due-y.due||a.id.localeCompare(b.id);}).slice(0,5);
}
export function seededShuffle(items,seed=1) {const a=[...items];let n=seed>>>0;for(let i=a.length-1;i>0;i--){n=(Math.imul(n,1664525)+1013904223)>>>0;const j=n%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export function points(attempts,hinted=false) {return hinted?0:attempts===0?10:5;}
export function stars(score,total) {return score>=total*.8?3:score>=total*.5?2:1;}
export function localDay(now=new Date()) {return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
export function markActivity(state) {const d=localDay();if(!state.activity.includes(d))state.activity.push(d);}
export function audioPath(id,slow=false) {return `assets/audio/${id}${slow?'-slow':''}.mp3`;}
