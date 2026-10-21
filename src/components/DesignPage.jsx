import { useEffect } from 'react';
import DesignHero from './DesignHero.jsx';
import Marquee from './Marquee.jsx';
import Thumbnails from './Thumbnails.jsx';
import Posters from './Posters.jsx';
import Tools from './Tools.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

const DESIGN_MARQUEE = [
  'high-ctr thumbnails',
  'cinematic posters',
  'photoshop & canva',
  'focal hierarchy',
  'key art',
  'color science',
  'designed in kolkata'
];

export default function DesignPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page page--design">
      <DesignHero />
      <Marquee items={DESIGN_MARQUEE} />
      <Thumbnails />
      <Posters />
      <Tools />
      <Contact />
      <Footer />
    </div>
  );
}
