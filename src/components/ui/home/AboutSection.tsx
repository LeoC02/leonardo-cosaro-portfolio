import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Search, PenTool, Code2, TestTube, Rocket, Headphones } from 'lucide-react';

const highlights = [
{
  icon: Search,
  title: 'Analisi',
  description: 'Comprendo obiettivi e necessità del progetto'
},
{
  icon: PenTool,
  title: 'Progettazione',
  description: 'Definisco struttura e tecnologie'
},
{
  icon: Code2,
  title: 'Sviluppo',
  description: 'Realizzo il software'
},
{
  icon: TestTube,
  title: 'Test',
  description: 'Verifico e ottimizzo'
},
{
  icon: Rocket,
  title: 'Rilascio',
  description: 'Metto online il progetto'
},
{
  icon: Headphones,
  title: 'Supporto',
  description: 'Manutenzione e aggiornamenti'
}];


export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Chi Sono
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Backend Developer
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"> Appassionato</span>
          </h2>
          <p className="text-white/60 mx-auto text-sm leading-relaxed max-w-2xl">Sono uno sviluppatore web specializzato in back-end, con solide competenze anche in ambito front-end. Utilizzo Python per creare applicazioni web performanti, scalabili e affidabili. Seguo i progetti in ogni fase, dal confronto con il cliente allo sviluppo finale, trasformando le idee in soluzioni digitali concrete.














          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {highlights.map((item, index) => <GlassCard key={item.title} delay={index * 0.1} className="p-4 md:p-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 
                flex items-center justify-center mb-2 md:mb-4 border border-white/10">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
              </div>
              <h3 className="text-white font-semibold text-sm md:text-lg mb-0 md:mb-2">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed hidden md:block">{item.description}</p>
            </GlassCard>)}
        </div>
      </div>
    </section>);}