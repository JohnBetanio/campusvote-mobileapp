import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

export default function AdminProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout', style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/AdminLogin');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>🛡️</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>System Administrator</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoCard}>
        <InfoRow icon="📧" label="Email" value={user?.email ?? ''} />
        <InfoRow icon="🛡️" label="Role" value="Administrator" />
        <InfoRow icon="🔑" label="Access Level" value="Full Access" />
      </View>

      {/* Quick actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <ActionCard icon="👥" label="Manage Students" color="#E3F2FD" onPress={() => router.push('/(tabs)/(admin)/AdminVoters')} />
        <ActionCard icon="🗳️" label="Manage Elections" color="#E8F5E9" onPress={() => router.push('/(tabs)/(admin)/AdminElections')} />
        <ActionCard icon="📊" label="View Reports" color="#EDE7F6" onPress={() => router.push('/(tabs)/(admin)/AdminResults')} />
        <ActionCard icon="⚙️" label="Settings" color="#FFF9C4" onPress={() => Alert.alert('Settings', 'Coming soon!')} />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪  Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>CampusVote v1.0  ·  Admin Portal</Text>
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

function ActionCard({ icon, label, color, onPress }: { icon: string; label: string; color: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    backgroundColor: Colors.adminPrimary, borderRadius: 20, padding: 28,
    alignItems: 'center', marginBottom: 20,
  },
  avatarCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: { fontSize: 34 },
  name: { color: '#fff', fontSize: 20, fontWeight: '800' },
  email: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 5, marginTop: 10,
  },
  roleText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  infoCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 8, marginBottom: 20,
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
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.text, marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  actionCard: {
    width: '47%', borderRadius: 14, padding: 16, alignItems: 'center', gap: 8,
  },
  actionIcon: { fontSize: 28 },
  actionLabel: { fontSize: 13, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  logoutBtn: {
    height: 52, backgroundColor: '#FFEBEE', borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    borderWidth: 1.5, borderColor: '#FFCDD2',
  },
  logoutText: { color: Colors.error, fontSize: 16, fontWeight: '700' },
  footer: { textAlign: 'center', fontSize: 12, color: Colors.textMuted },
});
