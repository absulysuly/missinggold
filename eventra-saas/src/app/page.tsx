'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import CategoryFilters from '@/components/filters/CategoryFilters';
import { 
  Calendar, MapPin, Star, Heart, Share2, Clock, Users, 
  TrendingUp, Sparkles, ArrowRight, Search, Filter, Smartphone,
  Mail, Phone, Facebook, Instagram, Twitter, Award, Verified
} from 'lucide-react';

interface VenueCardProps {
  image: string;
  title: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  featured?: boolean;
  verified?: boolean;
}

function VenueCard({ image, title, category, location, rating, reviews, price, featured, verified }: VenueCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            <span>Featured</span>
          </div>
        )}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg">
          <Heart className="w-5 h-5 text-gray-700" />
        </button>
        <div className="absolute bottom-4 left-4 px-3 py-1 glass-dark rounded-full text-white text-sm font-medium">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-2">
              {title}
              {verified && <Verified className="w-5 h-5 text-blue-600 fill-current" />}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviews})</span>
          </div>
          <div className="text-lg font-bold text-blue-600">{price}</div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/venues/${title.toLowerCase().replace(/ /g, '-')}`}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-center hover:shadow-lg transition-all"
          >
            View Details
          </Link>
          <button className="px-4 py-2.5 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [currentLocale, setCurrentLocale] = useState<'en' | 'ar' | 'ku'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for featured venues
  const featuredVenues = [
    {
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      title: 'Babylon Rotana Hotel',
      category: '5-Star Hotel',
      location: 'Baghdad, Iraq',
      rating: 5,
      reviews: 342,
      price: 'From $150/night',
      featured: true,
      verified: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      title: 'Ziggurat Restaurant',
      category: 'Fine Dining',
      location: 'Erbil, Iraq',
      rating: 5,
      reviews: 287,
      price: '$$-$$$',
      verified: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
      title: 'Citadel of Erbil',
      category: 'Historical Site',
      location: 'Erbil, Iraq',
      rating: 5,
      reviews: 1245,
      price: 'Free Entry',
      featured: true,
      verified: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c898?w=800&q=80',
      title: 'Al-Shahbandar Café',
      category: 'Traditional Café',
      location: 'Baghdad, Iraq',
      rating: 4,
      reviews: 523,
      price: '$',
      verified: true,
    },
  ];

  // Sponsors
  const sponsors = [
    { name: 'Iraqi Airways', logo: '✈️' },
    { name: 'Zain Iraq', logo: '📱' },
    { name: 'Asia Cell', logo: '📡' },
    { name: 'Bank of Baghdad', logo: '🏦' },
    { name: 'Iraqi Tourism Board', logo: '🗺️' },
    { name: 'Erbil International', logo: '🏛️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <Navigation currentLocale={currentLocale} onLocaleChange={setCurrentLocale} />

      {/* Hero Section with Search */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 animate-float">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Discover 1,200+ Amazing Venues & Events in Iraq
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-gradient-animated mt-2">Venue or Event</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-50 mb-10 max-w-3xl mx-auto">
              Explore hotels, restaurants, cafes, events, and attractions across Iraq and Kurdistan
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto glass-card p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search venues, events, restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-blue-600 focus:outline-none text-gray-900"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-blue-600 focus:outline-none appearance-none text-gray-900">
                <option>All Cities</option>
                <option>Baghdad</option>
                <option>Erbil</option>
                <option>Basra</option>
                <option>Sulaymaniyah</option>
                <option>Mosul</option>
              </select>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>

          {/* Quick Categories */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['Hotels', 'Restaurants', 'Cafes', 'Events', 'Tourism'].map((cat) => (
              <button
                key={cat}
                className="px-6 py-3 glass-dark text-white rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="bg-white border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase mb-6">
            Trusted By Leading Organizations
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {sponsor.logo}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Featured Venues */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-80 shrink-0">
            <CategoryFilters
              category="hotels"
              onFilterChange={(filters) => console.log('Filters:', filters)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Featured Venues
                </h2>
                <p className="text-gray-600">Handpicked by our team</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                <select className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none">
                  <option>Sort: Popular</option>
                  <option>Sort: Rating</option>
                  <option>Sort: Price Low-High</option>
                  <option>Sort: Price High-Low</option>
                </select>
              </div>
            </div>

            {/* Venue Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {featuredVenues.map((venue, i) => (
                <VenueCard key={i} {...venue} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-2">
                <span>Load More Venues</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-white/90">
              Don't miss out on these exciting events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Baghdad Tech Summit 2025',
                date: 'March 15, 2025',
                location: 'Baghdad Convention Center',
                attendees: '500+',
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
              },
              {
                title: 'Kurdish Cultural Festival',
                date: 'March 20, 2025',
                location: 'Erbil Citadel',
                attendees: '1000+',
                image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
              },
              {
                title: 'Basra Food Expo',
                date: 'March 25, 2025',
                location: 'Basra International',
                attendees: '750+',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
              },
            ].map((event, i) => (
              <div key={i} className="glass-card p-6 hover:shadow-2xl transition-all group">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.attendees} Expected</span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                  Get Tickets
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card p-12 md:p-16 text-center rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Download Our Mobile App
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book venues, discover events, and explore Iraq on the go
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </button>
              <button className="px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100">Get the latest events and exclusive offers</p>
            </div>
            <div className="w-full md:w-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">E</span>
                </div>
                <span className="text-2xl font-bold">Eventra</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your gateway to discovering Iraq's finest venues and creating unforgettable experiences
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Explore</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/hotels" className="hover:text-white transition-colors">Hotels</Link></li>
                <li><Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link></li>
                <li><Link href="/cafes" className="hover:text-white transition-colors">Cafes</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link href="/tourism" className="hover:text-white transition-colors">Tourism</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@eventra.iq</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+964 XXX XXX XXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Baghdad, Iraq</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2025 Eventra. All rights reserved. Made with ❤️ for Iraq & Kurdistan.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
