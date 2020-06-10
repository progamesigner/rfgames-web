import { style } from '../styles'

export const root = style({
  position: 'relative',
  $nest: {
    '&, &::before, &::after, *': {
      boxSizing: 'border-box'
    }
  }
})

export const block = style({
  display: 'block'
})

export const inline = style({
  display: 'inline-block'
})
