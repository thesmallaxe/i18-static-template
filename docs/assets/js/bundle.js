(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
/* eslint-env browser */
'use strict';

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);var _jquery2 = _interopRequireDefault(_jquery);
var _loadscript = require('utilities/loadscript.js');var _loadscript2 = _interopRequireDefault(_loadscript);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

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
function isModernBrowser() {
  return typeof window.Promise !== 'undefined' &&
  typeof Element.prototype.closest !== 'undefined' &&
  typeof Array.from !== 'undefined' &&
  typeof Array.prototype.find !== 'undefined' &&
  typeof NodeList.prototype.forEach !== 'undefined';
}

function init() {
  var $ = _jquery2.default;

  console.log("Hello");
}

/**
   * Functions that only fire when window fully loaded.
   */
function initComplete() {
}

/**
   * Document ready function
     *
     * @param {function} fnInit - Function that executes when page is loaded
     * @param {function} fnComplete - Function that executes when page is fully
     * loaded
   */
function ready(fnInit, fnComplete) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fnInit);
  } else {
    fnInit();
  }

  if (document.readyState === 'complete') {
    fnComplete();
  } else {
    window.addEventListener('load', fnComplete);
  }
}

/**
   * Call the initialization function.
   */
function main() {
  ready(init, initComplete);
}

/**
   * Add any polyfills not available through polyfill.io before calling main.
   */
