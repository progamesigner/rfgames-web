import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Specialization,
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

import {
  bindTooltipEvents,
  buildWikiLink,
  parseSpecializationClassNames
} from './lib'

import * as styles from './styles'

interface SpecializationAttributes extends
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
  specialization: GW2Specialization;
}

export class Specialization implements m.Component<SpecializationAttributes> {
  public view({
    attrs: {
      disableIcon,
      disableIconLink,
      disableIconPlaceholder,
      disableText,
      disableTextLink,
      disableTooltip,
      inline,
      link,
      overrideText,
      specialization,
      store
    }
  }: m.Vnode<SpecializationAttributes>): m.Children {
    const classes = parseSpecializationClassNames(specialization)
    const name = overrideText || specialization

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_SPECIALIZATION, {
        specialization
      }) :
      {}

    return <Container type="specialization">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classes)}
          classSize={inline ? styles.icon.inline : styles.icon.size}
          disablePlaceholder={disableIconPlaceholder || inline}
          src={specialization.icon}
          {...tooltipEvents}
        >
          {
            !disableIconLink ?
            <Link href={link || buildWikiLink(specialization.name)} />:
            null
          }
        </Icon> :
        null
      }
      {
        !disableText ?
        <Text className={cx(styles.name, classes)} {...disableTextLink && tooltipEvents}>
          {
            !disableTextLink ?
            <Link
              className={styles.link}
              href={link || buildWikiLink(specialization.name)}
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
