import React from 'react';
import { motion } from 'framer-motion';

const tags = [
  { name: 'Python' },
  { name: 'Django' },
  { name: 'FastAPI' },
  { name: 'Flask' },
  { name: 'PostgreSQL' },
  { name: 'MySQL' },
  { name: 'GitHub' },
  { name: 'REST API' },
];

const positions = [
  { x: -35, y: -20 },
  { x: 30, y: -25 },
  { x: -25, y: 15 },
  { x: 35, y: 10 },
  { x: -40, y: 0 },
  { x: 40, y: -10 },
  { x: -30, y: 25 },
  { x: 32, y: 20 },
];

export default function FloatingTags() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      {tags.map((tag, index) => (
        <motion.div
          key={tag.name}
          className="absolute left-1/2 top-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: `calc(${positions[index].x}vw - 50%)`,
            y: `calc(${positions[index].y}vh - 50%)`,
          }}
          transition={{ 
            delay: index * 0.1 + 0.5,
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
            className="px-3 py-1.5 rounded-full bg-violet-500/20 backdrop-blur-xl
              border border-violet-500/30 shadow-lg shadow-black/20
              cursor-default hover:scale-110 transition-transform duration-300"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className="text-white/90 font-medium text-sm tracking-wide">
              {tag.name}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}