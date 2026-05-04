import React from 'react';
import BottomNav from '../components/BottomNav';
import AuctionCard from '../components/AuctionCard';

export default function ListadeSubastas() {
  // Simulamos los datos que luego traeremos del backend
  const auctions = [
    { id: 1001, title: 'Reloj de Totoro original', category: 'Platino', image: '/totoro_clock.jpg' },
    { id: 1002, title: 'Cámara digital', category: 'Oro', image: '/camera.jpg' },
    { id: 1003, title: 'Bicicleta Bug Mountains', category: 'Especial', image: '/bycicle.jpg' },
  ];

  return (
    <div style={{ backgroundColor: '#090909', minHeight: '100vh', padding: '24px', paddingBottom: '100px' }}>
      <h1 style={{ color: '#F6F1E7', fontSize: '32px', marginBottom: '24px' }}>Subastas</h1>
      
      <input 
        type="text" 
        placeholder="Búsqueda..." 
        style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#1E1B16', color: 'white', border: 'none', marginBottom: '24px', boxSizing: 'border-box' }}
      />

      {auctions.map(item => (
        <AuctionCard key={item.id} {...item} />
      ))}

      <BottomNav />
    </div>
  );
}