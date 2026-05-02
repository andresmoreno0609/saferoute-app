// Guardian: Child Form Screen - SafeRoute
// Flujo 17 - Crear/Editar hijo

import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.6:8080/api/v1';

const RELATIONSHIP_OPTIONS = [
  { value: 'PADRE', label: 'Padre' },
  { value: 'MADRE', label: 'Madre' },
  { value: 'HERMANO', label: 'Hermano/a' },
  { value: 'TIO', label: 'Tío/a' },
  { value: 'ABUELO', label: 'Abuelo/a' },
  { value: 'OTRO', label: 'Otro' },
];

export default function ChildFormScreen({ navigation, route }: { navigation?: any; route?: any }) {
  const mode = route?.params?.mode || 'create';
  const studentId = route?.params?.studentId;
  const guardianId = route?.params?.guardianId;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [grade, setGrade] = useState('');
  const [address, setAddress] = useState('');
  const [homeLatitude, setHomeLatitude] = useState('');
  const [homeLongitude, setHomeLongitude] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolLatitude, setSchoolLatitude] = useState('');
  const [schoolLongitude, setSchoolLongitude] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [relationship, setRelationship] = useState('PADRE');
  const [isEmergencyContact, setIsEmergencyContact] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(true);

  useEffect(() => {
    if (mode === 'edit' && studentId) {
      loadStudent();
    }
  }, [mode, studentId]);

  const loadStudent = async () => {
    if (!studentId || !guardianId) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/guardians/${guardianId}/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Error al cargar');
      }

      const data = await res.json();
      
      // Fill form (data structure depends on API response)
      setName(data.name || '');
      setGrade(data.grade || '');
      setAddress(data.address || '');
      setSchoolName(data.schoolName || '');
      setEmergencyContact(data.emergencyContact || '');
      setEmergencyPhone(data.emergencyPhone || '');
      setMedicalInfo(data.medicalInfo || '');
      setRelationship(data.relationship || 'PADRE');
      setIsEmergencyContact(data.isEmergencyContact ?? true);
      setNotifyEvents(data.notifyEvents ?? true);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    if (!name.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    if (!address.trim()) {
      setError('La dirección es obligatoria');
      return false;
    }
    if (!grade.trim()) {
      setError('El grado es obligatorio');
      return false;
    }
    if (!emergencyContact.trim()) {
      setError('El contacto de emergencia es obligatorio');
      return false;
    }
    if (!emergencyPhone.trim()) {
      setError('El teléfono de emergencia es obligatorio');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    setError('');

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Sesión expirada');
      }

      // Get guardian ID if not provided
      let gId = guardianId;
      if (!gId) {
        const userRes = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        
        const guardianRes = await fetch(`${API_URL}/guardians/user/${userData.user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const guardianData = await guardianRes.json();
        gId = guardianData.id;
      }

      const body = {
        name: name.trim(),
        address: address.trim(),
        homeLatitude: homeLatitude ? parseFloat(homeLatitude) : 0,
        homeLongitude: homeLongitude ? parseFloat(homeLongitude) : 0,
        schoolName: schoolName.trim() || null,
        schoolLatitude: schoolLatitude ? parseFloat(schoolLatitude) : null,
        schoolLongitude: schoolLongitude ? parseFloat(schoolLongitude) : null,
        grade: grade.trim() || null,
        birthDate: birthDate || null,
        emergencyContact: emergencyContact.trim(),
        emergencyPhone: emergencyPhone.trim(),
        medicalInfo: medicalInfo.trim() || null,
        relationship,
        isEmergencyContact,
        notifyEvents,
      };

      const endpoint = mode === 'edit' && studentId
        ? `${API_URL}/guardians/${gId}/students/${studentId}`
        : `${API_URL}/guardians/${gId}/students`;

      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Error al guardar');
      }

      Alert.alert('Éxito', mode === 'edit' ? 'Hijo actualizado' : 'Hijo agregado', [
        { text: 'OK', onPress: () => navigation?.goBack() }
      ]);

    } catch (err: any) {
      setError(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#006b5f" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>
            {mode === 'edit' ? 'Editar Hijo' : 'Nuevo Hijo'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Error */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Section: Datos Personales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DATOS PERSONALES</Text>
            
            <View style={styles.field}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nombre del hijo/a"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TextInput
                style={styles.input}
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Grado / Curso *</Text>
              <TextInput
                style={styles.input}
                value={grade}
                onChangeText={setGrade}
                placeholder="Ej. 5to Primaria"
              />
            </View>
          </View>

          {/* Section: Dirección de Casa */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DIRECCIÓN DE CASA</Text>
            
            <View style={styles.field}>
              <Text style={styles.label}>Dirección *</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Calle, número, ciudad"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Latitud</Text>
                <TextInput
                  style={styles.input}
                  value={homeLatitude}
                  onChangeText={setHomeLatitude}
                  placeholder="4.7110"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Longitud</Text>
                <TextInput
                  style={styles.input}
                  value={homeLongitude}
                  onChangeText={setHomeLongitude}
                  placeholder="-74.0721"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Section: Colegio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INFORMACIÓN DEL COLEGIO</Text>
            
            <View style={styles.field}>
              <Text style={styles.label}>Nombre del colegio</Text>
              <TextInput
                style={styles.input}
                value={schoolName}
                onChangeText={setSchoolName}
                placeholder="Colegio San José"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Latitud</Text>
                <TextInput
                  style={styles.input}
                  value={schoolLatitude}
                  onChangeText={setSchoolLatitude}
                  placeholder="4.7200"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Longitud</Text>
                <TextInput
                  style={styles.input}
                  value={schoolLongitude}
                  onChangeText={setSchoolLongitude}
                  placeholder="-74.0800"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Section: Contacto de Emergencia */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONTACTO DE EMERGENCIA</Text>
            
            <View style={styles.field}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={styles.input}
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                placeholder="Nombre del contacto"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Teléfono *</Text>
              <TextInput
                style={styles.input}
                value={emergencyPhone}
                onChangeText={setEmergencyPhone}
                placeholder="+57 300 123 4567"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Información médica</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={medicalInfo}
                onChangeText={setMedicalInfo}
                placeholder="Alergias, condiciones, etc."
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Section: Relación */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RELACIÓN CON EL ESTUDIANTE</Text>
            
            <View style={styles.field}>
              <Text style={styles.label}>Parentesco *</Text>
              <View style={styles.relationshipGrid}>
                {RELATIONSHIP_OPTIONS.map((option) => (
                  <Pressable
                    key={option.value}
                    style={[
                      styles.relationshipChip,
                      relationship === option.value && styles.relationshipChipActive,
                    ]}
                    onPress={() => setRelationship(option.value)}
                  >
                    <Text
                      style={[
                        styles.relationshipChipText,
                        relationship === option.value && styles.relationshipChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.checkboxRow}>
              <Pressable
                style={styles.checkbox}
                onPress={() => setIsEmergencyContact(!isEmergencyContact)}
              >
                <View style={[styles.checkboxInner, isEmergencyContact && styles.checkboxChecked]}>
                  {isEmergencyContact && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Es contacto de emergencia</Text>
              </Pressable>
            </View>

            <View style={styles.checkboxRow}>
              <Pressable
                style={styles.checkbox}
                onPress={() => setNotifyEvents(!notifyEvents)}
              >
                <View style={[styles.checkboxInner, notifyEvents && styles.checkboxChecked]}>
                  {notifyEvents && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Notificar eventos</Text>
              </Pressable>
            </View>
          </View>

          {/* Save Button */}
          <Pressable
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>Guardar</Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e8ea',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#191c1e',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191c1e',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#45464d',
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#45464d',
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#c6c6cd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f2f4f6',
    color: '#191c1e',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  relationshipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relationshipChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f2f4f6',
    borderWidth: 1,
    borderColor: '#e6e8ea',
  },
  relationshipChipActive: {
    backgroundColor: '#006b5f',
    borderColor: '#006b5f',
  },
  relationshipChipText: {
    fontSize: 14,
    color: '#45464d',
  },
  relationshipChipTextActive: {
    color: '#ffffff',
  },
  checkboxRow: {
    marginTop: 12,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#c6c6cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#006b5f',
    borderColor: '#006b5f',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#191c1e',
  },
  saveButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#006b5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});