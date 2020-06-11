import * as m from 'mithril'

import { fetchSpecialization } from '../actions'
import { Empty, Loader, TraitLine, TraitSelection } from '../components'
import { GW2Resources, HasIDAttributes, HasStoreAttributes } from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

export { TraitMode, TraitPosition, TraitSelection } from '../components'

interface TraitLineContainerAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasStoreAttributes
{
  selectedTraits: Array<TraitSelection>;
}

const fetch = wrapAsyncAction(fetchSpecialization)

export class TraitLineContainer implements m.Component<TraitLineContainerAttributes> {
  public oninit({ attrs }: m.Vnode<TraitLineContainerAttributes>): void {
    const {
      store,
      id
    } = attrs
    fetch(store, id)
  }

  public view({
    attrs: {
      id,
      selectedTraits,
      store,
      ...attrs
    }
  }: m.Vnode<TraitLineContainerAttributes>): m.Children {
    const {
      [GW2Resources.SPECIALIZATION]: specializations
    } = store.getState()

    if (id && specializations && specializations[id]) {
      if (isFetchFinished(specializations[id].state) && specializations[id].data) {
        return <TraitLine
          data={specializations[id].data}
          selectedTraits={selectedTraits}
          store={store}
          {...attrs}
        />
      }

      return <Loader {...attrs} />
    }

    return <Empty type="traitline" {...attrs} />
  }
}
