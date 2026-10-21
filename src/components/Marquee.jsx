import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const DEFAULT_ITEMS = [
  'frame by frame',
  'cut on the beat',
  'colour first, vfx never',
  'made in kolkata',
  'no presets'
];

export default function Marquee({ items = DEFAULT_ITEMS }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const repeated = items.concat(items).concat(items);

  return (
    <section className="marquee" aria-hidden ref={ref}>
      <motion.div className="marquee__shift" style={{ x }}>
        <motion.div
          className="marquee__track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {repeated.map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '50px' }}>
              <span>{t.toUpperCase()}</span>
              <span className="m-dot">✺</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
