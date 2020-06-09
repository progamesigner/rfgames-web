import { borderColor, color, percent } from '../libs'

export * from '../libs'

export const colors = {
  applyCount: color('#fff4cf'),
  bonusActive: color('#5599FF'),
  bonusInactive: color('#AAAAAA'),
  coinCopper: color('#a0673a'),
  coinGold: color('#e5be45'),
  coinSilver: color('#cbcac8'),
  embedBackground: color('#151718'),
  embedBorder: color('#151718').darken(percent(25)),
  formatAbilityType: color('#FFC90E'),
  formatFlavor: color('#94DCD2'),
  formatReminder: color('#4564A1'),
  formatSkill: color('#EFDF80'),
  loaderBorder: color('hsla(0, 0%, 0%, 0.25)'),
  rarityAscended: color('#FB3E8D'),
  rarityBasic: color('#EEEEEE'),
  rarityExotic: color('#FFA405'),
  rarityFine: color('#62A4DA'),
  rarityJunk: color('#AAAAAA'),
  rarityLegendary: color('#9B6BDE'),
  rarityMasterwork: color('#1A9306'),
  rarityRare: color('#FCD00B'),
  statAttribute: color('#5599ff'),
  statBuff: color('#5599ff'),
  statItem: color('#30ad37'),
  tooltipBackground: color('hsla(0, 0%, 5%, 0.95)'),
  tooltipBorder: color('hsl(0, 0%, 14%)'),
  tooltipFact: color('hsla(0, 0%, 95%, 0.75)'),
  tooltipItemBorder: borderColor(color('hsl(200, 0%, 80%)').toString(), color('hsl(0, 0%, 20%)').toString(), color('hsl(0, 0%, 20%)').toString(), color('hsl(200, 0%, 80%)').toString()),
  tooltipShadow: color('hsl(0, 0%, 14%)'),
  tooltipSkillTitle: color('hsl(50, 75%, 75%)'),
  tooltipText: color('hsla(0, 0%, 95%, 0.95)'),
  tooltipTextShadow: color('hsl(0, 0%, 5%, 0.15)'),
  tooltipTitle: color('hsl(0, 0%, 95%)')
}

export const fonts = {
  applyCount: {
    fontSize: 0.75
  },
  fact: {
    fontSize: 0.85
  },
  text: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 0.875
  },
  title: {
    fontFamily: 'Menomonia, serif',
    fontSize: 1
  }
}

export const images = {
  embedBackground: `radial-gradient(circle, ${color('hsl(210, 0%, 50%)').toString()}, ${color('hsl(0, 0%, 20%)').toString()})`
}

export const sizes = {
  applyCountPadding: 0.25,
  coinIcon: 1,
  emptyIcon: 4,
  factIcon: 2,
  gap: 0.25,
  inlineIcon: 1,
  itemIcon: 4,
  rechargeIcon: 1.125,
  skillIcon: 4,
  tooltipItemIcon: 2.5,
  tooltipNestedIcon: 2,
  tooltipRadius: 0.125
}

export const zIndices = {
  applyCount: 100,
  tooltip: 1000
}
