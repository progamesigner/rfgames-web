import * as m from 'mithril'

import { fetchItem, fetchItemStat } from '../actions'
import { Empty, Item, Loader } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './libs'

interface ItemContainerAttributes extends
  m.Attributes,
  HasEmptyTextAttributes,
  HasIDAttributes<number>,
  HasStoreAttributes
{
  stat?: number;
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
      overrideEmptyText,
      stat,
      store,
      ...attrs
    }
  }: m.Vnode<ItemContainerAttributes>): m.Children {
    const {
      [GW2Resources.ITEM_STATS]: itemStats,
      [GW2Resources.ITEMS]: items
    } = store.getState()

    if (id > 0 && items) {
      const item = items[id]

      if (item && isFetchFinished(item.state)) {
        return <Item
          item={item.data}
          stat={stat && stat > 0 && itemStats && itemStats[stat] && itemStats[stat].data}
          store={store}
          {...attrs}
        />
      }

      return <Loader type="item" {...attrs} />
    }

    return <Empty
      overrideEmptyText={overrideEmptyText}
      store={store}
      type="item"
      {...attrs}
    />
  }
}
