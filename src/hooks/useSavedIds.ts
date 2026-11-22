import { useEffect, useState } from 'react';
import { loadSavedIds, storeSavedIds } from '../lib/savedStorage';

// Saved event ids that survive closing the app: read once on mount, written on every change
export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    loadSavedIds().then(setSavedIds);
  }, []);

  function toggleSaved(id: number) {
    // Always a new array: filter to remove, [...ids, id] to add – never push or splice
    const next = savedIds.includes(id) ? savedIds.filter((savedId) => savedId !== id) : [...savedIds, id];
    setSavedIds(next);
    // Stored here, not in a useEffect on savedIds – that would run first with [] and wipe what was saved
    storeSavedIds(next);
  }

  return { savedIds, toggleSaved };
}
