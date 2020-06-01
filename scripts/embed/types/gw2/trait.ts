import { GW2BaseRecord } from './base'
import { GW2Fact, GW2TraitedFact } from './fact'

enum GW2TraitTier {
  Proficiency = 0,
  Adept = 1,
  Master = 2,
  Grandmaster = 3
}

type GW2TraitSlot = 'Major' | 'Minor'

interface GW2TraitSkill extends GW2BaseRecord<number> {
  name: string;
  description: string;
  icon: string;
  facts: Array<GW2Fact>;
  traited_facts: Array<GW2TraitedFact>;
}

export interface GW2Trait extends GW2BaseRecord<number> {
  name: string;
  profession: string;
  icon: string;
  description: string;
  specialization: number;
  tier: GW2TraitTier;
  slot: GW2TraitSlot;
  facts: Array<string>;
  traited_facts: Array<string>;
  skills: Array<GW2TraitSkill>;
}
