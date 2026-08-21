import React from 'react';
import { Card } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function ShoppingList() {
  const { state, toggleShoppingItem, showToast } = useApp();
  const categories = Array.from(new Set(state.shoppingList.map((i) => i.category)));

  return (
    <div className="fade-in">
      <h1 className="title-lg" style={{ marginBottom: 20 }}>Lista de compras</h1>

      {state.shoppingList.length === 0 && (
        <p style={{ color: 'var(--gray-text)', fontSize: 14, marginBottom: 20 }}>
          Sua lista está vazia. Planeje sua semana para gerar itens automaticamente.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
        {categories.map((cat) => (
          <Card key={cat}>
            <h3 className="title-md" style={{ marginBottom: 8, fontSize: 15 }}>{cat}</h3>
            {state.shoppingList.filter((i) => i.category === cat).map((item) => (
              <div key={item.id} className={`checkbox-row ${item.checked ? 'checked' : ''}`} onClick={() => toggleShoppingItem(item.id)}>
                <div className="check-box">{item.checked ? '✓' : ''}</div>
                <span className="label">{item.name}</span>
              </div>
            ))}
          </Card>
        ))}
      </div>

      <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => showToast('Exibindo lista completa')}>
        VER LISTA COMPLETA
      </button>
    </div>
  );
}
