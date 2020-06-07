import * as m from 'mithril'

import { Container } from '../Container'
import { Icon } from '../Icon'

interface EmptyAttributes extends m.Attributes {
  type: string;
}

export class Empty implements m.Component<EmptyAttributes> {
  public view({
    attrs: {
      type,
      ...attrs
    },
    children
  }: m.Vnode<EmptyAttributes>): m.Children {
    return <Container inline={true} type={type} {...attrs}>
      <Icon></Icon>
      {children}
    </Container>
  }
}
