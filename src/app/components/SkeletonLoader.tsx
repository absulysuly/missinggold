'use client';

import React from 'react';

/**
 * Skeleton Loader Components
 * 
 * Provides smooth loading states with skeleton screens
 * for better perceived performance
 */

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Base Skeleton component
 */
export function Skeleton({
  className = '',
  width,
  height,
  variant = 'text',
  animation = 'pulse',
}: SkeletonProps) {
  const baseClass = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const variantClass = {
    text: 'rounded h-4',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  }[variant];

  const animationClass = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  }[animation];

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseClass} ${variantClass} ${animationClass} ${className}`}
      style={style}
      aria-busy="true"
      aria-live="polite"
    />
  );
}

/**
 * Card Skeleton - For event cards, venue cards
 */
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="neon-card bg-opacity-40 p-6 space-y-4"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {/* Image skeleton */}
          <Skeleton variant="rectangular" height={200} animation="wave" />
          
          {/* Title skeleton */}
          <Skeleton width="70%" animation="wave" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <Skeleton width="100%" animation="wave" />
            <Skeleton width="90%" animation="wave" />
            <Skeleton width="60%" animation="wave" />
          </div>
          
          {/* Footer skeleton */}
          <div className="flex justify-between items-center pt-4">
            <Skeleton width={100} animation="wave" />
            <Skeleton variant="rectangular" width={80} height={32} animation="wave" />
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * List Skeleton - For list items
 */
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-lg bg-white/5"
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        >
          {/* Avatar */}
          <Skeleton variant="circular" width={48} height={48} animation="wave" />
          
          {/* Content */}
          <div className="flex-1 space-y-2">
            <Skeleton width="40%" animation="wave" />
            <Skeleton width="60%" animation="wave" />
          </div>
          
          {/* Action */}
          <Skeleton variant="rectangular" width={60} height={32} animation="wave" />
        </div>
      ))}
    </div>
  );
}

/**
 * Table Skeleton - For data tables
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 p-4 bg-white/10 rounded-lg">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="flex-1">
            <Skeleton width="80%" animation="wave" />
          </div>
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 p-4 bg-white/5 rounded-lg"
          style={{
            animationDelay: `${rowIndex * 0.05}s`,
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="flex-1">
              <Skeleton width="90%" animation="wave" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Category Grid Skeleton - For category cards
 */
export function CategoryGridSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="neon-card p-6 text-center space-y-4"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {/* Icon skeleton */}
          <div className="flex justify-center">
            <Skeleton variant="circular" width={64} height={64} animation="wave" />
          </div>
          
          {/* Label skeleton */}
          <Skeleton width="80%" animation="wave" className="mx-auto" />
          
          {/* Count skeleton */}
          <Skeleton width="60%" animation="wave" className="mx-auto" />
        </div>
      ))}
    </div>
  );
}

/**
 * Profile Skeleton - For user profiles
 */
export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-6 p-6 rounded-lg bg-white/5">
        <Skeleton variant="circular" width={120} height={120} animation="wave" />
        <div className="flex-1 space-y-3">
          <Skeleton width="40%" height={32} animation="wave" />
          <Skeleton width="60%" animation="wave" />
          <div className="flex gap-4 mt-4">
            <Skeleton variant="rectangular" width={120} height={40} animation="wave" />
            <Skeleton variant="rectangular" width={120} height={40} animation="wave" />
          </div>
        </div>
      </div>
      
      {/* Content sections */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="p-6 rounded-lg bg-white/5 space-y-3">
            <Skeleton width="30%" height={24} animation="wave" />
            <Skeleton width="100%" animation="wave" />
            <Skeleton width="90%" animation="wave" />
            <Skeleton width="70%" animation="wave" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Navigation Skeleton - For navigation bars
 */
export function NavigationSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5">
      {/* Logo */}
      <Skeleton variant="rectangular" width={150} height={40} animation="wave" />
      
      {/* Menu items */}
      <div className="hidden md:flex gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} width={80} height={24} animation="wave" />
        ))}
      </div>
      
      {/* Actions */}
      <div className="flex gap-3">
        <Skeleton variant="rectangular" width={100} height={40} animation="wave" />
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
      </div>
    </div>
  );
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="relative h-96 rounded-lg overflow-hidden">
      <Skeleton variant="rectangular" height="100%" animation="wave" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
        <Skeleton width="60%" height={48} animation="wave" />
        <Skeleton width="40%" height={24} animation="wave" />
        <div className="flex gap-4">
          <Skeleton variant="rectangular" width={120} height={48} animation="wave" />
          <Skeleton variant="rectangular" width={120} height={48} animation="wave" />
        </div>
      </div>
    </div>
  );
}

/**
 * Full Page Skeleton - For initial page load
 */
export function FullPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <NavigationSkeleton />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <HeroSkeleton />
        
        <div className="space-y-6">
          <Skeleton width="30%" height={32} animation="wave" />
          <CategoryGridSkeleton count={5} />
        </div>
        
        <div className="space-y-6">
          <Skeleton width="30%" height={32} animation="wave" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton count={6} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Shimmer effect for images
 */
export function ImageSkeleton({
  width,
  height,
  className = '',
}: {
  width?: string | number;
  height?: string | number;
  className?: string;
}) {
  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      animation="wave"
      className={className}
    />
  );
}
