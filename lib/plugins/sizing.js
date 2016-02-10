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