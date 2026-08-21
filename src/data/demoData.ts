import type { AppState } from '../types';

const today = () => new Date().toISOString().slice(0, 10);

function pastDate(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export const demoState: AppState = {
  profile: {
    name: 'Tamires',
    email: 'tamires@exemplo.com',
    birthDate: '1994-05-12',
    joinedAt: pastDate(30),
    weightInitial: 80.0,
    weightCurrent: 74.8,
    height: 1.65,
    waistInitial: 98,
    waistCurrent: 91,
    abdomenInitial: 96,
    abdomenCurrent: 90,
    hipInitial: 108,
    hipCurrent: 104,
    thighInitial: 62,
    thighCurrent: 60,
    armInitial: 32,
    armCurrent: 31,
    goals: ['Emagrecer', 'Melhorar minha alimentação', 'Ter mais disposição'],
    why: 'Quero me sentir mais disposta, ter mais saúde e me olhar no espelho com orgulho.',
    onboardingDone: true
  },
  weightHistory: [
    { date: pastDate(30), weight: 80.0 },
    { date: pastDate(24), weight: 78.9 },
    { date: pastDate(18), weight: 77.6 },
    { date: pastDate(12), weight: 76.5 },
    { date: pastDate(6), weight: 75.4 },
    { date: today(), weight: 74.8 }
  ],
  days: {
    [today()]: {
      date: today(),
      waterLiters: 1.5,
      meals: 3,
      exerciseMinutes: 35,
      sleepHours: 7.33,
      mood: 'feliz',
      points: 5
    }
  },
  group: {
    name: 'Projeto 4 — Agosto',
    members: [
      { id: 'ana', name: 'Ana', points: 87 },
      { id: 'tamires', name: 'Tamires', points: 79 },
      { id: 'joao', name: 'João', points: 75 },
      { id: 'marina', name: 'Marina', points: 73 }
    ]
  },
  challenges: [
    { id: 'agua7', title: 'Beber água adequadamente por 7 dias', icon: '💧', scope: 'meu', target: 7, progress: 6, unit: 'dias' },
    { id: 'grupo500', title: 'Juntos alcançar 500 pontos esta semana', icon: '🤝', scope: 'grupo', target: 500, progress: 350, unit: 'pts' },
    { id: 'vegetais', title: 'Comer vegetais em pelo menos uma refeição por dia', icon: '🥦', scope: 'meu', target: 7, progress: 5, unit: 'dias' }
  ],
  achievements: [
    { id: 'semana1', title: 'Primeira semana', icon: '🏅', unlocked: true, description: 'Você completou sua primeira semana no Projeto 4.' },
    { id: 'streak7', title: '7 dias consecutivos', icon: '🔥', unlocked: true, description: '7 dias seguidos cuidando dos seus hábitos.' },
    { id: 'hidratacao', title: 'Hidratação mestre', icon: '💧', unlocked: true, description: 'Bateu a meta de água 10 vezes.' },
    { id: 'treinos10', title: '10 treinos', icon: '🏆', unlocked: false, description: 'Registre 10 dias com movimento.' },
    { id: 'dias30', title: '30 dias', icon: '⭐', unlocked: false, description: '30 dias de jornada no Projeto 4.' },
    { id: 'incentivador', title: 'Companheiro incentivador', icon: '💜', unlocked: false, description: 'Envie 5 incentivos para o seu grupo.' }
  ],
  shoppingList: [
    { id: 's1', name: 'Alface', category: 'Hortaliças', checked: true },
    { id: 's2', name: 'Couve', category: 'Hortaliças', checked: false },
    { id: 's3', name: 'Brócolis', category: 'Hortaliças', checked: false },
    { id: 's4', name: 'Banana', category: 'Frutas', checked: true },
    { id: 's5', name: 'Maçã', category: 'Frutas', checked: false },
    { id: 's6', name: 'Mamão', category: 'Frutas', checked: false },
    { id: 's7', name: 'Peito de frango', category: 'Proteínas', checked: true },
    { id: 's8', name: 'Ovos', category: 'Proteínas', checked: false }
  ],
  mealPlan: [],
  streak: 8
};
