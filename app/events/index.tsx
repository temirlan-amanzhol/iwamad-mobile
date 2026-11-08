import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

// app/events/index.tsx is the "/events" route
export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  // Computed on every render from the text – not kept in a second useState
  const search = query.trim().toLowerCase();
  const visibleEvents = events.filter((event) => event.title.toLowerCase().includes(search));

  function toggleSaved(id: number) {
    // Always a new array: [...ids, id] to add, filter to remove – never push or splice
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id]));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Long-press an event to save it. Saved: {savedIds.length}</Text>

      {/* Controlled input: value comes from state, onChangeText writes it back */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search events"
        accessibilityLabel="Search events"
        autoCorrect={false}
        style={styles.search}
      />

      {/* FlatList draws only the rows on screen – unlike a ScrollView with .map() */}
      <FlatList
        data={visibleEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  hint: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6b7280',
  },
  search: {
    minHeight: 44,
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  empty: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});
