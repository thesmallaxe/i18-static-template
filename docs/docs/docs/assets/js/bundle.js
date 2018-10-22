(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
/* eslint-env browser */
'use strict';

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);var _jquery2 = _interopRequireDefault(_jquery);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfYXNzZXRzL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTs7QUFFQSxnQzs7QUFFQTs7Ozs7Ozs7OztBQVVBLFNBQVMsZUFBVCxHQUEyQjtBQUN6QixTQUFPLE9BQU8sT0FBTyxPQUFkLEtBQTBCLFdBQTFCO0FBQ0YsU0FBTyxRQUFRLFNBQVIsQ0FBa0IsT0FBekIsS0FBcUMsV0FEbkM7QUFFRixTQUFPLE1BQU0sSUFBYixLQUFzQixXQUZwQjtBQUdGLFNBQU8sTUFBTSxTQUFOLENBQWdCLElBQXZCLEtBQWdDLFdBSDlCO0FBSUYsU0FBTyxTQUFTLFNBQVQsQ0FBbUIsT0FBMUIsS0FBc0MsV0FKM0M7QUFLRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQganF1ZXJ5IGZyb20gJ2pxdWVyeSc7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHVzZXIgaXMgb24gYSBtb2Rlcm4gYnJvd3Nlci5cbiAqXG4gKiBUZXN0IGZvciBhbnkgSmF2YVNjcmlwdCBmZWF0dXJlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgYnkgbW9zdCBicm93c2VycyBidXRcbiAqIG5lZWQgdG8gYmUgcG9seWZpbGxlZCBpbiBhIGZldy5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vcGhpbGlwd2FsdG9uLmNvbS9hcnRpY2xlcy9sb2FkaW5nLXBvbHlmaWxscy1vbmx5LXdoZW4tbmVlZGVkL1xuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gV2hldGhlciB0aGUgZmVhdHVyZXMgYXJlIHN1cHBvcnRlZFxuICovXG5mdW5jdGlvbiBpc01vZGVybkJyb3dzZXIoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93LlByb21pc2UgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgdHlwZW9mIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgdHlwZW9mIEFycmF5LmZyb20gIT09ICd1bmRlZmluZWQnXG4gICAgJiYgdHlwZW9mIEFycmF5LnByb3RvdHlwZS5maW5kICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHR5cGVvZiBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCAhPT0gJ3VuZGVmaW5lZCc7XG59XG4iXX0=
