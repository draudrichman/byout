import React, { lazy, Suspense } from 'react';
import Navbar from './ui/Navbar';
import { useControls } from 'leva';

const World = lazy(() => import("../components/ui/globe").then((m) => ({ default: m.World })));



const LandingPage = () => {
  const { hexPolygonColor, chinaHexPolygonColor, targetingCountriesColor, globeColor, globeOpacity, pointOpacity, metallicIntensity, glowIntensity } = useControls({
    hexPolygonColor: {
      value: "#757575",
      label: "Other Countries Color",
    },
    chinaHexPolygonColor: {
      value: "#ffffff",
      label: "China Color",
    },
    targetingCountriesColor: {
      value: "#ffffff",
      label: "Targeting Countries Color",
    },
    globeColor: {
      value: "#ffffff",
      label: "Globe Color",
    },
    globeOpacity: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
      label: "Globe Opacity",
    },
    pointOpacity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
      label: "Point Opacity",
    },
    metallicIntensity: {
      value: 0.9,
      min: 0,
      max: 1,
      step: 0.1,
      label: "Metallic Intensity",
    },
    glowIntensity: {
      value: 0.8,
      min: 0,
      max: 2,
      step: 0.1,
      label: "Glow Intensity",
    },
  });
  const globeConfig = {
    pointSize: 5,
    pointStyle: "dot",
    pointOpacity,
    particlesSize: 2,
    hexPolygonColor,
    chinaHexPolygonColor,
    targetingCountriesColor,
    globeColor,
    globeOpacity,
    showAtmosphere: false,
    atmosphereColor: "#ffffff",
    atmosphereAltitude: 0.2,
    emissive: globeColor,
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(0, 121, 145,0.7)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 1,
    metallicIntensity,
    glowIntensity,
  };

  const colors = [
    "#ff0080", // Hot pink
    "#00ff88", // Bright green
    "#0080ff", // Bright blue
    "#ff8000", // Bright orange
    "#8000ff", // Purple
    "#ff0088", // Magenta
    "#00ffff", // Cyan
    "#ffff00", // Yellow
    "#ff4000", // Red-orange
    "#40ff00", // Lime green
    "#0040ff", // Royal blue
    "#ff0040"  // Rose red
  ];

  // Country coordinates (approximate centers)
  const chinaLat = 35.8617;
  const chinaLng = 104.1954;
  
  const usaLat = 39.8283; // USA center
  const usaLng = -98.5795;
  
  const canadaLat = 56.1304; // Canada center
  const canadaLng = -106.3468;
  
  const cambodiaLat = 12.5657; // Cambodia center
  const cambodiaLng = 104.9910;
  
  const japanLat = 36.2048; // Japan center
  const japanLng = 138.2529;
  
  const australiaLat = -25.2744; // Australia center
  const australiaLng = 133.7751;
  
  const newZealandLat = -40.9006; // New Zealand center
  const newZealandLng = 174.8860;

  const sampleArcs = [
    // China to USA
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: usaLat,
      endLng: usaLng,
      arcAlt: 0.3,
      color: colors[0],
    },
    // China to Canada
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: canadaLat,
      endLng: canadaLng,
      arcAlt: 0.3,
      color: colors[1],
    },
    // China to Cambodia
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: cambodiaLat,
      endLng: cambodiaLng,
      arcAlt: 0.3,
      color: colors[2],
    },
    // China to Japan
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: japanLat,
      endLng: japanLng,
      arcAlt: 0.3,
      color: colors[3],
    },
    // China to Australia
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: australiaLat,
      endLng: australiaLng,
      arcAlt: 0.3,
      color: colors[4],
    },
    // China to New Zealand
    {
      order: 1,
      startLat: chinaLat,
      startLng: chinaLng,
      endLat: newZealandLat,
      endLng: newZealandLng,
      arcAlt: 0.3,
      color: colors[5],
    }
  ];

  return (
    <div className='w-screen flex h-screen '>
      <Navbar />
      <div 
        className="h-full  w-full overflow-hidden"
        style={{
          background: `
            radial-gradient(circle, rgb(0, 0, 0) 0px, #01010100 100%),
            linear-gradient(0deg, rgb(191, 191, 189), #000000f0 70%)
          `
        }}
      >
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 xl:pl-36 py-8 lg:py-0">
            <div className="mb-8 lg:mb-12">
              {/* Main Title */}
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[6vw]  font-extralight tracking-widest text-white mb-4 lg:mb-6 leading-tight">
              PRISM 瓴境
              </h1>
              
              {/* Subtitle */}
              <div className="text-gray-300 text-lg sm:text-2xl md:text-3xl lg:text-[5vh]  mb-6 lg:mb-8 max-w-lg leading-relaxed">
                <div className="block">品牌全球化重构</div>
                <div className="block pl-4 sm:pl-6 lg:pl-12">纳米技术赋能</div>
                <div className="block pl-8 sm:pl-12 lg:pl-24">全球渠道落地</div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 sm:space-y-0">
                <button className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-opacity-90 transition-all">
                  Speak to an Expert
                </button>
                <button className="border border-white text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
                  Our Platform
                </button>
              </div>
            </div>
          </div>

          {/* Globe Section */}
          <div className="w-full lg:w-1/2  h-screen  flex items-center justify-center relative">
            <div className="w-full h-full max-w-md lg:max-w-full">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full text-white text-sm sm:text-base">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                  Loading Globe...
                </div>
              }>
                <World data={sampleArcs} globeConfig={globeConfig} />          </Suspense>
            </div>
          </div>
        </div>
      </div>


