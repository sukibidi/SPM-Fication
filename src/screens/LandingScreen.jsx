import { memo, useMemo, useState } from 'react';
import { SUBJECTS } from '../data/subjects';
import Footer from '../components/Footer';
import { validatePlayerName } from '../utils/playerName';

function LandingScreen({ onStartRun, cadet, guest, playerName, onNameChange, onLogin, onNavigate }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [locale, setLocale] = useState('ms');
  const selectedSubjectInfo = useMemo(
    () => SUBJECTS.find((subject) => subject.id === selectedSubject) || null,
    [selectedSubject]
  );

  const nameValidation = validatePlayerName(playerName);
  const userLabel = cadet?.name || guest?.name || 'Guest';
  const userSchool = cadet?.school || guest?.school || 'Guest Session';
  const canStart = !!cadet || nameValidation.valid;

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col bg-transparent text-on-surface">
      <main className="flex-1 flex items-center justify-center px-margin-mobile lg:px-margin-desktop py-space-lg">
        <section className="w-full max-w-4xl bg-surface-container-lowest border-2 border-primary hard-shadow">
          <div className="bg-surface-container-low border-b-2 border-primary px-space-md py-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div className="mono-label text-primary font-bold">[STUDENT_PORTAL // SPM_ACCESS_2026]</div>
            <div className="mono-label text-on-surface-variant">NODE_STATUS: ONLINE // LATENCY: 12MS</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-space-lg border-b-2 lg:border-b-0 lg:border-r-2 border-primary bg-surface-container-low">
              <div className="flex flex-col h-full justify-between gap-space-lg">
                <div>
                  <p className="mono-label text-on-surface-variant mb-space-xs">CAMPUR ARCHITECTURAL REPOSITORY // COHORT 2026</p>
                  <h1 className="font-headline-lg text-headline-lg lg:text-[36px] lg:leading-[40px] tracking-tight text-primary uppercase font-bold">
                    SPM-Fication
                  </h1>
                  <div className="h-1 bg-primary w-full mt-space-xs" />
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-md">
                    Configure a focused SPM sprint, choose the question language, then launch a timed 5-question revision run.
                  </p>
                </div>

                <div className="border border-primary bg-surface-container-lowest p-space-md">
                  <div className="flex items-center justify-between border-b border-surface-dim pb-space-xs mb-space-sm">
                    <span className="mono-label text-on-surface-variant">CURRENT USER</span>
                    <span className={`mono-badge font-bold ${cadet ? 'bg-primary text-on-primary' : 'text-primary'}`}>
                      {cadet ? '[REGISTERED]' : '[GUEST]'}
                    </span>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center font-label-code text-label-code font-bold">
                      {cadet?.initials || guest?.initials || 'G'}
                    </div>
                    <div className="min-w-0">
                      <div className="font-headline-sm text-headline-sm text-primary font-bold uppercase truncate">{userLabel}</div>
                      <div className="font-label-code text-label-code text-on-surface-variant uppercase truncate">{userSchool}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="lg:col-span-7 p-space-lg space-y-space-md" onSubmit={(event) => event.preventDefault()}>
              <div className="flex items-center justify-between pb-space-sm border-b border-primary">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">Sprint Registration</h2>
                  <p className="font-label-code text-label-code text-on-surface-variant uppercase">Set parameters before entering live battle.</p>
                </div>
                <span className="mono-badge text-primary">REV_05</span>
              </div>

              <FieldGroup label="LANGUAGE // BAHASA">
                <SelectorButton active={locale === 'ms'} onClick={() => setLocale('ms')}>BAHASA MALAYSIA</SelectorButton>
                <SelectorButton active={locale === 'en'} onClick={() => setLocale('en')}>ENGLISH</SelectorButton>
              </FieldGroup>

              <FieldGroup label="SUBJECT // SUBJEK">
                <SelectorButton active={!selectedSubject} onClick={() => setSelectedSubject(null)}>ALL 5 CORE</SelectorButton>
                {SUBJECTS.map((subject) => (
                  <SelectorButton key={subject.id} active={selectedSubject === subject.id} onClick={() => setSelectedSubject(subject.id)}>
                    {subject.name}
                  </SelectorButton>
                ))}
              </FieldGroup>

              {!cadet && (
                <div className="space-y-space-xs">
                  <div className="flex justify-between items-center gap-space-xs">
                    <label className="font-label-code text-label-code text-primary font-bold uppercase tracking-widest" htmlFor="guest-name">
                      GUEST NAME // NAMA TETAMU
                    </label>
                    <span className={`font-label-badge text-label-badge ${nameValidation.valid ? 'text-primary' : 'text-error'}`}>
                      {nameValidation.valid ? '[VALID]' : '[REQUIRED]'}
                    </span>
                  </div>
                  <input
                    id="guest-name"
                    value={playerName}
                    onChange={(event) => onNameChange(event.target.value)}
                    className="w-full bg-surface-container-lowest border-2 border-primary px-space-md py-space-sm font-label-code text-label-code text-primary placeholder:text-on-surface-variant/50 focus:bg-surface-container-low focus:outline-none"
                    placeholder="e.g. Danial Rayyan"
                    maxLength={24}
                  />
                  <p className={`font-label-code text-label-code ${nameValidation.valid || !playerName ? 'text-on-surface-variant' : 'text-error'}`}>
                    {nameValidation.valid || !playerName
                      ? 'Names are auto-capitalized and filtered before leaderboard submission.'
                      : nameValidation.error}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs border border-surface-dim bg-surface-container-low p-space-sm mono-label text-on-surface-variant">
                <Metric label="LANG" value={locale === 'en' ? 'ENGLISH' : 'BM'} />
                <Metric label="SUBJECT" value={selectedSubjectInfo?.short || 'ALL'} />
                <Metric label="TIME" value="10S / Q" />
              </div>

              <div className="pt-space-sm border-t border-surface-dim flex flex-col sm:flex-row gap-space-sm">
                <button
                  className="flex-1 px-space-lg py-space-sm bg-primary text-on-primary mono-label font-bold hover:bg-secondary transition-colors border border-primary active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={!canStart}
                  onClick={() => onStartRun(false, selectedSubject, locale)}
                >
                  {cadet ? '[LAUNCH LIVE BATTLE]' : '[LAUNCH AS GUEST]'}
                </button>
                {!cadet && (
                  <button
                    className="px-space-lg py-space-sm bg-surface-container-lowest text-primary mono-label font-bold border border-primary hover:bg-primary hover:text-on-primary transition-colors"
                    type="button"
                    onClick={onLogin}
                  >
                    [LOGIN / REGISTER]
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-sm border-t border-surface-dim">
                <button
                  className="px-space-md py-space-xs bg-surface-container-lowest text-primary font-label-code text-label-code uppercase tracking-widest font-bold border border-primary hover:bg-primary hover:text-on-primary transition-colors"
                  type="button"
                  onClick={() => onNavigate('subjectVault')}
                >
                  [OPEN SUBJECT VAULT]
                </button>
                <button
                  className="px-space-md py-space-xs bg-surface-container-lowest text-primary font-label-code text-label-code uppercase tracking-widest font-bold border border-primary hover:bg-primary hover:text-on-primary transition-colors"
                  type="button"
                  onClick={() => onNavigate('leaderboard')}
                >
                  [VIEW LEADERBOARD]
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div className="space-y-space-xs">
      <div className="font-label-code text-label-code text-primary font-bold uppercase tracking-widest">{label}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">{children}</div>
    </div>
  );
}

function SelectorButton({ active, onClick, children }) {
  return (
    <button
      className={`px-space-sm py-space-xs border font-label-code text-label-code uppercase tracking-wider font-bold text-left transition-colors duration-75 ${
        active
          ? 'bg-primary text-on-primary border-primary'
          : 'bg-surface-container-lowest text-primary border-primary hover:bg-surface-container-high'
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex justify-between sm:flex-col sm:justify-start gap-space-2xs">
      <span>{label}</span>
      <strong className="text-primary">{value}</strong>
    </div>
  );
}

export default memo(LandingScreen);
