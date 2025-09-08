import React, { useState, useEffect } from 'react';

// Animated connection lines showing global reach
export const GlobalConnectionLines = () => {
  const [activeConnections, setActiveConnections] = useState([]);

  useEffect(() => {
    const connections = [
      { id: 1, start: { x: 20, y: 30 }, end: { x: 80, y: 60 }, delay: 0 },
      { id: 2, start: { x: 15, y: 70 }, end: { x: 70, y: 20 }, delay: 2 },
      { id: 3, start: { x: 60, y: 80 }, end: { x: 30, y: 40 }, delay: 4 },
      { id: 4, start: { x: 85, y: 45 }, end: { x: 25, y: 75 }, delay: 6 },
    ];

    const timer = setInterval(() => {
      setActiveConnections(prev => {
        const newConnection = connections[Math.floor(Math.random() * connections.length)];
        return [...prev.slice(-2), { ...newConnection, timestamp: Date.now() }];
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="connectionFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--fui-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--fui-secondary)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--fui-primary)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {activeConnections.map((connection) => (
          <line
            key={`${connection.id}-${connection.timestamp}`}
            x1={`${connection.start.x}%`}
            y1={`${connection.start.y}%`}
            x2={`${connection.end.x}%`}
            y2={`${connection.end.y}%`}
            stroke="url(#connectionFlow)"
            strokeWidth="1"
            strokeDasharray="4,4"
            filter="url(#glow)"
            opacity="0.6"
            style={{
              animation: 'dataStream 4s ease-out forwards'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Subtle data points appearing around the globe
export const GlobalDataPoints = () => {
  const [dataPoints, setDataPoints] = useState([]);
  
  useEffect(() => {
    const locations = [
      { x: 25, y: 35, label: 'NA' },
      { x: 75, y: 30, label: 'EU' },
      { x: 85, y: 55, label: 'AS' },
      { x: 30, y: 70, label: 'SA' },
      { x: 80, y: 75, label: 'AU' },
    ];

    const timer = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setDataPoints(prev => [...prev.slice(-3), { 
        ...randomLocation, 
        id: Date.now(),
        value: Math.floor(Math.random() * 100) + 1
      }]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {dataPoints.map((point) => (
        <div
          key={point.id}
          className="absolute text-xs font-mono text-[var(--fui-secondary)] opacity-70"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: 'fadeIn 2s ease-out, fadeOut 2s ease-out 3s forwards'
          }}
        >
          <div className="bg-black/50 border border-[var(--fui-primary)]/30 px-2 py-1 rounded">
            {point.label}: +{point.value}
          </div>
        </div>
      ))}
    </div>
  );
};

// Subtle network pulse effect
export const NetworkPulse = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-[var(--fui-primary)]/10 animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-8 rounded-full border border-[var(--fui-secondary)]/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute inset-16 rounded-full border border-[var(--fui-accent)]/10 animate-ping" style={{ animationDuration: '2s', animationDelay: '2s' }} />
      </div>
    </div>
  );
};

// Enhanced texture overlay
export const TextureOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Subtle scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
        }}
      />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />
    </div>
  );
};

// Status indicators for global presence
export const GlobalStatusIndicators = () => {
  const regions = [
    { name: 'AMERICAS', status: 'ACTIVE', x: 20, y: 40 },
    { name: 'EUROPE', status: 'ACTIVE', x: 60, y: 30 },
    { name: 'ASIA', status: 'ACTIVE', x: 80, y: 45 },
    { name: 'OCEANIA', status: 'STANDBY', x: 85, y: 70 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {regions.map((region, index) => (
        <div
          key={region.name}
          className="absolute text-xs font-mono"
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 0.5}s`
          }}
        >
          <div className="flex items-center space-x-2 bg-black/30 border border-[var(--fui-primary)]/20 px-2 py-1 rounded backdrop-blur-sm">
            <div 
              className={`w-2 h-2 rounded-full ${
                region.status === 'ACTIVE' 
                  ? 'bg-[var(--fui-secondary)] animate-pulse' 
                  : 'bg-[var(--fui-accent)] opacity-50'
              }`}
            />
            <span className="text-[var(--fui-text)] opacity-70">{region.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};



