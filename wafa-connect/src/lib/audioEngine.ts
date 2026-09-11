/**
 * Porsche Audio Player
 * Plays authentic Porsche audio recordings from public/sounds/ if provided.
 */

export function playRealPorscheAudio(filename: string = 'porsche-launch.mp3') {
  if (typeof window === 'undefined') return
  try {
    const audio = new Audio(`/sounds/${filename}`)
    audio.volume = 0.85
    audio.play().catch(() => {
      // Audio playback gracefully suppressed if file not present or unmuted by user gesture
    })
  } catch (e) {
    // Silent fail
  }
}
