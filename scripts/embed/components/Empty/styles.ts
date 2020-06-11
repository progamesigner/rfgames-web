import { em, sizes, style, stylesheet } from '../styles'

export const icon = stylesheet({
  root: {
  },
  block: {
    height: em(sizes.emptyIcon),
    width: em(sizes.emptyIcon)
  },
  inline: {
    height: em(sizes.inlineIcon),
    width: em(sizes.inlineIcon)
  }
})

export const text = style()
