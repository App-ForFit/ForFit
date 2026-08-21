import React, { useState } from 'react';
import { Card } from '../components/ui';
import { useApp } from '../context/AppContext';

type Tab = 'mensagem' | 'conteudos';

const MESSAGES = [
  'Uma escolha não define sua vida. Mas escolhas constantes transformam sua vida.',
  'Você não precisa ser perfeita, só constante.',
  'Cada pequeno passo é parte da sua jornada.',
  'Hoje não saiu como você queria? Tudo bem. Vamos continuar.'
];

export default function Motivation() {
  const { state, showToast } = useApp();
  const [tab, setTab] = useState<Tab>('mensagem');
  const [liked, setLiked] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 16 }}>Para você</h1>
      <div className="tabs" style={{ marginBottom: 20 }}>
        <button className={`tab ${tab === 'mensagem' ? 'active' : ''}`} onClick={() => setTab('mensagem')}>Mensagem</button>
        <button className={`tab ${tab === 'conteudos' ? 'active' : ''}`} onClick={() => setTab('conteudos')}>Conteúdos</button>
      </div>

      {tab === 'mensagem' ? (
        <>
          <Card tone="green" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 17, fontWeight: 600, fontStyle: 'italic', lineHeight: 1.5, marginBottom: 12 }}>
              "{MESSAGES[msgIndex]}"
            </p>
            <button
              onClick={() => setLiked((l) => !l)}
              style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
              aria-label="Favoritar"
            >
              {liked ? '❤️' : '🤍'}
            </button>
          </Card>

          {state.profile?.why && (
            <Card style={{ marginBottom: 16 }}>
              <h3 className="title-md" style={{ fontSize: 15, marginBottom: 8 }}>Lembre-se do seu porquê:</h3>
              <p style={{ color: 'var(--gray-text)', fontSize: 14, fontStyle: 'italic' }}>"{state.profile.why}"</p>
            </Card>
          )}

          <button
            className="btn btn-outline"
            style={{ width: '100%' }}
            onClick={() => { setMsgIndex((i) => (i + 1) % MESSAGES.length); showToast('Nova mensagem!'); }}
          >
            VER MAIS MENSAGENS
          </button>
        </>
      ) : (
        <p style={{ color: 'var(--gray-text)', fontSize: 14 }}>
          Em breve: artigos e vídeos curtos sobre hábitos, alimentação e bem-estar.
        </p>
      )}
    </div>
  );
}
