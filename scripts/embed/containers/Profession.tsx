import * as m from 'mithril'

import { fetchProfession } from '../actions'
import { Empty, Loader, Profession } from '../components'
import { GW2Resources, HasIDAttributes, HasStoreAttributes } from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

type ProfessionContainerAttributes =
  m.Attributes &
  HasIDAttributes<string> &
  HasStoreAttributes

const fetch = wrapAsyncAction(fetchProfession)

export class ProfessionContainer implements m.Component<ProfessionContainerAttributes> {
  public oninit({
    attrs: {
      store,
      id
    }
  }: m.Vnode<ProfessionContainerAttributes>): void {
    fetch(store, id)
  }

  public view({
    attrs: {
      id,
      store,
      ...attrs
    }
  }: m.Vnode<ProfessionContainerAttributes>): m.Children {
    const {
      [GW2Resources.PROFESSION]: professions
    } = store.getState()

    if (id.length > 0 && professions) {
      const profession = professions[id]

      if (profession && isFetchFinished(profession.state)) {
        return <Profession
          profession={profession.data}
          store={store}
          {...attrs}
        />
      }

      return <Loader {...attrs} />
    }

    return <Empty store={store} {...attrs} />
  }
}
