import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

interface LoadingStripAttributes extends m.Attributes {
  long?: boolean;
}

export class LoadingStrip implements m.Component<LoadingStripAttributes> {
  public view({
    attrs: {
      className,
      long,
      ...attrs
    },
    children
  }: m.Vnode<LoadingStripAttributes>): m.Children {
    if (Array.isArray(children) && children.length > 0) {
      return <span className={className} {...attrs}>{children}</span>
    }

    return <span
      className={cx(styles.root, className, makeClassName('loading'))}
      {...attrs}
    >
      {long ? 'Wait just a second ...' : 'Loading ...'}
    </span>
  }
}
