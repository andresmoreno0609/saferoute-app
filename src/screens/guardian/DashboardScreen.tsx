/**
 * SafeRoute App - Guardian Dashboard
 * Flujo 16 - Basado en: flujos/16-guardian-dashboard.md + flujos-design/16-guardian-dashboard/code.html
 */
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
  Pressable, Image, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.6:8080/api/v1';

// ============================================
// Tipos
// ============================================
interface User {
  id: string;
  name: string;
  email: string;
}

interface GuardianProfile {
  id: string;
  userId: string;
  documentNumber?: string;
  birthDate?: string;
  address?: string;
  occupation?: string;
  phone?: string;
  workPhone?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  infoValidate?: boolean;
}

interface Student {
  id: string;
  name: string;
  grade?: string;
  photoUrl?: string;
  status: 'EN_RUTA' | 'EN_COLEGIO' | 'EN_CASA' | 'SIN_RUTA';
  routeId?: string;
  routeName?: string;
  lastUpdate?: string;
}

interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: string;
  read: boolean;
  studentId?: string;
}

let authToken: string | null = null;

// Guardar token al hacer login
export function setAuthToken(token: string) {
  authToken = token;
}

// Restore token from storage
export async function restoreAuthToken() {
  try {
    authToken = await AsyncStorage.getItem('accessToken');
  } catch (e) {
    console.error('Error restoring token:', e);
  }
}

// Helper para hacer requests con token
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...options.headers,
  };
  return fetch(url, { ...options, headers });
}

// ============================================
// API
// ============================================
async function getMe(): Promise<User> {
  const response = await fetchWithAuth(`${API_URL}/auth/me`);
  if (!response.ok) throw new Error('Error fetching user');
  const data = await response.json();
  return data.user;
}

async function getGuardianProfile(userId: string): Promise<GuardianProfile> {
  const response = await fetchWithAuth(`${API_URL}/guardians/user/${userId}`);
  if (!response.ok) return null;
  return response.json();
}

async function getMyChildren(guardianId: string): Promise<Student[]> {
  const response = await fetchWithAuth(`${API_URL}/student-guardians/guardian/${guardianId}`);
  if (!response.ok) return [];
  const data = await response.json();
  
  // Por cada relation, obtener detalles del estudiante
  const students: Student[] = [];
  for (const rel of data) {
    const studentRes = await fetchWithAuth(`${API_URL}/students/${rel.studentId}`);
    if (studentRes.ok) {
      const student = await studentRes.json();
      students.push({
        id: student.id,
        name: student.name,
        grade: student.grade,
        photoUrl: student.photoUrl,
        status: student.status || 'SIN_RUTA',
        routeId: student.routeId,
        routeName: student.routeName,
        lastUpdate: student.lastUpdate,
      });
    }
  }
  return students;
}

async function getNotifications(guardianId: string): Promise<Notification[]> {
  const response = await fetchWithAuth(`${API_URL}/notifications/guardian/${guardianId}?limit=5`);
  if (!response.ok) return [];
  return response.json();
}

