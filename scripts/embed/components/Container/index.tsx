import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

interface ContainerAttributes extends m.Attributes {
  type: string;
  inline?: boolean;
}

export class Container implements m.Component<ContainerAttributes> {
  public view({
    attrs: {
      className,
      inline,
      type,
      ...attrs
    },
    children
  }: m.Vnode<ContainerAttributes>): m.Children {
    return <div
      className={cx(
        styles.root,
        inline && styles.inline,
        makeClassName(type),
        className
      )}
      {...attrs}
    >
      {children}
    </div>
  }
}
