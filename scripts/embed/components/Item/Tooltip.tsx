import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemFlag,
  GW2ItemRarity,
  GW2ItemType,
  TooltipType
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

type ItemTooltipAttributes = GW2Item

interface ItemFlags {
  accountbound: boolean;
  soulbound: boolean;
  unique: boolean;
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
    attrs: item
  }: m.Vnode<ItemTooltipAttributes>): m.Children {
    const bonusCount = 0
    const flags = parseItemFlags(item)

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
          <div className={styles.tooltip.statBuff}>{m.trust(markup(item.details.infix_upgrade.buff.description, styles.flavors))}</div> :
          null :
          null
        }
        {
          item.type === GW2ItemType.UPGRADE_COMPONENT && item.details.bonuses ?
          item.details.bonuses.map((bonus, index) => (
            <div
              key={bonus}
              className={cx(styles.tooltip.bonusInactive, { [styles.tooltip.bonusActive]: bonusCount > index })}
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
              className={styles.tooltip.nestedIcon}
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

        <br />

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
