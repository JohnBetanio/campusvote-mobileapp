import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="student-login" />
      <Stack.Screen name="student-register" />
      <Stack.Screen name="admin-login" />
    </Stack>
  );
}
