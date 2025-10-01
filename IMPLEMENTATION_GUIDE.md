# Implementation Guide
## Performance-Optimized Next.js Event Platform

**Target Audience**: Developers working on the Missinggold platform  
**Last Updated**: 2025-10-01

---

## Quick Start

### Installation & Setup

```bash
cd missinggold

# Install dependencies
npm ci

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:deploy

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the optimized application.

---

## Key Components & Usage

### 1. Performance Utilities

#### Debouncing Event Handlers

```typescript
import { debounce } from '@/lib/performance';

// Debounce search input
const handleSearch = debounce((query: string) => {
  fetchResults(query);
}, 300);

// Usage in component
<input onChange={(e) => handleSearch(e.target.value)} />
```

#### Throttling Scroll Events

```typescript
import { throttle } from '@/lib/performance';

// Throttle scroll handler
const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 100);

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### Request Animation Frame Throttling

```typescript
import { rafThrottle } from '@/lib/performance';

// Smooth animations
const handleMouseMove = rafThrottle((e: MouseEvent) => {
  updateCursorPosition(e.clientX, e.clientY);
});
```

---

### 2. Optimized State Management

#### Persisted State (with localStorage)

```typescript
import { usePersistedState } from '@/app/hooks/useOptimizedState';

function MyComponent() {
  // State persists across page reloads
  const [theme, setTheme, clearTheme] = usePersistedState('theme', 'dark', 60);
  
  return (
    <button onClick={() => setTheme('light')}>
      Switch to Light Theme
    </button>
  );
}
```

#### Debounced State

```typescript
import { useDebouncedState } from '@/app/hooks/useOptimizedState';

function SearchComponent() {
  // immediateValue updates instantly, debouncedValue after 300ms
  const [immediateValue, debouncedValue, setValue] = useDebouncedState('', 300);
  
  // Use immediateValue for input display
  // Use debouncedValue for API calls
  useEffect(() => {
    if (debouncedValue) {
      searchAPI(debouncedValue);
    }
  }, [debouncedValue]);
  
  return <input value={immediateValue} onChange={(e) => setValue(e.target.value)} />;
}
```

#### Window Resize Hook

```typescript
import { useWindowSize } from '@/app/hooks/useOptimizedState';

function ResponsiveComponent() {
  // Debounced by 150ms to prevent excessive re-renders
  const { width, height } = useWindowSize(150);
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

#### Scroll Position Hook

```typescript
import { useScrollPosition } from '@/app/hooks/useOptimizedState';

function ScrollProgressBar() {
  const { y } = useScrollPosition(100);
  
  const scrollPercentage = (y / document.body.scrollHeight) * 100;
  
  return (
    <div className="progress-bar" style={{ width: `${scrollPercentage}%` }} />
  );
}
```

---

### 3. Loading States & Skeleton Screens

#### Using Skeleton Loaders

```typescript
import { CardSkeleton, ListSkeleton } from '@/app/components/SkeletonLoader';

function EventsPage() {
  const { data, loading } = useEvents();
  
  if (loading) {
    return <CardSkeleton count={6} />;
  }
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map(event => <EventCard key={event.id} event={event} />)}
    </div>
  );
}
```

#### Custom Skeleton

```typescript
import { Skeleton } from '@/app/components/SkeletonLoader';

function CustomSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton width="60%" height={32} animation="wave" />
      <Skeleton width="100%" height={200} variant="rectangular" />
      <Skeleton variant="circular" width={48} height={48} />
    </div>
  );
}
```

---

### 4. Error Boundaries

#### Basic Error Boundary

```typescript
import { ErrorBoundary } from '@/app/components/ErrorBoundary';

function MyApp() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

#### Custom Error Fallback

```typescript
<ErrorBoundary
  fallback={
    <div className="error-container">
      <h1>Something went wrong</h1>
      <button onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  }
  onError={(error, errorInfo) => {
    // Log to error service
    logErrorToSentry(error, errorInfo);
  }}
>
  <MyComponent />
</ErrorBoundary>
```

#### With HOC

