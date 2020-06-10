import * as m from 'mithril'

import { cx } from '../../libs'
import { GW2Item, GW2ItemType } from '../../types'

import { Icon } from '../Icon'

import { markup } from '../parser'

import * as styles from './styles'

interface UpgradeContentAttributes {
  data?: GW2Item;
  upgradeCount: number;
  unusedText: string;
}

export class UpgradeContent implements m.Component<UpgradeContentAttributes> {
  public view({
    attrs:
    {
      data: item,
      upgradeCount,
      unusedText,
      ...attrs
    }
  }: m.Vnode<UpgradeContentAttributes>): m.Children {
    if (item) {
      if (item.type === GW2ItemType.UPGRADE_COMPONENT) {
        return <div className={styles.tooltip.upgrade} {...attrs}>
          <Icon className={styles.tooltip.upgradeIcon} src={item.icon} />
          <span className={styles.tooltip.upgradeName}>{item.name}</span>
          {
            item.details.bonuses ?
            item.details.bonuses.map((bonus, index) => (
              <div
                key={bonus}
                className={cx(
                  { [styles.tooltip.bonusActive]: upgradeCount > index },
                  { [styles.tooltip.bonusInactive]: upgradeCount <= index }
                )}
              >
                <span>({index + 1}): {markup(bonus, styles.flavors)}</span>
              </div>
            )) :
            null
          }
          {
            item.details.infix_upgrade && item.details.infix_upgrade.buff ?
            <div
              className={styles.tooltip.statBuff}
            >
              {m.trust(markup(item.details.infix_upgrade.buff.description, styles.flavors))}
            </div> :
            null
          }
        </div>
      }

      return null
    }

    return <div className={styles.tooltip.upgrade} {...attrs}>
      <Icon className={styles.tooltip.upgradeIcon} />
      <span>{unusedText}</span>
    </div>
  }
}
