import { Store } from 'redux'
import { sortBy } from 'lodash/fp'

import { hideTooltip, showTooltip } from '../actions'
import {
  GW2Fact,
  GW2FactType,
  ExtractTooltipDataType,
  TooltipType
} from '../types'

const factOrders = {
  [GW2FactType.RECHARGE]: 0,
  [GW2FactType.DAMAGE]: 1,
  [GW2FactType.HEAL]: 2,
  [GW2FactType.HEALING_ADJUST]: 3,
  [GW2FactType.BUFF]: 4,
  [GW2FactType.PREFIXED_BUFF]: 5,
  [GW2FactType.ATTRIBUTE_ADJUST]: 6,
  [GW2FactType.BUFF_CONVERSION]: 7,
  [GW2FactType.PERCENT]: 8,
  [GW2FactType.NUMBER]: 9,
  [GW2FactType.DURATION]: 10,
  [GW2FactType.TIME]: 11,
  [GW2FactType.RADIUS]: 12,
  [GW2FactType.DISTANCE]: 13,
  [GW2FactType.COMBO_FINISHER]: 14,
  [GW2FactType.COMBO_FIELD]: 15,
  [GW2FactType.UNBLOCKABLE]: 16,
  [GW2FactType.STUN_BREAK]: 17,
  [GW2FactType.NO_DATA]: 18,
  [GW2FactType.RANGE]: 19
}

type TooltipEvents = {
  onmouseenter(): void;
  onmouseleave(): void;
  ontouchend(): void;
}

export function bindTooltipEvents<T extends TooltipType>(
  store: Store,
  type: T,
  data: ExtractTooltipDataType<T>
): TooltipEvents {
  const hide = () => store.dispatch(hideTooltip())
  const show = () => store.dispatch(showTooltip(type, data))

  return {
    onmouseenter: show,
    onmouseleave: hide,
    ontouchend: show
  }
}

export function buildWikiLink(to: string, lang = 'en'): string {
  return `https://wiki-${lang}.guildwars2.com/wiki/Special:Search/${encodeURIComponent(to)}`
}

export function sortFacts(facts: Array<GW2Fact>): Array<GW2Fact> {
  return sortBy((fact: GW2Fact) => factOrders[fact.type])(facts)
}
