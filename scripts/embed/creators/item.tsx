import * as m from 'mithril'

import { Item } from '../containers'
import { EmbedStore } from '../types'

import {
  extractBoolean,
  extractNumber,
  extractNumberList,
  extractOptionalString
} from './libs'

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    id: extractNumber(element, 'id', -1),

    disableIcon: extractBoolean(element, 'disable-icon', false),
    disableIconLink: extractBoolean(element, 'disable-icon-link', true),
    disableIconPlaceholder: extractBoolean(element, 'disable-icon-placeholder', false),
    disableText: extractBoolean(element, 'disable-text', false),
    disableTextLink: extractBoolean(element, 'disable-text-link', false),
    disableTooltip: extractBoolean(element, 'disable-tooltip', false),
    inline: extractBoolean(element, 'inline', false),
    link: extractOptionalString(element, 'link'),
    overrideEmptyText: extractOptionalString(element, 'empty-text'),
    overrideText: extractOptionalString(element, 'text'),

    stat: extractNumber(element, 'stat', -1),
    enrichments: extractNumberList(element, 'enrichments'),
    infusions: extractNumberList(element, 'infusions'),
    upgradeCount: extractNumber(element, 'upgrade-count', 1),
    upgrades: extractNumberList(element, 'upgrades')
  }

  return {
    view(): m.Children {
      return <Item {...attrs} store={store}></Item>
    }
  }
}
