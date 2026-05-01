// Guardian: Children Screen - SafeRoute
// Flujo 17 - Ver hijos/estudiantes

import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Avatar, Badge, Button, Spinner, EmptyState } from '../../components';
import { studentsApi } from '../../lib/api';
import type { Student } from '../../types';

export default function GuardianChildrenScreen() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await studentsApi.list();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStudents();
    setRefreshing(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const renderStudent = ({ item }: { item: Student }) => (
    <Card
      style={styles.studentCard}
      onPress={() => router.push(`/guardian/child/${item.id}`)}
    >
      <Avatar name={item.name} size="lg" />
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentGrade}>{item.grade}</Text>
        {item.routeId && (
          <Badge text="En ruta" variant="success" />
        )}
      </View>
      <Button
        title="Ver estado"
        variant="ghost"
        onPress={() => router.push(`/guardian/route/${item.routeId}`)}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudent}
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
              onPress: () => router.push('/guardian/add-child'),
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
    color: '#111827',
  },
  studentGrade: {
    fontSize: 14,
    color: '#6b7280',
  },
});
