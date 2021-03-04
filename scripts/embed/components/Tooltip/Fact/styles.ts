import {
  colors,
  em,
  fonts,
  layouts,
  sizes,
  style,
  zIndices
} from '../../styles'

export const root = style({
  ...fonts.fact,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row'
})

export const icon = style({
  flexShrink: 0
})

export const iconSize = style({
  height: em(sizes.factIcon),
  width: em(sizes.factIcon)
})

export const text = style({
  color: colors.tooltipFact.toString(),
  marginLeft: em(layouts.gap)
})

export const traited = style({
  color: colors.tooltipTraitedFact.toString()
})

export const recharge = style({
  position: 'absolute',
  right: em(layouts.rechargeOffset),
  top: em(layouts.rechargeOffset),
  zIndex: zIndices.rechargeIcon
})

export const rechargeIcon = style({
  height: em(sizes.tooltipRechargeIcon),
  marginLeft: em(layouts.gap),
  width: em(sizes.tooltipRechargeIcon)
})
