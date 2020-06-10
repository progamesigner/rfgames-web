import { percent, polygon, rem, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

const HEXAGON_POINTS = [
  [50, 0],
  [93, 25],
  [93, 75],
  [50, 100],
  [7, 75],
  [7, 25]
].map(([x, y]) => `${percent(x)} ${percent(y)}`)

export const icon = style({
  clipPath: polygon(HEXAGON_POINTS),
  height: rem(sizes.specializationIcon),
  width: rem(sizes.specializationIcon)
})

export const link = style()

export const name = style()

export const tooltip = stylesheet({
  head: {
    color: colors.tooltipSkillTitle.toString()
  }
})
