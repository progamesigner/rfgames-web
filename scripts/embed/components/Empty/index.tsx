import * as m from 'mithril'

import { Container } from '../Container'
import { Icon } from '../Icon'

type EmptyAttributes = m.Attributes

export class Empty implements m.Component<EmptyAttributes> {
  public view({
    attrs,
    children
  }: m.Vnode<EmptyAttributes>): m.Children {
    return <Container embedType="error" {...attrs}>
      <Icon></Icon>
      {children}
    </Container>
  }
}
