import * as m from 'mithril'

import { forEach, keys, map, pipe } from 'rambda'

import { fetchSpecialization, fetchTrait } from '../actions'
import { Empty, Loader, Trait } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import {
  isFetchFinished,
  mapActiveTraitlinesToTraitIds,
  TraitSelection,
  wrapAsyncAction
} from './lib'

interface TraitContainerAttributes extends
  m.Attributes,
  HasEmptyTextAttributes,
  HasIDAttributes<number>,
  HasStoreAttributes
{
  activeTraitlines?: Record<number, ReadonlyArray<TraitSelection>>;
}

const fetch = wrapAsyncAction(fetchTrait)
const fetchSpec = wrapAsyncAction(fetchSpecialization)

export class TraitContainer implements m.Component<TraitContainerAttributes> {
  public oninit({ attrs }: m.Vnode<TraitContainerAttributes>): void {
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
        forEach(fetchSpec.bind(null, store))
      )(activeTraitlines)
    }
  }

  public view({
    attrs: {
      activeTraitlines,
      id,
      overrideEmptyText,
      store,
      ...attrs
    }
  }: m.Vnode<TraitContainerAttributes>): m.Children {
    const {
      [GW2Resources.SPECIALIZATION]: specializations,
      [GW2Resources.TRAIT]: traits
    } = store.getState()

    if (id > 0 && traits) {
      const trait = traits[id]

      const activeTraits = specializations ?
        mapActiveTraitlinesToTraitIds(specializations, activeTraitlines) :
        []

      if (trait && isFetchFinished(trait.state)) {
        return <Trait
          activeTraits={activeTraits}
          store={store}
          trait={trait.data}
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
