import { useState } from "react";
import { parseOwnedItemsFromText } from "./utils/parseImport";
import type { OwnedItem } from "./types";
import effects from "./data/effects.json";
import EffectSelector from "./components/EffectSelector";
import ContainerSelector from "./components/ContainerSelector";
import ItemFileUploader from "./components/ItemFileUploader";



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
    <div>
      <div>
        <ItemFileUploader
          effectsData={effects}
          onItemsParsed={(items) => setOwnedItems(items)}
        />
      </div>

      <div>
        <ContainerSelector />
      </div>

      <div >
        <EffectSelector />
      </div>
    </div>
  );
}

export default App;
