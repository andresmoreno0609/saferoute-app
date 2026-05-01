// Driver: Dashboard Screen - SafeRoute
// Flujo 09

import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Button, Badge, Spinner, Avatar } from '../../components';
import { driverApi, routesApi } from '../../lib/api';
import type { DriverProfile, Route } from '../../types';

export default function DriverDashboardScreen() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileData, routesData] = await Promise.all([
        driverApi.getProfile(),
        routesApi.myRoutes(),
      ]);
      setProfile(profileData);
      setRoutes(routesData);
    } catch (err) {
      console.error(err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (!profile) {
    return <Spinner />;
  }

  // Show complete profile prompt if not verified
  if (!profile.isVerified) {
    return (
      <View style={styles.container}>
        <Card style={styles.prompt}>
          <Text style={styles.promptIcon}>⚠️</Text>
          <Text style={styles.promptTitle}>Completa tu cuenta</Text>
          <Text style={styles.promptDesc}>
            Para comenzar a trabajar necesitas cargar tus documentos
          </Text>
          <Button
            title="Completar cuenta"
            onPress={() => router.push('/driver/complete-profile')}
          />
        </Card>
      </View>
    );
  }

  // Active route check
  const activeRoute = routes.find((r) => r.status === 'IN_PROGRESS');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, conductor</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('es-CO', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        <Avatar name={profile.phone || 'Driver'} size="md" />
      </View>

      {/* Status */}
      <Card style={styles.statusCard}>
        <Badge
          text={profile.isVerified ? 'Verificado' : 'Pendiente'}
          variant={profile.isVerified ? 'success' : 'warning'}
        />
        <Text style={styles.statusText}>
          {profile.isVerified
            ? 'Estás listo para trabajar'
            : 'Tu cuenta está en revisión'}
        </Text>
      </Card>

      {/* Active Route or Start */}
      {activeRoute ? (
        <Card style={styles.routeCard}>
          <Text style={styles.routeLabel}>Ruta en curso</Text>
          <Text style={styles.routeName}>{activeRoute.name}</Text>
          <Button
            title="Continuar ruta"
            onPress={() => router.push(`/driver/track/${activeRoute.id}`)}
          />
        </Card>
      ) : (
        <Card style={styles.startCard}>
          <Text style={styles.startTitle}>¿Listo para trabajar?</Text>
          <Text style={styles.startDesc}>
            Inicia una ruta para comenzar el recorrido
          </Text>
          <Button
            title="Iniciar ruta"
            onPress={() => router.push('/driver/routes')}
          />
        </Card>
      )}

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Acciones</Text>
      <View style={styles.actions}>
        <Button
          title="📍 Mis rutas"
          variant="outline"
          onPress={() => router.push('/driver/my-routes')}
        />
        <Button
          title="🔍 Escanear"
          variant="outline"
          onPress={() => router.push('/driver/scan')}
        />
        <Button
          title="⚠️ Reportar"
          variant="outline"
          onPress={() => router.push('/driver/event')}
        />
      </View>

      {/* Recent Routes */}
      <Text style={styles.sectionTitle}>Rutas recientes</Text>
      {routes.slice(0, 3).map((route) => (
        <Card
          key={route.id}
          style={styles.routeItem}
          onPress={() => router.push(`/driver/route/${route.id}`)}
        >
          <View style={styles.routeHeader}>
            <Text style={styles.routeItemName}>{route.name}</Text>
            <Badge
              text={route.status === 'COMPLETED' ? 'Completada' : 'Pendiente'}
              variant={route.status === 'COMPLETED' ? 'success' : 'warning'}
            />
          </View>
          <Text style={styles.routeItemTime}>
            {new Date(route.startTime).toLocaleTimeString('es-CO', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </Card>
      ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#4b5563',
  },
  routeCard: {
    gap: 12,
  },
  routeLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  startCard: {
    alignItems: 'center',
    gap: 12,
  },
  startTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  startDesc: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  routeItem: {
    gap: 4,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  routeItemTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  prompt: {
    alignItems: 'center',
    gap: 16,
    margin: 16,
  },
  promptIcon: {
    fontSize: 48,
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  promptDesc: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
