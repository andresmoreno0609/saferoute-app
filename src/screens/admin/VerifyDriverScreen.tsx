// Admin: Verify Driver Screen - SafeRoute
// Flujo 08 - Verificar conductor

import { View, Text, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Badge, Avatar, Button, Spinner } from '../../components';
import { driversApi } from '../../lib/api';
import type { DriverProfile } from '../../types';

export default function AdminVerifyDriverScreen() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<DriverProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const data = await driversApi.list({ isVerified: false });
      setDrivers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDrivers();
    setRefreshing(false);
  };

  const handleVerify = async (id: string, approved: boolean) => {
    Alert.alert(
      approved ? 'Aprobar conductor' : 'Rechazar conductor',
      approved ? '¿Aprobar este conductor?' : '¿Rechazar este conductor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: approved ? 'Aprobar' : 'Rechazar',
          onPress: async () => {
            try {
              await driversApi.verify(id, approved);
              setDrivers((prev) => prev.filter((d) => d.id !== id));
            } catch (err) {
              Alert.alert('Error', 'No se pudo actualizar');
            }
          },
        },
      ]
    );
  };

  const renderDriver = ({ item }: { item: DriverProfile }) => (
    <Card style={styles.driverCard}>
      <Avatar name={item.licenseNumber} size="lg" />
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>Conductor #{item.licenseNumber}</Text>
        <Text style={styles.driverInfo}>Licencia: {item.licenseNumber}</Text>
        <Text style={styles.driverInfo}>Teléfono: {item.phone}</Text>
        <Badge text={item.isVerified ? 'Verificado' : 'Pendiente'} variant={item.isVerified ? 'success' : 'warning'} />
      </View>
      <View style={styles.actions}>
        <Button title="Aprobar" onPress={() => handleVerify(item.id, true)} />
        <Button title="Rechazar" variant="outline" onPress={() => handleVerify(item.id, false)} />
      </View>
    </Card>
  );

  if (loading) return <Spinner />;

  return (
    <View style={styles.container}>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id}
        renderItem={renderDriver}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyText}>No hay conductores pendientes</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  list: { padding: 16, gap: 16 },
  driverCard: { gap: 12 },
  driverInfo: { flex: 1, gap: 4 },
  driverName: { fontSize: 18, fontWeight: '600', color: '#111827' },
  driverInfo: { fontSize: 14, color: '#6b7280' },
  actions: { flexDirection: 'row', gap: 8 },
  empty: { alignItems: 'center', gap: 12, padding: 32 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 16, color: '#6b7280' },
});
