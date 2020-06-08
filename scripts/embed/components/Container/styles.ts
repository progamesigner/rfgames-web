import { rem, sizes, style } from '../styles'

export const root = style({
  display: 'block',
  $nest: {
    ':not(:last-child)': {
      marginRight: rem(sizes.gap)
    }
  }
})

export const inline = style({
  display: 'inline-block'
})
