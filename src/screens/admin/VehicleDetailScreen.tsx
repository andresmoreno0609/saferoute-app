// Admin: Vehicle Detail Screen - SafeRoute
// Flujo 07 - Detalle vehiculo

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Button, Badge, Spinner } from '../../components';
import { vehiclesApi } from '../../lib/api';
import type { Vehicle } from '../../types';

export default function AdminVehicleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    try {
      const data = await vehiclesApi.get(id);
      setVehicle(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <Spinner />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.headerCard}>
        <Text style={styles.plate}>{vehicle?.plate}</Text>
        <Text style={styles.info}>
          {vehicle?.brand} {vehicle?.model} ({vehicle?.year})
        </Text>
      </Card>
      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Detalles</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Capacidad</Text>
          <Text style={styles.infoValue}>{vehicle?.capacity} pasajeros</Text>
        </View>
      </Card>
      <Card style={styles.docsCard}>
        <Text style={styles.sectionTitle}>Documentos ({vehicle?.documents.length})</Text>
        {vehicle?.documents.map((doc) => (
          <View key={doc.id} style={styles.docItem}>
            <Text style={styles.docType}>{doc.type}</Text>
            <Text style={styles.docExpiry}>
              Vence: {new Date(doc.expiryDate).toLocaleDateString('es-CO')}
            </Text>
          </View>
        ))}
      </Card>
      <View style={styles.actions}>
        <Button title="Editar" onPress={() => router.push(`/admin/vehicle/${id}/edit`)} />
        <Button title="Eliminar" variant="outline" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 16, gap: 16 },
  headerCard: { alignItems: 'center', gap: 8, padding: 24 },
  plate: { fontSize: 28, fontWeight: '700', color: '#111827' },
  info: { fontSize: 16, color: '#6b7280' },
  infoCard: { gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { fontSize: 14, color: '#6b7280' },
  infoValue: { fontSize: 14, color: '#111827' },
  docsCard: { gap: 12 },
  docItem: { flexDirection: 'row', justifyContent: 'space-between' },
  docType: { fontSize: 14, color: '#111827' },
  docExpiry: { fontSize: 14, color: '#6b7280' },
  actions: { gap: 12 },
});
