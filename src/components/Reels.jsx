import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

/* Documentaries — long-form horizontal content */
const DOCUMENTARIES = [
  {
    id: 'bSUHwuSJtgU',
    title: 'Video Editing Practice · Story',
    type: 'narrative demo',
    year: '25',
    client: 'ANX · Demo',
    description: 'Cinematic pacing, documentary-style montage, sound design, and color grading.'
  }
];

/* Reels — short-form vertical cuts (Demo & Practice Edits) */
const REELS = [
  { id: 'GgVXQiNIXps', title: 'Video Editing Practice',   type: 'practice demo',   year: '25', client: 'ANX · Demo' },
  { id: '7iod9TmGHlc', title: 'DaVinci Resolve Cut',      type: 'practice demo',   year: '25', client: 'ANX · Demo' },
  { id: '8eWKd64u7Uc', title: 'Rhythm & Sync Practice',   type: 'practice demo',   year: '25', client: 'ANX · Demo' },
  { id: '6lfGCdfH-kY', title: 'Infotainment & Facts Cut', type: 'practice demo',   year: '25', client: 'ANX · Demo' },
  { id: 'Itrdl58LNdE', title: 'How Zomato Makes Money',   type: 'motion graphics', year: '25', client: 'Business Explainer' }
];

/* hqdefault.jpg is 100% reliable for all YouTube videos & Shorts (no 404 delays) */
const ytThumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytMaxThumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

