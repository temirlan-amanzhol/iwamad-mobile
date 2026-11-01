import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
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
