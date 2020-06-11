import { em, percent, polygon, style, stylesheet } from '../../libs'

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
  block: {
    height: em(sizes.specializationIcon),
    width: em(sizes.specializationIcon)
  },
  inline: {
    height: em(sizes.inlineIcon),
    width: em(sizes.inlineIcon)
  }
})

export const name = style()

export const link = style()

export const tooltip = stylesheet({
  head: {
    color: colors.tooltipSkillTitle.toString()
  }
})
