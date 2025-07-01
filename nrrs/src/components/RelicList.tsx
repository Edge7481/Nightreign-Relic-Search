import type { OwnedItem } from "../types";

interface RelicListProps {
  ownedItems: OwnedItem[];
}

export default function RelicList({ ownedItems }: RelicListProps) {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Owned Relics</h1>

      {ownedItems.length === 0 ? (
        <p className="text-center text-gray-400">No relics uploaded.</p>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {ownedItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-4 bg-gray-800"
            >
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">{item.itemName}</h2>
                <span className="text-sm text-gray-400">
                  {item.color} – {item.relicSize} slots
                </span>
              </div>
              <ul className="list-disc list-inside ml-4">
                {item.effects.map((effect, idx) => (
                  <li key={idx} className="text-sm">
                    {effect.effectName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
