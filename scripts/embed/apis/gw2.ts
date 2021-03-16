import { request } from 'mithril'

import { config } from '../config'
import {
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  GW2Resources
} from '../types'

interface GW2Build {
  id: number;
}

function reduceById<T extends GW2Resources>(
  responses: ReadonlyArray<ExtractGW2ResourceType<T>>
): Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>> {
  return responses.reduce((data, item) => ({
    ...data,
    [item.id]: item
  }), {} as Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>>)
}

function fetchGW2ApiFactory<T extends GW2Resources>(
  resource: string
): GW2Fetcher<T> {
  return async (options: GW2APIOptions, ids: ReadonlyArray<ExtractGW2KeyType<T>>) => {
    const params = {
      ...(options.accessToken ? {
        access_token: options.accessToken,
      } : {}),
      lang: options.language ?? config.gw2ApiDefaultLanguage,
      v: options.schemaVersion ?? config.gw2ApiDefaultSchemaVersion
    }

    const response = await request<ReadonlyArray<ExtractGW2ResourceType<T>>>({
      background: true,
      params: {
        ids: ids.join(','),
        ...params
      },
      url: `${config.gw2ApiEndpoint}/v2/${resource}`
    })
    return reduceById(response)
  }
}

export type GW2Fetcher<
  T extends GW2Resources
> = (
  options: GW2APIOptions,
  ids: ReadonlyArray<ExtractGW2KeyType<T>>
) => Promise<Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>>>

export interface GW2APIOptions {
  accessToken?: string;
  language?: string;
  schemaVersion?: string;
}

export async function fetchGW2Build(): Promise<GW2Build> {
  return request<GW2Build>({
    url: `${config.gw2ApiEndpoint}/v2/build`
  })
}

export const apis = {
  fetchGW2Build: fetchGW2Build,
  fetchGW2Items: fetchGW2ApiFactory<GW2Resources.ITEMS>('items'),
  fetchGW2ItemStats: fetchGW2ApiFactory<GW2Resources.ITEM_STATS>('itemstats'),
  fetchGW2Pets: fetchGW2ApiFactory<GW2Resources.PETS>('pets'),
  fetchGW2Professions: fetchGW2ApiFactory<GW2Resources.PROFESSIONS>('professions'),
  fetchGW2Skills: fetchGW2ApiFactory<GW2Resources.SKILLS>('skills'),
  fetchGW2Specializations: fetchGW2ApiFactory<GW2Resources.SPECIALIZATIONS>('specializations'),
  fetchGW2Traits: fetchGW2ApiFactory<GW2Resources.TRAITS>('traits')
}
