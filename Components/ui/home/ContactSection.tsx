import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Github, Linkedin, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'cosaroleoo@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Italia' },
];

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/LeoC02' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/leonardo-cosaro/' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Contatti
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lavoriamo
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"> Insieme</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Hai un progetto in mente? Contattami per discuterne insieme.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard delay={0} className="p-8">
            <h3 className="text-white font-bold text-xl mb-8">Inviami un messaggio</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Il tuo nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 
                    focus:border-violet-500/50 focus:ring-violet-500/20 h-12 rounded-xl"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="La tua email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 
                    focus:border-violet-500/50 focus:ring-violet-500/20 h-12 rounded-xl"
                />
              </div>
              <div>
                <Textarea
                  placeholder="La tua idea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 
                    focus:border-violet-500/50 focus:ring-violet-500/20 min-h-[150px] rounded-xl resize-none"
                />
              </div>
              
              <Button
                type="submit"
                disabled={submitted}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 
                  hover:from-blue-500 hover:to-violet-500 text-white font-medium
                  shadow-lg shadow-violet-500/25 transition-all duration-300"
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Messaggio inviato!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Invia messaggio
                  </span>
                )}
              </Button>
            </form>
          </GlassCard>

          <div className="flex flex-col gap-6 h-full">
            <GlassCard delay={0.15} className="p-8 flex-[2] flex flex-col justify-center">
              <h3 className="text-white font-bold text-xl mb-6">Informazioni di contatto</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 
                      flex items-center justify-center border border-white/10">
                      <info.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard delay={0.3} className="p-8 flex-1 flex flex-col justify-center">
              <h3 className="text-white font-bold text-xl mb-6">Seguimi</h3>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10
                      flex items-center justify-center
                      hover:bg-white/10 hover:border-white/20
                      transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}