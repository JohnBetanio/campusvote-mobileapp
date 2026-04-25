import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

export default function AdminDashboardScreen() {
  const { user } = useAuth();
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
  const notVoted = students.length - voted;
  const pct = students.length > 0 ? Math.round((voted / students.length) * 100) : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Panel 🛡️</Text>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      {/* Stats row */}
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.statsRow}>
        <StatCard label="Registered" value={students.length} color="#E3F2FD" textColor="#1565C0" />
        <StatCard label="Voted" value={voted} color="#E8F5E9" textColor={Colors.primaryLight} />
        <StatCard label="Pending" value={notVoted} color="#FFF9C4" textColor="#E65100" />
      </View>

      {/* Turnout */}
      <View style={styles.turnoutCard}>
        <View style={styles.turnoutHeader}>
          <Text style={styles.turnoutTitle}>Voter Turnout</Text>
          <Text style={styles.turnoutPct}>{pct}%</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.turnoutSub}>{voted} of {students.length} registered students have voted</Text>
      </View>

      {/* Active election summary */}
      <Text style={styles.sectionTitle}>Active Election</Text>
      <View style={styles.electionCard}>
        <View style={styles.electionTop}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
          <Text style={styles.electionMeta}>Ends Apr 30, 2026</Text>
        </View>
        <Text style={styles.electionTitle}>SNSU Student Government Elections 2026</Text>
        <Text style={styles.electionDesc}>AY 2026–2027 officer elections. 4 positions open.</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>📊 View Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]}>
            <Text style={styles.actionBtnOutlineText}>⚙️ Manage</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.pullHint}>↓ Pull to refresh stats</Text>
    </ScrollView>
  );
}

function StatCard({ label, value, color, textColor }: { label: string; value: number; color: string; textColor: string }) {
  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Text style={[styles.statNum, { color: textColor }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  header: {
    backgroundColor: Colors.adminPrimary, borderRadius: 20, padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20,
  },
  greeting: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  name: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 2 },
  email: { color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 3 },
  avatarCircle: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '900' },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.text, marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 28, fontWeight: '900' },
  statLabel: { fontSize: 11, color: '#666', marginTop: 2, fontWeight: '600' },
  turnoutCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  turnoutHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  turnoutTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  turnoutPct: { fontSize: 22, fontWeight: '900', color: Colors.primaryLight },
  progressBg: { height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, marginBottom: 8 },
  progressFill: { height: 10, backgroundColor: Colors.primaryLight, borderRadius: 5 },
  turnoutSub: { fontSize: 12, color: Colors.textMuted },
  electionCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  electionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#FFEBEE', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.error },
  liveBadgeText: { fontSize: 11, fontWeight: '800', color: Colors.error, letterSpacing: 1 },
  electionMeta: { fontSize: 12, color: Colors.textMuted },
  electionTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  electionDesc: { fontSize: 13, color: Colors.textSecondary, marginBottom: 14 },
  actionRow: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flex: 1, backgroundColor: Colors.primaryLight, borderRadius: 10,
    height: 40, justifyContent: 'center', alignItems: 'center',
  },
  actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  actionBtnOutline: {
    backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primaryLight,
  },
  actionBtnOutlineText: { color: Colors.primaryLight, fontSize: 13, fontWeight: '700' },
  pullHint: { textAlign: 'center', fontSize: 12, color: Colors.textMuted, marginTop: 8 },
});
