'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var vendorPrefixes = {
  Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
  Moz: ['firefox', 'seamonkey', 'sailfish'],
  ms: ['msie', 'msedge']
};

var browsers = {
  chrome: [['chrome']],
  safari: [['safari']],
  firefox: [['firefox']],
  ie: [['msie']],
  edge: [['msedge']],
  opera: [['opera']],
  ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
  ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
  op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
  and_uc: [['android', 'mobile'], ['android', 'tablet']],
  android: [['android', 'mobile'], ['android', 'tablet']]
};

/**
 * Returns an object containing prefix data associated with a browser
 * @param {string} browser - browser to find a prefix for
 */
var getPrefixes = function getPrefixes(browser) {
  var prefixKeys = undefined;
  var prefix = undefined;
  var vendors = undefined;
  var conditions = undefined;
  var prefixVendor = undefined;
  var browserVendors = undefined;

  // Find the prefix for this browser (if any)
  prefixKeys = Object.keys(vendorPrefixes);
  for (var i = 0; i < prefixKeys.length; i++) {
    prefix = prefixKeys[i];

    // Find a matching vendor
    vendors = vendorPrefixes[prefix];
    conditions = browsers[browser];

    for (var j = 0; j < vendors.length; j++) {
      prefixVendor = vendors[j];

      for (var k = 0; k < conditions.length; k++) {
        browserVendors = conditions[k];

        if (browserVendors.indexOf(prefixVendor) !== -1) {
          return {
            inline: prefix,
            css: '-' + prefix.toLowerCase() + '-'
          };
        }
      }
    }
  }

  // No prefix found for this browser
  return { inline: '', css: '' };
};

/**
 * Uses bowser to get default browser information such as version and name
 * Evaluates bowser info and adds vendorPrefix information
 * @param {string} userAgent - userAgent that gets evaluated
 */

exports['default'] = function () {
  var info = {};

  // Return an array of supported browsers
  info.browsers = Object.keys(browsers);

  // Return prefixes associated by browser
  info.prefixes = {};

  // Iterate browser list, assign prefix to each
  info.browsers.forEach(function (browser) {
    info.prefixes[browser] = getPrefixes(browser);
  });

  return info;
};

module.exports = exports['default'];