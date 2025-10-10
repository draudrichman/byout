import React from 'react';

// Simple tech page content component
// This displays information about the technology solutions
const TechPageContent = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Technology Solutions
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
            Advanced technology solutions for modern business challenges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* HPH Technology */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-3xl font-bold mb-4 text-blue-400">HPH Technology</h3>
            <p className="text-gray-300 mb-6">
              High Pressure Homogenization (HPH) technology for advanced food processing and material transformation.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Ultra-fine particle processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Enhanced bioavailability</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Improved product stability</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Energy-efficient processing</span>
              </li>
            </ul>
          </div>

          {/* PEF Technology */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <h3 className="text-3xl font-bold mb-4 text-purple-400">PEF Technology</h3>
            <p className="text-gray-300 mb-6">
              Pulsed Electric Field (PEF) technology for non-thermal food processing and preservation.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Non-thermal preservation</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Nutrient retention</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Extended shelf life</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Improved texture quality</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Applications */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold mb-8 text-center">Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <div className="text-5xl mb-4">🥛</div>
              <h4 className="text-xl font-semibold mb-2">Dairy Products</h4>
              <p className="text-gray-400">Enhanced homogenization and preservation</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <div className="text-5xl mb-4">🥗</div>
              <h4 className="text-xl font-semibold mb-2">Fresh Produce</h4>
              <p className="text-gray-400">Extended freshness without heat</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <div className="text-5xl mb-4">🍖</div>
              <h4 className="text-xl font-semibold mb-2">Meat Processing</h4>
              <p className="text-gray-400">Improved tenderness and quality</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 lg:p-12 rounded-2xl border border-blue-500/30">
          <h3 className="text-4xl font-bold mb-6 text-center">Why Choose Our Technology?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Industry Leading</h4>
                <p className="text-gray-400">Cutting-edge technology backed by research</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Proven Results</h4>
                <p className="text-gray-400">Successful implementations worldwide</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Sustainable</h4>
                <p className="text-gray-400">Energy-efficient and eco-friendly solutions</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold mb-1">Scalable</h4>
                <p className="text-gray-400">From pilot to industrial scale production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechPageContent;

