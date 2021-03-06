import { Dispatch } from 'redux'

import {
  EmbedState,
  EmbedStore,
  GW2AsyncState,
  GW2Resources,
  GW2ResourceState,
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
type AsyncAction<A extends ReadonlyArray<unknown>> = (dispatch: Dispatch, getState: GetState) => (...args: A) => void
type WrappedAsyncAction<S, A extends ReadonlyArray<unknown>> = (store: S, ...args: A) => void

export type TraitSelection = [TraitMode, TraitPosition | number]

export function isFetchFinished(state: GW2AsyncState): boolean {
  return state === GW2AsyncState.DONE
}

export function mapActiveTraitlinesToTraitIds(
  specializations: GW2ResourceState<GW2Resources.SPECIALIZATIONS>,
  activeTraitlines?: Record<number, ReadonlyArray<TraitSelection>>
): ReadonlyArray<number> {
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
  }, [] as ReadonlyArray<number>)
}

export function mapTraitSelectionToTraitIds(
  specialization: GW2Specialization,
  traitSelections: ReadonlyArray<TraitSelection>
): ReadonlyArray<number> {
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

export function wrapAsyncAction<A extends ReadonlyArray<unknown>>(
  action: AsyncAction<A>
): WrappedAsyncAction<EmbedStore, A> {
  return (store: EmbedStore, ...args): void => {
    action(store.dispatch, store.getState)(...args)
  }
}
