(()=>{var cg=Object.defineProperty;var qe=(i,t)=>()=>(i&&(t=i(i=0)),t);var lg=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports),hg=(i,t)=>{for(var e in t)cg(i,e,{get:t[e],enumerable:!0})};function Ea(i){return String(i??"").normalize("NFKC").toLowerCase().replace(/\s+/g,"")}function ug(i,t){let e=[Array.from({length:t.length+1},(n,s)=>s)];for(let n=1;n<=i.length;n++){let s=[n];e.push(s);for(let r=1;r<=t.length;r++)s[r]=Math.min(e[n-1][r]+1,s[r-1]+1,e[n-1][r-1]+ +(i[n-1]!==t[r-1])),n>1&&r>1&&i[n-1]===t[r-2]&&i[n-2]===t[r-1]&&(s[r]=Math.min(s[r],e[n-2][r-2]+1))}return e[i.length][t.length]}function Bf(i,t,e,n=5){let s=Ea(i);if(s.length<2)return[];let r=/^b?\d+$/.test(s);if(r&&s.length<3)return[];let o=s.normalize("NFD"),a=r||o.length<6?1:o.length<12?2:3;return t.flatMap(c=>{let l=1/0;for(let h of e(c)){let u=Ea(h);if(!(!u||r!==/^b?\d+$/.test(u)))for(let f=Math.max(2,s.length-1);f<=s.length+1;f++){if(f>u.length||r&&f!==u.length)continue;let d=u.slice(0,f).normalize("NFD");if(Math.abs(d.length-o.length)>a)continue;let g=ug(o,d);g<=a&&(l=Math.min(l,g*10+(u.length-f)*.1))}}return Number.isFinite(l)?[{item:c,score:l}]:[]}).sort((c,l)=>c.score-l.score).slice(0,n).map(({item:c})=>c)}var kf=qe(()=>{});function je(i){return i===0?"B1":`${i}F`}function ze(i){return i===0?"\uC9C0\uD558 1\uCE35":`${i}\uCE35`}function Mg(i){return typeof atob=="function"?Uint8Array.from(atob(i),t=>t.charCodeAt(0)):new Uint8Array(Buffer.from(i,"base64"))}function Sg(i){let t={};for(let e of i.floors)t[e.n]=Mg(e.grid);return(e,n,s)=>{let r=Math.floor((n-i.gx0)/i.cell),o=Math.floor((i.gy1-s)/i.cell);if(!t[e]||r<0||o<0||r>=i.gw||o>=i.gh)return!1;let a=o*i.gw+r;return(t[e][a>>3]>>7-(a&7)&1)===1}}function Kl(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++)i[s][1]>e!=i[r][1]>e&&t<(i[r][0]-i[s][0])*(e-i[s][1])/(i[r][1]-i[s][1])+i[s][0]&&(n=!n);return n}function zf(i){let t=i.floors.map(X=>X.n),e=X=>i.floors.find(et=>et.n===X),n=Sg(i);function s(X,et,at,ut=18){if(n(X,et,at))return[et,at];for(let O=i.cell;O<ut;O+=i.cell)for(let C=0;C<Math.PI*2;C+=Math.max(.05,i.cell/O)){let H=et+O*Math.cos(C),xt=at+O*Math.sin(C);if(n(X,H,xt))return[H,xt]}return null}function r(X,et,at){let ut=e(X);return ut&&ut.rooms.find(O=>Kl(O.poly,et,at))||null}let o=i.ramps.map(X=>{let et=0,at=[0];for(let ut=1;ut<X.pts.length;ut++)et+=Math.hypot(X.pts[ut][0]-X.pts[ut-1][0],X.pts[ut][1]-X.pts[ut-1][1]),at.push(et);return{...X,cum:at,T:et}}),a=Math.floor(i.gw/Si),c=Math.floor(i.gh/Si),l=a*c,h=X=>[i.gx0+(X%a*Si+Si/2)*i.cell,i.gy1-(Math.floor(X/a)*Si+Si/2)*i.cell],u={},f={},d={},g=[1,1.7,1.2,1];for(let X of t){let et=new Uint8Array(l),at=new Int16Array(l).fill(-1),ut=e(X).rooms;for(let H=0;H<l;H++){let[xt,vt]=h(H);if(et[H]=n(X,xt,vt)?1:0,et[H]){for(let Ut=0;Ut<ut.length;Ut++)if(!["stair","ostair","elev"].includes(ut[Ut].cat)&&Kl(ut[Ut].poly,xt,vt)){at[H]=Ut;break}}}u[X]=et,f[X]=at;let O=new Uint8Array(l).fill(255),C=[];for(let H=0;H<l;H++)et[H]||(O[H]=0,C.push(H));for(let H=0;H<C.length;H++){let xt=C[H],vt=xt%a,Ut=xt/a|0;if(!(O[xt]>=3))for(let $t=-1;$t<=1;$t++)for(let I=-1;I<=1;I++){let Wt=vt+I,Pt=Ut+$t;if(Wt<0||Pt<0||Wt>=a||Pt>=c)continue;let Bt=Pt*a+Wt;O[Bt]>O[xt]+1&&(O[Bt]=O[xt]+1,C.push(Bt))}}d[X]=O}function _(X,et,at){let ut=Math.floor((et-i.gx0)/i.cell/Si),O=Math.floor((i.gy1-at)/i.cell/Si),C=u[X];if(!C)return-1;let H=-1,xt=1e9;for(let vt=0;vt<40&&H<0;vt++)for(let Ut=O-vt;Ut<=O+vt;Ut++)for(let $t=ut-vt;$t<=ut+vt;$t++){if($t<0||Ut<0||$t>=a||Ut>=c||!C[Ut*a+$t])continue;let I=($t-ut)**2+(Ut-O)**2;I<xt&&(xt=I,H=Ut*a+$t)}return H}let m=[];for(let X of o){let et=X.pts[0],at=X.pts[X.pts.length-1],ut=_(X.lo,et[0],et[1]),O=_(X.lo+1,at[0],at[1]);ut>=0&&O>=0&&e(X.lo+1)&&m.push({kind:"stair",id:X.id,fa:X.lo,fb:X.lo+1,ca:ut,cb:O,cost:X.T+dg,ramp:X})}function p(X,et){let at=null;for(let ut of e(X).rooms)if(ut.cat==="elev"){let O=Math.hypot(ut.c[0]-et[0],ut.c[1]-et[1]);(!at||O<at[0])&&(at=[O,ut.c])}return at&&at[0]<5?at[1]:et}let b=[];for(let X of i.floors)for(let et of X.doors)et.cat==="elev"&&b.push({f:X.n,p:et.p,id:et.id});let y=[];for(let X of b){let et=y.find(at=>Math.hypot(at.p[0]-X.p[0],at.p[1]-X.p[1])<3&&!at.doors.some(ut=>ut.f===X.f));et||y.push(et={p:X.p,doors:[]}),et.doors.push(X)}y.forEach((X,et)=>{X.id=`EV${et+1}`,X.doors.sort((at,ut)=>at.f-ut.f);for(let at=0;at<X.doors.length;at++)for(let ut=at+1;ut<X.doors.length;ut++){let O=X.doors[at],C=X.doors[ut],H=_(O.f,O.p[0],O.p[1]),xt=_(C.f,C.p[0],C.p[1]);H>=0&&xt>=0&&m.push({kind:"elev",id:X.id,fa:O.f,fb:C.f,ca:H,cb:xt,cost:gg+_g*(C.f-O.f),pa:O.p,pb:C.p,qa:p(O.f,O.p),qb:p(C.f,C.p)})}});let x=X=>t.indexOf(X);function T(X,et,at={}){let ut=at.mode||"stairs",O=new Set(at.allowRooms||[]),C=l*t.length,H=_(X.f,X.x,X.y);if(H<0)return null;let xt=x(X.f)*l+H,vt=new Map;for(let tt of et){let Et=_(tt.f,tt.x,tt.y);Et>=0&&vt.set(x(tt.f)*l+Et,tt)}if(!vt.size)return null;let Ut=new Float64Array(C).fill(1/0),$t=new Int32Array(C).fill(-1),I=new Int32Array(C).fill(-1);Ut[xt]=0;let Wt=new Map;m.forEach((tt,Et)=>{let U=x(tt.fa)*l+tt.ca,F=x(tt.fb)*l+tt.cb;(Wt.get(U)||Wt.set(U,[]).get(U)).push([F,Et]),(Wt.get(F)||Wt.set(F,[]).get(F)).push([U,Et])});let Pt=[],Bt=(tt,Et)=>{Pt.push([tt,Et]);let U=Pt.length-1;for(;U>0;){let F=U-1>>1;if(Pt[F][0]<=Pt[U][0])break;[Pt[F],Pt[U]]=[Pt[U],Pt[F]],U=F}},Vt=()=>{let tt=Pt[0],Et=Pt.pop();if(Pt.length){Pt[0]=Et;let U=0;for(;;){let F=2*U+1,z=F+1,ct=U;if(F<Pt.length&&Pt[F][0]<Pt[ct][0]&&(ct=F),z<Pt.length&&Pt[z][0]<Pt[ct][0]&&(ct=z),ct===U)break;[Pt[ct],Pt[U]]=[Pt[U],Pt[ct]],U=ct}}return tt};Bt(0,xt);let be=Si*i.cell,zt=-1;for(;Pt.length;){let[tt,Et]=Vt();if(tt>Ut[Et])continue;if(vt.has(Et)){zt=Et;break}let U=Math.floor(Et/l),F=Et-U*l,z=t[U],ct=u[z],nt=f[z],ot=F%a,yt=Math.floor(F/a);for(let it=-1;it<=1;it++)for(let ht=-1;ht<=1;ht++){if(!ht&&!it)continue;let mt=ot+ht,lt=yt+it;if(mt<0||lt<0||mt>=a||lt>=c)continue;let q=lt*a+mt;if(!ct[q]||ht&&it&&!(ct[yt*a+mt]&&ct[lt*a+ot]))continue;let pt=nt[q],Ht=(pt>=0&&!O.has(e(z).rooms[pt].id)?fg:1)*g[Math.min(3,d[z][q])],Zt=U*l+q,Jt=tt+Math.hypot(ht,it)*be*Ht;Jt<Ut[Zt]&&(Ut[Zt]=Jt,$t[Zt]=Et,I[Zt]=-1,Bt(Jt,Zt))}let L=Wt.get(Et);if(L)for(let[it,ht]of L){let mt=tt+m[ht].cost+(ut==="elevator"&&m[ht].kind==="stair"?pg:0);mt<Ut[it]&&(Ut[it]=mt,$t[it]=Et,I[it]=ht,Bt(mt,it))}}if(zt<0)return null;let qt=[];for(let tt=zt;tt>=0;tt=$t[tt])qt.push(tt);qt.reverse();let me=[],de=null;for(let tt=0;tt<qt.length;tt++){let Et=qt[tt],U=t[Math.floor(Et/l)],[F,z]=h(Et%l);if(I[Et]>=0){let ct=m[I[Et]],nt=U>t[Math.floor(qt[tt-1]/l)];me.push({kind:ct.kind,id:ct.id,from:nt?ct.fa:ct.fb,to:U,link:ct,up:nt}),de=null}de||(de={kind:"walk",f:U,pts:[]},me.push(de)),de.pts.push([F,z])}let R=vt.get(zt),v=me.filter(tt=>tt.kind==="walk");v[0].pts[0]=[X.x,X.y],v[v.length-1].pts.push([R.x,R.y]);for(let tt of v)tt.pts=A(tt.f,tt.pts);let Q=[];for(let tt of me){if(tt.i0=Q.length,tt.kind==="walk"){let Et=e(tt.f).z;for(let[U,F]of tt.pts)Q.push({x:U,y:F,z:Et,f:tt.f,kind:"walk"})}else if(tt.kind==="stair"){let Et=tt.link.ramp,U=e(Et.lo).z,F=tt.up?Et.pts:[...Et.pts].reverse();for(let z of F)Q.push({x:z[0],y:z[1],z:U+z[2]*i.FH,f:Et.lo+(z[2]>.5?1:0),kind:"stair"})}else{let Et=tt.link,U=tt.up?Et.pa:Et.pb,F=tt.up?Et.pb:Et.pa;Q.push({x:U[0],y:U[1],z:e(tt.from).z,f:tt.from,kind:"elev"}),Q.push({x:F[0],y:F[1],z:e(tt.to).z,f:tt.to,kind:"elev"})}tt.i1=Q.length-1}let _t=0;for(let tt=1;tt<Q.length;tt++)Q[tt].kind==="elev"&&Q[tt-1].kind==="elev"||(_t+=Math.hypot(Q[tt].x-Q[tt-1].x,Q[tt].y-Q[tt-1].y));let ft=me.filter(tt=>tt.kind!=="walk"),Yt=ft.filter(tt=>tt.kind==="stair").reduce((tt,Et)=>tt+Math.abs(Et.to-Et.from),0);return{pts:Q,legs:me,len:_t,cost:Ut[zt],target:R,vertical:ft,mode:ut,stairFloors:Yt}}function w(X,et,at){let ut=Math.hypot(at[0]-et[0],at[1]-et[1]);if(ut<1e-6)return!0;let O=Math.ceil(ut/.1),C=-(at[1]-et[1])/ut*.25,H=(at[0]-et[0])/ut*.25;for(let xt=1;xt<O;xt++){let vt=xt/O,Ut=et[0]+(at[0]-et[0])*vt,$t=et[1]+(at[1]-et[1])*vt;if(!n(X,Ut,$t)||!n(X,Ut+C,$t+H)||!n(X,Ut-C,$t-H))return!1}return!0}function A(X,et){if(et.length<3)return et;let at=[et[0]],ut=0;for(;ut<et.length-1;){let O=et.length-1;for(;O>ut+1&&!w(X,et[ut],et[O]);)O--;at.push(et[O]),ut=O}return N(X,at,.35)}function N(X,et,at){if(et.length<3)return et;let ut=et[0],O=et[et.length-1],C=-1,H=0,xt=Math.hypot(O[0]-ut[0],O[1]-ut[1])||1e-9;for(let $t=1;$t<et.length-1;$t++){let I=Math.abs((O[0]-ut[0])*(ut[1]-et[$t][1])-(ut[0]-et[$t][0])*(O[1]-ut[1]))/xt;I>H&&(H=I,C=$t)}if(H<=at&&w(X,ut,O))return[ut,O];if(C<0)return et;let vt=N(X,et.slice(0,C+1),at),Ut=N(X,et.slice(C),at);return[...vt.slice(0,-1),...Ut]}let M=i.names||{},S=new Map;for(let X of i.floors){let et=(at,ut,O,C,H)=>{if(O==="stair"||O==="ostair"||xg.test(at))return;let xt=`${X.n}:${at}`,vt=S.get(xt);if(!vt){let Ut=/^[0-9B]/.test(at),$t=at[0]==="B"?0:+at[0],Wt=(M[at]&&X.n===$t?M[at]:"")||(ut!==at&&ut!=="\uC2E4"?ut:"");vt={key:xt,id:at,f:X.n,cat:O,numbered:Ut,title:Ut?`${at}\uD638`:ut,name:Ut?Wt:"",catLabel:vg[O]||"",doors:[],center:null};let Pt=O==="toilet"&&/여|남/.exec(vt.title)?.[0],Bt=Pt?[`${Pt}\uC790\uD654\uC7A5\uC2E4`,`${Pt}\uC131\uD654\uC7A5\uC2E4`,`\uD654\uC7A5\uC2E4${Pt}\uC790`]:[];vt.search=[at,vt.title,Wt,...yg[O]||[],...Bt].map(Gi).join("|"),S.set(xt,vt)}H?vt.doors.push(C):vt.center=C};for(let at of X.doors)et(at.id,at.name,at.cat,at.p,!0);for(let at of X.rooms)et(at.id,at.name,at.cat,at.c,!1)}let D=[...S.values()].map(X=>({...X,doors:X.doors.length?X.doors:[X.center]}));for(let X of D){if(X.numbered)continue;if(D.filter(at=>at.f===X.f&&at.title===X.title).length>1){let at=X.doors[0];X.name=at[0]<0?"\uC11C\uCABD":"\uB3D9\uCABD"}}D.sort((X,et)=>X.f-et.f||Number(et.numbered)-Number(X.numbered)||X.id.localeCompare(et.id,"ko",{numeric:!0}));let B="",k=new Map;function K(X,et){let at=et.origin;if(!at)return 1/0;let ut=`${at.f}:${at.x}:${at.y}:${et.mode||"stairs"}`;if(ut!==B&&(B=ut,k.clear()),!k.has(X.key)){let O=At(at,X,{mode:et.mode||"stairs"});k.set(X.key,O?.len??1/0)}return k.get(X.key)}function st(X,et,at){if(!Number.isFinite(at.floor))return X.f-et.f;let ut=Math.abs(X.f-at.floor)-Math.abs(et.f-at.floor);if(ut)return ut;if(X.cat==="toilet"&&et.cat==="toilet"&&at.origin){let O=K(X,at),C=K(et,at);if(O!==C)return O-C}return X.f-et.f}function W(X,et=30,at={}){let ut=Gi(X);if(!ut)return[];let O=[];for(let C of D){let H=Gi(C.id),xt=0;H===ut?xt=100:H.startsWith(ut)?xt=80-(H.length-ut.length):Gi(C.title)===ut?xt=70:Gi(C.name).includes(ut)?xt=60:C.search.includes(ut)&&(xt=40),xt&&O.push([xt,C])}return O.sort((C,H)=>H[0]-C[0]||st(C[1],H[1],at)),O.slice(0,et).map(C=>C[1])}function Mt(X,et=5,at={}){let ut=Bf(Gi(X),D,O=>O.search.split("|"),D.length);return ut.length&&ut.every(O=>O.cat==="toilet")&&ut.sort((O,C)=>st(O,C,at)),ut.slice(0,et)}let j=X=>D.find(et=>et.key===X)||D.find(et=>Gi(et.id)===Gi(X))||null,It=.7;function Ft(X,et,at){let ut=e(X).rooms.filter(H=>H.id===at).map(H=>H.poly);if(!ut.length)return null;let O=null;for(let H of ut)for(let xt=1;xt<H.length;xt++){let vt=H[xt-1],Ut=H[xt],$t=Ut[0]-vt[0],I=Ut[1]-vt[1],Wt=$t*$t+I*I;if(Wt<1e-6)continue;let Pt=Math.max(0,Math.min(1,((et[0]-vt[0])*$t+(et[1]-vt[1])*I)/Wt)),Bt=Math.hypot(vt[0]+Pt*$t-et[0],vt[1]+Pt*I-et[1]);if(!O||Bt<O[0]){let Vt=Math.sqrt(Wt);O=[Bt,-I/Vt,$t/Vt]}}if(!O||O[0]>1)return null;let C=(H,xt)=>ut.some(vt=>Kl(vt,H,xt));for(let H of[1,-1]){let xt=O[1]*H,vt=O[2]*H;if(!C(et[0]+xt*.3,et[1]+vt*.3))for(let Ut of[It,.55,.9,1.1,.4]){let $t=et[0]+xt*Ut,I=et[1]+vt*Ut;if(n(X,$t,I)&&!C($t,I))return[$t,I]}}return null}function At(X,et,at={}){let ut=et.doors.map(H=>{let xt=Ft(et.f,H,et.id)||s(et.f,H[0],H[1],6)||H;return{f:et.f,x:xt[0],y:xt[1],door:H}}).filter(Boolean),O={...at,allowRooms:[et.id]},C=T(X,ut,O);if(C&&(at.mode||"stairs")==="stairs"&&C.stairFloors>=mg){let H=T(X,ut,{...O,mode:"elevator"});if(H&&H.stairFloors<C.stairFloors)return{...H,mode:"stairs",preferElev:!0}}return C}return{M:i,floors:t,FL:e,walk:n,nearest:s,roomAt:r,ramps:o,shafts:y,links:m,route:T,routeTo:At,destinations:D,search:W,suggest:Mt,findDest:j}}var Si,fg,dg,pg,mg,gg,_g,xg,yg,vg,Gi,ao=qe(()=>{kf();Si=3,fg=4,dg=4,pg=2e3,mg=3,gg=40,_g=3,xg=/^(\dC|\dS|\dW|\dE|\dK)-/,yg={toilet:["\uD654\uC7A5\uC2E4","toilet","wc","restroom"],elev:["\uC5D8\uB9AC\uBCA0\uC774\uD130","\uC2B9\uAC15\uAE30","elevator","ev"],prof:["\uAD50\uC218","\uAD50\uC218\uC2E4","\uAD50\uC218\uC5F0\uAD6C\uC2E4","\uC5F0\uAD6C\uC2E4"],lab:["\uC2E4\uC2B5\uC2E4","lab"],office:["\uC0AC\uBB34\uC2E4","\uD559\uACFC","\uACFC\uC0AC"],studio:["\uC2A4\uD29C\uB514\uC624"],server:["\uC11C\uBC84"],prep:["\uC900\uBE44\uC2E4"],store:["\uCC3D\uACE0"],room:["\uAC15\uC758\uC2E4","\uAD50\uC2E4"]},vg={toilet:"\uD654\uC7A5\uC2E4",elev:"\uC5D8\uB9AC\uBCA0\uC774\uD130",prof:"\uAD50\uC218\uC5F0\uAD6C\uC2E4",lab:"\uC2E4\uC2B5\uC2E4",office:"\uC0AC\uBB34\uC2E4",studio:"\uC2A4\uD29C\uB514\uC624",server:"\uC11C\uBC84\uC2E4",prep:"\uC900\uBE44\uC2E4",store:"\uCC3D\uACE0",room:"\uAC15\uC758\uC2E4"};Gi=i=>Ea(i).replace(/호$/,"")});function js(i,t){let e=t-i;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e}function Ta(i){let t=Math.abs(i),e=i>0?"left":"right",n=i>0?"\uC67C\uCABD":"\uC624\uB978\uCABD";return t<bg?{dir:"straight",word:"\uC9C1\uC9C4",side:""}:t>145?{dir:`u-${e}`,word:"\uB4A4\uB85C \uB3CC\uC544",side:"\uB4A4"}:t<60?{dir:`slight-${e}`,word:`${n} \uBC29\uD5A5\uC73C\uB85C`,side:n}:{dir:e,word:`${n}\uC73C\uB85C`,side:n}}function Js(i,t,e={}){let n=Wi(i),s=i.pts,r=n[n.length-1],o=y=>{let x=$e(i,n,Math.max(0,Math.min(r,y)));return[x.x,x.y]},a=(e.landmarks||[]).filter(y=>!t||y.key!==t.key);function c(y,x,T=3.5){let w=null;for(let A of a)if(!(A.f!==y||A.cat==="store"))for(let N of A.doors){let M=Math.hypot(N[0]-x[0],N[1]-x[1]),S=M-(A.numbered?.5:0);M<T&&(!w||S<w[0])&&(w=[S,A])}return w&&w[1]}let l=y=>[n[y.i0],n[y.i1]];function h(y,x){let T=o(Math.max(x,y-jl)),w=o(y);return Math.hypot(w[0]-T[0],w[1]-T[1])>.2?us(T,w):null}function u(y,x){let T=o(y),w=o(Math.min(x,y+jl));return Math.hypot(w[0]-T[0],w[1]-T[1])>.2?us(T,w):null}function f(y){if(y.kind==="stair"){let M=y.link.ramp.pts,S=y.up?M:[...M].reverse();return{inH:us(S[0],S[1]),outH:us(S[S.length-2],S[S.length-1]),p0:S[0]}}let x=y.link,T=y.up?x.pa:x.pb,w=y.up?x.qa:x.qb,A=y.up?x.pb:x.pa,N=y.up?x.qb:x.qa;return{inH:us(T,w),outH:us(N,A),p0:T}}let d=[],g=i.legs,_=null,m=null;g.forEach((y,x)=>{if(y.kind!=="walk"){let M=f(y),S=g[x-1],D="";if(S&&S.kind==="walk"){let[k,K]=l(S),st=h(K,k);st!=null&&(D=Ta(js(st,M.inH)).side)}let B=y.to>y.from;d.push({kind:y.kind,dir:y.kind==="elev"?"elev":B?"stair-up":"stair-down",f:y.from,to:y.to,at:M.p0,s:n[y.i0],side:D,id:y.id}),_=M.outH,m=y.kind;return}let[T,w]=l(y),A=[];for(let M=y.i0+1;M<y.i1;M++){let S=n[M],D=h(S,T),B=u(S,w);D==null||B==null||A.push({s:S,d:js(D,B)})}let N=[];for(let M of A){let S=N[N.length-1];S&&M.s-S.s1<Eg?(S.s1=M.s,S.d=js(h(S.s0,T)??0,u(M.s,w)??0)):N.push({s0:M.s,s1:M.s,d:M.d})}if(x===0)d.push({kind:"start",dir:"start",f:y.f,at:o(T),s:T});else if(_!=null){let M=u(T,w),S=Ta(M==null?0:js(_,M));d.push({kind:"walk",dir:S.dir,exit:m,word:S.word,f:y.f,at:o(T),s:T,h0:_,hOut:M})}for(let M of N){let S=Ta(M.d);if(S.dir==="straight")continue;let D=(M.s0+M.s1)/2;d.push({kind:"walk",dir:S.dir,word:S.word,f:y.f,at:o(D),s:D,hOut:u(M.s1,w)})}});for(let y=d.length-1;y>=2;y--){let x=d[y-2],T=d[y-1],w=d[y];x.kind==="stair"&&w.kind==="stair"&&x.dir===w.dir&&x.id===w.id&&T.kind==="walk"&&w.s-T.s<5&&(x.to=w.to,d.splice(y-1,2),y--)}let p=s[s.length-1],b="";if(t){let y=h(r,Math.max(0,r-jl)),x=i.target?.door||t.center;if(y!=null&&x&&Math.hypot(x[0]-p.x,x[1]-p.y)>.2){let T=js(y,us([p.x,p.y],x));b=Math.abs(T)<35?"\uC815\uBA74":Math.abs(T)>145?"\uB4A4\uCABD":T>0?"\uC67C\uCABD":"\uC624\uB978\uCABD"}}d.push({kind:"arrive",dir:"arrive",f:p.f,at:[p.x,p.y],s:r,side:b});for(let y=d.length-2;y>=1;y--){let x=d[y],T=d[y+1],w=d[y-1],A=T.s-x.s;if(x.kind==="walk"&&!x.exit&&A<2.5&&T.kind!=="walk"&&T.kind!=="start")d.splice(y,1);else if(w.kind==="walk"&&w.exit&&x.kind==="walk"&&!x.exit&&x.s-w.s<4.5){let N=Ta(x.hOut==null||w.h0==null?0:js(w.h0,x.hOut));Object.assign(x,{exit:w.exit,dir:N.dir,word:N.word,s:w.s,at:w.at}),d.splice(y-1,1)}}for(let y=0;y<d.length;y++){let x=d[y],T=d[y+1];x.dist=T?Math.max(0,T.s-x.s):0;let w=x.kind==="walk"&&!x.exit?c(x.f,x.at):null,A=T&&x.kind==="start"&&T.kind!=="arrive"?c(T.f,T.at,4):null;if(x.kind==="start")x.action="\uC9C1\uC9C4",x.text=`${A?`${A.title} \uCABD\uC73C\uB85C `:""}${Jl(x.dist)} \uC9C1\uC9C4`,x.sub="\uCD9C\uBC1C";else if(x.kind==="walk"){let N=x.exit?x.exit==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130\uC5D0\uC11C \uB0B4\uB824 ":"\uACC4\uB2E8\uC5D0\uC11C \uB098\uC640 ":w?`${w.title} \uC55E\uC5D0\uC11C `:"";x.action=x.word,x.text=x.dir==="straight"?`${N}${Jl(x.dist)} \uC9C1\uC9C4`:`${N}${x.word} ${Jl(x.dist)}`,x.sub=""}else if(x.kind==="stair"){let N=x.dir==="stair-up"?"\uC62C\uB77C\uAC00\uAE30":"\uB0B4\uB824\uAC00\uAE30";x.action=`\uACC4\uB2E8\uC73C\uB85C ${ze(x.to)}`,x.text=`${x.side&&x.side!=="\uB4A4"?`${x.side}\uC5D0 \uC788\uB294 `:x.side==="\uB4A4"?"\uB4A4\uCABD ":""}\uACC4\uB2E8\uC73C\uB85C ${ze(x.to)}\uAE4C\uC9C0 ${N}`,x.sub=`${Math.abs(x.to-x.f)}\uAC1C \uCE35 ${x.dir==="stair-up"?"\uC704":"\uC544\uB798"}`}else x.kind==="elev"?(x.action=`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C ${ze(x.to)}`,x.text=`${x.side&&x.side!=="\uB4A4"?`${x.side} `:""}\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${ze(x.to)}\uC73C\uB85C`,x.sub=`${x.to===0?"B1":x.to}\uCE35 \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`):(x.action="\uB3C4\uCC29",x.text=`${t?t.title:"\uBAA9\uC801\uC9C0"} \uB3C4\uCC29${x.side?` \xB7 ${x.side}`:""}`,x.sub=t&&t.name?t.name:"")}return d}function Wi(i){let t=[0],e=i.pts;for(let n=1;n<e.length;n++){let s=e[n-1],r=e[n];t.push(t[n-1]+(s.kind==="elev"&&r.kind==="elev"?0:Math.hypot(r.x-s.x,r.y-s.y)))}return t}function wa(i,t,e,n=0){let s=i.pts,r={d:1/0};for(let a=0;a<s.length-1;a++){let c=s[a],l=s[a+1];if(c.kind==="elev"&&l.kind==="elev"||c.f!==e.f&&l.f!==e.f)continue;let h=l.x-c.x,u=l.y-c.y,f=h*h+u*u||1e-9,d=Math.max(0,Math.min(1,((e.x-c.x)*h+(e.y-c.y)*u)/f)),g=Math.hypot(e.x-c.x-h*d,e.y-c.y-u*d),_=t[a]+d*(t[a+1]-t[a]),m=g+(_<n-3?2:0);(m<r.score||r.d===1/0)&&(r={d:g,s:_,i:a,t:d,score:m})}if(r.d===1/0)return null;let o=t[t.length-1];return{off:r.d,s:r.s,seg:r.i,remain:Math.max(0,o-r.s),total:o}}function co(i,t,e,n){for(let s=1;s<i.length;s++)if(i[s].s>n+.8)return{step:i[s],index:s,dist:i[s].s-n};return{step:i[i.length-1],index:i.length-1,dist:0}}function Ql(i,t){let e=0;for(let n=0;n<i.length;n++)i[n].s<=t+.8&&(e=n);return e}function $e(i,t,e){let n=i.pts;for(let r=0;r<n.length-1;r++)if(t[r+1]>=e){let o=t[r+1]-t[r],a=o>0?(e-t[r])/o:1,c=n[r],l=n[r+1];return{x:c.x+(l.x-c.x)*a,y:c.y+(l.y-c.y)*a,z:c.z+(l.z-c.z)*a,f:a<.5?c.f:l.f,i:r}}return{...n[n.length-1],i:n.length-1}}function Aa(i){let t=i/1.2;return t<60?`${Math.max(10,Math.round(t/10)*10)}\uCD08`:`${Math.round(t/60)}\uBD84`}var bg,jl,Eg,Tg,us,Jl,th=qe(()=>{ao();bg=35,jl=3,Eg=3,Tg=180/Math.PI,us=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*Tg;Jl=i=>`${Math.max(1,Math.round(i))}m`});function zn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]+"-"+dn[t&255]+dn[t>>8&255]+"-"+dn[t>>16&15|64]+dn[t>>24&255]+"-"+dn[e&63|128]+dn[e>>8&255]+"-"+dn[e>>16&255]+dn[e>>24&255]+dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]).toLowerCase()}function le(i,t,e){return Math.max(t,Math.min(e,i))}function hu(i,t){return(i%t+t)%t}function wg(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ag(i,t,e){return i!==t?(e-i)/(t-i):0}function So(i,t,e){return(1-e)*i+e*t}function Rg(i,t,e,n){return So(i,t,1-Math.exp(-e*n))}function Cg(i,t=1){return t-Math.abs(hu(i,t*2)-t)}function Ig(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Pg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Lg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Dg(i,t){return i+Math.random()*(t-i)}function Ng(i){return i*(.5-Math.random())}function Ug(i){i!==void 0&&(Hf=i);let t=Hf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fg(i){return i*_r}function Og(i){return i*Ms}function Bg(i){return(i&i-1)===0&&i!==0}function kg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function zg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Hg(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}function uu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yp(){let i=Sr("canvas");return i.style.display="block",i}function br(i){i in Gf||(Gf[i]=!0,console.warn(i))}function vp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Vg(){let i={enabled:!0,workingColorSpace:cn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Re&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Re&&(s.r=xr(s.r),s.g=xr(s.g),s.b=xr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ki?To:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return br("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return br("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[cn]:{primaries:t,whitePoint:n,transfer:To,toXYZ:Wf,fromXYZ:Xf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:t,whitePoint:n,transfer:Re,toXYZ:Wf,fromXYZ:Xf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}}),i}function Ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function xr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function ih(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?uc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function rh(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ds.fromArray(i,r);let a=s.x*Math.abs(ds.x)+s.y*Math.abs(ds.y)+s.z*Math.abs(ds.z),c=t.dot(ds),l=e.dot(ds),h=n.dot(ds);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}function xh(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}function e0(i,t,e,n,s,r,o,a){let c;if(t.side===ln?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===ei,a),c===null)return null;Va.copy(a),Va.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Va);return l<e.near||l>e.far?null:{distance:l,point:Va.clone(),object:i}}function Ga(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Ba),i.getVertexPosition(c,ka),i.getVertexPosition(l,za);let h=e0(i,t,e,n,Ba,ka,za,nd);if(h){let u=new P;ai.getBarycoord(nd,Ba,ka,za,u),s&&(h.uv=ai.getInterpolatedAttribute(s,a,c,l,u,new Ct)),r&&(h.uv1=ai.getInterpolatedAttribute(r,a,c,l,u,new Ct)),o&&(h.normal=ai.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new P,materialIndex:0};ai.getNormal(Ba,ka,za,f.normal),h.face=f,h.barycoord=u}return h}function ks(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function _n(i){let t={};for(let e=0;e<i.length;e++){let n=ks(i[e]);for(let s in n)t[s]=n[s]}return t}function n0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function fu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:xe.workingColorSpace}function qa(i,t,e,n,s,r){pr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(mo.x=r*pr.x-s*pr.y,mo.y=s*pr.x+r*pr.y):mo.copy(pr),i.copy(t),i.x+=mo.x,i.y+=mo.y,i.applyMatrix4(bp)}function ja(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(gc.fromBufferAttribute(a,s),_c.fromBufferAttribute(a,r),e.distanceSqToSegment(gc,_c,Th,gd)>n)return;Th.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Th);if(!(l<t.near||l>t.far))return{distance:l,point:gd.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}function vd(i,t,e,n,s,r,o){let a=Bh.distanceSqToPoint(i);if(a<e){let c=new P;Bh.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}function du(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}function Md(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function f0(i,t){let e=1-i;return e*e*t}function d0(i,t){return 2*(1-i)*i*t}function p0(i,t){return i*i*t}function bo(i,t,e,n){return f0(i,t)+d0(i,e)+p0(i,n)}function m0(i,t){let e=1-i;return e*e*e*t}function g0(i,t){let e=1-i;return 3*e*e*i*t}function _0(i,t){return 3*(1-i)*i*i*t}function x0(i,t){return i*i*i*t}function Eo(i,t,e,n,s){return m0(i,t)+g0(i,e)+_0(i,n)+x0(i,s)}function y0(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Ep(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=E0(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){let d=i[f],g=i[f+1];d<a&&(a=d),g<c&&(c=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Yo(r,o,e,a,c,l,0),o}function Ep(i,t,e,n,s){let r;if(s===U0(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=bd(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=bd(o/n|0,i[o],i[o+1],r);return r&&Dr(r,r.next)&&(Zo(r),r=r.next),r}function ws(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Dr(e,e.next)||We(e.prev,e,e.next)===0)){if(Zo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Yo(i,t,e,n,s,r,o){if(!i)return;!o&&r&&C0(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?M0(i,n,s,r):v0(i)){t.push(c.i,i.i,l.i),Zo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=S0(ws(i),t),Yo(i,t,e,n,s,r,2)):o===2&&b0(i,t,e,n,s,r):Yo(ws(i),t,e,n,s,r,1);break}}}function v0(i){let t=i.prev,e=i,n=i.next;if(We(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Mo(s,a,r,c,o,l,g.x,g.y)&&We(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function M0(i,t,e,n){let s=i.prev,r=i,o=i.next;if(We(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),g=Math.min(h,u,f),_=Math.max(a,c,l),m=Math.max(h,u,f),p=kh(d,g,t,e,n),b=kh(_,m,t,e,n),y=i.prevZ,x=i.nextZ;for(;y&&y.z>=p&&x&&x.z<=b;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Mo(a,h,c,u,l,f,y.x,y.y)&&We(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Mo(a,h,c,u,l,f,x.x,x.y)&&We(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Mo(a,h,c,u,l,f,y.x,y.y)&&We(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=b;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Mo(a,h,c,u,l,f,x.x,x.y)&&We(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function S0(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Dr(n,s)&&wp(n,e,e.next,s)&&$o(n,s)&&$o(s,n)&&(t.push(n.i,e.i,s.i),Zo(e),Zo(e.next),e=i=s),e=e.next}while(e!==i);return ws(e)}function b0(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&L0(o,a)){let c=Ap(o,a);o=ws(o,o.next),c=ws(c,c.next),Yo(o,t,e,n,s,r,0),Yo(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function E0(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Ep(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(P0(l))}s.sort(T0);for(let r=0;r<s.length;r++)e=w0(s[r],e);return e}function T0(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function w0(i,t){let e=A0(i,t);if(!e)return t;let n=Ap(e,i);return ws(n,n.next),ws(e,e.next)}function A0(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Dr(i,e))return e;do{if(Dr(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Tp(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);$o(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&R0(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function R0(i,t){return We(i.prev,i,t.prev)<0&&We(t.next,i,i.next)<0}function C0(i,t,e,n){let s=i;do s.z===0&&(s.z=kh(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,I0(s)}function I0(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function kh(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function P0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Tp(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Mo(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Tp(i,t,e,n,s,r,o,a)}function L0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!D0(i,t)&&($o(i,t)&&$o(t,i)&&N0(i,t)&&(We(i.prev,i,t.prev)||We(i,t.prev,t))||Dr(i,t)&&We(i.prev,i,i.next)>0&&We(t.prev,t,t.next)>0)}function We(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Dr(i,t){return i.x===t.x&&i.y===t.y}function wp(i,t,e,n){let s=rc(We(i,t,e)),r=rc(We(i,t,n)),o=rc(We(e,n,i)),a=rc(We(e,n,t));return!!(s!==r&&o!==a||s===0&&sc(i,e,t)||r===0&&sc(i,n,t)||o===0&&sc(e,i,n)||a===0&&sc(e,t,n))}function sc(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function rc(i){return i>0?1:i<0?-1:0}function D0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&wp(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function $o(i,t){return We(i.prev,i,i.next)<0?We(i,t,i.next)>=0&&We(i,i.prev,t)>=0:We(i,t,i.prev)<0||We(i,i.next,t)<0}function N0(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Ap(i,t){let e=zh(i.i,i.x,i.y),n=zh(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function bd(i,t,e,n){let s=zh(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Zo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function zh(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function U0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}function Ed(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Td(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}function F0(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}function oc(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function O0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function B0(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function wd(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=i[a+c]}return s}function Rp(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}function k0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return di;case"vector":case"vector2":case"vector3":case"vector4":return mi;case"color":return Ko;case"quaternion":return pi;case"bool":case"boolean":return Di;case"string":return Ni}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function z0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=k0(i.type);if(i.times===void 0){let e=[],n=[];Rp(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}function Pd(i,t){return i.distance-t.distance}function Yh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Yh(r[o],t,e,!0)}}function gu(i,t,e,n){let s=Z0(n);switch(e){case su:return i*t;case $c:return i*t/s.components*s.byteLength;case Zc:return i*t/s.components*s.byteLength;case ou:return i*t*2/s.components*s.byteLength;case Kc:return i*t*2/s.components*s.byteLength;case ru:return i*t*3/s.components*s.byteLength;case Un:return i*t*4/s.components*s.byteLength;case jc:return i*t*4/s.components*s.byteLength;case ra:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case aa:case ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qc:case el:return Math.max(i,16)*Math.max(t,8)/4;case Jc:case tl:return Math.max(i,8)*Math.max(t,8)/2;case nl:case il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ol:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case cl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ll:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ul:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case fl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case dl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case pl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ml:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _l:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case yl:case vl:case Ml:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Sl:case bl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case El:case Tl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Z0(i){switch(i){case si:case tu:return{byteLength:1,components:1};case Or:case eu:case Br:return{byteLength:2,components:1};case qc:case Yc:return{byteLength:2,components:4};case is:case Xc:case Xn:return{byteLength:4,components:1};case nu:case iu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var Wn,Rn,Ld,$h,Dd,Zh,Nd,_i,ei,ln,Se,Oi,_s,Kh,jh,Jh,Ud,ji,Fd,Od,Bd,kd,zd,Hd,Vd,Gd,cc,lc,Wd,Xd,qd,Yd,$d,Zd,Kd,jd,Jd,Dc,Nc,Uc,xs,Fc,Oc,Bc,kc,zc,Qd,tp,Bi,ep,np,ip,sp,rp,op,Hc,Dh,ap,Qh,Us,Fs,Vc,Gc,sa,Hn,ci,vr,an,Wc,Os,vn,Fr,ii,si,tu,eu,Or,Xc,is,Xn,Br,qc,Yc,kr,nu,iu,su,ru,Un,Mr,zr,$c,Zc,ou,Kc,jc,ra,oa,aa,ca,Jc,Qc,tl,el,nl,il,sl,rl,ol,al,cl,ll,hl,ul,fl,dl,pl,ml,gl,_l,xl,yl,vl,Ml,Sl,bl,El,Tl,ys,vs,ac,Nh,Uh,Fh,cp,au,la,Hr,lp,hp,wl,up,ki,ke,cn,To,Re,gs,Oh,fp,dp,pp,cu,mp,gp,_p,xp,hc,lu,ti,wo,hi,dn,Hf,_r,Ms,Bs,Ct,Mn,P,eh,Vf,ce,nh,Gf,Wf,Xf,xe,Qs,uc,Gg,Er,Wg,sh,tn,Te,fc,Vn,Ao,dc,Sn,bi,Kn,Ra,tr,er,nr,Xi,qi,fs,lo,Ca,Ia,ds,Xg,ho,oh,Tn,Ei,ah,Pa,Yi,ch,La,lh,ui,ie,ir,jn,qg,Yg,$i,Da,Pn,qf,Yf,Gn,Tr,$g,$f,sr,Ti,Na,uo,Zg,Kg,Zf,Kf,jf,Jf,jg,rr,hh,Ce,Jn,wi,uh,Ai,or,ar,Qf,fh,dh,ph,mh,gh,_h,ai,Mp,Zi,Ua,ee,pn,Jg,mn,we,Je,Fa,Qg,Fe,Ro,Co,ve,t0,kn,yh,cr,Ln,fo,rn,Pe,td,ps,Oa,ed,Ba,ka,za,vh,Ha,nd,Va,se,Ji,Sp,i0,s0,Dn,Io,Ki,id,sd,Ge,lr,hr,pc,Po,mc,Ye,r0,wr,ni,Ss,yn,Qi,Ar,ur,po,fr,dr,pr,mo,bp,Wa,go,Xa,rd,Mh,od,Lo,ad,cd,ld,o0,hd,Ya,Sh,ud,bh,Do,Rr,No,fd,a0,Uo,ts,mr,dd,$a,pd,c0,_o,xo,bs,Eh,l0,h0,En,ms,u0,Za,Cr,es,gc,_c,md,yo,Ka,Th,gd,Es,_d,xd,Ts,Fo,Ir,yd,Bh,Ja,Qa,Oo,Ii,Bo,ko,fi,Pr,zo,tc,ec,wh,nc,Ho,Nn,Lr,xc,ic,Ah,Rh,Ch,yc,Vo,vc,Go,Mc,Wo,Sc,Xo,Sd,bc,qo,ns,Hh,yr,As,Rs,Cs,Is,gn,wn,Pi,Ec,Tc,Li,wc,Ac,Rc,An,Di,Ko,di,Cc,pi,Ni,mi,jo,li,Ic,Cp,gi,Ri,Vh,Nr,gr,Pc,Jo,Ps,Ls,Ih,Ad,Rd,Qo,Gh,ta,Cd,vo,Ph,Wh,Ds,Ui,Xh,Ns,Fi,Lh,ea,Lc,pu,H0,mu,V0,G0,W0,X0,q0,Y0,$0,qh,Ue,ES,Id,na,Ur,ia,_u=qe(()=>{Wn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Rn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ld=0,$h=1,Dd=2,Zh=1,Nd=2,_i=3,ei=0,ln=1,Se=2,Oi=0,_s=1,Kh=2,jh=3,Jh=4,Ud=5,ji=100,Fd=101,Od=102,Bd=103,kd=104,zd=200,Hd=201,Vd=202,Gd=203,cc=204,lc=205,Wd=206,Xd=207,qd=208,Yd=209,$d=210,Zd=211,Kd=212,jd=213,Jd=214,Dc=0,Nc=1,Uc=2,xs=3,Fc=4,Oc=5,Bc=6,kc=7,zc=0,Qd=1,tp=2,Bi=0,ep=1,np=2,ip=3,sp=4,rp=5,op=6,Hc=7,Dh="attached",ap="detached",Qh=300,Us=301,Fs=302,Vc=303,Gc=304,sa=306,Hn=1e3,ci=1001,vr=1002,an=1003,Wc=1004,Os=1005,vn=1006,Fr=1007,ii=1008,si=1009,tu=1010,eu=1011,Or=1012,Xc=1013,is=1014,Xn=1015,Br=1016,qc=1017,Yc=1018,kr=1020,nu=35902,iu=35899,su=1021,ru=1022,Un=1023,Mr=1026,zr=1027,$c=1028,Zc=1029,ou=1030,Kc=1031,jc=1033,ra=33776,oa=33777,aa=33778,ca=33779,Jc=35840,Qc=35841,tl=35842,el=35843,nl=36196,il=37492,sl=37496,rl=37808,ol=37809,al=37810,cl=37811,ll=37812,hl=37813,ul=37814,fl=37815,dl=37816,pl=37817,ml=37818,gl=37819,_l=37820,xl=37821,yl=36492,vl=36494,Ml=36495,Sl=36283,bl=36284,El=36285,Tl=36286,ys=2300,vs=2301,ac=2302,Nh=2400,Uh=2401,Fh=2402,cp=2500,au=0,la=1,Hr=2,lp=3200,hp=3201,wl=0,up=1,ki="",ke="srgb",cn="srgb-linear",To="linear",Re="srgb",gs=7680,Oh=519,fp=512,dp=513,pp=514,cu=515,mp=516,gp=517,_p=518,xp=519,hc=35044,lu="300 es",ti=2e3,wo=2001,hi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hf=1234567,_r=Math.PI/180,Ms=180/Math.PI;Bs={DEG2RAD:_r,RAD2DEG:Ms,generateUUID:zn,clamp:le,euclideanModulo:hu,mapLinear:wg,inverseLerp:Ag,lerp:So,damp:Rg,pingpong:Cg,smoothstep:Ig,smootherstep:Pg,randInt:Lg,randFloat:Dg,randFloatSpread:Ng,seededRandom:Ug,degToRad:Fg,radToDeg:Og,isPowerOfTwo:Bg,ceilPowerOfTwo:kg,floorPowerOfTwo:zg,setQuaternionFromProperEuler:Hg,normalize:Ae,denormalize:Qn},Ct=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Mn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a,p=c*f+l*d+h*g+u*_,b=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let T=Math.sqrt(y),w=Math.atan2(T,p*b);m=Math.sin(m*w)/T,a=Math.sin(a*w)/T}let x=a*b;if(c=c*m+f*x,l=l*m+d*x,h=h*m+g*x,u=u*m+_*x,m===1-a){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(le(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this.z=le(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this.z=le(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return eh.copy(this).projectOnVector(t),this.sub(eh)}reflect(t){return this.sub(eh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},eh=new P,Vf=new Mn,ce=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],b=s[1],y=s[4],x=s[7],T=s[2],w=s[5],A=s[8];return r[0]=o*_+a*b+c*T,r[3]=o*m+a*y+c*w,r[6]=o*p+a*x+c*A,r[1]=l*_+h*b+u*T,r[4]=l*m+h*y+u*w,r[7]=l*p+h*x+u*A,r[2]=f*_+d*b+g*T,r[5]=f*m+d*y+g*w,r[8]=f*p+d*x+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(nh.makeScale(t,e)),this}rotate(t){return this.premultiply(nh.makeRotation(-t)),this}translate(t,e){return this.premultiply(nh.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},nh=new ce;Gf={};Wf=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xf=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);xe=Vg();uc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Qs===void 0&&(Qs=Sr("canvas")),Qs.width=t.width,Qs.height=t.height;let s=Qs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Qs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Sr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ci(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ci(e[n]/255)*255):e[n]=Ci(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Gg=0,Er=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=zn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ih(s[o].image)):r.push(ih(s[o]))}else r=ih(s);n.url=r}return e||(t.images[this.uuid]=n),n}};Wg=0,sh=new P,tn=class i extends hi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ci,s=ci,r=vn,o=ii,a=Un,c=si,l=i.DEFAULT_ANISOTROPY,h=ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=zn(),this.name="",this.source=new Er(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(sh).x}get height(){return this.source.getSize(sh).y}get depth(){return this.source.getSize(sh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Qh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hn:t.x=t.x-Math.floor(t.x);break;case ci:t.x=t.x<0?0:1;break;case vr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hn:t.y=t.y-Math.floor(t.y);break;case ci:t.y=t.y<0?0:1;break;case vr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=Qh;tn.DEFAULT_ANISOTROPY=1;Te=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,x=(d+1)/2,T=(p+1)/2,w=(h+f)/4,A=(u+_)/4,N=(g+m)/4;return y>x&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=A/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=N/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=A/r,s=N/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(f-h)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this.z=le(this.z,t.z,e.z),this.w=le(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this.z=le(this.z,t,e),this.w=le(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fc=class extends hi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new tn(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Er(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends fc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ao=class extends tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},dc=class extends tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Sn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Kn):Kn.fromBufferAttribute(r,o),Kn.applyMatrix4(t.matrixWorld),this.expandByPoint(Kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ra.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ra.copy(n.boundingBox)),Ra.applyMatrix4(t.matrixWorld),this.union(Ra)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Kn),Kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(lo),Ca.subVectors(this.max,lo),tr.subVectors(t.a,lo),er.subVectors(t.b,lo),nr.subVectors(t.c,lo),Xi.subVectors(er,tr),qi.subVectors(nr,er),fs.subVectors(tr,nr);let e=[0,-Xi.z,Xi.y,0,-qi.z,qi.y,0,-fs.z,fs.y,Xi.z,0,-Xi.x,qi.z,0,-qi.x,fs.z,0,-fs.x,-Xi.y,Xi.x,0,-qi.y,qi.x,0,-fs.y,fs.x,0];return!rh(e,tr,er,nr,Ca)||(e=[1,0,0,0,1,0,0,0,1],!rh(e,tr,er,nr,Ca))?!1:(Ia.crossVectors(Xi,qi),e=[Ia.x,Ia.y,Ia.z],rh(e,tr,er,nr,Ca))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},bi=[new P,new P,new P,new P,new P,new P,new P,new P],Kn=new P,Ra=new Sn,tr=new P,er=new P,nr=new P,Xi=new P,qi=new P,fs=new P,lo=new P,Ca=new P,Ia=new P,ds=new P;Xg=new Sn,ho=new P,oh=new P,Tn=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Xg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ho.subVectors(t,this.center);let e=ho.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ho,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ho.copy(t.center).add(oh)),this.expandByPoint(ho.copy(t.center).sub(oh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Ei=new P,ah=new P,Pa=new P,Yi=new P,ch=new P,La=new P,lh=new P,ui=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ei)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ei.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ei.copy(this.origin).addScaledVector(this.direction,e),Ei.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ah.copy(t).add(e).multiplyScalar(.5),Pa.copy(e).sub(t).normalize(),Yi.copy(this.origin).sub(ah);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Pa),a=Yi.dot(this.direction),c=-Yi.dot(Pa),l=Yi.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ah).addScaledVector(Pa,f),d}intersectSphere(t,e){Ei.subVectors(t.center,this.origin);let n=Ei.dot(this.direction),s=Ei.dot(Ei)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ei)!==null}intersectTriangle(t,e,n,s,r){ch.subVectors(e,t),La.subVectors(n,t),lh.crossVectors(ch,La);let o=this.direction.dot(lh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yi.subVectors(this.origin,t);let c=a*this.direction.dot(La.crossVectors(Yi,La));if(c<0)return null;let l=a*this.direction.dot(ch.cross(Yi));if(l<0||c+l>o)return null;let h=-a*Yi.dot(lh);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ir.setFromMatrixColumn(t,0).length(),r=1/ir.setFromMatrixColumn(t,1).length(),o=1/ir.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){let f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(qg,t,Yg)}lookAt(t,e,n){let s=this.elements;return Pn.subVectors(t,e),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),$i.crossVectors(n,Pn),$i.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),$i.crossVectors(n,Pn)),$i.normalize(),Da.crossVectors(Pn,$i),s[0]=$i.x,s[4]=Da.x,s[8]=Pn.x,s[1]=$i.y,s[5]=Da.y,s[9]=Pn.y,s[2]=$i.z,s[6]=Da.z,s[10]=Pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],y=n[7],x=n[11],T=n[15],w=s[0],A=s[4],N=s[8],M=s[12],S=s[1],D=s[5],B=s[9],k=s[13],K=s[2],st=s[6],W=s[10],Mt=s[14],j=s[3],It=s[7],Ft=s[11],At=s[15];return r[0]=o*w+a*S+c*K+l*j,r[4]=o*A+a*D+c*st+l*It,r[8]=o*N+a*B+c*W+l*Ft,r[12]=o*M+a*k+c*Mt+l*At,r[1]=h*w+u*S+f*K+d*j,r[5]=h*A+u*D+f*st+d*It,r[9]=h*N+u*B+f*W+d*Ft,r[13]=h*M+u*k+f*Mt+d*At,r[2]=g*w+_*S+m*K+p*j,r[6]=g*A+_*D+m*st+p*It,r[10]=g*N+_*B+m*W+p*Ft,r[14]=g*M+_*k+m*Mt+p*At,r[3]=b*w+y*S+x*K+T*j,r[7]=b*A+y*D+x*st+T*It,r[11]=b*N+y*B+x*W+T*Ft,r[15]=b*M+y*k+x*Mt+T*At,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,y=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,x=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,T=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,w=e*b+n*y+s*x+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return t[0]=b*A,t[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*A,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*A,t[4]=y*A,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*A,t[8]=x*A,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*A,t[12]=T*A,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,b=c*l,y=c*h,x=c*u,T=n.x,w=n.y,A=n.z;return s[0]=(1-(_+p))*T,s[1]=(d+x)*T,s[2]=(g-y)*T,s[3]=0,s[4]=(d-x)*w,s[5]=(1-(f+p))*w,s[6]=(m+b)*w,s[7]=0,s[8]=(g+y)*A,s[9]=(m-b)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ir.set(s[0],s[1],s[2]).length(),o=ir.set(s[4],s[5],s[6]).length(),a=ir.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],jn.copy(this);let l=1/r,h=1/o,u=1/a;return jn.elements[0]*=l,jn.elements[1]*=l,jn.elements[2]*=l,jn.elements[4]*=h,jn.elements[5]*=h,jn.elements[6]*=h,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,e.setFromRotationMatrix(jn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ti,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===ti)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===wo)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ti,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===ti)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===wo)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ir=new P,jn=new ie,qg=new P(0,0,0),Yg=new P(1,1,1),$i=new P,Da=new P,Pn=new P,qf=new ie,Yf=new Mn,Gn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(le(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-le(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yf.setFromEuler(this),this.setFromQuaternion(Yf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gn.DEFAULT_ORDER="XYZ";Tr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},$g=0,$f=new P,sr=new Mn,Ti=new ie,Na=new P,uo=new P,Zg=new P,Kg=new Mn,Zf=new P(1,0,0),Kf=new P(0,1,0),jf=new P(0,0,1),Jf={type:"added"},jg={type:"removed"},rr={type:"childadded",child:null},hh={type:"childremoved",child:null},Ce=class i extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new Gn,n=new Mn,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new ce}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return sr.setFromAxisAngle(t,e),this.quaternion.multiply(sr),this}rotateOnWorldAxis(t,e){return sr.setFromAxisAngle(t,e),this.quaternion.premultiply(sr),this}rotateX(t){return this.rotateOnAxis(Zf,t)}rotateY(t){return this.rotateOnAxis(Kf,t)}rotateZ(t){return this.rotateOnAxis(jf,t)}translateOnAxis(t,e){return $f.copy(t).applyQuaternion(this.quaternion),this.position.add($f.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zf,t)}translateY(t){return this.translateOnAxis(Kf,t)}translateZ(t){return this.translateOnAxis(jf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Na.copy(t):Na.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(uo,Na,this.up):Ti.lookAt(Na,uo,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),sr.setFromRotationMatrix(Ti),this.quaternion.premultiply(sr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jf),rr.child=t,this.dispatchEvent(rr),rr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(jg),hh.child=t,this.dispatchEvent(hh),hh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jf),rr.child=t,this.dispatchEvent(rr),rr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,t,Zg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,Kg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ce.DEFAULT_UP=new P(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Jn=new P,wi=new P,uh=new P,Ai=new P,or=new P,ar=new P,Qf=new P,fh=new P,dh=new P,ph=new P,mh=new Te,gh=new Te,_h=new Te,ai=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Jn.subVectors(t,e),s.cross(Jn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Jn.subVectors(s,e),wi.subVectors(n,e),uh.subVectors(t,e);let o=Jn.dot(Jn),a=Jn.dot(wi),c=Jn.dot(uh),l=wi.dot(wi),h=wi.dot(uh),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ai.x),c.addScaledVector(o,Ai.y),c.addScaledVector(a,Ai.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return mh.setScalar(0),gh.setScalar(0),_h.setScalar(0),mh.fromBufferAttribute(t,e),gh.fromBufferAttribute(t,n),_h.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(mh,r.x),o.addScaledVector(gh,r.y),o.addScaledVector(_h,r.z),o}static isFrontFacing(t,e,n,s){return Jn.subVectors(n,e),wi.subVectors(t,e),Jn.cross(wi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Jn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Jn.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;or.subVectors(s,n),ar.subVectors(r,n),fh.subVectors(t,n);let c=or.dot(fh),l=ar.dot(fh);if(c<=0&&l<=0)return e.copy(n);dh.subVectors(t,s);let h=or.dot(dh),u=ar.dot(dh);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(or,o);ph.subVectors(t,r);let d=or.dot(ph),g=ar.dot(ph);if(g>=0&&d<=g)return e.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ar,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Qf.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Qf,a);let p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(or,o).addScaledVector(ar,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Mp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Ua={h:0,s:0,l:0};ee=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,xe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=xe.workingColorSpace){return this.r=t,this.g=e,this.b=n,xe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=xe.workingColorSpace){if(t=hu(t,1),e=le(e,0,1),n=le(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=xh(o,r,t+1/3),this.g=xh(o,r,t),this.b=xh(o,r,t-1/3)}return xe.colorSpaceToWorking(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){let n=Mp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=xr(t.r),this.g=xr(t.g),this.b=xr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return xe.workingToColorSpace(pn.copy(this),t),Math.round(le(pn.r*255,0,255))*65536+Math.round(le(pn.g*255,0,255))*256+Math.round(le(pn.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xe.workingColorSpace){xe.workingToColorSpace(pn.copy(this),e);let n=pn.r,s=pn.g,r=pn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=xe.workingColorSpace){return xe.workingToColorSpace(pn.copy(this),e),t.r=pn.r,t.g=pn.g,t.b=pn.b,t}getStyle(t=ke){xe.workingToColorSpace(pn.copy(this),t);let e=pn.r,n=pn.g,s=pn.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+e,Zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zi),t.getHSL(Ua);let n=So(Zi.h,Ua.h,e),s=So(Zi.s,Ua.s,e),r=So(Zi.l,Ua.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},pn=new ee;ee.NAMES=Mp;Jg=0,mn=class extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=zn(),this.name="",this.type="Material",this.blending=_s,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cc,this.blendDst=lc,this.blendEquation=ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gs,this.stencilZFail=gs,this.stencilZPass=gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_s&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==cc&&(n.blendSrc=this.blendSrc),this.blendDst!==lc&&(n.blendDst=this.blendDst),this.blendEquation!==ji&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},we=class extends mn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Je=new P,Fa=new Ct,Qg=0,Fe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=hc,this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fa.fromBufferAttribute(this,e),Fa.applyMatrix3(t),this.setXY(e,Fa.x,Fa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix3(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix4(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyNormalMatrix(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.transformDirection(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Qn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Qn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Qn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Qn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hc&&(t.usage=this.usage),t}},Ro=class extends Fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}},Co=class extends Fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}},ve=class extends Fe{constructor(t,e,n){super(new Float32Array(t),e,n)}},t0=0,kn=new ie,yh=new Ce,cr=new P,Ln=new Sn,fo=new Sn,rn=new P,Pe=class i extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(uu(t)?Co:Ro)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ce().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return kn.makeRotationFromQuaternion(t),this.applyMatrix4(kn),this}rotateX(t){return kn.makeRotationX(t),this.applyMatrix4(kn),this}rotateY(t){return kn.makeRotationY(t),this.applyMatrix4(kn),this}rotateZ(t){return kn.makeRotationZ(t),this.applyMatrix4(kn),this}translate(t,e,n){return kn.makeTranslation(t,e,n),this.applyMatrix4(kn),this}scale(t,e,n){return kn.makeScale(t,e,n),this.applyMatrix4(kn),this}lookAt(t){return yh.lookAt(t),yh.updateMatrix(),this.applyMatrix4(yh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cr).negate(),this.translate(cr.x,cr.y,cr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ve(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];fo.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(Ln.min,fo.min),Ln.expandByPoint(rn),rn.addVectors(Ln.max,fo.max),Ln.expandByPoint(rn)):(Ln.expandByPoint(fo.min),Ln.expandByPoint(fo.max))}Ln.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)rn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(rn));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)rn.fromBufferAttribute(a,l),c&&(cr.fromBufferAttribute(t,l),rn.add(cr)),s=Math.max(s,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new P,c[N]=new P;let l=new P,h=new P,u=new P,f=new Ct,d=new Ct,g=new Ct,_=new P,m=new P;function p(N,M,S){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,N),d.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),d.sub(f),g.sub(f);let D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(D),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),a[N].add(_),a[M].add(_),a[S].add(_),c[N].add(m),c[M].add(m),c[S].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let N=0,M=b.length;N<M;++N){let S=b[N],D=S.start,B=S.count;for(let k=D,K=D+B;k<K;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let y=new P,x=new P,T=new P,w=new P;function A(N){T.fromBufferAttribute(s,N),w.copy(T);let M=a[N];y.copy(M),y.sub(T.multiplyScalar(T.dot(M))).normalize(),x.crossVectors(w,M);let D=x.dot(c[N])<0?-1:1;o.setXYZW(N,y.x,y.y,y.z,D)}for(let N=0,M=b.length;N<M;++N){let S=b[N],D=S.start,B=S.count;for(let k=D,K=D+B;k<K;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)rn.fromBufferAttribute(t,e),rn.normalize(),t.setXYZ(e,rn.x,rn.y,rn.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Fe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},td=new ie,ps=new ui,Oa=new Tn,ed=new P,Ba=new P,ka=new P,za=new P,vh=new P,Ha=new P,nd=new P,Va=new P,se=class extends Ce{constructor(t=new Pe,e=new we){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ha.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(vh.fromBufferAttribute(u,t),o?Ha.addScaledVector(vh,h):Ha.addScaledVector(vh.sub(e),h))}e.add(Ha)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(r),ps.copy(t.ray).recast(t.near),!(Oa.containsPoint(ps.origin)===!1&&(ps.intersectSphere(Oa,ed)===null||ps.origin.distanceToSquared(ed)>(t.far-t.near)**2))&&(td.copy(r).invert(),ps.copy(t.ray).applyMatrix4(td),!(n.boundingBox!==null&&ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ps)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=b,T=y;x<T;x+=3){let w=a.getX(x),A=a.getX(x+1),N=a.getX(x+2);s=Ga(this,p,t,n,l,h,u,w,A,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);s=Ga(this,o,t,n,l,h,u,b,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=b,T=y;x<T;x+=3){let w=x,A=x+1,N=x+2;s=Ga(this,p,t,n,l,h,u,w,A,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=m,y=m+1,x=m+2;s=Ga(this,o,t,n,l,h,u,b,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};Ji=class i extends Pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ve(l,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(u,2));function g(_,m,p,b,y,x,T,w,A,N,M){let S=x/A,D=T/N,B=x/2,k=T/2,K=w/2,st=A+1,W=N+1,Mt=0,j=0,It=new P;for(let Ft=0;Ft<W;Ft++){let At=Ft*D-k;for(let X=0;X<st;X++){let et=X*S-B;It[_]=et*b,It[m]=At*y,It[p]=K,l.push(It.x,It.y,It.z),It[_]=0,It[m]=0,It[p]=w>0?1:-1,h.push(It.x,It.y,It.z),u.push(X/A),u.push(1-Ft/N),Mt+=1}}for(let Ft=0;Ft<N;Ft++)for(let At=0;At<A;At++){let X=f+At+st*Ft,et=f+At+st*(Ft+1),at=f+(At+1)+st*(Ft+1),ut=f+(At+1)+st*Ft;c.push(X,et,ut),c.push(et,at,ut),j+=6}a.addGroup(d,j,M),d+=j,f+=Mt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};Sp={clone:ks,merge:_n},i0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,s0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Dn=class extends mn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=i0,this.fragmentShader=s0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ks(t.uniforms),this.uniformsGroups=n0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Io=class extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ki=new P,id=new Ct,sd=new Ct,Ge=class extends Io{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ms*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(_r*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(_r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z)}getViewSize(t,e){return this.getViewBounds(t,id,sd),e.subVectors(sd,id)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(_r*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},lr=-90,hr=1,pc=class extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ge(lr,hr,t,e);s.layers=this.layers,this.add(s);let r=new Ge(lr,hr,t,e);r.layers=this.layers,this.add(r);let o=new Ge(lr,hr,t,e);o.layers=this.layers,this.add(o);let a=new Ge(lr,hr,t,e);a.layers=this.layers,this.add(a);let c=new Ge(lr,hr,t,e);c.layers=this.layers,this.add(c);let l=new Ge(lr,hr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===ti)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===wo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Po=class extends tn{constructor(t=[],e=Us,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},mc=class extends Vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Po(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ji(5,5,5),r=new Dn({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:Oi});r.uniforms.tEquirect.value=e;let o=new se(s,r),a=e.minFilter;return e.minFilter===ii&&(e.minFilter=vn),new pc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ye=class extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},r0={type:"move"},wr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(r0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ye;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},ni=class extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ss=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=hc,this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},yn=new P,Qi=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)yn.fromBufferAttribute(this,e),yn.applyMatrix4(t),this.setXYZ(e,yn.x,yn.y,yn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)yn.fromBufferAttribute(this,e),yn.applyNormalMatrix(t),this.setXYZ(e,yn.x,yn.y,yn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)yn.fromBufferAttribute(this,e),yn.transformDirection(t),this.setXYZ(e,yn.x,yn.y,yn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Qn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Qn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Qn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Qn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array),r=Ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Fe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ar=class extends mn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},po=new P,fr=new P,dr=new P,pr=new Ct,mo=new Ct,bp=new ie,Wa=new P,go=new P,Xa=new P,rd=new Ct,Mh=new Ct,od=new Ct,Lo=class extends Ce{constructor(t=new Ar){if(super(),this.isSprite=!0,this.type="Sprite",ur===void 0){ur=new Pe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ss(e,5);ur.setIndex([0,1,2,0,2,3]),ur.setAttribute("position",new Qi(n,3,0,!1)),ur.setAttribute("uv",new Qi(n,2,3,!1))}this.geometry=ur,this.material=t,this.center=new Ct(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fr.setFromMatrixScale(this.matrixWorld),bp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),dr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fr.multiplyScalar(-dr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;qa(Wa.set(-.5,-.5,0),dr,o,fr,s,r),qa(go.set(.5,-.5,0),dr,o,fr,s,r),qa(Xa.set(.5,.5,0),dr,o,fr,s,r),rd.set(0,0),Mh.set(1,0),od.set(1,1);let a=t.ray.intersectTriangle(Wa,go,Xa,!1,po);if(a===null&&(qa(go.set(-.5,.5,0),dr,o,fr,s,r),Mh.set(0,1),a=t.ray.intersectTriangle(Wa,Xa,go,!1,po),a===null))return;let c=t.ray.origin.distanceTo(po);c<t.near||c>t.far||e.push({distance:c,point:po.clone(),uv:ai.getInterpolation(po,Wa,go,Xa,rd,Mh,od,new Ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};ad=new P,cd=new Te,ld=new Te,o0=new P,hd=new ie,Ya=new P,Sh=new Tn,ud=new ie,bh=new ui,Do=class extends se{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dh,this.bindMatrix=new ie,this.bindMatrixInverse=new ie,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Sn),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ya),this.boundingBox.expandByPoint(Ya)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Tn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ya),this.boundingSphere.expandByPoint(Ya)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sh.copy(this.boundingSphere),Sh.applyMatrix4(s),t.ray.intersectsSphere(Sh)!==!1&&(ud.copy(s).invert(),bh.copy(t.ray).applyMatrix4(ud),!(this.boundingBox!==null&&bh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,bh)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new Te,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Dh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ap?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;cd.fromBufferAttribute(s.attributes.skinIndex,t),ld.fromBufferAttribute(s.attributes.skinWeight,t),ad.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=ld.getComponent(r);if(o!==0){let a=cd.getComponent(r);hd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(o0.copy(ad).applyMatrix4(hd),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},Rr=class extends Ce{constructor(){super(),this.isBone=!0,this.type="Bone"}},No=class extends tn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=an,h=an,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},fd=new ie,a0=new ie,Uo=class i{constructor(t=[],e=[]){this.uuid=zn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ie)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new ie;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:a0;fd.multiplyMatrices(a,e[r]),fd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new No(e,t,t,Un,Xn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Rr),this.bones.push(o),this.boneInverses.push(new ie().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},ts=class extends Fe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},mr=new ie,dd=new ie,$a=[],pd=new Sn,c0=new ie,_o=new se,xo=new Tn,bs=class extends se{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ts(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,c0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Sn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,mr),pd.copy(t.boundingBox).applyMatrix4(mr),this.boundingBox.union(pd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Tn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,mr),xo.copy(t.boundingSphere).applyMatrix4(mr),this.boundingSphere.union(xo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(_o.geometry=this.geometry,_o.material=this.material,_o.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xo.copy(this.boundingSphere),xo.applyMatrix4(n),t.ray.intersectsSphere(xo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,mr),dd.multiplyMatrices(n,mr),_o.matrixWorld=dd,_o.raycast(t,$a);for(let o=0,a=$a.length;o<a;o++){let c=$a[o];c.instanceId=r,c.object=this,e.push(c)}$a.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ts(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new No(new Float32Array(s*this.count),s,this.count,$c,Xn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Eh=new P,l0=new P,h0=new ce,En=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Eh.subVectors(n,e).cross(l0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Eh),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||h0.getNormalMatrix(t),s=this.coplanarPoint(Eh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ms=new Tn,u0=new Ct(.5,.5),Za=new P,Cr=class{constructor(t=new En,e=new En,n=new En,s=new En,r=new En,o=new En){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ti,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],b=r[12],y=r[13],x=r[14],T=r[15];if(s[0].setComponents(l-o,d-h,p-g,T-b).normalize(),s[1].setComponents(l+o,d+h,p+g,T+b).normalize(),s[2].setComponents(l+a,d+u,p+_,T+y).normalize(),s[3].setComponents(l-a,d-u,p-_,T-y).normalize(),n)s[4].setComponents(c,f,m,x).normalize(),s[5].setComponents(l-c,d-f,p-m,T-x).normalize();else if(s[4].setComponents(l-c,d-f,p-m,T-x).normalize(),e===ti)s[5].setComponents(l+c,d+f,p+m,T+x).normalize();else if(e===wo)s[5].setComponents(c,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(t){ms.center.set(0,0,0);let e=u0.distanceTo(t.center);return ms.radius=.7071067811865476+e,ms.applyMatrix4(t.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Za.x=s.normal.x>0?t.max.x:t.min.x,Za.y=s.normal.y>0?t.max.y:t.min.y,Za.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Za)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},es=class extends mn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},gc=new P,_c=new P,md=new ie,yo=new ui,Ka=new Tn,Th=new P,gd=new P,Es=class extends Ce{constructor(t=new Pe,e=new es){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)gc.fromBufferAttribute(e,s-1),_c.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=gc.distanceTo(_c);t.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(s),Ka.radius+=r,t.ray.intersectsSphere(Ka)===!1)return;md.copy(s).invert(),yo.copy(t.ray).applyMatrix4(md);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){let p=h.getX(_),b=h.getX(_+1),y=ja(this,t,yo,c,p,b,_);y&&e.push(y)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(d),p=ja(this,t,yo,c,_,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){let p=ja(this,t,yo,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=ja(this,t,yo,c,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};_d=new P,xd=new P,Ts=class extends Es{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)_d.fromBufferAttribute(e,s),xd.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+_d.distanceTo(xd);t.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Fo=class extends Es{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Ir=class extends mn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},yd=new ie,Bh=new ui,Ja=new Tn,Qa=new P,Oo=class extends Ce{constructor(t=new Pe,e=new Ir){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,t.ray.intersectsSphere(Ja)===!1)return;yd.copy(s).invert(),Bh.copy(t.ray).applyMatrix4(yd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){let m=l.getX(g);Qa.fromBufferAttribute(u,m),vd(Qa,m,c,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)Qa.fromBufferAttribute(u,g),vd(Qa,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Ii=class extends tn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Bo=class extends tn{constructor(t,e,n=is,s,r,o,a=an,c=an,l,h=Mr,u=1){if(h!==Mr&&h!==zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Er(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ko=class extends tn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},fi=class i extends Pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new P,h=new Ct;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ve(o,3)),this.setAttribute("normal",new ve(a,3)),this.setAttribute("uv",new ve(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Pr=class i extends Pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,_=[],m=n/2,p=0;b(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ve(u,3)),this.setAttribute("normal",new ve(f,3)),this.setAttribute("uv",new ve(d,2));function b(){let x=new P,T=new P,w=0,A=(e-t)/n;for(let N=0;N<=r;N++){let M=[],S=N/r,D=S*(e-t)+t;for(let B=0;B<=s;B++){let k=B/s,K=k*c+a,st=Math.sin(K),W=Math.cos(K);T.x=D*st,T.y=-S*n+m,T.z=D*W,u.push(T.x,T.y,T.z),x.set(st,A,W).normalize(),f.push(x.x,x.y,x.z),d.push(k,1-S),M.push(g++)}_.push(M)}for(let N=0;N<s;N++)for(let M=0;M<r;M++){let S=_[M][N],D=_[M+1][N],B=_[M+1][N+1],k=_[M][N+1];(t>0||M!==0)&&(h.push(S,D,k),w+=3),(e>0||M!==r-1)&&(h.push(D,B,k),w+=3)}l.addGroup(p,w,0),p+=w}function y(x){let T=g,w=new Ct,A=new P,N=0,M=x===!0?t:e,S=x===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;let D=g;for(let B=0;B<=s;B++){let K=B/s*c+a,st=Math.cos(K),W=Math.sin(K);A.x=M*W,A.y=m*S,A.z=M*st,u.push(A.x,A.y,A.z),f.push(0,S,0),w.x=st*.5+.5,w.y=W*.5*S+.5,d.push(w.x,w.y),g++}for(let B=0;B<s;B++){let k=T+B,K=D+B;x===!0?h.push(K,K+1,k):h.push(K+1,K,k),N+=3}l.addGroup(p,N,x===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},zo=class i extends Pr{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},tc=new P,ec=new P,wh=new P,nc=new ai,Ho=class extends Pe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(_r*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:m,c:p}=nc;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),nc.getNormal(wh),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){let y=(b+1)%3,x=u[b],T=u[y],w=nc[h[b]],A=nc[h[y]],N=`${x}_${T}`,M=`${T}_${x}`;M in f&&f[M]?(wh.dot(f[M].normal)<=r&&(d.push(w.x,w.y,w.z),d.push(A.x,A.y,A.z)),f[M]=null):N in f||(f[N]={index0:l[b],index1:l[y],normal:wh.clone()})}}for(let g in f)if(f[g]){let{index0:_,index1:m}=f[g];tc.fromBufferAttribute(a,_),ec.fromBufferAttribute(a,m),d.push(tc.x,tc.y,tc.z),d.push(ec.x,ec.y,ec.z)}this.setAttribute("position",new ve(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},Nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Ct:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new P,s=[],r=[],o=[],a=new P,c=new ie;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(le(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(le(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Lr=class extends Nn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Ct){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},xc=class extends Lr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};ic=new P,Ah=new du,Rh=new du,Ch=new du,yc=class extends Nn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(ic.subVectors(s[0],s[1]).add(s[0]),l=ic);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ic.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ic),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ah.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),Rh.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),Ch.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ah.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Rh.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Ch.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Ah.calc(c),Rh.calc(c),Ch.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Vo=class extends Nn{constructor(t=new Ct,e=new Ct,n=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ct){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Eo(t,s.x,r.x,o.x,a.x),Eo(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},vc=class extends Nn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Eo(t,s.x,r.x,o.x,a.x),Eo(t,s.y,r.y,o.y,a.y),Eo(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Go=class extends Nn{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Mc=class extends Nn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wo=class extends Nn{constructor(t=new Ct,e=new Ct,n=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ct){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(bo(t,s.x,r.x,o.x),bo(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Sc=class extends Nn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(bo(t,s.x,r.x,o.x),bo(t,s.y,r.y,o.y),bo(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xo=class extends Nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Md(a,c.x,l.x,h.x,u.x),Md(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}},Sd=Object.freeze({__proto__:null,ArcCurve:xc,CatmullRomCurve3:yc,CubicBezierCurve:Vo,CubicBezierCurve3:vc,EllipseCurve:Lr,LineCurve:Go,LineCurve3:Mc,QuadraticBezierCurve:Wo,QuadraticBezierCurve3:Sc,SplineCurve:Xo}),bc=class extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Sd[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Sd[s.type]().fromJSON(s))}return this}},qo=class extends bc{constructor(t){super(),this.type="Path",this.currentPoint=new Ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Go(this.currentPoint.clone(),new Ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Wo(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Vo(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s),new Ct(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Xo(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Lr(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ns=class extends qo{constructor(t){super(t),this.uuid=zn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new qo().fromJSON(s))}return this}};Hh=class{static triangulate(t,e,n=2){return y0(t,e,n)}},yr=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Ed(t),Td(n,t);let o=t.length;e.forEach(Ed);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Td(n,e[c]);let a=Hh.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};As=class i extends Pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let b=p*f-o;for(let y=0;y<l;y++){let x=y*u-r;g.push(x,-b,0),_.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let y=b+l*p,x=b+l*(p+1),T=b+1+l*(p+1),w=b+1+l*p;d.push(y,x,w),d.push(x,T,w)}this.setIndex(d),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(_,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Rs=class i extends Pe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new P,g=new Ct;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){let p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){let m=_*(n+1);for(let p=0;p<n;p++){let b=p+m,y=b,x=b+n+1,T=b+n+2,w=b+1;a.push(y,x,w),a.push(x,T,w)}}this.setIndex(a),this.setAttribute("position",new ve(c,3)),this.setAttribute("normal",new ve(l,3)),this.setAttribute("uv",new ve(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Cs=class i extends Pe{constructor(t=new ns([new Ct(0,.5),new Ct(-.5,-.5),new Ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new ve(s,3)),this.setAttribute("normal",new ve(r,3)),this.setAttribute("uv",new ve(o,2));function l(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,g=f.holes;yr.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){let b=g[m];yr.isClockWise(b)===!0&&(g[m]=b.reverse())}let _=yr.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){let b=g[m];d=d.concat(b)}for(let m=0,p=d.length;m<p;m++){let b=d[m];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,p=_.length;m<p;m++){let b=_[m],y=b[0]+u,x=b[1]+u,T=b[2]+u;n.push(y,x,T),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return F0(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};Is=class i extends Pe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new P,f=new P,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let b=[],y=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let T=0;T<=e;T++){let w=T/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(w+x,1-y),b.push(l++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){let y=h[p][b+1],x=h[p][b],T=h[p+1][b],w=h[p+1][b+1];(p!==0||o>0)&&d.push(y,x,w),(p!==n-1||c<Math.PI)&&d.push(x,T,w)}this.setIndex(d),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(_,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},gn=class extends mn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wl,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},wn=class extends gn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ct(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return le(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},Pi=class extends mn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wl,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ec=class extends mn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Tc=class extends mn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};Li=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},wc=class extends Li{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nh,endingEnd:Nh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Uh:r=t,a=2*e-n;break;case Fh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Uh:o=t,c=2*n-e;break;case Fh:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,b=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*_+.5*g,x=d*m-d*_;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+b*o[l+T]+y*o[c+T]+x*o[u+T];return r}},Ac=class extends Li{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Rc=class extends Li{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},An=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=oc(e,this.TimeBufferType),this.values=oc(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:oc(t.times,Array),values:oc(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Rc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ac(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new wc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ys:e=this.InterpolantFactoryMethodDiscrete;break;case vs:e=this.InterpolantFactoryMethodLinear;break;case ac:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ys;case this.InterpolantFactoryMethodLinear:return vs;case this.InterpolantFactoryMethodSmooth:return ac}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&O0(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ac,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[f+g]||_!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};An.prototype.ValueTypeName="";An.prototype.TimeBufferType=Float32Array;An.prototype.ValueBufferType=Float32Array;An.prototype.DefaultInterpolation=vs;Di=class extends An{constructor(t,e,n){super(t,e,n)}};Di.prototype.ValueTypeName="bool";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=ys;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;Ko=class extends An{constructor(t,e,n,s){super(t,e,n,s)}};Ko.prototype.ValueTypeName="color";di=class extends An{constructor(t,e,n,s){super(t,e,n,s)}};di.prototype.ValueTypeName="number";Cc=class extends Li{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Mn.slerpFlat(r,0,o,l-a,o,l,c);return r}},pi=class extends An{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Cc(this.times,this.values,this.getValueSize(),t)}};pi.prototype.ValueTypeName="quaternion";pi.prototype.InterpolantFactoryMethodSmooth=void 0;Ni=class extends An{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=ys;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;mi=class extends An{constructor(t,e,n,s){super(t,e,n,s)}};mi.prototype.ValueTypeName="vector";jo=class{constructor(t="",e=-1,n=[],s=cp){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=zn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(z0(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(An.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=B0(c);c=wd(c,1,h),l=wd(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new di(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){let l=t[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,g,_){if(d.length!==0){let m=[],p=[];Rp(d,m,p,g),m.length!==0&&_.push(new u(f,m,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode,c=t.length||-1,l=t.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)d[f[g].morphTargets[_]]=-1;for(let _ in d){let m=[],p=[];for(let b=0;b!==f[g].morphTargets.length;++b){let y=f[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}s.push(new di(".morphTargetInfluence["+_+"]",m,p))}c=d.length*o}else{let d=".bones["+e[u].name+"]";n(mi,d+".position",f,"pos",s),n(pi,d+".quaternion",f,"rot",s),n(mi,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};li={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Ic=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Cp=new Ic,gi=class{constructor(t){this.manager=t!==void 0?t:Cp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};gi.DEFAULT_MATERIAL_NAME="__DEFAULT";Ri={},Vh=class extends Error{constructor(t,e){super(t),this.response=e}},Nr=class extends gi{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=li.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Ri[t]!==void 0){Ri[t].push({onLoad:e,onProgress:n,onError:s});return}Ri[t]=[],Ri[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Ri[t],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0,_=0,m=new ReadableStream({start(p){b();function b(){u.read().then(({done:y,value:x})=>{if(y)p.close();else{_+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let w=0,A=h.length;w<A;w++){let N=h[w];N.onProgress&&N.onProgress(T)}p.enqueue(x),b()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Vh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{li.add(`file:${t}`,l);let h=Ri[t];delete Ri[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Ri[t];if(h===void 0)throw this.manager.itemError(t),l;delete Ri[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},gr=new WeakMap,Pc=class extends gi{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=li.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=gr.get(o);u===void 0&&(u=[],gr.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=Sr("img");function c(){h(),e&&e(this);let u=gr.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}gr.delete(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),li.remove(`image:${t}`);let f=gr.get(this)||[];for(let d=0;d<f.length;d++){let g=f[d];g.onError&&g.onError(u)}gr.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),li.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}},Jo=class extends gi{constructor(t){super(t)}load(t,e,n,s){let r=new tn,o=new Pc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Ps=class extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ls=class extends Ps{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Ih=new ie,Ad=new P,Rd=new P,Qo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.mapType=si,this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cr,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ad.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ad),Rd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rd),e.updateMatrixWorld(),Ih.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ih,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ih)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Gh=class extends Qo{constructor(){super(new Ge(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Ms*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},ta=class extends Ps{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Gh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Cd=new ie,vo=new P,Ph=new P,Wh=class extends Qo{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new Te(2,1,1,1),new Te(0,1,1,1),new Te(3,1,1,1),new Te(1,1,1,1),new Te(3,0,1,1),new Te(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),vo.setFromMatrixPosition(t.matrixWorld),n.position.copy(vo),Ph.copy(n.position),Ph.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ph),n.updateMatrixWorld(),s.makeTranslation(-vo.x,-vo.y,-vo.z),Cd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cd,n.coordinateSystem,n.reversedDepth)}},Ds=class extends Ps{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Wh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ui=class extends Io{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Xh=class extends Qo{constructor(){super(new Ui(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ns=class extends Ps{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Xh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Fi=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Lh=new WeakMap,ea=class extends gi{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=li.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{if(Lh.has(o)===!0)s&&s(Lh.get(o)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(l),r.manager.itemEnd(t),l});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return li.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),Lh.set(c,l),li.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});li.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Lc=class extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},pu="\\[\\]\\.:\\/",H0=new RegExp("["+pu+"]","g"),mu="[^"+pu+"]",V0="[^"+pu.replace("\\.","")+"]",G0=/((?:WC+[\/:])*)/.source.replace("WC",mu),W0=/(WCOD+)?/.source.replace("WCOD",V0),X0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mu),q0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mu),Y0=new RegExp("^"+G0+W0+X0+q0+"$"),$0=["material","materials","bones","map"],qh=class{constructor(t,e,n){let s=n||Ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ue=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(H0,"")}static parseTrackName(t){let e=Y0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);$0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ue.Composite=qh;Ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ue.prototype.GetterByBindingType=[Ue.prototype._getValue_direct,Ue.prototype._getValue_array,Ue.prototype._getValue_arrayElement,Ue.prototype._getValue_toArray];Ue.prototype.SetterByBindingTypeAndVersioning=[[Ue.prototype._setValue_direct,Ue.prototype._setValue_direct_setNeedsUpdate,Ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_array,Ue.prototype._setValue_array_setNeedsUpdate,Ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_arrayElement,Ue.prototype._setValue_arrayElement_setNeedsUpdate,Ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_fromArray,Ue.prototype._setValue_fromArray_setNeedsUpdate,Ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];ES=new Float32Array(1),Id=new ie,na=class{constructor(t,e,n=0,s=1/0){this.ray=new ui(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Tr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Id.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Id),this}intersectObject(t,e=!0,n=[]){return Yh(t,this,n,e),n.sort(Pd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Yh(t[s],this,n,e);return n.sort(Pd),n}};Ur=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=le(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(le(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},ia=class extends hi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180")});function Qp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function j0(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}function Ly(i,t,e,n,s,r,o){let a=new ee(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1,T=g(y);T===null?p(a,c):T&&T.isColor&&(p(T,1),x=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,x){let T=g(x);T&&(T.isCubeTexture||T.mapping===sa)?(h===void 0&&(h=new se(new Ji(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:ks(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),zs.copy(x.backgroundRotation),zs.x*=-1,zs.y*=-1,zs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(zs.y*=-1,zs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Py.makeRotationFromEuler(zs)),h.material.toneMapped=xe.getTransfer(T.colorSpace)!==Re,(u!==T||f!==T.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new se(new As(2,2),new Dn({name:"BackgroundMaterial",uniforms:ks(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=xe.getTransfer(T.colorSpace)!==Re,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Al,fu(i)),n.buffers.color.setClear(Al.r,Al.g,Al.b,x,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:m,dispose:b}}function Dy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,D,B,k,K){let st=!1,W=u(k,B,D);r!==W&&(r=W,l(r.object)),st=d(S,k,B,K),st&&g(S,k,B,K),K!==null&&t.update(K,i.ELEMENT_ARRAY_BUFFER),(st||o)&&(o=!1,x(S,D,B,k),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,D,B){let k=B.wireframe===!0,K=n[S.id];K===void 0&&(K={},n[S.id]=K);let st=K[D.id];st===void 0&&(st={},K[D.id]=st);let W=st[k];return W===void 0&&(W=f(c()),st[k]=W),W}function f(S){let D=[],B=[],k=[];for(let K=0;K<e;K++)D[K]=0,B[K]=0,k[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:k,object:S,attributes:{},index:null}}function d(S,D,B,k){let K=r.attributes,st=D.attributes,W=0,Mt=B.getAttributes();for(let j in Mt)if(Mt[j].location>=0){let Ft=K[j],At=st[j];if(At===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(At=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(At=S.instanceColor)),Ft===void 0||Ft.attribute!==At||At&&Ft.data!==At.data)return!0;W++}return r.attributesNum!==W||r.index!==k}function g(S,D,B,k){let K={},st=D.attributes,W=0,Mt=B.getAttributes();for(let j in Mt)if(Mt[j].location>=0){let Ft=st[j];Ft===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(Ft=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(Ft=S.instanceColor));let At={};At.attribute=Ft,Ft&&Ft.data&&(At.data=Ft.data),K[j]=At,W++}r.attributes=K,r.attributesNum=W,r.index=k}function _(){let S=r.newAttributes;for(let D=0,B=S.length;D<B;D++)S[D]=0}function m(S){p(S,0)}function p(S,D){let B=r.newAttributes,k=r.enabledAttributes,K=r.attributeDivisors;B[S]=1,k[S]===0&&(i.enableVertexAttribArray(S),k[S]=1),K[S]!==D&&(i.vertexAttribDivisor(S,D),K[S]=D)}function b(){let S=r.newAttributes,D=r.enabledAttributes;for(let B=0,k=D.length;B<k;B++)D[B]!==S[B]&&(i.disableVertexAttribArray(B),D[B]=0)}function y(S,D,B,k,K,st,W){W===!0?i.vertexAttribIPointer(S,D,B,K,st):i.vertexAttribPointer(S,D,B,k,K,st)}function x(S,D,B,k){_();let K=k.attributes,st=B.getAttributes(),W=D.defaultAttributeValues;for(let Mt in st){let j=st[Mt];if(j.location>=0){let It=K[Mt];if(It===void 0&&(Mt==="instanceMatrix"&&S.instanceMatrix&&(It=S.instanceMatrix),Mt==="instanceColor"&&S.instanceColor&&(It=S.instanceColor)),It!==void 0){let Ft=It.normalized,At=It.itemSize,X=t.get(It);if(X===void 0)continue;let et=X.buffer,at=X.type,ut=X.bytesPerElement,O=at===i.INT||at===i.UNSIGNED_INT||It.gpuType===Xc;if(It.isInterleavedBufferAttribute){let C=It.data,H=C.stride,xt=It.offset;if(C.isInstancedInterleavedBuffer){for(let vt=0;vt<j.locationSize;vt++)p(j.location+vt,C.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let vt=0;vt<j.locationSize;vt++)m(j.location+vt);i.bindBuffer(i.ARRAY_BUFFER,et);for(let vt=0;vt<j.locationSize;vt++)y(j.location+vt,At/j.locationSize,at,Ft,H*ut,(xt+At/j.locationSize*vt)*ut,O)}else{if(It.isInstancedBufferAttribute){for(let C=0;C<j.locationSize;C++)p(j.location+C,It.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=It.meshPerAttribute*It.count)}else for(let C=0;C<j.locationSize;C++)m(j.location+C);i.bindBuffer(i.ARRAY_BUFFER,et);for(let C=0;C<j.locationSize;C++)y(j.location+C,At/j.locationSize,at,Ft,At*ut,At/j.locationSize*C*ut,O)}}else if(W!==void 0){let Ft=W[Mt];if(Ft!==void 0)switch(Ft.length){case 2:i.vertexAttrib2fv(j.location,Ft);break;case 3:i.vertexAttrib3fv(j.location,Ft);break;case 4:i.vertexAttrib4fv(j.location,Ft);break;default:i.vertexAttrib1fv(j.location,Ft)}}}}b()}function T(){N();for(let S in n){let D=n[S];for(let B in D){let k=D[B];for(let K in k)h(k[K].object),delete k[K];delete D[B]}delete n[S]}}function w(S){if(n[S.id]===void 0)return;let D=n[S.id];for(let B in D){let k=D[B];for(let K in k)h(k[K].object),delete k[K];delete D[B]}delete n[S.id]}function A(S){for(let D in n){let B=n[D];if(B[S.id]===void 0)continue;let k=B[S.id];for(let K in k)h(k[K].object),delete k[K];delete B[S.id]}}function N(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:M,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Ny(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Uy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Un&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let N=A===Br&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==si&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Xn&&!N)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:T,maxSamples:w}}function Fy(i){let t=this,e=null,n=0,s=!1,r=!1,o=new En,a=new ce,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let b=r?0:n,y=b*4,x=p.clippingState||null;c.value=x,x=h(g,f,y,d);for(let T=0;T!==y;++T)x[T]=e[T];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=d;y!==_;++y,x+=4)o.copy(u[y]).applyMatrix4(b,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Oy(i){let t=new WeakMap;function e(o,a){return a===Vc?o.mapping=Us:a===Gc&&(o.mapping=Fs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Vc||a===Gc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new mc(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}function ky(i){let t=[],e=[],n=[],s=i,r=i-Gr+1+Ip.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Gr?c=Ip[o-i+Gr-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),y=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let w=0;w<d;w++){let A=w%3*2/3-1,N=w>2?0:-1,M=[A,N,0,A+2/3,N,0,A+2/3,N+1,0,A,N,0,A+2/3,N+1,0,A,N+1,0];b.set(M,_*g*w),y.set(f,m*g*w);let S=[w,w,w,w,w,w];x.set(S,p*g*w)}let T=new Pe;T.setAttribute("position",new Fe(b,_)),T.setAttribute("uv",new Fe(y,m)),T.setAttribute("faceIndex",new Fe(x,p)),t.push(T),s>Gr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Dp(i,t,e){let n=new Vn(i,t,e);return n.texture.mapping=sa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rl(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function zy(i,t,e){let n=new Float32Array(Gs),s=new P(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:Gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Np(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Up(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Lu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Hy(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Vc||c===Gc,h=c===Us||c===Fs;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Xr(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Xr(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Vy(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&br("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Gy(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,g=u.attributes.position,_=0;if(d!==null){let b=d.array;_=d.version;for(let y=0,x=b.length;y<x;y+=3){let T=b[y+0],w=b[y+1],A=b[y+2];f.push(T,w,w,A,A,T)}}else if(g!==void 0){let b=g.array;_=g.version;for(let y=0,x=b.length/3-1;y<x;y+=3){let T=y+0,w=y+1,A=y+2;f.push(T,w,w,A,A,T)}}else return;let m=new(uu(f)?Co:Ro)(f,1);m.version=_;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Wy(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=d[b]*_[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Xy(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function qy(i,t,e){let n=new WeakMap,s=new Te;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let M=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],y=0;d===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,T=1;x>t.maxTextureSize&&(T=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let w=new Float32Array(x*T*4*u),A=new Ao(w,x,T,u);A.type=Xn,A.needsUpdate=!0;let N=y*4;for(let S=0;S<u;S++){let D=m[S],B=p[S],k=b[S],K=x*T*4*S;for(let st=0;st<D.count;st++){let W=st*N;d===!0&&(s.fromBufferAttribute(D,st),w[K+W+0]=s.x,w[K+W+1]=s.y,w[K+W+2]=s.z,w[K+W+3]=0),g===!0&&(s.fromBufferAttribute(B,st),w[K+W+4]=s.x,w[K+W+5]=s.y,w[K+W+6]=s.z,w[K+W+7]=0),_===!0&&(s.fromBufferAttribute(k,st),w[K+W+8]=s.x,w[K+W+9]=s.y,w[K+W+10]=s.z,w[K+W+11]=k.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Ct(x,T)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Yy(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}function Yr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Op[s];if(r===void 0&&(r=new Float32Array(s),Op[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function en(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function nn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Il(i,t){let e=Bp[t];e===void 0&&(e=new Int32Array(t),Bp[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function $y(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Zy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;i.uniform2fv(this.addr,t),nn(e,t)}}function Ky(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(en(e,t))return;i.uniform3fv(this.addr,t),nn(e,t)}}function jy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;i.uniform4fv(this.addr,t),nn(e,t)}}function Jy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;Hp.set(n),i.uniformMatrix2fv(this.addr,!1,Hp),nn(e,n)}}function Qy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;zp.set(n),i.uniformMatrix3fv(this.addr,!1,zp),nn(e,n)}}function tv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;kp.set(n),i.uniformMatrix4fv(this.addr,!1,kp),nn(e,n)}}function ev(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function nv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;i.uniform2iv(this.addr,t),nn(e,t)}}function iv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;i.uniform3iv(this.addr,t),nn(e,t)}}function sv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;i.uniform4iv(this.addr,t),nn(e,t)}}function rv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function ov(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;i.uniform2uiv(this.addr,t),nn(e,t)}}function av(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;i.uniform3uiv(this.addr,t),nn(e,t)}}function cv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;i.uniform4uiv(this.addr,t),nn(e,t)}}function lv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Fp.compareFunction=cu,r=Fp):r=tm,e.setTexture2D(t||r,s)}function hv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||nm,s)}function uv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||im,s)}function fv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||em,s)}function dv(i){switch(i){case 5126:return $y;case 35664:return Zy;case 35665:return Ky;case 35666:return jy;case 35674:return Jy;case 35675:return Qy;case 35676:return tv;case 5124:case 35670:return ev;case 35667:case 35671:return nv;case 35668:case 35672:return iv;case 35669:case 35673:return sv;case 5125:return rv;case 36294:return ov;case 36295:return av;case 36296:return cv;case 35678:case 36198:case 36298:case 36306:case 35682:return lv;case 35679:case 36299:case 36307:return hv;case 35680:case 36300:case 36308:case 36293:return uv;case 36289:case 36303:case 36311:case 36292:return fv}}function pv(i,t){i.uniform1fv(this.addr,t)}function mv(i,t){let e=Yr(t,this.size,2);i.uniform2fv(this.addr,e)}function gv(i,t){let e=Yr(t,this.size,3);i.uniform3fv(this.addr,e)}function _v(i,t){let e=Yr(t,this.size,4);i.uniform4fv(this.addr,e)}function xv(i,t){let e=Yr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function yv(i,t){let e=Yr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function vv(i,t){let e=Yr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Mv(i,t){i.uniform1iv(this.addr,t)}function Sv(i,t){i.uniform2iv(this.addr,t)}function bv(i,t){i.uniform3iv(this.addr,t)}function Ev(i,t){i.uniform4iv(this.addr,t)}function Tv(i,t){i.uniform1uiv(this.addr,t)}function wv(i,t){i.uniform2uiv(this.addr,t)}function Av(i,t){i.uniform3uiv(this.addr,t)}function Rv(i,t){i.uniform4uiv(this.addr,t)}function Cv(i,t,e){let n=this.cache,s=t.length,r=Il(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||tm,r[o])}function Iv(i,t,e){let n=this.cache,s=t.length,r=Il(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||nm,r[o])}function Pv(i,t,e){let n=this.cache,s=t.length,r=Il(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||im,r[o])}function Lv(i,t,e){let n=this.cache,s=t.length,r=Il(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||em,r[o])}function Dv(i){switch(i){case 5126:return pv;case 35664:return mv;case 35665:return gv;case 35666:return _v;case 35674:return xv;case 35675:return yv;case 35676:return vv;case 5124:case 35670:return Mv;case 35667:case 35671:return Sv;case 35668:case 35672:return bv;case 35669:case 35673:return Ev;case 5125:return Tv;case 36294:return wv;case 36295:return Av;case 36296:return Rv;case 35678:case 36198:case 36298:case 36306:case 35682:return Cv;case 35679:case 36299:case 36307:return Iv;case 35680:case 36300:case 36308:case 36293:return Pv;case 36289:case 36303:case 36311:case 36292:return Lv}}function Vp(i,t){i.seq.push(t),i.map[t.id]=t}function Nv(i,t,e){let n=i.name,s=n.length;for(bu.lastIndex=0;;){let r=bu.exec(n),o=bu.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Vp(e,l===void 0?new Eu(a,i,t):new Tu(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new wu(a),Vp(e,u)),e=u}}}function Gp(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}function Ov(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Bv(i){xe._getMatrix(Wp,xe.workingColorSpace,i);let t=`mat3( ${Wp.elements.map(e=>e.toFixed(4))} )`;switch(xe.getTransfer(i)){case To:return[t,"LinearTransferOETF"];case Re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Xp(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Ov(i.getShaderSource(t),a)}else return r}function kv(i,t){let e=Bv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function zv(i,t){let e;switch(t){case ep:e="Linear";break;case np:e="Reinhard";break;case ip:e="Cineon";break;case sp:e="ACESFilmic";break;case op:e="AgX";break;case Hc:e="Neutral";break;case rp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Hv(){xe.getLuminanceCoefficients(Cl);let i=Cl.x.toFixed(4),t=Cl.y.toFixed(4),e=Cl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ha).join(`
`)}function Gv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Wv(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ha(i){return i!==""}function qp(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yp(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Au(i){return i.replace(Xv,Yv)}function Yv(i,t){let e=he[t];if(e===void 0){let n=qv.get(t);if(n!==void 0)e=he[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Au(e)}function $p(i){return i.replace($v,Zv)}function Zv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Zp(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Kv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Zh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Nd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===_i&&(t="SHADOWMAP_TYPE_VSM"),t}function jv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Us:case Fs:t="ENVMAP_TYPE_CUBE";break;case sa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Jv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fs:t="ENVMAP_MODE_REFRACTION";break}return t}function Qv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case zc:t="ENVMAP_BLENDING_MULTIPLY";break;case Qd:t="ENVMAP_BLENDING_MIX";break;case tp:t="ENVMAP_BLENDING_ADD";break}return t}function tM(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function eM(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Kv(e),l=jv(e),h=Jv(e),u=Qv(e),f=tM(e),d=Vv(e),g=Gv(r),_=s.createProgram(),m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ha).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ha).join(`
`),p.length>0&&(p+=`
`)):(m=[Zp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ha).join(`
`),p=[Zp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bi?"#define TONE_MAPPING":"",e.toneMapping!==Bi?he.tonemapping_pars_fragment:"",e.toneMapping!==Bi?zv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",he.colorspace_pars_fragment,kv("linearToOutputTexel",e.outputColorSpace),Hv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ha).join(`
`)),o=Au(o),o=qp(o,e),o=Yp(o,e),a=Au(a),a=qp(a,e),a=Yp(a,e),o=$p(o),a=$p(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===lu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=b+m+o,x=b+p+a,T=Gp(s,s.VERTEX_SHADER,y),w=Gp(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(D){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(T)||"",K=s.getShaderInfoLog(w)||"",st=B.trim(),W=k.trim(),Mt=K.trim(),j=!0,It=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,w);else{let Ft=Xp(s,T,"vertex"),At=Xp(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+st+`
`+Ft+`
`+At)}else st!==""?console.warn("THREE.WebGLProgram: Program Info Log:",st):(W===""||Mt==="")&&(It=!1);It&&(D.diagnostics={runnable:j,programLog:st,vertexShader:{log:W,prefix:m},fragmentShader:{log:Mt,prefix:p}})}s.deleteShader(T),s.deleteShader(w),N=new Wr(s,_),M=Wv(s,_)}let N;this.getUniforms=function(){return N===void 0&&A(this),N};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Uv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Fv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}function iM(i,t,e,n,s,r,o){let a=new Tr,c=new Ru,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,S,D,B,k){let K=B.fog,st=k.geometry,W=M.isMeshStandardMaterial?B.environment:null,Mt=(M.isMeshStandardMaterial?e:t).get(M.envMap||W),j=Mt&&Mt.mapping===sa?Mt.image.height:null,It=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let Ft=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,At=Ft!==void 0?Ft.length:0,X=0;st.morphAttributes.position!==void 0&&(X=1),st.morphAttributes.normal!==void 0&&(X=2),st.morphAttributes.color!==void 0&&(X=3);let et,at,ut,O;if(It){let Jt=xi[It];et=Jt.vertexShader,at=Jt.fragmentShader}else et=M.vertexShader,at=M.fragmentShader,c.update(M),ut=c.getVertexShaderID(M),O=c.getFragmentShaderID(M);let C=i.getRenderTarget(),H=i.state.buffers.depth.getReversed(),xt=k.isInstancedMesh===!0,vt=k.isBatchedMesh===!0,Ut=!!M.map,$t=!!M.matcap,I=!!Mt,Wt=!!M.aoMap,Pt=!!M.lightMap,Bt=!!M.bumpMap,Vt=!!M.normalMap,be=!!M.displacementMap,zt=!!M.emissiveMap,qt=!!M.metalnessMap,me=!!M.roughnessMap,de=M.anisotropy>0,R=M.clearcoat>0,v=M.dispersion>0,J=M.iridescence>0,Q=M.sheen>0,_t=M.transmission>0,ft=de&&!!M.anisotropyMap,Yt=R&&!!M.clearcoatMap,tt=R&&!!M.clearcoatNormalMap,Et=R&&!!M.clearcoatRoughnessMap,U=J&&!!M.iridescenceMap,F=J&&!!M.iridescenceThicknessMap,z=Q&&!!M.sheenColorMap,ct=Q&&!!M.sheenRoughnessMap,nt=!!M.specularMap,ot=!!M.specularColorMap,yt=!!M.specularIntensityMap,L=_t&&!!M.transmissionMap,it=_t&&!!M.thicknessMap,ht=!!M.gradientMap,mt=!!M.alphaMap,lt=M.alphaTest>0,q=!!M.alphaHash,pt=!!M.extensions,Ht=Bi;M.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Ht=i.toneMapping);let Zt={shaderID:It,shaderType:M.type,shaderName:M.name,vertexShader:et,fragmentShader:at,defines:M.defines,customVertexShaderID:ut,customFragmentShaderID:O,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:vt,batchingColor:vt&&k._colorsTexture!==null,instancing:xt,instancingColor:xt&&k.instanceColor!==null,instancingMorph:xt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:C===null?i.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:cn,alphaToCoverage:!!M.alphaToCoverage,map:Ut,matcap:$t,envMap:I,envMapMode:I&&Mt.mapping,envMapCubeUVHeight:j,aoMap:Wt,lightMap:Pt,bumpMap:Bt,normalMap:Vt,displacementMap:f&&be,emissiveMap:zt,normalMapObjectSpace:Vt&&M.normalMapType===up,normalMapTangentSpace:Vt&&M.normalMapType===wl,metalnessMap:qt,roughnessMap:me,anisotropy:de,anisotropyMap:ft,clearcoat:R,clearcoatMap:Yt,clearcoatNormalMap:tt,clearcoatRoughnessMap:Et,dispersion:v,iridescence:J,iridescenceMap:U,iridescenceThicknessMap:F,sheen:Q,sheenColorMap:z,sheenRoughnessMap:ct,specularMap:nt,specularColorMap:ot,specularIntensityMap:yt,transmission:_t,transmissionMap:L,thicknessMap:it,gradientMap:ht,opaque:M.transparent===!1&&M.blending===_s&&M.alphaToCoverage===!1,alphaMap:mt,alphaTest:lt,alphaHash:q,combine:M.combine,mapUv:Ut&&_(M.map.channel),aoMapUv:Wt&&_(M.aoMap.channel),lightMapUv:Pt&&_(M.lightMap.channel),bumpMapUv:Bt&&_(M.bumpMap.channel),normalMapUv:Vt&&_(M.normalMap.channel),displacementMapUv:be&&_(M.displacementMap.channel),emissiveMapUv:zt&&_(M.emissiveMap.channel),metalnessMapUv:qt&&_(M.metalnessMap.channel),roughnessMapUv:me&&_(M.roughnessMap.channel),anisotropyMapUv:ft&&_(M.anisotropyMap.channel),clearcoatMapUv:Yt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:tt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:U&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:F&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:z&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ct&&_(M.sheenRoughnessMap.channel),specularMapUv:nt&&_(M.specularMap.channel),specularColorMapUv:ot&&_(M.specularColorMap.channel),specularIntensityMapUv:yt&&_(M.specularIntensityMap.channel),transmissionMapUv:L&&_(M.transmissionMap.channel),thicknessMapUv:it&&_(M.thicknessMap.channel),alphaMapUv:mt&&_(M.alphaMap.channel),vertexTangents:!!st.attributes.tangent&&(Vt||de),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!st.attributes.uv&&(Ut||mt),fog:!!K,useFog:M.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:H,skinning:k.isSkinnedMesh===!0,morphTargets:st.morphAttributes.position!==void 0,morphNormals:st.morphAttributes.normal!==void 0,morphColors:st.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:X,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ht,decodeVideoTexture:Ut&&M.map.isVideoTexture===!0&&xe.getTransfer(M.map.colorSpace)===Re,decodeVideoTextureEmissive:zt&&M.emissiveMap.isVideoTexture===!0&&xe.getTransfer(M.emissiveMap.colorSpace)===Re,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Se,flipSided:M.side===ln,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:pt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pt&&M.extensions.multiDraw===!0||vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Zt.vertexUv1s=l.has(1),Zt.vertexUv2s=l.has(2),Zt.vertexUv3s=l.has(3),l.clear(),Zt}function p(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let D in M.defines)S.push(D),S.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(b(S,M),y(S,M),S.push(i.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function b(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){let S=g[M.type],D;if(S){let B=xi[S];D=Sp.clone(B.uniforms)}else D=M.uniforms;return D}function T(M,S){let D;for(let B=0,k=h.length;B<k;B++){let K=h[B];if(K.cacheKey===S){D=K,++D.usedTimes;break}}return D===void 0&&(D=new eM(i,S,M,r),h.push(D)),D}function w(M){if(--M.usedTimes===0){let S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function A(M){c.remove(M)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:N}}function sM(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function rM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Kp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function jp(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||rM),n.length>1&&n.sort(f||Kp),s.length>1&&s.sort(f||Kp)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function oM(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new jp,i.set(n,[o])):s>=r.length?(o=new jp,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function aM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new ee};break;case"SpotLight":e={position:new P,direction:new P,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function cM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}function hM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function uM(i){let t=new aM,e=cM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let s=new P,r=new ie,o=new ie;function a(l){let h=0,u=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,b=0,y=0,x=0,T=0,w=0,A=0;l.sort(hM);for(let M=0,S=l.length;M<S;M++){let D=l[M],B=D.color,k=D.intensity,K=D.distance,st=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=B.r*k,u+=B.g*k,f+=B.b*k;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],k);A++}else if(D.isDirectionalLight){let W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Mt=D.shadow,j=e.get(D);j.shadowIntensity=Mt.intensity,j.shadowBias=Mt.bias,j.shadowNormalBias=Mt.normalBias,j.shadowRadius=Mt.radius,j.shadowMapSize=Mt.mapSize,n.directionalShadow[d]=j,n.directionalShadowMap[d]=st,n.directionalShadowMatrix[d]=D.shadow.matrix,b++}n.directional[d]=W,d++}else if(D.isSpotLight){let W=t.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(B).multiplyScalar(k),W.distance=K,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[_]=W;let Mt=D.shadow;if(D.map&&(n.spotLightMap[T]=D.map,T++,Mt.updateMatrices(D),D.castShadow&&w++),n.spotLightMatrix[_]=Mt.matrix,D.castShadow){let j=e.get(D);j.shadowIntensity=Mt.intensity,j.shadowBias=Mt.bias,j.shadowNormalBias=Mt.normalBias,j.shadowRadius=Mt.radius,j.shadowMapSize=Mt.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=st,x++}_++}else if(D.isRectAreaLight){let W=t.get(D);W.color.copy(B).multiplyScalar(k),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=W,m++}else if(D.isPointLight){let W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){let Mt=D.shadow,j=e.get(D);j.shadowIntensity=Mt.intensity,j.shadowBias=Mt.bias,j.shadowNormalBias=Mt.normalBias,j.shadowRadius=Mt.radius,j.shadowMapSize=Mt.mapSize,j.shadowCameraNear=Mt.camera.near,j.shadowCameraFar=Mt.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=st,n.pointShadowMatrix[g]=D.shadow.matrix,y++}n.point[g]=W,g++}else if(D.isHemisphereLight){let W=t.get(D);W.skyColor.copy(D.color).multiplyScalar(k),W.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=kt.LTC_FLOAT_1,n.rectAreaLTC2=kt.LTC_FLOAT_2):(n.rectAreaLTC1=kt.LTC_HALF_1,n.rectAreaLTC2=kt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let N=n.hash;(N.directionalLength!==d||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==b||N.numPointShadows!==y||N.numSpotShadows!==x||N.numSpotMaps!==T||N.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,N.directionalLength=d,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=b,N.numPointShadows=y,N.numSpotShadows=x,N.numSpotMaps=T,N.numLightProbes=A,n.version=lM++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){let y=l[p];if(y.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(y.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(y.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Jp(i){let t=new uM(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function fM(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Jp(i),t.set(s,[a])):r>=o.length?(a=new Jp(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function mM(i,t,e){let n=new Cr,s=new Ct,r=new Ct,o=new Te,a=new Ec({depthPacking:hp}),c=new Tc,l={},h=e.maxTextureSize,u={[ei]:ln,[ln]:ei,[Se]:Se},f=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:dM,fragmentShader:pM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Pe;g.setAttribute("position",new Fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new se(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zh;let p=this.type;this.render=function(w,A,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let M=i.getRenderTarget(),S=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Oi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let k=p!==_i&&this.type===_i,K=p===_i&&this.type!==_i;for(let st=0,W=w.length;st<W;st++){let Mt=w[st],j=Mt.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",Mt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);let It=j.getFrameExtents();if(s.multiply(It),r.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/It.x),s.x=r.x*It.x,j.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/It.y),s.y=r.y*It.y,j.mapSize.y=r.y)),j.map===null||k===!0||K===!0){let At=this.type!==_i?{minFilter:an,magFilter:an}:{};j.map!==null&&j.map.dispose(),j.map=new Vn(s.x,s.y,At),j.map.texture.name=Mt.name+".shadowMap",j.camera.updateProjectionMatrix()}i.setRenderTarget(j.map),i.clear();let Ft=j.getViewportCount();for(let At=0;At<Ft;At++){let X=j.getViewport(At);o.set(r.x*X.x,r.y*X.y,r.x*X.z,r.y*X.w),B.viewport(o),j.updateMatrices(Mt,At),n=j.getFrustum(),x(A,N,j.camera,Mt,this.type)}j.isPointLightShadow!==!0&&this.type===_i&&b(j,N),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,S,D)};function b(w,A){let N=t.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Vn(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,N,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,N,d,_,null)}function y(w,A,N,M){let S=null,D=N.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)S=D;else if(S=N.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let B=S.uuid,k=A.uuid,K=l[B];K===void 0&&(K={},l[B]=K);let st=K[k];st===void 0&&(st=S.clone(),K[k]=st,A.addEventListener("dispose",T)),S=st}if(S.visible=A.visible,S.wireframe=A.wireframe,M===_i?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,N.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let B=i.properties.get(S);B.light=N}return S}function x(w,A,N,M,S){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===_i)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,w.matrixWorld);let k=t.update(w),K=w.material;if(Array.isArray(K)){let st=k.groups;for(let W=0,Mt=st.length;W<Mt;W++){let j=st[W],It=K[j.materialIndex];if(It&&It.visible){let Ft=y(w,It,M,S);w.onBeforeShadow(i,w,A,N,k,Ft,j),i.renderBufferDirect(N,null,k,Ft,w,j),w.onAfterShadow(i,w,A,N,k,Ft,j)}}}else if(K.visible){let st=y(w,K,M,S);w.onBeforeShadow(i,w,A,N,k,st,null),i.renderBufferDirect(N,null,k,st,w,null),w.onAfterShadow(i,w,A,N,k,st,null)}}let B=w.children;for(let k=0,K=B.length;k<K;k++)x(B[k],A,N,M,S)}function T(w){w.target.removeEventListener("dispose",T);for(let N in l){let M=l[N],S=w.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}function _M(i,t){function e(){let L=!1,it=new Te,ht=null,mt=new Te(0,0,0,0);return{setMask:function(lt){ht!==lt&&!L&&(i.colorMask(lt,lt,lt,lt),ht=lt)},setLocked:function(lt){L=lt},setClear:function(lt,q,pt,Ht,Zt){Zt===!0&&(lt*=Ht,q*=Ht,pt*=Ht),it.set(lt,q,pt,Ht),mt.equals(it)===!1&&(i.clearColor(lt,q,pt,Ht),mt.copy(it))},reset:function(){L=!1,ht=null,mt.set(-1,0,0,0)}}}function n(){let L=!1,it=!1,ht=null,mt=null,lt=null;return{setReversed:function(q){if(it!==q){let pt=t.get("EXT_clip_control");q?pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.ZERO_TO_ONE_EXT):pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.NEGATIVE_ONE_TO_ONE_EXT),it=q;let Ht=lt;lt=null,this.setClear(Ht)}},getReversed:function(){return it},setTest:function(q){q?C(i.DEPTH_TEST):H(i.DEPTH_TEST)},setMask:function(q){ht!==q&&!L&&(i.depthMask(q),ht=q)},setFunc:function(q){if(it&&(q=gM[q]),mt!==q){switch(q){case Dc:i.depthFunc(i.NEVER);break;case Nc:i.depthFunc(i.ALWAYS);break;case Uc:i.depthFunc(i.LESS);break;case xs:i.depthFunc(i.LEQUAL);break;case Fc:i.depthFunc(i.EQUAL);break;case Oc:i.depthFunc(i.GEQUAL);break;case Bc:i.depthFunc(i.GREATER);break;case kc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=q}},setLocked:function(q){L=q},setClear:function(q){lt!==q&&(it&&(q=1-q),i.clearDepth(q),lt=q)},reset:function(){L=!1,ht=null,mt=null,lt=null,it=!1}}}function s(){let L=!1,it=null,ht=null,mt=null,lt=null,q=null,pt=null,Ht=null,Zt=null;return{setTest:function(Jt){L||(Jt?C(i.STENCIL_TEST):H(i.STENCIL_TEST))},setMask:function(Jt){it!==Jt&&!L&&(i.stencilMask(Jt),it=Jt)},setFunc:function(Jt,ae,Ie){(ht!==Jt||mt!==ae||lt!==Ie)&&(i.stencilFunc(Jt,ae,Ie),ht=Jt,mt=ae,lt=Ie)},setOp:function(Jt,ae,Ie){(q!==Jt||pt!==ae||Ht!==Ie)&&(i.stencilOp(Jt,ae,Ie),q=Jt,pt=ae,Ht=Ie)},setLocked:function(Jt){L=Jt},setClear:function(Jt){Zt!==Jt&&(i.clearStencil(Jt),Zt=Jt)},reset:function(){L=!1,it=null,ht=null,mt=null,lt=null,q=null,pt=null,Ht=null,Zt=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,y=null,x=null,T=null,w=null,A=new ee(0,0,0),N=0,M=!1,S=null,D=null,B=null,k=null,K=null,st=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,Mt=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(Mt=parseFloat(/^WebGL (\d)/.exec(j)[1]),W=Mt>=1):j.indexOf("OpenGL ES")!==-1&&(Mt=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),W=Mt>=2);let It=null,Ft={},At=i.getParameter(i.SCISSOR_BOX),X=i.getParameter(i.VIEWPORT),et=new Te().fromArray(At),at=new Te().fromArray(X);function ut(L,it,ht,mt){let lt=new Uint8Array(4),q=i.createTexture();i.bindTexture(L,q),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let pt=0;pt<ht;pt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,lt):i.texImage2D(it+pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,lt);return q}let O={};O[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),O[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),O[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),C(i.DEPTH_TEST),o.setFunc(xs),Bt(!1),Vt($h),C(i.CULL_FACE),Wt(Oi);function C(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function H(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function xt(L,it){return u[L]!==it?(i.bindFramebuffer(L,it),u[L]=it,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=it),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=it),!0):!1}function vt(L,it){let ht=d,mt=!1;if(L){ht=f.get(it),ht===void 0&&(ht=[],f.set(it,ht));let lt=L.textures;if(ht.length!==lt.length||ht[0]!==i.COLOR_ATTACHMENT0){for(let q=0,pt=lt.length;q<pt;q++)ht[q]=i.COLOR_ATTACHMENT0+q;ht.length=lt.length,mt=!0}}else ht[0]!==i.BACK&&(ht[0]=i.BACK,mt=!0);mt&&i.drawBuffers(ht)}function Ut(L){return g!==L?(i.useProgram(L),g=L,!0):!1}let $t={[ji]:i.FUNC_ADD,[Fd]:i.FUNC_SUBTRACT,[Od]:i.FUNC_REVERSE_SUBTRACT};$t[Bd]=i.MIN,$t[kd]=i.MAX;let I={[zd]:i.ZERO,[Hd]:i.ONE,[Vd]:i.SRC_COLOR,[cc]:i.SRC_ALPHA,[$d]:i.SRC_ALPHA_SATURATE,[qd]:i.DST_COLOR,[Wd]:i.DST_ALPHA,[Gd]:i.ONE_MINUS_SRC_COLOR,[lc]:i.ONE_MINUS_SRC_ALPHA,[Yd]:i.ONE_MINUS_DST_COLOR,[Xd]:i.ONE_MINUS_DST_ALPHA,[Zd]:i.CONSTANT_COLOR,[Kd]:i.ONE_MINUS_CONSTANT_COLOR,[jd]:i.CONSTANT_ALPHA,[Jd]:i.ONE_MINUS_CONSTANT_ALPHA};function Wt(L,it,ht,mt,lt,q,pt,Ht,Zt,Jt){if(L===Oi){_===!0&&(H(i.BLEND),_=!1);return}if(_===!1&&(C(i.BLEND),_=!0),L!==Ud){if(L!==m||Jt!==M){if((p!==ji||x!==ji)&&(i.blendEquation(i.FUNC_ADD),p=ji,x=ji),Jt)switch(L){case _s:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Kh:i.blendFunc(i.ONE,i.ONE);break;case jh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case _s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Kh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case jh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,y=null,T=null,w=null,A.set(0,0,0),N=0,m=L,M=Jt}return}lt=lt||it,q=q||ht,pt=pt||mt,(it!==p||lt!==x)&&(i.blendEquationSeparate($t[it],$t[lt]),p=it,x=lt),(ht!==b||mt!==y||q!==T||pt!==w)&&(i.blendFuncSeparate(I[ht],I[mt],I[q],I[pt]),b=ht,y=mt,T=q,w=pt),(Ht.equals(A)===!1||Zt!==N)&&(i.blendColor(Ht.r,Ht.g,Ht.b,Zt),A.copy(Ht),N=Zt),m=L,M=!1}function Pt(L,it){L.side===Se?H(i.CULL_FACE):C(i.CULL_FACE);let ht=L.side===ln;it&&(ht=!ht),Bt(ht),L.blending===_s&&L.transparent===!1?Wt(Oi):Wt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let mt=L.stencilWrite;a.setTest(mt),mt&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),zt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?C(i.SAMPLE_ALPHA_TO_COVERAGE):H(i.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(L){S!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),S=L)}function Vt(L){L!==Ld?(C(i.CULL_FACE),L!==D&&(L===$h?i.cullFace(i.BACK):L===Dd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):H(i.CULL_FACE),D=L}function be(L){L!==B&&(W&&i.lineWidth(L),B=L)}function zt(L,it,ht){L?(C(i.POLYGON_OFFSET_FILL),(k!==it||K!==ht)&&(i.polygonOffset(it,ht),k=it,K=ht)):H(i.POLYGON_OFFSET_FILL)}function qt(L){L?C(i.SCISSOR_TEST):H(i.SCISSOR_TEST)}function me(L){L===void 0&&(L=i.TEXTURE0+st-1),It!==L&&(i.activeTexture(L),It=L)}function de(L,it,ht){ht===void 0&&(It===null?ht=i.TEXTURE0+st-1:ht=It);let mt=Ft[ht];mt===void 0&&(mt={type:void 0,texture:void 0},Ft[ht]=mt),(mt.type!==L||mt.texture!==it)&&(It!==ht&&(i.activeTexture(ht),It=ht),i.bindTexture(L,it||O[L]),mt.type=L,mt.texture=it)}function R(){let L=Ft[It];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{i.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _t(){try{i.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ft(){try{i.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Yt(){try{i.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{i.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Et(){try{i.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function U(){try{i.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function F(){try{i.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function z(L){et.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),et.copy(L))}function ct(L){at.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),at.copy(L))}function nt(L,it){let ht=l.get(it);ht===void 0&&(ht=new WeakMap,l.set(it,ht));let mt=ht.get(L);mt===void 0&&(mt=i.getUniformBlockIndex(it,L.name),ht.set(L,mt))}function ot(L,it){let mt=l.get(it).get(L);c.get(it)!==mt&&(i.uniformBlockBinding(it,mt,L.__bindingPointIndex),c.set(it,mt))}function yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},It=null,Ft={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,y=null,x=null,T=null,w=null,A=new ee(0,0,0),N=0,M=!1,S=null,D=null,B=null,k=null,K=null,et.set(0,0,i.canvas.width,i.canvas.height),at.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:C,disable:H,bindFramebuffer:xt,drawBuffers:vt,useProgram:Ut,setBlending:Wt,setMaterial:Pt,setFlipSided:Bt,setCullFace:Vt,setLineWidth:be,setPolygonOffset:zt,setScissorTest:qt,activeTexture:me,bindTexture:de,unbindTexture:R,compressedTexImage2D:v,compressedTexImage3D:J,texImage2D:U,texImage3D:F,updateUBOMapping:nt,uniformBlockBinding:ot,texStorage2D:tt,texStorage3D:Et,texSubImage2D:Q,texSubImage3D:_t,compressedTexSubImage2D:ft,compressedTexSubImage3D:Yt,scissor:z,viewport:ct,reset:yt}}function xM(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ct,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,v){return d?new OffscreenCanvas(R,v):Sr("canvas")}function _(R,v,J){let Q=1,_t=de(R);if((_t.width>J||_t.height>J)&&(Q=J/Math.max(_t.width,_t.height)),Q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ft=Math.floor(Q*_t.width),Yt=Math.floor(Q*_t.height);u===void 0&&(u=g(ft,Yt));let tt=v?g(ft,Yt):u;return tt.width=ft,tt.height=Yt,tt.getContext("2d").drawImage(R,0,0,ft,Yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_t.width+"x"+_t.height+") to ("+ft+"x"+Yt+")."),tt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_t.width+"x"+_t.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,v,J,Q,_t=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ft=v;if(v===i.RED&&(J===i.FLOAT&&(ft=i.R32F),J===i.HALF_FLOAT&&(ft=i.R16F),J===i.UNSIGNED_BYTE&&(ft=i.R8)),v===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(ft=i.R8UI),J===i.UNSIGNED_SHORT&&(ft=i.R16UI),J===i.UNSIGNED_INT&&(ft=i.R32UI),J===i.BYTE&&(ft=i.R8I),J===i.SHORT&&(ft=i.R16I),J===i.INT&&(ft=i.R32I)),v===i.RG&&(J===i.FLOAT&&(ft=i.RG32F),J===i.HALF_FLOAT&&(ft=i.RG16F),J===i.UNSIGNED_BYTE&&(ft=i.RG8)),v===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(ft=i.RG8UI),J===i.UNSIGNED_SHORT&&(ft=i.RG16UI),J===i.UNSIGNED_INT&&(ft=i.RG32UI),J===i.BYTE&&(ft=i.RG8I),J===i.SHORT&&(ft=i.RG16I),J===i.INT&&(ft=i.RG32I)),v===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(ft=i.RGB8UI),J===i.UNSIGNED_SHORT&&(ft=i.RGB16UI),J===i.UNSIGNED_INT&&(ft=i.RGB32UI),J===i.BYTE&&(ft=i.RGB8I),J===i.SHORT&&(ft=i.RGB16I),J===i.INT&&(ft=i.RGB32I)),v===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(ft=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(ft=i.RGBA16UI),J===i.UNSIGNED_INT&&(ft=i.RGBA32UI),J===i.BYTE&&(ft=i.RGBA8I),J===i.SHORT&&(ft=i.RGBA16I),J===i.INT&&(ft=i.RGBA32I)),v===i.RGB&&(J===i.UNSIGNED_INT_5_9_9_9_REV&&(ft=i.RGB9_E5),J===i.UNSIGNED_INT_10F_11F_11F_REV&&(ft=i.R11F_G11F_B10F)),v===i.RGBA){let Yt=_t?To:xe.getTransfer(Q);J===i.FLOAT&&(ft=i.RGBA32F),J===i.HALF_FLOAT&&(ft=i.RGBA16F),J===i.UNSIGNED_BYTE&&(ft=Yt===Re?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT_4_4_4_4&&(ft=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(ft=i.RGB5_A1)}return(ft===i.R16F||ft===i.R32F||ft===i.RG16F||ft===i.RG32F||ft===i.RGBA16F||ft===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ft}function x(R,v){let J;return R?v===null||v===is||v===kr?J=i.DEPTH24_STENCIL8:v===Xn?J=i.DEPTH32F_STENCIL8:v===Or&&(J=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===is||v===kr?J=i.DEPTH_COMPONENT24:v===Xn?J=i.DEPTH_COMPONENT32F:v===Or&&(J=i.DEPTH_COMPONENT16),J}function T(R,v){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==an&&R.minFilter!==vn?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function w(R){let v=R.target;v.removeEventListener("dispose",w),N(v),v.isVideoTexture&&h.delete(v)}function A(R){let v=R.target;v.removeEventListener("dispose",A),S(v)}function N(R){let v=n.get(R);if(v.__webglInit===void 0)return;let J=R.source,Q=f.get(J);if(Q){let _t=Q[v.__cacheKey];_t.usedTimes--,_t.usedTimes===0&&M(R),Object.keys(Q).length===0&&f.delete(J)}n.remove(R)}function M(R){let v=n.get(R);i.deleteTexture(v.__webglTexture);let J=R.source,Q=f.get(J);delete Q[v.__cacheKey],o.memory.textures--}function S(R){let v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(v.__webglFramebuffer[Q]))for(let _t=0;_t<v.__webglFramebuffer[Q].length;_t++)i.deleteFramebuffer(v.__webglFramebuffer[Q][_t]);else i.deleteFramebuffer(v.__webglFramebuffer[Q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Q])}else{if(Array.isArray(v.__webglFramebuffer))for(let Q=0;Q<v.__webglFramebuffer.length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[Q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Q=0;Q<v.__webglColorRenderbuffer.length;Q++)v.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let J=R.textures;for(let Q=0,_t=J.length;Q<_t;Q++){let ft=n.get(J[Q]);ft.__webglTexture&&(i.deleteTexture(ft.__webglTexture),o.memory.textures--),n.remove(J[Q])}n.remove(R)}let D=0;function B(){D=0}function k(){let R=D;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),D+=1,R}function K(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function st(R,v){let J=n.get(R);if(R.isVideoTexture&&qt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&J.__version!==R.version){let Q=R.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(J,R,v);return}}else R.isExternalTexture&&(J.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+v)}function W(R,v){let J=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&J.__version!==R.version){O(J,R,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+v)}function Mt(R,v){let J=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&J.__version!==R.version){O(J,R,v);return}e.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+v)}function j(R,v){let J=n.get(R);if(R.version>0&&J.__version!==R.version){C(J,R,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+v)}let It={[Hn]:i.REPEAT,[ci]:i.CLAMP_TO_EDGE,[vr]:i.MIRRORED_REPEAT},Ft={[an]:i.NEAREST,[Wc]:i.NEAREST_MIPMAP_NEAREST,[Os]:i.NEAREST_MIPMAP_LINEAR,[vn]:i.LINEAR,[Fr]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},At={[fp]:i.NEVER,[xp]:i.ALWAYS,[dp]:i.LESS,[cu]:i.LEQUAL,[pp]:i.EQUAL,[_p]:i.GEQUAL,[mp]:i.GREATER,[gp]:i.NOTEQUAL};function X(R,v){if(v.type===Xn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===vn||v.magFilter===Fr||v.magFilter===Os||v.magFilter===ii||v.minFilter===vn||v.minFilter===Fr||v.minFilter===Os||v.minFilter===ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,It[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,It[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,It[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ft[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ft[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,At[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===an||v.minFilter!==Os&&v.minFilter!==ii||v.type===Xn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let J=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function et(R,v){let J=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",w));let Q=v.source,_t=f.get(Q);_t===void 0&&(_t={},f.set(Q,_t));let ft=K(v);if(ft!==R.__cacheKey){_t[ft]===void 0&&(_t[ft]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,J=!0),_t[ft].usedTimes++;let Yt=_t[R.__cacheKey];Yt!==void 0&&(_t[R.__cacheKey].usedTimes--,Yt.usedTimes===0&&M(v)),R.__cacheKey=ft,R.__webglTexture=_t[ft].texture}return J}function at(R,v,J){return Math.floor(Math.floor(R/J)/v)}function ut(R,v,J,Q){let ft=R.updateRanges;if(ft.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,J,Q,v.data);else{ft.sort((F,z)=>F.start-z.start);let Yt=0;for(let F=1;F<ft.length;F++){let z=ft[Yt],ct=ft[F],nt=z.start+z.count,ot=at(ct.start,v.width,4),yt=at(z.start,v.width,4);ct.start<=nt+1&&ot===yt&&at(ct.start+ct.count-1,v.width,4)===ot?z.count=Math.max(z.count,ct.start+ct.count-z.start):(++Yt,ft[Yt]=ct)}ft.length=Yt+1;let tt=i.getParameter(i.UNPACK_ROW_LENGTH),Et=i.getParameter(i.UNPACK_SKIP_PIXELS),U=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let F=0,z=ft.length;F<z;F++){let ct=ft[F],nt=Math.floor(ct.start/4),ot=Math.ceil(ct.count/4),yt=nt%v.width,L=Math.floor(nt/v.width),it=ot,ht=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,L),e.texSubImage2D(i.TEXTURE_2D,0,yt,L,it,ht,J,Q,v.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,tt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Et),i.pixelStorei(i.UNPACK_SKIP_ROWS,U)}}function O(R,v,J){let Q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=i.TEXTURE_3D);let _t=et(R,v),ft=v.source;e.bindTexture(Q,R.__webglTexture,i.TEXTURE0+J);let Yt=n.get(ft);if(ft.version!==Yt.__version||_t===!0){e.activeTexture(i.TEXTURE0+J);let tt=xe.getPrimaries(xe.workingColorSpace),Et=v.colorSpace===ki?null:xe.getPrimaries(v.colorSpace),U=v.colorSpace===ki||tt===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,U);let F=_(v.image,!1,s.maxTextureSize);F=me(v,F);let z=r.convert(v.format,v.colorSpace),ct=r.convert(v.type),nt=y(v.internalFormat,z,ct,v.colorSpace,v.isVideoTexture);X(Q,v);let ot,yt=v.mipmaps,L=v.isVideoTexture!==!0,it=Yt.__version===void 0||_t===!0,ht=ft.dataReady,mt=T(v,F);if(v.isDepthTexture)nt=x(v.format===zr,v.type),it&&(L?e.texStorage2D(i.TEXTURE_2D,1,nt,F.width,F.height):e.texImage2D(i.TEXTURE_2D,0,nt,F.width,F.height,0,z,ct,null));else if(v.isDataTexture)if(yt.length>0){L&&it&&e.texStorage2D(i.TEXTURE_2D,mt,nt,yt[0].width,yt[0].height);for(let lt=0,q=yt.length;lt<q;lt++)ot=yt[lt],L?ht&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,ot.width,ot.height,z,ct,ot.data):e.texImage2D(i.TEXTURE_2D,lt,nt,ot.width,ot.height,0,z,ct,ot.data);v.generateMipmaps=!1}else L?(it&&e.texStorage2D(i.TEXTURE_2D,mt,nt,F.width,F.height),ht&&ut(v,F,z,ct)):e.texImage2D(i.TEXTURE_2D,0,nt,F.width,F.height,0,z,ct,F.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){L&&it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,nt,yt[0].width,yt[0].height,F.depth);for(let lt=0,q=yt.length;lt<q;lt++)if(ot=yt[lt],v.format!==Un)if(z!==null)if(L){if(ht)if(v.layerUpdates.size>0){let pt=gu(ot.width,ot.height,v.format,v.type);for(let Ht of v.layerUpdates){let Zt=ot.data.subarray(Ht*pt/ot.data.BYTES_PER_ELEMENT,(Ht+1)*pt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,Ht,ot.width,ot.height,1,z,Zt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,ot.width,ot.height,F.depth,z,ot.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,lt,nt,ot.width,ot.height,F.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ht&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,ot.width,ot.height,F.depth,z,ct,ot.data):e.texImage3D(i.TEXTURE_2D_ARRAY,lt,nt,ot.width,ot.height,F.depth,0,z,ct,ot.data)}else{L&&it&&e.texStorage2D(i.TEXTURE_2D,mt,nt,yt[0].width,yt[0].height);for(let lt=0,q=yt.length;lt<q;lt++)ot=yt[lt],v.format!==Un?z!==null?L?ht&&e.compressedTexSubImage2D(i.TEXTURE_2D,lt,0,0,ot.width,ot.height,z,ot.data):e.compressedTexImage2D(i.TEXTURE_2D,lt,nt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ht&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,ot.width,ot.height,z,ct,ot.data):e.texImage2D(i.TEXTURE_2D,lt,nt,ot.width,ot.height,0,z,ct,ot.data)}else if(v.isDataArrayTexture)if(L){if(it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,nt,F.width,F.height,F.depth),ht)if(v.layerUpdates.size>0){let lt=gu(F.width,F.height,v.format,v.type);for(let q of v.layerUpdates){let pt=F.data.subarray(q*lt/F.data.BYTES_PER_ELEMENT,(q+1)*lt/F.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,q,F.width,F.height,1,z,ct,pt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,z,ct,F.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,nt,F.width,F.height,F.depth,0,z,ct,F.data);else if(v.isData3DTexture)L?(it&&e.texStorage3D(i.TEXTURE_3D,mt,nt,F.width,F.height,F.depth),ht&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,z,ct,F.data)):e.texImage3D(i.TEXTURE_3D,0,nt,F.width,F.height,F.depth,0,z,ct,F.data);else if(v.isFramebufferTexture){if(it)if(L)e.texStorage2D(i.TEXTURE_2D,mt,nt,F.width,F.height);else{let lt=F.width,q=F.height;for(let pt=0;pt<mt;pt++)e.texImage2D(i.TEXTURE_2D,pt,nt,lt,q,0,z,ct,null),lt>>=1,q>>=1}}else if(yt.length>0){if(L&&it){let lt=de(yt[0]);e.texStorage2D(i.TEXTURE_2D,mt,nt,lt.width,lt.height)}for(let lt=0,q=yt.length;lt<q;lt++)ot=yt[lt],L?ht&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,z,ct,ot):e.texImage2D(i.TEXTURE_2D,lt,nt,z,ct,ot);v.generateMipmaps=!1}else if(L){if(it){let lt=de(F);e.texStorage2D(i.TEXTURE_2D,mt,nt,lt.width,lt.height)}ht&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,z,ct,F)}else e.texImage2D(i.TEXTURE_2D,0,nt,z,ct,F);m(v)&&p(Q),Yt.__version=ft.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function C(R,v,J){if(v.image.length!==6)return;let Q=et(R,v),_t=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+J);let ft=n.get(_t);if(_t.version!==ft.__version||Q===!0){e.activeTexture(i.TEXTURE0+J);let Yt=xe.getPrimaries(xe.workingColorSpace),tt=v.colorSpace===ki?null:xe.getPrimaries(v.colorSpace),Et=v.colorSpace===ki||Yt===tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let U=v.isCompressedTexture||v.image[0].isCompressedTexture,F=v.image[0]&&v.image[0].isDataTexture,z=[];for(let q=0;q<6;q++)!U&&!F?z[q]=_(v.image[q],!0,s.maxCubemapSize):z[q]=F?v.image[q].image:v.image[q],z[q]=me(v,z[q]);let ct=z[0],nt=r.convert(v.format,v.colorSpace),ot=r.convert(v.type),yt=y(v.internalFormat,nt,ot,v.colorSpace),L=v.isVideoTexture!==!0,it=ft.__version===void 0||Q===!0,ht=_t.dataReady,mt=T(v,ct);X(i.TEXTURE_CUBE_MAP,v);let lt;if(U){L&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,yt,ct.width,ct.height);for(let q=0;q<6;q++){lt=z[q].mipmaps;for(let pt=0;pt<lt.length;pt++){let Ht=lt[pt];v.format!==Un?nt!==null?L?ht&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt,0,0,Ht.width,Ht.height,nt,Ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt,yt,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt,0,0,Ht.width,Ht.height,nt,ot,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt,yt,Ht.width,Ht.height,0,nt,ot,Ht.data)}}}else{if(lt=v.mipmaps,L&&it){lt.length>0&&mt++;let q=de(z[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,yt,q.width,q.height)}for(let q=0;q<6;q++)if(F){L?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,z[q].width,z[q].height,nt,ot,z[q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,yt,z[q].width,z[q].height,0,nt,ot,z[q].data);for(let pt=0;pt<lt.length;pt++){let Zt=lt[pt].image[q].image;L?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt+1,0,0,Zt.width,Zt.height,nt,ot,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt+1,yt,Zt.width,Zt.height,0,nt,ot,Zt.data)}}else{L?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,nt,ot,z[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,yt,nt,ot,z[q]);for(let pt=0;pt<lt.length;pt++){let Ht=lt[pt];L?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt+1,0,0,nt,ot,Ht.image[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,pt+1,yt,nt,ot,Ht.image[q])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),ft.__version=_t.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function H(R,v,J,Q,_t,ft){let Yt=r.convert(J.format,J.colorSpace),tt=r.convert(J.type),Et=y(J.internalFormat,Yt,tt,J.colorSpace),U=n.get(v),F=n.get(J);if(F.__renderTarget=v,!U.__hasExternalTextures){let z=Math.max(1,v.width>>ft),ct=Math.max(1,v.height>>ft);_t===i.TEXTURE_3D||_t===i.TEXTURE_2D_ARRAY?e.texImage3D(_t,ft,Et,z,ct,v.depth,0,Yt,tt,null):e.texImage2D(_t,ft,Et,z,ct,0,Yt,tt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),zt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,_t,F.__webglTexture,0,be(v)):(_t===i.TEXTURE_2D||_t>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&_t<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,_t,F.__webglTexture,ft),e.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(R,v,J){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){let Q=v.depthTexture,_t=Q&&Q.isDepthTexture?Q.type:null,ft=x(v.stencilBuffer,_t),Yt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=be(v);zt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,ft,v.width,v.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,ft,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ft,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Yt,i.RENDERBUFFER,R)}else{let Q=v.textures;for(let _t=0;_t<Q.length;_t++){let ft=Q[_t],Yt=r.convert(ft.format,ft.colorSpace),tt=r.convert(ft.type),Et=y(ft.internalFormat,Yt,tt,ft.colorSpace),U=be(v);J&&zt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,U,Et,v.width,v.height):zt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,U,Et,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Et,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function vt(R,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(v.depthTexture);Q.__renderTarget=v,(!Q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),st(v.depthTexture,0);let _t=Q.__webglTexture,ft=be(v);if(v.depthTexture.format===Mr)zt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_t,0,ft):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_t,0);else if(v.depthTexture.format===zr)zt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_t,0,ft):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_t,0);else throw new Error("Unknown depthTexture format")}function Ut(R){let v=n.get(R),J=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let Q=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Q){let _t=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Q.removeEventListener("dispose",_t)};Q.addEventListener("dispose",_t),v.__depthDisposeCallback=_t}v.__boundDepthTexture=Q}if(R.depthTexture&&!v.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");let Q=R.texture.mipmaps;Q&&Q.length>0?vt(v.__webglFramebuffer[0],R):vt(v.__webglFramebuffer,R)}else if(J){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]===void 0)v.__webglDepthbuffer[Q]=i.createRenderbuffer(),xt(v.__webglDepthbuffer[Q],R,!1);else{let _t=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=v.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,ft),i.framebufferRenderbuffer(i.FRAMEBUFFER,_t,i.RENDERBUFFER,ft)}}else{let Q=R.texture.mipmaps;if(Q&&Q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),xt(v.__webglDepthbuffer,R,!1);else{let _t=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ft),i.framebufferRenderbuffer(i.FRAMEBUFFER,_t,i.RENDERBUFFER,ft)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function $t(R,v,J){let Q=n.get(R);v!==void 0&&H(Q.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&Ut(R)}function I(R){let v=R.texture,J=n.get(R),Q=n.get(v);R.addEventListener("dispose",A);let _t=R.textures,ft=R.isWebGLCubeRenderTarget===!0,Yt=_t.length>1;if(Yt||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=v.version,o.memory.textures++),ft){J.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(v.mipmaps&&v.mipmaps.length>0){J.__webglFramebuffer[tt]=[];for(let Et=0;Et<v.mipmaps.length;Et++)J.__webglFramebuffer[tt][Et]=i.createFramebuffer()}else J.__webglFramebuffer[tt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){J.__webglFramebuffer=[];for(let tt=0;tt<v.mipmaps.length;tt++)J.__webglFramebuffer[tt]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(Yt)for(let tt=0,Et=_t.length;tt<Et;tt++){let U=n.get(_t[tt]);U.__webglTexture===void 0&&(U.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&zt(R)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let tt=0;tt<_t.length;tt++){let Et=_t[tt];J.__webglColorRenderbuffer[tt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[tt]);let U=r.convert(Et.format,Et.colorSpace),F=r.convert(Et.type),z=y(Et.internalFormat,U,F,Et.colorSpace,R.isXRRenderTarget===!0),ct=be(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,z,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.RENDERBUFFER,J.__webglColorRenderbuffer[tt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),xt(J.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ft){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),X(i.TEXTURE_CUBE_MAP,v);for(let tt=0;tt<6;tt++)if(v.mipmaps&&v.mipmaps.length>0)for(let Et=0;Et<v.mipmaps.length;Et++)H(J.__webglFramebuffer[tt][Et],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et);else H(J.__webglFramebuffer[tt],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Yt){for(let tt=0,Et=_t.length;tt<Et;tt++){let U=_t[tt],F=n.get(U),z=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(z,F.__webglTexture),X(z,U),H(J.__webglFramebuffer,R,U,i.COLOR_ATTACHMENT0+tt,z,0),m(U)&&p(z)}e.unbindTexture()}else{let tt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(tt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,Q.__webglTexture),X(tt,v),v.mipmaps&&v.mipmaps.length>0)for(let Et=0;Et<v.mipmaps.length;Et++)H(J.__webglFramebuffer[Et],R,v,i.COLOR_ATTACHMENT0,tt,Et);else H(J.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,tt,0);m(v)&&p(tt),e.unbindTexture()}R.depthBuffer&&Ut(R)}function Wt(R){let v=R.textures;for(let J=0,Q=v.length;J<Q;J++){let _t=v[J];if(m(_t)){let ft=b(R),Yt=n.get(_t).__webglTexture;e.bindTexture(ft,Yt),p(ft),e.unbindTexture()}}}let Pt=[],Bt=[];function Vt(R){if(R.samples>0){if(zt(R)===!1){let v=R.textures,J=R.width,Q=R.height,_t=i.COLOR_BUFFER_BIT,ft=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Yt=n.get(R),tt=v.length>1;if(tt)for(let U=0;U<v.length;U++)e.bindFramebuffer(i.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+U,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+U,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer);let Et=R.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer);for(let U=0;U<v.length;U++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(_t|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(_t|=i.STENCIL_BUFFER_BIT)),tt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Yt.__webglColorRenderbuffer[U]);let F=n.get(v[U]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,F,0)}i.blitFramebuffer(0,0,J,Q,0,0,J,Q,_t,i.NEAREST),c===!0&&(Pt.length=0,Bt.length=0,Pt.push(i.COLOR_ATTACHMENT0+U),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Pt.push(ft),Bt.push(ft),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Bt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Pt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),tt)for(let U=0;U<v.length;U++){e.bindFramebuffer(i.FRAMEBUFFER,Yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+U,i.RENDERBUFFER,Yt.__webglColorRenderbuffer[U]);let F=n.get(v[U]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+U,i.TEXTURE_2D,F,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Yt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function be(R){return Math.min(s.maxSamples,R.samples)}function zt(R){let v=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function qt(R){let v=o.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function me(R,v){let J=R.colorSpace,Q=R.format,_t=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||J!==cn&&J!==ki&&(xe.getTransfer(J)===Re?(Q!==Un||_t!==si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),v}function de(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.setTexture2D=st,this.setTexture2DArray=W,this.setTexture3D=Mt,this.setTextureCube=j,this.rebindTextures=$t,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=H,this.useMultisampledRTT=zt}function yM(i,t){function e(n,s=ki){let r,o=xe.getTransfer(s);if(n===si)return i.UNSIGNED_BYTE;if(n===qc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===iu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===tu)return i.BYTE;if(n===eu)return i.SHORT;if(n===Or)return i.UNSIGNED_SHORT;if(n===Xc)return i.INT;if(n===is)return i.UNSIGNED_INT;if(n===Xn)return i.FLOAT;if(n===Br)return i.HALF_FLOAT;if(n===su)return i.ALPHA;if(n===ru)return i.RGB;if(n===Un)return i.RGBA;if(n===Mr)return i.DEPTH_COMPONENT;if(n===zr)return i.DEPTH_STENCIL;if(n===$c)return i.RED;if(n===Zc)return i.RED_INTEGER;if(n===ou)return i.RG;if(n===Kc)return i.RG_INTEGER;if(n===jc)return i.RGBA_INTEGER;if(n===ra||n===oa||n===aa||n===ca)if(o===Re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jc||n===Qc||n===tl||n===el)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nl||n===il||n===sl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nl||n===il)return o===Re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rl||n===ol||n===al||n===cl||n===ll||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===_l||n===xl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===rl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ol)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===al)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===cl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ll)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ul)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ml)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_l)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yl||n===vl||n===Ml)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===yl)return o===Re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sl||n===bl||n===El||n===Tl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===El)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===kr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}function bM(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,fu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ln&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ln&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=t.get(p),y=b.envMap,x=b.envMapRotation;y&&(m.envMap.value=y,Hs.copy(x),Hs.x*=-1,Hs.y*=-1,Hs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Hs.y*=-1,Hs.z*=-1),m.envMapRotation.value.setFromMatrix4(SM.makeRotationFromEuler(Hs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function EM(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,y){let x=y.program;n.uniformBlockBinding(b,x)}function l(b,y){let x=s[b.id];x===void 0&&(g(b),x=h(b),s[b.id]=x,b.addEventListener("dispose",m));let T=y.program;n.updateUBOMapping(b,T);let w=t.render.frame;r[b.id]!==w&&(f(b),r[b.id]=w)}function h(b){let y=u();b.__bindingPointIndex=y;let x=i.createBuffer(),T=b.__size,w=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let y=s[b.id],x=b.uniforms,T=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,A=x.length;w<A;w++){let N=Array.isArray(x[w])?x[w]:[x[w]];for(let M=0,S=N.length;M<S;M++){let D=N[M];if(d(D,w,M,T)===!0){let B=D.__offset,k=Array.isArray(D.value)?D.value:[D.value],K=0;for(let st=0;st<k.length;st++){let W=k[st],Mt=_(W);typeof W=="number"||typeof W=="boolean"?(D.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,B+K,D.__data)):W.isMatrix3?(D.__data[0]=W.elements[0],D.__data[1]=W.elements[1],D.__data[2]=W.elements[2],D.__data[3]=0,D.__data[4]=W.elements[3],D.__data[5]=W.elements[4],D.__data[6]=W.elements[5],D.__data[7]=0,D.__data[8]=W.elements[6],D.__data[9]=W.elements[7],D.__data[10]=W.elements[8],D.__data[11]=0):(W.toArray(D.__data,K),K+=Mt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,y,x,T){let w=b.value,A=y+"_"+x;if(T[A]===void 0)return typeof w=="number"||typeof w=="boolean"?T[A]=w:T[A]=w.clone(),!0;{let N=T[A];if(typeof w=="number"||typeof w=="boolean"){if(N!==w)return T[A]=w,!0}else if(N.equals(w)===!1)return N.copy(w),!0}return!1}function g(b){let y=b.uniforms,x=0,T=16;for(let A=0,N=y.length;A<N;A++){let M=Array.isArray(y[A])?y[A]:[y[A]];for(let S=0,D=M.length;S<D;S++){let B=M[S],k=Array.isArray(B.value)?B.value:[B.value];for(let K=0,st=k.length;K<st;K++){let W=k[K],Mt=_(W),j=x%T,It=j%Mt.boundary,Ft=j+It;x+=It,Ft!==0&&T-Ft<Mt.storage&&(x+=T-Ft),B.__data=new Float32Array(Mt.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=Mt.storage}}}let w=x%T;return w>0&&(x+=T-w),b.__size=x,b.__cache={},this}function _(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){let y=b.target;y.removeEventListener("dispose",m);let x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var J0,Q0,t_,e_,n_,i_,s_,r_,o_,a_,c_,l_,h_,u_,f_,d_,p_,m_,g_,__,x_,y_,v_,M_,S_,b_,E_,T_,w_,A_,R_,C_,I_,P_,L_,D_,N_,U_,F_,O_,B_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,$_,Z_,K_,j_,J_,Q_,tx,ex,nx,ix,sx,rx,ox,ax,cx,lx,hx,ux,fx,dx,px,mx,gx,_x,xx,yx,vx,Mx,Sx,bx,Ex,Tx,wx,Ax,Rx,Cx,Ix,Px,Lx,Dx,Nx,Ux,Fx,Ox,Bx,kx,zx,Hx,Vx,Gx,Wx,Xx,qx,Yx,$x,Zx,Kx,jx,Jx,Qx,ty,ey,ny,iy,sy,ry,oy,ay,cy,ly,hy,uy,fy,dy,py,my,gy,_y,xy,yy,vy,My,Sy,by,Ey,Ty,wy,Ay,Ry,Cy,Iy,he,kt,xi,Al,zs,Py,Gr,Ip,Gs,xu,Pp,yu,vu,Mu,Su,Vs,Vr,Lp,By,Xr,tm,Fp,em,nm,im,Op,Bp,kp,zp,Hp,Eu,Tu,wu,bu,Wr,Uv,Fv,Wp,Cl,Xv,qv,$v,nM,Ru,Cu,lM,dM,pM,gM,vM,MM,Iu,Pu,Hs,SM,qr,qn=qe(()=>{_u();_u();J0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Q0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,t_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,e_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,i_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,s_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,r_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,o_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,a_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,c_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,l_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,h_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,u_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,f_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,d_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,p_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,m_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,__=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,x_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,y_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,v_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,M_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,S_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,b_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,E_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,T_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,w_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,A_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,R_="gl_FragColor = linearToOutputTexel( gl_FragColor );",C_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,I_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,P_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,L_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,D_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,N_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,U_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,F_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,O_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,B_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,k_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,z_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,H_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,V_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,G_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,W_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,X_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,q_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Y_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Z_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,K_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,j_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,J_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Q_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ix=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ox=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ax=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ux=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,px=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ex=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ax=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ix=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Px=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Nx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ux=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ox=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Hx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,qx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ty=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ny=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ry=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,oy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ly=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,py=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,my=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,gy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_y=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,My=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Sy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,by=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ey=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ty=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ay=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ry=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Cy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Iy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,he={alphahash_fragment:J0,alphahash_pars_fragment:Q0,alphamap_fragment:t_,alphamap_pars_fragment:e_,alphatest_fragment:n_,alphatest_pars_fragment:i_,aomap_fragment:s_,aomap_pars_fragment:r_,batching_pars_vertex:o_,batching_vertex:a_,begin_vertex:c_,beginnormal_vertex:l_,bsdfs:h_,iridescence_fragment:u_,bumpmap_pars_fragment:f_,clipping_planes_fragment:d_,clipping_planes_pars_fragment:p_,clipping_planes_pars_vertex:m_,clipping_planes_vertex:g_,color_fragment:__,color_pars_fragment:x_,color_pars_vertex:y_,color_vertex:v_,common:M_,cube_uv_reflection_fragment:S_,defaultnormal_vertex:b_,displacementmap_pars_vertex:E_,displacementmap_vertex:T_,emissivemap_fragment:w_,emissivemap_pars_fragment:A_,colorspace_fragment:R_,colorspace_pars_fragment:C_,envmap_fragment:I_,envmap_common_pars_fragment:P_,envmap_pars_fragment:L_,envmap_pars_vertex:D_,envmap_physical_pars_fragment:W_,envmap_vertex:N_,fog_vertex:U_,fog_pars_vertex:F_,fog_fragment:O_,fog_pars_fragment:B_,gradientmap_pars_fragment:k_,lightmap_pars_fragment:z_,lights_lambert_fragment:H_,lights_lambert_pars_fragment:V_,lights_pars_begin:G_,lights_toon_fragment:X_,lights_toon_pars_fragment:q_,lights_phong_fragment:Y_,lights_phong_pars_fragment:$_,lights_physical_fragment:Z_,lights_physical_pars_fragment:K_,lights_fragment_begin:j_,lights_fragment_maps:J_,lights_fragment_end:Q_,logdepthbuf_fragment:tx,logdepthbuf_pars_fragment:ex,logdepthbuf_pars_vertex:nx,logdepthbuf_vertex:ix,map_fragment:sx,map_pars_fragment:rx,map_particle_fragment:ox,map_particle_pars_fragment:ax,metalnessmap_fragment:cx,metalnessmap_pars_fragment:lx,morphinstance_vertex:hx,morphcolor_vertex:ux,morphnormal_vertex:fx,morphtarget_pars_vertex:dx,morphtarget_vertex:px,normal_fragment_begin:mx,normal_fragment_maps:gx,normal_pars_fragment:_x,normal_pars_vertex:xx,normal_vertex:yx,normalmap_pars_fragment:vx,clearcoat_normal_fragment_begin:Mx,clearcoat_normal_fragment_maps:Sx,clearcoat_pars_fragment:bx,iridescence_pars_fragment:Ex,opaque_fragment:Tx,packing:wx,premultiplied_alpha_fragment:Ax,project_vertex:Rx,dithering_fragment:Cx,dithering_pars_fragment:Ix,roughnessmap_fragment:Px,roughnessmap_pars_fragment:Lx,shadowmap_pars_fragment:Dx,shadowmap_pars_vertex:Nx,shadowmap_vertex:Ux,shadowmask_pars_fragment:Fx,skinbase_vertex:Ox,skinning_pars_vertex:Bx,skinning_vertex:kx,skinnormal_vertex:zx,specularmap_fragment:Hx,specularmap_pars_fragment:Vx,tonemapping_fragment:Gx,tonemapping_pars_fragment:Wx,transmission_fragment:Xx,transmission_pars_fragment:qx,uv_pars_fragment:Yx,uv_pars_vertex:$x,uv_vertex:Zx,worldpos_vertex:Kx,background_vert:jx,background_frag:Jx,backgroundCube_vert:Qx,backgroundCube_frag:ty,cube_vert:ey,cube_frag:ny,depth_vert:iy,depth_frag:sy,distanceRGBA_vert:ry,distanceRGBA_frag:oy,equirect_vert:ay,equirect_frag:cy,linedashed_vert:ly,linedashed_frag:hy,meshbasic_vert:uy,meshbasic_frag:fy,meshlambert_vert:dy,meshlambert_frag:py,meshmatcap_vert:my,meshmatcap_frag:gy,meshnormal_vert:_y,meshnormal_frag:xy,meshphong_vert:yy,meshphong_frag:vy,meshphysical_vert:My,meshphysical_frag:Sy,meshtoon_vert:by,meshtoon_frag:Ey,points_vert:Ty,points_frag:wy,shadow_vert:Ay,shadow_frag:Ry,sprite_vert:Cy,sprite_frag:Iy},kt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},xi={basic:{uniforms:_n([kt.common,kt.specularmap,kt.envmap,kt.aomap,kt.lightmap,kt.fog]),vertexShader:he.meshbasic_vert,fragmentShader:he.meshbasic_frag},lambert:{uniforms:_n([kt.common,kt.specularmap,kt.envmap,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.fog,kt.lights,{emissive:{value:new ee(0)}}]),vertexShader:he.meshlambert_vert,fragmentShader:he.meshlambert_frag},phong:{uniforms:_n([kt.common,kt.specularmap,kt.envmap,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.fog,kt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:he.meshphong_vert,fragmentShader:he.meshphong_frag},standard:{uniforms:_n([kt.common,kt.envmap,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.roughnessmap,kt.metalnessmap,kt.fog,kt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag},toon:{uniforms:_n([kt.common,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.gradientmap,kt.fog,kt.lights,{emissive:{value:new ee(0)}}]),vertexShader:he.meshtoon_vert,fragmentShader:he.meshtoon_frag},matcap:{uniforms:_n([kt.common,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.fog,{matcap:{value:null}}]),vertexShader:he.meshmatcap_vert,fragmentShader:he.meshmatcap_frag},points:{uniforms:_n([kt.points,kt.fog]),vertexShader:he.points_vert,fragmentShader:he.points_frag},dashed:{uniforms:_n([kt.common,kt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:he.linedashed_vert,fragmentShader:he.linedashed_frag},depth:{uniforms:_n([kt.common,kt.displacementmap]),vertexShader:he.depth_vert,fragmentShader:he.depth_frag},normal:{uniforms:_n([kt.common,kt.bumpmap,kt.normalmap,kt.displacementmap,{opacity:{value:1}}]),vertexShader:he.meshnormal_vert,fragmentShader:he.meshnormal_frag},sprite:{uniforms:_n([kt.sprite,kt.fog]),vertexShader:he.sprite_vert,fragmentShader:he.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:he.background_vert,fragmentShader:he.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:he.backgroundCube_vert,fragmentShader:he.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:he.cube_vert,fragmentShader:he.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:he.equirect_vert,fragmentShader:he.equirect_frag},distanceRGBA:{uniforms:_n([kt.common,kt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:he.distanceRGBA_vert,fragmentShader:he.distanceRGBA_frag},shadow:{uniforms:_n([kt.lights,kt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:he.shadow_vert,fragmentShader:he.shadow_frag}};xi.physical={uniforms:_n([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag};Al={r:0,b:0,g:0},zs=new Gn,Py=new ie;Gr=4,Ip=[.125,.215,.35,.446,.526,.582],Gs=20,xu=new Ui,Pp=new ee,yu=null,vu=0,Mu=0,Su=!1,Vs=(1+Math.sqrt(5))/2,Vr=1/Vs,Lp=[new P(-Vs,Vr,0),new P(Vs,Vr,0),new P(-Vr,0,Vs),new P(Vr,0,Vs),new P(0,Vs,-Vr),new P(0,Vs,Vr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],By=new P,Xr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=By}=r;yu=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),Mu=this._renderer.getActiveMipmapLevel(),Su=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Up(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Np(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(yu,vu,Mu),this._renderer.xr.enabled=Su,t.scissorTest=!1,Rl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Us||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yu=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),Mu=this._renderer.getActiveMipmapLevel(),Su=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Br,format:Un,colorSpace:cn,depthBuffer:!1},s=Dp(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dp(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ky(r)),this._blurMaterial=zy(r,t,e)}return s}_compileMaterial(t){let e=new se(this._lodPlanes[0],t);this._renderer.compile(e,xu)}_sceneToCubeUV(t,e,n,s,r){let c=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Pp),u.toneMapping=Bi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let _=new we({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),m=new se(new Ji,_),p=!1,b=t.background;b?b.isColor&&(_.color.copy(b),t.background=null,p=!0):(_.color.copy(Pp),p=!0);for(let y=0;y<6;y++){let x=y%3;x===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):x===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));let T=this._cubeSize;Rl(s,x*T,y>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=b}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Us||t.mapping===Fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Up()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Np());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new se(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Rl(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,xu)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Lp[(s-r-1)%Lp.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new se(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Gs-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Gs;m>Gs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gs}`);let p=[],b=0;for(let A=0;A<Gs;++A){let N=A/_,M=Math.exp(-N*N/2);p.push(M),A===0?b+=M:A<m&&(b+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let x=this._sizeLods[s],T=3*x*(s>y-Gr?s-y+Gr:0),w=4*(this._cubeSize-x);Rl(e,T,w,3*x,2*x),c.setRenderTarget(e),c.render(u,xu)}};tm=new tn,Fp=new Bo(1,1),em=new Ao,nm=new dc,im=new Po,Op=[],Bp=[],kp=new Float32Array(16),zp=new Float32Array(9),Hp=new Float32Array(4);Eu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=dv(e.type)}},Tu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Dv(e.type)}},wu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},bu=/(\w+)(\])?(\[|\.)?/g;Wr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Nv(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};Uv=37297,Fv=0;Wp=new ce;Cl=new P;Xv=/^[ \t]*#include +<([\w\d./]+)>/gm;qv=new Map;$v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;nM=0,Ru=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Cu(t),e.set(t,n)),n}},Cu=class{constructor(t){this.id=nM++,this.code=t,this.usedTimes=0}};lM=0;dM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;gM={[Dc]:Nc,[Uc]:Bc,[Fc]:kc,[xs]:Oc,[Nc]:Dc,[Bc]:Uc,[kc]:Fc,[Oc]:xs};vM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Iu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ko(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Dn({vertexShader:vM,fragmentShader:MM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new se(new As(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pu=class extends hi{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new Iu,p={},b=e.getContextAttributes(),y=null,x=null,T=[],w=[],A=new Ct,N=null,M=new Ge;M.viewport=new Te;let S=new Ge;S.viewport=new Te;let D=[M,S],B=new Lc,k=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let C=T[O];return C===void 0&&(C=new wr,T[O]=C),C.getTargetRaySpace()},this.getControllerGrip=function(O){let C=T[O];return C===void 0&&(C=new wr,T[O]=C),C.getGripSpace()},this.getHand=function(O){let C=T[O];return C===void 0&&(C=new wr,T[O]=C),C.getHandSpace()};function st(O){let C=w.indexOf(O.inputSource);if(C===-1)return;let H=T[C];H!==void 0&&(H.update(O.inputSource,O.frame,l||o),H.dispatchEvent({type:O.type,data:O.inputSource}))}function W(){s.removeEventListener("select",st),s.removeEventListener("selectstart",st),s.removeEventListener("selectend",st),s.removeEventListener("squeeze",st),s.removeEventListener("squeezestart",st),s.removeEventListener("squeezeend",st),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Mt);for(let O=0;O<T.length;O++){let C=w[O];C!==null&&(w[O]=null,T[O].disconnect(C))}k=null,K=null,m.reset();for(let O in p)delete p[O];t.setRenderTarget(y),d=null,f=null,u=null,s=null,x=null,ut.stop(),n.isPresenting=!1,t.setPixelRatio(N),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(O){l=O},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",st),s.addEventListener("selectstart",st),s.addEventListener("selectend",st),s.addEventListener("squeeze",st),s.addEventListener("squeezestart",st),s.addEventListener("squeezeend",st),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Mt),b.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let H=null,xt=null,vt=null;b.depth&&(vt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,H=b.stencil?zr:Mr,xt=b.stencil?kr:is);let Ut={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ut),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Vn(f.textureWidth,f.textureHeight,{format:Un,type:si,depthTexture:new Bo(f.textureWidth,f.textureHeight,xt,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let H={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,H),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Vn(d.framebufferWidth,d.framebufferHeight,{format:Un,type:si,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ut.setContext(s),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Mt(O){for(let C=0;C<O.removed.length;C++){let H=O.removed[C],xt=w.indexOf(H);xt>=0&&(w[xt]=null,T[xt].disconnect(H))}for(let C=0;C<O.added.length;C++){let H=O.added[C],xt=w.indexOf(H);if(xt===-1){for(let Ut=0;Ut<T.length;Ut++)if(Ut>=w.length){w.push(H),xt=Ut;break}else if(w[Ut]===null){w[Ut]=H,xt=Ut;break}if(xt===-1)break}let vt=T[xt];vt&&vt.connect(H)}}let j=new P,It=new P;function Ft(O,C,H){j.setFromMatrixPosition(C.matrixWorld),It.setFromMatrixPosition(H.matrixWorld);let xt=j.distanceTo(It),vt=C.projectionMatrix.elements,Ut=H.projectionMatrix.elements,$t=vt[14]/(vt[10]-1),I=vt[14]/(vt[10]+1),Wt=(vt[9]+1)/vt[5],Pt=(vt[9]-1)/vt[5],Bt=(vt[8]-1)/vt[0],Vt=(Ut[8]+1)/Ut[0],be=$t*Bt,zt=$t*Vt,qt=xt/(-Bt+Vt),me=qt*-Bt;if(C.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(me),O.translateZ(qt),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),vt[10]===-1)O.projectionMatrix.copy(C.projectionMatrix),O.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{let de=$t+qt,R=I+qt,v=be-me,J=zt+(xt-me),Q=Wt*I/R*de,_t=Pt*I/R*de;O.projectionMatrix.makePerspective(v,J,Q,_t,de,R),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function At(O,C){C===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(C.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;let C=O.near,H=O.far;m.texture!==null&&(m.depthNear>0&&(C=m.depthNear),m.depthFar>0&&(H=m.depthFar)),B.near=S.near=M.near=C,B.far=S.far=M.far=H,(k!==B.near||K!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),k=B.near,K=B.far),B.layers.mask=O.layers.mask|6,M.layers.mask=B.layers.mask&3,S.layers.mask=B.layers.mask&5;let xt=O.parent,vt=B.cameras;At(B,xt);for(let Ut=0;Ut<vt.length;Ut++)At(vt[Ut],xt);vt.length===2?Ft(B,M,S):B.projectionMatrix.copy(M.projectionMatrix),X(O,B,xt)};function X(O,C,H){H===null?O.matrix.copy(C.matrixWorld):(O.matrix.copy(H.matrixWorld),O.matrix.invert(),O.matrix.multiply(C.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(C.projectionMatrix),O.projectionMatrixInverse.copy(C.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Ms*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(O){c=O,f!==null&&(f.fixedFoveation=O),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(O){return p[O]};let et=null;function at(O,C){if(h=C.getViewerPose(l||o),g=C,h!==null){let H=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let xt=!1;H.length!==B.cameras.length&&(B.cameras.length=0,xt=!0);for(let I=0;I<H.length;I++){let Wt=H[I],Pt=null;if(d!==null)Pt=d.getViewport(Wt);else{let Vt=u.getViewSubImage(f,Wt);Pt=Vt.viewport,I===0&&(t.setRenderTargetTextures(x,Vt.colorTexture,Vt.depthStencilTexture),t.setRenderTarget(x))}let Bt=D[I];Bt===void 0&&(Bt=new Ge,Bt.layers.enable(I),Bt.viewport=new Te,D[I]=Bt),Bt.matrix.fromArray(Wt.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(Wt.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),I===0&&(B.matrix.copy(Bt.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),xt===!0&&B.cameras.push(Bt)}let vt=s.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let I=u.getDepthInformation(H[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(vt&&vt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let I=0;I<H.length;I++){let Wt=H[I].camera;if(Wt){let Pt=p[Wt];Pt||(Pt=new ko,p[Wt]=Pt);let Bt=u.getCameraImage(Wt);Pt.sourceTexture=Bt}}}}for(let H=0;H<T.length;H++){let xt=w[H],vt=T[H];xt!==null&&vt!==void 0&&vt.update(xt,C,l||o)}et&&et(O,C),C.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:C}),g=null}let ut=new Qp;ut.setAnimationLoop(at),this.setAnimationLoop=function(O){et=O},this.dispose=function(){}}},Hs=new Gn,SM=new ie;qr=class{constructor(t={}){let{canvas:e=yp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,b=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=ke;let w=0,A=0,N=null,M=-1,S=null,D=new Te,B=new Te,k=null,K=new ee(0),st=0,W=e.width,Mt=e.height,j=1,It=null,Ft=null,At=new Te(0,0,W,Mt),X=new Te(0,0,W,Mt),et=!1,at=new Cr,ut=!1,O=!1,C=new ie,H=new P,xt=new Te,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ut=!1;function $t(){return N===null?j:1}let I=n;function Wt(E,Y){return e.getContext(E,Y)}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",lt,!1),I===null){let Y="webgl2";if(I=Wt(Y,E),I===null)throw Wt(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Pt,Bt,Vt,be,zt,qt,me,de,R,v,J,Q,_t,ft,Yt,tt,Et,U,F,z,ct,nt,ot,yt;function L(){Pt=new Vy(I),Pt.init(),nt=new yM(I,Pt),Bt=new Uy(I,Pt,t,nt),Vt=new _M(I,Pt),Bt.reversedDepthBuffer&&f&&Vt.buffers.depth.setReversed(!0),be=new Xy(I),zt=new sM,qt=new xM(I,Pt,Vt,zt,Bt,nt,be),me=new Oy(x),de=new Hy(x),R=new j0(I),ot=new Dy(I,R),v=new Gy(I,R,be,ot),J=new Yy(I,v,R,be),F=new qy(I,Bt,qt),tt=new Fy(zt),Q=new iM(x,me,de,Pt,Bt,ot,tt),_t=new bM(x,zt),ft=new oM,Yt=new fM(Pt),U=new Ly(x,me,de,Vt,J,d,c),Et=new mM(x,J,Bt),yt=new EM(I,be,Bt,Vt),z=new Ny(I,Pt,be),ct=new Wy(I,Pt,be),be.programs=Q.programs,x.capabilities=Bt,x.extensions=Pt,x.properties=zt,x.renderLists=ft,x.shadowMap=Et,x.state=Vt,x.info=be}L();let it=new Pu(x,I);this.xr=it,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let E=Pt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Pt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(E){E!==void 0&&(j=E,this.setSize(W,Mt,!1))},this.getSize=function(E){return E.set(W,Mt)},this.setSize=function(E,Y,rt=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,Mt=Y,e.width=Math.floor(E*j),e.height=Math.floor(Y*j),rt===!0&&(e.style.width=E+"px",e.style.height=Y+"px"),this.setViewport(0,0,E,Y)},this.getDrawingBufferSize=function(E){return E.set(W*j,Mt*j).floor()},this.setDrawingBufferSize=function(E,Y,rt){W=E,Mt=Y,j=rt,e.width=Math.floor(E*rt),e.height=Math.floor(Y*rt),this.setViewport(0,0,E,Y)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(At)},this.setViewport=function(E,Y,rt,V){E.isVector4?At.set(E.x,E.y,E.z,E.w):At.set(E,Y,rt,V),Vt.viewport(D.copy(At).multiplyScalar(j).round())},this.getScissor=function(E){return E.copy(X)},this.setScissor=function(E,Y,rt,V){E.isVector4?X.set(E.x,E.y,E.z,E.w):X.set(E,Y,rt,V),Vt.scissor(B.copy(X).multiplyScalar(j).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(E){Vt.setScissorTest(et=E)},this.setOpaqueSort=function(E){It=E},this.setTransparentSort=function(E){Ft=E},this.getClearColor=function(E){return E.copy(U.getClearColor())},this.setClearColor=function(){U.setClearColor(...arguments)},this.getClearAlpha=function(){return U.getClearAlpha()},this.setClearAlpha=function(){U.setClearAlpha(...arguments)},this.clear=function(E=!0,Y=!0,rt=!0){let V=0;if(E){let $=!1;if(N!==null){let St=N.texture.format;$=St===jc||St===Kc||St===Zc}if($){let St=N.texture.type,Ot=St===si||St===is||St===Or||St===kr||St===qc||St===Yc,Xt=U.getClearColor(),Gt=U.getClearAlpha(),ne=Xt.r,Qt=Xt.g,Kt=Xt.b;Ot?(g[0]=ne,g[1]=Qt,g[2]=Kt,g[3]=Gt,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=ne,_[1]=Qt,_[2]=Kt,_[3]=Gt,I.clearBufferiv(I.COLOR,0,_))}else V|=I.COLOR_BUFFER_BIT}Y&&(V|=I.DEPTH_BUFFER_BIT),rt&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),U.dispose(),ft.dispose(),Yt.dispose(),zt.dispose(),me.dispose(),de.dispose(),J.dispose(),ot.dispose(),yt.dispose(),Q.dispose(),it.dispose(),it.removeEventListener("sessionstart",Ie),it.removeEventListener("sessionend",Fn),Ke.stop()};function ht(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let E=be.autoReset,Y=Et.enabled,rt=Et.autoUpdate,V=Et.needsUpdate,$=Et.type;L(),be.autoReset=E,Et.enabled=Y,Et.autoUpdate=rt,Et.needsUpdate=V,Et.type=$}function lt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function q(E){let Y=E.target;Y.removeEventListener("dispose",q),pt(Y)}function pt(E){Ht(E),zt.remove(E)}function Ht(E){let Y=zt.get(E).programs;Y!==void 0&&(Y.forEach(function(rt){Q.releaseProgram(rt)}),E.isShaderMaterial&&Q.releaseShaderCache(E))}this.renderBufferDirect=function(E,Y,rt,V,$,St){Y===null&&(Y=vt);let Ot=$.isMesh&&$.matrixWorld.determinant()<0,Xt=Zl(E,Y,rt,V,$);Vt.setMaterial(V,Ot);let Gt=rt.index,ne=1;if(V.wireframe===!0){if(Gt=v.getWireframeAttribute(rt),Gt===void 0)return;ne=2}let Qt=rt.drawRange,Kt=rt.attributes.position,re=Qt.start*ne,Ee=(Qt.start+Qt.count)*ne;St!==null&&(re=Math.max(re,St.start*ne),Ee=Math.min(Ee,(St.start+St.count)*ne)),Gt!==null?(re=Math.max(re,0),Ee=Math.min(Ee,Gt.count)):Kt!=null&&(re=Math.max(re,0),Ee=Math.min(Ee,Kt.count));let Oe=Ee-re;if(Oe<0||Oe===1/0)return;ot.setup($,V,Xt,rt,Gt);let De,ge=z;if(Gt!==null&&(De=R.get(Gt),ge=ct,ge.setIndex(De)),$.isMesh)V.wireframe===!0?(Vt.setLineWidth(V.wireframeLinewidth*$t()),ge.setMode(I.LINES)):ge.setMode(I.TRIANGLES);else if($.isLine){let jt=V.linewidth;jt===void 0&&(jt=1),Vt.setLineWidth(jt*$t()),$.isLineSegments?ge.setMode(I.LINES):$.isLineLoop?ge.setMode(I.LINE_LOOP):ge.setMode(I.LINE_STRIP)}else $.isPoints?ge.setMode(I.POINTS):$.isSprite&&ge.setMode(I.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)br("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ge.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(Pt.get("WEBGL_multi_draw"))ge.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let jt=$._multiDrawStarts,Ne=$._multiDrawCounts,ue=$._multiDrawCount,un=Gt?R.get(Gt).bytesPerElement:1,G=zt.get(V).currentProgram.getUniforms();for(let Z=0;Z<ue;Z++)G.setValue(I,"_gl_DrawID",Z),ge.render(jt[Z]/un,Ne[Z])}else if($.isInstancedMesh)ge.renderInstances(re,Oe,$.count);else if(rt.isInstancedBufferGeometry){let jt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Ne=Math.min(rt.instanceCount,jt);ge.renderInstances(re,Oe,Ne)}else ge.render(re,Oe)};function Zt(E,Y,rt){E.transparent===!0&&E.side===Se&&E.forceSinglePass===!1?(E.side=ln,E.needsUpdate=!0,Zn(E,Y,rt),E.side=ei,E.needsUpdate=!0,Zn(E,Y,rt),E.side=Se):Zn(E,Y,rt)}this.compile=function(E,Y,rt=null){rt===null&&(rt=E),p=Yt.get(rt),p.init(Y),y.push(p),rt.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),E!==rt&&E.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),p.setupLights();let V=new Set;return E.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let St=$.material;if(St)if(Array.isArray(St))for(let Ot=0;Ot<St.length;Ot++){let Xt=St[Ot];Zt(Xt,rt,$),V.add(Xt)}else Zt(St,rt,$),V.add(St)}),p=y.pop(),V},this.compileAsync=function(E,Y,rt=null){let V=this.compile(E,Y,rt);return new Promise($=>{function St(){if(V.forEach(function(Ot){zt.get(Ot).currentProgram.isReady()&&V.delete(Ot)}),V.size===0){$(E);return}setTimeout(St,10)}Pt.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let Jt=null;function ae(E){Jt&&Jt(E)}function Ie(){Ke.stop()}function Fn(){Ke.start()}let Ke=new Qp;Ke.setAnimationLoop(ae),typeof self<"u"&&Ke.setContext(self),this.setAnimationLoop=function(E){Jt=E,it.setAnimationLoop(E),E===null?Ke.stop():Ke.start()},it.addEventListener("sessionstart",Ie),it.addEventListener("sessionend",Fn),this.render=function(E,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(Y),Y=it.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,Y,N),p=Yt.get(E,y.length),p.init(Y),y.push(p),C.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),at.setFromProjectionMatrix(C,ti,Y.reversedDepth),O=this.localClippingEnabled,ut=tt.init(this.clippingPlanes,O),m=ft.get(E,b.length),m.init(),b.push(m),it.enabled===!0&&it.isPresenting===!0){let St=x.xr.getDepthSensingMesh();St!==null&&On(St,Y,-1/0,x.sortObjects)}On(E,Y,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(It,Ft),Ut=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Ut&&U.addToRenderList(m,E),this.info.render.frame++,ut===!0&&tt.beginShadows();let rt=p.state.shadowsArray;Et.render(rt,E,Y),ut===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,$=m.transmissive;if(p.setupLights(),Y.isArrayCamera){let St=Y.cameras;if($.length>0)for(let Ot=0,Xt=St.length;Ot<Xt;Ot++){let Gt=St[Ot];In(V,$,E,Gt)}Ut&&U.render(E);for(let Ot=0,Xt=St.length;Ot<Xt;Ot++){let Gt=St[Ot];on(m,E,Gt,Gt.viewport)}}else $.length>0&&In(V,$,E,Y),Ut&&U.render(E),on(m,E,Y);N!==null&&A===0&&(qt.updateMultisampleRenderTarget(N),qt.updateRenderTargetMipmap(N)),E.isScene===!0&&E.onAfterRender(x,E,Y),ot.resetDefaultState(),M=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],ut===!0&&tt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function On(E,Y,rt,V){if(E.visible===!1)return;if(E.layers.test(Y.layers)){if(E.isGroup)rt=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(Y);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||at.intersectsSprite(E)){V&&xt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(C);let Ot=J.update(E),Xt=E.material;Xt.visible&&m.push(E,Ot,Xt,rt,xt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||at.intersectsObject(E))){let Ot=J.update(E),Xt=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),xt.copy(E.boundingSphere.center)):(Ot.boundingSphere===null&&Ot.computeBoundingSphere(),xt.copy(Ot.boundingSphere.center)),xt.applyMatrix4(E.matrixWorld).applyMatrix4(C)),Array.isArray(Xt)){let Gt=Ot.groups;for(let ne=0,Qt=Gt.length;ne<Qt;ne++){let Kt=Gt[ne],re=Xt[Kt.materialIndex];re&&re.visible&&m.push(E,Ot,re,rt,xt.z,Kt)}}else Xt.visible&&m.push(E,Ot,Xt,rt,xt.z,null)}}let St=E.children;for(let Ot=0,Xt=St.length;Ot<Xt;Ot++)On(St[Ot],Y,rt,V)}function on(E,Y,rt,V){let $=E.opaque,St=E.transmissive,Ot=E.transparent;p.setupLightsView(rt),ut===!0&&tt.setGlobalState(x.clippingPlanes,rt),V&&Vt.viewport(D.copy(V)),$.length>0&&oi($,Y,rt),St.length>0&&oi(St,Y,rt),Ot.length>0&&oi(Ot,Y,rt),Vt.buffers.depth.setTest(!0),Vt.buffers.depth.setMask(!0),Vt.buffers.color.setMask(!0),Vt.setPolygonOffset(!1)}function In(E,Y,rt,V){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Vn(1,1,{generateMipmaps:!0,type:Pt.has("EXT_color_buffer_half_float")||Pt.has("EXT_color_buffer_float")?Br:si,minFilter:ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xe.workingColorSpace}));let St=p.state.transmissionRenderTarget[V.id],Ot=V.viewport||D;St.setSize(Ot.z*x.transmissionResolutionScale,Ot.w*x.transmissionResolutionScale);let Xt=x.getRenderTarget(),Gt=x.getActiveCubeFace(),ne=x.getActiveMipmapLevel();x.setRenderTarget(St),x.getClearColor(K),st=x.getClearAlpha(),st<1&&x.setClearColor(16777215,.5),x.clear(),Ut&&U.render(rt);let Qt=x.toneMapping;x.toneMapping=Bi;let Kt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),ut===!0&&tt.setGlobalState(x.clippingPlanes,V),oi(E,rt,V),qt.updateMultisampleRenderTarget(St),qt.updateRenderTargetMipmap(St),Pt.has("WEBGL_multisampled_render_to_texture")===!1){let re=!1;for(let Ee=0,Oe=Y.length;Ee<Oe;Ee++){let De=Y[Ee],ge=De.object,jt=De.geometry,Ne=De.material,ue=De.group;if(Ne.side===Se&&ge.layers.test(V.layers)){let un=Ne.side;Ne.side=ln,Ne.needsUpdate=!0,Bn(ge,rt,V,jt,Ne,ue),Ne.side=un,Ne.needsUpdate=!0,re=!0}}re===!0&&(qt.updateMultisampleRenderTarget(St),qt.updateRenderTargetMipmap(St))}x.setRenderTarget(Xt,Gt,ne),x.setClearColor(K,st),Kt!==void 0&&(V.viewport=Kt),x.toneMapping=Qt}function oi(E,Y,rt){let V=Y.isScene===!0?Y.overrideMaterial:null;for(let $=0,St=E.length;$<St;$++){let Ot=E[$],Xt=Ot.object,Gt=Ot.geometry,ne=Ot.group,Qt=Ot.material;Qt.allowOverride===!0&&V!==null&&(Qt=V),Xt.layers.test(rt.layers)&&Bn(Xt,Y,rt,Gt,Qt,ne)}}function Bn(E,Y,rt,V,$,St){E.onBeforeRender(x,Y,rt,V,$,St),E.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),$.onBeforeRender(x,Y,rt,V,E,St),$.transparent===!0&&$.side===Se&&$.forceSinglePass===!1?($.side=ln,$.needsUpdate=!0,x.renderBufferDirect(rt,Y,V,$,E,St),$.side=ei,$.needsUpdate=!0,x.renderBufferDirect(rt,Y,V,$,E,St),$.side=Se):x.renderBufferDirect(rt,Y,V,$,E,St),E.onAfterRender(x,Y,rt,V,$,St)}function Zn(E,Y,rt){Y.isScene!==!0&&(Y=vt);let V=zt.get(E),$=p.state.lights,St=p.state.shadowsArray,Ot=$.state.version,Xt=Q.getParameters(E,$.state,St,Y,rt),Gt=Q.getProgramCacheKey(Xt),ne=V.programs;V.environment=E.isMeshStandardMaterial?Y.environment:null,V.fog=Y.fog,V.envMap=(E.isMeshStandardMaterial?de:me).get(E.envMap||V.environment),V.envMapRotation=V.environment!==null&&E.envMap===null?Y.environmentRotation:E.envMapRotation,ne===void 0&&(E.addEventListener("dispose",q),ne=new Map,V.programs=ne);let Qt=ne.get(Gt);if(Qt!==void 0){if(V.currentProgram===Qt&&V.lightsStateVersion===Ot)return fe(E,Xt),Qt}else Xt.uniforms=Q.getUniforms(E),E.onBeforeCompile(Xt,x),Qt=Q.acquireProgram(Xt,Gt),ne.set(Gt,Qt),V.uniforms=Xt.uniforms;let Kt=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Kt.clippingPlanes=tt.uniform),fe(E,Xt),V.needsLights=Sa(E),V.lightsStateVersion=Ot,V.needsLights&&(Kt.ambientLightColor.value=$.state.ambient,Kt.lightProbe.value=$.state.probe,Kt.directionalLights.value=$.state.directional,Kt.directionalLightShadows.value=$.state.directionalShadow,Kt.spotLights.value=$.state.spot,Kt.spotLightShadows.value=$.state.spotShadow,Kt.rectAreaLights.value=$.state.rectArea,Kt.ltc_1.value=$.state.rectAreaLTC1,Kt.ltc_2.value=$.state.rectAreaLTC2,Kt.pointLights.value=$.state.point,Kt.pointLightShadows.value=$.state.pointShadow,Kt.hemisphereLights.value=$.state.hemi,Kt.directionalShadowMap.value=$.state.directionalShadowMap,Kt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Kt.spotShadowMap.value=$.state.spotShadowMap,Kt.spotLightMatrix.value=$.state.spotLightMatrix,Kt.spotLightMap.value=$.state.spotLightMap,Kt.pointShadowMap.value=$.state.pointShadowMap,Kt.pointShadowMatrix.value=$.state.pointShadowMatrix),V.currentProgram=Qt,V.uniformsList=null,Qt}function Ma(E){if(E.uniformsList===null){let Y=E.currentProgram.getUniforms();E.uniformsList=Wr.seqWithValue(Y.seq,E.uniforms)}return E.uniformsList}function fe(E,Y){let rt=zt.get(E);rt.outputColorSpace=Y.outputColorSpace,rt.batching=Y.batching,rt.batchingColor=Y.batchingColor,rt.instancing=Y.instancing,rt.instancingColor=Y.instancingColor,rt.instancingMorph=Y.instancingMorph,rt.skinning=Y.skinning,rt.morphTargets=Y.morphTargets,rt.morphNormals=Y.morphNormals,rt.morphColors=Y.morphColors,rt.morphTargetsCount=Y.morphTargetsCount,rt.numClippingPlanes=Y.numClippingPlanes,rt.numIntersection=Y.numClipIntersection,rt.vertexAlphas=Y.vertexAlphas,rt.vertexTangents=Y.vertexTangents,rt.toneMapping=Y.toneMapping}function Zl(E,Y,rt,V,$){Y.isScene!==!0&&(Y=vt),qt.resetTextureUnits();let St=Y.fog,Ot=V.isMeshStandardMaterial?Y.environment:null,Xt=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:cn,Gt=(V.isMeshStandardMaterial?de:me).get(V.envMap||Ot),ne=V.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,Qt=!!rt.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Kt=!!rt.morphAttributes.position,re=!!rt.morphAttributes.normal,Ee=!!rt.morphAttributes.color,Oe=Bi;V.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Oe=x.toneMapping);let De=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,ge=De!==void 0?De.length:0,jt=zt.get(V),Ne=p.state.lights;if(ut===!0&&(O===!0||E!==S)){let dt=E===S&&V.id===M;tt.setState(V,E,dt)}let ue=!1;V.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==Ne.state.version||jt.outputColorSpace!==Xt||$.isBatchedMesh&&jt.batching===!1||!$.isBatchedMesh&&jt.batching===!0||$.isBatchedMesh&&jt.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&jt.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&jt.instancing===!1||!$.isInstancedMesh&&jt.instancing===!0||$.isSkinnedMesh&&jt.skinning===!1||!$.isSkinnedMesh&&jt.skinning===!0||$.isInstancedMesh&&jt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&jt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&jt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&jt.instancingMorph===!1&&$.morphTexture!==null||jt.envMap!==Gt||V.fog===!0&&jt.fog!==St||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==tt.numPlanes||jt.numIntersection!==tt.numIntersection)||jt.vertexAlphas!==ne||jt.vertexTangents!==Qt||jt.morphTargets!==Kt||jt.morphNormals!==re||jt.morphColors!==Ee||jt.toneMapping!==Oe||jt.morphTargetsCount!==ge)&&(ue=!0):(ue=!0,jt.__version=V.version);let un=jt.currentProgram;ue===!0&&(un=Zn(V,Y,$));let G=!1,Z=!1,bt=!1,gt=un.getUniforms(),wt=jt.uniforms;if(Vt.useProgram(un.program)&&(G=!0,Z=!0,bt=!0),V.id!==M&&(M=V.id,Z=!0),G||S!==E){Vt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),gt.setValue(I,"projectionMatrix",E.projectionMatrix),gt.setValue(I,"viewMatrix",E.matrixWorldInverse);let Tt=gt.map.cameraPosition;Tt!==void 0&&Tt.setValue(I,H.setFromMatrixPosition(E.matrixWorld)),Bt.logarithmicDepthBuffer&&gt.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&gt.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,Z=!0,bt=!0)}if($.isSkinnedMesh){gt.setOptional(I,$,"bindMatrix"),gt.setOptional(I,$,"bindMatrixInverse");let dt=$.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),gt.setValue(I,"boneTexture",dt.boneTexture,qt))}$.isBatchedMesh&&(gt.setOptional(I,$,"batchingTexture"),gt.setValue(I,"batchingTexture",$._matricesTexture,qt),gt.setOptional(I,$,"batchingIdTexture"),gt.setValue(I,"batchingIdTexture",$._indirectTexture,qt),gt.setOptional(I,$,"batchingColorTexture"),$._colorsTexture!==null&&gt.setValue(I,"batchingColorTexture",$._colorsTexture,qt));let Rt=rt.morphAttributes;if((Rt.position!==void 0||Rt.normal!==void 0||Rt.color!==void 0)&&F.update($,rt,un),(Z||jt.receiveShadow!==$.receiveShadow)&&(jt.receiveShadow=$.receiveShadow,gt.setValue(I,"receiveShadow",$.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(wt.envMap.value=Gt,wt.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&Y.environment!==null&&(wt.envMapIntensity.value=Y.environmentIntensity),Z&&(gt.setValue(I,"toneMappingExposure",x.toneMappingExposure),jt.needsLights&&Hi(wt,bt),St&&V.fog===!0&&_t.refreshFogUniforms(wt,St),_t.refreshMaterialUniforms(wt,V,j,Mt,p.state.transmissionRenderTarget[E.id]),Wr.upload(I,Ma(jt),wt,qt)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Wr.upload(I,Ma(jt),wt,qt),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&gt.setValue(I,"center",$.center),gt.setValue(I,"modelViewMatrix",$.modelViewMatrix),gt.setValue(I,"normalMatrix",$.normalMatrix),gt.setValue(I,"modelMatrix",$.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let dt=V.uniformsGroups;for(let Tt=0,Nt=dt.length;Tt<Nt;Tt++){let te=dt[Tt];yt.update(te,un),yt.bind(te,un)}}return un}function Hi(E,Y){E.ambientLightColor.needsUpdate=Y,E.lightProbe.needsUpdate=Y,E.directionalLights.needsUpdate=Y,E.directionalLightShadows.needsUpdate=Y,E.pointLights.needsUpdate=Y,E.pointLightShadows.needsUpdate=Y,E.spotLights.needsUpdate=Y,E.spotLightShadows.needsUpdate=Y,E.rectAreaLights.needsUpdate=Y,E.hemisphereLights.needsUpdate=Y}function Sa(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(E,Y,rt){let V=zt.get(E);V.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),zt.get(E.texture).__webglTexture=Y,zt.get(E.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:rt,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,Y){let rt=zt.get(E);rt.__webglFramebuffer=Y,rt.__useDefaultFramebuffer=Y===void 0};let Vi=I.createFramebuffer();this.setRenderTarget=function(E,Y=0,rt=0){N=E,w=Y,A=rt;let V=!0,$=null,St=!1,Ot=!1;if(E){let Gt=zt.get(E);if(Gt.__useDefaultFramebuffer!==void 0)Vt.bindFramebuffer(I.FRAMEBUFFER,null),V=!1;else if(Gt.__webglFramebuffer===void 0)qt.setupRenderTarget(E);else if(Gt.__hasExternalTextures)qt.rebindTextures(E,zt.get(E.texture).__webglTexture,zt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Kt=E.depthTexture;if(Gt.__boundDepthTexture!==Kt){if(Kt!==null&&zt.has(Kt)&&(E.width!==Kt.image.width||E.height!==Kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");qt.setupDepthRenderbuffer(E)}}let ne=E.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Ot=!0);let Qt=zt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Qt[Y])?$=Qt[Y][rt]:$=Qt[Y],St=!0):E.samples>0&&qt.useMultisampledRTT(E)===!1?$=zt.get(E).__webglMultisampledFramebuffer:Array.isArray(Qt)?$=Qt[rt]:$=Qt,D.copy(E.viewport),B.copy(E.scissor),k=E.scissorTest}else D.copy(At).multiplyScalar(j).floor(),B.copy(X).multiplyScalar(j).floor(),k=et;if(rt!==0&&($=Vi),Vt.bindFramebuffer(I.FRAMEBUFFER,$)&&V&&Vt.drawBuffers(E,$),Vt.viewport(D),Vt.scissor(B),Vt.setScissorTest(k),St){let Gt=zt.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Gt.__webglTexture,rt)}else if(Ot){let Gt=Y;for(let ne=0;ne<E.textures.length;ne++){let Qt=zt.get(E.textures[ne]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+ne,Qt.__webglTexture,rt,Gt)}}else if(E!==null&&rt!==0){let Gt=zt.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Gt.__webglTexture,rt)}M=-1},this.readRenderTargetPixels=function(E,Y,rt,V,$,St,Ot,Xt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ot!==void 0&&(Gt=Gt[Ot]),Gt){Vt.bindFramebuffer(I.FRAMEBUFFER,Gt);try{let ne=E.textures[Xt],Qt=ne.format,Kt=ne.type;if(!Bt.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=E.width-V&&rt>=0&&rt<=E.height-$&&(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Xt),I.readPixels(Y,rt,V,$,nt.convert(Qt),nt.convert(Kt),St))}finally{let ne=N!==null?zt.get(N).__webglFramebuffer:null;Vt.bindFramebuffer(I.FRAMEBUFFER,ne)}}},this.readRenderTargetPixelsAsync=async function(E,Y,rt,V,$,St,Ot,Xt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ot!==void 0&&(Gt=Gt[Ot]),Gt)if(Y>=0&&Y<=E.width-V&&rt>=0&&rt<=E.height-$){Vt.bindFramebuffer(I.FRAMEBUFFER,Gt);let ne=E.textures[Xt],Qt=ne.format,Kt=ne.type;if(!Bt.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,re),I.bufferData(I.PIXEL_PACK_BUFFER,St.byteLength,I.STREAM_READ),E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Xt),I.readPixels(Y,rt,V,$,nt.convert(Qt),nt.convert(Kt),0);let Ee=N!==null?zt.get(N).__webglFramebuffer:null;Vt.bindFramebuffer(I.FRAMEBUFFER,Ee);let Oe=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await vp(I,Oe,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,re),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,St),I.deleteBuffer(re),I.deleteSync(Oe),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,Y=null,rt=0){let V=Math.pow(2,-rt),$=Math.floor(E.image.width*V),St=Math.floor(E.image.height*V),Ot=Y!==null?Y.x:0,Xt=Y!==null?Y.y:0;qt.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,rt,0,0,Ot,Xt,$,St),Vt.unbindTexture()};let oo=I.createFramebuffer(),$s=I.createFramebuffer();this.copyTextureToTexture=function(E,Y,rt=null,V=null,$=0,St=null){St===null&&($!==0?(br("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),St=$,$=0):St=0);let Ot,Xt,Gt,ne,Qt,Kt,re,Ee,Oe,De=E.isCompressedTexture?E.mipmaps[St]:E.image;if(rt!==null)Ot=rt.max.x-rt.min.x,Xt=rt.max.y-rt.min.y,Gt=rt.isBox3?rt.max.z-rt.min.z:1,ne=rt.min.x,Qt=rt.min.y,Kt=rt.isBox3?rt.min.z:0;else{let Rt=Math.pow(2,-$);Ot=Math.floor(De.width*Rt),Xt=Math.floor(De.height*Rt),E.isDataArrayTexture?Gt=De.depth:E.isData3DTexture?Gt=Math.floor(De.depth*Rt):Gt=1,ne=0,Qt=0,Kt=0}V!==null?(re=V.x,Ee=V.y,Oe=V.z):(re=0,Ee=0,Oe=0);let ge=nt.convert(Y.format),jt=nt.convert(Y.type),Ne;Y.isData3DTexture?(qt.setTexture3D(Y,0),Ne=I.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(qt.setTexture2DArray(Y,0),Ne=I.TEXTURE_2D_ARRAY):(qt.setTexture2D(Y,0),Ne=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,Y.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,Y.unpackAlignment);let ue=I.getParameter(I.UNPACK_ROW_LENGTH),un=I.getParameter(I.UNPACK_IMAGE_HEIGHT),G=I.getParameter(I.UNPACK_SKIP_PIXELS),Z=I.getParameter(I.UNPACK_SKIP_ROWS),bt=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,De.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,De.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ne),I.pixelStorei(I.UNPACK_SKIP_ROWS,Qt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Kt);let gt=E.isDataArrayTexture||E.isData3DTexture,wt=Y.isDataArrayTexture||Y.isData3DTexture;if(E.isDepthTexture){let Rt=zt.get(E),dt=zt.get(Y),Tt=zt.get(Rt.__renderTarget),Nt=zt.get(dt.__renderTarget);Vt.bindFramebuffer(I.READ_FRAMEBUFFER,Tt.__webglFramebuffer),Vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer);for(let te=0;te<Gt;te++)gt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,zt.get(E).__webglTexture,$,Kt+te),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,zt.get(Y).__webglTexture,St,Oe+te)),I.blitFramebuffer(ne,Qt,Ot,Xt,re,Ee,Ot,Xt,I.DEPTH_BUFFER_BIT,I.NEAREST);Vt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if($!==0||E.isRenderTargetTexture||zt.has(E)){let Rt=zt.get(E),dt=zt.get(Y);Vt.bindFramebuffer(I.READ_FRAMEBUFFER,oo),Vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,$s);for(let Tt=0;Tt<Gt;Tt++)gt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rt.__webglTexture,$,Kt+Tt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Rt.__webglTexture,$),wt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dt.__webglTexture,St,Oe+Tt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dt.__webglTexture,St),$!==0?I.blitFramebuffer(ne,Qt,Ot,Xt,re,Ee,Ot,Xt,I.COLOR_BUFFER_BIT,I.NEAREST):wt?I.copyTexSubImage3D(Ne,St,re,Ee,Oe+Tt,ne,Qt,Ot,Xt):I.copyTexSubImage2D(Ne,St,re,Ee,ne,Qt,Ot,Xt);Vt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else wt?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(Ne,St,re,Ee,Oe,Ot,Xt,Gt,ge,jt,De.data):Y.isCompressedArrayTexture?I.compressedTexSubImage3D(Ne,St,re,Ee,Oe,Ot,Xt,Gt,ge,De.data):I.texSubImage3D(Ne,St,re,Ee,Oe,Ot,Xt,Gt,ge,jt,De):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,St,re,Ee,Ot,Xt,ge,jt,De.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,St,re,Ee,De.width,De.height,ge,De.data):I.texSubImage2D(I.TEXTURE_2D,St,re,Ee,Ot,Xt,ge,jt,De);I.pixelStorei(I.UNPACK_ROW_LENGTH,ue),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,un),I.pixelStorei(I.UNPACK_SKIP_PIXELS,G),I.pixelStorei(I.UNPACK_SKIP_ROWS,Z),I.pixelStorei(I.UNPACK_SKIP_IMAGES,bt),St===0&&Y.generateMipmaps&&I.generateMipmap(Ne),Vt.unbindTexture()},this.initRenderTarget=function(E){zt.get(E).__webglFramebuffer===void 0&&qt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?qt.setTextureCube(E,0):E.isData3DTexture?qt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?qt.setTexture2DArray(E,0):qt.setTexture2D(E,0),Vt.unbindTexture()},this.resetState=function(){w=0,A=0,N=null,Vt.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=xe._getDrawingBufferColorSpace(t),e.unpackColorSpace=xe._getUnpackColorSpace()}}});function wM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function AM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function RM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(om),this.state=Le.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function CM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Wn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Le.DOLLY;break;case Wn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Le.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Le.ROTATE}break;case Wn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Le.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Le.PAN}break;default:this.state=Le.NONE}this.state!==Le.NONE&&this.dispatchEvent(Nu)}function IM(i){switch(this.state){case Le.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Le.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function PM(i){this.enabled===!1||this.enableZoom===!1||this.state!==Le.NONE||(i.preventDefault(),this.dispatchEvent(Nu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(om))}function LM(i){this.enabled!==!1&&this._handleKeyDown(i)}function DM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Rn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Le.TOUCH_ROTATE;break;case Rn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Le.TOUCH_PAN;break;default:this.state=Le.NONE}break;case 2:switch(this.touches.TWO){case Rn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Le.TOUCH_DOLLY_PAN;break;case Rn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Le.TOUCH_DOLLY_ROTATE;break;default:this.state=Le.NONE}break;default:this.state=Le.NONE}this.state!==Le.NONE&&this.dispatchEvent(Nu)}function NM(i){switch(this._trackPointer(i),this.state){case Le.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Le.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Le.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Le.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Le.NONE}}function UM(i){this.enabled!==!1&&i.preventDefault()}function FM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function OM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var sm,Nu,om,Pl,rm,TM,sn,Cn,Le,Du,Ll,am=qe(()=>{qn();sm={type:"change"},Nu={type:"start"},om={type:"end"},Pl=new ui,rm=new En,TM=Math.cos(70*Bs.DEG2RAD),sn=new P,Cn=2*Math.PI,Le={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Du=1e-6,Ll=class extends ia{constructor(t,e=null){super(t,e),this.state=Le.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wn.ROTATE,MIDDLE:Wn.DOLLY,RIGHT:Wn.PAN},this.touches={ONE:Rn.ROTATE,TWO:Rn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Mn,this._lastTargetPosition=new P,this._quat=new Mn().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ur,this._sphericalDelta=new Ur,this._scale=1,this._panOffset=new P,this._rotateStart=new Ct,this._rotateEnd=new Ct,this._rotateDelta=new Ct,this._panStart=new Ct,this._panEnd=new Ct,this._panDelta=new Ct,this._dollyStart=new Ct,this._dollyEnd=new Ct,this._dollyDelta=new Ct,this._dollyDirection=new P,this._mouse=new Ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=AM.bind(this),this._onPointerDown=wM.bind(this),this._onPointerUp=RM.bind(this),this._onContextMenu=UM.bind(this),this._onMouseWheel=PM.bind(this),this._onKeyDown=LM.bind(this),this._onTouchStart=DM.bind(this),this._onTouchMove=NM.bind(this),this._onMouseDown=CM.bind(this),this._onMouseMove=IM.bind(this),this._interceptControlDown=FM.bind(this),this._interceptControlUp=OM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sm),this.update(),this.state=Le.NONE}update(t=null){let e=this.object.position;sn.copy(e).sub(this.target),sn.applyQuaternion(this._quat),this._spherical.setFromVector3(sn),this.autoRotate&&this.state===Le.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Cn:n>Math.PI&&(n-=Cn),s<-Math.PI?s+=Cn:s>Math.PI&&(s-=Cn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(sn.setFromSpherical(this._spherical),sn.applyQuaternion(this._quatInverse),e.copy(this.target).add(sn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=sn.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=sn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Pl.origin.copy(this.object.position),Pl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pl.direction))<TM?this.object.lookAt(this.target):(rm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pl.intersectPlane(rm,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Du||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Du||this._lastTargetPosition.distanceToSquared(this.target)>Du?(this.dispatchEvent(sm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Cn/60*this.autoRotateSpeed*t:Cn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){sn.setFromMatrixColumn(e,0),sn.multiplyScalar(-t),this._panOffset.add(sn)}_panUp(t,e){this.screenSpacePanning===!0?sn.setFromMatrixColumn(e,1):(sn.setFromMatrixColumn(e,0),sn.crossVectors(this.object.up,sn)),sn.multiplyScalar(t),this._panOffset.add(sn)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;sn.copy(s).sub(this.target);let r=sn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ct,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}});var Dl,cm=qe(()=>{qn();am();Dl=class extends Ll{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:Wn.PAN,MIDDLE:Wn.DOLLY,RIGHT:Wn.ROTATE},this.touches={ONE:Rn.PAN,TWO:Rn.DOLLY_ROTATE}}}});function hm(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Pe,l=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=lm(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][f]);let g=lm(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function lm(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Fe(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let _=h.getComponent(f,g);a.setComponent(f+u,g,_)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Uu(i,t){if(t===au)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Hr||t===la){let e=i.getIndex();if(e===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=e.count-2,s=[];if(t===Hr)for(let o=1;o<=n;o++)s.push(e.getX(0)),s.push(e.getX(o)),s.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(e.getX(o)),s.push(e.getX(o+1)),s.push(e.getX(o+2))):(s.push(e.getX(o+2)),s.push(e.getX(o+1)),s.push(e.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}var Fu=qe(()=>{qn()});function BM(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}function HM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new gn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ei})),i.DefaultMaterial}function Ws(i,t,e){for(let n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function yi(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function VM(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,h=t.length;l<h;l++){let u=t[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=t.length;l<h;l++){let u=t[l];if(n){let f=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function GM(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){let e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function WM(i){let t,e=i.extensions&&i.extensions[pe.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+ku(e.attributes):t=i.indices+":"+ku(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+ku(i.targets[n]);return t}function ku(i){let t="",e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function uf(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function XM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}function YM(i,t,e){let n=t.attributes,s=new Sn;if(n.POSITION!==void 0){let a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){let h=uf($r[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=t.targets;if(r!==void 0){let a=new P,c=new P;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=e.json.accessors[u.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let _=uf($r[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Tn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function pm(i,t,e){let n=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=hf[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(t.indices!==void 0&&!i.index){let o=e.getDependency("accessor",t.indices).then(function(a){i.setIndex(a)});s.push(o)}return xe.workingColorSpace!==cn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xe.workingColorSpace}" not supported.`),yi(i,t),YM(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?VM(i,t.targets,e):i})}var Nl,pe,zu,Hu,Vu,Gu,Wu,Xu,qu,Yu,$u,Zu,Ku,ju,Ju,Qu,tf,ef,nf,sf,mm,fa,um,rf,of,af,cf,Ul,kM,lf,Yn,$r,fm,dm,Ou,hf,ss,zM,Bu,qM,ff,gm=qe(()=>{qn();Fu();Nl=class extends gi{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Gu(e)}),this.register(function(e){return new Wu(e)}),this.register(function(e){return new Qu(e)}),this.register(function(e){return new tf(e)}),this.register(function(e){return new ef(e)}),this.register(function(e){return new qu(e)}),this.register(function(e){return new Yu(e)}),this.register(function(e){return new $u(e)}),this.register(function(e){return new Zu(e)}),this.register(function(e){return new Vu(e)}),this.register(function(e){return new Ku(e)}),this.register(function(e){return new Xu(e)}),this.register(function(e){return new Ju(e)}),this.register(function(e){return new ju(e)}),this.register(function(e){return new zu(e)}),this.register(function(e){return new nf(e)}),this.register(function(e){return new sf(e)})}load(t,e,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Fi.extractUrlBase(t);o=Fi.resolveURL(l,this.path)}else o=Fi.extractUrlBase(t);this.manager.itemStart(t);let a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new Nr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(h){e(h),r.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r,o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===mm){try{o[pe.KHR_BINARY_GLTF]=new rf(t)}catch(u){s&&s(u);return}r=JSON.parse(o[pe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ff(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case pe.KHR_MATERIALS_UNLIT:o[u]=new Hu;break;case pe.KHR_DRACO_MESH_COMPRESSION:o[u]=new of(r,this.dracoLoader);break;case pe.KHR_TEXTURE_TRANSFORM:o[u]=new af;break;case pe.KHR_MESH_QUANTIZATION:o[u]=new cf;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}};pe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},zu=class{constructor(t){this.parser=t,this.name=pe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){let r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){let e=this.parser,n="light:"+t,s=e.cache.get(n);if(s)return s;let r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t],l,h=new ee(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],cn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ns(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ds(h),l.distance=u;break;case"spot":l=new ta(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),yi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){let e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}},Hu=class{constructor(){this.name=pe.KHR_MATERIALS_UNLIT}getMaterialType(){return we}extendParams(t,e,n){let s=[];t.color=new ee(1,1,1),t.opacity=1;let r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],cn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,ke))}return Promise.all(s)}},Vu=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}},Gu=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Ct(a,a)}return Promise.all(r)}},Wu=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_DISPERSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Xu=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},qu=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_SHEEN}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];e.sheenColor=new ee(0,0,0),e.sheenRoughness=0,e.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],cn)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,ke)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Yu=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},$u=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_VOLUME}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return e.attenuationColor=new ee().setRGB(a[0],a[1],a[2],cn),Promise.all(r)}},Zu=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_IOR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Ku=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_SPECULAR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return e.specularColor=new ee().setRGB(a[0],a[1],a[2],cn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,ke)),Promise.all(r)}},ju=class{constructor(t){this.parser=t,this.name=pe.EXT_MATERIALS_BUMP}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}},Ju=class{constructor(t){this.parser=t,this.name=pe.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:wn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Qu=class{constructor(t){this.parser=t,this.name=pe.KHR_TEXTURE_BASISU}loadTexture(t){let e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}},tf=class{constructor(t){this.parser=t,this.name=pe.EXT_TEXTURE_WEBP}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},ef=class{constructor(t){this.parser=t,this.name=pe.EXT_TEXTURE_AVIF}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},nf=class{constructor(t){this.name=pe.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){let e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},sf=class{constructor(t){this.name=pe.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){let e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=e.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Yn.TRIANGLES&&l.mode!==Yn.TRIANGLE_STRIP&&l.mode!==Yn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let g of u){let _=new ie,m=new P,p=new Mn,b=new P(1,1,1),y=new bs(g.geometry,g.material,f);for(let x=0;x<f;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&b.fromBufferAttribute(c.SCALE,x),y.setMatrixAt(x,_.compose(m,p,b));for(let x in c)if(x==="_COLOR_0"){let T=c[x];y.instanceColor=new ts(T.array,T.itemSize,T.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);Ce.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},mm="glTF",fa=12,um={JSON:1313821514,BIN:5130562},rf=class{constructor(t){this.name=pe.KHR_BINARY_GLTF,this.content=null,this.body=null;let e=new DataView(t,0,fa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==mm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-fa,r=new DataView(t,fa),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===um.JSON){let l=new Uint8Array(t,fa+o,a);this.content=n.decode(l)}else if(c===um.BIN){let l=fa+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},of=class{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=pe.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){let n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=hf[h]||h.toLowerCase();a[u]=o[h]}for(let h in t.attributes){let u=hf[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[t.attributes[h]],d=$r[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let g in d.attributes){let _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(d)},a,l,cn,f)})})}},af=class{constructor(){this.name=pe.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}},cf=class{constructor(){this.name=pe.KHR_MESH_QUANTIZATION}},Ul=class extends Li{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-e,u=(n-e)/h,f=u*u,d=f*u,g=t*l,_=g-l,m=-2*d+3*f,p=d-f,b=1-m,y=p-f+u;for(let x=0;x!==a;x++){let T=o[_+x+a],w=o[_+x+c]*h,A=o[g+x+a],N=o[g+x]*h;r[x]=b*T+y*w+m*A+p*N}return r}},kM=new Mn,lf=class extends Ul{interpolate_(t,e,n,s){let r=super.interpolate_(t,e,n,s);return kM.fromArray(r).normalize().toArray(r),r}},Yn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},$r={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fm={9728:an,9729:vn,9984:Wc,9985:Fr,9986:Os,9987:ii},dm={33071:ci,33648:vr,10497:Hn},Ou={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},hf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ss={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},zM={CUBICSPLINE:void 0,LINEAR:vs,STEP:ys},Bu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};qM=new ie,ff=class{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new BM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Jo(this.options.manager):this.textureLoader=new ea(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Nr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Ws(r,a,s),yi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){let t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){let o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){let o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){let e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){let s=t(e[n]);if(s)return s}return null}_invokeAll(t){let e=Object.values(this.plugins);e.unshift(this);let n=[];for(let s=0;s<e.length;s++){let r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){let n=t+":"+e,s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){let n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){let e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[pe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Fi.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){let e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){let s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){let e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){let o=Ou[s.type],a=$r[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Fe(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Ou[s.type],l=$r[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,_,m;if(d&&d!==u){let p=Math.floor(f/d),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,y=e.cache.get(b);y||(_=new l(a,p*d,s.count*d/h),y=new Ss(_,d/h),e.cache.add(b,y)),m=new Qi(y,c,f%d/h,g)}else a===null?_=new l(s.count*c):_=new l(a,f,s.count*c),m=new Fe(_,c,g);if(s.sparse!==void 0){let p=Ou.SCALAR,b=$r[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,T=new b(o[1],y,s.sparse.count*p),w=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new Fe(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,N=T.length;A<N;A++){let M=T[A];if(m.setX(M,w[A*c]),c>=2&&m.setY(M,w[A*c+1]),c>=3&&m.setZ(M,w[A*c+2]),c>=4&&m.setW(M,w[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){let e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){let s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=fm[f.magFilter]||vn,h.minFilter=fm[f.minFilter]||ii,h.wrapS=dm[f.wrapS]||Hn,h.wrapT=dm[f.wrapT]||Hn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==an&&h.minFilter!==vn,s.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){let n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());let o=s.images[t],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let g=f;e.isImageBitmapLoader===!0&&(g=function(_){let m=new tn(_);m.needsUpdate=!0,f(m)}),e.load(Fi.resolveURL(u,r.path),g,void 0,d)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),yi(u,o),u.userData.mimeType=o.mimeType||XM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[pe.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[pe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[pe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){let e=t.geometry,n=t.material,s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ir,mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new es,mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return gn}loadMaterial(t){let e=this,n=this.json,s=this.extensions,r=n.materials[t],o,a={},c=r.extensions||{},l=[];if(c[pe.KHR_MATERIALS_UNLIT]){let u=s[pe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,e))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new ee(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],cn),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",u.baseColorTexture,ke)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=Se);let h=r.alphaMode||Bu.OPAQUE;if(h===Bu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Bu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==we&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ct(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==we&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==we){let u=r.emissiveFactor;a.emissive=new ee().setRGB(u[0],u[1],u[2],cn)}return r.emissiveTexture!==void 0&&o!==we&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,ke)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),yi(u,r),e.associations.set(u,{materials:t}),r.extensions&&Ws(s,u,r),u})}createUniqueName(t){let e=Ue.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){let e=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[pe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return pm(c,a,e)})}let o=[];for(let a=0,c=t.length;a<c;a++){let l=t[a],h=WM(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[pe.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=pm(new Pe,l,e),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){let e=this,n=this.json,s=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?HM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,g=h.length;d<g;d++){let _=h[d],m=o[d],p,b=l[d];if(m.mode===Yn.TRIANGLES||m.mode===Yn.TRIANGLE_STRIP||m.mode===Yn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Do(_,b):new se(_,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Yn.TRIANGLE_STRIP?p.geometry=Uu(p.geometry,la):m.mode===Yn.TRIANGLE_FAN&&(p.geometry=Uu(p.geometry,Hr));else if(m.mode===Yn.LINES)p=new Ts(_,b);else if(m.mode===Yn.LINE_STRIP)p=new Es(_,b);else if(m.mode===Yn.LINE_LOOP)p=new Fo(_,b);else if(m.mode===Yn.POINTS)p=new Oo(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&GM(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),yi(p,r),m.extensions&&Ws(s,p,m),e.assignFinalMaterial(p),u.push(p)}for(let d=0,g=u.length;d<g;d++)e.associations.set(u[d],{meshes:t,primitives:d});if(u.length===1)return r.extensions&&Ws(s,u[0],r),u[0];let f=new Ye;r.extensions&&Ws(s,f,r),e.associations.set(f,{meshes:t});for(let d=0,g=u.length;d<g;d++)f.add(u[d]);return f})}loadCamera(t){let e,n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new Ge(Bs.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new Ui(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),yi(e,n),Promise.resolve(e)}loadSkin(t){let e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new ie;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Uo(a,c)})}loadAnimation(t){let e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],g=s.samplers[d.sampler],_=d.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",b)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,x=f.length;y<x;y++){let T=f[y],w=d[y],A=g[y],N=_[y],M=m[y];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let S=n._createAnimationTracks(T,w,A,N,M);if(S)for(let D=0;D<S.length;D++)p.push(S[D])}let b=new jo(r,void 0,p);return yi(b,s),b})}createNodeMesh(t){let e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){let e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,qM)});for(let d=0,g=u.length;d<g;d++)h.add(u[d]);return h})}_loadNodeShallow(t){let e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];let r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Rr:l.length>1?h=new Ye:l.length===1?h=l[0]:h=new Ce,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),yi(h,r),r.extensions&&Ws(n,h,r),r.matrix!==void 0){let u=new ie;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){let e=this.extensions,n=this.json.scenes[t],s=this,r=new Ye;n.name&&(r.name=s.createUniqueName(n.name)),yi(r,n),n.extensions&&Ws(e,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof mn||f instanceof tn)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){let o=[],a=t.name?t.name:t.uuid,c=[];ss[r.path]===ss.weights?t.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(ss[r.path]){case ss.weights:l=di;break;case ss.rotation:l=pi;break;case ss.translation:case ss.scale:l=mi;break;default:switch(n.itemSize){case 1:l=di;break;case 2:case 3:default:l=mi;break}break}let h=s.interpolation!==void 0?zM[s.interpolation]:vs,u=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+ss[r.path],e.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){let n=uf(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){let s=this instanceof pi?lf:Ul;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var Kr,Zr,_m,xm,ym,vm,Fl,Mm=qe(()=>{qn();Kr=class extends Ce{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ct(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},Zr=new P,_m=new ie,xm=new ie,ym=new P,vm=new P,Fl=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),_m.copy(_.matrixWorldInverse),xm.multiplyMatrices(_.projectionMatrix,_m),h(g,g,_),d(g)},this.setSize=function(g,_){n=g,s=_,r=n/2,o=s/2,c.style.width=g+"px",c.style.height=_+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)l(g.children[_])}function h(g,_,m){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){Zr.setFromMatrixPosition(g.matrixWorld),Zr.applyMatrix4(xm);let p=Zr.z>=-1&&Zr.z<=1&&g.layers.test(m.layers)===!0,b=g.element;b.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,_,m),b.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Zr.x*r+r)+"px,"+(-Zr.y*o+o)+"px)",b.parentNode!==c&&c.appendChild(b),g.onAfterRender(e,_,m));let y={distanceToCameraSquared:u(m,g)};a.objects.set(g,y)}for(let p=0,b=g.children.length;p<b;p++)h(g.children[p],_,m)}function u(g,_){return ym.setFromMatrixPosition(g.matrixWorld),vm.setFromMatrixPosition(_.matrixWorld),ym.distanceToSquared(vm)}function f(g){let _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function d(g){let _=f(g).sort(function(p,b){if(p.renderOrder!==b.renderOrder)return b.renderOrder-p.renderOrder;let y=a.objects.get(p).distanceToCameraSquared,x=a.objects.get(b).distanceToCameraSquared;return y-x}),m=_.length;for(let p=0,b=_.length;p<b;p++)_[p].element.style.zIndex=m-p}}}});function Sm(i,{width:t,height:e,fov:n=38,direction:s}={}){let r=t<e,o=s?.clone().normalize()||new P(r?-Math.sin(.5):0,Math.cos(.5),r?0:Math.sin(.5)),a=new P().crossVectors(new P(0,1,0),o).normalize(),c=new P().crossVectors(o,a).normalize(),l=i.getCenter(new P),h=Math.tan(Bs.degToRad(n/2)),u=h*t/e,f=10;for(let d of[i.min.x,i.max.x])for(let g of[i.min.y,i.max.y])for(let _ of[i.min.z,i.max.z]){let m=new P(d,g,_).sub(l),p=m.dot(o);f=Math.max(f,p+(Math.abs(m.dot(a))+2)/u*1.12,p+(Math.abs(m.dot(c))+2)/h*1.12)}return{target:l,position:l.clone().addScaledVector(o,f),distance:f}}var bm=qe(()=>{qn()});var Em={};hg(Em,{RoomEnvironment:()=>df});function jr(i){return new Pi({color:0,emissive:16777215,emissiveIntensity:i})}var df,Tm=qe(()=>{qn();df=class extends ni{constructor(){super();let t=new Ji;t.deleteAttribute("uv");let e=new gn({side:ln}),n=new gn,s=new Ds(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new se(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new bs(t,n,6),a=new Ce;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new se(t,jr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new se(t,jr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new se(t,jr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new se(t,jr(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new se(t,jr(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let d=new se(t,jr(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}}});function vi(i){let t=i>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function zi(i,t){let e=document.createElement("canvas");e.width=e.height=i;let n=e.getContext("2d");t(n,i);let s=new Ii(e);return s.wrapS=s.wrapT=Hn,s.colorSpace=ke,s}function pf(i,t,e,n,s,r,o){i.fillStyle=hn(n),i.fillRect(0,0,t,t);for(let a=0;a<s;a++){let c=o[Math.floor(e()*o.length)];i.fillStyle=hn(c[0],c[1]);let l=r[0]+e()*(r[1]-r[0]);i.beginPath(),i.arc(e()*t,e()*t,l,0,Math.PI*2),i.fill()}}function ZM(i,t,e,n,s){let r=(o,a,c)=>Math.abs(i-o)<4&&Math.abs(t-a)<4&&Math.abs(e-c)<4;return s==="C"?r(255,255,255)?"light":r(244,244,238)?"ceiling":"plain":r(216,210,198)||r(203,200,192)?n?"floor":"plain":r(168,171,168)?"inlay":r(236,228,205)?"wall":r(62,56,50)?"base":r(152,192,150)?"door":r(105,112,112)||r(170,174,178)?"metal":r(150,96,58)||r(150,110,80)?"wood":r(205,200,190)||r(244,244,238)?"stone":r(40,48,52)?"dark":"plain"}function KM(i){var s;if(mf)return mf;let t=Math.min(4,i.capabilities.getMaxAnisotropy()),e={},n={};for(let[r,o]of Object.entries(wm)){if(o.emissive){n[r]=new gn({color:16777215,emissive:16776176,emissiveIntensity:.9,side:Se});continue}let c=(e[s=o.tex]||(e[s]=$M[o.tex]())).clone();c.needsUpdate=!0,o.fit||c.repeat.set(1/o.m,1/o.m),c.anisotropy=t,n[r]=new gn({vertexColors:!o.fit,map:c,roughness:o.rough,metalness:o.metal||0,side:Se})}return mf=n,n}function Am(i){return Promise.resolve().then(()=>(Tm(),Em)).then(({RoomEnvironment:t})=>{let e=new Xr(i),n=e.fromScene(new t,.04).texture;return e.dispose(),n})}function gf(i){let t=i.geometry.index?i.geometry.toNonIndexed():i.geometry;t.computeVertexNormals(),t!==i.geometry&&i.geometry.dispose(),i.geometry=t}function Rm(){return new gn({color:13624302,roughness:.05,metalness:.1,transparent:!0,opacity:.32,side:Se,depthWrite:!1,envMapIntensity:1.4})}function Cm(i,t,e={},n={}){let s=n.elevDoors||[],r=KM(t),o=i.geometry.index?i.geometry.toNonIndexed():i.geometry,a=o.getAttribute("position"),c=o.getAttribute("color"),l=a.count/3,h=i.name[0],u=Object.keys(wm),f=new Uint8Array(l),d=new P,g=new P,_=new P,m=new P,p=new P,b=u.map(()=>[]);for(let k=0;k<l;k++){d.fromBufferAttribute(a,3*k),g.fromBufferAttribute(a,3*k+1),_.fromBufferAttribute(a,3*k+2),m.subVectors(_,g).cross(p.subVectors(g,d)).normalize();let K=Math.abs(m.y)>.7,st=Math.round(c.getX(3*k)*255),W=Math.round(c.getY(3*k)*255),Mt=Math.round(c.getZ(3*k)*255),j=ZM(st,W,Mt,K,h);if(j==="wood"&&!K&&s.length&&st===150&&W===110){let Ft=(d.x+g.x+_.x)/3,At=-(d.z+g.z+_.z)/3;s.some(X=>Math.hypot(X[0]-Ft,X[1]-At)<1.6)&&(j="elevDoor")}let It=u.indexOf(j);f[k]=It,b[It].push(k)}let y=new Float32Array(a.count*3),x=new Float32Array(a.count*3),T=new Float32Array(a.count*3),w=new Float32Array(a.count*2),A=new Map,N=u.indexOf("elevDoor");for(let k of b[N]||[]){d.fromBufferAttribute(a,3*k);let K=d.x,st=-d.z,W=s.reduce((Mt,j,It)=>Math.hypot(j[0]-K,j[1]-st)<Math.hypot(s[Mt][0]-K,s[Mt][1]-st)?It:Mt,0);A.set(k,W)}let M=s.map(()=>({x0:1/0,x1:-1/0,z0:1/0,z1:-1/0,y0:1/0,y1:-1/0}));for(let[k,K]of A){let st=M[K];for(let W=0;W<3;W++)d.fromBufferAttribute(a,3*k+W),st.x0=Math.min(st.x0,d.x),st.x1=Math.max(st.x1,d.x),st.z0=Math.min(st.z0,d.z),st.z1=Math.max(st.z1,d.z),st.y0=Math.min(st.y0,d.y),st.y1=Math.max(st.y1,d.y)}for(let k of M){let K=k.x1-k.x0>=k.z1-k.z0;k.u0=K?k.x0:k.z0,k.u1=K?k.x1:k.z1,k.n=K?"z":"x"}let S=new Pe,D=[],B=0;for(let k=0;k<u.length;k++){if(!b[k].length)continue;let K=B;for(let W of b[k]){d.fromBufferAttribute(a,3*W),g.fromBufferAttribute(a,3*W+1),_.fromBufferAttribute(a,3*W+2),m.subVectors(_,g).cross(p.subVectors(g,d)).normalize();let Mt=Math.abs(m.x),j=Math.abs(m.y),It=Math.abs(m.z);for(let Ft=0;Ft<3;Ft++){let At=3*W+Ft,X=a.getX(At),et=a.getY(At),at=a.getZ(At);if(y.set([X,et,at],B*3),x.set([c.getX(At),c.getY(At),c.getZ(At)],B*3),k===N?T.set([-m.x,-m.y,-m.z],B*3):T.set([m.x,m.y,m.z],B*3),k===N&&A.has(W)){let ut=M[A.get(W)],O=ut.n==="x"?at:X;w.set([(O-ut.u0)/Math.max(1e-6,ut.u1-ut.u0),(et-ut.y0)/Math.max(1e-6,ut.y1-ut.y0)],B*2)}else j>=Mt&&j>=It?w.set([X,-at],B*2):Mt>=It?w.set([-at,et],B*2):w.set([X,et],B*2);B++}}S.addGroup(K,B-K,D.length);let st=r[u[k]];D.push(Object.keys(e).length?Object.assign(st.clone(),e):st)}S.setAttribute("position",new Fe(y,3)),S.setAttribute("color",new Fe(x,3)),S.setAttribute("normal",new Fe(T,3)),S.setAttribute("uv",new Fe(w,2)),S.computeBoundingSphere(),S.computeBoundingBox(),i.geometry.dispose(),o!==i.geometry&&o.dispose(),i.geometry=S,i.material=D}var hn,$M,wm,mf,Xs,Im=qe(()=>{qn();hn=(i,t=1)=>`rgba(${i},${i},${i},${t})`;$M={floor:(i=512)=>zi(i,t=>{let e=vi(11);pf(t,i,e,236,5200,[.5,1.6],[[150,.55],[120,.45],[255,.7],[196,.6],[170,.5]]);let n=i/2;for(let s=0;s<2;s++)for(let r=0;r<2;r++){let o=.92+e()*.08;t.fillStyle=hn(Math.round(255*o),.18),t.fillRect(s*n,r*n,n,n)}t.fillStyle=hn(150,.9);for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),inlay:(i=256)=>zi(i,t=>{let e=vi(23);pf(t,i,e,205,2600,[.5,1.4],[[90,.6],[255,.5],[140,.5]])}),wall:(i=256)=>zi(i,t=>{let e=vi(5);t.fillStyle=hn(248),t.fillRect(0,0,i,i);for(let n=0;n<160;n++)t.fillStyle=hn(e()<.5?232:255,.08),t.beginPath(),t.ellipse(e()*i,e()*i,6+e()*26,4+e()*14,e()*3,0,Math.PI*2),t.fill()}),ceiling:(i=256)=>zi(i,t=>{let e=vi(7);t.fillStyle=hn(250),t.fillRect(0,0,i,i),t.fillStyle=hn(200,.6);for(let s=0;s<1400;s++)t.fillRect(Math.floor(e()*i),Math.floor(e()*i),1,1);t.fillStyle=hn(190);let n=i/2;for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),door:(i=256)=>zi(i,t=>{let e=vi(13);t.fillStyle=hn(246),t.fillRect(0,0,i,i);for(let n=0;n<90;n++)t.fillStyle=hn(e()<.5?228:255,.25),t.fillRect(e()*i,0,1+e()*2,i)}),metal:(i=128)=>zi(i,t=>{let e=vi(17);t.fillStyle=hn(236),t.fillRect(0,0,i,i);for(let n=0;n<120;n++)t.fillStyle=hn(e()<.5?205:255,.35),t.fillRect(0,e()*i,i,1)}),wood:(i=256)=>zi(i,t=>{let e=vi(19);t.fillStyle=hn(232),t.fillRect(0,0,i,i);for(let n=0;n<70;n++){t.strokeStyle=hn(e()<.6?190:255,.35),t.lineWidth=1+e()*2,t.beginPath();let s=e()*i;t.moveTo(0,s);for(let r=0;r<=i;r+=16)t.lineTo(r,s+Math.sin(r/40+n)*3);t.stroke()}}),stone:(i=256)=>zi(i,t=>{let e=vi(29);pf(t,i,e,240,2600,[.5,1.5],[[160,.5],[120,.4],[255,.6]])}),elevDoor:()=>{let i=document.createElement("canvas");i.width=256,i.height=512;let t=i.getContext("2d"),e=vi(41),n=t.createLinearGradient(0,0,256,0);n.addColorStop(0,"#d2b06a"),n.addColorStop(.25,"#f0d699"),n.addColorStop(.5,"#e1c07c"),n.addColorStop(.75,"#f6dea4"),n.addColorStop(1,"#d2b06a"),t.fillStyle=n,t.fillRect(0,0,256,512);for(let r=0;r<260;r++)t.fillStyle=e()<.5?"rgba(255,240,200,0.10)":"rgba(90,60,20,0.08)",t.fillRect(e()*256,0,1,512);t.fillStyle="rgba(60,40,15,0.55)",t.fillRect(0,0,3,512),t.fillRect(253,0,3,512),t.fillStyle="#2a1d0c",t.fillRect(126,0,4,512),t.fillStyle="rgba(255,236,190,0.55)",t.fillRect(123,0,2,512),t.fillRect(131,0,2,512);let s=new Ii(i);return s.colorSpace=ke,s},plain:(i=128)=>zi(i,t=>{let e=vi(31);t.fillStyle=hn(246),t.fillRect(0,0,i,i);for(let n=0;n<500;n++)t.fillStyle=hn(e()<.5?230:255,.3),t.fillRect(e()*i,e()*i,1,1)})},wm={floor:{tex:"floor",m:1.2,rough:.42},inlay:{tex:"inlay",m:.8,rough:.36},wall:{tex:"wall",m:2.4,rough:.82},ceiling:{tex:"ceiling",m:1.2,rough:.92},base:{tex:"plain",m:1,rough:.45},door:{tex:"door",m:1,rough:.5},metal:{tex:"metal",m:.6,rough:.38,metal:.55},wood:{tex:"wood",m:.8,rough:.55},stone:{tex:"stone",m:1.2,rough:.42},dark:{tex:"plain",m:1,rough:.15,metal:.2},light:{emissive:!0},elevDoor:{tex:"elevDoor",fit:!0,rough:.3,metal:.35},plain:{tex:"plain",m:1.5,rough:.7}};mf=null;Xs={hemi:1.15,sun:.55,env:.4,exposure:1.1,mapExposure:1.4}});function Pm(i,t,{onPick:e}={}){let{M:n,FL:s}=t,r=Math.min(devicePixelRatio,2),o=Math.min(r,1.25),a=new qr({antialias:devicePixelRatio<1.5,alpha:!1,powerPreference:"high-performance"});a.setPixelRatio(r);let c=r,l=-1e9;function h(U){U!==c&&(c=U,a.setPixelRatio(U),a.setSize(i.clientWidth,i.clientHeight,!1))}a.toneMapping=Hc,a.toneMappingExposure=Xs.mapExposure,i.appendChild(a.domElement);let u=new Fl;Object.assign(u.domElement.style,{position:"absolute",inset:"0",pointerEvents:"none"}),i.appendChild(u.domElement);let f=new ni;f.background=new ee(15659254),f.add(new Ls(16777215,15130834,Xs.hemi));let d=new Ns(16777215,Xs.sun);d.position.set(30,80,20),f.add(d);let g=new Ge(38,1,.5,2e3),_=new Ge(70,1,.08,600);_.rotation.order="YXZ";let m=new Dl(g,a.domElement);m.enableDamping=!0,m.dampingFactor=.12,m.screenSpacePanning=!1,m.maxPolarAngle=1.1,m.minDistance=10,m.maxDistance=170,m.touches={ONE:Rn.PAN,TWO:Rn.DOLLY_ROTATE};let p=1,b=!1,y=!0,x={},T=new Map,w=[],A=new Ye;f.add(A);let N=new Ye;f.add(N);let M=v();M.visible=!1,f.add(M);function S(){let U=i.clientWidth,F=i.clientHeight;a.setSize(U,F),u.setSize(U,F);for(let z of[g,_])z.aspect=U/F,z.updateProjectionMatrix();y=!0}new ResizeObserver(S).observe(i),S(),m.addEventListener("change",()=>y=!0);async function D(U,F){let z=await fetch(U);if(!z.ok)throw new Error(`\uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694 (${z.status})`);let ct=+z.headers.get("content-length")||0,nt;if(z.body&&ct){let yt=z.body.getReader(),L=[],it=0;for(;;){let{done:mt,value:lt}=await yt.read();if(mt)break;L.push(lt),it+=lt.length,F?.(it/ct)}nt=new Uint8Array(it);let ht=0;for(let mt of L)nt.set(mt,ht),ht+=mt.length;nt=nt.buffer}else nt=await z.arrayBuffer();let ot=await new Promise((yt,L)=>new Nl().parse(nt,"",yt,L));try{f.environment=await Am(a),f.environmentIntensity=Xs.env}catch{}ot.scene.traverse(yt=>{yt.isMesh&&(yt.name[0]==="G"?(gf(yt),yt.material=Rm()):yt.name[0]==="X"?(gf(yt),yt.material=new gn({vertexColors:!0,roughness:.9,side:Se})):Cm(yt,a,yt.name[0]==="D"?{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}:{},{elevDoors:B(+yt.name.slice(1))}),x[yt.name]=yt)}),f.add(ot.scene),ot.scene.updateMatrixWorld(!0);for(let yt of n.floors){let L=new Sn;for(let[it,ht]of Object.entries(x))it[0]!=="C"&&it[0]!=="X"&&+it.slice(1)===yt.n&&L.expandByObject(ht);L.isEmpty()||T.set(yt.n,L)}K(),k(),et(p,!0)}function B(U){return(n.floors.find(z=>z.n===U)?.doors||[]).filter(z=>z.cat==="elev"||/^EV/.test(z.id)).map(z=>z.p)}function k(){for(let U of t.destinations){let F=U.center||U.doors[0],z=document.createElement("div"),ct=U.cat==="toilet"?"WC":U.cat==="elev"?"EV":U.numbered?U.id:U.title;if(z.className="room-label"+(U.numbered?"":" icon-only"),U.cat==="toilet"){z.classList.add("restroom-label"),z.dataset.gender=/女|여/.test(U.title)?"\uC5EC":/男|남/.test(U.title)?"\uB0A8":"",z.setAttribute("role","img"),z.setAttribute("aria-label",`${U.f===0?"\uC9C0\uD558 1":U.f}\uCE35 ${U.title}`),z.title=`${U.title}${U.name?" \xB7 "+U.name:""}`;let ot=document.createElement("img");ot.src="ui/restroom.svg",ot.alt="",z.append(ot)}else z.textContent=ct;let nt=new Kr(z);nt.position.copy($n(F[0],F[1],s(U.f).z+.6)),nt.userData={d:U},nt.visible=!1,f.add(nt),w.push(nt)}}function K(){let U=new we({color:1475768,transparent:!0,opacity:.3,depthTest:!1,depthWrite:!1,side:Se,toneMapped:!1}),F=new we({color:1471913,depthTest:!1,depthWrite:!1,side:Se,toneMapped:!1});for(let z of n.floors){let ct=new Ye;ct.userData.f=z.n;for(let nt of z.rooms.filter(ot=>ot.cat==="toilet")){let ot=new ns(nt.poly.map(([it,ht])=>new Ct(it,ht))),yt=new se(new Cs(ot),U);yt.rotation.x=-Math.PI/2,yt.position.y=z.z+.1,yt.renderOrder=1,ct.add(yt);let L=new se(H(nt.poly.map(([it,ht])=>[it,ht,z.z+.11]),.12),F);L.renderOrder=2,ct.add(L)}N.add(ct)}}let st=null;function W(){let U=g.position.distanceTo(m.target),F=Math.max(130,Math.min(200,130*1440/i.clientWidth));for(let z of w){let ct=z.userData.d,nt=ct.key===st;if(z.element.classList.toggle("sel",nt),b){let ot=ct.center||ct.doors[0];z.visible=ct.f===Q.f&&Math.hypot(ot[0]-Q.x,ot[1]-Q.y)<12}else z.visible=ct.f===p&&(nt||ct.cat==="toilet"||U<(ct.numbered?F:200))}}function Mt(){N.visible=!b;for(let F of N.children)F.visible=F.userData.f===p;for(let F in x){let z=F[0],ct=+F.slice(1);z==="X"?x[F].visible=b:b?x[F].visible=Math.abs(ct-Q.f)<=1:x[F].visible=z!=="C"&&ct===p}let U=b?"walk":"map";for(let F of A.children)F.visible=F.userData.mode&&F.userData.mode!==U?!1:b?!F.isCSS2DObject||It(F):F.userData.f==null||F.userData.f===p;j(),y=!0}function j(){A.traverse(U=>{if(U.material)for(let F of Array.isArray(U.material)?U.material:[U.material])F.userData.depth0===void 0&&(F.userData.depth0=F.depthTest),F.depthTest=b||F.userData.depth0})}function It(U){if(U.userData.f!==Q.f)return!1;let F=U.position.x,z=-U.position.z;return Ft(Q.f,Q.x,Q.y,F,z)}function Ft(U,F,z,ct,nt){let ot=Math.hypot(ct-F,nt-z);if(ot>25)return!1;let yt=Math.max(1,Math.ceil(ot/.25)),L=0;for(let it=1;it<yt&&!(ot*(1-it/yt)<1);it++){let ht=it/yt;if(t.walk(U,F+(ct-F)*ht,z+(nt-z)*ht))L=0;else if(L+=ot/yt,L>.8)return!1}return!0}let At=null;function X(U,F,z=550){At={t0:performance.now(),dur:z,cam0:g.position.clone(),tgt0:m.target.clone(),cam1:U,tgt1:F},y=!0}m.addEventListener("start",()=>At=null);function et(U,F=!1,z=!1){let ct=s(p).z;p=U;let nt=s(U).z-ct;if(z&&nt&&!F){let ot=new P(0,nt,0);X((At?At.cam1:g.position).clone().add(ot),(At?At.tgt1:m.target).clone().add(ot),520)}else g.position.y+=nt,m.target.y+=nt,At&&(At.cam1.y+=nt,At.tgt1.y+=nt);F&&at({animate:z}),Mt(),W()}function at({resetOrientation:U=!0,animate:F=!1}={}){let z=T.get(p);if(!z)return;let ct=U?void 0:At?At.cam1.clone().sub(At.tgt1):g.position.clone().sub(m.target),nt=Sm(z,{width:i.clientWidth,height:i.clientHeight,fov:g.fov,direction:ct}),ot=m.enableDamping;m.enableDamping=!1,m.update(),m.enableDamping=ot,At=null,m.maxDistance=Math.max(170,nt.distance*1.4),F?X(nt.position,nt.target):(g.position.copy(nt.position),m.target.copy(nt.target),m.update()),y=!0}function ut(U,F,z,ct,nt,ot=0,yt=70){nt!==p&&et(nt);let L=s(nt).z,it=i.clientHeight,ht=Math.max(.3,(it-ot-yt)/it),mt=g.fov*Math.PI/360,lt=Math.atan(Math.tan(mt)*g.aspect),q=g.position.clone().sub(m.target).normalize(),pt=new P(-q.x,0,-q.z).normalize(),Ht=new P(-pt.z,0,pt.x),Zt=0,Jt=0;for(let[On,on]of[[U,F],[U,ct],[z,F],[z,ct]]){let In=$n(On,on,0).sub($n((U+z)/2,(F+ct)/2,0));Zt=Math.max(Zt,Math.abs(In.dot(Ht))),Jt=Math.max(Jt,Math.abs(In.dot(pt)))}Zt+=4,Jt+=4;let ae=Math.min(m.maxDistance,Math.max(18,Math.max(Jt/Math.tan(mt*ht)/Math.max(.5,-q.y),Zt/Math.tan(lt)))),Ie=$n((U+z)/2,(F+ct)/2,L),Fn=(ot-yt)/it*ae*Math.tan(mt)/Math.max(.5,-q.y),Ke=Ie.clone().addScaledVector(pt,-Fn);X(Ke.clone().addScaledVector(q,ae),Ke)}function O(U,F,z,ct=45){z!==p&&et(z);let nt=s(z).z,ot=g.position.clone().sub(m.target).setLength(ct),yt=$n(U,F,nt);X(yt.clone().add(ot),yt)}let C=null;a.domElement.addEventListener("pointerdown",U=>C=[U.clientX,U.clientY,performance.now()]),a.domElement.addEventListener("pointerup",U=>{if(!C||b||Math.hypot(U.clientX-C[0],U.clientY-C[1])>8||performance.now()-C[2]>450)return;let z=a.domElement.getBoundingClientRect(),ct=new na;ct.setFromCamera(new Ct((U.clientX-z.left)/z.width*2-1,-((U.clientY-z.top)/z.height)*2+1),g);let nt=ct.ray.intersectPlane(new En(new P(0,1,0),-s(p).z),new P);nt&&e?.(nt.x,-nt.z,p)});function H(U,F){let z=[];for(let nt=1;nt<U.length;nt++){let ot=U[nt-1],yt=U[nt],L=yt[0]-ot[0],it=yt[1]-ot[1],ht=Math.hypot(L,it);if(ht<.01)continue;let mt=-it/ht*F*.5,lt=L/ht*F*.5,q=new Pe;q.setAttribute("position",new ve([ot[0]+mt,ot[2],-(ot[1]+lt),ot[0]-mt,ot[2],-(ot[1]-lt),yt[0]+mt,yt[2],-(yt[1]+lt),yt[0]-mt,yt[2],-(yt[1]-lt)],3)),q.setIndex([0,1,2,2,1,3]),z.push(q)}for(let nt of U){let ot=new fi(F*.5,14);ot.rotateX(-Math.PI/2),ot.translate(nt[0],nt[2],-nt[1]),z.push(ot)}let ct=z.map(nt=>nt.index?nt.toNonIndexed():nt);return ct.forEach(nt=>{for(let ot of Object.keys(nt.attributes))ot!=="position"&&nt.deleteAttribute(ot)}),hm(ct)}let xt=new we({toneMapped:!1,color:rs,side:Se,depthTest:!1}),vt=new we({toneMapped:!1,color:rs,transparent:!0,opacity:.2,depthTest:!1,depthWrite:!1,side:Se}),Ut=4,$t=new we({toneMapped:!1,color:16777215,side:Se,depthTest:!1}),I=new we({toneMapped:!1,color:rs,side:Se,polygonOffset:!0,polygonOffsetFactor:-2}),Wt=new we({toneMapped:!1,color:rs,transparent:!0,opacity:.16,depthWrite:!1,side:Se,polygonOffset:!0,polygonOffsetFactor:-1}),Pt=new we({toneMapped:!1,color:16777215,side:Se,polygonOffset:!0,polygonOffsetFactor:-3});function Bt(U,F=1.4,z=.13,ct=.035){let nt=[],ot=(it,ht,mt,lt,q)=>{let pt=Math.hypot(mt-it,lt-ht)||1,Ht=-(lt-ht)/pt*ct*.5,Zt=(mt-it)/pt*ct*.5,Jt=[it+Ht,q,-(ht+Zt)],ae=[it-Ht,q,-(ht-Zt)],Ie=[mt+Ht,q,-(lt+Zt)],Fn=[mt-Ht,q,-(lt-Zt)];nt.push(...Jt,...ae,...Ie,...Ie,...ae,...Fn)},yt=F/2;for(let it=1;it<U.length;it++){let ht=U[it-1],mt=U[it],lt=Math.hypot(mt[0]-ht[0],mt[1]-ht[1]);if(lt<.01)continue;let q=(mt[0]-ht[0])/lt,pt=(mt[1]-ht[1])/lt;for(;yt<lt;){let Ht=yt/lt,Zt=ht[0]+(mt[0]-ht[0])*Ht,Jt=ht[1]+(mt[1]-ht[1])*Ht,ae=ht[2]+(mt[2]-ht[2])*Ht+.012,Ie=Zt+q*z*.5,Fn=Jt+pt*z*.5;for(let Ke of[1,-1])ot(Zt-q*z*.5-pt*z*.75*Ke,Jt-pt*z*.5+q*z*.75*Ke,Ie,Fn,ae);yt+=F}yt-=lt}let L=new Pe;return L.setAttribute("position",new ve(nt,3)),L}function Vt(){for(let U of[...A.children])A.remove(U),U.geometry?.dispose(),U.isCSS2DObject&&U.element.remove();y=!0}function be(U,F,z=[]){Vt(),st=F?.key||null;let ct=[],nt=null;for(let q of U.pts){if(q.kind==="elev"){nt=null;continue}if(!nt||nt.f!==q.f){let pt=nt&&nt.pts[nt.pts.length-1];nt={f:q.f,pts:pt?[pt]:[]},ct.push(nt)}nt.pts.push([q.x,q.y,q.z+.08])}for(let q of ct){if(q.pts.length<2)continue;for(let[Ht,Zt,Jt]of[[H(q.pts,1.3),vt,1],[H(q.pts,.6),xt,2],[Bt(q.pts,3.2,.34,.09),$t,3]]){let ae=new se(Ht,Zt);ae.renderOrder=Jt,ae.userData={f:q.f,mode:"map"},A.add(ae)}let pt=q.pts.map(Ht=>[Ht[0],Ht[1],Ht[2]-.05]);for(let[Ht,Zt,Jt]of[[H(pt,1),Wt,1],[H(pt,.8),I,2],[Bt(pt,1.4,.34,.07),Pt,3]]){let ae=new se(Ht,Zt);ae.renderOrder=Jt,ae.userData={f:q.f,mode:"walk"},A.add(ae)}}let ot=U.pts[0],yt=U.pts[U.pts.length-1],L=de(!0);L.scale.setScalar(Ut),L.position.copy($n(ot.x,ot.y,ot.z+.1)),L.userData={f:ot.f,mode:"map"},A.add(L);let it=R(!0);it.scale.setScalar(Ut),it.position.copy($n(yt.x,yt.y,yt.z)),it.userData={f:yt.f,mode:"map"},A.add(it);let ht=de();ht.position.copy($n(ot.x,ot.y,ot.z+.04)),ht.userData={f:ot.f,mode:"walk"},A.add(ht);let mt=R();mt.position.copy($n(yt.x,yt.y,yt.z)),mt.userData={f:yt.f,mode:"walk"},A.add(mt);let lt=U.legs;for(let q=0;q<lt.length;q++){let pt=lt[q];if(pt.kind==="walk")continue;let Ht=q>=2&&lt[q-2].kind===pt.kind&&lt[q-2].id===pt.id&&lt[q-1].pts.length<=3,Zt=q+2<lt.length&&lt[q+2].kind===pt.kind&&lt[q+2].id===pt.id&&lt[q+1].pts.length<=3,Jt=pt;for(let on=q;on+2<lt.length&&lt[on+2].kind===pt.kind&&lt[on+2].id===pt.id&&lt[on+1].pts.length<=3;on+=2)Jt=lt[on+2];let ae=pt.to>pt.from,Ie=pt.kind==="stair"?pt.link.ramp.pts[ae?0:pt.link.ramp.pts.length-1]:ae?pt.link.pa:pt.link.pb,Fn=pt.kind==="stair"?pt.link.ramp.pts[ae?pt.link.ramp.pts.length-1:0]:ae?pt.link.pb:pt.link.pa,Ke=pt.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8",On=[];Ht||On.push([Ie,pt.from,`${Ke} ${ae?"\u2191":"\u2193"} ${Jt.to===0?"B1":Jt.to+"\uCE35"}`]),Zt||On.push([Fn,pt.to,`${Ke}\uC5D0\uC11C \uB098\uC640\uC694`]);for(let[on,In,oi]of On){let Bn=document.createElement("div");Bn.className="route-tag",Bn.textContent=oi;let Zn=new Kr(Bn);Zn.position.copy($n(on[0],on[1],s(In).z+1.6)),Zn.userData.f=In,A.add(Zn)}}zt=[],z.forEach((q,pt)=>{if(q.kind==="start"||q.kind==="arrive"||!q.at)return;let Ht=document.createElement("div");Ht.className="step-dot"+(q.kind==="stair"||q.kind==="elev"?" vertical":""),Ht.textContent=pt;let Zt=new Kr(Ht);Zt.position.copy($n(q.at[0],q.at[1],s(q.f).z+.3)),Zt.userData.f=q.f,Zt.userData.step=pt,A.add(Zt),zt.push(Zt)}),Mt(),W()}let zt=[];function qt(U){for(let F of zt)F.element.classList.toggle("on",F.userData.step===U);y=!0}function me(U){st=U?U.key:null,W(),y=!0}function de(U=!1){let F=new Ye,z=new se(new Rs(.2,.28,40),new we({toneMapped:!1,color:rs,side:Se,depthTest:!U})),ct=new se(new fi(.1,24),new we({toneMapped:!1,color:rs,side:Se,depthTest:!U}));return z.rotation.x=ct.rotation.x=-Math.PI/2,U&&(z.renderOrder=ct.renderOrder=4),F.add(z,ct),F}function R(U=!1){let F=new Ye,z=new we({toneMapped:!1,color:rs,side:Se}),ct=new se(new Rs(.36,.44,48),z),nt=new se(new Rs(.2,.25,40),new we({toneMapped:!1,color:16777215,side:Se})),ot=new se(new fi(.36,48),new we({toneMapped:!1,color:rs,transparent:!0,opacity:.18,depthWrite:!1,side:Se}));for(let it of[ct,nt,ot])it.rotation.x=-Math.PI/2,it.position.y=.04;let yt=new se(new Pr(.012,.012,1.05,10),z);yt.position.y=.55;let L=new se(new Is(.12,24,16),new Pi({toneMapped:!1,color:jM,emissive:2758016}));return L.position.y=1.15,F.add(ot,ct,nt,yt,L),U&&[ot,ct,nt,yt,L].forEach((it,ht)=>{it.material=it.material.clone(),it.material.depthTest=!1,it.renderOrder=4+ht}),F}function v(){let U=new Ye,F=new se(new fi(1.4,30),new we({toneMapped:!1,color:4033535,transparent:!0,opacity:.22,depthTest:!1})),z=new se(new fi(.55,24),new we({toneMapped:!1,color:4033535,depthTest:!1})),ct=new se(new fi(2.6,24,-.45,.9),new we({toneMapped:!1,color:4033535,transparent:!0,opacity:.3,depthTest:!1}));for(let nt of[F,z,ct])nt.rotation.x=-Math.PI/2,nt.renderOrder=6;return U.add(F,ct,z),U.userData.cone=ct,U}function J(U){M.visible=!!U&&U.f===p&&!b,U&&(M.position.copy($n(U.x,U.y,s(U.f).z+.12)),M.userData.cone.visible=U.yaw!=null,M.rotation.y=(U.yaw??90)*Math.PI/180),y=!0}let Q={x:0,y:0,z:0,f:1,yaw:0,pitch:-.12};function _t(U){b=U,m.enabled=!U,a.toneMappingExposure=U?Xs.exposure:Xs.mapExposure,Mt(),W()}let ft=null;function Yt(U){Object.assign(Q,U),Q.f!==ft&&(ft=Q.f,Mt())}let tt=0,Et="";return(function U(F){if(requestAnimationFrame(U),b){let ct=`${Q.x.toFixed(3)},${Q.y.toFixed(3)},${Q.z.toFixed(3)},${Q.yaw.toFixed(2)},${Q.pitch.toFixed(3)}`,nt=ct!==Et;if(nt?(Et=ct,l=F,h(o)):c!==r&&F-l>250&&(h(r),y=!0),!nt&&!y)return;y=!1,_.position.set(Q.x,Q.z+1.6,-Q.y),_.rotation.set(Q.pitch,(Q.yaw-90)*Math.PI/180,0),a.render(f,_),F-tt>120&&(W(),tt=F),u.render(f,_);return}if(At){let ct=Math.min(1,(F-At.t0)/At.dur),nt=ct<.5?2*ct*ct:1-(-2*ct+2)**2/2;g.position.lerpVectors(At.cam0,At.cam1,nt),m.target.lerpVectors(At.tgt0,At.tgt1,nt),ct>=1&&(At=null),y=!0}m.update()||!!At?(y=!0,l=F,h(o)):c!==r&&F-l>250&&(h(r),y=!0),y&&(y=!1,F-tt>120&&(W(),tt=F),a.render(f,g),u.render(f,g))})(performance.now()),{load:D,resize:S,setFloor:et,get floor(){return p},frame:at,fit:ut,focus:O,showRoute:be,highlightStep:qt,clearRoute:Vt,select:me,setMe:J,setFirstPerson:_t,setWalkPose:Yt,nodes:x,redraw:()=>y=!0}}var rs,jM,$n,Lm=qe(()=>{qn();cm();gm();Mm();Fu();bm();Im();rs=7950591,jM=5451986,$n=(i,t,e)=>new P(i,e,-t)});function JM(){let i=[];for(let t=0;t<20;t++)for(let e=0;e<18;e++)i.push([(-18+2/2+e*2)*_f,(12-2/2-t*2)*_f]);return i}function Jr(i){return Math.atan2(i[5],i[2])}function xf(i,t,e){let n=Jr(e),s=new Float32Array(360),{data:r,w:o,h:a}=i;for(let c=0;c<Dm.length;c++){let[l,h]=Dm[c],u=n-l,f=Math.cos(h),d=f*Math.cos(u),g=f*Math.sin(u),_=Math.sin(h),m=e[0]*d+e[3]*g+e[6]*_,p=e[1]*d+e[4]*g+e[7]*_,b=e[2]*d+e[5]*g+e[8]*_;if(b<=.05){s[c]=NaN;continue}let y=t.fx*m/b+t.cx,x=t.fy*p/b+t.cy;if(y<1||x<1||y>o-2||x>a-2){s[c]=NaN;continue}let T=Math.floor(y),w=Math.floor(x),A=y-T,N=x-w,M=w*o+T;s[c]=r[M]*(1-A)*(1-N)+r[M+1]*A*(1-N)+r[M+o]*(1-A)*N+r[M+o+1]*A*N}return s}function yf(i,t,e,n){let s=Math.max(1,Math.ceil(n*2.5)),r=[],o=0;for(let l=-s;l<=s;l++){let h=Math.exp(-(l*l)/(2*n*n));r.push(h),o+=h}for(let l=0;l<r.length;l++)r[l]/=o;let a=new Float32Array(t*e),c=new Float32Array(t*e);for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=i[l*t+Math.min(t-1,Math.max(0,h+f))]*r[f+s];a[l*t+h]=u}for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=a[Math.min(e-1,Math.max(0,l+f))*t+h]*r[f+s];c[l*t+h]=u}return c}var _f,Dm,vf,Mf=qe(()=>{_f=Math.PI/180;Dm=JM();vf=i=>i*Math.tan(2*_f)*.45});function Um(i){return i.map(t=>t.kind==="stair"?{kind:"stair",fa:t.fa,pa:t.ramp.pts[0],fb:t.fb,pb:t.ramp.pts[t.ramp.pts.length-1],da:Nm(t.ramp.pts[0],t.ramp.pts[Math.min(2,t.ramp.pts.length-1)]),db:Nm(t.ramp.pts[t.ramp.pts.length-1],t.ramp.pts[Math.max(0,t.ramp.pts.length-3)])}:{kind:"elev",fa:t.fa,pa:t.pa,fb:t.fb,pb:t.pb})}var yT,Nm,Fm=qe(()=>{Mf();yT=Math.PI/180,Nm=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*180/Math.PI});function Om(i,t,e){let n=Math.floor(e*.2),s=Math.ceil(e*.8),r=new Float32Array(t);for(let l=1;l<t-1;l++){let h=0;for(let u=n;u<s;u++){let f=u*t+l;h+=Math.abs(i[f+1]-i[f-1])}r[l]=h/(s-n)}r[0]=r[1],r[t-1]=r[t-2];let o=0;for(let l of r)o+=l;o/=t;let a=0;for(let l=0;l<t;l++)r[l]-=o,a+=r[l]*r[l];let c=Math.sqrt(a/t)||1;for(let l=0;l<t;l++)r[l]/=c;return r}function Ef(i,t){let e=(d,g)=>[d[g],d[3+g],d[6+g]],n=(d,g)=>d[0]*g[0]+d[1]*g[1]+d[2]*g[2],s=e(i,0),r=e(i,1),o=e(i,2),a=e(t,2),c=e(t,0),l=n(a,s),h=n(a,r),u=n(a,o),f=n(c,r);return{yaw:Math.atan2(l,u)/Qr,pitch:Math.atan2(h,u)/Qr,roll:Math.asin(Math.max(-1,Math.min(1,f)))/Qr}}function Bm(i,t,e,n,s){let o=new Float64Array(180),a=0;for(let p=2;p<e-2;p++)for(let b=2;b<t-2;b++){let y=p*t+b,x=i[y-t+1]+2*i[y+1]+i[y+t+1]-i[y-t-1]-2*i[y-1]-i[y+t-1],T=i[y+t-1]+2*i[y+t]+i[y+t+1]-i[y-t-1]-2*i[y-t]-i[y-t+1],w=Math.hypot(x,T);if(w<90)continue;let A=(b-n.cx)/n.fx,N=(p-n.cy)/n.fy,M=Math.atan2(x,-T),S=Sf(A,N,M,n,s);if(S==null)continue;let D=Sf(A,N,M-.035,n,s),B=Sf(A,N,M+.035,n,s);if(D==null||B==null)continue;let k=Math.abs(bf(B*4,D*4))/4;if(k>6)continue;let K=S,st=Math.min(1,w/300)/(1+(k/1.5)**2),W=K*2,Mt=Math.floor(W)%180,j=W-Math.floor(W);o[Mt]+=st*(1-j),o[(Mt+1)%180]+=st*j,a++}if(a<150)return null;let c=new Float64Array(180);for(let p=0;p<180;p++){let b=0;for(let y=-6;y<=6;y++)b+=o[(p+y+180)%180]*Math.exp(-(y*y)/8);c[p]=b}let l=0;for(let p=1;p<180;p++)c[p]>c[l]&&(l=p);let h=0;for(let p=0;p<180;p++)Math.min(Math.abs(p-l),180-Math.abs(p-l))>12&&(h=Math.max(h,c[p]));let u=c[(l-1+180)%180],f=c[l],d=c[(l+1)%180],g=u-2*f+d,_=g<0?.5*(u-d)/g:0;return{axis:((l+_)/2%90+90)%90,ratio:f/(h||1e-9),n:a}}function Sf(i,t,e,n,s){let r=Math.cos(e)/n.fx,o=Math.sin(e)/n.fy,a=-o,c=r,l=i*o-t*r,h=s[0]*a+s[1]*c+s[2]*l,u=s[3]*a+s[4]*c+s[5]*l,f=s[6]*a+s[7]*c+s[8]*l,d=Math.hypot(h,u,f);h/=d,u/=d,f/=d;let g=Math.hypot(h,u);return Math.abs(f)<.25||g<.25?null:((Math.atan2(u,h)/Qr+90)%90+90)%90}var Qr,bf,Ol,da,km=qe(()=>{Qr=Math.PI/180,bf=(i,t)=>((i-t)%360+540)%360-180;Ol=class{constructor(t,e=null){this.long=t,this.prev=null,this.samples=[],this.fov=e}add(t,e,n){let s=this.prev;if(this.prev={P:t,R:e,t:n},!s||n-s.t>.35||t.length!==s.P.length)return null;let r=Ef(s.R,e);if(Math.abs(r.yaw)<3||Math.abs(r.yaw)>14||Math.abs(r.pitch)>1.5||Math.abs(r.roll)>1.5)return null;let o=t.length,a=(o-1)/2,c=r.yaw*Qr,l=-2,h=null,u=-2,f=[];for(let g=40;g<=95;g+=.5){let _=this.long/2/Math.tan(g/2*Qr),m=0,p=0;for(let y=0;y<o;y++){let x=a+_*Math.tan(Math.atan((y-a)/_)+c);if(x<0||x>o-1)continue;let T=Math.floor(x),w=x-T,A=s.P[T]*(1-w)+s.P[Math.min(o-1,T+1)]*w;m+=A*t[y],p++}if(p<o*.5)continue;let b=m/p;f.push([g,b]),b>l&&(l=b,h=g)}if(l<.75||h==null||h<=40||h>=95)return null;for(let[g,_]of f)Math.abs(g-h)>8&&(u=Math.max(u,_));if(l-u<.05)return null;let d=h;if(this.samples.push(d),this.samples.length>60&&this.samples.shift(),this.samples.length>=8){let g=[...this.samples].sort((_,m)=>_-m);this.fov=g[g.length>>1]}return this.fov}};da=class{constructor(t=24){this.N=t,this.s=[],this.value=null}add(t,e=1){return this.value!=null&&this.s.length>=6&&Math.abs(bf(t,this.value))>20?this.value:(this.s.push({v:t,w:e}),this.s.length>this.N&&this.s.shift(),this.value=this._median(),this.value)}get n(){return this.s.length}reset(){this.s=[],this.value=null}_median(){let t=this.s[0].v,e=this.s.map(r=>({v:t+bf(r.v,t),w:r.w}));e.sort((r,o)=>r.v-o.v);let n=e.reduce((r,o)=>r+o.w,0),s=0;for(let r of e)if(s+=r.w,s>=n/2)return r.v;return e[e.length-1].v}}});function tS(){try{eo=eo||new(window.AudioContext||window.webkitAudioContext);let i=eo.currentTime;for(let[t,e]of[[880,0],[660,.18]]){let n=eo.createOscillator(),s=eo.createGain();n.type="sine",n.frequency.value=t,s.gain.setValueAtTime(1e-4,i+e),s.gain.exponentialRampToValueAtTime(.18,i+e+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+e+.5),n.connect(s).connect(eo.destination),n.start(i+e),n.stop(i+e+.55)}}catch{}}function Bl({from:i,to:t,title:e,hint:n,hold:s=!1,onSkip:r}){let o=QM("#lift"),a=o.querySelector(".lift-floor"),c=o.querySelector(".lift-arrow"),l=o.querySelector(".lift-msg"),h=o.querySelector(".lift-sub"),u=o.querySelector(".lift-skip"),f=t>i,d=i,g=!1,_=!1,m=null,p=null,b,y=new Promise(A=>b=A);o.hidden=!1,o.className="lift",c.textContent=f?"\u25B2":"\u25BC",a.textContent=je(i),l.textContent=e||`${je(t)}\uB85C \uC774\uB3D9 \uC911`,h.textContent=n||"",u.hidden=!s,u.onclick=()=>{r?.(),w.arrive()},requestAnimationFrame(()=>o.classList.add("show"));function x(A){a.classList.remove("flip"),a.offsetWidth,a.textContent=je(A),a.classList.add("flip")}async function T(){for(await to(350),o.classList.add("closed"),await to(700),o.classList.add("moving");!g&&!_&&d!==t;){if(await to(1100),g||_)return;d+=f?1:-1,x(d)}}let w={finished:y,async arrive(){if(_||g)return y;for(_=!0,await p;d!==t;)d+=f?1:-1,x(d),await to(260);o.classList.remove("moving"),o.classList.add("arrived"),tS(),l.textContent=`${je(t)} \uB3C4\uCC29`,u.hidden=!0,await to(600),o.classList.remove("closed"),await to(750),w.close()},close(){g||(g=!0,b(),clearTimeout(m),o.classList.remove("show"),setTimeout(()=>o.hidden=!0,250))},get arrived(){return _}};return p=T().catch(()=>{}),s||p.then(()=>w.arrive()),w}var QM,to,eo,zm,Ze,Tf=qe(()=>{ao();QM=i=>document.querySelector(i),to=i=>new Promise(t=>setTimeout(t,i)),eo=null;zm="sai-indoor-voice",Ze={get on(){try{return localStorage.getItem(zm)==="1"}catch{return!1}},set on(i){try{localStorage.setItem(zm,i?"1":"0")}catch{}i||speechSynthesis?.cancel()},supported:typeof window<"u"&&"speechSynthesis"in window,say(i){if(!(!this.supported||!this.on||!i))try{speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(i.replace(/·/g,","));t.lang="ko-KR",t.rate=1.05,speechSynthesis.speak(t)}catch{}}}});function kl(i){let t=document.createElement("img");return t.src=`ui/${i}.svg`,t.alt="",t.setAttribute("aria-hidden","true"),t}function no(i,t,e=!1){let n=eS[t];e&&(t==="start"||t==="straight")&&(n="guide-up"),i.replaceChildren(n?kl(n):document.createTextNode(nS[t]||"\u2191")),i.setAttribute("aria-hidden","true")}var eS,nS,wf=qe(()=>{eS={start:"step-up",straight:"step-up",right:"step-right","stair-up":"step-stairs",arrive:"step-arrive"},nS={left:"\u2190","slight-left":"\u2196","slight-right":"\u2197","u-left":"\u21B6","u-right":"\u21B7","stair-down":"\u21E3",elev:"\u21C5"}});async function Hm(){try{return!!navigator.xr&&await navigator.xr.isSessionSupported("immersive-ar")}catch{return!1}}async function Vm(i,t){let e=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["local-floor"],optionalFeatures:["camera-access","dom-overlay"],domOverlay:{root:t}}),n=e.enabledFeatures,s=[];if(n&&!n.includes("camera-access")&&s.push("camera-access"),e.domOverlayState||s.push("dom-overlay"),s.length)throw await e.end().catch(()=>{}),new Error(`\uC774 \uAE30\uAE30\uC758 WebXR\uC5D0 ${s.join(", ")} \uAE30\uB2A5\uC774 \uC5C6\uC5B4\uC694`);return i.xr.enabled=!0,i.xr.setReferenceSpaceType("local-floor"),await i.xr.setSession(e),e}var zl,Gm=qe(()=>{qn();zl=class{constructor(t,e=220,n=!1){this.r=t,this.long=e,this.flip=n,this.rt=null,this.buf=null,this.mat=new Dn({uniforms:{map:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D map; varying vec2 vUv; void main(){ vec3 c = texture2D(map, vUv).rgb; float g = dot(c, vec3(0.299, 0.587, 0.114)); gl_FragColor = vec4(g, g, g, 1.0); }",depthTest:!1,depthWrite:!1}),this.scene=new ni;let s=new se(new As(2,2),this.mat);s.frustumCulled=!1,this.scene.add(s),this.cam=new Ui(-1,1,1,-1,0,1)}grab(t){let e=this.r.xr.getCameraTexture(t);if(!e||!t.width)return null;let n=this.long/Math.max(t.width,t.height),s=Math.round(t.width*n),r=Math.round(t.height*n);(!this.rt||this.rt.width!==s||this.rt.height!==r)&&(this.rt?.dispose(),this.rt=new Vn(s,r,{depthBuffer:!1}),this.buf=new Uint8Array(s*r*4)),this.mat.uniforms.map.value=e;let o=this.r,a=o.getRenderTarget(),c=o.xr.enabled;o.xr.enabled=!1,o.setRenderTarget(this.rt),o.render(this.scene,this.cam),o.readRenderTargetPixels(this.rt,0,0,s,r,this.buf),o.setRenderTarget(a),o.xr.enabled=c;let l=new Float32Array(s*r);for(let h=0;h<r;h++){let u=this.flip?h:r-1-h;for(let f=0;f<s;f++)l[h*s+f]=this.buf[(u*s+f)*4]}return{g:l,w:s,h:r}}dispose(){this.rt?.dispose(),this.mat.dispose()}}});function Wm(i){let t=l=>[l[0],-l[2],l[1]],e=t([i[0],i[1],i[2]]),n=t([i[4],i[5],i[6]]),s=t([i[8],i[9],i[10]]),r=e,o=[-n[0],-n[1],-n[2]],a=[-s[0],-s[1],-s[2]];return{R:[r[0],o[0],a[0],r[1],o[1],a[1],r[2],o[2],a[2]],x:i[12],y:-i[14],h:i[13]}}function Xm(i,t,e){return{fx:i[0]*t/2,fy:i[5]*e/2,cx:t/2*(1-i[8]),cy:e/2*(1+i[9])}}function Gl(i){return Math.atan2(i[5],i[2])/xn}function qm(i,t){let e=-i.off*xn,n=-i.tx,s=i.ty;return{rotY:e,px:Math.cos(e)*n+Math.sin(e)*s,py:t,pz:-Math.sin(e)*n+Math.cos(e)*s}}var xn,io,pa,Hl,Vl,Ym=qe(()=>{xn=Math.PI/180,io=(i,t)=>((i-t)%360+540)%360-180;pa=class i{constructor(){this.off=null,this.tx=0,this.ty=0,this.pending=null,this.n=0}get ok(){return this.off!=null}static solve(t,e,n){let s=Math.cos(n*xn),r=Math.sin(n*xn);return{off:n,tx:t.x-(s*e.x-r*e.y),ty:t.y-(r*e.x+s*e.y)}}update(t,e,n,s=.5){let r=i.solve(t,e,n);if(!this.ok)return Object.assign(this,r,{pending:null,n:1}),"set";let o=this.toBuilding(e.x,e.y),a=Math.hypot(o.x-t.x,o.y-t.y),c=io(n,this.off);if(a>3||Math.abs(c)>15){let f=this.pending;return this.pending=r,f&&Math.abs(io(f.off,r.off))<8&&Math.hypot(f.tx-r.tx,f.ty-r.ty)<2?(Object.assign(this,r,{pending:null}),this.n++,"snap"):"hold"}this.pending=null;let l=Math.min(.5,.25*s+.05),h=this.off+c*l,u={x:o.x+(t.x-o.x)*l,y:o.y+(t.y-o.y)*l};return Object.assign(this,i.solve(u,e,h)),this.n++,"blend"}toBuilding(t,e){let n=Math.cos(this.off*xn),s=Math.sin(this.off*xn);return{x:n*t-s*e+this.tx,y:s*t+n*e+this.ty}}toSensor(t,e){let n=Math.cos(this.off*xn),s=Math.sin(this.off*xn),r=t-this.tx,o=e-this.ty;return{x:n*r+s*o,y:-s*r+n*o}}},Hl=class{constructor(t=4){this.FH=t,this.ref=null,this.floorY=0,this.idx=0}shift(t){this.idx+=t}reset(t,e=null){this.ref=t,e!=null&&(this.floorY=e)}update(t){if(this.ref==null)return this.ref=t,0;let e=t-this.ref;return e>this.FH*.75?(this.ref+=this.FH,this.floorY+=this.FH,this.idx++,1):e<-this.FH*.75?(this.ref-=this.FH,this.floorY-=this.FH,this.idx--,-1):(Math.abs(e)<.4&&(this.ref+=e*.02),0)}};Vl=class{constructor({window:t=30,posTol:e=1.5,yawTol:n=20,minInliers:s=6,minSpan:r=2.5,margin:o=.6}={}){Object.assign(this,{window:t,posTol:e,yawTol:n,minInliers:s,minSpan:r,margin:o}),this.obs=[],this.best=null}add(t,e,n,s){for(s.forEach((r,o)=>this.obs.push({t,sx:e.x,sy:e.y,syaw:e.yaw,lvl:n,f:r.f,x:r.x,y:r.y,yaw:r.yaw,w:Math.max(.05,r.ncc-.3)*(o===0?1:.6)}));this.obs.length&&t-this.obs[0].t>this.window;)this.obs.shift()}clear(){this.obs=[],this.best=null}solve(){let t=this.obs,e=[];for(let a of t){let c=io(a.yaw,a.syaw),l=pa.solve({x:a.x,y:a.y},{x:a.sx,y:a.sy},c);e.push({...l,df:a.f-a.lvl,...this._score(l,a.f-a.lvl)})}e.sort((a,c)=>c.score-a.score);let n=e[0];if(!n||n.n<this.minInliers||n.span<this.minSpan)return this.best=null;let s=a=>{if(a.df!==n.df||Math.abs(io(a.off,n.off))>10)return!0;let c=t[t.length-1],l=g=>{let _=Math.cos(g.off*xn),m=Math.sin(g.off*xn);return[_*c.sx-m*c.sy+g.tx,m*c.sx+_*c.sy+g.ty]},[h,u]=l(n),[f,d]=l(a);return Math.hypot(h-f,u-d)>3},r=e.find(a=>s(a));if(r&&r.score>n.score*this.margin)return this.best=null;let o=n;for(let a=0;a<2;a++){let c=0,l=0,h=0;for(let b of o.inl){let y=io(b.yaw,b.syaw)*xn;c+=b.w*Math.cos(y),l+=b.w*Math.sin(y)}let u=Math.atan2(l,c)/xn,f=0,d=0,g=Math.cos(u*xn),_=Math.sin(u*xn);for(let b of o.inl)f+=b.w*(b.x-(g*b.sx-_*b.sy)),d+=b.w*(b.y-(_*b.sx+g*b.sy)),h+=b.w;let m={off:u,tx:f/h,ty:d/h},p=this._score(m,o.df);if(p.n<this.minInliers)break;o={...m,df:o.df,...p}}return this.best=o}_score(t,e){let n=Math.cos(t.off*xn),s=Math.sin(t.off*xn),r=0,o=0,a=[],c=1/0,l=-1/0,h=1/0,u=-1/0,f=new Set;for(let d of this.obs){if(d.f-d.lvl!==e)continue;let g=n*d.sx-s*d.sy+t.tx,_=s*d.sx+n*d.sy+t.ty,m=Math.hypot(g-d.x,_-d.y);m>this.posTol||Math.abs(io(d.yaw,d.syaw+t.off))>this.yawTol||(a.push(d),r+=d.w*(1-m/(2*this.posTol)),f.has(d.t)||(f.add(d.t),o++),c=Math.min(c,d.sx),l=Math.max(l,d.sx),h=Math.min(h,d.sy),u=Math.max(u,d.sy))}return{score:r,n:o,inl:a,span:o?Math.hypot(l-c,u-h):0}}}});function Af(i,t){let e=[Math.cos(t)*Math.cos(i),Math.cos(t)*Math.sin(i),Math.sin(t)],n=[Math.sin(i),-Math.cos(i),0],s=[Math.sin(t)*Math.cos(i),Math.sin(t)*Math.sin(i),-Math.cos(t)];return[n[0],s[0],e[0],n[1],s[1],e[1],n[2],s[2],e[2]]}function Xl(i){let t=screen.orientation&&screen.orientation.angle||window.orientation||0,e=ga(ga(Rf(i.alpha*Xe),rS(i.beta*Xe)),oS(i.gamma*Xe));return ga(ga(e,Rf(t*Xe)),aS)}async function $m(i){let{indoor:t,dest:e,mode:n,demo:s,assets:r="assets/",onClose:o,onRoute:a}=i,c=i.route,l=He("#ar"),h=He("#ar-video"),u=He("#ar-gl"),f={step:He("#ar-step-text"),sub:He("#ar-step-sub"),arrow:He("#ar-arrow"),status:He("#ar-status"),coach:He("#ar-coach"),dest:He("#ar-dest"),remain:He("#ar-remain"),err:He("#ar-error"),arrive:He("#ar-arrive"),mini:He("#ar-mini")};l.hidden=!1,f.err.hidden=!0,f.arrive.hidden=!0,f.coach.hidden=!1,f.dest.textContent=[e.name||e.title,ze(e.f)].join(" \xB7 "),He("#ar-distance").textContent=`${e.title}\uAE4C\uC9C0 ${Math.round(c.len)}m`,f.step.textContent="\uC704\uCE58\uB97C \uCC3E\uB294 \uC911",f.sub.textContent="",f.status.className="ar-status searching",f.status.textContent="\uC704\uCE58\uB97C \uCC3E\uB294 \uC911",no(f.arrow,"straight",!0),f.arrow.dataset.icon="straight",ge("searching","\uC704\uCE58\uB97C \uCC3E\uB294 \uC911");let d=!1;if(!s){try{typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?d=await DeviceOrientationEvent.requestPermission()==="granted":d="DeviceOrientationEvent"in window}catch{d=!1}try{typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()}catch{}}let g=!1,_=null,m=null,p=+new URLSearchParams(location.search).get("fov")||0,b=0;try{b=+localStorage.getItem("sai-ar-fov")||0}catch{}let y=p||b||sS,x=null,T=new URLSearchParams(location.search),w=T.has("debug"),A=!s&&!T.has("legacy")&&await Hm();async function N(){if(!window.isSecureContext)throw Object.assign(new Error("HTTPS \uC8FC\uC18C\uC5D0\uC11C\uB9CC \uCE74\uBA54\uB77C\uB97C \uC4F8 \uC218 \uC788\uC5B4\uC694."),{code:"insecure"});if(!navigator.mediaDevices?.getUserMedia)throw Object.assign(new Error("\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uCE74\uBA54\uB77C\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694."),{code:"nocam"});_=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:960},height:{ideal:720}}}),h.srcObject=_,h.loop=!1,await h.play()}async function M(){let G=await fetch(r+"demo.json").then(Z=>Z.json());m=G,h.srcObject=null,h.src=r+G.video,h.loop=!1,h.muted=!0,await h.play().catch(()=>{})}try{s?await M():A||await N()}catch(G){Ne(G);let Z=()=>{g=!0,_?.getTracks().forEach(bt=>bt.stop()),l.hidden=!0,o?.()};return He("#ar-error-close").onclick=Z,He("#ar-demo").onclick=()=>{Z(),i.onDemo?.()},{close:Z}}let S=null,D=async()=>{try{S=await navigator.wakeLock?.request("screen")}catch{}};D();let B=!1,k=()=>{document.hidden?(B=!0,m&&h.pause()):B&&(B=!1,D(),j?.postMessage({type:"reset"}),C.ok=!1,H.init=!1,m?h.play().catch(()=>{}):h.play().catch(()=>{}))};document.addEventListener("visibilitychange",k);let K=null,st=G=>{G.alpha==null||A||(K={alpha:G.alpha,beta:G.beta,gamma:G.gamma,t:performance.now()})};!m&&d&&addEventListener("deviceorientation",st);let W={on:!1,lp:9.8,hi:!1,lastT:0,lo:99,top:0},Mt=G=>{let Z=G.accelerationIncludingGravity;if(!Z||Z.x==null||A)return;W.on=!0,W.lp+=(Math.hypot(Z.x,Z.y,Z.z)-W.lp)*.25,W.lo=Math.min(W.lo,W.lp),W.top=Math.max(W.top,W.lp);let bt=performance.now();if(!W.hi&&W.lp>10.8&&bt-W.lastT>280)W.hi=!0;else if(W.hi&&W.lp<9.9){W.hi=!1,W.lastT=bt;let gt=Math.max(.45,Math.min(.85,.48*Math.pow(Math.max(.5,W.top-W.lo),.25)));W.lo=99,W.top=0;let wt=z();W.n=(W.n||0)+1,wt!=null&&It&&!qt&&(j.postMessage({type:"step",len:gt,yaw:wt}),nt(wt))}};m||addEventListener("devicemotion",Mt);let j=new Worker("ar-worker.js"),It=!1,Ft=!1,At=0,X=0;j.onmessage=G=>{let Z=G.data;Z.type==="ready"?It=!0:Z.type==="error"?Ne(new Error(`\uC704\uCE58 \uC778\uC2DD \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. ${Z.message}`)):Z.type==="pose"?(Z.id&&(Ft=!1,X=Z.ms),Z.cands&&F(Z.id,Z.cands),ct(Z.r,Z.id)):Z.type==="motion"&&ot(Z.r)};let et=t.M;j.postMessage({type:"init",indexUrl:new URL(r+"ar-index.bin",location.href).href,svUrl:new URL(r+"sv.json",location.href).href,portals:Um(t.links),grid:{gx0:et.gx0,gy1:et.gy1,cell:et.cell,gw:et.gw,gh:et.gh,floors:et.floors.map(G=>({n:G.n,grid:G.grid}))}});let at=document.createElement("canvas"),ut=at.getContext("2d",{willReadFrequently:!0});function O(){let G=h.videoWidth,Z=h.videoHeight;if(!G||!Z)return null;let bt=220/Math.max(G,Z),gt=Math.round(G*bt),wt=Math.round(Z*bt);at.width!==gt&&(at.width=gt,at.height=wt),ut.drawImage(h,0,0,gt,wt);let Rt=ut.getImageData(0,0,gt,wt).data,dt=new Float32Array(gt*wt);for(let Nt=0,te=0;Nt<dt.length;Nt++,te+=4)dt[Nt]=.299*Rt[te]+.587*Rt[te+1]+.114*Rt[te+2];let Tt;if(m){let Nt=gt/m.K[4];Tt={fx:m.K[0]*Nt,fy:m.K[1]*Nt,cx:m.K[2]*Nt,cy:m.K[3]*Nt}}else{let Nt=Math.max(gt,wt)/2/Math.tan(y/2*Xe);Tt={fx:Nt,fy:Nt,cx:gt/2,cy:wt/2}}return{img:{data:yf(dt,gt,wt,vf(Tt.fx)),w:gt,h:wt},K:Tt,raw:{g:dt,w:gt,h:wt}}}let C={ok:!1,x:0,y:0,f:c.pts[0].f,yaw:90,conf:0,lastFix:0},H={x:0,y:0,yaw:90,init:!1},xt=null,vt=new da,Ut=[],$t=0,I=!1,Wt=Wi(c),Pt=i.steps||Js(c,e,{landmarks:t.destinations}),Bt=0,Vt=0,be=!1,zt=-1,qt=null,me=null,de=new Set,R=new Set,v=m?(m.pitchDeg||-6)*Xe:0,J=new Map;for(let G of t.floors){let Z=[];for(let bt of t.FL(G).rooms){let gt=bt.poly;for(let wt=0;wt<gt.length;wt++){let Rt=gt[wt],dt=gt[(wt+1)%gt.length],Tt=Math.hypot(dt[0]-Rt[0],dt[1]-Rt[1]);if(Tt<1)continue;let Nt=Math.atan2(dt[1]-Rt[1],dt[0]-Rt[0])/Xe;Nt=(Nt%90+90)%90,Z.push({x:(Rt[0]+dt[0])/2,y:(Rt[1]+dt[1])/2,L:Tt,t:Nt})}}J.set(G,Z)}function Q(G,Z,bt){let gt=[],wt=0;for(let dt of J.get(G)||[]){if(Math.hypot(dt.x-Z,dt.y-bt)>10)continue;wt+=dt.L;let Tt=gt.find(Nt=>Math.abs(ri(Nt.t*4,dt.t*4))/4<2);Tt?(Tt.t=(Tt.t*Tt.L+(Tt.t+ri(dt.t*4,Tt.t*4)/4)*dt.L)/(Tt.L+dt.L),Tt.L+=dt.L):gt.push({t:dt.t,L:dt.L})}let Rt=gt.sort((dt,Tt)=>Tt.L-dt.L)[0];return Rt&&Rt.L>wt*.75?Rt.t:null}let _t=new da(15),ft=0,Yt=null,tt=0;function Et(G){return _t.n>=3&&G-ft<2e4?_t.value:vt.value}function U(G,Z,bt){let gt=Yt,wt=tt;if(Yt=Z,tt=bt,!C.ok||!gt||bt-wt>400)return;let Rt=Ef(gt,Z);if(Math.abs(Rt.yaw)>2.5||Math.abs(Rt.pitch)>2.5)return;let dt=Q(C.f,H.x,H.y);if(dt==null)return;let Tt=Bm(G.raw.g,G.raw.w,G.raw.h,G.K,Z);if(!Tt||Tt.ratio<2.5)return;let Nt=xt??vt.value??C.off;if(Nt==null)return;let te=dt-Tt.axis,_e=te+90*Math.round(ri(Nt,te)/90);Math.abs(ri(_e,Nt))>30||(_t.add(_e,Math.min(3,Tt.ratio/2)),ft=bt,_t.n>=3&&j.postMessage({type:"heading",off:_t.value,sd:5}))}function F(G,Z){let bt=V.q.get(G);if(!A||!bt||qt||g)return;let gt=performance.now();$.add(bt.t,bt,bt.lvl,Z);let wt=$.solve();if(!wt||!V.last)return;let Rt=V.last,dt=Math.cos(wt.off*Xe),Tt=Math.sin(wt.off*Xe),Nt={x:dt*Rt.x-Tt*Rt.y+wt.tx,y:Tt*Rt.x+dt*Rt.y+wt.ty},te=Math.min(1,wt.n/12),_e=!St.ok,Be=St.update(Nt,{x:Rt.x,y:Rt.y},wt.off,te);if(Be==="hold")return;let Me=Ot.idx+wt.df;t.floors.includes(Me)&&(C.f=Me),C.conf=te,C.off=St.off,C.lastFix=gt,(Be==="set"||Be==="snap")&&(Ie=!0),_e&&(f.coach.hidden=!0,ma(40)),$t=0,I=!1,ge("ok",`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${ze(C.f)}`),gt-V.fixT>2e3&&(V.fixT=gt,j.postMessage({type:"fix",fix:{f:C.f,x:Nt.x,y:Nt.y,yaw:Rt.yaw+St.off,conf:.8},yaw:Rt.yaw}))}function z(){return K?Jr(Xl(K))*180/Math.PI:null}function ct(G,Z){if(g)return;let bt=performance.now();if(Z&&V.q.delete(Z),qt)if(G.ok&&me&&G.f===me.to&&G.conf>.2)L();else return;if(A){St.ok||ge("searching","\uC8FC\uBCC0\uC744 \uBE44\uCD94\uBA70 \uBA87 \uAC78\uC74C \uAC78\uC5B4 \uC8FC\uC138\uC694");return}if(G.ok&&C.ok){if(G.f!==C.f||Math.hypot(G.x-C.x,G.y-C.y)>5){let wt=C.jump;if(C.jump={f:G.f,x:G.x,y:G.y},!wt||wt.f!==G.f||Math.hypot(wt.x-G.x,wt.y-G.y)>2.5)return}C.jump=null}if(G.ok){let gt=!C.ok;C.off=G.off,Object.assign(C,{ok:!0,x:G.x,y:G.y,f:G.f,yaw:G.yaw,conf:G.conf,lastFix:bt}),G.off!=null&&K&&G.conf>.35&&vt.add(G.off,G.conf),gt&&(f.coach.hidden=!0,ma(40)),$t=0,I=!1,ge(G.conf>.35?"ok":"weak",G.conf>.35?`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${ze(G.f)}`:`\uC704\uCE58\uAC00 \uC870\uAE08 \uBD88\uD655\uC2E4\uD574\uC694 \xB7 ${ze(G.f)}`),ht()}else C.ok&&bt-C.lastFix>Wl*1e3&&!(A&&St.ok)&&(C.ok=!1),(!C.ok||bt-C.lastFix>3e3)&&($t=$t||bt,ge("searching",C.ok?"\uC704\uCE58\uB97C \uB2E4\uC2DC \uB9DE\uCD94\uB294 \uC911":"\uC8FC\uBCC0\uC744 \uCC9C\uCC9C\uD788 \uBE44\uCDB0 \uC8FC\uC138\uC694"),C.ok||(f.coach.hidden=!1),!I&&bt-$t>6e3&&(I=!0,Ze.say("\uD734\uB300\uD3F0\uC744 \uC138\uC6CC\uC11C \uCC9C\uCC9C\uD788 \uC88C\uC6B0\uB85C \uBE44\uCDB0 \uC8FC\uC138\uC694")))}function nt(G){let Z=performance.now();for(Ut.push({yaw:G,t:Z});Ut.length&&Z-Ut[0].t>5e3;)Ut.shift();if(Ut.length<6||!C.ok||H.s==null||W.n%2)return;let bt=Ut.slice(-6).map(Me=>Me.yaw),gt=0,wt=0;for(let Me of bt)gt+=Math.cos(Me*Xe),wt+=Math.sin(Me*Xe);let Rt=Math.atan2(wt,gt)/Xe;if(bt.some(Me=>Math.abs(ri(Me,Rt))>10))return;let dt=$e(c,Wt,Math.max(0,H.s-3)),Tt=$e(c,Wt,H.s+1),Nt=$e(c,Wt,H.s+5);if(dt.f!==C.f||Nt.f!==C.f)return;let te=(Me,fn)=>Math.atan2(fn.y-Me.y,fn.x-Me.x)/Xe;if(Math.abs(ri(te(dt,Tt),te(Tt,Nt)))>8)return;let _e=ri(te(dt,Nt),Rt),Be=Et(performance.now());Be==null||Math.abs(ri(_e,Be))>45||vt.add(_e,2.5)}function ot(G){g||qt||!C.ok||G.f!==C.f||(C.x=G.x,C.y=G.y,ht())}function yt(G){me=G,R.add(G.s),A&&$.clear(),Ze.say(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${ze(G.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`),ma([30,60,30]);let Z=c.pts.find((bt,gt)=>bt.kind==="elev"&&bt.f===G.to&&c.pts[gt-1]?.kind==="elev");Z&&j.postMessage({type:"lift",f:G.to,x:Z.x,y:Z.y}),qt=Bl({from:G.f,to:G.to,title:`${je(G.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`,hint:"\uB0B4\uB9B0 \uB4A4 \uD734\uB300\uD3F0\uC744 \uC138\uC6CC \uBCF5\uB3C4\uB97C \uBE44\uCD94\uBA74 \uC774\uC5B4\uC11C \uC548\uB0B4\uD574\uC694",hold:!0,onSkip:()=>L(!0)})}function L(G=!1){if(!qt)return;let Z=me;G||qt.arrive(),qt=null,Bt=Z.s,C.f=Z.to,A&&V.last&&(Ot.reset(V.last.h,V.last.h-V.eye),Ot.shift(Z.to-Z.f)),H.init=!1,Ze.say(`${ze(Z.to)}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`),Ie=!0}function it(G,Z){let bt=G.step,gt=Math.round(G.dist);return bt.kind==="arrive"?Z.remain<3?`${e.title} \uB3C4\uCC29`:`${Math.round(Z.remain)}m \uC55E ${e.title}`:bt.kind==="stair"||bt.kind==="elev"?G.dist<3?bt.text:`${gt}m \uC55E ${bt.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"}`:G.dist<4?`\uC9C0\uAE08 ${bt.action}`:`${gt}m \uC55E\uC5D0\uC11C ${bt.action}`}function ht(){if(qt)return;let G=wa(c,Wt,C,Bt);if(!G)return;if(G.off>6){if(C.conf>.4&&++Vt>=4){Vt=0;let Tt=t.routeTo({f:C.f,x:C.x,y:C.y},e,{mode:n});Tt&&(c=Tt,Wt=Wi(c),Pt=Js(c,e,{landmarks:t.destinations}),Bt=0,zt=-1,de.clear(),Ie=!0,a?.(c,Pt),jt("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"),Ze.say("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"))}return}Vt=0,Bt=Math.max(Bt-1,G.s);let Z=co(Pt,c,Wt,G.s);Z.index!==zt&&(zt=Z.index,ma(25),Ie=!0);let bt=Z.step;f.arrow.dataset.dir=bt.dir,f.step.textContent=it(Z,G);let gt=Pt[Z.index+1];f.sub.textContent=bt.kind==="arrive"?bt.sub||"":gt?`${bt.text} \xB7 \uB2E4\uC74C: ${gt.text}`:bt.text,f.remain.textContent=`\uB0A8\uC740 \uAC70\uB9AC ${Math.round(G.remain)}m \xB7 \uC57D ${Aa(G.remain)}`,He("#ar-distance").textContent=`${e.title}\uAE4C\uC9C0 ${Math.round(G.remain)}m`;let wt=Z.index*2,Rt=wt+1,dt=C.conf>.3;if(dt&&bt.kind!=="arrive"&&Z.dist<15&&Z.dist>=4&&!de.has(wt)?(de.add(wt),Ze.say(`${Math.round(Z.dist)}\uBBF8\uD130 \uC55E, ${bt.text}`)):dt&&Z.dist<4&&!de.has(Rt)&&bt.kind!=="elev"&&(de.add(Rt),Ze.say(bt.kind==="arrive"?`${e.title}, ${bt.side||""}`:bt.text)),bt.kind==="elev"&&Z.dist<3&&C.f===bt.f&&!R.has(bt.s)&&yt(bt),G.remain<2.5&&C.f===c.pts[c.pts.length-1].f&&!be){be=!0,ma([60,40,60]);let Tt=Pt[Pt.length-1].side;f.arrive.querySelector("b").textContent=`${e.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694${Tt&&Tt!=="\uC815\uBA74"?` \xB7 \uBB38\uC740 ${Tt}`:""}`,f.arrive.hidden=!1}C.s=G.s}let mt=new qr({canvas:u,antialias:!0,alpha:!0});mt.setPixelRatio(Math.min(devicePixelRatio,2)),mt.setClearColor(0,0);let lt=new ni;lt.add(new Ls(16777215,8943530,2.2));let q=new Ge(60,1,.05,200),pt=new Ye;lt.add(pt);let Ht=(G,Z,bt)=>new P(G,bt,-Z),Zt=(()=>{let G=document.createElement("canvas");G.width=64,G.height=64;let Z=G.getContext("2d");Z.fillStyle="rgba(121,80,255,0.78)",Z.fillRect(0,0,64,64),Z.strokeStyle="#fff",Z.lineWidth=9,Z.lineCap="round",Z.lineJoin="round",Z.beginPath(),Z.moveTo(14,44),Z.lineTo(32,22),Z.lineTo(50,44),Z.stroke();let bt=new Ii(G);return bt.wrapS=bt.wrapT=Hn,bt.colorSpace=ke,bt})(),Jt=new we({map:Zt,transparent:!0,depthWrite:!1,side:Se}),ae=null,Ie=!0;function Fn(G){let Z=G+15;for(let bt=1;bt<Pt.length;bt++){let gt=Pt[bt];if(!(gt.s<=G+.8)){if(gt.s>Z)break;if(gt.kind==="walk"&&gt.dir!=="straight"&&gt.dir!=="start")return gt.s+1.2;if(gt.kind!=="walk"&&gt.kind!=="start")return gt.s}}return Math.min(Z,Wt[Wt.length-1])}function Ke(G){if(ae&&(pt.remove(ae),ae.geometry.dispose()),ae=null,!C.ok)return;let Z=G??C.s??0,bt=Math.max(0,Z+.8),gt=Fn(Z),wt=t.FL(C.f).z,Rt=[];for(let Me=bt;Me<=gt+1e-6;Me+=.5){let fn=$e(c,Wt,Math.min(Me,gt));if(fn.f!==C.f||Math.abs(fn.z-wt)>.3)break;Rt.push({...fn,z:wt})}if(Rt.length<2)return;let dt=[],Tt=[],Nt=[],te=.6,_e=0;for(let Me=0;Me<Rt.length;Me++){let fn=Rt[Math.max(0,Me-1)],Zs=Rt[Math.min(Rt.length-1,Me+1)],bn=Zs.x-fn.x,Mi=Zs.y-fn.y,ba=Math.hypot(bn,Mi)||1;bn/=ba,Mi/=ba;let hs=Rt[Me];Me&&(_e+=Math.hypot(hs.x-Rt[Me-1].x,hs.y-Rt[Me-1].y)/te);let Of=hs.z+.03;if(dt.push(hs.x-Mi*te*.5,Of,-(hs.y+bn*te*.5),hs.x+Mi*te*.5,Of,-(hs.y-bn*te*.5)),Tt.push(0,_e,1,_e),Me){let Ks=Me*2;Nt.push(Ks-2,Ks-1,Ks,Ks,Ks-1,Ks+1)}}let Be=new Pe;Be.setAttribute("position",new ve(dt,3)),Be.setAttribute("uv",new ve(Tt,2)),Be.setIndex(Nt),ae=new se(Be,Jt),ae.renderOrder=1,pt.add(ae)}let On=new we({color:7950591,transparent:!0,side:Se,depthWrite:!1}),on=new es({color:16777215,transparent:!0}),In=(()=>{let Z=new ns;Z.moveTo(0,.55*1.5),Z.lineTo(.42*1.5,.1*1.5),Z.lineTo(.16*1.5,.1*1.5),Z.lineTo(.16*1.5,-.45*1.5),Z.lineTo(-.16*1.5,-.45*1.5),Z.lineTo(-.16*1.5,.1*1.5),Z.lineTo(-.42*1.5,.1*1.5),Z.closePath();let bt=new Cs(Z);bt.rotateX(-Math.PI/2);let gt=new se(bt,On),wt=new Ts(new Ho(bt),on),Rt=new Ye;return Rt.add(gt,wt),Rt.renderOrder=2,Rt.visible=!1,pt.add(Rt),Rt})(),oi=(()=>{let G=new Ye,Z=new Pi({color:5451986,emissive:2758016}),bt=new se(new Is(.22,20,14),Z);bt.position.y=1.9;let gt=new se(new zo(.16,.6,16),Z);gt.rotation.x=Math.PI,gt.position.y=1.55;let wt=document.createElement("canvas");wt.width=256,wt.height=80;let Rt=wt.getContext("2d");Rt.fillStyle="#5330d2",Rt.beginPath(),Rt.roundRect(4,4,248,72,36),Rt.fill(),Rt.fillStyle="#fff",Rt.font="bold 40px 'Noto Sans KR', sans-serif",Rt.textAlign="center",Rt.textBaseline="middle",Rt.fillText(e.title,128,42);let dt=new Ii(wt);dt.colorSpace=ke;let Tt=new Lo(new Ar({map:dt,depthTest:!1,sizeAttenuation:!1}));return Tt.scale.set(.2,.0625,1),Tt.position.y=2.45,Tt.renderOrder=5,G.add(bt,gt,Tt),pt.add(G),G})();function Bn(){let G=l.clientWidth,Z=l.clientHeight;mt.setSize(G,Z,!1);let bt=h.videoWidth||16,gt=h.videoHeight||9,wt;if(m)wt=2*Math.atan(m.K[5]/2/m.K[1]);else{let Nt=Math.max(bt,gt)/2/Math.tan(y/2*Xe);wt=2*Math.atan(gt/2/Nt)}let Rt=bt/gt,dt=G/Z,Tt=dt<=Rt?wt:2*Math.atan(Math.tan(wt/2)*Rt/dt);q.fov=Tt/Xe,q.aspect=dt,q.updateProjectionMatrix()}addEventListener("resize",Bn),h.onloadedmetadata=Bn,Bn();let Zn=new ie;function Ma(G,Z,bt,gt){let wt=(Rt,dt)=>{let Tt=[G[Rt]*dt,G[3+Rt]*dt,G[6+Rt]*dt];return new P(Tt[0],Tt[2],-Tt[1])};Zn.makeBasis(wt(0,1),wt(1,-1),wt(2,-1)),q.quaternion.setFromRotationMatrix(Zn),q.position.copy(Ht(Z,bt,gt))}let fe=f.mini.getContext("2d");function Zl(G){let Z=f.mini.width,bt=4.2;if(fe.setTransform(1,0,0,1,0,0),fe.clearRect(0,0,Z,Z),!C.ok)return;fe.save(),fe.translate(Z/2,Z/2),fe.rotate((G-90)*Math.PI/180);let gt=(dt,Tt)=>[(dt-H.x)*bt,-(Tt-H.y)*bt],wt=t.FL(C.f);for(let dt of wt.rooms)fe.beginPath(),dt.poly.forEach((Tt,Nt)=>{let te=gt(Tt[0],Tt[1]);Nt?fe.lineTo(te[0],te[1]):fe.moveTo(te[0],te[1])}),fe.closePath(),fe.fillStyle=dt.id===e.id&&C.f===e.f?"#7950ff55":"#e9e5f1",fe.fill(),fe.strokeStyle="#cfc8e0",fe.lineWidth=1,fe.stroke();fe.strokeStyle="#7950ff",fe.lineWidth=5,fe.lineCap=fe.lineJoin="round",fe.beginPath();let Rt=!1;for(let dt of c.pts){if(dt.f!==C.f){Rt=!1;continue}let Tt=gt(dt.x,dt.y);Rt?fe.lineTo(Tt[0],Tt[1]):fe.moveTo(Tt[0],Tt[1]),Rt=!0}fe.stroke(),fe.restore(),fe.fillStyle="#3d8bff33",fe.beginPath(),fe.moveTo(Z/2,Z/2),fe.arc(Z/2,Z/2,46,-Math.PI/2-.45,-Math.PI/2+.45),fe.fill(),fe.fillStyle="#3d8bff",fe.strokeStyle="#fff",fe.lineWidth=4,fe.beginPath(),fe.arc(Z/2,Z/2,10,0,Math.PI*2),fe.fill(),fe.stroke()}let Hi=w?document.createElement("pre"):null,Sa=0;Hi&&(Hi.className="ar-debug",l.append(Hi));let Vi=0,oo=0,$s=performance.now();h.onseeked=()=>j.postMessage({type:"reset"});let E=0;function Y(G){if(g)return;requestAnimationFrame(Y);let Z=Math.min(.1,(G-$s)/1e3);if($s=G,It&&!Ft&&!B&&G-Vi>200&&h.readyState>=2){m&&h.currentTime<E-1&&j.postMessage({type:"reset"}),E=h.currentTime;let dt=O(),Tt=null;if(m?Tt=Af(0,v):K?Tt=Xl(K):Tt=Af(0,-8*Xe),dt&&Tt&&!m&&K&&!p){x=x||new Ol(Math.max(dt.raw.w,dt.raw.h),b||null);let Nt=x.add(Om(dt.raw.g,dt.raw.w,dt.raw.h),Tt,G/1e3);if(Nt&&Math.abs(Nt-y)>.4){y=Nt,Bn();try{localStorage.setItem("sai-ar-fov",Nt.toFixed(1))}catch{}}}if(dt&&Tt&&!m&&K&&U(dt,Tt,G),dt&&Tt){let Nt=Math.asin(Tt[8])/Xe;if(!m&&(Nt<-35||Nt>25))ge("weak",Nt<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{let te=xf(dt.img,dt.K,Tt),_e=m||!K?null:Jr(Tt)*180/Math.PI,Be=Vi?Math.min(2,(G-Vi)/1e3):0;Be&&j.postMessage({type:"tick",dt:Be,yaw:_e,hasSensor:_e!=null,pdr:W.on}),Ft=!0,Vi=G,j.postMessage({type:"query",id:++At,q:te,yaw:_e,floorHint:me&&qt?me.to:$e(c,Wt,Bt).f},[te.buffer])}}De(G)}let bt=Et(G);if(bt!=null)if(xt==null)xt=bt;else{let dt=ri(bt,xt);xt+=dt*Math.min(1,Z*(Math.abs(dt)>8?2:.7))}if(C.ok){let dt=C.x,Tt=C.y,Nt=wa(c,Wt,C,Bt);if(Nt&&Nt.off<3){let _e=Nt.s;H.s!=null&&_e<H.s-1&&!H.back?(H.back=!0,_e=H.s):H.back=!1;let Be=$e(c,Wt,_e);dt=Be.x,Tt=Be.y,H.s=_e}else H.s=null;H.init||Object.assign(H,{x:dt,y:Tt,yaw:C.yaw,init:!0});let te=Math.min(1,Z*2.5);H.x+=(dt-H.x)*te,H.y+=(Tt-H.y)*te,m&&(H.yaw+=ri(C.yaw,H.yaw)*Math.min(1,Z*3))}let gt=H.yaw,wt;if(!m&&K){let dt=Xl(K);wt=ga(Rf((xt??0)*Xe),dt),gt=Jr(wt)*180/Math.PI}else wt=Af(H.yaw*Xe,v);let Rt=t.FL(C.f).z+iS;Ma(wt,H.x,H.y,Rt),rt(G,Z,gt)}function rt(G,Z,bt){let gt=H.s??C.s;(Ie||C.ok&&Math.abs((gt??0)-(Ke.s??-99))>1)&&(Ke(gt),Ke.s=gt??0,Ie=!1),Zt.offset.y-=Z*1.6;let wt=(G-C.lastFix)/1e3,Rt=C.ok&&!qt&&wt<Wl&&(m||!K||xt!=null);oo+=((Rt?1:0)-oo)*Math.min(1,Z*4);let dt=oo*(wt>Wl-3?Math.max(0,(Wl-wt)/3):1);Jt.opacity=dt*.9,On.opacity=on.opacity=dt,ae&&(ae.visible=dt>.02);let Tt=c.pts[c.pts.length-1];if(oi.visible=dt>.02&&Tt.f===C.f&&Math.hypot(Tt.x-H.x,Tt.y-H.y)<35,oi.position.copy(Ht(Tt.x,Tt.y,t.FL(Tt.f).z)),oi.children[0].position.y=1.9+Math.sin(G/300)*.05,In.visible=!1,dt>.02&&gt!=null){let Nt=co(Pt,c,Wt,gt);if(Nt.dist<15&&Nt.step.kind==="walk"&&Nt.step.dir!=="straight"){let fn=gt+Nt.dist,Zs=$e(c,Wt,fn),bn=$e(c,Wt,fn+.9),Mi=$e(c,Wt,fn+3);if(bn.f===C.f&&Zs.f===C.f&&Math.hypot(Mi.x-bn.x,Mi.y-bn.y)>.3){In.visible=!0;let ba=Math.atan2(Mi.y-bn.y,Mi.x-bn.x)/Xe;In.position.copy(Ht(bn.x,bn.y,t.FL(C.f).z+.04)),In.rotation.set(0,(ba-90)*Xe,0)}}let te=Nt.dist<3?Nt.step.dir:"straight";f.arrow.dataset.icon!==te&&(no(f.arrow,te,!0),f.arrow.dataset.icon=te);let _e=$e(c,Wt,gt+4),Be=ri(Math.atan2(_e.y-H.y,_e.x-H.x)/Xe,bt),Me=Math.abs(Be)>55?Math.abs(Be)>135?"\uACBD\uB85C\uAC00 \uB4A4\uCABD\uC5D0 \uC788\uC5B4\uC694 \xB7 \uB3CC\uC544\uC11C \uBCF4\uC138\uC694":Be>0?"\u2190 \uACBD\uB85C\uAC00 \uC67C\uCABD\uC5D0 \uC788\uC5B4\uC694":"\uACBD\uB85C\uAC00 \uC624\uB978\uCABD\uC5D0 \uC788\uC5B4\uC694 \u2192":"";Me&&(f.sub.textContent=Me),f.sub.classList.toggle("hint",!!Me)}Hi&&G-Sa>300&&(Sa=G,Hi.textContent=[A?`WebXR(VIO) ${V.tracking?"\uCD94\uC801 \uC911":"\uCD94\uC801 \uB04A\uAE40"} \xB7 \uC815\uB82C ${St.ok?`${St.n}\uD68C`:"-"} \xB7 \uB192\uC774 ${V.last?V.last.h.toFixed(2):"-"}m \xB7 \uC9C8\uC758 ${Math.round(X)}ms`:`\uC13C\uC11C ${K?"\uCF1C\uC9D0":"\uC5C6\uC74C"} \xB7 \uAC78\uC74C ${W.on?W.n||0:"\uC5C6\uC74C"} \xB7 \uC9C8\uC758 ${Math.round(X)}ms`,`\uD654\uAC01 ${y.toFixed(1)}\xB0 ${p?"(\uC8FC\uC18C)":x?`(\uBCF4\uC815 \uD45C\uBCF8 ${x.samples.length})`:""}`,`\uBC29\uD5A5\uAE30\uC900 ${xt==null?"-":xt.toFixed(1)} / \uC18C\uC2E4\uC810 ${_t.value==null?"-":_t.value.toFixed(1)} (${_t.n}) / \uC0AC\uC9C4\xB7\uAC78\uC74C ${vt.value==null?"-":vt.value.toFixed(1)} (${vt.n})`,`\uC704\uCE58 ${C.ok?"OK":"--"} ${je(C.f)} (${C.x.toFixed(1)}, ${C.y.toFixed(1)}) \uC2E0\uB8B0 ${C.conf.toFixed(2)}`].join(`
`)),Zl(bt),mt.render(lt,q)}let V={q:new Map,last:null,mx:0,my:0,tracking:!1,eye:1.35,progT:0,fixT:0,nq:0},$=new Vl,St=new pa,Ot=new Hl(t.M.FH||4),Xt=null,Gt=null;function ne(G,Z){if(g)return;let bt=Math.min(.1,(G-$s)/1e3);$s=G;let gt=Z?.getViewerPose(mt.xr.getReferenceSpace()),wt=H.yaw;if(gt){let Rt=gt.views[0],dt=Wm(Rt.transform.matrix),Tt=V.tracking;if(V.tracking=!gt.emulatedPosition,V.last&&V.tracking&&Tt){let Nt=dt.x-V.last.x,te=dt.y-V.last.y;Math.hypot(Nt,te)<1.5&&!qt&&(V.mx+=Nt,V.my+=te)}if(V.last={...dt,yaw:Gl(dt.R)},V.tracking&&!qt){let Nt=Ot.update(dt.h);Nt?(j.postMessage({type:"shiftFloor",d:Nt}),t.floors.includes(C.f+Nt)&&(C.f+=Nt),Ie=!0):Math.abs(dt.h-Ot.floorY-V.eye)<.4&&(V.eye+=(dt.h-Ot.floorY-V.eye)*.01)}if(It&&!Ft&&!B&&V.tracking&&G-Vi>200&&Rt.camera){let Nt=Gt.grab(Rt.camera);if(Nt){let te=Xm(Rt.projectionMatrix,Nt.w,Nt.h),_e={img:{data:yf(Nt.g,Nt.w,Nt.h,vf(te.fx)),w:Nt.w,h:Nt.h},K:te,raw:Nt};U(_e,dt.R,G);let Be=Math.asin(dt.R[8])/Xe;if(Be<-35||Be>25)ge("weak",Be<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{(V.mx||V.my)&&j.postMessage({type:"move",dx:V.mx,dy:V.my}),V.mx=V.my=0;let Me=xf(_e.img,_e.K,dt.R);Ft=!0,Vi=G;let fn=Gl(dt.R);V.q.set(++At,{x:dt.x,y:dt.y,yaw:fn,lvl:Ot.idx,t:G/1e3});let Zs=St.ok?C.f:$e(c,Wt,Bt).f,bn=++V.nq%4===0?t.floors:[Zs];V.q.size>20&&V.q.delete(V.q.keys().next().value),j.postMessage({type:"query",id:At,q:Me,yaw:fn,xr:!0,floors:bn,floorHint:me&&qt?me.to:$e(c,Wt,Bt).f},[Me.buffer])}}}if(St.ok&&!qt){let Nt=St.toBuilding(dt.x,dt.y);C.x=Nt.x,C.y=Nt.y,C.ok=!0,V.tracking&&(C.lastFix=G),wt=Gl(dt.R)+St.off,C.yaw=wt;let te=wa(c,Wt,C,Bt);H.x=Nt.x,H.y=Nt.y,H.yaw=wt,H.init=!0,H.s=te&&te.off<3?te.s:null,G-V.progT>200&&(V.progT=G,ht());let _e=qm(St,Ot.floorY-t.FL(C.f).z);pt.rotation.set(0,_e.rotY,0),pt.position.set(_e.px,_e.py,_e.pz)}}St.ok?pt.visible=!0:pt.visible=!1,rt(G,bt,wt)}if(A)try{Xt=await Vm(mt,l),Gt=new zl(mt,220,T.has("xrflip")),l.classList.add("xr"),Xt.addEventListener("end",()=>{g||ue()}),mt.setAnimationLoop(ne)}catch{A=!1,jt("\uC774 \uAE30\uAE30\uB294 \uAE30\uBCF8 AR \uBC29\uC2DD\uC73C\uB85C \uC548\uB0B4\uD574\uC694");try{await N()}catch(Z){Ne(Z)}requestAnimationFrame(Y)}else requestAnimationFrame(Y);let Qt=He("#ar-floors");Qt.replaceChildren();for(let G of t.floors){let Z=document.createElement("button");Z.type="button",Z.textContent=je(G),Z.onclick=()=>{Qt.hidden=!0,j.postMessage({type:"floor",f:G}),C.ok=!1,C.f=G,A&&(Ot.idx=0,$.clear(),St.off=null),H.init=!1,ge("searching",`${ze(G)}\uC5D0\uC11C \uC704\uCE58\uB97C \uCC3E\uB294 \uC911`),jt(`${ze(G)}\uB85C \uB9DE\uCDC4\uC5B4\uC694`)},Qt.append(Z)}f.status.onclick=()=>{for(let G of Qt.children)G.classList.toggle("on",G.textContent===je(C.f));Qt.hidden=!Qt.hidden};let Kt=m?null:new URLSearchParams(location.search).get("loc"),re=Kt?document.createElement("canvas"):null,Ee=!1,Oe=0;function De(G){if(!Kt||Ee||G-Oe<1500||!K)return;let Z=h.videoWidth,bt=h.videoHeight;if(!Z)return;Ee=!0,Oe=G;let gt=640/Math.max(Z,bt);re.width=Math.round(Z*gt),re.height=Math.round(bt*gt),re.getContext("2d").drawImage(h,0,0,re.width,re.height);let wt=Xl(K),Rt=Jr(wt)*180/Math.PI,dt={R:wt,fovLong:y,prior:C.ok?{f:C.f,x:C.x,y:C.y,yaw:C.yaw}:{f:$e(c,Wt,Bt).f}};re.toBlob(async Tt=>{try{let Nt=new FormData;Nt.append("image",Tt,"q.jpg"),Nt.append("meta",JSON.stringify(dt));let _e=await(await fetch(Kt,{method:"POST",body:Nt})).json();!g&&_e&&_e.ok&&j.postMessage({type:"fix",fix:_e,yaw:Rt})}catch{}Ee=!1},"image/jpeg",.7)}function ge(G,Z){f.status.className=`ar-status ${G}`,f.status.textContent=Z}function jt(G){let Z=He("#toast");Z.textContent=G,Z.hidden=!1,clearTimeout(jt.h),jt.h=setTimeout(()=>Z.hidden=!0,2600)}function Ne(G){f.err.hidden=!1,f.coach.hidden=!0,f.err.focus({preventScroll:!0});let Z=G.code==="insecure",bt=G.name==="NotAllowedError";f.err.querySelector("b").textContent=Z?"HTTPS\uC5D0\uC11C \uC5F4\uC5B4 \uC8FC\uC138\uC694":bt?"\uCE74\uBA54\uB77C \uAD8C\uD55C\uC774 \uD544\uC694\uD574\uC694":"\uCE74\uBA54\uB77C\uB97C \uCF24 \uC218 \uC5C6\uC5B4\uC694",f.err.querySelector("p").textContent=Z?"\uCE74\uBA54\uB77C\uB97C \uC0AC\uC6A9\uD558\uB824\uBA74 \uBCF4\uC548 \uC5F0\uACB0(HTTPS)\uB85C \uC811\uC18D\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":bt?"\uBE0C\uB77C\uC6B0\uC800 \uC124\uC815\uC5D0\uC11C \uC774 \uC0AC\uC774\uD2B8\uC758 \uCE74\uBA54\uB77C \uC811\uADFC\uC744 \uD5C8\uC6A9\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":`${G.message||G} \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C AR \uAE38\uC548\uB0B4\uB97C \uCCB4\uD5D8\uD560 \uC218 \uC788\uC5B4\uC694.`}function ue(){g||(g=!0,j.terminate(),qt?.close(),S?.release?.().catch(()=>{}),document.removeEventListener("visibilitychange",k),Ze.supported&&speechSynthesis.cancel(),removeEventListener("deviceorientation",st),removeEventListener("devicemotion",Mt),mt.setAnimationLoop(null),Xt&&Xt.end().catch(()=>{}),Gt?.dispose(),l.classList.remove("xr"),removeEventListener("resize",Bn),_?.getTracks().forEach(G=>G.stop()),h.pause(),h.removeAttribute("src"),h.srcObject=null,h.load(),mt.dispose(),Hi?.remove(),ae?.geometry.dispose(),l.hidden=!0,o?.())}He("#ar-close").onclick=ue,He("#ar-error-close").onclick=ue,He("#ar-arrive-close").onclick=ue;let un=He("#ar-again");return un.hidden=!m,un.onclick=()=>{f.arrive.hidden=!0,be=!1,c=i.route,Wt=Wi(c),Pt=i.steps||Js(c,e,{landmarks:t.destinations}),Bt=0,zt=-1,Ie=!0,C.ok=!1,H.init=!1,de.clear(),R.clear(),j.postMessage({type:"reset"}),h.currentTime=0,h.play().catch(()=>{})},h.onended=()=>{!m||g||(be||(f.arrive.querySelector("b").textContent="\uB370\uBAA8 \uC601\uC0C1\uC774 \uB05D\uB0AC\uC5B4\uC694"),f.arrive.hidden=!1)},He("#ar-demo").onclick=()=>{ue(),i.onDemo?.()},{close:ue}}var Xe,He,iS,Wl,sS,ma,ri,ga,Rf,rS,oS,aS,Zm=qe(()=>{qn();Mf();th();ao();Fm();km();Tf();wf();Gm();Ym();Xe=Math.PI/180,He=i=>document.querySelector(i),iS=1.35,Wl=15,sS=65,ma=i=>{navigator.userActivation?.hasBeenActive&&navigator.vibrate?.(i)},ri=(i,t)=>((i-t)%360+540)%360-180,ga=(i,t)=>{let e=new Array(9);for(let n=0;n<3;n++)for(let s=0;s<3;s++)e[n*3+s]=i[n*3]*t[s]+i[n*3+1]*t[3+s]+i[n*3+2]*t[6+s];return e},Rf=i=>[Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i),0,0,0,1],rS=i=>[1,0,0,0,Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i)],oS=i=>[Math.cos(i),0,Math.sin(i),0,1,0,-Math.sin(i),0,Math.cos(i)],aS=[1,0,0,0,-1,0,0,0,-1]});var _S=lg(()=>{ao();th();Lm();Zm();Tf();wf();var qs="assets/",Dt=i=>document.querySelector(i),os=i=>[...document.querySelectorAll(i)],so=new URLSearchParams(location.search),Lt={start:null,dest:null,mode:"stairs",route:null,steps:null,focusStep:null,sheet:"home"},Qe,oe,Ys,_a=null;function xa(i,t=2600){let e=Dt("#toast");e.textContent=i,e.hidden=!1,clearTimeout(xa.h),xa.h=setTimeout(()=>e.hidden=!0,t)}function Ve(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}async function cS(){let[i,t]=await Promise.all([fetch(qs+"mirae.json").then(c=>{if(!c.ok)throw new Error(`\uCE35 \uB370\uC774\uD130 ${c.status}`);return c.json()}),fetch(qs+"entrances.json").then(c=>c.json())]);Qe=zf(i),Ys=t.entrances,oe=Pm(Dt("#view"),Qe,{onPick:hS}),lS(),await oe.load(qs+"mirae.glb");let e=so.get("from"),n=(c,l)=>c.campusNode===l||(c.campusNodes||[]).includes(l),s=Ys.find(c=>c.id===e||n(c,e)),r=!s&&e&&Qe.findDest(e);ro(r?ql(r):Pf(s||Ys[0])),s&&n(s,e)&&(Dt("#home-from").textContent=`\uCEA0\uD37C\uC2A4 \uACBD\uB85C\uAC00 ${s.name}\uB85C \uC774\uC5B4\uC84C\uC5B4\uC694. \uAC00\uB824\uB294 \uD638\uC2E4\uC744 \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694.`),so.get("mode")==="elevator"&&Nf("elevator",!1),oe.setFloor(Lt.start.f,!0),as();let o=so.get("to"),a=o&&(Qe.findDest(o)||Qe.search(o)[0]);a?(Lt.dest=a,ls()):cs("dest",!1),so.has("demo")&&Ff(),sg(),Dt("#loading-status").textContent="\uBBF8\uB798\uAD00 \uC2E4\uB0B4 \uC9C0\uB3C4 \uC900\uBE44\uAC00 \uC644\uB8CC\uB410\uC5B4\uC694",Dt("#loading").classList.add("done"),setTimeout(()=>Dt("#loading").hidden=!0,450)}function Pf(i){return{kind:"entrance",id:i.id,name:i.name,f:i.f,x:i.p[0],y:i.p[1]}}function ql(i){let t=i.doors[0],e=Qe.nearest(i.f,t[0],t[1],6)||t;return{kind:"place",id:i.key,name:`${i.title}${i.name?" "+i.name:""}`,f:i.f,x:e[0],y:e[1]}}function ro(i){Lt.start=i,oe.setMe({x:i.x,y:i.y,f:i.f})}function lS(){let i=Dt("#floors");i.replaceChildren();for(let t of[...Qe.floors].sort((e,n)=>n-e)){let e=Ve("button","",je(t));e.type="button",e.dataset.f=t,e.setAttribute("aria-label",ze(t)),e.onclick=()=>Lf(t),i.append(e)}}function Lf(i){if(i===oe.floor)return;let t=i>oe.floor;oe.setFloor(i,!1,!0),oe.frame({resetOrientation:!1,animate:!0}),oe.setMe(Lt.start),as();let e=Dt("#floor-badge");e.textContent=`${t?"\u25B2":"\u25BC"} ${je(i)}`,e.classList.remove("show"),e.offsetWidth,e.classList.add("show")}Dt("#view-reset").onclick=()=>oe?.frame({animate:!0});function as(){let i=new Set(Lt.route?Lt.route.pts.map(t=>t.f):[]);for(let t of os("#floors button"))t.classList.toggle("on",+t.dataset.f===oe.floor),t.classList.toggle("has-route",i.has(+t.dataset.f)),t.setAttribute("aria-pressed",+t.dataset.f===oe.floor);for(let t of os(".floor-tag[data-f]"))t.classList.toggle("current-floor",+t.dataset.f===oe.floor);Dt("#search").hidden||Yl(Dt("#search-input").value)}function hS(i,t,e){let n=Qe.roomAt(e,i,t),s=n&&Qe.destinations.find(r=>r.f===e&&r.id===n.id);if(!s){let r=null;for(let o of Qe.destinations)if(o.f===e)for(let a of o.doors){let c=Math.hypot(a[0]-i,a[1]-t);c<2.2&&(!r||c<r[0])&&(r=[c,o])}s=r&&r[1]}s&&jm(s)}function ya(i){Lt.sheet=i;for(let t of["home","place","route"])Dt(`#sheet-${t}`).hidden=t!==i;Dt("#sheet").classList.remove("collapsed"),Dt("#sheet").classList.toggle("route-mode",i==="route"),Dt("#sheet").classList.toggle("place-mode",i==="place"),Dt("#sheet").hidden=i==="home",i==="home"&&cs("dest",!1)}Dt("#sheet-handle").onclick=()=>{let i=Dt("#sheet").classList.toggle("collapsed");Dt("#sheet-handle").setAttribute("aria-expanded",!i),Lt.route&&tg()};function jm(i){Lt.pending=i,oe.select(i),Dt("#place-floor").textContent=je(i.f),Dt("#place-floor").dataset.f=i.f,Dt("#place-floor").classList.toggle("b1",i.f===0),Dt("#place-title").textContent=i.title,Dt("#place-sub").textContent=[i.name||i.catLabel,ze(i.f)].filter(Boolean).join(" \xB7 "),ya("place");let t=i.center||i.doors[0];i.f!==oe.floor&&Lf(i.f),oe.focus(t[0],t[1],i.f,48),as()}Dt("#place-close").onclick=()=>{if(oe.select(null),!Dt("#search").hidden&&!Lt.route){Lt.sheet="home",Dt("#sheet").hidden=!0,Dt("#sheet").classList.remove("place-mode");return}ya(Lt.route?"route":"home")};Dt("#place-route").onclick=()=>{va(),Lt.dest=Lt.pending,Jm(Lt.dest),ls()};Dt("#place-from").onclick=()=>{va(),ro(ql(Lt.pending)),xa(`${Lt.pending.title}\uC5D0\uC11C \uCD9C\uBC1C\uD574\uC694. \uC774\uC81C \uB3C4\uCC29\uC9C0\uB97C \uAC80\uC0C9\uD574 \uC8FC\uC138\uC694.`),Lt.dest&&Lt.dest.key!==Lt.pending.key?ls():(oe.select(null),ya("home"),cs())};var If="sai-indoor-recent";function uS(){try{return JSON.parse(localStorage.getItem(If)||"[]").map(i=>Qe.findDest(i)).filter(Boolean)}catch{return[]}}function Jm(i){try{let t=[i.key,...JSON.parse(localStorage.getItem(If)||"[]").filter(e=>e!==i.key)].slice(0,6);localStorage.setItem(If,JSON.stringify(t))}catch{}}function cs(i="dest",t=!0){Qe&&(Lt.searchMode=i,Dt("#search").hidden=!1,document.body.classList.add("searching"),Dt("#search-input").value="",Dt("#search-input").placeholder=i==="origin"?"\uC5B4\uB514\uC5D0\uC11C \uCD9C\uBC1C\uD558\uB098\uC694? (\uD638\uC2E4\xB7\uC774\uB984)":"\uD638\uC2E4 \uBC88\uD638, \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984",Yl(""),t&&setTimeout(()=>Dt("#search-input").focus(),50))}function va(){Dt("#search").hidden=!0,document.body.classList.remove("searching"),Dt("#search-input").blur(),oe?.redraw()}Dt("#search-open").onclick=()=>cs();Dt("#search-close").onclick=va;document.addEventListener("keydown",i=>{i.key!=="/"||i.isComposing||i.ctrlKey||i.metaKey||i.altKey||i.target.closest?.("input, textarea, select, [contenteditable='true']")||!Dt("#walk").hidden||!Dt("#ar").hidden||(i.preventDefault(),cs())});Dt("#search-input").addEventListener("input",i=>Yl(i.target.value));Dt("#search-input").addEventListener("keydown",i=>{i.isComposing||i.keyCode===229||(i.key==="Enter"?Dt("#search-results li[data-key] button")?.click():i.key==="Escape"&&va())});function Cf(i){let t=Ve("li");t.dataset.key=i.key,t.dataset.f=i.f;let e=Ve("span","floor-tag"+(i.f===0?" b1":"")+(i.f===oe.floor?" current-floor":""),je(i.f));e.dataset.f=i.f,e.title=`${ze(i.f)}${i.f===oe.floor?" \xB7 \uD604\uC7AC \uCE35":""}`;let n=Ve("div");n.append(Ve("b","",i.title),Ve("small","",i.cat==="toilet"?[i.name,ze(i.f)].filter(Boolean).join(" \xB7 "):i.name||i.catLabel||ze(i.f)));let s=Ve("button","search-result-button");return s.type="button",s.append(e,n),t.append(s),s.onclick=()=>{va(),Jm(i),Lt.searchMode==="origin"?(ro(ql(i)),Df(),Lt.dest&&ls()):jm(i)},t}function Yl(i){let t=Dt("#search-results");if(t.replaceChildren(),i.trim()){let s={floor:oe.floor,origin:Lt.start,mode:Lt.mode},r=Qe.search(i,40,s),o=r.length?[]:Qe.suggest(i,40,s),a=r.length?r:o,c=o.length?`\uBE44\uC2B7\uD55C \uC7A5\uC18C ${o.length}\uACF3`:r.length?`${r.length}\uACF3`:"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694. \uD638\uC2E4 \uBC88\uD638\uB098 \uC774\uB984 \uC77C\uBD80\uB85C \uCC3E\uC544\uBCF4\uC138\uC694.";Dt("#search-hint").textContent=a.length&&a.every(l=>l.cat==="toilet")?`${c} \xB7 ${ze(oe.floor)} \uC6B0\uC120 \xB7 \uCD9C\uBC1C \uC704\uCE58\uC5D0\uC11C \uAC00\uAE4C\uC6B4 \uC21C`:c;for(let l of a)t.append(Cf(l));return}Dt("#search-hint").textContent="\uBC88\uD638\uB098 \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984\uC73C\uB85C \uCC3E\uC744 \uC218 \uC788\uC5B4\uC694";let e=uS();if(e.length){t.append(Ve("li","group","\uCD5C\uADFC \uCC3E\uC740 \uACF3"));for(let s of e)t.append(Cf(s))}let n=null;for(let s of Qe.destinations.filter(r=>r.numbered))s.f!==n&&(t.append(Ve("li","group",ze(s.f))),n=s.f),t.append(Cf(s))}for(let i of os("#quick-chips button"))i.onclick=()=>{cs(),Dt("#search-input").value=i.dataset.q,Yl(i.dataset.q)};function Df(){let i=Dt("#route-from");i.replaceChildren();for(let t of Ys)i.append(new Option(t.name,`e:${t.id}`));Lt.start.kind==="place"&&i.append(new Option(Lt.start.name,`p:${Lt.start.id}`)),i.append(new Option("\uB2E4\uB978 \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\u2026","pick")),i.value=Lt.start.kind==="entrance"?`e:${Lt.start.id}`:`p:${Lt.start.id}`}Dt("#route-from").onchange=i=>{let t=i.target.value;if(t==="pick"){Df(),cs("origin");return}t.startsWith("e:")&&ro(Pf(Ys.find(e=>`e:${e.id}`===t))),ls()};Dt("#route-to").onclick=()=>cs();Dt("#route-swap").onclick=()=>{if(!Lt.dest)return;let i=Lt.start.kind==="place"?Qe.findDest(Lt.start.id):null;if(!i){xa("\uCD9C\uC785\uAD6C\uB294 \uB3C4\uCC29\uC9C0\uB85C \uACE0\uB97C \uC218 \uC5C6\uC5B4\uC694. \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\uD558\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.");return}ro(ql(Lt.dest)),Lt.dest=i,ls()};Dt("#route-close").onclick=()=>{Lt.route=null,Lt.dest=null,oe.clearRoute(),oe.select(null),ya("home"),as(),history.replaceState(null,"",location.pathname+(so.get("from")?`?from=${so.get("from")}`:""))};function Nf(i,t=!0){Lt.mode=i;for(let e of os(".seg button"))e.classList.toggle("on",e.dataset.mode===i),e.setAttribute("aria-checked",e.dataset.mode===i);t&&ls()}for(let i of os(".seg button"))i.onclick=()=>Nf(i.dataset.mode);function Qm(){let i=new URLSearchParams;i.set("from",Lt.start.id),i.set("to",Lt.dest.key),Lt.mode==="elevator"&&i.set("mode","elevator");let t=new URLSearchParams(location.search);for(let e of["debug","fov","loc"])t.has(e)&&i.set(e,t.get(e));return`${location.pathname}?${i}`}Dt("#route-share").onclick=async()=>{let i=new URL(Qm(),location.href).href,t=`\uBBF8\uB798\uAD00 ${Lt.dest.title}\uAE4C\uC9C0 \uAE38\uC548\uB0B4`;try{navigator.share?await navigator.share({title:t,url:i}):(await navigator.clipboard.writeText(i),xa("\uACBD\uB85C \uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD588\uC5B4\uC694"))}catch{}};function ls(){let i=Lt.dest;if(!i)return;let t=Qe.routeTo(Lt.start,i,{mode:Lt.mode});Df(),Dt("#route-to").textContent=`${i.title}${i.name?" "+i.name:""}`,ya("route");let e=Dt("#route-summary");if(e.replaceChildren(),Dt("#route-steps").replaceChildren(),!t){Lt.route=null,oe.clearRoute(),e.append(Ve("span","warn","\uACBD\uB85C\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.")),Dt("#ar-open").disabled=Dt("#walk-open").disabled=!0,as();return}Dt("#ar-open").disabled=Dt("#walk-open").disabled=!1,Lt.route=t,Lt.steps=Js(t,i,{landmarks:Qe.destinations}),Lt.focusStep=null,history.replaceState(null,"",Qm()),e.append(Ve("b","",`${Math.round(t.len)}m`),Ve("span","",`\uC57D ${Aa(t.len)}`));for(let r of Lt.steps)(r.kind==="stair"||r.kind==="elev")&&e.append(Ve("span","chip "+r.kind,`${r.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"} ${je(r.f)}\u2192${je(r.to)}`));let n=Lt.steps.filter(r=>r.kind==="stair").map(r=>`${je(r.f)}\u2192${je(r.to)}`).join(", "),s=[];t.preferElev&&s.push("3\uAC1C \uCE35 \uC774\uC0C1\uC774\uB77C \uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C \uC548\uB0B4\uD574\uC694"),(Lt.mode==="elevator"||t.preferElev)&&t.stairFloors&&s.push(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uAC00 \uB2FF\uC9C0 \uC54A\uB294 ${n} \uAD6C\uAC04\uB9CC \uACC4\uB2E8\uC744 \uC774\uC6A9\uD574\uC694`),s.length&&e.append(Ve("span","note",s.join(" \xB7 "))),pS(),Dt("#sheet").scrollTop=0,oe.showRoute(t,i,Lt.steps),oe.floor!==t.pts[0].f&&oe.setFloor(t.pts[0].f),oe.setMe(Lt.start),tg(),as()}function fS(){return innerWidth>=820?0:Dt("#sheet").classList.contains("collapsed")?64:Dt("#sheet").offsetHeight}function tg(){let i=Lt.route.pts.filter(o=>o.f===oe.floor),t=i.length?i:Lt.route.pts,e=1/0,n=-1/0,s=1/0,r=-1/0;for(let o of t)e=Math.min(e,o.x),n=Math.max(n,o.x),s=Math.min(s,o.y),r=Math.max(r,o.y);oe.fit(e,s,n,r,t[0].f,fS())}async function eg(){return _a||(_a=await fetch(qs+"sv.json").then(i=>i.json())),_a}function ng(i,t,e,n,s=3.5,r=45){if(!_a)return null;let o=null;for(let a of _a.shots){if(a.f!==e)continue;let c=Math.hypot(a.x-i,a.y-t);if(c>s)continue;let l=n==null?0:Math.abs(((a.yaw-n)%360+540)%360-180);if(l>r)continue;let h=c+l*.05;(!o||h<o[0])&&(o=[h,a])}return o&&o[1]}var ig=i=>`${qs}sv/${String(i.id).padStart(5,"0")}.jpg`;function dS(i){let t=Lt.route,e=Wi(t),n=$e(t,e,i.s+.3),s=$e(t,e,i.s+3);return Math.hypot(s.x-n.x,s.y-n.y)>.5?Math.atan2(s.y-n.y,s.x-n.x)*180/Math.PI:null}async function pS(){let i=Dt("#route-steps");i.replaceChildren();let t=Lt.steps;await eg().catch(()=>null),Lt.steps===t&&t.forEach((e,n)=>{let s=Ve("li",e.kind==="stair"||e.kind==="elev"?"vertical":e.kind==="arrive"?"goal":"");s.dataset.i=n;let r=Ve("span","ico");no(r,e.dir);let o=Ve("div","txt");o.append(Ve("b","",e.text));let a=[ze(e.f)];if(e.kind==="start"&&a.push(Lt.start.name),e.sub&&e.kind!=="start"&&a.push(e.sub),o.append(Ve("small","",a.join(" \xB7 "))),s.append(r,o),e.kind!=="start"&&e.kind!=="arrive"&&e.kind!=="elev"){let c=ng(e.at[0],e.at[1],e.f,dS(e));if(c){let l=Ve("img");l.loading="lazy",l.alt="\uC774 \uC9C0\uC810\uC758 \uC2E4\uC81C \uBAA8\uC2B5",l.src=ig(c),s.append(l)}}s.onclick=()=>Km(n),s.tabIndex=0,s.setAttribute("role","button"),s.setAttribute("aria-label",`${e.text} \xB7 ${a.join(" \xB7 ")}`),s.onkeydown=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),Km(n))},i.append(s)})}function Km(i){let t=Lt.steps[i];Lt.focusStep=i;for(let e of os("#route-steps li"))e.classList.toggle("on",+e.dataset.i===i);oe.highlightStep(i),t.f!==oe.floor&&Lf(t.f),oe.focus(t.at[0],t.at[1],t.f,32),as(),innerWidth<820&&Dt("#sheet").classList.add("collapsed")}function sg(){for(let i of os(".voice-btn"))i.hidden=!Ze.supported,i.classList.toggle("on",Ze.on),i.setAttribute("aria-pressed",Ze.on),i.querySelector("img")||i.replaceChildren(kl("volume")),i.title=Ze.on?"\uC74C\uC131 \uC548\uB0B4 \uB044\uAE30":"\uC74C\uC131 \uC548\uB0B4 \uCF1C\uAE30"}for(let i of os(".voice-btn"))i.onclick=()=>{Ze.on=!Ze.on,sg(),Ze.on&&Ze.say("\uC74C\uC131 \uC548\uB0B4\uB97C \uCF30\uC5B4\uC694")};var mS=3.2,ye=null;Dt("#walk-open").onclick=async()=>{if(!Lt.route)return;await eg().catch(()=>null);let i=Lt.route,t=Wi(i),e=t[t.length-1];ye={s:0,s0:0,cum:t,total:e,end:Math.max(0,e-mS),yaw:null,last:performance.now(),shot:null,playing:!0,speed:1,step:-1,lift:null,liftDone:new Set};let n=Lt.focusStep;if(n!=null&&Lt.steps[n]){let s=n>0?Lt.steps[n-1].s:0;ye.s0=Math.min(ye.end,Math.max(s,n>0?Lt.steps[n].s-2:0)),ye.s=ye.s0,Uf(ye)}Dt("#walk").hidden=!1,document.body.classList.add("walking"),oe.resize();for(let s of["#sheet",".topbar","#floor-controls"])Dt(s).hidden=!0;oe.setFirstPerson(!0),$l(),requestAnimationFrame(og)};function Uf(i){for(let t of Lt.steps)t.kind==="elev"&&t.s<i.s&&i.liftDone.add(t.s)}function gS(){ye?.lift?.close(),ye=null,Ze.supported&&speechSynthesis.cancel(),Dt("#walk").hidden=!0,document.body.classList.remove("walking"),oe.resize();for(let i of["#sheet",".topbar","#floor-controls"])Dt(i).hidden=!1;if(oe.setFirstPerson(!1),Lt.route){let i=Lt.route.pts[Lt.route.pts.length-1].f;i!==oe.floor&&oe.setFloor(i)}as()}function $l(){ye&&(Dt("#walk-play").replaceChildren(kl(ye.playing?"pause":"play")),Dt("#walk-play").setAttribute("aria-label",ye.playing?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD"),Dt("#walk-speed").textContent=`${ye.speed}\xD7`)}Dt("#walk-close").onclick=gS;Dt("#walk-play").onclick=()=>{ye&&(ye.s>=ye.end-.05&&(ye.s=ye.s0,ye.liftDone.clear(),Uf(ye),ye.yaw=null),ye.playing=!ye.playing,$l())};Dt("#walk-speed").onclick=()=>{ye&&(ye.speed=ye.speed===1?2:ye.speed===2?4:1,$l())};function rg(i){if(!ye||ye.lift)return;let t=Math.max(0,Math.min(Lt.steps.length-1,Ql(Lt.steps,ye.s)+i));ye.s=Math.min(ye.end,Lt.steps[t].s+.01),Uf(ye),ye.yaw=null}Dt("#walk-prev").onclick=()=>rg(-1);Dt("#walk-next").onclick=()=>rg(1);function og(i){if(!ye)return;let t=ye,e=Lt.route,n=Lt.steps,s=Math.min(.05,(i-t.last)/1e3);if(t.last=i,t.playing&&!t.lift){let b=$e(e,t.cum,t.s),y=e.pts[b.i]?.kind==="stair",x=Math.min(t.end,t.s+s*t.speed*(y?1.3:2.4)),T=n.find(w=>w.kind==="elev"&&w.s>=t.s-1e-6&&w.s<=x&&!t.liftDone.has(w.s));T&&(x=T.s,t.liftDone.add(T.s),Ze.say(T.text),t.lift=Bl({from:T.f,to:T.to,title:`${je(T.to)}\uB85C \uC774\uB3D9 \uC911`,hint:T.sub}),t.lift.finished.then(()=>{ye===t&&(t.lift=null,t.s=T.s+.02,t.yaw=null)})),t.s=x}let r=$e(e,t.cum,t.s),o=$e(e,t.cum,Math.min(t.total,t.s+2.2)),a=e.pts[e.pts.length-1],c=t.end-t.s<3&&Math.hypot(a.x-r.x,a.y-r.y)>.3?Math.atan2(a.y-r.y,a.x-r.x)*180/Math.PI:Math.hypot(o.x-r.x,o.y-r.y)>.3?Math.atan2(o.y-r.y,o.x-r.x)*180/Math.PI:t.yaw??90;t.yaw==null&&(t.yaw=c);let l=((c-t.yaw)%360+540)%360-180;t.yaw+=l*Math.min(1,s*3.2),oe.setWalkPose({x:r.x,y:r.y,z:r.z,f:r.f,yaw:t.yaw,pitch:-.1}),Dt("#walk-bar").style.width=`${t.s/Math.max(.01,t.end)*100}%`;let h=co(n,e,t.cum,t.s),u=Ql(n,t.s);u!==t.step&&(t.step=u,u>0&&n[u].kind!=="elev"&&Ze.say(n[u].text));let f=t.s>=t.end-.05,d=Dt("#walk-step");d.replaceChildren();let g=Ve("div");g.append(Ve("b","",f?`${Lt.dest.title} \uB3C4\uCC29`:h.dist<3?`\uC9C0\uAE08 ${h.step.action}`:`${Math.round(h.dist)}m \uC55E ${h.step.kind==="arrive"?Lt.dest.title:h.step.action}`),Ve("small","",`${ze(r.f)} \xB7 ${n[u].text}`));let _=Ve("div","hud-arrow");no(_,f?"arrive":h.dist<3?h.step.dir:"straight",!0),d.append(_,g);let m=ng(r.x,r.y,r.f,t.yaw,3,40),p=Dt("#walk-photo");m&&!t.lift?(t.shot!==m.id&&(t.shot=m.id,p.querySelector("img").src=ig(m)),p.hidden=!1):p.hidden=!0,f&&t.playing&&(t.playing=!1,$l(),Ze.say(`${Lt.dest.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`)),requestAnimationFrame(og)}function ag(i){Lt.route&&$m({indoor:Qe,route:Lt.route,steps:Lt.steps,dest:Lt.dest,mode:Lt.mode,demo:i,assets:qs,onDemo:Ff,onRoute:(t,e)=>{Lt.route=t,Lt.steps=e,oe.showRoute(t,Lt.dest,e)}})}Dt("#ar-open").onclick=()=>ag(!1);Dt("#demo-open").onclick=Ff;async function Ff(){let i=await fetch(qs+"demo.json").then(e=>e.json()),t=Ys.find(e=>e.id===i.from)||Ys[0];ro(Pf(t)),Lt.dest=Qe.findDest(i.to),Nf("stairs",!1),ls(),ag(!0)}cS().catch(i=>{console.error(i);let t=Dt("#loading");t.hidden=!1,t.classList.remove("done"),Dt("#loading-status").textContent="\uBBF8\uB798\uAD00 \uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694",Dt("#loading-error-detail").textContent=String(i.message||i),Dt("#loading-error").hidden=!1,Dt("#loading-retry").onclick=()=>location.reload()})});_S();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
