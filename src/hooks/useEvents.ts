import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../lib/api';

// One cache entry under ['events'], shared by every screen that calls this hook.
// For 60 seconds the cached list counts as fresh, so coming back to a screen does not fetch again
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 60_000,
  });
}
