/**
 * Category and Subcategory Type Definitions
 * For the Eventra Iraqi Events & Venues Platform
 */

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  icon: string;
  label: string;
  subcategories: Subcategory[];
}

export interface CategoryData {
  categories: Category[];
}

/**
 * Type guard to check if a category ID is valid
 */
export function isValidCategoryLabel(label: string, categories: Category[]): boolean {
  return categories.some(cat => cat.label === label);
}

/**
 * Type guard to check if a subcategory ID is valid within a category
 */
export function isValidSubcategoryId(
  categoryLabel: string,
  subcategoryId: string,
  categories: Category[]
): boolean {
  const category = categories.find(cat => cat.label === categoryLabel);
  return category?.subcategories.some(sub => sub.id === subcategoryId) ?? false;
}

/**
 * Get category by label
 */
export function getCategoryByLabel(label: string, categories: Category[]): Category | undefined {
  return categories.find(cat => cat.label === label);
}

/**
 * Get subcategory by ID within a category
 */
export function getSubcategory(
  categoryLabel: string,
  subcategoryId: string,
  categories: Category[]
): Subcategory | undefined {
  const category = getCategoryByLabel(categoryLabel, categories);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
}

/**
 * Get all subcategories from all categories
 */
export function getAllSubcategories(categories: Category[]): Array<Subcategory & { categoryLabel: string }> {
  return categories.flatMap(category =>
    category.subcategories.map(sub => ({
      ...sub,
      categoryLabel: category.label,
    }))
  );
}
