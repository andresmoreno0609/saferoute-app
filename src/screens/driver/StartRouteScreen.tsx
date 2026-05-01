// Driver: Start Route Screen - SafeRoute
// Flujo 10

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Button, Card, Spinner } from '../../components';
import { routesApi } from '../../lib/api';
import type { Route } from '../../types';

export default function DriverStartRouteScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const data = await routesApi.list({ status: 'PENDING' });
      setRoutes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartRoute = async (routeId: string) => {
    setStarting(true);
    try {
      await routesApi.start(routeId);
      router.replace(`/driver/track/${routeId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Seleccionar ruta</Text>
      <Text style={styles.subtitle}>Elige una ruta para iniciar</Text>

      {routes.length === 0 ? (
        <Card style={styles.empty}>
          <Text style={styles.emptyIcon}>📍</Text>
          <Text style={styles.emptyTitle}>No hay rutas disponibles</Text>
          <Text style={styles.emptyDesc}>
            No hay rutas pendientes en este momento
          </Text>
        </Card>
      ) : (
        <View style={styles.routeList}>
          {routes.map((route) => (
            <Card key={route.id} style={styles.routeCard}>
              <Text style={styles.routeName}>{route.name}</Text>
              <Text style={styles.routeInfo}>
                {route.stops.length} paradas •{' '}
                {new Date(route.startTime).toLocaleTimeString('es-CO', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Button
                title="Iniciar ruta"
                onPress={() => handleStartRoute(route.id)}
                loading={starting}
              />
            </Card>
          ))}
        </View>
      )}
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  routeList: {
    gap: 16,
  },
  routeCard: {
    gap: 8,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  routeInfo: {
    fontSize: 14,
    color: '#6b7280',
  },
  empty: {
    alignItems: 'center',
    gap: 12,
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  emptyDesc: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
