import { memo, useState } from 'react';
import { SUBJECTS } from '../data/subjects';
import Footer from '../components/Footer';

function SubjectVault({ onStartRun, defaultLocale = 'ms', canStart, onNeedName }) {
  const [locale, setLocale] = useState(defaultLocale);

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col bg-transparent text-on-surface">
      <main className="flex-1 px-margin-mobile lg:px-margin-desktop py-space-lg">
        <section className="max-w-6xl mx-auto bg-surface-container-lowest border-2 border-primary hard-shadow">
          <div className="bg-surface-container-low border-b-2 border-primary px-space-md py-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div>
              <div className="mono-label text-on-surface-variant">[ARCHIVE_SYS // KSSM_REPOSITORY_2026]</div>
              <h1 className="font-headline-lg text-headline-lg text-primary font-bold uppercase tracking-tight">Subject Vault</h1>
            </div>
            <div className="flex gap-space-xs">
              <ModeButton active={locale === 'ms'} onClick={() => setLocale('ms')}>BM</ModeButton>
              <ModeButton active={locale === 'en'} onClick={() => setLocale('en')}>EN</ModeButton>
            </div>
          </div>

          <div className="p-space-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
              <SubjectCard
                id="all"
                title="All 5 Core"
                code="MOD-ALL-00"
                topic="Mixed Bahasa Melayu, Sejarah, Matematik, Geografi, and Sains"
                mastery="78%"
                onStart={() => (canStart ? onStartRun(false, null, locale) : onNeedName())}
              />
              {SUBJECTS.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  title={subject.name}
                  code={`MOD-${subject.short}-${String(subject.stage).padStart(2, '0')}`}
                  topic={subject.topic}
                  mastery={`${70 + subject.stage * 4}%`}
                  onStart={() => (canStart ? onStartRun(false, subject.id, locale) : onNeedName())}
                />
              ))}
            </div>

            {!canStart && (
              <div className="mt-space-md border border-error bg-error-container p-space-sm font-label-code text-label-code text-on-error-container uppercase">
                Enter a valid guest name on Home before launching a subject drill, or use Login/Register.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function SubjectCard({ title, code, topic, mastery, onStart }) {
  return (
    <article className="bg-surface-container-lowest border border-primary p-space-md flex flex-col justify-between hover:hard-shadow transition-none min-h-[220px]">
      <div>
        <div className="flex justify-between items-start border-b border-primary/20 pb-space-xs">
          <span className="bg-primary text-on-primary font-label-badge text-label-badge font-bold px-space-xs py-space-2xs">{code}</span>
          <span className="font-label-badge text-label-badge text-on-surface-variant">[KSSM T4-T5]</span>
        </div>
        <div className="py-space-sm">
          <h2 className="font-headline-sm text-headline-sm font-bold text-primary uppercase">{title}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs min-h-[54px]">{topic}</p>
          <div className="mt-space-sm pt-space-xs border-t border-primary/10">
            <div className="flex justify-between font-label-badge text-label-badge mb-1">
              <span className="text-on-surface-variant">MASTERY INDEX</span>
              <span className="font-bold text-primary">{mastery}</span>
            </div>
            <div className="w-full bg-surface-variant h-2 overflow-hidden border border-primary/30">
              <div className="bg-primary h-full" style={{ width: mastery }} />
            </div>
          </div>
        </div>
      </div>
      <button
        className="w-full py-space-xs bg-primary text-on-primary font-label-badge text-label-badge font-bold uppercase hover:bg-secondary transition-colors"
        type="button"
        onClick={onStart}
      >
        [Practice Drill]
      </button>
    </article>
  );
}

function ModeButton({ active, onClick, children }) {
  return (
    <button
      className={`px-space-sm py-space-xs border border-primary font-label-badge text-label-badge font-bold ${active ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-primary hover:bg-surface-container-high'}`}
      type="button"
      onClick={onClick}
    >
      [{children}]
    </button>
  );
}

export default memo(SubjectVault);
