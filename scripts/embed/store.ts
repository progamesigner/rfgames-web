import * as m from 'mithril'

import {
  Action,
  applyMiddleware,
  createStore,
  Middleware,
  Store
} from 'redux'

import { reducer } from './reducers'
import { initializeState } from './states'
import { EmbedOptions, EmbedState } from './types'

const logger: Middleware = store => dispatch => action => {
  const next = dispatch(action)
  console.debug('Action', action)
  console.debug('Next State', store.getState())
  return next
}

const mithril: Middleware = () => dispatch => action => {
  const next = dispatch(action)
  m.redraw()
  return next
}

function parseOptions(window: Window): EmbedOptions {
  return {
    cacheVersion: '__INITIAL__',
    language: 'en',
    useLocalStorageAsCache: true,
    ...window.GW2_EMBED_OPTIONS
  }
}

export function getStore(window: Window): Store<EmbedState, Action> {
  return createStore(
    reducer,
    initializeState(parseOptions(window)),
    applyMiddleware(mithril, logger)
  )
}
