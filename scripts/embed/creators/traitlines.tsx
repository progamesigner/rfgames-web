import * as m from 'mithril'

import { List, TraitLine } from '../containers'
import { EmbedStore } from '../types'

import {
  extractNumberList,
  extractOptionalString,
  extractStringList,
  parseSelectedTrait,
  parseTraitlines
} from './libs'

export function create(store: EmbedStore, element: Element): m.Component {
  const commonAttrs = {
    overrideEmptyText: extractOptionalString(element, 'empty-text'),
    overrideText: extractOptionalString(element, 'text')
  }

  return {
    view(): m.Children {
      return <List className="is-traitline-list" type="traitlines">
        {
          extractNumberList(element, 'ids').map(id => {
            const attrs = {
              id,
              ...commonAttrs,
              disableIcon: false,
              disableText: true,
              disableTextLink: true,

              activeTraitlines: parseTraitlines(extractStringList(element, `${id}-active-traitlines`)),
              selectedTraits: extractStringList(element, `${id}-traits`).map(parseSelectedTrait)
            }

            return <TraitLine key={id} {...attrs} store={store}></TraitLine>
          })
        }
      </List>
    }
  }
}
