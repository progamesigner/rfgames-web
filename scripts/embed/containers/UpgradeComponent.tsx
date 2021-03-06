import * as m from 'mithril'

import { fetchItem } from '../actions'
import { LoadingStrip, UpgradeComponent } from '../components'
import { GW2Resources, HasIDAttributes, HasStoreAttributes } from '../types'

import { isFetchFinished, wrapAsyncAction } from './lib'

interface UpgradeComponentContainerAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasStoreAttributes
{
  upgradeCount: number;
  unusedText: string;
}

const fetch = wrapAsyncAction(fetchItem)

export class UpgradeComponentContainer implements m.Component<UpgradeComponentContainerAttributes> {
  public oninit({ attrs }: m.Vnode<UpgradeComponentContainerAttributes>): void {
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
  }: m.Vnode<UpgradeComponentContainerAttributes>): m.Children {
    const {
      [GW2Resources.ITEM]: items
    } = store.getState()

    if (id > 0 && items) {
      const item = items[id]

      if (item && isFetchFinished(item.state)) {
        return <UpgradeComponent
          item={item.data}
          store={store}
          upgradeCount={upgradeCount}
          {...attrs}
        />
      }

      return <LoadingStrip {...attrs} />
    }

    return <UpgradeComponent unusedText={unusedText} {...attrs} />
  }
}
