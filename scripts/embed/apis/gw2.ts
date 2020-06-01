import * as m from 'mithril'

import {
  default as config
} from '../config'

import {
  GW2BaseRecord,
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2RecordKey,
  GW2Skill,
  GW2Specialization,
  GW2Trait
} from '../types'

type GW2Build = GW2BaseRecord<number>

interface APIParams {
  [key: string]: string;
}

function buildParams(extra: APIParams): APIParams {
  return {
    ...extra,
    lang: 'en'
  }
}

function reduceById<
  T extends GW2RecordKey,
  R extends GW2BaseRecord<T>
>(responses: Array<R>): Record<T, R> {
  return responses.reduce((data, item) => ({
    ...data,
    [item.id]: item
  }), {} as Record<T, R>)
}

function fetcherFactory<
  T extends GW2RecordKey,
  R extends GW2BaseRecord<T>
>(resource: string): GW2Fetcher<T, R> {
  return async (ids: Array<T>): Promise<Record<T, R>> => m.request<Array<R>>({
    params: buildParams({
      ids: ids.join(',')
    }),
    url: `${config.gw2ApiEndpoint}/v2/${resource}`
  }).then(response => reduceById(response))
}

export type GW2Fetcher<
  T extends GW2RecordKey,
  R extends GW2BaseRecord<T>
> = (ids: Array<T>) => Promise<Record<T, R>>

export const fetchGW2Build = async (): Promise<GW2Build> => m.request<GW2Build>({
  url: `${config.gw2ApiEndpoint}/v2/build`
})

export const fetchGW2Items = fetcherFactory<number, GW2Item>('items')
export const fetchGW2ItemStats = fetcherFactory<number, GW2ItemStat>('itemstats')
export const fetchGW2Pets = fetcherFactory<number, GW2Pet>('pets')
export const fetchGW2Professions = fetcherFactory<string, GW2Profession>('professions')
export const fetchGW2Skills = fetcherFactory<number, GW2Skill>('skills')
export const fetchGW2Specializations = fetcherFactory<number, GW2Specialization>('specializations')
export const fetchGW2Traits = fetcherFactory<number, GW2Trait>('traits')
