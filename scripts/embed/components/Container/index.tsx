import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

interface ContainerAttributes extends m.Attributes {
  embedType: string;
  inline?: boolean;
}

export class Container implements m.Component<ContainerAttributes> {
  public view({
    attrs: {
      className,
      embedType,
      inline,
      ...attrs
    },
    children
  }: m.Vnode<ContainerAttributes>): m.Children {
    return <div
      className={cx(
        styles.container,
        inline && styles.inline,
        makeClassName('container'),
        `is-${embedType}`,
        className
      )}
      {...attrs}
    >
      {children}
    </div>
  }
}
