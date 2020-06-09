import { GW2Record } from './base'

export const enum GW2ItemArmorType {
  AQUATIC_HELM = 'HelmAquatic',
  BOOTS = 'Boots',
  COAT = 'Coat',
  GLOVES = 'Gloves',
  HELM = 'Helm',
  LEGGINGS = 'Leggings',
  SHOULDERS = 'Shoulders'
}

export const enum GW2ItemAttribute {
  BOON_DURATION = 'BoonDuration',
  CONDITION_DAMAGE = 'ConditionDamage',
  CONDITION_DURATION = 'ConditionDuration',
  CRITICAL_DAMAGE = 'CritDamage',
  HEALING = 'Healing',
  POWER = 'Power',
  PRECISION = 'Precision',
  TOUGHNESS = 'Toughness',
  VITALITY = 'Vitality'
}

export const enum GW2ItemFlag {
  ACCOUNT_BIND_ON_USE = 'AccountBindOnUse',
  ACCOUNT_BOUND = 'AccountBound',
  ATTUNED = 'Attuned',
  BULK_CONSUME = 'BulkConsume',
  DELETE_WARNING = 'DeleteWarning',
  HIDE_SUFFIX = 'HideSuffix',
  INFUSED = 'Infused',
  MONSTER_ONLY = 'MonsterOnly',
  NO_MYSTIC_FORGE = 'NoMysticForge',
  NO_SALVAGE = 'NoSalvage',
  NO_SELL = 'NoSell',
  NOT_UPGRADEABLE = 'NotUpgradeable',
  NO_UNDERWATER = 'NoUnderwater',
  SOULBIND_ON_ACQUIRE = 'SoulbindOnAcquire',
  SOULBIND_ON_USE = 'SoulBindOnUse',
  TONIC = 'Tonic',
  UNIQUE = 'Unique',
}

export const enum GW2ItemGameType {
  ACTIVITY = 'Activity',
  DUNGEON = 'Dungeon',
  PVE = 'Pve',
  PVP = 'Pvp',
  PVP_LOBBY = 'PvpLobby',
  WVW = 'Wvw'
}

export const enum GW2ItemRarity {
  JUNK = 'Junk',
  BASIC = 'Basic',
  FINE = 'Fine',
  MASTERWORK = 'Masterwork',
  RARE = 'Rare',
  EXOTIC = 'Exotic',
  ASCENDED = 'Ascended',
  LEGENDARY = 'Legendary'
}

export const enum GW2ItemRestriction {
  ASURA = 'Asura',
  CHARR = 'Charr',
  FEMALE = 'Female',
  HUMAN = 'Human',
  NORN = 'Norn',
  SYLVARI = 'Sylvari',
  ELEMENTALIST = 'Elementalist',
  ENGINEER = 'Engineer',
  GUARDIAN = 'Guardian',
  MESMER = 'Mesmer',
  NECROMANCER = 'Necromancer',
  RANGER = 'Ranger',
  THIEF = 'Thief',
  WARRIOR = 'Warrior'
}

export const enum GW2ItemUpgradeInfoUpgradeType {
  ATTUNEMENT = 'Attunement',
  INFUSION = 'Infusion'
}

export const enum GW2ItemArmorWeightClass {
  CLOTHING = 'Clothing',
  HEAVY = 'Heavy',
  LIGHT = 'Light',
  MEDIUM = 'Medium'
}

export const enum GW2ItemConsumableType {
  APPEARANCE_CHANGE = 'AppearanceChange',
  BOOZE = 'Booze',
  CONTRACT_NPC = 'ContractNpc',
  CURRENCY = 'Currency',
  FOOD = 'Food',
  GENERIC = 'Generic',
  HALLOWEEN = 'Halloween',
  IMMEDIATE = 'Immediate',
  MOUNT_RANDOM_UNLOCK = 'MountRandomUnlock',
  RANDOM_UNLOCK = 'RandomUnlock',
  TELEPORT_TO_FRIEND = 'TeleportToFriend',
  TRANSMUTATION = 'Transmutation',
  UNLOCK = 'Unlock',
  UPGRADE_REMOVAL = 'UpgradeRemoval',
  UTILITY = 'Utility'
}

export const enum GW2ItemConsumableUnlockType {
  BAG_SLOT = 'BagSlot',
  BANK_TAB = 'BankTab',
  CHAMPION = 'Champion',
  COLLECTIBLE_CAPACITY = 'CollectibleCapacity',
  CONTENT = 'Content',
  CRAFTING_RECIPE = 'CraftingRecipe',
  DYE = 'Dye',
  GLIDER_SKIN = 'GliderSkin',
  MINI_PET = 'Minipet',
  MOUNT_SKIN = 'Ms',
  OUTFIT = 'Outfit',
  RANDOM_ULOCK = 'RandomUlock',
  SHARED_SLOT = 'SharedSlot'
}

