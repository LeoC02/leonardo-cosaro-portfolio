import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Server, Database, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
{
  title: 'Gestione e Analisi dei Dati',
  description: 'Web app per la gestione, modifica e analisi di dati statistici finalizzata alla creazione di report.',
  tech: ['Python', 'Django', 'PostgreSQL', 'Redis'],
  icon: Server,
  color: 'from-blue-500 to-cyan-500'
},
{
  title: 'Gestione Campagne Email',
  description: 'Gestionale per la creazione, gestione e invio di campagne di email marketing.',
  tech: ['PHP', 'Laravel', 'MySQL'],
  icon: Database,
  color: 'from-violet-500 to-purple-500'
},
{
  title: 'Gestione Flussi Operativi',
  description: 'Gestionale per l\'organizzazione e il controllo dei flussi operativi aziendali.',
  tech: ['Python', 'Django', 'PostgreSQL', 'Celery'],
  icon: Zap,
  color: 'from-emerald-500 to-teal-500'
}];


export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const renderProjectCard = (project, index, isMobile = false) => (
    <GlassCard key={project.title} delay={isMobile ? 0 : index * 0.15} className="group">
      <div className={`${isMobile ? "p-5 min-h-[220px]" : "p-8 min-h-[260px]"} flex flex-col h-full`}>
        <h3 className={`text-white font-bold ${isMobile ? 'text-lg mb-2' : 'text-xl mb-3'}`}>{project.title}</h3>
        <p className={`text-white/50 text-sm leading-relaxed flex-grow`}>{project.description}</p>

        <div className={`flex flex-nowrap gap-2 overflow-x-auto ${isMobile ? 'mt-1' : 'mt-2'}`}>
          {(isMobile ? project.tech.slice(0, 2) : project.tech).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-white/70 border border-white/10 whitespace-nowrap">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            I miei
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"> Progetti</span>
          </h2>
          <p className="text-white/60 mx-auto text-base max-w-2xl">Una selezione dei progetti backend più significativi che ho realizzato.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => renderProjectCard(project, index))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={prevProject}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl 
              border border-white/10 flex items-center justify-center
              text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderProjectCard(projects[currentIndex], currentIndex, true)}
            </motion.div>
          </div>

          <button
            onClick={nextProject}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl 
              border border-white/10 flex items-center justify-center
              text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Dots Indicator */}
        <div className="md:hidden flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-violet-400 w-6' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}