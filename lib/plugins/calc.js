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