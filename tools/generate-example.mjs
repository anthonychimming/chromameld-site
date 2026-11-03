import { Worker } from 'node:worker_threads';
import { writeFile } from 'node:fs/promises';
import { Parser } from '../../chromameld-rgba/src/core/formula-language.js';
import { compileFilterProgram } from '../../chromameld-rgba/src/core/ir.js';
import { presets } from '../../chromameld-rgba/src/presets/builtins.js';
import { workerProgram } from '../../chromameld-rgba/src/renderers/cpu-worker-source.js';
const w=1200,h=630, pixels=new Uint8ClampedArray(w*h*4);
for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4, dx=x-w/2,dy=y-h/2,r=Math.hypot(dx,dy);pixels[i]=Math.max(0,Math.min(255,80+120*Math.sin(x/92)*Math.cos(y/74)));pixels[i+1]=Math.max(0,Math.min(255,105+100*Math.sin(r/38)));pixels[i+2]=Math.max(0,Math.min(255,135+110*Math.cos((x+y)/90)));pixels[i+3]=255;}
await writeFile('source.rgba',pixels);
const wrapper=`const {parentPort}=require('node:worker_threads');globalThis.postMessage=m=>parentPort.postMessage(m);parentPort.on('message',data=>globalThis.onmessage({data}));${workerProgram()}`;
const worker=new Worker(wrapper,{eval:true}); const wait=type=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('worker timeout')),120000);const fn=m=>{if(m.type===type){clearTimeout(timer);worker.off('message',fn);resolve(m)}};worker.on('message',fn);worker.on('error',reject)});
worker.postMessage({type:'init',width:w,height:h,buffer:pixels.buffer},[pixels.buffer]);await wait('ready');const p=presets.find(p=>p.id==='kaleidoscope-mirror');const program=compileFilterProgram(p.f.map(f=>new Parser(f).parse()));worker.postMessage({type:'render',id:1,program,controls:p.controls.map(c=>c.value),legacyMath:false});const out=await wait('result');await writeFile('result.rgba',new Uint8Array(out.buffer));console.log(JSON.stringify({id:p.id,name:p.name,formulas:p.f,controls:p.controls},null,2));await worker.terminate();

