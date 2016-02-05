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