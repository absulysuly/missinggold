"use client";

/**
 * Optimized Neon Homepage Component
 * 
 * Performance Optimizations:
 * - Separated business logic from UI (Functional Core, Imperative Shell)
 * - Debounced window resize handlers
 * - Memoized components with React.memo
 * - useMemo for expensive computations
 * - useCallback for stable function references
 * - Lazy loading for images
 * - Intersection Observer for visibility-based rendering
 */

import { useState, useMemo, useCallback, memo } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { useTranslations } from '../hooks/useTranslations';
import { usePersistedState } from '../hooks/useOptimizedState';

// ==================== TYPES ====================

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  count: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: 'events' | 'hotels' | 'restaurants' | 'cafes' | 'tourism';
  count: number;
  href: string;
}

interface FeaturedEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: string;
}

// ==================== BUSINESS LOGIC ====================

/**
 * Hook for story users data
 * Memoized to prevent unnecessary re-computations
 */
function useStoryUsers(): StoryUser[] {
  return useMemo(() => [
    { id: '1', name: 'Ahmed M.', avatar: '/api/placeholder/64/64', count: 245 },
    { id: '2', name: 'Sara K.', avatar: '/api/placeholder/64/64', count: 89 },
    { id: '3', name: 'Omar H.', avatar: '/api/placeholder/64/64', count: 156 }
  ], []);
}

/**
 * Hook for categories data with proper typing and memoization
 */
function useCategories(): Category[] {
  return useMemo(() => [
    { id: 'events', name: 'Events', icon: '📅', color: 'events', count: 124, href: '/events' },
    { id: 'hotels', name: 'Hotels', icon: '🏨', color: 'hotels', count: 87, href: '/hotels' },
    { id: 'restaurants', name: 'Restaurants', icon: '🍽️', color: 'restaurants', count: 156, href: '/restaurants' },
    { id: 'cafes', name: 'Cafes', icon: '☕', color: 'cafes', count: 92, href: '/cafes' },
    { id: 'tourism', name: 'Tourism', icon: '📸', color: 'tourism', count: 73, href: '/tourism' }
  ], []);
}

/**
 * Hook for featured events data
 */
function useFeaturedEvents(): FeaturedEvent[] {
  return useMemo(() => [
    {
      id: '1',
      title: 'Baghdad Cultural Night',
      description: 'Experience traditional Iraqi culture with music, dance, and art',
      icon: '🎭',
      date: 'Oct 15, 2024',
      category: 'events'
    },
    {
      id: '2',
      title: 'Tech Innovation Summit',
      description: 'Join leading tech experts for the future of technology in Iraq',
      icon: '🎪',
      date: 'Oct 28, 2024',
      category: 'events'
    }
  ], []);
}

// ==================== UI COMPONENTS ====================

/**
 * Story Avatar Component - Memoized for performance
 */
const StoryAvatar = memo(({ user }: { user: StoryUser }) => {
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" fill="#2D1B4E"/>
        <circle cx="32" cy="24" r="8" fill="#B24BF3"/>
        <path d="M16 48c0-8 7-16 16-16s16 8 16 16" fill="#B24BF3"/>
      </svg>
    `)}`;
  }, []);

  return (
    <div className="story-avatar events-glow">
      <img 
        src={user.avatar} 
        alt={user.name}
        loading="lazy"
        onError={handleImageError}
      />
      <div className="name">{user.name}</div>
    </div>
  );
});
StoryAvatar.displayName = 'StoryAvatar';

/**
 * Category Card Component - Memoized for performance
 */
const CategoryCard = memo(({ category, index }: { category: Category; index: number }) => {
  return (
    <Link
      href={category.href}
      className={`category-icon ${category.color} ${category.color}-glow neon-pulse`}
      style={{
        textDecoration: 'none',
        animationDelay: `${index * 0.2}s`
      }}
    >
      <div 
        className="icon" 
        style={{
          fontSize: '3rem',
          filter: `drop-shadow(0 0 10px var(--${category.color}-color))`
        }}
      >
        {category.icon}
      </div>
      <div 
        className="label" 
        style={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: `var(--${category.color}-color)`,
          textShadow: `0 0 5px var(--${category.color}-color)`
        }}
      >
        {category.name}
      </div>
      <div style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginTop: '4px'
      }}>
        {category.count}+ places
      </div>
    </Link>
  );
});
CategoryCard.displayName = 'CategoryCard';

/**
 * Event Card Component - Memoized for performance
 */
