import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../../state/gameStore";
import { Text } from "@react-three/drei";

export const ResetButton = () => {
    const { resetScore } = useGameStore()
    const buttonRef = useRef<THREE.Group>(null)
  
    const handlePointerDown = () => {
      resetScore()
    }
  
    return (
      <group ref={buttonRef} position={[0, 1, 0]}>
        <mesh onPointerDown={handlePointerDown}>
          <boxGeometry args={[0.8, 0.3, 0.1]} />
          <meshStandardMaterial color="#ff4444" />
        </mesh>
        
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          RESET
        </Text>
        
        <Text
          position={[0, 0, -0.06]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          RESET
        </Text>
      </group>
    )
  }