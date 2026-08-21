import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar } from '../components/ui';
import { useApp } from '../context/AppContext';

const LINKS = [
  { to: '/objetivos', icon: '🎯', label: 'Meu objetivo' },
  { to: '/desafios', icon: '🏁', label: 'Desafios' },
  { to: '/semana', icon: '🗓️', label: 'Planejar semana' },
  { to: '/compras', icon: '🛒', label: 'Lista de compras' },
  { to: '/conquistas', icon: '🏆', label: 'Conquistas' },
  { to: '/motivacao', icon: '💌', label: 'Motivação' }
];

export default function More() {
  const navigate = useNavigate();
  const { state } = useApp();
  const profile = state.profile;

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 20 }}>Mais</h1>

      {profile && (
        <Card style={{ marginBottom: 20, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }} onClick={() => navigate('/perfil')}>
            <Avatar name={profile.name} size={48} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{profile.name}</div>
              <div className="eyebrow">Ver meu perfil</div>
            </div>
            <span style={{ color: 'var(--gray-text)' }}>›</span>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {LINKS.map((l) => (
          <Card key={l.to} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => navigate(l.to)}>
              <span style={{ fontSize: 20 }}>{l.icon}</span>
              <span style={{ flex: 1, fontWeight: 500 }}>{l.label}</span>
              <span style={{ color: 'var(--gray-text)' }}>›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
