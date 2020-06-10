import * as m from 'mithril'

import { fetchItem, fetchItemStat } from '../actions'
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
  stat?: number;
  upgradeCount?: number;
  upgrades?: Array<number>;
}

const fetch = wrapAsyncAction(fetchItem)
const fetchStat = wrapAsyncAction(fetchItemStat)

export class ItemContainer implements m.Component<ItemContainerAttributes> {
  public oninit({
    attrs: {
      id,
      stat,
      store
    }
  }: m.Vnode<ItemContainerAttributes>): void {
    fetch(store, id)
    if (stat && stat > 0) {
      fetchStat(store, stat)
    }
  }

  public view({
    attrs: {
      id,
      stat,
      store,
      ...attrs
    }
  }: m.Vnode<ItemContainerAttributes>): m.Children {
    const {
      [GW2Resources.ITEM_STAT]: itemStats,
      [GW2Resources.ITEM]: items
    } = store.getState()

    if (id && items && items[id]) {
      if (isFetchFinished(items[id].state) && items[id].data) {
        return <Item
          data={items[id].data}
          stat={stat && stat > 0 && itemStats && itemStats[stat] && itemStats[stat].data}
          store={store}
          {...attrs}
        />
      }

      return <Loader {...attrs} />
    }

    return <Empty type="item" {...attrs} />
  }
}
