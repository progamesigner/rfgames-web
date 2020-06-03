import { EmbedState, EmbedOptions } from '../types'

import { default as gw2States } from './gw2'
import { default as tooltipStates } from './tooltip'

export default function (options: EmbedOptions): EmbedState {
  return {
    ...options,
    ...gw2States,
    ...tooltipStates
  }
}
