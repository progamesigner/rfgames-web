import { Store } from 'redux'
import { omit, sortBy } from 'rambda'
import { debounce } from 'throttle-debounce'

import { hideTooltip, showTooltip, updateHidability } from '../actions'
import { config } from '../config'
import {
  ExtractTooltipDataType,
  GW2Fact,
  GW2FactType,
  GW2TraitedFact,
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
  onmouseenter(event: MouseEvent): void;
  onmouseleave(event: MouseEvent): void;
  ontouchend(event: TouchEvent): void;
}

const omitTraitedFactFields = omit(['overrides', 'requires_trait'])

interface TraitedFact {
  fact: GW2Fact;
  traited: boolean;
}

export function applyTraitedFacts(
  facts: Array<GW2Fact>,
  traits: Array<number>,
  traitedFacts: Array<GW2TraitedFact> = [],
): Array<TraitedFact> {
  const untratedFacts = Array.prototype.concat(
    [],
    facts.map<TraitedFact>(fact => ({
      fact,
      traited: false
    }))
  )

  return traitedFacts
    .filter(fact => traits.includes(fact.requires_trait))
    .map(fact => ({
      fact: omitTraitedFactFields(fact) as GW2Fact,
      index: fact.overrides || -1
    }))
    .reduce((facts, { fact, index }) => {
      const traitedFact = {
        fact,
        traited: true
      }

      if (index > 0) {
        facts.splice(index, 1, traitedFact)
      } else {
        facts.push(traitedFact)
      }

      return facts
    }, untratedFacts)
}

export function bindTooltipEvents<T extends TooltipType>(
  store: Store,
  type: T,
  data: ExtractTooltipDataType<T>
): TooltipEvents {
  const debounced = debounce(config.tooltipDebouncedWait, () => {
    const {
      tooltipHidable,
    } = store.getState()

    if (tooltipHidable) {
      store.dispatch(hideTooltip())
    }
  })

  const hide = (event: MouseEvent) => {
    store.dispatch(updateHidability(true))
    debounced()
    event.preventDefault()
  }

  const show = (event: MouseEvent | TouchEvent) => {
    store.dispatch(updateHidability(false))
    store.dispatch(showTooltip(type, data))

    // @note: trigger redraw on touch-enabled devices by "mousemove" event
    if ('touches' in event) {
      window.dispatchEvent(new MouseEvent('mousemove', {
        clientX: event.changedTouches[0].clientX,
        clientY: event.changedTouches[0].clientY,
        screenX: event.changedTouches[0].screenX,
        screenY: event.changedTouches[0].screenY
      }))
    }

    event.preventDefault()
  }

  return {
    onmouseenter: show,
    onmouseleave: hide,
    ontouchend: show
  }
}

export function buildWikiLink(store: Store, to: string): string {
  const {
    language
  } = store.getState()

  return `https://wiki-${language || config.gw2ApiDefaultLanguage}.guildwars2.com/wiki/Special:Search/${encodeURIComponent(to)}`
}

export function sortFacts<T>(
  facts: ReadonlyArray<T>,
  typer: (fact: T) => GW2FactType
): ReadonlyArray<T> {
  return sortBy((fact: T) => factOrders[typer(fact)])(facts)
}
