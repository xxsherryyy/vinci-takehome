import { useState, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Mesh, Vector3, MeshStandardMaterial } from "three";
import { useGameStore } from "../../state/gameStore";
import { ANIMATION_CONFIG, CHEEK_CENTERS, CHEEK_REGION, COLORS, PERFORMANCE_CONFIG } from "./constants";

interface VertexData {
  originalPosition: Vector3;
  currentPosition: Vector3;
  index: number;
}

export function useAnimateDog(headMeshRef: React.RefObject<Mesh | null>) {
  const { incrementScore, score } = useGameStore();

  const [deformationStrength, setDeformationStrength] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [cheekVertices, setCheekVertices] = useState<VertexData[]>([]);
  const [originalVertices, setOriginalVertices] = useState<Float32Array[]>([]);
  const [originalColor, setOriginalColor] = useState<THREE.Color | null>(null);
  const [hasChangedColor, setHasChangedColor] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  
  // Performance-aware settings
  const performanceLevel = "MEDIUM"; // This could be passed as a prop or detected
  const perfConfig = PERFORMANCE_CONFIG[performanceLevel];

  const isCheekVertex = useCallback(
    (x: number, y: number, z: number): boolean => {
      return (
        Math.abs(x) > CHEEK_REGION.minX &&
        Math.abs(x) < CHEEK_REGION.maxX &&
        y > CHEEK_REGION.minY &&
        y < CHEEK_REGION.maxY &&
        z > CHEEK_REGION.minZ &&
        z < CHEEK_REGION.maxZ
      );
    },
    []
  );

  const initializeVertexData = useCallback(() => {
    if (!headMeshRef.current?.geometry) return;

    const geometry = headMeshRef.current.geometry;
    const positionAttribute = geometry.getAttribute("position");
    if (!positionAttribute) return;

    const vertices: VertexData[] = [];
    const originalPositions: Float32Array[] = [];
    const originalPos = new Float32Array(positionAttribute.array);
    originalPositions.push(originalPos);

    // Find and store cheek vertices
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      if (isCheekVertex(x, y, z)) {
        vertices.push({
          originalPosition: new THREE.Vector3(x, y, z),
          currentPosition: new THREE.Vector3(x, y, z),
          index: i,
        });
      }
    }

    setCheekVertices(vertices);
    setOriginalVertices(originalPositions);
  }, [headMeshRef, isCheekVertex]);

  const getMaterial = useCallback((): MeshStandardMaterial | null => {
    if (
      headMeshRef.current?.material &&
      "color" in headMeshRef.current.material
    ) {
      return headMeshRef.current.material as MeshStandardMaterial;
    }
    return null;
  }, [headMeshRef]);

  const setDogColorAngry = useCallback(() => {
    const material = getMaterial();
    if (material) {
      material.color.setHex(COLORS.angry);
    }
  }, [getMaterial]);

  const restoreOriginalColor = useCallback(() => {
    const material = getMaterial();
    if (material && originalColor) {
      material.color.copy(originalColor);
    }
  }, [getMaterial, originalColor]);

  useEffect(() => {
    if (!headMeshRef.current) {
      console.log("Head mesh ref not set yet");
      return;
    }

    const material = getMaterial();
    if (material) {
      setOriginalColor(material.color.clone());
    }

    initializeVertexData();
  }, [headMeshRef, getMaterial, initializeVertexData]);

  useEffect(() => {
    if (score === 10 && !hasChangedColor) {
      // Change color to angry when score reaches 10
      setDogColorAngry();
      setHasChangedColor(true);
    }

    if (score > 10) {
      // Hide the dog when score is greater than 10
      setIsVisible(false);
      setHasChangedColor(false);
      restoreOriginalColor();
    } else {
      setIsVisible(true);
    }
  }, [score, hasChangedColor, setDogColorAngry, restoreOriginalColor]);

  const easeOutCubic = useCallback((progress: number): number => {
    return 1 - Math.pow(1 - progress, 3);
  }, []);

  const animateDeformation = useCallback(
    (
      startTime: number,
      isReverse: boolean = false,
      onComplete?: () => void
    ) => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / ANIMATION_CONFIG.duration, 1);
        const easedProgress = easeOutCubic(progress);

        if (isReverse) {
          setDeformationStrength(1 - easedProgress);
        } else {
          setDeformationStrength(easedProgress);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          onComplete?.();
        }
      };

      requestAnimationFrame(animate);
    },
    [easeOutCubic]
  );

  const triggerCheekDeformation = useCallback(() => {
    setDeformationStrength(1);

    // Forward animation
    animateDeformation(Date.now(), false, () => {
      // Reverse animation
      animateDeformation(Date.now(), true, () => {
        setDeformationStrength(0);
        // Restore original color when animation completes
        if (hasChangedColor) {
          restoreOriginalColor();
          setHasChangedColor(false);
        }
      });
    });
  }, [animateDeformation, hasChangedColor, restoreOriginalColor]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.stopPropagation();
      if (isVisible && score <= 10) {
        incrementScore();
        triggerCheekDeformation();
      }
    },
    [isVisible, score, incrementScore, triggerCheekDeformation]
  );

  const applySphericalDeformation = useCallback(
    (vertexData: VertexData, deformationAmount: number): Vector3 => {
      const originalPos = vertexData.originalPosition;
      const isLeftCheek = originalPos.x < 0;
      const cheekCenter = isLeftCheek
        ? CHEEK_CENTERS.left
        : CHEEK_CENTERS.right;

      // Calculate distance from cheek center for spherical deformation
      const distanceFromCenter = originalPos.distanceTo(cheekCenter);
      const sphereIntensity = Math.max(
        0,
        1 - distanceFromCenter / ANIMATION_CONFIG.maxRadius
      );

      // Calculate direction toward cheek center (spherical indentation)
      const directionToCenter = originalPos
        .clone()
        .sub(cheekCenter)
        .normalize();

      // Apply spherical deformation
      return originalPos
        .clone()
        .add(
          directionToCenter.multiplyScalar(-deformationAmount * sphereIntensity)
        );
    },
    []
  );

  const updateVertexPositions = useCallback(() => {
    if (
      deformationStrength <= 0 ||
      cheekVertices.length === 0 ||
      !headMeshRef.current?.geometry ||
      !originalVertices[0]
    ) {
      return;
    }

    // Performance optimization: skip frames based on update frequency
    setFrameCount(prev => prev + 1);
    if (frameCount % perfConfig.updateFrequency !== 0) {
      return;
    }

    const geometry = headMeshRef.current.geometry;
    const positionAttribute = geometry.getAttribute("position");
    const originalPos = originalVertices[0];
    const deformationAmount =
      deformationStrength * perfConfig.deformationIntensity;

    // Reset to original positions
    positionAttribute.array.set(originalPos);

    // Apply deformation to each cheek vertex
    cheekVertices.forEach((vertexData) => {
      const deformedPos = applySphericalDeformation(
        vertexData,
        deformationAmount
      );

      // Update vertex position in geometry
      positionAttribute.setXYZ(
        vertexData.index,
        deformedPos.x,
        deformedPos.y,
        deformedPos.z
      );

      // Update current position for debugging
      vertexData.currentPosition.copy(deformedPos);
    });

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [
    deformationStrength,
    cheekVertices,
    headMeshRef,
    originalVertices,
    applySphericalDeformation,
    frameCount,
    perfConfig,
  ]);

  useFrame(() => {
    updateVertexPositions();
    if (deformationStrength === 0) {
      cheekVertices.forEach((vertexData) => {
        vertexData.currentPosition.copy(vertexData.originalPosition);
      });
    }
  });

  return {
    isVisible,
    handlePointerDown,
  };
}
