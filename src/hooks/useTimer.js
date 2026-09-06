import { useState, useRef, useCallback, useEffect } from 'react';

export default function useTimer({ duration, onExpire, onTick }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const tickRef = useRef(onTick);
  const expireRef = useRef(onExpire);
  const durationRef = useRef(duration);

  tickRef.current = onTick;
  expireRef.current = onExpire;
  durationRef.current = duration;

  const start = useCallback(() => {
    setTimeLeft(durationRef.current);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const addTime = useCallback((seconds) => {
    setTimeLeft((prev) => prev + seconds);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    const TICK = 100;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = +(prev - TICK / 1000).toFixed(1);
        if (next <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          if (expireRef.current) expireRef.current();
          return 0;
        }
        if (tickRef.current) tickRef.current(next, durationRef.current);
        return next;
      });
    }, TICK);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { timeLeft, isRunning, start, stop, addTime, pause, resume };
}