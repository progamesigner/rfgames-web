import * as m from 'mithril'

import { fetchItem } from '../actions'
import { Empty, Item } from '../components'
import { HasIDAttributes, HasStoreAttributes } from '../types'

import { wrapAsyncAction } from './helpers'

type ItemContainerAttributes = m.Attributes & HasStoreAttributes & HasIDAttributes<number>

const fetch = wrapAsyncAction(fetchItem)

export class ItemContainer implements m.Component<ItemContainerAttributes> {
  public oninit({ attrs }: m.Vnode<ItemContainerAttributes>): void {
    const {
      store,
      id
    } = attrs
    fetch(store, id)
  }

  public view({ attrs }: m.Vnode<ItemContainerAttributes>): m.Children {
    const {
      store,
      id
    } = attrs

    const {
      items
    } = store.getState()

    if (id && items && items[id] && items[id].data) {
      return <Item data={items[id].data} {...attrs} />
    }
    return <Empty type="item" />
  }
}
