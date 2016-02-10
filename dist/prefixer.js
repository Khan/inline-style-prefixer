(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Prefixer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pluginsCalc = require('./plugins/calc');

var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

var _pluginsCursor = require('./plugins/cursor');

var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

var _pluginsFlex = require('./plugins/flex');

var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

var _pluginsSizing = require('./plugins/sizing');

var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

var _pluginsGradient = require('./plugins/gradient');

var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

var _pluginsTransition = require('./plugins/transition');

var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

// special flexbox specifications

var _pluginsFlexboxIE = require('./plugins/flexboxIE');

var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

var _pluginsFlexboxOld = require('./plugins/flexboxOld');

var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

exports['default'] = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'],
// this must be run AFTER the flexbox specs
_pluginsFlex2['default']];
module.exports = exports['default'];
},{"./plugins/calc":4,"./plugins/cursor":5,"./plugins/flex":6,"./plugins/flexboxIE":7,"./plugins/flexboxOld":8,"./plugins/gradient":9,"./plugins/sizing":10,"./plugins/transition":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsGetBrowserInformation = require('./utils/getBrowserInformation');

var _utilsGetBrowserInformation2 = _interopRequireDefault(_utilsGetBrowserInformation);

var _utilsCapitalizeString = require('./utils/capitalizeString');

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var _utilsAssign = require('./utils/assign');

var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

var _caniuseData = require('./caniuseData');

var _caniuseData2 = _interopRequireDefault(_caniuseData);

var _Plugins = require('./Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

var prefixes = _caniuseData2['default'];
var browserInfo = (0, _utilsGetBrowserInformation2['default'])();

var Prefixer = (function () {
  function Prefixer() {
    _classCallCheck(this, Prefixer);
  }

  _createClass(Prefixer, null, [{
    key: 'prefixAll',

    /**
     * Returns a prefixed version of the style object using all vendor prefixes
     * @param {Object} styles - Style object that gets prefixed properties added
     * @returns {Object} - Style object with prefixed properties and values
     */
    value: function prefixAll(styles) {
      styles = (0, _utilsAssign2['default'])({}, styles);

      Object.keys(styles).forEach(function (property) {
        var value = styles[property];
        if (value instanceof Object) {
          // recurse through nested style objects
          styles[property] = Prefixer.prefixAll(value);
        } else {
          var browsers = Object.keys(browserInfo.prefixes);
          browsers.forEach(function (browser) {
            var style = browserInfo.prefixes[browser];
            // add prefixes if needed
            if (prefixes[property] != null) {
              styles[style.inline + (0, _utilsCapitalizeString2['default'])(property)] = value;
            }
          });

          // resolve plugins for each browser
          _Plugins2['default'].forEach(function (plugin) {
            var resolvedStyles = plugin({
              property: property,
              value: value,
              styles: styles,
              prefix: {},
              keepUnprefixed: true,
              requiresPrefix: prefixes
            });
            (0, _utilsAssign2['default'])(styles, resolvedStyles);
          });
        }
      });

      return styles;
    }
  }]);

  return Prefixer;
})();

exports['default'] = Prefixer;
module.exports = exports['default'];
},{"./Plugins":1,"./caniuseData":3,"./utils/assign":12,"./utils/capitalizeString":14,"./utils/getBrowserInformation":15}],3:[function(require,module,exports){
module.exports = {"transform":0,"transformOrigin":0,"transformOriginX":0,"transformOriginY":0,"backfaceVisibility":0,"perspective":0,"perspectiveOrigin":0,"transformStyle":0,"transformOriginZ":0,"animation":0,"animationDelay":0,"animationDirection":0,"animationFillMode":0,"animationDuration":0,"animationIterationCount":0,"animationName":0,"animationPlayState":0,"animationTimingFunction":0,"appearance":0,"userSelect":0,"fontKerning":0,"textEmphasisPosition":0,"textEmphasis":0,"textEmphasisStyle":0,"textEmphasisColor":0,"boxDecorationBreak":0,"clipPath":0,"maskImage":0,"maskMode":0,"maskRepeat":0,"maskPosition":0,"maskClip":0,"maskOrigin":0,"maskSize":0,"maskComposite":0,"mask":0,"maskBorderSource":0,"maskBorderMode":0,"maskBorderSlice":0,"maskBorderWidth":0,"maskBorderOutset":0,"maskBorderRepeat":0,"maskBorder":0,"maskType":0,"textDecorationStyle":0,"textDecorationSkip":0,"textDecorationLine":0,"textDecorationColor":0,"filter":0,"fontFeatureSettings":0,"breakAfter":0,"breakBefore":0,"breakInside":0,"columnCount":0,"columnFill":0,"columnGap":0,"columnRule":0,"columnRuleColor":0,"columnRuleStyle":0,"columnRuleWidth":0,"columns":0,"columnSpan":0,"columnWidth":0,"flex":0,"flexBasis":0,"flexDirection":0,"flexGrow":0,"flexFlow":0,"flexShrink":0,"flexWrap":0,"alignContent":0,"alignItems":0,"alignSelf":0,"justifyContent":0,"order":0,"transition":0,"transitionDelay":0,"transitionDuration":0,"transitionProperty":0,"transitionTimingFunction":0,"backdropFilter":0,"scrollSnapType":0,"scrollSnapPointsX":0,"scrollSnapPointsY":0,"scrollSnapDestination":0,"scrollSnapCoordinate":0,"shapeImageThreshold":0,"shapeImageMargin":0,"shapeImageOutside":0,"hyphens":0,"flowInto":0,"flowFrom":0,"regionFragment":0,"boxSizing":0,"textAlignLast":0,"tabSize":0,"grid":0,"gridColumnStart":0,"gridRow":0,"gridTemplateColumns":0,"gridRowStart":0,"gridRowEnd":0,"gridTemplateRows":0,"gridAutoRows":0,"wrapThrough":0,"wrapFlow":0,"gridColumnGap":0,"touchAction":0,"gridRowGap":0,"gridAutoFlow":0,"gridColumn":0,"gridGap":0,"gridTemplateAreas":0,"gridTemplate":0,"gridArea":0,"wrapMargin":0,"gridAutoColumns":0,"gridColumnEnd":0,"textSizeAdjust":0,"borderImage":0,"borderImageOutset":0,"borderImageRepeat":0,"borderImageSlice":0,"borderImageSource":0,"borderImageWidth":0,"objectFit":0,"objectPosition":0};
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

function calc(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('calc(') > -1) {
    var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

    var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    }).join(';' + dashCaseProperty + ':');
    return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":13}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;
var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;

  if (property === 'cursor' && values[value]) {
    var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
      return prefix + value;
    }).join(';' + property + ':');
    return {
      cursor: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    };
  }
}

