import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createPageUrl } from './utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#', section: null },
  { name: 'Chi Sono', href: '#about', section: 'about' },
  { name: 'Progetti', href: '#projects', section: 'projects' },
];

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['about', 'projects', 'contact'];
      let current = null;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      
      // If at the very top, no section is active (Home)
      if (window.scrollY < 100) {
        current = null;
      }
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        :root {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background: #020617;
        }
        
        ::selection {
          background: rgba(139, 92, 246, 0.3);
          color: white;
        }
      `}</style>

      {/* Navigation */}
      <motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed top-0 left-0 right-0 z-50 py-3"
                  >
                    <div className="max-w-6xl mx-auto px-6">
                      <nav
                        className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
                        style={{
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                        }}
          >
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '#')}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"
            >
              LC
            </a>

            {/* Desktop Navigation */}
                              <div className="hidden md:flex items-center gap-1">
                                {navItems.map((item) => {
                                  const isActive = item.section === activeSection;
                                  return (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      onClick={(e) => handleNavClick(e, item.href)}
                                      className={`relative px-4 py-2 text-sm rounded-xl transition-all duration-300
                                        ${isActive 
                                          ? 'text-white' 
                                          : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                      {isActive && (
                                        <motion.div
                                          layoutId="activeSection"
                                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 
                                            backdrop-blur-xl border border-white/20"
                                          style={{
                                            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                          }}
                                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                      )}
                                      <span className="relative z-10">{item.name}</span>
                                    </a>
                                  );
                                })}
                                <a
                                  href="#contact"
                                  onClick={(e) => handleNavClick(e, '#contact')}
                                  className="ml-2 px-4 py-2 text-sm font-medium rounded-xl
                                    bg-gradient-to-r from-blue-600 to-violet-600
                                    text-white shadow-lg shadow-violet-500/25
                                    hover:shadow-xl hover:shadow-violet-500/40
                                    transition-all duration-300"
                                >
                                  Contattami
                                </a>
                              </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
              >
                {navItems.map((item) => {
                                                              const isActive = item.section === activeSection;
                                                              return (
                                                                <a
                                                                  key={item.name}
                                                                  href={item.href}
                                                                  onClick={(e) => handleNavClick(e, item.href)}
                                                                  className={`block px-4 py-3 rounded-xl transition-all duration-300
                                                                    ${isActive 
                                                                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-white/20' 
                                                                      : 'text-white/60 hover:text-white hover:bg-white/5'
                                                                    }`}
                                                                  style={isActive ? {
                                                                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                                                                  } : {}}
                                                                >
                                                                  {item.name}
                                                                </a>
                                                              );
                                                            })}
                                      <a
                                        href="#contact"
                                        onClick={(e) => handleNavClick(e, '#contact')}
                                        className="block px-4 py-3 mt-2 text-center font-medium rounded-xl
                                          bg-gradient-to-r from-blue-600 to-violet-600
                                          text-white shadow-lg shadow-violet-500/25"
                                      >
                                        Contattami
                                      </a>
                                    </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}