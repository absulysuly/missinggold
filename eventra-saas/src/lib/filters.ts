// Filter types for Iraq Discover category-specific filters
export type CategoryFilterState = {
  categoryId: string;
  priceId?: string;     // id from FILTER_OPTIONS.priceRanges
  minRating?: number;   // 1..5
  distanceKm?: number;  // km
  amenities?: string[]; // amenity ids depending on category
  updatedAt: number;
};

export const defaultFilterState = (categoryId: string): CategoryFilterState => ({
  categoryId,
  minRating: undefined,
  distanceKm: 10,
  amenities: [],
  updatedAt: Date.now(),
});
