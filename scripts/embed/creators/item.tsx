import * as m from 'mithril'

import { Item } from '../containers'
import { EmbedStore } from '../types'

import { extractBoolean, extractNumber, extractNumberList } from './helpers'

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    disableIcon: extractBoolean(element, 'disable-icon', false),
    disableLink: extractBoolean(element, 'disable-link', false),
    disableText: extractBoolean(element, 'disable-text', false),
    id: extractNumber(element, 'id', -1),
    infusions: extractNumberList(element, 'infusions'),
    inline: extractBoolean(element, 'inline', false),
    upgradeCount: extractNumber(element, 'upgrade-count', 1),
    upgrades: extractNumberList(element, 'upgrades'),
  }

  return {
    view(): m.Children {
      return <Item {...attrs} store={store}></Item>
    }
  }
}
