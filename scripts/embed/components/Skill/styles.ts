import { style, stylesheet } from '../../libs'

import { colors } from '../styles'

export const icon = style()

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
  },
  reminder: {
    color: colors.formatReminder.toString()
  },
  skilltype: {
    color: colors.formatSkill.toString()
  }
})
