import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [, force] = useState(0);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const move = e => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const hoverIn = e => {
      const t = e.target.closest('[data-cursor], a, button, .work-row, .svc, .tool');
      if (!t) return;
      ringRef.current?.classList.add('is-hover');
      dotRef.current?.classList.add('is-hover');
      const txt = t.getAttribute('data-cursor');
      if (labelRef.current) labelRef.current.textContent = txt || '';
    };
    const hoverOut = e => {
      const t = e.target.closest('[data-cursor], a, button, .work-row, .svc, .tool');
      if (!t) return;
      ringRef.current?.classList.remove('is-hover');
      dotRef.current?.classList.remove('is-hover');
      if (labelRef.current) labelRef.current.textContent = '';
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', hoverIn);
    document.addEventListener('mouseout', hoverOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', hoverIn);
      document.removeEventListener('mouseout', hoverOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef}><span ref={labelRef} /></div>
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}