{/* <svg xmlns="http://www.w3.org/2000/svg" className=' absolute  w-full h-full'  fill="none">
  <mask id="a" width="1729" height="1802" x="0" y="0" maskUnits="userSpaceOnUse" style={{maskType: 'alpha'}}>
    <path fill="#D9D9D9" d="M0 0h1728v1800.83H0z" style={{fill: '#d9d9d9', fillOpacity: 1}} transform="matrix(-1 0 0 1 1728.71 .863)"/>
  </mask>
  <g mask="url(#a)">
    <g filter="url(#b)">
      <path fill="#FF7300" d="M243.146 442.489C56.421 296.6-247.47 322.512-376.076 353.704l179.126 923.906H851.931l944.119 33.15 265.09-728.258c5.7-7.723-39.35-65.812-265.09-236.39-282.19-213.223-705.48-75.755-838.158 97.211-132.674 172.966-481.339 181.526-714.746-.834Z" style={{fill: '#ff7300', fillOpacity: 1}}/>
    </g>
    <g filter="url(#c)">
      <path stroke="red" strokeWidth="71" d="M2061.14 582.5c5.7-7.723-39.35-65.812-265.1-236.39-282.18-213.223-705.47-75.755-838.149 97.211-132.674 172.966-481.339 181.526-714.745-.834C56.42 296.599-247.472 322.51-376.077 353.701" style={{stroke: 'red', strokeOpacity: 1}}/>
    </g>
    <g filter="url(#d)" opacity="0.5">
      <path stroke="red" strokeWidth="71" d="M2061.13 531.531c5.7-7.722-39.35-65.812-265.09-236.39-282.18-213.223-705.48-75.755-838.156 97.211-229.419 299.09-481.34 181.526-714.746-.834C56.412 245.63-247.479 271.541-376.085 302.732" style={{stroke: 'red', strokeOpacity: 1}}/>
    </g>
    <g filter="url(#e)">
      <path fill="#fff" d="M-478.381 1420.69c0 2117.34 655.442 1664.27 1382.846 1664.27 727.405 0 1251.315 143.55 1251.315-1664.27 0-267.57-589.68-484.482-1317.08-484.482-727.404 0-1317.081 216.912-1317.081 484.482Z" style={{fill: '#fff', fillOpacity: 1}}/>
    </g>
  </g>
  <defs>
    <filter id="b" width="2845.68" height="1481.29" x="-580.078" y="33.467" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur result="effect1_foregroundBlur_760_56865" stdDeviation="102"/>
    </filter>
    <filter id="c" width="2889.54" height="817.69" x="-588.445" y="-2.023" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur result="effect1_foregroundBlur_760_56865" stdDeviation="102"/>
    </filter>
    <filter id="d" width="2889.54" height="867.63" x="-588.453" y="-52.992" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur result="effect1_foregroundBlur_760_56865" stdDeviation="102"/>
    </filter>
    <filter id="e" width="3202.16" height="2757.44" x="-762.383" y="652.208" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur result="effect1_foregroundBlur_760_56865" stdDeviation="142"/>
    </filter>
  </defs>
</svg> */}

    </div>
  );
};

export default LandingPage;