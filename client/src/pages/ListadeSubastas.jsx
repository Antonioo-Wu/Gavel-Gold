import React from 'react';
import BottomNav from '../components/BottomNav';
import AuctionCard from '../components/AuctionCard';
import '../styles/ListaDeSubastas.css';

export default function ListadeSubastas() {
  // Datos estructurados: Subastas que contienen un catálogo de ítems [cite: 1]
  const subastas = [
    { 
      id: "S01", 
      title: 'Subasta Especial Ghibli', 
      category: 'Platino', 
      image: '/images/totoro_clock.jpg',
      estado: 'En vivo' 
    },
    { 
      id: "S02", 
      title: 'Subasta Fotografía Vintage', 
      category: 'Oro', 
      image: '/images/camera.jpg',
      estado: 'Próxima'
    }
  ];

  return (
    <div className="subastas-container">
      <h1 className="subastas-title">Subastas</h1>
      
      <input type="text" placeholder="Búsqueda..." className="subastas-search" />

      {subastas.map(subasta => (
        <AuctionCard key={subasta.id} {...subasta} />
      ))}

      <BottomNav />
    </div>
  );
}