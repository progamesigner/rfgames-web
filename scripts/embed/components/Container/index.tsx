import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

interface ContainerAttributes extends m.Attributes {
  embedType: string;
}

export class Container implements m.Component<ContainerAttributes> {
  public view({
    attrs: {
      className,
      embedType
    },
    children
  }: m.Vnode<ContainerAttributes>): m.Children {
    return <div
      className={cx(
        styles.container,
        makeClassName('container'),
        `is-${embedType}`,
        className
      )}
    >
      {children}
    </div>
  }
}
