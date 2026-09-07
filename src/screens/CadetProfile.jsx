import { memo } from 'react';
import Footer from '../components/Footer';

const MOCK_RANK = {
  position: 4,
  total: 14820,
  percentile: 'TOP 1.2% ELITE',
  division: 'SBP/MRSM APEX DIVISION',
  change: '+2 POS THIS CYCLE',
};

const MOCK_SCORE_STATS = {
  totalPts: '11,430',
  todayPts: '+850 today',
  accuracy: '84.6%',
  accuracyDev: '±1.2% dev',
  latency: '1.4s',
  latencySub: 'per item',
};

const MOCK_STREAK = {
  current: 14,
  longest: 28,
  shields: '2/3 READY',
  overclock: '42.5 HRS',
  multiplier: '2.5X MULTIPLIER',
  tier: 'TIER III CADET VELOCITY',
  runsToNext: '16 RUNS TO TIER IV',
};

const MOCK_WEEKLY = [38, 42, 50, 35, 60, 75, 82];

const MOCK_SUBJECTS = [
  { name: 'SAINS / FIZIK', pct: 91, tier: 'TIER: APEX' },
  { name: 'MATEMATIK TAMBAHAN', pct: 88, tier: 'TIER: ADV' },
  { name: 'KIMIA (KERTAS 1)', pct: 58, tier: '[BOTTLENECK: 58%]', isBottleneck: true },
];

const MOCK_CALENDAR_DAYS = [
  { day: '01', state: 'completed', qs: '30 Qs', xp: '+350XP' },
  { day: '02', state: 'completed', qs: '40 Qs', xp: '+420XP' },
  { day: '03', state: 'completed', qs: '25 Qs', xp: '+280XP' },
  { day: '04', state: 'completed', qs: '50 Qs', xp: '+550XP' },
  { day: '05', state: 'completed', qs: '35 Qs', xp: '+380XP' },
  { day: '06', state: 'completed', qs: '45 Qs', xp: '+490XP' },
  { day: '07', state: 'completed', qs: '60 Qs', xp: '+620XP' },
  { day: '08', state: 'completed', qs: '40 Qs', xp: '+410XP' },
  { day: '09', state: 'completed', qs: '55 Qs', xp: '+590XP' },
  { day: '10', state: 'completed', qs: '30 Qs', xp: '+320XP' },
  { day: '11', state: 'chain', qs: '50 Qs', xp: '1.5X' },
  { day: '12', state: 'chain', qs: '62 Qs', xp: '1.6X' },
  { day: '13', state: 'chain', qs: '45 Qs', xp: '1.8X' },
  { day: '14', state: 'chain', qs: '70 Qs', xp: '2.0X' },
  { day: '15', state: 'chain', qs: '80 Qs', xp: 'CRIT' },
  { day: '16', state: 'chain', qs: '55 Qs', xp: '2.1X' },
  { day: '17', state: 'chain', qs: '60 Qs', xp: '2.2X' },
  { day: '18', state: 'chain', qs: '48 Qs', xp: '2.3X' },
  { day: '19', state: 'chain', qs: '65 Qs', xp: '2.4X' },
  { day: '20', state: 'chain', qs: '90 Qs', xp: 'APEX' },
  { day: '21', state: 'chain', qs: '75 Qs', xp: '2.5X' },
  { day: '22', state: 'chain', qs: '60 Qs', xp: '2.5X' },
  { day: '23', state: 'chain', qs: '55 Qs', xp: '2.5X' },
  { day: '24', state: 'today', qs: '82 Qs', xp: '2.5X MAX' },
  { day: '25', state: 'pending', label: 'TOMORROW' },
  { day: '26', state: 'pending' },
  { day: '27', state: 'pending' },
  { day: '28', state: 'pending' },
  { day: '29', state: 'pending' },
  { day: '30', state: 'pending', label: 'CRIT REWARD' },
  { day: '31', state: 'pending', label: 'MONTH RECAP' },
  { day: '32', state: 'empty' },
  { day: '33', state: 'empty' },
  { day: '34', state: 'empty' },
  { day: '35', state: 'empty' },
];

