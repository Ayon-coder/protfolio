import { motion } from 'framer-motion';

const TOOLS = [
  {
    name: 'Canva',
    brand: 'Canva',
    role: 'Layouts & Brand Graphics',
    desc: 'Rapid social media layouts, typography treatments, pitch decks, and client storyboards.',
    tag: 'Design & Social'
  },
  {
    name: 'Adobe Express',
    brand: 'Adobe',
    role: 'Social Motion & Templates',
    desc: 'Kinetic animations, social format templates, quick motion cuts, and visual assets.',
    tag: 'Motion & Social'
  },
  {
    name: 'DaVinci Resolve',
    brand: 'Blackmagic',
    role: 'Timeline Cutting & Grading',
    desc: 'Primary edit suite, node-based color grading, Fairlight audio mastering, and conform.',
    tag: 'Video & Colour'
  },
  {
    name: 'Adobe Photoshop',
    brand: 'Adobe',
    role: 'Thumbnails & Key Art',
    desc: 'High-CTR YouTube thumbnails, visual overlays, raster cutouts, and poster design.',
    tag: 'Graphic & Photo'
  }
];

export default function Tools() {
  return (
    <section className="playground" id="tools">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.4 }}
      >
        <span className="section-num">/04</span>
        <h2 className="section-title">the <em>edit suite</em></h2>
        <p className="section-kicker">Core software and creative tools I use to craft every frame, cut, and visual asset.</p>
      </motion.div>

      {/* Quick pill badges — all 4 highlighted */}
      <motion.div
        className="tools"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {TOOLS.map(t => (
          <motion.span
            key={t.name}
            className="tool tool--hot"
            data-cursor="kit"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >{t.name}</motion.span>
        ))}
      </motion.div>

      {/* 4 Feature cards */}
      <div className="tools__grid">
        {TOOLS.map((t, i) => (
          <motion.div
            key={t.name}
            className="tool-card"
            data-cursor="explore"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.6, 0.05, 0.1, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="tool-card__head">
              <span className="tool-card__role">{t.brand}</span>
              <span className="tool-card__tag">{t.tag}</span>
            </div>
            <h3 className="tool-card__title">{t.name}</h3>
            <span className="tool-card__role">{t.role}</span>
            <p>{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
