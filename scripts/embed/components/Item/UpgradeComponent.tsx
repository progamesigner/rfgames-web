import * as m from 'mithril'

import { cx } from '../../libs'
import { GW2Item, GW2ItemType } from '../../types'

import { Icon } from '../Icon'

import { markup } from './lib'

import * as styles from './styles'

interface UpgradeComponentAttributes {
  item?: GW2Item;
  unusedText: string;
  upgradeCount: number;
}

export class UpgradeComponent implements m.Component<UpgradeComponentAttributes> {
  public view({
    attrs:
    {
      item,
      unusedText,
      upgradeCount
    }
  }: m.Vnode<UpgradeComponentAttributes>): m.Children {
    if (item) {
      if (item.type === GW2ItemType.UPGRADE_COMPONENT) {
        return <div className={styles.tooltip.upgrade}>
          <Icon
            className={styles.tooltip.upgradeIcon}
            classSize={styles.tooltip.upgradeIconSize}
            disablePlaceholder={true}
            src={item.icon}
          />
          <span className={styles.tooltip.upgradeName}>
            {item.name}
            {
              item.details.bonuses ?
              <span
                className={styles.tooltip.upgradeCount}
              >({upgradeCount}/{item.details.bonuses.length})</span> :
              null
            }
          </span>
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

    return <div className={styles.tooltip.upgrade}>
      <Icon
        className={styles.tooltip.upgradeIcon}
        classSize={styles.tooltip.upgradeIconSize}
        disablePlaceholder={false}
      />
      <span>{unusedText}</span>
    </div>
  }
}
