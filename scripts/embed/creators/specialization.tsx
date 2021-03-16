import * as m from 'mithril'

import { Specialization } from '../containers'
import { EmbedStore } from '../types'

import { extractBoolean, extractNumber, extractOptionalString } from './libs'

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
    overrideText: extractOptionalString(element, 'text')
  }

  return {
    view(): m.Children {
      return <Specialization {...attrs} store={store}></Specialization>
    }
  }
}
