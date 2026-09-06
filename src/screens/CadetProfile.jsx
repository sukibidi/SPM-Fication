import { memo } from 'react';
import Footer from '../components/Footer';

function CadetProfile({ cadet, guest, onStartRun }) {
  const user = cadet || guest || { name: 'Not Set', initials: '--', school: 'KSSM Student Unit' };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col bg-transparent text-on-surface">
      <main className="flex-1 px-margin-mobile lg:px-margin-desktop py-space-lg">
        <section className="max-w-6xl mx-auto border-2 border-primary bg-surface-container-lowest hard-shadow">
          <div className="border-b-2 border-primary bg-surface-container-low px-space-md py-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-xs mono-label">
              <span className="bg-primary text-on-primary px-space-xs py-space-2xs font-bold">[CADET_DOSSIER]</span>
              <span className="text-on-surface-variant">PERSONNEL_RECORD_2026</span>
              <span className="hidden sm:inline text-outline">/</span>
              <span className="hidden sm:inline text-on-surface-variant">{user.name.toUpperCase()}</span>
            </div>
            <span className="mono-badge bg-surface-container-high text-primary font-bold">
              {cadet ? 'REGISTERED' : 'GUEST'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg p-space-lg">
            <div className="lg:col-span-4 bg-surface-container-lowest border-2 border-primary p-space-md flex flex-col justify-between relative">
              <div className="absolute top-1 left-1 font-label-badge text-[10px] text-primary/40 pointer-events-none">[+]</div>
              <div className="absolute top-1 right-1 font-label-badge text-[10px] text-primary/40 pointer-events-none">[+]</div>

              <div className="flex items-center justify-between border-b border-primary pb-space-xs mb-space-sm">
                <span className="mono-label text-primary font-bold">ID_REF: #SBP-MAL</span>
                <span className="mono-badge bg-surface-container-high text-primary">UNIT: KSSM</span>
              </div>

              <div className="flex flex-col items-center py-space-md mb-space-sm border border-surface-dim bg-surface-container-low relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-full h-px bg-primary" />
                  <div className="h-full w-px bg-primary absolute" />
                </div>
                <span className="material-symbols-outlined text-primary text-[52px] relative">person_apron</span>
                <span className="mono-label text-primary font-bold text-sm mt-space-2xs relative">CDT-{user.initials}</span>
                <span className="absolute bottom-0 inset-x-0 bg-primary text-on-primary text-[8px] font-label-badge text-center py-0.5">VERIFIED CADET</span>
              </div>

              <div className="space-y-space-2xs font-label-code text-label-code">
                <div className="flex justify-between py-space-2xs border-b border-surface-dim">
                  <span className="text-on-surface-variant">NAME:</span>
                  <span className="text-primary font-bold text-right">{user.name}</span>
                </div>
                <div className="flex justify-between py-space-2xs border-b border-surface-dim">
                  <span className="text-on-surface-variant">UNIT:</span>
                  <span className="text-primary font-bold">{user.school}</span>
                </div>
                <div className="flex justify-between py-space-2xs border-b border-surface-dim">
                  <span className="text-on-surface-variant">STATUS:</span>
                  <span className={`font-bold ${cadet ? 'text-primary' : 'text-secondary'}`}>{cadet ? 'REGISTERED // ACTIVE' : 'GUEST SESSION'}</span>
                </div>
                <div className="flex justify-between py-space-2xs">
                  <span className="text-on-surface-variant">STREAK:</span>
                  <span className="text-primary font-bold">0 DAYS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-space-md">
              <div className="bg-surface-container-lowest border-2 border-primary p-space-md relative">
                <span className="absolute top-1 left-1 font-label-badge text-[10px] text-primary/40 pointer-events-none">[+]</span>
                <span className="absolute top-1 right-1 font-label-badge text-[10px] text-primary/40 pointer-events-none">[+]</span>

                <div className="flex items-center justify-between border-b border-primary pb-space-xs mb-space-md">
                  <span className="mono-label text-primary font-bold">[METRIC // STANDINGS]</span>
                  <span className="mono-badge text-primary">REV: 2026.A</span>
                </div>

                <div className="bg-primary text-on-primary p-space-md border-2 border-primary mb-space-md">
                  <div className="flex justify-between items-start">
                    <span className="font-label-badge text-label-badge text-surface-variant uppercase tracking-wider">NATIONAL SPRINT RANK</span>
                    <span className="text-[10px] font-label-badge bg-surface-container-lowest text-primary font-bold uppercase">TOP --%</span>
                  </div>
                  <div className="my-space-sm flex items-baseline gap-2">
                    <span className="font-display-arcade text-[44px] leading-none font-bold tracking-tighter">--</span>
                    <span className="font-label-badge text-label-badge text-surface-variant">/ -- STUDENTS</span>
                  </div>
                  <div className="text-[11px] font-label-badge text-surface-variant flex items-center justify-between border-t border-surface-container-highest/30 pt-space-xs">
                    <span>SBP/MRSM DIVISION</span>
                    <span className="text-on-primary font-bold">GUEST MODE</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-space-xs text-center mb-space-md">
                  <StatTile label="TOTAL PTS" value="0" sub="+-0 today" />
                  <StatTile label="ACCURACY" value="--%" sub="no data" />
                  <StatTile label="MEDIAN LATENCY" value="--s" sub="per item" />
                </div>
              </div>

              <div className="bg-surface-container-lowest border-2 border-primary p-space-md">
                <div className="flex items-center justify-between border-b border-primary pb-space-xs mb-space-md">
                  <span className="mono-label text-primary font-bold">[DIAGNOSTIC // SUBJECT OVERVIEW]</span>
                  <span className="mono-badge text-primary">5 SUBJECTS</span>
                </div>
                <div className="space-y-space-xs">
                  {['Bahasa Melayu', 'Sejarah', 'Matematik', 'Geografi', 'Sains'].map((subject) => (
                    <div key={subject} className="flex items-center justify-between py-space-2xs border-b border-surface-dim last:border-0">
                      <span className="font-body-sm text-body-sm text-on-surface">{subject}</span>
                      <span className="font-label-code text-label-code text-on-surface-variant">--% [NO DATA]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function StatTile({ label, value, sub }) {
  return (
    <div className="border border-primary p-space-xs bg-surface">
      <div className="font-label-badge text-[10px] text-on-surface-variant uppercase">{label}</div>
      <div className="font-headline-sm text-headline-sm font-bold text-primary">{value}</div>
      <div className="font-label-badge text-[9px] text-on-surface-variant uppercase">{sub}</div>
    </div>
  );
}

export default memo(CadetProfile);