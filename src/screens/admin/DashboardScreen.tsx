// Admin: Dashboard Screen - SafeRoute
// Flujo 04

import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Spinner } from '../../components';
import { dashboardApi } from '../../lib/api';
import type { DashboardStats } from '../../types';

const { width } = Dimensions.get('window');

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await dashboardApi.stats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  if (loading) {
    return <Spinner />;
  }

  // Grid of stat cards for web layout
  const cardWidth = (width - 48 - 16) / 2;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        {new Date().toLocaleDateString('es-CO', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </Text>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={[styles.statCard, { width: cardWidth }]}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statValue}>{stats?.totalUsers || 0}</Text>
          <Text style={styles.statLabel}>Usuarios totales</Text>
        </Card>

        <Card style={[styles.statCard, { width: cardWidth }]} onPress={() => router.push('/admin/routes')}>
          <Text style={styles.statIcon}>📍</Text>
          <Text style={styles.statValue}>{stats?.activeRoutes || 0}</Text>
          <Text style={styles.statLabel}>Rutas activas</Text>
        </Card>

        <Card style={[styles.statCard, { width: cardWidth }]} onPress={() => router.push('/admin/verify-driver')}>
          <Text style={styles.statIcon}>🚛</Text>
          <Text style={styles.statValue}>{stats?.pendingDrivers || 0}</Text>
          <Text style={styles.statLabel}>Conductores pendientes</Text>
        </Card>

        <Card style={[styles.statCard, { width: cardWidth }]} onPress={() => router.push('/admin/vehicles')}>
          <Text style={styles.statIcon}>📄</Text>
          <Text style={styles.statValue}>{stats?.expiringDocuments || 0}</Text>
          <Text style={styles.statLabel}>Documentos por vencer</Text>
        </Card>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Acceso rápido</Text>
      <View style={styles.quickActions}>
        <Card style={styles.actionCard} onPress={() => router.push('/admin/users')}>
          <Text style={styles.actionIcon}>👥</Text>
          <Text style={styles.actionLabel}>Usuarios</Text>
        </Card>
        <Card style={styles.actionCard} onPress={() => router.push('/admin/routes')}>
          <Text style={styles.actionIcon}>📍</Text>
          <Text style={styles.actionLabel}>Rutas</Text>
        </Card>
        <Card style={styles.actionCard} onPress={() => router.push('/admin/vehicles')}>
          <Text style={styles.actionIcon}>🚐</Text>
          <Text style={styles.actionLabel}>Vehículos</Text>
        </Card>
        <Card style={styles.actionCard} onPress={() => router.push('/admin/verify-driver')}>
          <Text style={styles.actionIcon}>✓</Text>
          <Text style={styles.actionLabel}>Verificar</Text>
        </Card>
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
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  statIcon: {
    fontSize: 32,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
});
