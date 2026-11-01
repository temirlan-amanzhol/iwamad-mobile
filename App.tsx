import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Temirlan Amanzhol</Text>
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
});
