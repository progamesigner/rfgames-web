import { clearCacheIfNewBuild, get } from '../libs'
import {
  AsyncRecord,
  AsyncState,
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

const EMPTY = JSON.stringify({})

function stateFactory<
  T extends GW2RecordKey,
  R extends GW2BaseRecord<T>,
  E extends Error = Error
>(resource: string): Record<string, Record<T, AsyncRecord<R, E>>> {
  const localStorageKey = `${resource}_DATA`

  clearCacheIfNewBuild(localStorageKey)

  return {
    [resource]: {
      ...Object.entries(JSON.parse(get(localStorageKey) || EMPTY)).reduce(
        (state, [id, data]) => ({
          ...state,
          [id]: {
            data,
            error: null,
            state: AsyncState.DONE
          }
        }),
        {}
      ),
    } as Record<T, AsyncRecord<R, E>>
  }
}

export default {
  ...stateFactory<number, GW2Item>('items'),
  ...stateFactory<number, GW2ItemStat>('itemstats'),
  ...stateFactory<number, GW2Pet>('pets'),
  ...stateFactory<number, GW2Skill>('skills'),
  ...stateFactory<number, GW2Specialization>('specializations'),
  ...stateFactory<number, GW2Trait>('traits'),
  ...stateFactory<string, GW2Profession>('professions')
}
