import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

// app/events/index.tsx is the "/events" route
export default function EventsScreen() {
  return (
    <View style={styles.container}>
      {/* FlatList draws only the rows on screen – unlike a ScrollView with .map() */}
      <FlatList
        data={events}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => {}}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
    gap: 12,
  },
});
