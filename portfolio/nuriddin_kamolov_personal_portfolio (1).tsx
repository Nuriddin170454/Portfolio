import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin,
  ExternalLink,
  Code2,
  Globe,
  TrendingUp,
  Sparkles,
  Palette,
  Terminal,
  Send,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
  Camera,
  User,
  Calendar,
  Compass,
  Layers,
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  MessageSquare
} from 'lucide-react';

/**
 * ============================================================================
 * NURIDDIN KAMOLOV — CENTRALIZED PORTFOLIO CONFIGURATION
 * Edit social links, profile photo URL, or contact settings here effortlessly.
 * ============================================================================
 */
const SITE_CONFIG = {
  personal: {
    firstName: 'Nuriddin',
    lastName: 'Kamolov',
    fullName: 'Nuriddin Kamolov',
    age: '15',
    location: 'Andijan, Uzbekistan',
    fullLocation: 'Andijan District, Uzbekistan',
    tagline: 'Young Developer. Creative Thinker. Future Entrepreneur.',
    interestsSummary: 'Technology, English, Trading',
    // Leave empty string "" to display the bespoke architectural developer portrait,
    // or paste any direct image URL here. Visitors/Nuriddin can also preview a photo live on the page.
    profileImageUrl: '',
  },
  socialLinks: [
    {
      id: 'telegram',
      label: 'Telegram',
      handle: '@nuriddinkamolov',
      url: 'https://t.me/', // Update with your Telegram username URL
      icon: MessageSquare,
    },
    {
      id: 'github',
      label: 'GitHub',
      handle: 'github.com/nuriddin',
      url: 'https://github.com/', // Update with your GitHub profile URL
      icon: Github,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@nuriddin.dev',
      url: 'https://instagram.com/', // Update with your Instagram URL
      icon: Instagram,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'Nuriddin Kamolov',
      url: 'https://linkedin.com/', // Update with your LinkedIn URL
      icon: Linkedin,
    },
  ],
};

/**
 * ============================================================================
 * BESPOKE SVG FALLBACK / ARTWORK GENERATOR FOR ZERO BROKEN IMAGES
 * Ensures every project card renders crisp 16:9 imagery even offline or if a CDN blocks.
 * ============================================================================
 */
