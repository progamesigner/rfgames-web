import * as m from 'mithril'

import {
  GW2Skill,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIconPlaceholderAttributes,
  HasIDAttributes,
  HasInlineAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTextLinkAttributes,
  HasTooltipAttributes,
  TooltipType
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Text } from '../Text'

import './Tooltip'

import { bindTooltipEvents, buildWikiLink, parseSkillClassNames } from './lib'

import * as styles from './styles'
import { cx } from '../../libs'

interface SkillAttributes extends
  m.Attributes,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIconPlaceholderAttributes,
  HasIDAttributes<number>,
  HasInlineAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTextLinkAttributes,
  HasTooltipAttributes
{
  skill: GW2Skill;
}

export class Skill implements m.Component<SkillAttributes> {
  public view({
    attrs: {
      classIcon,
      className,
      classSize,
      classText,
      disableIcon,
      disableIconLink,
      disableIconPlaceholder,
      disableText,
      disableTextLink,
      disableTooltip,
      inline,
      link,
      overrideText,
      skill,
      store
    }
  }: m.Vnode<SkillAttributes>): m.Children {
    const name = overrideText || skill.name

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_SKILL, {
        skill
      }) :
      {}

    return <Container
      className={cx(parseSkillClassNames(skill), className)}
      type="skill"
    >
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classIcon)}
          classSize={cx(
            { [styles.icon.block] : !inline },
            { [styles.icon.inline] : inline },
            classSize
          )}
          disablePlaceholder={disableIconPlaceholder || inline}
          src={skill.icon}
          {...tooltipEvents}
        >
          {
            !disableIconLink ?
            <Link href={link || buildWikiLink(store, skill.name)} /> :
            null
          }
        </Icon> :
        null
      }
      {
        !disableText ?
        <Text
          className={cx(styles.name, classText)}
          {...disableTextLink && tooltipEvents}
        >
          {
            !disableTextLink ?
            <Link
              className={styles.link}
              href={link || buildWikiLink(store, skill.name)}
              {...!disableTextLink && tooltipEvents}
            >{name}</Link> :
            name
          }
        </Text> :
        null
      }
    </Container>
  }
}
