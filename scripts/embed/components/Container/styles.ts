import { gapSize, rem, style } from '../styles'

export const root = style({
  display: 'block',
  $nest: {
    ':not(:last-child)': {
      marginRight: rem(gapSize)
    }
  }
})

export const inline = style({
  display: 'inline-block'
})
