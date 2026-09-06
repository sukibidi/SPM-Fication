import { useCallback, useMemo, useState } from 'react';
import useGameEngine from './hooks/useGameEngine';
import useAudioSynthesizer from './hooks/useAudioSynthesizer';
import ErrorBoundary from './components/ErrorBoundary';
import LandingScreen from './screens/LandingScreen';
import BattleArena from './screens/BattleArena';
import VictorySummary from './screens/VictorySummary';
import AuthScreen from './screens/AuthScreen';
import SubjectVault from './screens/SubjectVault';
import LeaderboardScreen from './screens/LeaderboardScreen';
import CadetProfile from './screens/CadetProfile';
import { SUBJECT_MAP } from './data/subjects';
import { getInitials, validatePlayerName } from './utils/playerName';

const HEADER_STATES = {
  landing: { title: 'SPM Streak', showBack: false },
  playing: { title: 'Live Battle', showBack: true },
  ended: { title: 'Victory Summary', showBack: false },
};

export default function App() {
  const game = useGameEngine();
  const audio = useAudioSynthesizer();
  const [authOpen, setAuthOpen] = useState(false);
  const [view, setView] = useState('landing');
  const [cadet, setCadet] = useState(null);
  const [guest, setGuest] = useState({ name: 'Guest', initials: 'G', school: 'Guest Session' });

  const localeLabel = game.locale === 'en' ? 'EN' : 'BM';

  const subjectLabel = useMemo(() => {
    if (!game.selectedSubjectId) return 'Mixed';
    return SUBJECT_MAP[game.selectedSubjectId]?.short || 'Mixed';
  }, [game.selectedSubjectId]);

  const headerInfo = {
    ...HEADER_STATES[game.screen],
    title: game.screen === 'playing'
      ? `Live Battle — ${subjectLabel} [${localeLabel}]`
      : view === 'subjectVault'
      ? 'Subject Vault'
      : view === 'leaderboard'
      ? 'Leaderboard'
      : view === 'cadetProfile'
      ? 'Cadet Profile'
      : HEADER_STATES[game.screen].title,
  };

  const canStartAsCurrentUser = !!cadet || validatePlayerName(game.playerName).valid;

  const handleStartRun = useCallback(
    (hasShields, subjectId, locale) => {
      const validation = validatePlayerName(game.playerName);
      if (!cadet && !validation.valid) {
        setView('landing');
        return;
      }

      if (!cadet) {
        game.setPlayerName(validation.name);
      }

      audio.playStart();
      game.startRun(hasShields, subjectId, locale);
    },
    [audio, cadet, game]
  );

  const handleNavigate = useCallback(
    (nextView) => {
      setAuthOpen(false);
      if (game.screen !== 'landing') {
        game.restart();
      }
      setView(nextView);
    },
    [game]
  );

  const handleHeaderBack = useCallback(() => {
    if (authOpen) {
      setAuthOpen(false);
      return;
    }

    if (game.screen !== 'landing') {
      game.restart();
      setView('landing');
    }
  }, [authOpen, game]);

  const handleGuestNameChange = useCallback(
    (value) => {
      const validation = validatePlayerName(value);
      const displayName = validation.valid ? validation.name : 'Guest';
      setGuest({ name: displayName, initials: getInitials(displayName), school: 'Guest Session' });
      game.setPlayerName(value);
    },
    [game.setPlayerName]
  );

  const handleDismissFeedback = useCallback(() => {
    audio.playStart();
    game.dismissFeedback();
  }, [audio, game.dismissFeedback]);

  const handleAuthenticated = useCallback(
    (profile) => {
      setCadet(profile);
      game.setPlayerName(profile.name);
      setAuthOpen(false);
      setView('landing');
    },
    [game.setPlayerName]
  );

  return (
    <ErrorBoundary>
      <div className="bg-background font-body text-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary selection:text-on-primary blueprint-grid">
        <Header
          title={authOpen ? 'Student Access' : headerInfo.title}
          showBack={authOpen || headerInfo.showBack}
          soundEnabled
          cadet={cadet}
          guest={guest}
          onLogin={() => setAuthOpen(true)}
          onBack={handleHeaderBack}
          view={view}
          onNavigate={handleNavigate}
          onStart={() => handleNavigate('landing')}
        />

        <main className="flex flex-col relative w-full flex-1">
          {authOpen && <AuthScreen onAuthenticated={handleAuthenticated} />}

          {!authOpen && game.screen === 'landing' && view === 'landing' && (
            <LandingScreen
              onStartRun={handleStartRun}
              cadet={cadet}
              guest={guest}
              playerName={game.playerName}
              onNameChange={handleGuestNameChange}
              onLogin={() => setAuthOpen(true)}
              onNavigate={setView}
            />
          )}

          {!authOpen && game.screen === 'landing' && view === 'subjectVault' && (
            <SubjectVault
              defaultLocale={game.locale}
              canStart={canStartAsCurrentUser}
              onStartRun={handleStartRun}
              onNeedName={() => setView('landing')}
            />
          )}

          {!authOpen && game.screen === 'landing' && view === 'leaderboard' && (
            <LeaderboardScreen
              entries={game.leaderboard}
              cadet={cadet}
              guest={guest}
              onStartPractice={() => setView('landing')}
            />
          )}

          {!authOpen && game.screen === 'landing' && view === 'cadetProfile' && (
            <CadetProfile
              cadet={cadet}
              guest={guest}
              onNavigate={setView}
            />
          )}

          {!authOpen && game.screen === 'playing' && (
            <BattleArena
              questions={game.questions}
              currentIndex={game.currentIndex}
              score={game.score}
              streak={game.streak}
              maxStreak={game.maxStreak}
              totalTime={game.totalTime}
              shields={game.shields}
              selectedKey={game.selectedKey}
              feedbackState={game.feedbackState}
              onSelectAnswer={game.selectAnswer}
              onTimeout={game.handleTimeout}
              onDismissFeedback={handleDismissFeedback}
              audio={audio}
            />
          )}

          {!authOpen && game.screen === 'ended' && (
            <VictorySummary
              score={game.score}
              streak={game.maxStreak}
              totalTime={game.totalTime}
              answers={game.answers}
              playerName={game.playerName}
              onNameChange={game.setPlayerName}
              onSubmitScore={game.submitPlayerScore}
              onRestart={game.restart}
              leaderboard={game.leaderboard}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

function Header({ title, showBack, soundEnabled, cadet, guest, onLogin, onBack, view, onNavigate, onStart }) {
  const currentUser = cadet || guest;
  return (
    <header className="sticky top-0 w-full z-50 bg-surface-container-lowest/95 border-b border-primary">
      <div className="h-14 px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center shrink-0" aria-label="SPM paper logo">
            <span className="material-symbols-outlined text-[20px]">article</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none border-r border-surface-dim pr-space-sm">
            <span className="font-headline-sm text-sm uppercase tracking-wider font-bold text-primary">SPM-FICATION</span>
            <span className="font-label-code text-[9px] text-secondary uppercase tracking-widest">ARCHITECTURAL_SPM // SPEC.2026</span>
          </div>
          {showBack && (
            <button
              onClick={onBack || (() => window.history.back())}
              className="w-9 h-9 flex items-center justify-center bg-surface-container-low border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors"
              aria-label="Pause or Exit Game"
            >
              <span className="material-symbols-outlined text-[20px]">{onBack ? 'arrow_back' : 'pause'}</span>
            </button>
          )}
          <span className="font-label-code text-label-code text-on-surface tracking-widest uppercase truncate">[{title}]</span>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low p-0.5 border border-surface-dim">
            <NavButton active={view === 'landing'} onClick={() => onNavigate('landing')}>Home</NavButton>
            <NavButton active={view === 'subjectVault'} onClick={() => onNavigate('subjectVault')}>Subject Vault</NavButton>
            <NavButton active={view === 'leaderboard'} onClick={() => onNavigate('leaderboard')}>Leaderboard</NavButton>
            <NavButton active={view === 'cadetProfile'} onClick={() => onNavigate('cadetProfile')}>Cadet Profile</NavButton>
          </nav>
          <button
            className="hidden md:inline-flex h-9 px-space-sm border border-primary bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary font-label-badge text-label-badge uppercase tracking-widest font-bold transition-colors"
            type="button"
            onClick={onStart}
          >
            [START]
          </button>
          <div className="hidden md:flex items-center gap-space-xs px-space-xs py-space-2xs border border-surface-dim bg-surface-container-low mono-label text-primary">
            <span className="w-1.5 h-1.5 bg-primary" />
            <span>{cadet ? 'PORT: LIVE_ARENA_04' : 'SESSION: GUEST'}</span>
          </div>
          <button
            className="w-9 h-9 flex items-center justify-center bg-surface-container-low border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors"
            aria-label="Sound toggle"
          >
            <span className="material-symbols-outlined text-[20px]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => onNavigate('cadetProfile')}
              className="flex items-center gap-space-xs"
              aria-label="Open cadet profile"
            >
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="font-label-badge text-label-badge text-primary font-bold tracking-wider uppercase">{currentUser.name}</span>
                <span className="font-label-badge text-[9px] text-secondary uppercase">{currentUser.school}</span>
              </div>
              <div className="w-8 h-8 border border-primary bg-primary text-on-primary flex items-center justify-center font-label-badge text-label-badge font-bold">
                {currentUser.initials}
              </div>
            </button>
          </div>
          {!cadet && (
            <button
              className="h-9 px-space-sm border border-primary bg-primary text-on-primary hover:bg-secondary font-label-badge text-label-badge uppercase tracking-widest font-bold transition-colors"
              type="button"
              onClick={onLogin}
            >
              [LOGIN]
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button
      className={`px-space-xs py-space-2xs font-label-badge text-label-badge uppercase tracking-widest transition-colors ${
        active ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary hover:bg-surface-container-high'
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
