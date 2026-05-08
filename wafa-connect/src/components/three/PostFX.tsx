// src/components/three/PostFX.tsx
'use client'
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
} from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'

interface PostFXProps {
  isMobile?: boolean
}

export function PostFX({ isMobile = false }: PostFXProps) {
  return (
    // multisampling=0 everywhere — MSAA adds a full resolve pass for no visual
    // benefit when Bloom is already doing additive blending.
    // Was: 5 passes (Bloom+mipBlur, Noise, Vignette, ToneMap) → now 3 passes.
    <EffectComposer multisampling={0} enabled>
      {/* Bloom — subtle gold glow on emissive surfaces
          mipmapBlur removed: it generated 6–8 downsample/upsample passes per frame */}
      <Bloom
        intensity={isMobile ? 0.15 : 0.32}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
        radius={0.55}
      />

      {/* Vignette — frames the composition, single cheap pass */}
      <Vignette
        offset={0.5}
        darkness={isMobile ? 0.55 : 0.68}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* ACES Filmic tone mapping — premium cinematic look */}
      <ToneMapping
        mode={ToneMappingMode.ACES_FILMIC}
        blendFunction={BlendFunction.NORMAL}
        adaptive={false}
        resolution={256}
        middleGrey={0.6}
        maxLuminance={16.0}
        averageLuminance={1.0}
        adaptationRate={1.0}
      />
    </EffectComposer>
  )
}
