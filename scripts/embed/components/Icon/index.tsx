import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

export type IconAttributes = m.Attributes & {
  src: string;
}

export default class implements m.Component<IconAttributes> {
  public view({
    attrs: {
      className,
      src,
      ...attrs
    }
  }: m.Vnode<IconAttributes>): m.Children {
    return <div
      className={cx(styles.root, styles.image(src), makeClassName('icon'), className)}
      {...attrs}
    >
    </div>
  }
}
