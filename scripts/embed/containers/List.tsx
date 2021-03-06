import * as m from 'mithril'

import { List } from '../components'

interface ListContainerAttributes extends m.Attributes {
  type: string;
}

export class ListContainer implements m.Component<ListContainerAttributes> {
  public view({
    attrs: {
      type,
      ...attrs
    },
    children
  }: m.Vnode<ListContainerAttributes>): m.Children {
    return <List {...attrs} type={type}>
      {children}
    </List>
  }
}
