import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isDesign = location.pathname.startsWith('/design');

  return (
    <footer className="foot">
      <div className="foot__row">
        <span>© ANX · 2020—2026</span>
        <div className="foot__switch">
          <span>PORTFOLIO: </span>
          <Link to="/" className={`foot__link ${!isDesign ? 'is-active' : ''}`}>
            Video Editing
          </Link>
          <span className="foot__sep">·</span>
          <Link to="/design" className={`foot__link ${isDesign ? 'is-active' : ''}`}>
            Design &amp; Packaging
          </Link>
        </div>
        <span><a href="#top" data-cursor="back">back to top ↑</a></span>
      </div>
      <div className="foot__giant">ANX</div>
    </footer>
  );
}
