import { color, gapSize, iconMicroSize, rem, style } from '../styles'

export const root = style()

export const size = style({
  height: rem(iconMicroSize),
  marginLeft: rem(gapSize),
  marginRight: rem(2 * gapSize),
  width: rem(iconMicroSize)
})

export const gold = style({
  color: color('#e5be45').toString()
})

export const silver = style({
  color: color('#cbcac8').toString()
})

export const copper = style({
  color: color('#a0673a').toString()
})
