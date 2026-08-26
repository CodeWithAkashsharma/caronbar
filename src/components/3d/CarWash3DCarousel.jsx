import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Flame, Shield, Droplets, Wrench, Sparkle } from 'lucide-react';

const PROCESS_STEPS = [
  {
    id: 1,
    tag: 'SNOW CANNON',
    title: 'CRETA & SUV WASH',
    description: 'High-pressure soft water rinse & thick snow foam bath for SUVs.',
    image: '/carousel/slide1_creta_foam.webp',
    icon: Flame,
    metric: 'Creta / Brezza',
  },
  {
    id: 2,
    tag: 'PRESSURE FOAM',
    title: 'SEDAN FOAM BATH',
    description: 'Dense pH-neutral snow foam bath, wheel cleaning & pressure rinse.',
    image: '/carousel/slide2_sedan_foam.webp',
    icon: Droplets,
    metric: 'Dzire / City',
  },
  {
    id: 3,
    tag: 'MOBILE DETAILER',
    title: 'PREMIUM CAR CARE',
    description: 'Scratch-free two-bucket hand wash, alloy wheel shine & tire gloss.',
    image: '/carousel/slide3_audi_detail.webp',
    icon: Shield,
    metric: 'Audi / Luxury',
  },
  {
    id: 4,
    tag: 'CHASSIS RINSE',
    title: 'UNDERBODY BLAST',
    description: 'High-pressure soft water jet blasting road mud & alloy dirt.',
    image: '/carousel/slide4_wheel_blast.webp',
    icon: Wrench,
    metric: 'Mud Blast',
  },
  {
    id: 5,
    tag: '160°C STEAM',
    title: 'CABIN STEAM CLEAN',
    description: 'Hot steam extraction for seats, carpets & antibacterial AC clean.',
    image: '/carousel/slide5_interior_steam.webp',
    icon: Sparkles,
    metric: '160°C Sanitized',
  },
  {
    id: 6,
    tag: 'DOORSTEP CARE',
    title: 'HATCHBACK POLISH',
    description: 'Scratch-free microfiber wipe, deep shine polish & interior vacuum.',
    image: '/carousel/slide6_baleno_wipe.webp',
    icon: Sparkle,
    metric: 'Baleno / Swift',
  },
];

