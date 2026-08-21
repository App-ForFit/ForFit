export interface Profile {
  name: string;
  email: string;
  birthDate: string;
  joinedAt: string;
  weightInitial: number;
  weightCurrent: number;
  height: number;
  waistInitial: number;
  waistCurrent: number;
  abdomenInitial: number;
  abdomenCurrent: number;
  hipInitial: number;
  hipCurrent: number;
  thighInitial: number;
  thighCurrent: number;
  armInitial: number;
  armCurrent: number;
  goals: string[];
  why: string;
  onboardingDone: boolean;
}

export interface WeightEntry { date: string; weight: number }

export interface DayLog {
  date: string; // YYYY-MM-DD
  waterLiters: number;
  meals: number;
  exerciseMinutes: number;
  sleepHours: number;
  mood?: 'feliz' | 'neutro' | 'dificil';
  points: number;
}

export interface GroupMember { id: string; name: string; points: number }

export interface Challenge {
  id: string;
  title: string;
  icon: string;
  scope: 'meu' | 'grupo';
  target: number;
  progress: number;
  unit: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

export interface ShoppingItem { id: string; name: string; category: string; checked: boolean }

export interface MealPlanEntry { day: string; meal: string; text: string }

export interface AppState {
  profile: Profile | null;
  weightHistory: WeightEntry[];
  days: Record<string, DayLog>;
  group: { name: string; members: GroupMember[] };
  challenges: Challenge[];
  achievements: Achievement[];
  shoppingList: ShoppingItem[];
  mealPlan: MealPlanEntry[];
  streak: number;
}
