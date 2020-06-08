import { Reducer } from 'redux'

import {
  GW2ErrorAction,
  GW2RequestAction,
  GW2ResponseAction,
  makeActionNames
} from '../actions'
import { set } from '../libs'
import {
  EmbedState,
  GW2AsyncState,
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2Record,
  GW2RecordKey,
  GW2Resources,
  GW2Skill,
  GW2Specialization,
  GW2Trait
} from '../types'

interface Reducers {
  [key: string]: Reducer<EmbedState>;
}

const failureReducer = <T extends GW2RecordKey, E extends Error>(
  type: GW2Resources
): Reducer<EmbedState> => (state = {}, action) => {
  const {
    errors
  } = action as GW2ErrorAction<T, E>

  const data = Object.entries<E>(errors).reduce((previous, [id, error]) => {
    return {
      ...previous,
      [id]: {
        data: null,
        error: new Error(`ID:${id} | ${error.message}`),
        state: GW2AsyncState.FAILED
      }
    }
  }, state[type] || {})

  return {
    ...state,
    [type]: data
  }
}

const requestReducer = <T extends GW2RecordKey>(
  type: GW2Resources
): Reducer<EmbedState> => (state = {}, action) => {
  const {
    ids
  } = action as GW2RequestAction<T>

  const items = ids.reduce((items, id) => {
    return {
      ...items,
      [id]: {
        data: null,
        error: null,
        state: GW2AsyncState.PENDING
      }
    }
  }, state[type] || {})

  return {
    ...state,
    [type]: items
  }
}

const responseReducer = <T extends GW2RecordKey, R extends GW2Record<T>>(
  type: GW2Resources
): Reducer<EmbedState> => (state = {}, action) => {
  const {
    items
  } = action as GW2ResponseAction<T, R>

  const data = Object.entries(items).reduce((previous, [id, data]) => {
    return {
      ...previous,
      [id]: {
        data,
        error: null,
        state: GW2AsyncState.DONE
      }
    }
  }, state[type] || {})

  if (state.useLocalStorageAsCache) {
    const localStorageKey = `${type}_DATA`

    const save = Object.entries(data).reduce((previous, [id, item]) => {
      const {
        data
      } = item

      return {
        ...previous,
        [id]: data
      }
    }, {})

    set(localStorageKey, JSON.stringify(save))
  }

  return {
    ...state,
    [type]: data
  }
}

function reducerFactory<
  T extends GW2RecordKey,
  R extends GW2Record<T>,
  E extends Error = Error
>(type: GW2Resources): Reducers {
  const {
    failure,
    request,
    success
  } = makeActionNames(type)

  return {
    [failure]: failureReducer<T, E>(type),
    [request]: requestReducer<T>(type),
    [success]: responseReducer<T, R>(type)
  }
}

export const gw2Reducers = {
  ...reducerFactory<number, GW2Item>(GW2Resources.ITEM),
  ...reducerFactory<number, GW2ItemStat>(GW2Resources.ITEM_STAT),
  ...reducerFactory<number, GW2Pet>(GW2Resources.PET),
  ...reducerFactory<number, GW2Skill>(GW2Resources.SKILL),
  ...reducerFactory<number, GW2Specialization>(GW2Resources.SPECIALIZATION),
  ...reducerFactory<number, GW2Trait>(GW2Resources.TRAIT),
  ...reducerFactory<string, GW2Profession>(GW2Resources.PROFESSION)
}
