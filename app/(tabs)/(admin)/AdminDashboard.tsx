import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const raw = await AsyncStorage.getItem('cv_students');
    setStudents(raw ? JSON.parse(raw) : []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const voted = students.filter(s => s.hasVoted).length;

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/AdminLogin');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Dashboard</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={styles.adminPill}>
            <Text style={styles.adminPillText}>Admin Portal</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
            <Ionicons name="log-out-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>Dashboard</Text>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { borderLeftColor: Colors.success }]}>
          <Text style={styles.statNum}>4</Text>
          <Text style={styles.statLabel}>TOTAL ELECTIONS</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: Colors.blue }]}>
          <Text style={styles.statNum}>2</Text>
          <Text style={styles.statLabel}>ACTIVE ELECTIONS</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: Colors.warning }]}>
          <Text style={styles.statNum}>{students.length || 342}</Text>
          <Text style={styles.statLabel}>REGISTERED VOTERS</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: Colors.error }]}>
          <Text style={styles.statNum}>{voted || 267}</Text>
          <Text style={styles.statLabel}>TOTAL VOTES CAST</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/(tabs)/(admin)/AdminCreateElection')}>
          <Text style={styles.createBtnText}>+ Create New Election</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.manageBtn} onPress={() => router.push('/(tabs)/(admin)/AdminElections')}>
          <Text style={styles.manageBtnText}>Manage Elections</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.primary, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12,
    marginBottom: 20,
  },
  topBarTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  adminPill: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  adminPillText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, marginBottom: 16 },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20,
  },
  statCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 18,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  statNum: { fontSize: 28, fontWeight: '900', color: Colors.text, marginBottom: 4 },
  statLabel: { fontSize: 10, fontWeight: '800', color: Colors.textMuted, letterSpacing: 0.5 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  createBtn: {
    flex: 1, backgroundColor: Colors.primary, borderRadius: 24,
    paddingVertical: 14, alignItems: 'center',
  },
  createBtnText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  manageBtn: {
    flex: 1, backgroundColor: '#E8EDF3', borderRadius: 24,
    paddingVertical: 14, alignItems: 'center',
  },
  manageBtnText: { color: Colors.text, fontSize: 14, fontWeight: '800' },
  logoutIcon: { padding: 4 },
});
