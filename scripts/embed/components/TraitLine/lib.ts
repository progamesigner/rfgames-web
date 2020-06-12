import { cx } from '../../libs'
import { GW2Specialization } from '../../types'

export { bindTooltipEvents } from '../helpers'

export const enum TraitMode {
  ID = 0,
  POSITION = 1
}

export const enum TraitPosition {
  NONE = 0,
  TOP = 1,
  MIDDLE = 2,
  BOTTOM = 3
}

export type TraitSelection = [TraitMode, TraitPosition | number]

export function isTraitActive(
  traitId: number,
  selectedTraitIds: Array<number>
): boolean {
  return selectedTraitIds.includes(traitId)
}

export function mapSelectionToIds(
  specialization: GW2Specialization,
  traitSelections: Array<TraitSelection>
): Array<number> {
  return traitSelections.map(([mode, value], tier) => {
    switch (mode) {
      case TraitMode.POSITION:
        return (
          value !== TraitPosition.NONE ?
          specialization.major_traits[value + tier * 3 - 1] :
          0
        )
      case TraitMode.ID:
      default:
        return value
    }
  })
}

export function parseTraitlineClassNames(
  specialization: GW2Specialization
): string {
  return cx(
    'is-traitline',
    `is-${specialization.name.toLowerCase()}`,
    `is-specialization-by-${specialization.profession.toLowerCase()}`,
    { 'is-elite-specialization': specialization.elite }
  )
}
