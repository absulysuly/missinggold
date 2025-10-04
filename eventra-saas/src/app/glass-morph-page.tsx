'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, MapPin, Star } from 'lucide-react';

export default function GlassMorphPage() {
  const [selectedCity, setSelectedCity] = useState('baghdad');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    { id: 'beauty', label: 'Beauty & Spa', icon: '💆', color: 'from-teal-500 to-cyan-500' },
    { id: 'health', label: 'Healthcare', icon: '🏥', color: 'from-yellow-500 to-amber-500' },
  ];

  const featuredPlaces = [
    { id: 1, name: 'Al-Rashid Hotel', category: 'hotels', rating: 4.5, price: '$$$', image: 'hotel' },
    { id: 2, name: 'Sumer Restaurant', category: 'restaurants', rating: 4.8, price: '$$', image: 'food' },
    { id: 3, name: 'Baghdad Café', category: 'cafes', rating: 4.6, price: '$', image: 'cafe' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-950 via-night-900 to-night-950">
      {/* Animated background elements */}
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
              <h1 className="text-xl md:text-2xl font-bold gradient-text-brand">Iraq Discovery</h1>
              <div className="flex items-center gap-2 md:gap-3">
                <button className="glass-brand px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-white text-xs md:text-sm font-medium hover:glass-brand-strong transition-all">
                  Sign In
                </button>
                <Heart size={20} className="text-white/70 hover:text-pink-400 cursor-pointer transition-colors hidden md:block" />
                <Menu size={20} className="text-white/70 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Hero Section */}
          <motion.div 
            className="rounded-2xl md:rounded-3xl overflow-hidden relative h-[400px] md:h-[500px] shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-night-900/60 to-pink-900/70" />
            
            <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10">
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-pink-400" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
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
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-xl">
                  Explore {cities.find(c => c.id === selectedCity)?.label}
                </h2>
                <p className="text-white/90 text-lg md:text-xl drop-shadow-md">
                  Discover amazing places, events, and experiences
                </p>
              </div>
            </div>
          </motion.div>

          {/* 9-Grid Categories */}
          <motion.div 
            className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Explore Categories</h2>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {categories.slice(0, 9).map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group relative p-3 md:p-5 aspect-square flex flex-col items-center justify-center transition-all duration-300 ${
                    selectedCategory === cat.id ? 'tile-3d-active' : 'tile-3d hover:tile-3d-hover'
                  }`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`text-xl md:text-2xl mb-1 md:mb-2 p-2 md:p-3 rounded-full bg-gradient-to-br ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <span className="text-white text-[9px] md:text-xs font-semibold text-center leading-tight">
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Featured Places */}
          <motion.div 
            className="glass-brand rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">Featured Places</h2>
            <div className="overflow-x-auto pb-2 no-scrollbar">
              <div className="flex gap-3 md:gap-4">
                {featuredPlaces.map((place) => (
                  <div 
                    key={place.id}
                    className="min-w-[200px] md:min-w-[280px] glass-strong rounded-xl md:rounded-2xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="h-28 md:h-40 relative overflow-hidden bg-gradient-to-br from-gold-500/30 to-cyan-500/30 flex items-center justify-center">
                      <div className="text-6xl opacity-30">{place.image === 'hotel' ? '🏨' : place.image === 'food' ? '🍽️' : '☕'}</div>
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="text-white font-semibold text-sm md:text-base mb-1">{place.name}</h3>
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
        </div>
      </div>
    </div>
  );
}
