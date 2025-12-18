import React, { useState } from 'react';
import { Language } from '../types';
import { Menu, Globe, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, UI_STRINGS } from '../constants';

interface NavigationProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navigation: React.FC<NavigationProps> = ({ lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: UI_STRINGS[lang].navHome, id: 'root', sub: UI_STRINGS[lang].navHomeSub },
    { label: UI_STRINGS[lang].navAbout, id: 'about', sub: UI_STRINGS[lang].navAboutSub },
    { label: UI_STRINGS[lang].navWork, id: 'showcase', sub: UI_STRINGS[lang].navWorkSub },
    { label: UI_STRINGS[lang].navContact, id: 'footer', sub: UI_STRINGS[lang].navContactSub }
  ];

  const handleScrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'root') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-6 py-8 flex justify-between items-start z-50 pointer-events-none">
        
        {/* New Typographic Logo Design */}
        <div 
          className="pointer-events-auto cursor-pointer group flex flex-col items-start leading-none" 
          onClick={() => handleScrollTo('root')}
        >
          <div className="flex flex-col">
            <span className="text-4xl font-bold tracking-tighter text-white font-oswald group-hover:text-[#8A2BE2] transition-colors duration-300">
              RAFAEL
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-[2px] w-8 bg-[#8A2BE2]"></div>
              <span className="text-[10px] font-mono tracking-[0.4em] text-[#8A2BE2] uppercase">
                ALVES
              </span>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-end gap-4 pointer-events-auto">
            <button 
                onClick={() => setIsMenuOpen(true)}
                className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-4 rounded-full text-white hover:bg-[#8A2BE2] hover:text-black hover:border-[#8A2BE2] transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
                <div className="flex flex-col gap-1 items-end w-6 justify-center h-4">
                    <span className="h-[2px] bg-current transition-all duration-300 w-5 group-hover:w-full"></span>
                    <span className="h-[2px] bg-current transition-all duration-300 w-4 group-hover:w-full"></span>
                    <span className="h-[2px] bg-current transition-all duration-300 w-5 group-hover:w-full"></span>
                </div>
            </button>
            
            <button 
                onClick={() => setLang(lang === 'EN' ? 'PT' : 'EN')}
                className="bg-[#0A0A0A]/50 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold font-mono text-gray-300 hover:text-white hover:border-[#8A2BE2] hover:bg-[#8A2BE2]/10 transition-all duration-300"
            >
                <Globe size={16} />
                <span>{lang}</span>
            </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col justify-center items-center backdrop-blur-2xl bg-black/90"
          >
            <div 
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{ backgroundImage: `url('${ASSETS.noiseTexture}')` }}
            ></div>
            
            <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 text-white hover:text-[#8A2BE2] transition-colors bg-white/5 p-4 rounded-full border border-white/10"
            >
                <X size={28} />
            </button>

            <div className="relative z-10 flex flex-col gap-2 w-full max-w-2xl px-6">
                {menuItems.map((item, index) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="group relative cursor-pointer border-b border-white/10 py-6 flex items-center justify-between"
                        onClick={() => handleScrollTo(item.id)}
                    >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 -z-10"></div>
                        
                        <div className="flex flex-col">
                             <span className="text-[10px] font-mono text-[#8A2BE2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                 // {item.sub}
                             </span>
                             <h2 className="text-5xl md:text-7xl font-bold text-gray-500 group-hover:text-white transition-colors duration-300 font-oswald uppercase tracking-tight">
                                {item.label}
                            </h2>
                        </div>

                        <div className="text-[#8A2BE2] opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-300">
                             <ArrowRight size={40} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 left-0 w-full text-center"
            >
                <p className="text-gray-600 font-mono text-xs tracking-widest uppercase">{UI_STRINGS[lang].navSystemOnline}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;