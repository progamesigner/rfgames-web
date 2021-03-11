import { always, append, pipe, take, times } from 'rambda'

import {
  GW2Item,
  GW2ItemArmorType,
  GW2ItemFlag,
  GW2ItemRarity,
  GW2ItemStat,
  GW2ItemTrinketType,
  GW2ItemType,
  GW2ItemUpgradeComponentInfusionFlag,
  GW2ItemWeaponType
} from '../../../types'

export {
  attributeToName,
  bindTooltipEvents,
  buildWikiLink,
  markup
} from '../../libs'

interface ItemFlags {
  accountbound: boolean;
  soulbound: boolean;
  unique: boolean;
}

export function buildItemName(item: GW2Item, stat?: GW2ItemStat): string {
  if (stat && parseItemStat(item, stat)) {
    return `${stat.name} ${item.name}`
  }
  return item.name
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

function getHiddenItemNumber(item: GW2Item): number {
  return [
    extractHiddenItemNumberFromArmor,
    extractHiddenItemNumberFromBack,
    extractHiddenItemNumberFromTrinket,
    extractHiddenItemNumberFromWeapon
  ].reduce((number, func) => func(item) + number, 0)
}

export function calculateStatAttribute(
  item: GW2Item,
  multiplier: number,
  value: number
): number {
  return Math.floor(getHiddenItemNumber(item) * multiplier + value)
}

export function createTakePipe(
  slots: number
): (items: ReadonlyArray<number>) => ReadonlyArray<number> {
  return pipe<
    ReadonlyArray<number>,
    ReadonlyArray<number>,
    ReadonlyArray<number>
  >(
    append(times(always(0), slots)),
    take(slots)
  )
}

export function parseItemFlags(item: GW2Item): ItemFlags {
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

export function parseItemenrichmentSlots(item: GW2Item): number {
  switch (item.type) {
    case GW2ItemType.TRINKET:
      return item.details.infusion_slots.filter(({ flags }) => flags.includes(GW2ItemUpgradeComponentInfusionFlag.ENRICHMENT)).length
  }
  return 0
}

export function parseItemInfusionSlots(item: GW2Item): number {
  switch (item.type) {
    case GW2ItemType.ARMOR:
    case GW2ItemType.WEAPON:
    case GW2ItemType.BACK:
    case GW2ItemType.TRINKET:
      return item.details.infusion_slots.filter(({ flags }) => flags.includes(GW2ItemUpgradeComponentInfusionFlag.INFUSION)).length
  }
  return 0
}

export function parseItemStat(
  item: GW2Item,
  stat?: GW2ItemStat
): GW2ItemStat | null {
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

export function parseItemUpgradeSlots(item: GW2Item): number {
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

export function toMinutes(milliseconds: number): string {
  return `${Math.floor(milliseconds / 60000)} m`
}
