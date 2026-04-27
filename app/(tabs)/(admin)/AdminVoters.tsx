import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Alert, RefreshControl, TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface Student {
  id: string; name: string; email: string;
  hasVoted: boolean; createdAt: string;
}

export default function AdminVotersScreen() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'voted' | 'pending'>('all');

  const load = useCallback(async () => {
    const raw = await AsyncStorage.getItem('cv_students');
    setStudents(raw ? JSON.parse(raw) : []);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Remove Student', `Remove "${name}" from the system?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive',
        onPress: async () => {
          const updated = students.filter(s => s.id !== id);
          await AsyncStorage.setItem('cv_students', JSON.stringify(updated));
          setStudents(updated);
        },
      },
    ]);
  };

  const filtered = students
    .filter(s => filter === 'all' ? true : filter === 'voted' ? s.hasVoted : !s.hasVoted)
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    );

  const voted = students.filter(s => s.hasVoted).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primaryLight} />}
    >
      <Text style={styles.pageTitle}>Students</Text>
      <Text style={styles.pageSubtitle}>{students.length} registered · {voted} voted</Text>

      {/* Search */}
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['all', 'voted', 'pending'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>
              {f === 'all' ? `All (${students.length})` : f === 'voted' ? `Voted (${voted})` : `Pending (${students.length - voted})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Student list */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>{search ? '🔍' : '👥'}</Text>
          <Text style={styles.emptyTitle}>{search ? 'No results found' : 'No students yet'}</Text>
          <Text style={styles.emptyDesc}>
            {search ? `No student matches "${search}"` : 'Students who register will appear here.'}
          </Text>
        </View>
      ) : (
        filtered.map(student => (
          <View key={student.id} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{student.name?.[0]?.toUpperCase()}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentEmail}>{student.email}</Text>
              <View style={[styles.tag, student.hasVoted ? styles.tagVoted : styles.tagPending]}>
                <Text style={[styles.tagText, student.hasVoted ? styles.tagTextVoted : styles.tagTextPending]}>
                  {student.hasVoted ? '✓ Voted' : '○ Pending'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(student.id, student.name)}
            >
              <Text style={styles.deleteBtnText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, marginBottom: 4 },
  pageSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: 16 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
    marginBottom: 14, borderWidth: 1, borderColor: Colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.text },
  clearBtn: { fontSize: 14, color: Colors.textMuted, paddingHorizontal: 4 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  filterChip: {
    backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  filterChipTextActive: { color: '#fff' },
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14, flexDirection: 'row',
    alignItems: 'center', gap: 12, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primaryBg, justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '800', color: Colors.primaryLight },
  info: { flex: 1 },
  studentName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  studentEmail: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  tag: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginTop: 6 },
  tagVoted: { backgroundColor: '#E8F5E9' },
  tagPending: { backgroundColor: '#FFF9C4' },
  tagText: { fontSize: 11, fontWeight: '700' },
  tagTextVoted: { color: Colors.primaryLight },
  tagTextPending: { color: '#E65100' },
  deleteBtn: { padding: 6 },
  deleteBtnText: { fontSize: 16 },
  empty: { alignItems: 'center', marginTop: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },
});
