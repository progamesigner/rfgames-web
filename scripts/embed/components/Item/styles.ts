import { em, sizes, style, stylesheet } from '../styles'

export const icon = stylesheet({
  root: {
  },
  block: {
    height: em(sizes.itemIcon),
    width: em(sizes.itemIcon)
  },
  inline: {
    height: em(sizes.inlineIcon),
    width: em(sizes.inlineIcon)
  }
})

export const link = style()

export const name = style()
