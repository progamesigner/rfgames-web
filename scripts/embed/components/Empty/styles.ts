import { rem, style, stylesheet } from '../../libs'

import { sizes } from '../styles'

export const icon = stylesheet({
  root: {
  },
  size: {
    height: rem(sizes.emptyIcon),
    width: rem(sizes.emptyIcon)
  },
  inline: {
    height: rem(sizes.inlineIcon),
    width: rem(sizes.inlineIcon)
  }
})

export const text = style()
