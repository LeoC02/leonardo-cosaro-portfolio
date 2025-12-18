import React, { useEffect } from 'react';
import LiquidGlassBackground from '../components/three/LiquidGlassBackground';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';

import ProjectsSection from '../components/home/ProjectsSection';
import ContactSection from '../components/home/ContactSection';
import AgentChatButton from '../components/ui/AgentChatButton';

export default function Home() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = 'Leonardo Cosaro - Backend Developer Python | Django, FastAPI, PostgreSQL';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Backend Developer specializzato in Python, Django, FastAPI e PostgreSQL. Creo applicazioni web performanti, scalabili e affidabili. Portfolio progetti e competenze.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Backend Developer specializzato in Python, Django, FastAPI e PostgreSQL. Creo applicazioni web performanti, scalabili e affidabili. Portfolio progetti e competenze.';
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'backend developer, python developer, django, fastapi, postgresql, mysql, sviluppatore web, programmatore python, rest api, database');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'backend developer, python developer, django, fastapi, postgresql, mysql, sviluppatore web, programmatore python, rest api, database';
      document.head.appendChild(meta);
    }

    // Open Graph Meta Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Leonardo Cosaro - Backend Developer Python');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'Leonardo Cosaro - Backend Developer Python';
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Backend Developer specializzato in Python, Django, FastAPI e PostgreSQL. Portfolio progetti e competenze.');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Backend Developer specializzato in Python, Django, FastAPI e PostgreSQL. Portfolio progetti e competenze.';
      document.head.appendChild(meta);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }
  }, []);
  return (
    <div className="relative min-h-screen">
      <LiquidGlassBackground />
      <AgentChatButton />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        
        {/* Footer */}
        <footer className="relative py-8 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Leonardo Cosaro. Tutti i diritti riservati.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}