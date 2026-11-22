import { useQuery } from '@tanstack/react-query';
import { fetchHolidays } from '../lib/holidays';

// One cache entry per year: two events in the same year share one request.
// Holidays do not change hourly, so the list stays fresh for a day
export function useHolidays(year: number) {
  return useQuery({
    queryKey: ['holidays', year],
    queryFn: () => fetchHolidays(year),
    staleTime: 24 * 60 * 60 * 1000,
  });
}
