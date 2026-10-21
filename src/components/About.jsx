import { motion } from 'framer-motion';

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
            I'm <strong>ANX</strong> — an independent video editor
            and colourist working out of <strong>Kolkata, India</strong>. My workflow is anchored in
            <strong>DaVinci Resolve</strong> for cuts &amp; color grading, <strong>Adobe Photoshop</strong> and
            <strong>Adobe Express</strong> for thumbnails &amp; motion graphics, and <strong>Canva</strong> for rapid brand layouts.
          </p>
          <p>
            I believe the cut <em>is</em> the writing. The difference between a moment that lands and one
            that floats past is two frames and a music swell. Dedicated to the craft, I shape work for
            creators, brand stories, and anyone with a vision that needs pacing and punch.
          </p>
          <p>
            Now I take on focused collaborations — that's it. Quality over feed.
            If you've got a story that needs slowing down, speeding up, or quietly bleeding into the next
            scene — say hi.
          </p>
          <p className="about__sign">— signed, <span>somewhere between DaVinci Resolve and a cold coffee</span>.</p>
        </motion.div>
      </div>
    </section>
  );
}
