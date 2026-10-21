import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const SWAP = ['that breathe', 'that bleed', 'that linger', 'that move'];

export default function Hero() {
  const heroRef = useRef(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % SWAP.length), 2400);
    return () => clearInterval(id);
  }, []);

  // scroll progress through the hero only
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // BACKGROUND CHARACTER — scales down, drifts up, blurs, fades into the bg
  const visualScale   = useTransform(scrollYProgress, [0, 1], [1, 0.52]);
  const visualY       = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.45, 0.08]);
  const blurPx        = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const visualFilter  = useMotionTemplate`blur(${blurPx}px)`;

  // FOREGROUND CONTENT — gentler parallax so depth reads as real
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const rise = (delay) => ({
    initial: { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 1.1, delay, ease: [0.6, 0.05, 0.1, 1] }
  });

  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* SCROLL-DRIVEN BACKGROUND CHARACTER */}
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
          src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=2400&q=85"
          onError={e => { e.currentTarget.src = '/hero-portrait.svg'; }}
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
          <span>independent video editor · est. 2020 · kolkata, india</span>
        </motion.div>

        <h1 className="hero__title">
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} {...rise(0.7)}>I&nbsp;cut</motion.span>
          </span>
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} {...rise(0.85)}>
              <em>moments</em>&nbsp;into
            </motion.span>
          </span>
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} {...rise(1.0)}>
              stor<em>i</em>es&nbsp;
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

        <motion.div
          className="hero__sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <p>
            A solo edit suite out of <strong>Kolkata</strong>, run by <strong>ANX</strong>.
            I cut <strong>cinematic brand films</strong>, <strong>music videos</strong>, and the
            occasional <strong>short-form chaos</strong> for the scroll. Story first, frame second, kerning third.
          </p>
          <div className="hero__cta">
            <a href="#work" className="btn btn--primary" data-magnet data-cursor="watch">see the reel</a>
            <a href="#contact" className="btn btn--ghost" data-magnet data-cursor="email">start a project</a>
          </div>
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <span className="hero__scroll-line" />
          <span>scroll, gently</span>
        </motion.div>

        {/* spinning film-reel sticker */}
        <motion.div
          className="sticker"
          aria-hidden
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.6, 0.05, 0.1, 1] }}
        >
          <div className="sticker__spin">
            <svg viewBox="0 0 200 200">
              <defs><path id="circ1" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" /></defs>
              <text fontFamily="JetBrains Mono" fontSize="13" letterSpacing="5">
                <textPath href="#circ1">● CUT · COLOUR · SOUND · STORY · CUT · COLOUR · SOUND · STORY · </textPath>
              </text>
            </svg>
          </div>
          <span className="sticker__core">feel<br/>it</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