module.exports = exports['default'];
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;
var values = { flex: true, 'inline-flex': true };

function flex(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;

  if (property === 'display' && values[value]) {
    var newValue = ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value].join(';' + property + ':');
    return {
      display: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    };
  }
}

module.exports = exports['default'];
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = flexboxIE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: '-ms-flexbox',
  'inline-flex': '-ms-inline-flexbox'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

var properties = Object.keys(alternativeProps).concat('display').reduce(function (result, prop) {
  return _extends({}, result, _defineProperty({}, prop, true));
}, {});

function flexboxIE(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var styles = pluginInterface.styles;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;

  if (properties[property]) {
    var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

    if (!keepUnprefixed) {
      delete styles[property];
    }

    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
    if (alternativeValues[value]) {
      return _defineProperty({}, property, alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
    }
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":13}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = flexboxOld;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var properties = Object.keys(alternativeProps).concat(['alignContent', 'alignSelf', 'display', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection']).reduce(function (result, prop) {
  return _extends({}, result, _defineProperty({}, prop, true));
}, {});

function flexboxOld(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var styles = pluginInterface.styles;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;

  if (properties[property]) {
    var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

    if (!keepUnprefixed) {
      delete styles[property];
    }
    if (property === 'flexDirection') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: prefix.css + alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : '')
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
    if (alternativeValues[value]) {
      return _defineProperty({}, property, alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
    }
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":13}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;

  if (typeof value === 'string' && value.match(values) !== null) {
    var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

    var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
      return prefix + value;
    }).join(';' + dashCaseProperty + ':');
    return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":13}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sizing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties[property] && values[value]) {
    var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

    var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
      return prefix + value;
    }).join(';' + dashCaseProperty + ':');
    return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":13}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _utilsCamelToDashCase = require('../utils/camelToDashCase');

var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

var _utilsCapitalizeString = require('../utils/capitalizeString');

var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

var propertyRegexp = /^(WebkitT|MozT|msT|t)ransition(Property|)$/;

function calc(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;
  var requiresPrefix = pluginInterface.requiresPrefix;

  var match = undefined;

  if (typeof value === 'string' && (match = property.match(propertyRegexp))) {
    var _ref;

    var _ret = (function () {
      var newProperty = 'transition' + match[2];
      var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (newProperty) {
        return (0, _utilsCamelToDashCase2['default'])(newProperty);
      });
      var newValue = value;

      // only split multi values, not cubic beziers
      var multipleValues = newValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      requiresPrefixDashCased.forEach(function (newProperty) {
        multipleValues.forEach(function (val, index) {
          if (val.indexOf(newProperty) > -1) {
            var newVal = ['-webkit-', '-moz-', '-ms-'].map(function (prefix) {
              return val.replace(newProperty, prefix + newProperty);
            }).join(',');
            multipleValues[index] = newVal + (keepUnprefixed ? ',' + val : '');
          }
        });
      });
      var outputValue = multipleValues.join(',');
      return {
        v: (_ref = {}, _defineProperty(_ref, 'Webkit' + (0, _utilsCapitalizeString2['default'])(newProperty), outputValue), _defineProperty(_ref, 'Moz' + (0, _utilsCapitalizeString2['default'])(newProperty), outputValue), _defineProperty(_ref, 'ms' + (0, _utilsCapitalizeString2['default'])(newProperty), outputValue), _defineProperty(_ref, newProperty, outputValue), _ref)
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

module.exports = exports['default'];
},{"../utils/camelToDashCase":13,"../utils/capitalizeString":14}],12:[function(require,module,exports){
// leight polyfill for Object.assign
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.keys(extend).forEach(function (key) {
    return base[key] = extend[key];
  });
  return base;
};

module.exports = exports["default"];
},{}],13:[function(require,module,exports){
/**
 * Converts a camel-case string to a dash-case string
 * @param {string} str - str that gets converted to dash-case
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (str) {
  return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
    return p1 + '-' + p2.toLowerCase();
  }).replace('ms-', '-ms-');
};

module.exports = exports['default'];
},{}],14:[function(require,module,exports){
// helper to capitalize strings
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];
},{}],15:[function(require,module,exports){
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
},{}]},{},[2])(2)
});