import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function useSmoothZoom(targetPosition: THREE.Vector3 | null) {
  const ref = useRef(0)
  useFrame((state, dt) => {
    if (!targetPosition) return
    ref.current = Math.min(1, ref.current + dt * 2)
    state.camera.position.lerpVectors(state.camera.position, targetPosition, ref.current * 0.1)
    state.camera.near = Math.max(0.01, Math.min(0.1, state.camera.near))
    state.camera.updateProjectionMatrix()
  })
}