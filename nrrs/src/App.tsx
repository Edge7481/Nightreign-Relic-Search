import { useEffect, useState } from "react";
import Search from "./components/Search";
import RelicList from "./components/RelicList";
import type { OwnedItem } from "./types";
import effects from "./data/effects.json";
import EffectSelector from "./components/EffectSelector";
import ContainerSelector from "./components/ContainerSelector";
import ItemFileUploader from "./components/ItemFileUploader";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "./utils/storage";

function App() {
  const [tab, setTab] = useState<"search" | "relics">("search");

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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-yellow-100 text-yellow-800 p-4 text-center font-medium">
        WIP, may not work as intended, use at your own discretion
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4 pb-2 bg-gray-800 rounded-md shadow-md max-w-2xl mx-auto flex gap-4">
        <button
          className={`px-4 py-2 rounded-md transition font-medium ${tab === "search"
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          onClick={() => setTab("search")}
        >
          Search
        </button>
        <button
          className={`px-4 py-2 rounded-md transition font-medium ${tab === "relics"
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          onClick={() => setTab("relics")}
        >
          Relics
        </button>
      </div>

      {/* Shared */}
      <div className="p-6">
        <ItemFileUploader
          effectsData={effects}
          onItemsParsed={(items) => setOwnedItems(items)}
          loadedCount={ownedItems.length}
        />
      </div>

      {/* Tab Content */}
      {tab === "search" ? (
        <>
          <Search
            ownedItems={ownedItems}
            containerSlots={containerSlots}
            effectCounts={effectCounts}
          />
          <ContainerSelector
            slotColors={containerSlots}
            setSlotColors={setContainerSlots}
          />
          <EffectSelector
            effectCounts={effectCounts}
            setEffectCounts={setEffectCounts}
          />
        </>
      ) : (
        <RelicList ownedItems={ownedItems} />
      )}
    </div>
  );
}

export default App;
