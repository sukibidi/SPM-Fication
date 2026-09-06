import { validatePlayerName } from '../utils/playerName';

const STORAGE_KEY = 'spm_streak_leaderboard';

export function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLeaderboard(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* storage full — silently degrade */
  }
}

export function submitScore(name, score, streak, totalTime) {
  const validation = validatePlayerName(name);
  if (!validation.valid) return null;

  const board = loadLeaderboard();
  const entry = {
    id: Date.now().toString(36),
    name: validation.name,
    score,
    streak,
    totalTime,
    timestamp: Date.now(),
  };
  board.push(entry);
  board.sort((a, b) => b.score - a.score || a.totalTime - b.totalTime);
  saveLeaderboard(board.slice(0, 100));
  return entry;
}

export const DEFAULT_LEADERBOARD = [
  { id: 'demo-1', name: 'Danial Rayyan', initials: 'DR', score: 4950, streak: 14, school: 'Kolej Yayasan Saad' },
  { id: 'demo-2', name: 'Nur Maisarah', initials: 'NM', score: 4720, streak: 9, school: 'SMK Seri Bintang' },
  { id: 'demo-3', name: 'Justin Tan', initials: 'JT', score: 4580, streak: 7, school: 'SMJK Chung Ling' },
  { id: 'demo-4', name: 'Siti Aminah', initials: 'SA', score: 4120, streak: 5, school: 'SBP Integrasi Gombak' },
  { id: 'demo-5', name: 'Arif Fahrurrozi', initials: 'AF', score: 3850, streak: 4, school: 'SMK Seksyen 18' },
];
