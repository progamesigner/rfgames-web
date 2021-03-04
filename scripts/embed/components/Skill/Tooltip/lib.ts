import { replace } from 'rambda'

export { markup } from '../../format'
export { applyTraitedFacts, sortFacts } from '../../helpers'

export const addSkillTypeTags = replace(
  /^([a-zA-Z\u00C0-\u017F]+ ?[a-zA-Z\u00C0-\u017F]*.?[:.])/gm,
  '<c=@skilltype>$1</c>'
)