```typescript
import { withErrorBoundary } from '@/app/components/ErrorBoundary';

const MyComponent = () => {
  // Component code
};

export default withErrorBoundary(MyComponent, {
  fallback: <CustomErrorUI />,
  onError: (error) => console.error(error)
});
```

---

### 5. Input Validation & Sanitization

#### Form Validation

```typescript
import { validateObject, ValidationSchema } from '@/lib/validation';

const schema: ValidationSchema = {
  email: { type: 'email', required: true },
  name: { type: 'string', required: true, min: 2, max: 100 },
  age: { type: 'number', min: 18, max: 120 },
  website: { type: 'url', required: false }
};

function handleSubmit(data: any) {
  const { isValid, errors, sanitized } = validateObject(data, schema);
  
  if (!isValid) {
    setErrors(errors);
    return;
  }
  
  // Use sanitized data for API call
  await api.post('/users', sanitized);
}
```

#### HTML Sanitization

```typescript
import { sanitizeHTML, escapeHTML } from '@/lib/validation';

// Remove all HTML tags
const clean = sanitizeHTML('<script>alert("xss")</script>Hello');
// Output: "Hello"

// Escape HTML for display
const safe = escapeHTML('<div>Content</div>');
// Output: "&lt;div&gt;Content&lt;/div&gt;"
```

#### Password Validation

```typescript
import { validatePasswordStrength } from '@/lib/validation';

function PasswordInput() {
  const [password, setPassword] = useState('');
  const validation = validatePasswordStrength(password);
  
  return (
    <div>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={`strength-${validation.strength}`}>
        Strength: {validation.strength}
      </div>
      {validation.feedback.map(msg => (
        <div key={msg} className="error">{msg}</div>
      ))}
    </div>
  );
}
```

---

### 6. Memoization & Performance

#### React.memo for Components

```typescript
import { memo } from 'react';

// Component only re-renders when props change
const EventCard = memo(({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  );
});

EventCard.displayName = 'EventCard';
```

#### useMemo for Expensive Computations

```typescript
import { useMemo } from 'react';

function FilteredList({ items, filter }) {
  // Only re-compute when items or filter changes
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  return (
    <div>
      {filteredItems.map(item => <Item key={item.id} item={item} />)}
    </div>
  );
}
```

#### useCallback for Stable Functions

```typescript
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Function reference stays the same across re-renders
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps = function never changes
  
  return <ChildComponent onClick={handleClick} />;
}
```

---

### 7. Performance Monitoring

#### Web Vitals Tracking

```typescript
import { usePerformanceMonitor } from '@/app/hooks/usePerformance';

function App() {
  const metrics = usePerformanceMonitor();
  
  useEffect(() => {
    if (metrics.largestContentfulPaint > 0) {
      console.log('Performance Metrics:', {
        LCP: metrics.largestContentfulPaint,
        FID: metrics.firstInputDelay,
        CLS: metrics.cumulativeLayoutShift
      });
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'web_vitals', metrics);
      }
    }
  }, [metrics]);
  
  return <YourApp />;
}
```

#### Function Performance Measurement

```typescript
import { measurePerformance } from '@/lib/performance';

// Wrap function to measure execution time
const processData = measurePerformance((data: any[]) => {
  return data.map(item => transformItem(item));
}, 'processData');

// Console output: [Performance] processData: 12.45ms
const result = processData(largeDataset);
```

---

### 8. Async Data Fetching

#### With Caching

```typescript
import { useAsyncData } from '@/app/hooks/useOptimizedState';

function EventsList() {
  const { data, loading, error, refetch } = useAsyncData(
    async () => {
      const response = await fetch('/api/events');
      return response.json();
    },
    [], // Dependencies
    5   // Cache TTL in minutes
  );
  
  if (loading) return <CardSkeleton count={6} />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {data.map(event => <EventCard key={event.id} event={event} />)}
      <button onClick={() => refetch(true)}>Refresh</button>
    </div>
  );
}
```

---

### 9. Form Management

#### Optimized Form Hook

