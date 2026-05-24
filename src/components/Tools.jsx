import { motion } from 'framer-motion';

const TOOLS = [
  { name: 'Premiere Pro', hot: true },
  { name: 'DaVinci Resolve', hot: true },
  { name: 'After Effects', hot: true },
  { name: 'Photoshop' },
  { name: 'Audition' },
  { name: 'Lightroom' },
  { name: 'Frame.io' },
  { name: 'Notion' },
  { name: 'Dropbox · transfer' },
  { name: 'OBS · live cut' }
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
        <p className="section-kicker">Tools I'd rescue from a power cut. (After the proxies.)</p>
      </motion.div>

      <motion.div
        className="tools"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {TOOLS.map(t => (
          <motion.span
            key={t.name}
            className={'tool' + (t.hot ? ' tool--hot' : '')}
            data-cursor="kit"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >{t.name}</motion.span>
        ))}
      </motion.div>
    </section>
  );
}
