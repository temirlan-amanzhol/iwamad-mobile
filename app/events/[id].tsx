import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { events } from '../../src/data/events';

// app/events/[id].tsx is the "/events/:id" route – [id] is the changing part
export default function EventScreen() {
  // Like useParams on the web: the id arrives as a string, so convert it before comparing
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event not found' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.text}>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sets this screen's header title from the data */}
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>
        {event.date} · {event.place}
      </Text>
      <Text style={styles.text}>{event.seats} seats</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  text: {
    fontSize: 16,
    color: '#374151',
  },
});
