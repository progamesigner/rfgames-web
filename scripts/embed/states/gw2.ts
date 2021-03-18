import { filter, identity, pipe, reduce } from 'rambda'

import { clearCacheIfRequested, makeResourceKey, parse } from '../libs'
import {
  EmbedOptions,
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  GW2AsyncState,
  GW2Resources,
  GW2ResourceState
} from '../types'

type GW2InitialState = Record<string, GW2ResourceState<GW2Resources>>
type GW2ResourceRecord<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>>

function mapCacheToStore<T extends GW2Resources>(
  resources?: GW2ResourceRecord<T>
): GW2ResourceState<T> {
  return pipe(
    Object.values,
    filter(identity),
    reduce((state, resource) => ({
      ...state,
      [resource.id]: {
        data: resource,
        error: null,
        state: GW2AsyncState.DONE
      }
    }), {} as GW2ResourceState<T>)
  )(resources ?? {})
}

function stateFactory<T extends GW2Resources>(
  resource: T,
  options: EmbedOptions
): Record<string, GW2ResourceState<T>> {
  const {
    language,
    resources
  } = options

  const localStorageKey = makeResourceKey(resource, language)
  const storedResourceData = mapCacheToStore(resources[resource])

  clearCacheIfRequested(localStorageKey)

  return {
    [resource]: {
      ...storedResourceData,
      ...mapCacheToStore(parse<GW2ResourceRecord<T>>(localStorageKey))
    }
  }
}

export function gw2InitialState(options: EmbedOptions): GW2InitialState {
  return {
    ...stateFactory(GW2Resources.ITEMS, options),
    ...stateFactory(GW2Resources.ITEM_STATS, options),
    ...stateFactory(GW2Resources.PETS, options),
    ...stateFactory(GW2Resources.PROFESSIONS, options),
    ...stateFactory(GW2Resources.SKILLS, options),
    ...stateFactory(GW2Resources.SPECIALIZATIONS, options),
    ...stateFactory(GW2Resources.TRAITS, options)
  }
}
