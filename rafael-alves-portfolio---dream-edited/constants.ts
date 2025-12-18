import { Project, SkillData, Language } from './types';

export const ASSETS = {
  noiseTexture: "https://grainy-gradients.vercel.app/noise.svg",
};

export const HERO_TEXT = {
  EN: { title: "DREAM", subtitle: "EDITED", role: "VFX // EDITING // 3D", cta: "SEE MORE" },
  PT: { title: "SONHO", subtitle: "EDITADO", role: "VFX // EDIÇÃO // 3D", cta: "VER MAIS" }
};

export const CONTACT_INFO = {
  email: "rafinha.alvescosta@gmail.com",
  phone: "+55 (41) 99527-3616",
  location: "Curitiba, PR, Brazil"
};

export const ABOUT_TEXT = {
  EN: {
    heading: "THE OPERATOR",
    name: "RAFAEL ALVES DA COSTA",
    role: "DIGITAL GAMES STUDENT // VFX ARTIST",
    bio: "I am a 19-year-old digital artisan based in Curitiba. My focus is on the convergence of raw footage and synthetic reality. I specialize in post-production, visual design, image manipulation and AI use.",
    stats: { pcd: "PCD (Partial Hearing / Hearing Aid User)", setup: "Local workspace" }
  },
  PT: {
    heading: "O OPERADOR",
    name: "RAFAEL ALVES DA COSTA",
    role: "ESTUDANTE DE JOGOS DIGITAIS // ARTISTA VFX",
    bio: "Tenho 19 anos, sou um artista digital baseado em Curitiba. Meu foco é na convergência entre filmagem bruta e realidade sintética. Especialista em pós-produção, design visual, manipulação de imagem e uso de IA.",
    stats: { pcd: "PCD (Audição Parcial / Usuário de Aparelho)", setup: "Estação de trabalho local" }
  }
};

export const SKILL_CATEGORIES: SkillData[] = [
  { name: { EN: 'Color Grading', PT: 'Colorização' }, level: 60, category: 'Visual' },
  { name: { EN: 'Compositing', PT: 'Composição' }, level: 90, category: 'Visual' },
  { name: { EN: '3D Logic', PT: 'Lógica 3D' }, level: 70, category: '3D' },
  { name: { EN: 'Sound Design', PT: 'Design de Som' }, level: 80, category: 'Audio' },
  { name: { EN: 'Motion', PT: 'Movimento' }, level: 70, category: 'Animation' },
  { name: { EN: 'Storytelling', PT: 'Narrativa' }, level: 80, category: 'Creative' },
];

export const SOFTWARE_STACK: SkillData[] = [
  { name: { EN: 'DaVinci Resolve', PT: 'DaVinci Resolve' }, level: 90, category: 'Software' },
  { name: { EN: 'After Effects', PT: 'After Effects' }, level: 75, category: 'Software' },
  { name: { EN: 'Photoshop', PT: 'Photoshop' }, level: 95, category: 'Software' },
  { name: { EN: 'Premiere Pro', PT: 'Premiere Pro' }, level: 80, category: 'Software' },
  { name: { EN: 'Blender', PT: 'Blender' }, level: 75, category: 'Software' },
];

