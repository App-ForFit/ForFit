import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, BackButton } from '../components/ui';
import { useApp } from '../context/AppContext';
import type { DayLog } from '../types';

type Kind = 'agua' | 'alimentacao' | 'movimento' | 'sono' | 'peso' | 'humor';

const OPTIONS: { kind: Kind; icon: string; label: string }[] = [
  { kind: 'agua', icon: '💧', label: 'Água' },
  { kind: 'alimentacao', icon: '🥗', label: 'Alimentação' },
  { kind: 'movimento', icon: '🏃', label: 'Movimento' },
  { kind: 'sono', icon: '😴', label: 'Sono' },
  { kind: 'peso', icon: '⚖️', label: 'Peso' },
  { kind: 'humor', icon: '😊', label: 'Humor' }
];

export default function RegisterHub() {
  const navigate = useNavigate();
  const { logWater, logMeals, logExercise, logSleep, logMood, logWeight } = useApp();
  const [active, setActive] = useState<Kind | null>(null);

  function close() {
    setActive(null);
    navigate('/inicio');
  }

  return (
    <div className="fade-in">
      <BackButton onClick={() => navigate('/inicio')} />
      <h1 className="title-lg">O que você quer registrar?</h1>
      <p className="eyebrow" style={{ marginTop: 6, marginBottom: 20 }}>Escolha um hábito para atualizar o seu dia</p>

      <div className="grid-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.kind}
            onClick={() => setActive(opt.kind)}
            style={{ border: 'none', background: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}
          >
            <Card>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontWeight: 600 }}>{opt.label}</div>
            </Card>
          </button>
        ))}
      </div>

      {active === 'agua' && <QuickPicker title="Quanto de água?" options={[{ l: '250 ml', v: 0.25 }, { l: '500 ml', v: 0.5 }, { l: '750 ml', v: 0.75 }]} onPick={(v) => { logWater(v); close(); }} onClose={() => setActive(null)} />}
      {active === 'alimentacao' && <QuickPicker title="Quantas refeições?" options={[{ l: '1 refeição', v: 1 }, { l: '2 refeições', v: 2 }, { l: '3 refeições', v: 3 }]} onPick={(v) => { logMeals(v); close(); }} onClose={() => setActive(null)} />}
      {active === 'movimento' && <QuickPicker title="Quantos minutos?" options={[{ l: '15 min', v: 15 }, { l: '30 min', v: 30 }, { l: '45 min', v: 45 }]} onPick={(v) => { logExercise(v); close(); }} onClose={() => setActive(null)} />}
      {active === 'sono' && <QuickPicker title="Quantas horas você dormiu?" options={[{ l: '5h', v: 5 }, { l: '7h', v: 7 }, { l: '8h', v: 8 }]} onPick={(v) => { logSleep(v); close(); }} onClose={() => setActive(null)} />}
      {active === 'peso' && <WeightPicker onPick={(v) => { logWeight(v); close(); }} onClose={() => setActive(null)} />}
      {active === 'humor' && <MoodPicker onPick={(v) => { logMood(v); close(); }} onClose={() => setActive(null)} />}
    </div>
  );
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <h3 className="title-md" style={{ marginBottom: 16 }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

function QuickPicker({ title, options, onPick, onClose }: { title: string; options: { l: string; v: number }[]; onPick: (v: number) => void; onClose: () => void }) {
  return (
    <Sheet title={title} onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((o) => (
          <button key={o.l} className="btn btn-outline" onClick={() => onPick(o.v)}>{o.l}</button>
        ))}
      </div>
    </Sheet>
  );
}

function WeightPicker({ onPick, onClose }: { onPick: (v: number) => void; onClose: () => void }) {
  const [value, setValue] = useState('');
  return (
    <Sheet title="Qual o seu peso hoje?" onClose={onClose}>
      <div className="field">
        <input type="number" step="0.1" inputMode="decimal" placeholder="Ex: 74.8" value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
      </div>
      <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => value && onPick(parseFloat(value))}>Salvar</button>
    </Sheet>
  );
}

function MoodPicker({ onPick, onClose }: { onPick: (v: DayLog['mood']) => void; onClose: () => void }) {
  const options: { v: DayLog['mood']; icon: string; label: string }[] = [
    { v: 'feliz', icon: '😊', label: 'Feliz' },
    { v: 'neutro', icon: '😐', label: 'Neutro' },
    { v: 'dificil', icon: '😔', label: 'Foi difícil' }
  ];
  return (
    <Sheet title="Como você está se sentindo?" onClose={onClose}>
      <div style={{ display: 'flex', gap: 10 }}>
        {options.map((o) => (
          <button key={o.v} className="btn btn-outline" style={{ flexDirection: 'column', flex: 1, height: 74 }} onClick={() => onPick(o.v)}>
            <span style={{ fontSize: 22 }}>{o.icon}</span>
            <span style={{ fontSize: 12 }}>{o.label}</span>
          </button>
        ))}
      </div>
    </Sheet>
  );
}