export const CarWash3DCarousel = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [stageWidth, setStageWidth] = useState(550);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const stageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const rotationRef = useRef(0);
  const animFrameRef = useRef(null);

  const totalCards = PROCESS_STEPS.length;
  const angleStep = 360 / totalCards;

  // Track window resize to evaluate exact screen width breakpoints accurately
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track container width for responsive logic below 1300px
  useEffect(() => {
    if (!stageRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setStageWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  const is1800Plus = windowWidth >= 1800;
  const is1300To1800 = windowWidth >= 1300 && windowWidth < 1800;
  const is1500To1800 = windowWidth >= 1500 && windowWidth < 1800;
  const isUnder600 = windowWidth < 600;
  const shiftRightClass = is1500To1800 ? 'translate-x-6 lg:translate-x-10' : '';
  const topSpaceClass = isUnder600 ? '-mt-4' : '';

  // Multi-breakpoint layout logic
  let radiusZ = 135;
  let cardWidthPx = 145;

  if (is1800Plus) {
    radiusZ = 295;
    cardWidthPx = 245;
  } else if (is1300To1800) {
    // 1300px to 1800px ONLY: Decreased gap a little more
    radiusZ = 275;
    cardWidthPx = 265;
  } else if (stageWidth < 450) {
    radiusZ = 135;
    cardWidthPx = 145;
  } else if (stageWidth < 530) {
    radiusZ = 165;
    cardWidthPx = 160;
  } else if (stageWidth < 800) {
    radiusZ = 205;
    cardWidthPx = 185;
  } else if (stageWidth < 1024) {
    radiusZ = 235;
    cardWidthPx = 205;
  } else {
    // Below 1300px
    radiusZ = 265;
    cardWidthPx = 225;
  }

  const isMobile = stageWidth < 480;

  // Continuous infinite 60fps rotation loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isDraggingRef.current) {
        rotationRef.current = (rotationRef.current + delta * 36) % 360;
        setRotationAngle(rotationRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Drag interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    setStartX(clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    const diff = currentX - startX;

    rotationRef.current = (rotationRef.current + diff * 0.45 + 360) % 360;
    setRotationAngle(rotationRef.current);
    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={stageRef}
      className={`relative w-full ${topSpaceClass} ${is1800Plus
        ? 'h-[530px] flex items-center justify-end'
        : is1300To1800
          ? 'h-[500px] flex items-center justify-center'
          : isUnder600
            ? 'h-[270px] flex items-center justify-center'
            : 'h-[330px] lg:h-[400px] flex items-center justify-center sm:pt-5 lg:pt-0'
        } pointer-events-auto select-none overflow-visible ${shiftRightClass}`}
    >

      {/* Perspective 3D Stage Container */}
      <div
        className={`w-full h-full flex items-center ${is1800Plus ? 'justify-end' : 'justify-center'} cursor-grab active:cursor-grabbing overflow-visible`}
        style={{ perspective: isMobile ? '680px' : '1100px', perspectiveOrigin: is1800Plus ? '70% 50%' : '50% 50%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >

        {/* 3D Cylindrical Ring Container */}
        <div
          className={`relative ${is1800Plus ? 'h-[335px]' : is1300To1800 ? 'h-[315px]' : isUnder600 ? 'h-[175px]' : 'h-[195px] lg:h-[225px]'
            } overflow-visible`}
          style={{
            width: `${cardWidthPx}px`,
            transformStyle: 'preserve-3d',
            transform: is1800Plus
              ? `rotateX(10deg) rotateY(${-14 + rotationAngle}deg)`
              : `rotateX(8deg) rotateY(${rotationAngle}deg)`,
          }}
        >
          {PROCESS_STEPS.map((stepItem, index) => {
            const cardAngle = - index * angleStep;
            const IconComp = stepItem.icon;

            // Calculate card orientation relative to camera angle
            const totalAngle = (cardAngle + rotationAngle) % 360;
            const rad = (totalAngle * Math.PI) / 180;
            const cosZ = Math.cos(rad);
            const isFrontSide = cosZ > -0.2;

            // Calculate active center focus highlight
            const currentNormalized = ((rotationAngle % 360) + 360) % 360;
            const targetNorm = ((index * angleStep) % 360 + 360) % 360;
            let diff = Math.abs(currentNormalized - targetNorm);
            if (diff > 180) diff = 360 - diff;
            const isCenterActive = diff < angleStep / 2;

            return (
              <div
                key={stepItem.id}
                className={`absolute inset-0 rounded-lg sm:rounded-2xl p-2 sm:p-3 transition-all duration-300 flex flex-col justify-between border ${isCenterActive
                  ? 'bg-[#1E2633] border-[#8B182B] shadow-[0_8px_30px_rgba(139,24,43,0.6)] scale-105 z-30 opacity-100'
                  : isFrontSide
                    ? 'bg-[#18202C] border-white/20 z-20 opacity-90'
                    : 'bg-[#121720] border-white/10 z-10 opacity-35 scale-95'
                  }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${cardAngle}deg) translateZ(${radiusZ}px)`,
                  backfaceVisibility: 'visible',
                  WebkitBackfaceVisibility: 'visible',
                }}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-start z-10">
                  <span className="text-[7.5px] sm:text-[9px] font-mono font-black tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-[#8B182B] text-white">
                    {stepItem.tag}
                  </span>
                </div>

                {/* Direct Process Image */}
                <div className={`relative w-full ${is1800Plus ? 'h-[190px]' : is1300To1800 ? 'h-[175px]' : isUnder600 ? 'h-[90px]' : 'h-[95px] lg:h-[110px]'
                  } rounded-md sm:rounded-xl overflow-hidden my-1 group border border-white/15 bg-[#08090d]`}>
                  <img
                    src={stepItem.image}
                    alt={stepItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 text-[7.5px] sm:text-[9px] font-display font-black italic uppercase tracking-wider text-white bg-[#0b0c0e]/85 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/15 shadow-md">
                    {stepItem.title}
                  </span>
                </div>

                {/* Step Description */}
                <div className="text-left z-10">
                  <p className="font-sans text-[7.5px] sm:text-[10px] text-gray-300 line-clamp-2 leading-tight">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
