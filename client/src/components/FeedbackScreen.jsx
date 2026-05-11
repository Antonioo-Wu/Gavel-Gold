import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbackScreen({ text, navigateTo }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(navigateTo)}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', padding: '24px',
        backgroundImage: 'url(/images/fondo_dorado.jpg)', backgroundSize: 'cover', 
        backgroundPosition: 'center', cursor: 'pointer'
      }}
    >

      <h1 style={{ 
        color: 'white', textAlign: 'center', fontSize: '32px', 
        textShadow: '2px 2px 4px rgba(0,0,0,0.6)', whiteSpace: 'pre-line' 
      }}>
        <p>🎉</p>
        {text}
      </h1>
    </div>
  );
}