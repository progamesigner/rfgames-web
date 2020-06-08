import { values } from 'lodash/fp'

import { clearCacheIfNewBuild, get, makeResourceKey } from '../libs'
import {
  ExtractGW2ResourceType,
  ExtractGW2State,
  GW2AsyncState,
  GW2Resources
} from '../types'

const EMPTY = JSON.stringify({})

function mapCacheToStore<T extends GW2Resources>(
  items: Array<ExtractGW2ResourceType<T>>
) {
  return values(items).reduce((state, item) => ({
    ...state,
    [item.id]: {
      data: item,
      error: null,
      state: GW2AsyncState.DONE
    }
  }), {} as ExtractGW2State<T>)
}

function stateFactory<T extends GW2Resources>(
  resource: T
): Record<string, ExtractGW2State<T>> {
  const localStorageKey = makeResourceKey(resource)

  clearCacheIfNewBuild(localStorageKey)

  return {
    [resource]: {
      ...mapCacheToStore(JSON.parse(get(localStorageKey) || EMPTY))
    }
  }
}

export const gw2InitialState = {
  ...stateFactory(GW2Resources.ITEM),
  ...stateFactory(GW2Resources.ITEM_STAT),
  ...stateFactory(GW2Resources.PET),
  ...stateFactory(GW2Resources.SKILL),
  ...stateFactory(GW2Resources.SPECIALIZATION),
  ...stateFactory(GW2Resources.TRAIT),
  ...stateFactory(GW2Resources.PROFESSION)
}
