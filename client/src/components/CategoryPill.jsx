import React from 'react';

export default function CategoryPill({ category }) {
  // Diccionario de colores según la categoría del usuario
  const colors = {
    Platino: { bg: '#40E0D0', text: '#090909' },
    Oro: { bg: '#E0BF66', text: '#090909' },
    Especial: { bg: '#FF6347', text: '#090909' },
    Plata: { bg: '#C0C0C0', text: '#090909' },
    Común: { bg: '#555555', text: '#FFFFFF' }
  };

  const style = colors[category] || colors['Común'];

  return (
    <span style={{
      backgroundColor: style.bg,
      color: style.text,
      padding: '4px 12px',
      borderRadius: '50px',
      fontWeight: 'bold',
      fontSize: '12px',
      display: 'inline-block'
    }}>
      {category}
    </span>
  );
}