import { rem, sizes, style, stylesheet } from '../styles'

export const icon = stylesheet({
  root: {
  },
  block: {
    height: rem(sizes.professionIcon),
    width: rem(sizes.professionIcon)
  },
  inline: {
    height: rem(sizes.inlineIcon),
    width: rem(sizes.inlineIcon)
  }
})

export const link = style()

export const name = style()
