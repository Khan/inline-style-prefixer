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