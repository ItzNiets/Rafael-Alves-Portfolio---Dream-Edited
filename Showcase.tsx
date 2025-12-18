import React, { useState, useRef } from 'react';
import { PROJECTS, UI_STRINGS } from '../constants';
import { Language, Project } from '../types';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play, X, SlidersHorizontal, Maximize2 } from 'lucide-react';

interface ShowcaseProps {
    lang: Language;
}

const Showcase: React.FC<ShowcaseProps> = ({ lang }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="showcase" className="min-h-screen w-full py-24 px-4 bg-[#050505] relative border-t border-[#8A2BE2]/10">
            <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 px-4">
                <div>
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-2 uppercase font-oswald">{UI_STRINGS[lang].works}</h2>
                    <p className="font-mono text-[#8A2BE2] text-sm">// {UI_STRINGS[lang].archives}</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-gray-500 font-mono text-xs uppercase">{UI_STRINGS[lang].scrollExplore}</p>
                    <p className="text-gray-500 font-mono text-xs uppercase">{UI_STRINGS[lang].clickDetails}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col gap-32 px-4 pb-24">
                {PROJECTS.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        lang={lang}
                        onOpen={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        lang={lang}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
};

const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1];
    else if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : '';
};

const ProjectCard: React.FC<{ project: Project, index: number, lang: Language, onOpen: () => void }> = ({ project, index, lang, onOpen }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

    return (
        <motion.div ref={ref} style={{ scale, opacity }} className="group relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 relative aspect-video bg-[#111] overflow-hidden border border-[#333] group-hover:border-[#8A2BE2] transition-colors duration-500 cursor-pointer shadow-lg" onClick={onOpen}>
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="bg-black/50 backdrop-blur text-white text-[10px] px-2 py-1 font-mono border border-white/20 uppercase">
                            {project.type}
                        </span>
                    </div>
                    {project.type === 'comparison' && project.beforeImage && project.afterImage ? (
                        <CompareSlider before={project.beforeImage} after={project.afterImage} />
                    ) : project.type === 'video' && project.videoUrl ? (
                        <VideoPreview media={project.mediaUrl} video={project.videoUrl} />
                    ) : (
                        <img src={project.mediaUrl} alt={project.title[lang]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-[#8A2BE2] text-black p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"><Maximize2 size={24} /></div>
                    </div>
                </div>
                <div className="lg:col-span-4 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[#8A2BE2] font-mono text-xl">0{index + 1}</span>
                        <div className="h-[1px] flex-1 bg-[#333] group-hover:bg-[#8A2BE2] transition-colors"></div>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-[#8A2BE2] transition-colors cursor-pointer font-oswald" onClick={onOpen}>{project.title[lang]}</h3>
                    <p className="text-gray-400 mb-6 font-light">{project.description[lang]}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        <span className="text-xs border border-gray-800 px-2 py-1 text-gray-500 font-mono">{project.category[lang]}</span>
                        <span className="text-xs border border-gray-800 px-2 py-1 text-gray-500 font-mono">{project.year}</span>
                    </div>
                    <button onClick={onOpen} className="self-start flex items-center gap-2 text-sm font-bold tracking-widest hover:text-[#8A2BE2] transition-colors uppercase">
                        {UI_STRINGS[lang].viewCase} <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const CompareSlider: React.FC<{ before: string, after: string, fit?: 'cover' | 'contain' }> = ({ before, after, fit = 'cover' }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setSliderPos(((e.clientX - rect.left) / rect.width) * 100);
    };
    return (
        <div className="relative w-full h-full cursor-col-resize select-none overflow-hidden group" onMouseMove={handleMouseMove} ref={containerRef}>
            <img src={after} alt="After" className={`absolute inset-0 w-full h-full object-${fit}`} />
            <img src={before} alt="Before" className={`absolute inset-0 w-full h-full object-${fit}`} style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} />
            <div className="absolute top-0 bottom-0 w-1 bg-[#8A2BE2] z-10 flex items-center justify-center shadow-[0_0_15px_#8A2BE2]" style={{ left: `${sliderPos}%` }}>
                <div className="bg-[#8A2BE2] p-1 rounded-full"><SlidersHorizontal size={12} className="text-black" /></div>
            </div>
        </div>
    );
}

const VideoPreview: React.FC<{ media?: string, video: string }> = ({ media, video }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const isYT = isYouTubeUrl(video);
    return (
        <div className="relative w-full h-full" onMouseEnter={() => { if (!isYT) { videoRef.current?.play(); setIsPlaying(true); } }} onMouseLeave={() => { if (!isYT) { videoRef.current?.pause(); setIsPlaying(false); } }}>
            <img src={media} alt="Thumbnail" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
            {!isYT && <video ref={videoRef} src={video} className="w-full h-full object-cover" muted loop playsInline />}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/30 p-4 rounded-full backdrop-blur-sm border border-white/10"><Play className="text-white w-8 h-8 fill-white" /></div>
                </div>
            )}
        </div>
    );
}

const ProjectModal: React.FC<{ project: Project, lang: Language, onClose: () => void }> = ({ project, lang, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto md:overflow-hidden md:flex md:items-center md:justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full min-h-full md:min-h-0 md:h-auto md:max-h-[90vh] md:max-w-6xl bg-[#050505] border-0 md:border border-[#333] flex flex-col md:flex-row shadow-[0_0_50px_rgba(138,43,226,0.1)] md:rounded-lg overflow-y-auto md:overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="fixed top-4 right-4 md:absolute md:top-4 md:right-4 z-[70] text-white hover:text-[#8A2BE2] bg-black/50 p-3 md:p-2 rounded-full backdrop-blur-md border border-white/10"
                >
                    <X size={24} />
                </button>

                <div className="w-full md:w-2/3 bg-black flex items-center justify-center overflow-hidden min-h-[40vh] md:min-h-[50vh] shrink-0 relative">
                    {project.type === 'video' ? (
                        isYouTubeUrl(project.videoUrl || '') ? (
                            <iframe src={getYouTubeEmbedUrl(project.videoUrl || '')} className="w-full h-full aspect-video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                        ) : (
                            <video src={project.videoUrl} controls autoPlay className="w-full max-h-[60vh] md:max-h-full object-contain" />
                        )
                    ) : project.type === 'comparison' ? (
                        <div className="w-full h-[50vh] md:h-full relative"><CompareSlider before={project.beforeImage!} after={project.afterImage!} fit="contain" /></div>
                    ) : (
                        <img src={project.mediaUrl} alt={project.title[lang]} className="w-full h-auto max-h-[60vh] md:max-h-[85vh] object-contain" />
                    )}
                </div>

                <div className="w-full md:w-1/3 p-6 md:p-12 bg-[#0A0A0A] border-t md:border-t-0 md:border-l border-[#333] flex flex-col">
                    <div className="mb-8 mt-8 md:mt-0">
                        <span className="text-[#8A2BE2] font-mono text-xs border border-[#8A2BE2] px-2 py-1">{project.category[lang]}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-2 font-oswald leading-tight">{project.title[lang]}</h2>
                        <span className="font-mono text-gray-500">{project.year}</span>
                    </div>
                    <div className="space-y-6 flex-grow">
                        <div><h4 className="font-mono text-xs text-gray-500 mb-2">// {UI_STRINGS[lang].overview}</h4><p className="text-gray-300 font-light text-sm md:text-base">{project.description[lang]}</p></div>
                        <div><h4 className="font-mono text-xs text-gray-500 mb-2">// {UI_STRINGS[lang].technicalDetails}</h4><p className="text-gray-300 font-light text-sm md:text-base">{project.details[lang]}</p></div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-[#222] font-mono text-xs text-gray-600 pb-8 md:pb-0">
                        <p>FILE_ID: {project.id}_XYZ_00{project.id}</p>
                        <p>{UI_STRINGS[lang].status}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Showcase;