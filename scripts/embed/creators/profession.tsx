import * as m from 'mithril'

import { Profession } from '../containers'
import { EmbedStore } from '../types'

import { extractBoolean, extractString } from './helpers'

export function create(store: EmbedStore, element: Element): m.Component {
  const id = extractString(element, 'id', '')
  const name = extractString(element, 'name', id)

  const attrs = {
    disableIcon: extractBoolean(element, 'disable-icon', false),
    disableLink: extractBoolean(element, 'disable-link', false),
    disableText: extractBoolean(element, 'disable-text', false),
    id,
    inline: extractBoolean(element, 'inline', false),
    name
  }

  return {
    view(): m.Children {
      return <Profession {...attrs} store={store}></Profession>
    }
  }
}
