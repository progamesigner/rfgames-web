import * as m from 'mithril'

import { fetchItem } from '../actions'
import { Empty, Item, Loader } from '../components'
import {
  GW2Resources,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

interface ItemContainerAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasRenderAttributes,
  HasStoreAttributes
{
  infusions?: Array<number>;
  upgradeCount?: number;
  upgrades?: Array<number>;
}

const fetch = wrapAsyncAction(fetchItem)

export class ItemContainer implements m.Component<ItemContainerAttributes> {
  public oninit({ attrs }: m.Vnode<ItemContainerAttributes>): void {
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
  }: m.Vnode<ItemContainerAttributes>): m.Children {
    const {
      [GW2Resources.ITEM]: items
    } = store.getState()

    if (id && items && items[id]) {
      if (isFetchFinished(items[id].state) && items[id].data) {
        return <Item data={items[id].data} store={store} {...attrs} />
      }

      return <Loader {...attrs} />
    }

    return <Empty type="item" {...attrs} />
  }
}
