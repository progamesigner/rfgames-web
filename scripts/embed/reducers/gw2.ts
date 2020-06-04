import { Reducer } from 'redux'

import {
  GW2ErrorAction,
  GW2RequestAction,
  GW2Resources,
  GW2ResponseAction,
  makeActionNames
} from '../actions'
import { set } from '../libs'
import {
  EmbedState,
  GW2AsyncState,
  GW2State,
  GW2Record,
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2RecordKey,
  GW2Skill,
  GW2Specialization,
  GW2Trait
} from '../types'

type Reducers = {
  [key: string]: Reducer<EmbedState>;
}

const failureReducer = <
  T extends GW2RecordKey,
  R extends GW2Record<T>,
  E extends Error,
  S = GW2State<T, R, E>
>(resource: string): Reducer<EmbedState> => (state = {}, action) => {
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
  }, state[resource] as S || {})

  return {
    ...state,
    [resource]: data
  }
}

const requestReducer = <
  T extends GW2RecordKey,
  R extends GW2Record<T>,
  E extends Error,
  S = GW2State<T, R, E>
>(resource: string): Reducer<EmbedState> => (state = {}, action) => {
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
  }, state[resource] as S || {})

  return {
    ...state,
    [resource]: items
  }
}

const responseReducer = <
  T extends GW2RecordKey,
  R extends GW2Record<T>,
  E extends Error,
  S = GW2State<T, R, E>
>(resource: string): Reducer<EmbedState> => (state = {}, action) => {
  const {
    items
  } = action as GW2ResponseAction<T, R>

  const data = Object.entries<R>(items).reduce((previous, [id, data]) => {
    return {
      ...previous,
      [id]: {
        data,
        error: null,
        state: GW2AsyncState.DONE
      }
    }
  }, state[resource] as S || {})

  if (state.useLocalStorageAsCache) {
    const localStorageKey = `${resource}_DATA`

    const save = Object.entries<R>(items).reduce((previous, [id, data]) => {
      return {
        ...previous,
        [id]: data
      }
    }, state[resource] as S || {})

    set(localStorageKey, JSON.stringify(save))
  }

  return {
    ...state,
    [resource]: data
  }
}

function reducerFactory<
  T extends GW2RecordKey,
  R extends GW2Record<T>,
  E extends Error = Error
>(type: GW2Resources, resource: string): Reducers {
  const {
    failure,
    request,
    success
  } = makeActionNames(type)

  return {
    [failure]: failureReducer<T, R, E>(resource),
    [request]: requestReducer<T, R, E>(resource),
    [success]: responseReducer<T, R, E>(resource)
  }
}

export const gw2Reducers = {
  ...reducerFactory<number, GW2Item>(GW2Resources.ITEM, 'items'),
  ...reducerFactory<number, GW2ItemStat>(GW2Resources.ITEM_STAT, 'itemstats'),
  ...reducerFactory<number, GW2Pet>(GW2Resources.PET, 'pets'),
  ...reducerFactory<number, GW2Skill>(GW2Resources.SKILL, 'skills'),
  ...reducerFactory<number, GW2Specialization>(GW2Resources.SPECIALIZATION, 'specializations'),
  ...reducerFactory<number, GW2Trait>(GW2Resources.TRAIT, 'traits'),
  ...reducerFactory<string, GW2Profession>(GW2Resources.PROFESSION, 'professions')
}
