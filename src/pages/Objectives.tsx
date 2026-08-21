import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, BackButton } from '../components/ui';
import { useApp } from '../context/AppContext';

const GOAL_OPTIONS = [
  'Emagrecer',
  'Melhorar minha alimentação',
  'Criar rotina de exercícios',
  'Melhorar minha relação com a comida',
  'Ter mais disposição',
  'Manter meu peso',
  'Outro'
];

export default function Objectives() {
  const navigate = useNavigate();
  const { state, saveGoals } = useApp();
  const [goals, setGoals] = useState<string[]>(state.profile?.goals ?? []);
  const [why, setWhy] = useState(state.profile?.why ?? '');

  function toggle(goal: string) {
    setGoals((g) => g.includes(goal) ? g.filter((x) => x !== goal) : [...g, goal]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveGoals(goals, why);
    navigate('/inicio');
  }

  return (
    <div className="fade-in">
      <BackButton onClick={() => navigate(-1)} />
      <h1 className="title-lg">Meu objetivo</h1>
      <p className="eyebrow" style={{ marginTop: 6, marginBottom: 20 }}>O que você quer conquistar?</p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {GOAL_OPTIONS.map((goal) => (
            <div key={goal} className={`checkbox-row ${goals.includes(goal) ? 'checked' : ''}`} onClick={() => toggle(goal)}>
              <div className="check-box">{goals.includes(goal) ? '✓' : ''}</div>
              <span className="label">{goal}</span>
            </div>
          ))}
        </div>

        <h3 className="title-md" style={{ marginBottom: 10 }}>Meu porquê</h3>
        <div className="field">
          <label>Por que isso é importante para você?</label>
          <textarea rows={4} value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Escreva com suas palavras..." />
        </div>
        <Button type="submit">SALVAR</Button>
      </form>
    </div>
  );
}
