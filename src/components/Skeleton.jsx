import { memo } from 'react';

function SkeletonBlock({ className = '' }) {
  return <div className={`bg-surface-container-high animate-pulse ${className}`} />;
}

function SkeletonText({ className = '' }) {
  return <SkeletonBlock className={`h-3 rounded-none ${className}`} />;
}

function SkeletonCircle({ className = '' }) {
  return <SkeletonBlock className={`rounded-none ${className}`} />;
}

const LAYOUT_CLASSES = 'w-full border-2 border-primary bg-surface-container-lowest p-space-md';

function LandingSkeleton() {
  return (
    <div className="space-y-space-lg">
      <div className={`${LAYOUT_CLASSES}`}>
        <div className="flex flex-col gap-space-sm">
          <SkeletonText className="w-1/3" />
          <SkeletonText className="w-2/3" />
          <SkeletonText className="w-1/2" />
          <div className="flex gap-space-xs pt-space-sm">
            <SkeletonBlock className="h-10 w-32" />
            <SkeletonBlock className="h-10 w-40" />
          </div>
        </div>
      </div>
      <div className={`${LAYOUT_CLASSES}`}>
        <SkeletonText className="w-1/4 mb-space-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-space-2xs">
              <SkeletonText className="w-1/2" />
              <SkeletonBlock className="h-8 w-full" />
              <SkeletonText className="w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CadetProfileSkeleton() {
  return (
    <div className="space-y-space-lg">
      <div className={`${LAYOUT_CLASSES}`}>
        <div className="flex flex-col gap-space-sm">
          <div className="flex gap-space-xs">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonText className="w-1/3" />
          </div>
          <SkeletonText className="w-1/2" />
          <div className="flex gap-space-xs pt-space-xs">
            <SkeletonBlock className="h-9 w-36" />
            <SkeletonBlock className="h-9 w-36" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        <div className={`lg:col-span-4 ${LAYOUT_CLASSES}`}>
          <div className="space-y-space-sm">
            <SkeletonBlock className="h-32 w-full" />
            <SkeletonText className="w-1/2" />
            <SkeletonText className="w-2/3" />
            <SkeletonText className="w-1/3" />
          </div>
        </div>
        <div className={`lg:col-span-8 ${LAYOUT_CLASSES}`}>
          <div className="space-y-space-sm">
            <SkeletonBlock className="h-40 w-full" />
            <div className="grid grid-cols-3 gap-space-xs">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-space-2xs">
                  <SkeletonText className="w-1/2" />
                  <SkeletonBlock className="h-8 w-full" />
                  <SkeletonText className="w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className={`${LAYOUT_CLASSES}`}>
      <div className="space-y-space-sm">
        <SkeletonText className="w-1/3 mb-space-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-space-sm py-space-xs border-b border-surface-dim last:border-0">
            <SkeletonCircle className="w-8 h-8 shrink-0" />
            <div className="flex-1 space-y-space-2xs">
              <SkeletonText className="w-1/3" />
              <SkeletonText className="w-1/4" />
            </div>
            <SkeletonBlock className="h-6 w-16 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SubjectVaultSkeleton() {
  return (
    <div className={`${LAYOUT_CLASSES}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-space-sm border border-primary p-space-md">
            <SkeletonBlock className="h-6 w-2/3" />
            <SkeletonBlock className="h-2 w-full" />
            <SkeletonText className="w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BattleArenaSkeleton() {
  return (
    <div className={`${LAYOUT_CLASSES}`}>
      <div className="space-y-space-md">
        <SkeletonBlock className="h-16 w-full" />
        <SkeletonBlock className="h-64 w-full" />
        <div className="grid grid-cols-2 gap-space-xs">
          <SkeletonBlock className="h-24 w-full" />
          <SkeletonBlock className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}

function VictorySummarySkeleton() {
  return (
    <div className={`${LAYOUT_CLASSES}`}>
      <div className="space-y-space-md">
        <SkeletonText className="w-1/3" />
        <SkeletonBlock className="h-32 w-full" />
        <div className="grid grid-cols-3 gap-space-xs">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-space-2xs">
              <SkeletonText className="w-1/2" />
              <SkeletonBlock className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthSkeleton() {
  return (
    <div className={`${LAYOUT_CLASSES} max-w-md mx-auto`}>
      <div className="space-y-space-md">
        <SkeletonText className="w-1/2" />
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-1/2 mx-auto" />
      </div>
    </div>
  );
}

function PageSkeleton({ view, gameScreen }) {
  if (gameScreen === 'playing') return <BattleArenaSkeleton />;
  if (gameScreen === 'ended') return <VictorySummarySkeleton />;

  switch (view) {
    case 'landing':
      return <LandingSkeleton />;
    case 'cadetProfile':
      return <CadetProfileSkeleton />;
    case 'leaderboard':
      return <LeaderboardSkeleton />;
    case 'subjectVault':
      return <SubjectVaultSkeleton />;
    default:
      return <LandingSkeleton />;
  }
}

export default memo(PageSkeleton);
