import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const ELECTIONS = [
  {
    id: '1', status: 'live', title: 'SNSU Student Government Elections 2026',
    desc: 'Vote for SSG officers for AY 2026–2027.', endDate: 'Apr 30, 2026',
    positions: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor'],
  },
  {
    id: '2', status: 'upcoming', title: 'College Council Elections 2026',
    desc: 'Choose your college-level representatives.', endDate: 'May 15, 2026',
    positions: ['Governor', 'Vice Governor', 'Secretary'],
  },
];

export default function ElectionsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Elections</Text>
      <Text style={styles.pageSubtitle}>Cast your vote in active elections</Text>

      {ELECTIONS.map(e => (
        <View key={e.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.badge, e.status === 'live' ? styles.badgeLive : styles.badgeUpcoming]}>
              {e.status === 'live' && <View style={styles.liveDot} />}
              <Text style={[styles.badgeText, e.status === 'live' ? styles.badgeTextLive : styles.badgeTextUpcoming]}>
                {e.status === 'live' ? 'LIVE' : 'UPCOMING'}
              </Text>
            </View>
            <Text style={styles.endDate}>Ends {e.endDate}</Text>
          </View>

          <Text style={styles.cardTitle}>{e.title}</Text>
          <Text style={styles.cardDesc}>{e.desc}</Text>

          <Text style={styles.posLabel}>Positions ({e.positions.length})</Text>
          <View style={styles.posRow}>
            {e.positions.map(p => (
              <View key={p} style={styles.posBadge}>
                <Text style={styles.posBadgeText}>{p}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.voteBtn, e.status !== 'live' && styles.voteBtnDisabled]}
            disabled={e.status !== 'live'}
          >
            <Text style={styles.voteBtnText}>
              {e.status === 'live' ? '🗳️  Vote Now' : '🔒  Not Yet Open'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, marginBottom: 4 },
  pageSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: 20 },
  card: {
    backgroundColor: '#fff', borderRadius: 18, padding: 18, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeLive: { backgroundColor: '#FFEBEE' },
  badgeUpcoming: { backgroundColor: '#E3F2FD' },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.error },
  badgeText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  badgeTextLive: { color: Colors.error },
  badgeTextUpcoming: { color: '#1565C0' },
  endDate: { fontSize: 12, color: Colors.textMuted },
  cardTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  cardDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 12 },
  posLabel: { fontSize: 12, fontWeight: '700', color: '#999', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  posRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  posBadge: { backgroundColor: Colors.primaryBg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  posBadgeText: { fontSize: 12, color: Colors.primaryLight, fontWeight: '600' },
  voteBtn: {
    height: 48, backgroundColor: Colors.primaryLight,
    borderRadius: 14, justifyContent: 'center', alignItems: 'center',
  },
  voteBtnDisabled: { backgroundColor: '#e0e0e0' },
  voteBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
