import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const onCopy = e => {
    e.preventDefault();
    navigator.clipboard?.writeText('asadhukhan686@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="contact" id="contact">
      <span className="section-num">/05</span>
      <motion.h2
        className="contact__title"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.6,0.05,0.1,1] }} viewport={{ once: true }}
      >
        Got a story that needs cutting?
      </motion.h2>

      <div className="contact__content">
        <motion.div
          className="contact__item"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}
        >
          <p className="contact__label">Email</p>
          <a
            href="mailto:asadhukhan686@gmail.com"
            className="contact__link"
            data-magnet data-cursor="copy"
            onClick={onCopy}
          >
            <span>{copied ? 'copied ✓' : 'asadhukhan686@gmail.com'}</span>
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
              <path d="M12 32L32 12M32 12H16M32 12V28" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </a>
          <p className="contact__desc">Reach out directly</p>
        </motion.div>

        <motion.div
          className="contact__item"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
        >
          <p className="contact__label">LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/ayon-sadhukhan/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link linkedin-link"
            data-magnet data-cursor="follow"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.836 0-9.756h3.554v1.381c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.74 1.395 3.74 4.393v5.592zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.707 0-.968.77-1.708 1.96-1.708 1.188 0 1.913.74 1.938 1.708 0 .949-.75 1.707-1.983 1.707zm1.946 11.597H3.392V9.696h3.891v10.756zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
            <span>ayon-sadhukhan</span>
          </a>
          <p className="contact__desc">Connect and get in touch easily</p>
        </motion.div>
      </div>

      <motion.div
        className="youtube-section"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.6,0.05,0.1,1] }} viewport={{ once: true }}
      >
        <p className="youtube-label">YouTube Channel</p>
        <a
          href="https://www.youtube.com/@ANX6969/"
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-link"
          data-magnet data-cursor="follow"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>@ANX6969</span>
        </a>
        <p className="youtube-desc">Watch my latest cinematic edits and content</p>
      </motion.div>
    </section>
  );
}
