import { memo, useCallback, useEffect } from 'react';
import { SUBJECT_MAP } from '../data/subjects';

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

function QuestionCard({ question, selectedKey, onSelect, disabled }) {
  const subject = question ? SUBJECT_MAP[question.subjectId] : null;

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled || selectedKey) return;
      const key = e.key.toUpperCase();
      if (OPTION_KEYS.includes(key)) {
        const idx = OPTION_KEYS.indexOf(key);
        const btn = document.querySelector(`[data-option-index="${idx}"]`);
        if (btn) btn.click();
      }
    },
    [disabled, selectedKey]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!question) return null;

  return (
    <section
      className="flex flex-col w-full bg-surface-container-lowest border border-primary p-space-md relative"
      role="region"
      aria-label={`Question ${question.subjectId}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-space-xs w-full pb-space-sm mb-space-md border-b border-surface-dim">
        <div className="flex items-center gap-space-xs font-label-code text-label-code uppercase tracking-wider text-on-surface-variant">
          <span className="text-primary font-bold">[SECTOR: {subject?.codename || 'SPM KSSM'}]</span>
          <span>/</span>
          <span>[MODE: RAPID FIRE 10S]</span>
        </div>
        <span className="font-label-badge text-label-badge text-primary bg-surface-container-low px-space-xs py-space-2xs border border-primary uppercase tracking-wider font-bold">
          [ID: #EQ-{String(question.question.length * 17).slice(0, 4)}]
        </span>
      </div>

      <div className="flex flex-col gap-space-xs mb-space-md">
        <h2 className="font-headline-md text-headline-md lg:text-2xl text-primary font-bold tracking-tight leading-snug">
          {question.question}
        </h2>
        {question.hint && (
          <p className="font-label-code text-label-code text-on-surface-variant">
            [TACTICAL HINT] {question.hint}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm w-full">
        {question.options.map((opt, idx) => {
          const isSelected = selectedKey === opt.key;
          const isCorrect = opt.key === question.correctKey;
          const showResult = !!selectedKey;

          let cardClass = 'bg-surface-container-lowest text-primary border-primary/50 hover:border-primary hover:bg-surface-container-low';
          if (showResult && isCorrect) cardClass = 'bg-primary text-on-primary border-primary';
          else if (showResult && isSelected && !isCorrect) cardClass = 'bg-error-container text-on-error-container border-error';
          else if (isSelected) cardClass = 'bg-primary text-on-primary border-primary';

          return (
            <button
              key={opt.key}
              data-option-index={idx}
              onClick={() => !disabled && !selectedKey && onSelect(opt.key)}
              disabled={disabled || !!selectedKey}
              className={`quiz-option group flex items-start gap-space-sm p-space-md ${cardClass} active:translate-x-0.5 active:translate-y-0.5 border transition-colors duration-75 text-left cursor-pointer min-h-[92px]`}
              type="button"
              aria-label={`Option ${opt.key}: ${opt.label}`}
              aria-pressed={isSelected}
            >
              <div className={`w-8 h-8 flex items-center justify-center font-label-code text-label-code font-bold shrink-0 border ${showResult && isCorrect ? 'bg-surface-container-lowest text-primary border-on-primary' : isSelected ? 'bg-surface-container-lowest text-primary border-on-primary' : 'bg-surface-container-low border-primary/40 text-primary'}`}>
                [{opt.key}]
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-space-xs">
                  <span className={`font-headline-sm text-headline-sm font-bold uppercase tracking-wide ${showResult && isCorrect ? 'text-on-primary' : isSelected ? 'text-on-primary' : 'text-primary'}`}>
                    {opt.label}
                  </span>
                  {showResult && isCorrect && <span className="font-label-badge text-[9px] bg-surface-container-lowest text-primary px-space-2xs font-bold">✓ LOCKED</span>}
                </div>
                <span className={`font-label-code text-[11px] mt-space-2xs ${showResult && isCorrect ? 'text-surface-container-highest' : isSelected ? 'text-surface-container-highest' : 'text-on-surface-variant'}`}>
                  KEY_BIND: [{opt.key}] // RESPONSE_OPTION_{idx + 1}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default memo(QuestionCard);
