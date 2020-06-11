import {
  border,
  colors,
  em,
  layouts,
  margin,
  px,
  sizes,
  style,
  stylesheet
} from '../styles'

export const icon = stylesheet({
  root: {
  },
  block: {
    height: em(sizes.itemIcon),
    width: em(sizes.itemIcon)
  },
  inline: {
    height: em(sizes.inlineIcon),
    width: em(sizes.inlineIcon)
  }
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
    marginLeft: em(layouts.gap * 2)
  },
  consumable: {
    alignItems: 'flex-start',
    color: colors.consumable.toString(),
    display: 'flex'
  },
  effectIcon: {
    height: em(sizes.tooltipEffectIcon),
    marginRight: em(layouts.gap),
    width: em(sizes.tooltipEffectIcon)
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
    flexGrow: 0,
    flexShrink: 0,
    height: em(sizes.tooltipItemIcon),
    marginRight: em(layouts.gap),
    width: em(sizes.tooltipItemIcon)
  },
  name: {
  },
  spacing: {
    display: 'block',
    marginTop: em(layouts.gap * 2)
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
    margin: margin(em(layouts.gap * 2), 0)
  },
  upgradeCount: {
    marginLeft: em(layouts.gap)
  },
  upgradeIcon: {
    marginRight: em(layouts.gap)
  },
  upgradeIconSize: {
    height: em(sizes.tooltipUpgradeIcon),
    width: em(sizes.tooltipUpgradeIcon)
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
