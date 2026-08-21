import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function Splash() {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #35B85A 0%, #2AA04D 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 28px',
        margin: '-20px -20px -100px'
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: 20, background: 'rgba(255,255,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 700, marginBottom: 18
      }}>
        4 <span style={{ fontSize: 18, marginLeft: 2 }}>🌿</span>
      </div>
      <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 700, marginBottom: 8 }}>PROJETO 4</h1>
      <p style={{ fontSize: 15, opacity: 0.92, marginBottom: 28 }}>
        Pequenas escolhas.<br />Grandes mudanças.
      </p>
      <div style={{
        display: 'flex', gap: -10, marginBottom: 32, fontSize: 40
      }}>
        🧑🏽 👩🏻 🧑🏿 👩🏽
      </div>
      <div style={{ width: '100%', maxWidth: 320 }}>
        <Button
          variant="secondary"
          onClick={() => navigate(state.profile ? '/inicio' : '/cadastro')}
        >
          {state.profile ? 'CONTINUAR' : 'COMEÇAR'}
        </Button>
      </div>
      {!state.profile && (
        <button
          style={{ background: 'none', border: 'none', color: '#fff', marginTop: 16, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => navigate('/cadastro')}
        >
          Entrar
        </button>
      )}
    </div>
  );
}
