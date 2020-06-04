import { request } from 'mithril'

import { config } from '../config'
import {
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2Record,
  GW2RecordKey,
  GW2Skill,
  GW2Specialization,
  GW2Trait
} from '../types'

type GW2Build = GW2Record<number>

type APIParams = {
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
  R extends GW2Record<T>
>(responses: Array<R>): Record<T, R> {
  return responses.reduce((data, item) => ({
    ...data,
    [item.id]: item
  }), {} as Record<T, R>)
}

function fetchGW2ApiFactory<
  T extends GW2RecordKey,
  R extends GW2Record<T>
>(resource: string): GW2Fetcher<T, R> {
  return async (ids: Array<T>): Promise<Record<T, R>> => request<Array<R>>({
    params: buildParams({
      ids: ids.join(',')
    }),
    url: `${config.gw2ApiEndpoint}/v2/${resource}`
  }).then(response => reduceById(response))
}

export type GW2Fetcher<
  T extends GW2RecordKey,
  R extends GW2Record<T>
> = (ids: Array<T>) => Promise<Record<T, R>>

export async function fetchGW2Build(): Promise<GW2Build> {
  return request<GW2Build>({
    url: `${config.gw2ApiEndpoint}/v2/build`
  })
}

export const apis = {
  fetchGW2Build: fetchGW2Build,
  fetchGW2Items: fetchGW2ApiFactory<number, GW2Item>('items'),
  fetchGW2ItemStats: fetchGW2ApiFactory<number, GW2ItemStat>('itemstats'),
  fetchGW2Pets: fetchGW2ApiFactory<number, GW2Pet>('pets'),
  fetchGW2Professions: fetchGW2ApiFactory<string, GW2Profession>('professions'),
  fetchGW2Skills: fetchGW2ApiFactory<number, GW2Skill>('skills'),
  fetchGW2Specializations: fetchGW2ApiFactory<number, GW2Specialization>('specializations'),
  fetchGW2Traits: fetchGW2ApiFactory<number, GW2Trait>('traits')
}
