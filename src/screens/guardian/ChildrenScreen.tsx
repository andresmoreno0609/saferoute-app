// Guardian: Children Screen - SafeRoute
// Flujo 17 - Gestionar hijos/estudiantes

import { View, Text, StyleSheet, FlatList, RefreshControl, Pressable, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Avatar, Badge, Button, Spinner, EmptyState } from '../../components';
import { studentsApi, authApi } from '../../lib/api';
import type { Student } from '../../types';

const API_URL = 'http://192.168.1.8:8080/api/v1';

export default function GuardianChildrenScreen({ navigation }: { navigation?: any }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [guardianId, setGuardianId] = useState<string | null>(null);

  useEffect(() => {
    initAndLoad();
  }, []);

  // Recargar al volver a la pantalla (cuando se crea un hijo)
  useFocusEffect(
    useCallback(() => {
      if (guardianId) {
        loadStudents(guardianId);
      }
    }, [guardianId])
  );

  const initAndLoad = async () => {
    try {
      // Get user and guardian info first
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        setError('Sesión expirada');
        return;
      }

      const userRes = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!userRes.ok) {
        throw new Error('Ocurrió un error');
      }
      
      const userData = await userRes.json();
      const userId = userData.user.id;
      
      // Get guardian by userId
      const guardianRes = await fetch(`${API_URL}/guardians/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!guardianRes.ok) {
        throw new Error('Ocurrió un error');
      }
      
      const guardianData = await guardianRes.json();
      setGuardianId(guardianData.id);
      
      // Load children
      await loadStudents(guardianData.id, token);
    } catch (err: any) {
      console.error('Error cargando hijos:', err);
      setError('Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async (gId?: string, token?: string) => {
    try {
      const gId2 = gId || guardianId;
      if (!gId2) return;

      const token2 = token || await AsyncStorage.getItem('accessToken');
      if (!token2) return;

      const res = await fetch(`${API_URL}/guardians/${gId2}/students`, {
        headers: { Authorization: `Bearer ${token2}` },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error('Ocurrió un error');
      }

      const data = await res.json();
      // Map response to Student format
      const mappedStudents = (data || []).map((item: any) => ({
        id: item.studentId,
        name: item.studentName,
        grade: item.grade,
        status: item.status || 'SIN_RUTA',
        routeId: item.routeId,
        routeName: item.routeName,
      }));
      setStudents(mappedStudents);
      setError('');
    } catch (err: any) {
      setError('Ocurrió un error al cargar');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStudents();
    setRefreshing(false);
  };

  const handleAddChild = () => {
    if (navigation) {
      navigation.navigate('ChildForm', { mode: 'create' });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Mis Hijos</Text>
        <Pressable onPress={handleAddChild} style={styles.addButton}>
          <Text style={styles.addIcon}>+</Text>
        </Pressable>
      </View>

      {/* Error */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Reintentar" variant="secondary" onPress={initAndLoad} />
        </View>
      ) : null}

      {/* List */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.studentId || item.id}
        renderItem={({ item }) => (
          <Card
            style={styles.studentCard}
            onPress={() => navigation?.navigate('ChildDetail', { studentId: item.studentId || item.id })}
          >
            <Avatar name={item.name} size="lg" />
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentGrade}>{item.grade}</Text>
              {item.status === 'EN_RUTA' && (
                <Badge text="En Ruta" variant="primary" />
              )}
              {item.status === 'EN_COLEGIO' && (
                <Badge text="En Colegio" variant="success" />
              )}
              {item.status === 'EN_CASA' && (
                <Badge text="En Casa" variant="default" />
              )}
            </View>
            <Button
              title="Ver"
              variant="ghost"
              onPress={() => navigation?.navigate('ChildDetail', { studentId: item.studentId || item.id })}
            />
          </Card>
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="👤"
            title="No hay hijos registrados"
            description="Agrega a tus hijos para seguirlos"
            action={{
              title: "Agregar hijo",
              onPress: handleAddChild,
            }}
          />
        }
      />
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
    fontSize: 20,
    fontWeight: '600',
    color: '#191c1e',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#006b5f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '300',
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 12,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  studentInfo: {
    flex: 1,
    gap: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191c1e',
  },
  studentGrade: {
    fontSize: 14,
    color: '#45464d',
  },
});