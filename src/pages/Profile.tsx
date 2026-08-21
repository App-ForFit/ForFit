import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, BackButton } from '../components/ui';
import { useApp } from '../context/AppContext';

const MENU = [
  'Dados pessoais',
  'Preferências',
  'Notificações',
  'Privacidade',
  'Ajuda e suporte'
];

export default function Profile() {
  const { state, showToast, resetToBlank } = useApp();
  const navigate = useNavigate();
  const profile = state.profile;
  if (!profile) return null;

  return (
    <div className="fade-in">
      <BackButton onClick={() => navigate('/mais')} />
      <h1 className="title-lg" style={{ marginBottom: 20 }}>Meu perfil</h1>

      <Card style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <Avatar name={profile.name} size={56} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>{profile.name}</div>
          <div className="eyebrow">Desde {profile.joinedAt}</div>
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {MENU.map((item) => (
          <Card key={item} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => showToast(`${item} — em breve`)}>
              <span style={{ fontWeight: 500 }}>{item}</span>
              <span style={{ color: 'var(--gray-text)' }}>›</span>
            </div>
          </Card>
        ))}
      </div>

      <button
        className="btn btn-outline"
        style={{ width: '100%', color: 'var(--coral)' }}
        onClick={() => {
          if (confirm('Sair e apagar os dados demo? Você poderá começar do zero.')) {
            resetToBlank();
            navigate('/');
          }
        }}
      >
        Sair
      </button>
    </div>
  );
}
