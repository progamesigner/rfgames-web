import * as m from 'mithril'

import { List, Trait } from '../containers'
import { EmbedStore } from '../types'

import {
  extractBoolean,
  extractNumberList,
  extractString,
  extractStringList,
  parseTraitlines
} from './libs'

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
      return <List className="is-trait-list" type="traits">
        {
          extractNumberList(element, 'ids').map(id => {
            const attrs = {
              id,
              ...commonAttrs,
              disableIcon: false,
              disableText: true,
              disableTextLink: true,

              link: extractString(element, `${id}-link`, ''),

              activeTraitlines: parseTraitlines(extractStringList(element, `${id}-active-traitlines`))
            }

            return <Trait key={id} {...attrs} store={store}></Trait>
          })
        }
      </List>
    }
  }
}
