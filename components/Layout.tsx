import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Zap, CheckCircle, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VerzaLogo from '@/assets/verza-logo.svg';

const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Campañas', href: '/#campanas' },
  { label: 'Bots IA', href: '/#bots' },
  { label: 'Industrias', href: '/#industrias' },
  { label: 'Servicios', href: '/servicios' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="block w-28 group">
          <img src={VerzaLogo} alt="Verza" className="w-full h-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-brand-gray hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contacto"
            className="px-5 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan hover:text-brand-black transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.3)] text-sm font-bold"
          >
            Agendar Demo
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-brand-gray hover:text-white text-lg font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contacto"
                className="mt-4 w-full text-center px-5 py-3 rounded-lg bg-brand-cyan text-brand-black font-bold"
              >
                Agendar Demo
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="block w-32 mb-6">
              <img src={VerzaLogo} alt="Verza" className="w-full h-auto" />
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mb-6">
              Automatizaciones inteligentes para negocios que quieren crecer.
              Asistentes virtuales que trabajan 24/7.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/verza-app" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-cyan transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-brand-gray hover:text-brand-cyan transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-brand-gray hover:text-brand-cyan transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Servicios</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link to="/servicios" className="hover:text-brand-cyan transition-colors">Restaurantes</Link></li>
              <li><Link to="/servicios" className="hover:text-brand-cyan transition-colors">Inmobiliarias</Link></li>
              <li><Link to="/servicios" className="hover:text-brand-cyan transition-colors">Clínicas</Link></li>
              <li><Link to="/servicios" className="hover:text-brand-cyan transition-colors">E-commerce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link to="/about" className="hover:text-brand-cyan transition-colors">Sobre Nosotros</Link></li>

              <li><Link to="/contacto" className="hover:text-brand-cyan transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li className="flex items-center gap-2">
                <span>Buenos Aires, Argentina</span>
              </li>
              <li><a href="mailto:hola@verza.app" className="hover:text-brand-cyan">hola@verza.app</a></li>
              <li className="mt-4">
                <Link to="/contacto" className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:gap-3 transition-all">
                  Hablemos <ArrowRight size={16} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-gray text-xs">
            © {new Date().getFullYear()} VERZA - Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-brand-gray">
            <Link to="#" className="hover:text-white">Privacidad</Link>
            <Link to="#" className="hover:text-white">Términos</Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-white selection:bg-brand-cyan selection:text-brand-black">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group"
      >
        <div className="absolute -top-10 right-0 bg-white text-black text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          ¿Dudas? Escribinos
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-current"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </div>
  );
};