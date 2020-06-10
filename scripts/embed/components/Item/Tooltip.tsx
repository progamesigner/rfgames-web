import * as m from 'mithril'

import { concat, constant, flow, take, times } from 'lodash/fp'

import { UpgradeContent } from '../../containers'
import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemFlag,
  GW2ItemRarity,
  GW2ItemStat,
  GW2ItemType,
  GW2ItemWeaponType,
  TooltipType,
  GW2ItemArmorType,
  GW2ItemTrinketType
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
  stat?: GW2ItemStat;
  upgradeCount: number;
  upgrades: Array<number>;
}

interface ItemFlags {
  accountbound: boolean;
  soulbound: boolean;
  unique: boolean;
}

function buildName(item: GW2Item, stat?: GW2ItemStat): string {
  if (stat && parseItemStat(item, stat)) {
    return `${stat.name} ${item.name}`
  }
  return item.name
}

function getHiddenItemNumber(item: GW2Item): number {
  return [
    extractHiddenItemNumberFromArmor,
    extractHiddenItemNumberFromBack,
    extractHiddenItemNumberFromTrinket,
    extractHiddenItemNumberFromWeapon
  ].reduce((number, func) => func(item) + number, 0)
}

function calculateStatAttribute(
  item: GW2Item,
  multiplier: number,
  value: number
): number {
  console.log(item, getHiddenItemNumber(item))
  return Math.floor(getHiddenItemNumber(item) * multiplier + value)
}

function createTakeFlow(items: Array<number>, slots: number) {
  return flow(constant(slots), times(constant(0)), concat(items), take(slots))
}

function extractHiddenItemNumberByRarity(
  item: GW2Item,
  ascended: number,
  exotic: number
): number {
  switch (item.rarity) {
    case GW2ItemRarity.LEGENDARY:
    case GW2ItemRarity.ASCENDED:
      return ascended
    case GW2ItemRarity.EXOTIC:
      return exotic
  }
  return 0
}

function extractHiddenItemNumberFromArmor(item: GW2Item): number {
  if (item.type === GW2ItemType.ARMOR) {
    switch (item.details.type) {
      case GW2ItemArmorType.SHOULDERS:
      case GW2ItemArmorType.GLOVES:
      case GW2ItemArmorType.BOOTS:
        return extractHiddenItemNumberByRarity(item, 134.78, 128.04)
      case GW2ItemArmorType.HELM:
      case GW2ItemArmorType.AQUATIC_HELM:
        return extractHiddenItemNumberByRarity(item, 180.67, 170.72)
      case GW2ItemArmorType.LEGGINGS:
        return extractHiddenItemNumberByRarity(item, 269.57, 256.08)
      case GW2ItemArmorType.COAT:
        return extractHiddenItemNumberByRarity(item, 404.00, 383.00)
    }
  }
  return 0
}

function extractHiddenItemNumberFromBack(item: GW2Item): number {
  if (item.type === GW2ItemType.BACK) {
    return extractHiddenItemNumberByRarity(item, 89.10, 85.50)
  }
  return 0
}

function extractHiddenItemNumberFromTrinket(item: GW2Item): number {
  if (item.type === GW2ItemType.TRINKET) {
    switch (item.details.type) {
      case GW2ItemTrinketType.ACCESSORY:
        return extractHiddenItemNumberByRarity(item, 224.05, 213.40)
      case GW2ItemTrinketType.AMULET:
        return extractHiddenItemNumberByRarity(item, 358.47, 341.44)
      case GW2ItemTrinketType.RING:
        return extractHiddenItemNumberByRarity(item, 268.85, 256.08)
    }
  }
  return 0
}

function extractHiddenItemNumberFromWeapon(item: GW2Item): number {
  if (item.type === GW2ItemType.WEAPON) {
    switch (item.details.type) {
      case GW2ItemWeaponType.AXE:
      case GW2ItemWeaponType.DAGGER:
      case GW2ItemWeaponType.MACE:
      case GW2ItemWeaponType.PISTOL:
      case GW2ItemWeaponType.SCEPTER:
      case GW2ItemWeaponType.SWORD:
      case GW2ItemWeaponType.FOCUS:
      case GW2ItemWeaponType.SHIELD:
      case GW2ItemWeaponType.TORCH:
      case GW2ItemWeaponType.WARHORN:
        return extractHiddenItemNumberByRarity(item, 358.47, 341.44)
      case GW2ItemWeaponType.GREATSWORD:
      case GW2ItemWeaponType.HAMMER:
      case GW2ItemWeaponType.LONGBOW:
      case GW2ItemWeaponType.RIFLE:
      case GW2ItemWeaponType.SHORTBOW:
      case GW2ItemWeaponType.STAFF:
      case GW2ItemWeaponType.SPEAR:
      case GW2ItemWeaponType.SPEARGUN:
      case GW2ItemWeaponType.TRIDENT:
        return extractHiddenItemNumberByRarity(item, 716.94, 682.88)
    }
  }
  return 0
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

function parseItemStat(item: GW2Item, stat?: GW2ItemStat): GW2ItemStat | null {
  if (stat) {
    if (
      item.type === GW2ItemType.ARMOR ||
      item.type === GW2ItemType.BACK ||
      item.type === GW2ItemType.TRINKET ||
      item.type === GW2ItemType.WEAPON
    ) {
      if (
        item.details.stat_choices &&
        item.details.stat_choices.includes(stat.id)
      ) {
        return stat
      }
    }
  }
  return null
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
      stat,
      store,
      upgradeCount,
      upgrades
    }
  }: m.Vnode<ItemTooltipAttributes>): m.Children {
    const currentStat = parseItemStat(item, stat)
    const flags = parseItemFlags(item)

    const takeUpgrades = createTakeFlow(upgrades, parseAvailableUpgradeSlots(item))
    const takeInfusions = createTakeFlow(infusions, parseAvailableInfusionSlots(item))

    return <TooltipContent type="item">
      <TooltipHead className={styles.tooltip.head}>
        <Icon className={styles.tooltip.icon} src={item.icon}></Icon>
        <span
          className={cx(styles.tooltip.name, mapRarityToColor(item.rarity))}
      >{buildName(item, stat)}</span>
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
          item.details.infix_upgrade.attributes.map(({ attribute, modifier }) => <div
            key={`${attribute}-${modifier}`}
            className={styles.tooltip.attribute}
          >
            <span
              className={item.type === GW2ItemType.UPGRADE_COMPONENT ? styles.tooltip.statBuff : styles.tooltip.statAttribute}
            >+{modifier} {attributeToName(attribute)}</span>
          </div>) :
          currentStat ?
          currentStat.attributes.map(({ attribute, multiplier, value }) => <div
            key={`${attribute}-${multiplier}-${value}`}
            className={styles.tooltip.attribute}
          >
            <span
              className={styles.tooltip.statAttribute}
            >+{calculateStatAttribute(item, multiplier, value)} {attributeToName(attribute)}</span>
          </div>) :
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
