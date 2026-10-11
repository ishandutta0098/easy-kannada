import fs from 'node:fs';
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist');
for(const file of ['index.html','style.css','app.js','engine.js','game.js','world.js','game.css','sw.js','manifest.webmanifest','assets','data'])fs.cpSync(file,`dist/${file}`,{recursive:true});
fs.writeFileSync('dist/.nojekyll','');
console.log('Static site packaged in dist/');
