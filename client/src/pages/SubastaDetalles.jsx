import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';


export default function SubastaDetalles() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Simulación de una subasta con catálogo de varios productos [cite: 1]
  const [auctionData] = useState({
    id: id,
    title: "Subasta Ghibli",
    catalog: [
      { id: 1001, name: "Reloj de Totoro original", price: 15000, desc: "Reloj despertador original de Mi Vecino Totoro.", img: "/images/totoro_clock.jpg" },
      { id: 1002, name: "Peluche de Totoro gigante", price: 8000, desc: "Peluche suave edición limitada.", img: "/images/totoro_plush.jpg" }
    ],
    currentIndex: 0 // Controla qué producto del catálogo se muestra actualmente [cite: 1]
  });

  const currentItem = auctionData.catalog[auctionData.currentIndex];

  return (
    <div style={{ backgroundColor: '#1E1B16', minHeight: '100vh', padding: '24px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
         <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>←</button>
         <h1 style={{ color: '#F6F1E7', margin: 0 }}>Detalle</h1>
      </div>
      
      <div style={{ backgroundColor: '#090909', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px', color: '#F6F1E7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ color: '#40E0D0', margin: 0 }}>{currentItem.id}</h2>
            <span style={{ color: '#888' }}>{auctionData.currentIndex + 1} / {auctionData.catalog.length}</span>
          </div>
          <p style={{ fontWeight: 'bold', margin: 0 }}>{currentItem.name}</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '32px', textAlign: 'center' }}>
          <img src={currentItem.img} alt={currentItem.name} style={{ width: '200px' }} />
        </div>
        
        <div style={{ padding: '24px' }}>
          <h3 style={{ color: '#F6F1E7' }}>{auctionData.title}</h3>
          <p style={{ color: '#AAAAAA', fontSize: '14px', lineHeight: '1.5' }}>
            {currentItem.desc}
          </p>
          
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#1A1A1A', borderRadius: '8px' }}>
            <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>Oferta actual</p>
            <p style={{ color: '#FFD700', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>${currentItem.price.toLocaleString()}</p>
          </div>

          <button 
            onClick={() => navigate(`/pujar/${currentItem.id}`)}
            style={{
              width: '100%', padding: '16px', borderRadius: '50px', border: 'none',
              backgroundImage: 'url("/images/fondo_dorado.jpg")', backgroundSize: 'cover',
              color: 'white', fontWeight: 'bold', fontSize: '16px', marginTop: '16px', cursor: 'pointer'
            }}
          >
            Entrar a Subasta
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}