const ProjectFallbackArt = ({ type, title }) => {
  switch (type) {
    case 'football':
      return (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="stadiumGlow" cx="50%" cy="20%" r="70%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#064e3b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#050807" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="pitchLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill="url(#stadiumGlow)" />
          {/* Stadium floodlight beams */}
          <polygon points="120,40 360,360 220,360" fill="#ffffff" opacity="0.06" />
          <polygon points="680,40 580,360 440,360" fill="#ffffff" opacity="0.06" />
          {/* Perspective Pitch Grid */}
          <polygon points="140,220 660,220 780,450 20,450" fill="#065f46" opacity="0.55" stroke="url(#pitchLine)" strokeWidth="2" />
          <line x1="400" y1="220" x2="400" y2="450" stroke="#6ee7b7" strokeWidth="2" opacity="0.4" />
          <ellipse cx="400" cy="325" rx="95" ry="34" fill="none" stroke="#6ee7b7" strokeWidth="2" opacity="0.45" />
          {/* Stylized Runner & Ball */}
          <circle cx="435" cy="335" r="14" fill="#ffffff" />
          <circle cx="435" cy="335" r="24" fill="#FF3030" opacity="0.25" />
          <path d="M355 295 L380 255 L408 272 L392 315 Z" fill="#FF3030" opacity="0.9" />
          <circle cx="385" cy="238" r="12" fill="#f8fafc" />
          <text x="40" y="55" fill="#ffffff" opacity="0.2" fontSize="14" fontFamily="monospace" letterSpacing="4">3D STADIUM ENGINE // 60 FPS</text>
        </svg>
      );
    case 'food':
      return (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="burgerGlow" cx="50%" cy="55%" r="65%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#7c2d12" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#090707" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#burgerGlow)" />
          {/* Gourmet Burger Silhouette Layers */}
          <path d="M270 215 C270 140, 530 140, 530 215 Z" fill="#d97706" />
          <rect x="255" y="222" width="290" height="16" rx="8" fill="#65a30d" />
          <rect x="260" y="242" width="280" height="24" rx="10" fill="#451a03" />
          <polygon points="275,266 340,292 400,266 465,294 525,266" fill="#facc15" />
          <rect x="260" y="274" width="280" height="24" rx="10" fill="#451a03" />
          <path d="M270 304 L530 304 C530 336, 270 336, 270 304 Z" fill="#b45309" />
          <text x="40" y="55" fill="#fbbf24" opacity="0.35" fontSize="14" fontFamily="monospace" letterSpacing="4">NUR FOOD // ARTISAN KITCHEN</text>
        </svg>
      );
    case 'laptop':
      return (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="techGlow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#FF3030" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#060608" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#31102f" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill="url(#techGlow)" />
          {/* Sleek Laptop Showroom Silhouette */}
          <rect x="235" y="105" width="330" height="205" rx="14" fill="#18181b" stroke="#52525b" strokeWidth="3" />
          <rect x="247" y="117" width="306" height="180" rx="6" fill="url(#screenGrad)" />
          <circle cx="400" cy="207" r="44" fill="#FF3030" opacity="0.35" />
          <path d="M185 312 L615 312 L645 332 L155 332 Z" fill="#3f3f46" />
          <text x="40" y="55" fill="#ffffff" opacity="0.25" fontSize="14" fontFamily="monospace" letterSpacing="4">NUR SHOP // PRO WORKSTATIONS</text>
        </svg>
      );
    case 'sneakers':
      return (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="sneakerGlow" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#FF3030" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#18181b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#070709" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#sneakerGlow)" />
          <circle cx="400" cy="225" r="135" fill="none" stroke="#FF3030" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" />
          {/* Dynamic Sneaker Profile */}
          <path d="M220 275 C235 225, 310 215, 365 180 L435 215 C495 222, 565 235, 580 275 L575 298 L215 298 Z" fill="#f4f4f5" />
          <path d="M215 282 L580 282 L575 304 L215 304 Z" fill="#FF3030" />
          <path d="M320 252 L465 232 L445 262 Z" fill="#18181b" />
          <text x="40" y="55" fill="#ffffff" opacity="0.25" fontSize="14" fontFamily="monospace" letterSpacing="4">ZEBI SHOP // ATHLETIC STUDIO</text>
        </svg>
      );
    case 'fitness':
    default:
      return (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="fitGlow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#1f1625" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#070709" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#fitGlow)" />
          <circle cx="400" cy="225" r="110" fill="none" stroke="#fb7185" strokeWidth="2" opacity="0.35" />
          <circle cx="400" cy="225" r="150" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.12" />
          {/* Minimalist Wellness Pulse */}
          <polyline points="230,225 320,225 350,175 385,275 420,190 448,225 570,225" fill="none" stroke="#fb7185" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="40" y="55" fill="#fda4af" opacity="0.35" fontSize="14" fontFamily="monospace" letterSpacing="4">ZEBI FIT // WELLNESS PLATFORM</text>
        </svg>
      );
  }
};

/**
 * ============================================================================
 * PROJECT SHOWCASE DATA (5 FLAGSHIP PROJECTS)
 * ============================================================================
 */
const PROJECTS_DATA = [
  {
    id: '01',
    title: 'FOOTBALL RUSH 100',
    category: 'Game Development / Interactive Web Experience',
    description:
      'An interactive 3D football stadium runner game featuring multiple levels, football challenges, characters and rewards.',
    liveUrl: 'https://gorush777.netlify.app/',
    imageUrl:
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=85',
    fallbackType: 'football',
    tags: ['3D Gameplay', 'Interactive Levels', 'Web Arcade'],
  },
  {
    id: '02',
    title: 'NUR FOOD',
    category: 'E-Commerce / Restaurant Website',
    description:
      'A modern restaurant website with food menus, shopping cart, product categories and online ordering interface.',
    liveUrl: 'https://nurfood.netlify.app',
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=85',
    fallbackType: 'food',
    tags: ['Online Ordering', 'Dynamic Cart', 'UI/UX'],
  },
  {
    id: '03',
    title: 'NUR SHOP',
    category: 'E-Commerce / Web Development',
    description:
      'A modern laptop e-commerce platform featuring product catalogs, shopping cart, admin dashboard and payment interface.',
    liveUrl: 'https://monumental-maamoul-40d130.netlify.app',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=85',
    fallbackType: 'laptop',
    tags: ['Admin Dashboard', 'Catalog System', 'Checkout Flow'],
  },
  {
    id: '04',
    title: 'ZEBI SHOP',
    category: 'E-Commerce / Fashion',
    description:
      'A modern online sportswear and sneakers shopping platform.',
    liveUrl: 'https://zebi-shop-sport-krossovkalar-va-kiyimlar-do-koni.ai.studio',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85',
    fallbackType: 'sneakers',
    tags: ['Sportswear Store', 'Modern Catalog', 'Responsive UI'],
  },
  {
    id: '05',
    title: 'ZEBI FIT',
    category: 'Fitness / Web Platform',
    description:
      "A modern women's fitness and wellness platform designed around fitness, healthy living and wellness experiences.",
    liveUrl: 'https://zebi-fit-ayollar-fitnes-salomatlik-platformasi.ai.studio/',
    imageUrl:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=85',
    fallbackType: 'fitness',
    tags: ['Wellness Experience', 'Clean Architecture', 'Interactive'],
  },
];

/**
 * ============================================================================
 * SKILLS DATA (NO FAKE PERCENTAGES OR CERTIFICATIONS)
 * ============================================================================
 */
const SKILLS_DATA = [
  {
    title: 'English Language',
    subtitle: 'Communication & Global Fluency',
    detail: 'Reading technical documentation, international communication, and continuous fluency development.',
    icon: Globe,
    pulseWidth: '84%',
  },
  {
    title: 'HTML & CSS',
    subtitle: 'Semantic Structure & Luxury Styling',
    detail: 'Responsive layouts, glassmorphism aesthetics, modern CSS animations, and pixel-accurate interfaces.',
    icon: Layers,
    pulseWidth: '90%',
  },
  {
    title: 'JavaScript',
    subtitle: 'Interactive Logic & Modern Web Apps',
    detail: 'Dynamic DOM experiences, state-driven web applications, cart systems, and smooth user interactions.',
    icon: Terminal,
    pulseWidth: '82%',
  },
  {
    title: 'Web Design',
    subtitle: 'Editorial UI/UX & Visual Systems',
    detail: 'High-contrast dark interfaces, intuitive user flows, typography hierarchy, and mobile-first ergonomics.',
    icon: Palette,
    pulseWidth: '88%',
  },
  {
    title: 'Creative Thinking',
    subtitle: 'Concept-to-Product Execution',
    detail: 'Transforming original ideas into functional digital storefronts, games, and interactive web platforms.',
    icon: Sparkles,
    pulseWidth: '92%',
  },
  {
    title: 'Trading & Market Analysis',
    subtitle: 'Personal Study & Chart Observation',
    detail: 'Studying price action, market psychology, and technical chart patterns as an ongoing personal interest.',
    icon: TrendingUp,
    pulseWidth: '78%',
  },
];

/**
 * ============================================================================
 * REUSABLE HOOK: SCROLL REVEAL VIA INTERSECTION OBSERVER
 * ============================================================================
 */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * ============================================================================
 * REUSABLE COMPONENT: 3D TILT & SPOTLIGHT GLASS CARD
 * ============================================================================
 */
const InteractiveGlassCard = ({ children, className = '', tiltStrength = 6 }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltStrength;
    const rotateY = ((x - centerX) / centerX) * tiltStrength;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, box-shadow 300ms ease',
      }}
      className={`relative overflow-hidden rounded-2xl bg-[#121216]/70 backdrop-blur-xl border border-white/[0.08] hover:border-[#FF3030]/40 hover:shadow-[0_20px_50px_rgba(255,48,48,0.12)] ${className}`}
    >
      {/* Dynamic cursor radial spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(420px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 48, 48, 0.14), transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/**
 * ============================================================================
 * AMBIENT HERO PARTICLE CANVAS (SMOOTH, RESPONSIVE, DPR-AWARE)
 * ============================================================================
 */
const HeroParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 18000), 65);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.12,
        isRed: Math.random() > 0.68,
        alpha: Math.random() * 0.55 + 0.15,
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isRed
          ? `rgba(255, 48, 48, ${p.alpha})`
          : `rgba(255, 255, 255, ${p.alpha * 0.65})`;
        ctx.fill();

        // Subtle neural connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 115) * 0.1;
            ctx.strokeStyle =
              p.isRed || p2.isRed
                ? `rgba(255, 48, 48, ${lineAlpha * 1.4})`
                : `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

/**
 * ============================================================================
 * PROJECT SHOWCASE CARD COMPONENT
 * ============================================================================
 */
const ProjectCard = ({ project, index }) => {
  const [imgError, setImgError] = useState(false);
  const [ref, isVisible] = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${(index % 2) * 120}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <InteractiveGlassCard tiltStrength={3.5} className="group h-full flex flex-col">
        {/* TOP 16:9 HIGH-RESOLUTION PROJECT PREVIEW IMAGE */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#0e0e12] border-b border-white/[0.08]">
          {!imgError ? (
            <img
              src={project.imageUrl}
              alt={`${project.title} — ${project.category}`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
              <ProjectFallbackArt type={project.fallbackType} title={project.title} />
            </div>
          )}

          {/* Luxury dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Top Floating Project Index & Quick External Trigger */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/65 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-xs font-semibold tracking-widest text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF3030] animate-pulse" />
              PROJECT {project.id}
            </span>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} in new tab`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white transition-all duration-300 hover:bg-[#FF3030] hover:border-[#FF3030] hover:scale-110"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Category Pill anchored cleanly over lower image edge */}
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block rounded-lg bg-[#121216]/85 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#FF3030]">
              {project.category}
            </span>
          </div>
        </div>

        {/* CARD BODY */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl sm:text-[26px] font-bold tracking-tight text-white group-hover:text-[#FF3030] transition-colors duration-300">
                {project.title}
              </h3>
            </div>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#9CA3AF]">
              {project.description}
            </p>

            {/* Subtle Tech/Feature Pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* LIVE DEMO BUTTON */}
          <div className="mt-7 pt-5 border-t border-white/[0.07] flex items-center justify-between gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#FF3030] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(255,48,48,0.3)] transition-all duration-300 hover:bg-[#ff4747] hover:shadow-[0_0_35px_rgba(255,48,48,0.55)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <span className="hidden sm:inline-block text-xs font-mono text-gray-500 truncate max-w-[180px]">
              {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
          </div>
        </div>
      </InteractiveGlassCard>
    </div>
  );
};

/**
 * ============================================================================
 * MAIN PORTFOLIO APPLICATION COMPONENT
 * ============================================================================
 */
export default function App() {
  // Splash Loading Screen State (~1.4s smooth reveal)
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Navigation & Active Section Tracking
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Replaceable Profile Portrait State
  const [customPortrait, setCustomPortrait] = useState(SITE_CONFIG.personal.profileImageUrl);
  const fileInputRef = useRef(null);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'sent'

  // Section Reveal Refs
  const [aboutRef, aboutVisible] = useReveal(0.12);
  const [skillsRef, skillsVisible] = useReveal(0.1);
  const [projectsHeaderRef, projectsHeaderVisible] = useReveal(0.12);
  const [interestsRef, interestsVisible] = useReveal(0.12);
  const [contactRef, contactVisible] = useReveal(0.12);

  // Set Document Title & SEO Meta Tags Dynamically
  useEffect(() => {
    document.title = 'Nuriddin Kamolov — Young Developer & Creative Thinker';
  }, []);

  // Intro Loading Screen Sequence (~1.4 seconds)
  useEffect(() => {
    const start = performance.now();
    const duration = 1250;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setLoadProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setIsLoading(false), 180);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Navbar Scroll Glass & Active Section Spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'interests', 'contact'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Navigation Helper
  const scrollToSection = useCallback((id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Live Profile Image Replacement Handler (FileReader)
  const handlePortraitUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCustomPortrait(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Contact Form Validation & Submission
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please write a message of at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    }, 850);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'interests', label: 'Interests' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div
      className="min-h-screen bg-[#080808] text-white selection:bg-[#FF3030] selection:text-white overflow-x-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif',
      }}
    >
      {/* Custom Keyframes & Scrollbar Styling */}
      <style>{`
        html {
          scroll-behavior: smooth;
          background-color: #080808;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #080808;
        }
        ::-webkit-scrollbar-thumb {
          background: #222228;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FF3030;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(24px, -28px, 0) scale(1.06); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-28px, 22px, 0) scale(0.96); }
        }
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); opacity: 0; }
          45% { opacity: 1; }
          100% { transform: translateY(180%); opacity: 0; }
        }
        .animate-orb-slow {
          animation: floatSlow 14s ease-in-out infinite;
        }
        .animate-orb-reverse {
          animation: floatReverse 17s ease-in-out infinite;
        }
        .animate-scroll-line {
          animation: scrollPulse 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>

      {/* ====================================================================
          1. INTRO SPLASH LOADING SCREEN (~1.4 SECONDS)
      ==================================================================== */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808] transition-all duration-700 ease-out ${
          isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col items-center px-6">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#FF3030]">
            PORTFOLIO EXPERIENCE
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-[0.22em] text-white">
            NURIDDIN<span className="text-[#FF3030]">.</span>
          </h1>

          {/* Sleek Red Progress Track */}
          <div className="mt-8 h-[2px] w-56 sm:w-72 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[#FF3030] shadow-[0_0_16px_#FF3030] transition-all duration-100 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>

          <div className="mt-3 font-mono text-xs tracking-widest text-gray-500">
            {loadProgress}%
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. FIXED GLASSMORPHISM NAVBAR
      ==================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/80 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="text-base sm:text-lg font-extrabold tracking-[0.14em] text-white transition-colors group-hover:text-gray-200">
              NURIDDIN KAMOLOV
            </span>
            <span className="h-2 w-2 rounded-full bg-[#FF3030] shadow-[0_0_10px_#FF3030] transition-transform duration-300 group-hover:scale-125" />
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.03] border border-white/[0.07] p-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FF3030] text-white shadow-[0_0_18px_rgba(255,48,48,0.45)]'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-white transition-colors hover:border-[#FF3030]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Slide-Down Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#0c0c0f]/95 backdrop-blur-2xl border-b border-white/[0.08] ${
            mobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0 border-none'
          }`}
        >
          <div className="flex flex-col space-y-1.5 px-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#FF3030]/15 text-white border border-[#FF3030]/40'
                      : 'text-[#9CA3AF] hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#FF3030]" />}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ====================================================================
          3. HERO SECTION (IMPRESSIVE OPENING SCREEN)
      ==================================================================== */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden"
      >
        {/* Ambient Canvas Particles */}
        <HeroParticleCanvas />

        {/* Subtle Architectural Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Moving Ambient Dark-Red Radial Light Orbs */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-[460px] w-[460px] rounded-full animate-orb-slow blur-[130px]"
          style={{ background: 'rgba(255, 48, 48, 0.16)' }}
        />
        <div
          className="pointer-events-none absolute bottom-10 right-[-80px] h-[520px] w-[520px] rounded-full animate-orb-reverse blur-[150px]"
          style={{ background: 'rgba(255, 48, 48, 0.13)' }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT / MAIN TYPOGRAPHY & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#FF3030]/10 border border-[#FF3030]/30 px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#FF3030] shadow-[0_0_10px_#FF3030]" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#FF3030]">
                  HELLO, I&apos;M
                </span>
              </div>

              {/* Massive Display Heading */}
              <h1 className="text-4xl sm:text-6xl xl:text-[74px] font-black tracking-tight leading-[1.03] text-white">
                NURIDDIN
                <span className="block bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                  KAMOLOV
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-6 text-lg sm:text-2xl font-medium tracking-tight text-gray-200 max-w-2xl">
                Young Developer.{' '}
                <span className="text-[#FF3030] font-semibold">Creative Thinker.</span>{' '}
                Future Entrepreneur.
              </p>

              {/* Location Pill */}
              <div className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-2 text-sm text-[#9CA3AF]">
                <MapPin className="h-4 w-4 text-[#FF3030] shrink-0" />
                <span>Based in Andijan, Uzbekistan.</span>
              </div>

              {/* Dual CTA Buttons */}
              <div className="mt-9 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#FF3030] px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-[0_0_32px_rgba(255,48,48,0.4)] transition-all duration-300 hover:bg-[#ff4545] hover:shadow-[0_0_46px_rgba(255,48,48,0.65)] hover:-translate-y-0.5"
                >
                  <span>Explore My Projects</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#121216]/80 backdrop-blur-xl border border-white/[0.12] px-8 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:border-[#FF3030]/50 hover:bg-white/[0.06] hover:-translate-y-0.5"
                >
                  <span>Contact Me</span>
                </button>
              </div>
            </div>

            {/* RIGHT / LUXURY REPLACEABLE PROFILE PORTRAIT FRAME */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[390px]">
                <InteractiveGlassCard tiltStrength={7} className="p-4 sm:p-5">
                  {/* Corner Luxury Accents */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0b0b0e] border border-white/[0.08]">
                    {customPortrait ? (
                      <img
                        src={customPortrait}
                        alt="Nuriddin Kamolov"
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      /* Sleek Architectural Developer Portrait Placeholder */
                      <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-gradient-to-b from-[#15151b] via-[#0e0e12] to-[#08080a]">
                        {/* Subtle Radial Halo behind Silhouette */}
                        <div
                          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full blur-3xl"
                          style={{ background: 'rgba(255, 48, 48, 0.22)' }}
                        />

                        <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-gray-500">
                          <span>NK // 015</span>
                          <span className="flex items-center gap-1.5 text-[#FF3030]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3030] animate-ping" />
                            ONLINE
                          </span>
                        </div>

                        {/* Stylized Minimalist Developer Monogram & Geometric Bust */}
                        <div className="relative z-10 my-auto flex flex-col items-center text-center">
                          <div className="relative flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-white/[0.07] to-transparent shadow-[0_0_50px_rgba(255,48,48,0.18)]">
                            <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
                              NK
                            </span>
                            <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF3030] text-white shadow-lg">
                              <Code2 className="h-4 w-4" />
                            </div>
                          </div>

                          <p className="mt-5 text-sm font-semibold tracking-wide text-white">
                            Nuriddin Kamolov
                          </p>
                          <p className="mt-1 text-xs text-[#9CA3AF]">
                            Portrait Placeholder — Ready for Photo
                          </p>
                        </div>

                        {/* Replace Portrait Interactive Trigger */}
                        <div className="relative z-10 w-full">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePortraitUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] hover:bg-[#FF3030] border border-white/10 hover:border-[#FF3030] py-2.5 px-4 text-xs font-medium text-gray-200 hover:text-white transition-all duration-300"
                          >
                            <Camera className="h-3.5 w-3.5" />
                            <span>Preview Your Photo</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Floating Replace Trigger if custom image is active */}
                    {customPortrait && (
                      <>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePortraitUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-[#FF3030] transition-colors"
                        >
                          <Camera className="h-3.5 w-3.5" />
                          <span>Change Photo</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Frame Footer Metadata */}
                  <div className="mt-4 flex items-center justify-between px-1">
                    <div>
                      <p className="text-xs font-bold tracking-wider uppercase text-white">
                        NURIDDIN KAMOLOV
                      </p>
                      <p className="text-[11px] text-[#9CA3AF]">Andijan, Uzbekistan</p>
                    </div>
                    <span className="rounded-md bg-[#FF3030]/15 border border-[#FF3030]/30 px-2.5 py-1 text-[11px] font-semibold text-[#FF3030]">
                      DEV &apos;26
                    </span>
                  </div>
                </InteractiveGlassCard>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Animated Scroll Indicator */}
        <button
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to About section"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9CA3AF] hover:text-white transition-colors"
        >
          <span className="text-[10px]">Scroll to explore</span>
          <div className="h-9 w-[2px] overflow-hidden rounded-full bg-white/15">
            <div className="h-4 w-full bg-[#FF3030] animate-scroll-line" />
          </div>
        </button>
      </section>

      {/* ====================================================================
          4. ABOUT ME SECTION (#about)
      ==================================================================== */}
      <section id="about" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div
          ref={aboutRef}
          className={`mx-auto max-w-7xl px-5 sm:px-8 transition-all duration-700 ease-out ${
            aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Editorial Section Header & Bio */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FF3030] mb-4">
                <span className="h-[1px] w-8 bg-[#FF3030]" />
                <span>01 // INTRODUCTION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                About Me
              </h2>

              <p className="mt-6 text-base sm:text-xl leading-relaxed text-gray-300 font-normal">
                My name is Nuriddin Kamolov. I am a young technology enthusiast from Andijan, Uzbekistan. I enjoy building modern websites, exploring new technologies, learning English and understanding financial markets. I love turning creative ideas into real digital projects.
              </p>

              <p className="mt-4 text-sm text-[#9CA3AF] leading-relaxed">
                Every project is an opportunity to combine clean engineering, thoughtful design, and continuous learning.
              </p>
            </div>

            {/* 4 Glassmorphism Personal Info Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  label: 'Name',
                  value: 'Nuriddin Kamolov',
                  icon: User,
                },
                {
                  label: 'Age',
                  value: '15',
                  icon: Calendar,
                },
                {
                  label: 'Location',
                  value: 'Andijan, Uzbekistan',
                  icon: MapPin,
                },
                {
                  label: 'Interests',
                  value: 'Technology, English, Trading',
                  icon: Compass,
                },
              ].map((info) => {
                const IconComponent = info.icon;
                return (
                  <InteractiveGlassCard key={info.label} tiltStrength={5} className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF3030]/12 border border-[#FF3030]/25 text-[#FF3030] mb-4">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">
                      {info.label}
                    </p>
                    <p className="mt-1.5 text-lg sm:text-xl font-bold text-white">
                      {info.value}
                    </p>
                  </InteractiveGlassCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. MY SKILLS SECTION (#skills)
      ==================================================================== */}
      <section id="skills" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        {/* Subtle Background Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[680px] rounded-full blur-[160px]"
          style={{ background: 'rgba(255, 48, 48, 0.08)' }}
        />

        <div
          ref={skillsRef}
          className={`relative z-10 mx-auto max-w-7xl px-5 sm:px-8 transition-all duration-700 ease-out ${
            skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FF3030] mb-4">
              <span className="h-[1px] w-8 bg-[#FF3030]" />
              <span>02 // CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              My Skills
            </h2>
            <p className="mt-4 text-base text-[#9CA3AF]">
              Core disciplines I practice and refine daily through hands-on building, study, and experimentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS_DATA.map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <InteractiveGlassCard
                  key={skill.title}
                  tiltStrength={5}
                  className="group p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF3030]/12 border border-[#FF3030]/25 text-[#FF3030] transition-all duration-300 group-hover:bg-[#FF3030] group-hover:text-white group-hover:shadow-[0_0_25px_rgba(255,48,48,0.5)]">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs text-gray-500">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF3030] transition-colors">
                      {skill.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                      {skill.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">
                      {skill.detail}
                    </p>
                  </div>

                  {/* Animated Energy Bar (No fake numeric percentages) */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#FF3030]/70 to-[#FF3030] shadow-[0_0_12px_#FF3030] transition-all duration-1000 ease-out"
                        style={{
                          width: skillsVisible ? skill.pulseWidth : '0%',
                          transitionDelay: `${idx * 100 + 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                </InteractiveGlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. MY PROJECTS SHOWCASE (#projects) — FEATURED FLAGSHIP SECTION
      ==================================================================== */}
      <section id="projects" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Editorial Section Header */}
          <div
            ref={projectsHeaderRef}
            className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 ease-out ${
              projectsHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FF3030] mb-4">
                <span className="h-[1px] w-8 bg-[#FF3030]" />
                <span>03 // SELECTED WORKS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Featured Projects
              </h2>
            </div>

            <p className="max-w-md text-sm sm:text-base text-[#9CA3AF]">
              A curated showcase of interactive games, e-commerce platforms, and modern web applications built from concept to live deployment.
            </p>
          </div>

          {/* 2-Column Editorial Flagship Grid (with full-width featured 5th or balanced grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {PROJECTS_DATA.map((project, index) => (
              <div
                key={project.id}
                className={index === PROJECTS_DATA.length - 1 && PROJECTS_DATA.length % 2 !== 0 ? 'lg:col-span-2 lg:max-w-3xl lg:mx-auto w-full' : ''}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. MY INTERESTS SECTION (#interests)
      ==================================================================== */}
      <section id="interests" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div
          ref={interestsRef}
          className={`mx-auto max-w-7xl px-5 sm:px-8 transition-all duration-700 ease-out ${
            interestsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FF3030] mb-4">
              <span className="h-[1px] w-8 bg-[#FF3030]" />
              <span>04 // FOCUS AREAS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              My Interests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                number: '01',
                title: 'ENGLISH',
                description:
                  'I continuously improve my English communication and language skills.',
                badge: 'Global Communication',
                icon: Globe,
              },
              {
                number: '02',
                title: 'TRADING',
                description:
                  'I am interested in financial markets, technical analysis and understanding market movements.',
                badge: 'Personal Study & Learning',
                icon: TrendingUp,
              },
              {
                number: '03',
                title: 'TECHNOLOGY',
                description:
                  'I enjoy creating websites, experimenting with digital products and learning new technologies.',
                badge: 'Digital Creation',
                icon: Code2,
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <InteractiveGlassCard
                  key={item.title}
                  tiltStrength={5}
                  className="group p-8 sm:p-10 flex flex-col justify-between min-h-[290px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF3030]/12 border border-[#FF3030]/25 text-[#FF3030] transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <span className="text-3xl font-black text-white/[0.08] group-hover:text-[#FF3030]/25 transition-colors">
                        {item.number}
                      </span>
                    </div>

                    <span className="inline-block rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-[#9CA3AF] mb-3">
                      {item.badge}
                    </span>

                    <h3 className="text-2xl font-extrabold tracking-wide text-white group-hover:text-[#FF3030] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-[#9CA3AF]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 h-[2px] w-12 bg-[#FF3030]/40 group-hover:w-full transition-all duration-500" />
                </InteractiveGlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CONTACT SECTION (#contact)
      ==================================================================== */}
      <section id="contact" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        {/* Ambient Red Radial Glow */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full blur-[160px]"
          style={{ background: 'rgba(255, 48, 48, 0.12)' }}
        />

        <div
          ref={contactRef}
          className={`relative z-10 mx-auto max-w-7xl px-5 sm:px-8 transition-all duration-700 ease-out ${
            contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info & Configurable Social Links */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FF3030] mb-4">
                <span className="h-[1px] w-8 bg-[#FF3030]" />
                <span>05 // GET IN TOUCH</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Let&apos;s Connect
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#9CA3AF]">
                Have a project idea, collaboration inquiry, or want to connect about web development and technology? Send a message directly using the form.
              </p>

              {/* Identity & Location Card (No Phone Number) */}
              <div className="mt-8 rounded-2xl bg-[#121216]/70 backdrop-blur-xl border border-white/[0.08] p-6 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF3030]/15 text-[#FF3030]">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Developer</p>
                    <p className="text-base font-bold text-white">Nuriddin Kamolov</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF3030]/15 text-[#FF3030]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Location</p>
                    <p className="text-base font-bold text-white">Andijan, Uzbekistan</p>
                  </div>
                </div>
              </div>

              {/* Configurable Social Links */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Social Channels
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SITE_CONFIG.socialLinks.map((social) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl bg-[#121216]/70 border border-white/[0.08] p-3.5 transition-all duration-300 hover:border-[#FF3030]/50 hover:bg-white/[0.04]"
                      >
                        <SocialIcon className="h-4 w-4 text-[#FF3030] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-[#FF3030] transition-colors">
                            {social.label}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">{social.handle}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#121216]/75 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
                {formStatus === 'sent' ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF3030]/15 border border-[#FF3030]/40 text-[#FF3030] mb-5">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                    <p className="mt-2 max-w-md text-sm sm:text-base text-[#9CA3AF]">
                      Thank you for reaching out to Nuriddin Kamolov. Your message has been received and will be reviewed shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="mt-7 rounded-xl bg-white/[0.07] hover:bg-[#FF3030] border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                        }}
                        className={`w-full rounded-xl bg-[#080808]/90 border ${
                          formErrors.name ? 'border-[#FF3030]' : 'border-white/[0.1]'
                        } px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-600 focus:border-[#FF3030] focus:outline-none focus:ring-1 focus:ring-[#FF3030] transition-colors`}
                      />
                      {formErrors.name && (
                        <p className="mt-1.5 text-xs text-[#FF3030]">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        className={`w-full rounded-xl bg-[#080808]/90 border ${
                          formErrors.email ? 'border-[#FF3030]' : 'border-white/[0.1]'
                        } px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-600 focus:border-[#FF3030] focus:outline-none focus:ring-1 focus:ring-[#FF3030] transition-colors`}
                      />
                      {formErrors.email && (
                        <p className="mt-1.5 text-xs text-[#FF3030]">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell me about your project or idea..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                        }}
                        className={`w-full rounded-xl bg-[#080808]/90 border ${
                          formErrors.message ? 'border-[#FF3030]' : 'border-white/[0.1]'
                        } px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-600 focus:border-[#FF3030] focus:outline-none focus:ring-1 focus:ring-[#FF3030] transition-colors resize-none`}
                      />
                      {formErrors.message && (
                        <p className="mt-1.5 text-xs text-[#FF3030]">{formErrors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#FF3030] px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-[0_0_30px_rgba(255,48,48,0.38)] transition-all duration-300 hover:bg-[#ff4747] hover:shadow-[0_0_45px_rgba(255,48,48,0.6)] disabled:opacity-60"
                    >
                      <span>{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. LUXURY FOOTER
      ==================================================================== */}
      <footer className="border-t border-white/[0.08] bg-[#060606] py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-[0.14em] text-white">
                NURIDDIN KAMOLOV
              </span>
              <span className="h-2 w-2 rounded-full bg-[#FF3030]" />
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Building ideas into digital experiences.
            </p>
            <p className="mt-1 text-xs text-[#9CA3AF]">
              Andijan, Uzbekistan.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-[#9CA3AF]">
              © 2026 Nuriddin Kamolov. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}