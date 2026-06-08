import { useEffect, useCallback } from 'react'
import { useReportStore } from '@/store/useReportStore'
import type { Report } from '@/types/report'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function useReports() {
  const { reports, setReports, setLoading, setError } = useReportStore()

  const fetchReports = useCallback(async (params?: Record<string, string>) => {
    setLoading(true)
    try {
      const queryString = new URLSearchParams(params).toString()
      const url = `${API_URL}/api/reports/${queryString ? '?' + queryString : ''}`
      
      const response = await fetch(url)
      if (!response.ok) throw new Error('Erreur chargement signalements')
      
      const data = await response.json()
      const reportsList = data.results || data
      setReports(Array.isArray(reportsList) ? reportsList : [])
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }, [setReports, setLoading, setError])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  return { reports, refetch: fetchReports }
}
