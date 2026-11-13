(()=>{var Um=Object.defineProperty;var kl=(i,t)=>()=>(i&&(t=i(i=0)),t);var Fm=(i,t)=>{for(var e in t)Um(i,e,{get:t[e],enumerable:!0})};function Dn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]+"-"+ln[t&255]+ln[t>>8&255]+"-"+ln[t>>16&15|64]+ln[t>>24&255]+"-"+ln[e&63|128]+ln[e>>8&255]+"-"+ln[e>>16&255]+ln[e>>24&255]+ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]).toLowerCase()}function oe(i,t,e){return Math.max(t,Math.min(e,i))}function Qh(i,t){return(i%t+t)%t}function Xm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function qm(i,t,e){return i!==t?(e-i)/(t-i):0}function uo(i,t,e){return(1-e)*i+e*t}function Ym(i,t,e,n){return uo(i,t,1-Math.exp(-e*n))}function $m(i,t=1){return t-Math.abs(Qh(i,t*2)-t)}function Zm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Km(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function jm(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Jm(i,t){return i+Math.random()*(t-i)}function Qm(i){return i*(.5-Math.random())}function tg(i){i!==void 0&&(Af=i);let t=Af+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function eg(i){return i*cr}function ng(i){return i*ds}function ig(i){return(i&i-1)===0&&i!==0}function sg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function rg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function og(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}function tu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function rp(){let i=dr("canvas");return i.style.display="block",i}function pr(i){i in Cf||(Cf[i]=!0,console.warn(i))}function op(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ag(){let i={enabled:!0,workingColorSpace:rn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Te&&(s.r=yi(s.r),s.g=yi(s.g),s.b=yi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Te&&(s.r=lr(s.r),s.g=lr(s.g),s.b=lr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ri?mo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return pr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return pr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[rn]:{primaries:t,whitePoint:n,transfer:mo,toXYZ:If,fromXYZ:Pf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:n,transfer:Te,toXYZ:If,fromXYZ:Pf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),i}function yi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function lr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function ql(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?tc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function $l(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){rs.fromArray(i,r);let a=s.x*Math.abs(rs.x)+s.y*Math.abs(rs.y)+s.z*Math.abs(rs.z),c=t.dot(rs),l=e.dot(rs),h=n.dot(rs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}function ah(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}function vg(i,t,e,n,s,r,o,a){let c;if(t.side===on?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Yn,a),c===null)return null;Pa.copy(a),Pa.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Pa);return l<e.near||l>e.far?null:{distance:l,point:Pa.clone(),object:i}}function La(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Aa),i.getVertexPosition(c,Ra),i.getVertexPosition(l,Ca);let h=vg(i,t,e,n,Aa,Ra,Ca,Vf);if(h){let u=new P;ti.getBarycoord(Vf,Aa,Ra,Ca,u),s&&(h.uv=ti.getInterpolatedAttribute(s,a,c,l,u,new At)),r&&(h.uv1=ti.getInterpolatedAttribute(r,a,c,l,u,new At)),o&&(h.normal=ti.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new P,materialIndex:0};ti.getNormal(Aa,Ra,Ca,f.normal),h.face=f,h.barycoord=u}return h}function Rs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function dn(i){let t={};for(let e=0;e<i.length;e++){let n=Rs(i[e]);for(let s in n)t[s]=n[s]}return t}function Mg(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function eu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}function Ua(i,t,e,n,s,r){rr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(so.x=r*rr.x-s*rr.y,so.y=s*rr.x+r*rr.y):so.copy(rr),i.copy(t),i.x+=so.x,i.y+=so.y,i.applyMatrix4(lp)}function za(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(rc.fromBufferAttribute(a,s),oc.fromBufferAttribute(a,r),e.distanceSqToSegment(rc,oc,ph,nd)>n)return;ph.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ph);if(!(l<t.near||l>t.far))return{distance:l,point:nd.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}function od(i,t,e,n,s,r,o){let a=Ah.distanceSqToPoint(i);if(a<e){let c=new P;Ah.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}function nu(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}function ad(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Pg(i,t){let e=1-i;return e*e*t}function Lg(i,t){return 2*(1-i)*i*t}function Dg(i,t){return i*i*t}function fo(i,t,e,n){return Pg(i,t)+Lg(i,e)+Dg(i,n)}function Ng(i,t){let e=1-i;return e*e*e*t}function Ug(i,t){let e=1-i;return 3*e*e*i*t}function Fg(i,t){return 3*(1-i)*i*i*t}function Og(i,t){return i*i*i*t}function po(i,t,e,n,s){return Ng(i,t)+Ug(i,e)+Fg(i,n)+Og(i,s)}function Bg(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=hp(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=Gg(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){let d=i[f],g=i[f+1];d<a&&(a=d),g<c&&(c=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Fo(r,o,e,a,c,l,0),o}function hp(i,t,e,n,s){let r;if(s===t0(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=ld(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=ld(o/n|0,i[o],i[o+1],r);return r&&Er(r,r.next)&&(Bo(r),r=r.next),r}function ys(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Er(e,e.next)||ze(e.prev,e,e.next)===0)){if(Bo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Fo(i,t,e,n,s,r,o){if(!i)return;!o&&r&&$g(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?zg(i,n,s,r):kg(i)){t.push(c.i,i.i,l.i),Bo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Hg(ys(i),t),Fo(i,t,e,n,s,r,2)):o===2&&Vg(i,t,e,n,s,r):Fo(ys(i),t,e,n,s,r,1);break}}}function kg(i){let t=i.prev,e=i,n=i.next;if(ze(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&ho(s,a,r,c,o,l,g.x,g.y)&&ze(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function zg(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ze(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),g=Math.min(h,u,f),x=Math.max(a,c,l),m=Math.max(h,u,f),p=Rh(d,g,t,e,n),b=Rh(x,m,t,e,n),y=i.prevZ,_=i.nextZ;for(;y&&y.z>=p&&_&&_.z<=b;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&ho(a,h,c,u,l,f,y.x,y.y)&&ze(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ho(a,h,c,u,l,f,_.x,_.y)&&ze(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&ho(a,h,c,u,l,f,y.x,y.y)&&ze(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=b;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ho(a,h,c,u,l,f,_.x,_.y)&&ze(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Hg(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Er(n,s)&&fp(n,e,e.next,s)&&Oo(n,s)&&Oo(s,n)&&(t.push(n.i,e.i,s.i),Bo(e),Bo(e.next),e=i=s),e=e.next}while(e!==i);return ys(e)}function Vg(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&jg(o,a)){let c=dp(o,a);o=ys(o,o.next),c=ys(c,c.next),Fo(o,t,e,n,s,r,0),Fo(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Gg(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=hp(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Kg(l))}s.sort(Wg);for(let r=0;r<s.length;r++)e=Xg(s[r],e);return e}function Wg(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Xg(i,t){let e=qg(i,t);if(!e)return t;let n=dp(e,i);return ys(n,n.next),ys(e,e.next)}function qg(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Er(i,e))return e;do{if(Er(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&up(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);Oo(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Yg(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function Yg(i,t){return ze(i.prev,i,t.prev)<0&&ze(t.next,i,i.next)<0}function $g(i,t,e,n){let s=i;do s.z===0&&(s.z=Rh(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Zg(s)}function Zg(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Rh(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Kg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function up(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function ho(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&up(i,t,e,n,s,r,o,a)}function jg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Jg(i,t)&&(Oo(i,t)&&Oo(t,i)&&Qg(i,t)&&(ze(i.prev,i,t.prev)||ze(i,t.prev,t))||Er(i,t)&&ze(i.prev,i,i.next)>0&&ze(t.prev,t,t.next)>0)}function ze(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Er(i,t){return i.x===t.x&&i.y===t.y}function fp(i,t,e,n){let s=$a(ze(i,t,e)),r=$a(ze(i,t,n)),o=$a(ze(e,n,i)),a=$a(ze(e,n,t));return!!(s!==r&&o!==a||s===0&&Ya(i,e,t)||r===0&&Ya(i,n,t)||o===0&&Ya(e,i,n)||a===0&&Ya(e,t,n))}function Ya(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function $a(i){return i>0?1:i<0?-1:0}function Jg(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&fp(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Oo(i,t){return ze(i.prev,i,i.next)<0?ze(i,t,i.next)>=0&&ze(i,i.prev,t)>=0:ze(i,t,i.prev)<0||ze(i,i.next,t)<0}function Qg(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function dp(i,t){let e=Ch(i.i,i.x,i.y),n=Ch(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ld(i,t,e,n){let s=Ch(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Bo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ch(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function t0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}function hd(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ud(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}function e0(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}function Za(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function n0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function i0(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function fd(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=i[a+c]}return s}function pp(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}function s0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return oi;case"vector":case"vector2":case"vector3":case"vector4":return ci;case"color":return zo;case"quaternion":return ai;case"bool":case"boolean":return Si;case"string":return bi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function r0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=s0(i.type);if(i.times===void 0){let e=[],n=[];pp(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}function _d(i,t){return i.distance-t.distance}function Fh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Fh(r[o],t,e,!0)}}function ru(i,t,e,n){let s=p0(n);switch(e){case Yh:return i*t;case Bc:return i*t/s.components*s.byteLength;case kc:return i*t/s.components*s.byteLength;case Zh:return i*t*2/s.components*s.byteLength;case zc:return i*t*2/s.components*s.byteLength;case $h:return i*t*3/s.components*s.byteLength;case In:return i*t*4/s.components*s.byteLength;case Hc:return i*t*4/s.components*s.byteLength;case Zo:case Ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jo:case Jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Gc:case Xc:return Math.max(i,16)*Math.max(t,8)/4;case Vc:case Wc:return Math.max(i,8)*Math.max(t,8)/2;case qc:case Yc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case $c:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Zc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Kc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case jc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Jc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Qc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case tl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case el:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case nl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case il:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case sl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case rl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ol:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case al:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case cl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ll:case hl:case ul:return Math.ceil(i/4)*Math.ceil(t/4)*16;case fl:case dl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case pl:case ml:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function p0(i){switch(i){case Kn:case Gh:return{byteLength:1,components:1};case Rr:case Wh:case Cr:return{byteLength:2,components:1};case Fc:case Oc:return{byteLength:2,components:4};case Zi:case Uc:case Bn:return{byteLength:4,components:1};case Xh:case qh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var On,bn,xd,Oh,yd,Bh,vd,hi,Yn,on,Be,wi,ls,kh,zh,Hh,Md,Vi,Sd,bd,Ed,Td,wd,Ad,Rd,Cd,ja,Ja,Id,Pd,Ld,Dd,Nd,Ud,Fd,Od,Bd,bc,Ec,Tc,hs,wc,Ac,Rc,Cc,Ic,kd,zd,Ai,Hd,Vd,Gd,Wd,Xd,qd,Pc,Sh,Yd,Vh,Ts,ws,Lc,Dc,$o,Nn,ei,ur,sn,Nc,As,gn,Ar,Zn,Kn,Gh,Wh,Rr,Uc,Zi,Bn,Cr,Fc,Oc,Ir,Xh,qh,Yh,$h,In,fr,Pr,Bc,kc,Zh,zc,Hc,Zo,Ko,jo,Jo,Vc,Gc,Wc,Xc,qc,Yc,$c,Zc,Kc,jc,Jc,Qc,tl,el,nl,il,sl,rl,ol,al,cl,ll,hl,ul,fl,dl,pl,ml,us,fs,Ka,bh,Eh,Th,$d,Kh,Qo,Lr,Zd,Kd,gl,jd,Ri,Fe,rn,mo,Te,cs,wh,Jd,Qd,tp,jh,ep,np,ip,sp,Qa,Jh,qn,go,ii,ln,Af,cr,ds,ta,At,_n,P,Wl,Rf,re,Xl,Cf,If,Pf,de,Ws,tc,cg,mr,lg,Yl,je,ye,ec,Un,_o,nc,An,di,Vn,_a,Xs,qs,Ys,Fi,Oi,ss,Qr,xa,ya,rs,hg,to,Zl,vn,pi,Kl,va,Bi,jl,Ma,Jl,si,ee,$s,Gn,ug,fg,ki,Sa,Tn,Lf,Df,Fn,gr,dg,Nf,Zs,mi,ba,eo,pg,mg,Uf,Ff,Of,Bf,gg,Ks,Ql,we,Wn,gi,th,_i,js,Js,kf,eh,nh,ih,sh,rh,oh,ti,ap,zi,Ea,Qt,hn,_g,un,Oe,$e,Ta,xg,Le,xo,yo,ve,yg,Ln,ch,Qs,wn,no,en,Pe,zf,os,wa,Hf,Aa,Ra,Ca,lh,Ia,Vf,Pa,se,Gi,cp,Sg,bg,Rn,vo,Hi,Gf,Wf,ke,tr,er,ic,Mo,sc,Ze,Eg,_r,$n,ps,mn,Wi,xr,nr,io,ir,sr,rr,so,lp,Da,ro,Na,Xf,hh,qf,So,Yf,$f,Zf,Tg,Kf,Fa,uh,jf,fh,bo,yr,Eo,Jf,wg,To,Xi,or,Qf,Oa,td,Ag,oo,ao,ms,dh,Rg,Cg,yn,as,Ig,Ba,vr,qi,rc,oc,ed,co,ka,ph,nd,gs,id,sd,_s,wo,Mr,rd,Ah,Ha,Va,Ao,Yi,Ro,Co,ri,ac,xs,Ga,Wa,mh,Xa,Io,Cn,Sr,cc,qa,gh,_h,xh,lc,Po,hc,Lo,uc,Do,fc,No,cd,dc,Uo,br,Ih,hr,vs,ko,$i,fn,Mn,vi,pc,mc,Mi,gc,_c,xc,Sn,Si,zo,oi,yc,ai,bi,ci,Ho,ni,vc,mp,li,xi,Ph,Tr,ar,Mc,Vo,Ms,Ss,yh,dd,pd,Go,Lh,Wo,md,lo,vh,Dh,bs,Ei,Nh,Es,Ti,Mh,Xo,Sc,iu,o0,su,a0,c0,l0,h0,u0,f0,d0,Uh,Ie,kM,gd,qo,wr,Yo,ou=kl(()=>{On={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},bn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},xd=0,Oh=1,yd=2,Bh=1,vd=2,hi=3,Yn=0,on=1,Be=2,wi=0,ls=1,kh=2,zh=3,Hh=4,Md=5,Vi=100,Sd=101,bd=102,Ed=103,Td=104,wd=200,Ad=201,Rd=202,Cd=203,ja=204,Ja=205,Id=206,Pd=207,Ld=208,Dd=209,Nd=210,Ud=211,Fd=212,Od=213,Bd=214,bc=0,Ec=1,Tc=2,hs=3,wc=4,Ac=5,Rc=6,Cc=7,Ic=0,kd=1,zd=2,Ai=0,Hd=1,Vd=2,Gd=3,Wd=4,Xd=5,qd=6,Pc=7,Sh="attached",Yd="detached",Vh=300,Ts=301,ws=302,Lc=303,Dc=304,$o=306,Nn=1e3,ei=1001,ur=1002,sn=1003,Nc=1004,As=1005,gn=1006,Ar=1007,Zn=1008,Kn=1009,Gh=1010,Wh=1011,Rr=1012,Uc=1013,Zi=1014,Bn=1015,Cr=1016,Fc=1017,Oc=1018,Ir=1020,Xh=35902,qh=35899,Yh=1021,$h=1022,In=1023,fr=1026,Pr=1027,Bc=1028,kc=1029,Zh=1030,zc=1031,Hc=1033,Zo=33776,Ko=33777,jo=33778,Jo=33779,Vc=35840,Gc=35841,Wc=35842,Xc=35843,qc=36196,Yc=37492,$c=37496,Zc=37808,Kc=37809,jc=37810,Jc=37811,Qc=37812,tl=37813,el=37814,nl=37815,il=37816,sl=37817,rl=37818,ol=37819,al=37820,cl=37821,ll=36492,hl=36494,ul=36495,fl=36283,dl=36284,pl=36285,ml=36286,us=2300,fs=2301,Ka=2302,bh=2400,Eh=2401,Th=2402,$d=2500,Kh=0,Qo=1,Lr=2,Zd=3200,Kd=3201,gl=0,jd=1,Ri="",Fe="srgb",rn="srgb-linear",mo="linear",Te="srgb",cs=7680,wh=519,Jd=512,Qd=513,tp=514,jh=515,ep=516,np=517,ip=518,sp=519,Qa=35044,Jh="300 es",qn=2e3,go=2001,ii=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Af=1234567,cr=Math.PI/180,ds=180/Math.PI;ta={DEG2RAD:cr,RAD2DEG:ds,generateUUID:Dn,clamp:oe,euclideanModulo:Qh,mapLinear:Xm,inverseLerp:qm,lerp:uo,damp:Ym,pingpong:$m,smoothstep:Zm,smootherstep:Km,randInt:jm,randFloat:Jm,randFloatSpread:Qm,seededRandom:tg,degToRad:eg,radToDeg:ng,isPowerOfTwo:ig,ceilPowerOfTwo:sg,floorPowerOfTwo:rg,setQuaternionFromProperEuler:og,normalize:Ee,denormalize:Xn},At=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_n=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==f||l!==d||h!==g){let m=1-a,p=c*f+l*d+h*g+u*x,b=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let A=Math.sqrt(y),R=Math.atan2(A,p*b);m=Math.sin(m*R)/A,a=Math.sin(a*R)/A}let _=a*b;if(c=c*m+f*_,l=l*m+d*_,h=h*m+g*_,u=u*m+x*_,m===1-a){let A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Rf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Rf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Wl.copy(this).projectOnVector(t),this.sub(Wl)}reflect(t){return this.sub(Wl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Wl=new P,Rf=new _n,re=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=s[0],m=s[3],p=s[6],b=s[1],y=s[4],_=s[7],A=s[2],R=s[5],C=s[8];return r[0]=o*x+a*b+c*A,r[3]=o*m+a*y+c*R,r[6]=o*p+a*_+c*C,r[1]=l*x+h*b+u*A,r[4]=l*m+h*y+u*R,r[7]=l*p+h*_+u*C,r[2]=f*x+d*b+g*A,r[5]=f*m+d*y+g*R,r[8]=f*p+d*_+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xl.makeScale(t,e)),this}rotate(t){return this.premultiply(Xl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Xl=new re;Cf={};If=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pf=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);de=ag();tc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ws===void 0&&(Ws=dr("canvas")),Ws.width=t.width,Ws.height=t.height;let s=Ws.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ws}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=dr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=yi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yi(e[n]/255)*255):e[n]=yi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},cg=0,mr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=Dn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ql(s[o].image)):r.push(ql(s[o]))}else r=ql(s);n.url=r}return e||(t.images[this.uuid]=n),n}};lg=0,Yl=new P,je=class i extends ii{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ei,s=ei,r=gn,o=Zn,a=In,c=Kn,l=i.DEFAULT_ANISOTROPY,h=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Dn(),this.name="",this.source=new mr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Yl).x}get height(){return this.source.getSize(Yl).y}get depth(){return this.source.getSize(Yl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Nn:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case ur:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Nn:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case ur:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=Vh;je.DEFAULT_ANISOTROPY=1;ye=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,_=(d+1)/2,A=(p+1)/2,R=(h+f)/4,C=(u+x)/4,L=(g+m)/4;return y>_&&y>A?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=R/n,r=C/n):_>A?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=R/s,r=L/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=L/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-x)/b,this.z=(f-h)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ec=class extends ii{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new je(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new mr(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Un=class extends ec{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},_o=class extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},nc=class extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},An=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_a.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_a.copy(n.boundingBox)),_a.applyMatrix4(t.matrixWorld),this.union(_a)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qr),xa.subVectors(this.max,Qr),Xs.subVectors(t.a,Qr),qs.subVectors(t.b,Qr),Ys.subVectors(t.c,Qr),Fi.subVectors(qs,Xs),Oi.subVectors(Ys,qs),ss.subVectors(Xs,Ys);let e=[0,-Fi.z,Fi.y,0,-Oi.z,Oi.y,0,-ss.z,ss.y,Fi.z,0,-Fi.x,Oi.z,0,-Oi.x,ss.z,0,-ss.x,-Fi.y,Fi.x,0,-Oi.y,Oi.x,0,-ss.y,ss.x,0];return!$l(e,Xs,qs,Ys,xa)||(e=[1,0,0,0,1,0,0,0,1],!$l(e,Xs,qs,Ys,xa))?!1:(ya.crossVectors(Fi,Oi),e=[ya.x,ya.y,ya.z],$l(e,Xs,qs,Ys,xa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},di=[new P,new P,new P,new P,new P,new P,new P,new P],Vn=new P,_a=new An,Xs=new P,qs=new P,Ys=new P,Fi=new P,Oi=new P,ss=new P,Qr=new P,xa=new P,ya=new P,rs=new P;hg=new An,to=new P,Zl=new P,vn=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):hg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;to.subVectors(t,this.center);let e=to.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(to,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(to.copy(t.center).add(Zl)),this.expandByPoint(to.copy(t.center).sub(Zl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},pi=new P,Kl=new P,va=new P,Bi=new P,jl=new P,Ma=new P,Jl=new P,si=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(pi.copy(this.origin).addScaledVector(this.direction,e),pi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Kl.copy(t).add(e).multiplyScalar(.5),va.copy(e).sub(t).normalize(),Bi.copy(this.origin).sub(Kl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(va),a=Bi.dot(this.direction),c=-Bi.dot(va),l=Bi.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Kl).addScaledVector(va,f),d}intersectSphere(t,e){pi.subVectors(t.center,this.origin);let n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,pi)!==null}intersectTriangle(t,e,n,s,r){jl.subVectors(e,t),Ma.subVectors(n,t),Jl.crossVectors(jl,Ma);let o=this.direction.dot(Jl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bi.subVectors(this.origin,t);let c=a*this.direction.dot(Ma.crossVectors(Bi,Ma));if(c<0)return null;let l=a*this.direction.dot(jl.cross(Bi));if(l<0||c+l>o)return null;let h=-a*Bi.dot(Jl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ee=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,x,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/$s.setFromMatrixColumn(t,0).length(),r=1/$s.setFromMatrixColumn(t,1).length(),o=1/$s.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-x*l,e[9]=-a*c,e[2]=x-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,x=l*u;e[0]=f+x*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=x+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,x=l*u;e[0]=f-x*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+x,e[1]=c*u,e[5]=x*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-x*u}else if(t.order==="XZY"){let f=o*c,d=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+x,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ug,t,fg)}lookAt(t,e,n){let s=this.elements;return Tn.subVectors(t,e),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),ki.crossVectors(n,Tn),ki.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),ki.crossVectors(n,Tn)),ki.normalize(),Sa.crossVectors(Tn,ki),s[0]=ki.x,s[4]=Sa.x,s[8]=Tn.x,s[1]=ki.y,s[5]=Sa.y,s[9]=Tn.y,s[2]=ki.z,s[6]=Sa.z,s[10]=Tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],b=n[3],y=n[7],_=n[11],A=n[15],R=s[0],C=s[4],L=s[8],M=s[12],S=s[1],U=s[5],V=s[9],J=s[13],Y=s[2],st=s[6],$=s[10],F=s[14],I=s[3],X=s[7],j=s[11],et=s[15];return r[0]=o*R+a*S+c*Y+l*I,r[4]=o*C+a*U+c*st+l*X,r[8]=o*L+a*V+c*$+l*j,r[12]=o*M+a*J+c*F+l*et,r[1]=h*R+u*S+f*Y+d*I,r[5]=h*C+u*U+f*st+d*X,r[9]=h*L+u*V+f*$+d*j,r[13]=h*M+u*J+f*F+d*et,r[2]=g*R+x*S+m*Y+p*I,r[6]=g*C+x*U+m*st+p*X,r[10]=g*L+x*V+m*$+p*j,r[14]=g*M+x*J+m*F+p*et,r[3]=b*R+y*S+_*Y+A*I,r[7]=b*C+y*U+_*st+A*X,r[11]=b*L+y*V+_*$+A*j,r[15]=b*M+y*J+_*F+A*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+x*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],x=t[13],m=t[14],p=t[15],b=u*m*l-x*f*l+x*c*d-a*m*d-u*c*p+a*f*p,y=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,_=h*x*l-g*u*l+g*a*d-o*x*d-h*a*p+o*u*p,A=g*u*c-h*x*c-g*a*f+o*x*f+h*a*m-o*u*m,R=e*b+n*y+s*_+r*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/R;return t[0]=b*C,t[1]=(x*f*r-u*m*r-x*s*d+n*m*d+u*s*p-n*f*p)*C,t[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*C,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*C,t[4]=y*C,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*C,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*C,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*C,t[8]=_*C,t[9]=(g*u*r-h*x*r-g*n*d+e*x*d+h*n*p-e*u*p)*C,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*C,t[12]=A*C,t[13]=(h*x*s-g*u*s+g*n*f-e*x*f-h*n*m+e*u*m)*C,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*m-e*a*m)*C,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,x=o*h,m=o*u,p=a*u,b=c*l,y=c*h,_=c*u,A=n.x,R=n.y,C=n.z;return s[0]=(1-(x+p))*A,s[1]=(d+_)*A,s[2]=(g-y)*A,s[3]=0,s[4]=(d-_)*R,s[5]=(1-(f+p))*R,s[6]=(m+b)*R,s[7]=0,s[8]=(g+y)*C,s[9]=(m-b)*C,s[10]=(1-(f+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=$s.set(s[0],s[1],s[2]).length(),o=$s.set(s[4],s[5],s[6]).length(),a=$s.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Gn.copy(this);let l=1/r,h=1/o,u=1/a;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,e.setFromRotationMatrix(Gn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=qn,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===qn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===go)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=qn,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===qn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===go)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},$s=new P,Gn=new ee,ug=new P(0,0,0),fg=new P(1,1,1),ki=new P,Sa=new P,Tn=new P,Lf=new ee,Df=new _n,Fn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(oe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-oe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Lf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Lf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Df.setFromEuler(this),this.setFromQuaternion(Df,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fn.DEFAULT_ORDER="XYZ";gr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},dg=0,Nf=new P,Zs=new _n,mi=new ee,ba=new P,eo=new P,pg=new P,mg=new _n,Uf=new P(1,0,0),Ff=new P(0,1,0),Of=new P(0,0,1),Bf={type:"added"},gg={type:"removed"},Ks={type:"childadded",child:null},Ql={type:"childremoved",child:null},we=class i extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new Fn,n=new _n,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new re}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zs.setFromAxisAngle(t,e),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(t,e){return Zs.setFromAxisAngle(t,e),this.quaternion.premultiply(Zs),this}rotateX(t){return this.rotateOnAxis(Uf,t)}rotateY(t){return this.rotateOnAxis(Ff,t)}rotateZ(t){return this.rotateOnAxis(Of,t)}translateOnAxis(t,e){return Nf.copy(t).applyQuaternion(this.quaternion),this.position.add(Nf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uf,t)}translateY(t){return this.translateOnAxis(Ff,t)}translateZ(t){return this.translateOnAxis(Of,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ba.copy(t):ba.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),eo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(eo,ba,this.up):mi.lookAt(ba,eo,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),Zs.setFromRotationMatrix(mi),this.quaternion.premultiply(Zs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bf),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gg),Ql.child=t,this.dispatchEvent(Ql),Ql.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mi.multiply(t.parent.matrixWorld)),t.applyMatrix4(mi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bf),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,t,pg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,mg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};we.DEFAULT_UP=new P(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Wn=new P,gi=new P,th=new P,_i=new P,js=new P,Js=new P,kf=new P,eh=new P,nh=new P,ih=new P,sh=new ye,rh=new ye,oh=new ye,ti=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Wn.subVectors(t,e),s.cross(Wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Wn.subVectors(s,e),gi.subVectors(n,e),th.subVectors(t,e);let o=Wn.dot(Wn),a=Wn.dot(gi),c=Wn.dot(th),l=gi.dot(gi),h=gi.dot(th),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return sh.setScalar(0),rh.setScalar(0),oh.setScalar(0),sh.fromBufferAttribute(t,e),rh.fromBufferAttribute(t,n),oh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(sh,r.x),o.addScaledVector(rh,r.y),o.addScaledVector(oh,r.z),o}static isFrontFacing(t,e,n,s){return Wn.subVectors(n,e),gi.subVectors(t,e),Wn.cross(gi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Wn.cross(gi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;js.subVectors(s,n),Js.subVectors(r,n),eh.subVectors(t,n);let c=js.dot(eh),l=Js.dot(eh);if(c<=0&&l<=0)return e.copy(n);nh.subVectors(t,s);let h=js.dot(nh),u=Js.dot(nh);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(js,o);ih.subVectors(t,r);let d=js.dot(ih),g=Js.dot(ih);if(g>=0&&d<=g)return e.copy(r);let x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Js,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return kf.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(kf,a);let p=1/(m+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(js,o).addScaledVector(Js,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ap={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},Ea={h:0,s:0,l:0};Qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=de.workingColorSpace){if(t=Qh(t,1),e=oe(e,0,1),n=oe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ah(o,r,t+1/3),this.g=ah(o,r,t),this.b=ah(o,r,t-1/3)}return de.colorSpaceToWorking(this,s),this}setStyle(t,e=Fe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){let n=ap[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yi(t.r),this.g=yi(t.g),this.b=yi(t.b),this}copyLinearToSRGB(t){return this.r=lr(t.r),this.g=lr(t.g),this.b=lr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return de.workingToColorSpace(hn.copy(this),t),Math.round(oe(hn.r*255,0,255))*65536+Math.round(oe(hn.g*255,0,255))*256+Math.round(oe(hn.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(hn.copy(this),e);let n=hn.r,s=hn.g,r=hn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(hn.copy(this),e),t.r=hn.r,t.g=hn.g,t.b=hn.b,t}getStyle(t=Fe){de.workingToColorSpace(hn.copy(this),t);let e=hn.r,n=hn.g,s=hn.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(zi),this.setHSL(zi.h+t,zi.s+e,zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zi),t.getHSL(Ea);let n=uo(zi.h,Ea.h,e),s=uo(zi.s,Ea.s,e),r=uo(zi.l,Ea.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hn=new Qt;Qt.NAMES=ap;_g=0,un=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=ls,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ja,this.blendDst=Ja,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cs,this.stencilZFail=cs,this.stencilZPass=cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ja&&(n.blendSrc=this.blendSrc),this.blendDst!==Ja&&(n.blendDst=this.blendDst),this.blendEquation!==Vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==cs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==cs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Oe=class extends un{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},$e=new P,Ta=new At,xg=0,Le=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Qa,this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ta.fromBufferAttribute(this,e),Ta.applyMatrix3(t),this.setXY(e,Ta.x,Ta.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix3(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Qa&&(t.usage=this.usage),t}},xo=class extends Le{constructor(t,e,n){super(new Uint16Array(t),e,n)}},yo=class extends Le{constructor(t,e,n){super(new Uint32Array(t),e,n)}},ve=class extends Le{constructor(t,e,n){super(new Float32Array(t),e,n)}},yg=0,Ln=new ee,ch=new we,Qs=new P,wn=new An,no=new An,en=new P,Pe=class i extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(tu(t)?yo:xo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new re().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,n){return Ln.makeTranslation(t,e,n),this.applyMatrix4(Ln),this}scale(t,e,n){return Ln.makeScale(t,e,n),this.applyMatrix4(Ln),this}lookAt(t){return ch.lookAt(t),ch.updateMatrix(),this.applyMatrix4(ch.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ve(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(wn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];no.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(wn.min,no.min),wn.expandByPoint(en),en.addVectors(wn.max,no.max),wn.expandByPoint(en)):(wn.expandByPoint(no.min),wn.expandByPoint(no.max))}wn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)en.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(en));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)en.fromBufferAttribute(a,l),c&&(Qs.fromBufferAttribute(t,l),en.add(Qs)),s=Math.max(s,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Le(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new P,c[L]=new P;let l=new P,h=new P,u=new P,f=new At,d=new At,g=new At,x=new P,m=new P;function p(L,M,S){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),d.sub(f),g.sub(f);let U=1/(d.x*g.y-g.x*d.y);isFinite(U)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(U),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(U),a[L].add(x),a[M].add(x),a[S].add(x),c[L].add(m),c[M].add(m),c[S].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let L=0,M=b.length;L<M;++L){let S=b[L],U=S.start,V=S.count;for(let J=U,Y=U+V;J<Y;J+=3)p(t.getX(J+0),t.getX(J+1),t.getX(J+2))}let y=new P,_=new P,A=new P,R=new P;function C(L){A.fromBufferAttribute(s,L),R.copy(A);let M=a[L];y.copy(M),y.sub(A.multiplyScalar(A.dot(M))).normalize(),_.crossVectors(R,M);let U=_.dot(c[L])<0?-1:1;o.setXYZW(L,y.x,y.y,y.z,U)}for(let L=0,M=b.length;L<M;++L){let S=b[L],U=S.start,V=S.count;for(let J=U,Y=U+V;J<Y;J+=3)C(t.getX(J+0)),C(t.getX(J+1)),C(t.getX(J+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Le(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)en.fromBufferAttribute(t,e),en.normalize(),t.setXYZ(e,en.x,en.y,en.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Le(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},zf=new ee,os=new si,wa=new vn,Hf=new P,Aa=new P,Ra=new P,Ca=new P,lh=new P,Ia=new P,Vf=new P,Pa=new P,se=class extends we{constructor(t=new Pe,e=new Oe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ia.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(lh.fromBufferAttribute(u,t),o?Ia.addScaledVector(lh,h):Ia.addScaledVector(lh.sub(e),h))}e.add(Ia)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(r),os.copy(t.ray).recast(t.near),!(wa.containsPoint(os.origin)===!1&&(os.intersectSphere(wa,Hf)===null||os.origin.distanceToSquared(Hf)>(t.far-t.near)**2))&&(zf.copy(r).invert(),os.copy(t.ray).applyMatrix4(zf),!(n.boundingBox!==null&&os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,os)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=b,A=y;_<A;_+=3){let R=a.getX(_),C=a.getX(_+1),L=a.getX(_+2);s=La(this,p,t,n,l,h,u,R,C,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){let b=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=La(this,o,t,n,l,h,u,b,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let _=b,A=y;_<A;_+=3){let R=_,C=_+1,L=_+2;s=La(this,p,t,n,l,h,u,R,C,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){let b=m,y=m+1,_=m+2;s=La(this,o,t,n,l,h,u,b,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};Gi=class i extends Pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ve(l,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(u,2));function g(x,m,p,b,y,_,A,R,C,L,M){let S=_/C,U=A/L,V=_/2,J=A/2,Y=R/2,st=C+1,$=L+1,F=0,I=0,X=new P;for(let j=0;j<$;j++){let et=j*U-J;for(let Mt=0;Mt<st;Mt++){let ft=Mt*S-V;X[x]=ft*b,X[m]=et*y,X[p]=Y,l.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=R>0?1:-1,h.push(X.x,X.y,X.z),u.push(Mt/C),u.push(1-j/L),F+=1}}for(let j=0;j<L;j++)for(let et=0;et<C;et++){let Mt=f+et+st*j,ft=f+et+st*(j+1),Ut=f+(et+1)+st*(j+1),Lt=f+(et+1)+st*j;c.push(Mt,ft,Lt),c.push(ft,Ut,Lt),I+=6}a.addGroup(d,I,M),d+=I,f+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};cp={clone:Rs,merge:dn},Sg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Rn=class extends un{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sg,this.fragmentShader=bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=Mg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},vo=class extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Hi=new P,Gf=new At,Wf=new At,ke=class extends vo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ds*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(cr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ds*2*Math.atan(Math.tan(cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z)}getViewSize(t,e){return this.getViewBounds(t,Gf,Wf),e.subVectors(Wf,Gf)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(cr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},tr=-90,er=1,ic=class extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ke(tr,er,t,e);s.layers=this.layers,this.add(s);let r=new ke(tr,er,t,e);r.layers=this.layers,this.add(r);let o=new ke(tr,er,t,e);o.layers=this.layers,this.add(o);let a=new ke(tr,er,t,e);a.layers=this.layers,this.add(a);let c=new ke(tr,er,t,e);c.layers=this.layers,this.add(c);let l=new ke(tr,er,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===go)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Mo=class extends je{constructor(t=[],e=Ts,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},sc=class extends Un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Mo(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gi(5,5,5),r=new Rn({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:wi});r.uniforms.tEquirect.value=e;let o=new se(s,r),a=e.minFilter;return e.minFilter===Zn&&(e.minFilter=gn),new ic(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ze=class extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}},Eg={type:"move"},_r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Eg)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},$n=class extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},ps=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Qa,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},mn=new P,Wi=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.applyMatrix4(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.applyNormalMatrix(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.transformDirection(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Xn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Xn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Xn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Xn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Le(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},xr=class extends un{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},io=new P,ir=new P,sr=new P,rr=new At,so=new At,lp=new ee,Da=new P,ro=new P,Na=new P,Xf=new At,hh=new At,qf=new At,So=class extends we{constructor(t=new xr){if(super(),this.isSprite=!0,this.type="Sprite",nr===void 0){nr=new Pe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ps(e,5);nr.setIndex([0,1,2,0,2,3]),nr.setAttribute("position",new Wi(n,3,0,!1)),nr.setAttribute("uv",new Wi(n,2,3,!1))}this.geometry=nr,this.material=t,this.center=new At(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ir.setFromMatrixScale(this.matrixWorld),lp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),sr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ir.multiplyScalar(-sr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Ua(Da.set(-.5,-.5,0),sr,o,ir,s,r),Ua(ro.set(.5,-.5,0),sr,o,ir,s,r),Ua(Na.set(.5,.5,0),sr,o,ir,s,r),Xf.set(0,0),hh.set(1,0),qf.set(1,1);let a=t.ray.intersectTriangle(Da,ro,Na,!1,io);if(a===null&&(Ua(ro.set(-.5,.5,0),sr,o,ir,s,r),hh.set(0,1),a=t.ray.intersectTriangle(Da,Na,ro,!1,io),a===null))return;let c=t.ray.origin.distanceTo(io);c<t.near||c>t.far||e.push({distance:c,point:io.clone(),uv:ti.getInterpolation(io,Da,ro,Na,Xf,hh,qf,new At),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};Yf=new P,$f=new ye,Zf=new ye,Tg=new P,Kf=new ee,Fa=new P,uh=new vn,jf=new ee,fh=new si,bo=class extends se{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sh,this.bindMatrix=new ee,this.bindMatrixInverse=new ee,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new An),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Fa),this.boundingBox.expandByPoint(Fa)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Fa),this.boundingSphere.expandByPoint(Fa)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),uh.copy(this.boundingSphere),uh.applyMatrix4(s),t.ray.intersectsSphere(uh)!==!1&&(jf.copy(s).invert(),fh.copy(t.ray).applyMatrix4(jf),!(this.boundingBox!==null&&fh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,fh)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ye,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Sh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;$f.fromBufferAttribute(s.attributes.skinIndex,t),Zf.fromBufferAttribute(s.attributes.skinWeight,t),Yf.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=Zf.getComponent(r);if(o!==0){let a=$f.getComponent(r);Kf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Tg.copy(Yf).applyMatrix4(Kf),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},yr=class extends we{constructor(){super(),this.isBone=!0,this.type="Bone"}},Eo=class extends je{constructor(t=null,e=1,n=1,s,r,o,a,c,l=sn,h=sn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Jf=new ee,wg=new ee,To=class i{constructor(t=[],e=[]){this.uuid=Dn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ee)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new ee;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:wg;Jf.multiplyMatrices(a,e[r]),Jf.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Eo(e,t,t,In,Bn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new yr),this.bones.push(o),this.boneInverses.push(new ee().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},Xi=class extends Le{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},or=new ee,Qf=new ee,Oa=[],td=new An,Ag=new ee,oo=new se,ao=new vn,ms=class extends se{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Xi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ag)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new An),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,or),td.copy(t.boundingBox).applyMatrix4(or),this.boundingBox.union(td)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,or),ao.copy(t.boundingSphere).applyMatrix4(or),this.boundingSphere.union(ao)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(oo.geometry=this.geometry,oo.material=this.material,oo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ao.copy(this.boundingSphere),ao.applyMatrix4(n),t.ray.intersectsSphere(ao)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,or),Qf.multiplyMatrices(n,or),oo.matrixWorld=Qf,oo.raycast(t,Oa);for(let o=0,a=Oa.length;o<a;o++){let c=Oa[o];c.instanceId=r,c.object=this,e.push(c)}Oa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Xi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Eo(new Float32Array(s*this.count),s,this.count,Bc,Bn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},dh=new P,Rg=new P,Cg=new re,yn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=dh.subVectors(n,e).cross(Rg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(dh),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Cg.getNormalMatrix(t),s=this.coplanarPoint(dh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},as=new vn,Ig=new At(.5,.5),Ba=new P,vr=class{constructor(t=new yn,e=new yn,n=new yn,s=new yn,r=new yn,o=new yn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=qn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],x=r[9],m=r[10],p=r[11],b=r[12],y=r[13],_=r[14],A=r[15];if(s[0].setComponents(l-o,d-h,p-g,A-b).normalize(),s[1].setComponents(l+o,d+h,p+g,A+b).normalize(),s[2].setComponents(l+a,d+u,p+x,A+y).normalize(),s[3].setComponents(l-a,d-u,p-x,A-y).normalize(),n)s[4].setComponents(c,f,m,_).normalize(),s[5].setComponents(l-c,d-f,p-m,A-_).normalize();else if(s[4].setComponents(l-c,d-f,p-m,A-_).normalize(),e===qn)s[5].setComponents(l+c,d+f,p+m,A+_).normalize();else if(e===go)s[5].setComponents(c,f,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(t){as.center.set(0,0,0);let e=Ig.distanceTo(t.center);return as.radius=.7071067811865476+e,as.applyMatrix4(t.matrixWorld),this.intersectsSphere(as)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ba.x=s.normal.x>0?t.max.x:t.min.x,Ba.y=s.normal.y>0?t.max.y:t.min.y,Ba.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ba)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},qi=class extends un{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},rc=new P,oc=new P,ed=new ee,co=new si,ka=new vn,ph=new P,nd=new P,gs=class extends we{constructor(t=new Pe,e=new qi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)rc.fromBufferAttribute(e,s-1),oc.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=rc.distanceTo(oc);t.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(s),ka.radius+=r,t.ray.intersectsSphere(ka)===!1)return;ed.copy(s).invert(),co.copy(t.ray).applyMatrix4(ed);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){let p=h.getX(x),b=h.getX(x+1),y=za(this,t,co,c,p,b,x);y&&e.push(y)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(d),p=za(this,t,co,c,x,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){let p=za(this,t,co,c,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){let x=za(this,t,co,c,g-1,d,g-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};id=new P,sd=new P,_s=class extends gs{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)id.fromBufferAttribute(e,s),sd.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+id.distanceTo(sd);t.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},wo=class extends gs{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Mr=class extends un{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},rd=new ee,Ah=new si,Ha=new vn,Va=new P,Ao=class extends we{constructor(t=new Pe,e=new Mr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ha.copy(n.boundingSphere),Ha.applyMatrix4(s),Ha.radius+=r,t.ray.intersectsSphere(Ha)===!1)return;rd.copy(s).invert(),Ah.copy(t.ray).applyMatrix4(rd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,x=d;g<x;g++){let m=l.getX(g);Va.fromBufferAttribute(u,m),od(Va,m,c,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,x=d;g<x;g++)Va.fromBufferAttribute(u,g),od(Va,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Yi=class extends je{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ro=class extends je{constructor(t,e,n=Zi,s,r,o,a=sn,c=sn,l,h=fr,u=1){if(h!==fr&&h!==Pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new mr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Co=class extends je{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},ri=class i extends Pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new P,h=new At;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ve(o,3)),this.setAttribute("normal",new ve(a,3)),this.setAttribute("uv",new ve(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ac=class i extends Pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,x=[],m=n/2,p=0;b(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ve(u,3)),this.setAttribute("normal",new ve(f,3)),this.setAttribute("uv",new ve(d,2));function b(){let _=new P,A=new P,R=0,C=(e-t)/n;for(let L=0;L<=r;L++){let M=[],S=L/r,U=S*(e-t)+t;for(let V=0;V<=s;V++){let J=V/s,Y=J*c+a,st=Math.sin(Y),$=Math.cos(Y);A.x=U*st,A.y=-S*n+m,A.z=U*$,u.push(A.x,A.y,A.z),_.set(st,C,$).normalize(),f.push(_.x,_.y,_.z),d.push(J,1-S),M.push(g++)}x.push(M)}for(let L=0;L<s;L++)for(let M=0;M<r;M++){let S=x[M][L],U=x[M+1][L],V=x[M+1][L+1],J=x[M][L+1];(t>0||M!==0)&&(h.push(S,U,J),R+=3),(e>0||M!==r-1)&&(h.push(U,V,J),R+=3)}l.addGroup(p,R,0),p+=R}function y(_){let A=g,R=new At,C=new P,L=0,M=_===!0?t:e,S=_===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;let U=g;for(let V=0;V<=s;V++){let Y=V/s*c+a,st=Math.cos(Y),$=Math.sin(Y);C.x=M*$,C.y=m*S,C.z=M*st,u.push(C.x,C.y,C.z),f.push(0,S,0),R.x=st*.5+.5,R.y=$*.5*S+.5,d.push(R.x,R.y),g++}for(let V=0;V<s;V++){let J=A+V,Y=U+V;_===!0?h.push(Y,Y+1,J):h.push(Y+1,Y,J),L+=3}l.addGroup(p,L,_===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},xs=class i extends ac{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ga=new P,Wa=new P,mh=new P,Xa=new ti,Io=class extends Pe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(cr*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:x,b:m,c:p}=Xa;if(x.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),Xa.getNormal(mh),u[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){let y=(b+1)%3,_=u[b],A=u[y],R=Xa[h[b]],C=Xa[h[y]],L=`${_}_${A}`,M=`${A}_${_}`;M in f&&f[M]?(mh.dot(f[M].normal)<=r&&(d.push(R.x,R.y,R.z),d.push(C.x,C.y,C.z)),f[M]=null):L in f||(f[L]={index0:l[b],index1:l[y],normal:mh.clone()})}}for(let g in f)if(f[g]){let{index0:x,index1:m}=f[g];Ga.fromBufferAttribute(a,x),Wa.fromBufferAttribute(a,m),d.push(Ga.x,Ga.y,Ga.z),d.push(Wa.x,Wa.y,Wa.z)}this.setAttribute("position",new ve(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},Cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new At:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new P,s=[],r=[],o=[],a=new P,c=new ee;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(oe(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(oe(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Sr=class extends Cn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new At){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},cc=class extends Sr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};qa=new P,gh=new nu,_h=new nu,xh=new nu,lc=class extends Cn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(qa.subVectors(s[0],s[1]).add(s[0]),l=qa);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(qa.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=qa),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),gh.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,x,m),_h.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,x,m),xh.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(gh.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),_h.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),xh.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(gh.calc(c),_h.calc(c),xh.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Po=class extends Cn{constructor(t=new At,e=new At,n=new At,s=new At){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new At){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(po(t,s.x,r.x,o.x,a.x),po(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},hc=class extends Cn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(po(t,s.x,r.x,o.x,a.x),po(t,s.y,r.y,o.y,a.y),po(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Lo=class extends Cn{constructor(t=new At,e=new At){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new At){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new At){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},uc=class extends Cn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Do=class extends Cn{constructor(t=new At,e=new At,n=new At){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new At){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fo(t,s.x,r.x,o.x),fo(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},fc=class extends Cn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fo(t,s.x,r.x,o.x),fo(t,s.y,r.y,o.y),fo(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},No=class extends Cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new At){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(ad(a,c.x,l.x,h.x,u.x),ad(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new At().fromArray(s))}return this}},cd=Object.freeze({__proto__:null,ArcCurve:cc,CatmullRomCurve3:lc,CubicBezierCurve:Po,CubicBezierCurve3:hc,EllipseCurve:Sr,LineCurve:Lo,LineCurve3:uc,QuadraticBezierCurve:Do,QuadraticBezierCurve3:fc,SplineCurve:No}),dc=class extends Cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new cd[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new cd[s.type]().fromJSON(s))}return this}},Uo=class extends dc{constructor(t){super(),this.type="Path",this.currentPoint=new At,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Lo(this.currentPoint.clone(),new At(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Do(this.currentPoint.clone(),new At(t,e),new At(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Po(this.currentPoint.clone(),new At(t,e),new At(n,s),new At(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new No(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Sr(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},br=class extends Uo{constructor(t){super(t),this.uuid=Dn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Uo().fromJSON(s))}return this}};Ih=class{static triangulate(t,e,n=2){return Bg(t,e,n)}},hr=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];hd(t),ud(n,t);let o=t.length;e.forEach(hd);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,ud(n,e[c]);let a=Ih.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};vs=class i extends Pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let b=p*f-o;for(let y=0;y<l;y++){let _=y*u-r;g.push(_,-b,0),x.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let y=b+l*p,_=b+l*(p+1),A=b+1+l*(p+1),R=b+1+l*p;d.push(y,_,R),d.push(_,A,R)}this.setIndex(d),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(x,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ko=class i extends Pe{constructor(t=new br([new At(0,.5),new At(-.5,-.5),new At(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new ve(s,3)),this.setAttribute("normal",new ve(r,3)),this.setAttribute("uv",new ve(o,2));function l(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,g=f.holes;hr.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){let b=g[m];hr.isClockWise(b)===!0&&(g[m]=b.reverse())}let x=hr.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){let b=g[m];d=d.concat(b)}for(let m=0,p=d.length;m<p;m++){let b=d[m];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,p=x.length;m<p;m++){let b=x[m],y=b[0]+u,_=b[1]+u,A=b[2]+u;n.push(y,_,A),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return e0(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};$i=class i extends Pe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new P,f=new P,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let b=[],y=p/n,_=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let A=0;A<=e;A++){let R=A/e;u.x=-t*Math.cos(s+R*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+R*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(R+_,1-y),b.push(l++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){let y=h[p][b+1],_=h[p][b],A=h[p+1][b],R=h[p+1][b+1];(p!==0||o>0)&&d.push(y,_,R),(p!==n-1||c<Math.PI)&&d.push(_,A,R)}this.setIndex(d),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(x,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},fn=class extends un{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gl,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Mn=class extends fn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new At(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return oe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},vi=class extends un{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gl,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},pc=class extends un{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},mc=class extends un{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};Mi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},gc=class extends Mi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bh,endingEnd:bh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Eh:r=t,a=2*e-n;break;case Th:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Eh:o=t,c=2*n-e;break;case Th:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,b=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*x+.5*g,_=d*m-d*x;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+b*o[l+A]+y*o[c+A]+_*o[u+A];return r}},_c=class extends Mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},xc=class extends Mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Sn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Za(e,this.TimeBufferType),this.values=Za(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Za(t.times,Array),values:Za(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new xc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new _c(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new gc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case us:e=this.InterpolantFactoryMethodDiscrete;break;case fs:e=this.InterpolantFactoryMethodLinear;break;case Ka:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return us;case this.InterpolantFactoryMethodLinear:return fs;case this.InterpolantFactoryMethodSmooth:return Ka}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&n0(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ka,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[f+g]||x!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=fs;Si=class extends Sn{constructor(t,e,n){super(t,e,n)}};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=us;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;zo=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}};zo.prototype.ValueTypeName="color";oi=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}};oi.prototype.ValueTypeName="number";yc=class extends Mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)_n.slerpFlat(r,0,o,l-a,o,l,c);return r}},ai=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new yc(this.times,this.values,this.getValueSize(),t)}};ai.prototype.ValueTypeName="quaternion";ai.prototype.InterpolantFactoryMethodSmooth=void 0;bi=class extends Sn{constructor(t,e,n){super(t,e,n)}};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=us;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;ci=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}};ci.prototype.ValueTypeName="vector";Ho=class{constructor(t="",e=-1,n=[],s=$d){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Dn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(r0(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(Sn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=i0(c);c=fd(c,1,h),l=fd(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new oi(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){let l=t[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,g,x){if(d.length!==0){let m=[],p=[];pp(d,m,p,g),m.length!==0&&x.push(new u(f,m,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode,c=t.length||-1,l=t.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)d[f[g].morphTargets[x]]=-1;for(let x in d){let m=[],p=[];for(let b=0;b!==f[g].morphTargets.length;++b){let y=f[g];m.push(y.time),p.push(y.morphTarget===x?1:0)}s.push(new oi(".morphTargetInfluence["+x+"]",m,p))}c=d.length*o}else{let d=".bones["+e[u].name+"]";n(ci,d+".position",f,"pos",s),n(ai,d+".quaternion",f,"rot",s),n(ci,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};ni={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},vc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},mp=new vc,li=class{constructor(t){this.manager=t!==void 0?t:mp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};li.DEFAULT_MATERIAL_NAME="__DEFAULT";xi={},Ph=class extends Error{constructor(t,e){super(t),this.response=e}},Tr=class extends li{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=ni.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(xi[t]!==void 0){xi[t].push({onLoad:e,onProgress:n,onError:s});return}xi[t]=[],xi[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=xi[t],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0,x=0,m=new ReadableStream({start(p){b();function b(){u.read().then(({done:y,value:_})=>{if(y)p.close();else{x+=_.byteLength;let A=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:d});for(let R=0,C=h.length;R<C;R++){let L=h[R];L.onProgress&&L.onProgress(A)}p.enqueue(_),b()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Ph(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{ni.add(`file:${t}`,l);let h=xi[t];delete xi[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=xi[t];if(h===void 0)throw this.manager.itemError(t),l;delete xi[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},ar=new WeakMap,Mc=class extends li{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=ni.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=ar.get(o);u===void 0&&(u=[],ar.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=dr("img");function c(){h(),e&&e(this);let u=ar.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}ar.delete(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),ni.remove(`image:${t}`);let f=ar.get(this)||[];for(let d=0;d<f.length;d++){let g=f[d];g.onError&&g.onError(u)}ar.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ni.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}},Vo=class extends li{constructor(t){super(t)}load(t,e,n,s){let r=new je,o=new Mc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Ms=class extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ss=class extends Ms{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},yh=new ee,dd=new P,pd=new P,Go=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.mapType=Kn,this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vr,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;dd.setFromMatrixPosition(t.matrixWorld),e.position.copy(dd),pd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pd),e.updateMatrixWorld(),yh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yh,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Lh=class extends Go{constructor(){super(new ke(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=ds*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Wo=class extends Ms{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Lh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},md=new ee,lo=new P,vh=new P,Dh=class extends Go{constructor(){super(new ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new At(4,2),this._viewportCount=6,this._viewports=[new ye(2,1,1,1),new ye(0,1,1,1),new ye(3,1,1,1),new ye(1,1,1,1),new ye(3,0,1,1),new ye(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),lo.setFromMatrixPosition(t.matrixWorld),n.position.copy(lo),vh.copy(n.position),vh.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(vh),n.updateMatrixWorld(),s.makeTranslation(-lo.x,-lo.y,-lo.z),md.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(md,n.coordinateSystem,n.reversedDepth)}},bs=class extends Ms{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Dh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ei=class extends vo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Nh=class extends Go{constructor(){super(new Ei(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Es=class extends Ms{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new Nh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Ti=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Mh=new WeakMap,Xo=class extends li{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=ni.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{if(Mh.has(o)===!0)s&&s(Mh.get(o)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(l),r.manager.itemEnd(t),l});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ni.add(`image-bitmap:${t}`,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),Mh.set(c,l),ni.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});ni.add(`image-bitmap:${t}`,c),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Sc=class extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},iu="\\[\\]\\.:\\/",o0=new RegExp("["+iu+"]","g"),su="[^"+iu+"]",a0="[^"+iu.replace("\\.","")+"]",c0=/((?:WC+[\/:])*)/.source.replace("WC",su),l0=/(WCOD+)?/.source.replace("WCOD",a0),h0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",su),u0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",su),f0=new RegExp("^"+c0+l0+h0+u0+"$"),d0=["material","materials","bones","map"],Uh=class{constructor(t,e,n){let s=n||Ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ie=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(o0,"")}static parseTrackName(t){let e=f0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);d0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ie.Composite=Uh;Ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ie.prototype.GetterByBindingType=[Ie.prototype._getValue_direct,Ie.prototype._getValue_array,Ie.prototype._getValue_arrayElement,Ie.prototype._getValue_toArray];Ie.prototype.SetterByBindingTypeAndVersioning=[[Ie.prototype._setValue_direct,Ie.prototype._setValue_direct_setNeedsUpdate,Ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_array,Ie.prototype._setValue_array_setNeedsUpdate,Ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_arrayElement,Ie.prototype._setValue_arrayElement_setNeedsUpdate,Ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_fromArray,Ie.prototype._setValue_fromArray_setNeedsUpdate,Ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];kM=new Float32Array(1),gd=new ee,qo=class{constructor(t,e,n=0,s=1/0){this.ray=new si(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new gr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return gd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gd),this}intersectObject(t,e=!0,n=[]){return Fh(t,this,n,e),n.sort(_d),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Fh(t[s],this,n,e);return n.sort(_d),n}};wr=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(oe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Yo=class extends ii{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180")});function kp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function g0(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let x=u[d];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}function jx(i,t,e,n,s,r,o){let a=new Qt(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1,A=g(y);A===null?p(a,c):A&&A.isColor&&(p(A,1),_=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,_){let A=g(_);A&&(A.isCubeTexture||A.mapping===$o)?(h===void 0&&(h=new se(new Gi(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:Rs(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Cs.copy(_.backgroundRotation),Cs.x*=-1,Cs.y*=-1,Cs.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Cs.y*=-1,Cs.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Kx.makeRotationFromEuler(Cs)),h.material.toneMapped=de.getTransfer(A.colorSpace)!==Te,(u!==A||f!==A.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new se(new vs(2,2),new Rn({name:"BackgroundMaterial",uniforms:Rs(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=de.getTransfer(A.colorSpace)!==Te,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,_){y.getRGB(_l,eu(i)),n.buffers.color.setClear(_l.r,_l.g,_l.b,_,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:x,addToRenderList:m,dispose:b}}function Jx(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,U,V,J,Y){let st=!1,$=u(J,V,U);r!==$&&(r=$,l(r.object)),st=d(S,J,V,Y),st&&g(S,J,V,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(st||o)&&(o=!1,_(S,U,V,J),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,U,V){let J=V.wireframe===!0,Y=n[S.id];Y===void 0&&(Y={},n[S.id]=Y);let st=Y[U.id];st===void 0&&(st={},Y[U.id]=st);let $=st[J];return $===void 0&&($=f(c()),st[J]=$),$}function f(S){let U=[],V=[],J=[];for(let Y=0;Y<e;Y++)U[Y]=0,V[Y]=0,J[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:J,object:S,attributes:{},index:null}}function d(S,U,V,J){let Y=r.attributes,st=U.attributes,$=0,F=V.getAttributes();for(let I in F)if(F[I].location>=0){let j=Y[I],et=st[I];if(et===void 0&&(I==="instanceMatrix"&&S.instanceMatrix&&(et=S.instanceMatrix),I==="instanceColor"&&S.instanceColor&&(et=S.instanceColor)),j===void 0||j.attribute!==et||et&&j.data!==et.data)return!0;$++}return r.attributesNum!==$||r.index!==J}function g(S,U,V,J){let Y={},st=U.attributes,$=0,F=V.getAttributes();for(let I in F)if(F[I].location>=0){let j=st[I];j===void 0&&(I==="instanceMatrix"&&S.instanceMatrix&&(j=S.instanceMatrix),I==="instanceColor"&&S.instanceColor&&(j=S.instanceColor));let et={};et.attribute=j,j&&j.data&&(et.data=j.data),Y[I]=et,$++}r.attributes=Y,r.attributesNum=$,r.index=J}function x(){let S=r.newAttributes;for(let U=0,V=S.length;U<V;U++)S[U]=0}function m(S){p(S,0)}function p(S,U){let V=r.newAttributes,J=r.enabledAttributes,Y=r.attributeDivisors;V[S]=1,J[S]===0&&(i.enableVertexAttribArray(S),J[S]=1),Y[S]!==U&&(i.vertexAttribDivisor(S,U),Y[S]=U)}function b(){let S=r.newAttributes,U=r.enabledAttributes;for(let V=0,J=U.length;V<J;V++)U[V]!==S[V]&&(i.disableVertexAttribArray(V),U[V]=0)}function y(S,U,V,J,Y,st,$){$===!0?i.vertexAttribIPointer(S,U,V,Y,st):i.vertexAttribPointer(S,U,V,J,Y,st)}function _(S,U,V,J){x();let Y=J.attributes,st=V.getAttributes(),$=U.defaultAttributeValues;for(let F in st){let I=st[F];if(I.location>=0){let X=Y[F];if(X===void 0&&(F==="instanceMatrix"&&S.instanceMatrix&&(X=S.instanceMatrix),F==="instanceColor"&&S.instanceColor&&(X=S.instanceColor)),X!==void 0){let j=X.normalized,et=X.itemSize,Mt=t.get(X);if(Mt===void 0)continue;let ft=Mt.buffer,Ut=Mt.type,Lt=Mt.bytesPerElement,K=Ut===i.INT||Ut===i.UNSIGNED_INT||X.gpuType===Uc;if(X.isInterleavedBufferAttribute){let D=X.data,nt=D.stride,Ht=X.offset;if(D.isInstancedInterleavedBuffer){for(let vt=0;vt<I.locationSize;vt++)p(I.location+vt,D.meshPerAttribute);S.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let vt=0;vt<I.locationSize;vt++)m(I.location+vt);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let vt=0;vt<I.locationSize;vt++)y(I.location+vt,et/I.locationSize,Ut,j,nt*Lt,(Ht+et/I.locationSize*vt)*Lt,K)}else{if(X.isInstancedBufferAttribute){for(let D=0;D<I.locationSize;D++)p(I.location+D,X.meshPerAttribute);S.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let D=0;D<I.locationSize;D++)m(I.location+D);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let D=0;D<I.locationSize;D++)y(I.location+D,et/I.locationSize,Ut,j,et*Lt,et/I.locationSize*D*Lt,K)}}else if($!==void 0){let j=$[F];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(I.location,j);break;case 3:i.vertexAttrib3fv(I.location,j);break;case 4:i.vertexAttrib4fv(I.location,j);break;default:i.vertexAttrib1fv(I.location,j)}}}}b()}function A(){L();for(let S in n){let U=n[S];for(let V in U){let J=U[V];for(let Y in J)h(J[Y].object),delete J[Y];delete U[V]}delete n[S]}}function R(S){if(n[S.id]===void 0)return;let U=n[S.id];for(let V in U){let J=U[V];for(let Y in J)h(J[Y].object),delete J[Y];delete U[V]}delete n[S.id]}function C(S){for(let U in n){let V=n[U];if(V[S.id]===void 0)continue;let J=V[S.id];for(let Y in J)h(J[Y].object),delete J[Y];delete V[S.id]}}function L(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function Qx(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function ty(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==In&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let L=C===Cr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Kn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Bn&&!L)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:A,maxSamples:R}}function ey(i){let t=this,e=null,n=0,s=!1,r=!1,o=new yn,a=new re,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let b=r?0:n,y=b*4,_=p.clippingState||null;c.value=_,_=h(g,f,y,d);for(let A=0;A!==y;++A)_[A]=e[A];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=d+x*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=d;y!==x;++y,_+=4)o.copy(u[y]).applyMatrix4(b,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function ny(i){let t=new WeakMap;function e(o,a){return a===Lc?o.mapping=Ts:a===Dc&&(o.mapping=ws),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Lc||a===Dc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new sc(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}function sy(i){let t=[],e=[],n=[],s=i,r=i-Nr+1+gp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Nr?c=gp[o-i+Nr-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,x=3,m=2,p=1,b=new Float32Array(x*g*d),y=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let R=0;R<d;R++){let C=R%3*2/3-1,L=R>2?0:-1,M=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];b.set(M,x*g*R),y.set(f,m*g*R);let S=[R,R,R,R,R,R];_.set(S,p*g*R)}let A=new Pe;A.setAttribute("position",new Le(b,x)),A.setAttribute("uv",new Le(y,m)),A.setAttribute("faceIndex",new Le(_,p)),t.push(A),s>Nr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function yp(i,t,e){let n=new Un(i,t,e);return n.texture.mapping=$o,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xl(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function ry(i,t,e){let n=new Float32Array(Ls),s=new P(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:Ls,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mu(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function vp(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mu(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Mp(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Mu(){return`

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
	`}function oy(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Lc||c===Dc,h=c===Ts||c===ws;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Fr(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Fr(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ay(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&pr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function cy(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,g=u.attributes.position,x=0;if(d!==null){let b=d.array;x=d.version;for(let y=0,_=b.length;y<_;y+=3){let A=b[y+0],R=b[y+1],C=b[y+2];f.push(A,R,R,C,C,A)}}else if(g!==void 0){let b=g.array;x=g.version;for(let y=0,_=b.length/3-1;y<_;y+=3){let A=y+0,R=y+1,C=y+2;f.push(A,R,R,C,C,A)}}else return;let m=new(tu(f)?yo:xo)(f,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function ly(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let p=0;for(let b=0;b<g;b++)p+=d[b]*x[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hy(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function uy(i,t,e){let n=new WeakMap,s=new ye;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],y=0;d===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,A=1;_>t.maxTextureSize&&(A=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let R=new Float32Array(_*A*4*u),C=new _o(R,_,A,u);C.type=Bn,C.needsUpdate=!0;let L=y*4;for(let S=0;S<u;S++){let U=m[S],V=p[S],J=b[S],Y=_*A*4*S;for(let st=0;st<U.count;st++){let $=st*L;d===!0&&(s.fromBufferAttribute(U,st),R[Y+$+0]=s.x,R[Y+$+1]=s.y,R[Y+$+2]=s.z,R[Y+$+3]=0),g===!0&&(s.fromBufferAttribute(V,st),R[Y+$+4]=s.x,R[Y+$+5]=s.y,R[Y+$+6]=s.z,R[Y+$+7]=0),x===!0&&(s.fromBufferAttribute(J,st),R[Y+$+8]=s.x,R[Y+$+9]=s.y,R[Y+$+10]=s.z,R[Y+$+11]=J.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new At(_,A)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function fy(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}function Br(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=bp[s];if(r===void 0&&(r=new Float32Array(s),bp[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Je(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Qe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vl(i,t){let e=Ep[t];e===void 0&&(e=new Int32Array(t),Ep[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function dy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function py(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2fv(this.addr,t),Qe(e,t)}}function my(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Je(e,t))return;i.uniform3fv(this.addr,t),Qe(e,t)}}function gy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4fv(this.addr,t),Qe(e,t)}}function _y(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Qe(e,t)}else{if(Je(e,n))return;Ap.set(n),i.uniformMatrix2fv(this.addr,!1,Ap),Qe(e,n)}}function xy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Qe(e,t)}else{if(Je(e,n))return;wp.set(n),i.uniformMatrix3fv(this.addr,!1,wp),Qe(e,n)}}function yy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Je(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Qe(e,t)}else{if(Je(e,n))return;Tp.set(n),i.uniformMatrix4fv(this.addr,!1,Tp),Qe(e,n)}}function vy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function My(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2iv(this.addr,t),Qe(e,t)}}function Sy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;i.uniform3iv(this.addr,t),Qe(e,t)}}function by(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4iv(this.addr,t),Qe(e,t)}}function Ey(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ty(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;i.uniform2uiv(this.addr,t),Qe(e,t)}}function wy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;i.uniform3uiv(this.addr,t),Qe(e,t)}}function Ay(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;i.uniform4uiv(this.addr,t),Qe(e,t)}}function Ry(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Sp.compareFunction=jh,r=Sp):r=zp,e.setTexture2D(t||r,s)}function Cy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Vp,s)}function Iy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Gp,s)}function Py(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Hp,s)}function Ly(i){switch(i){case 5126:return dy;case 35664:return py;case 35665:return my;case 35666:return gy;case 35674:return _y;case 35675:return xy;case 35676:return yy;case 5124:case 35670:return vy;case 35667:case 35671:return My;case 35668:case 35672:return Sy;case 35669:case 35673:return by;case 5125:return Ey;case 36294:return Ty;case 36295:return wy;case 36296:return Ay;case 35678:case 36198:case 36298:case 36306:case 35682:return Ry;case 35679:case 36299:case 36307:return Cy;case 35680:case 36300:case 36308:case 36293:return Iy;case 36289:case 36303:case 36311:case 36292:return Py}}function Dy(i,t){i.uniform1fv(this.addr,t)}function Ny(i,t){let e=Br(t,this.size,2);i.uniform2fv(this.addr,e)}function Uy(i,t){let e=Br(t,this.size,3);i.uniform3fv(this.addr,e)}function Fy(i,t){let e=Br(t,this.size,4);i.uniform4fv(this.addr,e)}function Oy(i,t){let e=Br(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function By(i,t){let e=Br(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ky(i,t){let e=Br(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function zy(i,t){i.uniform1iv(this.addr,t)}function Hy(i,t){i.uniform2iv(this.addr,t)}function Vy(i,t){i.uniform3iv(this.addr,t)}function Gy(i,t){i.uniform4iv(this.addr,t)}function Wy(i,t){i.uniform1uiv(this.addr,t)}function Xy(i,t){i.uniform2uiv(this.addr,t)}function qy(i,t){i.uniform3uiv(this.addr,t)}function Yy(i,t){i.uniform4uiv(this.addr,t)}function $y(i,t,e){let n=this.cache,s=t.length,r=vl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||zp,r[o])}function Zy(i,t,e){let n=this.cache,s=t.length,r=vl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Vp,r[o])}function Ky(i,t,e){let n=this.cache,s=t.length,r=vl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Gp,r[o])}function jy(i,t,e){let n=this.cache,s=t.length,r=vl(e,s);Je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Hp,r[o])}function Jy(i){switch(i){case 5126:return Dy;case 35664:return Ny;case 35665:return Uy;case 35666:return Fy;case 35674:return Oy;case 35675:return By;case 35676:return ky;case 5124:case 35670:return zy;case 35667:case 35671:return Hy;case 35668:case 35672:return Vy;case 35669:case 35673:return Gy;case 5125:return Wy;case 36294:return Xy;case 36295:return qy;case 36296:return Yy;case 35678:case 36198:case 36298:case 36306:case 35682:return $y;case 35679:case 36299:case 36307:return Zy;case 35680:case 36300:case 36308:case 36293:return Ky;case 36289:case 36303:case 36311:case 36292:return jy}}function Rp(i,t){i.seq.push(t),i.map[t.id]=t}function Qy(i,t,e){let n=i.name,s=n.length;for(fu.lastIndex=0;;){let r=fu.exec(n),o=fu.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Rp(e,l===void 0?new du(a,i,t):new pu(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new mu(a),Rp(e,u)),e=u}}}function Cp(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}function nv(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function iv(i){de._getMatrix(Ip,de.workingColorSpace,i);let t=`mat3( ${Ip.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(i)){case mo:return[t,"LinearTransferOETF"];case Te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Pp(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+nv(i.getShaderSource(t),a)}else return r}function sv(i,t){let e=iv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function rv(i,t){let e;switch(t){case Hd:e="Linear";break;case Vd:e="Reinhard";break;case Gd:e="Cineon";break;case Wd:e="ACESFilmic";break;case qd:e="AgX";break;case Pc:e="Neutral";break;case Xd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ov(){de.getLuminanceCoefficients(yl);let i=yl.x.toFixed(4),t=yl.y.toFixed(4),e=yl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function av(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ea).join(`
`)}function cv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function lv(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ea(i){return i!==""}function Lp(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dp(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function gu(i){return i.replace(hv,fv)}function fv(i,t){let e=ae[t];if(e===void 0){let n=uv.get(t);if(n!==void 0)e=ae[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return gu(e)}function Np(i){return i.replace(dv,pv)}function pv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Up(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function mv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===vd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===hi&&(t="SHADOWMAP_TYPE_VSM"),t}function gv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ts:case ws:t="ENVMAP_TYPE_CUBE";break;case $o:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _v(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ws:t="ENVMAP_MODE_REFRACTION";break}return t}function xv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ic:t="ENVMAP_BLENDING_MULTIPLY";break;case kd:t="ENVMAP_BLENDING_MIX";break;case zd:t="ENVMAP_BLENDING_ADD";break}return t}function yv(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function vv(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=mv(e),l=gv(e),h=_v(e),u=xv(e),f=yv(e),d=av(e),g=cv(r),x=s.createProgram(),m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ea).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ea).join(`
`),p.length>0&&(p+=`
`)):(m=[Up(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ea).join(`
`),p=[Up(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ai?"#define TONE_MAPPING":"",e.toneMapping!==Ai?ae.tonemapping_pars_fragment:"",e.toneMapping!==Ai?rv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ae.colorspace_pars_fragment,sv("linearToOutputTexel",e.outputColorSpace),ov(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ea).join(`
`)),o=gu(o),o=Lp(o,e),o=Dp(o,e),a=gu(a),a=Lp(a,e),a=Dp(a,e),o=Np(o),a=Np(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Jh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=b+m+o,_=b+p+a,A=Cp(s,s.VERTEX_SHADER,y),R=Cp(s,s.FRAGMENT_SHADER,_);s.attachShader(x,A),s.attachShader(x,R),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(U){if(i.debug.checkShaderErrors){let V=s.getProgramInfoLog(x)||"",J=s.getShaderInfoLog(A)||"",Y=s.getShaderInfoLog(R)||"",st=V.trim(),$=J.trim(),F=Y.trim(),I=!0,X=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(I=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,R);else{let j=Pp(s,A,"vertex"),et=Pp(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+st+`
`+j+`
`+et)}else st!==""?console.warn("THREE.WebGLProgram: Program Info Log:",st):($===""||F==="")&&(X=!1);X&&(U.diagnostics={runnable:I,programLog:st,vertexShader:{log:$,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(A),s.deleteShader(R),L=new Ur(s,x),M=lv(s,x)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,tv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ev++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=R,this}function Sv(i,t,e,n,s,r,o){let a=new gr,c=new _u,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,S,U,V,J){let Y=V.fog,st=J.geometry,$=M.isMeshStandardMaterial?V.environment:null,F=(M.isMeshStandardMaterial?e:t).get(M.envMap||$),I=F&&F.mapping===$o?F.image.height:null,X=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let j=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,et=j!==void 0?j.length:0,Mt=0;st.morphAttributes.position!==void 0&&(Mt=1),st.morphAttributes.normal!==void 0&&(Mt=2),st.morphAttributes.color!==void 0&&(Mt=3);let ft,Ut,Lt,K;if(X){let ge=ui[X];ft=ge.vertexShader,Ut=ge.fragmentShader}else ft=M.vertexShader,Ut=M.fragmentShader,c.update(M),Lt=c.getVertexShaderID(M),K=c.getFragmentShaderID(M);let D=i.getRenderTarget(),nt=i.state.buffers.depth.getReversed(),Ht=J.isInstancedMesh===!0,vt=J.isBatchedMesh===!0,Kt=!!M.map,Se=!!M.matcap,N=!!F,Zt=!!M.aoMap,Dt=!!M.lightMap,Vt=!!M.bumpMap,kt=!!M.normalMap,pe=!!M.displacementMap,Ot=!!M.emissiveMap,Xt=!!M.metalnessMap,Q=!!M.roughnessMap,yt=M.anisotropy>0,E=M.clearcoat>0,v=M.dispersion>0,w=M.iridescence>0,B=M.sheen>0,k=M.transmission>0,G=yt&&!!M.anisotropyMap,gt=E&&!!M.clearcoatMap,it=E&&!!M.clearcoatNormalMap,rt=E&&!!M.clearcoatRoughnessMap,ht=w&&!!M.iridescenceMap,ct=w&&!!M.iridescenceThicknessMap,St=B&&!!M.sheenColorMap,Nt=B&&!!M.sheenRoughnessMap,wt=!!M.specularMap,Et=!!M.specularColorMap,$t=!!M.specularIntensityMap,O=k&&!!M.transmissionMap,_t=k&&!!M.thicknessMap,xt=!!M.gradientMap,Ct=!!M.alphaMap,pt=M.alphaTest>0,ot=!!M.alphaHash,Bt=!!M.extensions,ne=Ai;M.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ne=i.toneMapping);let be={shaderID:X,shaderType:M.type,shaderName:M.name,vertexShader:ft,fragmentShader:Ut,defines:M.defines,customVertexShaderID:Lt,customFragmentShaderID:K,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:vt,batchingColor:vt&&J._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&J.instanceColor!==null,instancingMorph:Ht&&J.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:D===null?i.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:rn,alphaToCoverage:!!M.alphaToCoverage,map:Kt,matcap:Se,envMap:N,envMapMode:N&&F.mapping,envMapCubeUVHeight:I,aoMap:Zt,lightMap:Dt,bumpMap:Vt,normalMap:kt,displacementMap:f&&pe,emissiveMap:Ot,normalMapObjectSpace:kt&&M.normalMapType===jd,normalMapTangentSpace:kt&&M.normalMapType===gl,metalnessMap:Xt,roughnessMap:Q,anisotropy:yt,anisotropyMap:G,clearcoat:E,clearcoatMap:gt,clearcoatNormalMap:it,clearcoatRoughnessMap:rt,dispersion:v,iridescence:w,iridescenceMap:ht,iridescenceThicknessMap:ct,sheen:B,sheenColorMap:St,sheenRoughnessMap:Nt,specularMap:wt,specularColorMap:Et,specularIntensityMap:$t,transmission:k,transmissionMap:O,thicknessMap:_t,gradientMap:xt,opaque:M.transparent===!1&&M.blending===ls&&M.alphaToCoverage===!1,alphaMap:Ct,alphaTest:pt,alphaHash:ot,combine:M.combine,mapUv:Kt&&x(M.map.channel),aoMapUv:Zt&&x(M.aoMap.channel),lightMapUv:Dt&&x(M.lightMap.channel),bumpMapUv:Vt&&x(M.bumpMap.channel),normalMapUv:kt&&x(M.normalMap.channel),displacementMapUv:pe&&x(M.displacementMap.channel),emissiveMapUv:Ot&&x(M.emissiveMap.channel),metalnessMapUv:Xt&&x(M.metalnessMap.channel),roughnessMapUv:Q&&x(M.roughnessMap.channel),anisotropyMapUv:G&&x(M.anisotropyMap.channel),clearcoatMapUv:gt&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:it&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ht&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:St&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&x(M.sheenRoughnessMap.channel),specularMapUv:wt&&x(M.specularMap.channel),specularColorMapUv:Et&&x(M.specularColorMap.channel),specularIntensityMapUv:$t&&x(M.specularIntensityMap.channel),transmissionMapUv:O&&x(M.transmissionMap.channel),thicknessMapUv:_t&&x(M.thicknessMap.channel),alphaMapUv:Ct&&x(M.alphaMap.channel),vertexTangents:!!st.attributes.tangent&&(kt||yt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!st.attributes.uv&&(Kt||Ct),fog:!!Y,useFog:M.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:nt,skinning:J.isSkinnedMesh===!0,morphTargets:st.morphAttributes.position!==void 0,morphNormals:st.morphAttributes.normal!==void 0,morphColors:st.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:Mt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:ne,decodeVideoTexture:Kt&&M.map.isVideoTexture===!0&&de.getTransfer(M.map.colorSpace)===Te,decodeVideoTextureEmissive:Ot&&M.emissiveMap.isVideoTexture===!0&&de.getTransfer(M.emissiveMap.colorSpace)===Te,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Be,flipSided:M.side===on,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Bt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&M.extensions.multiDraw===!0||vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function p(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let U in M.defines)S.push(U),S.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(b(S,M),y(S,M),S.push(i.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function b(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){let S=g[M.type],U;if(S){let V=ui[S];U=cp.clone(V.uniforms)}else U=M.uniforms;return U}function A(M,S){let U;for(let V=0,J=h.length;V<J;V++){let Y=h[V];if(Y.cacheKey===S){U=Y,++U.usedTimes;break}}return U===void 0&&(U=new vv(i,S,M,r),h.push(U)),U}function R(M){if(--M.usedTimes===0){let S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function C(M){c.remove(M)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:A,releaseProgram:R,releaseShaderCache:C,programs:h,dispose:L}}function bv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Ev(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Fp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Op(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,x,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,f,d,g,x,m){let p=o(u,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,x,m){let p=o(u,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||Ev),n.length>1&&n.sort(f||Fp),s.length>1&&s.sort(f||Fp)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Tv(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Op,i.set(n,[o])):s>=r.length?(o=new Op,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function wv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Qt};break;case"SpotLight":e={position:new P,direction:new P,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function Av(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}function Cv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Iv(i){let t=new wv,e=Av(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let s=new P,r=new ee,o=new ee;function a(l){let h=0,u=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,b=0,y=0,_=0,A=0,R=0,C=0;l.sort(Cv);for(let M=0,S=l.length;M<S;M++){let U=l[M],V=U.color,J=U.intensity,Y=U.distance,st=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=V.r*J,u+=V.g*J,f+=V.b*J;else if(U.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(U.sh.coefficients[$],J);C++}else if(U.isDirectionalLight){let $=t.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let F=U.shadow,I=e.get(U);I.shadowIntensity=F.intensity,I.shadowBias=F.bias,I.shadowNormalBias=F.normalBias,I.shadowRadius=F.radius,I.shadowMapSize=F.mapSize,n.directionalShadow[d]=I,n.directionalShadowMap[d]=st,n.directionalShadowMatrix[d]=U.shadow.matrix,b++}n.directional[d]=$,d++}else if(U.isSpotLight){let $=t.get(U);$.position.setFromMatrixPosition(U.matrixWorld),$.color.copy(V).multiplyScalar(J),$.distance=Y,$.coneCos=Math.cos(U.angle),$.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),$.decay=U.decay,n.spot[x]=$;let F=U.shadow;if(U.map&&(n.spotLightMap[A]=U.map,A++,F.updateMatrices(U),U.castShadow&&R++),n.spotLightMatrix[x]=F.matrix,U.castShadow){let I=e.get(U);I.shadowIntensity=F.intensity,I.shadowBias=F.bias,I.shadowNormalBias=F.normalBias,I.shadowRadius=F.radius,I.shadowMapSize=F.mapSize,n.spotShadow[x]=I,n.spotShadowMap[x]=st,_++}x++}else if(U.isRectAreaLight){let $=t.get(U);$.color.copy(V).multiplyScalar(J),$.halfWidth.set(U.width*.5,0,0),$.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=$,m++}else if(U.isPointLight){let $=t.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),$.distance=U.distance,$.decay=U.decay,U.castShadow){let F=U.shadow,I=e.get(U);I.shadowIntensity=F.intensity,I.shadowBias=F.bias,I.shadowNormalBias=F.normalBias,I.shadowRadius=F.radius,I.shadowMapSize=F.mapSize,I.shadowCameraNear=F.camera.near,I.shadowCameraFar=F.camera.far,n.pointShadow[g]=I,n.pointShadowMap[g]=st,n.pointShadowMatrix[g]=U.shadow.matrix,y++}n.point[g]=$,g++}else if(U.isHemisphereLight){let $=t.get(U);$.skyColor.copy(U.color).multiplyScalar(J),$.groundColor.copy(U.groundColor).multiplyScalar(J),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ft.LTC_FLOAT_1,n.rectAreaLTC2=Ft.LTC_FLOAT_2):(n.rectAreaLTC1=Ft.LTC_HALF_1,n.rectAreaLTC2=Ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let L=n.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==x||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==b||L.numPointShadows!==y||L.numSpotShadows!==_||L.numSpotMaps!==A||L.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+A-R,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,L.directionalLength=d,L.pointLength=g,L.spotLength=x,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=b,L.numPointShadows=y,L.numSpotShadows=_,L.numSpotMaps=A,L.numLightProbes=C,n.version=Rv++)}function c(l,h){let u=0,f=0,d=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){let y=l[p];if(y.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(y.isSpotLight){let _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Bp(i){let t=new Iv(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Pv(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Bp(i),t.set(s,[a])):r>=o.length?(a=new Bp(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function Nv(i,t,e){let n=new vr,s=new At,r=new At,o=new ye,a=new pc({depthPacking:Kd}),c=new mc,l={},h=e.maxTextureSize,u={[Yn]:on,[on]:Yn,[Be]:Be},f=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:Lv,fragmentShader:Dv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Pe;g.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new se(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bh;let p=this.type;this.render=function(R,C,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let M=i.getRenderTarget(),S=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),V=i.state;V.setBlending(wi),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let J=p!==hi&&this.type===hi,Y=p===hi&&this.type!==hi;for(let st=0,$=R.length;st<$;st++){let F=R[st],I=F.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",F,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;s.copy(I.mapSize);let X=I.getFrameExtents();if(s.multiply(X),r.copy(I.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,I.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,I.mapSize.y=r.y)),I.map===null||J===!0||Y===!0){let et=this.type!==hi?{minFilter:sn,magFilter:sn}:{};I.map!==null&&I.map.dispose(),I.map=new Un(s.x,s.y,et),I.map.texture.name=F.name+".shadowMap",I.camera.updateProjectionMatrix()}i.setRenderTarget(I.map),i.clear();let j=I.getViewportCount();for(let et=0;et<j;et++){let Mt=I.getViewport(et);o.set(r.x*Mt.x,r.y*Mt.y,r.x*Mt.z,r.y*Mt.w),V.viewport(o),I.updateMatrices(F,et),n=I.getFrustum(),_(C,L,I.camera,F,this.type)}I.isPointLightShadow!==!0&&this.type===hi&&b(I,L),I.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,S,U)};function b(R,C){let L=t.update(x);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Un(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(C,null,L,f,x,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(C,null,L,d,x,null)}function y(R,C,L,M){let S=null,U=L.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)S=U;else if(S=L.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let V=S.uuid,J=C.uuid,Y=l[V];Y===void 0&&(Y={},l[V]=Y);let st=Y[J];st===void 0&&(st=S.clone(),Y[J]=st,C.addEventListener("dispose",A)),S=st}if(S.visible=C.visible,S.wireframe=C.wireframe,M===hi?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let V=i.properties.get(S);V.light=L}return S}function _(R,C,L,M,S){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===hi)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,R.matrixWorld);let J=t.update(R),Y=R.material;if(Array.isArray(Y)){let st=J.groups;for(let $=0,F=st.length;$<F;$++){let I=st[$],X=Y[I.materialIndex];if(X&&X.visible){let j=y(R,X,M,S);R.onBeforeShadow(i,R,C,L,J,j,I),i.renderBufferDirect(L,null,J,j,R,I),R.onAfterShadow(i,R,C,L,J,j,I)}}}else if(Y.visible){let st=y(R,Y,M,S);R.onBeforeShadow(i,R,C,L,J,st,null),i.renderBufferDirect(L,null,J,st,R,null),R.onAfterShadow(i,R,C,L,J,st,null)}}let V=R.children;for(let J=0,Y=V.length;J<Y;J++)_(V[J],C,L,M,S)}function A(R){R.target.removeEventListener("dispose",A);for(let L in l){let M=l[L],S=R.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}function Fv(i,t){function e(){let O=!1,_t=new ye,xt=null,Ct=new ye(0,0,0,0);return{setMask:function(pt){xt!==pt&&!O&&(i.colorMask(pt,pt,pt,pt),xt=pt)},setLocked:function(pt){O=pt},setClear:function(pt,ot,Bt,ne,be){be===!0&&(pt*=ne,ot*=ne,Bt*=ne),_t.set(pt,ot,Bt,ne),Ct.equals(_t)===!1&&(i.clearColor(pt,ot,Bt,ne),Ct.copy(_t))},reset:function(){O=!1,xt=null,Ct.set(-1,0,0,0)}}}function n(){let O=!1,_t=!1,xt=null,Ct=null,pt=null;return{setReversed:function(ot){if(_t!==ot){let Bt=t.get("EXT_clip_control");ot?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),_t=ot;let ne=pt;pt=null,this.setClear(ne)}},getReversed:function(){return _t},setTest:function(ot){ot?D(i.DEPTH_TEST):nt(i.DEPTH_TEST)},setMask:function(ot){xt!==ot&&!O&&(i.depthMask(ot),xt=ot)},setFunc:function(ot){if(_t&&(ot=Uv[ot]),Ct!==ot){switch(ot){case bc:i.depthFunc(i.NEVER);break;case Ec:i.depthFunc(i.ALWAYS);break;case Tc:i.depthFunc(i.LESS);break;case hs:i.depthFunc(i.LEQUAL);break;case wc:i.depthFunc(i.EQUAL);break;case Ac:i.depthFunc(i.GEQUAL);break;case Rc:i.depthFunc(i.GREATER);break;case Cc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ct=ot}},setLocked:function(ot){O=ot},setClear:function(ot){pt!==ot&&(_t&&(ot=1-ot),i.clearDepth(ot),pt=ot)},reset:function(){O=!1,xt=null,Ct=null,pt=null,_t=!1}}}function s(){let O=!1,_t=null,xt=null,Ct=null,pt=null,ot=null,Bt=null,ne=null,be=null;return{setTest:function(ge){O||(ge?D(i.STENCIL_TEST):nt(i.STENCIL_TEST))},setMask:function(ge){_t!==ge&&!O&&(i.stencilMask(ge),_t=ge)},setFunc:function(ge,Xe,Ke){(xt!==ge||Ct!==Xe||pt!==Ke)&&(i.stencilFunc(ge,Xe,Ke),xt=ge,Ct=Xe,pt=Ke)},setOp:function(ge,Xe,Ke){(ot!==ge||Bt!==Xe||ne!==Ke)&&(i.stencilOp(ge,Xe,Ke),ot=ge,Bt=Xe,ne=Ke)},setLocked:function(ge){O=ge},setClear:function(ge){be!==ge&&(i.clearStencil(ge),be=ge)},reset:function(){O=!1,_t=null,xt=null,Ct=null,pt=null,ot=null,Bt=null,ne=null,be=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,b=null,y=null,_=null,A=null,R=null,C=new Qt(0,0,0),L=0,M=!1,S=null,U=null,V=null,J=null,Y=null,st=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,F=0,I=i.getParameter(i.VERSION);I.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(I)[1]),$=F>=1):I.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),$=F>=2);let X=null,j={},et=i.getParameter(i.SCISSOR_BOX),Mt=i.getParameter(i.VIEWPORT),ft=new ye().fromArray(et),Ut=new ye().fromArray(Mt);function Lt(O,_t,xt,Ct){let pt=new Uint8Array(4),ot=i.createTexture();i.bindTexture(O,ot),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<xt;Bt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,Ct,0,i.RGBA,i.UNSIGNED_BYTE,pt):i.texImage2D(_t+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pt);return ot}let K={};K[i.TEXTURE_2D]=Lt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Lt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Lt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Lt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),D(i.DEPTH_TEST),o.setFunc(hs),Vt(!1),kt(Oh),D(i.CULL_FACE),Zt(wi);function D(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function nt(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Ht(O,_t){return u[O]!==_t?(i.bindFramebuffer(O,_t),u[O]=_t,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_t),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function vt(O,_t){let xt=d,Ct=!1;if(O){xt=f.get(_t),xt===void 0&&(xt=[],f.set(_t,xt));let pt=O.textures;if(xt.length!==pt.length||xt[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,Bt=pt.length;ot<Bt;ot++)xt[ot]=i.COLOR_ATTACHMENT0+ot;xt.length=pt.length,Ct=!0}}else xt[0]!==i.BACK&&(xt[0]=i.BACK,Ct=!0);Ct&&i.drawBuffers(xt)}function Kt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}let Se={[Vi]:i.FUNC_ADD,[Sd]:i.FUNC_SUBTRACT,[bd]:i.FUNC_REVERSE_SUBTRACT};Se[Ed]=i.MIN,Se[Td]=i.MAX;let N={[wd]:i.ZERO,[Ad]:i.ONE,[Rd]:i.SRC_COLOR,[ja]:i.SRC_ALPHA,[Nd]:i.SRC_ALPHA_SATURATE,[Ld]:i.DST_COLOR,[Id]:i.DST_ALPHA,[Cd]:i.ONE_MINUS_SRC_COLOR,[Ja]:i.ONE_MINUS_SRC_ALPHA,[Dd]:i.ONE_MINUS_DST_COLOR,[Pd]:i.ONE_MINUS_DST_ALPHA,[Ud]:i.CONSTANT_COLOR,[Fd]:i.ONE_MINUS_CONSTANT_COLOR,[Od]:i.CONSTANT_ALPHA,[Bd]:i.ONE_MINUS_CONSTANT_ALPHA};function Zt(O,_t,xt,Ct,pt,ot,Bt,ne,be,ge){if(O===wi){x===!0&&(nt(i.BLEND),x=!1);return}if(x===!1&&(D(i.BLEND),x=!0),O!==Md){if(O!==m||ge!==M){if((p!==Vi||_!==Vi)&&(i.blendEquation(i.FUNC_ADD),p=Vi,_=Vi),ge)switch(O){case ls:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFunc(i.ONE,i.ONE);break;case zh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Hh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ls:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}b=null,y=null,A=null,R=null,C.set(0,0,0),L=0,m=O,M=ge}return}pt=pt||_t,ot=ot||xt,Bt=Bt||Ct,(_t!==p||pt!==_)&&(i.blendEquationSeparate(Se[_t],Se[pt]),p=_t,_=pt),(xt!==b||Ct!==y||ot!==A||Bt!==R)&&(i.blendFuncSeparate(N[xt],N[Ct],N[ot],N[Bt]),b=xt,y=Ct,A=ot,R=Bt),(ne.equals(C)===!1||be!==L)&&(i.blendColor(ne.r,ne.g,ne.b,be),C.copy(ne),L=be),m=O,M=!1}function Dt(O,_t){O.side===Be?nt(i.CULL_FACE):D(i.CULL_FACE);let xt=O.side===on;_t&&(xt=!xt),Vt(xt),O.blending===ls&&O.transparent===!1?Zt(wi):Zt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let Ct=O.stencilWrite;a.setTest(Ct),Ct&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ot(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?D(i.SAMPLE_ALPHA_TO_COVERAGE):nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(O){S!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),S=O)}function kt(O){O!==xd?(D(i.CULL_FACE),O!==U&&(O===Oh?i.cullFace(i.BACK):O===yd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):nt(i.CULL_FACE),U=O}function pe(O){O!==V&&($&&i.lineWidth(O),V=O)}function Ot(O,_t,xt){O?(D(i.POLYGON_OFFSET_FILL),(J!==_t||Y!==xt)&&(i.polygonOffset(_t,xt),J=_t,Y=xt)):nt(i.POLYGON_OFFSET_FILL)}function Xt(O){O?D(i.SCISSOR_TEST):nt(i.SCISSOR_TEST)}function Q(O){O===void 0&&(O=i.TEXTURE0+st-1),X!==O&&(i.activeTexture(O),X=O)}function yt(O,_t,xt){xt===void 0&&(X===null?xt=i.TEXTURE0+st-1:xt=X);let Ct=j[xt];Ct===void 0&&(Ct={type:void 0,texture:void 0},j[xt]=Ct),(Ct.type!==O||Ct.texture!==_t)&&(X!==xt&&(i.activeTexture(xt),X=xt),i.bindTexture(O,_t||K[O]),Ct.type=O,Ct.texture=_t)}function E(){let O=j[X];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function B(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function k(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function gt(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function rt(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ht(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ct(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function St(O){ft.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ft.copy(O))}function Nt(O){Ut.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Ut.copy(O))}function wt(O,_t){let xt=l.get(_t);xt===void 0&&(xt=new WeakMap,l.set(_t,xt));let Ct=xt.get(O);Ct===void 0&&(Ct=i.getUniformBlockIndex(_t,O.name),xt.set(O,Ct))}function Et(O,_t){let Ct=l.get(_t).get(O);c.get(_t)!==Ct&&(i.uniformBlockBinding(_t,Ct,O.__bindingPointIndex),c.set(_t,Ct))}function $t(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},X=null,j={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,b=null,y=null,_=null,A=null,R=null,C=new Qt(0,0,0),L=0,M=!1,S=null,U=null,V=null,J=null,Y=null,ft.set(0,0,i.canvas.width,i.canvas.height),Ut.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:D,disable:nt,bindFramebuffer:Ht,drawBuffers:vt,useProgram:Kt,setBlending:Zt,setMaterial:Dt,setFlipSided:Vt,setCullFace:kt,setLineWidth:pe,setPolygonOffset:Ot,setScissorTest:Xt,activeTexture:Q,bindTexture:yt,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:w,texImage2D:ht,texImage3D:ct,updateUBOMapping:wt,uniformBlockBinding:Et,texStorage2D:it,texStorage3D:rt,texSubImage2D:B,texSubImage3D:k,compressedTexSubImage2D:G,compressedTexSubImage3D:gt,scissor:St,viewport:Nt,reset:$t}}function Ov(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new At,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return d?new OffscreenCanvas(E,v):dr("canvas")}function x(E,v,w){let B=1,k=yt(E);if((k.width>w||k.height>w)&&(B=w/Math.max(k.width,k.height)),B<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let G=Math.floor(B*k.width),gt=Math.floor(B*k.height);u===void 0&&(u=g(G,gt));let it=v?g(G,gt):u;return it.width=G,it.height=gt,it.getContext("2d").drawImage(E,0,0,G,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+G+"x"+gt+")."),it}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(E,v,w,B,k=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let G=v;if(v===i.RED&&(w===i.FLOAT&&(G=i.R32F),w===i.HALF_FLOAT&&(G=i.R16F),w===i.UNSIGNED_BYTE&&(G=i.R8)),v===i.RED_INTEGER&&(w===i.UNSIGNED_BYTE&&(G=i.R8UI),w===i.UNSIGNED_SHORT&&(G=i.R16UI),w===i.UNSIGNED_INT&&(G=i.R32UI),w===i.BYTE&&(G=i.R8I),w===i.SHORT&&(G=i.R16I),w===i.INT&&(G=i.R32I)),v===i.RG&&(w===i.FLOAT&&(G=i.RG32F),w===i.HALF_FLOAT&&(G=i.RG16F),w===i.UNSIGNED_BYTE&&(G=i.RG8)),v===i.RG_INTEGER&&(w===i.UNSIGNED_BYTE&&(G=i.RG8UI),w===i.UNSIGNED_SHORT&&(G=i.RG16UI),w===i.UNSIGNED_INT&&(G=i.RG32UI),w===i.BYTE&&(G=i.RG8I),w===i.SHORT&&(G=i.RG16I),w===i.INT&&(G=i.RG32I)),v===i.RGB_INTEGER&&(w===i.UNSIGNED_BYTE&&(G=i.RGB8UI),w===i.UNSIGNED_SHORT&&(G=i.RGB16UI),w===i.UNSIGNED_INT&&(G=i.RGB32UI),w===i.BYTE&&(G=i.RGB8I),w===i.SHORT&&(G=i.RGB16I),w===i.INT&&(G=i.RGB32I)),v===i.RGBA_INTEGER&&(w===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),w===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),w===i.UNSIGNED_INT&&(G=i.RGBA32UI),w===i.BYTE&&(G=i.RGBA8I),w===i.SHORT&&(G=i.RGBA16I),w===i.INT&&(G=i.RGBA32I)),v===i.RGB&&(w===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),w===i.UNSIGNED_INT_10F_11F_11F_REV&&(G=i.R11F_G11F_B10F)),v===i.RGBA){let gt=k?mo:de.getTransfer(B);w===i.FLOAT&&(G=i.RGBA32F),w===i.HALF_FLOAT&&(G=i.RGBA16F),w===i.UNSIGNED_BYTE&&(G=gt===Te?i.SRGB8_ALPHA8:i.RGBA8),w===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),w===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function _(E,v){let w;return E?v===null||v===Zi||v===Ir?w=i.DEPTH24_STENCIL8:v===Bn?w=i.DEPTH32F_STENCIL8:v===Rr&&(w=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Zi||v===Ir?w=i.DEPTH_COMPONENT24:v===Bn?w=i.DEPTH_COMPONENT32F:v===Rr&&(w=i.DEPTH_COMPONENT16),w}function A(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==sn&&E.minFilter!==gn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function R(E){let v=E.target;v.removeEventListener("dispose",R),L(v),v.isVideoTexture&&h.delete(v)}function C(E){let v=E.target;v.removeEventListener("dispose",C),S(v)}function L(E){let v=n.get(E);if(v.__webglInit===void 0)return;let w=E.source,B=f.get(w);if(B){let k=B[v.__cacheKey];k.usedTimes--,k.usedTimes===0&&M(E),Object.keys(B).length===0&&f.delete(w)}n.remove(E)}function M(E){let v=n.get(E);i.deleteTexture(v.__webglTexture);let w=E.source,B=f.get(w);delete B[v.__cacheKey],o.memory.textures--}function S(E){let v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(v.__webglFramebuffer[B]))for(let k=0;k<v.__webglFramebuffer[B].length;k++)i.deleteFramebuffer(v.__webglFramebuffer[B][k]);else i.deleteFramebuffer(v.__webglFramebuffer[B]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[B])}else{if(Array.isArray(v.__webglFramebuffer))for(let B=0;B<v.__webglFramebuffer.length;B++)i.deleteFramebuffer(v.__webglFramebuffer[B]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let B=0;B<v.__webglColorRenderbuffer.length;B++)v.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[B]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let w=E.textures;for(let B=0,k=w.length;B<k;B++){let G=n.get(w[B]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),o.memory.textures--),n.remove(w[B])}n.remove(E)}let U=0;function V(){U=0}function J(){let E=U;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),U+=1,E}function Y(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function st(E,v){let w=n.get(E);if(E.isVideoTexture&&Xt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&w.__version!==E.version){let B=E.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(w,E,v);return}}else E.isExternalTexture&&(w.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,w.__webglTexture,i.TEXTURE0+v)}function $(E,v){let w=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&w.__version!==E.version){K(w,E,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,w.__webglTexture,i.TEXTURE0+v)}function F(E,v){let w=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&w.__version!==E.version){K(w,E,v);return}e.bindTexture(i.TEXTURE_3D,w.__webglTexture,i.TEXTURE0+v)}function I(E,v){let w=n.get(E);if(E.version>0&&w.__version!==E.version){D(w,E,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+v)}let X={[Nn]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[ur]:i.MIRRORED_REPEAT},j={[sn]:i.NEAREST,[Nc]:i.NEAREST_MIPMAP_NEAREST,[As]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[Ar]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},et={[Jd]:i.NEVER,[sp]:i.ALWAYS,[Qd]:i.LESS,[jh]:i.LEQUAL,[tp]:i.EQUAL,[ip]:i.GEQUAL,[ep]:i.GREATER,[np]:i.NOTEQUAL};function Mt(E,v){if(v.type===Bn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===gn||v.magFilter===Ar||v.magFilter===As||v.magFilter===Zn||v.minFilter===gn||v.minFilter===Ar||v.minFilter===As||v.minFilter===Zn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,X[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,X[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,X[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,j[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,j[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,et[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===sn||v.minFilter!==As&&v.minFilter!==Zn||v.type===Bn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let w=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,w.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ft(E,v){let w=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",R));let B=v.source,k=f.get(B);k===void 0&&(k={},f.set(B,k));let G=Y(v);if(G!==E.__cacheKey){k[G]===void 0&&(k[G]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,w=!0),k[G].usedTimes++;let gt=k[E.__cacheKey];gt!==void 0&&(k[E.__cacheKey].usedTimes--,gt.usedTimes===0&&M(v)),E.__cacheKey=G,E.__webglTexture=k[G].texture}return w}function Ut(E,v,w){return Math.floor(Math.floor(E/w)/v)}function Lt(E,v,w,B){let G=E.updateRanges;if(G.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,w,B,v.data);else{G.sort((ct,St)=>ct.start-St.start);let gt=0;for(let ct=1;ct<G.length;ct++){let St=G[gt],Nt=G[ct],wt=St.start+St.count,Et=Ut(Nt.start,v.width,4),$t=Ut(St.start,v.width,4);Nt.start<=wt+1&&Et===$t&&Ut(Nt.start+Nt.count-1,v.width,4)===Et?St.count=Math.max(St.count,Nt.start+Nt.count-St.start):(++gt,G[gt]=Nt)}G.length=gt+1;let it=i.getParameter(i.UNPACK_ROW_LENGTH),rt=i.getParameter(i.UNPACK_SKIP_PIXELS),ht=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ct=0,St=G.length;ct<St;ct++){let Nt=G[ct],wt=Math.floor(Nt.start/4),Et=Math.ceil(Nt.count/4),$t=wt%v.width,O=Math.floor(wt/v.width),_t=Et,xt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,$t),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,$t,O,_t,xt,w,B,v.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),i.pixelStorei(i.UNPACK_SKIP_ROWS,ht)}}function K(E,v,w){let B=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(B=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(B=i.TEXTURE_3D);let k=ft(E,v),G=v.source;e.bindTexture(B,E.__webglTexture,i.TEXTURE0+w);let gt=n.get(G);if(G.version!==gt.__version||k===!0){e.activeTexture(i.TEXTURE0+w);let it=de.getPrimaries(de.workingColorSpace),rt=v.colorSpace===Ri?null:de.getPrimaries(v.colorSpace),ht=v.colorSpace===Ri||it===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let ct=x(v.image,!1,s.maxTextureSize);ct=Q(v,ct);let St=r.convert(v.format,v.colorSpace),Nt=r.convert(v.type),wt=y(v.internalFormat,St,Nt,v.colorSpace,v.isVideoTexture);Mt(B,v);let Et,$t=v.mipmaps,O=v.isVideoTexture!==!0,_t=gt.__version===void 0||k===!0,xt=G.dataReady,Ct=A(v,ct);if(v.isDepthTexture)wt=_(v.format===Pr,v.type),_t&&(O?e.texStorage2D(i.TEXTURE_2D,1,wt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,wt,ct.width,ct.height,0,St,Nt,null));else if(v.isDataTexture)if($t.length>0){O&&_t&&e.texStorage2D(i.TEXTURE_2D,Ct,wt,$t[0].width,$t[0].height);for(let pt=0,ot=$t.length;pt<ot;pt++)Et=$t[pt],O?xt&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,Et.width,Et.height,St,Nt,Et.data):e.texImage2D(i.TEXTURE_2D,pt,wt,Et.width,Et.height,0,St,Nt,Et.data);v.generateMipmaps=!1}else O?(_t&&e.texStorage2D(i.TEXTURE_2D,Ct,wt,ct.width,ct.height),xt&&Lt(v,ct,St,Nt)):e.texImage2D(i.TEXTURE_2D,0,wt,ct.width,ct.height,0,St,Nt,ct.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){O&&_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ct,wt,$t[0].width,$t[0].height,ct.depth);for(let pt=0,ot=$t.length;pt<ot;pt++)if(Et=$t[pt],v.format!==In)if(St!==null)if(O){if(xt)if(v.layerUpdates.size>0){let Bt=ru(Et.width,Et.height,v.format,v.type);for(let ne of v.layerUpdates){let be=Et.data.subarray(ne*Bt/Et.data.BYTES_PER_ELEMENT,(ne+1)*Bt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,ne,Et.width,Et.height,1,St,be)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,Et.width,Et.height,ct.depth,St,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pt,wt,Et.width,Et.height,ct.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?xt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,Et.width,Et.height,ct.depth,St,Nt,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,pt,wt,Et.width,Et.height,ct.depth,0,St,Nt,Et.data)}else{O&&_t&&e.texStorage2D(i.TEXTURE_2D,Ct,wt,$t[0].width,$t[0].height);for(let pt=0,ot=$t.length;pt<ot;pt++)Et=$t[pt],v.format!==In?St!==null?O?xt&&e.compressedTexSubImage2D(i.TEXTURE_2D,pt,0,0,Et.width,Et.height,St,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,pt,wt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?xt&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,Et.width,Et.height,St,Nt,Et.data):e.texImage2D(i.TEXTURE_2D,pt,wt,Et.width,Et.height,0,St,Nt,Et.data)}else if(v.isDataArrayTexture)if(O){if(_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ct,wt,ct.width,ct.height,ct.depth),xt)if(v.layerUpdates.size>0){let pt=ru(ct.width,ct.height,v.format,v.type);for(let ot of v.layerUpdates){let Bt=ct.data.subarray(ot*pt/ct.data.BYTES_PER_ELEMENT,(ot+1)*pt/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ot,ct.width,ct.height,1,St,Nt,Bt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,St,Nt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,wt,ct.width,ct.height,ct.depth,0,St,Nt,ct.data);else if(v.isData3DTexture)O?(_t&&e.texStorage3D(i.TEXTURE_3D,Ct,wt,ct.width,ct.height,ct.depth),xt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,St,Nt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,wt,ct.width,ct.height,ct.depth,0,St,Nt,ct.data);else if(v.isFramebufferTexture){if(_t)if(O)e.texStorage2D(i.TEXTURE_2D,Ct,wt,ct.width,ct.height);else{let pt=ct.width,ot=ct.height;for(let Bt=0;Bt<Ct;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,wt,pt,ot,0,St,Nt,null),pt>>=1,ot>>=1}}else if($t.length>0){if(O&&_t){let pt=yt($t[0]);e.texStorage2D(i.TEXTURE_2D,Ct,wt,pt.width,pt.height)}for(let pt=0,ot=$t.length;pt<ot;pt++)Et=$t[pt],O?xt&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,St,Nt,Et):e.texImage2D(i.TEXTURE_2D,pt,wt,St,Nt,Et);v.generateMipmaps=!1}else if(O){if(_t){let pt=yt(ct);e.texStorage2D(i.TEXTURE_2D,Ct,wt,pt.width,pt.height)}xt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Nt,ct)}else e.texImage2D(i.TEXTURE_2D,0,wt,St,Nt,ct);m(v)&&p(B),gt.__version=G.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function D(E,v,w){if(v.image.length!==6)return;let B=ft(E,v),k=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+w);let G=n.get(k);if(k.version!==G.__version||B===!0){e.activeTexture(i.TEXTURE0+w);let gt=de.getPrimaries(de.workingColorSpace),it=v.colorSpace===Ri?null:de.getPrimaries(v.colorSpace),rt=v.colorSpace===Ri||gt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);let ht=v.isCompressedTexture||v.image[0].isCompressedTexture,ct=v.image[0]&&v.image[0].isDataTexture,St=[];for(let ot=0;ot<6;ot++)!ht&&!ct?St[ot]=x(v.image[ot],!0,s.maxCubemapSize):St[ot]=ct?v.image[ot].image:v.image[ot],St[ot]=Q(v,St[ot]);let Nt=St[0],wt=r.convert(v.format,v.colorSpace),Et=r.convert(v.type),$t=y(v.internalFormat,wt,Et,v.colorSpace),O=v.isVideoTexture!==!0,_t=G.__version===void 0||B===!0,xt=k.dataReady,Ct=A(v,Nt);Mt(i.TEXTURE_CUBE_MAP,v);let pt;if(ht){O&&_t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,$t,Nt.width,Nt.height);for(let ot=0;ot<6;ot++){pt=St[ot].mipmaps;for(let Bt=0;Bt<pt.length;Bt++){let ne=pt[Bt];v.format!==In?wt!==null?O?xt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,0,0,ne.width,ne.height,wt,ne.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,$t,ne.width,ne.height,0,ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,0,0,ne.width,ne.height,wt,Et,ne.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,$t,ne.width,ne.height,0,wt,Et,ne.data)}}}else{if(pt=v.mipmaps,O&&_t){pt.length>0&&Ct++;let ot=yt(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,$t,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(ct){O?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,St[ot].width,St[ot].height,wt,Et,St[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,St[ot].width,St[ot].height,0,wt,Et,St[ot].data);for(let Bt=0;Bt<pt.length;Bt++){let be=pt[Bt].image[ot].image;O?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,0,0,be.width,be.height,wt,Et,be.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,$t,be.width,be.height,0,wt,Et,be.data)}}else{O?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,wt,Et,St[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,wt,Et,St[ot]);for(let Bt=0;Bt<pt.length;Bt++){let ne=pt[Bt];O?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,0,0,wt,Et,ne.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,$t,wt,Et,ne.image[ot])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),G.__version=k.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function nt(E,v,w,B,k,G){let gt=r.convert(w.format,w.colorSpace),it=r.convert(w.type),rt=y(w.internalFormat,gt,it,w.colorSpace),ht=n.get(v),ct=n.get(w);if(ct.__renderTarget=v,!ht.__hasExternalTextures){let St=Math.max(1,v.width>>G),Nt=Math.max(1,v.height>>G);k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?e.texImage3D(k,G,rt,St,Nt,v.depth,0,gt,it,null):e.texImage2D(k,G,rt,St,Nt,0,gt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),Ot(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,B,k,ct.__webglTexture,0,pe(v)):(k===i.TEXTURE_2D||k>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,B,k,ct.__webglTexture,G),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(E,v,w){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){let B=v.depthTexture,k=B&&B.isDepthTexture?B.type:null,G=_(v.stencilBuffer,k),gt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=pe(v);Ot(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,G,v.width,v.height):w?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,G,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,G,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,E)}else{let B=v.textures;for(let k=0;k<B.length;k++){let G=B[k],gt=r.convert(G.format,G.colorSpace),it=r.convert(G.type),rt=y(G.internalFormat,gt,it,G.colorSpace),ht=pe(v);w&&Ot(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,rt,v.width,v.height):Ot(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,rt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,rt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function vt(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let B=n.get(v.depthTexture);B.__renderTarget=v,(!B.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),st(v.depthTexture,0);let k=B.__webglTexture,G=pe(v);if(v.depthTexture.format===fr)Ot(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,k,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,k,0);else if(v.depthTexture.format===Pr)Ot(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,k,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function Kt(E){let v=n.get(E),w=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let B=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),B){let k=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,B.removeEventListener("dispose",k)};B.addEventListener("dispose",k),v.__depthDisposeCallback=k}v.__boundDepthTexture=B}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(w)throw new Error("target.depthTexture not supported in Cube render targets");let B=E.texture.mipmaps;B&&B.length>0?vt(v.__webglFramebuffer[0],E):vt(v.__webglFramebuffer,E)}else if(w){v.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[B]),v.__webglDepthbuffer[B]===void 0)v.__webglDepthbuffer[B]=i.createRenderbuffer(),Ht(v.__webglDepthbuffer[B],E,!1);else{let k=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=v.__webglDepthbuffer[B];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,k,i.RENDERBUFFER,G)}}else{let B=E.texture.mipmaps;if(B&&B.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ht(v.__webglDepthbuffer,E,!1);else{let k=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,k,i.RENDERBUFFER,G)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Se(E,v,w){let B=n.get(E);v!==void 0&&nt(B.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),w!==void 0&&Kt(E)}function N(E){let v=E.texture,w=n.get(E),B=n.get(v);E.addEventListener("dispose",C);let k=E.textures,G=E.isWebGLCubeRenderTarget===!0,gt=k.length>1;if(gt||(B.__webglTexture===void 0&&(B.__webglTexture=i.createTexture()),B.__version=v.version,o.memory.textures++),G){w.__webglFramebuffer=[];for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0){w.__webglFramebuffer[it]=[];for(let rt=0;rt<v.mipmaps.length;rt++)w.__webglFramebuffer[it][rt]=i.createFramebuffer()}else w.__webglFramebuffer[it]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){w.__webglFramebuffer=[];for(let it=0;it<v.mipmaps.length;it++)w.__webglFramebuffer[it]=i.createFramebuffer()}else w.__webglFramebuffer=i.createFramebuffer();if(gt)for(let it=0,rt=k.length;it<rt;it++){let ht=n.get(k[it]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&Ot(E)===!1){w.__webglMultisampledFramebuffer=i.createFramebuffer(),w.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,w.__webglMultisampledFramebuffer);for(let it=0;it<k.length;it++){let rt=k[it];w.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,w.__webglColorRenderbuffer[it]);let ht=r.convert(rt.format,rt.colorSpace),ct=r.convert(rt.type),St=y(rt.internalFormat,ht,ct,rt.colorSpace,E.isXRRenderTarget===!0),Nt=pe(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,St,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,w.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(w.__webglDepthRenderbuffer=i.createRenderbuffer(),Ht(w.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture),Mt(i.TEXTURE_CUBE_MAP,v);for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0)for(let rt=0;rt<v.mipmaps.length;rt++)nt(w.__webglFramebuffer[it][rt],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,rt);else nt(w.__webglFramebuffer[it],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let it=0,rt=k.length;it<rt;it++){let ht=k[it],ct=n.get(ht),St=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(St=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(St,ct.__webglTexture),Mt(St,ht),nt(w.__webglFramebuffer,E,ht,i.COLOR_ATTACHMENT0+it,St,0),m(ht)&&p(St)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(it=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,B.__webglTexture),Mt(it,v),v.mipmaps&&v.mipmaps.length>0)for(let rt=0;rt<v.mipmaps.length;rt++)nt(w.__webglFramebuffer[rt],E,v,i.COLOR_ATTACHMENT0,it,rt);else nt(w.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,it,0);m(v)&&p(it),e.unbindTexture()}E.depthBuffer&&Kt(E)}function Zt(E){let v=E.textures;for(let w=0,B=v.length;w<B;w++){let k=v[w];if(m(k)){let G=b(E),gt=n.get(k).__webglTexture;e.bindTexture(G,gt),p(G),e.unbindTexture()}}}let Dt=[],Vt=[];function kt(E){if(E.samples>0){if(Ot(E)===!1){let v=E.textures,w=E.width,B=E.height,k=i.COLOR_BUFFER_BIT,G=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(E),it=v.length>1;if(it)for(let ht=0;ht<v.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);let rt=E.texture.mipmaps;rt&&rt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let ht=0;ht<v.length;ht++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(k|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(k|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[ht]);let ct=n.get(v[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,w,B,0,0,w,B,k,i.NEAREST),c===!0&&(Dt.length=0,Vt.length=0,Dt.push(i.COLOR_ATTACHMENT0+ht),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Dt.push(G),Vt.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Vt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Dt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let ht=0;ht<v.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,gt.__webglColorRenderbuffer[ht]);let ct=n.get(v[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function pe(E){return Math.min(s.maxSamples,E.samples)}function Ot(E){let v=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Xt(E){let v=o.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function Q(E,v){let w=E.colorSpace,B=E.format,k=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||w!==rn&&w!==Ri&&(de.getTransfer(w)===Te?(B!==In||k!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",w)),v}function yt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=J,this.resetTextureUnits=V,this.setTexture2D=st,this.setTexture2DArray=$,this.setTexture3D=F,this.setTextureCube=I,this.rebindTextures=Se,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=Ot}function Bv(i,t){function e(n,s=Ri){let r,o=de.getTransfer(s);if(n===Kn)return i.UNSIGNED_BYTE;if(n===Fc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gh)return i.BYTE;if(n===Wh)return i.SHORT;if(n===Rr)return i.UNSIGNED_SHORT;if(n===Uc)return i.INT;if(n===Zi)return i.UNSIGNED_INT;if(n===Bn)return i.FLOAT;if(n===Cr)return i.HALF_FLOAT;if(n===Yh)return i.ALPHA;if(n===$h)return i.RGB;if(n===In)return i.RGBA;if(n===fr)return i.DEPTH_COMPONENT;if(n===Pr)return i.DEPTH_STENCIL;if(n===Bc)return i.RED;if(n===kc)return i.RED_INTEGER;if(n===Zh)return i.RG;if(n===zc)return i.RG_INTEGER;if(n===Hc)return i.RGBA_INTEGER;if(n===Zo||n===Ko||n===jo||n===Jo)if(o===Te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vc||n===Gc||n===Wc||n===Xc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qc||n===Yc||n===$c)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qc||n===Yc)return o===Te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===$c)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zc||n===Kc||n===jc||n===Jc||n===Qc||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===cl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zc)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Kc)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jc)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jc)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qc)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===el)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===il)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ol)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===al)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cl)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ll||n===hl||n===ul)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ll)return o===Te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ul)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fl||n===dl||n===pl||n===ml)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===fl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ml)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}function Vv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,eu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===on&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===on&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=t.get(p),y=b.envMap,_=b.envMapRotation;y&&(m.envMap.value=y,Is.copy(_),Is.x*=-1,Is.y*=-1,Is.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Is.y*=-1,Is.z*=-1),m.envMapRotation.value.setFromMatrix4(Hv.makeRotationFromEuler(Is)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===on&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Gv(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,y){let _=y.program;n.uniformBlockBinding(b,_)}function l(b,y){let _=s[b.id];_===void 0&&(g(b),_=h(b),s[b.id]=_,b.addEventListener("dispose",m));let A=y.program;n.updateUBOMapping(b,A);let R=t.render.frame;r[b.id]!==R&&(f(b),r[b.id]=R)}function h(b){let y=u();b.__bindingPointIndex=y;let _=i.createBuffer(),A=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,A,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let y=s[b.id],_=b.uniforms,A=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let R=0,C=_.length;R<C;R++){let L=Array.isArray(_[R])?_[R]:[_[R]];for(let M=0,S=L.length;M<S;M++){let U=L[M];if(d(U,R,M,A)===!0){let V=U.__offset,J=Array.isArray(U.value)?U.value:[U.value],Y=0;for(let st=0;st<J.length;st++){let $=J[st],F=x($);typeof $=="number"||typeof $=="boolean"?(U.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,V+Y,U.__data)):$.isMatrix3?(U.__data[0]=$.elements[0],U.__data[1]=$.elements[1],U.__data[2]=$.elements[2],U.__data[3]=0,U.__data[4]=$.elements[3],U.__data[5]=$.elements[4],U.__data[6]=$.elements[5],U.__data[7]=0,U.__data[8]=$.elements[6],U.__data[9]=$.elements[7],U.__data[10]=$.elements[8],U.__data[11]=0):($.toArray(U.__data,Y),Y+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,y,_,A){let R=b.value,C=y+"_"+_;if(A[C]===void 0)return typeof R=="number"||typeof R=="boolean"?A[C]=R:A[C]=R.clone(),!0;{let L=A[C];if(typeof R=="number"||typeof R=="boolean"){if(L!==R)return A[C]=R,!0}else if(L.equals(R)===!1)return L.copy(R),!0}return!1}function g(b){let y=b.uniforms,_=0,A=16;for(let C=0,L=y.length;C<L;C++){let M=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,U=M.length;S<U;S++){let V=M[S],J=Array.isArray(V.value)?V.value:[V.value];for(let Y=0,st=J.length;Y<st;Y++){let $=J[Y],F=x($),I=_%A,X=I%F.boundary,j=I+X;_+=X,j!==0&&A-j<F.storage&&(_+=A-j),V.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=_,_+=F.storage}}}let R=_%A;return R>0&&(_+=A-R),b.__size=_,b.__cache={},this}function x(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){let y=b.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var _0,x0,y0,v0,M0,S0,b0,E0,T0,w0,A0,R0,C0,I0,P0,L0,D0,N0,U0,F0,O0,B0,k0,z0,H0,V0,G0,W0,X0,q0,Y0,$0,Z0,K0,j0,J0,Q0,t_,e_,n_,i_,s_,r_,o_,a_,c_,l_,h_,u_,f_,d_,p_,m_,g_,__,x_,y_,v_,M_,S_,b_,E_,T_,w_,A_,R_,C_,I_,P_,L_,D_,N_,U_,F_,O_,B_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,$_,Z_,K_,j_,J_,Q_,tx,ex,nx,ix,sx,rx,ox,ax,cx,lx,hx,ux,fx,dx,px,mx,gx,_x,xx,yx,vx,Mx,Sx,bx,Ex,Tx,wx,Ax,Rx,Cx,Ix,Px,Lx,Dx,Nx,Ux,Fx,Ox,Bx,kx,zx,Hx,Vx,Gx,Wx,Xx,qx,Yx,$x,Zx,ae,Ft,ui,_l,Cs,Kx,Nr,gp,Ls,au,_p,cu,lu,hu,uu,Ps,Dr,xp,iy,Fr,zp,Sp,Hp,Vp,Gp,bp,Ep,Tp,wp,Ap,du,pu,mu,fu,Ur,tv,ev,Ip,yl,hv,uv,dv,Mv,_u,xu,Rv,Lv,Dv,Uv,kv,zv,yu,vu,Is,Hv,Or,jn=kl(()=>{ou();ou();_0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,x0=`#ifdef USE_ALPHAHASH
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
#endif`,y0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,v0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,S0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,b0=`#ifdef USE_AOMAP
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
#endif`,E0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,T0=`#ifdef USE_BATCHING
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
#endif`,w0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,I0=`#ifdef USE_IRIDESCENCE
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
#endif`,P0=`#ifdef USE_BUMPMAP
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
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,O0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,k0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,z0=`#define PI 3.141592653589793
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
} // validated`,H0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,V0=`vec3 transformedNormal = objectNormal;
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
#endif`,G0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Y0="gl_FragColor = linearToOutputTexel( gl_FragColor );",$0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Z0=`#ifdef USE_ENVMAP
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
#endif`,K0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,j0=`#ifdef USE_ENVMAP
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
#endif`,J0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Q0=`#ifdef USE_ENVMAP
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
#endif`,t_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,e_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s_=`#ifdef USE_GRADIENTMAP
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
}`,r_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,a_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c_=`uniform bool receiveShadow;
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
#endif`,l_=`#ifdef USE_ENVMAP
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
#endif`,h_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,u_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,f_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,d_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p_=`PhysicalMaterial material;
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
#endif`,m_=`struct PhysicalMaterial {
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
}`,g_=`
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
#endif`,__=`#if defined( RE_IndirectDiffuse )
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
#endif`,x_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,y_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,v_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,b_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,E_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,T_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,w_=`#if defined( USE_POINTS_UV )
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
#endif`,A_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,R_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,C_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,I_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,P_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L_=`#ifdef USE_MORPHTARGETS
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
#endif`,D_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,U_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,F_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,k_=`#ifdef USE_NORMALMAP
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
#endif`,z_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,H_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,W_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,X_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,q_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Z_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ex=`float getShadowMask() {
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
}`,nx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ix=`#ifdef USE_SKINNING
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
#endif`,sx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rx=`#ifdef USE_SKINNING
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
#endif`,ox=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hx=`#ifdef USE_TRANSMISSION
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
#endif`,ux=`#ifdef USE_TRANSMISSION
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
#endif`,fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_x=`uniform sampler2D t2D;
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
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sx=`#include <common>
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
}`,bx=`#if DEPTH_PACKING == 3200
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
}`,Ex=`#define DISTANCE
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
}`,Tx=`#define DISTANCE
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
}`,wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ax=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`uniform float scale;
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
}`,Cx=`uniform vec3 diffuse;
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
}`,Ix=`#include <common>
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
}`,Px=`uniform vec3 diffuse;
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
}`,Lx=`#define LAMBERT
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
}`,Dx=`#define LAMBERT
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
}`,Nx=`#define MATCAP
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
}`,Ux=`#define MATCAP
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
}`,Fx=`#define NORMAL
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
}`,Ox=`#define NORMAL
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
}`,Bx=`#define PHONG
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
}`,kx=`#define PHONG
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
}`,zx=`#define STANDARD
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
}`,Hx=`#define STANDARD
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
}`,Vx=`#define TOON
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
}`,Gx=`#define TOON
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
}`,Wx=`uniform float size;
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
}`,Xx=`uniform vec3 diffuse;
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
}`,qx=`#include <common>
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
}`,Yx=`uniform vec3 color;
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
}`,$x=`uniform float rotation;
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
}`,Zx=`uniform vec3 diffuse;
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
}`,ae={alphahash_fragment:_0,alphahash_pars_fragment:x0,alphamap_fragment:y0,alphamap_pars_fragment:v0,alphatest_fragment:M0,alphatest_pars_fragment:S0,aomap_fragment:b0,aomap_pars_fragment:E0,batching_pars_vertex:T0,batching_vertex:w0,begin_vertex:A0,beginnormal_vertex:R0,bsdfs:C0,iridescence_fragment:I0,bumpmap_pars_fragment:P0,clipping_planes_fragment:L0,clipping_planes_pars_fragment:D0,clipping_planes_pars_vertex:N0,clipping_planes_vertex:U0,color_fragment:F0,color_pars_fragment:O0,color_pars_vertex:B0,color_vertex:k0,common:z0,cube_uv_reflection_fragment:H0,defaultnormal_vertex:V0,displacementmap_pars_vertex:G0,displacementmap_vertex:W0,emissivemap_fragment:X0,emissivemap_pars_fragment:q0,colorspace_fragment:Y0,colorspace_pars_fragment:$0,envmap_fragment:Z0,envmap_common_pars_fragment:K0,envmap_pars_fragment:j0,envmap_pars_vertex:J0,envmap_physical_pars_fragment:l_,envmap_vertex:Q0,fog_vertex:t_,fog_pars_vertex:e_,fog_fragment:n_,fog_pars_fragment:i_,gradientmap_pars_fragment:s_,lightmap_pars_fragment:r_,lights_lambert_fragment:o_,lights_lambert_pars_fragment:a_,lights_pars_begin:c_,lights_toon_fragment:h_,lights_toon_pars_fragment:u_,lights_phong_fragment:f_,lights_phong_pars_fragment:d_,lights_physical_fragment:p_,lights_physical_pars_fragment:m_,lights_fragment_begin:g_,lights_fragment_maps:__,lights_fragment_end:x_,logdepthbuf_fragment:y_,logdepthbuf_pars_fragment:v_,logdepthbuf_pars_vertex:M_,logdepthbuf_vertex:S_,map_fragment:b_,map_pars_fragment:E_,map_particle_fragment:T_,map_particle_pars_fragment:w_,metalnessmap_fragment:A_,metalnessmap_pars_fragment:R_,morphinstance_vertex:C_,morphcolor_vertex:I_,morphnormal_vertex:P_,morphtarget_pars_vertex:L_,morphtarget_vertex:D_,normal_fragment_begin:N_,normal_fragment_maps:U_,normal_pars_fragment:F_,normal_pars_vertex:O_,normal_vertex:B_,normalmap_pars_fragment:k_,clearcoat_normal_fragment_begin:z_,clearcoat_normal_fragment_maps:H_,clearcoat_pars_fragment:V_,iridescence_pars_fragment:G_,opaque_fragment:W_,packing:X_,premultiplied_alpha_fragment:q_,project_vertex:Y_,dithering_fragment:$_,dithering_pars_fragment:Z_,roughnessmap_fragment:K_,roughnessmap_pars_fragment:j_,shadowmap_pars_fragment:J_,shadowmap_pars_vertex:Q_,shadowmap_vertex:tx,shadowmask_pars_fragment:ex,skinbase_vertex:nx,skinning_pars_vertex:ix,skinning_vertex:sx,skinnormal_vertex:rx,specularmap_fragment:ox,specularmap_pars_fragment:ax,tonemapping_fragment:cx,tonemapping_pars_fragment:lx,transmission_fragment:hx,transmission_pars_fragment:ux,uv_pars_fragment:fx,uv_pars_vertex:dx,uv_vertex:px,worldpos_vertex:mx,background_vert:gx,background_frag:_x,backgroundCube_vert:xx,backgroundCube_frag:yx,cube_vert:vx,cube_frag:Mx,depth_vert:Sx,depth_frag:bx,distanceRGBA_vert:Ex,distanceRGBA_frag:Tx,equirect_vert:wx,equirect_frag:Ax,linedashed_vert:Rx,linedashed_frag:Cx,meshbasic_vert:Ix,meshbasic_frag:Px,meshlambert_vert:Lx,meshlambert_frag:Dx,meshmatcap_vert:Nx,meshmatcap_frag:Ux,meshnormal_vert:Fx,meshnormal_frag:Ox,meshphong_vert:Bx,meshphong_frag:kx,meshphysical_vert:zx,meshphysical_frag:Hx,meshtoon_vert:Vx,meshtoon_frag:Gx,points_vert:Wx,points_frag:Xx,shadow_vert:qx,shadow_frag:Yx,sprite_vert:$x,sprite_frag:Zx},Ft={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},ui={basic:{uniforms:dn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:ae.meshbasic_vert,fragmentShader:ae.meshbasic_frag},lambert:{uniforms:dn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new Qt(0)}}]),vertexShader:ae.meshlambert_vert,fragmentShader:ae.meshlambert_frag},phong:{uniforms:dn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:ae.meshphong_vert,fragmentShader:ae.meshphong_frag},standard:{uniforms:dn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag},toon:{uniforms:dn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new Qt(0)}}]),vertexShader:ae.meshtoon_vert,fragmentShader:ae.meshtoon_frag},matcap:{uniforms:dn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:ae.meshmatcap_vert,fragmentShader:ae.meshmatcap_frag},points:{uniforms:dn([Ft.points,Ft.fog]),vertexShader:ae.points_vert,fragmentShader:ae.points_frag},dashed:{uniforms:dn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ae.linedashed_vert,fragmentShader:ae.linedashed_frag},depth:{uniforms:dn([Ft.common,Ft.displacementmap]),vertexShader:ae.depth_vert,fragmentShader:ae.depth_frag},normal:{uniforms:dn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:ae.meshnormal_vert,fragmentShader:ae.meshnormal_frag},sprite:{uniforms:dn([Ft.sprite,Ft.fog]),vertexShader:ae.sprite_vert,fragmentShader:ae.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ae.background_vert,fragmentShader:ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:ae.backgroundCube_vert,fragmentShader:ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ae.cube_vert,fragmentShader:ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ae.equirect_vert,fragmentShader:ae.equirect_frag},distanceRGBA:{uniforms:dn([Ft.common,Ft.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ae.distanceRGBA_vert,fragmentShader:ae.distanceRGBA_frag},shadow:{uniforms:dn([Ft.lights,Ft.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:ae.shadow_vert,fragmentShader:ae.shadow_frag}};ui.physical={uniforms:dn([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag};_l={r:0,b:0,g:0},Cs=new Fn,Kx=new ee;Nr=4,gp=[.125,.215,.35,.446,.526,.582],Ls=20,au=new Ei,_p=new Qt,cu=null,lu=0,hu=0,uu=!1,Ps=(1+Math.sqrt(5))/2,Dr=1/Ps,xp=[new P(-Ps,Dr,0),new P(Ps,Dr,0),new P(-Dr,0,Ps),new P(Dr,0,Ps),new P(0,Ps,-Dr),new P(0,Ps,Dr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],iy=new P,Fr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=iy}=r;cu=this._renderer.getRenderTarget(),lu=this._renderer.getActiveCubeFace(),hu=this._renderer.getActiveMipmapLevel(),uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(cu,lu,hu),this._renderer.xr.enabled=uu,t.scissorTest=!1,xl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ts||t.mapping===ws?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),cu=this._renderer.getRenderTarget(),lu=this._renderer.getActiveCubeFace(),hu=this._renderer.getActiveMipmapLevel(),uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Cr,format:In,colorSpace:rn,depthBuffer:!1},s=yp(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yp(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sy(r)),this._blurMaterial=ry(r,t,e)}return s}_compileMaterial(t){let e=new se(this._lodPlanes[0],t);this._renderer.compile(e,au)}_sceneToCubeUV(t,e,n,s,r){let c=new ke(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(_p),u.toneMapping=Ai,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let x=new Oe({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),m=new se(new Gi,x),p=!1,b=t.background;b?b.isColor&&(x.color.copy(b),t.background=null,p=!0):(x.color.copy(_p),p=!0);for(let y=0;y<6;y++){let _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));let A=this._cubeSize;xl(s,_*A,y>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=b}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ts||t.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new se(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;xl(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,au)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=xp[(s-r-1)%xp.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new se(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ls-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ls;m>Ls&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ls}`);let p=[],b=0;for(let C=0;C<Ls;++C){let L=C/x,M=Math.exp(-L*L/2);p.push(M),C===0?b+=M:C<m&&(b+=2*M)}for(let C=0;C<p.length;C++)p[C]=p[C]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let _=this._sizeLods[s],A=3*_*(s>y-Nr?s-y+Nr:0),R=4*(this._cubeSize-_);xl(e,A,R,3*_,2*_),c.setRenderTarget(e),c.render(u,au)}};zp=new je,Sp=new Ro(1,1),Hp=new _o,Vp=new nc,Gp=new Mo,bp=[],Ep=[],Tp=new Float32Array(16),wp=new Float32Array(9),Ap=new Float32Array(4);du=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ly(e.type)}},pu=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Jy(e.type)}},mu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},fu=/(\w+)(\])?(\[|\.)?/g;Ur=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Qy(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};tv=37297,ev=0;Ip=new re;yl=new P;hv=/^[ \t]*#include +<([\w\d./]+)>/gm;uv=new Map;dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;Mv=0,_u=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new xu(t),e.set(t,n)),n}},xu=class{constructor(t){this.id=Mv++,this.code=t,this.usedTimes=0}};Rv=0;Lv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dv=`uniform sampler2D shadow_pass;
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
}`;Uv={[bc]:Ec,[Tc]:Rc,[wc]:Cc,[hs]:Ac,[Ec]:bc,[Rc]:Tc,[Cc]:wc,[Ac]:hs};kv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zv=`
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

}`,yu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Co(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Rn({vertexShader:kv,fragmentShader:zv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new se(new vs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vu=class extends ii{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,x=typeof XRWebGLBinding<"u",m=new yu,p={},b=e.getContextAttributes(),y=null,_=null,A=[],R=[],C=new At,L=null,M=new ke;M.viewport=new ye;let S=new ke;S.viewport=new ye;let U=[M,S],V=new Sc,J=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let D=A[K];return D===void 0&&(D=new _r,A[K]=D),D.getTargetRaySpace()},this.getControllerGrip=function(K){let D=A[K];return D===void 0&&(D=new _r,A[K]=D),D.getGripSpace()},this.getHand=function(K){let D=A[K];return D===void 0&&(D=new _r,A[K]=D),D.getHandSpace()};function st(K){let D=R.indexOf(K.inputSource);if(D===-1)return;let nt=A[D];nt!==void 0&&(nt.update(K.inputSource,K.frame,l||o),nt.dispatchEvent({type:K.type,data:K.inputSource}))}function $(){s.removeEventListener("select",st),s.removeEventListener("selectstart",st),s.removeEventListener("selectend",st),s.removeEventListener("squeeze",st),s.removeEventListener("squeezestart",st),s.removeEventListener("squeezeend",st),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",F);for(let K=0;K<A.length;K++){let D=R[K];D!==null&&(R[K]=null,A[K].disconnect(D))}J=null,Y=null,m.reset();for(let K in p)delete p[K];t.setRenderTarget(y),d=null,f=null,u=null,s=null,_=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",st),s.addEventListener("selectstart",st),s.addEventListener("selectend",st),s.addEventListener("squeeze",st),s.addEventListener("squeezestart",st),s.addEventListener("squeezeend",st),s.addEventListener("end",$),s.addEventListener("inputsourceschange",F),b.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,Ht=null,vt=null;b.depth&&(vt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=b.stencil?Pr:fr,Ht=b.stencil?Ir:Zi);let Kt={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Kt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Un(f.textureWidth,f.textureHeight,{format:In,type:Kn,depthTexture:new Ro(f.textureWidth,f.textureHeight,Ht,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let nt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Un(d.framebufferWidth,d.framebufferHeight,{format:In,type:Kn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(K){for(let D=0;D<K.removed.length;D++){let nt=K.removed[D],Ht=R.indexOf(nt);Ht>=0&&(R[Ht]=null,A[Ht].disconnect(nt))}for(let D=0;D<K.added.length;D++){let nt=K.added[D],Ht=R.indexOf(nt);if(Ht===-1){for(let Kt=0;Kt<A.length;Kt++)if(Kt>=R.length){R.push(nt),Ht=Kt;break}else if(R[Kt]===null){R[Kt]=nt,Ht=Kt;break}if(Ht===-1)break}let vt=A[Ht];vt&&vt.connect(nt)}}let I=new P,X=new P;function j(K,D,nt){I.setFromMatrixPosition(D.matrixWorld),X.setFromMatrixPosition(nt.matrixWorld);let Ht=I.distanceTo(X),vt=D.projectionMatrix.elements,Kt=nt.projectionMatrix.elements,Se=vt[14]/(vt[10]-1),N=vt[14]/(vt[10]+1),Zt=(vt[9]+1)/vt[5],Dt=(vt[9]-1)/vt[5],Vt=(vt[8]-1)/vt[0],kt=(Kt[8]+1)/Kt[0],pe=Se*Vt,Ot=Se*kt,Xt=Ht/(-Vt+kt),Q=Xt*-Vt;if(D.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Q),K.translateZ(Xt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),vt[10]===-1)K.projectionMatrix.copy(D.projectionMatrix),K.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{let yt=Se+Xt,E=N+Xt,v=pe-Q,w=Ot+(Ht-Q),B=Zt*N/E*yt,k=Dt*N/E*yt;K.projectionMatrix.makePerspective(v,w,B,k,yt,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function et(K,D){D===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(D.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let D=K.near,nt=K.far;m.texture!==null&&(m.depthNear>0&&(D=m.depthNear),m.depthFar>0&&(nt=m.depthFar)),V.near=S.near=M.near=D,V.far=S.far=M.far=nt,(J!==V.near||Y!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),J=V.near,Y=V.far),V.layers.mask=K.layers.mask|6,M.layers.mask=V.layers.mask&3,S.layers.mask=V.layers.mask&5;let Ht=K.parent,vt=V.cameras;et(V,Ht);for(let Kt=0;Kt<vt.length;Kt++)et(vt[Kt],Ht);vt.length===2?j(V,M,S):V.projectionMatrix.copy(M.projectionMatrix),Mt(K,V,Ht)};function Mt(K,D,nt){nt===null?K.matrix.copy(D.matrixWorld):(K.matrix.copy(nt.matrixWorld),K.matrix.invert(),K.matrix.multiply(D.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(D.projectionMatrix),K.projectionMatrixInverse.copy(D.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ds*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(K){c=K,f!==null&&(f.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(K){return p[K]};let ft=null;function Ut(K,D){if(h=D.getViewerPose(l||o),g=D,h!==null){let nt=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Ht=!1;nt.length!==V.cameras.length&&(V.cameras.length=0,Ht=!0);for(let N=0;N<nt.length;N++){let Zt=nt[N],Dt=null;if(d!==null)Dt=d.getViewport(Zt);else{let kt=u.getViewSubImage(f,Zt);Dt=kt.viewport,N===0&&(t.setRenderTargetTextures(_,kt.colorTexture,kt.depthStencilTexture),t.setRenderTarget(_))}let Vt=U[N];Vt===void 0&&(Vt=new ke,Vt.layers.enable(N),Vt.viewport=new ye,U[N]=Vt),Vt.matrix.fromArray(Zt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Zt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),N===0&&(V.matrix.copy(Vt.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Ht===!0&&V.cameras.push(Vt)}let vt=s.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let N=u.getDepthInformation(nt[0]);N&&N.isValid&&N.texture&&m.init(N,s.renderState)}if(vt&&vt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let N=0;N<nt.length;N++){let Zt=nt[N].camera;if(Zt){let Dt=p[Zt];Dt||(Dt=new Co,p[Zt]=Dt);let Vt=u.getCameraImage(Zt);Dt.sourceTexture=Vt}}}}for(let nt=0;nt<A.length;nt++){let Ht=R[nt],vt=A[nt];Ht!==null&&vt!==void 0&&vt.update(Ht,D,l||o)}ft&&ft(K,D),D.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:D}),g=null}let Lt=new kp;Lt.setAnimationLoop(Ut),this.setAnimationLoop=function(K){ft=K},this.dispose=function(){}}},Is=new Fn,Hv=new ee;Or=class{constructor(t={}){let{canvas:e=rp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,b=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,A=!1;this._outputColorSpace=Fe;let R=0,C=0,L=null,M=-1,S=null,U=new ye,V=new ye,J=null,Y=new Qt(0),st=0,$=e.width,F=e.height,I=1,X=null,j=null,et=new ye(0,0,$,F),Mt=new ye(0,0,$,F),ft=!1,Ut=new vr,Lt=!1,K=!1,D=new ee,nt=new P,Ht=new ye,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Kt=!1;function Se(){return L===null?I:1}let N=n;function Zt(T,W){return e.getContext(T,W)}try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",pt,!1),N===null){let W="webgl2";if(N=Zt(W,T),N===null)throw Zt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Dt,Vt,kt,pe,Ot,Xt,Q,yt,E,v,w,B,k,G,gt,it,rt,ht,ct,St,Nt,wt,Et,$t;function O(){Dt=new ay(N),Dt.init(),wt=new Bv(N,Dt),Vt=new ty(N,Dt,t,wt),kt=new Fv(N,Dt),Vt.reversedDepthBuffer&&f&&kt.buffers.depth.setReversed(!0),pe=new hy(N),Ot=new bv,Xt=new Ov(N,Dt,kt,Ot,Vt,wt,pe),Q=new ny(_),yt=new oy(_),E=new g0(N),Et=new Jx(N,E),v=new cy(N,E,pe,Et),w=new fy(N,v,E,pe),ct=new uy(N,Vt,Xt),it=new ey(Ot),B=new Sv(_,Q,yt,Dt,Vt,Et,it),k=new Vv(_,Ot),G=new Tv,gt=new Pv(Dt),ht=new jx(_,Q,yt,kt,w,d,c),rt=new Nv(_,w,Vt),$t=new Gv(N,pe,Vt,kt),St=new Qx(N,Dt,pe),Nt=new ly(N,Dt,pe),pe.programs=B.programs,_.capabilities=Vt,_.extensions=Dt,_.properties=Ot,_.renderLists=G,_.shadowMap=rt,_.state=kt,_.info=pe}O();let _t=new vu(_,N);this.xr=_t,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let T=Dt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Dt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(T){T!==void 0&&(I=T,this.setSize($,F,!1))},this.getSize=function(T){return T.set($,F)},this.setSize=function(T,W,tt=!0){if(_t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=T,F=W,e.width=Math.floor(T*I),e.height=Math.floor(W*I),tt===!0&&(e.style.width=T+"px",e.style.height=W+"px"),this.setViewport(0,0,T,W)},this.getDrawingBufferSize=function(T){return T.set($*I,F*I).floor()},this.setDrawingBufferSize=function(T,W,tt){$=T,F=W,I=tt,e.width=Math.floor(T*tt),e.height=Math.floor(W*tt),this.setViewport(0,0,T,W)},this.getCurrentViewport=function(T){return T.copy(U)},this.getViewport=function(T){return T.copy(et)},this.setViewport=function(T,W,tt,z){T.isVector4?et.set(T.x,T.y,T.z,T.w):et.set(T,W,tt,z),kt.viewport(U.copy(et).multiplyScalar(I).round())},this.getScissor=function(T){return T.copy(Mt)},this.setScissor=function(T,W,tt,z){T.isVector4?Mt.set(T.x,T.y,T.z,T.w):Mt.set(T,W,tt,z),kt.scissor(V.copy(Mt).multiplyScalar(I).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(T){kt.setScissorTest(ft=T)},this.setOpaqueSort=function(T){X=T},this.setTransparentSort=function(T){j=T},this.getClearColor=function(T){return T.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(T=!0,W=!0,tt=!0){let z=0;if(T){let q=!1;if(L!==null){let ut=L.texture.format;q=ut===Hc||ut===zc||ut===kc}if(q){let ut=L.texture.type,It=ut===Kn||ut===Zi||ut===Rr||ut===Ir||ut===Fc||ut===Oc,Wt=ht.getClearColor(),Gt=ht.getClearAlpha(),te=Wt.r,jt=Wt.g,qt=Wt.b;It?(g[0]=te,g[1]=jt,g[2]=qt,g[3]=Gt,N.clearBufferuiv(N.COLOR,0,g)):(x[0]=te,x[1]=jt,x[2]=qt,x[3]=Gt,N.clearBufferiv(N.COLOR,0,x))}else z|=N.COLOR_BUFFER_BIT}W&&(z|=N.DEPTH_BUFFER_BIT),tt&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),ht.dispose(),G.dispose(),gt.dispose(),Ot.dispose(),Q.dispose(),yt.dispose(),w.dispose(),Et.dispose(),$t.dispose(),B.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",Ke),_t.removeEventListener("sessionend",ua),zn.stop()};function xt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let T=pe.autoReset,W=rt.enabled,tt=rt.autoUpdate,z=rt.needsUpdate,q=rt.type;O(),pe.autoReset=T,rt.enabled=W,rt.autoUpdate=tt,rt.needsUpdate=z,rt.type=q}function pt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ot(T){let W=T.target;W.removeEventListener("dispose",ot),Bt(W)}function Bt(T){ne(T),Ot.remove(T)}function ne(T){let W=Ot.get(T).programs;W!==void 0&&(W.forEach(function(tt){B.releaseProgram(tt)}),T.isShaderMaterial&&B.releaseShaderCache(T))}this.renderBufferDirect=function(T,W,tt,z,q,ut){W===null&&(W=vt);let It=q.isMesh&&q.matrixWorld.determinant()<0,Wt=Bl(T,W,tt,z,q);kt.setMaterial(z,It);let Gt=tt.index,te=1;if(z.wireframe===!0){if(Gt=v.getWireframeAttribute(tt),Gt===void 0)return;te=2}let jt=tt.drawRange,qt=tt.attributes.position,ie=jt.start*te,xe=(jt.start+jt.count)*te;ut!==null&&(ie=Math.max(ie,ut.start*te),xe=Math.min(xe,(ut.start+ut.count)*te)),Gt!==null?(ie=Math.max(ie,0),xe=Math.min(xe,Gt.count)):qt!=null&&(ie=Math.max(ie,0),xe=Math.min(xe,qt.count));let De=xe-ie;if(De<0||De===1/0)return;Et.setup(q,z,Wt,tt,Gt);let Re,fe=St;if(Gt!==null&&(Re=E.get(Gt),fe=Nt,fe.setIndex(Re)),q.isMesh)z.wireframe===!0?(kt.setLineWidth(z.wireframeLinewidth*Se()),fe.setMode(N.LINES)):fe.setMode(N.TRIANGLES);else if(q.isLine){let Yt=z.linewidth;Yt===void 0&&(Yt=1),kt.setLineWidth(Yt*Se()),q.isLineSegments?fe.setMode(N.LINES):q.isLineLoop?fe.setMode(N.LINE_LOOP):fe.setMode(N.LINE_STRIP)}else q.isPoints?fe.setMode(N.POINTS):q.isSprite&&fe.setMode(N.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)pr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),fe.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(Dt.get("WEBGL_multi_draw"))fe.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Yt=q._multiDrawStarts,Ce=q._multiDrawCounts,ce=q._multiDrawCount,cn=Gt?E.get(Gt).bytesPerElement:1,H=Ot.get(z).currentProgram.getUniforms();for(let Z=0;Z<ce;Z++)H.setValue(N,"_gl_DrawID",Z),fe.render(Yt[Z]/cn,Ce[Z])}else if(q.isInstancedMesh)fe.renderInstances(ie,De,q.count);else if(tt.isInstancedBufferGeometry){let Yt=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,Ce=Math.min(tt.instanceCount,Yt);fe.renderInstances(ie,De,Ce)}else fe.render(ie,De)};function be(T,W,tt){T.transparent===!0&&T.side===Be&&T.forceSinglePass===!1?(T.side=on,T.needsUpdate=!0,ts(T,W,tt),T.side=Yn,T.needsUpdate=!0,ts(T,W,tt),T.side=Be):ts(T,W,tt)}this.compile=function(T,W,tt=null){tt===null&&(tt=T),p=gt.get(tt),p.init(W),y.push(p),tt.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),T!==tt&&T.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),p.setupLights();let z=new Set;return T.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let ut=q.material;if(ut)if(Array.isArray(ut))for(let It=0;It<ut.length;It++){let Wt=ut[It];be(Wt,tt,q),z.add(Wt)}else be(ut,tt,q),z.add(ut)}),p=y.pop(),z},this.compileAsync=function(T,W,tt=null){let z=this.compile(T,W,tt);return new Promise(q=>{function ut(){if(z.forEach(function(It){Ot.get(It).currentProgram.isReady()&&z.delete(It)}),z.size===0){q(T);return}setTimeout(ut,10)}Dt.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let ge=null;function Xe(T){ge&&ge(T)}function Ke(){zn.stop()}function ua(){zn.start()}let zn=new kp;zn.setAnimationLoop(Xe),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(T){ge=T,_t.setAnimationLoop(T),T===null?zn.stop():zn.start()},_t.addEventListener("sessionstart",Ke),_t.addEventListener("sessionend",ua),this.render=function(T,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(_t.cameraAutoUpdate===!0&&_t.updateCamera(W),W=_t.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,W,L),p=gt.get(T,y.length),p.init(W),y.push(p),D.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Ut.setFromProjectionMatrix(D,qn,W.reversedDepth),K=this.localClippingEnabled,Lt=it.init(this.clippingPlanes,K),m=G.get(T,b.length),m.init(),b.push(m),_t.enabled===!0&&_t.isPresenting===!0){let ut=_.xr.getDepthSensingMesh();ut!==null&&Bs(ut,W,-1/0,_.sortObjects)}Bs(T,W,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(X,j),Kt=_t.enabled===!1||_t.isPresenting===!1||_t.hasDepthSensing()===!1,Kt&&ht.addToRenderList(m,T),this.info.render.frame++,Lt===!0&&it.beginShadows();let tt=p.state.shadowsArray;rt.render(tt,T,W),Lt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=m.opaque,q=m.transmissive;if(p.setupLights(),W.isArrayCamera){let ut=W.cameras;if(q.length>0)for(let It=0,Wt=ut.length;It<Wt;It++){let Gt=ut[It];Qi(z,q,T,Gt)}Kt&&ht.render(T);for(let It=0,Wt=ut.length;It<Wt;It++){let Gt=ut[It];Kr(m,T,Gt,Gt.viewport)}}else q.length>0&&Qi(z,q,T,W),Kt&&ht.render(T),Kr(m,T,W);L!==null&&C===0&&(Xt.updateMultisampleRenderTarget(L),Xt.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(_,T,W),Et.resetDefaultState(),M=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],Lt===!0&&it.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Bs(T,W,tt,z){if(T.visible===!1)return;if(T.layers.test(W.layers)){if(T.isGroup)tt=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(W);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ut.intersectsSprite(T)){z&&Ht.setFromMatrixPosition(T.matrixWorld).applyMatrix4(D);let It=w.update(T),Wt=T.material;Wt.visible&&m.push(T,It,Wt,tt,Ht.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ut.intersectsObject(T))){let It=w.update(T),Wt=T.material;if(z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ht.copy(T.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Ht.copy(It.boundingSphere.center)),Ht.applyMatrix4(T.matrixWorld).applyMatrix4(D)),Array.isArray(Wt)){let Gt=It.groups;for(let te=0,jt=Gt.length;te<jt;te++){let qt=Gt[te],ie=Wt[qt.materialIndex];ie&&ie.visible&&m.push(T,It,ie,tt,Ht.z,qt)}}else Wt.visible&&m.push(T,It,Wt,tt,Ht.z,null)}}let ut=T.children;for(let It=0,Wt=ut.length;It<Wt;It++)Bs(ut[It],W,tt,z)}function Kr(T,W,tt,z){let q=T.opaque,ut=T.transmissive,It=T.transparent;p.setupLightsView(tt),Lt===!0&&it.setGlobalState(_.clippingPlanes,tt),z&&kt.viewport(U.copy(z)),q.length>0&&Pi(q,W,tt),ut.length>0&&Pi(ut,W,tt),It.length>0&&Pi(It,W,tt),kt.buffers.depth.setTest(!0),kt.buffers.depth.setMask(!0),kt.buffers.color.setMask(!0),kt.setPolygonOffset(!1)}function Qi(T,W,tt,z){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Un(1,1,{generateMipmaps:!0,type:Dt.has("EXT_color_buffer_half_float")||Dt.has("EXT_color_buffer_float")?Cr:Kn,minFilter:Zn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));let ut=p.state.transmissionRenderTarget[z.id],It=z.viewport||U;ut.setSize(It.z*_.transmissionResolutionScale,It.w*_.transmissionResolutionScale);let Wt=_.getRenderTarget(),Gt=_.getActiveCubeFace(),te=_.getActiveMipmapLevel();_.setRenderTarget(ut),_.getClearColor(Y),st=_.getClearAlpha(),st<1&&_.setClearColor(16777215,.5),_.clear(),Kt&&ht.render(tt);let jt=_.toneMapping;_.toneMapping=Ai;let qt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),Lt===!0&&it.setGlobalState(_.clippingPlanes,z),Pi(T,tt,z),Xt.updateMultisampleRenderTarget(ut),Xt.updateRenderTargetMipmap(ut),Dt.has("WEBGL_multisampled_render_to_texture")===!1){let ie=!1;for(let xe=0,De=W.length;xe<De;xe++){let Re=W[xe],fe=Re.object,Yt=Re.geometry,Ce=Re.material,ce=Re.group;if(Ce.side===Be&&fe.layers.test(z.layers)){let cn=Ce.side;Ce.side=on,Ce.needsUpdate=!0,Li(fe,tt,z,Yt,Ce,ce),Ce.side=cn,Ce.needsUpdate=!0,ie=!0}}ie===!0&&(Xt.updateMultisampleRenderTarget(ut),Xt.updateRenderTargetMipmap(ut))}_.setRenderTarget(Wt,Gt,te),_.setClearColor(Y,st),qt!==void 0&&(z.viewport=qt),_.toneMapping=jt}function Pi(T,W,tt){let z=W.isScene===!0?W.overrideMaterial:null;for(let q=0,ut=T.length;q<ut;q++){let It=T[q],Wt=It.object,Gt=It.geometry,te=It.group,jt=It.material;jt.allowOverride===!0&&z!==null&&(jt=z),Wt.layers.test(tt.layers)&&Li(Wt,W,tt,Gt,jt,te)}}function Li(T,W,tt,z,q,ut){T.onBeforeRender(_,W,tt,z,q,ut),T.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),q.onBeforeRender(_,W,tt,z,T,ut),q.transparent===!0&&q.side===Be&&q.forceSinglePass===!1?(q.side=on,q.needsUpdate=!0,_.renderBufferDirect(tt,W,z,q,T,ut),q.side=Yn,q.needsUpdate=!0,_.renderBufferDirect(tt,W,z,q,T,ut),q.side=Be):_.renderBufferDirect(tt,W,z,q,T,ut),T.onAfterRender(_,W,tt,z,q,ut)}function ts(T,W,tt){W.isScene!==!0&&(W=vt);let z=Ot.get(T),q=p.state.lights,ut=p.state.shadowsArray,It=q.state.version,Wt=B.getParameters(T,q.state,ut,W,tt),Gt=B.getProgramCacheKey(Wt),te=z.programs;z.environment=T.isMeshStandardMaterial?W.environment:null,z.fog=W.fog,z.envMap=(T.isMeshStandardMaterial?yt:Q).get(T.envMap||z.environment),z.envMapRotation=z.environment!==null&&T.envMap===null?W.environmentRotation:T.envMapRotation,te===void 0&&(T.addEventListener("dispose",ot),te=new Map,z.programs=te);let jt=te.get(Gt);if(jt!==void 0){if(z.currentProgram===jt&&z.lightsStateVersion===It)return le(T,Wt),jt}else Wt.uniforms=B.getUniforms(T),T.onBeforeCompile(Wt,_),jt=B.acquireProgram(Wt,Gt),te.set(Gt,jt),z.uniforms=Wt.uniforms;let qt=z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(qt.clippingPlanes=it.uniform),le(T,Wt),z.needsLights=da(T),z.lightsStateVersion=It,z.needsLights&&(qt.ambientLightColor.value=q.state.ambient,qt.lightProbe.value=q.state.probe,qt.directionalLights.value=q.state.directional,qt.directionalLightShadows.value=q.state.directionalShadow,qt.spotLights.value=q.state.spot,qt.spotLightShadows.value=q.state.spotShadow,qt.rectAreaLights.value=q.state.rectArea,qt.ltc_1.value=q.state.rectAreaLTC1,qt.ltc_2.value=q.state.rectAreaLTC2,qt.pointLights.value=q.state.point,qt.pointLightShadows.value=q.state.pointShadow,qt.hemisphereLights.value=q.state.hemi,qt.directionalShadowMap.value=q.state.directionalShadowMap,qt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,qt.spotShadowMap.value=q.state.spotShadowMap,qt.spotLightMatrix.value=q.state.spotLightMatrix,qt.spotLightMap.value=q.state.spotLightMap,qt.pointShadowMap.value=q.state.pointShadowMap,qt.pointShadowMatrix.value=q.state.pointShadowMatrix),z.currentProgram=jt,z.uniformsList=null,jt}function fa(T){if(T.uniformsList===null){let W=T.currentProgram.getUniforms();T.uniformsList=Ur.seqWithValue(W.seq,T.uniforms)}return T.uniformsList}function le(T,W){let tt=Ot.get(T);tt.outputColorSpace=W.outputColorSpace,tt.batching=W.batching,tt.batchingColor=W.batchingColor,tt.instancing=W.instancing,tt.instancingColor=W.instancingColor,tt.instancingMorph=W.instancingMorph,tt.skinning=W.skinning,tt.morphTargets=W.morphTargets,tt.morphNormals=W.morphNormals,tt.morphColors=W.morphColors,tt.morphTargetsCount=W.morphTargetsCount,tt.numClippingPlanes=W.numClippingPlanes,tt.numIntersection=W.numClipIntersection,tt.vertexAlphas=W.vertexAlphas,tt.vertexTangents=W.vertexTangents,tt.toneMapping=W.toneMapping}function Bl(T,W,tt,z,q){W.isScene!==!0&&(W=vt),Xt.resetTextureUnits();let ut=W.fog,It=z.isMeshStandardMaterial?W.environment:null,Wt=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:rn,Gt=(z.isMeshStandardMaterial?yt:Q).get(z.envMap||It),te=z.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,jt=!!tt.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),qt=!!tt.morphAttributes.position,ie=!!tt.morphAttributes.normal,xe=!!tt.morphAttributes.color,De=Ai;z.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(De=_.toneMapping);let Re=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,fe=Re!==void 0?Re.length:0,Yt=Ot.get(z),Ce=p.state.lights;if(Lt===!0&&(K===!0||T!==S)){let at=T===S&&z.id===M;it.setState(z,T,at)}let ce=!1;z.version===Yt.__version?(Yt.needsLights&&Yt.lightsStateVersion!==Ce.state.version||Yt.outputColorSpace!==Wt||q.isBatchedMesh&&Yt.batching===!1||!q.isBatchedMesh&&Yt.batching===!0||q.isBatchedMesh&&Yt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Yt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Yt.instancing===!1||!q.isInstancedMesh&&Yt.instancing===!0||q.isSkinnedMesh&&Yt.skinning===!1||!q.isSkinnedMesh&&Yt.skinning===!0||q.isInstancedMesh&&Yt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Yt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Yt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Yt.instancingMorph===!1&&q.morphTexture!==null||Yt.envMap!==Gt||z.fog===!0&&Yt.fog!==ut||Yt.numClippingPlanes!==void 0&&(Yt.numClippingPlanes!==it.numPlanes||Yt.numIntersection!==it.numIntersection)||Yt.vertexAlphas!==te||Yt.vertexTangents!==jt||Yt.morphTargets!==qt||Yt.morphNormals!==ie||Yt.morphColors!==xe||Yt.toneMapping!==De||Yt.morphTargetsCount!==fe)&&(ce=!0):(ce=!0,Yt.__version=z.version);let cn=Yt.currentProgram;ce===!0&&(cn=ts(z,W,q));let H=!1,Z=!1,dt=!1,lt=cn.getUniforms(),bt=Yt.uniforms;if(kt.useProgram(cn.program)&&(H=!0,Z=!0,dt=!0),z.id!==M&&(M=z.id,Z=!0),H||S!==T){kt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),lt.setValue(N,"projectionMatrix",T.projectionMatrix),lt.setValue(N,"viewMatrix",T.matrixWorldInverse);let mt=lt.map.cameraPosition;mt!==void 0&&mt.setValue(N,nt.setFromMatrixPosition(T.matrixWorld)),Vt.logarithmicDepthBuffer&&lt.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&lt.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,Z=!0,dt=!0)}if(q.isSkinnedMesh){lt.setOptional(N,q,"bindMatrix"),lt.setOptional(N,q,"bindMatrixInverse");let at=q.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),lt.setValue(N,"boneTexture",at.boneTexture,Xt))}q.isBatchedMesh&&(lt.setOptional(N,q,"batchingTexture"),lt.setValue(N,"batchingTexture",q._matricesTexture,Xt),lt.setOptional(N,q,"batchingIdTexture"),lt.setValue(N,"batchingIdTexture",q._indirectTexture,Xt),lt.setOptional(N,q,"batchingColorTexture"),q._colorsTexture!==null&&lt.setValue(N,"batchingColorTexture",q._colorsTexture,Xt));let Tt=tt.morphAttributes;if((Tt.position!==void 0||Tt.normal!==void 0||Tt.color!==void 0)&&ct.update(q,tt,cn),(Z||Yt.receiveShadow!==q.receiveShadow)&&(Yt.receiveShadow=q.receiveShadow,lt.setValue(N,"receiveShadow",q.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(bt.envMap.value=Gt,bt.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&W.environment!==null&&(bt.envMapIntensity.value=W.environmentIntensity),Z&&(lt.setValue(N,"toneMappingExposure",_.toneMappingExposure),Yt.needsLights&&Di(bt,dt),ut&&z.fog===!0&&k.refreshFogUniforms(bt,ut),k.refreshMaterialUniforms(bt,z,I,F,p.state.transmissionRenderTarget[T.id]),Ur.upload(N,fa(Yt),bt,Xt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ur.upload(N,fa(Yt),bt,Xt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&lt.setValue(N,"center",q.center),lt.setValue(N,"modelViewMatrix",q.modelViewMatrix),lt.setValue(N,"normalMatrix",q.normalMatrix),lt.setValue(N,"modelMatrix",q.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let at=z.uniformsGroups;for(let mt=0,Rt=at.length;mt<Rt;mt++){let Jt=at[mt];$t.update(Jt,cn),$t.bind(Jt,cn)}}return cn}function Di(T,W){T.ambientLightColor.needsUpdate=W,T.lightProbe.needsUpdate=W,T.directionalLights.needsUpdate=W,T.directionalLightShadows.needsUpdate=W,T.pointLights.needsUpdate=W,T.pointLightShadows.needsUpdate=W,T.spotLights.needsUpdate=W,T.spotLightShadows.needsUpdate=W,T.rectAreaLights.needsUpdate=W,T.hemisphereLights.needsUpdate=W}function da(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,W,tt){let z=Ot.get(T);z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Ot.get(T.texture).__webglTexture=W,Ot.get(T.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:tt,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,W){let tt=Ot.get(T);tt.__webglFramebuffer=W,tt.__useDefaultFramebuffer=W===void 0};let Ni=N.createFramebuffer();this.setRenderTarget=function(T,W=0,tt=0){L=T,R=W,C=tt;let z=!0,q=null,ut=!1,It=!1;if(T){let Gt=Ot.get(T);if(Gt.__useDefaultFramebuffer!==void 0)kt.bindFramebuffer(N.FRAMEBUFFER,null),z=!1;else if(Gt.__webglFramebuffer===void 0)Xt.setupRenderTarget(T);else if(Gt.__hasExternalTextures)Xt.rebindTextures(T,Ot.get(T.texture).__webglTexture,Ot.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let qt=T.depthTexture;if(Gt.__boundDepthTexture!==qt){if(qt!==null&&Ot.has(qt)&&(T.width!==qt.image.width||T.height!==qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xt.setupDepthRenderbuffer(T)}}let te=T.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(It=!0);let jt=Ot.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(jt[W])?q=jt[W][tt]:q=jt[W],ut=!0):T.samples>0&&Xt.useMultisampledRTT(T)===!1?q=Ot.get(T).__webglMultisampledFramebuffer:Array.isArray(jt)?q=jt[tt]:q=jt,U.copy(T.viewport),V.copy(T.scissor),J=T.scissorTest}else U.copy(et).multiplyScalar(I).floor(),V.copy(Mt).multiplyScalar(I).floor(),J=ft;if(tt!==0&&(q=Ni),kt.bindFramebuffer(N.FRAMEBUFFER,q)&&z&&kt.drawBuffers(T,q),kt.viewport(U),kt.scissor(V),kt.setScissorTest(J),ut){let Gt=Ot.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+W,Gt.__webglTexture,tt)}else if(It){let Gt=W;for(let te=0;te<T.textures.length;te++){let jt=Ot.get(T.textures[te]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+te,jt.__webglTexture,tt,Gt)}}else if(T!==null&&tt!==0){let Gt=Ot.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Gt.__webglTexture,tt)}M=-1},this.readRenderTargetPixels=function(T,W,tt,z,q,ut,It,Wt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=Ot.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&It!==void 0&&(Gt=Gt[It]),Gt){kt.bindFramebuffer(N.FRAMEBUFFER,Gt);try{let te=T.textures[Wt],jt=te.format,qt=te.type;if(!Vt.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=T.width-z&&tt>=0&&tt<=T.height-q&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Wt),N.readPixels(W,tt,z,q,wt.convert(jt),wt.convert(qt),ut))}finally{let te=L!==null?Ot.get(L).__webglFramebuffer:null;kt.bindFramebuffer(N.FRAMEBUFFER,te)}}},this.readRenderTargetPixelsAsync=async function(T,W,tt,z,q,ut,It,Wt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=Ot.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&It!==void 0&&(Gt=Gt[It]),Gt)if(W>=0&&W<=T.width-z&&tt>=0&&tt<=T.height-q){kt.bindFramebuffer(N.FRAMEBUFFER,Gt);let te=T.textures[Wt],jt=te.format,qt=te.type;if(!Vt.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ie=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ie),N.bufferData(N.PIXEL_PACK_BUFFER,ut.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Wt),N.readPixels(W,tt,z,q,wt.convert(jt),wt.convert(qt),0);let xe=L!==null?Ot.get(L).__webglFramebuffer:null;kt.bindFramebuffer(N.FRAMEBUFFER,xe);let De=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await op(N,De,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ie),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ut),N.deleteBuffer(ie),N.deleteSync(De),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,W=null,tt=0){let z=Math.pow(2,-tt),q=Math.floor(T.image.width*z),ut=Math.floor(T.image.height*z),It=W!==null?W.x:0,Wt=W!==null?W.y:0;Xt.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,tt,0,0,It,Wt,q,ut),kt.unbindTexture()};let jr=N.createFramebuffer(),ks=N.createFramebuffer();this.copyTextureToTexture=function(T,W,tt=null,z=null,q=0,ut=null){ut===null&&(q!==0?(pr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ut=q,q=0):ut=0);let It,Wt,Gt,te,jt,qt,ie,xe,De,Re=T.isCompressedTexture?T.mipmaps[ut]:T.image;if(tt!==null)It=tt.max.x-tt.min.x,Wt=tt.max.y-tt.min.y,Gt=tt.isBox3?tt.max.z-tt.min.z:1,te=tt.min.x,jt=tt.min.y,qt=tt.isBox3?tt.min.z:0;else{let Tt=Math.pow(2,-q);It=Math.floor(Re.width*Tt),Wt=Math.floor(Re.height*Tt),T.isDataArrayTexture?Gt=Re.depth:T.isData3DTexture?Gt=Math.floor(Re.depth*Tt):Gt=1,te=0,jt=0,qt=0}z!==null?(ie=z.x,xe=z.y,De=z.z):(ie=0,xe=0,De=0);let fe=wt.convert(W.format),Yt=wt.convert(W.type),Ce;W.isData3DTexture?(Xt.setTexture3D(W,0),Ce=N.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(Xt.setTexture2DArray(W,0),Ce=N.TEXTURE_2D_ARRAY):(Xt.setTexture2D(W,0),Ce=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,W.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,W.unpackAlignment);let ce=N.getParameter(N.UNPACK_ROW_LENGTH),cn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),H=N.getParameter(N.UNPACK_SKIP_PIXELS),Z=N.getParameter(N.UNPACK_SKIP_ROWS),dt=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Re.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Re.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,te),N.pixelStorei(N.UNPACK_SKIP_ROWS,jt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,qt);let lt=T.isDataArrayTexture||T.isData3DTexture,bt=W.isDataArrayTexture||W.isData3DTexture;if(T.isDepthTexture){let Tt=Ot.get(T),at=Ot.get(W),mt=Ot.get(Tt.__renderTarget),Rt=Ot.get(at.__renderTarget);kt.bindFramebuffer(N.READ_FRAMEBUFFER,mt.__webglFramebuffer),kt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let Jt=0;Jt<Gt;Jt++)lt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ot.get(T).__webglTexture,q,qt+Jt),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ot.get(W).__webglTexture,ut,De+Jt)),N.blitFramebuffer(te,jt,It,Wt,ie,xe,It,Wt,N.DEPTH_BUFFER_BIT,N.NEAREST);kt.bindFramebuffer(N.READ_FRAMEBUFFER,null),kt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(q!==0||T.isRenderTargetTexture||Ot.has(T)){let Tt=Ot.get(T),at=Ot.get(W);kt.bindFramebuffer(N.READ_FRAMEBUFFER,jr),kt.bindFramebuffer(N.DRAW_FRAMEBUFFER,ks);for(let mt=0;mt<Gt;mt++)lt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tt.__webglTexture,q,qt+mt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Tt.__webglTexture,q),bt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,at.__webglTexture,ut,De+mt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,at.__webglTexture,ut),q!==0?N.blitFramebuffer(te,jt,It,Wt,ie,xe,It,Wt,N.COLOR_BUFFER_BIT,N.NEAREST):bt?N.copyTexSubImage3D(Ce,ut,ie,xe,De+mt,te,jt,It,Wt):N.copyTexSubImage2D(Ce,ut,ie,xe,te,jt,It,Wt);kt.bindFramebuffer(N.READ_FRAMEBUFFER,null),kt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else bt?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(Ce,ut,ie,xe,De,It,Wt,Gt,fe,Yt,Re.data):W.isCompressedArrayTexture?N.compressedTexSubImage3D(Ce,ut,ie,xe,De,It,Wt,Gt,fe,Re.data):N.texSubImage3D(Ce,ut,ie,xe,De,It,Wt,Gt,fe,Yt,Re):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ut,ie,xe,It,Wt,fe,Yt,Re.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ut,ie,xe,Re.width,Re.height,fe,Re.data):N.texSubImage2D(N.TEXTURE_2D,ut,ie,xe,It,Wt,fe,Yt,Re);N.pixelStorei(N.UNPACK_ROW_LENGTH,ce),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,cn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,H),N.pixelStorei(N.UNPACK_SKIP_ROWS,Z),N.pixelStorei(N.UNPACK_SKIP_IMAGES,dt),ut===0&&W.generateMipmaps&&N.generateMipmap(Ce),kt.unbindTexture()},this.initRenderTarget=function(T){Ot.get(T).__webglFramebuffer===void 0&&Xt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Xt.setTextureCube(T,0):T.isData3DTexture?Xt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Xt.setTexture2DArray(T,0):Xt.setTexture2D(T,0),kt.unbindTexture()},this.resetState=function(){R=0,C=0,L=null,kt.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}});var sm={};Fm(sm,{RoomEnvironment:()=>tf});function Vr(i){return new vi({color:0,emissive:16777215,emissiveIntensity:i})}var tf,rm=kl(()=>{jn();tf=class extends $n{constructor(){super();let t=new Gi;t.deleteAttribute("uv");let e=new fn({side:on}),n=new fn,s=new bs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new se(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new ms(t,n,6),a=new we;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new se(t,Vr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new se(t,Vr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new se(t,Vr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new se(t,Vr(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new se(t,Vr(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let d=new se(t,Vr(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}}});var Om=/^(\dC|\dS|\dW|\dE|\dK)-/,Bm={toilet:["\uD654\uC7A5\uC2E4","toilet","wc"],elev:["\uC5D8\uB9AC\uBCA0\uC774\uD130","\uC2B9\uAC15\uAE30","elevator","ev"],prof:["\uAD50\uC218","\uAD50\uC218\uC2E4","\uAD50\uC218\uC5F0\uAD6C\uC2E4","\uC5F0\uAD6C\uC2E4"],lab:["\uC2E4\uC2B5\uC2E4","lab"],office:["\uC0AC\uBB34\uC2E4","\uD559\uACFC","\uACFC\uC0AC"],studio:["\uC2A4\uD29C\uB514\uC624"],server:["\uC11C\uBC84"],prep:["\uC900\uBE44\uC2E4"],store:["\uCC3D\uACE0"],room:["\uAC15\uC758\uC2E4","\uAD50\uC2E4"]},km={toilet:"\uD654\uC7A5\uC2E4",elev:"\uC5D8\uB9AC\uBCA0\uC774\uD130",prof:"\uAD50\uC218\uC5F0\uAD6C\uC2E4",lab:"\uC2E4\uC2B5\uC2E4",office:"\uC0AC\uBB34\uC2E4",studio:"\uC2A4\uD29C\uB514\uC624",server:"\uC11C\uBC84\uC2E4",prep:"\uC900\uBE44\uC2E4",store:"\uCC3D\uACE0",room:"\uAC15\uC758\uC2E4"};function qe(i){return i===0?"B1":`${i}F`}function Ye(i){return i===0?"\uC9C0\uD558 1\uCE35":`${i}\uCE35`}function zm(i){return typeof atob=="function"?Uint8Array.from(atob(i),t=>t.charCodeAt(0)):new Uint8Array(Buffer.from(i,"base64"))}function Hm(i){let t={};for(let e of i.floors)t[e.n]=zm(e.grid);return(e,n,s)=>{let r=Math.floor((n-i.gx0)/i.cell),o=Math.floor((i.gy1-s)/i.cell);if(!t[e]||r<0||o<0||r>=i.gw||o>=i.gh)return!1;let a=o*i.gw+r;return(t[e][a>>3]>>7-(a&7)&1)===1}}function zl(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++)i[s][1]>e!=i[r][1]>e&&t<(i[r][0]-i[s][0])*(e-i[s][1])/(i[r][1]-i[s][1])+i[s][0]&&(n=!n);return n}var ns=i=>String(i||"").toLowerCase().replace(/\s+/g,"").replace(/호$/,"");function wf(i){let t=i.floors.map(F=>F.n),e=F=>i.floors.find(I=>I.n===F),n=Hm(i);function s(F,I,X,j=18){if(n(F,I,X))return[I,X];for(let et=i.cell;et<j;et+=i.cell)for(let Mt=0;Mt<Math.PI*2;Mt+=Math.max(.05,i.cell/et)){let ft=I+et*Math.cos(Mt),Ut=X+et*Math.sin(Mt);if(n(F,ft,Ut))return[ft,Ut]}return null}function r(F,I,X){let j=e(F);return j&&j.rooms.find(et=>zl(et.poly,I,X))||null}let o=i.ramps.map(F=>{let I=0,X=[0];for(let j=1;j<F.pts.length;j++)I+=Math.hypot(F.pts[j][0]-F.pts[j-1][0],F.pts[j][1]-F.pts[j-1][1]),X.push(I);return{...F,cum:X,T:I}}),a=Math.floor(i.gw/3),c=Math.floor(i.gh/3),l=a*c,h=F=>[i.gx0+(F%a*3+3/2)*i.cell,i.gy1-(Math.floor(F/a)*3+3/2)*i.cell],u={},f={},d={},g=[1,1.7,1.2,1];for(let F of t){let I=new Uint8Array(l),X=new Int16Array(l).fill(-1),j=e(F).rooms;for(let ft=0;ft<l;ft++){let[Ut,Lt]=h(ft);if(I[ft]=n(F,Ut,Lt)?1:0,I[ft]){for(let K=0;K<j.length;K++)if(!["stair","ostair","elev"].includes(j[K].cat)&&zl(j[K].poly,Ut,Lt)){X[ft]=K;break}}}u[F]=I,f[F]=X;let et=new Uint8Array(l).fill(255),Mt=[];for(let ft=0;ft<l;ft++)I[ft]||(et[ft]=0,Mt.push(ft));for(let ft=0;ft<Mt.length;ft++){let Ut=Mt[ft],Lt=Ut%a,K=Ut/a|0;if(!(et[Ut]>=3))for(let D=-1;D<=1;D++)for(let nt=-1;nt<=1;nt++){let Ht=Lt+nt,vt=K+D;if(Ht<0||vt<0||Ht>=a||vt>=c)continue;let Kt=vt*a+Ht;et[Kt]>et[Ut]+1&&(et[Kt]=et[Ut]+1,Mt.push(Kt))}}d[F]=et}function x(F,I,X){let j=Math.floor((I-i.gx0)/i.cell/3),et=Math.floor((i.gy1-X)/i.cell/3),Mt=u[F];if(!Mt)return-1;let ft=-1,Ut=1e9;for(let Lt=0;Lt<40&&ft<0;Lt++)for(let K=et-Lt;K<=et+Lt;K++)for(let D=j-Lt;D<=j+Lt;D++){if(D<0||K<0||D>=a||K>=c||!Mt[K*a+D])continue;let nt=(D-j)**2+(K-et)**2;nt<Ut&&(Ut=nt,ft=K*a+D)}return ft}let m=[];for(let F of o){let I=F.pts[0],X=F.pts[F.pts.length-1],j=x(F.lo,I[0],I[1]),et=x(F.lo+1,X[0],X[1]);j>=0&&et>=0&&e(F.lo+1)&&m.push({kind:"stair",id:F.id,fa:F.lo,fb:F.lo+1,ca:j,cb:et,cost:F.T+4,ramp:F})}function p(F,I){let X=null;for(let j of e(F).rooms)if(j.cat==="elev"){let et=Math.hypot(j.c[0]-I[0],j.c[1]-I[1]);(!X||et<X[0])&&(X=[et,j.c])}return X&&X[0]<5?X[1]:I}let b=[];for(let F of i.floors)for(let I of F.doors)I.cat==="elev"&&b.push({f:F.n,p:I.p,id:I.id});let y=[];for(let F of b){let I=y.find(X=>Math.hypot(X.p[0]-F.p[0],X.p[1]-F.p[1])<3&&!X.doors.some(j=>j.f===F.f));I||y.push(I={p:F.p,doors:[]}),I.doors.push(F)}y.forEach((F,I)=>{F.id=`EV${I+1}`,F.doors.sort((X,j)=>X.f-j.f);for(let X=0;X<F.doors.length;X++)for(let j=X+1;j<F.doors.length;j++){let et=F.doors[X],Mt=F.doors[j],ft=x(et.f,et.p[0],et.p[1]),Ut=x(Mt.f,Mt.p[0],Mt.p[1]);ft>=0&&Ut>=0&&m.push({kind:"elev",id:F.id,fa:et.f,fb:Mt.f,ca:ft,cb:Ut,cost:40+3*(Mt.f-et.f),pa:et.p,pb:Mt.p,qa:p(et.f,et.p),qb:p(Mt.f,Mt.p)})}});let _=F=>t.indexOf(F);function A(F,I,X={}){let j=X.mode||"stairs",et=new Set(X.allowRooms||[]),Mt=l*t.length,ft=x(F.f,F.x,F.y);if(ft<0)return null;let Ut=_(F.f)*l+ft,Lt=new Map;for(let w of I){let B=x(w.f,w.x,w.y);B>=0&&Lt.set(_(w.f)*l+B,w)}if(!Lt.size)return null;let K=new Float64Array(Mt).fill(1/0),D=new Int32Array(Mt).fill(-1),nt=new Int32Array(Mt).fill(-1);K[Ut]=0;let Ht=new Map;m.forEach((w,B)=>{let k=_(w.fa)*l+w.ca,G=_(w.fb)*l+w.cb;(Ht.get(k)||Ht.set(k,[]).get(k)).push([G,B]),(Ht.get(G)||Ht.set(G,[]).get(G)).push([k,B])});let vt=[],Kt=(w,B)=>{vt.push([w,B]);let k=vt.length-1;for(;k>0;){let G=k-1>>1;if(vt[G][0]<=vt[k][0])break;[vt[G],vt[k]]=[vt[k],vt[G]],k=G}},Se=()=>{let w=vt[0],B=vt.pop();if(vt.length){vt[0]=B;let k=0;for(;;){let G=2*k+1,gt=G+1,it=k;if(G<vt.length&&vt[G][0]<vt[it][0]&&(it=G),gt<vt.length&&vt[gt][0]<vt[it][0]&&(it=gt),it===k)break;[vt[it],vt[k]]=[vt[k],vt[it]],k=it}}return w};Kt(0,Ut);let N=3*i.cell,Zt=-1;for(;vt.length;){let[w,B]=Se();if(w>K[B])continue;if(Lt.has(B)){Zt=B;break}let k=Math.floor(B/l),G=B-k*l,gt=t[k],it=u[gt],rt=f[gt],ht=G%a,ct=Math.floor(G/a);for(let Nt=-1;Nt<=1;Nt++)for(let wt=-1;wt<=1;wt++){if(!wt&&!Nt)continue;let Et=ht+wt,$t=ct+Nt;if(Et<0||$t<0||Et>=a||$t>=c)continue;let O=$t*a+Et;if(!it[O]||wt&&Nt&&!(it[ct*a+Et]&&it[$t*a+ht]))continue;let _t=rt[O],xt=(_t>=0&&!et.has(e(gt).rooms[_t].id)?4:1)*g[Math.min(3,d[gt][O])],Ct=k*l+O,pt=w+Math.hypot(wt,Nt)*N*xt;pt<K[Ct]&&(K[Ct]=pt,D[Ct]=B,nt[Ct]=-1,Kt(pt,Ct))}let St=Ht.get(B);if(St)for(let[Nt,wt]of St){let Et=w+m[wt].cost+(j==="elevator"&&m[wt].kind==="stair"?2e3:0);Et<K[Nt]&&(K[Nt]=Et,D[Nt]=B,nt[Nt]=wt,Kt(Et,Nt))}}if(Zt<0)return null;let Dt=[];for(let w=Zt;w>=0;w=D[w])Dt.push(w);Dt.reverse();let Vt=[],kt=null;for(let w=0;w<Dt.length;w++){let B=Dt[w],k=t[Math.floor(B/l)],[G,gt]=h(B%l);if(nt[B]>=0){let it=m[nt[B]],rt=k>t[Math.floor(Dt[w-1]/l)];Vt.push({kind:it.kind,id:it.id,from:rt?it.fa:it.fb,to:k,link:it,up:rt}),kt=null}kt||(kt={kind:"walk",f:k,pts:[]},Vt.push(kt)),kt.pts.push([G,gt])}let pe=Lt.get(Zt),Ot=Vt.filter(w=>w.kind==="walk");Ot[0].pts[0]=[F.x,F.y],Ot[Ot.length-1].pts.push([pe.x,pe.y]);for(let w of Ot)w.pts=C(w.f,w.pts);let Q=[];for(let w of Vt){if(w.i0=Q.length,w.kind==="walk"){let B=e(w.f).z;for(let[k,G]of w.pts)Q.push({x:k,y:G,z:B,f:w.f,kind:"walk"})}else if(w.kind==="stair"){let B=w.link.ramp,k=e(B.lo).z,G=w.up?B.pts:[...B.pts].reverse();for(let gt of G)Q.push({x:gt[0],y:gt[1],z:k+gt[2]*i.FH,f:B.lo+(gt[2]>.5?1:0),kind:"stair"})}else{let B=w.link,k=w.up?B.pa:B.pb,G=w.up?B.pb:B.pa;Q.push({x:k[0],y:k[1],z:e(w.from).z,f:w.from,kind:"elev"}),Q.push({x:G[0],y:G[1],z:e(w.to).z,f:w.to,kind:"elev"})}w.i1=Q.length-1}let yt=0;for(let w=1;w<Q.length;w++)Q[w].kind==="elev"&&Q[w-1].kind==="elev"||(yt+=Math.hypot(Q[w].x-Q[w-1].x,Q[w].y-Q[w-1].y));let E=Vt.filter(w=>w.kind!=="walk"),v=E.filter(w=>w.kind==="stair").reduce((w,B)=>w+Math.abs(B.to-B.from),0);return{pts:Q,legs:Vt,len:yt,cost:K[Zt],target:pe,vertical:E,mode:j,stairFloors:v}}function R(F,I,X){let j=Math.hypot(X[0]-I[0],X[1]-I[1]);if(j<1e-6)return!0;let et=Math.ceil(j/.1),Mt=-(X[1]-I[1])/j*.25,ft=(X[0]-I[0])/j*.25;for(let Ut=1;Ut<et;Ut++){let Lt=Ut/et,K=I[0]+(X[0]-I[0])*Lt,D=I[1]+(X[1]-I[1])*Lt;if(!n(F,K,D)||!n(F,K+Mt,D+ft)||!n(F,K-Mt,D-ft))return!1}return!0}function C(F,I){if(I.length<3)return I;let X=[I[0]],j=0;for(;j<I.length-1;){let et=I.length-1;for(;et>j+1&&!R(F,I[j],I[et]);)et--;X.push(I[et]),j=et}return L(F,X,.35)}function L(F,I,X){if(I.length<3)return I;let j=I[0],et=I[I.length-1],Mt=-1,ft=0,Ut=Math.hypot(et[0]-j[0],et[1]-j[1])||1e-9;for(let D=1;D<I.length-1;D++){let nt=Math.abs((et[0]-j[0])*(j[1]-I[D][1])-(j[0]-I[D][0])*(et[1]-j[1]))/Ut;nt>ft&&(ft=nt,Mt=D)}if(ft<=X&&R(F,j,et))return[j,et];if(Mt<0)return I;let Lt=L(F,I.slice(0,Mt+1),X),K=L(F,I.slice(Mt),X);return[...Lt.slice(0,-1),...K]}let M=i.names||{},S=new Map;for(let F of i.floors){let I=(X,j,et,Mt,ft)=>{if(et==="stair"||et==="ostair"||Om.test(X))return;let Ut=`${F.n}:${X}`,Lt=S.get(Ut);if(!Lt){let K=/^[0-9B]/.test(X),nt=(M[X]&&F.n===+X[0]?M[X]:"")||(j!==X&&j!=="\uC2E4"?j:"");Lt={key:Ut,id:X,f:F.n,cat:et,numbered:K,title:K?`${X}\uD638`:j,name:K?nt:"",catLabel:km[et]||"",doors:[],center:null},Lt.search=[X,Lt.title,nt,...Bm[et]||[]].map(ns).join("|"),S.set(Ut,Lt)}ft?Lt.doors.push(Mt):Lt.center=Mt};for(let X of F.doors)I(X.id,X.name,X.cat,X.p,!0);for(let X of F.rooms)I(X.id,X.name,X.cat,X.c,!1)}let U=[...S.values()].map(F=>({...F,doors:F.doors.length?F.doors:[F.center]}));for(let F of U){if(F.numbered)continue;if(U.filter(X=>X.f===F.f&&X.title===F.title).length>1){let X=F.doors[0];F.name=X[0]<0?"\uC11C\uCABD":"\uB3D9\uCABD"}}U.sort((F,I)=>F.f-I.f||Number(I.numbered)-Number(F.numbered)||F.id.localeCompare(I.id,"ko",{numeric:!0}));function V(F,I=30){let X=ns(F);if(!X)return[];let j=[];for(let et of U){let Mt=ns(et.id),ft=0;Mt===X?ft=100:Mt.startsWith(X)?ft=80-(Mt.length-X.length):ns(et.title)===X?ft=70:ns(et.name).includes(X)?ft=60:et.search.includes(X)&&(ft=40),ft&&j.push([ft,et])}return j.sort((et,Mt)=>Mt[0]-et[0]||et[1].f-Mt[1].f),j.slice(0,I).map(et=>et[1])}let J=F=>U.find(I=>I.key===F)||U.find(I=>ns(I.id)===ns(F))||null,Y=.7;function st(F,I,X){let j=e(F).rooms.filter(ft=>ft.id===X).map(ft=>ft.poly);if(!j.length)return null;let et=null;for(let ft of j)for(let Ut=1;Ut<ft.length;Ut++){let Lt=ft[Ut-1],K=ft[Ut],D=K[0]-Lt[0],nt=K[1]-Lt[1],Ht=D*D+nt*nt;if(Ht<1e-6)continue;let vt=Math.max(0,Math.min(1,((I[0]-Lt[0])*D+(I[1]-Lt[1])*nt)/Ht)),Kt=Math.hypot(Lt[0]+vt*D-I[0],Lt[1]+vt*nt-I[1]);if(!et||Kt<et[0]){let Se=Math.sqrt(Ht);et=[Kt,-nt/Se,D/Se]}}if(!et||et[0]>1)return null;let Mt=(ft,Ut)=>j.some(Lt=>zl(Lt,ft,Ut));for(let ft of[1,-1]){let Ut=et[1]*ft,Lt=et[2]*ft;if(!Mt(I[0]+Ut*.3,I[1]+Lt*.3))for(let K of[Y,.55,.9,1.1,.4]){let D=I[0]+Ut*K,nt=I[1]+Lt*K;if(n(F,D,nt)&&!Mt(D,nt))return[D,nt]}}return null}function $(F,I,X={}){let j=I.doors.map(ft=>{let Ut=st(I.f,ft,I.id)||s(I.f,ft[0],ft[1],6)||ft;return{f:I.f,x:Ut[0],y:Ut[1],door:ft}}).filter(Boolean),et={...X,allowRooms:[I.id]},Mt=A(F,j,et);if(Mt&&(X.mode||"stairs")==="stairs"&&Mt.stairFloors>=3){let ft=A(F,j,{...et,mode:"elevator"});if(ft&&ft.stairFloors<Mt.stairFloors)return{...ft,mode:"stairs",preferElev:!0}}return Mt}return{M:i,floors:t,FL:e,walk:n,nearest:s,roomAt:r,ramps:o,shafts:y,links:m,route:A,routeTo:$,destinations:U,search:V,findDest:J}}var Vm=35,Hl=3,Gm=3,Wm=180/Math.PI,is=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*Wm;function Vs(i,t){let e=t-i;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e}function pa(i){let t=Math.abs(i),e=i>0?"left":"right",n=i>0?"\uC67C\uCABD":"\uC624\uB978\uCABD";return t<Vm?{dir:"straight",word:"\uC9C1\uC9C4",side:""}:t>145?{dir:`u-${e}`,word:"\uB4A4\uB85C \uB3CC\uC544",side:"\uB4A4"}:t<60?{dir:`slight-${e}`,word:`${n} \uBC29\uD5A5\uC73C\uB85C`,side:n}:{dir:e,word:`${n}\uC73C\uB85C`,side:n}}var Vl=i=>`${Math.max(1,Math.round(i))}m`;function Gs(i,t,e={}){let n=Ui(i),s=i.pts,r=n[n.length-1],o=y=>{let _=We(i,n,Math.max(0,Math.min(r,y)));return[_.x,_.y]},a=(e.landmarks||[]).filter(y=>!t||y.key!==t.key);function c(y,_,A=3.5){let R=null;for(let C of a)if(!(C.f!==y||C.cat==="store"))for(let L of C.doors){let M=Math.hypot(L[0]-_[0],L[1]-_[1]),S=M-(C.numbered?.5:0);M<A&&(!R||S<R[0])&&(R=[S,C])}return R&&R[1]}let l=y=>[n[y.i0],n[y.i1]];function h(y,_){let A=o(Math.max(_,y-Hl)),R=o(y);return Math.hypot(R[0]-A[0],R[1]-A[1])>.2?is(A,R):null}function u(y,_){let A=o(y),R=o(Math.min(_,y+Hl));return Math.hypot(R[0]-A[0],R[1]-A[1])>.2?is(A,R):null}function f(y){if(y.kind==="stair"){let M=y.link.ramp.pts,S=y.up?M:[...M].reverse();return{inH:is(S[0],S[1]),outH:is(S[S.length-2],S[S.length-1]),p0:S[0]}}let _=y.link,A=y.up?_.pa:_.pb,R=y.up?_.qa:_.qb,C=y.up?_.pb:_.pa,L=y.up?_.qb:_.qa;return{inH:is(A,R),outH:is(L,C),p0:A}}let d=[],g=i.legs,x=null,m=null;g.forEach((y,_)=>{if(y.kind!=="walk"){let M=f(y),S=g[_-1],U="";if(S&&S.kind==="walk"){let[J,Y]=l(S),st=h(Y,J);st!=null&&(U=pa(Vs(st,M.inH)).side)}let V=y.to>y.from;d.push({kind:y.kind,dir:y.kind==="elev"?"elev":V?"stair-up":"stair-down",f:y.from,to:y.to,at:M.p0,s:n[y.i0],side:U,id:y.id}),x=M.outH,m=y.kind;return}let[A,R]=l(y),C=[];for(let M=y.i0+1;M<y.i1;M++){let S=n[M],U=h(S,A),V=u(S,R);U==null||V==null||C.push({s:S,d:Vs(U,V)})}let L=[];for(let M of C){let S=L[L.length-1];S&&M.s-S.s1<Gm?(S.s1=M.s,S.d=Vs(h(S.s0,A)??0,u(M.s,R)??0)):L.push({s0:M.s,s1:M.s,d:M.d})}if(_===0)d.push({kind:"start",dir:"start",f:y.f,at:o(A),s:A});else if(x!=null){let M=u(A,R),S=pa(M==null?0:Vs(x,M));d.push({kind:"walk",dir:S.dir,exit:m,word:S.word,f:y.f,at:o(A),s:A,h0:x,hOut:M})}for(let M of L){let S=pa(M.d);if(S.dir==="straight")continue;let U=(M.s0+M.s1)/2;d.push({kind:"walk",dir:S.dir,word:S.word,f:y.f,at:o(U),s:U,hOut:u(M.s1,R)})}});for(let y=d.length-1;y>=2;y--){let _=d[y-2],A=d[y-1],R=d[y];_.kind==="stair"&&R.kind==="stair"&&_.dir===R.dir&&_.id===R.id&&A.kind==="walk"&&R.s-A.s<5&&(_.to=R.to,d.splice(y-1,2),y--)}let p=s[s.length-1],b="";if(t){let y=h(r,Math.max(0,r-Hl)),_=i.target?.door||t.center;if(y!=null&&_&&Math.hypot(_[0]-p.x,_[1]-p.y)>.2){let A=Vs(y,is([p.x,p.y],_));b=Math.abs(A)<35?"\uC815\uBA74":Math.abs(A)>145?"\uB4A4\uCABD":A>0?"\uC67C\uCABD":"\uC624\uB978\uCABD"}}d.push({kind:"arrive",dir:"arrive",f:p.f,at:[p.x,p.y],s:r,side:b});for(let y=d.length-2;y>=1;y--){let _=d[y],A=d[y+1],R=d[y-1],C=A.s-_.s;if(_.kind==="walk"&&!_.exit&&C<2.5&&A.kind!=="walk"&&A.kind!=="start")d.splice(y,1);else if(R.kind==="walk"&&R.exit&&_.kind==="walk"&&!_.exit&&_.s-R.s<4.5){let L=pa(_.hOut==null||R.h0==null?0:Vs(R.h0,_.hOut));Object.assign(_,{exit:R.exit,dir:L.dir,word:L.word,s:R.s,at:R.at}),d.splice(y-1,1)}}for(let y=0;y<d.length;y++){let _=d[y],A=d[y+1];_.dist=A?Math.max(0,A.s-_.s):0;let R=_.kind==="walk"&&!_.exit?c(_.f,_.at):null,C=A&&_.kind==="start"&&A.kind!=="arrive"?c(A.f,A.at,4):null;if(_.kind==="start")_.action="\uC9C1\uC9C4",_.text=`${C?`${C.title} \uCABD\uC73C\uB85C `:""}${Vl(_.dist)} \uC9C1\uC9C4`,_.sub="\uCD9C\uBC1C";else if(_.kind==="walk"){let L=_.exit?_.exit==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130\uC5D0\uC11C \uB0B4\uB824 ":"\uACC4\uB2E8\uC5D0\uC11C \uB098\uC640 ":R?`${R.title} \uC55E\uC5D0\uC11C `:"";_.action=_.word,_.text=_.dir==="straight"?`${L}${Vl(_.dist)} \uC9C1\uC9C4`:`${L}${_.word} ${Vl(_.dist)}`,_.sub=""}else if(_.kind==="stair"){let L=_.dir==="stair-up"?"\uC62C\uB77C\uAC00\uAE30":"\uB0B4\uB824\uAC00\uAE30";_.action=`\uACC4\uB2E8\uC73C\uB85C ${Ye(_.to)}`,_.text=`${_.side&&_.side!=="\uB4A4"?`${_.side}\uC5D0 \uC788\uB294 `:_.side==="\uB4A4"?"\uB4A4\uCABD ":""}\uACC4\uB2E8\uC73C\uB85C ${Ye(_.to)}\uAE4C\uC9C0 ${L}`,_.sub=`${Math.abs(_.to-_.f)}\uAC1C \uCE35 ${_.dir==="stair-up"?"\uC704":"\uC544\uB798"}`}else _.kind==="elev"?(_.action=`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C ${Ye(_.to)}`,_.text=`${_.side&&_.side!=="\uB4A4"?`${_.side} `:""}\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Ye(_.to)}\uC73C\uB85C`,_.sub=`${_.to===0?"B1":_.to}\uCE35 \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`):(_.action="\uB3C4\uCC29",_.text=`${t?t.title:"\uBAA9\uC801\uC9C0"} \uB3C4\uCC29${_.side?` \xB7 ${_.side}`:""}`,_.sub=t&&t.name?t.name:"")}return d}function Ui(i){let t=[0],e=i.pts;for(let n=1;n<e.length;n++){let s=e[n-1],r=e[n];t.push(t[n-1]+(s.kind==="elev"&&r.kind==="elev"?0:Math.hypot(r.x-s.x,r.y-s.y)))}return t}function ma(i,t,e,n=0){let s=i.pts,r={d:1/0};for(let a=0;a<s.length-1;a++){let c=s[a],l=s[a+1];if(c.kind==="elev"&&l.kind==="elev"||c.f!==e.f&&l.f!==e.f)continue;let h=l.x-c.x,u=l.y-c.y,f=h*h+u*u||1e-9,d=Math.max(0,Math.min(1,((e.x-c.x)*h+(e.y-c.y)*u)/f)),g=Math.hypot(e.x-c.x-h*d,e.y-c.y-u*d),x=t[a]+d*(t[a+1]-t[a]),m=g+(x<n-3?2:0);(m<r.score||r.d===1/0)&&(r={d:g,s:x,i:a,t:d,score:m})}if(r.d===1/0)return null;let o=t[t.length-1];return{off:r.d,s:r.s,seg:r.i,remain:Math.max(0,o-r.s),total:o}}function Jr(i,t,e,n){for(let s=1;s<i.length;s++)if(i[s].s>n+.8)return{step:i[s],index:s,dist:i[s].s-n};return{step:i[i.length-1],index:i.length-1,dist:0}}function Gl(i,t){let e=0;for(let n=0;n<i.length;n++)i[n].s<=t+.8&&(e=n);return e}function We(i,t,e){let n=i.pts;for(let r=0;r<n.length-1;r++)if(t[r+1]>=e){let o=t[r+1]-t[r],a=o>0?(e-t[r])/o:1,c=n[r],l=n[r+1];return{x:c.x+(l.x-c.x)*a,y:c.y+(l.y-c.y)*a,z:c.z+(l.z-c.z)*a,f:a<.5?c.f:l.f,i:r}}return{...n[n.length-1],i:n.length-1}}function ga(i){let t=i/1.2;return t<60?`${Math.max(10,Math.round(t/10)*10)}\uCD08`:`${Math.round(t/60)}\uBD84`}jn();jn();jn();var Wp={type:"change"},bu={type:"start"},qp={type:"end"},Sl=new si,Xp=new yn,Wv=Math.cos(70*ta.DEG2RAD),tn=new P,En=2*Math.PI,Ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Su=1e-6,bl=class extends Yo{constructor(t,e=null){super(t,e),this.state=Ae.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:On.ROTATE,MIDDLE:On.DOLLY,RIGHT:On.PAN},this.touches={ONE:bn.ROTATE,TWO:bn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new _n,this._lastTargetPosition=new P,this._quat=new _n().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wr,this._sphericalDelta=new wr,this._scale=1,this._panOffset=new P,this._rotateStart=new At,this._rotateEnd=new At,this._rotateDelta=new At,this._panStart=new At,this._panEnd=new At,this._panDelta=new At,this._dollyStart=new At,this._dollyEnd=new At,this._dollyDelta=new At,this._dollyDirection=new P,this._mouse=new At,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=qv.bind(this),this._onPointerDown=Xv.bind(this),this._onPointerUp=Yv.bind(this),this._onContextMenu=tM.bind(this),this._onMouseWheel=Kv.bind(this),this._onKeyDown=jv.bind(this),this._onTouchStart=Jv.bind(this),this._onTouchMove=Qv.bind(this),this._onMouseDown=$v.bind(this),this._onMouseMove=Zv.bind(this),this._interceptControlDown=eM.bind(this),this._interceptControlUp=nM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wp),this.update(),this.state=Ae.NONE}update(t=null){let e=this.object.position;tn.copy(e).sub(this.target),tn.applyQuaternion(this._quat),this._spherical.setFromVector3(tn),this.autoRotate&&this.state===Ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=En:n>Math.PI&&(n-=En),s<-Math.PI?s+=En:s>Math.PI&&(s-=En),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(tn.setFromSpherical(this._spherical),tn.applyQuaternion(this._quatInverse),e.copy(this.target).add(tn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=tn.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=tn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Sl.origin.copy(this.object.position),Sl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sl.direction))<Wv?this.object.lookAt(this.target):(Xp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sl.intersectPlane(Xp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Su||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Su||this._lastTargetPosition.distanceToSquared(this.target)>Su?(this.dispatchEvent(Wp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?En/60*this.autoRotateSpeed*t:En/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){tn.setFromMatrixColumn(e,0),tn.multiplyScalar(-t),this._panOffset.add(tn)}_panUp(t,e){this.screenSpacePanning===!0?tn.setFromMatrixColumn(e,1):(tn.setFromMatrixColumn(e,0),tn.crossVectors(this.object.up,tn)),tn.multiplyScalar(t),this._panOffset.add(tn)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;tn.copy(s).sub(this.target);let r=tn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(En*this._rotateDelta.x/e.clientHeight),this._rotateUp(En*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(En*this._rotateDelta.x/e.clientHeight),this._rotateUp(En*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new At,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Xv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function qv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Yv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qp),this.state=Ae.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function $v(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case On.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Ae.DOLLY;break;case On.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ae.ROTATE}break;case On.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ae.PAN}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(bu)}function Zv(i){switch(this.state){case Ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Kv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Ae.NONE||(i.preventDefault(),this.dispatchEvent(bu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(qp))}function jv(i){this.enabled!==!1&&this._handleKeyDown(i)}function Jv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case bn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Ae.TOUCH_ROTATE;break;case bn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Ae.TOUCH_PAN;break;default:this.state=Ae.NONE}break;case 2:switch(this.touches.TWO){case bn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Ae.TOUCH_DOLLY_PAN;break;case bn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Ae.TOUCH_DOLLY_ROTATE;break;default:this.state=Ae.NONE}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(bu)}function Qv(i){switch(this._trackPointer(i),this.state){case Ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Ae.NONE}}function tM(i){this.enabled!==!1&&i.preventDefault()}function eM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function nM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var El=class extends bl{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:On.PAN,MIDDLE:On.DOLLY,RIGHT:On.ROTATE},this.touches={ONE:bn.PAN,TWO:bn.DOLLY_ROTATE}}};jn();jn();function $p(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Pe,l=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Yp(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);let g=Yp(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Yp(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Le(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let x=h.getComponent(f,g);a.setComponent(f+u,g,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Eu(i,t){if(t===Kh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Lr||t===Qo){let e=i.getIndex();if(e===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),e=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=e.count-2,s=[];if(t===Lr)for(let o=1;o<=n;o++)s.push(e.getX(0)),s.push(e.getX(o)),s.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(e.getX(o)),s.push(e.getX(o+1)),s.push(e.getX(o+2))):(s.push(e.getX(o+2)),s.push(e.getX(o+1)),s.push(e.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}var Tl=class extends li{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Pu(e)}),this.register(function(e){return new Lu(e)}),this.register(function(e){return new Hu(e)}),this.register(function(e){return new Vu(e)}),this.register(function(e){return new Gu(e)}),this.register(function(e){return new Nu(e)}),this.register(function(e){return new Uu(e)}),this.register(function(e){return new Fu(e)}),this.register(function(e){return new Ou(e)}),this.register(function(e){return new Iu(e)}),this.register(function(e){return new Bu(e)}),this.register(function(e){return new Du(e)}),this.register(function(e){return new zu(e)}),this.register(function(e){return new ku(e)}),this.register(function(e){return new Ru(e)}),this.register(function(e){return new Wu(e)}),this.register(function(e){return new Xu(e)})}load(t,e,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Ti.extractUrlBase(t);o=Ti.resolveURL(l,this.path)}else o=Ti.extractUrlBase(t);this.manager.itemStart(t);let a=function(l){s?s(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new Tr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(h){e(h),r.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,s){let r,o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Qp){try{o[ue.KHR_BINARY_GLTF]=new qu(t)}catch(u){s&&s(u);return}r=JSON.parse(o[ue.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Qu(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case ue.KHR_MATERIALS_UNLIT:o[u]=new Cu;break;case ue.KHR_DRACO_MESH_COMPRESSION:o[u]=new Yu(r,this.dracoLoader);break;case ue.KHR_TEXTURE_TRANSFORM:o[u]=new $u;break;case ue.KHR_MESH_QUANTIZATION:o[u]=new Zu;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,e,s,r)})}};function iM(){let i={};return{get:function(t){return i[t]},add:function(t,e){i[t]=e},remove:function(t){delete i[t]},removeAll:function(){i={}}}}var ue={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Ru=class{constructor(t){this.parser=t,this.name=ue.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let t=this.parser,e=this.parser.json.nodes||[];for(let n=0,s=e.length;n<s;n++){let r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){let e=this.parser,n="light:"+t,s=e.cache.get(n);if(s)return s;let r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t],l,h=new Qt(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],rn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Es(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new bs(h),l.distance=u;break;case"spot":l=new Wo(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),fi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),s=Promise.resolve(l),e.cache.add(n,s),s}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){let e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}},Cu=class{constructor(){this.name=ue.KHR_MATERIALS_UNLIT}getMaterialType(){return Oe}extendParams(t,e,n){let s=[];t.color=new Qt(1,1,1),t.opacity=1;let r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],rn),t.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(t,"map",r.baseColorTexture,Fe))}return Promise.all(s)}},Iu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}},Pu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new At(a,a)}return Promise.all(r)}},Lu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_DISPERSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Du=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Nu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_SHEEN}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];e.sheenColor=new Qt(0,0,0),e.sheenRoughness=0,e.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],rn)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,Fe)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Uu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Fu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_VOLUME}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return e.attenuationColor=new Qt().setRGB(a[0],a[1],a[2],rn),Promise.all(r)}},Ou=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_IOR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Bu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_SPECULAR}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return e.specularColor=new Qt().setRGB(a[0],a[1],a[2],rn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,Fe)),Promise.all(r)}},ku=class{constructor(t){this.parser=t,this.name=ue.EXT_MATERIALS_BUMP}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}},zu=class{constructor(t){this.parser=t,this.name=ue.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){let n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Mn}extendMaterialParams(t,e){let n=this.parser,s=n.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Hu=class{constructor(t){this.parser=t,this.name=ue.KHR_TEXTURE_BASISU}loadTexture(t){let e=this.parser,n=e.json,s=n.textures[t];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}},Vu=class{constructor(t){this.parser=t,this.name=ue.EXT_TEXTURE_WEBP}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},Gu=class{constructor(t){this.parser=t,this.name=ue.EXT_TEXTURE_AVIF}loadTexture(t){let e=this.name,n=this.parser,s=n.json,r=s.textures[t];if(!r.extensions||!r.extensions[e])return null;let o=r.extensions[e],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(t,o.source,c)}},Wu=class{constructor(t){this.name=ue.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){let e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},Xu=class{constructor(t){this.name=ue.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){let e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=e.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==kn.TRIANGLES&&l.mode!==kn.TRIANGLE_STRIP&&l.mode!==kn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let g of u){let x=new ee,m=new P,p=new _n,b=new P(1,1,1),y=new ms(g.geometry,g.material,f);for(let _=0;_<f;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&b.fromBufferAttribute(c.SCALE,_),y.setMatrixAt(_,x.compose(m,p,b));for(let _ in c)if(_==="_COLOR_0"){let A=c[_];y.instanceColor=new Xi(A.array,A.itemSize,A.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);we.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Qp="glTF",na=12,Zp={JSON:1313821514,BIN:5130562},qu=class{constructor(t){this.name=ue.KHR_BINARY_GLTF,this.content=null,this.body=null;let e=new DataView(t,0,na),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Qp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-na,r=new DataView(t,na),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Zp.JSON){let l=new Uint8Array(t,na+o,a);this.content=n.decode(l)}else if(c===Zp.BIN){let l=na+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Yu=class{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ue.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){let n=this.json,s=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=ju[h]||h.toLowerCase();a[u]=o[h]}for(let h in t.attributes){let u=ju[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[t.attributes[h]],d=kr[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let g in d.attributes){let x=d.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}u(d)},a,l,rn,f)})})}},$u=class{constructor(){this.name=ue.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}},Zu=class{constructor(){this.name=ue.KHR_MESH_QUANTIZATION}},wl=class extends Mi{constructor(t,e,n,s){super(t,e,n,s)}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s*3+s;for(let o=0;o!==s;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-e,u=(n-e)/h,f=u*u,d=f*u,g=t*l,x=g-l,m=-2*d+3*f,p=d-f,b=1-m,y=p-f+u;for(let _=0;_!==a;_++){let A=o[x+_+a],R=o[x+_+c]*h,C=o[g+_+a],L=o[g+_]*h;r[_]=b*A+y*R+m*C+p*L}return r}},sM=new _n,Ku=class extends wl{interpolate_(t,e,n,s){let r=super.interpolate_(t,e,n,s);return sM.fromArray(r).normalize().toArray(r),r}},kn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},kr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Kp={9728:sn,9729:gn,9984:Nc,9985:Ar,9986:As,9987:Zn},jp={33071:ei,33648:ur,10497:Nn},Tu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ju={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},rM={CUBICSPLINE:void 0,LINEAR:fs,STEP:us},wu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function oM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new fn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yn})),i.DefaultMaterial}function Ds(i,t,e){for(let n in e.extensions)i[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function fi(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function aM(i,t,e){let n=!1,s=!1,r=!1;for(let l=0,h=t.length;l<h;l++){let u=t[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=t.length;l<h;l++){let u=t[l];if(n){let f=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function cM(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)i.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){let e=t.extras.targetNames;if(i.morphTargetInfluences.length===e.length){i.morphTargetDictionary={};for(let n=0,s=e.length;n<s;n++)i.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function lM(i){let t,e=i.extensions&&i.extensions[ue.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Au(e.attributes):t=i.indices+":"+Au(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)t+=":"+Au(i.targets[n]);return t}function Au(i){let t="",e=Object.keys(i).sort();for(let n=0,s=e.length;n<s;n++)t+=e[n]+":"+i[e[n]]+";";return t}function Ju(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var uM=new ee,Qu=class{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new iM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Vo(this.options.manager):this.textureLoader=new Xo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Tr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Ds(r,a,s),fi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){let t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=e.length;s<r;s++){let o=e[s].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let s=0,r=t.length;s<r;s++){let o=t[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+t.uses[e]++,s}_invokeOne(t){let e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){let s=t(e[n]);if(s)return s}return null}_invokeAll(t){let e=Object.values(this.plugins);e.unshift(this);let n=[];for(let s=0;s<e.length;s++){let r=t(e[s]);r&&n.push(r)}return n}getDependency(t,e){let n=t+":"+e,s=this.cache.get(n);if(!s){switch(t){case"scene":s=this.loadScene(e);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":s=this.loadAccessor(e);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":s=this.loadBuffer(e);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":s=this.loadSkin(e);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":s=this.loadCamera(e);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(n,s)}return s}getDependencies(t){let e=this.cache.get(t);if(!e){let n=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(s.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){let e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[ue.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Ti.resolveURL(e.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){let e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){let s=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(t){let e=this,n=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){let o=Tu[s.type],a=kr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Le(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Tu[s.type],l=kr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(d&&d!==u){let p=Math.floor(f/d),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,y=e.cache.get(b);y||(x=new l(a,p*d,s.count*d/h),y=new ps(x,d/h),e.cache.add(b,y)),m=new Wi(y,c,f%d/h,g)}else a===null?x=new l(s.count*c):x=new l(a,f,s.count*c),m=new Le(x,c,g);if(s.sparse!==void 0){let p=Tu.SCALAR,b=kr[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,A=new b(o[1],y,s.sparse.count*p),R=new l(o[2],_,s.sparse.count*c);a!==null&&(m=new Le(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,L=A.length;C<L;C++){let M=A[C];if(m.setX(M,R[C*c]),c>=2&&m.setY(M,R[C*c+1]),c>=3&&m.setZ(M,R[C*c+2]),c>=4&&m.setW(M,R[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){let e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){let s=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=Kp[f.magFilter]||gn,h.minFilter=Kp[f.minFilter]||Zn,h.wrapS=jp[f.wrapS]||Nn,h.wrapT=jp[f.wrapT]||Nn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==sn&&h.minFilter!==gn,s.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){let n=this,s=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());let o=s.images[t],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let g=f;e.isImageBitmapLoader===!0&&(g=function(x){let m=new je(x);m.needsUpdate=!0,f(m)}),e.load(Ti.resolveURL(u,r.path),g,void 0,d)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),fi(u,o),u.userData.mimeType=o.mimeType||hM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[ue.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[ue.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[ue.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),t[e]=o,o})}assignFinalMaterial(t){let e=t.geometry,n=t.material,s=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Mr,un.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new qi,un.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return fn}loadMaterial(t){let e=this,n=this.json,s=this.extensions,r=n.materials[t],o,a={},c=r.extensions||{},l=[];if(c[ue.KHR_MATERIALS_UNLIT]){let u=s[ue.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,e))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Qt(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],rn),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",u.baseColorTexture,Fe)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=Be);let h=r.alphaMode||wu.OPAQUE;if(h===wu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===wu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Oe&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new At(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Oe&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Oe){let u=r.emissiveFactor;a.emissive=new Qt().setRGB(u[0],u[1],u[2],rn)}return r.emissiveTexture!==void 0&&o!==Oe&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,Fe)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),fi(u,r),e.associations.set(u,{materials:t}),r.extensions&&Ds(s,u,r),u})}createUniqueName(t){let e=Ie.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){let e=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[ue.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return Jp(c,a,e)})}let o=[];for(let a=0,c=t.length;a<c;a++){let l=t[a],h=lM(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[ue.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Jp(new Pe,l,e),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){let e=this,n=this.json,s=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?oM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,g=h.length;d<g;d++){let x=h[d],m=o[d],p,b=l[d];if(m.mode===kn.TRIANGLES||m.mode===kn.TRIANGLE_STRIP||m.mode===kn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new bo(x,b):new se(x,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===kn.TRIANGLE_STRIP?p.geometry=Eu(p.geometry,Qo):m.mode===kn.TRIANGLE_FAN&&(p.geometry=Eu(p.geometry,Lr));else if(m.mode===kn.LINES)p=new _s(x,b);else if(m.mode===kn.LINE_STRIP)p=new gs(x,b);else if(m.mode===kn.LINE_LOOP)p=new wo(x,b);else if(m.mode===kn.POINTS)p=new Ao(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&cM(p,r),p.name=e.createUniqueName(r.name||"mesh_"+t),fi(p,r),m.extensions&&Ds(s,p,m),e.assignFinalMaterial(p),u.push(p)}for(let d=0,g=u.length;d<g;d++)e.associations.set(u[d],{meshes:t,primitives:d});if(u.length===1)return r.extensions&&Ds(s,u[0],r),u[0];let f=new Ze;r.extensions&&Ds(s,f,r),e.associations.set(f,{meshes:t});for(let d=0,g=u.length;d<g;d++)f.add(u[d]);return f})}loadCamera(t){let e,n=this.json.cameras[t],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new ke(ta.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(e=new Ei(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),fi(e,n),Promise.resolve(e)}loadSkin(t){let e=this.json.skins[t],n=[];for(let s=0,r=e.joints.length;s<r;s++)n.push(this._loadNodeShallow(e.joints[s]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new ee;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new To(a,c)})}loadAnimation(t){let e=this.json,n=this,s=e.animations[t],r=s.name?s.name:"animation_"+t,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],g=s.samplers[d.sampler],x=d.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",b)),l.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],g=u[2],x=u[3],m=u[4],p=[];for(let y=0,_=f.length;y<_;y++){let A=f[y],R=d[y],C=g[y],L=x[y],M=m[y];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();let S=n._createAnimationTracks(A,R,C,L,M);if(S)for(let U=0;U<S.length;U++)p.push(S[U])}let b=new Ho(r,void 0,p);return fi(b,s),b})}createNodeMesh(t){let e=this.json,n=this,s=e.nodes[t];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(t){let e=this.json,n=this,s=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,uM)});for(let d=0,g=u.length;d<g;d++)h.add(u[d]);return h})}_loadNodeShallow(t){let e=this.json,n=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];let r=e.nodes[t],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new yr:l.length>1?h=new Ze:l.length===1?h=l[0]:h=new we,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),fi(h,r),r.extensions&&Ds(n,h,r),r.matrix!==void 0){let u=new ee;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){let e=this.extensions,n=this.json.scenes[t],s=this,r=new Ze;n.name&&(r.name=s.createUniqueName(n.name)),fi(r,n),n.extensions&&Ds(e,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof un||f instanceof je)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(t,e,n,s,r){let o=[],a=t.name?t.name:t.uuid,c=[];Ki[r.path]===Ki.weights?t.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Ki[r.path]){case Ki.weights:l=oi;break;case Ki.rotation:l=ai;break;case Ki.translation:case Ki.scale:l=ci;break;default:switch(n.itemSize){case 1:l=oi;break;case 2:case 3:default:l=ci;break}break}let h=s.interpolation!==void 0?rM[s.interpolation]:fs,u=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+Ki[r.path],e.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){let n=Ju(e.constructor),s=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)s[r]=e[r]*n;e=s}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){let s=this instanceof ai?Ku:wl;return new s(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function fM(i,t,e){let n=t.attributes,s=new An;if(n.POSITION!==void 0){let a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){let h=Ju(kr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=t.targets;if(r!==void 0){let a=new P,c=new P;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=e.json.accessors[u.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let x=Ju(kr[f.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new vn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Jp(i,t,e){let n=t.attributes,s=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=ju[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(t.indices!==void 0&&!i.index){let o=e.getDependency("accessor",t.indices).then(function(a){i.setIndex(a)});s.push(o)}return de.workingColorSpace!==rn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${de.workingColorSpace}" not supported.`),fi(i,t),fM(i,t,e),Promise.all(s).then(function(){return t.targets!==void 0?aM(i,t.targets,e):i})}jn();var Hr=class extends we{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new At(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},zr=new P,tm=new ee,em=new ee,nm=new P,im=new P,Al=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:s}},this.render=function(g,x){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),tm.copy(x.matrixWorldInverse),em.multiplyMatrices(x.projectionMatrix,tm),h(g,g,x),d(g)},this.setSize=function(g,x){n=g,s=x,r=n/2,o=s/2,c.style.width=g+"px",c.style.height=x+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let x=0,m=g.children.length;x<m;x++)l(g.children[x])}function h(g,x,m){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){zr.setFromMatrixPosition(g.matrixWorld),zr.applyMatrix4(em);let p=zr.z>=-1&&zr.z<=1&&g.layers.test(m.layers)===!0,b=g.element;b.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,x,m),b.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(zr.x*r+r)+"px,"+(-zr.y*o+o)+"px)",b.parentNode!==c&&c.appendChild(b),g.onAfterRender(e,x,m));let y={distanceToCameraSquared:u(m,g)};a.objects.set(g,y)}for(let p=0,b=g.children.length;p<b;p++)h(g.children[p],x,m)}function u(g,x){return nm.setFromMatrixPosition(g.matrixWorld),im.setFromMatrixPosition(x.matrixWorld),nm.distanceToSquared(im)}function f(g){let x=[];return g.traverseVisible(function(m){m.isCSS2DObject&&x.push(m)}),x}function d(g){let x=f(g).sort(function(p,b){if(p.renderOrder!==b.renderOrder)return b.renderOrder-p.renderOrder;let y=a.objects.get(p).distanceToCameraSquared,_=a.objects.get(b).distanceToCameraSquared;return y-_}),m=x.length;for(let p=0,b=x.length;p<b;p++)x[p].element.style.zIndex=m-p}}};jn();function Ci(i){let t=i>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function Ii(i,t){let e=document.createElement("canvas");e.width=e.height=i;let n=e.getContext("2d");t(n,i);let s=new Yi(e);return s.wrapS=s.wrapT=Nn,s.colorSpace=Fe,s}var an=(i,t=1)=>`rgba(${i},${i},${i},${t})`;function ef(i,t,e,n,s,r,o){i.fillStyle=an(n),i.fillRect(0,0,t,t);for(let a=0;a<s;a++){let c=o[Math.floor(e()*o.length)];i.fillStyle=an(c[0],c[1]);let l=r[0]+e()*(r[1]-r[0]);i.beginPath(),i.arc(e()*t,e()*t,l,0,Math.PI*2),i.fill()}}var dM={floor:(i=512)=>Ii(i,t=>{let e=Ci(11);ef(t,i,e,236,5200,[.5,1.6],[[150,.55],[120,.45],[255,.7],[196,.6],[170,.5]]);let n=i/2;for(let s=0;s<2;s++)for(let r=0;r<2;r++){let o=.92+e()*.08;t.fillStyle=an(Math.round(255*o),.18),t.fillRect(s*n,r*n,n,n)}t.fillStyle=an(150,.9);for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),inlay:(i=256)=>Ii(i,t=>{let e=Ci(23);ef(t,i,e,205,2600,[.5,1.4],[[90,.6],[255,.5],[140,.5]])}),wall:(i=256)=>Ii(i,t=>{let e=Ci(5);t.fillStyle=an(248),t.fillRect(0,0,i,i);for(let n=0;n<160;n++)t.fillStyle=an(e()<.5?232:255,.08),t.beginPath(),t.ellipse(e()*i,e()*i,6+e()*26,4+e()*14,e()*3,0,Math.PI*2),t.fill()}),ceiling:(i=256)=>Ii(i,t=>{let e=Ci(7);t.fillStyle=an(250),t.fillRect(0,0,i,i),t.fillStyle=an(200,.6);for(let s=0;s<1400;s++)t.fillRect(Math.floor(e()*i),Math.floor(e()*i),1,1);t.fillStyle=an(190);let n=i/2;for(let s=0;s<=2;s++)t.fillRect(s*n-1,0,2,i),t.fillRect(0,s*n-1,i,2)}),door:(i=256)=>Ii(i,t=>{let e=Ci(13);t.fillStyle=an(246),t.fillRect(0,0,i,i);for(let n=0;n<90;n++)t.fillStyle=an(e()<.5?228:255,.25),t.fillRect(e()*i,0,1+e()*2,i)}),metal:(i=128)=>Ii(i,t=>{let e=Ci(17);t.fillStyle=an(236),t.fillRect(0,0,i,i);for(let n=0;n<120;n++)t.fillStyle=an(e()<.5?205:255,.35),t.fillRect(0,e()*i,i,1)}),wood:(i=256)=>Ii(i,t=>{let e=Ci(19);t.fillStyle=an(232),t.fillRect(0,0,i,i);for(let n=0;n<70;n++){t.strokeStyle=an(e()<.6?190:255,.35),t.lineWidth=1+e()*2,t.beginPath();let s=e()*i;t.moveTo(0,s);for(let r=0;r<=i;r+=16)t.lineTo(r,s+Math.sin(r/40+n)*3);t.stroke()}}),stone:(i=256)=>Ii(i,t=>{let e=Ci(29);ef(t,i,e,240,2600,[.5,1.5],[[160,.5],[120,.4],[255,.6]])}),plain:(i=128)=>Ii(i,t=>{let e=Ci(31);t.fillStyle=an(246),t.fillRect(0,0,i,i);for(let n=0;n<500;n++)t.fillStyle=an(e()<.5?230:255,.3),t.fillRect(e()*i,e()*i,1,1)})},om={floor:{tex:"floor",m:1.2,rough:.42},inlay:{tex:"inlay",m:.8,rough:.36},wall:{tex:"wall",m:2.4,rough:.82},ceiling:{tex:"ceiling",m:1.2,rough:.92},base:{tex:"plain",m:1,rough:.45},door:{tex:"door",m:1,rough:.5},metal:{tex:"metal",m:.6,rough:.38,metal:.55},wood:{tex:"wood",m:.8,rough:.55},stone:{tex:"stone",m:1.2,rough:.42},dark:{tex:"plain",m:1,rough:.15,metal:.2},light:{emissive:!0},plain:{tex:"plain",m:1.5,rough:.7}};function pM(i,t,e,n,s){let r=(o,a,c)=>Math.abs(i-o)<4&&Math.abs(t-a)<4&&Math.abs(e-c)<4;return s==="C"?r(255,255,255)?"light":r(244,244,238)?"ceiling":"plain":r(216,210,198)||r(203,200,192)?n?"floor":"plain":r(168,171,168)?"inlay":r(236,228,205)?"wall":r(62,56,50)?"base":r(152,192,150)?"door":r(105,112,112)||r(170,174,178)?"metal":r(150,96,58)||r(150,110,80)?"wood":r(205,200,190)||r(244,244,238)?"stone":r(40,48,52)?"dark":"plain"}var nf=null;function mM(i){var s;if(nf)return nf;let t=Math.min(4,i.capabilities.getMaxAnisotropy()),e={},n={};for(let[r,o]of Object.entries(om)){if(o.emissive){n[r]=new fn({color:16777215,emissive:16776176,emissiveIntensity:.9,side:Be});continue}let c=(e[s=o.tex]||(e[s]=dM[o.tex]())).clone();c.needsUpdate=!0,c.repeat.set(1/o.m,1/o.m),c.anisotropy=t,n[r]=new fn({vertexColors:!0,map:c,roughness:o.rough,metalness:o.metal||0,side:Be})}return nf=n,n}function am(i){return Promise.resolve().then(()=>(rm(),sm)).then(({RoomEnvironment:t})=>{let e=new Fr(i),n=e.fromScene(new t,.04).texture;return e.dispose(),n})}function sf(i){let t=i.geometry.index?i.geometry.toNonIndexed():i.geometry;t.computeVertexNormals(),t!==i.geometry&&i.geometry.dispose(),i.geometry=t}var Ns={hemi:1.15,sun:.55,env:.4,exposure:1.1,mapExposure:1.4};function cm(){return new fn({color:13624302,roughness:.05,metalness:.1,transparent:!0,opacity:.32,side:Be,depthWrite:!1,envMapIntensity:1.4})}function lm(i,t,e={}){let n=mM(t),s=i.geometry.index?i.geometry.toNonIndexed():i.geometry,r=s.getAttribute("position"),o=s.getAttribute("color"),a=r.count/3,c=i.name[0],l=Object.keys(om),h=new Uint8Array(a),u=new P,f=new P,d=new P,g=new P,x=new P,m=l.map(()=>[]);for(let L=0;L<a;L++){u.fromBufferAttribute(r,3*L),f.fromBufferAttribute(r,3*L+1),d.fromBufferAttribute(r,3*L+2),g.subVectors(d,f).cross(x.subVectors(f,u)).normalize();let M=Math.abs(g.y)>.7,S=Math.round(o.getX(3*L)*255),U=Math.round(o.getY(3*L)*255),V=Math.round(o.getZ(3*L)*255),J=l.indexOf(pM(S,U,V,M,c));h[L]=J,m[J].push(L)}let p=new Float32Array(r.count*3),b=new Float32Array(r.count*3),y=new Float32Array(r.count*3),_=new Float32Array(r.count*2),A=new Pe,R=[],C=0;for(let L=0;L<l.length;L++){if(!m[L].length)continue;let M=C;for(let U of m[L]){u.fromBufferAttribute(r,3*U),f.fromBufferAttribute(r,3*U+1),d.fromBufferAttribute(r,3*U+2),g.subVectors(d,f).cross(x.subVectors(f,u)).normalize();let V=Math.abs(g.x),J=Math.abs(g.y),Y=Math.abs(g.z);for(let st=0;st<3;st++){let $=3*U+st,F=r.getX($),I=r.getY($),X=r.getZ($);p.set([F,I,X],C*3),b.set([o.getX($),o.getY($),o.getZ($)],C*3),y.set([g.x,g.y,g.z],C*3),J>=V&&J>=Y?_.set([F,-X],C*2):V>=Y?_.set([-X,I],C*2):_.set([F,I],C*2),C++}}A.addGroup(M,C-M,R.length);let S=n[l[L]];R.push(Object.keys(e).length?Object.assign(S.clone(),e):S)}A.setAttribute("position",new Le(p,3)),A.setAttribute("color",new Le(b,3)),A.setAttribute("normal",new Le(y,3)),A.setAttribute("uv",new Le(_,2)),A.computeBoundingSphere(),A.computeBoundingBox(),i.geometry.dispose(),s!==i.geometry&&s.dispose(),i.geometry=A,i.material=R}var rf=7950591,gM=5451986,Jn=(i,t,e)=>new P(i,e,-t);function hm(i,t,{onPick:e}={}){let{M:n,FL:s}=t,r=Math.min(devicePixelRatio,2),o=Math.min(r,1.25),a=new Or({antialias:devicePixelRatio<1.5,alpha:!1,powerPreference:"high-performance"});a.setPixelRatio(r);let c=r,l=-1e9;function h(Q){Q!==c&&(c=Q,a.setPixelRatio(Q),a.setSize(i.clientWidth,i.clientHeight,!1))}a.toneMapping=Pc,a.toneMappingExposure=Ns.mapExposure,i.appendChild(a.domElement);let u=new Al;Object.assign(u.domElement.style,{position:"absolute",inset:"0",pointerEvents:"none"}),i.appendChild(u.domElement);let f=new $n;f.background=new Qt(15659254),f.add(new Ss(16777215,15130834,Ns.hemi));let d=new Es(16777215,Ns.sun);d.position.set(30,80,20),f.add(d);let g=new ke(38,1,.5,2e3),x=new ke(70,1,.08,600);x.rotation.order="YXZ";let m=new El(g,a.domElement);m.enableDamping=!0,m.dampingFactor=.12,m.screenSpacePanning=!1,m.maxPolarAngle=1.1,m.minDistance=10,m.maxDistance=170,m.touches={ONE:bn.PAN,TWO:bn.DOLLY_ROTATE};let p=1,b=!1,y=!0,_={},A=[],R=new Ze;f.add(R);let C=N();C.visible=!1,f.add(C);function L(){let Q=i.clientWidth,yt=i.clientHeight;a.setSize(Q,yt),u.setSize(Q,yt);for(let E of[g,x])E.aspect=Q/yt,E.updateProjectionMatrix();y=!0}addEventListener("resize",L),L(),m.addEventListener("change",()=>y=!0);async function M(Q,yt){let E=await fetch(Q);if(!E.ok)throw new Error(`\uB3C4\uBA74\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694 (${E.status})`);let v=+E.headers.get("content-length")||0,w;if(E.body&&v){let k=E.body.getReader(),G=[],gt=0;for(;;){let{done:rt,value:ht}=await k.read();if(rt)break;G.push(ht),gt+=ht.length,yt?.(gt/v)}w=new Uint8Array(gt);let it=0;for(let rt of G)w.set(rt,it),it+=rt.length;w=w.buffer}else w=await E.arrayBuffer();let B=await new Promise((k,G)=>new Tl().parse(w,"",k,G));try{f.environment=await am(a),f.environmentIntensity=Ns.env}catch{}B.scene.traverse(k=>{k.isMesh&&(k.name[0]==="G"?(sf(k),k.material=cm()):k.name[0]==="X"?(sf(k),k.material=new fn({vertexColors:!0,roughness:.9,side:Be})):lm(k,a,k.name[0]==="D"?{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}:{}),_[k.name]=k)}),f.add(B.scene),S(),$(p,!0)}function S(){for(let Q of t.destinations){let yt=Q.center||Q.doors[0],E=document.createElement("div"),v=Q.cat==="toilet"?"WC":Q.cat==="elev"?"EV":Q.numbered?Q.id:Q.title;E.className="room-label"+(Q.numbered?"":" icon-only"),E.textContent=v;let w=new Hr(E);w.position.copy(Jn(yt[0],yt[1],s(Q.f).z+.6)),w.userData={d:Q},w.visible=!1,f.add(w),A.push(w)}}let U=null;function V(){let Q=g.position.distanceTo(m.target);for(let yt of A){let E=yt.userData.d,v=E.key===U;if(yt.element.classList.toggle("sel",v),b){let w=E.center||E.doors[0];yt.visible=E.f===Dt.f&&Math.hypot(w[0]-Dt.x,w[1]-Dt.y)<12}else yt.visible=E.f===p&&(v||Q<(E.numbered?130:200))}}function J(){for(let Q in _){let yt=Q[0],E=+Q.slice(1);yt==="X"?_[Q].visible=b:b?_[Q].visible=Math.abs(E-Dt.f)<=1:_[Q].visible=yt!=="C"&&E===p}for(let Q of R.children)Q.visible=b?!0:Q.userData.f==null||Q.userData.f===p;y=!0}let Y=null;function st(Q,yt,E=550){Y={t0:performance.now(),dur:E,cam0:g.position.clone(),tgt0:m.target.clone(),cam1:Q,tgt1:yt},y=!0}m.addEventListener("start",()=>Y=null);function $(Q,yt=!1,E=!1){let v=s(p).z;p=Q;let w=s(Q).z-v;if(E&&w&&!yt){let B=new P(0,w,0);st((Y?Y.cam1:g.position).clone().add(B),(Y?Y.tgt1:m.target).clone().add(B),520)}else g.position.y+=w,m.target.y+=w,Y&&(Y.cam1.y+=w,Y.tgt1.y+=w);yt&&F(),J(),V()}function F(){let Q=s(p).z,yt=i.clientWidth<i.clientHeight,E=yt?32:46,v=yt?46:32,w=g.fov*Math.PI/360,B=Math.atan(Math.tan(w)*g.aspect),k=Math.max(v/Math.tan(w),E/Math.tan(B))*1.05+10,G=.5;m.target.copy(Jn(0,-1,Q));let gt=yt?new P(-1,0,0):new P(0,0,1);g.position.copy(m.target).addScaledVector(gt,Math.sin(G)*k).add(new P(0,Math.cos(G)*k,0)),m.maxDistance=Math.max(170,k*1.4),m.update(),y=!0}function I(Q,yt,E,v,w,B=0,k=70){w!==p&&$(w);let G=s(w).z,gt=i.clientHeight,it=Math.max(.3,(gt-B-k)/gt),rt=g.fov*Math.PI/360,ht=Math.atan(Math.tan(rt)*g.aspect),ct=g.position.clone().sub(m.target).normalize(),St=new P(-ct.x,0,-ct.z).normalize(),Nt=new P(-St.z,0,St.x),wt=0,Et=0;for(let[Ct,pt]of[[Q,yt],[Q,v],[E,yt],[E,v]]){let ot=Jn(Ct,pt,0).sub(Jn((Q+E)/2,(yt+v)/2,0));wt=Math.max(wt,Math.abs(ot.dot(Nt))),Et=Math.max(Et,Math.abs(ot.dot(St)))}wt+=4,Et+=4;let $t=Math.min(m.maxDistance,Math.max(18,Math.max(Et/Math.tan(rt*it)/Math.max(.5,-ct.y),wt/Math.tan(ht)))),O=Jn((Q+E)/2,(yt+v)/2,G),_t=(B-k)/gt*$t*Math.tan(rt)/Math.max(.5,-ct.y),xt=O.clone().addScaledVector(St,-_t);st(xt.clone().addScaledVector(ct,$t),xt)}function X(Q,yt,E,v=45){E!==p&&$(E);let w=s(E).z,B=g.position.clone().sub(m.target).setLength(v),k=Jn(Q,yt,w);st(k.clone().add(B),k)}let j=null;a.domElement.addEventListener("pointerdown",Q=>j=[Q.clientX,Q.clientY,performance.now()]),a.domElement.addEventListener("pointerup",Q=>{if(!j||b||Math.hypot(Q.clientX-j[0],Q.clientY-j[1])>8||performance.now()-j[2]>450)return;let E=a.domElement.getBoundingClientRect(),v=new qo;v.setFromCamera(new At((Q.clientX-E.left)/E.width*2-1,-((Q.clientY-E.top)/E.height)*2+1),g);let w=v.ray.intersectPlane(new yn(new P(0,1,0),-s(p).z),new P);w&&e?.(w.x,-w.z,p)});function et(Q,yt){let E=[];for(let w=1;w<Q.length;w++){let B=Q[w-1],k=Q[w],G=k[0]-B[0],gt=k[1]-B[1],it=Math.hypot(G,gt);if(it<.01)continue;let rt=-gt/it*yt*.5,ht=G/it*yt*.5,ct=new Pe;ct.setAttribute("position",new ve([B[0]+rt,B[2],-(B[1]+ht),B[0]-rt,B[2],-(B[1]-ht),k[0]+rt,k[2],-(k[1]+ht),k[0]-rt,k[2],-(k[1]-ht)],3)),ct.setIndex([0,1,2,2,1,3]),E.push(ct)}for(let w of Q){let B=new ri(yt*.5,14);B.rotateX(-Math.PI/2),B.translate(w[0],w[2],-w[1]),E.push(B)}let v=E.map(w=>w.index?w.toNonIndexed():w);return v.forEach(w=>{for(let B of Object.keys(w.attributes))B!=="position"&&w.deleteAttribute(B)}),$p(v)}function Mt(Q,yt=2.2){let E=new Pe,v=[],w=yt/2;for(let B=1;B<Q.length;B++){let k=Q[B-1],G=Q[B],gt=Math.hypot(G[0]-k[0],G[1]-k[1]);if(gt<.01)continue;let it=(G[0]-k[0])/gt,rt=(G[1]-k[1])/gt;for(;w<gt;){let ht=w/gt,ct=k[0]+(G[0]-k[0])*ht,St=k[1]+(G[1]-k[1])*ht,Nt=k[2]+(G[2]-k[2])*ht+.02,wt=.28,Et=[ct+it*wt,St+rt*wt],$t=[ct-it*wt*.6-rt*wt,St-rt*wt*.6+it*wt],O=[ct-it*wt*.6+rt*wt,St-rt*wt*.6-it*wt];v.push(Et[0],Nt,-Et[1],$t[0],Nt,-$t[1],O[0],Nt,-O[1]),w+=yt}w-=gt}return E.setAttribute("position",new ve(v,3)),E}let ft=new Oe({toneMapped:!1,color:rf,side:Be,polygonOffset:!0,polygonOffsetFactor:-2}),Ut=new Oe({toneMapped:!1,color:rf,transparent:!0,opacity:.28,depthTest:!1,side:Be}),Lt=new Oe({toneMapped:!1,color:16777215,side:Be,depthTest:!1});function K(){for(let Q of[...R.children])R.remove(Q),Q.geometry?.dispose(),Q.isCSS2DObject&&Q.element.remove();y=!0}function D(Q,yt,E=[]){K(),U=yt?.key||null;let v=[],w=null;for(let rt of Q.pts){if(rt.kind==="elev"){w=null;continue}if(!w||w.f!==rt.f){let ht=w&&w.pts[w.pts.length-1];w={f:rt.f,pts:ht?[ht]:[]},v.push(w)}w.pts.push([rt.x,rt.y,rt.z+.08])}for(let rt of v){if(rt.pts.length<2)continue;for(let[ct,St]of[[Ut,1],[ft,2]]){let Nt=new se(et(rt.pts,.9),ct);Nt.renderOrder=St,Nt.userData.f=rt.f,R.add(Nt)}let ht=new se(Mt(rt.pts),Lt);ht.renderOrder=3,ht.userData.f=rt.f,R.add(ht)}let B=Q.pts[0],k=Q.pts[Q.pts.length-1],G=Kt();G.position.copy(Jn(B.x,B.y,B.z+.1)),G.userData.f=B.f,R.add(G);let gt=Se();gt.position.copy(Jn(k.x,k.y,k.z)),gt.userData.f=k.f,R.add(gt);let it=Q.legs;for(let rt=0;rt<it.length;rt++){let ht=it[rt];if(ht.kind==="walk")continue;let ct=rt>=2&&it[rt-2].kind===ht.kind&&it[rt-2].id===ht.id&&it[rt-1].pts.length<=3,St=rt+2<it.length&&it[rt+2].kind===ht.kind&&it[rt+2].id===ht.id&&it[rt+1].pts.length<=3,Nt=ht;for(let xt=rt;xt+2<it.length&&it[xt+2].kind===ht.kind&&it[xt+2].id===ht.id&&it[xt+1].pts.length<=3;xt+=2)Nt=it[xt+2];let wt=ht.to>ht.from,Et=ht.kind==="stair"?ht.link.ramp.pts[wt?0:ht.link.ramp.pts.length-1]:wt?ht.link.pa:ht.link.pb,$t=ht.kind==="stair"?ht.link.ramp.pts[wt?ht.link.ramp.pts.length-1:0]:wt?ht.link.pb:ht.link.pa,O=ht.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8",_t=[];ct||_t.push([Et,ht.from,`${O} ${wt?"\u2191":"\u2193"} ${Nt.to===0?"B1":Nt.to+"\uCE35"}`]),St||_t.push([$t,ht.to,`${O}\uC5D0\uC11C \uB098\uC640\uC694`]);for(let[xt,Ct,pt]of _t){let ot=document.createElement("div");ot.className="route-tag",ot.textContent=pt;let Bt=new Hr(ot);Bt.position.copy(Jn(xt[0],xt[1],s(Ct).z+1.6)),Bt.userData.f=Ct,R.add(Bt)}}nt=[],E.forEach((rt,ht)=>{if(rt.kind==="start"||rt.kind==="arrive"||!rt.at)return;let ct=document.createElement("div");ct.className="step-dot"+(rt.kind==="stair"||rt.kind==="elev"?" vertical":""),ct.textContent=ht;let St=new Hr(ct);St.position.copy(Jn(rt.at[0],rt.at[1],s(rt.f).z+.3)),St.userData.f=rt.f,St.userData.step=ht,R.add(St),nt.push(St)}),J(),V()}let nt=[];function Ht(Q){for(let yt of nt)yt.element.classList.toggle("on",yt.userData.step===Q);y=!0}function vt(Q){U=Q?Q.key:null,V(),y=!0}function Kt(){let Q=new Ze,yt=new se(new ri(.75,28),new Oe({toneMapped:!1,color:rf,depthTest:!1})),E=new se(new ri(.48,28),new Oe({toneMapped:!1,color:16777215,depthTest:!1}));return yt.rotation.x=E.rotation.x=-Math.PI/2,E.position.y=.01,yt.renderOrder=4,E.renderOrder=5,Q.add(yt,E),Q}function Se(){let Q=new Ze,yt=new vi({toneMapped:!1,color:gM,emissive:2758016}),E=new se(new $i(.75,20,14),yt);E.position.y=2.6;let v=new se(new xs(.55,1.9,20),yt);v.rotation.x=Math.PI,v.position.y=1.5;let w=new se(new $i(.28,14,10),new Oe({toneMapped:!1,color:16777215}));return w.position.set(0,2.6,.55),Q.add(E,v,w),Q}function N(){let Q=new Ze,yt=new se(new ri(1.4,30),new Oe({toneMapped:!1,color:4033535,transparent:!0,opacity:.22,depthTest:!1})),E=new se(new ri(.55,24),new Oe({toneMapped:!1,color:4033535,depthTest:!1})),v=new se(new ri(2.6,24,-.45,.9),new Oe({toneMapped:!1,color:4033535,transparent:!0,opacity:.3,depthTest:!1}));for(let w of[yt,E,v])w.rotation.x=-Math.PI/2,w.renderOrder=6;return Q.add(yt,v,E),Q.userData.cone=v,Q}function Zt(Q){C.visible=!!Q&&Q.f===p&&!b,Q&&(C.position.copy(Jn(Q.x,Q.y,s(Q.f).z+.12)),C.userData.cone.visible=Q.yaw!=null,C.rotation.y=(Q.yaw??90)*Math.PI/180),y=!0}let Dt={x:0,y:0,z:0,f:1,yaw:0,pitch:-.12};function Vt(Q){b=Q,m.enabled=!Q,a.toneMappingExposure=Q?Ns.exposure:Ns.mapExposure,J(),V()}let kt=null;function pe(Q){Object.assign(Dt,Q),Dt.f!==kt&&(kt=Dt.f,J())}let Ot=0,Xt="";return(function Q(yt){if(requestAnimationFrame(Q),b){let v=`${Dt.x.toFixed(3)},${Dt.y.toFixed(3)},${Dt.z.toFixed(3)},${Dt.yaw.toFixed(2)},${Dt.pitch.toFixed(3)}`,w=v!==Xt;if(w?(Xt=v,l=yt,h(o)):c!==r&&yt-l>250&&(h(r),y=!0),!w&&!y)return;y=!1,x.position.set(Dt.x,Dt.z+1.6,-Dt.y),x.rotation.set(Dt.pitch,(Dt.yaw-90)*Math.PI/180,0),a.render(f,x),yt-Ot>120&&(V(),Ot=yt),u.render(f,x);return}if(Y){let v=Math.min(1,(yt-Y.t0)/Y.dur),w=v<.5?2*v*v:1-(-2*v+2)**2/2;g.position.lerpVectors(Y.cam0,Y.cam1,w),m.target.lerpVectors(Y.tgt0,Y.tgt1,w),v>=1&&(Y=null),y=!0}m.update()||!!Y?(y=!0,l=yt,h(o)):c!==r&&yt-l>250&&(h(r),y=!0),y&&(y=!1,yt-Ot>120&&(V(),Ot=yt),a.render(f,g),u.render(f,g))})(performance.now()),{load:M,setFloor:$,get floor(){return p},frame:F,fit:I,focus:X,showRoute:D,highlightStep:Ht,clearRoute:K,select:vt,setMe:Zt,setFirstPerson:Vt,setWalkPose:pe,nodes:_,redraw:()=>y=!0}}jn();var of=Math.PI/180;function _M(){let i=[];for(let t=0;t<20;t++)for(let e=0;e<18;e++)i.push([(-18+2/2+e*2)*of,(12-2/2-t*2)*of]);return i}var um=_M();function Gr(i){return Math.atan2(i[5],i[2])}function af(i,t,e){let n=Gr(e),s=new Float32Array(360),{data:r,w:o,h:a}=i;for(let c=0;c<um.length;c++){let[l,h]=um[c],u=n-l,f=Math.cos(h),d=f*Math.cos(u),g=f*Math.sin(u),x=Math.sin(h),m=e[0]*d+e[3]*g+e[6]*x,p=e[1]*d+e[4]*g+e[7]*x,b=e[2]*d+e[5]*g+e[8]*x;if(b<=.05){s[c]=NaN;continue}let y=t.fx*m/b+t.cx,_=t.fy*p/b+t.cy;if(y<1||_<1||y>o-2||_>a-2){s[c]=NaN;continue}let A=Math.floor(y),R=Math.floor(_),C=y-A,L=_-R,M=R*o+A;s[c]=r[M]*(1-C)*(1-L)+r[M+1]*C*(1-L)+r[M+o]*(1-C)*L+r[M+o+1]*C*L}return s}function cf(i,t,e,n){let s=Math.max(1,Math.ceil(n*2.5)),r=[],o=0;for(let l=-s;l<=s;l++){let h=Math.exp(-(l*l)/(2*n*n));r.push(h),o+=h}for(let l=0;l<r.length;l++)r[l]/=o;let a=new Float32Array(t*e),c=new Float32Array(t*e);for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=i[l*t+Math.min(t-1,Math.max(0,h+f))]*r[f+s];a[l*t+h]=u}for(let l=0;l<e;l++)for(let h=0;h<t;h++){let u=0;for(let f=-s;f<=s;f++)u+=a[Math.min(e-1,Math.max(0,l+f))*t+h]*r[f+s];c[l*t+h]=u}return c}var lf=i=>i*Math.tan(2*of)*.45;var DE=Math.PI/180;var fm=(i,t)=>Math.atan2(t[1]-i[1],t[0]-i[0])*180/Math.PI;function dm(i){return i.map(t=>t.kind==="stair"?{kind:"stair",fa:t.fa,pa:t.ramp.pts[0],fb:t.fb,pb:t.ramp.pts[t.ramp.pts.length-1],da:fm(t.ramp.pts[0],t.ramp.pts[Math.min(2,t.ramp.pts.length-1)]),db:fm(t.ramp.pts[t.ramp.pts.length-1],t.ramp.pts[Math.max(0,t.ramp.pts.length-3)])}:{kind:"elev",fa:t.fa,pa:t.pa,fb:t.fb,pb:t.pb})}var Wr=Math.PI/180,uf=(i,t)=>((i-t)%360+540)%360-180;function pm(i,t,e){let n=Math.floor(e*.2),s=Math.ceil(e*.8),r=new Float32Array(t);for(let l=1;l<t-1;l++){let h=0;for(let u=n;u<s;u++){let f=u*t+l;h+=Math.abs(i[f+1]-i[f-1])}r[l]=h/(s-n)}r[0]=r[1],r[t-1]=r[t-2];let o=0;for(let l of r)o+=l;o/=t;let a=0;for(let l=0;l<t;l++)r[l]-=o,a+=r[l]*r[l];let c=Math.sqrt(a/t)||1;for(let l=0;l<t;l++)r[l]/=c;return r}function ff(i,t){let e=(d,g)=>[d[g],d[3+g],d[6+g]],n=(d,g)=>d[0]*g[0]+d[1]*g[1]+d[2]*g[2],s=e(i,0),r=e(i,1),o=e(i,2),a=e(t,2),c=e(t,0),l=n(a,s),h=n(a,r),u=n(a,o),f=n(c,r);return{yaw:Math.atan2(l,u)/Wr,pitch:Math.atan2(h,u)/Wr,roll:Math.asin(Math.max(-1,Math.min(1,f)))/Wr}}var Rl=class{constructor(t,e=null){this.long=t,this.prev=null,this.samples=[],this.fov=e}add(t,e,n){let s=this.prev;if(this.prev={P:t,R:e,t:n},!s||n-s.t>.35||t.length!==s.P.length)return null;let r=ff(s.R,e);if(Math.abs(r.yaw)<3||Math.abs(r.yaw)>14||Math.abs(r.pitch)>1.5||Math.abs(r.roll)>1.5)return null;let o=t.length,a=(o-1)/2,c=r.yaw*Wr,l=-2,h=null,u=-2,f=[];for(let g=40;g<=95;g+=.5){let x=this.long/2/Math.tan(g/2*Wr),m=0,p=0;for(let y=0;y<o;y++){let _=a+x*Math.tan(Math.atan((y-a)/x)+c);if(_<0||_>o-1)continue;let A=Math.floor(_),R=_-A,C=s.P[A]*(1-R)+s.P[Math.min(o-1,A+1)]*R;m+=C*t[y],p++}if(p<o*.5)continue;let b=m/p;f.push([g,b]),b>l&&(l=b,h=g)}if(l<.75||h==null||h<=40||h>=95)return null;for(let[g,x]of f)Math.abs(g-h)>8&&(u=Math.max(u,x));if(l-u<.05)return null;let d=h;if(this.samples.push(d),this.samples.length>60&&this.samples.shift(),this.samples.length>=8){let g=[...this.samples].sort((x,m)=>x-m);this.fov=g[g.length>>1]}return this.fov}};function mm(i,t,e,n,s){let o=new Float64Array(180),a=0;for(let p=2;p<e-2;p++)for(let b=2;b<t-2;b++){let y=p*t+b,_=i[y-t+1]+2*i[y+1]+i[y+t+1]-i[y-t-1]-2*i[y-1]-i[y+t-1],A=i[y+t-1]+2*i[y+t]+i[y+t+1]-i[y-t-1]-2*i[y-t]-i[y-t+1],R=Math.hypot(_,A);if(R<90)continue;let C=(b-n.cx)/n.fx,L=(p-n.cy)/n.fy,M=Math.atan2(_,-A),S=hf(C,L,M,n,s);if(S==null)continue;let U=hf(C,L,M-.035,n,s),V=hf(C,L,M+.035,n,s);if(U==null||V==null)continue;let J=Math.abs(uf(V*4,U*4))/4;if(J>6)continue;let Y=S,st=Math.min(1,R/300)/(1+(J/1.5)**2),$=Y*2,F=Math.floor($)%180,I=$-Math.floor($);o[F]+=st*(1-I),o[(F+1)%180]+=st*I,a++}if(a<150)return null;let c=new Float64Array(180);for(let p=0;p<180;p++){let b=0;for(let y=-6;y<=6;y++)b+=o[(p+y+180)%180]*Math.exp(-(y*y)/8);c[p]=b}let l=0;for(let p=1;p<180;p++)c[p]>c[l]&&(l=p);let h=0;for(let p=0;p<180;p++)Math.min(Math.abs(p-l),180-Math.abs(p-l))>12&&(h=Math.max(h,c[p]));let u=c[(l-1+180)%180],f=c[l],d=c[(l+1)%180],g=u-2*f+d,x=g<0?.5*(u-d)/g:0;return{axis:((l+x)/2%90+90)%90,ratio:f/(h||1e-9),n:a}}function hf(i,t,e,n,s){let r=Math.cos(e)/n.fx,o=Math.sin(e)/n.fy,a=-o,c=r,l=i*o-t*r,h=s[0]*a+s[1]*c+s[2]*l,u=s[3]*a+s[4]*c+s[5]*l,f=s[6]*a+s[7]*c+s[8]*l,d=Math.hypot(h,u,f);h/=d,u/=d,f/=d;let g=Math.hypot(h,u);return Math.abs(f)<.25||g<.25?null:((Math.atan2(u,h)/Wr+90)%90+90)%90}var ia=class{constructor(t=24){this.N=t,this.s=[],this.value=null}add(t,e=1){return this.value!=null&&this.s.length>=6&&Math.abs(uf(t,this.value))>20?this.value:(this.s.push({v:t,w:e}),this.s.length>this.N&&this.s.shift(),this.value=this._median(),this.value)}get n(){return this.s.length}reset(){this.s=[],this.value=null}_median(){let t=this.s[0].v,e=this.s.map(r=>({v:t+uf(r.v,t),w:r.w}));e.sort((r,o)=>r.v-o.v);let n=e.reduce((r,o)=>r+o.w,0),s=0;for(let r of e)if(s+=r.w,s>=n/2)return r.v;return e[e.length-1].v}};var xM=i=>document.querySelector(i),Xr=i=>new Promise(t=>setTimeout(t,i)),qr=null;function yM(){try{qr=qr||new(window.AudioContext||window.webkitAudioContext);let i=qr.currentTime;for(let[t,e]of[[880,0],[660,.18]]){let n=qr.createOscillator(),s=qr.createGain();n.type="sine",n.frequency.value=t,s.gain.setValueAtTime(1e-4,i+e),s.gain.exponentialRampToValueAtTime(.18,i+e+.02),s.gain.exponentialRampToValueAtTime(1e-4,i+e+.5),n.connect(s).connect(qr.destination),n.start(i+e),n.stop(i+e+.55)}}catch{}}function Cl({from:i,to:t,title:e,hint:n,hold:s=!1,onSkip:r}){let o=xM("#lift"),a=o.querySelector(".lift-floor"),c=o.querySelector(".lift-arrow"),l=o.querySelector(".lift-msg"),h=o.querySelector(".lift-sub"),u=o.querySelector(".lift-skip"),f=t>i,d=i,g=!1,x=!1,m=null,p=null,b,y=new Promise(C=>b=C);o.hidden=!1,o.className="lift",c.textContent=f?"\u25B2":"\u25BC",a.textContent=qe(i),l.textContent=e||`${qe(t)}\uB85C \uC774\uB3D9 \uC911`,h.textContent=n||"",u.hidden=!s,u.onclick=()=>{r?.(),R.arrive()},requestAnimationFrame(()=>o.classList.add("show"));function _(C){a.classList.remove("flip"),a.offsetWidth,a.textContent=qe(C),a.classList.add("flip")}async function A(){for(await Xr(350),o.classList.add("closed"),await Xr(700),o.classList.add("moving");!g&&!x&&d!==t;){if(await Xr(1100),g||x)return;d+=f?1:-1,_(d)}}let R={finished:y,async arrive(){if(x||g)return y;for(x=!0,await p;d!==t;)d+=f?1:-1,_(d),await Xr(260);o.classList.remove("moving"),o.classList.add("arrived"),yM(),l.textContent=`${qe(t)} \uB3C4\uCC29`,u.hidden=!0,await Xr(600),o.classList.remove("closed"),await Xr(750),R.close()},close(){g||(g=!0,b(),clearTimeout(m),o.classList.remove("show"),setTimeout(()=>o.hidden=!0,250))},get arrived(){return x}};return p=A().catch(()=>{}),s||p.then(()=>R.arrive()),R}var gm="sai-indoor-voice",Ve={get on(){try{return localStorage.getItem(gm)==="1"}catch{return!1}},set on(i){try{localStorage.setItem(gm,i?"1":"0")}catch{}i||speechSynthesis?.cancel()},supported:typeof window<"u"&&"speechSynthesis"in window,say(i){if(!(!this.supported||!this.on||!i))try{speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(i.replace(/·/g,","));t.lang="ko-KR",t.rate=1.05,speechSynthesis.speak(t)}catch{}}};jn();async function _m(){try{return!!navigator.xr&&await navigator.xr.isSessionSupported("immersive-ar")}catch{return!1}}async function xm(i,t){let e=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["local-floor"],optionalFeatures:["camera-access","dom-overlay"],domOverlay:{root:t}}),n=e.enabledFeatures,s=[];if(n&&!n.includes("camera-access")&&s.push("camera-access"),e.domOverlayState||s.push("dom-overlay"),s.length)throw await e.end().catch(()=>{}),new Error(`\uC774 \uAE30\uAE30\uC758 WebXR\uC5D0 ${s.join(", ")} \uAE30\uB2A5\uC774 \uC5C6\uC5B4\uC694`);return i.xr.enabled=!0,i.xr.setReferenceSpaceType("local-floor"),await i.xr.setSession(e),e}var Il=class{constructor(t,e=220,n=!1){this.r=t,this.long=e,this.flip=n,this.rt=null,this.buf=null,this.mat=new Rn({uniforms:{map:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D map; varying vec2 vUv; void main(){ vec3 c = texture2D(map, vUv).rgb; float g = dot(c, vec3(0.299, 0.587, 0.114)); gl_FragColor = vec4(g, g, g, 1.0); }",depthTest:!1,depthWrite:!1}),this.scene=new $n;let s=new se(new vs(2,2),this.mat);s.frustumCulled=!1,this.scene.add(s),this.cam=new Ei(-1,1,1,-1,0,1)}grab(t){let e=this.r.xr.getCameraTexture(t);if(!e||!t.width)return null;let n=this.long/Math.max(t.width,t.height),s=Math.round(t.width*n),r=Math.round(t.height*n);(!this.rt||this.rt.width!==s||this.rt.height!==r)&&(this.rt?.dispose(),this.rt=new Un(s,r,{depthBuffer:!1}),this.buf=new Uint8Array(s*r*4)),this.mat.uniforms.map.value=e;let o=this.r,a=o.getRenderTarget(),c=o.xr.enabled;o.xr.enabled=!1,o.setRenderTarget(this.rt),o.render(this.scene,this.cam),o.readRenderTargetPixels(this.rt,0,0,s,r,this.buf),o.setRenderTarget(a),o.xr.enabled=c;let l=new Float32Array(s*r);for(let h=0;h<r;h++){let u=this.flip?h:r-1-h;for(let f=0;f<s;f++)l[h*s+f]=this.buf[(u*s+f)*4]}return{g:l,w:s,h:r}}dispose(){this.rt?.dispose(),this.mat.dispose()}};var pn=Math.PI/180,Yr=(i,t)=>((i-t)%360+540)%360-180;function ym(i){let t=l=>[l[0],-l[2],l[1]],e=t([i[0],i[1],i[2]]),n=t([i[4],i[5],i[6]]),s=t([i[8],i[9],i[10]]),r=e,o=[-n[0],-n[1],-n[2]],a=[-s[0],-s[1],-s[2]];return{R:[r[0],o[0],a[0],r[1],o[1],a[1],r[2],o[2],a[2]],x:i[12],y:-i[14],h:i[13]}}function vm(i,t,e){return{fx:i[0]*t/2,fy:i[5]*e/2,cx:t/2*(1-i[8]),cy:e/2*(1+i[9])}}function Dl(i){return Math.atan2(i[5],i[2])/pn}var sa=class i{constructor(){this.off=null,this.tx=0,this.ty=0,this.pending=null,this.n=0}get ok(){return this.off!=null}static solve(t,e,n){let s=Math.cos(n*pn),r=Math.sin(n*pn);return{off:n,tx:t.x-(s*e.x-r*e.y),ty:t.y-(r*e.x+s*e.y)}}update(t,e,n,s=.5){let r=i.solve(t,e,n);if(!this.ok)return Object.assign(this,r,{pending:null,n:1}),"set";let o=this.toBuilding(e.x,e.y),a=Math.hypot(o.x-t.x,o.y-t.y),c=Yr(n,this.off);if(a>3||Math.abs(c)>15){let f=this.pending;return this.pending=r,f&&Math.abs(Yr(f.off,r.off))<8&&Math.hypot(f.tx-r.tx,f.ty-r.ty)<2?(Object.assign(this,r,{pending:null}),this.n++,"snap"):"hold"}this.pending=null;let l=Math.min(.5,.25*s+.05),h=this.off+c*l,u={x:o.x+(t.x-o.x)*l,y:o.y+(t.y-o.y)*l};return Object.assign(this,i.solve(u,e,h)),this.n++,"blend"}toBuilding(t,e){let n=Math.cos(this.off*pn),s=Math.sin(this.off*pn);return{x:n*t-s*e+this.tx,y:s*t+n*e+this.ty}}toSensor(t,e){let n=Math.cos(this.off*pn),s=Math.sin(this.off*pn),r=t-this.tx,o=e-this.ty;return{x:n*r+s*o,y:-s*r+n*o}}},Pl=class{constructor(t=4){this.FH=t,this.ref=null,this.floorY=0,this.idx=0}shift(t){this.idx+=t}reset(t,e=null){this.ref=t,e!=null&&(this.floorY=e)}update(t){if(this.ref==null)return this.ref=t,0;let e=t-this.ref;return e>this.FH*.75?(this.ref+=this.FH,this.floorY+=this.FH,this.idx++,1):e<-this.FH*.75?(this.ref-=this.FH,this.floorY-=this.FH,this.idx--,-1):(Math.abs(e)<.4&&(this.ref+=e*.02),0)}};function Mm(i,t){let e=-i.off*pn,n=-i.tx,s=i.ty;return{rotY:e,px:Math.cos(e)*n+Math.sin(e)*s,py:t,pz:-Math.sin(e)*n+Math.cos(e)*s}}var Ll=class{constructor({window:t=30,posTol:e=1.5,yawTol:n=20,minInliers:s=6,minSpan:r=2.5,margin:o=.6}={}){Object.assign(this,{window:t,posTol:e,yawTol:n,minInliers:s,minSpan:r,margin:o}),this.obs=[],this.best=null}add(t,e,n,s){for(s.forEach((r,o)=>this.obs.push({t,sx:e.x,sy:e.y,syaw:e.yaw,lvl:n,f:r.f,x:r.x,y:r.y,yaw:r.yaw,w:Math.max(.05,r.ncc-.3)*(o===0?1:.6)}));this.obs.length&&t-this.obs[0].t>this.window;)this.obs.shift()}clear(){this.obs=[],this.best=null}solve(){let t=this.obs,e=[];for(let a of t){let c=Yr(a.yaw,a.syaw),l=sa.solve({x:a.x,y:a.y},{x:a.sx,y:a.sy},c);e.push({...l,df:a.f-a.lvl,...this._score(l,a.f-a.lvl)})}e.sort((a,c)=>c.score-a.score);let n=e[0];if(!n||n.n<this.minInliers||n.span<this.minSpan)return this.best=null;let s=a=>{if(a.df!==n.df||Math.abs(Yr(a.off,n.off))>10)return!0;let c=t[t.length-1],l=g=>{let x=Math.cos(g.off*pn),m=Math.sin(g.off*pn);return[x*c.sx-m*c.sy+g.tx,m*c.sx+x*c.sy+g.ty]},[h,u]=l(n),[f,d]=l(a);return Math.hypot(h-f,u-d)>3},r=e.find(a=>s(a));if(r&&r.score>n.score*this.margin)return this.best=null;let o=n;for(let a=0;a<2;a++){let c=0,l=0,h=0;for(let b of o.inl){let y=Yr(b.yaw,b.syaw)*pn;c+=b.w*Math.cos(y),l+=b.w*Math.sin(y)}let u=Math.atan2(l,c)/pn,f=0,d=0,g=Math.cos(u*pn),x=Math.sin(u*pn);for(let b of o.inl)f+=b.w*(b.x-(g*b.sx-x*b.sy)),d+=b.w*(b.y-(x*b.sx+g*b.sy)),h+=b.w;let m={off:u,tx:f/h,ty:d/h},p=this._score(m,o.df);if(p.n<this.minInliers)break;o={...m,df:o.df,...p}}return this.best=o}_score(t,e){let n=Math.cos(t.off*pn),s=Math.sin(t.off*pn),r=0,o=0,a=[],c=1/0,l=-1/0,h=1/0,u=-1/0,f=new Set;for(let d of this.obs){if(d.f-d.lvl!==e)continue;let g=n*d.sx-s*d.sy+t.tx,x=s*d.sx+n*d.sy+t.ty,m=Math.hypot(g-d.x,x-d.y);m>this.posTol||Math.abs(Yr(d.yaw,d.syaw+t.off))>this.yawTol||(a.push(d),r+=d.w*(1-m/(2*this.posTol)),f.has(d.t)||(f.add(d.t),o++),c=Math.min(c,d.sx),l=Math.max(l,d.sx),h=Math.min(h,d.sy),u=Math.max(u,d.sy))}return{score:r,n:o,inl:a,span:o?Math.hypot(l-c,u-h):0}}};var He=Math.PI/180,Ge=i=>document.querySelector(i),vM=1.35,Nl=15,MM=65,ra=i=>{navigator.userActivation?.hasBeenActive&&navigator.vibrate?.(i)},Qn=(i,t)=>((i-t)%360+540)%360-180,SM={start:"\u2191",straight:"\u2191",left:"\u2190",right:"\u2192","slight-left":"\u2196","slight-right":"\u2197","u-left":"\u21B6","u-right":"\u21B7","stair-up":"\u21E1","stair-down":"\u21E3",elev:"\u21C5",arrive:"\u2726"},oa=(i,t)=>{let e=new Array(9);for(let n=0;n<3;n++)for(let s=0;s<3;s++)e[n*3+s]=i[n*3]*t[s]+i[n*3+1]*t[3+s]+i[n*3+2]*t[6+s];return e},pf=i=>[Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i),0,0,0,1],bM=i=>[1,0,0,0,Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i)],EM=i=>[Math.cos(i),0,Math.sin(i),0,1,0,-Math.sin(i),0,Math.cos(i)],TM=[1,0,0,0,-1,0,0,0,-1];function df(i,t){let e=[Math.cos(t)*Math.cos(i),Math.cos(t)*Math.sin(i),Math.sin(t)],n=[Math.sin(i),-Math.cos(i),0],s=[Math.sin(t)*Math.cos(i),Math.sin(t)*Math.sin(i),-Math.cos(t)];return[n[0],s[0],e[0],n[1],s[1],e[1],n[2],s[2],e[2]]}function Ul(i){let t=screen.orientation&&screen.orientation.angle||window.orientation||0,e=oa(oa(pf(i.alpha*He),bM(i.beta*He)),EM(i.gamma*He));return oa(oa(e,pf(t*He)),TM)}async function Sm(i){let{indoor:t,dest:e,mode:n,demo:s,assets:r="assets/",onClose:o,onRoute:a}=i,c=i.route,l=Ge("#ar"),h=Ge("#ar-video"),u=Ge("#ar-gl"),f={step:Ge("#ar-step-text"),sub:Ge("#ar-step-sub"),arrow:Ge("#ar-arrow"),status:Ge("#ar-status"),coach:Ge("#ar-coach"),dest:Ge("#ar-dest"),remain:Ge("#ar-remain"),err:Ge("#ar-error"),arrive:Ge("#ar-arrive"),mini:Ge("#ar-mini")};l.hidden=!1,f.err.hidden=!0,f.arrive.hidden=!0,f.coach.hidden=!1,f.dest.textContent=`${e.title}${e.name?" \xB7 "+e.name:""}`,fe("searching","\uC704\uCE58\uB97C \uCC3E\uB294 \uC911");let d=!1;if(!s){try{typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?d=await DeviceOrientationEvent.requestPermission()==="granted":d="DeviceOrientationEvent"in window}catch{d=!1}try{typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()}catch{}}let g=!1,x=null,m=null,p=+new URLSearchParams(location.search).get("fov")||0,b=0;try{b=+localStorage.getItem("sai-ar-fov")||0}catch{}let y=p||b||MM,_=null,A=new URLSearchParams(location.search),R=A.has("debug"),C=!s&&!A.has("legacy")&&await _m();async function L(){if(!window.isSecureContext)throw Object.assign(new Error("HTTPS \uC8FC\uC18C\uC5D0\uC11C\uB9CC \uCE74\uBA54\uB77C\uB97C \uC4F8 \uC218 \uC788\uC5B4\uC694."),{code:"insecure"});if(!navigator.mediaDevices?.getUserMedia)throw Object.assign(new Error("\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uCE74\uBA54\uB77C\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694."),{code:"nocam"});x=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{ideal:"environment"},width:{ideal:960},height:{ideal:720}}}),h.srcObject=x,h.loop=!1,await h.play()}async function M(){let H=await fetch(r+"demo.json").then(Z=>Z.json());m=H,h.srcObject=null,h.src=r+H.video,h.loop=!1,h.muted=!0,await h.play().catch(()=>{})}try{s?await M():C||await L()}catch(H){Ce(H);let Z=()=>{g=!0,x?.getTracks().forEach(dt=>dt.stop()),l.hidden=!0,o?.()};return Ge("#ar-error-close").onclick=Z,Ge("#ar-demo").onclick=()=>{Z(),i.onDemo?.()},{close:Z}}let S=null,U=async()=>{try{S=await navigator.wakeLock?.request("screen")}catch{}};U();let V=!1,J=()=>{document.hidden?(V=!0,m&&h.pause()):V&&(V=!1,U(),I?.postMessage({type:"reset"}),D.ok=!1,nt.init=!1,m?h.play().catch(()=>{}):h.play().catch(()=>{}))};document.addEventListener("visibilitychange",J);let Y=null,st=H=>{H.alpha==null||C||(Y={alpha:H.alpha,beta:H.beta,gamma:H.gamma,t:performance.now()})};!m&&d&&addEventListener("deviceorientation",st);let $={on:!1,lp:9.8,hi:!1,lastT:0,lo:99,top:0},F=H=>{let Z=H.accelerationIncludingGravity;if(!Z||Z.x==null||C)return;$.on=!0,$.lp+=(Math.hypot(Z.x,Z.y,Z.z)-$.lp)*.25,$.lo=Math.min($.lo,$.lp),$.top=Math.max($.top,$.lp);let dt=performance.now();if(!$.hi&&$.lp>10.8&&dt-$.lastT>280)$.hi=!0;else if($.hi&&$.lp<9.9){$.hi=!1,$.lastT=dt;let lt=Math.max(.45,Math.min(.85,.48*Math.pow(Math.max(.5,$.top-$.lo),.25)));$.lo=99,$.top=0;let bt=St();$.n=($.n||0)+1,bt!=null&&X&&!Xt&&(I.postMessage({type:"step",len:lt,yaw:bt}),wt(bt))}};m||addEventListener("devicemotion",F);let I=new Worker("ar-worker.js"),X=!1,j=!1,et=0,Mt=0;I.onmessage=H=>{let Z=H.data;Z.type==="ready"?X=!0:Z.type==="error"?Ce(new Error(`\uC704\uCE58 \uC778\uC2DD \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. ${Z.message}`)):Z.type==="pose"?(Z.id&&(j=!1,Mt=Z.ms),Z.cands&&ct(Z.id,Z.cands),Nt(Z.r,Z.id)):Z.type==="motion"&&Et(Z.r)};let ft=t.M;I.postMessage({type:"init",indexUrl:new URL(r+"ar-index.bin",location.href).href,svUrl:new URL(r+"sv.json",location.href).href,portals:dm(t.links),grid:{gx0:ft.gx0,gy1:ft.gy1,cell:ft.cell,gw:ft.gw,gh:ft.gh,floors:ft.floors.map(H=>({n:H.n,grid:H.grid}))}});let Ut=document.createElement("canvas"),Lt=Ut.getContext("2d",{willReadFrequently:!0});function K(){let H=h.videoWidth,Z=h.videoHeight;if(!H||!Z)return null;let dt=220/Math.max(H,Z),lt=Math.round(H*dt),bt=Math.round(Z*dt);Ut.width!==lt&&(Ut.width=lt,Ut.height=bt),Lt.drawImage(h,0,0,lt,bt);let Tt=Lt.getImageData(0,0,lt,bt).data,at=new Float32Array(lt*bt);for(let Rt=0,Jt=0;Rt<at.length;Rt++,Jt+=4)at[Rt]=.299*Tt[Jt]+.587*Tt[Jt+1]+.114*Tt[Jt+2];let mt;if(m){let Rt=lt/m.K[4];mt={fx:m.K[0]*Rt,fy:m.K[1]*Rt,cx:m.K[2]*Rt,cy:m.K[3]*Rt}}else{let Rt=Math.max(lt,bt)/2/Math.tan(y/2*He);mt={fx:Rt,fy:Rt,cx:lt/2,cy:bt/2}}return{img:{data:cf(at,lt,bt,lf(mt.fx)),w:lt,h:bt},K:mt,raw:{g:at,w:lt,h:bt}}}let D={ok:!1,x:0,y:0,f:c.pts[0].f,yaw:90,conf:0,lastFix:0},nt={x:0,y:0,yaw:90,init:!1},Ht=null,vt=new ia,Kt=[],Se=0,N=!1,Zt=Ui(c),Dt=i.steps||Gs(c,e,{landmarks:t.destinations}),Vt=0,kt=0,pe=!1,Ot=-1,Xt=null,Q=null,yt=new Set,E=new Set,v=m?(m.pitchDeg||-6)*He:0,w=new Map;for(let H of t.floors){let Z=[];for(let dt of t.FL(H).rooms){let lt=dt.poly;for(let bt=0;bt<lt.length;bt++){let Tt=lt[bt],at=lt[(bt+1)%lt.length],mt=Math.hypot(at[0]-Tt[0],at[1]-Tt[1]);if(mt<1)continue;let Rt=Math.atan2(at[1]-Tt[1],at[0]-Tt[0])/He;Rt=(Rt%90+90)%90,Z.push({x:(Tt[0]+at[0])/2,y:(Tt[1]+at[1])/2,L:mt,t:Rt})}}w.set(H,Z)}function B(H,Z,dt){let lt=[],bt=0;for(let at of w.get(H)||[]){if(Math.hypot(at.x-Z,at.y-dt)>10)continue;bt+=at.L;let mt=lt.find(Rt=>Math.abs(Qn(Rt.t*4,at.t*4))/4<2);mt?(mt.t=(mt.t*mt.L+(mt.t+Qn(at.t*4,mt.t*4)/4)*at.L)/(mt.L+at.L),mt.L+=at.L):lt.push({t:at.t,L:at.L})}let Tt=lt.sort((at,mt)=>mt.L-at.L)[0];return Tt&&Tt.L>bt*.75?Tt.t:null}let k=new ia(15),G=0,gt=null,it=0;function rt(H){return k.n>=3&&H-G<2e4?k.value:vt.value}function ht(H,Z,dt){let lt=gt,bt=it;if(gt=Z,it=dt,!D.ok||!lt||dt-bt>400)return;let Tt=ff(lt,Z);if(Math.abs(Tt.yaw)>2.5||Math.abs(Tt.pitch)>2.5)return;let at=B(D.f,nt.x,nt.y);if(at==null)return;let mt=mm(H.raw.g,H.raw.w,H.raw.h,H.K,Z);if(!mt||mt.ratio<2.5)return;let Rt=Ht??vt.value??D.off;if(Rt==null)return;let Jt=at-mt.axis,he=Jt+90*Math.round(Qn(Rt,Jt)/90);Math.abs(Qn(he,Rt))>30||(k.add(he,Math.min(3,mt.ratio/2)),G=dt,k.n>=3&&I.postMessage({type:"heading",off:k.value,sd:5}))}function ct(H,Z){let dt=z.q.get(H);if(!C||!dt||Xt||g)return;let lt=performance.now();q.add(dt.t,dt,dt.lvl,Z);let bt=q.solve();if(!bt||!z.last)return;let Tt=z.last,at=Math.cos(bt.off*He),mt=Math.sin(bt.off*He),Rt={x:at*Tt.x-mt*Tt.y+bt.tx,y:mt*Tt.x+at*Tt.y+bt.ty},Jt=Math.min(1,bt.n/12),he=!ut.ok,Ne=ut.update(Rt,{x:Tt.x,y:Tt.y},bt.off,Jt);if(Ne==="hold")return;let me=It.idx+bt.df;t.floors.includes(me)&&(D.f=me),D.conf=Jt,D.off=ut.off,D.lastFix=lt,(Ne==="set"||Ne==="snap")&&(Ke=!0),he&&(f.coach.hidden=!0,ra(40)),Se=0,N=!1,fe("ok",`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Ye(D.f)}`),lt-z.fixT>2e3&&(z.fixT=lt,I.postMessage({type:"fix",fix:{f:D.f,x:Rt.x,y:Rt.y,yaw:Tt.yaw+ut.off,conf:.8},yaw:Tt.yaw}))}function St(){return Y?Gr(Ul(Y))*180/Math.PI:null}function Nt(H,Z){if(g)return;let dt=performance.now();if(Z&&z.q.delete(Z),Xt)if(H.ok&&Q&&H.f===Q.to&&H.conf>.2)O();else return;if(C){ut.ok||fe("searching","\uC8FC\uBCC0\uC744 \uBE44\uCD94\uBA70 \uBA87 \uAC78\uC74C \uAC78\uC5B4 \uC8FC\uC138\uC694");return}if(H.ok&&D.ok){if(H.f!==D.f||Math.hypot(H.x-D.x,H.y-D.y)>5){let bt=D.jump;if(D.jump={f:H.f,x:H.x,y:H.y},!bt||bt.f!==H.f||Math.hypot(bt.x-H.x,bt.y-H.y)>2.5)return}D.jump=null}if(H.ok){let lt=!D.ok;D.off=H.off,Object.assign(D,{ok:!0,x:H.x,y:H.y,f:H.f,yaw:H.yaw,conf:H.conf,lastFix:dt}),H.off!=null&&Y&&H.conf>.35&&vt.add(H.off,H.conf),lt&&(f.coach.hidden=!0,ra(40)),Se=0,N=!1,fe(H.conf>.35?"ok":"weak",H.conf>.35?`\uC704\uCE58 \uD655\uC778\uB428 \xB7 ${Ye(H.f)}`:`\uC704\uCE58\uAC00 \uC870\uAE08 \uBD88\uD655\uC2E4\uD574\uC694 \xB7 ${Ye(H.f)}`),xt()}else D.ok&&dt-D.lastFix>Nl*1e3&&!(C&&ut.ok)&&(D.ok=!1),(!D.ok||dt-D.lastFix>3e3)&&(Se=Se||dt,fe("searching",D.ok?"\uC704\uCE58\uB97C \uB2E4\uC2DC \uB9DE\uCD94\uB294 \uC911":"\uC8FC\uBCC0\uC744 \uCC9C\uCC9C\uD788 \uBE44\uCDB0 \uC8FC\uC138\uC694"),D.ok||(f.coach.hidden=!1),!N&&dt-Se>6e3&&(N=!0,Ve.say("\uD734\uB300\uD3F0\uC744 \uC138\uC6CC\uC11C \uCC9C\uCC9C\uD788 \uC88C\uC6B0\uB85C \uBE44\uCDB0 \uC8FC\uC138\uC694")))}function wt(H){let Z=performance.now();for(Kt.push({yaw:H,t:Z});Kt.length&&Z-Kt[0].t>5e3;)Kt.shift();if(Kt.length<6||!D.ok||nt.s==null||$.n%2)return;let dt=Kt.slice(-6).map(me=>me.yaw),lt=0,bt=0;for(let me of dt)lt+=Math.cos(me*He),bt+=Math.sin(me*He);let Tt=Math.atan2(bt,lt)/He;if(dt.some(me=>Math.abs(Qn(me,Tt))>10))return;let at=We(c,Zt,Math.max(0,nt.s-3)),mt=We(c,Zt,nt.s+1),Rt=We(c,Zt,nt.s+5);if(at.f!==D.f||Rt.f!==D.f)return;let Jt=(me,xn)=>Math.atan2(xn.y-me.y,xn.x-me.x)/He;if(Math.abs(Qn(Jt(at,mt),Jt(mt,Rt)))>8)return;let he=Qn(Jt(at,Rt),Tt),Ne=rt(performance.now());Ne==null||Math.abs(Qn(he,Ne))>45||vt.add(he,2.5)}function Et(H){g||Xt||!D.ok||H.f!==D.f||(D.x=H.x,D.y=H.y,xt())}function $t(H){Q=H,E.add(H.s),C&&q.clear(),Ve.say(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uB97C \uD0C0\uACE0 ${Ye(H.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`),ra([30,60,30]);let Z=c.pts.find((dt,lt)=>dt.kind==="elev"&&dt.f===H.to&&c.pts[lt-1]?.kind==="elev");Z&&I.postMessage({type:"lift",f:H.to,x:Z.x,y:Z.y}),Xt=Cl({from:H.f,to:H.to,title:`${qe(H.to)} \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694`,hint:"\uB0B4\uB9B0 \uB4A4 \uD734\uB300\uD3F0\uC744 \uC138\uC6CC \uBCF5\uB3C4\uB97C \uBE44\uCD94\uBA74 \uC774\uC5B4\uC11C \uC548\uB0B4\uD574\uC694",hold:!0,onSkip:()=>O(!0)})}function O(H=!1){if(!Xt)return;let Z=Q;H||Xt.arrive(),Xt=null,Vt=Z.s,D.f=Z.to,C&&z.last&&(It.reset(z.last.h,z.last.h-z.eye),It.shift(Z.to-Z.f)),nt.init=!1,Ve.say(`${Ye(Z.to)}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`),Ke=!0}function _t(H,Z){let dt=H.step,lt=Math.round(H.dist);return dt.kind==="arrive"?Z.remain<3?`${e.title} \uB3C4\uCC29`:`${Math.round(Z.remain)}m \uC55E ${e.title}`:dt.kind==="stair"||dt.kind==="elev"?H.dist<3?dt.text:`${lt}m \uC55E ${dt.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"}`:H.dist<4?`\uC9C0\uAE08 ${dt.action}`:`${lt}m \uC55E\uC5D0\uC11C ${dt.action}`}function xt(){if(Xt)return;let H=ma(c,Zt,D,Vt);if(!H)return;if(H.off>6){if(D.conf>.4&&++kt>=4){kt=0;let mt=t.routeTo({f:D.f,x:D.x,y:D.y},e,{mode:n});mt&&(c=mt,Zt=Ui(c),Dt=Gs(c,e,{landmarks:t.destinations}),Vt=0,Ot=-1,yt.clear(),Ke=!0,a?.(c,Dt),Yt("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"),Ve.say("\uACBD\uB85C\uB97C \uB2E4\uC2DC \uCC3E\uC558\uC5B4\uC694"))}return}kt=0,Vt=Math.max(Vt-1,H.s);let Z=Jr(Dt,c,Zt,H.s);Z.index!==Ot&&(Ot=Z.index,ra(25),Ke=!0);let dt=Z.step;f.arrow.dataset.dir=dt.dir,f.step.textContent=_t(Z,H);let lt=Dt[Z.index+1];f.sub.textContent=dt.kind==="arrive"?dt.sub||"":lt?`${dt.text} \xB7 \uB2E4\uC74C: ${lt.text}`:dt.text,f.remain.textContent=`\uB0A8\uC740 \uAC70\uB9AC ${Math.round(H.remain)}m \xB7 \uC57D ${ga(H.remain)}`;let bt=Z.index*2,Tt=bt+1,at=D.conf>.3;if(at&&dt.kind!=="arrive"&&Z.dist<15&&Z.dist>=4&&!yt.has(bt)?(yt.add(bt),Ve.say(`${Math.round(Z.dist)}\uBBF8\uD130 \uC55E, ${dt.text}`)):at&&Z.dist<4&&!yt.has(Tt)&&dt.kind!=="elev"&&(yt.add(Tt),Ve.say(dt.kind==="arrive"?`${e.title}, ${dt.side||""}`:dt.text)),dt.kind==="elev"&&Z.dist<3&&D.f===dt.f&&!E.has(dt.s)&&$t(dt),H.remain<2.5&&D.f===c.pts[c.pts.length-1].f&&!pe){pe=!0,ra([60,40,60]);let mt=Dt[Dt.length-1].side;f.arrive.querySelector("b").textContent=`${e.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694${mt&&mt!=="\uC815\uBA74"?` \xB7 \uBB38\uC740 ${mt}`:""}`,f.arrive.hidden=!1}D.s=H.s}let Ct=new Or({canvas:u,antialias:!0,alpha:!0});Ct.setPixelRatio(Math.min(devicePixelRatio,2)),Ct.setClearColor(0,0);let pt=new $n;pt.add(new Ss(16777215,8943530,2.2));let ot=new ke(60,1,.05,200),Bt=new Ze;pt.add(Bt);let ne=(H,Z,dt)=>new P(H,dt,-Z),be=(()=>{let H=document.createElement("canvas");H.width=64,H.height=64;let Z=H.getContext("2d");Z.fillStyle="rgba(121,80,255,0.78)",Z.fillRect(0,0,64,64),Z.strokeStyle="#fff",Z.lineWidth=9,Z.lineCap="round",Z.lineJoin="round",Z.beginPath(),Z.moveTo(14,44),Z.lineTo(32,22),Z.lineTo(50,44),Z.stroke();let dt=new Yi(H);return dt.wrapS=dt.wrapT=Nn,dt.colorSpace=Fe,dt})(),ge=new Oe({map:be,transparent:!0,depthWrite:!1,side:Be}),Xe=null,Ke=!0;function ua(H){let Z=H+15;for(let dt=1;dt<Dt.length;dt++){let lt=Dt[dt];if(!(lt.s<=H+.8)){if(lt.s>Z)break;if(lt.kind==="walk"&&lt.dir!=="straight"&&lt.dir!=="start")return lt.s+1.2;if(lt.kind!=="walk"&&lt.kind!=="start")return lt.s}}return Math.min(Z,Zt[Zt.length-1])}function zn(H){if(Xe&&(Bt.remove(Xe),Xe.geometry.dispose()),Xe=null,!D.ok)return;let Z=H??D.s??0,dt=Math.max(0,Z+.8),lt=ua(Z),bt=t.FL(D.f).z,Tt=[];for(let me=dt;me<=lt+1e-6;me+=.5){let xn=We(c,Zt,Math.min(me,lt));if(xn.f!==D.f||Math.abs(xn.z-bt)>.3)break;Tt.push({...xn,z:bt})}if(Tt.length<2)return;let at=[],mt=[],Rt=[],Jt=.6,he=0;for(let me=0;me<Tt.length;me++){let xn=Tt[Math.max(0,me-1)],Pn=Tt[Math.min(Tt.length-1,me+1)],Hn=Pn.x-xn.x,zs=Pn.y-xn.y,Ef=Math.hypot(Hn,zs)||1;Hn/=Ef,zs/=Ef;let es=Tt[me];me&&(he+=Math.hypot(es.x-Tt[me-1].x,es.y-Tt[me-1].y)/Jt);let Tf=es.z+.03;if(at.push(es.x-zs*Jt*.5,Tf,-(es.y+Hn*Jt*.5),es.x+zs*Jt*.5,Tf,-(es.y-Hn*Jt*.5)),mt.push(0,he,1,he),me){let Hs=me*2;Rt.push(Hs-2,Hs-1,Hs,Hs,Hs-1,Hs+1)}}let Ne=new Pe;Ne.setAttribute("position",new ve(at,3)),Ne.setAttribute("uv",new ve(mt,2)),Ne.setIndex(Rt),Xe=new se(Ne,ge),Xe.renderOrder=1,Bt.add(Xe)}let Bs=new Oe({color:7950591,transparent:!0,side:Be,depthWrite:!1}),Kr=new qi({color:16777215,transparent:!0}),Qi=(()=>{let Z=new br;Z.moveTo(0,.55*1.5),Z.lineTo(.42*1.5,.1*1.5),Z.lineTo(.16*1.5,.1*1.5),Z.lineTo(.16*1.5,-.45*1.5),Z.lineTo(-.16*1.5,-.45*1.5),Z.lineTo(-.16*1.5,.1*1.5),Z.lineTo(-.42*1.5,.1*1.5),Z.closePath();let dt=new ko(Z);dt.rotateX(-Math.PI/2);let lt=new se(dt,Bs),bt=new _s(new Io(dt),Kr),Tt=new Ze;return Tt.add(lt,bt),Tt.renderOrder=2,Tt.visible=!1,Bt.add(Tt),Tt})(),Pi=(()=>{let H=new Ze,Z=new vi({color:5451986,emissive:2758016}),dt=new se(new $i(.22,20,14),Z);dt.position.y=1.9;let lt=new se(new xs(.16,.6,16),Z);lt.rotation.x=Math.PI,lt.position.y=1.55;let bt=document.createElement("canvas");bt.width=256,bt.height=80;let Tt=bt.getContext("2d");Tt.fillStyle="#5330d2",Tt.beginPath(),Tt.roundRect(4,4,248,72,36),Tt.fill(),Tt.fillStyle="#fff",Tt.font="bold 40px 'Noto Sans KR', sans-serif",Tt.textAlign="center",Tt.textBaseline="middle",Tt.fillText(e.title,128,42);let at=new Yi(bt);at.colorSpace=Fe;let mt=new So(new xr({map:at,depthTest:!1,sizeAttenuation:!1}));return mt.scale.set(.2,.0625,1),mt.position.y=2.45,mt.renderOrder=5,H.add(dt,lt,mt),Bt.add(H),H})();function Li(){let H=l.clientWidth,Z=l.clientHeight;Ct.setSize(H,Z,!1);let dt=h.videoWidth||16,lt=h.videoHeight||9,bt;if(m)bt=2*Math.atan(m.K[5]/2/m.K[1]);else{let Rt=Math.max(dt,lt)/2/Math.tan(y/2*He);bt=2*Math.atan(lt/2/Rt)}let Tt=dt/lt,at=H/Z,mt=at<=Tt?bt:2*Math.atan(Math.tan(bt/2)*Tt/at);ot.fov=mt/He,ot.aspect=at,ot.updateProjectionMatrix()}addEventListener("resize",Li),h.onloadedmetadata=Li,Li();let ts=new ee;function fa(H,Z,dt,lt){let bt=(Tt,at)=>{let mt=[H[Tt]*at,H[3+Tt]*at,H[6+Tt]*at];return new P(mt[0],mt[2],-mt[1])};ts.makeBasis(bt(0,1),bt(1,-1),bt(2,-1)),ot.quaternion.setFromRotationMatrix(ts),ot.position.copy(ne(Z,dt,lt))}let le=f.mini.getContext("2d");function Bl(H){let Z=f.mini.width,dt=4.2;if(le.setTransform(1,0,0,1,0,0),le.clearRect(0,0,Z,Z),!D.ok)return;le.save(),le.translate(Z/2,Z/2),le.rotate((H-90)*Math.PI/180);let lt=(at,mt)=>[(at-nt.x)*dt,-(mt-nt.y)*dt],bt=t.FL(D.f);for(let at of bt.rooms)le.beginPath(),at.poly.forEach((mt,Rt)=>{let Jt=lt(mt[0],mt[1]);Rt?le.lineTo(Jt[0],Jt[1]):le.moveTo(Jt[0],Jt[1])}),le.closePath(),le.fillStyle=at.id===e.id&&D.f===e.f?"#7950ff55":"#e9e5f1",le.fill(),le.strokeStyle="#cfc8e0",le.lineWidth=1,le.stroke();le.strokeStyle="#7950ff",le.lineWidth=5,le.lineCap=le.lineJoin="round",le.beginPath();let Tt=!1;for(let at of c.pts){if(at.f!==D.f){Tt=!1;continue}let mt=lt(at.x,at.y);Tt?le.lineTo(mt[0],mt[1]):le.moveTo(mt[0],mt[1]),Tt=!0}le.stroke(),le.restore(),le.fillStyle="#3d8bff33",le.beginPath(),le.moveTo(Z/2,Z/2),le.arc(Z/2,Z/2,46,-Math.PI/2-.45,-Math.PI/2+.45),le.fill(),le.fillStyle="#3d8bff",le.strokeStyle="#fff",le.lineWidth=4,le.beginPath(),le.arc(Z/2,Z/2,10,0,Math.PI*2),le.fill(),le.stroke()}let Di=R?document.createElement("pre"):null,da=0;Di&&(Di.className="ar-debug",l.append(Di));let Ni=0,jr=0,ks=performance.now();h.onseeked=()=>I.postMessage({type:"reset"});let T=0;function W(H){if(g)return;requestAnimationFrame(W);let Z=Math.min(.1,(H-ks)/1e3);if(ks=H,X&&!j&&!V&&H-Ni>200&&h.readyState>=2){m&&h.currentTime<T-1&&I.postMessage({type:"reset"}),T=h.currentTime;let at=K(),mt=null;if(m?mt=df(0,v):Y?mt=Ul(Y):mt=df(0,-8*He),at&&mt&&!m&&Y&&!p){_=_||new Rl(Math.max(at.raw.w,at.raw.h),b||null);let Rt=_.add(pm(at.raw.g,at.raw.w,at.raw.h),mt,H/1e3);if(Rt&&Math.abs(Rt-y)>.4){y=Rt,Li();try{localStorage.setItem("sai-ar-fov",Rt.toFixed(1))}catch{}}}if(at&&mt&&!m&&Y&&ht(at,mt,H),at&&mt){let Rt=Math.asin(mt[8])/He;if(!m&&(Rt<-35||Rt>25))fe("weak",Rt<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{let Jt=af(at.img,at.K,mt),he=m||!Y?null:Gr(mt)*180/Math.PI,Ne=Ni?Math.min(2,(H-Ni)/1e3):0;Ne&&I.postMessage({type:"tick",dt:Ne,yaw:he,hasSensor:he!=null,pdr:$.on}),j=!0,Ni=H,I.postMessage({type:"query",id:++et,q:Jt,yaw:he,floorHint:Q&&Xt?Q.to:We(c,Zt,Vt).f},[Jt.buffer])}}Re(H)}let dt=rt(H);if(dt!=null)if(Ht==null)Ht=dt;else{let at=Qn(dt,Ht);Ht+=at*Math.min(1,Z*(Math.abs(at)>8?2:.7))}if(D.ok){let at=D.x,mt=D.y,Rt=ma(c,Zt,D,Vt);if(Rt&&Rt.off<3){let he=Rt.s;nt.s!=null&&he<nt.s-1&&!nt.back?(nt.back=!0,he=nt.s):nt.back=!1;let Ne=We(c,Zt,he);at=Ne.x,mt=Ne.y,nt.s=he}else nt.s=null;nt.init||Object.assign(nt,{x:at,y:mt,yaw:D.yaw,init:!0});let Jt=Math.min(1,Z*2.5);nt.x+=(at-nt.x)*Jt,nt.y+=(mt-nt.y)*Jt,m&&(nt.yaw+=Qn(D.yaw,nt.yaw)*Math.min(1,Z*3))}let lt=nt.yaw,bt;if(!m&&Y){let at=Ul(Y);bt=oa(pf((Ht??0)*He),at),lt=Gr(bt)*180/Math.PI}else bt=df(nt.yaw*He,v);let Tt=t.FL(D.f).z+vM;fa(bt,nt.x,nt.y,Tt),tt(H,Z,lt)}function tt(H,Z,dt){let lt=nt.s??D.s;(Ke||D.ok&&Math.abs((lt??0)-(zn.s??-99))>1)&&(zn(lt),zn.s=lt??0,Ke=!1),be.offset.y-=Z*1.6;let bt=(H-D.lastFix)/1e3,Tt=D.ok&&!Xt&&bt<Nl&&(m||!Y||Ht!=null);jr+=((Tt?1:0)-jr)*Math.min(1,Z*4);let at=jr*(bt>Nl-3?Math.max(0,(Nl-bt)/3):1);ge.opacity=at*.9,Bs.opacity=Kr.opacity=at,Xe&&(Xe.visible=at>.02);let mt=c.pts[c.pts.length-1];if(Pi.visible=at>.02&&mt.f===D.f&&Math.hypot(mt.x-nt.x,mt.y-nt.y)<35,Pi.position.copy(ne(mt.x,mt.y,t.FL(mt.f).z)),Pi.children[0].position.y=1.9+Math.sin(H/300)*.05,Qi.visible=!1,at>.02&&lt!=null){let Rt=Jr(Dt,c,Zt,lt);if(Rt.dist<15&&Rt.step.kind==="walk"&&Rt.step.dir!=="straight"){let me=lt+Rt.dist,xn=We(c,Zt,me),Pn=We(c,Zt,me+.9),Hn=We(c,Zt,me+3);if(Pn.f===D.f&&xn.f===D.f&&Math.hypot(Hn.x-Pn.x,Hn.y-Pn.y)>.3){Qi.visible=!0;let zs=Math.atan2(Hn.y-Pn.y,Hn.x-Pn.x)/He;Qi.position.copy(ne(Pn.x,Pn.y,t.FL(D.f).z+.04)),Qi.rotation.set(0,(zs-90)*He,0)}}f.arrow.textContent=Rt.dist<25&&SM[Rt.step.dir]||"\u2191";let Jt=We(c,Zt,lt+4),he=Qn(Math.atan2(Jt.y-nt.y,Jt.x-nt.x)/He,dt),Ne=Math.abs(he)>55?Math.abs(he)>135?"\uACBD\uB85C\uAC00 \uB4A4\uCABD\uC5D0 \uC788\uC5B4\uC694 \xB7 \uB3CC\uC544\uC11C \uBCF4\uC138\uC694":he>0?"\u2190 \uACBD\uB85C\uAC00 \uC67C\uCABD\uC5D0 \uC788\uC5B4\uC694":"\uACBD\uB85C\uAC00 \uC624\uB978\uCABD\uC5D0 \uC788\uC5B4\uC694 \u2192":"";Ne&&(f.sub.textContent=Ne),f.sub.classList.toggle("hint",!!Ne)}Di&&H-da>300&&(da=H,Di.textContent=[C?`WebXR(VIO) ${z.tracking?"\uCD94\uC801 \uC911":"\uCD94\uC801 \uB04A\uAE40"} \xB7 \uC815\uB82C ${ut.ok?`${ut.n}\uD68C`:"-"} \xB7 \uB192\uC774 ${z.last?z.last.h.toFixed(2):"-"}m \xB7 \uC9C8\uC758 ${Math.round(Mt)}ms`:`\uC13C\uC11C ${Y?"\uCF1C\uC9D0":"\uC5C6\uC74C"} \xB7 \uAC78\uC74C ${$.on?$.n||0:"\uC5C6\uC74C"} \xB7 \uC9C8\uC758 ${Math.round(Mt)}ms`,`\uD654\uAC01 ${y.toFixed(1)}\xB0 ${p?"(\uC8FC\uC18C)":_?`(\uBCF4\uC815 \uD45C\uBCF8 ${_.samples.length})`:""}`,`\uBC29\uD5A5\uAE30\uC900 ${Ht==null?"-":Ht.toFixed(1)} / \uC18C\uC2E4\uC810 ${k.value==null?"-":k.value.toFixed(1)} (${k.n}) / \uC0AC\uC9C4\xB7\uAC78\uC74C ${vt.value==null?"-":vt.value.toFixed(1)} (${vt.n})`,`\uC704\uCE58 ${D.ok?"OK":"--"} ${qe(D.f)} (${D.x.toFixed(1)}, ${D.y.toFixed(1)}) \uC2E0\uB8B0 ${D.conf.toFixed(2)}`].join(`
`)),Bl(dt),Ct.render(pt,ot)}let z={q:new Map,last:null,mx:0,my:0,tracking:!1,eye:1.35,progT:0,fixT:0,nq:0},q=new Ll,ut=new sa,It=new Pl(t.M.FH||4),Wt=null,Gt=null;function te(H,Z){if(g)return;let dt=Math.min(.1,(H-ks)/1e3);ks=H;let lt=Z?.getViewerPose(Ct.xr.getReferenceSpace()),bt=nt.yaw;if(lt){let Tt=lt.views[0],at=ym(Tt.transform.matrix),mt=z.tracking;if(z.tracking=!lt.emulatedPosition,z.last&&z.tracking&&mt){let Rt=at.x-z.last.x,Jt=at.y-z.last.y;Math.hypot(Rt,Jt)<1.5&&!Xt&&(z.mx+=Rt,z.my+=Jt)}if(z.last={...at,yaw:Dl(at.R)},z.tracking&&!Xt){let Rt=It.update(at.h);Rt?(I.postMessage({type:"shiftFloor",d:Rt}),t.floors.includes(D.f+Rt)&&(D.f+=Rt),Ke=!0):Math.abs(at.h-It.floorY-z.eye)<.4&&(z.eye+=(at.h-It.floorY-z.eye)*.01)}if(X&&!j&&!V&&z.tracking&&H-Ni>200&&Tt.camera){let Rt=Gt.grab(Tt.camera);if(Rt){let Jt=vm(Tt.projectionMatrix,Rt.w,Rt.h),he={img:{data:cf(Rt.g,Rt.w,Rt.h,lf(Jt.fx)),w:Rt.w,h:Rt.h},K:Jt,raw:Rt};ht(he,at.R,H);let Ne=Math.asin(at.R[8])/He;if(Ne<-35||Ne>25)fe("weak",Ne<0?"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB354 \uC138\uC6CC \uC8FC\uC138\uC694":"\uD734\uB300\uD3F0\uC744 \uC870\uAE08 \uB0B4\uB824 \uC8FC\uC138\uC694");else{(z.mx||z.my)&&I.postMessage({type:"move",dx:z.mx,dy:z.my}),z.mx=z.my=0;let me=af(he.img,he.K,at.R);j=!0,Ni=H;let xn=Dl(at.R);z.q.set(++et,{x:at.x,y:at.y,yaw:xn,lvl:It.idx,t:H/1e3});let Pn=ut.ok?D.f:We(c,Zt,Vt).f,Hn=++z.nq%4===0?t.floors:[Pn];z.q.size>20&&z.q.delete(z.q.keys().next().value),I.postMessage({type:"query",id:et,q:me,yaw:xn,xr:!0,floors:Hn,floorHint:Q&&Xt?Q.to:We(c,Zt,Vt).f},[me.buffer])}}}if(ut.ok&&!Xt){let Rt=ut.toBuilding(at.x,at.y);D.x=Rt.x,D.y=Rt.y,D.ok=!0,z.tracking&&(D.lastFix=H),bt=Dl(at.R)+ut.off,D.yaw=bt;let Jt=ma(c,Zt,D,Vt);nt.x=Rt.x,nt.y=Rt.y,nt.yaw=bt,nt.init=!0,nt.s=Jt&&Jt.off<3?Jt.s:null,H-z.progT>200&&(z.progT=H,xt());let he=Mm(ut,It.floorY-t.FL(D.f).z);Bt.rotation.set(0,he.rotY,0),Bt.position.set(he.px,he.py,he.pz)}}ut.ok?Bt.visible=!0:Bt.visible=!1,tt(H,dt,bt)}if(C)try{Wt=await xm(Ct,l),Gt=new Il(Ct,220,A.has("xrflip")),l.classList.add("xr"),Wt.addEventListener("end",()=>{g||ce()}),Ct.setAnimationLoop(te)}catch{C=!1,Yt("\uC774 \uAE30\uAE30\uB294 \uAE30\uBCF8 AR \uBC29\uC2DD\uC73C\uB85C \uC548\uB0B4\uD574\uC694");try{await L()}catch(Z){Ce(Z)}requestAnimationFrame(W)}else requestAnimationFrame(W);let jt=Ge("#ar-floors");jt.replaceChildren();for(let H of t.floors){let Z=document.createElement("button");Z.type="button",Z.textContent=qe(H),Z.onclick=()=>{jt.hidden=!0,I.postMessage({type:"floor",f:H}),D.ok=!1,D.f=H,C&&(It.idx=0,q.clear(),ut.off=null),nt.init=!1,fe("searching",`${Ye(H)}\uC5D0\uC11C \uC704\uCE58\uB97C \uCC3E\uB294 \uC911`),Yt(`${Ye(H)}\uB85C \uB9DE\uCDC4\uC5B4\uC694`)},jt.append(Z)}f.status.onclick=()=>{for(let H of jt.children)H.classList.toggle("on",H.textContent===qe(D.f));jt.hidden=!jt.hidden};let qt=m?null:new URLSearchParams(location.search).get("loc"),ie=qt?document.createElement("canvas"):null,xe=!1,De=0;function Re(H){if(!qt||xe||H-De<1500||!Y)return;let Z=h.videoWidth,dt=h.videoHeight;if(!Z)return;xe=!0,De=H;let lt=640/Math.max(Z,dt);ie.width=Math.round(Z*lt),ie.height=Math.round(dt*lt),ie.getContext("2d").drawImage(h,0,0,ie.width,ie.height);let bt=Ul(Y),Tt=Gr(bt)*180/Math.PI,at={R:bt,fovLong:y,prior:D.ok?{f:D.f,x:D.x,y:D.y,yaw:D.yaw}:{f:We(c,Zt,Vt).f}};ie.toBlob(async mt=>{try{let Rt=new FormData;Rt.append("image",mt,"q.jpg"),Rt.append("meta",JSON.stringify(at));let he=await(await fetch(qt,{method:"POST",body:Rt})).json();!g&&he&&he.ok&&I.postMessage({type:"fix",fix:he,yaw:Tt})}catch{}xe=!1},"image/jpeg",.7)}function fe(H,Z){f.status.className=`ar-status ${H}`,f.status.textContent=Z}function Yt(H){let Z=Ge("#toast");Z.textContent=H,Z.hidden=!1,clearTimeout(Yt.h),Yt.h=setTimeout(()=>Z.hidden=!0,2600)}function Ce(H){f.err.hidden=!1,f.coach.hidden=!0;let Z=H.code==="insecure",dt=H.name==="NotAllowedError";f.err.querySelector("b").textContent=Z?"HTTPS\uC5D0\uC11C \uC5F4\uC5B4 \uC8FC\uC138\uC694":dt?"\uCE74\uBA54\uB77C \uAD8C\uD55C\uC774 \uD544\uC694\uD574\uC694":"\uCE74\uBA54\uB77C\uB97C \uCF24 \uC218 \uC5C6\uC5B4\uC694",f.err.querySelector("p").textContent=Z?"\uD734\uB300\uD3F0 \uCE74\uBA54\uB77C\uB294 \uBCF4\uC548 \uC5F0\uACB0(HTTPS)\uC5D0\uC11C\uB9CC \uC4F8 \uC218 \uC788\uC5B4\uC694. \uBC30\uD3EC \uC8FC\uC18C\uB098 npm run dev:phone \uC8FC\uC18C\uB85C \uC5F4\uC5B4 \uC8FC\uC138\uC694.":dt?"\uBE0C\uB77C\uC6B0\uC800 \uC124\uC815\uC5D0\uC11C \uC774 \uC0AC\uC774\uD2B8\uC758 \uCE74\uBA54\uB77C \uC811\uADFC\uC744 \uD5C8\uC6A9\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694. \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C \uBBF8\uB9AC \uCCB4\uD5D8\uD560 \uC218\uB3C4 \uC788\uC5B4\uC694.":`${H.message||H} \uCD2C\uC601 \uC601\uC0C1\uC73C\uB85C AR \uAE38\uC548\uB0B4\uB97C \uCCB4\uD5D8\uD560 \uC218 \uC788\uC5B4\uC694.`}function ce(){g||(g=!0,I.terminate(),Xt?.close(),S?.release?.().catch(()=>{}),document.removeEventListener("visibilitychange",J),Ve.supported&&speechSynthesis.cancel(),removeEventListener("deviceorientation",st),removeEventListener("devicemotion",F),Ct.setAnimationLoop(null),Wt&&Wt.end().catch(()=>{}),Gt?.dispose(),l.classList.remove("xr"),removeEventListener("resize",Li),x?.getTracks().forEach(H=>H.stop()),h.pause(),h.removeAttribute("src"),h.srcObject=null,h.load(),Ct.dispose(),Di?.remove(),Xe?.geometry.dispose(),l.hidden=!0,o?.())}Ge("#ar-close").onclick=ce,Ge("#ar-error-close").onclick=ce,Ge("#ar-arrive-close").onclick=ce;let cn=Ge("#ar-again");return cn.hidden=!m,cn.onclick=()=>{f.arrive.hidden=!0,pe=!1,c=i.route,Zt=Ui(c),Dt=i.steps||Gs(c,e,{landmarks:t.destinations}),Vt=0,Ot=-1,Ke=!0,D.ok=!1,nt.init=!1,yt.clear(),E.clear(),I.postMessage({type:"reset"}),h.currentTime=0,h.play().catch(()=>{})},h.onended=()=>{!m||g||(pe||(f.arrive.querySelector("b").textContent="\uB370\uBAA8 \uC601\uC0C1\uC774 \uB05D\uB0AC\uC5B4\uC694"),f.arrive.hidden=!1)},Ge("#ar-demo").onclick=()=>{ce(),i.onDemo?.()},{close:ce}}var Us="assets/",zt=i=>document.querySelector(i),Os=i=>[...document.querySelectorAll(i)],$r=new URLSearchParams(location.search),bm={start:"\u2191",straight:"\u2191",left:"\u2190",right:"\u2192","slight-left":"\u2196","slight-right":"\u2197","u-left":"\u21B6","u-right":"\u21B7","stair-up":"\u21E1","stair-down":"\u21E3",elev:"\u21C5",arrive:"\u2726"},Pt={start:null,dest:null,mode:"stairs",route:null,steps:null,sheet:"home"},nn,_e,Fs,aa=null;function ca(i,t=2600){let e=zt("#toast");e.textContent=i,e.hidden=!1,clearTimeout(ca.h),ca.h=setTimeout(()=>e.hidden=!0,t)}function Ue(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}async function wM(){let i=zt("#load-bar"),[t,e]=await Promise.all([fetch(Us+"mirae.json").then(c=>{if(!c.ok)throw new Error(`\uCE35 \uB370\uC774\uD130 ${c.status}`);return c.json()}),fetch(Us+"entrances.json").then(c=>c.json())]);i.style.width="15%",nn=wf(t),Fs=e.entrances,_e=hm(zt("#view"),nn,{onPick:RM}),AM(),await _e.load(Us+"mirae.glb",c=>i.style.width=`${15+c*85}%`),zt("#loading").classList.add("done"),setTimeout(()=>zt("#loading").hidden=!0,450);let n=$r.get("from"),s=Fs.find(c=>c.id===n||c.campusNode===n),r=!s&&n&&nn.findDest(n);Zr(r?Fl(r):_f(s||Fs[0])),s&&n===s.campusNode&&(zt("#home-from").textContent=`\uCEA0\uD37C\uC2A4 \uACBD\uB85C\uAC00 ${s.name}\uB85C \uC774\uC5B4\uC84C\uC5B4\uC694. \uAC00\uB824\uB294 \uD638\uC2E4\uC744 \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694.`),$r.get("mode")==="elevator"&&Sf("elevator",!1),_e.setFloor(Pt.start.f,!0),ji();let o=$r.get("to"),a=o&&(nn.findDest(o)||nn.search(o)[0]);a&&(Pt.dest=a,Ji()),$r.has("demo")&&bf(),Pm()}function _f(i){return{kind:"entrance",id:i.id,name:i.name,f:i.f,x:i.p[0],y:i.p[1]}}function Fl(i){let t=i.doors[0],e=nn.nearest(i.f,t[0],t[1],6)||t;return{kind:"place",id:i.key,name:`${i.title}${i.name?" "+i.name:""}`,f:i.f,x:e[0],y:e[1]}}function Zr(i){Pt.start=i,_e.setMe({x:i.x,y:i.y,f:i.f})}function AM(){let i=zt("#floors");i.replaceChildren();for(let t of[...nn.floors].sort((e,n)=>n-e)){let e=Ue("button","",qe(t));e.type="button",e.dataset.f=t,e.setAttribute("aria-label",Ye(t)),e.onclick=()=>xf(t),i.append(e)}}function xf(i){if(i===_e.floor)return;let t=i>_e.floor;_e.setFloor(i,!1,!0),_e.setMe(Pt.start),ji();let e=zt("#floor-badge");e.textContent=`${t?"\u25B2":"\u25BC"} ${qe(i)}`,e.classList.remove("show"),e.offsetWidth,e.classList.add("show")}function ji(){let i=new Set(Pt.route?Pt.route.pts.map(t=>t.f):[]);for(let t of Os("#floors button"))t.classList.toggle("on",+t.dataset.f===_e.floor),t.classList.toggle("has-route",i.has(+t.dataset.f))}zt("#recenter").onclick=()=>{Pt.route?Am():_e.frame()};function RM(i,t,e){let n=nn.roomAt(e,i,t),s=n&&nn.destinations.find(r=>r.f===e&&r.id===n.id);if(!s){let r=null;for(let o of nn.destinations)if(o.f===e)for(let a of o.doors){let c=Math.hypot(a[0]-i,a[1]-t);c<2.2&&(!r||c<r[0])&&(r=[c,o])}s=r&&r[1]}s&&Em(s)}function la(i){Pt.sheet=i;for(let t of["home","place","route"])zt(`#sheet-${t}`).hidden=t!==i;zt("#sheet").classList.remove("collapsed"),zt("#sheet").classList.toggle("route-mode",i==="route")}zt("#sheet-handle").onclick=()=>zt("#sheet").classList.toggle("collapsed");function Em(i){Pt.pending=i,_e.select(i),zt("#place-floor").textContent=qe(i.f),zt("#place-title").textContent=i.title,zt("#place-sub").textContent=[i.name,i.catLabel&&i.catLabel!==i.name?i.catLabel:"",Ye(i.f)].filter(Boolean).join(" \xB7 "),la("place");let t=i.center||i.doors[0];i.f!==_e.floor&&xf(i.f),_e.focus(t[0],t[1],i.f,48),ji()}zt("#place-close").onclick=()=>{_e.select(null),la(Pt.route?"route":"home")};zt("#place-route").onclick=()=>{Pt.dest=Pt.pending,Tm(Pt.dest),Ji()};zt("#place-from").onclick=()=>{Zr(Fl(Pt.pending)),ca(`${Pt.pending.title}\uC5D0\uC11C \uCD9C\uBC1C\uD574\uC694. \uC774\uC81C \uB3C4\uCC29\uC9C0\uB97C \uAC80\uC0C9\uD574 \uC8FC\uC138\uC694.`),Pt.dest&&Pt.dest.key!==Pt.pending.key?Ji():(_e.select(null),la("home"),ha())};var gf="sai-indoor-recent";function CM(){try{return JSON.parse(localStorage.getItem(gf)||"[]").map(i=>nn.findDest(i)).filter(Boolean)}catch{return[]}}function Tm(i){try{let t=[i.key,...JSON.parse(localStorage.getItem(gf)||"[]").filter(e=>e!==i.key)].slice(0,6);localStorage.setItem(gf,JSON.stringify(t))}catch{}}function ha(i="dest"){Pt.searchMode=i,zt("#search").hidden=!1,zt("#search-input").value="",zt("#search-input").placeholder=i==="origin"?"\uC5B4\uB514\uC5D0\uC11C \uCD9C\uBC1C\uD558\uB098\uC694? (\uD638\uC2E4\xB7\uC774\uB984)":"313, \uB124\uD2B8\uC6CC\uD06C, \uD654\uC7A5\uC2E4, \uAD50\uC218 \uC774\uB984",vf(""),setTimeout(()=>zt("#search-input").focus(),50)}function yf(){zt("#search").hidden=!0,zt("#search-input").blur()}zt("#search-open").onclick=()=>ha();zt("#search-close").onclick=yf;zt("#search-input").addEventListener("input",i=>vf(i.target.value));zt("#search-input").addEventListener("keydown",i=>{i.key==="Enter"?zt("#search-results li[data-key]")?.click():i.key==="Escape"&&yf()});function mf(i){let t=Ue("li");t.dataset.key=i.key;let e=Ue("span","floor-tag"+(i.f===0?" b1":""),qe(i.f)),n=Ue("div");return n.append(Ue("b","",i.title),Ue("small","",[i.name,i.numbered?i.catLabel:Ye(i.f)].filter(Boolean).join(" \xB7 "))),t.append(e,n),t.onclick=()=>{yf(),Tm(i),Pt.searchMode==="origin"?(Zr(Fl(i)),Mf(),Pt.dest&&Ji()):Em(i)},t}function vf(i){let t=zt("#search-results");if(t.replaceChildren(),i.trim()){let s=nn.search(i,40);zt("#search-hint").textContent=s.length?`${s.length}\uACF3`:"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694. \uD638\uC2E4 \uBC88\uD638\uB098 \uC774\uB984 \uC77C\uBD80\uB85C \uCC3E\uC544\uBCF4\uC138\uC694.";for(let r of s)t.append(mf(r));return}zt("#search-hint").textContent="\uBC88\uD638\uB098 \uC2E4 \uC774\uB984, \uAD50\uC218 \uC774\uB984\uC73C\uB85C \uCC3E\uC744 \uC218 \uC788\uC5B4\uC694";let e=CM();if(e.length){t.append(Ue("li","group","\uCD5C\uADFC \uCC3E\uC740 \uACF3"));for(let s of e)t.append(mf(s))}let n=null;for(let s of nn.destinations.filter(r=>r.numbered))s.f!==n&&(t.append(Ue("li","group",Ye(s.f))),n=s.f),t.append(mf(s))}for(let i of Os("#quick-chips button"))i.onclick=()=>{ha(),zt("#search-input").value=i.dataset.q,vf(i.dataset.q)};function Mf(){let i=zt("#route-from");i.replaceChildren();for(let t of Fs)i.append(new Option(t.name,`e:${t.id}`));Pt.start.kind==="place"&&i.append(new Option(Pt.start.name,`p:${Pt.start.id}`)),i.append(new Option("\uB2E4\uB978 \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\u2026","pick")),i.value=Pt.start.kind==="entrance"?`e:${Pt.start.id}`:`p:${Pt.start.id}`}zt("#route-from").onchange=i=>{let t=i.target.value;if(t==="pick"){Mf(),ha("origin");return}t.startsWith("e:")&&Zr(_f(Fs.find(e=>`e:${e.id}`===t))),Ji()};zt("#route-to").onclick=()=>ha();zt("#route-swap").onclick=()=>{if(!Pt.dest)return;let i=Pt.start.kind==="place"?nn.findDest(Pt.start.id):null;if(!i){ca("\uCD9C\uC785\uAD6C\uB294 \uB3C4\uCC29\uC9C0\uB85C \uACE0\uB97C \uC218 \uC5C6\uC5B4\uC694. \uD638\uC2E4\uC5D0\uC11C \uCD9C\uBC1C\uD558\uBA74 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.");return}Zr(Fl(Pt.dest)),Pt.dest=i,Ji()};zt("#route-close").onclick=()=>{Pt.route=null,Pt.dest=null,_e.clearRoute(),_e.select(null),la("home"),ji(),history.replaceState(null,"",location.pathname+($r.get("from")?`?from=${$r.get("from")}`:""))};function Sf(i,t=!0){Pt.mode=i;for(let e of Os(".seg button"))e.classList.toggle("on",e.dataset.mode===i),e.setAttribute("aria-checked",e.dataset.mode===i);t&&Ji()}for(let i of Os(".seg button"))i.onclick=()=>Sf(i.dataset.mode);function wm(){let i=new URLSearchParams;i.set("from",Pt.start.id),i.set("to",Pt.dest.key),Pt.mode==="elevator"&&i.set("mode","elevator");let t=new URLSearchParams(location.search);for(let e of["debug","fov","loc"])t.has(e)&&i.set(e,t.get(e));return`${location.pathname}?${i}`}zt("#route-share").onclick=async()=>{let i=new URL(wm(),location.href).href,t=`\uBBF8\uB798\uAD00 ${Pt.dest.title}\uAE4C\uC9C0 \uAE38\uC548\uB0B4`;try{navigator.share?await navigator.share({title:t,url:i}):(await navigator.clipboard.writeText(i),ca("\uACBD\uB85C \uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD588\uC5B4\uC694"))}catch{}};function Ji(){let i=Pt.dest;if(!i)return;let t=nn.routeTo(Pt.start,i,{mode:Pt.mode});Mf(),zt("#route-to").textContent=`${i.title}${i.name?" "+i.name:""}`,la("route");let e=zt("#route-summary");if(e.replaceChildren(),zt("#route-steps").replaceChildren(),!t){Pt.route=null,_e.clearRoute(),e.append(Ue("span","warn","\uACBD\uB85C\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.")),zt("#ar-open").disabled=zt("#walk-open").disabled=!0,ji();return}zt("#ar-open").disabled=zt("#walk-open").disabled=!1,Pt.route=t,Pt.steps=Gs(t,i,{landmarks:nn.destinations}),history.replaceState(null,"",wm()),e.append(Ue("b","",`${Math.round(t.len)}m`),Ue("span","",`\uC57D ${ga(t.len)}`));for(let r of Pt.steps)(r.kind==="stair"||r.kind==="elev")&&e.append(Ue("span","chip "+r.kind,`${r.kind==="elev"?"\uC5D8\uB9AC\uBCA0\uC774\uD130":"\uACC4\uB2E8"} ${qe(r.f)}\u2192${qe(r.to)}`));let n=Pt.steps.filter(r=>r.kind==="stair").map(r=>`${qe(r.f)}\u2192${qe(r.to)}`).join(", "),s=[];t.preferElev&&s.push("3\uAC1C \uCE35 \uC774\uC0C1\uC774\uB77C \uC5D8\uB9AC\uBCA0\uC774\uD130\uB85C \uC548\uB0B4\uD574\uC694"),(Pt.mode==="elevator"||t.preferElev)&&t.stairFloors&&s.push(`\uC5D8\uB9AC\uBCA0\uC774\uD130\uAC00 \uB2FF\uC9C0 \uC54A\uB294 ${n} \uAD6C\uAC04\uB9CC \uACC4\uB2E8\uC744 \uC774\uC6A9\uD574\uC694`),s.length&&e.append(Ue("span","note",s.join(" \xB7 "))),LM(),zt("#sheet").scrollTop=0,_e.showRoute(t,i,Pt.steps),_e.floor!==t.pts[0].f&&_e.setFloor(t.pts[0].f),_e.setMe(Pt.start),Am(),ji()}function IM(){return innerWidth>=820?0:zt("#sheet").classList.contains("collapsed")?64:zt("#sheet").offsetHeight}function Am(){let i=Pt.route.pts.filter(o=>o.f===_e.floor),t=i.length?i:Pt.route.pts,e=1/0,n=-1/0,s=1/0,r=-1/0;for(let o of t)e=Math.min(e,o.x),n=Math.max(n,o.x),s=Math.min(s,o.y),r=Math.max(r,o.y);_e.fit(e,s,n,r,t[0].f,IM())}async function Rm(){return aa||(aa=await fetch(Us+"sv.json").then(i=>i.json())),aa}function Cm(i,t,e,n,s=3.5,r=45){if(!aa)return null;let o=null;for(let a of aa.shots){if(a.f!==e)continue;let c=Math.hypot(a.x-i,a.y-t);if(c>s)continue;let l=n==null?0:Math.abs(((a.yaw-n)%360+540)%360-180);if(l>r)continue;let h=c+l*.05;(!o||h<o[0])&&(o=[h,a])}return o&&o[1]}var Im=i=>`${Us}sv/${String(i.id).padStart(5,"0")}.jpg`;function PM(i){let t=Pt.route,e=Ui(t),n=We(t,e,i.s+.3),s=We(t,e,i.s+3);return Math.hypot(s.x-n.x,s.y-n.y)>.5?Math.atan2(s.y-n.y,s.x-n.x)*180/Math.PI:null}async function LM(){let i=zt("#route-steps");i.replaceChildren();let t=Pt.steps;await Rm().catch(()=>null),Pt.steps===t&&t.forEach((e,n)=>{let s=Ue("li",e.kind==="stair"||e.kind==="elev"?"vertical":e.kind==="arrive"?"goal":"");s.dataset.i=n;let r=Ue("span","ico",bm[e.dir]||"\u2022");n&&e.kind!=="arrive"&&r.append(Ue("i","num",String(n)));let o=Ue("div","txt");o.append(Ue("b","",e.text));let a=[Ye(e.f)];if(e.kind==="start"&&a.push(Pt.start.name),e.sub&&e.kind!=="start"&&a.push(e.sub),o.append(Ue("small","",a.join(" \xB7 "))),s.append(r,o),e.kind!=="arrive"&&e.kind!=="elev"){let c=Cm(e.at[0],e.at[1],e.f,PM(e));if(c){let l=Ue("img");l.loading="lazy",l.alt="\uC774 \uC9C0\uC810\uC758 \uC2E4\uC81C \uBAA8\uC2B5",l.src=Im(c),s.append(l)}}s.onclick=()=>DM(n),i.append(s)})}function DM(i){let t=Pt.steps[i];for(let e of Os("#route-steps li"))e.classList.toggle("on",+e.dataset.i===i);_e.highlightStep(i),t.f!==_e.floor&&xf(t.f),_e.focus(t.at[0],t.at[1],t.f,32),ji(),innerWidth<820&&zt("#sheet").classList.add("collapsed")}function Pm(){for(let i of Os(".voice-btn"))i.hidden=!Ve.supported,i.classList.toggle("on",Ve.on),i.setAttribute("aria-pressed",Ve.on),i.textContent=Ve.on?"\u{1F50A}":"\u{1F508}",i.title=Ve.on?"\uC74C\uC131 \uC548\uB0B4 \uB044\uAE30":"\uC74C\uC131 \uC548\uB0B4 \uCF1C\uAE30"}for(let i of Os(".voice-btn"))i.onclick=()=>{Ve.on=!Ve.on,Pm(),Ve.on&&Ve.say("\uC74C\uC131 \uC548\uB0B4\uB97C \uCF30\uC5B4\uC694")};var Me=null;zt("#walk-open").onclick=async()=>{if(!Pt.route)return;await Rm().catch(()=>null);let i=Pt.route,t=Ui(i);Me={s:0,cum:t,total:t[t.length-1],yaw:null,last:performance.now(),shot:null,playing:!0,speed:1,step:-1,lift:null,liftDone:new Set},zt("#walk").hidden=!1;for(let e of["#sheet",".topbar","#floors",".map-tools"])zt(e).hidden=!0;_e.setFirstPerson(!0),Ol(),requestAnimationFrame(Dm)};function NM(){Me?.lift?.close(),Me=null,Ve.supported&&speechSynthesis.cancel(),zt("#walk").hidden=!0;for(let i of["#sheet",".topbar","#floors",".map-tools"])zt(i).hidden=!1;if(_e.setFirstPerson(!1),Pt.route){let i=Pt.route.pts[Pt.route.pts.length-1].f;i!==_e.floor&&_e.setFloor(i)}ji()}function Ol(){Me&&(zt("#walk-play").textContent=Me.playing?"\u275A\u275A":"\u25B6",zt("#walk-play").setAttribute("aria-label",Me.playing?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD"),zt("#walk-speed").textContent=`${Me.speed}\xD7`)}zt("#walk-close").onclick=NM;zt("#walk-play").onclick=()=>{Me&&(Me.s>=Me.total-.05&&(Me.s=0,Me.liftDone.clear(),Me.yaw=null),Me.playing=!Me.playing,Ol())};zt("#walk-speed").onclick=()=>{Me&&(Me.speed=Me.speed===1?2:Me.speed===2?4:1,Ol())};function Lm(i){if(!Me||Me.lift)return;let t=Math.max(0,Math.min(Pt.steps.length-1,Gl(Pt.steps,Me.s)+i));Me.s=Math.min(Me.total,Pt.steps[t].s+.01);for(let e of Pt.steps)e.kind==="elev"&&e.s<Me.s&&Me.liftDone.add(e.s);Me.yaw=null}zt("#walk-prev").onclick=()=>Lm(-1);zt("#walk-next").onclick=()=>Lm(1);function Dm(i){if(!Me)return;let t=Me,e=Pt.route,n=Pt.steps,s=Math.min(.05,(i-t.last)/1e3);if(t.last=i,t.playing&&!t.lift){let p=We(e,t.cum,t.s),b=e.pts[p.i]?.kind==="stair",y=Math.min(t.total,t.s+s*t.speed*(b?1.3:2.4)),_=n.find(A=>A.kind==="elev"&&A.s>=t.s-1e-6&&A.s<=y&&!t.liftDone.has(A.s));_&&(y=_.s,t.liftDone.add(_.s),Ve.say(_.text),t.lift=Cl({from:_.f,to:_.to,title:`${qe(_.to)}\uB85C \uC774\uB3D9 \uC911`,hint:_.sub}),t.lift.finished.then(()=>{Me===t&&(t.lift=null,t.s=_.s+.02,t.yaw=null)})),t.s=y}let r=We(e,t.cum,t.s),o=We(e,t.cum,Math.min(t.total,t.s+2.2)),a=e.target?.door,c=a&&t.total-t.s<1.2?Math.atan2(a[1]-r.y,a[0]-r.x)*180/Math.PI:Math.hypot(o.x-r.x,o.y-r.y)>.3?Math.atan2(o.y-r.y,o.x-r.x)*180/Math.PI:t.yaw??90;t.yaw==null&&(t.yaw=c);let l=((c-t.yaw)%360+540)%360-180;t.yaw+=l*Math.min(1,s*3.2),_e.setWalkPose({x:r.x,y:r.y,z:r.z,f:r.f,yaw:t.yaw,pitch:-.1}),zt("#walk-bar").style.width=`${t.s/t.total*100}%`;let h=Jr(n,e,t.cum,t.s),u=Gl(n,t.s);u!==t.step&&(t.step=u,u>0&&n[u].kind!=="elev"&&Ve.say(n[u].text));let f=t.s>=t.total-.05,d=zt("#walk-step");d.replaceChildren();let g=Ue("div");g.append(Ue("b","",f?`${Pt.dest.title} \uB3C4\uCC29`:h.dist<3?`\uC9C0\uAE08 ${h.step.action}`:`${Math.round(h.dist)}m \uC55E ${h.step.kind==="arrive"?Pt.dest.title:h.step.action}`),Ue("small","",`${Ye(r.f)} \xB7 ${n[u].text}`)),d.append(Ue("div","hud-arrow",bm[f?"arrive":h.step.dir]||"\u2191"),g);let x=Cm(r.x,r.y,r.f,t.yaw,3,40),m=zt("#walk-photo");x&&!t.lift?(t.shot!==x.id&&(t.shot=x.id,m.querySelector("img").src=Im(x)),m.hidden=!1):m.hidden=!0,f&&t.playing&&(t.playing=!1,Ol(),Ve.say(`${Pt.dest.title}\uC5D0 \uB3C4\uCC29\uD588\uC5B4\uC694`)),requestAnimationFrame(Dm)}function Nm(i){Pt.route&&Sm({indoor:nn,route:Pt.route,steps:Pt.steps,dest:Pt.dest,mode:Pt.mode,demo:i,assets:Us,onDemo:bf,onRoute:(t,e)=>{Pt.route=t,Pt.steps=e,_e.showRoute(t,Pt.dest,e)}})}zt("#ar-open").onclick=()=>Nm(!1);zt("#demo-open").onclick=bf;async function bf(){let i=await fetch(Us+"demo.json").then(e=>e.json()),t=Fs.find(e=>e.id===i.from)||Fs[0];Zr(_f(t)),Pt.dest=nn.findDest(i.to),Sf("stairs",!1),Ji(),Nm(!0)}wM().catch(i=>{console.error(i);let t=zt("#loading");t.querySelector("b").textContent=`\uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694: ${i.message||i}`;let e=Ue("button","primary-btn","\uB2E4\uC2DC \uC2DC\uB3C4");e.onclick=()=>location.reload(),t.append(e)});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
