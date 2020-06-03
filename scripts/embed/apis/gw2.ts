import { request } from 'mithril'

import { config } from '../config'
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
  return async (ids: Array<T>): Promise<Record<T, R>> => request<Array<R>>({
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

export async function fetchBuild(): Promise<GW2Build> {
  return request<GW2Build>({
    url: `${config.gw2ApiEndpoint}/v2/build`
  })
}

export default {
  fetchGW2Build: fetchBuild,
  fetchGW2Items: fetcherFactory<number, GW2Item>('items'),
  fetchGW2ItemStats: fetcherFactory<number, GW2ItemStat>('itemstats'),
  fetchGW2Pets: fetcherFactory<number, GW2Pet>('pets'),
  fetchGW2Professions: fetcherFactory<string, GW2Profession>('professions'),
  fetchGW2Skills: fetcherFactory<number, GW2Skill>('skills'),
  fetchGW2Specializations: fetcherFactory<number, GW2Specialization>('specializations'),
  fetchGW2Traits: fetcherFactory<number, GW2Trait>('traits')
}
