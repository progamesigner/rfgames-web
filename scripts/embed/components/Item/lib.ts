import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemType,
} from '../../types'

export { bindTooltipEvents, buildWikiLink } from '../helpers'

function getDetailType(item: GW2Item): string | null {
  switch (item.type) {
    case GW2ItemType.ARMOR:
    case GW2ItemType.CONSUMABLE:
    case GW2ItemType.GIZMO:
    case GW2ItemType.TOOL:
    case GW2ItemType.TRINKET:
    case GW2ItemType.UPGRADE_COMPONENT:
    case GW2ItemType.WEAPON:
      return item.details.type
  }
  return null
}

export function parseItemClassNames(item: GW2Item): string {
  const kind = getDetailType(item)
  return cx(
    'is-item',
    `is-type-${item.type.toLowerCase()}`,
    kind ? `is-kind-${kind.toLowerCase()}` : null,
    `is-rarity-${item.rarity.toLowerCase()}`
  )
}
