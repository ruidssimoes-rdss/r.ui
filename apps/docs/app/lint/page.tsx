'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LintLayout } from '@/components/lint/LintLayout';

// ========================================
// Skeleton Loader
// ========================================

function LintPageSkeleton() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white">
      <div className="w-full mx-auto px-4 lg:px-[320px] flex flex-col">
        {/* Toolbar skeleton */}
        <div className="hidden lg:flex items-center justify-between pt-[60px] h-12">
          <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-6 w-48 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Split view skeleton */}
        <div className="lg:h-[450px] mt-0">
          <div className="hidden lg:block h-full border border-gray-200 rounded-lg p-5">
            <div className="flex h-full gap-5">
              <div className="flex-1 bg-gray-50 rounded-lg animate-pulse" />
              <div className="flex-1 bg-gray-50 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="lg:hidden h-[400px] bg-gray-50 rounded-lg animate-pulse" />
        </div>

        {/* Tabs skeleton */}
        <div className="pt-6">
          <div className="flex gap-1">
            <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Page Content
// ========================================

function LintPageContent() {
  const searchParams = useSearchParams();
  const reportParam = searchParams.get('report');

  return <LintLayout initialReport={reportParam} />;
}

// ========================================
// Main Export
// ========================================

export default function LintPage() {
  return (
    <Suspense fallback={<LintPageSkeleton />}>
      <LintPageContent />
    </Suspense>
  );
}
