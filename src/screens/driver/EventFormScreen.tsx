// Driver: Event Form Screen - SafeRoute
// Flujo 13 - Registrar evento/incidente

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Input, Card } from '../../components';
import { eventsApi, studentsApi } from '../../lib/api';
import type { EventType, Student } from '../../types';

const EVENT_TYPES: { type: EventType; label: string; icon: string }[] = [
  { type: 'ASISTENCIA', label: 'Asistencia', icon: '✅' },
  { type: 'INCIDENTE', label: 'Incidente', icon: '⚠️' },
  { type: 'EMERGENCIA', label: 'Emergencia', icon: '🚨' },
  { type: 'OTRO', label: 'Otro', icon: '📝' },
];

export default function DriverEventFormScreen() {
  const router = useRouter();
  const { routeId } = useLocalSearchParams<{ routeId: string }>();
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [description, setDescription] = useState('');
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  // Load students for the route
  // In a real app, filter by route students

  const handleSubmit = async () => {
    if (!eventType || !description) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await eventsApi.create({
        routeId: routeId || '',
        type: eventType,
        description,
        studentId: studentId || null,
      });
      Alert.alert('Éxito', 'Evento registrado correctamente');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar el evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Reportar evento</Text>
      <Text style={styles.subtitle}>Selecciona el tipo de evento</Text>

      {/* Event Type Selector */}
      <View style={styles.typeGrid}>
        {EVENT_TYPES.map((item) => (
          <Card
            key={item.type}
            style={[
              styles.typeCard,
              eventType === item.type && styles.typeCardSelected,
            ]}
            onPress={() => setEventType(item.type)}
          >
            <Text style={styles.typeIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.typeLabel,
                eventType === item.type && styles.typeLabelSelected,
              ]}
            >
              {item.label}
            </Text>
          </Card>
        ))}
      </View>

      {/* Description */}
      <Input
        label="Descripción"
        placeholder="Describe lo que ocurrió..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.textArea}
      />

      {/* Student Selector (Optional) */}
      <View style={styles.studentSelector}>
        <Text style={styles.label}>Estudiante (opcional)</Text>
        <Input
          placeholder="Selecciona estudiante"
          value={studentId}
          onChangeText={setStudentId}
        />
      </View>

      <Button
        title="Reportar evento"
        onPress={handleSubmit}
        loading={loading}
        disabled={!eventType || !description}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  typeCardSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  typeIcon: {
    fontSize: 32,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  typeLabelSelected: {
    color: '#2563eb',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  studentSelector: {
    gap: 8,
  },
});
