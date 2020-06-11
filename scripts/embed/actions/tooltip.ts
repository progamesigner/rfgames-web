import {
  BaseAction,
  ExtractTooltipDataType,
  TooltipState,
  TooltipType
} from '../types'

interface ToggleTooltipPayload {
  payload: Pick<TooltipState, 'show'>;
}

interface UpdateTooltipPayload {
  payload: TooltipState;
}

export const TOGGLE_TOOLTIP = 'TOGGLE_TOOLTIP'
export const UPDATE_TOOLTIP = 'UPDATE_TOOLTIP'

export type ToggleTooltipAction = BaseAction<ToggleTooltipPayload>
export type UpdateTooltipAction = BaseAction<UpdateTooltipPayload>

export function destroyTooltip(): UpdateTooltipAction {
  return {
    type: UPDATE_TOOLTIP,
    payload: {
      data: null,
      show: false,
      type: TooltipType.EMPTY
    }
  }
}

export function hideTooltip(): ToggleTooltipAction {
  return {
    type: TOGGLE_TOOLTIP,
    payload: {
      show: false
    }
  }
}

export function showTooltip<T extends TooltipType>(
  type: T,
  data: ExtractTooltipDataType<T>
): UpdateTooltipAction {
  return {
    type: UPDATE_TOOLTIP,
    payload: {
      data,
      show: true,
      type
    }
  }
}
