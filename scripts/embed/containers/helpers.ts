import { Dispatch } from 'redux'

import { GW2AsyncState, EmbedState, EmbedStore } from '../types'

type GetState = () => EmbedState
type AsyncAction<A extends Array<unknown>> = (dispatch: Dispatch, getState: GetState) => (...args: A) => void
type WrappedAsyncAction<S, A extends Array<unknown>> = (store: S, ...args: A) => void

export function isFetchFinished(state: GW2AsyncState): boolean {
  return state !== GW2AsyncState.PENDING
}

export function wrapAsyncAction<A extends Array<unknown>>(
  action: AsyncAction<A>
): WrappedAsyncAction<EmbedStore, A> {
  return (store: EmbedStore, ...args): void => {
    action(store.dispatch, store.getState)(...args)
  }
}
