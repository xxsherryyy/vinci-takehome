import { useRef } from "react";
import * as THREE from 'three';

interface FloorProps {
  color?: string;
  metalness?: number;
  roughness?: number;
  receiveShadow?: boolean;
}

export const Floor = ({ receiveShadow = true, ...props }: FloorProps) => {
    const floorRef = useRef<THREE.Mesh>(null);

    return (
      <>
        <mesh 
          ref={floorRef} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0, 0]} 
          receiveShadow={receiveShadow}
        >
           <circleGeometry args={[5, 64]} />
          <meshStandardMaterial {...props} />
        </mesh>
      </>
    );
  }