export const enum GW2ItemContainerType {
  DEFAULT = 'Default',
  GIFT_BOX = 'GiftBox',
  IMMEDIATE = 'Immediate',
  OPEN_UI = 'OpenUI'
}

export const enum GW2ItemGatheringType {
  FORAGING = 'Foraging',
  LOGGING = 'Logging',
  MINING = 'Mining'
}

export const enum GW2ItemGizmoType {
  DEFAULT = 'Default',
  CONTAINER_KEY = 'ContainerKey',
  RENTABLE_CONTRACT_NPC = 'RentableContractNpc',
  UNLIMITED_CONSUMABLE = 'UnlimitedConsumable'
}

export const enum GW2ItemToolType {
  SALVAGE = 'Salvage'
}

export const enum GW2ItemTrinketType {
  ACCESSORY = 'Accessory',
  AMULET = 'Amulet',
  RING = 'Ring'
}

export const enum GW2ItemType {
  ARMOR = 'Armor',
  BACK = 'Back',
  BAG = 'Bag',
  CONSUMABLE = 'Consumable',
  CONTAINER = 'Container',
  CRAFTING_MATERIAL = 'CraftingMaterial',
  GATHERING = 'Gathering',
  GIZMO = 'Gizmo',
  KEY = 'Key',
  MINI_PET = 'MiniPet',
  TOOL = 'Tool',
  TRAIT = 'Trait',
  TRINKET = 'Trinket',
  TROPHY = 'Trophy',
  UPGRADE_COMPONENT = 'UpgradeComponent',
  WEAPON = 'Weapon'
}

export const enum GW2ItemUpgradeComponentFlag {
  AXE = 'Axe',
  DAGGER = 'Dagger',
  FOCUS = 'Focus',
  GREATSWORD = 'Greatsword',
  HAMMER = 'Hammer',
  HEAVY_ARMOR = 'HeavyArmor',
  LIGHT_ARMOR = 'LightArmor',
  LONGBOW = 'Longbow',
  MACE = 'Mace',
  MEDIUM_ARMOR = 'MediumArmor',
  PISTOL = 'Pistol',
  RIFLE = 'Rifle',
  SCEPTER = 'Scepter',
  SHIELD = 'Shield',
  SHORTBOW = 'Shortbow',
  SPEAR = 'Spear',
  SPEARGUN = 'Speargun',
  STAFF = 'Staff',
  SWORD = 'Sword',
  TORCH = 'Torch',
  TRIDENT = 'Trident',
  TRINKET = 'Trinket',
  WARHORN = 'Warhorn'
}

export const enum GW2ItemUpgradeComponentInfusionFlag {
  AGONY = 'Agony',
  DEFENSE = 'Defense',
  ENRICHMENT = 'Enrichment',
  INFUSION = 'Infusion',
  OFFENSE = 'Offense',
  UTILITY = 'Utility'
}

export const enum GW2ItemUpgradeComponentType {
  DEFAULT = 'Default',
  GEM = 'Gem',
  RUNE = 'Rune',
  SIGIL = 'Sigil'
}

export const enum GW2ItemWeaponDamageType {
  CHOKING = 'Choking',
  FIRE = 'Fire',
  ICE = 'Ice',
  LIGHTNING = 'Lightning',
  PHYSICAL = 'Physical'
}

export const enum GW2ItemWeaponType {
  AXE = 'Axe',
  DAGGER = 'Dagger',
  FOCUS = 'Focus',
  GREATSWORD = 'Greatsword',
  HAMMER = 'Hammer',
  LARGE_BUNDLE = 'LargeBundle',
  LONGBOW = 'Longbow',
  MACE = 'Mace',
  PISTOL = 'Pistol',
  RIFLE = 'Rifle',
  SCEPTER = 'Scepter',
  SHIELD = 'Shield',
  SHORTBOW = 'Shortbow',
  SMALL_BUNDLE = 'SmallBundle',
  SPEAR = 'Spear',
  SPEARGUN = 'Speargun',
  STAFF = 'Staff',
  SWORD = 'Sword',
  TORCH = 'Torch',
  TOY = 'Toy',
  TOY_TWO_HANDED = 'ToyTwoHanded',
  TRIDENT = 'Trident',
  WARHORN = 'Warhorn'
}

interface GW2ItemBase<
  T extends GW2ItemType,
  D = undefined
> extends GW2Record<number> {
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
  upgrades_into: Array<GW2ItemUpgradeInfo>;
  upgrades_from: Array<GW2ItemUpgradeInfo>;
  details: D;
}

interface GW2ItemDetailWithType<T> {
  type: T;
}

