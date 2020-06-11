import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemStat,
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasIconLinkAttributes,
  HasIDAttributes,
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

import { bindTooltipEvents, buildWikiLink, parseItemClassNames } from './lib'

import * as styles from './styles'

export { UpgradeComponent } from './UpgradeComponent'

interface ItemAttributes extends
  m.Attributes,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIconPlaceholderAttributes,
  HasTextAttributes,
  HasTextLinkAttributes,
  HasIDAttributes<number>,
  HasStoreAttributes,
  HasTooltipAttributes
{
  item: GW2Item;
  infusions?: Array<number>;
  stat?: GW2ItemStat;
  upgradeCount?: number;
  upgrades?: Array<number>;
}

export class Item implements m.Component<ItemAttributes> {
  public view({
    attrs: {
      item,
      disableIcon,
      disableIconLink,
      disableIconPlaceholder,
      disableText,
      disableTextLink,
      disableTooltip,
      overrideText,
      infusions,
      stat,
      store,
      upgradeCount,
      upgrades
    }
  }: m.Vnode<ItemAttributes>): m.Children {
    const classes = parseItemClassNames(item)
    const name = overrideText || item.name

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_ITEM, {
        infusions: infusions || [],
        item,
        stat,
        upgradeCount: upgradeCount || 1,
        upgrades: upgrades || []
      }) :
      {}

    return <Container type="item">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, classes)}
          classSize={styles.iconSize}
          disablePlaceholder={disableIconPlaceholder}
          src={item.icon}
          {...tooltipEvents}
        >
          {
            !disableIconLink ?
            <Link href={buildWikiLink(item.name)} /> :
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
              href={buildWikiLink(item.name)}
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
