import { borderColor, color, cssRaw, em, px, stylesheet, url } from '../libs'

export * from '../libs'

export const SMALL_SCREEN_WIDTH = 768

export const animations = {
  easing: 'ease-out',
  speed: '86ms'
}

export const colors = {
  applyCount: color('hsl(0, 0%, 95%)'),
  applyCountShadow: color('hsl(0, 0%, 5%)'),
  bonusActive: color('hsl(215, 100%, 65%)'),
  bonusInactive: color('hsl(0, 0%, 65%)'),
  coinCopper: color('hsl(25, 45%, 40%)'),
  coinGold: color('hsl(45, 75%, 60%)'),
  coinSilver: color('hsl(40, 5%, 80%)'),
  consumable: color('hsl(0, 0%, 65%)'),
  formatAbilityType: color('hsl(45, 100%, 50%)'),
  formatFlavor: color('hsl(170, 50%, 70%)'),
  formatReminder: color('hsl(0, 0%, 65%)'),
  formatSkill: color('hsl(45, 100%, 50%)'),
  iconBackground: color('hsl(200, 10%, 10%)'),
  iconBorder: color('hsl(200, 10%, 5%)'),
  loaderBorder: color('hsla(200, 10%, 5%, 0.25)'),
  loaderStrip: color('hsl(200, 10%, 75%)'),
  rarityAscended: color('hsl(330, 95%, 60%)'),
  rarityBasic: color('hsl(0, 0%, 95%)'),
  rarityExotic: color('hsl(40, 100%, 50%)'),
  rarityFine: color('hsl(210, 60%, 60%)'),
  rarityJunk: color('hsl(0, 0%, 65%)'),
  rarityLegendary: color('hsl(265, 65%, 65%)'),
  rarityMasterwork: color('hsl(110, 90%, 30%)'),
  rarityRare: color('hsl(50, 95%, 50%)'),
  statAttribute: color('hsl(125, 55%, 45%)'),
  statBuff: color('hsl(215, 100%, 65%)'),
  statItem: color('hsl(125, 55%, 45%)'),
  tooltipBackground: color('hsla(0, 0%, 5%, 0.95)'),
  tooltipBorder: color('hsl(0, 0%, 14%)'),
  tooltipFact: color('hsla(0, 0%, 95%, 0.75)'),
  tooltipItemBorder: borderColor(color('hsl(0, 0%, 80%)').toString(), color('hsl(0, 0%, 20%)').toString(), color('hsl(0, 0%, 20%)').toString(), color('hsl(0, 0%, 80%)').toString()),
  tooltipShadow: color('hsl(0, 0%, 14%)'),
  tooltipSkillTitle: color('hsl(50, 75%, 75%)'),
  tooltipText: color('hsla(0, 0%, 95%, 0.95)'),
  tooltipTextShadow: color('hsl(0, 0%, 5%, 0.15)'),
  tooltipTitle: color('hsl(0, 0%, 95%)'),
  tooltipTraitedFact: color('hsl(215, 100%, 65%)'),
  traitlineConnector: color('hsla(0, 0%, 95%, 0.25)'),
  traitlineShadow: color('hsl(0, 0%, 14%)')
}

export const fonts = {
  embedContainer: {
    fontFamily: 'Lato, sans-serif',
    fontSize: px(16),
    fontWeight: 400
  },
  fact: {
    fontSize: em(0.875)
  },
  iconApplyCount: {
    fontSize: em(0.875)
  },
  tooltip: {
    fontFamily: 'Lato, sans-serif',
    fontSize: px(16),
    fontWeight: 400
  },
  tooltipHead: {
    fontSize: em(1.125),
    fontWeight: 700
  },
  tooltipBody: {
    fontSize: em(1)
  },
  tooltipFoot: {
    fontSize: em(1)
  }
}

export const images = {
  iconBackground: `radial-gradient(circle, ${color('hsl(0, 0%, 50%)').toString()}, ${color('hsl(0, 0%, 20%)').toString()})`,
  traitlineConnector: `radial-gradient(circle, ${color('hsla(200, 10%, 95%, 0.75)').toString()}, ${color('hsla(50, 15%, 75%, 0.25)').toString()})`
}

export const layouts = {
  applyCount: 0.0125,
  gap: 0.25,
  iconBorder: 0.0625,
  loaderWidth: 0.25,
  loadingStripRadius: 0.125,
  rechargeOffset: 0.5,
  tooltipBorder: 0.125,
  tooltipMaximumWidth: 22.5,
  tooltipOffset: 0.5,
  tooltipRadius: 0.125,
  traitlineConnectorHeight: 0.25,
  traitlineConnectorRadius: 0.0625,
  traitlineConnectorWidth: 1.5
}

export const sizes = {
  coinIcon: 1,
  factIcon: 2,
  inlineIcon: 1,
  itemIcon: 4,
  professionIcon: 4,
  skillIcon: 4,
  specializationIcon: 4,
  tooltipEffectIcon: 2,
  tooltipItemIcon: 2.5,
  tooltipRechargeIcon: 1.25,
  tooltipUpgradeIcon: 1.5,
  traitIcon: 2.5
}

export const zIndices = {
  applyCount: 50,
  iconImage: 10,
  iconLink: 30,
  loader: 50,
  rechargeIcon: 100,
  tooltip: 100,
  traitlineBackground: 10,
  traitlineConnector: 40,
  traitlineHexagon: 30,
  traitlineOverlay: 20,
  traitlineTrait: 50
}

export const flavors = stylesheet({
  abilitytype: {
    color: colors.formatAbilityType.toString()
  },
  flavor: {
    color: colors.formatFlavor.toString()
  },
  reminder: {
    color: colors.formatReminder.toString()
  },
  skilltype: {
    color: colors.formatSkill.toString()
  }
})

export function boxShadow(color: string): string {
  return `${em(0.0625)} ${em(0.0625)} ${em(0.1875)} ${color}`
}

export function textShadow(color: string): string {
  return `${em(0.0625)} ${em(0.0625)} ${em(0.0625)} ${color}`
}

cssRaw(`@import ${url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap')};`)
