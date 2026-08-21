import React, { useState } from 'react';
import { Card, ProgressBar } from '../components/ui';
import { useApp } from '../context/AppContext';

type Tab = 'meus' | 'grupo' | 'todos';

export default function Challenges() {
  const { state, incrementChallenge } = useApp();
  const [tab, setTab] = useState<Tab>('todos');

  const filtered = state.challenges.filter((c) => {
    if (tab === 'meus') return c.scope === 'meu';
    if (tab === 'grupo') return c.scope === 'grupo';
    return true;
  });

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 16 }}>Desafios</h1>
      <div className="tabs" style={{ marginBottom: 20 }}>
        <button className={`tab ${tab === 'meus' ? 'active' : ''}`} onClick={() => setTab('meus')}>Meus</button>
        <button className={`tab ${tab === 'grupo' ? 'active' : ''}`} onClick={() => setTab('grupo')}>Grupo</button>
        <button className={`tab ${tab === 'todos' ? 'active' : ''}`} onClick={() => setTab('todos')}>Todos</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((c) => (
          <Card key={c.id} tone={c.scope === 'grupo' ? 'purple' : 'white'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <span style={{ fontWeight: 600 }}>{c.title}</span>
            </div>
            <ProgressBar value={c.progress} max={c.target} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <span className="eyebrow">{c.progress} / {c.target} {c.unit}</span>
              {c.progress < c.target && (
                <button
                  className="btn btn-ghost"
                  style={{ padding: '6px 10px', minHeight: 'auto', fontSize: 13 }}
                  onClick={() => incrementChallenge(c.id)}
                >
                  + Avançar
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
