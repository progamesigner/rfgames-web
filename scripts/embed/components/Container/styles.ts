import { style } from '../styles'

export const root = style({
  display: 'inline-block',
  position: 'relative',
  $nest: {
    '&, &::before, &::after, *': {
      boxSizing: 'border-box'
    }
  }
})
