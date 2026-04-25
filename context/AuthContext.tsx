import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  hasVoted?: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  registerStudent: (data: { fullName: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  loginStudent: (data: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (data: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_ADMIN = {
  id: 'admin_001',
  email: 'admin@snsu.edu.ph',
  password: 'admin123',
  role: 'admin' as const,
  name: 'System Administrator',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAdmin();
    loadUser();
  }, []);

  const initializeAdmin = async () => {
    try {
      const admins = await AsyncStorage.getItem('cv_admins');
      if (!admins) {
        await AsyncStorage.setItem('cv_admins', JSON.stringify([DEFAULT_ADMIN]));
      }
    } catch {}
  };

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('cv_current_user');
      if (userData) setUser(JSON.parse(userData));
    } catch {}
    finally { setLoading(false); }
  };

  const registerStudent = async ({ fullName, email, password }: { fullName: string; email: string; password: string }) => {
    try {
      if (!email.toLowerCase().endsWith('@snsu.edu.ph')) {
        return { success: false, error: 'Please use your SNSU student email (@snsu.edu.ph)' };
      }
      const raw = await AsyncStorage.getItem('cv_students');
      const students = raw ? JSON.parse(raw) : [];
      if (students.find((s: any) => s.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'An account with this email already exists.' };
      }
      const newStudent = {
        id: `student_${Date.now()}`,
        name: fullName.trim(),
        email: email.toLowerCase().trim(),
        password,
        role: 'student',
        hasVoted: false,
        createdAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem('cv_students', JSON.stringify([...students, newStudent]));
      return { success: true };
    } catch {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const loginStudent = async ({ email, password }: { email: string; password: string }) => {
    try {
      const raw = await AsyncStorage.getItem('cv_students');
      const students = raw ? JSON.parse(raw) : [];
      const student = students.find(
        (s: any) => s.email.toLowerCase() === email.toLowerCase().trim() && s.password === password
      );
      if (!student) return { success: false, error: 'Invalid email or password.' };
      const { password: _, ...sessionUser } = student;
      await AsyncStorage.setItem('cv_current_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    } catch {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const loginAdmin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const raw = await AsyncStorage.getItem('cv_admins');
      const admins = raw ? JSON.parse(raw) : [DEFAULT_ADMIN];
      const admin = admins.find(
        (a: any) => a.email.toLowerCase() === email.toLowerCase().trim() && a.password === password
      );
      if (!admin) return { success: false, error: 'Invalid admin credentials.' };
      const { password: _, ...sessionUser } = admin;
      await AsyncStorage.setItem('cv_current_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    } catch {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('cv_current_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerStudent, loginStudent, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
