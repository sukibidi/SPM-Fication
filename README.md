# SPM Streak — Arcade Revision Engine

**SPMfication: SPM Streak** is a gamified, high-fidelity revision engine for Malaysian SPM students. It transforms exam preparation into an arcade speedrun experience with 10-second timers, combo multipliers, live leaderboards, and daily streak mechanics.

## Architecture

```
src/
├── data/                   # Static data layer (decoupled config)
│   ├── theme.js            # Tailwind colors, typography, spacing tokens
│   ├── subjects.js          # 5 SPM subjects: metadata, order, icons
│   ├── questions.js         # Question bank (25+ questions across 5 subjects)
│   ├── game.js              # Game constants, score calculation, rank thresholds
│   └── leaderboard.js       # localStorage persistence + demo seeds
│
├── hooks/                  # Custom React hooks (core logic)
│   ├── useGameEngine.js     # useReducer-based state machine (landing→playing→feedback→ended)
│   ├── useAudioSynthesizer.js  # Web Audio API synth with autoplay policy handling
│   └── useTimer.js          # Precise countdown timer with tick/expire callbacks
│
├── components/             # Reusable UI components (all memo-wrapped)
│   ├── ErrorBoundary.jsx    # Class-based error boundary with fallback UI
│   ├── Logo.jsx             # SVG logo (memo'd static asset)
│   ├── Timer.jsx            # Visual countdown bar with low-time warning
│   ├── TelemetryBar.jsx     # HUD: stage, subject, streak, subject progress pips
│   ├── QuestionCard.jsx     # Question display + 2×2 option grid with keyboard nav
│   ├── FeedbackModal.jsx    # Correct/incorrect/timeout modal with explanation
│   ├── Leaderboard.jsx      # Ranked player list with highlight for current user
│   ├── Footer.jsx           # Global footer with version info
│   ├── Powerups.jsx         # Shield/Freeze/Skip power-up buttons
│   └── ScoreBar.jsx         # Live score + combo meter
│
├── screens/                # Full-page screen compositions
│   ├── LandingScreen.jsx    # Marketing hero, subject gauntlet, streak chamber, mechanics
│   ├── BattleArena.jsx      # Quiz gameplay: timer, question, feedback, live sidebar
│   └── VictorySummary.jsx   # Score display, nickname submission, leaderboard, replay
│
├── App.jsx                 # Root component: screen router + header
├── main.jsx                # Entry point
└── index.css               # Tailwind directives + arcade grid background
```

### State Machine (useReducer)

```
LANDING → PLAYING ⇄ FEEDBACK → ENDED → LANDING
              ↑                     ↓
          (timeout)          (submit score)
```

The `useGameEngine` hook manages seven actions via `useReducer`:
- `START_RUN` — shuffles questions, resets score/streak, transitions to `playing`
- `SELECT_ANSWER` — evaluates answer, calculates points with streak multiplier + time bonus
- `TIMEOUT` — records missed answer, resets streak
- `DISMISS_FEEDBACK` — advances to next question or transitions to `ended`
- `SUBMIT_SCORE` — persists to localStorage leaderboard
- `SET_PLAYER_NAME` — sanitizes and truncates input
- `RESTART` — returns to `landing` preserving player name

## Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| React | ^18.3.1 | Component library |
| React DOM | ^18.3.1 | DOM rendering |
| Tailwind CSS | ^3.4.4 | Utility-first styling |
| Vite | ^5.3.1 | Build tool & dev server |
| Google Fonts | — | Space Grotesk, Outfit, JetBrains Mono (loaded via index.html) |
| Material Symbols | — | Icon font (loaded via index.html) |

### Required HTML Head Links

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Outfit:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```

## Getting Started

```bash
npm install
npm run dev      # Development server at localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Expanding the Question Bank

Each question follows this shape:

```js
{
  subjectId: 'matematik',      // Must match a key in src/data/subjects.js
  question: 'What is 2 + 2?',
  options: [
    { key: 'A', label: '3' },
    { key: 'B', label: '4' },     // Correct answer
    { key: 'C', label: '5' },
    { key: 'D', label: '6' },
  ],
  correctKey: 'B',
  explanation: '2 + 2 = 4.',
  hint: 'Count on your fingers if needed.',   // Optional
}
```

Add new questions to `src/data/questions.js` using the `Q()` helper:

```js
Q('sains', 'What is the chemical symbol for Oxygen?', [
  { key: 'A', label: 'O' },
  { key: 'B', label: 'Ox' },
  { key: 'C', label: 'O2' },
  { key: 'D', label: 'Om' },
], 'A', 'Oxygen is represented by the letter O.'),
```

There is no maximum — the engine picks one question per subject per run.

## Performance Considerations

- All components use `React.memo` to prevent unnecessary re-renders
- `useCallback`/`useMemo` wrap all handlers and derived values in hooks
- `useReducer` centralizes game state mutations → predictable single re-render per action
- `useAudioSynthesizer` creates one `AudioContext` (lazily) and closes it on unmount
- Audio context is resumed on first user interaction to satisfy browser autoplay policies
- Timer uses `setInterval` at 100ms granularity with cleanup on unmount

## Accessibility (a11y)

- ARIA roles: `dialog`, `progressbar`, `timer`, `alert`
- Keyboard navigation: `[A][B][C][D]` keys for quiz options, `Enter`/`Space` to dismiss modal
- `aria-live="polite"` on dynamic timer readout
- All buttons have descriptive `aria-label` attributes
- Color contrast ratios meet WCAG AA against the dark theme

## Design System

All visual tokens are centralized in `src/data/theme.js` and consumed by both Tailwind and the design system reference. The palette is an abyss-dark arcade theme with cyan primary (`#00F0FF`), gold secondary (`#FFC640`), and layered frosted-glass surface containers.

| Token | CSS Class | Description |
|---|---|---|
| `--color-primary` | `.text-primary` | Interactive elements, active states |
| `--color-secondary` | `.text-secondary` | Streaks, multipliers, incentives |
| `--color-surface-container` | `.bg-surface-container` | Glass card backgrounds |
| `font-display-arcade` | `.font-display-arcade` | Large score/headline text |
| `font-label-code` | `.font-label-code` | Telemetry, timers, badges |

## License

Internal use — Campur SPM Arcade Battleground &copy; 2026