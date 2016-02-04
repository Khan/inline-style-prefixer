export default function calc(pluginInterface) {
  const { property, value, prefix, keepUnprefixed } = pluginInterface

  if (
    typeof value === 'string' && value.indexOf('calc(') > -1
  ) {
    let newValue = [ '-webkit-', '-moz-' ].map(prefix => value.replace(/calc\(/g, prefix + 'calc(')).join(';' + property + ':')
    return {
      [property]: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
