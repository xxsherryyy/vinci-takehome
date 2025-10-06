import * as THREE from "three";

interface AnimationConfig {
  duration: number;
  deformationIntensity: number;
  maxRadius: number;
  updateFrequency: number;
}

export const ANIMATION_CONFIG: AnimationConfig = {
  duration: 1000,
  deformationIntensity: 0.2,
  maxRadius: 0.6,
  updateFrequency: 1,
};

export const PERFORMANCE_CONFIG = {
  LOW_END: {
    updateFrequency: 2, // Update every other frame
    deformationIntensity: 0.15, // Slightly less intense
  },
  MEDIUM: {
    updateFrequency: 1,
    deformationIntensity: 0.2,
  },
  HIGH_END: {
    updateFrequency: 1,
    deformationIntensity: 0.25,
  },
};

export const CHEEK_REGION = {
  minX: 0.15,
  maxX: 1.2,
  minY: -0.85,
  maxY: -0.15,
  minZ: -0.3,
  maxZ: 0.3,
};

export const CHEEK_CENTERS = {
  left: new THREE.Vector3(-0.4, -0.5, 0),
  right: new THREE.Vector3(0.4, -0.5, 0),
};

export const COLORS = {
  angry: 0xffb6c1,
};
