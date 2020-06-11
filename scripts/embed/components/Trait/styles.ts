import { em, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

export const icon = stylesheet({
  root: {
  },
  block: {
    height: em(sizes.traitIcon),
    width: em(sizes.traitIcon)
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

export const flavors = stylesheet({
  abilitytype: {
    color: colors.formatAbilityType.toString()
  }
})
