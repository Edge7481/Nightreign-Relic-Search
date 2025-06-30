import { useEffect, useState } from "react";
import Search from "./components/Search";
import type { OwnedItem } from "./types";
import effects from "./data/effects.json";
import EffectSelector from "./components/EffectSelector";
import ContainerSelector from "./components/ContainerSelector";
import ItemFileUploader from "./components/ItemFileUploader";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "./utils/storage";




function App() {
  //persistence
  const [ownedItems, setOwnedItems] = useState<OwnedItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.ownedItems, [])
  );
  const [effectCounts, setEffectCounts] = useState<Record<string, number>>(
    () => loadFromStorage(STORAGE_KEYS.effectCounts, {})
  );
  const [containerSlots, setContainerSlots] = useState<
    ("Red" | "Green" | "Blue" | "Yellow" | "All")[]
  >(() => loadFromStorage(STORAGE_KEYS.containerSlots, ["Red", "Green", "Blue"]));
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ownedItems, ownedItems);
  }, [ownedItems]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.effectCounts, effectCounts);
  }, [effectCounts]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.containerSlots, containerSlots);
  }, [containerSlots]);

  return (
    <div>
      <div className="bg-yellow-100 text-yellow-800 p-4 text-center font-medium">
        WIP, may not work as intended, use at your own discretion
      </div>
      <div>
        <ItemFileUploader
          effectsData={effects}
          onItemsParsed={(items) => setOwnedItems(items)}
          loadedCount={ownedItems.length}

        />
      </div>
      <div>
        <Search
          ownedItems={ownedItems}
          containerSlots={containerSlots}
          effectCounts={effectCounts}
        />
      </div>

      <div>
        <ContainerSelector
          slotColors={containerSlots}
          setSlotColors={setContainerSlots}
        />
      </div>

      <div >
        <EffectSelector
          effectCounts={effectCounts}
          setEffectCounts={setEffectCounts}
        />
      </div>
    </div>
  );
}

export default App;
