import { em, sizes, style, stylesheet } from '../styles'

export const icon = stylesheet({
  root: {
  },
  block: {
    height: em(sizes.skillIcon),
    width: em(sizes.skillIcon)
  },
  inline: {
    height: em(sizes.inlineIcon),
    width: em(sizes.inlineIcon)
  }
})

export const name = style()

export const link = style()
