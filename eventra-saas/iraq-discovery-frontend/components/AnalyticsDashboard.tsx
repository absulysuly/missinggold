import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, MousePointer, Globe, Clock, Activity, Eye, MapPin } from 'lucide-react';

interface DashboardStats {
  totalSessions: number;
  activeUsers: number;
  totalEvents: number;
  avgSessionDuration: number;
  topCategories: Array<{ id: string; name: string; clicks: number }>;
  topCities: Array<{ id: string; name: string; views: number }>;
  languageDistribution: Record<string, number>;
  deviceDistribution: Record<string, number>;
  recentEvents: Array<{
    eventName: string;
    timestamp: number;
    data: any;
  }>;
  realTimeUsers: number;
}

export const AnalyticsDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchStats = async () => {
    try {
      const apiUrl = (import.meta as any).env?.VITE_ANALYTICS_API_URL || 'http://localhost:4000/analytics';
      const response = await fetch(`${apiUrl}/dashboard`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics', error);
      // Use mock data for demo
      setStats(getMockStats());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    if (autoRefresh) {
      const interval = setInterval(fetchStats, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getMockStats = (): DashboardStats => ({
    totalSessions: 1247,
    activeUsers: 34,
    totalEvents: 8932,
    avgSessionDuration: 245000, // ms
    topCategories: [
      { id: 'hotels', name: 'Hotels', clicks: 423 },
      { id: 'restaurants', name: 'Restaurants', clicks: 387 },
      { id: 'cafes', name: 'Cafés', clicks: 312 },
      { id: 'tourism', name: 'Tourism', clicks: 256 },
      { id: 'shopping', name: 'Shopping', clicks: 189 },
    ],
    topCities: [
      { id: 'baghdad', name: 'Baghdad', views: 542 },
      { id: 'erbil', name: 'Erbil', views: 378 },
      { id: 'basra', name: 'Basra', views: 245 },
      { id: 'sulaymaniyah', name: 'Sulaymaniyah', views: 198 },
    ],
    languageDistribution: { en: 45, ar: 38, ku: 17 },
    deviceDistribution: { mobile: 58, desktop: 32, tablet: 10 },
    recentEvents: [
      { eventName: 'category_click', timestamp: Date.now() - 2000, data: { categoryId: 'hotels' } },
      { eventName: 'place_view', timestamp: Date.now() - 5000, data: { placeId: 1 } },
      { eventName: 'city_change', timestamp: Date.now() - 8000, data: { cityId: 'baghdad' } },
    ],
    realTimeUsers: 34,
  });

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const formatTimestamp = (ts: number) => {
    const now = Date.now();
    const diff = now - ts;
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="glass-brand-strong rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <Activity className="animate-spin text-pink-400" size={24} />
            <span className="text-white text-lg">Loading Analytics...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!stats) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-brand-strong rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text-brand">Analytics Dashboard</h2>
            <p className="text-white/60 text-sm">Real-time data collection & monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 rounded-lg text-xs ${autoRefresh ? 'glass-brand' : 'glass'} text-white transition-all`}
            >
              {autoRefresh ? '🔄 Live' : 'Paused'}
            </button>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-purple-400" />
              <span className="text-white/70 text-xs">Active Users</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white">{stats.realTimeUsers}</div>
            <div className="text-green-400 text-xs flex items-center gap-1 mt-1">
              <Activity size={12} /> Live
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={18} className="text-pink-400" />
              <span className="text-white/70 text-xs">Total Sessions</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white">{stats.totalSessions.toLocaleString()}</div>
            <div className="text-white/50 text-xs mt-1">All time</div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MousePointer size={18} className="text-cyan-400" />
              <span className="text-white/70 text-xs">Total Events</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white">{stats.totalEvents.toLocaleString()}</div>
            <div className="text-white/50 text-xs mt-1">Tracked</div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-gold-400" />
              <span className="text-white/70 text-xs">Avg Session</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white">{formatDuration(stats.avgSessionDuration)}</div>
            <div className="text-white/50 text-xs mt-1">Duration</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Top Categories */}
          <div className="glass rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <MousePointer size={16} className="text-pink-400" />
              Top Categories
            </h3>
            <div className="space-y-2">
              {stats.topCategories.map((cat, idx) => (
                <div key={cat.id} className="flex items-center gap-3">
                  <div className="text-white/50 text-xs w-4">{idx + 1}</div>
                  <div className="flex-1">
                    <div className="text-white text-sm mb-1">{cat.name}</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full gradient-bg-brand"
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.clicks / stats.topCategories[0].clicks) * 100}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                  <div className="text-white/70 text-sm font-medium">{cat.clicks}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Cities */}
          <div className="glass rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-cyan-400" />
              Top Cities
            </h3>
            <div className="space-y-2">
              {stats.topCities.map((city, idx) => (
                <div key={city.id} className="flex items-center gap-3">
                  <div className="text-white/50 text-xs w-4">{idx + 1}</div>
                  <div className="flex-1">
                    <div className="text-white text-sm mb-1">{city.name}</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(city.views / stats.topCities[0].views) * 100}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                  <div className="text-white/70 text-sm font-medium">{city.views}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Language Distribution */}
          <div className="glass rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Globe size={16} className="text-purple-400" />
              Language Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.languageDistribution).map(([lang, percent]) => (
                <div key={lang} className="flex items-center justify-between">
                  <span className="text-white text-sm uppercase">{lang}</span>
                  <div className="flex items-center gap-2 flex-1 ml-4">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full gradient-bg-brand"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-white/70 text-xs w-8 text-right">{percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Distribution */}
          <div className="glass rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Activity size={16} className="text-gold-400" />
              Device Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.deviceDistribution).map(([device, percent]) => (
                <div key={device} className="flex items-center justify-between">
                  <span className="text-white text-sm capitalize">{device}</span>
                  <div className="flex items-center gap-2 flex-1 ml-4">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gold-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-white/70 text-xs w-8 text-right">{percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="glass rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Eye size={16} className="text-pink-400" />
            Recent Events <span className="text-white/50 text-xs ml-2">(Live)</span>
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {stats.recentEvents.map((event, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between glass-brand p-2 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">{event.eventName}</span>
                  <span className="text-white/50 text-xs">
                    {JSON.stringify(event.data).slice(0, 50)}...
                  </span>
                </div>
                <span className="text-white/50 text-xs">{formatTimestamp(event.timestamp)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
