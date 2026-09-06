import { memo } from 'react';

function Timer({ timeLeft, totalTime }) {
  const pct = totalTime > 0 ? Math.max(0, (timeLeft / totalTime) * 100) : 0;
  const isWarning = timeLeft < 3;
  const display = `${Math.max(0, timeLeft).toFixed(1)}s REMAINING`;

  return (
    <div className="space-y-space-xs relative z-10">
      <div className="flex justify-between items-center mono-label">
        <span className="text-on-surface-variant flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
          COUNTDOWN PROTOCOL
        </span>
        <span
          className={`font-label-code text-sm font-bold tracking-widest ${isWarning ? 'text-error' : 'text-primary'}`}
          aria-live="polite"
          aria-atomic="true"
          role="timer"
        >
          {display}
        </span>
      </div>
      <div className="w-full h-3 bg-surface-container-highest overflow-hidden p-0.5 border border-primary">
        <div
          className={`h-full transition-all duration-150 ease-linear ${isWarning ? 'bg-error' : 'bg-primary'}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default memo(Timer);
