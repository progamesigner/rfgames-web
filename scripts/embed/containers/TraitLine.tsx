import * as m from 'mithril'

import { forEach, keys, map, pipe } from 'rambda'

import { fetchSpecialization } from '../actions'
import { Empty, Loader, TraitLine } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import {
  isFetchFinished,
  mapActiveTraitlinesToTraitIds,
  mapTraitSelectionToTraitIds,
  TraitSelection,
  wrapAsyncAction
} from './libs'

interface TraitLineContainerAttributes extends
  m.Attributes,
  HasEmptyTextAttributes,
  HasIDAttributes<number>,
  HasStoreAttributes
{
  activeTraitlines?: Record<number, ReadonlyArray<TraitSelection>>;
  selectedTraits: ReadonlyArray<TraitSelection>;
}

const fetch = wrapAsyncAction(fetchSpecialization)

export class TraitLineContainer implements m.Component<TraitLineContainerAttributes> {
  public oninit({ attrs }: m.Vnode<TraitLineContainerAttributes>): void {
    const {
      activeTraitlines,
      store,
      id
    } = attrs
    fetch(store, id)
    if (activeTraitlines) {
      pipe(
        keys,
        map(parseInt),
        forEach(fetch.bind(null, store))
      )(activeTraitlines)
    }
  }

  public view({
    attrs: {
      activeTraitlines,
      id,
      overrideEmptyText,
      selectedTraits,
      store,
      ...attrs
    }
  }: m.Vnode<TraitLineContainerAttributes>): m.Children {
    const {
      [GW2Resources.SPECIALIZATIONS]: specializations
    } = store.getState()

    if (id > 0 && specializations) {
      const specialization = specializations[id]

      if (specialization && isFetchFinished(specialization.state)) {
        const activeTraits = specializations ?
          mapActiveTraitlinesToTraitIds(specializations, activeTraitlines) :
          []

        const selectedTraitIds = specialization.data ?
          mapTraitSelectionToTraitIds(specialization.data, selectedTraits) :
          []

        return <TraitLine
          activeTraits={activeTraits}
          data={specialization.data}
          selectedTraits={selectedTraitIds}
          store={store}
          {...attrs}
        />
      }

      return <Loader
        disableIconPlaceholder={true}
        disableText={true}
        {...attrs}
      />
    }

    return <Empty
      overrideEmptyText={overrideEmptyText}
      store={store}
      {...attrs}
    />
  }
}
