import { motion } from 'framer-motion';

const SERVICES = [
  {
    n: '01',
    tag: 'flagship',
    title: 'Long form',
    body: 'Brand films, documentary cuts, music videos and launch trailers. Story-boarded down to the J-cut, scored to the millisecond.',
    list: ['brand films', 'music videos', 'documentary', 'wedding films']
  },
  {
    n: '02',
    tag: 'most booked',
    title: 'Short form',
    body: 'Punchy 6–30 second cuts engineered for the scroll. Reels, shorts, TikToks — designed to stop a thumb mid-flick.',
    list: ['reels & shorts', 'tiktok edits', 'product loops', 'kinetic type']
  },
  {
    n: '03',
    tag: 'craft',
    title: 'Colour & finish',
    body: 'DaVinci Resolve grading, primary/secondary work, film emulation, online conform and master delivery for any platform.',
    list: ['colour grading', 'film looks', 'sound design', 'final master']
  }
];

const card = {
  hidden: { opacity: 0, y: 40 },
  show: i => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.6,0.05,0.1,1] } })
};

export default function Services() {
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="services" id="services">
      <motion.div
        className="section-head"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.span className="section-num" variants={card}>/01</motion.span>
        <motion.h2 className="section-title" variants={card}>three modes <em>of cutting</em></motion.h2>
        <motion.p className="section-kicker" variants={card}>
          Pick a lane — or take the whole road. Every project starts with a story bible and ends
          with a frame you'd tattoo.
        </motion.p>
      </motion.div>

      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.n}
            className="svc"
            data-cursor="explore"
            onMouseMove={onMove}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            custom={i} variants={card}
          >
            <div className="svc__head">
              <span className="svc__num">{s.n}</span>
              <span className="svc__tag">{s.tag}</span>
            </div>
            <h3 className="svc__title">{s.title}</h3>
            <p>{s.body}</p>
            <ul className="svc__list">{s.list.map(l => <li key={l}>{l}</li>)}</ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
