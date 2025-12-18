import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ChatInterface from './ChatInterface';

export default function AgentChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-14 md:h-14 rounded-full
          bg-gradient-to-r from-blue-600 to-violet-600
          text-white shadow-lg shadow-violet-500/50
          hover:shadow-xl hover:shadow-violet-500/70
          flex items-center justify-center
          transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}