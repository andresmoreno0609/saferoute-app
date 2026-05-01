// Guardian: Complete Profile Screen - SafeRoute
// Flujo 02c - Completar perfil guardian

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Button, Input, Spinner } from '../../components';
import { guardianApi } from '../../lib/api';

export default function GuardianCompleteProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleSave = async () => {
    if (!phone || !emergencyContact) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await guardianApi.updateProfile({
        phone,
        emergencyContact,
      });
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Completa tu perfil</Text>
      <Text style={styles.subtitle}>
        Agrega información de contacto de emergencia
      </Text>

      <View style={styles.form}>
        <Input
          label="Teléfono"
          placeholder="3001234567"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Input
          label="Contacto de emergencia"
          placeholder="Nombre y teléfono"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          helper="Persona de contacto en caso de emergencia"
        />

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
  error: {
    color: '#ef4444',
    fontSize: 14,
  },
});
