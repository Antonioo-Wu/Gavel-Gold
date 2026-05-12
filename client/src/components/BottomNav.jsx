import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BottomNav.css';

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav-container">
      <button className="nav-button" onClick={() => navigate('/subastas')}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Inicio</span>
      </button>

      {/* Botón Subastas (tiene la clase 'active' añadida para el color más oscuro) */}
      <button className="nav-button active" onClick={() => navigate('/subastas')}>
        <span className="nav-icon">🛍️</span>
        <span className="nav-label">Subastas</span>
      </button>

      {/* Botón Cuenta */}
      <button className="nav-button" onClick={() => navigate('/perfil')}>
        <span className="nav-icon">👤</span>
        <span className="nav-label">Cuenta</span>
      </button>
    </div>
  );
}