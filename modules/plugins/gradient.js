const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/

export default function gradient(pluginInterface) {
  const { property, value, prefix, keepUnprefixed } = pluginInterface

  if (
    typeof value === 'string' && value.match(values) !== null
  ) {
    let newValue = [ '-webkit-', '-moz-' ].map(prefix => prefix + value).join(';' + property + ':')
    return {
      [property]: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
