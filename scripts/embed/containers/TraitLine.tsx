import * as m from 'mithril'

import { fetchSpecialization } from '../actions'
import { Empty, Loader, TraitLine, TraitSelection } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

export { TraitMode, TraitPosition, TraitSelection } from '../components'

interface TraitLineContainerAttributes extends
  m.Attributes,
  HasEmptyTextAttributes,
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
      overrideEmptyText,
      selectedTraits,
      store,
      ...attrs
    }
  }: m.Vnode<TraitLineContainerAttributes>): m.Children {
    const {
      [GW2Resources.SPECIALIZATION]: specializations
    } = store.getState()

    if (id > 0 && specializations) {
      const specialization = specializations[id]

      if (specialization && isFetchFinished(specialization.state)) {
        return <TraitLine
          data={specialization.data}
          selectedTraits={selectedTraits}
          store={store}
          {...attrs}
        />
      }

      return <Loader disableIconPlaceholder={true} {...attrs} />
    }

    return <Empty
      overrideEmptyText={overrideEmptyText}
      store={store}
      {...attrs}
    />
  }
}
