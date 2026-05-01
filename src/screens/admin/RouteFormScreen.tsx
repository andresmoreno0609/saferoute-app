// Admin: Route Form Screen - SafeRoute
// Flujo 06 - Formulario ruta

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Input, Card } from '../../components';
import { routesApi } from '../../lib/api';
import type { Route } from '../../types';

export default function AdminRouteFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditing = !!id;

  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      loadRoute();
    }
  }, [id]);

  const loadRoute = async () => {
    try {
      const data = await routesApi.get(id);
      setName(data.name);
      setStartTime(data.startTime);
      setEndTime(data.endTime);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !startTime || !endTime) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await routesApi.update(id, { name, startTime, endTime });
      } else {
        await routesApi.create({
          name,
          startTime,
          endTime,
          status: 'PENDING',
          driverId: null,
          vehicleId: null,
          stops: [],
        });
      }
      router.back();
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar la ruta');
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
          label="Nombre de la ruta"
          placeholder="Ruta 001"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Hora de inicio (ISO)"
          placeholder="2024-01-01T07:00:00Z"
          value={startTime}
          onChangeText={setStartTime}
        />
        <Input
          label="Hora de fin (ISO)"
          placeholder="2024-01-01T08:00:00Z"
          value={endTime}
          onChangeText={setEndTime}
        />
      </Card>

      <View style={styles.actions}>
        <Button
          title={isEditing ? 'Guardar cambios' : 'Crear ruta'}
          onPress={handleSubmit}
          loading={loading}
        />
        <Button title="Cancelar" variant="outline" onPress={() => router.back()} />
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
  actions: {
    marginTop: 16,
    gap: 12,
  },
});
