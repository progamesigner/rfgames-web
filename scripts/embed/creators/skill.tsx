import * as m from 'mithril'

import { Skill } from '../containers'
import { EmbedStore } from '../types'

import {
  extractBoolean,
  extractNumber,
  extractString,
  extractStringList,
  parseTraitlines
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
    link: extractString(element, 'link', ''),
    overrideEmptyText: extractString(element, 'empty-text', ''),
    overrideText: extractString(element, 'text', ''),

    activeTraitlines: parseTraitlines(extractStringList(element, 'active-traitlines'))
  }

  return {
    view(): m.Children {
      return <Skill {...attrs} store={store}></Skill>
    }
  }
}
