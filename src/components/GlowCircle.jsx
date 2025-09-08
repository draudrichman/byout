import React from "react";

const GlowCircle = ({
  color = "#ffd700", // Default: Gold with transparency
  size = "300px",
  blur = "100px",
  left = "50%",
  top = "50%",
  zIndex = "-1",
  className = "",
}) => {
  return (
    <div
      className={`${className}`}
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: left,
        top: top,
        transform: "translate(-50%, -50%)", // Centers the glow
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur})`,
        zIndex: zIndex,
        pointerEvents: "none", // Prevents blocking clicks
      }}
    />
  );
};

export default GlowCircle;