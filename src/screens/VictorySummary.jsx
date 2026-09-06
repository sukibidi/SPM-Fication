import { memo, useCallback, useState } from 'react';
import Leaderboard from '../components/Leaderboard';
import { getRank } from '../data/game';
import { validatePlayerName } from '../utils/playerName';

function VictorySummary({ score, streak, totalTime, answers, playerName, onNameChange, onSubmitScore, onRestart, leaderboard }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState('');
  const rank = getRank(score);
  const avgSpeed = answers.length > 0 ? (totalTime / answers.length).toFixed(1) : '0.0';
  const correctCount = answers.filter((answer) => answer.correct).length;
  const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  const handleSubmit = useCallback(() => {
    const validation = validatePlayerName(playerName);
    if (!validation.valid) {
      setNameError(validation.error);
      return;
    }

    setNameError('');
    onNameChange(validation.name);
    setSubmitting(true);
    setTimeout(() => {
      onSubmitScore(validation.name);
      setSubmitting(false);
      setSubmitted(true);
    }, 300);
  }, [playerName, onNameChange, onSubmitScore]);

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] px-margin-mobile lg:px-margin-desktop py-space-lg flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 border-2 border-primary bg-surface-container-lowest hard-shadow">
        <section className="lg:col-span-7 p-space-lg border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
          <VictoryBanner
            score={score}
            streak={streak}
            avgSpeed={avgSpeed}
            accuracy={accuracy}
            correctCount={correctCount}
            totalAnswers={answers.length}
            rank={rank}
          />
          <NicknameSubmission
            playerName={playerName}
            onNameChange={onNameChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitted={submitted}
            nameError={nameError}
          />
          <ActionFooter onRestart={onRestart} />
        </section>

        <aside className="lg:col-span-5 p-space-lg bg-surface-container-low">
          <div className="flex items-center justify-between border-b border-primary pb-space-xs mb-space-md">
            <span className="mono-label text-primary font-bold">[RESULT_ROSTER // ROOM #MY-SPM-902]</span>
            <span className="mono-badge text-primary">LIVE</span>
          </div>
          <Leaderboard entries={leaderboard} userEntry={submitted ? { id: 'user', name: playerName, score, streak } : null} compact={false} />
        </aside>
      </div>
    </div>
  );
}

function VictoryBanner({ score, streak, avgSpeed, accuracy, correctCount, totalAnswers, rank }) {
  return (
    <section className="bg-surface-container-lowest">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md pb-space-md border-b border-primary">
        <div>
          <div className="mono-label text-on-surface-variant mb-space-xs">[GAUNTLET COMPLETED // RESULT SUMMARY]</div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold uppercase tracking-tight">Result Menu</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
            Final run telemetry recorded. Submit a valid display name to enter the leaderboard.
          </p>
        </div>
        <span className="mono-badge bg-surface-container-low text-primary font-bold">RANK: {rank.label}</span>
      </div>

      <div className="py-space-lg">
        <div className="font-label-code text-label-code text-on-surface-variant uppercase tracking-widest">Total Score</div>
        <div className="font-display-arcade text-[56px] leading-none text-primary font-bold tracking-tighter">
          {score.toLocaleString()} <span className="font-label-code text-label-code text-on-surface-variant">PTS</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-xs">
        <StatTile label="AVG SPEED" value={`${avgSpeed}s`} sub="Per question" />
        <StatTile label="ACCURACY" value={`${accuracy}%`} sub={`${correctCount}/${totalAnswers} correct`} />
        <StatTile label="CHAIN" value={`${streak}x`} sub="Max combo" />
        <StatTile label="XP DELTA" value={`+${score}`} sub="Cadet score" />
      </div>
    </section>
  );
}

function StatTile({ label, value, sub }) {
  return (
    <div className="p-space-sm border border-surface-dim bg-surface-container-low flex flex-col">
      <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-widest">{label}</span>
      <span className="font-headline-sm text-headline-sm text-primary font-bold mt-space-2xs">{value}</span>
      <span className="font-label-code text-[10px] text-on-surface-variant uppercase">{sub}</span>
    </div>
  );
}

function NicknameSubmission({ playerName, onNameChange, onSubmit, submitting, submitted, nameError }) {
  const validation = validatePlayerName(playerName);
  const showError = !!playerName && !validation.valid;

  return (
    <section className="mt-space-lg bg-surface-container-low border border-primary p-space-md">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
        <div className="max-w-lg">
          <div className="mono-label text-primary font-bold">[LEADERBOARD ENTRY]</div>
          <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold uppercase mt-space-2xs">
            Claim Your Rank
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
            Guests and registered users can submit scores. Names are auto-capitalized and checked before submission.
          </p>
        </div>
        <span className="mono-badge text-primary">PROVISIONAL</span>
      </div>

      <div className="mt-space-md flex flex-col sm:flex-row items-stretch gap-space-sm">
        <div className="relative flex-1">
          <input
            className="w-full bg-surface-container-lowest border-2 border-primary text-primary font-label-code text-label-code px-space-md py-space-sm focus:outline-none focus:bg-surface"
            id="nickname-input"
            maxLength={24}
            placeholder="Enter name (e.g. Arif Hakim)"
            type="text"
            value={playerName}
            onChange={(event) => onNameChange(event.target.value)}
            aria-label="Player nickname"
          />
          <span className="absolute inset-y-0 right-0 pr-space-md flex items-center font-label-code text-[11px] text-outline pointer-events-none">
            {playerName.length}/24
          </span>
        </div>
        <button
          onClick={onSubmit}
          disabled={submitting || submitted || !validation.valid}
          className="px-space-lg py-space-sm bg-primary text-on-primary font-label-code text-label-code uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-space-xs whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary"
          type="button"
          aria-label="Submit score to leaderboard"
        >
          {submitting ? '[LOCKING IN...]' : submitted ? '[LOCKED]' : '[SUBMIT SCORE]'}
        </button>
      </div>

      <div className={`mt-space-sm font-label-code text-label-code ${showError || nameError ? 'text-error' : 'text-on-surface-variant'}`}>
        {nameError || (showError ? validation.error : 'Leaderboard names must use proper capitalization and clean language.')}
      </div>
    </section>
  );
}

function ActionFooter({ onRestart }) {
  return (
    <section className="mt-space-lg grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
      <button
        onClick={onRestart}
        className="order-1 sm:order-2 w-full py-space-sm px-space-md bg-primary text-on-primary font-label-code text-label-code uppercase tracking-widest font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-space-xs"
        type="button"
      >
        [PLAY AGAIN]
      </button>
      <button className="order-2 sm:order-1 w-full py-space-sm px-space-md bg-surface-container-lowest border border-primary text-primary font-label-code text-label-code uppercase tracking-widest font-bold hover:bg-primary hover:text-on-primary transition-colors" type="button">
        [REVIEW]
      </button>
      <button className="order-3 w-full py-space-sm px-space-md bg-surface-container-lowest border border-primary text-primary font-label-code text-label-code uppercase tracking-widest font-bold hover:bg-primary hover:text-on-primary transition-colors" type="button">
        [SHARE]
      </button>
    </section>
  );
}

export default memo(VictorySummary);
