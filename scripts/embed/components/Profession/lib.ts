import { cx } from '../../libs'
import { GW2Profession } from '../../types'

export { buildWikiLink, markup } from '../lib'

export function parseProfessionClassNames(profession: GW2Profession): string {
  return cx(
    'is-profession',
    `is-${profession.name.toLowerCase()}`
  )
}
