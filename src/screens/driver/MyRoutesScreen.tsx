// Driver: My Routes Screen - SafeRoute
// Flujo 15 - Historial de rutas

import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Badge, Spinner, EmptyState } from '../../components';
import { routesApi } from '../../lib/api';
import type { Route } from '../../types';

export default function DriverMyRoutesScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const data = await routesApi.myRoutes();
      setRoutes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRoutes();
    setRefreshing(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const renderRoute = ({ item }: { item: Route }) => (
    <Card
      style={styles.routeCard}
      onPress={() => router.push(`/driver/route/${item.id}`)}
    >
      <View style={styles.routeHeader}>
        <Text style={styles.routeName}>{item.name}</Text>
        <Badge
          text={
            item.status === 'COMPLETED'
              ? 'Completada'
              : item.status === 'IN_PROGRESS'
              ? 'En curso'
              : 'Pendiente'
          }
          variant={
            item.status === 'COMPLETED'
              ? 'success'
              : item.status === 'IN_PROGRESS'
              ? 'warning'
              : 'primary'
          }
        />
      </View>
      <Text style={styles.routeDate}>
        {new Date(item.startTime).toLocaleDateString('es-CO', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })}
      </Text>
      <Text style={styles.routeTime}>
        {new Date(item.startTime).toLocaleTimeString('es-CO', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={renderRoute}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="📍"
            title="No hay rutas"
            description="Aún no has completado ninguna ruta"
            action={{
              title: "Ver rutas disponibles",
              onPress: () => router.push('/driver/routes'),
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
  routeCard: {
    gap: 4,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  routeDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  routeTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
