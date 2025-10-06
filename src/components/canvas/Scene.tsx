import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stats } from "@react-three/drei";
import { useGameStore } from "../../state/gameStore";
import { Floor } from "./Floor";
import { Suspense } from "react";
import Loading from "../ui/Loading";
import { DogModel } from "../../models/DogModel";
import { ResetButton } from "./ResetButton";
import { useAnimateDog } from "../../hooks/animateDog/useAnimateDog";
import { Camera } from "./Camera";

export const Scene = () => {
  const { score } = useGameStore();
  const dpr =
    typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio) : 1;

  return (
    <Canvas
      shadows
      dpr={dpr}
      style={{
        width: "100%",
        height: "100%",
        background: "#eef2f5",
      }}
      gl={{ antialias: true, localClippingEnabled: true }}
    >
      <Camera position={[0, 0.8, 3]} fov={45} near={0.01} far={100} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <Environment preset="dawn" />
      <OrbitControls
        enablePan={true}
        maxPolarAngle={Math.PI * 0.9}
        minPolarAngle={Math.PI * 0.1}
        minDistance={0.4}
        maxDistance={10}
        makeDefault
      />
      <Floor color={"#2D3748"} metalness={0.1} roughness={0.8} />
      <Suspense fallback={<Loading />}>
        <DogModel position={[0, 1, 0]} useAnimateDog={useAnimateDog} />
        {score > 10 && <ResetButton />}
      </Suspense>
      {process.env.NODE_ENV === "development" && <Stats className="stats" />}
    </Canvas>
  );
};
