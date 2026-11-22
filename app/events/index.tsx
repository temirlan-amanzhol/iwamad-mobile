import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { ErrorView, LoadingView } from '../../src/components/QueryStatus';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';

// app/events/index.tsx is the "/events" route
export default function EventsScreen() {
  // Saved ids now live in AsyncStorage, so they survive closing the app
  const { savedIds, toggleSaved } = useSavedIds();
  const [query, setQuery] = useState('');
  // The list comes from the server through the shared ['events'] cache
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();

  if (isPending) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorView message={error.message} onRetry={() => refetch()} />;
  }

  // Computed on every render from the text – not kept in a second useState
  const search = query.trim().toLowerCase();
  const visibleEvents = data.filter((event) => event.title.toLowerCase().includes(search));

  return (
    <View style={styles.container}>
      {/* FlatList draws only the rows on screen – unlike a ScrollView with .map() */}
      <FlatList
        // On iOS the header can float over the screen; "automatic" moves the content below it
        contentInsetAdjustmentBehavior="automatic"
        // The hint and the search scroll with the list, so they are never hidden under the header
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.hint}>Swipe or long-press an event to save it. Saved: {savedIds.length}</Text>
            {/* Controlled input: value comes from state, onChangeText writes it back */}
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search events"
              accessibilityLabel="Search events"
              autoCorrect={false}
              style={styles.search}
            />
          </View>
        }
        data={visibleEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onToggleSaved={() => toggleSaved(item.id)}
          />
        )}
        // Pull to refresh: the spinner shows while the cache is fetched again
        refreshing={isRefetching}
        onRefresh={() => refetch()}
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
  },
  header: {
    gap: 16,
  },
  hint: {
    fontSize: 14,
    color: '#6b7280',
  },
  search: {
    minHeight: 44,
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
