import { em, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

export const icon = stylesheet({
  root: {
  },
  block: {
    height: em(sizes.skillIcon),
    width: em(sizes.skillIcon)
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
  },
  body: {
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
