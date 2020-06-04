import { uniq } from 'lodash/fp'

import { Dispatch } from 'redux'

import { apis, GW2Fetcher } from '../apis'
import { config } from '../config'
import { batch } from '../libs'
import {
  BaseAction,
  EmbedState,
  GW2BaseRecord,
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2RecordKey,
  GW2Skill,
  GW2Specialization,
  GW2State,
  GW2Trait
} from '../types'

export enum GW2Resources {
  ITEM = 'GW2_ITEM',
  ITEM_STAT = 'GW2_ITEM_STAT',
  PET = 'GW2_PET',
  PROFESSION = 'GW2_PROFESSION',
  SKILL = 'GW2_SKILL',
  SPECIALIZATION = 'GW2_SPECIALIZATION',
  TRAIT = 'GW2_TRAIT'
}

type GW2ActionNames = {
  failure: string;
  request: string;
  success: string;
}

type GW2RequestPayload<T extends GW2RecordKey> = {
  ids: Array<T>;
}

type GW2ResponsePayload<T extends GW2RecordKey, R extends GW2BaseRecord<T>> = {
  items: Record<T, R>;
}

type GW2ErrorPayload<T extends GW2RecordKey, E extends Error> = {
  errors: Record<T, E>;
}

type GetState = () => EmbedState
type GW2Action<T> = (dispatch: Dispatch, getState: GetState) => (id: T) => void

export type GW2RequestAction<T extends GW2RecordKey> = BaseAction<GW2RequestPayload<T>>
export type GW2ResponseAction<T extends GW2RecordKey, R extends GW2BaseRecord<T>> = BaseAction<GW2ResponsePayload<T, R>>
export type GW2ErrorAction<T extends GW2RecordKey, E extends Error> = BaseAction<GW2ErrorPayload<T, E>>

function flattenResponses<
  T extends GW2RecordKey,
  R extends GW2BaseRecord<T>
>(responses: Array<Record<T, R>>): Record<T, R> {
  return responses.reduce((response, items) => {
    return {
      ...response,
      ...items
    }
  }, {} as Record<T, R>)
}

function actionFactory<
  T extends GW2RecordKey,
  R extends GW2BaseRecord<T>,
  E extends Error = Error
>(
  type: GW2Resources,
  fetch: GW2Fetcher<T, R>,
  resource: string,
  postprocess?: (dispatch: Dispatch, items: Record<T, R>) => Record<T, R>
): GW2Action<T> {
  const {
    request,
    success,
    failure
  } = makeActionNames(type)

  const debounced = batch<T, Promise<Record<T, R>>, [Dispatch, GetState]>(
    async (ids, dispatch, getState) => {
      const state = getState()

      const idsToFetch = uniq(ids.filter(id => {
        if (id && id !== -1 && id !== "") {
          const item = state[resource] as GW2State<T, R, E>
          return !item || !item[id] || !!item[id].error
        }
        return false
      }))

      if (idsToFetch.length > 0) {
        const requests = []
        const idsToSlice = Array.prototype.concat([], idsToFetch)

        dispatch({
          type: request,
          payload: {
            ids: idsToFetch
          }
        } as GW2RequestAction<T>)

        while (idsToSlice.length) {
          const slicedIds = idsToSlice.splice(0, config.gw2ApiRequestLimit)
          requests.push(fetch(slicedIds))
        }

        try {
          const responses = await Promise.all(requests)
          const items = flattenResponses(responses)
          const missedIds = idsToFetch.filter(id => !items[id])

          dispatch(({
            type: success,
            payload: {
              items
            }
          } as GW2ResponseAction<T, R>))

          if (missedIds.length) {
            const error = new Error('Not Found') as E

            dispatch(({
              type: failure,
              payload: {
                errors: missedIds.reduce((errors, id) => {
                  errors[id] = error
                  return errors
                }, {} as Record<T, E>)
              }
            } as GW2ErrorAction<T, E>))
          }

          return postprocess ? postprocess(dispatch, items) : items
        } catch (error) {
          dispatch(({
            type: failure,
            payload: {
              errors: idsToFetch.reduce((errors, id) => {
                errors[id] = error
                return errors
              }, {} as Record<T, E>)
            }
          } as GW2ErrorAction<T, E>))

          throw error
        }
      }

      return Promise.resolve({} as Record<T, R>)
    },
    config.gw2ApiBatchWait
  )

  return (dispatch, getState) => id => debounced(id, dispatch, getState)
}

export function makeActionNames(resource: GW2Resources): GW2ActionNames {
  const name = resource.toUpperCase()

  return {
    failure: `FETCH_${name}_FAILURE`,
    request: `FETCH_${name}_REQUEST`,
    success: `FETCH_${name}_SUCCESS`
  }
}

export const fetchItem = actionFactory<number, GW2Item>(GW2Resources.ITEM, apis.fetchGW2Items, 'items')
export const fetchItemStat = actionFactory<number, GW2ItemStat>(GW2Resources.ITEM_STAT, apis.fetchGW2ItemStats, 'itemstats')
export const fetchPet = actionFactory<number, GW2Pet>(GW2Resources.PET, apis.fetchGW2Pets, 'pets')
export const fetchProfession = actionFactory<string, GW2Profession>(GW2Resources.PROFESSION, apis.fetchGW2Professions, 'professions')
export const fetchSkill = actionFactory<number, GW2Skill>(GW2Resources.SKILL, apis.fetchGW2Skills, 'skills')
export const fetchSpecialization = actionFactory<number, GW2Specialization>(GW2Resources.TRAIT, apis.fetchGW2Specializations, 'specializations')
export const fetchTrait = actionFactory<number, GW2Trait>(GW2Resources.TRAIT, apis.fetchGW2Traits, 'traits')
