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
  activeTraits?: ReadonlyArray<number>;
  trait: GW2Trait;
}

export class Trait implements m.Component<TraitAttributes> {
  public view({
    attrs: {
      activeTraits,
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
      store,
      trait
    }
  }: m.Vnode<TraitAttributes>): m.Children {
    const name = overrideText || trait.name

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_TRAIT, {
        activeTraits,
        trait
      }) :
      {}

    return <Container
      className={cx(parseTraitClassNames(trait), className)}
      type="trait"
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
          src={trait.icon}
          {...tooltipEvents}
        >
          {
            !disableIconLink ?
            <Link href={link || buildWikiLink(store, trait.name)} /> :
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
              href={link || buildWikiLink(store, trait.name)}
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
