import { useEffect } from 'react';
import Hero from './Hero.jsx';
import Marquee from './Marquee.jsx';
import Services from './Services.jsx';
import Reels from './Reels.jsx';
import About from './About.jsx';
import Tools from './Tools.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

export default function VideoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page page--video">
      <Hero />
      <Marquee />
      <Services />
      <Reels />
      <About />
      <Tools />
      <Contact />
      <Footer />
    </div>
  );
}