export const UI_STRINGS = {
  EN: {
    works: "WORKS",
    archives: "SELECTED_FILES_FROM_ARCHIVE",
    scrollExplore: "SCROLL TO EXPLORE",
    clickDetails: "CLICK FOR DETAILS",
    viewCase: "VIEW_CASE",
    overview: "OVERVIEW",
    technicalDetails: "TECHNICAL_DETAILS",
    status: "STATUS: ARCHIVED",
    profileData: "PROFILE_DATA",
    coreCompetencies: "CORE_COMPETENCIES",
    softwareStack: "SOFTWARE_STACK",
    navHome: "HOME",
    navHomeSub: "SYSTEM_ROOT",
    navAbout: "ABOUT",
    navAboutSub: "PROFILE_DATA",
    navWork: "WORK",
    navWorkSub: "ARCHIVES",
    navContact: "CONTACT",
    navContactSub: "LINK_ESTABLISHED",
    navSystemOnline: "NAVIGATION_SYSTEM // ONLINE",
    footerStatus: "SYSTEM STATUS: ONLINE",
    footerCredits: "VISUAL ALCHEMIST"
  },
  PT: {
    works: "TRABALHOS",
    archives: "ARQUIVOS_SELECIONADOS",
    scrollExplore: "ROLE PARA EXPLORAR",
    clickDetails: "CLIQUE PARA DETALHES",
    viewCase: "VER_PROJETO",
    overview: "VISÃO GERAL",
    technicalDetails: "DETALHES_TÉCNICOS",
    status: "STATUS: ARQUIVADO",
    profileData: "DADOS_DO_PERFIL",
    coreCompetencies: "COMPETÊNCIAS_PRINCIPAIS",
    softwareStack: "FERRAMENTAS",
    navHome: "INÍCIO",
    navHomeSub: "RAIZ_DO_SISTEMA",
    navAbout: "SOBRE",
    navAboutSub: "DADOS_DO_PERFIL",
    navWork: "TRABALHO",
    navWorkSub: "ARQUIVOS",
    navContact: "CONTATO",
    navContactSub: "LINK_ESTABELECIDO",
    navSystemOnline: "SISTEMA_DE_NAVEGAÇÃO // ONLINE",
    footerStatus: "SISTEMA: ONLINE",
    footerCredits: "ALQUIMISTA VISUAL"
  }
};

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: { EN: 'CHROMA VELOCITY', PT: 'VELOCIDADE CHROMA' },
    category: { EN: 'Video Editing', PT: 'Edição de Vídeo' },
    year: '2024',
    type: 'video',
    mediaUrl: 'https://www.dropbox.com/scl/fi/x7ysw80bm31dsobwpgmms/Felps-Thumbnail-Gemini.jpeg?rlkey=lmexwivytovqwiqef7tkt1er6&st=et1x8jul&raw=1',
    videoUrl: 'https://www.dropbox.com/scl/fi/g0qbn45m1svwt14x8bze4/V-deo-AUTO-COMPLETAR-Felps-Portifolio.mp4?rlkey=ofomouc5q1rk0u3o7u0orpwjp&st=h05g46t9&raw=1',
    description: {
      EN: "High-octane music video editing with complex transitions.",
      PT: "Edição de videoclipe de alta energia com transições complexas."
    },
    details: {
      EN: "Edited in DaVinci Resolve using advanced color grading techniques to match the cyberpunk aesthetic.",
      PT: "Editado no DaVinci Resolve usando técnicas avançadas de color grading para combinar com a estética cyberpunk."
    }
  },
  {
    id: '02',
    title: { EN: 'NEON RECONSTRUCTION', PT: 'RECONSTRUÇÃO NEON' },
    category: { EN: 'Photo Manipulation', PT: 'Manipulação de Foto' },
    year: '2023',
    type: 'comparison',
    beforeImage: 'https://www.dropbox.com/scl/fi/yrrj96li3adi39dzxtdje/Lego-Cinematic.png?rlkey=cty6c484vc6zfcft1vlr8jutn&st=dne77760&raw=1',
    afterImage: 'https://www.dropbox.com/scl/fi/8321snxtq54k0wvacyy7p/Lego-Cinematic-Gemini.png?rlkey=m4citf0fw5gxdt21dp2oou3b1&st=3cu9mljd&raw=1',
    description: { EN: "Transformation of urban photography.", PT: "Transformação de fotografia urbana." },
    details: { EN: "A complex matte painting and composition work in Photoshop.", PT: "Um trabalho complexo de matte painting e composição no Photoshop." }
  },
  {
    id: '03',
    title: { EN: 'PROJECT TITAN', PT: 'PROJETO TITAN' },
    category: { EN: '3D Modeling', PT: 'Modelagem 3D' },
    year: '2024',
    type: 'image',
    mediaUrl: 'https://www.dropbox.com/scl/fi/g734wa9879hc50rg63q4a/Big-Daddy-Kane.png?rlkey=rwnk676ky5tw56rde77rmkuez&st=i865fjyf&raw=1',
    description: { EN: "Hard surface modeling character design.", PT: "Modelagem hard surface de personagem." },
    details: { EN: "Modeled and rendered in Blender.", PT: "Modelado e renderizado no Blender." }
  },
  {
    id: '04',
    title: { EN: 'AURA SYNC', PT: 'SINCRONIA AURA' },
    category: { EN: 'Motion Graphics', PT: 'Motion Graphics' },
    year: '2024',
    type: 'video',
    mediaUrl: 'https://www.dropbox.com/scl/fi/oph2hwx7jddg0wjcf1h6o/Peak-Thumbnail-Gemini.jpeg?rlkey=8v4of9ns3x5lzt7r0al74vp94&st=n43k109q&raw=1',
    videoUrl: 'https://www.dropbox.com/scl/fi/h4d54xt0gg89xppvl56ob/Grizzy-Peak-Portifolio.mp4?rlkey=50qi3jez0zd4pakcdssxn9fee&st=s60y3r5u&raw=1',
    description: { EN: "Abstract data visualization loops.", PT: "Loops abstratos de visualização de dados." },
    details: { EN: "Created in After Effects for massive LED walls.", PT: "Criado no After Effects para paredes de LED massivas." }
  },
  {
    id: '05',
    title: { EN: 'BOB WARS - VERTICAL', PT: 'BOB WARS - VERTICAL' },
    category: { EN: 'Photo Manipulation', PT: 'Manipulação de Foto' },
    year: '2023',
    type: 'comparison',
    beforeImage: 'https://www.dropbox.com/scl/fi/0vl0zss1dbur6qjb6eers/Bob-Wars-Final.png?rlkey=bmkjfcvcrrghngehrski6owxm&st=lxwjnnvj&raw=1',
    afterImage: 'https://www.dropbox.com/scl/fi/ttxnms1i6ykohb14xirbq/Bob-Wars-Gemini.png?rlkey=7s12vp7lhmfv3nszmi237aqsk&st=iwfyft6g&raw=1',
    description: { EN: "Vertical edit exploration.", PT: "Exploração de edição vertical." },
    details: { EN: "Full-scale vertical image manipulation.", PT: "Manipulação de imagem vertical em escala total." }
  }
];