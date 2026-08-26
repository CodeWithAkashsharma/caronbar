import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Loader2 } from 'lucide-react';

export const HeroCar3D = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="absolute top-0 right-0 w-full md:w-[60%] lg:w-[55%] h-full pointer-events-auto z-0 overflow-hidden">
      
      {/* Loading Spinner Fallback */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0c0e] z-10 space-y-3">
          <Loader2 className="w-8 h-8 text-[#E05638] animate-spin" />
          <span className="text-xs font-display font-black italic tracking-widest text-white uppercase">
            LOADING 3D SCENE...
          </span>
        </div>
      )}

      {/* Full-Height Right Background 3D Spline Scene */}
      <Spline 
        scene="https://prod.spline.design/XqZy9ttH0SjRq7Lj/scene.splinecode" 
        onLoad={handleLoad}
        className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
      />

    </div>
  );
};
