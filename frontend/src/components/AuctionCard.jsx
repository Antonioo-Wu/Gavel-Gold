import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryPill from './CategoryPill';

export default function AuctionCard({ id, title, category, image }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/detalle/${id}`)}
      style={{
        backgroundColor: '#1E1B16',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ flex: 1 }}>
        <CategoryPill category={category} />
        <h3 style={{ color: '#E0BF66', margin: '8px 0 4px 0' }}>{id}</h3>
        <p style={{ color: '#F6F1E7', margin: 0 }}>{title}</p>
      </div>
      <img 
        src={image} 
        alt={title} 
        style={{ width: '80px', height: '80px', objectFit: 'contain', backgroundColor: 'white', borderRadius: '8px' }} 
      />
    </div>
  );
}