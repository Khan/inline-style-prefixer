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