(()=>{var Hm=Object.defineProperty;var Vl=(i,t)=>()=>(i&&(t=i(i=0)),t);var Vm=(i,t)=>{for(var e in t)Hm(i,e,{get:t[e],enumerable:!0})};function kn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(un[i&255]+un[i>>8&255]+un[i>>16&255]+un[i>>24&255]+"-"+un[t&255]+un[t>>8&255]+"-"+un[t>>16&15|64]+un[t>>24&255]+"-"+un[e&63|128]+un[e>>8&255]+"-"+un[e>>16&255]+un[e>>24&255]+un[n&255]+un[n>>8&255]+un[n>>16&255]+un[n>>24&255]).toLowerCase()}function ae(i,t,e){return Math.max(t,Math.min(e,i))}function nu(i,t){return(i%t+t)%t}function sg(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function rg(i,t,e){return i!==t?(e-i)/(t-i):0}function _o(i,t,e){return(1-e)*i+e*t}function og(i,t,e,n){return _o(i,t,1-Math.exp(-e*n))}function ag(i,t=1){return t-Math.abs(nu(i,t*2)-t)}function cg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function lg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function hg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ug(i,t){return i+Math.random()*(t-i)}function fg(i){return i*(.5-Math.random())}function dg(i){i!==void 0&&(Lf=i);let t=Lf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pg(i){return i*dr}function mg(i){return i*xs}function gg(i){return(i&i-1)===0&&i!==0}function _g(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yg(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Jn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}function iu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hp(){let i=xr("canvas");return i.style.display="block",i}function yr(i){i in Nf||(Nf[i]=!0,console.warn(i))}function up(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function vg(){let i={enabled:!0,workingColorSpace:an,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Re&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Re&&(s.r=pr(s.r),s.g=pr(s.g),s.b=pr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bi?vo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return yr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return yr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[an]:{primaries:t,whitePoint:n,transfer:vo,toXYZ:Uf,fromXYZ:Ff,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ze},outputColorSpaceConfig:{drawingBufferColorSpace:ze}},[ze]:{primaries:t,whitePoint:n,transfer:Re,toXYZ:Uf,fromXYZ:Ff,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ze}}}),i}function Ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function pr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function Zl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?sc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function jl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){hs.fromArray(i,r);let a=s.x*Math.abs(hs.x)+s.y*Math.abs(hs.y)+s.z*Math.abs(hs.z),l=t.dot(hs),c=e.dot(hs),h=n.dot(hs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}function hh(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}function Dg(i,t,e,n,s,r,o,a){let l;if(t.side===cn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===ti,a),l===null)return null;Ua.copy(a),Ua.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ua);return c<e.near||c>e.far?null:{distance:c,point:Ua.clone(),object:i}}function Fa(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Pa),i.getVertexPosition(l,La),i.getVertexPosition(c,Da);let h=Dg(i,t,e,n,Pa,La,Da,Yf);if(h){let u=new I;oi.getBarycoord(Yf,Pa,La,Da,u),s&&(h.uv=oi.getInterpolatedAttribute(s,a,l,c,u,new Rt)),r&&(h.uv1=oi.getInterpolatedAttribute(r,a,l,c,u,new Rt)),o&&(h.normal=oi.getInterpolatedAttribute(o,a,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new I,materialIndex:0};oi.getNormal(Pa,La,Da,f.normal),h.face=f,h.barycoord=u}return h}function Ns(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function mn(i){let t={};for(let e=0;e<i.length;e++){let n=Ns(i[e]);for(let s in n)t[s]=n[s]}return t}function Ng(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function su(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}function ka(i,t,e,n,s,r){hr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(lo.x=r*hr.x-s*hr.y,lo.y=s*hr.x+r*hr.y):lo.copy(hr),i.copy(t),i.x+=lo.x,i.y+=lo.y,i.applyMatrix4(pp)}function Wa(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(lc.fromBufferAttribute(a,s),hc.fromBufferAttribute(a,r),e.distanceSqToSegment(lc,hc,_h,ad)>n)return;_h.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(_h);if(!(c<t.near||c>t.far))return{distance:c,point:ad.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}function ud(i,t,e,n,s,r,o){let a=Ih.distanceSqToPoint(i);if(a<e){let l=new I;Ih.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}function ru(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}function fd(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Wg(i,t){let e=1-i;return e*e*t}function Xg(i,t){return 2*(1-i)*i*t}function qg(i,t){return i*i*t}function xo(i,t,e,n){return Wg(i,t)+Xg(i,e)+qg(i,n)}function Yg(i,t){let e=1-i;return e*e*e*t}function $g(i,t){let e=1-i;return 3*e*e*i*t}function Zg(i,t){return 3*(1-i)*i*i*t}function Kg(i,t){return i*i*i*t}function yo(i,t,e,n,s){return Yg(i,t)+$g(i,e)+Zg(i,n)+Kg(i,s)}function jg(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=mp(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=n0(i,t,r,e)),i.length>80*e){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){let d=i[f],g=i[f+1];d<a&&(a=d),g<l&&(l=g),d>h&&(h=d),g>u&&(u=g)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Ho(r,o,e,a,l,c,0),o}function mp(i,t,e,n,s){let r;if(s===d0(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=pd(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=pd(o/n|0,i[o],i[o+1],r);return r&&Ir(r,r.next)&&(Go(r),r=r.next),r}function Es(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ir(e,e.next)||Ve(e.prev,e,e.next)===0)){if(Go(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ho(i,t,e,n,s,r,o){if(!i)return;!o&&r&&a0(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Qg(i,n,s,r):Jg(i)){t.push(l.i,i.i,c.i),Go(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=t0(Es(i),t),Ho(i,t,e,n,s,r,2)):o===2&&e0(i,t,e,n,s,r):Ho(Es(i),t,e,n,s,r,1);break}}}function Jg(i){let t=i.prev,e=i,n=i.next;if(Ve(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&go(s,a,r,l,o,c,g.x,g.y)&&Ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Qg(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Ve(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,l,c),g=Math.min(h,u,f),x=Math.max(a,l,c),m=Math.max(h,u,f),p=Ph(d,g,t,e,n),S=Ph(x,m,t,e,n),y=i.prevZ,_=i.nextZ;for(;y&&y.z>=p&&_&&_.z<=S;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&go(a,h,l,u,c,f,y.x,y.y)&&Ve(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&go(a,h,l,u,c,f,_.x,_.y)&&Ve(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&go(a,h,l,u,c,f,y.x,y.y)&&Ve(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=S;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&go(a,h,l,u,c,f,_.x,_.y)&&Ve(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function t0(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Ir(n,s)&&_p(n,e,e.next,s)&&Vo(n,s)&&Vo(s,n)&&(t.push(n.i,e.i,s.i),Go(e),Go(e.next),e=i=s),e=e.next}while(e!==i);return Es(e)}function e0(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&h0(o,a)){let l=xp(o,a);o=Es(o,o.next),l=Es(l,l.next),Ho(o,t,e,n,s,r,0),Ho(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function n0(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=mp(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(l0(c))}s.sort(i0);for(let r=0;r<s.length;r++)e=s0(s[r],e);return e}function i0(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function s0(i,t){let e=r0(i,t);if(!e)return t;let n=xp(e,i);return Es(n,n.next),Es(e,e.next)}function r0(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Ir(i,e))return e;do{if(Ir(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&gp(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);Vo(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&o0(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function o0(i,t){return Ve(i.prev,i,t.prev)<0&&Ve(t.next,i,i.next)<0}function a0(i,t,e,n){let s=i;do s.z===0&&(s.z=Ph(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,c0(s)}function c0(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Ph(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function l0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function gp(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function go(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&gp(i,t,e,n,s,r,o,a)}function h0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!u0(i,t)&&(Vo(i,t)&&Vo(t,i)&&f0(i,t)&&(Ve(i.prev,i,t.prev)||Ve(i,t.prev,t))||Ir(i,t)&&Ve(i.prev,i,i.next)>0&&Ve(t.prev,t,t.next)>0)}function Ve(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ir(i,t){return i.x===t.x&&i.y===t.y}function _p(i,t,e,n){let s=Ja(Ve(i,t,e)),r=Ja(Ve(i,t,n)),o=Ja(Ve(e,n,i)),a=Ja(Ve(e,n,t));return!!(s!==r&&o!==a||s===0&&ja(i,e,t)||r===0&&ja(i,n,t)||o===0&&ja(e,i,n)||a===0&&ja(e,t,n))}function ja(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ja(i){return i>0?1:i<0?-1:0}function u0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&_p(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Vo(i,t){return Ve(i.prev,i,i.next)<0?Ve(i,t,i.next)>=0&&Ve(i,i.prev,t)>=0:Ve(i,t,i.prev)<0||Ve(i,i.next,t)<0}function f0(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function xp(i,t){let e=Lh(i.i,i.x,i.y),n=Lh(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function pd(i,t,e,n){let s=Lh(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Go(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lh(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function d0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}function md(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function gd(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}function p0(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}function Qa(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function m0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function g0(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function _d(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let l=0;l!==t;++l)s[o++]=i[a+l]}return s}function yp(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}function _0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fi;case"vector":case"vector2":case"vector3":case"vector4":return pi;case"color":return Xo;case"quaternion":return di;case"bool":case"boolean":return Li;case"string":return Di}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function x0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=_0(i.type);if(i.times===void 0){let e=[],n=[];yp(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}function Sd(i,t){return i.distance-t.distance}function kh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)kh(r[o],t,e,!0)}}function cu(i,t,e,n){let s=A0(n);switch(e){case Kh:return i*t;case Hc:return i*t/s.components*s.byteLength;case Vc:return i*t/s.components*s.byteLength;case Jh:return i*t*2/s.components*s.byteLength;case Gc:return i*t*2/s.components*s.byteLength;case jh:return i*t*3/s.components*s.byteLength;case Dn:return i*t*4/s.components*s.byteLength;case Wc:return i*t*4/s.components*s.byteLength;case ta:case ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case na:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qc:case $c:return Math.max(i,16)*Math.max(t,8)/4;case Xc:case Yc:return Math.max(i,8)*Math.max(t,8)/2;case Zc:case Kc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Jc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case tl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case el:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case nl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case il:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case sl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case rl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ol:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case al:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case cl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ll:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case hl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ul:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case fl:case dl:case pl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ml:case gl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case _l:case xl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function A0(i){switch(i){case ii:case qh:return{byteLength:1,components:1};case Nr:case Yh:case Ur:return{byteLength:2,components:1};case kc:case zc:return{byteLength:2,components:4};case ns:case Bc:case Xn:return{byteLength:4,components:1};case $h:case Zh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var Wn,Tn,bd,zh,Ed,Hh,Td,gi,ti,cn,Te,Fi,ps,Vh,Gh,Wh,wd,ji,Ad,Rd,Cd,Id,Pd,Ld,Dd,Nd,ec,nc,Ud,Fd,Od,Bd,kd,zd,Hd,Vd,Gd,wc,Ac,Rc,ms,Cc,Ic,Pc,Lc,Dc,Wd,Xd,Oi,qd,Yd,$d,Zd,Kd,jd,Nc,Th,Jd,Xh,Ps,Ls,Uc,Fc,Qo,zn,ai,gr,on,Oc,Ds,xn,Dr,ni,ii,qh,Yh,Nr,Bc,ns,Xn,Ur,kc,zc,Fr,$h,Zh,Kh,jh,Dn,_r,Or,Hc,Vc,Jh,Gc,Wc,ta,ea,na,ia,Xc,qc,Yc,$c,Zc,Kc,jc,Jc,Qc,tl,el,nl,il,sl,rl,ol,al,cl,ll,hl,ul,fl,dl,pl,ml,gl,_l,xl,gs,_s,tc,wh,Ah,Rh,Qd,Qh,sa,Br,tp,ep,yl,np,Bi,ze,an,vo,Re,ds,Ch,ip,sp,rp,tu,op,ap,cp,lp,ic,eu,Qn,Mo,li,un,Lf,dr,xs,ra,Rt,yn,I,Yl,Df,oe,$l,Nf,Uf,Ff,ge,Zs,sc,Mg,vr,Sg,Kl,je,be,rc,Hn,So,oc,In,Si,Zn,Ma,Ks,js,Js,Xi,qi,ls,so,Sa,ba,hs,bg,ro,Jl,Sn,bi,Ql,Ea,Yi,th,Ta,eh,hi,ie,Qs,Kn,Eg,Tg,$i,wa,Rn,Of,Bf,Vn,Mr,wg,kf,tr,Ei,Aa,oo,Ag,Rg,zf,Hf,Vf,Gf,Cg,er,nh,Ce,jn,Ti,ih,wi,nr,ir,Wf,sh,rh,oh,ah,ch,lh,oi,fp,Zi,Ra,Jt,fn,Ig,dn,Ee,Ke,Ca,Pg,Fe,bo,Eo,_e,Lg,Bn,uh,sr,Cn,ao,sn,Ie,Xf,us,Ia,qf,Pa,La,Da,fh,Na,Yf,Ua,ee,Ji,dp,Ug,Fg,Pn,To,Ki,$f,Zf,He,rr,or,ac,wo,cc,We,Og,Sr,ei,ys,_n,Qi,br,ar,co,cr,lr,hr,lo,pp,Oa,ho,Ba,Kf,dh,jf,Ao,Jf,Qf,td,Bg,ed,za,ph,nd,mh,Ro,Er,Co,id,kg,Io,ts,ur,sd,Ha,rd,zg,uo,fo,vs,gh,Hg,Vg,Mn,fs,Gg,Va,Tr,es,lc,hc,od,po,Ga,_h,ad,Ms,cd,ld,Ss,Po,wr,hd,Ih,Xa,qa,Lo,Ci,Do,No,Gn,Ar,bs,Ya,$a,xh,Za,Uo,Ln,Rr,uc,Ka,yh,vh,Mh,fc,Fo,dc,Oo,pc,Bo,mc,ko,dd,gc,zo,Cr,Dh,mr,Ts,ws,Wo,Ii,pn,bn,ui,_c,xc,Pi,yc,vc,Mc,En,Li,Xo,fi,Sc,di,Di,pi,qo,ci,bc,vp,mi,Ai,Nh,Pr,fr,Ec,Yo,As,Rs,Sh,xd,yd,$o,Uh,Zo,vd,mo,bh,Fh,Cs,Ni,Oh,Is,Ui,Eh,Ko,Tc,ou,y0,au,v0,M0,S0,b0,E0,T0,w0,Bh,Ue,tS,Md,jo,Lr,Jo,lu=Vl(()=>{Wn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Tn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bd=0,zh=1,Ed=2,Hh=1,Td=2,gi=3,ti=0,cn=1,Te=2,Fi=0,ps=1,Vh=2,Gh=3,Wh=4,wd=5,ji=100,Ad=101,Rd=102,Cd=103,Id=104,Pd=200,Ld=201,Dd=202,Nd=203,ec=204,nc=205,Ud=206,Fd=207,Od=208,Bd=209,kd=210,zd=211,Hd=212,Vd=213,Gd=214,wc=0,Ac=1,Rc=2,ms=3,Cc=4,Ic=5,Pc=6,Lc=7,Dc=0,Wd=1,Xd=2,Oi=0,qd=1,Yd=2,$d=3,Zd=4,Kd=5,jd=6,Nc=7,Th="attached",Jd="detached",Xh=300,Ps=301,Ls=302,Uc=303,Fc=304,Qo=306,zn=1e3,ai=1001,gr=1002,on=1003,Oc=1004,Ds=1005,xn=1006,Dr=1007,ni=1008,ii=1009,qh=1010,Yh=1011,Nr=1012,Bc=1013,ns=1014,Xn=1015,Ur=1016,kc=1017,zc=1018,Fr=1020,$h=35902,Zh=35899,Kh=1021,jh=1022,Dn=1023,_r=1026,Or=1027,Hc=1028,Vc=1029,Jh=1030,Gc=1031,Wc=1033,ta=33776,ea=33777,na=33778,ia=33779,Xc=35840,qc=35841,Yc=35842,$c=35843,Zc=36196,Kc=37492,jc=37496,Jc=37808,Qc=37809,tl=37810,el=37811,nl=37812,il=37813,sl=37814,rl=37815,ol=37816,al=37817,cl=37818,ll=37819,hl=37820,ul=37821,fl=36492,dl=36494,pl=36495,ml=36283,gl=36284,_l=36285,xl=36286,gs=2300,_s=2301,tc=2302,wh=2400,Ah=2401,Rh=2402,Qd=2500,Qh=0,sa=1,Br=2,tp=3200,ep=3201,yl=0,np=1,Bi="",ze="srgb",an="srgb-linear",vo="linear",Re="srgb",ds=7680,Ch=519,ip=512,sp=513,rp=514,tu=515,op=516,ap=517,cp=518,lp=519,ic=35044,eu="300 es",Qn=2e3,Mo=2001,li=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lf=1234567,dr=Math.PI/180,xs=180/Math.PI;ra={DEG2RAD:dr,RAD2DEG:xs,generateUUID:kn,clamp:ae,euclideanModulo:nu,mapLinear:sg,inverseLerp:rg,lerp:_o,damp:og,pingpong:ag,smoothstep:cg,smootherstep:lg,randInt:hg,randFloat:ug,randFloatSpread:fg,seededRandom:dg,degToRad:pg,radToDeg:mg,isPowerOfTwo:gg,ceilPowerOfTwo:_g,floorPowerOfTwo:xg,setQuaternionFromProperEuler:yg,normalize:Ae,denormalize:Jn},Rt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ae(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},yn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==f||c!==d||h!==g){let m=1-a,p=l*f+c*d+h*g+u*x,S=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let w=Math.sqrt(y),T=Math.atan2(w,p*S);m=Math.sin(m*T)/w,a=Math.sin(a*T)/w}let _=a*S;if(l=l*m+f*_,c=c*m+d*_,h=h*m+g*_,u=u*m+x*_,m===1-a){let w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ae(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Df.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Df.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ae(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Yl.copy(this).projectOnVector(t),this.sub(Yl)}reflect(t){return this.sub(Yl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Yl=new I,Df=new yn,oe=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=s[0],m=s[3],p=s[6],S=s[1],y=s[4],_=s[7],w=s[2],T=s[5],C=s[8];return r[0]=o*x+a*S+l*w,r[3]=o*m+a*y+l*T,r[6]=o*p+a*_+l*C,r[1]=c*x+h*S+u*w,r[4]=c*m+h*y+u*T,r[7]=c*p+h*_+u*C,r[2]=f*x+d*S+g*w,r[5]=f*m+d*y+g*T,r[8]=f*p+d*_+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply($l.makeScale(t,e)),this}rotate(t){return this.premultiply($l.makeRotation(-t)),this}translate(t,e){return this.premultiply($l.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},$l=new oe;Nf={};Uf=new oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ff=new oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ge=vg();sc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Zs===void 0&&(Zs=xr("canvas")),Zs.width=t.width,Zs.height=t.height;let s=Zs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Zs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=xr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ri(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ri(e[n]/255)*255):e[n]=Ri(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Mg=0,vr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Zl(s[o].image)):r.push(Zl(s[o]))}else r=Zl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};Sg=0,Kl=new I,je=class i extends li{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ai,s=ai,r=xn,o=ni,a=Dn,l=ii,c=i.DEFAULT_ANISOTROPY,h=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sg++}),this.uuid=kn(),this.name="",this.source=new vr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Kl).x}get height(){return this.source.getSize(Kl).y}get depth(){return this.source.getSize(Kl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zn:t.x=t.x-Math.floor(t.x);break;case ai:t.x=t.x<0?0:1;break;case gr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zn:t.y=t.y-Math.floor(t.y);break;case ai:t.y=t.y<0?0:1;break;case gr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=Xh;je.DEFAULT_ANISOTROPY=1;be=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,_=(d+1)/2,w=(p+1)/2,T=(h+f)/4,C=(u+x)/4,U=(g+m)/4;return y>_&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=C/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=U/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=U/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-x)/S,this.z=(f-h)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this.w=ae(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this.w=ae(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ae(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},rc=class extends li{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new je(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new vr(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Hn=class extends rc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},So=class extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},oc=class extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},In=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Zn):Zn.fromBufferAttribute(r,o),Zn.applyMatrix4(t.matrixWorld),this.expandByPoint(Zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ma.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ma.copy(n.boundingBox)),Ma.applyMatrix4(t.matrixWorld),this.union(Ma)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Zn),Zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(so),Sa.subVectors(this.max,so),Ks.subVectors(t.a,so),js.subVectors(t.b,so),Js.subVectors(t.c,so),Xi.subVectors(js,Ks),qi.subVectors(Js,js),ls.subVectors(Ks,Js);let e=[0,-Xi.z,Xi.y,0,-qi.z,qi.y,0,-ls.z,ls.y,Xi.z,0,-Xi.x,qi.z,0,-qi.x,ls.z,0,-ls.x,-Xi.y,Xi.x,0,-qi.y,qi.x,0,-ls.y,ls.x,0];return!jl(e,Ks,js,Js,Sa)||(e=[1,0,0,0,1,0,0,0,1],!jl(e,Ks,js,Js,Sa))?!1:(ba.crossVectors(Xi,qi),e=[ba.x,ba.y,ba.z],jl(e,Ks,js,Js,Sa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Si=[new I,new I,new I,new I,new I,new I,new I,new I],Zn=new I,Ma=new In,Ks=new I,js=new I,Js=new I,Xi=new I,qi=new I,ls=new I,so=new I,Sa=new I,ba=new I,hs=new I;bg=new In,ro=new I,Jl=new I,Sn=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):bg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ro.subVectors(t,this.center);let e=ro.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ro,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ro.copy(t.center).add(Jl)),this.expandByPoint(ro.copy(t.center).sub(Jl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},bi=new I,Ql=new I,Ea=new I,Yi=new I,th=new I,Ta=new I,eh=new I,hi=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=bi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bi.copy(this.origin).addScaledVector(this.direction,e),bi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ql.copy(t).add(e).multiplyScalar(.5),Ea.copy(e).sub(t).normalize(),Yi.copy(this.origin).sub(Ql);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ea),a=Yi.dot(this.direction),l=-Yi.dot(Ea),c=Yi.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ql).addScaledVector(Ea,f),d}intersectSphere(t,e){bi.subVectors(t.center,this.origin);let n=bi.dot(this.direction),s=bi.dot(bi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,bi)!==null}intersectTriangle(t,e,n,s,r){th.subVectors(e,t),Ta.subVectors(n,t),eh.crossVectors(th,Ta);let o=this.direction.dot(eh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yi.subVectors(this.origin,t);let l=a*this.direction.dot(Ta.crossVectors(Yi,Ta));if(l<0)return null;let c=a*this.direction.dot(th.cross(Yi));if(c<0||l+c>o)return null;let h=-a*Yi.dot(eh);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class i{constructor(t,e,n,s,r,o,a,l,c,h,u,f,d,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,d,g,x,m)}set(t,e,n,s,r,o,a,l,c,h,u,f,d,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Qs.setFromMatrixColumn(t,0).length(),r=1/Qs.setFromMatrixColumn(t,1).length(),o=1/Qs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-x*c,e[9]=-a*l,e[2]=x-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,g=c*h,x=c*u;e[0]=f+x*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=x+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,g=c*h,x=c*u;e[0]=f-x*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+x,e[1]=l*u,e[5]=x*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,d=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-x*u}else if(t.order==="XZY"){let f=o*l,d=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+x,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Eg,t,Tg)}lookAt(t,e,n){let s=this.elements;return Rn.subVectors(t,e),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),$i.crossVectors(n,Rn),$i.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),$i.crossVectors(n,Rn)),$i.normalize(),wa.crossVectors(Rn,$i),s[0]=$i.x,s[4]=wa.x,s[8]=Rn.x,s[1]=$i.y,s[5]=wa.y,s[9]=Rn.y,s[2]=$i.z,s[6]=wa.z,s[10]=Rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],S=n[3],y=n[7],_=n[11],w=n[15],T=s[0],C=s[4],U=s[8],b=s[12],M=s[1],N=s[5],H=s[9],z=s[13],K=s[2],st=s[6],$=s[10],Mt=s[14],A=s[3],O=s[7],X=s[11],ot=s[15];return r[0]=o*T+a*M+l*K+c*A,r[4]=o*C+a*N+l*st+c*O,r[8]=o*U+a*H+l*$+c*X,r[12]=o*b+a*z+l*Mt+c*ot,r[1]=h*T+u*M+f*K+d*A,r[5]=h*C+u*N+f*st+d*O,r[9]=h*U+u*H+f*$+d*X,r[13]=h*b+u*z+f*Mt+d*ot,r[2]=g*T+x*M+m*K+p*A,r[6]=g*C+x*N+m*st+p*O,r[10]=g*U+x*H+m*$+p*X,r[14]=g*b+x*z+m*Mt+p*ot,r[3]=S*T+y*M+_*K+w*A,r[7]=S*C+y*N+_*st+w*O,r[11]=S*U+y*H+_*$+w*X,r[15]=S*b+y*z+_*Mt+w*ot,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*d-n*l*d)+x*(+e*l*d-e*c*f+r*o*f-s*o*d+s*c*h-r*l*h)+m*(+e*c*u-e*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*f+s*o*u-n*o*f+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],x=t[13],m=t[14],p=t[15],S=u*m*c-x*f*c+x*l*d-a*m*d-u*l*p+a*f*p,y=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,_=h*x*c-g*u*c+g*a*d-o*x*d-h*a*p+o*u*p,w=g*u*l-h*x*l-g*a*f+o*x*f+h*a*m-o*u*m,T=e*S+n*y+s*_+r*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return t[0]=S*C,t[1]=(x*f*r-u*m*r-x*s*d+n*m*d+u*s*p-n*f*p)*C,t[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*p+n*l*p)*C,t[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*d-n*l*d)*C,t[4]=y*C,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*C,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*C,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*d+e*l*d)*C,t[8]=_*C,t[9]=(g*u*r-h*x*r-g*n*d+e*x*d+h*n*p-e*u*p)*C,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*d-e*a*d)*C,t[12]=w*C,t[13]=(h*x*s-g*u*s+g*n*f-e*x*f-h*n*m+e*u*m)*C,t[14]=(g*a*s-o*x*s-g*n*l+e*x*l+o*n*m-e*a*m)*C,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*f+e*a*f)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,g=r*u,x=o*h,m=o*u,p=a*u,S=l*c,y=l*h,_=l*u,w=n.x,T=n.y,C=n.z;return s[0]=(1-(x+p))*w,s[1]=(d+_)*w,s[2]=(g-y)*w,s[3]=0,s[4]=(d-_)*T,s[5]=(1-(f+p))*T,s[6]=(m+S)*T,s[7]=0,s[8]=(g+y)*C,s[9]=(m-S)*C,s[10]=(1-(f+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Qs.set(s[0],s[1],s[2]).length(),o=Qs.set(s[4],s[5],s[6]).length(),a=Qs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Kn.copy(this);let c=1/r,h=1/o,u=1/a;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=h,Kn.elements[5]*=h,Kn.elements[6]*=h,Kn.elements[8]*=u,Kn.elements[9]*=u,Kn.elements[10]*=u,e.setFromRotationMatrix(Kn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Qn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===Qn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Mo)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Qn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===Qn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Mo)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Qs=new I,Kn=new ie,Eg=new I(0,0,0),Tg=new I(1,1,1),$i=new I,wa=new I,Rn=new I,Of=new ie,Bf=new yn,Vn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ae(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ae(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Of.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Of,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bf.setFromEuler(this),this.setFromQuaternion(Bf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vn.DEFAULT_ORDER="XYZ";Mr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},wg=0,kf=new I,tr=new yn,Ei=new ie,Aa=new I,oo=new I,Ag=new I,Rg=new yn,zf=new I(1,0,0),Hf=new I(0,1,0),Vf=new I(0,0,1),Gf={type:"added"},Cg={type:"removed"},er={type:"childadded",child:null},nh={type:"childremoved",child:null},Ce=class i extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new I,e=new Vn,n=new yn,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new oe}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return tr.setFromAxisAngle(t,e),this.quaternion.multiply(tr),this}rotateOnWorldAxis(t,e){return tr.setFromAxisAngle(t,e),this.quaternion.premultiply(tr),this}rotateX(t){return this.rotateOnAxis(zf,t)}rotateY(t){return this.rotateOnAxis(Hf,t)}rotateZ(t){return this.rotateOnAxis(Vf,t)}translateOnAxis(t,e){return kf.copy(t).applyQuaternion(this.quaternion),this.position.add(kf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zf,t)}translateY(t){return this.translateOnAxis(Hf,t)}translateZ(t){return this.translateOnAxis(Vf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Aa.copy(t):Aa.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(oo,Aa,this.up):Ei.lookAt(Aa,oo,this.up),this.quaternion.setFromRotationMatrix(Ei),s&&(Ei.extractRotation(s.matrixWorld),tr.setFromRotationMatrix(Ei),this.quaternion.premultiply(tr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Gf),er.child=t,this.dispatchEvent(er),er.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cg),nh.child=t,this.dispatchEvent(nh),nh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ei),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Gf),er.child=t,this.dispatchEvent(er),er.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oo,t,Ag),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oo,Rg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ce.DEFAULT_UP=new I(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;jn=new I,Ti=new I,ih=new I,wi=new I,nr=new I,ir=new I,Wf=new I,sh=new I,rh=new I,oh=new I,ah=new be,ch=new be,lh=new be,oi=class i{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),jn.subVectors(t,e),s.cross(jn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){jn.subVectors(s,e),Ti.subVectors(n,e),ih.subVectors(t,e);let o=jn.dot(jn),a=jn.dot(Ti),l=jn.dot(ih),c=Ti.dot(Ti),h=Ti.dot(ih),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wi.x),l.addScaledVector(o,wi.y),l.addScaledVector(a,wi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return ah.setScalar(0),ch.setScalar(0),lh.setScalar(0),ah.fromBufferAttribute(t,e),ch.fromBufferAttribute(t,n),lh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ah,r.x),o.addScaledVector(ch,r.y),o.addScaledVector(lh,r.z),o}static isFrontFacing(t,e,n,s){return jn.subVectors(n,e),Ti.subVectors(t,e),jn.cross(Ti).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return jn.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),jn.cross(Ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;nr.subVectors(s,n),ir.subVectors(r,n),sh.subVectors(t,n);let l=nr.dot(sh),c=ir.dot(sh);if(l<=0&&c<=0)return e.copy(n);rh.subVectors(t,s);let h=nr.dot(rh),u=ir.dot(rh);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(nr,o);oh.subVectors(t,r);let d=nr.dot(oh),g=ir.dot(oh);if(g>=0&&d<=g)return e.copy(r);let x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ir,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Wf.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Wf,a);let p=1/(m+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(nr,o).addScaledVector(ir,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},fp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Ra={h:0,s:0,l:0};Jt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ge.workingColorSpace){if(t=nu(t,1),e=ae(e,0,1),n=ae(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=hh(o,r,t+1/3),this.g=hh(o,r,t),this.b=hh(o,r,t-1/3)}return ge.colorSpaceToWorking(this,s),this}setStyle(t,e=ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){let n=fp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}copyLinearToSRGB(t){return this.r=pr(t.r),this.g=pr(t.g),this.b=pr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return ge.workingToColorSpace(fn.copy(this),t),Math.round(ae(fn.r*255,0,255))*65536+Math.round(ae(fn.g*255,0,255))*256+Math.round(ae(fn.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.workingToColorSpace(fn.copy(this),e);let n=fn.r,s=fn.g,r=fn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ge.workingColorSpace){return ge.workingToColorSpace(fn.copy(this),e),t.r=fn.r,t.g=fn.g,t.b=fn.b,t}getStyle(t=ze){ge.workingToColorSpace(fn.copy(this),t);let e=fn.r,n=fn.g,s=fn.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+e,Zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zi),t.getHSL(Ra);let n=_o(Zi.h,Ra.h,e),s=_o(Zi.s,Ra.s,e),r=_o(Zi.l,Ra.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fn=new Jt;Jt.NAMES=fp;Ig=0,dn=class extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=ps,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ec,this.blendDst=nc,this.blendEquation=ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ch,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ds,this.stencilZFail=ds,this.stencilZPass=ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ec&&(n.blendSrc=this.blendSrc),this.blendDst!==nc&&(n.blendDst=this.blendDst),this.blendEquation!==ji&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ch&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ds&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ds&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ds&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Ee=class extends dn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ke=new I,Ca=new Rt,Pg=0,Fe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ic,this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ca.fromBufferAttribute(this,e),Ca.applyMatrix3(t),this.setXY(e,Ca.x,Ca.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix3(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix4(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyNormalMatrix(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.transformDirection(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Jn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Jn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Jn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Jn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ic&&(t.usage=this.usage),t}},bo=class extends Fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}},Eo=class extends Fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}},_e=class extends Fe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Lg=0,Bn=new ie,uh=new Ce,sr=new I,Cn=new In,ao=new In,sn=new I,Ie=class i extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(iu(t)?Eo:bo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new oe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Bn.makeRotationFromQuaternion(t),this.applyMatrix4(Bn),this}rotateX(t){return Bn.makeRotationX(t),this.applyMatrix4(Bn),this}rotateY(t){return Bn.makeRotationY(t),this.applyMatrix4(Bn),this}rotateZ(t){return Bn.makeRotationZ(t),this.applyMatrix4(Bn),this}translate(t,e,n){return Bn.makeTranslation(t,e,n),this.applyMatrix4(Bn),this}scale(t,e,n){return Bn.makeScale(t,e,n),this.applyMatrix4(Bn),this}lookAt(t){return uh.lookAt(t),uh.updateMatrix(),this.applyMatrix4(uh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _e(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ao.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(Cn.min,ao.min),Cn.expandByPoint(sn),sn.addVectors(Cn.max,ao.max),Cn.expandByPoint(sn)):(Cn.expandByPoint(ao.min),Cn.expandByPoint(ao.max))}Cn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)sn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(sn));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)sn.fromBufferAttribute(a,c),l&&(sr.fromBufferAttribute(t,c),sn.add(sr)),s=Math.max(s,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<n.count;U++)a[U]=new I,l[U]=new I;let c=new I,h=new I,u=new I,f=new Rt,d=new Rt,g=new Rt,x=new I,m=new I;function p(U,b,M){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,U),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),d.sub(f),g.sub(f);let N=1/(d.x*g.y-g.x*d.y);isFinite(N)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(N),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(N),a[U].add(x),a[b].add(x),a[M].add(x),l[U].add(m),l[b].add(m),l[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let U=0,b=S.length;U<b;++U){let M=S[U],N=M.start,H=M.count;for(let z=N,K=N+H;z<K;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let y=new I,_=new I,w=new I,T=new I;function C(U){w.fromBufferAttribute(s,U),T.copy(w);let b=a[U];y.copy(b),y.sub(w.multiplyScalar(w.dot(b))).normalize(),_.crossVectors(T,b);let N=_.dot(l[U])<0?-1:1;o.setXYZW(U,y.x,y.y,y.z,N)}for(let U=0,b=S.length;U<b;++U){let M=S[U],N=M.start,H=M.count;for(let z=N,K=N+H;z<K;z+=3)C(t.getX(z+0)),C(t.getX(z+1)),C(t.getX(z+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new I,r=new I,o=new I,a=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)sn.fromBufferAttribute(t,e),sn.normalize(),t.setXYZ(e,sn.x,sn.y,sn.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Fe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xf=new ie,us=new hi,Ia=new Sn,qf=new I,Pa=new I,La=new I,Da=new I,fh=new I,Na=new I,Yf=new I,Ua=new I,ee=class extends Ce{constructor(t=new Ie,e=new Ee){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Na.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(fh.fromBufferAttribute(u,t),o?Na.addScaledVector(fh,h):Na.addScaledVector(fh.sub(e),h))}e.add(Na)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ia.copy(n.boundingSphere),Ia.applyMatrix4(r),us.copy(t.ray).recast(t.near),!(Ia.containsPoint(us.origin)===!1&&(us.intersectSphere(Ia,qf)===null||us.origin.distanceToSquared(qf)>(t.far-t.near)**2))&&(Xf.copy(r).invert(),us.copy(t.ray).applyMatrix4(Xf),!(n.boundingBox!==null&&us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,us)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=S,w=y;_<w;_+=3){let T=a.getX(_),C=a.getX(_+1),U=a.getX(_+2);s=Fa(this,p,t,n,c,h,u,T,C,U),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){let S=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=Fa(this,o,t,n,c,h,u,S,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=S,w=y;_<w;_+=3){let T=_,C=_+1,U=_+2;s=Fa(this,p,t,n,c,h,u,T,C,U),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){let S=m,y=m+1,_=m+2;s=Fa(this,o,t,n,c,h,u,S,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};Ji=class i extends Ie{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(u,2));function g(x,m,p,S,y,_,w,T,C,U,b){let M=_/C,N=w/U,H=_/2,z=w/2,K=T/2,st=C+1,$=U+1,Mt=0,A=0,O=new I;for(let X=0;X<$;X++){let ot=X*N-z;for(let ut=0;ut<st;ut++){let wt=ut*M-H;O[x]=wt*S,O[m]=ot*y,O[p]=K,c.push(O.x,O.y,O.z),O[x]=0,O[m]=0,O[p]=T>0?1:-1,h.push(O.x,O.y,O.z),u.push(ut/C),u.push(1-X/U),Mt+=1}}for(let X=0;X<U;X++)for(let ot=0;ot<C;ot++){let ut=f+ot+st*X,wt=f+ot+st*(X+1),_t=f+(ot+1)+st*(X+1),Ct=f+(ot+1)+st*X;l.push(ut,wt,Ct),l.push(wt,_t,Ct),A+=6}a.addGroup(d,A,b),d+=A,f+=Mt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};dp={clone:Ns,merge:mn},Ug=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Pn=class extends dn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ug,this.fragmentShader=Fg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ns(t.uniforms),this.uniformsGroups=Ng(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},To=class extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ki=new I,$f=new Rt,Zf=new Rt,He=class extends To{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(dr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z)}getViewSize(t,e){return this.getViewBounds(t,$f,Zf),e.subVectors(Zf,$f)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(dr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},rr=-90,or=1,ac=class extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new He(rr,or,t,e);s.layers=this.layers,this.add(s);let r=new He(rr,or,t,e);r.layers=this.layers,this.add(r);let o=new He(rr,or,t,e);o.layers=this.layers,this.add(o);let a=new He(rr,or,t,e);a.layers=this.layers,this.add(a);let l=new He(rr,or,t,e);l.layers=this.layers,this.add(l);let c=new He(rr,or,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Mo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},wo=class extends je{constructor(t=[],e=Ps,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},cc=class extends Hn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new wo(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ji(5,5,5),r=new Pn({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:Fi});r.uniforms.tEquirect.value=e;let o=new ee(s,r),a=e.minFilter;return e.minFilter===ni&&(e.minFilter=xn),new ac(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},We=class extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},Og={type:"move"},Sr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new We,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new We,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new We,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Og)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new We;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},ei=class extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},ys=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ic,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},_n=new I,Qi=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)_n.fromBufferAttribute(this,e),_n.applyMatrix4(t),this.setXYZ(e,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_n.fromBufferAttribute(this,e),_n.applyNormalMatrix(t),this.setXYZ(e,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_n.fromBufferAttribute(this,e),_n.transformDirection(t),this.setXYZ(e,_n.x,_n.y,_n.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Jn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Jn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Jn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Jn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array),r=Ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Fe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},br=class extends dn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},co=new I,cr=new I,lr=new I,hr=new Rt,lo=new Rt,pp=new ie,Oa=new I,ho=new I,Ba=new I,Kf=new Rt,dh=new Rt,jf=new Rt,Ao=class extends Ce{constructor(t=new br){if(super(),this.isSprite=!0,this.type="Sprite",ar===void 0){ar=new Ie;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ys(e,5);ar.setIndex([0,1,2,0,2,3]),ar.setAttribute("position",new Qi(n,3,0,!1)),ar.setAttribute("uv",new Qi(n,2,3,!1))}this.geometry=ar,this.material=t,this.center=new Rt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cr.setFromMatrixScale(this.matrixWorld),pp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),lr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cr.multiplyScalar(-lr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;ka(Oa.set(-.5,-.5,0),lr,o,cr,s,r),ka(ho.set(.5,-.5,0),lr,o,cr,s,r),ka(Ba.set(.5,.5,0),lr,o,cr,s,r),Kf.set(0,0),dh.set(1,0),jf.set(1,1);let a=t.ray.intersectTriangle(Oa,ho,Ba,!1,co);if(a===null&&(ka(ho.set(-.5,.5,0),lr,o,cr,s,r),dh.set(0,1),a=t.ray.intersectTriangle(Oa,Ba,ho,!1,co),a===null))return;let l=t.ray.origin.distanceTo(co);l<t.near||l>t.far||e.push({distance:l,point:co.clone(),uv:oi.getInterpolation(co,Oa,ho,Ba,Kf,dh,jf,new Rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};Jf=new I,Qf=new be,td=new be,Bg=new I,ed=new ie,za=new I,ph=new Sn,nd=new ie,mh=new hi,Ro=class extends ee{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Th,this.bindMatrix=new ie,this.bindMatrixInverse=new ie,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new In),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,za),this.boundingBox.expandByPoint(za)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Sn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,za),this.boundingSphere.expandByPoint(za)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ph.copy(this.boundingSphere),ph.applyMatrix4(s),t.ray.intersectsSphere(ph)!==!1&&(nd.copy(s).invert(),mh.copy(t.ray).applyMatrix4(nd),!(this.boundingBox!==null&&mh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,mh)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new be,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Th?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;Qf.fromBufferAttribute(s.attributes.skinIndex,t),td.fromBufferAttribute(s.attributes.skinWeight,t),Jf.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=td.getComponent(r);if(o!==0){let a=Qf.getComponent(r);ed.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Bg.copy(Jf).applyMatrix4(ed),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},Er=class extends Ce{constructor(){super(),this.isBone=!0,this.type="Bone"}},Co=class extends je{constructor(t=null,e=1,n=1,s,r,o,a,l,c=on,h=on,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},id=new ie,kg=new ie,Io=class i{constructor(t=[],e=[]){this.uuid=kn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ie)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new ie;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:kg;id.multiplyMatrices(a,e[r]),id.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Co(e,t,t,Dn,Xn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Er),this.bones.push(o),this.boneInverses.push(new ie().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},ts=class extends Fe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ur=new ie,sd=new ie,Ha=[],rd=new In,zg=new ie,uo=new ee,fo=new Sn,vs=class extends ee{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ts(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,zg)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new In),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ur),rd.copy(t.boundingBox).applyMatrix4(ur),this.boundingBox.union(rd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ur),fo.copy(t.boundingSphere).applyMatrix4(ur),this.boundingSphere.union(fo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(uo.geometry=this.geometry,uo.material=this.material,uo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fo.copy(this.boundingSphere),fo.applyMatrix4(n),t.ray.intersectsSphere(fo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ur),sd.multiplyMatrices(n,ur),uo.matrixWorld=sd,uo.raycast(t,Ha);for(let o=0,a=Ha.length;o<a;o++){let l=Ha[o];l.instanceId=r,l.object=this,e.push(l)}Ha.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ts(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Co(new Float32Array(s*this.count),s,this.count,Hc,Xn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},gh=new I,Hg=new I,Vg=new oe,Mn=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=gh.subVectors(n,e).cross(Hg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(gh),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Vg.getNormalMatrix(t),s=this.coplanarPoint(gh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},fs=new Sn,Gg=new Rt(.5,.5),Va=new I,Tr=class{constructor(t=new Mn,e=new Mn,n=new Mn,s=new Mn,r=new Mn,o=new Mn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Qn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],x=r[9],m=r[10],p=r[11],S=r[12],y=r[13],_=r[14],w=r[15];if(s[0].setComponents(c-o,d-h,p-g,w-S).normalize(),s[1].setComponents(c+o,d+h,p+g,w+S).normalize(),s[2].setComponents(c+a,d+u,p+x,w+y).normalize(),s[3].setComponents(c-a,d-u,p-x,w-y).normalize(),n)s[4].setComponents(l,f,m,_).normalize(),s[5].setComponents(c-l,d-f,p-m,w-_).normalize();else if(s[4].setComponents(c-l,d-f,p-m,w-_).normalize(),e===Qn)s[5].setComponents(c+l,d+f,p+m,w+_).normalize();else if(e===Mo)s[5].setComponents(l,f,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(t){fs.center.set(0,0,0);let e=Gg.distanceTo(t.center);return fs.radius=.7071067811865476+e,fs.applyMatrix4(t.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Va.x=s.normal.x>0?t.max.x:t.min.x,Va.y=s.normal.y>0?t.max.y:t.min.y,Va.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Va)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},es=class extends dn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},lc=new I,hc=new I,od=new ie,po=new hi,Ga=new Sn,_h=new I,ad=new I,Ms=class extends Ce{constructor(t=new Ie,e=new es){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)lc.fromBufferAttribute(e,s-1),hc.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=lc.distanceTo(hc);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ga.copy(n.boundingSphere),Ga.applyMatrix4(s),Ga.radius+=r,t.ray.intersectsSphere(Ga)===!1)return;od.copy(s).invert(),po.copy(t.ray).applyMatrix4(od);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=c){let p=h.getX(x),S=h.getX(x+1),y=Wa(this,t,po,l,p,S,x);y&&e.push(y)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(d),p=Wa(this,t,po,l,x,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=c){let p=Wa(this,t,po,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){let x=Wa(this,t,po,l,g-1,d,g-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};cd=new I,ld=new I,Ss=class extends Ms{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)cd.fromBufferAttribute(e,s),ld.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+cd.distanceTo(ld);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Po=class extends Ms{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},wr=class extends dn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},hd=new ie,Ih=new hi,Xa=new Sn,qa=new I,Lo=class extends Ce{constructor(t=new Ie,e=new wr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(s),Xa.radius+=r,t.ray.intersectsSphere(Xa)===!1)return;hd.copy(s).invert(),Ih.copy(t.ray).applyMatrix4(hd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,x=d;g<x;g++){let m=c.getX(g);qa.fromBufferAttribute(u,m),ud(qa,m,l,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,x=d;g<x;g++)qa.fromBufferAttribute(u,g),ud(qa,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Ci=class extends je{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Do=class extends je{constructor(t,e,n=ns,s,r,o,a=on,l=on,c,h=_r,u=1){if(h!==_r&&h!==Or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new vr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},No=class extends je{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Gn=class i extends Ie{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new I,h=new Rt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new _e(o,3)),this.setAttribute("normal",new _e(a,3)),this.setAttribute("uv",new _e(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ar=class i extends Ie{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,x=[],m=n/2,p=0;S(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new _e(u,3)),this.setAttribute("normal",new _e(f,3)),this.setAttribute("uv",new _e(d,2));function S(){let _=new I,w=new I,T=0,C=(e-t)/n;for(let U=0;U<=r;U++){let b=[],M=U/r,N=M*(e-t)+t;for(let H=0;H<=s;H++){let z=H/s,K=z*l+a,st=Math.sin(K),$=Math.cos(K);w.x=N*st,w.y=-M*n+m,w.z=N*$,u.push(w.x,w.y,w.z),_.set(st,C,$).normalize(),f.push(_.x,_.y,_.z),d.push(z,1-M),b.push(g++)}x.push(b)}for(let U=0;U<s;U++)for(let b=0;b<r;b++){let M=x[b][U],N=x[b+1][U],H=x[b+1][U+1],z=x[b][U+1];(t>0||b!==0)&&(h.push(M,N,z),T+=3),(e>0||b!==r-1)&&(h.push(N,H,z),T+=3)}c.addGroup(p,T,0),p+=T}function y(_){let w=g,T=new Rt,C=new I,U=0,b=_===!0?t:e,M=_===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;let N=g;for(let H=0;H<=s;H++){let K=H/s*l+a,st=Math.cos(K),$=Math.sin(K);C.x=b*$,C.y=m*M,C.z=b*st,u.push(C.x,C.y,C.z),f.push(0,M,0),T.x=st*.5+.5,T.y=$*.5*M+.5,d.push(T.x,T.y),g++}for(let H=0;H<s;H++){let z=w+H,K=N+H;_===!0?h.push(K,K+1,z):h.push(K+1,K,z),U+=3}c.addGroup(p,U,_===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},bs=class i extends Ar{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ya=new I,$a=new I,xh=new I,Za=new oi,Uo=class extends Ie{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(dr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:m,c:p}=Za;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Za.getNormal(xh),u[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){let y=(S+1)%3,_=u[S],w=u[y],T=Za[h[S]],C=Za[h[y]],U=`${_}_${w}`,b=`${w}_${_}`;b in f&&f[b]?(xh.dot(f[b].normal)<=r&&(d.push(T.x,T.y,T.z),d.push(C.x,C.y,C.z)),f[b]=null):U in f||(f[U]={index0:c[S],index1:c[y],normal:xh.clone()})}}for(let g in f)if(f[g]){let{index0:x,index1:m}=f[g];Ya.fromBufferAttribute(a,x),$a.fromBufferAttribute(a,m),d.push(Ya.x,Ya.y,Ya.z),d.push($a.x,$a.y,$a.z)}this.setAttribute("position",new _e(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},Ln=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Rt:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new I,s=[],r=[],o=[],a=new I,l=new ie;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ae(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ae(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Rr=class extends Ln{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Rt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},uc=class extends Rr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};Ka=new I,yh=new ru,vh=new ru,Mh=new ru,fc=class extends Ln{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Ka.subVectors(s[0],s[1]).add(s[0]),c=Ka);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ka.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ka),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),yh.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,x,m),vh.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,x,m),Mh.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(yh.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),vh.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Mh.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(yh.calc(l),vh.calc(l),Mh.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Fo=class extends Ln{constructor(t=new Rt,e=new Rt,n=new Rt,s=new Rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Rt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(yo(t,s.x,r.x,o.x,a.x),yo(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},dc=class extends Ln{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(yo(t,s.x,r.x,o.x,a.x),yo(t,s.y,r.y,o.y,a.y),yo(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Oo=class extends Ln{constructor(t=new Rt,e=new Rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Rt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},pc=class extends Ln{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Bo=class extends Ln{constructor(t=new Rt,e=new Rt,n=new Rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Rt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xo(t,s.x,r.x,o.x),xo(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},mc=class extends Ln{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xo(t,s.x,r.x,o.x),xo(t,s.y,r.y,o.y),xo(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ko=class extends Ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Rt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(fd(a,l.x,c.x,h.x,u.x),fd(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new Rt().fromArray(s))}return this}},dd=Object.freeze({__proto__:null,ArcCurve:uc,CatmullRomCurve3:fc,CubicBezierCurve:Fo,CubicBezierCurve3:dc,EllipseCurve:Rr,LineCurve:Oo,LineCurve3:pc,QuadraticBezierCurve:Bo,QuadraticBezierCurve3:mc,SplineCurve:ko}),gc=class extends Ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dd[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new dd[s.type]().fromJSON(s))}return this}},zo=class extends gc{constructor(t){super(),this.type="Path",this.currentPoint=new Rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Oo(this.currentPoint.clone(),new Rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Bo(this.currentPoint.clone(),new Rt(t,e),new Rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Fo(this.currentPoint.clone(),new Rt(t,e),new Rt(n,s),new Rt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ko(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new Rr(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Cr=class extends zo{constructor(t){super(t),this.uuid=kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new zo().fromJSON(s))}return this}};Dh=class{static triangulate(t,e,n=2){return jg(t,e,n)}},mr=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];md(t),gd(n,t);let o=t.length;e.forEach(md);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,gd(n,e[l]);let a=Dh.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};Ts=class i extends Ie{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let S=p*f-o;for(let y=0;y<c;y++){let _=y*u-r;g.push(_,-S,0),x.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){let y=S+c*p,_=S+c*(p+1),w=S+1+c*(p+1),T=S+1+c*p;d.push(y,_,T),d.push(_,w,T)}this.setIndex(d),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(x,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ws=class i extends Ie{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],c=[],h=[],u=t,f=(e-t)/s,d=new I,g=new Rt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let x=0;x<s;x++){let m=x*(n+1);for(let p=0;p<n;p++){let S=p+m,y=S,_=S+n+1,w=S+n+2,T=S+1;a.push(y,_,T),a.push(_,w,T)}}this.setIndex(a),this.setAttribute("position",new _e(l,3)),this.setAttribute("normal",new _e(c,3)),this.setAttribute("uv",new _e(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Wo=class i extends Ie{constructor(t=new Cr([new Rt(0,.5),new Rt(-.5,-.5),new Rt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new _e(s,3)),this.setAttribute("normal",new _e(r,3)),this.setAttribute("uv",new _e(o,2));function c(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,g=f.holes;mr.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){let S=g[m];mr.isClockWise(S)===!0&&(g[m]=S.reverse())}let x=mr.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){let S=g[m];d=d.concat(S)}for(let m=0,p=d.length;m<p;m++){let S=d[m];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let m=0,p=x.length;m<p;m++){let S=x[m],y=S[0]+u,_=S[1]+u,w=S[2]+u;n.push(y,_,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return p0(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};Ii=class i extends Ie{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new I,f=new I,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let S=[],y=p/n,_=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let w=0;w<=e;w++){let T=w/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(T+_,1-y),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){let y=h[p][S+1],_=h[p][S],w=h[p+1][S],T=h[p+1][S+1];(p!==0||o>0)&&d.push(y,_,T),(p!==n-1||l<Math.PI)&&d.push(_,w,T)}this.setIndex(d),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(x,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},pn=class extends dn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yl,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},bn=class extends pn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Rt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},ui=class extends dn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yl,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},_c=class extends dn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},xc=class extends dn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};Pi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},yc=class extends Pi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wh,endingEnd:wh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ah:r=t,a=2*e-n;break;case Rh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ah:o=t,l=2*n-e;break;case Rh:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,S=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*x+.5*g,_=d*m-d*x;for(let w=0;w!==a;++w)r[w]=p*o[h+w]+S*o[c+w]+y*o[l+w]+_*o[u+w];return r}},vc=class extends Pi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},Mc=class extends Pi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},En=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qa(e,this.TimeBufferType),this.values=Qa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Qa(t.times,Array),values:Qa(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Mc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new vc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new yc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case gs:e=this.InterpolantFactoryMethodDiscrete;break;case _s:e=this.InterpolantFactoryMethodLinear;break;case tc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return gs;case this.InterpolantFactoryMethodLinear:return _s;case this.InterpolantFactoryMethodSmooth:return tc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&m0(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===tc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[f+g]||x!==e[d+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};En.prototype.ValueTypeName="";En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=_s;Li=class extends En{constructor(t,e,n){super(t,e,n)}};Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=gs;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;Xo=class extends En{constructor(t,e,n,s){super(t,e,n,s)}};Xo.prototype.ValueTypeName="color";fi=class extends En{constructor(t,e,n,s){super(t,e,n,s)}};fi.prototype.ValueTypeName="number";Sc=class extends Pi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)yn.slerpFlat(r,0,o,c-a,o,c,l);return r}},di=class extends En{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Sc(this.times,this.values,this.getValueSize(),t)}};di.prototype.ValueTypeName="quaternion";di.prototype.InterpolantFactoryMethodSmooth=void 0;Di=class extends En{constructor(t,e,n){super(t,e,n)}};Di.prototype.ValueTypeName="string";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=gs;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;pi=class extends En{constructor(t,e,n,s){super(t,e,n,s)}};pi.prototype.ValueTypeName="vector";qo=class{constructor(t="",e=-1,n=[],s=Qd){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(x0(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(En.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=g0(l);l=_d(l,1,h),c=_d(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new fi(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,g,x){if(d.length!==0){let m=[],p=[];yp(d,m,p,g),m.length!==0&&x.push(new u(f,m,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode,l=t.length||-1,c=t.hierarchy||[];for(let u=0;u<c.length;u++){let f=c[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)d[f[g].morphTargets[x]]=-1;for(let x in d){let m=[],p=[];for(let S=0;S!==f[g].morphTargets.length;++S){let y=f[g];m.push(y.time),p.push(y.morphTarget===x?1:0)}s.push(new fi(".morphTargetInfluence["+x+"]",m,p))}l=d.length*o}else{let d=".bones["+e[u].name+"]";n(pi,d+".position",f,"pos",s),n(di,d+".quaternion",f,"rot",s),n(pi,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};ci={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},bc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},vp=new bc,mi=class{constructor(t){this.manager=t!==void 0?t:vp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};mi.DEFAULT_MATERIAL_NAME="__DEFAULT";Ai={},Nh=class extends Error{constructor(t,e){super(t),this.response=e}},Pr=class extends mi{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=ci.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Ai[t]!==void 0){Ai[t].push({onLoad:e,onProgress:n,onError:s});return}Ai[t]=[],Ai[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Ai[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0,x=0,m=new ReadableStream({start(p){S();function S(){u.read().then(({done:y,value:_})=>{if(y)p.close();else{x+=_.byteLength;let w=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:d});for(let T=0,C=h.length;T<C;T++){let U=h[T];U.onProgress&&U.onProgress(w)}p.enqueue(_),S()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Nh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{ci.add(`file:${t}`,c);let h=Ai[t];delete Ai[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=Ai[t];if(h===void 0)throw this.manager.itemError(t),c;delete Ai[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},fr=new WeakMap,Ec=class extends mi{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=ci.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=fr.get(o);u===void 0&&(u=[],fr.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=xr("img");function l(){h(),e&&e(this);let u=fr.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}fr.delete(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),ci.remove(`image:${t}`);let f=fr.get(this)||[];for(let d=0;d<f.length;d++){let g=f[d];g.onError&&g.onError(u)}fr.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ci.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}},Yo=class extends mi{constructor(t){super(t)}load(t,e,n,s){let r=new je,o=new Ec(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},As=class extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Rs=class extends As{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Sh=new ie,xd=new I,yd=new I,$o=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.mapType=ii,this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tr,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;xd.setFromMatrixPosition(t.matrixWorld),e.position.copy(xd),yd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yd),e.updateMatrixWorld(),Sh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sh,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Sh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Uh=class extends $o{constructor(){super(new He(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=xs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Zo=class extends As{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Uh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},vd=new ie,mo=new I,bh=new I,Fh=class extends $o{constructor(){super(new He(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Rt(4,2),this._viewportCount=6,this._viewports=[new be(2,1,1,1),new be(0,1,1,1),new be(3,1,1,1),new be(1,1,1,1),new be(3,0,1,1),new be(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),mo.setFromMatrixPosition(t.matrixWorld),n.position.copy(mo),bh.copy(n.position),bh.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(bh),n.updateMatrixWorld(),s.makeTranslation(-mo.x,-mo.y,-mo.z),vd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vd,n.coordinateSystem,n.reversedDepth)}},Cs=class extends As{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Fh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ni=class extends To{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Oh=class extends $o{constructor(){super(new Ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Is=class extends As{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Oh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Ui=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Eh=new WeakMap,Ko=class extends mi{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=ci.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(c=>{if(Eh.has(o)===!0)s&&s(Eh.get(o)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(c),r.manager.itemEnd(t),c});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ci.add(`image-bitmap:${t}`,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){s&&s(c),Eh.set(l,c),ci.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});ci.add(`image-bitmap:${t}`,l),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Tc=class extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},ou="\\[\\]\\.:\\/",y0=new RegExp("["+ou+"]","g"),au="[^"+ou+"]",v0="[^"+ou.replace("\\.","")+"]",M0=/((?:WC+[\/:])*)/.source.replace("WC",au),S0=/(WCOD+)?/.source.replace("WCOD",v0),b0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",au),E0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",au),T0=new RegExp("^"+M0+S0+b0+E0+"$"),w0=["material","materials","bones","map"],Bh=class{constructor(t,e,n){let s=n||Ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ue=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(y0,"")}static parseTrackName(t){let e=T0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);w0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ue.Composite=Bh;Ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ue.prototype.GetterByBindingType=[Ue.prototype._getValue_direct,Ue.prototype._getValue_array,Ue.prototype._getValue_arrayElement,Ue.prototype._getValue_toArray];Ue.prototype.SetterByBindingTypeAndVersioning=[[Ue.prototype._setValue_direct,Ue.prototype._setValue_direct_setNeedsUpdate,Ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_array,Ue.prototype._setValue_array_setNeedsUpdate,Ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_arrayElement,Ue.prototype._setValue_arrayElement_setNeedsUpdate,Ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_fromArray,Ue.prototype._setValue_fromArray_setNeedsUpdate,Ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];tS=new Float32Array(1),Md=new ie,jo=class{constructor(t,e,n=0,s=1/0){this.ray=new hi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Md.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Md),this}intersectObject(t,e=!0,n=[]){return kh(t,this,n,e),n.sort(Sd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)kh(t[s],this,n,e);return n.sort(Sd),n}};Lr=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ae(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ae(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Jo=class extends li{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180")});function Wp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function C0(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let x=u[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}function hy(i,t,e,n,s,r,o){let a=new Jt(0),l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1,w=g(y);w===null?p(a,l):w&&w.isColor&&(p(w,1),_=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,_){let w=g(_);w&&(w.isCubeTexture||w.mapping===Qo)?(h===void 0&&(h=new ee(new Ji(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Ns(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Us.copy(_.backgroundRotation),Us.x*=-1,Us.y*=-1,Us.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Us.y*=-1,Us.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ly.makeRotationFromEuler(Us)),h.material.toneMapped=ge.getTransfer(w.colorSpace)!==Re,(u!==w||f!==w.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new ee(new Ts(2,2),new Pn({name:"BackgroundMaterial",uniforms:Ns(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ge.getTransfer(w.colorSpace)!==Re,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(vl,su(i)),n.buffers.color.setClear(vl.r,vl.g,vl.b,_,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:x,addToRenderList:m,dispose:S}}function uy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(M,N,H,z,K){let st=!1,$=u(z,H,N);r!==$&&(r=$,c(r.object)),st=d(M,z,H,K),st&&g(M,z,H,K),K!==null&&t.update(K,i.ELEMENT_ARRAY_BUFFER),(st||o)&&(o=!1,_(M,N,H,z),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,N,H){let z=H.wireframe===!0,K=n[M.id];K===void 0&&(K={},n[M.id]=K);let st=K[N.id];st===void 0&&(st={},K[N.id]=st);let $=st[z];return $===void 0&&($=f(l()),st[z]=$),$}function f(M){let N=[],H=[],z=[];for(let K=0;K<e;K++)N[K]=0,H[K]=0,z[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:H,attributeDivisors:z,object:M,attributes:{},index:null}}function d(M,N,H,z){let K=r.attributes,st=N.attributes,$=0,Mt=H.getAttributes();for(let A in Mt)if(Mt[A].location>=0){let X=K[A],ot=st[A];if(ot===void 0&&(A==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),A==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor)),X===void 0||X.attribute!==ot||ot&&X.data!==ot.data)return!0;$++}return r.attributesNum!==$||r.index!==z}function g(M,N,H,z){let K={},st=N.attributes,$=0,Mt=H.getAttributes();for(let A in Mt)if(Mt[A].location>=0){let X=st[A];X===void 0&&(A==="instanceMatrix"&&M.instanceMatrix&&(X=M.instanceMatrix),A==="instanceColor"&&M.instanceColor&&(X=M.instanceColor));let ot={};ot.attribute=X,X&&X.data&&(ot.data=X.data),K[A]=ot,$++}r.attributes=K,r.attributesNum=$,r.index=z}function x(){let M=r.newAttributes;for(let N=0,H=M.length;N<H;N++)M[N]=0}function m(M){p(M,0)}function p(M,N){let H=r.newAttributes,z=r.enabledAttributes,K=r.attributeDivisors;H[M]=1,z[M]===0&&(i.enableVertexAttribArray(M),z[M]=1),K[M]!==N&&(i.vertexAttribDivisor(M,N),K[M]=N)}function S(){let M=r.newAttributes,N=r.enabledAttributes;for(let H=0,z=N.length;H<z;H++)N[H]!==M[H]&&(i.disableVertexAttribArray(H),N[H]=0)}function y(M,N,H,z,K,st,$){$===!0?i.vertexAttribIPointer(M,N,H,K,st):i.vertexAttribPointer(M,N,H,z,K,st)}function _(M,N,H,z){x();let K=z.attributes,st=H.getAttributes(),$=N.defaultAttributeValues;for(let Mt in st){let A=st[Mt];if(A.location>=0){let O=K[Mt];if(O===void 0&&(Mt==="instanceMatrix"&&M.instanceMatrix&&(O=M.instanceMatrix),Mt==="instanceColor"&&M.instanceColor&&(O=M.instanceColor)),O!==void 0){let X=O.normalized,ot=O.itemSize,ut=t.get(O);if(ut===void 0)continue;let wt=ut.buffer,_t=ut.type,Ct=ut.bytesPerElement,et=_t===i.INT||_t===i.UNSIGNED_INT||O.gpuType===Bc;if(O.isInterleavedBufferAttribute){let L=O.data,rt=L.stride,Nt=O.offset;if(L.isInstancedInterleavedBuffer){for(let Ut=0;Ut<A.locationSize;Ut++)p(A.location+Ut,L.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let Ut=0;Ut<A.locationSize;Ut++)m(A.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let Ut=0;Ut<A.locationSize;Ut++)y(A.location+Ut,ot/A.locationSize,_t,X,rt*Ct,(Nt+ot/A.locationSize*Ut)*Ct,et)}else{if(O.isInstancedBufferAttribute){for(let L=0;L<A.locationSize;L++)p(A.location+L,O.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let L=0;L<A.locationSize;L++)m(A.location+L);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let L=0;L<A.locationSize;L++)y(A.location+L,ot/A.locationSize,_t,X,ot*Ct,ot/A.locationSize*L*Ct,et)}}else if($!==void 0){let X=$[Mt];if(X!==void 0)switch(X.length){case 2:i.vertexAttrib2fv(A.location,X);break;case 3:i.vertexAttrib3fv(A.location,X);break;case 4:i.vertexAttrib4fv(A.location,X);break;default:i.vertexAttrib1fv(A.location,X)}}}}S()}function w(){U();for(let M in n){let N=n[M];for(let H in N){let z=N[H];for(let K in z)h(z[K].object),delete z[K];delete N[H]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let N=n[M.id];for(let H in N){let z=N[H];for(let K in z)h(z[K].object),delete z[K];delete N[H]}delete n[M.id]}function C(M){for(let N in n){let H=n[N];if(H[M.id]===void 0)continue;let z=H[M.id];for(let K in z)h(z[K].object),delete z[K];delete H[M.id]}}function U(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:b,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function fy(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Dn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let U=C===Ur&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==ii&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Xn&&!U)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:w,maxSamples:T}}function py(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Mn,a=new oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let S=r?0:n,y=S*4,_=p.clippingState||null;l.value=_,_=h(g,f,y,d);for(let w=0;w!==y;++w)_[w]=e[w];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=d+x*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=d;y!==x;++y,_+=4)o.copy(u[y]).applyMatrix4(S,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function my(i){let t=new WeakMap;function e(o,a){return a===Uc?o.mapping=Ps:a===Fc&&(o.mapping=Ls),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Uc||a===Fc)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new cc(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}function _y(i){let t=[],e=[],n=[],s=i,r=i-zr+1+Mp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-zr?l=Mp[o-i+zr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,x=3,m=2,p=1,S=new Float32Array(x*g*d),y=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let T=0;T<d;T++){let C=T%3*2/3-1,U=T>2?0:-1,b=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];S.set(b,x*g*T),y.set(f,m*g*T);let M=[T,T,T,T,T,T];_.set(M,p*g*T)}let w=new Ie;w.setAttribute("position",new Fe(S,x)),w.setAttribute("uv",new Fe(y,m)),w.setAttribute("faceIndex",new Fe(_,p)),t.push(w),s>zr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ep(i,t,e){let n=new Hn(i,t,e);return n.texture.mapping=Qo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ml(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function xy(i,t,e){let n=new Float32Array(Bs),s=new I(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:Bs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Eu(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Tp(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eu(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function wp(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Eu(){return`

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
	`}function yy(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Uc||l===Fc,h=l===Ps||l===Ls;if(c||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Vr(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Vr(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function vy(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&yr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function My(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let d in f)t.update(f[d],i.ARRAY_BUFFER)}function c(u){let f=[],d=u.index,g=u.attributes.position,x=0;if(d!==null){let S=d.array;x=d.version;for(let y=0,_=S.length;y<_;y+=3){let w=S[y+0],T=S[y+1],C=S[y+2];f.push(w,T,T,C,C,w)}}else if(g!==void 0){let S=g.array;x=g.version;for(let y=0,_=S.length/3-1;y<_;y+=3){let w=y+0,T=y+1,C=y+2;f.push(w,T,T,C,C,w)}}else return;let m=new(iu(f)?Eo:bo)(f,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Sy(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let p=0;for(let S=0;S<g;S++)p+=d[S]*x[S];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function by(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ey(i,t,e){let n=new WeakMap,s=new be;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],y=0;d===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,w=1;_>t.maxTextureSize&&(w=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let T=new Float32Array(_*w*4*u),C=new So(T,_,w,u);C.type=Xn,C.needsUpdate=!0;let U=y*4;for(let M=0;M<u;M++){let N=m[M],H=p[M],z=S[M],K=_*w*4*M;for(let st=0;st<N.count;st++){let $=st*U;d===!0&&(s.fromBufferAttribute(N,st),T[K+$+0]=s.x,T[K+$+1]=s.y,T[K+$+2]=s.z,T[K+$+3]=0),g===!0&&(s.fromBufferAttribute(H,st),T[K+$+4]=s.x,T[K+$+5]=s.y,T[K+$+6]=s.z,T[K+$+7]=0),x===!0&&(s.fromBufferAttribute(z,st),T[K+$+8]=s.x,T[K+$+9]=s.y,T[K+$+10]=s.z,T[K+$+11]=z.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new Rt(_,w)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];let g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ty(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}function Wr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Rp[s];if(r===void 0&&(r=new Float32Array(s),Rp[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Je(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Qe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function bl(i,t){let e=Cp[t];e===void 0&&(e=new Int32Array(t),Cp[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function wy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ay(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2fv(this.addr,t),Qe(e,t)}}function Ry(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Je(e,t))return;i.uniform3fv(this.addr,t),Qe(e,t)}}function Cy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4fv(this.addr,t),Qe(e,t)}}function Iy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Qe(e,t)}else{if(Je(e,n))return;Lp.set(n),i.uniformMatrix2fv(this.addr,!1,Lp),Qe(e,n)}}function Py(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Qe(e,t)}else{if(Je(e,n))return;Pp.set(n),i.uniformMatrix3fv(this.addr,!1,Pp),Qe(e,n)}}function Ly(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Qe(e,t)}else{if(Je(e,n))return;Ip.set(n),i.uniformMatrix4fv(this.addr,!1,Ip),Qe(e,n)}}function Dy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ny(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2iv(this.addr,t),Qe(e,t)}}function Uy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;i.uniform3iv(this.addr,t),Qe(e,t)}}function Fy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4iv(this.addr,t),Qe(e,t)}}function Oy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function By(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2uiv(this.addr,t),Qe(e,t)}}function ky(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;i.uniform3uiv(this.addr,t),Qe(e,t)}}function zy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4uiv(this.addr,t),Qe(e,t)}}function Hy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ap.compareFunction=tu,r=Ap):r=Xp,e.setTexture2D(t||r,s)}function Vy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Yp,s)}function Gy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||$p,s)}function Wy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||qp,s)}function Xy(i){switch(i){case 5126:return wy;case 35664:return Ay;case 35665:return Ry;case 35666:return Cy;case 35674:return Iy;case 35675:return Py;case 35676:return Ly;case 5124:case 35670:return Dy;case 35667:case 35671:return Ny;case 35668:case 35672:return Uy;case 35669:case 35673:return Fy;case 5125:return Oy;case 36294:return By;case 36295:return ky;case 36296:return zy;case 35678:case 36198:case 36298:case 36306:case 35682:return Hy;case 35679:case 36299:case 36307:return Vy;case 35680:case 36300:case 36308:case 36293:return Gy;case 36289:case 36303:case 36311:case 36292:return Wy}}function qy(i,t){i.uniform1fv(this.addr,t)}function Yy(i,t){let e=Wr(t,this.size,2);i.uniform2fv(this.addr,e)}function $y(i,t){let e=Wr(t,this.size,3);i.uniform3fv(this.addr,e)}function Zy(i,t){let e=Wr(t,this.size,4);i.uniform4fv(this.addr,e)}function Ky(i,t){let e=Wr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function jy(i,t){let e=Wr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Jy(i,t){let e=Wr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Qy(i,t){i.uniform1iv(this.addr,t)}function tv(i,t){i.uniform2iv(this.addr,t)}function ev(i,t){i.uniform3iv(this.addr,t)}function nv(i,t){i.uniform4iv(this.addr,t)}function iv(i,t){i.uniform1uiv(this.addr,t)}function sv(i,t){i.uniform2uiv(this.addr,t)}function rv(i,t){i.uniform3uiv(this.addr,t)}function ov(i,t){i.uniform4uiv(this.addr,t)}function av(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Xp,r[o])}function cv(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Yp,r[o])}function lv(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||$p,r[o])}function hv(i,t,e){let n=this.cache,s=t.length,r=bl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||qp,r[o])}function uv(i){switch(i){case 5126:return qy;case 35664:return Yy;case 35665:return $y;case 35666:return Zy;case 35674:return Ky;case 35675:return jy;case 35676:return Jy;case 5124:case 35670:return Qy;case 35667:case 35671:return tv;case 35668:case 35672:return ev;case 35669:case 35673:return nv;case 5125:return iv;case 36294:return sv;case 36295:return rv;case 36296:return ov;case 35678:case 36198:case 36298:case 36306:case 35682:return av;case 35679:case 36299:case 36307:return cv;case 35680:case 36300:case 36308:case 36293:return lv;case 36289:case 36303:case 36311:case 36292:return hv}}function Dp(i,t){i.seq.push(t),i.map[t.id]=t}function fv(i,t,e){let n=i.name,s=n.length;for(mu.lastIndex=0;;){let r=mu.exec(n),o=mu.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Dp(e,c===void 0?new gu(a,i,t):new _u(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new xu(a),Dp(e,u)),e=u}}}function Np(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}function mv(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function gv(i){ge._getMatrix(Up,ge.workingColorSpace,i);let t=`mat3( ${Up.elements.map(e=>e.toFixed(4))} )`;switch(ge.getTransfer(i)){case vo:return[t,"LinearTransferOETF"];case Re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Fp(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+mv(i.getShaderSource(t),a)}else return r}function _v(i,t){let e=gv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function xv(i,t){let e;switch(t){case qd:e="Linear";break;case Yd:e="Reinhard";break;case $d:e="Cineon";break;case Zd:e="ACESFilmic";break;case jd:e="AgX";break;case Nc:e="Neutral";break;case Kd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function yv(){ge.getLuminanceCoefficients(Sl);let i=Sl.x.toFixed(4),t=Sl.y.toFixed(4),e=Sl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oa).join(`
`)}function Mv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Sv(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function oa(i){return i!==""}function Op(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bp(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function yu(i){return i.replace(bv,Tv)}function Tv(i,t){let e=ce[t];if(e===void 0){let n=Ev.get(t);if(n!==void 0)e=ce[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return yu(e)}function kp(i){return i.replace(wv,Av)}function Av(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zp(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Rv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Hh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Td?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===gi&&(t="SHADOWMAP_TYPE_VSM"),t}function Cv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ps:case Ls:t="ENVMAP_TYPE_CUBE";break;case Qo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Iv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ls:t="ENVMAP_MODE_REFRACTION";break}return t}function Pv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Dc:t="ENVMAP_BLENDING_MULTIPLY";break;case Wd:t="ENVMAP_BLENDING_MIX";break;case Xd:t="ENVMAP_BLENDING_ADD";break}return t}function Lv(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Dv(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Rv(e),c=Cv(e),h=Iv(e),u=Pv(e),f=Lv(e),d=vv(e),g=Mv(r),x=s.createProgram(),m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(oa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(oa).join(`
`),p.length>0&&(p+=`
`)):(m=[zp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oa).join(`
`),p=[zp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?ce.tonemapping_pars_fragment:"",e.toneMapping!==Oi?xv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,_v("linearToOutputTexel",e.outputColorSpace),yv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(oa).join(`
`)),o=yu(o),o=Op(o,e),o=Bp(o,e),a=yu(a),a=Op(a,e),a=Bp(a,e),o=kp(o),a=kp(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===eu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===eu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=S+m+o,_=S+p+a,w=Np(s,s.VERTEX_SHADER,y),T=Np(s,s.FRAGMENT_SHADER,_);s.attachShader(x,w),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(N){if(i.debug.checkShaderErrors){let H=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(w)||"",K=s.getShaderInfoLog(T)||"",st=H.trim(),$=z.trim(),Mt=K.trim(),A=!0,O=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(A=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,w,T);else{let X=Fp(s,w,"vertex"),ot=Fp(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+st+`
`+X+`
`+ot)}else st!==""?console.warn("THREE.WebGLProgram: Program Info Log:",st):($===""||Mt==="")&&(O=!1);O&&(N.diagnostics={runnable:A,programLog:st,vertexShader:{log:$,prefix:m},fragmentShader:{log:Mt,prefix:p}})}s.deleteShader(w),s.deleteShader(T),U=new Hr(s,x),b=Sv(s,x)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,dv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=pv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}function Uv(i,t,e,n,s,r,o){let a=new Mr,l=new vu,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,N,H,z){let K=H.fog,st=z.geometry,$=b.isMeshStandardMaterial?H.environment:null,Mt=(b.isMeshStandardMaterial?e:t).get(b.envMap||$),A=Mt&&Mt.mapping===Qo?Mt.image.height:null,O=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let X=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,ot=X!==void 0?X.length:0,ut=0;st.morphAttributes.position!==void 0&&(ut=1),st.morphAttributes.normal!==void 0&&(ut=2),st.morphAttributes.color!==void 0&&(ut=3);let wt,_t,Ct,et;if(O){let Zt=_i[O];wt=Zt.vertexShader,_t=Zt.fragmentShader}else wt=b.vertexShader,_t=b.fragmentShader,l.update(b),Ct=l.getVertexShaderID(b),et=l.getFragmentShaderID(b);let L=i.getRenderTarget(),rt=i.state.buffers.depth.getReversed(),Nt=z.isInstancedMesh===!0,Ut=z.isBatchedMesh===!0,Bt=!!b.map,ye=!!b.matcap,D=!!Mt,Qt=!!b.aoMap,qt=!!b.lightMap,Ht=!!b.bumpMap,kt=!!b.normalMap,ue=!!b.displacementMap,Vt=!!b.emissiveMap,Xt=!!b.metalnessMap,we=!!b.roughnessMap,se=b.anisotropy>0,R=b.clearcoat>0,v=b.dispersion>0,V=b.iridescence>0,B=b.sheen>0,it=b.transmission>0,Q=se&&!!b.anisotropyMap,At=R&&!!b.clearcoatMap,vt=R&&!!b.clearcoatNormalMap,F=R&&!!b.clearcoatRoughnessMap,j=V&&!!b.iridescenceMap,k=V&&!!b.iridescenceThicknessMap,lt=B&&!!b.sheenColorMap,ct=B&&!!b.sheenRoughnessMap,ft=!!b.specularMap,nt=!!b.specularColorMap,It=!!b.specularIntensityMap,P=it&&!!b.transmissionMap,ht=it&&!!b.thicknessMap,dt=!!b.gradientMap,mt=!!b.alphaMap,tt=b.alphaTest>0,Z=!!b.alphaHash,bt=!!b.extensions,Pt=Oi;b.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Pt=i.toneMapping);let ne={shaderID:O,shaderType:b.type,shaderName:b.name,vertexShader:wt,fragmentShader:_t,defines:b.defines,customVertexShaderID:Ct,customFragmentShaderID:et,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Ut,batchingColor:Ut&&z._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&z.instanceColor!==null,instancingMorph:Nt&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:L===null?i.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:an,alphaToCoverage:!!b.alphaToCoverage,map:Bt,matcap:ye,envMap:D,envMapMode:D&&Mt.mapping,envMapCubeUVHeight:A,aoMap:Qt,lightMap:qt,bumpMap:Ht,normalMap:kt,displacementMap:f&&ue,emissiveMap:Vt,normalMapObjectSpace:kt&&b.normalMapType===np,normalMapTangentSpace:kt&&b.normalMapType===yl,metalnessMap:Xt,roughnessMap:we,anisotropy:se,anisotropyMap:Q,clearcoat:R,clearcoatMap:At,clearcoatNormalMap:vt,clearcoatRoughnessMap:F,dispersion:v,iridescence:V,iridescenceMap:j,iridescenceThicknessMap:k,sheen:B,sheenColorMap:lt,sheenRoughnessMap:ct,specularMap:ft,specularColorMap:nt,specularIntensityMap:It,transmission:it,transmissionMap:P,thicknessMap:ht,gradientMap:dt,opaque:b.transparent===!1&&b.blending===ps&&b.alphaToCoverage===!1,alphaMap:mt,alphaTest:tt,alphaHash:Z,combine:b.combine,mapUv:Bt&&x(b.map.channel),aoMapUv:Qt&&x(b.aoMap.channel),lightMapUv:qt&&x(b.lightMap.channel),bumpMapUv:Ht&&x(b.bumpMap.channel),normalMapUv:kt&&x(b.normalMap.channel),displacementMapUv:ue&&x(b.displacementMap.channel),emissiveMapUv:Vt&&x(b.emissiveMap.channel),metalnessMapUv:Xt&&x(b.metalnessMap.channel),roughnessMapUv:we&&x(b.roughnessMap.channel),anisotropyMapUv:Q&&x(b.anisotropyMap.channel),clearcoatMapUv:At&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:vt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:F&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:k&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:ct&&x(b.sheenRoughnessMap.channel),specularMapUv:ft&&x(b.specularMap.channel),specularColorMapUv:nt&&x(b.specularColorMap.channel),specularIntensityMapUv:It&&x(b.specularIntensityMap.channel),transmissionMapUv:P&&x(b.transmissionMap.channel),thicknessMapUv:ht&&x(b.thicknessMap.channel),alphaMapUv:mt&&x(b.alphaMap.channel),vertexTangents:!!st.attributes.tangent&&(kt||se),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!st.attributes.uv&&(Bt||mt),fog:!!K,useFog:b.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:rt,skinning:z.isSkinnedMesh===!0,morphTargets:st.morphAttributes.position!==void 0,morphNormals:st.morphAttributes.normal!==void 0,morphColors:st.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:ut,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:Pt,decodeVideoTexture:Bt&&b.map.isVideoTexture===!0&&ge.getTransfer(b.map.colorSpace)===Re,decodeVideoTextureEmissive:Vt&&b.emissiveMap.isVideoTexture===!0&&ge.getTransfer(b.emissiveMap.colorSpace)===Re,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Te,flipSided:b.side===cn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:bt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&b.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ne.vertexUv1s=c.has(1),ne.vertexUv2s=c.has(2),ne.vertexUv3s=c.has(3),c.clear(),ne}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let N in b.defines)M.push(N),M.push(b.defines[N]);return b.isRawShaderMaterial===!1&&(S(M,b),y(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function S(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let M=g[b.type],N;if(M){let H=_i[M];N=dp.clone(H.uniforms)}else N=b.uniforms;return N}function w(b,M){let N;for(let H=0,z=h.length;H<z;H++){let K=h[H];if(K.cacheKey===M){N=K,++N.usedTimes;break}}return N===void 0&&(N=new Dv(i,M,b,r),h.push(N)),N}function T(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:w,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:U}}function Fv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Ov(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Hp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Vp(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,x,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,f,d,g,x,m){let p=o(u,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,g,x,m){let p=o(u,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||Ov),n.length>1&&n.sort(f||Hp),s.length>1&&s.sort(f||Hp)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Bv(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Vp,i.set(n,[o])):s>=r.length?(o=new Vp,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function kv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Jt};break;case"SpotLight":e={position:new I,direction:new I,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function zv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}function Vv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Gv(i){let t=new kv,e=zv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let s=new I,r=new ie,o=new ie;function a(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,S=0,y=0,_=0,w=0,T=0,C=0;c.sort(Vv);for(let b=0,M=c.length;b<M;b++){let N=c[b],H=N.color,z=N.intensity,K=N.distance,st=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=H.r*z,u+=H.g*z,f+=H.b*z;else if(N.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(N.sh.coefficients[$],z);C++}else if(N.isDirectionalLight){let $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let Mt=N.shadow,A=e.get(N);A.shadowIntensity=Mt.intensity,A.shadowBias=Mt.bias,A.shadowNormalBias=Mt.normalBias,A.shadowRadius=Mt.radius,A.shadowMapSize=Mt.mapSize,n.directionalShadow[d]=A,n.directionalShadowMap[d]=st,n.directionalShadowMatrix[d]=N.shadow.matrix,S++}n.directional[d]=$,d++}else if(N.isSpotLight){let $=t.get(N);$.position.setFromMatrixPosition(N.matrixWorld),$.color.copy(H).multiplyScalar(z),$.distance=K,$.coneCos=Math.cos(N.angle),$.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),$.decay=N.decay,n.spot[x]=$;let Mt=N.shadow;if(N.map&&(n.spotLightMap[w]=N.map,w++,Mt.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[x]=Mt.matrix,N.castShadow){let A=e.get(N);A.shadowIntensity=Mt.intensity,A.shadowBias=Mt.bias,A.shadowNormalBias=Mt.normalBias,A.shadowRadius=Mt.radius,A.shadowMapSize=Mt.mapSize,n.spotShadow[x]=A,n.spotShadowMap[x]=st,_++}x++}else if(N.isRectAreaLight){let $=t.get(N);$.color.copy(H).multiplyScalar(z),$.halfWidth.set(N.width*.5,0,0),$.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=$,m++}else if(N.isPointLight){let $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),$.distance=N.distance,$.decay=N.decay,N.castShadow){let Mt=N.shadow,A=e.get(N);A.shadowIntensity=Mt.intensity,A.shadowBias=Mt.bias,A.shadowNormalBias=Mt.normalBias,A.shadowRadius=Mt.radius,A.shadowMapSize=Mt.mapSize,A.shadowCameraNear=Mt.camera.near,A.shadowCameraFar=Mt.camera.far,n.pointShadow[g]=A,n.pointShadowMap[g]=st,n.pointShadowMatrix[g]=N.shadow.matrix,y++}n.point[g]=$,g++}else if(N.isHemisphereLight){let $=t.get(N);$.skyColor.copy(N.color).multiplyScalar(z),$.groundColor.copy(N.groundColor).multiplyScalar(z),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let U=n.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==x||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==S||U.numPointShadows!==y||U.numSpotShadows!==_||U.numSpotMaps!==w||U.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,U.directionalLength=d,U.pointLength=g,U.spotLength=x,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=S,U.numPointShadows=y,U.numSpotShadows=_,U.numSpotMaps=w,U.numLightProbes=C,n.version=Hv++)}function l(c,h){let u=0,f=0,d=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){let y=c[p];if(y.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(y.isSpotLight){let _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function Gp(i){let t=new Gv(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Wv(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Gp(i),t.set(s,[a])):r>=o.length?(a=new Gp(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function Yv(i,t,e){let n=new Tr,s=new Rt,r=new Rt,o=new be,a=new _c({depthPacking:ep}),l=new xc,c={},h=e.maxTextureSize,u={[ti]:cn,[cn]:ti,[Te]:Te},f=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:Xv,fragmentShader:qv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Ie;g.setAttribute("position",new Fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ee(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hh;let p=this.type;this.render=function(T,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Fi),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let z=p!==gi&&this.type===gi,K=p===gi&&this.type!==gi;for(let st=0,$=T.length;st<$;st++){let Mt=T[st],A=Mt.shadow;if(A===void 0){console.warn("THREE.WebGLShadowMap:",Mt,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;s.copy(A.mapSize);let O=A.getFrameExtents();if(s.multiply(O),r.copy(A.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/O.x),s.x=r.x*O.x,A.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/O.y),s.y=r.y*O.y,A.mapSize.y=r.y)),A.map===null||z===!0||K===!0){let ot=this.type!==gi?{minFilter:on,magFilter:on}:{};A.map!==null&&A.map.dispose(),A.map=new Hn(s.x,s.y,ot),A.map.texture.name=Mt.name+".shadowMap",A.camera.updateProjectionMatrix()}i.setRenderTarget(A.map),i.clear();let X=A.getViewportCount();for(let ot=0;ot<X;ot++){let ut=A.getViewport(ot);o.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),H.viewport(o),A.updateMatrices(Mt,ot),n=A.getFrustum(),_(C,U,A.camera,Mt,this.type)}A.isPointLightShadow!==!0&&this.type===gi&&S(A,U),A.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,N)};function S(T,C){let U=t.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Hn(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,U,f,x,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,U,d,x,null)}function y(T,C,U,b){let M=null,N=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)M=N;else if(M=U.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let H=M.uuid,z=C.uuid,K=c[H];K===void 0&&(K={},c[H]=K);let st=K[z];st===void 0&&(st=M.clone(),K[z]=st,C.addEventListener("dispose",w)),M=st}if(M.visible=C.visible,M.wireframe=C.wireframe,b===gi?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let H=i.properties.get(M);H.light=U}return M}function _(T,C,U,b,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===gi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);let z=t.update(T),K=T.material;if(Array.isArray(K)){let st=z.groups;for(let $=0,Mt=st.length;$<Mt;$++){let A=st[$],O=K[A.materialIndex];if(O&&O.visible){let X=y(T,O,b,M);T.onBeforeShadow(i,T,C,U,z,X,A),i.renderBufferDirect(U,null,z,X,T,A),T.onAfterShadow(i,T,C,U,z,X,A)}}}else if(K.visible){let st=y(T,K,b,M);T.onBeforeShadow(i,T,C,U,z,st,null),i.renderBufferDirect(U,null,z,st,T,null),T.onAfterShadow(i,T,C,U,z,st,null)}}let H=T.children;for(let z=0,K=H.length;z<K;z++)_(H[z],C,U,b,M)}function w(T){T.target.removeEventListener("dispose",w);for(let U in c){let b=c[U],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}function Zv(i,t){function e(){let P=!1,ht=new be,dt=null,mt=new be(0,0,0,0);return{setMask:function(tt){dt!==tt&&!P&&(i.colorMask(tt,tt,tt,tt),dt=tt)},setLocked:function(tt){P=tt},setClear:function(tt,Z,bt,Pt,ne){ne===!0&&(tt*=Pt,Z*=Pt,bt*=Pt),ht.set(tt,Z,bt,Pt),mt.equals(ht)===!1&&(i.clearColor(tt,Z,bt,Pt),mt.copy(ht))},reset:function(){P=!1,dt=null,mt.set(-1,0,0,0)}}}function n(){let P=!1,ht=!1,dt=null,mt=null,tt=null;return{setReversed:function(Z){if(ht!==Z){let bt=t.get("EXT_clip_control");Z?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),ht=Z;let Pt=tt;tt=null,this.setClear(Pt)}},getReversed:function(){return ht},setTest:function(Z){Z?L(i.DEPTH_TEST):rt(i.DEPTH_TEST)},setMask:function(Z){dt!==Z&&!P&&(i.depthMask(Z),dt=Z)},setFunc:function(Z){if(ht&&(Z=$v[Z]),mt!==Z){switch(Z){case wc:i.depthFunc(i.NEVER);break;case Ac:i.depthFunc(i.ALWAYS);break;case Rc:i.depthFunc(i.LESS);break;case ms:i.depthFunc(i.LEQUAL);break;case Cc:i.depthFunc(i.EQUAL);break;case Ic:i.depthFunc(i.GEQUAL);break;case Pc:i.depthFunc(i.GREATER);break;case Lc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=Z}},setLocked:function(Z){P=Z},setClear:function(Z){tt!==Z&&(ht&&(Z=1-Z),i.clearDepth(Z),tt=Z)},reset:function(){P=!1,dt=null,mt=null,tt=null,ht=!1}}}function s(){let P=!1,ht=null,dt=null,mt=null,tt=null,Z=null,bt=null,Pt=null,ne=null;return{setTest:function(Zt){P||(Zt?L(i.STENCIL_TEST):rt(i.STENCIL_TEST))},setMask:function(Zt){ht!==Zt&&!P&&(i.stencilMask(Zt),ht=Zt)},setFunc:function(Zt,pe,Le){(dt!==Zt||mt!==pe||tt!==Le)&&(i.stencilFunc(Zt,pe,Le),dt=Zt,mt=pe,tt=Le)},setOp:function(Zt,pe,Le){(Z!==Zt||bt!==pe||Pt!==Le)&&(i.stencilOp(Zt,pe,Le),Z=Zt,bt=pe,Pt=Le)},setLocked:function(Zt){P=Zt},setClear:function(Zt){ne!==Zt&&(i.clearStencil(Zt),ne=Zt)},reset:function(){P=!1,ht=null,dt=null,mt=null,tt=null,Z=null,bt=null,Pt=null,ne=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,S=null,y=null,_=null,w=null,T=null,C=new Jt(0,0,0),U=0,b=!1,M=null,N=null,H=null,z=null,K=null,st=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,Mt=0,A=i.getParameter(i.VERSION);A.indexOf("WebGL")!==-1?(Mt=parseFloat(/^WebGL (\d)/.exec(A)[1]),$=Mt>=1):A.indexOf("OpenGL ES")!==-1&&(Mt=parseFloat(/^OpenGL ES (\d)/.exec(A)[1]),$=Mt>=2);let O=null,X={},ot=i.getParameter(i.SCISSOR_BOX),ut=i.getParameter(i.VIEWPORT),wt=new be().fromArray(ot),_t=new be().fromArray(ut);function Ct(P,ht,dt,mt){let tt=new Uint8Array(4),Z=i.createTexture();i.bindTexture(P,Z),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<dt;bt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,tt):i.texImage2D(ht+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,tt);return Z}let et={};et[i.TEXTURE_2D]=Ct(i.TEXTURE_2D,i.TEXTURE_2D,1),et[i.TEXTURE_CUBE_MAP]=Ct(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[i.TEXTURE_2D_ARRAY]=Ct(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),et[i.TEXTURE_3D]=Ct(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),L(i.DEPTH_TEST),o.setFunc(ms),Ht(!1),kt(zh),L(i.CULL_FACE),Qt(Fi);function L(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function rt(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Nt(P,ht){return u[P]!==ht?(i.bindFramebuffer(P,ht),u[P]=ht,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ht),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function Ut(P,ht){let dt=d,mt=!1;if(P){dt=f.get(ht),dt===void 0&&(dt=[],f.set(ht,dt));let tt=P.textures;if(dt.length!==tt.length||dt[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,bt=tt.length;Z<bt;Z++)dt[Z]=i.COLOR_ATTACHMENT0+Z;dt.length=tt.length,mt=!0}}else dt[0]!==i.BACK&&(dt[0]=i.BACK,mt=!0);mt&&i.drawBuffers(dt)}function Bt(P){return g!==P?(i.useProgram(P),g=P,!0):!1}let ye={[ji]:i.FUNC_ADD,[Ad]:i.FUNC_SUBTRACT,[Rd]:i.FUNC_REVERSE_SUBTRACT};ye[Cd]=i.MIN,ye[Id]=i.MAX;let D={[Pd]:i.ZERO,[Ld]:i.ONE,[Dd]:i.SRC_COLOR,[ec]:i.SRC_ALPHA,[kd]:i.SRC_ALPHA_SATURATE,[Od]:i.DST_COLOR,[Ud]:i.DST_ALPHA,[Nd]:i.ONE_MINUS_SRC_COLOR,[nc]:i.ONE_MINUS_SRC_ALPHA,[Bd]:i.ONE_MINUS_DST_COLOR,[Fd]:i.ONE_MINUS_DST_ALPHA,[zd]:i.CONSTANT_COLOR,[Hd]:i.ONE_MINUS_CONSTANT_COLOR,[Vd]:i.CONSTANT_ALPHA,[Gd]:i.ONE_MINUS_CONSTANT_ALPHA};function Qt(P,ht,dt,mt,tt,Z,bt,Pt,ne,Zt){if(P===Fi){x===!0&&(rt(i.BLEND),x=!1);return}if(x===!1&&(L(i.BLEND),x=!0),P!==wd){if(P!==m||Zt!==b){if((p!==ji||_!==ji)&&(i.blendEquation(i.FUNC_ADD),p=ji,_=ji),Zt)switch(P){case ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vh:i.blendFunc(i.ONE,i.ONE);break;case Gh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Gh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}S=null,y=null,w=null,T=null,C.set(0,0,0),U=0,m=P,b=Zt}return}tt=tt||ht,Z=Z||dt,bt=bt||mt,(ht!==p||tt!==_)&&(i.blendEquationSeparate(ye[ht],ye[tt]),p=ht,_=tt),(dt!==S||mt!==y||Z!==w||bt!==T)&&(i.blendFuncSeparate(D[dt],D[mt],D[Z],D[bt]),S=dt,y=mt,w=Z,T=bt),(Pt.equals(C)===!1||ne!==U)&&(i.blendColor(Pt.r,Pt.g,Pt.b,ne),C.copy(Pt),U=ne),m=P,b=!1}function qt(P,ht){P.side===Te?rt(i.CULL_FACE):L(i.CULL_FACE);let dt=P.side===cn;ht&&(dt=!dt),Ht(dt),P.blending===ps&&P.transparent===!1?Qt(Fi):Qt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),r.setMask(P.colorWrite);let mt=P.stencilWrite;a.setTest(mt),mt&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Vt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?L(i.SAMPLE_ALPHA_TO_COVERAGE):rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(P){M!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),M=P)}function kt(P){P!==bd?(L(i.CULL_FACE),P!==N&&(P===zh?i.cullFace(i.BACK):P===Ed?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):rt(i.CULL_FACE),N=P}function ue(P){P!==H&&($&&i.lineWidth(P),H=P)}function Vt(P,ht,dt){P?(L(i.POLYGON_OFFSET_FILL),(z!==ht||K!==dt)&&(i.polygonOffset(ht,dt),z=ht,K=dt)):rt(i.POLYGON_OFFSET_FILL)}function Xt(P){P?L(i.SCISSOR_TEST):rt(i.SCISSOR_TEST)}function we(P){P===void 0&&(P=i.TEXTURE0+st-1),O!==P&&(i.activeTexture(P),O=P)}function se(P,ht,dt){dt===void 0&&(O===null?dt=i.TEXTURE0+st-1:dt=O);let mt=X[dt];mt===void 0&&(mt={type:void 0,texture:void 0},X[dt]=mt),(mt.type!==P||mt.texture!==ht)&&(O!==dt&&(i.activeTexture(dt),O=dt),i.bindTexture(P,ht||et[P]),mt.type=P,mt.texture=ht)}function R(){let P=X[O];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function V(){try{i.compressedTexImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function B(){try{i.texSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function it(){try{i.texSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{i.compressedTexSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function At(){try{i.compressedTexSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function vt(){try{i.texStorage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function F(){try{i.texStorage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{i.texImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function k(){try{i.texImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function lt(P){wt.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),wt.copy(P))}function ct(P){_t.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),_t.copy(P))}function ft(P,ht){let dt=c.get(ht);dt===void 0&&(dt=new WeakMap,c.set(ht,dt));let mt=dt.get(P);mt===void 0&&(mt=i.getUniformBlockIndex(ht,P.name),dt.set(P,mt))}function nt(P,ht){let mt=c.get(ht).get(P);l.get(ht)!==mt&&(i.uniformBlockBinding(ht,mt,P.__bindingPointIndex),l.set(ht,mt))}function It(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},O=null,X={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,S=null,y=null,_=null,w=null,T=null,C=new Jt(0,0,0),U=0,b=!1,M=null,N=null,H=null,z=null,K=null,wt.set(0,0,i.canvas.width,i.canvas.height),_t.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:L,disable:rt,bindFramebuffer:Nt,drawBuffers:Ut,useProgram:Bt,setBlending:Qt,setMaterial:qt,setFlipSided:Ht,setCullFace:kt,setLineWidth:ue,setPolygonOffset:Vt,setScissorTest:Xt,activeTexture:we,bindTexture:se,unbindTexture:R,compressedTexImage2D:v,compressedTexImage3D:V,texImage2D:j,texImage3D:k,updateUBOMapping:ft,uniformBlockBinding:nt,texStorage2D:vt,texStorage3D:F,texSubImage2D:B,texSubImage3D:it,compressedTexSubImage2D:Q,compressedTexSubImage3D:At,scissor:lt,viewport:ct,reset:It}}function Kv(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Rt,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,v){return d?new OffscreenCanvas(R,v):xr("canvas")}function x(R,v,V){let B=1,it=se(R);if((it.width>V||it.height>V)&&(B=V/Math.max(it.width,it.height)),B<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let Q=Math.floor(B*it.width),At=Math.floor(B*it.height);u===void 0&&(u=g(Q,At));let vt=v?g(Q,At):u;return vt.width=Q,vt.height=At,vt.getContext("2d").drawImage(R,0,0,Q,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+Q+"x"+At+")."),vt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,v,V,B,it=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Q=v;if(v===i.RED&&(V===i.FLOAT&&(Q=i.R32F),V===i.HALF_FLOAT&&(Q=i.R16F),V===i.UNSIGNED_BYTE&&(Q=i.R8)),v===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.R8UI),V===i.UNSIGNED_SHORT&&(Q=i.R16UI),V===i.UNSIGNED_INT&&(Q=i.R32UI),V===i.BYTE&&(Q=i.R8I),V===i.SHORT&&(Q=i.R16I),V===i.INT&&(Q=i.R32I)),v===i.RG&&(V===i.FLOAT&&(Q=i.RG32F),V===i.HALF_FLOAT&&(Q=i.RG16F),V===i.UNSIGNED_BYTE&&(Q=i.RG8)),v===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RG8UI),V===i.UNSIGNED_SHORT&&(Q=i.RG16UI),V===i.UNSIGNED_INT&&(Q=i.RG32UI),V===i.BYTE&&(Q=i.RG8I),V===i.SHORT&&(Q=i.RG16I),V===i.INT&&(Q=i.RG32I)),v===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),V===i.UNSIGNED_INT&&(Q=i.RGB32UI),V===i.BYTE&&(Q=i.RGB8I),V===i.SHORT&&(Q=i.RGB16I),V===i.INT&&(Q=i.RGB32I)),v===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),V===i.UNSIGNED_INT&&(Q=i.RGBA32UI),V===i.BYTE&&(Q=i.RGBA8I),V===i.SHORT&&(Q=i.RGBA16I),V===i.INT&&(Q=i.RGBA32I)),v===i.RGB&&(V===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),v===i.RGBA){let At=it?vo:ge.getTransfer(B);V===i.FLOAT&&(Q=i.RGBA32F),V===i.HALF_FLOAT&&(Q=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Q=At===Re?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(R,v){let V;return R?v===null||v===ns||v===Fr?V=i.DEPTH24_STENCIL8:v===Xn?V=i.DEPTH32F_STENCIL8:v===Nr&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ns||v===Fr?V=i.DEPTH_COMPONENT24:v===Xn?V=i.DEPTH_COMPONENT32F:v===Nr&&(V=i.DEPTH_COMPONENT16),V}function w(R,v){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==on&&R.minFilter!==xn?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function T(R){let v=R.target;v.removeEventListener("dispose",T),U(v),v.isVideoTexture&&h.delete(v)}function C(R){let v=R.target;v.removeEventListener("dispose",C),M(v)}function U(R){let v=n.get(R);if(v.__webglInit===void 0)return;let V=R.source,B=f.get(V);if(B){let it=B[v.__cacheKey];it.usedTimes--,it.usedTimes===0&&b(R),Object.keys(B).length===0&&f.delete(V)}n.remove(R)}function b(R){let v=n.get(R);i.deleteTexture(v.__webglTexture);let V=R.source,B=f.get(V);delete B[v.__cacheKey],o.memory.textures--}function M(R){let v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(v.__webglFramebuffer[B]))for(let it=0;it<v.__webglFramebuffer[B].length;it++)i.deleteFramebuffer(v.__webglFramebuffer[B][it]);else i.deleteFramebuffer(v.__webglFramebuffer[B]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[B])}else{if(Array.isArray(v.__webglFramebuffer))for(let B=0;B<v.__webglFramebuffer.length;B++)i.deleteFramebuffer(v.__webglFramebuffer[B]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let B=0;B<v.__webglColorRenderbuffer.length;B++)v.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[B]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let V=R.textures;for(let B=0,it=V.length;B<it;B++){let Q=n.get(V[B]);Q.__webglTexture&&(i.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(V[B])}n.remove(R)}let N=0;function H(){N=0}function z(){let R=N;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),N+=1,R}function K(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function st(R,v){let V=n.get(R);if(R.isVideoTexture&&Xt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){let B=R.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{et(V,R,v);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+v)}function $(R,v){let V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){et(V,R,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+v)}function Mt(R,v){let V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){et(V,R,v);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+v)}function A(R,v){let V=n.get(R);if(R.version>0&&V.__version!==R.version){L(V,R,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+v)}let O={[zn]:i.REPEAT,[ai]:i.CLAMP_TO_EDGE,[gr]:i.MIRRORED_REPEAT},X={[on]:i.NEAREST,[Oc]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[Dr]:i.LINEAR_MIPMAP_NEAREST,[ni]:i.LINEAR_MIPMAP_LINEAR},ot={[ip]:i.NEVER,[lp]:i.ALWAYS,[sp]:i.LESS,[tu]:i.LEQUAL,[rp]:i.EQUAL,[cp]:i.GEQUAL,[op]:i.GREATER,[ap]:i.NOTEQUAL};function ut(R,v){if(v.type===Xn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===xn||v.magFilter===Dr||v.magFilter===Ds||v.magFilter===ni||v.minFilter===xn||v.minFilter===Dr||v.minFilter===Ds||v.minFilter===ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,O[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,O[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,O[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,X[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,X[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ot[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===on||v.minFilter!==Ds&&v.minFilter!==ni||v.type===Xn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function wt(R,v){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",T));let B=v.source,it=f.get(B);it===void 0&&(it={},f.set(B,it));let Q=K(v);if(Q!==R.__cacheKey){it[Q]===void 0&&(it[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),it[Q].usedTimes++;let At=it[R.__cacheKey];At!==void 0&&(it[R.__cacheKey].usedTimes--,At.usedTimes===0&&b(v)),R.__cacheKey=Q,R.__webglTexture=it[Q].texture}return V}function _t(R,v,V){return Math.floor(Math.floor(R/V)/v)}function Ct(R,v,V,B){let Q=R.updateRanges;if(Q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,V,B,v.data);else{Q.sort((k,lt)=>k.start-lt.start);let At=0;for(let k=1;k<Q.length;k++){let lt=Q[At],ct=Q[k],ft=lt.start+lt.count,nt=_t(ct.start,v.width,4),It=_t(lt.start,v.width,4);ct.start<=ft+1&&nt===It&&_t(ct.start+ct.count-1,v.width,4)===nt?lt.count=Math.max(lt.count,ct.start+ct.count-lt.start):(++At,Q[At]=ct)}Q.length=At+1;let vt=i.getParameter(i.UNPACK_ROW_LENGTH),F=i.getParameter(i.UNPACK_SKIP_PIXELS),j=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let k=0,lt=Q.length;k<lt;k++){let ct=Q[k],ft=Math.floor(ct.start/4),nt=Math.ceil(ct.count/4),It=ft%v.width,P=Math.floor(ft/v.width),ht=nt,dt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,It),i.pixelStorei(i.UNPACK_SKIP_ROWS,P),e.texSubImage2D(i.TEXTURE_2D,0,It,P,ht,dt,V,B,v.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,vt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,F),i.pixelStorei(i.UNPACK_SKIP_ROWS,j)}}function et(R,v,V){let B=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(B=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(B=i.TEXTURE_3D);let it=wt(R,v),Q=v.source;e.bindTexture(B,R.__webglTexture,i.TEXTURE0+V);let At=n.get(Q);if(Q.version!==At.__version||it===!0){e.activeTexture(i.TEXTURE0+V);let vt=ge.getPrimaries(ge.workingColorSpace),F=v.colorSpace===Bi?null:ge.getPrimaries(v.colorSpace),j=v.colorSpace===Bi||vt===F?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let k=x(v.image,!1,s.maxTextureSize);k=we(v,k);let lt=r.convert(v.format,v.colorSpace),ct=r.convert(v.type),ft=y(v.internalFormat,lt,ct,v.colorSpace,v.isVideoTexture);ut(B,v);let nt,It=v.mipmaps,P=v.isVideoTexture!==!0,ht=At.__version===void 0||it===!0,dt=Q.dataReady,mt=w(v,k);if(v.isDepthTexture)ft=_(v.format===Or,v.type),ht&&(P?e.texStorage2D(i.TEXTURE_2D,1,ft,k.width,k.height):e.texImage2D(i.TEXTURE_2D,0,ft,k.width,k.height,0,lt,ct,null));else if(v.isDataTexture)if(It.length>0){P&&ht&&e.texStorage2D(i.TEXTURE_2D,mt,ft,It[0].width,It[0].height);for(let tt=0,Z=It.length;tt<Z;tt++)nt=It[tt],P?dt&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,nt.width,nt.height,lt,ct,nt.data):e.texImage2D(i.TEXTURE_2D,tt,ft,nt.width,nt.height,0,lt,ct,nt.data);v.generateMipmaps=!1}else P?(ht&&e.texStorage2D(i.TEXTURE_2D,mt,ft,k.width,k.height),dt&&Ct(v,k,lt,ct)):e.texImage2D(i.TEXTURE_2D,0,ft,k.width,k.height,0,lt,ct,k.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){P&&ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,ft,It[0].width,It[0].height,k.depth);for(let tt=0,Z=It.length;tt<Z;tt++)if(nt=It[tt],v.format!==Dn)if(lt!==null)if(P){if(dt)if(v.layerUpdates.size>0){let bt=cu(nt.width,nt.height,v.format,v.type);for(let Pt of v.layerUpdates){let ne=nt.data.subarray(Pt*bt/nt.data.BYTES_PER_ELEMENT,(Pt+1)*bt/nt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Pt,nt.width,nt.height,1,lt,ne)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,nt.width,nt.height,k.depth,lt,nt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,ft,nt.width,nt.height,k.depth,0,nt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?dt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,nt.width,nt.height,k.depth,lt,ct,nt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,ft,nt.width,nt.height,k.depth,0,lt,ct,nt.data)}else{P&&ht&&e.texStorage2D(i.TEXTURE_2D,mt,ft,It[0].width,It[0].height);for(let tt=0,Z=It.length;tt<Z;tt++)nt=It[tt],v.format!==Dn?lt!==null?P?dt&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,nt.width,nt.height,lt,nt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,ft,nt.width,nt.height,0,nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?dt&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,nt.width,nt.height,lt,ct,nt.data):e.texImage2D(i.TEXTURE_2D,tt,ft,nt.width,nt.height,0,lt,ct,nt.data)}else if(v.isDataArrayTexture)if(P){if(ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,ft,k.width,k.height,k.depth),dt)if(v.layerUpdates.size>0){let tt=cu(k.width,k.height,v.format,v.type);for(let Z of v.layerUpdates){let bt=k.data.subarray(Z*tt/k.data.BYTES_PER_ELEMENT,(Z+1)*tt/k.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,k.width,k.height,1,lt,ct,bt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,k.width,k.height,k.depth,lt,ct,k.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ft,k.width,k.height,k.depth,0,lt,ct,k.data);else if(v.isData3DTexture)P?(ht&&e.texStorage3D(i.TEXTURE_3D,mt,ft,k.width,k.height,k.depth),dt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,k.width,k.height,k.depth,lt,ct,k.data)):e.texImage3D(i.TEXTURE_3D,0,ft,k.width,k.height,k.depth,0,lt,ct,k.data);else if(v.isFramebufferTexture){if(ht)if(P)e.texStorage2D(i.TEXTURE_2D,mt,ft,k.width,k.height);else{let tt=k.width,Z=k.height;for(let bt=0;bt<mt;bt++)e.texImage2D(i.TEXTURE_2D,bt,ft,tt,Z,0,lt,ct,null),tt>>=1,Z>>=1}}else if(It.length>0){if(P&&ht){let tt=se(It[0]);e.texStorage2D(i.TEXTURE_2D,mt,ft,tt.width,tt.height)}for(let tt=0,Z=It.length;tt<Z;tt++)nt=It[tt],P?dt&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt,ct,nt):e.texImage2D(i.TEXTURE_2D,tt,ft,lt,ct,nt);v.generateMipmaps=!1}else if(P){if(ht){let tt=se(k);e.texStorage2D(i.TEXTURE_2D,mt,ft,tt.width,tt.height)}dt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,ct,k)}else e.texImage2D(i.TEXTURE_2D,0,ft,lt,ct,k);m(v)&&p(B),At.__version=Q.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function L(R,v,V){if(v.image.length!==6)return;let B=wt(R,v),it=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+V);let Q=n.get(it);if(it.version!==Q.__version||B===!0){e.activeTexture(i.TEXTURE0+V);let At=ge.getPrimaries(ge.workingColorSpace),vt=v.colorSpace===Bi?null:ge.getPrimaries(v.colorSpace),F=v.colorSpace===Bi||At===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);let j=v.isCompressedTexture||v.image[0].isCompressedTexture,k=v.image[0]&&v.image[0].isDataTexture,lt=[];for(let Z=0;Z<6;Z++)!j&&!k?lt[Z]=x(v.image[Z],!0,s.maxCubemapSize):lt[Z]=k?v.image[Z].image:v.image[Z],lt[Z]=we(v,lt[Z]);let ct=lt[0],ft=r.convert(v.format,v.colorSpace),nt=r.convert(v.type),It=y(v.internalFormat,ft,nt,v.colorSpace),P=v.isVideoTexture!==!0,ht=Q.__version===void 0||B===!0,dt=it.dataReady,mt=w(v,ct);ut(i.TEXTURE_CUBE_MAP,v);let tt;if(j){P&&ht&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,It,ct.width,ct.height);for(let Z=0;Z<6;Z++){tt=lt[Z].mipmaps;for(let bt=0;bt<tt.length;bt++){let Pt=tt[bt];v.format!==Dn?ft!==null?P?dt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,0,0,Pt.width,Pt.height,ft,Pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,It,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,0,0,Pt.width,Pt.height,ft,nt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,It,Pt.width,Pt.height,0,ft,nt,Pt.data)}}}else{if(tt=v.mipmaps,P&&ht){tt.length>0&&mt++;let Z=se(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,It,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(k){P?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,lt[Z].width,lt[Z].height,ft,nt,lt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,It,lt[Z].width,lt[Z].height,0,ft,nt,lt[Z].data);for(let bt=0;bt<tt.length;bt++){let ne=tt[bt].image[Z].image;P?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,0,0,ne.width,ne.height,ft,nt,ne.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,It,ne.width,ne.height,0,ft,nt,ne.data)}}else{P?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ft,nt,lt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,It,ft,nt,lt[Z]);for(let bt=0;bt<tt.length;bt++){let Pt=tt[bt];P?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,0,0,ft,nt,Pt.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,It,ft,nt,Pt.image[Z])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),Q.__version=it.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function rt(R,v,V,B,it,Q){let At=r.convert(V.format,V.colorSpace),vt=r.convert(V.type),F=y(V.internalFormat,At,vt,V.colorSpace),j=n.get(v),k=n.get(V);if(k.__renderTarget=v,!j.__hasExternalTextures){let lt=Math.max(1,v.width>>Q),ct=Math.max(1,v.height>>Q);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,Q,F,lt,ct,v.depth,0,At,vt,null):e.texImage2D(it,Q,F,lt,ct,0,At,vt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Vt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,B,it,k.__webglTexture,0,ue(v)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,B,it,k.__webglTexture,Q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(R,v,V){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){let B=v.depthTexture,it=B&&B.isDepthTexture?B.type:null,Q=_(v.stencilBuffer,it),At=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=ue(v);Vt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,vt,Q,v.width,v.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,Q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Q,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,R)}else{let B=v.textures;for(let it=0;it<B.length;it++){let Q=B[it],At=r.convert(Q.format,Q.colorSpace),vt=r.convert(Q.type),F=y(Q.internalFormat,At,vt,Q.colorSpace),j=ue(v);V&&Vt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,j,F,v.width,v.height):Vt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j,F,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,F,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(R,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let B=n.get(v.depthTexture);B.__renderTarget=v,(!B.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),st(v.depthTexture,0);let it=B.__webglTexture,Q=ue(v);if(v.depthTexture.format===_r)Vt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0);else if(v.depthTexture.format===Or)Vt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Bt(R){let v=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let B=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),B){let it=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,B.removeEventListener("dispose",it)};B.addEventListener("dispose",it),v.__depthDisposeCallback=it}v.__boundDepthTexture=B}if(R.depthTexture&&!v.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");let B=R.texture.mipmaps;B&&B.length>0?Ut(v.__webglFramebuffer[0],R):Ut(v.__webglFramebuffer,R)}else if(V){v.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[B]),v.__webglDepthbuffer[B]===void 0)v.__webglDepthbuffer[B]=i.createRenderbuffer(),Nt(v.__webglDepthbuffer[B],R,!1);else{let it=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer[B];i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,Q)}}else{let B=R.texture.mipmaps;if(B&&B.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Nt(v.__webglDepthbuffer,R,!1);else{let it=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,Q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(R,v,V){let B=n.get(R);v!==void 0&&rt(B.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Bt(R)}function D(R){let v=R.texture,V=n.get(R),B=n.get(v);R.addEventListener("dispose",C);let it=R.textures,Q=R.isWebGLCubeRenderTarget===!0,At=it.length>1;if(At||(B.__webglTexture===void 0&&(B.__webglTexture=i.createTexture()),B.__version=v.version,o.memory.textures++),Q){V.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[vt]=[];for(let F=0;F<v.mipmaps.length;F++)V.__webglFramebuffer[vt][F]=i.createFramebuffer()}else V.__webglFramebuffer[vt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let vt=0;vt<v.mipmaps.length;vt++)V.__webglFramebuffer[vt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(At)for(let vt=0,F=it.length;vt<F;vt++){let j=n.get(it[vt]);j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Vt(R)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let vt=0;vt<it.length;vt++){let F=it[vt];V.__webglColorRenderbuffer[vt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[vt]);let j=r.convert(F.format,F.colorSpace),k=r.convert(F.type),lt=y(F.internalFormat,j,k,F.colorSpace,R.isXRRenderTarget===!0),ct=ue(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,lt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,V.__webglColorRenderbuffer[vt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(V.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture),ut(i.TEXTURE_CUBE_MAP,v);for(let vt=0;vt<6;vt++)if(v.mipmaps&&v.mipmaps.length>0)for(let F=0;F<v.mipmaps.length;F++)rt(V.__webglFramebuffer[vt][F],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,F);else rt(V.__webglFramebuffer[vt],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let vt=0,F=it.length;vt<F;vt++){let j=it[vt],k=n.get(j),lt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(lt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,k.__webglTexture),ut(lt,j),rt(V.__webglFramebuffer,R,j,i.COLOR_ATTACHMENT0+vt,lt,0),m(j)&&p(lt)}e.unbindTexture()}else{let vt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(vt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,B.__webglTexture),ut(vt,v),v.mipmaps&&v.mipmaps.length>0)for(let F=0;F<v.mipmaps.length;F++)rt(V.__webglFramebuffer[F],R,v,i.COLOR_ATTACHMENT0,vt,F);else rt(V.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,vt,0);m(v)&&p(vt),e.unbindTexture()}R.depthBuffer&&Bt(R)}function Qt(R){let v=R.textures;for(let V=0,B=v.length;V<B;V++){let it=v[V];if(m(it)){let Q=S(R),At=n.get(it).__webglTexture;e.bindTexture(Q,At),p(Q),e.unbindTexture()}}}let qt=[],Ht=[];function kt(R){if(R.samples>0){if(Vt(R)===!1){let v=R.textures,V=R.width,B=R.height,it=i.COLOR_BUFFER_BIT,Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(R),vt=v.length>1;if(vt)for(let j=0;j<v.length;j++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);let F=R.texture.mipmaps;F&&F.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let j=0;j<v.length;j++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),vt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[j]);let k=n.get(v[j]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,k,0)}i.blitFramebuffer(0,0,V,B,0,0,V,B,it,i.NEAREST),l===!0&&(qt.length=0,Ht.length=0,qt.push(i.COLOR_ATTACHMENT0+j),R.depthBuffer&&R.resolveDepthBuffer===!1&&(qt.push(Q),Ht.push(Q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ht)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,qt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),vt)for(let j=0;j<v.length;j++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,At.__webglColorRenderbuffer[j]);let k=n.get(v[j]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.TEXTURE_2D,k,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ue(R){return Math.min(s.maxSamples,R.samples)}function Vt(R){let v=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Xt(R){let v=o.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function we(R,v){let V=R.colorSpace,B=R.format,it=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==an&&V!==Bi&&(ge.getTransfer(V)===Re?(B!==Dn||it!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),v}function se(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=st,this.setTexture2DArray=$,this.setTexture3D=Mt,this.setTextureCube=A,this.rebindTextures=ye,this.setupRenderTarget=D,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Bt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Vt}function jv(i,t){function e(n,s=Bi){let r,o=ge.getTransfer(s);if(n===ii)return i.UNSIGNED_BYTE;if(n===kc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$h)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===qh)return i.BYTE;if(n===Yh)return i.SHORT;if(n===Nr)return i.UNSIGNED_SHORT;if(n===Bc)return i.INT;if(n===ns)return i.UNSIGNED_INT;if(n===Xn)return i.FLOAT;if(n===Ur)return i.HALF_FLOAT;if(n===Kh)return i.ALPHA;if(n===jh)return i.RGB;if(n===Dn)return i.RGBA;if(n===_r)return i.DEPTH_COMPONENT;if(n===Or)return i.DEPTH_STENCIL;if(n===Hc)return i.RED;if(n===Vc)return i.RED_INTEGER;if(n===Jh)return i.RG;if(n===Gc)return i.RG_INTEGER;if(n===Wc)return i.RGBA_INTEGER;if(n===ta||n===ea||n===na||n===ia)if(o===Re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xc||n===qc||n===Yc||n===$c)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$c)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zc||n===Kc||n===jc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Zc||n===Kc)return o===Re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jc)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Jc||n===Qc||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===cl||n===ll||n===hl||n===ul)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Jc)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qc)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===tl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===el)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===il)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===rl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ol)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===al)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===cl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ll)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hl)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ul)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fl||n===dl||n===pl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===fl)return o===Re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ml||n===gl||n===_l||n===xl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ml)return r.COMPRESSED_RED_RGTC1_EXT;if(n===gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_l)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}function eM(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,su(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=t.get(p),y=S.envMap,_=S.envMapRotation;y&&(m.envMap.value=y,Fs.copy(_),Fs.x*=-1,Fs.y*=-1,Fs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Fs.y*=-1,Fs.z*=-1),m.envMapRotation.value.setFromMatrix4(tM.makeRotationFromEuler(Fs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===cn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function nM(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){let _=y.program;n.uniformBlockBinding(S,_)}function c(S,y){let _=s[S.id];_===void 0&&(g(S),_=h(S),s[S.id]=_,S.addEventListener("dispose",m));let w=y.program;n.updateUBOMapping(S,w);let T=t.render.frame;r[S.id]!==T&&(f(S),r[S.id]=T)}function h(S){let y=u();S.__bindingPointIndex=y;let _=i.createBuffer(),w=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,w,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){let y=s[S.id],_=S.uniforms,w=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,C=_.length;T<C;T++){let U=Array.isArray(_[T])?_[T]:[_[T]];for(let b=0,M=U.length;b<M;b++){let N=U[b];if(d(N,T,b,w)===!0){let H=N.__offset,z=Array.isArray(N.value)?N.value:[N.value],K=0;for(let st=0;st<z.length;st++){let $=z[st],Mt=x($);typeof $=="number"||typeof $=="boolean"?(N.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,H+K,N.__data)):$.isMatrix3?(N.__data[0]=$.elements[0],N.__data[1]=$.elements[1],N.__data[2]=$.elements[2],N.__data[3]=0,N.__data[4]=$.elements[3],N.__data[5]=$.elements[4],N.__data[6]=$.elements[5],N.__data[7]=0,N.__data[8]=$.elements[6],N.__data[9]=$.elements[7],N.__data[10]=$.elements[8],N.__data[11]=0):($.toArray(N.__data,K),K+=Mt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,y,_,w){let T=S.value,C=y+"_"+_;if(w[C]===void 0)return typeof T=="number"||typeof T=="boolean"?w[C]=T:w[C]=T.clone(),!0;{let U=w[C];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return w[C]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(S){let y=S.uniforms,_=0,w=16;for(let C=0,U=y.length;C<U;C++){let b=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,N=b.length;M<N;M++){let H=b[M],z=Array.isArray(H.value)?H.value:[H.value];for(let K=0,st=z.length;K<st;K++){let $=z[K],Mt=x($),A=_%w,O=A%Mt.boundary,X=A+O;_+=O,X!==0&&w-X<Mt.storage&&(_+=w-X),H.__data=new Float32Array(Mt.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=Mt.storage}}}let T=_%w;return T>0&&(_+=w-T),S.__size=_,S.__cache={},this}function x(S){let y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){let y=S.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var I0,P0,L0,D0,N0,U0,F0,O0,B0,k0,z0,H0,V0,G0,W0,X0,q0,Y0,$0,Z0,K0,j0,J0,Q0,t_,e_,n_,i_,s_,r_,o_,a_,c_,l_,h_,u_,f_,d_,p_,m_,g_,__,x_,y_,v_,M_,S_,b_,E_,T_,w_,A_,R_,C_,I_,P_,L_,D_,N_,U_,F_,O_,B_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,$_,Z_,K_,j_,J_,Q_,tx,ex,nx,ix,sx,rx,ox,ax,cx,lx,hx,ux,fx,dx,px,mx,gx,_x,xx,yx,vx,Mx,Sx,bx,Ex,Tx,wx,Ax,Rx,Cx,Ix,Px,Lx,Dx,Nx,Ux,Fx,Ox,Bx,kx,zx,Hx,Vx,Gx,Wx,Xx,qx,Yx,$x,Zx,Kx,jx,Jx,Qx,ty,ey,ny,iy,sy,ry,oy,ay,cy,ce,Ot,_i,vl,Us,ly,zr,Mp,Bs,hu,Sp,uu,fu,du,pu,Os,kr,bp,gy,Vr,Xp,Ap,qp,Yp,$p,Rp,Cp,Ip,Pp,Lp,gu,_u,xu,mu,Hr,dv,pv,Up,Sl,bv,Ev,wv,Nv,vu,Mu,Hv,Xv,qv,$v,Jv,Qv,Su,bu,Fs,tM,Gr,si=Vl(()=>{lu();lu();I0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,P0=`#ifdef USE_ALPHAHASH
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
#endif`,L0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,D0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,U0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F0=`#ifdef USE_AOMAP
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
#endif`,O0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,B0=`#ifdef USE_BATCHING
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
#endif`,k0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,z0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,H0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,V0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,G0=`#ifdef USE_IRIDESCENCE
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
#endif`,W0=`#ifdef USE_BUMPMAP
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
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Z0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,K0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,j0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,J0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Q0=`#define PI 3.141592653589793
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
} // validated`,t_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,e_=`vec3 transformedNormal = objectNormal;
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
#endif`,n_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,i_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,s_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,r_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,o_="gl_FragColor = linearToOutputTexel( gl_FragColor );",a_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,c_=`#ifdef USE_ENVMAP
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
#endif`,l_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,h_=`#ifdef USE_ENVMAP
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
#endif`,u_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,f_=`#ifdef USE_ENVMAP
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
#endif`,d_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,p_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,m_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,g_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,__=`#ifdef USE_GRADIENTMAP
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
}`,x_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,y_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,v_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,M_=`uniform bool receiveShadow;
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
#endif`,S_=`#ifdef USE_ENVMAP
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
#endif`,b_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,E_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,T_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,w_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,A_=`PhysicalMaterial material;
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
#endif`,R_=`struct PhysicalMaterial {
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
}`,C_=`
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
#endif`,I_=`#if defined( RE_IndirectDiffuse )
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
#endif`,P_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,L_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,D_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,F_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,O_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,k_=`#if defined( USE_POINTS_UV )
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
#endif`,z_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,H_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,V_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,W_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X_=`#ifdef USE_MORPHTARGETS
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
#endif`,q_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Z_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,J_=`#ifdef USE_NORMALMAP
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
#endif`,Q_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ex=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ix=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ox=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ax=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ux=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,px=`float getShadowMask() {
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
}`,mx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gx=`#ifdef USE_SKINNING
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
#endif`,_x=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xx=`#ifdef USE_SKINNING
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
#endif`,yx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bx=`#ifdef USE_TRANSMISSION
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
#endif`,Ex=`#ifdef USE_TRANSMISSION
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
#endif`,Tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Cx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ix=`uniform sampler2D t2D;
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
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ux=`#include <common>
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
}`,Fx=`#if DEPTH_PACKING == 3200
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
}`,Ox=`#define DISTANCE
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
}`,Bx=`#define DISTANCE
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
}`,kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`uniform float scale;
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
}`,Vx=`uniform vec3 diffuse;
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
}`,Gx=`#include <common>
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
}`,Wx=`uniform vec3 diffuse;
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
}`,Xx=`#define LAMBERT
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
}`,qx=`#define LAMBERT
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
}`,Yx=`#define MATCAP
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
}`,$x=`#define MATCAP
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
}`,Zx=`#define NORMAL
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
}`,Kx=`#define NORMAL
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
}`,jx=`#define PHONG
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
}`,Jx=`#define PHONG
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
}`,Qx=`#define STANDARD
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
}`,ty=`#define STANDARD
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
}`,ey=`#define TOON
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
}`,ny=`#define TOON
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
}`,iy=`uniform float size;
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
}`,sy=`uniform vec3 diffuse;
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
}`,ry=`#include <common>
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
}`,oy=`uniform vec3 color;
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
}`,ay=`uniform float rotation;
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
}`,cy=`uniform vec3 diffuse;
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
}`,ce={alphahash_fragment:I0,alphahash_pars_fragment:P0,alphamap_fragment:L0,alphamap_pars_fragment:D0,alphatest_fragment:N0,alphatest_pars_fragment:U0,aomap_fragment:F0,aomap_pars_fragment:O0,batching_pars_vertex:B0,batching_vertex:k0,begin_vertex:z0,beginnormal_vertex:H0,bsdfs:V0,iridescence_fragment:G0,bumpmap_pars_fragment:W0,clipping_planes_fragment:X0,clipping_planes_pars_fragment:q0,clipping_planes_pars_vertex:Y0,clipping_planes_vertex:$0,color_fragment:Z0,color_pars_fragment:K0,color_pars_vertex:j0,color_vertex:J0,common:Q0,cube_uv_reflection_fragment:t_,defaultnormal_vertex:e_,displacementmap_pars_vertex:n_,displacementmap_vertex:i_,emissivemap_fragment:s_,emissivemap_pars_fragment:r_,colorspace_fragment:o_,colorspace_pars_fragment:a_,envmap_fragment:c_,envmap_common_pars_fragment:l_,envmap_pars_fragment:h_,envmap_pars_vertex:u_,envmap_physical_pars_fragment:S_,envmap_vertex:f_,fog_vertex:d_,fog_pars_vertex:p_,fog_fragment:m_,fog_pars_fragment:g_,gradientmap_pars_fragment:__,lightmap_pars_fragment:x_,lights_lambert_fragment:y_,lights_lambert_pars_fragment:v_,lights_pars_begin:M_,lights_toon_fragment:b_,lights_toon_pars_fragment:E_,lights_phong_fragment:T_,lights_phong_pars_fragment:w_,lights_physical_fragment:A_,lights_physical_pars_fragment:R_,lights_fragment_begin:C_,lights_fragment_maps:I_,lights_fragment_end:P_,logdepthbuf_fragment:L_,logdepthbuf_pars_fragment:D_,logdepthbuf_pars_vertex:N_,logdepthbuf_vertex:U_,map_fragment:F_,map_pars_fragment:O_,map_particle_fragment:B_,map_particle_pars_fragment:k_,metalnessmap_fragment:z_,metalnessmap_pars_fragment:H_,morphinstance_vertex:V_,morphcolor_vertex:G_,morphnormal_vertex:W_,morphtarget_pars_vertex:X_,morphtarget_vertex:q_,normal_fragment_begin:Y_,normal_fragment_maps:$_,normal_pars_fragment:Z_,normal_pars_vertex:K_,normal_vertex:j_,normalmap_pars_fragment:J_,clearcoat_normal_fragment_begin:Q_,clearcoat_normal_fragment_maps:tx,clearcoat_pars_fragment:ex,iridescence_pars_fragment:nx,opaque_fragment:ix,packing:sx,premultiplied_alpha_fragment:rx,project_vertex:ox,dithering_fragment:ax,dithering_pars_fragment:cx,roughnessmap_fragment:lx,roughnessmap_pars_fragment:hx,shadowmap_pars_fragment:ux,shadowmap_pars_vertex:fx,shadowmap_vertex:dx,shadowmask_pars_fragment:px,skinbase_vertex:mx,skinning_pars_vertex:gx,skinning_vertex:_x,skinnormal_vertex:xx,specularmap_fragment:yx,specularmap_pars_fragment:vx,tonemapping_fragment:Mx,tonemapping_pars_fragment:Sx,transmission_fragment:bx,transmission_pars_fragment:Ex,uv_pars_fragment:Tx,uv_pars_vertex:wx,uv_vertex:Ax,worldpos_vertex:Rx,background_vert:Cx,background_frag:Ix,backgroundCube_vert:Px,backgroundCube_frag:Lx,cube_vert:Dx,cube_frag:Nx,depth_vert:Ux,depth_frag:Fx,distanceRGBA_vert:Ox,distanceRGBA_frag:Bx,equirect_vert:kx,equirect_frag:zx,linedashed_vert:Hx,linedashed_frag:Vx,meshbasic_vert:Gx,meshbasic_frag:Wx,meshlambert_vert:Xx,meshlambert_frag:qx,meshmatcap_vert:Yx,meshmatcap_frag:$x,meshnormal_vert:Zx,meshnormal_frag:Kx,meshphong_vert:jx,meshphong_frag:Jx,meshphysical_vert:Qx,meshphysical_frag:ty,meshtoon_vert:ey,meshtoon_frag:ny,points_vert:iy,points_frag:sy,shadow_vert:ry,shadow_frag:oy,sprite_vert:ay,sprite_frag:cy},Ot={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new oe}},envmap:{envMap:{value:null},envMapRotation:{value:new oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new oe},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0},uvTransform:{value:new oe}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}}},_i={basic:{uniforms:mn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:mn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Jt(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:mn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:mn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:mn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new Jt(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:mn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:mn([Ot.points,Ot.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:mn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:mn([Ot.common,Ot.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:mn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:mn([Ot.sprite,Ot.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new oe}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:mn([Ot.common,Ot.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:mn([Ot.lights,Ot.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};_i.physical={uniforms:mn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new oe},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new oe},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new oe},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new oe},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new oe},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new oe}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};vl={r:0,b:0,g:0},Us=new Vn,ly=new ie;zr=4,Mp=[.125,.215,.35,.446,.526,.582],Bs=20,hu=new Ni,Sp=new Jt,uu=null,fu=0,du=0,pu=!1,Os=(1+Math.sqrt(5))/2,kr=1/Os,bp=[new I(-Os,kr,0),new I(Os,kr,0),new I(-kr,0,Os),new I(kr,0,Os),new I(0,Os,-kr),new I(0,Os,kr),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],gy=new I,Vr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=gy}=r;uu=this._renderer.getRenderTarget(),fu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(uu,fu,du),this._renderer.xr.enabled=pu,t.scissorTest=!1,Ml(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ps||t.mapping===Ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),uu=this._renderer.getRenderTarget(),fu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Ur,format:Dn,colorSpace:an,depthBuffer:!1},s=Ep(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ep(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_y(r)),this._blurMaterial=xy(r,t,e)}return s}_compileMaterial(t){let e=new ee(this._lodPlanes[0],t);this._renderer.compile(e,hu)}_sceneToCubeUV(t,e,n,s,r){let l=new He(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Sp),u.toneMapping=Oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let x=new Ee({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),m=new ee(new Ji,x),p=!1,S=t.background;S?S.isColor&&(x.color.copy(S),t.background=null,p=!0):(x.color.copy(Sp),p=!0);for(let y=0;y<6;y++){let _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));let w=this._cubeSize;Ml(s,_*w,y>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=S}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ps||t.mapping===Ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ee(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ml(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,hu)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=bp[(s-r-1)%bp.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ee(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Bs-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Bs;m>Bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bs}`);let p=[],S=0;for(let C=0;C<Bs;++C){let U=C/x,b=Math.exp(-U*U/2);p.push(b),C===0?S+=b:C<m&&(S+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let _=this._sizeLods[s],w=3*_*(s>y-zr?s-y+zr:0),T=4*(this._cubeSize-_);Ml(e,w,T,3*_,2*_),l.setRenderTarget(e),l.render(u,hu)}};Xp=new je,Ap=new Do(1,1),qp=new So,Yp=new oc,$p=new wo,Rp=[],Cp=[],Ip=new Float32Array(16),Pp=new Float32Array(9),Lp=new Float32Array(4);gu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Xy(e.type)}},_u=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=uv(e.type)}},xu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},mu=/(\w+)(\])?(\[|\.)?/g;Hr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);fv(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};dv=37297,pv=0;Up=new oe;Sl=new I;bv=/^[ \t]*#include +<([\w\d./]+)>/gm;Ev=new Map;wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;Nv=0,vu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Mu(t),e.set(t,n)),n}},Mu=class{constructor(t){this.id=Nv++,this.code=t,this.usedTimes=0}};Hv=0;Xv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qv=`uniform sampler2D shadow_pass;
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
}`;$v={[wc]:Ac,[Rc]:Pc,[Cc]:Lc,[ms]:Ic,[Ac]:wc,[Pc]:Rc,[Lc]:Cc,[Ic]:ms};Jv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qv=`
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

}`,Su=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new No(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Pn({vertexShader:Jv,fragmentShader:Qv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new Ts(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bu=class extends li{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null,x=typeof XRWebGLBinding<"u",m=new Su,p={},S=e.getContextAttributes(),y=null,_=null,w=[],T=[],C=new Rt,U=null,b=new He;b.viewport=new be;let M=new He;M.viewport=new be;let N=[b,M],H=new Tc,z=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let L=w[et];return L===void 0&&(L=new Sr,w[et]=L),L.getTargetRaySpace()},this.getControllerGrip=function(et){let L=w[et];return L===void 0&&(L=new Sr,w[et]=L),L.getGripSpace()},this.getHand=function(et){let L=w[et];return L===void 0&&(L=new Sr,w[et]=L),L.getHandSpace()};function st(et){let L=T.indexOf(et.inputSource);if(L===-1)return;let rt=w[L];rt!==void 0&&(rt.update(et.inputSource,et.frame,c||o),rt.dispatchEvent({type:et.type,data:et.inputSource}))}function $(){s.removeEventListener("select",st),s.removeEventListener("selectstart",st),s.removeEventListener("selectend",st),s.removeEventListener("squeeze",st),s.removeEventListener("squeezestart",st),s.removeEventListener("squeezeend",st),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",Mt);for(let et=0;et<w.length;et++){let L=T[et];L!==null&&(T[et]=null,w[et].disconnect(L))}z=null,K=null,m.reset();for(let et in p)delete p[et];t.setRenderTarget(y),d=null,f=null,u=null,s=null,_=null,Ct.stop(),n.isPresenting=!1,t.setPixelRatio(U),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){r=et,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){a=et,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(et){c=et},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(et){if(s=et,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",st),s.addEventListener("selectstart",st),s.addEventListener("selectend",st),s.addEventListener("squeeze",st),s.addEventListener("squeezestart",st),s.addEventListener("squeezeend",st),s.addEventListener("end",$),s.addEventListener("inputsourceschange",Mt),S.xrCompatible!==!0&&await e.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Nt=null,Ut=null;S.depth&&(Ut=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=S.stencil?Or:_r,Nt=S.stencil?Fr:ns);let Bt={colorFormat:e.RGBA8,depthFormat:Ut,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Hn(f.textureWidth,f.textureHeight,{format:Dn,type:ii,depthTexture:new Do(f.textureWidth,f.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let rt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Hn(d.framebufferWidth,d.framebufferHeight,{format:Dn,type:ii,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ct.setContext(s),Ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Mt(et){for(let L=0;L<et.removed.length;L++){let rt=et.removed[L],Nt=T.indexOf(rt);Nt>=0&&(T[Nt]=null,w[Nt].disconnect(rt))}for(let L=0;L<et.added.length;L++){let rt=et.added[L],Nt=T.indexOf(rt);if(Nt===-1){for(let Bt=0;Bt<w.length;Bt++)if(Bt>=T.length){T.push(rt),Nt=Bt;break}else if(T[Bt]===null){T[Bt]=rt,Nt=Bt;break}if(Nt===-1)break}let Ut=w[Nt];Ut&&Ut.connect(rt)}}let A=new I,O=new I;function X(et,L,rt){A.setFromMatrixPosition(L.matrixWorld),O.setFromMatrixPosition(rt.matrixWorld);let Nt=A.distanceTo(O),Ut=L.projectionMatrix.elements,Bt=rt.projectionMatrix.elements,ye=Ut[14]/(Ut[10]-1),D=Ut[14]/(Ut[10]+1),Qt=(Ut[9]+1)/Ut[5],qt=(Ut[9]-1)/Ut[5],Ht=(Ut[8]-1)/Ut[0],kt=(Bt[8]+1)/Bt[0],ue=ye*Ht,Vt=ye*kt,Xt=Nt/(-Ht+kt),we=Xt*-Ht;if(L.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(we),et.translateZ(Xt),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert(),Ut[10]===-1)et.projectionMatrix.copy(L.projectionMatrix),et.projectionMatrixInverse.copy(L.projectionMatrixInverse);else{let se=ye+Xt,R=D+Xt,v=ue-we,V=Vt+(Nt-we),B=Qt*D/R*se,it=qt*D/R*se;et.projectionMatrix.makePerspective(v,V,B,it,se,R),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}}function ot(et,L){L===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(L.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(s===null)return;let L=et.near,rt=et.far;m.texture!==null&&(m.depthNear>0&&(L=m.depthNear),m.depthFar>0&&(rt=m.depthFar)),H.near=M.near=b.near=L,H.far=M.far=b.far=rt,(z!==H.near||K!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),z=H.near,K=H.far),H.layers.mask=et.layers.mask|6,b.layers.mask=H.layers.mask&3,M.layers.mask=H.layers.mask&5;let Nt=et.parent,Ut=H.cameras;ot(H,Nt);for(let Bt=0;Bt<Ut.length;Bt++)ot(Ut[Bt],Nt);Ut.length===2?X(H,b,M):H.projectionMatrix.copy(b.projectionMatrix),ut(et,H,Nt)};function ut(et,L,rt){rt===null?et.matrix.copy(L.matrixWorld):(et.matrix.copy(rt.matrixWorld),et.matrix.invert(),et.matrix.multiply(L.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(L.projectionMatrix),et.projectionMatrixInverse.copy(L.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=xs*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(et){l=et,f!==null&&(f.fixedFoveation=et),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=et)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(et){return p[et]};let wt=null;function _t(et,L){if(h=L.getViewerPose(c||o),g=L,h!==null){let rt=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Nt=!1;rt.length!==H.cameras.length&&(H.cameras.length=0,Nt=!0);for(let D=0;D<rt.length;D++){let Qt=rt[D],qt=null;if(d!==null)qt=d.getViewport(Qt);else{let kt=u.getViewSubImage(f,Qt);qt=kt.viewport,D===0&&(t.setRenderTargetTextures(_,kt.colorTexture,kt.depthStencilTexture),t.setRenderTarget(_))}let Ht=N[D];Ht===void 0&&(Ht=new He,Ht.layers.enable(D),Ht.viewport=new be,N[D]=Ht),Ht.matrix.fromArray(Qt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Qt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(qt.x,qt.y,qt.width,qt.height),D===0&&(H.matrix.copy(Ht.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Nt===!0&&H.cameras.push(Ht)}let Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let D=u.getDepthInformation(rt[0]);D&&D.isValid&&D.texture&&m.init(D,s.renderState)}if(Ut&&Ut.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<rt.length;D++){let Qt=rt[D].camera;if(Qt){let qt=p[Qt];qt||(qt=new No,p[Qt]=qt);let Ht=u.getCameraImage(Qt);qt.sourceTexture=Ht}}}}for(let rt=0;rt<w.length;rt++){let Nt=T[rt],Ut=w[rt];Nt!==null&&Ut!==void 0&&Ut.update(Nt,L,c||o)}wt&&wt(et,L),L.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:L}),g=null}let Ct=new Wp;Ct.setAnimationLoop(_t),this.setAnimationLoop=function(et){wt=et},this.dispose=function(){}}},Fs=new Vn,tM=new ie;Gr=class{constructor(t={}){let{canvas:e=hp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,S=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,w=!1;this._outputColorSpace=ze;let T=0,C=0,U=null,b=-1,M=null,N=new be,H=new be,z=null,K=new Jt(0),st=0,$=e.width,Mt=e.height,A=1,O=null,X=null,ot=new be(0,0,$,Mt),ut=new be(0,0,$,Mt),wt=!1,_t=new Tr,Ct=!1,et=!1,L=new ie,rt=new I,Nt=new be,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Bt=!1;function ye(){return U===null?A:1}let D=n;function Qt(E,q){return e.getContext(E,q)}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",tt,!1),D===null){let q="webgl2";if(D=Qt(q,E),D===null)throw Qt(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let qt,Ht,kt,ue,Vt,Xt,we,se,R,v,V,B,it,Q,At,vt,F,j,k,lt,ct,ft,nt,It;function P(){qt=new vy(D),qt.init(),ft=new jv(D,qt),Ht=new dy(D,qt,t,ft),kt=new Zv(D,qt),Ht.reversedDepthBuffer&&f&&kt.buffers.depth.setReversed(!0),ue=new by(D),Vt=new Fv,Xt=new Kv(D,qt,kt,Vt,Ht,ft,ue),we=new my(_),se=new yy(_),R=new C0(D),nt=new uy(D,R),v=new My(D,R,ue,nt),V=new Ty(D,v,R,ue),k=new Ey(D,Ht,Xt),vt=new py(Vt),B=new Uv(_,we,se,qt,Ht,nt,vt),it=new eM(_,Vt),Q=new Bv,At=new Wv(qt),j=new hy(_,we,se,kt,V,d,l),F=new Yv(_,V,Ht),It=new nM(D,ue,Ht,kt),lt=new fy(D,qt,ue),ct=new Sy(D,qt,ue),ue.programs=B.programs,_.capabilities=Ht,_.extensions=qt,_.properties=Vt,_.renderLists=Q,_.shadowMap=F,_.state=kt,_.info=ue}P();let ht=new bu(_,D);this.xr=ht,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let E=qt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=qt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return A},this.setPixelRatio=function(E){E!==void 0&&(A=E,this.setSize($,Mt,!1))},this.getSize=function(E){return E.set($,Mt)},this.setSize=function(E,q,at=!0){if(ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,Mt=q,e.width=Math.floor(E*A),e.height=Math.floor(q*A),at===!0&&(e.style.width=E+"px",e.style.height=q+"px"),this.setViewport(0,0,E,q)},this.getDrawingBufferSize=function(E){return E.set($*A,Mt*A).floor()},this.setDrawingBufferSize=function(E,q,at){$=E,Mt=q,A=at,e.width=Math.floor(E*at),e.height=Math.floor(q*at),this.setViewport(0,0,E,q)},this.getCurrentViewport=function(E){return E.copy(N)},this.getViewport=function(E){return E.copy(ot)},this.setViewport=function(E,q,at,G){E.isVector4?ot.set(E.x,E.y,E.z,E.w):ot.set(E,q,at,G),kt.viewport(N.copy(ot).multiplyScalar(A).round())},this.getScissor=function(E){return E.copy(ut)},this.setScissor=function(E,q,at,G){E.isVector4?ut.set(E.x,E.y,E.z,E.w):ut.set(E,q,at,G),kt.scissor(H.copy(ut).multiplyScalar(A).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(E){kt.setScissorTest(wt=E)},this.setOpaqueSort=function(E){O=E},this.setTransparentSort=function(E){X=E},this.getClearColor=function(E){return E.copy(j.getClearColor())},this.setClearColor=function(){j.setClearColor(...arguments)},this.getClearAlpha=function(){return j.getClearAlpha()},this.setClearAlpha=function(){j.setClearAlpha(...arguments)},this.clear=function(E=!0,q=!0,at=!0){let G=0;if(E){let Y=!1;if(U!==null){let xt=U.texture.format;Y=xt===Wc||xt===Gc||xt===Vc}if(Y){let xt=U.texture.type,Ft=xt===ii||xt===ns||xt===Nr||xt===Fr||xt===kc||xt===zc,Wt=j.getClearColor(),Gt=j.getClearAlpha(),te=Wt.r,Kt=Wt.g,Yt=Wt.b;Ft?(g[0]=te,g[1]=Kt,g[2]=Yt,g[3]=Gt,D.clearBufferuiv(D.COLOR,0,g)):(x[0]=te,x[1]=Kt,x[2]=Yt,x[3]=Gt,D.clearBufferiv(D.COLOR,0,x))}else G|=D.COLOR_BUFFER_BIT}q&&(G|=D.DEPTH_BUFFER_BIT),at&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),j.dispose(),Q.dispose(),At.dispose(),Vt.dispose(),we.dispose(),se.dispose(),V.dispose(),nt.dispose(),It.dispose(),B.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",Le),ht.removeEventListener("sessionend",An),rn.stop()};function dt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let E=ue.autoReset,q=F.enabled,at=F.autoUpdate,G=F.needsUpdate,Y=F.type;P(),ue.autoReset=E,F.enabled=q,F.autoUpdate=at,F.needsUpdate=G,F.type=Y}function tt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Z(E){let q=E.target;q.removeEventListener("dispose",Z),bt(q)}function bt(E){Pt(E),Vt.remove(E)}function Pt(E){let q=Vt.get(E).programs;q!==void 0&&(q.forEach(function(at){B.releaseProgram(at)}),E.isShaderMaterial&&B.releaseShaderCache(E))}this.renderBufferDirect=function(E,q,at,G,Y,xt){q===null&&(q=Ut);let Ft=Y.isMesh&&Y.matrixWorld.determinant()<0,Wt=Hl(E,q,at,G,Y);kt.setMaterial(G,Ft);let Gt=at.index,te=1;if(G.wireframe===!0){if(Gt=v.getWireframeAttribute(at),Gt===void 0)return;te=2}let Kt=at.drawRange,Yt=at.attributes.position,re=Kt.start*te,Se=(Kt.start+Kt.count)*te;xt!==null&&(re=Math.max(re,xt.start*te),Se=Math.min(Se,(xt.start+xt.count)*te)),Gt!==null?(re=Math.max(re,0),Se=Math.min(Se,Gt.count)):Yt!=null&&(re=Math.max(re,0),Se=Math.min(Se,Yt.count));let Be=Se-re;if(Be<0||Be===1/0)return;nt.setup(Y,G,Wt,at,Gt);let De,me=lt;if(Gt!==null&&(De=R.get(Gt),me=ct,me.setIndex(De)),Y.isMesh)G.wireframe===!0?(kt.setLineWidth(G.wireframeLinewidth*ye()),me.setMode(D.LINES)):me.setMode(D.TRIANGLES);else if(Y.isLine){let $t=G.linewidth;$t===void 0&&($t=1),kt.setLineWidth($t*ye()),Y.isLineSegments?me.setMode(D.LINES):Y.isLineLoop?me.setMode(D.LINE_LOOP):me.setMode(D.LINE_STRIP)}else Y.isPoints?me.setMode(D.POINTS):Y.isSprite&&me.setMode(D.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)yr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),me.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(qt.get("WEBGL_multi_draw"))me.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let $t=Y._multiDrawStarts,Ne=Y._multiDrawCounts,le=Y._multiDrawCount,hn=Gt?R.get(Gt).bytesPerElement:1,W=Vt.get(G).currentProgram.getUniforms();for(let J=0;J<le;J++)W.setValue(D,"_gl_DrawID",J),me.render($t[J]/hn,Ne[J])}else if(Y.isInstancedMesh)me.renderInstances(re,Be,Y.count);else if(at.isInstancedBufferGeometry){let $t=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,Ne=Math.min(at.instanceCount,$t);me.renderInstances(re,Be,Ne)}else me.render(re,Be)};function ne(E,q,at){E.transparent===!0&&E.side===Te&&E.forceSinglePass===!1?(E.side=cn,E.needsUpdate=!0,os(E,q,at),E.side=ti,E.needsUpdate=!0,os(E,q,at),E.side=Te):os(E,q,at)}this.compile=function(E,q,at=null){at===null&&(at=E),p=At.get(at),p.init(q),y.push(p),at.traverseVisible(function(Y){Y.isLight&&Y.layers.test(q.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),E!==at&&E.traverseVisible(function(Y){Y.isLight&&Y.layers.test(q.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights();let G=new Set;return E.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let xt=Y.material;if(xt)if(Array.isArray(xt))for(let Ft=0;Ft<xt.length;Ft++){let Wt=xt[Ft];ne(Wt,at,Y),G.add(Wt)}else ne(xt,at,Y),G.add(xt)}),p=y.pop(),G},this.compileAsync=function(E,q,at=null){let G=this.compile(E,q,at);return new Promise(Y=>{function xt(){if(G.forEach(function(Ft){Vt.get(Ft).currentProgram.isReady()&&G.delete(Ft)}),G.size===0){Y(E);return}setTimeout(xt,10)}qt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let Zt=null;function pe(E){Zt&&Zt(E)}function Le(){rn.stop()}function An(){rn.start()}let rn=new Wp;rn.setAnimationLoop(pe),typeof self<"u"&&rn.setContext(self),this.setAnimationLoop=function(E){Zt=E,ht.setAnimationLoop(E),E===null?rn.stop():rn.start()},ht.addEventListener("sessionstart",Le),ht.addEventListener("sessionend",An),this.render=function(E,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(q),q=ht.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,q,U),p=At.get(E,y.length),p.init(q),y.push(p),L.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),_t.setFromProjectionMatrix(L,Qn,q.reversedDepth),et=this.localClippingEnabled,Ct=vt.init(this.clippingPlanes,et),m=Q.get(E,S.length),m.init(),S.push(m),ht.enabled===!0&&ht.isPresenting===!0){let xt=_.xr.getDepthSensingMesh();xt!==null&&nn(xt,q,-1/0,_.sortObjects)}nn(E,q,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(O,X),Bt=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,Bt&&j.addToRenderList(m,E),this.info.render.frame++,Ct===!0&&vt.beginShadows();let at=p.state.shadowsArray;F.render(at,E,q),Ct===!0&&vt.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=m.opaque,Y=m.transmissive;if(p.setupLights(),q.isArrayCamera){let xt=q.cameras;if(Y.length>0)for(let Ft=0,Wt=xt.length;Ft<Wt;Ft++){let Gt=xt[Ft];vi(G,Y,E,Gt)}Bt&&j.render(E);for(let Ft=0,Wt=xt.length;Ft<Wt;Ft++){let Gt=xt[Ft];Yn(m,E,Gt,Gt.viewport)}}else Y.length>0&&vi(G,Y,E,q),Bt&&j.render(E),Yn(m,E,q);U!==null&&C===0&&(Xt.updateMultisampleRenderTarget(U),Xt.updateRenderTargetMipmap(U)),E.isScene===!0&&E.onAfterRender(_,E,q),nt.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],Ct===!0&&vt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function nn(E,q,at,G){if(E.visible===!1)return;if(E.layers.test(q.layers)){if(E.isGroup)at=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(q);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||_t.intersectsSprite(E)){G&&Nt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(L);let Ft=V.update(E),Wt=E.material;Wt.visible&&m.push(E,Ft,Wt,at,Nt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||_t.intersectsObject(E))){let Ft=V.update(E),Wt=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Nt.copy(E.boundingSphere.center)):(Ft.boundingSphere===null&&Ft.computeBoundingSphere(),Nt.copy(Ft.boundingSphere.center)),Nt.applyMatrix4(E.matrixWorld).applyMatrix4(L)),Array.isArray(Wt)){let Gt=Ft.groups;for(let te=0,Kt=Gt.length;te<Kt;te++){let Yt=Gt[te],re=Wt[Yt.materialIndex];re&&re.visible&&m.push(E,Ft,re,at,Nt.z,Yt)}}else Wt.visible&&m.push(E,Ft,Wt,at,Nt.z,null)}}let xt=E.children;for(let Ft=0,Wt=xt.length;Ft<Wt;Ft++)nn(xt[Ft],q,at,G)}function Yn(E,q,at,G){let Y=E.opaque,xt=E.transmissive,Ft=E.transparent;p.setupLightsView(at),Ct===!0&&vt.setGlobalState(_.clippingPlanes,at),G&&kt.viewport(N.copy(G)),Y.length>0&&Un(Y,q,at),xt.length>0&&Un(xt,q,at),Ft.length>0&&Un(Ft,q,at),kt.buffers.depth.setTest(!0),kt.buffers.depth.setMask(!0),kt.buffers.color.setMask(!0),kt.setPolygonOffset(!1)}function vi(E,q,at,G){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Hn(1,1,{generateMipmaps:!0,type:qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float")?Ur:ii,minFilter:ni,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ge.workingColorSpace}));let xt=p.state.transmissionRenderTarget[G.id],Ft=G.viewport||N;xt.setSize(Ft.z*_.transmissionResolutionScale,Ft.w*_.transmissionResolutionScale);let Wt=_.getRenderTarget(),Gt=_.getActiveCubeFace(),te=_.getActiveMipmapLevel();_.setRenderTarget(xt),_.getClearColor(K),st=_.getClearAlpha(),st<1&&_.setClearColor(16777215,.5),_.clear(),Bt&&j.render(at);let Kt=_.toneMapping;_.toneMapping=Oi;let Yt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Ct===!0&&vt.setGlobalState(_.clippingPlanes,G),Un(E,at,G),Xt.updateMultisampleRenderTarget(xt),Xt.updateRenderTargetMipmap(xt),qt.has("WEBGL_multisampled_render_to_texture")===!1){let re=!1;for(let Se=0,Be=q.length;Se<Be;Se++){let De=q[Se],me=De.object,$t=De.geometry,Ne=De.material,le=De.group;if(Ne.side===Te&&me.layers.test(G.layers)){let hn=Ne.side;Ne.side=cn,Ne.needsUpdate=!0,Fn(me,at,G,$t,Ne,le),Ne.side=hn,Ne.needsUpdate=!0,re=!0}}re===!0&&(Xt.updateMultisampleRenderTarget(xt),Xt.updateRenderTargetMipmap(xt))}_.setRenderTarget(Wt,Gt,te),_.setClearColor(K,st),Yt!==void 0&&(G.viewport=Yt),_.toneMapping=Kt}function Un(E,q,at){let G=q.isScene===!0?q.overrideMaterial:null;for(let Y=0,xt=E.length;Y<xt;Y++){let Ft=E[Y],Wt=Ft.object,Gt=Ft.geometry,te=Ft.group,Kt=Ft.material;Kt.allowOverride===!0&&G!==null&&(Kt=G),Wt.layers.test(at.layers)&&Fn(Wt,q,at,Gt,Kt,te)}}function Fn(E,q,at,G,Y,xt){E.onBeforeRender(_,q,at,G,Y,xt),E.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Y.onBeforeRender(_,q,at,G,E,xt),Y.transparent===!0&&Y.side===Te&&Y.forceSinglePass===!1?(Y.side=cn,Y.needsUpdate=!0,_.renderBufferDirect(at,q,G,Y,E,xt),Y.side=ti,Y.needsUpdate=!0,_.renderBufferDirect(at,q,G,Y,E,xt),Y.side=Te):_.renderBufferDirect(at,q,G,Y,E,xt),E.onAfterRender(_,q,at,G,Y,xt)}function os(E,q,at){q.isScene!==!0&&(q=Ut);let G=Vt.get(E),Y=p.state.lights,xt=p.state.shadowsArray,Ft=Y.state.version,Wt=B.getParameters(E,Y.state,xt,q,at),Gt=B.getProgramCacheKey(Wt),te=G.programs;G.environment=E.isMeshStandardMaterial?q.environment:null,G.fog=q.fog,G.envMap=(E.isMeshStandardMaterial?se:we).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?q.environmentRotation:E.envMapRotation,te===void 0&&(E.addEventListener("dispose",Z),te=new Map,G.programs=te);let Kt=te.get(Gt);if(Kt!==void 0){if(G.currentProgram===Kt&&G.lightsStateVersion===Ft)return he(E,Wt),Kt}else Wt.uniforms=B.getUniforms(E),E.onBeforeCompile(Wt,_),Kt=B.acquireProgram(Wt,Gt),te.set(Gt,Kt),G.uniforms=Wt.uniforms;let Yt=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Yt.clippingPlanes=vt.uniform),he(E,Wt),G.needsLights=_a(E),G.lightsStateVersion=Ft,G.needsLights&&(Yt.ambientLightColor.value=Y.state.ambient,Yt.lightProbe.value=Y.state.probe,Yt.directionalLights.value=Y.state.directional,Yt.directionalLightShadows.value=Y.state.directionalShadow,Yt.spotLights.value=Y.state.spot,Yt.spotLightShadows.value=Y.state.spotShadow,Yt.rectAreaLights.value=Y.state.rectArea,Yt.ltc_1.value=Y.state.rectAreaLTC1,Yt.ltc_2.value=Y.state.rectAreaLTC2,Yt.pointLights.value=Y.state.point,Yt.pointLightShadows.value=Y.state.pointShadow,Yt.hemisphereLights.value=Y.state.hemi,Yt.directionalShadowMap.value=Y.state.directionalShadowMap,Yt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Yt.spotShadowMap.value=Y.state.spotShadowMap,Yt.spotLightMatrix.value=Y.state.spotLightMatrix,Yt.spotLightMap.value=Y.state.spotLightMap,Yt.pointShadowMap.value=Y.state.pointShadowMap,Yt.pointShadowMatrix.value=Y.state.pointShadowMatrix),G.currentProgram=Kt,G.uniformsList=null,Kt}function ga(E){if(E.uniformsList===null){let q=E.currentProgram.getUniforms();E.uniformsList=Hr.seqWithValue(q.seq,E.uniforms)}return E.uniformsList}function he(E,q){let at=Vt.get(E);at.outputColorSpace=q.outputColorSpace,at.batching=q.batching,at.batchingColor=q.batchingColor,at.instancing=q.instancing,at.instancingColor=q.instancingColor,at.instancingMorph=q.instancingMorph,at.skinning=q.skinning,at.morphTargets=q.morphTargets,at.morphNormals=q.morphNormals,at.morphColors=q.morphColors,at.morphTargetsCount=q.morphTargetsCount,at.numClippingPlanes=q.numClippingPlanes,at.numIntersection=q.numClipIntersection,at.vertexAlphas=q.vertexAlphas,at.vertexTangents=q.vertexTangents,at.toneMapping=q.toneMapping}function Hl(E,q,at,G,Y){q.isScene!==!0&&(q=Ut),Xt.resetTextureUnits();let xt=q.fog,Ft=G.isMeshStandardMaterial?q.environment:null,Wt=U===null?_.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:an,Gt=(G.isMeshStandardMaterial?se:we).get(G.envMap||Ft),te=G.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,Kt=!!at.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Yt=!!at.morphAttributes.position,re=!!at.morphAttributes.normal,Se=!!at.morphAttributes.color,Be=Oi;G.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Be=_.toneMapping);let De=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,me=De!==void 0?De.length:0,$t=Vt.get(G),Ne=p.state.lights;if(Ct===!0&&(et===!0||E!==M)){let pt=E===M&&G.id===b;vt.setState(G,E,pt)}let le=!1;G.version===$t.__version?($t.needsLights&&$t.lightsStateVersion!==Ne.state.version||$t.outputColorSpace!==Wt||Y.isBatchedMesh&&$t.batching===!1||!Y.isBatchedMesh&&$t.batching===!0||Y.isBatchedMesh&&$t.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&$t.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&$t.instancing===!1||!Y.isInstancedMesh&&$t.instancing===!0||Y.isSkinnedMesh&&$t.skinning===!1||!Y.isSkinnedMesh&&$t.skinning===!0||Y.isInstancedMesh&&$t.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&$t.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&$t.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&$t.instancingMorph===!1&&Y.morphTexture!==null||$t.envMap!==Gt||G.fog===!0&&$t.fog!==xt||$t.numClippingPlanes!==void 0&&($t.numClippingPlanes!==vt.numPlanes||$t.numIntersection!==vt.numIntersection)||$t.vertexAlphas!==te||$t.vertexTangents!==Kt||$t.morphTargets!==Yt||$t.morphNormals!==re||$t.morphColors!==Se||$t.toneMapping!==Be||$t.morphTargetsCount!==me)&&(le=!0):(le=!0,$t.__version=G.version);let hn=$t.currentProgram;le===!0&&(hn=os(G,q,Y));let W=!1,J=!1,yt=!1,gt=hn.getUniforms(),Et=$t.uniforms;if(kt.useProgram(hn.program)&&(W=!0,J=!0,yt=!0),G.id!==b&&(b=G.id,J=!0),W||M!==E){kt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),gt.setValue(D,"projectionMatrix",E.projectionMatrix),gt.setValue(D,"viewMatrix",E.matrixWorldInverse);let St=gt.map.cameraPosition;St!==void 0&&St.setValue(D,rt.setFromMatrixPosition(E.matrixWorld)),Ht.logarithmicDepthBuffer&&gt.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&gt.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,J=!0,yt=!0)}if(Y.isSkinnedMesh){gt.setOptional(D,Y,"bindMatrix"),gt.setOptional(D,Y,"bindMatrixInverse");let pt=Y.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),gt.setValue(D,"boneTexture",pt.boneTexture,Xt))}Y.isBatchedMesh&&(gt.setOptional(D,Y,"batchingTexture"),gt.setValue(D,"batchingTexture",Y._matricesTexture,Xt),gt.setOptional(D,Y,"batchingIdTexture"),gt.setValue(D,"batchingIdTexture",Y._indirectTexture,Xt),gt.setOptional(D,Y,"batchingColorTexture"),Y._colorsTexture!==null&&gt.setValue(D,"batchingColorTexture",Y._colorsTexture,Xt));let Tt=at.morphAttributes;if((Tt.position!==void 0||Tt.normal!==void 0||Tt.color!==void 0)&&k.update(Y,at,hn),(J||$t.receiveShadow!==Y.receiveShadow)&&($t.receiveShadow=Y.receiveShadow,gt.setValue(D,"receiveShadow",Y.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Et.envMap.value=Gt,Et.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&q.environment!==null&&(Et.envMapIntensity.value=q.environmentIntensity),J&&(gt.setValue(D,"toneMappingExposure",_.toneMappingExposure),$t.needsLights&&Hi(Et,yt),xt&&G.fog===!0&&it.refreshFogUniforms(Et,xt),it.refreshMaterialUniforms(Et,G,A,Mt,p.state.transmissionRenderTarget[E.id]),Hr.upload(D,ga($t),Et,Xt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Hr.upload(D,ga($t),Et,Xt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&gt.setValue(D,"center",Y.center),gt.setValue(D,"modelViewMatrix",Y.modelViewMatrix),gt.setValue(D,"normalMatrix",Y.normalMatrix),gt.setValue(D,"modelMatrix",Y.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let pt=G.uniformsGroups;for(let St=0,Lt=pt.length;St<Lt;St++){let jt=pt[St];It.update(jt,hn),It.bind(jt,hn)}}return hn}function Hi(E,q){E.ambientLightColor.needsUpdate=q,E.lightProbe.needsUpdate=q,E.directionalLights.needsUpdate=q,E.directionalLightShadows.needsUpdate=q,E.pointLights.needsUpdate=q,E.pointLightShadows.needsUpdate=q,E.spotLights.needsUpdate=q,E.spotLightShadows.needsUpdate=q,E.rectAreaLights.needsUpdate=q,E.hemisphereLights.needsUpdate=q}function _a(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,q,at){let G=Vt.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Vt.get(E.texture).__webglTexture=q,Vt.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:at,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,q){let at=Vt.get(E);at.__webglFramebuffer=q,at.__useDefaultFramebuffer=q===void 0};let Vi=D.createFramebuffer();this.setRenderTarget=function(E,q=0,at=0){U=E,T=q,C=at;let G=!0,Y=null,xt=!1,Ft=!1;if(E){let Gt=Vt.get(E);if(Gt.__useDefaultFramebuffer!==void 0)kt.bindFramebuffer(D.FRAMEBUFFER,null),G=!1;else if(Gt.__webglFramebuffer===void 0)Xt.setupRenderTarget(E);else if(Gt.__hasExternalTextures)Xt.rebindTextures(E,Vt.get(E.texture).__webglTexture,Vt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Yt=E.depthTexture;if(Gt.__boundDepthTexture!==Yt){if(Yt!==null&&Vt.has(Yt)&&(E.width!==Yt.image.width||E.height!==Yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xt.setupDepthRenderbuffer(E)}}let te=E.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(Ft=!0);let Kt=Vt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Kt[q])?Y=Kt[q][at]:Y=Kt[q],xt=!0):E.samples>0&&Xt.useMultisampledRTT(E)===!1?Y=Vt.get(E).__webglMultisampledFramebuffer:Array.isArray(Kt)?Y=Kt[at]:Y=Kt,N.copy(E.viewport),H.copy(E.scissor),z=E.scissorTest}else N.copy(ot).multiplyScalar(A).floor(),H.copy(ut).multiplyScalar(A).floor(),z=wt;if(at!==0&&(Y=Vi),kt.bindFramebuffer(D.FRAMEBUFFER,Y)&&G&&kt.drawBuffers(E,Y),kt.viewport(N),kt.scissor(H),kt.setScissorTest(z),xt){let Gt=Vt.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+q,Gt.__webglTexture,at)}else if(Ft){let Gt=q;for(let te=0;te<E.textures.length;te++){let Kt=Vt.get(E.textures[te]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+te,Kt.__webglTexture,at,Gt)}}else if(E!==null&&at!==0){let Gt=Vt.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Gt.__webglTexture,at)}b=-1},this.readRenderTargetPixels=function(E,q,at,G,Y,xt,Ft,Wt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=Vt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ft!==void 0&&(Gt=Gt[Ft]),Gt){kt.bindFramebuffer(D.FRAMEBUFFER,Gt);try{let te=E.textures[Wt],Kt=te.format,Yt=te.type;if(!Ht.textureFormatReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=E.width-G&&at>=0&&at<=E.height-Y&&(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Wt),D.readPixels(q,at,G,Y,ft.convert(Kt),ft.convert(Yt),xt))}finally{let te=U!==null?Vt.get(U).__webglFramebuffer:null;kt.bindFramebuffer(D.FRAMEBUFFER,te)}}},this.readRenderTargetPixelsAsync=async function(E,q,at,G,Y,xt,Ft,Wt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=Vt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ft!==void 0&&(Gt=Gt[Ft]),Gt)if(q>=0&&q<=E.width-G&&at>=0&&at<=E.height-Y){kt.bindFramebuffer(D.FRAMEBUFFER,Gt);let te=E.textures[Wt],Kt=te.format,Yt=te.type;if(!Ht.textureFormatReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,re),D.bufferData(D.PIXEL_PACK_BUFFER,xt.byteLength,D.STREAM_READ),E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Wt),D.readPixels(q,at,G,Y,ft.convert(Kt),ft.convert(Yt),0);let Se=U!==null?Vt.get(U).__webglFramebuffer:null;kt.bindFramebuffer(D.FRAMEBUFFER,Se);let Be=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await up(D,Be,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,re),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,xt),D.deleteBuffer(re),D.deleteSync(Be),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,q=null,at=0){let G=Math.pow(2,-at),Y=Math.floor(E.image.width*G),xt=Math.floor(E.image.height*G),Ft=q!==null?q.x:0,Wt=q!==null?q.y:0;Xt.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,at,0,0,Ft,Wt,Y,xt),kt.unbindTexture()};let no=D.createFramebuffer(),Ws=D.createFramebuffer();this.copyTextureToTexture=function(E,q,at=null,G=null,Y=0,xt=null){xt===null&&(Y!==0?(yr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xt=Y,Y=0):xt=0);let Ft,Wt,Gt,te,Kt,Yt,re,Se,Be,De=E.isCompressedTexture?E.mipmaps[xt]:E.image;if(at!==null)Ft=at.max.x-at.min.x,Wt=at.max.y-at.min.y,Gt=at.isBox3?at.max.z-at.min.z:1,te=at.min.x,Kt=at.min.y,Yt=at.isBox3?at.min.z:0;else{let Tt=Math.pow(2,-Y);Ft=Math.floor(De.width*Tt),Wt=Math.floor(De.height*Tt),E.isDataArrayTexture?Gt=De.depth:E.isData3DTexture?Gt=Math.floor(De.depth*Tt):Gt=1,te=0,Kt=0,Yt=0}G!==null?(re=G.x,Se=G.y,Be=G.z):(re=0,Se=0,Be=0);let me=ft.convert(q.format),$t=ft.convert(q.type),Ne;q.isData3DTexture?(Xt.setTexture3D(q,0),Ne=D.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(Xt.setTexture2DArray(q,0),Ne=D.TEXTURE_2D_ARRAY):(Xt.setTexture2D(q,0),Ne=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,q.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,q.unpackAlignment);let le=D.getParameter(D.UNPACK_ROW_LENGTH),hn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),W=D.getParameter(D.UNPACK_SKIP_PIXELS),J=D.getParameter(D.UNPACK_SKIP_ROWS),yt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,De.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,De.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,te),D.pixelStorei(D.UNPACK_SKIP_ROWS,Kt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Yt);let gt=E.isDataArrayTexture||E.isData3DTexture,Et=q.isDataArrayTexture||q.isData3DTexture;if(E.isDepthTexture){let Tt=Vt.get(E),pt=Vt.get(q),St=Vt.get(Tt.__renderTarget),Lt=Vt.get(pt.__renderTarget);kt.bindFramebuffer(D.READ_FRAMEBUFFER,St.__webglFramebuffer),kt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let jt=0;jt<Gt;jt++)gt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Vt.get(E).__webglTexture,Y,Yt+jt),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Vt.get(q).__webglTexture,xt,Be+jt)),D.blitFramebuffer(te,Kt,Ft,Wt,re,Se,Ft,Wt,D.DEPTH_BUFFER_BIT,D.NEAREST);kt.bindFramebuffer(D.READ_FRAMEBUFFER,null),kt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(Y!==0||E.isRenderTargetTexture||Vt.has(E)){let Tt=Vt.get(E),pt=Vt.get(q);kt.bindFramebuffer(D.READ_FRAMEBUFFER,no),kt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ws);for(let St=0;St<Gt;St++)gt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tt.__webglTexture,Y,Yt+St):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Tt.__webglTexture,Y),Et?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.__webglTexture,xt,Be+St):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pt.__webglTexture,xt),Y!==0?D.blitFramebuffer(te,Kt,Ft,Wt,re,Se,Ft,Wt,D.COLOR_BUFFER_BIT,D.NEAREST):Et?D.copyTexSubImage3D(Ne,xt,re,Se,Be+St,te,Kt,Ft,Wt):D.copyTexSubImage2D(Ne,xt,re,Se,te,Kt,Ft,Wt);kt.bindFramebuffer(D.READ_FRAMEBUFFER,null),kt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Et?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Ne,xt,re,Se,Be,Ft,Wt,Gt,me,$t,De.data):q.isCompressedArrayTexture?D.compressedTexSubImage3D(Ne,xt,re,Se,Be,Ft,Wt,Gt,me,De.data):D.texSubImage3D(Ne,xt,re,Se,Be,Ft,Wt,Gt,me,$t,De):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,xt,re,Se,Ft,Wt,me,$t,De.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,xt,re,Se,De.width,De.height,me,De.data):D.texSubImage2D(D.TEXTURE_2D,xt,re,Se,Ft,Wt,me,$t,De);D.pixelStorei(D.UNPACK_ROW_LENGTH,le),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,hn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,W),D.pixelStorei(D.UNPACK_SKIP_ROWS,J),D.pixelStorei(D.UNPACK_SKIP_IMAGES,yt),xt===0&&q.generateMipmaps&&D.generateMipmap(Ne),kt.unbindTexture()},this.initRenderTarget=function(E){Vt.get(E).__webglFramebuffer===void 0&&Xt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Xt.setTextureCube(E,0):E.isData3DTexture?Xt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Xt.setTexture2DArray(E,0):Xt.setTexture2D(E,0),kt.unbindTexture()},this.resetState=function(){T=0,C=0,U=null,kt.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ge._getDrawingBufferColorSpace(t),e.unpackColorSpace=ge._getUnpackColorSpace()}}});var lm={};Vm(lm,{RoomEnvironment:()=>sf});function $r(i){return new ui({color:0,emissive:16777215,emissiveIntensity:i})}var sf,hm=Vl(()=>{si();sf=class extends ei{constructor(){super();let t=new Ji;t.deleteAttribute("uv");let e=new pn({side:cn}),n=new pn,s=new Cs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ee(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new vs(t,n,6),a=new Ce;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new ee(t,$r(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new ee(t,$r(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new ee(t,$r(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new ee(t,$r(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new ee(t,$r(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let d=new ee(t,$r(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}}});function Cf(i){return String(i??"").normalize("NFKC").toLowerCase().replace(/\s+/g,"")}function Gm(i,t){let e=[Array.from({length:t.length+1},(n,s)=>s)];for(let n=1;n<=i.length;n++){let s=[n];e.push(s);for(let r=1;r<=t.length;r++)s[r]=Math.min(e[n-1][r]+1,s[r-1]+1,e[n-1][r-1]+ +(i[n-1]!==t[r-1])),n>1&&r>1&&i[n-1]===t[r-2]&&i[n-2]===t[r-1]&&(s[r]=Math.min(s[r],e[n-2][r-2]+1))}return e[i.length][t.length]}function If(i,t,e,n=5){let s=Cf(i);if(s.length<2)return[];let r=/^b?\d+$/.test(s);if(r&&s.length<3)return[];let o=s.normalize("NFD"),a=r||o.length<6?1:o.length<12?2:3;return t.flatMap(l=>{let c=1/0;for(let h of e(l)){let u=Cf(h);if(!(!u||r!==/^b?\d+$/.test(u)))for(let f=Math.max(2,s.length-1);f<=s.length+1;f++){if(f>u.length||r&&f!==u.length)continue;let d=u.slice(0,f).normalize("NFD");if(Math.abs(d.length-o.length)>a)continue;let g=Gm(o,d);g<=a&&(c=Math.min(c,g*10+(u.length-f)*.1))}}return Number.isFinite(c)?[{item:l,score:c}]:[]}).sort((l,c)=>l.score-c.score).slice(0,n).map(({item:l})=>l)}var Mi=3,Wm=4,Xm=4,qm=2e3,Ym=3,$m=40,Zm=3,Km=/^(\dC|\dS|\dW|\dE|\dK)-/,jm={toilet:["\uD654\uC7A5\uC2E4","toilet","wc"],elev:["\uC5D8\uB9AC\uBCA0\uC774\uD130","\uC2B9\uAC15\uAE30","elevator","ev"],prof:["\uAD50\uC218","\uAD50\uC218\uC2E4","\uAD50\uC218\uC5F0\uAD6C\uC2E4","\uC5F0\uAD6C\uC2E4"],lab:["\uC2E4\uC2B5\uC2E4","lab"],office:["\uC0AC\uBB34\uC2E4","\uD559\uACFC","\uACFC\uC0AC"],studio:["\uC2A4\uD29C\uB514\uC624"],server:["\uC11C\uBC84"],prep:["\uC900\uBE44\uC2E4"],store:["\uCC3D\uACE0"],room:["\uAC15\uC758\uC2E4","\uAD50\uC2E4"]},Jm={toilet:"\uD654\uC7A5\uC2E4",elev:"\uC5D8\uB9AC\uBCA0\uC774\uD130",prof:"\uAD50\uC218\uC5F0\uAD6C\uC2E4",lab:"\uC2E4\uC2B5\uC2E4",office:"\uC0AC\uBB34\uC2E4",studio:"\uC2A4\uD29C\uB514\uC624",server:"\uC11C\uBC84\uC2E4",prep:"\uC900\uBE44\uC2E4",store:"\uCC3D\uACE0",room:"\uAC15\uC758\uC2E4"};function $e(i){return i===0?"B1":`${i}F`}function Ze(i){return i===0?"\uC9C0\uD558 1\uCE35":`${i}\uCE35`}function Qm(i){return typeof atob=="function"?Uint8Array.from(atob(i),t=>t.charCodeAt(0)):new Uint8Array(Buffer.from(i,"base64"))}function tg(i){let t={};for(let e of i.floors)t[e.n]=Qm(e.grid);return(e,n,s)=>{let r=Math.floor((n-i.gx0)/i.cell),o=Math.floor((i.gy1-s)/i.cell);if(!t[e]||r<0||o<0||r>=i.gw||o>=i.gh)return!1;let a=o*i.gw+r;return(t[e][a>>3]>>7-(a&7)&1)===1}}function Gl(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++)i[s][1]>e!=i[r][1]>e&&t<(i[r][0]-i[s][0])*(e-i[s][1])/(i[r][1]-i[s][1])+i[s][0]&&(n=!n);return n}var Gi=i=>String(i||"").toLowerCase().replace(/\s+/g,"").replace(/호$/,"");function Pf(i){let t=i.floors.map(A=>A.n),e=A=>i.floors.find(O=>O.n===A),n=tg(i);function s(A,O,X,ot=18){if(n(A,O,X))return[O,X];for(let ut=i.cell;ut<ot;ut+=i.cell)for(let wt=0;wt<Math.PI*2;wt+=Math.max(.05,i.cell/ut)){let _t=O+ut*Math.cos(wt),Ct=X+ut*Math.sin(wt);if(n(A,_t,Ct))return[_t,Ct]}return null}function r(A,O,X){let ot=e(A);return ot&&ot.rooms.find(ut=>Gl(ut.poly,O,X))||null}let o=i.ramps.map(A=>{let O=0,X=[0];for(let ot=1;ot<A.pts.length;ot++)O+=Math.hypot(A.pts[ot][0]-A.pts[ot-1][0],A.pts[ot][1]-A.pts[ot-1][1]),X.push(O);return{...A,cum:X,T:O}}),a=Math.floor(i.gw/Mi),l=Math.floor(i.gh/Mi),c=a*l,h=A=>[i.gx0+(A%a*Mi+Mi/2)*i.cell,i.gy1-(Math.floor(A/a)*Mi+Mi/2)*i.cell],u={},f={},d={},g=[1,1.7,1.2,1];for(let A of t){let O=new Uint8Array(c),X=new Int16Array(c).fill(-1),ot=e(A).rooms;for(let _t=0;_t<c;_t++){let[Ct,et]=h(_t);if(O[_t]=n(A,Ct,et)?1:0,O[_t]){for(let L=0;L<ot.length;L++)if(!["stair","ostair","elev"].includes(ot[L].cat)&&Gl(ot[L].poly,Ct,et)){X[_t]=L;break}}}u[A]=O,f[A]=X;let ut=new Uint8Array(c).fill(255),wt=[];for(let _t=0;_t<c;_t++)O[_t]||(ut[_t]=0,wt.push(_t));for(let _t=0;_t<wt.length;_t++){let Ct=wt[_t],et=Ct%a,L=Ct/a|0;if(!(ut[Ct]>=3))for(let rt=-1;rt<=1;rt++)for(let Nt=-1;Nt<=1;Nt++){let Ut=et+Nt,Bt=L+rt;if(Ut<0||Bt<0||Ut>=a||Bt>=l)continue;let ye=Bt*a+Ut;ut[ye]>ut[Ct]+1&&(ut[ye]=ut[Ct]+1,wt.push(ye))}}d[A]=ut}function x(A,O,X){let ot=Math.floor((O-i.gx0)/i.cell/Mi),ut=Math.floor((i.gy1-X)/i.cell/Mi),wt=u[A];if(!wt)return-1;let _t=-1,Ct=1e9;for(let et=0;et<40&&_t<0;et++)for(let L=ut-et;L<=ut+et;L++)for(let rt=ot-et;rt<=ot+et;rt++){if(rt<0||L<0||rt>=a||L>=l||!wt[L*a+rt])continue;let Nt=(rt-ot)**2+(L-ut)**2;Nt<Ct&&(Ct=Nt,_t=L*a+rt)}return _t}let m=[];for(let A of o){let O=A.pts[0],X=A.pts[A.pts.length-1],ot=x(A.lo,O[0],O[1]),ut=x(A.lo+1,X[0],X[1]);ot>=0&&ut>=0&&e(A.lo+1)&&m.push({kind:"stair",id:A.id,fa:A.lo,fb:A.lo+1,ca:ot,cb:ut,cost:A.T+Xm,ramp:A})}function p(A,O){let X=null;for(let ot of e(A).rooms)if(ot.cat==="elev"){let ut=Math.hypot(ot.c[0]-O[0],ot.c[1]-O[1]);(!X||ut<X[0])&&(X=[ut,ot.c])}return X&&X[0]<5?X[1]:O}let S=[];for(let A of i.floors)for(let O of A.doors)O.cat==="elev"&&S.push({f:A.n,p:O.p,id:O.id});let y=[];for(let A of S){let O=y.find(X=>Math.hypot(X.p[0]-A.p[0],X.p[1]-A.p[1])<3&&!X.doors.some(ot=>ot.f===A.f));O||y.push(O={p:A.p,doors:[]}),O.doors.push(A)}y.forEach((A,O)=>{A.id=`EV${O+1}`,A.doors.sort((X,ot)=>X.f-ot.f);for(let X=0;X<A.doors.length;X++)for(let ot=X+1;ot<A.doors.length;ot++){let ut=A.doors[X],wt=A.doors[ot],_t=x(ut.f,ut.p[0],ut.p[1]),Ct=x(wt.f,wt.p[0],wt.p[1]);_t>=0&&Ct>=0&&m.push({kind:"elev",id:A.id,fa:ut.f,fb:wt.f,ca:_t,cb:Ct,cost:$m+Zm*(wt.f-ut.f),pa:ut.p,pb:wt.p,qa:p(ut.f,ut.p),qb:p(wt.f,wt.p)})}});let _=A=>t.indexOf(A);function w(A,O,X={}){let ot=X.mode||"stairs",ut=new Set(X.allowRooms||[]),wt=c*t.length,_t=x(A.f,A.x,A.y);if(_t<0)return null;let Ct=_(A.f)*c+_t,et=new Map;for(let B of O){let it=x(B.f,B.x,B.y);it>=0&&et.set(_(B.f)*c+it,B)}if(!et.size)return null;let L=new Float64Array(wt).fill(1/0),rt=new Int32Array(wt).fill(-1),Nt=new Int32Array(wt).fill(-1);L[Ct]=0;let Ut=new Map;m.forEach((B,it)=>{let Q=_(B.fa)*c+B.ca,At=_(B.fb)*c+B.cb;(Ut.get(Q)||Ut.set(Q,[]).get(Q)).push([At,it]),(Ut.get(At)||Ut.set(At,[]).get(At)).push([Q,it])});let Bt=[],ye=(B,it)=>{Bt.push([B,it]);let Q=Bt.length-1;for(;Q>0;){let At=Q-1>>1;if(Bt[At][0]<=Bt[Q][0])break;[Bt[At],Bt[Q]]=[Bt[Q],Bt[At]],Q=At}},D=()=>{let B=Bt[0],it=Bt.pop();if(Bt.length){Bt[0]=it;let Q=0;for(;;){let At=2*Q+1,vt=At+1,F=Q;if(At<Bt.length&&Bt[At][0]<Bt[F][0]&&(F=At),vt<Bt.length&&Bt[vt][0]<Bt[F][0]&&(F=vt),F===Q)break;[Bt[F],Bt[Q]]=[Bt[Q],Bt[F]],Q=F}}return B};ye(0,Ct);let Qt=Mi*i.cell,qt=-1;for(;Bt.length;){let[B,it]=D();if(B>L[it])continue;if(et.has(it)){qt=it;break}let Q=Math.floor(it/c),At=it-Q*c,vt=t[Q],F=u[vt],j=f[vt],k=At%a,lt=Math.floor(At/a);for(let ft=-1;ft<=1;ft++)for(let nt=-1;nt<=1;nt++){if(!nt&&!ft)continue;let It=k+nt,P=lt+ft;if(It<0||P<0||It>=a||P>=l)continue;let ht=P*a+It;if(!F[ht]||nt&&ft&&!(F[lt*a+It]&&F[P*a+k]))continue;let dt=j[ht],mt=(dt>=0&&!ut.has(e(vt).rooms[dt].id)?Wm:1)*g[Math.min(3,d[vt][ht])],tt=Q*c+ht,Z=B+Math.hypot(nt,ft)*Qt*mt;Z<L[tt]&&(L[tt]=Z,rt[tt]=it,Nt[tt]=-1,ye(Z,tt))}let ct=Ut.get(it);if(ct)for(let[ft,nt]of ct){let It=B+m[nt].cost+(ot==="elevator"&&m[nt].kind==="stair"?qm:0);It<L[ft]&&(L[ft]=It,rt[ft]=it,Nt[ft]=nt,ye(It,ft))}}if(qt<0)return null;let Ht=[];for(let B=qt;B>=0;B=rt[B])Ht.push(B);Ht.reverse();let kt=[],ue=null;for(let B=0;B<Ht.length;B++){let it=Ht[B],Q=t[Math.floor(it/c)],[At,vt]=h(it%c);if(Nt[it]>=0){let F=m[Nt[it]],j=Q>t[Math.floor(Ht[B-1]/c)];kt.push({kind:F.kind,id:F.id,from:j?F.fa:F.fb,to:Q,link:F,up:j}),ue=null}ue||(ue={kind:"walk",f:Q,pts:[]},kt.push(ue)),ue.pts.push([At,vt])}let Vt=et.get(qt),Xt=kt.filter(B=>B.kind==="walk");Xt[0].pts[0]=[A.x,A.y],Xt[Xt.length-1].pts.push([Vt.x,Vt.y]);for(let B of Xt)B.pts=C(B.f,B.pts);let se=[];for(let B of kt){if(B.i0=se.length,B.kind==="walk"){let it=e(B.f).z;for(let[Q,At]of B.pts)se.push({x:Q,y:At,z:it,f:B.f,kind:"walk"})}else if(B.kind==="stair"){let it=B.link.ramp,Q=e(it.lo).z,At=B.up?it.pts:[...it.pts].reverse();for(let vt of At)se.push({x:vt[0],y:vt[1],z:Q+vt[2]*i.FH,f:it.lo+(vt[2]>.5?1:0),kind:"stair"})}else{let it=B.link,Q=B.up?it.pa:it.pb,At=B.up?it.pb:it.pa;se.push({x:Q[0],y:Q[1],z:e(B.from).z,f:B.from,kind:"elev"}),se.push({x:At[0],y:At[1],z:e(B.to).z,f:B.to,kind:"elev"})}B.i1=se.length-1}let R=0;for(let B=1;B<se.length;B++)se[B].kind==="elev"&&se[B-1].kind==="elev"||(R+=Math.hypot(se[B].x-se[B-1].x,se[B].y-se[B-1].y));let v=kt.filter(B=>B.kind!=="walk"),V=v.filter(B=>B.kind==="stair").reduce((B,it)=>B+Math.abs(it.to-it.from),0);return{pts:se,legs:kt,len:R,cost:L[qt],target:Vt,vertical:v,mode:ot,stairFloors:V}}function T(A,O,X){let ot=Math.hypot(X[0]-O[0],X[1]-O[1]);if(ot<1e-6)return!0;let ut=Math.ceil(ot/.1),wt=-(X[1]-O[1])/ot*.25,_t=(X[0]-O[0])/ot*.25;for(let Ct=1;Ct<ut;Ct++){let et=Ct/ut,L=O[0]+(X[0]-O[0])*et,rt=O[1]+(X[1]-O[1])*et;if(!n(A,L,rt)||!n(A,L+wt,rt+_t)||!n(A,L-wt,rt-_t))return!1}return!0}function C(A,O){if(O.length<3)return O;let X=[O[0]],ot=0;for(;ot<O.length-1;){let ut=O.length-1;for(;ut>ot+1&&!T(A,O[ot],O[ut]);)ut--;X.push(O[ut]),ot=ut}return U(A,X,.35)}function U(A,O,X){if(O.length<3)return O;let ot=O[0],ut=O[O.length-1],wt=-1,_t=0,Ct=Math.hypot(ut[0]-ot[0],ut[1]-ot[1])||1e-9;for(let rt=1;rt<O.length-1;rt++){let Nt=Math.abs((ut[0]-ot[0])*(ot[1]-O[rt][1])-(ot[0]-O[rt][0])*(ut[1]-ot[1]))/Ct;Nt>_t&&(_t=Nt,wt=rt)}if(_t<=X&&T(A,ot,ut))return[ot,ut];if(wt<0)return O;let et=U(A,O.slice(0,wt+1),X),L=U(A,O.slice(wt),X);return[...et.slice(0,-1),...L]}let b=i.names||{},M=new Map;for(let A of i.floors){let O=(X,ot,ut,wt,_t)=>{if(ut==="stair"||ut==="ostair"||Km.test(X))return;let Ct=`${A.n}:${X}`,et=M.get(Ct);if(!et){let L=/^[0-9B]/.test(X),rt=X[0]==="B"?0:+X[0],Ut=(b[X]&&A.n===rt?b[X]:"")||(ot!==X&&ot!=="\uC2E4"?ot:"");et={key:Ct,id:X,f:A.n,cat:ut,numbered:L,title:L?`${X}\uD638`:ot,name:L?Ut:"",catLabel:Jm[ut]||"",doors:[],center:null},et.search=[X,et.title,Ut,...jm[ut]||[]].map(Gi).join("|"),M.set(Ct,et)}_t?et.doors.push(wt):et.center=wt};for(let X of A.doors)O(X.id,X.name,X.cat,X.p,!0);for(let X of A.rooms)O(X.id,X.name,X.cat,X.c,!1)}let N=[...M.values()].map(A=>({...A,doors:A.doors.length?A.doors:[A.center]}));for(let A of N){if(A.numbered)continue;if(N.filter(X=>X.f===A.f&&X.title===A.title).length>1){let X=A.doors[0];A.name=X[0]<0?"\uC11C\uCABD":"\uB3D9\uCABD"}}N.sort((A,O)=>A.f-O.f||Number(O.numbered)-Number(A.numbered)||A.id.localeCompare(O.id,"ko",{numeric:!0}));function H(A,O=30){let X=Gi(A);if(!X)return[];let ot=[];for(let ut of N){let wt=Gi(ut.id),_t=0;wt===X?_t=100:wt.startsWith(X)?_t=80-(wt.length-X.length):Gi(ut.title)===X?_t=70:Gi(ut.name).includes(X)?_t=60:ut.search.includes(X)&&(_t=40),_t&&ot.push([_t,ut])}return ot.sort((ut,wt)=>wt[0]-ut[0]||ut[1].f-wt[1].f),ot.slice(0,O).map(ut=>ut[1])}function z(A,O=5){return If(Gi(A),N,X=>X.search.split("|"),O)}let K=A=>N.find(O=>O.key===A)||N.find(O=>Gi(O.id)===Gi(A))||null,st=.7;function $(A,O,X){let ot=e(A).rooms.filter(_t=>_t.id===X).map(_t=>_t.poly);if(!ot.length)return null;let ut=null;for(let _t of ot)for(let Ct=1;Ct<_t.length;Ct++){let et=_t[Ct-1],L=_t[Ct],rt=L[0]-et[0],Nt=L[1]-et[1],Ut=rt*rt+Nt*Nt;if(Ut<1e-6)continue;let Bt=Math.max(0,Math.min(1,((O[0]-et[0])*rt+(O[1]-et[1])*Nt)/Ut)),ye=Math.hypot(et[0]+Bt*rt-O[0],et[1]+Bt*Nt-O[1]);if(!ut||ye<ut[0]){let D=Math.sqrt(Ut);ut=[ye,-Nt/D,rt/D]}}if(!ut||ut[0]>1)return null;let wt=(_t,Ct)=>ot.some(et=>Gl(et,_t,Ct));for(let _t of[1,-1]){let Ct=ut[1]*_t,et=ut[2]*_t;if(!wt(O[0]+Ct*.3,O[1]+et*.3))for(let L of[st,.55,.9,1.1,.4]){let rt=O[0]+Ct*L,Nt=O[1]+et*L;if(n(A,rt,Nt)&&!wt(rt,Nt))return[rt,Nt]}}return null}function Mt(A,O,X={}){let ot=O.doors.map(_t=>{let Ct=$(O.f,_t,O.id)||s(O.f,_t[0],_t[1],6)||_t;return{f:O.f,x:Ct[0],y:Ct[1],door:_t}}).filter(Boolean),ut={...X,allowRooms:[O.id]},wt=w(A,ot,ut);if(wt&&(X.mode||"stairs")==="stairs"&&wt.stairFloors>=Ym){let _t=w(A,ot,{...ut,mode:"elevator"});if(_t&&_t.stairFloors<wt.stairFloors)return{..._t,mode:"stairs",preferElev:!0}}return wt}return{M:i,floors:t,FL:e,walk:n,nearest:s,roomAt:r,ramps:o,shafts:y,links:m,route:w,routeTo:Mt,destinations:N,search:H,suggest:z,findDest:K}}var eg=35,Wl=3,ng=3,ig=180/Math.PI,cs=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*ig;function Ys(i,t){let e=t-i;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e}function xa(i){let t=Math.abs(i),e=i>0?"left":"right",n=i>0?"\uC67C\uCABD":"\uC624\uB978\uCABD";return t<eg?{dir:"straight",word:"\uC9C1\uC9C4",side:""}:t>145?{dir:`u-${e}`,word:"\uB4A4\uB85C \uB3CC\uC544",side:"\uB4A4"}:t<60?{dir:`slight-${e}`,word:`${n} \uBC29\uD5A5\uC73C\uB85C`,side:n}:{dir:e,word:`${n}\uC73C\uB85C`,side:n}}var Xl=i=>`${Math.max(1,Math.round(i))}m`;function $s(i,t,e={}){let n=Wi(i),s=i.pts,r=n[n.length-1],o=y=>{let _=Ye(i,n,Math.max(0,Math.min(r,y)));return[_.x,_.y]},a=(e.landmarks||[]).filter(y=>!t||y.key!==t.key);function l(y,_,w=3.5){let T=null;for(let C of a)if(!(C.f!==y||C.cat==="store"))for(let U of C.doors){let b=Math.hypot(U[0]-_[0],U[1]-_[1]),M=b-(C.numbered?.5:0);b<w&&(!T||M<T[0])&&(T=[M,C])}return T&&T[1]}let c=y=>[n[y.i0],n[y.i1]];function h(y,_){let w=o(Math.max(_,y-Wl)),T=o(y);return Math.hypot(T[0]-w[0],T[1]-w[1])>.2?cs(w,T):null}function u(y,_){let w=o(y),T=o(Math.min(_,y+Wl));return Math.hypot(T[0]-w[0],T[1]-w[1])>.2?cs(w,T):null}function f(y){if(y.kind==="stair"){let b=y.link.ramp.pts,M=y.up?b:[...b].reverse();return{inH:cs(M[0],M[1]),outH:cs(M[M.length-2],M[M.length-1]),p0:M[0]}}let _=y.link,w=y.up?_.pa:_.pb,T=y.up?_.qa:_.qb,C=y.up?_.pb:_.pa,U=y.up?_.qb:_.qa;return{inH:cs(w,T),outH:cs(U,C),p0:w}}let d=[],g=i.legs,x=null,m=null;g.forEach((y,_)=>{if(y.kind!=="walk"){let b=f(y),M=g[_-1],N="";if(M&&M.kind==="walk"){let[z,K]=c(M),st=h(K,z);st!=null&&(N=xa(Ys(st,b.inH)).side)}let H=y.to>y.from;d.push({kind:y.kind,dir:y.kind==="elev"?"elev":H?"stair-up":"stair-down",f:y.from,to:y.to,at:b.p0,s:n[y.i0],side:N,id:y.id}),x=b.outH,m=y.kind;return}let[w,T]=c(y),C=[];for(let b=y.i0+1;b<y.i1;b++){let M=n[b],N=h(M,w),H=u(M,T);N==null||H==null||C.push({s:M,d:Ys(N,H)})}let U=[];for(let b of C){let M=U[U.length-1];M&&b.s-M.s1<ng?(M.s1=b.s,M.d=Ys(h(M.s0,w)??0,u(b.s,T)??0)):U.push({s0:b.s,s1:b.s,d:b.d})}if(_===0)d.push({kind:"start",dir:"start",f:y.f,at:o(w),s:w});else if(x!=null){let b=u(w,T),M=xa(b==null?0:Ys(x,b));d.push({kind:"walk",dir:M.dir,exit:m,word:M.word,f:y.f,at:o(w),s:w,h0:x,hOut:b})}for(let b of U){let M=xa(b.d);if(M.dir==="straight")continue;let N=(b.s0+b.s1)/2;d.push({kind:"walk",dir:M.dir,word:M.word,f:y.f,at:o(N),s:N,hOut:u(b.s1,T)})}});for(let y=d.length-1;y>=2;y--){let _=d[y-2],w=d[y-1],T=d[y];_.kind==="stair"&&T.kind==="stair"&&_.dir===T.dir&&_.id===T.id&&w.kind==="walk"&&T.s-w.s<5&&(_.to=T.to,d.splice(y-1,2),y--)}let p=s[s.length-1],S="";if(t){let y=h(r,Math.max(0,r-Wl)),_=i.target?.door||t.center;if(y!=null&&_&&Math.hypot(_[0]-p.x,_[1]-p.y)>.2){let w=Ys(y,cs([p.x,p.y],_));S=Math.abs(w)<35?"\uC815\uBA74":Math.abs(w)>145?"\uB4A4\uCABD":w>0?"\uC67C\uCABD":"\uC624\uB978\uCABD"}}d.push({kind:"arrive",dir:"arrive",f:p.f,at:[p.x,p.y],s:r,side:S});for(let y=d.length-2;y>=1;y--){let _=d[y],w=d[y+1],T=d[y-1],C=w.s-_.s;if(_.kind==="walk"&&!_.exit&&C<2.5&&w.kind!=="walk"&&w.kind!=="start")d.splice(y,1);else if(T.kind==="walk"&&T.exit&&_.kind==="walk"&&!_.exit&&_.s-T.s<4.5){let U=xa(_.hOut==null||T.h0==null?0:Ys(T.h0,_.hOut));Object.assign(_,{exit:T.exit,dir:U.dir,word:U.word,s:T.s,at:T.at}),d.splice(y-1,1)}}for(let y=0;y<d.length;y++){let _=d[y],w=d[y+1];_.dist=w?Math.max(0,w.s-_.s):0;let T=_.kind==="walk"&&!_.exit?l(_.f,_.at):null,C=w&&_.kind==="start"&&w.kind!=="arrive"?l(w.f,w.at,4):null;if(_.kind==="start")_.action="\uC9C1\uC9C4",_.text=`${C?`${C.title} \uCABD\uC73C\uB85C `:""}${Xl(_.dist)} \uC9C1\uC9C4`,_.sub="\uCD9C\uBC1C";else if(_.kind==="walk"){let U=_.exit?_.exit==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130\uC5D0\uC11C \uB0B4\uB824 ":"\uACC4\uB2E8\uC5D0\uC11C \uB098\uC640 ":T?`${T.title} \uC55E\uC5D0\uC11C `:"";_.action=_.word,_.text=_.dir==="straight"?`${U}${Xl(_.dist)} \uC9C1\uC9C4`:`${U}${_.word} ${Xl(_.dist)}`,_.sub=""}else if(_.kind==="stair"){let U=_.dir==="stair-up"?"\uC62C\uB77C\uAC00\uAE30":"\uB0B4\uB824\uAC00\uAE30";_.action=`\uACC4\uB2E8\uC73C\uB85C ${Ze(_.to)}`,_.text=`${_.side&&_.side!=="\uB4A4"?`${_.side}\uC5D0 \uC788\uB294 `:_.side==="\uB4A4"?"\uB4A4\uCABD ":""}\uACC4\uB2E8\uC73C\uB85C ${Ze(_.to)}\uAE4C\uC9C0 ${U}`,_.sub=`${Math.abs(_.to-_.f)}\uAC1C \uCE35 ${_.dir==="stair-up"?"\uC704":"\uC544\uB798"}`}else _.kind==="elev"?(_.action=`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C ${Ze(_.to)}`,_.text=`${_.side&&_.side!=="\uB4A4"?`${_.side} `:""}\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Ze(_.to)}\uC73C\uB85C`,_.sub=`${_.to===0?"B1":_.to}\uCE35 \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`):(_.action="\uB3C4\uCC29",_.text=`${t?t.title:"\uBAA9\uC801\uC9C0"} \uB3C4\uCC29${_.side?` \xB7 ${_.side}`:""}`,_.sub=t&&t.name?t.name:"")}return d}function Wi(i){let t=[0],e=i.pts;for(let n=1;n<e.length;n++){let s=e[n-1],r=e[n];t.push(t[n-1]+(s.kind==="elev"&&r.kind==="elev"?0:Math.hypot(r.x-s.x,r.y-s.y)))}return t}function ya(i,t,e,n=0){let s=i.pts,r={d:1/0};for(let a=0;a<s.length-1;a++){let l=s[a],c=s[a+1];if(l.kind==="elev"&&c.kind==="elev"||l.f!==e.f&&c.f!==e.f)continue;let h=c.x-l.x,u=c.y-l.y,f=h*h+u*u||1e-9,d=Math.max(0,Math.min(1,((e.x-l.x)*h+(e.y-l.y)*u)/f)),g=Math.hypot(e.x-l.x-h*d,e.y-l.y-u*d),x=t[a]+d*(t[a+1]-t[a]),m=g+(x<n-3?2:0);(m<r.score||r.d===1/0)&&(r={d:g,s:x,i:a,t:d,score:m})}if(r.d===1/0)return null;let o=t[t.length-1];return{off:r.d,s:r.s,seg:r.i,remain:Math.max(0,o-r.s),total:o}}function io(i,t,e,n){for(let s=1;s<i.length;s++)if(i[s].s>n+.8)return{step:i[s],index:s,dist:i[s].s-n};return{step:i[i.length-1],index:i.length-1,dist:0}}function ql(i,t){let e=0;for(let n=0;n<i.length;n++)i[n].s<=t+.8&&(e=n);return e}function Ye(i,t,e){let n=i.pts;for(let r=0;r<n.length-1;r++)if(t[r+1]>=e){let o=t[r+1]-t[r],a=o>0?(e-t[r])/o:1,l=n[r],c=n[r+1];return{x:l.x+(c.x-l.x)*a,y:l.y+(c.y-l.y)*a,z:l.z+(c.z-l.z)*a,f:a<.5?l.f:c.f,i:r}}return{...n[n.length-1],i:n.length-1}}function va(i){let t=i/1.2;return t<60?`${Math.max(10,Math.round(t/10)*10)}\uCD08`:`${Math.round(t/60)}\uBD84`}si();si();si();var Zp={type:"change"},wu={type:"start"},jp={type:"end"},Tl=new hi,Kp=new Mn,iM=Math.cos(70*ra.DEG2RAD),tn=new I,wn=2*Math.PI,Pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Tu=1e-6,wl=class extends Jo{constructor(t,e=null){super(t,e),this.state=Pe.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wn.ROTATE,MIDDLE:Wn.DOLLY,RIGHT:Wn.PAN},this.touches={ONE:Tn.ROTATE,TWO:Tn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new yn,this._lastTargetPosition=new I,this._quat=new yn().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Lr,this._sphericalDelta=new Lr,this._scale=1,this._panOffset=new I,this._rotateStart=new Rt,this._rotateEnd=new Rt,this._rotateDelta=new Rt,this._panStart=new Rt,this._panEnd=new Rt,this._panDelta=new Rt,this._dollyStart=new Rt,this._dollyEnd=new Rt,this._dollyDelta=new Rt,this._dollyDirection=new I,this._mouse=new Rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=rM.bind(this),this._onPointerDown=sM.bind(this),this._onPointerUp=oM.bind(this),this._onContextMenu=dM.bind(this),this._onMouseWheel=lM.bind(this),this._onKeyDown=hM.bind(this),this._onTouchStart=uM.bind(this),this._onTouchMove=fM.bind(this),this._onMouseDown=aM.bind(this),this._onMouseMove=cM.bind(this),this._interceptControlDown=pM.bind(this),this._interceptControlUp=mM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zp),this.update(),this.state=Pe.NONE}update(t=null){let e=this.object.position;tn.copy(e).sub(this.target),tn.applyQuaternion(this._quat),this._spherical.setFromVector3(tn),this.autoRotate&&this.state===Pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=wn:n>Math.PI&&(n-=wn),s<-Math.PI?s+=wn:s>Math.PI&&(s-=wn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(tn.setFromSpherical(this._spherical),tn.applyQuaternion(this._quatInverse),e.copy(this.target).add(tn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=tn.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=tn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Tl.origin.copy(this.object.position),Tl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Tl.direction))<iM?this.object.lookAt(this.target):(Kp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Tl.intersectPlane(Kp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Tu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Tu||this._lastTargetPosition.distanceToSquared(this.target)>Tu?(this.dispatchEvent(Zp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?wn/60*this.autoRotateSpeed*t:wn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){tn.setFromMatrixColumn(e,0),tn.multiplyScalar(-t),this._panOffset.add(tn)}_panUp(t,e){this.screenSpacePanning===!0?tn.setFromMatrixColumn(e,1):(tn.setFromMatrixColumn(e,0),tn.crossVectors(this.object.up,tn)),tn.multiplyScalar(t),this._panOffset.add(tn)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;tn.copy(s).sub(this.target);let r=tn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(wn*this._rotateDelta.x/e.clientHeight),this._rotateUp(wn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(wn*this._rotateDelta.x/e.clientHeight),this._rotateUp(wn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function sM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function rM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function oM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(jp),this.state=Pe.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function aM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Wn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Pe.DOLLY;break;case Wn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Pe.ROTATE}break;case Wn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Pe.PAN}break;default:this.state=Pe.NONE}this.state!==Pe.NONE&&this.dispatchEvent(wu)}function cM(i){switch(this.state){case Pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function lM(i){this.enabled===!1||this.enableZoom===!1||this.state!==Pe.NONE||(i.preventDefault(),this.dispatchEvent(wu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(jp))}function hM(i){this.enabled!==!1&&this._handleKeyDown(i)}function uM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Tn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Pe.TOUCH_ROTATE;break;case Tn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Pe.TOUCH_PAN;break;default:this.state=Pe.NONE}break;case 2:switch(this.touches.TWO){case Tn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Pe.TOUCH_DOLLY_PAN;break;case Tn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Pe.TOUCH_DOLLY_ROTATE;break;default:this.state=Pe.NONE}break;default:this.state=Pe.NONE}this.state!==Pe.NONE&&this.dispatchEvent(wu)}function fM(i){switch(this._trackPointer(i),this.state){case Pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Pe.NONE}}function dM(i){this.enabled!==!1&&i.preventDefault()}function pM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function mM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Al=class extends wl{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:Wn.PAN,MIDDLE:Wn.DOLLY,RIGHT:Wn.ROTATE},this.touches={ONE:Tn.PAN,TWO:Tn.DOLLY_ROTATE}}};si();si();function Qp(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Ie,c=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Jp(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);let g=Jp(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Jp(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Fe(o,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let x=h.getComponent(f,g);a.setComponent(f+u,g,x)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Au(i,t){if(t===Qh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Br||t===sa){let e=i.getIndex();if(e===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=e.count-2,s=[];if(t===Br)for(let o=1;o<=n;o++)s.push(e.getX(0)),s.push(e.getX(o)),s.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(e.getX(o)),s.push(e.getX(o+1)),s.push(e.getX(o+2))):(s.push(e.getX(o+2)),s.push(e.getX(o+1)),s.push(e.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}var Rl=class extends mi{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Nu(e)}),this.register(function(e){return new Uu(e)}),this.register(function(e){return new Wu(e)}),this.register(function(e){return new Xu(e)}),this.register(function(e){return new qu(e)}),this.register(function(e){return new Ou(e)}),this.register(function(e){return new Bu(e)}),this.register(function(e){return new ku(e)}),this.register(function(e){return new zu(e)}),this.register(function(e){return new Du(e)}),this.register(function(e){return new Hu(e)}),this.register(function(e){return new Fu(e)}),this.register(function(e){return new Gu(e)}),this.register(function(e){return new Vu(e)}),this.register(function(e){return new Pu(e)}),this.register(function(e){return new Yu(e)}),this.register(function(e){return new $u(e)})}load(t,e,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=Ui.extractUrlBase(t);o=Ui.resolveURL(c,this.path)}else o=Ui.extractUrlBase(t);this.manager.itemStart(t);let a=function(c){s?s(c):console.error(c),r.manager.itemError(t),r.manager.itemEnd(t)},l=new Pr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,function(c){try{r.parse(c,o,function(h){e(h),r.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r,o={},a={},l=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(l.decode(new Uint8Array(t,0,4))===sm){try{o[de.KHR_BINARY_GLTF]=new Zu(t)}catch(u){s&&s(u);return}r=JSON.parse(o[de.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new nf(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case de.KHR_MATERIALS_UNLIT:o[u]=new Lu;break;case de.KHR_DRACO_MESH_COMPRESSION:o[u]=new Ku(r,this.dracoLoader);break;case de.KHR_TEXTURE_TRANSFORM:o[u]=new ju;break;case de.KHR_MESH_QUANTIZATION:o[u]=new Ju;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}};function gM(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}var de={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Pu=class{constructor(t){this.parser=t,this.name=de.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){let r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){let e=this.parser,n="light:"+t,s=e.cache.get(n);if(s)return s;let r=e.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t],c,h=new Jt(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],an);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Is(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Cs(h),c.distance=u;break;case"spot":c=new Zo(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),xi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=e.createUniqueName(l.name||"light_"+t),s=Promise.resolve(c),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){let e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(e.cache,a,l)})}},Lu=class{constructor(){this.name=de.KHR_MATERIALS_UNLIT}getMaterialType(){return Ee}extendParams(t,e,n){let s=[];t.color=new Jt(1,1,1),t.opacity=1;let r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],an),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,ze))}return Promise.all(s)}},Du=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}},Nu=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Rt(a,a)}return Promise.all(r)}},Uu=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_DISPERSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Fu=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Ou=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_SHEEN}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];e.sheenColor=new Jt(0,0,0),e.sheenRoughness=0,e.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],an)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,ze)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Bu=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},ku=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_VOLUME}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return e.attenuationColor=new Jt().setRGB(a[0],a[1],a[2],an),Promise.all(r)}},zu=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_IOR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Hu=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_SPECULAR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return e.specularColor=new Jt().setRGB(a[0],a[1],a[2],an),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,ze)),Promise.all(r)}},Vu=class{constructor(t){this.parser=t,this.name=de.EXT_MATERIALS_BUMP}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}},Gu=class{constructor(t){this.parser=t,this.name=de.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Wu=class{constructor(t){this.parser=t,this.name=de.KHR_TEXTURE_BASISU}loadTexture(t){let e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}},Xu=class{constructor(t){this.parser=t,this.name=de.EXT_TEXTURE_WEBP}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(t,o.source,l)}},qu=class{constructor(t){this.parser=t,this.name=de.EXT_TEXTURE_AVIF}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(t,o.source,l)}},Yu=class{constructor(t){this.name=de.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){let e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},$u=class{constructor(t){this.name=de.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){let e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=e.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==qn.TRIANGLES&&c.mode!==qn.TRIANGLE_STRIP&&c.mode!==qn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],f=c[0].count,d=[];for(let g of u){let x=new ie,m=new I,p=new yn,S=new I(1,1,1),y=new vs(g.geometry,g.material,f);for(let _=0;_<f;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&S.fromBufferAttribute(l.SCALE,_),y.setMatrixAt(_,x.compose(m,p,S));for(let _ in l)if(_==="_COLOR_0"){let w=l[_];y.instanceColor=new ts(w.array,w.itemSize,w.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);Ce.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},sm="glTF",aa=12,tm={JSON:1313821514,BIN:5130562},Zu=class{constructor(t){this.name=de.KHR_BINARY_GLTF,this.content=null,this.body=null;let e=new DataView(t,0,aa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==sm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-aa,r=new DataView(t,aa),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===tm.JSON){let c=new Uint8Array(t,aa+o,a);this.content=n.decode(c)}else if(l===tm.BIN){let c=aa+o;this.body=t.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Ku=class{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=de.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){let n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let u=tf[h]||h.toLowerCase();a[u]=o[h]}for(let h in t.attributes){let u=tf[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[t.attributes[h]],d=Xr[f.componentType];c[u]=d.name,l[u]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let g in d.attributes){let x=d.attributes[g],m=l[g];m!==void 0&&(x.normalized=m)}u(d)},a,c,an,f)})})}},ju=class{constructor(){this.name=de.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}},Ju=class{constructor(){this.name=de.KHR_MESH_QUANTIZATION}},Cl=class extends Pi{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-e,u=(n-e)/h,f=u*u,d=f*u,g=t*c,x=g-c,m=-2*d+3*f,p=d-f,S=1-m,y=p-f+u;for(let _=0;_!==a;_++){let w=o[x+_+a],T=o[x+_+l]*h,C=o[g+_+a],U=o[g+_]*h;r[_]=S*w+y*T+m*C+p*U}return r}},_M=new yn,Qu=class extends Cl{interpolate_(t,e,n,s){let r=super.interpolate_(t,e,n,s);return _M.fromArray(r).normalize().toArray(r),r}},qn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Xr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},em={9728:on,9729:xn,9984:Oc,9985:Dr,9986:Ds,9987:ni},nm={33071:ai,33648:gr,10497:zn},Ru={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},tf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},is={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xM={CUBICSPLINE:void 0,LINEAR:_s,STEP:gs},Cu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function yM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new pn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),i.DefaultMaterial}function ks(i,t,e){for(let n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function xi(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function vM(i,t,e){let n=!1,s=!1,r=!1;for(let c=0,h=t.length;c<h;c++){let u=t[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,h=t.length;c<h;c++){let u=t[c];if(n){let f=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],f=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function MM(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){let e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function SM(i){let t,e=i.extensions&&i.extensions[de.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Iu(e.attributes):t=i.indices+":"+Iu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+Iu(i.targets[n]);return t}function Iu(i){let t="",e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function ef(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function bM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var EM=new ie,nf=class{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new gM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Yo(this.options.manager):this.textureLoader=new Ko(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Pr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ks(r,a,s),xi(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){let t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){let o=e[s].joints;for(let a=0,l=o.length;a<l;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){let o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;let s=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())r(h,a.children[c])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){let e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){let s=t(e[n]);if(s)return s}return null}_invokeAll(t){let e=Object.values(this.plugins);e.unshift(this);let n=[];for(let s=0;s<e.length;s++){let r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){let n=t+":"+e,s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){let n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){let e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[de.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Ui.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){let e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){let s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){let e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){let o=Ru[s.type],a=Xr[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Fe(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=Ru[s.type],c=Xr[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(d&&d!==u){let p=Math.floor(f/d),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,y=e.cache.get(S);y||(x=new c(a,p*d,s.count*d/h),y=new ys(x,d/h),e.cache.add(S,y)),m=new Qi(y,l,f%d/h,g)}else a===null?x=new c(s.count*l):x=new c(a,f,s.count*l),m=new Fe(x,l,g);if(s.sparse!==void 0){let p=Ru.SCALAR,S=Xr[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,w=new S(o[1],y,s.sparse.count*p),T=new c(o[2],_,s.sparse.count*l);a!==null&&(m=new Fe(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,U=w.length;C<U;C++){let b=w[C];if(m.setX(b,T[C*l]),l>=2&&m.setY(b,T[C*l+1]),l>=3&&m.setZ(b,T[C*l+2]),l>=4&&m.setW(b,T[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){let e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){let s=this,r=this.json,o=r.textures[t],a=r.images[e],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=em[f.magFilter]||xn,h.minFilter=em[f.minFilter]||ni,h.wrapS=nm[f.wrapS]||zn,h.wrapT=nm[f.wrapT]||zn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==on&&h.minFilter!==xn,s.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(t,e){let n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());let o=s.images[t],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;let f=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(f,d){let g=f;e.isImageBitmapLoader===!0&&(g=function(x){let m=new je(x);m.needsUpdate=!0,f(m)}),e.load(Ui.resolveURL(u,r.path),g,void 0,d)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),xi(u,o),u.userData.mimeType=o.mimeType||bM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[de.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[de.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[de.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){let e=t.geometry,n=t.material,s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new wr,dn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(t.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new es,dn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}t.material=n}getMaterialType(){return pn}loadMaterial(t){let e=this,n=this.json,s=this.extensions,r=n.materials[t],o,a={},l=r.extensions||{},c=[];if(l[de.KHR_MATERIALS_UNLIT]){let u=s[de.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,e))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Jt(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],an),a.opacity=f[3]}u.baseColorTexture!==void 0&&c.push(e.assignTexture(a,"map",u.baseColorTexture,ze)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=Te);let h=r.alphaMode||Cu.OPAQUE;if(h===Cu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Cu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Ee&&(c.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Rt(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Ee&&(c.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Ee){let u=r.emissiveFactor;a.emissive=new Jt().setRGB(u[0],u[1],u[2],an)}return r.emissiveTexture!==void 0&&o!==Ee&&c.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,ze)),Promise.all(c).then(function(){let u=new o(a);return r.name&&(u.name=r.name),xi(u,r),e.associations.set(u,{materials:t}),r.extensions&&ks(s,u,r),u})}createUniqueName(t){let e=Ue.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){let e=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[de.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(l){return im(l,a,e)})}let o=[];for(let a=0,l=t.length;a<l;a++){let c=t[a],h=SM(c),u=s[h];if(u)o.push(u.promise);else{let f;c.extensions&&c.extensions[de.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=im(new Ie,c,e),s[h]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){let e=this,n=this.json,s=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?yM(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,g=h.length;d<g;d++){let x=h[d],m=o[d],p,S=c[d];if(m.mode===qn.TRIANGLES||m.mode===qn.TRIANGLE_STRIP||m.mode===qn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Ro(x,S):new ee(x,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===qn.TRIANGLE_STRIP?p.geometry=Au(p.geometry,sa):m.mode===qn.TRIANGLE_FAN&&(p.geometry=Au(p.geometry,Br));else if(m.mode===qn.LINES)p=new Ss(x,S);else if(m.mode===qn.LINE_STRIP)p=new Ms(x,S);else if(m.mode===qn.LINE_LOOP)p=new Po(x,S);else if(m.mode===qn.POINTS)p=new Lo(x,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&MM(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),xi(p,r),m.extensions&&ks(s,p,m),e.assignFinalMaterial(p),u.push(p)}for(let d=0,g=u.length;d<g;d++)e.associations.set(u[d],{meshes:t,primitives:d});if(u.length===1)return r.extensions&&ks(s,u[0],r),u[0];let f=new We;r.extensions&&ks(s,f,r),e.associations.set(f,{meshes:t});for(let d=0,g=u.length;d<g;d++)f.add(u[d]);return f})}loadCamera(t){let e,n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new He(ra.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new Ni(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),xi(e,n),Promise.resolve(e)}loadSkin(t){let e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let u=o[c];if(u){a.push(u);let f=new ie;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new Io(a,l)})}loadAnimation(t){let e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],l=[],c=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],g=s.samplers[d.sampler],x=d.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,S=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),c.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],g=u[2],x=u[3],m=u[4],p=[];for(let y=0,_=f.length;y<_;y++){let w=f[y],T=d[y],C=g[y],U=x[y],b=m[y];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let M=n._createAnimationTracks(w,T,C,U,b);if(M)for(let N=0;N<M.length;N++)p.push(M[N])}let S=new qo(r,void 0,p);return xi(S,s),S})}createNodeMesh(t){let e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(t){let e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let h=c[0],u=c[1],f=c[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,EM)});for(let d=0,g=u.length;d<g;d++)h.add(u[d]);return h})}_loadNodeShallow(t){let e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];let r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){a.push(c)}),this.nodeCache[t]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Er:c.length>1?h=new We:c.length===1?h=c[0]:h=new Ce,h!==c[0])for(let u=0,f=c.length;u<f;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),xi(h,r),r.extensions&&ks(n,h,r),r.matrix!==void 0){let u=new ie;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){let e=this.extensions,n=this.json.scenes[t],s=this,r=new We;n.name&&(r.name=s.createUniqueName(n.name)),xi(r,n),n.extensions&&ks(e,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);let c=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof dn||f instanceof je)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=c(r),r})}_createAnimationTracks(t,e,n,s,r){let o=[],a=t.name?t.name:t.uuid,l=[];is[r.path]===is.weights?t.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(is[r.path]){case is.weights:c=fi;break;case is.rotation:c=di;break;case is.translation:case is.scale:c=pi;break;default:switch(n.itemSize){case 1:c=fi;break;case 2:case 3:default:c=pi;break}break}let h=s.interpolation!==void 0?xM[s.interpolation]:_s,u=this._getArrayFromAccessor(n);for(let f=0,d=l.length;f<d;f++){let g=new c(l[f]+"."+is[r.path],e.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){let n=ef(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){let s=this instanceof di?Qu:Cl;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function TM(i,t,e){let n=t.attributes,s=new In;if(n.POSITION!==void 0){let a=e.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),a.normalized){let h=ef(Xr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=t.targets;if(r!==void 0){let a=new I,l=new I;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let f=e.json.accessors[u.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let x=ef(Xr[f.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Sn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function im(i,t,e){let n=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=tf[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(t.indices!==void 0&&!i.index){let o=e.getDependency("accessor",t.indices).then(function(a){i.setIndex(a)});s.push(o)}return ge.workingColorSpace!==an&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ge.workingColorSpace}" not supported.`),xi(i,t),TM(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?vM(i,t.targets,e):i})}si();var Yr=class extends Ce{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Rt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},qr=new I,rm=new ie,om=new ie,am=new I,cm=new I,Il=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(g,x){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),rm.copy(x.matrixWorldInverse),om.multiplyMatrices(x.projectionMatrix,rm),h(g,g,x),d(g)},this.setSize=function(g,x){n=g,s=x,r=n/2,o=s/2,l.style.width=g+"px",l.style.height=x+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let x=0,m=g.children.length;x<m;x++)c(g.children[x])}function h(g,x,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){qr.setFromMatrixPosition(g.matrixWorld),qr.applyMatrix4(om);let p=qr.z>=-1&&qr.z<=1&&g.layers.test(m.layers)===!0,S=g.element;S.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,x,m),S.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(qr.x*r+r)+"px,"+(-qr.y*o+o)+"px)",S.parentNode!==l&&l.appendChild(S),g.onAfterRender(e,x,m));let y={distanceToCameraSquared:u(m,g)};a.objects.set(g,y)}for(let p=0,S=g.children.length;p<S;p++)h(g.children[p],x,m)}function u(g,x){return am.setFromMatrixPosition(g.matrixWorld),cm.setFromMatrixPosition(x.matrixWorld),am.distanceToSquared(cm)}function f(g){let x=[];return g.traverseVisible(function(m){m.isCSS2DObject&&x.push(m)}),x}function d(g){let x=f(g).sort(function(p,S){if(p.renderOrder!==S.renderOrder)return S.renderOrder-p.renderOrder;let y=a.objects.get(p).distanceToCameraSquared,_=a.objects.get(S).distanceToCameraSquared;return y-_}),m=x.length;for(let p=0,S=x.length;p<S;p++)x[p].element.style.zIndex=m-p}}};si();function yi(i){let t=i>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function ki(i,t){let e=document.createElement("canvas");e.width=e.height=i;let n=e.getContext("2d");t(n,i);let s=new Ci(e);return s.wrapS=s.wrapT=zn,s.colorSpace=ze,s}var ln=(i,t=1)=>`rgba(${i},${i},${i},${t})`;function rf(i,t,e,n,s,r,o){i.fillStyle=ln(n),i.fillRect(0,0,t,t);for(let a=0;a<s;a++){let l=o[Math.floor(e()*o.length)];i.fillStyle=ln(l[0],l[1]);let c=r[0]+e()*(r[1]-r[0]);i.beginPath(),i.arc(e()*t,e()*t,c,0,Math.PI*2),i.fill()}}var wM={floor:(i=512)=>ki(i,t=>{let e=yi(11);rf(t,i,e,236,5200,[.5,1.6],[[150,.55],[120,.45],[255,.7],[196,.6],[170,.5]]);let n=i/2;for(let s=0;s<2;s++)for(let r=0;r<2;r++){let o=.92+e()*.08;t.fillStyle=ln(Math.round(255*o),.18),t.fillRect(s*n,r*n,n,n)}t.fillStyle=ln(150,.9);for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),inlay:(i=256)=>ki(i,t=>{let e=yi(23);rf(t,i,e,205,2600,[.5,1.4],[[90,.6],[255,.5],[140,.5]])}),wall:(i=256)=>ki(i,t=>{let e=yi(5);t.fillStyle=ln(248),t.fillRect(0,0,i,i);for(let n=0;n<160;n++)t.fillStyle=ln(e()<.5?232:255,.08),t.beginPath(),t.ellipse(e()*i,e()*i,6+e()*26,4+e()*14,e()*3,0,Math.PI*2),t.fill()}),ceiling:(i=256)=>ki(i,t=>{let e=yi(7);t.fillStyle=ln(250),t.fillRect(0,0,i,i),t.fillStyle=ln(200,.6);for(let s=0;s<1400;s++)t.fillRect(Math.floor(e()*i),Math.floor(e()*i),1,1);t.fillStyle=ln(190);let n=i/2;for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),door:(i=256)=>ki(i,t=>{let e=yi(13);t.fillStyle=ln(246),t.fillRect(0,0,i,i);for(let n=0;n<90;n++)t.fillStyle=ln(e()<.5?228:255,.25),t.fillRect(e()*i,0,1+e()*2,i)}),metal:(i=128)=>ki(i,t=>{let e=yi(17);t.fillStyle=ln(236),t.fillRect(0,0,i,i);for(let n=0;n<120;n++)t.fillStyle=ln(e()<.5?205:255,.35),t.fillRect(0,e()*i,i,1)}),wood:(i=256)=>ki(i,t=>{let e=yi(19);t.fillStyle=ln(232),t.fillRect(0,0,i,i);for(let n=0;n<70;n++){t.strokeStyle=ln(e()<.6?190:255,.35),t.lineWidth=1+e()*2,t.beginPath();let s=e()*i;t.moveTo(0,s);for(let r=0;r<=i;r+=16)t.lineTo(r,s+Math.sin(r/40+n)*3);t.stroke()}}),stone:(i=256)=>ki(i,t=>{let e=yi(29);rf(t,i,e,240,2600,[.5,1.5],[[160,.5],[120,.4],[255,.6]])}),elevDoor:()=>{let i=document.createElement("canvas");i.width=256,i.height=512;let t=i.getContext("2d"),e=yi(41),n=t.createLinearGradient(0,0,256,0);n.addColorStop(0,"#d2b06a"),n.addColorStop(.25,"#f0d699"),n.addColorStop(.5,"#e1c07c"),n.addColorStop(.75,"#f6dea4"),n.addColorStop(1,"#d2b06a"),t.fillStyle=n,t.fillRect(0,0,256,512);for(let r=0;r<260;r++)t.fillStyle=e()<.5?"rgba(255,240,200,0.10)":"rgba(90,60,20,0.08)",t.fillRect(e()*256,0,1,512);t.fillStyle="rgba(60,40,15,0.55)",t.fillRect(0,0,3,512),t.fillRect(253,0,3,512),t.fillStyle="#2a1d0c",t.fillRect(126,0,4,512),t.fillStyle="rgba(255,236,190,0.55)",t.fillRect(123,0,2,512),t.fillRect(131,0,2,512);let s=new Ci(i);return s.colorSpace=ze,s},plain:(i=128)=>ki(i,t=>{let e=yi(31);t.fillStyle=ln(246),t.fillRect(0,0,i,i);for(let n=0;n<500;n++)t.fillStyle=ln(e()<.5?230:255,.3),t.fillRect(e()*i,e()*i,1,1)})},um={floor:{tex:"floor",m:1.2,rough:.42},inlay:{tex:"inlay",m:.8,rough:.36},wall:{tex:"wall",m:2.4,rough:.82},ceiling:{tex:"ceiling",m:1.2,rough:.92},base:{tex:"plain",m:1,rough:.45},door:{tex:"door",m:1,rough:.5},metal:{tex:"metal",m:.6,rough:.38,metal:.55},wood:{tex:"wood",m:.8,rough:.55},stone:{tex:"stone",m:1.2,rough:.42},dark:{tex:"plain",m:1,rough:.15,metal:.2},light:{emissive:!0},elevDoor:{tex:"elevDoor",fit:!0,rough:.3,metal:.35},plain:{tex:"plain",m:1.5,rough:.7}};function AM(i,t,e,n,s){let r=(o,a,l)=>Math.abs(i-o)<4&&Math.abs(t-a)<4&&Math.abs(e-l)<4;return s==="C"?r(255,255,255)?"light":r(244,244,238)?"ceiling":"plain":r(216,210,198)||r(203,200,192)?n?"floor":"plain":r(168,171,168)?"inlay":r(236,228,205)?"wall":r(62,56,50)?"base":r(152,192,150)?"door":r(105,112,112)||r(170,174,178)?"metal":r(150,96,58)||r(150,110,80)?"wood":r(205,200,190)||r(244,244,238)?"stone":r(40,48,52)?"dark":"plain"}var of=null;function RM(i){var s;if(of)return of;let t=Math.min(4,i.capabilities.getMaxAnisotropy()),e={},n={};for(let[r,o]of Object.entries(um)){if(o.emissive){n[r]=new pn({color:16777215,emissive:16776176,emissiveIntensity:.9,side:Te});continue}let l=(e[s=o.tex]||(e[s]=wM[o.tex]())).clone();l.needsUpdate=!0,o.fit||l.repeat.set(1/o.m,1/o.m),l.anisotropy=t,n[r]=new pn({vertexColors:!o.fit,map:l,roughness:o.rough,metalness:o.metal||0,side:Te})}return of=n,n}function fm(i){return Promise.resolve().then(()=>(hm(),lm)).then(({RoomEnvironment:t})=>{let e=new Vr(i),n=e.fromScene(new t,.04).texture;return e.dispose(),n})}function af(i){let t=i.geometry.index?i.geometry.toNonIndexed():i.geometry;t.computeVertexNormals(),t!==i.geometry&&i.geometry.dispose(),i.geometry=t}var zs={hemi:1.15,sun:.55,env:.4,exposure:1.1,mapExposure:1.4};function dm(){return new pn({color:13624302,roughness:.05,metalness:.1,transparent:!0,opacity:.32,side:Te,depthWrite:!1,envMapIntensity:1.4})}function pm(i,t,e={},n={}){let s=n.elevDoors||[],r=RM(t),o=i.geometry.index?i.geometry.toNonIndexed():i.geometry,a=o.getAttribute("position"),l=o.getAttribute("color"),c=a.count/3,h=i.name[0],u=Object.keys(um),f=new Uint8Array(c),d=new I,g=new I,x=new I,m=new I,p=new I,S=u.map(()=>[]);for(let z=0;z<c;z++){d.fromBufferAttribute(a,3*z),g.fromBufferAttribute(a,3*z+1),x.fromBufferAttribute(a,3*z+2),m.subVectors(x,g).cross(p.subVectors(g,d)).normalize();let K=Math.abs(m.y)>.7,st=Math.round(l.getX(3*z)*255),$=Math.round(l.getY(3*z)*255),Mt=Math.round(l.getZ(3*z)*255),A=AM(st,$,Mt,K,h);if(A==="wood"&&!K&&s.length&&st===150&&$===110){let X=(d.x+g.x+x.x)/3,ot=-(d.z+g.z+x.z)/3;s.some(ut=>Math.hypot(ut[0]-X,ut[1]-ot)<1.6)&&(A="elevDoor")}let O=u.indexOf(A);f[z]=O,S[O].push(z)}let y=new Float32Array(a.count*3),_=new Float32Array(a.count*3),w=new Float32Array(a.count*3),T=new Float32Array(a.count*2),C=new Map,U=u.indexOf("elevDoor");for(let z of S[U]||[]){d.fromBufferAttribute(a,3*z);let K=d.x,st=-d.z,$=s.reduce((Mt,A,O)=>Math.hypot(A[0]-K,A[1]-st)<Math.hypot(s[Mt][0]-K,s[Mt][1]-st)?O:Mt,0);C.set(z,$)}let b=s.map(()=>({x0:1/0,x1:-1/0,z0:1/0,z1:-1/0,y0:1/0,y1:-1/0}));for(let[z,K]of C){let st=b[K];for(let $=0;$<3;$++)d.fromBufferAttribute(a,3*z+$),st.x0=Math.min(st.x0,d.x),st.x1=Math.max(st.x1,d.x),st.z0=Math.min(st.z0,d.z),st.z1=Math.max(st.z1,d.z),st.y0=Math.min(st.y0,d.y),st.y1=Math.max(st.y1,d.y)}for(let z of b){let K=z.x1-z.x0>=z.z1-z.z0;z.u0=K?z.x0:z.z0,z.u1=K?z.x1:z.z1,z.n=K?"z":"x"}let M=new Ie,N=[],H=0;for(let z=0;z<u.length;z++){if(!S[z].length)continue;let K=H;for(let $ of S[z]){d.fromBufferAttribute(a,3*$),g.fromBufferAttribute(a,3*$+1),x.fromBufferAttribute(a,3*$+2),m.subVectors(x,g).cross(p.subVectors(g,d)).normalize();let Mt=Math.abs(m.x),A=Math.abs(m.y),O=Math.abs(m.z);for(let X=0;X<3;X++){let ot=3*$+X,ut=a.getX(ot),wt=a.getY(ot),_t=a.getZ(ot);if(y.set([ut,wt,_t],H*3),_.set([l.getX(ot),l.getY(ot),l.getZ(ot)],H*3),z===U?w.set([-m.x,-m.y,-m.z],H*3):w.set([m.x,m.y,m.z],H*3),z===U&&C.has($)){let Ct=b[C.get($)],et=Ct.n==="x"?_t:ut;T.set([(et-Ct.u0)/Math.max(1e-6,Ct.u1-Ct.u0),(wt-Ct.y0)/Math.max(1e-6,Ct.y1-Ct.y0)],H*2)}else A>=Mt&&A>=O?T.set([ut,-_t],H*2):Mt>=O?T.set([-_t,wt],H*2):T.set([ut,wt],H*2);H++}}M.addGroup(K,H-K,N.length);let st=r[u[z]];N.push(Object.keys(e).length?Object.assign(st.clone(),e):st)}M.setAttribute("position",new Fe(y,3)),M.setAttribute("color",new Fe(_,3)),M.setAttribute("normal",new Fe(w,3)),M.setAttribute("uv",new Fe(T,2)),M.computeBoundingSphere(),M.computeBoundingBox(),i.geometry.dispose(),o!==i.geometry&&o.dispose(),i.geometry=M,i.material=N}var zi=7950591,mm=5451986,Nn=(i,t,e)=>new I(i,e,-t);function gm(i,t,{onPick:e}={}){let{M:n,FL:s}=t,r=Math.min(devicePixelRatio,2),o=Math.min(r,1.25),a=new Gr({antialias:devicePixelRatio<1.5,alpha:!1,powerPreference:"high-performance"});a.setPixelRatio(r);let l=r,c=-1e9;function h(F){F!==l&&(l=F,a.setPixelRatio(F),a.setSize(i.clientWidth,i.clientHeight,!1))}a.toneMapping=Nc,a.toneMappingExposure=zs.mapExposure,i.appendChild(a.domElement);let u=new Il;Object.assign(u.domElement.style,{position:"absolute",inset:"0",pointerEvents:"none"}),i.appendChild(u.domElement);let f=new ei;f.background=new Jt(15659254),f.add(new Rs(16777215,15130834,zs.hemi));let d=new Is(16777215,zs.sun);d.position.set(30,80,20),f.add(d);let g=new He(38,1,.5,2e3),x=new He(70,1,.08,600);x.rotation.order="YXZ";let m=new Al(g,a.domElement);m.enableDamping=!0,m.dampingFactor=.12,m.screenSpacePanning=!1,m.maxPolarAngle=1.1,m.minDistance=10,m.maxDistance=170,m.touches={ONE:Tn.PAN,TWO:Tn.DOLLY_ROTATE};let p=1,S=!1,y=!0,_={},w=[],T=new We;f.add(T);let C=R();C.visible=!1,f.add(C);function U(){let F=i.clientWidth,j=i.clientHeight;a.setSize(F,j),u.setSize(F,j);for(let k of[g,x])k.aspect=F/j,k.updateProjectionMatrix();y=!0}addEventListener("resize",U),U(),m.addEventListener("change",()=>y=!0);async function b(F,j){let k=await fetch(F);if(!k.ok)throw new Error(`\uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694 (${k.status})`);let lt=+k.headers.get("content-length")||0,ct;if(k.body&&lt){let nt=k.body.getReader(),It=[],P=0;for(;;){let{done:dt,value:mt}=await nt.read();if(dt)break;It.push(mt),P+=mt.length,j?.(P/lt)}ct=new Uint8Array(P);let ht=0;for(let dt of It)ct.set(dt,ht),ht+=dt.length;ct=ct.buffer}else ct=await k.arrayBuffer();let ft=await new Promise((nt,It)=>new Rl().parse(ct,"",nt,It));try{f.environment=await fm(a),f.environmentIntensity=zs.env}catch{}ft.scene.traverse(nt=>{nt.isMesh&&(nt.name[0]==="G"?(af(nt),nt.material=dm()):nt.name[0]==="X"?(af(nt),nt.material=new pn({vertexColors:!0,roughness:.9,side:Te})):pm(nt,a,nt.name[0]==="D"?{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}:{},{elevDoors:M(+nt.name.slice(1))}),_[nt.name]=nt)}),f.add(ft.scene),N(),X(p,!0)}function M(F){return(n.floors.find(k=>k.n===F)?.doors||[]).filter(k=>k.cat==="elev"||/^EV/.test(k.id)).map(k=>k.p)}function N(){for(let F of t.destinations){let j=F.center||F.doors[0],k=document.createElement("div"),lt=F.cat==="toilet"?"WC":F.cat==="elev"?"EV":F.numbered?F.id:F.title;k.className="room-label"+(F.numbered?"":" icon-only"),k.textContent=lt;let ct=new Yr(k);ct.position.copy(Nn(j[0],j[1],s(F.f).z+.6)),ct.userData={d:F},ct.visible=!1,f.add(ct),w.push(ct)}}let H=null;function z(){let F=g.position.distanceTo(m.target);for(let j of w){let k=j.userData.d,lt=k.key===H;if(j.element.classList.toggle("sel",lt),S){let ct=k.center||k.doors[0];j.visible=k.f===V.f&&Math.hypot(ct[0]-V.x,ct[1]-V.y)<12}else j.visible=k.f===p&&(lt||F<(k.numbered?130:200))}}function K(){for(let j in _){let k=j[0],lt=+j.slice(1);k==="X"?_[j].visible=S:S?_[j].visible=Math.abs(lt-V.f)<=1:_[j].visible=k!=="C"&&lt===p}let F=S?"walk":"map";for(let j of T.children)j.visible=j.userData.mode&&j.userData.mode!==F?!1:S?!j.isCSS2DObject||$(j):j.userData.f==null||j.userData.f===p;st(),y=!0}function st(){T.traverse(F=>{if(F.material)for(let j of Array.isArray(F.material)?F.material:[F.material])j.userData.depth0===void 0&&(j.userData.depth0=j.depthTest),j.depthTest=S||j.userData.depth0})}function $(F){if(F.userData.f!==V.f)return!1;let j=F.position.x,k=-F.position.z;return Mt(V.f,V.x,V.y,j,k)}function Mt(F,j,k,lt,ct){let ft=Math.hypot(lt-j,ct-k);if(ft>25)return!1;let nt=Math.max(1,Math.ceil(ft/.25)),It=0;for(let P=1;P<nt&&!(ft*(1-P/nt)<1);P++){let ht=P/nt;if(t.walk(F,j+(lt-j)*ht,k+(ct-k)*ht))It=0;else if(It+=ft/nt,It>.8)return!1}return!0}let A=null;function O(F,j,k=550){A={t0:performance.now(),dur:k,cam0:g.position.clone(),tgt0:m.target.clone(),cam1:F,tgt1:j},y=!0}m.addEventListener("start",()=>A=null);function X(F,j=!1,k=!1){let lt=s(p).z;p=F;let ct=s(F).z-lt;if(k&&ct&&!j){let ft=new I(0,ct,0);O((A?A.cam1:g.position).clone().add(ft),(A?A.tgt1:m.target).clone().add(ft),520)}else g.position.y+=ct,m.target.y+=ct,A&&(A.cam1.y+=ct,A.tgt1.y+=ct);j&&ot(),K(),z()}function ot(){let F=s(p).z,j=i.clientWidth<i.clientHeight,k=j?32:46,lt=j?46:32,ct=g.fov*Math.PI/360,ft=Math.atan(Math.tan(ct)*g.aspect),nt=Math.max(lt/Math.tan(ct),k/Math.tan(ft))*1.05+10,It=.5;m.target.copy(Nn(0,-1,F));let P=j?new I(-1,0,0):new I(0,0,1);g.position.copy(m.target).addScaledVector(P,Math.sin(It)*nt).add(new I(0,Math.cos(It)*nt,0)),m.maxDistance=Math.max(170,nt*1.4),m.update(),y=!0}function ut(F,j,k,lt,ct,ft=0,nt=70){ct!==p&&X(ct);let It=s(ct).z,P=i.clientHeight,ht=Math.max(.3,(P-ft-nt)/P),dt=g.fov*Math.PI/360,mt=Math.atan(Math.tan(dt)*g.aspect),tt=g.position.clone().sub(m.target).normalize(),Z=new I(-tt.x,0,-tt.z).normalize(),bt=new I(-Z.z,0,Z.x),Pt=0,ne=0;for(let[rn,nn]of[[F,j],[F,lt],[k,j],[k,lt]]){let Yn=Nn(rn,nn,0).sub(Nn((F+k)/2,(j+lt)/2,0));Pt=Math.max(Pt,Math.abs(Yn.dot(bt))),ne=Math.max(ne,Math.abs(Yn.dot(Z)))}Pt+=4,ne+=4;let Zt=Math.min(m.maxDistance,Math.max(18,Math.max(ne/Math.tan(dt*ht)/Math.max(.5,-tt.y),Pt/Math.tan(mt)))),pe=Nn((F+k)/2,(j+lt)/2,It),Le=(ft-nt)/P*Zt*Math.tan(dt)/Math.max(.5,-tt.y),An=pe.clone().addScaledVector(Z,-Le);O(An.clone().addScaledVector(tt,Zt),An)}function wt(F,j,k,lt=45){k!==p&&X(k);let ct=s(k).z,ft=g.position.clone().sub(m.target).setLength(lt),nt=Nn(F,j,ct);O(nt.clone().add(ft),nt)}let _t=null;a.domElement.addEventListener("pointerdown",F=>_t=[F.clientX,F.clientY,performance.now()]),a.domElement.addEventListener("pointerup",F=>{if(!_t||S||Math.hypot(F.clientX-_t[0],F.clientY-_t[1])>8||performance.now()-_t[2]>450)return;let k=a.domElement.getBoundingClientRect(),lt=new jo;lt.setFromCamera(new Rt((F.clientX-k.left)/k.width*2-1,-((F.clientY-k.top)/k.height)*2+1),g);let ct=lt.ray.intersectPlane(new Mn(new I(0,1,0),-s(p).z),new I);ct&&e?.(ct.x,-ct.z,p)});function Ct(F,j){let k=[];for(let ct=1;ct<F.length;ct++){let ft=F[ct-1],nt=F[ct],It=nt[0]-ft[0],P=nt[1]-ft[1],ht=Math.hypot(It,P);if(ht<.01)continue;let dt=-P/ht*j*.5,mt=It/ht*j*.5,tt=new Ie;tt.setAttribute("position",new _e([ft[0]+dt,ft[2],-(ft[1]+mt),ft[0]-dt,ft[2],-(ft[1]-mt),nt[0]+dt,nt[2],-(nt[1]+mt),nt[0]-dt,nt[2],-(nt[1]-mt)],3)),tt.setIndex([0,1,2,2,1,3]),k.push(tt)}for(let ct of F){let ft=new Gn(j*.5,14);ft.rotateX(-Math.PI/2),ft.translate(ct[0],ct[2],-ct[1]),k.push(ft)}let lt=k.map(ct=>ct.index?ct.toNonIndexed():ct);return lt.forEach(ct=>{for(let ft of Object.keys(ct.attributes))ft!=="position"&&ct.deleteAttribute(ft)}),Qp(lt)}function et(F,j=2.2){let k=new Ie,lt=[],ct=j/2;for(let ft=1;ft<F.length;ft++){let nt=F[ft-1],It=F[ft],P=Math.hypot(It[0]-nt[0],It[1]-nt[1]);if(P<.01)continue;let ht=(It[0]-nt[0])/P,dt=(It[1]-nt[1])/P;for(;ct<P;){let mt=ct/P,tt=nt[0]+(It[0]-nt[0])*mt,Z=nt[1]+(It[1]-nt[1])*mt,bt=nt[2]+(It[2]-nt[2])*mt+.02,Pt=.28,ne=[tt+ht*Pt,Z+dt*Pt],Zt=[tt-ht*Pt*.6-dt*Pt,Z-dt*Pt*.6+ht*Pt],pe=[tt-ht*Pt*.6+dt*Pt,Z-dt*Pt*.6-ht*Pt];lt.push(ne[0],bt,-ne[1],Zt[0],bt,-Zt[1],pe[0],bt,-pe[1]),ct+=j}ct-=P}return k.setAttribute("position",new _e(lt,3)),k}let L=new Ee({toneMapped:!1,color:zi,side:Te,polygonOffset:!0,polygonOffsetFactor:-2}),rt=new Ee({toneMapped:!1,color:zi,transparent:!0,opacity:.28,depthTest:!1,side:Te}),Nt=new Ee({toneMapped:!1,color:16777215,side:Te,depthTest:!1}),Ut=new Ee({toneMapped:!1,color:zi,side:Te,polygonOffset:!0,polygonOffsetFactor:-2}),Bt=new Ee({toneMapped:!1,color:zi,transparent:!0,opacity:.16,depthWrite:!1,side:Te,polygonOffset:!0,polygonOffsetFactor:-1}),ye=new Ee({toneMapped:!1,color:16777215,side:Te,polygonOffset:!0,polygonOffsetFactor:-3});function D(F,j=1.4,k=.13,lt=.035){let ct=[],ft=(P,ht,dt,mt,tt)=>{let Z=Math.hypot(dt-P,mt-ht)||1,bt=-(mt-ht)/Z*lt*.5,Pt=(dt-P)/Z*lt*.5,ne=[P+bt,tt,-(ht+Pt)],Zt=[P-bt,tt,-(ht-Pt)],pe=[dt+bt,tt,-(mt+Pt)],Le=[dt-bt,tt,-(mt-Pt)];ct.push(...ne,...Zt,...pe,...pe,...Zt,...Le)},nt=j/2;for(let P=1;P<F.length;P++){let ht=F[P-1],dt=F[P],mt=Math.hypot(dt[0]-ht[0],dt[1]-ht[1]);if(mt<.01)continue;let tt=(dt[0]-ht[0])/mt,Z=(dt[1]-ht[1])/mt;for(;nt<mt;){let bt=nt/mt,Pt=ht[0]+(dt[0]-ht[0])*bt,ne=ht[1]+(dt[1]-ht[1])*bt,Zt=ht[2]+(dt[2]-ht[2])*bt+.012,pe=Pt+tt*k*.5,Le=ne+Z*k*.5;for(let An of[1,-1])ft(Pt-tt*k*.5-Z*k*.75*An,ne-Z*k*.5+tt*k*.75*An,pe,Le,Zt);nt+=j}nt-=mt}let It=new Ie;return It.setAttribute("position",new _e(ct,3)),It}function Qt(){for(let F of[...T.children])T.remove(F),F.geometry?.dispose(),F.isCSS2DObject&&F.element.remove();y=!0}function qt(F,j,k=[]){Qt(),H=j?.key||null;let lt=[],ct=null;for(let tt of F.pts){if(tt.kind==="elev"){ct=null;continue}if(!ct||ct.f!==tt.f){let Z=ct&&ct.pts[ct.pts.length-1];ct={f:tt.f,pts:Z?[Z]:[]},lt.push(ct)}ct.pts.push([tt.x,tt.y,tt.z+.08])}for(let tt of lt){if(tt.pts.length<2)continue;for(let[Pt,ne]of[[rt,1],[L,2]]){let Zt=new ee(Ct(tt.pts,.9),Pt);Zt.renderOrder=ne,Zt.userData={f:tt.f,mode:"map"},T.add(Zt)}let Z=new ee(et(tt.pts),Nt);Z.renderOrder=3,Z.userData={f:tt.f,mode:"map"},T.add(Z);let bt=tt.pts.map(Pt=>[Pt[0],Pt[1],Pt[2]-.05]);for(let[Pt,ne,Zt]of[[Ct(bt,.5),Bt,1],[Ct(bt,.14),Ut,2],[D(bt),ye,3]]){let pe=new ee(Pt,ne);pe.renderOrder=Zt,pe.userData={f:tt.f,mode:"walk"},T.add(pe)}}let ft=F.pts[0],nt=F.pts[F.pts.length-1],It=Vt();It.position.copy(Nn(ft.x,ft.y,ft.z+.1)),It.userData={f:ft.f,mode:"map"},T.add(It);let P=se();P.position.copy(Nn(nt.x,nt.y,nt.z)),P.userData={f:nt.f,mode:"map"},T.add(P);let ht=Xt();ht.position.copy(Nn(ft.x,ft.y,ft.z+.04)),ht.userData={f:ft.f,mode:"walk"},T.add(ht);let dt=we();dt.position.copy(Nn(nt.x,nt.y,nt.z)),dt.userData={f:nt.f,mode:"walk"},T.add(dt);let mt=F.legs;for(let tt=0;tt<mt.length;tt++){let Z=mt[tt];if(Z.kind==="walk")continue;let bt=tt>=2&&mt[tt-2].kind===Z.kind&&mt[tt-2].id===Z.id&&mt[tt-1].pts.length<=3,Pt=tt+2<mt.length&&mt[tt+2].kind===Z.kind&&mt[tt+2].id===Z.id&&mt[tt+1].pts.length<=3,ne=Z;for(let nn=tt;nn+2<mt.length&&mt[nn+2].kind===Z.kind&&mt[nn+2].id===Z.id&&mt[nn+1].pts.length<=3;nn+=2)ne=mt[nn+2];let Zt=Z.to>Z.from,pe=Z.kind==="stair"?Z.link.ramp.pts[Zt?0:Z.link.ramp.pts.length-1]:Zt?Z.link.pa:Z.link.pb,Le=Z.kind==="stair"?Z.link.ramp.pts[Zt?Z.link.ramp.pts.length-1:0]:Zt?Z.link.pb:Z.link.pa,An=Z.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8",rn=[];bt||rn.push([pe,Z.from,`${An} ${Zt?"\u2191":"\u2193"} ${ne.to===0?"B1":ne.to+"\uCE35"}`]),Pt||rn.push([Le,Z.to,`${An}\uC5D0\uC11C \uB098\uC640\uC694`]);for(let[nn,Yn,vi]of rn){let Un=document.createElement("div");Un.className="route-tag",Un.textContent=vi;let Fn=new Yr(Un);Fn.position.copy(Nn(nn[0],nn[1],s(Yn).z+1.6)),Fn.userData.f=Yn,T.add(Fn)}}Ht=[],k.forEach((tt,Z)=>{if(tt.kind==="start"||tt.kind==="arrive"||!tt.at)return;let bt=document.createElement("div");bt.className="step-dot"+(tt.kind==="stair"||tt.kind==="elev"?" vertical":""),bt.textContent=Z;let Pt=new Yr(bt);Pt.position.copy(Nn(tt.at[0],tt.at[1],s(tt.f).z+.3)),Pt.userData.f=tt.f,Pt.userData.step=Z,T.add(Pt),Ht.push(Pt)}),K(),z()}let Ht=[];function kt(F){for(let j of Ht)j.element.classList.toggle("on",j.userData.step===F);y=!0}function ue(F){H=F?F.key:null,z(),y=!0}function Vt(){let F=new We,j=new ee(new Gn(.75,28),new Ee({toneMapped:!1,color:zi,depthTest:!1})),k=new ee(new Gn(.48,28),new Ee({toneMapped:!1,color:16777215,depthTest:!1}));return j.rotation.x=k.rotation.x=-Math.PI/2,k.position.y=.01,j.renderOrder=4,k.renderOrder=5,F.add(j,k),F}function Xt(){let F=new We,j=new ee(new ws(.2,.28,40),new Ee({toneMapped:!1,color:zi,side:Te})),k=new ee(new Gn(.1,24),new Ee({toneMapped:!1,color:zi,side:Te}));return j.rotation.x=k.rotation.x=-Math.PI/2,F.add(j,k),F}function we(){let F=new We,j=new Ee({toneMapped:!1,color:zi,side:Te}),k=new ee(new ws(.36,.44,48),j),lt=new ee(new ws(.2,.25,40),new Ee({toneMapped:!1,color:16777215,side:Te})),ct=new ee(new Gn(.36,48),new Ee({toneMapped:!1,color:zi,transparent:!0,opacity:.18,depthWrite:!1,side:Te}));for(let It of[k,lt,ct])It.rotation.x=-Math.PI/2,It.position.y=.04;let ft=new ee(new Ar(.012,.012,1.05,10),j);ft.position.y=.55;let nt=new ee(new Ii(.12,24,16),new ui({toneMapped:!1,color:mm,emissive:2758016}));return nt.position.y=1.15,F.add(ct,k,lt,ft,nt),F}function se(){let F=new We,j=new ui({toneMapped:!1,color:mm,emissive:2758016}),k=new ee(new Ii(.75,20,14),j);k.position.y=2.6;let lt=new ee(new bs(.55,1.9,20),j);lt.rotation.x=Math.PI,lt.position.y=1.5;let ct=new ee(new Ii(.28,14,10),new Ee({toneMapped:!1,color:16777215}));return ct.position.set(0,2.6,.55),F.add(k,lt,ct),F}function R(){let F=new We,j=new ee(new Gn(1.4,30),new Ee({toneMapped:!1,color:4033535,transparent:!0,opacity:.22,depthTest:!1})),k=new ee(new Gn(.55,24),new Ee({toneMapped:!1,color:4033535,depthTest:!1})),lt=new ee(new Gn(2.6,24,-.45,.9),new Ee({toneMapped:!1,color:4033535,transparent:!0,opacity:.3,depthTest:!1}));for(let ct of[j,k,lt])ct.rotation.x=-Math.PI/2,ct.renderOrder=6;return F.add(j,lt,k),F.userData.cone=lt,F}function v(F){C.visible=!!F&&F.f===p&&!S,F&&(C.position.copy(Nn(F.x,F.y,s(F.f).z+.12)),C.userData.cone.visible=F.yaw!=null,C.rotation.y=(F.yaw??90)*Math.PI/180),y=!0}let V={x:0,y:0,z:0,f:1,yaw:0,pitch:-.12};function B(F){S=F,m.enabled=!F,a.toneMappingExposure=F?zs.exposure:zs.mapExposure,K(),z()}let it=null;function Q(F){Object.assign(V,F),V.f!==it&&(it=V.f,K())}let At=0,vt="";return(function F(j){if(requestAnimationFrame(F),S){let lt=`${V.x.toFixed(3)},${V.y.toFixed(3)},${V.z.toFixed(3)},${V.yaw.toFixed(2)},${V.pitch.toFixed(3)}`,ct=lt!==vt;if(ct?(vt=lt,c=j,h(o)):l!==r&&j-c>250&&(h(r),y=!0),!ct&&!y)return;y=!1,x.position.set(V.x,V.z+1.6,-V.y),x.rotation.set(V.pitch,(V.yaw-90)*Math.PI/180,0),a.render(f,x),j-At>120&&(z(),At=j),u.render(f,x);return}if(A){let lt=Math.min(1,(j-A.t0)/A.dur),ct=lt<.5?2*lt*lt:1-(-2*lt+2)**2/2;g.position.lerpVectors(A.cam0,A.cam1,ct),m.target.lerpVectors(A.tgt0,A.tgt1,ct),lt>=1&&(A=null),y=!0}m.update()||!!A?(y=!0,c=j,h(o)):l!==r&&j-c>250&&(h(r),y=!0),y&&(y=!1,j-At>120&&(z(),At=j),a.render(f,g),u.render(f,g))})(performance.now()),{load:b,setFloor:X,get floor(){return p},frame:ot,fit:ut,focus:wt,showRoute:qt,highlightStep:kt,clearRoute:Qt,select:ue,setMe:v,setFirstPerson:B,setWalkPose:Q,nodes:_,redraw:()=>y=!0}}si();var cf=Math.PI/180;function CM(){let i=[];for(let t=0;t<20;t++)for(let e=0;e<18;e++)i.push([(-18+2/2+e*2)*cf,(12-2/2-t*2)*cf]);return i}var _m=CM();function Zr(i){return Math.atan2(i[5],i[2])}function lf(i,t,e){let n=Zr(e),s=new Float32Array(360),{data:r,w:o,h:a}=i;for(let l=0;l<_m.length;l++){let[c,h]=_m[l],u=n-c,f=Math.cos(h),d=f*Math.cos(u),g=f*Math.sin(u),x=Math.sin(h),m=e[0]*d+e[3]*g+e[6]*x,p=e[1]*d+e[4]*g+e[7]*x,S=e[2]*d+e[5]*g+e[8]*x;if(S<=.05){s[l]=NaN;continue}let y=t.fx*m/S+t.cx,_=t.fy*p/S+t.cy;if(y<1||_<1||y>o-2||_>a-2){s[l]=NaN;continue}let w=Math.floor(y),T=Math.floor(_),C=y-w,U=_-T,b=T*o+w;s[l]=r[b]*(1-C)*(1-U)+r[b+1]*C*(1-U)+r[b+o]*(1-C)*U+r[b+o+1]*C*U}return s}function hf(i,t,e,n){let s=Math.max(1,Math.ceil(n*2.5)),r=[],o=0;for(let c=-s;c<=s;c++){let h=Math.exp(-(c*c)/(2*n*n));r.push(h),o+=h}for(let c=0;c<r.length;c++)r[c]/=o;let a=new Float32Array(t*e),l=new Float32Array(t*e);for(let c=0;c<e;c++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=i[c*t+Math.min(t-1,Math.max(0,h+f))]*r[f+s];a[c*t+h]=u}for(let c=0;c<e;c++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=a[Math.min(e-1,Math.max(0,c+f))*t+h]*r[f+s];l[c*t+h]=u}return l}var uf=i=>i*Math.tan(2*cf)*.45;var YE=Math.PI/180;var xm=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*180/Math.PI;function ym(i){return i.map(t=>t.kind==="stair"?{kind:"stair",fa:t.fa,pa:t.ramp.pts[0],fb:t.fb,pb:t.ramp.pts[t.ramp.pts.length-1],da:xm(t.ramp.pts[0],t.ramp.pts[Math.min(2,t.ramp.pts.length-1)]),db:xm(t.ramp.pts[t.ramp.pts.length-1],t.ramp.pts[Math.max(0,t.ramp.pts.length-3)])}:{kind:"elev",fa:t.fa,pa:t.pa,fb:t.fb,pb:t.pb})}var Kr=Math.PI/180,df=(i,t)=>((i-t)%360+540)%360-180;function vm(i,t,e){let n=Math.floor(e*.2),s=Math.ceil(e*.8),r=new Float32Array(t);for(let c=1;c<t-1;c++){let h=0;for(let u=n;u<s;u++){let f=u*t+c;h+=Math.abs(i[f+1]-i[f-1])}r[c]=h/(s-n)}r[0]=r[1],r[t-1]=r[t-2];let o=0;for(let c of r)o+=c;o/=t;let a=0;for(let c=0;c<t;c++)r[c]-=o,a+=r[c]*r[c];let l=Math.sqrt(a/t)||1;for(let c=0;c<t;c++)r[c]/=l;return r}function pf(i,t){let e=(d,g)=>[d[g],d[3+g],d[6+g]],n=(d,g)=>d[0]*g[0]+d[1]*g[1]+d[2]*g[2],s=e(i,0),r=e(i,1),o=e(i,2),a=e(t,2),l=e(t,0),c=n(a,s),h=n(a,r),u=n(a,o),f=n(l,r);return{yaw:Math.atan2(c,u)/Kr,pitch:Math.atan2(h,u)/Kr,roll:Math.asin(Math.max(-1,Math.min(1,f)))/Kr}}var Pl=class{constructor(t,e=null){this.long=t,this.prev=null,this.samples=[],this.fov=e}add(t,e,n){let s=this.prev;if(this.prev={P:t,R:e,t:n},!s||n-s.t>.35||t.length!==s.P.length)return null;let r=pf(s.R,e);if(Math.abs(r.yaw)<3||Math.abs(r.yaw)>14||Math.abs(r.pitch)>1.5||Math.abs(r.roll)>1.5)return null;let o=t.length,a=(o-1)/2,l=r.yaw*Kr,c=-2,h=null,u=-2,f=[];for(let g=40;g<=95;g+=.5){let x=this.long/2/Math.tan(g/2*Kr),m=0,p=0;for(let y=0;y<o;y++){let _=a+x*Math.tan(Math.atan((y-a)/x)+l);if(_<0||_>o-1)continue;let w=Math.floor(_),T=_-w,C=s.P[w]*(1-T)+s.P[Math.min(o-1,w+1)]*T;m+=C*t[y],p++}if(p<o*.5)continue;let S=m/p;f.push([g,S]),S>c&&(c=S,h=g)}if(c<.75||h==null||h<=40||h>=95)return null;for(let[g,x]of f)Math.abs(g-h)>8&&(u=Math.max(u,x));if(c-u<.05)return null;let d=h;if(this.samples.push(d),this.samples.length>60&&this.samples.shift(),this.samples.length>=8){let g=[...this.samples].sort((x,m)=>x-m);this.fov=g[g.length>>1]}return this.fov}};function Mm(i,t,e,n,s){let o=new Float64Array(180),a=0;for(let p=2;p<e-2;p++)for(let S=2;S<t-2;S++){let y=p*t+S,_=i[y-t+1]+2*i[y+1]+i[y+t+1]-i[y-t-1]-2*i[y-1]-i[y+t-1],w=i[y+t-1]+2*i[y+t]+i[y+t+1]-i[y-t-1]-2*i[y-t]-i[y-t+1],T=Math.hypot(_,w);if(T<90)continue;let C=(S-n.cx)/n.fx,U=(p-n.cy)/n.fy,b=Math.atan2(_,-w),M=ff(C,U,b,n,s);if(M==null)continue;let N=ff(C,U,b-.035,n,s),H=ff(C,U,b+.035,n,s);if(N==null||H==null)continue;let z=Math.abs(df(H*4,N*4))/4;if(z>6)continue;let K=M,st=Math.min(1,T/300)/(1+(z/1.5)**2),$=K*2,Mt=Math.floor($)%180,A=$-Math.floor($);o[Mt]+=st*(1-A),o[(Mt+1)%180]+=st*A,a++}if(a<150)return null;let l=new Float64Array(180);for(let p=0;p<180;p++){let S=0;for(let y=-6;y<=6;y++)S+=o[(p+y+180)%180]*Math.exp(-(y*y)/8);l[p]=S}let c=0;for(let p=1;p<180;p++)l[p]>l[c]&&(c=p);let h=0;for(let p=0;p<180;p++)Math.min(Math.abs(p-c),180-Math.abs(p-c))>12&&(h=Math.max(h,l[p]));let u=l[(c-1+180)%180],f=l[c],d=l[(c+1)%180],g=u-2*f+d,x=g<0?.5*(u-d)/g:0;return{axis:((c+x)/2%90+90)%90,ratio:f/(h||1e-9),n:a}}function ff(i,t,e,n,s){let r=Math.cos(e)/n.fx,o=Math.sin(e)/n.fy,a=-o,l=r,c=i*o-t*r,h=s[0]*a+s[1]*l+s[2]*c,u=s[3]*a+s[4]*l+s[5]*c,f=s[6]*a+s[7]*l+s[8]*c,d=Math.hypot(h,u,f);h/=d,u/=d,f/=d;let g=Math.hypot(h,u);return Math.abs(f)<.25||g<.25?null:((Math.atan2(u,h)/Kr+90)%90+90)%90}var ca=class{constructor(t=24){this.N=t,this.s=[],this.value=null}add(t,e=1){return this.value!=null&&this.s.length>=6&&Math.abs(df(t,this.value))>20?this.value:(this.s.push({v:t,w:e}),this.s.length>this.N&&this.s.shift(),this.value=this._median(),this.value)}get n(){return this.s.length}reset(){this.s=[],this.value=null}_median(){let t=this.s[0].v,e=this.s.map(r=>({v:t+df(r.v,t),w:r.w}));e.sort((r,o)=>r.v-o.v);let n=e.reduce((r,o)=>r+o.w,0),s=0;for(let r of e)if(s+=r.w,s>=n/2)return r.v;return e[e.length-1].v}};var IM=i=>document.querySelector(i),jr=i=>new Promise(t=>setTimeout(t,i)),Jr=null;function PM(){try{Jr=Jr||new(window.AudioContext||window.webkitAudioContext);let i=Jr.currentTime;for(let[t,e]of[[880,0],[660,.18]]){let n=Jr.createOscillator(),s=Jr.createGain();n.type="sine",n.frequency.value=t,s.gain.setValueAtTime(1e-4,i+e),s.gain.exponentialRampToValueAtTime(.18,i+e+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+e+.5),n.connect(s).connect(Jr.destination),n.start(i+e),n.stop(i+e+.55)}}catch{}}function Ll({from:i,to:t,title:e,hint:n,hold:s=!1,onSkip:r}){let o=IM("#lift"),a=o.querySelector(".lift-floor"),l=o.querySelector(".lift-arrow"),c=o.querySelector(".lift-msg"),h=o.querySelector(".lift-sub"),u=o.querySelector(".lift-skip"),f=t>i,d=i,g=!1,x=!1,m=null,p=null,S,y=new Promise(C=>S=C);o.hidden=!1,o.className="lift",l.textContent=f?"\u25B2":"\u25BC",a.textContent=$e(i),c.textContent=e||`${$e(t)}\uB85C \uC774\uB3D9 \uC911`,h.textContent=n||"",u.hidden=!s,u.onclick=()=>{r?.(),T.arrive()},requestAnimationFrame(()=>o.classList.add("show"));function _(C){a.classList.remove("flip"),a.offsetWidth,a.textContent=$e(C),a.classList.add("flip")}async function w(){for(await jr(350),o.classList.add("closed"),await jr(700),o.classList.add("moving");!g&&!x&&d!==t;){if(await jr(1100),g||x)return;d+=f?1:-1,_(d)}}let T={finished:y,async arrive(){if(x||g)return y;for(x=!0,await p;d!==t;)d+=f?1:-1,_(d),await jr(260);o.classList.remove("moving"),o.classList.add("arrived"),PM(),c.textContent=`${$e(t)} \uB3C4\uCC29`,u.hidden=!0,await jr(600),o.classList.remove("closed"),await jr(750),T.close()},close(){g||(g=!0,S(),clearTimeout(m),o.classList.remove("show"),setTimeout(()=>o.hidden=!0,250))},get arrived(){return x}};return p=w().catch(()=>{}),s||p.then(()=>T.arrive()),T}var Sm="sai-indoor-voice",Xe={get on(){try{return localStorage.getItem(Sm)==="1"}catch{return!1}},set on(i){try{localStorage.setItem(Sm,i?"1":"0")}catch{}i||speechSynthesis?.cancel()},supported:typeof window<"u"&&"speechSynthesis"in window,say(i){if(!(!this.supported||!this.on||!i))try{speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(i.replace(/·/g,","));t.lang="ko-KR",t.rate=1.05,speechSynthesis.speak(t)}catch{}}};si();async function bm(){try{return!!navigator.xr&&await navigator.xr.isSessionSupported("immersive-ar")}catch{return!1}}async function Em(i,t){let e=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["local-floor"],optionalFeatures:["camera-access","dom-overlay"],domOverlay:{root:t}}),n=e.enabledFeatures,s=[];if(n&&!n.includes("camera-access")&&s.push("camera-access"),e.domOverlayState||s.push("dom-overlay"),s.length)throw await e.end().catch(()=>{}),new Error(`\uC774 \uAE30\uAE30\uC758 WebXR\uC5D0 ${s.join(", ")} \uAE30\uB2A5\uC774 \uC5C6\uC5B4\uC694`);return i.xr.enabled=!0,i.xr.setReferenceSpaceType("local-floor"),await i.xr.setSession(e),e}var Dl=class{constructor(t,e=220,n=!1){this.r=t,this.long=e,this.flip=n,this.rt=null,this.buf=null,this.mat=new Pn({uniforms:{map:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D map; varying vec2 vUv; void main(){ vec3 c = texture2D(map, vUv).rgb; float g = dot(c, vec3(0.299, 0.587, 0.114)); gl_FragColor = vec4(g, g, g, 1.0); }",depthTest:!1,depthWrite:!1}),this.scene=new ei;let s=new ee(new Ts(2,2),this.mat);s.frustumCulled=!1,this.scene.add(s),this.cam=new Ni(-1,1,1,-1,0,1)}grab(t){let e=this.r.xr.getCameraTexture(t);if(!e||!t.width)return null;let n=this.long/Math.max(t.width,t.height),s=Math.round(t.width*n),r=Math.round(t.height*n);(!this.rt||this.rt.width!==s||this.rt.height!==r)&&(this.rt?.dispose(),this.rt=new Hn(s,r,{depthBuffer:!1}),this.buf=new Uint8Array(s*r*4)),this.mat.uniforms.map.value=e;let o=this.r,a=o.getRenderTarget(),l=o.xr.enabled;o.xr.enabled=!1,o.setRenderTarget(this.rt),o.render(this.scene,this.cam),o.readRenderTargetPixels(this.rt,0,0,s,r,this.buf),o.setRenderTarget(a),o.xr.enabled=l;let c=new Float32Array(s*r);for(let h=0;h<r;h++){let u=this.flip?h:r-1-h;for(let f=0;f<s;f++)c[h*s+f]=this.buf[(u*s+f)*4]}return{g:c,w:s,h:r}}dispose(){this.rt?.dispose(),this.mat.dispose()}};var gn=Math.PI/180,Qr=(i,t)=>((i-t)%360+540)%360-180;function Tm(i){let t=c=>[c[0],-c[2],c[1]],e=t([i[0],i[1],i[2]]),n=t([i[4],i[5],i[6]]),s=t([i[8],i[9],i[10]]),r=e,o=[-n[0],-n[1],-n[2]],a=[-s[0],-s[1],-s[2]];return{R:[r[0],o[0],a[0],r[1],o[1],a[1],r[2],o[2],a[2]],x:i[12],y:-i[14],h:i[13]}}function wm(i,t,e){return{fx:i[0]*t/2,fy:i[5]*e/2,cx:t/2*(1-i[8]),cy:e/2*(1+i[9])}}function Fl(i){return Math.atan2(i[5],i[2])/gn}var la=class i{constructor(){this.off=null,this.tx=0,this.ty=0,this.pending=null,this.n=0}get ok(){return this.off!=null}static solve(t,e,n){let s=Math.cos(n*gn),r=Math.sin(n*gn);return{off:n,tx:t.x-(s*e.x-r*e.y),ty:t.y-(r*e.x+s*e.y)}}update(t,e,n,s=.5){let r=i.solve(t,e,n);if(!this.ok)return Object.assign(this,r,{pending:null,n:1}),"set";let o=this.toBuilding(e.x,e.y),a=Math.hypot(o.x-t.x,o.y-t.y),l=Qr(n,this.off);if(a>3||Math.abs(l)>15){let f=this.pending;return this.pending=r,f&&Math.abs(Qr(f.off,r.off))<8&&Math.hypot(f.tx-r.tx,f.ty-r.ty)<2?(Object.assign(this,r,{pending:null}),this.n++,"snap"):"hold"}this.pending=null;let c=Math.min(.5,.25*s+.05),h=this.off+l*c,u={x:o.x+(t.x-o.x)*c,y:o.y+(t.y-o.y)*c};return Object.assign(this,i.solve(u,e,h)),this.n++,"blend"}toBuilding(t,e){let n=Math.cos(this.off*gn),s=Math.sin(this.off*gn);return{x:n*t-s*e+this.tx,y:s*t+n*e+this.ty}}toSensor(t,e){let n=Math.cos(this.off*gn),s=Math.sin(this.off*gn),r=t-this.tx,o=e-this.ty;return{x:n*r+s*o,y:-s*r+n*o}}},Nl=class{constructor(t=4){this.FH=t,this.ref=null,this.floorY=0,this.idx=0}shift(t){this.idx+=t}reset(t,e=null){this.ref=t,e!=null&&(this.floorY=e)}update(t){if(this.ref==null)return this.ref=t,0;let e=t-this.ref;return e>this.FH*.75?(this.ref+=this.FH,this.floorY+=this.FH,this.idx++,1):e<-this.FH*.75?(this.ref-=this.FH,this.floorY-=this.FH,this.idx--,-1):(Math.abs(e)<.4&&(this.ref+=e*.02),0)}};function Am(i,t){let e=-i.off*gn,n=-i.tx,s=i.ty;return{rotY:e,px:Math.cos(e)*n+Math.sin(e)*s,py:t,pz:-Math.sin(e)*n+Math.cos(e)*s}}var Ul=class{constructor({window:t=30,posTol:e=1.5,yawTol:n=20,minInliers:s=6,minSpan:r=2.5,margin:o=.6}={}){Object.assign(this,{window:t,posTol:e,yawTol:n,minInliers:s,minSpan:r,margin:o}),this.obs=[],this.best=null}add(t,e,n,s){for(s.forEach((r,o)=>this.obs.push({t,sx:e.x,sy:e.y,syaw:e.yaw,lvl:n,f:r.f,x:r.x,y:r.y,yaw:r.yaw,w:Math.max(.05,r.ncc-.3)*(o===0?1:.6)}));this.obs.length&&t-this.obs[0].t>this.window;)this.obs.shift()}clear(){this.obs=[],this.best=null}solve(){let t=this.obs,e=[];for(let a of t){let l=Qr(a.yaw,a.syaw),c=la.solve({x:a.x,y:a.y},{x:a.sx,y:a.sy},l);e.push({...c,df:a.f-a.lvl,...this._score(c,a.f-a.lvl)})}e.sort((a,l)=>l.score-a.score);let n=e[0];if(!n||n.n<this.minInliers||n.span<this.minSpan)return this.best=null;let s=a=>{if(a.df!==n.df||Math.abs(Qr(a.off,n.off))>10)return!0;let l=t[t.length-1],c=g=>{let x=Math.cos(g.off*gn),m=Math.sin(g.off*gn);return[x*l.sx-m*l.sy+g.tx,m*l.sx+x*l.sy+g.ty]},[h,u]=c(n),[f,d]=c(a);return Math.hypot(h-f,u-d)>3},r=e.find(a=>s(a));if(r&&r.score>n.score*this.margin)return this.best=null;let o=n;for(let a=0;a<2;a++){let l=0,c=0,h=0;for(let S of o.inl){let y=Qr(S.yaw,S.syaw)*gn;l+=S.w*Math.cos(y),c+=S.w*Math.sin(y)}let u=Math.atan2(c,l)/gn,f=0,d=0,g=Math.cos(u*gn),x=Math.sin(u*gn);for(let S of o.inl)f+=S.w*(S.x-(g*S.sx-x*S.sy)),d+=S.w*(S.y-(x*S.sx+g*S.sy)),h+=S.w;let m={off:u,tx:f/h,ty:d/h},p=this._score(m,o.df);if(p.n<this.minInliers)break;o={...m,df:o.df,...p}}return this.best=o}_score(t,e){let n=Math.cos(t.off*gn),s=Math.sin(t.off*gn),r=0,o=0,a=[],l=1/0,c=-1/0,h=1/0,u=-1/0,f=new Set;for(let d of this.obs){if(d.f-d.lvl!==e)continue;let g=n*d.sx-s*d.sy+t.tx,x=s*d.sx+n*d.sy+t.ty,m=Math.hypot(g-d.x,x-d.y);m>this.posTol||Math.abs(Qr(d.yaw,d.syaw+t.off))>this.yawTol||(a.push(d),r+=d.w*(1-m/(2*this.posTol)),f.has(d.t)||(f.add(d.t),o++),l=Math.min(l,d.sx),c=Math.max(c,d.sx),h=Math.min(h,d.sy),u=Math.max(u,d.sy))}return{score:r,n:o,inl:a,span:o?Math.hypot(c-l,u-h):0}}};var Ge=Math.PI/180,qe=i=>document.querySelector(i),LM=1.35,Ol=15,DM=65,ha=i=>{navigator.userActivation?.hasBeenActive&&navigator.vibrate?.(i)},ri=(i,t)=>((i-t)%360+540)%360-180,NM={start:"\u2191",straight:"\u2191",left:"\u2190",right:"\u2192","slight-left":"\u2196","slight-right":"\u2197","u-left":"\u21B6","u-right":"\u21B7","stair-up":"\u21E1","stair-down":"\u21E3",elev:"\u21C5",arrive:"\u2726"},ua=(i,t)=>{let e=new Array(9);for(let n=0;n<3;n++)for(let s=0;s<3;s++)e[n*3+s]=i[n*3]*t[s]+i[n*3+1]*t[3+s]+i[n*3+2]*t[6+s];return e},gf=i=>[Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i),0,0,0,1],UM=i=>[1,0,0,0,Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i)],FM=i=>[Math.cos(i),0,Math.sin(i),0,1,0,-Math.sin(i),0,Math.cos(i)],OM=[1,0,0,0,-1,0,0,0,-1];function mf(i,t){let e=[Math.cos(t)*Math.cos(i),Math.cos(t)*Math.sin(i),Math.sin(t)],n=[Math.sin(i),-Math.cos(i),0],s=[Math.sin(t)*Math.cos(i),Math.sin(t)*Math.sin(i),-Math.cos(t)];return[n[0],s[0],e[0],n[1],s[1],e[1],n[2],s[2],e[2]]}function Bl(i){let t=screen.orientation&&screen.orientation.angle||window.orientation||0,e=ua(ua(gf(i.alpha*Ge),UM(i.beta*Ge)),FM(i.gamma*Ge));return ua(ua(e,gf(t*Ge)),OM)}async function Rm(i){let{indoor:t,dest:e,mode:n,demo:s,assets:r="assets/",onClose:o,onRoute:a}=i,l=i.route,c=qe("#ar"),h=qe("#ar-video"),u=qe("#ar-gl"),f={step:qe("#ar-step-text"),sub:qe("#ar-step-sub"),arrow:qe("#ar-arrow"),status:qe("#ar-status"),coach:qe("#ar-coach"),dest:qe("#ar-dest"),remain:qe("#ar-remain"),err:qe("#ar-error"),arrive:qe("#ar-arrive"),mini:qe("#ar-mini")};c.hidden=!1,f.err.hidden=!0,f.arrive.hidden=!0,f.coach.hidden=!1,f.dest.textContent=`${e.title}${e.name?" \xB7 "+e.name:""}`,me("searching","\uC704\uCE58\uB97C \uCC3E\uB294 \uC911");let d=!1;if(!s){try{typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?d=await DeviceOrientationEvent.requestPermission()==="granted":d="DeviceOrientationEvent"in window}catch{d=!1}try{typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()}catch{}}let g=!1,x=null,m=null,p=+new URLSearchParams(location.search).get("fov")||0,S=0;try{S=+localStorage.getItem("sai-ar-fov")||0}catch{}let y=p||S||DM,_=null,w=new URLSearchParams(location.search),T=w.has("debug"),C=!s&&!w.has("legacy")&&await bm();async function U(){if(!window.isSecureContext)throw Object.assign(new Error("HTTPS \uC8FC\uC18C\uC5D0\uC11C\uB9CC \uCE74\uBA54\uB77C\uB97C \uC4F8 \uC218 \uC788\uC5B4\uC694."),{code:"insecure"});if(!navigator.mediaDevices?.getUserMedia)throw Object.assign(new Error("\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uCE74\uBA54\uB77C\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694."),{code:"nocam"});x=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:960},height:{ideal:720}}}),h.srcObject=x,h.loop=!1,await h.play()}async function b(){let W=await fetch(r+"demo.json").then(J=>J.json());m=W,h.srcObject=null,h.src=r+W.video,h.loop=!1,h.muted=!0,await h.play().catch(()=>{})}try{s?await b():C||await U()}catch(W){Ne(W);let J=()=>{g=!0,x?.getTracks().forEach(yt=>yt.stop()),c.hidden=!0,o?.()};return qe("#ar-error-close").onclick=J,qe("#ar-demo").onclick=()=>{J(),i.onDemo?.()},{close:J}}let M=null,N=async()=>{try{M=await navigator.wakeLock?.request("screen")}catch{}};N();let H=!1,z=()=>{document.hidden?(H=!0,m&&h.pause()):H&&(H=!1,N(),A?.postMessage({type:"reset"}),L.ok=!1,rt.init=!1,m?h.play().catch(()=>{}):h.play().catch(()=>{}))};document.addEventListener("visibilitychange",z);let K=null,st=W=>{W.alpha==null||C||(K={alpha:W.alpha,beta:W.beta,gamma:W.gamma,t:performance.now()})};!m&&d&&addEventListener("deviceorientation",st);let $={on:!1,lp:9.8,hi:!1,lastT:0,lo:99,top:0},Mt=W=>{let J=W.accelerationIncludingGravity;if(!J||J.x==null||C)return;$.on=!0,$.lp+=(Math.hypot(J.x,J.y,J.z)-$.lp)*.25,$.lo=Math.min($.lo,$.lp),$.top=Math.max($.top,$.lp);let yt=performance.now();if(!$.hi&&$.lp>10.8&&yt-$.lastT>280)$.hi=!0;else if($.hi&&$.lp<9.9){$.hi=!1,$.lastT=yt;let gt=Math.max(.45,Math.min(.85,.48*Math.pow(Math.max(.5,$.top-$.lo),.25)));$.lo=99,$.top=0;let Et=lt();$.n=($.n||0)+1,Et!=null&&O&&!Xt&&(A.postMessage({type:"step",len:gt,yaw:Et}),ft(Et))}};m||addEventListener("devicemotion",Mt);let A=new Worker("ar-worker.js"),O=!1,X=!1,ot=0,ut=0;A.onmessage=W=>{let J=W.data;J.type==="ready"?O=!0:J.type==="error"?Ne(new Error(`\uC704\uCE58 \uC778\uC2DD \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. ${J.message}`)):J.type==="pose"?(J.id&&(X=!1,ut=J.ms),J.cands&&k(J.id,J.cands),ct(J.r,J.id)):J.type==="motion"&&nt(J.r)};let wt=t.M;A.postMessage({type:"init",indexUrl:new URL(r+"ar-index.bin",location.href).href,svUrl:new URL(r+"sv.json",location.href).href,portals:ym(t.links),grid:{gx0:wt.gx0,gy1:wt.gy1,cell:wt.cell,gw:wt.gw,gh:wt.gh,floors:wt.floors.map(W=>({n:W.n,grid:W.grid}))}});let _t=document.createElement("canvas"),Ct=_t.getContext("2d",{willReadFrequently:!0});function et(){let W=h.videoWidth,J=h.videoHeight;if(!W||!J)return null;let yt=220/Math.max(W,J),gt=Math.round(W*yt),Et=Math.round(J*yt);_t.width!==gt&&(_t.width=gt,_t.height=Et),Ct.drawImage(h,0,0,gt,Et);let Tt=Ct.getImageData(0,0,gt,Et).data,pt=new Float32Array(gt*Et);for(let Lt=0,jt=0;Lt<pt.length;Lt++,jt+=4)pt[Lt]=.299*Tt[jt]+.587*Tt[jt+1]+.114*Tt[jt+2];let St;if(m){let Lt=gt/m.K[4];St={fx:m.K[0]*Lt,fy:m.K[1]*Lt,cx:m.K[2]*Lt,cy:m.K[3]*Lt}}else{let Lt=Math.max(gt,Et)/2/Math.tan(y/2*Ge);St={fx:Lt,fy:Lt,cx:gt/2,cy:Et/2}}return{img:{data:hf(pt,gt,Et,uf(St.fx)),w:gt,h:Et},K:St,raw:{g:pt,w:gt,h:Et}}}let L={ok:!1,x:0,y:0,f:l.pts[0].f,yaw:90,conf:0,lastFix:0},rt={x:0,y:0,yaw:90,init:!1},Nt=null,Ut=new ca,Bt=[],ye=0,D=!1,Qt=Wi(l),qt=i.steps||$s(l,e,{landmarks:t.destinations}),Ht=0,kt=0,ue=!1,Vt=-1,Xt=null,we=null,se=new Set,R=new Set,v=m?(m.pitchDeg||-6)*Ge:0,V=new Map;for(let W of t.floors){let J=[];for(let yt of t.FL(W).rooms){let gt=yt.poly;for(let Et=0;Et<gt.length;Et++){let Tt=gt[Et],pt=gt[(Et+1)%gt.length],St=Math.hypot(pt[0]-Tt[0],pt[1]-Tt[1]);if(St<1)continue;let Lt=Math.atan2(pt[1]-Tt[1],pt[0]-Tt[0])/Ge;Lt=(Lt%90+90)%90,J.push({x:(Tt[0]+pt[0])/2,y:(Tt[1]+pt[1])/2,L:St,t:Lt})}}V.set(W,J)}function B(W,J,yt){let gt=[],Et=0;for(let pt of V.get(W)||[]){if(Math.hypot(pt.x-J,pt.y-yt)>10)continue;Et+=pt.L;let St=gt.find(Lt=>Math.abs(ri(Lt.t*4,pt.t*4))/4<2);St?(St.t=(St.t*St.L+(St.t+ri(pt.t*4,St.t*4)/4)*pt.L)/(St.L+pt.L),St.L+=pt.L):gt.push({t:pt.t,L:pt.L})}let Tt=gt.sort((pt,St)=>St.L-pt.L)[0];return Tt&&Tt.L>Et*.75?Tt.t:null}let it=new ca(15),Q=0,At=null,vt=0;function F(W){return it.n>=3&&W-Q<2e4?it.value:Ut.value}function j(W,J,yt){let gt=At,Et=vt;if(At=J,vt=yt,!L.ok||!gt||yt-Et>400)return;let Tt=pf(gt,J);if(Math.abs(Tt.yaw)>2.5||Math.abs(Tt.pitch)>2.5)return;let pt=B(L.f,rt.x,rt.y);if(pt==null)return;let St=Mm(W.raw.g,W.raw.w,W.raw.h,W.K,J);if(!St||St.ratio<2.5)return;let Lt=Nt??Ut.value??L.off;if(Lt==null)return;let jt=pt-St.axis,fe=jt+90*Math.round(ri(Lt,jt)/90);Math.abs(ri(fe,Lt))>30||(it.add(fe,Math.min(3,St.ratio/2)),Q=yt,it.n>=3&&A.postMessage({type:"heading",off:it.value,sd:5}))}function k(W,J){let yt=G.q.get(W);if(!C||!yt||Xt||g)return;let gt=performance.now();Y.add(yt.t,yt,yt.lvl,J);let Et=Y.solve();if(!Et||!G.last)return;let Tt=G.last,pt=Math.cos(Et.off*Ge),St=Math.sin(Et.off*Ge),Lt={x:pt*Tt.x-St*Tt.y+Et.tx,y:St*Tt.x+pt*Tt.y+Et.ty},jt=Math.min(1,Et.n/12),fe=!xt.ok,ke=xt.update(Lt,{x:Tt.x,y:Tt.y},Et.off,jt);if(ke==="hold")return;let ve=Ft.idx+Et.df;t.floors.includes(ve)&&(L.f=ve),L.conf=jt,L.off=xt.off,L.lastFix=gt,(ke==="set"||ke==="snap")&&(Le=!0),fe&&(f.coach.hidden=!0,ha(40)),ye=0,D=!1,me("ok",`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Ze(L.f)}`),gt-G.fixT>2e3&&(G.fixT=gt,A.postMessage({type:"fix",fix:{f:L.f,x:Lt.x,y:Lt.y,yaw:Tt.yaw+xt.off,conf:.8},yaw:Tt.yaw}))}function lt(){return K?Zr(Bl(K))*180/Math.PI:null}function ct(W,J){if(g)return;let yt=performance.now();if(J&&G.q.delete(J),Xt)if(W.ok&&we&&W.f===we.to&&W.conf>.2)P();else return;if(C){xt.ok||me("searching","\uC8FC\uBCC0\uC744 \uBE44\uCD94\uBA70 \uBA87 \uAC78\uC74C \uAC78\uC5B4 \uC8FC\uC138\uC694");return}if(W.ok&&L.ok){if(W.f!==L.f||Math.hypot(W.x-L.x,W.y-L.y)>5){let Et=L.jump;if(L.jump={f:W.f,x:W.x,y:W.y},!Et||Et.f!==W.f||Math.hypot(Et.x-W.x,Et.y-W.y)>2.5)return}L.jump=null}if(W.ok){let gt=!L.ok;L.off=W.off,Object.assign(L,{ok:!0,x:W.x,y:W.y,f:W.f,yaw:W.yaw,conf:W.conf,lastFix:yt}),W.off!=null&&K&&W.conf>.35&&Ut.add(W.off,W.conf),gt&&(f.coach.hidden=!0,ha(40)),ye=0,D=!1,me(W.conf>.35?"ok":"weak",W.conf>.35?`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Ze(W.f)}`:`\uC704\uCE58\uAC00 \uC870\uAE08 \uBD88\uD655\uC2E4\uD574\uC694 \xB7 ${Ze(W.f)}`),dt()}else L.ok&&yt-L.lastFix>Ol*1e3&&!(C&&xt.ok)&&(L.ok=!1),(!L.ok||yt-L.lastFix>3e3)&&(ye=ye||yt,me("searching",L.ok?"\uC704\uCE58\uB97C \uB2E4\uC2DC \uB9DE\uCD94\uB294 \uC911":"\uC8FC\uBCC0\uC744 \uCC9C\uCC9C\uD788 \uBE44\uCDB0 \uC8FC\uC138\uC694"),L.ok||(f.coach.hidden=!1),!D&&yt-ye>6e3&&(D=!0,Xe.say("\uD734\uB300\uD3F0\uC744 \uC138\uC6CC\uC11C \uCC9C\uCC9C\uD788 \uC88C\uC6B0\uB85C \uBE44\uCDB0 \uC8FC\uC138\uC694")))}function ft(W){let J=performance.now();for(Bt.push({yaw:W,t:J});Bt.length&&J-Bt[0].t>5e3;)Bt.shift();if(Bt.length<6||!L.ok||rt.s==null||$.n%2)return;let yt=Bt.slice(-6).map(ve=>ve.yaw),gt=0,Et=0;for(let ve of yt)gt+=Math.cos(ve*Ge),Et+=Math.sin(ve*Ge);let Tt=Math.atan2(Et,gt)/Ge;if(yt.some(ve=>Math.abs(ri(ve,Tt))>10))return;let pt=Ye(l,Qt,Math.max(0,rt.s-3)),St=Ye(l,Qt,rt.s+1),Lt=Ye(l,Qt,rt.s+5);if(pt.f!==L.f||Lt.f!==L.f)return;let jt=(ve,vn)=>Math.atan2(vn.y-ve.y,vn.x-ve.x)/Ge;if(Math.abs(ri(jt(pt,St),jt(St,Lt)))>8)return;let fe=ri(jt(pt,Lt),Tt),ke=F(performance.now());ke==null||Math.abs(ri(fe,ke))>45||Ut.add(fe,2.5)}function nt(W){g||Xt||!L.ok||W.f!==L.f||(L.x=W.x,L.y=W.y,dt())}function It(W){we=W,R.add(W.s),C&&Y.clear(),Xe.say(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Ze(W.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`),ha([30,60,30]);let J=l.pts.find((yt,gt)=>yt.kind==="elev"&&yt.f===W.to&&l.pts[gt-1]?.kind==="elev");J&&A.postMessage({type:"lift",f:W.to,x:J.x,y:J.y}),Xt=Ll({from:W.f,to:W.to,title:`${$e(W.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`,hint:"\uB0B4\uB9B0 \uB4A4 \uD734\uB300\uD3F0\uC744 \uC138\uC6CC \uBCF5\uB3C4\uB97C \uBE44\uCD94\uBA74 \uC774\uC5B4\uC11C \uC548\uB0B4\uD574\uC694",hold:!0,onSkip:()=>P(!0)})}function P(W=!1){if(!Xt)return;let J=we;W||Xt.arrive(),Xt=null,Ht=J.s,L.f=J.to,C&&G.last&&(Ft.reset(G.last.h,G.last.h-G.eye),Ft.shift(J.to-J.f)),rt.init=!1,Xe.say(`${Ze(J.to)}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`),Le=!0}function ht(W,J){let yt=W.step,gt=Math.round(W.dist);return yt.kind==="arrive"?J.remain<3?`${e.title} \uB3C4\uCC29`:`${Math.round(J.remain)}m \uC55E ${e.title}`:yt.kind==="stair"||yt.kind==="elev"?W.dist<3?yt.text:`${gt}m \uC55E ${yt.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"}`:W.dist<4?`\uC9C0\uAE08 ${yt.action}`:`${gt}m \uC55E\uC5D0\uC11C ${yt.action}`}function dt(){if(Xt)return;let W=ya(l,Qt,L,Ht);if(!W)return;if(W.off>6){if(L.conf>.4&&++kt>=4){kt=0;let St=t.routeTo({f:L.f,x:L.x,y:L.y},e,{mode:n});St&&(l=St,Qt=Wi(l),qt=$s(l,e,{landmarks:t.destinations}),Ht=0,Vt=-1,se.clear(),Le=!0,a?.(l,qt),$t("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"),Xe.say("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"))}return}kt=0,Ht=Math.max(Ht-1,W.s);let J=io(qt,l,Qt,W.s);J.index!==Vt&&(Vt=J.index,ha(25),Le=!0);let yt=J.step;f.arrow.dataset.dir=yt.dir,f.step.textContent=ht(J,W);let gt=qt[J.index+1];f.sub.textContent=yt.kind==="arrive"?yt.sub||"":gt?`${yt.text} \xB7 \uB2E4\uC74C: ${gt.text}`:yt.text,f.remain.textContent=`\uB0A8\uC740 \uAC70\uB9AC ${Math.round(W.remain)}m \xB7 \uC57D ${va(W.remain)}`;let Et=J.index*2,Tt=Et+1,pt=L.conf>.3;if(pt&&yt.kind!=="arrive"&&J.dist<15&&J.dist>=4&&!se.has(Et)?(se.add(Et),Xe.say(`${Math.round(J.dist)}\uBBF8\uD130 \uC55E, ${yt.text}`)):pt&&J.dist<4&&!se.has(Tt)&&yt.kind!=="elev"&&(se.add(Tt),Xe.say(yt.kind==="arrive"?`${e.title}, ${yt.side||""}`:yt.text)),yt.kind==="elev"&&J.dist<3&&L.f===yt.f&&!R.has(yt.s)&&It(yt),W.remain<2.5&&L.f===l.pts[l.pts.length-1].f&&!ue){ue=!0,ha([60,40,60]);let St=qt[qt.length-1].side;f.arrive.querySelector("b").textContent=`${e.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694${St&&St!=="\uC815\uBA74"?` \xB7 \uBB38\uC740 ${St}`:""}`,f.arrive.hidden=!1}L.s=W.s}let mt=new Gr({canvas:u,antialias:!0,alpha:!0});mt.setPixelRatio(Math.min(devicePixelRatio,2)),mt.setClearColor(0,0);let tt=new ei;tt.add(new Rs(16777215,8943530,2.2));let Z=new He(60,1,.05,200),bt=new We;tt.add(bt);let Pt=(W,J,yt)=>new I(W,yt,-J),ne=(()=>{let W=document.createElement("canvas");W.width=64,W.height=64;let J=W.getContext("2d");J.fillStyle="rgba(121,80,255,0.78)",J.fillRect(0,0,64,64),J.strokeStyle="#fff",J.lineWidth=9,J.lineCap="round",J.lineJoin="round",J.beginPath(),J.moveTo(14,44),J.lineTo(32,22),J.lineTo(50,44),J.stroke();let yt=new Ci(W);return yt.wrapS=yt.wrapT=zn,yt.colorSpace=ze,yt})(),Zt=new Ee({map:ne,transparent:!0,depthWrite:!1,side:Te}),pe=null,Le=!0;function An(W){let J=W+15;for(let yt=1;yt<qt.length;yt++){let gt=qt[yt];if(!(gt.s<=W+.8)){if(gt.s>J)break;if(gt.kind==="walk"&&gt.dir!=="straight"&&gt.dir!=="start")return gt.s+1.2;if(gt.kind!=="walk"&&gt.kind!=="start")return gt.s}}return Math.min(J,Qt[Qt.length-1])}function rn(W){if(pe&&(bt.remove(pe),pe.geometry.dispose()),pe=null,!L.ok)return;let J=W??L.s??0,yt=Math.max(0,J+.8),gt=An(J),Et=t.FL(L.f).z,Tt=[];for(let ve=yt;ve<=gt+1e-6;ve+=.5){let vn=Ye(l,Qt,Math.min(ve,gt));if(vn.f!==L.f||Math.abs(vn.z-Et)>.3)break;Tt.push({...vn,z:Et})}if(Tt.length<2)return;let pt=[],St=[],Lt=[],jt=.6,fe=0;for(let ve=0;ve<Tt.length;ve++){let vn=Tt[Math.max(0,ve-1)],On=Tt[Math.min(Tt.length-1,ve+1)],$n=On.x-vn.x,Xs=On.y-vn.y,Af=Math.hypot($n,Xs)||1;$n/=Af,Xs/=Af;let as=Tt[ve];ve&&(fe+=Math.hypot(as.x-Tt[ve-1].x,as.y-Tt[ve-1].y)/jt);let Rf=as.z+.03;if(pt.push(as.x-Xs*jt*.5,Rf,-(as.y+$n*jt*.5),as.x+Xs*jt*.5,Rf,-(as.y-$n*jt*.5)),St.push(0,fe,1,fe),ve){let qs=ve*2;Lt.push(qs-2,qs-1,qs,qs,qs-1,qs+1)}}let ke=new Ie;ke.setAttribute("position",new _e(pt,3)),ke.setAttribute("uv",new _e(St,2)),ke.setIndex(Lt),pe=new ee(ke,Zt),pe.renderOrder=1,bt.add(pe)}let nn=new Ee({color:7950591,transparent:!0,side:Te,depthWrite:!1}),Yn=new es({color:16777215,transparent:!0}),vi=(()=>{let J=new Cr;J.moveTo(0,.55*1.5),J.lineTo(.42*1.5,.1*1.5),J.lineTo(.16*1.5,.1*1.5),J.lineTo(.16*1.5,-.45*1.5),J.lineTo(-.16*1.5,-.45*1.5),J.lineTo(-.16*1.5,.1*1.5),J.lineTo(-.42*1.5,.1*1.5),J.closePath();let yt=new Wo(J);yt.rotateX(-Math.PI/2);let gt=new ee(yt,nn),Et=new Ss(new Uo(yt),Yn),Tt=new We;return Tt.add(gt,Et),Tt.renderOrder=2,Tt.visible=!1,bt.add(Tt),Tt})(),Un=(()=>{let W=new We,J=new ui({color:5451986,emissive:2758016}),yt=new ee(new Ii(.22,20,14),J);yt.position.y=1.9;let gt=new ee(new bs(.16,.6,16),J);gt.rotation.x=Math.PI,gt.position.y=1.55;let Et=document.createElement("canvas");Et.width=256,Et.height=80;let Tt=Et.getContext("2d");Tt.fillStyle="#5330d2",Tt.beginPath(),Tt.roundRect(4,4,248,72,36),Tt.fill(),Tt.fillStyle="#fff",Tt.font="bold 40px 'Noto Sans KR', sans-serif",Tt.textAlign="center",Tt.textBaseline="middle",Tt.fillText(e.title,128,42);let pt=new Ci(Et);pt.colorSpace=ze;let St=new Ao(new br({map:pt,depthTest:!1,sizeAttenuation:!1}));return St.scale.set(.2,.0625,1),St.position.y=2.45,St.renderOrder=5,W.add(yt,gt,St),bt.add(W),W})();function Fn(){let W=c.clientWidth,J=c.clientHeight;mt.setSize(W,J,!1);let yt=h.videoWidth||16,gt=h.videoHeight||9,Et;if(m)Et=2*Math.atan(m.K[5]/2/m.K[1]);else{let Lt=Math.max(yt,gt)/2/Math.tan(y/2*Ge);Et=2*Math.atan(gt/2/Lt)}let Tt=yt/gt,pt=W/J,St=pt<=Tt?Et:2*Math.atan(Math.tan(Et/2)*Tt/pt);Z.fov=St/Ge,Z.aspect=pt,Z.updateProjectionMatrix()}addEventListener("resize",Fn),h.onloadedmetadata=Fn,Fn();let os=new ie;function ga(W,J,yt,gt){let Et=(Tt,pt)=>{let St=[W[Tt]*pt,W[3+Tt]*pt,W[6+Tt]*pt];return new I(St[0],St[2],-St[1])};os.makeBasis(Et(0,1),Et(1,-1),Et(2,-1)),Z.quaternion.setFromRotationMatrix(os),Z.position.copy(Pt(J,yt,gt))}let he=f.mini.getContext("2d");function Hl(W){let J=f.mini.width,yt=4.2;if(he.setTransform(1,0,0,1,0,0),he.clearRect(0,0,J,J),!L.ok)return;he.save(),he.translate(J/2,J/2),he.rotate((W-90)*Math.PI/180);let gt=(pt,St)=>[(pt-rt.x)*yt,-(St-rt.y)*yt],Et=t.FL(L.f);for(let pt of Et.rooms)he.beginPath(),pt.poly.forEach((St,Lt)=>{let jt=gt(St[0],St[1]);Lt?he.lineTo(jt[0],jt[1]):he.moveTo(jt[0],jt[1])}),he.closePath(),he.fillStyle=pt.id===e.id&&L.f===e.f?"#7950ff55":"#e9e5f1",he.fill(),he.strokeStyle="#cfc8e0",he.lineWidth=1,he.stroke();he.strokeStyle="#7950ff",he.lineWidth=5,he.lineCap=he.lineJoin="round",he.beginPath();let Tt=!1;for(let pt of l.pts){if(pt.f!==L.f){Tt=!1;continue}let St=gt(pt.x,pt.y);Tt?he.lineTo(St[0],St[1]):he.moveTo(St[0],St[1]),Tt=!0}he.stroke(),he.restore(),he.fillStyle="#3d8bff33",he.beginPath(),he.moveTo(J/2,J/2),he.arc(J/2,J/2,46,-Math.PI/2-.45,-Math.PI/2+.45),he.fill(),he.fillStyle="#3d8bff",he.strokeStyle="#fff",he.lineWidth=4,he.beginPath(),he.arc(J/2,J/2,10,0,Math.PI*2),he.fill(),he.stroke()}let Hi=T?document.createElement("pre"):null,_a=0;Hi&&(Hi.className="ar-debug",c.append(Hi));let Vi=0,no=0,Ws=performance.now();h.onseeked=()=>A.postMessage({type:"reset"});let E=0;function q(W){if(g)return;requestAnimationFrame(q);let J=Math.min(.1,(W-Ws)/1e3);if(Ws=W,O&&!X&&!H&&W-Vi>200&&h.readyState>=2){m&&h.currentTime<E-1&&A.postMessage({type:"reset"}),E=h.currentTime;let pt=et(),St=null;if(m?St=mf(0,v):K?St=Bl(K):St=mf(0,-8*Ge),pt&&St&&!m&&K&&!p){_=_||new Pl(Math.max(pt.raw.w,pt.raw.h),S||null);let Lt=_.add(vm(pt.raw.g,pt.raw.w,pt.raw.h),St,W/1e3);if(Lt&&Math.abs(Lt-y)>.4){y=Lt,Fn();try{localStorage.setItem("sai-ar-fov",Lt.toFixed(1))}catch{}}}if(pt&&St&&!m&&K&&j(pt,St,W),pt&&St){let Lt=Math.asin(St[8])/Ge;if(!m&&(Lt<-35||Lt>25))me("weak",Lt<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{let jt=lf(pt.img,pt.K,St),fe=m||!K?null:Zr(St)*180/Math.PI,ke=Vi?Math.min(2,(W-Vi)/1e3):0;ke&&A.postMessage({type:"tick",dt:ke,yaw:fe,hasSensor:fe!=null,pdr:$.on}),X=!0,Vi=W,A.postMessage({type:"query",id:++ot,q:jt,yaw:fe,floorHint:we&&Xt?we.to:Ye(l,Qt,Ht).f},[jt.buffer])}}De(W)}let yt=F(W);if(yt!=null)if(Nt==null)Nt=yt;else{let pt=ri(yt,Nt);Nt+=pt*Math.min(1,J*(Math.abs(pt)>8?2:.7))}if(L.ok){let pt=L.x,St=L.y,Lt=ya(l,Qt,L,Ht);if(Lt&&Lt.off<3){let fe=Lt.s;rt.s!=null&&fe<rt.s-1&&!rt.back?(rt.back=!0,fe=rt.s):rt.back=!1;let ke=Ye(l,Qt,fe);pt=ke.x,St=ke.y,rt.s=fe}else rt.s=null;rt.init||Object.assign(rt,{x:pt,y:St,yaw:L.yaw,init:!0});let jt=Math.min(1,J*2.5);rt.x+=(pt-rt.x)*jt,rt.y+=(St-rt.y)*jt,m&&(rt.yaw+=ri(L.yaw,rt.yaw)*Math.min(1,J*3))}let gt=rt.yaw,Et;if(!m&&K){let pt=Bl(K);Et=ua(gf((Nt??0)*Ge),pt),gt=Zr(Et)*180/Math.PI}else Et=mf(rt.yaw*Ge,v);let Tt=t.FL(L.f).z+LM;ga(Et,rt.x,rt.y,Tt),at(W,J,gt)}function at(W,J,yt){let gt=rt.s??L.s;(Le||L.ok&&Math.abs((gt??0)-(rn.s??-99))>1)&&(rn(gt),rn.s=gt??0,Le=!1),ne.offset.y-=J*1.6;let Et=(W-L.lastFix)/1e3,Tt=L.ok&&!Xt&&Et<Ol&&(m||!K||Nt!=null);no+=((Tt?1:0)-no)*Math.min(1,J*4);let pt=no*(Et>Ol-3?Math.max(0,(Ol-Et)/3):1);Zt.opacity=pt*.9,nn.opacity=Yn.opacity=pt,pe&&(pe.visible=pt>.02);let St=l.pts[l.pts.length-1];if(Un.visible=pt>.02&&St.f===L.f&&Math.hypot(St.x-rt.x,St.y-rt.y)<35,Un.position.copy(Pt(St.x,St.y,t.FL(St.f).z)),Un.children[0].position.y=1.9+Math.sin(W/300)*.05,vi.visible=!1,pt>.02&&gt!=null){let Lt=io(qt,l,Qt,gt);if(Lt.dist<15&&Lt.step.kind==="walk"&&Lt.step.dir!=="straight"){let ve=gt+Lt.dist,vn=Ye(l,Qt,ve),On=Ye(l,Qt,ve+.9),$n=Ye(l,Qt,ve+3);if(On.f===L.f&&vn.f===L.f&&Math.hypot($n.x-On.x,$n.y-On.y)>.3){vi.visible=!0;let Xs=Math.atan2($n.y-On.y,$n.x-On.x)/Ge;vi.position.copy(Pt(On.x,On.y,t.FL(L.f).z+.04)),vi.rotation.set(0,(Xs-90)*Ge,0)}}f.arrow.textContent=Lt.dist<25&&NM[Lt.step.dir]||"\u2191";let jt=Ye(l,Qt,gt+4),fe=ri(Math.atan2(jt.y-rt.y,jt.x-rt.x)/Ge,yt),ke=Math.abs(fe)>55?Math.abs(fe)>135?"\uACBD\uB85C\uAC00 \uB4A4\uCABD\uC5D0 \uC788\uC5B4\uC694 \xB7 \uB3CC\uC544\uC11C \uBCF4\uC138\uC694":fe>0?"\u2190 \uACBD\uB85C\uAC00 \uC67C\uCABD\uC5D0 \uC788\uC5B4\uC694":"\uACBD\uB85C\uAC00 \uC624\uB978\uCABD\uC5D0 \uC788\uC5B4\uC694 \u2192":"";ke&&(f.sub.textContent=ke),f.sub.classList.toggle("hint",!!ke)}Hi&&W-_a>300&&(_a=W,Hi.textContent=[C?`WebXR(VIO) ${G.tracking?"\uCD94\uC801 \uC911":"\uCD94\uC801 \uB04A\uAE40"} \xB7 \uC815\uB82C ${xt.ok?`${xt.n}\uD68C`:"-"} \xB7 \uB192\uC774 ${G.last?G.last.h.toFixed(2):"-"}m \xB7 \uC9C8\uC758 ${Math.round(ut)}ms`:`\uC13C\uC11C ${K?"\uCF1C\uC9D0":"\uC5C6\uC74C"} \xB7 \uAC78\uC74C ${$.on?$.n||0:"\uC5C6\uC74C"} \xB7 \uC9C8\uC758 ${Math.round(ut)}ms`,`\uD654\uAC01 ${y.toFixed(1)}\xB0 ${p?"(\uC8FC\uC18C)":_?`(\uBCF4\uC815 \uD45C\uBCF8 ${_.samples.length})`:""}`,`\uBC29\uD5A5\uAE30\uC900 ${Nt==null?"-":Nt.toFixed(1)} / \uC18C\uC2E4\uC810 ${it.value==null?"-":it.value.toFixed(1)} (${it.n}) / \uC0AC\uC9C4\xB7\uAC78\uC74C ${Ut.value==null?"-":Ut.value.toFixed(1)} (${Ut.n})`,`\uC704\uCE58 ${L.ok?"OK":"--"} ${$e(L.f)} (${L.x.toFixed(1)}, ${L.y.toFixed(1)}) \uC2E0\uB8B0 ${L.conf.toFixed(2)}`].join(`
`)),Hl(yt),mt.render(tt,Z)}let G={q:new Map,last:null,mx:0,my:0,tracking:!1,eye:1.35,progT:0,fixT:0,nq:0},Y=new Ul,xt=new la,Ft=new Nl(t.M.FH||4),Wt=null,Gt=null;function te(W,J){if(g)return;let yt=Math.min(.1,(W-Ws)/1e3);Ws=W;let gt=J?.getViewerPose(mt.xr.getReferenceSpace()),Et=rt.yaw;if(gt){let Tt=gt.views[0],pt=Tm(Tt.transform.matrix),St=G.tracking;if(G.tracking=!gt.emulatedPosition,G.last&&G.tracking&&St){let Lt=pt.x-G.last.x,jt=pt.y-G.last.y;Math.hypot(Lt,jt)<1.5&&!Xt&&(G.mx+=Lt,G.my+=jt)}if(G.last={...pt,yaw:Fl(pt.R)},G.tracking&&!Xt){let Lt=Ft.update(pt.h);Lt?(A.postMessage({type:"shiftFloor",d:Lt}),t.floors.includes(L.f+Lt)&&(L.f+=Lt),Le=!0):Math.abs(pt.h-Ft.floorY-G.eye)<.4&&(G.eye+=(pt.h-Ft.floorY-G.eye)*.01)}if(O&&!X&&!H&&G.tracking&&W-Vi>200&&Tt.camera){let Lt=Gt.grab(Tt.camera);if(Lt){let jt=wm(Tt.projectionMatrix,Lt.w,Lt.h),fe={img:{data:hf(Lt.g,Lt.w,Lt.h,uf(jt.fx)),w:Lt.w,h:Lt.h},K:jt,raw:Lt};j(fe,pt.R,W);let ke=Math.asin(pt.R[8])/Ge;if(ke<-35||ke>25)me("weak",ke<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{(G.mx||G.my)&&A.postMessage({type:"move",dx:G.mx,dy:G.my}),G.mx=G.my=0;let ve=lf(fe.img,fe.K,pt.R);X=!0,Vi=W;let vn=Fl(pt.R);G.q.set(++ot,{x:pt.x,y:pt.y,yaw:vn,lvl:Ft.idx,t:W/1e3});let On=xt.ok?L.f:Ye(l,Qt,Ht).f,$n=++G.nq%4===0?t.floors:[On];G.q.size>20&&G.q.delete(G.q.keys().next().value),A.postMessage({type:"query",id:ot,q:ve,yaw:vn,xr:!0,floors:$n,floorHint:we&&Xt?we.to:Ye(l,Qt,Ht).f},[ve.buffer])}}}if(xt.ok&&!Xt){let Lt=xt.toBuilding(pt.x,pt.y);L.x=Lt.x,L.y=Lt.y,L.ok=!0,G.tracking&&(L.lastFix=W),Et=Fl(pt.R)+xt.off,L.yaw=Et;let jt=ya(l,Qt,L,Ht);rt.x=Lt.x,rt.y=Lt.y,rt.yaw=Et,rt.init=!0,rt.s=jt&&jt.off<3?jt.s:null,W-G.progT>200&&(G.progT=W,dt());let fe=Am(xt,Ft.floorY-t.FL(L.f).z);bt.rotation.set(0,fe.rotY,0),bt.position.set(fe.px,fe.py,fe.pz)}}xt.ok?bt.visible=!0:bt.visible=!1,at(W,yt,Et)}if(C)try{Wt=await Em(mt,c),Gt=new Dl(mt,220,w.has("xrflip")),c.classList.add("xr"),Wt.addEventListener("end",()=>{g||le()}),mt.setAnimationLoop(te)}catch{C=!1,$t("\uC774 \uAE30\uAE30\uB294 \uAE30\uBCF8 AR \uBC29\uC2DD\uC73C\uB85C \uC548\uB0B4\uD574\uC694");try{await U()}catch(J){Ne(J)}requestAnimationFrame(q)}else requestAnimationFrame(q);let Kt=qe("#ar-floors");Kt.replaceChildren();for(let W of t.floors){let J=document.createElement("button");J.type="button",J.textContent=$e(W),J.onclick=()=>{Kt.hidden=!0,A.postMessage({type:"floor",f:W}),L.ok=!1,L.f=W,C&&(Ft.idx=0,Y.clear(),xt.off=null),rt.init=!1,me("searching",`${Ze(W)}\uC5D0\uC11C \uC704\uCE58\uB97C \uCC3E\uB294 \uC911`),$t(`${Ze(W)}\uB85C \uB9DE\uCDC4\uC5B4\uC694`)},Kt.append(J)}f.status.onclick=()=>{for(let W of Kt.children)W.classList.toggle("on",W.textContent===$e(L.f));Kt.hidden=!Kt.hidden};let Yt=m?null:new URLSearchParams(location.search).get("loc"),re=Yt?document.createElement("canvas"):null,Se=!1,Be=0;function De(W){if(!Yt||Se||W-Be<1500||!K)return;let J=h.videoWidth,yt=h.videoHeight;if(!J)return;Se=!0,Be=W;let gt=640/Math.max(J,yt);re.width=Math.round(J*gt),re.height=Math.round(yt*gt),re.getContext("2d").drawImage(h,0,0,re.width,re.height);let Et=Bl(K),Tt=Zr(Et)*180/Math.PI,pt={R:Et,fovLong:y,prior:L.ok?{f:L.f,x:L.x,y:L.y,yaw:L.yaw}:{f:Ye(l,Qt,Ht).f}};re.toBlob(async St=>{try{let Lt=new FormData;Lt.append("image",St,"q.jpg"),Lt.append("meta",JSON.stringify(pt));let fe=await(await fetch(Yt,{method:"POST",body:Lt})).json();!g&&fe&&fe.ok&&A.postMessage({type:"fix",fix:fe,yaw:Tt})}catch{}Se=!1},"image/jpeg",.7)}function me(W,J){f.status.className=`ar-status ${W}`,f.status.textContent=J}function $t(W){let J=qe("#toast");J.textContent=W,J.hidden=!1,clearTimeout($t.h),$t.h=setTimeout(()=>J.hidden=!0,2600)}function Ne(W){f.err.hidden=!1,f.coach.hidden=!0;let J=W.code==="insecure",yt=W.name==="NotAllowedError";f.err.querySelector("b").textContent=J?"HTTPS\uC5D0\uC11C \uC5F4\uC5B4 \uC8FC\uC138\uC694":yt?"\uCE74\uBA54\uB77C \uAD8C\uD55C\uC774 \uD544\uC694\uD574\uC694":"\uCE74\uBA54\uB77C\uB97C \uCF24 \uC218 \uC5C6\uC5B4\uC694",f.err.querySelector("p").textContent=J?"\uD734\uB300\uD3F0 \uCE74\uBA54\uB77C\uB294 \uBCF4\uC548 \uC5F0\uACB0(HTTPS)\uC5D0\uC11C\uB9CC \uC4F8 \uC218 \uC788\uC5B4\uC694. \uBC30\uD3EC \uC8FC\uC18C\uB098 npm run dev:phone \uC8FC\uC18C\uB85C \uC5F4\uC5B4 \uC8FC\uC138\uC694.":yt?"\uBE0C\uB77C\uC6B0\uC800 \uC124\uC815\uC5D0\uC11C \uC774 \uC0AC\uC774\uD2B8\uC758 \uCE74\uBA54\uB77C \uC811\uADFC\uC744 \uD5C8\uC6A9\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":`${W.message||W} \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C AR \uAE38\uC548\uB0B4\uB97C \uCCB4\uD5D8\uD560 \uC218 \uC788\uC5B4\uC694.`}function le(){g||(g=!0,A.terminate(),Xt?.close(),M?.release?.().catch(()=>{}),document.removeEventListener("visibilitychange",z),Xe.supported&&speechSynthesis.cancel(),removeEventListener("deviceorientation",st),removeEventListener("devicemotion",Mt),mt.setAnimationLoop(null),Wt&&Wt.end().catch(()=>{}),Gt?.dispose(),c.classList.remove("xr"),removeEventListener("resize",Fn),x?.getTracks().forEach(W=>W.stop()),h.pause(),h.removeAttribute("src"),h.srcObject=null,h.load(),mt.dispose(),Hi?.remove(),pe?.geometry.dispose(),c.hidden=!0,o?.())}qe("#ar-close").onclick=le,qe("#ar-error-close").onclick=le,qe("#ar-arrive-close").onclick=le;let hn=qe("#ar-again");return hn.hidden=!m,hn.onclick=()=>{f.arrive.hidden=!0,ue=!1,l=i.route,Qt=Wi(l),qt=i.steps||$s(l,e,{landmarks:t.destinations}),Ht=0,Vt=-1,Le=!0,L.ok=!1,rt.init=!1,se.clear(),R.clear(),A.postMessage({type:"reset"}),h.currentTime=0,h.play().catch(()=>{})},h.onended=()=>{!m||g||(ue||(f.arrive.querySelector("b").textContent="\uB370\uBAA8 \uC601\uC0C1\uC774 \uB05D\uB0AC\uC5B4\uC694"),f.arrive.hidden=!1)},qe("#ar-demo").onclick=()=>{le(),i.onDemo?.()},{close:le}}var Hs="assets/",zt=i=>document.querySelector(i),Gs=i=>[...document.querySelectorAll(i)],to=new URLSearchParams(location.search),Cm={start:"\u2191",straight:"\u2191",left:"\u2190",right:"\u2192","slight-left":"\u2196","slight-right":"\u2197","u-left":"\u21B6","u-right":"\u21B7","stair-up":"\u21E1","stair-down":"\u21E3",elev:"\u21C5",arrive:"\u2726"},Dt={start:null,dest:null,mode:"stairs",route:null,steps:null,focusStep:null,sheet:"home"},en,Me,Vs,fa=null;function da(i,t=2600){let e=zt("#toast");e.textContent=i,e.hidden=!1,clearTimeout(da.h),da.h=setTimeout(()=>e.hidden=!0,t)}function Oe(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}async function BM(){let i=zt("#load-bar"),[t,e]=await Promise.all([fetch(Hs+"mirae.json").then(c=>{if(!c.ok)throw new Error(`\uCE35 \uB370\uC774\uD130 ${c.status}`);return c.json()}),fetch(Hs+"entrances.json").then(c=>c.json())]);i.style.width="15%",en=Pf(t),Vs=e.entrances,Me=gm(zt("#view"),en,{onPick:zM}),kM(),await Me.load(Hs+"mirae.glb",c=>i.style.width=`${15+c*85}%`),zt("#loading").classList.add("done"),setTimeout(()=>zt("#loading").hidden=!0,450);let n=to.get("from"),s=(c,h)=>c.campusNode===h||(c.campusNodes||[]).includes(h),r=Vs.find(c=>c.id===n||s(c,n)),o=!r&&n&&en.findDest(n);eo(o?kl(o):yf(r||Vs[0])),r&&s(r,n)&&(zt("#home-from").textContent=`\uCEA0\uD37C\uC2A4 \uACBD\uB85C\uAC00 ${r.name}\uB85C \uC774\uC5B4\uC84C\uC5B4\uC694. \uAC00\uB824\uB294 \uD638\uC2E4\uC744 \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694.`),to.get("mode")==="elevator"&&Ef("elevator",!1),Me.setFloor(Dt.start.f,!0),ss();let a=to.get("to"),l=a&&(en.findDest(a)||en.search(a)[0]);l&&(Dt.dest=l,rs()),to.has("demo")&&wf(),Om()}function yf(i){return{kind:"entrance",id:i.id,name:i.name,f:i.f,x:i.p[0],y:i.p[1]}}function kl(i){let t=i.doors[0],e=en.nearest(i.f,t[0],t[1],6)||t;return{kind:"place",id:i.key,name:`${i.title}${i.name?" "+i.name:""}`,f:i.f,x:e[0],y:e[1]}}function eo(i){Dt.start=i,Me.setMe({x:i.x,y:i.y,f:i.f})}function kM(){let i=zt("#floors");i.replaceChildren();for(let t of[...en.floors].sort((e,n)=>n-e)){let e=Oe("button","",$e(t));e.type="button",e.dataset.f=t,e.setAttribute("aria-label",Ze(t)),e.onclick=()=>vf(t),i.append(e)}}function vf(i){if(i===Me.floor)return;let t=i>Me.floor;Me.setFloor(i,!1,!0),Me.setMe(Dt.start),ss();let e=zt("#floor-badge");e.textContent=`${t?"\u25B2":"\u25BC"} ${$e(i)}`,e.classList.remove("show"),e.offsetWidth,e.classList.add("show")}function ss(){let i=new Set(Dt.route?Dt.route.pts.map(t=>t.f):[]);for(let t of Gs("#floors button"))t.classList.toggle("on",+t.dataset.f===Me.floor),t.classList.toggle("has-route",i.has(+t.dataset.f))}zt("#recenter").onclick=()=>{Dt.route?Dm():Me.frame()};function zM(i,t,e){let n=en.roomAt(e,i,t),s=n&&en.destinations.find(r=>r.f===e&&r.id===n.id);if(!s){let r=null;for(let o of en.destinations)if(o.f===e)for(let a of o.doors){let l=Math.hypot(a[0]-i,a[1]-t);l<2.2&&(!r||l<r[0])&&(r=[l,o])}s=r&&r[1]}s&&Im(s)}function pa(i){Dt.sheet=i;for(let t of["home","place","route"])zt(`#sheet-${t}`).hidden=t!==i;zt("#sheet").classList.remove("collapsed"),zt("#sheet").classList.toggle("route-mode",i==="route")}zt("#sheet-handle").onclick=()=>zt("#sheet").classList.toggle("collapsed");function Im(i){Dt.pending=i,Me.select(i),zt("#place-floor").textContent=$e(i.f),zt("#place-title").textContent=i.title,zt("#place-sub").textContent=[i.name,i.catLabel&&i.catLabel!==i.name?i.catLabel:"",Ze(i.f)].filter(Boolean).join(" \xB7 "),pa("place");let t=i.center||i.doors[0];i.f!==Me.floor&&vf(i.f),Me.focus(t[0],t[1],i.f,48),ss()}zt("#place-close").onclick=()=>{Me.select(null),pa(Dt.route?"route":"home")};zt("#place-route").onclick=()=>{Dt.dest=Dt.pending,Pm(Dt.dest),rs()};zt("#place-from").onclick=()=>{eo(kl(Dt.pending)),da(`${Dt.pending.title}\uC5D0\uC11C \uCD9C\uBC1C\uD574\uC694. \uC774\uC81C \uB3C4\uCC29\uC9C0\uB97C \uAC80\uC0C9\uD574 \uC8FC\uC138\uC694.`),Dt.dest&&Dt.dest.key!==Dt.pending.key?rs():(Me.select(null),pa("home"),ma())};var xf="sai-indoor-recent";function HM(){try{return JSON.parse(localStorage.getItem(xf)||"[]").map(i=>en.findDest(i)).filter(Boolean)}catch{return[]}}function Pm(i){try{let t=[i.key,...JSON.parse(localStorage.getItem(xf)||"[]").filter(e=>e!==i.key)].slice(0,6);localStorage.setItem(xf,JSON.stringify(t))}catch{}}function ma(i="dest"){Dt.searchMode=i,zt("#search").hidden=!1,zt("#search-input").value="",zt("#search-input").placeholder=i==="origin"?"\uC5B4\uB514\uC5D0\uC11C \uCD9C\uBC1C\uD558\uB098\uC694? (\uD638\uC2E4\xB7\uC774\uB984)":"313, \uB124\uD2B8\uC6CC\uD06C, \uD654\uC7A5\uC2E4, \uAD50\uC218 \uC774\uB984",Sf(""),setTimeout(()=>zt("#search-input").focus(),50)}function Mf(){zt("#search").hidden=!0,zt("#search-input").blur()}zt("#search-open").onclick=()=>ma();zt("#search-close").onclick=Mf;zt("#search-input").addEventListener("input",i=>Sf(i.target.value));zt("#search-input").addEventListener("keydown",i=>{i.isComposing||i.keyCode===229||(i.key==="Enter"?zt("#search-results li[data-key] button")?.click():i.key==="Escape"&&Mf())});function _f(i){let t=Oe("li");t.dataset.key=i.key;let e=Oe("span","floor-tag"+(i.f===0?" b1":""),$e(i.f)),n=Oe("div");n.append(Oe("b","",i.title),Oe("small","",[i.name,i.numbered?i.catLabel:Ze(i.f)].filter(Boolean).join(" \xB7 ")));let s=Oe("button","search-result-button");return s.type="button",s.append(e,n),t.append(s),s.onclick=()=>{Mf(),Pm(i),Dt.searchMode==="origin"?(eo(kl(i)),bf(),Dt.dest&&rs()):Im(i)},t}function Sf(i){let t=zt("#search-results");if(t.replaceChildren(),i.trim()){let s=en.search(i,40),r=s.length?[]:en.suggest(i),o=s.length?s:r;zt("#search-hint").textContent=r.length?`\uCD94\uCC9C \uC7A5\uC18C ${r.length}\uACF3`:s.length?`${s.length}\uACF3`:"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694. \uD638\uC2E4 \uBC88\uD638\uB098 \uC774\uB984 \uC77C\uBD80\uB85C \uCC3E\uC544\uBCF4\uC138\uC694.";for(let a of o)t.append(_f(a));return}zt("#search-hint").textContent="\uBC88\uD638\uB098 \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984\uC73C\uB85C \uCC3E\uC744 \uC218 \uC788\uC5B4\uC694";let e=HM();if(e.length){t.append(Oe("li","group","\uCD5C\uADFC \uCC3E\uC740 \uACF3"));for(let s of e)t.append(_f(s))}let n=null;for(let s of en.destinations.filter(r=>r.numbered))s.f!==n&&(t.append(Oe("li","group",Ze(s.f))),n=s.f),t.append(_f(s))}for(let i of Gs("#quick-chips button"))i.onclick=()=>{ma(),zt("#search-input").value=i.dataset.q,Sf(i.dataset.q)};function bf(){let i=zt("#route-from");i.replaceChildren();for(let t of Vs)i.append(new Option(t.name,`e:${t.id}`));Dt.start.kind==="place"&&i.append(new Option(Dt.start.name,`p:${Dt.start.id}`)),i.append(new Option("\uB2E4\uB978 \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\u2026","pick")),i.value=Dt.start.kind==="entrance"?`e:${Dt.start.id}`:`p:${Dt.start.id}`}zt("#route-from").onchange=i=>{let t=i.target.value;if(t==="pick"){bf(),ma("origin");return}t.startsWith("e:")&&eo(yf(Vs.find(e=>`e:${e.id}`===t))),rs()};zt("#route-to").onclick=()=>ma();zt("#route-swap").onclick=()=>{if(!Dt.dest)return;let i=Dt.start.kind==="place"?en.findDest(Dt.start.id):null;if(!i){da("\uCD9C\uC785\uAD6C\uB294 \uB3C4\uCC29\uC9C0\uB85C \uACE0\uB97C \uC218 \uC5C6\uC5B4\uC694. \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\uD558\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.");return}eo(kl(Dt.dest)),Dt.dest=i,rs()};zt("#route-close").onclick=()=>{Dt.route=null,Dt.dest=null,Me.clearRoute(),Me.select(null),pa("home"),ss(),history.replaceState(null,"",location.pathname+(to.get("from")?`?from=${to.get("from")}`:""))};function Ef(i,t=!0){Dt.mode=i;for(let e of Gs(".seg button"))e.classList.toggle("on",e.dataset.mode===i),e.setAttribute("aria-checked",e.dataset.mode===i);t&&rs()}for(let i of Gs(".seg button"))i.onclick=()=>Ef(i.dataset.mode);function Lm(){let i=new URLSearchParams;i.set("from",Dt.start.id),i.set("to",Dt.dest.key),Dt.mode==="elevator"&&i.set("mode","elevator");let t=new URLSearchParams(location.search);for(let e of["debug","fov","loc"])t.has(e)&&i.set(e,t.get(e));return`${location.pathname}?${i}`}zt("#route-share").onclick=async()=>{let i=new URL(Lm(),location.href).href,t=`\uBBF8\uB798\uAD00 ${Dt.dest.title}\uAE4C\uC9C0 \uAE38\uC548\uB0B4`;try{navigator.share?await navigator.share({title:t,url:i}):(await navigator.clipboard.writeText(i),da("\uACBD\uB85C \uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD588\uC5B4\uC694"))}catch{}};function rs(){let i=Dt.dest;if(!i)return;let t=en.routeTo(Dt.start,i,{mode:Dt.mode});bf(),zt("#route-to").textContent=`${i.title}${i.name?" "+i.name:""}`,pa("route");let e=zt("#route-summary");if(e.replaceChildren(),zt("#route-steps").replaceChildren(),!t){Dt.route=null,Me.clearRoute(),e.append(Oe("span","warn","\uACBD\uB85C\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.")),zt("#ar-open").disabled=zt("#walk-open").disabled=!0,ss();return}zt("#ar-open").disabled=zt("#walk-open").disabled=!1,Dt.route=t,Dt.steps=$s(t,i,{landmarks:en.destinations}),Dt.focusStep=null,history.replaceState(null,"",Lm()),e.append(Oe("b","",`${Math.round(t.len)}m`),Oe("span","",`\uC57D ${va(t.len)}`));for(let r of Dt.steps)(r.kind==="stair"||r.kind==="elev")&&e.append(Oe("span","chip "+r.kind,`${r.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"} ${$e(r.f)}\u2192${$e(r.to)}`));let n=Dt.steps.filter(r=>r.kind==="stair").map(r=>`${$e(r.f)}\u2192${$e(r.to)}`).join(", "),s=[];t.preferElev&&s.push("3\uAC1C \uCE35 \uC774\uC0C1\uC774\uB77C \uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C \uC548\uB0B4\uD574\uC694"),(Dt.mode==="elevator"||t.preferElev)&&t.stairFloors&&s.push(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uAC00 \uB2FF\uC9C0 \uC54A\uB294 ${n} \uAD6C\uAC04\uB9CC \uACC4\uB2E8\uC744 \uC774\uC6A9\uD574\uC694`),s.length&&e.append(Oe("span","note",s.join(" \xB7 "))),WM(),zt("#sheet").scrollTop=0,Me.showRoute(t,i,Dt.steps),Me.floor!==t.pts[0].f&&Me.setFloor(t.pts[0].f),Me.setMe(Dt.start),Dm(),ss()}function VM(){return innerWidth>=820?0:zt("#sheet").classList.contains("collapsed")?64:zt("#sheet").offsetHeight}function Dm(){let i=Dt.route.pts.filter(o=>o.f===Me.floor),t=i.length?i:Dt.route.pts,e=1/0,n=-1/0,s=1/0,r=-1/0;for(let o of t)e=Math.min(e,o.x),n=Math.max(n,o.x),s=Math.min(s,o.y),r=Math.max(r,o.y);Me.fit(e,s,n,r,t[0].f,VM())}async function Nm(){return fa||(fa=await fetch(Hs+"sv.json").then(i=>i.json())),fa}function Um(i,t,e,n,s=3.5,r=45){if(!fa)return null;let o=null;for(let a of fa.shots){if(a.f!==e)continue;let l=Math.hypot(a.x-i,a.y-t);if(l>s)continue;let c=n==null?0:Math.abs(((a.yaw-n)%360+540)%360-180);if(c>r)continue;let h=l+c*.05;(!o||h<o[0])&&(o=[h,a])}return o&&o[1]}var Fm=i=>`${Hs}sv/${String(i.id).padStart(5,"0")}.jpg`;function GM(i){let t=Dt.route,e=Wi(t),n=Ye(t,e,i.s+.3),s=Ye(t,e,i.s+3);return Math.hypot(s.x-n.x,s.y-n.y)>.5?Math.atan2(s.y-n.y,s.x-n.x)*180/Math.PI:null}async function WM(){let i=zt("#route-steps");i.replaceChildren();let t=Dt.steps;await Nm().catch(()=>null),Dt.steps===t&&t.forEach((e,n)=>{let s=Oe("li",e.kind==="stair"||e.kind==="elev"?"vertical":e.kind==="arrive"?"goal":"");s.dataset.i=n;let r=Oe("span","ico",Cm[e.dir]||"\u2022");n&&e.kind!=="arrive"&&r.append(Oe("i","num",String(n)));let o=Oe("div","txt");o.append(Oe("b","",e.text));let a=[Ze(e.f)];if(e.kind==="start"&&a.push(Dt.start.name),e.sub&&e.kind!=="start"&&a.push(e.sub),o.append(Oe("small","",a.join(" \xB7 "))),s.append(r,o),e.kind!=="arrive"&&e.kind!=="elev"){let l=Um(e.at[0],e.at[1],e.f,GM(e));if(l){let c=Oe("img");c.loading="lazy",c.alt="\uC774 \uC9C0\uC810\uC758 \uC2E4\uC81C \uBAA8\uC2B5",c.src=Fm(l),s.append(c)}}s.onclick=()=>XM(n),i.append(s)})}function XM(i){let t=Dt.steps[i];Dt.focusStep=i;for(let e of Gs("#route-steps li"))e.classList.toggle("on",+e.dataset.i===i);Me.highlightStep(i),t.f!==Me.floor&&vf(t.f),Me.focus(t.at[0],t.at[1],t.f,32),ss(),innerWidth<820&&zt("#sheet").classList.add("collapsed")}function Om(){for(let i of Gs(".voice-btn"))i.hidden=!Xe.supported,i.classList.toggle("on",Xe.on),i.setAttribute("aria-pressed",Xe.on),i.textContent=Xe.on?"\u{1F50A}":"\u{1F508}",i.title=Xe.on?"\uC74C\uC131 \uC548\uB0B4 \uB044\uAE30":"\uC74C\uC131 \uC548\uB0B4 \uCF1C\uAE30"}for(let i of Gs(".voice-btn"))i.onclick=()=>{Xe.on=!Xe.on,Om(),Xe.on&&Xe.say("\uC74C\uC131 \uC548\uB0B4\uB97C \uCF30\uC5B4\uC694")};var qM=3.2,xe=null;zt("#walk-open").onclick=async()=>{if(!Dt.route)return;await Nm().catch(()=>null);let i=Dt.route,t=Wi(i),e=t[t.length-1];xe={s:0,s0:0,cum:t,total:e,end:Math.max(0,e-qM),yaw:null,last:performance.now(),shot:null,playing:!0,speed:1,step:-1,lift:null,liftDone:new Set};let n=Dt.focusStep;if(n!=null&&Dt.steps[n]){let s=n>0?Dt.steps[n-1].s:0;xe.s0=Math.min(xe.end,Math.max(s,n>0?Dt.steps[n].s-2:0)),xe.s=xe.s0,Tf(xe)}zt("#walk").hidden=!1;for(let s of["#sheet",".topbar","#floors",".map-tools"])zt(s).hidden=!0;Me.setFirstPerson(!0),zl(),requestAnimationFrame(km)};function Tf(i){for(let t of Dt.steps)t.kind==="elev"&&t.s<i.s&&i.liftDone.add(t.s)}function YM(){xe?.lift?.close(),xe=null,Xe.supported&&speechSynthesis.cancel(),zt("#walk").hidden=!0;for(let i of["#sheet",".topbar","#floors",".map-tools"])zt(i).hidden=!1;if(Me.setFirstPerson(!1),Dt.route){let i=Dt.route.pts[Dt.route.pts.length-1].f;i!==Me.floor&&Me.setFloor(i)}ss()}function zl(){xe&&(zt("#walk-play").textContent=xe.playing?"\u275A\u275A":"\u25B6",zt("#walk-play").setAttribute("aria-label",xe.playing?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD"),zt("#walk-speed").textContent=`${xe.speed}\xD7`)}zt("#walk-close").onclick=YM;zt("#walk-play").onclick=()=>{xe&&(xe.s>=xe.end-.05&&(xe.s=xe.s0,xe.liftDone.clear(),Tf(xe),xe.yaw=null),xe.playing=!xe.playing,zl())};zt("#walk-speed").onclick=()=>{xe&&(xe.speed=xe.speed===1?2:xe.speed===2?4:1,zl())};function Bm(i){if(!xe||xe.lift)return;let t=Math.max(0,Math.min(Dt.steps.length-1,ql(Dt.steps,xe.s)+i));xe.s=Math.min(xe.end,Dt.steps[t].s+.01),Tf(xe),xe.yaw=null}zt("#walk-prev").onclick=()=>Bm(-1);zt("#walk-next").onclick=()=>Bm(1);function km(i){if(!xe)return;let t=xe,e=Dt.route,n=Dt.steps,s=Math.min(.05,(i-t.last)/1e3);if(t.last=i,t.playing&&!t.lift){let p=Ye(e,t.cum,t.s),S=e.pts[p.i]?.kind==="stair",y=Math.min(t.end,t.s+s*t.speed*(S?1.3:2.4)),_=n.find(w=>w.kind==="elev"&&w.s>=t.s-1e-6&&w.s<=y&&!t.liftDone.has(w.s));_&&(y=_.s,t.liftDone.add(_.s),Xe.say(_.text),t.lift=Ll({from:_.f,to:_.to,title:`${$e(_.to)}\uB85C \uC774\uB3D9 \uC911`,hint:_.sub}),t.lift.finished.then(()=>{xe===t&&(t.lift=null,t.s=_.s+.02,t.yaw=null)})),t.s=y}let r=Ye(e,t.cum,t.s),o=Ye(e,t.cum,Math.min(t.total,t.s+2.2)),a=e.pts[e.pts.length-1],l=t.end-t.s<3&&Math.hypot(a.x-r.x,a.y-r.y)>.3?Math.atan2(a.y-r.y,a.x-r.x)*180/Math.PI:Math.hypot(o.x-r.x,o.y-r.y)>.3?Math.atan2(o.y-r.y,o.x-r.x)*180/Math.PI:t.yaw??90;t.yaw==null&&(t.yaw=l);let c=((l-t.yaw)%360+540)%360-180;t.yaw+=c*Math.min(1,s*3.2),Me.setWalkPose({x:r.x,y:r.y,z:r.z,f:r.f,yaw:t.yaw,pitch:-.1}),zt("#walk-bar").style.width=`${t.s/Math.max(.01,t.end)*100}%`;let h=io(n,e,t.cum,t.s),u=ql(n,t.s);u!==t.step&&(t.step=u,u>0&&n[u].kind!=="elev"&&Xe.say(n[u].text));let f=t.s>=t.end-.05,d=zt("#walk-step");d.replaceChildren();let g=Oe("div");g.append(Oe("b","",f?`${Dt.dest.title} \uB3C4\uCC29`:h.dist<3?`\uC9C0\uAE08 ${h.step.action}`:`${Math.round(h.dist)}m \uC55E ${h.step.kind==="arrive"?Dt.dest.title:h.step.action}`),Oe("small","",`${Ze(r.f)} \xB7 ${n[u].text}`)),d.append(Oe("div","hud-arrow",Cm[f?"arrive":h.step.dir]||"\u2191"),g);let x=Um(r.x,r.y,r.f,t.yaw,3,40),m=zt("#walk-photo");x&&!t.lift?(t.shot!==x.id&&(t.shot=x.id,m.querySelector("img").src=Fm(x)),m.hidden=!1):m.hidden=!0,f&&t.playing&&(t.playing=!1,zl(),Xe.say(`${Dt.dest.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`)),requestAnimationFrame(km)}function zm(i){Dt.route&&Rm({indoor:en,route:Dt.route,steps:Dt.steps,dest:Dt.dest,mode:Dt.mode,demo:i,assets:Hs,onDemo:wf,onRoute:(t,e)=>{Dt.route=t,Dt.steps=e,Me.showRoute(t,Dt.dest,e)}})}zt("#ar-open").onclick=()=>zm(!1);zt("#demo-open").onclick=wf;async function wf(){let i=await fetch(Hs+"demo.json").then(e=>e.json()),t=Vs.find(e=>e.id===i.from)||Vs[0];eo(yf(t)),Dt.dest=en.findDest(i.to),Ef("stairs",!1),rs(),zm(!0)}BM().catch(i=>{console.error(i);let t=zt("#loading");t.querySelector("b").textContent=`\uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694: ${i.message||i}`;let e=Oe("button","primary-btn","\uB2E4\uC2DC \uC2DC\uB3C4");e.onclick=()=>location.reload(),t.append(e)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
