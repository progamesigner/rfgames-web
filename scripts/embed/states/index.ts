import { EmbedState, EmbedOptions } from '../types'

import { default as gw2States } from './gw2'

export default function (options: EmbedOptions): EmbedState {
  return {
    ...options,
    ...gw2States
  }
}
