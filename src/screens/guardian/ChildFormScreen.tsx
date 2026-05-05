// Guardian: Child Form Screen - SafeRoute
// Flujo 17 - Crear/Editar hijo

import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://192.168.1.8:8080/api/v1';

// Mapping: frontend label -> backend enum value
const RELATIONSHIP_MAP: Record<string, string> = {
  'Padre': 'father',
  'Madre': 'mother',
  'Hermano/a': 'other',
  'Tío/a': 'other',
  'Abuelo/a': 'other',
  'Otro': 'other',
};

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
  const [guardianData, setGuardianData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [grade, setGrade] = useState('');
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [homeLatitude, setHomeLatitude] = useState(DEFAULT_HOME_LAT);
  const [homeLongitude, setHomeLongitude] = useState(DEFAULT_HOME_LON);
  const [schoolName, setSchoolName] = useState(DEFAULT_SCHOOL);
  const [schoolLatitude, setSchoolLatitude] = useState(DEFAULT_SCHOOL_LAT);
  const [schoolLongitude, setSchoolLongitude] = useState(DEFAULT_SCHOOL_LON);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [relationship, setRelationship] = useState('Padre');
  const [isEmergencyContact, setIsEmergencyContact] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(true);
  const [photoUrl, setPhotoUrl] = useState('');

  // Datos default para pruebas
  const DEFAULT_SCHOOL = 'LA INSTITUCIÓN EDUCATIVA DISTRITAL LA MAGDALENA';
  const DEFAULT_SCHOOL_LAT = '10.963';
  const DEFAULT_SCHOOL_LON = '-74.779';
  const DEFAULT_ADDRESS = 'CRA. 20 SUR #95-74';
  const DEFAULT_HOME_LAT = '6.247638';
  const DEFAULT_HOME_LON = '-75.565835';

  // Handlers con transformación automática
  const handleGradeChange = (text: string) => setGrade(text.toUpperCase());
  const handleAddressChange = (text: string) => setAddress(text.toUpperCase());
  const handleSchoolNameChange = (text: string) => setSchoolName(text.toUpperCase());

  // Función para seleccionar imagen de la galería
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Necesitas permiso para acceder a tus fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUrl(result.assets[0].uri);
    }
  };

  // Función para tomar foto con cámara
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Necesitas permiso para usar la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUrl(result.assets[0].uri);
    }
  };

  useEffect(() => {
    initForm();
  }, [mode, studentId]);

  const initForm = async () => {
    // Cargar datos del guardian para precargar
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Get user info
      const userRes = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      setCurrentUser(userData);
      
      // Get guardian profile
      const guardianRes = await fetch(`${API_URL}/guardians/user/${userData.user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (guardianRes.ok) {
        const gData = await guardianRes.json();
        setGuardianData(gData);
        
        // Pre-cargar contacto de emergencias con datos del guardian
        if (isEmergencyContact) {
          setEmergencyContact(userData.user.name || '');
          setEmergencyPhone(gData.phone || '');
        }
      }
    } catch (err) {
      console.error('Error cargando datos del guardian:', err);
    }

    // Cargar estudiante si es modo edición (no toca los defaults en modo crear)
    if (mode === 'edit' && studentId && guardianId) {
      await loadStudent();
    } else if (mode === 'create') {
      // En modo crear, asegurar que los defaults estén cargados
      setAddress(DEFAULT_ADDRESS);
      setHomeLatitude(DEFAULT_HOME_LAT);
      setHomeLongitude(DEFAULT_HOME_LON);
      setSchoolName(DEFAULT_SCHOOL);
      setSchoolLatitude(DEFAULT_SCHOOL_LAT);
      setSchoolLongitude(DEFAULT_SCHOOL_LON);
    }
  };

  // Manejar cambio del checkbox - precargar datos del guardian
  const handleEmergencyContactChange = async (value: boolean) => {
    setIsEmergencyContact(value);
    
    if (value && guardianData && currentUser) {
      // Pre-cargar con nombre y teléfono del guardian
      setEmergencyContact(currentUser.user.name || '');
      setEmergencyPhone(guardianData.phone || '');
    } else {
      // Limpiar campos si se deselecciona
      setEmergencyContact('');
      setEmergencyPhone('');
    }
  };

  // Geocodificar dirección (usando Nominatim - servicio gratuito)
  const geocodeAddress = async (addressText: string, type: 'home' | 'school') => {
    if (!addressText) return;
    
    try {
      const encodedAddress = encodeURIComponent(addressText);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
        { headers: { 'User-Agent': 'SafeRouteApp/1.0' } }
      );
      const data = await res.json();
      
      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        
        if (type === 'home') {
          setHomeLatitude(lat);
          setHomeLongitude(lon);
        } else {
          setSchoolLatitude(lat);
          setSchoolLongitude(lon);
        }
      }
    } catch (err) {
      console.error('Error geocodificando:', err);
      // No bloquea el proceso si falla
    }
  };

  const loadStudent = async () => {
    if (!studentId || !guardianId) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');

      // Obtener la relación
      const relRes = await fetch(`${API_URL}/guardians/${guardianId}/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!relRes.ok) {
        throw new Error('No se encontró la relación');
      }

      const relation = await relRes.json();

      // Obtener datos del estudiante
      const studentRes = await fetch(`${API_URL}/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!studentRes.ok) {
        throw new Error('No se encontró el estudiante');
      }

      const data = await studentRes.json();

      // Precargar campos
      setName(data.name || '');
      setBirthDate(data.birthDate || '');
      setGrade(data.grade || '');
      setAddress(data.address || '');
      setHomeLatitude(data.homeLatitude?.toString() || '');
      setHomeLongitude(data.homeLongitude?.toString() || '');
      setSchoolName(data.schoolName || '');
      setSchoolLatitude(data.schoolLatitude?.toString() || '');
      setSchoolLongitude(data.schoolLongitude?.toString() || '');
      setEmergencyContact(data.emergencyContact || '');
      setEmergencyPhone(data.emergencyPhone || '');
      setMedicalInfo(data.medicalInfo || '');
      setPhotoUrl(data.photoUrl || '');

      // Datos de la relación
      const relMap: Record<string, string> = {
        'father': 'Padre',
        'mother': 'Madre',
        'other': 'Otro',
      };
      setRelationship(relMap[relation.relationship] || 'Otro');
      setIsEmergencyContact(relation.isEmergencyContact ?? true);
      setNotifyEvents(relation.notifyEvents ?? true);

    } catch (err: any) {
      console.error('Error loadStudent:', err);
      setError('Ocurrió un error al cargar');
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    setError('');
    
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
        console.error('No token');
        throw new Error('Sesión expirada');
      }

      // Obtener guardian ID si no se proporcionó
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

      // Geocodificar dirección si no hay coordenadas
      if (address && !homeLatitude && !homeLongitude) {
        await geocodeAddress(address, 'home');
      }
      
      if (schoolName && !schoolLatitude && !schoolLongitude) {
        await geocodeAddress(schoolName, 'school');
      }

const body = {
        name: name.trim(),
        address: address.trim(),
        homeLatitude: parseFloat(homeLatitude) || 0,
        homeLongitude: parseFloat(homeLongitude) || 0,
        schoolName: schoolName.trim() || null,
        schoolLatitude: schoolLatitude ? parseFloat(schoolLatitude) : null,
        schoolLongitude: schoolLongitude ? parseFloat(schoolLongitude) : null,
        grade: grade.trim() || null,
        birthDate: birthDate || null,
        emergencyContact: emergencyContact.trim(),
        emergencyPhone: emergencyPhone.trim(),
        medicalInfo: medicalInfo.trim() || null,
        photoUrl: photoUrl || null,
        relationship: RELATIONSHIP_MAP[relationship] || relationship,
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
        console.error('Error guardando:', errData);
        
        // Error friendly para el usuario
        let userMessage = errData.message || 'Error al guardar';
        
        if (userMessage.includes('Relationship') || userMessage.includes('not one of the values')) {
          userMessage = 'El tipo de relación no es válido. Intentá de nuevo.';
        } else if (userMessage.includes('JSON parse')) {
          userMessage = 'Error de datos. Verificá los campos e intentá de nuevo.';
        }
        
        throw new Error(userMessage);
      }

      Alert.alert('Éxito', mode === 'edit' ? 'Hijo actualizado' : 'Hijo agregado', [
        { text: 'OK', onPress: () => navigation?.goBack() }
      ]);

    } catch (err: any) {
      console.error('Error handleSave:', err);
      setError('Ocurrió un error al guardar');
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

          {/* Section: Foto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FOTO</Text>

            <View style={styles.photoSection}>
              {photoUrl ? (
                <View style={styles.photoPreviewContainer}>
                  <Image source={{ uri: photoUrl }} style={styles.photoPreview} />
                  <Pressable style={styles.removePhotoButton} onPress={() => setPhotoUrl('')}>
                    <Text style={styles.removePhotoIcon}>✕</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderIcon}>📷</Text>
                </View>
              )}

              <View style={styles.photoButtons}>
                <Pressable style={styles.photoButton} onPress={pickImage}>
                  <Text style={styles.photoButtonText}>Galería</Text>
                </Pressable>
                <Pressable style={styles.photoButton} onPress={takePhoto}>
                  <Text style={styles.photoButtonText}>Cámara</Text>
                </Pressable>
              </View>
            </View>
          </View>

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
                onChangeText={handleGradeChange}
                placeholder="Ej. 5to Primaria"
              />
            </View>
          </View>

          {/* Section: Dirección de Casa */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DIRECCIÓN DE CASA</Text>
            <Text style={styles.helpText}>
              Ingresá la dirección y se obtendrá la ubicación automáticamente
            </Text>
            
            <View style={styles.field}>
              <Text style={styles.label}>Dirección *</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={handleAddressChange}
                placeholder="Calle, número, ciudad"
              />
            </View>

            {(homeLatitude && homeLongitude) ? (
              <Text style={styles.coordsText}>
                📍 Coordenadas obtenidas
              </Text>
            ) : null}
          </View>

          {/* Section: Colegio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INFORMACIÓN DEL COLEGIO</Text>
            <Text style={styles.helpText}>
              Ingresá el nombre del colegio y se obtendrá la ubicación
            </Text>
            
            <View style={styles.field}>
              <Text style={styles.label}>Nombre del colegio</Text>
              <TextInput
                style={styles.input}
                value={schoolName}
                onChangeText={handleSchoolNameChange}
                placeholder="Colegio San José"
              />
            </View>

            {(schoolLatitude && schoolLongitude) ? (
              <Text style={styles.coordsText}>
                📍 Coordenadas obtenidas
              </Text>
            ) : null}
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
                onPress={() => handleEmergencyContactChange(!isEmergencyContact)}
              >
                <View style={[styles.checkboxInner, isEmergencyContact && styles.checkboxChecked]}>
                  {isEmergencyContact && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Usar mis datos de contacto de emergencia</Text>
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
  helpText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  coordsText: {
    fontSize: 12,
    color: '#16a34a',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
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
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  relationshipChipActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  relationshipChipText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  relationshipChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
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
    height: 52,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  // Foto
  photoSection: {
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f2f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  photoPlaceholderIcon: {
    fontSize: 40,
  },
  photoPreviewContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoIcon: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  photoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f2f4f6',
    borderWidth: 1,
    borderColor: '#c6c6cd',
  },
  photoButtonText: {
    fontSize: 14,
    color: '#45464d',
    fontWeight: '500',
  },
});