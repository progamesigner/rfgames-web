import { border, margin, px, rem, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

export const icon = style()

export const iconSize = style({
  height: rem(sizes.itemIcon),
  width: rem(sizes.itemIcon)
})

export const link = style()

export const name = style()

export const tooltip = stylesheet({
  attribute: {
  },
  bonusActive: {
    color: colors.bonusActive.toString()
  },
  bonusInactive: {
    color: colors.bonusInactive.toString()
  },
  coin: {
    marginLeft: rem(2 * sizes.gap)
  },
  consumable: {
    alignItems: 'flex-start',
    color: colors.consumable.toString(),
    display: 'flex'
  },
  effectIcon: {
    height: rem(sizes.tooltipEffectIcon),
    marginRight: rem(sizes.gap),
    width: rem(sizes.tooltipEffectIcon)
  },
  head: {
    alignItems: 'center',
    display: 'flex'
  },
  icon: {
    border: border({
      style: 'solid',
      width: px(1)
    }),
    borderColor: colors.tooltipItemBorder,
    borderRadius: rem(0.0625),
    height: rem(sizes.tooltipItemIcon),
    marginRight: rem(sizes.gap),
    width: rem(sizes.tooltipItemIcon)
  },
  name: {
  },
  spacing: {
    display: 'block',
    marginTop: rem(2 * sizes.gap)
  },
  statAttribute: {
    color: colors.statAttribute.toString()
  },
  statBuff: {
    color: colors.statBuff.toString()
  },
  statItem: {
    color: colors.statItem.toString()
  },
  upgrade: {
    margin: margin(rem(2 * sizes.gap), 0)
  },
  upgradeCount: {
    marginLeft: rem(sizes.gap)
  },
  upgradeIcon: {
    marginRight: rem(sizes.gap)
  },
  upgradeIconSize: {
    height: rem(sizes.tooltipUpgradeIcon),
    width: rem(sizes.tooltipUpgradeIcon)
  },
  upgradeName: {
    color: colors.bonusActive.toString()
  }
})

export const flavors = stylesheet({
  abilitytype: {
    color: colors.formatAbilityType.toString()
  },
  flavor: {
    color: colors.formatFlavor.toString()
  },
  reminder: {
    color: colors.formatReminder.toString()
  }
})

export const rarities = stylesheet({
  junk: {
    color: colors.rarityJunk.toString()
  },
  basic: {
    color: colors.rarityBasic.toString()
  },
  fine: {
    color: colors.rarityFine.toString()
  },
  masterwork: {
    color: colors.rarityMasterwork.toString()
  },
  rare: {
    color: colors.rarityRare.toString()
  },
  exotic: {
    color: colors.rarityExotic.toString()
  },
  ascended: {
    color: colors.rarityAscended.toString()
  },
  legendary: {
    color: colors.rarityLegendary.toString()
  }
})
