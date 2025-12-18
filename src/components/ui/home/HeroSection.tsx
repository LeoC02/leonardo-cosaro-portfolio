import React from 'react';
import { motion } from 'framer-motion';
import FloatingTags from './FloatingTags';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingTags />
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6">

            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium
              bg-gradient-to-r from-blue-500/20 to-violet-500/20
              backdrop-blur-xl border border-white/10
              text-white/80">



              Backend Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">

            <span className="bg-gradient-to-r from-white via-blue-200 to-violet-200 bg-clip-text text-transparent">
              Leonardo
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Cosaro
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }} className="text-white/60 mb-10 mx-auto text-lg leading-relaxed md:text-xl max-w-2xl">
              Creo architetture backend robuste e scalabili.
              <br />
              Specializzato in <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent font-medium">Python</span>.




          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col gap-4 items-center">

            <a
              href="#projects"
              className="group relative px-6 py-3 rounded-2xl font-medium
                bg-gradient-to-r from-blue-600 to-violet-600
                text-white shadow-lg shadow-violet-500/25
                hover:shadow-xl hover:shadow-violet-500/40
                transition-all duration-300 hover:-translate-y-1">





              <span className="relative z-10">Scopri i miei progetti</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            

          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2">

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/40">

          <span className="text-xs mb-2 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>);

}