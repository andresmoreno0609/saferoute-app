// Admin: Users Screen - SafeRoute
// Flujo 05 - Lista usuarios

import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Badge, Avatar, Button, Spinner, Input } from '../../components';
import { usersApi } from '../../lib/api';
import type { User } from '../../types';

export default function AdminUsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, [search]);

  const loadUsers = async () => {
    try {
      const data = await usersApi.list({ search: search || undefined });
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const renderUser = ({ item }: { item: User }) => (
    <Card
      style={styles.userCard}
      onPress={() => router.push(`/admin/user/${item.id}`)}
    >
      <Avatar name={item.name} size="md" />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.roles}>
        {item.roles.map((role) => (
          <Badge key={role} text={role} variant="primary" />
        ))}
      </View>
    </Card>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input
          placeholder="Buscar usuarios..."
          value={search}
          onChangeText={setSearch}
        />
        <Button
          title="+ Agregar"
          onPress={() => router.push('/admin/user/new')}
        />
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
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
    gap: 12,
  },
  list: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  roles: {
    flexDirection: 'row',
    gap: 4,
  },
  separator: {
    height: 12,
  },
});
