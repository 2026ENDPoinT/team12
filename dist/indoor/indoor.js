(()=>{var ug=Object.defineProperty;var Qe=(i,t)=>()=>(i&&(t=i(i=0)),t);var fg=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports),dg=(i,t)=>{for(var e in t)ug(i,e,{get:t[e],enumerable:!0})};function wa(i){return String(i??"").normalize("NFKC").toLowerCase().replace(/\s+/g,"")}function pg(i,t){let e=[Array.from({length:t.length+1},(n,s)=>s)];for(let n=1;n<=i.length;n++){let s=[n];e.push(s);for(let r=1;r<=t.length;r++)s[r]=Math.min(e[n-1][r]+1,s[r-1]+1,e[n-1][r-1]+ +(i[n-1]!==t[r-1])),n>1&&r>1&&i[n-1]===t[r-2]&&i[n-2]===t[r-1]&&(s[r]=Math.min(s[r],e[n-2][r-2]+1))}return e[i.length][t.length]}function Hf(i,t,e,n=5){let s=wa(i);if(s.length<2)return[];let r=/^b?\d+$/.test(s);if(r&&s.length<3)return[];let o=s.normalize("NFD"),a=r||o.length<6?1:o.length<12?2:3;return t.flatMap(c=>{let l=1/0;for(let h of e(c)){let u=wa(h);if(!(!u||r!==/^b?\d+$/.test(u)))for(let f=Math.max(2,s.length-1);f<=s.length+1;f++){if(f>u.length||r&&f!==u.length)continue;let d=u.slice(0,f).normalize("NFD");if(Math.abs(d.length-o.length)>a)continue;let g=pg(o,d);g<=a&&(l=Math.min(l,g*10+(u.length-f)*.1))}}return Number.isFinite(l)?[{item:c,score:l}]:[]}).sort((c,l)=>c.score-l.score).slice(0,n).map(({item:c})=>c)}var Vf=Qe(()=>{});function on(i){return i===0?"B1":`${i}F`}function Ye(i){return i===0?"\uC9C0\uD558 1\uCE35":`${i}\uCE35`}function Eg(i){return typeof atob=="function"?Uint8Array.from(atob(i),t=>t.charCodeAt(0)):new Uint8Array(Buffer.from(i,"base64"))}function Tg(i){let t={};for(let e of i.floors)t[e.n]=Eg(e.grid);return(e,n,s)=>{let r=Math.floor((n-i.gx0)/i.cell),o=Math.floor((i.gy1-s)/i.cell);if(!t[e]||r<0||o<0||r>=i.gw||o>=i.gh)return!1;let a=o*i.gw+r;return(t[e][a>>3]>>7-(a&7)&1)===1}}function Ql(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++)i[s][1]>e!=i[r][1]>e&&t<(i[r][0]-i[s][0])*(e-i[s][1])/(i[r][1]-i[s][1])+i[s][0]&&(n=!n);return n}function Gf(i){let t=i.floors.map(G=>G.n),e=G=>i.floors.find(et=>et.n===G),n=Tg(i);function s(G,et,rt,at=18){if(n(G,et,rt))return[et,rt];for(let N=i.cell;N<at;N+=i.cell)for(let C=0;C<Math.PI*2;C+=Math.max(.05,i.cell/N)){let W=et+N*Math.cos(C),gt=rt+N*Math.sin(C);if(n(G,W,gt))return[W,gt]}return null}function r(G,et,rt){let at=e(G);return at&&at.rooms.find(N=>Ql(N.poly,et,rt))||null}let o=i.ramps.map(G=>{let et=0,rt=[0];for(let at=1;at<G.pts.length;at++)et+=Math.hypot(G.pts[at][0]-G.pts[at-1][0],G.pts[at][1]-G.pts[at-1][1]),rt.push(et);return{...G,cum:rt,T:et}}),a=Math.floor(i.gw/Ci),c=Math.floor(i.gh/Ci),l=a*c,h=G=>[i.gx0+(G%a*Ci+Ci/2)*i.cell,i.gy1-(Math.floor(G/a)*Ci+Ci/2)*i.cell],u={},f={},d={},g=[1,1.7,1.2,1];for(let G of t){let et=new Uint8Array(l),rt=new Int16Array(l).fill(-1),at=e(G).rooms;for(let W=0;W<l;W++){let[gt,pt]=h(W);if(et[W]=n(G,gt,pt)?1:0,et[W]){for(let Lt=0;Lt<at.length;Lt++)if(!["stair","ostair","elev"].includes(at[Lt].cat)&&Ql(at[Lt].poly,gt,pt)){rt[W]=Lt;break}}}u[G]=et,f[G]=rt;let N=new Uint8Array(l).fill(255),C=[];for(let W=0;W<l;W++)et[W]||(N[W]=0,C.push(W));for(let W=0;W<C.length;W++){let gt=C[W],pt=gt%a,Lt=gt/a|0;if(!(N[gt]>=3))for(let Kt=-1;Kt<=1;Kt++)for(let P=-1;P<=1;P++){let Vt=pt+P,St=Lt+Kt;if(Vt<0||St<0||Vt>=a||St>=c)continue;let Ft=St*a+Vt;N[Ft]>N[gt]+1&&(N[Ft]=N[gt]+1,C.push(Ft))}}d[G]=N}function _(G,et,rt){let at=Math.floor((et-i.gx0)/i.cell/Ci),N=Math.floor((i.gy1-rt)/i.cell/Ci),C=u[G];if(!C)return-1;let W=-1,gt=1e9;for(let pt=0;pt<40&&W<0;pt++)for(let Lt=N-pt;Lt<=N+pt;Lt++)for(let Kt=at-pt;Kt<=at+pt;Kt++){if(Kt<0||Lt<0||Kt>=a||Lt>=c||!C[Lt*a+Kt])continue;let P=(Kt-at)**2+(Lt-N)**2;P<gt&&(gt=P,W=Lt*a+Kt)}return W}let m=[];for(let G of o){let et=G.pts[0],rt=G.pts[G.pts.length-1],at=_(G.lo,et[0],et[1]),N=_(G.lo+1,rt[0],rt[1]);at>=0&&N>=0&&e(G.lo+1)&&m.push({kind:"stair",id:G.id,fa:G.lo,fb:G.lo+1,ca:at,cb:N,cost:G.T+gg,ramp:G})}function p(G,et){let rt=null;for(let at of e(G).rooms)if(at.cat==="elev"){let N=Math.hypot(at.c[0]-et[0],at.c[1]-et[1]);(!rt||N<rt[0])&&(rt=[N,at.c])}return rt&&rt[0]<5?rt[1]:et}let S=[];for(let G of i.floors)for(let et of G.doors)et.cat==="elev"&&S.push({f:G.n,p:et.p,id:et.id});let y=[];for(let G of S){let et=y.find(rt=>Math.hypot(rt.p[0]-G.p[0],rt.p[1]-G.p[1])<3&&!rt.doors.some(at=>at.f===G.f));et||y.push(et={p:G.p,doors:[]}),et.doors.push(G)}y.forEach((G,et)=>{G.id=`EV${et+1}`,G.doors.sort((rt,at)=>rt.f-at.f);for(let rt=0;rt<G.doors.length;rt++)for(let at=rt+1;at<G.doors.length;at++){let N=G.doors[rt],C=G.doors[at],W=_(N.f,N.p[0],N.p[1]),gt=_(C.f,C.p[0],C.p[1]);W>=0&&gt>=0&&m.push({kind:"elev",id:G.id,fa:N.f,fb:C.f,ca:W,cb:gt,cost:yg+vg*(C.f-N.f),pa:N.p,pb:C.p,qa:p(N.f,N.p),qb:p(C.f,C.p)})}});let x=G=>t.indexOf(G);function T(G,et,rt={}){let at=rt.mode||"stairs",N=new Set(rt.allowRooms||[]),C=l*t.length,W=_(G.f,G.x,G.y);if(W<0)return null;let gt=x(G.f)*l+W,pt=new Map;for(let tt of et){let vt=_(tt.f,tt.x,tt.y);vt>=0&&pt.set(x(tt.f)*l+vt,tt)}if(!pt.size)return null;let Lt=new Float64Array(C).fill(1/0),Kt=new Int32Array(C).fill(-1),P=new Int32Array(C).fill(-1);Lt[gt]=0;let Vt=new Map;m.forEach((tt,vt)=>{let bt=x(tt.fa)*l+tt.ca,ht=x(tt.fb)*l+tt.cb;(Vt.get(bt)||Vt.set(bt,[]).get(bt)).push([ht,vt]),(Vt.get(ht)||Vt.set(ht,[]).get(ht)).push([bt,vt])});let St=[],Ft=(tt,vt)=>{St.push([tt,vt]);let bt=St.length-1;for(;bt>0;){let ht=bt-1>>1;if(St[ht][0]<=St[bt][0])break;[St[ht],St[bt]]=[St[bt],St[ht]],bt=ht}},Gt=()=>{let tt=St[0],vt=St.pop();if(St.length){St[0]=vt;let bt=0;for(;;){let ht=2*bt+1,mt=ht+1,Ht=bt;if(ht<St.length&&St[ht][0]<St[Ht][0]&&(Ht=ht),mt<St.length&&St[mt][0]<St[Ht][0]&&(Ht=mt),Ht===bt)break;[St[Ht],St[bt]]=[St[bt],St[Ht]],bt=Ht}}return tt};Ft(0,gt);let we=Ci*i.cell,zt=-1;for(;St.length;){let[tt,vt]=Gt();if(tt>Lt[vt])continue;if(pt.has(vt)){zt=vt;break}let bt=Math.floor(vt/l),ht=vt-bt*l,mt=t[bt],Ht=u[mt],qt=f[mt],Ut=ht%a,se=Math.floor(ht/a);for(let L=-1;L<=1;L++)for(let Y=-1;Y<=1;Y++){if(!Y&&!L)continue;let X=Ut+Y,B=se+L;if(X<0||B<0||X>=a||B>=c)continue;let F=B*a+X;if(!Ht[F]||Y&&L&&!(Ht[se*a+X]&&Ht[B*a+Ut]))continue;let it=qt[F],ut=(it>=0&&!N.has(e(mt).rooms[it].id)?mg:1)*g[Math.min(3,d[mt][F])],Wt=bt*l+F,Dt=tt+Math.hypot(Y,L)*we*ut;Dt<Lt[Wt]&&(Lt[Wt]=Dt,Kt[Wt]=vt,P[Wt]=-1,Ft(Dt,Wt))}let O=Vt.get(vt);if(O)for(let[L,Y]of O){let X=tt+m[Y].cost+(at==="elevator"&&m[Y].kind==="stair"?_g:0);X<Lt[L]&&(Lt[L]=X,Kt[L]=vt,P[L]=Y,Ft(X,L))}}if(zt<0)return null;let $t=[];for(let tt=zt;tt>=0;tt=Kt[tt])$t.push(tt);$t.reverse();let ye=[],ve=null;for(let tt=0;tt<$t.length;tt++){let vt=$t[tt],bt=t[Math.floor(vt/l)],[ht,mt]=h(vt%l);if(P[vt]>=0){let Ht=m[P[vt]],qt=bt>t[Math.floor($t[tt-1]/l)];ye.push({kind:Ht.kind,id:Ht.id,from:qt?Ht.fa:Ht.fb,to:bt,link:Ht,up:qt}),ve=null}ve||(ve={kind:"walk",f:bt,pts:[]},ye.push(ve)),ve.pts.push([ht,mt])}let R=pt.get(zt),v=ye.filter(tt=>tt.kind==="walk");v[0].pts[0]=[G.x,G.y],v[v.length-1].pts.push([R.x,R.y]);for(let tt of v)tt.pts=A(tt.f,tt.pts);let ot=[];for(let tt of ye){if(tt.i0=ot.length,tt.kind==="walk"){let vt=e(tt.f).z;for(let[bt,ht]of tt.pts)ot.push({x:bt,y:ht,z:vt,f:tt.f,kind:"walk"})}else if(tt.kind==="stair"){let vt=tt.link.ramp,bt=e(vt.lo).z,ht=tt.up?vt.pts:[...vt.pts].reverse();for(let mt of ht)ot.push({x:mt[0],y:mt[1],z:bt+mt[2]*i.FH,f:vt.lo+(mt[2]>.5?1:0),kind:"stair"})}else{let vt=tt.link,bt=tt.up?vt.pa:vt.pb,ht=tt.up?vt.pb:vt.pa;ot.push({x:bt[0],y:bt[1],z:e(tt.from).z,f:tt.from,kind:"elev"}),ot.push({x:ht[0],y:ht[1],z:e(tt.to).z,f:tt.to,kind:"elev"})}tt.i1=ot.length-1}let ft=0;for(let tt=1;tt<ot.length;tt++)ot[tt].kind==="elev"&&ot[tt-1].kind==="elev"||(ft+=Math.hypot(ot[tt].x-ot[tt-1].x,ot[tt].y-ot[tt-1].y));let ct=ye.filter(tt=>tt.kind!=="walk"),Zt=ct.filter(tt=>tt.kind==="stair").reduce((tt,vt)=>tt+Math.abs(vt.to-vt.from),0);return{pts:ot,legs:ye,len:ft,cost:Lt[zt],target:R,vertical:ct,mode:at,stairFloors:Zt}}function w(G,et,rt){let at=Math.hypot(rt[0]-et[0],rt[1]-et[1]);if(at<1e-6)return!0;let N=Math.ceil(at/.1),C=-(rt[1]-et[1])/at*.25,W=(rt[0]-et[0])/at*.25;for(let gt=1;gt<N;gt++){let pt=gt/N,Lt=et[0]+(rt[0]-et[0])*pt,Kt=et[1]+(rt[1]-et[1])*pt;if(!n(G,Lt,Kt)||!n(G,Lt+C,Kt+W)||!n(G,Lt-C,Kt-W))return!1}return!0}function A(G,et){if(et.length<3)return et;let rt=[et[0]],at=0;for(;at<et.length-1;){let N=et.length-1;for(;N>at+1&&!w(G,et[at],et[N]);)N--;rt.push(et[N]),at=N}return U(G,rt,.35)}function U(G,et,rt){if(et.length<3)return et;let at=et[0],N=et[et.length-1],C=-1,W=0,gt=Math.hypot(N[0]-at[0],N[1]-at[1])||1e-9;for(let Kt=1;Kt<et.length-1;Kt++){let P=Math.abs((N[0]-at[0])*(at[1]-et[Kt][1])-(at[0]-et[Kt][0])*(N[1]-at[1]))/gt;P>W&&(W=P,C=Kt)}if(W<=rt&&w(G,at,N))return[at,N];if(C<0)return et;let pt=U(G,et.slice(0,C+1),rt),Lt=U(G,et.slice(C),rt);return[...pt.slice(0,-1),...Lt]}let b=i.names||{},M=new Map;for(let G of i.floors){let et=(rt,at,N,C,W)=>{if(N==="stair"||N==="ostair"||Mg.test(rt))return;let gt=`${G.n}:${rt}`,pt=M.get(gt);if(!pt){let Lt=/^[0-9B]/.test(rt),Kt=rt[0]==="B"?0:+rt[0],Vt=(b[rt]&&G.n===Kt?b[rt]:"")||(at!==rt&&at!=="\uC2E4"?at:"");pt={key:gt,id:rt,f:G.n,cat:N,numbered:Lt,title:Lt?`${rt}\uD638`:at,name:Lt?Vt:"",catLabel:bg[N]||"",doors:[],center:null};let St=N==="toilet"&&/여|남/.exec(pt.title)?.[0],Ft=St?[`${St}\uC790\uD654\uC7A5\uC2E4`,`${St}\uC131\uD654\uC7A5\uC2E4`,`\uD654\uC7A5\uC2E4${St}\uC790`]:[];pt.search=[rt,pt.title,Vt,...Sg[N]||[],...Ft].map(Ji).join("|"),M.set(gt,pt)}W?pt.doors.push(C):pt.center=C};for(let rt of G.doors)et(rt.id,rt.name,rt.cat,rt.p,!0);for(let rt of G.rooms)et(rt.id,rt.name,rt.cat,rt.c,!1)}let D=[...M.values()].map(G=>({...G,doors:G.doors.length?G.doors:[G.center]}));for(let G of D){if(G.numbered)continue;if(D.filter(rt=>rt.f===G.f&&rt.title===G.title).length>1){let rt=G.doors[0];G.name=rt[0]<0?"\uC11C\uCABD":"\uB3D9\uCABD"}}D.sort((G,et)=>G.f-et.f||Number(et.numbered)-Number(G.numbered)||G.id.localeCompare(et.id,"ko",{numeric:!0}));let z="",k=new Map;function K(G,et){let rt=et.origin;if(!rt)return 1/0;let at=`${rt.f}:${rt.x}:${rt.y}:${et.mode||"stairs"}`;if(at!==z&&(z=at,k.clear()),!k.has(G.key)){let N=Ot(rt,G,{mode:et.mode||"stairs"});k.set(G.key,N?.len??1/0)}return k.get(G.key)}function nt(G,et,rt){if(!Number.isFinite(rt.floor))return G.f-et.f;let at=Math.abs(G.f-rt.floor)-Math.abs(et.f-rt.floor);if(at)return at;if(G.cat==="toilet"&&et.cat==="toilet"&&rt.origin){let N=K(G,rt),C=K(et,rt);if(N!==C)return N-C}return G.f-et.f}function Z(G,et=30,rt={}){let at=Ji(G);if(!at)return[];let N=[];for(let C of D){let W=Ji(C.id),gt=0;W===at?gt=100:W.startsWith(at)?gt=80-(W.length-at.length):Ji(C.title)===at?gt=70:Ji(C.name).includes(at)?gt=60:C.search.includes(at)&&(gt=40),gt&&N.push([gt,C])}return N.sort((C,W)=>W[0]-C[0]||nt(C[1],W[1],rt)),N.slice(0,et).map(C=>C[1])}function yt(G,et=5,rt={}){let at=Hf(Ji(G),D,N=>N.search.split("|"),D.length);return at.length&&at.every(N=>N.cat==="toilet")&&at.sort((N,C)=>nt(N,C,rt)),at.slice(0,et)}let J=G=>D.find(et=>et.key===G)||D.find(et=>Ji(et.id)===Ji(G))||null,Tt=.7;function It(G,et,rt){let at=e(G).rooms.filter(W=>W.id===rt).map(W=>W.poly);if(!at.length)return null;let N=null;for(let W of at)for(let gt=1;gt<W.length;gt++){let pt=W[gt-1],Lt=W[gt],Kt=Lt[0]-pt[0],P=Lt[1]-pt[1],Vt=Kt*Kt+P*P;if(Vt<1e-6)continue;let St=Math.max(0,Math.min(1,((et[0]-pt[0])*Kt+(et[1]-pt[1])*P)/Vt)),Ft=Math.hypot(pt[0]+St*Kt-et[0],pt[1]+St*P-et[1]);if(!N||Ft<N[0]){let Gt=Math.sqrt(Vt);N=[Ft,-P/Gt,Kt/Gt]}}if(!N||N[0]>1)return null;let C=(W,gt)=>at.some(pt=>Ql(pt,W,gt));for(let W of[1,-1]){let gt=N[1]*W,pt=N[2]*W;if(!C(et[0]+gt*.3,et[1]+pt*.3))for(let Lt of[Tt,.55,.9,1.1,.4]){let Kt=et[0]+gt*Lt,P=et[1]+pt*Lt;if(n(G,Kt,P)&&!C(Kt,P))return[Kt,P]}}return null}function Ot(G,et,rt={}){let at=et.doors.map(W=>{let gt=It(et.f,W,et.id)||s(et.f,W[0],W[1],6)||W;return{f:et.f,x:gt[0],y:gt[1],door:W}}).filter(Boolean),N={...rt,allowRooms:[et.id]},C=T(G,at,N);if(C&&(rt.mode||"stairs")==="stairs"&&C.stairFloors>=xg){let W=T(G,at,{...N,mode:"elevator"});if(W&&W.stairFloors<C.stairFloors)return{...W,mode:"stairs",preferElev:!0}}return C}return{M:i,floors:t,FL:e,walk:n,nearest:s,roomAt:r,ramps:o,shafts:y,links:m,route:T,routeTo:Ot,destinations:D,search:Z,suggest:yt,findDest:J}}var Ci,mg,gg,_g,xg,yg,vg,Mg,Sg,bg,Ji,ho=Qe(()=>{Vf();Ci=3,mg=4,gg=4,_g=2e3,xg=3,yg=40,vg=3,Mg=/^(\dC|\dS|\dW|\dE|\dK)-/,Sg={toilet:["\uD654\uC7A5\uC2E4","toilet","wc","restroom"],elev:["\uC5D8\uB9AC\uBCA0\uC774\uD130","\uC2B9\uAC15\uAE30","elevator","ev"],prof:["\uAD50\uC218","\uAD50\uC218\uC2E4","\uAD50\uC218\uC5F0\uAD6C\uC2E4","\uC5F0\uAD6C\uC2E4"],lab:["\uC2E4\uC2B5\uC2E4","lab"],office:["\uC0AC\uBB34\uC2E4","\uD559\uACFC","\uACFC\uC0AC"],studio:["\uC2A4\uD29C\uB514\uC624"],server:["\uC11C\uBC84"],prep:["\uC900\uBE44\uC2E4"],store:["\uCC3D\uACE0"],room:["\uAC15\uC758\uC2E4","\uAD50\uC2E4"]},bg={toilet:"\uD654\uC7A5\uC2E4",elev:"\uC5D8\uB9AC\uBCA0\uC774\uD130",prof:"\uAD50\uC218\uC5F0\uAD6C\uC2E4",lab:"\uC2E4\uC2B5\uC2E4",office:"\uC0AC\uBB34\uC2E4",studio:"\uC2A4\uD29C\uB514\uC624",server:"\uC11C\uBC84\uC2E4",prep:"\uC900\uBE44\uC2E4",store:"\uCC3D\uACE0",room:"\uAC15\uC758\uC2E4"};Ji=i=>wa(i).replace(/호$/,"")});function er(i,t){let e=t-i;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e}function Aa(i){let t=Math.abs(i),e=i>0?"left":"right",n=i>0?"\uC67C\uCABD":"\uC624\uB978\uCABD";return t<wg?{dir:"straight",word:"\uC9C1\uC9C4",side:""}:t>145?{dir:`u-${e}`,word:"\uB4A4\uB85C \uB3CC\uC544",side:"\uB4A4"}:t<60?{dir:`slight-${e}`,word:`${n} \uBC29\uD5A5\uC73C\uB85C`,side:n}:{dir:e,word:`${n}\uC73C\uB85C`,side:n}}function nr(i,t,e={}){let n=Qi(i),s=i.pts,r=n[n.length-1],o=y=>{let x=en(i,n,Math.max(0,Math.min(r,y)));return[x.x,x.y]},a=(e.landmarks||[]).filter(y=>!t||y.key!==t.key);function c(y,x,T=3.5){let w=null;for(let A of a)if(!(A.f!==y||A.cat==="store"))for(let U of A.doors){let b=Math.hypot(U[0]-x[0],U[1]-x[1]),M=b-(A.numbered?.5:0);b<T&&(!w||M<w[0])&&(w=[M,A])}return w&&w[1]}let l=y=>[n[y.i0],n[y.i1]];function h(y,x){let T=o(Math.max(x,y-th)),w=o(y);return Math.hypot(w[0]-T[0],w[1]-T[1])>.2?xs(T,w):null}function u(y,x){let T=o(y),w=o(Math.min(x,y+th));return Math.hypot(w[0]-T[0],w[1]-T[1])>.2?xs(T,w):null}function f(y){if(y.kind==="stair"){let b=y.link.ramp.pts,M=y.up?b:[...b].reverse();return{inH:xs(M[0],M[1]),outH:xs(M[M.length-2],M[M.length-1]),p0:M[0]}}let x=y.link,T=y.up?x.pa:x.pb,w=y.up?x.qa:x.qb,A=y.up?x.pb:x.pa,U=y.up?x.qb:x.qa;return{inH:xs(T,w),outH:xs(U,A),p0:T}}let d=[],g=i.legs,_=null,m=null;g.forEach((y,x)=>{if(y.kind!=="walk"){let b=f(y),M=g[x-1],D="";if(M&&M.kind==="walk"){let[k,K]=l(M),nt=h(K,k);nt!=null&&(D=Aa(er(nt,b.inH)).side)}let z=y.to>y.from;d.push({kind:y.kind,dir:y.kind==="elev"?"elev":z?"stair-up":"stair-down",f:y.from,to:y.to,at:b.p0,s:n[y.i0],side:D,id:y.id}),_=b.outH,m=y.kind;return}let[T,w]=l(y),A=[];for(let b=y.i0+1;b<y.i1;b++){let M=n[b],D=h(M,T),z=u(M,w);D==null||z==null||A.push({s:M,d:er(D,z)})}let U=[];for(let b of A){let M=U[U.length-1];M&&b.s-M.s1<Ag?(M.s1=b.s,M.d=er(h(M.s0,T)??0,u(b.s,w)??0)):U.push({s0:b.s,s1:b.s,d:b.d})}if(x===0)d.push({kind:"start",dir:"start",f:y.f,at:o(T),s:T});else if(_!=null){let b=u(T,w),M=Aa(b==null?0:er(_,b));d.push({kind:"walk",dir:M.dir,exit:m,word:M.word,f:y.f,at:o(T),s:T,h0:_,hOut:b})}for(let b of U){let M=Aa(b.d);if(M.dir==="straight")continue;let D=(b.s0+b.s1)/2;d.push({kind:"walk",dir:M.dir,word:M.word,f:y.f,at:o(D),s:D,hOut:u(b.s1,w)})}});for(let y=d.length-1;y>=2;y--){let x=d[y-2],T=d[y-1],w=d[y];x.kind==="stair"&&w.kind==="stair"&&x.dir===w.dir&&x.id===w.id&&T.kind==="walk"&&w.s-T.s<5&&(x.to=w.to,d.splice(y-1,2),y--)}let p=s[s.length-1],S="";if(t){let y=h(r,Math.max(0,r-th)),x=i.target?.door||t.center;if(y!=null&&x&&Math.hypot(x[0]-p.x,x[1]-p.y)>.2){let T=er(y,xs([p.x,p.y],x));S=Math.abs(T)<35?"\uC815\uBA74":Math.abs(T)>145?"\uB4A4\uCABD":T>0?"\uC67C\uCABD":"\uC624\uB978\uCABD"}}d.push({kind:"arrive",dir:"arrive",f:p.f,at:[p.x,p.y],s:r,side:S});for(let y=d.length-2;y>=1;y--){let x=d[y],T=d[y+1],w=d[y-1],A=T.s-x.s;if(x.kind==="walk"&&!x.exit&&A<2.5&&T.kind!=="walk"&&T.kind!=="start")d.splice(y,1);else if(w.kind==="walk"&&w.exit&&x.kind==="walk"&&!x.exit&&x.s-w.s<4.5){let U=Aa(x.hOut==null||w.h0==null?0:er(w.h0,x.hOut));Object.assign(x,{exit:w.exit,dir:U.dir,word:U.word,s:w.s,at:w.at}),d.splice(y-1,1)}}for(let y=0;y<d.length;y++){let x=d[y],T=d[y+1];x.dist=T?Math.max(0,T.s-x.s):0;let w=x.kind==="walk"&&!x.exit?c(x.f,x.at):null,A=T&&x.kind==="start"&&T.kind!=="arrive"?c(T.f,T.at,4):null;if(x.kind==="start")x.action="\uC9C1\uC9C4",x.text=`${A?`${A.title} \uCABD\uC73C\uB85C `:""}${eh(x.dist)} \uC9C1\uC9C4`,x.sub="\uCD9C\uBC1C";else if(x.kind==="walk"){let U=x.exit?x.exit==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130\uC5D0\uC11C \uB0B4\uB824 ":"\uACC4\uB2E8\uC5D0\uC11C \uB098\uC640 ":w?`${w.title} \uC55E\uC5D0\uC11C `:"";x.action=x.word,x.text=x.dir==="straight"?`${U}${eh(x.dist)} \uC9C1\uC9C4`:`${U}${x.word} ${eh(x.dist)}`,x.sub=""}else if(x.kind==="stair"){let U=x.dir==="stair-up"?"\uC62C\uB77C\uAC00\uAE30":"\uB0B4\uB824\uAC00\uAE30";x.action=`\uACC4\uB2E8\uC73C\uB85C ${Ye(x.to)}`,x.text=`${x.side&&x.side!=="\uB4A4"?`${x.side}\uC5D0 \uC788\uB294 `:x.side==="\uB4A4"?"\uB4A4\uCABD ":""}\uACC4\uB2E8\uC73C\uB85C ${Ye(x.to)}\uAE4C\uC9C0 ${U}`,x.sub=`${Math.abs(x.to-x.f)}\uAC1C \uCE35 ${x.dir==="stair-up"?"\uC704":"\uC544\uB798"}`}else x.kind==="elev"?(x.action=`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C ${Ye(x.to)}`,x.text=`${x.side&&x.side!=="\uB4A4"?`${x.side} `:""}\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Ye(x.to)}\uC73C\uB85C`,x.sub=`${x.to===0?"B1":x.to}\uCE35 \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`):(x.action="\uB3C4\uCC29",x.text=`${t?t.title:"\uBAA9\uC801\uC9C0"} \uB3C4\uCC29${x.side?` \xB7 ${x.side}`:""}`,x.sub=t&&t.name?t.name:"")}return d}function Qi(i){let t=[0],e=i.pts;for(let n=1;n<e.length;n++){let s=e[n-1],r=e[n];t.push(t[n-1]+(s.kind==="elev"&&r.kind==="elev"?0:Math.hypot(r.x-s.x,r.y-s.y)))}return t}function Ra(i,t,e,n=0){let s=i.pts,r={d:1/0};for(let a=0;a<s.length-1;a++){let c=s[a],l=s[a+1];if(c.kind==="elev"&&l.kind==="elev"||c.f!==e.f&&l.f!==e.f)continue;let h=l.x-c.x,u=l.y-c.y,f=h*h+u*u||1e-9,d=Math.max(0,Math.min(1,((e.x-c.x)*h+(e.y-c.y)*u)/f)),g=Math.hypot(e.x-c.x-h*d,e.y-c.y-u*d),_=t[a]+d*(t[a+1]-t[a]),m=g+(_<n-3?2:0);(m<r.score||r.d===1/0)&&(r={d:g,s:_,i:a,t:d,score:m})}if(r.d===1/0)return null;let o=t[t.length-1];return{off:r.d,s:r.s,seg:r.i,remain:Math.max(0,o-r.s),total:o}}function uo(i,t,e,n){for(let s=1;s<i.length;s++)if(i[s].s>n+.8)return{step:i[s],index:s,dist:i[s].s-n};return{step:i[i.length-1],index:i.length-1,dist:0}}function nh(i,t){let e=0;for(let n=0;n<i.length;n++)i[n].s<=t+.8&&(e=n);return e}function en(i,t,e){let n=i.pts;for(let r=0;r<n.length-1;r++)if(t[r+1]>=e){let o=t[r+1]-t[r],a=o>0?(e-t[r])/o:1,c=n[r],l=n[r+1];return{x:c.x+(l.x-c.x)*a,y:c.y+(l.y-c.y)*a,z:c.z+(l.z-c.z)*a,f:a<.5?c.f:l.f,i:r}}return{...n[n.length-1],i:n.length-1}}function Ca(i){let t=i/1.2;return t<60?`${Math.max(10,Math.round(t/10)*10)}\uCD08`:`${Math.round(t/60)}\uBD84`}var wg,th,Ag,Rg,xs,eh,ih=Qe(()=>{ho();wg=35,th=3,Ag=3,Rg=180/Math.PI,xs=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*Rg;eh=i=>`${Math.max(1,Math.round(i))}m`});function qn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[i&255]+vn[i>>8&255]+vn[i>>16&255]+vn[i>>24&255]+"-"+vn[t&255]+vn[t>>8&255]+"-"+vn[t>>16&15|64]+vn[t>>24&255]+"-"+vn[e&63|128]+vn[e>>8&255]+"-"+vn[e>>16&255]+vn[e>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function pe(i,t,e){return Math.max(t,Math.min(e,i))}function du(i,t){return(i%t+t)%t}function Cg(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ig(i,t,e){return i!==t?(e-i)/(t-i):0}function To(i,t,e){return(1-e)*i+e*t}function Pg(i,t,e,n){return To(i,t,1-Math.exp(-e*n))}function Lg(i,t=1){return t-Math.abs(du(i,t*2)-t)}function Dg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ng(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ug(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Fg(i,t){return i+Math.random()*(t-i)}function Og(i){return i*(.5-Math.random())}function Bg(i){i!==void 0&&(Wf=i);let t=Wf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function kg(i){return i*Mr}function zg(i){return i*Rs}function Hg(i){return(i&i-1)===0&&i!==0}function Vg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Gg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Wg(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ni(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ue(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}function pu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Sp(){let i=wr("canvas");return i.style.display="block",i}function Ar(i){i in qf||(qf[i]=!0,console.warn(i))}function bp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Xg(){let i={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Fe&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Fe&&(s.r=Sr(s.r),s.g=Sr(s.g),s.b=Sr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===$i?Ro:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ar("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ar("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[mn]:{primaries:t,whitePoint:n,transfer:Ro,toXYZ:Yf,fromXYZ:$f,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:n,transfer:Fe,toXYZ:Yf,fromXYZ:$f,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),i}function Fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Sr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function oh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function ch(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){vs.fromArray(i,r);let a=s.x*Math.abs(vs.x)+s.y*Math.abs(vs.y)+s.z*Math.abs(vs.z),c=t.dot(vs),l=e.dot(vs),h=n.dot(vs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}function Mh(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}function s0(i,t,e,n,s,r,o,a){let c;if(t.side===gn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===si,a),c===null)return null;Wa.copy(a),Wa.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Wa);return l<e.near||l>e.far?null:{distance:l,point:Wa.clone(),object:i}}function Xa(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,za),i.getVertexPosition(c,Ha),i.getVertexPosition(l,Va);let h=s0(i,t,e,n,za,Ha,Va,rd);if(h){let u=new I;fi.getBarycoord(rd,za,Ha,Va,u),s&&(h.uv=fi.getInterpolatedAttribute(s,a,c,l,u,new At)),r&&(h.uv1=fi.getInterpolatedAttribute(r,a,c,l,u,new At)),o&&(h.normal=fi.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new I,materialIndex:0};fi.getNormal(za,Ha,Va,f.normal),h.face=f,h.barycoord=u}return h}function Ws(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Tn(i){let t={};for(let e=0;e<i.length;e++){let n=Ws(i[e]);for(let s in n)t[s]=n[s]}return t}function r0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function mu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:be.workingColorSpace}function $a(i,t,e,n,s,r){xr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(xo.x=r*xr.x-s*xr.y,xo.y=s*xr.x+r*xr.y):xo.copy(xr),i.copy(t),i.x+=xo.x,i.y+=xo.y,i.applyMatrix4(wp)}function Qa(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(xc.fromBufferAttribute(a,s),yc.fromBufferAttribute(a,r),e.distanceSqToSegment(xc,yc,Rh,yd)>n)return;Rh.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Rh);if(!(l<t.near||l>t.far))return{distance:l,point:yd.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}function bd(i,t,e,n,s,r,o){let a=Hh.distanceSqToPoint(i);if(a<e){let c=new I;Hh.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}function gu(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}function Ed(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function m0(i,t){let e=1-i;return e*e*t}function g0(i,t){return 2*(1-i)*i*t}function _0(i,t){return i*i*t}function wo(i,t,e,n){return m0(i,t)+g0(i,e)+_0(i,n)}function x0(i,t){let e=1-i;return e*e*e*t}function y0(i,t){let e=1-i;return 3*e*e*i*t}function v0(i,t){return 3*(1-i)*i*i*t}function M0(i,t){return i*i*i*t}function Ao(i,t,e,n,s){return x0(i,t)+y0(i,e)+v0(i,n)+M0(i,s)}function S0(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Ap(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=A0(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){let d=i[f],g=i[f+1];d<a&&(a=d),g<c&&(c=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Ko(r,o,e,a,c,l,0),o}function Ap(i,t,e,n,s){let r;if(s===B0(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=wd(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=wd(o/n|0,i[o],i[o+1],r);return r&&Or(r,r.next)&&(Jo(r),r=r.next),r}function Ls(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Or(e,e.next)||je(e.prev,e,e.next)===0)){if(Jo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ko(i,t,e,n,s,r,o){if(!i)return;!o&&r&&L0(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?E0(i,n,s,r):b0(i)){t.push(c.i,i.i,l.i),Jo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=T0(Ls(i),t),Ko(i,t,e,n,s,r,2)):o===2&&w0(i,t,e,n,s,r):Ko(Ls(i),t,e,n,s,r,1);break}}}function b0(i){let t=i.prev,e=i,n=i.next;if(je(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Eo(s,a,r,c,o,l,g.x,g.y)&&je(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function E0(i,t,e,n){let s=i.prev,r=i,o=i.next;if(je(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),g=Math.min(h,u,f),_=Math.max(a,c,l),m=Math.max(h,u,f),p=Vh(d,g,t,e,n),S=Vh(_,m,t,e,n),y=i.prevZ,x=i.nextZ;for(;y&&y.z>=p&&x&&x.z<=S;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Eo(a,h,c,u,l,f,y.x,y.y)&&je(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Eo(a,h,c,u,l,f,x.x,x.y)&&je(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Eo(a,h,c,u,l,f,y.x,y.y)&&je(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=S;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Eo(a,h,c,u,l,f,x.x,x.y)&&je(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function T0(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Or(n,s)&&Cp(n,e,e.next,s)&&jo(n,s)&&jo(s,n)&&(t.push(n.i,e.i,s.i),Jo(e),Jo(e.next),e=i=s),e=e.next}while(e!==i);return Ls(e)}function w0(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&U0(o,a)){let c=Ip(o,a);o=Ls(o,o.next),c=Ls(c,c.next),Ko(o,t,e,n,s,r,0),Ko(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function A0(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Ap(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(N0(l))}s.sort(R0);for(let r=0;r<s.length;r++)e=C0(s[r],e);return e}function R0(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function C0(i,t){let e=I0(i,t);if(!e)return t;let n=Ip(e,i);return Ls(n,n.next),Ls(e,e.next)}function I0(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Or(i,e))return e;do{if(Or(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Rp(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);jo(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&P0(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function P0(i,t){return je(i.prev,i,t.prev)<0&&je(t.next,i,i.next)<0}function L0(i,t,e,n){let s=i;do s.z===0&&(s.z=Vh(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,D0(s)}function D0(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Vh(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function N0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Rp(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Eo(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Rp(i,t,e,n,s,r,o,a)}function U0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!F0(i,t)&&(jo(i,t)&&jo(t,i)&&O0(i,t)&&(je(i.prev,i,t.prev)||je(i,t.prev,t))||Or(i,t)&&je(i.prev,i,i.next)>0&&je(t.prev,t,t.next)>0)}function je(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Or(i,t){return i.x===t.x&&i.y===t.y}function Cp(i,t,e,n){let s=ac(je(i,t,e)),r=ac(je(i,t,n)),o=ac(je(e,n,i)),a=ac(je(e,n,t));return!!(s!==r&&o!==a||s===0&&oc(i,e,t)||r===0&&oc(i,n,t)||o===0&&oc(e,i,n)||a===0&&oc(e,t,n))}function oc(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function ac(i){return i>0?1:i<0?-1:0}function F0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Cp(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function jo(i,t){return je(i.prev,i,i.next)<0?je(i,t,i.next)>=0&&je(i,i.prev,t)>=0:je(i,t,i.prev)<0||je(i,i.next,t)<0}function O0(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Ip(i,t){let e=Gh(i.i,i.x,i.y),n=Gh(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function wd(i,t,e,n){let s=Gh(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Jo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Gh(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function B0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}function Ad(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Rd(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}function k0(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}function cc(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function z0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function H0(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function Cd(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=i[a+c]}return s}function Pp(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}function V0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return xi;case"vector":case"vector2":case"vector3":case"vector4":return vi;case"color":return ta;case"quaternion":return yi;case"bool":case"boolean":return Vi;case"string":return Gi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function G0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=V0(i.type);if(i.times===void 0){let e=[],n=[];Pp(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}function Nd(i,t){return i.distance-t.distance}function Kh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Kh(r[o],t,e,!0)}}function yu(i,t,e,n){let s=J0(n);switch(e){case au:return i*t;case Kc:return i*t/s.components*s.byteLength;case jc:return i*t/s.components*s.byteLength;case lu:return i*t*2/s.components*s.byteLength;case Jc:return i*t*2/s.components*s.byteLength;case cu:return i*t*3/s.components*s.byteLength;case Wn:return i*t*4/s.components*s.byteLength;case Qc:return i*t*4/s.components*s.byteLength;case la:case ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ua:case fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case el:case il:return Math.max(i,16)*Math.max(t,8)/4;case tl:case nl:return Math.max(i,8)*Math.max(t,8)/2;case sl:case rl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ol:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case al:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ll:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case hl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case fl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case dl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case pl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ml:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case gl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case _l:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ml:case Sl:case bl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case El:case Tl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case wl:case Al:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function J0(i){switch(i){case ai:case iu:return{byteLength:1,components:1};case Hr:case su:case Vr:return{byteLength:2,components:1};case $c:case Zc:return{byteLength:2,components:4};case us:case Yc:case Kn:return{byteLength:4,components:1};case ru:case ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var Pn,En,Ud,jh,Fd,Jh,Od,Si,si,gn,Ce,qi,Es,Qh,tu,eu,Bd,os,kd,zd,Hd,Vd,Gd,Wd,Xd,qd,hc,uc,Yd,$d,Zd,Kd,jd,Jd,Qd,tp,ep,Uc,Fc,Oc,Ts,Bc,kc,zc,Hc,Vc,np,ip,Yi,sp,rp,op,ap,cp,lp,Gc,Fh,hp,nu,Hs,Vs,Wc,Xc,ca,Yn,di,Er,pn,qc,Gs,Rn,zr,oi,ai,iu,su,Hr,Yc,us,Kn,Vr,$c,Zc,Gr,ru,ou,au,cu,Wn,Tr,Wr,Kc,jc,lu,Jc,Qc,la,ha,ua,fa,tl,el,nl,il,sl,rl,ol,al,cl,ll,hl,ul,fl,dl,pl,ml,gl,_l,xl,yl,vl,Ml,Sl,bl,El,Tl,wl,Al,ws,As,lc,Oh,Bh,kh,up,hu,da,Xr,fp,dp,Rl,pp,$i,qe,mn,Ro,Fe,bs,zh,mp,gp,_p,uu,xp,yp,vp,Mp,fc,fu,ii,Co,mi,vn,Wf,Mr,Rs,Zi,At,Cn,I,sh,Xf,fe,rh,qf,Yf,$f,be,ir,dc,qg,Rr,Yg,ah,ln,Le,pc,$n,Io,mc,In,Ii,Qn,Ia,sr,rr,or,ts,es,ys,fo,Pa,La,vs,$g,po,lh,Un,Pi,hh,Da,ns,uh,Na,fh,gi,le,ar,ti,Zg,Kg,is,Ua,zn,Zf,Kf,Zn,Cr,jg,jf,cr,Li,Fa,mo,Jg,Qg,Jf,Qf,td,ed,t0,lr,dh,Oe,ei,Di,ph,Ni,hr,ur,nd,mh,gh,_h,xh,yh,vh,fi,Ep,ss,Oa,ie,Mn,e0,Sn,De,an,Ba,n0,Ge,Po,Lo,Te,i0,Xn,Sh,fr,Hn,go,dn,Be,id,Ms,ka,sd,za,Ha,Va,bh,Ga,rd,Wa,he,as,Tp,o0,a0,Vn,Do,rs,od,ad,Ke,dr,pr,gc,No,_c,tn,c0,Ir,ri,Cs,An,cs,Pr,mr,_o,gr,_r,xr,xo,wp,qa,yo,Ya,cd,Eh,ld,Uo,hd,ud,fd,l0,dd,Za,Th,pd,wh,Fo,Lr,Oo,md,h0,Bo,ls,yr,gd,Ka,_d,u0,vo,Mo,Is,Ah,f0,d0,Nn,Ss,p0,ja,Dr,Oi,xc,yc,xd,So,Ja,Rh,yd,Bi,vd,Md,Ps,ko,Nr,Sd,Hh,tc,ec,zo,ki,Ho,Vo,_i,Ur,Go,nc,ic,Ch,sc,Wo,Gn,Fr,vc,rc,Ih,Ph,Lh,Mc,Xo,Sc,qo,bc,Yo,Ec,$o,Td,Tc,Zo,hs,Wh,br,Ds,Ns,Us,Fs,bn,Fn,zi,wc,Ac,Qo,Hi,Rc,Cc,Ic,On,Vi,ta,xi,Pc,yi,Gi,vi,ea,pi,Lc,Lp,Mi,Ui,Xh,Br,vr,Dc,na,Os,Bs,Dh,Id,Pd,ia,qh,sa,Ld,bo,Nh,Yh,ks,Wi,$h,zs,Xi,Uh,ra,Nc,_u,W0,xu,X0,q0,Y0,$0,Z0,K0,j0,Zh,Ve,AS,Dd,oa,kr,aa,vu=Qe(()=>{Pn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},En={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ud=0,jh=1,Fd=2,Jh=1,Od=2,Si=3,si=0,gn=1,Ce=2,qi=0,Es=1,Qh=2,tu=3,eu=4,Bd=5,os=100,kd=101,zd=102,Hd=103,Vd=104,Gd=200,Wd=201,Xd=202,qd=203,hc=204,uc=205,Yd=206,$d=207,Zd=208,Kd=209,jd=210,Jd=211,Qd=212,tp=213,ep=214,Uc=0,Fc=1,Oc=2,Ts=3,Bc=4,kc=5,zc=6,Hc=7,Vc=0,np=1,ip=2,Yi=0,sp=1,rp=2,op=3,ap=4,cp=5,lp=6,Gc=7,Fh="attached",hp="detached",nu=300,Hs=301,Vs=302,Wc=303,Xc=304,ca=306,Yn=1e3,di=1001,Er=1002,pn=1003,qc=1004,Gs=1005,Rn=1006,zr=1007,oi=1008,ai=1009,iu=1010,su=1011,Hr=1012,Yc=1013,us=1014,Kn=1015,Vr=1016,$c=1017,Zc=1018,Gr=1020,ru=35902,ou=35899,au=1021,cu=1022,Wn=1023,Tr=1026,Wr=1027,Kc=1028,jc=1029,lu=1030,Jc=1031,Qc=1033,la=33776,ha=33777,ua=33778,fa=33779,tl=35840,el=35841,nl=35842,il=35843,sl=36196,rl=37492,ol=37496,al=37808,cl=37809,ll=37810,hl=37811,ul=37812,fl=37813,dl=37814,pl=37815,ml=37816,gl=37817,_l=37818,xl=37819,yl=37820,vl=37821,Ml=36492,Sl=36494,bl=36495,El=36283,Tl=36284,wl=36285,Al=36286,ws=2300,As=2301,lc=2302,Oh=2400,Bh=2401,kh=2402,up=2500,hu=0,da=1,Xr=2,fp=3200,dp=3201,Rl=0,pp=1,$i="",qe="srgb",mn="srgb-linear",Ro="linear",Fe="srgb",bs=7680,zh=519,mp=512,gp=513,_p=514,uu=515,xp=516,yp=517,vp=518,Mp=519,fc=35044,fu="300 es",ii=2e3,Co=2001,mi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wf=1234567,Mr=Math.PI/180,Rs=180/Math.PI;Zi={DEG2RAD:Mr,RAD2DEG:Rs,generateUUID:qn,clamp:pe,euclideanModulo:du,mapLinear:Cg,inverseLerp:Ig,lerp:To,damp:Pg,pingpong:Lg,smoothstep:Dg,smootherstep:Ng,randInt:Ug,randFloat:Fg,randFloatSpread:Og,seededRandom:Bg,degToRad:kg,radToDeg:zg,isPowerOfTwo:Hg,ceilPowerOfTwo:Vg,floorPowerOfTwo:Gg,setQuaternionFromProperEuler:Wg,normalize:Ue,denormalize:ni},At=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=pe(this.x,t.x,e.x),this.y=pe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=pe(this.x,t,e),this.y=pe(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Cn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a,p=c*f+l*d+h*g+u*_,S=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let T=Math.sqrt(y),w=Math.atan2(T,p*S);m=Math.sin(m*w)/T,a=Math.sin(a*w)/T}let x=a*S;if(c=c*m+f*x,l=l*m+d*x,h=h*m+g*x,u=u*m+_*x,m===1-a){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=pe(this.x,t.x,e.x),this.y=pe(this.y,t.y,e.y),this.z=pe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=pe(this.x,t,e),this.y=pe(this.y,t,e),this.z=pe(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return sh.copy(this).projectOnVector(t),this.sub(sh)}reflect(t){return this.sub(sh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},sh=new I,Xf=new Cn,fe=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],S=s[1],y=s[4],x=s[7],T=s[2],w=s[5],A=s[8];return r[0]=o*_+a*S+c*T,r[3]=o*m+a*y+c*w,r[6]=o*p+a*x+c*A,r[1]=l*_+h*S+u*T,r[4]=l*m+h*y+u*w,r[7]=l*p+h*x+u*A,r[2]=f*_+d*S+g*T,r[5]=f*m+d*y+g*w,r[8]=f*p+d*x+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(rh.makeScale(t,e)),this}rotate(t){return this.premultiply(rh.makeRotation(-t)),this}translate(t,e){return this.premultiply(rh.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},rh=new fe;qf={};Yf=new fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$f=new fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);be=Xg();dc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ir===void 0&&(ir=wr("canvas")),ir.width=t.width,ir.height=t.height;let s=ir.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ir}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=wr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fi(e[n]/255)*255):e[n]=Fi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},qg=0,Rr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qg++}),this.uuid=qn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(oh(s[o].image)):r.push(oh(s[o]))}else r=oh(s);n.url=r}return e||(t.images[this.uuid]=n),n}};Yg=0,ah=new I,ln=class i extends mi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=di,s=di,r=Rn,o=oi,a=Wn,c=ai,l=i.DEFAULT_ANISOTROPY,h=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=qn(),this.name="",this.source=new Rr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ah).x}get height(){return this.source.getSize(ah).y}get depth(){return this.source.getSize(ah).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yn:t.x=t.x-Math.floor(t.x);break;case di:t.x=t.x<0?0:1;break;case Er:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yn:t.y=t.y-Math.floor(t.y);break;case di:t.y=t.y<0?0:1;break;case Er:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=nu;ln.DEFAULT_ANISOTROPY=1;Le=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,x=(d+1)/2,T=(p+1)/2,w=(h+f)/4,A=(u+_)/4,U=(g+m)/4;return y>x&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=A/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=U/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=A/r,s=U/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(f-h)/S,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=pe(this.x,t.x,e.x),this.y=pe(this.y,t.y,e.y),this.z=pe(this.z,t.z,e.z),this.w=pe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=pe(this.x,t,e),this.y=pe(this.y,t,e),this.z=pe(this.z,t,e),this.w=pe(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pc=class extends mi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new ln(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Rr(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},$n=class extends pc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Io=class extends ln{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=pn,this.minFilter=pn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},mc=class extends ln{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=pn,this.minFilter=pn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},In=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(r,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ia.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ia.copy(n.boundingBox)),Ia.applyMatrix4(t.matrixWorld),this.union(Ia)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fo),Pa.subVectors(this.max,fo),sr.subVectors(t.a,fo),rr.subVectors(t.b,fo),or.subVectors(t.c,fo),ts.subVectors(rr,sr),es.subVectors(or,rr),ys.subVectors(sr,or);let e=[0,-ts.z,ts.y,0,-es.z,es.y,0,-ys.z,ys.y,ts.z,0,-ts.x,es.z,0,-es.x,ys.z,0,-ys.x,-ts.y,ts.x,0,-es.y,es.x,0,-ys.y,ys.x,0];return!ch(e,sr,rr,or,Pa)||(e=[1,0,0,0,1,0,0,0,1],!ch(e,sr,rr,or,Pa))?!1:(La.crossVectors(ts,es),e=[La.x,La.y,La.z],ch(e,sr,rr,or,Pa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ii),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ii=[new I,new I,new I,new I,new I,new I,new I,new I],Qn=new I,Ia=new In,sr=new I,rr=new I,or=new I,ts=new I,es=new I,ys=new I,fo=new I,Pa=new I,La=new I,vs=new I;$g=new In,po=new I,lh=new I,Un=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):$g.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;po.subVectors(t,this.center);let e=po.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(po,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(lh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(po.copy(t.center).add(lh)),this.expandByPoint(po.copy(t.center).sub(lh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Pi=new I,hh=new I,Da=new I,ns=new I,uh=new I,Na=new I,fh=new I,gi=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,e),Pi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){hh.copy(t).add(e).multiplyScalar(.5),Da.copy(e).sub(t).normalize(),ns.copy(this.origin).sub(hh);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Da),a=ns.dot(this.direction),c=-ns.dot(Da),l=ns.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(hh).addScaledVector(Da,f),d}intersectSphere(t,e){Pi.subVectors(t.center,this.origin);let n=Pi.dot(this.direction),s=Pi.dot(Pi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,e,n,s,r){uh.subVectors(e,t),Na.subVectors(n,t),fh.crossVectors(uh,Na);let o=this.direction.dot(fh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ns.subVectors(this.origin,t);let c=a*this.direction.dot(Na.crossVectors(ns,Na));if(c<0)return null;let l=a*this.direction.dot(uh.cross(ns));if(l<0||c+l>o)return null;let h=-a*ns.dot(fh);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},le=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ar.setFromMatrixColumn(t,0).length(),r=1/ar.setFromMatrixColumn(t,1).length(),o=1/ar.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){let f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zg,t,Kg)}lookAt(t,e,n){let s=this.elements;return zn.subVectors(t,e),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),is.crossVectors(n,zn),is.lengthSq()===0&&(Math.abs(n.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),is.crossVectors(n,zn)),is.normalize(),Ua.crossVectors(zn,is),s[0]=is.x,s[4]=Ua.x,s[8]=zn.x,s[1]=is.y,s[5]=Ua.y,s[9]=zn.y,s[2]=is.z,s[6]=Ua.z,s[10]=zn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],y=n[7],x=n[11],T=n[15],w=s[0],A=s[4],U=s[8],b=s[12],M=s[1],D=s[5],z=s[9],k=s[13],K=s[2],nt=s[6],Z=s[10],yt=s[14],J=s[3],Tt=s[7],It=s[11],Ot=s[15];return r[0]=o*w+a*M+c*K+l*J,r[4]=o*A+a*D+c*nt+l*Tt,r[8]=o*U+a*z+c*Z+l*It,r[12]=o*b+a*k+c*yt+l*Ot,r[1]=h*w+u*M+f*K+d*J,r[5]=h*A+u*D+f*nt+d*Tt,r[9]=h*U+u*z+f*Z+d*It,r[13]=h*b+u*k+f*yt+d*Ot,r[2]=g*w+_*M+m*K+p*J,r[6]=g*A+_*D+m*nt+p*Tt,r[10]=g*U+_*z+m*Z+p*It,r[14]=g*b+_*k+m*yt+p*Ot,r[3]=S*w+y*M+x*K+T*J,r[7]=S*A+y*D+x*nt+T*Tt,r[11]=S*U+y*z+x*Z+T*It,r[15]=S*b+y*k+x*yt+T*Ot,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,y=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,x=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,T=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,w=e*S+n*y+s*x+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return t[0]=S*A,t[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*A,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*A,t[4]=y*A,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*A,t[8]=x*A,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*A,t[12]=T*A,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,S=c*l,y=c*h,x=c*u,T=n.x,w=n.y,A=n.z;return s[0]=(1-(_+p))*T,s[1]=(d+x)*T,s[2]=(g-y)*T,s[3]=0,s[4]=(d-x)*w,s[5]=(1-(f+p))*w,s[6]=(m+S)*w,s[7]=0,s[8]=(g+y)*A,s[9]=(m-S)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ar.set(s[0],s[1],s[2]).length(),o=ar.set(s[4],s[5],s[6]).length(),a=ar.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ti.copy(this);let l=1/r,h=1/o,u=1/a;return ti.elements[0]*=l,ti.elements[1]*=l,ti.elements[2]*=l,ti.elements[4]*=h,ti.elements[5]*=h,ti.elements[6]*=h,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,e.setFromRotationMatrix(ti),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ii,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===ii)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Co)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ii,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===ii)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Co)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ar=new I,ti=new le,Zg=new I(0,0,0),Kg=new I(1,1,1),is=new I,Ua=new I,zn=new I,Zf=new le,Kf=new Cn,Zn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-pe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(pe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-pe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(pe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Zf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Kf.setFromEuler(this),this.setFromQuaternion(Kf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Zn.DEFAULT_ORDER="XYZ";Cr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},jg=0,jf=new I,cr=new Cn,Li=new le,Fa=new I,mo=new I,Jg=new I,Qg=new Cn,Jf=new I(1,0,0),Qf=new I(0,1,0),td=new I(0,0,1),ed={type:"added"},t0={type:"removed"},lr={type:"childadded",child:null},dh={type:"childremoved",child:null},Oe=class i extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new I,e=new Zn,n=new Cn,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new fe}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return cr.setFromAxisAngle(t,e),this.quaternion.multiply(cr),this}rotateOnWorldAxis(t,e){return cr.setFromAxisAngle(t,e),this.quaternion.premultiply(cr),this}rotateX(t){return this.rotateOnAxis(Jf,t)}rotateY(t){return this.rotateOnAxis(Qf,t)}rotateZ(t){return this.rotateOnAxis(td,t)}translateOnAxis(t,e){return jf.copy(t).applyQuaternion(this.quaternion),this.position.add(jf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jf,t)}translateY(t){return this.translateOnAxis(Qf,t)}translateZ(t){return this.translateOnAxis(td,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fa.copy(t):Fa.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(mo,Fa,this.up):Li.lookAt(Fa,mo,this.up),this.quaternion.setFromRotationMatrix(Li),s&&(Li.extractRotation(s.matrixWorld),cr.setFromRotationMatrix(Li),this.quaternion.premultiply(cr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ed),lr.child=t,this.dispatchEvent(lr),lr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(t0),dh.child=t,this.dispatchEvent(dh),dh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Li.multiply(t.parent.matrixWorld)),t.applyMatrix4(Li),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ed),lr.child=t,this.dispatchEvent(lr),lr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,t,Jg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,Qg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Oe.DEFAULT_UP=new I(0,1,0);Oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;ei=new I,Di=new I,ph=new I,Ni=new I,hr=new I,ur=new I,nd=new I,mh=new I,gh=new I,_h=new I,xh=new Le,yh=new Le,vh=new Le,fi=class i{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ei.subVectors(t,e),s.cross(ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ei.subVectors(s,e),Di.subVectors(n,e),ph.subVectors(t,e);let o=ei.dot(ei),a=ei.dot(Di),c=ei.dot(ph),l=Di.dot(Di),h=Di.dot(ph),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Ni)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ni.x),c.addScaledVector(o,Ni.y),c.addScaledVector(a,Ni.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return xh.setScalar(0),yh.setScalar(0),vh.setScalar(0),xh.fromBufferAttribute(t,e),yh.fromBufferAttribute(t,n),vh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(xh,r.x),o.addScaledVector(yh,r.y),o.addScaledVector(vh,r.z),o}static isFrontFacing(t,e,n,s){return ei.subVectors(n,e),Di.subVectors(t,e),ei.cross(Di).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ei.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ei.cross(Di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;hr.subVectors(s,n),ur.subVectors(r,n),mh.subVectors(t,n);let c=hr.dot(mh),l=ur.dot(mh);if(c<=0&&l<=0)return e.copy(n);gh.subVectors(t,s);let h=hr.dot(gh),u=ur.dot(gh);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(hr,o);_h.subVectors(t,r);let d=hr.dot(_h),g=ur.dot(_h);if(g>=0&&d<=g)return e.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ur,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return nd.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(nd,a);let p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(hr,o).addScaledVector(ur,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ep={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},Oa={h:0,s:0,l:0};ie=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,be.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=be.workingColorSpace){return this.r=t,this.g=e,this.b=n,be.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=be.workingColorSpace){if(t=du(t,1),e=pe(e,0,1),n=pe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Mh(o,r,t+1/3),this.g=Mh(o,r,t),this.b=Mh(o,r,t-1/3)}return be.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){let n=Ep[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}copyLinearToSRGB(t){return this.r=Sr(t.r),this.g=Sr(t.g),this.b=Sr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return be.workingToColorSpace(Mn.copy(this),t),Math.round(pe(Mn.r*255,0,255))*65536+Math.round(pe(Mn.g*255,0,255))*256+Math.round(pe(Mn.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=be.workingColorSpace){be.workingToColorSpace(Mn.copy(this),e);let n=Mn.r,s=Mn.g,r=Mn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=be.workingColorSpace){return be.workingToColorSpace(Mn.copy(this),e),t.r=Mn.r,t.g=Mn.g,t.b=Mn.b,t}getStyle(t=qe){be.workingToColorSpace(Mn.copy(this),t);let e=Mn.r,n=Mn.g,s=Mn.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ss),this.setHSL(ss.h+t,ss.s+e,ss.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ss),t.getHSL(Oa);let n=To(ss.h,Oa.h,e),s=To(ss.s,Oa.s,e),r=To(ss.l,Oa.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mn=new ie;ie.NAMES=Ep;e0=0,Sn=class extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=Es,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hc,this.blendDst=uc,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Es&&(n.blending=this.blending),this.side!==si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==hc&&(n.blendSrc=this.blendSrc),this.blendDst!==uc&&(n.blendDst=this.blendDst),this.blendEquation!==os&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},De=class extends Sn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},an=new I,Ba=new At,n0=0,Ge=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fc,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ba.fromBufferAttribute(this,e),Ba.applyMatrix3(t),this.setXY(e,Ba.x,Ba.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)an.fromBufferAttribute(this,e),an.applyMatrix3(t),this.setXYZ(e,an.x,an.y,an.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)an.fromBufferAttribute(this,e),an.applyMatrix4(t),this.setXYZ(e,an.x,an.y,an.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)an.fromBufferAttribute(this,e),an.applyNormalMatrix(t),this.setXYZ(e,an.x,an.y,an.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)an.fromBufferAttribute(this,e),an.transformDirection(t),this.setXYZ(e,an.x,an.y,an.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ni(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ni(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ni(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ni(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ni(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array),r=Ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fc&&(t.usage=this.usage),t}},Po=class extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}},Lo=class extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}},Te=class extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}},i0=0,Xn=new le,Sh=new Oe,fr=new I,Hn=new In,go=new In,dn=new I,Be=class i extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:i0++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pu(t)?Lo:Po)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new fe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xn.makeRotationFromQuaternion(t),this.applyMatrix4(Xn),this}rotateX(t){return Xn.makeRotationX(t),this.applyMatrix4(Xn),this}rotateY(t){return Xn.makeRotationY(t),this.applyMatrix4(Xn),this}rotateZ(t){return Xn.makeRotationZ(t),this.applyMatrix4(Xn),this}translate(t,e,n){return Xn.makeTranslation(t,e,n),this.applyMatrix4(Xn),this}scale(t,e,n){return Xn.makeScale(t,e,n),this.applyMatrix4(Xn),this}lookAt(t){return Sh.lookAt(t),Sh.updateMatrix(),this.applyMatrix4(Sh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Te(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Hn.setFromBufferAttribute(r),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(Hn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];go.setFromBufferAttribute(a),this.morphTargetsRelative?(dn.addVectors(Hn.min,go.min),Hn.expandByPoint(dn),dn.addVectors(Hn.max,go.max),Hn.expandByPoint(dn)):(Hn.expandByPoint(go.min),Hn.expandByPoint(go.max))}Hn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)dn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(dn));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)dn.fromBufferAttribute(a,l),c&&(fr.fromBufferAttribute(t,l),dn.add(fr)),s=Math.max(s,n.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let U=0;U<n.count;U++)a[U]=new I,c[U]=new I;let l=new I,h=new I,u=new I,f=new At,d=new At,g=new At,_=new I,m=new I;function p(U,b,M){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,U),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),d.sub(f),g.sub(f);let D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(D),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),a[U].add(_),a[b].add(_),a[M].add(_),c[U].add(m),c[b].add(m),c[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let U=0,b=S.length;U<b;++U){let M=S[U],D=M.start,z=M.count;for(let k=D,K=D+z;k<K;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let y=new I,x=new I,T=new I,w=new I;function A(U){T.fromBufferAttribute(s,U),w.copy(T);let b=a[U];y.copy(b),y.sub(T.multiplyScalar(T.dot(b))).normalize(),x.crossVectors(w,b);let D=x.dot(c[U])<0?-1:1;o.setXYZW(U,y.x,y.y,y.z,D)}for(let U=0,b=S.length;U<b;++U){let M=S[U],D=M.start,z=M.count;for(let k=D,K=D+z;k<K;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)dn.fromBufferAttribute(t,e),dn.normalize(),t.setXYZ(e,dn.x,dn.y,dn.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Ge(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},id=new le,Ms=new gi,ka=new Un,sd=new I,za=new I,Ha=new I,Va=new I,bh=new I,Ga=new I,rd=new I,Wa=new I,he=class extends Oe{constructor(t=new Be,e=new De){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ga.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(bh.fromBufferAttribute(u,t),o?Ga.addScaledVector(bh,h):Ga.addScaledVector(bh.sub(e),h))}e.add(Ga)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),Ms.copy(t.ray).recast(t.near),!(ka.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(ka,sd)===null||Ms.origin.distanceToSquared(sd)>(t.far-t.near)**2))&&(id.copy(r).invert(),Ms.copy(t.ray).applyMatrix4(id),!(n.boundingBox!==null&&Ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ms)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=S,T=y;x<T;x+=3){let w=a.getX(x),A=a.getX(x+1),U=a.getX(x+2);s=Xa(this,p,t,n,l,h,u,w,A,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let S=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);s=Xa(this,o,t,n,l,h,u,S,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=S,T=y;x<T;x+=3){let w=x,A=x+1,U=x+2;s=Xa(this,p,t,n,l,h,u,w,A,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let S=m,y=m+1,x=m+2;s=Xa(this,o,t,n,l,h,u,S,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};as=class i extends Be{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Te(l,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(u,2));function g(_,m,p,S,y,x,T,w,A,U,b){let M=x/A,D=T/U,z=x/2,k=T/2,K=w/2,nt=A+1,Z=U+1,yt=0,J=0,Tt=new I;for(let It=0;It<Z;It++){let Ot=It*D-k;for(let G=0;G<nt;G++){let et=G*M-z;Tt[_]=et*S,Tt[m]=Ot*y,Tt[p]=K,l.push(Tt.x,Tt.y,Tt.z),Tt[_]=0,Tt[m]=0,Tt[p]=w>0?1:-1,h.push(Tt.x,Tt.y,Tt.z),u.push(G/A),u.push(1-It/U),yt+=1}}for(let It=0;It<U;It++)for(let Ot=0;Ot<A;Ot++){let G=f+Ot+nt*It,et=f+Ot+nt*(It+1),rt=f+(Ot+1)+nt*(It+1),at=f+(Ot+1)+nt*It;c.push(G,et,at),c.push(et,rt,at),J+=6}a.addGroup(d,J,b),d+=J,f+=yt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};Tp={clone:Ws,merge:Tn},o0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,a0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Vn=class extends Sn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=o0,this.fragmentShader=a0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ws(t.uniforms),this.uniformsGroups=r0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Do=class extends Oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},rs=new I,od=new At,ad=new At,Ke=class extends Do{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Rs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(rs.x,rs.y).multiplyScalar(-t/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rs.x,rs.y).multiplyScalar(-t/rs.z)}getViewSize(t,e){return this.getViewBounds(t,od,ad),e.subVectors(ad,od)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Mr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},dr=-90,pr=1,gc=class extends Oe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(dr,pr,t,e);s.layers=this.layers,this.add(s);let r=new Ke(dr,pr,t,e);r.layers=this.layers,this.add(r);let o=new Ke(dr,pr,t,e);o.layers=this.layers,this.add(o);let a=new Ke(dr,pr,t,e);a.layers=this.layers,this.add(a);let c=new Ke(dr,pr,t,e);c.layers=this.layers,this.add(c);let l=new Ke(dr,pr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===ii)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Co)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},No=class extends ln{constructor(t=[],e=Hs,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},_c=class extends $n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new No(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new as(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:qi});r.uniforms.tEquirect.value=e;let o=new he(s,r),a=e.minFilter;return e.minFilter===oi&&(e.minFilter=Rn),new gc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},tn=class extends Oe{constructor(){super(),this.isGroup=!0,this.type="Group"}},c0={type:"move"},Ir=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(c0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},ri=class extends Oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Cs=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=fc,this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},An=new I,cs=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)An.fromBufferAttribute(this,e),An.applyMatrix4(t),this.setXYZ(e,An.x,An.y,An.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)An.fromBufferAttribute(this,e),An.applyNormalMatrix(t),this.setXYZ(e,An.x,An.y,An.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)An.fromBufferAttribute(this,e),An.transformDirection(t),this.setXYZ(e,An.x,An.y,An.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ni(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ni(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ni(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ni(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ni(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),s=Ue(s,this.array),r=Ue(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Pr=class extends Sn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},_o=new I,gr=new I,_r=new I,xr=new At,xo=new At,wp=new le,qa=new I,yo=new I,Ya=new I,cd=new At,Eh=new At,ld=new At,Uo=class extends Oe{constructor(t=new Pr){if(super(),this.isSprite=!0,this.type="Sprite",mr===void 0){mr=new Be;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Cs(e,5);mr.setIndex([0,1,2,0,2,3]),mr.setAttribute("position",new cs(n,3,0,!1)),mr.setAttribute("uv",new cs(n,2,3,!1))}this.geometry=mr,this.material=t,this.center=new At(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gr.setFromMatrixScale(this.matrixWorld),wp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),_r.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gr.multiplyScalar(-_r.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;$a(qa.set(-.5,-.5,0),_r,o,gr,s,r),$a(yo.set(.5,-.5,0),_r,o,gr,s,r),$a(Ya.set(.5,.5,0),_r,o,gr,s,r),cd.set(0,0),Eh.set(1,0),ld.set(1,1);let a=t.ray.intersectTriangle(qa,yo,Ya,!1,_o);if(a===null&&($a(yo.set(-.5,.5,0),_r,o,gr,s,r),Eh.set(0,1),a=t.ray.intersectTriangle(qa,Ya,yo,!1,_o),a===null))return;let c=t.ray.origin.distanceTo(_o);c<t.near||c>t.far||e.push({distance:c,point:_o.clone(),uv:fi.getInterpolation(_o,qa,yo,Ya,cd,Eh,ld,new At),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};hd=new I,ud=new Le,fd=new Le,l0=new I,dd=new le,Za=new I,Th=new Un,pd=new le,wh=new gi,Fo=class extends he{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Fh,this.bindMatrix=new le,this.bindMatrixInverse=new le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new In),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Za),this.boundingBox.expandByPoint(Za)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Za),this.boundingSphere.expandByPoint(Za)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Th.copy(this.boundingSphere),Th.applyMatrix4(s),t.ray.intersectsSphere(Th)!==!1&&(pd.copy(s).invert(),wh.copy(t.ray).applyMatrix4(pd),!(this.boundingBox!==null&&wh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,wh)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new Le,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Fh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;ud.fromBufferAttribute(s.attributes.skinIndex,t),fd.fromBufferAttribute(s.attributes.skinWeight,t),hd.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=fd.getComponent(r);if(o!==0){let a=ud.getComponent(r);dd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(l0.copy(hd).applyMatrix4(dd),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},Lr=class extends Oe{constructor(){super(),this.isBone=!0,this.type="Bone"}},Oo=class extends ln{constructor(t=null,e=1,n=1,s,r,o,a,c,l=pn,h=pn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},md=new le,h0=new le,Bo=class i{constructor(t=[],e=[]){this.uuid=qn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new le)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new le;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:h0;md.multiplyMatrices(a,e[r]),md.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Oo(e,t,t,Wn,Kn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Lr),this.bones.push(o),this.boneInverses.push(new le().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},ls=class extends Ge{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},yr=new le,gd=new le,Ka=[],_d=new In,u0=new le,vo=new he,Mo=new Un,Is=class extends he{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ls(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,u0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new In),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,yr),_d.copy(t.boundingBox).applyMatrix4(yr),this.boundingBox.union(_d)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,yr),Mo.copy(t.boundingSphere).applyMatrix4(yr),this.boundingSphere.union(Mo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(vo.geometry=this.geometry,vo.material=this.material,vo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mo.copy(this.boundingSphere),Mo.applyMatrix4(n),t.ray.intersectsSphere(Mo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,yr),gd.multiplyMatrices(n,yr),vo.matrixWorld=gd,vo.raycast(t,Ka);for(let o=0,a=Ka.length;o<a;o++){let c=Ka[o];c.instanceId=r,c.object=this,e.push(c)}Ka.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ls(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oo(new Float32Array(s*this.count),s,this.count,Kc,Kn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ah=new I,f0=new I,d0=new fe,Nn=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ah.subVectors(n,e).cross(f0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ah),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||d0.getNormalMatrix(t),s=this.coplanarPoint(Ah).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ss=new Un,p0=new At(.5,.5),ja=new I,Dr=class{constructor(t=new Nn,e=new Nn,n=new Nn,s=new Nn,r=new Nn,o=new Nn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ii,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],S=r[12],y=r[13],x=r[14],T=r[15];if(s[0].setComponents(l-o,d-h,p-g,T-S).normalize(),s[1].setComponents(l+o,d+h,p+g,T+S).normalize(),s[2].setComponents(l+a,d+u,p+_,T+y).normalize(),s[3].setComponents(l-a,d-u,p-_,T-y).normalize(),n)s[4].setComponents(c,f,m,x).normalize(),s[5].setComponents(l-c,d-f,p-m,T-x).normalize();else if(s[4].setComponents(l-c,d-f,p-m,T-x).normalize(),e===ii)s[5].setComponents(l+c,d+f,p+m,T+x).normalize();else if(e===Co)s[5].setComponents(c,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ss.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ss.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ss)}intersectsSprite(t){Ss.center.set(0,0,0);let e=p0.distanceTo(t.center);return Ss.radius=.7071067811865476+e,Ss.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ss)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ja.x=s.normal.x>0?t.max.x:t.min.x,ja.y=s.normal.y>0?t.max.y:t.min.y,ja.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ja)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Oi=class extends Sn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},xc=new I,yc=new I,xd=new le,So=new gi,Ja=new Un,Rh=new I,yd=new I,Bi=class extends Oe{constructor(t=new Be,e=new Oi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)xc.fromBufferAttribute(e,s-1),yc.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=xc.distanceTo(yc);t.setAttribute("lineDistance",new Te(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,t.ray.intersectsSphere(Ja)===!1)return;xd.copy(s).invert(),So.copy(t.ray).applyMatrix4(xd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){let p=h.getX(_),S=h.getX(_+1),y=Qa(this,t,So,c,p,S,_);y&&e.push(y)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(d),p=Qa(this,t,So,c,_,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){let p=Qa(this,t,So,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=Qa(this,t,So,c,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};vd=new I,Md=new I,Ps=class extends Bi{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)vd.fromBufferAttribute(e,s),Md.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vd.distanceTo(Md);t.setAttribute("lineDistance",new Te(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ko=class extends Bi{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Nr=class extends Sn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Sd=new le,Hh=new gi,tc=new Un,ec=new I,zo=class extends Oe{constructor(t=new Be,e=new Nr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tc.copy(n.boundingSphere),tc.applyMatrix4(s),tc.radius+=r,t.ray.intersectsSphere(tc)===!1)return;Sd.copy(s).invert(),Hh.copy(t.ray).applyMatrix4(Sd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){let m=l.getX(g);ec.fromBufferAttribute(u,m),bd(ec,m,c,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)ec.fromBufferAttribute(u,g),bd(ec,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};ki=class extends ln{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ho=class extends ln{constructor(t,e,n=us,s,r,o,a=pn,c=pn,l,h=Tr,u=1){if(h!==Tr&&h!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Rr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Vo=class extends ln{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},_i=class i extends Be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new I,h=new At;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Te(o,3)),this.setAttribute("normal",new Te(a,3)),this.setAttribute("uv",new Te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ur=class i extends Be{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,_=[],m=n/2,p=0;S(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Te(u,3)),this.setAttribute("normal",new Te(f,3)),this.setAttribute("uv",new Te(d,2));function S(){let x=new I,T=new I,w=0,A=(e-t)/n;for(let U=0;U<=r;U++){let b=[],M=U/r,D=M*(e-t)+t;for(let z=0;z<=s;z++){let k=z/s,K=k*c+a,nt=Math.sin(K),Z=Math.cos(K);T.x=D*nt,T.y=-M*n+m,T.z=D*Z,u.push(T.x,T.y,T.z),x.set(nt,A,Z).normalize(),f.push(x.x,x.y,x.z),d.push(k,1-M),b.push(g++)}_.push(b)}for(let U=0;U<s;U++)for(let b=0;b<r;b++){let M=_[b][U],D=_[b+1][U],z=_[b+1][U+1],k=_[b][U+1];(t>0||b!==0)&&(h.push(M,D,k),w+=3),(e>0||b!==r-1)&&(h.push(D,z,k),w+=3)}l.addGroup(p,w,0),p+=w}function y(x){let T=g,w=new At,A=new I,U=0,b=x===!0?t:e,M=x===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;let D=g;for(let z=0;z<=s;z++){let K=z/s*c+a,nt=Math.cos(K),Z=Math.sin(K);A.x=b*Z,A.y=m*M,A.z=b*nt,u.push(A.x,A.y,A.z),f.push(0,M,0),w.x=nt*.5+.5,w.y=Z*.5*M+.5,d.push(w.x,w.y),g++}for(let z=0;z<s;z++){let k=T+z,K=D+z;x===!0?h.push(K,K+1,k):h.push(K+1,K,k),U+=3}l.addGroup(p,U,x===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Go=class i extends Ur{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},nc=new I,ic=new I,Ch=new I,sc=new fi,Wo=class extends Be{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Mr*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:m,c:p}=sc;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),sc.getNormal(Ch),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){let y=(S+1)%3,x=u[S],T=u[y],w=sc[h[S]],A=sc[h[y]],U=`${x}_${T}`,b=`${T}_${x}`;b in f&&f[b]?(Ch.dot(f[b].normal)<=r&&(d.push(w.x,w.y,w.z),d.push(A.x,A.y,A.z)),f[b]=null):U in f||(f[U]={index0:l[S],index1:l[y],normal:Ch.clone()})}}for(let g in f)if(f[g]){let{index0:_,index1:m}=f[g];nc.fromBufferAttribute(a,_),ic.fromBufferAttribute(a,m),d.push(nc.x,nc.y,nc.z),d.push(ic.x,ic.y,ic.z)}this.setAttribute("position",new Te(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},Gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new At:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new I,s=[],r=[],o=[],a=new I,c=new le;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(pe(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(pe(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Fr=class extends Gn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new At){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},vc=class extends Fr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};rc=new I,Ih=new gu,Ph=new gu,Lh=new gu,Mc=class extends Gn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(rc.subVectors(s[0],s[1]).add(s[0]),l=rc);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(rc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=rc),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ih.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),Ph.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),Lh.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ih.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Ph.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Lh.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Ih.calc(c),Ph.calc(c),Lh.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Xo=class extends Gn{constructor(t=new At,e=new At,n=new At,s=new At){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new At){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ao(t,s.x,r.x,o.x,a.x),Ao(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Sc=class extends Gn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ao(t,s.x,r.x,o.x,a.x),Ao(t,s.y,r.y,o.y,a.y),Ao(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},qo=class extends Gn{constructor(t=new At,e=new At){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new At){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new At){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},bc=class extends Gn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Yo=class extends Gn{constructor(t=new At,e=new At,n=new At){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new At){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(wo(t,s.x,r.x,o.x),wo(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ec=class extends Gn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(wo(t,s.x,r.x,o.x),wo(t,s.y,r.y,o.y),wo(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$o=class extends Gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new At){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Ed(a,c.x,l.x,h.x,u.x),Ed(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new At().fromArray(s))}return this}},Td=Object.freeze({__proto__:null,ArcCurve:vc,CatmullRomCurve3:Mc,CubicBezierCurve:Xo,CubicBezierCurve3:Sc,EllipseCurve:Fr,LineCurve:qo,LineCurve3:bc,QuadraticBezierCurve:Yo,QuadraticBezierCurve3:Ec,SplineCurve:$o}),Tc=class extends Gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Td[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Td[s.type]().fromJSON(s))}return this}},Zo=class extends Tc{constructor(t){super(),this.type="Path",this.currentPoint=new At,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new qo(this.currentPoint.clone(),new At(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Yo(this.currentPoint.clone(),new At(t,e),new At(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Xo(this.currentPoint.clone(),new At(t,e),new At(n,s),new At(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new $o(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Fr(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},hs=class extends Zo{constructor(t){super(t),this.uuid=qn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Zo().fromJSON(s))}return this}};Wh=class{static triangulate(t,e,n=2){return S0(t,e,n)}},br=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Ad(t),Rd(n,t);let o=t.length;e.forEach(Ad);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Rd(n,e[c]);let a=Wh.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};Ds=class i extends Be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let S=p*f-o;for(let y=0;y<l;y++){let x=y*u-r;g.push(x,-S,0),_.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){let y=S+l*p,x=S+l*(p+1),T=S+1+l*(p+1),w=S+1+l*p;d.push(y,x,w),d.push(x,T,w)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(_,3)),this.setAttribute("uv",new Te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Ns=class i extends Be{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new I,g=new At;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){let p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){let m=_*(n+1);for(let p=0;p<n;p++){let S=p+m,y=S,x=S+n+1,T=S+n+2,w=S+1;a.push(y,x,w),a.push(x,T,w)}}this.setIndex(a),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(l,3)),this.setAttribute("uv",new Te(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Us=class i extends Be{constructor(t=new hs([new At(0,.5),new At(-.5,-.5),new At(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Te(s,3)),this.setAttribute("normal",new Te(r,3)),this.setAttribute("uv",new Te(o,2));function l(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,g=f.holes;br.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){let S=g[m];br.isClockWise(S)===!0&&(g[m]=S.reverse())}let _=br.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){let S=g[m];d=d.concat(S)}for(let m=0,p=d.length;m<p;m++){let S=d[m];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let m=0,p=_.length;m<p;m++){let S=_[m],y=S[0]+u,x=S[1]+u,T=S[2]+u;n.push(y,x,T),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return k0(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};Fs=class i extends Be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new I,f=new I,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let S=[],y=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let T=0;T<=e;T++){let w=T/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(w+x,1-y),S.push(l++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){let y=h[p][S+1],x=h[p][S],T=h[p+1][S],w=h[p+1][S+1];(p!==0||o>0)&&d.push(y,x,w),(p!==n-1||c<Math.PI)&&d.push(x,T,w)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(_,3)),this.setAttribute("uv",new Te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},bn=class extends Sn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rl,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Fn=class extends bn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new At(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},zi=class extends Sn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rl,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},wc=class extends Sn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ac=class extends Sn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Qo=class extends Oi{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};Hi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Rc=class extends Hi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oh,endingEnd:Oh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Bh:r=t,a=2*e-n;break;case kh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Bh:o=t,c=2*n-e;break;case kh:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,S=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*_+.5*g,x=d*m-d*_;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+S*o[l+T]+y*o[c+T]+x*o[u+T];return r}},Cc=class extends Hi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Ic=class extends Hi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},On=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=cc(e,this.TimeBufferType),this.values=cc(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:cc(t.times,Array),values:cc(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ic(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Cc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Rc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ws:e=this.InterpolantFactoryMethodDiscrete;break;case As:e=this.InterpolantFactoryMethodLinear;break;case lc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ws;case this.InterpolantFactoryMethodLinear:return As;case this.InterpolantFactoryMethodSmooth:return lc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&z0(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===lc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[f+g]||_!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};On.prototype.ValueTypeName="";On.prototype.TimeBufferType=Float32Array;On.prototype.ValueBufferType=Float32Array;On.prototype.DefaultInterpolation=As;Vi=class extends On{constructor(t,e,n){super(t,e,n)}};Vi.prototype.ValueTypeName="bool";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=ws;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;ta=class extends On{constructor(t,e,n,s){super(t,e,n,s)}};ta.prototype.ValueTypeName="color";xi=class extends On{constructor(t,e,n,s){super(t,e,n,s)}};xi.prototype.ValueTypeName="number";Pc=class extends Hi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Cn.slerpFlat(r,0,o,l-a,o,l,c);return r}},yi=class extends On{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Pc(this.times,this.values,this.getValueSize(),t)}};yi.prototype.ValueTypeName="quaternion";yi.prototype.InterpolantFactoryMethodSmooth=void 0;Gi=class extends On{constructor(t,e,n){super(t,e,n)}};Gi.prototype.ValueTypeName="string";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=ws;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;vi=class extends On{constructor(t,e,n,s){super(t,e,n,s)}};vi.prototype.ValueTypeName="vector";ea=class{constructor(t="",e=-1,n=[],s=up){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=qn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(G0(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(On.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=H0(c);c=Cd(c,1,h),l=Cd(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new xi(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){let l=t[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,g,_){if(d.length!==0){let m=[],p=[];Pp(d,m,p,g),m.length!==0&&_.push(new u(f,m,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode,c=t.length||-1,l=t.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)d[f[g].morphTargets[_]]=-1;for(let _ in d){let m=[],p=[];for(let S=0;S!==f[g].morphTargets.length;++S){let y=f[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}s.push(new xi(".morphTargetInfluence["+_+"]",m,p))}c=d.length*o}else{let d=".bones["+e[u].name+"]";n(vi,d+".position",f,"pos",s),n(yi,d+".quaternion",f,"rot",s),n(vi,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};pi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Lc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Lp=new Lc,Mi=class{constructor(t){this.manager=t!==void 0?t:Lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Mi.DEFAULT_MATERIAL_NAME="__DEFAULT";Ui={},Xh=class extends Error{constructor(t,e){super(t),this.response=e}},Br=class extends Mi{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=pi.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Ui[t]!==void 0){Ui[t].push({onLoad:e,onProgress:n,onError:s});return}Ui[t]=[],Ui[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Ui[t],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0,_=0,m=new ReadableStream({start(p){S();function S(){u.read().then(({done:y,value:x})=>{if(y)p.close();else{_+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let w=0,A=h.length;w<A;w++){let U=h[w];U.onProgress&&U.onProgress(T)}p.enqueue(x),S()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Xh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{pi.add(`file:${t}`,l);let h=Ui[t];delete Ui[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Ui[t];if(h===void 0)throw this.manager.itemError(t),l;delete Ui[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},vr=new WeakMap,Dc=class extends Mi{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=pi.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=vr.get(o);u===void 0&&(u=[],vr.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=wr("img");function c(){h(),e&&e(this);let u=vr.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}vr.delete(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),pi.remove(`image:${t}`);let f=vr.get(this)||[];for(let d=0;d<f.length;d++){let g=f[d];g.onError&&g.onError(u)}vr.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),pi.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}},na=class extends Mi{constructor(t){super(t)}load(t,e,n,s){let r=new ln,o=new Dc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Os=class extends Oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Bs=class extends Os{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ie(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Dh=new le,Id=new I,Pd=new I,ia=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.mapType=ai,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dr,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Id.setFromMatrixPosition(t.matrixWorld),e.position.copy(Id),Pd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Pd),e.updateMatrixWorld(),Dh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dh,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},qh=class extends ia{constructor(){super(new Ke(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Rs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},sa=class extends Os{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new qh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Ld=new le,bo=new I,Nh=new I,Yh=class extends ia{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new At(4,2),this._viewportCount=6,this._viewports=[new Le(2,1,1,1),new Le(0,1,1,1),new Le(3,1,1,1),new Le(1,1,1,1),new Le(3,0,1,1),new Le(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),bo.setFromMatrixPosition(t.matrixWorld),n.position.copy(bo),Nh.copy(n.position),Nh.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Nh),n.updateMatrixWorld(),s.makeTranslation(-bo.x,-bo.y,-bo.z),Ld.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ld,n.coordinateSystem,n.reversedDepth)}},ks=class extends Os{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Yh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Wi=class extends Do{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},$h=class extends ia{constructor(){super(new Wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zs=class extends Os{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.shadow=new $h}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Xi=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Uh=new WeakMap,ra=class extends Mi{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=pi.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{if(Uh.has(o)===!0)s&&s(Uh.get(o)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(l),r.manager.itemEnd(t),l});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return pi.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),Uh.set(c,l),pi.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});pi.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Nc=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},_u="\\[\\]\\.:\\/",W0=new RegExp("["+_u+"]","g"),xu="[^"+_u+"]",X0="[^"+_u.replace("\\.","")+"]",q0=/((?:WC+[\/:])*)/.source.replace("WC",xu),Y0=/(WCOD+)?/.source.replace("WCOD",X0),$0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xu),Z0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xu),K0=new RegExp("^"+q0+Y0+$0+Z0+"$"),j0=["material","materials","bones","map"],Zh=class{constructor(t,e,n){let s=n||Ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ve=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(W0,"")}static parseTrackName(t){let e=K0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);j0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ve.Composite=Zh;Ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ve.prototype.GetterByBindingType=[Ve.prototype._getValue_direct,Ve.prototype._getValue_array,Ve.prototype._getValue_arrayElement,Ve.prototype._getValue_toArray];Ve.prototype.SetterByBindingTypeAndVersioning=[[Ve.prototype._setValue_direct,Ve.prototype._setValue_direct_setNeedsUpdate,Ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_array,Ve.prototype._setValue_array_setNeedsUpdate,Ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_arrayElement,Ve.prototype._setValue_arrayElement_setNeedsUpdate,Ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_fromArray,Ve.prototype._setValue_fromArray_setNeedsUpdate,Ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];AS=new Float32Array(1),Dd=new le,oa=class{constructor(t,e,n=0,s=1/0){this.ray=new gi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Cr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Dd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Dd),this}intersectObject(t,e=!0,n=[]){return Kh(t,this,n,e),n.sort(Nd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Kh(t[s],this,n,e);return n.sort(Nd),n}};kr=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=pe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(pe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},aa=class extends mi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180")});function nm(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function t_(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}function Uy(i,t,e,n,s,r,o){let a=new ie(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1,T=g(y);T===null?p(a,c):T&&T.isColor&&(p(T,1),x=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,x){let T=g(x);T&&(T.isCubeTexture||T.mapping===ca)?(h===void 0&&(h=new he(new as(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Ws(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Xs.copy(x.backgroundRotation),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ny.makeRotationFromEuler(Xs)),h.material.toneMapped=be.getTransfer(T.colorSpace)!==Fe,(u!==T||f!==T.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new he(new Ds(2,2),new Vn({name:"BackgroundMaterial",uniforms:Ws(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=be.getTransfer(T.colorSpace)!==Fe,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Cl,mu(i)),n.buffers.color.setClear(Cl.r,Cl.g,Cl.b,x,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:m,dispose:S}}function Fy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(M,D,z,k,K){let nt=!1,Z=u(k,z,D);r!==Z&&(r=Z,l(r.object)),nt=d(M,k,z,K),nt&&g(M,k,z,K),K!==null&&t.update(K,i.ELEMENT_ARRAY_BUFFER),(nt||o)&&(o=!1,x(M,D,z,k),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,D,z){let k=z.wireframe===!0,K=n[M.id];K===void 0&&(K={},n[M.id]=K);let nt=K[D.id];nt===void 0&&(nt={},K[D.id]=nt);let Z=nt[k];return Z===void 0&&(Z=f(c()),nt[k]=Z),Z}function f(M){let D=[],z=[],k=[];for(let K=0;K<e;K++)D[K]=0,z[K]=0,k[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:z,attributeDivisors:k,object:M,attributes:{},index:null}}function d(M,D,z,k){let K=r.attributes,nt=D.attributes,Z=0,yt=z.getAttributes();for(let J in yt)if(yt[J].location>=0){let It=K[J],Ot=nt[J];if(Ot===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(Ot=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(Ot=M.instanceColor)),It===void 0||It.attribute!==Ot||Ot&&It.data!==Ot.data)return!0;Z++}return r.attributesNum!==Z||r.index!==k}function g(M,D,z,k){let K={},nt=D.attributes,Z=0,yt=z.getAttributes();for(let J in yt)if(yt[J].location>=0){let It=nt[J];It===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(It=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(It=M.instanceColor));let Ot={};Ot.attribute=It,It&&It.data&&(Ot.data=It.data),K[J]=Ot,Z++}r.attributes=K,r.attributesNum=Z,r.index=k}function _(){let M=r.newAttributes;for(let D=0,z=M.length;D<z;D++)M[D]=0}function m(M){p(M,0)}function p(M,D){let z=r.newAttributes,k=r.enabledAttributes,K=r.attributeDivisors;z[M]=1,k[M]===0&&(i.enableVertexAttribArray(M),k[M]=1),K[M]!==D&&(i.vertexAttribDivisor(M,D),K[M]=D)}function S(){let M=r.newAttributes,D=r.enabledAttributes;for(let z=0,k=D.length;z<k;z++)D[z]!==M[z]&&(i.disableVertexAttribArray(z),D[z]=0)}function y(M,D,z,k,K,nt,Z){Z===!0?i.vertexAttribIPointer(M,D,z,K,nt):i.vertexAttribPointer(M,D,z,k,K,nt)}function x(M,D,z,k){_();let K=k.attributes,nt=z.getAttributes(),Z=D.defaultAttributeValues;for(let yt in nt){let J=nt[yt];if(J.location>=0){let Tt=K[yt];if(Tt===void 0&&(yt==="instanceMatrix"&&M.instanceMatrix&&(Tt=M.instanceMatrix),yt==="instanceColor"&&M.instanceColor&&(Tt=M.instanceColor)),Tt!==void 0){let It=Tt.normalized,Ot=Tt.itemSize,G=t.get(Tt);if(G===void 0)continue;let et=G.buffer,rt=G.type,at=G.bytesPerElement,N=rt===i.INT||rt===i.UNSIGNED_INT||Tt.gpuType===Yc;if(Tt.isInterleavedBufferAttribute){let C=Tt.data,W=C.stride,gt=Tt.offset;if(C.isInstancedInterleavedBuffer){for(let pt=0;pt<J.locationSize;pt++)p(J.location+pt,C.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let pt=0;pt<J.locationSize;pt++)m(J.location+pt);i.bindBuffer(i.ARRAY_BUFFER,et);for(let pt=0;pt<J.locationSize;pt++)y(J.location+pt,Ot/J.locationSize,rt,It,W*at,(gt+Ot/J.locationSize*pt)*at,N)}else{if(Tt.isInstancedBufferAttribute){for(let C=0;C<J.locationSize;C++)p(J.location+C,Tt.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Tt.meshPerAttribute*Tt.count)}else for(let C=0;C<J.locationSize;C++)m(J.location+C);i.bindBuffer(i.ARRAY_BUFFER,et);for(let C=0;C<J.locationSize;C++)y(J.location+C,Ot/J.locationSize,rt,It,Ot*at,Ot/J.locationSize*C*at,N)}}else if(Z!==void 0){let It=Z[yt];if(It!==void 0)switch(It.length){case 2:i.vertexAttrib2fv(J.location,It);break;case 3:i.vertexAttrib3fv(J.location,It);break;case 4:i.vertexAttrib4fv(J.location,It);break;default:i.vertexAttrib1fv(J.location,It)}}}}S()}function T(){U();for(let M in n){let D=n[M];for(let z in D){let k=D[z];for(let K in k)h(k[K].object),delete k[K];delete D[z]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let D=n[M.id];for(let z in D){let k=D[z];for(let K in k)h(k[K].object),delete k[K];delete D[z]}delete n[M.id]}function A(M){for(let D in n){let z=n[D];if(z[M.id]===void 0)continue;let k=z[M.id];for(let K in k)h(k[K].object),delete k[K];delete z[M.id]}}function U(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Oy(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function By(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Wn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let U=A===Vr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ai&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Kn&&!U)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:T,maxSamples:w}}function ky(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Nn,a=new fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,y=S*4,x=p.clippingState||null;c.value=x,x=h(g,f,y,d);for(let T=0;T!==y;++T)x[T]=e[T];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=d;y!==_;++y,x+=4)o.copy(u[y]).applyMatrix4(S,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function zy(i){let t=new WeakMap;function e(o,a){return a===Wc?o.mapping=Hs:a===Xc&&(o.mapping=Vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Wc||a===Xc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new _c(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}function Vy(i){let t=[],e=[],n=[],s=i,r=i-Yr+1+Dp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Yr?c=Dp[o-i+Yr-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*d),y=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let w=0;w<d;w++){let A=w%3*2/3-1,U=w>2?0:-1,b=[A,U,0,A+2/3,U,0,A+2/3,U+1,0,A,U,0,A+2/3,U+1,0,A,U+1,0];S.set(b,_*g*w),y.set(f,m*g*w);let M=[w,w,w,w,w,w];x.set(M,p*g*w)}let T=new Be;T.setAttribute("position",new Ge(S,_)),T.setAttribute("uv",new Ge(y,m)),T.setAttribute("faceIndex",new Ge(x,p)),t.push(T),s>Yr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Fp(i,t,e){let n=new $n(i,t,e);return n.texture.mapping=ca,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Il(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Gy(i,t,e){let n=new Float32Array($s),s=new I(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:$s,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Uu(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Op(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uu(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Bp(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Uu(){return`

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
	`}function Wy(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Wc||c===Xc,h=c===Hs||c===Vs;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Zr(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Zr(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Xy(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ar("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function qy(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,g=u.attributes.position,_=0;if(d!==null){let S=d.array;_=d.version;for(let y=0,x=S.length;y<x;y+=3){let T=S[y+0],w=S[y+1],A=S[y+2];f.push(T,w,w,A,A,T)}}else if(g!==void 0){let S=g.array;_=g.version;for(let y=0,x=S.length/3-1;y<x;y+=3){let T=y+0,w=y+1,A=y+2;f.push(T,w,w,A,A,T)}}else return;let m=new(pu(f)?Lo:Po)(f,1);m.version=_;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Yy(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=d[S]*_[S];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function $y(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Zy(i,t,e){let n=new WeakMap,s=new Le;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let b=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],y=0;d===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,T=1;x>t.maxTextureSize&&(T=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let w=new Float32Array(x*T*4*u),A=new Io(w,x,T,u);A.type=Kn,A.needsUpdate=!0;let U=y*4;for(let M=0;M<u;M++){let D=m[M],z=p[M],k=S[M],K=x*T*4*M;for(let nt=0;nt<D.count;nt++){let Z=nt*U;d===!0&&(s.fromBufferAttribute(D,nt),w[K+Z+0]=s.x,w[K+Z+1]=s.y,w[K+Z+2]=s.z,w[K+Z+3]=0),g===!0&&(s.fromBufferAttribute(z,nt),w[K+Z+4]=s.x,w[K+Z+5]=s.y,w[K+Z+6]=s.z,w[K+Z+7]=0),_===!0&&(s.fromBufferAttribute(k,nt),w[K+Z+8]=s.x,w[K+Z+9]=s.y,w[K+Z+10]=s.z,w[K+Z+11]=k.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new At(x,T)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ky(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}function jr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=zp[s];if(r===void 0&&(r=new Float32Array(s),zp[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function hn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function un(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ll(i,t){let e=Hp[t];e===void 0&&(e=new Int32Array(t),Hp[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function jy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Jy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2fv(this.addr,t),un(e,t)}}function Qy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(hn(e,t))return;i.uniform3fv(this.addr,t),un(e,t)}}function tv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4fv(this.addr,t),un(e,t)}}function ev(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;Wp.set(n),i.uniformMatrix2fv(this.addr,!1,Wp),un(e,n)}}function nv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;Gp.set(n),i.uniformMatrix3fv(this.addr,!1,Gp),un(e,n)}}function iv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;Vp.set(n),i.uniformMatrix4fv(this.addr,!1,Vp),un(e,n)}}function sv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function rv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2iv(this.addr,t),un(e,t)}}function ov(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;i.uniform3iv(this.addr,t),un(e,t)}}function av(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4iv(this.addr,t),un(e,t)}}function cv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function lv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2uiv(this.addr,t),un(e,t)}}function hv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;i.uniform3uiv(this.addr,t),un(e,t)}}function uv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4uiv(this.addr,t),un(e,t)}}function fv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(kp.compareFunction=uu,r=kp):r=im,e.setTexture2D(t||r,s)}function dv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||rm,s)}function pv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||om,s)}function mv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||sm,s)}function gv(i){switch(i){case 5126:return jy;case 35664:return Jy;case 35665:return Qy;case 35666:return tv;case 35674:return ev;case 35675:return nv;case 35676:return iv;case 5124:case 35670:return sv;case 35667:case 35671:return rv;case 35668:case 35672:return ov;case 35669:case 35673:return av;case 5125:return cv;case 36294:return lv;case 36295:return hv;case 36296:return uv;case 35678:case 36198:case 36298:case 36306:case 35682:return fv;case 35679:case 36299:case 36307:return dv;case 35680:case 36300:case 36308:case 36293:return pv;case 36289:case 36303:case 36311:case 36292:return mv}}function _v(i,t){i.uniform1fv(this.addr,t)}function xv(i,t){let e=jr(t,this.size,2);i.uniform2fv(this.addr,e)}function yv(i,t){let e=jr(t,this.size,3);i.uniform3fv(this.addr,e)}function vv(i,t){let e=jr(t,this.size,4);i.uniform4fv(this.addr,e)}function Mv(i,t){let e=jr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Sv(i,t){let e=jr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function bv(i,t){let e=jr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ev(i,t){i.uniform1iv(this.addr,t)}function Tv(i,t){i.uniform2iv(this.addr,t)}function wv(i,t){i.uniform3iv(this.addr,t)}function Av(i,t){i.uniform4iv(this.addr,t)}function Rv(i,t){i.uniform1uiv(this.addr,t)}function Cv(i,t){i.uniform2uiv(this.addr,t)}function Iv(i,t){i.uniform3uiv(this.addr,t)}function Pv(i,t){i.uniform4uiv(this.addr,t)}function Lv(i,t,e){let n=this.cache,s=t.length,r=Ll(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||im,r[o])}function Dv(i,t,e){let n=this.cache,s=t.length,r=Ll(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||rm,r[o])}function Nv(i,t,e){let n=this.cache,s=t.length,r=Ll(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||om,r[o])}function Uv(i,t,e){let n=this.cache,s=t.length,r=Ll(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||sm,r[o])}function Fv(i){switch(i){case 5126:return _v;case 35664:return xv;case 35665:return yv;case 35666:return vv;case 35674:return Mv;case 35675:return Sv;case 35676:return bv;case 5124:case 35670:return Ev;case 35667:case 35671:return Tv;case 35668:case 35672:return wv;case 35669:case 35673:return Av;case 5125:return Rv;case 36294:return Cv;case 36295:return Iv;case 36296:return Pv;case 35678:case 36198:case 36298:case 36306:case 35682:return Lv;case 35679:case 36299:case 36307:return Dv;case 35680:case 36300:case 36308:case 36293:return Nv;case 36289:case 36303:case 36311:case 36292:return Uv}}function Xp(i,t){i.seq.push(t),i.map[t.id]=t}function Ov(i,t,e){let n=i.name,s=n.length;for(wu.lastIndex=0;;){let r=wu.exec(n),o=wu.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Xp(e,l===void 0?new Au(a,i,t):new Ru(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Cu(a),Xp(e,u)),e=u}}}function qp(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}function zv(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Hv(i){be._getMatrix(Yp,be.workingColorSpace,i);let t=`mat3( ${Yp.elements.map(e=>e.toFixed(4))} )`;switch(be.getTransfer(i)){case Ro:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function $p(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+zv(i.getShaderSource(t),a)}else return r}function Vv(i,t){let e=Hv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Gv(i,t){let e;switch(t){case sp:e="Linear";break;case rp:e="Reinhard";break;case op:e="Cineon";break;case ap:e="ACESFilmic";break;case lp:e="AgX";break;case Gc:e="Neutral";break;case cp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Wv(){be.getLuminanceCoefficients(Pl);let i=Pl.x.toFixed(4),t=Pl.y.toFixed(4),e=Pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function qv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Yv(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function pa(i){return i!==""}function Zp(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kp(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Iu(i){return i.replace($v,Kv)}function Kv(i,t){let e=me[t];if(e===void 0){let n=Zv.get(t);if(n!==void 0)e=me[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Iu(e)}function jp(i){return i.replace(jv,Jv)}function Jv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Jp(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Qv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Jh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Od?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function tM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hs:case Vs:t="ENVMAP_TYPE_CUBE";break;case ca:t="ENVMAP_TYPE_CUBE_UV";break}return t}function eM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vs:t="ENVMAP_MODE_REFRACTION";break}return t}function nM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vc:t="ENVMAP_BLENDING_MULTIPLY";break;case np:t="ENVMAP_BLENDING_MIX";break;case ip:t="ENVMAP_BLENDING_ADD";break}return t}function iM(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function sM(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Qv(e),l=tM(e),h=eM(e),u=nM(e),f=iM(e),d=Xv(e),g=qv(r),_=s.createProgram(),m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(pa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(pa).join(`
`),p.length>0&&(p+=`
`)):(m=[Jp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),p=[Jp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yi?"#define TONE_MAPPING":"",e.toneMapping!==Yi?me.tonemapping_pars_fragment:"",e.toneMapping!==Yi?Gv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",me.colorspace_pars_fragment,Vv("linearToOutputTexel",e.outputColorSpace),Wv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(pa).join(`
`)),o=Iu(o),o=Zp(o,e),o=Kp(o,e),a=Iu(a),a=Zp(a,e),a=Kp(a,e),o=jp(o),a=jp(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===fu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=S+m+o,x=S+p+a,T=qp(s,s.VERTEX_SHADER,y),w=qp(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(D){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(T)||"",K=s.getShaderInfoLog(w)||"",nt=z.trim(),Z=k.trim(),yt=K.trim(),J=!0,Tt=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,w);else{let It=$p(s,T,"vertex"),Ot=$p(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+nt+`
`+It+`
`+Ot)}else nt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",nt):(Z===""||yt==="")&&(Tt=!1);Tt&&(D.diagnostics={runnable:J,programLog:nt,vertexShader:{log:Z,prefix:m},fragmentShader:{log:yt,prefix:p}})}s.deleteShader(T),s.deleteShader(w),U=new $r(s,_),b=Yv(s,_)}let U;this.getUniforms=function(){return U===void 0&&A(this),U};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Bv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=kv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}function oM(i,t,e,n,s,r,o){let a=new Cr,c=new Pu,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,D,z,k){let K=z.fog,nt=k.geometry,Z=b.isMeshStandardMaterial?z.environment:null,yt=(b.isMeshStandardMaterial?e:t).get(b.envMap||Z),J=yt&&yt.mapping===ca?yt.image.height:null,Tt=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let It=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,Ot=It!==void 0?It.length:0,G=0;nt.morphAttributes.position!==void 0&&(G=1),nt.morphAttributes.normal!==void 0&&(G=2),nt.morphAttributes.color!==void 0&&(G=3);let et,rt,at,N;if(Tt){let Dt=bi[Tt];et=Dt.vertexShader,rt=Dt.fragmentShader}else et=b.vertexShader,rt=b.fragmentShader,c.update(b),at=c.getVertexShaderID(b),N=c.getFragmentShaderID(b);let C=i.getRenderTarget(),W=i.state.buffers.depth.getReversed(),gt=k.isInstancedMesh===!0,pt=k.isBatchedMesh===!0,Lt=!!b.map,Kt=!!b.matcap,P=!!yt,Vt=!!b.aoMap,St=!!b.lightMap,Ft=!!b.bumpMap,Gt=!!b.normalMap,we=!!b.displacementMap,zt=!!b.emissiveMap,$t=!!b.metalnessMap,ye=!!b.roughnessMap,ve=b.anisotropy>0,R=b.clearcoat>0,v=b.dispersion>0,Q=b.iridescence>0,ot=b.sheen>0,ft=b.transmission>0,ct=ve&&!!b.anisotropyMap,Zt=R&&!!b.clearcoatMap,tt=R&&!!b.clearcoatNormalMap,vt=R&&!!b.clearcoatRoughnessMap,bt=Q&&!!b.iridescenceMap,ht=Q&&!!b.iridescenceThicknessMap,mt=ot&&!!b.sheenColorMap,Ht=ot&&!!b.sheenRoughnessMap,qt=!!b.specularMap,Ut=!!b.specularColorMap,se=!!b.specularIntensityMap,O=ft&&!!b.transmissionMap,L=ft&&!!b.thicknessMap,Y=!!b.gradientMap,X=!!b.alphaMap,B=b.alphaTest>0,F=!!b.alphaHash,it=!!b.extensions,ut=Yi;b.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ut=i.toneMapping);let Wt={shaderID:Tt,shaderType:b.type,shaderName:b.name,vertexShader:et,fragmentShader:rt,defines:b.defines,customVertexShaderID:at,customFragmentShaderID:N,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:pt,batchingColor:pt&&k._colorsTexture!==null,instancing:gt,instancingColor:gt&&k.instanceColor!==null,instancingMorph:gt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:C===null?i.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:mn,alphaToCoverage:!!b.alphaToCoverage,map:Lt,matcap:Kt,envMap:P,envMapMode:P&&yt.mapping,envMapCubeUVHeight:J,aoMap:Vt,lightMap:St,bumpMap:Ft,normalMap:Gt,displacementMap:f&&we,emissiveMap:zt,normalMapObjectSpace:Gt&&b.normalMapType===pp,normalMapTangentSpace:Gt&&b.normalMapType===Rl,metalnessMap:$t,roughnessMap:ye,anisotropy:ve,anisotropyMap:ct,clearcoat:R,clearcoatMap:Zt,clearcoatNormalMap:tt,clearcoatRoughnessMap:vt,dispersion:v,iridescence:Q,iridescenceMap:bt,iridescenceThicknessMap:ht,sheen:ot,sheenColorMap:mt,sheenRoughnessMap:Ht,specularMap:qt,specularColorMap:Ut,specularIntensityMap:se,transmission:ft,transmissionMap:O,thicknessMap:L,gradientMap:Y,opaque:b.transparent===!1&&b.blending===Es&&b.alphaToCoverage===!1,alphaMap:X,alphaTest:B,alphaHash:F,combine:b.combine,mapUv:Lt&&_(b.map.channel),aoMapUv:Vt&&_(b.aoMap.channel),lightMapUv:St&&_(b.lightMap.channel),bumpMapUv:Ft&&_(b.bumpMap.channel),normalMapUv:Gt&&_(b.normalMap.channel),displacementMapUv:we&&_(b.displacementMap.channel),emissiveMapUv:zt&&_(b.emissiveMap.channel),metalnessMapUv:$t&&_(b.metalnessMap.channel),roughnessMapUv:ye&&_(b.roughnessMap.channel),anisotropyMapUv:ct&&_(b.anisotropyMap.channel),clearcoatMapUv:Zt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:tt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&_(b.sheenRoughnessMap.channel),specularMapUv:qt&&_(b.specularMap.channel),specularColorMapUv:Ut&&_(b.specularColorMap.channel),specularIntensityMapUv:se&&_(b.specularIntensityMap.channel),transmissionMapUv:O&&_(b.transmissionMap.channel),thicknessMapUv:L&&_(b.thicknessMap.channel),alphaMapUv:X&&_(b.alphaMap.channel),vertexTangents:!!nt.attributes.tangent&&(Gt||ve),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!nt.attributes.uv&&(Lt||X),fog:!!K,useFog:b.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:W,skinning:k.isSkinnedMesh===!0,morphTargets:nt.morphAttributes.position!==void 0,morphNormals:nt.morphAttributes.normal!==void 0,morphColors:nt.morphAttributes.color!==void 0,morphTargetsCount:Ot,morphTextureStride:G,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ut,decodeVideoTexture:Lt&&b.map.isVideoTexture===!0&&be.getTransfer(b.map.colorSpace)===Fe,decodeVideoTextureEmissive:zt&&b.emissiveMap.isVideoTexture===!0&&be.getTransfer(b.emissiveMap.colorSpace)===Fe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ce,flipSided:b.side===gn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:it&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&b.extensions.multiDraw===!0||pt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Wt.vertexUv1s=l.has(1),Wt.vertexUv2s=l.has(2),Wt.vertexUv3s=l.has(3),l.clear(),Wt}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)M.push(D),M.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(S(M,b),y(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function S(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){let M=g[b.type],D;if(M){let z=bi[M];D=Tp.clone(z.uniforms)}else D=b.uniforms;return D}function T(b,M){let D;for(let z=0,k=h.length;z<k;z++){let K=h[z];if(K.cacheKey===M){D=K,++D.usedTimes;break}}return D===void 0&&(D=new sM(i,M,b,r),h.push(D)),D}function w(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function A(b){c.remove(b)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:U}}function aM(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function cM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Qp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function tm(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||cM),n.length>1&&n.sort(f||Qp),s.length>1&&s.sort(f||Qp)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function lM(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new tm,i.set(n,[o])):s>=r.length?(o=new tm,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function hM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new ie};break;case"SpotLight":e={position:new I,direction:new I,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function uM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}function dM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function pM(i){let t=new hM,e=uM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);let s=new I,r=new le,o=new le;function a(l){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,S=0,y=0,x=0,T=0,w=0,A=0;l.sort(dM);for(let b=0,M=l.length;b<M;b++){let D=l[b],z=D.color,k=D.intensity,K=D.distance,nt=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=z.r*k,u+=z.g*k,f+=z.b*k;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(D.sh.coefficients[Z],k);A++}else if(D.isDirectionalLight){let Z=t.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let yt=D.shadow,J=e.get(D);J.shadowIntensity=yt.intensity,J.shadowBias=yt.bias,J.shadowNormalBias=yt.normalBias,J.shadowRadius=yt.radius,J.shadowMapSize=yt.mapSize,n.directionalShadow[d]=J,n.directionalShadowMap[d]=nt,n.directionalShadowMatrix[d]=D.shadow.matrix,S++}n.directional[d]=Z,d++}else if(D.isSpotLight){let Z=t.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(z).multiplyScalar(k),Z.distance=K,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,n.spot[_]=Z;let yt=D.shadow;if(D.map&&(n.spotLightMap[T]=D.map,T++,yt.updateMatrices(D),D.castShadow&&w++),n.spotLightMatrix[_]=yt.matrix,D.castShadow){let J=e.get(D);J.shadowIntensity=yt.intensity,J.shadowBias=yt.bias,J.shadowNormalBias=yt.normalBias,J.shadowRadius=yt.radius,J.shadowMapSize=yt.mapSize,n.spotShadow[_]=J,n.spotShadowMap[_]=nt,x++}_++}else if(D.isRectAreaLight){let Z=t.get(D);Z.color.copy(z).multiplyScalar(k),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=Z,m++}else if(D.isPointLight){let Z=t.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){let yt=D.shadow,J=e.get(D);J.shadowIntensity=yt.intensity,J.shadowBias=yt.bias,J.shadowNormalBias=yt.normalBias,J.shadowRadius=yt.radius,J.shadowMapSize=yt.mapSize,J.shadowCameraNear=yt.camera.near,J.shadowCameraFar=yt.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=nt,n.pointShadowMatrix[g]=D.shadow.matrix,y++}n.point[g]=Z,g++}else if(D.isHemisphereLight){let Z=t.get(D);Z.skyColor.copy(D.color).multiplyScalar(k),Z.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[p]=Z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=kt.LTC_FLOAT_1,n.rectAreaLTC2=kt.LTC_FLOAT_2):(n.rectAreaLTC1=kt.LTC_HALF_1,n.rectAreaLTC2=kt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let U=n.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==S||U.numPointShadows!==y||U.numSpotShadows!==x||U.numSpotMaps!==T||U.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,U.directionalLength=d,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=S,U.numPointShadows=y,U.numSpotShadows=x,U.numSpotMaps=T,U.numLightProbes=A,n.version=fM++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){let y=l[p];if(y.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(y.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(y.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function em(i){let t=new pM(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function mM(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new em(i),t.set(s,[a])):r>=o.length?(a=new em(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function xM(i,t,e){let n=new Dr,s=new At,r=new At,o=new Le,a=new wc({depthPacking:dp}),c=new Ac,l={},h=e.maxTextureSize,u={[si]:gn,[gn]:si,[Ce]:Ce},f=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:gM,fragmentShader:_M}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Be;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new he(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jh;let p=this.type;this.render=function(w,A,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),z=i.state;z.setBlending(qi),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let k=p!==Si&&this.type===Si,K=p===Si&&this.type!==Si;for(let nt=0,Z=w.length;nt<Z;nt++){let yt=w[nt],J=yt.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",yt,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let Tt=J.getFrameExtents();if(s.multiply(Tt),r.copy(J.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Tt.x),s.x=r.x*Tt.x,J.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Tt.y),s.y=r.y*Tt.y,J.mapSize.y=r.y)),J.map===null||k===!0||K===!0){let Ot=this.type!==Si?{minFilter:pn,magFilter:pn}:{};J.map!==null&&J.map.dispose(),J.map=new $n(s.x,s.y,Ot),J.map.texture.name=yt.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();let It=J.getViewportCount();for(let Ot=0;Ot<It;Ot++){let G=J.getViewport(Ot);o.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),z.viewport(o),J.updateMatrices(yt,Ot),n=J.getFrustum(),x(A,U,J.camera,yt,this.type)}J.isPointLightShadow!==!0&&this.type===Si&&S(J,U),J.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,D)};function S(w,A){let U=t.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new $n(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,U,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,U,d,_,null)}function y(w,A,U,b){let M=null,D=U.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)M=D;else if(M=U.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let z=M.uuid,k=A.uuid,K=l[z];K===void 0&&(K={},l[z]=K);let nt=K[k];nt===void 0&&(nt=M.clone(),K[k]=nt,A.addEventListener("dispose",T)),M=nt}if(M.visible=A.visible,M.wireframe=A.wireframe,b===Si?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let z=i.properties.get(M);z.light=U}return M}function x(w,A,U,b,M){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===Si)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,w.matrixWorld);let k=t.update(w),K=w.material;if(Array.isArray(K)){let nt=k.groups;for(let Z=0,yt=nt.length;Z<yt;Z++){let J=nt[Z],Tt=K[J.materialIndex];if(Tt&&Tt.visible){let It=y(w,Tt,b,M);w.onBeforeShadow(i,w,A,U,k,It,J),i.renderBufferDirect(U,null,k,It,w,J),w.onAfterShadow(i,w,A,U,k,It,J)}}}else if(K.visible){let nt=y(w,K,b,M);w.onBeforeShadow(i,w,A,U,k,nt,null),i.renderBufferDirect(U,null,k,nt,w,null),w.onAfterShadow(i,w,A,U,k,nt,null)}}let z=w.children;for(let k=0,K=z.length;k<K;k++)x(z[k],A,U,b,M)}function T(w){w.target.removeEventListener("dispose",T);for(let U in l){let b=l[U],M=w.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}function vM(i,t){function e(){let O=!1,L=new Le,Y=null,X=new Le(0,0,0,0);return{setMask:function(B){Y!==B&&!O&&(i.colorMask(B,B,B,B),Y=B)},setLocked:function(B){O=B},setClear:function(B,F,it,ut,Wt){Wt===!0&&(B*=ut,F*=ut,it*=ut),L.set(B,F,it,ut),X.equals(L)===!1&&(i.clearColor(B,F,it,ut),X.copy(L))},reset:function(){O=!1,Y=null,X.set(-1,0,0,0)}}}function n(){let O=!1,L=!1,Y=null,X=null,B=null;return{setReversed:function(F){if(L!==F){let it=t.get("EXT_clip_control");F?it.clipControlEXT(it.LOWER_LEFT_EXT,it.ZERO_TO_ONE_EXT):it.clipControlEXT(it.LOWER_LEFT_EXT,it.NEGATIVE_ONE_TO_ONE_EXT),L=F;let ut=B;B=null,this.setClear(ut)}},getReversed:function(){return L},setTest:function(F){F?C(i.DEPTH_TEST):W(i.DEPTH_TEST)},setMask:function(F){Y!==F&&!O&&(i.depthMask(F),Y=F)},setFunc:function(F){if(L&&(F=yM[F]),X!==F){switch(F){case Uc:i.depthFunc(i.NEVER);break;case Fc:i.depthFunc(i.ALWAYS);break;case Oc:i.depthFunc(i.LESS);break;case Ts:i.depthFunc(i.LEQUAL);break;case Bc:i.depthFunc(i.EQUAL);break;case kc:i.depthFunc(i.GEQUAL);break;case zc:i.depthFunc(i.GREATER);break;case Hc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}X=F}},setLocked:function(F){O=F},setClear:function(F){B!==F&&(L&&(F=1-F),i.clearDepth(F),B=F)},reset:function(){O=!1,Y=null,X=null,B=null,L=!1}}}function s(){let O=!1,L=null,Y=null,X=null,B=null,F=null,it=null,ut=null,Wt=null;return{setTest:function(Dt){O||(Dt?C(i.STENCIL_TEST):W(i.STENCIL_TEST))},setMask:function(Dt){L!==Dt&&!O&&(i.stencilMask(Dt),L=Dt)},setFunc:function(Dt,jt,ae){(Y!==Dt||X!==jt||B!==ae)&&(i.stencilFunc(Dt,jt,ae),Y=Dt,X=jt,B=ae)},setOp:function(Dt,jt,ae){(F!==Dt||it!==jt||ut!==ae)&&(i.stencilOp(Dt,jt,ae),F=Dt,it=jt,ut=ae)},setLocked:function(Dt){O=Dt},setClear:function(Dt){Wt!==Dt&&(i.clearStencil(Dt),Wt=Dt)},reset:function(){O=!1,L=null,Y=null,X=null,B=null,F=null,it=null,ut=null,Wt=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,y=null,x=null,T=null,w=null,A=new ie(0,0,0),U=0,b=!1,M=null,D=null,z=null,k=null,K=null,nt=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,yt=0,J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(yt=parseFloat(/^WebGL (\d)/.exec(J)[1]),Z=yt>=1):J.indexOf("OpenGL ES")!==-1&&(yt=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),Z=yt>=2);let Tt=null,It={},Ot=i.getParameter(i.SCISSOR_BOX),G=i.getParameter(i.VIEWPORT),et=new Le().fromArray(Ot),rt=new Le().fromArray(G);function at(O,L,Y,X){let B=new Uint8Array(4),F=i.createTexture();i.bindTexture(O,F),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let it=0;it<Y;it++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(L,0,i.RGBA,1,1,X,0,i.RGBA,i.UNSIGNED_BYTE,B):i.texImage2D(L+it,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,B);return F}let N={};N[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),N[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),N[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),N[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),C(i.DEPTH_TEST),o.setFunc(Ts),Ft(!1),Gt(jh),C(i.CULL_FACE),Vt(qi);function C(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function W(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function gt(O,L){return u[O]!==L?(i.bindFramebuffer(O,L),u[O]=L,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=L),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=L),!0):!1}function pt(O,L){let Y=d,X=!1;if(O){Y=f.get(L),Y===void 0&&(Y=[],f.set(L,Y));let B=O.textures;if(Y.length!==B.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let F=0,it=B.length;F<it;F++)Y[F]=i.COLOR_ATTACHMENT0+F;Y.length=B.length,X=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,X=!0);X&&i.drawBuffers(Y)}function Lt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}let Kt={[os]:i.FUNC_ADD,[kd]:i.FUNC_SUBTRACT,[zd]:i.FUNC_REVERSE_SUBTRACT};Kt[Hd]=i.MIN,Kt[Vd]=i.MAX;let P={[Gd]:i.ZERO,[Wd]:i.ONE,[Xd]:i.SRC_COLOR,[hc]:i.SRC_ALPHA,[jd]:i.SRC_ALPHA_SATURATE,[Zd]:i.DST_COLOR,[Yd]:i.DST_ALPHA,[qd]:i.ONE_MINUS_SRC_COLOR,[uc]:i.ONE_MINUS_SRC_ALPHA,[Kd]:i.ONE_MINUS_DST_COLOR,[$d]:i.ONE_MINUS_DST_ALPHA,[Jd]:i.CONSTANT_COLOR,[Qd]:i.ONE_MINUS_CONSTANT_COLOR,[tp]:i.CONSTANT_ALPHA,[ep]:i.ONE_MINUS_CONSTANT_ALPHA};function Vt(O,L,Y,X,B,F,it,ut,Wt,Dt){if(O===qi){_===!0&&(W(i.BLEND),_=!1);return}if(_===!1&&(C(i.BLEND),_=!0),O!==Bd){if(O!==m||Dt!==b){if((p!==os||x!==os)&&(i.blendEquation(i.FUNC_ADD),p=os,x=os),Dt)switch(O){case Es:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qh:i.blendFunc(i.ONE,i.ONE);break;case tu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Es:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case tu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}S=null,y=null,T=null,w=null,A.set(0,0,0),U=0,m=O,b=Dt}return}B=B||L,F=F||Y,it=it||X,(L!==p||B!==x)&&(i.blendEquationSeparate(Kt[L],Kt[B]),p=L,x=B),(Y!==S||X!==y||F!==T||it!==w)&&(i.blendFuncSeparate(P[Y],P[X],P[F],P[it]),S=Y,y=X,T=F,w=it),(ut.equals(A)===!1||Wt!==U)&&(i.blendColor(ut.r,ut.g,ut.b,Wt),A.copy(ut),U=Wt),m=O,b=!1}function St(O,L){O.side===Ce?W(i.CULL_FACE):C(i.CULL_FACE);let Y=O.side===gn;L&&(Y=!Y),Ft(Y),O.blending===Es&&O.transparent===!1?Vt(qi):Vt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let X=O.stencilWrite;a.setTest(X),X&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),zt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?C(i.SAMPLE_ALPHA_TO_COVERAGE):W(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(O){M!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),M=O)}function Gt(O){O!==Ud?(C(i.CULL_FACE),O!==D&&(O===jh?i.cullFace(i.BACK):O===Fd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):W(i.CULL_FACE),D=O}function we(O){O!==z&&(Z&&i.lineWidth(O),z=O)}function zt(O,L,Y){O?(C(i.POLYGON_OFFSET_FILL),(k!==L||K!==Y)&&(i.polygonOffset(L,Y),k=L,K=Y)):W(i.POLYGON_OFFSET_FILL)}function $t(O){O?C(i.SCISSOR_TEST):W(i.SCISSOR_TEST)}function ye(O){O===void 0&&(O=i.TEXTURE0+nt-1),Tt!==O&&(i.activeTexture(O),Tt=O)}function ve(O,L,Y){Y===void 0&&(Tt===null?Y=i.TEXTURE0+nt-1:Y=Tt);let X=It[Y];X===void 0&&(X={type:void 0,texture:void 0},It[Y]=X),(X.type!==O||X.texture!==L)&&(Tt!==Y&&(i.activeTexture(Y),Tt=Y),i.bindTexture(O,L||N[O]),X.type=O,X.texture=L)}function R(){let O=It[Tt];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Q(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ct(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Zt(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function tt(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function vt(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function bt(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ht(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(O){et.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),et.copy(O))}function Ht(O){rt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),rt.copy(O))}function qt(O,L){let Y=l.get(L);Y===void 0&&(Y=new WeakMap,l.set(L,Y));let X=Y.get(O);X===void 0&&(X=i.getUniformBlockIndex(L,O.name),Y.set(O,X))}function Ut(O,L){let X=l.get(L).get(O);c.get(L)!==X&&(i.uniformBlockBinding(L,X,O.__bindingPointIndex),c.set(L,X))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Tt=null,It={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,y=null,x=null,T=null,w=null,A=new ie(0,0,0),U=0,b=!1,M=null,D=null,z=null,k=null,K=null,et.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:C,disable:W,bindFramebuffer:gt,drawBuffers:pt,useProgram:Lt,setBlending:Vt,setMaterial:St,setFlipSided:Ft,setCullFace:Gt,setLineWidth:we,setPolygonOffset:zt,setScissorTest:$t,activeTexture:ye,bindTexture:ve,unbindTexture:R,compressedTexImage2D:v,compressedTexImage3D:Q,texImage2D:bt,texImage3D:ht,updateUBOMapping:qt,uniformBlockBinding:Ut,texStorage2D:tt,texStorage3D:vt,texSubImage2D:ot,texSubImage3D:ft,compressedTexSubImage2D:ct,compressedTexSubImage3D:Zt,scissor:mt,viewport:Ht,reset:se}}function MM(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new At,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,v){return d?new OffscreenCanvas(R,v):wr("canvas")}function _(R,v,Q){let ot=1,ft=ve(R);if((ft.width>Q||ft.height>Q)&&(ot=Q/Math.max(ft.width,ft.height)),ot<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ct=Math.floor(ot*ft.width),Zt=Math.floor(ot*ft.height);u===void 0&&(u=g(ct,Zt));let tt=v?g(ct,Zt):u;return tt.width=ct,tt.height=Zt,tt.getContext("2d").drawImage(R,0,0,ct,Zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ft.width+"x"+ft.height+") to ("+ct+"x"+Zt+")."),tt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ft.width+"x"+ft.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,v,Q,ot,ft=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ct=v;if(v===i.RED&&(Q===i.FLOAT&&(ct=i.R32F),Q===i.HALF_FLOAT&&(ct=i.R16F),Q===i.UNSIGNED_BYTE&&(ct=i.R8)),v===i.RED_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ct=i.R8UI),Q===i.UNSIGNED_SHORT&&(ct=i.R16UI),Q===i.UNSIGNED_INT&&(ct=i.R32UI),Q===i.BYTE&&(ct=i.R8I),Q===i.SHORT&&(ct=i.R16I),Q===i.INT&&(ct=i.R32I)),v===i.RG&&(Q===i.FLOAT&&(ct=i.RG32F),Q===i.HALF_FLOAT&&(ct=i.RG16F),Q===i.UNSIGNED_BYTE&&(ct=i.RG8)),v===i.RG_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ct=i.RG8UI),Q===i.UNSIGNED_SHORT&&(ct=i.RG16UI),Q===i.UNSIGNED_INT&&(ct=i.RG32UI),Q===i.BYTE&&(ct=i.RG8I),Q===i.SHORT&&(ct=i.RG16I),Q===i.INT&&(ct=i.RG32I)),v===i.RGB_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ct=i.RGB8UI),Q===i.UNSIGNED_SHORT&&(ct=i.RGB16UI),Q===i.UNSIGNED_INT&&(ct=i.RGB32UI),Q===i.BYTE&&(ct=i.RGB8I),Q===i.SHORT&&(ct=i.RGB16I),Q===i.INT&&(ct=i.RGB32I)),v===i.RGBA_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ct=i.RGBA8UI),Q===i.UNSIGNED_SHORT&&(ct=i.RGBA16UI),Q===i.UNSIGNED_INT&&(ct=i.RGBA32UI),Q===i.BYTE&&(ct=i.RGBA8I),Q===i.SHORT&&(ct=i.RGBA16I),Q===i.INT&&(ct=i.RGBA32I)),v===i.RGB&&(Q===i.UNSIGNED_INT_5_9_9_9_REV&&(ct=i.RGB9_E5),Q===i.UNSIGNED_INT_10F_11F_11F_REV&&(ct=i.R11F_G11F_B10F)),v===i.RGBA){let Zt=ft?Ro:be.getTransfer(ot);Q===i.FLOAT&&(ct=i.RGBA32F),Q===i.HALF_FLOAT&&(ct=i.RGBA16F),Q===i.UNSIGNED_BYTE&&(ct=Zt===Fe?i.SRGB8_ALPHA8:i.RGBA8),Q===i.UNSIGNED_SHORT_4_4_4_4&&(ct=i.RGBA4),Q===i.UNSIGNED_SHORT_5_5_5_1&&(ct=i.RGB5_A1)}return(ct===i.R16F||ct===i.R32F||ct===i.RG16F||ct===i.RG32F||ct===i.RGBA16F||ct===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ct}function x(R,v){let Q;return R?v===null||v===us||v===Gr?Q=i.DEPTH24_STENCIL8:v===Kn?Q=i.DEPTH32F_STENCIL8:v===Hr&&(Q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===us||v===Gr?Q=i.DEPTH_COMPONENT24:v===Kn?Q=i.DEPTH_COMPONENT32F:v===Hr&&(Q=i.DEPTH_COMPONENT16),Q}function T(R,v){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==pn&&R.minFilter!==Rn?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function w(R){let v=R.target;v.removeEventListener("dispose",w),U(v),v.isVideoTexture&&h.delete(v)}function A(R){let v=R.target;v.removeEventListener("dispose",A),M(v)}function U(R){let v=n.get(R);if(v.__webglInit===void 0)return;let Q=R.source,ot=f.get(Q);if(ot){let ft=ot[v.__cacheKey];ft.usedTimes--,ft.usedTimes===0&&b(R),Object.keys(ot).length===0&&f.delete(Q)}n.remove(R)}function b(R){let v=n.get(R);i.deleteTexture(v.__webglTexture);let Q=R.source,ot=f.get(Q);delete ot[v.__cacheKey],o.memory.textures--}function M(R){let v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(v.__webglFramebuffer[ot]))for(let ft=0;ft<v.__webglFramebuffer[ot].length;ft++)i.deleteFramebuffer(v.__webglFramebuffer[ot][ft]);else i.deleteFramebuffer(v.__webglFramebuffer[ot]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[ot])}else{if(Array.isArray(v.__webglFramebuffer))for(let ot=0;ot<v.__webglFramebuffer.length;ot++)i.deleteFramebuffer(v.__webglFramebuffer[ot]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let ot=0;ot<v.__webglColorRenderbuffer.length;ot++)v.__webglColorRenderbuffer[ot]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[ot]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let Q=R.textures;for(let ot=0,ft=Q.length;ot<ft;ot++){let ct=n.get(Q[ot]);ct.__webglTexture&&(i.deleteTexture(ct.__webglTexture),o.memory.textures--),n.remove(Q[ot])}n.remove(R)}let D=0;function z(){D=0}function k(){let R=D;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),D+=1,R}function K(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function nt(R,v){let Q=n.get(R);if(R.isVideoTexture&&$t(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&Q.__version!==R.version){let ot=R.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(Q,R,v);return}}else R.isExternalTexture&&(Q.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture,i.TEXTURE0+v)}function Z(R,v){let Q=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Q.__version!==R.version){N(Q,R,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Q.__webglTexture,i.TEXTURE0+v)}function yt(R,v){let Q=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Q.__version!==R.version){N(Q,R,v);return}e.bindTexture(i.TEXTURE_3D,Q.__webglTexture,i.TEXTURE0+v)}function J(R,v){let Q=n.get(R);if(R.version>0&&Q.__version!==R.version){C(Q,R,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture,i.TEXTURE0+v)}let Tt={[Yn]:i.REPEAT,[di]:i.CLAMP_TO_EDGE,[Er]:i.MIRRORED_REPEAT},It={[pn]:i.NEAREST,[qc]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[Rn]:i.LINEAR,[zr]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},Ot={[mp]:i.NEVER,[Mp]:i.ALWAYS,[gp]:i.LESS,[uu]:i.LEQUAL,[_p]:i.EQUAL,[vp]:i.GEQUAL,[xp]:i.GREATER,[yp]:i.NOTEQUAL};function G(R,v){if(v.type===Kn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Rn||v.magFilter===zr||v.magFilter===Gs||v.magFilter===oi||v.minFilter===Rn||v.minFilter===zr||v.minFilter===Gs||v.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Tt[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Tt[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Tt[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,It[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,It[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Ot[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===pn||v.minFilter!==Gs&&v.minFilter!==oi||v.type===Kn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let Q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function et(R,v){let Q=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",w));let ot=v.source,ft=f.get(ot);ft===void 0&&(ft={},f.set(ot,ft));let ct=K(v);if(ct!==R.__cacheKey){ft[ct]===void 0&&(ft[ct]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),ft[ct].usedTimes++;let Zt=ft[R.__cacheKey];Zt!==void 0&&(ft[R.__cacheKey].usedTimes--,Zt.usedTimes===0&&b(v)),R.__cacheKey=ct,R.__webglTexture=ft[ct].texture}return Q}function rt(R,v,Q){return Math.floor(Math.floor(R/Q)/v)}function at(R,v,Q,ot){let ct=R.updateRanges;if(ct.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,Q,ot,v.data);else{ct.sort((ht,mt)=>ht.start-mt.start);let Zt=0;for(let ht=1;ht<ct.length;ht++){let mt=ct[Zt],Ht=ct[ht],qt=mt.start+mt.count,Ut=rt(Ht.start,v.width,4),se=rt(mt.start,v.width,4);Ht.start<=qt+1&&Ut===se&&rt(Ht.start+Ht.count-1,v.width,4)===Ut?mt.count=Math.max(mt.count,Ht.start+Ht.count-mt.start):(++Zt,ct[Zt]=Ht)}ct.length=Zt+1;let tt=i.getParameter(i.UNPACK_ROW_LENGTH),vt=i.getParameter(i.UNPACK_SKIP_PIXELS),bt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ht=0,mt=ct.length;ht<mt;ht++){let Ht=ct[ht],qt=Math.floor(Ht.start/4),Ut=Math.ceil(Ht.count/4),se=qt%v.width,O=Math.floor(qt/v.width),L=Ut,Y=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,se),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,se,O,L,Y,Q,ot,v.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,tt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),i.pixelStorei(i.UNPACK_SKIP_ROWS,bt)}}function N(R,v,Q){let ot=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ot=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ot=i.TEXTURE_3D);let ft=et(R,v),ct=v.source;e.bindTexture(ot,R.__webglTexture,i.TEXTURE0+Q);let Zt=n.get(ct);if(ct.version!==Zt.__version||ft===!0){e.activeTexture(i.TEXTURE0+Q);let tt=be.getPrimaries(be.workingColorSpace),vt=v.colorSpace===$i?null:be.getPrimaries(v.colorSpace),bt=v.colorSpace===$i||tt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let ht=_(v.image,!1,s.maxTextureSize);ht=ye(v,ht);let mt=r.convert(v.format,v.colorSpace),Ht=r.convert(v.type),qt=y(v.internalFormat,mt,Ht,v.colorSpace,v.isVideoTexture);G(ot,v);let Ut,se=v.mipmaps,O=v.isVideoTexture!==!0,L=Zt.__version===void 0||ft===!0,Y=ct.dataReady,X=T(v,ht);if(v.isDepthTexture)qt=x(v.format===Wr,v.type),L&&(O?e.texStorage2D(i.TEXTURE_2D,1,qt,ht.width,ht.height):e.texImage2D(i.TEXTURE_2D,0,qt,ht.width,ht.height,0,mt,Ht,null));else if(v.isDataTexture)if(se.length>0){O&&L&&e.texStorage2D(i.TEXTURE_2D,X,qt,se[0].width,se[0].height);for(let B=0,F=se.length;B<F;B++)Ut=se[B],O?Y&&e.texSubImage2D(i.TEXTURE_2D,B,0,0,Ut.width,Ut.height,mt,Ht,Ut.data):e.texImage2D(i.TEXTURE_2D,B,qt,Ut.width,Ut.height,0,mt,Ht,Ut.data);v.generateMipmaps=!1}else O?(L&&e.texStorage2D(i.TEXTURE_2D,X,qt,ht.width,ht.height),Y&&at(v,ht,mt,Ht)):e.texImage2D(i.TEXTURE_2D,0,qt,ht.width,ht.height,0,mt,Ht,ht.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){O&&L&&e.texStorage3D(i.TEXTURE_2D_ARRAY,X,qt,se[0].width,se[0].height,ht.depth);for(let B=0,F=se.length;B<F;B++)if(Ut=se[B],v.format!==Wn)if(mt!==null)if(O){if(Y)if(v.layerUpdates.size>0){let it=yu(Ut.width,Ut.height,v.format,v.type);for(let ut of v.layerUpdates){let Wt=Ut.data.subarray(ut*it/Ut.data.BYTES_PER_ELEMENT,(ut+1)*it/Ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,ut,Ut.width,Ut.height,1,mt,Wt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,Ut.width,Ut.height,ht.depth,mt,Ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,B,qt,Ut.width,Ut.height,ht.depth,0,Ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?Y&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,Ut.width,Ut.height,ht.depth,mt,Ht,Ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,B,qt,Ut.width,Ut.height,ht.depth,0,mt,Ht,Ut.data)}else{O&&L&&e.texStorage2D(i.TEXTURE_2D,X,qt,se[0].width,se[0].height);for(let B=0,F=se.length;B<F;B++)Ut=se[B],v.format!==Wn?mt!==null?O?Y&&e.compressedTexSubImage2D(i.TEXTURE_2D,B,0,0,Ut.width,Ut.height,mt,Ut.data):e.compressedTexImage2D(i.TEXTURE_2D,B,qt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?Y&&e.texSubImage2D(i.TEXTURE_2D,B,0,0,Ut.width,Ut.height,mt,Ht,Ut.data):e.texImage2D(i.TEXTURE_2D,B,qt,Ut.width,Ut.height,0,mt,Ht,Ut.data)}else if(v.isDataArrayTexture)if(O){if(L&&e.texStorage3D(i.TEXTURE_2D_ARRAY,X,qt,ht.width,ht.height,ht.depth),Y)if(v.layerUpdates.size>0){let B=yu(ht.width,ht.height,v.format,v.type);for(let F of v.layerUpdates){let it=ht.data.subarray(F*B/ht.data.BYTES_PER_ELEMENT,(F+1)*B/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,F,ht.width,ht.height,1,mt,Ht,it)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,mt,Ht,ht.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,qt,ht.width,ht.height,ht.depth,0,mt,Ht,ht.data);else if(v.isData3DTexture)O?(L&&e.texStorage3D(i.TEXTURE_3D,X,qt,ht.width,ht.height,ht.depth),Y&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,mt,Ht,ht.data)):e.texImage3D(i.TEXTURE_3D,0,qt,ht.width,ht.height,ht.depth,0,mt,Ht,ht.data);else if(v.isFramebufferTexture){if(L)if(O)e.texStorage2D(i.TEXTURE_2D,X,qt,ht.width,ht.height);else{let B=ht.width,F=ht.height;for(let it=0;it<X;it++)e.texImage2D(i.TEXTURE_2D,it,qt,B,F,0,mt,Ht,null),B>>=1,F>>=1}}else if(se.length>0){if(O&&L){let B=ve(se[0]);e.texStorage2D(i.TEXTURE_2D,X,qt,B.width,B.height)}for(let B=0,F=se.length;B<F;B++)Ut=se[B],O?Y&&e.texSubImage2D(i.TEXTURE_2D,B,0,0,mt,Ht,Ut):e.texImage2D(i.TEXTURE_2D,B,qt,mt,Ht,Ut);v.generateMipmaps=!1}else if(O){if(L){let B=ve(ht);e.texStorage2D(i.TEXTURE_2D,X,qt,B.width,B.height)}Y&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Ht,ht)}else e.texImage2D(i.TEXTURE_2D,0,qt,mt,Ht,ht);m(v)&&p(ot),Zt.__version=ct.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function C(R,v,Q){if(v.image.length!==6)return;let ot=et(R,v),ft=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+Q);let ct=n.get(ft);if(ft.version!==ct.__version||ot===!0){e.activeTexture(i.TEXTURE0+Q);let Zt=be.getPrimaries(be.workingColorSpace),tt=v.colorSpace===$i?null:be.getPrimaries(v.colorSpace),vt=v.colorSpace===$i||Zt===tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let bt=v.isCompressedTexture||v.image[0].isCompressedTexture,ht=v.image[0]&&v.image[0].isDataTexture,mt=[];for(let F=0;F<6;F++)!bt&&!ht?mt[F]=_(v.image[F],!0,s.maxCubemapSize):mt[F]=ht?v.image[F].image:v.image[F],mt[F]=ye(v,mt[F]);let Ht=mt[0],qt=r.convert(v.format,v.colorSpace),Ut=r.convert(v.type),se=y(v.internalFormat,qt,Ut,v.colorSpace),O=v.isVideoTexture!==!0,L=ct.__version===void 0||ot===!0,Y=ft.dataReady,X=T(v,Ht);G(i.TEXTURE_CUBE_MAP,v);let B;if(bt){O&&L&&e.texStorage2D(i.TEXTURE_CUBE_MAP,X,se,Ht.width,Ht.height);for(let F=0;F<6;F++){B=mt[F].mipmaps;for(let it=0;it<B.length;it++){let ut=B[it];v.format!==Wn?qt!==null?O?Y&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it,0,0,ut.width,ut.height,qt,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it,se,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?Y&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it,0,0,ut.width,ut.height,qt,Ut,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it,se,ut.width,ut.height,0,qt,Ut,ut.data)}}}else{if(B=v.mipmaps,O&&L){B.length>0&&X++;let F=ve(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,X,se,F.width,F.height)}for(let F=0;F<6;F++)if(ht){O?Y&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,0,0,mt[F].width,mt[F].height,qt,Ut,mt[F].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,se,mt[F].width,mt[F].height,0,qt,Ut,mt[F].data);for(let it=0;it<B.length;it++){let Wt=B[it].image[F].image;O?Y&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it+1,0,0,Wt.width,Wt.height,qt,Ut,Wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it+1,se,Wt.width,Wt.height,0,qt,Ut,Wt.data)}}else{O?Y&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,0,0,qt,Ut,mt[F]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,0,se,qt,Ut,mt[F]);for(let it=0;it<B.length;it++){let ut=B[it];O?Y&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it+1,0,0,qt,Ut,ut.image[F]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+F,it+1,se,qt,Ut,ut.image[F])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),ct.__version=ft.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function W(R,v,Q,ot,ft,ct){let Zt=r.convert(Q.format,Q.colorSpace),tt=r.convert(Q.type),vt=y(Q.internalFormat,Zt,tt,Q.colorSpace),bt=n.get(v),ht=n.get(Q);if(ht.__renderTarget=v,!bt.__hasExternalTextures){let mt=Math.max(1,v.width>>ct),Ht=Math.max(1,v.height>>ct);ft===i.TEXTURE_3D||ft===i.TEXTURE_2D_ARRAY?e.texImage3D(ft,ct,vt,mt,Ht,v.depth,0,Zt,tt,null):e.texImage2D(ft,ct,vt,mt,Ht,0,Zt,tt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),zt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,ft,ht.__webglTexture,0,we(v)):(ft===i.TEXTURE_2D||ft>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ft<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ot,ft,ht.__webglTexture,ct),e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(R,v,Q){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){let ot=v.depthTexture,ft=ot&&ot.isDepthTexture?ot.type:null,ct=x(v.stencilBuffer,ft),Zt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=we(v);zt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,ct,v.width,v.height):Q?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,ct,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ct,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Zt,i.RENDERBUFFER,R)}else{let ot=v.textures;for(let ft=0;ft<ot.length;ft++){let ct=ot[ft],Zt=r.convert(ct.format,ct.colorSpace),tt=r.convert(ct.type),vt=y(ct.internalFormat,Zt,tt,ct.colorSpace),bt=we(v);Q&&zt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,vt,v.width,v.height):zt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,vt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,vt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(R,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ot=n.get(v.depthTexture);ot.__renderTarget=v,(!ot.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),nt(v.depthTexture,0);let ft=ot.__webglTexture,ct=we(v);if(v.depthTexture.format===Tr)zt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ft,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ft,0);else if(v.depthTexture.format===Wr)zt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ft,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ft,0);else throw new Error("Unknown depthTexture format")}function Lt(R){let v=n.get(R),Q=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let ot=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),ot){let ft=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,ot.removeEventListener("dispose",ft)};ot.addEventListener("dispose",ft),v.__depthDisposeCallback=ft}v.__boundDepthTexture=ot}if(R.depthTexture&&!v.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");let ot=R.texture.mipmaps;ot&&ot.length>0?pt(v.__webglFramebuffer[0],R):pt(v.__webglFramebuffer,R)}else if(Q){v.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[ot]),v.__webglDepthbuffer[ot]===void 0)v.__webglDepthbuffer[ot]=i.createRenderbuffer(),gt(v.__webglDepthbuffer[ot],R,!1);else{let ft=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=v.__webglDepthbuffer[ot];i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,ct)}}else{let ot=R.texture.mipmaps;if(ot&&ot.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),gt(v.__webglDepthbuffer,R,!1);else{let ft=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,ct)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Kt(R,v,Q){let ot=n.get(R);v!==void 0&&W(ot.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Q!==void 0&&Lt(R)}function P(R){let v=R.texture,Q=n.get(R),ot=n.get(v);R.addEventListener("dispose",A);let ft=R.textures,ct=R.isWebGLCubeRenderTarget===!0,Zt=ft.length>1;if(Zt||(ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture()),ot.__version=v.version,o.memory.textures++),ct){Q.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(v.mipmaps&&v.mipmaps.length>0){Q.__webglFramebuffer[tt]=[];for(let vt=0;vt<v.mipmaps.length;vt++)Q.__webglFramebuffer[tt][vt]=i.createFramebuffer()}else Q.__webglFramebuffer[tt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){Q.__webglFramebuffer=[];for(let tt=0;tt<v.mipmaps.length;tt++)Q.__webglFramebuffer[tt]=i.createFramebuffer()}else Q.__webglFramebuffer=i.createFramebuffer();if(Zt)for(let tt=0,vt=ft.length;tt<vt;tt++){let bt=n.get(ft[tt]);bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&zt(R)===!1){Q.__webglMultisampledFramebuffer=i.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let tt=0;tt<ft.length;tt++){let vt=ft[tt];Q.__webglColorRenderbuffer[tt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Q.__webglColorRenderbuffer[tt]);let bt=r.convert(vt.format,vt.colorSpace),ht=r.convert(vt.type),mt=y(vt.internalFormat,bt,ht,vt.colorSpace,R.isXRRenderTarget===!0),Ht=we(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,mt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.RENDERBUFFER,Q.__webglColorRenderbuffer[tt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(Q.__webglDepthRenderbuffer=i.createRenderbuffer(),gt(Q.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ct){e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),G(i.TEXTURE_CUBE_MAP,v);for(let tt=0;tt<6;tt++)if(v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)W(Q.__webglFramebuffer[tt][vt],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt);else W(Q.__webglFramebuffer[tt],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Zt){for(let tt=0,vt=ft.length;tt<vt;tt++){let bt=ft[tt],ht=n.get(bt),mt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(mt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,ht.__webglTexture),G(mt,bt),W(Q.__webglFramebuffer,R,bt,i.COLOR_ATTACHMENT0+tt,mt,0),m(bt)&&p(mt)}e.unbindTexture()}else{let tt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(tt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,ot.__webglTexture),G(tt,v),v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)W(Q.__webglFramebuffer[vt],R,v,i.COLOR_ATTACHMENT0,tt,vt);else W(Q.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,tt,0);m(v)&&p(tt),e.unbindTexture()}R.depthBuffer&&Lt(R)}function Vt(R){let v=R.textures;for(let Q=0,ot=v.length;Q<ot;Q++){let ft=v[Q];if(m(ft)){let ct=S(R),Zt=n.get(ft).__webglTexture;e.bindTexture(ct,Zt),p(ct),e.unbindTexture()}}}let St=[],Ft=[];function Gt(R){if(R.samples>0){if(zt(R)===!1){let v=R.textures,Q=R.width,ot=R.height,ft=i.COLOR_BUFFER_BIT,ct=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Zt=n.get(R),tt=v.length>1;if(tt)for(let bt=0;bt<v.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Zt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer);let vt=R.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer);for(let bt=0;bt<v.length;bt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ft|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ft|=i.STENCIL_BUFFER_BIT)),tt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Zt.__webglColorRenderbuffer[bt]);let ht=n.get(v[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ht,0)}i.blitFramebuffer(0,0,Q,ot,0,0,Q,ot,ft,i.NEAREST),c===!0&&(St.length=0,Ft.length=0,St.push(i.COLOR_ATTACHMENT0+bt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(St.push(ct),Ft.push(ct),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ft)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),tt)for(let bt=0;bt<v.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,Zt.__webglColorRenderbuffer[bt]);let ht=n.get(v[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Zt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function we(R){return Math.min(s.maxSamples,R.samples)}function zt(R){let v=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function $t(R){let v=o.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function ye(R,v){let Q=R.colorSpace,ot=R.format,ft=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Q!==mn&&Q!==$i&&(be.getTransfer(Q)===Fe?(ot!==Wn||ft!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),v}function ve(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=nt,this.setTexture2DArray=Z,this.setTexture3D=yt,this.setTextureCube=J,this.rebindTextures=Kt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Gt,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=W,this.useMultisampledRTT=zt}function SM(i,t){function e(n,s=$i){let r,o=be.getTransfer(s);if(n===ai)return i.UNSIGNED_BYTE;if(n===$c)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Zc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ru)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ou)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===iu)return i.BYTE;if(n===su)return i.SHORT;if(n===Hr)return i.UNSIGNED_SHORT;if(n===Yc)return i.INT;if(n===us)return i.UNSIGNED_INT;if(n===Kn)return i.FLOAT;if(n===Vr)return i.HALF_FLOAT;if(n===au)return i.ALPHA;if(n===cu)return i.RGB;if(n===Wn)return i.RGBA;if(n===Tr)return i.DEPTH_COMPONENT;if(n===Wr)return i.DEPTH_STENCIL;if(n===Kc)return i.RED;if(n===jc)return i.RED_INTEGER;if(n===lu)return i.RG;if(n===Jc)return i.RG_INTEGER;if(n===Qc)return i.RGBA_INTEGER;if(n===la||n===ha||n===ua||n===fa)if(o===Fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===la)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===la)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===tl||n===el||n===nl||n===il)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===tl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===il)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sl||n===rl||n===ol)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===sl||n===rl)return o===Fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ol)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===al||n===cl||n===ll||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===_l||n===xl||n===yl||n===vl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===al)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===cl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ll)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ul)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ml)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_l)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vl)return o===Fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ml||n===Sl||n===bl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ml)return o===Fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===El||n===Tl||n===wl||n===Al)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===El)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}function wM(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,mu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,S,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===gn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===gn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=t.get(p),y=S.envMap,x=S.envMapRotation;y&&(m.envMap.value=y,qs.copy(x),qs.x*=-1,qs.y*=-1,qs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),m.envMapRotation.value.setFromMatrix4(TM.makeRotationFromEuler(qs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===gn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function AM(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,y){let x=y.program;n.uniformBlockBinding(S,x)}function l(S,y){let x=s[S.id];x===void 0&&(g(S),x=h(S),s[S.id]=x,S.addEventListener("dispose",m));let T=y.program;n.updateUBOMapping(S,T);let w=t.render.frame;r[S.id]!==w&&(f(S),r[S.id]=w)}function h(S){let y=u();S.__bindingPointIndex=y;let x=i.createBuffer(),T=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){let y=s[S.id],x=S.uniforms,T=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,A=x.length;w<A;w++){let U=Array.isArray(x[w])?x[w]:[x[w]];for(let b=0,M=U.length;b<M;b++){let D=U[b];if(d(D,w,b,T)===!0){let z=D.__offset,k=Array.isArray(D.value)?D.value:[D.value],K=0;for(let nt=0;nt<k.length;nt++){let Z=k[nt],yt=_(Z);typeof Z=="number"||typeof Z=="boolean"?(D.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,z+K,D.__data)):Z.isMatrix3?(D.__data[0]=Z.elements[0],D.__data[1]=Z.elements[1],D.__data[2]=Z.elements[2],D.__data[3]=0,D.__data[4]=Z.elements[3],D.__data[5]=Z.elements[4],D.__data[6]=Z.elements[5],D.__data[7]=0,D.__data[8]=Z.elements[6],D.__data[9]=Z.elements[7],D.__data[10]=Z.elements[8],D.__data[11]=0):(Z.toArray(D.__data,K),K+=yt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,y,x,T){let w=S.value,A=y+"_"+x;if(T[A]===void 0)return typeof w=="number"||typeof w=="boolean"?T[A]=w:T[A]=w.clone(),!0;{let U=T[A];if(typeof w=="number"||typeof w=="boolean"){if(U!==w)return T[A]=w,!0}else if(U.equals(w)===!1)return U.copy(w),!0}return!1}function g(S){let y=S.uniforms,x=0,T=16;for(let A=0,U=y.length;A<U;A++){let b=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,D=b.length;M<D;M++){let z=b[M],k=Array.isArray(z.value)?z.value:[z.value];for(let K=0,nt=k.length;K<nt;K++){let Z=k[K],yt=_(Z),J=x%T,Tt=J%yt.boundary,It=J+Tt;x+=Tt,It!==0&&T-It<yt.storage&&(x+=T-It),z.__data=new Float32Array(yt.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=yt.storage}}}let w=x%T;return w>0&&(x+=T-w),S.__size=x,S.__cache={},this}function _(S){let y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){let y=S.target;y.removeEventListener("dispose",m);let x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var e_,n_,i_,s_,r_,o_,a_,c_,l_,h_,u_,f_,d_,p_,m_,g_,__,x_,y_,v_,M_,S_,b_,E_,T_,w_,A_,R_,C_,I_,P_,L_,D_,N_,U_,F_,O_,B_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,$_,Z_,K_,j_,J_,Q_,tx,ex,nx,ix,sx,rx,ox,ax,cx,lx,hx,ux,fx,dx,px,mx,gx,_x,xx,yx,vx,Mx,Sx,bx,Ex,Tx,wx,Ax,Rx,Cx,Ix,Px,Lx,Dx,Nx,Ux,Fx,Ox,Bx,kx,zx,Hx,Vx,Gx,Wx,Xx,qx,Yx,$x,Zx,Kx,jx,Jx,Qx,ty,ey,ny,iy,sy,ry,oy,ay,cy,ly,hy,uy,fy,dy,py,my,gy,_y,xy,yy,vy,My,Sy,by,Ey,Ty,wy,Ay,Ry,Cy,Iy,Py,Ly,Dy,me,kt,bi,Cl,Xs,Ny,Yr,Dp,$s,Mu,Np,Su,bu,Eu,Tu,Ys,qr,Up,Hy,Zr,im,kp,sm,rm,om,zp,Hp,Vp,Gp,Wp,Au,Ru,Cu,wu,$r,Bv,kv,Yp,Pl,$v,Zv,jv,rM,Pu,Lu,fM,gM,_M,yM,bM,EM,Du,Nu,qs,TM,Kr,jn=Qe(()=>{vu();vu();e_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,n_=`#ifdef USE_ALPHAHASH
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
#endif`,i_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,s_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,r_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,o_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,a_=`#ifdef USE_AOMAP
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
#endif`,c_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l_=`#ifdef USE_BATCHING
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
#endif`,h_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,u_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,f_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,d_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,p_=`#ifdef USE_IRIDESCENCE
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
#endif`,m_=`#ifdef USE_BUMPMAP
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
#endif`,g_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,__=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,x_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,v_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,M_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,S_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,b_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,E_=`#define PI 3.141592653589793
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
} // validated`,T_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,w_=`vec3 transformedNormal = objectNormal;
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
#endif`,A_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,R_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,C_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,I_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,P_="gl_FragColor = linearToOutputTexel( gl_FragColor );",L_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,D_=`#ifdef USE_ENVMAP
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
#endif`,N_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,U_=`#ifdef USE_ENVMAP
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
#endif`,F_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O_=`#ifdef USE_ENVMAP
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
#endif`,B_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,k_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,z_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,H_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,V_=`#ifdef USE_GRADIENTMAP
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
}`,G_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,W_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,X_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,q_=`uniform bool receiveShadow;
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
#endif`,Y_=`#ifdef USE_ENVMAP
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
#endif`,$_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Z_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,K_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,J_=`PhysicalMaterial material;
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
#endif`,Q_=`struct PhysicalMaterial {
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
}`,tx=`
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
#endif`,ex=`#if defined( RE_IndirectDiffuse )
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
#endif`,nx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ix=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ox=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hx=`#if defined( USE_POINTS_UV )
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
#endif`,ux=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,px=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gx=`#ifdef USE_MORPHTARGETS
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
#endif`,_x=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bx=`#ifdef USE_NORMALMAP
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
#endif`,Ex=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ax=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Px=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ux=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ox=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kx=`float getShadowMask() {
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
}`,zx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hx=`#ifdef USE_SKINNING
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
#endif`,Vx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gx=`#ifdef USE_SKINNING
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
#endif`,Wx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$x=`#ifdef USE_TRANSMISSION
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
#endif`,Zx=`#ifdef USE_TRANSMISSION
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
#endif`,Kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ty=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ey=`uniform sampler2D t2D;
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
}`,ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ry=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oy=`#include <common>
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
}`,ay=`#if DEPTH_PACKING == 3200
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
}`,cy=`#define DISTANCE
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
}`,ly=`#define DISTANCE
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
}`,hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fy=`uniform float scale;
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
}`,dy=`uniform vec3 diffuse;
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
}`,py=`#include <common>
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
}`,my=`uniform vec3 diffuse;
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
}`,gy=`#define LAMBERT
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
}`,_y=`#define LAMBERT
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
}`,xy=`#define MATCAP
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
}`,yy=`#define MATCAP
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
}`,vy=`#define NORMAL
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
}`,My=`#define NORMAL
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
}`,Sy=`#define PHONG
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
}`,by=`#define PHONG
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
}`,Ey=`#define STANDARD
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
}`,Ty=`#define STANDARD
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
}`,wy=`#define TOON
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
}`,Ay=`#define TOON
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
}`,Ry=`uniform float size;
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
}`,Cy=`uniform vec3 diffuse;
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
}`,Iy=`#include <common>
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
}`,Py=`uniform vec3 color;
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
}`,Ly=`uniform float rotation;
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
}`,Dy=`uniform vec3 diffuse;
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
}`,me={alphahash_fragment:e_,alphahash_pars_fragment:n_,alphamap_fragment:i_,alphamap_pars_fragment:s_,alphatest_fragment:r_,alphatest_pars_fragment:o_,aomap_fragment:a_,aomap_pars_fragment:c_,batching_pars_vertex:l_,batching_vertex:h_,begin_vertex:u_,beginnormal_vertex:f_,bsdfs:d_,iridescence_fragment:p_,bumpmap_pars_fragment:m_,clipping_planes_fragment:g_,clipping_planes_pars_fragment:__,clipping_planes_pars_vertex:x_,clipping_planes_vertex:y_,color_fragment:v_,color_pars_fragment:M_,color_pars_vertex:S_,color_vertex:b_,common:E_,cube_uv_reflection_fragment:T_,defaultnormal_vertex:w_,displacementmap_pars_vertex:A_,displacementmap_vertex:R_,emissivemap_fragment:C_,emissivemap_pars_fragment:I_,colorspace_fragment:P_,colorspace_pars_fragment:L_,envmap_fragment:D_,envmap_common_pars_fragment:N_,envmap_pars_fragment:U_,envmap_pars_vertex:F_,envmap_physical_pars_fragment:Y_,envmap_vertex:O_,fog_vertex:B_,fog_pars_vertex:k_,fog_fragment:z_,fog_pars_fragment:H_,gradientmap_pars_fragment:V_,lightmap_pars_fragment:G_,lights_lambert_fragment:W_,lights_lambert_pars_fragment:X_,lights_pars_begin:q_,lights_toon_fragment:$_,lights_toon_pars_fragment:Z_,lights_phong_fragment:K_,lights_phong_pars_fragment:j_,lights_physical_fragment:J_,lights_physical_pars_fragment:Q_,lights_fragment_begin:tx,lights_fragment_maps:ex,lights_fragment_end:nx,logdepthbuf_fragment:ix,logdepthbuf_pars_fragment:sx,logdepthbuf_pars_vertex:rx,logdepthbuf_vertex:ox,map_fragment:ax,map_pars_fragment:cx,map_particle_fragment:lx,map_particle_pars_fragment:hx,metalnessmap_fragment:ux,metalnessmap_pars_fragment:fx,morphinstance_vertex:dx,morphcolor_vertex:px,morphnormal_vertex:mx,morphtarget_pars_vertex:gx,morphtarget_vertex:_x,normal_fragment_begin:xx,normal_fragment_maps:yx,normal_pars_fragment:vx,normal_pars_vertex:Mx,normal_vertex:Sx,normalmap_pars_fragment:bx,clearcoat_normal_fragment_begin:Ex,clearcoat_normal_fragment_maps:Tx,clearcoat_pars_fragment:wx,iridescence_pars_fragment:Ax,opaque_fragment:Rx,packing:Cx,premultiplied_alpha_fragment:Ix,project_vertex:Px,dithering_fragment:Lx,dithering_pars_fragment:Dx,roughnessmap_fragment:Nx,roughnessmap_pars_fragment:Ux,shadowmap_pars_fragment:Fx,shadowmap_pars_vertex:Ox,shadowmap_vertex:Bx,shadowmask_pars_fragment:kx,skinbase_vertex:zx,skinning_pars_vertex:Hx,skinning_vertex:Vx,skinnormal_vertex:Gx,specularmap_fragment:Wx,specularmap_pars_fragment:Xx,tonemapping_fragment:qx,tonemapping_pars_fragment:Yx,transmission_fragment:$x,transmission_pars_fragment:Zx,uv_pars_fragment:Kx,uv_pars_vertex:jx,uv_vertex:Jx,worldpos_vertex:Qx,background_vert:ty,background_frag:ey,backgroundCube_vert:ny,backgroundCube_frag:iy,cube_vert:sy,cube_frag:ry,depth_vert:oy,depth_frag:ay,distanceRGBA_vert:cy,distanceRGBA_frag:ly,equirect_vert:hy,equirect_frag:uy,linedashed_vert:fy,linedashed_frag:dy,meshbasic_vert:py,meshbasic_frag:my,meshlambert_vert:gy,meshlambert_frag:_y,meshmatcap_vert:xy,meshmatcap_frag:yy,meshnormal_vert:vy,meshnormal_frag:My,meshphong_vert:Sy,meshphong_frag:by,meshphysical_vert:Ey,meshphysical_frag:Ty,meshtoon_vert:wy,meshtoon_frag:Ay,points_vert:Ry,points_frag:Cy,shadow_vert:Iy,shadow_frag:Py,sprite_vert:Ly,sprite_frag:Dy},kt={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fe}},envmap:{envMap:{value:null},envMapRotation:{value:new fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fe},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0},uvTransform:{value:new fe}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}}},bi={basic:{uniforms:Tn([kt.common,kt.specularmap,kt.envmap,kt.aomap,kt.lightmap,kt.fog]),vertexShader:me.meshbasic_vert,fragmentShader:me.meshbasic_frag},lambert:{uniforms:Tn([kt.common,kt.specularmap,kt.envmap,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.fog,kt.lights,{emissive:{value:new ie(0)}}]),vertexShader:me.meshlambert_vert,fragmentShader:me.meshlambert_frag},phong:{uniforms:Tn([kt.common,kt.specularmap,kt.envmap,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.fog,kt.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:me.meshphong_vert,fragmentShader:me.meshphong_frag},standard:{uniforms:Tn([kt.common,kt.envmap,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.roughnessmap,kt.metalnessmap,kt.fog,kt.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag},toon:{uniforms:Tn([kt.common,kt.aomap,kt.lightmap,kt.emissivemap,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.gradientmap,kt.fog,kt.lights,{emissive:{value:new ie(0)}}]),vertexShader:me.meshtoon_vert,fragmentShader:me.meshtoon_frag},matcap:{uniforms:Tn([kt.common,kt.bumpmap,kt.normalmap,kt.displacementmap,kt.fog,{matcap:{value:null}}]),vertexShader:me.meshmatcap_vert,fragmentShader:me.meshmatcap_frag},points:{uniforms:Tn([kt.points,kt.fog]),vertexShader:me.points_vert,fragmentShader:me.points_frag},dashed:{uniforms:Tn([kt.common,kt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:me.linedashed_vert,fragmentShader:me.linedashed_frag},depth:{uniforms:Tn([kt.common,kt.displacementmap]),vertexShader:me.depth_vert,fragmentShader:me.depth_frag},normal:{uniforms:Tn([kt.common,kt.bumpmap,kt.normalmap,kt.displacementmap,{opacity:{value:1}}]),vertexShader:me.meshnormal_vert,fragmentShader:me.meshnormal_frag},sprite:{uniforms:Tn([kt.sprite,kt.fog]),vertexShader:me.sprite_vert,fragmentShader:me.sprite_frag},background:{uniforms:{uvTransform:{value:new fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:me.background_vert,fragmentShader:me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new fe}},vertexShader:me.backgroundCube_vert,fragmentShader:me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:me.cube_vert,fragmentShader:me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:me.equirect_vert,fragmentShader:me.equirect_frag},distanceRGBA:{uniforms:Tn([kt.common,kt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:me.distanceRGBA_vert,fragmentShader:me.distanceRGBA_frag},shadow:{uniforms:Tn([kt.lights,kt.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:me.shadow_vert,fragmentShader:me.shadow_frag}};bi.physical={uniforms:Tn([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fe},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fe},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fe},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fe},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fe},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fe}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag};Cl={r:0,b:0,g:0},Xs=new Zn,Ny=new le;Yr=4,Dp=[.125,.215,.35,.446,.526,.582],$s=20,Mu=new Wi,Np=new ie,Su=null,bu=0,Eu=0,Tu=!1,Ys=(1+Math.sqrt(5))/2,qr=1/Ys,Up=[new I(-Ys,qr,0),new I(Ys,qr,0),new I(-qr,0,Ys),new I(qr,0,Ys),new I(0,Ys,-qr),new I(0,Ys,qr),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Hy=new I,Zr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Hy}=r;Su=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),Tu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Op(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Su,bu,Eu),this._renderer.xr.enabled=Tu,t.scissorTest=!1,Il(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Su=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),Tu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:Vr,format:Wn,colorSpace:mn,depthBuffer:!1},s=Fp(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fp(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vy(r)),this._blurMaterial=Gy(r,t,e)}return s}_compileMaterial(t){let e=new he(this._lodPlanes[0],t);this._renderer.compile(e,Mu)}_sceneToCubeUV(t,e,n,s,r){let c=new Ke(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Np),u.toneMapping=Yi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let _=new De({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),m=new he(new as,_),p=!1,S=t.background;S?S.isColor&&(_.color.copy(S),t.background=null,p=!0):(_.color.copy(Np),p=!0);for(let y=0;y<6;y++){let x=y%3;x===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):x===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));let T=this._cubeSize;Il(s,x*T,y>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=S}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Hs||t.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Op());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new he(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Il(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Mu)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Up[(s-r-1)%Up.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new he(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*$s-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):$s;m>$s&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$s}`);let p=[],S=0;for(let A=0;A<$s;++A){let U=A/_,b=Math.exp(-U*U/2);p.push(b),A===0?S+=b:A<m&&(S+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let x=this._sizeLods[s],T=3*x*(s>y-Yr?s-y+Yr:0),w=4*(this._cubeSize-x);Il(e,T,w,3*x,2*x),c.setRenderTarget(e),c.render(u,Mu)}};im=new ln,kp=new Ho(1,1),sm=new Io,rm=new mc,om=new No,zp=[],Hp=[],Vp=new Float32Array(16),Gp=new Float32Array(9),Wp=new Float32Array(4);Au=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gv(e.type)}},Ru=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fv(e.type)}},Cu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},wu=/(\w+)(\])?(\[|\.)?/g;$r=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Ov(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};Bv=37297,kv=0;Yp=new fe;Pl=new I;$v=/^[ \t]*#include +<([\w\d./]+)>/gm;Zv=new Map;jv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;rM=0,Pu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Lu(t),e.set(t,n)),n}},Lu=class{constructor(t){this.id=rM++,this.code=t,this.usedTimes=0}};fM=0;gM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_M=`uniform sampler2D shadow_pass;
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
}`;yM={[Uc]:Fc,[Oc]:zc,[Bc]:Hc,[Ts]:kc,[Fc]:Uc,[zc]:Oc,[Hc]:Bc,[kc]:Ts};bM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,EM=`
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

}`,Du=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Vo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Vn({vertexShader:bM,fragmentShader:EM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new he(new Ds(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nu=class extends mi{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new Du,p={},S=e.getContextAttributes(),y=null,x=null,T=[],w=[],A=new At,U=null,b=new Ke;b.viewport=new Le;let M=new Ke;M.viewport=new Le;let D=[b,M],z=new Nc,k=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let C=T[N];return C===void 0&&(C=new Ir,T[N]=C),C.getTargetRaySpace()},this.getControllerGrip=function(N){let C=T[N];return C===void 0&&(C=new Ir,T[N]=C),C.getGripSpace()},this.getHand=function(N){let C=T[N];return C===void 0&&(C=new Ir,T[N]=C),C.getHandSpace()};function nt(N){let C=w.indexOf(N.inputSource);if(C===-1)return;let W=T[C];W!==void 0&&(W.update(N.inputSource,N.frame,l||o),W.dispatchEvent({type:N.type,data:N.inputSource}))}function Z(){s.removeEventListener("select",nt),s.removeEventListener("selectstart",nt),s.removeEventListener("selectend",nt),s.removeEventListener("squeeze",nt),s.removeEventListener("squeezestart",nt),s.removeEventListener("squeezeend",nt),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",yt);for(let N=0;N<T.length;N++){let C=w[N];C!==null&&(w[N]=null,T[N].disconnect(C))}k=null,K=null,m.reset();for(let N in p)delete p[N];t.setRenderTarget(y),d=null,f=null,u=null,s=null,x=null,at.stop(),n.isPresenting=!1,t.setPixelRatio(U),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){r=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",nt),s.addEventListener("selectstart",nt),s.addEventListener("selectend",nt),s.addEventListener("squeeze",nt),s.addEventListener("squeezestart",nt),s.addEventListener("squeezeend",nt),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",yt),S.xrCompatible!==!0&&await e.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let W=null,gt=null,pt=null;S.depth&&(pt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,W=S.stencil?Wr:Tr,gt=S.stencil?Gr:us);let Lt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Lt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new $n(f.textureWidth,f.textureHeight,{format:Wn,type:ai,depthTexture:new Ho(f.textureWidth,f.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let W={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,W),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new $n(d.framebufferWidth,d.framebufferHeight,{format:Wn,type:ai,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),at.setContext(s),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function yt(N){for(let C=0;C<N.removed.length;C++){let W=N.removed[C],gt=w.indexOf(W);gt>=0&&(w[gt]=null,T[gt].disconnect(W))}for(let C=0;C<N.added.length;C++){let W=N.added[C],gt=w.indexOf(W);if(gt===-1){for(let Lt=0;Lt<T.length;Lt++)if(Lt>=w.length){w.push(W),gt=Lt;break}else if(w[Lt]===null){w[Lt]=W,gt=Lt;break}if(gt===-1)break}let pt=T[gt];pt&&pt.connect(W)}}let J=new I,Tt=new I;function It(N,C,W){J.setFromMatrixPosition(C.matrixWorld),Tt.setFromMatrixPosition(W.matrixWorld);let gt=J.distanceTo(Tt),pt=C.projectionMatrix.elements,Lt=W.projectionMatrix.elements,Kt=pt[14]/(pt[10]-1),P=pt[14]/(pt[10]+1),Vt=(pt[9]+1)/pt[5],St=(pt[9]-1)/pt[5],Ft=(pt[8]-1)/pt[0],Gt=(Lt[8]+1)/Lt[0],we=Kt*Ft,zt=Kt*Gt,$t=gt/(-Ft+Gt),ye=$t*-Ft;if(C.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(ye),N.translateZ($t),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),pt[10]===-1)N.projectionMatrix.copy(C.projectionMatrix),N.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{let ve=Kt+$t,R=P+$t,v=we-ye,Q=zt+(gt-ye),ot=Vt*P/R*ve,ft=St*P/R*ve;N.projectionMatrix.makePerspective(v,Q,ot,ft,ve,R),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function Ot(N,C){C===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(C.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;let C=N.near,W=N.far;m.texture!==null&&(m.depthNear>0&&(C=m.depthNear),m.depthFar>0&&(W=m.depthFar)),z.near=M.near=b.near=C,z.far=M.far=b.far=W,(k!==z.near||K!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),k=z.near,K=z.far),z.layers.mask=N.layers.mask|6,b.layers.mask=z.layers.mask&3,M.layers.mask=z.layers.mask&5;let gt=N.parent,pt=z.cameras;Ot(z,gt);for(let Lt=0;Lt<pt.length;Lt++)Ot(pt[Lt],gt);pt.length===2?It(z,b,M):z.projectionMatrix.copy(b.projectionMatrix),G(N,z,gt)};function G(N,C,W){W===null?N.matrix.copy(C.matrixWorld):(N.matrix.copy(W.matrixWorld),N.matrix.invert(),N.matrix.multiply(C.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(C.projectionMatrix),N.projectionMatrixInverse.copy(C.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=Rs*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(N){c=N,f!==null&&(f.fixedFoveation=N),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=N)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(N){return p[N]};let et=null;function rt(N,C){if(h=C.getViewerPose(l||o),g=C,h!==null){let W=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let gt=!1;W.length!==z.cameras.length&&(z.cameras.length=0,gt=!0);for(let P=0;P<W.length;P++){let Vt=W[P],St=null;if(d!==null)St=d.getViewport(Vt);else{let Gt=u.getViewSubImage(f,Vt);St=Gt.viewport,P===0&&(t.setRenderTargetTextures(x,Gt.colorTexture,Gt.depthStencilTexture),t.setRenderTarget(x))}let Ft=D[P];Ft===void 0&&(Ft=new Ke,Ft.layers.enable(P),Ft.viewport=new Le,D[P]=Ft),Ft.matrix.fromArray(Vt.transform.matrix),Ft.matrix.decompose(Ft.position,Ft.quaternion,Ft.scale),Ft.projectionMatrix.fromArray(Vt.projectionMatrix),Ft.projectionMatrixInverse.copy(Ft.projectionMatrix).invert(),Ft.viewport.set(St.x,St.y,St.width,St.height),P===0&&(z.matrix.copy(Ft.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),gt===!0&&z.cameras.push(Ft)}let pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let P=u.getDepthInformation(W[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(pt&&pt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let P=0;P<W.length;P++){let Vt=W[P].camera;if(Vt){let St=p[Vt];St||(St=new Vo,p[Vt]=St);let Ft=u.getCameraImage(Vt);St.sourceTexture=Ft}}}}for(let W=0;W<T.length;W++){let gt=w[W],pt=T[W];gt!==null&&pt!==void 0&&pt.update(gt,C,l||o)}et&&et(N,C),C.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:C}),g=null}let at=new nm;at.setAnimationLoop(rt),this.setAnimationLoop=function(N){et=N},this.dispose=function(){}}},qs=new Zn,TM=new le;Kr=class{constructor(t={}){let{canvas:e=Sp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,S=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=qe;let w=0,A=0,U=null,b=-1,M=null,D=new Le,z=new Le,k=null,K=new ie(0),nt=0,Z=e.width,yt=e.height,J=1,Tt=null,It=null,Ot=new Le(0,0,Z,yt),G=new Le(0,0,Z,yt),et=!1,rt=new Dr,at=!1,N=!1,C=new le,W=new I,gt=new Le,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Lt=!1;function Kt(){return U===null?J:1}let P=n;function Vt(E,q){return e.getContext(E,q)}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",Y,!1),e.addEventListener("webglcontextrestored",X,!1),e.addEventListener("webglcontextcreationerror",B,!1),P===null){let q="webgl2";if(P=Vt(q,E),P===null)throw Vt(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let St,Ft,Gt,we,zt,$t,ye,ve,R,v,Q,ot,ft,ct,Zt,tt,vt,bt,ht,mt,Ht,qt,Ut,se;function O(){St=new Xy(P),St.init(),qt=new SM(P,St),Ft=new By(P,St,t,qt),Gt=new vM(P,St),Ft.reversedDepthBuffer&&f&&Gt.buffers.depth.setReversed(!0),we=new $y(P),zt=new aM,$t=new MM(P,St,Gt,zt,Ft,qt,we),ye=new zy(x),ve=new Wy(x),R=new t_(P),Ut=new Fy(P,R),v=new qy(P,R,we,Ut),Q=new Ky(P,v,R,we),ht=new Zy(P,Ft,$t),tt=new ky(zt),ot=new oM(x,ye,ve,St,Ft,Ut,tt),ft=new wM(x,zt),ct=new lM,Zt=new mM(St),bt=new Uy(x,ye,ve,Gt,Q,d,c),vt=new xM(x,Q,Ft),se=new AM(P,we,Ft,Gt),mt=new Oy(P,St,we),Ht=new Yy(P,St,we),we.programs=ot.programs,x.capabilities=Ft,x.extensions=St,x.properties=zt,x.renderLists=ct,x.shadowMap=vt,x.state=Gt,x.info=we}O();let L=new Nu(x,P);this.xr=L,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let E=St.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=St.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(E){E!==void 0&&(J=E,this.setSize(Z,yt,!1))},this.getSize=function(E){return E.set(Z,yt)},this.setSize=function(E,q,st=!0){if(L.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=E,yt=q,e.width=Math.floor(E*J),e.height=Math.floor(q*J),st===!0&&(e.style.width=E+"px",e.style.height=q+"px"),this.setViewport(0,0,E,q)},this.getDrawingBufferSize=function(E){return E.set(Z*J,yt*J).floor()},this.setDrawingBufferSize=function(E,q,st){Z=E,yt=q,J=st,e.width=Math.floor(E*st),e.height=Math.floor(q*st),this.setViewport(0,0,E,q)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(Ot)},this.setViewport=function(E,q,st,H){E.isVector4?Ot.set(E.x,E.y,E.z,E.w):Ot.set(E,q,st,H),Gt.viewport(D.copy(Ot).multiplyScalar(J).round())},this.getScissor=function(E){return E.copy(G)},this.setScissor=function(E,q,st,H){E.isVector4?G.set(E.x,E.y,E.z,E.w):G.set(E,q,st,H),Gt.scissor(z.copy(G).multiplyScalar(J).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(E){Gt.setScissorTest(et=E)},this.setOpaqueSort=function(E){Tt=E},this.setTransparentSort=function(E){It=E},this.getClearColor=function(E){return E.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(E=!0,q=!0,st=!0){let H=0;if(E){let $=!1;if(U!==null){let _t=U.texture.format;$=_t===Qc||_t===Jc||_t===jc}if($){let _t=U.texture.type,Nt=_t===ai||_t===us||_t===Hr||_t===Gr||_t===$c||_t===Zc,Yt=bt.getClearColor(),Xt=bt.getClearAlpha(),re=Yt.r,ee=Yt.g,Jt=Yt.b;Nt?(g[0]=re,g[1]=ee,g[2]=Jt,g[3]=Xt,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=re,_[1]=ee,_[2]=Jt,_[3]=Xt,P.clearBufferiv(P.COLOR,0,_))}else H|=P.COLOR_BUFFER_BIT}q&&(H|=P.DEPTH_BUFFER_BIT),st&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Y,!1),e.removeEventListener("webglcontextrestored",X,!1),e.removeEventListener("webglcontextcreationerror",B,!1),bt.dispose(),ct.dispose(),Zt.dispose(),zt.dispose(),ye.dispose(),ve.dispose(),Q.dispose(),Ut.dispose(),se.dispose(),ot.dispose(),L.dispose(),L.removeEventListener("sessionstart",ae),L.removeEventListener("sessionend",de),Bt.stop()};function Y(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function X(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let E=we.autoReset,q=vt.enabled,st=vt.autoUpdate,H=vt.needsUpdate,$=vt.type;O(),we.autoReset=E,vt.enabled=q,vt.autoUpdate=st,vt.needsUpdate=H,vt.type=$}function B(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function F(E){let q=E.target;q.removeEventListener("dispose",F),it(q)}function it(E){ut(E),zt.remove(E)}function ut(E){let q=zt.get(E).programs;q!==void 0&&(q.forEach(function(st){ot.releaseProgram(st)}),E.isShaderMaterial&&ot.releaseShaderCache(E))}this.renderBufferDirect=function(E,q,st,H,$,_t){q===null&&(q=pt);let Nt=$.isMesh&&$.matrixWorld.determinant()<0,Yt=wi(E,q,st,H,$);Gt.setMaterial(H,Nt);let Xt=st.index,re=1;if(H.wireframe===!0){if(Xt=v.getWireframeAttribute(st),Xt===void 0)return;re=2}let ee=st.drawRange,Jt=st.attributes.position,ue=ee.start*re,Pe=(ee.start+ee.count)*re;_t!==null&&(ue=Math.max(ue,_t.start*re),Pe=Math.min(Pe,(_t.start+_t.count)*re)),Xt!==null?(ue=Math.max(ue,0),Pe=Math.min(Pe,Xt.count)):Jt!=null&&(ue=Math.max(ue,0),Pe=Math.min(Pe,Jt.count));let We=Pe-ue;if(We<0||We===1/0)return;Ut.setup($,H,Yt,st,Xt);let ze,Me=mt;if(Xt!==null&&(ze=R.get(Xt),Me=Ht,Me.setIndex(ze)),$.isMesh)H.wireframe===!0?(Gt.setLineWidth(H.wireframeLinewidth*Kt()),Me.setMode(P.LINES)):Me.setMode(P.TRIANGLES);else if($.isLine){let Qt=H.linewidth;Qt===void 0&&(Qt=1),Gt.setLineWidth(Qt*Kt()),$.isLineSegments?Me.setMode(P.LINES):$.isLineLoop?Me.setMode(P.LINE_LOOP):Me.setMode(P.LINE_STRIP)}else $.isPoints?Me.setMode(P.POINTS):$.isSprite&&Me.setMode(P.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)Ar("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Me.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(St.get("WEBGL_multi_draw"))Me.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Qt=$._multiDrawStarts,He=$._multiDrawCounts,ge=$._multiDrawCount,xn=Xt?R.get(Xt).bytesPerElement:1,V=zt.get(H).currentProgram.getUniforms();for(let j=0;j<ge;j++)V.setValue(P,"_gl_DrawID",j),Me.render(Qt[j]/xn,He[j])}else if($.isInstancedMesh)Me.renderInstances(ue,We,$.count);else if(st.isInstancedBufferGeometry){let Qt=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,He=Math.min(st.instanceCount,Qt);Me.renderInstances(ue,We,He)}else Me.render(ue,We)};function Wt(E,q,st){E.transparent===!0&&E.side===Ce&&E.forceSinglePass===!1?(E.side=gn,E.needsUpdate=!0,sn(E,q,st),E.side=si,E.needsUpdate=!0,sn(E,q,st),E.side=Ce):sn(E,q,st)}this.compile=function(E,q,st=null){st===null&&(st=E),p=Zt.get(st),p.init(q),y.push(p),st.traverseVisible(function($){$.isLight&&$.layers.test(q.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),E!==st&&E.traverseVisible(function($){$.isLight&&$.layers.test(q.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),p.setupLights();let H=new Set;return E.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let _t=$.material;if(_t)if(Array.isArray(_t))for(let Nt=0;Nt<_t.length;Nt++){let Yt=_t[Nt];Wt(Yt,st,$),H.add(Yt)}else Wt(_t,st,$),H.add(_t)}),p=y.pop(),H},this.compileAsync=function(E,q,st=null){let H=this.compile(E,q,st);return new Promise($=>{function _t(){if(H.forEach(function(Nt){zt.get(Nt).currentProgram.isReady()&&H.delete(Nt)}),H.size===0){$(E);return}setTimeout(_t,10)}St.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let Dt=null;function jt(E){Dt&&Dt(E)}function ae(){Bt.stop()}function de(){Bt.start()}let Bt=new nm;Bt.setAnimationLoop(jt),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(E){Dt=E,L.setAnimationLoop(E),E===null?Bt.stop():Bt.start()},L.addEventListener("sessionstart",ae),L.addEventListener("sessionend",de),this.render=function(E,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),L.enabled===!0&&L.isPresenting===!0&&(L.cameraAutoUpdate===!0&&L.updateCamera(q),q=L.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,q,U),p=Zt.get(E,y.length),p.init(q),y.push(p),C.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),rt.setFromProjectionMatrix(C,ii,q.reversedDepth),N=this.localClippingEnabled,at=tt.init(this.clippingPlanes,N),m=ct.get(E,S.length),m.init(),S.push(m),L.enabled===!0&&L.isPresenting===!0){let _t=x.xr.getDepthSensingMesh();_t!==null&&te(_t,q,-1/0,x.sortObjects)}te(E,q,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Tt,It),Lt=L.enabled===!1||L.isPresenting===!1||L.hasDepthSensing()===!1,Lt&&bt.addToRenderList(m,E),this.info.render.frame++,at===!0&&tt.beginShadows();let st=p.state.shadowsArray;vt.render(st,E,q),at===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=m.opaque,$=m.transmissive;if(p.setupLights(),q.isArrayCamera){let _t=q.cameras;if($.length>0)for(let Nt=0,Yt=_t.length;Nt<Yt;Nt++){let Xt=_t[Nt];Ae(H,$,E,Xt)}Lt&&bt.render(E);for(let Nt=0,Yt=_t.length;Nt<Yt;Nt++){let Xt=_t[Nt];Ie(m,E,Xt,Xt.viewport)}}else $.length>0&&Ae(H,$,E,q),Lt&&bt.render(E),Ie(m,E,q);U!==null&&A===0&&($t.updateMultisampleRenderTarget(U),$t.updateRenderTargetMipmap(U)),E.isScene===!0&&E.onAfterRender(x,E,q),Ut.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],at===!0&&tt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function te(E,q,st,H){if(E.visible===!1)return;if(E.layers.test(q.layers)){if(E.isGroup)st=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(q);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||rt.intersectsSprite(E)){H&&gt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(C);let Nt=Q.update(E),Yt=E.material;Yt.visible&&m.push(E,Nt,Yt,st,gt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||rt.intersectsObject(E))){let Nt=Q.update(E),Yt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),gt.copy(E.boundingSphere.center)):(Nt.boundingSphere===null&&Nt.computeBoundingSphere(),gt.copy(Nt.boundingSphere.center)),gt.applyMatrix4(E.matrixWorld).applyMatrix4(C)),Array.isArray(Yt)){let Xt=Nt.groups;for(let re=0,ee=Xt.length;re<ee;re++){let Jt=Xt[re],ue=Yt[Jt.materialIndex];ue&&ue.visible&&m.push(E,Nt,ue,st,gt.z,Jt)}}else Yt.visible&&m.push(E,Nt,Yt,st,gt.z,null)}}let _t=E.children;for(let Nt=0,Yt=_t.length;Nt<Yt;Nt++)te(_t[Nt],q,st,H)}function Ie(E,q,st,H){let $=E.opaque,_t=E.transmissive,Nt=E.transparent;p.setupLightsView(st),at===!0&&tt.setGlobalState(x.clippingPlanes,st),H&&Gt.viewport(D.copy(H)),$.length>0&&Ne($,q,st),_t.length>0&&Ne(_t,q,st),Nt.length>0&&Ne(Nt,q,st),Gt.buffers.depth.setTest(!0),Gt.buffers.depth.setMask(!0),Gt.buffers.color.setMask(!0),Gt.setPolygonOffset(!1)}function Ae(E,q,st,H){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new $n(1,1,{generateMipmaps:!0,type:St.has("EXT_color_buffer_half_float")||St.has("EXT_color_buffer_float")?Vr:ai,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:be.workingColorSpace}));let _t=p.state.transmissionRenderTarget[H.id],Nt=H.viewport||D;_t.setSize(Nt.z*x.transmissionResolutionScale,Nt.w*x.transmissionResolutionScale);let Yt=x.getRenderTarget(),Xt=x.getActiveCubeFace(),re=x.getActiveMipmapLevel();x.setRenderTarget(_t),x.getClearColor(K),nt=x.getClearAlpha(),nt<1&&x.setClearColor(16777215,.5),x.clear(),Lt&&bt.render(st);let ee=x.toneMapping;x.toneMapping=Yi;let Jt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),at===!0&&tt.setGlobalState(x.clippingPlanes,H),Ne(E,st,H),$t.updateMultisampleRenderTarget(_t),$t.updateRenderTargetMipmap(_t),St.has("WEBGL_multisampled_render_to_texture")===!1){let ue=!1;for(let Pe=0,We=q.length;Pe<We;Pe++){let ze=q[Pe],Me=ze.object,Qt=ze.geometry,He=ze.material,ge=ze.group;if(He.side===Ce&&Me.layers.test(H.layers)){let xn=He.side;He.side=gn,He.needsUpdate=!0,_e(Me,st,H,Qt,He,ge),He.side=xn,He.needsUpdate=!0,ue=!0}}ue===!0&&($t.updateMultisampleRenderTarget(_t),$t.updateRenderTargetMipmap(_t))}x.setRenderTarget(Yt,Xt,re),x.setClearColor(K,nt),Jt!==void 0&&(H.viewport=Jt),x.toneMapping=ee}function Ne(E,q,st){let H=q.isScene===!0?q.overrideMaterial:null;for(let $=0,_t=E.length;$<_t;$++){let Nt=E[$],Yt=Nt.object,Xt=Nt.geometry,re=Nt.group,ee=Nt.material;ee.allowOverride===!0&&H!==null&&(ee=H),Yt.layers.test(st.layers)&&_e(Yt,q,st,Xt,ee,re)}}function _e(E,q,st,H,$,_t){E.onBeforeRender(x,q,st,H,$,_t),E.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),$.onBeforeRender(x,q,st,H,E,_t),$.transparent===!0&&$.side===Ce&&$.forceSinglePass===!1?($.side=gn,$.needsUpdate=!0,x.renderBufferDirect(st,q,H,$,E,_t),$.side=si,$.needsUpdate=!0,x.renderBufferDirect(st,q,H,$,E,_t),$.side=Ce):x.renderBufferDirect(st,q,H,$,E,_t),E.onAfterRender(x,q,st,H,$,_t)}function sn(E,q,st){q.isScene!==!0&&(q=pt);let H=zt.get(E),$=p.state.lights,_t=p.state.shadowsArray,Nt=$.state.version,Yt=ot.getParameters(E,$.state,_t,q,st),Xt=ot.getProgramCacheKey(Yt),re=H.programs;H.environment=E.isMeshStandardMaterial?q.environment:null,H.fog=q.fog,H.envMap=(E.isMeshStandardMaterial?ve:ye).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?q.environmentRotation:E.envMapRotation,re===void 0&&(E.addEventListener("dispose",F),re=new Map,H.programs=re);let ee=re.get(Xt);if(ee!==void 0){if(H.currentProgram===ee&&H.lightsStateVersion===Nt)return ce(E,Yt),ee}else Yt.uniforms=ot.getUniforms(E),E.onBeforeCompile(Yt,x),ee=ot.acquireProgram(Yt,Xt),re.set(Xt,ee),H.uniforms=Yt.uniforms;let Jt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Jt.clippingPlanes=tt.uniform),ce(E,Yt),H.needsLights=li(E),H.lightsStateVersion=Nt,H.needsLights&&(Jt.ambientLightColor.value=$.state.ambient,Jt.lightProbe.value=$.state.probe,Jt.directionalLights.value=$.state.directional,Jt.directionalLightShadows.value=$.state.directionalShadow,Jt.spotLights.value=$.state.spot,Jt.spotLightShadows.value=$.state.spotShadow,Jt.rectAreaLights.value=$.state.rectArea,Jt.ltc_1.value=$.state.rectAreaLTC1,Jt.ltc_2.value=$.state.rectAreaLTC2,Jt.pointLights.value=$.state.point,Jt.pointLightShadows.value=$.state.pointShadow,Jt.hemisphereLights.value=$.state.hemi,Jt.directionalShadowMap.value=$.state.directionalShadowMap,Jt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Jt.spotShadowMap.value=$.state.spotShadowMap,Jt.spotLightMatrix.value=$.state.spotLightMatrix,Jt.spotLightMap.value=$.state.spotLightMap,Jt.pointShadowMap.value=$.state.pointShadowMap,Jt.pointShadowMatrix.value=$.state.pointShadowMatrix),H.currentProgram=ee,H.uniformsList=null,ee}function Ln(E){if(E.uniformsList===null){let q=E.currentProgram.getUniforms();E.uniformsList=$r.seqWithValue(q.seq,E.uniforms)}return E.uniformsList}function ce(E,q){let st=zt.get(E);st.outputColorSpace=q.outputColorSpace,st.batching=q.batching,st.batchingColor=q.batchingColor,st.instancing=q.instancing,st.instancingColor=q.instancingColor,st.instancingMorph=q.instancingMorph,st.skinning=q.skinning,st.morphTargets=q.morphTargets,st.morphNormals=q.morphNormals,st.morphColors=q.morphColors,st.morphTargetsCount=q.morphTargetsCount,st.numClippingPlanes=q.numClippingPlanes,st.numIntersection=q.numClipIntersection,st.vertexAlphas=q.vertexAlphas,st.vertexTangents=q.vertexTangents,st.toneMapping=q.toneMapping}function wi(E,q,st,H,$){q.isScene!==!0&&(q=pt),$t.resetTextureUnits();let _t=q.fog,Nt=H.isMeshStandardMaterial?q.environment:null,Yt=U===null?x.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:mn,Xt=(H.isMeshStandardMaterial?ve:ye).get(H.envMap||Nt),re=H.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,ee=!!st.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Jt=!!st.morphAttributes.position,ue=!!st.morphAttributes.normal,Pe=!!st.morphAttributes.color,We=Yi;H.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(We=x.toneMapping);let ze=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,Me=ze!==void 0?ze.length:0,Qt=zt.get(H),He=p.state.lights;if(at===!0&&(N===!0||E!==M)){let lt=E===M&&H.id===b;tt.setState(H,E,lt)}let ge=!1;H.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==He.state.version||Qt.outputColorSpace!==Yt||$.isBatchedMesh&&Qt.batching===!1||!$.isBatchedMesh&&Qt.batching===!0||$.isBatchedMesh&&Qt.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Qt.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Qt.instancing===!1||!$.isInstancedMesh&&Qt.instancing===!0||$.isSkinnedMesh&&Qt.skinning===!1||!$.isSkinnedMesh&&Qt.skinning===!0||$.isInstancedMesh&&Qt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Qt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Qt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Qt.instancingMorph===!1&&$.morphTexture!==null||Qt.envMap!==Xt||H.fog===!0&&Qt.fog!==_t||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==tt.numPlanes||Qt.numIntersection!==tt.numIntersection)||Qt.vertexAlphas!==re||Qt.vertexTangents!==ee||Qt.morphTargets!==Jt||Qt.morphNormals!==ue||Qt.morphColors!==Pe||Qt.toneMapping!==We||Qt.morphTargetsCount!==Me)&&(ge=!0):(ge=!0,Qt.__version=H.version);let xn=Qt.currentProgram;ge===!0&&(xn=sn(H,q,$));let V=!1,j=!1,xt=!1,dt=xn.getUniforms(),Et=Qt.uniforms;if(Gt.useProgram(xn.program)&&(V=!0,j=!0,xt=!0),H.id!==b&&(b=H.id,j=!0),V||M!==E){Gt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),dt.setValue(P,"projectionMatrix",E.projectionMatrix),dt.setValue(P,"viewMatrix",E.matrixWorldInverse);let Mt=dt.map.cameraPosition;Mt!==void 0&&Mt.setValue(P,W.setFromMatrixPosition(E.matrixWorld)),Ft.logarithmicDepthBuffer&&dt.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&dt.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,j=!0,xt=!0)}if($.isSkinnedMesh){dt.setOptional(P,$,"bindMatrix"),dt.setOptional(P,$,"bindMatrixInverse");let lt=$.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),dt.setValue(P,"boneTexture",lt.boneTexture,$t))}$.isBatchedMesh&&(dt.setOptional(P,$,"batchingTexture"),dt.setValue(P,"batchingTexture",$._matricesTexture,$t),dt.setOptional(P,$,"batchingIdTexture"),dt.setValue(P,"batchingIdTexture",$._indirectTexture,$t),dt.setOptional(P,$,"batchingColorTexture"),$._colorsTexture!==null&&dt.setValue(P,"batchingColorTexture",$._colorsTexture,$t));let wt=st.morphAttributes;if((wt.position!==void 0||wt.normal!==void 0||wt.color!==void 0)&&ht.update($,st,xn),(j||Qt.receiveShadow!==$.receiveShadow)&&(Qt.receiveShadow=$.receiveShadow,dt.setValue(P,"receiveShadow",$.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Et.envMap.value=Xt,Et.flipEnvMap.value=Xt.isCubeTexture&&Xt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&q.environment!==null&&(Et.envMapIntensity.value=q.environmentIntensity),j&&(dt.setValue(P,"toneMappingExposure",x.toneMappingExposure),Qt.needsLights&&rn(Et,xt),_t&&H.fog===!0&&ft.refreshFogUniforms(Et,_t),ft.refreshMaterialUniforms(Et,H,J,yt,p.state.transmissionRenderTarget[E.id]),$r.upload(P,Ln(Qt),Et,$t)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&($r.upload(P,Ln(Qt),Et,$t),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&dt.setValue(P,"center",$.center),dt.setValue(P,"modelViewMatrix",$.modelViewMatrix),dt.setValue(P,"normalMatrix",$.normalMatrix),dt.setValue(P,"modelMatrix",$.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let lt=H.uniformsGroups;for(let Mt=0,Pt=lt.length;Mt<Pt;Mt++){let ne=lt[Mt];se.update(ne,xn),se.bind(ne,xn)}}return xn}function rn(E,q){E.ambientLightColor.needsUpdate=q,E.lightProbe.needsUpdate=q,E.directionalLights.needsUpdate=q,E.directionalLightShadows.needsUpdate=q,E.pointLights.needsUpdate=q,E.pointLightShadows.needsUpdate=q,E.spotLights.needsUpdate=q,E.spotLightShadows.needsUpdate=q,E.rectAreaLights.needsUpdate=q,E.hemisphereLights.needsUpdate=q}function li(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,q,st){let H=zt.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),zt.get(E.texture).__webglTexture=q,zt.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:st,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,q){let st=zt.get(E);st.__webglFramebuffer=q,st.__useDefaultFramebuffer=q===void 0};let hi=P.createFramebuffer();this.setRenderTarget=function(E,q=0,st=0){U=E,w=q,A=st;let H=!0,$=null,_t=!1,Nt=!1;if(E){let Xt=zt.get(E);if(Xt.__useDefaultFramebuffer!==void 0)Gt.bindFramebuffer(P.FRAMEBUFFER,null),H=!1;else if(Xt.__webglFramebuffer===void 0)$t.setupRenderTarget(E);else if(Xt.__hasExternalTextures)$t.rebindTextures(E,zt.get(E.texture).__webglTexture,zt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Jt=E.depthTexture;if(Xt.__boundDepthTexture!==Jt){if(Jt!==null&&zt.has(Jt)&&(E.width!==Jt.image.width||E.height!==Jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$t.setupDepthRenderbuffer(E)}}let re=E.texture;(re.isData3DTexture||re.isDataArrayTexture||re.isCompressedArrayTexture)&&(Nt=!0);let ee=zt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ee[q])?$=ee[q][st]:$=ee[q],_t=!0):E.samples>0&&$t.useMultisampledRTT(E)===!1?$=zt.get(E).__webglMultisampledFramebuffer:Array.isArray(ee)?$=ee[st]:$=ee,D.copy(E.viewport),z.copy(E.scissor),k=E.scissorTest}else D.copy(Ot).multiplyScalar(J).floor(),z.copy(G).multiplyScalar(J).floor(),k=et;if(st!==0&&($=hi),Gt.bindFramebuffer(P.FRAMEBUFFER,$)&&H&&Gt.drawBuffers(E,$),Gt.viewport(D),Gt.scissor(z),Gt.setScissorTest(k),_t){let Xt=zt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+q,Xt.__webglTexture,st)}else if(Nt){let Xt=q;for(let re=0;re<E.textures.length;re++){let ee=zt.get(E.textures[re]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+re,ee.__webglTexture,st,Xt)}}else if(E!==null&&st!==0){let Xt=zt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Xt.__webglTexture,st)}b=-1},this.readRenderTargetPixels=function(E,q,st,H,$,_t,Nt,Yt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xt=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Nt!==void 0&&(Xt=Xt[Nt]),Xt){Gt.bindFramebuffer(P.FRAMEBUFFER,Xt);try{let re=E.textures[Yt],ee=re.format,Jt=re.type;if(!Ft.textureFormatReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ft.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=E.width-H&&st>=0&&st<=E.height-$&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Yt),P.readPixels(q,st,H,$,qt.convert(ee),qt.convert(Jt),_t))}finally{let re=U!==null?zt.get(U).__webglFramebuffer:null;Gt.bindFramebuffer(P.FRAMEBUFFER,re)}}},this.readRenderTargetPixelsAsync=async function(E,q,st,H,$,_t,Nt,Yt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xt=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Nt!==void 0&&(Xt=Xt[Nt]),Xt)if(q>=0&&q<=E.width-H&&st>=0&&st<=E.height-$){Gt.bindFramebuffer(P.FRAMEBUFFER,Xt);let re=E.textures[Yt],ee=re.format,Jt=re.type;if(!Ft.textureFormatReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ft.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ue=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,ue),P.bufferData(P.PIXEL_PACK_BUFFER,_t.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Yt),P.readPixels(q,st,H,$,qt.convert(ee),qt.convert(Jt),0);let Pe=U!==null?zt.get(U).__webglFramebuffer:null;Gt.bindFramebuffer(P.FRAMEBUFFER,Pe);let We=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await bp(P,We,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,ue),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,_t),P.deleteBuffer(ue),P.deleteSync(We),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,q=null,st=0){let H=Math.pow(2,-st),$=Math.floor(E.image.width*H),_t=Math.floor(E.image.height*H),Nt=q!==null?q.x:0,Yt=q!==null?q.y:0;$t.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,st,0,0,Nt,Yt,$,_t),Gt.unbindTexture()};let Ai=P.createFramebuffer(),ui=P.createFramebuffer();this.copyTextureToTexture=function(E,q,st=null,H=null,$=0,_t=null){_t===null&&($!==0?(Ar("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),_t=$,$=0):_t=0);let Nt,Yt,Xt,re,ee,Jt,ue,Pe,We,ze=E.isCompressedTexture?E.mipmaps[_t]:E.image;if(st!==null)Nt=st.max.x-st.min.x,Yt=st.max.y-st.min.y,Xt=st.isBox3?st.max.z-st.min.z:1,re=st.min.x,ee=st.min.y,Jt=st.isBox3?st.min.z:0;else{let wt=Math.pow(2,-$);Nt=Math.floor(ze.width*wt),Yt=Math.floor(ze.height*wt),E.isDataArrayTexture?Xt=ze.depth:E.isData3DTexture?Xt=Math.floor(ze.depth*wt):Xt=1,re=0,ee=0,Jt=0}H!==null?(ue=H.x,Pe=H.y,We=H.z):(ue=0,Pe=0,We=0);let Me=qt.convert(q.format),Qt=qt.convert(q.type),He;q.isData3DTexture?($t.setTexture3D(q,0),He=P.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?($t.setTexture2DArray(q,0),He=P.TEXTURE_2D_ARRAY):($t.setTexture2D(q,0),He=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,q.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,q.unpackAlignment);let ge=P.getParameter(P.UNPACK_ROW_LENGTH),xn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),V=P.getParameter(P.UNPACK_SKIP_PIXELS),j=P.getParameter(P.UNPACK_SKIP_ROWS),xt=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ze.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ze.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,re),P.pixelStorei(P.UNPACK_SKIP_ROWS,ee),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Jt);let dt=E.isDataArrayTexture||E.isData3DTexture,Et=q.isDataArrayTexture||q.isData3DTexture;if(E.isDepthTexture){let wt=zt.get(E),lt=zt.get(q),Mt=zt.get(wt.__renderTarget),Pt=zt.get(lt.__renderTarget);Gt.bindFramebuffer(P.READ_FRAMEBUFFER,Mt.__webglFramebuffer),Gt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let ne=0;ne<Xt;ne++)dt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,zt.get(E).__webglTexture,$,Jt+ne),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,zt.get(q).__webglTexture,_t,We+ne)),P.blitFramebuffer(re,ee,Nt,Yt,ue,Pe,Nt,Yt,P.DEPTH_BUFFER_BIT,P.NEAREST);Gt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Gt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if($!==0||E.isRenderTargetTexture||zt.has(E)){let wt=zt.get(E),lt=zt.get(q);Gt.bindFramebuffer(P.READ_FRAMEBUFFER,Ai),Gt.bindFramebuffer(P.DRAW_FRAMEBUFFER,ui);for(let Mt=0;Mt<Xt;Mt++)dt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,wt.__webglTexture,$,Jt+Mt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,wt.__webglTexture,$),Et?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,lt.__webglTexture,_t,We+Mt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,lt.__webglTexture,_t),$!==0?P.blitFramebuffer(re,ee,Nt,Yt,ue,Pe,Nt,Yt,P.COLOR_BUFFER_BIT,P.NEAREST):Et?P.copyTexSubImage3D(He,_t,ue,Pe,We+Mt,re,ee,Nt,Yt):P.copyTexSubImage2D(He,_t,ue,Pe,re,ee,Nt,Yt);Gt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Gt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Et?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(He,_t,ue,Pe,We,Nt,Yt,Xt,Me,Qt,ze.data):q.isCompressedArrayTexture?P.compressedTexSubImage3D(He,_t,ue,Pe,We,Nt,Yt,Xt,Me,ze.data):P.texSubImage3D(He,_t,ue,Pe,We,Nt,Yt,Xt,Me,Qt,ze):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,_t,ue,Pe,Nt,Yt,Me,Qt,ze.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,_t,ue,Pe,ze.width,ze.height,Me,ze.data):P.texSubImage2D(P.TEXTURE_2D,_t,ue,Pe,Nt,Yt,Me,Qt,ze);P.pixelStorei(P.UNPACK_ROW_LENGTH,ge),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,xn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,V),P.pixelStorei(P.UNPACK_SKIP_ROWS,j),P.pixelStorei(P.UNPACK_SKIP_IMAGES,xt),_t===0&&q.generateMipmaps&&P.generateMipmap(He),Gt.unbindTexture()},this.initRenderTarget=function(E){zt.get(E).__webglFramebuffer===void 0&&$t.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?$t.setTextureCube(E,0):E.isData3DTexture?$t.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?$t.setTexture2DArray(E,0):$t.setTexture2D(E,0),Gt.unbindTexture()},this.resetState=function(){w=0,A=0,U=null,Gt.reset(),Ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=be._getDrawingBufferColorSpace(t),e.unpackColorSpace=be._getUnpackColorSpace()}}});function CM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function IM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function PM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(lm),this.state=ke.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function LM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Pn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ke.DOLLY;break;case Pn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ke.ROTATE}break;case Pn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(Ou)}function DM(i){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function NM(i){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(i.preventDefault(),this.dispatchEvent(Ou),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(lm))}function UM(i){this.enabled!==!1&&this._handleKeyDown(i)}function FM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case En.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ke.TOUCH_ROTATE;break;case En.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case En.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ke.TOUCH_DOLLY_PAN;break;case En.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(Ou)}function OM(i){switch(this._trackPointer(i),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ke.NONE}}function BM(i){this.enabled!==!1&&i.preventDefault()}function kM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var am,Ou,lm,Dl,cm,RM,fn,Bn,ke,Fu,Nl,hm=Qe(()=>{jn();am={type:"change"},Ou={type:"start"},lm={type:"end"},Dl=new gi,cm=new Nn,RM=Math.cos(70*Zi.DEG2RAD),fn=new I,Bn=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fu=1e-6,Nl=class extends aa{constructor(t,e=null){super(t,e),this.state=ke.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Pn.ROTATE,MIDDLE:Pn.DOLLY,RIGHT:Pn.PAN},this.touches={ONE:En.ROTATE,TWO:En.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new Cn,this._lastTargetPosition=new I,this._quat=new Cn().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new kr,this._sphericalDelta=new kr,this._scale=1,this._panOffset=new I,this._rotateStart=new At,this._rotateEnd=new At,this._rotateDelta=new At,this._panStart=new At,this._panEnd=new At,this._panDelta=new At,this._dollyStart=new At,this._dollyEnd=new At,this._dollyDelta=new At,this._dollyDirection=new I,this._mouse=new At,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=IM.bind(this),this._onPointerDown=CM.bind(this),this._onPointerUp=PM.bind(this),this._onContextMenu=BM.bind(this),this._onMouseWheel=NM.bind(this),this._onKeyDown=UM.bind(this),this._onTouchStart=FM.bind(this),this._onTouchMove=OM.bind(this),this._onMouseDown=LM.bind(this),this._onMouseMove=DM.bind(this),this._interceptControlDown=kM.bind(this),this._interceptControlUp=zM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(am),this.update(),this.state=ke.NONE}update(t=null){let e=this.object.position;fn.copy(e).sub(this.target),fn.applyQuaternion(this._quat),this._spherical.setFromVector3(fn),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Bn:n>Math.PI&&(n-=Bn),s<-Math.PI?s+=Bn:s>Math.PI&&(s-=Bn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(fn.setFromSpherical(this._spherical),fn.applyQuaternion(this._quatInverse),e.copy(this.target).add(fn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=fn.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=fn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Dl.origin.copy(this.object.position),Dl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Dl.direction))<RM?this.object.lookAt(this.target):(cm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Dl.intersectPlane(cm,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fu||this._lastTargetPosition.distanceToSquared(this.target)>Fu?(this.dispatchEvent(am),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Bn/60*this.autoRotateSpeed*t:Bn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){fn.setFromMatrixColumn(e,0),fn.multiplyScalar(-t),this._panOffset.add(fn)}_panUp(t,e){this.screenSpacePanning===!0?fn.setFromMatrixColumn(e,1):(fn.setFromMatrixColumn(e,0),fn.crossVectors(this.object.up,fn)),fn.multiplyScalar(t),this._panOffset.add(fn)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;fn.copy(s).sub(this.target);let r=fn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new At,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}});var Ul,um=Qe(()=>{jn();hm();Ul=class extends Nl{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:Pn.PAN,MIDDLE:Pn.DOLLY,RIGHT:Pn.ROTATE},this.touches={ONE:En.PAN,TWO:En.DOLLY_ROTATE}}}});function dm(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Be,l=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=fm(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][f]);let g=fm(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function fm(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ge(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let _=h.getComponent(f,g);a.setComponent(f+u,g,_)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Bu(i,t){if(t===hu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Xr||t===da){let e=i.getIndex();if(e===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=e.count-2,s=[];if(t===Xr)for(let o=1;o<=n;o++)s.push(e.getX(0)),s.push(e.getX(o)),s.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(e.getX(o)),s.push(e.getX(o+1)),s.push(e.getX(o+2))):(s.push(e.getX(o+2)),s.push(e.getX(o+1)),s.push(e.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}var ku=Qe(()=>{jn()});function HM(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}function WM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new bn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:si})),i.DefaultMaterial}function Zs(i,t,e){for(let n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Ei(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function XM(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,h=t.length;l<h;l++){let u=t[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=t.length;l<h;l++){let u=t[l];if(n){let f=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function qM(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){let e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function YM(i){let t,e=i.extensions&&i.extensions[xe.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Vu(e.attributes):t=i.indices+":"+Vu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+Vu(i.targets[n]);return t}function Vu(i){let t="",e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function pf(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function $M(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}function KM(i,t,e){let n=t.attributes,s=new In;if(n.POSITION!==void 0){let a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new I(c[0],c[1],c[2]),new I(l[0],l[1],l[2])),a.normalized){let h=pf(Jr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=t.targets;if(r!==void 0){let a=new I,c=new I;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=e.json.accessors[u.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let _=pf(Jr[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Un;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function _m(i,t,e){let n=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=df[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(t.indices!==void 0&&!i.index){let o=e.getDependency("accessor",t.indices).then(function(a){i.setIndex(a)});s.push(o)}return be.workingColorSpace!==mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${be.workingColorSpace}" not supported.`),Ei(i,t),KM(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?XM(i,t.targets,e):i})}var Fl,xe,Gu,Wu,Xu,qu,Yu,$u,Zu,Ku,ju,Ju,Qu,tf,ef,nf,sf,rf,of,af,xm,ga,pm,cf,lf,hf,uf,Ol,VM,ff,Jn,Jr,mm,gm,zu,df,fs,GM,Hu,ZM,mf,ym=Qe(()=>{jn();ku();Fl=class extends Mi{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new qu(e)}),this.register(function(e){return new Yu(e)}),this.register(function(e){return new nf(e)}),this.register(function(e){return new sf(e)}),this.register(function(e){return new rf(e)}),this.register(function(e){return new Zu(e)}),this.register(function(e){return new Ku(e)}),this.register(function(e){return new ju(e)}),this.register(function(e){return new Ju(e)}),this.register(function(e){return new Xu(e)}),this.register(function(e){return new Qu(e)}),this.register(function(e){return new $u(e)}),this.register(function(e){return new ef(e)}),this.register(function(e){return new tf(e)}),this.register(function(e){return new Gu(e)}),this.register(function(e){return new of(e)}),this.register(function(e){return new af(e)})}load(t,e,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Xi.extractUrlBase(t);o=Xi.resolveURL(l,this.path)}else o=Xi.extractUrlBase(t);this.manager.itemStart(t);let a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new Br(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(h){e(h),r.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r,o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===xm){try{o[xe.KHR_BINARY_GLTF]=new cf(t)}catch(u){s&&s(u);return}r=JSON.parse(o[xe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new mf(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case xe.KHR_MATERIALS_UNLIT:o[u]=new Wu;break;case xe.KHR_DRACO_MESH_COMPRESSION:o[u]=new lf(r,this.dracoLoader);break;case xe.KHR_TEXTURE_TRANSFORM:o[u]=new hf;break;case xe.KHR_MESH_QUANTIZATION:o[u]=new uf;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}};xe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Gu=class{constructor(t){this.parser=t,this.name=xe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){let r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){let e=this.parser,n="light:"+t,s=e.cache.get(n);if(s)return s;let r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t],l,h=new ie(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],mn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new zs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ks(h),l.distance=u;break;case"spot":l=new sa(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ei(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){let e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}},Wu=class{constructor(){this.name=xe.KHR_MATERIALS_UNLIT}getMaterialType(){return De}extendParams(t,e,n){let s=[];t.color=new ie(1,1,1),t.opacity=1;let r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],mn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,qe))}return Promise.all(s)}},Xu=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}},qu=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new At(a,a)}return Promise.all(r)}},Yu=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_DISPERSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},$u=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Zu=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_SHEEN}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];e.sheenColor=new ie(0,0,0),e.sheenRoughness=0,e.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],mn)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,qe)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Ku=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},ju=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_VOLUME}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return e.attenuationColor=new ie().setRGB(a[0],a[1],a[2],mn),Promise.all(r)}},Ju=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_IOR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Qu=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_SPECULAR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return e.specularColor=new ie().setRGB(a[0],a[1],a[2],mn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,qe)),Promise.all(r)}},tf=class{constructor(t){this.parser=t,this.name=xe.EXT_MATERIALS_BUMP}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}},ef=class{constructor(t){this.parser=t,this.name=xe.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},nf=class{constructor(t){this.parser=t,this.name=xe.KHR_TEXTURE_BASISU}loadTexture(t){let e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}},sf=class{constructor(t){this.parser=t,this.name=xe.EXT_TEXTURE_WEBP}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},rf=class{constructor(t){this.parser=t,this.name=xe.EXT_TEXTURE_AVIF}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},of=class{constructor(t){this.name=xe.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){let e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},af=class{constructor(t){this.name=xe.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){let e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=e.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Jn.TRIANGLES&&l.mode!==Jn.TRIANGLE_STRIP&&l.mode!==Jn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let g of u){let _=new le,m=new I,p=new Cn,S=new I(1,1,1),y=new Is(g.geometry,g.material,f);for(let x=0;x<f;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&S.fromBufferAttribute(c.SCALE,x),y.setMatrixAt(x,_.compose(m,p,S));for(let x in c)if(x==="_COLOR_0"){let T=c[x];y.instanceColor=new ls(T.array,T.itemSize,T.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);Oe.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},xm="glTF",ga=12,pm={JSON:1313821514,BIN:5130562},cf=class{constructor(t){this.name=xe.KHR_BINARY_GLTF,this.content=null,this.body=null;let e=new DataView(t,0,ga),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==xm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ga,r=new DataView(t,ga),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===pm.JSON){let l=new Uint8Array(t,ga+o,a);this.content=n.decode(l)}else if(c===pm.BIN){let l=ga+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},lf=class{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=xe.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){let n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=df[h]||h.toLowerCase();a[u]=o[h]}for(let h in t.attributes){let u=df[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[t.attributes[h]],d=Jr[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let g in d.attributes){let _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(d)},a,l,mn,f)})})}},hf=class{constructor(){this.name=xe.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}},uf=class{constructor(){this.name=xe.KHR_MESH_QUANTIZATION}},Ol=class extends Hi{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-e,u=(n-e)/h,f=u*u,d=f*u,g=t*l,_=g-l,m=-2*d+3*f,p=d-f,S=1-m,y=p-f+u;for(let x=0;x!==a;x++){let T=o[_+x+a],w=o[_+x+c]*h,A=o[g+x+a],U=o[g+x]*h;r[x]=S*T+y*w+m*A+p*U}return r}},VM=new Cn,ff=class extends Ol{interpolate_(t,e,n,s){let r=super.interpolate_(t,e,n,s);return VM.fromArray(r).normalize().toArray(r),r}},Jn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Jr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},mm={9728:pn,9729:Rn,9984:qc,9985:zr,9986:Gs,9987:oi},gm={33071:di,33648:Er,10497:Yn},zu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},df={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},GM={CUBICSPLINE:void 0,LINEAR:As,STEP:ws},Hu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};ZM=new le,mf=class{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new HM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new na(this.options.manager):this.textureLoader=new ra(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Br(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Zs(r,a,s),Ei(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){let t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){let o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){let o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){let e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){let s=t(e[n]);if(s)return s}return null}_invokeAll(t){let e=Object.values(this.plugins);e.unshift(this);let n=[];for(let s=0;s<e.length;s++){let r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){let n=t+":"+e,s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){let n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){let e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[xe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Xi.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){let e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){let s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){let e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){let o=zu[s.type],a=Jr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Ge(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=zu[s.type],l=Jr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,_,m;if(d&&d!==u){let p=Math.floor(f/d),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,y=e.cache.get(S);y||(_=new l(a,p*d,s.count*d/h),y=new Cs(_,d/h),e.cache.add(S,y)),m=new cs(y,c,f%d/h,g)}else a===null?_=new l(s.count*c):_=new l(a,f,s.count*c),m=new Ge(_,c,g);if(s.sparse!==void 0){let p=zu.SCALAR,S=Jr[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,T=new S(o[1],y,s.sparse.count*p),w=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new Ge(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,U=T.length;A<U;A++){let b=T[A];if(m.setX(b,w[A*c]),c>=2&&m.setY(b,w[A*c+1]),c>=3&&m.setZ(b,w[A*c+2]),c>=4&&m.setW(b,w[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){let e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){let s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=mm[f.magFilter]||Rn,h.minFilter=mm[f.minFilter]||oi,h.wrapS=gm[f.wrapS]||Yn,h.wrapT=gm[f.wrapT]||Yn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==pn&&h.minFilter!==Rn,s.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){let n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());let o=s.images[t],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let g=f;e.isImageBitmapLoader===!0&&(g=function(_){let m=new ln(_);m.needsUpdate=!0,f(m)}),e.load(Xi.resolveURL(u,r.path),g,void 0,d)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Ei(u,o),u.userData.mimeType=o.mimeType||$M(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[xe.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[xe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[xe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){let e=t.geometry,n=t.material,s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Nr,Sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Oi,Sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return bn}loadMaterial(t){let e=this,n=this.json,s=this.extensions,r=n.materials[t],o,a={},c=r.extensions||{},l=[];if(c[xe.KHR_MATERIALS_UNLIT]){let u=s[xe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,e))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new ie(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],mn),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",u.baseColorTexture,qe)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=Ce);let h=r.alphaMode||Hu.OPAQUE;if(h===Hu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Hu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==De&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new At(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==De&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==De){let u=r.emissiveFactor;a.emissive=new ie().setRGB(u[0],u[1],u[2],mn)}return r.emissiveTexture!==void 0&&o!==De&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,qe)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Ei(u,r),e.associations.set(u,{materials:t}),r.extensions&&Zs(s,u,r),u})}createUniqueName(t){let e=Ve.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){let e=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[xe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return _m(c,a,e)})}let o=[];for(let a=0,c=t.length;a<c;a++){let l=t[a],h=YM(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[xe.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=_m(new Be,l,e),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){let e=this,n=this.json,s=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?WM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,g=h.length;d<g;d++){let _=h[d],m=o[d],p,S=l[d];if(m.mode===Jn.TRIANGLES||m.mode===Jn.TRIANGLE_STRIP||m.mode===Jn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Fo(_,S):new he(_,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Jn.TRIANGLE_STRIP?p.geometry=Bu(p.geometry,da):m.mode===Jn.TRIANGLE_FAN&&(p.geometry=Bu(p.geometry,Xr));else if(m.mode===Jn.LINES)p=new Ps(_,S);else if(m.mode===Jn.LINE_STRIP)p=new Bi(_,S);else if(m.mode===Jn.LINE_LOOP)p=new ko(_,S);else if(m.mode===Jn.POINTS)p=new zo(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&qM(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),Ei(p,r),m.extensions&&Zs(s,p,m),e.assignFinalMaterial(p),u.push(p)}for(let d=0,g=u.length;d<g;d++)e.associations.set(u[d],{meshes:t,primitives:d});if(u.length===1)return r.extensions&&Zs(s,u[0],r),u[0];let f=new tn;r.extensions&&Zs(s,f,r),e.associations.set(f,{meshes:t});for(let d=0,g=u.length;d<g;d++)f.add(u[d]);return f})}loadCamera(t){let e,n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new Ke(Zi.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new Wi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Ei(e,n),Promise.resolve(e)}loadSkin(t){let e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new le;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Bo(a,c)})}loadAnimation(t){let e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],g=s.samplers[d.sampler],_=d.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,S=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",S)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,x=f.length;y<x;y++){let T=f[y],w=d[y],A=g[y],U=_[y],b=m[y];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let M=n._createAnimationTracks(T,w,A,U,b);if(M)for(let D=0;D<M.length;D++)p.push(M[D])}let S=new ea(r,void 0,p);return Ei(S,s),S})}createNodeMesh(t){let e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){let e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,ZM)});for(let d=0,g=u.length;d<g;d++)h.add(u[d]);return h})}_loadNodeShallow(t){let e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];let r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Lr:l.length>1?h=new tn:l.length===1?h=l[0]:h=new Oe,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Ei(h,r),r.extensions&&Zs(n,h,r),r.matrix!==void 0){let u=new le;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){let e=this.extensions,n=this.json.scenes[t],s=this,r=new tn;n.name&&(r.name=s.createUniqueName(n.name)),Ei(r,n),n.extensions&&Zs(e,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof Sn||f instanceof ln)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){let o=[],a=t.name?t.name:t.uuid,c=[];fs[r.path]===fs.weights?t.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(fs[r.path]){case fs.weights:l=xi;break;case fs.rotation:l=yi;break;case fs.translation:case fs.scale:l=vi;break;default:switch(n.itemSize){case 1:l=xi;break;case 2:case 3:default:l=vi;break}break}let h=s.interpolation!==void 0?GM[s.interpolation]:As,u=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+fs[r.path],e.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){let n=pf(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){let s=this instanceof yi?ff:Ol;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var to,Qr,vm,Mm,Sm,bm,Bl,Em=Qe(()=>{jn();to=class extends Oe{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new At(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},Qr=new I,vm=new le,Mm=new le,Sm=new I,bm=new I,Bl=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),vm.copy(_.matrixWorldInverse),Mm.multiplyMatrices(_.projectionMatrix,vm),h(g,g,_),d(g)},this.setSize=function(g,_){n=g,s=_,r=n/2,o=s/2,c.style.width=g+"px",c.style.height=_+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)l(g.children[_])}function h(g,_,m){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){Qr.setFromMatrixPosition(g.matrixWorld),Qr.applyMatrix4(Mm);let p=Qr.z>=-1&&Qr.z<=1&&g.layers.test(m.layers)===!0,S=g.element;S.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,_,m),S.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Qr.x*r+r)+"px,"+(-Qr.y*o+o)+"px)",S.parentNode!==c&&c.appendChild(S),g.onAfterRender(e,_,m));let y={distanceToCameraSquared:u(m,g)};a.objects.set(g,y)}for(let p=0,S=g.children.length;p<S;p++)h(g.children[p],_,m)}function u(g,_){return Sm.setFromMatrixPosition(g.matrixWorld),bm.setFromMatrixPosition(_.matrixWorld),Sm.distanceToSquared(bm)}function f(g){let _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function d(g){let _=f(g).sort(function(p,S){if(p.renderOrder!==S.renderOrder)return S.renderOrder-p.renderOrder;let y=a.objects.get(p).distanceToCameraSquared,x=a.objects.get(S).distanceToCameraSquared;return y-x}),m=_.length;for(let p=0,S=_.length;p<S;p++)_[p].element.style.zIndex=m-p}}}});function Tm(i,{width:t,height:e,fov:n=38,direction:s}={}){let r=t<e,o=s?.clone().normalize()||new I(r?-Math.sin(.5):0,Math.cos(.5),r?0:Math.sin(.5)),a=new I().crossVectors(new I(0,1,0),o).normalize(),c=new I().crossVectors(o,a).normalize(),l=i.getCenter(new I),h=Math.tan(Zi.degToRad(n/2)),u=h*t/e,f=10;for(let d of[i.min.x,i.max.x])for(let g of[i.min.y,i.max.y])for(let _ of[i.min.z,i.max.z]){let m=new I(d,g,_).sub(l),p=m.dot(o);f=Math.max(f,p+(Math.abs(m.dot(a))+2)/u*1.12,p+(Math.abs(m.dot(c))+2)/h*1.12)}return{target:l,position:l.clone().addScaledVector(o,f),distance:f}}var wm=Qe(()=>{jn()});var Am={};dg(Am,{RoomEnvironment:()=>gf});function eo(i){return new zi({color:0,emissive:16777215,emissiveIntensity:i})}var gf,Rm=Qe(()=>{jn();gf=class extends ri{constructor(){super();let t=new as;t.deleteAttribute("uv");let e=new bn({side:gn}),n=new bn,s=new ks(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new he(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Is(t,n,6),a=new Oe;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new he(t,eo(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new he(t,eo(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new he(t,eo(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new he(t,eo(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new he(t,eo(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let d=new he(t,eo(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}}});function Ti(i){let t=i>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function Ki(i,t){let e=document.createElement("canvas");e.width=e.height=i;let n=e.getContext("2d");t(n,i);let s=new ki(e);return s.wrapS=s.wrapT=Yn,s.colorSpace=qe,s}function _f(i,t,e,n,s,r,o){i.fillStyle=_n(n),i.fillRect(0,0,t,t);for(let a=0;a<s;a++){let c=o[Math.floor(e()*o.length)];i.fillStyle=_n(c[0],c[1]);let l=r[0]+e()*(r[1]-r[0]);i.beginPath(),i.arc(e()*t,e()*t,l,0,Math.PI*2),i.fill()}}function JM(i,t,e,n,s){let r=(o,a,c)=>Math.abs(i-o)<4&&Math.abs(t-a)<4&&Math.abs(e-c)<4;return s==="C"?r(255,255,255)?"light":r(244,244,238)?"ceiling":"plain":r(216,210,198)||r(203,200,192)?n?"floor":"plain":r(168,171,168)?"inlay":r(236,228,205)?"wall":r(62,56,50)?"base":r(152,192,150)?"door":r(105,112,112)||r(170,174,178)?"metal":r(150,96,58)||r(150,110,80)?"wood":r(205,200,190)||r(244,244,238)?"stone":r(40,48,52)?"dark":"plain"}function QM(i){var s;if(xf)return xf;let t=Math.min(4,i.capabilities.getMaxAnisotropy()),e={},n={};for(let[r,o]of Object.entries(Cm)){if(o.emissive){n[r]=new bn({color:16777215,emissive:16776176,emissiveIntensity:.9,side:Ce});continue}let c=(e[s=o.tex]||(e[s]=jM[o.tex]())).clone();c.needsUpdate=!0,o.fit||c.repeat.set(1/o.m,1/o.m),c.anisotropy=t,n[r]=new bn({vertexColors:!o.fit,map:c,roughness:o.rough,metalness:o.metal||0,side:Ce})}return xf=n,n}function Im(i){return Promise.resolve().then(()=>(Rm(),Am)).then(({RoomEnvironment:t})=>{let e=new Zr(i),n=e.fromScene(new t,.04).texture;return e.dispose(),n})}function yf(i){let t=i.geometry.index?i.geometry.toNonIndexed():i.geometry;t.computeVertexNormals(),t!==i.geometry&&i.geometry.dispose(),i.geometry=t}function Pm(){return new bn({color:13624302,roughness:.05,metalness:.1,transparent:!0,opacity:.32,side:Ce,depthWrite:!1,envMapIntensity:1.4})}function Lm(i,t,e={},n={}){let s=n.elevDoors||[],r=QM(t),o=i.geometry.index?i.geometry.toNonIndexed():i.geometry,a=o.getAttribute("position"),c=o.getAttribute("color"),l=a.count/3,h=i.name[0],u=Object.keys(Cm),f=new Uint8Array(l),d=new I,g=new I,_=new I,m=new I,p=new I,S=u.map(()=>[]);for(let k=0;k<l;k++){d.fromBufferAttribute(a,3*k),g.fromBufferAttribute(a,3*k+1),_.fromBufferAttribute(a,3*k+2),m.subVectors(_,g).cross(p.subVectors(g,d)).normalize();let K=Math.abs(m.y)>.7,nt=Math.round(c.getX(3*k)*255),Z=Math.round(c.getY(3*k)*255),yt=Math.round(c.getZ(3*k)*255),J=JM(nt,Z,yt,K,h);if(J==="wood"&&!K&&s.length&&nt===150&&Z===110){let It=(d.x+g.x+_.x)/3,Ot=-(d.z+g.z+_.z)/3;s.some(G=>Math.hypot(G[0]-It,G[1]-Ot)<1.6)&&(J="elevDoor")}let Tt=u.indexOf(J);f[k]=Tt,S[Tt].push(k)}let y=new Float32Array(a.count*3),x=new Float32Array(a.count*3),T=new Float32Array(a.count*3),w=new Float32Array(a.count*2),A=new Map,U=u.indexOf("elevDoor");for(let k of S[U]||[]){d.fromBufferAttribute(a,3*k);let K=d.x,nt=-d.z,Z=s.reduce((yt,J,Tt)=>Math.hypot(J[0]-K,J[1]-nt)<Math.hypot(s[yt][0]-K,s[yt][1]-nt)?Tt:yt,0);A.set(k,Z)}let b=s.map(()=>({x0:1/0,x1:-1/0,z0:1/0,z1:-1/0,y0:1/0,y1:-1/0}));for(let[k,K]of A){let nt=b[K];for(let Z=0;Z<3;Z++)d.fromBufferAttribute(a,3*k+Z),nt.x0=Math.min(nt.x0,d.x),nt.x1=Math.max(nt.x1,d.x),nt.z0=Math.min(nt.z0,d.z),nt.z1=Math.max(nt.z1,d.z),nt.y0=Math.min(nt.y0,d.y),nt.y1=Math.max(nt.y1,d.y)}for(let k of b){let K=k.x1-k.x0>=k.z1-k.z0;k.u0=K?k.x0:k.z0,k.u1=K?k.x1:k.z1,k.n=K?"z":"x"}let M=new Be,D=[],z=0;for(let k=0;k<u.length;k++){if(!S[k].length)continue;let K=z;for(let Z of S[k]){d.fromBufferAttribute(a,3*Z),g.fromBufferAttribute(a,3*Z+1),_.fromBufferAttribute(a,3*Z+2),m.subVectors(_,g).cross(p.subVectors(g,d)).normalize();let yt=Math.abs(m.x),J=Math.abs(m.y),Tt=Math.abs(m.z);for(let It=0;It<3;It++){let Ot=3*Z+It,G=a.getX(Ot),et=a.getY(Ot),rt=a.getZ(Ot);if(y.set([G,et,rt],z*3),x.set([c.getX(Ot),c.getY(Ot),c.getZ(Ot)],z*3),k===U?T.set([-m.x,-m.y,-m.z],z*3):T.set([m.x,m.y,m.z],z*3),k===U&&A.has(Z)){let at=b[A.get(Z)],N=at.n==="x"?rt:G;w.set([(N-at.u0)/Math.max(1e-6,at.u1-at.u0),(et-at.y0)/Math.max(1e-6,at.y1-at.y0)],z*2)}else J>=yt&&J>=Tt?w.set([G,-rt],z*2):yt>=Tt?w.set([-rt,et],z*2):w.set([G,et],z*2);z++}}M.addGroup(K,z-K,D.length);let nt=r[u[k]];D.push(Object.keys(e).length?Object.assign(nt.clone(),e):nt)}M.setAttribute("position",new Ge(y,3)),M.setAttribute("color",new Ge(x,3)),M.setAttribute("normal",new Ge(T,3)),M.setAttribute("uv",new Ge(w,2)),M.computeBoundingSphere(),M.computeBoundingBox(),i.geometry.dispose(),o!==i.geometry&&o.dispose(),i.geometry=M,i.material=D}var _n,jM,Cm,xf,Ks,Dm=Qe(()=>{jn();_n=(i,t=1)=>`rgba(${i},${i},${i},${t})`;jM={floor:(i=512)=>Ki(i,t=>{let e=Ti(11);_f(t,i,e,236,5200,[.5,1.6],[[150,.55],[120,.45],[255,.7],[196,.6],[170,.5]]);let n=i/2;for(let s=0;s<2;s++)for(let r=0;r<2;r++){let o=.92+e()*.08;t.fillStyle=_n(Math.round(255*o),.18),t.fillRect(s*n,r*n,n,n)}t.fillStyle=_n(150,.9);for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),inlay:(i=256)=>Ki(i,t=>{let e=Ti(23);_f(t,i,e,205,2600,[.5,1.4],[[90,.6],[255,.5],[140,.5]])}),wall:(i=256)=>Ki(i,t=>{let e=Ti(5);t.fillStyle=_n(248),t.fillRect(0,0,i,i);for(let n=0;n<160;n++)t.fillStyle=_n(e()<.5?232:255,.08),t.beginPath(),t.ellipse(e()*i,e()*i,6+e()*26,4+e()*14,e()*3,0,Math.PI*2),t.fill()}),ceiling:(i=256)=>Ki(i,t=>{let e=Ti(7);t.fillStyle=_n(250),t.fillRect(0,0,i,i),t.fillStyle=_n(200,.6);for(let s=0;s<1400;s++)t.fillRect(Math.floor(e()*i),Math.floor(e()*i),1,1);t.fillStyle=_n(190);let n=i/2;for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),door:(i=256)=>Ki(i,t=>{let e=Ti(13);t.fillStyle=_n(246),t.fillRect(0,0,i,i);for(let n=0;n<90;n++)t.fillStyle=_n(e()<.5?228:255,.25),t.fillRect(e()*i,0,1+e()*2,i)}),metal:(i=128)=>Ki(i,t=>{let e=Ti(17);t.fillStyle=_n(236),t.fillRect(0,0,i,i);for(let n=0;n<120;n++)t.fillStyle=_n(e()<.5?205:255,.35),t.fillRect(0,e()*i,i,1)}),wood:(i=256)=>Ki(i,t=>{let e=Ti(19);t.fillStyle=_n(232),t.fillRect(0,0,i,i);for(let n=0;n<70;n++){t.strokeStyle=_n(e()<.6?190:255,.35),t.lineWidth=1+e()*2,t.beginPath();let s=e()*i;t.moveTo(0,s);for(let r=0;r<=i;r+=16)t.lineTo(r,s+Math.sin(r/40+n)*3);t.stroke()}}),stone:(i=256)=>Ki(i,t=>{let e=Ti(29);_f(t,i,e,240,2600,[.5,1.5],[[160,.5],[120,.4],[255,.6]])}),elevDoor:()=>{let i=document.createElement("canvas");i.width=256,i.height=512;let t=i.getContext("2d"),e=Ti(41),n=t.createLinearGradient(0,0,256,0);n.addColorStop(0,"#d2b06a"),n.addColorStop(.25,"#f0d699"),n.addColorStop(.5,"#e1c07c"),n.addColorStop(.75,"#f6dea4"),n.addColorStop(1,"#d2b06a"),t.fillStyle=n,t.fillRect(0,0,256,512);for(let r=0;r<260;r++)t.fillStyle=e()<.5?"rgba(255,240,200,0.10)":"rgba(90,60,20,0.08)",t.fillRect(e()*256,0,1,512);t.fillStyle="rgba(60,40,15,0.55)",t.fillRect(0,0,3,512),t.fillRect(253,0,3,512),t.fillStyle="#2a1d0c",t.fillRect(126,0,4,512),t.fillStyle="rgba(255,236,190,0.55)",t.fillRect(123,0,2,512),t.fillRect(131,0,2,512);let s=new ki(i);return s.colorSpace=qe,s},plain:(i=128)=>Ki(i,t=>{let e=Ti(31);t.fillStyle=_n(246),t.fillRect(0,0,i,i);for(let n=0;n<500;n++)t.fillStyle=_n(e()<.5?230:255,.3),t.fillRect(e()*i,e()*i,1,1)})},Cm={floor:{tex:"floor",m:1.2,rough:.42},inlay:{tex:"inlay",m:.8,rough:.36},wall:{tex:"wall",m:2.4,rough:.82},ceiling:{tex:"ceiling",m:1.2,rough:.92},base:{tex:"plain",m:1,rough:.45},door:{tex:"door",m:1,rough:.5},metal:{tex:"metal",m:.6,rough:.38,metal:.55},wood:{tex:"wood",m:.8,rough:.55},stone:{tex:"stone",m:1.2,rough:.42},dark:{tex:"plain",m:1,rough:.15,metal:.2},light:{emissive:!0},elevDoor:{tex:"elevDoor",fit:!0,rough:.3,metal:.35},plain:{tex:"plain",m:1.5,rough:.7}};xf=null;Ks={hemi:1.15,sun:.55,env:.4,exposure:1.1,mapExposure:1.4}});function Nm(i,t,{onPick:e}={}){let{M:n,FL:s}=t,r=Math.min(devicePixelRatio,2),o=Math.min(r,1.25),a=new Kr({antialias:devicePixelRatio<1.5,alpha:!1,powerPreference:"high-performance"});a.setPixelRatio(r);let c=r,l=-1e9;function h(L){L!==c&&(c=L,a.setPixelRatio(L),a.setSize(i.clientWidth,i.clientHeight,!1))}a.toneMapping=Gc,a.toneMappingExposure=Ks.mapExposure,i.appendChild(a.domElement);let u=new Bl;Object.assign(u.domElement.style,{position:"absolute",inset:"0",pointerEvents:"none"}),i.appendChild(u.domElement);let f=new ri;f.background=new ie(15659254),f.add(new Bs(16777215,15130834,Ks.hemi));let d=new zs(16777215,Ks.sun);d.position.set(30,80,20),f.add(d);let g=new Ke(38,1,.5,2e3),_=new Ke(70,1,.08,600);_.rotation.order="YXZ";let m=new Ul(g,a.domElement);m.enableDamping=!0,m.dampingFactor=.12,m.screenSpacePanning=!1,m.maxPolarAngle=1.1,m.minDistance=10,m.maxDistance=170,m.touches={ONE:En.PAN,TWO:En.DOLLY_ROTATE};let p=1,S=!1,y=!0,x={},T=new Map,w=new Map,A=!1,U=null,b=(Math.min(...t.floors)+Math.max(...t.floors))/2,M=[],D=new tn;f.add(D);let z=new tn;f.add(z);let k=bt();k.visible=!1,f.add(k);function K(){let L=i.clientWidth,Y=i.clientHeight;a.setSize(L,Y),u.setSize(L,Y);for(let X of[g,_])X.aspect=L/Y,X.updateProjectionMatrix();y=!0}new ResizeObserver(K).observe(i),K(),m.addEventListener("change",()=>y=!0);async function nt(L,Y){let X=await fetch(L);if(!X.ok)throw new Error(`\uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694 (${X.status})`);let B=+X.headers.get("content-length")||0,F;if(X.body&&B){let ut=X.body.getReader(),Wt=[],Dt=0;for(;;){let{done:ae,value:de}=await ut.read();if(ae)break;Wt.push(de),Dt+=de.length,Y?.(Dt/B)}F=new Uint8Array(Dt);let jt=0;for(let ae of Wt)F.set(ae,jt),jt+=ae.length;F=F.buffer}else F=await X.arrayBuffer();let it=await new Promise((ut,Wt)=>new Fl().parse(F,"",ut,Wt));try{f.environment=await Im(a),f.environmentIntensity=Ks.env}catch{}it.scene.traverse(ut=>{ut.isMesh&&(ut.name[0]==="G"?(yf(ut),ut.material=Pm()):ut.name[0]==="X"?(yf(ut),ut.material=new bn({vertexColors:!0,roughness:.9,side:Ce})):Lm(ut,a,ut.name[0]==="D"?{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}:{},{elevDoors:Z(+ut.name.slice(1))}),x[ut.name]=ut,w.set(ut,ut.position.y))}),f.add(it.scene),it.scene.updateMatrixWorld(!0);for(let ut of n.floors){let Wt=new In;for(let[Dt,jt]of Object.entries(x))Dt[0]!=="C"&&Dt[0]!=="X"&&+Dt.slice(1)===ut.n&&Wt.expandByObject(jt);Wt.isEmpty()||T.set(ut.n,Wt)}J(),yt(),pt(p,!0)}function Z(L){return(n.floors.find(X=>X.n===L)?.doors||[]).filter(X=>X.cat==="elev"||/^EV/.test(X.id)).map(X=>X.p)}function yt(){for(let L of t.destinations){let Y=L.center||L.doors[0],X=document.createElement("div"),B=L.cat==="toilet"?"WC":L.cat==="elev"?"EV":L.numbered?L.id:L.title;if(X.className="room-label"+(L.numbered?"":" icon-only"),L.cat==="toilet"){X.classList.add("restroom-label"),X.dataset.gender=/女|여/.test(L.title)?"\uC5EC":/男|남/.test(L.title)?"\uB0A8":"",X.setAttribute("role","img"),X.setAttribute("aria-label",`${L.f===0?"\uC9C0\uD558 1":L.f}\uCE35 ${L.title}`),X.title=`${L.title}${L.name?" \xB7 "+L.name:""}`;let it=document.createElement("img");it.src="ui/restroom.svg",it.alt="",X.append(it)}else X.textContent=B;let F=new to(X);F.position.copy(kn(Y[0],Y[1],s(L.f).z+.6)),F.userData={d:L},F.visible=!1,f.add(F),M.push(F)}}function J(){let L=new De({color:1475768,transparent:!0,opacity:.3,depthTest:!1,depthWrite:!1,side:Ce,toneMapped:!1}),Y=new De({color:1471913,depthTest:!1,depthWrite:!1,side:Ce,toneMapped:!1});for(let X of n.floors){let B=new tn;B.userData.f=X.n;for(let F of X.rooms.filter(it=>it.cat==="toilet")){let it=new hs(F.poly.map(([Dt,jt])=>new At(Dt,jt))),ut=new he(new Us(it),L);ut.rotation.x=-Math.PI/2,ut.position.y=X.z+.1,ut.renderOrder=1,B.add(ut);let Wt=new he(St(F.poly.map(([Dt,jt])=>[Dt,jt,X.z+.11]),.12),Y);Wt.renderOrder=2,B.add(Wt)}z.add(B)}}let Tt=null;function It(){let L=g.position.distanceTo(m.target),Y=Math.max(130,Math.min(200,130*1440/i.clientWidth));for(let X of M){let B=X.userData.d,F=B.key===Tt;if(X.element.classList.toggle("sel",F),S){let it=B.center||B.doors[0];X.visible=B.f===mt.f&&Math.hypot(it[0]-mt.x,it[1]-mt.y)<12}else X.visible=A?F:B.f===p&&(F||B.cat==="toilet"||L<(B.numbered?Y:200))}}function Ot(L){return(L-b)*22-s(L).z}function G(){var Y,X;z.visible=!S&&!A,k.visible=!S&&!A&&k.userData.floor===p;for(let B of M)(Y=B.userData).baseY??(Y.baseY=B.position.y),B.position.y=B.userData.baseY+(A?Ot(B.userData.d.f):0);for(let B of z.children)B.visible=B.userData.f===p;for(let B in x){let F=B[0],it=+B.slice(1);F==="X"?x[B].visible=S:S?x[B].visible=Math.abs(it-mt.f)<=1:x[B].visible=F!=="C"&&(A||it===p);let ut=x[B];ut.position.y=w.get(ut)+(A&&Number.isFinite(it)&&t.floors.includes(it)?Ot(it):0)}let L=S?"walk":"map";for(let B of D.children){let{f:F,mode:it,singleFloor:ut,overviewLabel:Wt}=B.userData;(X=B.userData).baseY??(X.baseY=B.position.y),B.position.y=B.userData.baseY+(A&&t.floors.includes(F)?Ot(F):0),A?B.visible=Wt||it==="overview"||it==="map"&&!ut:B.visible=(!it||it===L)&&(S?!B.isCSS2DObject||rt(B):F==null||F===p)}et(),y=!0}function et(){D.traverse(L=>{if(L.material)for(let Y of Array.isArray(L.material)?L.material:[L.material])Y.userData.depth0===void 0&&(Y.userData.depth0=Y.depthTest),Y.depthTest=S||Y.userData.depth0})}function rt(L){if(L.userData.f!==mt.f)return!1;let Y=L.position.x,X=-L.position.z;return at(mt.f,mt.x,mt.y,Y,X)}function at(L,Y,X,B,F){let it=Math.hypot(B-Y,F-X);if(it>25)return!1;let ut=Math.max(1,Math.ceil(it/.25)),Wt=0;for(let Dt=1;Dt<ut&&!(it*(1-Dt/ut)<1);Dt++){let jt=Dt/ut;if(t.walk(L,Y+(B-Y)*jt,X+(F-X)*jt))Wt=0;else if(Wt+=it/ut,Wt>.8)return!1}return!0}let N=null;function C(L,Y,X=550){N={t0:performance.now(),dur:X,cam0:g.position.clone(),tgt0:m.target.clone(),cam1:L,tgt1:Y},y=!0}m.addEventListener("start",()=>N=null);function W(L){let Y=kn(0,-1,0),X=i.clientWidth<i.clientHeight?new I(-1,.95,.4):new I(-.65,.8,1),B=Math.max(195,48/Math.tan(Math.atan(Math.tan(Zi.degToRad(g.fov/2))*g.aspect)));m.maxDistance=Math.max(m.maxDistance,B*1.2),C(Y.clone().add(X.setLength(B)),Y,L?1:480)}function gt(L){if(L===A)return;A=L;let Y=matchMedia("(prefers-reduced-motion: reduce)").matches;L?(U={position:g.position.clone(),target:m.target.clone(),maxDistance:m.maxDistance,mouseButtons:m.mouseButtons,touches:m.touches},m.mouseButtons={...m.mouseButtons,LEFT:Pn.ROTATE,RIGHT:Pn.PAN},m.touches={ONE:En.ROTATE,TWO:En.DOLLY_PAN},W(Y)):(N=null,m.maxDistance=U.maxDistance,m.mouseButtons=U.mouseButtons,m.touches=U.touches,g.position.copy(U.position),m.target.copy(U.target),m.update()),G(),It()}function pt(L,Y=!1,X=!1){let B=s(p).z;p=L;let F=s(L).z-B;if(X&&F&&!Y){let it=new I(0,F,0);C((N?N.cam1:g.position).clone().add(it),(N?N.tgt1:m.target).clone().add(it),520)}else g.position.y+=F,m.target.y+=F,N&&(N.cam1.y+=F,N.tgt1.y+=F);Y&&Lt({animate:X}),G(),It()}function Lt({resetOrientation:L=!0,animate:Y=!1}={}){if(A)return W(!Y||matchMedia("(prefers-reduced-motion: reduce)").matches);let X=T.get(p);if(!X)return;let B=L?void 0:N?N.cam1.clone().sub(N.tgt1):g.position.clone().sub(m.target),F=Tm(X,{width:i.clientWidth,height:i.clientHeight,fov:g.fov,direction:B}),it=m.enableDamping;m.enableDamping=!1,m.update(),m.enableDamping=it,N=null,m.maxDistance=Math.max(170,F.distance*1.4),Y?C(F.position,F.target):(g.position.copy(F.position),m.target.copy(F.target),m.update()),y=!0}function Kt(L,Y,X,B,F,it=0,ut=70){F!==p&&pt(F);let Wt=s(F).z,Dt=i.clientHeight,jt=Math.max(.3,(Dt-it-ut)/Dt),ae=g.fov*Math.PI/360,de=Math.atan(Math.tan(ae)*g.aspect),Bt=g.position.clone().sub(m.target).normalize(),te=new I(-Bt.x,0,-Bt.z).normalize(),Ie=new I(-te.z,0,te.x),Ae=0,Ne=0;for(let[wi,rn]of[[L,Y],[L,B],[X,Y],[X,B]]){let li=kn(wi,rn,0).sub(kn((L+X)/2,(Y+B)/2,0));Ae=Math.max(Ae,Math.abs(li.dot(Ie))),Ne=Math.max(Ne,Math.abs(li.dot(te)))}Ae+=4,Ne+=4;let _e=Math.min(m.maxDistance,Math.max(18,Math.max(Ne/Math.tan(ae*jt)/Math.max(.5,-Bt.y),Ae/Math.tan(de)))),sn=kn((L+X)/2,(Y+B)/2,Wt),Ln=(it-ut)/Dt*_e*Math.tan(ae)/Math.max(.5,-Bt.y),ce=sn.clone().addScaledVector(te,-Ln);C(ce.clone().addScaledVector(Bt,_e),ce)}function P(L,Y,X,B=45){X!==p&&pt(X);let F=s(X).z,it=g.position.clone().sub(m.target).setLength(B),ut=kn(L,Y,F);C(ut.clone().add(it),ut)}let Vt=null;a.domElement.addEventListener("pointerdown",L=>Vt=[L.clientX,L.clientY,performance.now()]),a.domElement.addEventListener("pointerup",L=>{if(!Vt||S||A||Math.hypot(L.clientX-Vt[0],L.clientY-Vt[1])>8||performance.now()-Vt[2]>450)return;let X=a.domElement.getBoundingClientRect(),B=new oa;B.setFromCamera(new At((L.clientX-X.left)/X.width*2-1,-((L.clientY-X.top)/X.height)*2+1),g);let F=B.ray.intersectPlane(new Nn(new I(0,1,0),-s(p).z),new I);F&&e?.(F.x,-F.z,p)});function St(L,Y){let X=[];for(let F=1;F<L.length;F++){let it=L[F-1],ut=L[F],Wt=ut[0]-it[0],Dt=ut[1]-it[1],jt=Math.hypot(Wt,Dt);if(jt<.01)continue;let ae=-Dt/jt*Y*.5,de=Wt/jt*Y*.5,Bt=new Be;Bt.setAttribute("position",new Te([it[0]+ae,it[2],-(it[1]+de),it[0]-ae,it[2],-(it[1]-de),ut[0]+ae,ut[2],-(ut[1]+de),ut[0]-ae,ut[2],-(ut[1]-de)],3)),Bt.setIndex([0,1,2,2,1,3]),X.push(Bt)}for(let F of L){let it=new _i(Y*.5,14);it.rotateX(-Math.PI/2),it.translate(F[0],F[2],-F[1]),X.push(it)}let B=X.map(F=>F.index?F.toNonIndexed():F);return B.forEach(F=>{for(let it of Object.keys(F.attributes))it!=="position"&&F.deleteAttribute(it)}),dm(B)}let Ft=new De({toneMapped:!1,color:ji,side:Ce,depthTest:!1}),Gt=new De({toneMapped:!1,color:ji,transparent:!0,opacity:.2,depthTest:!1,depthWrite:!1,side:Ce}),we=4,zt=new De({toneMapped:!1,color:16777215,side:Ce,depthTest:!1}),$t=new De({toneMapped:!1,color:ji,side:Ce,polygonOffset:!0,polygonOffsetFactor:-2}),ye=new De({toneMapped:!1,color:ji,transparent:!0,opacity:.16,depthWrite:!1,side:Ce,polygonOffset:!0,polygonOffsetFactor:-1}),ve=new De({toneMapped:!1,color:16777215,side:Ce,polygonOffset:!0,polygonOffsetFactor:-3});function R(L,Y=1.4,X=.13,B=.035){let F=[],it=(Dt,jt,ae,de,Bt)=>{let te=Math.hypot(ae-Dt,de-jt)||1,Ie=-(de-jt)/te*B*.5,Ae=(ae-Dt)/te*B*.5,Ne=[Dt+Ie,Bt,-(jt+Ae)],_e=[Dt-Ie,Bt,-(jt-Ae)],sn=[ae+Ie,Bt,-(de+Ae)],Ln=[ae-Ie,Bt,-(de-Ae)];F.push(...Ne,..._e,...sn,...sn,..._e,...Ln)},ut=Y/2;for(let Dt=1;Dt<L.length;Dt++){let jt=L[Dt-1],ae=L[Dt],de=Math.hypot(ae[0]-jt[0],ae[1]-jt[1]);if(de<.01)continue;let Bt=(ae[0]-jt[0])/de,te=(ae[1]-jt[1])/de;for(;ut<de;){let Ie=ut/de,Ae=jt[0]+(ae[0]-jt[0])*Ie,Ne=jt[1]+(ae[1]-jt[1])*Ie,_e=jt[2]+(ae[2]-jt[2])*Ie+.012,sn=Ae+Bt*X*.5,Ln=Ne+te*X*.5;for(let ce of[1,-1])it(Ae-Bt*X*.5-te*X*.75*ce,Ne-te*X*.5+Bt*X*.75*ce,sn,Ln,_e);ut+=Y}ut-=de}let Wt=new Be;return Wt.setAttribute("position",new Te(F,3)),Wt}function v(){for(let L of[...D.children])D.remove(L),L.geometry?.dispose(),L.isCSS2DObject&&L.element.remove();y=!0}let Q=new Qo({color:ji,dashSize:1.2,gapSize:.65,toneMapped:!1});function ot(L,Y,X=[]){v(),Tt=Y?.key||null;let B=[],F=null;for(let Bt of L.pts){if(Bt.kind==="elev"){F=null;continue}if(!F||F.f!==Bt.f){let te=F&&F.pts[F.pts.length-1];F={f:Bt.f,pts:te?[te]:[]},B.push(F)}F.pts.push([Bt.x,Bt.y,Bt.z+.08])}for(let Bt of L.legs){if(Bt.kind==="walk"){let _e=Bt.pts.map(([Ln,ce])=>[Ln,ce,s(Bt.f).z+.1]),sn=new he(St(_e,1),Ft);sn.userData={f:Bt.f,mode:"overview"},sn.renderOrder=2,D.add(sn);continue}let te=L.pts[Bt.i0],Ie=L.pts[Bt.i1],Ae=new Be().setFromPoints([te,Ie].map(_e=>kn(_e.x,_e.y,_e.z+Ot(_e.f)+.1))),Ne=new Bi(Ae,Q);Ne.computeLineDistances(),Ne.userData.mode="overview",D.add(Ne)}for(let Bt of B){if(Bt.pts.length<2)continue;for(let[Ie,Ae,Ne]of[[St(Bt.pts,1.3),Gt,1],[St(Bt.pts,.6),Ft,2],[R(Bt.pts,3.2,.34,.09),zt,3]]){let _e=new he(Ie,Ae);_e.renderOrder=Ne,_e.userData={f:Bt.f,mode:"map",singleFloor:!0},D.add(_e)}let te=Bt.pts.map(Ie=>[Ie[0],Ie[1],Ie[2]-.05]);for(let[Ie,Ae,Ne]of[[St(te,1),ye,1],[St(te,.8),$t,2],[R(te,1.4,.34,.07),ve,3]]){let _e=new he(Ie,Ae);_e.renderOrder=Ne,_e.userData={f:Bt.f,mode:"walk"},D.add(_e)}}let it=L.pts[0],ut=L.pts[L.pts.length-1],Wt=tt(!0);Wt.scale.setScalar(we),Wt.position.copy(kn(it.x,it.y,it.z+.1)),Wt.userData={f:it.f,mode:"map"},D.add(Wt);let Dt=vt(!0);Dt.scale.setScalar(we),Dt.position.copy(kn(ut.x,ut.y,ut.z)),Dt.userData={f:ut.f,mode:"map"},D.add(Dt);let jt=tt();jt.position.copy(kn(it.x,it.y,it.z+.04)),jt.userData={f:it.f,mode:"walk"},D.add(jt);let ae=vt();ae.position.copy(kn(ut.x,ut.y,ut.z)),ae.userData={f:ut.f,mode:"walk"},D.add(ae);let de=L.legs;for(let Bt=0;Bt<de.length;Bt++){let te=de[Bt];if(te.kind==="walk")continue;let Ie=Bt>=2&&de[Bt-2].kind===te.kind&&de[Bt-2].id===te.id&&de[Bt-1].pts.length<=3,Ae=Bt+2<de.length&&de[Bt+2].kind===te.kind&&de[Bt+2].id===te.id&&de[Bt+1].pts.length<=3,Ne=te;for(let rn=Bt;rn+2<de.length&&de[rn+2].kind===te.kind&&de[rn+2].id===te.id&&de[rn+1].pts.length<=3;rn+=2)Ne=de[rn+2];let _e=te.to>te.from,sn=te.kind==="stair"?te.link.ramp.pts[_e?0:te.link.ramp.pts.length-1]:_e?te.link.pa:te.link.pb,Ln=te.kind==="stair"?te.link.ramp.pts[_e?te.link.ramp.pts.length-1:0]:_e?te.link.pb:te.link.pa,ce=te.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8",wi=[];Ie||wi.push([sn,te.from,`${ce} ${_e?"\u2191":"\u2193"} ${Ne.to===0?"B1":Ne.to+"\uCE35"}`]),Ae||wi.push([Ln,te.to,`${ce}\uC5D0\uC11C \uB098\uC640\uC694`]);for(let[rn,li,hi]of wi){let Ai=document.createElement("div");Ai.className="route-tag",Ai.textContent=hi;let ui=new to(Ai);ui.position.copy(kn(rn[0],rn[1],s(li).z+1.6)),ui.userData={f:li,overviewLabel:!0},D.add(ui)}}ft=[],X.forEach((Bt,te)=>{if(Bt.kind==="start"||Bt.kind==="arrive"||!Bt.at)return;let Ie=document.createElement("div");Ie.className="step-dot"+(Bt.kind==="stair"||Bt.kind==="elev"?" vertical":""),Ie.textContent=te;let Ae=new to(Ie);Ae.position.copy(kn(Bt.at[0],Bt.at[1],s(Bt.f).z+.3)),Ae.userData.f=Bt.f,Ae.userData.step=te,D.add(Ae),ft.push(Ae)}),G(),It()}let ft=[];function ct(L){for(let Y of ft)Y.element.classList.toggle("on",Y.userData.step===L);y=!0}function Zt(L){Tt=L?L.key:null,It(),y=!0}function tt(L=!1){let Y=new tn,X=new he(new Ns(.2,.28,40),new De({toneMapped:!1,color:ji,side:Ce,depthTest:!L})),B=new he(new _i(.1,24),new De({toneMapped:!1,color:ji,side:Ce,depthTest:!L}));return X.rotation.x=B.rotation.x=-Math.PI/2,L&&(X.renderOrder=B.renderOrder=4),Y.add(X,B),Y}function vt(L=!1){let Y=new tn,X=new De({toneMapped:!1,color:ji,side:Ce}),B=new he(new Ns(.36,.44,48),X),F=new he(new Ns(.2,.25,40),new De({toneMapped:!1,color:16777215,side:Ce})),it=new he(new _i(.36,48),new De({toneMapped:!1,color:ji,transparent:!0,opacity:.18,depthWrite:!1,side:Ce}));for(let Dt of[B,F,it])Dt.rotation.x=-Math.PI/2,Dt.position.y=.04;let ut=new he(new Ur(.012,.012,1.05,10),X);ut.position.y=.55;let Wt=new he(new Fs(.12,24,16),new zi({toneMapped:!1,color:tS,emissive:2758016}));return Wt.position.y=1.15,Y.add(it,B,F,ut,Wt),L&&[it,B,F,ut,Wt].forEach((Dt,jt)=>{Dt.material=Dt.material.clone(),Dt.material.depthTest=!1,Dt.renderOrder=4+jt}),Y}function bt(){let L=new tn,Y=new he(new _i(1.4,30),new De({toneMapped:!1,color:4033535,transparent:!0,opacity:.22,depthTest:!1})),X=new he(new _i(.55,24),new De({toneMapped:!1,color:4033535,depthTest:!1})),B=new he(new _i(2.6,24,-.45,.9),new De({toneMapped:!1,color:4033535,transparent:!0,opacity:.3,depthTest:!1}));for(let F of[Y,X,B])F.rotation.x=-Math.PI/2,F.renderOrder=6;return L.add(Y,B,X),L.userData.cone=B,L}function ht(L){k.userData.floor=L?.f,k.visible=!!L&&L.f===p&&!S&&!A,L&&(k.position.copy(kn(L.x,L.y,s(L.f).z+.12)),k.userData.cone.visible=L.yaw!=null,k.rotation.y=(L.yaw??90)*Math.PI/180),y=!0}let mt={x:0,y:0,z:0,f:1,yaw:0,pitch:-.12};function Ht(L){S=L,m.enabled=!L,a.toneMappingExposure=L?Ks.exposure:Ks.mapExposure,G(),It()}let qt=null;function Ut(L){Object.assign(mt,L),mt.f!==qt&&(qt=mt.f,G())}let se=0,O="";return(function L(Y){if(requestAnimationFrame(L),S){let B=`${mt.x.toFixed(3)},${mt.y.toFixed(3)},${mt.z.toFixed(3)},${mt.yaw.toFixed(2)},${mt.pitch.toFixed(3)}`,F=B!==O;if(F?(O=B,l=Y,h(o)):c!==r&&Y-l>250&&(h(r),y=!0),!F&&!y)return;y=!1,_.position.set(mt.x,mt.z+1.6,-mt.y),_.rotation.set(mt.pitch,(mt.yaw-90)*Math.PI/180,0),a.render(f,_),Y-se>120&&(It(),se=Y),u.render(f,_);return}if(N){let B=Math.min(1,(Y-N.t0)/N.dur),F=B<.5?2*B*B:1-(-2*B+2)**2/2;g.position.lerpVectors(N.cam0,N.cam1,F),m.target.lerpVectors(N.tgt0,N.tgt1,F),B>=1&&(N=null),y=!0}m.update()||!!N?(y=!0,l=Y,h(o)):c!==r&&Y-l>250&&(h(r),y=!0),y&&(y=!1,Y-se>120&&(It(),se=Y),a.render(f,g),u.render(f,g))})(performance.now()),{load:nt,resize:K,setFloor:pt,setFloorOverview:gt,get floorOverview(){return A},get floor(){return p},frame:Lt,fit:Kt,focus:P,showRoute:ot,highlightStep:ct,clearRoute:v,select:Zt,setMe:ht,setFirstPerson:Ht,setWalkPose:Ut,nodes:x,redraw:()=>y=!0}}var ji,tS,kn,Um=Qe(()=>{jn();um();ym();Em();ku();wm();Dm();ji=7950591,tS=5451986,kn=(i,t,e)=>new I(i,e,-t)});function eS(){let i=[];for(let t=0;t<20;t++)for(let e=0;e<18;e++)i.push([(-18+2/2+e*2)*vf,(12-2/2-t*2)*vf]);return i}function no(i){return Math.atan2(i[5],i[2])}function Mf(i,t,e){let n=no(e),s=new Float32Array(360),{data:r,w:o,h:a}=i;for(let c=0;c<Fm.length;c++){let[l,h]=Fm[c],u=n-l,f=Math.cos(h),d=f*Math.cos(u),g=f*Math.sin(u),_=Math.sin(h),m=e[0]*d+e[3]*g+e[6]*_,p=e[1]*d+e[4]*g+e[7]*_,S=e[2]*d+e[5]*g+e[8]*_;if(S<=.05){s[c]=NaN;continue}let y=t.fx*m/S+t.cx,x=t.fy*p/S+t.cy;if(y<1||x<1||y>o-2||x>a-2){s[c]=NaN;continue}let T=Math.floor(y),w=Math.floor(x),A=y-T,U=x-w,b=w*o+T;s[c]=r[b]*(1-A)*(1-U)+r[b+1]*A*(1-U)+r[b+o]*(1-A)*U+r[b+o+1]*A*U}return s}function Sf(i,t,e,n){let s=Math.max(1,Math.ceil(n*2.5)),r=[],o=0;for(let l=-s;l<=s;l++){let h=Math.exp(-(l*l)/(2*n*n));r.push(h),o+=h}for(let l=0;l<r.length;l++)r[l]/=o;let a=new Float32Array(t*e),c=new Float32Array(t*e);for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=i[l*t+Math.min(t-1,Math.max(0,h+f))]*r[f+s];a[l*t+h]=u}for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=a[Math.min(e-1,Math.max(0,l+f))*t+h]*r[f+s];c[l*t+h]=u}return c}var vf,Fm,bf,Ef=Qe(()=>{vf=Math.PI/180;Fm=eS();bf=i=>i*Math.tan(2*vf)*.45});function Bm(i){return i.map(t=>t.kind==="stair"?{kind:"stair",fa:t.fa,pa:t.ramp.pts[0],fb:t.fb,pb:t.ramp.pts[t.ramp.pts.length-1],da:Om(t.ramp.pts[0],t.ramp.pts[Math.min(2,t.ramp.pts.length-1)]),db:Om(t.ramp.pts[t.ramp.pts.length-1],t.ramp.pts[Math.max(0,t.ramp.pts.length-3)])}:{kind:"elev",fa:t.fa,pa:t.pa,fb:t.fb,pb:t.pb})}var MT,Om,km=Qe(()=>{Ef();MT=Math.PI/180,Om=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*180/Math.PI});function zm(i,t,e){let n=Math.floor(e*.2),s=Math.ceil(e*.8),r=new Float32Array(t);for(let l=1;l<t-1;l++){let h=0;for(let u=n;u<s;u++){let f=u*t+l;h+=Math.abs(i[f+1]-i[f-1])}r[l]=h/(s-n)}r[0]=r[1],r[t-1]=r[t-2];let o=0;for(let l of r)o+=l;o/=t;let a=0;for(let l=0;l<t;l++)r[l]-=o,a+=r[l]*r[l];let c=Math.sqrt(a/t)||1;for(let l=0;l<t;l++)r[l]/=c;return r}function Af(i,t){let e=(d,g)=>[d[g],d[3+g],d[6+g]],n=(d,g)=>d[0]*g[0]+d[1]*g[1]+d[2]*g[2],s=e(i,0),r=e(i,1),o=e(i,2),a=e(t,2),c=e(t,0),l=n(a,s),h=n(a,r),u=n(a,o),f=n(c,r);return{yaw:Math.atan2(l,u)/io,pitch:Math.atan2(h,u)/io,roll:Math.asin(Math.max(-1,Math.min(1,f)))/io}}function Hm(i,t,e,n,s){let o=new Float64Array(180),a=0;for(let p=2;p<e-2;p++)for(let S=2;S<t-2;S++){let y=p*t+S,x=i[y-t+1]+2*i[y+1]+i[y+t+1]-i[y-t-1]-2*i[y-1]-i[y+t-1],T=i[y+t-1]+2*i[y+t]+i[y+t+1]-i[y-t-1]-2*i[y-t]-i[y-t+1],w=Math.hypot(x,T);if(w<90)continue;let A=(S-n.cx)/n.fx,U=(p-n.cy)/n.fy,b=Math.atan2(x,-T),M=Tf(A,U,b,n,s);if(M==null)continue;let D=Tf(A,U,b-.035,n,s),z=Tf(A,U,b+.035,n,s);if(D==null||z==null)continue;let k=Math.abs(wf(z*4,D*4))/4;if(k>6)continue;let K=M,nt=Math.min(1,w/300)/(1+(k/1.5)**2),Z=K*2,yt=Math.floor(Z)%180,J=Z-Math.floor(Z);o[yt]+=nt*(1-J),o[(yt+1)%180]+=nt*J,a++}if(a<150)return null;let c=new Float64Array(180);for(let p=0;p<180;p++){let S=0;for(let y=-6;y<=6;y++)S+=o[(p+y+180)%180]*Math.exp(-(y*y)/8);c[p]=S}let l=0;for(let p=1;p<180;p++)c[p]>c[l]&&(l=p);let h=0;for(let p=0;p<180;p++)Math.min(Math.abs(p-l),180-Math.abs(p-l))>12&&(h=Math.max(h,c[p]));let u=c[(l-1+180)%180],f=c[l],d=c[(l+1)%180],g=u-2*f+d,_=g<0?.5*(u-d)/g:0;return{axis:((l+_)/2%90+90)%90,ratio:f/(h||1e-9),n:a}}function Tf(i,t,e,n,s){let r=Math.cos(e)/n.fx,o=Math.sin(e)/n.fy,a=-o,c=r,l=i*o-t*r,h=s[0]*a+s[1]*c+s[2]*l,u=s[3]*a+s[4]*c+s[5]*l,f=s[6]*a+s[7]*c+s[8]*l,d=Math.hypot(h,u,f);h/=d,u/=d,f/=d;let g=Math.hypot(h,u);return Math.abs(f)<.25||g<.25?null:((Math.atan2(u,h)/io+90)%90+90)%90}var io,wf,kl,_a,Vm=Qe(()=>{io=Math.PI/180,wf=(i,t)=>((i-t)%360+540)%360-180;kl=class{constructor(t,e=null){this.long=t,this.prev=null,this.samples=[],this.fov=e}add(t,e,n){let s=this.prev;if(this.prev={P:t,R:e,t:n},!s||n-s.t>.35||t.length!==s.P.length)return null;let r=Af(s.R,e);if(Math.abs(r.yaw)<3||Math.abs(r.yaw)>14||Math.abs(r.pitch)>1.5||Math.abs(r.roll)>1.5)return null;let o=t.length,a=(o-1)/2,c=r.yaw*io,l=-2,h=null,u=-2,f=[];for(let g=40;g<=95;g+=.5){let _=this.long/2/Math.tan(g/2*io),m=0,p=0;for(let y=0;y<o;y++){let x=a+_*Math.tan(Math.atan((y-a)/_)+c);if(x<0||x>o-1)continue;let T=Math.floor(x),w=x-T,A=s.P[T]*(1-w)+s.P[Math.min(o-1,T+1)]*w;m+=A*t[y],p++}if(p<o*.5)continue;let S=m/p;f.push([g,S]),S>l&&(l=S,h=g)}if(l<.75||h==null||h<=40||h>=95)return null;for(let[g,_]of f)Math.abs(g-h)>8&&(u=Math.max(u,_));if(l-u<.05)return null;let d=h;if(this.samples.push(d),this.samples.length>60&&this.samples.shift(),this.samples.length>=8){let g=[...this.samples].sort((_,m)=>_-m);this.fov=g[g.length>>1]}return this.fov}};_a=class{constructor(t=24){this.N=t,this.s=[],this.value=null}add(t,e=1){return this.value!=null&&this.s.length>=6&&Math.abs(wf(t,this.value))>20?this.value:(this.s.push({v:t,w:e}),this.s.length>this.N&&this.s.shift(),this.value=this._median(),this.value)}get n(){return this.s.length}reset(){this.s=[],this.value=null}_median(){let t=this.s[0].v,e=this.s.map(r=>({v:t+wf(r.v,t),w:r.w}));e.sort((r,o)=>r.v-o.v);let n=e.reduce((r,o)=>r+o.w,0),s=0;for(let r of e)if(s+=r.w,s>=n/2)return r.v;return e[e.length-1].v}}});function iS(){try{ro=ro||new(window.AudioContext||window.webkitAudioContext);let i=ro.currentTime;for(let[t,e]of[[880,0],[660,.18]]){let n=ro.createOscillator(),s=ro.createGain();n.type="sine",n.frequency.value=t,s.gain.setValueAtTime(1e-4,i+e),s.gain.exponentialRampToValueAtTime(.18,i+e+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+e+.5),n.connect(s).connect(ro.destination),n.start(i+e),n.stop(i+e+.55)}}catch{}}function zl({from:i,to:t,title:e,hint:n,hold:s=!1,onSkip:r}){let o=nS("#lift"),a=o.querySelector(".lift-floor"),c=o.querySelector(".lift-arrow"),l=o.querySelector(".lift-msg"),h=o.querySelector(".lift-sub"),u=o.querySelector(".lift-skip"),f=t>i,d=i,g=!1,_=!1,m=null,p=null,S,y=new Promise(A=>S=A);o.hidden=!1,o.className="lift",c.textContent=f?"\u25B2":"\u25BC",a.textContent=on(i),l.textContent=e||`${on(t)}\uB85C \uC774\uB3D9 \uC911`,h.textContent=n||"",u.hidden=!s,u.onclick=()=>{r?.(),w.arrive()},requestAnimationFrame(()=>o.classList.add("show"));function x(A){a.classList.remove("flip"),a.offsetWidth,a.textContent=on(A),a.classList.add("flip")}async function T(){for(await so(350),o.classList.add("closed"),await so(700),o.classList.add("moving");!g&&!_&&d!==t;){if(await so(1100),g||_)return;d+=f?1:-1,x(d)}}let w={finished:y,async arrive(){if(_||g)return y;for(_=!0,await p;d!==t;)d+=f?1:-1,x(d),await so(260);o.classList.remove("moving"),o.classList.add("arrived"),iS(),l.textContent=`${on(t)} \uB3C4\uCC29`,u.hidden=!0,await so(600),o.classList.remove("closed"),await so(750),w.close()},close(){g||(g=!0,S(),clearTimeout(m),o.classList.remove("show"),setTimeout(()=>o.hidden=!0,250))},get arrived(){return _}};return p=T().catch(()=>{}),s||p.then(()=>w.arrive()),w}var nS,so,ro,Gm,nn,Rf=Qe(()=>{ho();nS=i=>document.querySelector(i),so=i=>new Promise(t=>setTimeout(t,i)),ro=null;Gm="sai-indoor-voice",nn={get on(){try{return localStorage.getItem(Gm)==="1"}catch{return!1}},set on(i){try{localStorage.setItem(Gm,i?"1":"0")}catch{}i||speechSynthesis?.cancel()},supported:typeof window<"u"&&"speechSynthesis"in window,say(i){if(!(!this.supported||!this.on||!i))try{speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(i.replace(/·/g,","));t.lang="ko-KR",t.rate=1.05,speechSynthesis.speak(t)}catch{}}}});function Hl(i){let t=document.createElement("img");return t.src=`ui/${i}.svg`,t.alt="",t.setAttribute("aria-hidden","true"),t}function oo(i,t,e=!1){let n=sS[t];e&&(t==="start"||t==="straight")&&(n="guide-up"),i.replaceChildren(n?Hl(n):document.createTextNode(rS[t]||"\u2191")),i.setAttribute("aria-hidden","true")}var sS,rS,Cf=Qe(()=>{sS={start:"step-up",straight:"step-up",right:"step-right","stair-up":"step-stairs",arrive:"step-arrive"},rS={left:"\u2190","slight-left":"\u2196","slight-right":"\u2197","u-left":"\u21B6","u-right":"\u21B7","stair-down":"\u21E3",elev:"\u21C5"}});async function Wm(){try{return!!navigator.xr&&await navigator.xr.isSessionSupported("immersive-ar")}catch{return!1}}async function Xm(i,t){let e=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["local-floor"],optionalFeatures:["camera-access","dom-overlay"],domOverlay:{root:t}}),n=e.enabledFeatures,s=[];if(n&&!n.includes("camera-access")&&s.push("camera-access"),e.domOverlayState||s.push("dom-overlay"),s.length)throw await e.end().catch(()=>{}),new Error(`\uC774 \uAE30\uAE30\uC758 WebXR\uC5D0 ${s.join(", ")} \uAE30\uB2A5\uC774 \uC5C6\uC5B4\uC694`);return i.xr.enabled=!0,i.xr.setReferenceSpaceType("local-floor"),await i.xr.setSession(e),e}var Vl,qm=Qe(()=>{jn();Vl=class{constructor(t,e=220,n=!1){this.r=t,this.long=e,this.flip=n,this.rt=null,this.buf=null,this.mat=new Vn({uniforms:{map:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D map; varying vec2 vUv; void main(){ vec3 c = texture2D(map, vUv).rgb; float g = dot(c, vec3(0.299, 0.587, 0.114)); gl_FragColor = vec4(g, g, g, 1.0); }",depthTest:!1,depthWrite:!1}),this.scene=new ri;let s=new he(new Ds(2,2),this.mat);s.frustumCulled=!1,this.scene.add(s),this.cam=new Wi(-1,1,1,-1,0,1)}grab(t){let e=this.r.xr.getCameraTexture(t);if(!e||!t.width)return null;let n=this.long/Math.max(t.width,t.height),s=Math.round(t.width*n),r=Math.round(t.height*n);(!this.rt||this.rt.width!==s||this.rt.height!==r)&&(this.rt?.dispose(),this.rt=new $n(s,r,{depthBuffer:!1}),this.buf=new Uint8Array(s*r*4)),this.mat.uniforms.map.value=e;let o=this.r,a=o.getRenderTarget(),c=o.xr.enabled;o.xr.enabled=!1,o.setRenderTarget(this.rt),o.render(this.scene,this.cam),o.readRenderTargetPixels(this.rt,0,0,s,r,this.buf),o.setRenderTarget(a),o.xr.enabled=c;let l=new Float32Array(s*r);for(let h=0;h<r;h++){let u=this.flip?h:r-1-h;for(let f=0;f<s;f++)l[h*s+f]=this.buf[(u*s+f)*4]}return{g:l,w:s,h:r}}dispose(){this.rt?.dispose(),this.mat.dispose()}}});function Ym(i){let t=l=>[l[0],-l[2],l[1]],e=t([i[0],i[1],i[2]]),n=t([i[4],i[5],i[6]]),s=t([i[8],i[9],i[10]]),r=e,o=[-n[0],-n[1],-n[2]],a=[-s[0],-s[1],-s[2]];return{R:[r[0],o[0],a[0],r[1],o[1],a[1],r[2],o[2],a[2]],x:i[12],y:-i[14],h:i[13]}}function $m(i,t,e){return{fx:i[0]*t/2,fy:i[5]*e/2,cx:t/2*(1-i[8]),cy:e/2*(1+i[9])}}function Xl(i){return Math.atan2(i[5],i[2])/wn}function Zm(i,t){let e=-i.off*wn,n=-i.tx,s=i.ty;return{rotY:e,px:Math.cos(e)*n+Math.sin(e)*s,py:t,pz:-Math.sin(e)*n+Math.cos(e)*s}}var wn,ao,xa,Gl,Wl,Km=Qe(()=>{wn=Math.PI/180,ao=(i,t)=>((i-t)%360+540)%360-180;xa=class i{constructor(){this.off=null,this.tx=0,this.ty=0,this.pending=null,this.n=0}get ok(){return this.off!=null}static solve(t,e,n){let s=Math.cos(n*wn),r=Math.sin(n*wn);return{off:n,tx:t.x-(s*e.x-r*e.y),ty:t.y-(r*e.x+s*e.y)}}update(t,e,n,s=.5){let r=i.solve(t,e,n);if(!this.ok)return Object.assign(this,r,{pending:null,n:1}),"set";let o=this.toBuilding(e.x,e.y),a=Math.hypot(o.x-t.x,o.y-t.y),c=ao(n,this.off);if(a>3||Math.abs(c)>15){let f=this.pending;return this.pending=r,f&&Math.abs(ao(f.off,r.off))<8&&Math.hypot(f.tx-r.tx,f.ty-r.ty)<2?(Object.assign(this,r,{pending:null}),this.n++,"snap"):"hold"}this.pending=null;let l=Math.min(.5,.25*s+.05),h=this.off+c*l,u={x:o.x+(t.x-o.x)*l,y:o.y+(t.y-o.y)*l};return Object.assign(this,i.solve(u,e,h)),this.n++,"blend"}toBuilding(t,e){let n=Math.cos(this.off*wn),s=Math.sin(this.off*wn);return{x:n*t-s*e+this.tx,y:s*t+n*e+this.ty}}toSensor(t,e){let n=Math.cos(this.off*wn),s=Math.sin(this.off*wn),r=t-this.tx,o=e-this.ty;return{x:n*r+s*o,y:-s*r+n*o}}},Gl=class{constructor(t=4){this.FH=t,this.ref=null,this.floorY=0,this.idx=0}shift(t){this.idx+=t}reset(t,e=null){this.ref=t,e!=null&&(this.floorY=e)}update(t){if(this.ref==null)return this.ref=t,0;let e=t-this.ref;return e>this.FH*.75?(this.ref+=this.FH,this.floorY+=this.FH,this.idx++,1):e<-this.FH*.75?(this.ref-=this.FH,this.floorY-=this.FH,this.idx--,-1):(Math.abs(e)<.4&&(this.ref+=e*.02),0)}};Wl=class{constructor({window:t=30,posTol:e=1.5,yawTol:n=20,minInliers:s=6,minSpan:r=2.5,margin:o=.6}={}){Object.assign(this,{window:t,posTol:e,yawTol:n,minInliers:s,minSpan:r,margin:o}),this.obs=[],this.best=null}add(t,e,n,s){for(s.forEach((r,o)=>this.obs.push({t,sx:e.x,sy:e.y,syaw:e.yaw,lvl:n,f:r.f,x:r.x,y:r.y,yaw:r.yaw,w:Math.max(.05,r.ncc-.3)*(o===0?1:.6)}));this.obs.length&&t-this.obs[0].t>this.window;)this.obs.shift()}clear(){this.obs=[],this.best=null}solve(){let t=this.obs,e=[];for(let a of t){let c=ao(a.yaw,a.syaw),l=xa.solve({x:a.x,y:a.y},{x:a.sx,y:a.sy},c);e.push({...l,df:a.f-a.lvl,...this._score(l,a.f-a.lvl)})}e.sort((a,c)=>c.score-a.score);let n=e[0];if(!n||n.n<this.minInliers||n.span<this.minSpan)return this.best=null;let s=a=>{if(a.df!==n.df||Math.abs(ao(a.off,n.off))>10)return!0;let c=t[t.length-1],l=g=>{let _=Math.cos(g.off*wn),m=Math.sin(g.off*wn);return[_*c.sx-m*c.sy+g.tx,m*c.sx+_*c.sy+g.ty]},[h,u]=l(n),[f,d]=l(a);return Math.hypot(h-f,u-d)>3},r=e.find(a=>s(a));if(r&&r.score>n.score*this.margin)return this.best=null;let o=n;for(let a=0;a<2;a++){let c=0,l=0,h=0;for(let S of o.inl){let y=ao(S.yaw,S.syaw)*wn;c+=S.w*Math.cos(y),l+=S.w*Math.sin(y)}let u=Math.atan2(l,c)/wn,f=0,d=0,g=Math.cos(u*wn),_=Math.sin(u*wn);for(let S of o.inl)f+=S.w*(S.x-(g*S.sx-_*S.sy)),d+=S.w*(S.y-(_*S.sx+g*S.sy)),h+=S.w;let m={off:u,tx:f/h,ty:d/h},p=this._score(m,o.df);if(p.n<this.minInliers)break;o={...m,df:o.df,...p}}return this.best=o}_score(t,e){let n=Math.cos(t.off*wn),s=Math.sin(t.off*wn),r=0,o=0,a=[],c=1/0,l=-1/0,h=1/0,u=-1/0,f=new Set;for(let d of this.obs){if(d.f-d.lvl!==e)continue;let g=n*d.sx-s*d.sy+t.tx,_=s*d.sx+n*d.sy+t.ty,m=Math.hypot(g-d.x,_-d.y);m>this.posTol||Math.abs(ao(d.yaw,d.syaw+t.off))>this.yawTol||(a.push(d),r+=d.w*(1-m/(2*this.posTol)),f.has(d.t)||(f.add(d.t),o++),c=Math.min(c,d.sx),l=Math.max(l,d.sx),h=Math.min(h,d.sy),u=Math.max(u,d.sy))}return{score:r,n:o,inl:a,span:o?Math.hypot(l-c,u-h):0}}}});function If(i,t){let e=[Math.cos(t)*Math.cos(i),Math.cos(t)*Math.sin(i),Math.sin(t)],n=[Math.sin(i),-Math.cos(i),0],s=[Math.sin(t)*Math.cos(i),Math.sin(t)*Math.sin(i),-Math.cos(t)];return[n[0],s[0],e[0],n[1],s[1],e[1],n[2],s[2],e[2]]}function Yl(i){let t=screen.orientation&&screen.orientation.angle||window.orientation||0,e=va(va(Pf(i.alpha*Je),cS(i.beta*Je)),lS(i.gamma*Je));return va(va(e,Pf(t*Je)),hS)}async function jm(i){let{indoor:t,dest:e,mode:n,demo:s,assets:r="assets/",onClose:o,onRoute:a}=i,c=i.route,l=$e("#ar"),h=$e("#ar-video"),u=$e("#ar-gl"),f={step:$e("#ar-step-text"),sub:$e("#ar-step-sub"),arrow:$e("#ar-arrow"),status:$e("#ar-status"),coach:$e("#ar-coach"),dest:$e("#ar-dest"),remain:$e("#ar-remain"),err:$e("#ar-error"),arrive:$e("#ar-arrive"),mini:$e("#ar-mini")};l.hidden=!1,f.err.hidden=!0,f.arrive.hidden=!0,f.coach.hidden=!1,f.dest.textContent=[e.name||e.title,Ye(e.f)].join(" \xB7 "),$e("#ar-distance").textContent=`${e.title}\uAE4C\uC9C0 ${Math.round(c.len)}m`,f.step.textContent="\uC704\uCE58\uB97C \uCC3E\uB294 \uC911",f.sub.textContent="",f.status.className="ar-status searching",f.status.textContent="\uC704\uCE58\uB97C \uCC3E\uB294 \uC911",oo(f.arrow,"straight",!0),f.arrow.dataset.icon="straight",Me("searching","\uC704\uCE58\uB97C \uCC3E\uB294 \uC911");let d=!1;if(!s){try{typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?d=await DeviceOrientationEvent.requestPermission()==="granted":d="DeviceOrientationEvent"in window}catch{d=!1}try{typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()}catch{}}let g=!1,_=null,m=null,p=+new URLSearchParams(location.search).get("fov")||0,S=0;try{S=+localStorage.getItem("sai-ar-fov")||0}catch{}let y=p||S||aS,x=null,T=new URLSearchParams(location.search),w=T.has("debug"),A=!s&&!T.has("legacy")&&await Wm();async function U(){if(!window.isSecureContext)throw Object.assign(new Error("HTTPS \uC8FC\uC18C\uC5D0\uC11C\uB9CC \uCE74\uBA54\uB77C\uB97C \uC4F8 \uC218 \uC788\uC5B4\uC694."),{code:"insecure"});if(!navigator.mediaDevices?.getUserMedia)throw Object.assign(new Error("\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uCE74\uBA54\uB77C\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694."),{code:"nocam"});_=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:960},height:{ideal:720}}}),h.srcObject=_,h.loop=!1,await h.play()}async function b(){let V=await fetch(r+"demo.json").then(j=>j.json());m=V,h.srcObject=null,h.src=r+V.video,h.loop=!1,h.muted=!0,await h.play().catch(()=>{})}try{s?await b():A||await U()}catch(V){He(V);let j=()=>{g=!0,_?.getTracks().forEach(xt=>xt.stop()),l.hidden=!0,o?.()};return $e("#ar-error-close").onclick=j,$e("#ar-demo").onclick=()=>{j(),i.onDemo?.()},{close:j}}let M=null,D=async()=>{try{M=await navigator.wakeLock?.request("screen")}catch{}};D();let z=!1,k=()=>{document.hidden?(z=!0,m&&h.pause()):z&&(z=!1,D(),J?.postMessage({type:"reset"}),C.ok=!1,W.init=!1,m?h.play().catch(()=>{}):h.play().catch(()=>{}))};document.addEventListener("visibilitychange",k);let K=null,nt=V=>{V.alpha==null||A||(K={alpha:V.alpha,beta:V.beta,gamma:V.gamma,t:performance.now()})};!m&&d&&addEventListener("deviceorientation",nt);let Z={on:!1,lp:9.8,hi:!1,lastT:0,lo:99,top:0},yt=V=>{let j=V.accelerationIncludingGravity;if(!j||j.x==null||A)return;Z.on=!0,Z.lp+=(Math.hypot(j.x,j.y,j.z)-Z.lp)*.25,Z.lo=Math.min(Z.lo,Z.lp),Z.top=Math.max(Z.top,Z.lp);let xt=performance.now();if(!Z.hi&&Z.lp>10.8&&xt-Z.lastT>280)Z.hi=!0;else if(Z.hi&&Z.lp<9.9){Z.hi=!1,Z.lastT=xt;let dt=Math.max(.45,Math.min(.85,.48*Math.pow(Math.max(.5,Z.top-Z.lo),.25)));Z.lo=99,Z.top=0;let Et=mt();Z.n=(Z.n||0)+1,Et!=null&&Tt&&!$t&&(J.postMessage({type:"step",len:dt,yaw:Et}),qt(Et))}};m||addEventListener("devicemotion",yt);let J=new Worker("ar-worker.js"),Tt=!1,It=!1,Ot=0,G=0;J.onmessage=V=>{let j=V.data;j.type==="ready"?Tt=!0:j.type==="error"?He(new Error(`\uC704\uCE58 \uC778\uC2DD \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. ${j.message}`)):j.type==="pose"?(j.id&&(It=!1,G=j.ms),j.cands&&ht(j.id,j.cands),Ht(j.r,j.id)):j.type==="motion"&&Ut(j.r)};let et=t.M;J.postMessage({type:"init",indexUrl:new URL(r+"ar-index.bin",location.href).href,svUrl:new URL(r+"sv.json",location.href).href,portals:Bm(t.links),grid:{gx0:et.gx0,gy1:et.gy1,cell:et.cell,gw:et.gw,gh:et.gh,floors:et.floors.map(V=>({n:V.n,grid:V.grid}))}});let rt=document.createElement("canvas"),at=rt.getContext("2d",{willReadFrequently:!0});function N(){let V=h.videoWidth,j=h.videoHeight;if(!V||!j)return null;let xt=220/Math.max(V,j),dt=Math.round(V*xt),Et=Math.round(j*xt);rt.width!==dt&&(rt.width=dt,rt.height=Et),at.drawImage(h,0,0,dt,Et);let wt=at.getImageData(0,0,dt,Et).data,lt=new Float32Array(dt*Et);for(let Pt=0,ne=0;Pt<lt.length;Pt++,ne+=4)lt[Pt]=.299*wt[ne]+.587*wt[ne+1]+.114*wt[ne+2];let Mt;if(m){let Pt=dt/m.K[4];Mt={fx:m.K[0]*Pt,fy:m.K[1]*Pt,cx:m.K[2]*Pt,cy:m.K[3]*Pt}}else{let Pt=Math.max(dt,Et)/2/Math.tan(y/2*Je);Mt={fx:Pt,fy:Pt,cx:dt/2,cy:Et/2}}return{img:{data:Sf(lt,dt,Et,bf(Mt.fx)),w:dt,h:Et},K:Mt,raw:{g:lt,w:dt,h:Et}}}let C={ok:!1,x:0,y:0,f:c.pts[0].f,yaw:90,conf:0,lastFix:0},W={x:0,y:0,yaw:90,init:!1},gt=null,pt=new _a,Lt=[],Kt=0,P=!1,Vt=Qi(c),St=i.steps||nr(c,e,{landmarks:t.destinations}),Ft=0,Gt=0,we=!1,zt=-1,$t=null,ye=null,ve=new Set,R=new Set,v=m?(m.pitchDeg||-6)*Je:0,Q=new Map;for(let V of t.floors){let j=[];for(let xt of t.FL(V).rooms){let dt=xt.poly;for(let Et=0;Et<dt.length;Et++){let wt=dt[Et],lt=dt[(Et+1)%dt.length],Mt=Math.hypot(lt[0]-wt[0],lt[1]-wt[1]);if(Mt<1)continue;let Pt=Math.atan2(lt[1]-wt[1],lt[0]-wt[0])/Je;Pt=(Pt%90+90)%90,j.push({x:(wt[0]+lt[0])/2,y:(wt[1]+lt[1])/2,L:Mt,t:Pt})}}Q.set(V,j)}function ot(V,j,xt){let dt=[],Et=0;for(let lt of Q.get(V)||[]){if(Math.hypot(lt.x-j,lt.y-xt)>10)continue;Et+=lt.L;let Mt=dt.find(Pt=>Math.abs(ci(Pt.t*4,lt.t*4))/4<2);Mt?(Mt.t=(Mt.t*Mt.L+(Mt.t+ci(lt.t*4,Mt.t*4)/4)*lt.L)/(Mt.L+lt.L),Mt.L+=lt.L):dt.push({t:lt.t,L:lt.L})}let wt=dt.sort((lt,Mt)=>Mt.L-lt.L)[0];return wt&&wt.L>Et*.75?wt.t:null}let ft=new _a(15),ct=0,Zt=null,tt=0;function vt(V){return ft.n>=3&&V-ct<2e4?ft.value:pt.value}function bt(V,j,xt){let dt=Zt,Et=tt;if(Zt=j,tt=xt,!C.ok||!dt||xt-Et>400)return;let wt=Af(dt,j);if(Math.abs(wt.yaw)>2.5||Math.abs(wt.pitch)>2.5)return;let lt=ot(C.f,W.x,W.y);if(lt==null)return;let Mt=Hm(V.raw.g,V.raw.w,V.raw.h,V.K,j);if(!Mt||Mt.ratio<2.5)return;let Pt=gt??pt.value??C.off;if(Pt==null)return;let ne=lt-Mt.axis,Se=ne+90*Math.round(ci(Pt,ne)/90);Math.abs(ci(Se,Pt))>30||(ft.add(Se,Math.min(3,Mt.ratio/2)),ct=xt,ft.n>=3&&J.postMessage({type:"heading",off:ft.value,sd:5}))}function ht(V,j){let xt=H.q.get(V);if(!A||!xt||$t||g)return;let dt=performance.now();$.add(xt.t,xt,xt.lvl,j);let Et=$.solve();if(!Et||!H.last)return;let wt=H.last,lt=Math.cos(Et.off*Je),Mt=Math.sin(Et.off*Je),Pt={x:lt*wt.x-Mt*wt.y+Et.tx,y:Mt*wt.x+lt*wt.y+Et.ty},ne=Math.min(1,Et.n/12),Se=!_t.ok,Xe=_t.update(Pt,{x:wt.x,y:wt.y},Et.off,ne);if(Xe==="hold")return;let Re=Nt.idx+Et.df;t.floors.includes(Re)&&(C.f=Re),C.conf=ne,C.off=_t.off,C.lastFix=dt,(Xe==="set"||Xe==="snap")&&(ae=!0),Se&&(f.coach.hidden=!0,ya(40)),Kt=0,P=!1,Me("ok",`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Ye(C.f)}`),dt-H.fixT>2e3&&(H.fixT=dt,J.postMessage({type:"fix",fix:{f:C.f,x:Pt.x,y:Pt.y,yaw:wt.yaw+_t.off,conf:.8},yaw:wt.yaw}))}function mt(){return K?no(Yl(K))*180/Math.PI:null}function Ht(V,j){if(g)return;let xt=performance.now();if(j&&H.q.delete(j),$t)if(V.ok&&ye&&V.f===ye.to&&V.conf>.2)O();else return;if(A){_t.ok||Me("searching","\uC8FC\uBCC0\uC744 \uBE44\uCD94\uBA70 \uBA87 \uAC78\uC74C \uAC78\uC5B4 \uC8FC\uC138\uC694");return}if(V.ok&&C.ok){if(V.f!==C.f||Math.hypot(V.x-C.x,V.y-C.y)>5){let Et=C.jump;if(C.jump={f:V.f,x:V.x,y:V.y},!Et||Et.f!==V.f||Math.hypot(Et.x-V.x,Et.y-V.y)>2.5)return}C.jump=null}if(V.ok){let dt=!C.ok;C.off=V.off,Object.assign(C,{ok:!0,x:V.x,y:V.y,f:V.f,yaw:V.yaw,conf:V.conf,lastFix:xt}),V.off!=null&&K&&V.conf>.35&&pt.add(V.off,V.conf),dt&&(f.coach.hidden=!0,ya(40)),Kt=0,P=!1,Me(V.conf>.35?"ok":"weak",V.conf>.35?`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Ye(V.f)}`:`\uC704\uCE58\uAC00 \uC870\uAE08 \uBD88\uD655\uC2E4\uD574\uC694 \xB7 ${Ye(V.f)}`),Y()}else C.ok&&xt-C.lastFix>ql*1e3&&!(A&&_t.ok)&&(C.ok=!1),(!C.ok||xt-C.lastFix>3e3)&&(Kt=Kt||xt,Me("searching",C.ok?"\uC704\uCE58\uB97C \uB2E4\uC2DC \uB9DE\uCD94\uB294 \uC911":"\uC8FC\uBCC0\uC744 \uCC9C\uCC9C\uD788 \uBE44\uCDB0 \uC8FC\uC138\uC694"),C.ok||(f.coach.hidden=!1),!P&&xt-Kt>6e3&&(P=!0,nn.say("\uD734\uB300\uD3F0\uC744 \uC138\uC6CC\uC11C \uCC9C\uCC9C\uD788 \uC88C\uC6B0\uB85C \uBE44\uCDB0 \uC8FC\uC138\uC694")))}function qt(V){let j=performance.now();for(Lt.push({yaw:V,t:j});Lt.length&&j-Lt[0].t>5e3;)Lt.shift();if(Lt.length<6||!C.ok||W.s==null||Z.n%2)return;let xt=Lt.slice(-6).map(Re=>Re.yaw),dt=0,Et=0;for(let Re of xt)dt+=Math.cos(Re*Je),Et+=Math.sin(Re*Je);let wt=Math.atan2(Et,dt)/Je;if(xt.some(Re=>Math.abs(ci(Re,wt))>10))return;let lt=en(c,Vt,Math.max(0,W.s-3)),Mt=en(c,Vt,W.s+1),Pt=en(c,Vt,W.s+5);if(lt.f!==C.f||Pt.f!==C.f)return;let ne=(Re,yn)=>Math.atan2(yn.y-Re.y,yn.x-Re.x)/Je;if(Math.abs(ci(ne(lt,Mt),ne(Mt,Pt)))>8)return;let Se=ci(ne(lt,Pt),wt),Xe=vt(performance.now());Xe==null||Math.abs(ci(Se,Xe))>45||pt.add(Se,2.5)}function Ut(V){g||$t||!C.ok||V.f!==C.f||(C.x=V.x,C.y=V.y,Y())}function se(V){ye=V,R.add(V.s),A&&$.clear(),nn.say(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Ye(V.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`),ya([30,60,30]);let j=c.pts.find((xt,dt)=>xt.kind==="elev"&&xt.f===V.to&&c.pts[dt-1]?.kind==="elev");j&&J.postMessage({type:"lift",f:V.to,x:j.x,y:j.y}),$t=zl({from:V.f,to:V.to,title:`${on(V.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`,hint:"\uB0B4\uB9B0 \uB4A4 \uD734\uB300\uD3F0\uC744 \uC138\uC6CC \uBCF5\uB3C4\uB97C \uBE44\uCD94\uBA74 \uC774\uC5B4\uC11C \uC548\uB0B4\uD574\uC694",hold:!0,onSkip:()=>O(!0)})}function O(V=!1){if(!$t)return;let j=ye;V||$t.arrive(),$t=null,Ft=j.s,C.f=j.to,A&&H.last&&(Nt.reset(H.last.h,H.last.h-H.eye),Nt.shift(j.to-j.f)),W.init=!1,nn.say(`${Ye(j.to)}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`),ae=!0}function L(V,j){let xt=V.step,dt=Math.round(V.dist);return xt.kind==="arrive"?j.remain<3?`${e.title} \uB3C4\uCC29`:`${Math.round(j.remain)}m \uC55E ${e.title}`:xt.kind==="stair"||xt.kind==="elev"?V.dist<3?xt.text:`${dt}m \uC55E ${xt.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"}`:V.dist<4?`\uC9C0\uAE08 ${xt.action}`:`${dt}m \uC55E\uC5D0\uC11C ${xt.action}`}function Y(){if($t)return;let V=Ra(c,Vt,C,Ft);if(!V)return;if(V.off>6){if(C.conf>.4&&++Gt>=4){Gt=0;let Mt=t.routeTo({f:C.f,x:C.x,y:C.y},e,{mode:n});Mt&&(c=Mt,Vt=Qi(c),St=nr(c,e,{landmarks:t.destinations}),Ft=0,zt=-1,ve.clear(),ae=!0,a?.(c,St),Qt("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"),nn.say("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"))}return}Gt=0,Ft=Math.max(Ft-1,V.s);let j=uo(St,c,Vt,V.s);j.index!==zt&&(zt=j.index,ya(25),ae=!0);let xt=j.step;f.arrow.dataset.dir=xt.dir,f.step.textContent=L(j,V);let dt=St[j.index+1];f.sub.textContent=xt.kind==="arrive"?xt.sub||"":dt?`${xt.text} \xB7 \uB2E4\uC74C: ${dt.text}`:xt.text,f.remain.textContent=`\uB0A8\uC740 \uAC70\uB9AC ${Math.round(V.remain)}m \xB7 \uC57D ${Ca(V.remain)}`,$e("#ar-distance").textContent=`${e.title}\uAE4C\uC9C0 ${Math.round(V.remain)}m`;let Et=j.index*2,wt=Et+1,lt=C.conf>.3;if(lt&&xt.kind!=="arrive"&&j.dist<15&&j.dist>=4&&!ve.has(Et)?(ve.add(Et),nn.say(`${Math.round(j.dist)}\uBBF8\uD130 \uC55E, ${xt.text}`)):lt&&j.dist<4&&!ve.has(wt)&&xt.kind!=="elev"&&(ve.add(wt),nn.say(xt.kind==="arrive"?`${e.title}, ${xt.side||""}`:xt.text)),xt.kind==="elev"&&j.dist<3&&C.f===xt.f&&!R.has(xt.s)&&se(xt),V.remain<2.5&&C.f===c.pts[c.pts.length-1].f&&!we){we=!0,ya([60,40,60]);let Mt=St[St.length-1].side;f.arrive.querySelector("b").textContent=`${e.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694${Mt&&Mt!=="\uC815\uBA74"?` \xB7 \uBB38\uC740 ${Mt}`:""}`,f.arrive.hidden=!1}C.s=V.s}let X=new Kr({canvas:u,antialias:!0,alpha:!0});X.setPixelRatio(Math.min(devicePixelRatio,2)),X.setClearColor(0,0);let B=new ri;B.add(new Bs(16777215,8943530,2.2));let F=new Ke(60,1,.05,200),it=new tn;B.add(it);let ut=(V,j,xt)=>new I(V,xt,-j),Wt=(()=>{let V=document.createElement("canvas");V.width=64,V.height=64;let j=V.getContext("2d");j.fillStyle="rgba(121,80,255,0.78)",j.fillRect(0,0,64,64),j.strokeStyle="#fff",j.lineWidth=9,j.lineCap="round",j.lineJoin="round",j.beginPath(),j.moveTo(14,44),j.lineTo(32,22),j.lineTo(50,44),j.stroke();let xt=new ki(V);return xt.wrapS=xt.wrapT=Yn,xt.colorSpace=qe,xt})(),Dt=new De({map:Wt,transparent:!0,depthWrite:!1,side:Ce}),jt=null,ae=!0;function de(V){let j=V+15;for(let xt=1;xt<St.length;xt++){let dt=St[xt];if(!(dt.s<=V+.8)){if(dt.s>j)break;if(dt.kind==="walk"&&dt.dir!=="straight"&&dt.dir!=="start")return dt.s+1.2;if(dt.kind!=="walk"&&dt.kind!=="start")return dt.s}}return Math.min(j,Vt[Vt.length-1])}function Bt(V){if(jt&&(it.remove(jt),jt.geometry.dispose()),jt=null,!C.ok)return;let j=V??C.s??0,xt=Math.max(0,j+.8),dt=de(j),Et=t.FL(C.f).z,wt=[];for(let Re=xt;Re<=dt+1e-6;Re+=.5){let yn=en(c,Vt,Math.min(Re,dt));if(yn.f!==C.f||Math.abs(yn.z-Et)>.3)break;wt.push({...yn,z:Et})}if(wt.length<2)return;let lt=[],Mt=[],Pt=[],ne=.6,Se=0;for(let Re=0;Re<wt.length;Re++){let yn=wt[Math.max(0,Re-1)],Qs=wt[Math.min(wt.length-1,Re+1)],Dn=Qs.x-yn.x,Ri=Qs.y-yn.y,Ta=Math.hypot(Dn,Ri)||1;Dn/=Ta,Ri/=Ta;let _s=wt[Re];Re&&(Se+=Math.hypot(_s.x-wt[Re-1].x,_s.y-wt[Re-1].y)/ne);let zf=_s.z+.03;if(lt.push(_s.x-Ri*ne*.5,zf,-(_s.y+Dn*ne*.5),_s.x+Ri*ne*.5,zf,-(_s.y-Dn*ne*.5)),Mt.push(0,Se,1,Se),Re){let tr=Re*2;Pt.push(tr-2,tr-1,tr,tr,tr-1,tr+1)}}let Xe=new Be;Xe.setAttribute("position",new Te(lt,3)),Xe.setAttribute("uv",new Te(Mt,2)),Xe.setIndex(Pt),jt=new he(Xe,Dt),jt.renderOrder=1,it.add(jt)}let te=new De({color:7950591,transparent:!0,side:Ce,depthWrite:!1}),Ie=new Oi({color:16777215,transparent:!0}),Ae=(()=>{let j=new hs;j.moveTo(0,.55*1.5),j.lineTo(.42*1.5,.1*1.5),j.lineTo(.16*1.5,.1*1.5),j.lineTo(.16*1.5,-.45*1.5),j.lineTo(-.16*1.5,-.45*1.5),j.lineTo(-.16*1.5,.1*1.5),j.lineTo(-.42*1.5,.1*1.5),j.closePath();let xt=new Us(j);xt.rotateX(-Math.PI/2);let dt=new he(xt,te),Et=new Ps(new Wo(xt),Ie),wt=new tn;return wt.add(dt,Et),wt.renderOrder=2,wt.visible=!1,it.add(wt),wt})(),Ne=(()=>{let V=new tn,j=new zi({color:5451986,emissive:2758016}),xt=new he(new Fs(.22,20,14),j);xt.position.y=1.9;let dt=new he(new Go(.16,.6,16),j);dt.rotation.x=Math.PI,dt.position.y=1.55;let Et=document.createElement("canvas");Et.width=256,Et.height=80;let wt=Et.getContext("2d");wt.fillStyle="#5330d2",wt.beginPath(),wt.roundRect(4,4,248,72,36),wt.fill(),wt.fillStyle="#fff",wt.font="bold 40px 'Noto Sans KR', sans-serif",wt.textAlign="center",wt.textBaseline="middle",wt.fillText(e.title,128,42);let lt=new ki(Et);lt.colorSpace=qe;let Mt=new Uo(new Pr({map:lt,depthTest:!1,sizeAttenuation:!1}));return Mt.scale.set(.2,.0625,1),Mt.position.y=2.45,Mt.renderOrder=5,V.add(xt,dt,Mt),it.add(V),V})();function _e(){let V=l.clientWidth,j=l.clientHeight;X.setSize(V,j,!1);let xt=h.videoWidth||16,dt=h.videoHeight||9,Et;if(m)Et=2*Math.atan(m.K[5]/2/m.K[1]);else{let Pt=Math.max(xt,dt)/2/Math.tan(y/2*Je);Et=2*Math.atan(dt/2/Pt)}let wt=xt/dt,lt=V/j,Mt=lt<=wt?Et:2*Math.atan(Math.tan(Et/2)*wt/lt);F.fov=Mt/Je,F.aspect=lt,F.updateProjectionMatrix()}addEventListener("resize",_e),h.onloadedmetadata=_e,_e();let sn=new le;function Ln(V,j,xt,dt){let Et=(wt,lt)=>{let Mt=[V[wt]*lt,V[3+wt]*lt,V[6+wt]*lt];return new I(Mt[0],Mt[2],-Mt[1])};sn.makeBasis(Et(0,1),Et(1,-1),Et(2,-1)),F.quaternion.setFromRotationMatrix(sn),F.position.copy(ut(j,xt,dt))}let ce=f.mini.getContext("2d");function wi(V){let j=f.mini.width,xt=4.2;if(ce.setTransform(1,0,0,1,0,0),ce.clearRect(0,0,j,j),!C.ok)return;ce.save(),ce.translate(j/2,j/2),ce.rotate((V-90)*Math.PI/180);let dt=(lt,Mt)=>[(lt-W.x)*xt,-(Mt-W.y)*xt],Et=t.FL(C.f);for(let lt of Et.rooms)ce.beginPath(),lt.poly.forEach((Mt,Pt)=>{let ne=dt(Mt[0],Mt[1]);Pt?ce.lineTo(ne[0],ne[1]):ce.moveTo(ne[0],ne[1])}),ce.closePath(),ce.fillStyle=lt.id===e.id&&C.f===e.f?"#7950ff55":"#e9e5f1",ce.fill(),ce.strokeStyle="#cfc8e0",ce.lineWidth=1,ce.stroke();ce.strokeStyle="#7950ff",ce.lineWidth=5,ce.lineCap=ce.lineJoin="round",ce.beginPath();let wt=!1;for(let lt of c.pts){if(lt.f!==C.f){wt=!1;continue}let Mt=dt(lt.x,lt.y);wt?ce.lineTo(Mt[0],Mt[1]):ce.moveTo(Mt[0],Mt[1]),wt=!0}ce.stroke(),ce.restore(),ce.fillStyle="#3d8bff33",ce.beginPath(),ce.moveTo(j/2,j/2),ce.arc(j/2,j/2,46,-Math.PI/2-.45,-Math.PI/2+.45),ce.fill(),ce.fillStyle="#3d8bff",ce.strokeStyle="#fff",ce.lineWidth=4,ce.beginPath(),ce.arc(j/2,j/2,10,0,Math.PI*2),ce.fill(),ce.stroke()}let rn=w?document.createElement("pre"):null,li=0;rn&&(rn.className="ar-debug",l.append(rn));let hi=0,Ai=0,ui=performance.now();h.onseeked=()=>J.postMessage({type:"reset"});let E=0;function q(V){if(g)return;requestAnimationFrame(q);let j=Math.min(.1,(V-ui)/1e3);if(ui=V,Tt&&!It&&!z&&V-hi>200&&h.readyState>=2){m&&h.currentTime<E-1&&J.postMessage({type:"reset"}),E=h.currentTime;let lt=N(),Mt=null;if(m?Mt=If(0,v):K?Mt=Yl(K):Mt=If(0,-8*Je),lt&&Mt&&!m&&K&&!p){x=x||new kl(Math.max(lt.raw.w,lt.raw.h),S||null);let Pt=x.add(zm(lt.raw.g,lt.raw.w,lt.raw.h),Mt,V/1e3);if(Pt&&Math.abs(Pt-y)>.4){y=Pt,_e();try{localStorage.setItem("sai-ar-fov",Pt.toFixed(1))}catch{}}}if(lt&&Mt&&!m&&K&&bt(lt,Mt,V),lt&&Mt){let Pt=Math.asin(Mt[8])/Je;if(!m&&(Pt<-35||Pt>25))Me("weak",Pt<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{let ne=Mf(lt.img,lt.K,Mt),Se=m||!K?null:no(Mt)*180/Math.PI,Xe=hi?Math.min(2,(V-hi)/1e3):0;Xe&&J.postMessage({type:"tick",dt:Xe,yaw:Se,hasSensor:Se!=null,pdr:Z.on}),It=!0,hi=V,J.postMessage({type:"query",id:++Ot,q:ne,yaw:Se,floorHint:ye&&$t?ye.to:en(c,Vt,Ft).f},[ne.buffer])}}ze(V)}let xt=vt(V);if(xt!=null)if(gt==null)gt=xt;else{let lt=ci(xt,gt);gt+=lt*Math.min(1,j*(Math.abs(lt)>8?2:.7))}if(C.ok){let lt=C.x,Mt=C.y,Pt=Ra(c,Vt,C,Ft);if(Pt&&Pt.off<3){let Se=Pt.s;W.s!=null&&Se<W.s-1&&!W.back?(W.back=!0,Se=W.s):W.back=!1;let Xe=en(c,Vt,Se);lt=Xe.x,Mt=Xe.y,W.s=Se}else W.s=null;W.init||Object.assign(W,{x:lt,y:Mt,yaw:C.yaw,init:!0});let ne=Math.min(1,j*2.5);W.x+=(lt-W.x)*ne,W.y+=(Mt-W.y)*ne,m&&(W.yaw+=ci(C.yaw,W.yaw)*Math.min(1,j*3))}let dt=W.yaw,Et;if(!m&&K){let lt=Yl(K);Et=va(Pf((gt??0)*Je),lt),dt=no(Et)*180/Math.PI}else Et=If(W.yaw*Je,v);let wt=t.FL(C.f).z+oS;Ln(Et,W.x,W.y,wt),st(V,j,dt)}function st(V,j,xt){let dt=W.s??C.s;(ae||C.ok&&Math.abs((dt??0)-(Bt.s??-99))>1)&&(Bt(dt),Bt.s=dt??0,ae=!1),Wt.offset.y-=j*1.6;let Et=(V-C.lastFix)/1e3,wt=C.ok&&!$t&&Et<ql&&(m||!K||gt!=null);Ai+=((wt?1:0)-Ai)*Math.min(1,j*4);let lt=Ai*(Et>ql-3?Math.max(0,(ql-Et)/3):1);Dt.opacity=lt*.9,te.opacity=Ie.opacity=lt,jt&&(jt.visible=lt>.02);let Mt=c.pts[c.pts.length-1];if(Ne.visible=lt>.02&&Mt.f===C.f&&Math.hypot(Mt.x-W.x,Mt.y-W.y)<35,Ne.position.copy(ut(Mt.x,Mt.y,t.FL(Mt.f).z)),Ne.children[0].position.y=1.9+Math.sin(V/300)*.05,Ae.visible=!1,lt>.02&&dt!=null){let Pt=uo(St,c,Vt,dt);if(Pt.dist<15&&Pt.step.kind==="walk"&&Pt.step.dir!=="straight"){let yn=dt+Pt.dist,Qs=en(c,Vt,yn),Dn=en(c,Vt,yn+.9),Ri=en(c,Vt,yn+3);if(Dn.f===C.f&&Qs.f===C.f&&Math.hypot(Ri.x-Dn.x,Ri.y-Dn.y)>.3){Ae.visible=!0;let Ta=Math.atan2(Ri.y-Dn.y,Ri.x-Dn.x)/Je;Ae.position.copy(ut(Dn.x,Dn.y,t.FL(C.f).z+.04)),Ae.rotation.set(0,(Ta-90)*Je,0)}}let ne=Pt.dist<3?Pt.step.dir:"straight";f.arrow.dataset.icon!==ne&&(oo(f.arrow,ne,!0),f.arrow.dataset.icon=ne);let Se=en(c,Vt,dt+4),Xe=ci(Math.atan2(Se.y-W.y,Se.x-W.x)/Je,xt),Re=Math.abs(Xe)>55?Math.abs(Xe)>135?"\uACBD\uB85C\uAC00 \uB4A4\uCABD\uC5D0 \uC788\uC5B4\uC694 \xB7 \uB3CC\uC544\uC11C \uBCF4\uC138\uC694":Xe>0?"\u2190 \uACBD\uB85C\uAC00 \uC67C\uCABD\uC5D0 \uC788\uC5B4\uC694":"\uACBD\uB85C\uAC00 \uC624\uB978\uCABD\uC5D0 \uC788\uC5B4\uC694 \u2192":"";Re&&(f.sub.textContent=Re),f.sub.classList.toggle("hint",!!Re)}rn&&V-li>300&&(li=V,rn.textContent=[A?`WebXR(VIO) ${H.tracking?"\uCD94\uC801 \uC911":"\uCD94\uC801 \uB04A\uAE40"} \xB7 \uC815\uB82C ${_t.ok?`${_t.n}\uD68C`:"-"} \xB7 \uB192\uC774 ${H.last?H.last.h.toFixed(2):"-"}m \xB7 \uC9C8\uC758 ${Math.round(G)}ms`:`\uC13C\uC11C ${K?"\uCF1C\uC9D0":"\uC5C6\uC74C"} \xB7 \uAC78\uC74C ${Z.on?Z.n||0:"\uC5C6\uC74C"} \xB7 \uC9C8\uC758 ${Math.round(G)}ms`,`\uD654\uAC01 ${y.toFixed(1)}\xB0 ${p?"(\uC8FC\uC18C)":x?`(\uBCF4\uC815 \uD45C\uBCF8 ${x.samples.length})`:""}`,`\uBC29\uD5A5\uAE30\uC900 ${gt==null?"-":gt.toFixed(1)} / \uC18C\uC2E4\uC810 ${ft.value==null?"-":ft.value.toFixed(1)} (${ft.n}) / \uC0AC\uC9C4\xB7\uAC78\uC74C ${pt.value==null?"-":pt.value.toFixed(1)} (${pt.n})`,`\uC704\uCE58 ${C.ok?"OK":"--"} ${on(C.f)} (${C.x.toFixed(1)}, ${C.y.toFixed(1)}) \uC2E0\uB8B0 ${C.conf.toFixed(2)}`].join(`
`)),wi(xt),X.render(B,F)}let H={q:new Map,last:null,mx:0,my:0,tracking:!1,eye:1.35,progT:0,fixT:0,nq:0},$=new Wl,_t=new xa,Nt=new Gl(t.M.FH||4),Yt=null,Xt=null;function re(V,j){if(g)return;let xt=Math.min(.1,(V-ui)/1e3);ui=V;let dt=j?.getViewerPose(X.xr.getReferenceSpace()),Et=W.yaw;if(dt){let wt=dt.views[0],lt=Ym(wt.transform.matrix),Mt=H.tracking;if(H.tracking=!dt.emulatedPosition,H.last&&H.tracking&&Mt){let Pt=lt.x-H.last.x,ne=lt.y-H.last.y;Math.hypot(Pt,ne)<1.5&&!$t&&(H.mx+=Pt,H.my+=ne)}if(H.last={...lt,yaw:Xl(lt.R)},H.tracking&&!$t){let Pt=Nt.update(lt.h);Pt?(J.postMessage({type:"shiftFloor",d:Pt}),t.floors.includes(C.f+Pt)&&(C.f+=Pt),ae=!0):Math.abs(lt.h-Nt.floorY-H.eye)<.4&&(H.eye+=(lt.h-Nt.floorY-H.eye)*.01)}if(Tt&&!It&&!z&&H.tracking&&V-hi>200&&wt.camera){let Pt=Xt.grab(wt.camera);if(Pt){let ne=$m(wt.projectionMatrix,Pt.w,Pt.h),Se={img:{data:Sf(Pt.g,Pt.w,Pt.h,bf(ne.fx)),w:Pt.w,h:Pt.h},K:ne,raw:Pt};bt(Se,lt.R,V);let Xe=Math.asin(lt.R[8])/Je;if(Xe<-35||Xe>25)Me("weak",Xe<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{(H.mx||H.my)&&J.postMessage({type:"move",dx:H.mx,dy:H.my}),H.mx=H.my=0;let Re=Mf(Se.img,Se.K,lt.R);It=!0,hi=V;let yn=Xl(lt.R);H.q.set(++Ot,{x:lt.x,y:lt.y,yaw:yn,lvl:Nt.idx,t:V/1e3});let Qs=_t.ok?C.f:en(c,Vt,Ft).f,Dn=++H.nq%4===0?t.floors:[Qs];H.q.size>20&&H.q.delete(H.q.keys().next().value),J.postMessage({type:"query",id:Ot,q:Re,yaw:yn,xr:!0,floors:Dn,floorHint:ye&&$t?ye.to:en(c,Vt,Ft).f},[Re.buffer])}}}if(_t.ok&&!$t){let Pt=_t.toBuilding(lt.x,lt.y);C.x=Pt.x,C.y=Pt.y,C.ok=!0,H.tracking&&(C.lastFix=V),Et=Xl(lt.R)+_t.off,C.yaw=Et;let ne=Ra(c,Vt,C,Ft);W.x=Pt.x,W.y=Pt.y,W.yaw=Et,W.init=!0,W.s=ne&&ne.off<3?ne.s:null,V-H.progT>200&&(H.progT=V,Y());let Se=Zm(_t,Nt.floorY-t.FL(C.f).z);it.rotation.set(0,Se.rotY,0),it.position.set(Se.px,Se.py,Se.pz)}}_t.ok?it.visible=!0:it.visible=!1,st(V,xt,Et)}if(A)try{Yt=await Xm(X,l),Xt=new Vl(X,220,T.has("xrflip")),l.classList.add("xr"),Yt.addEventListener("end",()=>{g||ge()}),X.setAnimationLoop(re)}catch{A=!1,Qt("\uC774 \uAE30\uAE30\uB294 \uAE30\uBCF8 AR \uBC29\uC2DD\uC73C\uB85C \uC548\uB0B4\uD574\uC694");try{await U()}catch(j){He(j)}requestAnimationFrame(q)}else requestAnimationFrame(q);let ee=$e("#ar-floors");ee.replaceChildren();for(let V of t.floors){let j=document.createElement("button");j.type="button",j.textContent=on(V),j.onclick=()=>{ee.hidden=!0,J.postMessage({type:"floor",f:V}),C.ok=!1,C.f=V,A&&(Nt.idx=0,$.clear(),_t.off=null),W.init=!1,Me("searching",`${Ye(V)}\uC5D0\uC11C \uC704\uCE58\uB97C \uCC3E\uB294 \uC911`),Qt(`${Ye(V)}\uB85C \uB9DE\uCDC4\uC5B4\uC694`)},ee.append(j)}f.status.onclick=()=>{for(let V of ee.children)V.classList.toggle("on",V.textContent===on(C.f));ee.hidden=!ee.hidden};let Jt=m?null:new URLSearchParams(location.search).get("loc"),ue=Jt?document.createElement("canvas"):null,Pe=!1,We=0;function ze(V){if(!Jt||Pe||V-We<1500||!K)return;let j=h.videoWidth,xt=h.videoHeight;if(!j)return;Pe=!0,We=V;let dt=640/Math.max(j,xt);ue.width=Math.round(j*dt),ue.height=Math.round(xt*dt),ue.getContext("2d").drawImage(h,0,0,ue.width,ue.height);let Et=Yl(K),wt=no(Et)*180/Math.PI,lt={R:Et,fovLong:y,prior:C.ok?{f:C.f,x:C.x,y:C.y,yaw:C.yaw}:{f:en(c,Vt,Ft).f}};ue.toBlob(async Mt=>{try{let Pt=new FormData;Pt.append("image",Mt,"q.jpg"),Pt.append("meta",JSON.stringify(lt));let Se=await(await fetch(Jt,{method:"POST",body:Pt})).json();!g&&Se&&Se.ok&&J.postMessage({type:"fix",fix:Se,yaw:wt})}catch{}Pe=!1},"image/jpeg",.7)}function Me(V,j){f.status.className=`ar-status ${V}`,f.status.textContent=j}function Qt(V){let j=$e("#toast");j.textContent=V,j.hidden=!1,clearTimeout(Qt.h),Qt.h=setTimeout(()=>j.hidden=!0,2600)}function He(V){f.err.hidden=!1,f.coach.hidden=!0,f.err.focus({preventScroll:!0});let j=V.code==="insecure",xt=V.name==="NotAllowedError";f.err.querySelector("b").textContent=j?"HTTPS\uC5D0\uC11C \uC5F4\uC5B4 \uC8FC\uC138\uC694":xt?"\uCE74\uBA54\uB77C \uAD8C\uD55C\uC774 \uD544\uC694\uD574\uC694":"\uCE74\uBA54\uB77C\uB97C \uCF24 \uC218 \uC5C6\uC5B4\uC694",f.err.querySelector("p").textContent=j?"\uCE74\uBA54\uB77C\uB97C \uC0AC\uC6A9\uD558\uB824\uBA74 \uBCF4\uC548 \uC5F0\uACB0(HTTPS)\uB85C \uC811\uC18D\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":xt?"\uBE0C\uB77C\uC6B0\uC800 \uC124\uC815\uC5D0\uC11C \uC774 \uC0AC\uC774\uD2B8\uC758 \uCE74\uBA54\uB77C \uC811\uADFC\uC744 \uD5C8\uC6A9\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":`${V.message||V} \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C AR \uAE38\uC548\uB0B4\uB97C \uCCB4\uD5D8\uD560 \uC218 \uC788\uC5B4\uC694.`}function ge(){g||(g=!0,J.terminate(),$t?.close(),M?.release?.().catch(()=>{}),document.removeEventListener("visibilitychange",k),nn.supported&&speechSynthesis.cancel(),removeEventListener("deviceorientation",nt),removeEventListener("devicemotion",yt),X.setAnimationLoop(null),Yt&&Yt.end().catch(()=>{}),Xt?.dispose(),l.classList.remove("xr"),removeEventListener("resize",_e),_?.getTracks().forEach(V=>V.stop()),h.pause(),h.removeAttribute("src"),h.srcObject=null,h.load(),X.dispose(),rn?.remove(),jt?.geometry.dispose(),l.hidden=!0,o?.())}$e("#ar-close").onclick=ge,$e("#ar-error-close").onclick=ge,$e("#ar-arrive-close").onclick=ge;let xn=$e("#ar-again");return xn.hidden=!m,xn.onclick=()=>{f.arrive.hidden=!0,we=!1,c=i.route,Vt=Qi(c),St=i.steps||nr(c,e,{landmarks:t.destinations}),Ft=0,zt=-1,ae=!0,C.ok=!1,W.init=!1,ve.clear(),R.clear(),J.postMessage({type:"reset"}),h.currentTime=0,h.play().catch(()=>{})},h.onended=()=>{!m||g||(we||(f.arrive.querySelector("b").textContent="\uB370\uBAA8 \uC601\uC0C1\uC774 \uB05D\uB0AC\uC5B4\uC694"),f.arrive.hidden=!1)},$e("#ar-demo").onclick=()=>{ge(),i.onDemo?.()},{close:ge}}var Je,$e,oS,ql,aS,ya,ci,va,Pf,cS,lS,hS,Jm=Qe(()=>{jn();Ef();ih();ho();km();Vm();Rf();Cf();qm();Km();Je=Math.PI/180,$e=i=>document.querySelector(i),oS=1.35,ql=15,aS=65,ya=i=>{navigator.userActivation?.hasBeenActive&&navigator.vibrate?.(i)},ci=(i,t)=>((i-t)%360+540)%360-180,va=(i,t)=>{let e=new Array(9);for(let n=0;n<3;n++)for(let s=0;s<3;s++)e[n*3+s]=i[n*3]*t[s]+i[n*3+1]*t[3+s]+i[n*3+2]*t[6+s];return e},Pf=i=>[Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i),0,0,0,1],cS=i=>[1,0,0,0,Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i)],lS=i=>[Math.cos(i),0,Math.sin(i),0,1,0,-Math.sin(i),0,Math.cos(i)],hS=[1,0,0,0,-1,0,0,0,-1]});var vS=fg(()=>{ho();ih();Um();Jm();Rf();Cf();var js="assets/",Ct=i=>document.querySelector(i),ds=i=>[...document.querySelectorAll(i)],co=new URLSearchParams(location.search),Rt={start:null,dest:null,mode:"stairs",route:null,steps:null,focusStep:null,sheet:"home"},cn,oe,Js,Ma=null;function Sa(i,t=2600){let e=Ct("#toast");e.textContent=i,e.hidden=!1,clearTimeout(Sa.h),Sa.h=setTimeout(()=>e.hidden=!0,t)}function Ze(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}async function uS(){let[i,t]=await Promise.all([fetch(js+"mirae.json").then(c=>{if(!c.ok)throw new Error(`\uCE35 \uB370\uC774\uD130 ${c.status}`);return c.json()}),fetch(js+"entrances.json").then(c=>c.json())]);cn=Gf(i),Js=t.entrances,oe=Nm(Ct("#view"),cn,{onPick:dS}),fS(),await oe.load(js+"mirae.glb");let e=co.get("from"),n=(c,l)=>c.campusNode===l||(c.campusNodes||[]).includes(l),s=Js.find(c=>c.id===e||n(c,e)),r=!s&&e&&cn.findDest(e);lo(r?Zl(r):Nf(s||Js[0])),s&&n(s,e)&&(Ct("#home-from").textContent=`\uCEA0\uD37C\uC2A4 \uACBD\uB85C\uAC00 ${s.name}\uB85C \uC774\uC5B4\uC84C\uC5B4\uC694. \uAC00\uB824\uB294 \uD638\uC2E4\uC744 \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694.`),co.get("mode")==="elevator"&&Of("elevator",!1),oe.setFloor(Rt.start.f,!0),ps();let o=co.get("to"),a=o&&(cn.findDest(o)||cn.search(o)[0]);a?(Rt.dest=a,gs()):ms("dest",!1),co.has("demo")&&kf(),ag(),Ct("#loading-status").textContent="\uBBF8\uB798\uAD00 \uC2E4\uB0B4 \uC9C0\uB3C4 \uC900\uBE44\uAC00 \uC644\uB8CC\uB410\uC5B4\uC694",Ct("#loading").classList.add("done"),setTimeout(()=>Ct("#loading").hidden=!0,450)}function Nf(i){return{kind:"entrance",id:i.id,name:i.name,f:i.f,x:i.p[0],y:i.p[1]}}function Zl(i){let t=i.doors[0],e=cn.nearest(i.f,t[0],t[1],6)||t;return{kind:"place",id:i.key,name:`${i.title}${i.name?" "+i.name:""}`,f:i.f,x:e[0],y:e[1]}}function lo(i){Rt.start=i,oe.setMe({x:i.x,y:i.y,f:i.f})}var $l=Ct("#floor-overview");function Kl(i){oe.setFloorOverview(i),document.body.classList.toggle("floor-overview-open",i),$l.setAttribute("aria-pressed",String(i)),$l.lastElementChild.textContent=i?"\uD604\uC7AC \uCE35":"\uC804\uCCB4 \uCE35"}$l.onclick=()=>Kl(!oe.floorOverview);function fS(){$l.hidden=!1;let i=Ct("#floors");i.replaceChildren();for(let t of[...cn.floors].sort((e,n)=>n-e)){let e=Ze("button","",on(t));e.type="button",e.dataset.f=t,e.setAttribute("aria-label",Ye(t)),e.onclick=()=>Uf(t),i.append(e)}}function Uf(i){if(oe.floorOverview&&Kl(!1),i===oe.floor)return;let t=i>oe.floor;oe.setFloor(i,!1,!0),oe.frame({resetOrientation:!1,animate:!0}),oe.setMe(Rt.start),ps();let e=Ct("#floor-badge");e.textContent=`${t?"\u25B2":"\u25BC"} ${on(i)}`,e.classList.remove("show"),e.offsetWidth,e.classList.add("show")}Ct("#view-reset").onclick=()=>oe?.frame({animate:!0});function ps(){let i=new Set(Rt.route?Rt.route.pts.map(t=>t.f):[]);for(let t of ds("#floors button"))t.classList.toggle("on",+t.dataset.f===oe.floor),t.classList.toggle("has-route",i.has(+t.dataset.f)),t.setAttribute("aria-pressed",+t.dataset.f===oe.floor);for(let t of ds(".floor-tag[data-f]"))t.classList.toggle("current-floor",+t.dataset.f===oe.floor);Ct("#search").hidden||jl(Ct("#search-input").value)}function dS(i,t,e){let n=cn.roomAt(e,i,t),s=n&&cn.destinations.find(r=>r.f===e&&r.id===n.id);if(!s){let r=null;for(let o of cn.destinations)if(o.f===e)for(let a of o.doors){let c=Math.hypot(a[0]-i,a[1]-t);c<2.2&&(!r||c<r[0])&&(r=[c,o])}s=r&&r[1]}s&&tg(s)}function ba(i){Rt.sheet=i;for(let t of["home","place","route"])Ct(`#sheet-${t}`).hidden=t!==i;Ct("#sheet").classList.remove("collapsed"),Ct("#sheet").classList.toggle("route-mode",i==="route"),Ct("#sheet").classList.toggle("place-mode",i==="place"),Ct("#sheet").hidden=i==="home",i==="home"&&ms("dest",!1)}Ct("#sheet-handle").onclick=()=>{let i=Ct("#sheet").classList.toggle("collapsed");Ct("#sheet-handle").setAttribute("aria-expanded",!i),Rt.route&&ig()};function tg(i){Rt.pending=i,oe.select(i),Ct("#place-floor").textContent=on(i.f),Ct("#place-floor").dataset.f=i.f,Ct("#place-floor").classList.toggle("b1",i.f===0),Ct("#place-title").textContent=i.title,Ct("#place-sub").textContent=[i.name||i.catLabel,Ye(i.f)].filter(Boolean).join(" \xB7 "),ba("place");let t=i.center||i.doors[0];oe.floorOverview||(i.f!==oe.floor&&Uf(i.f),oe.focus(t[0],t[1],i.f,48)),ps()}Ct("#place-close").onclick=()=>{if(oe.select(null),!Ct("#search").hidden&&!Rt.route){Rt.sheet="home",Ct("#sheet").hidden=!0,Ct("#sheet").classList.remove("place-mode");return}ba(Rt.route?"route":"home")};Ct("#place-route").onclick=()=>{Ea(),Rt.dest=Rt.pending,eg(Rt.dest),gs()};Ct("#place-from").onclick=()=>{Ea(),lo(Zl(Rt.pending)),Sa(`${Rt.pending.title}\uC5D0\uC11C \uCD9C\uBC1C\uD574\uC694. \uC774\uC81C \uB3C4\uCC29\uC9C0\uB97C \uAC80\uC0C9\uD574 \uC8FC\uC138\uC694.`),Rt.dest&&Rt.dest.key!==Rt.pending.key?gs():(oe.select(null),ba("home"),ms())};var Df="sai-indoor-recent";function pS(){try{return JSON.parse(localStorage.getItem(Df)||"[]").map(i=>cn.findDest(i)).filter(Boolean)}catch{return[]}}function eg(i){try{let t=[i.key,...JSON.parse(localStorage.getItem(Df)||"[]").filter(e=>e!==i.key)].slice(0,6);localStorage.setItem(Df,JSON.stringify(t))}catch{}}function ms(i="dest",t=!0){cn&&(Kl(!0),Rt.searchMode=i,Ct("#search").hidden=!1,document.body.classList.add("searching"),Ct("#search-input").value="",Ct("#search-input").placeholder=i==="origin"?"\uC5B4\uB514\uC5D0\uC11C \uCD9C\uBC1C\uD558\uB098\uC694? (\uD638\uC2E4\xB7\uC774\uB984)":"\uD638\uC2E4 \uBC88\uD638, \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984",jl(""),t&&setTimeout(()=>Ct("#search-input").focus(),50))}function Ea(){Ct("#search").hidden=!0,document.body.classList.remove("searching"),Ct("#search-input").blur(),oe?.redraw()}Ct("#search-open").onclick=()=>ms();Ct("#search-close").onclick=Ea;document.addEventListener("keydown",i=>{i.key!=="/"||i.isComposing||i.ctrlKey||i.metaKey||i.altKey||i.target.closest?.("input, textarea, select, [contenteditable='true']")||!Ct("#walk").hidden||!Ct("#ar").hidden||(i.preventDefault(),ms())});Ct("#search-input").addEventListener("input",i=>jl(i.target.value));Ct("#search-input").addEventListener("keydown",i=>{i.isComposing||i.keyCode===229||(i.key==="Enter"?Ct("#search-results li[data-key] button")?.click():i.key==="Escape"&&Ea())});function Lf(i){let t=Ze("li");t.dataset.key=i.key,t.dataset.f=i.f;let e=Ze("span","floor-tag"+(i.f===0?" b1":"")+(i.f===oe.floor?" current-floor":""),on(i.f));e.dataset.f=i.f,e.title=`${Ye(i.f)}${i.f===oe.floor?" \xB7 \uD604\uC7AC \uCE35":""}`;let n=Ze("div");n.append(Ze("b","",i.title),Ze("small","",i.cat==="toilet"?[i.name,Ye(i.f)].filter(Boolean).join(" \xB7 "):i.name||i.catLabel||Ye(i.f)));let s=Ze("button","search-result-button");return s.type="button",s.append(e,n),t.append(s),s.onclick=()=>{Ea(),eg(i),Rt.searchMode==="origin"?(lo(Zl(i)),Ff(),Rt.dest&&gs()):tg(i)},t}function jl(i){let t=Ct("#search-results");if(t.replaceChildren(),i.trim()){let s={floor:oe.floor,origin:Rt.start,mode:Rt.mode},r=cn.search(i,40,s),o=r.length?[]:cn.suggest(i,40,s),a=r.length?r:o,c=o.length?`\uBE44\uC2B7\uD55C \uC7A5\uC18C ${o.length}\uACF3`:r.length?`${r.length}\uACF3`:"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694. \uD638\uC2E4 \uBC88\uD638\uB098 \uC774\uB984 \uC77C\uBD80\uB85C \uCC3E\uC544\uBCF4\uC138\uC694.";Ct("#search-hint").textContent=a.length&&a.every(l=>l.cat==="toilet")?`${c} \xB7 ${Ye(oe.floor)} \uC6B0\uC120 \xB7 \uCD9C\uBC1C \uC704\uCE58\uC5D0\uC11C \uAC00\uAE4C\uC6B4 \uC21C`:c;for(let l of a)t.append(Lf(l));return}Ct("#search-hint").textContent="\uBC88\uD638\uB098 \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984\uC73C\uB85C \uCC3E\uC744 \uC218 \uC788\uC5B4\uC694";let e=pS();if(e.length){t.append(Ze("li","group","\uCD5C\uADFC \uCC3E\uC740 \uACF3"));for(let s of e)t.append(Lf(s))}let n=null;for(let s of cn.destinations.filter(r=>r.numbered))s.f!==n&&(t.append(Ze("li","group",Ye(s.f))),n=s.f),t.append(Lf(s))}for(let i of ds("#quick-chips button"))i.onclick=()=>{ms(),Ct("#search-input").value=i.dataset.q,jl(i.dataset.q)};function Ff(){let i=Ct("#route-from");i.replaceChildren();for(let t of Js)i.append(new Option(t.name,`e:${t.id}`));Rt.start.kind==="place"&&i.append(new Option(Rt.start.name,`p:${Rt.start.id}`)),i.append(new Option("\uB2E4\uB978 \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\u2026","pick")),i.value=Rt.start.kind==="entrance"?`e:${Rt.start.id}`:`p:${Rt.start.id}`}Ct("#route-from").onchange=i=>{let t=i.target.value;if(t==="pick"){Ff(),ms("origin");return}t.startsWith("e:")&&lo(Nf(Js.find(e=>`e:${e.id}`===t))),gs()};Ct("#route-to").onclick=()=>ms();Ct("#route-swap").onclick=()=>{if(!Rt.dest)return;let i=Rt.start.kind==="place"?cn.findDest(Rt.start.id):null;if(!i){Sa("\uCD9C\uC785\uAD6C\uB294 \uB3C4\uCC29\uC9C0\uB85C \uACE0\uB97C \uC218 \uC5C6\uC5B4\uC694. \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\uD558\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.");return}lo(Zl(Rt.dest)),Rt.dest=i,gs()};Ct("#route-close").onclick=()=>{Rt.route=null,Rt.dest=null,oe.clearRoute(),oe.select(null),ba("home"),ps(),history.replaceState(null,"",location.pathname+(co.get("from")?`?from=${co.get("from")}`:""))};function Of(i,t=!0){Rt.mode=i;for(let e of ds(".seg button"))e.classList.toggle("on",e.dataset.mode===i),e.setAttribute("aria-checked",e.dataset.mode===i);t&&gs()}for(let i of ds(".seg button"))i.onclick=()=>Of(i.dataset.mode);function ng(){let i=new URLSearchParams;i.set("from",Rt.start.id),i.set("to",Rt.dest.key),Rt.mode==="elevator"&&i.set("mode","elevator");let t=new URLSearchParams(location.search);for(let e of["debug","fov","loc"])t.has(e)&&i.set(e,t.get(e));return`${location.pathname}?${i}`}Ct("#route-share").onclick=async()=>{let i=new URL(ng(),location.href).href,t=`\uBBF8\uB798\uAD00 ${Rt.dest.title}\uAE4C\uC9C0 \uAE38\uC548\uB0B4`;try{navigator.share?await navigator.share({title:t,url:i}):(await navigator.clipboard.writeText(i),Sa("\uACBD\uB85C \uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD588\uC5B4\uC694"))}catch{}};function gs(){let i=Rt.dest;if(!i)return;let t=cn.routeTo(Rt.start,i,{mode:Rt.mode});Ff(),Ct("#route-to").textContent=`${i.title}${i.name?" "+i.name:""}`,ba("route");let e=Ct("#route-summary");if(e.replaceChildren(),Ct("#route-steps").replaceChildren(),!t){Rt.route=null,oe.clearRoute(),e.append(Ze("span","warn","\uACBD\uB85C\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.")),Ct("#ar-open").disabled=Ct("#walk-open").disabled=!0,ps();return}Ct("#ar-open").disabled=Ct("#walk-open").disabled=!1,Rt.route=t,Rt.steps=nr(t,i,{landmarks:cn.destinations}),Rt.focusStep=null,history.replaceState(null,"",ng()),e.append(Ze("b","",`${Math.round(t.len)}m`),Ze("span","",`\uC57D ${Ca(t.len)}`));for(let r of Rt.steps)(r.kind==="stair"||r.kind==="elev")&&e.append(Ze("span","chip "+r.kind,`${r.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"} ${on(r.f)}\u2192${on(r.to)}`));let n=Rt.steps.filter(r=>r.kind==="stair").map(r=>`${on(r.f)}\u2192${on(r.to)}`).join(", "),s=[];t.preferElev&&s.push("3\uAC1C \uCE35 \uC774\uC0C1\uC774\uB77C \uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C \uC548\uB0B4\uD574\uC694"),(Rt.mode==="elevator"||t.preferElev)&&t.stairFloors&&s.push(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uAC00 \uB2FF\uC9C0 \uC54A\uB294 ${n} \uAD6C\uAC04\uB9CC \uACC4\uB2E8\uC744 \uC774\uC6A9\uD574\uC694`),s.length&&e.append(Ze("span","note",s.join(" \xB7 "))),_S(),Ct("#sheet").scrollTop=0,oe.showRoute(t,i,Rt.steps),!oe.floorOverview&&oe.floor!==t.pts[0].f&&oe.setFloor(t.pts[0].f),oe.setMe(Rt.start),ig(),ps()}function mS(){return innerWidth>=820?0:Ct("#sheet").classList.contains("collapsed")?64:Ct("#sheet").offsetHeight}function ig(){if(oe.floorOverview)return;let i=Rt.route.pts.filter(o=>o.f===oe.floor),t=i.length?i:Rt.route.pts,e=1/0,n=-1/0,s=1/0,r=-1/0;for(let o of t)e=Math.min(e,o.x),n=Math.max(n,o.x),s=Math.min(s,o.y),r=Math.max(r,o.y);oe.fit(e,s,n,r,t[0].f,mS())}async function sg(){return Ma||(Ma=await fetch(js+"sv.json").then(i=>i.json())),Ma}function rg(i,t,e,n,s=3.5,r=45){if(!Ma)return null;let o=null;for(let a of Ma.shots){if(a.f!==e)continue;let c=Math.hypot(a.x-i,a.y-t);if(c>s)continue;let l=n==null?0:Math.abs(((a.yaw-n)%360+540)%360-180);if(l>r)continue;let h=c+l*.05;(!o||h<o[0])&&(o=[h,a])}return o&&o[1]}var og=i=>`${js}sv/${String(i.id).padStart(5,"0")}.jpg`;function gS(i){let t=Rt.route,e=Qi(t),n=en(t,e,i.s+.3),s=en(t,e,i.s+3);return Math.hypot(s.x-n.x,s.y-n.y)>.5?Math.atan2(s.y-n.y,s.x-n.x)*180/Math.PI:null}async function _S(){let i=Ct("#route-steps");i.replaceChildren();let t=Rt.steps;await sg().catch(()=>null),Rt.steps===t&&t.forEach((e,n)=>{let s=Ze("li",e.kind==="stair"||e.kind==="elev"?"vertical":e.kind==="arrive"?"goal":"");s.dataset.i=n;let r=Ze("span","ico");oo(r,e.dir);let o=Ze("div","txt");o.append(Ze("b","",e.text));let a=[Ye(e.f)];if(e.kind==="start"&&a.push(Rt.start.name),e.sub&&e.kind!=="start"&&a.push(e.sub),o.append(Ze("small","",a.join(" \xB7 "))),s.append(r,o),e.kind!=="start"&&e.kind!=="arrive"&&e.kind!=="elev"){let c=rg(e.at[0],e.at[1],e.f,gS(e));if(c){let l=Ze("img");l.loading="lazy",l.alt="\uC774 \uC9C0\uC810\uC758 \uC2E4\uC81C \uBAA8\uC2B5",l.src=og(c),s.append(l)}}s.onclick=()=>Qm(n),s.tabIndex=0,s.setAttribute("role","button"),s.setAttribute("aria-label",`${e.text} \xB7 ${a.join(" \xB7 ")}`),s.onkeydown=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),Qm(n))},i.append(s)})}function Qm(i){let t=Rt.steps[i];Rt.focusStep=i;for(let e of ds("#route-steps li"))e.classList.toggle("on",+e.dataset.i===i);oe.highlightStep(i),(oe.floorOverview||t.f!==oe.floor)&&Uf(t.f),oe.focus(t.at[0],t.at[1],t.f,32),ps(),innerWidth<820&&Ct("#sheet").classList.add("collapsed")}function ag(){for(let i of ds(".voice-btn"))i.hidden=!nn.supported,i.classList.toggle("on",nn.on),i.setAttribute("aria-pressed",nn.on),i.querySelector("img")||i.replaceChildren(Hl("volume")),i.title=nn.on?"\uC74C\uC131 \uC548\uB0B4 \uB044\uAE30":"\uC74C\uC131 \uC548\uB0B4 \uCF1C\uAE30"}for(let i of ds(".voice-btn"))i.onclick=()=>{nn.on=!nn.on,ag(),nn.on&&nn.say("\uC74C\uC131 \uC548\uB0B4\uB97C \uCF30\uC5B4\uC694")};var xS=3.2,Ee=null;Ct("#walk-open").onclick=async()=>{if(!Rt.route)return;await sg().catch(()=>null);let i=Rt.route,t=Qi(i),e=t[t.length-1];Ee={s:0,s0:0,cum:t,total:e,end:Math.max(0,e-xS),yaw:null,last:performance.now(),shot:null,playing:!0,speed:1,step:-1,lift:null,liftDone:new Set};let n=Rt.focusStep;if(n!=null&&Rt.steps[n]){let s=n>0?Rt.steps[n-1].s:0;Ee.s0=Math.min(Ee.end,Math.max(s,n>0?Rt.steps[n].s-2:0)),Ee.s=Ee.s0,Bf(Ee)}Ct("#walk").hidden=!1,document.body.classList.add("walking"),oe.resize(),oe.floorOverview&&Kl(!1);for(let s of["#sheet",".topbar","#floor-controls"])Ct(s).hidden=!0;oe.setFirstPerson(!0),Jl(),requestAnimationFrame(lg)};function Bf(i){for(let t of Rt.steps)t.kind==="elev"&&t.s<i.s&&i.liftDone.add(t.s)}function yS(){Ee?.lift?.close(),Ee=null,nn.supported&&speechSynthesis.cancel(),Ct("#walk").hidden=!0,document.body.classList.remove("walking"),oe.resize();for(let i of["#sheet",".topbar","#floor-controls"])Ct(i).hidden=!1;if(oe.setFirstPerson(!1),Rt.route){let i=Rt.route.pts[Rt.route.pts.length-1].f;i!==oe.floor&&oe.setFloor(i)}ps()}function Jl(){Ee&&(Ct("#walk-play").replaceChildren(Hl(Ee.playing?"pause":"play")),Ct("#walk-play").setAttribute("aria-label",Ee.playing?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD"),Ct("#walk-speed").textContent=`${Ee.speed}\xD7`)}Ct("#walk-close").onclick=yS;Ct("#walk-play").onclick=()=>{Ee&&(Ee.s>=Ee.end-.05&&(Ee.s=Ee.s0,Ee.liftDone.clear(),Bf(Ee),Ee.yaw=null),Ee.playing=!Ee.playing,Jl())};Ct("#walk-speed").onclick=()=>{Ee&&(Ee.speed=Ee.speed===1?2:Ee.speed===2?4:1,Jl())};function cg(i){if(!Ee||Ee.lift)return;let t=Math.max(0,Math.min(Rt.steps.length-1,nh(Rt.steps,Ee.s)+i));Ee.s=Math.min(Ee.end,Rt.steps[t].s+.01),Bf(Ee),Ee.yaw=null}Ct("#walk-prev").onclick=()=>cg(-1);Ct("#walk-next").onclick=()=>cg(1);function lg(i){if(!Ee)return;let t=Ee,e=Rt.route,n=Rt.steps,s=Math.min(.05,(i-t.last)/1e3);if(t.last=i,t.playing&&!t.lift){let S=en(e,t.cum,t.s),y=e.pts[S.i]?.kind==="stair",x=Math.min(t.end,t.s+s*t.speed*(y?1.3:2.4)),T=n.find(w=>w.kind==="elev"&&w.s>=t.s-1e-6&&w.s<=x&&!t.liftDone.has(w.s));T&&(x=T.s,t.liftDone.add(T.s),nn.say(T.text),t.lift=zl({from:T.f,to:T.to,title:`${on(T.to)}\uB85C \uC774\uB3D9 \uC911`,hint:T.sub}),t.lift.finished.then(()=>{Ee===t&&(t.lift=null,t.s=T.s+.02,t.yaw=null)})),t.s=x}let r=en(e,t.cum,t.s),o=en(e,t.cum,Math.min(t.total,t.s+2.2)),a=e.pts[e.pts.length-1],c=t.end-t.s<3&&Math.hypot(a.x-r.x,a.y-r.y)>.3?Math.atan2(a.y-r.y,a.x-r.x)*180/Math.PI:Math.hypot(o.x-r.x,o.y-r.y)>.3?Math.atan2(o.y-r.y,o.x-r.x)*180/Math.PI:t.yaw??90;t.yaw==null&&(t.yaw=c);let l=((c-t.yaw)%360+540)%360-180;t.yaw+=l*Math.min(1,s*3.2),oe.setWalkPose({x:r.x,y:r.y,z:r.z,f:r.f,yaw:t.yaw,pitch:-.1}),Ct("#walk-bar").style.width=`${t.s/Math.max(.01,t.end)*100}%`;let h=uo(n,e,t.cum,t.s),u=nh(n,t.s);u!==t.step&&(t.step=u,u>0&&n[u].kind!=="elev"&&nn.say(n[u].text));let f=t.s>=t.end-.05,d=Ct("#walk-step");d.replaceChildren();let g=Ze("div");g.append(Ze("b","",f?`${Rt.dest.title} \uB3C4\uCC29`:h.dist<3?`\uC9C0\uAE08 ${h.step.action}`:`${Math.round(h.dist)}m \uC55E ${h.step.kind==="arrive"?Rt.dest.title:h.step.action}`),Ze("small","",`${Ye(r.f)} \xB7 ${n[u].text}`));let _=Ze("div","hud-arrow");oo(_,f?"arrive":h.dist<3?h.step.dir:"straight",!0),d.append(_,g);let m=rg(r.x,r.y,r.f,t.yaw,3,40),p=Ct("#walk-photo");m&&!t.lift?(t.shot!==m.id&&(t.shot=m.id,p.querySelector("img").src=og(m)),p.hidden=!1):p.hidden=!0,f&&t.playing&&(t.playing=!1,Jl(),nn.say(`${Rt.dest.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`)),requestAnimationFrame(lg)}function hg(i){Rt.route&&jm({indoor:cn,route:Rt.route,steps:Rt.steps,dest:Rt.dest,mode:Rt.mode,demo:i,assets:js,onDemo:kf,onRoute:(t,e)=>{Rt.route=t,Rt.steps=e,oe.showRoute(t,Rt.dest,e)}})}Ct("#ar-open").onclick=()=>hg(!1);Ct("#demo-open").onclick=kf;async function kf(){let i=await fetch(js+"demo.json").then(e=>e.json()),t=Js.find(e=>e.id===i.from)||Js[0];lo(Nf(t)),Rt.dest=cn.findDest(i.to),Of("stairs",!1),gs(),hg(!0)}uS().catch(i=>{console.error(i);let t=Ct("#loading");t.hidden=!1,t.classList.remove("done"),Ct("#loading-status").textContent="\uBBF8\uB798\uAD00 \uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694",Ct("#loading-error-detail").textContent=String(i.message||i),Ct("#loading-error").hidden=!1,Ct("#loading-retry").onclick=()=>location.reload()})});vS();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
