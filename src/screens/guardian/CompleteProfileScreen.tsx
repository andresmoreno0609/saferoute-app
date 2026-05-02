/**
 * SafeRoute App - Complete Guardian Profile Screen
 * Flujo 02C - Completar Perfil Guardian
 * Basado en: flujos/02c-completar-perfil-guardian.md + flujos-design/02c-completar-perfil-guardian.md/code.html
 */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  Pressable, ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.6:8080/api/v1';

let authToken: string | null = null;

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...options.headers,
  };
  return fetch(url, { ...options, headers });
}

// ============================================
// Pantalla Principal
// ============================================
export default function GuardianCompleteProfileScreen({ navigation }: { navigation?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Section 1: Información Personal
  const [documentNumber, setDocumentNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  
  // Section 2: Información Laboral
  const [occupation, setOccupation] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  
  // Section 3: Contacto de Emergencia
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  const handleSave = async () => {
    // Validation - all required
    if (!documentNumber || !birthDate || !address || !occupation || 
        !workPhone || !emergencyContactName || !emergencyContactPhone) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get token first
      authToken = await AsyncStorage.getItem('accessToken');
      
      // Get guardian ID to update
      const userRes = await fetchWithAuth(`${API_URL}/auth/me`);
      const userData = await userRes.json();
      const userId = userData.user.id;
      
      // Get current guardian profile
      const guardianRes = await fetchWithAuth(`${API_URL}/guardians/user/${userId}`);
      let guardianId = null;
      
      if (guardianRes.ok) {
        const guardianData = await guardianRes.json();
        guardianId = guardianData.id;
      }
      
      // Save profile data
      const profileData = {
        documentNumber,
        birthDate,
        address,
        occupation,
        workPhone,
        emergencyContact: emergencyContactName,
        emergencyPhone: emergencyContactPhone,
        userId,
      };
      
      let saveRes;
      if (guardianId) {
        saveRes = await fetchWithAuth(`${API_URL}/guardians/${guardianId}`, {
          method: 'PATCH',
          body: JSON.stringify(profileData),
        });
      } else {
        saveRes = await fetchWithAuth(`${API_URL}/guardians`, {
          method: 'POST',
          body: JSON.stringify(profileData),
        });
      }
      
      if (!saveRes.ok) {
        throw new Error('Error guardando perfil');
      }
      
      const savedProfile = await saveRes.json();
      
      // Update infoValidate to true
      await fetchWithAuth(`${API_URL}/guardians/${savedProfile.id}/info-validate`, {
        method: 'PUT',
        body: JSON.stringify({ infoValidate: true }),
      });
      
      Alert.alert('Éxito', 'Perfil guardado correctamente', [
        { text: 'OK', onPress: () => navigation?.goBack() }
      ]);
      
    } catch (err: any) {
      setError(err.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Completar Perfil</Text>
        </View>

        {/* Error */}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Section 1: Información Personal */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionIcon}>👤</Text>
            <Text style={styles.sectionTitleText}>Información Personal</Text>
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>DOCUMENTO DE IDENTIDAD</Text>
            <TextInput
              style={styles.input}
              value={documentNumber}
              onChangeText={setDocumentNumber}
              placeholder="Ej. 1.234.567-8"
            />
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>FECHA DE NACIMIENTO</Text>
            <TextInput
              style={styles.input}
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>DIRECCIÓN DE RESIDENCIA</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Ej. Av. Siempre Viva 742"
            />
          </View>
        </View>

        {/* Section 2: Información Laboral */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionIcon}>💼</Text>
            <Text style={styles.sectionTitleText}>Información Laboral</Text>
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>OCUPACIÓN</Text>
            <TextInput
              style={styles.input}
              value={occupation}
              onChangeText={setOccupation}
              placeholder="Ej. Ingeniero de Software"
            />
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>TELÉFONO DE TRABAJO</Text>
            <TextInput
              style={styles.input}
              value={workPhone}
              onChangeText={setWorkPhone}
              placeholder="Ej. +56 9 1234 5678"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Section 3: Contacto de Emergencia */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionIcon}>🚨</Text>
            <Text style={styles.sectionTitleText}>Contacto de Emergencia</Text>
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>NOMBRE DEL CONTACTO</Text>
            <TextInput
              style={styles.input}
              value={emergencyContactName}
              onChangeText={setEmergencyContactName}
              placeholder="Ej. María García"
            />
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>TELÉFONO DE EMERGENCIA</Text>
            <TextInput
              style={styles.input}
              value={emergencyContactPhone}
              onChangeText={setEmergencyContactPhone}
              placeholder="Ej. +56 9 8765 4321"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Banner visual */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Tu seguridad es nuestra prioridad</Text>
          <Text style={styles.bannerText}>
            Toda tu información está cifrada y protegida.
          </Text>
        </View>

        {/* Save Button */}
        <Pressable
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>💾 Guardar Perfil</Text>
          )}
        </Pressable>

        <Text style={styles.helperText}>
          Podrás editar esta información más tarde desde Ajustes.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================
// Estilos
// ============================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: '#191c1e',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191c1e',
  },
  errorContainer: {
    backgroundColor: '#ffdad6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#ba1a1a',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191c1e',
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
    backgroundColor: '#f7f9fb',
    color: '#191c1e',
  },
  banner: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 14,
    color: '#c6c6cd',
  },
  saveButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#006a61',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 14,
    color: '#45464d',
    textAlign: 'center',
  },
});