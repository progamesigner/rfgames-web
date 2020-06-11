import { cx } from '../../libs'
import { GW2Profession } from '../../types'

export { markup } from '../format'
export { buildWikiLink } from '../helpers'

export function parseProfessionClassNames(profession: GW2Profession): string {
  return cx(
    'is-profession',
    `is-${profession.name.toLowerCase()}`
  )
}
