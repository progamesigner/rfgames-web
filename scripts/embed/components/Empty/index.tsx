import * as m from 'mithril'

import { Icon } from '../Icon'

type EmptyAttributes = m.Attributes

export class Empty implements m.Component<EmptyAttributes> {
  public view({ children }: m.Vnode<EmptyAttributes>): m.Children {
    return m.fragment(
      {},
      Array.prototype.concat([], <Icon></Icon>, children)
    )
  }
}
