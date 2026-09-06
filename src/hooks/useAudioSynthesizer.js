import { useCallback, useRef, useEffect } from 'react';

export default function useAudioSynthesizer() {
  const ctxRef = useRef(null);
  const resumedRef = useRef(false);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const ensureResumed = useCallback(async () => {
    const ctx = getContext();
    if (ctx.state === 'suspended' && !resumedRef.current) {
      try {
        await ctx.resume();
        resumedRef.current = true;
      } catch {
        /* browser may still block — degrade silently */
      }
    }
    return ctx;
  }, [getContext]);

  const playTone = useCallback(
    (frequency, duration = 0.15, type = 'square', gain = 0.08) => {
      try {
        const ctx = getContext();
        if (ctx.state === 'suspended') return;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        g.gain.setValueAtTime(gain, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {
        /* audio failure — non-critical */
      }
    },
    [getContext]
  );

  const playArcadeSound = useCallback(
    (sound) => {
      playTone(sound === 'correct' ? 880 : 220, 0.12, 'square', 0.06);
      setTimeout(() => {
        if (sound === 'correct') playTone(1100, 0.15, 'square', 0.05);
      }, 80);
    },
    [playTone]
  );

  const playTick = useCallback(() => {
    playTone(600, 0.04, 'square', 0.03);
  }, [playTone]);

  const playGameOver = useCallback(() => {
    playTone(440, 0.3, 'sawtooth', 0.06);
    setTimeout(() => playTone(330, 0.3, 'sawtooth', 0.05), 200);
    setTimeout(() => playTone(220, 0.5, 'sawtooth', 0.07), 400);
  }, [playTone]);

  const playStart = useCallback(() => {
    playTone(440, 0.1, 'square', 0.05);
    setTimeout(() => playTone(660, 0.1, 'square', 0.05), 80);
    setTimeout(() => playTone(880, 0.15, 'square', 0.06), 160);
  }, [playTone]);

  useEffect(() => {
    const handler = () => ensureResumed();
    document.addEventListener('click', handler, { once: true });
    document.addEventListener('keydown', handler, { once: true });
    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('keydown', handler);
    };
  }, [ensureResumed]);

  useEffect(() => {
    return () => {
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { playArcadeSound, playTick, playGameOver, playStart, ensureResumed };
}