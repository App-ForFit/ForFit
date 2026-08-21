import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { BottomNav } from './components/BottomNav';

import Splash from './pages/Splash';
import SignUp from './pages/SignUp';
import MarcoZero from './pages/MarcoZero';
import Home from './pages/Home';
import RegisterHub from './pages/RegisterHub';
import Objectives from './pages/Objectives';
import Evolution from './pages/Evolution';
import Group from './pages/Group';
import Challenges from './pages/Challenges';
import WeekPlan from './pages/WeekPlan';
import ShoppingList from './pages/ShoppingList';
import Achievements from './pages/Achievements';
import Motivation from './pages/Motivation';
import More from './pages/More';
import Profile from './pages/Profile';
import DayDetails from './pages/DayDetails';

const NO_NAV_ROUTES = ['/', '/cadastro', '/marco-zero'];

export default function App() {
  const { state, toast } = useApp();
  const location = useLocation();
  const showNav = !NO_NAV_ROUTES.includes(location.pathname);
  const hasProfile = !!state.profile;

  return (
    <div className="app-shell">
      <div className="page-scroll">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/marco-zero" element={<MarcoZero />} />
          <Route path="/inicio" element={hasProfile ? <Home /> : <Navigate to="/" replace />} />
          <Route path="/registrar" element={<RegisterHub />} />
          <Route path="/objetivos" element={<Objectives />} />
          <Route path="/evolucao" element={<Evolution />} />
          <Route path="/grupo" element={<Group />} />
          <Route path="/desafios" element={<Challenges />} />
          <Route path="/semana" element={<WeekPlan />} />
          <Route path="/compras" element={<ShoppingList />} />
          <Route path="/conquistas" element={<Achievements />} />
          <Route path="/motivacao" element={<Motivation />} />
          <Route path="/mais" element={<More />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/dia" element={<DayDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showNav && hasProfile && <BottomNav />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
