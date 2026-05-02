// Guardian: Child Detail Screen - SafeRoute
// Flujo 17 - Ver detalle del hijo

import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.6:8080/api/v1';

export default function ChildDetailScreen({ navigation, route }: { navigation?: any; route?: any }) {
  const studentId = route?.params?.studentId;
  const guardianId = route?.params?.guardianId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    if (studentId && guardianId) {
      loadStudent();
    }
  }, [studentId, guardianId]);

  const loadStudent = async () => {
    if (!studentId || !guardianId) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/guardians/${guardianId}/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Error al cargar');
      }

      const data = await res.json();
      setStudent(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation?.navigate('ChildForm', { 
      mode: 'edit', 
      studentId, 
      guardianId 
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar hijo',
      '¿Estás seguro de que deseas eliminar este hijo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteStudent(),
        },
      ]
    );
  };

  const deleteStudent = async () => {
    if (!studentId || !guardianId) return;

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/guardians/${guardianId}/students/${studentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Error eliminando:', errData);
        throw new Error(errData.message || 'Error al eliminar');
      }

      Alert.alert('Éxito', 'Hijo eliminado', [
        { text: 'OK', onPress: () => navigation?.goBack() }
      ]);
    } catch (err: any) {
      console.error('Error deleteStudent:', err);
      Alert.alert('Error', err.message);
    }
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'EN_RUTA':
        return { text: 'En Ruta', bg: '#d1fae5', color: '#006b5f' };
      case 'EN_COLEGIO':
        return { text: 'En Colegio', bg: '#dcfce7', color: '#16a34a' };
      case 'EN_CASA':
        return { text: 'En Casa', bg: '#f3f4f6', color: '#6b7280' };
      default:
        return { text: 'Sin Ruta', bg: '#f9fafb', color: '#9ca3af' };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#006b5f" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Detalle</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadStudent}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const statusBadge = getStatusBadge(student?.status);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Detalle</Text>
        <View style={styles.headerActions}>
          <Pressable onPress={handleEdit} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>✏️</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>🗑️</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Avatar & Name */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {student?.name?.charAt(0) || '?'}
            </Text>
          </View>
          <Text style={styles.name}>{student?.name || 'Sin nombre'}</Text>
          <Text style={styles.grade}>{student?.grade || ''}</Text>
          
          {statusBadge && (
            <View style={[styles.statusBadge, { backgroundColor: statusBadge.bg }]}>
              <Text style={[styles.statusBadgeText, { color: statusBadge.color }]}>
                {statusBadge.text}
              </Text>
            </View>
          )}
        </View>

        {/* Info Sections */}
        
        {/* Dirección */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DIRECCIÓN</Text>
          <Text style={styles.infoValue}>{student?.address || 'No registrada'}</Text>
          
          {student?.homeLatitude && student?.homeLongitude && (
            <Text style={styles.coords}>
              📍 {student.homeLatitude}, {student.homeLongitude}
            </Text>
          )}
        </View>

        {/* Colegio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COLEGIO</Text>
          <Text style={styles.infoValue}>{student?.schoolName || 'No registrado'}</Text>
          
          {student?.schoolLatitude && student?.schoolLongitude && (
            <Text style={styles.coords}>
              📍 {student.schoolLatitude}, {student.schoolLongitude}
            </Text>
          )}
        </View>

        {/* Contacto de Emergencia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACTO DE EMERGENCIA</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>{student?.emergencyContact || 'No registrado'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>{student?.emergencyPhone || 'No registrado'}</Text>
          </View>
          
          {student?.medicalInfo && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Info Médica</Text>
              <Text style={styles.infoValue}>{student.medicalInfo}</Text>
            </View>
          )}
        </View>

        {/* Relación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RELACIÓN</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parentesco</Text>
            <Text style={styles.infoValue}>{student?.relationship || 'No registrado'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Notificar eventos</Text>
            <Text style={styles.infoValue}>
              {student?.notifyEvents ? 'Sí' : 'No'}
            </Text>
          </View>
        </View>

        {/* Rutas Recientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RUTAS RECIENTES</Text>
          <Text style={styles.emptyText}>No hay rutas recientes</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e8ea',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#191c1e',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191c1e',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  errorContainer: {
    margin: 16,
    padding: 24,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    alignItems: 'center',
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#006b5f',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#006b5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191c1e',
    marginBottom: 4,
  },
  grade: {
    fontSize: 16,
    color: '#45464d',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#45464d',
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#191c1e',
  },
  coords: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    paddingVertical: 16,
  },
});