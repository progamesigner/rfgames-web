import { cx } from '../../libs'
import { GW2Trait, GW2TraitSlot, GW2TraitTier } from '../../types'

export { bindTooltipEvents, buildWikiLink } from '../helpers'

export function parseTraitClassNames(trait: GW2Trait): string {
  return cx(
    'is-trait',
    `is-trait-${trait.name.toLowerCase()}`,
    {
      'is-proficiency-tier': trait.tier === GW2TraitTier.PROFICIENCY,
      'is-adept-tier': trait.tier === GW2TraitTier.ADEPT,
      'is-master-tier': trait.tier === GW2TraitTier.MASTER,
      'is-grandmaster-tier': trait.tier === GW2TraitTier.GRANDMASTER
    },
    {
      'is-slot-major': trait.slot === GW2TraitSlot.MAJOR,
      'is-slot-minor': trait.slot === GW2TraitSlot.MINOR
    }
  )
}
