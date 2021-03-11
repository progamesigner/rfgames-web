import { replace } from 'rambda'

export { applyTraitedFacts, markup, sortFacts } from '../../libs'

export const addSkillTypeTags = replace(
  /^([a-zA-Z\u00C0-\u017F]+ ?[a-zA-Z\u00C0-\u017F]*.?[:.])/gm,
  '<c=@skilltype>$1</c>'
)
