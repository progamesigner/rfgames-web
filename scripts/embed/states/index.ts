import { EmbedOptions, EmbedState } from '../types'

import { gw2InitialState } from './gw2'
import { tooltipInitialState } from './tooltip'

export function initializeState(options: EmbedOptions): EmbedState {
  return {
    ...options,
    ...gw2InitialState(options.language),
    ...tooltipInitialState()
  }
}
