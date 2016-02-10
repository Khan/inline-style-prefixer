import camelToDashCase from '../utils/camelToDashCase'

const alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
}

const alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
}

const properties = Object.keys(alternativeProps).concat(['alignContent', 'alignSelf', 'display', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection']).reduce((result, prop) => ({...result, [prop]: true}), {})


export default function flexboxOld(pluginInterface) {
  const {property, value, styles, prefix, keepUnprefixed} = pluginInterface

  if (
    properties[property]
  ) {
    const dashCaseProperty = camelToDashCase(property)

    if (!keepUnprefixed) {
      delete styles[property]
    }
    if (property === 'flexDirection') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      }
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: prefix.css + alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : '')
      }
    }
    if (alternativeProps[property]) {
      return {
        [alternativeProps[property]]: alternativeValues[value] || value
      }
    }
    if (alternativeValues[value]) {
      return {
        [property]: alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : '')
      }
    }
  }
}
