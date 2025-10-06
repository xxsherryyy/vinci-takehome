import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { Group, Mesh } from 'three'

interface DogModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  castShadow?: boolean
  receiveShadow?: boolean
  useAnimateDog?: (headMeshRef: React.RefObject<Mesh | null>) => {
    isVisible: boolean
    handlePointerDown: (event: React.PointerEvent) => void
  }
}

export function DogModel({ 
  position, 
  rotation, 
  scale, 
  castShadow = true, 
  receiveShadow = true, 
  useAnimateDog, 
  ...props
}: DogModelProps) {
  const { nodes, materials } = useGLTF('/models/dog/dog2.gltf')
  const groupRef = useRef<Group>(null)
  const headMeshRef = useRef<Mesh>(null)
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultHook = (_headMeshRef: React.RefObject<Mesh | null>) => ({
    isVisible: true,
    handlePointerDown: () => {}
  })
  
  const { isVisible, handlePointerDown } = (useAnimateDog || defaultHook)(headMeshRef)

  if (!isVisible) {
    return null
  }

  return (
    <group ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          geometry={(nodes.Box002_body_0 as Mesh).geometry}
          material={materials['default']}
        />
        <mesh
          ref={headMeshRef}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          geometry={(nodes.Box002_head_0001 as Mesh).geometry}
          material={materials['default']}
          onPointerDown={handlePointerDown}
        />
      </group>
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        geometry={(nodes.Group18985_default_0 as Mesh).geometry}
        material={materials['default']}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        geometry={(nodes.Object001_default_0 as Mesh).geometry}
        material={materials['default']}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/dog2.gltf')
