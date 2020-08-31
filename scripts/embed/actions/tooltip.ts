import {
  BaseAction,
  ExtractTooltipDataType,
  TooltipState,
  TooltipType
} from '../types'

interface UpdateTooltipPayload {
  payload: TooltipState;
}

interface UpdateTooltipHidabilityPayload {
  hidable: boolean;
}

export const UPDATE_TOOLTIP = 'UPDATE_TOOLTIP'
export const UPDATE_TOOLTIP_HIDABILITY = 'UPDATE_TOOLTIP_HIDABILITY'

export type UpdateTooltipAction = BaseAction<UpdateTooltipPayload>
export type UpdateTooltipHidabilityAction = BaseAction<UpdateTooltipHidabilityPayload>

export function hideTooltip(): UpdateTooltipAction {
  return {
    type: UPDATE_TOOLTIP,
    payload: {
      data: null,
      show: false,
      type: TooltipType.EMPTY
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

export function updateHidability(hidable: boolean): UpdateTooltipHidabilityAction {
  return {
    type: UPDATE_TOOLTIP_HIDABILITY,
    hidable
  }
}
