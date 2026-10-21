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
        {/* Email */}
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
            <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
              <path d="M12 32L32 12M32 12H16M32 12V28" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </a>
          <p className="contact__desc">Reach out directly via email</p>
        </motion.div>

        {/* Instagram */}
        <motion.div
          className="contact__item"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }} viewport={{ once: true }}
        >
          <p className="contact__label">Instagram</p>
          <a
            href="https://www.instagram.com/studio_anx_/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link insta-link"
            data-magnet data-cursor="follow"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@studio_anx_</span>
          </a>
          <p className="contact__desc">DM for edits, creative collabs & stories</p>
        </motion.div>

        {/* YouTube */}
        <motion.div
          className="contact__item"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
        >
          <p className="contact__label">YouTube</p>
          <a
            href="https://www.youtube.com/@ANX6969/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link youtube-link-item"
            data-magnet data-cursor="watch"
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>@ANX6969</span>
          </a>
          <p className="contact__desc">Watch latest cinematic edits & practice cuts</p>
        </motion.div>

        {/* LinkedIn */}
        <motion.div
          className="contact__item"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }} viewport={{ once: true }}
        >
          <p className="contact__label">LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/ayon-sadhukhan/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link linkedin-link"
            data-magnet data-cursor="follow"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.836 0-9.756h3.554v1.381c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.74 1.395 3.74 4.393v5.592zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.707 0-.968.77-1.708 1.96-1.708 1.188 0 1.913.74 1.938 1.708 0 .949-.75 1.707-1.983 1.707zm1.946 11.597H3.392V9.696h3.891v10.756zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
            <span>ANX</span>
          </a>
          <p className="contact__desc">Professional network & client inquiries</p>
        </motion.div>
      </div>
    </section>
  );
}
