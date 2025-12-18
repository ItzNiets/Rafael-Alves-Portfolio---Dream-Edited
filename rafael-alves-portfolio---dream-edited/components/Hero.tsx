import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { HERO_TEXT, ASSETS } from '../constants';
import { Language } from '../types';
import { Scissors, Grip } from 'lucide-react';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse tracking with spring for smooth interpolation
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 40, stiffness: 120 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] perspective-[1000px] px-6"
    >
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay z-10"
        style={{ backgroundImage: `url('${ASSETS.noiseTexture}')` }}
      ></div>
      
      <div className="absolute inset-0 z-0 opacity-70 mix-blend-screen pointer-events-none">
         <GridWaveCanvas mouseX={springX} mouseY={springY} />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-4">
        <motion.div 
            style={{ x: useTransform(springX, [0, 1], [-20, 20]) }}
            className="text-center md:text-left relative"
        >
            <div className="mb-2 flex items-center justify-center md:justify-start gap-4 ml-1">
                <div className="h-[1px] w-8 bg-[#8A2BE2]"></div>
                <span className="text-[#8A2BE2] font-mono tracking-[0.5em] text-[10px] uppercase">
                    {HERO_TEXT[lang].role}
                </span>
            </div>

            <h1 className="text-[14vw] md:text-[10vw] leading-[0.85] font-bold tracking-tighter font-oswald text-white uppercase mix-blend-screen">
                {HERO_TEXT[lang].title}
                <br />
                <span className="relative inline-block text-[#8A2BE2]">
                    {HERO_TEXT[lang].subtitle}
                </span>
            </h1>
        </motion.div>

        <motion.div 
            style={{ 
                x: useTransform(springX, [0, 1], [30, -30]),
                y: useTransform(springY, [0, 1], [30, -30])
            }}
            className="relative z-30 hidden md:block mt-24 md:mt-0 md:-ml-12"
        >
            <EditorTimeline />
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity, y: y1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer group"
        onClick={scrollToAbout}
      >
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] group-hover:text-[#8A2BE2] transition-colors">{HERO_TEXT[lang].cta}</span>
        <div className="w-[1px] h-12 bg-[#8A2BE2]/40 group-hover:bg-[#8A2BE2] transition-colors"></div>
      </motion.div>
    </section>
  );
};

const EditorTimeline = () => {
    return (
        <div className="relative group">
            <div className="w-[300px] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-lg p-3 transform rotate-[-6deg] group-hover:rotate-0 transition-all duration-700">
                <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    </div>
                    <div className="text-[8px] font-mono text-gray-500 flex items-center gap-1">
                        <Grip size={8} /> MASTER_SEQ_01
                    </div>
                </div>

                <div className="space-y-1.5 relative overflow-hidden h-[90px]">
                    <motion.div 
                        className="absolute top-0 bottom-0 w-[1px] bg-[#8A2BE2] z-10 opacity-70"
                        animate={{ left: ['5%', '95%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 -translate-x-1/2 -mt-1 w-1.5 h-1.5 bg-[#8A2BE2] transform rotate-45"></div>
                    </motion.div>

                    <div className="h-6 bg-white/5 rounded-sm w-full flex items-center relative overflow-hidden border border-white/5">
                        <div className="absolute left-[10%] w-[35%] h-full bg-[#8A2BE2]/20 border-l border-r border-[#8A2BE2]/40"></div>
                        <div className="absolute left-[50%] w-[40%] h-full bg-[#8A2BE2]/10 border-l border-r border-[#8A2BE2]/20"></div>
                    </div>
                    
                    <div className="h-6 bg-white/5 rounded-sm w-full flex items-center relative overflow-hidden border border-white/5">
                        <div className="absolute left-[20%] w-[55%] h-full bg-white/10 border-l border-r border-white/20"></div>
                    </div>

                    <div className="h-5 bg-white/5 rounded-sm w-full flex items-end px-0.5 pb-0.5 relative gap-[1px]">
                         {[...Array(25)].map((_, i) => (
                            <motion.div 
                                key={i}
                                className="w-full bg-[#8A2BE2]/30 rounded-[1px]"
                                animate={{ height: [`${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`] }}
                                transition={{ duration: 0.3, repeat: Infinity, repeatType: 'mirror' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <motion.div 
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-black/80 backdrop-blur border border-[#8A2BE2]/30 p-2 rounded-lg text-[#8A2BE2]"
            >
                <Scissors size={14} />
            </motion.div>
        </div>
    );
};

const GridWaveCanvas: React.FC<{ mouseX: any, mouseY: any }> = ({ mouseX, mouseY }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Optimized Grid Settings
        const cols = 24; 
        const rows = 18;
        
        const render = () => {
            time += 0.01;
            const w = canvas.width = window.innerWidth;
            const h = canvas.height = window.innerHeight;
            const size = Math.max(w, h) / 20;

            ctx.clearRect(0, 0, w, h);
            
            const mx = mouseX.get() * w;
            const my = mouseY.get() * h;

            // Subtler background light flare to emphasize the grid more
            const bgGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 500);
            bgGradient.addColorStop(0, 'rgba(138, 43, 226, 0.15)');
            bgGradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, w, h);

            const points: {x: number, y: number, alpha: number, thickness: number}[][] = [];

            for (let r = 0; r < rows; r++) {
                points[r] = [];
                for (let c = 0; c < cols; c++) {
                    let x = c * size + (w / 2 - (cols * size) / 2);
                    let y = r * size + (h / 2 - (rows * size) / 2);

                    const dx = x - mx; 
                    const dy = y - my;
                    const distToMouse = Math.sqrt(dx*dx + dy*dy);
                    
                    const wave = Math.sin((c + r) * 0.3 + time) * 8;
                    const interaction = Math.max(0, (250 - distToMouse)) * 0.15;
                    
                    // High-contrast alpha and dynamic thickness for "powered" grid look
                    let alpha = Math.max(0.04, 0.8 - distToMouse / 400);
                    let thickness = Math.max(1, 2.5 - distToMouse / 150);

                    points[r][c] = { x: x + interaction, y: y + wave, alpha, thickness };
                }
            }

            // Draw Paths
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const p = points[r][c];
                    
                    // Horizontal
                    if (c < cols - 1) {
                        const p2 = points[r][c+1];
                        ctx.beginPath();
                        ctx.lineWidth = (p.thickness + p2.thickness) / 2;
                        ctx.strokeStyle = `rgba(138, 43, 226, ${(p.alpha + p2.alpha) / 2})`;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }

                    // Vertical
                    if (r < rows - 1) {
                        const p2 = points[r+1][c];
                        ctx.beginPath();
                        ctx.lineWidth = (p.thickness + p2.thickness) / 2;
                        ctx.strokeStyle = `rgba(138, 43, 226, ${(p.alpha + p2.alpha) / 2})`;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = window.requestAnimationFrame(render);
        };

        render();
        return () => window.cancelAnimationFrame(animationFrameId);
    }, [mouseX, mouseY]);

    return <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />;
};

export default Hero;