import type { CampusEvent } from '../data/events';

// Absolute URL: on the phone "localhost" is the phone itself, so the file must come from GitHub Pages
export const API_URL = 'https://temirlan-amanzhol.github.io/iwamad-mobile/api/events.json';

export async function fetchEvents(): Promise<CampusEvent[]> {
  const response = await fetch(API_URL);
  // fetch only rejects when there is no network – a 404 or 500 still "succeeds", so check the status ourselves
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
