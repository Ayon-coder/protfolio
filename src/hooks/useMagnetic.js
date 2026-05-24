import { useEffect } from 'react';

export default function useMagnetic() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-magnet]');

    const onMove = (el) => (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
    };
    const onLeave = (el) => () => { el.style.transform = ''; };

    const handlers = [];
    els.forEach(el => {
      const m = onMove(el);
      const l = onLeave(el);
      el.addEventListener('mousemove', m);
      el.addEventListener('mouseleave', l);
      handlers.push([el, m, l]);
    });
    return () => handlers.forEach(([el, m, l]) => {
      el.removeEventListener('mousemove', m);
      el.removeEventListener('mouseleave', l);
    });
  }, []);
}
