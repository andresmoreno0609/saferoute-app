# SafeRoute - TODO de Pantallas

> Base: flujos/*.md + COMPONENTES_BASE.md

## Resumen

| Rol | Pantallas | Cantidad |
|-----|----------|---------|
| Auth | Login, Register | 2 |
| Driver | Dashboard, CompleteProfile, StartRoute, Tracking, ScanNFC, EventForm, EndRoute, MyRoutes | 8 |
| Guardian | Dashboard, CompleteProfile, Children, RouteStatus, Notifications | 5 |
| Admin | Dashboard, Users, UserDetail+Form, Routes, RouteDetail+Form, Vehicles, VehicleDetail+Form, VerifyDriver | 8+ |
| Shared | Profile | 1 |
| **Total** | | **~25** |

---

## Por Rol

### Auth
| # | Pantalla | Archivo | Flujo |
|---|---------|--------|-------|
| 1 | LoginScreen | `src/screens/auth/LoginScreen.tsx` | 01 |
| 2 | RegisterScreen | `src/screens/auth/RegisterScreen.tsx` | 02 |

### Driver
| # | Pantalla | Archivo | Flujo |
|---|---------|--------|-------|
| 3 | CompleteProfileScreen | `src/screens/driver/CompleteProfileScreen.tsx` | 02b |
| 4 | DashboardScreen | `src/screens/driver/DashboardScreen.tsx` | 09 |
| 5 | StartRouteScreen | `src/screens/driver/StartRouteScreen.tsx` | 10 |
| 6 | TrackingScreen | `src/screens/driver/TrackingScreen.tsx` | 11 |
| 7 | ScanNFCScreen | `src/screens/driver/ScanNFCScreen.tsx` | 12 |
| 8 | EventFormScreen | `src/screens/driver/EventFormScreen.tsx` | 13 |
| 9 | EndRouteScreen | `src/screens/driver/EndRouteScreen.tsx` | 14 |
| 10 | MyRoutesScreen | `src/screens/driver/MyRoutesScreen.tsx` | 15 |

### Guardian
| # | Pantalla | Archivo | Flujo |
|---|---------|--------|-------|
| 11 | CompleteProfileScreen | `src/screens/guardian/CompleteProfileScreen.tsx` | 02c |
| 12 | DashboardScreen | `src/screens/guardian/DashboardScreen.tsx` | 16 |
| 13 | ChildrenScreen | `src/screens/guardian/ChildrenScreen.tsx` | 17 |
| 14 | RouteStatusScreen | `src/screens/guardian/RouteStatusScreen.tsx` | 18 |
| 15 | NotificationsScreen | `src/screens/guardian/NotificationsScreen.tsx` | 19 |

### Admin (Web)
| # | Pantalla | Archivo | Flujo |
|---|---------|--------|-------|
| 16 | DashboardScreen | `src/screens/admin/DashboardScreen.tsx` | 04 |
| 17 | UsersScreen | `src/screens/admin/UsersScreen.tsx` | 05 |
| 18 | UserDetailScreen | `src/screens/admin/UserDetailScreen.tsx` | 05 |
| 19 | UserFormScreen | `src/screens/admin/UserFormScreen.tsx` | 05 |
| 20 | RoutesScreen | `src/screens/admin/RoutesScreen.tsx` | 06 |
| 21 | RouteDetailScreen | `src/screens/admin/RouteDetailScreen.tsx` | 06 |
| 22 | RouteFormScreen | `src/screens/admin/RouteFormScreen.tsx` | 06 |
| 23 | VehiclesScreen | `src/screens/admin/VehiclesScreen.tsx` | 07 |
| 24 | VehicleDetailScreen | `src/screens/admin/VehicleDetailScreen.tsx` | 07 |
| 25 | VehicleFormScreen | `src/screens/admin/VehicleFormScreen.tsx` | 07 |
| 26 | VerifyDriverScreen | `src/screens/admin/VerifyDriverScreen.tsx` | 08 |

### Shared
| # | Pantalla | Archivo | Flujo |
|---|---------|--------|-------|
| 27 | ProfileScreen | `src/screens/shared/ProfileScreen.tsx` | 20 |

---

## Pendientes

Todas las pantallas arriba listed pending de creacion.

## Notas

- Rutas: `src/screens/{role}/{ScreenName}.tsx`
- Usar COMPONENTES_BASE.md para estilos
- Web Admin usa sidebar, App Driver/Guardian usa bottom nav