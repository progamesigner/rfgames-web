import * as m from 'mithril'

import { Profession } from '../containers'
import { EmbedStore } from '../types'

import { extractBoolean, extractNumber, extractString } from './libs'

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    id: extractString(element, 'id', ''),

    eliteId: extractNumber(element, 'elite', -1),

    disableIcon: extractBoolean(element, 'disable-icon', false),
    disableIconLink: extractBoolean(element, 'disable-icon-link', true),
    disableText: extractBoolean(element, 'disable-text', false),
    disableTextLink: extractBoolean(element, 'disable-text-link', false),
    disableTooltip: extractBoolean(element, 'disable-tooltip', false),
    inline: extractBoolean(element, 'inline', false),
    link: extractString(element, 'link', ''),
    overrideEmptyText: extractString(element, 'empty-text', ''),
    overrideText: extractString(element, 'text', '')
  }

  return {
    view(): m.Children {
      return <Profession {...attrs} store={store}></Profession>
    }
  }
}
