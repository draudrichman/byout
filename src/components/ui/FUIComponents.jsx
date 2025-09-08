                          import React, { useState, useEffect } from 'react';

// Holographic Data Readout Component
export const DataReadout = ({ label, value, unit = "", className = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 20;
      const counter = setInterval(() => {
        setDisplayValue(prev => {
          if (prev >= value) {
            clearInterval(counter);
            return value;
          }
          return prev + increment;
        });
      }, 50);
      
      return () => clearInterval(counter);
    }, Math.random() * 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={`fui-hologram p-4 rounded-lg fui-scanline ${className}`}>
      <div className="text-[var(--fui-text-dim)] text-xs uppercase tracking-wider mb-1 font-mono">
        {label}
      </div>
      <div className="text-[var(--fui-primary)] text-2xl font-mono fui-text-glow">
        {Math.floor(displayValue).toLocaleString()}{unit}
      </div>
    </div>
  );
};

// HUD Corner Elements
export const HUDCorner = ({ position = "top-left", className = "" }) => {
  const cornerStyles = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4 rotate-90",
    "bottom-left": "bottom-4 left-4 -rotate-90",
    "bottom-right": "bottom-4 right-4 rotate-180"
  };

  return (
    <div className={`fixed ${cornerStyles[position]} z-30 ${className}`}>
      <svg width="60" height="60" viewBox="0 0 60 60" className="text-[var(--fui-primary)] opacity-60">
        <path
          d="M0,20 L0,0 L20,0 M60,40 L60,60 L40,60"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <circle cx="20" cy="20" r="2" fill="currentColor" className="animate-ping" />
      </svg>
    </div>
  );
};

// Connection Lines
export const ConnectionLines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--fui-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--fui-primary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--fui-secondary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Diagonal connection lines */}
        <line 
          x1="0" y1="20%" 
          x2="30%" y2="0" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
        <line 
          x1="70%" y1="100%" 
          x2="100%" y2="80%" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <line 
          x1="0" y1="60%" 
          x2="20%" y2="40%" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1"
          strokeDasharray="3,3"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </svg>
    </div>
  );
};

// Matrix Rain Effect
export const MatrixRain = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newDrops = [];
    
    for (let i = 0; i < 5; i++) {
      newDrops.push({
        id: i,
        text: characters.charAt(Math.floor(Math.random() * characters.length)),
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
      });
    }
    
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute text-[var(--fui-secondary)] text-sm font-mono opacity-20"
          style={{
            left: `${drop.left}%`,
            animation: `matrixRain 8s linear infinite`,
            animationDelay: `${drop.animationDelay}s`
          }}
        >
          {drop.text}
        </div>
      ))}
    </div>
  );
};

// System Status Display
export const SystemStatus = ({ className = "" }) => {
  const [status, setStatus] = useState('INITIALIZING');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const statuses = ['INITIALIZING', 'CONNECTING', 'SECURING', 'ONLINE'];
    let currentIndex = 0;
    
    const timer = setInterval(() => {
      if (currentIndex < statuses.length - 1) {
        currentIndex++;
        setStatus(statuses[currentIndex]);
        setProgress(prev => prev + 25);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`fui-hologram p-3 rounded-lg ${className}`}>
      <div className="text-[var(--fui-text-dim)] text-xs uppercase tracking-wider mb-2 font-mono">
        SYSTEM STATUS
      </div>
      <div className="text-[var(--fui-secondary)] text-sm font-mono mb-2">
        {status}
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1">
        <div 
          className="bg-gradient-to-r from-[var(--fui-primary)] to-[var(--fui-secondary)] h-1 rounded-full transition-all duration-1000 fui-glow"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// HUD Data Grid
export const HUDDataGrid = ({ className = "" }) => {
  const dataPoints = [
    { label: 'NODES', value: '247' },
    { label: 'LATENCY', value: '12ms' },
    { label: 'BANDWIDTH', value: '1.2GB/s' },
    { label: 'SECURITY', value: 'ACTIVE' },
  ];

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {dataPoints.map((item, index) => (
        <div key={index} className="fui-hologram p-2 rounded text-center fui-data-stream">
          <div className="text-[var(--fui-text-dim)] text-xs font-mono uppercase">
            {item.label}
          </div>
          <div className="text-[var(--fui-primary)] text-sm font-mono font-bold">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

// Glitch Text Effect
export const GlitchText = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 text-[var(--fui-accent)] opacity-70"
        style={{ 
          animation: 'glitch 3s infinite',
          clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)'
        }}
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 text-[var(--fui-secondary)] opacity-70"
        style={{ 
          animation: 'glitch 3s infinite reverse',
          clipPath: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)'
        }}
      >
        {children}
      </span>
    </div>
  );
};

// Holographic Button
export const FUIButton = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-[var(--fui-primary)] to-[var(--fui-secondary)] text-black hover:shadow-[0_0_20px_var(--fui-primary)]",
    secondary: "border border-[var(--fui-primary)] text-[var(--fui-primary)] hover:bg-[var(--fui-primary)] hover:text-black",
    accent: "border border-[var(--fui-accent)] text-[var(--fui-accent)] hover:bg-[var(--fui-accent)] hover:text-black"
  };

  return (
    <button 
      className={`px-6 py-3 rounded-lg font-mono uppercase tracking-wider transition-all duration-300 relative overflow-hidden fui-scanline ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Energy Core Component for Euphoric Effect
export const EnergyCore = ({ className = "" }) => {
  return (
    <div className={`fixed bottom-10 left-10 w-16 h-16 ${className}`}>
      <div className="relative w-full h-full">
        {/* Core */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[var(--fui-primary)] to-[var(--fui-secondary)] fui-glow animate-pulse" />
        
        {/* Energy Rings */}
        <div className="absolute inset-0 rounded-full border-2 border-[var(--fui-primary)] opacity-60 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-1 rounded-full border border-[var(--fui-secondary)] opacity-40 animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />
        
        {/* Particle Effects */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--fui-accent)] rounded-full"
              style={{
                top: '50%',
                left: '50%',
                animation: `tradeOrbit 3s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                transformOrigin: `${20 + i * 3}px 0`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
