import { chunk, isInteger, isString, uniq } from 'lodash/fp'

import { Dispatch } from 'redux'

import { apis, GW2Fetcher } from '../apis'
import { config } from '../config'
import { batch } from '../libs'
import {
  BaseAction,
  EmbedState,
  ExtractGW2ErrorType,
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  ExtractGW2State,
  GW2Resources
} from '../types'

type GetState = () => EmbedState
type GW2Action<T extends GW2Resources> = (dispatch: Dispatch, getState: GetState) => (id: ExtractGW2KeyType<T>) => void
type GW2BatchFunction<T extends GW2Resources> = (ids: Array<ExtractGW2KeyType<T>>, dispatch: Dispatch, getState: GetState) => Promise<GW2ResourceRecord<T>>
type GW2ErrorRecord<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, ExtractGW2ErrorType<T>>
type GW2PostProcessor<T extends GW2Resources> = (dispatch: Dispatch, items: GW2ResourceRecord<T>) => GW2ResourceRecord<T>
type GW2ResourceRecord<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>>

interface GW2ActionNames {
  failure: string;
  request: string;
  success: string;
}

interface GW2RequestPayload<T extends GW2Resources> {
  ids: Array<ExtractGW2KeyType<T>>;
}

interface GW2ResponsePayload<T extends GW2Resources> {
  items: GW2ResourceRecord<T>;
}

interface GW2ErrorPayload<T extends GW2Resources> {
  errors: GW2ErrorRecord<T>;
}

function actionFactory<T extends GW2Resources>(
  resource: T,
  fetch: GW2Fetcher<T>,
  postprocess?: GW2PostProcessor<T>
): GW2Action<T> {
  const {
    request,
    success,
    failure
  } = makeActionNames(resource)

  const makeChunks = chunk(config.gw2ApiRequestLimit)

  const debounced = batchFactory<T>(async (ids, dispatch, getState) => {
    const {
      [resource]: data,
      language
    } = getState()

    const item = data as ExtractGW2State<T> | undefined

    const idsToFetch = uniq(ids.filter(id => {
      if (!!id && (isInteger(id) && id > 0 || isString(id) && id !== '')) {
        return !item || !item[id] || !!item[id].error
      }
      return false
    }))

    if (idsToFetch.length > 0) {
      const fetcher = fetch.bind(null, language || config.gw2ApiDefaultLanguage)
      const idsToSlice = Array.prototype.concat([], idsToFetch)
      const requests = new Array<Promise<GW2ResourceRecord<T>>>()

      dispatch({
        type: request,
        ids: idsToFetch
      })

      requests.push(...makeChunks(idsToSlice).map(fetcher))

      try {
        const responses = await Promise.all(requests)
        const items = flattenResponses(responses)
        const missedIds = idsToFetch.filter(id => !items[id])

        dispatch({
          type: success,
          items
        })

        if (missedIds.length) {
          const error = new Error('Not Found') as ExtractGW2ErrorType<T>

          dispatch({
            type: failure,
            errors: missedIds.reduce((errors, id) => {
              errors[id] = error
              return errors
            }, {} as GW2ErrorRecord<T>)
          })
        }

        return postprocess ? postprocess(dispatch, items) : items
      } catch (error) {
        dispatch({
          type: failure,
          errors: idsToFetch.reduce((errors, id) => {
            errors[id] = error
            return errors
          }, {} as GW2ErrorRecord<T>)
        })

        throw error
      }
    }

    return Promise.resolve({} as GW2ResourceRecord<T>)
  })

  return (dispatch, getState) => id => debounced(id, dispatch, getState)
}

function batchFactory<T extends GW2Resources>(func: GW2BatchFunction<T>) {
  return batch(func, config.gw2ApiBatchWait)
}

function flattenResponses<T extends GW2Resources>(
  responses: Array<GW2ResourceRecord<T>>
): GW2ResourceRecord<T> {
  return responses.reduce((response, items) => {
    return {
      ...response,
      ...items
    }
  }, {} as GW2ResourceRecord<T>)
}

export type GW2RequestAction<T extends GW2Resources> = BaseAction<GW2RequestPayload<T>>
export type GW2ResponseAction<T extends GW2Resources> = BaseAction<GW2ResponsePayload<T>>
export type GW2ErrorAction<T extends GW2Resources> = BaseAction<GW2ErrorPayload<T>>

export const fetchItem = actionFactory(GW2Resources.ITEM, apis.fetchGW2Items)
export const fetchItemStat = actionFactory(GW2Resources.ITEM_STAT, apis.fetchGW2ItemStats)
export const fetchPet = actionFactory(GW2Resources.PET, apis.fetchGW2Pets)
export const fetchProfession = actionFactory(GW2Resources.PROFESSION, apis.fetchGW2Professions)
export const fetchSkill = actionFactory(GW2Resources.SKILL, apis.fetchGW2Skills)
export const fetchSpecialization = actionFactory(GW2Resources.SPECIALIZATION, apis.fetchGW2Specializations)
export const fetchTrait = actionFactory(GW2Resources.TRAIT, apis.fetchGW2Traits)

export function makeActionNames(resource: GW2Resources): GW2ActionNames {
  const name = resource.toUpperCase()

  return {
    failure: `FETCH_${name}_FAILURE`,
    request: `FETCH_${name}_REQUEST`,
    success: `FETCH_${name}_SUCCESS`
  }
}
