import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

interface ContainerAttributes extends m.Attributes {
  type: string;
}

export class Container implements m.Component<ContainerAttributes> {
  public view({
    attrs: {
      className,
      type,
      ...attrs
    },
    children
  }: m.Vnode<ContainerAttributes>): m.Children {
    return <div
      className={cx(
        styles.root,
        makeClassName('container'),
        makeClassName(type),
        className
      )}
      {...attrs}
    >
      {children}
    </div>
  }
}
