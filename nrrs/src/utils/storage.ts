export function saveToStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

export const STORAGE_KEYS = {
  ownedItems: "nrrs_ownedItems",
  effectCounts: "nrrs_effectCounts",
  containerSlots: "nrrs_containerSlots",
};