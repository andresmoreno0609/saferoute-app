// Driver: Scan NFC Screen - SafeRoute
// Flujo 12 - Escanear estudiante

import { View, Text, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Card, Input } from '../../components';
import { driverApi, studentsApi } from '../../lib/api';
import type { Student } from '../../types';

export default function DriverScanNFCScreen() {
  const router = useRouter();
  const { routeId } = useLocalSearchParams<{ routeId: string }>();
  const [scanning, setScanning] = useState(false);
  const [studentCode, setStudentCode] = useState('');
  const [lastStudent, setLastStudent] = useState<Student | null>(null);

  // Simulate NFC scan
  const handleSimulateScan = async () => {
    if (!studentCode) {
      Alert.alert('Error', 'Ingresa el código NFC del estudiante');
      return;
    }

    setScanning(true);
    try {
      // Find student by NFC code
      const students = await studentsApi.list();
      const student = students.find((s) => s.nfcCode === studentCode);

      if (!student) {
        Alert.alert('Error', 'Estudiante no encontrado');
        return;
      }

      // Register NFC event
      await driverApi.registerNFC(student.id, routeId);
      setLastStudent(student);
      setStudentCode('');
      Alert.alert('Éxito', `${student.name} registrado correctamente`);
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar el estudiante');
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.scanCard}>
        <Text style={styles.scanIcon}>📱</Text>
        <Text style={styles.scanTitle}>Escanear estudiante</Text>
        <Text style={styles.scanDesc}>
          Acerca el dispositivo NFC del estudiante o ingresa el código manualmente
        </Text>

        {/* Manual Entry */}
        <View style={styles.manualEntry}>
          <Input
            label="Código NFC"
            placeholder="Ingresa el código"
            value={studentCode}
            onChangeText={setStudentCode}
            autoCapitalize="characters"
          />
          <Button
            title="Registrar"
            onPress={handleSimulateScan}
            loading={scanning}
            disabled={!studentCode}
          />
        </View>
      </Card>

      {/* Last Scanned */}
      {lastStudent && (
        <Card style={styles.lastCard}>
          <Text style={styles.lastTitle}>Último escaneado</Text>
          <Text style={styles.lastName}>{lastStudent.name}</Text>
          <Text style={styles.lastGrade}>{lastStudent.grade}</Text>
        </Card>
      )}

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Instrucciones</Text>
        <Text style={styles.instructionsItem}>
          1. Solicita la tarjeta NFC del estudiante
        </Text>
        <Text style={styles.instructionsItem}>
          2. Acerca el dispositivo al tag NFC
        </Text>
        <Text style={styles.instructionsItem}>
          3. Confirma el nombre del estudiante
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  scanCard: {
    alignItems: 'center',
    gap: 16,
    padding: 24,
  },
  scanIcon: {
    fontSize: 64,
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  scanDesc: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  manualEntry: {
    width: '100%',
    gap: 12,
    marginTop: 16,
  },
  lastCard: {
    marginTop: 16,
    alignItems: 'center',
  },
  lastTitle: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  lastName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  lastGrade: {
    fontSize: 14,
    color: '#6b7280',
  },
  instructions: {
    marginTop: 24,
    gap: 8,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  instructionsItem: {
    fontSize: 14,
    color: '#6b7280',
  },
});
