import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();

  const btnStyle = {
    background: 'none', border: 'none', color: '#555', 
    fontWeight: 'bold', cursor: 'pointer', display: 'flex', 
    flexDirection: 'column', alignItems: 'center', gap: '4px'
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      backgroundColor: 'white', padding: '16px',
      borderRadius: '24px 24px 0 0', position: 'fixed',
      bottom: 0, width: '100%', boxSizing: 'border-box',
      boxShadow: '0 -4px 10px rgba(0,0,0,0.1)'
    }}>
      <button style={btnStyle} onClick={() => navigate('/subastas')}>
        <span style={{ fontSize: '20px' }}>🏠</span>
        <span style={{ fontSize: '12px' }}>Inicio</span>
      </button>
      <button style={{...btnStyle, color: '#090909'}} onClick={() => navigate('/subastas')}>
        <span style={{ fontSize: '20px' }}>🛍️</span>
        <span style={{ fontSize: '12px' }}>Subastas</span>
      </button>
      <button style={btnStyle} onClick={() => navigate('/perfil')}>
        <span style={{ fontSize: '20px' }}>👤</span>
        <span style={{ fontSize: '12px' }}>Cuenta</span>
      </button>
    </div>
  );
}