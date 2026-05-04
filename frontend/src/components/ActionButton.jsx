import React from 'react';

export default function ActionButton({ text, onClick, variant = 'solid', style = {} }) {
  // Estilo base para todos los botones
  let baseStyle = {
    width: '100%', padding: '14px', borderRadius: '50px',
    fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', 
    border: 'none', textAlign: 'center', transition: '0.2s',
    ...style
  };

  // Variantes de diseño
  if (variant === 'solid') {
    baseStyle = { ...baseStyle, backgroundColor: '#1A1A1A', color: 'white' };
  } else if (variant === 'gold') {
    baseStyle = { ...baseStyle, backgroundImage: 'url(/fondo_dorado.jpg)', backgroundSize: 'cover', color: 'white' };
  } else if (variant === 'outline') {
    baseStyle = { ...baseStyle, backgroundColor: 'transparent', border: '2px solid #1A1A1A', color: '#1A1A1A' };
  }

  return (
    <button onClick={onClick} style={baseStyle}>
      {text}
    </button>
  );
}