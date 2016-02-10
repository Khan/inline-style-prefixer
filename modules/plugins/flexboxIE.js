import camelToDashCase from '../utils/camelToDashCase'

const alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  flex: '-ms-flexbox',
  'inline-flex': '-ms-inline-flexbox'
}
const alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
}

const properties = Object.keys(alternativeProps).concat('display').reduce((result, prop) => ({...result, [prop]: true}), {})

export default function flexboxIE(pluginInterface) {
  const {property, value, styles, prefix, keepUnprefixed} = pluginInterface

  if (
    properties[property]
  ) {
    const dashCaseProperty = camelToDashCase(property)

    if (!keepUnprefixed) {
      delete styles[property]
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
