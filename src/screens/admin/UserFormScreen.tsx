// Admin: User Form Screen - SafeRoute
// Flujo 05 - Formulario usuario

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Input, Card } from '../../components';
import { usersApi } from '../../lib/api';
import type { User } from '../../types';

export default function AdminUserFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditing = !!id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      const data = await usersApi.get(id);
      setName(data.name);
      setEmail(data.email);
      setRoles(data.roles);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleSubmit = async () => {
    if (!name || !email || roles.length === 0) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await usersApi.update(id, { name, email, roles });
      } else {
        if (!password) {
          Alert.alert('Error', 'La contraseña es requerida');
          setLoading(false);
          return;
        }
        await usersApi.create({ name, email, password, roles });
      }
      router.back();
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <View style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.form}>
        <Input
          label="Nombre"
          placeholder="Nombre completo"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isEditing && (
          <Input
            label="Contraseña"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        )}

        <View style={styles.roleSelector}>
          <Text style={styles.label}>Roles</Text>
          <View style={styles.roleButtons}>
            {['ADMIN', 'DRIVER', 'GUARDIAN'].map((role) => (
              <Button
                key={role}
                title={role}
                variant={roles.includes(role) ? 'primary' : 'outline'}
                onPress={() => toggleRole(role)}
              />
            ))}
          </View>
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          title={isEditing ? 'Guardar cambios' : 'Crear usuario'}
          onPress={handleSubmit}
          loading={loading}
          disabled={!name || !email || roles.length === 0}
        />
        <Button
          title="Cancelar"
          variant="outline"
          onPress={() => router.back()}
        />
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
    padding: 16,
  },
  loading: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  roleSelector: {
    gap: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actions: {
    marginTop: 16,
    gap: 12,
  },
});
