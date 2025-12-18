import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true,
  delay = 0,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        relative overflow-hidden rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-2xl shadow-black/20
        ${className}
      `}
      style={{
        boxShadow: `
          0 25px 50px -12px rgba(0, 0, 0, 0.4),
          inset 0 1px 1px rgba(255, 255, 255, 0.1),
          inset 0 -1px 1px rgba(0, 0, 0, 0.1)
        `,
      }}
      {...props}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}