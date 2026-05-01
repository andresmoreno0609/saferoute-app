// Shared: Profile Screen - SafeRoute
// Flujo 20 - Perfil usuario (todas las vistas)

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Button, Avatar, Input, Spinner } from '../../components';
import { authApi, clearTokens } from '../../lib/api';
import type { User } from '../../types';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await authApi.me();
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            setLoggingOut(true);
            try {
              await authApi.logout();
              await clearTokens();
              router.replace('/login');
            } catch (err) {
              // Still clear tokens and redirect
              await clearTokens();
              router.replace('/login');
            } finally {
              setLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <Spinner />;
  }

  const role = user?.roles[0] || 'GUARDIAN';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <Avatar name={user?.name || ''} size="lg" />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roles}>
          {user?.roles.map((r) => (
            <View key={r} style={styles.roleBadge}>
              <Text style={styles.roleText}>{r}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Profile Sections by Role */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Información de perfil</Text>
        
        {role === 'DRIVER' && (
          <Button
            title="Completar datos del conductor"
            variant="outline"
            onPress={() => router.push('/driver/complete-profile')}
          />
        )}
        
        {role === 'GUARDIAN' && (
          <Button
            title="Completar datos de contacto"
            variant="outline"
            onPress={() => router.push('/guardian/complete-profile')}
          />
        )}

        <Button
          title="Cambiar contraseña"
          variant="ghost"
          onPress={() => router.push('/change-password')}
        />
      </Card>

      {/* App Info */}
      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Acerca de la app</Text>
        <Text style={styles.infoText}>SafeRoute v1.0.0</Text>
        <Text style={styles.infoText}>Sistema de rutas escolares</Text>
      </Card>

      {/* Logout */}
      <Button
        title="Cerrar sesión"
        variant="outline"
        onPress={handleLogout}
        loading={loggingOut}
      />
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
  profileCard: {
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  roles: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  roleBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  sectionCard: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoCard: {
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
  },
});
