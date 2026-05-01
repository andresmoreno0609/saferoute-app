// Admin: User Detail Screen - SafeRoute
// Flujo 05 - Detalle usuario

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Button, Badge, Avatar, Spinner } from '../../components';
import { usersApi } from '../../lib/api';
import type { User } from '../../types';

export default function AdminUserDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const data = await usersApi.get(id);
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Eliminar usuario',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await usersApi.delete(id);
              router.back();
            } catch (err) {
              Alert.alert('Error', 'No se pudo eliminar el usuario');
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.profileCard}>
        <Avatar name={user?.name || ''} size="lg" />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roles}>
          {user?.roles.map((role) => (
            <Badge key={role} text={role} variant="primary" />
          ))}
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Información</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Creado</Text>
          <Text style={styles.infoValue}>
            {new Date(user?.createdAt || '').toLocaleDateString('es-CO')}
          </Text>
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => router.push(`/admin/user/${id}/edit`)}
        />
        <Button
          title="Eliminar"
          variant="outline"
          onPress={handleDelete}
          loading={deleting}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  profileCard: {
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  roles: {
    flexDirection: 'row',
    gap: 8,
  },
  infoCard: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    color: '#111827',
  },
  actions: {
    gap: 12,
  },
});
