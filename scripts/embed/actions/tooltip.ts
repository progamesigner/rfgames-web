import {
  BaseAction,
  ExtractTooltipDataType,
  TooltipState,
  TooltipType
} from '../types'

interface UpdateTooltipPayload {
  payload: TooltipState;
}

export const UPDATE_TOOLTIP = 'UPDATE_TOOLTIP'

export type UpdateTooltipAction = BaseAction<UpdateTooltipPayload>

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
