import { toPairs, values } from 'lodash/fp'
import { Reducer } from 'redux'

import {
  GW2ErrorAction,
  GW2RequestAction,
  GW2ResponseAction,
  makeActionNames
} from '../actions'
import { set, makeResourceKey } from '../libs'
import {
  EmbedState,
  ExtractGW2ErrorType,
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  ExtractGW2State,
  GW2AsyncState,
  GW2Resources
} from '../types'

interface Reducers {
  [key: string]: Reducer<EmbedState>;
}

type ExtractStoreRecord<T extends GW2Resources> = ExtractGW2State<T> extends Record<T, infer R> ? R : never

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
        data: item,
        error: null,
        state: GW2AsyncState.DONE
      }
    }), state[resource])

  return {
    ...state,
    [resource]: data
  }
}

const requestReducer = <T extends GW2Resources>(
  resource: T
): Reducer<EmbedState> => (state = {}, action) => {
  const {
    ids
  } = action as GW2RequestAction<T>

  const data = ids.reduce((items, id) => {
    return {
      ...items,
      [id]: {
        data: null,
        error: null,
        state: GW2AsyncState.PENDING
      }
    }
  }, state[resource])

  return {
    ...state,
    [resource]: data
  }
}

const responseReducer = <T extends GW2Resources>(
  resource: T
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
    const localStorageKey = makeResourceKey(resource)
    const storedData = data as Record<ExtractGW2KeyType<T>, ExtractStoreRecord<T>> | undefined

    if (storedData) {
      const save = values<ExtractStoreRecord<T>>(storedData)
        .reduce((saved, { data }) => {
          return {
            ...saved,
            ...data ? {
              [data.id]: data
            } : null
          }
        }, {})

      set(localStorageKey, JSON.stringify(save))
    }
  }

  return {
    ...state,
    [resource]: data
  }
}

function reducerFactory<T extends GW2Resources>(resource: T): Reducers {
  const {
    failure,
    request,
    success
  } = makeActionNames(resource)

  return {
    [failure]: failureReducer(resource),
    [request]: requestReducer(resource),
    [success]: responseReducer(resource)
  }
}

export const gw2Reducers = {
  ...reducerFactory(GW2Resources.ITEM),
  ...reducerFactory(GW2Resources.ITEM_STAT),
  ...reducerFactory(GW2Resources.PET),
  ...reducerFactory(GW2Resources.SKILL),
  ...reducerFactory(GW2Resources.SPECIALIZATION),
  ...reducerFactory(GW2Resources.TRAIT),
  ...reducerFactory(GW2Resources.PROFESSION)
}
