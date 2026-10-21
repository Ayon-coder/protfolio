import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POSTERS } from '../data/designData.js';

/* Poster Lightbox Modal */
function PosterModal({ item, onClose, onNext, onPrev }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <motion.div
      className="media-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="media-modal__backdrop" onClick={onClose} aria-label="Close modal" />

      <motion.div
        className="media-modal__container media-modal__container--poster"
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.28, ease: [0.6, 0.05, 0.1, 1] }}
      >
        <div className="media-modal__header">
          <div className="media-modal__info">
            <span className="media-modal__chip">{item.category}</span>
            <span className="media-modal__title">{item.title}</span>
            <span className="media-modal__ctr">{item.aspect}</span>
          </div>
          <div className="media-modal__actions">
            {item.instaUrl && (
              <a
                href={item.instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="media-modal__ext-link media-modal__ext-link--insta"
                title="View original post on Instagram"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram ↗</span>
              </a>
            )}
            <a
              href={item.image}
              target="_blank"
              rel="noopener noreferrer"
              className="media-modal__ext-link"
              title="Open full resolution poster"
            >
              <span>Full Res</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button
              type="button"
              className="media-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="media-modal__view media-modal__view--poster">
          <img src={item.image} alt={item.title} />
        </div>

        <div className="media-modal__meta">
          <div className="media-modal__meta-left">
            <span className="media-modal__client">{item.client} · {item.year}</span>
            <p className="media-modal__desc">{item.description}</p>
          </div>
          <div className="media-modal__nav">
            <button type="button" onClick={onPrev} className="media-modal__nav-btn" aria-label="Previous">
              ← Prev
            </button>
            <button type="button" onClick={onNext} className="media-modal__nav-btn" aria-label="Next">
              Next →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Posters() {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleNext = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % POSTERS.length);
  };

  const handlePrev = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + POSTERS.length) % POSTERS.length);
  };

  return (
    <section className="posters-section" id="posters">
      <div className="section-head">
        <span className="section-num">/03</span>
        <h2 className="section-title">cinematic posters &amp; key art</h2>
        <p className="section-kicker">
          Official festival key art, studio manifestos, and creative editorial prints crafted by ANX Studio. Click any poster to inspect full resolution.
        </p>
      </div>

      {/* Posters Grid */}
      <div className="posters-grid">
        {POSTERS.map((poster, idx) => (
          <div
            key={poster.id || idx}
            className="poster-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveIdx(idx)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIdx(idx);
              }
            }}
            data-cursor="view poster"
          >
            <div
              className="poster-card__media"
              style={{ aspectRatio: poster.aspectRatio || '1 / 1' }}
            >
              <img
                src={poster.image}
                alt={poster.title}
                loading="lazy"
                onError={e => {
                  e.currentTarget.src = '/posters/mohaloya.png';
                }}
              />
              <div className="poster-card__hover-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>

            <div className="poster-card__meta">
              <div className="poster-card__sub">
                <span>{poster.category}</span>
                <span>{poster.aspect}</span>
              </div>
              <h3 className="poster-card__title">{poster.title}</h3>
              <p className="poster-card__desc">{poster.description}</p>
              {poster.instaUrl && (
                <div className="poster-card__footer">
                  <a
                    href={poster.instaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="poster-card__insta-link"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span>view on instagram ↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Poster Inspection Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && POSTERS[activeIdx] && (
          <PosterModal
            item={POSTERS[activeIdx]}
            onClose={() => setActiveIdx(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
