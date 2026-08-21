import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, BackButton } from '../components/ui';
import { useApp } from '../context/AppContext';

const MOOD_LABEL: Record<string, string> = { feliz: 'Feliz', neutro: 'Neutro', dificil: 'Foi difícil' };

export default function DayDetails() {
  const navigate = useNavigate();
  const { today, state } = useApp();
  const profile = state.profile;

  const rows = [
    { icon: '💧', label: 'Água', value: `${today.waterLiters.toFixed(1)} L`, done: today.waterLiters >= 2 },
    { icon: '🥗', label: 'Alimentação', value: `${today.meals} refeições`, done: today.meals >= 3 },
    { icon: '🏃', label: 'Movimento', value: `${today.exerciseMinutes} min`, done: today.exerciseMinutes >= 20 },
    { icon: '😴', label: 'Sono', value: today.sleepHours ? `${today.sleepHours}h` : '—', done: today.sleepHours >= 7 },
    { icon: '⚖️', label: 'Peso', value: profile ? `${profile.weightCurrent} kg` : '—', done: false },
    { icon: '😊', label: 'Humor', value: today.mood ? MOOD_LABEL[today.mood] : '—', done: !!today.mood }
  ];

  return (
    <div className="fade-in">
      <BackButton onClick={() => navigate('/inicio')} />
      <h1 className="title-lg" style={{ marginBottom: 20 }}>Meu dia</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {rows.map((r) => (
          <Card key={r.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{r.label} — {r.value}</span>
              {r.done && <span style={{ color: 'var(--green)' }}>✅</span>}
            </div>
          </Card>
        ))}
      </div>

      <Card tone="green" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 26, marginBottom: 6 }}>🎉</div>
        <h3 className="title-md" style={{ marginBottom: 4 }}>Parabéns!</h3>
        <p style={{ color: 'var(--gray-text)' }}>Você ganhou {today.points} pontos hoje!</p>
      </Card>
    </div>
  );
}
