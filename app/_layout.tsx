import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

// Created once, outside the component – inside it, every render would start with an empty cache
const queryClient = new QueryClient();

// The root layout: every screen in app/ is shown inside this Stack,
// so each one gets a header, and the Back arrow comes for free
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="events/index" options={{ title: 'Events' }} />
      </Stack>
    </QueryClientProvider>
  );
}
