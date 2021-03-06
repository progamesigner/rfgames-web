import { cx } from '../../libs'
import { GW2Specialization } from '../../types'

export { bindTooltipEvents } from '../lib'

export function isTraitActive(
  traitId: number,
  selectedTraitIds: ReadonlyArray<number>
): boolean {
  return selectedTraitIds.includes(traitId)
}

export function parseTraitlineClassNames(
  specialization: GW2Specialization
): string {
  return cx(
    'is-traitline',
    `is-${specialization.name.toLowerCase()}`,
    `is-specialization-by-${specialization.profession.toLowerCase()}`,
    {
      'is-elite-specialization': specialization.elite
    }
  )
}
