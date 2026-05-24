import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const phrases = [
  'colour-grading the night',
  'cutting on the beat',
  'rendering the proxies',
  'matching the blacks',
  'one last conform'
];

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [word, setWord] = useState(phrases[0]);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let v = 0, wi = 0;
    const id = setInterval(() => {
      v += Math.random() * 7 + 2;
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(() => setOut(true), 320); }
      setPct(Math.floor(v));
      if (Math.random() < 0.25) { setWord(phrases[(wi++) % phrases.length]); }
    }, 70);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!out && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1, ease: [0.6,0.05,0.1,1] } }}
        >
          <div className="loader__inner">
            <div className="loader__row">
              <span>booting timeline · {new Date().getFullYear()}</span>
              <span className="loader__count">{String(pct).padStart(3,'0')}</span>
            </div>
            <div className="loader__bar"><div className="loader__fill" style={{ right: (100 - pct) + '%' }} /></div>
            <div className="loader__word">
              <AnimatePresence mode="wait">
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  style={{ display: 'inline-block' }}
                >{word}</motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
