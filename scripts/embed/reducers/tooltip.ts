import { Reducer } from 'redux'

import { UPDATE_TOOLTIP, UpdateTooltipAction } from '../actions'
import { EmbedState } from '../types'

function updateTooltip(
  state: EmbedState = {},
  action: UpdateTooltipAction
): EmbedState {
  const {
    payload: tooltip
  } = action

  return {
    ...state,
    tooltip
  }
}

export const tooltipReducers = {
  [UPDATE_TOOLTIP]: updateTooltip as Reducer<EmbedState>
}
