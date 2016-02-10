import camelToDashCase from '../utils/camelToDashCase'

const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

export default function gradient(pluginInterface) {
  const { property, value, prefix, keepUnprefixed } = pluginInterface

  if (
    typeof value === 'string' && value.match(values) !== null
  ) {
    const dashCaseProperty = camelToDashCase(property)

    let newValue = [ '-webkit-', '-moz-' ].map(prefix => prefix + value).join(';' + dashCaseProperty + ':')
    return {
      [property]: newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : '')
    }
  }
}
