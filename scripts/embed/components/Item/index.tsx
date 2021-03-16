import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemStat,
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

import { bindTooltipEvents, buildWikiLink, parseItemClassNames } from './libs'

import * as styles from './styles'

export { UpgradeComponent } from './UpgradeComponent'

interface ItemAttributes extends
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
  item: GW2Item;
  enrichments?: ReadonlyArray<number>;
  infusions?: ReadonlyArray<number>;
  stat?: GW2ItemStat;
  upgradeCount?: number;
  upgrades?: ReadonlyArray<number>;
}

export class Item implements m.Component<ItemAttributes> {
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
      enrichments,
      infusions,
      inline,
      item,
      link,
      overrideText,
      stat,
      store,
      upgradeCount,
      upgrades
    }
  }: m.Vnode<ItemAttributes>): m.Children {
    const name = overrideText ?? item.name

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_ITEM, {
        enrichments: enrichments ?? [],
        infusions: infusions ?? [],
        item,
        stat,
        upgradeCount: upgradeCount ?? 1,
        upgrades: upgrades ?? []
      }) :
      {}

    return <Container
      className={cx(parseItemClassNames(item), className)}
      type="item"
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
          src={item.icon}
          {...tooltipEvents}
        >
          {
            !disableIconLink ?
            <Link href={link ?? buildWikiLink(store, item.name)} /> :
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
              href={link ?? buildWikiLink(store, item.name)}
              {...tooltipEvents}
            >{name}</Link> :
            name
          }
        </Text> :
        null
      }
    </Container>
  }
}
