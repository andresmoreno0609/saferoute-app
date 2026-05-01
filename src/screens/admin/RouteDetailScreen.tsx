// Admin: Route Detail Screen - SafeRoute
// Flujo 06 - Detalle ruta

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Button, Badge, Spinner } from '../../components';
import { routesApi } from '../../lib/api';
import type { Route } from '../../types';

export default function AdminRouteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoute();
  }, [id]);

  const loadRoute = async () => {
    try {
      const data = await routesApi.get(id);
      setRoute(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.headerCard}>
        <Text style={styles.name}>{route?.name}</Text>
        <Badge
          text={route?.status || ''}
          variant={route?.status === 'COMPLETED' ? 'success' : route?.status === 'IN_PROGRESS' ? 'warning' : 'primary'}
        />
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Información</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Inicio</Text>
          <Text style={styles.infoValue}>
            {new Date(route?.startTime || '').toLocaleString('es-CO')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fin</Text>
          <Text style={styles.infoValue}>
            {new Date(route?.endTime || '').toLocaleString('es-CO')}
          </Text>
        </View>
      </Card>

      <Card style={styles.stopsCard}>
        <Text style={styles.sectionTitle}>Paradas ({route?.stops.length})</Text>
        {route?.stops.map((stop, index) => (
          <View key={stop.id} style={styles.stopItem}>
            <Badge text={`#${index + 1}`} variant="primary" />
            <Text style={styles.stopAddress}>{stop.address}</Text>
            <Text style={styles.stopStudents}>{stop.studentIds.length} estudiantes</Text>
          </View>
        ))}
      </Card>

      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => router.push(`/admin/route/${id}/edit`)}
        />
        <Button
          title="Eliminar"
          variant="outline"
          onPress={() => {}}
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
  headerCard: {
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
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
  stopsCard: {
    gap: 12,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stopAddress: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  stopStudents: {
    fontSize: 14,
    color: '#6b7280',
  },
  actions: {
    gap: 12,
  },
});
