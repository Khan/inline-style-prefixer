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

var prefixes = {};
var browserInfo = (0, _utilsGetBrowserInformation2['default'])();

browserInfo.browsers.forEach(function (browser) {
    var data = _caniuseData2['default'][browser];
    if (data) {
        (0, _utilsAssign2['default'])(prefixes, data);
    }
});

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
                        if (prefixes[property]) {
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
var caniuseData = {"chrome":{"transform":35,"transformOrigin":35,"transformOriginX":35,"transformOriginY":35,"backfaceVisibility":35,"perspective":35,"perspectiveOrigin":35,"transformStyle":35,"transformOriginZ":35,"animation":42,"animationDelay":42,"animationDirection":42,"animationFillMode":42,"animationDuration":42,"animationIterationCount":42,"animationName":42,"animationPlayState":42,"animationTimingFunction":42,"appearance":51,"userSelect":51,"fontKerning":32,"textEmphasisPosition":51,"textEmphasis":51,"textEmphasisStyle":51,"textEmphasisColor":51,"boxDecorationBreak":51,"clipPath":51,"maskImage":51,"maskMode":51,"maskRepeat":51,"maskPosition":51,"maskClip":51,"maskOrigin":51,"maskSize":51,"maskComposite":51,"mask":51,"maskBorderSource":51,"maskBorderMode":51,"maskBorderSlice":51,"maskBorderWidth":51,"maskBorderOutset":51,"maskBorderRepeat":51,"maskBorder":51,"maskType":51,"textDecorationStyle":51,"textDecorationSkip":51,"textDecorationLine":51,"textDecorationColor":51,"filter":51,"fontFeatureSettings":47,"breakAfter":51,"breakBefore":51,"breakInside":51,"columnCount":51,"columnFill":51,"columnGap":51,"columnRule":51,"columnRuleColor":51,"columnRuleStyle":51,"columnRuleWidth":51,"columns":51,"columnSpan":51,"columnWidth":51},"safari":{"flex":8,"flexBasis":8,"flexDirection":8,"flexGrow":8,"flexFlow":8,"flexShrink":8,"flexWrap":8,"alignContent":8,"alignItems":8,"alignSelf":8,"justifyContent":8,"order":8,"transition":6,"transitionDelay":6,"transitionDuration":6,"transitionProperty":6,"transitionTimingFunction":6,"transform":8,"transformOrigin":8,"transformOriginX":8,"transformOriginY":8,"backfaceVisibility":8,"perspective":8,"perspectiveOrigin":8,"transformStyle":8,"transformOriginZ":8,"animation":8,"animationDelay":8,"animationDirection":8,"animationFillMode":8,"animationDuration":8,"animationIterationCount":8,"animationName":8,"animationPlayState":8,"animationTimingFunction":8,"appearance":9.1,"userSelect":9.1,"backdropFilter":9.1,"fontKerning":9.1,"scrollSnapType":9.1,"scrollSnapPointsX":9.1,"scrollSnapPointsY":9.1,"scrollSnapDestination":9.1,"scrollSnapCoordinate":9.1,"textEmphasisPosition":7,"textEmphasis":7,"textEmphasisStyle":7,"textEmphasisColor":7,"boxDecorationBreak":9.1,"clipPath":9.1,"maskImage":9.1,"maskMode":9.1,"maskRepeat":9.1,"maskPosition":9.1,"maskClip":9.1,"maskOrigin":9.1,"maskSize":9.1,"maskComposite":9.1,"mask":9.1,"maskBorderSource":9.1,"maskBorderMode":9.1,"maskBorderSlice":9.1,"maskBorderWidth":9.1,"maskBorderOutset":9.1,"maskBorderRepeat":9.1,"maskBorder":9.1,"maskType":9.1,"textDecorationStyle":9.1,"textDecorationSkip":9.1,"textDecorationLine":9.1,"textDecorationColor":9.1,"shapeImageThreshold":9.1,"shapeImageMargin":9.1,"shapeImageOutside":9.1,"filter":9,"hyphens":9.1,"flowInto":9.1,"flowFrom":9.1,"breakBefore":8,"breakAfter":8,"breakInside":8,"regionFragment":9.1,"columnCount":8,"columnFill":8,"columnGap":8,"columnRule":8,"columnRuleColor":8,"columnRuleStyle":8,"columnRuleWidth":8,"columns":8,"columnSpan":8,"columnWidth":8},"firefox":{"appearance":47,"userSelect":47,"boxSizing":28,"textAlignLast":47,"textDecorationStyle":35,"textDecorationSkip":35,"textDecorationLine":35,"textDecorationColor":35,"tabSize":47,"hyphens":42,"fontFeatureSettings":33,"breakAfter":47,"breakBefore":47,"breakInside":47,"columnCount":47,"columnFill":47,"columnGap":47,"columnRule":47,"columnRuleColor":47,"columnRuleStyle":47,"columnRuleWidth":47,"columns":47,"columnSpan":47,"columnWidth":47},"opera":{"flex":16,"flexBasis":16,"flexDirection":16,"flexGrow":16,"flexFlow":16,"flexShrink":16,"flexWrap":16,"alignContent":16,"alignItems":16,"alignSelf":16,"justifyContent":16,"order":16,"transform":22,"transformOrigin":22,"transformOriginX":22,"transformOriginY":22,"backfaceVisibility":22,"perspective":22,"perspectiveOrigin":22,"transformStyle":22,"transformOriginZ":22,"animation":29,"animationDelay":29,"animationDirection":29,"animationFillMode":29,"animationDuration":29,"animationIterationCount":29,"animationName":29,"animationPlayState":29,"animationTimingFunction":29,"appearance":36,"userSelect":36,"fontKerning":19,"textEmphasisPosition":36,"textEmphasis":36,"textEmphasisStyle":36,"textEmphasisColor":36,"boxDecorationBreak":36,"clipPath":36,"maskImage":36,"maskMode":36,"maskRepeat":36,"maskPosition":36,"maskClip":36,"maskOrigin":36,"maskSize":36,"maskComposite":36,"mask":36,"maskBorderSource":36,"maskBorderMode":36,"maskBorderSlice":36,"maskBorderWidth":36,"maskBorderOutset":36,"maskBorderRepeat":36,"maskBorder":36,"maskType":36,"filter":36,"fontFeatureSettings":36,"breakAfter":36,"breakBefore":36,"breakInside":36,"columnCount":36,"columnFill":36,"columnGap":36,"columnRule":36,"columnRuleColor":36,"columnRuleStyle":36,"columnRuleWidth":36,"columns":36,"columnSpan":36,"columnWidth":36},"ie":{"transformOrigin":9,"transformOriginX":9,"gridArea":11,"gridRowEnd":11,"scrollSnapDestination":11,"gridGap":11,"gridRowStart":11,"flexWrap":10,"hyphens":11,"scrollSnapCoordinate":11,"gridAutoColumns":11,"flex":10,"scrollSnapType":11,"gridTemplateAreas":11,"gridAutoFlow":11,"grid":11,"gridTemplate":11,"breakAfter":11,"touchAction":10,"scrollSnapPointsX":11,"transform":9,"transformOriginY":9,"scrollSnapPointsY":11,"wrapMargin":11,"gridTemplateRows":11,"wrapFlow":11,"gridRowGap":11,"breakInside":11,"wrapThrough":11,"breakBefore":11,"flexFlow":10,"flowFrom":11,"gridAutoRows":11,"flowInto":11,"gridTemplateColumns":11,"gridColumnEnd":11,"gridColumnGap":11,"flexDirection":10,"gridColumn":11,"userSelect":11,"regionFragment":11,"gridRow":11,"gridColumnStart":11,"textSizeAdjust":11},"edge":{"userSelect":14,"wrapFlow":14,"wrapThrough":14,"wrapMargin":14,"scrollSnapType":14,"scrollSnapPointsX":14,"scrollSnapPointsY":14,"scrollSnapDestination":14,"scrollSnapCoordinate":14,"hyphens":14,"flowInto":14,"flowFrom":14,"breakBefore":14,"breakAfter":14,"breakInside":14,"regionFragment":14,"gridTemplateColumns":14,"gridTemplateRows":14,"gridTemplateAreas":14,"gridTemplate":14,"gridAutoColumns":14,"gridAutoRows":14,"gridAutoFlow":14,"grid":14,"gridRowStart":14,"gridColumnStart":14,"gridRowEnd":14,"gridRow":14,"gridColumn":14,"gridColumnEnd":14,"gridColumnGap":14,"gridRowGap":14,"gridArea":14,"gridGap":14},"ios_saf":{"flex":8.1,"flexBasis":8.1,"flexDirection":8.1,"flexGrow":8.1,"flexFlow":8.1,"flexShrink":8.1,"flexWrap":8.1,"alignContent":8.1,"alignItems":8.1,"alignSelf":8.1,"justifyContent":8.1,"order":8.1,"transition":6,"transitionDelay":6,"transitionDuration":6,"transitionProperty":6,"transitionTimingFunction":6,"transform":8.1,"transformOrigin":8.1,"transformOriginX":8.1,"transformOriginY":8.1,"backfaceVisibility":8.1,"perspective":8.1,"perspectiveOrigin":8.1,"transformStyle":8.1,"transformOriginZ":8.1,"animation":8.1,"animationDelay":8.1,"animationDirection":8.1,"animationFillMode":8.1,"animationDuration":8.1,"animationIterationCount":8.1,"animationName":8.1,"animationPlayState":8.1,"animationTimingFunction":8.1,"appearance":9.3,"userSelect":9.3,"backdropFilter":9.3,"fontKerning":9.3,"scrollSnapType":9.3,"scrollSnapPointsX":9.3,"scrollSnapPointsY":9.3,"scrollSnapDestination":9.3,"scrollSnapCoordinate":9.3,"boxDecorationBreak":9.3,"clipPath":9.3,"maskImage":9.3,"maskMode":9.3,"maskRepeat":9.3,"maskPosition":9.3,"maskClip":9.3,"maskOrigin":9.3,"maskSize":9.3,"maskComposite":9.3,"mask":9.3,"maskBorderSource":9.3,"maskBorderMode":9.3,"maskBorderSlice":9.3,"maskBorderWidth":9.3,"maskBorderOutset":9.3,"maskBorderRepeat":9.3,"maskBorder":9.3,"maskType":9.3,"textSizeAdjust":9.3,"textDecorationStyle":9.3,"textDecorationSkip":9.3,"textDecorationLine":9.3,"textDecorationColor":9.3,"shapeImageThreshold":9.3,"shapeImageMargin":9.3,"shapeImageOutside":9.3,"filter":9,"hyphens":9.3,"flowInto":9.3,"flowFrom":9.3,"breakBefore":8.1,"breakAfter":8.1,"breakInside":8.1,"regionFragment":9.3,"columnCount":8.1,"columnFill":8.1,"columnGap":8.1,"columnRule":8.1,"columnRuleColor":8.1,"columnRuleStyle":8.1,"columnRuleWidth":8.1,"columns":8.1,"columnSpan":8.1,"columnWidth":8.1},"android":{"borderImage":4.2,"borderImageOutset":4.2,"borderImageRepeat":4.2,"borderImageSlice":4.2,"borderImageSource":4.2,"borderImageWidth":4.2,"flex":4.2,"flexBasis":4.2,"flexDirection":4.2,"flexGrow":4.2,"flexFlow":4.2,"flexShrink":4.2,"flexWrap":4.2,"alignContent":4.2,"alignItems":4.2,"alignSelf":4.2,"justifyContent":4.2,"order":4.2,"transition":4.2,"transitionDelay":4.2,"transitionDuration":4.2,"transitionProperty":4.2,"transitionTimingFunction":4.2,"transform":4.4,"transformOrigin":4.4,"transformOriginX":4.4,"transformOriginY":4.4,"backfaceVisibility":4.4,"perspective":4.4,"perspectiveOrigin":4.4,"transformStyle":4.4,"transformOriginZ":4.4,"animation":4.4,"animationDelay":4.4,"animationDirection":4.4,"animationFillMode":4.4,"animationDuration":4.4,"animationIterationCount":4.4,"animationName":4.4,"animationPlayState":4.4,"animationTimingFunction":4.4,"appearance":47,"userSelect":47,"fontKerning":4.4,"textEmphasisPosition":47,"textEmphasis":47,"textEmphasisStyle":47,"textEmphasisColor":47,"boxDecorationBreak":47,"clipPath":47,"maskImage":47,"maskMode":47,"maskRepeat":47,"maskPosition":47,"maskClip":47,"maskOrigin":47,"maskSize":47,"maskComposite":47,"mask":47,"maskBorderSource":47,"maskBorderMode":47,"maskBorderSlice":47,"maskBorderWidth":47,"maskBorderOutset":47,"maskBorderRepeat":47,"maskBorder":47,"maskType":47,"filter":47,"fontFeatureSettings":47,"breakAfter":47,"breakBefore":47,"breakInside":47,"columnCount":47,"columnFill":47,"columnGap":47,"columnRule":47,"columnRuleColor":47,"columnRuleStyle":47,"columnRuleWidth":47,"columns":47,"columnSpan":47,"columnWidth":47},"and_chr":{"appearance":47,"userSelect":47,"textEmphasisPosition":47,"textEmphasis":47,"textEmphasisStyle":47,"textEmphasisColor":47,"boxDecorationBreak":47,"clipPath":47,"maskImage":47,"maskMode":47,"maskRepeat":47,"maskPosition":47,"maskClip":47,"maskOrigin":47,"maskSize":47,"maskComposite":47,"mask":47,"maskBorderSource":47,"maskBorderMode":47,"maskBorderSlice":47,"maskBorderWidth":47,"maskBorderOutset":47,"maskBorderRepeat":47,"maskBorder":47,"maskType":47,"textDecorationStyle":47,"textDecorationSkip":47,"textDecorationLine":47,"textDecorationColor":47,"filter":47,"fontFeatureSettings":47,"breakAfter":47,"breakBefore":47,"breakInside":47,"columnCount":47,"columnFill":47,"columnGap":47,"columnRule":47,"columnRuleColor":47,"columnRuleStyle":47,"columnRuleWidth":47,"columns":47,"columnSpan":47,"columnWidth":47},"and_uc":{"flex":9.9,"flexBasis":9.9,"flexDirection":9.9,"flexGrow":9.9,"flexFlow":9.9,"flexShrink":9.9,"flexWrap":9.9,"alignContent":9.9,"alignItems":9.9,"alignSelf":9.9,"justifyContent":9.9,"order":9.9,"transition":9.9,"transitionDelay":9.9,"transitionDuration":9.9,"transitionProperty":9.9,"transitionTimingFunction":9.9,"transform":9.9,"transformOrigin":9.9,"transformOriginX":9.9,"transformOriginY":9.9,"backfaceVisibility":9.9,"perspective":9.9,"perspectiveOrigin":9.9,"transformStyle":9.9,"transformOriginZ":9.9,"animation":9.9,"animationDelay":9.9,"animationDirection":9.9,"animationFillMode":9.9,"animationDuration":9.9,"animationIterationCount":9.9,"animationName":9.9,"animationPlayState":9.9,"animationTimingFunction":9.9,"appearance":9.9,"userSelect":9.9,"fontKerning":9.9,"textEmphasisPosition":9.9,"textEmphasis":9.9,"textEmphasisStyle":9.9,"textEmphasisColor":9.9,"maskImage":9.9,"maskMode":9.9,"maskRepeat":9.9,"maskPosition":9.9,"maskClip":9.9,"maskOrigin":9.9,"maskSize":9.9,"maskComposite":9.9,"mask":9.9,"maskBorderSource":9.9,"maskBorderMode":9.9,"maskBorderSlice":9.9,"maskBorderWidth":9.9,"maskBorderOutset":9.9,"maskBorderRepeat":9.9,"maskBorder":9.9,"maskType":9.9,"textSizeAdjust":9.9,"filter":9.9,"hyphens":9.9,"flowInto":9.9,"flowFrom":9.9,"breakBefore":9.9,"breakAfter":9.9,"breakInside":9.9,"regionFragment":9.9,"fontFeatureSettings":9.9,"columnCount":9.9,"columnFill":9.9,"columnGap":9.9,"columnRule":9.9,"columnRuleColor":9.9,"columnRuleStyle":9.9,"columnRuleWidth":9.9,"columns":9.9,"columnSpan":9.9,"columnWidth":9.9},"op_mini":{"borderImage":5,"borderImageOutset":5,"borderImageRepeat":5,"borderImageSlice":5,"borderImageSource":5,"borderImageWidth":5,"tabSize":5,"objectFit":5,"objectPosition":5}}; module.exports = caniuseData
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = calc;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calc(pluginInterface) {
    var property = pluginInterface.property;
    var value = pluginInterface.value;
    var prefix = pluginInterface.prefix;
    var keepUnprefixed = pluginInterface.keepUnprefixed;

    if (typeof value === 'string' && value.indexOf('calc(') > -1) {
        var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
            return value.replace(/calc\(/g, prefix + 'calc(');
        }).join(';' + property + ':');
        return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + property + ':' + value : ''));
    }
}