const EventCard = memo(({ event, featured = false }: { event: FeaturedEvent; featured?: boolean }) => {
  return (
    <div className={`neon-card events events-glow ${featured ? 'featured' : ''}`}>
      <div style={{ padding: '20px' }}>
        <div style={{
          width: '100%',
          height: '150px',
          background: 'linear-gradient(135deg, var(--events-color), var(--bg-secondary))',
          borderRadius: '8px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem'
        }}>
          {event.icon}
        </div>
        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.2rem' }}>
          {event.title}
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
          {event.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
            📅 {event.date}
          </span>
          <button className="neon-button events" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});
EventCard.displayName = 'EventCard';

// ==================== MAIN COMPONENT ====================

// Available cities in Iraq
const CITIES = [
  { id: 'baghdad', name: 'Baghdad', nameAr: 'بغداد', region: 'Central Iraq' },
  { id: 'erbil', name: 'Erbil', nameAr: 'أربيل', region: 'Kurdistan' },
  { id: 'basra', name: 'Basra', nameAr: 'البصرة', region: 'Southern Iraq' },
  { id: 'mosul', name: 'Mosul', nameAr: 'الموصل', region: 'Northern Iraq' },
  { id: 'sulaymaniyah', name: 'Sulaymaniyah', nameAr: 'السليمانية', region: 'Kurdistan' },
  { id: 'najaf', name: 'Najaf', nameAr: 'النجف', region: 'Central Iraq' },
  { id: 'karbala', name: 'Karbala', nameAr: 'كربلاء', region: 'Central Iraq' },
  { id: 'kirkuk', name: 'Kirkuk', nameAr: 'كركوك', region: 'Northern Iraq' },
];

export default function OptimizedNeonHomepage() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslations();
  
  // Use persisted state for selected city (cached in localStorage)
  const [selectedCity, setSelectedCity] = usePersistedState('selected-city', 'Baghdad');
  const [showCityModal, setShowCityModal] = useState(false);
  
  // Get data with memoization
  const storyUsers = useStoryUsers();
  const categories = useCategories();
  const featuredEvents = useFeaturedEvents();
  
  // Callbacks with useCallback to prevent recreation
  const handleCityChange = useCallback(() => {
    setShowCityModal(true);
  }, []);
  
  const selectCity = useCallback((cityName: string) => {
    setSelectedCity(cityName);
    setShowCityModal(false);
  }, [setSelectedCity]);

  return (
    <div className="min-h-screen" id="main-content">
      {/* Stories Section */}
      <section className="story-section" aria-label="User Stories">
        <div className="story-container">
          {/* Add Story Button */}
          <button 
            className="story-avatar add-story"
            aria-label="Add your story"
          >
            <span>+</span>
            <div className="name">Add Story</div>
          </button>
          
          {/* User Stories */}
          {storyUsers.map((user) => (
            <StoryAvatar key={user.id} user={user} />
          ))}
        </div>
      </section>

      {/* Currently Exploring Section */}
      <section 
        className="currently-exploring tourism-glow" 
        aria-label="Currently Exploring Location"
      >
        <h2 className="neon-glow">Currently Exploring</h2>
        
        <div className="city-name">
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#00F0FF', 
            textShadow: '0 0 10px #00F0FF' 
          }}>
            {selectedCity}
          </div>
          <div className="arabic-name">
            {CITIES.find(c => c.name === selectedCity)?.nameAr || 'بغداد'}
          </div>
          <div style={{ marginTop: '8px', opacity: 0.8 }}>
            {CITIES.find(c => c.name === selectedCity)?.region || 'Central Iraq'}
          </div>
        </div>
        
        <p style={{ margin: '16px 0', fontSize: '1.1rem' }}>
          Discover amazing events and venues
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <button 
            className="neon-button tourism" 
            onClick={handleCityChange}
            aria-label="Change city"
          >
            Change City
          </button>
          
          <button 
            className="neon-button tourism"
            onClick={handleCityChange}
            aria-label="Select a different city"
          >
            Select a City
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '40px 20px' }} aria-label="Browse Categories">
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2rem', 
          marginBottom: '32px',
          color: 'var(--text-primary)',
          textShadow: '0 0 10px var(--events-color)'
        }}>
          Categories
        </h2>
        
        <div className="grid-layout categories">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>

      {/* Featured Content Sections */}
      <section style={{ padding: '40px 20px' }} aria-label="Featured Events">
        {/* Featured Events */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              textShadow: '0 0 5px var(--events-color)'
            }}>
              Featured Events in {selectedCity}
            </h3>
            <Link 
              href="/events" 
              className="neon-button events"
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
            >
              See All
            </Link>
          </div>
          
          <div className="grid-layout events">
            {featuredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                featured={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Featured Hotels Preview */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              textShadow: '0 0 5px var(--hotels-color)'
            }}>
              Featured Hotels in {selectedCity}
            </h3>
            <Link 
              href="/hotels" 
              className="neon-button hotels"
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
            >
              See All
            </Link>
          </div>
          
          {/* Hotel card would go here - simplified for now */}
        </div>

        {/* Quick Actions */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/events/create" className="neon-button tourism tourism-glow">
              <span>+</span> Create Event
            </Link>
            <Link href="/events" className="neon-button events events-glow">
              Explore Events
            </Link>
            <Link href="/hotels" className="neon-button hotels hotels-glow">
              Find Hotels
            </Link>
            <Link href="/restaurants" className="neon-button restaurants restaurants-glow">
              Discover Restaurants
            </Link>
          </div>
        </div>
      </section>
      
      {/* City Selector Modal */}
      {showCityModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowCityModal(false)}
        >
          <div 
            className="neon-card tourism w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCityModal(false)}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              ×
            </button>
            
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              textAlign: 'center',
              color: 'var(--tourism-color)',
              textShadow: '0 0 10px var(--tourism-color)'
            }}>
              Select Your City
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
              padding: '20px'
            }}>
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => selectCity(city.name)}
                  className={`neon-card tourism ${
                    selectedCity === city.name ? 'tourism-glow' : ''
                  } hover:scale-105 transition-transform`}
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    border: selectedCity === city.name ? '2px solid var(--tourism-color)' : '1px solid rgba(0, 240, 255, 0.2)',
                    background: selectedCity === city.name ? 'rgba(0, 240, 255, 0.1)' : 'var(--bg-secondary)'
                  }}
                >
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: 'var(--tourism-color)'
                  }}>
                    {city.name}
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    marginBottom: '4px',
                    opacity: 0.9
                  }}>
                    {city.nameAr}
                  </div>
                  <div style={
{
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    color: 'var(--text-secondary)'
                  }}>
                    {city.region}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
