import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function VoterProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/VoterLogin');
  };

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: handleLogout },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Profile</Text>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name?.[0] || 'S').toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Student'}</Text>
        <Text style={styles.email}>{user?.email || 'student@snsu.edu.ph'}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>👤 Student</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={confirmLogout}>
        <Text style={styles.logoutBtnText}>🚪  Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, marginBottom: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 18, padding: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
    marginBottom: 16,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.primaryBg, justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: { fontSize: 32, fontWeight: '900', color: Colors.primaryLight },
  name: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  email: { fontSize: 14, color: Colors.textMuted, marginBottom: 10 },
  tag: { backgroundColor: Colors.primaryBg, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  tagText: { fontSize: 12, fontWeight: '700', color: Colors.primaryLight },
  logoutBtn: {
    backgroundColor: Colors.error, borderRadius: 14, paddingVertical: 14,
    alignItems: 'center',
  },
  logoutBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
