import { Action } from 'redux'

import { default as gw2Reducers } from './gw2'

import {
  EmbedState
} from '../types'

const reducers = {
  ...gw2Reducers
}

export default function (state: EmbedState = {}, action: Action): EmbedState {
  const reducer = reducers[action.type]
  return reducer ? reducer(state, action) : state
}
