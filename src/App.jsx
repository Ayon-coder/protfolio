import { useEffect, useState } from 'react';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Services from './components/Services.jsx';
import Reels from './components/Reels.jsx';
import About from './components/About.jsx';
import Tools from './components/Tools.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import useMagnetic from './hooks/useMagnetic.js';
import useLenis from './hooks/useLenis.js';

export default function App() {
  const [ready, setReady] = useState(false);

  useLenis();
  useMagnetic();

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden';
  }, [ready]);

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <Cursor />
      <Loader onDone={() => setReady(true)} />

      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Reels />
      <About />
      <Tools />
      <Contact />
      <Footer />
    </>
  );
}
