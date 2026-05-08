// src/hooks/useGuestConfirmation.ts
import { useState, useCallback } from 'react'
import { GuestFormData, GuestResponse, ConfirmationState } from '@/types/guest'

export function useGuestConfirmation() {
  const [state, setState] = useState<ConfirmationState>({
    status: 'idle',
    data: null,
    error: null,
  })

  const confirm = useCallback(async (formData: GuestFormData) => {
    setState({ status: 'loading', data: null, error: null })

    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error: ${response.status}`)
      }

      const data: GuestResponse = await response.json()
      setState({ status: 'success', data, error: null })
      return data
    } catch (err) {
      const message = err instanceof Error 
        ? err.message 
        : 'Une erreur est survenue. Veuillez réessayer.'
      setState({ status: 'error', data: null, error: message })
      throw err
    }
  }, [])

  const reset = useCallback(() => {
    setState({ status: 'idle', data: null, error: null })
  }, [])

  return { ...state, confirm, reset }
}
