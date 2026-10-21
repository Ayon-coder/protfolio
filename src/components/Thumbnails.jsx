import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THUMBNAILS } from '../data/designData.js';

/* Lightbox Modal for Full-Res Thumbnail Inspection */
function ThumbnailModal({ item, onClose, onNext, onPrev }) {
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
        className="media-modal__container"
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.28, ease: [0.6, 0.05, 0.1, 1] }}
      >
        <div className="media-modal__header">
          <div className="media-modal__info">
            <span className="media-modal__chip">{item.category}</span>
            <span className="media-modal__title">{item.title}</span>
            {item.ctr && <span className="media-modal__ctr">{item.ctr}</span>}
          </div>
          <div className="media-modal__actions">
            <a
              href={item.image}
              target="_blank"
              rel="noopener noreferrer"
              className="media-modal__ext-link"
              title="Open full resolution image"
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

        <div className="media-modal__view media-modal__view--16x9">
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

export default function Thumbnails() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIdx, setActiveIdx] = useState(null);

  const categories = ['All', ...new Set(THUMBNAILS.map(t => t.category))];

  const filteredItems = selectedCategory === 'All'
    ? THUMBNAILS
    : THUMBNAILS.filter(t => t.category === selectedCategory);

  const handleNext = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section className="thumbnails-section" id="thumbnails">
      <div className="section-head">
        <span className="section-num">/02</span>
        <h2 className="section-title">thumbnails &amp; packaging</h2>
        <p className="section-kicker">
          High-CTR YouTube packaging designed to stop the thumb, trigger curiosity, and boost organic impressions. Click any card to inspect full scale.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="design-filters">
        {categories.map(c => (
          <button
            key={c}
            type="button"
            className={`design-filter-btn ${selectedCategory === c ? 'is-active' : ''}`}
            onClick={() => {
              setSelectedCategory(c);
              setActiveIdx(null);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Thumbnails 16:9 Grid */}
      <div className="thumbnails-grid">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className="thumb-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveIdx(idx)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIdx(idx);
              }
            }}
            data-cursor="inspect"
          >
            <div className="thumb-card__media">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={e => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="thumb-card__overlay" />
              <span className="thumb-card__chip">{item.category}</span>
              {item.ctr && <span className="thumb-card__ctr">{item.ctr}</span>}
              <div className="thumb-card__zoom-hint">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>

            <div className="thumb-card__meta">
              <div className="thumb-card__row">
                <span className="thumb-card__client">{item.client}</span>
                <span className="thumb-card__year">'{item.year.slice(-2)}</span>
              </div>
              <h3 className="thumb-card__title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox inspection modal */}
      <AnimatePresence>
        {activeIdx !== null && filteredItems[activeIdx] && (
          <ThumbnailModal
            item={filteredItems[activeIdx]}
            onClose={() => setActiveIdx(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
