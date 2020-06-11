import * as m from 'mithril'

import { cx } from '../../libs'

import {
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIconPlaceholderAttributes,
  HasIDAttributes,
  HasInlineAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTextLinkAttributes,
  HasTooltipAttributes,
  TooltipType,
  GW2Trait,
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Text } from '../Text'

import './Tooltip'

import {
  bindTooltipEvents,
  buildWikiLink,
  parseTraitClassNames
} from './lib'

import * as styles from './styles'

interface TraitAttributes extends
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
  trait: GW2Trait;
}

export class Trait implements m.Component<TraitAttributes> {
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
      store,
      trait
    }
  }: m.Vnode<TraitAttributes>): m.Children {
    const classes = parseTraitClassNames(trait)
    const name = overrideText || trait.name

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_TRAIT, {
        trait
      }) :
      {}

    return <Container type="trait">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classes)}
          classSize={inline ? styles.icon.inline : styles.icon.size}
          disablePlaceholder={disableIconPlaceholder || inline}
          src={trait.icon}
          {...tooltipEvents}
        >
          {
            !disableIconLink ?
            <Link href={link || buildWikiLink(trait.name)} /> :
            null
          }
        </Icon> :
        null
      }
      {
        !disableText ?
        <Text
          className={cx(styles.name, classes)}
          {...disableTextLink && tooltipEvents}
        >
          {
            !disableTextLink ?
            <Link
              className={styles.link}
              href={link || buildWikiLink(trait.name)}
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
