(()=>{var wg=Object.defineProperty;var qe=(i,t)=>()=>(i&&(t=i(i=0)),t);var Tg=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports),Ag=(i,t)=>{for(var e in t)wg(i,e,{get:t[e],enumerable:!0})};function xs(i){return String(i??"").normalize("NFKC").toLowerCase().replace(/\s+/g,"")}function Rg(i,t){let e=[Array.from({length:t.length+1},(n,s)=>s)];for(let n=1;n<=i.length;n++){let s=[n];e.push(s);for(let r=1;r<=t.length;r++)s[r]=Math.min(e[n-1][r]+1,s[r-1]+1,e[n-1][r-1]+ +(i[n-1]!==t[r-1])),n>1&&r>1&&i[n-1]===t[r-2]&&i[n-2]===t[r-1]&&(s[r]=Math.min(s[r],e[n-2][r-2]+1))}return e[i.length][t.length]}function Aa(i,t,e,n=5){let s=xs(i);if(s.length<2)return[];let r=/^b?\d+$/.test(s);if(r&&s.length<3)return[];let o=s.normalize("NFD"),a=r||o.length<6?1:o.length<12?2:3;return t.flatMap(c=>{let l=1/0;for(let h of e(c)){let u=xs(h);if(!(!u||r!==/^b?\d+$/.test(u)))for(let f=Math.max(2,s.length-1);f<=s.length+1;f++){if(f>u.length||r&&f!==u.length)continue;let d=u.slice(0,f).normalize("NFD");if(Math.abs(d.length-o.length)>a)continue;let g=Rg(o,d);g<=a&&(l=Math.min(l,g*10+(u.length-f)*.1))}}return Number.isFinite(l)?[{item:c,score:l}]:[]}).sort((c,l)=>c.score-l.score).slice(0,n).map(({item:c})=>c)}var th=qe(()=>{});function cn(i){return i===0?"B1":`${i}F`}function Je(i){return i===0?"\uC9C0\uD558 1\uCE35":`${i}\uCE35`}function Bg(i){return typeof atob=="function"?Uint8Array.from(atob(i),t=>t.charCodeAt(0)):new Uint8Array(Buffer.from(i,"base64"))}function kg(i){let t={};for(let e of i.floors)t[e.n]=Bg(e.grid);return(e,n,s)=>{let r=Math.floor((n-i.gx0)/i.cell),o=Math.floor((i.gy1-s)/i.cell);if(!t[e]||r<0||o<0||r>=i.gw||o>=i.gh)return!1;let a=o*i.gw+r;return(t[e][a>>3]>>7-(a&7)&1)===1}}function eh(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++)i[s][1]>e!=i[r][1]>e&&t<(i[r][0]-i[s][0])*(e-i[s][1])/(i[r][1]-i[s][1])+i[s][0]&&(n=!n);return n}function $f(i){let t=i.floors.map(G=>G.n),e=G=>i.floors.find($=>$.n===G),n=kg(i);function s(G,$,nt,st=18){if(n(G,$,nt))return[$,nt];for(let U=i.cell;U<st;U+=i.cell)for(let I=0;I<Math.PI*2;I+=Math.max(.05,i.cell/U)){let V=$+U*Math.cos(I),at=nt+U*Math.sin(I);if(n(G,V,at))return[V,at]}return null}function r(G,$,nt){let st=e(G);return st&&st.rooms.find(U=>eh(U.poly,$,nt))||null}let o=i.ramps.map(G=>{let $=0,nt=[0];for(let st=1;st<G.pts.length;st++)$+=Math.hypot(G.pts[st][0]-G.pts[st-1][0],G.pts[st][1]-G.pts[st-1][1]),nt.push($);return{...G,cum:nt,T:$}}),a=Math.floor(i.gw/Ii),c=Math.floor(i.gh/Ii),l=a*c,h=G=>[i.gx0+(G%a*Ii+Ii/2)*i.cell,i.gy1-(Math.floor(G/a)*Ii+Ii/2)*i.cell],u={},f={},d={},g=[1,1.7,1.2,1];for(let G of t){let $=new Uint8Array(l),nt=new Int16Array(l).fill(-1),st=e(G).rooms;for(let V=0;V<l;V++){let[at,dt]=h(V);if($[V]=n(G,at,dt)?1:0,$[V]){for(let Ft=0;Ft<st.length;Ft++)if(!["stair","ostair","elev"].includes(st[Ft].cat)&&eh(st[Ft].poly,at,dt)){nt[V]=Ft;break}}}u[G]=$,f[G]=nt;let U=new Uint8Array(l).fill(255),I=[];for(let V=0;V<l;V++)$[V]||(U[V]=0,I.push(V));for(let V=0;V<I.length;V++){let at=I[V],dt=at%a,Ft=at/a|0;if(!(U[at]>=3))for(let Qt=-1;Qt<=1;Qt++)for(let P=-1;P<=1;P++){let $t=dt+P,Lt=Ft+Qt;if($t<0||Lt<0||$t>=a||Lt>=c)continue;let Ht=Lt*a+$t;U[Ht]>U[at]+1&&(U[Ht]=U[at]+1,I.push(Ht))}}d[G]=U}function _(G,$,nt){let st=Math.floor(($-i.gx0)/i.cell/Ii),U=Math.floor((i.gy1-nt)/i.cell/Ii),I=u[G];if(!I)return-1;let V=-1,at=1e9;for(let dt=0;dt<40&&V<0;dt++)for(let Ft=U-dt;Ft<=U+dt;Ft++)for(let Qt=st-dt;Qt<=st+dt;Qt++){if(Qt<0||Ft<0||Qt>=a||Ft>=c||!I[Ft*a+Qt])continue;let P=(Qt-st)**2+(Ft-U)**2;P<at&&(at=P,V=Ft*a+Qt)}return V}let m=[];for(let G of o){let $=G.pts[0],nt=G.pts[G.pts.length-1],st=_(G.lo,$[0],$[1]),U=_(G.lo+1,nt[0],nt[1]);st>=0&&U>=0&&e(G.lo+1)&&m.push({kind:"stair",id:G.id,fa:G.lo,fb:G.lo+1,ca:st,cb:U,cost:G.T+Ig,ramp:G})}function p(G,$){let nt=null;for(let st of e(G).rooms)if(st.cat==="elev"){let U=Math.hypot(st.c[0]-$[0],st.c[1]-$[1]);(!nt||U<nt[0])&&(nt=[U,st.c])}return nt&&nt[0]<5?nt[1]:$}let v=[];for(let G of i.floors)for(let $ of G.doors)$.cat==="elev"&&v.push({f:G.n,p:$.p,id:$.id});let y=[];for(let G of v){let $=y.find(nt=>Math.hypot(nt.p[0]-G.p[0],nt.p[1]-G.p[1])<3&&!nt.doors.some(st=>st.f===G.f));$||y.push($={p:G.p,doors:[]}),$.doors.push(G)}y.forEach((G,$)=>{G.id=`EV${$+1}`,G.doors.sort((nt,st)=>nt.f-st.f);for(let nt=0;nt<G.doors.length;nt++)for(let st=nt+1;st<G.doors.length;st++){let U=G.doors[nt],I=G.doors[st],V=_(U.f,U.p[0],U.p[1]),at=_(I.f,I.p[0],I.p[1]);V>=0&&at>=0&&m.push({kind:"elev",id:G.id,fa:U.f,fb:I.f,ca:V,cb:at,cost:Dg+Ng*(I.f-U.f),pa:U.p,pb:I.p,qa:p(U.f,U.p),qb:p(I.f,I.p)})}});let x=G=>t.indexOf(G);function w(G,$,nt={}){let st=nt.mode||"stairs",U=new Set(nt.allowRooms||[]),I=l*t.length,V=_(G.f,G.x,G.y);if(V<0)return null;let at=x(G.f)*l+V,dt=new Map;for(let J of $){let xt=_(J.f,J.x,J.y);xt>=0&&dt.set(x(J.f)*l+xt,J)}if(!dt.size)return null;let Ft=new Float64Array(I).fill(1/0),Qt=new Int32Array(I).fill(-1),P=new Int32Array(I).fill(-1);Ft[at]=0;let $t=new Map;m.forEach((J,xt)=>{let St=x(J.fa)*l+J.ca,ht=x(J.fb)*l+J.cb;($t.get(St)||$t.set(St,[]).get(St)).push([ht,xt]),($t.get(ht)||$t.set(ht,[]).get(ht)).push([St,xt])});let Lt=[],Ht=(J,xt)=>{Lt.push([J,xt]);let St=Lt.length-1;for(;St>0;){let ht=St-1>>1;if(Lt[ht][0]<=Lt[St][0])break;[Lt[ht],Lt[St]]=[Lt[St],Lt[ht]],St=ht}},kt=()=>{let J=Lt[0],xt=Lt.pop();if(Lt.length){Lt[0]=xt;let St=0;for(;;){let ht=2*St+1,It=ht+1,Gt=St;if(ht<Lt.length&&Lt[ht][0]<Lt[Gt][0]&&(Gt=ht),It<Lt.length&&Lt[It][0]<Lt[Gt][0]&&(Gt=It),Gt===St)break;[Lt[Gt],Lt[St]]=[Lt[St],Lt[Gt]],St=Gt}}return J};Ht(0,at);let ve=Ii*i.cell,zt=-1;for(;Lt.length;){let[J,xt]=kt();if(J>Ft[xt])continue;if(dt.has(xt)){zt=xt;break}let St=Math.floor(xt/l),ht=xt-St*l,It=t[St],Gt=u[It],Kt=f[It],Bt=ht%a,Yt=Math.floor(ht/a);for(let mt=-1;mt<=1;mt++)for(let bt=-1;bt<=1;bt++){if(!bt&&!mt)continue;let Dt=Bt+bt,yt=Yt+mt;if(Dt<0||yt<0||Dt>=a||yt>=c)continue;let A=yt*a+Dt;if(!Gt[A]||bt&&mt&&!(Gt[Yt*a+Dt]&&Gt[yt*a+Bt]))continue;let K=Kt[A],et=(K>=0&&!U.has(e(It).rooms[K].id)?Cg:1)*g[Math.min(3,d[It][A])],ct=St*l+A,ot=J+Math.hypot(bt,mt)*ve*et;ot<Ft[ct]&&(Ft[ct]=ot,Qt[ct]=xt,P[ct]=-1,Ht(ot,ct))}let F=$t.get(xt);if(F)for(let[mt,bt]of F){let Dt=J+m[bt].cost+(st==="elevator"&&m[bt].kind==="stair"?Pg:0);Dt<Ft[mt]&&(Ft[mt]=Dt,Qt[mt]=xt,P[mt]=bt,Ht(Dt,mt))}}if(zt<0)return null;let Zt=[];for(let J=zt;J>=0;J=Qt[J])Zt.push(J);Zt.reverse();let be=[],Me=null;for(let J=0;J<Zt.length;J++){let xt=Zt[J],St=t[Math.floor(xt/l)],[ht,It]=h(xt%l);if(P[xt]>=0){let Gt=m[P[xt]],Kt=St>t[Math.floor(Zt[J-1]/l)];be.push({kind:Gt.kind,id:Gt.id,from:Kt?Gt.fa:Gt.fb,to:St,link:Gt,up:Kt}),Me=null}Me||(Me={kind:"walk",f:St,pts:[]},be.push(Me)),Me.pts.push([ht,It])}let R=dt.get(zt),S=be.filter(J=>J.kind==="walk");S[0].pts[0]=[G.x,G.y],S[S.length-1].pts.push([R.x,R.y]);for(let J of S)J.pts=C(J.f,J.pts);let it=[];for(let J of be){if(J.i0=it.length,J.kind==="walk"){let xt=e(J.f).z;for(let[St,ht]of J.pts)it.push({x:St,y:ht,z:xt,f:J.f,kind:"walk"})}else if(J.kind==="stair"){let xt=J.link.ramp,St=e(xt.lo).z,ht=J.up?xt.pts:[...xt.pts].reverse();for(let It of ht)it.push({x:It[0],y:It[1],z:St+It[2]*i.FH,f:xt.lo+(It[2]>.5?1:0),kind:"stair"})}else{let xt=J.link,St=J.up?xt.pa:xt.pb,ht=J.up?xt.pb:xt.pa;it.push({x:St[0],y:St[1],z:e(J.from).z,f:J.from,kind:"elev"}),it.push({x:ht[0],y:ht[1],z:e(J.to).z,f:J.to,kind:"elev"})}J.i1=it.length-1}let ut=0;for(let J=1;J<it.length;J++)it[J].kind==="elev"&&it[J-1].kind==="elev"||(ut+=Math.hypot(it[J].x-it[J-1].x,it[J].y-it[J-1].y));let rt=be.filter(J=>J.kind!=="walk"),Jt=rt.filter(J=>J.kind==="stair").reduce((J,xt)=>J+Math.abs(xt.to-xt.from),0);return{pts:it,legs:be,len:ut,cost:Ft[zt],target:R,vertical:rt,mode:st,stairFloors:Jt}}function T(G,$,nt){let st=Math.hypot(nt[0]-$[0],nt[1]-$[1]);if(st<1e-6)return!0;let U=Math.ceil(st/.1),I=-(nt[1]-$[1])/st*.25,V=(nt[0]-$[0])/st*.25;for(let at=1;at<U;at++){let dt=at/U,Ft=$[0]+(nt[0]-$[0])*dt,Qt=$[1]+(nt[1]-$[1])*dt;if(!n(G,Ft,Qt)||!n(G,Ft+I,Qt+V)||!n(G,Ft-I,Qt-V))return!1}return!0}function C(G,$){if($.length<3)return $;let nt=[$[0]],st=0;for(;st<$.length-1;){let U=$.length-1;for(;U>st+1&&!T(G,$[st],$[U]);)U--;nt.push($[U]),st=U}return N(G,nt,.35)}function N(G,$,nt){if($.length<3)return $;let st=$[0],U=$[$.length-1],I=-1,V=0,at=Math.hypot(U[0]-st[0],U[1]-st[1])||1e-9;for(let Qt=1;Qt<$.length-1;Qt++){let P=Math.abs((U[0]-st[0])*(st[1]-$[Qt][1])-(st[0]-$[Qt][0])*(U[1]-st[1]))/at;P>V&&(V=P,I=Qt)}if(V<=nt&&T(G,st,U))return[st,U];if(I<0)return $;let dt=N(G,$.slice(0,I+1),nt),Ft=N(G,$.slice(I),nt);return[...dt.slice(0,-1),...Ft]}let b=i.names||{},M=new Map;for(let G of i.floors){let $=(nt,st,U,I,V)=>{if(U==="stair"||U==="ostair"||Ug.test(nt))return;let at=`${G.n}:${nt}`,dt=M.get(at);if(!dt){let Ft=/^[0-9B]/.test(nt),Qt=nt[0]==="B"?0:+nt[0],$t=(b[nt]&&G.n===Qt?b[nt]:"")||(st!==nt&&st!=="\uC2E4"?st:"");dt={key:at,id:nt,f:G.n,cat:U,numbered:Ft,title:Ft?`${nt}\uD638`:st,name:Ft?$t:"",catLabel:Og[U]||"",doors:[],center:null};let Lt=U==="toilet"&&/여|남/.exec(dt.title)?.[0],Ht=Lt?[`${Lt}\uC790\uD654\uC7A5\uC2E4`,`${Lt}\uC131\uD654\uC7A5\uC2E4`,`\uD654\uC7A5\uC2E4${Lt}\uC790`]:[];dt.search=[nt,dt.title,$t,...Fg[U]||[],...Ht].map(ts).join("|"),M.set(at,dt)}V?dt.doors.push(I):dt.center=I};for(let nt of G.doors)$(nt.id,nt.name,nt.cat,nt.p,!0);for(let nt of G.rooms)$(nt.id,nt.name,nt.cat,nt.c,!1)}let D=[...M.values()].map(G=>({...G,doors:G.doors.length?G.doors:[G.center]}));for(let G of D){if(G.numbered)continue;if(D.filter(nt=>nt.f===G.f&&nt.title===G.title).length>1){let nt=G.doors[0];G.name=nt[0]<0?"\uC11C\uCABD":"\uB3D9\uCABD"}}D.sort((G,$)=>G.f-$.f||Number($.numbered)-Number(G.numbered)||G.id.localeCompare($.id,"ko",{numeric:!0}));let X="",j=new Map;function O(G,$){let nt=$.origin;if(!nt)return 1/0;let st=`${nt.f}:${nt.x}:${nt.y}:${$.mode||"stairs"}`;if(st!==X&&(X=st,j.clear()),!j.has(G.key)){let U=qt(nt,G,{mode:$.mode||"stairs"});j.set(G.key,U?.len??1/0)}return j.get(G.key)}function tt(G,$,nt){if(!Number.isFinite(nt.floor))return G.f-$.f;let st=Math.abs(G.f-nt.floor)-Math.abs($.f-nt.floor);if(st)return st;if(G.cat==="toilet"&&$.cat==="toilet"&&nt.origin){let U=O(G,nt),I=O($,nt);if(U!==I)return U-I}return G.f-$.f}function B(G,$=30,nt={}){let st=ts(G);if(!st)return[];let U=[];for(let I of D){let V=ts(I.id),at=0;V===st?at=100:V.startsWith(st)?at=80-(V.length-st.length):ts(I.title)===st?at=70:ts(I.name).includes(st)?at=60:I.search.includes(st)&&(at=40),at&&U.push([at,I])}return U.sort((I,V)=>V[0]-I[0]||tt(I[1],V[1],nt)),U.slice(0,$).map(I=>I[1])}function pt(G,$=5,nt={}){let st=Aa(ts(G),D,U=>U.search.split("|"),D.length);return st.length&&st.every(U=>U.cat==="toilet")&&st.sort((U,I)=>tt(U,I,nt)),st.slice(0,$)}let q=G=>D.find($=>$.key===G)||D.find($=>ts($.id)===ts(G))||null,Rt=.7;function Ut(G,$,nt){let st=e(G).rooms.filter(V=>V.id===nt).map(V=>V.poly);if(!st.length)return null;let U=null;for(let V of st)for(let at=1;at<V.length;at++){let dt=V[at-1],Ft=V[at],Qt=Ft[0]-dt[0],P=Ft[1]-dt[1],$t=Qt*Qt+P*P;if($t<1e-6)continue;let Lt=Math.max(0,Math.min(1,(($[0]-dt[0])*Qt+($[1]-dt[1])*P)/$t)),Ht=Math.hypot(dt[0]+Lt*Qt-$[0],dt[1]+Lt*P-$[1]);if(!U||Ht<U[0]){let kt=Math.sqrt($t);U=[Ht,-P/kt,Qt/kt]}}if(!U||U[0]>1)return null;let I=(V,at)=>st.some(dt=>eh(dt,V,at));for(let V of[1,-1]){let at=U[1]*V,dt=U[2]*V;if(!I($[0]+at*.3,$[1]+dt*.3))for(let Ft of[Rt,.55,.9,1.1,.4]){let Qt=$[0]+at*Ft,P=$[1]+dt*Ft;if(n(G,Qt,P)&&!I(Qt,P))return[Qt,P]}}return null}function qt(G,$,nt={}){let st=$.doors.map(V=>{let at=Ut($.f,V,$.id)||s($.f,V[0],V[1],6)||V;return{f:$.f,x:at[0],y:at[1],door:V}}).filter(Boolean),U={...nt,allowRooms:[$.id]},I=w(G,st,U);if(I&&(nt.mode||"stairs")==="stairs"&&I.stairFloors>=Lg){let V=w(G,st,{...U,mode:"elevator"});if(V&&V.stairFloors<I.stairFloors)return{...V,mode:"stairs",preferElev:!0}}return I}return{M:i,floors:t,FL:e,walk:n,nearest:s,roomAt:r,ramps:o,shafts:y,links:m,route:w,routeTo:qt,destinations:D,search:B,suggest:pt,findDest:q}}var Ii,Cg,Ig,Pg,Lg,Dg,Ng,Ug,Fg,Og,ts,ho=qe(()=>{th();Ii=3,Cg=4,Ig=4,Pg=2e3,Lg=2,Dg=40,Ng=3,Ug=/^(\dC|\dS|\dW|\dE|\dK)-/,Fg={toilet:["\uD654\uC7A5\uC2E4","toilet","wc","restroom"],elev:["\uC5D8\uB9AC\uBCA0\uC774\uD130","\uC2B9\uAC15\uAE30","elevator","ev"],prof:["\uAD50\uC218","\uAD50\uC218\uC2E4","\uAD50\uC218\uC5F0\uAD6C\uC2E4","\uC5F0\uAD6C\uC2E4"],lab:["\uC2E4\uC2B5\uC2E4","lab"],office:["\uC0AC\uBB34\uC2E4","\uD559\uACFC","\uACFC\uC0AC"],studio:["\uC2A4\uD29C\uB514\uC624"],server:["\uC11C\uBC84"],prep:["\uC900\uBE44\uC2E4"],store:["\uCC3D\uACE0"],room:["\uAC15\uC758\uC2E4","\uAD50\uC2E4"]},Og={toilet:"\uD654\uC7A5\uC2E4",elev:"\uC5D8\uB9AC\uBCA0\uC774\uD130",prof:"\uAD50\uC218\uC5F0\uAD6C\uC2E4",lab:"\uC2E4\uC2B5\uC2E4",office:"\uC0AC\uBB34\uC2E4",studio:"\uC2A4\uD29C\uB514\uC624",server:"\uC11C\uBC84\uC2E4",prep:"\uC900\uBE44\uC2E4",store:"\uCC3D\uACE0",room:"\uAC15\uC758\uC2E4"};ts=i=>xs(i).replace(/호$/,"")});function nr(i,t){let e=t-i;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e}function Ra(i){let t=Math.abs(i),e=i>0?"left":"right",n=i>0?"\uC67C\uCABD":"\uC624\uB978\uCABD";return t<zg?{dir:"straight",word:"\uC9C1\uC9C4",side:""}:t>145?{dir:`u-${e}`,word:"\uB4A4\uB85C \uB3CC\uC544",side:"\uB4A4"}:t<60?{dir:`slight-${e}`,word:`${n} \uBC29\uD5A5\uC73C\uB85C`,side:n}:{dir:e,word:`${n}\uC73C\uB85C`,side:n}}function ir(i,t,e={}){let n=es(i),s=i.pts,r=n[n.length-1],o=y=>{let x=on(i,n,Math.max(0,Math.min(r,y)));return[x.x,x.y]},a=(e.landmarks||[]).filter(y=>!t||y.key!==t.key);function c(y,x,w=3.5){let T=null;for(let C of a)if(!(C.f!==y||C.cat==="store"))for(let N of C.doors){let b=Math.hypot(N[0]-x[0],N[1]-x[1]),M=b-(C.numbered?.5:0);b<w&&(!T||M<T[0])&&(T=[M,C])}return T&&T[1]}let l=y=>[n[y.i0],n[y.i1]];function h(y,x){let w=o(Math.max(x,y-nh)),T=o(y);return Math.hypot(T[0]-w[0],T[1]-w[1])>.2?ys(w,T):null}function u(y,x){let w=o(y),T=o(Math.min(x,y+nh));return Math.hypot(T[0]-w[0],T[1]-w[1])>.2?ys(w,T):null}function f(y){if(y.kind==="stair"){let b=y.link.ramp.pts,M=y.up?b:[...b].reverse();return{inH:ys(M[0],M[1]),outH:ys(M[M.length-2],M[M.length-1]),p0:M[0]}}let x=y.link,w=y.up?x.pa:x.pb,T=y.up?x.qa:x.qb,C=y.up?x.pb:x.pa,N=y.up?x.qb:x.qa;return{inH:ys(w,T),outH:ys(N,C),p0:w}}let d=[],g=i.legs,_=null,m=null;g.forEach((y,x)=>{if(y.kind!=="walk"){let b=f(y),M=g[x-1],D="";if(M&&M.kind==="walk"){let[j,O]=l(M),tt=h(O,j);tt!=null&&(D=Ra(nr(tt,b.inH)).side)}let X=y.to>y.from;d.push({kind:y.kind,dir:y.kind==="elev"?"elev":X?"stair-up":"stair-down",f:y.from,to:y.to,at:b.p0,s:n[y.i0],side:D,id:y.id}),_=b.outH,m=y.kind;return}let[w,T]=l(y),C=[];for(let b=y.i0+1;b<y.i1;b++){let M=n[b],D=h(M,w),X=u(M,T);D==null||X==null||C.push({s:M,d:nr(D,X)})}let N=[];for(let b of C){let M=N[N.length-1];M&&b.s-M.s1<Hg?(M.s1=b.s,M.d=nr(h(M.s0,w)??0,u(b.s,T)??0)):N.push({s0:b.s,s1:b.s,d:b.d})}if(x===0)d.push({kind:"start",dir:"start",f:y.f,at:o(w),s:w});else if(_!=null){let b=u(w,T),M=Ra(b==null?0:nr(_,b));d.push({kind:"walk",dir:M.dir,exit:m,word:M.word,f:y.f,at:o(w),s:w,h0:_,hOut:b})}for(let b of N){let M=Ra(b.d);if(M.dir==="straight")continue;let D=(b.s0+b.s1)/2;d.push({kind:"walk",dir:M.dir,word:M.word,f:y.f,at:o(D),s:D,hOut:u(b.s1,T)})}});for(let y=d.length-1;y>=2;y--){let x=d[y-2],w=d[y-1],T=d[y];x.kind==="stair"&&T.kind==="stair"&&x.dir===T.dir&&x.id===T.id&&w.kind==="walk"&&T.s-w.s<5&&(x.to=T.to,d.splice(y-1,2),y--)}let p=s[s.length-1],v="";if(t){let y=h(r,Math.max(0,r-nh)),x=i.target?.door||t.center;if(y!=null&&x&&Math.hypot(x[0]-p.x,x[1]-p.y)>.2){let w=nr(y,ys([p.x,p.y],x));v=Math.abs(w)<35?"\uC815\uBA74":Math.abs(w)>145?"\uB4A4\uCABD":w>0?"\uC67C\uCABD":"\uC624\uB978\uCABD"}}d.push({kind:"arrive",dir:"arrive",f:p.f,at:[p.x,p.y],s:r,side:v});for(let y=d.length-2;y>=1;y--){let x=d[y],w=d[y+1],T=d[y-1],C=w.s-x.s;if(x.kind==="walk"&&!x.exit&&C<2.5&&w.kind!=="walk"&&w.kind!=="start")d.splice(y,1);else if(T.kind==="walk"&&T.exit&&x.kind==="walk"&&!x.exit&&x.s-T.s<4.5){let N=Ra(x.hOut==null||T.h0==null?0:nr(T.h0,x.hOut));Object.assign(x,{exit:T.exit,dir:N.dir,word:N.word,s:T.s,at:T.at}),d.splice(y-1,1)}}for(let y=0;y<d.length;y++){let x=d[y],w=d[y+1];x.dist=w?Math.max(0,w.s-x.s):0;let T=x.kind==="walk"&&!x.exit?c(x.f,x.at):null,C=w&&x.kind==="start"&&w.kind!=="arrive"?c(w.f,w.at,4):null;if(x.kind==="start")x.action="\uC9C1\uC9C4",x.text=`${C?`${C.title} \uCABD\uC73C\uB85C `:""}${ih(x.dist)} \uC9C1\uC9C4`,x.sub="\uCD9C\uBC1C";else if(x.kind==="walk"){let N=x.exit?x.exit==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130\uC5D0\uC11C \uB0B4\uB824 ":"\uACC4\uB2E8\uC5D0\uC11C \uB098\uC640 ":T?`${T.title} \uC55E\uC5D0\uC11C `:"";x.action=x.word,x.text=x.dir==="straight"?`${N}${ih(x.dist)} \uC9C1\uC9C4`:`${N}${x.word} ${ih(x.dist)}`,x.sub=""}else if(x.kind==="stair"){let N=x.dir==="stair-up"?"\uC62C\uB77C\uAC00\uAE30":"\uB0B4\uB824\uAC00\uAE30";x.action=`\uACC4\uB2E8\uC73C\uB85C ${Je(x.to)}`,x.text=`${x.side&&x.side!=="\uB4A4"?`${x.side}\uC5D0 \uC788\uB294 `:x.side==="\uB4A4"?"\uB4A4\uCABD ":""}\uACC4\uB2E8\uC73C\uB85C ${Je(x.to)}\uAE4C\uC9C0 ${N}`,x.sub=`${Math.abs(x.to-x.f)}\uAC1C \uCE35 ${x.dir==="stair-up"?"\uC704":"\uC544\uB798"}`}else x.kind==="elev"?(x.action=`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C ${Je(x.to)}`,x.text=`${x.side&&x.side!=="\uB4A4"?`${x.side} `:""}\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Je(x.to)}\uC73C\uB85C`,x.sub=`${x.to===0?"B1":x.to}\uCE35 \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`):(x.action="\uB3C4\uCC29",x.text=`${t?t.title:"\uBAA9\uC801\uC9C0"} \uB3C4\uCC29${x.side?` \xB7 ${x.side}`:""}`,x.sub=t&&t.name?t.name:"")}return d}function es(i){let t=[0],e=i.pts;for(let n=1;n<e.length;n++){let s=e[n-1],r=e[n];t.push(t[n-1]+(s.kind==="elev"&&r.kind==="elev"?0:Math.hypot(r.x-s.x,r.y-s.y)))}return t}function Ca(i,t,e,n=0){let s=i.pts,r={d:1/0};for(let a=0;a<s.length-1;a++){let c=s[a],l=s[a+1];if(c.kind==="elev"&&l.kind==="elev"||c.f!==e.f&&l.f!==e.f)continue;let h=l.x-c.x,u=l.y-c.y,f=h*h+u*u||1e-9,d=Math.max(0,Math.min(1,((e.x-c.x)*h+(e.y-c.y)*u)/f)),g=Math.hypot(e.x-c.x-h*d,e.y-c.y-u*d),_=t[a]+d*(t[a+1]-t[a]),m=g+(_<n-3?2:0);(m<r.score||r.d===1/0)&&(r={d:g,s:_,i:a,t:d,score:m})}if(r.d===1/0)return null;let o=t[t.length-1];return{off:r.d,s:r.s,seg:r.i,remain:Math.max(0,o-r.s),total:o}}function uo(i,t,e,n){for(let s=1;s<i.length;s++)if(i[s].s>n+.8)return{step:i[s],index:s,dist:i[s].s-n};return{step:i[i.length-1],index:i.length-1,dist:0}}function sh(i,t){let e=0;for(let n=0;n<i.length;n++)i[n].s<=t+.8&&(e=n);return e}function on(i,t,e){let n=i.pts;for(let r=0;r<n.length-1;r++)if(t[r+1]>=e){let o=t[r+1]-t[r],a=o>0?(e-t[r])/o:1,c=n[r],l=n[r+1];return{x:c.x+(l.x-c.x)*a,y:c.y+(l.y-c.y)*a,z:c.z+(l.z-c.z)*a,f:a<.5?c.f:l.f,i:r}}return{...n[n.length-1],i:n.length-1}}function Ia(i){let t=i/1.2;return t<60?`${Math.max(10,Math.round(t/10)*10)}\uCD08`:`${Math.round(t/60)}\uBD84`}var zg,nh,Hg,Vg,ys,ih,rh=qe(()=>{ho();zg=35,nh=3,Hg=3,Vg=180/Math.PI,ys=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*Vg;ih=i=>`${Math.max(1,Math.round(i))}m`});function Kn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(En[i&255]+En[i>>8&255]+En[i>>16&255]+En[i>>24&255]+"-"+En[t&255]+En[t>>8&255]+"-"+En[t>>16&15|64]+En[t>>24&255]+"-"+En[e&63|128]+En[e>>8&255]+"-"+En[e>>16&255]+En[e>>24&255]+En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]).toLowerCase()}function _e(i,t,e){return Math.max(t,Math.min(e,i))}function pu(i,t){return(i%t+t)%t}function Gg(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Wg(i,t,e){return i!==t?(e-i)/(t-i):0}function wo(i,t,e){return(1-e)*i+e*t}function Xg(i,t,e,n){return wo(i,t,1-Math.exp(-e*n))}function qg(i,t=1){return t-Math.abs(pu(i,t*2)-t)}function Yg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function $g(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Zg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Kg(i,t){return i+Math.random()*(t-i)}function jg(i){return i*(.5-Math.random())}function Jg(i){i!==void 0&&(Zf=i);let t=Zf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Qg(i){return i*Sr}function t0(i){return i*Cs}function e0(i){return(i&i-1)===0&&i!==0}function n0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function i0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function s0(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ai(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}function mu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ap(){let i=Ar("canvas");return i.style.display="block",i}function Rr(i){i in jf||(jf[i]=!0,console.warn(i))}function Rp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function r0(){let i={enabled:!0,workingColorSpace:yn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ke&&(s.r=Oi(s.r),s.g=Oi(s.g),s.b=Oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ke&&(s.r=br(s.r),s.g=br(s.g),s.b=br(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zi?Ro:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Rr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Rr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[yn]:{primaries:t,whitePoint:n,transfer:Ro,toXYZ:Jf,fromXYZ:Qf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:n,transfer:ke,toXYZ:Jf,fromXYZ:Qf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),i}function Oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function br(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function ch(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function hh(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ms.fromArray(i,r);let a=s.x*Math.abs(Ms.x)+s.y*Math.abs(Ms.y)+s.z*Math.abs(Ms.z),c=t.dot(Ms),l=e.dot(Ms),h=n.dot(Ms);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}function bh(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}function x0(i,t,e,n,s,r,o,a){let c;if(t.side===vn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===li,a),c===null)return null;Xa.copy(a),Xa.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Xa);return l<e.near||l>e.far?null:{distance:l,point:Xa.clone(),object:i}}function qa(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Ha),i.getVertexPosition(c,Va),i.getVertexPosition(l,Ga);let h=x0(i,t,e,n,Ha,Va,Ga,hd);if(h){let u=new L;pi.getBarycoord(hd,Ha,Va,Ga,u),s&&(h.uv=pi.getInterpolatedAttribute(s,a,c,l,u,new Pt)),r&&(h.uv1=pi.getInterpolatedAttribute(r,a,c,l,u,new Pt)),o&&(h.normal=pi.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new L,materialIndex:0};pi.getNormal(Ha,Va,Ga,f.normal),h.face=f,h.barycoord=u}return h}function Ws(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Cn(i){let t={};for(let e=0;e<i.length;e++){let n=Ws(i[e]);for(let s in n)t[s]=n[s]}return t}function y0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function gu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ae.workingColorSpace}function Za(i,t,e,n,s,r){yr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(xo.x=r*yr.x-s*yr.y,xo.y=s*yr.x+r*yr.y):xo.copy(yr),i.copy(t),i.x+=xo.x,i.y+=xo.y,i.applyMatrix4(Pp)}function tc(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(yc.fromBufferAttribute(a,s),vc.fromBufferAttribute(a,r),e.distanceSqToSegment(yc,vc,Ih,Ed)>n)return;Ih.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Ih);if(!(l<t.near||l>t.far))return{distance:l,point:Ed.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}function Rd(i,t,e,n,s,r,o){let a=Gh.distanceSqToPoint(i);if(a<e){let c=new L;Gh.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}function _u(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}function Cd(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function C0(i,t){let e=1-i;return e*e*t}function I0(i,t){return 2*(1-i)*i*t}function P0(i,t){return i*i*t}function To(i,t,e,n){return C0(i,t)+I0(i,e)+P0(i,n)}function L0(i,t){let e=1-i;return e*e*e*t}function D0(i,t){let e=1-i;return 3*e*e*i*t}function N0(i,t){return 3*(1-i)*i*i*t}function U0(i,t){return i*i*i*t}function Ao(i,t,e,n,s){return L0(i,t)+D0(i,e)+N0(i,n)+U0(i,s)}function F0(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Lp(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=H0(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){let d=i[f],g=i[f+1];d<a&&(a=d),g<c&&(c=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Ko(r,o,e,a,c,l,0),o}function Lp(i,t,e,n,s){let r;if(s===J0(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Pd(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Pd(o/n|0,i[o],i[o+1],r);return r&&Br(r,r.next)&&(Jo(r),r=r.next),r}function Ds(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Br(e,e.next)||en(e.prev,e,e.next)===0)){if(Jo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ko(i,t,e,n,s,r,o){if(!i)return;!o&&r&&q0(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?B0(i,n,s,r):O0(i)){t.push(c.i,i.i,l.i),Jo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=k0(Ds(i),t),Ko(i,t,e,n,s,r,2)):o===2&&z0(i,t,e,n,s,r):Ko(Ds(i),t,e,n,s,r,1);break}}}function O0(i){let t=i.prev,e=i,n=i.next;if(en(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Eo(s,a,r,c,o,l,g.x,g.y)&&en(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function B0(i,t,e,n){let s=i.prev,r=i,o=i.next;if(en(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),g=Math.min(h,u,f),_=Math.max(a,c,l),m=Math.max(h,u,f),p=Wh(d,g,t,e,n),v=Wh(_,m,t,e,n),y=i.prevZ,x=i.nextZ;for(;y&&y.z>=p&&x&&x.z<=v;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Eo(a,h,c,u,l,f,y.x,y.y)&&en(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Eo(a,h,c,u,l,f,x.x,x.y)&&en(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Eo(a,h,c,u,l,f,y.x,y.y)&&en(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=v;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Eo(a,h,c,u,l,f,x.x,x.y)&&en(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function k0(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Br(n,s)&&Np(n,e,e.next,s)&&jo(n,s)&&jo(s,n)&&(t.push(n.i,e.i,s.i),Jo(e),Jo(e.next),e=i=s),e=e.next}while(e!==i);return Ds(e)}function z0(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Z0(o,a)){let c=Up(o,a);o=Ds(o,o.next),c=Ds(c,c.next),Ko(o,t,e,n,s,r,0),Ko(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function H0(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Lp(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push($0(l))}s.sort(V0);for(let r=0;r<s.length;r++)e=G0(s[r],e);return e}function V0(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function G0(i,t){let e=W0(i,t);if(!e)return t;let n=Up(e,i);return Ds(n,n.next),Ds(e,e.next)}function W0(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Br(i,e))return e;do{if(Br(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Dp(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);jo(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&X0(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function X0(i,t){return en(i.prev,i,t.prev)<0&&en(t.next,i,i.next)<0}function q0(i,t,e,n){let s=i;do s.z===0&&(s.z=Wh(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Y0(s)}function Y0(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Wh(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function $0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Dp(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Eo(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Dp(i,t,e,n,s,r,o,a)}function Z0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!K0(i,t)&&(jo(i,t)&&jo(t,i)&&j0(i,t)&&(en(i.prev,i,t.prev)||en(i,t.prev,t))||Br(i,t)&&en(i.prev,i,i.next)>0&&en(t.prev,t,t.next)>0)}function en(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Br(i,t){return i.x===t.x&&i.y===t.y}function Np(i,t,e,n){let s=cc(en(i,t,e)),r=cc(en(i,t,n)),o=cc(en(e,n,i)),a=cc(en(e,n,t));return!!(s!==r&&o!==a||s===0&&ac(i,e,t)||r===0&&ac(i,n,t)||o===0&&ac(e,i,n)||a===0&&ac(e,t,n))}function ac(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function cc(i){return i>0?1:i<0?-1:0}function K0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Np(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function jo(i,t){return en(i.prev,i,i.next)<0?en(i,t,i.next)>=0&&en(i,i.prev,t)>=0:en(i,t,i.prev)<0||en(i,i.next,t)<0}function j0(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Up(i,t){let e=Xh(i.i,i.x,i.y),n=Xh(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Pd(i,t,e,n){let s=Xh(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Jo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Xh(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function J0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}function Ld(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Dd(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}function Q0(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}function lc(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function t_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function e_(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function Nd(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=i[a+c]}return s}function Fp(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}function n_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vi;case"vector":case"vector2":case"vector3":case"vector4":return Si;case"color":return ta;case"quaternion":return Mi;case"bool":case"boolean":return Gi;case"string":return Wi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function i_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=n_(i.type);if(i.times===void 0){let e=[],n=[];Fp(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}function kd(i,t){return i.distance-t.distance}function Jh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Jh(r[o],t,e,!0)}}function vu(i,t,e,n){let s=f_(n);switch(e){case cu:return i*t;case jc:return i*t/s.components*s.byteLength;case Jc:return i*t/s.components*s.byteLength;case hu:return i*t*2/s.components*s.byteLength;case Qc:return i*t*2/s.components*s.byteLength;case lu:return i*t*3/s.components*s.byteLength;case $n:return i*t*4/s.components*s.byteLength;case tl:return i*t*4/s.components*s.byteLength;case ha:case ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case fa:case da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nl:case sl:return Math.max(i,16)*Math.max(t,8)/4;case el:case il:return Math.max(i,8)*Math.max(t,8)/2;case rl:case ol:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case al:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case cl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ll:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case pl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case _l:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case xl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case yl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Sl:case bl:case El:return Math.ceil(i/4)*Math.ceil(t/4)*16;case wl:case Tl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Al:case Rl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function f_(i){switch(i){case fi:case su:return{byteLength:1,components:1};case Vr:case ru:case Gr:return{byteLength:2,components:1};case Zc:case Kc:return{byteLength:2,components:4};case ps:case $c:case ti:return{byteLength:4,components:1};case ou:case au:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var Un,Rn,zd,Qh,Hd,ca,Vd,Ei,li,vn,Le,Yi,ws,tu,eu,nu,Gd,cs,Wd,Xd,qd,Yd,$d,Zd,Kd,jd,uc,fc,Jd,Qd,tp,ep,np,ip,sp,rp,op,Fc,Oc,Bc,Ts,kc,zc,Hc,Vc,Gc,ap,cp,$i,lp,hp,up,fp,dp,pp,Wc,Bh,mp,iu,Hs,Vs,Xc,qc,la,jn,mi,wr,xn,Yc,Gs,Ln,Hr,ui,fi,su,ru,Vr,$c,ps,ti,Gr,Zc,Kc,Wr,ou,au,cu,lu,$n,Tr,Xr,jc,Jc,hu,Qc,tl,ha,ua,fa,da,el,nl,il,sl,rl,ol,al,cl,ll,hl,ul,fl,dl,pl,ml,gl,_l,xl,yl,vl,Ml,Sl,bl,El,wl,Tl,Al,Rl,As,Rs,hc,kh,zh,Hh,gp,uu,pa,qr,_p,xp,Cl,yp,Zi,Ke,yn,Ro,ke,Es,Vh,vp,Mp,Sp,fu,bp,Ep,wp,Tp,dc,du,ci,Co,_i,En,Zf,Sr,Cs,Ki,Pt,Dn,L,oh,Kf,ge,ah,jf,Jf,Qf,Ae,sr,pc,o0,Cr,a0,lh,un,Ue,mc,Jn,Io,gc,Nn,Pi,si,Pa,rr,or,ar,ns,is,vs,fo,La,Da,Ms,c0,po,uh,kn,Li,fh,Na,ss,dh,Ua,ph,xi,he,cr,ri,l0,h0,rs,Fa,Wn,td,ed,Qn,Ir,u0,nd,lr,Di,Oa,mo,f0,d0,id,sd,rd,od,p0,hr,mh,ze,oi,Ni,gh,Ui,ur,fr,ad,_h,xh,yh,vh,Mh,Sh,pi,Cp,os,Ba,ce,wn,m0,Tn,Oe,ln,ka,g0,Ye,Po,Lo,Ce,_0,Zn,Eh,dr,Xn,go,_n,He,cd,Ss,za,ld,Ha,Va,Ga,wh,Wa,hd,Xa,fe,ls,Ip,v0,M0,qn,Do,as,ud,fd,tn,pr,mr,_c,No,xc,sn,S0,Pr,hi,Is,Pn,hs,Lr,gr,_o,_r,xr,yr,xo,Pp,Ya,yo,$a,dd,Th,pd,Uo,md,gd,_d,b0,xd,Ka,Ah,yd,Rh,Fo,Dr,Oo,vd,E0,Bo,us,vr,Md,ja,Sd,w0,vo,Mo,Ps,Ch,T0,A0,Bn,bs,R0,Ja,Nr,Bi,yc,vc,bd,So,Qa,Ih,Ed,ki,wd,Td,Ls,ko,Ur,Ad,Gh,ec,nc,zo,zi,Ho,Vo,yi,Fr,Go,ic,sc,Ph,rc,Wo,Yn,Or,Mc,oc,Lh,Dh,Nh,Sc,Xo,bc,qo,Ec,Yo,wc,$o,Id,Tc,Zo,fs,qh,Er,Ns,Us,Fs,Os,An,zn,Hi,Ac,Rc,Qo,Vi,Cc,Ic,Pc,Hn,Gi,ta,vi,Lc,Mi,Wi,Si,ea,gi,Dc,Op,bi,Fi,Yh,kr,Mr,Nc,na,Bs,ks,Uh,Ud,Fd,ia,$h,sa,Od,bo,Fh,Zh,zs,Xi,Kh,ds,qi,Oh,ra,Uc,xu,s_,yu,r_,o_,a_,c_,l_,h_,u_,jh,Xe,WS,Bd,oa,zr,aa,Mu=qe(()=>{Un={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Rn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zd=0,Qh=1,Hd=2,ca=1,Vd=2,Ei=3,li=0,vn=1,Le=2,Yi=0,ws=1,tu=2,eu=3,nu=4,Gd=5,cs=100,Wd=101,Xd=102,qd=103,Yd=104,$d=200,Zd=201,Kd=202,jd=203,uc=204,fc=205,Jd=206,Qd=207,tp=208,ep=209,np=210,ip=211,sp=212,rp=213,op=214,Fc=0,Oc=1,Bc=2,Ts=3,kc=4,zc=5,Hc=6,Vc=7,Gc=0,ap=1,cp=2,$i=0,lp=1,hp=2,up=3,fp=4,dp=5,pp=6,Wc=7,Bh="attached",mp="detached",iu=300,Hs=301,Vs=302,Xc=303,qc=304,la=306,jn=1e3,mi=1001,wr=1002,xn=1003,Yc=1004,Gs=1005,Ln=1006,Hr=1007,ui=1008,fi=1009,su=1010,ru=1011,Vr=1012,$c=1013,ps=1014,ti=1015,Gr=1016,Zc=1017,Kc=1018,Wr=1020,ou=35902,au=35899,cu=1021,lu=1022,$n=1023,Tr=1026,Xr=1027,jc=1028,Jc=1029,hu=1030,Qc=1031,tl=1033,ha=33776,ua=33777,fa=33778,da=33779,el=35840,nl=35841,il=35842,sl=35843,rl=36196,ol=37492,al=37496,cl=37808,ll=37809,hl=37810,ul=37811,fl=37812,dl=37813,pl=37814,ml=37815,gl=37816,_l=37817,xl=37818,yl=37819,vl=37820,Ml=37821,Sl=36492,bl=36494,El=36495,wl=36283,Tl=36284,Al=36285,Rl=36286,As=2300,Rs=2301,hc=2302,kh=2400,zh=2401,Hh=2402,gp=2500,uu=0,pa=1,qr=2,_p=3200,xp=3201,Cl=0,yp=1,Zi="",Ke="srgb",yn="srgb-linear",Ro="linear",ke="srgb",Es=7680,Vh=519,vp=512,Mp=513,Sp=514,fu=515,bp=516,Ep=517,wp=518,Tp=519,dc=35044,du="300 es",ci=2e3,Co=2001,_i=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zf=1234567,Sr=Math.PI/180,Cs=180/Math.PI;Ki={DEG2RAD:Sr,RAD2DEG:Cs,generateUUID:Kn,clamp:_e,euclideanModulo:pu,mapLinear:Gg,inverseLerp:Wg,lerp:wo,damp:Xg,pingpong:qg,smoothstep:Yg,smootherstep:$g,randInt:Zg,randFloat:Kg,randFloatSpread:jg,seededRandom:Jg,degToRad:Qg,radToDeg:t0,isPowerOfTwo:e0,ceilPowerOfTwo:n0,floorPowerOfTwo:i0,setQuaternionFromProperEuler:s0,normalize:Be,denormalize:ai},Pt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=_e(this.x,t.x,e.x),this.y=_e(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=_e(this.x,t,e),this.y=_e(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(_e(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(_e(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Dn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a,p=c*f+l*d+h*g+u*_,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let w=Math.sqrt(y),T=Math.atan2(w,p*v);m=Math.sin(m*T)/w,a=Math.sin(a*T)/w}let x=a*v;if(c=c*m+f*x,l=l*m+d*x,h=h*m+g*x,u=u*m+_*x,m===1-a){let w=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=w,l*=w,h*=w,u*=w}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(_e(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=_e(this.x,t.x,e.x),this.y=_e(this.y,t.y,e.y),this.z=_e(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=_e(this.x,t,e),this.y=_e(this.y,t,e),this.z=_e(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(_e(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oh.copy(this).projectOnVector(t),this.sub(oh)}reflect(t){return this.sub(oh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(_e(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},oh=new L,Kf=new Dn,ge=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],v=s[1],y=s[4],x=s[7],w=s[2],T=s[5],C=s[8];return r[0]=o*_+a*v+c*w,r[3]=o*m+a*y+c*T,r[6]=o*p+a*x+c*C,r[1]=l*_+h*v+u*w,r[4]=l*m+h*y+u*T,r[7]=l*p+h*x+u*C,r[2]=f*_+d*v+g*w,r[5]=f*m+d*y+g*T,r[8]=f*p+d*x+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ah.makeScale(t,e)),this}rotate(t){return this.premultiply(ah.makeRotation(-t)),this}translate(t,e){return this.premultiply(ah.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ah=new ge;jf={};Jf=new ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qf=new ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ae=r0();pc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{sr===void 0&&(sr=Ar("canvas")),sr.width=t.width,sr.height=t.height;let s=sr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=sr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ar("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Oi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Oi(e[n]/255)*255):e[n]=Oi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},o0=0,Cr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ch(s[o].image)):r.push(ch(s[o]))}else r=ch(s);n.url=r}return e||(t.images[this.uuid]=n),n}};a0=0,lh=new L,un=class i extends _i{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=mi,s=mi,r=Ln,o=ui,a=$n,c=fi,l=i.DEFAULT_ANISOTROPY,h=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=Kn(),this.name="",this.source=new Cr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(lh).x}get height(){return this.source.getSize(lh).y}get depth(){return this.source.getSize(lh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==iu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jn:t.x=t.x-Math.floor(t.x);break;case mi:t.x=t.x<0?0:1;break;case wr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jn:t.y=t.y-Math.floor(t.y);break;case mi:t.y=t.y<0?0:1;break;case wr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=iu;un.DEFAULT_ANISOTROPY=1;Ue=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,x=(d+1)/2,w=(p+1)/2,T=(h+f)/4,C=(u+_)/4,N=(g+m)/4;return y>x&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=C/n):x>w?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=N/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=N/r),this.set(n,s,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(f-h)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=_e(this.x,t.x,e.x),this.y=_e(this.y,t.y,e.y),this.z=_e(this.z,t.z,e.z),this.w=_e(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=_e(this.x,t,e),this.y=_e(this.y,t,e),this.z=_e(this.z,t,e),this.w=_e(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(_e(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},mc=class extends _i{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ue(0,0,t,e),this.scissorTest=!1,this.viewport=new Ue(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new un(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:Ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Cr(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jn=class extends mc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Io=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=xn,this.minFilter=xn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},gc=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=xn,this.minFilter=xn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Nn=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(si.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(si.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=si.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,si):si.fromBufferAttribute(r,o),si.applyMatrix4(t.matrixWorld),this.expandByPoint(si);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pa.copy(n.boundingBox)),Pa.applyMatrix4(t.matrixWorld),this.union(Pa)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,si),si.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fo),La.subVectors(this.max,fo),rr.subVectors(t.a,fo),or.subVectors(t.b,fo),ar.subVectors(t.c,fo),ns.subVectors(or,rr),is.subVectors(ar,or),vs.subVectors(rr,ar);let e=[0,-ns.z,ns.y,0,-is.z,is.y,0,-vs.z,vs.y,ns.z,0,-ns.x,is.z,0,-is.x,vs.z,0,-vs.x,-ns.y,ns.x,0,-is.y,is.x,0,-vs.y,vs.x,0];return!hh(e,rr,or,ar,La)||(e=[1,0,0,0,1,0,0,0,1],!hh(e,rr,or,ar,La))?!1:(Da.crossVectors(ns,is),e=[Da.x,Da.y,Da.z],hh(e,rr,or,ar,La))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,si).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(si).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Pi=[new L,new L,new L,new L,new L,new L,new L,new L],si=new L,Pa=new Nn,rr=new L,or=new L,ar=new L,ns=new L,is=new L,vs=new L,fo=new L,La=new L,Da=new L,Ms=new L;c0=new Nn,po=new L,uh=new L,kn=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):c0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;po.subVectors(t,this.center);let e=po.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(po,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(uh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(po.copy(t.center).add(uh)),this.expandByPoint(po.copy(t.center).sub(uh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Li=new L,fh=new L,Na=new L,ss=new L,dh=new L,Ua=new L,ph=new L,xi=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Li.copy(this.origin).addScaledVector(this.direction,e),Li.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){fh.copy(t).add(e).multiplyScalar(.5),Na.copy(e).sub(t).normalize(),ss.copy(this.origin).sub(fh);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Na),a=ss.dot(this.direction),c=-ss.dot(Na),l=ss.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fh).addScaledVector(Na,f),d}intersectSphere(t,e){Li.subVectors(t.center,this.origin);let n=Li.dot(this.direction),s=Li.dot(Li)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Li)!==null}intersectTriangle(t,e,n,s,r){dh.subVectors(e,t),Ua.subVectors(n,t),ph.crossVectors(dh,Ua);let o=this.direction.dot(ph),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ss.subVectors(this.origin,t);let c=a*this.direction.dot(Ua.crossVectors(ss,Ua));if(c<0)return null;let l=a*this.direction.dot(dh.cross(ss));if(l<0||c+l>o)return null;let h=-a*ss.dot(ph);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},he=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/cr.setFromMatrixColumn(t,0).length(),r=1/cr.setFromMatrixColumn(t,1).length(),o=1/cr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){let f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(l0,t,h0)}lookAt(t,e,n){let s=this.elements;return Wn.subVectors(t,e),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),rs.crossVectors(n,Wn),rs.lengthSq()===0&&(Math.abs(n.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),rs.crossVectors(n,Wn)),rs.normalize(),Fa.crossVectors(Wn,rs),s[0]=rs.x,s[4]=Fa.x,s[8]=Wn.x,s[1]=rs.y,s[5]=Fa.y,s[9]=Wn.y,s[2]=rs.z,s[6]=Fa.z,s[10]=Wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],y=n[7],x=n[11],w=n[15],T=s[0],C=s[4],N=s[8],b=s[12],M=s[1],D=s[5],X=s[9],j=s[13],O=s[2],tt=s[6],B=s[10],pt=s[14],q=s[3],Rt=s[7],Ut=s[11],qt=s[15];return r[0]=o*T+a*M+c*O+l*q,r[4]=o*C+a*D+c*tt+l*Rt,r[8]=o*N+a*X+c*B+l*Ut,r[12]=o*b+a*j+c*pt+l*qt,r[1]=h*T+u*M+f*O+d*q,r[5]=h*C+u*D+f*tt+d*Rt,r[9]=h*N+u*X+f*B+d*Ut,r[13]=h*b+u*j+f*pt+d*qt,r[2]=g*T+_*M+m*O+p*q,r[6]=g*C+_*D+m*tt+p*Rt,r[10]=g*N+_*X+m*B+p*Ut,r[14]=g*b+_*j+m*pt+p*qt,r[3]=v*T+y*M+x*O+w*q,r[7]=v*C+y*D+x*tt+w*Rt,r[11]=v*N+y*X+x*B+w*Ut,r[15]=v*b+y*j+x*pt+w*qt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],v=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,y=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,x=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,w=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,T=e*v+n*y+s*x+r*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return t[0]=v*C,t[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*C,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*C,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*C,t[4]=y*C,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*C,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*C,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*C,t[8]=x*C,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*C,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*C,t[12]=w*C,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*C,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*C,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,v=c*l,y=c*h,x=c*u,w=n.x,T=n.y,C=n.z;return s[0]=(1-(_+p))*w,s[1]=(d+x)*w,s[2]=(g-y)*w,s[3]=0,s[4]=(d-x)*T,s[5]=(1-(f+p))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(g+y)*C,s[9]=(m-v)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=cr.set(s[0],s[1],s[2]).length(),o=cr.set(s[4],s[5],s[6]).length(),a=cr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ri.copy(this);let l=1/r,h=1/o,u=1/a;return ri.elements[0]*=l,ri.elements[1]*=l,ri.elements[2]*=l,ri.elements[4]*=h,ri.elements[5]*=h,ri.elements[6]*=h,ri.elements[8]*=u,ri.elements[9]*=u,ri.elements[10]*=u,e.setFromRotationMatrix(ri),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ci,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===ci)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Co)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ci,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===ci)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Co)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},cr=new L,ri=new he,l0=new L(0,0,0),h0=new L(1,1,1),rs=new L,Fa=new L,Wn=new L,td=new he,ed=new Dn,Qn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(_e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-_e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(_e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-_e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(_e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-_e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return td.makeRotationFromQuaternion(t),this.setFromRotationMatrix(td,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ed.setFromEuler(this),this.setFromQuaternion(ed,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";Ir=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},u0=0,nd=new L,lr=new Dn,Di=new he,Oa=new L,mo=new L,f0=new L,d0=new Dn,id=new L(1,0,0),sd=new L(0,1,0),rd=new L(0,0,1),od={type:"added"},p0={type:"removed"},hr={type:"childadded",child:null},mh={type:"childremoved",child:null},ze=class i extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new Qn,n=new Dn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new ge}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ir,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return lr.setFromAxisAngle(t,e),this.quaternion.multiply(lr),this}rotateOnWorldAxis(t,e){return lr.setFromAxisAngle(t,e),this.quaternion.premultiply(lr),this}rotateX(t){return this.rotateOnAxis(id,t)}rotateY(t){return this.rotateOnAxis(sd,t)}rotateZ(t){return this.rotateOnAxis(rd,t)}translateOnAxis(t,e){return nd.copy(t).applyQuaternion(this.quaternion),this.position.add(nd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(id,t)}translateY(t){return this.translateOnAxis(sd,t)}translateZ(t){return this.translateOnAxis(rd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Di.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oa.copy(t):Oa.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Di.lookAt(mo,Oa,this.up):Di.lookAt(Oa,mo,this.up),this.quaternion.setFromRotationMatrix(Di),s&&(Di.extractRotation(s.matrixWorld),lr.setFromRotationMatrix(Di),this.quaternion.premultiply(lr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(od),hr.child=t,this.dispatchEvent(hr),hr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(p0),mh.child=t,this.dispatchEvent(mh),mh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Di.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Di.multiply(t.parent.matrixWorld)),t.applyMatrix4(Di),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(od),hr.child=t,this.dispatchEvent(hr),hr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,t,f0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,d0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};ze.DEFAULT_UP=new L(0,1,0);ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;oi=new L,Ni=new L,gh=new L,Ui=new L,ur=new L,fr=new L,ad=new L,_h=new L,xh=new L,yh=new L,vh=new Ue,Mh=new Ue,Sh=new Ue,pi=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),oi.subVectors(t,e),s.cross(oi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){oi.subVectors(s,e),Ni.subVectors(n,e),gh.subVectors(t,e);let o=oi.dot(oi),a=oi.dot(Ni),c=oi.dot(gh),l=Ni.dot(Ni),h=Ni.dot(gh),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Ui)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ui.x),c.addScaledVector(o,Ui.y),c.addScaledVector(a,Ui.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return vh.setScalar(0),Mh.setScalar(0),Sh.setScalar(0),vh.fromBufferAttribute(t,e),Mh.fromBufferAttribute(t,n),Sh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(vh,r.x),o.addScaledVector(Mh,r.y),o.addScaledVector(Sh,r.z),o}static isFrontFacing(t,e,n,s){return oi.subVectors(n,e),Ni.subVectors(t,e),oi.cross(Ni).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return oi.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),oi.cross(Ni).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ur.subVectors(s,n),fr.subVectors(r,n),_h.subVectors(t,n);let c=ur.dot(_h),l=fr.dot(_h);if(c<=0&&l<=0)return e.copy(n);xh.subVectors(t,s);let h=ur.dot(xh),u=fr.dot(xh);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ur,o);yh.subVectors(t,r);let d=ur.dot(yh),g=fr.dot(yh);if(g>=0&&d<=g)return e.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(fr,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return ad.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(ad,a);let p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(ur,o).addScaledVector(fr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Cp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},os={h:0,s:0,l:0},Ba={h:0,s:0,l:0};ce=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ae.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,Ae.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Ae.workingColorSpace){if(t=pu(t,1),e=_e(e,0,1),n=_e(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=bh(o,r,t+1/3),this.g=bh(o,r,t),this.b=bh(o,r,t-1/3)}return Ae.colorSpaceToWorking(this,s),this}setStyle(t,e=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){let n=Cp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=br(t.r),this.g=br(t.g),this.b=br(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return Ae.workingToColorSpace(wn.copy(this),t),Math.round(_e(wn.r*255,0,255))*65536+Math.round(_e(wn.g*255,0,255))*256+Math.round(_e(wn.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ae.workingColorSpace){Ae.workingToColorSpace(wn.copy(this),e);let n=wn.r,s=wn.g,r=wn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Ae.workingColorSpace){return Ae.workingToColorSpace(wn.copy(this),e),t.r=wn.r,t.g=wn.g,t.b=wn.b,t}getStyle(t=Ke){Ae.workingToColorSpace(wn.copy(this),t);let e=wn.r,n=wn.g,s=wn.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(os),this.setHSL(os.h+t,os.s+e,os.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(os),t.getHSL(Ba);let n=wo(os.h,Ba.h,e),s=wo(os.s,Ba.s,e),r=wo(os.l,Ba.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},wn=new ce;ce.NAMES=Cp;m0=0,Tn=class extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=ws,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uc,this.blendDst=fc,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ce(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Es,this.stencilZFail=Es,this.stencilZPass=Es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ws&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==uc&&(n.blendSrc=this.blendSrc),this.blendDst!==fc&&(n.blendDst=this.blendDst),this.blendEquation!==cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Oe=class extends Tn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ln=new L,ka=new Pt,g0=0,Ye=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:g0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dc,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ka.fromBufferAttribute(this,e),ka.applyMatrix3(t),this.setXY(e,ka.x,ka.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ln.fromBufferAttribute(this,e),ln.applyMatrix3(t),this.setXYZ(e,ln.x,ln.y,ln.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ln.fromBufferAttribute(this,e),ln.applyMatrix4(t),this.setXYZ(e,ln.x,ln.y,ln.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ln.fromBufferAttribute(this,e),ln.applyNormalMatrix(t),this.setXYZ(e,ln.x,ln.y,ln.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ln.fromBufferAttribute(this,e),ln.transformDirection(t),this.setXYZ(e,ln.x,ln.y,ln.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ai(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ai(e,this.array)),e}setX(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ai(e,this.array)),e}setY(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ai(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ai(e,this.array)),e}setW(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array),r=Be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==dc&&(t.usage=this.usage),t}},Po=class extends Ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}},Lo=class extends Ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}},Ce=class extends Ye{constructor(t,e,n){super(new Float32Array(t),e,n)}},_0=0,Zn=new he,Eh=new ze,dr=new L,Xn=new Nn,go=new Nn,_n=new L,He=class i extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(mu(t)?Lo:Po)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ge().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Zn.makeRotationFromQuaternion(t),this.applyMatrix4(Zn),this}rotateX(t){return Zn.makeRotationX(t),this.applyMatrix4(Zn),this}rotateY(t){return Zn.makeRotationY(t),this.applyMatrix4(Zn),this}rotateZ(t){return Zn.makeRotationZ(t),this.applyMatrix4(Zn),this}translate(t,e,n){return Zn.makeTranslation(t,e,n),this.applyMatrix4(Zn),this}scale(t,e,n){return Zn.makeScale(t,e,n),this.applyMatrix4(Zn),this}lookAt(t){return Eh.lookAt(t),Eh.updateMatrix(),this.applyMatrix4(Eh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ce(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Xn.setFromBufferAttribute(r),this.morphTargetsRelative?(_n.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(_n),_n.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(_n)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Xn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];go.setFromBufferAttribute(a),this.morphTargetsRelative?(_n.addVectors(Xn.min,go.min),Xn.expandByPoint(_n),_n.addVectors(Xn.max,go.max),Xn.expandByPoint(_n)):(Xn.expandByPoint(go.min),Xn.expandByPoint(go.max))}Xn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)_n.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(_n));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)_n.fromBufferAttribute(a,l),c&&(dr.fromBufferAttribute(t,l),_n.add(dr)),s=Math.max(s,n.distanceToSquared(_n))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new L,c[N]=new L;let l=new L,h=new L,u=new L,f=new Pt,d=new Pt,g=new Pt,_=new L,m=new L;function p(N,b,M){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,N),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),d.sub(f),g.sub(f);let D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(D),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),a[N].add(_),a[b].add(_),a[M].add(_),c[N].add(m),c[b].add(m),c[M].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let N=0,b=v.length;N<b;++N){let M=v[N],D=M.start,X=M.count;for(let j=D,O=D+X;j<O;j+=3)p(t.getX(j+0),t.getX(j+1),t.getX(j+2))}let y=new L,x=new L,w=new L,T=new L;function C(N){w.fromBufferAttribute(s,N),T.copy(w);let b=a[N];y.copy(b),y.sub(w.multiplyScalar(w.dot(b))).normalize(),x.crossVectors(T,b);let D=x.dot(c[N])<0?-1:1;o.setXYZW(N,y.x,y.y,y.z,D)}for(let N=0,b=v.length;N<b;++N){let M=v[N],D=M.start,X=M.count;for(let j=D,O=D+X;j<O;j+=3)C(t.getX(j+0)),C(t.getX(j+1)),C(t.getX(j+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_n.fromBufferAttribute(t,e),_n.normalize(),t.setXYZ(e,_n.x,_n.y,_n.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Ye(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},cd=new he,Ss=new xi,za=new kn,ld=new L,Ha=new L,Va=new L,Ga=new L,wh=new L,Wa=new L,hd=new L,Xa=new L,fe=class extends ze{constructor(t=new He,e=new Oe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Wa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(wh.fromBufferAttribute(u,t),o?Wa.addScaledVector(wh,h):Wa.addScaledVector(wh.sub(e),h))}e.add(Wa)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(r),Ss.copy(t.ray).recast(t.near),!(za.containsPoint(Ss.origin)===!1&&(Ss.intersectSphere(za,ld)===null||Ss.origin.distanceToSquared(ld)>(t.far-t.near)**2))&&(cd.copy(r).invert(),Ss.copy(t.ray).applyMatrix4(cd),!(n.boundingBox!==null&&Ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ss)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,w=y;x<w;x+=3){let T=a.getX(x),C=a.getX(x+1),N=a.getX(x+2);s=qa(this,p,t,n,l,h,u,T,C,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let v=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);s=qa(this,o,t,n,l,h,u,v,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,w=y;x<w;x+=3){let T=x,C=x+1,N=x+2;s=qa(this,p,t,n,l,h,u,T,C,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let v=m,y=m+1,x=m+2;s=qa(this,o,t,n,l,h,u,v,y,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};ls=class i extends He{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(u,2));function g(_,m,p,v,y,x,w,T,C,N,b){let M=x/C,D=w/N,X=x/2,j=w/2,O=T/2,tt=C+1,B=N+1,pt=0,q=0,Rt=new L;for(let Ut=0;Ut<B;Ut++){let qt=Ut*D-j;for(let G=0;G<tt;G++){let $=G*M-X;Rt[_]=$*v,Rt[m]=qt*y,Rt[p]=O,l.push(Rt.x,Rt.y,Rt.z),Rt[_]=0,Rt[m]=0,Rt[p]=T>0?1:-1,h.push(Rt.x,Rt.y,Rt.z),u.push(G/C),u.push(1-Ut/N),pt+=1}}for(let Ut=0;Ut<N;Ut++)for(let qt=0;qt<C;qt++){let G=f+qt+tt*Ut,$=f+qt+tt*(Ut+1),nt=f+(qt+1)+tt*(Ut+1),st=f+(qt+1)+tt*Ut;c.push(G,$,st),c.push($,nt,st),q+=6}a.addGroup(d,q,b),d+=q,f+=pt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};Ip={clone:Ws,merge:Cn},v0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,M0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qn=class extends Tn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=v0,this.fragmentShader=M0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ws(t.uniforms),this.uniformsGroups=y0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Do=class extends ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},as=new L,ud=new Pt,fd=new Pt,tn=class extends Do{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){as.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(as.x,as.y).multiplyScalar(-t/as.z),as.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(as.x,as.y).multiplyScalar(-t/as.z)}getViewSize(t,e){return this.getViewBounds(t,ud,fd),e.subVectors(fd,ud)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Sr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},pr=-90,mr=1,_c=class extends ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(pr,mr,t,e);s.layers=this.layers,this.add(s);let r=new tn(pr,mr,t,e);r.layers=this.layers,this.add(r);let o=new tn(pr,mr,t,e);o.layers=this.layers,this.add(o);let a=new tn(pr,mr,t,e);a.layers=this.layers,this.add(a);let c=new tn(pr,mr,t,e);c.layers=this.layers,this.add(c);let l=new tn(pr,mr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===ci)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Co)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},No=class extends un{constructor(t=[],e=Hs,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},xc=class extends Jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new No(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ls(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vn,blending:Yi});r.uniforms.tEquirect.value=e;let o=new fe(s,r),a=e.minFilter;return e.minFilter===ui&&(e.minFilter=Ln),new _c(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},sn=class extends ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},S0={type:"move"},Pr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(S0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new sn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},hi=class extends ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Is=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=dc,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Pn=new L,hs=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Pn.fromBufferAttribute(this,e),Pn.applyMatrix4(t),this.setXYZ(e,Pn.x,Pn.y,Pn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Pn.fromBufferAttribute(this,e),Pn.applyNormalMatrix(t),this.setXYZ(e,Pn.x,Pn.y,Pn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Pn.fromBufferAttribute(this,e),Pn.transformDirection(t),this.setXYZ(e,Pn.x,Pn.y,Pn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ai(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Be(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Be(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Be(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Be(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Be(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ai(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ai(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ai(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ai(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array),r=Be(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ye(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Lr=class extends Tn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ce(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},_o=new L,_r=new L,xr=new L,yr=new Pt,xo=new Pt,Pp=new he,Ya=new L,yo=new L,$a=new L,dd=new Pt,Th=new Pt,pd=new Pt,Uo=class extends ze{constructor(t=new Lr){if(super(),this.isSprite=!0,this.type="Sprite",gr===void 0){gr=new He;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Is(e,5);gr.setIndex([0,1,2,0,2,3]),gr.setAttribute("position",new hs(n,3,0,!1)),gr.setAttribute("uv",new hs(n,2,3,!1))}this.geometry=gr,this.material=t,this.center=new Pt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_r.setFromMatrixScale(this.matrixWorld),Pp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),xr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_r.multiplyScalar(-xr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Za(Ya.set(-.5,-.5,0),xr,o,_r,s,r),Za(yo.set(.5,-.5,0),xr,o,_r,s,r),Za($a.set(.5,.5,0),xr,o,_r,s,r),dd.set(0,0),Th.set(1,0),pd.set(1,1);let a=t.ray.intersectTriangle(Ya,yo,$a,!1,_o);if(a===null&&(Za(yo.set(-.5,.5,0),xr,o,_r,s,r),Th.set(0,1),a=t.ray.intersectTriangle(Ya,$a,yo,!1,_o),a===null))return;let c=t.ray.origin.distanceTo(_o);c<t.near||c>t.far||e.push({distance:c,point:_o.clone(),uv:pi.getInterpolation(_o,Ya,yo,$a,dd,Th,pd,new Pt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};md=new L,gd=new Ue,_d=new Ue,b0=new L,xd=new he,Ka=new L,Ah=new kn,yd=new he,Rh=new xi,Fo=class extends fe{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Bh,this.bindMatrix=new he,this.bindMatrixInverse=new he,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ka),this.boundingBox.expandByPoint(Ka)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new kn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ka),this.boundingSphere.expandByPoint(Ka)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ah.copy(this.boundingSphere),Ah.applyMatrix4(s),t.ray.intersectsSphere(Ah)!==!1&&(yd.copy(s).invert(),Rh.copy(t.ray).applyMatrix4(yd),!(this.boundingBox!==null&&Rh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Rh)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new Ue,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Bh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;gd.fromBufferAttribute(s.attributes.skinIndex,t),_d.fromBufferAttribute(s.attributes.skinWeight,t),md.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=_d.getComponent(r);if(o!==0){let a=gd.getComponent(r);xd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(b0.copy(md).applyMatrix4(xd),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},Dr=class extends ze{constructor(){super(),this.isBone=!0,this.type="Bone"}},Oo=class extends un{constructor(t=null,e=1,n=1,s,r,o,a,c,l=xn,h=xn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vd=new he,E0=new he,Bo=class i{constructor(t=[],e=[]){this.uuid=Kn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new he)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new he;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:E0;vd.multiplyMatrices(a,e[r]),vd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Oo(e,t,t,$n,ti);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Dr),this.bones.push(o),this.boneInverses.push(new he().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},us=class extends Ye{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},vr=new he,Md=new he,ja=[],Sd=new Nn,w0=new he,vo=new fe,Mo=new kn,Ps=class extends fe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new us(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,w0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,vr),Sd.copy(t.boundingBox).applyMatrix4(vr),this.boundingBox.union(Sd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new kn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,vr),Mo.copy(t.boundingSphere).applyMatrix4(vr),this.boundingSphere.union(Mo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(vo.geometry=this.geometry,vo.material=this.material,vo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mo.copy(this.boundingSphere),Mo.applyMatrix4(n),t.ray.intersectsSphere(Mo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,vr),Md.multiplyMatrices(n,vr),vo.matrixWorld=Md,vo.raycast(t,ja);for(let o=0,a=ja.length;o<a;o++){let c=ja[o];c.instanceId=r,c.object=this,e.push(c)}ja.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new us(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oo(new Float32Array(s*this.count),s,this.count,jc,ti));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ch=new L,T0=new L,A0=new ge,Bn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ch.subVectors(n,e).cross(T0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ch),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||A0.getNormalMatrix(t),s=this.coplanarPoint(Ch).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},bs=new kn,R0=new Pt(.5,.5),Ja=new L,Nr=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,o=new Bn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ci,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],v=r[12],y=r[13],x=r[14],w=r[15];if(s[0].setComponents(l-o,d-h,p-g,w-v).normalize(),s[1].setComponents(l+o,d+h,p+g,w+v).normalize(),s[2].setComponents(l+a,d+u,p+_,w+y).normalize(),s[3].setComponents(l-a,d-u,p-_,w-y).normalize(),n)s[4].setComponents(c,f,m,x).normalize(),s[5].setComponents(l-c,d-f,p-m,w-x).normalize();else if(s[4].setComponents(l-c,d-f,p-m,w-x).normalize(),e===ci)s[5].setComponents(l+c,d+f,p+m,w+x).normalize();else if(e===Co)s[5].setComponents(c,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bs)}intersectsSprite(t){bs.center.set(0,0,0);let e=R0.distanceTo(t.center);return bs.radius=.7071067811865476+e,bs.applyMatrix4(t.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ja.x=s.normal.x>0?t.max.x:t.min.x,Ja.y=s.normal.y>0?t.max.y:t.min.y,Ja.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Bi=class extends Tn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},yc=new L,vc=new L,bd=new he,So=new xi,Qa=new kn,Ih=new L,Ed=new L,ki=class extends ze{constructor(t=new He,e=new Bi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)yc.fromBufferAttribute(e,s-1),vc.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=yc.distanceTo(vc);t.setAttribute("lineDistance",new Ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qa.copy(n.boundingSphere),Qa.applyMatrix4(s),Qa.radius+=r,t.ray.intersectsSphere(Qa)===!1)return;bd.copy(s).invert(),So.copy(t.ray).applyMatrix4(bd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){let p=h.getX(_),v=h.getX(_+1),y=tc(this,t,So,c,p,v,_);y&&e.push(y)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(d),p=tc(this,t,So,c,_,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){let p=tc(this,t,So,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=tc(this,t,So,c,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};wd=new L,Td=new L,Ls=class extends ki{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)wd.fromBufferAttribute(e,s),Td.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+wd.distanceTo(Td);t.setAttribute("lineDistance",new Ce(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ko=class extends ki{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Ur=class extends Tn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ad=new he,Gh=new xi,ec=new kn,nc=new L,zo=class extends ze{constructor(t=new He,e=new Ur){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ec.copy(n.boundingSphere),ec.applyMatrix4(s),ec.radius+=r,t.ray.intersectsSphere(ec)===!1)return;Ad.copy(s).invert(),Gh.copy(t.ray).applyMatrix4(Ad);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){let m=l.getX(g);nc.fromBufferAttribute(u,m),Rd(nc,m,c,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)nc.fromBufferAttribute(u,g),Rd(nc,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};zi=class extends un{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ho=class extends un{constructor(t,e,n=ps,s,r,o,a=xn,c=xn,l,h=Tr,u=1){if(h!==Tr&&h!==Xr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Cr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Vo=class extends un{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},yi=class i extends He{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new L,h=new Pt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ce(o,3)),this.setAttribute("normal",new Ce(a,3)),this.setAttribute("uv",new Ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Fr=class i extends He{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,_=[],m=n/2,p=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(f,3)),this.setAttribute("uv",new Ce(d,2));function v(){let x=new L,w=new L,T=0,C=(e-t)/n;for(let N=0;N<=r;N++){let b=[],M=N/r,D=M*(e-t)+t;for(let X=0;X<=s;X++){let j=X/s,O=j*c+a,tt=Math.sin(O),B=Math.cos(O);w.x=D*tt,w.y=-M*n+m,w.z=D*B,u.push(w.x,w.y,w.z),x.set(tt,C,B).normalize(),f.push(x.x,x.y,x.z),d.push(j,1-M),b.push(g++)}_.push(b)}for(let N=0;N<s;N++)for(let b=0;b<r;b++){let M=_[b][N],D=_[b+1][N],X=_[b+1][N+1],j=_[b][N+1];(t>0||b!==0)&&(h.push(M,D,j),T+=3),(e>0||b!==r-1)&&(h.push(D,X,j),T+=3)}l.addGroup(p,T,0),p+=T}function y(x){let w=g,T=new Pt,C=new L,N=0,b=x===!0?t:e,M=x===!0?1:-1;for(let X=1;X<=s;X++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;let D=g;for(let X=0;X<=s;X++){let O=X/s*c+a,tt=Math.cos(O),B=Math.sin(O);C.x=b*B,C.y=m*M,C.z=b*tt,u.push(C.x,C.y,C.z),f.push(0,M,0),T.x=tt*.5+.5,T.y=B*.5*M+.5,d.push(T.x,T.y),g++}for(let X=0;X<s;X++){let j=w+X,O=D+X;x===!0?h.push(O,O+1,j):h.push(O+1,O,j),N+=3}l.addGroup(p,N,x===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Go=class i extends Fr{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ic=new L,sc=new L,Ph=new L,rc=new pi,Wo=class extends He{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Sr*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:m,c:p}=rc;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),rc.getNormal(Ph),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let v=0;v<3;v++){let y=(v+1)%3,x=u[v],w=u[y],T=rc[h[v]],C=rc[h[y]],N=`${x}_${w}`,b=`${w}_${x}`;b in f&&f[b]?(Ph.dot(f[b].normal)<=r&&(d.push(T.x,T.y,T.z),d.push(C.x,C.y,C.z)),f[b]=null):N in f||(f[N]={index0:l[v],index1:l[y],normal:Ph.clone()})}}for(let g in f)if(f[g]){let{index0:_,index1:m}=f[g];ic.fromBufferAttribute(a,_),sc.fromBufferAttribute(a,m),d.push(ic.x,ic.y,ic.z),d.push(sc.x,sc.y,sc.z)}this.setAttribute("position",new Ce(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},Yn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Pt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new L,s=[],r=[],o=[],a=new L,c=new he;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(_e(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(_e(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Or=class extends Yn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Pt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Mc=class extends Or{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};oc=new L,Lh=new _u,Dh=new _u,Nh=new _u,Sc=class extends Yn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(oc.subVectors(s[0],s[1]).add(s[0]),l=oc);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(oc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=oc),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Lh.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),Dh.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),Nh.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Lh.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Dh.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Nh.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Lh.calc(c),Dh.calc(c),Nh.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Xo=class extends Yn{constructor(t=new Pt,e=new Pt,n=new Pt,s=new Pt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Pt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ao(t,s.x,r.x,o.x,a.x),Ao(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},bc=class extends Yn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ao(t,s.x,r.x,o.x,a.x),Ao(t,s.y,r.y,o.y,a.y),Ao(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},qo=class extends Yn{constructor(t=new Pt,e=new Pt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Pt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Pt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ec=class extends Yn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Yo=class extends Yn{constructor(t=new Pt,e=new Pt,n=new Pt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Pt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(To(t,s.x,r.x,o.x),To(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},wc=class extends Yn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(To(t,s.x,r.x,o.x),To(t,s.y,r.y,o.y),To(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$o=class extends Yn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Pt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Cd(a,c.x,l.x,h.x,u.x),Cd(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Pt().fromArray(s))}return this}},Id=Object.freeze({__proto__:null,ArcCurve:Mc,CatmullRomCurve3:Sc,CubicBezierCurve:Xo,CubicBezierCurve3:bc,EllipseCurve:Or,LineCurve:qo,LineCurve3:Ec,QuadraticBezierCurve:Yo,QuadraticBezierCurve3:wc,SplineCurve:$o}),Tc=class extends Yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Id[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Id[s.type]().fromJSON(s))}return this}},Zo=class extends Tc{constructor(t){super(),this.type="Path",this.currentPoint=new Pt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new qo(this.currentPoint.clone(),new Pt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Yo(this.currentPoint.clone(),new Pt(t,e),new Pt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Xo(this.currentPoint.clone(),new Pt(t,e),new Pt(n,s),new Pt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new $o(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Or(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},fs=class extends Zo{constructor(t){super(t),this.uuid=Kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Zo().fromJSON(s))}return this}};qh=class{static triangulate(t,e,n=2){return F0(t,e,n)}},Er=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Ld(t),Dd(n,t);let o=t.length;e.forEach(Ld);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Dd(n,e[c]);let a=qh.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};Ns=class i extends He{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let v=p*f-o;for(let y=0;y<l;y++){let x=y*u-r;g.push(x,-v,0),_.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let y=v+l*p,x=v+l*(p+1),w=v+1+l*(p+1),T=v+1+l*p;d.push(y,x,T),d.push(x,w,T)}this.setIndex(d),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(_,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Us=class i extends He{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new L,g=new Pt;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){let p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){let m=_*(n+1);for(let p=0;p<n;p++){let v=p+m,y=v,x=v+n+1,w=v+n+2,T=v+1;a.push(y,x,T),a.push(x,w,T)}}this.setIndex(a),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(l,3)),this.setAttribute("uv",new Ce(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Fs=class i extends He{constructor(t=new fs([new Pt(0,.5),new Pt(-.5,-.5),new Pt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ce(s,3)),this.setAttribute("normal",new Ce(r,3)),this.setAttribute("uv",new Ce(o,2));function l(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,g=f.holes;Er.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){let v=g[m];Er.isClockWise(v)===!0&&(g[m]=v.reverse())}let _=Er.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){let v=g[m];d=d.concat(v)}for(let m=0,p=d.length;m<p;m++){let v=d[m];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let m=0,p=_.length;m<p;m++){let v=_[m],y=v[0]+u,x=v[1]+u,w=v[2]+u;n.push(y,x,w),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Q0(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};Os=class i extends He{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new L,f=new L,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let v=[],y=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let w=0;w<=e;w++){let T=w/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(T+x,1-y),v.push(l++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){let y=h[p][v+1],x=h[p][v],w=h[p+1][v],T=h[p+1][v+1];(p!==0||o>0)&&d.push(y,x,T),(p!==n-1||c<Math.PI)&&d.push(x,w,T)}this.setIndex(d),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(_,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},An=class extends Tn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cl,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},zn=class extends An{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return _e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},Hi=class extends Tn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cl,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ac=class extends Tn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_p,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Rc=class extends Tn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Qo=class extends Bi{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};Vi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Cc=class extends Vi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kh,endingEnd:kh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case zh:r=t,a=2*e-n;break;case Hh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case zh:o=t,c=2*n-e;break;case Hh:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,v=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*_+.5*g,x=d*m-d*_;for(let w=0;w!==a;++w)r[w]=p*o[h+w]+v*o[l+w]+y*o[c+w]+x*o[u+w];return r}},Ic=class extends Vi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Pc=class extends Vi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Hn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=lc(e,this.TimeBufferType),this.values=lc(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:lc(t.times,Array),values:lc(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Pc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ic(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Cc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case As:e=this.InterpolantFactoryMethodDiscrete;break;case Rs:e=this.InterpolantFactoryMethodLinear;break;case hc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return As;case this.InterpolantFactoryMethodLinear:return Rs;case this.InterpolantFactoryMethodSmooth:return hc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&t_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===hc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[f+g]||_!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Hn.prototype.ValueTypeName="";Hn.prototype.TimeBufferType=Float32Array;Hn.prototype.ValueBufferType=Float32Array;Hn.prototype.DefaultInterpolation=Rs;Gi=class extends Hn{constructor(t,e,n){super(t,e,n)}};Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=As;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;ta=class extends Hn{constructor(t,e,n,s){super(t,e,n,s)}};ta.prototype.ValueTypeName="color";vi=class extends Hn{constructor(t,e,n,s){super(t,e,n,s)}};vi.prototype.ValueTypeName="number";Lc=class extends Vi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Dn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Mi=class extends Hn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Lc(this.times,this.values,this.getValueSize(),t)}};Mi.prototype.ValueTypeName="quaternion";Mi.prototype.InterpolantFactoryMethodSmooth=void 0;Wi=class extends Hn{constructor(t,e,n){super(t,e,n)}};Wi.prototype.ValueTypeName="string";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=As;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;Si=class extends Hn{constructor(t,e,n,s){super(t,e,n,s)}};Si.prototype.ValueTypeName="vector";ea=class{constructor(t="",e=-1,n=[],s=gp){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(i_(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(Hn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=e_(c);c=Nd(c,1,h),l=Nd(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new vi(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){let l=t[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,g,_){if(d.length!==0){let m=[],p=[];Fp(d,m,p,g),m.length!==0&&_.push(new u(f,m,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode,c=t.length||-1,l=t.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)d[f[g].morphTargets[_]]=-1;for(let _ in d){let m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){let y=f[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}s.push(new vi(".morphTargetInfluence["+_+"]",m,p))}c=d.length*o}else{let d=".bones["+e[u].name+"]";n(Si,d+".position",f,"pos",s),n(Mi,d+".quaternion",f,"rot",s),n(Si,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};gi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Dc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Op=new Dc,bi=class{constructor(t){this.manager=t!==void 0?t:Op,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";Fi={},Yh=class extends Error{constructor(t,e){super(t),this.response=e}},kr=class extends bi{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=gi.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Fi[t]!==void 0){Fi[t].push({onLoad:e,onProgress:n,onError:s});return}Fi[t]=[],Fi[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Fi[t],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0,_=0,m=new ReadableStream({start(p){v();function v(){u.read().then(({done:y,value:x})=>{if(y)p.close();else{_+=x.byteLength;let w=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let T=0,C=h.length;T<C;T++){let N=h[T];N.onProgress&&N.onProgress(w)}p.enqueue(x),v()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Yh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{gi.add(`file:${t}`,l);let h=Fi[t];delete Fi[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Fi[t];if(h===void 0)throw this.manager.itemError(t),l;delete Fi[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Mr=new WeakMap,Nc=class extends bi{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=gi.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=Mr.get(o);u===void 0&&(u=[],Mr.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=Ar("img");function c(){h(),e&&e(this);let u=Mr.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}Mr.delete(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),gi.remove(`image:${t}`);let f=Mr.get(this)||[];for(let d=0;d<f.length;d++){let g=f[d];g.onError&&g.onError(u)}Mr.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),gi.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}},na=class extends bi{constructor(t){super(t)}load(t,e,n,s){let r=new un,o=new Nc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Bs=class extends ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ce(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},ks=class extends Bs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ce(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Uh=new he,Ud=new L,Fd=new L,ia=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.mapType=fi,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nr,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new Ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ud.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ud),Fd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fd),e.updateMatrixWorld(),Uh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uh,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Uh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},$h=class extends ia{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Cs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},sa=class extends Bs{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ze.DEFAULT_UP),this.updateMatrix(),this.target=new ze,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new $h}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Od=new he,bo=new L,Fh=new L,Zh=class extends ia{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pt(4,2),this._viewportCount=6,this._viewports=[new Ue(2,1,1,1),new Ue(0,1,1,1),new Ue(3,1,1,1),new Ue(1,1,1,1),new Ue(3,0,1,1),new Ue(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),bo.setFromMatrixPosition(t.matrixWorld),n.position.copy(bo),Fh.copy(n.position),Fh.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Fh),n.updateMatrixWorld(),s.makeTranslation(-bo.x,-bo.y,-bo.z),Od.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Od,n.coordinateSystem,n.reversedDepth)}},zs=class extends Bs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Zh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Xi=class extends Do{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Kh=class extends ia{constructor(){super(new Xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ds=class extends Bs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ze.DEFAULT_UP),this.updateMatrix(),this.target=new ze,this.shadow=new Kh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},qi=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Oh=new WeakMap,ra=class extends bi{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=gi.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{if(Oh.has(o)===!0)s&&s(Oh.get(o)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(l),r.manager.itemEnd(t),l});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return gi.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),Oh.set(c,l),gi.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});gi.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Uc=class extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},xu="\\[\\]\\.:\\/",s_=new RegExp("["+xu+"]","g"),yu="[^"+xu+"]",r_="[^"+xu.replace("\\.","")+"]",o_=/((?:WC+[\/:])*)/.source.replace("WC",yu),a_=/(WCOD+)?/.source.replace("WCOD",r_),c_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yu),l_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yu),h_=new RegExp("^"+o_+a_+c_+l_+"$"),u_=["material","materials","bones","map"],jh=class{constructor(t,e,n){let s=n||Xe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Xe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(s_,"")}static parseTrackName(t){let e=h_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);u_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Xe.Composite=jh;Xe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Xe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Xe.prototype.GetterByBindingType=[Xe.prototype._getValue_direct,Xe.prototype._getValue_array,Xe.prototype._getValue_arrayElement,Xe.prototype._getValue_toArray];Xe.prototype.SetterByBindingTypeAndVersioning=[[Xe.prototype._setValue_direct,Xe.prototype._setValue_direct_setNeedsUpdate,Xe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_array,Xe.prototype._setValue_array_setNeedsUpdate,Xe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_arrayElement,Xe.prototype._setValue_arrayElement_setNeedsUpdate,Xe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Xe.prototype._setValue_fromArray,Xe.prototype._setValue_fromArray_setNeedsUpdate,Xe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];WS=new Float32Array(1),Bd=new he,oa=class{constructor(t,e,n=0,s=1/0){this.ray=new xi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ir,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Bd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bd),this}intersectObject(t,e=!0,n=[]){return Jh(t,this,n,e),n.sort(kd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Jh(t[s],this,n,e);return n.sort(kd),n}};zr=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=_e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(_e(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},aa=class extends _i{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180")});function am(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function p_(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}function Zy(i,t,e,n,s,r,o){let a=new ce(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1,w=g(y);w===null?p(a,c):w&&w.isColor&&(p(w,1),x=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,x){let w=g(x);w&&(w.isCubeTexture||w.mapping===la)?(h===void 0&&(h=new fe(new ls(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:Ws(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Xs.copy(x.backgroundRotation),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($y.makeRotationFromEuler(Xs)),h.material.toneMapped=Ae.getTransfer(w.colorSpace)!==ke,(u!==w||f!==w.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new fe(new Ns(2,2),new qn({name:"BackgroundMaterial",uniforms:Ws(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Ae.getTransfer(w.colorSpace)!==ke,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Il,gu(i)),n.buffers.color.setClear(Il.r,Il.g,Il.b,x,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:m,dispose:v}}function Ky(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(M,D,X,j,O){let tt=!1,B=u(j,X,D);r!==B&&(r=B,l(r.object)),tt=d(M,j,X,O),tt&&g(M,j,X,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(tt||o)&&(o=!1,x(M,D,X,j),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,D,X){let j=X.wireframe===!0,O=n[M.id];O===void 0&&(O={},n[M.id]=O);let tt=O[D.id];tt===void 0&&(tt={},O[D.id]=tt);let B=tt[j];return B===void 0&&(B=f(c()),tt[j]=B),B}function f(M){let D=[],X=[],j=[];for(let O=0;O<e;O++)D[O]=0,X[O]=0,j[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:X,attributeDivisors:j,object:M,attributes:{},index:null}}function d(M,D,X,j){let O=r.attributes,tt=D.attributes,B=0,pt=X.getAttributes();for(let q in pt)if(pt[q].location>=0){let Ut=O[q],qt=tt[q];if(qt===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(qt=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(qt=M.instanceColor)),Ut===void 0||Ut.attribute!==qt||qt&&Ut.data!==qt.data)return!0;B++}return r.attributesNum!==B||r.index!==j}function g(M,D,X,j){let O={},tt=D.attributes,B=0,pt=X.getAttributes();for(let q in pt)if(pt[q].location>=0){let Ut=tt[q];Ut===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(Ut=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(Ut=M.instanceColor));let qt={};qt.attribute=Ut,Ut&&Ut.data&&(qt.data=Ut.data),O[q]=qt,B++}r.attributes=O,r.attributesNum=B,r.index=j}function _(){let M=r.newAttributes;for(let D=0,X=M.length;D<X;D++)M[D]=0}function m(M){p(M,0)}function p(M,D){let X=r.newAttributes,j=r.enabledAttributes,O=r.attributeDivisors;X[M]=1,j[M]===0&&(i.enableVertexAttribArray(M),j[M]=1),O[M]!==D&&(i.vertexAttribDivisor(M,D),O[M]=D)}function v(){let M=r.newAttributes,D=r.enabledAttributes;for(let X=0,j=D.length;X<j;X++)D[X]!==M[X]&&(i.disableVertexAttribArray(X),D[X]=0)}function y(M,D,X,j,O,tt,B){B===!0?i.vertexAttribIPointer(M,D,X,O,tt):i.vertexAttribPointer(M,D,X,j,O,tt)}function x(M,D,X,j){_();let O=j.attributes,tt=X.getAttributes(),B=D.defaultAttributeValues;for(let pt in tt){let q=tt[pt];if(q.location>=0){let Rt=O[pt];if(Rt===void 0&&(pt==="instanceMatrix"&&M.instanceMatrix&&(Rt=M.instanceMatrix),pt==="instanceColor"&&M.instanceColor&&(Rt=M.instanceColor)),Rt!==void 0){let Ut=Rt.normalized,qt=Rt.itemSize,G=t.get(Rt);if(G===void 0)continue;let $=G.buffer,nt=G.type,st=G.bytesPerElement,U=nt===i.INT||nt===i.UNSIGNED_INT||Rt.gpuType===$c;if(Rt.isInterleavedBufferAttribute){let I=Rt.data,V=I.stride,at=Rt.offset;if(I.isInstancedInterleavedBuffer){for(let dt=0;dt<q.locationSize;dt++)p(q.location+dt,I.meshPerAttribute);M.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let dt=0;dt<q.locationSize;dt++)m(q.location+dt);i.bindBuffer(i.ARRAY_BUFFER,$);for(let dt=0;dt<q.locationSize;dt++)y(q.location+dt,qt/q.locationSize,nt,Ut,V*st,(at+qt/q.locationSize*dt)*st,U)}else{if(Rt.isInstancedBufferAttribute){for(let I=0;I<q.locationSize;I++)p(q.location+I,Rt.meshPerAttribute);M.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=Rt.meshPerAttribute*Rt.count)}else for(let I=0;I<q.locationSize;I++)m(q.location+I);i.bindBuffer(i.ARRAY_BUFFER,$);for(let I=0;I<q.locationSize;I++)y(q.location+I,qt/q.locationSize,nt,Ut,qt*st,qt/q.locationSize*I*st,U)}}else if(B!==void 0){let Ut=B[pt];if(Ut!==void 0)switch(Ut.length){case 2:i.vertexAttrib2fv(q.location,Ut);break;case 3:i.vertexAttrib3fv(q.location,Ut);break;case 4:i.vertexAttrib4fv(q.location,Ut);break;default:i.vertexAttrib1fv(q.location,Ut)}}}}v()}function w(){N();for(let M in n){let D=n[M];for(let X in D){let j=D[X];for(let O in j)h(j[O].object),delete j[O];delete D[X]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let D=n[M.id];for(let X in D){let j=D[X];for(let O in j)h(j[O].object),delete j[O];delete D[X]}delete n[M.id]}function C(M){for(let D in n){let X=n[D];if(X[M.id]===void 0)continue;let j=X[M.id];for(let O in j)h(j[O].object),delete j[O];delete X[M.id]}}function N(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:b,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function jy(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Jy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==$n&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let N=C===Gr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==fi&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ti&&!N)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:w,maxSamples:T}}function Qy(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Bn,a=new ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let v=r?0:n,y=v*4,x=p.clippingState||null;c.value=x,x=h(g,f,y,d);for(let w=0;w!==y;++w)x[w]=e[w];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=d;y!==_;++y,x+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function tv(i){let t=new WeakMap;function e(o,a){return a===Xc?o.mapping=Hs:a===qc&&(o.mapping=Vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Xc||a===qc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new xc(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}function nv(i){let t=[],e=[],n=[],s=i,r=i-$r+1+Bp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-$r?c=Bp[o-i+$r-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*d),y=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let T=0;T<d;T++){let C=T%3*2/3-1,N=T>2?0:-1,b=[C,N,0,C+2/3,N,0,C+2/3,N+1,0,C,N,0,C+2/3,N+1,0,C,N+1,0];v.set(b,_*g*T),y.set(f,m*g*T);let M=[T,T,T,T,T,T];x.set(M,p*g*T)}let w=new He;w.setAttribute("position",new Ye(v,_)),w.setAttribute("uv",new Ye(y,m)),w.setAttribute("faceIndex",new Ye(x,p)),t.push(w),s>$r&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Hp(i,t,e){let n=new Jn(i,t,e);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Pl(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function iv(i,t,e){let n=new Float32Array($s),s=new L(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:$s,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fu(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Vp(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fu(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Gp(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Fu(){return`

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
	`}function sv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Xc||c===qc,h=c===Hs||c===Vs;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Kr(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Kr(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function rv(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ov(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,g=u.attributes.position,_=0;if(d!==null){let v=d.array;_=d.version;for(let y=0,x=v.length;y<x;y+=3){let w=v[y+0],T=v[y+1],C=v[y+2];f.push(w,T,T,C,C,w)}}else if(g!==void 0){let v=g.array;_=g.version;for(let y=0,x=v.length/3-1;y<x;y+=3){let w=y+0,T=y+1,C=y+2;f.push(w,T,T,C,C,w)}}else return;let m=new(mu(f)?Lo:Po)(f,1);m.version=_;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function av(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*_[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function cv(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function lv(i,t,e){let n=new WeakMap,s=new Ue;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;d===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,w=1;x>t.maxTextureSize&&(w=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let T=new Float32Array(x*w*4*u),C=new Io(T,x,w,u);C.type=ti,C.needsUpdate=!0;let N=y*4;for(let M=0;M<u;M++){let D=m[M],X=p[M],j=v[M],O=x*w*4*M;for(let tt=0;tt<D.count;tt++){let B=tt*N;d===!0&&(s.fromBufferAttribute(D,tt),T[O+B+0]=s.x,T[O+B+1]=s.y,T[O+B+2]=s.z,T[O+B+3]=0),g===!0&&(s.fromBufferAttribute(X,tt),T[O+B+4]=s.x,T[O+B+5]=s.y,T[O+B+6]=s.z,T[O+B+7]=0),_===!0&&(s.fromBufferAttribute(j,tt),T[O+B+8]=s.x,T[O+B+9]=s.y,T[O+B+10]=s.z,T[O+B+11]=j.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new Pt(x,w)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function hv(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}function Jr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Xp[s];if(r===void 0&&(r=new Float32Array(s),Xp[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function fn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function dn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Dl(i,t){let e=qp[t];e===void 0&&(e=new Int32Array(t),qp[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function uv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function fv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fn(e,t))return;i.uniform2fv(this.addr,t),dn(e,t)}}function dv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fn(e,t))return;i.uniform3fv(this.addr,t),dn(e,t)}}function pv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fn(e,t))return;i.uniform4fv(this.addr,t),dn(e,t)}}function mv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(fn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),dn(e,t)}else{if(fn(e,n))return;Zp.set(n),i.uniformMatrix2fv(this.addr,!1,Zp),dn(e,n)}}function gv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(fn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),dn(e,t)}else{if(fn(e,n))return;$p.set(n),i.uniformMatrix3fv(this.addr,!1,$p),dn(e,n)}}function _v(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(fn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),dn(e,t)}else{if(fn(e,n))return;Yp.set(n),i.uniformMatrix4fv(this.addr,!1,Yp),dn(e,n)}}function xv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function yv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fn(e,t))return;i.uniform2iv(this.addr,t),dn(e,t)}}function vv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fn(e,t))return;i.uniform3iv(this.addr,t),dn(e,t)}}function Mv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fn(e,t))return;i.uniform4iv(this.addr,t),dn(e,t)}}function Sv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function bv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fn(e,t))return;i.uniform2uiv(this.addr,t),dn(e,t)}}function Ev(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fn(e,t))return;i.uniform3uiv(this.addr,t),dn(e,t)}}function wv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fn(e,t))return;i.uniform4uiv(this.addr,t),dn(e,t)}}function Tv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wp.compareFunction=fu,r=Wp):r=cm,e.setTexture2D(t||r,s)}function Av(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||hm,s)}function Rv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||um,s)}function Cv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||lm,s)}function Iv(i){switch(i){case 5126:return uv;case 35664:return fv;case 35665:return dv;case 35666:return pv;case 35674:return mv;case 35675:return gv;case 35676:return _v;case 5124:case 35670:return xv;case 35667:case 35671:return yv;case 35668:case 35672:return vv;case 35669:case 35673:return Mv;case 5125:return Sv;case 36294:return bv;case 36295:return Ev;case 36296:return wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Tv;case 35679:case 36299:case 36307:return Av;case 35680:case 36300:case 36308:case 36293:return Rv;case 36289:case 36303:case 36311:case 36292:return Cv}}function Pv(i,t){i.uniform1fv(this.addr,t)}function Lv(i,t){let e=Jr(t,this.size,2);i.uniform2fv(this.addr,e)}function Dv(i,t){let e=Jr(t,this.size,3);i.uniform3fv(this.addr,e)}function Nv(i,t){let e=Jr(t,this.size,4);i.uniform4fv(this.addr,e)}function Uv(i,t){let e=Jr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Fv(i,t){let e=Jr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ov(i,t){let e=Jr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Bv(i,t){i.uniform1iv(this.addr,t)}function kv(i,t){i.uniform2iv(this.addr,t)}function zv(i,t){i.uniform3iv(this.addr,t)}function Hv(i,t){i.uniform4iv(this.addr,t)}function Vv(i,t){i.uniform1uiv(this.addr,t)}function Gv(i,t){i.uniform2uiv(this.addr,t)}function Wv(i,t){i.uniform3uiv(this.addr,t)}function Xv(i,t){i.uniform4uiv(this.addr,t)}function qv(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);fn(n,r)||(i.uniform1iv(this.addr,r),dn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||cm,r[o])}function Yv(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);fn(n,r)||(i.uniform1iv(this.addr,r),dn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||hm,r[o])}function $v(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);fn(n,r)||(i.uniform1iv(this.addr,r),dn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||um,r[o])}function Zv(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);fn(n,r)||(i.uniform1iv(this.addr,r),dn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||lm,r[o])}function Kv(i){switch(i){case 5126:return Pv;case 35664:return Lv;case 35665:return Dv;case 35666:return Nv;case 35674:return Uv;case 35675:return Fv;case 35676:return Ov;case 5124:case 35670:return Bv;case 35667:case 35671:return kv;case 35668:case 35672:return zv;case 35669:case 35673:return Hv;case 5125:return Vv;case 36294:return Gv;case 36295:return Wv;case 36296:return Xv;case 35678:case 36198:case 36298:case 36306:case 35682:return qv;case 35679:case 36299:case 36307:return Yv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Zv}}function Kp(i,t){i.seq.push(t),i.map[t.id]=t}function jv(i,t,e){let n=i.name,s=n.length;for(Au.lastIndex=0;;){let r=Au.exec(n),o=Au.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Kp(e,l===void 0?new Ru(a,i,t):new Cu(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Iu(a),Kp(e,u)),e=u}}}function jp(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}function tM(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function eM(i){Ae._getMatrix(Jp,Ae.workingColorSpace,i);let t=`mat3( ${Jp.elements.map(e=>e.toFixed(4))} )`;switch(Ae.getTransfer(i)){case Ro:return[t,"LinearTransferOETF"];case ke:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Qp(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+tM(i.getShaderSource(t),a)}else return r}function nM(i,t){let e=eM(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function iM(i,t){let e;switch(t){case lp:e="Linear";break;case hp:e="Reinhard";break;case up:e="Cineon";break;case fp:e="ACESFilmic";break;case pp:e="AgX";break;case Wc:e="Neutral";break;case dp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function sM(){Ae.getLuminanceCoefficients(Ll);let i=Ll.x.toFixed(4),t=Ll.y.toFixed(4),e=Ll.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function oM(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function aM(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ma(i){return i!==""}function tm(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function em(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Pu(i){return i.replace(cM,hM)}function hM(i,t){let e=xe[t];if(e===void 0){let n=lM.get(t);if(n!==void 0)e=xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Pu(e)}function nm(i){return i.replace(uM,fM)}function fM(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function im(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function dM(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ca?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Vd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ei&&(t="SHADOWMAP_TYPE_VSM"),t}function pM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hs:case Vs:t="ENVMAP_TYPE_CUBE";break;case la:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vs:t="ENVMAP_MODE_REFRACTION";break}return t}function gM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Gc:t="ENVMAP_BLENDING_MULTIPLY";break;case ap:t="ENVMAP_BLENDING_MIX";break;case cp:t="ENVMAP_BLENDING_ADD";break}return t}function _M(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function xM(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=dM(e),l=pM(e),h=mM(e),u=gM(e),f=_M(e),d=rM(e),g=oM(r),_=s.createProgram(),m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ma).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ma).join(`
`),p.length>0&&(p+=`
`)):(m=[im(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),p=[im(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$i?"#define TONE_MAPPING":"",e.toneMapping!==$i?xe.tonemapping_pars_fragment:"",e.toneMapping!==$i?iM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",xe.colorspace_pars_fragment,nM("linearToOutputTexel",e.outputColorSpace),sM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ma).join(`
`)),o=Pu(o),o=tm(o,e),o=em(o,e),a=Pu(a),a=tm(a,e),a=em(a,e),o=nm(o),a=nm(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===du?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===du?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=v+m+o,x=v+p+a,w=jp(s,s.VERTEX_SHADER,y),T=jp(s,s.FRAGMENT_SHADER,x);s.attachShader(_,w),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(D){if(i.debug.checkShaderErrors){let X=s.getProgramInfoLog(_)||"",j=s.getShaderInfoLog(w)||"",O=s.getShaderInfoLog(T)||"",tt=X.trim(),B=j.trim(),pt=O.trim(),q=!0,Rt=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,T);else{let Ut=Qp(s,w,"vertex"),qt=Qp(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+tt+`
`+Ut+`
`+qt)}else tt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",tt):(B===""||pt==="")&&(Rt=!1);Rt&&(D.diagnostics={runnable:q,programLog:tt,vertexShader:{log:B,prefix:m},fragmentShader:{log:pt,prefix:p}})}s.deleteShader(w),s.deleteShader(T),N=new Zr(s,_),b=aM(s,_)}let N;this.getUniforms=function(){return N===void 0&&C(this),N};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Jv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Qv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=T,this}function vM(i,t,e,n,s,r,o){let a=new Ir,c=new Lu,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,D,X,j){let O=X.fog,tt=j.geometry,B=b.isMeshStandardMaterial?X.environment:null,pt=(b.isMeshStandardMaterial?e:t).get(b.envMap||B),q=pt&&pt.mapping===la?pt.image.height:null,Rt=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let Ut=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,qt=Ut!==void 0?Ut.length:0,G=0;tt.morphAttributes.position!==void 0&&(G=1),tt.morphAttributes.normal!==void 0&&(G=2),tt.morphAttributes.color!==void 0&&(G=3);let $,nt,st,U;if(Rt){let ot=wi[Rt];$=ot.vertexShader,nt=ot.fragmentShader}else $=b.vertexShader,nt=b.fragmentShader,c.update(b),st=c.getVertexShaderID(b),U=c.getFragmentShaderID(b);let I=i.getRenderTarget(),V=i.state.buffers.depth.getReversed(),at=j.isInstancedMesh===!0,dt=j.isBatchedMesh===!0,Ft=!!b.map,Qt=!!b.matcap,P=!!pt,$t=!!b.aoMap,Lt=!!b.lightMap,Ht=!!b.bumpMap,kt=!!b.normalMap,ve=!!b.displacementMap,zt=!!b.emissiveMap,Zt=!!b.metalnessMap,be=!!b.roughnessMap,Me=b.anisotropy>0,R=b.clearcoat>0,S=b.dispersion>0,Z=b.iridescence>0,it=b.sheen>0,ut=b.transmission>0,rt=Me&&!!b.anisotropyMap,Jt=R&&!!b.clearcoatMap,J=R&&!!b.clearcoatNormalMap,xt=R&&!!b.clearcoatRoughnessMap,St=Z&&!!b.iridescenceMap,ht=Z&&!!b.iridescenceThicknessMap,It=it&&!!b.sheenColorMap,Gt=it&&!!b.sheenRoughnessMap,Kt=!!b.specularMap,Bt=!!b.specularColorMap,Yt=!!b.specularIntensityMap,F=ut&&!!b.transmissionMap,mt=ut&&!!b.thicknessMap,bt=!!b.gradientMap,Dt=!!b.alphaMap,yt=b.alphaTest>0,A=!!b.alphaHash,K=!!b.extensions,et=$i;b.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(et=i.toneMapping);let ct={shaderID:Rt,shaderType:b.type,shaderName:b.name,vertexShader:$,fragmentShader:nt,defines:b.defines,customVertexShaderID:st,customFragmentShaderID:U,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:dt,batchingColor:dt&&j._colorsTexture!==null,instancing:at,instancingColor:at&&j.instanceColor!==null,instancingMorph:at&&j.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:I===null?i.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:yn,alphaToCoverage:!!b.alphaToCoverage,map:Ft,matcap:Qt,envMap:P,envMapMode:P&&pt.mapping,envMapCubeUVHeight:q,aoMap:$t,lightMap:Lt,bumpMap:Ht,normalMap:kt,displacementMap:f&&ve,emissiveMap:zt,normalMapObjectSpace:kt&&b.normalMapType===yp,normalMapTangentSpace:kt&&b.normalMapType===Cl,metalnessMap:Zt,roughnessMap:be,anisotropy:Me,anisotropyMap:rt,clearcoat:R,clearcoatMap:Jt,clearcoatNormalMap:J,clearcoatRoughnessMap:xt,dispersion:S,iridescence:Z,iridescenceMap:St,iridescenceThicknessMap:ht,sheen:it,sheenColorMap:It,sheenRoughnessMap:Gt,specularMap:Kt,specularColorMap:Bt,specularIntensityMap:Yt,transmission:ut,transmissionMap:F,thicknessMap:mt,gradientMap:bt,opaque:b.transparent===!1&&b.blending===ws&&b.alphaToCoverage===!1,alphaMap:Dt,alphaTest:yt,alphaHash:A,combine:b.combine,mapUv:Ft&&_(b.map.channel),aoMapUv:$t&&_(b.aoMap.channel),lightMapUv:Lt&&_(b.lightMap.channel),bumpMapUv:Ht&&_(b.bumpMap.channel),normalMapUv:kt&&_(b.normalMap.channel),displacementMapUv:ve&&_(b.displacementMap.channel),emissiveMapUv:zt&&_(b.emissiveMap.channel),metalnessMapUv:Zt&&_(b.metalnessMap.channel),roughnessMapUv:be&&_(b.roughnessMap.channel),anisotropyMapUv:rt&&_(b.anisotropyMap.channel),clearcoatMapUv:Jt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:J&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:It&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&_(b.sheenRoughnessMap.channel),specularMapUv:Kt&&_(b.specularMap.channel),specularColorMapUv:Bt&&_(b.specularColorMap.channel),specularIntensityMapUv:Yt&&_(b.specularIntensityMap.channel),transmissionMapUv:F&&_(b.transmissionMap.channel),thicknessMapUv:mt&&_(b.thicknessMap.channel),alphaMapUv:Dt&&_(b.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(kt||Me),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!tt.attributes.uv&&(Ft||Dt),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:V,skinning:j.isSkinnedMesh===!0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:qt,morphTextureStride:G,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:et,decodeVideoTexture:Ft&&b.map.isVideoTexture===!0&&Ae.getTransfer(b.map.colorSpace)===ke,decodeVideoTextureEmissive:zt&&b.emissiveMap.isVideoTexture===!0&&Ae.getTransfer(b.emissiveMap.colorSpace)===ke,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Le,flipSided:b.side===vn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:K&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(K&&b.extensions.multiDraw===!0||dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ct.vertexUv1s=l.has(1),ct.vertexUv2s=l.has(2),ct.vertexUv3s=l.has(3),l.clear(),ct}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)M.push(D),M.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(v(M,b),y(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function v(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){let M=g[b.type],D;if(M){let X=wi[M];D=Ip.clone(X.uniforms)}else D=b.uniforms;return D}function w(b,M){let D;for(let X=0,j=h.length;X<j;X++){let O=h[X];if(O.cacheKey===M){D=O,++D.usedTimes;break}}return D===void 0&&(D=new xM(i,M,b,r),h.push(D)),D}function T(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){c.remove(b)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:w,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:N}}function MM(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function SM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function sm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function rm(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||SM),n.length>1&&n.sort(f||sm),s.length>1&&s.sort(f||sm)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function bM(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new rm,i.set(n,[o])):s>=r.length?(o=new rm,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function EM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ce};break;case"SpotLight":e={position:new L,direction:new L,color:new ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ce,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ce,groundColor:new ce};break;case"RectAreaLight":e={color:new ce,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function wM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}function AM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function RM(i){let t=new EM,e=wM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new he,o=new he;function a(l){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,v=0,y=0,x=0,w=0,T=0,C=0;l.sort(AM);for(let b=0,M=l.length;b<M;b++){let D=l[b],X=D.color,j=D.intensity,O=D.distance,tt=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=X.r*j,u+=X.g*j,f+=X.b*j;else if(D.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(D.sh.coefficients[B],j);C++}else if(D.isDirectionalLight){let B=t.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let pt=D.shadow,q=e.get(D);q.shadowIntensity=pt.intensity,q.shadowBias=pt.bias,q.shadowNormalBias=pt.normalBias,q.shadowRadius=pt.radius,q.shadowMapSize=pt.mapSize,n.directionalShadow[d]=q,n.directionalShadowMap[d]=tt,n.directionalShadowMatrix[d]=D.shadow.matrix,v++}n.directional[d]=B,d++}else if(D.isSpotLight){let B=t.get(D);B.position.setFromMatrixPosition(D.matrixWorld),B.color.copy(X).multiplyScalar(j),B.distance=O,B.coneCos=Math.cos(D.angle),B.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),B.decay=D.decay,n.spot[_]=B;let pt=D.shadow;if(D.map&&(n.spotLightMap[w]=D.map,w++,pt.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[_]=pt.matrix,D.castShadow){let q=e.get(D);q.shadowIntensity=pt.intensity,q.shadowBias=pt.bias,q.shadowNormalBias=pt.normalBias,q.shadowRadius=pt.radius,q.shadowMapSize=pt.mapSize,n.spotShadow[_]=q,n.spotShadowMap[_]=tt,x++}_++}else if(D.isRectAreaLight){let B=t.get(D);B.color.copy(X).multiplyScalar(j),B.halfWidth.set(D.width*.5,0,0),B.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=B,m++}else if(D.isPointLight){let B=t.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),B.distance=D.distance,B.decay=D.decay,D.castShadow){let pt=D.shadow,q=e.get(D);q.shadowIntensity=pt.intensity,q.shadowBias=pt.bias,q.shadowNormalBias=pt.normalBias,q.shadowRadius=pt.radius,q.shadowMapSize=pt.mapSize,q.shadowCameraNear=pt.camera.near,q.shadowCameraFar=pt.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=tt,n.pointShadowMatrix[g]=D.shadow.matrix,y++}n.point[g]=B,g++}else if(D.isHemisphereLight){let B=t.get(D);B.skyColor.copy(D.color).multiplyScalar(j),B.groundColor.copy(D.groundColor).multiplyScalar(j),n.hemi[p]=B,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Vt.LTC_FLOAT_1,n.rectAreaLTC2=Vt.LTC_FLOAT_2):(n.rectAreaLTC1=Vt.LTC_HALF_1,n.rectAreaLTC2=Vt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let N=n.hash;(N.directionalLength!==d||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==v||N.numPointShadows!==y||N.numSpotShadows!==x||N.numSpotMaps!==w||N.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,N.directionalLength=d,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=v,N.numPointShadows=y,N.numSpotShadows=x,N.numSpotMaps=w,N.numLightProbes=C,n.version=TM++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){let y=l[p];if(y.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(y.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(y.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function om(i){let t=new RM(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function CM(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new om(i),t.set(s,[a])):r>=o.length?(a=new om(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function LM(i,t,e){let n=new Nr,s=new Pt,r=new Pt,o=new Ue,a=new Ac({depthPacking:xp}),c=new Rc,l={},h=e.maxTextureSize,u={[li]:vn,[vn]:li,[Le]:Le},f=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:IM,fragmentShader:PM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new He;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new fe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ca;let p=this.type;this.render=function(T,C,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),X=i.state;X.setBlending(Yi),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let j=p!==Ei&&this.type===Ei,O=p===Ei&&this.type!==Ei;for(let tt=0,B=T.length;tt<B;tt++){let pt=T[tt],q=pt.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",pt,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let Rt=q.getFrameExtents();if(s.multiply(Rt),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Rt.x),s.x=r.x*Rt.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Rt.y),s.y=r.y*Rt.y,q.mapSize.y=r.y)),q.map===null||j===!0||O===!0){let qt=this.type!==Ei?{minFilter:xn,magFilter:xn}:{};q.map!==null&&q.map.dispose(),q.map=new Jn(s.x,s.y,qt),q.map.texture.name=pt.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let Ut=q.getViewportCount();for(let qt=0;qt<Ut;qt++){let G=q.getViewport(qt);o.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),X.viewport(o),q.updateMatrices(pt,qt),n=q.getFrustum(),x(C,N,q.camera,pt,this.type)}q.isPointLightShadow!==!0&&this.type===Ei&&v(q,N),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,D)};function v(T,C){let N=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Jn(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,N,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,N,d,_,null)}function y(T,C,N,b){let M=null,D=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)M=D;else if(M=N.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let X=M.uuid,j=C.uuid,O=l[X];O===void 0&&(O={},l[X]=O);let tt=O[j];tt===void 0&&(tt=M.clone(),O[j]=tt,C.addEventListener("dispose",w)),M=tt}if(M.visible=C.visible,M.wireframe=C.wireframe,b===Ei?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let X=i.properties.get(M);X.light=N}return M}function x(T,C,N,b,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Ei)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);let j=t.update(T),O=T.material;if(Array.isArray(O)){let tt=j.groups;for(let B=0,pt=tt.length;B<pt;B++){let q=tt[B],Rt=O[q.materialIndex];if(Rt&&Rt.visible){let Ut=y(T,Rt,b,M);T.onBeforeShadow(i,T,C,N,j,Ut,q),i.renderBufferDirect(N,null,j,Ut,T,q),T.onAfterShadow(i,T,C,N,j,Ut,q)}}}else if(O.visible){let tt=y(T,O,b,M);T.onBeforeShadow(i,T,C,N,j,tt,null),i.renderBufferDirect(N,null,j,tt,T,null),T.onAfterShadow(i,T,C,N,j,tt,null)}}let X=T.children;for(let j=0,O=X.length;j<O;j++)x(X[j],C,N,b,M)}function w(T){T.target.removeEventListener("dispose",w);for(let N in l){let b=l[N],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}function NM(i,t){function e(){let F=!1,mt=new Ue,bt=null,Dt=new Ue(0,0,0,0);return{setMask:function(yt){bt!==yt&&!F&&(i.colorMask(yt,yt,yt,yt),bt=yt)},setLocked:function(yt){F=yt},setClear:function(yt,A,K,et,ct){ct===!0&&(yt*=et,A*=et,K*=et),mt.set(yt,A,K,et),Dt.equals(mt)===!1&&(i.clearColor(yt,A,K,et),Dt.copy(mt))},reset:function(){F=!1,bt=null,Dt.set(-1,0,0,0)}}}function n(){let F=!1,mt=!1,bt=null,Dt=null,yt=null;return{setReversed:function(A){if(mt!==A){let K=t.get("EXT_clip_control");A?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT),mt=A;let et=yt;yt=null,this.setClear(et)}},getReversed:function(){return mt},setTest:function(A){A?I(i.DEPTH_TEST):V(i.DEPTH_TEST)},setMask:function(A){bt!==A&&!F&&(i.depthMask(A),bt=A)},setFunc:function(A){if(mt&&(A=DM[A]),Dt!==A){switch(A){case Fc:i.depthFunc(i.NEVER);break;case Oc:i.depthFunc(i.ALWAYS);break;case Bc:i.depthFunc(i.LESS);break;case Ts:i.depthFunc(i.LEQUAL);break;case kc:i.depthFunc(i.EQUAL);break;case zc:i.depthFunc(i.GEQUAL);break;case Hc:i.depthFunc(i.GREATER);break;case Vc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Dt=A}},setLocked:function(A){F=A},setClear:function(A){yt!==A&&(mt&&(A=1-A),i.clearDepth(A),yt=A)},reset:function(){F=!1,bt=null,Dt=null,yt=null,mt=!1}}}function s(){let F=!1,mt=null,bt=null,Dt=null,yt=null,A=null,K=null,et=null,ct=null;return{setTest:function(ot){F||(ot?I(i.STENCIL_TEST):V(i.STENCIL_TEST))},setMask:function(ot){mt!==ot&&!F&&(i.stencilMask(ot),mt=ot)},setFunc:function(ot,Et,Tt){(bt!==ot||Dt!==Et||yt!==Tt)&&(i.stencilFunc(ot,Et,Tt),bt=ot,Dt=Et,yt=Tt)},setOp:function(ot,Et,Tt){(A!==ot||K!==Et||et!==Tt)&&(i.stencilOp(ot,Et,Tt),A=ot,K=Et,et=Tt)},setLocked:function(ot){F=ot},setClear:function(ot){ct!==ot&&(i.clearStencil(ot),ct=ot)},reset:function(){F=!1,mt=null,bt=null,Dt=null,yt=null,A=null,K=null,et=null,ct=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,y=null,x=null,w=null,T=null,C=new ce(0,0,0),N=0,b=!1,M=null,D=null,X=null,j=null,O=null,tt=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,pt=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(pt=parseFloat(/^WebGL (\d)/.exec(q)[1]),B=pt>=1):q.indexOf("OpenGL ES")!==-1&&(pt=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),B=pt>=2);let Rt=null,Ut={},qt=i.getParameter(i.SCISSOR_BOX),G=i.getParameter(i.VIEWPORT),$=new Ue().fromArray(qt),nt=new Ue().fromArray(G);function st(F,mt,bt,Dt){let yt=new Uint8Array(4),A=i.createTexture();i.bindTexture(F,A),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let K=0;K<bt;K++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(mt,0,i.RGBA,1,1,Dt,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(mt+K,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return A}let U={};U[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),U[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),U[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),U[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),I(i.DEPTH_TEST),o.setFunc(Ts),Ht(!1),kt(Qh),I(i.CULL_FACE),$t(Yi);function I(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function V(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function at(F,mt){return u[F]!==mt?(i.bindFramebuffer(F,mt),u[F]=mt,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=mt),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=mt),!0):!1}function dt(F,mt){let bt=d,Dt=!1;if(F){bt=f.get(mt),bt===void 0&&(bt=[],f.set(mt,bt));let yt=F.textures;if(bt.length!==yt.length||bt[0]!==i.COLOR_ATTACHMENT0){for(let A=0,K=yt.length;A<K;A++)bt[A]=i.COLOR_ATTACHMENT0+A;bt.length=yt.length,Dt=!0}}else bt[0]!==i.BACK&&(bt[0]=i.BACK,Dt=!0);Dt&&i.drawBuffers(bt)}function Ft(F){return g!==F?(i.useProgram(F),g=F,!0):!1}let Qt={[cs]:i.FUNC_ADD,[Wd]:i.FUNC_SUBTRACT,[Xd]:i.FUNC_REVERSE_SUBTRACT};Qt[qd]=i.MIN,Qt[Yd]=i.MAX;let P={[$d]:i.ZERO,[Zd]:i.ONE,[Kd]:i.SRC_COLOR,[uc]:i.SRC_ALPHA,[np]:i.SRC_ALPHA_SATURATE,[tp]:i.DST_COLOR,[Jd]:i.DST_ALPHA,[jd]:i.ONE_MINUS_SRC_COLOR,[fc]:i.ONE_MINUS_SRC_ALPHA,[ep]:i.ONE_MINUS_DST_COLOR,[Qd]:i.ONE_MINUS_DST_ALPHA,[ip]:i.CONSTANT_COLOR,[sp]:i.ONE_MINUS_CONSTANT_COLOR,[rp]:i.CONSTANT_ALPHA,[op]:i.ONE_MINUS_CONSTANT_ALPHA};function $t(F,mt,bt,Dt,yt,A,K,et,ct,ot){if(F===Yi){_===!0&&(V(i.BLEND),_=!1);return}if(_===!1&&(I(i.BLEND),_=!0),F!==Gd){if(F!==m||ot!==b){if((p!==cs||x!==cs)&&(i.blendEquation(i.FUNC_ADD),p=cs,x=cs),ot)switch(F){case ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tu:i.blendFunc(i.ONE,i.ONE);break;case eu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case eu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}v=null,y=null,w=null,T=null,C.set(0,0,0),N=0,m=F,b=ot}return}yt=yt||mt,A=A||bt,K=K||Dt,(mt!==p||yt!==x)&&(i.blendEquationSeparate(Qt[mt],Qt[yt]),p=mt,x=yt),(bt!==v||Dt!==y||A!==w||K!==T)&&(i.blendFuncSeparate(P[bt],P[Dt],P[A],P[K]),v=bt,y=Dt,w=A,T=K),(et.equals(C)===!1||ct!==N)&&(i.blendColor(et.r,et.g,et.b,ct),C.copy(et),N=ct),m=F,b=!1}function Lt(F,mt){F.side===Le?V(i.CULL_FACE):I(i.CULL_FACE);let bt=F.side===vn;mt&&(bt=!bt),Ht(bt),F.blending===ws&&F.transparent===!1?$t(Yi):$t(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let Dt=F.stencilWrite;a.setTest(Dt),Dt&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),zt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?I(i.SAMPLE_ALPHA_TO_COVERAGE):V(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(F){M!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),M=F)}function kt(F){F!==zd?(I(i.CULL_FACE),F!==D&&(F===Qh?i.cullFace(i.BACK):F===Hd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):V(i.CULL_FACE),D=F}function ve(F){F!==X&&(B&&i.lineWidth(F),X=F)}function zt(F,mt,bt){F?(I(i.POLYGON_OFFSET_FILL),(j!==mt||O!==bt)&&(i.polygonOffset(mt,bt),j=mt,O=bt)):V(i.POLYGON_OFFSET_FILL)}function Zt(F){F?I(i.SCISSOR_TEST):V(i.SCISSOR_TEST)}function be(F){F===void 0&&(F=i.TEXTURE0+tt-1),Rt!==F&&(i.activeTexture(F),Rt=F)}function Me(F,mt,bt){bt===void 0&&(Rt===null?bt=i.TEXTURE0+tt-1:bt=Rt);let Dt=Ut[bt];Dt===void 0&&(Dt={type:void 0,texture:void 0},Ut[bt]=Dt),(Dt.type!==F||Dt.texture!==mt)&&(Rt!==bt&&(i.activeTexture(bt),Rt=bt),i.bindTexture(F,mt||U[F]),Dt.type=F,Dt.texture=mt)}function R(){let F=Ut[Rt];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Z(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function it(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ut(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function rt(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Jt(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function J(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xt(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function St(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ht(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function It(F){$.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),$.copy(F))}function Gt(F){nt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),nt.copy(F))}function Kt(F,mt){let bt=l.get(mt);bt===void 0&&(bt=new WeakMap,l.set(mt,bt));let Dt=bt.get(F);Dt===void 0&&(Dt=i.getUniformBlockIndex(mt,F.name),bt.set(F,Dt))}function Bt(F,mt){let Dt=l.get(mt).get(F);c.get(mt)!==Dt&&(i.uniformBlockBinding(mt,Dt,F.__bindingPointIndex),c.set(mt,Dt))}function Yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Rt=null,Ut={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,y=null,x=null,w=null,T=null,C=new ce(0,0,0),N=0,b=!1,M=null,D=null,X=null,j=null,O=null,$.set(0,0,i.canvas.width,i.canvas.height),nt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:I,disable:V,bindFramebuffer:at,drawBuffers:dt,useProgram:Ft,setBlending:$t,setMaterial:Lt,setFlipSided:Ht,setCullFace:kt,setLineWidth:ve,setPolygonOffset:zt,setScissorTest:Zt,activeTexture:be,bindTexture:Me,unbindTexture:R,compressedTexImage2D:S,compressedTexImage3D:Z,texImage2D:St,texImage3D:ht,updateUBOMapping:Kt,uniformBlockBinding:Bt,texStorage2D:J,texStorage3D:xt,texSubImage2D:it,texSubImage3D:ut,compressedTexSubImage2D:rt,compressedTexSubImage3D:Jt,scissor:It,viewport:Gt,reset:Yt}}function UM(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Pt,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return d?new OffscreenCanvas(R,S):Ar("canvas")}function _(R,S,Z){let it=1,ut=Me(R);if((ut.width>Z||ut.height>Z)&&(it=Z/Math.max(ut.width,ut.height)),it<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let rt=Math.floor(it*ut.width),Jt=Math.floor(it*ut.height);u===void 0&&(u=g(rt,Jt));let J=S?g(rt,Jt):u;return J.width=rt,J.height=Jt,J.getContext("2d").drawImage(R,0,0,rt,Jt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ut.width+"x"+ut.height+") to ("+rt+"x"+Jt+")."),J}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ut.width+"x"+ut.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,S,Z,it,ut=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let rt=S;if(S===i.RED&&(Z===i.FLOAT&&(rt=i.R32F),Z===i.HALF_FLOAT&&(rt=i.R16F),Z===i.UNSIGNED_BYTE&&(rt=i.R8)),S===i.RED_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.R8UI),Z===i.UNSIGNED_SHORT&&(rt=i.R16UI),Z===i.UNSIGNED_INT&&(rt=i.R32UI),Z===i.BYTE&&(rt=i.R8I),Z===i.SHORT&&(rt=i.R16I),Z===i.INT&&(rt=i.R32I)),S===i.RG&&(Z===i.FLOAT&&(rt=i.RG32F),Z===i.HALF_FLOAT&&(rt=i.RG16F),Z===i.UNSIGNED_BYTE&&(rt=i.RG8)),S===i.RG_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.RG8UI),Z===i.UNSIGNED_SHORT&&(rt=i.RG16UI),Z===i.UNSIGNED_INT&&(rt=i.RG32UI),Z===i.BYTE&&(rt=i.RG8I),Z===i.SHORT&&(rt=i.RG16I),Z===i.INT&&(rt=i.RG32I)),S===i.RGB_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),Z===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),Z===i.UNSIGNED_INT&&(rt=i.RGB32UI),Z===i.BYTE&&(rt=i.RGB8I),Z===i.SHORT&&(rt=i.RGB16I),Z===i.INT&&(rt=i.RGB32I)),S===i.RGBA_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),Z===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),Z===i.UNSIGNED_INT&&(rt=i.RGBA32UI),Z===i.BYTE&&(rt=i.RGBA8I),Z===i.SHORT&&(rt=i.RGBA16I),Z===i.INT&&(rt=i.RGBA32I)),S===i.RGB&&(Z===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),Z===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),S===i.RGBA){let Jt=ut?Ro:Ae.getTransfer(it);Z===i.FLOAT&&(rt=i.RGBA32F),Z===i.HALF_FLOAT&&(rt=i.RGBA16F),Z===i.UNSIGNED_BYTE&&(rt=Jt===ke?i.SRGB8_ALPHA8:i.RGBA8),Z===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),Z===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function x(R,S){let Z;return R?S===null||S===ps||S===Wr?Z=i.DEPTH24_STENCIL8:S===ti?Z=i.DEPTH32F_STENCIL8:S===Vr&&(Z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ps||S===Wr?Z=i.DEPTH_COMPONENT24:S===ti?Z=i.DEPTH_COMPONENT32F:S===Vr&&(Z=i.DEPTH_COMPONENT16),Z}function w(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==xn&&R.minFilter!==Ln?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function T(R){let S=R.target;S.removeEventListener("dispose",T),N(S),S.isVideoTexture&&h.delete(S)}function C(R){let S=R.target;S.removeEventListener("dispose",C),M(S)}function N(R){let S=n.get(R);if(S.__webglInit===void 0)return;let Z=R.source,it=f.get(Z);if(it){let ut=it[S.__cacheKey];ut.usedTimes--,ut.usedTimes===0&&b(R),Object.keys(it).length===0&&f.delete(Z)}n.remove(R)}function b(R){let S=n.get(R);i.deleteTexture(S.__webglTexture);let Z=R.source,it=f.get(Z);delete it[S.__cacheKey],o.memory.textures--}function M(R){let S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(S.__webglFramebuffer[it]))for(let ut=0;ut<S.__webglFramebuffer[it].length;ut++)i.deleteFramebuffer(S.__webglFramebuffer[it][ut]);else i.deleteFramebuffer(S.__webglFramebuffer[it]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[it])}else{if(Array.isArray(S.__webglFramebuffer))for(let it=0;it<S.__webglFramebuffer.length;it++)i.deleteFramebuffer(S.__webglFramebuffer[it]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let it=0;it<S.__webglColorRenderbuffer.length;it++)S.__webglColorRenderbuffer[it]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[it]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let Z=R.textures;for(let it=0,ut=Z.length;it<ut;it++){let rt=n.get(Z[it]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),o.memory.textures--),n.remove(Z[it])}n.remove(R)}let D=0;function X(){D=0}function j(){let R=D;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),D+=1,R}function O(R){let S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function tt(R,S){let Z=n.get(R);if(R.isVideoTexture&&Zt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&Z.__version!==R.version){let it=R.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{U(Z,R,S);return}}else R.isExternalTexture&&(Z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Z.__webglTexture,i.TEXTURE0+S)}function B(R,S){let Z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Z.__version!==R.version){U(Z,R,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Z.__webglTexture,i.TEXTURE0+S)}function pt(R,S){let Z=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Z.__version!==R.version){U(Z,R,S);return}e.bindTexture(i.TEXTURE_3D,Z.__webglTexture,i.TEXTURE0+S)}function q(R,S){let Z=n.get(R);if(R.version>0&&Z.__version!==R.version){I(Z,R,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture,i.TEXTURE0+S)}let Rt={[jn]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[wr]:i.MIRRORED_REPEAT},Ut={[xn]:i.NEAREST,[Yc]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[Ln]:i.LINEAR,[Hr]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},qt={[vp]:i.NEVER,[Tp]:i.ALWAYS,[Mp]:i.LESS,[fu]:i.LEQUAL,[Sp]:i.EQUAL,[wp]:i.GEQUAL,[bp]:i.GREATER,[Ep]:i.NOTEQUAL};function G(R,S){if(S.type===ti&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Ln||S.magFilter===Hr||S.magFilter===Gs||S.magFilter===ui||S.minFilter===Ln||S.minFilter===Hr||S.minFilter===Gs||S.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Rt[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Rt[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Rt[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ut[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ut[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,qt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===xn||S.minFilter!==Gs&&S.minFilter!==ui||S.type===ti&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let Z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function $(R,S){let Z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",T));let it=S.source,ut=f.get(it);ut===void 0&&(ut={},f.set(it,ut));let rt=O(S);if(rt!==R.__cacheKey){ut[rt]===void 0&&(ut[rt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Z=!0),ut[rt].usedTimes++;let Jt=ut[R.__cacheKey];Jt!==void 0&&(ut[R.__cacheKey].usedTimes--,Jt.usedTimes===0&&b(S)),R.__cacheKey=rt,R.__webglTexture=ut[rt].texture}return Z}function nt(R,S,Z){return Math.floor(Math.floor(R/Z)/S)}function st(R,S,Z,it){let rt=R.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,Z,it,S.data);else{rt.sort((ht,It)=>ht.start-It.start);let Jt=0;for(let ht=1;ht<rt.length;ht++){let It=rt[Jt],Gt=rt[ht],Kt=It.start+It.count,Bt=nt(Gt.start,S.width,4),Yt=nt(It.start,S.width,4);Gt.start<=Kt+1&&Bt===Yt&&nt(Gt.start+Gt.count-1,S.width,4)===Bt?It.count=Math.max(It.count,Gt.start+Gt.count-It.start):(++Jt,rt[Jt]=Gt)}rt.length=Jt+1;let J=i.getParameter(i.UNPACK_ROW_LENGTH),xt=i.getParameter(i.UNPACK_SKIP_PIXELS),St=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let ht=0,It=rt.length;ht<It;ht++){let Gt=rt[ht],Kt=Math.floor(Gt.start/4),Bt=Math.ceil(Gt.count/4),Yt=Kt%S.width,F=Math.floor(Kt/S.width),mt=Bt,bt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,Yt,F,mt,bt,Z,it,S.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,J),i.pixelStorei(i.UNPACK_SKIP_PIXELS,xt),i.pixelStorei(i.UNPACK_SKIP_ROWS,St)}}function U(R,S,Z){let it=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(it=i.TEXTURE_3D);let ut=$(R,S),rt=S.source;e.bindTexture(it,R.__webglTexture,i.TEXTURE0+Z);let Jt=n.get(rt);if(rt.version!==Jt.__version||ut===!0){e.activeTexture(i.TEXTURE0+Z);let J=Ae.getPrimaries(Ae.workingColorSpace),xt=S.colorSpace===Zi?null:Ae.getPrimaries(S.colorSpace),St=S.colorSpace===Zi||J===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let ht=_(S.image,!1,s.maxTextureSize);ht=be(S,ht);let It=r.convert(S.format,S.colorSpace),Gt=r.convert(S.type),Kt=y(S.internalFormat,It,Gt,S.colorSpace,S.isVideoTexture);G(it,S);let Bt,Yt=S.mipmaps,F=S.isVideoTexture!==!0,mt=Jt.__version===void 0||ut===!0,bt=rt.dataReady,Dt=w(S,ht);if(S.isDepthTexture)Kt=x(S.format===Xr,S.type),mt&&(F?e.texStorage2D(i.TEXTURE_2D,1,Kt,ht.width,ht.height):e.texImage2D(i.TEXTURE_2D,0,Kt,ht.width,ht.height,0,It,Gt,null));else if(S.isDataTexture)if(Yt.length>0){F&&mt&&e.texStorage2D(i.TEXTURE_2D,Dt,Kt,Yt[0].width,Yt[0].height);for(let yt=0,A=Yt.length;yt<A;yt++)Bt=Yt[yt],F?bt&&e.texSubImage2D(i.TEXTURE_2D,yt,0,0,Bt.width,Bt.height,It,Gt,Bt.data):e.texImage2D(i.TEXTURE_2D,yt,Kt,Bt.width,Bt.height,0,It,Gt,Bt.data);S.generateMipmaps=!1}else F?(mt&&e.texStorage2D(i.TEXTURE_2D,Dt,Kt,ht.width,ht.height),bt&&st(S,ht,It,Gt)):e.texImage2D(i.TEXTURE_2D,0,Kt,ht.width,ht.height,0,It,Gt,ht.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){F&&mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Dt,Kt,Yt[0].width,Yt[0].height,ht.depth);for(let yt=0,A=Yt.length;yt<A;yt++)if(Bt=Yt[yt],S.format!==$n)if(It!==null)if(F){if(bt)if(S.layerUpdates.size>0){let K=vu(Bt.width,Bt.height,S.format,S.type);for(let et of S.layerUpdates){let ct=Bt.data.subarray(et*K/Bt.data.BYTES_PER_ELEMENT,(et+1)*K/Bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,yt,0,0,et,Bt.width,Bt.height,1,It,ct)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,yt,0,0,0,Bt.width,Bt.height,ht.depth,It,Bt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,yt,Kt,Bt.width,Bt.height,ht.depth,0,Bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?bt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,yt,0,0,0,Bt.width,Bt.height,ht.depth,It,Gt,Bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,yt,Kt,Bt.width,Bt.height,ht.depth,0,It,Gt,Bt.data)}else{F&&mt&&e.texStorage2D(i.TEXTURE_2D,Dt,Kt,Yt[0].width,Yt[0].height);for(let yt=0,A=Yt.length;yt<A;yt++)Bt=Yt[yt],S.format!==$n?It!==null?F?bt&&e.compressedTexSubImage2D(i.TEXTURE_2D,yt,0,0,Bt.width,Bt.height,It,Bt.data):e.compressedTexImage2D(i.TEXTURE_2D,yt,Kt,Bt.width,Bt.height,0,Bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?bt&&e.texSubImage2D(i.TEXTURE_2D,yt,0,0,Bt.width,Bt.height,It,Gt,Bt.data):e.texImage2D(i.TEXTURE_2D,yt,Kt,Bt.width,Bt.height,0,It,Gt,Bt.data)}else if(S.isDataArrayTexture)if(F){if(mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Dt,Kt,ht.width,ht.height,ht.depth),bt)if(S.layerUpdates.size>0){let yt=vu(ht.width,ht.height,S.format,S.type);for(let A of S.layerUpdates){let K=ht.data.subarray(A*yt/ht.data.BYTES_PER_ELEMENT,(A+1)*yt/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,A,ht.width,ht.height,1,It,Gt,K)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,It,Gt,ht.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Kt,ht.width,ht.height,ht.depth,0,It,Gt,ht.data);else if(S.isData3DTexture)F?(mt&&e.texStorage3D(i.TEXTURE_3D,Dt,Kt,ht.width,ht.height,ht.depth),bt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,It,Gt,ht.data)):e.texImage3D(i.TEXTURE_3D,0,Kt,ht.width,ht.height,ht.depth,0,It,Gt,ht.data);else if(S.isFramebufferTexture){if(mt)if(F)e.texStorage2D(i.TEXTURE_2D,Dt,Kt,ht.width,ht.height);else{let yt=ht.width,A=ht.height;for(let K=0;K<Dt;K++)e.texImage2D(i.TEXTURE_2D,K,Kt,yt,A,0,It,Gt,null),yt>>=1,A>>=1}}else if(Yt.length>0){if(F&&mt){let yt=Me(Yt[0]);e.texStorage2D(i.TEXTURE_2D,Dt,Kt,yt.width,yt.height)}for(let yt=0,A=Yt.length;yt<A;yt++)Bt=Yt[yt],F?bt&&e.texSubImage2D(i.TEXTURE_2D,yt,0,0,It,Gt,Bt):e.texImage2D(i.TEXTURE_2D,yt,Kt,It,Gt,Bt);S.generateMipmaps=!1}else if(F){if(mt){let yt=Me(ht);e.texStorage2D(i.TEXTURE_2D,Dt,Kt,yt.width,yt.height)}bt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,It,Gt,ht)}else e.texImage2D(i.TEXTURE_2D,0,Kt,It,Gt,ht);m(S)&&p(it),Jt.__version=rt.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function I(R,S,Z){if(S.image.length!==6)return;let it=$(R,S),ut=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+Z);let rt=n.get(ut);if(ut.version!==rt.__version||it===!0){e.activeTexture(i.TEXTURE0+Z);let Jt=Ae.getPrimaries(Ae.workingColorSpace),J=S.colorSpace===Zi?null:Ae.getPrimaries(S.colorSpace),xt=S.colorSpace===Zi||Jt===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let St=S.isCompressedTexture||S.image[0].isCompressedTexture,ht=S.image[0]&&S.image[0].isDataTexture,It=[];for(let A=0;A<6;A++)!St&&!ht?It[A]=_(S.image[A],!0,s.maxCubemapSize):It[A]=ht?S.image[A].image:S.image[A],It[A]=be(S,It[A]);let Gt=It[0],Kt=r.convert(S.format,S.colorSpace),Bt=r.convert(S.type),Yt=y(S.internalFormat,Kt,Bt,S.colorSpace),F=S.isVideoTexture!==!0,mt=rt.__version===void 0||it===!0,bt=ut.dataReady,Dt=w(S,Gt);G(i.TEXTURE_CUBE_MAP,S);let yt;if(St){F&&mt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Dt,Yt,Gt.width,Gt.height);for(let A=0;A<6;A++){yt=It[A].mipmaps;for(let K=0;K<yt.length;K++){let et=yt[K];S.format!==$n?Kt!==null?F?bt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K,0,0,et.width,et.height,Kt,et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K,Yt,et.width,et.height,0,et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K,0,0,et.width,et.height,Kt,Bt,et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K,Yt,et.width,et.height,0,Kt,Bt,et.data)}}}else{if(yt=S.mipmaps,F&&mt){yt.length>0&&Dt++;let A=Me(It[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Dt,Yt,A.width,A.height)}for(let A=0;A<6;A++)if(ht){F?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,0,0,It[A].width,It[A].height,Kt,Bt,It[A].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,Yt,It[A].width,It[A].height,0,Kt,Bt,It[A].data);for(let K=0;K<yt.length;K++){let ct=yt[K].image[A].image;F?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K+1,0,0,ct.width,ct.height,Kt,Bt,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K+1,Yt,ct.width,ct.height,0,Kt,Bt,ct.data)}}else{F?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,0,0,Kt,Bt,It[A]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,Yt,Kt,Bt,It[A]);for(let K=0;K<yt.length;K++){let et=yt[K];F?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K+1,0,0,Kt,Bt,et.image[A]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+A,K+1,Yt,Kt,Bt,et.image[A])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),rt.__version=ut.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function V(R,S,Z,it,ut,rt){let Jt=r.convert(Z.format,Z.colorSpace),J=r.convert(Z.type),xt=y(Z.internalFormat,Jt,J,Z.colorSpace),St=n.get(S),ht=n.get(Z);if(ht.__renderTarget=S,!St.__hasExternalTextures){let It=Math.max(1,S.width>>rt),Gt=Math.max(1,S.height>>rt);ut===i.TEXTURE_3D||ut===i.TEXTURE_2D_ARRAY?e.texImage3D(ut,rt,xt,It,Gt,S.depth,0,Jt,J,null):e.texImage2D(ut,rt,xt,It,Gt,0,Jt,J,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),zt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,ut,ht.__webglTexture,0,ve(S)):(ut===i.TEXTURE_2D||ut>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ut<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,ut,ht.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(R,S,Z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){let it=S.depthTexture,ut=it&&it.isDepthTexture?it.type:null,rt=x(S.stencilBuffer,ut),Jt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=ve(S);zt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,rt,S.width,S.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,rt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,rt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Jt,i.RENDERBUFFER,R)}else{let it=S.textures;for(let ut=0;ut<it.length;ut++){let rt=it[ut],Jt=r.convert(rt.format,rt.colorSpace),J=r.convert(rt.type),xt=y(rt.internalFormat,Jt,J,rt.colorSpace),St=ve(S);Z&&zt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,St,xt,S.width,S.height):zt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,St,xt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,xt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function dt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let it=n.get(S.depthTexture);it.__renderTarget=S,(!it.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),tt(S.depthTexture,0);let ut=it.__webglTexture,rt=ve(S);if(S.depthTexture.format===Tr)zt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ut,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ut,0);else if(S.depthTexture.format===Xr)zt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ut,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ut,0);else throw new Error("Unknown depthTexture format")}function Ft(R){let S=n.get(R),Z=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){let it=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),it){let ut=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,it.removeEventListener("dispose",ut)};it.addEventListener("dispose",ut),S.__depthDisposeCallback=ut}S.__boundDepthTexture=it}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(Z)throw new Error("target.depthTexture not supported in Cube render targets");let it=R.texture.mipmaps;it&&it.length>0?dt(S.__webglFramebuffer[0],R):dt(S.__webglFramebuffer,R)}else if(Z){S.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[it]),S.__webglDepthbuffer[it]===void 0)S.__webglDepthbuffer[it]=i.createRenderbuffer(),at(S.__webglDepthbuffer[it],R,!1);else{let ut=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=S.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,rt)}}else{let it=R.texture.mipmaps;if(it&&it.length>0?e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),at(S.__webglDepthbuffer,R,!1);else{let ut=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,rt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Qt(R,S,Z){let it=n.get(R);S!==void 0&&V(it.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Z!==void 0&&Ft(R)}function P(R){let S=R.texture,Z=n.get(R),it=n.get(S);R.addEventListener("dispose",C);let ut=R.textures,rt=R.isWebGLCubeRenderTarget===!0,Jt=ut.length>1;if(Jt||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=S.version,o.memory.textures++),rt){Z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(S.mipmaps&&S.mipmaps.length>0){Z.__webglFramebuffer[J]=[];for(let xt=0;xt<S.mipmaps.length;xt++)Z.__webglFramebuffer[J][xt]=i.createFramebuffer()}else Z.__webglFramebuffer[J]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){Z.__webglFramebuffer=[];for(let J=0;J<S.mipmaps.length;J++)Z.__webglFramebuffer[J]=i.createFramebuffer()}else Z.__webglFramebuffer=i.createFramebuffer();if(Jt)for(let J=0,xt=ut.length;J<xt;J++){let St=n.get(ut[J]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&zt(R)===!1){Z.__webglMultisampledFramebuffer=i.createFramebuffer(),Z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let J=0;J<ut.length;J++){let xt=ut[J];Z.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Z.__webglColorRenderbuffer[J]);let St=r.convert(xt.format,xt.colorSpace),ht=r.convert(xt.type),It=y(xt.internalFormat,St,ht,xt.colorSpace,R.isXRRenderTarget===!0),Gt=ve(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,It,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,Z.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(Z.__webglDepthRenderbuffer=i.createRenderbuffer(),at(Z.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),G(i.TEXTURE_CUBE_MAP,S);for(let J=0;J<6;J++)if(S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)V(Z.__webglFramebuffer[J][xt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt);else V(Z.__webglFramebuffer[J],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Jt){for(let J=0,xt=ut.length;J<xt;J++){let St=ut[J],ht=n.get(St),It=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(It=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(It,ht.__webglTexture),G(It,St),V(Z.__webglFramebuffer,R,St,i.COLOR_ATTACHMENT0+J,It,0),m(St)&&p(It)}e.unbindTexture()}else{let J=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(J=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(J,it.__webglTexture),G(J,S),S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)V(Z.__webglFramebuffer[xt],R,S,i.COLOR_ATTACHMENT0,J,xt);else V(Z.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,J,0);m(S)&&p(J),e.unbindTexture()}R.depthBuffer&&Ft(R)}function $t(R){let S=R.textures;for(let Z=0,it=S.length;Z<it;Z++){let ut=S[Z];if(m(ut)){let rt=v(R),Jt=n.get(ut).__webglTexture;e.bindTexture(rt,Jt),p(rt),e.unbindTexture()}}}let Lt=[],Ht=[];function kt(R){if(R.samples>0){if(zt(R)===!1){let S=R.textures,Z=R.width,it=R.height,ut=i.COLOR_BUFFER_BIT,rt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Jt=n.get(R),J=S.length>1;if(J)for(let St=0;St<S.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,Jt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Jt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Jt.__webglMultisampledFramebuffer);let xt=R.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Jt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Jt.__webglFramebuffer);for(let St=0;St<S.length;St++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ut|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ut|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Jt.__webglColorRenderbuffer[St]);let ht=n.get(S[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ht,0)}i.blitFramebuffer(0,0,Z,it,0,0,Z,it,ut,i.NEAREST),c===!0&&(Lt.length=0,Ht.length=0,Lt.push(i.COLOR_ATTACHMENT0+St),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Lt.push(rt),Ht.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ht)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Lt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let St=0;St<S.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,Jt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,Jt.__webglColorRenderbuffer[St]);let ht=n.get(S[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Jt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Jt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function ve(R){return Math.min(s.maxSamples,R.samples)}function zt(R){let S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Zt(R){let S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function be(R,S){let Z=R.colorSpace,it=R.format,ut=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Z!==yn&&Z!==Zi&&(Ae.getTransfer(Z)===ke?(it!==$n||ut!==fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Z)),S}function Me(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=X,this.setTexture2D=tt,this.setTexture2DArray=B,this.setTexture3D=pt,this.setTextureCube=q,this.rebindTextures=Qt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=V,this.useMultisampledRTT=zt}function FM(i,t){function e(n,s=Zi){let r,o=Ae.getTransfer(s);if(n===fi)return i.UNSIGNED_BYTE;if(n===Zc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ou)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===au)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===su)return i.BYTE;if(n===ru)return i.SHORT;if(n===Vr)return i.UNSIGNED_SHORT;if(n===$c)return i.INT;if(n===ps)return i.UNSIGNED_INT;if(n===ti)return i.FLOAT;if(n===Gr)return i.HALF_FLOAT;if(n===cu)return i.ALPHA;if(n===lu)return i.RGB;if(n===$n)return i.RGBA;if(n===Tr)return i.DEPTH_COMPONENT;if(n===Xr)return i.DEPTH_STENCIL;if(n===jc)return i.RED;if(n===Jc)return i.RED_INTEGER;if(n===hu)return i.RG;if(n===Qc)return i.RG_INTEGER;if(n===tl)return i.RGBA_INTEGER;if(n===ha||n===ua||n===fa||n===da)if(o===ke)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ha)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ha)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===el||n===nl||n===il||n===sl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===el)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===rl||n===ol||n===al)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===rl||n===ol)return o===ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===al)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===cl||n===ll||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===_l||n===xl||n===yl||n===vl||n===Ml)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===cl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ll)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ul)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ml)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_l)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vl)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ml)return o===ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sl||n===bl||n===El)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Sl)return o===ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===El)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wl||n===Tl||n===Al||n===Rl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Wr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}function zM(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,gu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===vn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===vn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=t.get(p),y=v.envMap,x=v.envMapRotation;y&&(m.envMap.value=y,qs.copy(x),qs.x*=-1,qs.y*=-1,qs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),m.envMapRotation.value.setFromMatrix4(kM.makeRotationFromEuler(qs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===vn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function HM(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){let x=y.program;n.uniformBlockBinding(v,x)}function l(v,y){let x=s[v.id];x===void 0&&(g(v),x=h(v),s[v.id]=x,v.addEventListener("dispose",m));let w=y.program;n.updateUBOMapping(v,w);let T=t.render.frame;r[v.id]!==T&&(f(v),r[v.id]=T)}function h(v){let y=u();v.__bindingPointIndex=y;let x=i.createBuffer(),w=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,w,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let y=s[v.id],x=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,C=x.length;T<C;T++){let N=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,M=N.length;b<M;b++){let D=N[b];if(d(D,T,b,w)===!0){let X=D.__offset,j=Array.isArray(D.value)?D.value:[D.value],O=0;for(let tt=0;tt<j.length;tt++){let B=j[tt],pt=_(B);typeof B=="number"||typeof B=="boolean"?(D.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,X+O,D.__data)):B.isMatrix3?(D.__data[0]=B.elements[0],D.__data[1]=B.elements[1],D.__data[2]=B.elements[2],D.__data[3]=0,D.__data[4]=B.elements[3],D.__data[5]=B.elements[4],D.__data[6]=B.elements[5],D.__data[7]=0,D.__data[8]=B.elements[6],D.__data[9]=B.elements[7],D.__data[10]=B.elements[8],D.__data[11]=0):(B.toArray(D.__data,O),O+=pt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,X,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,y,x,w){let T=v.value,C=y+"_"+x;if(w[C]===void 0)return typeof T=="number"||typeof T=="boolean"?w[C]=T:w[C]=T.clone(),!0;{let N=w[C];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return w[C]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function g(v){let y=v.uniforms,x=0,w=16;for(let C=0,N=y.length;C<N;C++){let b=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,D=b.length;M<D;M++){let X=b[M],j=Array.isArray(X.value)?X.value:[X.value];for(let O=0,tt=j.length;O<tt;O++){let B=j[O],pt=_(B),q=x%w,Rt=q%pt.boundary,Ut=q+Rt;x+=Rt,Ut!==0&&w-Ut<pt.storage&&(x+=w-Ut),X.__data=new Float32Array(pt.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=x,x+=pt.storage}}}let T=x%w;return T>0&&(x+=w-T),v.__size=x,v.__cache={},this}function _(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){let y=v.target;y.removeEventListener("dispose",m);let x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var m_,g_,__,x_,y_,v_,M_,S_,b_,E_,w_,T_,A_,R_,C_,I_,P_,L_,D_,N_,U_,F_,O_,B_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,$_,Z_,K_,j_,J_,Q_,tx,ex,nx,ix,sx,rx,ox,ax,cx,lx,hx,ux,fx,dx,px,mx,gx,_x,xx,yx,vx,Mx,Sx,bx,Ex,wx,Tx,Ax,Rx,Cx,Ix,Px,Lx,Dx,Nx,Ux,Fx,Ox,Bx,kx,zx,Hx,Vx,Gx,Wx,Xx,qx,Yx,$x,Zx,Kx,jx,Jx,Qx,ty,ey,ny,iy,sy,ry,oy,ay,cy,ly,hy,uy,fy,dy,py,my,gy,_y,xy,yy,vy,My,Sy,by,Ey,wy,Ty,Ay,Ry,Cy,Iy,Py,Ly,Dy,Ny,Uy,Fy,Oy,By,ky,zy,Hy,Vy,Gy,Wy,Xy,qy,Yy,xe,Vt,wi,Il,Xs,$y,$r,Bp,$s,Su,kp,bu,Eu,wu,Tu,Ys,Yr,zp,ev,Kr,cm,Wp,lm,hm,um,Xp,qp,Yp,$p,Zp,Ru,Cu,Iu,Au,Zr,Jv,Qv,Jp,Ll,cM,lM,uM,yM,Lu,Du,TM,IM,PM,DM,OM,BM,Nu,Uu,qs,kM,jr,ei=qe(()=>{Mu();Mu();m_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,g_=`#ifdef USE_ALPHAHASH
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
#endif`,__=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,x_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,y_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,v_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,M_=`#ifdef USE_AOMAP
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
#endif`,S_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b_=`#ifdef USE_BATCHING
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
#endif`,E_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,w_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,T_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,A_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,R_=`#ifdef USE_IRIDESCENCE
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
#endif`,C_=`#ifdef USE_BUMPMAP
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
#endif`,I_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,P_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,N_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,U_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,F_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,O_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,B_=`#define PI 3.141592653589793
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
} // validated`,k_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,z_=`vec3 transformedNormal = objectNormal;
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
#endif`,H_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,G_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,W_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,X_="gl_FragColor = linearToOutputTexel( gl_FragColor );",q_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y_=`#ifdef USE_ENVMAP
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
#endif`,$_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Z_=`#ifdef USE_ENVMAP
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
#endif`,K_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j_=`#ifdef USE_ENVMAP
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
#endif`,J_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Q_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ex=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nx=`#ifdef USE_GRADIENTMAP
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
}`,ix=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ox=`uniform bool receiveShadow;
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
#endif`,ax=`#ifdef USE_ENVMAP
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
#endif`,cx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ux=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fx=`PhysicalMaterial material;
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
#endif`,dx=`struct PhysicalMaterial {
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
}`,px=`
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
#endif`,mx=`#if defined( RE_IndirectDiffuse )
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
#endif`,gx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_x=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ex=`#if defined( USE_POINTS_UV )
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
#endif`,wx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ax=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ix=`#ifdef USE_MORPHTARGETS
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
#endif`,Px=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ux=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ox=`#ifdef USE_NORMALMAP
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
#endif`,Bx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$x=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qx=`float getShadowMask() {
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
}`,ty=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ey=`#ifdef USE_SKINNING
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
#endif`,ny=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iy=`#ifdef USE_SKINNING
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
#endif`,sy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ry=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ay=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cy=`#ifdef USE_TRANSMISSION
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
#endif`,ly=`#ifdef USE_TRANSMISSION
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
#endif`,hy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,py=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,my=`uniform sampler2D t2D;
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
}`,gy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_y=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vy=`#include <common>
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
}`,My=`#if DEPTH_PACKING == 3200
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
}`,Sy=`#define DISTANCE
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
}`,by=`#define DISTANCE
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
}`,Ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ty=`uniform float scale;
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
}`,Ay=`uniform vec3 diffuse;
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
}`,Ry=`#include <common>
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
}`,Cy=`uniform vec3 diffuse;
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
}`,Iy=`#define LAMBERT
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
}`,Py=`#define LAMBERT
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
}`,Ly=`#define MATCAP
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
}`,Dy=`#define MATCAP
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
}`,Ny=`#define NORMAL
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
}`,Uy=`#define NORMAL
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
}`,Fy=`#define PHONG
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
}`,Oy=`#define PHONG
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
}`,By=`#define STANDARD
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
}`,ky=`#define STANDARD
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
}`,zy=`#define TOON
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
}`,Hy=`#define TOON
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
}`,Vy=`uniform float size;
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
}`,Gy=`uniform vec3 diffuse;
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
}`,Wy=`#include <common>
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
}`,Xy=`uniform vec3 color;
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
}`,qy=`uniform float rotation;
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
}`,Yy=`uniform vec3 diffuse;
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
}`,xe={alphahash_fragment:m_,alphahash_pars_fragment:g_,alphamap_fragment:__,alphamap_pars_fragment:x_,alphatest_fragment:y_,alphatest_pars_fragment:v_,aomap_fragment:M_,aomap_pars_fragment:S_,batching_pars_vertex:b_,batching_vertex:E_,begin_vertex:w_,beginnormal_vertex:T_,bsdfs:A_,iridescence_fragment:R_,bumpmap_pars_fragment:C_,clipping_planes_fragment:I_,clipping_planes_pars_fragment:P_,clipping_planes_pars_vertex:L_,clipping_planes_vertex:D_,color_fragment:N_,color_pars_fragment:U_,color_pars_vertex:F_,color_vertex:O_,common:B_,cube_uv_reflection_fragment:k_,defaultnormal_vertex:z_,displacementmap_pars_vertex:H_,displacementmap_vertex:V_,emissivemap_fragment:G_,emissivemap_pars_fragment:W_,colorspace_fragment:X_,colorspace_pars_fragment:q_,envmap_fragment:Y_,envmap_common_pars_fragment:$_,envmap_pars_fragment:Z_,envmap_pars_vertex:K_,envmap_physical_pars_fragment:ax,envmap_vertex:j_,fog_vertex:J_,fog_pars_vertex:Q_,fog_fragment:tx,fog_pars_fragment:ex,gradientmap_pars_fragment:nx,lightmap_pars_fragment:ix,lights_lambert_fragment:sx,lights_lambert_pars_fragment:rx,lights_pars_begin:ox,lights_toon_fragment:cx,lights_toon_pars_fragment:lx,lights_phong_fragment:hx,lights_phong_pars_fragment:ux,lights_physical_fragment:fx,lights_physical_pars_fragment:dx,lights_fragment_begin:px,lights_fragment_maps:mx,lights_fragment_end:gx,logdepthbuf_fragment:_x,logdepthbuf_pars_fragment:xx,logdepthbuf_pars_vertex:yx,logdepthbuf_vertex:vx,map_fragment:Mx,map_pars_fragment:Sx,map_particle_fragment:bx,map_particle_pars_fragment:Ex,metalnessmap_fragment:wx,metalnessmap_pars_fragment:Tx,morphinstance_vertex:Ax,morphcolor_vertex:Rx,morphnormal_vertex:Cx,morphtarget_pars_vertex:Ix,morphtarget_vertex:Px,normal_fragment_begin:Lx,normal_fragment_maps:Dx,normal_pars_fragment:Nx,normal_pars_vertex:Ux,normal_vertex:Fx,normalmap_pars_fragment:Ox,clearcoat_normal_fragment_begin:Bx,clearcoat_normal_fragment_maps:kx,clearcoat_pars_fragment:zx,iridescence_pars_fragment:Hx,opaque_fragment:Vx,packing:Gx,premultiplied_alpha_fragment:Wx,project_vertex:Xx,dithering_fragment:qx,dithering_pars_fragment:Yx,roughnessmap_fragment:$x,roughnessmap_pars_fragment:Zx,shadowmap_pars_fragment:Kx,shadowmap_pars_vertex:jx,shadowmap_vertex:Jx,shadowmask_pars_fragment:Qx,skinbase_vertex:ty,skinning_pars_vertex:ey,skinning_vertex:ny,skinnormal_vertex:iy,specularmap_fragment:sy,specularmap_pars_fragment:ry,tonemapping_fragment:oy,tonemapping_pars_fragment:ay,transmission_fragment:cy,transmission_pars_fragment:ly,uv_pars_fragment:hy,uv_pars_vertex:uy,uv_vertex:fy,worldpos_vertex:dy,background_vert:py,background_frag:my,backgroundCube_vert:gy,backgroundCube_frag:_y,cube_vert:xy,cube_frag:yy,depth_vert:vy,depth_frag:My,distanceRGBA_vert:Sy,distanceRGBA_frag:by,equirect_vert:Ey,equirect_frag:wy,linedashed_vert:Ty,linedashed_frag:Ay,meshbasic_vert:Ry,meshbasic_frag:Cy,meshlambert_vert:Iy,meshlambert_frag:Py,meshmatcap_vert:Ly,meshmatcap_frag:Dy,meshnormal_vert:Ny,meshnormal_frag:Uy,meshphong_vert:Fy,meshphong_frag:Oy,meshphysical_vert:By,meshphysical_frag:ky,meshtoon_vert:zy,meshtoon_frag:Hy,points_vert:Vy,points_frag:Gy,shadow_vert:Wy,shadow_frag:Xy,sprite_vert:qy,sprite_frag:Yy},Vt={common:{diffuse:{value:new ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ge}},envmap:{envMap:{value:null},envMapRotation:{value:new ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ge},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0},uvTransform:{value:new ge}},sprite:{diffuse:{value:new ce(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}}},wi={basic:{uniforms:Cn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.fog]),vertexShader:xe.meshbasic_vert,fragmentShader:xe.meshbasic_frag},lambert:{uniforms:Cn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new ce(0)}}]),vertexShader:xe.meshlambert_vert,fragmentShader:xe.meshlambert_frag},phong:{uniforms:Cn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new ce(0)},specular:{value:new ce(1118481)},shininess:{value:30}}]),vertexShader:xe.meshphong_vert,fragmentShader:xe.meshphong_frag},standard:{uniforms:Cn([Vt.common,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.roughnessmap,Vt.metalnessmap,Vt.fog,Vt.lights,{emissive:{value:new ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag},toon:{uniforms:Cn([Vt.common,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.gradientmap,Vt.fog,Vt.lights,{emissive:{value:new ce(0)}}]),vertexShader:xe.meshtoon_vert,fragmentShader:xe.meshtoon_frag},matcap:{uniforms:Cn([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,{matcap:{value:null}}]),vertexShader:xe.meshmatcap_vert,fragmentShader:xe.meshmatcap_frag},points:{uniforms:Cn([Vt.points,Vt.fog]),vertexShader:xe.points_vert,fragmentShader:xe.points_frag},dashed:{uniforms:Cn([Vt.common,Vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xe.linedashed_vert,fragmentShader:xe.linedashed_frag},depth:{uniforms:Cn([Vt.common,Vt.displacementmap]),vertexShader:xe.depth_vert,fragmentShader:xe.depth_frag},normal:{uniforms:Cn([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,{opacity:{value:1}}]),vertexShader:xe.meshnormal_vert,fragmentShader:xe.meshnormal_frag},sprite:{uniforms:Cn([Vt.sprite,Vt.fog]),vertexShader:xe.sprite_vert,fragmentShader:xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xe.background_vert,fragmentShader:xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ge}},vertexShader:xe.backgroundCube_vert,fragmentShader:xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xe.cube_vert,fragmentShader:xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xe.equirect_vert,fragmentShader:xe.equirect_frag},distanceRGBA:{uniforms:Cn([Vt.common,Vt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xe.distanceRGBA_vert,fragmentShader:xe.distanceRGBA_frag},shadow:{uniforms:Cn([Vt.lights,Vt.fog,{color:{value:new ce(0)},opacity:{value:1}}]),vertexShader:xe.shadow_vert,fragmentShader:xe.shadow_frag}};wi.physical={uniforms:Cn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ge},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ge},sheen:{value:0},sheenColor:{value:new ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ge},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ge},attenuationDistance:{value:0},attenuationColor:{value:new ce(0)},specularColor:{value:new ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ge},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ge}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag};Il={r:0,b:0,g:0},Xs=new Qn,$y=new he;$r=4,Bp=[.125,.215,.35,.446,.526,.582],$s=20,Su=new Xi,kp=new ce,bu=null,Eu=0,wu=0,Tu=!1,Ys=(1+Math.sqrt(5))/2,Yr=1/Ys,zp=[new L(-Ys,Yr,0),new L(Ys,Yr,0),new L(-Yr,0,Ys),new L(Yr,0,Ys),new L(0,Ys,-Yr),new L(0,Ys,Yr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],ev=new L,Kr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=ev}=r;bu=this._renderer.getRenderTarget(),Eu=this._renderer.getActiveCubeFace(),wu=this._renderer.getActiveMipmapLevel(),Tu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(bu,Eu,wu),this._renderer.xr.enabled=Tu,t.scissorTest=!1,Pl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),bu=this._renderer.getRenderTarget(),Eu=this._renderer.getActiveCubeFace(),wu=this._renderer.getActiveMipmapLevel(),Tu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:Gr,format:$n,colorSpace:yn,depthBuffer:!1},s=Hp(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hp(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nv(r)),this._blurMaterial=iv(r,t,e)}return s}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,Su)}_sceneToCubeUV(t,e,n,s,r){let c=new tn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(kp),u.toneMapping=$i,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let _=new Oe({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),m=new fe(new ls,_),p=!1,v=t.background;v?v.isColor&&(_.color.copy(v),t.background=null,p=!0):(_.color.copy(kp),p=!0);for(let y=0;y<6;y++){let x=y%3;x===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):x===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));let w=this._cubeSize;Pl(s,x*w,y>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=v}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Hs||t.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Pl(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Su)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zp[(s-r-1)%zp.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new fe(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*$s-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):$s;m>$s&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$s}`);let p=[],v=0;for(let C=0;C<$s;++C){let N=C/_,b=Math.exp(-N*N/2);p.push(b),C===0?v+=b:C<m&&(v+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let x=this._sizeLods[s],w=3*x*(s>y-$r?s-y+$r:0),T=4*(this._cubeSize-x);Pl(e,w,T,3*x,2*x),c.setRenderTarget(e),c.render(u,Su)}};cm=new un,Wp=new Ho(1,1),lm=new Io,hm=new gc,um=new No,Xp=[],qp=[],Yp=new Float32Array(16),$p=new Float32Array(9),Zp=new Float32Array(4);Ru=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Iv(e.type)}},Cu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Kv(e.type)}},Iu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Au=/(\w+)(\])?(\[|\.)?/g;Zr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);jv(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};Jv=37297,Qv=0;Jp=new ge;Ll=new L;cM=/^[ \t]*#include +<([\w\d./]+)>/gm;lM=new Map;uM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;yM=0,Lu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Du(t),e.set(t,n)),n}},Du=class{constructor(t){this.id=yM++,this.code=t,this.usedTimes=0}};TM=0;IM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,PM=`uniform sampler2D shadow_pass;
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
}`;DM={[Fc]:Oc,[Bc]:Hc,[kc]:Vc,[Ts]:zc,[Oc]:Fc,[Hc]:Bc,[Vc]:kc,[zc]:Ts};OM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,BM=`
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

}`,Nu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Vo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new qn({vertexShader:OM,fragmentShader:BM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new Ns(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Uu=class extends _i{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new Nu,p={},v=e.getContextAttributes(),y=null,x=null,w=[],T=[],C=new Pt,N=null,b=new tn;b.viewport=new Ue;let M=new tn;M.viewport=new Ue;let D=[b,M],X=new Uc,j=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let I=w[U];return I===void 0&&(I=new Pr,w[U]=I),I.getTargetRaySpace()},this.getControllerGrip=function(U){let I=w[U];return I===void 0&&(I=new Pr,w[U]=I),I.getGripSpace()},this.getHand=function(U){let I=w[U];return I===void 0&&(I=new Pr,w[U]=I),I.getHandSpace()};function tt(U){let I=T.indexOf(U.inputSource);if(I===-1)return;let V=w[I];V!==void 0&&(V.update(U.inputSource,U.frame,l||o),V.dispatchEvent({type:U.type,data:U.inputSource}))}function B(){s.removeEventListener("select",tt),s.removeEventListener("selectstart",tt),s.removeEventListener("selectend",tt),s.removeEventListener("squeeze",tt),s.removeEventListener("squeezestart",tt),s.removeEventListener("squeezeend",tt),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",pt);for(let U=0;U<w.length;U++){let I=T[U];I!==null&&(T[U]=null,w[U].disconnect(I))}j=null,O=null,m.reset();for(let U in p)delete p[U];t.setRenderTarget(y),d=null,f=null,u=null,s=null,x=null,st.stop(),n.isPresenting=!1,t.setPixelRatio(N),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){r=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(U){if(s=U,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",tt),s.addEventListener("selectstart",tt),s.addEventListener("selectend",tt),s.addEventListener("squeeze",tt),s.addEventListener("squeezestart",tt),s.addEventListener("squeezeend",tt),s.addEventListener("end",B),s.addEventListener("inputsourceschange",pt),v.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let V=null,at=null,dt=null;v.depth&&(dt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,V=v.stencil?Xr:Tr,at=v.stencil?Wr:ps);let Ft={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ft),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Jn(f.textureWidth,f.textureHeight,{format:$n,type:fi,depthTexture:new Ho(f.textureWidth,f.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let V={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,V),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Jn(d.framebufferWidth,d.framebufferHeight,{format:$n,type:fi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),st.setContext(s),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function pt(U){for(let I=0;I<U.removed.length;I++){let V=U.removed[I],at=T.indexOf(V);at>=0&&(T[at]=null,w[at].disconnect(V))}for(let I=0;I<U.added.length;I++){let V=U.added[I],at=T.indexOf(V);if(at===-1){for(let Ft=0;Ft<w.length;Ft++)if(Ft>=T.length){T.push(V),at=Ft;break}else if(T[Ft]===null){T[Ft]=V,at=Ft;break}if(at===-1)break}let dt=w[at];dt&&dt.connect(V)}}let q=new L,Rt=new L;function Ut(U,I,V){q.setFromMatrixPosition(I.matrixWorld),Rt.setFromMatrixPosition(V.matrixWorld);let at=q.distanceTo(Rt),dt=I.projectionMatrix.elements,Ft=V.projectionMatrix.elements,Qt=dt[14]/(dt[10]-1),P=dt[14]/(dt[10]+1),$t=(dt[9]+1)/dt[5],Lt=(dt[9]-1)/dt[5],Ht=(dt[8]-1)/dt[0],kt=(Ft[8]+1)/Ft[0],ve=Qt*Ht,zt=Qt*kt,Zt=at/(-Ht+kt),be=Zt*-Ht;if(I.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(be),U.translateZ(Zt),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),dt[10]===-1)U.projectionMatrix.copy(I.projectionMatrix),U.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{let Me=Qt+Zt,R=P+Zt,S=ve-be,Z=zt+(at-be),it=$t*P/R*Me,ut=Lt*P/R*Me;U.projectionMatrix.makePerspective(S,Z,it,ut,Me,R),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function qt(U,I){I===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(I.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(s===null)return;let I=U.near,V=U.far;m.texture!==null&&(m.depthNear>0&&(I=m.depthNear),m.depthFar>0&&(V=m.depthFar)),X.near=M.near=b.near=I,X.far=M.far=b.far=V,(j!==X.near||O!==X.far)&&(s.updateRenderState({depthNear:X.near,depthFar:X.far}),j=X.near,O=X.far),X.layers.mask=U.layers.mask|6,b.layers.mask=X.layers.mask&3,M.layers.mask=X.layers.mask&5;let at=U.parent,dt=X.cameras;qt(X,at);for(let Ft=0;Ft<dt.length;Ft++)qt(dt[Ft],at);dt.length===2?Ut(X,b,M):X.projectionMatrix.copy(b.projectionMatrix),G(U,X,at)};function G(U,I,V){V===null?U.matrix.copy(I.matrixWorld):(U.matrix.copy(V.matrixWorld),U.matrix.invert(),U.matrix.multiply(I.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(I.projectionMatrix),U.projectionMatrixInverse.copy(I.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Cs*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(U){c=U,f!==null&&(f.fixedFoveation=U),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=U)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(X)},this.getCameraTexture=function(U){return p[U]};let $=null;function nt(U,I){if(h=I.getViewerPose(l||o),g=I,h!==null){let V=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let at=!1;V.length!==X.cameras.length&&(X.cameras.length=0,at=!0);for(let P=0;P<V.length;P++){let $t=V[P],Lt=null;if(d!==null)Lt=d.getViewport($t);else{let kt=u.getViewSubImage(f,$t);Lt=kt.viewport,P===0&&(t.setRenderTargetTextures(x,kt.colorTexture,kt.depthStencilTexture),t.setRenderTarget(x))}let Ht=D[P];Ht===void 0&&(Ht=new tn,Ht.layers.enable(P),Ht.viewport=new Ue,D[P]=Ht),Ht.matrix.fromArray($t.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray($t.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(Lt.x,Lt.y,Lt.width,Lt.height),P===0&&(X.matrix.copy(Ht.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),at===!0&&X.cameras.push(Ht)}let dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let P=u.getDepthInformation(V[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(dt&&dt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let P=0;P<V.length;P++){let $t=V[P].camera;if($t){let Lt=p[$t];Lt||(Lt=new Vo,p[$t]=Lt);let Ht=u.getCameraImage($t);Lt.sourceTexture=Ht}}}}for(let V=0;V<w.length;V++){let at=T[V],dt=w[V];at!==null&&dt!==void 0&&dt.update(at,I,l||o)}$&&$(U,I),I.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:I}),g=null}let st=new am;st.setAnimationLoop(nt),this.setAnimationLoop=function(U){$=U},this.dispose=function(){}}},qs=new Qn,kM=new he;jr=class{constructor(t={}){let{canvas:e=Ap(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,w=!1;this._outputColorSpace=Ke;let T=0,C=0,N=null,b=-1,M=null,D=new Ue,X=new Ue,j=null,O=new ce(0),tt=0,B=e.width,pt=e.height,q=1,Rt=null,Ut=null,qt=new Ue(0,0,B,pt),G=new Ue(0,0,B,pt),$=!1,nt=new Nr,st=!1,U=!1,I=new he,V=new L,at=new Ue,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ft=!1;function Qt(){return N===null?q:1}let P=n;function $t(E,H){return e.getContext(E,H)}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",bt,!1),e.addEventListener("webglcontextrestored",Dt,!1),e.addEventListener("webglcontextcreationerror",yt,!1),P===null){let H="webgl2";if(P=$t(H,E),P===null)throw $t(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Lt,Ht,kt,ve,zt,Zt,be,Me,R,S,Z,it,ut,rt,Jt,J,xt,St,ht,It,Gt,Kt,Bt,Yt;function F(){Lt=new rv(P),Lt.init(),Kt=new FM(P,Lt),Ht=new Jy(P,Lt,t,Kt),kt=new NM(P,Lt),Ht.reversedDepthBuffer&&f&&kt.buffers.depth.setReversed(!0),ve=new cv(P),zt=new MM,Zt=new UM(P,Lt,kt,zt,Ht,Kt,ve),be=new tv(x),Me=new sv(x),R=new p_(P),Bt=new Ky(P,R),S=new ov(P,R,ve,Bt),Z=new hv(P,S,R,ve),ht=new lv(P,Ht,Zt),J=new Qy(zt),it=new vM(x,be,Me,Lt,Ht,Bt,J),ut=new zM(x,zt),rt=new bM,Jt=new CM(Lt),St=new Zy(x,be,Me,kt,Z,d,c),xt=new LM(x,Z,Ht),Yt=new HM(P,ve,Ht,kt),It=new jy(P,Lt,ve),Gt=new av(P,Lt,ve),ve.programs=it.programs,x.capabilities=Ht,x.extensions=Lt,x.properties=zt,x.renderLists=rt,x.shadowMap=xt,x.state=kt,x.info=ve}F();let mt=new Uu(x,P);this.xr=mt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let E=Lt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Lt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(E){E!==void 0&&(q=E,this.setSize(B,pt,!1))},this.getSize=function(E){return E.set(B,pt)},this.setSize=function(E,H,Q=!0){if(mt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=E,pt=H,e.width=Math.floor(E*q),e.height=Math.floor(H*q),Q===!0&&(e.style.width=E+"px",e.style.height=H+"px"),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(B*q,pt*q).floor()},this.setDrawingBufferSize=function(E,H,Q){B=E,pt=H,q=Q,e.width=Math.floor(E*Q),e.height=Math.floor(H*Q),this.setViewport(0,0,E,H)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(qt)},this.setViewport=function(E,H,Q,k){E.isVector4?qt.set(E.x,E.y,E.z,E.w):qt.set(E,H,Q,k),kt.viewport(D.copy(qt).multiplyScalar(q).round())},this.getScissor=function(E){return E.copy(G)},this.setScissor=function(E,H,Q,k){E.isVector4?G.set(E.x,E.y,E.z,E.w):G.set(E,H,Q,k),kt.scissor(X.copy(G).multiplyScalar(q).round())},this.getScissorTest=function(){return $},this.setScissorTest=function(E){kt.setScissorTest($=E)},this.setOpaqueSort=function(E){Rt=E},this.setTransparentSort=function(E){Ut=E},this.getClearColor=function(E){return E.copy(St.getClearColor())},this.setClearColor=function(){St.setClearColor(...arguments)},this.getClearAlpha=function(){return St.getClearAlpha()},this.setClearAlpha=function(){St.setClearAlpha(...arguments)},this.clear=function(E=!0,H=!0,Q=!0){let k=0;if(E){let W=!1;if(N!==null){let gt=N.texture.format;W=gt===tl||gt===Qc||gt===Jc}if(W){let gt=N.texture.type,Ot=gt===fi||gt===ps||gt===Vr||gt===Wr||gt===Zc||gt===Kc,jt=St.getClearColor(),Xt=St.getClearAlpha(),le=jt.r,oe=jt.g,ne=jt.b;Ot?(g[0]=le,g[1]=oe,g[2]=ne,g[3]=Xt,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=le,_[1]=oe,_[2]=ne,_[3]=Xt,P.clearBufferiv(P.COLOR,0,_))}else k|=P.COLOR_BUFFER_BIT}H&&(k|=P.DEPTH_BUFFER_BIT),Q&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",bt,!1),e.removeEventListener("webglcontextrestored",Dt,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),St.dispose(),rt.dispose(),Jt.dispose(),zt.dispose(),be.dispose(),Me.dispose(),Z.dispose(),Bt.dispose(),Yt.dispose(),it.dispose(),mt.dispose(),mt.removeEventListener("sessionstart",Tt),mt.removeEventListener("sessionend",me),te.stop()};function bt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Dt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let E=ve.autoReset,H=xt.enabled,Q=xt.autoUpdate,k=xt.needsUpdate,W=xt.type;F(),ve.autoReset=E,xt.enabled=H,xt.autoUpdate=Q,xt.needsUpdate=k,xt.type=W}function yt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function A(E){let H=E.target;H.removeEventListener("dispose",A),K(H)}function K(E){et(E),zt.remove(E)}function et(E){let H=zt.get(E).programs;H!==void 0&&(H.forEach(function(Q){it.releaseProgram(Q)}),E.isShaderMaterial&&it.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,Q,k,W,gt){H===null&&(H=dt);let Ot=W.isMesh&&W.matrixWorld.determinant()<0,jt=De(E,H,Q,k,W);kt.setMaterial(k,Ot);let Xt=Q.index,le=1;if(k.wireframe===!0){if(Xt=S.getWireframeAttribute(Q),Xt===void 0)return;le=2}let oe=Q.drawRange,ne=Q.attributes.position,pe=oe.start*le,Ne=(oe.start+oe.count)*le;gt!==null&&(pe=Math.max(pe,gt.start*le),Ne=Math.min(Ne,(gt.start+gt.count)*le)),Xt!==null?(pe=Math.max(pe,0),Ne=Math.min(Ne,Xt.count)):ne!=null&&(pe=Math.max(pe,0),Ne=Math.min(Ne,ne.count));let $e=Ne-pe;if($e<0||$e===1/0)return;Bt.setup(W,k,jt,Q,Xt);let Ge,we=It;if(Xt!==null&&(Ge=R.get(Xt),we=Gt,we.setIndex(Ge)),W.isMesh)k.wireframe===!0?(kt.setLineWidth(k.wireframeLinewidth*Qt()),we.setMode(P.LINES)):we.setMode(P.TRIANGLES);else if(W.isLine){let ie=k.linewidth;ie===void 0&&(ie=1),kt.setLineWidth(ie*Qt()),W.isLineSegments?we.setMode(P.LINES):W.isLineLoop?we.setMode(P.LINE_LOOP):we.setMode(P.LINE_STRIP)}else W.isPoints?we.setMode(P.POINTS):W.isSprite&&we.setMode(P.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Rr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),we.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Lt.get("WEBGL_multi_draw"))we.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let ie=W._multiDrawStarts,We=W._multiDrawCounts,ye=W._multiDrawCount,Sn=Xt?R.get(Xt).bytesPerElement:1,z=zt.get(k).currentProgram.getUniforms();for(let Y=0;Y<ye;Y++)z.setValue(P,"_gl_DrawID",Y),we.render(ie[Y]/Sn,We[Y])}else if(W.isInstancedMesh)we.renderInstances(pe,$e,W.count);else if(Q.isInstancedBufferGeometry){let ie=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,We=Math.min(Q.instanceCount,ie);we.renderInstances(pe,$e,We)}else we.render(pe,$e)};function ct(E,H,Q){E.transparent===!0&&E.side===Le&&E.forceSinglePass===!1?(E.side=vn,E.needsUpdate=!0,Ie(E,H,Q),E.side=li,E.needsUpdate=!0,Ie(E,H,Q),E.side=Le):Ie(E,H,Q)}this.compile=function(E,H,Q=null){Q===null&&(Q=E),p=Jt.get(Q),p.init(H),y.push(p),Q.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),E!==Q&&E.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();let k=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let gt=W.material;if(gt)if(Array.isArray(gt))for(let Ot=0;Ot<gt.length;Ot++){let jt=gt[Ot];ct(jt,Q,W),k.add(jt)}else ct(gt,Q,W),k.add(gt)}),p=y.pop(),k},this.compileAsync=function(E,H,Q=null){let k=this.compile(E,H,Q);return new Promise(W=>{function gt(){if(k.forEach(function(Ot){zt.get(Ot).currentProgram.isReady()&&k.delete(Ot)}),k.size===0){W(E);return}setTimeout(gt,10)}Lt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let ot=null;function Et(E){ot&&ot(E)}function Tt(){te.stop()}function me(){te.start()}let te=new am;te.setAnimationLoop(Et),typeof self<"u"&&te.setContext(self),this.setAnimationLoop=function(E){ot=E,mt.setAnimationLoop(E),E===null?te.stop():te.start()},mt.addEventListener("sessionstart",Tt),mt.addEventListener("sessionend",me),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),mt.enabled===!0&&mt.isPresenting===!0&&(mt.cameraAutoUpdate===!0&&mt.updateCamera(H),H=mt.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,H,N),p=Jt.get(E,y.length),p.init(H),y.push(p),I.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),nt.setFromProjectionMatrix(I,ci,H.reversedDepth),U=this.localClippingEnabled,st=J.init(this.clippingPlanes,U),m=rt.get(E,v.length),m.init(),v.push(m),mt.enabled===!0&&mt.isPresenting===!0){let gt=x.xr.getDepthSensingMesh();gt!==null&&ue(gt,H,-1/0,x.sortObjects)}ue(E,H,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Rt,Ut),Ft=mt.enabled===!1||mt.isPresenting===!1||mt.hasDepthSensing()===!1,Ft&&St.addToRenderList(m,E),this.info.render.frame++,st===!0&&J.beginShadows();let Q=p.state.shadowsArray;xt.render(Q,E,H),st===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=m.opaque,W=m.transmissive;if(p.setupLights(),H.isArrayCamera){let gt=H.cameras;if(W.length>0)for(let Ot=0,jt=gt.length;Ot<jt;Ot++){let Xt=gt[Ot];de(k,W,E,Xt)}Ft&&St.render(E);for(let Ot=0,jt=gt.length;Ot<jt;Ot++){let Xt=gt[Ot];Ee(m,E,Xt,Xt.viewport)}}else W.length>0&&de(k,W,E,H),Ft&&St.render(E),Ee(m,E,H);N!==null&&C===0&&(Zt.updateMultisampleRenderTarget(N),Zt.updateRenderTargetMipmap(N)),E.isScene===!0&&E.onAfterRender(x,E,H),Bt.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],st===!0&&J.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function ue(E,H,Q,k){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)Q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||nt.intersectsSprite(E)){k&&at.setFromMatrixPosition(E.matrixWorld).applyMatrix4(I);let Ot=Z.update(E),jt=E.material;jt.visible&&m.push(E,Ot,jt,Q,at.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||nt.intersectsObject(E))){let Ot=Z.update(E),jt=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),at.copy(E.boundingSphere.center)):(Ot.boundingSphere===null&&Ot.computeBoundingSphere(),at.copy(Ot.boundingSphere.center)),at.applyMatrix4(E.matrixWorld).applyMatrix4(I)),Array.isArray(jt)){let Xt=Ot.groups;for(let le=0,oe=Xt.length;le<oe;le++){let ne=Xt[le],pe=jt[ne.materialIndex];pe&&pe.visible&&m.push(E,Ot,pe,Q,at.z,ne)}}else jt.visible&&m.push(E,Ot,jt,Q,at.z,null)}}let gt=E.children;for(let Ot=0,jt=gt.length;Ot<jt;Ot++)ue(gt[Ot],H,Q,k)}function Ee(E,H,Q,k){let W=E.opaque,gt=E.transmissive,Ot=E.transparent;p.setupLightsView(Q),st===!0&&J.setGlobalState(x.clippingPlanes,Q),k&&kt.viewport(D.copy(k)),W.length>0&&Wt(W,H,Q),gt.length>0&&Wt(gt,H,Q),Ot.length>0&&Wt(Ot,H,Q),kt.buffers.depth.setTest(!0),kt.buffers.depth.setMask(!0),kt.buffers.color.setMask(!0),kt.setPolygonOffset(!1)}function de(E,H,Q,k){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new Jn(1,1,{generateMipmaps:!0,type:Lt.has("EXT_color_buffer_half_float")||Lt.has("EXT_color_buffer_float")?Gr:fi,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ae.workingColorSpace}));let gt=p.state.transmissionRenderTarget[k.id],Ot=k.viewport||D;gt.setSize(Ot.z*x.transmissionResolutionScale,Ot.w*x.transmissionResolutionScale);let jt=x.getRenderTarget(),Xt=x.getActiveCubeFace(),le=x.getActiveMipmapLevel();x.setRenderTarget(gt),x.getClearColor(O),tt=x.getClearAlpha(),tt<1&&x.setClearColor(16777215,.5),x.clear(),Ft&&St.render(Q);let oe=x.toneMapping;x.toneMapping=$i;let ne=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),st===!0&&J.setGlobalState(x.clippingPlanes,k),Wt(E,Q,k),Zt.updateMultisampleRenderTarget(gt),Zt.updateRenderTargetMipmap(gt),Lt.has("WEBGL_multisampled_render_to_texture")===!1){let pe=!1;for(let Ne=0,$e=H.length;Ne<$e;Ne++){let Ge=H[Ne],we=Ge.object,ie=Ge.geometry,We=Ge.material,ye=Ge.group;if(We.side===Le&&we.layers.test(k.layers)){let Sn=We.side;We.side=vn,We.needsUpdate=!0,se(we,Q,k,ie,We,ye),We.side=Sn,We.needsUpdate=!0,pe=!0}}pe===!0&&(Zt.updateMultisampleRenderTarget(gt),Zt.updateRenderTargetMipmap(gt))}x.setRenderTarget(jt,Xt,le),x.setClearColor(O,tt),ne!==void 0&&(k.viewport=ne),x.toneMapping=oe}function Wt(E,H,Q){let k=H.isScene===!0?H.overrideMaterial:null;for(let W=0,gt=E.length;W<gt;W++){let Ot=E[W],jt=Ot.object,Xt=Ot.geometry,le=Ot.group,oe=Ot.material;oe.allowOverride===!0&&k!==null&&(oe=k),jt.layers.test(Q.layers)&&se(jt,H,Q,Xt,oe,le)}}function se(E,H,Q,k,W,gt){E.onBeforeRender(x,H,Q,k,W,gt),E.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(x,H,Q,k,E,gt),W.transparent===!0&&W.side===Le&&W.forceSinglePass===!1?(W.side=vn,W.needsUpdate=!0,x.renderBufferDirect(Q,H,k,W,E,gt),W.side=li,W.needsUpdate=!0,x.renderBufferDirect(Q,H,k,W,E,gt),W.side=Le):x.renderBufferDirect(Q,H,k,W,E,gt),E.onAfterRender(x,H,Q,k,W,gt)}function Ie(E,H,Q){H.isScene!==!0&&(H=dt);let k=zt.get(E),W=p.state.lights,gt=p.state.shadowsArray,Ot=W.state.version,jt=it.getParameters(E,W.state,gt,H,Q),Xt=it.getProgramCacheKey(jt),le=k.programs;k.environment=E.isMeshStandardMaterial?H.environment:null,k.fog=H.fog,k.envMap=(E.isMeshStandardMaterial?Me:be).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,le===void 0&&(E.addEventListener("dispose",A),le=new Map,k.programs=le);let oe=le.get(Xt);if(oe!==void 0){if(k.currentProgram===oe&&k.lightsStateVersion===Ot)return ee(E,jt),oe}else jt.uniforms=it.getUniforms(E),E.onBeforeCompile(jt,x),oe=it.acquireProgram(jt,Xt),le.set(Xt,oe),k.uniforms=jt.uniforms;let ne=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ne.clippingPlanes=J.uniform),ee(E,jt),k.needsLights=Fn(E),k.lightsStateVersion=Ot,k.needsLights&&(ne.ambientLightColor.value=W.state.ambient,ne.lightProbe.value=W.state.probe,ne.directionalLights.value=W.state.directional,ne.directionalLightShadows.value=W.state.directionalShadow,ne.spotLights.value=W.state.spot,ne.spotLightShadows.value=W.state.spotShadow,ne.rectAreaLights.value=W.state.rectArea,ne.ltc_1.value=W.state.rectAreaLTC1,ne.ltc_2.value=W.state.rectAreaLTC2,ne.pointLights.value=W.state.point,ne.pointLightShadows.value=W.state.pointShadow,ne.hemisphereLights.value=W.state.hemi,ne.directionalShadowMap.value=W.state.directionalShadowMap,ne.directionalShadowMatrix.value=W.state.directionalShadowMatrix,ne.spotShadowMap.value=W.state.spotShadowMap,ne.spotLightMatrix.value=W.state.spotLightMatrix,ne.spotLightMap.value=W.state.spotLightMap,ne.pointShadowMap.value=W.state.pointShadowMap,ne.pointShadowMatrix.value=W.state.pointShadowMatrix),k.currentProgram=oe,k.uniformsList=null,oe}function Fe(E){if(E.uniformsList===null){let H=E.currentProgram.getUniforms();E.uniformsList=Zr.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function ee(E,H){let Q=zt.get(E);Q.outputColorSpace=H.outputColorSpace,Q.batching=H.batching,Q.batchingColor=H.batchingColor,Q.instancing=H.instancing,Q.instancingColor=H.instancingColor,Q.instancingMorph=H.instancingMorph,Q.skinning=H.skinning,Q.morphTargets=H.morphTargets,Q.morphNormals=H.morphNormals,Q.morphColors=H.morphColors,Q.morphTargetsCount=H.morphTargetsCount,Q.numClippingPlanes=H.numClippingPlanes,Q.numIntersection=H.numClipIntersection,Q.vertexAlphas=H.vertexAlphas,Q.vertexTangents=H.vertexTangents,Q.toneMapping=H.toneMapping}function De(E,H,Q,k,W){H.isScene!==!0&&(H=dt),Zt.resetTextureUnits();let gt=H.fog,Ot=k.isMeshStandardMaterial?H.environment:null,jt=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:yn,Xt=(k.isMeshStandardMaterial?Me:be).get(k.envMap||Ot),le=k.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,oe=!!Q.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),ne=!!Q.morphAttributes.position,pe=!!Q.morphAttributes.normal,Ne=!!Q.morphAttributes.color,$e=$i;k.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&($e=x.toneMapping);let Ge=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,we=Ge!==void 0?Ge.length:0,ie=zt.get(k),We=p.state.lights;if(st===!0&&(U===!0||E!==M)){let lt=E===M&&k.id===b;J.setState(k,E,lt)}let ye=!1;k.version===ie.__version?(ie.needsLights&&ie.lightsStateVersion!==We.state.version||ie.outputColorSpace!==jt||W.isBatchedMesh&&ie.batching===!1||!W.isBatchedMesh&&ie.batching===!0||W.isBatchedMesh&&ie.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&ie.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&ie.instancing===!1||!W.isInstancedMesh&&ie.instancing===!0||W.isSkinnedMesh&&ie.skinning===!1||!W.isSkinnedMesh&&ie.skinning===!0||W.isInstancedMesh&&ie.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&ie.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&ie.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&ie.instancingMorph===!1&&W.morphTexture!==null||ie.envMap!==Xt||k.fog===!0&&ie.fog!==gt||ie.numClippingPlanes!==void 0&&(ie.numClippingPlanes!==J.numPlanes||ie.numIntersection!==J.numIntersection)||ie.vertexAlphas!==le||ie.vertexTangents!==oe||ie.morphTargets!==ne||ie.morphNormals!==pe||ie.morphColors!==Ne||ie.toneMapping!==$e||ie.morphTargetsCount!==we)&&(ye=!0):(ye=!0,ie.__version=k.version);let Sn=ie.currentProgram;ye===!0&&(Sn=Ie(k,H,W));let z=!1,Y=!1,_t=!1,ft=Sn.getUniforms(),At=ie.uniforms;if(kt.useProgram(Sn.program)&&(z=!0,Y=!0,_t=!0),k.id!==b&&(b=k.id,Y=!0),z||M!==E){kt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ft.setValue(P,"projectionMatrix",E.projectionMatrix),ft.setValue(P,"viewMatrix",E.matrixWorldInverse);let vt=ft.map.cameraPosition;vt!==void 0&&vt.setValue(P,V.setFromMatrixPosition(E.matrixWorld)),Ht.logarithmicDepthBuffer&&ft.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ft.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,Y=!0,_t=!0)}if(W.isSkinnedMesh){ft.setOptional(P,W,"bindMatrix"),ft.setOptional(P,W,"bindMatrixInverse");let lt=W.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),ft.setValue(P,"boneTexture",lt.boneTexture,Zt))}W.isBatchedMesh&&(ft.setOptional(P,W,"batchingTexture"),ft.setValue(P,"batchingTexture",W._matricesTexture,Zt),ft.setOptional(P,W,"batchingIdTexture"),ft.setValue(P,"batchingIdTexture",W._indirectTexture,Zt),ft.setOptional(P,W,"batchingColorTexture"),W._colorsTexture!==null&&ft.setValue(P,"batchingColorTexture",W._colorsTexture,Zt));let Ct=Q.morphAttributes;if((Ct.position!==void 0||Ct.normal!==void 0||Ct.color!==void 0)&&ht.update(W,Q,Sn),(Y||ie.receiveShadow!==W.receiveShadow)&&(ie.receiveShadow=W.receiveShadow,ft.setValue(P,"receiveShadow",W.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(At.envMap.value=Xt,At.flipEnvMap.value=Xt.isCubeTexture&&Xt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&H.environment!==null&&(At.envMapIntensity.value=H.environmentIntensity),Y&&(ft.setValue(P,"toneMappingExposure",x.toneMappingExposure),ie.needsLights&&rn(At,_t),gt&&k.fog===!0&&ut.refreshFogUniforms(At,gt),ut.refreshMaterialUniforms(At,k,q,pt,p.state.transmissionRenderTarget[E.id]),Zr.upload(P,Fe(ie),At,Zt)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Zr.upload(P,Fe(ie),At,Zt),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ft.setValue(P,"center",W.center),ft.setValue(P,"modelViewMatrix",W.modelViewMatrix),ft.setValue(P,"normalMatrix",W.normalMatrix),ft.setValue(P,"modelMatrix",W.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let lt=k.uniformsGroups;for(let vt=0,Nt=lt.length;vt<Nt;vt++){let ae=lt[vt];Yt.update(ae,Sn),Yt.bind(ae,Sn)}}return Sn}function rn(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function Fn(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(E,H,Q){let k=zt.get(E);k.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),zt.get(E.texture).__webglTexture=H,zt.get(E.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:Q,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,H){let Q=zt.get(E);Q.__webglFramebuffer=H,Q.__useDefaultFramebuffer=H===void 0};let hn=P.createFramebuffer();this.setRenderTarget=function(E,H=0,Q=0){N=E,T=H,C=Q;let k=!0,W=null,gt=!1,Ot=!1;if(E){let Xt=zt.get(E);if(Xt.__useDefaultFramebuffer!==void 0)kt.bindFramebuffer(P.FRAMEBUFFER,null),k=!1;else if(Xt.__webglFramebuffer===void 0)Zt.setupRenderTarget(E);else if(Xt.__hasExternalTextures)Zt.rebindTextures(E,zt.get(E.texture).__webglTexture,zt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let ne=E.depthTexture;if(Xt.__boundDepthTexture!==ne){if(ne!==null&&zt.has(ne)&&(E.width!==ne.image.width||E.height!==ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Zt.setupDepthRenderbuffer(E)}}let le=E.texture;(le.isData3DTexture||le.isDataArrayTexture||le.isCompressedArrayTexture)&&(Ot=!0);let oe=zt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(oe[H])?W=oe[H][Q]:W=oe[H],gt=!0):E.samples>0&&Zt.useMultisampledRTT(E)===!1?W=zt.get(E).__webglMultisampledFramebuffer:Array.isArray(oe)?W=oe[Q]:W=oe,D.copy(E.viewport),X.copy(E.scissor),j=E.scissorTest}else D.copy(qt).multiplyScalar(q).floor(),X.copy(G).multiplyScalar(q).floor(),j=$;if(Q!==0&&(W=hn),kt.bindFramebuffer(P.FRAMEBUFFER,W)&&k&&kt.drawBuffers(E,W),kt.viewport(D),kt.scissor(X),kt.setScissorTest(j),gt){let Xt=zt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+H,Xt.__webglTexture,Q)}else if(Ot){let Xt=H;for(let le=0;le<E.textures.length;le++){let oe=zt.get(E.textures[le]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+le,oe.__webglTexture,Q,Xt)}}else if(E!==null&&Q!==0){let Xt=zt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Xt.__webglTexture,Q)}b=-1},this.readRenderTargetPixels=function(E,H,Q,k,W,gt,Ot,jt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xt=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ot!==void 0&&(Xt=Xt[Ot]),Xt){kt.bindFramebuffer(P.FRAMEBUFFER,Xt);try{let le=E.textures[jt],oe=le.format,ne=le.type;if(!Ht.textureFormatReadable(oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-k&&Q>=0&&Q<=E.height-W&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+jt),P.readPixels(H,Q,k,W,Kt.convert(oe),Kt.convert(ne),gt))}finally{let le=N!==null?zt.get(N).__webglFramebuffer:null;kt.bindFramebuffer(P.FRAMEBUFFER,le)}}},this.readRenderTargetPixelsAsync=async function(E,H,Q,k,W,gt,Ot,jt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xt=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ot!==void 0&&(Xt=Xt[Ot]),Xt)if(H>=0&&H<=E.width-k&&Q>=0&&Q<=E.height-W){kt.bindFramebuffer(P.FRAMEBUFFER,Xt);let le=E.textures[jt],oe=le.format,ne=le.type;if(!Ht.textureFormatReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let pe=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,pe),P.bufferData(P.PIXEL_PACK_BUFFER,gt.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+jt),P.readPixels(H,Q,k,W,Kt.convert(oe),Kt.convert(ne),0);let Ne=N!==null?zt.get(N).__webglFramebuffer:null;kt.bindFramebuffer(P.FRAMEBUFFER,Ne);let $e=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Rp(P,$e,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,pe),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,gt),P.deleteBuffer(pe),P.deleteSync($e),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,H=null,Q=0){let k=Math.pow(2,-Q),W=Math.floor(E.image.width*k),gt=Math.floor(E.image.height*k),Ot=H!==null?H.x:0,jt=H!==null?H.y:0;Zt.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,Q,0,0,Ot,jt,W,gt),kt.unbindTexture()};let ii=P.createFramebuffer(),gn=P.createFramebuffer();this.copyTextureToTexture=function(E,H,Q=null,k=null,W=0,gt=null){gt===null&&(W!==0?(Rr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),gt=W,W=0):gt=0);let Ot,jt,Xt,le,oe,ne,pe,Ne,$e,Ge=E.isCompressedTexture?E.mipmaps[gt]:E.image;if(Q!==null)Ot=Q.max.x-Q.min.x,jt=Q.max.y-Q.min.y,Xt=Q.isBox3?Q.max.z-Q.min.z:1,le=Q.min.x,oe=Q.min.y,ne=Q.isBox3?Q.min.z:0;else{let Ct=Math.pow(2,-W);Ot=Math.floor(Ge.width*Ct),jt=Math.floor(Ge.height*Ct),E.isDataArrayTexture?Xt=Ge.depth:E.isData3DTexture?Xt=Math.floor(Ge.depth*Ct):Xt=1,le=0,oe=0,ne=0}k!==null?(pe=k.x,Ne=k.y,$e=k.z):(pe=0,Ne=0,$e=0);let we=Kt.convert(H.format),ie=Kt.convert(H.type),We;H.isData3DTexture?(Zt.setTexture3D(H,0),We=P.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(Zt.setTexture2DArray(H,0),We=P.TEXTURE_2D_ARRAY):(Zt.setTexture2D(H,0),We=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,H.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,H.unpackAlignment);let ye=P.getParameter(P.UNPACK_ROW_LENGTH),Sn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),z=P.getParameter(P.UNPACK_SKIP_PIXELS),Y=P.getParameter(P.UNPACK_SKIP_ROWS),_t=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ge.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ge.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,le),P.pixelStorei(P.UNPACK_SKIP_ROWS,oe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ne);let ft=E.isDataArrayTexture||E.isData3DTexture,At=H.isDataArrayTexture||H.isData3DTexture;if(E.isDepthTexture){let Ct=zt.get(E),lt=zt.get(H),vt=zt.get(Ct.__renderTarget),Nt=zt.get(lt.__renderTarget);kt.bindFramebuffer(P.READ_FRAMEBUFFER,vt.__webglFramebuffer),kt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer);for(let ae=0;ae<Xt;ae++)ft&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,zt.get(E).__webglTexture,W,ne+ae),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,zt.get(H).__webglTexture,gt,$e+ae)),P.blitFramebuffer(le,oe,Ot,jt,pe,Ne,Ot,jt,P.DEPTH_BUFFER_BIT,P.NEAREST);kt.bindFramebuffer(P.READ_FRAMEBUFFER,null),kt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(W!==0||E.isRenderTargetTexture||zt.has(E)){let Ct=zt.get(E),lt=zt.get(H);kt.bindFramebuffer(P.READ_FRAMEBUFFER,ii),kt.bindFramebuffer(P.DRAW_FRAMEBUFFER,gn);for(let vt=0;vt<Xt;vt++)ft?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ct.__webglTexture,W,ne+vt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ct.__webglTexture,W),At?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,lt.__webglTexture,gt,$e+vt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,lt.__webglTexture,gt),W!==0?P.blitFramebuffer(le,oe,Ot,jt,pe,Ne,Ot,jt,P.COLOR_BUFFER_BIT,P.NEAREST):At?P.copyTexSubImage3D(We,gt,pe,Ne,$e+vt,le,oe,Ot,jt):P.copyTexSubImage2D(We,gt,pe,Ne,le,oe,Ot,jt);kt.bindFramebuffer(P.READ_FRAMEBUFFER,null),kt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else At?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(We,gt,pe,Ne,$e,Ot,jt,Xt,we,ie,Ge.data):H.isCompressedArrayTexture?P.compressedTexSubImage3D(We,gt,pe,Ne,$e,Ot,jt,Xt,we,Ge.data):P.texSubImage3D(We,gt,pe,Ne,$e,Ot,jt,Xt,we,ie,Ge):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,gt,pe,Ne,Ot,jt,we,ie,Ge.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,gt,pe,Ne,Ge.width,Ge.height,we,Ge.data):P.texSubImage2D(P.TEXTURE_2D,gt,pe,Ne,Ot,jt,we,ie,Ge);P.pixelStorei(P.UNPACK_ROW_LENGTH,ye),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Sn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,z),P.pixelStorei(P.UNPACK_SKIP_ROWS,Y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,_t),gt===0&&H.generateMipmaps&&P.generateMipmap(We),kt.unbindTexture()},this.initRenderTarget=function(E){zt.get(E).__webglFramebuffer===void 0&&Zt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Zt.setTextureCube(E,0):E.isData3DTexture?Zt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Zt.setTexture2DArray(E,0):Zt.setTexture2D(E,0),kt.unbindTexture()},this.resetState=function(){T=0,C=0,N=null,kt.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ae._getUnpackColorSpace()}}});function GM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function WM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function XM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pm),this.state=Ve.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function qM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Un.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Ve.DOLLY;break;case Un.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ve.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ve.ROTATE}break;case Un.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ve.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ve.PAN}break;default:this.state=Ve.NONE}this.state!==Ve.NONE&&this.dispatchEvent(Bu)}function YM(i){switch(this.state){case Ve.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Ve.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Ve.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function $M(i){this.enabled===!1||this.enableZoom===!1||this.state!==Ve.NONE||(i.preventDefault(),this.dispatchEvent(Bu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(pm))}function ZM(i){this.enabled!==!1&&this._handleKeyDown(i)}function KM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Rn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Ve.TOUCH_ROTATE;break;case Rn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Ve.TOUCH_PAN;break;default:this.state=Ve.NONE}break;case 2:switch(this.touches.TWO){case Rn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Ve.TOUCH_DOLLY_PAN;break;case Rn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Ve.TOUCH_DOLLY_ROTATE;break;default:this.state=Ve.NONE}break;default:this.state=Ve.NONE}this.state!==Ve.NONE&&this.dispatchEvent(Bu)}function jM(i){switch(this._trackPointer(i),this.state){case Ve.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Ve.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Ve.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Ve.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Ve.NONE}}function JM(i){this.enabled!==!1&&i.preventDefault()}function QM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tS(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var fm,Bu,pm,Nl,dm,VM,pn,Vn,Ve,Ou,Ul,mm=qe(()=>{ei();fm={type:"change"},Bu={type:"start"},pm={type:"end"},Nl=new xi,dm=new Bn,VM=Math.cos(70*Ki.DEG2RAD),pn=new L,Vn=2*Math.PI,Ve={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ou=1e-6,Ul=class extends aa{constructor(t,e=null){super(t,e),this.state=Ve.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Un.ROTATE,MIDDLE:Un.DOLLY,RIGHT:Un.PAN},this.touches={ONE:Rn.ROTATE,TWO:Rn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Dn,this._lastTargetPosition=new L,this._quat=new Dn().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new zr,this._sphericalDelta=new zr,this._scale=1,this._panOffset=new L,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new L,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=WM.bind(this),this._onPointerDown=GM.bind(this),this._onPointerUp=XM.bind(this),this._onContextMenu=JM.bind(this),this._onMouseWheel=$M.bind(this),this._onKeyDown=ZM.bind(this),this._onTouchStart=KM.bind(this),this._onTouchMove=jM.bind(this),this._onMouseDown=qM.bind(this),this._onMouseMove=YM.bind(this),this._interceptControlDown=QM.bind(this),this._interceptControlUp=tS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(fm),this.update(),this.state=Ve.NONE}update(t=null){let e=this.object.position;pn.copy(e).sub(this.target),pn.applyQuaternion(this._quat),this._spherical.setFromVector3(pn),this.autoRotate&&this.state===Ve.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Vn:n>Math.PI&&(n-=Vn),s<-Math.PI?s+=Vn:s>Math.PI&&(s-=Vn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(pn.setFromSpherical(this._spherical),pn.applyQuaternion(this._quatInverse),e.copy(this.target).add(pn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=pn.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=pn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Nl.origin.copy(this.object.position),Nl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Nl.direction))<VM?this.object.lookAt(this.target):(dm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Nl.intersectPlane(dm,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ou||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ou||this._lastTargetPosition.distanceToSquared(this.target)>Ou?(this.dispatchEvent(fm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Vn/60*this.autoRotateSpeed*t:Vn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){pn.setFromMatrixColumn(e,0),pn.multiplyScalar(-t),this._panOffset.add(pn)}_panUp(t,e){this.screenSpacePanning===!0?pn.setFromMatrixColumn(e,1):(pn.setFromMatrixColumn(e,0),pn.crossVectors(this.object.up,pn)),pn.multiplyScalar(t),this._panOffset.add(pn)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;pn.copy(s).sub(this.target);let r=pn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Pt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}});var Fl,gm=qe(()=>{ei();mm();Fl=class extends Ul{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:Un.PAN,MIDDLE:Un.DOLLY,RIGHT:Un.ROTATE},this.touches={ONE:Rn.PAN,TWO:Rn.DOLLY_ROTATE}}}});function xm(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new He,l=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=_m(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][f]);let g=_m(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function _m(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ye(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let _=h.getComponent(f,g);a.setComponent(f+u,g,_)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function ku(i,t){if(t===uu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===qr||t===pa){let e=i.getIndex();if(e===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=e.count-2,s=[];if(t===qr)for(let o=1;o<=n;o++)s.push(e.getX(0)),s.push(e.getX(o)),s.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(e.getX(o)),s.push(e.getX(o+1)),s.push(e.getX(o+2))):(s.push(e.getX(o+2)),s.push(e.getX(o+1)),s.push(e.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}var zu=qe(()=>{ei()});function eS(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}function sS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new An({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:li})),i.DefaultMaterial}function Zs(i,t,e){for(let n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Ti(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function rS(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,h=t.length;l<h;l++){let u=t[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=t.length;l<h;l++){let u=t[l];if(n){let f=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function oS(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){let e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function aS(i){let t,e=i.extensions&&i.extensions[Se.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Gu(e.attributes):t=i.indices+":"+Gu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+Gu(i.targets[n]);return t}function Gu(i){let t="",e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function mf(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function cS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}function hS(i,t,e){let n=t.attributes,s=new Nn;if(n.POSITION!==void 0){let a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){let h=mf(Qr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=t.targets;if(r!==void 0){let a=new L,c=new L;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=e.json.accessors[u.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let _=mf(Qr[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new kn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Sm(i,t,e){let n=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=pf[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(t.indices!==void 0&&!i.index){let o=e.getDependency("accessor",t.indices).then(function(a){i.setIndex(a)});s.push(o)}return Ae.workingColorSpace!==yn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ae.workingColorSpace}" not supported.`),Ti(i,t),hS(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?rS(i,t.targets,e):i})}var Ol,Se,Wu,Xu,qu,Yu,$u,Zu,Ku,ju,Ju,Qu,tf,ef,nf,sf,rf,of,af,cf,bm,_a,ym,lf,hf,uf,ff,Bl,nS,df,ni,Qr,vm,Mm,Hu,pf,ms,iS,Vu,lS,gf,Em=qe(()=>{ei();zu();Ol=class extends bi{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Yu(e)}),this.register(function(e){return new $u(e)}),this.register(function(e){return new sf(e)}),this.register(function(e){return new rf(e)}),this.register(function(e){return new of(e)}),this.register(function(e){return new Ku(e)}),this.register(function(e){return new ju(e)}),this.register(function(e){return new Ju(e)}),this.register(function(e){return new Qu(e)}),this.register(function(e){return new qu(e)}),this.register(function(e){return new tf(e)}),this.register(function(e){return new Zu(e)}),this.register(function(e){return new nf(e)}),this.register(function(e){return new ef(e)}),this.register(function(e){return new Wu(e)}),this.register(function(e){return new af(e)}),this.register(function(e){return new cf(e)})}load(t,e,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=qi.extractUrlBase(t);o=qi.resolveURL(l,this.path)}else o=qi.extractUrlBase(t);this.manager.itemStart(t);let a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new kr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(h){e(h),r.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r,o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===bm){try{o[Se.KHR_BINARY_GLTF]=new lf(t)}catch(u){s&&s(u);return}r=JSON.parse(o[Se.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new gf(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case Se.KHR_MATERIALS_UNLIT:o[u]=new Xu;break;case Se.KHR_DRACO_MESH_COMPRESSION:o[u]=new hf(r,this.dracoLoader);break;case Se.KHR_TEXTURE_TRANSFORM:o[u]=new uf;break;case Se.KHR_MESH_QUANTIZATION:o[u]=new ff;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}};Se={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Wu=class{constructor(t){this.parser=t,this.name=Se.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){let r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){let e=this.parser,n="light:"+t,s=e.cache.get(n);if(s)return s;let r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t],l,h=new ce(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],yn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ds(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new zs(h),l.distance=u;break;case"spot":l=new sa(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ti(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){let e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}},Xu=class{constructor(){this.name=Se.KHR_MATERIALS_UNLIT}getMaterialType(){return Oe}extendParams(t,e,n){let s=[];t.color=new ce(1,1,1),t.opacity=1;let r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],yn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,Ke))}return Promise.all(s)}},qu=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}},Yu=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Pt(a,a)}return Promise.all(r)}},$u=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_DISPERSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Zu=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Ku=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_SHEEN}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];e.sheenColor=new ce(0,0,0),e.sheenRoughness=0,e.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],yn)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,Ke)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},ju=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Ju=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_VOLUME}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return e.attenuationColor=new ce().setRGB(a[0],a[1],a[2],yn),Promise.all(r)}},Qu=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_IOR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},tf=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_SPECULAR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return e.specularColor=new ce().setRGB(a[0],a[1],a[2],yn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,Ke)),Promise.all(r)}},ef=class{constructor(t){this.parser=t,this.name=Se.EXT_MATERIALS_BUMP}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}},nf=class{constructor(t){this.parser=t,this.name=Se.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:zn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},sf=class{constructor(t){this.parser=t,this.name=Se.KHR_TEXTURE_BASISU}loadTexture(t){let e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}},rf=class{constructor(t){this.parser=t,this.name=Se.EXT_TEXTURE_WEBP}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},of=class{constructor(t){this.parser=t,this.name=Se.EXT_TEXTURE_AVIF}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},af=class{constructor(t){this.name=Se.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){let e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},cf=class{constructor(t){this.name=Se.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){let e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=e.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==ni.TRIANGLES&&l.mode!==ni.TRIANGLE_STRIP&&l.mode!==ni.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let g of u){let _=new he,m=new L,p=new Dn,v=new L(1,1,1),y=new Ps(g.geometry,g.material,f);for(let x=0;x<f;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&v.fromBufferAttribute(c.SCALE,x),y.setMatrixAt(x,_.compose(m,p,v));for(let x in c)if(x==="_COLOR_0"){let w=c[x];y.instanceColor=new us(w.array,w.itemSize,w.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);ze.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},bm="glTF",_a=12,ym={JSON:1313821514,BIN:5130562},lf=class{constructor(t){this.name=Se.KHR_BINARY_GLTF,this.content=null,this.body=null;let e=new DataView(t,0,_a),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==bm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-_a,r=new DataView(t,_a),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===ym.JSON){let l=new Uint8Array(t,_a+o,a);this.content=n.decode(l)}else if(c===ym.BIN){let l=_a+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},hf=class{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Se.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){let n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=pf[h]||h.toLowerCase();a[u]=o[h]}for(let h in t.attributes){let u=pf[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[t.attributes[h]],d=Qr[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let g in d.attributes){let _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(d)},a,l,yn,f)})})}},uf=class{constructor(){this.name=Se.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}},ff=class{constructor(){this.name=Se.KHR_MESH_QUANTIZATION}},Bl=class extends Vi{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-e,u=(n-e)/h,f=u*u,d=f*u,g=t*l,_=g-l,m=-2*d+3*f,p=d-f,v=1-m,y=p-f+u;for(let x=0;x!==a;x++){let w=o[_+x+a],T=o[_+x+c]*h,C=o[g+x+a],N=o[g+x]*h;r[x]=v*w+y*T+m*C+p*N}return r}},nS=new Dn,df=class extends Bl{interpolate_(t,e,n,s){let r=super.interpolate_(t,e,n,s);return nS.fromArray(r).normalize().toArray(r),r}},ni={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Qr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},vm={9728:xn,9729:Ln,9984:Yc,9985:Hr,9986:Gs,9987:ui},Mm={33071:mi,33648:wr,10497:jn},Hu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},pf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ms={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},iS={CUBICSPLINE:void 0,LINEAR:Rs,STEP:As},Vu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};lS=new he,gf=class{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new eS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new na(this.options.manager):this.textureLoader=new ra(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new kr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Zs(r,a,s),Ti(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){let t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){let o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){let o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){let e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){let s=t(e[n]);if(s)return s}return null}_invokeAll(t){let e=Object.values(this.plugins);e.unshift(this);let n=[];for(let s=0;s<e.length;s++){let r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){let n=t+":"+e,s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){let n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){let e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Se.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(qi.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){let e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){let s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){let e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){let o=Hu[s.type],a=Qr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Ye(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Hu[s.type],l=Qr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,_,m;if(d&&d!==u){let p=Math.floor(f/d),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,y=e.cache.get(v);y||(_=new l(a,p*d,s.count*d/h),y=new Is(_,d/h),e.cache.add(v,y)),m=new hs(y,c,f%d/h,g)}else a===null?_=new l(s.count*c):_=new l(a,f,s.count*c),m=new Ye(_,c,g);if(s.sparse!==void 0){let p=Hu.SCALAR,v=Qr[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,w=new v(o[1],y,s.sparse.count*p),T=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new Ye(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,N=w.length;C<N;C++){let b=w[C];if(m.setX(b,T[C*c]),c>=2&&m.setY(b,T[C*c+1]),c>=3&&m.setZ(b,T[C*c+2]),c>=4&&m.setW(b,T[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){let e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){let s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=vm[f.magFilter]||Ln,h.minFilter=vm[f.minFilter]||ui,h.wrapS=Mm[f.wrapS]||jn,h.wrapT=Mm[f.wrapT]||jn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==xn&&h.minFilter!==Ln,s.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){let n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());let o=s.images[t],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let g=f;e.isImageBitmapLoader===!0&&(g=function(_){let m=new un(_);m.needsUpdate=!0,f(m)}),e.load(qi.resolveURL(u,r.path),g,void 0,d)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Ti(u,o),u.userData.mimeType=o.mimeType||cS(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Se.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Se.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[Se.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){let e=t.geometry,n=t.material,s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ur,Tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Bi,Tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return An}loadMaterial(t){let e=this,n=this.json,s=this.extensions,r=n.materials[t],o,a={},c=r.extensions||{},l=[];if(c[Se.KHR_MATERIALS_UNLIT]){let u=s[Se.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,e))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new ce(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],yn),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",u.baseColorTexture,Ke)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=Le);let h=r.alphaMode||Vu.OPAQUE;if(h===Vu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Vu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Oe&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Pt(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Oe&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Oe){let u=r.emissiveFactor;a.emissive=new ce().setRGB(u[0],u[1],u[2],yn)}return r.emissiveTexture!==void 0&&o!==Oe&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,Ke)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Ti(u,r),e.associations.set(u,{materials:t}),r.extensions&&Zs(s,u,r),u})}createUniqueName(t){let e=Xe.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){let e=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Se.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return Sm(c,a,e)})}let o=[];for(let a=0,c=t.length;a<c;a++){let l=t[a],h=aS(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[Se.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Sm(new He,l,e),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){let e=this,n=this.json,s=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?sS(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,g=h.length;d<g;d++){let _=h[d],m=o[d],p,v=l[d];if(m.mode===ni.TRIANGLES||m.mode===ni.TRIANGLE_STRIP||m.mode===ni.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Fo(_,v):new fe(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===ni.TRIANGLE_STRIP?p.geometry=ku(p.geometry,pa):m.mode===ni.TRIANGLE_FAN&&(p.geometry=ku(p.geometry,qr));else if(m.mode===ni.LINES)p=new Ls(_,v);else if(m.mode===ni.LINE_STRIP)p=new ki(_,v);else if(m.mode===ni.LINE_LOOP)p=new ko(_,v);else if(m.mode===ni.POINTS)p=new zo(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&oS(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),Ti(p,r),m.extensions&&Zs(s,p,m),e.assignFinalMaterial(p),u.push(p)}for(let d=0,g=u.length;d<g;d++)e.associations.set(u[d],{meshes:t,primitives:d});if(u.length===1)return r.extensions&&Zs(s,u[0],r),u[0];let f=new sn;r.extensions&&Zs(s,f,r),e.associations.set(f,{meshes:t});for(let d=0,g=u.length;d<g;d++)f.add(u[d]);return f})}loadCamera(t){let e,n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new tn(Ki.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new Xi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Ti(e,n),Promise.resolve(e)}loadSkin(t){let e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new he;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Bo(a,c)})}loadAnimation(t){let e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],g=s.samplers[d.sampler],_=d.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,x=f.length;y<x;y++){let w=f[y],T=d[y],C=g[y],N=_[y],b=m[y];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let M=n._createAnimationTracks(w,T,C,N,b);if(M)for(let D=0;D<M.length;D++)p.push(M[D])}let v=new ea(r,void 0,p);return Ti(v,s),v})}createNodeMesh(t){let e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){let e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,lS)});for(let d=0,g=u.length;d<g;d++)h.add(u[d]);return h})}_loadNodeShallow(t){let e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];let r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Dr:l.length>1?h=new sn:l.length===1?h=l[0]:h=new ze,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Ti(h,r),r.extensions&&Zs(n,h,r),r.matrix!==void 0){let u=new he;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){let e=this.extensions,n=this.json.scenes[t],s=this,r=new sn;n.name&&(r.name=s.createUniqueName(n.name)),Ti(r,n),n.extensions&&Zs(e,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof Tn||f instanceof un)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){let o=[],a=t.name?t.name:t.uuid,c=[];ms[r.path]===ms.weights?t.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(ms[r.path]){case ms.weights:l=vi;break;case ms.rotation:l=Mi;break;case ms.translation:case ms.scale:l=Si;break;default:switch(n.itemSize){case 1:l=vi;break;case 2:case 3:default:l=Si;break}break}let h=s.interpolation!==void 0?iS[s.interpolation]:Rs,u=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+ms[r.path],e.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){let n=mf(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){let s=this instanceof Mi?df:Bl;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var eo,to,wm,Tm,Am,Rm,kl,Cm=qe(()=>{ei();eo=class extends ze{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Pt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},to=new L,wm=new he,Tm=new he,Am=new L,Rm=new L,kl=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),wm.copy(_.matrixWorldInverse),Tm.multiplyMatrices(_.projectionMatrix,wm),h(g,g,_),d(g)},this.setSize=function(g,_){n=g,s=_,r=n/2,o=s/2,c.style.width=g+"px",c.style.height=_+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)l(g.children[_])}function h(g,_,m){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){to.setFromMatrixPosition(g.matrixWorld),to.applyMatrix4(Tm);let p=to.z>=-1&&to.z<=1&&g.layers.test(m.layers)===!0,v=g.element;v.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,_,m),v.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(to.x*r+r)+"px,"+(-to.y*o+o)+"px)",v.parentNode!==c&&c.appendChild(v),g.onAfterRender(e,_,m));let y={distanceToCameraSquared:u(m,g)};a.objects.set(g,y)}for(let p=0,v=g.children.length;p<v;p++)h(g.children[p],_,m)}function u(g,_){return Am.setFromMatrixPosition(g.matrixWorld),Rm.setFromMatrixPosition(_.matrixWorld),Am.distanceToSquared(Rm)}function f(g){let _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function d(g){let _=f(g).sort(function(p,v){if(p.renderOrder!==v.renderOrder)return v.renderOrder-p.renderOrder;let y=a.objects.get(p).distanceToCameraSquared,x=a.objects.get(v).distanceToCameraSquared;return y-x}),m=_.length;for(let p=0,v=_.length;p<v;p++)_[p].element.style.zIndex=m-p}}}});function Im(i,{width:t,height:e,fov:n=38,direction:s}={}){let r=t<e,o=s?.clone().normalize()||new L(r?-Math.sin(.5):0,Math.cos(.5),r?0:Math.sin(.5)),a=new L().crossVectors(new L(0,1,0),o).normalize(),c=new L().crossVectors(o,a).normalize(),l=i.getCenter(new L),h=Math.tan(Ki.degToRad(n/2)),u=h*t/e,f=10;for(let d of[i.min.x,i.max.x])for(let g of[i.min.y,i.max.y])for(let _ of[i.min.z,i.max.z]){let m=new L(d,g,_).sub(l),p=m.dot(o);f=Math.max(f,p+(Math.abs(m.dot(a))+2)/u*1.12,p+(Math.abs(m.dot(c))+2)/h*1.12)}return{target:l,position:l.clone().addScaledVector(o,f),distance:f}}var Pm=qe(()=>{ei()});var Lm={};Ag(Lm,{RoomEnvironment:()=>_f});function no(i){return new Hi({color:0,emissive:16777215,emissiveIntensity:i})}var _f,Dm=qe(()=>{ei();_f=class extends hi{constructor(){super();let t=new ls;t.deleteAttribute("uv");let e=new An({side:vn}),n=new An,s=new zs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new fe(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Ps(t,n,6),a=new ze;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new fe(t,no(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new fe(t,no(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new fe(t,no(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new fe(t,no(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new fe(t,no(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let d=new fe(t,no(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}}});function Ai(i){let t=i>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function ji(i,t){let e=document.createElement("canvas");e.width=e.height=i;let n=e.getContext("2d");t(n,i);let s=new zi(e);return s.wrapS=s.wrapT=jn,s.colorSpace=Ke,s}function xf(i,t,e,n,s,r,o){i.fillStyle=Mn(n),i.fillRect(0,0,t,t);for(let a=0;a<s;a++){let c=o[Math.floor(e()*o.length)];i.fillStyle=Mn(c[0],c[1]);let l=r[0]+e()*(r[1]-r[0]);i.beginPath(),i.arc(e()*t,e()*t,l,0,Math.PI*2),i.fill()}}function fS(i,t,e,n,s){let r=(o,a,c)=>Math.abs(i-o)<4&&Math.abs(t-a)<4&&Math.abs(e-c)<4;return s==="C"?r(255,255,255)?"light":r(244,244,238)?"ceiling":"plain":r(216,210,198)||r(203,200,192)?n?"floor":"plain":r(168,171,168)?"inlay":r(236,228,205)?"wall":r(62,56,50)?"base":r(152,192,150)?"door":r(105,112,112)||r(170,174,178)?"metal":r(150,96,58)||r(150,110,80)?"wood":r(205,200,190)||r(244,244,238)?"stone":r(40,48,52)?"dark":"plain"}function dS(i){var s;if(yf)return yf;let t=Math.min(4,i.capabilities.getMaxAnisotropy()),e={},n={};for(let[r,o]of Object.entries(Nm)){if(o.emissive){n[r]=new An({color:16777215,emissive:16776176,emissiveIntensity:.9,side:Le});continue}let c=(e[s=o.tex]||(e[s]=uS[o.tex]())).clone();c.needsUpdate=!0,o.fit||c.repeat.set(1/o.m,1/o.m),c.anisotropy=t,n[r]=new An({vertexColors:!o.fit,map:c,roughness:o.rough,metalness:o.metal||0,side:Le})}return yf=n,n}function Um(i){return Promise.resolve().then(()=>(Dm(),Lm)).then(({RoomEnvironment:t})=>{let e=new Kr(i),n=e.fromScene(new t,.04).texture;return e.dispose(),n})}function vf(i){let t=i.geometry.index?i.geometry.toNonIndexed():i.geometry;t.computeVertexNormals(),t!==i.geometry&&i.geometry.dispose(),i.geometry=t}function mS(i,t,e){let n=pS[t];if(!n)return i;let s=i.clone();return s.color.setHex(n.color),s.vertexColors=!1,s.roughness=n.roughness,t==="wall"&&(s.onBeforeCompile=r=>{r.uniforms.cutawayFloorHeight={value:e},r.vertexShader=`varying float cutawayHeight;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
cutawayHeight = position.y;`),r.fragmentShader=`varying float cutawayHeight;
uniform float cutawayFloorHeight;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float wallBase = smoothstep(0.05, 0.95, cutawayHeight - cutawayFloorHeight);
         diffuseColor.rgb *= mix(0.80, 1.0, wallBase);`)},s.customProgramCacheKey=()=>"mirae-cutaway-wall-contact"),s}function Fm(){return new An({color:13624302,roughness:.05,metalness:.1,transparent:!0,opacity:.32,side:Le,depthWrite:!1,envMapIntensity:1.4})}function Om(i,t,e={},n={}){let s=n.elevDoors||[],r=dS(t),o=i.geometry.index?i.geometry.toNonIndexed():i.geometry,a=o.getAttribute("position"),c=o.getAttribute("color"),l=a.count/3,h=i.name[0],u=Object.keys(Nm),f=new Uint8Array(l),d=new L,g=new L,_=new L,m=new L,p=new L,v=u.map(()=>[]);for(let O=0;O<l;O++){d.fromBufferAttribute(a,3*O),g.fromBufferAttribute(a,3*O+1),_.fromBufferAttribute(a,3*O+2),m.subVectors(_,g).cross(p.subVectors(g,d)).normalize();let tt=Math.abs(m.y)>.7,B=Math.round(c.getX(3*O)*255),pt=Math.round(c.getY(3*O)*255),q=Math.round(c.getZ(3*O)*255),Rt=fS(B,pt,q,tt,h);if(Rt==="wood"&&!tt&&s.length&&B===150&&pt===110){let qt=(d.x+g.x+_.x)/3,G=-(d.z+g.z+_.z)/3;s.some($=>Math.hypot($[0]-qt,$[1]-G)<1.6)&&(Rt="elevDoor")}let Ut=u.indexOf(Rt);f[O]=Ut,v[Ut].push(O)}let y=new Float32Array(a.count*3),x=new Float32Array(a.count*3),w=new Float32Array(a.count*3),T=new Float32Array(a.count*2),C=new Map,N=u.indexOf("elevDoor");for(let O of v[N]||[]){d.fromBufferAttribute(a,3*O);let tt=d.x,B=-d.z,pt=s.reduce((q,Rt,Ut)=>Math.hypot(Rt[0]-tt,Rt[1]-B)<Math.hypot(s[q][0]-tt,s[q][1]-B)?Ut:q,0);C.set(O,pt)}let b=s.map(()=>({x0:1/0,x1:-1/0,z0:1/0,z1:-1/0,y0:1/0,y1:-1/0}));for(let[O,tt]of C){let B=b[tt];for(let pt=0;pt<3;pt++)d.fromBufferAttribute(a,3*O+pt),B.x0=Math.min(B.x0,d.x),B.x1=Math.max(B.x1,d.x),B.z0=Math.min(B.z0,d.z),B.z1=Math.max(B.z1,d.z),B.y0=Math.min(B.y0,d.y),B.y1=Math.max(B.y1,d.y)}for(let O of b){let tt=O.x1-O.x0>=O.z1-O.z0;O.u0=tt?O.x0:O.z0,O.u1=tt?O.x1:O.z1,O.n=tt?"z":"x"}let M=new He,D=[],X=[],j=0;for(let O=0;O<u.length;O++){if(!v[O].length)continue;let tt=j;for(let q of v[O]){d.fromBufferAttribute(a,3*q),g.fromBufferAttribute(a,3*q+1),_.fromBufferAttribute(a,3*q+2),m.subVectors(_,g).cross(p.subVectors(g,d)).normalize();let Rt=Math.abs(m.x),Ut=Math.abs(m.y),qt=Math.abs(m.z);for(let G=0;G<3;G++){let $=3*q+G,nt=a.getX($),st=a.getY($),U=a.getZ($);if(y.set([nt,st,U],j*3),x.set([c.getX($),c.getY($),c.getZ($)],j*3),O===N?w.set([-m.x,-m.y,-m.z],j*3):w.set([m.x,m.y,m.z],j*3),O===N&&C.has(q)){let I=b[C.get(q)],V=I.n==="x"?U:nt;T.set([(V-I.u0)/Math.max(1e-6,I.u1-I.u0),(st-I.y0)/Math.max(1e-6,I.y1-I.y0)],j*2)}else Ut>=Rt&&Ut>=qt?T.set([nt,-U],j*2):Rt>=qt?T.set([-U,st],j*2):T.set([nt,st],j*2);j++}}M.addGroup(tt,j-tt,D.length);let B=r[u[O]],pt=Object.keys(e).length?Object.assign(B.clone(),e):B;D.push(pt),X.push(Number.isFinite(n.floorHeight)?mS(pt,u[O],n.floorHeight):pt)}return M.setAttribute("position",new Ye(y,3)),M.setAttribute("color",new Ye(x,3)),M.setAttribute("normal",new Ye(w,3)),M.setAttribute("uv",new Ye(T,2)),M.computeBoundingSphere(),M.computeBoundingBox(),i.geometry.dispose(),o!==i.geometry&&o.dispose(),i.geometry=M,i.material=D,{firstPerson:D,cutaway:X}}var Mn,uS,Nm,yf,Ks,pS,Bm=qe(()=>{ei();Mn=(i,t=1)=>`rgba(${i},${i},${i},${t})`;uS={floor:(i=512)=>ji(i,t=>{let e=Ai(11);xf(t,i,e,236,5200,[.5,1.6],[[150,.55],[120,.45],[255,.7],[196,.6],[170,.5]]);let n=i/2;for(let s=0;s<2;s++)for(let r=0;r<2;r++){let o=.92+e()*.08;t.fillStyle=Mn(Math.round(255*o),.18),t.fillRect(s*n,r*n,n,n)}t.fillStyle=Mn(150,.9);for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),inlay:(i=256)=>ji(i,t=>{let e=Ai(23);xf(t,i,e,205,2600,[.5,1.4],[[90,.6],[255,.5],[140,.5]])}),wall:(i=256)=>ji(i,t=>{let e=Ai(5);t.fillStyle=Mn(248),t.fillRect(0,0,i,i);for(let n=0;n<160;n++)t.fillStyle=Mn(e()<.5?232:255,.08),t.beginPath(),t.ellipse(e()*i,e()*i,6+e()*26,4+e()*14,e()*3,0,Math.PI*2),t.fill()}),ceiling:(i=256)=>ji(i,t=>{let e=Ai(7);t.fillStyle=Mn(250),t.fillRect(0,0,i,i),t.fillStyle=Mn(200,.6);for(let s=0;s<1400;s++)t.fillRect(Math.floor(e()*i),Math.floor(e()*i),1,1);t.fillStyle=Mn(190);let n=i/2;for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),door:(i=256)=>ji(i,t=>{let e=Ai(13);t.fillStyle=Mn(246),t.fillRect(0,0,i,i);for(let n=0;n<90;n++)t.fillStyle=Mn(e()<.5?228:255,.25),t.fillRect(e()*i,0,1+e()*2,i)}),metal:(i=128)=>ji(i,t=>{let e=Ai(17);t.fillStyle=Mn(236),t.fillRect(0,0,i,i);for(let n=0;n<120;n++)t.fillStyle=Mn(e()<.5?205:255,.35),t.fillRect(0,e()*i,i,1)}),wood:(i=256)=>ji(i,t=>{let e=Ai(19);t.fillStyle=Mn(232),t.fillRect(0,0,i,i);for(let n=0;n<70;n++){t.strokeStyle=Mn(e()<.6?190:255,.35),t.lineWidth=1+e()*2,t.beginPath();let s=e()*i;t.moveTo(0,s);for(let r=0;r<=i;r+=16)t.lineTo(r,s+Math.sin(r/40+n)*3);t.stroke()}}),stone:(i=256)=>ji(i,t=>{let e=Ai(29);xf(t,i,e,240,2600,[.5,1.5],[[160,.5],[120,.4],[255,.6]])}),elevDoor:()=>{let i=document.createElement("canvas");i.width=256,i.height=512;let t=i.getContext("2d"),e=Ai(41),n=t.createLinearGradient(0,0,256,0);n.addColorStop(0,"#d2b06a"),n.addColorStop(.25,"#f0d699"),n.addColorStop(.5,"#e1c07c"),n.addColorStop(.75,"#f6dea4"),n.addColorStop(1,"#d2b06a"),t.fillStyle=n,t.fillRect(0,0,256,512);for(let r=0;r<260;r++)t.fillStyle=e()<.5?"rgba(255,240,200,0.10)":"rgba(90,60,20,0.08)",t.fillRect(e()*256,0,1,512);t.fillStyle="rgba(60,40,15,0.55)",t.fillRect(0,0,3,512),t.fillRect(253,0,3,512),t.fillStyle="#2a1d0c",t.fillRect(126,0,4,512),t.fillStyle="rgba(255,236,190,0.55)",t.fillRect(123,0,2,512),t.fillRect(131,0,2,512);let s=new zi(i);return s.colorSpace=Ke,s},plain:(i=128)=>ji(i,t=>{let e=Ai(31);t.fillStyle=Mn(246),t.fillRect(0,0,i,i);for(let n=0;n<500;n++)t.fillStyle=Mn(e()<.5?230:255,.3),t.fillRect(e()*i,e()*i,1,1)})},Nm={floor:{tex:"floor",m:1.2,rough:.42},inlay:{tex:"inlay",m:.8,rough:.36},wall:{tex:"wall",m:2.4,rough:.82},ceiling:{tex:"ceiling",m:1.2,rough:.92},base:{tex:"plain",m:1,rough:.45},door:{tex:"door",m:1,rough:.5},metal:{tex:"metal",m:.6,rough:.38,metal:.55},wood:{tex:"wood",m:.8,rough:.55},stone:{tex:"stone",m:1.2,rough:.42},dark:{tex:"plain",m:1,rough:.15,metal:.2},light:{emissive:!0},elevDoor:{tex:"elevDoor",fit:!0,rough:.3,metal:.35},plain:{tex:"plain",m:1.5,rough:.7}};yf=null;Ks={hemi:1.15,sun:.55,env:.4,exposure:1.1,mapExposure:1.4},pS={floor:{color:15195594,vertexColors:!1,roughness:.76},wall:{color:16117991,vertexColors:!1,roughness:.88},stone:{color:14342095,vertexColors:!1,roughness:.78},wood:{color:12819056,vertexColors:!1,roughness:.68},door:{color:10991779,vertexColors:!1,roughness:.7}}});function km(i,t,{onPick:e}={}){let{M:n,FL:s}=t,r=Math.min(devicePixelRatio,2),o=Math.min(r,1.25),a=new jr({antialias:devicePixelRatio<1.5,alpha:!1,powerPreference:"high-performance"});a.setPixelRatio(r),a.shadowMap.enabled=!0,a.shadowMap.type=ca,a.shadowMap.autoUpdate=!1;let c=r,l=-1e9;function h(A){A!==c&&(c=A,a.setPixelRatio(A),a.setSize(i.clientWidth,i.clientHeight,!1))}a.toneMapping=Wc,a.toneMappingExposure=Ks.mapExposure,i.appendChild(a.domElement);let u=new kl;Object.assign(u.domElement.style,{position:"absolute",inset:"0",pointerEvents:"none"}),i.appendChild(u.domElement);let f=new hi;f.background=new ce(15526888);let d=new ks(16777215,15130834,.82);f.add(d);let g=new ds(16777215,.88);g.position.set(-45,85,50),f.add(g);let _=new ds(16774112,.45);_.position.set(40,45,-30),f.add(_),g.castShadow=!0,g.shadow.mapSize.set(2048,2048),Object.assign(g.shadow.camera,{left:-82,right:82,top:84,bottom:-84,near:1,far:195}),g.shadow.camera.updateProjectionMatrix(),g.shadow.normalBias=.09,g.shadow.bias=-2e-4;let m=new tn(38,1,.5,2e3),p=new tn(70,1,.08,600);p.rotation.order="YXZ";let v=new Fl(m,a.domElement);v.enableDamping=!0,v.dampingFactor=.12,v.screenSpacePanning=!1,v.maxPolarAngle=1.1,v.minDistance=10,v.maxDistance=170,v.touches={ONE:Rn.PAN,TWO:Rn.DOLLY_ROTATE};let y=1,x=!1,w=!0,T={},C=new Map,N=new Map,b=new Map,M=!1,D=null,X=(Math.min(...t.floors)+Math.max(...t.floors))/2,j=[],O=new sn;f.add(O);let tt=new sn;f.add(tt);let B=Kt();B.visible=!1,f.add(B);function pt(){let A=i.clientWidth,K=i.clientHeight;a.setSize(A,K),u.setSize(A,K);for(let et of[m,p])et.aspect=A/K,et.updateProjectionMatrix();w=!0}new ResizeObserver(pt).observe(i),pt(),v.addEventListener("change",()=>w=!0);async function q(A,K){let et=await fetch(A);if(!et.ok)throw new Error(`\uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694 (${et.status})`);let ct=+et.headers.get("content-length")||0,ot;if(et.body&&ct){let Tt=et.body.getReader(),me=[],te=0;for(;;){let{done:Ee,value:de}=await Tt.read();if(Ee)break;me.push(de),te+=de.length,K?.(te/ct)}ot=new Uint8Array(te);let ue=0;for(let Ee of me)ot.set(Ee,ue),ue+=Ee.length;ot=ot.buffer}else ot=await et.arrayBuffer();let Et=await new Promise((Tt,me)=>new Ol().parse(ot,"",Tt,me));try{f.environment=await Um(a),f.environmentIntensity=Ks.env}catch{}Et.scene.traverse(Tt=>{if(Tt.isMesh){if(Tt.name[0]==="G")vf(Tt),Tt.material=Fm();else if(Tt.name[0]==="X")vf(Tt),Tt.material=new An({vertexColors:!0,roughness:.9,side:Le});else{let me=+Tt.name.slice(1),te=Om(Tt,a,Tt.name[0]==="D"?{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}:{},{elevDoors:Rt(me),floorHeight:n.floors.find(ue=>ue.n===me)?.z});te&&(N.set(Tt,te),Tt.material=te.cutaway)}Tt.castShadow=/^[FD]/.test(Tt.name),Tt.receiveShadow=Tt.castShadow,T[Tt.name]=Tt,b.set(Tt,Tt.position.y)}}),f.add(Et.scene),Et.scene.updateMatrixWorld(!0);for(let Tt of n.floors){let me=new Nn;for(let[te,ue]of Object.entries(T))te[0]!=="C"&&te[0]!=="X"&&+te.slice(1)===Tt.n&&me.expandByObject(ue);me.isEmpty()||C.set(Tt.n,me)}qt(),Ut(),P(y,!0)}function Rt(A){return(n.floors.find(et=>et.n===A)?.doors||[]).filter(et=>et.cat==="elev"||/^EV/.test(et.id)).map(et=>et.p)}function Ut(){for(let A of t.destinations){let K=A.center||A.doors[0],et=document.createElement("div"),ct=A.cat==="toilet"?"WC":A.cat==="elev"?"EV":A.numbered?A.id:A.title;if(et.className="room-label"+(A.numbered?"":" icon-only"),A.cat==="toilet"){et.classList.add("restroom-label"),et.dataset.gender=/女|여/.test(A.title)?"\uC5EC":/男|남/.test(A.title)?"\uB0A8":"",et.setAttribute("role","img"),et.setAttribute("aria-label",`${A.f===0?"\uC9C0\uD558 1":A.f}\uCE35 ${A.title}`),et.title=`${A.title}${A.name?" \xB7 "+A.name:""}`;let Et=document.createElement("img");Et.src="ui/restroom.svg",Et.alt="",et.append(Et)}else et.textContent=ct;let ot=new eo(et);ot.position.copy(Gn(K[0],K[1],s(A.f).z+.6)),ot.userData={d:A},ot.visible=!1,f.add(ot),j.push(ot)}}function qt(){let A=new Oe({color:1475768,transparent:!0,opacity:.3,depthTest:!1,depthWrite:!1,side:Le,toneMapped:!1}),K=new Oe({color:1471913,depthTest:!1,depthWrite:!1,side:Le,toneMapped:!1});for(let et of n.floors){let ct=new sn;ct.userData.f=et.n;for(let ot of et.rooms.filter(Et=>Et.cat==="toilet")){let Et=new fs(ot.poly.map(([te,ue])=>new Pt(te,ue))),Tt=new fe(new Fs(Et),A);Tt.rotation.x=-Math.PI/2,Tt.position.y=et.z+.1,Tt.renderOrder=1,ct.add(Tt);let me=new fe(zt(ot.poly.map(([te,ue])=>[te,ue,et.z+.11]),.12),K);me.renderOrder=2,ct.add(me)}tt.add(ct)}}let G=null;function $(){let A=m.position.distanceTo(v.target),K=Math.max(130,Math.min(200,130*1440/i.clientWidth));for(let et of j){let ct=et.userData.d,ot=ct.key===G;if(et.element.classList.toggle("sel",ot),x){let Et=ct.center||ct.doors[0];et.visible=ct.f===Yt.f&&Math.hypot(Et[0]-Yt.x,Et[1]-Yt.y)<12}else et.visible=M?ot:ct.f===y&&(ot||ct.cat==="toilet"||A<(ct.numbered?K:200))}}function nt(A){return(A-X)*22-s(A).z}function st(){var K,et;g.castShadow=!x&&!M,a.shadowMap.needsUpdate=!0,tt.visible=!x&&!M,B.visible=!x&&!M&&B.userData.floor===y;for(let ct of j)(K=ct.userData).baseY??(K.baseY=ct.position.y),ct.position.y=ct.userData.baseY+(M?nt(ct.userData.d.f):0);for(let ct of tt.children)ct.visible=ct.userData.f===y;for(let ct in T){let ot=ct[0],Et=+ct.slice(1);ot==="X"?T[ct].visible=x:x?T[ct].visible=Math.abs(Et-Yt.f)<=1:T[ct].visible=ot!=="C"&&(M||Et===y);let Tt=T[ct];Tt.position.y=b.get(Tt)+(M&&Number.isFinite(Et)&&t.floors.includes(Et)?nt(Et):0)}let A=x?"walk":"map";for(let ct of O.children){let{f:ot,mode:Et,singleFloor:Tt,overviewLabel:me}=ct.userData;(et=ct.userData).baseY??(et.baseY=ct.position.y),ct.position.y=ct.userData.baseY+(M&&t.floors.includes(ot)?nt(ot):0),M?ct.visible=me||Et==="overview"||Et==="map"&&!Tt:ct.visible=(!Et||Et===A)&&(x?!ct.isCSS2DObject||I(ct):ot==null||ot===y)}U(),w=!0}function U(){O.traverse(A=>{if(A.material)for(let K of Array.isArray(A.material)?A.material:[A.material])K.userData.depth0===void 0&&(K.userData.depth0=K.depthTest),K.depthTest=x||K.userData.depth0})}function I(A){if(A.userData.f!==Yt.f)return!1;let K=A.position.x,et=-A.position.z;return V(Yt.f,Yt.x,Yt.y,K,et)}function V(A,K,et,ct,ot){let Et=Math.hypot(ct-K,ot-et);if(Et>25)return!1;let Tt=Math.max(1,Math.ceil(Et/.25)),me=0;for(let te=1;te<Tt&&!(Et*(1-te/Tt)<1);te++){let ue=te/Tt;if(t.walk(A,K+(ct-K)*ue,et+(ot-et)*ue))me=0;else if(me+=Et/Tt,me>.8)return!1}return!0}let at=null;function dt(A,K,et=550){at={t0:performance.now(),dur:et,cam0:m.position.clone(),tgt0:v.target.clone(),cam1:A,tgt1:K},w=!0}v.addEventListener("start",()=>at=null);function Ft(A){let K=Gn(0,-1,0),et=i.clientWidth<i.clientHeight?new L(-1,.95,.4):new L(-.65,.8,1),ct=Math.max(195,48/Math.tan(Math.atan(Math.tan(Ki.degToRad(m.fov/2))*m.aspect)));v.maxDistance=Math.max(v.maxDistance,ct*1.2),dt(K.clone().add(et.setLength(ct)),K,A?1:480)}function Qt(A){if(A===M)return;M=A;let K=matchMedia("(prefers-reduced-motion: reduce)").matches;A?(D={position:m.position.clone(),target:v.target.clone(),maxDistance:v.maxDistance,mouseButtons:v.mouseButtons,touches:v.touches},v.mouseButtons={...v.mouseButtons,LEFT:Un.ROTATE,RIGHT:Un.PAN},v.touches={ONE:Rn.ROTATE,TWO:Rn.DOLLY_PAN},Ft(K)):(at=null,v.maxDistance=D.maxDistance,v.mouseButtons=D.mouseButtons,v.touches=D.touches,m.position.copy(D.position),v.target.copy(D.target),v.update()),st(),$()}function P(A,K=!1,et=!1){let ct=s(y).z;y=A;let ot=s(A).z-ct;if(et&&ot&&!K){let Et=new L(0,ot,0);dt((at?at.cam1:m.position).clone().add(Et),(at?at.tgt1:v.target).clone().add(Et),520)}else m.position.y+=ot,v.target.y+=ot,at&&(at.cam1.y+=ot,at.tgt1.y+=ot);K&&$t({animate:et}),st(),$()}function $t({resetOrientation:A=!0,animate:K=!1}={}){if(M)return Ft(!K||matchMedia("(prefers-reduced-motion: reduce)").matches);let et=C.get(y);if(!et)return;let ct=A?void 0:at?at.cam1.clone().sub(at.tgt1):m.position.clone().sub(v.target),ot=Im(et,{width:i.clientWidth,height:i.clientHeight,fov:m.fov,direction:ct}),Et=v.enableDamping;v.enableDamping=!1,v.update(),v.enableDamping=Et,at=null,v.maxDistance=Math.max(170,ot.distance*1.4),K?dt(ot.position,ot.target):(m.position.copy(ot.position),v.target.copy(ot.target),v.update()),w=!0}function Lt(A,K,et,ct,ot,Et=0,Tt=70){ot!==y&&P(ot);let me=s(ot).z,te=i.clientHeight,ue=Math.max(.3,(te-Et-Tt)/te),Ee=m.fov*Math.PI/360,de=Math.atan(Math.tan(Ee)*m.aspect),Wt=m.position.clone().sub(v.target).normalize(),se=new L(-Wt.x,0,-Wt.z).normalize(),Ie=new L(-se.z,0,se.x),Fe=0,ee=0;for(let[ii,gn]of[[A,K],[A,ct],[et,K],[et,ct]]){let E=Gn(ii,gn,0).sub(Gn((A+et)/2,(K+ct)/2,0));Fe=Math.max(Fe,Math.abs(E.dot(Ie))),ee=Math.max(ee,Math.abs(E.dot(se)))}Fe+=4,ee+=4;let De=Math.min(v.maxDistance,Math.max(18,Math.max(ee/Math.tan(Ee*ue)/Math.max(.5,-Wt.y),Fe/Math.tan(de)))),rn=Gn((A+et)/2,(K+ct)/2,me),Fn=(Et-Tt)/te*De*Math.tan(Ee)/Math.max(.5,-Wt.y),hn=rn.clone().addScaledVector(se,-Fn);dt(hn.clone().addScaledVector(Wt,De),hn)}function Ht(A,K,et,ct=45){et!==y&&P(et);let ot=s(et).z,Et=m.position.clone().sub(v.target).setLength(ct),Tt=Gn(A,K,ot);dt(Tt.clone().add(Et),Tt)}let kt=null,ve=new Set;a.domElement.addEventListener("pointerdown",A=>{ve.add(A.pointerId),kt=ve.size===1&&A.button===0?{id:A.pointerId,x:A.clientX,y:A.clientY,time:performance.now()}:null}),a.domElement.addEventListener("pointermove",A=>{kt?.id===A.pointerId&&Math.hypot(A.clientX-kt.x,A.clientY-kt.y)>8&&(kt=null)}),a.domElement.addEventListener("pointercancel",A=>{ve.delete(A.pointerId),kt=null}),a.domElement.addEventListener("pointerup",A=>{ve.delete(A.pointerId);let K=kt;if(kt=null,!K||K.id!==A.pointerId||ve.size||x||M||Math.hypot(A.clientX-K.x,A.clientY-K.y)>8||performance.now()-K.time>450)return;let ct=a.domElement.getBoundingClientRect(),ot=new oa;ot.setFromCamera(new Pt((A.clientX-ct.left)/ct.width*2-1,-((A.clientY-ct.top)/ct.height)*2+1),m);let Et=ot.ray.intersectPlane(new Bn(new L(0,1,0),-s(y).z),new L);Et&&e?.(Et.x,-Et.z,y)});function zt(A,K){let et=[];for(let ot=1;ot<A.length;ot++){let Et=A[ot-1],Tt=A[ot],me=Tt[0]-Et[0],te=Tt[1]-Et[1],ue=Math.hypot(me,te);if(ue<.01)continue;let Ee=-te/ue*K*.5,de=me/ue*K*.5,Wt=new He;Wt.setAttribute("position",new Ce([Et[0]+Ee,Et[2],-(Et[1]+de),Et[0]-Ee,Et[2],-(Et[1]-de),Tt[0]+Ee,Tt[2],-(Tt[1]+de),Tt[0]-Ee,Tt[2],-(Tt[1]-de)],3)),Wt.setIndex([0,1,2,2,1,3]),et.push(Wt)}for(let ot of A){let Et=new yi(K*.5,14);Et.rotateX(-Math.PI/2),Et.translate(ot[0],ot[2],-ot[1]),et.push(Et)}let ct=et.map(ot=>ot.index?ot.toNonIndexed():ot);return ct.forEach(ot=>{for(let Et of Object.keys(ot.attributes))Et!=="position"&&ot.deleteAttribute(Et)}),xm(ct)}let Zt=new Oe({toneMapped:!1,color:Ji,side:Le,depthTest:!1}),be=new Oe({toneMapped:!1,color:Ji,transparent:!0,opacity:.2,depthTest:!1,depthWrite:!1,side:Le}),Me=4,R=new Oe({toneMapped:!1,color:16777215,side:Le,depthTest:!1}),S=new Oe({toneMapped:!1,color:Ji,side:Le,polygonOffset:!0,polygonOffsetFactor:-2}),Z=new Oe({toneMapped:!1,color:Ji,transparent:!0,opacity:.16,depthWrite:!1,side:Le,polygonOffset:!0,polygonOffsetFactor:-1}),it=new Oe({toneMapped:!1,color:16777215,side:Le,polygonOffset:!0,polygonOffsetFactor:-3});function ut(A,K=1.4,et=.13,ct=.035){let ot=[],Et=(te,ue,Ee,de,Wt)=>{let se=Math.hypot(Ee-te,de-ue)||1,Ie=-(de-ue)/se*ct*.5,Fe=(Ee-te)/se*ct*.5,ee=[te+Ie,Wt,-(ue+Fe)],De=[te-Ie,Wt,-(ue-Fe)],rn=[Ee+Ie,Wt,-(de+Fe)],Fn=[Ee-Ie,Wt,-(de-Fe)];ot.push(...ee,...De,...rn,...rn,...De,...Fn)},Tt=K/2;for(let te=1;te<A.length;te++){let ue=A[te-1],Ee=A[te],de=Math.hypot(Ee[0]-ue[0],Ee[1]-ue[1]);if(de<.01)continue;let Wt=(Ee[0]-ue[0])/de,se=(Ee[1]-ue[1])/de;for(;Tt<de;){let Ie=Tt/de,Fe=ue[0]+(Ee[0]-ue[0])*Ie,ee=ue[1]+(Ee[1]-ue[1])*Ie,De=ue[2]+(Ee[2]-ue[2])*Ie+.012,rn=Fe+Wt*et*.5,Fn=ee+se*et*.5;for(let hn of[1,-1])Et(Fe-Wt*et*.5-se*et*.75*hn,ee-se*et*.5+Wt*et*.75*hn,rn,Fn,De);Tt+=K}Tt-=de}let me=new He;return me.setAttribute("position",new Ce(ot,3)),me}function rt(){for(let A of[...O.children])O.remove(A),A.geometry?.dispose(),A.isCSS2DObject&&A.element.remove();w=!0}let Jt=new Qo({color:Ji,dashSize:1.2,gapSize:.65,toneMapped:!1});function J(A,K,et=[]){rt(),G=K?.key||null;let ct=[],ot=null;for(let Wt of A.pts){if(Wt.kind==="elev"){ot=null;continue}if(!ot||ot.f!==Wt.f){let se=ot&&ot.pts[ot.pts.length-1];ot={f:Wt.f,pts:se?[se]:[]},ct.push(ot)}ot.pts.push([Wt.x,Wt.y,Wt.z+.08])}for(let Wt of A.legs){if(Wt.kind==="walk"){let De=Wt.pts.map(([Fn,hn])=>[Fn,hn,s(Wt.f).z+.1]),rn=new fe(zt(De,1),Zt);rn.userData={f:Wt.f,mode:"overview"},rn.renderOrder=2,O.add(rn);continue}let se=A.pts[Wt.i0],Ie=A.pts[Wt.i1],Fe=new He().setFromPoints([se,Ie].map(De=>Gn(De.x,De.y,De.z+nt(De.f)+.1))),ee=new ki(Fe,Jt);ee.computeLineDistances(),ee.userData.mode="overview",O.add(ee)}for(let Wt of ct){if(Wt.pts.length<2)continue;for(let[Ie,Fe,ee]of[[zt(Wt.pts,1.3),be,1],[zt(Wt.pts,.6),Zt,2],[ut(Wt.pts,3.2,.34,.09),R,3]]){let De=new fe(Ie,Fe);De.renderOrder=ee,De.userData={f:Wt.f,mode:"map",singleFloor:!0},O.add(De)}let se=Wt.pts.map(Ie=>[Ie[0],Ie[1],Ie[2]-.05]);for(let[Ie,Fe,ee]of[[zt(se,1),Z,1],[zt(se,.8),S,2],[ut(se,1.4,.34,.07),it,3]]){let De=new fe(Ie,Fe);De.renderOrder=ee,De.userData={f:Wt.f,mode:"walk"},O.add(De)}}let Et=A.pts[0],Tt=A.pts[A.pts.length-1],me=It(!0);me.scale.setScalar(Me),me.position.copy(Gn(Et.x,Et.y,Et.z+.1)),me.userData={f:Et.f,mode:"map"},O.add(me);let te=Gt(!0);te.scale.setScalar(Me),te.position.copy(Gn(Tt.x,Tt.y,Tt.z)),te.userData={f:Tt.f,mode:"map"},O.add(te);let ue=It();ue.position.copy(Gn(Et.x,Et.y,Et.z+.04)),ue.userData={f:Et.f,mode:"walk"},O.add(ue);let Ee=Gt();Ee.position.copy(Gn(Tt.x,Tt.y,Tt.z)),Ee.userData={f:Tt.f,mode:"walk"},O.add(Ee);let de=A.legs;for(let Wt=0;Wt<de.length;Wt++){let se=de[Wt];if(se.kind==="walk")continue;let Ie=Wt>=2&&de[Wt-2].kind===se.kind&&de[Wt-2].id===se.id&&de[Wt-1].pts.length<=3,Fe=Wt+2<de.length&&de[Wt+2].kind===se.kind&&de[Wt+2].id===se.id&&de[Wt+1].pts.length<=3,ee=se;for(let gn=Wt;gn+2<de.length&&de[gn+2].kind===se.kind&&de[gn+2].id===se.id&&de[gn+1].pts.length<=3;gn+=2)ee=de[gn+2];let De=se.to>se.from,rn=se.kind==="stair"?se.link.ramp.pts[De?0:se.link.ramp.pts.length-1]:De?se.link.pa:se.link.pb,Fn=se.kind==="stair"?se.link.ramp.pts[De?se.link.ramp.pts.length-1:0]:De?se.link.pb:se.link.pa,hn=se.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8",ii=[];Ie||ii.push([rn,se.from,`${hn} ${De?"\u2191":"\u2193"} ${ee.to===0?"B1":ee.to+"\uCE35"}`]),Fe||ii.push([Fn,se.to,`${hn}\uC5D0\uC11C \uB098\uC640\uC694`]);for(let[gn,E,H]of ii){let Q=document.createElement("div");Q.className="route-tag",Q.textContent=H;let k=new eo(Q);k.position.copy(Gn(gn[0],gn[1],s(E).z+1.6)),k.userData={f:E,overviewLabel:!0},O.add(k)}}xt=[],et.forEach((Wt,se)=>{if(Wt.kind==="start"||Wt.kind==="arrive"||!Wt.at)return;let Ie=document.createElement("div");Ie.className="step-dot"+(Wt.kind==="stair"||Wt.kind==="elev"?" vertical":""),Ie.textContent=se;let Fe=new eo(Ie);Fe.position.copy(Gn(Wt.at[0],Wt.at[1],s(Wt.f).z+.3)),Fe.userData.f=Wt.f,Fe.userData.step=se,O.add(Fe),xt.push(Fe)}),st(),$()}let xt=[];function St(A){for(let K of xt)K.element.classList.toggle("on",K.userData.step===A);w=!0}function ht(A){G=A?A.key:null,$(),w=!0}function It(A=!1){let K=new sn,et=new fe(new Us(.2,.28,40),new Oe({toneMapped:!1,color:Ji,side:Le,depthTest:!A})),ct=new fe(new yi(.1,24),new Oe({toneMapped:!1,color:Ji,side:Le,depthTest:!A}));return et.rotation.x=ct.rotation.x=-Math.PI/2,A&&(et.renderOrder=ct.renderOrder=4),K.add(et,ct),K}function Gt(A=!1){let K=new sn,et=new Oe({toneMapped:!1,color:Ji,side:Le}),ct=new fe(new Us(.36,.44,48),et),ot=new fe(new Us(.2,.25,40),new Oe({toneMapped:!1,color:16777215,side:Le})),Et=new fe(new yi(.36,48),new Oe({toneMapped:!1,color:Ji,transparent:!0,opacity:.18,depthWrite:!1,side:Le}));for(let te of[ct,ot,Et])te.rotation.x=-Math.PI/2,te.position.y=.04;let Tt=new fe(new Fr(.012,.012,1.05,10),et);Tt.position.y=.55;let me=new fe(new Os(.12,24,16),new Hi({toneMapped:!1,color:gS,emissive:2758016}));return me.position.y=1.15,K.add(Et,ct,ot,Tt,me),A&&[Et,ct,ot,Tt,me].forEach((te,ue)=>{te.material=te.material.clone(),te.material.depthTest=!1,te.renderOrder=4+ue}),K}function Kt(){let A=new sn,K=new fe(new yi(1.4,30),new Oe({toneMapped:!1,color:4033535,transparent:!0,opacity:.22,depthTest:!1})),et=new fe(new yi(.55,24),new Oe({toneMapped:!1,color:4033535,depthTest:!1})),ct=new fe(new yi(2.6,24,-.45,.9),new Oe({toneMapped:!1,color:4033535,transparent:!0,opacity:.3,depthTest:!1}));for(let ot of[K,et,ct])ot.rotation.x=-Math.PI/2,ot.renderOrder=6;return A.add(K,ct,et),A.userData.cone=ct,A}function Bt(A){B.userData.floor=A?.f,B.visible=!!A&&A.f===y&&!x&&!M,A&&(B.position.copy(Gn(A.x,A.y,s(A.f).z+.12)),B.userData.cone.visible=A.yaw!=null,B.rotation.y=(A.yaw??90)*Math.PI/180),w=!0}let Yt={x:0,y:0,z:0,f:1,yaw:0,pitch:-.12};function F(A){x=A,v.enabled=!A,f.background.setHex(A?15659254:15526888),d.intensity=A?Ks.hemi:.82,g.intensity=A?Ks.sun:.88,g.position.set(...A?[30,80,20]:[-45,85,50]),_.visible=!A;for(let[K,et]of N)K.material=A?et.firstPerson:et.cutaway;a.toneMappingExposure=A?Ks.exposure:Ks.mapExposure,st(),$()}let mt=null;function bt(A){Object.assign(Yt,A),Yt.f!==mt&&(mt=Yt.f,st())}let Dt=0,yt="";return(function A(K){if(requestAnimationFrame(A),x){let ct=`${Yt.x.toFixed(3)},${Yt.y.toFixed(3)},${Yt.z.toFixed(3)},${Yt.yaw.toFixed(2)},${Yt.pitch.toFixed(3)}`,ot=ct!==yt;if(ot?(yt=ct,l=K,h(o)):c!==r&&K-l>250&&(h(r),w=!0),!ot&&!w)return;w=!1,p.position.set(Yt.x,Yt.z+1.6,-Yt.y),p.rotation.set(Yt.pitch,(Yt.yaw-90)*Math.PI/180,0),a.render(f,p),K-Dt>120&&($(),Dt=K),u.render(f,p);return}if(at){let ct=Math.min(1,(K-at.t0)/at.dur),ot=ct<.5?2*ct*ct:1-(-2*ct+2)**2/2;m.position.lerpVectors(at.cam0,at.cam1,ot),v.target.lerpVectors(at.tgt0,at.tgt1,ot),ct>=1&&(at=null),w=!0}v.update()||!!at?(w=!0,l=K,h(o)):c!==r&&K-l>250&&(h(r),w=!0),w&&(w=!1,K-Dt>120&&($(),Dt=K),a.render(f,m),u.render(f,m))})(performance.now()),{load:q,resize:pt,setFloor:P,setFloorOverview:Qt,get floorOverview(){return M},get floor(){return y},frame:$t,fit:Lt,focus:Ht,showRoute:J,highlightStep:St,clearRoute:rt,select:ht,setMe:Bt,setFirstPerson:F,setWalkPose:bt,nodes:T,redraw:()=>w=!0}}var Ji,gS,Gn,zm=qe(()=>{ei();gm();Em();Cm();zu();Pm();Bm();Ji=7950591,gS=5451986,Gn=(i,t,e)=>new L(i,e,-t)});function _S(){let i=[];for(let t=0;t<20;t++)for(let e=0;e<18;e++)i.push([(-18+2/2+e*2)*Mf,(12-2/2-t*2)*Mf]);return i}function io(i){return Math.atan2(i[5],i[2])}function Sf(i,t,e){let n=io(e),s=new Float32Array(360),{data:r,w:o,h:a}=i;for(let c=0;c<Hm.length;c++){let[l,h]=Hm[c],u=n-l,f=Math.cos(h),d=f*Math.cos(u),g=f*Math.sin(u),_=Math.sin(h),m=e[0]*d+e[3]*g+e[6]*_,p=e[1]*d+e[4]*g+e[7]*_,v=e[2]*d+e[5]*g+e[8]*_;if(v<=.05){s[c]=NaN;continue}let y=t.fx*m/v+t.cx,x=t.fy*p/v+t.cy;if(y<1||x<1||y>o-2||x>a-2){s[c]=NaN;continue}let w=Math.floor(y),T=Math.floor(x),C=y-w,N=x-T,b=T*o+w;s[c]=r[b]*(1-C)*(1-N)+r[b+1]*C*(1-N)+r[b+o]*(1-C)*N+r[b+o+1]*C*N}return s}function bf(i,t,e,n){let s=Math.max(1,Math.ceil(n*2.5)),r=[],o=0;for(let l=-s;l<=s;l++){let h=Math.exp(-(l*l)/(2*n*n));r.push(h),o+=h}for(let l=0;l<r.length;l++)r[l]/=o;let a=new Float32Array(t*e),c=new Float32Array(t*e);for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=i[l*t+Math.min(t-1,Math.max(0,h+f))]*r[f+s];a[l*t+h]=u}for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=a[Math.min(e-1,Math.max(0,l+f))*t+h]*r[f+s];c[l*t+h]=u}return c}var Mf,Hm,Ef,wf=qe(()=>{Mf=Math.PI/180;Hm=_S();Ef=i=>i*Math.tan(2*Mf)*.45});function Gm(i){return i.map(t=>t.kind==="stair"?{kind:"stair",fa:t.fa,pa:t.ramp.pts[0],fb:t.fb,pb:t.ramp.pts[t.ramp.pts.length-1],da:Vm(t.ramp.pts[0],t.ramp.pts[Math.min(2,t.ramp.pts.length-1)]),db:Vm(t.ramp.pts[t.ramp.pts.length-1],t.ramp.pts[Math.max(0,t.ramp.pts.length-3)])}:{kind:"elev",fa:t.fa,pa:t.pa,fb:t.fb,pb:t.pb})}var Bw,Vm,Wm=qe(()=>{wf();Bw=Math.PI/180,Vm=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*180/Math.PI});function Xm(i,t,e){let n=Math.floor(e*.2),s=Math.ceil(e*.8),r=new Float32Array(t);for(let l=1;l<t-1;l++){let h=0;for(let u=n;u<s;u++){let f=u*t+l;h+=Math.abs(i[f+1]-i[f-1])}r[l]=h/(s-n)}r[0]=r[1],r[t-1]=r[t-2];let o=0;for(let l of r)o+=l;o/=t;let a=0;for(let l=0;l<t;l++)r[l]-=o,a+=r[l]*r[l];let c=Math.sqrt(a/t)||1;for(let l=0;l<t;l++)r[l]/=c;return r}function Rf(i,t){let e=(d,g)=>[d[g],d[3+g],d[6+g]],n=(d,g)=>d[0]*g[0]+d[1]*g[1]+d[2]*g[2],s=e(i,0),r=e(i,1),o=e(i,2),a=e(t,2),c=e(t,0),l=n(a,s),h=n(a,r),u=n(a,o),f=n(c,r);return{yaw:Math.atan2(l,u)/so,pitch:Math.atan2(h,u)/so,roll:Math.asin(Math.max(-1,Math.min(1,f)))/so}}function qm(i,t,e,n,s){let o=new Float64Array(180),a=0;for(let p=2;p<e-2;p++)for(let v=2;v<t-2;v++){let y=p*t+v,x=i[y-t+1]+2*i[y+1]+i[y+t+1]-i[y-t-1]-2*i[y-1]-i[y+t-1],w=i[y+t-1]+2*i[y+t]+i[y+t+1]-i[y-t-1]-2*i[y-t]-i[y-t+1],T=Math.hypot(x,w);if(T<90)continue;let C=(v-n.cx)/n.fx,N=(p-n.cy)/n.fy,b=Math.atan2(x,-w),M=Tf(C,N,b,n,s);if(M==null)continue;let D=Tf(C,N,b-.035,n,s),X=Tf(C,N,b+.035,n,s);if(D==null||X==null)continue;let j=Math.abs(Af(X*4,D*4))/4;if(j>6)continue;let O=M,tt=Math.min(1,T/300)/(1+(j/1.5)**2),B=O*2,pt=Math.floor(B)%180,q=B-Math.floor(B);o[pt]+=tt*(1-q),o[(pt+1)%180]+=tt*q,a++}if(a<150)return null;let c=new Float64Array(180);for(let p=0;p<180;p++){let v=0;for(let y=-6;y<=6;y++)v+=o[(p+y+180)%180]*Math.exp(-(y*y)/8);c[p]=v}let l=0;for(let p=1;p<180;p++)c[p]>c[l]&&(l=p);let h=0;for(let p=0;p<180;p++)Math.min(Math.abs(p-l),180-Math.abs(p-l))>12&&(h=Math.max(h,c[p]));let u=c[(l-1+180)%180],f=c[l],d=c[(l+1)%180],g=u-2*f+d,_=g<0?.5*(u-d)/g:0;return{axis:((l+_)/2%90+90)%90,ratio:f/(h||1e-9),n:a}}function Tf(i,t,e,n,s){let r=Math.cos(e)/n.fx,o=Math.sin(e)/n.fy,a=-o,c=r,l=i*o-t*r,h=s[0]*a+s[1]*c+s[2]*l,u=s[3]*a+s[4]*c+s[5]*l,f=s[6]*a+s[7]*c+s[8]*l,d=Math.hypot(h,u,f);h/=d,u/=d,f/=d;let g=Math.hypot(h,u);return Math.abs(f)<.25||g<.25?null:((Math.atan2(u,h)/so+90)%90+90)%90}var so,Af,zl,xa,Ym=qe(()=>{so=Math.PI/180,Af=(i,t)=>((i-t)%360+540)%360-180;zl=class{constructor(t,e=null){this.long=t,this.prev=null,this.samples=[],this.fov=e}add(t,e,n){let s=this.prev;if(this.prev={P:t,R:e,t:n},!s||n-s.t>.35||t.length!==s.P.length)return null;let r=Rf(s.R,e);if(Math.abs(r.yaw)<3||Math.abs(r.yaw)>14||Math.abs(r.pitch)>1.5||Math.abs(r.roll)>1.5)return null;let o=t.length,a=(o-1)/2,c=r.yaw*so,l=-2,h=null,u=-2,f=[];for(let g=40;g<=95;g+=.5){let _=this.long/2/Math.tan(g/2*so),m=0,p=0;for(let y=0;y<o;y++){let x=a+_*Math.tan(Math.atan((y-a)/_)+c);if(x<0||x>o-1)continue;let w=Math.floor(x),T=x-w,C=s.P[w]*(1-T)+s.P[Math.min(o-1,w+1)]*T;m+=C*t[y],p++}if(p<o*.5)continue;let v=m/p;f.push([g,v]),v>l&&(l=v,h=g)}if(l<.75||h==null||h<=40||h>=95)return null;for(let[g,_]of f)Math.abs(g-h)>8&&(u=Math.max(u,_));if(l-u<.05)return null;let d=h;if(this.samples.push(d),this.samples.length>60&&this.samples.shift(),this.samples.length>=8){let g=[...this.samples].sort((_,m)=>_-m);this.fov=g[g.length>>1]}return this.fov}};xa=class{constructor(t=24){this.N=t,this.s=[],this.value=null}add(t,e=1){return this.value!=null&&this.s.length>=6&&Math.abs(Af(t,this.value))>20?this.value:(this.s.push({v:t,w:e}),this.s.length>this.N&&this.s.shift(),this.value=this._median(),this.value)}get n(){return this.s.length}reset(){this.s=[],this.value=null}_median(){let t=this.s[0].v,e=this.s.map(r=>({v:t+Af(r.v,t),w:r.w}));e.sort((r,o)=>r.v-o.v);let n=e.reduce((r,o)=>r+o.w,0),s=0;for(let r of e)if(s+=r.w,s>=n/2)return r.v;return e[e.length-1].v}}});function yS(){try{oo=oo||new(window.AudioContext||window.webkitAudioContext);let i=oo.currentTime;for(let[t,e]of[[880,0],[660,.18]]){let n=oo.createOscillator(),s=oo.createGain();n.type="sine",n.frequency.value=t,s.gain.setValueAtTime(1e-4,i+e),s.gain.exponentialRampToValueAtTime(.18,i+e+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+e+.5),n.connect(s).connect(oo.destination),n.start(i+e),n.stop(i+e+.55)}}catch{}}function Hl({from:i,to:t,title:e,hint:n,hold:s=!1,onSkip:r}){let o=xS("#lift"),a=o.querySelector(".lift-floor"),c=o.querySelector(".lift-arrow"),l=o.querySelector(".lift-msg"),h=o.querySelector(".lift-sub"),u=o.querySelector(".lift-skip"),f=t>i,d=i,g=!1,_=!1,m=null,p=null,v,y=new Promise(C=>v=C);o.hidden=!1,o.className="lift",c.textContent=f?"\u25B2":"\u25BC",a.textContent=cn(i),l.textContent=e||`${cn(t)}\uB85C \uC774\uB3D9 \uC911`,h.textContent=n||"",u.hidden=!s,u.onclick=()=>{r?.(),T.arrive()},requestAnimationFrame(()=>o.classList.add("show"));function x(C){a.classList.remove("flip"),a.offsetWidth,a.textContent=cn(C),a.classList.add("flip")}async function w(){for(await ro(350),o.classList.add("closed"),await ro(700),o.classList.add("moving");!g&&!_&&d!==t;){if(await ro(1100),g||_)return;d+=f?1:-1,x(d)}}let T={finished:y,async arrive(){if(_||g)return y;for(_=!0,await p;d!==t;)d+=f?1:-1,x(d),await ro(260);o.classList.remove("moving"),o.classList.add("arrived"),yS(),l.textContent=`${cn(t)} \uB3C4\uCC29`,u.hidden=!0,await ro(600),o.classList.remove("closed"),await ro(750),T.close()},close(){g||(g=!0,v(),clearTimeout(m),o.classList.remove("show"),setTimeout(()=>o.hidden=!0,250))},get arrived(){return _}};return p=w().catch(()=>{}),s||p.then(()=>T.arrive()),T}var xS,ro,oo,$m,an,Cf=qe(()=>{ho();xS=i=>document.querySelector(i),ro=i=>new Promise(t=>setTimeout(t,i)),oo=null;$m="sai-indoor-voice",an={get on(){try{return localStorage.getItem($m)==="1"}catch{return!1}},set on(i){try{localStorage.setItem($m,i?"1":"0")}catch{}i||speechSynthesis?.cancel()},supported:typeof window<"u"&&"speechSynthesis"in window,say(i){if(!(!this.supported||!this.on||!i))try{speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(i.replace(/·/g,","));t.lang="ko-KR",t.rate=1.05,speechSynthesis.speak(t)}catch{}}}});function Vl(i){let t=document.createElement("img");return t.src=`ui/${i}.svg`,t.alt="",t.setAttribute("aria-hidden","true"),t}function ao(i,t,e=!1){let n=vS[t];e&&(t==="start"||t==="straight")&&(n="guide-up"),i.replaceChildren(n?Vl(n):document.createTextNode(MS[t]||"\u2191")),i.setAttribute("aria-hidden","true")}var vS,MS,If=qe(()=>{vS={start:"step-up",straight:"step-up",right:"step-right","stair-up":"step-stairs",arrive:"step-arrive"},MS={left:"\u2190","slight-left":"\u2196","slight-right":"\u2197","u-left":"\u21B6","u-right":"\u21B7","stair-down":"\u21E3",elev:"\u21C5"}});async function Zm(){try{return!!navigator.xr&&await navigator.xr.isSessionSupported("immersive-ar")}catch{return!1}}async function Km(i,t){let e=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["local-floor"],optionalFeatures:["camera-access","dom-overlay"],domOverlay:{root:t}}),n=e.enabledFeatures,s=[];if(n&&!n.includes("camera-access")&&s.push("camera-access"),e.domOverlayState||s.push("dom-overlay"),s.length)throw await e.end().catch(()=>{}),new Error(`\uC774 \uAE30\uAE30\uC758 WebXR\uC5D0 ${s.join(", ")} \uAE30\uB2A5\uC774 \uC5C6\uC5B4\uC694`);return i.xr.enabled=!0,i.xr.setReferenceSpaceType("local-floor"),await i.xr.setSession(e),e}var Gl,jm=qe(()=>{ei();Gl=class{constructor(t,e=220,n=!1){this.r=t,this.long=e,this.flip=n,this.rt=null,this.buf=null,this.mat=new qn({uniforms:{map:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D map; varying vec2 vUv; void main(){ vec3 c = texture2D(map, vUv).rgb; float g = dot(c, vec3(0.299, 0.587, 0.114)); gl_FragColor = vec4(g, g, g, 1.0); }",depthTest:!1,depthWrite:!1}),this.scene=new hi;let s=new fe(new Ns(2,2),this.mat);s.frustumCulled=!1,this.scene.add(s),this.cam=new Xi(-1,1,1,-1,0,1)}grab(t){let e=this.r.xr.getCameraTexture(t);if(!e||!t.width)return null;let n=this.long/Math.max(t.width,t.height),s=Math.round(t.width*n),r=Math.round(t.height*n);(!this.rt||this.rt.width!==s||this.rt.height!==r)&&(this.rt?.dispose(),this.rt=new Jn(s,r,{depthBuffer:!1}),this.buf=new Uint8Array(s*r*4)),this.mat.uniforms.map.value=e;let o=this.r,a=o.getRenderTarget(),c=o.xr.enabled;o.xr.enabled=!1,o.setRenderTarget(this.rt),o.render(this.scene,this.cam),o.readRenderTargetPixels(this.rt,0,0,s,r,this.buf),o.setRenderTarget(a),o.xr.enabled=c;let l=new Float32Array(s*r);for(let h=0;h<r;h++){let u=this.flip?h:r-1-h;for(let f=0;f<s;f++)l[h*s+f]=this.buf[(u*s+f)*4]}return{g:l,w:s,h:r}}dispose(){this.rt?.dispose(),this.mat.dispose()}}});function Jm(i){let t=l=>[l[0],-l[2],l[1]],e=t([i[0],i[1],i[2]]),n=t([i[4],i[5],i[6]]),s=t([i[8],i[9],i[10]]),r=e,o=[-n[0],-n[1],-n[2]],a=[-s[0],-s[1],-s[2]];return{R:[r[0],o[0],a[0],r[1],o[1],a[1],r[2],o[2],a[2]],x:i[12],y:-i[14],h:i[13]}}function Qm(i,t,e){return{fx:i[0]*t/2,fy:i[5]*e/2,cx:t/2*(1-i[8]),cy:e/2*(1+i[9])}}function ql(i){return Math.atan2(i[5],i[2])/In}function tg(i,t){let e=-i.off*In,n=-i.tx,s=i.ty;return{rotY:e,px:Math.cos(e)*n+Math.sin(e)*s,py:t,pz:-Math.sin(e)*n+Math.cos(e)*s}}var In,co,ya,Wl,Xl,eg=qe(()=>{In=Math.PI/180,co=(i,t)=>((i-t)%360+540)%360-180;ya=class i{constructor(){this.off=null,this.tx=0,this.ty=0,this.pending=null,this.n=0}get ok(){return this.off!=null}static solve(t,e,n){let s=Math.cos(n*In),r=Math.sin(n*In);return{off:n,tx:t.x-(s*e.x-r*e.y),ty:t.y-(r*e.x+s*e.y)}}update(t,e,n,s=.5){let r=i.solve(t,e,n);if(!this.ok)return Object.assign(this,r,{pending:null,n:1}),"set";let o=this.toBuilding(e.x,e.y),a=Math.hypot(o.x-t.x,o.y-t.y),c=co(n,this.off);if(a>3||Math.abs(c)>15){let f=this.pending;return this.pending=r,f&&Math.abs(co(f.off,r.off))<8&&Math.hypot(f.tx-r.tx,f.ty-r.ty)<2?(Object.assign(this,r,{pending:null}),this.n++,"snap"):"hold"}this.pending=null;let l=Math.min(.5,.25*s+.05),h=this.off+c*l,u={x:o.x+(t.x-o.x)*l,y:o.y+(t.y-o.y)*l};return Object.assign(this,i.solve(u,e,h)),this.n++,"blend"}toBuilding(t,e){let n=Math.cos(this.off*In),s=Math.sin(this.off*In);return{x:n*t-s*e+this.tx,y:s*t+n*e+this.ty}}toSensor(t,e){let n=Math.cos(this.off*In),s=Math.sin(this.off*In),r=t-this.tx,o=e-this.ty;return{x:n*r+s*o,y:-s*r+n*o}}},Wl=class{constructor(t=4){this.FH=t,this.ref=null,this.floorY=0,this.idx=0}shift(t){this.idx+=t}reset(t,e=null){this.ref=t,e!=null&&(this.floorY=e)}update(t){if(this.ref==null)return this.ref=t,0;let e=t-this.ref;return e>this.FH*.75?(this.ref+=this.FH,this.floorY+=this.FH,this.idx++,1):e<-this.FH*.75?(this.ref-=this.FH,this.floorY-=this.FH,this.idx--,-1):(Math.abs(e)<.4&&(this.ref+=e*.02),0)}};Xl=class{constructor({window:t=30,posTol:e=1.5,yawTol:n=20,minInliers:s=6,minSpan:r=2.5,margin:o=.6}={}){Object.assign(this,{window:t,posTol:e,yawTol:n,minInliers:s,minSpan:r,margin:o}),this.obs=[],this.best=null}add(t,e,n,s){for(s.forEach((r,o)=>this.obs.push({t,sx:e.x,sy:e.y,syaw:e.yaw,lvl:n,f:r.f,x:r.x,y:r.y,yaw:r.yaw,w:Math.max(.05,r.ncc-.3)*(o===0?1:.6)}));this.obs.length&&t-this.obs[0].t>this.window;)this.obs.shift()}clear(){this.obs=[],this.best=null}solve(){let t=this.obs,e=[];for(let a of t){let c=co(a.yaw,a.syaw),l=ya.solve({x:a.x,y:a.y},{x:a.sx,y:a.sy},c);e.push({...l,df:a.f-a.lvl,...this._score(l,a.f-a.lvl)})}e.sort((a,c)=>c.score-a.score);let n=e[0];if(!n||n.n<this.minInliers||n.span<this.minSpan)return this.best=null;let s=a=>{if(a.df!==n.df||Math.abs(co(a.off,n.off))>10)return!0;let c=t[t.length-1],l=g=>{let _=Math.cos(g.off*In),m=Math.sin(g.off*In);return[_*c.sx-m*c.sy+g.tx,m*c.sx+_*c.sy+g.ty]},[h,u]=l(n),[f,d]=l(a);return Math.hypot(h-f,u-d)>3},r=e.find(a=>s(a));if(r&&r.score>n.score*this.margin)return this.best=null;let o=n;for(let a=0;a<2;a++){let c=0,l=0,h=0;for(let v of o.inl){let y=co(v.yaw,v.syaw)*In;c+=v.w*Math.cos(y),l+=v.w*Math.sin(y)}let u=Math.atan2(l,c)/In,f=0,d=0,g=Math.cos(u*In),_=Math.sin(u*In);for(let v of o.inl)f+=v.w*(v.x-(g*v.sx-_*v.sy)),d+=v.w*(v.y-(_*v.sx+g*v.sy)),h+=v.w;let m={off:u,tx:f/h,ty:d/h},p=this._score(m,o.df);if(p.n<this.minInliers)break;o={...m,df:o.df,...p}}return this.best=o}_score(t,e){let n=Math.cos(t.off*In),s=Math.sin(t.off*In),r=0,o=0,a=[],c=1/0,l=-1/0,h=1/0,u=-1/0,f=new Set;for(let d of this.obs){if(d.f-d.lvl!==e)continue;let g=n*d.sx-s*d.sy+t.tx,_=s*d.sx+n*d.sy+t.ty,m=Math.hypot(g-d.x,_-d.y);m>this.posTol||Math.abs(co(d.yaw,d.syaw+t.off))>this.yawTol||(a.push(d),r+=d.w*(1-m/(2*this.posTol)),f.has(d.t)||(f.add(d.t),o++),c=Math.min(c,d.sx),l=Math.max(l,d.sx),h=Math.min(h,d.sy),u=Math.max(u,d.sy))}return{score:r,n:o,inl:a,span:o?Math.hypot(l-c,u-h):0}}}});function Pf(i,t){let e=[Math.cos(t)*Math.cos(i),Math.cos(t)*Math.sin(i),Math.sin(t)],n=[Math.sin(i),-Math.cos(i),0],s=[Math.sin(t)*Math.cos(i),Math.sin(t)*Math.sin(i),-Math.cos(t)];return[n[0],s[0],e[0],n[1],s[1],e[1],n[2],s[2],e[2]]}function $l(i){let t=screen.orientation&&screen.orientation.angle||window.orientation||0,e=Ma(Ma(Lf(i.alpha*nn),ES(i.beta*nn)),wS(i.gamma*nn));return Ma(Ma(e,Lf(t*nn)),TS)}async function ng(i){let{indoor:t,dest:e,mode:n,demo:s,assets:r="assets/",onClose:o,onRoute:a}=i,c=i.route,l=Qe("#ar"),h=Qe("#ar-video"),u=Qe("#ar-gl"),f={step:Qe("#ar-step-text"),sub:Qe("#ar-step-sub"),arrow:Qe("#ar-arrow"),status:Qe("#ar-status"),coach:Qe("#ar-coach"),dest:Qe("#ar-dest"),remain:Qe("#ar-remain"),err:Qe("#ar-error"),arrive:Qe("#ar-arrive"),mini:Qe("#ar-mini")};l.hidden=!1,f.err.hidden=!0,f.arrive.hidden=!0,f.coach.hidden=!1,f.dest.textContent=[e.name||e.title,Je(e.f)].join(" \xB7 "),Qe("#ar-distance").textContent=`${e.title}\uAE4C\uC9C0 ${Math.round(c.len)}m`,f.step.textContent="\uC704\uCE58\uB97C \uCC3E\uB294 \uC911",f.sub.textContent="",f.status.className="ar-status searching",f.status.textContent="\uC704\uCE58\uB97C \uCC3E\uB294 \uC911",ao(f.arrow,"straight",!0),f.arrow.dataset.icon="straight",we("searching","\uC704\uCE58\uB97C \uCC3E\uB294 \uC911");let d=!1;if(!s){try{typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?d=await DeviceOrientationEvent.requestPermission()==="granted":d="DeviceOrientationEvent"in window}catch{d=!1}try{typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()}catch{}}let g=!1,_=null,m=null,p=+new URLSearchParams(location.search).get("fov")||0,v=0;try{v=+localStorage.getItem("sai-ar-fov")||0}catch{}let y=p||v||bS,x=null,w=new URLSearchParams(location.search),T=w.has("debug"),C=!s&&!w.has("legacy")&&await Zm();async function N(){if(!window.isSecureContext)throw Object.assign(new Error("HTTPS \uC8FC\uC18C\uC5D0\uC11C\uB9CC \uCE74\uBA54\uB77C\uB97C \uC4F8 \uC218 \uC788\uC5B4\uC694."),{code:"insecure"});if(!navigator.mediaDevices?.getUserMedia)throw Object.assign(new Error("\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uCE74\uBA54\uB77C\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694."),{code:"nocam"});_=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:960},height:{ideal:720}}}),h.srcObject=_,h.loop=!1,await h.play()}async function b(){let z=await fetch(r+"demo.json").then(Y=>Y.json());m=z,h.srcObject=null,h.src=r+z.video,h.loop=!1,h.muted=!0,await h.play().catch(()=>{})}try{s?await b():C||await N()}catch(z){We(z);let Y=()=>{g=!0,_?.getTracks().forEach(_t=>_t.stop()),l.hidden=!0,o?.()};return Qe("#ar-error-close").onclick=Y,Qe("#ar-demo").onclick=()=>{Y(),i.onDemo?.()},{close:Y}}let M=null,D=async()=>{try{M=await navigator.wakeLock?.request("screen")}catch{}};D();let X=!1,j=()=>{document.hidden?(X=!0,m&&h.pause()):X&&(X=!1,D(),q?.postMessage({type:"reset"}),I.ok=!1,V.init=!1,m?h.play().catch(()=>{}):h.play().catch(()=>{}))};document.addEventListener("visibilitychange",j);let O=null,tt=z=>{z.alpha==null||C||(O={alpha:z.alpha,beta:z.beta,gamma:z.gamma,t:performance.now()})};!m&&d&&addEventListener("deviceorientation",tt);let B={on:!1,lp:9.8,hi:!1,lastT:0,lo:99,top:0},pt=z=>{let Y=z.accelerationIncludingGravity;if(!Y||Y.x==null||C)return;B.on=!0,B.lp+=(Math.hypot(Y.x,Y.y,Y.z)-B.lp)*.25,B.lo=Math.min(B.lo,B.lp),B.top=Math.max(B.top,B.lp);let _t=performance.now();if(!B.hi&&B.lp>10.8&&_t-B.lastT>280)B.hi=!0;else if(B.hi&&B.lp<9.9){B.hi=!1,B.lastT=_t;let ft=Math.max(.45,Math.min(.85,.48*Math.pow(Math.max(.5,B.top-B.lo),.25)));B.lo=99,B.top=0;let At=It();B.n=(B.n||0)+1,At!=null&&Rt&&!Zt&&(q.postMessage({type:"step",len:ft,yaw:At}),Kt(At))}};m||addEventListener("devicemotion",pt);let q=new Worker("ar-worker.js"),Rt=!1,Ut=!1,qt=0,G=0;q.onmessage=z=>{let Y=z.data;Y.type==="ready"?Rt=!0:Y.type==="error"?We(new Error(`\uC704\uCE58 \uC778\uC2DD \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. ${Y.message}`)):Y.type==="pose"?(Y.id&&(Ut=!1,G=Y.ms),Y.cands&&ht(Y.id,Y.cands),Gt(Y.r,Y.id)):Y.type==="motion"&&Bt(Y.r)};let $=t.M;q.postMessage({type:"init",indexUrl:new URL(r+"ar-index.bin",location.href).href,svUrl:new URL(r+"sv.json",location.href).href,portals:Gm(t.links),grid:{gx0:$.gx0,gy1:$.gy1,cell:$.cell,gw:$.gw,gh:$.gh,floors:$.floors.map(z=>({n:z.n,grid:z.grid}))}});let nt=document.createElement("canvas"),st=nt.getContext("2d",{willReadFrequently:!0});function U(){let z=h.videoWidth,Y=h.videoHeight;if(!z||!Y)return null;let _t=220/Math.max(z,Y),ft=Math.round(z*_t),At=Math.round(Y*_t);nt.width!==ft&&(nt.width=ft,nt.height=At),st.drawImage(h,0,0,ft,At);let Ct=st.getImageData(0,0,ft,At).data,lt=new Float32Array(ft*At);for(let Nt=0,ae=0;Nt<lt.length;Nt++,ae+=4)lt[Nt]=.299*Ct[ae]+.587*Ct[ae+1]+.114*Ct[ae+2];let vt;if(m){let Nt=ft/m.K[4];vt={fx:m.K[0]*Nt,fy:m.K[1]*Nt,cx:m.K[2]*Nt,cy:m.K[3]*Nt}}else{let Nt=Math.max(ft,At)/2/Math.tan(y/2*nn);vt={fx:Nt,fy:Nt,cx:ft/2,cy:At/2}}return{img:{data:bf(lt,ft,At,Ef(vt.fx)),w:ft,h:At},K:vt,raw:{g:lt,w:ft,h:At}}}let I={ok:!1,x:0,y:0,f:c.pts[0].f,yaw:90,conf:0,lastFix:0},V={x:0,y:0,yaw:90,init:!1},at=null,dt=new xa,Ft=[],Qt=0,P=!1,$t=es(c),Lt=i.steps||ir(c,e,{landmarks:t.destinations}),Ht=0,kt=0,ve=!1,zt=-1,Zt=null,be=null,Me=new Set,R=new Set,S=m?(m.pitchDeg||-6)*nn:0,Z=new Map;for(let z of t.floors){let Y=[];for(let _t of t.FL(z).rooms){let ft=_t.poly;for(let At=0;At<ft.length;At++){let Ct=ft[At],lt=ft[(At+1)%ft.length],vt=Math.hypot(lt[0]-Ct[0],lt[1]-Ct[1]);if(vt<1)continue;let Nt=Math.atan2(lt[1]-Ct[1],lt[0]-Ct[0])/nn;Nt=(Nt%90+90)%90,Y.push({x:(Ct[0]+lt[0])/2,y:(Ct[1]+lt[1])/2,L:vt,t:Nt})}}Z.set(z,Y)}function it(z,Y,_t){let ft=[],At=0;for(let lt of Z.get(z)||[]){if(Math.hypot(lt.x-Y,lt.y-_t)>10)continue;At+=lt.L;let vt=ft.find(Nt=>Math.abs(di(Nt.t*4,lt.t*4))/4<2);vt?(vt.t=(vt.t*vt.L+(vt.t+di(lt.t*4,vt.t*4)/4)*lt.L)/(vt.L+lt.L),vt.L+=lt.L):ft.push({t:lt.t,L:lt.L})}let Ct=ft.sort((lt,vt)=>vt.L-lt.L)[0];return Ct&&Ct.L>At*.75?Ct.t:null}let ut=new xa(15),rt=0,Jt=null,J=0;function xt(z){return ut.n>=3&&z-rt<2e4?ut.value:dt.value}function St(z,Y,_t){let ft=Jt,At=J;if(Jt=Y,J=_t,!I.ok||!ft||_t-At>400)return;let Ct=Rf(ft,Y);if(Math.abs(Ct.yaw)>2.5||Math.abs(Ct.pitch)>2.5)return;let lt=it(I.f,V.x,V.y);if(lt==null)return;let vt=qm(z.raw.g,z.raw.w,z.raw.h,z.K,Y);if(!vt||vt.ratio<2.5)return;let Nt=at??dt.value??I.off;if(Nt==null)return;let ae=lt-vt.axis,Te=ae+90*Math.round(di(Nt,ae)/90);Math.abs(di(Te,Nt))>30||(ut.add(Te,Math.min(3,vt.ratio/2)),rt=_t,ut.n>=3&&q.postMessage({type:"heading",off:ut.value,sd:5}))}function ht(z,Y){let _t=k.q.get(z);if(!C||!_t||Zt||g)return;let ft=performance.now();W.add(_t.t,_t,_t.lvl,Y);let At=W.solve();if(!At||!k.last)return;let Ct=k.last,lt=Math.cos(At.off*nn),vt=Math.sin(At.off*nn),Nt={x:lt*Ct.x-vt*Ct.y+At.tx,y:vt*Ct.x+lt*Ct.y+At.ty},ae=Math.min(1,At.n/12),Te=!gt.ok,Ze=gt.update(Nt,{x:Ct.x,y:Ct.y},At.off,ae);if(Ze==="hold")return;let Pe=Ot.idx+At.df;t.floors.includes(Pe)&&(I.f=Pe),I.conf=ae,I.off=gt.off,I.lastFix=ft,(Ze==="set"||Ze==="snap")&&(Tt=!0),Te&&(f.coach.hidden=!0,va(40)),Qt=0,P=!1,we("ok",`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Je(I.f)}`),ft-k.fixT>2e3&&(k.fixT=ft,q.postMessage({type:"fix",fix:{f:I.f,x:Nt.x,y:Nt.y,yaw:Ct.yaw+gt.off,conf:.8},yaw:Ct.yaw}))}function It(){return O?io($l(O))*180/Math.PI:null}function Gt(z,Y){if(g)return;let _t=performance.now();if(Y&&k.q.delete(Y),Zt)if(z.ok&&be&&z.f===be.to&&z.conf>.2)F();else return;if(C){gt.ok||we("searching","\uC8FC\uBCC0\uC744 \uBE44\uCD94\uBA70 \uBA87 \uAC78\uC74C \uAC78\uC5B4 \uC8FC\uC138\uC694");return}if(z.ok&&I.ok){if(z.f!==I.f||Math.hypot(z.x-I.x,z.y-I.y)>5){let At=I.jump;if(I.jump={f:z.f,x:z.x,y:z.y},!At||At.f!==z.f||Math.hypot(At.x-z.x,At.y-z.y)>2.5)return}I.jump=null}if(z.ok){let ft=!I.ok;I.off=z.off,Object.assign(I,{ok:!0,x:z.x,y:z.y,f:z.f,yaw:z.yaw,conf:z.conf,lastFix:_t}),z.off!=null&&O&&z.conf>.35&&dt.add(z.off,z.conf),ft&&(f.coach.hidden=!0,va(40)),Qt=0,P=!1,we(z.conf>.35?"ok":"weak",z.conf>.35?`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Je(z.f)}`:`\uC704\uCE58\uAC00 \uC870\uAE08 \uBD88\uD655\uC2E4\uD574\uC694 \xB7 ${Je(z.f)}`),bt()}else I.ok&&_t-I.lastFix>Yl*1e3&&!(C&&gt.ok)&&(I.ok=!1),(!I.ok||_t-I.lastFix>3e3)&&(Qt=Qt||_t,we("searching",I.ok?"\uC704\uCE58\uB97C \uB2E4\uC2DC \uB9DE\uCD94\uB294 \uC911":"\uC8FC\uBCC0\uC744 \uCC9C\uCC9C\uD788 \uBE44\uCDB0 \uC8FC\uC138\uC694"),I.ok||(f.coach.hidden=!1),!P&&_t-Qt>6e3&&(P=!0,an.say("\uD734\uB300\uD3F0\uC744 \uC138\uC6CC\uC11C \uCC9C\uCC9C\uD788 \uC88C\uC6B0\uB85C \uBE44\uCDB0 \uC8FC\uC138\uC694")))}function Kt(z){let Y=performance.now();for(Ft.push({yaw:z,t:Y});Ft.length&&Y-Ft[0].t>5e3;)Ft.shift();if(Ft.length<6||!I.ok||V.s==null||B.n%2)return;let _t=Ft.slice(-6).map(Pe=>Pe.yaw),ft=0,At=0;for(let Pe of _t)ft+=Math.cos(Pe*nn),At+=Math.sin(Pe*nn);let Ct=Math.atan2(At,ft)/nn;if(_t.some(Pe=>Math.abs(di(Pe,Ct))>10))return;let lt=on(c,$t,Math.max(0,V.s-3)),vt=on(c,$t,V.s+1),Nt=on(c,$t,V.s+5);if(lt.f!==I.f||Nt.f!==I.f)return;let ae=(Pe,bn)=>Math.atan2(bn.y-Pe.y,bn.x-Pe.x)/nn;if(Math.abs(di(ae(lt,vt),ae(vt,Nt)))>8)return;let Te=di(ae(lt,Nt),Ct),Ze=xt(performance.now());Ze==null||Math.abs(di(Te,Ze))>45||dt.add(Te,2.5)}function Bt(z){g||Zt||!I.ok||z.f!==I.f||(I.x=z.x,I.y=z.y,bt())}function Yt(z){be=z,R.add(z.s),C&&W.clear(),an.say(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Je(z.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`),va([30,60,30]);let Y=c.pts.find((_t,ft)=>_t.kind==="elev"&&_t.f===z.to&&c.pts[ft-1]?.kind==="elev");Y&&q.postMessage({type:"lift",f:z.to,x:Y.x,y:Y.y}),Zt=Hl({from:z.f,to:z.to,title:`${cn(z.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`,hint:"\uB0B4\uB9B0 \uB4A4 \uD734\uB300\uD3F0\uC744 \uC138\uC6CC \uBCF5\uB3C4\uB97C \uBE44\uCD94\uBA74 \uC774\uC5B4\uC11C \uC548\uB0B4\uD574\uC694",hold:!0,onSkip:()=>F(!0)})}function F(z=!1){if(!Zt)return;let Y=be;z||Zt.arrive(),Zt=null,Ht=Y.s,I.f=Y.to,C&&k.last&&(Ot.reset(k.last.h,k.last.h-k.eye),Ot.shift(Y.to-Y.f)),V.init=!1,an.say(`${Je(Y.to)}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`),Tt=!0}function mt(z,Y){let _t=z.step,ft=Math.round(z.dist);return _t.kind==="arrive"?Y.remain<3?`${e.title} \uB3C4\uCC29`:`${Math.round(Y.remain)}m \uC55E ${e.title}`:_t.kind==="stair"||_t.kind==="elev"?z.dist<3?_t.text:`${ft}m \uC55E ${_t.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"}`:z.dist<4?`\uC9C0\uAE08 ${_t.action}`:`${ft}m \uC55E\uC5D0\uC11C ${_t.action}`}function bt(){if(Zt)return;let z=Ca(c,$t,I,Ht);if(!z)return;if(z.off>6){if(I.conf>.4&&++kt>=4){kt=0;let vt=t.routeTo({f:I.f,x:I.x,y:I.y},e,{mode:n});vt&&(c=vt,$t=es(c),Lt=ir(c,e,{landmarks:t.destinations}),Ht=0,zt=-1,Me.clear(),Tt=!0,a?.(c,Lt),ie("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"),an.say("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"))}return}kt=0,Ht=Math.max(Ht-1,z.s);let Y=uo(Lt,c,$t,z.s);Y.index!==zt&&(zt=Y.index,va(25),Tt=!0);let _t=Y.step;f.arrow.dataset.dir=_t.dir,f.step.textContent=mt(Y,z);let ft=Lt[Y.index+1];f.sub.textContent=_t.kind==="arrive"?_t.sub||"":ft?`${_t.text} \xB7 \uB2E4\uC74C: ${ft.text}`:_t.text,f.remain.textContent=`\uB0A8\uC740 \uAC70\uB9AC ${Math.round(z.remain)}m \xB7 \uC57D ${Ia(z.remain)}`,Qe("#ar-distance").textContent=`${e.title}\uAE4C\uC9C0 ${Math.round(z.remain)}m`;let At=Y.index*2,Ct=At+1,lt=I.conf>.3;if(lt&&_t.kind!=="arrive"&&Y.dist<15&&Y.dist>=4&&!Me.has(At)?(Me.add(At),an.say(`${Math.round(Y.dist)}\uBBF8\uD130 \uC55E, ${_t.text}`)):lt&&Y.dist<4&&!Me.has(Ct)&&_t.kind!=="elev"&&(Me.add(Ct),an.say(_t.kind==="arrive"?`${e.title}, ${_t.side||""}`:_t.text)),_t.kind==="elev"&&Y.dist<3&&I.f===_t.f&&!R.has(_t.s)&&Yt(_t),z.remain<2.5&&I.f===c.pts[c.pts.length-1].f&&!ve){ve=!0,va([60,40,60]);let vt=Lt[Lt.length-1].side;f.arrive.querySelector("b").textContent=`${e.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694${vt&&vt!=="\uC815\uBA74"?` \xB7 \uBB38\uC740 ${vt}`:""}`,f.arrive.hidden=!1}I.s=z.s}let Dt=new jr({canvas:u,antialias:!0,alpha:!0});Dt.setPixelRatio(Math.min(devicePixelRatio,2)),Dt.setClearColor(0,0);let yt=new hi;yt.add(new ks(16777215,8943530,2.2));let A=new tn(60,1,.05,200),K=new sn;yt.add(K);let et=(z,Y,_t)=>new L(z,_t,-Y),ct=(()=>{let z=document.createElement("canvas");z.width=64,z.height=64;let Y=z.getContext("2d");Y.fillStyle="rgba(121,80,255,0.78)",Y.fillRect(0,0,64,64),Y.strokeStyle="#fff",Y.lineWidth=9,Y.lineCap="round",Y.lineJoin="round",Y.beginPath(),Y.moveTo(14,44),Y.lineTo(32,22),Y.lineTo(50,44),Y.stroke();let _t=new zi(z);return _t.wrapS=_t.wrapT=jn,_t.colorSpace=Ke,_t})(),ot=new Oe({map:ct,transparent:!0,depthWrite:!1,side:Le}),Et=null,Tt=!0;function me(z){let Y=z+15;for(let _t=1;_t<Lt.length;_t++){let ft=Lt[_t];if(!(ft.s<=z+.8)){if(ft.s>Y)break;if(ft.kind==="walk"&&ft.dir!=="straight"&&ft.dir!=="start")return ft.s+1.2;if(ft.kind!=="walk"&&ft.kind!=="start")return ft.s}}return Math.min(Y,$t[$t.length-1])}function te(z){if(Et&&(K.remove(Et),Et.geometry.dispose()),Et=null,!I.ok)return;let Y=z??I.s??0,_t=Math.max(0,Y+.8),ft=me(Y),At=t.FL(I.f).z,Ct=[];for(let Pe=_t;Pe<=ft+1e-6;Pe+=.5){let bn=on(c,$t,Math.min(Pe,ft));if(bn.f!==I.f||Math.abs(bn.z-At)>.3)break;Ct.push({...bn,z:At})}if(Ct.length<2)return;let lt=[],vt=[],Nt=[],ae=.6,Te=0;for(let Pe=0;Pe<Ct.length;Pe++){let bn=Ct[Math.max(0,Pe-1)],tr=Ct[Math.min(Ct.length-1,Pe+1)],On=tr.x-bn.x,Ci=tr.y-bn.y,Ta=Math.hypot(On,Ci)||1;On/=Ta,Ci/=Ta;let _s=Ct[Pe];Pe&&(Te+=Math.hypot(_s.x-Ct[Pe-1].x,_s.y-Ct[Pe-1].y)/ae);let Yf=_s.z+.03;if(lt.push(_s.x-Ci*ae*.5,Yf,-(_s.y+On*ae*.5),_s.x+Ci*ae*.5,Yf,-(_s.y-On*ae*.5)),vt.push(0,Te,1,Te),Pe){let er=Pe*2;Nt.push(er-2,er-1,er,er,er-1,er+1)}}let Ze=new He;Ze.setAttribute("position",new Ce(lt,3)),Ze.setAttribute("uv",new Ce(vt,2)),Ze.setIndex(Nt),Et=new fe(Ze,ot),Et.renderOrder=1,K.add(Et)}let ue=new Oe({color:7950591,transparent:!0,side:Le,depthWrite:!1}),Ee=new Bi({color:16777215,transparent:!0}),de=(()=>{let Y=new fs;Y.moveTo(0,.55*1.5),Y.lineTo(.42*1.5,.1*1.5),Y.lineTo(.16*1.5,.1*1.5),Y.lineTo(.16*1.5,-.45*1.5),Y.lineTo(-.16*1.5,-.45*1.5),Y.lineTo(-.16*1.5,.1*1.5),Y.lineTo(-.42*1.5,.1*1.5),Y.closePath();let _t=new Fs(Y);_t.rotateX(-Math.PI/2);let ft=new fe(_t,ue),At=new Ls(new Wo(_t),Ee),Ct=new sn;return Ct.add(ft,At),Ct.renderOrder=2,Ct.visible=!1,K.add(Ct),Ct})(),Wt=(()=>{let z=new sn,Y=new Hi({color:5451986,emissive:2758016}),_t=new fe(new Os(.22,20,14),Y);_t.position.y=1.9;let ft=new fe(new Go(.16,.6,16),Y);ft.rotation.x=Math.PI,ft.position.y=1.55;let At=document.createElement("canvas");At.width=256,At.height=80;let Ct=At.getContext("2d");Ct.fillStyle="#5330d2",Ct.beginPath(),Ct.roundRect(4,4,248,72,36),Ct.fill(),Ct.fillStyle="#fff",Ct.font="bold 40px 'Noto Sans KR', sans-serif",Ct.textAlign="center",Ct.textBaseline="middle",Ct.fillText(e.title,128,42);let lt=new zi(At);lt.colorSpace=Ke;let vt=new Uo(new Lr({map:lt,depthTest:!1,sizeAttenuation:!1}));return vt.scale.set(.2,.0625,1),vt.position.y=2.45,vt.renderOrder=5,z.add(_t,ft,vt),K.add(z),z})();function se(){let z=l.clientWidth,Y=l.clientHeight;Dt.setSize(z,Y,!1);let _t=h.videoWidth||16,ft=h.videoHeight||9,At;if(m)At=2*Math.atan(m.K[5]/2/m.K[1]);else{let Nt=Math.max(_t,ft)/2/Math.tan(y/2*nn);At=2*Math.atan(ft/2/Nt)}let Ct=_t/ft,lt=z/Y,vt=lt<=Ct?At:2*Math.atan(Math.tan(At/2)*Ct/lt);A.fov=vt/nn,A.aspect=lt,A.updateProjectionMatrix()}addEventListener("resize",se),h.onloadedmetadata=se,se();let Ie=new he;function Fe(z,Y,_t,ft){let At=(Ct,lt)=>{let vt=[z[Ct]*lt,z[3+Ct]*lt,z[6+Ct]*lt];return new L(vt[0],vt[2],-vt[1])};Ie.makeBasis(At(0,1),At(1,-1),At(2,-1)),A.quaternion.setFromRotationMatrix(Ie),A.position.copy(et(Y,_t,ft))}let ee=f.mini.getContext("2d");function De(z){let Y=f.mini.width,_t=4.2;if(ee.setTransform(1,0,0,1,0,0),ee.clearRect(0,0,Y,Y),!I.ok)return;ee.save(),ee.translate(Y/2,Y/2),ee.rotate((z-90)*Math.PI/180);let ft=(lt,vt)=>[(lt-V.x)*_t,-(vt-V.y)*_t],At=t.FL(I.f);for(let lt of At.rooms)ee.beginPath(),lt.poly.forEach((vt,Nt)=>{let ae=ft(vt[0],vt[1]);Nt?ee.lineTo(ae[0],ae[1]):ee.moveTo(ae[0],ae[1])}),ee.closePath(),ee.fillStyle=lt.id===e.id&&I.f===e.f?"#7950ff55":"#e9e5f1",ee.fill(),ee.strokeStyle="#cfc8e0",ee.lineWidth=1,ee.stroke();ee.strokeStyle="#7950ff",ee.lineWidth=5,ee.lineCap=ee.lineJoin="round",ee.beginPath();let Ct=!1;for(let lt of c.pts){if(lt.f!==I.f){Ct=!1;continue}let vt=ft(lt.x,lt.y);Ct?ee.lineTo(vt[0],vt[1]):ee.moveTo(vt[0],vt[1]),Ct=!0}ee.stroke(),ee.restore(),ee.fillStyle="#3d8bff33",ee.beginPath(),ee.moveTo(Y/2,Y/2),ee.arc(Y/2,Y/2,46,-Math.PI/2-.45,-Math.PI/2+.45),ee.fill(),ee.fillStyle="#3d8bff",ee.strokeStyle="#fff",ee.lineWidth=4,ee.beginPath(),ee.arc(Y/2,Y/2,10,0,Math.PI*2),ee.fill(),ee.stroke()}let rn=T?document.createElement("pre"):null,Fn=0;rn&&(rn.className="ar-debug",l.append(rn));let hn=0,ii=0,gn=performance.now();h.onseeked=()=>q.postMessage({type:"reset"});let E=0;function H(z){if(g)return;requestAnimationFrame(H);let Y=Math.min(.1,(z-gn)/1e3);if(gn=z,Rt&&!Ut&&!X&&z-hn>200&&h.readyState>=2){m&&h.currentTime<E-1&&q.postMessage({type:"reset"}),E=h.currentTime;let lt=U(),vt=null;if(m?vt=Pf(0,S):O?vt=$l(O):vt=Pf(0,-8*nn),lt&&vt&&!m&&O&&!p){x=x||new zl(Math.max(lt.raw.w,lt.raw.h),v||null);let Nt=x.add(Xm(lt.raw.g,lt.raw.w,lt.raw.h),vt,z/1e3);if(Nt&&Math.abs(Nt-y)>.4){y=Nt,se();try{localStorage.setItem("sai-ar-fov",Nt.toFixed(1))}catch{}}}if(lt&&vt&&!m&&O&&St(lt,vt,z),lt&&vt){let Nt=Math.asin(vt[8])/nn;if(!m&&(Nt<-35||Nt>25))we("weak",Nt<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{let ae=Sf(lt.img,lt.K,vt),Te=m||!O?null:io(vt)*180/Math.PI,Ze=hn?Math.min(2,(z-hn)/1e3):0;Ze&&q.postMessage({type:"tick",dt:Ze,yaw:Te,hasSensor:Te!=null,pdr:B.on}),Ut=!0,hn=z,q.postMessage({type:"query",id:++qt,q:ae,yaw:Te,floorHint:be&&Zt?be.to:on(c,$t,Ht).f},[ae.buffer])}}Ge(z)}let _t=xt(z);if(_t!=null)if(at==null)at=_t;else{let lt=di(_t,at);at+=lt*Math.min(1,Y*(Math.abs(lt)>8?2:.7))}if(I.ok){let lt=I.x,vt=I.y,Nt=Ca(c,$t,I,Ht);if(Nt&&Nt.off<3){let Te=Nt.s;V.s!=null&&Te<V.s-1&&!V.back?(V.back=!0,Te=V.s):V.back=!1;let Ze=on(c,$t,Te);lt=Ze.x,vt=Ze.y,V.s=Te}else V.s=null;V.init||Object.assign(V,{x:lt,y:vt,yaw:I.yaw,init:!0});let ae=Math.min(1,Y*2.5);V.x+=(lt-V.x)*ae,V.y+=(vt-V.y)*ae,m&&(V.yaw+=di(I.yaw,V.yaw)*Math.min(1,Y*3))}let ft=V.yaw,At;if(!m&&O){let lt=$l(O);At=Ma(Lf((at??0)*nn),lt),ft=io(At)*180/Math.PI}else At=Pf(V.yaw*nn,S);let Ct=t.FL(I.f).z+SS;Fe(At,V.x,V.y,Ct),Q(z,Y,ft)}function Q(z,Y,_t){let ft=V.s??I.s;(Tt||I.ok&&Math.abs((ft??0)-(te.s??-99))>1)&&(te(ft),te.s=ft??0,Tt=!1),ct.offset.y-=Y*1.6;let At=(z-I.lastFix)/1e3,Ct=I.ok&&!Zt&&At<Yl&&(m||!O||at!=null);ii+=((Ct?1:0)-ii)*Math.min(1,Y*4);let lt=ii*(At>Yl-3?Math.max(0,(Yl-At)/3):1);ot.opacity=lt*.9,ue.opacity=Ee.opacity=lt,Et&&(Et.visible=lt>.02);let vt=c.pts[c.pts.length-1];if(Wt.visible=lt>.02&&vt.f===I.f&&Math.hypot(vt.x-V.x,vt.y-V.y)<35,Wt.position.copy(et(vt.x,vt.y,t.FL(vt.f).z)),Wt.children[0].position.y=1.9+Math.sin(z/300)*.05,de.visible=!1,lt>.02&&ft!=null){let Nt=uo(Lt,c,$t,ft);if(Nt.dist<15&&Nt.step.kind==="walk"&&Nt.step.dir!=="straight"){let bn=ft+Nt.dist,tr=on(c,$t,bn),On=on(c,$t,bn+.9),Ci=on(c,$t,bn+3);if(On.f===I.f&&tr.f===I.f&&Math.hypot(Ci.x-On.x,Ci.y-On.y)>.3){de.visible=!0;let Ta=Math.atan2(Ci.y-On.y,Ci.x-On.x)/nn;de.position.copy(et(On.x,On.y,t.FL(I.f).z+.04)),de.rotation.set(0,(Ta-90)*nn,0)}}let ae=Nt.dist<3?Nt.step.dir:"straight";f.arrow.dataset.icon!==ae&&(ao(f.arrow,ae,!0),f.arrow.dataset.icon=ae);let Te=on(c,$t,ft+4),Ze=di(Math.atan2(Te.y-V.y,Te.x-V.x)/nn,_t),Pe=Math.abs(Ze)>55?Math.abs(Ze)>135?"\uACBD\uB85C\uAC00 \uB4A4\uCABD\uC5D0 \uC788\uC5B4\uC694 \xB7 \uB3CC\uC544\uC11C \uBCF4\uC138\uC694":Ze>0?"\u2190 \uACBD\uB85C\uAC00 \uC67C\uCABD\uC5D0 \uC788\uC5B4\uC694":"\uACBD\uB85C\uAC00 \uC624\uB978\uCABD\uC5D0 \uC788\uC5B4\uC694 \u2192":"";Pe&&(f.sub.textContent=Pe),f.sub.classList.toggle("hint",!!Pe)}rn&&z-Fn>300&&(Fn=z,rn.textContent=[C?`WebXR(VIO) ${k.tracking?"\uCD94\uC801 \uC911":"\uCD94\uC801 \uB04A\uAE40"} \xB7 \uC815\uB82C ${gt.ok?`${gt.n}\uD68C`:"-"} \xB7 \uB192\uC774 ${k.last?k.last.h.toFixed(2):"-"}m \xB7 \uC9C8\uC758 ${Math.round(G)}ms`:`\uC13C\uC11C ${O?"\uCF1C\uC9D0":"\uC5C6\uC74C"} \xB7 \uAC78\uC74C ${B.on?B.n||0:"\uC5C6\uC74C"} \xB7 \uC9C8\uC758 ${Math.round(G)}ms`,`\uD654\uAC01 ${y.toFixed(1)}\xB0 ${p?"(\uC8FC\uC18C)":x?`(\uBCF4\uC815 \uD45C\uBCF8 ${x.samples.length})`:""}`,`\uBC29\uD5A5\uAE30\uC900 ${at==null?"-":at.toFixed(1)} / \uC18C\uC2E4\uC810 ${ut.value==null?"-":ut.value.toFixed(1)} (${ut.n}) / \uC0AC\uC9C4\xB7\uAC78\uC74C ${dt.value==null?"-":dt.value.toFixed(1)} (${dt.n})`,`\uC704\uCE58 ${I.ok?"OK":"--"} ${cn(I.f)} (${I.x.toFixed(1)}, ${I.y.toFixed(1)}) \uC2E0\uB8B0 ${I.conf.toFixed(2)}`].join(`
`)),De(_t),Dt.render(yt,A)}let k={q:new Map,last:null,mx:0,my:0,tracking:!1,eye:1.35,progT:0,fixT:0,nq:0},W=new Xl,gt=new ya,Ot=new Wl(t.M.FH||4),jt=null,Xt=null;function le(z,Y){if(g)return;let _t=Math.min(.1,(z-gn)/1e3);gn=z;let ft=Y?.getViewerPose(Dt.xr.getReferenceSpace()),At=V.yaw;if(ft){let Ct=ft.views[0],lt=Jm(Ct.transform.matrix),vt=k.tracking;if(k.tracking=!ft.emulatedPosition,k.last&&k.tracking&&vt){let Nt=lt.x-k.last.x,ae=lt.y-k.last.y;Math.hypot(Nt,ae)<1.5&&!Zt&&(k.mx+=Nt,k.my+=ae)}if(k.last={...lt,yaw:ql(lt.R)},k.tracking&&!Zt){let Nt=Ot.update(lt.h);Nt?(q.postMessage({type:"shiftFloor",d:Nt}),t.floors.includes(I.f+Nt)&&(I.f+=Nt),Tt=!0):Math.abs(lt.h-Ot.floorY-k.eye)<.4&&(k.eye+=(lt.h-Ot.floorY-k.eye)*.01)}if(Rt&&!Ut&&!X&&k.tracking&&z-hn>200&&Ct.camera){let Nt=Xt.grab(Ct.camera);if(Nt){let ae=Qm(Ct.projectionMatrix,Nt.w,Nt.h),Te={img:{data:bf(Nt.g,Nt.w,Nt.h,Ef(ae.fx)),w:Nt.w,h:Nt.h},K:ae,raw:Nt};St(Te,lt.R,z);let Ze=Math.asin(lt.R[8])/nn;if(Ze<-35||Ze>25)we("weak",Ze<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{(k.mx||k.my)&&q.postMessage({type:"move",dx:k.mx,dy:k.my}),k.mx=k.my=0;let Pe=Sf(Te.img,Te.K,lt.R);Ut=!0,hn=z;let bn=ql(lt.R);k.q.set(++qt,{x:lt.x,y:lt.y,yaw:bn,lvl:Ot.idx,t:z/1e3});let tr=gt.ok?I.f:on(c,$t,Ht).f,On=++k.nq%4===0?t.floors:[tr];k.q.size>20&&k.q.delete(k.q.keys().next().value),q.postMessage({type:"query",id:qt,q:Pe,yaw:bn,xr:!0,floors:On,floorHint:be&&Zt?be.to:on(c,$t,Ht).f},[Pe.buffer])}}}if(gt.ok&&!Zt){let Nt=gt.toBuilding(lt.x,lt.y);I.x=Nt.x,I.y=Nt.y,I.ok=!0,k.tracking&&(I.lastFix=z),At=ql(lt.R)+gt.off,I.yaw=At;let ae=Ca(c,$t,I,Ht);V.x=Nt.x,V.y=Nt.y,V.yaw=At,V.init=!0,V.s=ae&&ae.off<3?ae.s:null,z-k.progT>200&&(k.progT=z,bt());let Te=tg(gt,Ot.floorY-t.FL(I.f).z);K.rotation.set(0,Te.rotY,0),K.position.set(Te.px,Te.py,Te.pz)}}gt.ok?K.visible=!0:K.visible=!1,Q(z,_t,At)}if(C)try{jt=await Km(Dt,l),Xt=new Gl(Dt,220,w.has("xrflip")),l.classList.add("xr"),jt.addEventListener("end",()=>{g||ye()}),Dt.setAnimationLoop(le)}catch{C=!1,ie("\uC774 \uAE30\uAE30\uB294 \uAE30\uBCF8 AR \uBC29\uC2DD\uC73C\uB85C \uC548\uB0B4\uD574\uC694");try{await N()}catch(Y){We(Y)}requestAnimationFrame(H)}else requestAnimationFrame(H);let oe=Qe("#ar-floors");oe.replaceChildren();for(let z of t.floors){let Y=document.createElement("button");Y.type="button",Y.textContent=cn(z),Y.onclick=()=>{oe.hidden=!0,q.postMessage({type:"floor",f:z}),I.ok=!1,I.f=z,C&&(Ot.idx=0,W.clear(),gt.off=null),V.init=!1,we("searching",`${Je(z)}\uC5D0\uC11C \uC704\uCE58\uB97C \uCC3E\uB294 \uC911`),ie(`${Je(z)}\uB85C \uB9DE\uCDC4\uC5B4\uC694`)},oe.append(Y)}f.status.onclick=()=>{for(let z of oe.children)z.classList.toggle("on",z.textContent===cn(I.f));oe.hidden=!oe.hidden};let ne=m?null:new URLSearchParams(location.search).get("loc"),pe=ne?document.createElement("canvas"):null,Ne=!1,$e=0;function Ge(z){if(!ne||Ne||z-$e<1500||!O)return;let Y=h.videoWidth,_t=h.videoHeight;if(!Y)return;Ne=!0,$e=z;let ft=640/Math.max(Y,_t);pe.width=Math.round(Y*ft),pe.height=Math.round(_t*ft),pe.getContext("2d").drawImage(h,0,0,pe.width,pe.height);let At=$l(O),Ct=io(At)*180/Math.PI,lt={R:At,fovLong:y,prior:I.ok?{f:I.f,x:I.x,y:I.y,yaw:I.yaw}:{f:on(c,$t,Ht).f}};pe.toBlob(async vt=>{try{let Nt=new FormData;Nt.append("image",vt,"q.jpg"),Nt.append("meta",JSON.stringify(lt));let Te=await(await fetch(ne,{method:"POST",body:Nt})).json();!g&&Te&&Te.ok&&q.postMessage({type:"fix",fix:Te,yaw:Ct})}catch{}Ne=!1},"image/jpeg",.7)}function we(z,Y){f.status.className=`ar-status ${z}`,f.status.textContent=Y}function ie(z){let Y=Qe("#toast");Y.textContent=z,Y.hidden=!1,clearTimeout(ie.h),ie.h=setTimeout(()=>Y.hidden=!0,2600)}function We(z){f.err.hidden=!1,f.coach.hidden=!0,f.err.focus({preventScroll:!0});let Y=z.code==="insecure",_t=z.name==="NotAllowedError";f.err.querySelector("b").textContent=Y?"HTTPS\uC5D0\uC11C \uC5F4\uC5B4 \uC8FC\uC138\uC694":_t?"\uCE74\uBA54\uB77C \uAD8C\uD55C\uC774 \uD544\uC694\uD574\uC694":"\uCE74\uBA54\uB77C\uB97C \uCF24 \uC218 \uC5C6\uC5B4\uC694",f.err.querySelector("p").textContent=Y?"\uCE74\uBA54\uB77C\uB97C \uC0AC\uC6A9\uD558\uB824\uBA74 \uBCF4\uC548 \uC5F0\uACB0(HTTPS)\uB85C \uC811\uC18D\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":_t?"\uBE0C\uB77C\uC6B0\uC800 \uC124\uC815\uC5D0\uC11C \uC774 \uC0AC\uC774\uD2B8\uC758 \uCE74\uBA54\uB77C \uC811\uADFC\uC744 \uD5C8\uC6A9\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":`${z.message||z} \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C AR \uAE38\uC548\uB0B4\uB97C \uCCB4\uD5D8\uD560 \uC218 \uC788\uC5B4\uC694.`}function ye(){g||(g=!0,q.terminate(),Zt?.close(),M?.release?.().catch(()=>{}),document.removeEventListener("visibilitychange",j),an.supported&&speechSynthesis.cancel(),removeEventListener("deviceorientation",tt),removeEventListener("devicemotion",pt),Dt.setAnimationLoop(null),jt&&jt.end().catch(()=>{}),Xt?.dispose(),l.classList.remove("xr"),removeEventListener("resize",se),_?.getTracks().forEach(z=>z.stop()),h.pause(),h.removeAttribute("src"),h.srcObject=null,h.load(),Dt.dispose(),rn?.remove(),Et?.geometry.dispose(),l.hidden=!0,o?.())}Qe("#ar-close").onclick=ye,Qe("#ar-error-close").onclick=ye,Qe("#ar-arrive-close").onclick=ye;let Sn=Qe("#ar-again");return Sn.hidden=!m,Sn.onclick=()=>{f.arrive.hidden=!0,ve=!1,c=i.route,$t=es(c),Lt=i.steps||ir(c,e,{landmarks:t.destinations}),Ht=0,zt=-1,Tt=!0,I.ok=!1,V.init=!1,Me.clear(),R.clear(),q.postMessage({type:"reset"}),h.currentTime=0,h.play().catch(()=>{})},h.onended=()=>{!m||g||(ve||(f.arrive.querySelector("b").textContent="\uB370\uBAA8 \uC601\uC0C1\uC774 \uB05D\uB0AC\uC5B4\uC694"),f.arrive.hidden=!1)},Qe("#ar-demo").onclick=()=>{ye(),i.onDemo?.()},{close:ye}}var nn,Qe,SS,Yl,bS,va,di,Ma,Lf,ES,wS,TS,ig=qe(()=>{ei();wf();rh();ho();Wm();Ym();Cf();If();jm();eg();nn=Math.PI/180,Qe=i=>document.querySelector(i),SS=1.35,Yl=15,bS=65,va=i=>{navigator.userActivation?.hasBeenActive&&navigator.vibrate?.(i)},di=(i,t)=>((i-t)%360+540)%360-180,Ma=(i,t)=>{let e=new Array(9);for(let n=0;n<3;n++)for(let s=0;s<3;s++)e[n*3+s]=i[n*3]*t[s]+i[n*3+1]*t[3+s]+i[n*3+2]*t[6+s];return e},Lf=i=>[Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i),0,0,0,1],ES=i=>[1,0,0,0,Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i)],wS=i=>[Math.cos(i),0,Math.sin(i),0,1,0,-Math.sin(i),0,Math.cos(i)],TS=[1,0,0,0,-1,0,0,0,-1]});function rg(i,t){let e=t.map(s=>({key:`entrance:${s.id}`,id:s.id,kind:"entrance",title:s.name,name:"",cat:"entrance",catLabel:"\uCD9C\uC785\uAD6C",f:s.f,center:s.p,doors:[s.p]})),n=s=>e.find(r=>r.key===s)||i.findDest(s);return{resolve:n,forStart(s){return s?n(s.kind==="entrance"?`entrance:${s.id}`:s.id):null},search(s,r={},o=6){let a=xs(s);if(!a){let u=i.destinations.filter(f=>f.numbered).sort((f,d)=>+(f.f!==r.floor)-+(d.f!==r.floor));return{places:[...e,...u].slice(0,o),suggested:!1}}let c=e.filter(u=>xs(`${u.title} \uCD9C\uC785\uAD6C ${u.id}`).includes(a)),l=i.search(s,o,r),h=[...c,...l];return h.length?{places:h.slice(0,o),suggested:!1}:{places:[...i.suggest(s,o,r),...Aa(a,e,u=>[u.title,u.id])].slice(0,o),suggested:!0}}}}var sg,og=qe(()=>{th();sg=i=>i?`${i.title}${i.name?" "+i.name:""}`:""});function ag({input:i,panel:t,list:e,hint:n,clear:s,getMatches:r,onChoose:o,onEdit:a}){let c=[],l=-1,h="";function u(){c=[],l=-1,t.hidden=!0,i.setAttribute("aria-expanded","false"),i.removeAttribute("aria-activedescendant")}function f(){s.hidden=!i.value}function d(p){h=p,i.value=p,i.removeAttribute("aria-invalid"),f(),u()}function g(p){d(`${p.title}${p.name?" "+p.name:""}`),o(p),i.blur()}function _(p=!1){if(u(),!p&&h&&i.value===h)return;let v=r(p&&i.value===h?"":i.value);c=v.places,n.textContent=c.length?v.suggested?"\uCD94\uCC9C \uC7A5\uC18C":"\uAC80\uC0C9 \uACB0\uACFC":"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694. \uD638\uC2E4 \uBC88\uD638\uB098 \uC774\uB984 \uC77C\uBD80\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.",e.replaceChildren(...c.map((y,x)=>{let w=document.createElement("li");w.id=`${e.id}-${x}`,w.dataset.key=y.key,w.setAttribute("role","option"),w.setAttribute("aria-selected","false");let T=document.createElement("b");T.textContent=`${y.title}${y.name?" "+y.name:""}`;let C=document.createElement("small");return C.textContent=`${y.f===0?"\uC9C0\uD558 1":y.f}\uCE35 \xB7 ${y.catLabel}`,w.append(T,C),w.onpointerdown=N=>{N.pointerType==="mouse"&&N.preventDefault()},w.onclick=()=>g(y),w})),t.hidden=!1,i.setAttribute("aria-expanded","true")}function m(){h="",i.removeAttribute("aria-invalid"),f(),a(),_()}return i.addEventListener("input",m),i.addEventListener("focus",()=>{i.select(),_()}),i.addEventListener("blur",()=>{i.value.trim()&&!h&&i.setAttribute("aria-invalid","true")}),s.onclick=()=>{i.value="",m(),i.focus()},document.addEventListener("focusin",p=>{p.target!==i&&!t.contains(p.target)&&u()}),document.addEventListener("pointerdown",p=>{p.target!==i&&!t.contains(p.target)&&u()}),i.addEventListener("keydown",p=>{if(!(p.isComposing||p.keyCode===229)){if(p.key==="Escape")p.preventDefault(),u();else if(p.key==="Enter")p.preventDefault(),c.length?g(c[l>=0?l:0]):!h&&i.value.trim()&&i.setAttribute("aria-invalid","true");else if(p.key==="ArrowDown"||p.key==="ArrowUp"){if(p.preventDefault(),t.hidden&&_(!0),!c.length)return;l>=0&&e.children[l].setAttribute("aria-selected","false");let v=p.key==="ArrowDown"?1:-1;l=l<0?v>0?0:c.length-1:(l+v+c.length)%c.length;let y=e.children[l];y.setAttribute("aria-selected","true"),i.setAttribute("aria-activedescendant",y.id),y.scrollIntoView({block:"nearest"})}}}),{setValue:d,close:u,focus:()=>i.focus()}}var cg=qe(()=>{});function lg(i,t,e,n,s){return Math.max(n,Math.min(s,i-t/e))}function hg(i,t,e,n){return Math.abs(t)>.45?t>0:i<(e+n)/2}var ug=qe(()=>{});function Df(i,t){let e=matchMedia("(max-width: 819px)"),n=null,s=null,r=!1,o=()=>i.classList.contains("collapsed");function a(d){i.classList.toggle("collapsed",d),t.setAttribute("aria-expanded",String(!d)),t.setAttribute("aria-label",d?"\uD328\uB110 \uD3BC\uCE58\uAE30":"\uD328\uB110 \uC811\uAE30")}function c(){s?.cancel(),s=null,i.classList.remove("panel-sizing"),i.style.removeProperty("height")}function l(d=!1){let g=n?.id;n=null,g!==void 0&&t.hasPointerCapture(g)&&t.releasePointerCapture(g),c(),r=!1,a(d&&e.matches)}function h(){let d=i.getBoundingClientRect().height,g=o();c(),i.classList.remove("collapsed");let _=i.getBoundingClientRect().height;i.classList.add("collapsed");let m=i.getBoundingClientRect().height;return i.classList.remove("collapsed"),i.classList.add("panel-sizing"),i.style.height=`${d}px`,{height:d,expanded:_,minimum:m,wasCollapsed:g}}function u(d,g){let _=i.getBoundingClientRect().height,m=g?d.minimum:d.expanded;i.style.height=`${m}px`;let p=()=>{c(),a(g)};if(matchMedia("(prefers-reduced-motion: reduce)").matches)return p();s=i.animate([{height:`${_}px`},{height:`${m}px`}],{duration:260,easing:"cubic-bezier(.22, 1, .36, 1)"}),s.onfinish=p}t.addEventListener("click",d=>{if(!e.matches)return;if(r&&d.detail!==0){r=!1;return}r=!1;let g=h();u(g,!g.wasCollapsed)}),t.addEventListener("pointerdown",d=>{!e.matches||d.button!==0||!d.isPrimary||(l(o()),document.activeElement?.blur(),n={...h(),id:d.pointerId,y:d.clientY,lastY:d.clientY,lastTime:d.timeStamp,velocity:0,moved:!1},t.setPointerCapture(d.pointerId))}),t.addEventListener("pointermove",d=>{if(!n||n.id!==d.pointerId)return;let g=d.clientY-n.y;n.moved||(n.moved=Math.abs(g)>4);let _=d.timeStamp-n.lastTime;_>0&&(n.velocity=(d.clientY-n.lastY)/_),n.lastY=d.clientY,n.lastTime=d.timeStamp,i.style.height=`${lg(n.height,g,1,n.minimum,n.expanded)}px`});function f(d,g=!1){if(!n||n.id!==d.pointerId)return;let _=n;if(n=null,t.hasPointerCapture(d.pointerId)&&t.releasePointerCapture(d.pointerId),r=_.moved,!_.moved&&!g){c(),a(_.wasCollapsed);return}let m=d.timeStamp-_.lastTime>100?0:_.velocity,p=g?_.wasCollapsed:hg(i.getBoundingClientRect().height,m,_.minimum,_.expanded);u(_,p)}return t.addEventListener("pointerup",d=>f(d)),t.addEventListener("pointercancel",d=>f(d,!0)),t.addEventListener("lostpointercapture",d=>f(d,!0)),e.addEventListener("change",()=>l()),window.addEventListener("resize",()=>l(o())),a(!1),{reset:l,collapse:()=>l(!0)}}var fg=qe(()=>{ug()});var OS=Tg(()=>{ho();rh();zm();ig();Cf();If();og();cg();fg();var Js="assets/",Mt=i=>document.querySelector(i),Qi=i=>[...document.querySelectorAll(i)],lo=new URLSearchParams(location.search),wt={start:null,dest:null,mode:"stairs",route:null,steps:null,focusStep:null,sheet:"home"},mn,re,js,Sa=null,Zl,Qs={};function Uf(i,t=2600){let e=Mt("#toast");e.textContent=i,e.hidden=!1,clearTimeout(Uf.h),Uf.h=setTimeout(()=>e.hidden=!0,t)}function je(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}async function AS(){let[i,t]=await Promise.all([fetch(Js+"mirae.json").then(c=>{if(!c.ok)throw new Error(`\uCE35 \uB370\uC774\uD130 ${c.status}`);return c.json()}),fetch(Js+"entrances.json").then(c=>c.json())]);mn=$f(i),js=t.entrances,Zl=rg(mn,js),re=km(Mt("#view"),mn,{onPick:CS}),RS(),await re.load(Js+"mirae.glb");let e=lo.get("from"),n=(c,l)=>c.campusNode===l||(c.campusNodes||[]).includes(l),s=js.find(c=>c.id===e||n(c,e)),r=!s&&e&&mn.findDest(e);Ea(r?Bf(r):Of(s||js[0])),s&&n(s,e)&&(Mt("#home-from").textContent=`\uCEA0\uD37C\uC2A4 \uACBD\uB85C\uAC00 ${s.name}\uB85C \uC774\uC5B4\uC84C\uC5B4\uC694. \uAC00\uB824\uB294 \uD638\uC2E4\uC744 \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694.`),lo.get("mode")==="elevator"&&Wf("elevator",!1),re.setFloor(wt.start.f,!0),Ri();let o=lo.get("to"),a=o&&(Zl.resolve(o)||mn.search(o)[0]);a?(wt.dest=a,gs()):(e||re.setFloor(1,!0),Ri()),lo.has("demo")&&qf(),Mg(),Mt("#loading-status").textContent="\uBBF8\uB798\uAD00 \uC2E4\uB0B4 \uC9C0\uB3C4 \uC900\uBE44\uAC00 \uC644\uB8CC\uB410\uC5B4\uC694",Mt("#loading").classList.add("done"),setTimeout(()=>Mt("#loading").hidden=!0,450)}function Of(i){return{kind:"entrance",id:i.id,name:i.name,f:i.f,x:i.p[0],y:i.p[1]}}function Bf(i){let t=i.doors[0],e=mn.nearest(i.f,t[0],t[1],6)||t;return{kind:"place",id:i.key,name:`${i.title}${i.name?" "+i.name:""}`,f:i.f,x:e[0],y:e[1]}}function Ea(i){wt.start=i,re.setMe(i),Qs.origin?.setValue(i?.name||"")}function pg(i){return i.kind==="entrance"?Of(js.find(t=>t.id===i.id)):Bf(i)}var Kl=Mt("#floor-overview");function kf(i){re.setFloorOverview(i),document.body.classList.toggle("floor-overview-open",i),Kl.setAttribute("aria-pressed",String(i)),Kl.lastElementChild.textContent=i?"\uD604\uC7AC \uCE35":"\uC804\uCCB4 \uCE35"}Kl.onclick=()=>kf(!re.floorOverview);function RS(){Kl.hidden=!1;let i=Mt("#floors");i.replaceChildren();for(let t of[...mn.floors].sort((e,n)=>n-e)){let e=je("button","",cn(t));e.type="button",e.dataset.f=t,e.setAttribute("aria-label",Je(t)),e.onclick=()=>zf(t),i.append(e)}}function zf(i){if(re.floorOverview&&kf(!1),i===re.floor)return;let t=i>re.floor;re.setFloor(i,!1,!0),re.frame({resetOrientation:!1,animate:!0}),re.setMe(wt.start),Ri();let e=Mt("#floor-badge");e.textContent=`${t?"\u25B2":"\u25BC"} ${cn(i)}`,e.classList.remove("show"),e.offsetWidth,e.classList.add("show")}Mt("#view-reset").onclick=()=>re?.frame({animate:!0});function Ri(){let i=new Set(wt.route?wt.route.pts.map(t=>t.f):[]);for(let t of Qi("#floors button"))t.classList.toggle("on",+t.dataset.f===re.floor),t.classList.toggle("has-route",i.has(+t.dataset.f)),t.setAttribute("aria-pressed",+t.dataset.f===re.floor);for(let t of Qi(".floor-tag[data-f]"))t.classList.toggle("current-floor",+t.dataset.f===re.floor);Mt("#search").hidden||Jl(Mt("#search-input").value)}function CS(i,t,e){let n=mn.roomAt(e,i,t),s=n&&mn.destinations.find(r=>r.f===e&&r.id===n.id);if(!s){let r=null;for(let o of mn.destinations)if(o.f===e)for(let a of o.doors){let c=Math.hypot(a[0]-i,a[1]-t);c<2.2&&(!r||c<r[0])&&(r=[c,o])}s=r&&r[1]}s&&gg(s)}var mg=Df(Mt("#sheet"),Mt("#sheet-handle")),Hf=Df(Mt(".search-panel"),Mt("#search-handle"));function ba(i){wt.sheet=i;for(let t of["home","place","route"])Mt(`#sheet-${t}`).hidden=t!==i;mg.reset(),Mt("#sheet").classList.toggle("route-mode",i==="route"),Mt("#sheet").classList.toggle("place-mode",i==="place"),Mt("#sheet").hidden=i==="home"}new ResizeObserver(()=>{let i=Mt("#sheet");!i.hidden&&i.classList.contains("place-mode")&&document.documentElement.style.setProperty("--place-card-height",`${Math.ceil(i.getBoundingClientRect().height)}px`)}).observe(Mt("#sheet"));function gg(i){let t=innerWidth<820?Mt(".search-content"):Mt(".search-panel"),e=t.scrollTop;wt.pending=i,re.select(i),Mt("#place-floor").textContent=cn(i.f),Mt("#place-floor").dataset.f=i.f,Mt("#place-floor").classList.toggle("b1",i.f===0),Mt("#place-title").textContent=i.title,Mt("#place-sub").textContent=[i.name||i.catLabel,Je(i.f)].filter(Boolean).join(" \xB7 "),ba("place");let n=i.center||i.doors[0];re.floorOverview||(i.f!==re.floor&&zf(i.f),re.focus(n[0],n[1],i.f,48)),Ri(),t.scrollTop=e}Mt("#place-close").onclick=()=>{re.select(null),wt.pending=null;for(let i of Qi(".search-result-button"))i.setAttribute("aria-pressed","false");if(!Mt("#search").hidden&&!wt.route){wt.sheet="home",Mt("#sheet").hidden=!0,Mt("#sheet").classList.remove("place-mode");return}ba(wt.route?"route":"home")};Mt("#place-route").onclick=()=>{jl(),wt.dest=wt.pending,Vf(wt.dest),wa(),gs(),wt.start||Qs.origin.focus()};Mt("#place-from").onclick=()=>{jl(),Vf(wt.pending),Ea(Bf(wt.pending)),wt.dest?.key===wt.pending.key&&(wt.dest=null),re.select(null),wa(),gs(),wt.dest||requestAnimationFrame(()=>Qs.dest.focus())};var Ff="sai-indoor-recent";function IS(){try{return JSON.parse(localStorage.getItem(Ff)||"[]").map(i=>mn.findDest(i)).filter(Boolean)}catch{return[]}}function Vf(i){try{let t=[i.key,...JSON.parse(localStorage.getItem(Ff)||"[]").filter(e=>e!==i.key)].slice(0,6);localStorage.setItem(Ff,JSON.stringify(t))}catch{}}function Gf(i="dest",t=!0){mn&&(wt.searchMode=i,Hf.reset(),Mt("#search").hidden=!1,document.body.classList.add("searching"),Mt("#search-input").value="",Mt("#search-input").placeholder=i==="origin"?"\uC5B4\uB514\uC5D0\uC11C \uCD9C\uBC1C\uD558\uB098\uC694? (\uD638\uC2E4\xB7\uC774\uB984)":"\uD638\uC2E4 \uBC88\uD638, \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984",Jl(""),t&&setTimeout(()=>Mt("#search-input").focus(),50))}function jl(){Hf.reset(),Mt("#search").hidden=!0,document.body.classList.remove("searching"),Mt("#search-input").blur(),re?.redraw()}Mt("#search-open").onclick=()=>Gf();Mt("#search-close").onclick=jl;document.addEventListener("keydown",i=>{i.key!=="/"||i.isComposing||i.ctrlKey||i.metaKey||i.altKey||i.target.closest?.("input, textarea, select, [contenteditable='true']")||!Mt("#walk").hidden||!Mt("#ar").hidden||(i.preventDefault(),Gf())});Mt("#search-input").addEventListener("input",i=>{Hf.reset(),Jl(i.target.value)});Mt("#search-input").addEventListener("keydown",i=>{i.isComposing||i.keyCode===229||(i.key==="Enter"?Mt("#search-results li[data-key] button")?.click():i.key==="Escape"&&jl())});function Nf(i){let t=je("li");t.dataset.key=i.key,t.dataset.f=i.f;let e=je("span","floor-tag"+(i.f===0?" b1":"")+(i.f===re.floor?" current-floor":""),cn(i.f));e.dataset.f=i.f,e.title=`${Je(i.f)}${i.f===re.floor?" \xB7 \uD604\uC7AC \uCE35":""}`;let n=je("div");n.append(je("b","",i.title),je("small","",i.cat==="toilet"?[i.name,Je(i.f)].filter(Boolean).join(" \xB7 "):i.name||i.catLabel||Je(i.f)));let s=je("button","search-result-button");return s.type="button",s.setAttribute("aria-pressed",String(wt.sheet==="place"&&wt.pending?.key===i.key)),s.append(e,n),t.append(s),s.onclick=()=>gg(i),t}function Jl(i){let t=Mt("#search-results");if(t.replaceChildren(),i.trim()){let s={floor:re.floor,origin:wt.start,mode:wt.mode},r=mn.search(i,40,s),o=r.length?[]:mn.suggest(i,40,s),a=r.length?r:o,c=o.length?`\uBE44\uC2B7\uD55C \uC7A5\uC18C ${o.length}\uACF3`:r.length?`${r.length}\uACF3`:"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694. \uD638\uC2E4 \uBC88\uD638\uB098 \uC774\uB984 \uC77C\uBD80\uB85C \uCC3E\uC544\uBCF4\uC138\uC694.";Mt("#search-hint").textContent=a.length&&a.every(l=>l.cat==="toilet")?`${c} \xB7 ${Je(re.floor)} \uC6B0\uC120 \xB7 \uCD9C\uBC1C \uC704\uCE58\uC5D0\uC11C \uAC00\uAE4C\uC6B4 \uC21C`:c;for(let l of a)t.append(Nf(l));return}Mt("#search-hint").textContent="\uBC88\uD638\uB098 \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984\uC73C\uB85C \uCC3E\uC744 \uC218 \uC788\uC5B4\uC694";let e=IS();if(e.length){t.append(je("li","group","\uCD5C\uADFC \uCC3E\uC740 \uACF3"));for(let s of e)t.append(Nf(s))}let n=null;for(let s of mn.destinations.filter(r=>r.numbered))s.f!==n&&(t.append(je("li","group",Je(s.f))),n=s.f),t.append(Nf(s))}for(let i of Qi("#quick-chips button"))i.onclick=()=>{Gf(),Mt("#search-input").value=i.dataset.q,Jl(i.dataset.q)};function wa(){Qs.origin.setValue(wt.start?.name||""),Qs.dest.setValue(sg(wt.dest))}for(let[i,t]of[["origin","route-from"],["dest","route-to"]])Qs[i]=ag({input:Mt(`#${t}`),panel:Mt(`#${t}-panel`),list:Mt(`#${t}-suggestions`),hint:Mt(`#${t}-hint`),clear:Mt(`#${t}-clear`),getMatches:e=>Zl.search(e,{floor:re.floor,origin:wt.start,mode:wt.mode}),onChoose:e=>{i==="origin"?Ea(pg(e)):wt.dest=e,e.kind!=="entrance"&&Vf(e),gs()},onEdit:()=>{i==="origin"?(wt.start=null,re.setMe(null)):wt.dest=null,gs()}});Mt("#route-swap").onclick=()=>{let i=Zl.forStart(wt.start);Ea(wt.dest?pg(wt.dest):null),wt.dest=i,wa(),gs()};Mt("#route-close").onclick=()=>{wt.route=null,wt.dest=null,wa();for(let i of Object.values(Qs))i.close();re.clearRoute(),re.select(null),ba("home"),Ri(),history.replaceState(null,"",location.pathname+(lo.get("from")?`?from=${lo.get("from")}`:""))};function Wf(i,t=!0){wt.mode=i;for(let e of Qi(".seg button"))e.classList.toggle("on",e.dataset.mode===i),e.setAttribute("aria-checked",e.dataset.mode===i);t&&gs()}for(let i of Qi(".seg button"))i.onclick=()=>Wf(i.dataset.mode);function _g(){let i=new URLSearchParams;i.set("from",wt.start.id),i.set("to",wt.dest.key),wt.mode==="elevator"&&i.set("mode","elevator");let t=new URLSearchParams(location.search);for(let e of["debug","fov","loc"])t.has(e)&&i.set(e,t.get(e));return`${location.pathname}?${i}`}Mt("#route-share").onclick=async()=>{let i=new URL(_g(),location.href).href,t=`\uBBF8\uB798\uAD00 ${wt.dest.title}\uAE4C\uC9C0 \uAE38\uC548\uB0B4`;try{navigator.share?await navigator.share({title:t,url:i}):(await navigator.clipboard.writeText(i),Uf("\uACBD\uB85C \uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD588\uC5B4\uC694"))}catch{}};function gs(){let i=wt.dest;if(!i||!wt.start){wt.route=null,wt.steps=null,wt.focusStep=null,re.clearRoute(),re.select(null),Mt("#route-summary").replaceChildren(je("span","route-prompt","\uAC80\uC0C9 \uACB0\uACFC\uC5D0\uC11C \uCD9C\uBC1C\uC9C0\uC640 \uB3C4\uCC29\uC9C0\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.")),Mt("#route-steps").replaceChildren(),Mt("#ar-open").disabled=Mt("#walk-open").disabled=Mt("#route-share").disabled=!0,ba("route"),Ri();return}let t=mn.routeTo(wt.start,i,{mode:wt.mode});wa(),ba("route");let e=Mt("#route-summary");if(e.replaceChildren(),Mt("#route-steps").replaceChildren(),!t){wt.route=null,re.clearRoute(),e.append(je("span","warn","\uACBD\uB85C\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.")),Mt("#ar-open").disabled=Mt("#walk-open").disabled=Mt("#route-share").disabled=!0,Ri();return}Mt("#ar-open").disabled=Mt("#walk-open").disabled=Mt("#route-share").disabled=!1,wt.route=t,wt.steps=ir(t,i,{landmarks:mn.destinations}),wt.focusStep=null,history.replaceState(null,"",_g()),e.append(je("b","",`${Math.round(t.len)}m`),je("span","",`\uC57D ${Ia(t.len)}`));for(let r of wt.steps)(r.kind==="stair"||r.kind==="elev")&&e.append(je("span","chip "+r.kind,`${r.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"} ${cn(r.f)}\u2192${cn(r.to)}`));let n=wt.steps.filter(r=>r.kind==="stair").map(r=>`${cn(r.f)}\u2192${cn(r.to)}`).join(", "),s=[];t.preferElev&&s.push("\uB450 \uCE35 \uC774\uC0C1 \uC774\uB3D9\uD574 \uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C \uC548\uB0B4\uD574\uC694"),(wt.mode==="elevator"||t.preferElev)&&t.stairFloors&&s.push(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uAC00 \uB2FF\uC9C0 \uC54A\uB294 ${n} \uAD6C\uAC04\uB9CC \uACC4\uB2E8\uC744 \uC774\uC6A9\uD574\uC694`),s.length&&e.append(je("span","note",s.join(" \xB7 "))),NS(),Mt("#sheet").scrollTop=0,Mt("#sheet-route").scrollTop=0,re.showRoute(t,i,wt.steps),!re.floorOverview&&re.floor!==t.pts[0].f&&re.setFloor(t.pts[0].f),re.setMe(wt.start),LS(),Ri()}function PS(){return innerWidth>=820?0:Mt("#sheet").classList.contains("collapsed")?64:Mt("#sheet").offsetHeight}function LS(){if(re.floorOverview)return;let i=wt.route.pts.filter(o=>o.f===re.floor),t=i.length?i:wt.route.pts,e=1/0,n=-1/0,s=1/0,r=-1/0;for(let o of t)e=Math.min(e,o.x),n=Math.max(n,o.x),s=Math.min(s,o.y),r=Math.max(r,o.y);re.fit(e,s,n,r,t[0].f,PS())}async function xg(){return Sa||(Sa=await fetch(Js+"sv.json").then(i=>i.json())),Sa}function yg(i,t,e,n,s=3.5,r=45){if(!Sa)return null;let o=null;for(let a of Sa.shots){if(a.f!==e)continue;let c=Math.hypot(a.x-i,a.y-t);if(c>s)continue;let l=n==null?0:Math.abs(((a.yaw-n)%360+540)%360-180);if(l>r)continue;let h=c+l*.05;(!o||h<o[0])&&(o=[h,a])}return o&&o[1]}var vg=i=>`${Js}sv/${String(i.id).padStart(5,"0")}.jpg`;function DS(i){let t=wt.route,e=es(t),n=on(t,e,i.s+.3),s=on(t,e,i.s+3);return Math.hypot(s.x-n.x,s.y-n.y)>.5?Math.atan2(s.y-n.y,s.x-n.x)*180/Math.PI:null}async function NS(){let i=Mt("#route-steps");i.replaceChildren();let t=wt.steps;await xg().catch(()=>null),wt.steps===t&&t.forEach((e,n)=>{let s=je("li",e.kind==="stair"||e.kind==="elev"?"vertical":e.kind==="arrive"?"goal":"");s.dataset.i=n;let r=je("span","ico");ao(r,e.dir);let o=je("div","txt");o.append(je("b","",e.text));let a=[Je(e.f)];if(e.kind==="start"&&a.push(wt.start.name),e.sub&&e.kind!=="start"&&a.push(e.sub),o.append(je("small","",a.join(" \xB7 "))),s.append(r,o),e.kind!=="start"&&e.kind!=="arrive"&&e.kind!=="elev"){let c=yg(e.at[0],e.at[1],e.f,DS(e));if(c){let l=je("img");l.loading="lazy",l.alt="\uC774 \uC9C0\uC810\uC758 \uC2E4\uC81C \uBAA8\uC2B5",l.src=vg(c),s.append(l)}}s.onclick=()=>dg(n),s.tabIndex=0,s.setAttribute("role","button"),s.setAttribute("aria-label",`${e.text} \xB7 ${a.join(" \xB7 ")}`),s.onkeydown=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),dg(n))},i.append(s)})}function dg(i){let t=wt.steps[i];wt.focusStep=i;for(let e of Qi("#route-steps li"))e.classList.toggle("on",+e.dataset.i===i);re.highlightStep(i),(re.floorOverview||t.f!==re.floor)&&zf(t.f),re.focus(t.at[0],t.at[1],t.f,32),Ri(),innerWidth<820&&mg.collapse()}function Mg(){for(let i of Qi(".voice-btn"))i.hidden=!an.supported,i.classList.toggle("on",an.on),i.setAttribute("aria-pressed",an.on),i.querySelector("img")||i.replaceChildren(Vl("volume")),i.title=an.on?"\uC74C\uC131 \uC548\uB0B4 \uB044\uAE30":"\uC74C\uC131 \uC548\uB0B4 \uCF1C\uAE30"}for(let i of Qi(".voice-btn"))i.onclick=()=>{an.on=!an.on,Mg(),an.on&&an.say("\uC74C\uC131 \uC548\uB0B4\uB97C \uCF30\uC5B4\uC694")};var US=3.2,Re=null;Mt("#walk-open").onclick=async()=>{if(!wt.route)return;await xg().catch(()=>null);let i=wt.route,t=es(i),e=t[t.length-1];Re={s:0,s0:0,cum:t,total:e,end:Math.max(0,e-US),yaw:null,last:performance.now(),shot:null,playing:!0,speed:1,step:-1,lift:null,liftDone:new Set};let n=wt.focusStep;if(n!=null&&wt.steps[n]){let s=n>0?wt.steps[n-1].s:0;Re.s0=Math.min(Re.end,Math.max(s,n>0?wt.steps[n].s-2:0)),Re.s=Re.s0,Xf(Re)}Mt("#walk").hidden=!1,document.body.classList.add("walking"),re.resize(),re.floorOverview&&kf(!1);for(let s of["#sheet",".topbar","#floor-controls"])Mt(s).hidden=!0;re.setFirstPerson(!0),Ql(),requestAnimationFrame(bg)};function Xf(i){for(let t of wt.steps)t.kind==="elev"&&t.s<i.s&&i.liftDone.add(t.s)}function FS(){Re?.lift?.close(),Re=null,an.supported&&speechSynthesis.cancel(),Mt("#walk").hidden=!0,document.body.classList.remove("walking"),re.resize();for(let i of["#sheet",".topbar","#floor-controls"])Mt(i).hidden=!1;if(re.setFirstPerson(!1),wt.route){let i=wt.route.pts[wt.route.pts.length-1].f;i!==re.floor&&re.setFloor(i)}Ri()}function Ql(){Re&&(Mt("#walk-play").replaceChildren(Vl(Re.playing?"pause":"play")),Mt("#walk-play").setAttribute("aria-label",Re.playing?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD"),Mt("#walk-speed").textContent=`${Re.speed}\xD7`)}Mt("#walk-close").onclick=FS;Mt("#walk-play").onclick=()=>{Re&&(Re.s>=Re.end-.05&&(Re.s=Re.s0,Re.liftDone.clear(),Xf(Re),Re.yaw=null),Re.playing=!Re.playing,Ql())};Mt("#walk-speed").onclick=()=>{Re&&(Re.speed=Re.speed===1?2:Re.speed===2?4:1,Ql())};function Sg(i){if(!Re||Re.lift)return;let t=Math.max(0,Math.min(wt.steps.length-1,sh(wt.steps,Re.s)+i));Re.s=Math.min(Re.end,wt.steps[t].s+.01),Xf(Re),Re.yaw=null}Mt("#walk-prev").onclick=()=>Sg(-1);Mt("#walk-next").onclick=()=>Sg(1);function bg(i){if(!Re)return;let t=Re,e=wt.route,n=wt.steps,s=Math.min(.05,(i-t.last)/1e3);if(t.last=i,t.playing&&!t.lift){let v=on(e,t.cum,t.s),y=e.pts[v.i]?.kind==="stair",x=Math.min(t.end,t.s+s*t.speed*(y?1.3:2.4)),w=n.find(T=>T.kind==="elev"&&T.s>=t.s-1e-6&&T.s<=x&&!t.liftDone.has(T.s));w&&(x=w.s,t.liftDone.add(w.s),an.say(w.text),t.lift=Hl({from:w.f,to:w.to,title:`${cn(w.to)}\uB85C \uC774\uB3D9 \uC911`,hint:w.sub}),t.lift.finished.then(()=>{Re===t&&(t.lift=null,t.s=w.s+.02,t.yaw=null)})),t.s=x}let r=on(e,t.cum,t.s),o=on(e,t.cum,Math.min(t.total,t.s+2.2)),a=e.pts[e.pts.length-1],c=t.end-t.s<3&&Math.hypot(a.x-r.x,a.y-r.y)>.3?Math.atan2(a.y-r.y,a.x-r.x)*180/Math.PI:Math.hypot(o.x-r.x,o.y-r.y)>.3?Math.atan2(o.y-r.y,o.x-r.x)*180/Math.PI:t.yaw??90;t.yaw==null&&(t.yaw=c);let l=((c-t.yaw)%360+540)%360-180;t.yaw+=l*Math.min(1,s*3.2),re.setWalkPose({x:r.x,y:r.y,z:r.z,f:r.f,yaw:t.yaw,pitch:-.1}),Mt("#walk-bar").style.width=`${t.s/Math.max(.01,t.end)*100}%`;let h=uo(n,e,t.cum,t.s),u=sh(n,t.s);u!==t.step&&(t.step=u,u>0&&n[u].kind!=="elev"&&an.say(n[u].text));let f=t.s>=t.end-.05,d=Mt("#walk-step");d.replaceChildren();let g=je("div");g.append(je("b","",f?`${wt.dest.title} \uB3C4\uCC29`:h.dist<3?`\uC9C0\uAE08 ${h.step.action}`:`${Math.round(h.dist)}m \uC55E ${h.step.kind==="arrive"?wt.dest.title:h.step.action}`),je("small","",`${Je(r.f)} \xB7 ${n[u].text}`));let _=je("div","hud-arrow");ao(_,f?"arrive":h.dist<3?h.step.dir:"straight",!0),d.append(_,g);let m=yg(r.x,r.y,r.f,t.yaw,3,40),p=Mt("#walk-photo");m&&!t.lift?(t.shot!==m.id&&(t.shot=m.id,p.querySelector("img").src=vg(m)),p.hidden=!1):p.hidden=!0,f&&t.playing&&(t.playing=!1,Ql(),an.say(`${wt.dest.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`)),requestAnimationFrame(bg)}function Eg(i){wt.route&&ng({indoor:mn,route:wt.route,steps:wt.steps,dest:wt.dest,mode:wt.mode,demo:i,assets:Js,onDemo:qf,onRoute:(t,e)=>{wt.route=t,wt.steps=e,re.showRoute(t,wt.dest,e)}})}Mt("#ar-open").onclick=()=>Eg(!1);Mt("#demo-open").onclick=qf;async function qf(){let i=await fetch(Js+"demo.json").then(e=>e.json()),t=js.find(e=>e.id===i.from)||js[0];Ea(Of(t)),wt.dest=mn.findDest(i.to),Wf("stairs",!1),gs(),Eg(!0)}AS().catch(i=>{console.error(i);let t=Mt("#loading");t.hidden=!1,t.classList.remove("done"),Mt("#loading-status").textContent="\uBBF8\uB798\uAD00 \uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694",Mt("#loading-error-detail").textContent=String(i.message||i),Mt("#loading-error").hidden=!1,Mt("#loading-retry").onclick=()=>location.reload()})});OS();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
