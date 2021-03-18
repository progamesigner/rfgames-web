import { Reducer } from 'redux'
import { pipe, reduce, toPairs } from 'rambda'

import {
  GW2ErrorAction,
  GW2RequestAction,
  GW2ResponseAction,
  makeActionNames
} from '../actions'

import {
  clear,
  set,
  makeResourceKey
} from '../libs'

import {
  EmbedState,
  ExtractGW2ErrorType,
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  GW2AsyncState,
  GW2ResourceRecord,
  GW2Resources,
  GW2ResourceState,
  Optional
} from '../types'

interface GW2Reducers {
  [key: string]: Reducer<EmbedState>;
}

const failureReducer = <T extends GW2Resources>(
  resource: T
): Reducer<EmbedState> => (state = {}, action) => {
  const {
    errors
  } = action as GW2ErrorAction<T>

  const data = toPairs<ExtractGW2ErrorType<T>>(errors)
    .reduce((state, [id, item]) => ({
      ...state,
      [id]: {
        data: null,
        error: item,
        state: GW2AsyncState.FAILED
      }
    }), state[resource])

  return {
    ...state,
    [resource]: data
  }
}

const refreshReducer = <T extends GW2Resources>(
  resource: T,
  language: string
): Reducer<EmbedState> => (state = {}) => {
  if (state.useLocalStorageAsCache) {
    const localStorageKey = makeResourceKey(resource, language)
    clear(localStorageKey)
  }

  return {
    ...state,
    [resource]: {}
  }
}

const requestReducer = <T extends GW2Resources>(
  resource: T
): Reducer<EmbedState> => (state = {}, action) => {
  const {
    ids
  } = action as GW2RequestAction<T>

  const reducer = reduce<ExtractGW2KeyType<T>, EmbedState[T]>((state, id) => ({
    ...state,
    [id]: {
      data: null,
      error: null,
      state: GW2AsyncState.PENDING
    }
  }), state[resource])

  return {
    ...state,
    [resource]: reducer(ids)
  }
}

const responseReducer = <T extends GW2Resources>(
  resource: T,
  language: string
): Reducer<EmbedState> => (state = {}, action) => {
  const {
    items
  } = action as GW2ResponseAction<T>

  const data = toPairs<ExtractGW2ResourceType<T>>(items)
    .reduce((state, [id, item]) => ({
      ...state,
      [id]: {
        data: item,
        error: null,
        state: GW2AsyncState.DONE
      }
    }), state[resource])

  if (state.useLocalStorageAsCache) {
    const localStorageKey = makeResourceKey(resource, language)
    const storedData = data as Optional<GW2ResourceState<T>>

    if (storedData) {
      const cacheReducer = pipe(
        Object.values,
        reduce<GW2ResourceRecord<T>, EmbedState[T]>((stored, { data }) => ({
          ...stored,
          ...data ? {
            [data.id]: data
          } : null
        }), {})
      )

      set(localStorageKey, JSON.stringify(cacheReducer(storedData)))
    }
  }

  return {
    ...state,
    [resource]: data
  }
}

function reducerFactory<T extends GW2Resources>(
  resource: T,
  language: string
): GW2Reducers {
  const {
    failure,
    refresh,
    request,
    success
  } = makeActionNames(resource)

  return {
    [failure]: failureReducer(resource),
    [refresh]: refreshReducer(resource, language),
    [request]: requestReducer(resource),
    [success]: responseReducer(resource, language)
  }
}

export function gw2Reducers(language: string): GW2Reducers {
  return {
    ...reducerFactory(GW2Resources.ITEMS, language),
    ...reducerFactory(GW2Resources.ITEM_STATS, language),
    ...reducerFactory(GW2Resources.PETS, language),
    ...reducerFactory(GW2Resources.SKILLS, language),
    ...reducerFactory(GW2Resources.SPECIALIZATIONS, language),
    ...reducerFactory(GW2Resources.TRAITS, language),
    ...reducerFactory(GW2Resources.PROFESSIONS, language)
  }
}
