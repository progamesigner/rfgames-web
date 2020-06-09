import * as m from 'mithril'

import { Specialization } from '../containers'
import { EmbedStore } from '../types'

import { extractBoolean, extractNumber } from './helpers'

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    disableIcon: extractBoolean(element, 'disable-icon', false),
    disableLink: extractBoolean(element, 'disable-link', false),
    disableText: extractBoolean(element, 'disable-text', false),
    id: extractNumber(element, 'id', -1),
    inline: extractBoolean(element, 'inline', false)
  }

  return {
    view(): m.Children {
      return <Specialization {...attrs} store={store}></Specialization>
    }
  }
}
