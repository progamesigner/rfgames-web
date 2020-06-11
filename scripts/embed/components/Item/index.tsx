import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemStat,
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

import { bindTooltipEvents, buildWikiLink, parseItemClassNames } from './lib'

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
      stat,
      store,
      upgradeCount,
      upgrades,
      ...attrs
    }
  }: m.Vnode<ItemAttributes>): m.Children {
    const classes = parseItemClassNames(data)

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_ITEM, {
        infusions: infusions || [],
        item: data,
        stat,
        upgradeCount: upgradeCount || 1,
        upgrades: upgrades || []
      }) :
      {}

    return <Container inline={true} type="item" {...attrs}>
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
        <Name className={cx(styles.name, classes)} {...disableLink && tooltipEvents}>
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
