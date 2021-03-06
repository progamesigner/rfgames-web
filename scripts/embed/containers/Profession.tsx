import * as m from 'mithril'

import { fetchProfession, fetchSpecialization } from '../actions'
import { Empty, Loader, Profession } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './lib'

interface ProfessionContainerAttributes extends
  m.Attributes,
  HasEmptyTextAttributes,
  HasIDAttributes<string>,
  HasStoreAttributes
{
  eliteId?: number;
}

const fetch = wrapAsyncAction(fetchProfession)
const fetchElite = wrapAsyncAction(fetchSpecialization)

export class ProfessionContainer implements m.Component<ProfessionContainerAttributes> {
  public oninit({
    attrs: {
      eliteId,
      id,
      store
    }
  }: m.Vnode<ProfessionContainerAttributes>): void {
    fetch(store, id)
    if (eliteId && eliteId > 0) {
      fetchElite(store, eliteId)
    }
  }

  public view({
    attrs: {
      eliteId,
      id,
      overrideEmptyText,
      store,
      ...attrs
    }
  }: m.Vnode<ProfessionContainerAttributes>): m.Children {
    const {
      [GW2Resources.PROFESSION]: professions,
      [GW2Resources.SPECIALIZATION]: specializations
    } = store.getState()

    if (id && professions) {
      const profession = professions[id]

      if (profession && isFetchFinished(profession.state)) {
        return <Profession
          elite={eliteId && specializations && specializations[eliteId] && specializations[eliteId].data}
          profession={profession.data}
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
