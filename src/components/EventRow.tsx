import { Pressable, StyleSheet, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  saved?: boolean;
};

// One row of the Events list. It only shows the event and reports touches –
// what a tap, a swipe or a long-press does is decided by the screen that uses it
export default function EventRow({ event, onPress, onToggleSaved, saved = false }: EventRowProps) {
  return (
    // The row fades in and out, and slides into place when rows above it disappear (e.g. while searching)
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      {/* Swipe the row left to reveal the Save / Unsave action behind it */}
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            accessibilityRole="button"
            style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          accessibilityRole="button"
          accessibilityHint="Swipe left or long-press to save or unsave"
          // pressed is true while a finger is on the row – the touch feedback
          style={({ pressed }) => [styles.card, saved && styles.cardSaved, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
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
  action: {
    minHeight: 44, // touch target
    minWidth: 96,
    marginLeft: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPressed: {
    opacity: 0.8,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
