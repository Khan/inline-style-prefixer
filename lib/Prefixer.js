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

var prefixes = _caniuseData2['default'];
var browserInfo = (0, _utilsGetBrowserInformation2['default'])();

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
            if (prefixes[property] != null) {
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