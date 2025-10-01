"use client";

import React from 'react';

const AwardsAndBrands = () => {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Awards & Recognition Section */}
        <div className="space-y-6 flex flex-col h-full">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase font-scifi text-center">
            Awards & Recognition
          </h3>
          <div className="bg-white/50 p-6 backdrop-blur-sm border border-white/40 flex-1 flex items-center">
            <div className="relative overflow-hidden w-full">
              <img
                src="/Logos/Awards.png"
                alt="Design Awards and Recognition including Red Dot Award, iF Design Award, Great Wall Awards, and more"
                className="w-full h-auto object-contain grayscale contrast-150 brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100 hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  console.error('Failed to load Awards.png');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Brand Partners Section */}
        <div className="space-y-6 flex flex-col h-full">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase font-scifi text-center">
            Brand Partners
          </h3>
          <div className="bg-white/50 p-6 backdrop-blur-sm border border-white/20 flex-1 flex items-center">
            <div className="relative overflow-hidden w-full">
              <img
                src="/Logos/Brands.png"
                alt="Brand Partners including Philips, KFC, Haier, Nescafé, and many other leading brands"
                className="w-full h-auto object-contain grayscale contrast-150 brightness-110 hover:grayscale-0 hover:contrast-100 hover:brightness-100 hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  console.error('Failed to load Brands.png');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsAndBrands;
