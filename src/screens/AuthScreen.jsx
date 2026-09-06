import { memo, useCallback, useState } from 'react';

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('signin');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [school, setSchool] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const name = mode === 'signup' ? studentName.trim() : identifier.trim().split('@')[0];
      onAuthenticated({
        name: name || 'Student Cadet',
        initials: getInitials(name || identifier || 'Student Cadet'),
        school: school.trim() || 'KSSM Student Unit',
      });
    },
    [identifier, mode, onAuthenticated, password, school, studentName]
  );

  return (
    <main className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-margin-mobile lg:p-margin-desktop bg-background blueprint-grid">
      <div className="flex flex-col w-full max-w-7xl mx-auto text-on-surface">
        <header className="w-full flex flex-col gap-space-lg mb-space-xl">
          <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md border-b border-primary/20">
            <div className="flex flex-wrap items-center gap-space-xs mono-label text-on-surface-variant">
              <span className="px-space-xs py-space-2xs bg-surface-container-high text-on-surface font-semibold">[STUDENT_PORTAL // SPM_ACCESS_2026]</span>
              <span>/</span>
              <span className="px-space-xs py-space-2xs bg-surface-container-high text-on-surface font-semibold">FIG. 03 // STUDENT_VERIFICATION_PROTOCOL</span>
              <span>/</span>
              <span className="px-space-xs py-space-2xs bg-primary text-on-primary font-semibold">ACCESS_STATUS: ACTIVE_PORTAL</span>
            </div>
            <div className="flex items-center gap-space-sm font-label-code text-label-code text-on-surface-variant">
              <span className="inline-block w-2 h-2 bg-primary" />
              <span className="uppercase tracking-widest font-semibold">NODE_STATUS: ONLINE</span>
              <span>|</span>
              <span>LATENCY: 12ms</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-3xl">
              <p className="font-label-code text-label-code uppercase tracking-widest text-on-surface-variant mb-space-xs">
                CAMPUR ARCHITECTURAL REPOSITORY // COHORT 2026
              </p>
              <h1 className="font-display-arcade text-display-arcade-mobile lg:text-display-arcade tracking-tight text-primary uppercase leading-none">
                STUDENT ACCESS //
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-2xl">
                Official KSSM-SPM student revision portal. Log in to sync your daily study streak, view your national school ranking, and unlock past-year trial questions.
              </p>
            </div>

            <div className="p-space-md bg-surface-container-lowest border border-primary/20 flex flex-col justify-between w-full sm:w-64 h-32 shrink-0">
              <div className="flex justify-between items-start font-label-badge text-label-badge uppercase text-on-surface-variant">
                <span>SPEC: KSSM-2026</span>
                <span>[VERIFIED]</span>
              </div>
              <div className="font-label-badge text-label-badge tracking-tighter text-on-surface truncate">
                ||| | ||||| || |||| ||| |||||| || |
              </div>
              <div className="font-label-badge text-label-badge uppercase text-on-surface-variant tracking-wider">
                REG: SPM-2026-AUTH-KPM
              </div>
            </div>
          </div>

          <div className="w-full bg-primary text-on-primary px-space-md py-space-sm font-label-badge text-label-badge uppercase tracking-wider flex flex-wrap items-center justify-between gap-space-sm">
            <span><strong>EXAM CYCLE:</strong> SPM 2026 SPRINT</span>
            <span><strong>ACTIVE STUDENTS:</strong> 14,820</span>
            <span><strong>SERVER NODE:</strong> KL_METRO_09</span>
            <span><strong>SECURITY:</strong> TLS 1.3 / GOV_SEC</span>
          </div>
        </header>

        <section className="relative w-full bg-surface-container-lowest border-2 border-primary hard-shadow">
          <span className="absolute -top-3 -left-3 font-label-badge text-label-badge font-bold text-primary bg-background px-1 select-none">[+]</span>
          <span className="absolute -top-3 -right-3 font-label-badge text-label-badge font-bold text-primary bg-background px-1 select-none">[+]</span>
          <span className="absolute -bottom-3 -left-3 font-label-badge text-label-badge font-bold text-primary bg-background px-1 select-none">[+]</span>
          <span className="absolute -bottom-3 -right-3 font-label-badge text-label-badge font-bold text-primary bg-background px-1 select-none">[+]</span>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-primary font-label-code text-label-code uppercase tracking-wider">
            <button
              className={`p-space-md flex items-center justify-between text-left ${mode === 'signin' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface border-b-2 md:border-b-0 md:border-r-2 border-primary'}`}
              type="button"
              onClick={() => setMode('signin')}
            >
              <span className="font-bold">[01 // STUDENT SIGN IN]</span>
              <span className={`text-label-badge px-space-xs py-space-2xs font-bold ${mode === 'signin' ? 'bg-surface-container-lowest text-primary' : 'border border-primary bg-surface-container-lowest text-primary'}`}>
                {mode === 'signin' ? 'STATE: ACTIVE' : 'OPEN'}
              </span>
            </button>
            <button
              className={`p-space-md flex items-center justify-between text-left ${mode === 'signup' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface'}`}
              type="button"
              onClick={() => setMode('signup')}
            >
              <span className="font-bold">[02 // NEW STUDENT REGISTRATION]</span>
              <span className={`text-label-badge px-space-xs py-space-2xs font-bold ${mode === 'signup' ? 'bg-surface-container-lowest text-primary' : 'border border-primary bg-surface-container-lowest text-primary'}`}>
                {mode === 'signup' ? 'STATE: ACTIVE' : 'REGISTER'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <section className="lg:col-span-6 p-space-lg lg:p-space-xl flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
              <div>
                <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-primary/10">
                  <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
                    {mode === 'signin' ? 'STUDENT LOGIN // LOG MASUK PELAJAR' : 'STUDENT REGISTRATION // PENDAFTARAN'}
                  </h2>
                  <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                </div>

                <form className="space-y-space-lg" onSubmit={handleSubmit}>
                  {mode === 'signup' && (
                    <Field
                      id="student-name"
                      label="FULL NAME // NAMA PELAJAR"
                      meta="[STUDENT_NAME]"
                      placeholder="e.g. Harith Al-Amin"
                      value={studentName}
                      onChange={setStudentName}
                    />
                  )}

                  <Field
                    id="callsign"
                    label="USERNAME, IC NUMBER, OR MOE DELIMa EMAIL"
                    meta="[AUTH_ID]"
                    placeholder="e.g. harith2026 or m-12345678@moe-dl.edu.my"
                    value={identifier}
                    onChange={setIdentifier}
                  />

                  <Field
                    id="passcode"
                    label="PASSWORD // KATA LALUAN"
                    meta="[SEC_KEY]"
                    placeholder="••••••••••••••••"
                    type="password"
                    value={password}
                    onChange={setPassword}
                  />

                  {mode === 'signup' && (
                    <Field
                      id="school"
                      label="SCHOOL // UNIT SEKOLAH"
                      meta="[SCHOOL_NODE]"
                      placeholder="e.g. Sekolah Sultan Alam Shah"
                      value={school}
                      onChange={setSchool}
                    />
                  )}

                  <button
                    className="w-full bg-primary text-on-primary border-2 border-primary px-space-lg py-space-md font-label-code text-label-code uppercase tracking-widest font-bold hover:bg-secondary transition-colors active:translate-x-0.5 active:translate-y-0.5"
                    type="submit"
                  >
                    {mode === 'signin' ? '[AUTHENTICATE STUDENT SESSION]' : '[CREATE STUDENT ACCOUNT]'}
                  </button>
                </form>
              </div>
            </section>

            <aside className="lg:col-span-6 p-space-lg lg:p-space-xl bg-surface-container-low flex flex-col justify-between gap-space-lg">
              <div>
                <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-primary">
                  <span className="mono-label text-primary font-bold">[ACCESS CAPABILITIES]</span>
                  <span className="mono-badge text-primary">KPM_SYNC</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <Metric label="DAILY STREAK SYNC" value="14D READY" />
                  <Metric label="NATIONAL RANKING" value="LIVE" />
                  <Metric label="QUESTION VAULT" value="1,840 Qs" />
                  <Metric label="LANGUAGE MODE" value="BM / EN" />
                </div>
              </div>

              <div className="border border-primary bg-surface-container-lowest p-space-md">
                <div className="mono-label text-primary font-bold mb-space-xs">[SECURITY NOTICE]</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  This local prototype uses a simulated authentication handshake. The session returns to the landing deck and displays the registered cadet initials in the header.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ id, label, meta, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex justify-between items-center gap-space-xs">
        <label className="font-label-code text-label-code uppercase tracking-wider text-primary font-bold" htmlFor={id}>
          {label}
        </label>
        <span className="font-label-badge text-label-badge text-on-surface-variant">{meta}</span>
      </div>
      <input
        className="w-full bg-surface-container-lowest border-2 border-primary px-space-md py-space-sm font-label-code text-label-code text-on-surface placeholder:text-on-surface-variant/40 focus:bg-surface-container-low focus:outline-none focus:ring-0 transition-colors"
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-surface-container-lowest border border-primary p-space-md">
      <div className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-widest">{label}</div>
      <div className="font-headline-sm text-headline-sm font-bold text-primary mt-space-2xs">{value}</div>
    </div>
  );
}

function getInitials(value) {
  return value
    .split(/\s+|[._-]/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default memo(AuthScreen);
