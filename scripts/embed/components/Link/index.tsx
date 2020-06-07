import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

interface LinkAttributes extends m.Attributes {
  href?: string;
}

export class Link implements m.Component<LinkAttributes> {
  public view({
    attrs: {
      className,
      ...attrs
    },
    children
  }: m.Vnode<LinkAttributes>): m.Children {
    const {
      href
    } = attrs

    return href ? <a
      className={cx(styles.root, className, makeClassName('link'))}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...attrs}
    >{children}</a> : children
  }
}
