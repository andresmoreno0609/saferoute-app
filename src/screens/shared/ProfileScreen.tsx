// Shared: Profile Screen - SafeRoute
// Diseño: flujos-design/20-perfil-usuario.md
// Estado: solo lectura (no editable)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../../types';

const API_URL = 'http://192.168.1.6:8080/api/v1';
const ACCESS_TOKEN_KEY = '@safeRouteAccessToken';
const REFRESH_TOKEN_KEY = '@safeRouteRefreshToken';

async function clearTokens() {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  } catch (e) {
    console.error('clearTokens error:', e);
  }
}

// Tipos
interface GuardianProfile {
  id: string;
  userId: string;
  phone?: string;
  documentNumber?: string;
  birthDate?: string;
  address?: string;
  occupation?: string;
  workPhone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  infoValidate?: boolean;
}

interface DriverProfile {
  id: string;
  userId: string;
  licenseNumber?: string;
  vehicleId?: string;
  isVerified?: boolean;
}

interface Props {
  navigation?: any;
}

// Rol legible
function getRoleLabel(role: string): string {
  const mapping: Record<string, string> = {
    GUARDIAN: 'Padre / Tutor',
    DRIVER: 'Conductor',
    ADMIN: 'Administrador',
  };
  return mapping[role] || role;
}

export default function ProfileScreen({ navigation }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [guardianProfile, setGuardianProfile] = useState<GuardianProfile | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        setLoading(false);
        return;
      }

      // Cargar datos del usuario
      const userRes = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);

        // Si es guardian, cargar perfil de guardian
        if (userData.roles?.includes('GUARDIAN')) {
          const guardianRes = await fetch(`${API_URL}/guardians/user/${userData.user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (guardianRes.ok) {
            const guardianData = await guardianRes.json();
            setGuardianProfile(guardianData);
          }
        }

        // Si es driver, cargar perfil de driver (endpoint puede no existir)
        // if (userData.roles?.includes('DRIVER')) {
        //   const driverRes = await fetch(`${API_URL}/drivers/user/${userData.user.id}`, {
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        //   if (driverRes.ok) {
        //     const driverData = await driverRes.json();
        //     setDriverProfile(driverData);
        //   }
        // }
      }
    } catch (err) {
      console.error('loadData error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, salir',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
              await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
            } catch (err) {
              console.error('Logout API error:', err);
            } finally {
              await clearTokens();
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }
            }
          },
        },
      ]
    );
  }

  function handleBack() {
    if (navigation) {
      navigation.goBack();
    }
  }

  // Loading
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const role = user?.roles?.[0] || 'GUARDIAN';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || '?'}
              </Text>
            </View>
            <Pressable style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>✎</Text>
            </Pressable>
          </View>
          <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{getRoleLabel(role)}</Text>
          </View>
        </View>

        {/* Datos Personales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos Personales</Text>
          
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Nombre Completo</Text>
            <Text style={styles.fieldValue}>{user?.name || '-'}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Correo Electrónico</Text>
            <Text style={[styles.fieldValue, styles.fieldReadonly]}>
              {user?.email || '-'}
            </Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Teléfono</Text>
            <Text style={styles.fieldValue}>
              {user?.phone || '-'}
            </Text>
          </View>
        </View>

        {/* Datos de Guardian */}
        {role === 'GUARDIAN' && guardianProfile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de Contacto</Text>
            
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Número de Documento</Text>
              <Text style={styles.fieldValue}>
                {guardianProfile.documentNumber || '-'}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Fecha de Nacimiento</Text>
              <Text style={styles.fieldValue}>
                {guardianProfile.birthDate || '-'}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Dirección</Text>
              <Text style={styles.fieldValue}>
                {guardianProfile.address || '-'}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Ocupación</Text>
              <Text style={styles.fieldValue}>
                {guardianProfile.occupation || '-'}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Teléfono del Trabajo</Text>
              <Text style={styles.fieldValue}>
                {guardianProfile.workPhone || '-'}
              </Text>
            </View>

            <View style={styles.sectionDivider} />

            <Text style={styles.subsectionTitle}>Contacto de Emergencia</Text>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Nombre</Text>
              <Text style={styles.fieldValue}>
                {guardianProfile.emergencyContactName || '-'}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Teléfono</Text>
              <Text style={styles.fieldValue}>
                {guardianProfile.emergencyContactPhone || '-'}
              </Text>
            </View>
          </View>
        )}

        {/* Datos de Driver */}
        {role === 'DRIVER' && driverProfile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información del Conductor</Text>
            
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Licencia de Conducción</Text>
              <Text style={styles.fieldValue}>
                {driverProfile.licenseNumber || '-'}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Estado</Text>
              <Text style={[
                styles.fieldValue,
                driverProfile.isVerified ? styles.statusVerified : styles.statusPending
              ]}>
                {driverProfile.isVerified ? 'Verificado' : 'Pendiente de verificación'}
              </Text>
            </View>
          </View>
        )}

        {/* Seguridad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
          
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔒</Text>
            <Text style={styles.actionText}>Cambiar Contraseña</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        {/* Cerrar Sesión */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </Pressable>

        {/* Version */}
        <Text style={styles.version}>SafeRoute v1.0.0</Text>
        <Text style={styles.versionSubtitle}>Sistema de rutas escolares</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#45464d',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191c1e',
  },
  headerRight: {
    width: 40,
  },
  // Avatar Section
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#006a61',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#89f5e7',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarIcon: {
    fontSize: 16,
    color: '#006a61',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191c1e',
    marginTop: 16,
  },
  roleBadge: {
    backgroundColor: '#e6f7f5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006a61',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#76777d',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e3e5',
  },
  // Fields
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#45464d',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#191c1e',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e3e5',
  },
  fieldReadonly: {
    backgroundColor: '#f2f4f6',
    color: '#76777d',
  },
  // Action Buttons
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e3e5',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#191c1e',
    flex: 1,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#c6c6cd',
  },
  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dc3545',
    marginTop: 24,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc3545',
  },
  // Version
  version: {
    fontSize: 12,
    color: '#76777d',
    textAlign: 'center',
    marginTop: 32,
  },
  versionSubtitle: {
    fontSize: 12,
    color: '#76777d',
    textAlign: 'center',
    marginTop: 4,
  },
  // Secciones adicionales
  sectionDivider: {
    height: 1,
    backgroundColor: '#e0e3e5',
    marginVertical: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#45464d',
    marginBottom: 12,
    marginTop: 4,
  },
  // Estados de driver
  statusVerified: {
    backgroundColor: '#e6f7f5',
    color: '#006a61',
  },
  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
});