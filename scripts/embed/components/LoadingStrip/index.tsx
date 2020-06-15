import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import { Text } from '../Text'

import * as styles from './styles'

interface LoadingStripAttributes extends m.Attributes {
  text?: string;
}

export class LoadingStrip implements m.Component<LoadingStripAttributes> {
  public view({
    attrs: {
      className,
      text,
      ...attrs
    },
    children
  }: m.Vnode<LoadingStripAttributes>): m.Children {
    if (Array.isArray(children) && children.length > 0) {
      return <span className={className} {...attrs}>{children}</span>
    }

    return <Text
      className={cx(styles.root, className, makeClassName('loading'))}
      {...attrs}
    >{text || 'Loading ...'}</Text>
  }
}
