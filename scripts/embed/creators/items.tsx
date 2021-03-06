import * as m from 'mithril'

import { Item, List } from '../containers'
import { EmbedStore } from '../types'

import {
  extractBoolean,
  extractNumber,
  extractNumberList,
  extractString
} from './lib'

export function create(store: EmbedStore, element: Element): m.Component {
  const commonAttrs = {
    disableIconLink: extractBoolean(element, 'disable-icon-link', true),
    disableIconPlaceholder: extractBoolean(element, 'disable-icon-placeholder', false),
    disableTooltip: extractBoolean(element, 'disable-tooltip', false),
    overrideEmptyText: extractString(element, 'empty-text', ''),
    overrideText: extractString(element, 'text', '')
  }

  return {
    view(): m.Children {
      return <List className="is-item-list" type="items">
        {
          extractNumberList(element, 'ids').map(id => {
            const attrs = {
              id,
              ...commonAttrs,
              disableIcon: false,
              disableText: true,
              disableTextLink: true,

              link: extractString(element, `${id}-link`, ''),

              stat: extractNumber(element, `${id}-stat`, -1),
              enrichments: extractNumberList(element, `${id}-enrichments`),
              infusions: extractNumberList(element, `${id}-infusions`),
              upgradeCount: extractNumber(element, `${id}-upgrade-count`, 1),
              upgrades: extractNumberList(element, `${id}-upgrades`)
            }

            return <Item key={id} {...attrs} store={store}></Item>
          })
        }
      </List>
    }
  }
}
