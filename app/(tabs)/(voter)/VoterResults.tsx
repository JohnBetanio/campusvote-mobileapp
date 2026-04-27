import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const RESULTS = [
  { name: 'Juan Dela Cruz', votes: 342, pct: 48, position: 'President' },
  { name: 'Maria Santos', votes: 289, pct: 41, position: 'President' },
  { name: 'Pedro Reyes', votes: 78, pct: 11, position: 'President' },
];

export default function VoterResultsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Results</Text>
      <Text style={styles.pageSubtitle}>Live election results</Text>
      {RESULTS.map((r, i) => (
        <View key={r.name} style={styles.resultCard}>
          <View style={styles.rankCircle}>
            <Text style={styles.rankText}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.resultTop}>
              <Text style={styles.candidateName}>{r.name}</Text>
              <Text style={styles.candidatePct}>{r.pct}%</Text>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${r.pct}%`, backgroundColor: i === 0 ? Colors.primaryLight : i === 1 ? '#42A5F5' : '#EF9A9A' }]} />
            </View>
            <Text style={styles.voteCount}>{r.votes.toLocaleString()} votes</Text>
          </View>
        </View>
      ))}
      <Text style={styles.disclaimer}>📊 Results may be partial. Official results will be announced after voting ends.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, marginBottom: 4 },
  pageSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: 16 },
  resultCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row',
    alignItems: 'center', gap: 14, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  rankCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primaryBg, justifyContent: 'center', alignItems: 'center',
  },
  rankText: { fontSize: 16, fontWeight: '900', color: Colors.primaryLight },
  resultTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  candidateName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  candidatePct: { fontSize: 15, fontWeight: '900', color: Colors.primaryLight },
  barBg: { height: 8, backgroundColor: '#eee', borderRadius: 4, marginBottom: 4 },
  barFill: { height: 8, borderRadius: 4 },
  voteCount: { fontSize: 11, color: Colors.textMuted },
  disclaimer: { fontSize: 11, color: Colors.textMuted, textAlign: 'center', marginTop: 10 },
});
