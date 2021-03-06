import * as m from 'mithril'

import { cx } from '../../libs'

import { Container } from '../Container'

interface ListAttributes extends m.Attributes
{
  type: string;
}

export class List implements m.Component<ListAttributes> {
  public view({
    attrs: {
      className,
      type
    },
    children
  }: m.Vnode<ListAttributes>): m.Children {
    return <Container className={cx('is-list', className)} type={type}>
      {children}
    </Container>
  }
}
