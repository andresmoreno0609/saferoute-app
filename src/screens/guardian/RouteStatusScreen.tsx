// Guardian: Route Status Screen - SafeRoute
// Flujo 18 - Estado de ruta (tracking)

import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Badge, Spinner, Button } from '../../components';
import { routesApi, studentsApi } from '../../lib/api';
import type { Route, Student } from '../../types';

const { width } = Dimensions.get('window');

export default function GuardianRouteStatusScreen() {
  const router = useRouter();
  const { studentId } = useLocalSearchParams<{ studentId: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [studentId]);

  const loadData = async () => {
    try {
      const studentData = await studentsApi.get(studentId);
      setStudent(studentData);
      
      if (studentData.routeId) {
        const routeData = await routesApi.get(studentData.routeId);
        setRoute(routeData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.map}>
        <Text style={styles.mapPlaceholder}>🗺️ Seguimiento en vivo</Text>
      </View>

      {/* Student Info */}
      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Text style={styles.studentName}>{student?.name}</Text>
          <Badge
            text={route?.status === 'IN_PROGRESS' ? 'En ruta' : 'En espera'}
            variant={route?.status === 'IN_PROGRESS' ? 'success' : 'warning'}
          />
        </View>
        <Text style={styles.studentGrade}>{student?.grade}</Text>
      </Card>

      {/* Route Timeline */}
      {route && (
        <Card style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Recorrido</Text>
          <View style={styles.timeline}>
            {route.stops.map((stop, index) => (
              <View key={stop.id} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineOrder}>Parada {index + 1}</Text>
                  <Text style={styles.timelineAddress}>{stop.address}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      )}

      {/* No Route */}
      {!route && (
        <Card style={styles.noRouteCard}>
          <Text style={styles.noRouteIcon}>⏳</Text>
          <Text style={styles.noRouteText}>
            {student?.name} no tiene una ruta asignada actualmente
          </Text>
          <Button
            title="Contactar a administración"
            variant="outline"
            onPress={() => {}}
          />
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  map: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    fontSize: 24,
    color: '#6b7280',
  },
  infoCard: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    gap: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  studentGrade: {
    fontSize: 14,
    color: '#6b7280',
  },
  timelineCard: {
    padding: 16,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  timeline: {
    gap: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563eb',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineOrder: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  timelineAddress: {
    fontSize: 14,
    color: '#111827',
  },
  noRouteCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    gap: 12,
  },
  noRouteIcon: {
    fontSize: 48,
  },
  noRouteText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
