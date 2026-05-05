/**
 * SafeRoute App - Login Screen v2
 * Basado en: flujos/01-login.md + flujos-design/01-login/code.html
 */

import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, Pressable, 
  ActivityIndicator, Alert, Linking 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// ============================================
// API - Función de Login
// ============================================
// API URL - cambia esta IP por la de tu computadora
// Para Android emulator usa: http://10.0.2.2:8080
// Para iOS simulator: http://localhost:8080
// Para device físico: http://192.168.x.x:8080
const API_URL = 'http://192.168.1.8:8080/api/v1';

async function loginApi(email: string, password: string) {
  console.log('🔄 Intentando login a:', `${API_URL}/auth/login`);
  console.log('📧 Email:', email);
  
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
      throw new Error('No se pudo conectar al servidor. Verifica que el backend esté corriendo en http://localhost:8080');
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
  autoComplete = 'off',
  inputMode = 'text',
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: string;
  inputMode?: string;
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
      autoComplete={autoComplete}
      inputMode={inputMode}
    />
  );
}

function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={[
        styles.button,
        styles[`button_${variant}`],
        isDisabled && styles.button_disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#006a61'} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            styles[`buttonText_${variant}`],
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

function LinkButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Text style={styles.linkText}>{title}</Text>
    </Pressable>
  );
}

// ============================================
// Pantalla Principal
// ============================================
import { useAuthStore } from '../../store/authStore';

// Props que recibe la pantalla
interface Props {
  navigation?: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError('El correo electrónico es requerido');
      return false;
    }
    if (!password.trim()) {
      setError('La contraseña es requerida');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingresa un correo electrónico válido');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginApi(email.trim(), password);
      
      // Save tokens only (user viene de /me)
      await saveTokens(response.accessToken, response.refreshToken);
      
      // Navigate based on role
      if (response.user.roles.includes('ADMIN')) {
        navigation?.navigate('AdminDashboard');
      } else if (response.user.roles.includes('DRIVER')) {
        navigation?.navigate('DriverDashboard');
      } else {
        navigation?.navigate('GuardianDashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    console.log('Navigate to Register screen');
    navigation?.navigate('Register');
  };

  const handleForgotPassword = () => {
    console.log('Navigate to Forgot Password');
    Alert.alert('Recuperar contraseña', 'Aquí iría a recuperar contraseña');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Card Principal */}
        <View style={styles.card}>
          {/* Branding */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🛡️</Text>
          </View>

          <Text style={styles.title}>Bienvenido de nuevo</Text>
          <Text style={styles.subtitle}>Ingresa a tu cuenta para continuar</Text>

          {/* Error Message */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email Field */}
          <View style={styles.field}>
            <Label required>Correo electrónico</Label>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              inputMode="email"
            />
          </View>

          {/* Password Field */}
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Label required>Contraseña</Label>
              <LinkButton title="¿Olvidaste tu contraseña?" onPress={handleForgotPassword} />
            </View>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoComplete="current-password"
            />
          </View>

          {/* Login Button */}
          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
            disabled={!email || !password}
          />
        </View>

        {/* Register Link */}
        <View style={styles.registerSection}>
          <Text style={styles.registerText}>
            ¿No tienes cuenta?{' '}
            <Text style={styles.registerLink} onPress={handleRegister}>
              Regístrate
            </Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>🔒 Conexión Segura Encriptada de SafeRoute</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Simple token storage using AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

let authToken: string | null = null;

export function getAuthToken() {
  return authToken;
}

async function saveTokens(accessToken: string, refreshToken: string) {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    authToken = accessToken;
    console.log('✅ Tokens guardados');
  } catch (error) {
    console.error('Error guardando tokens:', error);
  }
}

// ============================================
// Estilos
// ============================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#f7f9fb',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#131b2e',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#76777d',
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
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3f465c',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    marginLeft: 4,
  },
  required: {
    color: '#ba1a1a',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
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
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  button_primary: {
    backgroundColor: '#006a61',
  },
  button_secondary: {
    backgroundColor: '#f2f4f6',
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  button_link: {
    backgroundColor: 'transparent',
  },
  button_disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText_primary: {
    color: '#ffffff',
  },
  buttonText_secondary: {
    color: '#191c1e',
  },
  buttonText_ghost: {
    color: '#006a61',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006a61',
  },
  registerSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#76777d',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#006a61',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#76777d',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});