export type CampusEvent = { id: number; title: string; date: string; place: string; seats: number }

// All events of the app, copied from Week 7 (iwamad-practice). One more object here =
// one more row and one more screen. The id is the /events/<id> part of the route, so keep it unique
export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-10-22', place: 'Room 302', seats: 20 },
  { id: 2, title: 'Reels shooting workshop', date: '2026-11-05', place: 'Media lab', seats: 12 },
  { id: 3, title: 'Meta ads for small business', date: '2026-11-12', place: 'Room 118', seats: 30 },
  { id: 4, title: 'Portfolio review: bring your site', date: '2026-11-19', place: 'Library, 2nd floor', seats: 3 },
]
