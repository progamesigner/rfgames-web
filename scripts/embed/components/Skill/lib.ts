import { replace } from 'rambda'

import { cx } from '../../libs'
import { GW2Skill } from '../../types'

export { markup } from '../format'
export {
  applyTraitedFacts,
  bindTooltipEvents,
  buildWikiLink,
  sortFacts
} from '../helpers'

export const addSkillTypeTags = replace(
  /^([a-zA-Z\u00C0-\u017F]+ ?[a-zA-Z\u00C0-\u017F]*.?[:.])/gm,
  '<c=@skilltype>$1</c>'
)

export function parseSkillClassNames(skill: GW2Skill): string {
  return cx(
    'is-skill',
    skill.categories ? skill.categories.map(category => `is-category-${category.toLowerCase()}`) : null,
    skill.slot ? `is-slot-${skill.slot.toLowerCase()}` : null,
    skill.type ? `is-type-${skill.type.toLowerCase()}` : null
  )
}
