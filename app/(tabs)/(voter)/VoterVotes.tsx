import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function VoterVotesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>My Votes</Text>
      <Text style={styles.pageSubtitle}>Review your voting history</Text>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>🗳️</Text>
        <Text style={styles.emptyTitle}>No votes yet</Text>
        <Text style={styles.emptyDesc}>Cast your vote in an active election to see it here.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, marginBottom: 4 },
  pageSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: 20 },
  emptyCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 32, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },
});
