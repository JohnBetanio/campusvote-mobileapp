import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function AdminCreateElectionScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Create Election</Text>
      <Text style={styles.pageSubtitle}>Set up a new campus election</Text>
      <View style={styles.formCard}>
        <Text style={styles.formLabel}>Election Title</Text>
        <View style={styles.input}><Text style={styles.placeholder}>e.g. SSG Elections 2026</Text></View>
        <Text style={styles.formLabel}>Start Date</Text>
        <View style={styles.input}><Text style={styles.placeholder}>Select date...</Text></View>
        <Text style={styles.formLabel}>End Date</Text>
        <View style={styles.input}><Text style={styles.placeholder}>Select date...</Text></View>
        <TouchableOpacity style={styles.createBtn} onPress={() => Alert.alert('Create Election', 'Election creation coming soon!')}>
          <Text style={styles.createBtnText}>+ Create Election</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, marginBottom: 4 },
  pageSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: 20 },
  formCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  formLabel: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 8, marginTop: 12 },
  input: {
    backgroundColor: '#F5F7F5', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: Colors.border,
  },
  placeholder: { fontSize: 14, color: Colors.textMuted },
  createBtn: {
    backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 14,
    alignItems: 'center', marginTop: 20,
  },
  createBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
