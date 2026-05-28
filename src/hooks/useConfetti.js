import { useRef, useCallback } from 'react';

const COLORS = ['#5DCAA5', '#C8973A', '#F0C97A', '#E1F5EE', '#085041', '#ffffff', '#D4A853'];

export function useConfetti() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  const launch = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 300,
      w: 6 + Math.random() * 9,
      h: 10 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.14,
      vy: 2.5 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 2.5,
      alpha: 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let anyAlive = false;
      pieces.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rotV;
        if (p.y > canvas.height) p.alpha = Math.max(0, p.alpha - 0.04);
        if (p.alpha > 0) anyAlive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (anyAlive) frameRef.current = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    draw();
  }, []);

  return { canvasRef, launch };
}