// ============================================
// Componentes UI
// ============================================
function Avatar({ uri, name, size = 40 }: { uri?: string; name: string; size?: number }) {
  const initial = name?.charAt(0).toUpperCase() || '?';
  
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      />
    );
  }
  
  return (
    <View style={[styles.avatarPlaceholder, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

function StatusBadge({ status }: { status: Student['status'] }) {
  const config = {
    EN_RUTA: { text: 'En Ruta', bg: '#86f2e4', color: '#00201d' },
    EN_COLEGIO: { text: 'En Colegio', bg: '#e0e3e5', color: '#45464d' },
    EN_CASA: { text: 'En Casa', bg: '#d5e3fd', color: '#0d1c2f' },
    SIN_RUTA: { text: 'Sin Ruta', bg: '#eceef0', color: '#76777d' },
  };
  const { text, bg, color } = config[status];
  
  return (
    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
      <Text style={[styles.statusBadgeText, { color }]}>{text}</Text>
    </View>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const iconMap = {
    info: '🚌',
    warning: '⚠️',
    success: '✅',
    error: '🚨',
  };
  
  return (
    <View style={styles.notificationItem}>
      <View style={[styles.notificationIcon, { backgroundColor: notification.type === 'error' ? '#ffdad6' : '#86f2e4' }]}>
        <Text>{iconMap[notification.type]}</Text>
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationTime}>{notification.createdAt}</Text>
      </View>
    </View>
  );
}

// ============================================
// Pantalla Principal
// ============================================
// Props
interface Props {
  navigation?: any;
}

export default function GuardianDashboardScreen({ navigation }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<GuardianProfile | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      console.log('🔄 Cargando datos del dashboard...');
      
      // 1. Get user desde /me
      const userData = await getMe();
      setUser(userData);
      
      // 2. Get guardian profile
      const profileData = await getGuardianProfile(userData.id);
      setProfile(profileData);
      
      // 3. Get children (si existe profile)
      if (profileData?.id) {
        const childrenData = await getMyChildren(profileData.id);
        setStudents(childrenData);
      }
      
      // 4. Get notifications
      if (profileData?.id) {
        const notifData = await getNotifications(profileData.id);
        setNotifications(notifData);
      }
      
    } catch (err: any) {
      console.error('❌ Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Restore token from storage
    AsyncStorage.getItem('accessToken').then(token => {
      authToken = token;
      loadData();
    });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  const profileIncomplete = !profile?.infoValidate;

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#006a61" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#006a61']} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>SafeRoute</Text>
            <Text style={styles.headerSubtitle}>Hola, {user?.name?.split(' ')[0] || 'Usuario'}</Text>
          </View>
          <Avatar uri={user?.photoUrl} name={user?.name || 'U'} />
        </View>

        {/* Banner: Complete Profile (solo si incompleto) */}
        {profileIncomplete && (
          <Pressable 
            style={styles.banner}
            onPress={() => navigation?.navigate('GuardianCompleteProfile')}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>💡 Completa tu perfil</Text>
              <Text style={styles.bannerDesc}>
                Mejora la seguridad de tus hijos añadiendo contactos de emergencia.
              </Text>
            </View>
            <Pressable 
              style={styles.bannerButton}
              onPress={() => navigation?.navigate('GuardianCompleteProfile')}
            >
              <Text style={styles.bannerButtonText}>ACTUALIZAR</Text>
            </Pressable>
          </Pressable>
        )}

        {/* Section: Mis Hijos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Hijos</Text>
            <Text style={styles.sectionLink}>VER TODOS</Text>
          </View>
          
          <View style={styles.childrenGrid}>
            {students.length === 0 ? (
              <Text style={styles.emptyText}>No hay hijos registrados</Text>
            ) : (
              students.map((student) => (
                <Pressable key={student.id} style={styles.childCard}>
                  <View style={styles.childCardHeader}>
                    <Avatar uri={student.photoUrl} name={student.name} size={56} />
                    <StatusBadge status={student.status} />
                  </View>
                  <View style={styles.childCardInfo}>
                    <Text style={styles.childName}>{student.name}</Text>
                    <Text style={styles.childDetail}>
                      {student.status === 'EN_RUTA' && student.routeName
                        ? `🚌 ${student.routeName}`
                        : student.status === 'EN_COLEGIO'
                        ? '🏫 En el colegio'
                        : student.status === 'EN_CASA'
                        ? '🏠 En casa'
                        : '❌ Sin ruta'}
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        </View>

        {/* Section: Notificaciones Recientes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notificaciones Recientes</Text>
          </View>
          
          <View style={styles.notificationsList}>
            {notifications.length === 0 ? (
              <Text style={styles.emptyText}>No hay notificaciones</Text>
            ) : (
              notifications.slice(0, 3).map((notif) => (
                <NotificationItem key={notif.id} notification={notif} />
              ))
            )}
          </View>
        </View>

        {/* Error */}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom Navigation (fija) */}
      <View style={styles.bottomNav}>
        <Pressable style={[styles.navItem, styles.navItemActive]}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navTextActive}>Inicio</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>🗺️</Text>
          <Text style={styles.navText}>Seguimiento</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navText}>Alertas</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ============================================
// Estilos
// ============================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#45464d',
    fontSize: 16,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#006a61',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#45464d',
  },
  // Avatar
  avatar: {
    borderWidth: 2,
    borderColor: '#86f2e4',
  },
  avatarPlaceholder: {
    backgroundColor: '#006a61',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '600',
  },
  // Banner
  banner: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  bannerContent: {
    position: 'relative',
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  bannerDesc: {
    fontSize: 14,
    color: '#c6c6cd',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#006a61',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  // Section
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#191c1e',
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006a61',
  },
  // Children Grid
  childrenGrid: {
    gap: 12,
  },
  childCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  childCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  childCardInfo: {},
  childName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191c1e',
    marginBottom: 4,
  },
  childDetail: {
    fontSize: 14,
    color: '#45464d',
  },
  // Status Badge
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  // Notifications
  notificationsList: {
    gap: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#006a61',
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    color: '#191c1e',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 10,
    color: '#76777d',
    textTransform: 'uppercase',
  },
  // Empty
  emptyText: {
    fontSize: 14,
    color: '#76777d',
    textAlign: 'center',
    padding: 20,
  },
  // Error
  errorContainer: {
    backgroundColor: '#ffdad6',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  errorText: {
    color: '#ba1a1a',
    fontSize: 14,
  },
  // Bottom Nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e3e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#76777d',
  },
  navTextActive: {
    fontSize: 12,
    color: '#006a61',
    fontWeight: '600',
  },
});