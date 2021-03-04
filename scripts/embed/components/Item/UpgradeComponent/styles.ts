import {
  colors,
  em,
  layouts,
  margin,
  sizes,
  style,
  stylesheet
} from '../../styles'

export { flavors } from '../../styles'

export const root = style({
  margin: margin(em(layouts.gap * 2), 0)
})

export const bonus = stylesheet({
  active: {
    color: colors.bonusActive.toString()
  },
  inactive: {
    color: colors.bonusInactive.toString()
  }
})

export const count = style({
  marginLeft: em(layouts.gap)
})

export const icon = style({
  flexGrow: 0,
  flexShrink: 0,
  marginRight: em(layouts.gap)
})

export const iconSize = style({
  height: em(sizes.tooltipUpgradeIcon),
  width: em(sizes.tooltipUpgradeIcon)
})

export const name = style({
  color: colors.bonusActive.toString()
})

export const stat = style({
  color: colors.statBuff.toString()
})
