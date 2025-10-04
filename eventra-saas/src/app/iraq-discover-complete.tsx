'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, MapPin, Star, Phone, Navigation, X, Grid3x3, List, Filter, Check } from 'lucide-react';

export default function IraqDiscoverComplete() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [selectedCity, setSelectedCity] = useState('baghdad');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const cities = [
    { id: 'baghdad', label: 'Baghdad' },
    { id: 'erbil', label: 'Erbil' },
    { id: 'basra', label: 'Basra' },
    { id: 'sulaymaniyah', label: 'Sulaymaniyah' },
  ];

  const categories = [
    { id: 'hotels', label: 'Hotels', icon: '🏨', color: 'from-pink-500 to-rose-500' },
    { id: 'restaurants', label: 'Restaurants', icon: '🍴', color: 'from-purple-500 to-violet-500' },
    { id: 'cafes', label: 'Cafés', icon: '☕', color: 'from-cyan-500 to-blue-500' },
    { id: 'events', label: 'Events', icon: '🎉', color: 'from-amber-500 to-orange-500' },
    { id: 'tourism', label: 'Tourism', icon: '🏛️', color: 'from-emerald-500 to-green-500' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', color: 'from-fuchsia-500 to-pink-500' },
    { id: 'services', label: 'Services', icon: '🏢', color: 'from-indigo-500 to-purple-500' },
    { id: 'transport', label: 'Transport', icon: '🚌', color: 'from-teal-500 to-cyan-500' },
  ];

  const featuredPlaces = [
    { id: 1, name: 'Al-Rashid Hotel', category: 'hotels', rating: 4.5, price: '$$$', image: 'hotel', location: '2.3 km away' },
    { id: 2, name: 'Sumer Restaurant', category: 'restaurants', rating: 4.8, price: '$$', image: 'food', location: '1.5 km away' },
    { id: 3, name: 'Baghdad Café', category: 'cafes', rating: 4.6, price: '$', image: 'cafe', location: '3.1 km away' },
    { id: 4, name: 'Babylon Hotel', category: 'hotels', rating: 4.7, price: '$$$$', image: 'hotel', location: '1.8 km away' },
    { id: 5, name: 'Ziggurat Mall', category: 'shopping', rating: 4.2, price: '$$', image: 'shopping', location: '4.2 km away' },
    { id: 6, name: 'Citadel Tour', category: 'tourism', rating: 4.9, price: '$', image: 'tourism', location: '0.5 km away' },
  ];

  const sponsors = ['Iraqi Airways', 'Zain Iraq', 'Asia Cell', 'Bank of Baghdad', 'Erbil Int.', 'Rafidain Bank'];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  // Landing page for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-night-950 via-night-900 to-night-950 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-40 right-10 w-72 h-72 bg-gold-400/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <motion.div 
            className="glass-strong rounded-3xl p-8 shadow-lg max-w-md w-full mb-8"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-5xl font-bold text-white mb-3 text-center gradient-text-brand">
              Iraq Discover
            </h1>
            <p className="text-white/80 text-center text-lg">Explore the beauty and heritage of Iraqi cities</p>
          </motion.div>

          <motion.div 
            className="flex gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={() => { setAuthType('signup'); setShowAuth(true); }}
              className="glass-brand px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all duration-300 text-white"
            >
              Sign Up
            </button>
            <button 
              onClick={() => { setAuthType('signin'); setShowAuth(true); }}
              className="glass hover:glass-hover text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Sign In
            </button>
          </motion.div>

          <motion.div 
            className="glass rounded-2xl p-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-gold-400">50+</div>
                <div className="text-white/70 text-sm">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">10K+</div>
                <div className="text-white/70 text-sm">Places</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-300">100K+</div>
                <div className="text-white/70 text-sm">Reviews</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Auth Modal */}
        <AnimatePresence>
          {showAuth && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuth(false)}
            >
              <motion.div 
                className="glass-strong rounded-3xl p-8 shadow-lg max-w-md w-full"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {authType === 'signup' ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <button onClick={() => setShowAuth(false)} className="text-white/70 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="glass-input"
                  />
                  <input 
                    type="password" 
                    placeholder="Password"
                    className="glass-input"
                  />
                  {authType === 'signup' && (
                    <input 
                      type="password" 
                      placeholder="Confirm password"
                      className="glass-input"
                    />
                  )}
                  
                  <button 
                    onClick={handleAuth}
                    className="w-full py-3 rounded-xl gradient-bg-brand text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {authType === 'signup' ? 'Sign Up' : 'Sign In'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-white/50">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleAuth} className="glass hover:glass-hover py-3 rounded-xl text-white transition-colors">
                      Google
                    </button>
                    <button onClick={handleAuth} className="glass hover:glass-hover py-3 rounded-xl text-white transition-colors">
                      Facebook
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Main authenticated app
  return (
    <div className="min-h-screen bg-gradient-to-br from-night-950 via-night-900 to-night-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="glass-brand-strong border-b border-pink-500/20 sticky top-0 z-40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-bold gradient-text-brand">Iraq Discover</h1>
              <div className="flex items-center gap-2 md:gap-3">
                <button className="glass-brand px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-white text-xs md:text-sm font-medium hover:glass-brand-strong transition-all">
                  Profile
                </button>
                <Heart size={20} className="text-white/70 hover:text-pink-400 cursor-pointer transition-colors hidden md:block" />
                <Menu size={20} className="text-white/70 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* City Selector */}
          <motion.div 
            className="glass rounded-2xl p-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-pink-400" />
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="flex-1 bg-transparent text-white font-semibold text-lg focus:outline-none cursor-pointer glass-brand-strong px-4 py-2 rounded-xl"
              >
                {cities.map(city => (
                  <option key={city.id} value={city.id} className="bg-night-800">{city.label}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Categories Grid - 2 rows of 4 */}
          <motion.div 
            className="glass rounded-3xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-white font-semibold mb-4 text-lg">Explore Categories</h2>
            <div className="grid grid-cols-4 gap-4">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="group relative aspect-square flex flex-col items-center justify-center rounded-2xl transition-all duration-300 tile-3d hover:tile-3d-hover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`text-4xl mb-2 p-3 rounded-full bg-gradient-to-br ${cat.color} group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="text-white text-xs font-medium text-center">{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Featured Carousel */}
          <motion.div 
            className="glass-brand rounded-3xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-lg">Featured in {cities.find(c => c.id === selectedCity)?.label}</h2>
              <div className="flex gap-2">
                <button className="glass hover:glass-hover p-2 rounded-lg transition-all">
                  ←
                </button>
                <button className="glass hover:glass-hover p-2 rounded-lg transition-all">
                  →
                </button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {featuredPlaces.map((place) => (
                <motion.div 
                  key={place.id} 
                  className="min-w-[280px] glass rounded-2xl overflow-hidden shadow-lg card-3d"
                  whileHover={{ y: -8 }}
                >
                  <div className="h-40 bg-gradient-to-br from-gold-500/30 to-cyan-500/30 relative flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      {place.image === 'hotel' ? '🏨' : 
                       place.image === 'food' ? '🍽️' : 
                       place.image === 'cafe' ? '☕' : 
                       place.image === 'shopping' ? '🛍️' : '🏛️'}
                    </div>
                    <button 
                      onClick={() => toggleFavorite(place.id)}
                      className="absolute top-3 right-3 glass p-2 rounded-full hover:glass-hover transition-all"
                    >
                      <Heart size={16} className={favorites.includes(place.id) ? "text-pink-400 fill-pink-400" : "text-white/70"} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-1">{place.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-gold-400 fill-gold-400" />
                        <span className="text-white/80 text-sm">{place.rating}</span>
                      </div>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80 text-sm">{place.price}</span>
                    </div>
                    <p className="text-white/60 text-sm mb-3">{place.location}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 glass-brand hover:scale-105 p-2 rounded-lg transition-all text-white text-sm">
                        <Phone size={14} className="inline mr-1" />
                        Call
                      </button>
                      <button className="flex-1 glass-brand hover:scale-105 p-2 rounded-lg transition-all text-white text-sm">
                        <Navigation size={14} className="inline mr-1" />
                        Directions
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sponsors Marquee */}
          <motion.div 
            className="glass rounded-2xl p-4 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
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

          {/* Results Section */}
          <motion.div 
            className="glass rounded-3xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-lg">All Places</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'glass-brand' : 'glass hover:glass-hover'}`}
                >
                  <Grid3x3 size={18} className="text-white" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'glass-brand' : 'glass hover:glass-hover'}`}
                >
                  <List size={18} className="text-white" />
                </button>
                <button className="glass hover:glass-hover p-2 rounded-lg transition-all">
                  <Filter size={18} className="text-white" />
                </button>
              </div>
            </div>
            
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {featuredPlaces.slice(0, 6).map((place, idx) => (
                <motion.div 
                  key={idx} 
                  className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-glow transition-shadow card-3d"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className={`${viewMode === 'grid' ? 'h-32' : 'h-40'} bg-gradient-to-br from-gold-500/30 to-cyan-500/30 relative flex items-center justify-center`}>
                    <div className="text-5xl opacity-30">
                      {place.image === 'hotel' ? '🏨' : 
                       place.image === 'food' ? '🍽️' : 
                       place.image === 'cafe' ? '☕' : 
                       place.image === 'shopping' ? '🛍️' : '🏛️'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{place.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={14} className="text-gold-400 fill-gold-400" />
                      <span className="text-white/80 text-sm">{place.rating}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80 text-sm">{place.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 glass-brand hover:scale-105 p-2 rounded-lg transition-all text-white text-sm">
                        <Phone size={14} className="inline mr-1" />
                      </button>
                      <button className="flex-1 glass-brand hover:scale-105 p-2 rounded-lg transition-all text-white text-sm">
                        <Navigation size={14} className="inline mr-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div 
              className="glass-strong rounded-t-3xl p-6 shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {categories.find(c => c.id === selectedCategory)?.label} Filters
                </h2>
                <button onClick={() => setSelectedCategory(null)} className="text-white/70 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Price Range</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['$', '$$', '$$$'].map(price => (
                      <button key={price} className="glass hover:glass-brand py-3 rounded-xl text-white transition-all">
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Rating</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} className="glass hover:glass-brand py-3 rounded-xl text-white transition-all flex items-center justify-center gap-1">
                        {star}<Star size={12} className="text-gold-400" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Distance (km)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    className="w-full accent-gold-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 rounded-xl glass hover:glass-hover text-white transition-all">
                    Clear
                  </button>
                  <button 
                    onClick={() => setSelectedCategory(null)}
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
}