function polyfill() {
  if (typeof NodeList.prototype.forEach === 'undefined') {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  main();
}

if (isModernBrowser()) {
  main();
} else {
  // See https://polyfill.io/v2/docs/features/ for supported feature list.
  (0, _loadscript2.default)('https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise,Element.prototype.closest,Array.from,Array.prototype.find', polyfill);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"utilities/loadscript.js":2}],2:[function(require,module,exports){
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =












function (src, callback) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function () {
    callback();
  };
  js.onerror = function () {
    callback(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfYXNzZXRzL2pzL21haW4uanMiLCJfYXNzZXRzL2pzL3V0aWxpdGllcy9sb2Fkc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7O0FBRUEsZ0M7QUFDQSxxRDs7QUFFQTs7Ozs7Ozs7OztBQVVBLFNBQVMsZUFBVCxHQUEyQjtBQUN6QixTQUFPLE9BQU8sT0FBTyxPQUFkLEtBQTBCLFdBQTFCO0FBQ0YsU0FBTyxRQUFRLFNBQVIsQ0FBa0IsT0FBekIsS0FBcUMsV0FEbkM7QUFFRixTQUFPLE1BQU0sSUFBYixLQUFzQixXQUZwQjtBQUdGLFNBQU8sTUFBTSxTQUFOLENBQWdCLElBQXZCLEtBQWdDLFdBSDlCO0FBSUYsU0FBTyxTQUFTLFNBQVQsQ0FBbUIsT0FBMUIsS0FBc0MsV0FKM0M7QUFLRDs7QUFFRCxTQUFTLElBQVQsR0FBZ0I7QUFDZCxNQUFNLElBQUksZ0JBQVY7O0FBRUEsVUFBUSxHQUFSLENBQVksT0FBWjtBQUNEOztBQUVEOzs7QUFHQSxTQUFTLFlBQVQsR0FBd0I7QUFDdkI7O0FBRUQ7Ozs7Ozs7QUFPQSxTQUFTLEtBQVQsQ0FBZSxNQUFmLEVBQXVCLFVBQXZCLEVBQW1DO0FBQ2pDLE1BQUksU0FBUyxVQUFULEtBQXdCLFNBQTVCLEVBQXVDO0FBQ3JDLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLE1BQTlDO0FBQ0QsR0FGRCxNQUVPO0FBQ0w7QUFDRDs7QUFFRCxNQUFJLFNBQVMsVUFBVCxLQUF3QixVQUE1QixFQUF3QztBQUN0QztBQUNELEdBRkQsTUFFTztBQUNMLFdBQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsVUFBaEM7QUFDRDtBQUNGOztBQUVEOzs7QUFHQSxTQUFTLElBQVQsR0FBZ0I7QUFDZCxRQUFNLElBQU4sRUFBWSxZQUFaO0FBQ0Q7O0FBRUQ7OztBQUdBLFNBQVMsUUFBVCxHQUFvQjtBQUNsQixNQUFJLE9BQU8sU0FBUyxTQUFULENBQW1CLE9BQTFCLEtBQXNDLFdBQTFDLEVBQXVEO0FBQ3JELGFBQVMsU0FBVCxDQUFtQixPQUFuQixHQUE2QixNQUFNLFNBQU4sQ0FBZ0IsT0FBN0M7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQsSUFBSSxpQkFBSixFQUF1QjtBQUNyQjtBQUNELENBRkQsTUFFTztBQUNMO0FBQ0EsNEJBQVcsdUhBQVgsRUFBb0ksUUFBcEk7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVjLFVBQVMsR0FBVCxFQUFjLFFBQWQsRUFBd0I7QUFDckMsTUFBTSxLQUFLLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFYO0FBQ0EsS0FBRyxHQUFILEdBQVMsR0FBVDtBQUNBLEtBQUcsTUFBSCxHQUFZLFlBQVc7QUFDckI7QUFDRCxHQUZEO0FBR0EsS0FBRyxPQUFILEdBQWEsWUFBVztBQUN0QixhQUFTLElBQUksS0FBSixDQUFVLDJCQUEyQixHQUFyQyxDQUFUO0FBQ0QsR0FGRDtBQUdBLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsRUFBMUI7QUFDRCxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBqcXVlcnkgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gJ3V0aWxpdGllcy9sb2Fkc2NyaXB0LmpzJztcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgdXNlciBpcyBvbiBhIG1vZGVybiBicm93c2VyLlxuICpcbiAqIFRlc3QgZm9yIGFueSBKYXZhU2NyaXB0IGZlYXR1cmVzIHRoYXQgYXJlIHN1cHBvcnRlZCBieSBtb3N0IGJyb3dzZXJzIGJ1dFxuICogbmVlZCB0byBiZSBwb2x5ZmlsbGVkIGluIGEgZmV3LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9waGlsaXB3YWx0b24uY29tL2FydGljbGVzL2xvYWRpbmctcG9seWZpbGxzLW9ubHktd2hlbi1uZWVkZWQvXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRoZSBmZWF0dXJlcyBhcmUgc3VwcG9ydGVkXG4gKi9cbmZ1bmN0aW9uIGlzTW9kZXJuQnJvd3NlcigpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cuUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB0eXBlb2YgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB0eXBlb2YgQXJyYXkuZnJvbSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB0eXBlb2YgQXJyYXkucHJvdG90eXBlLmZpbmQgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgdHlwZW9mIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoICE9PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3QgJCA9IGpxdWVyeTtcblxuICBjb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9ucyB0aGF0IG9ubHkgZmlyZSB3aGVuIHdpbmRvdyBmdWxseSBsb2FkZWQuXG4gKi9cbmZ1bmN0aW9uIGluaXRDb21wbGV0ZSgpIHtcbn1cblxuLyoqXG4gKiBEb2N1bWVudCByZWFkeSBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbkluaXQgLSBGdW5jdGlvbiB0aGF0IGV4ZWN1dGVzIHdoZW4gcGFnZSBpcyBsb2FkZWRcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm5Db21wbGV0ZSAtIEZ1bmN0aW9uIHRoYXQgZXhlY3V0ZXMgd2hlbiBwYWdlIGlzIGZ1bGx5XG4gICAqIGxvYWRlZFxuICovXG5mdW5jdGlvbiByZWFkeShmbkluaXQsIGZuQ29tcGxldGUpIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbkluaXQpO1xuICB9IGVsc2Uge1xuICAgIGZuSW5pdCgpO1xuICB9XG5cbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICBmbkNvbXBsZXRlKCk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmbkNvbXBsZXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGwgdGhlIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYWluKCkge1xuICByZWFkeShpbml0LCBpbml0Q29tcGxldGUpO1xufVxuXG4vKipcbiAqIEFkZCBhbnkgcG9seWZpbGxzIG5vdCBhdmFpbGFibGUgdGhyb3VnaCBwb2x5ZmlsbC5pbyBiZWZvcmUgY2FsbGluZyBtYWluLlxuICovXG5mdW5jdGlvbiBwb2x5ZmlsbCgpIHtcbiAgaWYgKHR5cGVvZiBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB9XG4gIG1haW4oKTtcbn1cblxuaWYgKGlzTW9kZXJuQnJvd3NlcigpKSB7XG4gIG1haW4oKTtcbn0gZWxzZSB7XG4gIC8vIFNlZSBodHRwczovL3BvbHlmaWxsLmlvL3YyL2RvY3MvZmVhdHVyZXMvIGZvciBzdXBwb3J0ZWQgZmVhdHVyZSBsaXN0LlxuICBsb2FkU2NyaXB0KCdodHRwczovL2Nkbi5wb2x5ZmlsbC5pby92Mi9wb2x5ZmlsbC5taW4uanM/ZmVhdHVyZXM9UHJvbWlzZSxFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0LEFycmF5LmZyb20sQXJyYXkucHJvdG90eXBlLmZpbmQnLCBwb2x5ZmlsbCk7XG59IiwiLyoqXG4gKiBAZmlsZVxuICogU2NyaXB0IGxvYWRlci5cbiAqL1xuXG4vKipcbiAqIExvYWRzIGEgc2NyaXB0IGFuZCBydW5zIGEgY2FsbGJhY2suXG4gKlxuICogQHNlZSBodHRwczovL3BoaWxpcHdhbHRvbi5jb20vYXJ0aWNsZXMvbG9hZGluZy1wb2x5ZmlsbHMtb25seS13aGVuLW5lZWRlZC9cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIC0gUGF0aCB0byB0aGUgc2NyaXB0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIHRvIGV4ZWN1dGUgYWZ0ZXIgc2NyaXB0IGxvYWRlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzcmMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGpzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIGpzLnNyYyA9IHNyYztcbiAganMub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfTtcbiAganMub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIGNhbGxiYWNrKG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgc2NyaXB0ICcgKyBzcmMpKTtcbiAgfTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChqcyk7XG59XG4iXX0=
