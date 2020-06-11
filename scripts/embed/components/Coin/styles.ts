import { colors, em, layouts, sizes, style, stylesheet } from '../styles'

export const root = style()

export const icon = stylesheet({
  root: {
    marginLeft: em(layouts.gap),
    marginRight: em(layouts.gap * 2)
  },
  size: {
    height: em(sizes.coinIcon),
    width: em(sizes.coinIcon)
  }
})

export const gold = style({
  color: colors.coinCopper.toString()
})

export const silver = style({
  color: colors.coinSilver.toString()
})

export const copper = style({
  color: colors.coinCopper.toString()
})