```typescript
import { useForm } from '@/app/hooks/useOptimizedState';

function ContactForm() {
  const {
    values,
    errors,
    touched,
    submitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors
  } = useForm(
    { name: '', email: '', message: '' },
    async (values) => {
      // Submit handler
      await api.post('/contact', values);
    }
  );
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
      />
      {touched.name && errors.name && <span>{errors.name}</span>}
      
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

### 10. RTL Support

#### Using RTL-aware Layouts

```typescript
import { useLanguage } from '@/app/components/LanguageProvider';

function MyComponent() {
  const { language, isRTL, setLanguage } = useLanguage();
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
      <button onClick={() => setLanguage('ar')}>العربية</button>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('ku')}>کوردی</button>
    </div>
  );
}
```

---

## Best Practices Checklist

### Performance

- [ ] Debounce user inputs (search, filters)
- [ ] Throttle scroll/resize event handlers
- [ ] Use React.memo for expensive components
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for stable function references
- [ ] Lazy load images with `loading="lazy"`
- [ ] Implement code splitting for routes
- [ ] Use skeleton screens for loading states

### Security

- [ ] Validate all user inputs
- [ ] Sanitize HTML content
- [ ] Use prepared statements for database queries
- [ ] Implement rate limiting on API endpoints
- [ ] Escape user-generated content
- [ ] Use HTTPS in production
- [ ] Set security headers (CSP, X-Frame-Options)
- [ ] Rotate secrets regularly

### Accessibility

- [ ] Add proper ARIA labels
- [ ] Support keyboard navigation
- [ ] Provide skip links
- [ ] Ensure sufficient color contrast
- [ ] Test with screen readers
- [ ] Support RTL languages
- [ ] Add loading states with aria-busy
- [ ] Provide error messages

### Code Quality

- [ ] Write TypeScript types for all components
- [ ] Add JSDoc comments for functions
- [ ] Use meaningful variable names
- [ ] Keep components under 300 lines
- [ ] Extract reusable logic to hooks
- [ ] Test edge cases
- [ ] Handle errors gracefully
- [ ] Clean up side effects in useEffect

---

## Common Patterns

### Loading Pattern

```typescript
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  if (loading) return <Skeleton />;
  if (error) return <Error error={error} />;
  return <Content data={data} />;
}
```

### Infinite Scroll Pattern

```typescript
import { useIntersectionObserver } from '@/app/hooks/useOptimizedState';

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef(null);
  
  const entry = useIntersectionObserver(loadMoreRef, {
    threshold: 0.5
  });
  
  useEffect(() => {
    if (entry?.isIntersecting) {
      loadMore();
    }
  }, [entry]);
  
  async function loadMore() {
    const newItems = await fetchItems(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(p => p + 1);
  }
  
  return (
    <div>
      {items.map(item => <Item key={item.id} item={item} />)}
      <div ref={loadMoreRef}>Loading more...</div>
    </div>
  );
}
```

---

## Troubleshooting

### Common Issues

**Issue**: Hydration mismatch errors  
**Solution**: Use `suppressHydrationWarning` on elements that have client-only content

**Issue**: Infinite re-renders  
**Solution**: Check useEffect dependencies and ensure functions are memoized with useCallback

**Issue**: Slow page transitions  
**Solution**: Use Suspense boundaries and skeleton screens

**Issue**: Memory leaks  
**Solution**: Clean up event listeners and timers in useEffect cleanup functions

**Issue**: Layout shift on load  
**Solution**: Use skeleton screens and specify image dimensions

---

## Testing

### Unit Testing Example

```typescript
import { debounce } from '@/lib/performance';

describe('debounce', () => {
  jest.useFakeTimers();
  
  it('should delay function execution', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);
    
    debounced();
    expect(fn).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
```

---

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run start`
- [ ] Set all environment variables in production
- [ ] Enable HTTPS
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics
- [ ] Set up database backups
- [ ] Test with real users
- [ ] Monitor Web Vitals
- [ ] Set up CDN for static assets

---

## Support & Resources

- **Documentation**: See `PERFORMANCE_OPTIMIZATION_REPORT.md`
- **Examples**: Check `src/app/components/OptimizedNeonHomepage.tsx`
- **Issues**: Report bugs via GitHub Issues
- **Performance**: Monitor via Web Vitals dashboard

---

**Last Updated**: 2025-10-01  
**Version**: 2.0.0
