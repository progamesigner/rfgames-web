import * as m from 'mithril'

import {
  GW2Item,
  GW2ItemStat,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes,
  TooltipType
} from '../../types'

import { bindTooltipEvents, buildWikiLink } from '../helpers'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Name } from '../Name'

import './Tooltip'

import * as styles from './styles'

export { UpgradeContent } from './UpgradeContent'

interface ItemAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes
{
  data: GW2Item;
  infusions?: Array<number>;
  stat?: GW2ItemStat;
  upgradeCount?: number;
  upgrades?: Array<number>;
}

export class Item implements m.Component<ItemAttributes> {
  public view({
    attrs: {
      data,
      disableIcon,
      disableLink,
      disableText,
      disableTooltip,
      infusions,
      inline,
      stat,
      store,
      upgradeCount,
      upgrades,
      ...attrs
    }
  }: m.Vnode<ItemAttributes>): m.Children {
    const {
      icon,
      name
    } = data

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_ITEM, {
        infusions: infusions || [],
        item: data,
        stat,
        upgradeCount: upgradeCount || 1,
        upgrades: upgrades || []
      }) :
      {}

    return <Container inline={!disableText || inline} type="item" {...attrs}>
      {
        !disableIcon ?
        <Icon
          className={styles.icon}
          inline={!disableText || inline}
          src={icon}
          {...tooltipEvents}
        /> :
        null
      }
      {
        !disableText ?
        <Name className={styles.name} {...disableLink && tooltipEvents}>
          {
            !disableLink ?
            <Link
              className={styles.link}
              href={buildWikiLink(name)}
              {...!disableLink && tooltipEvents}
            >{name}</Link> :
            name
          }
        </Name> :
        null
      }
    </Container>
  }
}
