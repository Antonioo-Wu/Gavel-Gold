import React from 'react';

export default function FormCard({ children }) {
  return (
    <div style={{
      backgroundColor: 'white', padding: '32px', borderRadius: '16px',
      width: '100%', maxWidth: '400px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      boxSizing: 'border-box'
    }}>
      {children}
    </div>
  );
}