import { Action, Reducer } from 'redux'

import { gw2Reducers } from './gw2'
import { tooltipReducers } from './tooltip'

import { EmbedState } from '../types'

const reducers = {
  ...gw2Reducers,
  ...tooltipReducers
} as Record<string, Reducer<EmbedState>>

export function reducer(state: EmbedState = {}, action: Action): EmbedState {
  const reducer = reducers[action.type]
  return reducer ? reducer(state, action) : state
}
