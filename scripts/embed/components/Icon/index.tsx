import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

export type IconAttributes = m.Attributes & {
  src: string;
}

export class Icon implements m.Component<IconAttributes> {
  public view({
    attrs: {
      className,
      src,
      ...attrs
    },
    children
  }: m.Vnode<IconAttributes>): m.Children {
    return <div
      className={cx(styles.root, styles.image(src), makeClassName('icon'), className)}
      {...attrs}
    >{children}</div>
  }
}
