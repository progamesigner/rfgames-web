export interface GW2BaseRecord<T extends GW2RecordKey> {
  id: T;
}

export type GW2RecordKey = number | string | symbol
