import * as m from 'mithril'

import { concat, constant, flow, take, times } from 'lodash/fp'

import { UpgradeContent } from '../../containers'
import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemFlag,
  GW2ItemRarity,
  GW2ItemType,
  TooltipType,
  GW2ItemWeaponType
} from '../../types'

import { Coin } from '../Coin'
import { Icon } from '../Icon'
import { Tooltip, TooltipContent, TooltipHead, TooltipBody } from '../Tooltip'

import { markup, attributeToName } from '../parser'

import * as styles from './styles'

declare module '../../types/tooltip' {
  const enum TooltipType {
    GW2_ITEM = 'GW2Item'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_ITEM]: ItemTooltipAttributes;
  }
}

interface ItemTooltipAttributes extends m.Attributes {
  infusions: Array<number>;
  item: GW2Item;
  upgradeCount: number;
  upgrades: Array<number>;
}

interface ItemFlags {
  accountbound: boolean;
  soulbound: boolean;
  unique: boolean;
}

function createTakeFlow(items: Array<number>, slots: number) {
  return flow(constant(slots), times(constant(0)), concat(items), take(slots))
}

function mapRarityToColor(rarity: GW2ItemRarity): string | null {
  switch (rarity) {
    case GW2ItemRarity.ASCENDED:
      return styles.rarities.ascended
    case GW2ItemRarity.BASIC:
      return styles.rarities.basic
    case GW2ItemRarity.EXOTIC:
      return styles.rarities.exotic
    case GW2ItemRarity.FINE:
      return styles.rarities.fine
    case GW2ItemRarity.JUNK:
      return styles.rarities.junk
    case GW2ItemRarity.LEGENDARY:
      return styles.rarities.legendary
    case GW2ItemRarity.MASTERWORK:
      return styles.rarities.masterwork
    case GW2ItemRarity.RARE:
      return styles.rarities.rare
  }
}

function parseAvailableUpgradeSlots(item: GW2Item): number {
  switch (item.type) {
    case GW2ItemType.ARMOR:
      return 1
    case GW2ItemType.WEAPON:
      if (
        item.details.type === GW2ItemWeaponType.GREATSWORD ||
        item.details.type === GW2ItemWeaponType.HAMMER ||
        item.details.type === GW2ItemWeaponType.LONGBOW ||
        item.details.type === GW2ItemWeaponType.RIFLE ||
        item.details.type === GW2ItemWeaponType.SHORTBOW ||
        item.details.type === GW2ItemWeaponType.SPEAR ||
        item.details.type === GW2ItemWeaponType.SPEARGUN ||
        item.details.type === GW2ItemWeaponType.STAFF ||
        item.details.type === GW2ItemWeaponType.TRIDENT
      ) {
        return 2
      }
      return 1
    case GW2ItemType.BACK:
    case GW2ItemType.TRINKET:
        if (
          item.rarity === GW2ItemRarity.ASCENDED ||
          item.rarity === GW2ItemRarity.LEGENDARY
        ) {
          return 0
        }
        return 1
  }
  return 0
}

function parseAvailableInfusionSlots(item: GW2Item): number {
  switch (item.type) {
    case GW2ItemType.ARMOR:
    case GW2ItemType.WEAPON:
    case GW2ItemType.BACK:
    case GW2ItemType.TRINKET:
      return item.details.infusion_slots.length
  }
  return 0
}

function parseItemFlags(item: GW2Item): ItemFlags {
  return item.flags.reduce((flags, flag) => {
    switch (flag) {
      case GW2ItemFlag.ACCOUNT_BIND_ON_USE:
      case GW2ItemFlag.ACCOUNT_BOUND:
        return {
          ...flags,
          accountbound: true
        }
      case GW2ItemFlag.SOULBIND_ON_ACQUIRE:
      case GW2ItemFlag.SOULBIND_ON_USE:
        return {
          ...flags,
          soulblound: true
        }
      case GW2ItemFlag.UNIQUE:
        return {
          ...flags,
          unique: true
        }
    }
    return flags
  }, {
    accountbound: false,
    soulbound: false,
    unique: false
  } as ItemFlags)
}

function toMinutes(milliseconds: number) {
  return `${Math.floor(milliseconds / 60000)} m`
}

