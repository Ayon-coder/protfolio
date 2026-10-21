import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [time, setTime] = useState('--:--:--');
  const location = useLocation();
  const isDesign = location.pathname.startsWith('/design');

  useEffect(() => {
    const tick = () => {
      // IST regardless of viewer locale — Kolkata = UTC+5:30
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 5.5 * 3600 * 1000);
      const pad = n => String(n).padStart(2, '0');
      setTime(`${pad(ist.getHours())}:${pad(ist.getMinutes())}:${pad(ist.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="nav">
      <Link className="nav__logo" to={isDesign ? "/design" : "/"} data-magnet>
        <span className="nav__logo-glyph">A</span>
        <span className="nav__logo-name">
          ANX<em>· {isDesign ? 'design' : 'studio'}</em>
        </span>
      </Link>

      {/* Route Switcher Pills */}
      <div className="nav__routes" role="navigation" aria-label="Portfolio Switcher">
        <Link
          to="/"
          className={`nav__route-tab ${!isDesign ? 'is-active' : ''}`}
          data-cursor="videos"
        >
          <span>Video</span>
        </Link>
        <Link
          to="/design"
          className={`nav__route-tab ${isDesign ? 'is-active' : ''}`}
          data-cursor="design"
        >
          <span>Design</span>
        </Link>
      </div>

      <nav className="nav__links">
        {isDesign ? (
          <>
            <a href="#thumbnails" data-cursor="inspect">thumbnails</a>
            <a href="#posters" data-cursor="art">posters</a>
            <a href="#tools" data-cursor="suite">tools</a>
          </>
        ) : (
          <>
            <a href="#work" data-cursor="watch">work</a>
            <a href="#about" data-cursor="story">about</a>
            <a href="#tools" data-cursor="kit">tools</a>
          </>
        )}
        <a href="#contact" className="nav__cta" data-cursor="say hi">let's talk →</a>
      </nav>

      <div className="nav__meta">
        <span>{time} IST</span>
        <span className="nav__dot" />
        <span>Kolkata · IN</span>
      </div>
    </header>
  );
}