const MOCK_ACHIEVEMENTS = [
  { id: 1, title: 'STRAIGHT-A SPEEDRUNNER', desc: 'Cleared 5-subject gauntlet in under 45 seconds with zero latency timeout.', serial: 'SPR-45-APEX', xp: '+1,200 XP ACCREDITED', unlocked: true },
  { id: 2, title: 'MIDNIGHT OVERCLOCK', desc: 'Completed 7 consecutive 10-second sprints post 23:00 hours in unbroken streak.', serial: 'CLK-2300-NOC', bonus: '1.5X LATE VELOCITY', unlocked: true },
  { id: 3, title: 'SBP-MRSM APEX CLUSTER', desc: 'Ranked Top 10 in National Live Arena Room #MY-SPM-902 with 94.2% precision.', serial: 'CLS-902-RANK4', bonus: 'BADGE CERTIFIED', unlocked: true },
  { id: 4, title: 'KSSM FORMULA ARCHITECT', desc: '100% precision rating across 50 consecutive Modern Math & Physics calculation stems.', serial: 'ARC-PHY-MAT', bonus: 'CRIT MODIFIER UNLOCKED', unlocked: true },
  { id: 5, title: 'ZERO FAULT TITAN', desc: '14 consecutive calendar runs with zero wrong answers registered in official sprint.', progress: '85% COMPLETE (2 DAYS LEFT)', unlocked: false },
  { id: 6, title: 'LP CHRONO-MASTER', desc: 'Execute 100 timed trials meeting strict Lembaga Peperiksaan official latency ceilings.', progress: '85/100 COMPLETED', unlocked: false },
];

const MOCK_TRIAL_LOGS = [
  { id: '#RUN-9982-A', date: '2025.10.24 // 14:12:08', subject: 'FIZIK K1 // ELEKTROMAGNETISME', pack: 'PACK: KSSM-F5-CH03 (20 STEMS)', score: '19 / 20 (95.0%)', latency: '1.18s avg', mult: '2.5X MAX', status: 'CRIT_VICTORY', statusType: 'success' },
  { id: '#RUN-9974-B', date: '2025.10.24 // 09:40:15', subject: 'MATEMATIK TAMBAHAN // CALCULUS', pack: 'PACK: KSSM-F5-CH02 (15 STEMS)', score: '14 / 15 (93.3%)', latency: '1.42s avg', mult: '2.5X MAX', status: 'PASS_OVERCLOCK', statusType: 'success' },
  { id: '#RUN-9960-C', date: '2025.10.23 // 23:18:44', subject: 'KIMIA K1 // ASID BES & GARAM', pack: 'PACK: KSSM-F4-CH06 (25 STEMS)', score: '16 / 25 (64.0%)', latency: '2.25s avg', mult: '1.8X DEGRADED', status: 'BOTTLENECK', statusType: 'error' },
  { id: '#RUN-9955-D', date: '2025.10.23 // 17:05:10', subject: 'SEJARAH // PEMBINAAN NEGARA', pack: 'PACK: KSSM-F5-CH04 (20 STEMS)', score: '18 / 20 (90.0%)', latency: '1.30s avg', mult: '2.4X', status: 'PASS_OVERCLOCK', statusType: 'success' },
  { id: '#RUN-9941-E', date: '2025.10.22 // 21:50:33', subject: 'BAHASA MELAYU // MORFOLOGI & SINTAKSIS', pack: 'PACK: KSSM-F5-TATABAHASA (30 STEMS)', score: '27 / 30 (90.0%)', latency: '1.12s avg', mult: '2.4X', status: 'PASS_OVERCLOCK', statusType: 'success' },
];

function RadarChart() {
  return (
    <svg className="w-52 h-44" fill="none" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
      <polygon fill="none" points="120,20 215,89 178,200 62,200 25,89" stroke="#c6c6ca" stroke-dasharray="2 2" strokeWidth="1" />
      <polygon fill="none" points="120,45 191,97 163,180 77,180 49,97" stroke="#c6c6ca" stroke-dasharray="2 2" strokeWidth="1" />
      <polygon fill="none" points="120,70 167,105 149,160 91,160 73,105" stroke="#c6c6ca" stroke-dasharray="2 2" strokeWidth="1" />
      <line stroke="#76777b" strokeWidth="1" x1="120" x2="120" y1="120" y2="20" />
      <line stroke="#76777b" strokeWidth="1" x1="120" x2="215" y1="120" y2="89" />
      <line stroke="#76777b" strokeWidth="1" x1="120" x2="178" y1="120" y2="200" />
      <line stroke="#76777b" strokeWidth="1" x1="120" x2="62" y1="120" y2="200" />
      <line stroke="#76777b" strokeWidth="1" x1="120" x2="25" y1="120" y2="89" />
      <polygon fill="rgba(0, 0, 0, 0.12)" points="120,38 206,92 171,190 86,166 50,97" stroke="#000000" strokeWidth="2" />
      <circle cx="120" cy="38" fill="#000000" r="3" />
      <circle cx="206" cy="92" fill="#000000" r="3" />
      <circle cx="171" cy="190" fill="#000000" r="3" />
      <circle cx="86" cy="166" fill="#ba1a1a" r="3.5" />
      <circle cx="50" cy="97" fill="#000000" r="3" />
      <text fill="#000000" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="middle" x="120" y="14">BM [82%]</text>
      <text fill="#000000" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="start" x="218" y="92">FIZIK [91%]</text>
      <text fill="#000000" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="start" x="178" y="208">MAT [88%]</text>
      <text fill="#ba1a1a" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="end" x="56" y="208">KIMIA [58%]*</text>
      <text fill="#000000" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="end" x="18" y="92">SEJ [74%]</text>
    </svg>
  );
}

