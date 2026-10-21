import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';

const SWAP = ['that convert', 'that demand eyes', 'that set the mood', 'that tell stories'];

export default function DesignHero() {
  const heroRef = useRef(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % SWAP.length), 2400);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const visualScale   = useTransform(scrollYProgress, [0, 1], [1, 0.52]);
  const visualY       = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.45, 0.08]);
  const blurPx        = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const visualFilter  = useMotionTemplate`blur(${blurPx}px)`;

  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const rise = delay => ({
    initial: { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 1.1, delay, ease: [0.6, 0.05, 0.1, 1] }
  });

  return (
    <section className="hero hero--design" id="top" ref={heroRef}>
      {/* SCROLL-DRIVEN BACKGROUND ART */}
      <motion.div
        className="hero__visual"
        style={{
          scale: visualScale,
          y: visualY,
          opacity: visualOpacity,
          filter: visualFilter
        }}
        aria-hidden
      >
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="hero__visual-img"
          draggable={false}
        />
        <div className="hero__visual-tint" />
      </motion.div>

      {/* FOREGROUND CONTENT */}
      <motion.div
        className="hero__content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="hero__tag"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <span className="dot" />
          <span>visual designer · thumbnails &amp; key art · kolkata, india</span>
        </motion.div>

        <h1 className="hero__title">
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} {...rise(0.7)}>I&nbsp;craft</motion.span>
          </span>
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} {...rise(0.85)}>
              <em>visuals</em>&nbsp;
            </motion.span>
          </span>
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} {...rise(1.0)}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={SWAP[i]}
                  className="swap"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: [0.6, 0.05, 0.1, 1] }}
                  style={{ display: 'inline-block' }}
                >{SWAP[i]}</motion.span>
              </AnimatePresence>
              <span className="cursorblink">_</span>
            </motion.span>
          </span>
        </h1>

        <div className="hero__sub">
          <p>
            High-CTR YouTube packaging, visual storytelling, and cinematic posters tailored for creators, channels, and films. Powered by Adobe Photoshop, Canva, and Adobe Express.
          </p>

          <div className="hero__cta">
            <a href="#thumbnails" className="btn btn--primary" data-cursor="view">
              <span>explore thumbnails ↓</span>
            </a>
            <a href="#posters" className="btn btn--ghost" data-cursor="posters">
              <span>view posters ↓</span>
            </a>
            <Link to="/" className="btn btn--ghost hero__route-switch" data-cursor="videos">
              <span>🎬 video portfolio →</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
