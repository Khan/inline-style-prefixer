const values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
}

export default function cursor(pluginInterface) {
  const { property, value, prefix, keepUnprefixed } = pluginInterface

  if (
    property === 'cursor' && values[value]
  ) {
    let newValue = [ '-webkit-', '-moz-' ].map(prefix => prefix + value).join(';' + property + ':')
    return {
      cursor: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
