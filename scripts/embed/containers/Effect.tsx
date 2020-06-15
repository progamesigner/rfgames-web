import * as m from 'mithril'

import { Empty, Effect } from '../components'
import {
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

type EffectContainerAttributes =
  m.Attributes &
  HasEmptyTextAttributes &
  HasIDAttributes<string> &
  HasStoreAttributes

export class EffectContainer implements m.Component<EffectContainerAttributes> {
  public view({
    attrs: {
      id,
      overrideEmptyText,
      store,
      ...attrs
    }
  }: m.Vnode<EffectContainerAttributes>): m.Children {
    if (id) {
      return <Effect id={id} {...attrs} />
    }

    return <Empty
      overrideEmptyText={overrideEmptyText}
      store={store}
      {...attrs}
    />
  }
}
