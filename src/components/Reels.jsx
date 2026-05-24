import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

/* Documentaries — long-form horizontal content */
const DOCUMENTARIES = [
  { id: 'jNQXAC9IVRw', title: 'Urban Stories',     type: 'documentary', year: '25', client: 'Independent' },
  { id: 'DWcJFNfaw54', title: 'Journey Through Time', type: 'documentary', year: '25', client: 'Archive Films' },
  { id: 'C0DPdy98e4c', title: 'Behind the Scenes', type: 'documentary', year: '24', client: 'Production House' }
];

/* Reels — short-form vertical cuts */
const REELS = [
  { id: '8xJ8rj6Ml6w', title: 'Summer Vibes',     type: 'brand film',   year: '25', client: 'Patagonia · spec' },
  { id: '0blQ3jGHYEo', title: 'Beat Sync',      type: 'music video', year: '25', client: 'indie label' },
  { id: 'BdeeiAu-2aA', title: 'Moments',     type: 'campaign',     year: '24', client: 'Creative Agency' },
  { id: 'WmQC0-K7WVo', title: 'Product Launch',    type: 'product film', year: '24', client: 'E-commerce' }
];

const ytThumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const ytFallback = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const VideoStrip = ({ videos, title, format = 'vertical' }) => {
  const stripRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const isHorizontal = format === 'horizontal';

  /* track scroll position to enable/disable arrows */
  const updateEdges = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const atStart = strip.scrollLeft <= 2;
    const atEnd = Math.ceil(strip.scrollLeft + strip.clientWidth) >= strip.scrollWidth - 2;
    setCanPrev(!atStart);
    setCanNext(!atEnd);
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    updateEdges();
    strip.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      strip.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  /* click-to-advance one card width */
  const scrollByCard = useCallback(dir => {
    const strip = stripRef.current;
    if (!strip) return;
    const card = strip.querySelector('.reel');
    if (!card) return;
    const gap = 22;
    const step = card.offsetWidth + gap;
    strip.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  /* drag-to-scroll for desktop mice */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let down = false, startX = 0, scrollLeft = 0;

    const onDown = e => {
      if (e.target.closest('.reels__arrow')) return;
      down = true;
      strip.classList.add('is-dragging');
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    };
    const onUp = () => { down = false; strip.classList.remove('is-dragging'); };
    const onMove = e => {
      if (!down) return;
      e.preventDefault();
      const walk = (e.pageX - strip.offsetLeft - startX) * 1.4;
      strip.scrollLeft = scrollLeft - walk;
    };

    strip.addEventListener('mousedown', onDown);
    strip.addEventListener('mouseleave', onUp);
    strip.addEventListener('mouseup', onUp);
    strip.addEventListener('mousemove', onMove);
    return () => {
      strip.removeEventListener('mousedown', onDown);
      strip.removeEventListener('mouseleave', onUp);
      strip.removeEventListener('mouseup', onUp);
      strip.removeEventListener('mousemove', onMove);
    };
  }, []);

  const ArrowSvg = ({ dir }) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
         stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === 'prev' ? 'M15 18L9 12L15 6' : 'M9 6L15 12L9 18'} />
    </svg>
  );

  return (
    <motion.div
      className={`reels__viewport ${isHorizontal ? 'reels__viewport--horizontal' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.6,0.05,0.1,1] }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="reels__strip" ref={stripRef}>
        <div className="reels__track">
          {videos.map((r, i) => (
            <motion.a
              key={i}
              href={`https://www.youtube.com/watch?v=${r.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`reel reel--${format}`}
              data-cursor="play"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.6,0.05,0.1,1] }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="reel__media">
                <img
                  src={ytThumb(r.id)}
                  onError={e => { if (!e.currentTarget.dataset.fallback) { e.currentTarget.src = ytFallback(r.id); e.currentTarget.dataset.fallback = '1'; } }}
                  alt={r.title}
                  loading="lazy"
                  draggable={false}
                />
                <div className="reel__media-overlay" />
                <div className="reel__play" aria-hidden>
                  <svg viewBox="0 0 64 64" width="64" height="64">
                    <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
                    <path d="M 26 22 L 44 32 L 26 42 Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="reel__chip">{r.type}</span>
              </div>
              <div className="reel__meta">
                <span className="reel__sub">
                  <span>{r.client}</span>
                  <span>'{r.year}</span>
                </span>
                <h3 className="reel__title">{r.title}</h3>
              </div>
            </motion.a>
          ))}
          <div className={`reels__end ${isHorizontal ? 'reels__end--horizontal' : ''}`}>
            <div>
              <span className="reels__end-num">/end</span>
              <p>more {title.toLowerCase()} on YouTube — say hi for the full link.</p>
              <a href="#contact" className="btn btn--ghost" data-cursor="say hi">start a project →</a>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="reels__arrow reels__arrow--prev"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        aria-label={`Previous ${title.toLowerCase()}`}
        data-cursor="prev"
      >
        <ArrowSvg dir="prev" />
      </button>
      <button
        type="button"
        className="reels__arrow reels__arrow--next"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        aria-label={`Next ${title.toLowerCase()}`}
        data-cursor="next"
      >
        <ArrowSvg dir="next" />
      </button>
    </motion.div>
  );
};

export default function Reels() {
  const sectionRef = useRef(null);

  return (
    <section className="reels" id="work" ref={sectionRef}>
      {/* DOCUMENTARIES SECTION */}
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6,0.05,0.1,1] }} viewport={{ once: true, amount: 0.4 }}
      >
        <span className="section-num">/02</span>
        <h2 className="section-title">documentaries</h2>
        <p className="section-kicker">Long-form storytelling. Tap the arrows or drag — then click to watch.</p>
      </motion.div>
      <VideoStrip videos={DOCUMENTARIES} title="Documentaries" format="horizontal" />

      {/* REELS SECTION */}
      <motion.div
        className="section-head"
        style={{ marginTop: '100px' }}
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6,0.05,0.1,1] }} viewport={{ once: true, amount: 0.4 }}
      >
        <span className="section-num">/03</span>
        <h2 className="section-title">reels</h2>
        <p className="section-kicker">Short-form vertical cuts. Tap the arrows or drag — then click to watch.</p>
      </motion.div>
      <VideoStrip videos={REELS} title="Reels" format="vertical" />

      <motion.div
        className="reels__hint"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
      >
        <span className="reels__hint-bar" />
        <span>arrows · drag · click</span>
        <span className="reels__hint-bar" />
      </motion.div>
    </section>
  );
}
