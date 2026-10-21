import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import VideoPage from './components/VideoPage.jsx';
import DesignPage from './components/DesignPage.jsx';
import useMagnetic from './hooks/useMagnetic.js';
import useLenis from './hooks/useLenis.js';

function HashHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle hash fallback routing (e.g. #/design or #design)
    const hash = window.location.hash;
    if (hash === '#/design' || hash === '#design') {
      navigate('/design', { replace: true });
    }
  }, [navigate]);

  return null;
}

function MainLayout() {
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
      <HashHandler />

      <Nav />
      <Routes>
        <Route path="/" element={<VideoPage />} />
        <Route path="/design" element={<DesignPage />} />
        {/* Fallback route */}
        <Route path="*" element={<VideoPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
