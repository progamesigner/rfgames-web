import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Skill,
  HasIDAttributes
} from '../../types'

import { buildWikiLink } from '../helpers'

import { Icon } from '../Icon'
import { Link } from '../Link'

import * as styles from './styles'

type SkillAttributes = m.Attributes & HasIDAttributes<number> & GW2Skill

export class Skill implements m.Component<SkillAttributes> {
  public view({
    attrs: data
  }: m.Vnode<SkillAttributes>): m.Children {
    const {
      icon,
      name,
      slot
    } = data

    return <div className={cx(styles.root)}>
      <Icon
        className={cx(styles.icon, 'is-skill', `is-${slot.toLowerCase()}`)}
        src={icon}
      />
      <span className={cx(styles.name)}>
        <Link href={buildWikiLink(name)}>{name}</Link>
      </span>
    </div>
  }
}
