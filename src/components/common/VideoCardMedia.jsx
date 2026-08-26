import React from 'react';

export const VideoCardMedia = ({ image, alt, duration, className = '' }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden group cursor-pointer bg-[#07090a] ${className}`}>
      {/* High-Resolution Service Image */}
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e10]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
    </div>
  );
};
