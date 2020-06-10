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
    [TooltipType.GW2_ITEM]: [ItemTooltipAttributes, GW2Item];
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
  public view({ attrs: data }: m.Vnode<ItemTooltipAttributes>): m.Children {
    const {
      icon,
      name,
      rarity,
      type
    } = data

    const bonusCount = 0
    const flags = parseItemFlags(data)

    return <TooltipContent type="item">
      <TooltipHead className={styles.tooltip.head}>
        <Icon className={styles.tooltip.icon} src={icon}></Icon>
        <span
          className={cx(styles.tooltip.name, mapRarityToColor(rarity))}
        >{name}</span>
      </TooltipHead>
      <TooltipBody>
        {
          data.type === GW2ItemType.WEAPON ?
          <div className={styles.tooltip.attribute}>
            Weapon Strength: <span className={styles.tooltip.statItem}>{data.details.min_power} - {data.details.max_power}</span>
          </div> :
          null
        }
        {
          data.type === GW2ItemType.ARMOR || data.type === GW2ItemType.WEAPON ?
          <div className={styles.tooltip.attribute}>
            Defense: <span className={styles.tooltip.statItem}>{data.details.defense}</span>
          </div> :
          null
        }
        {
          data.type === GW2ItemType.ARMOR || data.type === GW2ItemType.BACK || data.type === GW2ItemType.TRINKET || data.type === GW2ItemType.UPGRADE_COMPONENT || data.type === GW2ItemType.WEAPON ?
          data.details.infix_upgrade && data.details.infix_upgrade.attributes.length > 0 ?
          data.details.infix_upgrade.attributes.map(({ attribute, modifier }) => (
            <div
              key={`${attribute}-${modifier}`}
              className={styles.tooltip.attribute}
            >
              <span className={data.type === GW2ItemType.UPGRADE_COMPONENT ? styles.tooltip.statBuff : styles.tooltip.statAttribute}>+{modifier} {attributeToName(attribute)}</span>
            </div>
          )) :
          data.details.infix_upgrade && data.details.infix_upgrade.buff ?
          <div className={styles.tooltip.statBuff}>{data.details.infix_upgrade.buff.description}</div> :
          null :
          null
        }
        {
          data.type === GW2ItemType.UPGRADE_COMPONENT && data.details.bonuses ?
          data.details.bonuses.map((bonus, index) => (
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
          data.type === GW2ItemType.CONSUMABLE ?
          <div className={styles.tooltip.consumable}>
            <Icon
              className={styles.tooltip.nestedIcon}
              inline={true}
              src={data.details.icon}
            />
            <span>
              {
                data.details.name ?
                <div>{data.details.name} ({toMinutes(data.details.duration_ms)}):</div> :
                null
              }
              {m.trust(markup(data.details.description))}
            </span>
          </div> :
          null
        }

        <br />

        {
          data.type === GW2ItemType.ARMOR ||data.type === GW2ItemType.BACK || data.type === GW2ItemType.TRINKET || data.type === GW2ItemType.WEAPON ?
          <div>{rarity}</div> :
          null
        }
        {
          data.type === GW2ItemType.ARMOR ?
          <div>{data.details.weight_class}</div> :
          null
        }
        {
          data.type === GW2ItemType.ARMOR || data.type === GW2ItemType.CONTAINER || data.type === GW2ItemType.GATHERING || data.type === GW2ItemType.GIZMO || data.type === GW2ItemType.TOOL || data.type === GW2ItemType.TRINKET || data.type === GW2ItemType.WEAPON ?
          <div>{data.details.type}</div> :
          data.type === GW2ItemType.BACK || data.type == GW2ItemType.CONSUMABLE ?
          <div>{type}</div> :
          null
        }
        {
          data.level > 0 ?
          <div>Required Level: {data.level}</div> :
          null
        }
        {
          data.description ?
          <div>{m.trust(markup(data.description, styles.flavors))}</div> :
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
          data.rarity !== GW2ItemRarity.LEGENDARY && data.vendor_value > 0 ?
          <Coin className={styles.tooltip.coin} value={data.vendor_value} /> :
          null
        }
      </TooltipBody>
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_ITEM, ItemTooltip)
