import { useState } from "react";
import effects from "../data/effects.json";

interface Effect {
    name: string;
}

interface EffectSelectorProps {
    effectCounts: Record<string, number>;
    setEffectCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export default function EffectSelector({
    effectCounts,
    setEffectCounts,
}: EffectSelectorProps) {
    const [search, setSearch] = useState("");

    const handleSelectChange = (id: string, value: number) => {
        setEffectCounts((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const effectEntries = Object.entries(effects) as [string, Effect][];

    const filteredEffects = effectEntries.filter(([_, effect]) =>
        effect.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
                Select Desired Effects
            </h1>

            <input
                type="text"
                placeholder="Search effects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 w-full max-w-md block mx-auto px-4 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                    width: "100%",
                }}
            >
                {filteredEffects.length === 0 ? (
                    <p className="text-gray-400 col-span-full text-center">
                        No effects match your search.
                    </p>
                ) : (
                    filteredEffects.map(([id, effect]) => (
                        <div
                            key={id}
                            className="bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-4"
                        >
                            <select
                                value={effectCounts[id] || 0}
                                onChange={(e) => handleSelectChange(id, Number(e.target.value))}
                                className="px-3 py-1 rounded border border-gray-700 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-16"
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                            <span className="text-base font-medium text-gray-100">
                                {effect.name}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
