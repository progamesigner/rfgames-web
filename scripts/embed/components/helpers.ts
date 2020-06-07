import { Store } from 'redux'

import { hideTooltip, showTooltip } from '../actions'
import { ExtractTooltipDataType, TooltipType } from '../types'

type TooltipEvents = {
  onmouseenter(): void;
  onmouseleave(): void;
  ontouchend(): void;
}

export function bindTooltipEvents<T extends TooltipType>(
  store: Store,
  type: T,
  data: ExtractTooltipDataType<T>
): TooltipEvents {
  const hide = () => store.dispatch(hideTooltip())
  const show = () => store.dispatch(showTooltip(type, data))

  return {
    onmouseenter: show,
    onmouseleave: hide,
    ontouchend: show
  }
}

export function buildWikiLink(to: string, lang = 'en'): string {
  return `https://wiki-${lang}.guildwars2.com/wiki/Special:Search/${encodeURIComponent(to)}`
}
