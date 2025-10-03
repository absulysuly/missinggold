'use client';

import { useState } from 'react';
import { Filter, X, Star, DollarSign, MapPin, Calendar, Users, Utensils, Wifi, ParkingCircle, Coffee, Clock } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface CategoryFiltersProps {
  category: 'hotels' | 'restaurants' | 'cafes' | 'events' | 'tourism';
  onFilterChange: (filters: Record<string, any>) => void;
}

export default function CategoryFilters({ category, onFilterChange }: CategoryFiltersProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  // Hotel Filters
  const hotelFilters = {
    starRating: [
      { id: '5', label: '5 Stars', icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> },
      { id: '4', label: '4 Stars', icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> },
      { id: '3', label: '3 Stars', icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> },
    ],
    priceRange: [
      { id: 'budget', label: 'Budget ($)', icon: <DollarSign className="w-4 h-4" /> },
      { id: 'moderate', label: 'Moderate ($$)', icon: <DollarSign className="w-4 h-4" /> },
      { id: 'luxury', label: 'Luxury ($$$)', icon: <DollarSign className="w-4 h-4" /> },
    ],
    amenities: [
      { id: 'wifi', label: 'Free WiFi', icon: <Wifi className="w-4 h-4" /> },
      { id: 'parking', label: 'Parking', icon: <ParkingCircle className="w-4 h-4" /> },
      { id: 'restaurant', label: 'Restaurant', icon: <Utensils className="w-4 h-4" /> },
      { id: 'pool', label: 'Swimming Pool', icon: null },
      { id: 'gym', label: 'Gym', icon: null },
      { id: 'spa', label: 'Spa', icon: null },
    ],
    location: [
      { id: 'baghdad', label: 'Baghdad' },
      { id: 'erbil', label: 'Erbil' },
      { id: 'basra', label: 'Basra' },
      { id: 'sulaymaniyah', label: 'Sulaymaniyah' },
      { id: 'mosul', label: 'Mosul' },
    ],
  };

  // Restaurant Filters
  const restaurantFilters = {
    cuisine: [
      { id: 'iraqi', label: 'Iraqi' },
      { id: 'middle_eastern', label: 'Middle Eastern' },
      { id: 'turkish', label: 'Turkish' },
      { id: 'italian', label: 'Italian' },
      { id: 'asian', label: 'Asian' },
      { id: 'international', label: 'International' },
    ],
    priceRange: [
      { id: 'cheap', label: 'Budget ($)' },
      { id: 'moderate', label: 'Moderate ($$)' },
      { id: 'expensive', label: 'Fine Dining ($$$)' },
    ],
    features: [
      { id: 'outdoor', label: 'Outdoor Seating' },
      { id: 'delivery', label: 'Delivery Available' },
      { id: 'wifi', label: 'Free WiFi' },
      { id: 'family', label: 'Family Friendly' },
      { id: 'parking', label: 'Parking' },
    ],
  };

  // Event Filters
  const eventFilters = {
    type: [
      { id: 'wedding', label: 'Wedding' },
      { id: 'conference', label: 'Conference' },
      { id: 'concert', label: 'Concert' },
      { id: 'exhibition', label: 'Exhibition' },
      { id: 'sports', label: 'Sports' },
      { id: 'cultural', label: 'Cultural' },
    ],
    dateRange: [
      { id: 'today', label: 'Today' },
      { id: 'tomorrow', label: 'Tomorrow' },
      { id: 'this_week', label: 'This Week' },
      { id: 'this_month', label: 'This Month' },
      { id: 'custom', label: 'Custom Date' },
    ],
    priceRange: [
      { id: 'free', label: 'Free Events' },
      { id: 'under_50k', label: 'Under 50K IQD' },
      { id: 'under_100k', label: 'Under 100K IQD' },
      { id: 'premium', label: 'Premium' },
    ],
    capacity: [
      { id: 'small', label: '< 100 people' },
      { id: 'medium', label: '100-500 people' },
      { id: 'large', label: '500+ people' },
    ],
  };

  const getFiltersForCategory = () => {
    switch (category) {
      case 'hotels':
        return hotelFilters;
      case 'restaurants':
      case 'cafes':
        return restaurantFilters;
      case 'events':
        return eventFilters;
      default:
        return {};
    }
  };

  const filters = getFiltersForCategory();

  const handleFilterToggle = (filterType: string, value: string) => {
    const updated = { ...selectedFilters };
    if (!updated[filterType]) {
      updated[filterType] = [];
    }
    const index = updated[filterType].indexOf(value);
    if (index > -1) {
      updated[filterType].splice(index, 1);
    } else {
      updated[filterType].push(value);
    }
    setSelectedFilters(updated);
    onFilterChange(updated);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Filter Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Filters</h3>
              {getActiveFilterCount() > 0 && (
                <p className="text-sm text-gray-500">{getActiveFilterCount()} active</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      {showFilters && (
        <div className="p-6 space-y-6">
          {Object.entries(filters).map(([filterType, options]) => (
            <div key={filterType} className="space-y-3">
              <h4 className="font-semibold text-gray-900 capitalize flex items-center gap-2">
                {filterType === 'starRating' && <Star className="w-4 h-4" />}
                {filterType === 'priceRange' && <DollarSign className="w-4 h-4" />}
                {filterType === 'location' && <MapPin className="w-4 h-4" />}
                {filterType === 'dateRange' && <Calendar className="w-4 h-4" />}
                {filterType === 'capacity' && <Users className="w-4 h-4" />}
                {filterType.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              
              <div className="space-y-2">
                {(options as FilterOption[]).map((option) => {
                  const isSelected = selectedFilters[filterType]?.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleFilterToggle(filterType, option.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {option.icon}
                      <span className="font-medium flex-1 text-left">{option.label}</span>
                      {isSelected && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Price Range Slider (for hotels/restaurants) */}
          {(category === 'hotels' || category === 'restaurants') && (
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900">Price Range</h4>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>0 IQD</span>
                  <span>500K+ IQD</span>
                </div>
              </div>
            </div>
          )}

          {/* Apply Filters Button */}
          <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
            Apply Filters ({getActiveFilterCount()})
          </button>
        </div>
      )}
    </div>
  );
}
