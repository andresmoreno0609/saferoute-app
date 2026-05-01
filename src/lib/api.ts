// API Client - SafeRoute

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  DriverProfile,
  GuardianProfile,
  Vehicle,
  Route,
  Student,
  RouteEvent,
  Notification,
  DashboardStats,
} from '../types';

const BASE_URL = 'http://localhost:8080/api/v1';

// Token storage
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export async function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function setTokens(accessToken: string, refreshToken: string): Promise<void> {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export async function clearTokens(): Promise<void> {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}

// Generic fetch wrapper
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await getAccessToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error unknown' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Auth
export const authApi = {
  login: (data: LoginRequest) =>
    fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  register: (data: RegisterRequest) =>
    fetchApi<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () => fetchApi<User>('/auth/me'),

  logout: () =>
    fetchApi<void>('/auth/logout', { method: 'POST' }),
};

// Users (Admin)
export const usersApi = {
  list: (params?: { role?: string; search?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return fetchApi<User[]>(`/users${query ? `?${query}` : ''}`);
  },

  get: (id: string) => fetchApi<User>(`/users/${id}`),

  create: (data: Omit<RegisterRequest, 'role'> & { roles: string[] }) =>
    fetchApi<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<User>) =>
    fetchApi<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchApi<void>(`/users/${id}`, { method: 'DELETE' }),
};

// Drivers (Admin)
export const driversApi = {
  list: (params?: { isVerified?: boolean }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return fetchApi<DriverProfile[]>(`/drivers${query ? `?${query}` : ''}`);
  },

  get: (id: string) => fetchApi<DriverProfile>(`/drivers/${id}`),

  verify: (id: string, approved: boolean) =>
    fetchApi<DriverProfile>(`/drivers/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify({ approved }),
    }),
};

// Vehicles (Admin)
export const vehiclesApi = {
  list: () => fetchApi<Vehicle[]>('/vehicles'),

  get: (id: string) => fetchApi<Vehicle>(`/vehicles/${id}`),

  create: (data: Omit<Vehicle, 'id' | 'documents'>) =>
    fetchApi<Vehicle>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Vehicle>) =>
    fetchApi<Vehicle>(`/vehicles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchApi<void>(`/vehicles/${id}`, { method: 'DELETE' }),
};

// Routes
export const routesApi = {
  list: (params?: { status?: string; driverId?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return fetchApi<Route[]>(`/routes${query ? `?${query}` : ''}`);
  },

  get: (id: string) => fetchApi<Route>(`/routes/${id}`),

  create: (data: Omit<Route, 'id'>) =>
    fetchApi<Route>('/routes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Route>) =>
    fetchApi<Route>(`/routes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  start: (id: string) =>
    fetchApi<Route>(`/routes/${id}/start`, { method: 'POST' }),

  end: (id: string) =>
    fetchApi<Route>(`/routes/${id}/end`, { method: 'POST' }),

  myRoutes: () => fetchApi<Route[]>('/routes/my-routes'),
};

// Students (Guardian)
export const studentsApi = {
  list: () => fetchApi<Student[]>('/students'),

  get: (id: string) => fetchApi<Student>(`/students/${id}`),

  create: (data: Omit<Student, 'id'>) =>
    fetchApi<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Student>) =>
    fetchApi<Student>(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// Guardian Profile
export const guardianApi = {
  getProfile: () => fetchApi<GuardianProfile>('/guardians/me'),

  updateProfile: (data: Partial<GuardianProfile>) =>
    fetchApi<GuardianProfile>('/guardians', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  updateInfoValidate: (id: string, infoValidate: boolean) =>
    fetchApi<GuardianProfile>(`/guardians/${id}/info-validate`, {
      method: 'PUT',
      body: JSON.stringify({ infoValidate }),
    }),
};

// Driver Profile
export const driverApi = {
  getProfile: () => fetchApi<DriverProfile>('/drivers/me'),

  updateProfile: (data: Partial<DriverProfile>) =>
    fetchApi<DriverProfile>('/drivers', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  updateInfoValidate: (id: string, infoValidate: boolean) =>
    fetchApi<DriverProfile>(`/drivers/${id}/info-validate`, {
      method: 'PUT',
      body: JSON.stringify({ infoValidate }),
    }),

  registerNFC: (studentId: string, routeId: string) =>
    fetchApi<RouteEvent>('/driver/register-nfc', {
      method: 'POST',
      body: JSON.stringify({ studentId, routeId }),
    }),
};

// Events
export const eventsApi = {
  list: (routeId: string) =>
    fetchApi<RouteEvent[]>(`/events?routeId=${routeId}`),

  create: (data: Omit<RouteEvent, 'id' | 'timestamp'>) =>
    fetchApi<RouteEvent>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Notifications
export const notificationsApi = {
  list: () => fetchApi<Notification[]>('/notifications'),

  markRead: (id: string) =>
    fetchApi<Notification>(`/notifications/${id}/read`, { method: 'POST' }),

  markAllRead: () =>
    fetchApi<void>('/notifications/read-all', { method: 'POST' }),
};

// Dashboard (Admin)
export const dashboardApi = {
  stats: () => fetchApi<DashboardStats>('/dashboard/stats'),
};