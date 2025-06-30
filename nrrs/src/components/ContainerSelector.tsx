import type { Dispatch, SetStateAction } from "react";

export type SlotColor = "Red" | "Green" | "Blue" | "Yellow" | "All";

interface ContainerSelectorProps {
  slotColors: SlotColor[];
  setSlotColors: Dispatch<SetStateAction<SlotColor[]>>;
}

export default function ContainerSelector({ slotColors, setSlotColors }: ContainerSelectorProps) {
  const colorOptions: SlotColor[] = ["Red", "Green", "Blue", "Yellow", "All"];

  const handleSlotColorChange = (index: number, value: SlotColor) => {
    const updated = [...slotColors];
    updated[index] = value;
    setSlotColors(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Container Slot Configuration</h2>
      <div className="flex gap-6 flex-wrap">
        {slotColors.map((color, i) => (
          <div
            key={i}
            className="p-4 border rounded-md w-48 flex flex-col items-center bg-gray-900 text-gray-100"
          >
            <span className="mb-2 font-medium">Slot {i + 1}</span>
            <select
              value={color}
              onChange={(e) => handleSlotColorChange(i, e.target.value as SlotColor)}
              className="rounded border px-3 py-2 bg-gray-800 border-gray-700 text-gray-100"
            >
              {colorOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

