import React from "react";
import { useGameStore } from "../../state/gameStore";

export const Controls = (): React.JSX.Element => {
  const { score, resetScore } = useGameStore();

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "rgba(0, 0, 0, 0.8)",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        minWidth: "250px",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <h2 style={{ margin: "0 0 15px 0", fontSize: "20px" }}>Angry Shiba</h2>

      {/* Game Status */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "18px", marginBottom: "8px", opacity: 0.8 }}>
          Steam Meter: <strong style={{ color: "#ff6b6b" }}>{score}</strong>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={resetScore}
            style={{
              flex: 1,
              padding: "8px",
              background: "#6b7280",
              border: "none",
              borderRadius: "5px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Camera Controls */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ 
          margin: "0 0 12px 0", 
          fontSize: "16px", 
          fontWeight: "600",
          color: "#e5e7eb",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          paddingBottom: "8px"
        }}>
          Camera Controls
        </h3>
        
        <div style={{ fontSize: "13px", lineHeight: "1.6", opacity: 0.9 }}>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#60a5fa", fontWeight: "500" }}>🖱️ Left Click + Drag:</span> Rotate around dog
          </div>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#60a5fa", fontWeight: "500" }}>🖱️ Right Click + Drag:</span> Pan camera
          </div>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#60a5fa", fontWeight: "500" }}>🎯 Scroll Wheel:</span> Zoom in/out
          </div>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#60a5fa", fontWeight: "500" }}>📱 Touch:</span> Pinch to zoom, drag to rotate
          </div>
        </div>
      </div>
    </div>
  );
};
