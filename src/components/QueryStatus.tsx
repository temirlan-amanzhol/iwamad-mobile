import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

// Shown while the first request is still on its way – there is no data yet to draw
export function LoadingView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1d4ed8" />
      <Text style={styles.text}>Loading events</Text>
    </View>
  );
}

type ErrorViewProps = {
  message: string;
  onRetry: () => void;
};

// Shown when the request failed (after TanStack Query's retries) – always with a way out
export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Could not load events</Text>
      <Text style={styles.text}>{message}</Text>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  text: {
    fontSize: 16,
    color: '#6b7280',
  },
  button: {
    minHeight: 44, // touch target
    minWidth: 120,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
