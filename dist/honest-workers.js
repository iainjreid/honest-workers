!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.honestWorkers=t():e.honestWorkers=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(1),s=new WeakMap,i=function(){function e(){n(this,e),s.set(this,{}),this.defaultThreads=5}return o(e,[{key:"register",value:function(e,t){var r=s.get(this);if(r[e])throw Error("The UID must be unique");var n=(0,a.createWorkerScript)(t);return r[e]={src:n,threads:function(e){for(var t=[],r=0;r<e;)t[r++]=new Worker(n);return t}(this.defaultThreads)},s.set(this,r),r[e]}},{key:"execute",value:function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var o=void 0;if(!(o=s.get(this)[e]))throw Error("The UID has not been defined");for(var a=0,i=o.threads.length;a<i;a++)if(!o.threads[a].onmessage){o=o.threads[a];break}return o||(o=o.threads[o.threads.length]=new Worker(o.src)),console.log(o),new Promise(function(e,t){o.onmessage=function(t){e(t.data),o.onmessage=null},o.postMessage(r)})}},{key:"Class",get:function(){return e}}]),e}();e.exports=new i},function(e,t){"use strict";function r(e){if("function"!=typeof e)throw Error("Worker script must be a function");var t=new Blob(["self.onmessage = function (e) {\n      e.data[e.data.length] = function () {\n        if (!arguments.length) {\n          arguments = [null]\n        }\n        postMessage.apply(this, arguments)\n      }\n      return ("+e.toString()+").apply(this, e.data)\n    }"],{type:"application/javascript"});return URL.createObjectURL(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.createWorkerScript=r}])});