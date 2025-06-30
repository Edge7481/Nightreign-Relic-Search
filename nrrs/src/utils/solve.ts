import type { OwnedItem } from "../types";

type SlotColor = "Red" | "Green" | "Blue" | "Yellow" | "All";

interface EffectCountMap {
  [effectId: string]: number;
}

function relicMeetsColor(slotColor: SlotColor, relicColor: string): boolean {
  return slotColor === "All" || relicColor === slotColor;
}

function countEffects(relics: OwnedItem[]): EffectCountMap {
  const counts: EffectCountMap = {};
  for (const relic of relics) {
    for (const effect of relic.effects) {
      counts[effect.effectId] = (counts[effect.effectId] || 0) + 1;
    }
  }
  return counts;
}

function coversDesiredEffects(
  effectCounts: EffectCountMap,
  desiredEffects: EffectCountMap
): boolean {
  return Object.entries(desiredEffects).every(([effectId, count]) =>
    (effectCounts[effectId] || 0) >= count
  );
}

export function findCombinations(
  ownedItems: OwnedItem[],
  containerSlots: SlotColor[],
  desiredEffects: EffectCountMap,
  maxResults = 100,
  maxSearches = Infinity // debug limit

): OwnedItem[][] {
  // Get the set of desired effect IDs for quick lookup
  const desiredEffectIds = new Set(Object.keys(desiredEffects));

  // Prune relics that have none of the desired effects
  const filteredOwnedItems = ownedItems.filter((item) =>
    item.effects.some((effect) => desiredEffectIds.has(effect.effectId))
  );

  // 1. For each slot, get matching relics from filtered list
  const candidatesPerSlot: OwnedItem[][] = containerSlots.map((slotColor) =>
    slotColor === "All"
      ? filteredOwnedItems
      : filteredOwnedItems.filter((item) => relicMeetsColor(slotColor, item.color))
  );

  const results: OwnedItem[][] = [];
  let searchCount = 0; // counts backtrack calls

  console.log(desiredEffects)

  // Helper to do cartesian product + pruning
  // TODO: prevent using the same relic multiple times
  function backtrack(slotIndex: number, currentSelection: OwnedItem[]): boolean {
    searchCount++;
    if (searchCount % 10000 == 0) {
      console.log(searchCount)
    }
    if (searchCount > maxSearches) {
      console.log(`Search limit reached (${maxSearches}), terminating early.`);
      return true; // terminate early
    }
    if (slotIndex === containerSlots.length) {
      const effectCounts = countEffects(currentSelection);
      if (coversDesiredEffects(effectCounts, desiredEffects)) {
        results.push([...currentSelection]);
        if (results.length >= maxResults) return true; // enough found
      }
      return false;
    }

    for (const relic of candidatesPerSlot[slotIndex]) {
      currentSelection[slotIndex] = relic;
      if (backtrack(slotIndex + 1, currentSelection)) return true;
    }
    return false;
  }

  backtrack(0, []);
  return results;
}

