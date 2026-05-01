// Admin: Routes Screen - SafeRoute
// Flujo 06 - Lista rutas

import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Badge, Button, Spinner, Input } from '../../components';
import { routesApi } from '../../lib/api';
import type { Route } from '../../types';

export default function AdminRoutesScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const data = await routesApi.list();
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      default:
        return 'primary';
    }
  };

  const renderRoute = ({ item }: { item: Route }) => (
    <Card
      style={styles.routeCard}
      onPress={() => router.push(`/admin/route/${item.id}`)}
    >
      <View style={styles.routeHeader}>
        <Text style={styles.routeName}>{item.name}</Text>
        <Badge text={item.status} variant={getStatusVariant(item.status) as 'primary' | 'success' | 'warning' | 'error'} />
      </View>
      <Text style={styles.routeInfo}>
        {item.stops.length} paradas • 
        {new Date(item.startTime).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Card>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="+ Nueva ruta" onPress={() => router.push('/admin/route/new')} />
      </View>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={renderRoute}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
  },
  list: {
    padding: 16,
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
  routeInfo: {
    fontSize: 14,
    color: '#6b7280',
  },
  separator: {
    height: 12,
  },
});
