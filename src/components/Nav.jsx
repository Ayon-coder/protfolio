import { useEffect, useState } from 'react';

export default function Nav() {
  const [time, setTime] = useState('--:--:--');

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
      <a className="nav__logo" href="#top" data-magnet>
        <span className="nav__logo-glyph">A</span>
        <span className="nav__logo-name">ANX<em>· studio</em></span>
      </a>
      <nav className="nav__links">
        <a href="#work" data-cursor="watch">work</a>
        <a href="#about" data-cursor="story">about</a>
        <a href="#tools" data-cursor="kit">tools</a>
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
