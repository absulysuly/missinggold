import { CategoryFilterState } from '../lib/filters';
import { FEATURED_PLACES } from '../lib/data';

export type PlaceDto = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  governorate: string;
  rating: number;
  price: '$' | '$$' | '$$$' | '$$$$';
  imageUrl?: string;
  locationText?: string;
  isOpen?: boolean;
};

export type PlacesResponse = {
  data: PlaceDto[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
};

export type Place = {
  id: string | number;
  name: string;
  category: string;
  subcategory?: string;
  governorate: string;
  rating: number;
  price: '$' | '$$' | '$$$' | '$$$$';
  image: string; // UI-friendly; fallback to emoji if no imageUrl
  location: string;
  isOpen?: boolean;
};

export type PlacesQueryParams = {
  cityId: string;
  categoryId?: string | null;
  filters?: CategoryFilterState | null;
  page?: number;
  pageSize?: number;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:4000';

function buildQuery(params: PlacesQueryParams): string {
  const u = new URL(API_BASE.replace(/\/$/, '') + '/places');
  const { cityId, categoryId, filters, page = 1, pageSize = 20 } = params;
  u.searchParams.set('cityId', cityId);
  if (categoryId) u.searchParams.set('categoryId', categoryId);
  u.searchParams.set('page', String(page));
  u.searchParams.set('pageSize', String(pageSize));
  if (filters) {
    if (filters.priceId) u.searchParams.set('priceId', filters.priceId);
    if (filters.minRating) u.searchParams.set('minRating', String(filters.minRating));
    if (typeof filters.distanceKm === 'number') u.searchParams.set('distanceKm', String(filters.distanceKm));
    if (filters.amenities?.length) u.searchParams.set('amenities', filters.amenities.join(','));
  }
  return u.toString();
}

function mapDtoToUi(d: PlaceDto): Place {
  return {
    id: d.id,
    name: d.name,
    category: d.category,
    subcategory: d.subcategory,
    governorate: d.governorate,
    rating: d.rating,
    price: d.price,
    image: d.imageUrl || '📍',
    location: d.locationText || '',
    isOpen: d.isOpen,
  };
}

export async function fetchPlaces(params: PlacesQueryParams): Promise<Place[]> {
  const url = buildQuery(params);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: PlacesResponse = await res.json();
    return (json.data || []).map(mapDtoToUi);
  } catch (err) {
    // Fallback to local mock data so UI remains functional offline or without backend
    const { cityId, categoryId, filters, page = 1, pageSize = 20 } = params;
    let results = FEATURED_PLACES.filter(p => p.governorate === cityId);
    if (categoryId) results = results.filter(p => p.category === categoryId);
    if (filters) {
      if (filters.priceId) {
        const symMap: Record<string, string> = { budget: '$', moderate: '$$', expensive: '$$$', luxury: '$$$$' };
        const wanted = symMap[filters.priceId];
        if (wanted) results = results.filter(p => p.price === wanted);
      }
      if (filters.minRating) results = results.filter(p => p.rating >= (filters.minRating ?? 0));
      if (typeof filters.distanceKm === 'number') {
        results = results.filter(p => {
          const m = /([0-9]+\.?[0-9]*)\s*km/i.exec(p.location ?? '');
          if (!m) return true; const d = parseFloat(m[1]); return d <= filters.distanceKm!;
        });
      }
      if (filters.amenities?.length) {
        // Mock filter: include all since mock data may lack structured amenities; keep UI resilient
      }
    }
    const start = (page - 1) * pageSize;
    const sliced = results.slice(start, start + pageSize);
    return sliced.map(p => ({
      id: p.id, name: p.name, category: p.category, subcategory: (p as any).subcategory,
      governorate: p.governorate, rating: p.rating, price: p.price as any,
      image: p.image, location: p.location, isOpen: (p as any).isOpen,
    }));
  }
}
