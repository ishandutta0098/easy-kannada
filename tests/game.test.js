import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {Window} from 'happy-dom';
import {mountAdventure} from '../game.js';
const phrases=JSON.parse(await fs.readFile('data/phrases.json','utf8'));
test('a character can walk, ride the auto, collect objects and complete all six errands',async()=>{
 const window=new Window({url:'https://example.test'});globalThis.window=window;
 window.document.body.innerHTML='<main></main>';const root=window.document.querySelector('main');let callback,time=0,heard=[];
 window.requestAnimationFrame=f=>{callback=f;return 1;};window.cancelAnimationFrame=()=>{};
 const config={phrases,play:id=>heard.push(id),stopAudio:()=>{},onPhrase:()=>{},toast:()=>{},storage:window.localStorage};
 let dispose=mountAdventure(root,config);
 function click(sel){const el=root.querySelector(sel);assert.ok(el,`Missing ${sel}; ${root.querySelector('#objective-text')?.textContent}`);assert.ok(!el.disabled,`Disabled ${sel}`);el.click();}
 function frames(n=400){for(let i=0;i<n;i++){time+=40;callback(time);}}
 function conversation(){let guard=0;while(root.querySelector('#say-phrase')&&guard++<10){assert.ok(root.querySelector('#dialogue-next').disabled);click('#say-phrase');assert.ok(!root.querySelector('#dialogue-next').disabled);click('#dialogue-next');}assert.ok(guard<10);}
 function guide(){click('#guide');frames(500);}
 click('[data-avatar="dev"]');click('#start-adventure');frames(1);
 const before=Number(root.querySelector('#player').dataset.x);window.dispatchEvent(new window.KeyboardEvent('keydown',{key:'d'}));frames(10);window.dispatchEvent(new window.KeyboardEvent('keyup',{key:'d'}));assert.ok(Number(root.querySelector('#player').dataset.x)>before);
 const pad=root.querySelector('[data-direction=left]');const touchBefore=Number(root.querySelector('#player').dataset.x);pad.dispatchEvent(new window.PointerEvent('pointerdown',{bubbles:true,pointerId:1}));frames(6);pad.dispatchEvent(new window.PointerEvent('pointerup',{bubbles:true,pointerId:1}));assert.ok(Number(root.querySelector('#player').dataset.x)<touchBefore,'touch pad moves the character');
 guide();assert.match(root.querySelector('.dialogue-person').textContent,/Ravi/);conversation();assert.ok(root.querySelector('#ride-action'));
 const positions=[];for(let i=0;i<4;i++){click('#ride-action');frames(160);positions.push([Number(root.querySelector('#player').dataset.x),Number(root.querySelector('#player').dataset.y)]);}
 assert.ok(positions[1][1]<positions[0][1],'left turn travels north');assert.ok(positions[2][0]>positions[1][0],'right turn travels east');conversation();assert.equal(root.querySelector('#stamp-count').textContent,'1 / 6');assert.equal(root.querySelector('#ride-action'),null,'ride directions disappear when disembarking');
 guide();conversation();for(let i=0;i<3;i++)guide();guide();conversation();assert.equal(root.querySelector('#stamp-count').textContent,'2 / 6',root.querySelector('#objective-text').textContent+' '+window.localStorage.getItem('easy-kannada-adventure-v2'));
 guide();conversation();guide();assert.equal(root.querySelector('#held-item').textContent,'☕');guide();conversation();assert.equal(root.querySelector('#stamp-count').textContent,'3 / 6');
 guide();conversation();guide();frames(180);conversation();assert.equal(root.querySelector('#stamp-count').textContent,'4 / 6');
 guide();conversation();assert.equal(root.querySelector('#held-item').textContent,'📦');
 // Leaving and returning resumes the current errand, held parcel and character.
 dispose();dispose=mountAdventure(root,config);frames(1);assert.equal(root.querySelector('#held-item').textContent,'📦');assert.match(root.querySelector('#player-caption').textContent,/Dev/);guide();assert.equal(root.querySelector('#stamp-count').textContent,'5 / 6');
 guide();conversation();guide();assert.equal(root.querySelector('#held-item').textContent,'🌼');guide();conversation();assert.equal(root.querySelector('#stamp-count').textContent,'6 / 6');assert.equal(root.querySelectorAll('.passport-stamps .earned').length,6);
 assert.ok(heard.includes('auto-03')&&heard.includes('auto-04')&&heard.includes('auto-08'));assert.ok(heard.length>=25);dispose();assert.equal(JSON.parse(window.localStorage.getItem('easy-kannada-adventure-v2')).quest,6);await window.happyDOM.close();
});
