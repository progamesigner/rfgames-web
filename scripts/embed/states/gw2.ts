import { clearCacheIfRequested, makeResourceKey, parse } from '../libs'
import {
  ExtractGW2ResourceType,
  ExtractGW2State,
  GW2AsyncState,
  GW2Resources
} from '../types'

type GW2InitialState = Record<string, ExtractGW2State<GW2Resources>>

function mapCacheToStore<T extends GW2Resources>(
  items: Array<ExtractGW2ResourceType<T>>
) {
  return Object.values(items).reduce((state, item) => ({
    ...state,
    [item.id]: {
      data: item,
      error: null,
      state: GW2AsyncState.DONE
    }
  }), {} as ExtractGW2State<T>)
}

function stateFactory<T extends GW2Resources>(
  resource: T,
  language: string
): Record<string, ExtractGW2State<T>> {
  const localStorageKey = makeResourceKey(resource, language)

  clearCacheIfRequested(localStorageKey)

  return {
    [resource]: {
      ...mapCacheToStore(parse<Array<ExtractGW2ResourceType<T>>>(localStorageKey))
    }
  }
}

export function gw2InitialState(language: string): GW2InitialState {
  return {
    ...stateFactory(GW2Resources.ITEM, language),
    ...stateFactory(GW2Resources.ITEM_STAT, language),
    ...stateFactory(GW2Resources.PET, language),
    ...stateFactory(GW2Resources.PROFESSION, language),
    ...stateFactory(GW2Resources.SKILL, language),
    ...stateFactory(GW2Resources.SPECIALIZATION, language),
    ...stateFactory(GW2Resources.TRAIT, language)
  }
}
