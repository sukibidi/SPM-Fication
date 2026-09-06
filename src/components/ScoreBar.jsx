import { memo } from 'react';

function ScoreBar({ score, streak, maxCombo, lastPoints }) {
  return (
    <section className="flex flex-col w-full bg-surface-container-low border border-primary p-space-sm space-y-space-xs">
      <div className="flex items-center justify-between gap-space-sm">
        <div className="flex flex-col leading-tight">
          <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-widest">LIVE SCORE</span>
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tight">
            {score.toLocaleString()} <span className="font-label-code text-label-code text-on-surface-variant">PTS</span>
          </span>
          {lastPoints > 0 && (
            <span className="font-label-badge text-label-badge text-primary font-bold">[+{lastPoints} DELTA]</span>
          )}
        </div>
        <div className="flex flex-col items-end leading-tight">
          <span className="font-label-badge text-label-badge text-primary font-bold uppercase">COMBO GAUGE</span>
          <span className="font-label-code text-label-code text-primary font-bold tracking-widest">
            [{Array.from({ length: maxCombo }, (_, i) => (i < streak ? '■' : '□')).join('')}] {streak}/{maxCombo}
          </span>
        </div>
      </div>
    </section>
  );
}

export default memo(ScoreBar);
