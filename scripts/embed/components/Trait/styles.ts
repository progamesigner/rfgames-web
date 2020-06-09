import { rem, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

export const icon = style({
  height: rem(sizes.traitIcon),
  width: rem(sizes.traitIcon)
})

export const link = style()

export const name = style()

export const tooltip = stylesheet({
  head: {
    color: colors.tooltipSkillTitle.toString()
  }
})

export const flavors = stylesheet({
  abilitytype: {
    color: colors.formatAbilityType.toString()
  }
})
