import * as m from 'mithril'

import { Effect } from '../containers'
import { EmbedStore } from '../types'

import { extractBoolean, extractOptionalString, extractString } from './libs'

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    id: extractString(element, 'id', ''),

    disableIcon: extractBoolean(element, 'disable-icon', false),
    disableText: extractBoolean(element, 'disable-text', false),
    overrideEmptyText: extractOptionalString(element, 'empty-text'),
    overrideText: extractOptionalString(element, 'text')
  }

  return {
    view(): m.Children {
      return <Effect {...attrs} store={store}></Effect>
    }
  }
}
