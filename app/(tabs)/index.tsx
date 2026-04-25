import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

export default function StudentHomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.name}>{user?.name}</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Vote status */}
      <View style={[styles.statusCard, user?.hasVoted ? styles.statusVoted : styles.statusPending]}>
        <Text style={styles.statusIcon}>{user?.hasVoted ? '✅' : '🗳️'}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.statusTitle}>
            {user?.hasVoted ? 'Vote Submitted' : 'You Haven\'t Voted Yet'}
          </Text>
          <Text style={styles.statusDesc}>
            {user?.hasVoted
              ? 'Your vote has been recorded for this election cycle.'
              : 'Head to the Elections tab to cast your vote now.'}
          </Text>
        </View>
      </View>

      {/* Active election */}
      <Text style={styles.sectionTitle}>Active Election</Text>
      <View style={styles.electionCard}>
        <View style={styles.electionBadgeRow}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
          <Text style={styles.electionDate}>April 2026</Text>
        </View>
        <Text style={styles.electionTitle}>SNSU Student Government Elections 2026</Text>
        <Text style={styles.electionDesc}>
          Vote for your Student Government officers for Academic Year 2026–2027.
        </Text>
        <View style={styles.positionRow}>
          {['President', 'VP', 'Secretary', 'Treasurer'].map(pos => (
            <View key={pos} style={styles.posBadge}>
              <Text style={styles.posBadgeText}>{pos}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.voteBtn, user?.hasVoted && styles.voteBtnDone]}
          disabled={!!user?.hasVoted}
        >
          <Text style={styles.voteBtnText}>
            {user?.hasVoted ? '✓ Already Voted' : 'Cast My Vote →'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick stats */}
      <Text style={styles.sectionTitle}>Election Info</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>4</Text>
          <Text style={styles.statLabel}>Positions</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>12</Text>
          <Text style={styles.statLabel}>Candidates</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>5</Text>
          <Text style={styles.statLabel}>Days Left</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  header: {
    backgroundColor: Colors.primary, borderRadius: 20, padding: 20, marginBottom: 16,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { color: 'rgba(255,255,255,0.65)', fontSize: 13 },
  name: { color: '#fff', fontSize: 21, fontWeight: '800', marginTop: 2 },
  email: { color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 6 },
  avatarCircle: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  statusCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 14, padding: 16, marginBottom: 20,
  },
  statusVoted: { backgroundColor: '#E8F5E9', borderLeftWidth: 4, borderLeftColor: Colors.success },
  statusPending: { backgroundColor: '#FFF9C4', borderLeftWidth: 4, borderLeftColor: '#FDD835' },
  statusIcon: { fontSize: 28 },
  statusTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  statusDesc: { fontSize: 12, color: '#666', marginTop: 3, lineHeight: 17 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.text, marginBottom: 12 },
  electionCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 18, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  electionBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#FFEBEE', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.error },
  liveBadgeText: { fontSize: 11, fontWeight: '800', color: Colors.error, letterSpacing: 1 },
  electionDate: { fontSize: 12, color: Colors.textMuted },
  electionTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  electionDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 12 },
  positionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  posBadge: { backgroundColor: Colors.primaryBg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  posBadgeText: { fontSize: 12, color: Colors.primaryLight, fontWeight: '600' },
  voteBtn: {
    height: 46, backgroundColor: Colors.primaryLight,
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
  },
  voteBtnDone: { backgroundColor: '#C8E6C9' },
  voteBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  statNum: { fontSize: 26, fontWeight: '900', color: Colors.primaryLight },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 2, fontWeight: '600' },
});
