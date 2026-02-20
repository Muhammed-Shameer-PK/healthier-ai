import React, { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LanguageProvider } from '../src/context/LanguageContext';
import { getUserProfile } from '../src/services/storageService';

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    getUserProfile().then(p => {
      setHasProfile(!!p);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready || hasProfile === null) return;
    if (!hasProfile && segments[0] !== 'profile-setup') {
      router.replace('/profile-setup');
    }
  }, [ready, hasProfile, segments]);

  if (!ready) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#FFB6C1" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#FFF5F5' }, headerTintColor: '#333', headerTitleStyle: { fontWeight: '600' }, contentStyle: { backgroundColor: '#FFF5F5' } }}>
        <Stack.Screen name="(tabs)"        options={{ headerShown: false }} />
        <Stack.Screen name="profile-setup" options={{ headerShown: false }} />
      </Stack>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({ splash: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF5F5' } });
