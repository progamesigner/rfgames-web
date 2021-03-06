import * as m from 'mithril'

import { UpgradeComponent } from '../../../containers'
import { cx } from '../../../libs'
import {
  GW2Item,
  GW2ItemRarity,
  GW2ItemStat,
  GW2ItemType,
  TooltipType
} from '../../../types'

import { Coin } from '../../Coin'
import { Icon } from '../../Icon'
import { Tooltip, TooltipContent, TooltipHead, TooltipBody } from '../../Tooltip'

import {
  attributeToName,
  buildItemName,
  calculateStatAttribute,
  createTakePipe,
  markup,
  parseItemenrichmentSlots,
  parseItemFlags,
  parseItemInfusionSlots,
  parseItemStat,
  parseItemUpgradeSlots,
  toMinutes,
} from './libs'

import * as styles from './styles'

declare module '../../../types/tooltip' {
  const enum TooltipType {
    GW2_ITEM = 'GW2Item'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_ITEM]: ItemTooltipAttributes;
  }
}

interface ItemTooltipAttributes extends m.Attributes {
  enrichments: ReadonlyArray<number>;
  infusions: ReadonlyArray<number>;
  item: GW2Item;
  stat?: GW2ItemStat;
  upgradeCount: number;
  upgrades: ReadonlyArray<number>;
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

    const takeUpgrades = createTakePipe(parseItemUpgradeSlots(item))
    const takeInfusions = createTakePipe(parseItemInfusionSlots(item))
    const takeEnrichments = createTakePipe(parseItemenrichmentSlots(item))

    return <TooltipContent type="item">
      <TooltipHead className={styles.head}>
        <Icon
          className={styles.icon}
          classSize={styles.iconSize}
          src={item.icon}
        />
        <span
          className={cx(styles.name, mapRarityToColor(item.rarity))}
      >{buildItemName(item, stat)}</span>
      </TooltipHead>
      <TooltipBody>
        {
          item.type === GW2ItemType.WEAPON ?
          <div className={styles.attribute}>
            Weapon Strength: <span className={styles.stat.item}>{item.details.min_power} - {item.details.max_power}</span>
          </div> :
          null
        }
        {
          item.type === GW2ItemType.ARMOR || item.type === GW2ItemType.WEAPON ?
          item.details.defense > 0 ?
          <div className={styles.attribute}>
            Defense: <span className={styles.stat.item}>{item.details.defense}</span>
          </div> :
          null :
          null
        }
        {
          item.type === GW2ItemType.ARMOR || item.type === GW2ItemType.BACK || item.type === GW2ItemType.TRINKET || item.type === GW2ItemType.UPGRADE_COMPONENT || item.type === GW2ItemType.WEAPON ?
          item.details.infix_upgrade && item.details.infix_upgrade.attributes.length > 0 ?
          item.details.infix_upgrade.attributes.map(({ attribute, modifier }) => <div
            key={`${attribute}-${modifier}`}
            className={styles.attribute}
          >
            <span
              className={item.type === GW2ItemType.UPGRADE_COMPONENT ? styles.stat.buff : styles.stat.attribute}
            >+{modifier} {attributeToName(attribute)}</span>
          </div>) :
          currentStat ?
          currentStat.attributes.map(({ attribute, multiplier, value }) => <div
            key={`${attribute}-${multiplier}-${value}`}
            className={styles.attribute}
          >
            <span
              className={styles.stat.attribute}
            >+{calculateStatAttribute(item, multiplier, value)} {attributeToName(attribute)}</span>
          </div>) :
          item.details.infix_upgrade && item.details.infix_upgrade.buff ?
          <div
            className={styles.stat.buff}
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
                { [styles.bonus.active]: upgradeCount > index },
                { [styles.bonus.inactive]: upgradeCount <= index }
              )}
            >
              <span>({index + 1}): {m.trust(markup(bonus, styles.flavors))}</span>
            </div>
          )) :
          null
        }
        {
          item.type === GW2ItemType.CONSUMABLE ?
          <div className={styles.consumable}>
            <Icon
              className={styles.effect.icon}
              classSize={styles.effect.iconSize}
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

        <span className={styles.spacing}></span>

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
          <Coin className={styles.coin} value={item.vendor_value} /> :
          null
        }
      </TooltipBody>
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_ITEM, ItemTooltip)
