import React from 'react';
import BottomNav from '../components/BottomNav';
import AuctionCard from '../components/AuctionCard';
import '../styles/ListaDeSubastas.css';

export default function ListadeSubastas() {
  const auctions = [
    { id: 1001, title: 'Reloj de Totoro original', category: 'Platino', image: '/totoro_clock.jpg' },
    { id: 1002, title: 'Cámara digital', category: 'Oro', image: '/camera.jpg' },
    { id: 1003, title: 'Bicicleta Bug Mountains', category: 'Especial', image: '/bycicle.jpg' },
  ];

  return (
    <div className="subastas-container">
      <h1 className="subastas-title">Subastas</h1>
      
      <input 
        type="text" 
        placeholder="Búsqueda..." 
        className="subastas-search"
      />

      {auctions.map(item => (
        <AuctionCard key={item.id} {...item} />
      ))}

      <BottomNav />
    </div>
  );
}