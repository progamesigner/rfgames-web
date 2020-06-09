import * as m from 'mithril'

import { fetchSpecialization } from '../actions'
import { Empty, Loader, Specialization } from '../components'
import {
  GW2Resources,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

type SpecializationContainerAttributes =
  m.Attributes &
  HasIDAttributes<number> &
  HasRenderAttributes &
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

    if (id && specializations && specializations[id]) {
      if (isFetchFinished(specializations[id].state) && specializations[id].data) {
        return <Specialization
          data={specializations[id].data}
          store={store} {...attrs}
        />
      }

      return <Loader {...attrs} />
    }

    return <Empty type="specialization" {...attrs} />
  }
}
