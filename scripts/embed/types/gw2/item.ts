import { GW2BaseRecord } from './base'

type GW2ItemFlag = 'AccountBindOnUse' | 'AccountBound' | 'Attuned' | 'BulkConsume' | 'DeleteWarning' | 'HideSuffix' | 'Infused' | 'MonsterOnly' | 'NoMysticForge' | 'NoSalvage' | 'NoSell' | 'NotUpgradeable' | 'NoUnderwater' | 'SoulbindOnAcquire' | 'SoulBindOnUse' | 'Tonic' | 'Unique'
type GW2ItemGameType = 'Activity' | 'Dungeon' | 'Pve' | 'Pvp' | 'PvpLobby' | 'Wvw'
type GW2ItemRarity = 'Junk' | 'Basic' | 'Fine' | 'Masterwork' | 'Rare' | 'Exotic' | 'Ascended' | 'Legendary'
type GW2ItemRestriction = 'Asura' | 'Charr' | 'Female' | 'Human' | 'Norn' | 'Sylvari' | 'Elementalist' | 'Engineer' | 'Guardian' | 'Mesmer' | 'Necromancer' | 'Ranger' | 'Thief' | 'Warrior'
type GW2ItemUpgradeInfoUpgradeType = 'Attunement' | 'Infusion'
type GW2ItemArmorWeightClass = 'Clothing' | 'Heavy' | 'Light' | 'Medium'
type GW2ItemConsumableType = 'AppearanceChange' | 'Booze' | 'ContractNpc' | 'Currency' | 'Food' | 'Generic' | 'Halloween' | 'Immediate' | 'MountRandomUnlock' | 'RandomUnlock' | 'TeleportToFriend' | 'Transmutation' | 'Unlock' | 'UpgradeRemoval' | 'Utility'
type GW2ItemConsumableUnlockType = 'BagSlot' | 'BankTab' | 'Champion' | 'CollectibleCapacity' | 'Content' | 'CraftingRecipe' | 'Dye' | 'GliderSkin' | 'Minipet' | 'Ms' | 'Outfit' | 'RandomUlock' | 'SharedSlot'
type GW2ItemContainerType = 'Default' | 'GiftBox' | 'Immediate' | 'OpenUI'
type GW2ItemGatheringType = 'Foraging' | 'Logging' | 'Mining'
type GW2ItemGizmoType = 'Default' | 'ContainerKey' | 'RentableContractNpc' | 'UnlimitedConsumable'
type GW2ItemTrinketType = 'Accessory' | 'Amulet' | 'Ring'
type GW2ItemUpgradeComponentFlag = GW2ItemWeaponType | 'HeavyArmor' | 'LightArmor' | 'MediumArmor' | 'Trinket'
type GW2ItemUpgradeComponentInfusionFlag = 'Agony' | 'Defense' | 'Enrichment' | 'Infusion' | 'Offense' | 'Utility'
type GW2ItemUpgradeComponentType = 'Default' | 'Gem' | 'Rune' | 'Sigil'
type GW2ItemWeaponDamageType = 'Choking' | 'Fire' | 'Ice' | 'Lightning' | 'Physical'
type GW2ItemWeaponTypeAquatic = 'Spear' | 'Speargun' | 'Trident'
type GW2ItemWeaponTypeOffHanded = 'Focus' | 'Shield' | 'Torch' | 'Warhorn'
type GW2ItemWeaponTypeOneHanded = 'Axe' | 'Dagger' | 'Mace' | 'Pistol' | 'Sword' | 'Scepter'
type GW2ItemWeaponTypeOther = 'LargeBundle' | 'SmallBundle' | 'Toy' | 'ToyTwoHanded'
type GW2ItemWeaponTypeTwoHanded = 'Greatsword' | 'Hammer' | 'Longbow' | 'Rifle' | 'Shortbow' | 'Staff'

export type GW2ItemAttribute = 'BoonDuration' | 'ConditionDamage' | 'ConditionDuration' | 'CritDamage' | 'Healing' | 'Power' | 'Precision' | 'Toughness' | 'Vitality'
export type GW2ItemArmorType = 'Boots' | 'Coat' | 'Gloves' | 'Helm' | 'HelmAquatic' | 'Leggings' | 'Shoulders'
export type GW2ItemWeaponType = GW2ItemWeaponTypeOneHanded | GW2ItemWeaponTypeOffHanded | GW2ItemWeaponTypeTwoHanded | GW2ItemWeaponTypeAquatic | GW2ItemWeaponTypeOther

