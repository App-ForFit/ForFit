import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, BackButton } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function MarcoZero() {
  const navigate = useNavigate();
  const { saveMarcoZero } = useApp();
  const [form, setForm] = useState({
    weightInitial: '', height: '',
    waistInitial: '', abdomenInitial: '', hipInitial: '', thighInitial: '', armInitial: ''
  });

  function field(key: keyof typeof form, label: string, unit: string) {
    return (
      <div className="field">
        <label>{label}</label>
        <input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder={unit}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        />
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveMarcoZero({
      weightInitial: parseFloat(form.weightInitial) || 0,
      height: parseFloat(form.height) || 0,
      waistInitial: parseFloat(form.waistInitial) || 0,
      waistCurrent: parseFloat(form.waistInitial) || 0,
      abdomenInitial: parseFloat(form.abdomenInitial) || 0,
      abdomenCurrent: parseFloat(form.abdomenInitial) || 0,
      hipInitial: parseFloat(form.hipInitial) || 0,
      hipCurrent: parseFloat(form.hipInitial) || 0,
      thighInitial: parseFloat(form.thighInitial) || 0,
      thighCurrent: parseFloat(form.thighInitial) || 0,
      armInitial: parseFloat(form.armInitial) || 0,
      armCurrent: parseFloat(form.armInitial) || 0
    });
    navigate('/objetivos');
  }

  return (
    <div className="fade-in">
      <BackButton onClick={() => navigate('/cadastro')} />
      <h1 className="title-lg">Marco Zero</h1>
      <p className="eyebrow" style={{ marginTop: 6, marginBottom: 20 }}>De onde você está partindo?</p>

      <form onSubmit={handleSubmit}>
        <h3 className="title-md" style={{ marginBottom: 12 }}>Dados pessoais</h3>
        {field('weightInitial', 'Peso', 'kg')}
        {field('height', 'Altura', 'm')}

        <h3 className="title-md" style={{ margin: '18px 0 12px' }}>Medidas</h3>
        {field('waistInitial', 'Cintura', 'cm')}
        {field('abdomenInitial', 'Abdômen', 'cm')}
        {field('hipInitial', 'Quadril', 'cm')}
        {field('thighInitial', 'Coxa', 'cm')}
        {field('armInitial', 'Braço', 'cm')}

        <p style={{ fontSize: 13, color: 'var(--gray-text)', marginBottom: 16 }}>
          Você poderá editar esses dados depois, sem problemas.
        </p>
        <Button type="submit">SALVAR E CONTINUAR</Button>
      </form>
    </div>
  );
}
