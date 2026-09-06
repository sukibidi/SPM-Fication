import { memo, useCallback, useEffect, useRef, useState } from 'react';
import TelemetryBar from '../components/TelemetryBar';
import QuestionCard from '../components/QuestionCard';
import ScoreBar from '../components/ScoreBar';
import Powerups from '../components/Powerups';
import FeedbackModal from '../components/FeedbackModal';
import useTimer from '../hooks/useTimer';
import { TIMER_DURATION, BONUS_TIME_PER_CORRECT, QUESTIONS_PER_RUN } from '../data/game';

function BattleArena({
  questions,
  currentIndex,
  score,
  streak,
  maxStreak,
  totalTime,
  shields,
  selectedKey,
  feedbackState,
  onSelectAnswer,
  onTimeout,
  onDismissFeedback,
  audio,
}) {
  const [lastPoints, setLastPoints] = useState(0);
  const supervisingRef = useRef(false);

  const handleTimerExpire = useCallback(() => {
    if (!supervisingRef.current) {
      supervisingRef.current = true;
      onTimeout();
    }
  }, [onTimeout]);

  const handleTick = useCallback((left) => {
    if (left < 3 && left > 2.8) audio.playTick();
  }, [audio]);

  const timer = useTimer({
    duration: TIMER_DURATION,
    onExpire: handleTimerExpire,
    onTick: handleTick,
  });

  useEffect(() => {
    supervisingRef.current = false;
    timer.start();
    return () => timer.stop();
  }, [currentIndex]);

  useEffect(() => {
    if (feedbackState) timer.stop();
  }, [feedbackState, timer]);

  const handleSelect = useCallback(
    (key) => {
      if (selectedKey) return;
      timer.stop();
      const pts = key === questions[currentIndex]?.correctKey
        ? Math.round(100 * Math.max(1, streak) * (1 + (timer.timeLeft / TIMER_DURATION) * 0.5))
        : 0;
      setLastPoints(pts);
      onSelectAnswer(key, timer.timeLeft);
      if (key === questions[currentIndex]?.correctKey) {
        audio.playArcadeSound('correct');
        if (timer.timeLeft > 1) timer.addTime(BONUS_TIME_PER_CORRECT);
      } else {
        audio.playArcadeSound('incorrect');
      }
    },
    [selectedKey, questions, currentIndex, streak, timer, onSelectAnswer, audio]
  );

  const handleDismiss = useCallback(() => {
    onDismissFeedback();
  }, [onDismissFeedback]);

  const handleShield = useCallback(() => {}, []);

  const handleFreeze = useCallback(() => {
    timer.addTime(5);
  }, [timer]);

  const handleSkip = useCallback(() => {
    timer.stop();
    onTimeout();
  }, [timer, onTimeout]);

  const question = questions[currentIndex];
  if (!question) return null;

  return (
    <div className="flex flex-col w-full pb-8 select-none relative">
      <div className="w-full px-margin-mobile lg:px-margin-desktop py-space-md">
        <div className="w-full bg-surface-container-lowest border border-primary px-space-sm py-space-xs mb-space-md flex flex-wrap items-center justify-between gap-space-xs mono-label text-on-surface-variant">
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 bg-primary" />
            <span className="text-primary font-bold">SYS.KERNEL // MONO_CORE_V4.2</span>
            <span>/ ZONE: SPM_SPEEDRUN_CENTRAL</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span>NET_ENC: AES_256</span>
            <span className="bg-primary text-on-primary px-space-xs py-space-2xs font-bold">ROOM #MY-SPM-902</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
          <div className="hidden xl:flex xl:col-span-3 flex-col gap-space-md">
            <CadetSpecRail streak={streak} />
          </div>

          <div className="xl:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-[760px] flex flex-col gap-space-sm bg-surface-container-lowest border-2 border-primary p-space-sm md:p-space-md relative hard-shadow">
              <div className="absolute top-1 left-1 font-label-badge text-[10px] text-primary/40 pointer-events-none">[+]</div>
              <div className="absolute top-1 right-1 font-label-badge text-[10px] text-primary/40 pointer-events-none">[+]</div>
              <TelemetryBar
                question={question}
                questions={questions}
                currentIndex={currentIndex}
                totalQuestions={QUESTIONS_PER_RUN}
                streak={streak}
                score={score}
                timeLeft={timer.timeLeft}
                totalTime={TIMER_DURATION}
              />

              <QuestionCard
                question={question}
                selectedKey={selectedKey}
                onSelect={handleSelect}
                disabled={!!feedbackState}
              />

              <ScoreBar
                score={score}
                streak={streak}
                maxCombo={QUESTIONS_PER_RUN}
                lastPoints={lastPoints}
              />

              <div className="w-full bg-surface-container-low border border-primary p-space-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between flex-wrap gap-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <Powerups
                      shields={shields}
                      freezes={1}
                      onShield={handleShield}
                      onFreeze={handleFreeze}
                      onSkip={handleSkip}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs border-t border-primary/20 text-on-surface-variant flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-label-code text-label-code text-primary font-bold">KEYBOARD //</span>
                    <span className="font-label-code text-label-code">Press [A] [B] [C] [D] to answer</span>
                  </div>
                  <span className="font-label-code text-label-code text-primary font-bold">MALAYSIA SPM SPRINT PROTOCOL ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-3 w-full hidden xl:flex flex-col gap-space-md">
            <LiveRoomSidebar currentIndex={currentIndex} score={score} streak={streak} totalTime={totalTime} />
          </div>
        </div>
      </div>

      <FeedbackModal
        feedbackState={feedbackState}
        question={question}
        streak={streak}
        points={lastPoints}
        onDismiss={handleDismiss}
      />
    </div>
  );
}

