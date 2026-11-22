import { StyleSheet, Text } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type HolidayNoteProps = {
  date: string;
};

// Its own component because a hook cannot be called after the event screen's early returns
export default function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.text}>Checking holidays</Text>;
  }

  if (isError) {
    return <Text style={styles.text}>Holidays unavailable</Text>;
  }

  const holiday = data.find((item) => item.date === date);

  if (holiday) {
    return <Text style={[styles.text, styles.holiday]}>Public holiday: {holiday.name}</Text>;
  }

  return <Text style={styles.text}>Not a public holiday</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#6b7280',
  },
  holiday: {
    fontWeight: '600',
    color: '#1d4ed8',
  },
});