export class ItemTooltip implements m.Component<ItemTooltipAttributes> {
  public view({
    attrs:
    {
      infusions,
      item,
      store,
      upgradeCount,
      upgrades
    }
  }: m.Vnode<ItemTooltipAttributes>): m.Children {
    const flags = parseItemFlags(item)

    const takeUpgrades = createTakeFlow(upgrades, parseAvailableUpgradeSlots(item))
    const takeInfusions = createTakeFlow(infusions, parseAvailableInfusionSlots(item))

    return <TooltipContent type="item">
      <TooltipHead className={styles.tooltip.head}>
        <Icon className={styles.tooltip.icon} src={item.icon}></Icon>
        <span
          className={cx(styles.tooltip.name, mapRarityToColor(item.rarity))}
        >{item.name}</span>
      </TooltipHead>
      <TooltipBody>
        {
          item.type === GW2ItemType.WEAPON ?
          <div className={styles.tooltip.attribute}>
            Weapon Strength: <span className={styles.tooltip.statItem}>{item.details.min_power} - {item.details.max_power}</span>
          </div> :
          null
        }
        {
          item.type === GW2ItemType.ARMOR || item.type === GW2ItemType.WEAPON ?
          <div className={styles.tooltip.attribute}>
            Defense: <span className={styles.tooltip.statItem}>{item.details.defense}</span>
          </div> :
          null
        }
        {
          item.type === GW2ItemType.ARMOR || item.type === GW2ItemType.BACK || item.type === GW2ItemType.TRINKET || item.type === GW2ItemType.UPGRADE_COMPONENT || item.type === GW2ItemType.WEAPON ?
          item.details.infix_upgrade && item.details.infix_upgrade.attributes.length > 0 ?
          item.details.infix_upgrade.attributes.map(({ attribute, modifier }) => (
            <div
              key={`${attribute}-${modifier}`}
              className={styles.tooltip.attribute}
            >
              <span className={item.type === GW2ItemType.UPGRADE_COMPONENT ? styles.tooltip.statBuff : styles.tooltip.statAttribute}>+{modifier} {attributeToName(attribute)}</span>
            </div>
          )) :
          item.details.infix_upgrade && item.details.infix_upgrade.buff ?
          <div
            className={styles.tooltip.statBuff}
          >
            {m.trust(markup(item.details.infix_upgrade.buff.description, styles.flavors))}
          </div> :
          null :
          null
        }
        {
          item.type === GW2ItemType.UPGRADE_COMPONENT && item.details.bonuses ?
          item.details.bonuses.map((bonus, index) => (
            <div
              key={bonus}
              className={cx(
                { [styles.tooltip.bonusActive]: upgradeCount > index },
                { [styles.tooltip.bonusInactive]: upgradeCount <= index }
              )}
            >
              <span>({index + 1}): {bonus}</span>
            </div>
          )) :
          null
        }
        {
          item.type === GW2ItemType.CONSUMABLE ?
          <div className={styles.tooltip.consumable}>
            <Icon
              className={styles.tooltip.effectIcon}
              inline={true}
              src={item.details.icon}
            />
            <span>
              {
                item.details.name ?
                <div>{item.details.name} ({toMinutes(item.details.duration_ms)}):</div> :
                null
              }
              {m.trust(markup(item.details.description, styles.flavors))}
            </span>
          </div> :
          null
        }

        {takeUpgrades().map((id, index) =>
          <UpgradeContent
            key={index}
            store={store}
            id={id}
            unusedText="Unused Upgrade Slot"
            upgradeCount={upgradeCount}
          />
        )}

        {takeInfusions().map((id, index) =>
          <UpgradeContent
            key={index}
            store={store}
            id={id}
            unusedText="Unused Infusion Slot"
          />
        )}

        <span className={styles.tooltip.spacing}></span>

        {
          item.type === GW2ItemType.ARMOR ||item.type === GW2ItemType.BACK || item.type === GW2ItemType.TRINKET || item.type === GW2ItemType.WEAPON ?
          <div>{item.rarity}</div> :
          null
        }
        {
          item.type === GW2ItemType.ARMOR ?
          <div>{item.details.weight_class}</div> :
          null
        }
        {
          item.type === GW2ItemType.ARMOR || item.type === GW2ItemType.CONTAINER || item.type === GW2ItemType.GATHERING || item.type === GW2ItemType.GIZMO || item.type === GW2ItemType.TOOL || item.type === GW2ItemType.TRINKET || item.type === GW2ItemType.WEAPON ?
          <div>{item.details.type}</div> :
          item.type === GW2ItemType.BACK || item.type == GW2ItemType.CONSUMABLE ?
          <div>{item.type}</div> :
          null
        }
        {
          item.type === GW2ItemType.UPGRADE_COMPONENT ?
          <div>{m.trust(markup(item.description, styles.flavors))}</div> :
          null
        }
        {
          item.level > 0 ?
          <div>Required Level: {item.level}</div> :
          null
        }
        {
          item.type === GW2ItemType.UPGRADE_COMPONENT ?
          null :
          item.description ?
          <div>{m.trust(markup(item.description, styles.flavors))}</div> :
          null
        }
        {
          flags.unique ?
          <div>Unique</div> :
          null
        }
        {
          flags.accountbound ?
          <div>Account Bound</div> :
          null
        }
        {
          flags.soulbound ?
          <div>Soul Bound</div> :
          null
        }
        {
          item.rarity !== GW2ItemRarity.LEGENDARY && item.vendor_value > 0 ?
          <Coin className={styles.tooltip.coin} value={item.vendor_value} /> :
          null
        }
      </TooltipBody>
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_ITEM, ItemTooltip)
