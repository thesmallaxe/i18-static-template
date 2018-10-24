/* eslint-env browser */
'use strict';

import jquery from 'jquery';
import loadScript from 'utilities/loadscript.js';

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
  return typeof window.Promise !== 'undefined'
    && typeof Element.prototype.closest !== 'undefined'
    && typeof Array.from !== 'undefined'
    && typeof Array.prototype.find !== 'undefined'
    && typeof NodeList.prototype.forEach !== 'undefined';
}

function init() {
  const $ = jquery;

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
  loadScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise,Element.prototype.closest,Array.from,Array.prototype.find', polyfill);
}