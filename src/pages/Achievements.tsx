import React, { useState } from 'react';
import { Card } from '../components/ui';
import { useApp } from '../context/AppContext';

type Tab = 'medalhas' | 'certificados';

export default function Achievements() {
  const { state } = useApp();
  const [tab, setTab] = useState<Tab>('medalhas');

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 16 }}>Conquistas</h1>
      <div className="tabs" style={{ marginBottom: 20 }}>
        <button className={`tab ${tab === 'medalhas' ? 'active' : ''}`} onClick={() => setTab('medalhas')}>Medalhas</button>
        <button className={`tab ${tab === 'certificados' ? 'active' : ''}`} onClick={() => setTab('certificados')}>Certificados</button>
      </div>

      {tab === 'medalhas' ? (
        <div className="grid-2">
          {state.achievements.map((a) => (
            <Card key={a.id} tone={a.unlocked ? 'green' : 'white'} style={{ opacity: a.unlocked ? 1 : 0.5, textAlign: 'center' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{a.title}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>{a.unlocked ? 'Desbloqueada' : 'Bloqueada'}</div>
            </Card>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--gray-text)', fontSize: 14 }}>
          Certificados ficam disponíveis quando você completa marcos importantes, como 30 e 90 dias de jornada.
        </p>
      )}
    </div>
  );
}
