import fs from 'node:fs';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import {gzipSync} from 'node:zlib';
const phrases=JSON.parse(fs.readFileSync('data/phrases.json')),digits=JSON.parse(fs.readFileSync('data/digits.json')),manifest=JSON.parse(fs.readFileSync('data/audio-manifest.json'));
assert.equal(phrases.length,60);assert.equal(new Set(phrases.map(p=>p.id)).size,60);
for(const name of ['auto','breakfast','groceries','transit','delivery','neighbours'])assert.equal(phrases.filter(p=>p.scenario===name).length,10);
for(const p of phrases){for(const key of ['id','scenario','english','kannada','roman','hint','context'])assert.equal(typeof p[key],'string');assert.match(p.kannada,/[\u0C80-\u0CFF]/);assert.equal(p.tokens.join(' '),p.roman);assert.ok(p.tokens.length>=2&&p.tokens.length<=5);assert.ok(p.sourceUrls.length);p.sourceUrls.forEach(s=>assert.equal(new URL(s).protocol,'https:'));}
assert.deepEqual(digits.map(d=>d.digit),[0,1,2,3,4,5,6,7,8,9]);
const items=[...phrases,...digits.map(d=>({...d,id:`digit-${d.digit}`}))];assert.equal(manifest.length,items.length);
for(const p of items){const entry=manifest.find(m=>m.id===p.id);assert.ok(entry,`Manifest missing ${p.id}`);assert.equal(entry.textSha256,createHash('sha256').update(p.kannada).digest('hex'));for(const f of entry.files){assert.ok(fs.statSync(f).size>1000,`Empty audio ${f}`);}}
const first=['index.html','style.css','app.js','engine.js','data/phrases.json','data/digits.json','assets/bengaluru.svg','assets/icon.svg','manifest.webmanifest'];const bytes=first.reduce((sum,f)=>sum+gzipSync(fs.readFileSync(f)).length,0);assert.ok(bytes<500000,`Initial assets ${bytes}`);console.log(`Validated 60 phrases, 10 digits, 140 audio assets; initial local assets gzip: ${bytes} bytes.`);
