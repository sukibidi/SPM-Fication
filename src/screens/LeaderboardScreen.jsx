import { memo } from 'react';
import Leaderboard from '../components/Leaderboard';
import Footer from '../components/Footer';

function LeaderboardScreen({ entries, cadet, guest, onStartPractice }) {
  const currentUser = cadet || guest;

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col bg-transparent text-on-surface">
      <main className="flex-1 px-margin-mobile lg:px-margin-desktop py-space-lg">
        <section className="max-w-6xl mx-auto border-2 border-primary bg-surface-container-lowest hard-shadow">
          <div className="border-b-2 border-primary bg-surface-container-low px-space-md py-space-sm flex flex-col lg:flex-row lg:items-end justify-between gap-space-sm">
            <div>
              <div className="mono-label text-on-surface-variant">[LEADERBOARD // SPM_RANKINGS_2026]</div>
              <h1 className="font-headline-lg text-headline-lg text-primary font-bold uppercase tracking-tight">National Student Standings</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Real-time daily sprint standings for guests and registered students.
              </p>
            </div>
            <button
              className="px-space-lg py-space-sm bg-primary text-on-primary font-label-code text-label-code uppercase tracking-widest font-bold hover:bg-secondary transition-colors"
              type="button"
              onClick={onStartPractice}
            >
              [START PRACTICE QUIZ]
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md p-space-lg">
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-space-sm">
              <Metric label="CURRENT USER" value={currentUser?.name || 'Guest'} sub={currentUser?.school || 'Guest Session'} active />
              <Metric label="TOTAL PARTICIPANTS" value="14,820" sub="Active Form 4 & 5 students" />
              <Metric label="TOP TIER CUTOFF" value="10,850 PTS" sub="Tier 1 minimum score" />
            </div>
            <div className="lg:col-span-8">
              <Leaderboard entries={entries} userEntry={null} compact={false} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Metric({ label, value, sub, active }) {
  return (
    <div className={`border-2 border-primary p-space-md ${active ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-primary'}`}>
      <div className={`font-label-badge text-label-badge uppercase tracking-widest ${active ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>{label}</div>
      <div className="font-headline-sm text-headline-sm font-bold mt-space-xs">{value}</div>
      <div className={`font-label-code text-label-code uppercase ${active ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>{sub}</div>
    </div>
  );
}

export default memo(LeaderboardScreen);
