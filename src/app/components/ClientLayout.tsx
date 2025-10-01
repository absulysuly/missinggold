'use client';

import React, { Suspense } from 'react';
import { Session } from 'next-auth';
import { LanguageProvider } from './LanguageProvider';
import { ErrorBoundary } from './ErrorBoundary';
import { FullPageSkeleton } from './SkeletonLoader';
import SessionProviderWrapper from './SessionProviderWrapper';

/**
 * Client Layout Wrapper
 * Handles all client-side functionality including error boundaries and providers
 */
export function ClientLayout({ 
  children,
  session 
}: { 
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to error reporting service in production
        if (process.env.NODE_ENV === 'production') {
          console.error('Global error:', error, errorInfo);
          // TODO: Send to Sentry or similar service
        }
      }}
    >
      <SessionProviderWrapper session={session}>
        <LanguageProvider>
          <Suspense fallback={<FullPageSkeleton />}>
            {children}
          </Suspense>
        </LanguageProvider>
      </SessionProviderWrapper>
    </ErrorBoundary>
  );
}
