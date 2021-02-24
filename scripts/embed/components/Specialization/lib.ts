import { cx } from '../../libs'
import { GW2Specialization } from '../../types'

export { bindTooltipEvents, buildWikiLink } from '../helpers'

export function parseSpecializationClassNames(
  specialization: GW2Specialization
): string {
  return cx(
    'is-specialization',
    `is-${specialization.name.toLowerCase()}`,
    `is-specialization-by-${specialization.profession.toLowerCase()}`,
    {
      'is-elite-specialization': specialization.elite
    }
  )
}
