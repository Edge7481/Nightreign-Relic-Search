export interface Item {
  name: string;
  color: string | null;
}

export interface Effect {
  name: string;
}

export interface OwnedItemEffect {
  effectSlot: number;
  effectId: string;
  effectName: string;
  attribute: string | null;
  attributeAdder: string | null;
}

export interface OwnedItem {
  itemIndex: number;
  itemId: string;
  itemName: string;
  relicSize: number;
  color: string;
  characterSpecific: string | null;
  effects: OwnedItemEffect[];
}