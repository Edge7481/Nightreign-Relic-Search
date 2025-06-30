import type { OwnedItem, OwnedItemEffect, Effect } from "../types";

export function parseOwnedItemsFromText(
  text: string,
  effectsData: Record<string, Effect>
): OwnedItem[] {
  const lines = text.trim().split("\n");
  const header = lines.shift(); // remove header

  const itemMap: Map<string, OwnedItem> = new Map();

  for (const line of lines) {
    // Trim each part to remove trailing whitespace and \r
    const parts = line.split("|").map((s) => s.trim());

    const [
      itemIndexStr,
      itemId,
      itemName,
      effectSlotStr,
      effectId,
      , // ignore effect_name from file
      relicSizeStr,
      characterSpecific,
      , // attribute
      , // attribute_adder
      color,
    ] = parts;

    const effect: OwnedItemEffect = {
      effectSlot: Number(effectSlotStr),
      effectId,
      effectName: effectsData[effectId]?.name ?? "(Unknown Effect)",
      attribute: null,
      attributeAdder: null,
    };

    const itemKey = `${itemIndexStr}_${itemId}`;
    if (!itemMap.has(itemKey)) {
      itemMap.set(itemKey, {
        itemIndex: Number(itemIndexStr),
        itemId,
        itemName,
        relicSize: Number(relicSizeStr),
        color,  // color is now trimmed
        characterSpecific: characterSpecific || null,
        effects: [effect],
      });
    } else {
      itemMap.get(itemKey)!.effects.push(effect);
    }
  }

  return Array.from(itemMap.values());
}
