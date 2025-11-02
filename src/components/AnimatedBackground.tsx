import { useEffect, useRef } from 'react';

// A subtle animated gradient background using a few floating circles.
const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Create a few floating blobs (divs) with CSS animation. Keep them non-interactive and low-contrast.
    const blobs: HTMLDivElement[] = [];
    const colors = ['rgba(99,102,241,0.08)', 'rgba(6,182,212,0.06)', 'rgba(236,72,153,0.05)'];

    for (let i = 0; i < 3; i++) {
      const b = document.createElement('div');
      b.style.position = 'absolute';
      b.style.borderRadius = '50%';
      b.style.filter = 'blur(40px)';
      b.style.opacity = '0.9';
      b.style.pointerEvents = 'none';
      b.style.width = `${200 + i * 120}px`;
      b.style.height = `${200 + i * 120}px`;
      b.style.left = `${10 + i * 25}%`;
      b.style.top = `${5 + i * 15}%`;
      b.style.background = colors[i % colors.length];
      b.style.zIndex = '0';
      b.style.transition = 'transform 8s ease-in-out';

      el.appendChild(b);
      blobs.push(b);
    }

    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.0025;
      blobs.forEach((b, idx) => {
        const tx = Math.sin(t * (0.6 + idx * 0.15)) * (10 + idx * 6);
        const ty = Math.cos(t * (0.5 + idx * 0.12)) * (8 + idx * 6);
        b.style.transform = `translate(${tx}px, ${ty}px) scale(${1 + idx * 0.02})`;
      });
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      blobs.forEach((b) => b.remove());
    };
  }, []);

  // Use z-0 so the blobs sit behind content but above page background colors; parent will be made relative.
  return <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0" />;
};

export default AnimatedBackground;
