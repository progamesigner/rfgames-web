import { cx } from '../../libs'
import { GW2Skill } from '../../types'

export { bindTooltipEvents, buildWikiLink } from '../libs'

export function parseSkillClassNames(skill: GW2Skill): string {
  return cx(
    'is-skill',
    skill.categories ? skill.categories.map(category => `is-category-${category.toLowerCase()}`) : null,
    skill.slot ? `is-slot-${skill.slot.toLowerCase()}` : null,
    skill.type ? `is-type-${skill.type.toLowerCase()}` : null
  )
}
