var w=Object.create;var{defineProperty:z,getPrototypeOf:b,getOwnPropertyNames:k}=Object;var u=Object.prototype.hasOwnProperty;var f=(q,V,$)=>{$=q!=null?w(b(q)):{};const J=V||!q||!q.__esModule?z($,"default",{value:q,enumerable:!0}):$;for(let X of k(q))if(!u.call(J,X))z(J,X,{get:()=>q[X],enumerable:!0});return J};var d=(q,V)=>()=>(V||q((V={exports:{}}).exports,V),V.exports);var B=d((o,h)=>{var t=function(q){if(q.length>=255)throw new TypeError("Alphabet too long");var V=new Uint8Array(256);for(var $=0;$<V.length;$++)V[$]=255;for(var J=0;J<q.length;J++){var X=q.charAt(J),M=X.charCodeAt(0);if(V[M]!==255)throw new TypeError(X+" is ambiguous");V[M]=J}var O=q.length,P=q.charAt(0),E=Math.log(O)/Math.log(256),l=Math.log(256)/Math.log(O);function A(K){if(K instanceof Uint8Array);else if(ArrayBuffer.isView(K))K=new Uint8Array(K.buffer,K.byteOffset,K.byteLength);else if(Array.isArray(K))K=Uint8Array.from(K);if(!(K instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(K.length===0)return"";var Q=0,U=0,Y=0,D=K.length;while(Y!==D&&K[Y]===0)Y++,Q++;var F=(D-Y)*l+1>>>0,W=new Uint8Array(F);while(Y!==D){var G=K[Y],C=0;for(var Z=F-1;(G!==0||C<U)&&Z!==-1;Z--,C++)G+=256*W[Z]>>>0,W[Z]=G%O>>>0,G=G/O>>>0;if(G!==0)throw new Error("Non-zero carry");U=C,Y++}var N=F-U;while(N!==F&&W[N]===0)N++;var R=P.repeat(Q);for(;N<F;++N)R+=q.charAt(W[N]);return R}function p(K){if(typeof K!=="string")throw new TypeError("Expected String");if(K.length===0)return new Uint8Array;var Q=0,U=0,Y=0;while(K[Q]===P)U++,Q++;var D=(K.length-Q)*E+1>>>0,F=new Uint8Array(D);while(K[Q]){var W=V[K.charCodeAt(Q)];if(W===255)return;var G=0;for(var C=D-1;(W!==0||G<Y)&&C!==-1;C--,G++)W+=O*F[C]>>>0,F[C]=W%256>>>0,W=W/256>>>0;if(W!==0)throw new Error("Non-zero carry");Y=G,Q++}var Z=D-Y;while(Z!==D&&F[Z]===0)Z++;var N=new Uint8Array(U+(D-Z)),R=U;while(Z!==D)N[R++]=F[Z++];return N}function y(K){var Q=p(K);if(Q)return Q;throw new Error("Non-base"+O+" character")}return{encode:A,decodeUnsafe:p,decode:y}};h.exports=t});class I extends Error{}class j extends I{constructor(){super("Cannot create snowflake due to increment overflow.")}}function S(q){let V="";for(let $ of new Uint8Array(q)){if($<16)V+="0";V+=$.toString(16)}return V}function T(q){const V=new Uint8Array(q.length/2);for(let $=0,J=0;$<q.length;$+=2,J++)V[J]=Number.parseInt(q.slice($,$+2),16);return V.buffer}async function g(q){return new Promise((V)=>{setTimeout(V,q)})}var x=f(B(),1),L=x.default("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");var m=1640995200000,H=1024;class v{#q;#Q;#V;#$;#J=0;#K=0;#W;#X;constructor({bit_count:{server_id:q=7,worker_id:V=5}={},server_id:$=0,worker_id:J=0}={}){if(this.#q=2**q-1,this.#Q=V,this.#V=2**V-1,$<0||$>this.#q||!Number.isInteger($))throw new I(`Invalid server_id: ${$} (possible values: from 0 to ${this.#q} inclusive)`);if(J<0||J>this.#V||!Number.isInteger(J))throw new I(`Invalid worker_id: ${J} (possible values: from 0 to ${this.#V} inclusive)`);this.#$=q+V,this.#W=2**(22-this.#$)-1,this.#X=$<<V|J}create(q){const V=Date.now()-m;if(V<this.#K)throw new I(`Cannot create snowflake: Date.now() has returned (probably) invalid value ${V}, but previously we got ${this.#K}, is code running on time machine?`);if(V>this.#K)this.#J=0,this.#K=V;else if(this.#J>this.#W)throw new j;const $=new ArrayBuffer(8),J=new DataView($);switch(J.setUint32(0,Math.floor(V/H)),J.setUint32(4,V%H<<22|this.#J<<this.#$|this.#X),this.#J++,q){case null:case void 0:return $;case"buffer":return Buffer.from($);case"bigint":return J.getBigUint64(0);case"decimal":case 10:return String(J.getBigUint64(0));case"hex":case 16:return S($);case"62":case 62:return L.encode(new Uint8Array($));default:throw new Error(`Unknown encoding: ${q}`)}}async createSafe(q){while(!0)try{return this.create(q)}catch(V){if(V instanceof j)await g()}}parse(q,V){let $;if(q instanceof ArrayBuffer)$=q;else if(Buffer.isBuffer(q))$=q.buffer;else if(typeof q==="bigint")$=new ArrayBuffer(8),new DataView($).setBigUint64(0,q);else if(typeof q==="string")switch(V){case"decimal":case 10:$=new ArrayBuffer(8),new DataView($).setBigUint64(0,BigInt(q));break;case"hex":$=T(q);break;case"62":case 62:$=L.decode(q).buffer;break}if($===void 0)throw new I(`Unknown encoding: ${V}`);const J=new DataView($),X=J.getUint32(4);return{timestamp:J.getUint32(0)*H+(X>>>22)+m,increment:X<<10>>>10>>>this.#$,server_id:X>>>this.#Q&this.#q,worker_id:X&this.#V}}}export{j as SnowflakeIncrementOverflowError,v as SnowflakeFactory,I as SnowflakeError};
