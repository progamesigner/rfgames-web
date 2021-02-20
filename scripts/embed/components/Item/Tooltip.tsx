import * as m from 'mithril'

import { UpgradeComponent } from '../../containers'
import { cx } from '../../libs'
import {
  GW2Item,
  GW2ItemRarity,
  GW2ItemStat,
  GW2ItemType,
  TooltipType
} from '../../types'

import { Coin } from '../Coin'
import { Icon } from '../Icon'
import { Tooltip, TooltipContent, TooltipHead, TooltipBody } from '../Tooltip'

import {
  attributeToName,
  buildItemName,
  calculateStatAttribute,
  createTakeFlow,
  markup,
  parseItemenrichmentSlots,
  parseItemFlags,
  parseItemInfusionSlots,
  parseItemStat,
  parseItemUpgradeSlots,
  toMinutes,
} from './lib'

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
  enrichments: Array<number>;
  infusions: Array<number>;
  item: GW2Item;
  stat?: GW2ItemStat;
  upgradeCount: number;
  upgrades: Array<number>;
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

export class ItemTooltip implements m.Component<ItemTooltipAttributes> {
  public view({
    attrs:
    {
      enrichments,
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

    const takeUpgrades = createTakeFlow(parseItemUpgradeSlots(item))
    const takeInfusions = createTakeFlow(parseItemInfusionSlots(item))
    const takeEnrichments = createTakeFlow(parseItemenrichmentSlots(item))

    return <TooltipContent type="item">
      <TooltipHead className={styles.tooltip.head}>
        <Icon
          className={styles.tooltip.icon}
          classSize={styles.tooltip.iconSize}
          src={item.icon}
        />
        <span
          className={cx(styles.tooltip.name, mapRarityToColor(item.rarity))}
      >{buildItemName(item, stat)}</span>
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
          item.details.defense > 0 ?
          <div className={styles.tooltip.attribute}>
            Defense: <span className={styles.tooltip.statItem}>{item.details.defense}</span>
          </div> :
          null :
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
              <span>({index + 1}): {m.trust(markup(bonus, styles.flavors))}</span>
            </div>
          )) :
          null
        }
        {
          item.type === GW2ItemType.CONSUMABLE ?
          <div className={styles.tooltip.consumable}>
            <Icon
              className={styles.tooltip.effectIcon}
              classSize={styles.tooltip.effectIconSize}
              disablePlaceholder={true}
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

        {takeUpgrades(upgrades).map((id, index) =>
          <UpgradeComponent
            key={index}
            store={store}
            id={id}
            unusedText="Unused Upgrade Slot"
            upgradeCount={upgradeCount}
          />
        )}

        {takeInfusions(infusions).map((id, index) =>
          <UpgradeComponent
            key={index}
            store={store}
            id={id}
            unusedText="Unused Infusion Slot"
          />
        )}

        {takeEnrichments(enrichments).map((id, index) =>
          <UpgradeComponent
            key={index}
            store={store}
            id={id}
            unusedText="Unused Enrichment Slot"
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
