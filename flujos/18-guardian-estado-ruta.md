# Flujo 18 - GUARDIAN: Estado de Ruta

## 1. Overview
| Campo | Valor |
|-------|-------|
| ID | 18 |
| Nombre | GUARDIAN: Estado de Ruta |
| Actor | GUARDIAN |
| Objetivo | Ver estado en tiempo real |
| Prioridad | Alta |

## 2. Pantallas
- Mapa Ruta: `src/screens/guardian/RouteMapScreen.tsx`

## 3. Flujo Principal
1. Tocar "Ver Ruta" en hijo
2. Ver mapa con:
   - Posicion actual del bus
   - Paradas
   - Tiempo estimado

## 4. Componentes UI
- Mapa (Google Maps / MapKit)
- Marker posicion bus
- Marcadores paradas
- Info panel con tiempo

## 5. Datos en Mapa
| Elemento | Descripcion |
|----------|------------|
| Bus marker | Posicion actual |
| Stop markers | Paradas ordenadas |
| Route line | Recorrido |

## 6. Flujos Alternativos
- Sin ruta activa: mensaje "Sin ruta activa"

## 7. Notas UX
- Actualizacion en tiempo real
- Mapa claro con posicion