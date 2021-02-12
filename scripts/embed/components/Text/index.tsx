import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import './Tooltip'

import * as styles from './styles'

interface NameAttributes extends m.Attributes {
  __PADDING__?: undefined;
}

export class Text implements m.Component<NameAttributes> {
  public view({
    attrs: {
      className,
      ...attrs
    },
    children
  }: m.Vnode<NameAttributes>): m.Children {
    return <div
      className={cx(styles.root, className, makeClassName('text'))}
      {...attrs}
    >
      {children}
    </div>
  }
}
