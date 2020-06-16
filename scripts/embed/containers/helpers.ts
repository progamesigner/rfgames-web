import { Dispatch } from 'redux'

import {
  EmbedState,
  EmbedStore,
  ExtractGW2State,
  GW2AsyncState,
  GW2Resources,
  GW2Specialization
} from '../types'

export const enum TraitMode {
  ID = 0,
  POSITION = 1
}

export const enum TraitPosition {
  NONE = 0,
  TOP = 1,
  MIDDLE = 2,
  BOTTOM = 3
}

type GetState = () => EmbedState
type AsyncAction<A extends Array<unknown>> = (dispatch: Dispatch, getState: GetState) => (...args: A) => void
type WrappedAsyncAction<S, A extends Array<unknown>> = (store: S, ...args: A) => void

export type TraitSelection = [TraitMode, TraitPosition | number]

export function isFetchFinished(state: GW2AsyncState): boolean {
  return state === GW2AsyncState.DONE
}

export function mapActiveTraitlinesToTraitIds(
  specializations: ExtractGW2State<GW2Resources.SPECIALIZATION>,
  activeTraitlines?: Record<number, Array<TraitSelection>>
): Array<number> {
  return Object.values(specializations).reduce((ids, specialization) => {
    if (specialization.data) {
      const {
        id,
        minor_traits
      } = specialization.data

      if (activeTraitlines && activeTraitlines[id]) {
        return [
          ...ids,
          ...minor_traits,
          ...mapTraitSelectionToTraitIds(
            specialization.data,
            activeTraitlines[id]
          )
        ]
      }
    }
    return ids
  }, [] as Array<number>)
}

export function mapTraitSelectionToTraitIds(
  specialization: GW2Specialization,
  traitSelections: Array<TraitSelection>
): Array<number> {
  return traitSelections.map(([mode, value], tier) => {
    switch (mode) {
      case TraitMode.POSITION:
        return (
          value !== TraitPosition.NONE ?
          specialization.major_traits[value + tier * 3 - 1] :
          0
        )
      case TraitMode.ID:
      default:
        return value
    }
  })
}

export function wrapAsyncAction<A extends Array<unknown>>(
  action: AsyncAction<A>
): WrappedAsyncAction<EmbedStore, A> {
  return (store: EmbedStore, ...args): void => {
    action(store.dispatch, store.getState)(...args)
  }
}
