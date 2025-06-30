import { useState } from "react";
import { parseOwnedItemsFromText } from "./utils/parseImport";
import type { OwnedItem } from "./types";
import effects from "./data/effects.json";

function App() {
  const [ownedItems, setOwnedItems] = useState<OwnedItem[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const parsedItems = parseOwnedItemsFromText(text, effects);
      setOwnedItems(parsedItems);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Item File</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} className="mb-4" />

      {ownedItems.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Parsed Items</h2>
          <ul className="list-disc list-inside">
            {ownedItems.map((item, index) => (
              <li key={index}>
                <strong>{item.itemName}</strong> ({item.color}) – {item.relicSize} slots
                <ul className="ml-4 list-[circle]">
                  {item.effects.map((effect, idx) => (
                    <li key={idx}>{effect.effectName}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
