import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState, DayLog, Profile } from '../types';
import { demoState } from '../data/demoData';

const STORAGE_KEY = 'projeto4:state:v1';

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppState;
  } catch {
    /* ignore corrupted storage */
  }
  return demoState;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function emptyDay(): DayLog {
  return { date: todayKey(), waterLiters: 0, meals: 0, exerciseMinutes: 0, sleepHours: 0, points: 0 };
}

interface AppContextValue {
  state: AppState;
  today: DayLog;
  toast: string | null;
  showToast: (msg: string) => void;
  createAccount: (p: Pick<Profile, 'name' | 'email' | 'birthDate'>) => void;
  saveMarcoZero: (data: Partial<Profile>) => void;
  saveGoals: (goals: string[], why: string) => void;
  logWater: (liters: number) => void;
  logMeals: (meals: number) => void;
  logExercise: (minutes: number) => void;
  logSleep: (hours: number) => void;
  logMood: (mood: DayLog['mood']) => void;
  logWeight: (weight: number) => void;
  toggleShoppingItem: (id: string) => void;
  incrementChallenge: (id: string) => void;
  resetToBlank: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2200);
  }

  const today = state.days[todayKey()] ?? emptyDay();

  function updateToday(patch: Partial<DayLog>, pointsGained: number, successMsg?: string) {
    setState((prev) => {
      const key = todayKey();
      const current = prev.days[key] ?? emptyDay();
      const merged: DayLog = { ...current, ...patch, points: current.points + pointsGained };
      return { ...prev, days: { ...prev.days, [key]: merged } };
    });
    if (successMsg) showToast(successMsg);
  }

  function createAccount(p: Pick<Profile, 'name' | 'email' | 'birthDate'>) {
    setState((prev) => ({
      ...prev,
      profile: {
        name: p.name,
        email: p.email,
        birthDate: p.birthDate,
        joinedAt: todayKey(),
        weightInitial: 0,
        weightCurrent: 0,
        height: 0,
        waistInitial: 0,
        waistCurrent: 0,
        abdomenInitial: 0,
        abdomenCurrent: 0,
        hipInitial: 0,
        hipCurrent: 0,
        thighInitial: 0,
        thighCurrent: 0,
        armInitial: 0,
        armCurrent: 0,
        goals: [],
        why: '',
        onboardingDone: false
      }
    }));
  }

  function saveMarcoZero(data: Partial<Profile>) {
    setState((prev) => {
      if (!prev.profile) return prev;
      const weight = data.weightInitial ?? prev.profile.weightInitial;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          ...data,
          weightCurrent: weight
        },
        weightHistory: [...prev.weightHistory, { date: todayKey(), weight }]
      };
    });
    showToast('Marco Zero salvo!');
  }

  function saveGoals(goals: string[], why: string) {
    setState((prev) => prev.profile ? {
      ...prev,
      profile: { ...prev.profile, goals, why, onboardingDone: true }
    } : prev);
    showToast('Objetivo salvo!');
  }

  function logWater(liters: number) {
    updateToday({ waterLiters: Math.min(4, (today.waterLiters || 0) + liters) }, 1, 'Água registrada! +1 ponto');
  }
  function logMeals(meals: number) {
    updateToday({ meals: Math.min(6, (today.meals || 0) + meals) }, 1, 'Alimentação registrada! +1 ponto');
  }
  function logExercise(minutes: number) {
    updateToday({ exerciseMinutes: (today.exerciseMinutes || 0) + minutes }, 2, 'Movimento registrado! +2 pontos');
  }
  function logSleep(hours: number) {
    updateToday({ sleepHours: hours }, 1, 'Sono registrado! +1 ponto');
  }
  function logMood(mood: DayLog['mood']) {
    updateToday({ mood }, 1, 'Humor registrado! +1 ponto');
  }
  function logWeight(weight: number) {
    setState((prev) => prev.profile ? {
      ...prev,
      profile: { ...prev.profile, weightCurrent: weight },
      weightHistory: [...prev.weightHistory, { date: todayKey(), weight }]
    } : prev);
    showToast('Peso registrado!');
  }
  function toggleShoppingItem(id: string) {
    setState((prev) => ({
      ...prev,
      shoppingList: prev.shoppingList.map((i) => i.id === id ? { ...i, checked: !i.checked } : i)
    }));
  }
  function incrementChallenge(id: string) {
    setState((prev) => ({
      ...prev,
      challenges: prev.challenges.map((c) => c.id === id ? { ...c, progress: Math.min(c.target, c.progress + 1) } : c)
    }));
    showToast('Progresso do desafio atualizado!');
  }
  function resetToBlank() {
    const blank: AppState = {
      profile: null,
      weightHistory: [],
      days: {},
      group: demoState.group,
      challenges: demoState.challenges.map((c) => ({ ...c, progress: 0 })),
      achievements: demoState.achievements.map((a) => ({ ...a, unlocked: false })),
      shoppingList: [],
      mealPlan: [],
      streak: 0
    };
    setState(blank);
  }

  const value = useMemo<AppContextValue>(() => ({
    state, today, toast, showToast,
    createAccount, saveMarcoZero, saveGoals,
    logWater, logMeals, logExercise, logSleep, logMood, logWeight,
    toggleShoppingItem, incrementChallenge, resetToBlank
  }), [state, today, toast]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
