// The events themselves now live on the server: public/api/events.json, loaded by src/lib/api.ts
export type CampusEvent = { id: number; title: string; date: string; place: string; seats: number }
