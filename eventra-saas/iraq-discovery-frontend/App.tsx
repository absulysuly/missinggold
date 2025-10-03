import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, Phone, Navigation, Star, X, Menu, ChevronLeft, ChevronRight, Grid3X3, List, Globe, Loader2, AlertTriangle, Check, BarChart3 } from 'lucide-react';
import { analytics } from './lib/analytics';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { 
  IRAQI_GOVERNORATES, 
  CATEGORIES, 
  FILTER_OPTIONS, 
  FEATURED_PLACES, 
  SPONSORS,
  HERO_IMAGES,
  getCityName, 
  getCategoryLabel, 
  getSubcategoryName, 
  filterPlacesByGovernorate, 
  filterPlacesByCategory 
} from './lib/data';
import { CategoryFilterState, defaultFilterState } from './lib/filters';
import { getCategoryFilter, setCategoryFilter } from './lib/db';
import { usePlacesQuery } from './hooks/usePlacesQuery';

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [showDashboard, setShowDashboard] = useState(false);

  const openAuth = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setShowAuth(true);
  };

  const handleAuth = () => {
    setShowAuth(false);
  };

  const handleOAuth = (provider: 'google' | 'facebook') => {
    const redirect = (import.meta as any).env?.VITE_OAUTH_REDIRECT_URI;
    if (provider === 'google') {
      const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
      if (clientId && redirect) {
        const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        url.searchParams.set('client_id', clientId);
        url.searchParams.set('redirect_uri', redirect);
        url.searchParams.set('response_type', 'token');
        url.searchParams.set('scope', 'profile email');
        window.open(url.toString(), '_blank', 'width=480,height=700');
        return;
      }
    } else {
      const fbId = (import.meta as any).env?.VITE_FACEBOOK_APP_ID;
      if (fbId && redirect) {
        const url = new URL('https://www.facebook.com/v12.0/dialog/oauth');
        url.searchParams.set('client_id', fbId);
        url.searchParams.set('redirect_uri', redirect);
        url.searchParams.set('response_type', 'token');
        window.open(url.toString(), '_blank', 'width=480,height=700');
        return;
      }
    }
    // Demo fallback
    setShowAuth(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-950 via-night-900 to-night-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/10 rounded-full mix-blend-multiply filter blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} />
      </div>
      <div className="relative z-10">
        <div className="glass-brand-strong border-b border-pink-500/20 sticky top-0 z-40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-bold gradient-text-brand">Iraq Guide</h1>
              <div className="flex items-center gap-2 md:gap-3">
                <button 
                  onClick={() => setShowDashboard(true)} 
                  className="glass-brand p-2 rounded-lg hover:glass-brand-strong transition-all" 
                  title="Analytics Dashboard"
                >
                  <BarChart3 size={18} className="text-white" />
                </button>
                <button 
                  onClick={() => openAuth('signin')} 
                  className="glass-brand px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-white text-xs md:text-sm font-medium hover:glass-brand-strong transition-all"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => openAuth('signup')} 
                  className="gradient-bg-brand px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-white text-xs md:text-sm font-semibold hover:scale-105 transition-all shadow-lg"
                >
                  Sign Up
                </button>
                <Heart size={20} className="text-white/70 hover:text-pink-400 cursor-pointer transition-colors hidden md:block" />
                <Menu size={20} className="text-white/70 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Auth Modal */}
        <AnimatePresence>{showAuth && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAuth(false)}>
            <motion.div className="glass-brand-strong rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-depth max-w-md w-full" initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">{authType === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
                <button onClick={() => setShowAuth(false)} className="text-white/70 hover:text-white"><X size={24} /></button>
              </div>
              <div className="space-y-4">
                <input type="email" placeholder="Email address" className="glass-input" />
                <input type="password" placeholder="Password" className="glass-input" />
                {authType === 'signup' && <input type="password" placeholder="Confirm password" className="glass-input" />}
                <button onClick={handleAuth} className="w-full py-3 rounded-xl gradient-bg-brand text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg">{authType === 'signup' ? 'Sign Up' : 'Sign In'}</button>
                <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-transparent text-white/50">Or continue with</span></div></div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => handleOAuth('google')} className="glass hover:glass-brand py-3 rounded-xl text-white transition-colors">Google</button>
                  <button onClick={() => handleOAuth('facebook')} className="glass hover:glass-brand py-3 rounded-xl text-white transition-colors">Facebook</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}</AnimatePresence>
        
        {/* Analytics Dashboard */}
        <AnimatePresence>
          {showDashboard && <AnalyticsDashboard onClose={() => setShowDashboard(false)} />}
        </AnimatePresence>
        
        {/* Top-centered language switcher - with stronger brand colors */}
        <div className="max-w-7xl mx-auto px-4 mt-4 md:mt-6">
          <div className="w-full flex items-center justify-center">
            <div className="glass-brand-strong rounded-full px-2 md:px-3 py-2 flex items-center gap-1 md:gap-2">
              <button className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium ${document?.documentElement?.lang==='en' ? 'gradient-bg-brand text-white' : 'glass text-white/80'}`} onClick={() => { const prev = document.documentElement.lang; document.documentElement.lang = 'en'; analytics.trackLanguageChange(prev, 'en'); }}>
                English
              </button>
              <button className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium ${document?.documentElement?.lang==='ar' ? 'gradient-bg-brand text-white' : 'glass text-white/80'}`} onClick={() => { const prev = document.documentElement.lang; document.documentElement.lang = 'ar'; analytics.trackLanguageChange(prev, 'ar'); }}>
                العربية
              </button>
              <button className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium ${document?.documentElement?.lang==='ku' ? 'gradient-bg-brand text-white' : 'glass text-white/80'}`} onClick={() => { const prev = document.documentElement.lang; document.documentElement.lang = 'ku'; analytics.trackLanguageChange(prev, 'ku'); }}>
                کوردی
              </button>
            </div>
          </div>
        </div>
        <MainContent />
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [selectedCity, setSelectedCity] = useState<string>('baghdad');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [locale, setLocale] = useState<'en' | 'ar' | 'ku'>('en');
  const [page, setPage] = useState<number>(1);
  const [heroCarouselIndex, setHeroCarouselIndex] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const pageSize = 12;
  
  // Track page view on mount
  useEffect(() => {
    analytics.trackPageView(window.location.pathname);
  }, []);

  const isRTL = locale === 'ar' || locale === 'ku';
  useEffect(() => {
    // Set document direction for RTL languages
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
  }, [isRTL]);

  // Persisted filter states per category (in-memory cache)
  const [filterStates, setFilterStates] = useState<Record<string, CategoryFilterState>>({});
  // Drawer draft state (contextual to selectedCategory)
  const [draftPriceId, setDraftPriceId] = useState<string | undefined>(undefined);
  const [draftRating, setDraftRating] = useState<number | undefined>(undefined);
  const [draftDistance, setDraftDistance] = useState<number>(10);

  const cities = IRAQI_GOVERNORATES.map(c => ({ id: c.id, label: c.name[locale] }));
  const categories = CATEGORIES;
  const sponsors = SPONSORS;

  const activeFilters = selectedCategory ? filterStates[selectedCategory] ?? undefined : undefined;
  const { data: places = [], isLoading, isFetching, error, refetch } = usePlacesQuery({
    cityId: selectedCity,
    categoryId: selectedCategory,
    filters: activeFilters ?? null,
    page,
    pageSize,
  });
  
  // Get category-specific places for featured section
  const categoryPlaces = selectedCategory 
    ? FEATURED_PLACES.filter(p => p.category === selectedCategory && p.governorate === selectedCity)
    : [];
  
  // Auto-scroll hero carousel
  useEffect(() => {
    const heroImages = selectedCategory && (HERO_IMAGES as any)[selectedCategory] 
      ? (HERO_IMAGES as any)[selectedCategory] 
      : HERO_IMAGES.default;
    const interval = setInterval(() => {
      setHeroCarouselIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedCategory]);

  // Deep-link: open place in modal if ?placeId= is present
  useEffect(() => {
    const url = new URL(window.location.href);
    const pid = url.searchParams.get('placeId');
    if (pid) {
      const idNum = Number(pid);
      const found = FEATURED_PLACES.find(p => p.id === idNum) || places.find(p => p.id === idNum);
      if (found) setSelectedPlace(found as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const openPlaceModal = (place: any) => {
    setSelectedPlace(place);
    analytics.trackPlaceView(place.id, getPlaceName(place));
    const url = new URL(window.location.href);
    url.searchParams.set('placeId', String(place.id));
    window.history.pushState({}, '', url.toString());
  };

  const closePlaceModal = () => {
    setSelectedPlace(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('placeId');
    window.history.pushState({}, '', url.toString());
  };
  
  const getPlaceName = (place: any) => {
    return place.translations ? place.translations[locale] : place.name;
  };
  
  const getPlaceDescription = (place: any) => {
    return place.description ? place.description[locale] : '';
  };

  // Load per-category filter state when drawer opens for a category
  useEffect(() => {
    if (!selectedCategory) return;
    let isActive = true;
    (async () => {
      const existing = filterStates[selectedCategory] ?? (await getCategoryFilter(selectedCategory));
      const state: CategoryFilterState = existing ?? defaultFilterState(selectedCategory);
      if (!isActive) return;
      setFilterStates(prev => ({ ...prev, [selectedCategory]: state }));
      setDraftPriceId(state.priceId);
      setDraftRating(state.minRating);
      setDraftDistance(state.distanceKm ?? 10);
    })();
    return () => { isActive = false; };
  }, [selectedCategory]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Full-Size Hero Section with Auto-Scrolling Images */}
      <motion.div 
        className="rounded-2xl md:rounded-3xl overflow-hidden relative h-[400px] md:h-[500px] shadow-glass" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        key={selectedCategory || 'default'}
      >
        {/* Auto-Scrolling Background Images */}
        <AnimatePresence mode="wait">
          {(() => {
            const heroImages = selectedCategory && (HERO_IMAGES as any)[selectedCategory] 
              ? (HERO_IMAGES as any)[selectedCategory] 
              : HERO_IMAGES.default;
            const currentImage = heroImages[heroCarouselIndex];
            return (
              <motion.div
                key={heroCarouselIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2 }}
              >
                <img 
                  src={currentImage.url}
                  alt="Hero"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as any).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-night-900/60 to-pink-900/70" />
              </motion.div>
            );
          })()}
        </AnimatePresence>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10">
          <div className="flex items-center gap-3">
            <MapPin size={24} className="text-pink-400" />
            <select
              value={selectedCity}
              onChange={(e) => {
                const newCity = e.target.value;
                setSelectedCity(newCity);
                analytics.trackCityChange(newCity, getCityName(newCity, locale));
              }}
              className="glass-brand-strong px-4 py-2 rounded-xl text-white font-bold text-lg md:text-2xl focus:outline-none cursor-pointer"
            >
              {cities.map(city => (
                <option key={city.id} value={city.id} className="bg-night-800">
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            {selectedCategory ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl md:text-6xl">{categories.find(c => c.id === selectedCategory)?.icon}</div>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{getCategoryLabel(selectedCategory, locale)}</h2>
                    <p className="text-white/90 text-base md:text-lg drop-shadow-md">Discover the best {getCategoryLabel(selectedCategory, locale).toLowerCase()} in {getCityName(selectedCity, locale)}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="glass-brand-strong px-5 py-3 rounded-xl">
                    <div className="text-pink-300 text-xs">Found</div>
                    <div className="text-white font-bold text-2xl">{categoryPlaces.length}+</div>
                  </div>
                  <div className="glass-brand-strong px-5 py-3 rounded-xl">
                    <div className="text-purple-300 text-xs">Rating</div>
                    <div className="text-white font-bold text-2xl">{categoryPlaces.length > 0 ? (categoryPlaces.reduce((sum, p) => sum + p.rating, 0) / categoryPlaces.length).toFixed(1) : 'N/A'} ⭐</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-xl">Explore {getCityName(selectedCity, locale)}</h2>
                <p className="text-white/90 text-lg md:text-xl drop-shadow-md">Discover amazing places, events, and experiences</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Active filter summary chips (for the currently selected category) */}
      {selectedCategory && filterStates[selectedCategory] && (
        <motion.div className="glass rounded-2xl p-4 shadow-glass" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/70 text-sm">Active filters:</span>
            {(() => {
              const f = filterStates[selectedCategory!];
              const chips: string[] = [];
              if (f.priceId) chips.push(`price:${f.priceId}`);
              if (f.minRating) chips.push(`rating:${f.minRating}+`);
              if (typeof f.distanceKm === 'number') chips.push(`≤${f.distanceKm}km`);
              (f.amenities || []).forEach(a => chips.push(a.replace(/_/g, ' ')));
              return chips.length ? chips.map((c, idx) => (
                <span key={idx} className="glass px-3 py-1 rounded-lg text-white text-xs">{c}</span>
              )) : <span className="text-white/50 text-xs">None</span>;
            })()}
            <button
              className="ml-auto glass px-3 py-1 rounded-lg text-white text-xs hover:glass-hover"
              onClick={async () => {
                const cleared = { ...defaultFilterState(selectedCategory!), updatedAt: Date.now() };
                setFilterStates(prev => ({ ...prev, [selectedCategory!]: cleared }));
                await setCategoryFilter(cleared);
              }}
            >
              Clear all
            </button>
          </div>
        </motion.div>
      )}

      <motion.div className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Explore Categories</h2>
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {categories.slice(0, 9).map((cat, idx) => {
            const vibrantColors = [
              'from-pink-500 to-rose-500',
              'from-purple-500 to-violet-500', 
              'from-cyan-500 to-blue-500',
              'from-amber-500 to-orange-500',
              'from-emerald-500 to-green-500',
              'from-fuchsia-500 to-pink-500',
              'from-indigo-500 to-purple-500',
              'from-teal-500 to-cyan-500',
              'from-yellow-500 to-amber-500',
            ];
            return (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  analytics.trackCategoryClick(cat.id, cat.label[locale]);
                }}
                className={`group relative p-3 md:p-5 aspect-square flex flex-col items-center justify-center transition-all duration-300 ${selectedCategory === cat.id ? 'tile-3d-active' : 'tile-3d hover:tile-3d-hover'}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`text-xl md:text-2xl mb-1 md:mb-2 p-2 md:p-3 rounded-full bg-gradient-to-br ${vibrantColors[idx % vibrantColors.length]}`}>
                  {cat.icon}
                </div>
                <span className="text-white text-[9px] md:text-xs font-semibold text-center leading-tight">{cat.label[locale]}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Featured Sections - One Row Per Category */}
      {categories.slice(0, 9).map((cat) => {
        const catPlaces = FEATURED_PLACES.filter(p => p.category === cat.id && p.governorate === selectedCity);
        if (catPlaces.length === 0) return null;
        
        return (
          <motion.div 
            key={cat.id}
            className="glass-brand rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-glass" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-white font-semibold text-base md:text-lg flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                {cat.label[locale]}
              </h2>
              <button 
                onClick={() => {
                  setSelectedCategory(cat.id);
                  analytics.trackCategoryClick(cat.id, cat.label[locale]);
                }}
                className="text-pink-400 text-sm hover:text-pink-300 transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="overflow-x-auto pb-2 no-scrollbar">
              <div className="flex gap-3 md:gap-4">
                {catPlaces.map((place) => (
                  <div 
                    key={place.id}
                    className="min-w-[200px] md:min-w-[280px] glass-strong rounded-xl md:rounded-2xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => openPlaceModal(place)}
                  >
                    <div className="h-28 md:h-40 relative overflow-hidden">
                      <img 
                        src={place.image || `https://via.placeholder.com/800x600?text=${encodeURIComponent(getPlaceName(place))}`}
                        alt={getPlaceName(place)}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src = `https://via.placeholder.com/800x600/5c527f/ffffff?text=${encodeURIComponent(getPlaceName(place))}`;
                        }}
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="text-white font-semibold text-sm md:text-base mb-1">{getPlaceName(place)}</h3>
                      <p className="text-white/60 text-xs mb-2 line-clamp-2">{getPlaceDescription(place)}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-gold-400 fill-gold-400" />
                          <span className="text-white/80 text-xs">{place.rating}</span>
                        </div>
                        <span className="text-white/60 text-xs">•</span>
                        <span className="text-white/80 text-xs">{place.price}</span>
                      </div>
                      <button className="w-full glass-brand py-2 rounded-lg text-white text-xs hover:glass-brand-strong transition-all">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}


      <motion.div className="glass rounded-2xl p-4 shadow-glass overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white/60 text-xs uppercase tracking-wider">Sponsored Partners</span>
        </div>
        <div className="flex gap-4 animate-marquee">
          {sponsors.concat(sponsors).map((sponsor, idx) => (
            <div key={idx} className="min-w-[140px] glass-dark rounded-xl p-4 flex items-center justify-center flex-shrink-0">
              <span className="text-white/70 text-sm font-medium">{sponsor}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="glass rounded-3xl p-6 shadow-glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg">All Places</h2>
          <div className="flex items-center gap-2">
            {isFetching && <Loader2 className="animate-spin text-white/60" size={16} />}
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'glass-brand' : 'glass'}`}>
              <Grid3X3 size={18} className="text-white" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'glass-brand' : 'glass'}`}>
              <List size={18} className="text-white" />
            </button>
          </div>
        </div>
        {error ? (
          <div className="flex items-center gap-3 text-red-300">
            <AlertTriangle size={18} />
            <span>Could not load places.</span>
            <button onClick={() => refetch()} className="glass px-3 py-1 rounded-lg text-white hover:glass-hover">Retry</button>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
              {places.map((place, idx) => (
                <motion.div key={`${place.id}-${idx}`} className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-glow-gold transition-shadow card-3d" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.4) }}>
                  <div className={`${viewMode === 'grid' ? 'h-32' : 'h-40'} relative overflow-hidden`}>
                    <img 
                      src={place.image || `https://via.placeholder.com/800x600?text=${encodeURIComponent(place.name)}`}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as any).src = `https://via.placeholder.com/800x600/5c527f/ffffff?text=${encodeURIComponent(place.name)}`;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{place.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={14} className="text-gold-400 fill-gold-400" />
                      <span className="text-white/80 text-sm">{place.rating}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80 text-sm">{place.price}</span>
                    </div>
                    <button 
                      onClick={() => openPlaceModal(place)}
                      className="w-full glass-brand hover:glass-brand-strong p-2 rounded-lg transition-all flex items-center justify-center gap-2 text-white text-sm"
                    >
                      Learn More →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6">
              <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className={`px-4 py-2 rounded-lg ${page <= 1 ? 'glass opacity-50 cursor-not-allowed' : 'glass hover:glass-hover'}`}>Previous</button>
              <div className="text-white/70 text-sm">Page {page}</div>
              <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 rounded-lg glass hover:glass-hover">Next</button>
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {/* Place details modal - deep link pop-out */}
        {selectedPlace && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePlaceModal}>
            <motion.div className="glass-brand-strong rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-depth w-[95%] max-w-2xl max-h-[85vh] overflow-y-auto" initial={{ scale: 0.92, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 10 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">{getPlaceName(selectedPlace)}</h2>
                <button onClick={closePlaceModal} className="text-white/70 hover:text-white"><X size={24} /></button>
              </div>
              <div className="rounded-xl overflow-hidden h-44 md:h-56 mb-3 md:mb-4 relative">
                <img 
                  src={selectedPlace.image} 
                  alt={getPlaceName(selectedPlace)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient with emoji if image fails
                    (e.target as any).style.display = 'none';
                    const parent = (e.target as any).parentElement;
                    parent.classList.add('gradient-bg-brand-card', 'flex', 'items-center', 'justify-center');
                    parent.innerHTML = `<div class="text-6xl opacity-30">${selectedPlace.imageEmoji || '📍'}</div>`;
                  }}
                />
              </div>
              <p className="text-white/80 text-sm md:text-base mb-3">{getPlaceDescription(selectedPlace)}</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-gold-400 fill-gold-400" />
                  <span className="text-white/80 text-sm">{selectedPlace.rating}</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-white/80 text-sm">{selectedPlace.price}</span>
                <span className="text-white/60">•</span>
                <span className="text-white/70 text-sm">{selectedPlace.location}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="gradient-bg-brand py-3 rounded-lg text-white flex items-center justify-center gap-2 hover:scale-105 transition-all">
                  <Phone size={16} /> Call
                </button>
                <button className="gradient-bg-brand py-3 rounded-lg text-white flex items-center justify-center gap-2 hover:scale-105 transition-all">
                  <Navigation size={16} /> Directions
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* Filter Drawer */}
        {selectedCategory && (
          <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCategory(null)}>
            <motion.div className="glass-strong rounded-t-3xl p-6 shadow-depth w-full max-w-2xl max-h-[80vh] overflow-y-auto" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{getCategoryLabel(selectedCategory, locale)} Filters</h2>
                <button onClick={() => setSelectedCategory(null)} className="text-white/70 hover:text-white"><X size={24} /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Price Range</label>
                  <div className="grid grid-cols-4 gap-2">
                    {FILTER_OPTIONS.priceRanges.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setDraftPriceId(draftPriceId === p.id ? undefined : p.id)}
                        className={`py-3 rounded-xl text-white transition-all ${draftPriceId === p.id ? 'glass-brand-strong' : 'glass hover:glass-brand'}`}
                      >
                        {p.symbol}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Rating</label>
                  <div className="grid grid-cols-5 gap-2">
                    {FILTER_OPTIONS.ratings.map(star => (
                      <button
                        key={star}
                        onClick={() => setDraftRating(draftRating === star ? undefined : star)}
                        className={`py-3 rounded-xl text-white transition-all flex items-center justify-center gap-1 ${draftRating === star ? 'glass-brand-strong' : 'glass hover:glass-brand'}`}
                      >
                        {star}
                        <Star size={14} className="text-gold-400" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Distance (km)</label>
                  <input type="range" min="0" max="50" value={draftDistance} onChange={(e) => setDraftDistance(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const key = selectedCategory as keyof typeof FILTER_OPTIONS.amenities | undefined;
                      const catAmenities = key && FILTER_OPTIONS.amenities[key] ? FILTER_OPTIONS.amenities[key]! : [];
                      const items = [...new Set([...(FILTER_OPTIONS.amenities.general || []), ...catAmenities])];
                      const current = filterStates[selectedCategory || '']?.amenities || [];
                      return items.map(a => (
                        <button
                          key={a}
                          onClick={() => {
                            const base = new Set(current);
                            if (base.has(a)) base.delete(a); else base.add(a);
                            // Update in-memory draft by reflecting into filterStates temp; we’ll persist on Apply
                            setFilterStates(prev => ({
                              ...prev,
                              [selectedCategory!]: {
                                ...(prev[selectedCategory!] || defaultFilterState(selectedCategory!)),
                                amenities: Array.from(base),
                                updatedAt: Date.now(),
                                categoryId: selectedCategory!,
                                priceId: draftPriceId,
                                minRating: draftRating,
                                distanceKm: draftDistance,
                              },
                            }));
                          }}
                          className={`${current.includes(a) ? 'glass-brand-strong' : 'glass hover:glass-brand'} px-3 py-1 rounded-lg text-white text-xs flex items-center gap-1`}
                        >
                          {current.includes(a) && <Check size={12} />}
                          <span>{a.replace(/_/g, ' ')}</span>
                        </button>
                      ));
                    })()}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 py-3 rounded-xl glass hover:glass-hover text-white transition-all"
                    onClick={async () => {
                      if (!selectedCategory) return;
                      const cleared: CategoryFilterState = {
                        ...defaultFilterState(selectedCategory),
                        updatedAt: Date.now(),
                      };
                      setFilterStates(prev => ({ ...prev, [selectedCategory]: cleared }));
                      await setCategoryFilter(cleared);
                      setDraftPriceId(cleared.priceId);
                      setDraftRating(cleared.minRating);
                      setDraftDistance(cleared.distanceKm ?? 10);
                    }}
                  >
                    Clear
                  </button>
                  <button
                    onClick={async () => {
                      if (!selectedCategory) return;
                      const next: CategoryFilterState = {
                        categoryId: selectedCategory,
                        priceId: draftPriceId,
                        minRating: draftRating,
                        distanceKm: draftDistance,
                        amenities: filterStates[selectedCategory]?.amenities ?? [],
                        updatedAt: Date.now(),
                      };
                      setFilterStates(prev => ({ ...prev, [selectedCategory]: next }));
                      await setCategoryFilter(next);
                      setSelectedCategory(null);
                    }}
                    className="flex-1 py-3 rounded-xl gradient-bg-brand text-white font-semibold hover:scale-105 transition-all shadow-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
