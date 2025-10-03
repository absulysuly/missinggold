import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as db from '../lib/db';

// ===================================
// TYPE DEFINITIONS
// ===================================

export interface Favorite {
  id: string;
  publicId: string;
  title: string;
  category: string;
  city: string;
  imageUrl: string;
  addedAt: number;
}

export interface FilterState {
  selectedCity: string | null;
  activeCategory: string;
  selectedMonth: string;
  priceRange: [number, number];
  ratingMin: number;
  openNow: boolean;
  distanceKm: number;
  cuisines: string[];
  amenities: string[];
  searchQuery: string;
}

interface Store {
  // UI State
  theme: 'dark' | 'light';
  locale: 'en' | 'ar' | 'ku';
  
  // Filters
  filters: FilterState;
  
  // Favorites
  favorites: Set<string>;
  favoriteItems: Favorite[];
  
  // Actions
  setTheme: (theme: 'dark' | 'light') => void;
  setLocale: (locale: 'en' | 'ar' | 'ku') => void;
  
  // Filter actions
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  
  // Favorite actions
  toggleFavorite: (item: Omit<Favorite, 'addedAt'>) => Promise<void>;
  loadFavorites: () => Promise<void>;
  clearAllFavorites: () => Promise<void>;
  isFavorite: (id: string) => boolean;
}

// ===================================
// DEFAULT VALUES
// ===================================

const defaultFilters: FilterState = {
  selectedCity: 'all',
  activeCategory: 'events',
  selectedMonth: new Date().toISOString().substring(0, 7),
  priceRange: [1, 5],
  ratingMin: 0,
  openNow: false,
  distanceKm: 50,
  cuisines: [],
  amenities: [],
  searchQuery: '',
};

// ===================================
// ZUSTAND STORE
// ===================================

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'dark',
      locale: 'en',
      filters: defaultFilters,
      favorites: new Set<string>(),
      favoriteItems: [],

      // Theme toggle
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('light', theme === 'light');
      },

      // Locale setter
      setLocale: (locale) => {
        set({ locale });
        document.documentElement.dir = (locale === 'ar' || locale === 'ku') ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
      },

      // Filter management
      setFilter: (key, value) => {
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        }));
      },

      resetFilters: () => {
        set({ filters: defaultFilters });
      },

      // Favorites management
      toggleFavorite: async (item) => {
        const { favorites } = get();
        const isFav = favorites.has(item.id);

        if (isFav) {
          // Remove from favorites
          await db.removeFavorite(item.id);
          set((state) => {
            const newFavorites = new Set(state.favorites);
            newFavorites.delete(item.id);
            return {
              favorites: newFavorites,
              favoriteItems: state.favoriteItems.filter((f) => f.id !== item.id),
            };
          });
        } else {
          // Add to favorites
          await db.addFavorite(item);
          set((state) => {
            const newFavorites = new Set(state.favorites);
            newFavorites.add(item.id);
            return {
              favorites: newFavorites,
              favoriteItems: [...state.favoriteItems, { ...item, addedAt: Date.now() }],
            };
          });
        }
      },

      loadFavorites: async () => {
        try {
          const items = await db.getAllFavorites();
          const favoriteIds = new Set(items.map((item) => item.id));
          set({
            favorites: favoriteIds,
            favoriteItems: items,
          });
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
      },

      clearAllFavorites: async () => {
        await db.clearFavorites();
        set({
          favorites: new Set(),
          favoriteItems: [],
        });
      },

      isFavorite: (id) => {
        return get().favorites.has(id);
      },
    }),
    {
      name: 'iraq-discovery-storage',
      partialize: (state) => ({
        theme: state.theme,
        locale: state.locale,
        filters: state.filters,
      }),
    }
  )
);

// ===================================
// HOOKS FOR SPECIFIC SLICES
// ===================================

export const useTheme = () => useStore((state) => state.theme);
export const useLocale = () => useStore((state) => state.locale);
export const useFilters = () => useStore((state) => state.filters);
export const useFavorites = () => useStore((state) => ({
  favorites: state.favorites,
  favoriteItems: state.favoriteItems,
  toggleFavorite: state.toggleFavorite,
  isFavorite: state.isFavorite,
  clearAllFavorites: state.clearAllFavorites,
}));
