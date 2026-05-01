// Tipos de la API SafeRoute

export type UserRole = 'ADMIN' | 'DRIVER' | 'GUARDIAN';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

// Driver
export interface DriverProfile {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  phone: string;
  vehicleId: string | null;
  isVerified: boolean;
}

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  capacity: number;
  documents: VehicleDocument[];
}

export interface VehicleDocument {
  id: string;
  type: 'SOAT' | 'TECNOMECANICA' | 'Seguro';
  expiryDate: string;
  url: string;
}

// Guardian
export interface GuardianProfile {
  id: string;
  userId: string;
  phone: string;
  emergencyContact: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  nfcCode: string;
  routeId: string | null;
  guardianId: string;
}

// Routes
export type RouteStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Route {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: RouteStatus;
  driverId: string | null;
  vehicleId: string | null;
  stops: RouteStop[];
}

export interface RouteStop {
  id: string;
  order: number;
  address: string;
  latitude: number;
  longitude: number;
  studentIds: string[];
}

// Events
export type EventType = 'ASISTENCIA' | 'INCIDENTE' | 'EMERGENCIA' | 'OTRO';

export interface RouteEvent {
  id: string;
  routeId: string;
  type: EventType;
  description: string;
  studentId: string | null;
  timestamp: string;
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'ROUTE_STARTED' | 'ROUTE_ENDED' | 'STUDENT_PICKED_UP' | 'STUDENT_DROPPED_OFF' | 'GENERAL';
  routeId: string | null;
  studentId: string | null;
  read: boolean;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  activeRoutes: number;
  pendingDrivers: number;
  expiringDocuments: number;
}