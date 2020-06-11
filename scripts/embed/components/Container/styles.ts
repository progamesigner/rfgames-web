import { style, fonts } from '../styles'

export const root = style({
  ...fonts.embedContainer,
  display: 'inline-block',
  $nest: {
    '&, &::before, &::after, *': {
      boxSizing: 'border-box'
    }
  }
})
