import { useState } from "react";
import type { OwnedItem } from "../types";
import { findCombinations } from "../utils/solve";

interface SearchProps {
  ownedItems: OwnedItem[];
  containerSlots: ("Red" | "Green" | "Blue" | "Yellow" | "All")[];
  effectCounts: Record<string, number>;
}

export default function Search({
  ownedItems,
  containerSlots,
  effectCounts,
}: SearchProps) {
  const [results, setResults] = useState<OwnedItem[][]>([]);

  const handleSolve = () => {
    const filteredDesiredEffects = Object.fromEntries(
      Object.entries(effectCounts).filter(([_, count]) => count > 0)
    );

    const found = findCombinations(
      ownedItems,
      containerSlots,
      filteredDesiredEffects,
      10
    );
    setResults(found);
  };

  return (
    <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg max-w-4xl mx-auto">
      <button
        onClick={handleSolve}
        className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded shadow"
      >
        Find Combinations
      </button>

      <h2 className="text-xl font-bold mb-2">Results ({results.length})</h2>

      {results.length === 0 && (
        <p className="text-gray-400">No combinations found.</p>
      )}

      {results.map((combination, i) => (
        <div
          key={i}
          className="mb-4 p-3 bg-gray-700 rounded border border-gray-600"
        >
          {combination.map((relic) => (
            <div key={relic.itemId} className="mb-2">
              <strong>{relic.itemName}</strong> ({relic.color}) – {relic.relicSize}{" "}
              slots
              <ul className="ml-4 list-disc list-inside">
                {relic.effects.map((effect, idx) => (
                  <li key={idx}>{effect.effectName}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
