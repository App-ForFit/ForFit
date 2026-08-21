import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui';
import { useApp } from '../context/AppContext';

const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
const MEALS = [
  { key: 'cafe', icon: '🍳', label: 'Café da manhã' },
  { key: 'almoco', icon: '🥗', label: 'Almoço' },
  { key: 'lanche', icon: '🍎', label: 'Lanche' },
  { key: 'jantar', icon: '🍲', label: 'Jantar' }
];

export default function WeekPlan() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [activeDay, setActiveDay] = useState(0);
  const [plan, setPlan] = useState<Record<string, string>>({});

  function key(meal: string) {
    return `${activeDay}-${meal}`;
  }

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 16 }}>Minha semana</h1>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 20 }}>
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setActiveDay(i)}
            style={{
              flexShrink: 0, width: 44, height: 52, borderRadius: 14, border: 'none',
              background: activeDay === i ? 'var(--green)' : 'var(--gray-bg)',
              color: activeDay === i ? '#fff' : 'var(--green-dark)',
              fontWeight: 600, fontSize: 12, cursor: 'pointer'
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
        {MEALS.map((m) => (
          <Card key={m.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <span style={{ fontWeight: 600 }}>{m.label}</span>
            </div>
            <input
              placeholder="O que você vai comer?"
              value={plan[key(m.key)] ?? ''}
              onChange={(e) => setPlan((p) => ({ ...p, [key(m.key)]: e.target.value }))}
              style={{ width: '100%', border: '1px solid #E3E7E4', borderRadius: 12, padding: '10px 12px', fontSize: 14 }}
            />
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn btn-outline" onClick={() => showToast('Resumo da semana gerado!')}>VER RESUMO DA SEMANA</button>
        <button className="btn btn-primary" onClick={() => navigate('/compras')}>GERAR LISTA DE COMPRAS</button>
      </div>
    </div>
  );
}
