import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface IraqDiscoveryDB extends DBSchema {
  favorites: {
    key: string;
    value: {
      id: string;
      publicId: string;
      title: string;
      category: string;
      city: string;
      imageUrl: string;
      addedAt: number;
    };
    indexes: { 'by-category': string; 'by-city': string; 'by-date': number };
  };
  preferences: {
    key: string;
    value: {
      key: string;
      value: any;
      updatedAt: number;
    };
  };
  category_filters: {
    key: string; // categoryId
    value: {
      categoryId: string;
      priceId?: string;
      minRating?: number;
      distanceKm?: number;
      amenities?: string[];
      updatedAt: number;
    };
  };
}

const DB_NAME = 'iraq-discovery';
const DB_VERSION = 2;

let dbInstance: IDBPDatabase<IraqDiscoveryDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<IraqDiscoveryDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<IraqDiscoveryDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // Favorites store
      if (!db.objectStoreNames.contains('favorites')) {
        const favStore = db.createObjectStore('favorites', { keyPath: 'id' });
        favStore.createIndex('by-category', 'category');
        favStore.createIndex('by-city', 'city');
        favStore.createIndex('by-date', 'addedAt');
      }

      // Preferences store
      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'key' });
      }

      // Category filters store
      if (!db.objectStoreNames.contains('category_filters')) {
        db.createObjectStore('category_filters', { keyPath: 'categoryId' });
      }
    },
  });

  return dbInstance;
}

// ===================================
// FAVORITES OPERATIONS
// ===================================

export async function addFavorite(item: {
  id: string;
  publicId: string;
  title: string;
  category: string;
  city: string;
  imageUrl: string;
}): Promise<void> {
  const db = await getDB();
  await db.put('favorites', {
    ...item,
    addedAt: Date.now(),
  });
}

export async function removeFavorite(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('favorites', id);
}

export async function isFavorite(id: string): Promise<boolean> {
  const db = await getDB();
  const item = await db.get('favorites', id);
  return !!item;
}

export async function getAllFavorites() {
  const db = await getDB();
  return db.getAll('favorites');
}

export async function getFavoritesByCategory(category: string) {
  const db = await getDB();
  return db.getAllFromIndex('favorites', 'by-category', category);
}

export async function getFavoritesByCity(city: string) {
  const db = await getDB();
  return db.getAllFromIndex('favorites', 'by-city', city);
}

export async function clearFavorites(): Promise<void> {
  const db = await getDB();
  await db.clear('favorites');
}

// ===================================
// PREFERENCES OPERATIONS
// ===================================

export async function setPreference(key: string, value: any): Promise<void> {
  const db = await getDB();
  await db.put('preferences', {
    key,
    value,
    updatedAt: Date.now(),
  });
}

export async function getPreference<T = any>(key: string): Promise<T | null> {
  const db = await getDB();
  const pref = await db.get('preferences', key);
  return pref ? pref.value : null;
}

export async function removePreference(key: string): Promise<void> {
  const db = await getDB();
  await db.delete('preferences', key);
}

export async function getAllPreferences() {
  const db = await getDB();
  const all = await db.getAll('preferences');
  return all.reduce((acc, pref) => {
    acc[pref.key] = pref.value;
    return acc;
  }, {} as Record<string, any>);
}

// ===================================
// CATEGORY FILTERS OPERATIONS
// ===================================

export type CategoryFilterRecord = IraqDiscoveryDB['category_filters']['value'];

export async function getCategoryFilter(categoryId: string): Promise<CategoryFilterRecord | undefined> {
  const db = await getDB();
  const rec = await db.get('category_filters', categoryId);
  return rec ?? undefined;
}

export async function setCategoryFilter(record: CategoryFilterRecord): Promise<void> {
  const db = await getDB();
  await db.put('category_filters', record);
}

export async function getAllCategoryFilters(): Promise<CategoryFilterRecord[]> {
  const db = await getDB();
  return db.getAll('category_filters');
}
