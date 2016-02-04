import camelToDashCase from '../utils/camelToDashCase'
import capitalizeString from '../utils/capitalizeString'

const propertyRegexp = /^(WebkitT|MozT|msT|t)ransition(Property|)$/;

export default function calc(pluginInterface) {
  const { property, value, prefix, keepUnprefixed, requiresPrefix } = pluginInterface

  let match;

  if (
    typeof value === 'string' && (match = property.match(propertyRegexp))
  ) {
    const newProperty = 'transition' + match[2];
    const requiresPrefixDashCased = Object.keys(requiresPrefix).map(newProperty => camelToDashCase(newProperty))
    let newValue = value

    // only split multi values, not cubic beziers
    const multipleValues = newValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

    requiresPrefixDashCased.forEach(newProperty => {
      multipleValues.forEach((val, index) => {
        if (val.indexOf(newProperty) > -1) {
          let newVal = [ '-webkit-', '-moz-', '-ms-' ].map(prefix => val.replace(newProperty, prefix + newProperty)).join(',');
          multipleValues[index] = newVal + (keepUnprefixed ? ',' + val : '')
        }
      })
    })
    const outputValue = multipleValues.join(',')
    return {
      ['Webkit' + capitalizeString(newProperty)]: outputValue,
      ['Moz' + capitalizeString(newProperty)]: outputValue,
      ['ms' + capitalizeString(newProperty)]: outputValue,
      [newProperty]: outputValue
    }
  }
}
