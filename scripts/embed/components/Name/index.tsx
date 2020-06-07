import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

type NameAttributes = m.Attributes

export class Name implements m.Component<NameAttributes> {
  public view({
    attrs: {
      className,
      ...attrs
    },
    children
  }: m.Vnode<NameAttributes>): m.Children {
    return <div
      className={cx(styles.root, className, makeClassName('name'))}
      {...attrs}
    >
      {children}
    </div>
  }
}
