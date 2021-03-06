import * as m from 'mithril'

import { List, Skill } from '../containers'
import { EmbedStore } from '../types'

import {
  extractBoolean,
  extractNumberList,
  extractString,
  extractStringList,
  parseTraitlines
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
      return <List className="is-skill-list" type="skills">
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

            return <Skill key={id} {...attrs} store={store}></Skill>
          })
        }
      </List>
    }
  }
}
