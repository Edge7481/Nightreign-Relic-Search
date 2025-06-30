import { useRef } from "react";
import type { OwnedItem, Effect } from "../types";
import { parseOwnedItemsFromText } from "../utils/parseImport";

interface Props {
    effectsData: Record<string, Effect>;
    onItemsParsed: (items: OwnedItem[]) => void;
    loadedCount: number;

}

export default function ItemFileUploader({ effectsData, onItemsParsed, loadedCount }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                const parsed = parseOwnedItemsFromText(reader.result, effectsData);
                onItemsParsed(parsed);
            }
        };
        reader.readAsText(file);
    };

    const triggerFileDialog = () => {
        inputRef.current?.click();
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Relic Item File</h2>

            {loadedCount > 0 && (
                <p className="text-indigo-300 mb-4 text-center">
                    Loaded {loadedCount} relic{loadedCount !== 1 ? "s" : ""}.
                </p>
            )}

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={triggerFileDialog}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg shadow transition"
                >
                    Select .txt File
                </button>
                <input
                    type="file"
                    accept=".txt"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
}
