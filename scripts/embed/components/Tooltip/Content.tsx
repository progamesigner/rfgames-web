import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

interface TooltipContainerAttributes extends m.Attributes {
  type: string;
}

export class TooltipContent implements m.Component<TooltipContainerAttributes> {
  public view({
    attrs: {
      className,
      type,
      ...attrs
    },
    children
  }: m.Vnode<TooltipContainerAttributes>): m.Children {
    return <div
      className={cx(
        styles.container,
        className,
        makeClassName('tooltip-content'),
        `is-${type}`
      )}
      {...attrs}
    >{children}</div>
  }
}
