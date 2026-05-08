'use client'
import { Grid } from '@react-three/drei'

export function GroundGrid() {
  return (
    <Grid
      position={[0, -5, 0]}
      args={[40, 40]}
      cellSize={1}
      cellThickness={1}
      cellColor="#006633"
      sectionSize={5}
      sectionThickness={1.5}
      sectionColor="#C9A84C"
      fadeDistance={30}
      fadeStrength={1}
    />
  )
}
