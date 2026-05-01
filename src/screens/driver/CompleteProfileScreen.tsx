// Driver: Complete Profile Screen - SafeRoute
// Flujo 02b - Completar perfil conductor

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Button, Input, Spinner } from '../../components';
import { driverApi, vehiclesApi } from '../../lib/api';
import type { DriverProfile, Vehicle } from '../../types';

export default function DriverCompleteProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await vehiclesApi.list();
      setVehicles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async () => {
    if (!licenseNumber || !licenseExpiry || !phone || !vehicleId) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await driverApi.updateProfile({
        licenseNumber,
        licenseExpiry,
        phone,
        vehicleId,
      });
      router.replace('/driver');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Completa tu cuenta</Text>
      <Text style={styles.subtitle}>
        Para comenzar a trabajar necesitas cargar tus documentos
      </Text>

      <View style={styles.form}>
        <Input
          label="Número de licencia"
          placeholder="12345678"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          autoCapitalize="characters"
        />

        <Input
          label="Fecha de vencimiento (YYYY-MM-DD)"
          placeholder="2025-12-31"
          value={licenseExpiry}
          onChangeText={setLicenseExpiry}
        />

        <Input
          label="Teléfono"
          placeholder="3001234567"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <View style={styles.vehicleSelector}>
          <Text style={styles.label}>Vehículo</Text>
          {vehicles.map((v) => (
            <Button
              key={v.id}
              title={`${v.brand} ${v.model} (${v.plate})`}
              variant={vehicleId === v.id ? 'primary' : 'outline'}
              onPress={() => setVehicleId(v.id)}
            />
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button title="Guardar" onPress={handleSave} loading={loading} />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
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
  vehicleSelector: {
    gap: 8,
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
  },
});
