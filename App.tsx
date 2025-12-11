import React from 'react';
import { HashRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';

import { ContactPage } from './pages/ContactPage';

// Placeholder components for routes not fully implemented in this iteration

import { AboutPage } from './pages/AboutPage';


import ScrollToTop from './components/ScrollToTop';

import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicios" element={<ServicesPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;