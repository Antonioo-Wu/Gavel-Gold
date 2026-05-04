import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', padding: '24px', paddingBottom: '100px',
      backgroundImage: 'url(/fondo_dorado.jpg)', backgroundSize: 'cover' 
    }}>
      <h1 style={{ color: 'white', marginTop: '32px', fontSize: '36px' }}>Mi Perfil</h1>
      
      <div style={{ backgroundColor: '#5A4A2A', color: 'white', padding: '16px', borderRadius: '50px', textAlign: 'center', marginBottom: '32px' }}>
        Categoría: Común
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ marginTop: 0 }}>Más información</h3>
        <p>Términos y Condiciones</p>
        <p>Política de Privacidad</p>
        <p>Sobre nosotros</p>
      </div>

      <button 
        onClick={() => navigate('/')}
        style={{
          width: '100%', padding: '16px', borderRadius: '50px',
          backgroundColor: 'transparent', border: '2px solid white',
          color: 'white', fontWeight: 'bold', fontSize: '16px'
        }}
      >
        Cerrar Sesión
      </button>

      <BottomNav />
    </div>
  );
}