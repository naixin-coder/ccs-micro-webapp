"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[383],{42383:function(Be,le,w){w.d(le,{Z:function(){return Me}});var se=w(80955),ce=w(52390),X=w(91664),H=w(50959),fe=w(36304),pe=w(18621),de=w(53801),ve=w(52914),he=w(28062),ye=w(5507),me=w(17592),be=w(45389),ge=w(11532),x=w(11527);function k(e){return k=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(e)}var Oe=["value","onChange","dependencies","placeholder","options","request","debounceTime","all","disabled","allValue","allLabel","selectProps","outLoading","requestOptions","name"];function R(e){return Pe(e)||Se(e)||ie(e)||we()}function we(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Se(e){if(typeof Symbol!="undefined"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Pe(e){if(Array.isArray(e))return _(e)}function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(c){return Object.getOwnPropertyDescriptor(e,c).enumerable})),n.push.apply(n,a)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?te(Object(n),!0).forEach(function(a){je(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function je(e,t,n){return t=Le(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Le(e){var t=Ee(e,"string");return k(t)==="symbol"?t:String(t)}function Ee(e,t){if(k(e)!=="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t||"default");if(k(a)!=="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function U(){"use strict";U=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,a=Object.defineProperty||function(i,r,o){i[r]=o.value},c=typeof Symbol=="function"?Symbol:{},f=c.iterator||"@@iterator",m=c.asyncIterator||"@@asyncIterator",h=c.toStringTag||"@@toStringTag";function p(i,r,o){return Object.defineProperty(i,r,{value:o,enumerable:!0,configurable:!0,writable:!0}),i[r]}try{p({},"")}catch(i){p=function(o,u,s){return o[u]=s}}function E(i,r,o,u){var s=r&&r.prototype instanceof G?r:G,l=Object.create(s.prototype),d=new B(u||[]);return a(l,"_invoke",{value:S(i,o,d)}),l}function Z(i,r,o){try{return{type:"normal",arg:i.call(r,o)}}catch(u){return{type:"throw",arg:u}}}e.wrap=E;var b={};function G(){}function g(){}function I(){}var D={};p(D,f,function(){return this});var q=Object.getPrototypeOf,C=q&&q(q($([])));C&&C!==t&&n.call(C,f)&&(D=C);var T=I.prototype=G.prototype=Object.create(D);function P(i){["next","throw","return"].forEach(function(r){p(i,r,function(o){return this._invoke(r,o)})})}function j(i,r){function o(s,l,d,v){var O=Z(i[s],i,l);if(O.type!=="throw"){var W=O.arg,A=W.value;return A&&k(A)=="object"&&n.call(A,"__await")?r.resolve(A.__await).then(function(F){o("next",F,d,v)},function(F){o("throw",F,d,v)}):r.resolve(A).then(function(F){W.value=F,d(W)},function(F){return o("throw",F,d,v)})}v(O.arg)}var u;a(this,"_invoke",{value:function(l,d){function v(){return new r(function(O,W){o(l,d,O,W)})}return u=u?u.then(v,v):v()}})}function S(i,r,o){var u="suspendedStart";return function(s,l){if(u==="executing")throw new Error("Generator is already running");if(u==="completed"){if(s==="throw")throw l;return V()}for(o.method=s,o.arg=l;;){var d=o.delegate;if(d){var v=M(d,o);if(v){if(v===b)continue;return v}}if(o.method==="next")o.sent=o._sent=o.arg;else if(o.method==="throw"){if(u==="suspendedStart")throw u="completed",o.arg;o.dispatchException(o.arg)}else o.method==="return"&&o.abrupt("return",o.arg);u="executing";var O=Z(i,r,o);if(O.type==="normal"){if(u=o.done?"completed":"suspendedYield",O.arg===b)continue;return{value:O.arg,done:o.done}}O.type==="throw"&&(u="completed",o.method="throw",o.arg=O.arg)}}}function M(i,r){var o=r.method,u=i.iterator[o];if(u===void 0)return r.delegate=null,o==="throw"&&i.iterator.return&&(r.method="return",r.arg=void 0,M(i,r),r.method==="throw")||o!=="return"&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+o+"' method")),b;var s=Z(u,i.iterator,r.arg);if(s.type==="throw")return r.method="throw",r.arg=s.arg,r.delegate=null,b;var l=s.arg;return l?l.done?(r[i.resultName]=l.value,r.next=i.nextLoc,r.method!=="return"&&(r.method="next",r.arg=void 0),r.delegate=null,b):l:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,b)}function J(i){var r={tryLoc:i[0]};1 in i&&(r.catchLoc=i[1]),2 in i&&(r.finallyLoc=i[2],r.afterLoc=i[3]),this.tryEntries.push(r)}function K(i){var r=i.completion||{};r.type="normal",delete r.arg,i.completion=r}function B(i){this.tryEntries=[{tryLoc:"root"}],i.forEach(J,this),this.reset(!0)}function $(i){if(i){var r=i[f];if(r)return r.call(i);if(typeof i.next=="function")return i;if(!isNaN(i.length)){var o=-1,u=function s(){for(;++o<i.length;)if(n.call(i,o))return s.value=i[o],s.done=!1,s;return s.value=void 0,s.done=!0,s};return u.next=u}}return{next:V}}function V(){return{value:void 0,done:!0}}return g.prototype=I,a(T,"constructor",{value:I,configurable:!0}),a(I,"constructor",{value:g,configurable:!0}),g.displayName=p(I,h,"GeneratorFunction"),e.isGeneratorFunction=function(i){var r=typeof i=="function"&&i.constructor;return!!r&&(r===g||(r.displayName||r.name)==="GeneratorFunction")},e.mark=function(i){return Object.setPrototypeOf?Object.setPrototypeOf(i,I):(i.__proto__=I,p(i,h,"GeneratorFunction")),i.prototype=Object.create(T),i},e.awrap=function(i){return{__await:i}},P(j.prototype),p(j.prototype,m,function(){return this}),e.AsyncIterator=j,e.async=function(i,r,o,u,s){s===void 0&&(s=Promise);var l=new j(E(i,r,o,u),s);return e.isGeneratorFunction(r)?l:l.next().then(function(d){return d.done?d.value:l.next()})},P(T),p(T,h,"Generator"),p(T,f,function(){return this}),p(T,"toString",function(){return"[object Generator]"}),e.keys=function(i){var r=Object(i),o=[];for(var u in r)o.push(u);return o.reverse(),function s(){for(;o.length;){var l=o.pop();if(l in r)return s.value=l,s.done=!1,s}return s.done=!0,s}},e.values=$,B.prototype={constructor:B,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(K),!r)for(var o in this)o.charAt(0)==="t"&&n.call(this,o)&&!isNaN(+o.slice(1))&&(this[o]=void 0)},stop:function(){this.done=!0;var r=this.tryEntries[0].completion;if(r.type==="throw")throw r.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var o=this;function u(W,A){return d.type="throw",d.arg=r,o.next=W,A&&(o.method="next",o.arg=void 0),!!A}for(var s=this.tryEntries.length-1;s>=0;--s){var l=this.tryEntries[s],d=l.completion;if(l.tryLoc==="root")return u("end");if(l.tryLoc<=this.prev){var v=n.call(l,"catchLoc"),O=n.call(l,"finallyLoc");if(v&&O){if(this.prev<l.catchLoc)return u(l.catchLoc,!0);if(this.prev<l.finallyLoc)return u(l.finallyLoc)}else if(v){if(this.prev<l.catchLoc)return u(l.catchLoc,!0)}else{if(!O)throw new Error("try statement without catch or finally");if(this.prev<l.finallyLoc)return u(l.finallyLoc)}}}},abrupt:function(r,o){for(var u=this.tryEntries.length-1;u>=0;--u){var s=this.tryEntries[u];if(s.tryLoc<=this.prev&&n.call(s,"finallyLoc")&&this.prev<s.finallyLoc){var l=s;break}}l&&(r==="break"||r==="continue")&&l.tryLoc<=o&&o<=l.finallyLoc&&(l=null);var d=l?l.completion:{};return d.type=r,d.arg=o,l?(this.method="next",this.next=l.finallyLoc,b):this.complete(d)},complete:function(r,o){if(r.type==="throw")throw r.arg;return r.type==="break"||r.type==="continue"?this.next=r.arg:r.type==="return"?(this.rval=this.arg=r.arg,this.method="return",this.next="end"):r.type==="normal"&&o&&(this.next=o),b},finish:function(r){for(var o=this.tryEntries.length-1;o>=0;--o){var u=this.tryEntries[o];if(u.finallyLoc===r)return this.complete(u.completion,u.afterLoc),K(u),b}},catch:function(r){for(var o=this.tryEntries.length-1;o>=0;--o){var u=this.tryEntries[o];if(u.tryLoc===r){var s=u.completion;if(s.type==="throw"){var l=s.arg;K(u)}return l}}throw new Error("illegal catch attempt")},delegateYield:function(r,o,u){return this.delegate={iterator:$(r),resultName:o,nextLoc:u},this.method==="next"&&(this.arg=void 0),b}},e}function re(e,t,n,a,c,f,m){try{var h=e[f](m),p=h.value}catch(E){n(E);return}h.done?t(p):Promise.resolve(p).then(a,c)}function ne(e){return function(){var t=this,n=arguments;return new Promise(function(a,c){var f=e.apply(t,n);function m(p){re(f,a,c,m,h,"next",p)}function h(p){re(f,a,c,m,h,"throw",p)}m(void 0)})}}function oe(e,t){return Ae(e)||Te(e,t)||ie(e,t)||Ie()}function Ie(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ie(e,t){if(e){if(typeof e=="string")return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(e,t)}}function _(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Te(e,t){var n=e==null?null:typeof Symbol!="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var a,c,f,m,h=[],p=!0,E=!1;try{if(f=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;p=!1}else for(;!(p=(a=f.call(n)).done)&&(h.push(a.value),h.length!==t);p=!0);}catch(Z){E=!0,c=Z}finally{try{if(!p&&n.return!=null&&(m=n.return(),Object(m)!==m))return}finally{if(E)throw c}}return h}}function Ae(e){if(Array.isArray(e))return e}function Ce(e,t){if(e==null)return{};var n=$e(e,t),a,c;if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(e);for(c=0;c<f.length;c++)a=f[c],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function $e(e,t){if(e==null)return{};var n={},a=Object.keys(e),c,f;for(f=0;f<a.length;f++)c=a[f],!(t.indexOf(c)>=0)&&(n[c]=e[c]);return n}var Fe=function(t){var n=t.value,a=t.onChange,c=t.dependencies,f=c===void 0?[]:c,m=t.placeholder,h=t.options,p=h===void 0?[]:h,E=t.request,Z=t.debounceTime,b=t.all,G=b===void 0?!1:b,g=t.disabled,I=t.allValue,D=I===void 0?"":I,q=t.allLabel,C=q===void 0?"\u5168\u90E8":q,T=t.selectProps,P=T===void 0?{}:T,j=t.outLoading,S=j===void 0?{}:j,M=t.requestOptions,J=M===void 0?{}:M,K=t.name,B=Ce(t,Oe),$=(0,H.useState)([]),V=oe($,2),i=V[0],r=V[1],o=(0,X.YZ)(),u=(0,fe.Z)((S==null?void 0:S.spinning)||!1),s=oe(u,2),l=s[0],d=s[1],v=(0,H.useMemo)(function(){return Reflect.has(S,"spinning")},[S]);(0,pe.Z)(function(){v&&d((S==null?void 0:S.spinning)||!1)},[S]);var O=(0,de.Z)(E||ne(U().mark(function L(){return U().wrap(function(Q){for(;;)switch(Q.prev=Q.next){case 0:return Q.abrupt("return",[]);case 1:case"end":return Q.stop()}},L)})),Y(Y({},J),{},{manual:!0,debounceWait:Z,onSuccess:function(y){v||d(!1),G&&(y==null?void 0:y.length)>0?r([{label:C,value:D}].concat(R(y))):r(R(y))},onError:function(){r([]),v||d(!1)}})),W=O.run,A=(0,X.RZ)(f,B),F=(0,X.Zm)(A),ee=(0,H.useMemo)(function(){var L=P.options||p;if(G&&(L==null?void 0:L.length)>0){var y=[{label:C,value:D}].concat(R(L));return y}return L},[G,C,D,p,P.options]),ke=ye.Z.useFormInstance();(0,ve.Z)(function(){E&&(o?ne(U().mark(function L(){var y;return U().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.prev=0,v||d(!0),N.next=4,E.apply(void 0,R(A));case 4:y=N.sent,G&&(y==null?void 0:y.length)>0?r([{label:C,value:D}].concat(R(y))):r(R(y)),N.next=11;break;case 8:N.prev=8,N.t0=N.catch(0),r([]);case 11:v||d(!1);case 12:case"end":return N.stop()}},L,null,[[0,8]])}))():(n!==void 0&&ke.setFieldValue(K,void 0),F||(v||d(!0),W.apply(void 0,R(A)))))},[A]);var Ye=(0,H.useMemo)(function(){return F?[]:(i==null?void 0:i.length)>0?i:ee.length>0?ee:[]},[F,ee,i]),Ke=(0,he.Z)(function(L,y){P!=null&&P.onChange&&(P==null||P.onChange(L,y)),a(L)});return(0,x.jsx)(me.Z,Y(Y({spinning:l,style:ge.j},S),{},{children:(0,x.jsx)(be.Z,Y(Y({disabled:g!=null?g:F,options:Ye,placeholder:m,allowClear:!0,style:{width:"100%"}},P),{},{value:n,onChange:Ke}))}))},Ge=Fe;function z(e){return z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},z(e)}var Ze=["request","debounceTime","all","allValue","allLabel","options","selectProps","requestOptions","spin","required","disabled","placeholder"];function ae(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(c){return Object.getOwnPropertyDescriptor(e,c).enumerable})),n.push.apply(n,a)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ae(Object(n),!0).forEach(function(a){De(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ae(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function De(e,t,n){return t=Ne(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ne(e){var t=Ve(e,"string");return z(t)==="symbol"?t:String(t)}function Ve(e,t){if(z(e)!=="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t||"default");if(z(a)!=="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function We(e,t){if(e==null)return{};var n=qe(e,t),a,c;if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(e);for(c=0;c<f.length;c++)a=f[c],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function qe(e,t){if(e==null)return{};var n={},a=Object.keys(e),c,f;for(f=0;f<a.length;f++)c=a[f],!(t.indexOf(c)>=0)&&(n[c]=e[c]);return n}var Re=function(t){var n=t.request,a=t.debounceTime,c=t.all,f=c===void 0?!1:c,m=t.allValue,h=m===void 0?"":m,p=t.allLabel,E=p===void 0?"\u5168\u90E8":p,Z=t.options,b=Z===void 0?[]:Z,G=t.selectProps,g=G===void 0?{}:G,I=t.requestOptions,D=I===void 0?{}:I,q=t.spin,C=t.required,T=t.disabled,P=t.placeholder,j=We(t,Ze),S=(0,X.JY)({placeholder:P,restProps:j,isSelectType:!0}),M=(0,H.useContext)(se.e),J=M.disabled;return(0,x.jsx)(ce.Z,ue(ue({required:C,_isSelectType:!0,rules:[{validator:function(B,$){var V="",i=b.find(function(r){return(r==null?void 0:r.value)===$});return(!$&&$!==0&&!i&&!(f&&h===$)||((g==null?void 0:g.mode)==="multiple"||(g==null?void 0:g.mode)==="tags")&&$&&$.length<=0)&&(V=C?"".concat(S,"!"):""),V?Promise.reject(V):Promise.resolve()}}]},j),{},{children:(0,x.jsx)(Ge,{name:j.name,disabled:T!=null?T:J,placeholder:S,dependencies:j==null?void 0:j.dependencies,options:b,request:n,debounceTime:a,all:f,outLoading:q,allValue:h,allLabel:E,selectProps:g,requestOptions:D})}))},Me=Re}}]);
