import * as m from 'mithril'

import { Profession } from '../containers'
import { EmbedStore } from '../types'

import { extractString } from './helpers'

export function create(store: EmbedStore, element: Element): m.Component {
  const id = extractString(element, 'id', '')
  const name = extractString(element, 'name', id)

  return {
    view(): m.Children {
      return <Profession id={id} name={name} store={store}></Profession>
    }
  }
}
