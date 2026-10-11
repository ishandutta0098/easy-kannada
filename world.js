// Pure world rules: movement, collision, path finding, and save validation.
export const WORLD={width:1440,height:1000};
export const SOLIDS=[{x:140,y:130,w:350,h:200},{x:950,y:140,w:350,h:190},{x:150,y:740,w:290,h:180},{x:1000,y:750,w:290,h:170}];
export const STOPS=[
{id:'auto',name:'An auto to the market',icon:'🛺',person:'Ravi · auto driver',x:490,y:520},
{id:'groceries',name:'Fill your shopping bag',icon:'🥬',person:'Lakshmi · vegetable seller',x:1090,y:380},
{id:'breakfast',name:'Dosa & filter coffee',icon:'☕',person:'Manju · café owner',x:340,y:370},
{id:'transit',name:'Catch the neighbourhood bus',icon:'🚌',person:'Kiran · conductor',x:1120,y:680},
{id:'delivery',name:'Bring your parcel home',icon:'📦',person:'Surya · delivery rider',x:430,y:670},
{id:'neighbours',name:'Make a friend next door',icon:'🌼',person:'Anu · your neighbour',x:600,y:810}
];
export function newAdventure(){return {version:2,started:false,avatar:'asha',x:420,y:590,quest:0,stage:0,collected:[],stamps:[],spoken:[],item:'',rideStep:0};}
export function canStand(x,y){return Number.isFinite(x)&&Number.isFinite(y)&&x>=30&&x<=1410&&y>=40&&y<=970&&!SOLIDS.some(r=>x>r.x-14&&x<r.x+r.w+14&&y>r.y-12&&y<r.y+r.h+15);}
export function readAdventure(storage){try{const s=JSON.parse(storage.getItem('easy-kannada-adventure-v2'));if(s?.version===2&&Number.isInteger(s.quest)&&s.quest>=0&&s.quest<=6&&Number.isInteger(s.stage)&&s.stage>=0&&s.stage<=3&&Array.isArray(s.collected)&&Array.isArray(s.stamps)&&Array.isArray(s.spoken)&&canStand(s.x,s.y))return {...newAdventure(),...s,avatar:s.avatar==='dev'?'dev':'asha',rideStep:Math.max(0,Math.min(3,Number(s.rideStep)||0))};}catch{}return newAdventure();}
export function movePlayer(p,dx,dy){let x=p.x,y=p.y;if(canStand(x+dx,y))x+=dx;if(canStand(x,y+dy))y+=dy;return {...p,x,y};}
export function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
export function findPath(from,to){const size=20,cols=72,rows=50,cell=p=>({x:Math.max(1,Math.min(cols-2,Math.round(p.x/size))),y:Math.max(2,Math.min(rows-2,Math.round(p.y/size)))}),a=cell(from),b=cell(to),key=p=>p.y*cols+p.x;
if(!canStand(b.x*size,b.y*size))return [];
const q=[a],came=new Map([[key(a),null]]);let target=null;
for(let i=0;i<q.length;i++){const c=q[i];if(c.x===b.x&&c.y===b.y){target=c;break;}for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const n={x:c.x+dx,y:c.y+dy};if(n.x<1||n.x>=cols-1||n.y<2||n.y>=rows-1||came.has(key(n))||!canStand(n.x*size,n.y*size))continue;came.set(key(n),c);q.push(n);}}
if(!target)return [];const path=[];for(let p=target;came.get(key(p));p=came.get(key(p)))path.unshift({x:p.x*size,y:p.y*size});if(canStand(to.x,to.y))path.push({...to});return path;
}
export function completeQuest(s){if(s.quest>=6)return s;const stamp=STOPS[s.quest].id;return {...s,quest:s.quest+1,stage:0,rideStep:0,collected:[],item:'',stamps:[...new Set([...s.stamps,stamp])]};}
export function targetFor(s){if(s.quest>=6)return {x:600,y:810,label:'The neighbourhood is yours',action:'See your day'};const stop=STOPS[s.quest];
if(s.quest===0&&s.stage===1)return {x:s.x,y:s.y,label:'Tell Ravi where to go',action:'Give directions'};
if(s.quest===1&&s.stage===1){const crates=[{id:'tomato',x:980,y:420,label:'Pick up tomatoes'},{id:'carrot',x:1130,y:420,label:'Pick up carrots'},{id:'greens',x:1270,y:420,label:'Pick up greens'}];const c=crates.find(c=>!s.collected.includes(c.id));return c?{...c,action:'Pick up'}:{...stop,label:'Pay Lakshmi for your vegetables',action:'Pay'};}
if(s.quest===2&&s.stage===1)return {x:430,y:370,label:'Pick up your breakfast tray',action:'Pick up tray'};
if(s.quest===2&&s.stage===2)return {x:510,y:425,label:'Carry your tray to the café table',action:'Set down tray'};
if(s.quest===3&&s.stage===1)return {x:940,y:620,label:'Walk to the bus and hop on',action:'Board bus'};
if(s.quest===4&&s.stage===1)return {x:300,y:710,label:'Carry your parcel to your front door',action:'Leave parcel at home'};
if(s.quest===5&&s.stage===1)return {x:690,y:865,label:'Pick a flower from the community garden',action:'Pick a flower'};
if(s.quest===5&&s.stage===2)return {...stop,label:'Bring the flower to Anu',action:'Give flower'};
return {...stop,label:['Walk over to Ravi’s auto','Talk to Lakshmi at the market','Visit Manju’s café','Buy a ticket from Kiran','Meet Surya near your home','Say hello to Anu in the park'][s.quest],action:s.quest===0?'Talk to Ravi':'Talk'};
}
export const RIDE=[{phrase:'auto-05',label:'Go straight',x:740,y:520},{phrase:'auto-03',label:'Turn left',x:740,y:410},{phrase:'auto-04',label:'Turn right',x:1040,y:410},{phrase:'auto-08',label:'Stop here',x:1040,y:410}];
