import { Dispatch } from 'redux'
import { concat, filter, forEach, map, pipe, splitEvery, uniq } from 'rambda'

import { apis, GW2Fetcher } from '../apis'
import { config } from '../config'
import { batch, checkBuildIdUpdated } from '../libs'
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
type GW2BatchFunction<T extends GW2Resources> = (ids: ReadonlyArray<ExtractGW2KeyType<T>>, dispatch: Dispatch, getState: GetState) => Promise<GW2ResourceRecord<T>>
type GW2ErrorRecord<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, ExtractGW2ErrorType<T>>
type GW2PostProcessor<T extends GW2Resources> = (dispatch: Dispatch, items: GW2ResourceRecord<T>) => GW2ResourceRecord<T>
type GW2RefreshAction = (dispatch: Dispatch, getState: GetState) => () => void
type GW2ResourceRecord<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>>

interface GW2ActionNames {
  failure: string;
  refresh: string;
  request: string;
  success: string;
}

interface GW2ErrorPayload<T extends GW2Resources> {
  errors: GW2ErrorRecord<T>;
}

interface GW2RequestPayload<T extends GW2Resources> {
  ids: ReadonlyArray<ExtractGW2KeyType<T>>;
}

interface GW2ResponsePayload<T extends GW2Resources> {
  items: GW2ResourceRecord<T>;
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

  const debounced = batchFactory<T>(async (ids, dispatch, getState) => {
    const {
      [resource]: data,
      accessToken,
      language,
      schemaVersion
    } = getState()

    const item = data as ExtractGW2State<T> | undefined

    const options = {
      accessToken,
      language,
      schemaVersion
    }

    const fetchIdsFilter = pipe(
      filter<ExtractGW2KeyType<T>>(id => {
        if (!!id && (`${id}` === id && id !== '' || id > 0)) {
          return !item || !item[id] || !!item[id].error
        }
        return false
      }),
      uniq
    )

    const idsToFetch = fetchIdsFilter(ids)

    if (idsToFetch.length > 0) {
      const fetcher = pipe(
        concat<ExtractGW2KeyType<T>>([]),
        splitEvery(config.gw2ApiRequestLimit),
        map(fetch.bind(null, options))
      )

      dispatch({
        type: request,
        ids: idsToFetch
      })

      try {
        const responses = await Promise.all(fetcher(idsToFetch))
        const items = flattenResponses(responses)

        const missedIdsFilter = filter<ExtractGW2KeyType<T>>(id => !items[id])

        const missedIds = missedIdsFilter(idsToFetch)

        dispatch({
          type: success,
          items
        })

        if (missedIds.length) {
          const error = new Error('Not Found') as ExtractGW2ErrorType<T>

          dispatch({
            type: failure,
            errors: missedIds.reduce((errors, id) => ({
              ...errors,
              [id]: error
            }), {} as GW2ErrorRecord<T>)
          })
        }

        return postprocess ? postprocess(dispatch, items) : items
      } catch (error) {
        dispatch({
          type: failure,
          errors: idsToFetch.reduce((errors, id) => ({
            ...errors,
            [id]: error
          }), {} as GW2ErrorRecord<T>)
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
  responses: ReadonlyArray<GW2ResourceRecord<T>>
): GW2ResourceRecord<T> {
  return responses.reduce((response, items) => ({
    ...response,
    ...items
  }), {} as GW2ResourceRecord<T>)
}

function refreshActionFactory<T extends GW2Resources>(
  resource: T,
  fetcher: GW2Action<T>
): GW2RefreshAction {
  return (dispatch, getState) => () => {
    const {
      [resource]: resources
    } = getState()

    const {
      refresh
    } = makeActionNames(resource)

    dispatch({
      type: refresh
    })

    pipe(
      Object.keys,
      map<string, ExtractGW2KeyType<T>>(id => id as ExtractGW2KeyType<T>),
      forEach(fetcher(dispatch, getState))
    )(resources ?? {})
  }
}

export type GW2ErrorAction<T extends GW2Resources> = BaseAction<GW2ErrorPayload<T>>
export type GW2RequestAction<T extends GW2Resources> = BaseAction<GW2RequestPayload<T>>
export type GW2ResponseAction<T extends GW2Resources> = BaseAction<GW2ResponsePayload<T>>

export const fetchItem = actionFactory(GW2Resources.ITEMS, apis.fetchGW2Items)
export const fetchItemStat = actionFactory(GW2Resources.ITEM_STATS, apis.fetchGW2ItemStats)
export const fetchPet = actionFactory(GW2Resources.PETS, apis.fetchGW2Pets)
export const fetchProfession = actionFactory(GW2Resources.PROFESSIONS, apis.fetchGW2Professions)
export const fetchSkill = actionFactory(GW2Resources.SKILLS, apis.fetchGW2Skills)
export const fetchSpecialization = actionFactory(GW2Resources.SPECIALIZATIONS, apis.fetchGW2Specializations)
export const fetchTrait = actionFactory(GW2Resources.TRAITS, apis.fetchGW2Traits)

export async function refreshIfNewBuild(
  dispatch: Dispatch,
  getState: GetState
): Promise<void> {
  const {
    id
  } = await apis.fetchGW2Build()

  if (checkBuildIdUpdated(id)) {
    pipe(
      map<GW2RefreshAction, () => void>(action => action(dispatch, getState)),
      forEach(refresh => refresh()),
    )([
      refreshActionFactory(GW2Resources.ITEMS, fetchItem),
      refreshActionFactory(GW2Resources.ITEM_STATS, fetchItemStat),
      refreshActionFactory(GW2Resources.PETS, fetchPet),
      refreshActionFactory(GW2Resources.PROFESSIONS, fetchProfession),
      refreshActionFactory(GW2Resources.SKILLS, fetchSkill),
      refreshActionFactory(GW2Resources.SPECIALIZATIONS, fetchSpecialization),
      refreshActionFactory(GW2Resources.TRAITS, fetchTrait)
    ])
  }
}

export function makeActionNames(resource: GW2Resources): GW2ActionNames {
  const name = resource.toUpperCase()

  return {
    failure: `FETCH_${name}_FAILURE`,
    refresh: `FETCH_${name}_REFRESH`,
    request: `FETCH_${name}_REQUEST`,
    success: `FETCH_${name}_SUCCESS`
  }
}
