import { Action, Reducer } from 'redux'

import { default as gw2Reducers } from './gw2'
import { default as tooltipReducers } from './tooltip'

import { EmbedState } from '../types'

const reducers = {
  ...gw2Reducers,
  ...tooltipReducers
} as Record<string, Reducer<EmbedState>>

export default function (state: EmbedState = {}, action: Action): EmbedState {
  const reducer = reducers[action.type]
  return reducer ? reducer(state, action) : state
}
