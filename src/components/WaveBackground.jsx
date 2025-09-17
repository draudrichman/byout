import React, { useRef, useEffect } from 'react';
import { createNoise3D } from 'simplex-noise';

const WaveBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef();
  const noise3D = createNoise3D();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h;
    let speed = 0;
    let xStepWidth = 30;
    let xStepCount, yStepHeight;

    const resizer = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = "blur(30px)";
      xStepCount = w / xStepWidth;
      yStepHeight = (h * 0.5) / xStepCount;
    };

    const drawWave = (n) => {
      speed += 0.002;
      for (let i = 0; i < n; i++) {
        let startY = 0;
        ctx.beginPath();
        ctx.lineWidth = h / 4;
        // White/silver waves with varying opacity
        const opacity = 0.1 + (i / n) * 0.15; // Gradual opacity from 0.1 to 0.25
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        
        if (i % 2 === 0) {
          for (let x = (-(w / 10)); x < (w + (w / 10)); x += xStepWidth) {
            let y = noise3D(x / 2000, 0.1 * i, speed) * 150;
            ctx.lineTo(x, y + (h * 0.9) + startY);
            startY += yStepHeight;
          }
        } else {
          for (let x = (w + (w / 10)); x > (-(w / 10)); x -= xStepWidth) {
            let y = noise3D(x / 2000, 0.1 * i, speed) * 150;
            ctx.lineTo(x, y + (h * 0.9) + startY);
            startY += yStepHeight;
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Black background
      ctx.fillRect(0, 0, w, h);
      drawWave(8);
      animationFrameId.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      resizer();
    };

    // Initialize
    resizer();
    render();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -10 }}
    />
  );
};

export default WaveBackground;
