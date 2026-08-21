import React from 'react';

export function Button({
  children, onClick, variant = 'primary', type = 'button', disabled
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Card({ children, tone = 'white', style }: { children: React.ReactNode; tone?: 'white' | 'green' | 'purple'; style?: React.CSSProperties }) {
  const cls = tone === 'green' ? 'card-soft' : tone === 'purple' ? 'card-purple' : 'card';
  return <div className={cls} style={style}>{children}</div>;
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Badge({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'yellow' | 'purple' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {initial}
    </div>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="back-btn" onClick={onClick} aria-label="Voltar">
      ←
    </button>
  );
}

export function MetricCard({
  icon, label, value, sub, tone = 'white'
}: { icon: string; label: string; value: string; sub?: React.ReactNode; tone?: 'white' | 'green' }) {
  return (
    <Card tone={tone}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: sub ? 8 : 0 }}>{value}</div>
      {sub}
    </Card>
  );
}
