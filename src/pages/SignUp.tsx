import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, BackButton } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { createAccount } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) return;
    createAccount({ name, email, birthDate });
    navigate('/marco-zero');
  }

  return (
    <div className="fade-in">
      <BackButton onClick={() => navigate('/')} />
      <h1 className="title-lg">Vamos começar!</h1>
      <p className="eyebrow" style={{ marginTop: 6, marginBottom: 24 }}>Crie sua conta</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Nome completo</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Crie uma senha" required />
        </div>
        <div className="field">
          <label htmlFor="birth">Data de nascimento</label>
          <input id="birth" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <Button type="submit">CRIAR CONTA</Button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 18, color: 'var(--gray-text)', fontSize: 14 }}>
        Já tem conta? <span style={{ color: 'var(--green)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/inicio')}>Entrar</span>
      </p>
    </div>
  );
}
