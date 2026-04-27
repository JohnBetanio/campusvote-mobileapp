import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const ELECTIONS = [
  {
    id: '1', status: 'live',
    title: 'SNSU Student Government Elections 2026',
    start: 'Apr 20, 2026', end: 'Apr 30, 2026',
    positions: 4, candidates: 12, totalVotes: 709,
  },
  {
    id: '2', status: 'upcoming',
    title: 'College Council Elections 2026',
    start: 'May 10, 2026', end: 'May 15, 2026',
    positions: 3, candidates: 0, totalVotes: 0,
  },
  {
    id: '3', status: 'ended',
    title: 'SNSU Student Government Elections 2025',
    start: 'Apr 18, 2025', end: 'Apr 25, 2025',
    positions: 4, candidates: 9, totalVotes: 1204,
  },
];

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  live: { bg: '#FFEBEE', text: Colors.error, label: 'LIVE' },
  upcoming: { bg: '#E3F2FD', text: '#1565C0', label: 'UPCOMING' },
  ended: { bg: '#F5F5F5', text: '#757575', label: 'ENDED' },
};

function StatPill({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 14, marginBottom: 2 }}>{icon}</Text>
      <Text style={{ fontSize: 13, fontWeight: '800', color: Colors.text }}>{value}</Text>
      <Text style={{ fontSize: 10, color: Colors.textMuted, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

export default function AdminElectionsScreen() {
  const router = useRouter();
  const [elections] = useState(ELECTIONS);

  const handleCreate = () => {
    Alert.alert('Create Election', 'Election creation form coming soon!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.pageTitle}>Elections</Text>
          <Text style={styles.pageSubtitle}>Manage all elections</Text>
        </View>
        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <Text style={styles.createBtnText}>＋ New</Text>
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {['All', 'Live', 'Upcoming', 'Ended'].map(f => (
          <TouchableOpacity key={f} style={[styles.chip, f === 'All' && styles.chipActive]}>
            <Text style={[styles.chipText, f === 'All' && styles.chipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {elections.map(e => {
        const s = STATUS_STYLE[e.status];
        return (
          <View key={e.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={[styles.badge, { backgroundColor: s.bg }]}>
                {e.status === 'live' && <View style={styles.liveDot} />}
                <Text style={[styles.badgeText, { color: s.text }]}>{s.label}</Text>
              </View>
              <Text style={styles.dateRange}>{e.start} – {e.end}</Text>
            </View>

            <Text style={styles.cardTitle}>{e.title}</Text>

            <View style={styles.statsRow}>
              <StatPill icon="📋" label="Positions" value={e.positions} />
              <StatPill icon="👤" label="Candidates" value={e.candidates} />
              <StatPill icon="🗳️" label="Votes" value={e.totalVotes} />
            </View>

            <View style={styles.actionsRow}>
              {e.status !== 'ended' && (
                <TouchableOpacity style={styles.btnPrimary} onPress={() => Alert.alert('Manage Election', `Managing "${e.title}" - coming soon!`)}>
                  <Text style={styles.btnPrimaryText}>⚙️ Manage</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/(tabs)/(admin)/AdminResults')}>
                <Text style={styles.btnOutlineText}>📊 Results</Text>
              </TouchableOpacity>
              {e.status === 'live' && (
                <TouchableOpacity
                  style={styles.btnDanger}
                  onPress={() => Alert.alert('End Election', `End "${e.title}" now?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'End', style: 'destructive', onPress: () => { } },
                  ])}
                >
                  <Text style={styles.btnDangerText}>⏹ End</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}

      {/* Create placeholder */}
      <TouchableOpacity style={styles.createCard} onPress={handleCreate}>
        <Text style={styles.createCardIcon}>＋</Text>
        <Text style={styles.createCardText}>Create New Election</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text },
  pageSubtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  createBtn: {
    backgroundColor: Colors.primary, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  createBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  chip: {
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6,
    borderWidth: 1, borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  chipTextActive: { color: '#fff' },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.error },
  badgeText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  dateRange: { fontSize: 12, color: Colors.textMuted },
  cardTitle: { fontSize: 15, fontWeight: '800', color: Colors.text, marginBottom: 10 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  actionsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  btnPrimary: {
    backgroundColor: Colors.primaryLight, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  btnPrimaryText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  btnOutline: {
    borderWidth: 1.5, borderColor: Colors.primaryLight, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  btnOutlineText: { color: Colors.primaryLight, fontSize: 12, fontWeight: '700' },
  btnDanger: {
    backgroundColor: Colors.error, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  btnDangerText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  createCard: {
    borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed',
    borderRadius: 16, padding: 20, alignItems: 'center', marginTop: 4,
  },
  createCardIcon: { fontSize: 28, color: Colors.textMuted, marginBottom: 4 },
  createCardText: { fontSize: 14, fontWeight: '700', color: Colors.textMuted },
});
