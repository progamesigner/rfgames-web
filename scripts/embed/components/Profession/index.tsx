import * as m from 'mithril'

import { cx } from '../../libs'
import { HasIDAttributes, GW2Profession } from '../../types'

import { Icon } from '../Icon'

import * as styles from './styles'

interface ProfessionAttributes extends m.Attributes, HasIDAttributes<string>, GW2Profession {
  text?: string;
}

export class Profession implements m.Component<ProfessionAttributes> {
  public view({
    attrs
  }: m.Vnode<ProfessionAttributes>): m.Children {
    const {
      icon_big,
      id,
      name,
      text
    } = attrs

    return <div className={cx(styles.root, styles.inline)}>
      <Icon
        className={cx(styles.icon, 'is-profession', `is-${id.toLowerCase()}`)}
        src={icon_big}
      />
      <span className={cx(styles.name)}>{text || name}</span>
    </div>
  }
}
