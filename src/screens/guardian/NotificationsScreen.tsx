// Guardian: Notifications Screen - SafeRoute
// Flujo 19

import { View, Text, StyleSheet, FlatList, RefreshControl, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Badge, Spinner } from '../../components';
import { notificationsApi } from '../../lib/api';
import type { Notification } from '../../types';

export default function GuardianNotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await notificationsApi.list();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleMarkRead = async (id: string) => {
    try {
      await notificationsApi.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      style={[styles.notifItem, !item.read && styles.notifItemUnread]}
      onPress={() => {
        if (!item.read) handleMarkRead(item.id);
        if (item.routeId) router.push(`/guardian/route/${item.routeId}`);
      }}
    >
      <View style={styles.notifHeader}>
        <Text style={styles.notifTitle}>{item.title}</Text>
        {!item.read && <Badge text="Nuevo" variant="primary" />}
      </View>
      <Text style={styles.notifBody}>{item.body}</Text>
      <Text style={styles.notifTime}>
        {new Date(item.createdAt).toLocaleString('es-CO', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </Pressable>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No hay notificaciones</Text>
          </View>
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
  },
  notifItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  notifItemUnread: {
    backgroundColor: '#eff6ff',
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  notifBody: {
    fontSize: 14,
    color: '#4b5563',
  },
  notifTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  separator: {
    height: 12,
  },
  empty: {
    alignItems: 'center',
    gap: 12,
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
});