function CadetSpecRail({ streak }) {
  return (
    <>
      <div className="bg-surface-container-lowest border border-primary p-space-md relative">
        <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-surface-dim">
          <span className="mono-label text-primary font-bold">[UNIT_ID: CDT-HARITH]</span>
          <span className="mono-badge text-primary">KSSM_T5</span>
        </div>
        <div className="flex items-center gap-space-sm mb-space-md">
          <div className="relative w-12 h-12 border border-primary bg-surface-container-low flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[24px]">terminal</span>
            <span className="absolute -bottom-1 -right-1 px-1 bg-primary text-on-primary font-label-badge text-[8px] font-bold">T5</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="font-headline-sm text-sm text-primary uppercase font-bold truncate">HARITH AL-AMIN</div>
            <div className="font-label-code text-[10px] text-secondary">SBP INTER-VARSITY BRIGADE</div>
            <div className="font-label-code text-[10px] text-primary font-bold mt-0.5">STREAK: {streak} RUNNING</div>
          </div>
        </div>
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between font-label-code text-[10px] uppercase">
            <span className="text-secondary">STAMINA / COMBO CHARGE</span>
            <span className="text-primary font-bold">{Math.min(100, streak * 20)}% BOOST</span>
          </div>
          <div className="grid grid-cols-10 gap-0.5 w-full bg-surface-container-low p-1 border border-primary/20">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className={`h-2 ${index < streak * 2 ? 'bg-primary' : 'bg-surface-container-highest'}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-primary/20 p-space-md flex flex-col gap-space-xs">
        <div className="flex items-center justify-between font-label-badge text-[9px] text-secondary">
          <span>SPEC_DECAL // MOD-99</span>
          <span>KPM_MY</span>
        </div>
        <div className="h-8 w-full flex items-stretch gap-[2px] bg-white p-0.5 border border-primary/40">
          {[3, 1, 5, 2, 4, 1, 6, 2, 3, 5, 1, 4, 2, 6, 3, 1, 5].map((width, index) => (
            <span key={index} className="bg-primary" style={{ width }} />
          ))}
        </div>
        <div className="flex justify-between font-label-badge text-[9px] text-secondary">
          <span>BAR: 8839-2026-SPM</span>
          <span>AUTHENTICATED</span>
        </div>
      </div>
    </>
  );
}

function LiveRoomSidebar({ currentIndex, score, streak, totalTime }) {
  return (
    <>
      <div className="w-full bg-surface-container-lowest border border-primary p-space-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between border-b border-surface-dim pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <div className="w-2 h-2 bg-primary" />
            <span className="font-label-code text-label-code text-primary font-bold tracking-widest uppercase">LIVE COHORT // MY-SPM-902</span>
          </div>
          <span className="font-label-code text-label-code px-space-xs py-0.5 border border-primary text-primary font-bold">
            8 CADETS
          </span>
        </div>
        <div className="flex flex-col gap-space-xs">
          <LiveCadetRow rank={1} initials="DR" name="Danial Rayyan" school="Kolej Yayasan Saad" score={4950} streak={14} gold />
          <LiveCadetRow rank={2} initials="NM" name="Nur Maisarah" school="SMK Seri Bintang" score={4720} streak={9} />
          <LiveCadetRow rank={3} initials="JT" name="Justin Tan" school="SMJK Chong Hwa" score={4580} streak={7} />
          <LiveCadetRow rank={4} initials="SA" name="Siti Aminah" school="SBP Integrasi" score={4120} streak={5} />
          <LiveYouRow rank={6} score={score} streak={streak} />
        </div>
        <div className="w-full bg-surface-container-low border border-primary/20 p-space-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-label-code text-label-code text-primary font-bold">GAP //</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Pintas ranking seterusnya:</span>
          </div>
          <span className="font-label-numeric text-label-numeric text-primary">+1,670 pts</span>
        </div>
      </div>

      <div className="w-full bg-surface-container-lowest border border-primary/20 p-space-md flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-badge text-label-badge uppercase text-on-surface-variant">Live Match Telemetry</span>
          <span className="font-label-code text-label-code text-primary">PING: 18ms</span>
        </div>
        <div className="grid grid-cols-2 gap-space-xs pt-1">
          <div className="p-space-xs border border-surface-dim bg-surface-container-low flex flex-col">
            <span className="font-label-badge text-label-badge text-outline uppercase">Accuracy</span>
            <span className="font-headline-sm text-headline-sm text-primary">
              {currentIndex > 0 ? `${Math.round(((score / (currentIndex * 100)) * 100)) || 0}%` : '0%'}
            </span>
          </div>
          <div className="p-space-xs border border-surface-dim bg-surface-container-low flex flex-col">
            <span className="font-label-badge text-label-badge text-outline uppercase">Avg. Speed</span>
            <span className="font-headline-sm text-headline-sm text-primary">
              {currentIndex > 0 ? `${(totalTime / Math.max(1, currentIndex)).toFixed(1)}s` : '0.0s'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function LiveCadetRow({ rank, initials, name, school, score, streak, gold }) {
  const rankBg = gold ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-primary border border-primary';
  const rowBg = gold ? 'bg-surface-container-low border border-primary' : 'bg-surface-container-low border border-primary/15';
  return (
    <div className={`p-space-sm ${rowBg} flex items-center justify-between gap-space-sm transition-colors hover:bg-surface-container-high`}>
      <div className="flex items-center gap-space-sm min-w-0">
        <div className={`w-7 h-7 ${rankBg} flex items-center justify-center font-label-numeric text-label-numeric shrink-0`}>
          {rank}
        </div>
        <div className="w-9 h-9 border border-primary bg-surface-container-high flex items-center justify-center shrink-0 text-primary font-headline-sm font-bold text-sm">
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-headline-sm text-headline-sm text-on-surface truncate">{name}</span>
          <span className="font-label-code text-label-code text-on-surface-variant">{school}</span>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="font-label-numeric text-label-numeric text-primary">{score.toLocaleString()} pts</span>
        <span className="font-label-badge text-label-badge text-primary flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[12px]">local_fire_department</span> {streak} STREAK
        </span>
      </div>
    </div>
  );
}

function LiveYouRow({ rank, score, streak }) {
  return (
    <div className="p-space-sm bg-primary text-on-primary flex items-center justify-between gap-space-sm relative overflow-hidden border border-primary">
      <div className="flex items-center gap-space-sm min-w-0 pl-1">
        <div className="w-7 h-7 bg-surface-container-lowest text-primary flex items-center justify-center font-label-numeric text-label-numeric font-bold shrink-0">
          {rank}
        </div>
        <div className="w-9 h-9 border border-on-primary bg-primary flex items-center justify-center text-on-primary font-bold shrink-0">
          <span className="material-symbols-outlined text-[20px]">person</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm text-on-primary font-bold truncate">YOU</span>
            <span className="font-label-badge text-label-badge px-1 bg-surface-container-lowest text-primary">RUSH</span>
          </div>
          <span className="font-label-code text-label-code text-primary-fixed-dim">Cadet Rank #{rank}</span>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="font-label-numeric text-label-numeric text-on-primary font-bold">{score.toLocaleString()} pts</span>
        <span className="font-label-badge text-label-badge text-primary-fixed-dim flex items-center gap-0.5 font-bold">
          <span className="material-symbols-outlined text-[12px]">local_fire_department</span> {streak}x STREAK
        </span>
      </div>
    </div>
  );
}

export default memo(BattleArena);
