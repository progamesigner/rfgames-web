import * as m from 'mithril'

import { fetchItem } from '../actions'
import { LoadingStrip, UpgradeContent } from '../components'
import { GW2Resources, HasIDAttributes, HasStoreAttributes } from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

interface UpgradeContentContainerAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasStoreAttributes
{
  upgradeCount: number;
  unusedText: string;
}

const fetch = wrapAsyncAction(fetchItem)

export class UpgradeContentContainer implements m.Component<UpgradeContentContainerAttributes> {
  public oninit({ attrs }: m.Vnode<UpgradeContentContainerAttributes>): void {
    const {
      store,
      id
    } = attrs
    fetch(store, id)
  }

  public view({
    attrs: {
      id,
      store,
      unusedText,
      upgradeCount,
      ...attrs
    }
  }: m.Vnode<UpgradeContentContainerAttributes>): m.Children {
    const {
      [GW2Resources.ITEM]: items
    } = store.getState()

    if (id && items && items[id]) {
      if (isFetchFinished(items[id].state) && items[id].data) {
        return <UpgradeContent
          data={items[id].data}
          store={store}
          upgradeCount={upgradeCount}
          {...attrs}
        />
      }

      return <LoadingStrip {...attrs} />
    }

    return <UpgradeContent unusedText={unusedText} {...attrs} />
  }
}
