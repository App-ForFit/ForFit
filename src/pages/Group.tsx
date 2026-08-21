import React from 'react';
import { Card, Avatar } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function Group() {
  const { state, showToast } = useApp();
  const ranked = [...state.group.members].sort((a, b) => b.points - a.points);

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 4 }}>Meu grupo</h1>
      <p className="eyebrow" style={{ marginBottom: 20 }}>{state.group.name} · {state.group.members.length} participantes</p>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: -8 }}>
          {state.group.members.map((m) => (
            <div key={m.id} style={{ marginLeft: -8 }}>
              <Avatar name={m.name} size={40} />
            </div>
          ))}
        </div>
      </Card>

      <h3 className="title-md" style={{ marginBottom: 12 }}>Ranking de consistência</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {ranked.map((m, i) => (
          <Card key={m.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontWeight: 700, color: 'var(--gray-text)', width: 18 }}>{i + 1}</span>
              <Avatar name={m.name} size={38} />
              <span style={{ flex: 1, fontWeight: 600 }}>{m.name}</span>
              <span style={{ fontWeight: 700, color: 'var(--green-dark)' }}>{m.points} pts</span>
            </div>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--gray-text)', marginBottom: 16 }}>
        O ranking mostra consistência de hábitos — pesos e medidas não são exibidos publicamente.
      </p>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => showToast('Incentivo enviado ao grupo! 💚')}>
        Enviar incentivo para o grupo
      </button>
    </div>
  );
}
