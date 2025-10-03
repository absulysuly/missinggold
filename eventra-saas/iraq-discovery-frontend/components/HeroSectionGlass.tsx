import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

// ===================================
// CONFIGURATION & DATA
// ===================================

const LANDMARKS = [
  {
    url: 'https://images.unsplash.com/photo-1631123539503-29114b0a4902?q=80&w=1920&auto=format&fit=crop',
    alt: 'Baghdad Al-Shaheed Monument',
    overlay: 'rgba(244, 162, 97, 0.15)' // Gold tint
  },
  {
    url: 'https://images.unsplash.com/photo-1576487249764-a63f1092a35d?q=80&w=1920&auto=format&fit=crop',
    alt: 'Erbil Citadel',
    overlay: 'rgba(0, 217, 255, 0.12)' // Cyan tint
  },
  {
    url: 'https://images.unsplash.com/photo-1616423838531-85d7199c8358?q=80&w=1920&auto=format&fit=crop',
    alt: 'Basra',
    overlay: 'rgba(244, 162, 97, 0.18)'
  },
  {
    url: 'https://images.unsplash.com/photo-1631123539352-25807986f1e2?q=80&w=1920&auto=format&fit=crop',
    alt: 'Baghdad Firdos Square',
    overlay: 'rgba(0, 217, 255, 0.15)'
  },
];

const STATS_DATA = [
  { icon: '🎉', label: { en: 'Live Events', ar: 'فعاليات مباشرة', ku: 'ئاهەنگی ڕاستەوخۆ' }, key: 'EVENT', count: 234 },
  { icon: '🏨', label: { en: 'Hotels', ar: 'فنادق', ku: 'هۆتێلەکان' }, key: 'HOTEL', count: 1200 },
  { icon: '🍴', label: { en: 'Restaurants', ar: 'مطاعم', ku: 'چێشتخانەکان' }, key: 'RESTAURANT', count: 3500 },
  { icon: '🎯', label: { en: 'Activities', ar: 'أنشطة', ku: 'چالاکییەکان' }, key: 'ACTIVITY', count: 890 },
  { icon: '🏢', label: { en: 'Services', ar: 'خدمات', ku: 'خزمەتگوزارییەکان' }, key: 'SERVICE', count: 1500 },
];

const heroContent = {
  en: {
    headline: "Discover Iraq",
    subheadline: "Experience the beauty of Mesopotamia",
    cta: "Explore Now"
  },
  ar: {
    headline: "اكتشف العراق",
    subheadline: "اختبر جمال بلاد الرافدين",
    cta: "استكشف الآن"
  },
  ku: {
    headline: "عێراق بدۆزەرەوە",
    subheadline: "جوانی میزۆپۆتامیا تاقی بکەرەوە",
    cta: "ئێستا بگەڕێ"
  }
};

// ===================================
// STATS TICKER COMPONENT
// ===================================

const StatsTicker: React.FC<{ locale: 'en' | 'ar' | 'ku' }> = ({ locale }) => {
  const renderStats = () => (
    STATS_DATA.map((stat, idx) => (
      <motion.div
        key={`${stat.key}-${idx}`}
        className="flex items-center mx-6 flex-shrink-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        <span className="text-2xl mr-3">{stat.icon}</span>
        <span className="font-bold text-gold-400 text-lg">
          {stat.count.toLocaleString()}
        </span>
        <span className="ml-2 text-white/70">{stat.label[locale]}</span>
      </motion.div>
    ))
  );

  return (
    <div className="absolute bottom-0 left-0 w-full h-16 glass-dark border-t border-white/10 overflow-hidden z-20">
      <div className="flex items-center h-full text-sm animate-marquee whitespace-nowrap">
        {renderStats()}
        {renderStats()} {/* Duplicate for seamless loop */}
      </div>
    </div>
  );
};

// ===================================
// FLOATING PARTICLES
// ===================================

const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold-400/20 rounded-full blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// ===================================
// MAIN HERO COMPONENT
// ===================================

interface HeroSectionProps {
  locale: 'en' | 'ar' | 'ku';
}

const HeroSectionGlass: React.FC<HeroSectionProps> = ({ locale }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from(contentRef.current.querySelectorAll('h1'), {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
    })
    .from(contentRef.current.querySelectorAll('p'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
    }, '-=0.6')
    .from(contentRef.current.querySelectorAll('button'), {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;
      
      gsap.to(overlayRef.current, {
        x: xPos,
        y: yPos,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate background images
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % LANDMARKS.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const content = heroContent[locale];
  const currentLandmark = LANDMARKS[currentImageIndex];

  return (
    <section ref={heroRef} className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Images with Glassmorphic Overlay */}
      <div className="absolute inset-0">
        {LANDMARKS.map((landmark, index) => (
          <motion.div
            key={landmark.url}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${landmark.url})`,
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        ))}
        
        {/* Colored overlay matching current image */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: currentLandmark.overlay }}
          animate={{ backgroundColor: currentLandmark.overlay }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/70 to-night-950/30" />
        
        {/* Glass morphism layer */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-br from-white/5 to-transparent"
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-20">
        <motion.div
          className="glass-strong rounded-3xl px-8 md:px-16 py-10 md:py-14 max-w-4xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 gradient-text-gold drop-shadow-2xl">
            {content.headline}
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 mb-8 font-medium drop-shadow-lg">
            {content.subheadline}
          </p>
          
          <motion.button
            className="glass-gold px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider text-white
                       hover:scale-105 hover:shadow-glow-gold active:scale-95
                       transition-all duration-micro focus:outline-none focus:ring-4 focus:ring-gold-400/50"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.cta}
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="glass rounded-full p-3">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Stats Ticker */}
      <StatsTicker locale={locale} />
    </section>
  );
};

export default HeroSectionGlass;