function CadetProfile({ cadet, guest, onNavigate }) {
  const user = cadet || guest || { name: 'Not Set', initials: '--', school: 'KSSM Student Unit' };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col bg-transparent text-on-surface">
      <main className="flex-1">
        <div className="max-w-5xl mx-auto">
          {/* SECTION 1: TOP DOSSIER HEADER BANNER */}
          <section className="bg-surface-container-lowest border-b-2 border-primary px-margin-mobile lg:px-margin-desktop py-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 font-label-code text-label-code text-on-surface-variant border-b border-primary/20 pb-space-xs">
              <div className="flex flex-wrap items-center gap-2 text-primary font-bold">
                <span className="bg-primary text-on-primary px-1.5 py-0.5">[CADET_DOSSIER // PERSONNEL_RECORD_2025]</span>
                <span>FIG. 08 // CLASSIFIED_CADET_SPEC</span>
                <span className="text-outline-variant">/</span>
                <span>CADET: {user.name.toUpperCase()} [SBP-7749]</span>
              </div>
              <div className="flex items-center gap-3 font-bold text-primary">
                <span className="bg-surface-container-high px-2 py-0.5 border border-primary">{MOCK_RANK.percentile}</span>
                <span className="tracking-widest">[+] [+]</span>
              </div>
            </div>
            <div className="pt-space-xs flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 text-on-surface-variant font-label-code text-label-code uppercase tracking-wider mb-1">
                  <span>SEC_CLEARANCE: LEVEL_05</span>
                  <span className="text-outline-variant">|</span>
                  <span>SYSTEM_NODE: KSSM-CENTRAL-09</span>
                  <span className="text-outline-variant">|</span>
                  <span>STATUS: SYNCHRONIZED</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tight font-bold">
                  Student PROFILE //
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-3xl">
                  Official national cohort telemetry, real-time exam readiness index, cognitive latency metrics, and streak chamber log for Lembaga Peperiksaan KPM &amp; SBP/MRSM Benchmarking.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button className="tactile-btn border-2 border-primary bg-surface text-primary font-label-code text-label-code px-space-md py-space-xs font-bold hover:bg-primary hover:text-on-primary uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  <span>[EXPORT (PDF)]</span>
                </button>
                <button className="tactile-btn border-2 border-primary bg-primary text-on-primary font-label-code text-label-code px-space-md py-space-xs font-bold hover:bg-surface-container-highest hover:text-primary uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">terminal</span>
                  <span>[EDIT CALLSIGN]</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TOP GRID (3-COLUMN SPLIT) */}
        <section className="bg-surface border-b-2 border-primary py-space-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
            {/* COL 1: Personnel Identity & Badge */}
            <div className="lg:col-span-4 bg-surface-container-lowest border-2 border-primary flex flex-col justify-between p-space-md relative">
              <div className="absolute top-1 left-1 font-label-code text-[9px] text-on-surface-variant select-none pointer-events-none">[+]</div>
              <div className="absolute top-1 right-1 font-label-code text-[9px] text-on-surface-variant select-none pointer-events-none">[+]</div>
              <div className="absolute bottom-1 left-1 font-label-code text-[9px] text-on-surface-variant select-none pointer-events-none">[+]</div>
              <div className="absolute bottom-1 right-1 font-label-code text-[9px] text-on-surface-variant select-none pointer-events-none">[+]</div>

              <div>
                <div className="flex items-center justify-between border-b border-primary pb-space-xs mb-space-sm">
                  <span className="font-label-code text-label-code text-primary font-bold tracking-widest">ID_REF: #SBP-7749-MAL</span>
                  <span className="font-label-code text-label-code bg-primary text-on-primary px-1.5 py-0.5 uppercase font-semibold">UNIT: SAS</span>
                </div>
                <div className="grid grid-cols-12 gap-space-sm mb-space-md">
                  <div className="col-span-5 aspect-square border-2 border-primary bg-surface-container-high relative overflow-hidden flex flex-col items-center justify-center p-2">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                      <div className="w-full h-px bg-primary" />
                      <div className="h-full w-px bg-primary absolute" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[42px]">person_apron</span>
                      <span className="font-label-code text-[9px] text-primary mt-1 font-bold">CDT-{user.initials}</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-primary text-on-primary text-[8px] font-label-code text-center py-0.5">
                      VERIFIED CADET
                    </div>
                  </div>
                  <div className="col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="font-headline-sm text-headline-sm text-primary font-bold leading-none tracking-tight">
                        {user.name}
                      </div>
                      <div className="font-label-code text-label-code text-on-surface-variant mt-1">
                        CALLSIGN: <span className="text-primary font-bold">CDT-{user.initials}</span>
                      </div>
                      <div className="font-label-code text-label-code text-on-surface-variant mt-0.5">
                        STREAM: <span className="text-primary font-bold">STEM ALIRAN TULIN</span>
                      </div>
                    </div>
                    <div className="pt-space-sm">
                      <div className="font-label-code text-[8px] text-on-surface-variant tracking-tighter">BARCODE: 8839-2025-SPM-KSSM</div>
                      <div className="h-6 w-full flex items-stretch gap-[1.5px] bg-white p-0.5 border border-primary/40 mt-0.5">
                        {[1,0.5,2,0.5,1.5,0.5,1,3,0.5,1,2,0.5,1.5,1,0.5,2,0.5,1,3].map((w, i) => (
                          <span key={i} className={`${i === 5 || i === 9 || i === 13 ? 'bg-transparent' : 'bg-primary'}`} style={{ width: `${w * 4}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/20 pt-space-sm space-y-1.5 font-label-code text-label-code">
                <div className="flex justify-between py-0.5 border-b border-surface-container">
                  <span className="text-on-surface-variant">INSTITUTION:</span>
                  <span className="text-primary font-bold text-right">{user.school}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-surface-container">
                  <span className="text-on-surface-variant">CADET REG_ZONE:</span>
                  <span className="text-primary font-bold">SBP_ZONE // 04 (PUTRAJAYA)</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-surface-container">
                  <span className="text-on-surface-variant">KSSM LEVEL:</span>
                  <span className="text-primary font-bold">TINGKATAN 5 (SPM 2025)</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-on-surface-variant">CHAMBER ALLOCATION:</span>
                  <span className="text-primary font-bold">GAUNTLET_SECTOR_09</span>
                </div>
              </div>

              <div className="mt-space-md pt-space-sm border-t-2 border-primary flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-label-code text-label-code text-primary font-bold">
                  <span className="w-2.5 h-2.5 bg-primary inline-block animate-pulse" />
                  <span>[ACTIVE DUTY // OVERCLOCK ENABLED]</span>
                </div>
                <span className="font-label-code text-[10px] text-on-surface-variant font-semibold">PING: 24MS</span>
              </div>
            </div>

            {/* COL 2: National Standings & Score Matrix */}
            <div className="lg:col-span-4 bg-surface-container-lowest border-2 border-primary p-space-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-primary pb-space-xs mb-space-sm">
                  <span className="font-label-code text-label-code text-primary font-bold tracking-widest">[METRIC // STANDINGS]</span>
                  <span className="font-label-code text-label-code text-on-surface-variant">REV: 2025.A</span>
                </div>
                <div className="bg-primary text-on-primary p-space-md flex flex-col justify-between border-2 border-primary mb-space-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-label-code text-label-code text-surface-variant tracking-wider uppercase">NATIONAL SPRINT RANK</span>
                    <span className="text-[10px] font-label-code bg-surface-container-lowest text-primary px-1.5 py-0.5 font-bold uppercase">{MOCK_RANK.percentile}</span>
                  </div>
                  <div className="my-space-sm flex items-baseline gap-2">
                    <span className="font-display-arcade text-[44px] leading-none font-bold tracking-tighter">#{MOCK_RANK.position}</span>
                    <span className="font-label-code text-label-code text-surface-variant">/ {MOCK_RANK.total.toLocaleString()} STUDENT</span>
                  </div>
                  <div className="text-[11px] font-label-code text-surface-variant flex items-center justify-between border-t border-surface-container-highest/30 pt-space-xs">
                    <span>{MOCK_RANK.division}</span>
                    <span className="text-on-primary font-bold">{MOCK_RANK.change}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-space-xs text-center mb-space-sm">
                  <div className="border border-primary p-space-xs bg-surface">
                    <div className="font-label-code text-[10px] text-on-surface-variant">TOTAL PTS</div>
                    <div className="font-headline-sm text-headline-sm font-bold text-primary">{MOCK_SCORE_STATS.totalPts}</div>
                    <div className="font-label-code text-[9px] text-on-surface-variant">{MOCK_SCORE_STATS.todayPts}</div>
                  </div>
                  <div className="border border-primary p-space-xs bg-surface">
                    <div className="font-label-code text-[10px] text-on-surface-variant">ACCURACY</div>
                    <div className="font-headline-sm text-headline-sm font-bold text-primary">{MOCK_SCORE_STATS.accuracy}</div>
                    <div className="font-label-code text-[9px] text-on-surface-variant">{MOCK_SCORE_STATS.accuracyDev}</div>
                  </div>
                  <div className="border border-primary p-space-xs bg-surface">
                    <div className="font-label-code text-[10px] text-on-surface-variant">MEDIAN LATENCY</div>
                    <div className="font-headline-sm text-headline-sm font-bold text-primary">{MOCK_SCORE_STATS.latency}</div>
                    <div className="font-label-code text-[9px] text-on-surface-variant">{MOCK_SCORE_STATS.latencySub}</div>
                  </div>
                </div>
                <div className="border border-primary p-space-sm bg-surface-container-low mb-space-sm">
                  <div className="flex items-center justify-between font-label-code text-label-code text-primary font-bold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
                      UNBROKEN STREAK: {MOCK_STREAK.current} DAYS RUNNING
                    </span>
                    <span className="bg-primary text-on-primary px-1.5 py-0.5">{MOCK_STREAK.multiplier}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 mt-space-xs border border-primary overflow-hidden">
                    <div className="bg-primary h-full w-[80%]" />
                  </div>
                  <div className="flex justify-between font-label-code text-[9px] text-on-surface-variant mt-1">
                    <span>{MOCK_STREAK.tier}</span>
                    <span>{MOCK_STREAK.runsToNext}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-primary/20 pt-space-sm">
                <div className="flex items-center justify-between font-label-code text-[10px] text-on-surface-variant mb-1.5">
                  <span>WEEKLY CADENCE (MON-SUN)</span>
                  <span className="font-bold text-primary">100% DISCIPLINE</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center font-label-code text-[10px]">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={d} className="flex flex-col items-center">
                      <div className="h-10 w-full bg-primary flex items-end justify-center text-on-primary text-[8px] pb-0.5">{MOCK_WEEKLY[i]}</div>
                      <span className="mt-1 text-on-surface-variant">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COL 3: Cognitive Radar & Exam Readiness */}
            <div className="lg:col-span-4 bg-surface-container-lowest border-2 border-primary p-space-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-primary pb-space-xs mb-space-sm">
                  <span className="font-label-code text-label-code text-primary font-bold tracking-widest">[DIAGNOSTIC // READINESS RADAR]</span>
                  <span className="font-label-code text-label-code bg-surface-container-high px-1.5 py-0.5 border border-primary">5 SUBJECT MATRIX</span>
                </div>
                <div className="w-full flex items-center justify-center p-space-sm bg-surface border border-primary/20 relative">
                  <div className="absolute top-1 left-1 font-label-code text-[8px] text-on-surface-variant">FIG 8.1: POLYGON MATRIX</div>
                  <RadarChart />
                </div>
                <div className="space-y-space-xs mt-space-sm font-label-code text-[11px]">
                  {MOCK_SUBJECTS.map((subject) => (
                    <div key={subject.name}>
                      <div className="flex items-center justify-between">
                        <span className={subject.isBottleneck ? 'text-on-surface font-bold text-error' : 'text-on-surface'}>{subject.name}</span>
                        <span className={subject.isBottleneck ? 'font-bold text-error bg-error-container text-on-error-container px-1' : 'font-bold text-primary'}>{subject.tier}</span>
                      </div>
                      <div className={`w-full bg-surface-container-highest h-1.5 border ${subject.isBottleneck ? 'border-error' : 'border-primary/40'}`}>
                        <div className={subject.isBottleneck ? 'bg-error h-full' : 'bg-primary h-full'} style={{ width: `${subject.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-2 border-primary bg-surface p-space-sm mt-space-sm">
                  <div className="flex items-center gap-1 text-primary font-bold font-label-code text-[10px] uppercase">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    <span>TACTICAL DIAGNOSTIC NOTE:</span>
                  </div>
                  <p className="font-label-code text-[10px] text-on-surface-variant leading-tight mt-1">
                    Volatile zone detected in Kimia K1 (Acid-Base / Redox Equilibrium). Algorithm recommends an immediate 10-question sprint.
                  </p>
                </div>
              </div>
              <button className="tactile-btn mt-space-sm w-full border-2 border-primary bg-primary text-on-primary font-label-code text-label-code py-space-sm font-bold uppercase tracking-wider hover:bg-surface hover:text-primary flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>[LAUNCH REMEDIATION SPRINT]</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: STREAK CALENDAR & CALIBRATION CHAMBER */}
        <section className="bg-surface-container-lowest border-b-2 border-primary py-space-lg">
          <div className="flex flex-col gap-space-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm border-b-2 border-primary pb-space-sm">
              <div>
                <div className="flex items-center gap-2 font-label-code text-label-code text-on-surface-variant uppercase font-semibold">
                  <span>CHAMBER_09 // 30-DAY STREAK CALIBRATION LOG</span>
                  <span className="text-outline-variant">|</span>
                  <span>GAUNTLET: UNCOMPROMISED</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-primary uppercase tracking-tight">
                  ACTIVE STREAK MATRIX: {MOCK_STREAK.current} DAYS CONTINUOUS
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="border border-primary px-space-sm py-1 bg-surface font-label-code text-label-code flex items-center gap-1.5">
                  <span className="text-on-surface-variant">CURRENT STREAK:</span>
                  <span className="font-bold text-primary">{MOCK_STREAK.current} DAYS</span>
                </div>
                <div className="border border-primary px-space-sm py-1 bg-surface font-label-code text-label-code flex items-center gap-1.5">
                  <span className="text-on-surface-variant">LONGEST RUN:</span>
                  <span className="font-bold text-primary">{MOCK_STREAK.longest} DAYS</span>
                </div>
                <div className="border border-primary px-space-sm py-1 bg-surface font-label-code text-label-code flex items-center gap-1.5">
                  <span className="text-on-surface-variant">FREEZE SHIELDS:</span>
                  <span className="font-bold text-primary">{MOCK_STREAK.shields}</span>
                </div>
                <div className="border border-primary px-space-sm py-1 bg-surface font-label-code text-label-code flex items-center gap-1.5">
                  <span className="text-on-surface-variant">OVERCLOCK:</span>
                  <span className="font-bold text-primary">{MOCK_STREAK.overclock}</span>
                </div>
              </div>
            </div>
            <div className="border-2 border-primary bg-surface p-space-sm md:p-space-md">
              <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 font-label-code text-label-code text-center text-on-surface-variant font-bold border-b border-primary/20 pb-2">
                <div>MON // ISN</div>
                <div>TUE // SEL</div>
                <div>WED // RAB</div>
                <div>THU // KHA</div>
                <div>FRI // JUM</div>
                <div>SAT // SAB</div>
                <div>SUN // AHAD</div>
              </div>
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {MOCK_CALENDAR_DAYS.map((d) => {
                  if (d.state === 'empty') return <div key={d.day} className="h-16 md:h-20" />;
                  return (
                    <div
                      key={d.day}
                      className={`border p-1.5 md:p-2 flex flex-col justify-between h-16 md:h-20 ${
                        d.state === 'completed'
                          ? 'border-outline-variant bg-surface-container-low'
                          : d.state === 'chain'
                          ? 'border-2 border-primary bg-primary text-on-primary'
                          : d.state === 'today'
                          ? 'border-2 border-primary bg-primary text-on-primary relative ring-2 ring-primary ring-offset-2'
                          : 'border-outline-variant border-dashed bg-surface-container-lowest'
                      }`}
                    >
                      <div className="flex justify-between font-label-code text-[10px]">
                        <span className={d.state === 'chain' || d.state === 'today' ? 'font-bold' : 'text-on-surface-variant'}>{d.day}</span>
                        <span className={d.state === 'chain' || d.state === 'today' ? 'text-on-primary font-bold' : 'text-primary font-bold'}>
                          {d.state === 'completed' ? '✓' : d.state === 'chain' ? '★' : d.state === 'today' ? <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span> : '--'}
                        </span>
                      </div>
                      <div className={`font-label-code text-[8px] ${d.state === 'chain' || d.state === 'today' ? 'opacity-90 text-surface-bright' : 'text-on-surface-variant'}`}>
                        {d.label || `${d.qs} // ${d.xp}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-space-sm">
              <div className="font-label-code text-label-code text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                <span>SHIELD INVENTORY: 2 CRYOGENIC SLOTS INTACT (NEXT FREEZE REFILL: 5 DAYS)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="tactile-btn border-2 border-primary bg-surface text-primary font-label-code text-label-code px-space-md py-space-xs font-bold hover:bg-primary hover:text-on-primary uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">shield</span>
                  <span>[EQUIP STREAK SHIELD]</span>
                </button>
                <button className="tactile-btn border-2 border-primary bg-primary text-on-primary font-label-code text-label-code px-space-md py-space-xs font-bold hover:bg-surface-container-highest hover:text-primary uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">redeem</span>
                  <span>[CLAIM WEEKLY CRIT XP REWARD]</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ARMORY & ACHIEVEMENTS */}
        <section className="bg-surface border-b-2 border-primary py-space-lg">
          <div className="flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-primary pb-space-sm">
              <div>
                <div className="font-label-code text-label-code text-on-surface-variant tracking-wider uppercase font-semibold">
                  [ARMORY_VAULT // RECOGNITION_HARDWARE]
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-primary uppercase tracking-tight">
                  Achievement //
                </h2>
              </div>
              <div className="font-label-code text-label-code font-bold text-primary bg-surface-container-high px-space-sm py-1 border border-primary">
                ACHIEVEMENT UNLOCK RATIO: 4 / 6 COMPLETED
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {MOCK_ACHIEVEMENTS.map((badge) => (
                <div
                  key={badge.id}
                  className={`border-2 p-space-md flex flex-col justify-between relative ${
                    badge.unlocked ? 'border-primary bg-surface-container-lowest' : 'border-primary/40 bg-surface-container-low opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 border-2 flex items-center justify-center font-bold font-label-code ${
                      badge.unlocked ? 'border-primary bg-primary text-on-primary' : 'border-primary/40 bg-surface text-on-surface-variant'
                    }`}>
                      {String(badge.id).padStart(2, '0')}
                    </div>
                    <span className={`font-label-code text-[10px] font-bold px-2 py-0.5 uppercase ${
                      badge.unlocked ? 'bg-primary text-on-primary' : 'border border-primary text-primary bg-surface'
                    }`}>
                      {badge.unlocked ? '[UNLOCKED]' : `[LOCKED: ${badge.progress || '85/100 RUNS'}]`}
                    </span>
                  </div>
                  <div className="my-space-sm">
                    <div className="font-headline-sm text-[18px] font-bold text-primary uppercase">{badge.title}</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{badge.desc}</p>
                  </div>
                  <div className="pt-space-sm border-t border-primary/20 flex items-center justify-between font-label-code text-[10px]">
                    <span className="text-on-surface-variant">SERIAL: {badge.serial}</span>
                    <span className="text-primary font-bold">{badge.xp || badge.bonus}</span>
                  </div>
                  {!badge.unlocked && (
                    <div className="pt-space-sm">
                      <div className="flex justify-between font-label-code text-[10px] mb-1">
                        <span className="text-on-surface-variant">PROGRESSION</span>
                        <span className="text-primary font-bold">{badge.progress}</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 border border-primary/40">
                        <div className="bg-primary h-full w-[85%]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: COMBAT HISTORY & RECENT TRIAL LOGS */}
        <section className="bg-surface-container-lowest border-b-2 border-primary py-space-lg">
          <div className="flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-primary pb-space-sm">
              <div>
                <div className="font-label-code text-label-code text-on-surface-variant tracking-wider uppercase font-semibold">
                  [AUDIT_TRAIL // RECENT_GAUNTLET_EXECUTION]
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-primary uppercase tracking-tight">
                  TRIAL DISPATCH LOGS
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-code text-label-code text-on-surface-variant">SHOWING: LAST 5 RUNS</span>
                <button className="tactile-btn border border-primary p-1 bg-surface hover:bg-primary hover:text-on-primary">
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                </button>
              </div>
            </div>
            <div className="w-full border-2 border-primary overflow-x-auto">
              <table className="w-full text-left border-collapse font-label-code text-label-code">
                <thead>
                  <tr className="bg-primary text-on-primary uppercase border-b-2 border-primary">
                    <th className="py-2.5 px-space-xs font-semibold tracking-wider">RUN_ID / DATE</th>
                    <th className="py-2.5 px-space-xs font-semibold tracking-wider">SUBJECT PACK</th>
                    <th className="py-2.5 px-space-xs font-semibold tracking-wider text-center">SCORE</th>
                    <th className="py-2.5 px-space-xs font-semibold tracking-wider text-center">LATENCY</th>
                    <th className="py-2.5 px-space-xs font-semibold tracking-wider text-center">FLOW MULT</th>
                    <th className="py-2.5 px-space-xs font-semibold tracking-wider text-center">STATUS</th>
                    <th className="py-2.5 px-space-xs font-semibold tracking-wider text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/20 bg-surface">
                  {MOCK_TRIAL_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-container-highest/60 transition-none">
                      <td className="py-space-sm px-space-xs font-bold text-primary">
                        <div>{log.id}</div>
                        <div className="text-[9px] text-on-surface-variant font-normal">{log.date}</div>
                      </td>
                      <td className="py-space-sm px-space-xs">
                        <div className="font-bold text-primary">{log.subject}</div>
                        <div className="text-[9px] text-on-surface-variant">{log.pack}</div>
                      </td>
                      <td className={`py-space-sm px-space-xs text-center font-bold text-[12px] ${log.statusType === 'error' ? 'text-error' : 'text-primary'}`}>
                        {log.score}
                      </td>
                      <td className="py-space-sm px-space-xs text-center text-primary">{log.latency}</td>
                      <td className="py-space-sm px-space-xs text-center">
                        <span className="bg-surface-container-high px-1.5 py-0.5 border border-primary font-bold">{log.mult}</span>
                      </td>
                      <td className="py-space-sm px-space-xs text-center">
                        <span className={`px-2 py-0.5 font-bold uppercase text-[9px] ${
                          log.statusType === 'success'
                            ? 'bg-primary text-on-primary'
                            : log.statusType === 'error'
                            ? 'border border-error text-error bg-surface'
                            : 'bg-surface-container-high text-primary border border-primary'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="py-space-sm px-space-xs text-right">
                        <button className={`tactile-btn border px-space-xs py-1 text-[10px] font-bold uppercase hover:bg-primary hover:text-on-primary ${
                          log.statusType === 'error' ? 'border-error bg-surface text-error' : 'border-primary bg-surface'
                        }`}>
                          [VIEW DEBRIEF]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 font-label-code text-label-code text-on-surface-variant">
              <span>SHOWING 5 OF 128 RECORDED SPRINT ENGAGEMENTS</span>
              <button className="tactile-btn underline text-primary font-bold uppercase tracking-wider hover:opacity-75">
                [EXPAND COMPLETE TELEMETRY LOGS (JSON / CSV)]
              </button>
            </div>
          </div>
        </section>

        {/* TECHNICAL FOOTER STATUS */}
        <section className="bg-surface-container-lowest border-t-2 border-primary py-space-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-primary/20 pb-space-sm">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-on-primary px-1.5 py-0.5 font-bold">[CADET ID: HARITH-7749]</span>
              <span className="text-on-surface-variant">|</span>
              <span className="text-primary font-bold flex items-center gap-1">
                <span className="w-2 h-2 bg-primary inline-block" />
                SYNC_STATUS: REALTIME_CONNECTED
              </span>
            </div>
            <div className="font-bold text-primary tracking-wider uppercase text-center">
              CAMPUR ARCHITECTURAL KSSM ENGINE [READY]
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span>SECURITY PROTOCOL: KPM-LP-2025</span>
              <span className="text-primary font-bold">[+] [+]</span>
            </div>
          </div>
          <div className="pt-space-sm flex flex-wrap items-center justify-between gap-2 text-on-surface-variant text-[10px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-primary font-bold">[SYS.STATUS: ONLINE // RIGID_OPERATIONAL]</span>
              <span>|</span>
              <span>[SECTOR: SPM-MALAYSIA-KSSM]</span>
              <span>|</span>
              <span>BUILD: 2025.10.ALPHA</span>
            </div>
            <div className="text-primary font-bold">
              &copy; 2025 CAMPUR EDUCATION SYSTEMS. UNCOMPROMISED ARCHITECTURAL SPEC.
            </div>
            <div className="flex items-center gap-3">
              <span>SCALE: RIGID_01</span>
              <span className="text-primary font-bold tracking-widest">[+] [+]</span>
            </div>
          </div>
        </section>
          </div>
       </main>
      <Footer />
    </div>
  );
}

export default memo(CadetProfile);
