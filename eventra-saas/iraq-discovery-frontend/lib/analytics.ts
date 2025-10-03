// Analytics & Data Collection Pipeline
// Tracks user interactions, page views, searches, clicks, and more

export interface AnalyticsEvent {
  eventType: string;
  eventName: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  data: Record<string, any>;
  page: string;
  userAgent: string;
  locale: string;
}

export interface SessionData {
  sessionId: string;
  startTime: number;
  endTime?: number;
  userId?: string;
  events: AnalyticsEvent[];
  metadata: {
    locale: string;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    os: string;
  };
}

class AnalyticsService {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private sessionStart: number;
  private apiUrl: string;
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds
  private intervalId?: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStart = Date.now();
    this.apiUrl = (import.meta as any).env?.VITE_ANALYTICS_API_URL || 'http://localhost:4000/analytics';
    this.initSession();
    this.startAutoFlush();
    this.setupBeforeUnload();
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initSession() {
    const storedUserId = localStorage.getItem('iraqi_guide_user_id');
    if (storedUserId) this.userId = storedUserId;
    
    this.track('session', 'session_start', {
      referrer: document.referrer,
      landingPage: window.location.pathname,
    });
  }

  private startAutoFlush() {
    if (typeof window !== 'undefined') {
      this.intervalId = window.setInterval(() => {
        this.flush();
      }, this.flushInterval);
    }
  }

  private setupBeforeUnload() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.track('session', 'session_end', {
          duration: Date.now() - this.sessionStart,
        });
        this.flush(true);
      });
    }
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'unknown';
    let os = 'unknown';

    // Browser detection
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    // OS detection
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS')) os = 'iOS';

    return { browser, os };
  }

  public setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('iraqi_guide_user_id', userId);
    this.track('user', 'user_identified', { userId });
  }

  public track(eventType: string, eventName: string, data: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      eventType,
      eventName,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      data,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      locale: document.documentElement.lang || 'en',
    };

    this.events.push(event);

    // Auto-flush if batch size reached
    if (this.events.length >= this.batchSize) {
      this.flush();
    }

    // Also store in localStorage for persistence
    this.persistEvent(event);
  }

  private persistEvent(event: AnalyticsEvent) {
    try {
      const stored = localStorage.getItem('analytics_events') || '[]';
      const events = JSON.parse(stored);
      events.push(event);
      // Keep only last 100 events in localStorage
      if (events.length > 100) events.shift();
      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (e) {
      console.warn('Failed to persist analytics event', e);
    }
  }

  public async flush(synchronous = false) {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    const sessionData: SessionData = {
      sessionId: this.sessionId,
      startTime: this.sessionStart,
      endTime: Date.now(),
      userId: this.userId,
      events: eventsToSend,
      metadata: {
        locale: document.documentElement.lang || 'en',
        deviceType: this.getDeviceType(),
        ...this.getBrowserInfo(),
      },
    };

    const sendData = async () => {
      try {
        const response = await fetch(`${this.apiUrl}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sessionData),
        });

        if (response.ok) {
          console.log(`✅ Analytics: Sent ${eventsToSend.length} events`);
        } else {
          // Re-add events if failed
          this.events = [...eventsToSend, ...this.events];
          console.warn('Analytics: Failed to send events, will retry');
        }
      } catch (error) {
        // Re-add events if network error
        this.events = [...eventsToSend, ...this.events];
        console.warn('Analytics: Network error, will retry', error);
      }
    };

    if (synchronous && navigator.sendBeacon) {
      // Use sendBeacon for synchronous sends (e.g., beforeunload)
      const blob = new Blob([JSON.stringify(sessionData)], { type: 'application/json' });
      navigator.sendBeacon(`${this.apiUrl}/events`, blob);
    } else {
      await sendData();
    }
  }

  public destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.flush(true);
  }

  // Convenience methods for common events
  public trackPageView(page: string) {
    this.track('navigation', 'page_view', { page });
  }

  public trackCategoryClick(categoryId: string, categoryName: string) {
    this.track('interaction', 'category_click', { categoryId, categoryName });
  }

  public trackPlaceView(placeId: number, placeName: string) {
    this.track('interaction', 'place_view', { placeId, placeName });
  }

  public trackSearch(query: string, filters: any) {
    this.track('search', 'search_performed', { query, filters });
  }

  public trackFilterChange(filterType: string, filterValue: any) {
    this.track('interaction', 'filter_change', { filterType, filterValue });
  }

  public trackCityChange(cityId: string, cityName: string) {
    this.track('interaction', 'city_change', { cityId, cityName });
  }

  public trackLanguageChange(from: string, to: string) {
    this.track('interaction', 'language_change', { from, to });
  }

  public trackAuth(action: 'signin' | 'signup' | 'signout', method?: string) {
    this.track('auth', `auth_${action}`, { method });
  }

  public trackError(error: string, context: string) {
    this.track('error', 'error_occurred', { error, context });
  }
}

// Singleton instance
export const analytics = new AnalyticsService();

// React hook for analytics
export function useAnalytics() {
  return analytics;
}
