import * as m from 'mithril'

import { fetchProfession } from '../actions'
import { Profession } from '../components'
import { HasIDAttributes, HasStoreAttributes } from '../types'

import { wrapAsyncAction } from './helpers'

interface ProfessionEmbedAttributes extends m.Attributes, HasStoreAttributes, HasIDAttributes<string> {
  name?: string;
}

const fetch = wrapAsyncAction(fetchProfession)

export class ProfessionContainer implements m.Component<ProfessionEmbedAttributes> {
  public oninit({
    attrs: {
      store,
      id
    }
  }: m.Vnode<ProfessionEmbedAttributes>): void {
    fetch(store, id)
  }

  public view({ attrs }: m.Vnode<ProfessionEmbedAttributes>): m.Children {
    const {
      id,
      name,
      store
    } = attrs

    const {
      professions
    } = store.getState()

    if (id && professions && professions[id]) {
      return <Profession text={name} {...attrs} {...professions[id].data}></Profession>
    }

    return null
  }
}
