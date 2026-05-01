// Admin: Vehicle Form Screen - SafeRoute
// Flujo 07 - Formulario vehiculo

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Input, Card } from '../../components';
import { vehiclesApi } from '../../lib/api';
import type { Vehicle } from '../../types';

export default function AdminVehicleFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditing = !!id;

  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    try {
      const data = await vehiclesApi.get(id);
      setPlate(data.plate);
      setBrand(data.brand);
      setModel(data.model);
      setYear(String(data.year));
      setCapacity(String(data.capacity));
    } catch (err) { console.error(err); }
    finally { setFetching(false); }
  };

  const handleSubmit = async () => {
    if (!plate || !brand || !model || !year || !capacity) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      if (isEditing) {
        await vehiclesApi.update(id, { plate, brand, model, year: Number(year), capacity: Number(capacity) });
      } else {
        await vehiclesApi.create({ plate, brand, model, year: Number(year), capacity: Number(capacity) });
      }
      router.back();
    } catch (err) { Alert.alert('Error', 'No se pudo guardar'); }
    finally { setLoading(false); }
  };

  if (fetching) return <View style={styles.loading} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.form}>
        <Input label="Placa" placeholder="ABC-123" value={plate} onChangeText={setPlate} autoCapitalize="characters" />
        <Input label="Marca" placeholder="Toyota" value={brand} onChangeText={setBrand} />
        <Input label="Modelo" placeholder="Hiace" value={model} onChangeText={setModel} />
        <Input label="Año" placeholder="2024" value={year} onChangeText={setYear} keyboardType="numeric" />
        <Input label="Capacidad" placeholder="15" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />
      </Card>
      <View style={styles.actions}>
        <Button title={isEditing ? 'Guardar' : 'Crear'} onPress={handleSubmit} loading={loading} />
        <Button title="Cancelar" variant="outline" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16 },
  loading: { flex: 1, backgroundColor: '#f9fafb' },
  form: { gap: 16 },
  actions: { marginTop: 16, gap: 12 },
});
