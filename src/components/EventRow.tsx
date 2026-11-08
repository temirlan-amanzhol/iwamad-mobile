import { Pressable, StyleSheet, Text } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  saved?: boolean;
};

// One row of the Events list. It only shows the event and reports touches –
// what a tap or a long-press does is decided by the screen that uses it
export default function EventRow({ event, onPress, onLongPress, saved = false }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityHint="Long-press to save or unsave"
      // pressed is true while a finger is on the row – the touch feedback
      style={({ pressed }) => [styles.card, saved && styles.cardSaved, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44, // touch target
    padding: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  cardSaved: {
    borderColor: '#1d4ed8',
  },
  cardPressed: {
    backgroundColor: '#eff6ff',
    borderColor: '#1d4ed8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  meta: {
    fontSize: 14,
    color: '#6b7280',
  },
  saved: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1d4ed8',
  },
});
