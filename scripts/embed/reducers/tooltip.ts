import { Reducer } from 'redux'

import {
  TOGGLE_TOOLTIP,
  ToggleTooltipAction,
  UPDATE_TOOLTIP,
  UpdateTooltipAction
} from '../actions'
import { EmbedState } from '../types'

function toggleTooltip(
  state: EmbedState = {},
  action: ToggleTooltipAction
): EmbedState {
  const {
    payload: {
      show
    }
  } = action

  if (state.tooltip) {
    return {
      ...state,
      tooltip: {
        ...state.tooltip,
        show
      }
    }
  }
  return state
}

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
  [UPDATE_TOOLTIP]: updateTooltip as Reducer<EmbedState>,
  [TOGGLE_TOOLTIP]: toggleTooltip as Reducer<EmbedState>
}
