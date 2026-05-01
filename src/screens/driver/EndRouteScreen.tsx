// Driver: End Route Screen - SafeRoute
// Flujo 14 - Finalizar ruta

import { View, Text, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Card, Spinner } from '../../components';
import { routesApi } from '../../lib/api';
import type { Route } from '../../types';

export default function DriverEndRouteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [ending, setEnding] = useState(false);

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

  const handleEndRoute = async () => {
    Alert.alert(
      'Finalizar ruta',
      '¿Estás seguro de que deseas finalizar esta ruta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          onPress: async () => {
            setEnding(true);
            try {
              await routesApi.end(id);
              router.replace('/driver');
            } catch (err) {
              Alert.alert('Error', 'No se pudo finalizar la ruta');
            } finally {
              setEnding(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <Spinner />;
  }

  const studentsPickedUp = route?.stops.reduce(
    (acc, stop) => acc + stop.studentIds.length,
    0
  ) || 0;

  return (
    <View style={styles.container}>
      <Card style={styles.summaryCard}>
        <Text style={styles.title}>Resumen de ruta</Text>
        
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Ruta</Text>
          <Text style={styles.statValue}>{route?.name}</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Paradas</Text>
          <Text style={styles.statValue}>{route?.stops.length}</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Estudiantes abordados</Text>
          <Text style={styles.statValue}>{studentsPickedUp}</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Duración</Text>
          <Text style={styles.statValue}>
            {/* Calculate duration */}
            ~45 min
          </Text>
        </View>
      </Card>

      {/* Warning */}
      <Card style={styles.warningCard}>
        <Text style={styles.warningIcon}>⚠️</Text>
        <Text style={styles.warningText}>
          Al finalizar la ruta, ya no podrás hacer registros adicionales
        </Text>
      </Card>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          title="Finalizar ruta"
          onPress={handleEndRoute}
          loading={ending}
        />
        <Button
          title="Cancelar"
          variant="outline"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  summaryCard: {
    gap: 16,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    backgroundColor: '#fef3c7',
  },
  warningIcon: {
    fontSize: 24,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
});
