import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// app/index.tsx is the "/" route – the Home screen
export default function HomeScreen() {
  // Same idea as the Week 3 counter: state + a handler, only the building blocks are native
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Temirlan Amanzhol</Text>

      <Text style={styles.likes}>Likes: {likes}</Text>
      {/* Pressable is React Native's button: onPress instead of onClick */}
      <Pressable
        onPress={() => setLikes(likes + 1)}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      {/* asChild: the Link gives its navigation to the Pressable instead of drawing its own text */}
      <Link href="/events" asChild>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, styles.secondary, pressed && styles.buttonPressed]}
        >
          <Text style={[styles.buttonText, styles.secondaryText]}>Events</Text>
        </Pressable>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}

// React Native styles are plain objects: numbers, not "32px"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1f2937',
  },
  name: {
    fontSize: 20,
    color: '#6b7280',
  },
  likes: {
    marginTop: 16,
    fontSize: 18,
    color: '#1f2937',
  },
  button: {
    minHeight: 44, // Week 5 touch target
    minWidth: 120,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1d4ed8',
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: '#ffffff',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#1d4ed8',
  },
});
