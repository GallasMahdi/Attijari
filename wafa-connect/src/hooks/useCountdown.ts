// src/hooks/useCountdown.ts
import { useState, useEffect, useCallback } from 'react'
import { differenceInSeconds } from 'date-fns'

interface CountdownValues {
  days:    number
  hours:   number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function useCountdown(targetDate: Date): CountdownValues {
  const calculate = useCallback((): CountdownValues => {
    const now = new Date()
    const diff = differenceInSeconds(targetDate, now)
    
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }
    
    return {
      days:      Math.floor(diff / 86400),
      hours:     Math.floor((diff % 86400) / 3600),
      minutes:   Math.floor((diff % 3600) / 60),
      seconds:   diff % 60,
      isExpired: false,
    }
  }, [targetDate])

  const [values, setValues] = useState<CountdownValues>({
    days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false
  })

  useEffect(() => {
    // Set the actual values immediately after hydration
    setValues(calculate())
    const timer = setInterval(() => setValues(calculate()), 1000)
    return () => clearInterval(timer)
  }, [calculate])

  return values
}
