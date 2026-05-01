// Driver: Tracking Screen - SafeRoute
// Flujo 11 - GPS Tracking

import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Card, Badge } from '../../components';
import { routesApi, driverApi } from '../../lib/api';
import type { Route, RouteEvent } from '../../types';

const { width } = Dimensions.get('window');

export default function DriverTrackingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const [events, setEvents] = useState<RouteEvent[]>([]);
  const mapRef = useRef<View>(null);

  useEffect(() => {
    loadRoute();
    // Start GPS tracking interval
    const interval = setInterval(() => {
      // Update location every 30s
    }, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const loadRoute = async () => {
    try {
      const data = await routesApi.get(id);
      setRoute(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEndRoute = async () => {
    try {
      await routesApi.end(id);
      router.replace('/driver/my-routes');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Map Container */}
      <View style={styles.map} ref={mapRef}>
        <Text style={styles.mapPlaceholder}>🗺️ Mapa en vivo</Text>
        {/* Map SDK would go here */}
      </View>

      {/* Route Info Overlay */}
      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Text style={styles.routeName}>{route?.name || 'Cargando...'}</Text>
          <Badge text="En curso" variant="success" />
        </View>
        
        <Text style={styles.infoStats}>
          {route?.stops.length || 0} paradas • 
          {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </Text>

        {/* Quick Actions */}
        <View style={styles.actions}>
          <Button
            title="📱 Escanear"
            onPress={() => router.push(`/driver/scan/${id}`)}
          />
          <Button
            title="⚠️ Reportar"
            variant="outline"
            onPress={() => router.push(`/driver/event/${id}`)}
          />
          <Button
            title="✅ Finalizar"
            variant="secondary"
            onPress={handleEndRoute}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  map: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    fontSize: 24,
    color: '#6b7280',
  },
  infoCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    gap: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  infoStats: {
    fontSize: 14,
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});
