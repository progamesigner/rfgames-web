import * as m from 'mithril'

import { TraitLine } from '../containers'
import { EmbedStore } from '../types'

import { extractNumber } from './helpers'

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    id: extractNumber(element, 'id', -1)
  }

  return {
    view(): m.Children {
      return <TraitLine {...attrs} store={store}></TraitLine>
    }
  }
}
