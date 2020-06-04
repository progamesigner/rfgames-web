import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

export type LinkAttributes = m.Attributes & {
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
      className={cx(styles.root, makeClassName('link'), className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...attrs}
    >{children}</a> : children
  }
}
