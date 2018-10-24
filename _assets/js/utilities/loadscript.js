/**
 * @file
 * Script loader.
 */

/**
 * Loads a script and runs a callback.
 *
 * @see https://philipwalton.com/articles/loading-polyfills-only-when-needed/
 *
 * @param {string} src - Path to the script
 * @param {function} callback - Callback to execute after script loaded
 */
export default function(src, callback) {
  const js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    callback();
  };
  js.onerror = function() {
    callback(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}
