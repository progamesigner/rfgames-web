import { colors, rem, sizes, style } from '../styles'

export const root = style()

export const icon = style({
  marginLeft: rem(sizes.gap),
  marginRight: rem(2 * sizes.gap)
})

export const iconSize = style({
  height: rem(sizes.coinIcon),
  width: rem(sizes.coinIcon)
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
