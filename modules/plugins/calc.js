import camelToDashCase from '../utils/camelToDashCase'

export default function calc(pluginInterface) {
  const { property, value, prefix, keepUnprefixed } = pluginInterface

  if (
    typeof value === 'string' && value.indexOf('calc(') > -1
  ) {
    const dashCaseProperty = camelToDashCase(property)

    let newValue = [ '-webkit-', '-moz-' ].map(prefix => value.replace(/calc\(/g, prefix + 'calc(')).join(';' + dashCaseProperty + ':')
    return {
      [property]: newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : '')
    }
  }
}