module.exports = exports['default'];
},{}],5:[function(require,module,exports){
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        if (!keepUnprefixed) {
            delete styles[property];
        }

        if (alternativeProps[property]) {
            return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
        }
        if (alternativeValues[value]) {
            return _defineProperty({}, property, alternativeValues[value] + (keepUnprefixed ? ';' + property + ':' + value : ''));
        }
    }
}

module.exports = exports['default'];
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = flexboxOld;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
                display: prefix.css + alternativeValues[value] + (keepUnprefixed ? ';' + property + ':' + value : '')
            };
        }
        if (alternativeProps[property]) {
            return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
        }
        if (alternativeValues[value]) {
            return _defineProperty({}, property, alternativeValues[value] + (keepUnprefixed ? ';' + property + ':' + value : ''));
        }
    }
}

module.exports = exports['default'];
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = gradient;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(pluginInterface) {
    var property = pluginInterface.property;
    var value = pluginInterface.value;
    var prefix = pluginInterface.prefix;
    var keepUnprefixed = pluginInterface.keepUnprefixed;

    if (typeof value === 'string' && value.match(values) !== null) {
        var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
            return prefix + value;
        }).join(';' + property + ':');
        return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + property + ':' + value : ''));
    }
}

module.exports = exports['default'];
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = sizing;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
            return prefix + value;
        }).join(';' + property + ':');
        return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + property + ':' + value : ''));
    }
}

module.exports = exports['default'];
},{}],11:[function(require,module,exports){
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