import { memo, useCallback, useEffect } from 'react';

function FeedbackModal({ feedbackState, question, streak, points, onDismiss }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDismiss();
    }
  }, [onDismiss]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!feedbackState) return null;

  const isCorrect = feedbackState === 'correct';
  const title = isCorrect ? 'JAWAPAN TEPAT // CORRECT' : feedbackState === 'timeout' ? 'MASA HABIS // TIMEOUT' : 'JAWAPAN SALAH // INCORRECT';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-margin-mobile bg-primary/70"
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Answer feedback"
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest border-2 border-primary hard-shadow p-space-lg flex flex-col text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-primary pb-space-sm mb-space-md">
          <span className="mono-label text-primary font-bold">[EXECUTION_FEEDBACK]</span>
          <span className={`mono-badge font-bold ${isCorrect ? 'bg-primary text-on-primary' : 'bg-error-container text-on-error-container border-error'}`}>
            {isCorrect ? '[PASS]' : '[FAULT]'}
          </span>
        </div>

        <div className="space-y-space-sm">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight uppercase text-primary">
            {title}
          </h2>
          {points > 0 && (
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="mono-badge bg-primary text-on-primary font-bold">+{points} PTS</span>
              {streak > 1 && <span className="mono-badge text-primary font-bold">COMBO {streak}X</span>}
            </div>
          )}
        </div>

        {question && !isCorrect && (
          <div className="w-full bg-surface-container-low border border-primary/20 p-space-md text-left my-space-md">
            <p className="mono-label text-primary font-bold mb-space-xs">[EXPLANATION]</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{question.explanation}</p>
            {question.hint && <p className="font-label-code text-label-code text-primary mt-space-xs">HINT: {question.hint}</p>}
          </div>
        )}

        <button
          onClick={onDismiss}
          className="w-full py-space-md bg-primary text-on-primary font-label-code text-label-code uppercase tracking-widest font-bold border border-primary hover:bg-secondary transition-colors"
          autoFocus
        >
          [CONTINUE]
        </button>
      </div>
    </div>
  );
}

export default memo(FeedbackModal);