interface GW2ItemDetailArmor extends GW2ItemDetailWithType<GW2ItemArmorType> {
  weight_class: GW2ItemArmorWeightClass;
  defense: number;
  infusion_slots: Array<GW2ItemInfusionSlot>;
  infix_upgrade?: GW2ItemInfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

interface GW2ItemDetailBack {
  infusion_slots: Array<GW2ItemInfusionSlot>;
  infix_upgrade?: GW2ItemInfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

interface GW2ItemDetailBag {
  size: number;
  no_sell_or_sort: boolean;
}

interface GW2ItemDetailConsumable extends GW2ItemDetailWithType<GW2ItemConsumableType> {
  name: string;
  icon: string;
  description: string;
  duration_ms: number;
  unlock_type?: GW2ItemConsumableUnlockType;
  color_id?: number;
  recipe_id?: number;
  extra_recipe_ids?: Array<number>;
  guild_upgrade_id?: number;
  apply_count: number;
  skins?: Array<number>;
}

interface GW2ItemDetailGizmo extends GW2ItemDetailWithType<GW2ItemGizmoType> {
  guild_upgrade_id: number;
  vendor_ids: Array<number>;
}

interface GW2ItemDetailMiniPet {
  minipet_id: number;
}

interface GW2ItemDetailTool extends GW2ItemDetailWithType<GW2ItemToolType> {
  charges: number;
}

interface GW2ItemDetailTrinket extends GW2ItemDetailWithType<GW2ItemTrinketType> {
  infusion_slots: Array<GW2ItemInfusionSlot>;
  infix_upgrade?: GW2ItemInfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

interface GW2ItemDetailUpgradeComponent extends GW2ItemDetailWithType<GW2ItemUpgradeComponentType> {
  flags: Array<GW2ItemUpgradeComponentFlag>;
  infusion_upgrade_flags: Array<GW2ItemUpgradeComponentInfusionFlag>;
  suffix: string;
  infix_upgrade?: GW2ItemInfixUpgrade;
  bonuses?: Array<string>;
}

interface GW2ItemDetailWeapon extends GW2ItemDetailWithType<GW2ItemWeaponType> {
  damage_type: GW2ItemWeaponDamageType;
  min_power: number;
  max_power: number;
  defense: number;
  infusion_slots: Array<GW2ItemInfusionSlot>;
  infix_upgrade?: GW2ItemInfixUpgrade;
  suffix_item_id: number;
  secondary_suffix_item_id: number | '';
  stat_choices: Array<number>;
}

interface GW2ItemInfixUpgrade extends GW2Record<number> {
  attributes: Array<GW2ItemInfixUpgradeAttribute>;
  buff?: GW2ItemInfixUpgradeBuff;
}

interface GW2ItemInfixUpgradeAttribute {
  attribute: GW2ItemAttribute;
  modifier: number;
}

interface GW2ItemInfixUpgradeBuff {
  skill_id: number;
  description: string;
}

interface GW2ItemInfusionSlot {
  flags: Array<GW2ItemUpgradeComponentInfusionFlag>;
  item_id?: number;
}

interface GW2ItemUpgradeInfo {
  item_id: number;
  upgrade: GW2ItemUpgradeInfoUpgradeType;
}

export type GW2Item =
  GW2ItemBase<GW2ItemType.ARMOR, GW2ItemDetailArmor> |
  GW2ItemBase<GW2ItemType.BACK, GW2ItemDetailBack> |
  GW2ItemBase<GW2ItemType.BAG, GW2ItemDetailBag> |
  GW2ItemBase<GW2ItemType.CONSUMABLE, GW2ItemDetailConsumable> |
  GW2ItemBase<GW2ItemType.CONTAINER, GW2ItemDetailWithType<GW2ItemContainerType>> |
  GW2ItemBase<GW2ItemType.CRAFTING_MATERIAL> |
  GW2ItemBase<GW2ItemType.GATHERING, GW2ItemDetailWithType<GW2ItemGatheringType>> |
  GW2ItemBase<GW2ItemType.GIZMO, GW2ItemDetailGizmo> |
  GW2ItemBase<GW2ItemType.KEY> |
  GW2ItemBase<GW2ItemType.MINI_PET, GW2ItemDetailMiniPet> |
  GW2ItemBase<GW2ItemType.TOOL, GW2ItemDetailTool> |
  GW2ItemBase<GW2ItemType.TRAIT> |
  GW2ItemBase<GW2ItemType.TRINKET, GW2ItemDetailTrinket> |
  GW2ItemBase<GW2ItemType.TROPHY> |
  GW2ItemBase<GW2ItemType.UPGRADE_COMPONENT, GW2ItemDetailUpgradeComponent> |
  GW2ItemBase<GW2ItemType.WEAPON, GW2ItemDetailWeapon>
