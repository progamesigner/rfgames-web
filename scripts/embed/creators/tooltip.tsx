import * as m from 'mithril'

import { Tooltip } from '../containers'
import { EmbedStore } from '../types'

export function create(store: EmbedStore, window: Window): m.Component {
  return {
    view(): m.Children {
      return <Tooltip store={store} window={window}></Tooltip>
    }
  }
}
