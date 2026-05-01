/**
 * SafeRoute App - Register Screen
 * Basado en: flujos/02-registro.md + flujos-design/02 registro/code.html
 */

import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, Pressable, 
  ActivityIndicator, Alert, ScrollView 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// API URL
const API_URL = 'http://192.168.1.6:8080/api/v1';

type Role = 'GUARDIAN' | 'DRIVER' | null;

// ============================================
// API - Registro
// ============================================
async function registerApi(name: string, email: string, password: string, role: string) {
  console.log('🔄 Intentando registro...');
  console.log('📧 Email:', email, 'Role:', role);
  
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // El backend espera "roles" como array
      body: JSON.stringify({ name, email, password, roles: [role] }),
    });

    console.log('📡 Response status:', response.status);
    
    const data = await response.json();
    console.log('📦 Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.log('❌ Error capturado:', error.message);
    if (error.message.includes('Network request failed')) {
      throw new Error('No se pudo conectar al servidor');
    }
    throw error;
  }
}

// ============================================
// Componentes UI
// ============================================

function Label({ children, required }: { children: string; required?: boolean }) {
  return (
    <Text style={styles.label}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#76777d"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
    />
  );
}

function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
}

// ============================================
// Selector de Rol
// ============================================
function RoleSelector({ 
  selected, 
  onSelect 
}: { 
  selected: Role; 
  onSelect: (role: 'GUARDIAN' | 'DRIVER') => void 
}) {
  return (
    <View style={styles.roleSection}>
      <Label required>Tipo de cuenta</Label>
      <View style={styles.roleContainer}>
        {/* Parent/Guardian */}
        <Pressable
          style={[styles.roleCard, selected === 'GUARDIAN' && styles.roleCardSelected]}
          onPress={() => onSelect('GUARDIAN')}
          accessibilityRole="radio"
          accessibilityState={{ selected: selected === 'GUARDIAN' }}
        >
          <Text style={styles.roleIcon}>👨‍👩‍👧</Text>
          <Text style={styles.roleTitle}>Tutor</Text>
          <Text style={styles.roleDesc}>Gestiona la seguridad de tu familia</Text>
          {selected === 'GUARDIAN' && <Text style={styles.checkIcon}>✓</Text>}
        </Pressable>

        {/* Driver */}
        <Pressable
          style={[styles.roleCard, selected === 'DRIVER' && styles.roleCardSelected]}
          onPress={() => onSelect('DRIVER')}
          accessibilityRole="radio"
          accessibilityState={{ selected: selected === 'DRIVER' }}
        >
          <Text style={styles.roleIcon}>🚛</Text>
          <Text style={styles.roleTitle}>Conductor</Text>
          <Text style={styles.roleDesc}>Miembro de flota enfocado en seguridad</Text>
          {selected === 'DRIVER' && <Text style={styles.checkIcon}>✓</Text>}
        </Pressable>
      </View>
    </View>
  );
}

// ============================================
// Pantalla Principal
// ============================================
// Props que recibe la pantalla
interface Props {
  navigation?: any;
}

export default function RegisterScreen({ navigation }: Props) {
  const [role, setRole] = useState<Role>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    if (!role) {
      setError('Selecciona un tipo de cuenta');
      return false;
    }
    if (!name.trim()) {
      setError('El nombre es requerido');
      return false;
    }
    if (!email.trim()) {
      setError('El correo electrónico es requerido');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingresa un correo válido');
      return false;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await registerApi(name.trim(), email.trim(), password, role!);
      
      Alert.alert(
        'Éxito',
        `Cuenta creada: ${response.user.name}`,
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      setError(err.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {/* Header */}
          <Text style={styles.title}>Únete a SafeRoute</Text>
          <Text style={styles.subtitle}>Viví tranquilidad en cada viaje familiar.</Text>

          {/* Error */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Role Selector */}
          <RoleSelector selected={role} onSelect={setRole} />

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.field}>
              <Label required>Nombre completo</Label>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Ingresa tu nombre legal"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.field}>
              <Label required>Correo electrónico</Label>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="correo@ejemplo.com"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.field}>
              <Label required>Contraseña</Label>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
              />
            </View>

            <View style={styles.field}>
              <Label required>Confirmar contraseña</Label>
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry
              />
            </View>
          </View>

{/* Terms */}
          <Pressable 
            style={styles.terms}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
              {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              Acepto los <Text style={styles.link}>Términos de Servicio</Text> y la <Text style={styles.link}>Política de Privacidad</Text>
            </Text>
          </Pressable>

          {/* Button */}
          <Button
            title="Crear Cuenta"
            onPress={handleRegister}
            loading={loading}
            disabled={!role || !name || !email || !password || !confirmPassword}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>
            ¿Ya tenés cuenta?{' '}
          </Text>
          <Text 
            style={styles.loginLink} 
            onPress={() => navigation?.navigate('Login')}
          >
            Iniciar Sesión
          </Text>
        </View>
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#131b2e',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#45464d',
    textAlign: 'center',
    marginBottom: 24,
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
    textAlign: 'center',
  },
  roleSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#76777d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  required: {
    color: '#ba1a1a',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleCard: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c6c6cd',
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  roleCardSelected: {
    borderColor: '#006a61',
    backgroundColor: 'rgba(0, 106, 97, 0.05)',
  },
  roleIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191c1e',
  },
  roleDesc: {
    fontSize: 12,
    color: '#45464d',
    marginTop: 4,
    textAlign: 'center',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: '#006a61',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 6,
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
  terms: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#c6c6cd',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#006a61',
    borderColor: '#006a61',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#45464d',
    lineHeight: 20,
  },
  link: {
    color: '#006a61',
    fontWeight: '500',
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#006a61',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#45464d',
  },
  loginLink: {
    color: '#006a61',
    fontWeight: '500',
  },
});