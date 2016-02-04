const values = { flex: true, 'inline-flex': true }

export default function flex(pluginInterface) {
  const { property, value, prefix, keepUnprefixed } = pluginInterface

  if (
    property === 'display' && values[value]
  ) {
    let newValue = [ '-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value ].join(';' + property + ':')
    return {
      display: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    }
  }
}
