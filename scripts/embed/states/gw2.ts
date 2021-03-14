import { clearCacheIfRequested, makeResourceKey, parse } from '../libs'
import {
  EmbedOptions,
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  ExtractGW2State,
  GW2AsyncState,
  GW2Resources
} from '../types'

type GW2InitialState = Record<string, ExtractGW2State<GW2Resources>>
type GW2ResourceRecord<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>>

function mapCacheToStore<T extends GW2Resources>(
  resources?: GW2ResourceRecord<T>
): ExtractGW2State<T> {
  return Object
    .values<ExtractGW2ResourceType<T>>(resources || {})
    .reduce((state, resource) => ({
      ...state,
      [resource.id]: {
        data: resource,
        error: null,
        state: GW2AsyncState.DONE
      }
    }), {} as ExtractGW2State<T>)
}

function stateFactory<T extends GW2Resources>(
  resource: T,
  options: EmbedOptions
): Record<string, ExtractGW2State<T>> {
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
