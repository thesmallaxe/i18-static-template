"use strict";(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u="function"==typeof require&&require,i=0;i<t.length;i++){o(t[i]);}return o;}return r;})()({1:[function(require,module,exports){
(function(global){
/* eslint-env browser */
'use strict';

var _jquery=typeof window!=="undefined"?window['jQuery']:typeof global!=="undefined"?global['jQuery']:null;var _jquery2=_interopRequireDefault(_jquery);
var _loadscript=require('utilities/loadscript.js');var _loadscript2=_interopRequireDefault(_loadscript);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

/**
                                                                                                                                                                                                           * Check if the user is on a modern browser.
                                                                                                                                                                                                           *
                                                                                                                                                                                                           * Test for any JavaScript features that are supported by most browsers but
                                                                                                                                                                                                           * need to be polyfilled in a few.
                                                                                                                                                                                                           *
                                                                                                                                                                                                           * @see https://philipwalton.com/articles/loading-polyfills-only-when-needed/
                                                                                                                                                                                                           *
                                                                                                                                                                                                           * @return {boolean} - Whether the features are supported
                                                                                                                                                                                                           */
function isModernBrowser(){
return typeof window.Promise!=='undefined'&&
typeof Element.prototype.closest!=='undefined'&&
typeof Array.from!=='undefined'&&
typeof Array.prototype.find!=='undefined'&&
typeof NodeList.prototype.forEach!=='undefined';
}

function init(){
var $=_jquery2.default;

console.log("Hello");
}

/**
   * Functions that only fire when window fully loaded.
   */
function initComplete(){
}

/**
   * Document ready function
     *
     * @param {function} fnInit - Function that executes when page is loaded
     * @param {function} fnComplete - Function that executes when page is fully
     * loaded
   */
function ready(fnInit,fnComplete){
if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',fnInit);
}else{
fnInit();
}

if(document.readyState==='complete'){
fnComplete();
}else{
window.addEventListener('load',fnComplete);
}
}

/**
   * Call the initialization function.
   */
function main(){
ready(init,initComplete);
}

/**
   * Add any polyfills not available through polyfill.io before calling main.
   */
function polyfill(){
if(typeof NodeList.prototype.forEach==='undefined'){
NodeList.prototype.forEach=Array.prototype.forEach;
}
main();
}

if(isModernBrowser()){
main();
}else{
// See https://polyfill.io/v2/docs/features/ for supported feature list.
(0,_loadscript2.default)('https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise,Element.prototype.closest,Array.from,Array.prototype.find',polyfill);
}

}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});

},{"utilities/loadscript.js":2}],2:[function(require,module,exports){
'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=












function(src,callback){
var js=document.createElement('script');
js.src=src;
js.onload=function(){
callback();
};
js.onerror=function(){
callback(new Error('Failed to load script '+src));
};
document.head.appendChild(js);
};

},{}]},{},[1]);