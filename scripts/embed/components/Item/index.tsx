import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Item,
  HasIDAttributes
} from '../../types'

import { buildWikiLink } from '../helpers'

import { Icon } from '../Icon'
import { Link } from '../Link'

import * as styles from './styles'

type ItemAttributes = m.Attributes & HasIDAttributes<number> & GW2Item

export class Item implements m.Component<ItemAttributes> {
  public view({
    attrs: data
  }: m.Vnode<ItemAttributes>): m.Children {
    const {
      icon,
      name
    } = data

    return <div className={cx(styles.root)}>
      <Icon className={cx(styles.icon, 'is-item')} src={icon} />
      <span className={cx(styles.name)}>
        <Link href={buildWikiLink(name)}>{name}</Link>
      </span>
    </div>
  }
}
