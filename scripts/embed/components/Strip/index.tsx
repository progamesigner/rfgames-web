import * as m from 'mithril'

import { cx } from '../../libs'

import * as styles from './styles'

interface StripAttributes extends m.Attributes {
  long?: boolean;
}

export class Strip implements m.Component<StripAttributes> {
  public view({
    attrs: {
      className,
      long,
      ...attrs
    },
    children
  }: m.Vnode<StripAttributes>): m.Children {
    if (Array.isArray(children) && children.length > 0) {
      return <span className={className} {...attrs}>{children}</span>
    }

    return <span className={cx(styles.root, className)} {...attrs}>
      {long ? 'Loading just a sec...' : 'Loading...'}
    </span>
  }
}
