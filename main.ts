import*as J from'fs'
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',w,L,A,B,G,P,D,h,F,E,r,y,C
function V(m,s){for(let o=0n;s!==o;){o=s;s|=m&((s<<1n)|(s>>1n)|(s<<w)|(s>>w))}return s}
function W(m,s,T){let q=[[s,'']],M=new Set([s]);for(;q.length;){let[x,o]=q.shift();if((T>>x)&1n)return[o,x];for(let d=0;d<4;d++){let n=x+D[d];if(((m>>n)&1n)&&!M.has(n)){M.add(n);q.push([n,o+'UDLR'[d]])}}}}
function S(b,g,ps){
let M=new Set,Q=[],g0=V(y&~b,1n<<ps)
M.add((b<<L)|g0);Q.push([b,g0,ps,''])
for(let u=0;u<Q.length;u++){
let[bb,rg,pp,ms]=Q[u]
for(let x of C)if((bb>>x)&1n)for(let d=0;d<4;d++){
let bh=x-D[d],ah=x+D[d]
if(!((rg>>bh)&1n)||!((r>>ah)&1n)||(E>>ah)&1n||(bb>>ah)&1n)continue
let b2=bb^(1n<<x)^(1n<<ah),rg2=V(y&~b2,1n<<x),k2=(b2<<L)|rg2
if(M.has(k2))continue
M.add(k2)
let ms2=ms+W(rg,pp,1n<<bh)[0]+'UDLR'[d]
if(b2===g){let e=W(rg2,x,h);return[ms2+e[0],e[1]]}
Q.push([b2,rg2,x,ms2])
}
}
return null
}
function Z(t){
let a=t.trim().split('\n'),n=a[0].length,z=n+2,s='#'.repeat(z)
for(let l of a)s+='#'+l+'#'
s+='#'.repeat(z);w=BigInt(z);L=BigInt(s.length);A=0n;G=0n;B=0n;P=0n
for(let i=0;i<s.length;i++){let c=s[i],j=BigInt(i),b=1n<<j;if(c==='#'){A|=b;continue}if('.*+'.includes(c))G|=b;if('$*'.includes(c))B|=b;if('@+'.includes(c))P=j}
D=[-w,w,-1n,1n];h=((1n<<w)-1n)<<(P/w*w)&~A;F=((1n<<L)-1n)&~A&~h;E=(F&~G&((A<<w)|(A>>w))&((A<<1n)|(A>>1n)))|h
let o='',pl=P
while(B){let s=B&-B;r=V(F,s);y=r|h;C=[];for(let i=0n;i<L;i++)if((r>>i)&1n)C.push(i);let rb=B&r,x=S(rb,G&r,pl);if(!x)return null;o+=x[0];pl=x[1];B^=rb}
return o
}
for(let k=1;k<6;k++){let id='i00'+k,m='';try{m=Z(J.readFileSync(I+'/'+id+'/level.txt')+'')}catch(e){}J.mkdirSync(O+'/'+id,{recursive:true});J.writeFileSync(O+'/'+id+'/solution.txt',m)}
