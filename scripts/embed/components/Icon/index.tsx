import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'

import * as styles from './styles'

const COUNT_THRESHOLD = 1

interface IconAttributes extends m.Attributes {
  applyCount?: number;
  classSize?: string;
  disablePlaceholder: boolean;
  src?: string;
}

export class Icon implements m.Component<IconAttributes> {
  public view({
    attrs: {
      applyCount,
      className,
      classSize,
      disablePlaceholder,
      src,
      ...attrs
    },
    children
  }: m.Vnode<IconAttributes>): m.Children {
    return <div
      className={cx(
        styles.root,
        !disablePlaceholder && styles.placeholder,
        className,
        classSize,
        makeClassName('icon')
      )}
      {...attrs}
    >
      <div className={cx(styles.icon, src && styles.image(src))}></div>
      {
        applyCount && applyCount > COUNT_THRESHOLD ?
        <span className={styles.applyCount}>{applyCount}</span> :
        null
      }
      {children}
    </div>
  }
}
