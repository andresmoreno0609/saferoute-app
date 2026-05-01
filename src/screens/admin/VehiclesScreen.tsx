// Admin: Vehicles Screen - SafeRoute
// Flujo 07 - Lista vehiculos

import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native-stack';
import { Card, Badge, Button, Spinner } from '../../components';
import { vehiclesApi } from '../../lib/api';
import type { Vehicle } from '../../types';

export default function AdminVehiclesScreen() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVehicles();
    setRefreshing(false);
  };

  const renderVehicle = ({ item }: { item: Vehicle }) => (
    <Card
      style={styles.vehicleCard}
      onPress={() => router.push(`/admin/vehicle/${item.id}`)}
    >
      <View style={styles.vehicleHeader}>
        <Text style={styles.vehiclePlate}>{item.plate}</Text>
        <Badge text={`${item.capacidad} cups`} variant="primary" />
      </View>
      <Text style={styles.vehicleInfo}>
        {item.brand} {item.model} ({item.year})
      </Text>
      <Text style={styles.vehicleDocs}>
        {item.documents.length} documentos
      </Text>
    </Card>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="+ Nuevo vehículo" onPress={() => router.push('/admin/vehicle/new')} />
      </View>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={renderVehicle}
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
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 16 },
  list: { padding: 16 },
  vehicleCard: { gap: 4 },
  vehicleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehiclePlate: { fontSize: 18, fontWeight: '700', color: '#111827' },
  vehicleInfo: { fontSize: 14, color: '#6b7280' },
  vehicleDocs: { fontSize: 12, color: '#9ca3af' },
  separator: { height: 12 },
});
