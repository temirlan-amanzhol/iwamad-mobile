import { Stack } from 'expo-router';

// The root layout: every screen in app/ is shown inside this Stack,
// so each one gets a header, and the Back arrow comes for free
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="events/index" options={{ title: 'Events' }} />
    </Stack>
  );
}
