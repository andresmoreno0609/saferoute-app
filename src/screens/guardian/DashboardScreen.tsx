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

const API_URL = 'http://192.168.1.8:8080/api/v1';

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
    EN_RUTA: { text: 'En Ruta', bg: '#DBFCE7', color: '#166534', icon: '🚌' },
    EN_COLEGIO: { text: 'En Colegio', bg: '#DBEAFE', color: '#1E40AF', icon: '🏫' },
    EN_CASA: { text: 'En Casa', bg: '#FEF3C7', color: '#92400E', icon: '🏠' },
    SIN_RUTA: { text: 'Sin Ruta', bg: '#F1F5F9', color: '#64748B', icon: '❌' },
  };
  const { text, bg, color, icon } = config[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
      <Text style={styles.statusIcon}>{icon}</Text>
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
      <View style={[styles.notificationIcon, {
        backgroundColor:
          notification.type === 'error' ? '#FEE2E2' :
          notification.type === 'warning' ? '#FEF3C7' :
          notification.type === 'success' ? '#DCFCE7' : '#DBEAFE'
      }]}>
        <Text style={styles.notificationIconText}>{iconMap[notification.type]}</Text>
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
        {/* Header: Avatar clickeable -> Perfil */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>SafeRoute</Text>
            <Text style={styles.headerSubtitle}>Hola, {user?.name?.split(' ')[0] || 'Usuario'}</Text>
          </View>
          <Pressable onPress={() => navigation?.navigate('ProfileScreen')}>
            <Avatar uri={user?.photoUrl} name={user?.name || 'U'} />
          </Pressable>
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
            <Pressable onPress={() => navigation?.navigate('ChildForm', { mode: 'create' })}>
              <Text style={styles.sectionLink}>+ AGREGAR</Text>
            </Pressable>
          </View>

          <View style={styles.childrenGrid}>
            {students.length === 0 ? (
              <Pressable style={styles.emptyAddCard} onPress={() => navigation?.navigate('ChildForm', { mode: 'create' })}>
                <Text style={styles.emptyAddIcon}>+</Text>
                <Text style={styles.emptyAddText}>Agregar hijo</Text>
              </Pressable>
            ) : (
              students.map((student) => (
                <Pressable
                  key={student.id}
                  style={styles.childCard}
                  onPress={() => navigation?.navigate('ChildDetail', { studentId: student.id })}
                >
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
// Estilos - Diseño Mejorado
// ============================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 16,
  },
  // Header - más atractivo
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  // Avatar - con gradiente visual
  avatar: {
    borderWidth: 3,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarPlaceholder: {
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  // Banner - más vibrante
  banner: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  bannerContent: {
    position: 'relative',
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  bannerDesc: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
    lineHeight: 20,
  },
  bannerButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  // Section - más espacio
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  // Children Grid - mejor separación
  childrenGrid: {
    gap: 16,
  },
  childCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  childCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  childCardInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  childDetail: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  // Status Badge - más coloridos
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Notifications - más atractivo
  notificationsList: {
    gap: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 0,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  notificationIconText: {
    fontSize: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    textTransform: 'none',
  },
  // Empty - más atractivo
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    padding: 24,
  },
  emptyAddCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  emptyAddIcon: {
    fontSize: 36,
    color: '#10B981',
    marginBottom: 10,
  },
  emptyAddText: {
    fontSize: 15,
    color: '#10B981',
    fontWeight: '700',
  },
  // Error
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
  },
  // Bottom Nav - más atractivo
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 28,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  navIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  navText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  navTextActive: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '700',
  },
});