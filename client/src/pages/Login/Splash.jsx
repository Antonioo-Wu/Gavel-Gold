import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  // Esto es un temporizador que se ejecuta al abrir la pantalla
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000); // 2000 milisegundos = 2 segundos
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white' // Fondo blanco de tu diseño
    }}>
        // <img src="/logo_gavel.png" alt="Gavel & Gold" style={{ width: '250px' }} />
    </div>
  );
}