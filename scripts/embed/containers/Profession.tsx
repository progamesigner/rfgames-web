import * as m from 'mithril'

import { fetchProfession } from '../actions'
import { Empty, Profession } from '../components'
import {
  GW2Resources,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes
} from '../types'

import { wrapAsyncAction } from './helpers'

interface ProfessionEmbedAttributes extends
  m.Attributes,
  HasIDAttributes<string>,
  HasRenderAttributes,
  HasStoreAttributes
{
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

  public view({
    attrs: {
      id,
      name,
      store,
      ...attrs
    }
  }: m.Vnode<ProfessionEmbedAttributes>): m.Children {
    const {
      [GW2Resources.PROFESSION]: professions
    } = store.getState()

    if (id && professions && professions[id] && professions[id].data) {
      return <Profession
        data={professions[id].data}
        store={store}
        text={name}
        {...attrs}
      />
    }
    return <Empty type="profession" {...attrs} />
  }
}
