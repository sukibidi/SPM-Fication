import { memo } from 'react';
import { SUBJECT_MAP } from '../data/subjects';
import Timer from './Timer';

function TelemetryBar({ question, questions, currentIndex, totalQuestions, streak, score, timeLeft, totalTime }) {
  const subject = question ? SUBJECT_MAP[question.subjectId] : null;

  return (
    <section className="flex flex-col w-full bg-surface-container-low border border-primary p-space-sm space-y-space-sm relative">
      <div className="flex items-center justify-between relative z-10 gap-space-sm">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-2xs flex-wrap">
            <span className="bg-primary text-on-primary px-space-xs py-space-2xs font-label-badge text-label-badge tracking-wider uppercase font-bold">
              [STAGE {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}]
            </span>
            <span className="text-on-surface-variant font-label-code text-label-code uppercase">
              [Q: {currentIndex + 1} / {totalQuestions}]
            </span>
          </div>
          <p className="font-label-code text-label-code text-primary font-bold tracking-wider uppercase mt-space-2xs truncate">
            [{subject?.short || 'SYS'}: {subject?.name || 'Loading'}]
            <span className="text-on-surface-variant font-medium"> // {subject?.topic || 'KSSM'}</span>
          </p>
        </div>

        <div className="flex items-center gap-space-xs bg-surface-container-lowest border border-primary px-space-sm py-space-xs shrink-0">
          <span className="w-2 h-2 bg-primary" />
          <div className="flex flex-col items-end leading-none">
            <span className="font-label-code text-label-code text-primary font-bold tracking-widest">[{streak}X STREAK]</span>
            <span className="text-on-surface-variant font-label-badge text-[9px] uppercase tracking-widest">
              +{streak > 0 ? streak * 100 : 0} PTS
            </span>
          </div>
        </div>
      </div>

      <SubjectProgress currentIndex={currentIndex} totalQuestions={totalQuestions} questions={questions} />

      <Timer timeLeft={timeLeft} totalTime={totalTime} />
    </section>
  );
}

function SubjectProgress({ currentIndex, totalQuestions, questions }) {
  return (
    <div className="grid grid-cols-5 gap-space-2xs relative z-10">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <SubjectPip key={i} index={i} currentIndex={currentIndex} question={questions?.[i]} />
      ))}
    </div>
  );
}

const SubjectPip = memo(({ index, currentIndex, question }) => {
  const label = question ? (SUBJECT_MAP[question.subjectId]?.short || `Q${index + 1}`) : `Q${index + 1}`;
  const done = index < currentIndex;
  const active = index === currentIndex;

  return (
    <div className={`flex items-center justify-center p-space-2xs border text-center ${
      active
        ? 'bg-primary text-on-primary border-primary font-bold'
        : done
        ? 'bg-surface-container-lowest border-primary text-primary'
        : 'bg-surface-container-low border-dashed border-outline text-on-surface-variant opacity-70'
    }`}>
      <span className="font-label-badge text-[9px] uppercase">
        [{label}: {done ? 'CLEARED' : active ? 'ACTIVE' : 'LOCKED'}]
      </span>
    </div>
  );
});

export default memo(TelemetryBar);
