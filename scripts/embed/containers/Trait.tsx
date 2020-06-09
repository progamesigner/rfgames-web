import * as m from 'mithril'

import { fetchTrait } from '../actions'
import { Empty, Loader, Trait } from '../components'
import {
  GW2Resources,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

type TraitContainerAttributes =
  m.Attributes &
  HasIDAttributes<number> &
  HasRenderAttributes &
  HasStoreAttributes

const fetch = wrapAsyncAction(fetchTrait)

export class TraitContainer implements m.Component<TraitContainerAttributes> {
  public oninit({ attrs }: m.Vnode<TraitContainerAttributes>): void {
    const {
      store,
      id
    } = attrs
    fetch(store, id)
  }

  public view({
    attrs: {
      store,
      id,
      ...attrs
    }
  }: m.Vnode<TraitContainerAttributes>): m.Children {
    const {
      [GW2Resources.TRAIT]: traits
    } = store.getState()

    if (id && traits && traits[id]) {
      if (isFetchFinished(traits[id].state) && traits[id].data) {
        return <Trait data={traits[id].data} store={store} {...attrs} />
      }

      return <Loader {...attrs} />
    }

    return <Empty type="trait" {...attrs} />
  }
}
