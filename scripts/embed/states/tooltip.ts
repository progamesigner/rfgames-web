import { TooltipState, TooltipType } from '../types'

export const tooltipInitialState = {
  tooltip: {
    data: null,
    show: false,
    type: TooltipType.EMPTY
  } as TooltipState
}
