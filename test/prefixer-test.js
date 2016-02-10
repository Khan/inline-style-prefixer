import { expect } from 'chai'
import Prefixer from '../lib/Prefixer'

describe('Combine all supported browser prefixes', () => {
  it('should resolve common required vendor properties', () => {
    const input = {
      transition: '200ms all linear',
      height: '100px',
      width: '200px'
    }
    const output = {
      MozTransition: '200ms all linear',
      WebkitTransition: '200ms all linear',
      msTransition: '200ms all linear',
      transition: '200ms all linear',
      height: '100px',
      width: '200px'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })
  it('should resolve every plugin by default', () => {
    const input = {
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    const output = {
      MozAlignItems: 'center',
      WebkitAlignItems: 'center',
      WebkitBoxAlign: 'center',
      msAlignItems: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      height: '100px',
      width: '200px'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })

  it('should prefix every property within transition values', () => {
    const input = {
      transition: '200ms linear appearance, 100ms linear width'
    }
    const output = {
      WebkitTransition: '200ms linear -webkit-appearance,200ms linear -moz-appearance,200ms linear -ms-appearance,200ms linear appearance, 100ms linear width',
      MozTransition: '200ms linear -webkit-appearance,200ms linear -moz-appearance,200ms linear -ms-appearance,200ms linear appearance, 100ms linear width',
      msTransition: '200ms linear -webkit-appearance,200ms linear -moz-appearance,200ms linear -ms-appearance,200ms linear appearance, 100ms linear width',
      transition: '200ms linear -webkit-appearance,200ms linear -moz-appearance,200ms linear -ms-appearance,200ms linear appearance, 100ms linear width'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })

  it('should add all relevant prefixes for plugins', () => {
    const input = { width: 'calc(30px)' }
    const output = {
      width: '-webkit-calc(30px);width:-moz-calc(30px);width:calc(30px)'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)

    const input2 = { display: 'flex' }
    const output2 = {
      display: '-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex'
    }
    expect(Prefixer.prefixAll(input2)).to.eql(output2)

    const input3 = { display: 'inline-flex' }
    const output3 = {
      display: '-webkit-box;display:-moz-box;display:-ms-inline-flexbox;display:-webkit-inline-flex;display:inline-flex'
    }
    expect(Prefixer.prefixAll(input3)).to.eql(output3)

    const input4 = { width: 'min-content' }
    const output4 = {
      width: '-webkit-min-content;width:-moz-min-content;width:min-content'
    }
    expect(Prefixer.prefixAll(input4)).to.eql(output4)
  })

  it('should not add extra prefixes to an already prefixed transition property', () => {
    const input = { WebkitTransition: 'width 1s', }
    const output = {
      transition: 'width 1s',
      WebkitTransition: 'width 1s',
      MozTransition: 'width 1s',
      msTransition: 'width 1s',
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })

  it('should camel-case properties in strings', () => {
    const input = {
      marginLeft: 'calc(50%)',
      backgroundImage: 'linear-gradient(135deg, red, blue)',
      alignContent: 'flex-end',
      maxWidth: 'min-content',
    }
    const output = {
      marginLeft: '-webkit-calc(50%);margin-left:-moz-calc(50%);margin-left:calc(50%)',

      backgroundImage: '-webkit-linear-gradient(135deg, red, blue);background-image:-moz-linear-gradient(135deg, red, blue);background-image:linear-gradient(135deg, red, blue)',

      alignContent: 'end;align-content:flex-end',
      MozAlignContent: 'flex-end',
      WebkitAlignContent: 'flex-end',
      msAlignContent: 'flex-end',
      msFlexLinePack: 'end',

      maxWidth: '-webkit-min-content;max-width:-moz-min-content;max-width:min-content'
    }
    expect(Prefixer.prefixAll(input)).to.eql(output)
  })
})
