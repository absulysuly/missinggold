'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe, ChevronDown, Search, User, Heart, Bell, MapPin } from 'lucide-react';

interface NavigationProps {
  currentLocale?: 'en' | 'ar' | 'ku';
  onLocaleChange?: (locale: 'en' | 'ar' | 'ku') => void;
}

export default function Navigation({ currentLocale = 'en', onLocaleChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇮🇶' },
    { code: 'ku', name: 'کوردی', flag: '🟨🟥🟩' },
  ];

  const categories = [
    { name: 'Hotels', icon: '🏨', href: '/hotels' },
    { name: 'Restaurants', icon: '🍽️', href: '/restaurants' },
    { name: 'Cafes', icon: '☕', href: '/cafes' },
    { name: 'Events', icon: '🎉', href: '/events' },
    { name: 'Tourism', icon: '📸', href: '/tourism' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      {/* Top Bar - Announcement/Promo */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">🎉 Special Offer:</span>
              <span>Get 20% off on your first booking!</span>
            </div>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-2xl font-bold text-white">E</span>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Eventra
              </span>
              <p className="text-xs text-gray-500">Discover Iraq</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Mega Menu */}
              <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Category</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group/item"
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-medium text-gray-700 group-hover/item:text-blue-600">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/venues/list" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              All Venues
            </Link>
            <Link href="/demo/event-grid" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Events
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <Search className="w-5 h-5" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Globe className="w-5 h-5" />
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {languageMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLocaleChange?.(lang.code as 'en' | 'ar' | 'ku');
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                        currentLocale === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Favorites */}
            <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
              <Heart className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {/* Categories */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase">Categories</p>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium text-gray-700">{category.name}</span>
                </Link>
              ))}
            </div>

            {/* Links */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <Link
                href="/venues/list"
                className="block py-2 text-gray-700 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Venues
              </Link>
              <Link
                href="/demo/event-grid"
                className="block py-2 text-gray-700 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>

            {/* Language Selector Mobile */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Language</p>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLocaleChange?.(lang.code as 'en' | 'ar' | 'ku');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl ${
                      currentLocale === lang.code ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sign In Button Mobile */}
            <Link
              href="/login"
              className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
