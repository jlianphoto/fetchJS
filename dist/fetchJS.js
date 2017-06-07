!function(t){function e(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){"use strict";function r(){this.cfg={baseURL:"",hash:"",alias:null},this.cash={},this.type="",this.tasks=[],this.url="",this.start=!0}Object.defineProperty(e,"__esModule",{value:!0}),e.FetchLoader=void 0;var s=n(1),o=n(3);r.prototype.config=function(t){for(var e in this.cfg)this.cfg[e]=t[e]},r.prototype._next=function(){var t=this.tasks.shift();t&&t()},r.prototype._import=function(t){var e=this;return o.taskFn.call(this,function(){var n=(0,o.checkType)(t),r=fetchJS.cfg;if(t.indexOf(".")<0&&(t+=".js"),r.baseURL?e.url=r.baseURL+t:e.url=t,r.alias&&(e.url+=(0,o.parseAlias)(t)),r.hash&&(e.url+="?"+r.hash),fetchJS.cash.hasOwnProperty(e.url))return e._next(),e;if("css"===n){var a=function(){e._next()};window.fetchJS.cash[e.url]="css",(0,s.fetchCss)(e.url,a)}else if("js"===n){var a=function(t){var n="\n\t\t\t\t\t\t(function(url) {\n\t\t\t\t\t\t\tvar exports = {};\n\t\t\t\t\t\t\tvar module = {};\n\t\t\t\t\t\t\tmodule.exports = {};\n\n\t\t\t\t\t\t\tfunction hasData(a) {\n\t\t\t\t\t\t\t\tfor (let k in a) {\n\t\t\t\t\t\t\t\t\treturn true\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\treturn false\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tfunction define(id, d , fn) {\n\n\t\t\t\t\t\t\t\tvar a = fn();\n\n\t\t\t\t\t\t\t\tif (a.default) {\n\t\t\t\t\t\t\t\t\twindow.fetchJS.cash[url] = a.default;\n\t\t\t\t\t\t\t\t\treturn \n\t\t\t\t\t\t\t\t}else{\n\t\t\t\t\t\t\t\t\twindow.fetchJS.cash[url] = a;\n\t\t\t\t\t\t\t\t\treturn\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t"+t+"\n\t\t\t\t\t\t\tif (hasData(exports)) {\n\t\t\t\t\t\t\t\tif (exports.default) {\n\t\t\t\t\t\t\t\t\twindow.fetchJS.cash[url] = exports.default;\n\t\t\t\t\t\t\t\t\treturn\n\t\t\t\t\t\t\t\t}else{\n\t\t\t\t\t\t\t\t\twindow.fetchJS.cash[url] = exports;\n\t\t\t\t\t\t\t\t\treturn\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (hasData(module.exports)) {\n\n\t\t\t\t\t\t\t\tif (module.exports.default) {\n\t\t\t\t\t\t\t\t\twindow.fetchJS.cash[url] = module.exports.default\n\t\t\t\t\t\t\t\t\treturn\n\t\t\t\t\t\t\t\t}else{\n\t\t\t\t\t\t\t\t\twindow.fetchJS.cash[url] = module.exports\n\t\t\t\t\t\t\t\t\treturn\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})('"+e.url+"')\n\t\t\t\t\t";(0,s.scriptParse)(n),e._next()};(0,s.fetchFunction)(e.url,a)}}),this.start&&(this._next(),this.start=!1),this},r.prototype.import=function(t){var e=this;if("string"==typeof t)return this._import(t),this;if(Array.isArray(t))return t.forEach(function(t){e._import(t)}),this;throw new Error("the parameter of import must be String or Array")},r.prototype.then=function(t){var e=this;return o.taskFn.call(this,function(){t&&t(window.fetchJS.cash[e.url]),e._next()}),this},r.prototype.asynImport=function(t){return(new r).import(t)},e.FetchLoader=r},function(t,e,n){"use strict";function r(t,e){fetch(t).then(function(t){return t.text()}).then(function(t){e(t)}).catch(function(t){throw new Error(t)})}function s(t,e){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState)if(200==n.status||304==n.status){var t=n.responseText;e(t)}else error()},n.open("GET",t,!0),n.send(null)}function o(t){var e=document.head||document.body||document.documentElement,n=document.createElement("script");n.text=t,e.appendChild(n),e.removeChild(n)}function a(t,e){var n=document.getElementsByTagName("head")[0],r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.href=t;var s=i(t,n);s.length?n.insertBefore(r,s[0]):n.appendChild(r),r.onload=function(){e()}}function i(t,e){for(var n=e.getElementsByTagName("link"),r=[],s=0;s<n.length;s++)r.push(n[s]);return r}Object.defineProperty(e,"__esModule",{value:!0});var u=window.fetch?r:s;e.fetchFunction=u,e.fetchCss=a,e.scriptParse=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0);window.fetchJS=new r.FetchLoader,e.default=fetchJS},function(t,e,n){"use strict";function r(t){var e=t.replace(/\?\S+/g,""),n="";return e.lastIndexOf(".css")>0?n="css":e.lastIndexOf(".js")>0&&(n="js"),n}function s(t){var e=t.split("/"),n=fetchJS.alias;for(var r in fetchJS.alias)e[0]===n[r]&&(e[0]=n[r]);var t=e.join("/");return t}function o(t){var e=this,n=function(){return function(){t.call(e)}}();this.tasks.push(n)}Object.defineProperty(e,"__esModule",{value:!0}),e.checkType=r,e.taskFn=o,e.parseAlias=s}]);