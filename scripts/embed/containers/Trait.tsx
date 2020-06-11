import * as m from 'mithril'

import { fetchTrait } from '../actions'
import { Empty, Loader, Trait } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

type TraitContainerAttributes =
  m.Attributes &
  HasEmptyTextAttributes &
  HasIDAttributes<number> &
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
      id,
      overrideEmptyText,
      store,
      ...attrs
    }
  }: m.Vnode<TraitContainerAttributes>): m.Children {
    const {
      [GW2Resources.TRAIT]: traits
    } = store.getState()

    if (id > 0 && traits) {
      const trait = traits[id]

      if (trait && isFetchFinished(trait.state)) {
        return <Trait
          trait={trait.data}
          store={store}
          {...attrs}
        />
      }

      return <Loader {...attrs} />
    }

    return <Empty
      overrideEmptyText={overrideEmptyText}
      store={store}
      {...attrs}
    />
  }
}
