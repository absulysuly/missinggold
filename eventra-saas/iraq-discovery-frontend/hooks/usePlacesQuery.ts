import { useQuery } from '@tanstack/react-query';
import { fetchPlaces, PlacesQueryParams, Place } from '../lib/api';

export function usePlacesQuery(params: PlacesQueryParams) {
  const { cityId, categoryId, filters, page = 1, pageSize = 20 } = params;
  const queryKey = [
    'places',
    cityId,
    categoryId ?? 'all',
    filters?.priceId ?? null,
    filters?.minRating ?? null,
    filters?.distanceKm ?? null,
    page,
    pageSize,
  ];

  return useQuery<Place[]>({
    queryKey,
    queryFn: () => fetchPlaces({ cityId, categoryId, filters, page, pageSize }),
    enabled: !!cityId,
  });
}
