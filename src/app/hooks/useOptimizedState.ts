'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PersistentCache } from '../../lib/performance';

/**
 * Optimized State Management Hooks
 * 
 * Custom hooks for efficient state management with:
 * - localStorage persistence
 * - Automatic state restoration
 * - Debounced updates
 * - Memory leak prevention
 */

/**
 * Hook for persisted state with localStorage
 * Automatically saves state to localStorage and restores on mount
 */
export function usePersistedState<T>(
  key: string,
  initialValue: T,
  ttlMinutes = 60
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const cache = useRef(new PersistentCache<T>('app-state', ttlMinutes));
  
  // Initialize state from cache or default value
  const [state, setState] = useState<T>(() => {
    const cached = cache.current.get(key);
    return cached !== null ? cached : initialValue;
  });

  // Update cache whenever state changes
  useEffect(() => {
    cache.current.set(key, state);
  }, [key, state]);

  // Clear function
  const clearState = useCallback(() => {
    cache.current.remove(key);
    setState(initialValue);
  }, [key, initialValue]);

  return [state, setState, clearState];
}

/**
 * Hook for debounced state updates
 * Delays state updates to reduce re-renders
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay = 300
): [T, T, (value: T | ((prev: T) => T)) => void] {
  const [immediateValue, setImmediateValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(immediateValue);
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [immediateValue, delay]);

  return [immediateValue, debouncedValue, setImmediateValue];
}

/**
 * Hook for window resize with debouncing
 * Prevents excessive re-renders during window resize
 */
export function useWindowSize(debounceMs = 150) {
  // Initialize with a safe default for SSR (desktop size)
  // This prevents hydration mismatch
  const [windowSize, setWindowSize] = useState({
    width: 1200, // Default to desktop width for SSR
    height: 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      // Clear existing timeout
      clearTimeout(timeoutId);
      
      // Set new timeout with debounce
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceMs);
    };

    // Set actual size immediately on mount (client-side only)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Add event listener for future resizes
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceMs]);

  return windowSize;
}

/**
 * Hook for scroll position with throttling
 * Optimized for scroll-based animations and effects
 */
export function useScrollPosition(throttleMs = 100) {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition({
            x: window.scrollX,
            y: window.scrollY,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial position
    handleScroll();

    // Add event listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}

/**
 * Hook for media query matching
 * Optimized for responsive design
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (handle both old and new API)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Hook for intersection observer
 * Efficient lazy loading and infinite scroll
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return entry;
}

/**
 * Hook for previous value
 * Useful for comparing state changes
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Hook for async data fetching with caching
 */
export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  deps: React.DependencyList = [],
  cacheTtl = 5 // minutes
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cache = useRef(new PersistentCache<T>('async-data', cacheTtl));
  const cacheKey = JSON.stringify(deps);

  const refetch = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first unless forced
      if (!force) {
        const cached = cache.current.get(cacheKey);
        if (cached !== null) {
          setData(cached);
          setLoading(false);
          return cached;
        }
      }

      // Fetch fresh data
      const result = await fetchFn();
      cache.current.set(cacheKey, result);
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      setLoading(false);
      throw error;
    }
  }, [fetchFn, cacheKey]);

  useEffect(() => {
    refetch();
  }, deps);

  return { data, loading, error, refetch };
}

/**
 * Hook for form state management
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void | Promise<void>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((
    name: keyof T,
    value: any
  ) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  }, [values, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    submitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
    reset,
  };
}

/**
 * Hook for idle detection
 * Detects when user is idle (no activity)
 */
export function useIdle(timeoutMs = 60000): boolean {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    const resetTimer = () => {
      setIsIdle(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, timeoutMs);
    };

    // Initialize
    resetTimer();

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeoutMs]);

  return isIdle;
}
