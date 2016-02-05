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