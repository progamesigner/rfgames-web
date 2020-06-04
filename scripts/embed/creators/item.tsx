import * as m from 'mithril'

import { Item } from '../containers'
import { EmbedStore } from '../types'

import { extractNumber } from './helpers'

export function create(store: EmbedStore, element: Element): m.Component {
  const id = extractNumber(element, 'id', -1)

  return {
    view(): m.Children {
      return <Item id={id} store={store}></Item>
    }
  }
}
