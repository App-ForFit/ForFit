import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, MetricCard, ProgressBar, Button } from '../components/ui';
import { useApp } from '../context/AppContext';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function Home() {
  const { state, today } = useApp();
  const navigate = useNavigate();
  const profile = state.profile!;

  return (
    <div className="fade-in">
      <h1 className="title-lg">{greeting()}, {profile.name}! 🌱</h1>
      <p className="eyebrow" style={{ marginTop: 6, marginBottom: 20 }}>Aqui está o resumo do seu dia</p>

      <div className="grid-2" style={{ marginBottom: 14 }}>
        <MetricCard
          icon="💧" label="Água" value={`${today.waterLiters.toFixed(1)} / 2,0 L`}
          sub={<ProgressBar value={today.waterLiters} max={2} />}
        />
        <MetricCard
          icon="🥗" label="Alimentação" value={`${today.meals} / 3 refeições`}
          sub={<ProgressBar value={today.meals} max={3} />}
        />
        <MetricCard icon="🏃" label="Movimento" value={`${today.exerciseMinutes} min`} />
        <MetricCard icon="😴" label="Sono" value={today.sleepHours ? `${Math.floor(today.sleepHours)}h${Math.round((today.sleepHours % 1) * 60)}` : '—'} />
      </div>

      <Card tone="green" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <span className="title-md">Constância — {state.streak} dias</span>
        </div>
        <p style={{ color: 'var(--gray-text)', fontSize: 14 }}>
          Você está há {state.streak} dias cuidando dos seus hábitos!
        </p>
      </Card>

      <Button onClick={() => navigate('/registrar')}>+ Registrar</Button>

      <div style={{ marginTop: 18 }}>
        <button
          onClick={() => navigate('/dia')}
          style={{ background: 'none', border: 'none', color: 'var(--green)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
        >
          Ver detalhes do meu dia →
        </button>
      </div>
    </div>
  );
}
