import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface CameraProps {
  position?: [number, number, number];
  fov?: number;
  near?: number;
  far?: number;
  makeDefault?: boolean;
}

export const Camera = ({ makeDefault = true, ...props }: CameraProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { position, fov, near, far } = props;
  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={position}
      fov={fov}
      near={near}
      far={far}
      makeDefault={makeDefault}
    />
  );
};
