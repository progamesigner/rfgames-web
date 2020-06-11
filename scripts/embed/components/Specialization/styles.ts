import { percent, polygon, rem, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

const hexagonPoints = [
  [50, 0],
  [93, 25],
  [93, 75],
  [50, 100],
  [7, 75],
  [7, 25]
].map(([x, y]) => `${percent(x)} ${percent(y)}`)

export const icon = stylesheet({
  root: {
    clipPath: polygon(hexagonPoints)
  },
  size: {
    height: rem(sizes.specializationIcon),
    width: rem(sizes.specializationIcon)
  },
  inline: {
    height: rem(sizes.inlineIcon),
    width: rem(sizes.inlineIcon)
  }
})

export const iconSize = style({
  height: rem(sizes.specializationIcon),
  width: rem(sizes.specializationIcon)
})

export const name = style()

export const link = style()

export const tooltip = stylesheet({
  head: {
    color: colors.tooltipSkillTitle.toString()
  }
})
