import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="role-select" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="symptoms" />
      <Stack.Screen name="result" />
      <Stack.Screen name="asha" />
    </Stack>
  );
}
