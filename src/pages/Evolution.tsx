import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '../components/ui';
import { useApp } from '../context/AppContext';

type Tab = 'peso' | 'medidas' | 'habitos';

export default function Evolution() {
  const { state } = useApp();
  const [tab, setTab] = useState<Tab>('peso');
  const profile = state.profile;
  if (!profile) return null;

  const delta = (profile.weightCurrent - profile.weightInitial).toFixed(1);
  const chartData = state.weightHistory.map((w) => ({ date: w.date.slice(5), peso: w.weight }));

  const dayList = Object.values(state.days).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 16 }}>Evolução</h1>
      <div className="tabs" style={{ marginBottom: 20 }}>
        <button className={`tab ${tab === 'peso' ? 'active' : ''}`} onClick={() => setTab('peso')}>Peso</button>
        <button className={`tab ${tab === 'medidas' ? 'active' : ''}`} onClick={() => setTab('medidas')}>Medidas</button>
        <button className={`tab ${tab === 'habitos' ? 'active' : ''}`} onClick={() => setTab('habitos')}>Hábitos</button>
      </div>

      {tab === 'peso' && (
        <>
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <Card tone="green">
              <div className="eyebrow">Inicial</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{profile.weightInitial.toFixed(1)} kg</div>
            </Card>
            <Card tone="green">
              <div className="eyebrow">Atual</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{profile.weightCurrent.toFixed(1)} kg</div>
            </Card>
          </div>

          <Card style={{ marginBottom: 16 }}>
            {chartData.length > 1 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#F1F3F1" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#5F6862' }} axisLine={false} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#5F6862' }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(23,75,58,0.15)' }} />
                  <Line type="monotone" dataKey="peso" stroke="#35B85A" strokeWidth={3} dot={{ fill: '#35B85A', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: 'var(--gray-text)', fontSize: 14 }}>Registre seu peso algumas vezes para ver o gráfico de evolução.</p>
            )}
          </Card>

          <Card tone="green" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--green-dark)' }}>
              {Number(delta) <= 0 ? delta : `+${delta}`} kg desde o início
            </span>
          </Card>
        </>
      )}

      {tab === 'medidas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <MeasureRow label="Cintura" initial={profile.waistInitial} current={profile.waistCurrent} />
          <MeasureRow label="Abdômen" initial={profile.abdomenInitial} current={profile.abdomenCurrent} />
          <MeasureRow label="Quadril" initial={profile.hipInitial} current={profile.hipCurrent} />
          <MeasureRow label="Coxa" initial={profile.thighInitial} current={profile.thighCurrent} />
          <MeasureRow label="Braço" initial={profile.armInitial} current={profile.armCurrent} />
        </div>
      )}

      {tab === 'habitos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {dayList.length === 0 && <p style={{ color: 'var(--gray-text)', fontSize: 14 }}>Nenhum hábito registrado ainda.</p>}
          {dayList.map((d) => (
            <Card key={d.date}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <strong>{d.date}</strong>
                <span className="eyebrow">{d.points} pts</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>
                💧 {d.waterLiters.toFixed(1)}L · 🥗 {d.meals} ref · 🏃 {d.exerciseMinutes}min · 😴 {d.sleepHours || 0}h
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function MeasureRow({ label, initial, current }: { label: string; initial: number; current: number }) {
  const diff = current - initial;
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ color: diff <= 0 ? 'var(--green)' : 'var(--coral)', fontWeight: 700 }}>
          {diff === 0 ? '—' : `${diff > 0 ? '+' : ''}${diff.toFixed(0)} cm`}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--gray-text)', marginTop: 4 }}>
        {initial || '—'} cm → {current || '—'} cm
      </div>
    </Card>
  );
}
