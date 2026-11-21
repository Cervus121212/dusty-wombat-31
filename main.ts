import{readFileSync,writeFileSync,mkdirSync}from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
function L(t){
let r=t.split('\n'),w=r[0].length,S=r.join(''),D=[1,-1,w,-w],B=[],G=new Set,P=0
for(let i=0;i<S.length;i++){let c=S[i];if(c=='$'||c=='*')B.push(i);if(c=='.'||c=='*')G.add(i);if(c=='@'||c=='+')P=i}
let y=(P/w)|0,AL=new Set(),NH=new Set()
for(let i=0;i<S.length;i++)if(S[i]!='#'){AL.add(i);if((i/w|0)!=y)NH.add(i)}
function F(s,o,A){let m=new Map([[s,'']]),q=[s];for(let i=0;i<q.length;i++){let c=q[i],p=m.get(c);for(let k=0;k<4;k++){let n=c+D[k];if(A.has(n)&&!o.has(n)&&!m.has(n)){m.set(n,p+'rldu'[k]);q.push(n)}}}return m}
let V=new Set(),R=[]
for(let i of NH){if(V.has(i))continue;let C=new Set(F(i,new Set,NH).keys());for(let k of C)V.add(k);R.push(C)}
let rooms=[]
for(let C of R){
let d=[...C].find(i=>(i/w|0)==y-1||(i/w|0)==y+1)
if(d===undefined)continue
rooms.push([C,d+((d/w|0)<y?w:-w),B.filter(b=>C.has(b)),[...G].filter(g=>C.has(g))])}
if(!rooms.length)rooms=[[AL,P,B,[...G]]]
let mv='',pp=P
for(let[C,A,b,g]of rooms){
if(!b.length)continue
let p=F(pp,new Set(B),AL).get(A)
if(p===undefined)return''
mv+=p;pp=A
let mn=new Map(),q=[...g],ar=new Set([...C,A])
for(let x of g)mn.set(x,0)
for(let i=0;i<q.length;i++){let Y=q[i],d=mn.get(Y)
for(let k=0;k<4;k++){let x=Y+D[k],z=x+D[k]
if(C.has(x)&&!mn.has(x)&&ar.has(z)){mn.set(x,d+1);q.push(x)}}}
let h0=0
for(let x of b){if(!mn.has(x))return'';h0+=mn.get(x)}
let open=[[h0,0,b.slice(),pp,'']],seen=new Map(),sol=0
while(open.length&&!sol){
let mi=0;for(let i=1;i<open.length;i++)if(open[i][0]<open[mi][0])mi=i
let[,gg,bb,p2,m2]=open.splice(mi,1)[0]
if(bb.every(x=>G.has(x))){sol=[m2,p2,bb];break}
let bs=new Set(bb),rg=F(p2,bs,ar),rm=Math.min(...rg.keys())
let key=bb.join()+'|'+rm
if(seen.has(key)&&seen.get(key)<=gg)continue
seen.set(key,gg)
for(let b0 of bb){
for(let k=0;k<4;k++){
let dest=b0+D[k],from=b0-D[k]
if(!C.has(dest)||bs.has(dest)||!rg.has(from))continue
let nb=bb.slice();nb[nb.indexOf(b0)]=dest;nb.sort((a,c)=>a-c)
let h=0,dead=0
for(let x of nb){if(!mn.has(x)){dead=1;break}h+=mn.get(x)}
if(dead)continue
open.push([gg+1+h,gg+1,nb,b0,m2+rg.get(from)+'rldu'[k]])}}}
if(!sol)return''
mv+=sol[0];pp=sol[1]
B=B.filter(x=>!b.includes(x)).concat(sol[2])}
return mv}
for(let id of['i001','i002','i003','i004','i005']){let m='';try{m=L(readFileSync(I+'/'+id+'/level.txt','utf8'))}catch{}mkdirSync(O+'/'+id,{recursive:true});writeFileSync(O+'/'+id+'/solution.txt',m)}
