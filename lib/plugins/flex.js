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