import { chunk, uniq } from 'lodash/fp'

import { Dispatch } from 'redux'

import { apis, GW2Fetcher } from '../apis'
import { config } from '../config'
import { batch } from '../libs'
import {
  BaseAction,
  EmbedState,
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

type GetState = () => EmbedState
type GW2Action<T> = (dispatch: Dispatch, getState: GetState) => (id: T) => void

interface GW2ActionNames {
  failure: string;
  request: string;
  success: string;
}

interface GW2RequestPayload<T extends GW2RecordKey> {
  ids: Array<T>;
}

interface GW2ResponsePayload<T extends GW2RecordKey, R extends GW2Record<T>> {
  items: Record<T, R>;
}

interface GW2ErrorPayload<T extends GW2RecordKey, E extends Error> {
  errors: Record<T, E>;
}

function flattenResponses<
  T extends GW2RecordKey,
  R extends GW2Record<T>
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
  R extends GW2Record<T>,
  E extends Error = Error
>(
  type: GW2Resources,
  fetch: GW2Fetcher<T, R>,
  postprocess?: (dispatch: Dispatch, items: Record<T, R>) => Record<T, R>
): GW2Action<T> {
  const {
    request,
    success,
    failure
  } = makeActionNames(type)

  const makeChunks = chunk(config.gw2ApiRequestLimit)

  const debounced = batch<T, Promise<Record<T, R>>, [Dispatch, GetState]>(
    async (ids, dispatch, getState) => {
      const idsToFetch = uniq(ids.filter(id => {
        if (id) {
          switch (type) {
            case GW2Resources.PROFESSION:
              {
                const {
                  [type]: data
                } = getState()

                if (data) {
                  const item = data[id as string]
                  return !item || !!item.error
                }
              }
              break
            default:
              {
                const {
                  [type]: data
                } = getState()

                if (data) {
                  const item = data[id as number]
                  return !item || !!item.error
                }
              }
          }
        }
        return false
      }))

      if (idsToFetch.length > 0) {
        const requests = new Array<Promise<Record<T, R>>>()
        const idsToSlice = Array.prototype.concat([], idsToFetch)

        dispatch({
          type: request,
          ids: idsToFetch
        } as GW2RequestAction<T>)

        requests.push(...makeChunks(idsToSlice).map(fetch))

        try {
          const responses = await Promise.all(requests)
          const items = flattenResponses(responses)
          const missedIds = idsToFetch.filter(id => !items[id])

          dispatch(({
            type: success,
            items
          } as GW2ResponseAction<T, R>))

          if (missedIds.length) {
            const error = new Error('Not Found') as E

            dispatch(({
              type: failure,
              errors: missedIds.reduce((errors, id) => {
                errors[id] = error
                return errors
              }, {} as Record<T, E>)
            } as GW2ErrorAction<T, E>))
          }

          return postprocess ? postprocess(dispatch, items) : items
        } catch (error) {
          dispatch(({
            type: failure,
            errors: idsToFetch.reduce((errors, id) => {
              errors[id] = error
              return errors
            }, {} as Record<T, E>)
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

export type GW2RequestAction<T extends GW2RecordKey> = BaseAction<GW2RequestPayload<T>>
export type GW2ResponseAction<T extends GW2RecordKey, R extends GW2Record<T>> = BaseAction<GW2ResponsePayload<T, R>>
export type GW2ErrorAction<T extends GW2RecordKey, E extends Error> = BaseAction<GW2ErrorPayload<T, E>>

export const fetchItem = actionFactory<number, GW2Item>(GW2Resources.ITEM, apis.fetchGW2Items)
export const fetchItemStat = actionFactory<number, GW2ItemStat>(GW2Resources.ITEM_STAT, apis.fetchGW2ItemStats)
export const fetchPet = actionFactory<number, GW2Pet>(GW2Resources.PET, apis.fetchGW2Pets)
export const fetchProfession = actionFactory<string, GW2Profession>(GW2Resources.PROFESSION, apis.fetchGW2Professions)
export const fetchSkill = actionFactory<number, GW2Skill>(GW2Resources.SKILL, apis.fetchGW2Skills)
export const fetchSpecialization = actionFactory<number, GW2Specialization>(GW2Resources.TRAIT, apis.fetchGW2Specializations)
export const fetchTrait = actionFactory<number, GW2Trait>(GW2Resources.TRAIT, apis.fetchGW2Traits)

export function makeActionNames(resource: GW2Resources): GW2ActionNames {
  const name = resource.toUpperCase()

  return {
    failure: `FETCH_${name}_FAILURE`,
    request: `FETCH_${name}_REQUEST`,
    success: `FETCH_${name}_SUCCESS`
  }
}
