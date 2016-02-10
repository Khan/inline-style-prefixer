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