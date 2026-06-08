# 🛠️ Guide Technique - Améliorations Frontend

**Guide complet pour améliorer le frontend Next.js d'EkoFutura**

---

## 📋 Table des matières

1. [State Management](#1-state-management)
2. [Validation Formulaires](#2-validation-formulaires)
3. [Amélioration Cartographie](#3-amélioration-cartographie)
4. [Testing](#4-testing)
5. [Performance](#5-performance)
6. [UX/UI Essentials](#6-uxui-essentials)

---

## 1. State Management

### Pourquoi Zustand ?
- ✅ Léger (2.5 KB gzipped)
- ✅ Simple API
- ✅ Pas de boilerplate (contrairement Redux)
- ✅ Parfait pour Next.js

### Installation

```bash
npm install zustand immer
```

### Structure Recommandée

```
frontend/src/
├── store/
│   ├── useReportStore.ts      # Signalements
│   ├── useMapStore.ts         # État carte
│   ├── useUIStore.ts          # État UI général
│   └── useAuthStore.ts        # État authentification
└── hooks/
    ├── useReports.ts
    ├── useMap.ts
    └── useNotifications.ts
```

### Exemple : Store Signalements

```typescript
// src/store/useReportStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Report {
  id: string
  title: string
  description: string
  category: string
  latitude: number
  longitude: number
  photos: string[]
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  createdAt: Date
}

interface ReportStore {
  // State
  reports: Report[]
  selectedReport: Report | null
  draftReport: Partial<Report>
  loading: boolean
  error: string | null

  // Actions
  addReport: (report: Report) => void
  updateReport: (id: string, updates: Partial<Report>) => void
  deleteReport: (id: string) => void
  setSelectedReport: (report: Report | null) => void
  updateDraft: (updates: Partial<Report>) => void
  clearDraft: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useReportStore = create<ReportStore>()(
  devtools(
    persist(
      immer((set) => ({
        // State initial
        reports: [],
        selectedReport: null,
        draftReport: {},
        loading: false,
        error: null,

        // Actions
        addReport: (report) => set((state) => {
          state.reports.push(report)
        }),

        updateReport: (id, updates) => set((state) => {
          const report = state.reports.find((r) => r.id === id)
          if (report) {
            Object.assign(report, updates)
          }
        }),

        deleteReport: (id) => set((state) => {
          state.reports = state.reports.filter((r) => r.id !== id)
        }),

        setSelectedReport: (report) => set({ selectedReport: report }),

        updateDraft: (updates) => set((state) => {
          state.draftReport = { ...state.draftReport, ...updates }
        }),

        clearDraft: () => set({ draftReport: {} }),

        setLoading: (loading) => set({ loading }),

        setError: (error) => set({ error }),
      })),
      {
        name: 'report-store',
        partialize: (state) => ({ draftReport: state.draftReport }),
      }
    )
  )
)
```

### Custom Hook pour Récupérer les Rapports

```typescript
// src/hooks/useReports.ts
import { useEffect } from 'react'
import { useReportStore } from '@/store/useReportStore'

export function useReports() {
  const { reports, setLoading, setError } = useReportStore()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/reports')
      const data = await response.json()
      // Mettre à jour store
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { reports, refetch: fetchReports }
}
```

---

## 2. Validation Formulaires

### Installation

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Exemple : Formulaire Signalement

```typescript
// src/types/report.ts
import { z } from 'zod'

export const ReportSchema = z.object({
  title: z.string()
    .min(5, 'Minimum 5 caractères')
    .max(100, 'Maximum 100 caractères'),
  
  description: z.string()
    .min(20, 'Description minimale 20 caractères')
    .max(1000, 'Maximum 1000 caractères'),
  
  category: z.enum(['pollution', 'déchets', 'eau', 'air', 'érosion', 'inondation'], {
    errorMap: () => ({ message: 'Catégorie invalide' })
  }),
  
  latitude: z.number()
    .min(-90)
    .max(90)
    .refine((val) => !isNaN(val), 'Latitude invalide'),
  
  longitude: z.number()
    .min(-180)
    .max(180)
    .refine((val) => !isNaN(val), 'Longitude invalide'),
  
  name: z.string()
    .min(2, 'Nom minimum 2 caractères')
    .optional(),
  
  email: z.string()
    .email('Email invalide')
    .optional()
    .or(z.literal('')),
  
  phone: z.string()
    .regex(/^[+]?[\d\s-()]+$/, 'Téléphone invalide')
    .optional()
    .or(z.literal('')),
  
  photos: z.array(z.string())
    .min(1, 'Au minimum 1 photo')
    .max(5, 'Maximum 5 photos'),
})

export type ReportFormData = z.infer<typeof ReportSchema>
```

### Composant Formulaire

```typescript
// src/components/ReportForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReportSchema, type ReportFormData } from '@/types/report'
import { useReportStore } from '@/store/useReportStore'

export function ReportForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ReportFormData>({
    resolver: zodResolver(ReportSchema),
    mode: 'onChange',
  })

  const { addReport, setLoading } = useReportStore()
  const selectedCategory = watch('category')

  const onSubmit = async (data: ReportFormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) throw new Error('Erreur soumission')
      
      const result = await response.json()
      addReport(result)
      // Rediriger
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-4">
      
      {/* Titre */}
      <div>
        <label className="block text-sm font-medium">Titre du signalement</label>
        <input
          {...register('title')}
          className="w-full mt-1 px-3 py-2 border rounded-lg"
          placeholder="Ex: Pollution plastique à la plage"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full mt-1 px-3 py-2 border rounded-lg"
          placeholder="Décrivez le problème..."
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Catégorie */}
      <div>
        <label className="block text-sm font-medium">Catégorie</label>
        <select
          {...register('category')}
          className="w-full mt-1 px-3 py-2 border rounded-lg"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="pollution">Pollution</option>
          <option value="déchets">Déchets</option>
          <option value="eau">Eau</option>
          <option value="air">Air</option>
          <option value="érosion">Érosion</option>
          <option value="inondation">Inondation</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      {/* Contact optionnel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Nom (optionnel)</label>
          <input {...register('name')} className="w-full mt-1 px-3 py-2 border rounded-lg" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email (optionnel)</label>
          <input {...register('email')} type="email" className="w-full mt-1 px-3 py-2 border rounded-lg" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Téléphone (optionnel)</label>
          <input {...register('phone')} className="w-full mt-1 px-3 py-2 border rounded-lg" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium">Photos (minimum 1, maximum 5)</label>
        <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
          <input type="file" multiple accept="image/*" className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className="cursor-pointer">
            Cliquez pour télécharger des photos
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Soumettre le signalement
      </button>
    </form>
  )
}
```

---

## 3. Amélioration Cartographie

### Installation

```bash
npm install supercluster heat.js
```

### Composant Carte Avancée

```typescript
// src/components/AdvancedMap.tsx
'use client'

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import Supercluster from 'supercluster'
import { useEffect, useState } from 'react'
import { useMapStore } from '@/store/useMapStore'

interface Report {
  id: string
  title: string
  latitude: number
  longitude: number
  category: string
}

export function AdvancedMap({ reports }: { reports: Report[] }) {
  const [clusters, setClusters] = useState([])
  const { filters, setCenter } = useMapStore()

  // Clustering
  const supercluster = new Supercluster({
    radius: 40,
    maxZoom: 16,
  })

  useEffect(() => {
    // Points pour clustering
    const points = reports.map((report) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [report.longitude, report.latitude],
      },
      properties: report,
    }))

    supercluster.load(points)
    
    // Calculer clusters au zoom actuel
    const bounds = [14.5, -17.5, 14.8, -17.2] // À adapter
    const clusters = supercluster.getClusters(bounds, 10)
    setClusters(clusters)
  }, [reports])

  return (
    <MapContainer center={[14.716677, -17.467686]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count } = cluster.properties

        if (isCluster) {
          return (
            <CircleMarker
              key={cluster.id}
              center={[latitude, longitude]}
              radius={10 + (point_count / reports.length) * 20}
              color="red"
              weight={2}
              opacity={0.8}
              fillOpacity={0.6}
            >
              <Popup>{point_count} signalements</Popup>
            </CircleMarker>
          )
        }

        const report = cluster.properties
        return (
          <CircleMarker
            key={report.id}
            center={[latitude, longitude]}
            radius={6}
            color={getCategoryColor(report.category)}
            weight={2}
            opacity={0.8}
            fillOpacity={0.7}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{report.title}</h3>
                <p className="text-sm">{report.category}</p>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'pollution': '#EF4444',
    'déchets': '#F59E0B',
    'eau': '#3B82F6',
    'air': '#8B5CF6',
    'érosion': '#D97706',
    'inondation': '#0EA5E9',
  }
  return colors[category] || '#6B7280'
}
```

### Filtres Interactifs

```typescript
// src/components/MapFilters.tsx
'use client'

import { useMapStore } from '@/store/useMapStore'

export function MapFilters() {
  const { filters, setFilters } = useMapStore()

  const categories = ['pollution', 'déchets', 'eau', 'air', 'érosion', 'inondation']

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-bold mb-3">Filtres</h3>

      {/* Catégories */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Catégories</label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={(e) => {
                  const newCats = e.target.checked
                    ? [...filters.categories, cat]
                    : filters.categories.filter((c) => c !== cat)
                  setFilters({ ...filters, categories: newCats })
                }}
                className="mr-2"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Plage de dates */}
      <div>
        <label className="block text-sm font-medium mb-2">Période</label>
        <select
          value={filters.period || '7days'}
          onChange={(e) => setFilters({ ...filters, period: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="1day">Dernier jour</option>
          <option value="7days">Dernière semaine</option>
          <option value="30days">Dernier mois</option>
          <option value="all">Tous</option>
        </select>
      </div>
    </div>
  )
}
```

---

## 4. Testing

### Configuration Jest

```javascript
// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
```

### Exemple Test Composant

```typescript
// src/__tests__/ReportForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ReportForm } from '@/components/ReportForm'

describe('ReportForm', () => {
  it('should render form fields', () => {
    render(<ReportForm />)
    expect(screen.getByLabelText(/titre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
  })

  it('should show validation errors', async () => {
    render(<ReportForm />)
    const submitBtn = screen.getByRole('button', { name: /soumettre/i })
    
    fireEvent.click(submitBtn)
    
    await waitFor(() => {
      expect(screen.getByText(/minimum 5 caractères/i)).toBeInTheDocument()
    })
  })
})
```

---

## 5. Performance

### Optimisation Images

```typescript
// src/components/ReportImage.tsx
import Image from 'next/image'

export function ReportImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      placeholder="blur"
      blurDataURL="data:image/..."
      quality={80}
      priority={false}
    />
  )
}
```

### Code Splitting

```typescript
// Lazy load composants lourds
import dynamic from 'next/dynamic'

const AdvancedMap = dynamic(() => import('@/components/AdvancedMap'), {
  loading: () => <div>Chargement carte...</div>,
  ssr: false, // Important pour Leaflet
})
```

---

## 6. UX/UI Essentials

### Responsive Tailwind

```html
<!-- Exemple layout responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Composants -->
</div>
```

### Composants Réutilisables

```typescript
// src/components/Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', loading, children }: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition'
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button 
      disabled={loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} disabled:opacity-50`}
    >
      {loading ? 'Chargement...' : children}
    </button>
  )
}
```

---

## 🚀 Résumé des Dépendances à Ajouter

```bash
npm install zustand immer
npm install react-hook-form zod @hookform/resolvers
npm install supercluster heat.js
npm install -D jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest
```

---

<div align="center">

[Retour au README](../README.md) • [Guide Backend](./TECHNICAL_BACKEND.md)

</div>
