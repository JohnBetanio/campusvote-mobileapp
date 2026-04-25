import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout', style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/student-login');
        },
      },
    ]);
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>🎓 Student</Text>
        </View>
      </View>

      {/* Info cards */}
      <View style={styles.infoCard}>
        <InfoRow icon="📧" label="Email" value={user?.email ?? ''} />
        <InfoRow icon="🗓️" label="Joined" value={joinDate} />
        <InfoRow icon="🗳️" label="Vote Status" value={user?.hasVoted ? 'Voted ✅' : 'Not yet voted'} />
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪  Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>CampusVote v1.0  ·  SNSU</Text>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    backgroundColor: Colors.primary, borderRadius: 20, padding: 28,
    alignItems: 'center', marginBottom: 20,
  },
  avatarCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: '900' },
  name: { color: '#fff', fontSize: 20, fontWeight: '800' },
  email: { color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 4 },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 5, marginTop: 10,
  },
  roleText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  infoCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 8, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
  },
  infoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingVertical: 14, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  infoIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  infoLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 15, color: Colors.text, fontWeight: '600', marginTop: 2 },
  logoutBtn: {
    height: 52, backgroundColor: '#FFEBEE', borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    borderWidth: 1.5, borderColor: '#FFCDD2',
  },
  logoutText: { color: Colors.error, fontSize: 16, fontWeight: '700' },
  footer: { textAlign: 'center', fontSize: 12, color: Colors.textMuted },
});
