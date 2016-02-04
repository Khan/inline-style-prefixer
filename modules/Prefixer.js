import getBrowserInformation from './utils/getBrowserInformation'
import capitalizeString from './utils/capitalizeString'
import assign from './utils/assign'
import caniuseData from './caniuseData'
import plugins from './Plugins'

const prefixes = caniuseData;
const browserInfo = getBrowserInformation()

export default class Prefixer {
  /**
   * Returns a prefixed version of the style object using all vendor prefixes
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */
  static prefixAll(styles) {
    styles = assign({}, styles)

    Object.keys(styles).forEach(property => {
      let value = styles[property]
      if (value instanceof Object) {
        // recurse through nested style objects
        styles[property] = Prefixer.prefixAll(value)
      } else {
        let browsers = Object.keys(browserInfo.prefixes)
        browsers.forEach(browser => {
          let style = browserInfo.prefixes[browser]
          // add prefixes if needed
          if (prefixes[property] != null) {
            styles[style.inline + capitalizeString(property)] = value
          }
        })

        // resolve plugins for each browser
        plugins.forEach(plugin => {
          const resolvedStyles = plugin({
            property: property,
            value: value,
            styles: styles,
            prefix: {},
            keepUnprefixed: true,
            requiresPrefix: prefixes
          })
          assign(styles, resolvedStyles)
        })
      }
    })

    return styles
  }
}
