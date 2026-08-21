import React from 'react';
import { NavLink } from 'react-router-dom';

const ITEMS = [
  { to: '/inicio', icon: '🏠', label: 'Início' },
  { to: '/evolucao', icon: '📈', label: 'Evolução' },
  { to: '/registrar', icon: '➕', label: 'Registrar', center: true },
  { to: '/grupo', icon: '👥', label: 'Grupo' },
  { to: '/mais', icon: '☰', label: 'Mais' }
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item ${item.center ? 'center' : ''} ${isActive && !item.center ? 'active' : ''}`}
        >
          <span className="icon">{item.icon}</span>
          {!item.center && <span>{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
}
