import { clearCacheIfNewBuild, get } from '../libs'
import {
  GW2AsyncState,
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2Record,
  GW2RecordKey,
  GW2Resources,
  GW2Skill,
  GW2Specialization,
  GW2State,
  GW2Trait
} from '../types'

const EMPTY = JSON.stringify({})

function stateFactory<
  T extends GW2RecordKey,
  R extends GW2Record<T>,
  E extends Error = Error
>(type: GW2Resources): Record<string, GW2State<T, R, E>> {
  const initialState = {} as GW2State<T, R, E>
  const localStorageKey = `${type}_DATA`

  clearCacheIfNewBuild(localStorageKey)

  return {
    [type]: {
      ...Object.entries(JSON.parse(get(localStorageKey) || EMPTY)).reduce(
        (state, [id, data]) => ({
          ...state,
          [id]: {
            data,
            error: null,
            state: GW2AsyncState.DONE
          }
        }),
        initialState
      )
    }
  }
}

export const gw2InitialState = {
  ...stateFactory<number, GW2Item>(GW2Resources.ITEM),
  ...stateFactory<number, GW2ItemStat>(GW2Resources.ITEM_STAT),
  ...stateFactory<number, GW2Pet>(GW2Resources.PET),
  ...stateFactory<number, GW2Skill>(GW2Resources.SKILL),
  ...stateFactory<number, GW2Specialization>(GW2Resources.SPECIALIZATION),
  ...stateFactory<number, GW2Trait>(GW2Resources.TRAIT),
  ...stateFactory<string, GW2Profession>(GW2Resources.PROFESSION)
}
