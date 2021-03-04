import * as m from 'mithril'

import { cx, makeClassName } from '../../../libs'

import * as styles from './styles'

export class TooltipFoot implements m.Component<m.Attributes> {
  public view({
    attrs: {
      className,
      ...attrs
    },
    children
  }: m.Vnode<m.Attributes>): m.Children {
    return <div
      className={cx(styles.root, className, makeClassName('tooltip-foot'))}
      {...attrs}
    >{children}</div>
  }
}
