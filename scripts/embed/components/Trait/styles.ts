import { rem, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

export const icon = stylesheet({
  root: {
  },
  size: {
    height: rem(sizes.traitIcon),
    width: rem(sizes.traitIcon)
  },
  inline: {
    height: rem(sizes.inlineIcon),
    width: rem(sizes.inlineIcon)
  }
})

export const name = style()

export const link = style()

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
