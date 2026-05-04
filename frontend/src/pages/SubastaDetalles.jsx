import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function SubastaDetalles() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', padding: '24px', paddingBottom: '100px' }}>
      <h1 style={{ color: '#F6F1E7', marginBottom: '24px' }}>Subastas</h1>
      
      <div style={{ backgroundColor: '#090909', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px', color: '#F6F1E7' }}>
          <h2 style={{ color: '#40E0D0', margin: 0 }}>{id}</h2>
          <p style={{ fontWeight: 'bold', margin: 0 }}>Detalle del producto {id}</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '32px', textAlign: 'center' }}>
          <img src="/totoro_clock.jpg" alt="Producto" style={{ width: '200px' }} />
        </div>
        
        <div style={{ padding: '24px' }}>
          <h3 style={{ color: '#F6F1E7' }}>Coleccionables Ghibli</h3>
          <p style={{ color: '#AAAAAA', fontSize: '14px', lineHeight: '1.5' }}>
            Descripción detallada del artículo. Funciona perfectamente y conserva todas sus piezas originales.
          </p>
          
          <button style={{
            width: '100%', padding: '16px', borderRadius: '50px', border: 'none',
            backgroundImage: 'url(/fondo_dorado.jpg)', backgroundSize: 'cover',
            color: 'white', fontWeight: 'bold', fontSize: '16px', marginTop: '16px'
          }}>
            Entrar a Subasta
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}