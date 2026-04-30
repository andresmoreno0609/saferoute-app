# Flujo 04 - ADMIN: Dashboard

## 1. Overview

| Campo | Valor |
|-------|-------|
| **ID** | 04 |
| **Nombre** | ADMIN: Dashboard |
| **Actor** | ADMIN |
| **Objetivo** | Ver overview del sistema |
| **Prioridad** | Alta |

## 2. API - Segun Postman

| Endpoint | Descripcion |
|----------|-------------|
| GET /api/v1/users | Total usuarios |
| GET /api/v1/routes | Rutas (filtrar por estado) |
| GET /api/v1/drivers | Conductores (filtrar is_verified) |
| GET /api/v1/vehicles/{id}/documents | Documentos por vencer |

## 3. Dashboard Metrics
- Total usuarios ativos
- Rutas en curso (status=IN_PROGRESS)
- Conductores pendientes (is_verified=false)
- Documentos por vencer

## 4. Navigation

| Desde | Hacia | Accion |
|-------|------|-------|
| Dashboard | /users | Menu |
| Dashboard | /routes | Menu |
| Dashboard | /drivers | Menu |
| Dashboard | /vehicles | Menu |

## 5. Notas UX
- Cards con numeros grandes
- pull-to-refresh
- Loading skeleton