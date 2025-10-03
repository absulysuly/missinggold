/**
 * Categories Configuration Loader
 * Provides centralized access to category data throughout the application
 */

import type { Category, CategoryData } from '@/types/categories';
import categoriesData from '../../data/categories.json';

/**
 * All available categories
 */
export const CATEGORIES: Category[] = categoriesData.categories as Category[];

/**
 * Category labels enum for type safety
 */
export const CategoryLabels = {
  HOTELS: 'Hotels',
  RESTAURANTS: 'Restaurants',
  CAFES: 'Cafés',
  SERVICES: 'Services',
  EVENTS: 'Events',
  ENTERTAINMENT: 'Entertainment',
  SHOPPING: 'Shopping',
  TRANSPORTATION: 'Transportation',
  TOURISM: 'Tourism',
} as const;

/**
 * Get category by label
 */
export function getCategoryByLabel(label: string): Category | undefined {
  return CATEGORIES.find(cat => cat.label === label);
}

/**
 * Get all subcategories for a specific category
 */
export function getSubcategoriesByCategory(categoryLabel: string) {
  const category = getCategoryByLabel(categoryLabel);
  return category?.subcategories || [];
}

/**
 * Get all subcategories as a flat array with category context
 */
export function getAllSubcategories() {
  return CATEGORIES.flatMap(category =>
    category.subcategories.map(sub => ({
      ...sub,
      categoryLabel: category.label,
      categoryIcon: category.icon,
    }))
  );
}

/**
 * Find subcategory by ID across all categories
 */
export function findSubcategoryById(subcategoryId: string) {
  for (const category of CATEGORIES) {
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    if (subcategory) {
      return {
        ...subcategory,
        categoryLabel: category.label,
        categoryIcon: category.icon,
      };
    }
  }
  return undefined;
}

/**
 * Check if a category label exists
 */
export function isValidCategoryLabel(label: string): boolean {
  return CATEGORIES.some(cat => cat.label === label);
}

/**
 * Check if a subcategory ID exists within a category
 */
export function isValidSubcategory(categoryLabel: string, subcategoryId: string): boolean {
  const category = getCategoryByLabel(categoryLabel);
  return category?.subcategories.some(sub => sub.id === subcategoryId) ?? false;
}

/**
 * Export the raw data for cases where it's needed
 */
export const categoriesConfig: CategoryData = categoriesData as CategoryData;
