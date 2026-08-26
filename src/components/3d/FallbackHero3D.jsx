import React, { useRef, useEffect } from 'react';

export const FallbackHero3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 20;

      // Draw metallic reflection floor grid
      ctx.strokeStyle = 'rgba(230, 198, 135, 0.08)';
      ctx.lineWidth = 1;
      for (let i = -canvas.width; i < canvas.width * 2; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height);
        ctx.lineTo(centerX + (i - centerX) * 0.2, centerY);
        ctx.stroke();
      }

      // Rotating glow aura
      angle += 0.008;
      const glowGrad = ctx.createRadialGradient(
        centerX + Math.cos(angle) * 30,
        centerY + Math.sin(angle) * 20,
        10,
        centerX,
        centerY,
        Math.min(canvas.width, canvas.height) * 0.45
      );
      glowGrad.addColorStop(0, 'rgba(230, 198, 135, 0.18)');
      glowGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
      glowGrad.addColorStop(1, 'rgba(11, 13, 15, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, canvas.width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Stylized 3D luxury sports car wireframe projection
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1 + Math.sin(angle) * 0.03, 1);

      // Car body silhouette curve
      ctx.beginPath();
      ctx.moveTo(-220, 20);
      ctx.bezierCurveTo(-210, -10, -140, -25, -70, -35); // Front hood
      ctx.bezierCurveTo(-20, -75, 40, -75, 90, -35); // Windshield & roof
      ctx.bezierCurveTo(150, -25, 200, 0, 220, 20); // Fastback tail
      ctx.bezierCurveTo(210, 40, 170, 45, 120, 45); // Rear bumper
      ctx.arc(90, 45, 25, 0, Math.PI, true); // Rear wheel arch
      ctx.lineTo(-80, 45);
      ctx.arc(-110, 45, 25, 0, Math.PI, true); // Front wheel arch
      ctx.lineTo(-220, 20);

      ctx.strokeStyle = '#E6C687';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#E6C687';
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Glass windshield highlight
      ctx.beginPath();
      ctx.moveTo(-60, -32);
      ctx.lineTo(-20, -65);
      ctx.lineTo(40, -65);
      ctx.lineTo(80, -32);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Wheel rims
      ctx.fillStyle = '#16191E';
      ctx.strokeStyle = '#C5A059';
      ctx.lineWidth = 3;
      
      // Front wheel
      ctx.beginPath();
      ctx.arc(-110, 45, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Rear wheel
      ctx.beginPath();
      ctx.arc(90, 45, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-dark-950/80 border border-gold-500/30 text-[10px] uppercase font-mono text-gold-400">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" /> Interactive 2D Studio Mode Active
      </div>
    </div>
  );
};