interface GW2BaseItem<T extends string, D> extends GW2BaseRecord<number> {
  chat_link: string;
  name: string;
  icon: string;
  description: string;
  type: T;
  rarity: GW2ItemRarity;
  level: number;
  vendor_value: number;
  default_skin: number;
  flags: Array<GW2ItemFlag>;
  game_types: Array<GW2ItemGameType>;
  restrictions: Array<GW2ItemRestriction>;
  upgrades_into: Array<GW2UpgradeInfo>;
  upgrades_from: Array<GW2UpgradeInfo>;
  details: D;
}

interface GW2BaseItemDetail<T extends string> {
  type: T;
}

interface GW2InfixUpgradeAttribute {
  attribute: GW2ItemAttribute;
  modifier: number;
}

interface GW2InfixUpgradeBuff {
  skill_id: number;
  description: string;
}

interface GW2InfixUpgrade extends GW2BaseRecord<number> {
  attributes: Array<GW2InfixUpgradeAttribute>;
  buff?: GW2InfixUpgradeBuff;
}

interface GW2InfusionSlot {
  flags: Array<GW2ItemUpgradeComponentInfusionFlag>;
  item_id?: number;
}

interface GW2UpgradeInfo {
  item_id: number;
  upgrade: GW2ItemUpgradeInfoUpgradeType;
}

interface GW2ItemArmorDetail extends GW2BaseItemDetail<GW2ItemArmorType> {
  weight_class: GW2ItemArmorWeightClass;
  defense: number;
  infusion_slots: Array<GW2InfusionSlot>;
  infix_upgrade: GW2InfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

interface GW2ItemBackDetail {
  infusion_slots: Array<GW2InfusionSlot>;
  infix_upgrade: GW2InfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

interface GW2ItemBagDetail {
  size: number;
  no_sell_or_sort: boolean;
}

interface GW2ItemConsumableDetail extends GW2BaseItemDetail<GW2ItemConsumableType> {
  name: string;
  icon: string;
  description: string;
  duration_ms: number;
  unlock_type: GW2ItemConsumableUnlockType;
  color_id?: number;
  recipe_id?: number;
  extra_recipe_ids?: Array<number>;
  guild_upgrade_id?: number;
  apply_count: number;
  skins?: Array<number>;
}

interface GW2ItemGizmoDetail extends GW2BaseItemDetail<GW2ItemGizmoType> {
  guild_upgrade_id: number;
  vendor_ids: Array<number>;
}

interface GW2ItemMiniPetDetail {
  minipet_id: number;
}

interface GW2ItemToolDetail extends GW2BaseItemDetail<'Salvage'> {
  charges: number;
}

interface GW2ItemTrinketDetail extends GW2BaseItemDetail<GW2ItemTrinketType> {
  infusion_slots: Array<GW2InfusionSlot>;
  infix_upgrade: GW2InfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

interface GW2ItemUpgradeComponentDetail extends GW2BaseItemDetail<GW2ItemUpgradeComponentType> {
  flags: Array<GW2ItemUpgradeComponentFlag>;
  infusion_upgrade_flags: Array<GW2ItemUpgradeComponentInfusionFlag>;
  suffix: string;
  infix_upgrade: GW2InfixUpgrade;
  bonuses?: Array<string>;
}

interface GW2ItemWeaponDetail extends GW2BaseItemDetail<GW2ItemWeaponType> {
  damage_type: GW2ItemWeaponDamageType;
  min_power: number;
  max_power: number;
  defense: number;
  infusion_slots: Array<GW2InfusionSlot>;
  infix_upgrade: GW2InfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

export type GW2Item =
  GW2BaseItem<'Armor', GW2ItemArmorDetail> |
  GW2BaseItem<'Back', GW2ItemBackDetail> |
  GW2BaseItem<'Bag', GW2ItemBagDetail> |
  GW2BaseItem<'Consumable', GW2ItemConsumableDetail> |
  GW2BaseItem<'Container', GW2BaseItemDetail<GW2ItemContainerType>> |
  GW2BaseItem<'CraftingMaterial', undefined> |
  GW2BaseItem<'Gathering', GW2BaseItemDetail<GW2ItemGatheringType>> |
  GW2BaseItem<'Gizmo', GW2ItemGizmoDetail> |
  GW2BaseItem<'Key', undefined> |
  GW2BaseItem<'MiniPet', GW2ItemMiniPetDetail> |
  GW2BaseItem<'Tool', GW2ItemToolDetail> |
  GW2BaseItem<'Trait', undefined> |
  GW2BaseItem<'Trinket', GW2ItemTrinketDetail> |
  GW2BaseItem<'Trophy', undefined> |
  GW2BaseItem<'UpgradeComponent', GW2ItemUpgradeComponentDetail> |
  GW2BaseItem<'Weapon', GW2ItemWeaponDetail>
