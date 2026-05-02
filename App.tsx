/**
 * SafeRoute App - Root with Navigation
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import GuardianDashboardScreen from './src/screens/guardian/DashboardScreen';
import GuardianCompleteProfileScreen from './src/screens/guardian/CompleteProfileScreen';
import GuardianChildrenScreen from './src/screens/guardian/ChildrenScreen';
import ChildDetailScreen from './src/screens/guardian/ChildDetailScreen';
import ChildFormScreen from './src/screens/guardian/ChildFormScreen';
import GuardianNotificationsScreen from './src/screens/guardian/NotificationsScreen';
import ProfileScreen from './src/screens/shared/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="GuardianDashboard" component={GuardianDashboardScreen} />
          <Stack.Screen name="GuardianCompleteProfile" component={GuardianCompleteProfileScreen} />
          <Stack.Screen name="GuardianChildren" component={GuardianChildrenScreen} />
          <Stack.Screen name="ChildDetail" component={ChildDetailScreen} />
          <Stack.Screen name="ChildForm" component={ChildFormScreen} />
          <Stack.Screen name="GuardianNotifications" component={GuardianNotificationsScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}