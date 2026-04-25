import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

export default function AdminLoginScreen() {
  const { loginAdmin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter admin email and password.');
      return;
    }
    setLoading(true);
    const result = await loginAdmin({ email, password });
    setLoading(false);
    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
    // Auth guard in _layout.tsx handles redirect
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🛡️</Text>
          </View>
          <Text style={styles.appName}>CampusVote</Text>
          <Text style={styles.appTagline}>Administrator Portal</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Admin Login</Text>

          {/* Default credentials hint */}
          <View style={styles.hintBox}>
            <Text style={styles.hintBoxTitle}>🔑 Default Credentials</Text>
            <Text style={styles.hintBoxLine}>admin@snsu.edu.ph</Text>
            <Text style={styles.hintBoxLine}>admin123</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Admin Email</Text>
            <TextInput
              style={styles.input}
              placeholder="admin@example.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.pwRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter admin password"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(v => !v)}>
                <Text>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.adminBtn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.adminBtnText}>Login</Text>
            }
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.links}>
            <TouchableOpacity onPress={() => router.push('/(auth)/student-register')}>
              <Text style={styles.linkText}>
                Don't have an account? <Text style={styles.linkBold}>Register</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace('/(auth)/student-login')}>
              <Text style={styles.linkText}>
                <Text style={styles.linkBold}>Login as Student</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.adminPrimary },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48, paddingHorizontal: 20 },
  logoArea: { alignItems: 'center', marginBottom: 28 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)',
  },
  logoEmoji: { fontSize: 36 },
  appName: { color: '#fff', fontSize: 26, fontWeight: '900', letterSpacing: 0.5 },
  appTagline: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 3 },
  card: {
    width: '100%', maxWidth: 390, backgroundColor: Colors.white,
    borderRadius: 24, padding: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 14,
  },
  title: { fontSize: 22, fontWeight: '800', color: Colors.text, marginBottom: 16, textAlign: 'center' },
  hintBox: {
    backgroundColor: '#EDE7F6', borderRadius: 12, padding: 12,
    marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#7E57C2',
  },
  hintBoxTitle: { fontSize: 12, fontWeight: '700', color: '#5E35B1', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  hintBoxLine: { fontSize: 13, color: '#512DA8', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    height: 50, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: 12, paddingHorizontal: 16, fontSize: 15,
    color: Colors.text, backgroundColor: '#fafafa',
  },
  pwRow: { flexDirection: 'row', alignItems: 'center' },
  eyeBtn: { position: 'absolute', right: 14, height: 50, justifyContent: 'center' },
  adminBtn: {
    height: 52, backgroundColor: Colors.adminLight,
    borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginTop: 4,
    shadowColor: Colors.adminPrimary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 6,
  },
  btnDisabled: { opacity: 0.65 },
  adminBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#ebebeb' },
  dividerText: { marginHorizontal: 10, color: Colors.textMuted, fontSize: 12 },
  links: { gap: 8, alignItems: 'center' },
  linkText: { color: Colors.textSecondary, fontSize: 14 },
  linkBold: { color: Colors.adminLight, fontWeight: '700' },
});
