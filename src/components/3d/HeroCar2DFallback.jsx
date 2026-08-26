import React, { useRef, useEffect } from 'react';

export const HeroCar2DFallback = () => {
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
      const centerY = canvas.height / 2 + 30;

      // Soft ambient light halo behind car
      angle += 0.005;
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY - 20,
        10,
        centerX,
        centerY,
        Math.min(canvas.width, canvas.height) * 0.5
      );
      glowGrad.addColorStop(0, 'rgba(197, 160, 89, 0.12)');
      glowGrad.addColorStop(0.5, 'rgba(107, 122, 99, 0.08)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 20, canvas.width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Ambient contact shadow floor
      const shadowGrad = ctx.createRadialGradient(centerX, centerY + 50, 10, centerX, centerY + 50, 260);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 50, 240, 30, 0, 0, Math.PI * 2);
      ctx.fill();

      // Stylized 3D luxury sports car outline naturally integrated into scene
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1.05 + Math.sin(angle) * 0.02, 1.05);

      // Car body silhouette curve
      ctx.beginPath();
      ctx.moveTo(-220, 20);
      ctx.bezierCurveTo(-210, -10, -140, -25, -70, -35); // Front hood
      ctx.bezierCurveTo(-20, -75, 40, -75, 90, -35); // Windshield & roof
      ctx.bezierCurveTo(150, -25, 200, 0, 220, 20); // Rear fastback
      ctx.bezierCurveTo(210, 40, 170, 45, 120, 45);
      ctx.arc(90, 45, 25, 0, Math.PI, true);
      ctx.lineTo(-80, 45);
      ctx.arc(-110, 45, 25, 0, Math.PI, true);
      ctx.lineTo(-220, 20);

      ctx.strokeStyle = '#C5A059';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Windshield optical accent
      ctx.beginPath();
      ctx.moveTo(-60, -32);
      ctx.lineTo(-20, -65);
      ctx.lineTo(40, -65);
      ctx.lineTo(80, -32);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(107, 122, 99, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Wheels
      ctx.fillStyle = '#262A28';
      ctx.strokeStyle = '#E3C896';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(-110, 45, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

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
    <div className="w-full h-full min-h-[420px] lg:min-h-[550px] relative pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
