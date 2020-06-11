import * as m from 'mithril'

import { fetchSpecialization } from '../actions'
import { Empty, Loader, Specialization } from '../components'
import { GW2Resources, HasIDAttributes, HasStoreAttributes } from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

type SpecializationContainerAttributes =
  m.Attributes &
  HasIDAttributes<number> &
  HasStoreAttributes

const fetch = wrapAsyncAction(fetchSpecialization)

export class SpecializationContainer implements m.Component<SpecializationContainerAttributes> {
  public oninit({ attrs }: m.Vnode<SpecializationContainerAttributes>): void {
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
  }: m.Vnode<SpecializationContainerAttributes>): m.Children {
    const {
      [GW2Resources.SPECIALIZATION]: specializations
    } = store.getState()

    if (id > 0 && specializations) {
      const specialization = specializations[id]

      if (specialization && isFetchFinished(specialization.state)) {
        return <Specialization
          specialization={specialization.data}
          store={store}
          {...attrs}
        />
      }

      return <Loader {...attrs} />
    }

    return <Empty store={store} {...attrs} />
  }
}
