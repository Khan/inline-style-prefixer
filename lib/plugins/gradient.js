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