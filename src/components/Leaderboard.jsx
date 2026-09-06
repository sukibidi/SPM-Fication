import { memo } from 'react';
import { DEFAULT_LEADERBOARD } from '../data/leaderboard';

function Leaderboard({ entries, userEntry, compact }) {
  const display = entries && entries.length > 0 ? entries : DEFAULT_LEADERBOARD;

  return (
    <div className={`flex flex-col gap-space-md ${compact ? '' : 'bg-surface-container-lowest border border-primary p-space-lg'}`}>
      {!compact && (
        <div className="flex items-center justify-between border-b border-primary pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-block w-2 h-2 bg-primary" />
            <h3 className="font-label-code text-label-code text-primary font-bold uppercase tracking-widest">
              [{userEntry ? 'ROOM LEADERBOARD' : 'DAILY HONOR ROLL'}]
            </h3>
          </div>
          <span className="font-label-badge text-label-badge text-primary border border-primary px-space-xs py-space-2xs uppercase">
            LIVE SYNC
          </span>
        </div>
      )}

      <div className="flex flex-col border border-surface-dim divide-y divide-surface-dim">
        {display.slice(0, compact ? 3 : 8).map((entry, i) => {
          const isUser = userEntry && entry.id === userEntry.id;

          return (
            <div
              key={entry.id || i}
              className={`flex items-center justify-between p-space-sm transition-colors ${
                isUser ? 'bg-primary text-on-primary' : i === 0 ? 'bg-surface-container-high' : 'bg-surface-container-low hover:bg-surface-container-high'
              }`}
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <span className={`font-label-code text-label-code font-bold w-9 text-center ${isUser ? 'text-on-primary bg-surface-container-lowest' : 'text-primary bg-surface-container-lowest border border-primary'}`}>
                  #{String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className={`font-headline-sm text-headline-sm truncate ${isUser ? 'text-on-primary' : 'text-on-surface'}`}>{entry.name}</span>
                  {entry.school && <span className={`font-label-code text-label-code truncate ${isUser ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>{entry.school}</span>}
                  {isUser && <span className="font-label-badge text-label-badge text-primary-fixed-dim">Cadet Rank #{i + 1}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className={`font-label-numeric text-label-numeric font-bold ${isUser ? 'text-on-primary' : 'text-primary'}`}>
                  {entry.score.toLocaleString()} PTS
                </span>
                {entry.streak > 0 && (
                  <span className={`font-label-badge text-label-badge ${isUser ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
                    {entry.streak}D STREAK
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!compact && display.length > 8 && (
        <button className="w-full py-space-sm bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary font-label-badge text-label-badge uppercase tracking-wider border border-primary transition-colors text-center mt-space-2xs">
          [VIEW FULL REGIONAL LEADERBOARD]
        </button>
      )}
    </div>
  );
}

export default memo(Leaderboard);
