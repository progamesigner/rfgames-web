import { rem, sizes, style } from '../styles'

export const root = style({
  $nest: {
    ':not(:last-child)': {
      marginRight: rem(sizes.gap)
    }
  }
})

export const block = style({
  display: 'block'
})

export const inline = style({
  display: 'inline-block'
})