/* Video Modal — embeds and plays videos inside the site with mobile support */
function VideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!video) return null;
  const isHorizontal = video.format === 'horizontal';
  const ytUrl = video.format === 'vertical'
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <motion.div
      className="video-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div
        className="video-modal__backdrop"
        onClick={onClose}
        data-cursor="close"
        aria-label="Close modal"
      />

      <motion.div
        className={`video-modal__container ${
          isHorizontal ? 'video-modal__container--horizontal' : 'video-modal__container--vertical'
        }`}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.28, ease: [0.6, 0.05, 0.1, 1] }}
      >
        <div className="video-modal__header">
          <div className="video-modal__info">
            <span className="video-modal__chip">{video.type}</span>
            <span className="video-modal__title">{video.title}</span>
          </div>
          <div className="video-modal__actions">
            <a
              href={ytUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-modal__yt-link"
              data-cursor="open"
              title="Open directly on YouTube"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube ↗</span>
            </a>
            <button
              type="button"
              className="video-modal__close"
              onClick={onClose}
              data-cursor="close"
              aria-label="Close video modal"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="video-modal__player">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="video-modal__mobile-foot">
          <a
            href={ytUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-modal__mobile-open"
          >
            <span>Having trouble playing? Open in YouTube App</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Featured Documentary Spotlight Showcase */
function DocumentaryCinema({ video, onSelectVideo }) {
  return (
    <div className="cinema-spotlight">
      <div
        className="cinema-card"
        role="button"
        tabIndex={0}
        onClick={() => onSelectVideo({ ...video, format: 'horizontal' })}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectVideo({ ...video, format: 'horizontal' });
          }
        }}
        data-cursor="play"
      >
        <div className="cinema-card__media">
          <img
            src={ytMaxThumb(video.id)}
            onError={e => {
              if (!e.currentTarget.dataset.fallback) {
                e.currentTarget.src = ytThumb(video.id);
                e.currentTarget.dataset.fallback = '1';
              }
            }}
            alt={video.title}
            loading="lazy"
            draggable={false}
          />
          <div className="cinema-card__overlay" />
          <div className="cinema-card__badge-row">
            <span className="cinema-card__chip">Featured Work</span>
            <span className="cinema-card__year">'{video.year}</span>
          </div>
          <div className="cinema-card__play">
            <div className="cinema-card__play-pulse" />
            <div className="cinema-card__play-btn">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="cinema-card__play-text">Watch Story</span>
          </div>
        </div>

        <div className="cinema-card__meta">
          <div className="cinema-card__details">
            <span className="cinema-card__client">{video.client} · {video.type}</span>
            <h3 className="cinema-card__title">{video.title}</h3>
            <p className="cinema-card__desc">{video.description}</p>
          </div>
          <button
            type="button"
            className="btn btn--primary cinema-card__cta"
            onClick={e => {
              e.stopPropagation();
              onSelectVideo({ ...video, format: 'horizontal' });
            }}
          >
            <span>Play Video</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* Vertical Reels Strip with Mobile Swipe & Grid Toggle */
function ReelsStrip({ videos, onSelectVideo }) {
  const stripRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [mobileView, setMobileView] = useState('swipe'); // 'swipe' | 'grid'
  const isPointerDrag = useRef(false);
  const touchStartPos = useRef({ x: 0, y: 0 });

  /* Update arrows on scroll */
  const updateEdges = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const atStart = strip.scrollLeft <= 4;
    const atEnd = Math.ceil(strip.scrollLeft + strip.clientWidth) >= strip.scrollWidth - 4;
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

  /* Scroll card by card */
  const scrollByCard = useCallback(dir => {
    const strip = stripRef.current;
    if (!strip) return;
    const card = strip.querySelector('.reel');
    if (!card) return;
    const gap = 18;
    const step = card.offsetWidth + gap;
    strip.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  /* Mouse drag only for fine-pointer desktop devices */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    // Do NOT attach mouse-drag listeners on touchscreens
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = e => {
      if (e.target.closest('.reels__arrow') || e.target.closest('button')) return;
      isDown = true;
      isPointerDrag.current = false;
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      strip.classList.remove('is-dragging');
      setTimeout(() => { isPointerDrag.current = false; }, 60);
    };

    const onMouseUp = () => {
      isDown = false;
      strip.classList.remove('is-dragging');
      setTimeout(() => { isPointerDrag.current = false; }, 60);
    };

    const onMouseMove = e => {
      if (!isDown) return;
      const walk = e.pageX - strip.offsetLeft - startX;
      if (Math.abs(walk) > 6) {
        isPointerDrag.current = true;
        strip.classList.add('is-dragging');
      }
      e.preventDefault();
      strip.scrollLeft = scrollLeft - walk * 1.35;
    };

    strip.addEventListener('mousedown', onMouseDown);
    strip.addEventListener('mouseleave', onMouseLeave);
    strip.addEventListener('mouseup', onMouseUp);
    strip.addEventListener('mousemove', onMouseMove);

    return () => {
      strip.removeEventListener('mousedown', onMouseDown);
      strip.removeEventListener('mouseleave', onMouseLeave);
      strip.removeEventListener('mouseup', onMouseUp);
      strip.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  /* Touch handlers for clean tap detection on mobile */
  const onTouchStart = e => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleCardClick = (e, video) => {
    if (isPointerDrag.current) return;
    onSelectVideo({ ...video, format: 'vertical' });
  };

  const onTouchEnd = (e, video) => {
    const touch = e.changedTouches[0];
    const diffX = Math.abs(touch.clientX - touchStartPos.current.x);
    const diffY = Math.abs(touch.clientY - touchStartPos.current.y);
    // If movement was small, it was an intentional tap!
    if (diffX < 10 && diffY < 10) {
      onSelectVideo({ ...video, format: 'vertical' });
    }
  };

  return (
    <div className="reels__viewport reels__viewport--vertical">
      {/* Mobile view switch: Swipe vs Grid */}
      <div className="reels__mobile-controls">
        <span className="reels__mobile-count">{videos.length} vertical cuts</span>
        <div className="reels__view-toggle" role="tablist" aria-label="Reels layout view">
          <button
            type="button"
            className={`reels__toggle-btn ${mobileView === 'swipe' ? 'is-active' : ''}`}
            onClick={() => setMobileView('swipe')}
            aria-selected={mobileView === 'swipe'}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <span>Swipe</span>
          </button>
          <button
            type="button"
            className={`reels__toggle-btn ${mobileView === 'grid' ? 'is-active' : ''}`}
            onClick={() => setMobileView('grid')}
            aria-selected={mobileView === 'grid'}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M4 4h7v7H4zm9 0h7v7h-7zm0 9h7v7h-7zm-9 0h7v7H4z"/>
            </svg>
            <span>Grid</span>
          </button>
        </div>
      </div>

      <div
        className={`reels__strip ${mobileView === 'grid' ? 'reels__strip--grid' : ''}`}
        ref={stripRef}
      >
        <div className={`reels__track ${mobileView === 'grid' ? 'reels__track--grid' : ''}`}>
          {videos.map((r, i) => (
            <div
              key={r.id || i}
              role="button"
              tabIndex={0}
              onClick={e => handleCardClick(e, r)}
              onTouchStart={onTouchStart}
              onTouchEnd={e => onTouchEnd(e, r)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectVideo({ ...r, format: 'vertical' });
                }
              }}
              className="reel reel--vertical"
              data-cursor="play"
            >
              <div className="reel__media">
                <img
                  src={ytThumb(r.id)}
                  alt={r.title}
                  loading="lazy"
                  draggable={false}
                />
                <div className="reel__media-overlay" />
                <div className="reel__play" aria-hidden>
                  <svg viewBox="0 0 64 64" width="56" height="56">
                    <circle cx="32" cy="32" r="30" fill="rgba(10,10,11,0.5)" stroke="currentColor" strokeWidth="1.5" />
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
            </div>
          ))}

          {/* End CTA card in carousel */}
          {mobileView === 'swipe' && (
            <div className="reels__end">
              <div>
                <span className="reels__end-num">/end</span>
                <p>more cuts on YouTube — let's build your next reel.</p>
                <a href="#contact" className="btn btn--ghost" data-cursor="say hi">start a project →</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop prev/next navigation arrows */}
      <button
        type="button"
        className="reels__arrow reels__arrow--prev"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        aria-label="Previous reel"
        data-cursor="prev"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18L9 12L15 6" />
        </svg>
      </button>
      <button
        type="button"
        className="reels__arrow reels__arrow--next"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        aria-label="Next reel"
        data-cursor="next"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 6L15 12L9 18" />
        </svg>
      </button>

      {/* Mobile touch hint indicator */}
      <div className="reels__mobile-hint" aria-hidden>
        <span>tap card to play · swipe horizontally</span>
      </div>
    </div>
  );
}

export default function Reels() {
  const sectionRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="reels" id="work" ref={sectionRef}>
      {/* DOCUMENTARIES SECTION */}
      <div className="section-head">
        <span className="section-num">/02</span>
        <h2 className="section-title">documentaries</h2>
        <p className="section-kicker">Long-form storytelling. Click or tap to watch inside the site.</p>
      </div>
      <DocumentaryCinema video={DOCUMENTARIES[0]} onSelectVideo={setActiveVideo} />

      {/* REELS SECTION */}
      <div className="section-head" style={{ marginTop: '80px' }}>
        <span className="section-num">/03</span>
        <h2 className="section-title">reels &amp; demos</h2>
        <p className="section-kicker">Short-form vertical cuts &amp; editing practice. Tap to watch inside the site.</p>
      </div>
      <ReelsStrip videos={REELS} onSelectVideo={setActiveVideo} />

      {/* IN-PAGE VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
