import { GW2Record } from './base'
import { GW2Fact, GW2TraitedFact } from './fact'

interface GW2TraitSkill extends GW2Record<number> {
  name: string;
  description: string;
  icon: string;
  facts: ReadonlyArray<GW2Fact>;
  traited_facts: ReadonlyArray<GW2TraitedFact>;
}

export const enum GW2TraitTier {
  PROFICIENCY = 0,
  ADEPT = 1,
  MASTER = 2,
  GRANDMASTER = 3
}

export const enum GW2TraitSlot {
  MAJOR = 'Major',
  MINOR = 'Minor'
}

export interface GW2Trait extends GW2Record<number> {
  name: string;
  icon: string;
  description?: string;
  specialization: number;
  tier: GW2TraitTier;
  slot: GW2TraitSlot;
  facts?: ReadonlyArray<GW2Fact>;
  traited_facts?: ReadonlyArray<GW2TraitedFact>;
  skills?: ReadonlyArray<GW2TraitSkill>;
}
