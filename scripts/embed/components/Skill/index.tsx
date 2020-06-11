import * as m from 'mithril'

import {
  GW2Skill,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes,
  TooltipType
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Name } from '../Name'

import './Tooltip'

import { bindTooltipEvents, buildWikiLink, parseSkillClassNames } from './lib'

import * as styles from './styles'
import { cx } from '../../libs'

interface SkillAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes
{
  data: GW2Skill;
}

export class Skill implements m.Component<SkillAttributes> {
  public view({
    attrs: {
      data,
      disableIcon,
      disableLink,
      disableText,
      disableTooltip,
      store,
      ...attrs
    }
  }: m.Vnode<SkillAttributes>): m.Children {
    const classes = parseSkillClassNames(data)

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_SKILL, {
        skill: data
      }) :
      {}

    return <Container inline={true} type="skill" {...attrs}>
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, classes)}
          classSize={styles.iconSize}
          placeholder={true}
          src={data.icon}
          {...tooltipEvents}
        /> :
        null
      }
      {
        !disableText ?
        <Name
          className={cx(styles.name, classes)}
          {...disableLink && tooltipEvents}
        >
          {
            !disableLink ?
            <Link
              className={styles.link}
              href={buildWikiLink(data.name)}
              {...!disableLink && tooltipEvents}
            >{data.name}</Link> :
            data.name
          }
        </Name> :
        null
      }
    </Container>
  }
}
