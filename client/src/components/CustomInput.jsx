import React from 'react';

export default function CustomInput({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
      <label style={{ color: '#555', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ 
          width: '100%', padding: '12px', borderRadius: '8px', 
          border: '1px solid #ccc', boxSizing: 'border-box',
          fontSize: '14px'
        }}
      />
    </div>
  );
}