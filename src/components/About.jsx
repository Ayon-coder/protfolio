import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { num: 5,   suffix: '+', label: 'years in\nthe timeline' },
  { num: 180, suffix: '+', label: 'shipped\nedits' },
  { num: 42,  suffix: '',  label: 'happy\nclients' },
  { num: 4,   suffix: '/qtr', label: 'capacity\n(strict)' }
];

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf;
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(e * to));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <span>{val}</span>
      <span className="plus">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        <motion.div
          className="about__col about__col--lead"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
        >
          <span className="section-num">/03</span>
          <h2 className="about__title">
            the human <em>behind</em> the timeline.
          </h2>
        </motion.div>

        <motion.div
          className="about__col about__col--body"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}
        >
          <p className="about__lede">
            I'm <strong>Ayon Sadhukhan</strong> — known online as <strong>ANX</strong>. A video editor
            and colourist working out of <strong>Kolkata, India</strong>. I direct cuts, grade in DaVinci,
            score-supervise, and occasionally argue with clients about whether the lower-third should be
            Helvetica or Inter.
          </p>
          <p>
            I believe the cut <em>is</em> the writing. The difference between a moment that lands and one
            that floats past is two frames and a music swell. Five years into this craft, somewhere
            between 180-ish edits deep, I've shipped work for indie musicians, scrappy founders, a coffee
            chain pretending to be a religion, and more wedding families than I can keep track of.
          </p>
          <p>
            Now I take on <strong>four engagements per quarter</strong> — that's it. Quality over feed.
            If you've got a story that needs slowing down, speeding up, or quietly bleeding into the next
            scene — say hi.
          </p>
          <p className="about__sign">— signed, <span>somewhere between Premiere Pro and a cold coffee</span>.</p>
        </motion.div>
      </div>

      <motion.div
        className="stats"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="stat"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          >
            <div className="stat__num"><Counter to={s.num} suffix={s.suffix} /></div>
            <div className="stat__label">{s.label.split('\n').map((l,j) => <span key={j}>{l}<br/></span>)}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
