// Guardian: Child Detail Screen - SafeRoute
// Flujo 17 - Ver detalle del hijo

import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Alert, ActivityIndicator, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.8:8080/api/v1';

export default function ChildDetailScreen({ navigation, route }: { navigation?: any; route?: any }) {
  const studentId = route?.params?.studentId;
  const guardianIdParam = route?.params?.guardianId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [student, setStudent] = useState<any>(null);
  const [guardianId, setGuardianId] = useState<string | null>(guardianIdParam || null);

  useEffect(() => {
    loadData();
  }, [studentId]);

  // Recargar cuando la pantalla vuelve a tener foco (ej: después de editar)
  useFocusEffect(
    useCallback(() => {
      if (studentId) {
        loadData();
      }
    }, [studentId])
  );

  const loadData = async () => {
    setLoading(true);

    // Determinar guardianId: de params o del perfil
    let gId = guardianIdParam;

    if (!gId) {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        // Get user
        const userRes = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        const userId = userData.user?.id || userData.id;

        // Get guardian profile
        const guardianRes = await fetch(`${API_URL}/guardians/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const guardianData = await guardianRes.json();

        gId = guardianData.id;
        setGuardianId(gId);
      } catch (err) {
        console.error('Error obteniendo guardian:', err);
        setError('No se pudo cargar la información');
        setLoading(false);
        return;
      }
    }

    // Cargar estudiante
    try {
      const token = await AsyncStorage.getItem('accessToken');

      // Primero obtener la relación
      const relRes = await fetch(`${API_URL}/guardians/${gId}/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!relRes.ok) {
        throw new Error('No se encontró la relación');
      }

      const relation = await relRes.json();

      // Luego obtener los datos del estudiante directamente
      const studentRes = await fetch(`${API_URL}/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!studentRes.ok) {
        throw new Error('No se encontró el estudiante');
      }

      const studentData = await studentRes.json();

      // Combinar datos
      setStudent({
        ...studentData,
        relationship: relation.relationship,
        notifyEvents: relation.notifyEvents,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    const gId = guardianIdParam || guardianId;
    navigation?.navigate('ChildForm', {
      mode: 'edit',
      studentId,
      guardianId: gId
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
    const gId = guardianIdParam || guardianId;
    if (!studentId || !gId) return;

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/guardians/${gId}/students/${studentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Error eliminando:', errData);
        throw new Error('No se pudo eliminar');
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
          <Pressable style={styles.retryButton} onPress={loadData}>
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
          {student?.photoUrl ? (
            <Image source={{ uri: student.photoUrl }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {student?.name?.charAt(0) || '?'}
              </Text>
            </View>
          )}
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
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
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