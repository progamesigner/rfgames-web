import { rem, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

export const icon = style({
  clipPath: 'polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
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
