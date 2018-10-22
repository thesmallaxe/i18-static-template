/* eslint-env browser */
'use strict';

import jquery from 'jquery';

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
