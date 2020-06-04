import * as m from 'mithril'

import { Skill } from '../containers'
import { EmbedStore } from '../types'

import { extractNumber } from './helpers'

export function create(store: EmbedStore, element: Element): m.Component {
  const id = extractNumber(element, 'id', 0)

  return {
    view(): m.Children {
      return <Skill id={id} store={store}></Skill>
    }
  }
}
