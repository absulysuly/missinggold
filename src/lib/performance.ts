/**
 * Performance Utilities
 * 
 * Comprehensive utilities for performance optimization including:
 * - Debouncing and throttling for event handlers
 * - Memoization for expensive computations
 * - Lazy loading helpers
 * - RAF (RequestAnimationFrame) scheduling
 */

/**
 * Debounce function - delays execution until after wait time has elapsed
 * Perfect for: resize, scroll, input events
 * 
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait before executing
 * @param immediate - Execute on leading edge instead of trailing
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

/**
 * Throttle function - ensures function is called at most once per interval
 * Perfect for: scroll handlers, resize handlers, API calls
 * 
 * @param func - Function to throttle
 * @param limit - Minimum time between function calls in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = func(...args);
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
    
    return lastResult;
  };
}

/**
 * RAF (RequestAnimationFrame) throttle for smooth animations
 * Ensures function only runs once per animation frame
 * 
 * @param callback - Function to execute on animation frame
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  callback: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function throttledFunction(...args: Parameters<T>) {
    if (rafId !== null) {
      return;
    }

    rafId = requestAnimationFrame(() => {
      callback(...args);
      rafId = null;
    });
  };
}

/**
 * Memoization cache for expensive computations
 * Uses WeakMap for automatic garbage collection
 */
const memoCache = new WeakMap<object, Map<string, any>>();

/**
 * Memoize expensive function calls
 * 
 * @param fn - Function to memoize
 * @param keyGenerator - Custom key generator for cache
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    
    // Limit cache size to prevent memory leaks
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    return result;
  }) as T;
}

/**
 * Idle callback wrapper - executes function during browser idle time
 * 
 * @param callback - Function to execute during idle time
 * @param options - Options for idle callback
 */
export function runWhenIdle(
  callback: () => void,
  options: { timeout?: number } = {}
): number {
  if ('requestIdleCallback' in window) {
    return (window as any).requestIdleCallback(callback, options);
  }
  
  // Fallback for browsers without requestIdleCallback
  return setTimeout(callback, 1) as any;
}

/**
 * Cancel idle callback
 */
export function cancelIdleCallback(id: number): void {
  if ('cancelIdleCallback' in window) {
    (window as any).cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Batch state updates to reduce re-renders
 * Groups multiple state updates into a single render cycle
 */
export function batchUpdates<T>(updates: Array<() => void>): void {
  // React 18+ automatically batches updates, but this ensures it
  if (typeof window !== 'undefined' && 'queueMicrotask' in window) {
    queueMicrotask(() => {
      updates.forEach(update => update());
    });
  } else {
    updates.forEach(update => update());
  }
}

/**
 * Check if device has reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimal image size based on device pixel ratio and viewport
 */
export function getOptimalImageSize(
  baseWidth: number,
  baseHeight: number
): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: baseWidth, height: baseHeight };
  }

  const dpr = window.devicePixelRatio || 1;
  const maxDpr = Math.min(dpr, 2); // Cap at 2x for performance

  return {
    width: Math.round(baseWidth * maxDpr),
    height: Math.round(baseHeight * maxDpr),
  };
}

/**
 * Lazy load module/component with error handling
 */
export async function lazyLoad<T>(
  importFn: () => Promise<T>,
  retries = 3,
  retryDelay = 1000
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await importFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      
      await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
    }
  }
  
  throw new Error('Failed to load module after retries');
}

/**
 * Measure performance of a function
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  label: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    console.log(`[Performance] ${label}: ${(end - start).toFixed(2)}ms`);
    
    return result;
  }) as T;
}

/**
 * Create a persistent cache with localStorage
 */
export class PersistentCache<T = any> {
  private prefix: string;
  private ttl: number;

  constructor(prefix: string, ttlMinutes = 60) {
    this.prefix = prefix;
    this.ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
  }

  set(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
      const item = {
        value,
        timestamp: Date.now(),
        ttl: this.ttl,
      };
      
      localStorage.setItem(`${this.prefix}:${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to save to cache:', error);
    }
  }

  get(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const itemStr = localStorage.getItem(`${this.prefix}:${key}`);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      const now = Date.now();

      // Check if expired
      if (now - item.timestamp > item.ttl) {
        this.remove(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.warn('Failed to read from cache:', error);
      return null;
    }
  }

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(`${this.prefix}:${key}`);
    } catch (error) {
      console.warn('Failed to remove from cache:', error);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`${this.prefix}:`)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}

/**
 * Preconnect to external domains for faster resource loading
 */
export function preconnect(urls: string[]): void {
  if (typeof document === 'undefined') return;

  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Prefetch resources
 */
export function prefetch(urls: string[]): void {
  if (typeof document === 'undefined') return;

  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}
