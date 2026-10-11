const SHELL='easy-kannada-shell-v3',AUDIO='easy-kannada-audio-v1';
const ROOT=new URL('./',self.location).href;
const FILES=['./','index.html','style.css','app.js','engine.js','data/phrases.json','data/digits.json','assets/icon.svg','assets/bengaluru.svg','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(FILES.map(f=>new URL(f,ROOT).href))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('easy-kannada-shell-')&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.href.startsWith(ROOT))return;
if(u.pathname.includes('/assets/audio/')){e.respondWith(caches.open(AUDIO).then(async c=>{const saved=await c.match(u.href);if(saved)return saved;const r=await fetch(e.request);if(r.ok&&r.status===200)await c.put(u.href,r.clone());return r;}));return;}
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match(new URL('index.html',ROOT).href)));return;}
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
